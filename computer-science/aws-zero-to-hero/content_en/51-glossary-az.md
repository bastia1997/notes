---
title: "Glossary A-Z"
area: "Reference"
summary: "Alphabetical dictionary of the most used AWS terms: ~110 entries with short definition and reference to the canonical service or section."
order: 51
level: "beginner"
prereq:
  - "none"
tools: []
---

# Glossary A-Z

Quick-lookup dictionary. Each entry has a 1-3 line definition and, when useful, a pointer to the course section or canonical AWS service.

## A

**ACL (Access Control List)**: list of access rules. In S3 buckets (legacy, prefer bucket policy) and at subnet level as *Network ACL* (stateless, see NACL).

**Amazon Linux 2023 (AL2023)**: official AWS Linux distro, optimized for EC2, Fedora-based. Successor of Amazon Linux 2.

**AMI (Amazon Machine Image)**: disk template for an EC2 (OS + software). Section 13.

**API Gateway**: managed service to publish REST/HTTP/WebSocket APIs in front of Lambda, ECS or HTTP backends. Section 16.

**App Mesh**: Envoy-based service mesh (being deprecated, see VPC Lattice as successor).

**App Runner**: PaaS for HTTP containers, zero-config, auto-scaling. Minimal alternative to ECS.

**ARN (Amazon Resource Name)**: unique identifier of an AWS resource, format `arn:aws:<service>:<region>:<account>:<resource>`. Section 4.

**Athena**: SQL queries over S3 with Trino/Presto engine, pay-per-query. Section 29.

**Aurora**: AWS-managed relational DB compatible with MySQL/PostgreSQL, 6-way distributed storage. Section 23.

**Auto Scaling Group (ASG)**: group of EC2 (or instances) that auto-scales based on metrics or schedule. Section 15.

**AZ (Availability Zone)**: physically isolated data center inside a Region. ~3 per Region. Section 2.

## B

**Backup (AWS Backup)**: centralized cross-service backup policy service (EBS, RDS, EFS, DynamoDB, etc.).

**Batch (AWS Batch)**: job scheduler for batch workloads on ECS/EC2/Fargate.

**Bedrock**: managed platform for foundation models (Claude, Llama, Titan, Mistral), API access.

**BGP (Border Gateway Protocol)**: routing protocol used in Direct Connect and Site-to-Site VPN to exchange prefixes between on-prem and AWS.

**Burstable instance (T family)**: EC2 with baseline CPU + credits for peaks (T3, T4g).

## C

**CDK (Cloud Development Kit)**: IaC framework that generates CloudFormation from TypeScript/Python/Java/Go code. Section 34.

**CDN (Content Delivery Network)**: on AWS = CloudFront.

**CIDR (Classless Inter-Domain Routing)**: IP block notation, e.g. `10.0.0.0/16` = 65,536 IPs. Section 9.

**CloudFormation**: native AWS IaC service, declarative YAML/JSON templates. Section 34.

**CloudFront**: global AWS CDN, ~600 edge locations. Section 11.

**CloudHSM**: dedicated single-tenant HSM for cryptographic keys.

**CloudShell**: pre-authenticated browser shell with CLI, 1 GB free storage per Region.

**CloudTrail**: log of all API calls in the account. Section 32.

**CloudWatch**: metrics, logs, alarms, dashboards. Section 32.

**CodeBuild / CodeDeploy / CodePipeline / CodeCommit**: native AWS CI/CD suite (CodeCommit being deprecated).

**Cognito**: identity provider for apps: user pool (signup/login) + identity pool (IAM federation). Section 33.

**Config (AWS Config)**: resource configuration tracking + compliance rules (e.g. "are all buckets private?").

**Container Insights**: CloudWatch monitoring for ECS/EKS.

**Control Tower**: managed multi-account landing zone with guardrails. Section 8.

**Cost Explorer**: AWS cost analysis dashboard, up to 12 months back. Section 7.

## D

**DDoS**: distributed denial-of-service attack. AWS Shield Standard is free on all edge services.

**Direct Connect (DX)**: dedicated physical link on-prem ↔ AWS (1/10/100 Gbps). Section 12.

**DLM (Data Lifecycle Manager)**: scheduler for automatic EBS snapshots.

**DLQ (Dead Letter Queue)**: SQS/SNS queue where messages land after failing N retries.

**DMS (Database Migration Service)**: on-prem → AWS DB migration with optional continuous replication.

**DR (Disaster Recovery)**: backup-and-restore, pilot light, warm standby, multi-site active-active plans. Section 41.

**DynamoDB**: managed NoSQL key-value/document, single-digit ms latency, serverless. Section 24.

**DynamoDB Streams**: change data capture on a DynamoDB table.

## E

**EBS (Elastic Block Store)**: persistent network block storage volume for EC2. Section 19.

**EC2 (Elastic Compute Cloud)**: on-demand VM. Section 13.

**ECR (Elastic Container Registry)**: managed AWS Docker registry. Section 17.

**ECS (Elastic Container Service)**: proprietary AWS container orchestrator. Section 17.

**EFS (Elastic File System)**: managed shared NFS, multi-AZ. Section 19.

**EKS (Elastic Kubernetes Service)**: managed Kubernetes (control plane operated by AWS). Section 17.

**Elastic IP (EIP)**: reassignable static public IP. Costs only when NOT attached to a running instance.

**ElastiCache**: managed Redis/Memcached. Section 25.

**ENI (Elastic Network Interface)**: virtual network card in a subnet. An EC2 has 1+.

**EventBridge**: serverless event bus, event routing with rules. Section 27.

**Exec (ECS Exec / SSM Exec)**: open interactive shell in container/EC2 without SSH.

## F

**Fargate**: serverless engine for ECS/EKS containers (pay vCPU+RAM, no EC2 to manage). Section 17.

**Federation**: login with external identity provider (SAML, OIDC, AD) → temporary IAM role.

**FIFO Queue**: SQS with guaranteed ordering and exactly-once (suffix `.fifo`).

**Firewall (Network Firewall)**: managed L3-L7 firewall in VPC, Suricata rules. Vs SG/NACL: L7 and advanced stateful.

**FSx**: managed filesystem (Windows, Lustre, NetApp ONTAP, OpenZFS). Section 19.

## G

**GameLift**: managed hosting for game servers.

**Glacier (S3 Glacier Flexible / Deep Archive / Instant)**: cold S3 storage classes. Section 21.

**Global Accelerator**: static global anycast IPs with routing to best AWS endpoint.

**Glue**: serverless ETL based on Spark + Data Catalog. Section 29.

**Graviton**: AWS proprietary ARM processors (g, c7g, m7g, etc.), ~20% cheaper vs Intel/AMD equivalents.

**GuardDuty**: ML threat detection on VPC Flow Logs, DNS, CloudTrail, EKS audit. Section 33.

## H

**Hibernate**: EC2 shutdown that saves RAM to EBS, restart preserves state.

**HSM (Hardware Security Module)**: see CloudHSM.

**Hyperplane**: AWS internal backbone for cross-VPC services like NAT Gateway, NLB, EFS.

## I

**IaC (Infrastructure as Code)**: CloudFormation, CDK, Terraform, Pulumi. Section 34.

**IAM (Identity and Access Management)**: users, groups, roles, policies. Section 4-5.

**IAM Identity Center (formerly AWS SSO)**: centralized SSO for Organizations + external IdP integration. Section 5.

**IGW (Internet Gateway)**: VPC object that enables Internet egress/ingress. Section 9.

**Instance Store**: SSD/NVMe local to the physical host, destroyed on stop. Only certain EC2 families.

**Instance Type**: family + size combination, e.g. `m7i.xlarge`. Section 13.

## J

**JIT (Just-In-Time access)**: temporary elevated access pattern (e.g. Identity Center permission set expiring in 1h).

**JMESPath**: query language used by AWS CLI `--query`.

## K

**Kinesis**: streaming (Data Streams, Firehose, Data Analytics, Video Streams). Section 30.

**KMS (Key Management Service)**: managed symmetric/asymmetric keys for at-rest encryption. Section 31.

## L

**Lambda**: event-driven serverless functions, max 15 min, up to 10 GB RAM. Section 16.

**Lambda Layer**: shared dependencies package mountable in multiple functions.

**LB (Load Balancer)**: ALB (L7 HTTP), NLB (L4 TCP/UDP), GWLB (L3 for appliances), CLB (legacy). Section 15.

**Lex**: conversational bots (Alexa engine).

**Lifecycle policy**: automatic rules on S3 (class transition) or EBS (DLM snapshots).

**Lightsail**: simplified flat-price VPS, "no-AWS-complexity" alternative.

## M

**Macie**: ML that searches sensitive data (PII, credentials) in S3 buckets.

**MFA (Multi-Factor Authentication)**: second factor (TOTP, hardware key, FIDO2) for login.

**MSK (Managed Streaming for Kafka)**: managed Kafka. Section 30.

**Multi-AZ**: redundant deployment across 2+ AZs (e.g. RDS Multi-AZ).

## N

**NACL (Network ACL)**: *stateless* firewall at subnet level. Section 10.

**NAT Gateway**: outbound-only Internet access for private subnets. ~$0.045/h + traffic. Section 9.

**Neptune**: managed graph DB (Gremlin, SPARQL, openCypher).

**Nitro**: lightweight AWS hypervisor replacing Xen on all modern instances. Section 14.

## O

**OAC (Origin Access Control)**: successor of OAI to restrict S3 access only from CloudFront.

**OpenSearch (formerly Elasticsearch Service)**: open-source search & analytics fork.

**Organizations**: multi-account hierarchy with SCP. Section 8.

**Outposts**: physical AWS rack installed on-prem, operated by AWS.

## P

**Parameter Store (SSM)**: hierarchical parameter storage (encrypted too). Free for standard.

**PCI-DSS / HIPAA / SOC2**: compliance frameworks, AWS is certified and provides evidence via Artifact.

**Placement Group**: EC2 cluster with strategy (cluster=low latency, spread=high availability, partition=Hadoop).

**Polly**: text-to-speech.

**PrivateLink**: exposes a service in one VPC to other VPCs via private ENI, no IGW/peering. Section 10.

**Pricing model**: on-demand, reserved (RI), savings plan, spot.

## Q

**QuickSight**: BI dashboard SaaS.

**Quota (Service Quotas)**: per-service per-account/region limits, some soft (request increase), others hard.

## R

**RAM (Resource Access Manager)**: shares resources (TGW, subnets, license) across Organization accounts.

**RDS (Relational Database Service)**: managed relational DB (MySQL, Postgres, MariaDB, SQL Server, Oracle, Aurora). Section 22.

**Redshift**: massive columnar data warehouse, scales to PB. Section 30.

**Region**: geographic group of AZs (e.g. `eu-west-1` Ireland). Section 2.

**Reserved Instance (RI)**: 1 or 3 year prepayment for EC2/RDS, up to 72% discount.

**REST API**: API Gateway REST (legacy but feature-rich). Vs HTTP API (newer, cheap, reduced).

**Route 53**: managed DNS + health check + routing policy. Section 11.

**Route Table**: IP routing table in a VPC, attached to subnets.

## S

**S3 (Simple Storage Service)**: massive object storage. Section 20.

**SageMaker**: end-to-end ML platform (notebooks, training, hosting, pipelines). Section 39.

**SCP (Service Control Policy)**: IAM-like policy applied to OU/account in Organizations. Section 8.

**Secrets Manager**: secret storage with automatic rotation. Section 31.

**Security Group (SG)**: *stateful* firewall at ENI level. Section 10.

**SES (Simple Email Service)**: send/receive email (transactional, marketing).

**Shield**: DDoS protection (Standard free, Advanced $3000/mo).

**Snowball / Snowmobile**: offline TB-PB data transfer via physical device. Section 21.

**SNS (Simple Notification Service)**: pub/sub with fan-out. Section 27.

**SQS (Simple Queue Service)**: message queues (Standard at-least-once, FIFO exactly-once). Section 27.

**SSE (Server-Side Encryption)**: at-rest encryption in S3, variants SSE-S3, SSE-KMS, SSE-C, DSSE-KMS.

**SSM (Systems Manager)**: EC2 fleet management suite (Session Manager, Patch Manager, Parameter Store, etc.). Section 32.

**SSO**: see IAM Identity Center.

**Step Functions**: state-machine workflow orchestrator. Section 28.

**Storage Gateway**: hybrid on-prem appliance that exposes S3/EBS as iSCSI/NFS/SMB. Section 21.

**STS (Security Token Service)**: issues temporary credentials (AssumeRole). Section 4.

**Subnet**: CIDR range inside a VPC, associated with an AZ. Section 9.

## T

**TCO (Total Cost of Ownership)**: AWS calculator for on-prem vs cloud comparison.

**Textract**: managed OCR.

**TGW (Transit Gateway)**: VPC/VPN/DX interconnection hub. Section 12.

**Trusted Advisor**: best-practice checks (cost, security, fault tolerance, service limit).

## U

**UDP / TCP**: protocols, handled respectively by NLB (TCP/UDP) and ALB (HTTP only).

**Unauthenticated Cognito Identity**: identity pool with guest access (issues IAM credentials without login).

## V

**VPC (Virtual Private Cloud)**: isolated private network in a Region. Section 9.

**VPC Endpoint**: private access to AWS service without Internet (Gateway endpoint for S3/DynamoDB, Interface endpoint for the rest).

**VPC Flow Logs**: VPC IP traffic log, to S3/CloudWatch.

**VPC Lattice**: managed cross-account/cross-VPC service mesh (App Mesh successor).

**VPC Peering**: 1:1 connection between 2 VPCs, non-transitive.

**VPN (Site-to-Site VPN)**: IPSec tunnel on-prem ↔ AWS. Section 12.

## W

**WAF (Web Application Firewall)**: L7 firewall with managed and rate-based rules, in front of CloudFront/ALB/API Gateway. Section 33.

**Well-Architected Framework**: AWS 6 pillars of best practices (Operational Excellence, Security, Reliability, Performance, Cost, Sustainability). Section 40.

## X

**X-Ray**: distributed tracing, sees requests end-to-end across Lambda/ECS/ALB. Section 32.

## Y

**YAML**: preferred format for CloudFormation templates (more readable than JSON, supports comments).

## Z

**Zone Apex**: the DNS root (e.g. `example.com`), manageable in Route 53 with alias records (regular CNAME not allowed at root).

**Zonal Reserved Instance**: RI specific to an AZ, guarantees capacity.

> **Summary**: this glossary collects 100+ AWS terms in alphabetical order; use it as a reference dictionary while reading the course or working on a project.
