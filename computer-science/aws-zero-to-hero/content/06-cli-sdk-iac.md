---
title: "CLI, SDK, CloudShell, IaC primer"
area: "Fondamenti"
summary: "Console è per esplorare, produzione è in CLI/IaC. AWS CLI v2, SDK Python (boto3) e JS, CloudShell in-browser, e introduzione a CloudFormation/Terraform/CDK."
order: 6
level: "principiante"
prereq:
  - "sezioni 1-5"
tools:
  - "AWS CLI v2"
  - "Python 3 + boto3"
  - "Terraform o AWS CDK (opzionali, vedi sezione 34)"
---

# CLI, SDK, CloudShell, IaC primer

La console web AWS è un buon onboarding tool. Per il resto è una **tastiera lenta**: cliccare 47 volte per creare un VPC con 6 subnet è insostenibile, non riproducibile, non audit-friendly. Tutto in AWS è API: console, CLI, SDK e IaC sono solo client diversi per quelle stesse API.

## 1. AWS CLI v2

```bash
# macOS
brew install awscli
# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscli.zip
unzip awscli.zip && sudo ./aws/install
# Windows
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

aws --version           # aws-cli/2.x
aws configure           # interattivo: chiave, segreto, region, output
aws configure sso       # MIGLIORE: usa IAM Identity Center invece di key statiche
```

CLI v2 ha:

- **SSO integrato** (`aws configure sso`).
- **Auto-prompt** (`aws --cli-auto-prompt`): wizard interattivo per ogni comando.
- **Server-side e client-side pagination** automatica.
- **JMESPath query** (`--query`) per filtrare output.

Esempi quotidiani:

```bash
aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{Id:InstanceId,Type:InstanceType,State:State.Name}' \
  --output table

aws s3 ls
aws s3 cp ./build/ s3://my-bucket/v1.2/ --recursive --acl bucket-owner-full-control

aws logs tail /aws/lambda/myfunction --follow --since 10m
```

## 2. Profili e credenziali

Le credenziali stanno in due file:

```
~/.aws/credentials       # access key statiche (legacy)
[default]
aws_access_key_id = AKIA...
aws_secret_access_key = ...

~/.aws/config            # profili, region, output, SSO
[profile prod]
sso_session = mycorp
sso_account_id = 111111111111
sso_role_name = AdminAccess
region = eu-west-1

[sso-session mycorp]
sso_start_url = https://mycorp.awsapps.com/start
sso_region = eu-west-1
sso_registration_scopes = sso:account:access
```

Uso:

```bash
aws s3 ls --profile prod
AWS_PROFILE=prod aws s3 ls
aws sso login --profile prod   # apre browser, fa login una volta al giorno
```

## 3. SDK: boto3 (Python) e JS

```python
import boto3
s3 = boto3.client("s3", region_name="eu-west-1")
for obj in s3.get_paginator("list_objects_v2").paginate(Bucket="my-bucket"):
    for item in obj.get("Contents", []):
        print(item["Key"], item["Size"])

# Resource-style (più OO)
ddb = boto3.resource("dynamodb")
table = ddb.Table("orders")
table.put_item(Item={"order_id":"o123","customer":"alice","total":99.9})
```

Pattern critici:

- **Niente chiavi hardcoded**: boto3 cerca credenziali nell'ordine env vars → `~/.aws/credentials` → EC2 instance role → ECS/Lambda task role.
- **Pagination obbligatoria**: la maggior parte delle list-API ritorna max 1000 elementi. Usa `get_paginator`.
- **Retry/backoff**: configurabile via `botocore.config.Config(retries={"max_attempts":10, "mode":"adaptive"})`.
- **Errori**: catch `botocore.exceptions.ClientError`, ispeziona `e.response["Error"]["Code"]`.

## 4. CloudShell

CloudShell è una shell Linux in-browser con AWS CLI preinstallata, persistent home di 1 GB, credenziali iniettate dalla console (no setup). Aprila dall'icona in alto a destra della console. Utile per:

- Test rapidi senza installare nulla.
- Operazioni da emergenza (dimenticato laptop, devi terminare una EC2).
- Demo / training.

Limiti: 1 GB persistente, sessione idle scade in 20 min, nessun root sudo (puoi `sudo` per `apt` ma non puoi montare device).

## 5. IaC: perché è obbligatorio

Infrastructure as Code = descrivere infrastruttura in file di testo versionati. Tre motivi non negoziabili:

1. **Riproducibilità**: ricreare l'ambiente in un altro account/Region è un comando.
2. **Review**: l'infra passa per pull request come il codice.
3. **Drift detection**: sai se qualcuno ha cliccato qualcosa in console.

Tre tool principali su AWS:

| Tool | Linguaggio | Quando |
|---|---|---|
| **CloudFormation** | YAML/JSON | nativo AWS, no dipendenze, lento |
| **AWS CDK** | TypeScript/Python/Go/Java/.NET | logica di alto livello (loop, condizioni), genera CFN sotto |
| **Terraform** | HCL | multi-cloud, gigantesco ecosistema community |

Per chi inizia: CDK è il più produttivo se sei già developer; Terraform se devi fare anche GCP/Azure; CloudFormation se vuoi zero dipendenze.

## 6. Mini-esempio CloudFormation

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: "S3 bucket privato con versioning"
Parameters:
  BucketNamePrefix:
    Type: String
    Default: my-app
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub "${BucketNamePrefix}-${AWS::AccountId}-${AWS::Region}"
      VersioningConfiguration:
        Status: Enabled
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: AES256
Outputs:
  BucketArn:
    Value: !GetAtt Bucket.Arn
```

Deploy:

```bash
aws cloudformation deploy \
  --stack-name my-bucket-stack \
  --template-file bucket.yaml \
  --parameter-overrides BucketNamePrefix=acme
```

## 7. Mini-esempio Terraform

```hcl
terraform {
  required_providers { aws = { source = "hashicorp/aws", version = "~> 5.0" } }
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "infra/network.tfstate"
    region = "eu-west-1"
  }
}
provider "aws" { region = "eu-west-1" }

resource "aws_s3_bucket" "logs" {
  bucket = "acme-${data.aws_caller_identity.current.account_id}-logs"
}
resource "aws_s3_bucket_versioning" "logs" {
  bucket = aws_s3_bucket.logs.id
  versioning_configuration { status = "Enabled" }
}
data "aws_caller_identity" "current" {}
```

```bash
terraform init
terraform plan
terraform apply
```

## 8. Esercizio

<details>
<summary>Devi automatizzare un report giornaliero di tutte le EC2 stoppate da >30 giorni in tutti gli account. Approccio?</summary>

1. **Account hub**: 1 account "operations" con role assumibile in tutti gli account spoke.
2. **Python (boto3)** in Lambda schedulato da EventBridge cron.
3. Per ogni account spoke: `sts:AssumeRole`, `ec2:describe-instances` con filter `instance-state-name=stopped`, calcola `LaunchTime`/transitioni di stato (richiede CloudTrail o tag `StoppedAt`).
4. Aggrega in SNS topic / Slack webhook / S3 + Athena.

Pattern preferito: usare **AWS Config** advanced query, che già normalizza la configurazione cross-account. Una query SQL contro l'aggregator restituisce il report.
</details>

<details>
<summary>Hai eseguito un comando con il profilo sbagliato e creato una VPC in produzione. Come previeni la prossima volta?</summary>

- Usa profili con nomi parlanti (`prod-readonly`, `prod-write-mfa`, `dev`) — mai `default` per produzione.
- Imposta `AWS_PROFILE` nello shell prompt (vedi `aws-vault` o `granted`).
- `aws-vault exec prod-write --` richiede MFA prima di ogni comando.
- IAM Identity Center: i token scadono in 1 ora, quindi devi consciously fare `aws sso login --profile prod` prima.
- SCP che impedisce modifiche in certi orari o senza un tag specifico (es. `RequestTag/Operator`).
</details>

> **Riassunto**: console solo per esplorare; CLI v2 per automazione (configura sempre via `aws configure sso`); SDK boto3/JS per scripting; CloudShell per emergenze in browser; IaC obbligatoria in produzione (CDK > Terraform > CloudFormation come ordine di produttività per chi è developer). Profili nominati e MFA proteggono dai disastri "ho usato il profilo sbagliato".
