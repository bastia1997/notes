---
title: "IaC on AWS — CloudFormation, CDK, SAM, Terraform"
area: "DevOps"
summary: "Four ways to describe infrastructure as code on AWS: comparison, idioms, gotchas (drift, remote state, capabilities)."
order: 34
level: "intermediate"
prereq:
  - "section 6"
tools:
  - "AWS CLI"
  - "AWS CDK"
  - "Terraform"
  - "SAM CLI"
---

# IaC on AWS

Click-ops infrastructure is the most expensive technical debt out there: nobody remembers why that security group has port 1521 open, and on SOC2 audit day you pay dearly. IaC is the cure: every resource is born from a versioned text file in git, reproducible and reviewable in PR. On AWS you have four mainstream options — let's see when to pick which.

## 1. CloudFormation (CFN) — the foundation

AWS-native service: YAML/JSON templates describing a **stack** (a set of resources managed together). CFN holds the state for you (no state file to manage) and auto-rolls-back on error.

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

Key concepts: **Change Set** (diff preview before apply), **Nested Stack** (modularity), **StackSet** (multi-account/multi-region deploy from a management account), **Transform** (e.g. `AWS::Serverless` for SAM, `AWS::Include`), **Custom Resource** (Lambda managing non-native resources), **Drift Detection** (detects out-of-band changes).

## 2. Capabilities, Termination Protection, Drift

Creating IAM resources requires `--capabilities CAPABILITY_IAM` or `CAPABILITY_NAMED_IAM`; macros/SAM need `CAPABILITY_AUTO_EXPAND`. Without these, CFN refuses — explicit consent that the pipeline may create permissions.

| Concept | What it does | When it matters |
|---|---|---|
| Change Set | Diff preview | PR review before prod apply |
| Termination Protection | Blocks stack delete | Prod root stack |
| Drift Detection | Compares CFN vs reality | Periodic audit |
| DeletionPolicy: Retain | Keeps resource if stack dies | DB, data bucket |
| UpdateReplacePolicy: Snapshot | Snapshot before replace | RDS |

## 3. AWS CDK — real code

CDK is a TypeScript/Python/Java/.NET/Go wrapper that **synthesizes** CloudFormation templates. Upside: typed, reusable constructs with sane defaults.

Three levels:
- **L1** (`CfnBucket`): raw 1:1 with CFN.
- **L2** (`s3.Bucket`): idiomatic abstraction with methods like `.grantRead(role)`.
- **L3 / Pattern** (`ApplicationLoadBalancedFargateService`): full multi-resource patterns.

```typescript
const bucket = new s3.Bucket(this, 'Data', {
  encryption: s3.BucketEncryption.S3_MANAGED,
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  removalPolicy: RemovalPolicy.RETAIN,
});
bucket.grantRead(lambdaFn);  // generates least-privilege IAM
```

Flow: `cdk bootstrap` (one-shot per account/region — creates asset bucket + roles), `cdk synth` (emits CFN), `cdk diff`, `cdk deploy`. Hot-swap for Lambda/StepFn skips CFN for dev iterations (never in prod!).

## 4. SAM — serverless specialised

Serverless Application Model is a CFN **transform** focused on Lambda/API GW/DynamoDB/StepFn. More compact syntax than raw CFN.

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

`sam build && sam local invoke HelloFn` runs the Lambda in a container locally. `sam local start-api` exposes API GW on `localhost:3000`. `sam deploy --guided` first time.

## 5. Terraform on AWS

Terraform (HashiCorp / IBM since 2024) is multi-cloud, with a huge `provider "aws"`. HCL as language.

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

Remote state on **S3 + DynamoDB** (lock to prevent concurrent applies) is standard. **Workspace** to separate envs (but many prefer separate folders for clarity). **Module** = reusable unit (input vars, outputs, resources).

## 6. Comparison and when to pick

| Dimension | CFN | CDK | SAM | Terraform |
|---|---|---|---|---|
| Language | YAML/JSON | TS/Py/Java/... | YAML | HCL |
| State | AWS-managed | AWS-managed (via CFN) | AWS-managed | yours (S3+DDB) |
| Multi-cloud | no | no | no | yes |
| Auto rollback | yes | yes | yes | no (manual) |
| Curve | medium | steep (real code) | shallow for serverless | medium |
| Module community | medium | growing | small | huge |

Typical choice: **CDK** if team already writes TypeScript/Python; **Terraform** if multi-cloud or you want a huge module ecosystem; **plain CFN** if you want zero dependencies; **SAM** for pure-serverless quick wins.

## 7. Cross-cutting best practices

- **Never inline secrets**: use Secrets Manager / Parameter Store with `Dynamic Reference` (`{{resolve:secretsmanager:...}}`).
- **Parameterize per env** (dev/stage/prod), don't duplicate templates.
- **Systematic tags** (CostCenter, Owner, Env) via default tag policy or `stack.tags.setTag()`.
- **Mandatory PR review** on the diff (`cdk diff` / `terraform plan` / change set).
- **State backup**: S3 versioning on tfstate, periodic Drift Detection.
- **Pipeline applies**, not `terraform apply` from a laptop: no admin credentials on a workstation.

## 8. Exercise

<details>
<summary>Python team, 30 Lambdas behind API GW: which IaC?</summary>

**SAM** for its compact syntax + `sam local` testing, or **CDK in Python** if they want non-serverless infrastructure (RDS, VPC) in the same repo. SAM emits CFN underneath: integrable with CDK as needed (`SamHttpApi` construct). I'd avoid Terraform: for a 100% serverless AWS world it adds complexity (state file) with no benefit.
</details>

<details>
<summary>An engineer changed a security group out-of-band. What happens on next deploy?</summary>

CFN **doesn't know** about the drift until you explicitly run `aws cloudformation detect-stack-drift`. On the next update CFN uses *its* state (the last template) as baseline — it may **overwrite** the manual change or, worse, leave it if the property is untouched by the new template (silent drift). Best practice: drift detection in a nightly pipeline, alert on drift, "no manual changes" policy via an SCP that blocks `*` IAM in prod.
</details>

> **Summary**: native CFN with change set/StackSet/drift; CDK = typed code that synthesizes CFN; SAM = CFN transform for serverless with local-test CLI; Terraform multi-cloud with remote S3+DDB state; never inline secrets, always PR on diff, deploy from pipeline not laptop.
