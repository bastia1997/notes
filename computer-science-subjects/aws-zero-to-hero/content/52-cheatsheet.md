---
title: "Cheat sheet: servizi, limiti, instance families"
area: "Reference"
summary: "Reference card compatta: tabelle di servizi, limiti hard, instance type, storage class, comandi CLI, routing policy e acronimi."
order: 52
level: "intermedio"
prereq:
  - "tutte le sezioni precedenti"
tools:
  - "AWS CLI"
---

# Cheat sheet — servizi, limiti, instance families

Reference card per esame e operatività. Tutte le tabelle sono pensate per consultazione rapida, non spiegano *perché*: per il "perché" vai alla sezione tematica.

## 1. Service quick reference

### Compute

| Servizio | Scopo | Pricing | Quando usarlo |
|---|---|---|---|
| EC2 | VM on-demand | per ora/secondo + EBS | controllo OS, long-running |
| Lambda | Funzioni event-driven | per invocazione + GB·s | event-driven < 15 min |
| Fargate | Container serverless | per vCPU·s + GB·s | container senza gestire EC2 |
| ECS | Container orchestrator AWS | gratis (paghi EC2/Fargate) | container standard AWS |
| EKS | Kubernetes managed | $0.10/h cluster + nodi | k8s portabile multi-cloud |
| App Runner | PaaS HTTP | per vCPU·s + GB·s + request | web app semplici |
| Batch | Batch jobs | gratis (paghi compute) | job batch HPC/ML |
| Lightsail | VPS semplice | flat rate $3-160/mese | dev/POC senza complessità |

### Storage

| Servizio | Tipo | Pricing | Quando usarlo |
|---|---|---|---|
| S3 | Object | $0.023/GB·mese + request | file, backup, data lake |
| EBS | Block | $0.08-0.125/GB·mese + IOPS | disco EC2 |
| EFS | NFS | $0.30/GB·mese (standard) | file system condiviso Linux |
| FSx Windows | SMB | da $0.13/GB·mese | file share Windows |
| FSx Lustre | Parallel FS | da $0.14/GB·mese | HPC, ML training |
| S3 Glacier | Archive | da $0.004/GB·mese | archivi a freddo |
| Storage Gateway | Hybrid | $0.023/GB cache + S3 | on-prem ↔ AWS |

### Database

| Servizio | Tipo | Pricing | Quando usarlo |
|---|---|---|---|
| RDS | SQL managed | per ora istanza + storage | DB relazionale standard |
| Aurora | SQL distribuito | per ora ACU/istanza + storage | MySQL/Postgres ad alta perf |
| Aurora Serverless v2 | Auto-scale | per ACU·s | workload variabile |
| DynamoDB | NoSQL KV | per WCU/RCU o on-demand | NoSQL serverless |
| ElastiCache | Cache (Redis/Memcached) | per ora nodo | cache in-memory |
| MemoryDB | Redis persistente | per ora nodo | primary DB Redis |
| Neptune | Graph | per ora istanza | grafi sociali, frodi |
| Timestream | Time-series | per ingest + storage | IoT, metriche |
| Keyspaces | Cassandra | per WCU/RCU | Cassandra managed |
| Redshift | DWH columnar | per ora nodo o RPU | analytics PB |

### Networking

| Servizio | Scopo | Pricing |
|---|---|---|
| VPC | Rete privata | gratis (paghi NAT/endpoint) |
| Route 53 | DNS | $0.50/hosted zone + query |
| CloudFront | CDN | per GB transferito + request |
| ALB | L7 HTTP LB | $0.0225/h + LCU |
| NLB | L4 TCP/UDP LB | $0.0225/h + LCU |
| API Gateway REST | API REST | $3.50/M request + transfer |
| API Gateway HTTP | API HTTP cheap | $1.00/M request |
| Direct Connect | Link dedicato | per porta + per GB out |
| VPN | IPSec | $0.05/h + per GB out |
| Transit Gateway | Hub VPC | $0.05/h attachment + per GB |

### Integration / messaging

| Servizio | Scopo | Pricing |
|---|---|---|
| SQS | Queue | $0.40/M request |
| SNS | Pub/sub | $0.50/M publish |
| EventBridge | Event bus | $1.00/M event custom |
| Step Functions Standard | Workflow | $0.025/M state transition |
| Step Functions Express | Workflow ad alto volume | $1.00/M execution + durata |
| MQ | Broker tradizionale (Active/Rabbit) | per ora broker |
| AppFlow | SaaS connector | per run + per record |

### Analytics

| Servizio | Scopo | Pricing |
|---|---|---|
| Athena | SQL su S3 | $5/TB scansionato |
| Glue | ETL serverless | $0.44/DPU·h |
| EMR | Hadoop/Spark | per ora EC2 + EMR fee |
| Kinesis Data Streams | Streaming | per shard·h + PUT |
| Kinesis Firehose | Streaming verso storage | per GB ingest |
| MSK | Kafka managed | per broker·h + storage |
| OpenSearch | Search/analytics | per ora istanza + storage |
| QuickSight | BI | $9-18/utente/mese |

### Security / governance

| Servizio | Scopo | Pricing |
|---|---|---|
| IAM | Identity & access | gratis |
| KMS | Chiavi crypto | $1/chiave/mese + request |
| Secrets Manager | Segreti rotanti | $0.40/segreto/mese |
| CloudTrail | API audit | management gratis, data $2/M event |
| Config | Compliance | $0.003/config item |
| GuardDuty | Threat detection | per GB analyzed |
| Macie | PII discovery | per GB scanned |
| Inspector | CVE scan | per istanza/h |
| Security Hub | Aggregator | $0.001/finding |
| WAF | L7 firewall | $5/ACL/mese + request |
| Shield Standard | DDoS base | gratis |
| Shield Advanced | DDoS premium | $3000/mese |

## 2. EC2 instance families

Naming: `<famiglia><gen><suffisso>.<size>`. Suffissi: `g`=Graviton (ARM), `a`=AMD, `i`=Intel, `n`=network-optimized, `d`=NVMe local, `z`=high-frequency, `e`=extended memory.

| Famiglia | vCPU:RAM | Use case | Esempi 2026 |
|---|---|---|---|
| **T** burstable | 1:2 a 1:4 | dev, web a basso/medio carico | t3, t4g |
| **M** general | 1:4 | web, app server, microservizi | m6i, m7g, m7i, m7a |
| **C** compute | 1:2 | HPC, gaming, encoding, batch | c7i, c7g, c7gn |
| **R** memory | 1:8 | DB, cache, in-memory analytics | r7i, r7g, r7iz |
| **X** high memory | 1:16+ | SAP HANA, in-memory DB | x2idn, x2iedn |
| **u-** ultra memory | fino a 24 TB | SAP HANA enterprise | u-12tb1 |
| **I** storage NVMe | 1:8 con NVMe local | NoSQL, search, big data | i4i, i4g |
| **D** storage HDD | 1:8 con HDD locale | data lake, Hadoop | d3, d3en |
| **H** storage HDD high-throughput | 1:8 | MapReduce | h1 |
| **G** GPU inference/grafica | varia | ML inference, gaming streaming | g5, g6 |
| **P** GPU training | varia | ML training, HPC | p4d, p5 (H100) |
| **Trn** trainium | varia | ML training low-cost | trn1, trn2 |
| **Inf** inferentia | varia | ML inference low-cost | inf2 |
| **F** FPGA | varia | acc. custom hardware | f2 |

### Size scale

`nano` → `micro` → `small` → `medium` → `large` → `xlarge` → `2xlarge` → `4xlarge` → `8xlarge` → `12xlarge` → `16xlarge` → `24xlarge` → `metal`.

Ogni step ~raddoppia vCPU e RAM. `metal` = bare-metal (no hypervisor).

## 3. EBS volume types

| Tipo | IOPS max | Throughput max | $/GB·mese | Use case |
|---|---|---|---|---|
| **gp3** (default) | 16k (config) | 1000 MB/s | $0.08 | tutto, baseline 3k IOPS gratis |
| **gp2** (legacy) | 16k (legato a GB) | 250 MB/s | $0.10 | usa gp3 invece |
| **io2 Block Express** | 256k | 4000 MB/s | $0.125 + IOPS | DB enterprise mission-critical |
| **io2** | 64k | 1000 MB/s | $0.125 + IOPS | DB ad alte performance |
| **st1** | 500 | 500 MB/s | $0.045 | big data, log streaming sequenziale |
| **sc1** | 250 | 250 MB/s | $0.015 | cold archive, raro accesso |

Durabilità: tutti **99.8-99.9%** AZ-locale (per cross-AZ → snapshot a S3 o replica).

## 4. S3 storage classes

| Classe | Durability | Availability | Retrieval | $/GB·mese | Min duration | First-byte |
|---|---|---|---|---|---|---|
| Standard | 11×9 | 99.99% | immediato | $0.023 | nessuna | ms |
| Intelligent-Tiering | 11×9 | 99.9% | auto | $0.023 + monitoring | nessuna | ms |
| Standard-IA | 11×9 | 99.9% | immediato | $0.0125 | 30 giorni | ms |
| One Zone-IA | 11×9 1 AZ | 99.5% | immediato | $0.01 | 30 giorni | ms |
| Glacier Instant | 11×9 | 99.9% | immediato | $0.004 | 90 giorni | ms |
| Glacier Flexible | 11×9 | 99.99% post-restore | min-ore | $0.0036 | 90 giorni | 1-12h |
| Glacier Deep Archive | 11×9 | 99.99% post-restore | ore | $0.00099 | 180 giorni | 12-48h |

11×9 = 99.999999999% (perdita stimata 1 oggetto su 10 miliardi/anno).

## 5. Lambda limits

| Risorsa | Limite |
|---|---|
| Timeout max | 15 min (900s) |
| Memory | 128 MB → 10 240 MB (incrementi da 1 MB) |
| vCPU | proporzionali a memory (1769 MB = 1 vCPU completo) |
| Package zip | 50 MB compresso, 250 MB unzipped |
| Container image | 10 GB |
| Layer count | 5 per funzione |
| Ephemeral `/tmp` | 512 MB → 10 240 MB |
| Concurrency (soft) | 1000 per regione (request increase) |
| Reserved concurrency | per funzione |
| Provisioned concurrency | per funzione, paghi a costo orario |
| Payload sync | 6 MB (request+response) |
| Payload async | 256 KB |
| ENI per VPC | ~auto-scaled (in passato fixed) |
| Env variables | 4 KB totali |

## 6. VPC limits (per region, soft tranne dove indicato)

| Risorsa | Limite default | Note |
|---|---|---|
| VPC per region | 5 | request increase |
| Subnet per VPC | 200 | hard |
| Route table per VPC | 200 | |
| Route per route table | 50 (statiche) / 1000 (BGP propagated) | |
| Security group per VPC | 2500 | |
| Rule per SG | 60 inbound + 60 outbound (estendibile a 1000) | |
| SG per ENI | 5 (estendibile a 16) | |
| NACL per VPC | 200 | |
| Rule per NACL | 20 inbound + 20 outbound (estendibile a 40) | |
| Elastic IP | 5 (request) | |
| Internet Gateway | 1 per VPC | |
| NAT Gateway | 5 per AZ | |
| VPC Peering | 50 per VPC (request a 125) | |
| Endpoint per VPC | 50 | |
| TGW attachment | 5000 | |
| VPC CIDR block | 5 (estendibile a 50, max /16) | |

## 7. IAM limits

| Risorsa | Limite |
|---|---|
| User per account | 5000 |
| Group per account | 300 |
| Role per account | 5000 (estendibile) |
| Policy managed customer | 1500 (estendibile a 5000) |
| Policy managed AWS | illimitate |
| Policy attached per role | 10 managed + 1 inline (10k char) |
| Policy attached per user | 10 managed + inline |
| Policy size | managed 6144 char, inline 2048 char |
| Trust policy size | 2048 char |
| MFA device per user | 8 (multi-MFA dal 2023) |
| Access key per user | 2 |
| Principal in trust policy | combinabili in stringa, ma soggetti a size |
| Session duration role | 1h default, fino 12h (configurable) |

## 8. DynamoDB limits

| Risorsa | Limite |
|---|---|
| Item size max | 400 KB (compreso attribute name) |
| Partition key | max 2048 byte |
| Sort key | max 1024 byte |
| Number of GSI | 20 per tabella |
| Number of LSI | 5 per tabella |
| BatchGetItem | 100 item o 16 MB |
| BatchWriteItem | 25 PutItem/DeleteItem o 16 MB |
| TransactWriteItems | 100 azioni, 4 MB totali |
| TransactGetItems | 100 azioni, 4 MB totali |
| Query/Scan result | 1 MB per page |
| Partition throughput | 3000 RCU + 1000 WCU |
| Provisioned throughput | up to 40k RCU + 40k WCU per tabella (soft) |
| On-demand | 40k RCU + 40k WCU automatic |

## 9. RDS sizing rules of thumb

| Engine | Max storage | Max replica read |
|---|---|---|
| MySQL | 64 TB | 5 |
| MariaDB | 64 TB | 5 |
| PostgreSQL | 64 TB | 5 |
| SQL Server | 16 TB | 15 (Multi-AZ) |
| Oracle | 64 TB | 5 |
| Aurora MySQL/Postgres | 128 TB (auto) | 15 |

Instance class principali: `db.t3/t4g` (burstable), `db.m6i/m7g` (general), `db.r6i/r7g` (memory), `db.x2g` (xlarge memory). Multi-AZ: standby in sync, failover ~60-120s.

## 10. AWS CLI — comandi più usati

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

## 11. Route 53 routing policy

| Policy | Use case |
|---|---|
| **Simple** | 1 record statico, no failover |
| **Weighted** | A/B test, gradual rollout (es. 90/10) |
| **Latency-based** | route a region con latenza minore dal client |
| **Failover** | primary + secondary con health check |
| **Geolocation** | route per paese/continente (regulatory) |
| **Geoproximity** | route a region con bias geografico (Traffic Flow) |
| **Multivalue answer** | client-side LB con health check (fino a 8 record) |
| **IP-based** | route per CIDR client (advertising, CDN) |

## 12. Pricing model summary

| Model | Esempi |
|---|---|
| Per ora/secondo | EC2, RDS, ALB, NAT GW, EKS control plane |
| Per request | Lambda, API Gateway, S3 GET/PUT, SQS, SNS, EventBridge |
| Per GB stored | S3, EBS, EFS, RDS storage |
| Per GB ingested | Kinesis Firehose, CloudWatch Logs ingestion |
| Per GB transferred out | Internet egress, CloudFront, cross-region |
| Per execution duration | Lambda GB·s, Step Functions Express, Fargate vCPU·s |
| Per provisioned capacity | DynamoDB provisioned, EC2 Reserved, EBS Provisioned IOPS |
| Per chiave/mese | KMS CMK, Secrets Manager |
| Per finding | Security Hub, Inspector |
| Flat fee | Shield Advanced ($3000/mo), Lightsail bundle, GuardDuty trial |

Regola d'oro 80/20: i 5 driver di costo più comuni sono **EC2 + EBS, RDS, NAT Gateway, S3 (storage + request), Data Transfer Out**.

## 13. Acronimi

| Acronimo | Espansione |
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
| CMK | Customer Master Key (oggi: KMS key) |
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
| SSO | Single Sign-On (oggi: IAM Identity Center) |
| STS | Security Token Service |
| TGW | Transit Gateway |
| TTL | Time To Live |
| VPC | Virtual Private Cloud |
| VPN | Virtual Private Network |
| WAF | Web Application Firewall |
| WAFv2 | WAF version 2 |
| XR | X-Ray |

> **Riassunto**: questa è la *carta dei limiti* di AWS — tabelle compatte per famiglie EC2, storage class, limiti hard di IAM/VPC/Lambda/DynamoDB, comandi CLI essenziali, routing policy Route 53, modelli di pricing e ~60 acronimi. Tienila aperta mentre lavori o ti prepari all'esame.
