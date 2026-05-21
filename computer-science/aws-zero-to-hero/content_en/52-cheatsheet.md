---
title: "Cheat sheet: services, limits, instance families"
area: "Reference"
summary: "Compact reference card: tables of services, hard limits, instance types, storage classes, CLI commands, routing policies and acronyms."
order: 52
level: "intermediate"
prereq:
  - "all previous sections"
tools:
  - "AWS CLI"
---

# Cheat sheet — services, limits, instance families

Reference card for exam and operations. All tables are designed for quick lookup, they don't explain *why*: for the "why" go to the topic section.

## 1. Service quick reference

### Compute

| Service | Purpose | Pricing | When to use |
|---|---|---|---|
| EC2 | On-demand VM | per hour/second + EBS | OS control, long-running |
| Lambda | Event-driven functions | per invocation + GB·s | event-driven < 15 min |
| Fargate | Serverless containers | per vCPU·s + GB·s | containers without managing EC2 |
| ECS | AWS container orchestrator | free (pay EC2/Fargate) | standard AWS containers |
| EKS | Managed Kubernetes | $0.10/h cluster + nodes | portable k8s multi-cloud |
| App Runner | HTTP PaaS | per vCPU·s + GB·s + requests | simple web apps |
| Batch | Batch jobs | free (pay compute) | HPC/ML batch jobs |
| Lightsail | Simple VPS | flat rate $3-160/mo | dev/POC without complexity |

### Storage

| Service | Type | Pricing | When to use |
|---|---|---|---|
| S3 | Object | $0.023/GB·mo + requests | files, backup, data lake |
| EBS | Block | $0.08-0.125/GB·mo + IOPS | EC2 disk |
| EFS | NFS | $0.30/GB·mo (standard) | shared Linux file system |
| FSx Windows | SMB | from $0.13/GB·mo | Windows file share |
| FSx Lustre | Parallel FS | from $0.14/GB·mo | HPC, ML training |
| S3 Glacier | Archive | from $0.004/GB·mo | cold archives |
| Storage Gateway | Hybrid | $0.023/GB cache + S3 | on-prem ↔ AWS |

### Database

| Service | Type | Pricing | When to use |
|---|---|---|---|
| RDS | Managed SQL | per instance·h + storage | standard relational DB |
| Aurora | Distributed SQL | per ACU/instance·h + storage | high-perf MySQL/Postgres |
| Aurora Serverless v2 | Auto-scale | per ACU·s | variable workload |
| DynamoDB | NoSQL KV | per WCU/RCU or on-demand | serverless NoSQL |
| ElastiCache | Cache (Redis/Memcached) | per node·h | in-memory cache |
| MemoryDB | Persistent Redis | per node·h | Redis as primary DB |
| Neptune | Graph | per instance·h | social graphs, fraud |
| Timestream | Time-series | per ingest + storage | IoT, metrics |
| Keyspaces | Cassandra | per WCU/RCU | managed Cassandra |
| Redshift | Columnar DWH | per node·h or RPU | PB analytics |

### Networking

| Service | Purpose | Pricing |
|---|---|---|
| VPC | Private network | free (pay NAT/endpoints) |
| Route 53 | DNS | $0.50/hosted zone + queries |
| CloudFront | CDN | per GB transferred + requests |
| ALB | L7 HTTP LB | $0.0225/h + LCU |
| NLB | L4 TCP/UDP LB | $0.0225/h + LCU |
| API Gateway REST | REST API | $3.50/M req + transfer |
| API Gateway HTTP | Cheap HTTP API | $1.00/M req |
| Direct Connect | Dedicated link | per port + per GB out |
| VPN | IPSec | $0.05/h + per GB out |
| Transit Gateway | VPC hub | $0.05/h attachment + per GB |

### Integration / messaging

| Service | Purpose | Pricing |
|---|---|---|
| SQS | Queue | $0.40/M req |
| SNS | Pub/sub | $0.50/M publish |
| EventBridge | Event bus | $1.00/M custom event |
| Step Functions Standard | Workflow | $0.025/M state transition |
| Step Functions Express | High-volume workflow | $1.00/M execution + duration |
| MQ | Traditional broker (Active/Rabbit) | per broker·h |
| AppFlow | SaaS connector | per run + per record |

### Analytics

| Service | Purpose | Pricing |
|---|---|---|
| Athena | SQL on S3 | $5/TB scanned |
| Glue | Serverless ETL | $0.44/DPU·h |
| EMR | Hadoop/Spark | per EC2·h + EMR fee |
| Kinesis Data Streams | Streaming | per shard·h + PUT |
| Kinesis Firehose | Streaming to storage | per GB ingest |
| MSK | Managed Kafka | per broker·h + storage |
| OpenSearch | Search/analytics | per instance·h + storage |
| QuickSight | BI | $9-18/user/mo |

### Security / governance

| Service | Purpose | Pricing |
|---|---|---|
| IAM | Identity & access | free |
| KMS | Crypto keys | $1/key/mo + requests |
| Secrets Manager | Rotating secrets | $0.40/secret/mo |
| CloudTrail | API audit | management free, data $2/M event |
| Config | Compliance | $0.003/config item |
| GuardDuty | Threat detection | per GB analyzed |
| Macie | PII discovery | per GB scanned |
| Inspector | CVE scan | per instance·h |
| Security Hub | Aggregator | $0.001/finding |
| WAF | L7 firewall | $5/ACL/mo + requests |
| Shield Standard | Basic DDoS | free |
| Shield Advanced | Premium DDoS | $3000/mo |

## 2. EC2 instance families

Naming: `<family><gen><suffix>.<size>`. Suffixes: `g`=Graviton (ARM), `a`=AMD, `i`=Intel, `n`=network-optimized, `d`=NVMe local, `z`=high-frequency, `e`=extended memory.

| Family | vCPU:RAM | Use case | 2026 examples |
|---|---|---|---|
| **T** burstable | 1:2 to 1:4 | dev, low/mid web | t3, t4g |
| **M** general | 1:4 | web, app server, microservices | m6i, m7g, m7i, m7a |
| **C** compute | 1:2 | HPC, gaming, encoding, batch | c7i, c7g, c7gn |
| **R** memory | 1:8 | DB, cache, in-memory analytics | r7i, r7g, r7iz |
| **X** high memory | 1:16+ | SAP HANA, in-memory DB | x2idn, x2iedn |
| **u-** ultra memory | up to 24 TB | enterprise SAP HANA | u-12tb1 |
| **I** NVMe storage | 1:8 with local NVMe | NoSQL, search, big data | i4i, i4g |
| **D** HDD storage | 1:8 with local HDD | data lake, Hadoop | d3, d3en |
| **H** high-throughput HDD | 1:8 | MapReduce | h1 |
| **G** inference/graphics GPU | varies | ML inference, gaming streaming | g5, g6 |
| **P** training GPU | varies | ML training, HPC | p4d, p5 (H100) |
| **Trn** trainium | varies | low-cost ML training | trn1, trn2 |
| **Inf** inferentia | varies | low-cost ML inference | inf2 |
| **F** FPGA | varies | custom hardware accel | f2 |

### Size scale

`nano` → `micro` → `small` → `medium` → `large` → `xlarge` → `2xlarge` → `4xlarge` → `8xlarge` → `12xlarge` → `16xlarge` → `24xlarge` → `metal`.

Each step ~doubles vCPU and RAM. `metal` = bare-metal (no hypervisor).

## 3. EBS volume types

| Type | Max IOPS | Max throughput | $/GB·mo | Use case |
|---|---|---|---|---|
| **gp3** (default) | 16k (config) | 1000 MB/s | $0.08 | everything, baseline 3k IOPS free |
| **gp2** (legacy) | 16k (tied to GB) | 250 MB/s | $0.10 | use gp3 instead |
| **io2 Block Express** | 256k | 4000 MB/s | $0.125 + IOPS | mission-critical enterprise DB |
| **io2** | 64k | 1000 MB/s | $0.125 + IOPS | high-performance DB |
| **st1** | 500 | 500 MB/s | $0.045 | big data, sequential log streaming |
| **sc1** | 250 | 250 MB/s | $0.015 | cold archive, rare access |

Durability: all **99.8-99.9%** AZ-local (cross-AZ → snapshots to S3 or replicate).

## 4. S3 storage classes

| Class | Durability | Availability | Retrieval | $/GB·mo | Min duration | First-byte |
|---|---|---|---|---|---|---|
| Standard | 11×9 | 99.99% | immediate | $0.023 | none | ms |
| Intelligent-Tiering | 11×9 | 99.9% | auto | $0.023 + monitoring | none | ms |
| Standard-IA | 11×9 | 99.9% | immediate | $0.0125 | 30 days | ms |
| One Zone-IA | 11×9 1 AZ | 99.5% | immediate | $0.01 | 30 days | ms |
| Glacier Instant | 11×9 | 99.9% | immediate | $0.004 | 90 days | ms |
| Glacier Flexible | 11×9 | 99.99% post-restore | min-hours | $0.0036 | 90 days | 1-12h |
| Glacier Deep Archive | 11×9 | 99.99% post-restore | hours | $0.00099 | 180 days | 12-48h |

11×9 = 99.999999999% (estimated loss 1 object per 10 billion/year).

## 5. Lambda limits

| Resource | Limit |
|---|---|
| Max timeout | 15 min (900s) |
| Memory | 128 MB → 10,240 MB (1 MB increments) |
| vCPU | proportional to memory (1769 MB = 1 full vCPU) |
| Zip package | 50 MB compressed, 250 MB unzipped |
| Container image | 10 GB |
| Layer count | 5 per function |
| Ephemeral `/tmp` | 512 MB → 10,240 MB |
| Concurrency (soft) | 1000 per region (request increase) |
| Reserved concurrency | per function |
| Provisioned concurrency | per function, pay hourly |
| Sync payload | 6 MB (request+response) |
| Async payload | 256 KB |
| ENI per VPC | ~auto-scaled (previously fixed) |
| Env variables | 4 KB total |

## 6. VPC limits (per region, soft except where noted)

| Resource | Default limit | Notes |
|---|---|---|
| VPC per region | 5 | request increase |
| Subnet per VPC | 200 | hard |
| Route table per VPC | 200 | |
| Routes per route table | 50 (static) / 1000 (BGP propagated) | |
| Security group per VPC | 2500 | |
| Rule per SG | 60 inbound + 60 outbound (extendable to 1000) | |
| SG per ENI | 5 (extendable to 16) | |
| NACL per VPC | 200 | |
| Rule per NACL | 20 inbound + 20 outbound (extendable to 40) | |
| Elastic IP | 5 (request) | |
| Internet Gateway | 1 per VPC | |
| NAT Gateway | 5 per AZ | |
| VPC Peering | 50 per VPC (request to 125) | |
| Endpoint per VPC | 50 | |
| TGW attachment | 5000 | |
| VPC CIDR block | 5 (extendable to 50, max /16) | |

## 7. IAM limits

| Resource | Limit |
|---|---|
| User per account | 5000 |
| Group per account | 300 |
| Role per account | 5000 (extendable) |
| Customer managed policy | 1500 (extendable to 5000) |
| AWS managed policy | unlimited |
| Policy attached per role | 10 managed + 1 inline (10k char) |
| Policy attached per user | 10 managed + inline |
| Policy size | managed 6144 char, inline 2048 char |
| Trust policy size | 2048 char |
| MFA device per user | 8 (multi-MFA since 2023) |
| Access key per user | 2 |
| Principal in trust policy | combinable in string, subject to size |
| Role session duration | 1h default, up to 12h (configurable) |

## 8. DynamoDB limits

| Resource | Limit |
|---|---|
| Max item size | 400 KB (including attribute name) |
| Partition key | max 2048 byte |
| Sort key | max 1024 byte |
| Number of GSI | 20 per table |
| Number of LSI | 5 per table |
| BatchGetItem | 100 items or 16 MB |
| BatchWriteItem | 25 PutItem/DeleteItem or 16 MB |
| TransactWriteItems | 100 actions, 4 MB total |
| TransactGetItems | 100 actions, 4 MB total |
| Query/Scan result | 1 MB per page |
| Partition throughput | 3000 RCU + 1000 WCU |
| Provisioned throughput | up to 40k RCU + 40k WCU per table (soft) |
| On-demand | 40k RCU + 40k WCU automatic |

## 9. RDS sizing rules of thumb

| Engine | Max storage | Max read replica |
|---|---|---|
| MySQL | 64 TB | 5 |
| MariaDB | 64 TB | 5 |
| PostgreSQL | 64 TB | 5 |
| SQL Server | 16 TB | 15 (Multi-AZ) |
| Oracle | 64 TB | 5 |
| Aurora MySQL/Postgres | 128 TB (auto) | 15 |

Main instance classes: `db.t3/t4g` (burstable), `db.m6i/m7g` (general), `db.r6i/r7g` (memory), `db.x2g` (xlarge memory). Multi-AZ: standby in sync, failover ~60-120s.

## 10. AWS CLI — most used commands

```bash
# Identity
aws sts get-caller-identity
aws configure
aws configure list-profiles

# S3
aws s3 ls
aws s3 ls s3://bucket
aws s3 cp file.txt s3://bucket/
aws s3 sync ./dir s3://bucket/dir
aws s3 rm s3://bucket/key
aws s3api put-bucket-policy --bucket b --policy file://p.json

# EC2
aws ec2 describe-instances --filters "Name=tag:Env,Values=prod"
aws ec2 start-instances --instance-ids i-xxx
aws ec2 stop-instances --instance-ids i-xxx
aws ec2 terminate-instances --instance-ids i-xxx
aws ec2 describe-security-groups
aws ec2 run-instances --image-id ami-xxx --instance-type t3.micro

# IAM
aws iam list-users
aws iam get-user --user-name alice
aws iam list-attached-user-policies --user-name alice
aws iam simulate-principal-policy --policy-source-arn ... --action-names s3:GetObject

# Lambda
aws lambda list-functions
aws lambda invoke --function-name fn --payload '{"k":"v"}' out.json
aws lambda update-function-code --function-name fn --zip-file fileb://fn.zip

# CloudFormation
aws cloudformation deploy --template-file t.yaml --stack-name s
aws cloudformation describe-stacks --stack-name s
aws cloudformation list-stack-resources --stack-name s
aws cloudformation delete-stack --stack-name s

# Logs
aws logs tail /aws/lambda/fn --follow
aws logs filter-log-events --log-group-name X --filter-pattern "ERROR"

# DynamoDB
aws dynamodb scan --table-name T --limit 10
aws dynamodb query --table-name T --key-condition-expression "PK = :v" \
  --expression-attribute-values '{":v":{"S":"abc"}}'
aws dynamodb put-item --table-name T --item file://item.json

# SSM
aws ssm start-session --target i-xxx
aws ssm send-command --instance-ids i-xxx --document-name AWS-RunShellScript \
  --parameters 'commands=["uptime"]'
aws ssm get-parameter --name /app/dbpass --with-decryption

# CloudWatch
aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization \
  --dimensions Name=InstanceId,Value=i-xxx --start-time ... --end-time ... --period 60 --statistics Average

# Cost
aws ce get-cost-and-usage --time-period Start=2026-05-01,End=2026-05-21 \
  --granularity DAILY --metrics UnblendedCost
```

## 11. Route 53 routing policies

| Policy | Use case |
|---|---|
| **Simple** | 1 static record, no failover |
| **Weighted** | A/B test, gradual rollout (e.g. 90/10) |
| **Latency-based** | route to lowest-latency region from client |
| **Failover** | primary + secondary with health check |
| **Geolocation** | route by country/continent (regulatory) |
| **Geoproximity** | route to region with geographic bias (Traffic Flow) |
| **Multivalue answer** | client-side LB with health check (up to 8 records) |
| **IP-based** | route by client CIDR (advertising, CDN) |

## 12. Pricing model summary

| Model | Examples |
|---|---|
| Per hour/second | EC2, RDS, ALB, NAT GW, EKS control plane |
| Per request | Lambda, API Gateway, S3 GET/PUT, SQS, SNS, EventBridge |
| Per GB stored | S3, EBS, EFS, RDS storage |
| Per GB ingested | Kinesis Firehose, CloudWatch Logs ingestion |
| Per GB transferred out | Internet egress, CloudFront, cross-region |
| Per execution duration | Lambda GB·s, Step Functions Express, Fargate vCPU·s |
| Per provisioned capacity | DynamoDB provisioned, EC2 Reserved, EBS Provisioned IOPS |
| Per key/mo | KMS CMK, Secrets Manager |
| Per finding | Security Hub, Inspector |
| Flat fee | Shield Advanced ($3000/mo), Lightsail bundle, GuardDuty trial |

80/20 golden rule: the 5 most common cost drivers are **EC2 + EBS, RDS, NAT Gateway, S3 (storage + requests), Data Transfer Out**.

## 13. Acronyms

| Acronym | Expansion |
|---|---|
| ACL | Access Control List |
| ACM | AWS Certificate Manager |
| ALB | Application Load Balancer |
| AMI | Amazon Machine Image |
| ARN | Amazon Resource Name |
| ASG | Auto Scaling Group |
| AZ | Availability Zone |
| BYOIP | Bring Your Own IP |
| BYOK | Bring Your Own Key |
| CDK | Cloud Development Kit |
| CIDR | Classless Inter-Domain Routing |
| CMK | Customer Master Key (today: KMS key) |
| CRR | Cross-Region Replication |
| CW | CloudWatch |
| DLM | Data Lifecycle Manager |
| DLQ | Dead Letter Queue |
| DMS | Database Migration Service |
| DR | Disaster Recovery |
| DX | Direct Connect |
| EBS | Elastic Block Store |
| EC2 | Elastic Compute Cloud |
| ECR | Elastic Container Registry |
| ECS | Elastic Container Service |
| EFS | Elastic File System |
| EIP | Elastic IP |
| EKS | Elastic Kubernetes Service |
| ENI | Elastic Network Interface |
| FSx | File System x |
| GA | Global Accelerator / General Availability |
| GWLB | Gateway Load Balancer |
| HSM | Hardware Security Module |
| IaC | Infrastructure as Code |
| IAM | Identity and Access Management |
| IGW | Internet Gateway |
| KMS | Key Management Service |
| LB | Load Balancer |
| MFA | Multi-Factor Authentication |
| MSK | Managed Streaming for Kafka |
| NACL | Network Access Control List |
| NAT | Network Address Translation |
| NLB | Network Load Balancer |
| OAC | Origin Access Control |
| OAI | Origin Access Identity (legacy) |
| RDS | Relational Database Service |
| RI | Reserved Instance |
| RPO | Recovery Point Objective |
| RTO | Recovery Time Objective |
| SCP | Service Control Policy |
| SG | Security Group |
| SNS | Simple Notification Service |
| SQS | Simple Queue Service |
| SRR | Same-Region Replication |
| SSE | Server-Side Encryption |
| SSM | Systems Manager |
| SSO | Single Sign-On (today: IAM Identity Center) |
| STS | Security Token Service |
| TGW | Transit Gateway |
| TTL | Time To Live |
| VPC | Virtual Private Cloud |
| VPN | Virtual Private Network |
| WAF | Web Application Firewall |
| WAFv2 | WAF version 2 |
| XR | X-Ray |

> **Summary**: this is AWS's *limits card* — compact tables for EC2 families, storage classes, hard limits of IAM/VPC/Lambda/DynamoDB, essential CLI commands, Route 53 routing policies, pricing models and ~60 acronyms. Keep it open while you work or prep for exams.
