---
title: "IaC su AWS — CloudFormation, CDK, SAM, Terraform"
area: "DevOps"
summary: "Quattro modi di descrivere infrastruttura come codice su AWS: confronto, idiomi, gotcha (drift, stati remoti, capabilities)."
order: 34
level: "intermedio"
prereq:
  - "sezione 6"
tools:
  - "AWS CLI"
  - "AWS CDK"
  - "Terraform"
  - "SAM CLI"
---

# IaC su AWS

L'infrastruttura cliccata a mano è il debito tecnico più costoso che esista: nessuno ricorda perché quel security group ha la porta 1521 aperta, e il giorno della certificazione SOC2 paghi caro. L'IaC è la cura: ogni risorsa nasce da un file di testo versionato in git, riproducibile, revisionabile in PR. Su AWS hai quattro opzioni mainstream — vediamo quando scegliere quale.

## 1. CloudFormation (CFN) — il fondamento

Servizio nativo AWS: template YAML/JSON che descrivono uno **stack** (un insieme di risorse gestite insieme). CFN tiene lo stato per te (nessun state file da gestire) e fa rollback automatico in caso di errore.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Parameters:
  EnvName:
    Type: String
    AllowedValues: [dev, prod]
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub "myapp-${EnvName}-${AWS::AccountId}"
      VersioningConfiguration:
        Status: Enabled
Outputs:
  BucketArn:
    Value: !GetAtt Bucket.Arn
    Export:
      Name: !Sub "${EnvName}-bucket-arn"
```

Concetti chiave: **Change Set** (preview del diff prima di apply), **Nested Stack** (modularità), **StackSet** (deploy multi-account/multi-region da un management account), **Transform** (es. `AWS::Serverless` per SAM, `AWS::Include`), **Custom Resource** (Lambda che gestisce risorse non native), **Drift Detection** (rileva modifiche fuori da CFN).

## 2. Capabilities, Termination Protection, Drift

Per creare risorse IAM serve `--capabilities CAPABILITY_IAM` o `CAPABILITY_NAMED_IAM`; per macro/SAM serve `CAPABILITY_AUTO_EXPAND`. Senza queste, CFN rifiuta — è un consenso esplicito che la pipeline può creare permessi.

| Concetto | Cosa fa | Quando importante |
|---|---|---|
| Change Set | Preview del diff | PR review prima di apply prod |
| Termination Protection | Blocca delete dello stack | Stack prod root |
| Drift Detection | Confronta CFN vs reale | Audit periodico |
| DeletionPolicy: Retain | Tiene la risorsa se lo stack muore | DB, bucket dati |
| UpdateReplacePolicy: Snapshot | Snapshot prima di replace | RDS |

## 3. AWS CDK — codice vero

CDK è un wrapper in TypeScript/Python/Java/.NET/Go che **sintetizza** template CloudFormation. Il vantaggio: hai costrutti tipizzati, riusabili, con default sani.

Tre livelli:
- **L1** (`CfnBucket`): 1:1 con CFN, raw.
- **L2** (`s3.Bucket`): astrazione idiomatica con metodi come `.grantRead(role)`.
- **L3 / Pattern** (`ApplicationLoadBalancedFargateService`): pattern completi multi-risorsa.

```typescript
const bucket = new s3.Bucket(this, 'Data', {
  encryption: s3.BucketEncryption.S3_MANAGED,
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  removalPolicy: RemovalPolicy.RETAIN,
});
bucket.grantRead(lambdaFn);  // genera IAM policy minima
```

Flusso: `cdk bootstrap` (una tantum per account/region — crea bucket asset + ruoli), `cdk synth` (genera CFN), `cdk diff`, `cdk deploy`. Hot-swap per Lambda/StepFn salta CFN per iterazioni dev (mai in prod!).

## 4. SAM — serverless specializzato

Serverless Application Model è una **transform** CFN focalizzata su Lambda/API GW/DynamoDB/StepFn. Sintassi più compatta di CFN puro.

```yaml
Transform: AWS::Serverless-2016-10-31
Resources:
  HelloFn:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: python3.12
      Handler: app.lambda_handler
      CodeUri: ./src
      Events:
        Api:
          Type: HttpApi
          Properties: { Path: /hello, Method: GET }
```

`sam build && sam local invoke HelloFn` esegue la Lambda in container localmente. `sam local start-api` espone l'API GW su `localhost:3000`. `sam deploy --guided` per la prima volta.

## 5. Terraform on AWS

Terraform (HashiCorp / IBM dal 2024) è multi-cloud, con `provider "aws"` ricchissimo. HCL come linguaggio.

```hcl
terraform {
  backend "s3" {
    bucket         = "tfstate-myorg"
    key            = "prod/network.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "tfstate-lock"
    encrypt        = true
  }
}

resource "aws_s3_bucket" "data" {
  bucket = "myapp-${var.env}-${data.aws_caller_identity.current.account_id}"
}
```

State remoto su **S3 + DynamoDB** (lock per evitare apply concorrenti) è lo standard. **Workspace** per separare env (ma molti preferiscono cartelle separate per chiarezza). **Module** = unità riusabile (input variables, output, risorse).

## 6. Confronto e quando scegliere

| Dimensione | CFN | CDK | SAM | Terraform |
|---|---|---|---|---|
| Linguaggio | YAML/JSON | TS/Py/Java/... | YAML | HCL |
| State | gestito AWS | gestito AWS (via CFN) | gestito AWS | tu (S3+DDB) |
| Multi-cloud | no | no | no | sì |
| Rollback auto | sì | sì | sì | no (manuale) |
| Curva | media | alta (codice vero) | bassa per serverless | media |
| Community moduli | media | crescente | piccola | enorme |

Scelta tipica: **CDK** se il team scrive già TypeScript/Python; **Terraform** se sei multi-cloud o vuoi grosso ecosistema modulare; **CFN puro** se vuoi zero dipendenze; **SAM** per pure-serverless quick.

## 7. Best practice trasversali

- **Mai secret inline**: usa Secrets Manager / Parameter Store con `Dynamic Reference` (`{{resolve:secretsmanager:...}}`).
- **Parametrizza per env** (dev/stage/prod), non duplicare template.
- **Tag** sistematici (CostCenter, Owner, Env) via default tag policy o `stack.tags.setTag()`.
- **PR review obbligatoria** sul diff (`cdk diff` / `terraform plan` / change set).
- **State backup**: S3 versioning su tfstate, abilita Drift Detection periodica.
- **Pipeline che applica**, non `terraform apply` dalla laptop: niente credenziali admin sul portatile.

## 8. Esercizio

<details>
<summary>Team Python con 30 Lambda dietro API GW: quale IaC?</summary>

**SAM** per la sua sintassi compatta + `sam local` test, oppure **CDK in Python** se vogliono anche infrastruttura non-serverless (es. RDS, VPC) nello stesso repo. SAM genera CFN sotto: integrabile con CDK al bisogno (`SamHttpApi` construct). Eviterei Terraform: per un mondo 100% serverless AWS aggiunge complessità (state file) senza beneficio.
</details>

<details>
<summary>L'engineer ha modificato a mano un security group fuori da CFN. Cosa succede al prossimo deploy?</summary>

CFN **non sa** del drift finché non lanci esplicitamente `aws cloudformation detect-stack-drift`. Al prossimo update CFN userà come baseline il *suo* stato (l'ultimo template) — può **sovrascrivere** la modifica manuale o, peggio, lasciarla se la proprietà non è toccata dal nuovo template (drift silenzioso). Best practice: drift detection in pipeline notturna, alert su drift, "no manual changes" policy via SCP che blocca `*` IAM in prod.
</details>

> **Riassunto**: CFN nativo con change set/StackSet/drift; CDK = codice tipizzato che sintetizza CFN; SAM = transform CFN per serverless con CLI di test locale; Terraform multi-cloud con state remoto S3+DDB; mai secret inline, sempre PR su diff, deploy da pipeline non da laptop.
