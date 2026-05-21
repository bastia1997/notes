---
title: "IT/EU regulatory references in detail"
area: "Reference"
order: 31
level: "intermediate"
summary: "Which laws and regulations to actually read: relevant GDPR articles, Italian penal code for security, NIS2 (Legislative Decree 138/2024), operational DORA articles, AI Act, EUCC. With citations and links to official texts."
prereq:
  - "Section 25"
tools:
  - "EUR-Lex (EU texts)"
  - "Normattiva.it (IT texts)"
  - "Gazzetta Ufficiale"
---

# IT/EU regulatory references in detail

> Not legal advice. These are the **actual sources** you use if you want to understand/cite them in your reports or contracts.

## Italian Penal Code — relevant articles

Consolidated text: [Normattiva](https://www.normattiva.it) (search "Codice Penale", numbered articles).

### Art. 615-ter — Unauthorized access to a computer or telematic system

> *Anyone who unlawfully gains access to a computer or telematic system protected by security measures, or remains in it against the express or implicit will of the person entitled to exclude them, is punishable by imprisonment of up to three years.*

Aggravating circumstances (2-10 years imprisonment):
- System of military/security/healthcare/civil protection interest.
- Public official or person in charge of a public service (with abuse of powers).
- Violence/threat.
- Damage to system/data.

**Important:** "protected by security measures" = even a weak password counts as a "measure". Access without explicit authorization is a crime even if you don't steal anything.

### Art. 615-quater — Unlawful possession and dissemination of access codes

Covers passwords, keys, tokens. Penalty: up to 1 year.

### Art. 615-quinquies — Possession and dissemination of equipment/software to damage or access

Amended in 2023 (Legislative Decree 184/2023). Covers **tools and malware**. Case law distinguishes use and intent — a researcher with offensive tools is not automatically prosecutable if the activity is lawful security research.

### Art. 617-quater / 617-quinquies / 617-sexies

Interception, obstruction, falsification of computer communications.

### Art. 635-bis / -ter / -quater / -quinquies

Computer damage (data / programs / public systems).

### Art. 640-ter — Computer fraud

System alteration for profit. Penalty 6 months – 3 years (aggravated 1-5 years).

### Art. 612-ter — Unlawful dissemination of sexually explicit images/videos

"Revenge porn". Penalty 1-6 years.

### 2023 reform (Legislative Decree 184/2023)

Transposes directive (EU) 2019/713 (non-cash payment fraud) and amends several articles.

## GDPR — Regulation (EU) 2016/679

Text: [EUR-Lex - 32016R0679](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

### Articles every security engineer MUST know

- **Art. 5** — Principles (lawfulness, minimization, integrity and confidentiality, accountability).
- **Art. 6** — Legal bases for processing (consent, contract, legal obligation, vital interest, public interest, legitimate interest).
- **Art. 9** — Special categories of data (health, biometric, ...). Processing normally prohibited.
- **Art. 25** — Privacy by design and by default.
- **Art. 28** — Data processor. Written DPA required.
- **Art. 32** — **Security of processing.** Technical and organizational measures appropriate to the risk:
  - pseudonymization and encryption;
  - ability to ensure continuity, integrity, availability;
  - ability to restore in case of incident;
  - procedure for regular testing and evaluation of measures.
- **Art. 33** — **Breach notification to the Garante within 72 hours** of becoming aware, unless the breach is "unlikely to present a risk".
- **Art. 34** — Notification to data subjects if high risk.
- **Art. 35** — DPIA for high-risk processing.
- **Art. 37-39** — DPO: mandatory for public authorities, large-scale processing, special data.
- **Art. 44-49** — Extra-EU transfers. See Schrems II + Standard Contractual Clauses (SCC) + adequacy decision (US Data Privacy Framework 2023).
- **Art. 83** — Sanctions: up to **€20M or 4% global turnover** (greater of).
- **Art. 84** — National criminal sanctions (Italy: Legislative Decree 196/2003 + 101/2018).

### Italian Data Protection Authority (Garante Privacy)

Authority: garanteprivacy.it. Publishes rulings, FAQs, [guidelines](https://www.garanteprivacy.it). Decisions of the most recent rulings are useful to read for real cases (e.g. ChatGPT 2023, Replika 2023, OneCoin, ...).

## NIS2 — Legislative Decree 138/2024 in IT

Directive (EU) 2022/2555. Transposed in IT by Legislative Decree of 4 September 2024, no. 138. Entered into force 16 October 2024. **Applicable.**

### What changes compared to NIS1

- **More sectors** (Annex I + II): from 5 to 18. "Essential" (energy, transport, healthcare, finance, digital infra, banks, drinking water, waste water, ICT manage, govt, research) vs "Important" (postal, waste, chemical, food, manufacturing, ICT product, scientific research, digital provider). Also **mid-cap** and some medium-sized enterprises.
- **Self-identification**: the company must register on the ACN portal if it falls within scope. No more negotiated list.
- **Stricter obligations** (Art. 21):
  - Risk analysis.
  - Incident handling.
  - Business continuity / disaster recovery.
  - Supply chain security.
  - Security in development + acquisition + maintenance.
  - Crypto policies and procedures.
  - Personnel (training, security HR).
  - Physical and logical access (e.g. mandatory MFA).
  - Endpoint, network, communications security.
- **Reporting**:
  - Early warning within **24h** of becoming aware.
  - Detailed notification within **72h**.
  - Final report within **1 month**.
- **Sanctions**:
  - Essential: max(€10M, 2% global turnover).
  - Important: max(€7M, 1.4% turnover).
- **Management liability**: the board is responsible and can be personally sanctioned.

### Official references

- Text: [Gazzetta Ufficiale General Series no. 230 of 1.10.2024 — Legislative Decree 138/2024](https://www.gazzettaufficiale.it/eli/id/2024/10/01/24G00159/sg).
- ACN portal: [acn.gov.it](https://www.acn.gov.it) → registration portal + guidelines.
- EU NIS2 Directive: [EUR-Lex 32022L2555](https://eur-lex.europa.eu/eli/dir/2022/2555).

## DORA — Regulation (EU) 2022/2554

EU **financial sector**. Entered into full application on **17 January 2025**.

### What it covers

Pillars:
1. **ICT risk management** (Art. 5-16): framework, board responsibility, asset inventory, policy.
2. **ICT incident management** (Art. 17-23): classification (major / significant), notification within specific deadlines, end-to-end process.
3. **Digital operational resilience testing** (Art. 24-27):
   - Annual tests.
   - **TLPT** (Threat-Led Penetration Testing) every 3 years for "significant" institutions. **TIBER-EU guidelines**.
4. **Third-party risk** (Art. 28-44): register of ICT contracts with CSPs, contracts must-have clauses, mandatory register + communication to authorities.
5. **Information sharing** (Art. 45): encouragement of sharing among entities.

### Authorities

- **ECB** + national authorities (Banca d'Italia, Consob).
- For designated **Critical Third-Party Providers (CTPP)**: direct oversight by European authorities.

### References

- Regulation: [EUR-Lex 32022R2554](https://eur-lex.europa.eu/eli/reg/2022/2554).
- RTS (Regulatory Technical Standards) ESMA/EBA/EIOPA published 2023-2024.
- Banca d'Italia [DORA page](https://www.bancaditalia.it).

## AI Act — Regulation (EU) 2024/1689

Entered into force 1 August 2024. Progressive application until 2027.

### Risk-based approach

AI systems classified by risk:
- **Unacceptable** — prohibited (China-style social scoring, real-time biometric remote in public places with limited exceptions, manipulative AI).
- **High-risk** — strict obligations (Annex III): biometric ID, critical infra, education, employment, access to essential services, law enforcement, migration, justice, democratic processes.
- **Limited risk** — transparency (chatbot must declare it's AI).
- **Minimal risk** — no obligations.

### High-risk obligations

- Risk management system.
- Data governance (training set quality).
- Technical documentation.
- Record-keeping.
- Transparency and info to users.
- Human oversight.
- Accuracy, robustness, cybersecurity.

### GPAI (General-Purpose AI Models)

For foundation models (LLMs): transparency, info on training, copyright, technical docs. **Systemic risk** (>10^25 FLOPS training, or Commission decision): additional obligations (red teaming, incident reporting).

### Sanctions

Up to **€35M or 7% global turnover** (for prohibited practices).

### Reference

- Text: [EUR-Lex 32024R1689](https://eur-lex.europa.eu/eli/reg/2024/1689).
- Commission page: [digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence](https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence).

## Cyber Resilience Act (CRA) — Regulation (EU) 2024/2847

Entered into force December 2024, full application end of 2027.

### What it does

Requires anyone selling products **with digital elements** in the EU to:
- Ensure security by design.
- Publish updates for the "support" period (default 5 years).
- Notify actively exploited vulnerabilities within 24h, incidents within 72h.
- Technical documentation + declaration of conformity + CE marking.

Applies to almost all IT/IoT sold in the EU.

## Cybersecurity Act (EU) 2019/881 + EUCC scheme

The Cybersecurity Act established **ENISA** and the European **certification schemes**:
- **EUCC** (European Common Criteria-based) — based on CC.
- **EUCS** (Cloud Services) — under development.
- **5G** — under development.

Voluntary certification but relevant for public procurement.

## ePrivacy Directive (awaiting Regulation)

Directive 2002/58/EC (ePrivacy) regulates cookies + electronic communications. Italy: Legislative Decree 196/2003 + Garante rulings (cookie banner: June 2021 guidelines).

ePrivacy Regulation has been stalled since 2017, it should replace the directive.

## IT Privacy Code — Legislative Decree 196/2003

Coordinated with GDPR via Legislative Decree 101/2018. Key parts:
- Articles 154-bis (additional administrative sanctions).
- Minimum security measures (replaced by Art. 32 GDPR).
- Processing by public authorities.

## National strategies

- **National cybersecurity strategy 2022-2026** — published by ACN.
- **National cyber security perimeter** (PSNC) — DPCM 2020, covers essential services.

## Technical standards (not laws but close)

- **ISO/IEC 27001:2022** — certifiable ISMS.
- **ISO/IEC 27002:2022** — controls guide.
- **ISO/IEC 27017** — cloud services.
- **ISO/IEC 27018** — cloud processor privacy.
- **ISO/IEC 27701** — privacy info management.
- **NIST CSF 2.0** (Feb 2024) — US strategic framework but used globally.
- **NIST SP 800-53 Rev. 5** — US federal controls catalog.
- **NIST SP 800-171** — controlled unclassified info (for US gov contractors).
- **CIS Controls v8.1** — Center for Internet Security.
- **CIS Benchmarks** — config baseline for specific OS/apps.
- **OWASP ASVS 4.0.3** — web app verification standard.
- **OWASP MASVS 2.x** — mobile.
- **OWASP SAMM 2.0** — maturity model.
- **PCI-DSS 4.0** — Payment Card Industry.

## Specific sectors

### Healthcare

- **GDPR Art. 9** (health data).
- **Legislative Decree 196/2003 Art. 75-bis** — health data.
- **FSE 2.0** (Fascicolo Sanitario Elettronico, Italian electronic health record) — DPCM 2022.

### Finance

- **DORA**.
- **Banca d'Italia Circular 285** (for banks, chapter 4: ICT).
- **PCI-DSS 4.0** for cards.
- **AnaCredit, EBA Guidelines**.
- **MiFID II / MAR** for trading.

### Telecommunications

- **Electronic Communications Code** (Legislative Decree 259/2003 + 207/2021).
- **AGCom** authority.

### Public Administration

- **CAD** (Codice dell'Amministrazione Digitale, Italian Digital Administration Code, Legislative Decree 82/2005).
- **AgID** security guidelines (e.g. minimum ICT measures for PA).
- **National Sovereign Cloud**.

## Where to read "the sources"

| What | Where |
|---|---|
| Italian laws | [normattiva.it](https://www.normattiva.it) |
| Official Gazette | [gazzettaufficiale.it](https://www.gazzettaufficiale.it) |
| Garante rulings | [garanteprivacy.it](https://www.garanteprivacy.it) |
| EU Regulations/Directives | [eur-lex.europa.eu](https://eur-lex.europa.eu) |
| ENISA | [enisa.europa.eu](https://www.enisa.europa.eu) |
| ACN | [acn.gov.it](https://www.acn.gov.it) |
| AgID guidelines | [agid.gov.it](https://www.agid.gov.it) |

## Exercises

### Ex 31.1 — Identify your perimeter
For your company (or a hypothetical one):
- Is it "essential" or "important" under NIS2?
- Does it process personal data → GDPR.
- Sector? (finance → DORA; healthcare → 9; PA → CAD; ...).
- Sells digital products → CRA.

Which laws/standards are **binding** for them?

### Ex 31.2 — Read & summarize
Pick one of:
- GDPR Art. 32 — summarize in 10 lines the required security measures.
- NIS2 Art. 21 (risk management measures) — checklist of the 10 areas.
- DORA Art. 17-19 (incident management) — notification timeline flow.

### Ex 31.3 — Sanction case study
Read a significant published GDPR sanction (e.g. WhatsApp Ireland €225M, Amazon Luxembourg €746M). Identify:
- Article violated.
- Conduct disputed.
- Amount + criterion (% turnover or flat).

### Ex 31.4 — Framework comparison
Download NIST CSF 2.0 + ISO 27001:2022 Annex A. For each CSF category, map to ISO controls. See where there's a 1-to-1 and where there's a gap.

### Ex 31.5 — Look up an ACN sanction case for NIS
ACN began enforcement activities in 2024-2025. Look up recent publications. Which sectors were sanctioned most?

## Closing notes

**Regulations change**. Every 12 months revisit this section (and the latest version of the [ACN site](https://www.acn.gov.it), [EUR-Lex](https://eur-lex.europa.eu) news).

None of this is a substitute for qualified legal counsel in real cases. **But knowing WHAT to talk about** is the prerequisite for bringing them on board at the right moment.
