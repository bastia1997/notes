---
title: "Threat intelligence"
area: "Blue team"
order: 24
level: "advanced"
summary: "CTI lifecycle, levels (strategic/operational/tactical/technical). IoC / IoA / TTP. Pyramid of Pain, Diamond Model, Kill Chain, ATT&CK. Attribution (with caution). MISP, STIX/TAXII, OpenCTI, MITRE D3FEND."
prereq:
  - "Section 16, 23"
tools:
  - "MISP"
  - "OpenCTI"
  - "STIX 2 / TAXII 2"
  - "MITRE ATT&CK Navigator"
  - "Maltego (graph analysis)"
---

# Threat intelligence

> **Information** ≠ **intelligence**. Information = "this hash is malicious". Intelligence = "this group targets our sector with this TTP for this reason, here's what I recommend you do". The leap from the first to the second requires analysis.

## CTI lifecycle (classic model)

1. **Planning & Direction** — which questions should it answer?
2. **Collection** — internal logs, public feeds, closed sources.
3. **Processing** — normalization, dedup, parsing.
4. **Analysis** — what does it mean? bias, alternative hypotheses.
5. **Dissemination** — to the right audience, in the right format.
6. **Feedback** — did the product answer the question?

Iterative, not linear.

## CTI levels

| Level | Audience | Examples |
|---|---|---|
| **Strategic** | C-suite, board | "IT financial sector will face an increase in Conti-affiliate attacks in Q2" |
| **Operational** | SOC manager, IR lead | "Qakbot campaign via OneNote in EU, TTPs X, Y, Z" |
| **Tactical** | SOC L2/L3 | "Specific TTP: uses rundll32 with LNK file passed by..." |
| **Technical** | SOC L1, detection eng | "IOC: hash, IP, domain, regkey" |

## IoC, IoA, TTP — the Pyramid of Pain

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
  <text x="450" y="55" class="side">hard to</text>
  <text x="450" y="70" class="side">change</text>
  <text x="450" y="320" class="side">easy to</text>
  <text x="450" y="335" class="side">change</text>
  <line x1="440" y1="80" x2="440" y2="305" stroke="#00ff9c" stroke-width="2" marker-end="url(#down)"/>
  <defs>
    <marker id="down" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#00ff9c"/>
    </marker>
  </defs>
</svg>
<figcaption>Pyramid of Pain — cost to the attacker of changing each category</figcaption>
</figure>

- **Hash** is easy for the attacker to change (recompile, repack).
- **IP / domain** is a bit harder (requires new infra).
- **TTP** is painful: changing modus operandi requires weeks of fresh development.

**Better detection = focused on TTPs**, not on hashes.

## Analytical models

### Cyber Kill Chain (Lockheed Martin)
1. Recon
2. Weaponization
3. Delivery
4. Exploitation
5. Installation
6. Command & Control
7. Actions on Objectives

Dated (many modern attacks skip steps, are cloud-based) but useful as a checklist.

### Diamond Model of Intrusion Analysis
Every event has 4 vertices:
- **Adversary** (who).
- **Capability** (how).
- **Infrastructure** (from where).
- **Victim** (against whom).

Plus meta: socio-political, technology.

Useful for **analytical pivoting**: given one, expand.

### MITRE ATT&CK
Already seen. **Lingua franca**. ATT&CK Enterprise + Mobile + ICS + Cloud + Container.

### MITRE D3FEND
The defensive counterpart: a taxonomy of **countermeasures** mapped to ATT&CK.

### Unified Cyber Kill Chain (Pols 2017)
18 phases combining Lockheed + ATT&CK. More detailed.

### Pyramid of pain (see above).

### Common Vulnerability Scoring System (CVSS)
Score 0–10. Components: Attack Vector, Complexity, Privileges Required, User Interaction, Scope, Confidentiality, Integrity, Availability. It is **NOT** priority. Combined with CISA KEV (Known Exploited) and EPSS (Exploit Prediction Scoring System) → patch prioritization.

## Exchange standards

### STIX 2.1
Structured Threat Information eXpression. JSON-LD for describing CTI:
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
HTTP/REST protocol to exchange STIX. Public/private servers.

### Others
- **OpenIOC** (Mandiant).
- **CybOX** (integrated into STIX 2).
- **IODEF** (incident report).
- **MISP format** (intermediate, simple).

## MISP — Malware Information Sharing Platform

Open source platform for managing IoCs + relations + sharing with community/peers.

Concepts:
- **Event**: container of IoCs + meta.
- **Attributes**: the individual IoCs (hash, IP, ...).
- **Galaxy / Cluster**: taxonomic tags (e.g. "threat-actor:APT29").
- **Sharing groups**: who sees what.

Connectors:
- Sector ISACs (FS-ISAC finance, H-ISAC healthcare, ...).
- Communities (CIRCL Luxembourg, ENISA EU CSIRT, ABUSE.ch).

## OpenCTI

More modern (Filigran). Neo4j graph + GraphQL. Connectors with MISP, TAXII, vendor feeds, MITRE ATT&CK.

## Public feeds (to get started)

| Feed | What |
|---|---|
| **AlienVault OTX** | community IoCs |
| **Abuse.ch** (URLhaus, MalwareBazaar, ThreatFox, FeodoTracker) | excellent for free |
| **MISP communities** | sector-specific |
| **CISA KEV** | vulns exploited in the wild |
| **NVD / EUVD / GHSA** | CVE database |
| **Microsoft Defender TI** | free with limits |
| **VirusTotal Intelligence** | commercial, for advanced research |
| **GreyNoise** | classifies internet "noise" IPs vs targeted |
| **Shodan** | exposure |
| **CertStream** | live CT log feed |

## Attribution — the controversial part

Establishing "who" carried out an attack is notoriously difficult and political.

- **Hard evidence**: reused signing keys, debug PDB paths, language identifiers, unique infrastructure.
- **Soft evidence**: TTP-match to a known group (can be imitated!), timezone of compilations.
- **False flag**: attackers deliberately plant misleading evidence (Lazarus writing in Russian, Sandworm with Mandarin strings).

**Attribution is rarely "fact"**. It is a confidence assessment ("high confidence", "moderate", "low").

Naming conventions:
- **Mandiant** APT1, APT28 (Fancy Bear), APT29 (Cozy Bear), APT38, APT41, ...
- **CrowdStrike** zoo: Fancy Bear (RU), Cozy Bear (RU), Voodoo Bear, Cobalt Spider, Wicked Panda (CN), Stardust Chollima (NK).
- **Microsoft** since 2023: weather names. Midnight Blizzard (APT29), Forest Blizzard (APT28), Volt Typhoon (CN, US infra), Plaid Rain.
- **Google/Mandiant** UNC#### for unclustered.

Same group, different names. Cross-reference on Wikipedia/CrowdSec/Mitre Groups.

## ASA / Adversary Simulation vs Emulation

- **Simulation**: generic replica of attackers (Caldera, BRAT, Atomic Red Team).
- **Emulation**: faithful replica of **a** specific group (e.g. emulate APT29 step-by-step to test detection).

MITRE publishes open source **Adversary Emulation Plans** (https://github.com/center-for-threat-informed-defense). 

## Examples of CTI products

What form do deliverables take?

1. **Daily SOC briefing**: 1 page, top threats, CISA advisory, vendor advisories.
2. **Weekly trend report**: active campaigns, sector-specific.
3. **Quarterly strategic report**: 30–50 pages, executive.
4. **Flash advisory**: "Patch CVE-X immediately tomorrow because Y".
5. **TTP technical analysis**: 5–15 pages, focused on relevance for detection engineering.
6. **Structured IoC list** (STIX bundle) automatically into SIEM.

## Typical pivoting in CTI

From a single IOC → expanded knowledge:

1. Sample hash → MalwareBazaar tag → family (e.g. Pikabot).
2. Family → vendor write-up → TTP pattern.
3. TTP → MITRE attack pattern → other families that share it.
4. Infrastructure (C2 domain) → passive DNS history → related IPs.
5. IP / netblock → owner (ASN) → other hosts in the range.
6. SSL cert serial / JARM fingerprint → other servers with the same pattern.
7. WhoIs registrar → email → other registered domains.

Tools: **VirusTotal**, **DomainTools**, **PassiveTotal/RiskIQ**, **Maltego**, **Censys**, **Shodan**, **SecurityTrails**, **DNSDB Farsight**.

## Exercises

### Exercise 24.1 — Local MISP
Install MISP (docker or appliance). Create an event with an invented IOC. Export to STIX. Import into another MISP / OpenCTI.

### Exercise 24.2 — STIX bundle
Write a STIX 2.1 bundle JSON describing:
- A `Threat Actor` ("ToyActor").
- A `Malware` ("ToyRAT") that the actor `uses`.
- An `Indicator` with a file hash pattern that `indicates` ToyRAT.

Validate with the [STIX Validator](https://github.com/oasis-open/cti-stix-validator).

### Exercise 24.3 — ATT&CK Navigator
Map the coverage of your detection rules. Which tactic is uncovered? Add a rule to cover it.

### Exercise 24.4 — Vendor write-up reading
Pick a recent advisory from Mandiant/CrowdStrike/Microsoft Defender TI. Extract IoCs, TTPs (ATT&CK mapping), capability. Rewrite it into a 1-page operational briefing for L2.

### Exercise 24.5 — Pivot challenge
Given a single IoC (an MD5 hash from MalwareBazaar):
- Look it up on VirusTotal, MalwareBazaar, OTX.
- Family? TTPs? Known C2s?
- Pivot to infrastructure (domain → passive DNS).
- Map to MITRE.

Time limit 1 hour. How far did you get?

### Exercise 24.6 — TryHackMe rooms
- "**Threat Intelligence Tools**".
- "**Cyber Threat Intelligence**" path.
- "**Yara**" room.

### Exercise 24.7 — Attribution skepticism
Read the DoD's "F3EAD", read a famous attribution report (e.g. Mandiant APT1, 2013). Identify:
- Which evidence is "hard" (reused infrastructure).
- Which is "soft" (TTP similarity).
- Confidence claim. Plausible? On what basis?

## Key concepts

1. **CTI = analysis + context, not just IoCs**.
2. **Pyramid of Pain**: detection on TTPs > on hashes.
3. **Diamond Model, Kill Chain, ATT&CK**: each useful for different purposes.
4. **STIX/TAXII** = structured exchange.
5. **MISP** is the free community baseline.
6. **Attribution = confidence statement**, not fact.
7. **Adversary Emulation > generic simulation** for testing detection against specific threats.

Next: GRC and regulation.
