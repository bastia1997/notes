---
title: "Extended glossary (250+ terms)"
area: "Reference"
order: 30
level: "beginner"
summary: "A-Z dictionary of all the terms encountered along the path, with a short English explanation + where they first appear. Save it, consult it every time you encounter an acronym."
prereq:
  - "None: it works as a transversal reference"
tools:
  - "Your browser's Ctrl+F"
---

# Extended glossary

> Press `/` (focus search) and type the term, or Ctrl+F in the page.

## A

**ABI** (Application Binary Interface) — Binary conventions between compiler and OS: how arguments are passed, struct layout, calling convention. *[sec. 01b]*

**ACL** (Access Control List) — List of permissions on an object (file, registry key, process). On Windows every secure object has DACL+SACL. *[sec. 01, 06]*

**ACN** — The Italian National Cybersecurity Agency, NIS2 authority in IT. *[sec. 25]*

**ADCS** (Active Directory Certificate Services) — The enterprise CA of an AD domain. Template misconfigs (ESC1-15) = privesc to domain admin. *[sec. 13]*

**AEAD** (Authenticated Encryption with Associated Data) — Encryption that provides confidentiality + integrity in a single pass. AES-GCM, ChaCha20-Poly1305. *[sec. 05]*

**AES** (Advanced Encryption Standard) — Standard symmetric cipher. 128-bit block, 128/192/256 keys. Successor of DES. *[sec. 05, 05b]*

**AFL / AFL++** — Coverage-guided fuzzer. Standard for finding bugs in parsers/binaries. *[sec. 14]*

**AMSI** (Antimalware Scan Interface) — Windows API that script engines (PowerShell, VBA) use to show content to AV/EDR before execution. Bypass = in-memory patch. *[sec. 06]*

**ANSI/ASCII** — 7-bit character encoding standard (128 values). Extended to UTF-8 everywhere today. *[sec. 02]*

**APC** (Asynchronous Procedure Call) — On Windows, mechanism to execute code in other threads. Injection vector. *[sec. 16]*

**API** (Application Programming Interface) — Software interface. In security, REST/GraphQL APIs are often attacked. *[sec. 11]*

**APK** — Android package (ZIP). Contains classes.dex + native libs + resources. *[sec. 17]*

**APT** (Advanced Persistent Threat) — Organized attack group, often state-sponsored, with long and sophisticated campaigns. *[sec. 00, 24]*

**ARM/AArch64** — Dominant RISC architecture on mobile, embedded, M1/M2/M3 Mac, AWS Graviton. *[sec. 01b]*

**ARP** (Address Resolution Protocol) — Maps IP→MAC on a LAN. Without authentication → easy spoofing. *[sec. 03, 12]*

**ASLR** (Address Space Layout Randomization) — Randomizes stack/heap/libs/code addresses at every run. Exploit mitigation. *[sec. 01, 14]*

**ASN** (Autonomous System Number) — Identifier of an autonomous network on the Internet (e.g., AS15169 = Google). *[sec. 08]*

**AS-REP / TGS-REP** — KDC responses in the Kerberos protocol. Roasting attacks on both. *[sec. 13]*

**ATT&CK (MITRE)** — Taxonomic framework of attacker TTPs. Industry lingua franca. *[sec. 16, 23, 24]*

**AV** (Antivirus) — Software that looks for known malware via signature + ML + behavior. *[sec. 16]*

## B

**BCD** (Boot Configuration Data) — Boot config database on Windows. *[sec. 06]*

**BCRYPT / bcrypt** — Slow password KDF, based on Blowfish. Alternative to Argon2 / scrypt. *[sec. 05]*

**Beacon** — Generic term for a C2 implant that periodically checks in. Cobalt Strike uses "beacon" as a name. *[sec. 16, 26]*

**BFLA** (Broken Function Level Authorization) — A regular user accesses admin functions. *[sec. 11]*

**BGP** (Border Gateway Protocol) — Routing protocol between ISPs. BGP hijack is an internet-level attack vector. *[sec. 03]*

**BIOS / UEFI** — PC boot firmware. UEFI modern, BIOS legacy. *[sec. 06, 21]*

**BLAKE2 / BLAKE3** — Modern hash family, fast and secure. *[sec. 05]*

**Blob storage / Bucket** — Object-based cloud storage (S3 AWS, Blob Storage Azure, GCS Google). Often misconfigured as public. *[sec. 18]*

**BloodHound** — Tool to visualize and analyze attack paths in Active Directory via Neo4j graph. *[sec. 13]*

**BOLA** (Broken Object Level Authorization) — Synonym of IDOR in REST APIs. OWASP API top. *[sec. 11]*

**BPF / eBPF** — Berkeley Packet Filter / extended BPF. Sandboxed bytecode language in the Linux kernel for packet filtering, observability, security. *[sec. 06]*

**Brute force** — Try all possible combinations. Limited by space: $2^n$ with $n$ = bits. *[sec. 00b, 05]*

**Bug bounty** — Vendor program that pays for vulnerabilities found ethically. HackerOne, Bugcrowd, etc. *[sec. 00, 28]*

**Burp Suite** — De facto intercept proxy for web pentesting. PortSwigger. *[sec. 10]*

**BYOVD** (Bring Your Own Vulnerable Driver) — Attacker loads a signed but vulnerable driver to disable EDR/AV. *[sec. 06, 26]*

## C

**C2 / C&C** (Command & Control) — Server from which the attacker controls malware or implants. *[sec. 16, 26]*

**CA** (Certificate Authority) — Entity that issues/signs certificates. *[sec. 04, 05]*

**CABLE** — See BLE.

**Caldera** — MITRE framework for adversary simulation. *[sec. 23, 26]*

**Canary (stack)** — Random value between buffer and saved RIP. If overwritten → abort. BoF mitigation. *[sec. 01, 14]*

**Capability (Linux)** — Granularity of "root": CAP_NET_ADMIN, CAP_SYS_ADMIN, etc. Replace SUID for specific privileges. *[sec. 01, 06]*

**CAPI / CRYPTO-API** — Windows cryptographic APIs. *[sec. 06]*

**CASB** (Cloud Access Security Broker) — Gateway between users and cloud apps, enforces policies. *[sec. 18]*

**CBC** (Cipher Block Chaining) — AES mode with block chaining via XOR. Without a MAC, vulnerable to padding oracle. *[sec. 05, 05b]*

**CFAA** (Computer Fraud and Abuse Act) — US law on computer crimes. Equivalent of the Italian 615-ter. *[sec. 00]*

**CFG** (Control Flow Guard) — Windows mitigation: indirect calls only to valid targets. *[sec. 14]*

**ChaCha20** — Modern stream cipher (Bernstein). Combined with Poly1305 → AEAD. *[sec. 05]*

**CIDR** — Notation "192.168.1.0/24" for subnets. *[sec. 03]*

**CIEM** (Cloud Infrastructure Entitlements Management) — Tool to analyze and manage cloud IAM permissions. *[sec. 18]*

**CIS** (Center for Internet Security) — Non-profit that publishes controls v8 + configuration benchmarks. *[sec. 25]*

**Cloak / Cloaking** — Technique where a server returns different content to different IPs (e.g., malware vs researcher). *[sec. 16]*

**Cluster Bomb / Pitchfork / Sniper** (Burp Intruder) — Iterative attack modes. *[sec. 10]*

**CN** (Common Name) — Field in X.509 certificates, today replaced by SAN. *[sec. 04]*

**Cobalt Strike** — Commercial C2 framework, industry standard. *[sec. 26]*

**Container** — Linux process isolated via namespaces+cgroups. Not a VM. *[sec. 19]*

**Cookie** — Small piece of data the server sets on the browser, resent in every request. Sessions. *[sec. 04]*

**CORS** (Cross-Origin Resource Sharing) — HTTP header that relaxes the Same-Origin Policy. Common misconfigs. *[sec. 04, 10]*

**Crypt / crypt(3)** — Legacy Unix function for password hashing. *[sec. 05]*

**CSP** (Content Security Policy) — HTTP header that restricts resources loadable by the page. XSS mitigation. *[sec. 04]*

**CSPM** (Cloud Security Posture Management) — Tool for continuous audit of cloud configs. Prowler, Wiz, etc. *[sec. 18]*

**CSRF** (Cross-Site Request Forgery) — Forces the victim's browser to make authenticated requests against a target. *[sec. 10]*

**CT log** (Certificate Transparency) — Public log of all certs issued by CAs. OSINT pivot. *[sec. 04, 08]*

**CTF** (Capture The Flag) — Security competition/training. Jeopardy or A&D. *[sec. 28]*

**CTI** (Cyber Threat Intelligence) — Analysis that produces context on threats. *[sec. 24]*

**CVE** (Common Vulnerabilities and Exposures) — Unique identifier of a known vuln. *[sec. 00]*

**CVSS** (Common Vulnerability Scoring System) — Score 0-10 of CVE severity. *[sec. 00, 24]*

**CWE** (Common Weakness Enumeration) — Taxonomy of bug types (e.g., CWE-79 = XSS, CWE-89 = SQLi). *[sec. 24]*

## D

**DAC / MAC** (Discretionary / Mandatory Access Control) — Permissions managed by the user vs enforced by the kernel. *[sec. 06]*

**DACL** (Discretionary ACL) — The "permissions" part of the security descriptor on Windows. *[sec. 06]*

**DAST** (Dynamic Application Security Testing) — Testing apps at runtime (ZAP, Burp Scanner). *[sec. 07]*

**DCSync** — AD function that allows whoever has a specific privilege to request replication → leak of all hashes including krbtgt. *[sec. 13]*

**DDoS** (Distributed Denial of Service) — DoS distributed from many sources (botnet). *[sec. 03]*

**Decompiler** — Tool that reproduces pseudo-C/Java from a binary. Ghidra, Hex-Rays, JADX. *[sec. 15]*

**DEP / NX** (Data Execution Prevention / No-eXecute) — Mitigation: non-executable stack/heap. *[sec. 01, 14]*

**DES / 3DES** — Old symmetric ciphers. **Dead for modern security.** *[sec. 05]*

**Detection engineering** — Discipline of writing effective SIEM/EDR rules with low false positives. *[sec. 23]*

**DH** (Diffie-Hellman) — Key exchange algorithm over groups. Security = discrete log. *[sec. 05, 05b]*

**DHCP** (Dynamic Host Configuration Protocol) — Distributes IP+gateway+DNS automatically. Spoof-able. *[sec. 03, 12]*

**DKIM** (DomainKeys Identified Mail) — Email signature for anti-spoofing. *[sec. 25]*

**DLL** (Dynamic Link Library) — Windows shared library (.dll). Sideloading is an attack vector. *[sec. 06]*

**DMARC** — Policy for managing emails that don't pass SPF/DKIM. *[sec. 25]*

**DMZ** (Demilitarized Zone) — Network subnet exposed to the Internet but isolated from the internal network. *[sec. 03]*

**DNS** (Domain Name System) — Maps names ↔ IPs. *[sec. 03]*

**DNSSEC** — DNS extension with signatures. Anti-spoofing. *[sec. 03]*

**DoH / DoT** (DNS over HTTPS/TLS) — Encrypted DNS. *[sec. 03]*

**DORA** — EU Regulation 2022/2554 on digital operational resilience in the financial sector. *[sec. 25, 31]*

**DPAPI** (Data Protection API) — Windows API for encrypting per-user data with a master key. *[sec. 13]*

**DPIA** (Data Protection Impact Assessment) — Mandatory GDPR evaluation for high-risk processing. *[sec. 25]*

**DPO** (Data Protection Officer) — GDPR responsible, mandatory in some cases. *[sec. 25]*

## E

**EAP** (Extensible Authentication Protocol) — Authentication framework, used in 802.1X (WPA-Enterprise). *[sec. 20]*

**ECC** (Elliptic Curve Cryptography) — Crypto over elliptic curves. Short keys, same security as RSA. *[sec. 05, 05b]*

**ECDH / ECDSA / EdDSA / Ed25519** — ECC variants for key exchange / signature. *[sec. 05]*

**EDR** (Endpoint Detection and Response) — Endpoint agent that logs + responds to threats. *[sec. 23]*

**ELF** — Executable and Linkable Format. Linux/Unix binaries. *[sec. 15]*

**Endianness** — Byte order (little vs big endian). x86 little. *[sec. 01]*

**Entropy** (Shannon) — Measure of uncertainty in bits. *[sec. 00b, 05]*

**Entra ID** — New name of Azure AD. *[sec. 13, 18]*

**ETD / ETW** (Event Tracing for Windows) — Kernel+user tracing on Windows. EDRs hook here. *[sec. 06]*

## F

**Falco** — eBPF-based runtime detection for Linux/containers. *[sec. 19]*

**FIDO2 / WebAuthn** — Modern standard for password-less MFA (hardware token, biometric). *[sec. 25]*

**FIPS** — Federal Information Processing Standards (NIST). FIPS-140 for crypto, FIPS-197 = AES. *[sec. 05]*

**Forwarder** — SIEM agent that sends centralized logs. *[sec. 23]*

**Fuzzing** — Bombarding with random inputs to find crashes. *[sec. 07, 14]*

## G

**GCM** (Galois/Counter Mode) — Standard AEAD mode for AES. *[sec. 05]*

**GDPR** — EU Regulation 2016/679 on privacy. *[sec. 00, 25, 31]*

**Ghidra** — Open source NSA decompiler/disassembler. De facto standard. *[sec. 15]*

**gMSA** (Group Managed Service Account) — AD service account with Microsoft-managed (rotating) password. *[sec. 13]*

**GOT / PLT** — Global Offset Table / Procedure Linkage Table. ELF structures for dynamic library function calls. ROP attack target. *[sec. 14b]*

**GraphQL** — Query language for APIs. Different attack surface from REST. *[sec. 11]*

**GRC** (Governance Risk Compliance) — The "managerial" layer of security. *[sec. 25]*

## H

**Hash** — One-way function with fixed output. SHA-256, MD5 (broken), etc. *[sec. 05]*

**Hashcat** — GPU-accelerated password cracker. *[sec. 05]*

**Heap** — Memory area for dynamic allocations (malloc/free). Specific bugs (UAF, double-free, heap overflow). *[sec. 01, 14]*

**HKLM / HKCU** — Windows Registry hives. *[sec. 06]*

**HMAC** — Hash-based MAC. HMAC-SHA-256 standard. *[sec. 05]*

**Honeypot / Honeytoken** — Fake system/object to lure/detect attackers. *[sec. 23]*

**HSTS** (HTTP Strict Transport Security) — Header that enforces future HTTPS. *[sec. 04]*

**HTTP / HTTPS** — Web application protocols. *[sec. 04]*

## I

**IAM** (Identity and Access Management) — Identity and permission management system. *[sec. 18]*

**IDOR** — Insecure Direct Object Reference. Same concept as BOLA. *[sec. 10]*

**IDS / IPS** (Intrusion Detection/Prevention System) — Network sensor for malicious traffic. Suricata, Snort, Zeek. *[sec. 03, 23]*

**IMDS** (Instance Metadata Service) — Cloud endpoint (169.254.169.254) for instance credentials and config. v2 mitigation against SSRF. *[sec. 11, 18]*

**Impacket** — Python suite of tools for Microsoft protocols (SMB, Kerberos, MSRPC). *[sec. 13]*

**Indicator of Compromise (IoC)** — Observable artifact of an attack (hash, IP, domain). *[sec. 24]*

**Indicator of Attack (IoA)** — Behavior of an attack in progress (vs static IoC). *[sec. 24]*

**Initial Access** — First phase of an attack: how the attacker gets in. *[sec. 16]*

**Injection** — Family of vulns: code inserted where only data should have been. SQLi, XSS, command inj, LDAP inj, etc. *[sec. 10]*

**InfoSec / OPSEC / NetSec / AppSec / DevSecOps** — Sub-disciplines. *[sec. 00]*

**IoT** — Internet of Things. Connected devices (smart home, industry). *[sec. 20]*

**ISMS** (Information Security Management System) — Management framework (ISO 27001). *[sec. 25]*

**ISO 27001/27002** — International ISMS standard. *[sec. 25]*

## J

**JADX** — Android decompiler (DEX → Java). *[sec. 17]*

**JEA / JIT** (Just Enough / Just In Time Admin) — AD/PAM model for temporary privileges. *[sec. 13]*

**JTAG / SWD** — Hardware debug interfaces. *[sec. 21]*

**JWT** (JSON Web Token) — Authentication token with signature. `header.payload.signature`. Many attacks: alg none, HS/RS confusion, weak secret. *[sec. 05, 11]*

## K

**Kali Linux** — Offensive distribution with pre-installed tools. *[sec. 02]*

**KDC** (Key Distribution Center) — Kerberos component that issues tickets. On the DC. *[sec. 13]*

**Kerberos** — AD authentication protocol based on encrypted tickets. *[sec. 13]*

**KEV** (Known Exploited Vulnerabilities) — CISA catalog of CVEs actively exploited. *[sec. 25]*

**KQL** — Kusto Query Language of Microsoft Sentinel/Defender. *[sec. 23]*

**KSP** (Key Storage Provider) — On Windows, key store. *[sec. 06]*

**krbtgt** — Special AD account whose password encrypts all TGTs. krbtgt hash = golden ticket. *[sec. 13]*

## L

**LAPS** (Local Administrator Password Solution) — Microsoft tool that rotates the local admin password per host. *[sec. 13]*

**LDAP** — Lightweight Directory Access Protocol. AD uses it. *[sec. 13]*

**libc** — Standard C library on Linux (glibc, musl). *[sec. 14]*

**Little/Big endian** — See Endianness.

**ligolo-ng** — Modern pivoting tool (tun-mode). *[sec. 12]*

**Linux capabilities** — See Capability.

**LLM** — Large Language Model (GPT, Claude, etc.). New attack surface (sec. 27).

**LLMNR / NBT-NS** — Legacy name resolution protocols on Windows. Vulnerable to Responder. *[sec. 12, 13]*

**Load Balancer** — Distributes traffic among backends. *[sec. 03]*

**LoLBin / LoLBAS** (Living Off the Land Binaries) — Microsoft-signed binaries reused for malicious purposes (certutil, bitsadmin, etc.). *[sec. 16]*

**LPE / EoP** (Local Privilege Escalation / Elevation of Privilege) — From user → root/SYSTEM. *[sec. 00]*

**LSASS** — Local Security Authority Subsystem Service. Windows process that manages credentials. Mimikatz's favorite target. *[sec. 06, 13]*

## M

**MAC address** — Physical network card address (48 bit). *[sec. 03]*

**MAC** (Message Authentication Code) — Function that guarantees integrity+authenticity with a key. HMAC. *[sec. 05]*

**Malware** — Malicious software (virus, RAT, ransomware, rootkit, ...). *[sec. 16]*

**MD5** — Legacy 128-bit hash. **Broken.** *[sec. 05]*

**Memory forensics** — Analysis of RAM dumps (Volatility). *[sec. 22]*

**MFA / 2FA** — Multi-Factor Authentication. *[sec. 25]*

**Mimikatz** — Benjamin Delpy's tool to extract credentials from Windows memory. *[sec. 06, 13]*

**MISP** (Malware Information Sharing Platform) — Open source platform for CTI exchange. *[sec. 24]*

**MITRE** — Non-profit org. Publishes ATT&CK, ATLAS, CVE. *[sec. 16, 24]*

**MITM** (Man-In-The-Middle) — Attacker in the middle of a communication. *[sec. 03, 12]*

**MTTD / MTTR** (Mean Time to Detect / Respond) — SOC metrics. *[sec. 23]*

**MTU** (Maximum Transmission Unit) — Max packet size. *[sec. 03]*

**Mutex** — Windows kernel synchronization object. Malware often checks for mutex existence before launching (avoids double instance). *[sec. 16]*

## N

**Namespace** (Linux) — Resource isolation (mnt, pid, net, user, ...). Foundation of containers. *[sec. 06]*

**NAT** (Network Address Translation) — IP rewriting by router (private → public). *[sec. 03]*

**NDR** (Network Detection and Response) — ML-based traffic sensor. ExtraHop, Vectra, Darktrace. *[sec. 23]*

**NDS / NFS / SMB** — Network filesystems. *[sec. 09]*

**NetExec / CrackMapExec** — Internal AD pentest tool. *[sec. 13]*

**NIS / NIS2** — EU directive on cybersecurity of critical sectors. NIS2 in force 2024. *[sec. 25, 31]*

**NIST CSF** (Cybersecurity Framework) — US strategic framework, 6 functions. *[sec. 25]*

**Nmap** — Network mapper / port scanner. *[sec. 09]*

**Non-repudiation** — Guarantee that the author cannot deny. Digital signatures. *[sec. 05]*

**Nonce** — Number used once. Random to prevent replay. *[sec. 05]*

**ntdll** — Windows userland library that bridges to kernel syscalls. EDR hooking target. *[sec. 06]*

**NTDS.dit** — AD database on the DC. Contains hashes of all users. *[sec. 13]*

**NTLM** — Legacy Microsoft auth protocol (predates Kerberos). MD4 hash of the password. *[sec. 13]*

**Nuclei** — Vulnerability scanner based on YAML templates. *[sec. 09]*

## O

**OAuth 2.0 / OIDC** — Delegated authorization framework / identity layer. *[sec. 11]*

**ObjC / Cocoa** — macOS/iOS languages/frameworks. *[sec. 17]*

**OAEP** (Optimal Asymmetric Encryption Padding) — Secure padding for RSA encryption. *[sec. 05]*

**OOB** (Out-of-Band) — Communication outside the main channel. OOB SQLi via DNS. *[sec. 10]*

**OPA** (Open Policy Agent) — Policy-as-code engine (REGO). *[sec. 19, 25]*

**OPSEC** (Operations Security) — Discipline of leaving no traces. *[sec. 26]*

**OS** — Operating System (Linux, Windows, macOS, ...). *[sec. 06]*

**OSI** — 7-layer network model. Didactic. *[sec. 03]*

**OSINT** — Open Source Intelligence. *[sec. 08]*

**OSCP / OSEP / OSWE / OSED** — Offensive Security offensive certs. *[sec. 28]*

**OWASP** — Open Web Application Security Project. Top 10 + ASVS + ZAP. *[sec. 10]*

## P

**PAC** (Pointer Authentication Code) — ARM mitigation: signs pointers. *[sec. 14]*

**PAM** (Pluggable Authentication Modules) — Linux auth framework. *[sec. 02]*

**PaaS / IaaS / SaaS** — Cloud service models. *[sec. 18]*

**PCI-DSS** — Contractual standard for credit card processors. *[sec. 25]*

**PE** (Portable Executable) — Windows binary format. *[sec. 06, 15]*

**Pegasus** — Commercial spyware from NSO group. *[sec. 17]*

**PEM** — ASCII format for keys/certs. Base64 + delimiters `-----BEGIN ...-----`. *[sec. 05]*

**Pentest** — Penetration test. *[sec. 26]*

**PHP** — Server-side web language. Historical, still popular. *[sec. 10]*

**PII** (Personally Identifiable Information) — Personal data. *[sec. 25]*

**PIE** (Position Independent Executable) — Binary compiled to be ASLR-compatible. *[sec. 01, 14]*

**Pipeline** (CI/CD) — Automated build/test/deploy. DevSecOps gates. *[sec. 25]*

**PKI** (Public Key Infrastructure) — System of CAs, certificates, validation. *[sec. 05]*

**PMF** (Protected Management Frames) — 802.11w extension that protects WiFi management frames. Mandatory in WPA3. *[sec. 20]*

**PoC** (Proof of Concept) — Code that demonstrates a vuln without claiming to be weaponized. *[sec. 00]*

**Pod (Kubernetes)** — K8s deployment unit. 1+ containers. *[sec. 19]*

**Port forwarding** — Redirect traffic between ports/hosts. SSH -L/-R. *[sec. 02]*

**Pre-image** — Input that produces a given hash output. Secure hash = pre-image resistant. *[sec. 05]*

**Prepared statement** — SQL query with placeholders for parameters. SQLi mitigation. *[sec. 10]*

**Process Hollowing** — Malware technique: starts a legitimate process suspended, replaces the section, resumes. *[sec. 16]*

**Prowler** — Open source cloud audit tool. *[sec. 18]*

**PRT** (Primary Refresh Token) — Microsoft Entra ID token on joined workstations. Target of "pass-the-PRT". *[sec. 13]*

**PSK** (Pre-Shared Key) — WiFi WPA2/WPA3-Personal passphrase. *[sec. 20]*

**Purple team** — Coordinated red+blue exercise. *[sec. 26]*

**pwntools** — Python library for exploit dev/CTF. *[sec. 07]*

## Q

**QUIC** — Transport protocol over UDP, foundation of HTTP/3. *[sec. 04]*

## R

**RAM** — PC volatile memory. *[sec. 01]*

**Ransomware** — Malware that encrypts files and demands a ransom. *[sec. 16]*

**RBAC** (Role-Based Access Control) — Role-based permissions. *[sec. 19]*

**RBCD** (Resource-Based Constrained Delegation) — AD attack based on modification of `msDS-AllowedToActOnBehalfOfOtherIdentity`. *[sec. 13]*

**RCE** (Remote Code Execution) — Remote code execution. *[sec. 00]*

**RDP** (Remote Desktop Protocol) — Microsoft protocol for remote desktop. *[sec. 03]*

**RE / Reverse Engineering** — *[sec. 15]*

**Redirector** — "Bounce" server in red team that proxies C2 traffic. *[sec. 26]*

**Registry (Windows)** — Hierarchical config DB. *[sec. 06]*

**RegRipper** — Forensics tool for registry parsing. *[sec. 22]*

**RELRO** — Linux mitigation: read-only GOT. *[sec. 14]*

**Responder** — Tool that captures LLMNR/NBT-NS poison + NTLM relay. *[sec. 12]*

**REST** — HTTP API architecture. *[sec. 11]*

**RFC** — Request for Comments. Internet standards. *[sec. 04]*

**RFID / NFC** — Short-range wireless technologies. *[sec. 20]*

**RIP** — x86-64 CPU register: instruction pointer. *[sec. 01, 01b]*

**ROE** (Rules of Engagement) — Contractual document for pentest/red team. *[sec. 26]*

**ROP** (Return-Oriented Programming) — Exploit technique that chains existing gadgets via `ret`. *[sec. 14]*

**Rootkit** — Kernel-level malware that hides itself. *[sec. 06, 16]*

**RPC** — Remote Procedure Call. *[sec. 09]*

**rsync** — Incremental copy tool on Linux. *[sec. 02]*

## S

**SAML** — XML standard for SSO. *[sec. 11]*

**Sandbox** — Isolated environment where untrusted code is executed. *[sec. 06, 16]*

**SAN** (Subject Alternative Name) — List of hosts covered by an X.509 certificate. *[sec. 04]*

**SAST** (Static Application Security Testing) — Static code analysis. *[sec. 07]*

**Scapy** — Python library for packet construction/sniffing. *[sec. 07]*

**SCAP** (Security Content Automation Protocol) — NIST standard for compliance checks. *[sec. 25]*

**SCM** (Service Control Manager) — Manages Windows services. *[sec. 06]*

**seccomp** — Linux syscall filter. *[sec. 06]*

**Sec-WebSocket-Accept** — WS handshake header. *[sec. 04]*

**SELinux** — MAC kernel module for Linux. *[sec. 06]*

**SHA-1 / SHA-256** — Hash family. SHA-1 dead, SHA-256 standard. *[sec. 05]*

**Shellcode** — Sequence of asm instructions that spawns a shell or equivalent, embedded in an exploit. *[sec. 14]*

**SIEM** — Security Information and Event Management. Splunk, ES, Sentinel. *[sec. 23]*

**Sigma** — YAML format for detection rules, convertible to SIEM-specific. *[sec. 16, 23]*

**SIM swap** — Social engineering attack on a mobile carrier to hijack SMS 2FA. *[sec. 25]*

**Skiddie / Script kiddie** — Someone who uses tools without understanding. *[sec. 00]*

**Sliver** — Open source C2 framework. *[sec. 26]*

**SMB** — Server Message Block. Microsoft file sharing protocol. *[sec. 09]*

**SOAR** — Security Orchestration, Automation, Response. Automated playbooks. *[sec. 23]*

**SOC** (Security Operations Center) — Team that monitors 24/7. *[sec. 23]*

**Socket** — Network communication endpoint (IP+port+proto). *[sec. 01]*

**SOC 2** — American standard for service organizations (AICPA). *[sec. 25]*

**SOP** (Same-Origin Policy) — Basic browser security: JS from one origin cannot read responses from others. *[sec. 04]*

**SPF** (Sender Policy Framework) — DNS record for email anti-spoofing. *[sec. 25]*

**SPN** (Service Principal Name) — Identifies a service in AD. Basis of Kerberoasting. *[sec. 13]*

**SQL injection** — *[sec. 10, 10b]*

**SSH** — Secure Shell. *[sec. 02]*

**SSL / TLS** — Transport encryption protocol. SSL legacy, TLS current. *[sec. 04, 05]*

**SSRF** — Server-Side Request Forgery. *[sec. 10, 11]*

**SSO** — Single Sign-On. Centralized identity. *[sec. 11]*

**SSTI** — Server-Side Template Injection. *[sec. 11]*

**Stack** — LIFO memory area. Local variables, return address. *[sec. 01, 01b]*

**STIX / TAXII** — CTI exchange standards. *[sec. 24]*

**STRIDE** — Microsoft's threat modeling framework. *[sec. 25]*

**Subdomain takeover** — When a subdomain points to a decommissioned service that the attacker can claim. *[sec. 08]*

**SUID / setuid** — Unix bit: the program runs with the owner's UID. *[sec. 01]*

**Sysmon** — Detailed telemetry Windows driver. *[sec. 06, 23]*

**syscall** — System call from user mode to kernel. *[sec. 01, 06]*

## T

**TCP / UDP** — Transport protocols. TCP connection-oriented, UDP not. *[sec. 03]*

**TGT / TGS** — Kerberos ticket: granting + service. *[sec. 13]*

**Threat Hunting** — Proactive search for attackers. *[sec. 23]*

**Threat Model** — Analysis of threats + mitigations. STRIDE, PASTA. *[sec. 25]*

**TLS** — See SSL.

**TOCTOU** (Time-of-Check vs Time-of-Use) — Typical race condition. *[sec. 01, 11]*

**Token (Windows)** — Kernel structure that represents a process's security context. *[sec. 06]*

**Tor** — Anonymization network. *[sec. 26]*

**TPM** (Trusted Platform Module) — Hardware chip for keys and attestation. *[sec. 05, 06]*

**Trojan** — Malware disguised as legitimate. *[sec. 16]*

**TTP** — Tactics, Techniques, Procedures (MITRE). *[sec. 24]*

## U

**UAC** (User Account Control) — Windows elevation prompt. *[sec. 06]*

**UDP** — See TCP.

**Unicode** — Character encoding standard (UTF-8, UTF-16). Source of parsing tricks. *[sec. 02b]*

**UNIX** — OS family (Linux, BSD, macOS). *[sec. 02]*

**URL** — Uniform Resource Locator. *[sec. 04]*

**USB** — Universal Serial Bus. Attack vector (BadUSB, USB drop). *[sec. 16]*

## V

**Velociraptor** — DFIR live response tool. *[sec. 22]*

**Virtual Machine** (VM) — Emulated system (VirtualBox, VMware, KVM). *[sec. 00]*

**Volatility** — Memory forensics tool. *[sec. 22]*

**VPN** — Virtual Private Network. *[sec. 03]*

**VPS** — Virtual Private Server. *[sec. 26]*

## W

**WAF** (Web Application Firewall) — Filters malicious HTTP requests. *[sec. 04, 09]*

**WebAuthn** — See FIDO2.

**WHOIS** — Domain registration database. *[sec. 08]*

**WiFi / 802.11** — Wireless standard. *[sec. 20]*

**WinRM** — Windows Remote Management (port 5985/5986). *[sec. 13]*

**WMI** (Windows Management Instrumentation) — Management framework + often persistence/lateral vector. *[sec. 06]*

**Worm** — Malware that propagates autonomously. *[sec. 16]*

**WPA2 / WPA3** — WiFi security standards. *[sec. 20]*

**Write-up** — Publication that describes how a challenge was solved / a vuln was discovered. *[sec. 28]*

## X

**X.509** — Certificate standard. *[sec. 04, 05]*

**XDR** (Extended Detection and Response) — Unified EDR+NDR+cloud+identity platform. *[sec. 23]*

**XOR** — Bitwise operation: $a \oplus b = (a \lor b) \land \lnot(a \land b)$. Self-inverse. *[sec. 00b]*

**XSS** (Cross-Site Scripting) — JS injection into the victim's browser. *[sec. 10]*

**XXE** (XML External Entity) — External entity injection into XML parsers → LFI/SSRF. *[sec. 10]*

## Y

**YARA** — Pattern matching tool for files. *[sec. 16]*

## Z

**Zero-day (0-day)** — Vuln without known patch. *[sec. 00]*

**Zero Trust** — Security model: "never trust, always verify". *[sec. 00, 03]*

**Zeek (Bro)** — Network sensor, produces structured logs. *[sec. 22, 23]*

---

> Missing a term? Add it as a mental issue and look it up in the sections of the path (the reference section is cited next to the entry).
