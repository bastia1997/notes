---
title: "AWS Certifications — roadmap and study guide"
area: "Reference"
summary: "Complete overview of 2026 AWS certifications: tiers, costs, duration, sample questions, recommended study paths by role, study strategies and post-cert benefits."
order: 50
level: "beginner"
prereq:
  - "the rest of the course (helpful but not required)"
tools:
  - "AWS Skill Builder"
  - "AWS Certification Account"
---

# AWS Certifications — roadmap and study guide

AWS certifications are the market-standard way to *demonstrate* cloud skills. They don't replace hands-on experience, but they are a real career tool: 70-90% of senior cloud job postings require or prefer them. This section is a map of the 2026 catalog, how to choose the right path for your role, and how to prepare without wasting money.

## 1. The 2026 catalog at a glance

AWS organizes its certs into **4 tiers**:

- **Foundational** — entry-level, ~$100, 90 min, ~65 questions, conceptual focus.
- **Associate** — professional entry, ~$150, 130 min, ~65 questions, practical focus.
- **Professional** — senior/architect-grade, ~$300, 180 min, ~75 questions, complex scenarios.
- **Specialty** — verticals (network, security, ML), ~$300, 170-180 min, ~65 questions.

Passing score: **720/1000** (scaled score, not raw). Format: multiple choice + multiple response (select 2 or 3 answers). **No penalty** for wrong answers: always answer.

### Full table

| Code | Full name | Tier | Duration | Questions | Cost | Validity |
|---|---|---|---|---|---|---|
| CLF-C02 | Cloud Practitioner | Foundational | 90 min | 65 | $100 | 3 years |
| AIF-C01 | AI Practitioner | Foundational | 90 min | 65 | $100 | 3 years |
| SAA-C03 | Solutions Architect Associate | Associate | 130 min | 65 | $150 | 3 years |
| DVA-C02 | Developer Associate | Associate | 130 min | 65 | $150 | 3 years |
| SOA-C02 | SysOps Administrator Associate | Associate | 130 min | 65 | $150 | 3 years |
| DEA-C01 | Data Engineer Associate | Associate | 130 min | 65 | $150 | 3 years |
| MLA-C01 | Machine Learning Engineer Associate | Associate | 130 min | 65 | $150 | 3 years |
| SAP-C02 | Solutions Architect Professional | Professional | 180 min | 75 | $300 | 3 years |
| DOP-C02 | DevOps Engineer Professional | Professional | 180 min | 75 | $300 | 3 years |
| ANS-C01 | Advanced Networking Specialty | Specialty | 170 min | 65 | $300 | 3 years |
| SCS-C02 | Security Specialty | Specialty | 170 min | 65 | $300 | 3 years |
| MLS-C01 | Machine Learning Specialty | Specialty | 180 min | 65 | $300 | 3 years |

Note: the **Database Specialty (DBS)** and **Data Analytics Specialty (DAS)** were *retired* in 2024, replaced respectively by the Data Engineer Associate and by broader coverage in SAP/SAA. The SAP-on-AWS Specialty exists but is niche.

## 2. Which one to take? Roadmap by role

### Junior / total beginner
1. **CCP (CLF-C02)** — overview, vocabulary, billing. Doable in 2-4 weeks part-time. $100, builds confidence, and gives you 50% off the next exam.
2. Then jump to SAA or DVA.

### Cloud Engineer / Solutions Architect
1. CCP (optional).
2. **SAA-C03** — the most popular cert in the world (1M+ certified). Covers VPC, EC2/ASG/ELB, S3, RDS, IAM, CloudFront, SNS/SQS, etc.
3. (2-3 years experience) **SAP-C02** — multi-account design, migrations, hybrid, advanced cost optimization. *Very* tough: 180 min of paragraph-long scenarios.

### Developer / Backend Engineer
1. CCP (optional).
2. **DVA-C02** — Lambda, API Gateway, DynamoDB, Cognito, CodePipeline, X-Ray, SAM.
3. (Optional) SAA to broaden architectural view.

### DevOps / SRE / Platform Engineer
1. SAA + DVA (in any order).
2. **SOA-C02** — monitoring, logging, automation, troubleshooting (has *exam labs*: interactive console scenarios).
3. **DOP-C02** — advanced CI/CD, IaC, observability, incident response.

### Data Engineer
1. CCP or SAA.
2. **DEA-C01** — Glue, Athena, Redshift, EMR, Kinesis, Data Lake, Lake Formation, Step Functions for ETL.

### ML Engineer / Data Scientist
1. **AIF-C01 (AI Practitioner)** — GenAI fundamentals, Bedrock, prompt engineering, responsible AI.
2. **MLA-C01 (ML Engineer Associate)** — MLOps, SageMaker pipelines, deployment, monitoring.
3. (Advanced) **MLS-C01 (ML Specialty)** — math/algo focus, more "data scientist" than engineer.

### Security Engineer
1. SAA.
2. **SCS-C02** — advanced IAM, KMS, GuardDuty, Security Hub, Macie, incident response, encryption design.

### Network Engineer
1. SAA.
2. **ANS-C01** — advanced VPC, Direct Connect, Transit Gateway, Route 53 advanced, hybrid networking, network security.

### All-round architect
1. SAA → DVA → SOA → SAP. Called the *"sweep"*. Makes you a complete "AWS generalist".

## 3. Costs and discounts

- Foundational: **$100**.
- Associate: **$150**.
- Professional / Specialty: **$300**.
- **50% off** your next exam (any tier) every time you pass one. Stackable.
- **Free practice exam** (Official Practice Question Set) after each pass, on Skill Builder.
- Students / AWS re/Start / AWS Educate: often 100% or 50% vouchers.
- Cloud Practitioner Essentials: free course + 50% voucher at certain events.

> Smart strategy: after CCP use 50% off on SAA ($75). After SAA, 50% off on DVA ($75). Four certs may cost ~$400-450 instead of $700.

## 4. Exam format

- **Multiple choice** (1 correct out of 4) and **multiple response** (2 or 3 correct out of 5-6).
- No penalty: when you don't know, **make an educated guess**.
- **Flag and review**: you can mark a question and return at the end.
- **Unscored pretest questions**: ~15 of the 65 don't count for the score (you don't know which).
- **Languages**: English, Italian, Spanish, French, German, Japanese, Korean, Portuguese, Simplified Chinese (varies by exam).
- **Mode**: Pearson VUE testing center (in-person) or **online proctored** (from home, with webcam and environment check).

### Result

- On screen: **pass/fail** immediately at end.
- Numeric score (200-1000) within 5 days via email.
- Detailed feedback by section (above/below pass per domain), **not** a list of missed questions.

## 5. Study resources — my ranking

### Free and official
- **AWS Skill Builder** ([skillbuilder.aws](https://skillbuilder.aws)): hundreds of free courses. Search "Exam Prep: AWS Certified XXX".
- **AWS Whitepapers**: "Well-Architected Framework", "Security Best Practices", "Disaster Recovery", "Cost Optimization Pillar". *At least* read the W-AF, it shows up in ~30% of SAA/SAP questions.
- **AWS FAQ** per service: often an exam question is a rephrased FAQ.
- **AWS Documentation** (developer guides): for deep scenarios.
- **Official sample questions**: 10 free questions per exam on the certification site.

### Paid (recommended)
- **Tutorials Dojo** (Jon Bonso): **excellent** practice exam sets. De facto standard. ~$15-20 per set.
- **Adrian Cantrill** ([learn.cantrill.io](https://learn.cantrill.io)): **high-quality** video courses for SAA, SAP, DVA, SOA, ANS, SCS. Very practical labs. ~$40-50 per course. The best if you want to *truly* understand.
- **Stephane Maarek** (Udemy): fast video courses, great for first pass. ~$15 on sale (happens every 2 weeks). Practical, very popular.
- **Whizlabs / Examtopics**: practice questions. Examtopics has *disputes* in the discussion: read comments, don't trust the "community answer".
- **Neal Davis (Digital Cloud Training)**: alternative to Maarek, similar price.

### To avoid
- **Exam dumps** (sites selling stolen real questions): violates AWS NDA, can get you **lifetime banned** if caught (it happens), and gives you a false sense of knowledge. Ethically: no.
- "Pass guaranteed in 1 week": clickbait.

## 6. Study strategy

### Golden rule: hands-on > theory

For every service you study, **actually spin it up** at least once:
- create a VPC, drop in an EC2, an ALB, an ASG → SAA;
- deploy a Lambda with SAM or CDK → DVA;
- push custom metrics to CloudWatch and create an alarm → SOA;
- create a CodeBuild → CodeDeploy pipeline → DOP;
- run a Glue job on S3 and query with Athena → DEA.

The exam asks *which service you pick* in a scenario. Without touching it, it'll all sound the same.

### 4-week schedule for an Associate (full-time student, ~3h/day)

| Week | Activity |
|---|---|
| 1 | Full video course pass (Cantrill or Maarek). Short notes. |
| 2 | Hands-on labs on weakest domains. AWS account in free tier. |
| 3 | Tutorials Dojo practice exam: 1 deep review (3-4h per 65-question exam). |
| 4 | Review weak domains + 2 more practice exams. When you hit 80%+ consistently → book. |

### 8-10 week schedule for a Professional

Double the time. Add: whitepaper reading, multi-account scenarios, video replays.

### Exam day

- Sleep.
- Center: arrive 30 min early, valid ID.
- Online proctored: prepare room (clean desk, no extra screens, no watch), system test the day before.
- During: **flag** long questions and return at end. Don't burn 5 min on one.
- Elimination strategy: in multiple choice, often 2 options are obviously wrong → 50/50.
- Multiple response: read *every* option, don't stop at first correct one.

## 7. After the exam

- Digital badge on **Credly**: share on LinkedIn.
- **AWS Certified** community Slack (~80k members).
- 50% off your next exam (voucher in account).
- Access to **beta exams** (beta exams at $75 → official cert before public release).
- Eligibility for **AWS re:Invent Certification Lounge**.
- Validity: **3 years** from exam date.

### Recertification

- You can retake the same cert to renew.
- Or: passing a **higher level** cert *automatically* renews all lower-level ones in the same area (e.g. SAP renews SAA).
- AWS emails reminders 6 months and 3 months before expiry.

## 8. ROI: is it worth it?

Yes if:
- you're looking for a cloud job (junior/mid) → the first Associate unlocks interviews;
- you want a raise or internal promotion;
- you work in consulting (AWS Partner Network requires X certs per tier);
- it helps you *study structured*: without an exam deadline, you tend to procrastinate.

No if:
- you already have 5+ years of solid cloud experience and nobody asks;
- you think they replace hands-on experience (they don't).

## 9. Quick FAQ

<details>
<summary>Can I skip CCP and go straight to SAA?</summary>

Yes, it's allowed. Recommended to skip if you already have general tech background. If you're total zero-to-hero, CCP is a nice launchpad.
</details>

<details>
<summary>How long from zero to SAA?</summary>

Variable: 80-150 hours of study from a tech background (dev/sysadmin), 150-250h from zero IT. Spread over 1-3 months.
</details>

<details>
<summary>Is SAP really as hard as they say?</summary>

Yes. It's a *reading* exam before a technical one: 200-300 word scenarios, long similar options, time pressure (180 min / 75 = 2:24 per question). Requires SAA + real experience. Estimated pass rate ~50-60%.
</details>

<details>
<summary>Do certs really expire?</summary>

Yes, after 3 years the badge becomes "expired". It stays on your profile as "previously earned", but you can't call yourself a "current AWS Certified Solutions Architect" until you renew.
</details>

> **Summary**: 4 tiers (Foundational $100 → Associate $150 → Professional/Specialty $300), passing 720/1000, no penalty. Roadmap by role: SAA is almost always the first "real" one; DVA for devs, SOA+DOP for devops, DEA for data, MLA/AIF for ML, SCS/ANS for verticals. Resources: Cantrill (deep) + Maarek (quick) + Tutorials Dojo (practice). Hands-on labs mandatory. 3-year validity, 50% off next exam after each pass.
