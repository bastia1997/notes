---
title: "EC2 — fundamentals (instances, AMIs, lifecycle)"
area: "Compute"
summary: "On-demand virtual machines: instance families, AMIs, user data, EBS root volumes, key pairs, Instance Connect/SSM, lifecycle (start/stop/terminate)."
order: 13
level: "beginner"
prereq:
  - "sections 1, 9"
tools:
  - "AWS CLI"
  - "SSM Session Manager"
---

# EC2 — fundamentals

EC2 (Elastic Compute Cloud) is the "on-demand virtual machine" that launched AWS. Despite the rise of serverless and containers, EC2 remains the primitive *many* other services are built on (ECS/EKS-EC2, EMR, Elastic Beanstalk).

## 1. Anatomy of an instance

When launching an EC2 you pick 6 things:

1. **AMI** (Amazon Machine Image): disk template (OS + preinstalled software).
2. **Instance type**: family + size (e.g. `t3.medium`, `m7i.xlarge`, `r6g.2xlarge`).
3. **VPC + subnet**: where it lives (defines AZ).
4. **Key pair**: SSH key (often unneeded today — use SSM).
5. **Security group**: stateful firewall.
6. **EBS root volume + (optional) data volumes**.

```bash
aws ec2 run-instances \
  --image-id ami-0abcd1234 \
  --instance-type t3.micro \
  --key-name my-key \
  --subnet-id subnet-xxx \
  --security-group-ids sg-yyy \
  --iam-instance-profile Name=AmazonSSMRoleForInstancesQuickSetup \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=web-1}]' \
  --user-data file://bootstrap.sh
```

## 2. Instance families

Naming: `<family letter><generation><attrs>.<size>`. Examples:

| Family | Workload | Examples |
|---|---|---|
| **T** (burstable) | dev, low/medium web traffic, sporadic peaks | t3, t4g (ARM) |
| **M** (general) | balanced CPU/RAM, web, app | m6i, m7g, m7i |
| **C** (compute) | CPU-heavy: high-QPS web, encoding, gaming | c7i, c7g |
| **R** (memory) | DB, cache, in-memory analytics | r6i, r7g |
| **X / u** (extreme memory) | SAP HANA, in-memory DB | x2idn, u-9tb1 |
| **I / D / H** (storage) | local NVMe: NoSQL, big data | i4i, d3, h1 |
| **P / G / Trn / Inf** (accelerated) | GPU, ML training (Trn), inference (Inf) | p5, g6, trn1, inf2 |

Generation letters: higher number = newer, usually better. `g` suffix = ARM (Graviton, ~20% cheaper).

## 3. AMIs

3 types:

- **AWS-managed** (Amazon Linux 2023, Ubuntu, Windows): updated by AWS.
- **AWS Marketplace**: third-party (e.g. CloudHealth, Sophos).
- **Custom** (yours): start from a base + customizations with **Packer** or **EC2 Image Builder**.

Best practice: immutable AMI + user-data for minimal config + IaC for deploy. No hand-built "snowflake AMIs".

## 4. User data and cloud-init

The bootstrap script run **on first boot**. Bash or cloud-init YAML.

```bash
#!/bin/bash
dnf update -y
dnf install -y nginx
systemctl enable --now nginx
echo "<h1>Hello $(hostname)</h1>" > /usr/share/nginx/html/index.html
```

## 5. Lifecycle

| State | What you pay | Notes |
|---|---|---|
| `pending` | nothing | transition |
| `running` | EC2 + EBS + public IP if Elastic | almost everything |
| `stopping` / `stopped` | only EBS storage | RAM discarded, public IP lost (unless Elastic IP) |
| `shutting-down` / `terminated` | nothing | EBS data lost if "DeleteOnTermination=true" (default for root) |
| `hibernate` | EBS (RAM snapshot on EBS) | fast restart with state |

Trap: stop ≠ terminate. Stop preserves the instance; terminate destroys it.

## 6. Instance storage

3 types:

- **EBS** (Elastic Block Store): network volume, persistent, survives stop/start. Default for root.
- **Instance Store**: local SSD/NVMe, physically attached to the host, **destroyed on stop/terminate**. Very fast. Only on certain types (i, d, h, etc.).
- **EFS / FSx**: shared filesystem, mounted as NFS.

See section 19 for detail.

## 7. Access: SSH vs SSM

**Old way (SSH)**:
- RSA/ED25519 key pair, port 22 open in SG, public IP or bastion.
- Risks: keys spread around, port 22 exposed, hard audit.

**New way (SSM Session Manager)**:
- No port 22, no keys, no public IP.
- EC2 has SSM Agent (preinstalled on Amazon Linux) + IAM role `AmazonSSMManagedInstanceCore`.
- Connect via `aws ssm start-session --target i-xxx` or from the console.
- Automatic audit log in CloudTrail and (optionally) S3.

2026 best practice: SSM only. Don't install SSH keys.

## 8. Exercise

<details>
<summary>A web app must handle 5000 RPS, p99 latency < 100 ms. Which EC2 family?</summary>

Structured thinking:
- **CPU bound** (e.g. live image encoding): C7i or C7g (Graviton, cheaper).
- **Memory bound** (heavy in-process cache): R7i or R7g.
- **Balanced** (traditional web, Node/Java app servers): M7i or M7g.
- **Dev / burstable traffic**: T3/T4g.

For 5000 RPS standard HTTP app, **m7g.large** (2 vCPU 8 GB ARM) or **c7g.large** behind an ALB is a good starting point; then measure and horizontally autoscale.
</details>

<details>
<summary>You need to store 100 GB that survives reboot. Which storage?</summary>

**EBS gp3** (modern default):
- ~$0.08/GB-month (~$8/month for 100 GB).
- 3000 IOPS and 125 MB/s baseline (can be scaled independently of GB).
- Persistent, snapshottable, cross-region snapshottable.

NO instance store (destroyed on stop). NO EFS for single-instance (NFS overhead).
</details>

> **Summary**: EC2 = virtual VM; pick AMI + type (family/gen/size) + subnet + SG + storage; user-data for bootstrap; lifecycle: pending → running → stopped/terminated; default storage EBS gp3 (persistent); access via SSM (no SSH); Graviton (ARM) = ~20% discount on many families.
