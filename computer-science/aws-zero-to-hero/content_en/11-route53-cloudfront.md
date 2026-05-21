---
title: "Route 53, CloudFront, Global Accelerator"
area: "Networking"
summary: "Managed DNS (Route 53), CDN (CloudFront), anycast IP (Global Accelerator). Three edge services that turn user latency from 'slow' into 'sub-50 ms'."
order: 11
level: "intermediate"
prereq:
  - "section 2 (edge), 9 (VPC)"
tools:
  - "Route 53"
  - "CloudFront + ACM (certificate manager)"
---

# Route 53, CloudFront, Global Accelerator

Three global services living on the AWS edge. They solve three different problems: who is this (DNS), where to cache static content (CDN), how to deliver TCP fast (anycast).

## 1. Route 53 — managed DNS

Managed authoritative DNS. Highly available (100% SLA), priced per hosted zone (~$0.50/month) + per query (~$0.40/M).

**Hosted Zone** = a domain managed in Route 53. Public (resolvable from the Internet) or Private (associated with one or more VPCs, resolvable only inside).

Standard record types: `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SRV`, `NS`, `PTR`.

**Special: Alias record**. Like CNAME but can point at other AWS services (ALB, CloudFront, S3 website, API Gateway) and works on the zone apex (`acme.com` without `www.`), which CNAME can't.

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

### Routing policies

Route 53 chooses which record to return based on the policy:

| Policy | When |
|---|---|
| **Simple** | 1 record, returned always |
| **Weighted** | split traffic by weight (e.g. 90/10 canary) |
| **Latency-based** | return the endpoint with lowest latency from user |
| **Geolocation** | by country/continent |
| **Geoproximity** | like geo + distance bias |
| **Failover** | primary/secondary based on health check |
| **Multivalue answer** | up to 8 healthy records (mini DNS LB) |
| **IP-based** | rules based on client CIDR |

### Health checks

Route 53 monitors an endpoint (HTTP/HTTPS/TCP) every 10–30 sec from multiple locations. Failover policy + health check = automatic DNS DR.

## 2. CloudFront — global CDN

AWS CDN distributed across 600+ edge locations. **Mental model**: between user and origin sits an HTTP cache in 600 cities. Cacheable responses (with `Cache-Control: max-age=N`) stay at the edge, reducing origin load and user latency.

Key concepts:

- **Origin**: where the real content lives (S3 bucket, ALB, custom HTTP, MediaPackage). Multi-origin OK.
- **Distribution**: the "CloudFront configuration" (what, from where, with which behavior).
- **Behavior**: path-based rules ("`/api/*` no cache, `/static/*` cache 1h").
- **TTL**: edge cache time for a response. `Cache-Control` from the origin wins.
- **OAC (Origin Access Control)**: the S3 bucket trusts only CloudFront (no public S3).
- **Signed URL / Signed Cookie**: time-limited private content (e.g. protected downloads).
- **Lambda@Edge / CloudFront Functions**: code running near the user (URL rewrites, A/B testing, JWT validation).

**Pricing**: ~$0.085/GB edge egress (cheaper than direct EC2) + $0.0075 per 10k HTTPS requests. 1 TB egress + 10M req/month free perpetually.

### Frequent anti-patterns

- **CloudFront in front of a write-heavy API with no cache**: you pay CloudFront but save nothing. Use it for GETs, keep writes direct.
- **TTL 0**: every request hits origin; CloudFront becomes a slow proxy.
- **No OAC**: you leave S3 public — defeated.

## 3. AWS Global Accelerator

Two static anycast IPs (one /32 per accelerator) announced from every edge. Users talk to the closest AWS edge, then traffic travels the **AWS private network** to the regional endpoint (NLB, ALB, EC2, Elastic IP).

Key differences vs CloudFront:

| | CloudFront | Global Accelerator |
|---|---|---|
| Layer | HTTP(S) caching CDN | TCP/UDP transport |
| Cache | yes | no |
| Addresses | hostname `xyz.cloudfront.net` | 2 static anycast IPs |
| Failover | per origin | per region (seconds) |
| Use case | web, API, video-on-demand | gaming, VoIP, IoT, fixed-IP whitelist |

**When**: you have a non-HTTP TCP service, or an enterprise customer needing **two static IPs to whitelist** (strict firewall).

## 4. Combined pattern

```mermaid
flowchart LR
    user[User]
    user --> r53[Route 53]
    r53 -. resolves www.acme.com .-> cf[CloudFront]
    cf -. HTTP cache .-> origin[ALB]
    origin --> ec2[EC2 in private subnet]
    user2[Gaming user]
    user2 --> ga[Global Accelerator<br>2 anycast IPs]
    ga --> nlb[Regional NLB]
```

## 5. Domains and ACM

Route 53 can register domains ($12+/year for `.com`). TLS certificates are free via **AWS Certificate Manager (ACM)**, auto-renewed. Valid only for AWS use (ALB, CloudFront, API Gateway). For CloudFront the cert must live in `us-east-1` (historical quirk).

## 6. Exercise

<details>
<summary>Static Next.js export with global users. Architecture?</summary>

1. **S3 bucket** private for assets (no static website hosting: use OAC).
2. **CloudFront distribution** with S3 as origin via OAC.
3. **ACM certificate** in `us-east-1` for `*.acme.com`.
4. **Route 53** alias record `acme.com` → distribution.
5. Behavior: `/_next/static/*` cache TTL 1 year (immutable), `/` cache 5 min (dynamic).
6. Enable compression + HTTP/2/3.
7. Associate WAF for baseline protection.

Costs: ~$1–$10/month at low traffic (free tier). At scale, linear with egress.
</details>

<details>
<summary>Multiplayer game with servers in 3 Regions. User latency is critical. Routing strategy?</summary>

Options:
- **Route 53 latency-based**: DNS returns the closest Region IP. Fast but DNS client caching can lead to stale routing.
- **Global Accelerator**: anycast static IPs, traffic flows the AWS network from edge. Failover in seconds vs DNS minutes. Cost: $0.025/h per accelerator + traffic.

For real-time gaming, GA wins for steadier latency and faster failover. For non-latency-critical HTTP workloads, Route 53 + regional ALBs + CloudFront usually suffice.
</details>

> **Summary**: Route 53 = managed DNS with advanced policies (latency, geo, failover) and health checks; CloudFront = global HTTP CDN, caches statics, cuts origin egress; Global Accelerator = 2 anycast IPs for non-HTTP TCP/UDP. ACM gives free TLS certs. Route 53 alias solves the zone-apex CNAME problem.
