---
title: "Regex, automata, and parsers for security"
area: "Prerequisites"
order: 2.5
level: "beginner"
summary: "Regex explained from scratch, with drawn-out automata. ReDoS — why a bad regex can kill a server. Difference between regex / parsers / grammars. Parser ambiguity → polyglots and smuggling. Practical uses in security."
prereq:
  - "Sections 01, 02, 07"
tools:
  - "regex101.com (interactive debugger)"
  - "Python re / regex (PCRE-like)"
  - "grep / ripgrep / less /"
---

# Regex, automata, and parsers for security

> Regex is the Swiss Army knife of the security engineer (grep, log parsing, IDS, WAF, SIEM rules). But it is also a source of vulnerabilities (ReDoS, WAF bypass) and subtle bugs. Understanding it deeply, including the **machine** behind it, pays off.

## What is a regex?

A **regular expression** is a mini-grammar for describing patterns in strings. It recognizes **regular languages** (formally: strings accepted by a finite state automaton).

Example: the regex `^[a-z]+@[a-z]+\.[a-z]+$` matches strings like `alice@example.com` but not `alice@1234`.

## Basic building blocks (PCRE-flavored, as used by Python `re`)

| Syntax | Meaning | Example match |
|---|---|---|
| `a` | literal | `a` |
| `.` | any char (except newline by default) | `b`, `9`, `@` |
| `\d` | digit (`[0-9]`) | `7` |
| `\w` | word char (`[A-Za-z0-9_]`) | `x`, `9`, `_` |
| `\s` | whitespace | space, tab, newline |
| `\D \W \S` | negations | non-digit, non-word, non-ws |
| `[abc]` | one of a, b, c | `b` |
| `[^abc]` | one NOT among a, b, c | `d` |
| `[a-z]` | range | `m` |
| `a*` | 0 or more `a` | `""`, `a`, `aaa` |
| `a+` | 1 or more | `a`, `aaa` |
| `a?` | 0 or 1 | `""`, `a` |
| `a{3}` | exactly 3 | `aaa` |
| `a{2,4}` | 2-4 | `aa`, `aaa`, `aaaa` |
| `a{2,}` | 2 or more | `aa+` |
| `^` | start of string (or line with flag `m`) | |
| `$` | end of string | |
| `\b` | word boundary | between `\w` and non-`\w` |
| `(abc)` | group (capturing) | |
| `(?:abc)` | non-capturing group | |
| `(?P<name>...)` | named group (Python) | |
| `a|b` | alternation | `a` or `b` |
| `\1` | backreference to group 1 | |

**Greedy vs lazy:**
- `.*` is **greedy**: takes as much as it can.
- `.*?` is **lazy**: takes as little as it can, expanding only when needed.

Decisive example: extracting text between `<b>` and `</b>` tags in `<b>foo</b><b>bar</b>`:
- `<b>.*</b>` → matches the entire string (greedy goes to the last `</b>`).
- `<b>.*?</b>` → matches `<b>foo</b>` (lazy stops at the first one).

## The automaton behind the regex (intuition)

A simple regex translates into a **finite state automaton** (FA). Example: `ab*c`:

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
- On `a` → `q1`.
- From `q1` on `b` back to `q1` (loop 0+ b).
- From `q1` on `c` → `q_accept`.

Recognizes `ac`, `abc`, `abbbc`, ... not `bc`, not `abca`.

### NFA vs DFA

- **DFA** (Deterministic FA): from a state and a symbol, exactly 1 transition. Fast, linear.
- **NFA** (Non-deterministic FA): can "guess" between multiple transitions (backtracking). More expressive but can be slow.

Regexes with **backreferences** (`(a)\1`) or lookahead/lookbehind require an NFA with backtracking. Most engines (Python re, PCRE, Java) are **NFA with backtracking**. RE2 (Google) and Rust regex are **DFA** → no backtracking → no ReDoS, but no backreferences.

## ReDoS — when regex kills

Patterns like `(a+)+$` on input `aaaaaaaaa...!` explode **exponentially** in NFA backtracking.

Classic example **CVE-2017-16026** (npm `ms`): the regex `^((?:\d+)?\.?\d+) *(milliseconds?|...)?$` with long input caused blocking.

Dangerous patterns:
- `(.*)+` — nested repetition.
- `(.+)+` — same.
- `(a|aa)+` — overlapping alternation.
- `(a|ab)*c` — overlapping in alternation.

### Quick ReDoS test in Python
```python
import re, time

pat = r'^(a+)+$'
s = 'a' * 30 + '!'   # at the end there's '!' which does NOT match
start = time.time()
re.match(pat, s)
print(time.time() - start, "sec")
```

With `n = 30`, the match takes seconds. `n = 40`, minutes. **Exponential time**. On a public server it's a DoS.

### Mitigations
1. **Use non-backtracking engines** (RE2 in Go natively, `re2` Python package, Rust `regex`).
2. **Timeout** on the match.
3. **Limit input length**.
4. **Avoid catastrophic patterns**: no `(.*)+`, no `(a|a)+`. Tools: [safe-regex](https://www.npmjs.com/package/safe-regex), [rxxr2](https://github.com/superhuman/rxxr2).
5. **Atomic groups and possessive quantifiers** (`(?>...)`, `a*+`) — they disable backtracking but aren't available in Python.

## Practical uses in security

### Detection with grep / SIEM

```bash
# IPv4 IP
grep -E '\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\b'

# Email
grep -E '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'

# MD5 (32 hex)
grep -E '\b[a-fA-F0-9]{32}\b'

# Long base64 chunk (>40 chars)
grep -E '[A-Za-z0-9+/]{40,}={0,2}'

# JWT (3 base64url segments)
grep -oE 'eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+'

# AWS access key
grep -E 'AKIA[0-9A-Z]{16}'

# URL in logs
grep -oE 'https?://[^ "]+'
```

### Sigma rule (see section 23)

```yaml
detection:
    suspicious_cmdline:
        ProcessCommandLine|re: '(?i)(invoke-(expression|webrequest|restmethod)|downloadstring|frombase64|iex\s|nop\s+-w|hidden\s+win)'
    condition: suspicious_cmdline
```

### WAF rules

WAFs (ModSecurity, Cloudflare WAF, AWS WAF) block payloads via regex. E.g.:
```
(?i)union\s+select       # SQLi
(?i)<script               # XSS
(?i)../../               # path traversal
```

**Bypassing a WAF = bypassing a regex**:
- Encoding (`%00`, double url-encode, mixed case).
- SQL comments (`uni/*!*/on sel/*!*/ect`).
- Char split via JS string concatenation.
- Unicode normalization tricks.
- Polyglot.

### Extracting IoCs with `grep -oE`

```bash
# all unique IPs from a log
grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' access.log | sort -u

# all requested paths
grep -oE '"GET ([^ ]+)' access.log | awk '{print $2}' | sort | uniq -c | sort -rn | head
```

### Server-side validation

**Never** use regex as primary security (e.g., HTML tag blacklist). Always **whitelist** + a parser appropriate to the context. Bad examples:
```python
# vulnerable
if not re.search(r'<script', user_input, re.I):
    render(user_input)
# bypass: <ScRiPt>, <img onerror=>, <svg/onload=...>, <body onload=>, ...
```

**Good**: use an HTML sanitization library (Bleach, DOMPurify) that has a DOM-aware parser and a semantic whitelist.

## Grammars, parsers, languages

Regexes recognize **regular languages**, a limited family. They **cannot** match balanced parentheses, Python indentation, nested JSON. For that you need **context-free language parsers**.

Chomsky hierarchy (recap):
1. **Regular** (regex / DFA).
2. **Context-free** (BNF / push-down automata): JSON, XML, HTML, programming languages.
3. **Context-sensitive**.
4. **Recursively enumerable** (Turing).

### BNF example (partial JSON)
```
object = "{" [ pair (, pair)* ] "}"
pair   = string ":" value
value  = string | number | object | array | "true" | "false" | "null"
```

### Parser combinators / generators
- **PEG** (Parsing Expression Grammars).
- ANTLR, yacc/bison.
- Python: `pyparsing`, `lark`.

## Parser ambiguity = security holes

When two parsers interpret the same input differently, an attacker can abuse it:

### HTTP request smuggling
The frontend (HAProxy/Nginx) uses `Content-Length`. The backend uses `Transfer-Encoding: chunked`. A request with both headers → each "splits" it at a different point. The attacker can **hide a request inside another**. (See section 11.)

### JSON ambiguity
Different parsers handle duplicate keys differently:
```json
{"role": "user", "role": "admin"}
```
- Some take the first, others the last. Authorization check on one, business logic on the other = bypass.

### XML / SOAP / XXE
Permissive XML parsers (DTD external entity) → SSRF/LFI.

### Polyglot file
A file that is **simultaneously** PDF + JPEG + HTML. Bypass content-type filtering, MIME sniffing.

### Smuggling URL parsing
```
http://example.com#@evil.com/
http://evil.com\@example.com/
http://example.com:80@evil.com/
```
Different URL libraries (`urllib.parse`, `parse-url` JS, ...) interpret these differently → SSRF, open-redirect. See the paper "**A New Era of SSRF**" (Black Hat 2017).

## Hands-on practical examples

### Example 1: extract all HTTPS URLs from a text

```python
import re
text = open("dump.txt").read()
urls = re.findall(r'https://[^\s<>"\']+', text)
```

### Example 2: find hardcoded API keys

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

**All modern secret scanners (gitleaks, trufflehog) are this + many more patterns + a verifier (calling the API to validate).**

### Example 3: parse Apache combined-format logs

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

### Example 4: ReDoS demo

```python
import re, time
def time_match(pat, s):
    t0 = time.time(); re.match(pat, s); return time.time() - t0

for n in range(20, 35):
    s = 'a' * n + '!'
    print(n, time_match(r'^(a+)+$', s))
```

Watch time grow exponentially with `n`.

## Exercises

### Ex 2b.1 — Write regexes
1. Strict email pattern (RFC 5322 is complicated; "good enough" is fine).
2. HTTP/HTTPS URL.
3. Valid IPv4 (no `999.999.999.999`).
4. IPv6 (simplified version).
5. UUID v4.

<details><summary>Solutions</summary>

1. `[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}` (simplified).
2. `https?://[^\s/$.?#].[^\s]*`.
3. `\b(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}\b`.
4. An exact one is hard; `([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}` doesn't handle `::` compression. See RFC 4291 for the complete one.
5. `[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}`.

</details>

### Ex 2b.2 — ReDoS in practice
Find a ReDoS pattern in an open source project (old npm repos have plenty). Reproduce it with crafted input. Explain.

### Ex 2b.3 — Bypass a WAF regex
Given a blacklist regex `(?i)union.*select`, come up with 5 ways to bypass it:

<details><summary>Hints</summary>

- SQL comment: `union/*foo*/select`.
- Case mix: `UnIoN sElEcT`.
- URL encoding: `%55nion`.
- Double URL encoding.
- Newline (if regex isn't `(?s)`): `union\nselect` (in some engines `.` doesn't match `\n`).
- Unicode equivalents (`%c0%a7` on several web stacks).
- Whitespace: tab, vertical tab, form feed.

</details>

### Ex 2b.4 — Hands-on parser ambiguity
Write two JSON parsers (one in Python `json.loads`, one simple "DIY" line-by-line). Find an input where they differ. Discussion.

### Ex 2b.5 — RegEx101 deep dive
Go to [regex101.com](https://regex101.com). Paste in a complex regex (e.g., the Apache log one above). Study the debugger step-by-step. Understand every group.

### Ex 2b.6 — Build a mini-parser
Write a parser for arithmetic expressions `1 + 2 * (3 + 4)`. Use `lark` or `pyparsing` or write it by hand (recursive descent). How "regex-impossible" is it? (Spoiler: balanced parentheses require a CFG, not a regex.)

## Key takeaways

1. **Regex = DFA/NFA**. DFA engines are safe (RE2). NFA with backtracking → ReDoS.
2. **Greedy vs lazy** is the most common trap for beginners.
3. **Replace regex with a proper parser** for HTML/JSON/HTTP — don't sanitize with regex.
4. **Catastrophic patterns**: `(.*)+`, `(a|a)+`, `(a+)+`.
5. **WAF bypass** = regex bypass: encoding, case, comments, parser mismatch.
6. **Parser ambiguity** = a vulnerability class (HTTP smuggling, JSON dup keys, URL parsing).
7. Tools: regex101.com, safe-regex, RE2, gitleaks pattern lib.

Regexes are extremely powerful. Using them well is a skill that will follow you everywhere in security.
