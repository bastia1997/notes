---
title: "Threat intelligence"
area: "Blue team"
order: 24
level: "avanzato"
summary: "CTI lifecycle, livelli (strategic/operational/tactical/technical). IoC / IoA / TTP. Pyramid of Pain, Diamond Model, Kill Chain, ATT&CK. Attribution (con cautela). MISP, STIX/TAXII, OpenCTI, MITRE D3FEND."
prereq:
  - "Sezione 16, 23"
tools:
  - "MISP"
  - "OpenCTI"
  - "STIX 2 / TAXII 2"
  - "MITRE ATT&CK Navigator"
  - "Maltego (graph analysis)"
---

# Threat intelligence

> **Information** ≠ **intelligence**. Information = "questo hash è malevolo". Intelligence = "questo gruppo bersaglia il nostro settore con questo TTP per questo motivo, ecco cosa ti consiglio di fare". Il salto dal primo al secondo richiede analisi.

## CTI lifecycle (modello classico)

1. **Planning & Direction** — quali domande deve rispondere?
2. **Collection** — log interni, feed pubblici, fonti chiuse.
3. **Processing** — normalizzazione, dedup, parsing.
4. **Analysis** — what does it mean? bias, ipotesi alternative.
5. **Dissemination** — al pubblico giusto, formato giusto.
6. **Feedback** — il prodotto ha risposto?

Iterativo, non lineare.

## Livelli di CTI

| Livello | Audience | Esempi |
|---|---|---|
| **Strategic** | C-suite, board | "Settore finanziario IT subirà aumento attacchi Conti-affiliate Q2" |
| **Operational** | SOC manager, IR lead | "Campagna Qakbot via OneNote in EU, TTP X, Y, Z" |
| **Tactical** | SOC L2/L3 | "TTP specifico: usa rundll32 con file LNK passato da..." |
| **Technical** | SOC L1, detection eng | "IOC: hash, IP, domain, regkey" |

## IoC, IoA, TTP — la Pyramid of Pain

David Bianco (2013).

<figure class="diagram">
<svg viewBox="0 0 480 360" width="480" height="360" xmlns="http://www.w3.org/2000/svg">
  <style>
    .lbl { font-family: 'JetBrains Mono', monospace; font-size: 13px; fill: #0b0f10; font-weight: 700; }
    .lbl-light { font-family: 'JetBrains Mono', monospace; font-size: 13px; fill: #e8eef0; font-weight: 700; }
    .side { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: #8a9499; }
  </style>
  <!-- 6 layer trapezoidal pyramid -->
  <polygon points="180,30 300,30 320,80 160,80" fill="#ff4d4d"/>
  <text x="240" y="60" class="lbl" text-anchor="middle">TTPs</text>
  <polygon points="160,80 320,80 340,130 140,130" fill="#ff8a3a"/>
  <text x="240" y="110" class="lbl" text-anchor="middle">Tools</text>
  <polygon points="140,130 340,130 360,180 120,180" fill="#ffe066"/>
  <text x="240" y="160" class="lbl" text-anchor="middle">Network / Host Artifacts</text>
  <polygon points="120,180 360,180 380,230 100,230" fill="#00e6ff"/>
  <text x="240" y="210" class="lbl" text-anchor="middle">Domain Names</text>
  <polygon points="100,230 380,230 400,280 80,280" fill="#00b86e"/>
  <text x="240" y="260" class="lbl" text-anchor="middle">IP Addresses</text>
  <polygon points="80,280 400,280 420,330 60,330" fill="#243035"/>
  <text x="240" y="310" class="lbl-light" text-anchor="middle">Hash Values</text>
  <!-- side arrows -->
  <text x="450" y="55" class="side">duro da</text>
  <text x="450" y="70" class="side">cambiare</text>
  <text x="450" y="320" class="side">facile da</text>
  <text x="450" y="335" class="side">cambiare</text>
  <line x1="440" y1="80" x2="440" y2="305" stroke="#00ff9c" stroke-width="2" marker-end="url(#down)"/>
  <defs>
    <marker id="down" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#00ff9c"/>
    </marker>
  </defs>
</svg>
<figcaption>Pyramid of Pain — costo per l'attaccante di cambiare ciascuna categoria</figcaption>
</figure>

- **Hash** è facile da cambiare per l'attaccante (ricompila, repack).
- **IP / domain** un po' meno (richiede infra nuova).
- **TTP** è doloroso: cambiare modus operandi richiede settimane di sviluppo nuovo.

**Detection migliore = focalizzata su TTP**, non su hash.

## Modelli analitici

### Cyber Kill Chain (Lockheed Martin)
1. Recon
2. Weaponization
3. Delivery
4. Exploitation
5. Installation
6. Command & Control
7. Actions on Objectives

Datata (molti attacchi moderni saltano step, sono cloud-based) ma utile come check-list.

### Diamond Model of Intrusion Analysis
Ogni evento ha 4 vertici:
- **Adversary** (who).
- **Capability** (how).
- **Infrastructure** (from where).
- **Victim** (against whom).

Più meta: socio-political, technology.

Utile per **pivoting analitico**: dato uno, espandi.

### MITRE ATT&CK
Già visto. **Lingua franca**. ATT&CK Enterprise + Mobile + ICS + Cloud + Container.

### MITRE D3FEND
Controparte difensiva: tassonomia di **countermeasure** mappate a ATT&CK.

### Unified Cyber Kill Chain (Pols 2017)
18 fasi che combinano Lockheed + ATT&CK. Più dettagliato.

### Pyramid of pain (vedi sopra).

### Common Vulnerability Scoring System (CVSS)
Score 0–10. Componenti: Attack Vector, Complexity, Privileges Required, User Interaction, Scope, Confidentiality, Integrity, Availability. **NON** è priority. Combinato con KEV (Known Exploited) CISA e EPSS (Exploit Prediction Scoring System) → prioritizzazione patch.

## Standards di scambio

### STIX 2.1
Structured Threat Information eXpression. JSON-LD per descrivere CTI:
- **SDOs** (Domain Objects): Indicator, Malware, Attack Pattern, Threat Actor, Campaign, Intrusion Set, Tool, Vulnerability.
- **SROs** (Relationship Objects): `(attack-pattern) -- uses --> (malware)`.
- **SCOs** (Cyber Observable): file, ipv4-addr, url, email-message.

```json
{
  "type": "indicator",
  "spec_version": "2.1",
  "id": "indicator--...",
  "created": "...",
  "pattern": "[file:hashes.MD5 = '...']",
  "labels": ["malicious-activity"]
}
```

### TAXII 2.1
Protocollo HTTP/REST per scambiare STIX. Server pubblici/privati.

### Altri
- **OpenIOC** (Mandiant).
- **CybOX** (integrato in STIX 2).
- **IODEF** (incident report).
- **MISP format** (intermedio, semplice).

## MISP — Malware Information Sharing Platform

Piattaforma open source per gestire IoC + relations + condividere con community/peer.

Concetti:
- **Event**: container di IoC + meta.
- **Attributes**: i singoli IoC (hash, IP, ...).
- **Galaxy / Cluster**: tag tassonomici (es. "threat-actor:APT29").
- **Sharing groups**: chi vede.

Connettori:
- ISAC settoriali (FS-ISAC finanza, H-ISAC healthcare, ...).
- Comunità (CIRCL Lussemburgo, ENISA EU CSIRT, ABUSE.ch).

## OpenCTI

Più moderno (Filigran). Grafo Neo4j + GraphQL. Connector con MISP, TAXII, vendor feeds, MITRE ATT&CK.

## Feed pubblici (per iniziare)

| Feed | Cosa |
|---|---|
| **AlienVault OTX** | community IoC |
| **Abuse.ch** (URLhaus, MalwareBazaar, ThreatFox, FeodoTracker) | gratuitamente eccellenti |
| **MISP communities** | settoriali |
| **CISA KEV** | vuln sfruttate in the wild |
| **NVD / EUVD / GHSA** | CVE database |
| **Microsoft Defender TI** | gratuito limited |
| **VirusTotal Intelligence** | commerciale per ricerca avanzata |
| **GreyNoise** | classifica IP "noise" internet vs targeted |
| **Shodan** | exposure |
| **CertStream** | live CT log feed |

## Attribution — la parte controversa

Stabilire "chi" ha fatto un attacco è notoriamente difficile e politico.

- **Hard evidence**: chiavi di firma riusate, debug PDB path, language identifier, infrastruttura unica.
- **Soft evidence**: TTP-match a un gruppo noto (può essere imitato!), timezone delle compilazioni.
- **False flag**: gli attaccanti deliberatamente piazzano evidenze fuorvianti (Lazarus che scrive in russo, Sandworm con stringhe in mandarino).

**Attribution è raramente "fact"**. È valutazione di confidenza ("high confidence", "moderate", "low").

Convenzioni di naming:
- **Mandiant** APT1, APT28 (Fancy Bear), APT29 (Cozy Bear), APT38, APT41, ...
- **CrowdStrike** zoo: Fancy Bear (RU), Cozy Bear (RU), Voodoo Bear, Cobalt Spider, Wicked Panda (CN), Stardust Chollima (NK).
- **Microsoft** dal 2023: weather names. Midnight Blizzard (APT29), Forest Blizzard (APT28), Volt Typhoon (CN, US infra), Plaid Rain.
- **Google/Mandiant** UNC#### per unclustered.

Stesso gruppo, nomi diversi. Cross-reference su Wikipedia/CrowdSec/Mitre Groups.

## ASA / Adversary Simulation vs Emulation

- **Simulation**: replica generica di attaccanti (Caldera, BRAT, Atomic Red Team).
- **Emulation**: replica fedele di **un** specifico gruppo (es. emulate APT29 step-by-step per testare detection).

MITRE pubblica **Adversary Emulation Plans** open source (https://github.com/center-for-threat-informed-defense). 

## Esempi di prodotti CTI

Quale form prendono i deliverable?

1. **Daily SOC briefing**: 1 pagina, top threats, advisory CISA, vendor advisories.
2. **Weekly trend report**: campagne attive, settore-specifico.
3. **Quarterly strategic report**: 30–50 pagine, executive.
4. **Flash advisory**: "Domani patch CVE-X immediatamente perché Y".
5. **TTP technical analysis**: 5–15 pagine, focus rilevante per detection engineering.
6. **IoC list strutturata** (STIX bundle) automatico in SIEM.

## Pivoting tipico in CTI

Da un IOC singolo → conoscenza estesa:

1. Hash sample → MalwareBazaar tag → famiglia (es. Pikabot).
2. Famiglia → write-up vendor → TTP pattern.
3. TTP → MITRE attack pattern → altri famiglia che condivide.
4. Infrastructure (C2 domain) → passive DNS storia → IP correlati.
5. IP / netblock → owner (ASN) → altri host nel range.
6. SSL cert serial / JARM fingerprint → altri server con stesso pattern.
7. WhoIs registrar → email → altri domini registrati.

Tool: **VirusTotal**, **DomainTools**, **PassiveTotal/RiskIQ**, **Maltego**, **Censys**, **Shodan**, **SecurityTrails**, **DNSDB Farsight**.

## Esercizi

### Esercizio 24.1 — MISP locale
Installa MISP (docker o appliance). Crea un event con IOC inventato. Esporta in STIX. Importa in altro MISP / OpenCTI.

### Esercizio 24.2 — STIX bundle
Scrivi un STIX 2.1 bundle JSON che descriva:
- Una `Threat Actor` ("ToyActor").
- Un `Malware` ("ToyRAT") che il actor `uses`.
- Un `Indicator` con pattern di hash file che `indicates` ToyRAT.

Valida con [STIX Validator](https://github.com/oasis-open/cti-stix-validator).

### Esercizio 24.3 — ATT&CK Navigator
Mappa la coverage delle tue regole detection. Quale tactic è scoperta? Aggiungi una rule per coprire.

### Esercizio 24.4 — Vendor write-up reading
Scegli un advisory recente di Mandiant/CrowdStrike/Microsoft Defender TI. Estrai IoCs, TTPs (mapping ATT&CK), capability. Riscrivi in 1-page briefing operativo per L2.

### Esercizio 24.5 — Pivot challenge
Dato un IoC singolo (hash MD5 di MalwareBazaar):
- Cerca su VirusTotal, MalwareBazaar, OTX.
- Famiglia? TTP? C2 noti?
- Pivot a infrastructure (domain → passive DNS).
- Mappa MITRE.

Tempo limite 1 ora. Quanto sei arrivato lontano?

### Esercizio 24.6 — TryHackMe rooms
- "**Threat Intelligence Tools**".
- "**Cyber Threat Intelligence**" path.
- "**Yara**" room.

### Esercizio 24.7 — Attribution skepticism
Leggi "F3EAD" del DoD, leggi un report di attribution famoso (es. Mandiant APT1, 2013). Identifica:
- Quali evidenze sono "hard" (riusato infrastruttura).
- Quali "soft" (TTP somiglianza).
- Confidence claim. Plausibile? Su quale base?

## Concetti chiave

1. **CTI = analisi + contesto, non solo IoC**.
2. **Pyramid of Pain**: detection su TTP > su hash.
3. **Diamond Model, Kill Chain, ATT&CK**: ciascuno utile per scopi diversi.
4. **STIX/TAXII** = scambio strutturato.
5. **MISP** è la base community gratuita.
6. **Attribution = confidence statement**, non fatto.
7. **Adversary Emulation > generic simulation** per testare detection contro specifici minaccia.

Avanti: GRC e normativa.
