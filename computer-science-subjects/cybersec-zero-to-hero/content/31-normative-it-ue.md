---
title: "Riferimenti normativi IT/UE in dettaglio"
area: "Reference"
order: 31
level: "intermedio"
summary: "Quali leggi e regolamenti effettivamente leggere: GDPR articoli rilevanti, codice penale italiano per security, NIS2 (D.Lgs. 138/2024), DORA articoli operativi, AI Act, EUCC. Con citazioni e link ai testi ufficiali."
prereq:
  - "Sezione 25"
tools:
  - "EUR-Lex (testi UE)"
  - "Normattiva.it (testi IT)"
  - "Gazzetta Ufficiale"
---

# Riferimenti normativi IT/UE in dettaglio

> Non sono consulenza legale. Sono le **fonti reali** che usi se vuoi capire/citare nei tuoi report o nei contratti.

## Codice Penale Italiano — articoli rilevanti

Testo consolidato: [Normattiva](https://www.normattiva.it) (ricerca "Codice Penale", articoli numerati).

### Art. 615-ter — Accesso abusivo a sistema informatico o telematico

> *Chiunque abusivamente si introduce in un sistema informatico o telematico protetto da misure di sicurezza ovvero vi si mantiene contro la volontà espressa o tacita di chi ha il diritto di escluderlo, è punito con la reclusione fino a tre anni.*

Aggravanti (reclusione 2-10 anni):
- Sistema di interesse militare/sicurezza/sanità/protezione civile.
- Pubblico ufficiale o incaricato di pubblico servizio (con abuso poteri).
- Violenza/minaccia.
- Danneggiamento sistema/dati.

**Importante:** "protetto da misure di sicurezza" = anche una password debole conta come "misura". L'accesso senza autorizzazione esplicita è reato anche se non rubi nulla.

### Art. 615-quater — Detenzione e diffusione abusiva di codici di accesso

Riguarda password, chiavi, token. Pena: fino a 1 anno.

### Art. 615-quinquies — Detenzione e diffusione di apparecchiature/programmi per danneggiare o accedere

Modificato 2023 (D.Lgs. 184/2023). Riguarda **tool e malware**. La giurisprudenza distingue uso e intento — un ricercatore con tool offensivi non è automaticamente perseguibile se l'attività è di security research lecita.

### Art. 617-quater / 617-quinquies / 617-sexies

Intercettazione, impedimento, falsificazione di comunicazioni informatiche.

### Art. 635-bis / -ter / -quater / -quinquies

Danneggiamento informatico (dati / programmi / sistemi pubblici).

### Art. 640-ter — Frode informatica

Alterazione di sistema per profitto. Pena 6 mesi – 3 anni (aggravata 1-5 anni).

### Art. 612-ter — Diffusione illecita di immagini/video sessualmente espliciti

"Revenge porn". Pena 1-6 anni.

### Riforma 2023 (D.Lgs. 184/2023)

Recepisce direttiva (UE) 2019/713 (frodi mezzi di pagamento non in contanti) e modifica diversi articoli.

## GDPR — Regolamento (UE) 2016/679

Testo: [EUR-Lex - 32016R0679](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

### Articoli che il security engineer DEVE conoscere

- **Art. 5** — Principi (liceità, minimizzazione, integrità e riservatezza, accountability).
- **Art. 6** — Basi giuridiche del trattamento (consenso, contratto, obbligo legale, interesse vitale, pubblico interesse, legittimo interesse).
- **Art. 9** — Categorie particolari di dati (sanitari, biometrici, ...). Trattamento normalmente vietato.
- **Art. 25** — Privacy by design and by default.
- **Art. 28** — Responsabile del trattamento (data processor). Necessario DPA scritto.
- **Art. 32** — **Sicurezza del trattamento.** Misure tecniche e organizzative adeguate al rischio:
  - pseudonimizzazione e cifratura;
  - capacità di garantire continuità, integrità, disponibilità;
  - capacità di ripristinare in caso di incidente;
  - procedura di test e valutazione regolare delle misure.
- **Art. 33** — **Notifica violazione al Garante entro 72 ore** dalla conoscenza, salvo che la violazione sia "improbabile presentare rischio".
- **Art. 34** — Notifica agli interessati se rischio elevato.
- **Art. 35** — DPIA per trattamenti ad alto rischio.
- **Art. 37-39** — DPO: obbligatorio per autorità pubbliche, trattamenti su larga scala, dati particolari.
- **Art. 44-49** — Trasferimenti extra-UE. Cf. Schrems II + clausole contrattuali tipo (SCC) + adequacy decision (US Data Privacy Framework 2023).
- **Art. 83** — Sanzioni: fino a **20M € o 4% fatturato globale** (greater of).
- **Art. 84** — Sanzioni penali nazionali (Italia: D.Lgs. 196/2003 + 101/2018).

### Garante Privacy Italia

Autorità: garanteprivacy.it. Pubblica provvedimenti, FAQ, [linee guida](https://www.garanteprivacy.it). Decisioni dei provvedimenti più recenti utili da leggere per casi reali (es. ChatGPT 2023, Replika 2023, OneCoin, …).

## NIS2 — D.Lgs. 138/2024 in IT

Direttiva (UE) 2022/2555. Recepita IT con D.Lgs. 4 settembre 2024, n. 138. Entrata in vigore 16 ottobre 2024. **Applicabile.**

### Cosa cambia rispetto NIS1

- **Più settori** (Annex I + II): da 5 a 18. "Essential" (energia, trasporti, sanità, finanza, infra digitale, banche, drinking water, waste water, ICT manage, govt, ricerca) vs "Important" (postal, waste, chemical, food, manufacturing, ICT product, scientific research, digital provider). Anche **mid-cap** e alcune medie imprese.
- **Self-identification**: l'azienda deve registrarsi al portale ACN se rientra. Niente più lista negoziata.
- **Obblighi più stringenti** (Art. 21):
  - Risk analysis.
  - Incident handling.
  - Business continuity / disaster recovery.
  - Supply chain security.
  - Sicurezza nello sviluppo + acquisizione + manutenzione.
  - Politiche e procedure crypto.
  - Personale (training, security HR).
  - Accesso physical, e logical access (es. MFA mandatory).
  - Sicurezza endpoint, network, communications.
- **Reporting**:
  - Early warning entro **24h** dalla conoscenza.
  - Notifica detailed entro **72h**.
  - Final report entro **1 mese**.
- **Sanzioni**:
  - Essential: max(10M €, 2% turnover globale).
  - Important: max(7M €, 1.4% turnover).
- **Responsabilità management**: il board è responsabile, può essere personalmente sanzionato.

### Riferimenti ufficiali

- Testo: [Gazzetta Ufficiale Serie Generale n. 230 del 1.10.2024 — D.Lgs. 138/2024](https://www.gazzettaufficiale.it/eli/id/2024/10/01/24G00159/sg).
- Portale ACN: [acn.gov.it](https://www.acn.gov.it) → portale registrazione + linee guida.
- Direttiva NIS2 UE: [EUR-Lex 32022L2555](https://eur-lex.europa.eu/eli/dir/2022/2555).

## DORA — Regolamento (UE) 2022/2554

**Settore finanziario** UE. Entrato in piena applicazione **17 gennaio 2025**.

### Cosa copre

Pillars:
1. **ICT risk management** (Art. 5-16): framework, board responsibility, asset inventory, policy.
2. **ICT incident management** (Art. 17-23): classificazione (major / significant), notifica entro tempi specifici, processo end-to-end.
3. **Digital operational resilience testing** (Art. 24-27):
   - Test annuali.
   - **TLPT** (Threat-Led Penetration Testing) ogni 3 anni per "significant" institutions. **Linee guida TIBER-EU**.
4. **Third-party risk** (Art. 28-44): registro dei contratti ICT con CSP, contracts must-have clauses, register obbligatorio + comunicazione autorità.
5. **Information sharing** (Art. 45): incoraggiamento condivisione tra entità.

### Autorità

- **ECB** + autorità nazionali (Banca d'Italia, Consob).
- Per **Critical Third-Party Providers (CTPP)** designati: oversight diretto autorità europee.

### Riferimenti

- Regolamento: [EUR-Lex 32022R2554](https://eur-lex.europa.eu/eli/reg/2022/2554).
- RTS (Regulatory Technical Standards) ESMA/EBA/EIOPA pubblicate 2023-2024.
- Banca d'Italia [pagina DORA](https://www.bancaditalia.it).

## AI Act — Regolamento (UE) 2024/1689

Entrato in vigore 1 agosto 2024. Applicazione progressiva fino 2027.

### Approccio risk-based

Sistemi AI classificati per rischio:
- **Unacceptable** — vietato (social scoring tipo Cina, real-time biometric remote in luoghi pubblici limited eccezioni, manipulative AI).
- **High-risk** — obblighi stringenti (Annex III): biometric ID, critical infra, educazione, employment, accesso ai servizi essenziali, law enforcement, migrazione, justice, processi democratici.
- **Limited risk** — trasparenza (chatbot deve dire che è AI).
- **Minimal risk** — nessun obbligo.

### Obblighi per High-risk

- Risk management system.
- Data governance (training set quality).
- Technical documentation.
- Record-keeping.
- Trasparenza e info ai utenti.
- Human oversight.
- Accuratezza, robustezza, cybersecurity.

### GPAI (General-Purpose AI Models)

Per modelli base (LLM): trasparenza, info su training, copyright, technical docs. **Systemic risk** (>10^25 FLOPS training, o decisione Commissione): obblighi aggiuntivi (red teaming, incident reporting).

### Sanzioni

Fino a **35M € o 7% turnover globale** (per pratiche vietate).

### Riferimento

- Testo: [EUR-Lex 32024R1689](https://eur-lex.europa.eu/eli/reg/2024/1689).
- Pagina Commissione: [digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence](https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence).

## Cyber Resilience Act (CRA) — Regolamento (UE) 2024/2847

Entrata in vigore dicembre 2024, applicazione completa fine 2027.

### Cosa fa

Richiede a chi vende prodotti **con elementi digitali** nell'UE di:
- Garantire sicurezza by-design.
- Pubblicare aggiornamenti per il periodo "support" (default 5 anni).
- Notificare vulnerabilità sfruttate attivamente entro 24h, incidenti entro 72h.
- Documentazione tecnica + dichiarazione di conformità + marcatura CE.

Si applica a quasi tutto l'IT/IoT venduto in UE.

## Cybersecurity Act (UE) 2019/881 + EUCC scheme

Cybersecurity Act ha istituito **ENISA** e i schemi di **certificazione europei**:
- **EUCC** (European Common Criteria-based) — basato su CC.
- **EUCS** (Cloud Services) — in lavorazione.
- **5G** — in lavorazione.

Certificazione volontaria ma rilevante per appalti pubblici.

## ePrivacy Directive (in attesa di Regolamento)

Direttiva 2002/58/CE (e-Privacy) regola cookie + comunicazioni elettroniche. Italia: D.Lgs. 196/2003 + provvedimenti Garante (cookie banner: linee guida giugno 2021).

Regolamento ePrivacy in stallo dal 2017, dovrebbe sostituire direttiva.

## Codice della Privacy IT — D.Lgs. 196/2003

Coordinato con GDPR via D.Lgs. 101/2018. Parti chiave:
- Articoli 154-bis (sanzioni amministrative aggiuntive).
- Misure minime di sicurezza (sostituite da Art. 32 GDPR).
- Trattamento da parte di autorità pubbliche.

## Strategie nazionali

- **Strategia nazionale di cybersicurezza 2022-2026** — pubblicata ACN.
- **Perimetro nazionale di sicurezza cibernetica** (PSNC) — DPCM 2020, riguarda servizi essenziali.

## Standard tecnici (non leggi ma quasi)

- **ISO/IEC 27001:2022** — ISMS certificabile.
- **ISO/IEC 27002:2022** — guida controlli.
- **ISO/IEC 27017** — cloud services.
- **ISO/IEC 27018** — privacy cloud processor.
- **ISO/IEC 27701** — privacy info management.
- **NIST CSF 2.0** (Feb 2024) — framework strategico US ma usato globalmente.
- **NIST SP 800-53 Rev. 5** — catalogo controlli federali US.
- **NIST SP 800-171** — controlled unclassified info (per US gov contractor).
- **CIS Controls v8.1** — Center for Internet Security.
- **CIS Benchmarks** — config baseline per OS/app specifici.
- **OWASP ASVS 4.0.3** — verification standard web app.
- **OWASP MASVS 2.x** — mobile.
- **OWASP SAMM 2.0** — maturity model.
- **PCI-DSS 4.0** — Payment Card Industry.

## Settori specifici

### Sanità

- **GDPR Art. 9** (dati sanitari).
- **D.Lgs. 196/2003 Art. 75-bis** — dati sanitari.
- **FSE 2.0** (Fascicolo Sanitario Elettronico) — DPCM 2022.

### Finanza

- **DORA**.
- **Banca d'Italia Circolare 285** (per banche, capitolo 4: ICT).
- **PCI-DSS 4.0** per carte.
- **AnaCredit, EBA Guidelines**.
- **MiFID II / MAR** per trading.

### Telecomunicazioni

- **Codice delle Comunicazioni Elettroniche** (D.Lgs. 259/2003 + 207/2021).
- **AGCom** authority.

### PA

- **CAD** (Codice dell'Amministrazione Digitale, D.Lgs. 82/2005).
- **AgID** linee guida sicurezza (es. misure minime ICT per PA).
- **Cloud Sovrano Nazionale**.

## Dove leggere "le fonti"

| Cosa | Dove |
|---|---|
| Leggi italiane | [normattiva.it](https://www.normattiva.it) |
| Gazzetta Ufficiale | [gazzettaufficiale.it](https://www.gazzettaufficiale.it) |
| Provvedimenti Garante | [garanteprivacy.it](https://www.garanteprivacy.it) |
| Regolamenti/Direttive UE | [eur-lex.europa.eu](https://eur-lex.europa.eu) |
| ENISA | [enisa.europa.eu](https://www.enisa.europa.eu) |
| ACN | [acn.gov.it](https://www.acn.gov.it) |
| Linee guida AgID | [agid.gov.it](https://www.agid.gov.it) |

## Esercizi

### Es 31.1 — Identifica il tuo perimetro
Per la tua azienda (o ipotetica):
- È "essential" o "important" sotto NIS2?
- Tratta dati personali → GDPR.
- Settore? (finanza → DORA; sanità → 9; PA → CAD; ...).
- Vende prodotti digitali → CRA.

Quali leggi/standard sono **vincolanti** per loro?

### Es 31.2 — Read & summarize
Pick uno tra:
- Art. 32 GDPR — riassumi in 10 righe le misure di sicurezza richieste.
- NIS2 Art. 21 (misure di gestione del rischio) — checklist dei 10 ambiti.
- DORA Art. 17-19 (gestione incident) — flusso temporale di notifica.

### Es 31.3 — Sanzione case study
Leggi una sanzione GDPR significativa pubblicata (es. WhatsApp Ireland 225M €, Amazon Luxembourg 746M €). Identifica:
- Articolo violato.
- Comportamento contestato.
- Importo + criterio (% turnover o flat).

### Es 31.4 — Confronto framework
Scarica NIST CSF 2.0 + ISO 27001:2022 Annex A. Per ogni categoria CSF, mappa a controlli ISO. Vedi dove c'è 1-to-1 e dove c'è gap.

### Es 31.5 — Cerca un caso di sanzione ACN per NIS
ACN ha iniziato attività enforcement nel 2024-2025. Cerca pubblicazioni recenti. Quali settori sono stati più sanzionati?

## Note di chiusura

Le **normative cambiano**. Ogni 12 mesi rivisita questa sezione (e l'ultima versione del [sito ACN](https://www.acn.gov.it), [EUR-Lex](https://eur-lex.europa.eu) news).

Niente di tutto questo è alternativa a un legale qualificato per casi reali. **Ma sapere DI cosa parlare** è il prerequisito per portarli a bordo nel momento giusto.
