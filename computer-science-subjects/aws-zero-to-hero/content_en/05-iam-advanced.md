---
title: "IAM advanced: conditional policies, STS, ABAC"
area: "Identity & Security"
summary: "Condition keys, ABAC via tags, STS and credential vending, SAML/OIDC federation, sts:ExternalId for safe cross-account, AssumeRoleWithWebIdentity for Kubernetes/CI workloads."
order: 5
level: "intermediate"
prereq:
  - "section 4 (IAM fundamentals)"
tools:
  - "AWS CLI"
  - "jq for parsing STS output"
---

# IAM advanced

Once you understand users, roles and policies, IAM opens in three advanced directions: **conditions** (surgical granularity), **ABAC** (attribute-based access control: govern by tag instead of policy explosion), and **STS** (the backbone of federation and cross-account).

## 1. Condition keys

Condition keys enrich `Allow`/`Deny` with runtime constraints. Three categories:

- **Global**: prefixed `aws:` (exist for all services). Examples: `aws:SourceIp`, `aws:MultiFactorAuthPresent`, `aws:RequestedRegion`, `aws:CurrentTime`, `aws:PrincipalOrgID`.
- **Service-specific**: prefixed by the service. `s3:x-amz-server-side-encryption`, `ec2:InstanceType`, `dynamodb:LeadingKeys`.
- **Tag-based**: `aws:RequestTag/<key>`, `aws:ResourceTag/<key>`, `aws:PrincipalTag/<key>`.

```json
{
  "Effect":"Allow",
  "Action":"ec2:RunInstances",
  "Resource":"*",
  "Condition":{
    "StringEquals":{"ec2:InstanceType":["t3.micro","t3.small"]},
    "StringEqualsIfExists":{"aws:RequestTag/Project":"alpha"},
    "Bool":{"aws:MultiFactorAuthPresent":"true"},
    "IpAddress":{"aws:SourceIp":"203.0.113.0/24"}
  }
}
```

Operator types: `StringEquals`, `StringLike`, `NumericLessThan`, `DateGreaterThan`, `Bool`, `IpAddress`, `ArnLike`, `Null`, and their `*IfExists` variants. AND inside the `Condition` block, OR inside arrays.

## 2. ABAC: govern by tag

ABAC = **Attribute-Based Access Control**. Instead of writing a policy per team/project, you write ONE policy saying "you can act on resources whose `Project` tag matches your `Project`".

```json
{
  "Effect":"Allow",
  "Action":["s3:GetObject","s3:PutObject"],
  "Resource":"arn:aws:s3:::data-*/*",
  "Condition":{
    "StringEquals":{"aws:ResourceTag/Project":"${aws:PrincipalTag/Project}"}
  }
}
```

Pros:

- Scales to 1,000 teams without exploding policy count.
- New team = new tag, zero IAM code.
- Simpler audit: tags are the truth.

Cons:

- Requires tag governance (who applies, automated validation).
- Legacy resources without tags → silent fail.
- Harder to debug ("why don't I see this resource?").

## 3. STS: the credential vending machine

**STS (Security Token Service)** issues temporary credentials. Every assumeRole, every federation, every `aws sso login` ends in an STS call returning three things: AccessKeyId, SecretAccessKey, SessionToken — valid 15 min–12 hours.

Main APIs:

| API | When |
|---|---|
| `AssumeRole` | principal A assumes a role (same or other account) |
| `AssumeRoleWithSAML` | user from SAML IdP (Okta, AD FS) assumes a role |
| `AssumeRoleWithWebIdentity` | identity from OIDC (Cognito, Google, GitHub Actions, Kubernetes IRSA) |
| `GetSessionToken` | an IAM user gets an MFA-protected session |
| `GetFederationToken` | rare, for proxy apps |

Critical point: STS is **regional**. There's a global endpoint (`sts.amazonaws.com`) but it's considered anti-pattern: use the regional endpoint (`sts.eu-west-1.amazonaws.com`) for latency and failure isolation.

## 4. Cross-account: the confused deputy and ExternalId

Scenario: you (account A) want a vendor (account B, e.g. Datadog) to access your S3. You create a role in A with `Principal: arn:aws:iam::B:root` in trust policy.

Problem: B might assume your role on behalf of **one of B's other customers** (confused deputy). Solution: **sts:ExternalId** — a secret value A generates and gives B. B must include it in `AssumeRole`. A verifies it.

```json
"Condition":{
  "StringEquals":{"sts:ExternalId":"a-random-secret-12345"}
}
```

Every serious SaaS vendor (Datadog, Snowflake, Wiz, etc.) requires this.

## 5. Modern federation: IAM Identity Center + OIDC

**IAM Identity Center** (formerly AWS SSO) is the 2026 way to manage humans. Connects to your IdP (Entra ID, Okta, Google Workspace), users SSO once and access all Organization accounts with permission sets per account.

**OIDC** (OpenID Connect) is for non-AWS workloads. Practical examples:

- **GitHub Actions** gets AWS credentials without static keys (`AssumeRoleWithWebIdentity` against an OIDC identity provider trusting GitHub).
- **Kubernetes IRSA** (IAM Roles for Service Accounts): EKS pods assume a role based on the service account.

Example trust policy for GitHub Actions:

```json
{
  "Version":"2012-10-17",
  "Statement":[{
    "Effect":"Allow",
    "Principal":{"Federated":"arn:aws:iam::111:oidc-provider/token.actions.githubusercontent.com"},
    "Action":"sts:AssumeRoleWithWebIdentity",
    "Condition":{
      "StringEquals":{"token.actions.githubusercontent.com:aud":"sts.amazonaws.com"},
      "StringLike":{"token.actions.githubusercontent.com:sub":"repo:myorg/myrepo:ref:refs/heads/main"}
    }
  }]
}
```

Result: the CI workflow gets AWS credentials expiring in 1 hour, zero secrets in the repo.

## 6. Permissions boundary in detail

A boundary is a policy that caps the **maximum** another policy can grant. It grants nothing on its own. Typical pattern: give devs the right to create roles, but with a fixed boundary.

```bash
aws iam create-role \
  --role-name app-role \
  --assume-role-policy-document file://trust.json \
  --permissions-boundary arn:aws:iam::111:policy/DevBoundary
```

Even if the dev attaches `AdministratorAccess` to the created role, the role cannot exceed the boundary.

## 7. Real anti-patterns (actual incidents)

- **`Action: *, Resource: *`** on app roles. One container breach = total takeover.
- **Trust policy with `Principal: *`**: anyone on Earth knowing the ARN can assume the role.
- **A dev's access key on a personal laptop**, synced to iCloud, phished. Real life, repeatedly.
- **CloudFormation run with `CAPABILITY_AUTO_EXPAND`** with no review of generated policies.
- **EC2 metadata IMDSv1** (deprecated): trivial SSRF exposes credentials. Always force IMDSv2.

## 8. Exercise

<details>
<summary>You want a role to launch EC2 ONLY as `t3.micro/small` AND with the `Owner=email-dev` tag. Policy?</summary>

```json
{
  "Effect":"Allow",
  "Action":["ec2:RunInstances","ec2:CreateTags"],
  "Resource":"*",
  "Condition":{
    "StringEquals":{"ec2:InstanceType":["t3.micro","t3.small"]},
    "StringEquals":{"aws:RequestTag/Owner":"${aws:username}@example.com"},
    "ForAllValues:StringEquals":{"aws:TagKeys":["Owner","Project"]}
  }
}
```

`ForAllValues` blocks adding tags outside the list. Without `StringEquals` on `aws:RequestTag`, the dev could launch with no tag.
</details>

<details>
<summary>GitHub Actions deploys to AWS. Explain how to avoid putting keys in GitHub Secrets.</summary>

1. In AWS, create an OIDC identity provider trusting `token.actions.githubusercontent.com`.
2. Create an IAM role `github-deploy-role` with the trust policy above (with `sub` narrowed to specific repo/branch).
3. In the GitHub workflow:
```yaml
permissions:
  id-token: write
  contents: read
steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::111:role/github-deploy-role
      aws-region: eu-west-1
```
4. GitHub Actions requests an OIDC token, sends it to AWS STS, gets AWS credentials expiring in 1 hour.

No static keys, no "key rotation". If the repo is compromised, just narrow `sub` in the trust policy.
</details>

> **Summary**: condition keys for surgical granularity; ABAC to scale by tag instead of policy explosion; STS for temporary credentials (never static); ExternalId for cross-account with vendors; IAM Identity Center for humans; OIDC (`AssumeRoleWithWebIdentity`) for external workloads like GitHub Actions and Kubernetes IRSA; permissions boundary to free devs without exploding blast radius.
