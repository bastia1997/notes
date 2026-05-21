---
title: "Pricing, billing, free tier, cost tools"
area: "Foundations"
summary: "On-Demand vs Reserved vs Savings Plans vs Spot, bill breakdown, Cost Explorer, Budgets, Cost Anomaly Detection, and the three 'killers' that blow up your costs."
order: 7
level: "beginner"
prereq:
  - "sections 1-3"
tools:
  - "Cost Explorer (free)"
  - "AWS Pricing Calculator: calculator.aws"
  - "boto3 ce client to export CSV"
---

# Pricing, billing, free tier, cost tools

AWS pricing is **modular**: every service bills a handful of dimensions (compute-hour, GB-month, requests, GB-transferred). The total bill is the sum of hundreds of those line items. With no discipline, startups reach $50k/month with 30% of resources never used. This page gives you the map.

## 1. Six compute pricing models

Applies to EC2 but the concept extends to other compute services.

| Model | Discount vs on-demand | Commitment | When |
|---|---|---|---|
| **On-Demand** | 0% (baseline) | none | dev, unpredictable workloads, prototypes |
| **Savings Plans (Compute)** | up to 66% | 1 or 3 years, $/h committed | stable workloads, instance-type agnostic |
| **Savings Plans (EC2 Instance)** | up to 72% | 1 or 3 years, $/h per family/region | stable AND you know the family |
| **Reserved Instances** | up to 75% | 1 or 3 years, specific instance | legacy: SP is almost always better today |
| **Spot** | up to 90% | none, but can be terminated with 2-min notice | batch, fault-tolerant, ML training |
| **Dedicated Host** | premium | 1 or 3 years | compliance/licensing (e.g. Oracle BYOL) |

Rule of thumb: cover **70–80% of baseline** with 1-year Compute Savings Plans, handle peaks with on-demand, do interruptible jobs on Spot.

## 2. The three universal cost dimensions

For almost every service you pay:

1. **Compute / requests**: EC2 hours, Lambda GB-sec, millions of DynamoDB/S3/SQS requests.
2. **Storage**: GB-months (S3, EBS, snapshots, EFS, RDS storage).
3. **Data transfer**: the hidden dumpster (see section 3, "egress").

Real monthly breakdown for a typical web startup ($3,500/month):

| Line item | $ | % |
|---|---|---|
| EC2 (compute) | 1200 | 34% |
| RDS (db.r5.large Multi-AZ) | 450 | 13% |
| S3 (5 TB) | 115 | 3% |
| CloudFront (10 TB egress) | 700 | 20% |
| Data Transfer Out (direct) | 280 | 8% |
| NAT Gateway | 140 | 4% |
| CloudWatch Logs (30-day retention) | 200 | 6% |
| ALB | 60 | 2% |
| Other (Secrets, KMS, Route53, etc.) | 355 | 10% |

Typical optimization targets: **NAT Gateway** (replaceable with VPC endpoint for S3/DynamoDB), **CloudWatch Logs** (infinite retention by default!), **EBS gp2 vs gp3** (gp3 cheaper and faster), **old snapshots** not deleted.

## 3. The "egress killer"

The three most expensive traffic dynamics:

| Source | Typical cost | Mitigation |
|---|---|---|
| EC2/Lambda → Internet | $0.09/GB | CloudFront (cache reduces) |
| EC2 → S3 same Region via NAT | $0.045/GB processed + 0 to S3 | VPC Gateway Endpoint (free) |
| Cross-AZ via ALB | $0.01/GB each direction | consider cross-zone disabled (risk: imbalance) |
| Cross-Region replication | $0.02/GB | replicate only what truly needs to |

Real 2024 case documented: a SaaS company finds $40k/month of egress because a microservice in `us-east-1` calls another in `us-west-2` every request. Fix: move services to the same Region or use PrivateLink intra-Region.

## 4. Free tier — quick recap

- **12 months**: 750h EC2 t2/t3/t4g.micro, 5 GB S3 Standard, 750h RDS micro, 1 GB DB storage, 30 GB EBS.
- **Always free**: 1M Lambda invocations/month + 400k GB-seconds, 25 GB DynamoDB + 25 RCU/WCU, 1M SNS, 1M SQS, 750h ElastiCache micro (some plans), 5 GB CloudWatch Logs ingest + 5 GB archived.
- **CloudFront**: 1 TB egress/month + 10M requests/month (perpetually since 2021).

Trap: the 750h are **per instance family, per Region**. Two t3.micros 24/7 in eu-west-1 burn the free tier mid-month.

## 5. Free cost tools

### Cost Explorer
Free to enable. Per-service, per-account, per-Region, per-tag breakdown. Charts and 12-month forecasts.

### Budgets
Soft-cap alerts ($, %, forecast). Free up to 62 budgets per account.

### Cost Anomaly Detection
ML that catches anomalous spikes (e.g. lambda in a loop). Emails/SNS.

### Cost & Usage Report (CUR)
Detailed (line-item) hourly export to S3. Query with Athena. Mandatory for serious FinOps.

### Pricing Calculator
[calculator.aws](https://calculator.aws). Build a virtual architecture and get an estimate. Useful for business cases.

### Trusted Advisor
Pre-baked checks ("you have idle EC2", "orphan snapshots"). Basic version free; full requires Business/Enterprise Support.

### Compute Optimizer
ML that recommends rightsizing for EC2/EBS/Lambda/ASG based on CloudWatch. Sees "you're using 8 vCPU at 5%, drop to 2".

## 6. Tagging strategy

Without tags you can't do cost allocation. Minimum standard:

| Tag key | Examples |
|---|---|
| `Owner` | `team-platform`, `alice@acme.com` |
| `Environment` | `prod`, `staging`, `dev` |
| `CostCenter` | `eng`, `marketing`, `data` |
| `Project` | `checkout-v2` |
| `ExpiryDate` | `2026-12-31` (for cleanup) |

**Enforcement**: use SCPs with `aws:RequestTag/<key>` to prevent creating resources without tags. AWS Organizations supports "Tag Policies" to validate allowed values.

## 7. Three FinOps golden rules

1. **Never forget decommissioning**: an EC2 stopped "for testing" 6 months ago still pays EBS storage. Orphan snapshots = $$$.
2. **Stop dev/staging off-hours**: a Lambda cron saves 60–70% of dev EC2/RDS.
3. **Re-instance once a year**: new families (e.g. m5 → m7i, gp2 → gp3) cost less and go faster.

## 8. Exercise

<details>
<summary>The bill jumped to $8k this month vs $3k average. How do you investigate?</summary>

1. **Cost Explorer** grouped by service: identify the "guilty" service.
2. Group by **Region**, then by **resource tag**: find which workload.
3. If EC2: Compute Optimizer to check rightsizing vs quantity.
4. If data transfer: **VPC Flow Logs** + Athena to find who talks to whom.
5. **Cost Anomaly Detection** should already have notified you: check email/SNS.
6. CUR + Athena if Cost Explorer isn't enough (e.g. costs by hour of day).

Common patterns: Lambda in a loop, NAT Gateway saturated by a chatty microservice, Aurora doing cross-Region replication by mistake, CloudWatch Logs with no retention.
</details>

<details>
<summary>Stable $5k/month EC2 workload in eu-west-1. How much do you save with 3-year Savings Plans?</summary>

- Compute Savings Plans 3-year, no upfront: ~54% off = ~$2,750/month → **~$27k saved over 12 months**.
- Compute Savings Plans 3-year, all upfront: ~66% off = pay ~$60k today, "spend" ~$1,700/month equivalent.
- Reserved Instances (specific instance) 3-year all-upfront: ~75% off but locked to family/AZ.

Trade-off: 3 years is a long time. Early-stage startup → 1 year is safer (~40% discount).
</details>

> **Summary**: AWS pricing = compute + storage + data transfer per service. Free tier covers a lot but watch family/Region. Cost Explorer + Budgets + Anomaly Detection are zero-cost mandatory setup. NAT Gateway, retention-less CloudWatch Logs, orphan snapshots are silent killers. Savings Plans cover baseline, Spot for batch, on-demand for peak. Without tags there's no cost allocation: enforce with SCPs.
