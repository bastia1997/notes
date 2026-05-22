---
title: "Regex, automi e parser per la security"
area: "Prerequisiti"
order: 2.5
level: "principiante"
summary: "Regex spiegata partendo da zero, con automi disegnati. ReDoS — perché un regex sbagliato può ammazzare un server. Differenza regex / parser / grammatiche. Parser ambiguity → polyglot e smuggling. Usi pratici in security."
prereq:
  - "Sezione 01, 02, 07"
tools:
  - "regex101.com (debugger interattivo)"
  - "Python re / regex (PCRE-like)"
  - "grep / ripgrep / less /"
---

# Regex, automi e parser per la security

> Le regex sono il coltellino svizzero del security engineer (grep, log parsing, IDS, WAF, SIEM rules). Ma sono anche causa di vulnerabilità (ReDoS, bypass WAF) e bug subtle. Capirle a fondo, inclusa la **macchina** dietro, paga.

## Cos'è una regex?

Una **regular expression** è una mini-grammatica per descrivere pattern in stringhe. Riconosce **linguaggi regolari** (formalmente: stringhe accettate da un automa a stati finiti).

Esempio: la regex `^[a-z]+@[a-z]+\.[a-z]+$` riconosce stringhe come `alice@example.com` ma non `alice@1234`.

## Mattoni base (PCRE-flavored, usata da Python `re`)

| Sintassi | Significato | Esempio match |
|---|---|---|
| `a` | letterale | `a` |
| `.` | qualsiasi char (tranne newline di default) | `b`, `9`, `@` |
| `\d` | cifra (`[0-9]`) | `7` |
| `\w` | word char (`[A-Za-z0-9_]`) | `x`, `9`, `_` |
| `\s` | whitespace | spazio, tab, newline |
| `\D \W \S` | negazioni | non-cifra, non-word, non-ws |
| `[abc]` | uno tra a, b, c | `b` |
| `[^abc]` | uno NON tra a, b, c | `d` |
| `[a-z]` | range | `m` |
| `a*` | 0 o più `a` | `""`, `a`, `aaa` |
| `a+` | 1 o più | `a`, `aaa` |
| `a?` | 0 o 1 | `""`, `a` |
| `a{3}` | esattamente 3 | `aaa` |
| `a{2,4}` | 2-4 | `aa`, `aaa`, `aaaa` |
| `a{2,}` | 2 o più | `aa+` |
| `^` | inizio stringa (o riga con flag `m`) | |
| `$` | fine stringa | |
| `\b` | word boundary | tra `\w` e non-`\w` |
| `(abc)` | gruppo (cattura) | |
| `(?:abc)` | gruppo non-catturante | |
| `(?P<name>...)` | gruppo nominato (Python) | |
| `a|b` | alternativa | `a` o `b` |
| `\1` | backreference al gruppo 1 | |

**Greedy vs lazy:**
- `.*` è **greedy**: prende quanto più può.
- `.*?` è **lazy**: prende quanto meno può, espande solo se necessario.

Esempio decisivo: estrarre testo tra tag `<b>` e `</b>` in `<b>foo</b><b>bar</b>`:
- `<b>.*</b>` → match l'intera stringa (greedy va fino all'ultimo `</b>`).
- `<b>.*?</b>` → match `<b>foo</b>` (lazy si ferma al primo).

## L'automa dietro la regex (intuizione)

Una regex semplice si traduce in un **automa a stati finiti** (FA). Esempio: `ab*c`:

```
   ┌─────┐  a   ┌─────┐ b ┌─────┐
   │  q0 │ ───▶│  q1 │◀─┐│  q2 │
   └─────┘     └─────┘  └└─────┘
                        c│
                        ▼
                  ┌─────────┐
                  │ q_accept│
                  └─────────┘
```

- Start `q0`.
- Su `a` → `q1`.
- Da `q1` su `b` torna `q1` (loop 0+ b).
- Da `q1` su `c` → `q_accept`.

Riconosce `ac`, `abc`, `abbbc`, ... non `bc`, non `abca`.

### NFA vs DFA

- **DFA** (Deterministic FA): da uno stato e un simbolo, esattamente 1 transizione. Veloce, lineare.
- **NFA** (Non-deterministic FA): può "indovinare" tra più transizioni (backtracking). Più espressivo ma può essere lento.

Le regex con **backreferences** (`(a)\1`) o lookahead/lookbehind richiedono NFA con backtracking. La maggior parte dei motori (Python re, PCRE, Java) sono **NFA con backtracking**. RE2 (Google) e Rust regex sono **DFA** → niente backtracking → niente ReDoS, ma niente backreferences.

## ReDoS — quando regex uccide

Pattern come `(a+)+$` su input `aaaaaaaaa...!` esplodono **esponenzialmente** nel backtracking dell'NFA.

Esempio classico **CVE-2017-16026** (npm `ms`): regex `^((?:\d+)?\.?\d+) *(milliseconds?|...)?$` con input lungo causava blocking.

Pattern pericolosi:
- `(.*)+` — repetition annidata.
- `(.+)+` — idem.
- `(a|aa)+` — alternativa overlapping.
- `(a|ab)*c` — overlapping in alternativa.

### Test ReDoS rapido in Python
```python
import re, time

pat = r'^(a+)+$'
s = 'a' * 30 + '!'   # alla fine c'è '!' che NON matcha
start = time.time()
re.match(pat, s)
print(time.time() - start, "sec")
```

Con `n = 30`, il match impiega secondi. `n = 40`, minuti. **Tempo esponenziale**. Su un server pubblico è DoS.

### Mitigazioni
1. **Usa motori non-backtracking** (RE2 in Go nativo, `re2` Python package, Rust `regex`).
2. **Timeout** del match.
3. **Limita input length**.
4. **Evita pattern catastrofici**: niente `(.*)+`, niente `(a|a)+`. Tool: [safe-regex](https://www.npmjs.com/package/safe-regex), [rxxr2](https://github.com/superhuman/rxxr2).
5. **Atomic groups e possessive quantifiers** (`(?>...)`, `a*+`) — disabilitano backtracking ma non in Python.

## Usi pratici in security

### Detection con grep / SIEM

```bash
# IP IPv4
grep -E '\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\b'

# Email
grep -E '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'

# MD5 (32 hex)
grep -E '\b[a-fA-F0-9]{32}\b'

# Base64 chunk lungo (>40 chars)
grep -E '[A-Za-z0-9+/]{40,}={0,2}'

# JWT (3 segmenti base64url)
grep -oE 'eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+'

# AWS access key
grep -E 'AKIA[0-9A-Z]{16}'

# URL in log
grep -oE 'https?://[^ "]+'
```

### Sigma rule (vedi sezione 23)

```yaml
detection:
    suspicious_cmdline:
        ProcessCommandLine|re: '(?i)(invoke-(expression|webrequest|restmethod)|downloadstring|frombase64|iex\s|nop\s+-w|hidden\s+win)'
    condition: suspicious_cmdline
```

### WAF rules

WAF (ModSecurity, Cloudflare WAF, AWS WAF) bloccano payload via regex. Es:
```
(?i)union\s+select       # SQLi
(?i)<script               # XSS
(?i)../../               # path traversal
```

**Bypassare un WAF = bypassare una regex**:
- Encoding (`%00`, double url-encode, mixed case).
- Comment SQL (`uni/*!*/on sel/*!*/ect`).
- Char split via JS string concatenation.
- Unicode normalization tricks.
- Polyglot.

### Estrarre IoC con `grep -oE`

```bash
# tutti gli IP unici da un log
grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' access.log | sort -u

# tutti i path richiesti
grep -oE '"GET ([^ ]+)' access.log | awk '{print $2}' | sort | uniq -c | sort -rn | head
```

### Validation lato server

**Mai** usare regex come sicurezza primaria (es. blacklist HTML tag). Sempre **whitelist** + parser appropriato per il contesto. Esempi cattivi:
```python
# vulnerabile
if not re.search(r'<script', user_input, re.I):
    render(user_input)
# bypass: <ScRiPt>, <img onerror=>, <svg/onload=...>, <body onload=>, ...
```

**Buono**: usa libreria di sanitization HTML (Bleach, DOMPurify) che ha un parser DOM-aware e una whitelist semantica.

## Grammatiche, parser, linguaggi

Regex riconoscono **linguaggi regolari**, una famiglia limitata. **Non possono** match parentesi bilanciate, indentazione Python, JSON nested. Per quello servono **parser di linguaggio context-free**.

Gerarchia di Chomsky (riassunto):
1. **Regular** (regex / DFA).
2. **Context-free** (BNF / push-down automata): JSON, XML, HTML, linguaggi di programmazione.
3. **Context-sensitive**.
4. **Recursively enumerable** (Turing).

### Esempio BNF (JSON parziale)
```
object = "{" [ pair (, pair)* ] "}"
pair   = string ":" value
value  = string | number | object | array | "true" | "false" | "null"
```

### Parser combinators / generatori
- **PEG** (Parsing Expression Grammars).
- ANTLR, yacc/bison.
- Python: `pyparsing`, `lark`.

## Parser ambiguity = security holes

Quando due parser interpretano lo stesso input diversamente, l'attaccante può abusare:

### HTTP request smuggling
Frontend (HAProxy/Nginx) usa `Content-Length`. Backend usa `Transfer-Encoding: chunked`. Una richiesta con entrambi headers → ognuno la "spezza" in punti diversi. L'attaccante può **nascondere una request dentro un'altra**. (Vedi sezione 11.)

### JSON ambiguity
Parser diversi gestiscono duplicate keys diversamente:
```json
{"role": "user", "role": "admin"}
```
- Alcuni prendono il primo, altri l'ultimo. Authorization check su uno, logica business sull'altro = bypass.

### XML / SOAP / XXE
Parser XML permissivi (DTD external entity) → SSRF/LFI.

### Polyglot file
File che è **simultaneamente** PDF + JPEG + HTML. Bypass content-type filtering, MIME sniffing.

### Smuggling URL parsing
```
http://example.com#@evil.com/
http://evil.com\@example.com/
http://example.com:80@evil.com/
```
Diverse librerie URL (`urllib.parse`, `parse-url` JS, ...) interpretano diversamente → SSRF, open-redirect. Vedi paper "**A New Era of SSRF**" (Black Hat 2017).

## Esempi pratici a mano

### Esempio 1: estrai tutti gli URL HTTPS da un testo

```python
import re
text = open("dump.txt").read()
urls = re.findall(r'https://[^\s<>"\']+', text)
```

### Esempio 2: trova chiavi API hardcoded

```python
patterns = {
    'aws_key':   r'AKIA[0-9A-Z]{16}',
    'aws_secret': r'(?i)aws_secret[^=]*=[\s"\']*([A-Za-z0-9/+=]{40})',
    'github':    r'ghp_[A-Za-z0-9]{36}',
    'slack':     r'xoxb-[A-Za-z0-9-]+',
    'jwt':       r'eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+',
    'rsa_priv':  r'-----BEGIN (RSA )?PRIVATE KEY-----',
}
import re, sys
for name, pat in patterns.items():
    for m in re.finditer(pat, sys.stdin.read()):
        print(f"{name}: {m.group(0)}")
```

**Tutti i secret-scanner moderni (gitleaks, trufflehog) sono questo + tantissimi pattern + verifier (chiama l'API per validare).**

### Esempio 3: parse logs Apache combined format

```python
# 127.0.0.1 - - [21/May/2026:10:00:00 +0200] "GET /admin HTTP/1.1" 200 1234 "-" "curl/8.0"
pat = re.compile(
    r'^(?P<ip>\S+) \S+ \S+ '
    r'\[(?P<ts>[^\]]+)\] '
    r'"(?P<method>\w+) (?P<url>\S+) (?P<proto>[^"]+)" '
    r'(?P<status>\d+) (?P<size>\d+) '
    r'"(?P<ref>[^"]*)" "(?P<ua>[^"]*)"$'
)
for line in open("access.log"):
    m = pat.match(line)
    if m: print(m.groupdict())
```

### Esempio 4: ReDoS demo

```python
import re, time
def time_match(pat, s):
    t0 = time.time(); re.match(pat, s); return time.time() - t0

for n in range(20, 35):
    s = 'a' * n + '!'
    print(n, time_match(r'^(a+)+$', s))
```

Vedi tempo crescere esponenzialmente con `n`.

## Esercizi

### Es 2b.1 — Scrivi regex
1. Email pattern strict (RFC 5322 è complicato; serve "abbastanza buono").
2. URL HTTP/HTTPS.
3. IPv4 valido (no `999.999.999.999`).
4. IPv6 (versione semplificata).
5. UUID v4.

<details><summary>Soluzioni</summary>

1. `[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}` (semplificato).
2. `https?://[^\s/$.?#].[^\s]*`.
3. `\b(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}\b`.
4. Difficile esatta; `([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}` non gestisce `::` compression. Vedi RFC 4291 per la completa.
5. `[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}`.

</details>

### Es 2b.2 — ReDoS in pratica
Trova un pattern ReDoS in un progetto open source (vecchi repo npm hanno tanti). Riproduci con input crafted. Spiega.

### Es 2b.3 — Bypass WAF regex
Data una regex blacklist `(?i)union.*select`, escogita 5 modi per bypass:

<details><summary>Suggerimenti</summary>

- Commento SQL: `union/*foo*/select`.
- Case mix: `UnIoN sElEcT`.
- URL encoding: `%55nion`.
- Double URL encoding.
- Newline (se regex non `(?s)`): `union\nselect` (in alcuni motori `.` non match `\n`).
- Unicode equivalents (`%c0%a7` parecchi web stack).
- Whitespace: tab, vertical tab, form feed.

</details>

### Es 2b.4 — Parser ambiguity hands-on
Scrivi due parser JSON (uno in Python `json.loads`, uno semplice "fai da te" linea-per-linea). Trova un input dove differiscono. Discussione.

### Es 2b.5 — RegEx101 deep dive
Vai su [regex101.com](https://regex101.com). Incolla una regex complessa (es. quella di Apache log sopra). Studia il debugger step-by-step. Capisci ogni gruppo.

### Es 2b.6 — Build a mini-parser
Scrivi un parser per espressioni aritmetiche `1 + 2 * (3 + 4)`. Usa `lark` o `pyparsing` o scrivilo a mano (recursive descent). Quanto è "regex-impossibile"? (Spoiler: parentesi bilanciate richiedono CFG, non regex.)

## Concetti chiave

1. **Regex = DFA/NFA**. DFA-engine sicuro (RE2). NFA con backtracking → ReDoS.
2. **Greedy vs lazy** è la trappola più comune di principianti.
3. **Sostituisci regex con parser appropriato** per HTML/JSON/HTTP — non sanitizzare a base di regex.
4. **Pattern catastrofici**: `(.*)+`, `(a|a)+`, `(a+)+`.
5. **Bypass WAF** = bypass regex: encoding, case, comment, mismatch parser.
6. **Parser ambiguity** = vulnerability class (HTTP smuggling, JSON dup keys, URL parsing).
7. Tool: regex101.com, safe-regex, RE2, gitleaks pattern lib.

Le regex sono potentissime. Usarle bene è una skill che ti seguirà ovunque in security.
