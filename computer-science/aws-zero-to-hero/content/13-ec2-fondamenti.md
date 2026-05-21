---
title: "EC2 — fondamenti (istanze, AMI, lifecycle)"
area: "Compute"
summary: "Macchine virtuali on-demand: famiglie istanze, AMI, user data, EBS root volume, key pair, Instance Connect/SSM, lifecycle (start/stop/terminate)."
order: 13
level: "principiante"
prereq:
  - "sezioni 1, 9"
tools:
  - "AWS CLI"
  - "SSM Session Manager"
---

# EC2 — fondamenti

EC2 (Elastic Compute Cloud) è la "macchina virtuale on-demand" che ha lanciato AWS. Nonostante l'esplosione del serverless e dei container, EC2 resta la primitiva su cui *molti* altri servizi sono costruiti (ECS/EKS-EC2, EMR, Elastic Beanstalk).

## 1. Anatomia di un'istanza

Quando lanci una EC2, scegli 6 cose:

1. **AMI** (Amazon Machine Image): template del disco (OS + software preinstallato).
2. **Instance type**: famiglia + size (es. `t3.medium`, `m7i.xlarge`, `r6g.2xlarge`).
3. **VPC + subnet**: dove vive (definisce AZ).
4. **Key pair**: chiave SSH (oggi spesso non serve, usi SSM).
5. **Security group**: firewall stateful.
6. **EBS root volume + (opzionali) volumi dati**.

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

## 2. Famiglie di istanze

Naming: `<lettera famiglia><generazione><attributi>.<size>`. Esempi:

| Famiglia | Workload | Esempi |
|---|---|---|
| **T** (burstable) | dev, web traffic basso/medio, picchi sporadici | t3, t4g (ARM) |
| **M** (general) | bilanciate CPU/RAM, web, app | m6i, m7g, m7i |
| **C** (compute) | CPU-heavy: web ad alto QPS, encoding, gaming | c7i, c7g |
| **R** (memory) | DB, cache, in-memory analytics | r6i, r7g |
| **X / u** (extreme memory) | SAP HANA, in-memory DB | x2idn, u-9tb1 |
| **I / D / H** (storage) | NVMe local: NoSQL, big data | i4i, d3, h1 |
| **P / G / Trn / Inf** (accelerated) | GPU, ML training (Trn), inference (Inf) | p5, g6, trn1, inf2 |

Lettere generazione: maggior numero = più recente, di solito meglio. `g` suffix = ARM (Graviton, ~20% più economici).

## 3. AMI

3 tipi:

- **AWS-managed** (Amazon Linux 2023, Ubuntu, Windows): aggiornate da AWS.
- **AWS Marketplace**: di terze parti (es. CloudHealth, Sophos).
- **Custom** (tue): partire da una base + customizzazioni con **Packer** o **EC2 Image Builder**.

Best practice: AMI immutabile + user-data per config minima + IaC per deploy. Niente "AMI snowflake" build a mano.

## 4. User data e cloud-init

Lo script di bootstrap che viene eseguito **al primo boot**. Bash o cloud-init YAML.

```bash
#!/bin/bash
dnf update -y
dnf install -y nginx
systemctl enable --now nginx
echo "<h1>Hello $(hostname)</h1>" > /usr/share/nginx/html/index.html
```

## 5. Lifecycle

| Stato | Cosa pagi | Note |
|---|---|---|
| `pending` | nulla | transizione |
| `running` | EC2 + EBS + IP pubblico se Elastic | quasi tutto |
| `stopping` / `stopped` | solo EBS storage | RAM scartata, public IP perso (a meno di Elastic IP) |
| `shutting-down` / `terminated` | nulla | dati EBS persi se "DeleteOnTermination=true" (default su root) |
| `hibernate` | EBS (snapshot della RAM su EBS) | rapid restart con stato |

Trappola: stop ≠ terminate. Stop preserva l'istanza; terminate la distrugge.

## 6. Storage di un'istanza

3 tipi:

- **EBS** (Elastic Block Store): volume network, persistente, sopravvive a stop/start. Default per root.
- **Instance Store**: SSD/NVMe locale, attaccato fisicamente all'host, **distrutto a stop/terminate**. Velocissimo. Solo certi tipi (i, d, h, ecc.).
- **EFS / FSx**: filesystem condiviso, montato come NFS.

Vedi sezione 19 per il dettaglio.

## 7. Accesso: SSH vs SSM

**Old way (SSH)**:
- Key pair RSA/ED25519, port 22 aperta nel SG, IP pubblico o bastion.
- Rischio: chiavi diffuse, port 22 esposta, audit difficile.

**New way (SSM Session Manager)**:
- Niente porta 22, niente chiavi, niente IP pubblico.
- EC2 ha SSM Agent (preinstallato su Amazon Linux) + IAM role `AmazonSSMManagedInstanceCore`.
- Connetti via `aws ssm start-session --target i-xxx` o dalla console.
- Audit log automatico in CloudTrail e S3 (opzionale).

Best practice 2026: solo SSM. Non installare chiavi SSH.

## 8. Esercizio

<details>
<summary>Una web app deve gestire 5000 RPS, latenza p99 < 100 ms. Quale famiglia EC2?</summary>

Pensiero strutturato:
- **CPU bound** (es. encoding immagini al volo): C7i o C7g (Graviton più cheap).
- **Memory bound** (cache in-process pesante): R7i o R7g.
- **Bilanciata** (web tradizionale, app server Node/Java): M7i o M7g.
- **Sviluppo / traffico burstable**: T3/T4g.

Per 5000 RPS con app HTTP standard, **m7g.large** (2 vCPU 8 GB ARM) o **c7g.large** dietro ALB è un buon punto di partenza, poi misuri e fai auto-scale orizzontale.
</details>

<details>
<summary>Hai bisogno di salvare 100 GB di dati che sopravvivano al reboot. Quale storage?</summary>

**EBS gp3** (default moderno):
- ~$0.08/GB-mese (~$8/mese per 100 GB).
- 3000 IOPS e 125 MB/s di baseline (può essere scalato indipendentemente da GB).
- Persistente, snapshottabile, snapshotabile cross-region.

NO instance store (distrutto a stop). NO EFS se single-instance (overhead NFS).
</details>

> **Riassunto**: EC2 = VM virtuale; scegli AMI + tipo (famiglia/gen/size) + subnet + SG + storage; user-data per bootstrap; lifecycle: pending → running → stopped/terminated; storage default EBS gp3 (persistente); accesso via SSM (no SSH); Graviton (ARM) = 20% sconto su molte famiglie.
