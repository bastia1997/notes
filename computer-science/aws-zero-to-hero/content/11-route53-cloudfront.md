---
title: "Route 53, CloudFront, Global Accelerator"
area: "Networking"
summary: "DNS managed (Route 53), CDN (CloudFront), anycast IP (Global Accelerator). I tre servizi edge che portano latenza utente da 'lenta' a 'sub-50 ms'."
order: 11
level: "intermedio"
prereq:
  - "sezione 2 (edge), 9 (VPC)"
tools:
  - "Route 53"
  - "CloudFront + ACM (certificate manager)"
---

# Route 53, CloudFront, Global Accelerator

Tre servizi globali che vivono sull'edge AWS. Risolvono tre problemi diversi: chi è (DNS), dove cache statici (CDN), come far arrivare TCP velocemente (anycast).

## 1. Route 53 — DNS managed

DNS authoritative gestito. Highly available (SLA 100%), pagato per hosted zone (~$0.50/mese) + per query (~$0.40/M).

**Hosted Zone** = un dominio gestito da Route 53. Public (risolvibile da Internet) o Private (associata a uno o più VPC, risolvibile solo da dentro).

Tipi di record standard: `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SRV`, `NS`, `PTR`.

**Tipo speciale: Alias record**. Come CNAME ma può puntare ad altri servizi AWS (ALB, CloudFront, S3 website, API Gateway) e funziona anche sulla zone apex (`acme.com` senza `www.`), cosa che CNAME non può.

```bash
aws route53 change-resource-record-sets --hosted-zone-id Z123 \
  --change-batch '{
    "Changes":[{
      "Action":"UPSERT",
      "ResourceRecordSet":{
        "Name":"acme.com",
        "Type":"A",
        "AliasTarget":{
          "HostedZoneId":"Z2FDTNDATAQYW2",
          "DNSName":"d111.cloudfront.net",
          "EvaluateTargetHealth":false
        }
      }
    }]
  }'
```

### Routing policy

Route 53 sceglie quale record restituire in base alla policy:

| Policy | Quando |
|---|---|
| **Simple** | 1 record, ritorna sempre quello |
| **Weighted** | distribuisci traffico per peso (es. 90/10 per canary) |
| **Latency-based** | ritorna l'endpoint con la minor latenza dall'utente |
| **Geolocation** | per paese/continente |
| **Geoproximity** | come geo + bias di distanza |
| **Failover** | primary/secondary basato su health check |
| **Multivalue answer** | restituisce fino a 8 record sani (un mini-LB DNS) |
| **IP-based** | regole basate su CIDR del client |

### Health checks

Route 53 monitora un endpoint (HTTP/HTTPS/TCP) ogni 10–30 sec da multiple location. Failover policy + health check = DR automatico DNS.

## 2. CloudFront — CDN globale

CDN AWS distribuito su 600+ edge location. **Modello mentale**: tra l'utente e l'origine c'è una cache HTTP in 600 città. Le risposte cacheabili (con `Cache-Control: max-age=N`) restano nell'edge, riducendo carico sull'origine e latenza utente.

Concetti chiave:

- **Origin**: dove sta il contenuto vero (S3 bucket, ALB, custom HTTP, MediaPackage). Multi-origin OK.
- **Distribution**: la "configurazione CloudFront" (cosa, da dove, con quale comportamento).
- **Behavior**: rules path-based ("`/api/*` non cache, `/static/*` cache 1 ora").
- **TTL**: tempo di cache di una risposta nell'edge. `Cache-Control` dall'origine vince.
- **OAC (Origin Access Control)**: il bucket S3 si fida solo di CloudFront (no public S3).
- **Signed URL / Signed Cookie**: contenuti privati a tempo (es. download protetti).
- **Lambda@Edge / CloudFront Functions**: codice eseguito vicino all'utente (rewrite URL, A/B testing, JWT validation).

**Pricing**: ~$0.085/GB egress dall'edge (cheaper di EC2 direct) + $0.0075 per 10k richieste HTTPS. 1 TB egress + 10M req/mese free perpetually.

### Anti-pattern frequenti

- **CloudFront davanti a un'API write-heavy senza cache**: paghi CloudFront ma non risparmi. Usalo per GET, mantieni write-direct.
- **TTL 0**: ogni richiesta va all'origine, CloudFront diventa un proxy lento.
- **Mancato uso di OAC**: lasci S3 pubblico — sconfitto.

## 3. AWS Global Accelerator

Due IP anycast statici (un /32 per istanza) annunciati da tutte le edge. L'utente parla con l'edge AWS più vicina, poi il traffico viaggia sulla **rete privata AWS** fino al regional endpoint (NLB, ALB, EC2, Elastic IP).

Differenze chiave vs CloudFront:

| | CloudFront | Global Accelerator |
|---|---|---|
| Layer | HTTP(S) caching CDN | TCP/UDP transport |
| Cache | sì | no |
| Indirizzi | hostname `xyz.cloudfront.net` | 2 IP statici anycast |
| Failover | per origine | per regione (sec) |
| Use case | web, API, video on demand | gaming, VoIP, IoT, white-list IP fissi |

**Quando**: hai un servizio TCP non-HTTP, o un cliente enterprise che ha bisogno di **due IP statici da whitelist** (firewall pesante).

## 4. Pattern combinato

```mermaid
flowchart LR
    user[Utente]
    user --> r53[Route 53]
    r53 -. risolve www.acme.com .-> cf[CloudFront]
    cf -. cache HTTP .-> origin[ALB]
    origin --> ec2[EC2 in private subnet]
    user2[Utente gaming]
    user2 --> ga[Global Accelerator<br>2 IP anycast]
    ga --> nlb[NLB regional]
```

## 5. Domini e ACM

Route 53 può registrare domini ($12+/anno per `.com`). I certificati TLS sono gratis via **AWS Certificate Manager (ACM)**, auto-rinnovati. Validi solo per uso AWS (ALB, CloudFront, API Gateway). Per CloudFront serve cert in `us-east-1` (eccezione storica).

## 6. Esercizio

<details>
<summary>Sito statico Next.js export con utenti globali. Architettura?</summary>

1. **S3 bucket** privato per gli asset (no static website hosting attivo: usa OAC).
2. **CloudFront distribution** con S3 come origin via OAC.
3. **ACM certificate** in `us-east-1` per `*.acme.com`.
4. **Route 53** alias record `acme.com` → distribution.
5. Behavior: `/_next/static/*` cache TTL 1 anno (immutable), `/` cache 5 min (lokale dynamic).
6. Compression + HTTP/2/3 abilitati.
7. WAF associato per protezione base.

Costi: ~$1–$10/mese a basso traffico (dentro free tier). A scala scaling lineare con egress.
</details>

<details>
<summary>Gioco multiplayer con server in 3 Region. Latenza utente critica. Come instradare?</summary>

Opzioni:
- **Route 53 latency-based**: DNS ritorna l'IP della Region più vicina. Veloce ma DNS caching utente può portare a stale routing.
- **Global Accelerator**: IP statici anycast, traffico va su rete AWS dall'edge. Failover ~secondi vs minuti del DNS. Costo: $0.025/h per accelerator + traffic.

Per real-time gaming, GA vince per la latenza più stabile e il failover veloce. Per workload HTTP non latency-critical, Route 53 + ALB regionali + CloudFront può bastare.
</details>

> **Riassunto**: Route 53 = DNS managed con policy avanzate (latency, geo, failover) e health check; CloudFront = CDN HTTP globale, cache statici, riduce egress origine; Global Accelerator = 2 IP anycast per TCP/UDP non-HTTP. ACM dà cert TLS gratis. Route 53 alias risolve il problema del CNAME su zone apex.
