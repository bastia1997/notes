---
title: "Certificazioni AWS — roadmap e study guide"
area: "Reference"
summary: "Panoramica completa delle certificazioni AWS 2026: tier, costi, durata, sample question, study path consigliati per ruolo, strategie di studio e benefici post-cert."
order: 50
level: "principiante"
prereq:
  - "tutto il resto del corso (utile ma non obbligatorio)"
tools:
  - "AWS Skill Builder"
  - "AWS Certification Account"
---

# Certificazioni AWS — roadmap e study guide

Le certificazioni AWS sono il modo standard di mercato per *dimostrare* competenze cloud. Non sostituiscono l'esperienza pratica, ma sono uno strumento di carriera reale: 70-90% dei job posting cloud "senior" le richiede o le preferisce. Questa sezione è una mappa del catalogo 2026, di come scegliere il percorso giusto per il tuo ruolo, e di come prepararti senza buttare soldi.

## 1. Il catalogo 2026 in un colpo d'occhio

AWS organizza le sue cert in **4 tier**:

- **Foundational** — entry-level, ~$100, 90 min, ~65 domande, focus concettuale.
- **Associate** — professional entry, ~$150, 130 min, ~65 domande, focus pratico.
- **Professional** — senior/architect-grade, ~$300, 180 min, ~75 domande, scenari complessi.
- **Specialty** — verticali (network, security, ML), ~$300, 170-180 min, ~65 domande.

Passing score: **720/1000** (scala scaled-score, non grezza). Formato: multiple choice + multiple response (seleziona 2 o 3 risposte). **Nessuna penalità** per risposte sbagliate: rispondi sempre.

### Tabella completa

| Codice | Nome esteso | Tier | Durata | Domande | Costo | Validità |
|---|---|---|---|---|---|---|
| CLF-C02 | Cloud Practitioner | Foundational | 90 min | 65 | $100 | 3 anni |
| AIF-C01 | AI Practitioner | Foundational | 90 min | 65 | $100 | 3 anni |
| SAA-C03 | Solutions Architect Associate | Associate | 130 min | 65 | $150 | 3 anni |
| DVA-C02 | Developer Associate | Associate | 130 min | 65 | $150 | 3 anni |
| SOA-C02 | SysOps Administrator Associate | Associate | 130 min | 65 | $150 | 3 anni |
| DEA-C01 | Data Engineer Associate | Associate | 130 min | 65 | $150 | 3 anni |
| MLA-C01 | Machine Learning Engineer Associate | Associate | 130 min | 65 | $150 | 3 anni |
| SAP-C02 | Solutions Architect Professional | Professional | 180 min | 75 | $300 | 3 anni |
| DOP-C02 | DevOps Engineer Professional | Professional | 180 min | 75 | $300 | 3 anni |
| ANS-C01 | Advanced Networking Specialty | Specialty | 170 min | 65 | $300 | 3 anni |
| SCS-C02 | Security Specialty | Specialty | 170 min | 65 | $300 | 3 anni |
| MLS-C01 | Machine Learning Specialty | Specialty | 180 min | 65 | $300 | 3 anni |

Nota: la **Database Specialty (DBS)** e la **Data Analytics Specialty (DAS)** sono state *ritirate* nel 2024, sostituite rispettivamente dalla Data Engineer Associate e da una copertura più ampia in SAP/SAA. La SAP-on-AWS Specialty esiste ma è di nicchia.

## 2. Quale fare? Roadmap per ruolo

### Junior / total beginner
1. **CCP (CLF-C02)** — overview, vocabolario, billing. Si fa in 2-4 settimane part-time. Costa $100, dà fiducia, e ottieni il 50% di sconto sull'esame successivo.
2. Poi salti a SAA o DVA.

### Cloud Engineer / Solutions Architect
1. CCP (opzionale).
2. **SAA-C03** — è la cert più popolare al mondo (oltre 1 milione di certificati). Copre VPC, EC2/ASG/ELB, S3, RDS, IAM, CloudFront, SNS/SQS, ecc.
3. (2-3 anni esperienza) **SAP-C02** — design multi-account, migrazioni, hybrid, cost optimization avanzata. È *molto* tosta: 180 min di scenari di 1 paragrafo ognuno.

### Developer / Backend Engineer
1. CCP (opzionale).
2. **DVA-C02** — Lambda, API Gateway, DynamoDB, Cognito, CodePipeline, X-Ray, SAM.
3. (Opzionale) SAA per ampliare la vista architetturale.

### DevOps / SRE / Platform Engineer
1. SAA + DVA (in ordine libero).
2. **SOA-C02** — monitoring, logging, automation, troubleshooting (ha *exam labs*: scenari interattivi sulla console).
3. **DOP-C02** — CI/CD avanzato, IaC, observability, incident response.

### Data Engineer
1. CCP o SAA.
2. **DEA-C01** — Glue, Athena, Redshift, EMR, Kinesis, Data Lake, Lake Formation, Step Functions per ETL.

### ML Engineer / Data Scientist
1. **AIF-C01 (AI Practitioner)** — fondamenti GenAI, Bedrock, prompt engineering, responsible AI.
2. **MLA-C01 (ML Engineer Associate)** — MLOps, SageMaker pipeline, deployment, monitoring.
3. (Avanzato) **MLS-C01 (ML Specialty)** — math/algo focus, più "data scientist" che engineer.

### Security Engineer
1. SAA.
2. **SCS-C02** — IAM avanzato, KMS, GuardDuty, Security Hub, Macie, incident response, encryption design.

### Network Engineer
1. SAA.
2. **ANS-C01** — VPC avanzato, Direct Connect, Transit Gateway, Route 53 advanced, hybrid networking, network security.

### Architect a tutto tondo
1. SAA → DVA → SOA → SAP. Si chiama *"sweep"*. Ti rende un completo "AWS generalist".

## 3. Costi e sconti

- Foundational: **$100**.
- Associate: **$150**.
- Professional / Specialty: **$300**.
- **50% off** sul prossimo esame (qualsiasi tier) ogni volta che ne passi uno. Cumulabile.
- **Free practice exam** (Official Practice Question Set) dopo ogni esame passato, su Skill Builder.
- Studenti / AWS re/Start / AWS Educate: spesso voucher 100% o 50%.
- Cloud Practitioner Essentials: corso gratuito + voucher 50% in alcuni eventi.

> Strategia smart: dopo CCP usi il 50% off su SAA ($75). Dopo SAA, 50% off su DVA ($75). Quattro cert ti possono costare ~$400-450 invece di $700.

## 4. Formato esame

- **Multiple choice** (1 risposta corretta su 4) e **multiple response** (2 o 3 corrette su 5-6).
- Nessuna penalità: se non sai, **tira un'ipotesi educata**.
- **Flag and review**: puoi marcare una domanda e tornarci alla fine.
- **Domande pretest non scorate**: ~15 domande sui 65 non contano per il punteggio (non sai quali).
- **Lingue**: inglese, italiano, spagnolo, francese, tedesco, giapponese, coreano, portoghese, cinese sempl. (varia per esame).
- **Modalità**: Pearson VUE testing center (in presenza) o **online proctored** (da casa, con webcam e check ambiente).

### Risultato

- A schermo: **pass/fail** subito alla fine.
- Score numerico (200-1000) entro 5 giorni via email.
- Detailed feedback per sezione (sopra/sotto la sufficienza per dominio), **non** lista delle domande sbagliate.

## 5. Study resources — il mio ranking

### Gratis e ufficiali
- **AWS Skill Builder** ([skillbuilder.aws](https://skillbuilder.aws)): centinaia di corsi gratis. Cerca "Exam Prep: AWS Certified XXX".
- **AWS Whitepapers**: "Well-Architected Framework", "Security Best Practices", "Disaster Recovery", "Cost Optimization Pillar". *Almeno* leggi il W-AF, esce in ~30% delle domande SAA/SAP.
- **AWS FAQ** per servizio: spesso una domanda d'esame è una FAQ riscritta.
- **AWS Documentation** (developer guides): per scenari profondi.
- **Sample questions ufficiali**: 10 domande gratuite per ogni esame, sul sito certification.

### A pagamento (consigliati)
- **Tutorials Dojo** (Jon Bonso): set di practice exam **eccellenti**. Standard de facto. ~$15-20 per set.
- **Adrian Cantrill** ([learn.cantrill.io](https://learn.cantrill.io)): video course di **alta qualità** per SAA, SAP, DVA, SOA, ANS, SCS. Lab molto pratici. ~$40-50 per corso. Il migliore se vuoi capire *davvero*.
- **Stephane Maarek** (Udemy): video course veloci, ottimi per primo passaggio. ~$15 in saldo (capita ogni 2 settimane). Pratici, molto popolari.
- **Whizlabs / Examtopics**: practice question. Examtopics ha *contestare* le risposte nella discussion: leggi i commenti, non fidarti della "comunità answer".
- **Neal Davis (Digital Cloud Training)**: alternativa a Maarek, simile prezzo.

### Da evitare
- **Exam dump** (siti che vendono domande reali rubate): viola il NDA AWS, ti possono **bannare a vita** se ti beccano (succede), e ti illude di sapere senza capire. Eticamente: no.
- "Pass guaranteed in 1 week": clickbait.

## 6. Strategia di studio

### Regola d'oro: hands-on > teoria

Per ogni servizio che studi, **fallo davvero girare** almeno una volta:
- crei una VPC, ci metti una EC2, un ALB, un'ASG → SAA;
- deployi una Lambda con SAM o CDK → DVA;
- spari un set di metriche custom in CloudWatch e crei un alarm → SOA;
- crei una pipeline CodeBuild → CodeDeploy → DOP;
- giri un job Glue su S3 e lo query con Athena → DEA.

L'esame chiede *quale servizio scegli* in uno scenario. Senza averlo toccato, ti suonerà tutto uguale.

### Schema 4 settimane per un Associate (full-time studente, ~3h/giorno)

| Settimana | Attività |
|---|---|
| 1 | Video course full-pass (Cantrill o Maarek). Note brevi. |
| 2 | Hands-on lab dei domini meno familiari. AWS account in free tier. |
| 3 | Practice exam Tutorials Dojo: 1 review approfondita (3-4h per esame da 65 domande). |
| 4 | Riguardare domini deboli + altri 2 practice exam. Quando prendi 80%+ consistente → prenota. |

### Schema 8-10 settimane per un Professional

Doppio del tempo. Aggiungi: lettura whitepaper, scenari multi-account, replay video.

### Il giorno dell'esame

- Dormi.
- Centro: arriva 30 min prima, ID valido.
- Online proctored: prepara stanza (scrivania pulita, no schermi extra, no orologio), test del sistema il giorno prima.
- Durante: **flag** le domande lunghe e torna alla fine. Non sprecare 5 minuti su una.
- Strategia eliminazione: in multiple choice spesso 2 risposte sono ovviamente sbagliate → 50/50.
- Multiple response: leggi *ogni* opzione, non fermarti alle prime corrette.

## 7. Dopo l'esame

- Badge digitale su **Credly**: condividilo su LinkedIn.
- **AWS Certified** community Slack (~80k membri).
- Sconto 50% sul prossimo esame (voucher in account).
- Accesso a **beta exam** (esami in beta a $75 → cert ufficiale prima del rilascio pubblico).
- Eligibilità a **AWS re:Invent Certification Lounge**.
- Validità: **3 anni** da data esame.

### Ricertificazione

- Puoi ridare la stessa cert per rinnovare.
- Oppure: passare una cert di **livello superiore** rinnova *automaticamente* tutte quelle dei livelli inferiori della stessa area (es. SAP rinnova SAA).
- AWS manda email di reminder 6 mesi e 3 mesi prima della scadenza.

## 8. ROI: vale la pena?

Sì se:
- cerchi lavoro cloud (junior/mid) → il primo Associate sblocca colloqui;
- vuoi un aumento o promozione interna;
- lavori in consulenza (AWS Partner Network richiede X cert per tier);
- ti aiuta a *studiare strutturato*: senza scadenza esame, tendi a procrastinare.

No se:
- hai già 5+ anni di esperienza solida cloud e nessuno te le chiede;
- pensi che ti sostituiscano l'esperienza pratica (non lo fanno).

## 9. FAQ rapide

<details>
<summary>Posso saltare CCP e fare direttamente SAA?</summary>

Sì, è permesso. Consigliato saltarla se hai già esperienza tech generale. Se sei zero-to-hero totale, CCP è una bella pista di decollo.
</details>

<details>
<summary>Quanto tempo serve da zero a SAA?</summary>

Variabile: 80-150 ore di studio se parti da background tech (sviluppatore/sysadmin), 150-250h se parti da zero IT. Distribuiti su 1-3 mesi.
</details>

<details>
<summary>SAP è davvero così difficile come dicono?</summary>

Sì. È un esame di *lettura* prima che di tecnica: scenari di 200-300 parole, opzioni lunghe e simili, time pressure (180 min / 75 = 2:24 a domanda). Servono SAA + esperienza reale. Pass rate stimato ~50-60%.
</details>

<details>
<summary>Le cert scadono davvero?</summary>

Sì, dopo 3 anni il badge diventa "expired". Resta sul tuo profilo come "previously earned", ma non puoi più dirti "current AWS Certified Solutions Architect" finché non rinnovi.
</details>

> **Riassunto**: 4 tier (Foundational $100 → Associate $150 → Professional/Specialty $300), passing 720/1000, no penalty. Roadmap per ruolo: SAA è quasi sempre la prima "vera"; DVA per dev, SOA+DOP per devops, DEA per data, MLA/AIF per ML, SCS/ANS per verticali. Resources: Cantrill (deep) + Maarek (quick) + Tutorials Dojo (practice). Hands-on lab obbligatori. Validità 3 anni, 50% sconto su next exam dopo ogni pass.
