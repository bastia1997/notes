---
title: "Pricing, billing, free tier, cost tools"
area: "Fondamenti"
summary: "Modelli on-demand vs Reserved vs Savings Plans vs Spot, breakdown della bolletta, Cost Explorer, Budgets, Cost Anomaly Detection, e i tre 'killer' che fanno esplodere i conti."
order: 7
level: "principiante"
prereq:
  - "sezioni 1-3"
tools:
  - "Cost Explorer (gratis)"
  - "AWS Pricing Calculator: calculator.aws"
  - "boto3 ce client per esport CSV"
---

# Pricing, billing, free tier, cost tools

Su AWS i prezzi sono **modulari**: ogni singolo servizio fattura una manciata di dimensioni (compute-hour, GB-month, requests, GB-transferred). La bolletta totale è la somma di centinaia di queste righe. Senza disciplina, le startup arrivano a $50k/mese con il 30% di risorse mai usate. Questa pagina ti dà la mappa.

## 1. Sei modelli di pricing del compute

Vale per EC2 ma il concetto si estende ad altri servizi compute.

| Modello | Sconto vs on-demand | Impegno | Quando usarlo |
|---|---|---|---|
| **On-Demand** | 0% (baseline) | nessuno | dev, workload imprevedibili, prototipi |
| **Savings Plans (Compute)** | fino al 66% | 1 o 3 anni, $/h impegnato | workload stabili indipendenti dal tipo istanza |
| **Savings Plans (EC2 Instance)** | fino al 72% | 1 o 3 anni, $/h per famiglia/region | stabili E sai famiglia |
| **Reserved Instances** | fino al 75% | 1 o 3 anni, specifica istanza | legacy: SP è quasi sempre meglio oggi |
| **Spot** | fino al 90% | nessuno, ma può essere terminata con 2 min preavviso | batch, fault-tolerant, ML training |
| **Dedicated Host** | premium | 1 o 3 anni | compliance/licensing (es. Oracle BYOL) |

Regola pratica: copri il **70-80% del baseline** con Savings Plans Compute a 1 anno, gestisci il picco con on-demand, fai i job interrompibili in Spot.

## 2. Le tre voci universali di costo

Per quasi ogni servizio si paga:

1. **Compute / richieste**: ore EC2, secondi Lambda × GB-sec, milioni di richieste DynamoDB/S3/SQS.
2. **Storage**: GB-mese (S3, EBS, snapshot, EFS, RDS storage).
3. **Data transfer**: il bidone nascosto (vedi sezione 3, "egress").

Esempio reale di breakdown mensile per una startup web tipica ($3500/mese):

| Voce | $ | % |
|---|---|---|
| EC2 (compute) | 1200 | 34% |
| RDS (db.r5.large Multi-AZ) | 450 | 13% |
| S3 (5 TB) | 115 | 3% |
| CloudFront (10 TB egress) | 700 | 20% |
| Data Transfer Out (direct) | 280 | 8% |
| NAT Gateway | 140 | 4% |
| CloudWatch Logs (retention 30g) | 200 | 6% |
| ALB | 60 | 2% |
| Altro (Secrets, KMS, Route53, ecc.) | 355 | 10% |

Punti tipici per ottimizzare: **NAT Gateway** (sostituibile con VPC endpoint per traffico S3/DynamoDB), **CloudWatch Logs** (retention infinita di default!), **EBS gp2 vs gp3** (gp3 più economico e più veloce), **Snapshot** vecchi non eliminati.

## 3. Il "killer egress"

Le tre dinamiche di traffico più costose:

| Sorgente | Costo tipico | Mitigazione |
|---|---|---|
| EC2/Lambda → Internet | $0.09/GB | CloudFront (cache abbassa) |
| EC2 → S3 stessa Region tramite NAT | $0.045/GB processato + 0 a S3 | VPC Gateway Endpoint (gratis) |
| Cross-AZ con load balancer ALB | $0.01/GB in entrambe direzioni | considerare cross-zone disabled (rischio sbilanciamento) |
| Cross-Region replication | $0.02/GB | replica solo ciò che serve davvero |

Caso reale 2024 documentato: una società SaaS scopre $40k/mese di egress perché un microservizio in `us-east-1` chiama un altro in `us-west-2` ogni richiesta. Soluzione: spostare i servizi nella stessa Region o usare PrivateLink intra-Region.

## 4. Free tier — recap rapido

- **12 mesi**: 750h EC2 t2/t3/t4g.micro, 5 GB S3 Standard, 750h RDS micro, 1 GB DB storage, 30 GB EBS.
- **Always free**: 1M invocazioni Lambda/mese + 400k GB-secondi, 25 GB DynamoDB + 25 RCU/WCU, 1 milione SNS, 1 milione SQS, 750h ElastiCache micro (alcuni piani), 5 GB CloudWatch Logs ingest + 5 GB archived.
- **CloudFront**: 1 TB egress/mese + 10M richieste/mese (perpetually, dal 2021).

Trappola: i 750h sono **per famiglia di istanza, per Region**. Se lanci 2 t3.micro 24/7 in eu-west-1, finisci il free tier a metà mese.

## 5. Strumenti gratuiti di costo

### Cost Explorer
Gratis da abilitare. Breakdown per servizio, account, Region, tag. Grafici e previsioni a 12 mesi.

### Budgets
Allarmi soft cap ($, %, forecast). Limite di 62 budget gratuiti per account.

### Cost Anomaly Detection
ML che rileva spike anomali (es. lambda che entra in loop). Manda email/SNS.

### Cost & Usage Report (CUR)
Export dettagliato (riga per riga) in S3 ogni ora. Si interroga con Athena. Necessario per FinOps serio.

### Pricing Calculator
[calculator.aws](https://calculator.aws). Costruisci un'architettura virtuale e ottieni stima. Utile per business case.

### Trusted Advisor
Check pre-fabbricati ("hai EC2 idle", "hai snapshot orfani"). Versione base gratis; full con Business/Enterprise Support.

### Compute Optimizer
ML che raccomanda rightsizing EC2/EBS/Lambda/ASG basandosi su CloudWatch. Vede "stai usando 8 vCPU al 5%, scendi a 2".

## 6. Tagging strategy

Senza tag non puoi fare cost allocation. Standard minimo:

| Tag key | Esempi |
|---|---|
| `Owner` | `team-platform`, `alice@acme.com` |
| `Environment` | `prod`, `staging`, `dev` |
| `CostCenter` | `eng`, `marketing`, `data` |
| `Project` | `checkout-v2` |
| `ExpiryDate` | `2026-12-31` (per cleanup) |

**Enforcement**: usa SCP con `aws:RequestTag/<key>` per impedire creare risorse senza tag. AWS Organizations supporta "Tag Policies" per validare valori ammessi.

## 7. Tre regole d'oro FinOps

1. **Mai dimenticare il decommissioning**: una EC2 stoppata per "test" 6 mesi fa paga lo storage EBS. Snapshot orfani $$$.
2. **Spegnere dev/staging fuori orario**: con un cron Lambda risparmi 60–70% di EC2/RDS dev.
3. **Re-instance once a year**: famiglie nuove (es. da m5 a m7i, o gp2 a gp3) costano meno e vanno più veloce.

## 8. Esercizio

<details>
<summary>La bolletta è schizzata a $8k questo mese contro $3k di media. Come investighi?</summary>

1. **Cost Explorer** con grouping per servizio: identifica il servizio "colpevole".
2. Group per **Region** e poi per **resource tag**: trovi quale workload.
3. Se è EC2: Compute Optimizer per vedere se è rightsizing oppure quantity.
4. Se è data transfer: **VPC Flow Logs** + Athena per scoprire chi parla con chi.
5. **Cost Anomaly Detection** dovrebbe averti già scritto: controlla email/SNS.
6. CUR + Athena se Cost Explorer non basta (es. costi per ora del giorno).

Pattern noti: Lambda in loop, NAT Gateway saturato da microservizio chiacchierone, Aurora che fa cross-Region replica per errore, CloudWatch Logs senza retention.
</details>

<details>
<summary>Hai workload stabile $5k/mese EC2 in eu-west-1. Quanto risparmi con Savings Plans 3 anni?</summary>

- Savings Plans Compute 3-year, no upfront: ~54% sconto = ~$2750/mese spesi → ~**$27k risparmiati su 12 mesi**.
- Savings Plans Compute 3-year, all upfront: ~66% sconto = paghi ~$60k oggi, ma "spendi" $1700/mese di equivalente.
- Reserved Instances (specifico istanza) 3-year all upfront: ~75% sconto ma vincolata a famiglia/AZ.

Trade-off: 3 anni è un sacco. Se sei una startup early-stage, 1 anno è più sicuro (sconto ~40%).
</details>

> **Riassunto**: pricing AWS = compute + storage + data transfer per ogni servizio. Free tier copre tanto ma occhio a famiglia/Region. Cost Explorer + Budgets + Anomaly Detection sono setup zero-cost obbligatorio. NAT Gateway, CloudWatch Logs senza retention, snapshot orfani sono i killer silenziosi. Savings Plans coprono il baseline, Spot per batch, on-demand per il picco. Senza tag non hai cost allocation: governali con SCP.
