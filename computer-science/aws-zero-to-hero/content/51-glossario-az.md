---
title: "Glossario A-Z"
area: "Reference"
summary: "Dizionario alfabetico dei termini AWS più usati: ~110 voci con definizione breve e rimando al servizio o sezione."
order: 51
level: "principiante"
prereq:
  - "nessuno"
tools: []
---

# Glossario A-Z

Dizionario di consultazione veloce. Ogni voce ha una definizione di 1-3 righe e, se utile, un rimando alla sezione del corso o al servizio AWS canonico.

## A

**ACL (Access Control List)**: lista di regole di accesso. Nei bucket S3 (legacy, preferire bucket policy) e a livello subnet come *Network ACL* (stateless, vedi NACL).

**Amazon Linux 2023 (AL2023)**: distribuzione Linux ufficiale AWS, ottimizzata per EC2, basata su Fedora. Successore di Amazon Linux 2.

**AMI (Amazon Machine Image)**: template del disco di una EC2 (OS + software). Sezione 13.

**API Gateway**: managed service per pubblicare API REST/HTTP/WebSocket davanti a Lambda, ECS o backend HTTP. Sezione 16.

**App Mesh**: service mesh basato su Envoy (in deprecation, vedi VPC Lattice come successore).

**App Runner**: PaaS per container HTTP, zero-config, auto-scaling. Alternativa minimal a ECS.

**ARN (Amazon Resource Name)**: identificatore univoco di una risorsa AWS, formato `arn:aws:<service>:<region>:<account>:<resource>`. Sezione 4.

**Athena**: query SQL su S3 con engine Trino/Presto, pay-per-query. Sezione 29.

**Aurora**: database relazionale managed AWS compatibile MySQL/PostgreSQL, storage distribuito 6-way. Sezione 23.

**Auto Scaling Group (ASG)**: gruppo di EC2 (o instance) che si scala automaticamente in base a metriche o schedule. Sezione 15.

**AZ (Availability Zone)**: data center fisicamente isolato all'interno di una Region. ~3 per Region. Sezione 2.

## B

**Backup (AWS Backup)**: servizio centralizzato di policy di backup cross-service (EBS, RDS, EFS, DynamoDB, ecc.).

**Batch (AWS Batch)**: job scheduler per workload batch su ECS/EC2/Fargate.

**Bedrock**: piattaforma managed per modelli foundation (Claude, Llama, Titan, Mistral), accessibili via API.

**BGP (Border Gateway Protocol)**: protocollo di routing usato in Direct Connect e Site-to-Site VPN per scambiare prefissi tra on-prem e AWS.

**Burstable instance (T family)**: EC2 con CPU baseline + crediti per picchi (T3, T4g).

## C

**CDK (Cloud Development Kit)**: framework IaC che genera CloudFormation da codice TypeScript/Python/Java/Go. Sezione 34.

**CDN (Content Delivery Network)**: in AWS = CloudFront.

**CIDR (Classless Inter-Domain Routing)**: notazione di blocchi IP, es. `10.0.0.0/16` = 65 536 IP. Sezione 9.

**CloudFormation**: servizio nativo IaC AWS, template YAML/JSON dichiarativo. Sezione 34.

**CloudFront**: CDN globale di AWS, ~600 edge location. Sezione 11.

**CloudHSM**: HSM dedicato (single-tenant) per chiavi crittografiche.

**CloudShell**: shell browser preautenticata con CLI, 1 GB storage gratis per Region.

**CloudTrail**: log di tutte le API call sull'account. Sezione 32.

**CloudWatch**: metriche, log, alarm, dashboard. Sezione 32.

**CodeBuild / CodeDeploy / CodePipeline / CodeCommit**: suite CI/CD nativa AWS (CodeCommit in deprecation).

**Cognito**: identity provider per app: user pool (signup/login) + identity pool (federation IAM). Sezione 33.

**Config (AWS Config)**: tracciamento configurazione risorse + compliance rule (es. "tutti i bucket sono privati?").

**Container Insights**: monitoring CloudWatch per ECS/EKS.

**Control Tower**: landing zone managed multi-account con guardrail. Sezione 8.

**Cost Explorer**: dashboard analisi costi AWS, fino a 12 mesi back. Sezione 7.

## D

**DDoS**: attacco di negazione del servizio distribuito. AWS Shield Standard è incluso gratis su tutti i servizi edge.

**Direct Connect (DX)**: link fisico dedicato on-prem ↔ AWS (1/10/100 Gbps). Sezione 12.

**DLM (Data Lifecycle Manager)**: scheduler snapshot EBS automatici.

**DLQ (Dead Letter Queue)**: coda SQS/SNS dove finiscono i messaggi che falliscono N retry.

**DMS (Database Migration Service)**: migrazione DB on-prem → AWS con replica continua opzionale.

**DR (Disaster Recovery)**: piani backup-and-restore, pilot light, warm standby, multi-site active-active. Sezione 41.

**DynamoDB**: NoSQL key-value/document managed, single-digit ms latency, serverless. Sezione 24.

**DynamoDB Streams**: change data capture su tabella DynamoDB.

## E

**EBS (Elastic Block Store)**: volume block storage di rete persistente per EC2. Sezione 19.

**EC2 (Elastic Compute Cloud)**: VM on-demand. Sezione 13.

**ECR (Elastic Container Registry)**: registry Docker managed AWS. Sezione 17.

**ECS (Elastic Container Service)**: orchestratore container proprietario AWS. Sezione 17.

**EFS (Elastic File System)**: NFS managed condiviso multi-AZ. Sezione 19.

**EKS (Elastic Kubernetes Service)**: Kubernetes managed (control plane gestito da AWS). Sezione 17.

**Elastic IP (EIP)**: IP pubblico statico riassegnabile. Costa solo se NON associato a istanza running.

**ElastiCache**: Redis/Memcached managed. Sezione 25.

**ENI (Elastic Network Interface)**: scheda di rete virtuale in una subnet. Una EC2 ne ha 1+.

**EventBridge**: event bus serverless, routing eventi con regole. Sezione 27.

**Exec (ECS Exec / SSM Exec)**: aprire shell interattiva in container/EC2 senza SSH.

## F

**Fargate**: motore serverless per container ECS/EKS (paghi vCPU+RAM, niente EC2 da gestire). Sezione 17.

**Federation**: login con identity provider esterno (SAML, OIDC, AD) → ruolo IAM temporaneo.

**FIFO Queue**: SQS con ordering garantito ed esactly-once (suffix `.fifo`).

**Firewall (Network Firewall)**: firewall L3-L7 managed in VPC, regole Suricata. Vs SG/NACL: L7 e stateful avanzato.

**FSx**: filesystem managed (Windows, Lustre, NetApp ONTAP, OpenZFS). Sezione 19.

## G

**GameLift**: hosting managed per game server.

**Glacier (S3 Glacier Flexible / Deep Archive / Instant)**: classi di storage S3 a freddo. Sezione 21.

**Global Accelerator**: anycast IP statici globali con routing al miglior endpoint AWS.

**Glue**: ETL serverless basato su Spark + Data Catalog. Sezione 29.

**Graviton**: processori ARM proprietari AWS (g, c7g, m7g, ecc.), ~20% sconto vs Intel/AMD equivalenti.

**GuardDuty**: threat detection ML su VPC Flow Logs, DNS, CloudTrail, EKS audit. Sezione 33.

## H

**Hibernate**: spegnimento EC2 che salva la RAM su EBS, restart conserva lo stato.

**HSM (Hardware Security Module)**: vedi CloudHSM.

**Hyperplane**: backbone interno AWS per servizi cross-VPC come NAT Gateway, NLB, EFS.

## I

**IaC (Infrastructure as Code)**: CloudFormation, CDK, Terraform, Pulumi. Sezione 34.

**IAM (Identity and Access Management)**: utenti, gruppi, ruoli, policy. Sezione 4-5.

**IAM Identity Center (ex AWS SSO)**: SSO centralizzato per Organizations + integrazione IdP esterni. Sezione 5.

**IGW (Internet Gateway)**: oggetto VPC che permette uscita/ingresso da/verso Internet. Sezione 9.

**Instance Store**: SSD/NVMe locale all'host fisico, distrutto a stop. Solo certe famiglie EC2.

**Instance Type**: combinazione famiglia + size, es. `m7i.xlarge`. Sezione 13.

## J

**JIT (Just-In-Time access)**: pattern di accesso temporaneo elevato (es. Identity Center permission set scaduto in 1h).

**JMESPath**: linguaggio di query usato da `--query` di AWS CLI.

## K

**Kinesis**: streaming (Data Streams, Firehose, Data Analytics, Video Streams). Sezione 30.

**KMS (Key Management Service)**: chiavi simmetriche/asimmetriche managed per encryption at-rest. Sezione 31.

## L

**Lambda**: funzioni serverless event-driven, max 15 min, fino a 10 GB RAM. Sezione 16.

**Lambda Layer**: pacchetto condiviso di dipendenze montabile in più funzioni.

**LB (Load Balancer)**: ALB (L7 HTTP), NLB (L4 TCP/UDP), GWLB (L3 per appliance), CLB (legacy). Sezione 15.

**Lex**: bot conversazionali (motore di Alexa).

**Lifecycle policy**: regole automatiche su S3 (transition di classe) o EBS (snapshot DLM).

**Lightsail**: VPS semplificato a prezzo fisso, alternativa "no-AWS-complexity".

## M

**Macie**: ML che cerca dati sensibili (PII, credenziali) nei bucket S3.

**MFA (Multi-Factor Authentication)**: secondo fattore (TOTP, hardware key, FIDO2) per login.

**MSK (Managed Streaming for Kafka)**: Kafka managed. Sezione 30.

**Multi-AZ**: deployment ridondante su 2+ AZ (es. RDS Multi-AZ).

## N

**NACL (Network ACL)**: firewall *stateless* a livello subnet. Sezione 10.

**NAT Gateway**: outbound-only Internet access per subnet privata. ~$0.045/h + traffico. Sezione 9.

**Neptune**: graph DB managed (Gremlin, SPARQL, openCypher).

**Nitro**: hypervisor leggero AWS che sostituisce Xen su tutte le istanze moderne. Sezione 14.

## O

**OAC (Origin Access Control)**: successore di OAI per restringere accesso S3 al solo CloudFront.

**OpenSearch (ex Elasticsearch Service)**: search & analytics fork open-source.

**Organizations**: account multi-account hierarchy con SCP. Sezione 8.

**Outposts**: rack AWS fisico installato on-prem, gestito da AWS.

## P

**Parameter Store (SSM)**: storage gerarchico di parametri (anche cifrati). Free per standard.

**PCI-DSS / HIPAA / SOC2**: framework compliance, AWS è certified e fornisce evidence via Artifact.

**Placement Group**: cluster di EC2 con strategia (cluster=low latency, spread=alta disponibilità, partition=Hadoop).

**Polly**: text-to-speech.

**PrivateLink**: espone un servizio in una VPC ad altre VPC via ENI privata, niente IGW/peering. Sezione 10.

**Pricing model**: on-demand, reserved (RI), savings plan, spot.

## Q

**QuickSight**: BI dashboard SaaS.

**Quota (Service Quotas)**: limiti per servizio per account/region, alcuni soft (request increase), altri hard.

## R

**RAM (Resource Access Manager)**: condivide risorse (TGW, subnet, license) tra account dell'Organization.

**RDS (Relational Database Service)**: DB relazionale managed (MySQL, Postgres, MariaDB, SQL Server, Oracle, Aurora). Sezione 22.

**Redshift**: data warehouse columnar massivo, scala PB. Sezione 30.

**Region**: gruppo geografico di AZ (es. `eu-west-1` Irlanda). Sezione 2.

**Reserved Instance (RI)**: prepagamento 1 o 3 anni per EC2/RDS, sconto fino a 72%.

**REST API**: API Gateway REST (legacy ma feature-rich). Vs HTTP API (più nuovo, cheap, ridotto).

**Route 53**: DNS managed + health check + routing policy. Sezione 11.

**Route Table**: tabella di routing IP in una VPC, associata a subnet.

## S

**S3 (Simple Storage Service)**: object storage massivo. Sezione 20.

**SageMaker**: piattaforma ML end-to-end (notebook, training, hosting, pipeline). Sezione 39.

**SCP (Service Control Policy)**: policy IAM-like applicata a OU/account in Organizations. Sezione 8.

**Secrets Manager**: storage segreti con rotazione automatica. Sezione 31.

**Security Group (SG)**: firewall *stateful* a livello ENI. Sezione 10.

**SES (Simple Email Service)**: invio/ricezione email (transactional, marketing).

**Shield**: protezione DDoS (Standard gratis, Advanced $3000/mese).

**Snowball / Snowmobile**: trasferimento dati offline TB-PB con dispositivo fisico. Sezione 21.

**SNS (Simple Notification Service)**: pub/sub con fan-out. Sezione 27.

**SQS (Simple Queue Service)**: code messaggi (Standard at-least-once, FIFO exactly-once). Sezione 27.

**SSE (Server-Side Encryption)**: cifratura at-rest in S3, varianti SSE-S3, SSE-KMS, SSE-C, DSSE-KMS.

**SSM (Systems Manager)**: suite di gestione fleet EC2 (Session Manager, Patch Manager, Parameter Store, ecc.). Sezione 32.

**SSO**: vedi IAM Identity Center.

**Step Functions**: orchestratore di workflow state-machine. Sezione 28.

**Storage Gateway**: appliance ibrido on-prem che espone S3/EBS come iSCSI/NFS/SMB. Sezione 21.

**STS (Security Token Service)**: rilascia credenziali temporanee (AssumeRole). Sezione 4.

**Subnet**: range CIDR all'interno di una VPC, associata a una AZ. Sezione 9.

## T

**TCO (Total Cost of Ownership)**: calcolatore AWS per confronto on-prem vs cloud.

**Textract**: OCR managed.

**TGW (Transit Gateway)**: hub di interconnessione VPC/VPN/DX. Sezione 12.

**Trusted Advisor**: check best-practice (cost, security, fault tolerance, service limit).

## U

**UDP / TCP**: protocolli, gestiti rispettivamente da NLB (TCP/UDP) e ALB (HTTP solo).

**Unauthenticated Cognito Identity**: identity pool con guest access (rilascia credenziali IAM senza login).

## V

**VPC (Virtual Private Cloud)**: rete privata isolata in una Region. Sezione 9.

**VPC Endpoint**: accesso privato a servizio AWS senza Internet (Gateway endpoint per S3/DynamoDB, Interface endpoint per gli altri).

**VPC Flow Logs**: log del traffico IP nella VPC, in S3/CloudWatch.

**VPC Lattice**: service mesh managed cross-account/cross-VPC (successore App Mesh).

**VPC Peering**: connessione 1:1 fra 2 VPC, non transitiva.

**VPN (Site-to-Site VPN)**: tunnel IPSec on-prem ↔ AWS. Sezione 12.

## W

**WAF (Web Application Firewall)**: firewall L7 con regole gestite e rate-based, davanti a CloudFront/ALB/API Gateway. Sezione 33.

**Well-Architected Framework**: 6 pilastri di best-practice AWS (Operational Excellence, Security, Reliability, Performance, Cost, Sustainability). Sezione 40.

## X

**X-Ray**: tracing distribuito, vede end-to-end le request fra Lambda/ECS/ALB. Sezione 32.

## Y

**YAML**: formato preferito per CloudFormation template (più leggibile di JSON, supporta commenti).

## Z

**Zone Apex**: il root del DNS (es. `example.com`), gestibile in Route 53 con alias record (CNAME normale non è ammesso al root).

**Zonal Reserved Instance**: RI specifica per una AZ, garantisce capacità.

> **Riassunto**: questo glossario raccoglie 100+ termini AWS in ordine alfabetico; usalo come dizionario di riferimento mentre leggi il corso o lavori su un progetto.
