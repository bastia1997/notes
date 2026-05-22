---
title: "AWS account, root user, billing"
area: "Foundations"
summary: "Open the account, lock the root user, enable MFA, cost alarms, free tier. The first-30-minute decisions that save you from disasters."
order: 3
level: "beginner"
prereq:
  - "sections 1-2"
  - "international credit/debit card"
tools:
  - "console: https://console.aws.amazon.com"
  - "YubiKey or authenticator app (Google/Microsoft/Authy)"
---

# AWS account, root user, billing

An AWS account is the **primary billing and security boundary**. Every resource you create (EC2, S3, IAM users) lives inside an account. Serious shops run **dozens or hundreds** of accounts (one per team, environment, workload) federated under AWS Organizations (section 8). Here you open your first.

## 1. What an account really is

An AWS account has:

- A **12-digit numeric account ID** (e.g. `123456789012`), shown in ARNs.
- A single registration email and password (the **root user**).
- Its own billing (card or invoicing for Enterprise).
- Its own IAM "tenant": users, roles, policies.
- Its own set of resources, isolated from other accounts unless explicitly shared (Resource Access Manager, cross-account roles).

The account itself is **free**. You only pay for what you use.

## 2. The root-user golden rule

The root user has **absolute permissions** (can close the account, change email, access billing). If compromised, you've lost. So:

1. **MFA mandatory**. Right now, before closing the browser. Ideally a hardware key (YubiKey). Since early 2024 AWS mandates root MFA on Organizations accounts.
2. **Never used for daily work**. After creation, log out and don't return unless emergency (closing account, billing change).
3. **No root access keys**. Immediately delete any access keys on root. Never create them again.
4. **Email on a dedicated alias**. Not `work@yourcompany.com` (can vanish if you leave): `aws-root+companyname@…` on an inbox controlled by a team alias.

## 3. Open the account — checklist

```text
1. Go to https://aws.amazon.com → "Create AWS account"
2. Email + password (strong, password manager)
3. Type: Personal or Business — Business unlocks Organizations features
4. Tax data (VAT for EU businesses to get reverse-charge VAT exemption)
5. Credit card (AWS pre-authorizes ~$1 and releases)
6. Phone verification via SMS or call
7. Support plan: pick Basic (free)
```

Registration done: **stop**. The first 30 minutes are critical.

## 4. Immediate hardening (the first 30 minutes)

In order:

1. **Enable MFA on root**: Console → top right "Security credentials" → "Multi-factor authentication" → Assign.
2. **Delete any root access key** (if one was accidentally created).
3. **Create your personal IAM user** or, better, an **IAM Identity Center user** (see sections 5/39). For now an IAM user with `AdministratorAccess` policy + MFA is fine. Use only this from now on.
4. **Set an account alias**: IAM dashboard → Account Alias. Now the login URL becomes `https://myalias.signin.aws.amazon.com/console` instead of the 12-digit ID.
5. **Enable an IAM password policy**: minimum length, character mix, rotation, no reuse.
6. **Disable Regions you won't use**: Account settings → Regions. Reduces attack surface and prevents someone launching EC2 in São Paulo.
7. **Enable CloudTrail in all Regions** (create a "multi-region" trail). Audit log of every API call. Costs ~$2/month typical, indispensable for investigations.

## 5. Billing setup — never skip this

Every account should have **two** minimum alarms on day one:

```bash
# Example: monthly budget $20 with email notification at $15 (75%) and $20 (100%)
aws budgets create-budget \
  --account-id 123456789012 \
  --budget '{
    "BudgetName":"monthly-soft-cap",
    "BudgetLimit":{"Amount":"20","Unit":"USD"},
    "TimeUnit":"MONTHLY",
    "BudgetType":"COST"
  }' \
  --notifications-with-subscribers '[{
    "Notification":{
      "NotificationType":"ACTUAL",
      "ComparisonOperator":"GREATER_THAN",
      "Threshold":75
    },
    "Subscribers":[{"SubscriptionType":"EMAIL","Address":"you@yourcompany.com"}]
  }]'
```

Also enable:

- **Free Tier Alerts**: Billing dashboard → Preferences → "Receive Free Tier Usage Alerts".
- **Cost Explorer**: free to enable, gives per-service and per-tag breakdowns.
- **Cost Anomaly Detection**: ML-based, alerts on suspicious spikes.

## 6. Free tier: what's actually free

Three categories:

| Type | Example | Duration |
|---|---|---|
| **12-month free** | 750h/mo EC2 t2/t3.micro, 5 GB S3 Standard, 750h RDS db.t2/t3/t4g.micro | first 12 months from sign-up |
| **Always free** | 1M Lambda invocations/mo, 25 GB DynamoDB, 100 GB CloudFront egress, 750h ElastiCache micro | forever |
| **Trials** | Inspector, Macie etc.: 30–90 days | one-time |

**Classic trap**: free tier covers **specific instance types in specific Regions**. Accidentally launch a `t3.large` or sit in `me-south-1` and you're billed full price. Always check [aws.amazon.com/free](https://aws.amazon.com/free/).

## 7. Data-transfer cost — the hidden dumpster

| Direction | Typical cost |
|---|---|
| Internet → AWS (ingress) | free |
| AWS → Internet (egress) | ~$0.09/GB (with 100 GB/mo free since 2024+) |
| EC2 → EC2 same AZ via private IP | free |
| EC2 → EC2 cross-AZ same Region | $0.01/GB each direction |
| Cross-Region | $0.02–$0.09/GB |
| NAT Gateway processing | $0.045/GB processed |
| VPC Gateway Endpoint (S3/DynamoDB) | free (skips NAT) |

Disaster example: app in private subnet calling S3 via NAT Gateway. 1 TB/month: $45 NAT + $0 to same-region S3. Adding a VPC Gateway Endpoint for S3 takes it to $0. We'll see this in section 10.

## 8. Exercise: new-account setup

<details>
<summary>You opened a new AWS account. Name the 7 first-30-minute actions.</summary>

1. MFA on root user (hardware key if possible).
2. Log out of root, never use it for work.
3. Create IAM user (or IAM Identity Center) admin with MFA.
4. Set account alias for easier login URL.
5. Configure IAM password policy.
6. Disable unused Regions.
7. Enable CloudTrail multi-region + Budget alert.

Bonus: enable Cost Anomaly Detection, AWS Config (for configuration auditing), and — if you already have an organization — invite this account into Organizations.
</details>

<details>
<summary>You forgot the root password and lost access to the registered email. How to recover?</summary>

Formal procedure via [aws.amazon.com/support](https://aws.amazon.com/contact-us/account-support/): you must prove ownership with company documents, card receipts, etc. Can take days. **This is why root email must be on a team-controlled alias.**

If you have MFA and lose the device, there's an "alternate verification" procedure (phone + email): 1–2 days.
</details>

> **Summary**: account = billing and security boundary. Root user is a "president": votes once (sign-up) then leaves. MFA immediately, IAM user for daily work, budget alerts on day one, CloudTrail on for audit. Free tier covers 12 months + some "always free", but check region and instance. The cost line that bites is **data transfer**, mostly egress and NAT Gateway.
