---
title: "CLI, SDK, CloudShell, IaC primer"
area: "Foundations"
summary: "Console is for exploring, production is in CLI/IaC. AWS CLI v2, Python (boto3) and JS SDKs, in-browser CloudShell, and an intro to CloudFormation/Terraform/CDK."
order: 6
level: "beginner"
prereq:
  - "sections 1-5"
tools:
  - "AWS CLI v2"
  - "Python 3 + boto3"
  - "Terraform or AWS CDK (optional, see section 34)"
---

# CLI, SDK, CloudShell, IaC primer

The AWS web console is a fine onboarding tool. For everything else it's a **slow keyboard**: clicking 47 times to build a VPC with 6 subnets is untenable, irreproducible, not audit-friendly. Everything in AWS is API: console, CLI, SDK and IaC are just different clients for the same APIs.

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
aws configure           # interactive: key, secret, region, output
aws configure sso       # BETTER: use IAM Identity Center instead of static keys
```

CLI v2 brings:

- **Integrated SSO** (`aws configure sso`).
- **Auto-prompt** (`aws --cli-auto-prompt`): interactive wizard for any command.
- **Server-side and client-side pagination** automatically.
- **JMESPath queries** (`--query`) for filtering output.

Daily examples:

```bash
aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{Id:InstanceId,Type:InstanceType,State:State.Name}' \
  --output table

aws s3 ls
aws s3 cp ./build/ s3://my-bucket/v1.2/ --recursive --acl bucket-owner-full-control

aws logs tail /aws/lambda/myfunction --follow --since 10m
```

## 2. Profiles and credentials

Credentials live in two files:

```
~/.aws/credentials       # static access keys (legacy)
[default]
aws_access_key_id = AKIA...
aws_secret_access_key = ...

~/.aws/config            # profiles, region, output, SSO
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

Usage:

```bash
aws s3 ls --profile prod
AWS_PROFILE=prod aws s3 ls
aws sso login --profile prod   # opens browser, login once per day
```

## 3. SDK: boto3 (Python) and JS

```python
import boto3
s3 = boto3.client("s3", region_name="eu-west-1")
for page in s3.get_paginator("list_objects_v2").paginate(Bucket="my-bucket"):
    for item in page.get("Contents", []):
        print(item["Key"], item["Size"])

# Resource-style (more OO)
ddb = boto3.resource("dynamodb")
table = ddb.Table("orders")
table.put_item(Item={"order_id":"o123","customer":"alice","total":99.9})
```

Critical patterns:

- **No hardcoded keys**: boto3 looks for credentials in order — env vars → `~/.aws/credentials` → EC2 instance role → ECS/Lambda task role.
- **Pagination is mandatory**: most list-APIs cap at 1000 items. Use `get_paginator`.
- **Retry/backoff**: configurable via `botocore.config.Config(retries={"max_attempts":10, "mode":"adaptive"})`.
- **Errors**: catch `botocore.exceptions.ClientError`, inspect `e.response["Error"]["Code"]`.

## 4. CloudShell

CloudShell is an in-browser Linux shell with AWS CLI pre-installed, persistent 1 GB home, credentials injected from the console (zero setup). Open it from the top-right console icon. Useful for:

- Quick tests without installing anything.
- Emergency ops (forgot laptop, need to terminate an EC2).
- Demos / training.

Limits: 1 GB persistent, idle session expires in 20 min, no root sudo (you can `sudo apt` but cannot mount devices).

## 5. IaC: why it's mandatory

Infrastructure as Code = describe infrastructure in versioned text files. Three non-negotiable reasons:

1. **Reproducibility**: recreating the environment in another account/Region is one command.
2. **Review**: infra goes through pull requests like code.
3. **Drift detection**: you know if someone clicked something in the console.

Three main tools on AWS:

| Tool | Language | When |
|---|---|---|
| **CloudFormation** | YAML/JSON | native AWS, no deps, slow |
| **AWS CDK** | TypeScript/Python/Go/Java/.NET | high-level logic (loops, conditionals), generates CFN under the hood |
| **Terraform** | HCL | multi-cloud, huge community ecosystem |

For beginners: CDK is most productive if you're already a developer; Terraform if you also do GCP/Azure; CloudFormation for zero deps.

## 6. CloudFormation mini-example

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: "Private S3 bucket with versioning"
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

## 7. Terraform mini-example

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

## 8. Exercise

<details>
<summary>You must automate a daily report of all EC2s stopped >30 days across all accounts. Approach?</summary>

1. **Hub account**: 1 "operations" account with a role assumable in every spoke account.
2. **Python (boto3)** in a Lambda scheduled by EventBridge cron.
3. Per spoke account: `sts:AssumeRole`, `ec2:describe-instances` with filter `instance-state-name=stopped`, compute `LaunchTime`/state transitions (needs CloudTrail or `StoppedAt` tag).
4. Aggregate to SNS topic / Slack webhook / S3 + Athena.

Preferred pattern: **AWS Config** advanced query, which already normalizes config cross-account. One SQL query against the aggregator returns the report.
</details>

<details>
<summary>You ran a command with the wrong profile and created a VPC in prod. How to prevent next time?</summary>

- Use clearly named profiles (`prod-readonly`, `prod-write-mfa`, `dev`) — never `default` for production.
- Put `AWS_PROFILE` in your shell prompt (see `aws-vault` or `granted`).
- `aws-vault exec prod-write --` requires MFA before each command.
- IAM Identity Center: tokens expire in 1 hour, so you must consciously `aws sso login --profile prod` first.
- An SCP blocking changes outside business hours or without a specific tag (e.g. `RequestTag/Operator`).
</details>

> **Summary**: console only for exploring; CLI v2 for automation (always set up via `aws configure sso`); SDK boto3/JS for scripting; CloudShell for in-browser emergencies; IaC mandatory in production (CDK > Terraform > CloudFormation in productivity order for developers). Named profiles and MFA prevent "wrong-profile" disasters.
