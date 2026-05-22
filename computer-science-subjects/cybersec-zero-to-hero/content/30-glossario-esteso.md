---
title: "Glossario esteso (250+ termini)"
area: "Reference"
order: 30
level: "principiante"
summary: "Dizionario A-Z di tutti i termini incontrati nel percorso, con spiegazione breve in italiano + dove appaiono per la prima volta. Salvalo, consultalo ogni volta che incontri una sigla."
prereq:
  - "Nessuno: serve come riferimento trasversale"
tools:
  - "Ctrl+F del tuo browser"
---

# Glossario esteso

> Premi `/` (focus search) e digita il termine, oppure Ctrl+F nella pagina.

## A

**ABI** (Application Binary Interface) — Convenzioni binarie tra compilatore e OS: come si passano argomenti, layout struct, calling convention. *[sez. 01b]*

**ACL** (Access Control List) — Lista di permessi su un oggetto (file, registry key, processo). Su Windows ogni oggetto sicuro ha DACL+SACL. *[sez. 01, 06]*

**ACN** — Agenzia per la Cybersicurezza Nazionale italiana, autority NIS2 in IT. *[sez. 25]*

**ADCS** (Active Directory Certificate Services) — La CA aziendale di un dominio AD. Misconfig di template (ESC1-15) = privesc al domain admin. *[sez. 13]*

**AEAD** (Authenticated Encryption with Associated Data) — Cifratura che dà confidenzialità + integrità in unico passaggio. AES-GCM, ChaCha20-Poly1305. *[sez. 05]*

**AES** (Advanced Encryption Standard) — Cifrario simmetrico standard. Block 128 bit, chiavi 128/192/256. Successore di DES. *[sez. 05, 05b]*

**AFL / AFL++** — Fuzzer coverage-guided. Standard per finding bug in parser/binary. *[sez. 14]*

**AMSI** (Antimalware Scan Interface) — API Windows che gli script engines (PowerShell, VBA) usano per mostrare contenuto al AV/EDR prima dell'esecuzione. Bypass = patch in memory. *[sez. 06]*

**ANSI/ASCII** — Standard di codifica caratteri 7-bit (128 valori). Esteso a UTF-8 ovunque oggi. *[sez. 02]*

**APC** (Asynchronous Procedure Call) — Sui Windows, meccanismo per eseguire codice in altri thread. Vettore di injection. *[sez. 16]*

**API** (Application Programming Interface) — Interfaccia software. In security spesso si attaccano API REST/GraphQL. *[sez. 11]*

**APK** — Pacchetto Android (ZIP). Contiene classes.dex + native libs + risorse. *[sez. 17]*

**APT** (Advanced Persistent Threat) — Gruppo di attacco organizzato, spesso state-sponsored, con campagne lunghe e sofisticate. *[sez. 00, 24]*

**ARM/AArch64** — Architettura RISC dominante su mobile, embedded, M1/M2/M3 Mac, AWS Graviton. *[sez. 01b]*

**ARP** (Address Resolution Protocol) — Mappa IP→MAC su LAN. Senza autenticazione → spoofing facile. *[sez. 03, 12]*

**ASLR** (Address Space Layout Randomization) — Randomizza indirizzi di stack/heap/libs/code ad ogni run. Mitigation exploit. *[sez. 01, 14]*

**ASN** (Autonomous System Number) — Identificatore di rete autonoma su Internet (es. AS15169 = Google). *[sez. 08]*

**AS-REP / TGS-REP** — Risposte del KDC nel protocollo Kerberos. Roasting attacks su entrambe. *[sez. 13]*

**ATT&CK (MITRE)** — Framework tassonomico di TTP attaccanti. Lingua franca del settore. *[sez. 16, 23, 24]*

**AV** (Antivirus) — Software che cerca malware noto via signature + ML + comportamento. *[sez. 16]*

## B

**BCD** (Boot Configuration Data) — Database di config boot su Windows. *[sez. 06]*

**BCRYPT / bcrypt** — KDF lenta per password, basata su Blowfish. Alternativa a Argon2 / scrypt. *[sez. 05]*

**Beacon** — Termine generico per implant C2 che fa periodically check-in. Cobalt Strike usa "beacon" come nome. *[sez. 16, 26]*

**BFLA** (Broken Function Level Authorization) — Un utente normale accede a funzioni admin. *[sez. 11]*

**BGP** (Border Gateway Protocol) — Protocollo di routing tra ISP. BGP hijack è un vettore d'attacco a livello internet. *[sez. 03]*

**BIOS / UEFI** — Firmware boot del PC. UEFI moderno, BIOS legacy. *[sez. 06, 21]*

**BLAKE2 / BLAKE3** — Famiglia hash moderna, veloce e sicura. *[sez. 05]*

**Blob storage / Bucket** — Storage object-based di cloud (S3 AWS, Blob Storage Azure, GCS Google). Spesso misconfigurato pubblicamente. *[sez. 18]*

**BloodHound** — Tool per visualizzare e analizzare percorsi di attacco in Active Directory via grafo Neo4j. *[sez. 13]*

**BOLA** (Broken Object Level Authorization) — Sinonimo di IDOR in API REST. Top OWASP API. *[sez. 11]*

**BPF / eBPF** — Berkeley Packet Filter / extended BPF. Linguaggio bytecode sandboxed nel kernel Linux per filtro pacchetti, observability, security. *[sez. 06]*

**Brute force** — Tentare tutte le possibili combinazioni. Limitato da spazio: $2^n$ con $n$ = bit. *[sez. 00b, 05]*

**Bug bounty** — Programma di vendor che paga per vulnerabilità trovate eticamente. HackerOne, Bugcrowd, etc. *[sez. 00, 28]*

**Burp Suite** — Proxy intercept de facto per web pentesting. PortSwigger. *[sez. 10]*

**BYOVD** (Bring Your Own Vulnerable Driver) — Attaccante carica driver firmato ma vulnerabile per disabilitare EDR/AV. *[sez. 06, 26]*

## C

**C2 / C&C** (Command & Control) — Server da cui l'attaccante controlla i malware o gli implant. *[sez. 16, 26]*

**CA** (Certificate Authority) — Entità che emette/firma certificati. *[sez. 04, 05]*

**CABLE** — Vedi BLE.

**Caldera** — Framework MITRE per adversary simulation. *[sez. 23, 26]*

**Canary (stack)** — Valore casuale tra buffer e RIP salvato. Se sovrascritto → abort. Mitigation BoF. *[sez. 01, 14]*

**Capability (Linux)** — Granularità di "root": CAP_NET_ADMIN, CAP_SYS_ADMIN, ecc. Sostituiscono SUID per privilegi specifici. *[sez. 01, 06]*

**CAPI / CRYPTO-API** — API crittografiche Windows. *[sez. 06]*

**CASB** (Cloud Access Security Broker) — Gateway tra utenti e cloud apps, applica policy. *[sez. 18]*

**CBC** (Cipher Block Chaining) — Modalità AES con concatenazione blocchi via XOR. Senza MAC vulnerabile a padding oracle. *[sez. 05, 05b]*

**CFAA** (Computer Fraud and Abuse Act) — Legge USA su crimini informatici. Equivalente del 615-ter italiano. *[sez. 00]*

**CFG** (Control Flow Guard) — Mitigation Windows: indirect call solo verso target validi. *[sez. 14]*

**ChaCha20** — Stream cipher moderno (Bernstein). Combinato con Poly1305 → AEAD. *[sez. 05]*

**CIDR** — Notazione "192.168.1.0/24" per subnet. *[sez. 03]*

**CIEM** (Cloud Infrastructure Entitlements Management) — Tool per analizzare e gestire permessi IAM cloud. *[sez. 18]*

**CIS** (Center for Internet Security) — Org no-profit che pubblica controls v8 + benchmark di configurazione. *[sez. 25]*

**Cloak / Cloaking** — Tecnica con cui server restituisce contenuto diverso a IP differenti (es. malware vs ricercatore). *[sez. 16]*

**Cluster Bomb / Pitchfork / Sniper** (Burp Intruder) — Modalità di attack iterativo. *[sez. 10]*

**CN** (Common Name) — Campo nei certificati X.509, oggi sostituito da SAN. *[sez. 04]*

**Cobalt Strike** — C2 framework commerciale, standard industria. *[sez. 26]*

**Container** — Processo Linux isolato via namespaces+cgroups. Non è una VM. *[sez. 19]*

**Cookie** — Piccolo dato che il server setta sul browser, rinviato in ogni request. Sessioni. *[sez. 04]*

**CORS** (Cross-Origin Resource Sharing) — Header HTTP che rilassa Same-Origin Policy. Misconfig comuni. *[sez. 04, 10]*

**Crypt / crypt(3)** — Funzione legacy Unix per password hashing. *[sez. 05]*

**CSP** (Content Security Policy) — Header HTTP che restringe risorse caricabili dalla pagina. Mitigation XSS. *[sez. 04]*

**CSPM** (Cloud Security Posture Management) — Tool per audit continuo di config cloud. Prowler, Wiz, etc. *[sez. 18]*

**CSRF** (Cross-Site Request Forgery) — Forza browser di vittima a fare request autenticate verso target. *[sez. 10]*

**CT log** (Certificate Transparency) — Log pubblico di tutti i cert emessi da CA. Pivot OSINT. *[sez. 04, 08]*

**CTF** (Capture The Flag) — Gara/training di security. Jeopardy o A&D. *[sez. 28]*

**CTI** (Cyber Threat Intelligence) — Analisi che produce contesto su minacce. *[sez. 24]*

**CVE** (Common Vulnerabilities and Exposures) — Identificatore univoco di una vuln nota. *[sez. 00]*

**CVSS** (Common Vulnerability Scoring System) — Score 0-10 di gravità di una CVE. *[sez. 00, 24]*

**CWE** (Common Weakness Enumeration) — Tassonomia di tipi di bug (es. CWE-79 = XSS, CWE-89 = SQLi). *[sez. 24]*

## D

**DAC / MAC** (Discretionary / Mandatory Access Control) — Permessi gestiti dall'utente vs imposti dal kernel. *[sez. 06]*

**DACL** (Discretionary ACL) — La parte "permessi" del security descriptor su Windows. *[sez. 06]*

**DAST** (Dynamic Application Security Testing) — Test app in esecuzione (ZAP, Burp Scanner). *[sez. 07]*

**DCSync** — Funzione AD che permette a chi ha privilegio specifico di richiedere replica → leak di tutti gli hash incluso krbtgt. *[sez. 13]*

**DDoS** (Distributed Denial of Service) — DoS distribuito da molte fonti (botnet). *[sez. 03]*

**Decompiler** — Tool che da binario riproduce pseudo-C/Java. Ghidra, Hex-Rays, JADX. *[sez. 15]*

**DEP / NX** (Data Execution Prevention / No-eXecute) — Mitigation: stack/heap non eseguibili. *[sez. 01, 14]*

**DES / 3DES** — Vecchi cifrari simmetrici. **Morti per security moderna.** *[sez. 05]*

**Detection engineering** — Disciplina di scrivere rule SIEM/EDR efficaci con basso falso positivo. *[sez. 23]*

**DH** (Diffie-Hellman) — Algoritmo di key exchange su gruppi. Sicurezza = log discreto. *[sez. 05, 05b]*

**DHCP** (Dynamic Host Configuration Protocol) — Distribuisce IP+gateway+DNS automaticamente. Spoof-able. *[sez. 03, 12]*

**DKIM** (DomainKeys Identified Mail) — Firma email per anti-spoofing. *[sez. 25]*

**DLL** (Dynamic Link Library) — Libreria condivisa Windows (.dll). Sideloading è vettore d'attacco. *[sez. 06]*

**DMARC** — Politica di gestione email che non passano SPF/DKIM. *[sez. 25]*

**DMZ** (Demilitarized Zone) — Subnet di rete esposta a Internet ma isolata da interno. *[sez. 03]*

**DNS** (Domain Name System) — Mappa nomi ↔ IP. *[sez. 03]*

**DNSSEC** — Estensione DNS con firme. Anti-spoofing. *[sez. 03]*

**DoH / DoT** (DNS over HTTPS/TLS) — DNS cifrato. *[sez. 03]*

**DORA** — Regolamento UE 2022/2554 su resilience operativa digitale del settore finanziario. *[sez. 25, 31]*

**DPAPI** (Data Protection API) — API Windows per cifrare dati per-user con master key. *[sez. 13]*

**DPIA** (Data Protection Impact Assessment) — Valutazione obbligatoria GDPR per trattamenti ad alto rischio. *[sez. 25]*

**DPO** (Data Protection Officer) — Responsabile GDPR, obbligatorio in alcuni casi. *[sez. 25]*

## E

**EAP** (Extensible Authentication Protocol) — Framework di autenticazione, usato in 802.1X (WPA-Enterprise). *[sez. 20]*

**ECC** (Elliptic Curve Cryptography) — Crypto su curve ellittiche. Chiavi corte, stessa sicurezza di RSA. *[sez. 05, 05b]*

**ECDH / ECDSA / EdDSA / Ed25519** — Varianti ECC per key exchange / firma. *[sez. 05]*

**EDR** (Endpoint Detection and Response) — Agent endpoint che logga + risponde a minacce. *[sez. 23]*

**ELF** — Executable and Linkable Format. Binari Linux/Unix. *[sez. 15]*

**Endianness** — Ordine byte (little vs big endian). x86 little. *[sez. 01]*

**Entropy** (Shannon) — Misura di incertezza in bit. *[sez. 00b, 05]*

**Entra ID** — Nuovo nome di Azure AD. *[sez. 13, 18]*

**ETD / ETW** (Event Tracing for Windows) — Tracing kernel+user su Windows. EDR si attacca qui. *[sez. 06]*

## F

**Falco** — Runtime detection eBPF-based per Linux/container. *[sez. 19]*

**FIDO2 / WebAuthn** — Standard moderno per MFA senza password (hardware token, biometric). *[sez. 25]*

**FIPS** — Federal Information Processing Standards (NIST). FIPS-140 per cripto, FIPS-197 = AES. *[sez. 05]*

**Forwarder** — Agent SIEM che invia log centralizzati. *[sez. 23]*

**Fuzzing** — Bombardare input casuali per scovare crash. *[sez. 07, 14]*

## G

**GCM** (Galois/Counter Mode) — Modalità AEAD per AES, standard. *[sez. 05]*

**GDPR** — Regolamento UE 2016/679 sulla privacy. *[sez. 00, 25, 31]*

**Ghidra** — Decompiler/disassembler open source di NSA. Standard de facto. *[sez. 15]*

**gMSA** (Group Managed Service Account) — Account servizio AD con password gestita da Microsoft (rotating). *[sez. 13]*

**GOT / PLT** — Global Offset Table / Procedure Linkage Table. Strutture ELF per chiamate dinamiche a funzioni di libreria. Target di ROP attacks. *[sez. 14b]*

**GraphQL** — Query language per API. Diversa attack surface da REST. *[sez. 11]*

**GRC** (Governance Risk Compliance) — Il livello "manageriale" della security. *[sez. 25]*

## H

**Hash** — Funzione one-way fixed-output. SHA-256, MD5 (rotto), etc. *[sez. 05]*

**Hashcat** — GPU-accelerated password cracker. *[sez. 05]*

**Heap** — Area di memoria per allocazioni dinamiche (malloc/free). Bug specifici (UAF, double-free, heap overflow). *[sez. 01, 14]*

**HKLM / HKCU** — Hive del Windows Registry. *[sez. 06]*

**HMAC** — MAC basato su hash. HMAC-SHA-256 standard. *[sez. 05]*

**Honeypot / Honeytoken** — Sistema/oggetto finto per attirare/rilevare attaccanti. *[sez. 23]*

**HSTS** (HTTP Strict Transport Security) — Header che forza HTTPS futuro. *[sez. 04]*

**HTTP / HTTPS** — Protocolli applicativi web. *[sez. 04]*

## I

**IAM** (Identity and Access Management) — Sistema di gestione identità e permessi. *[sez. 18]*

**IDOR** — Insecure Direct Object Reference. Stesso concetto di BOLA. *[sez. 10]*

**IDS / IPS** (Intrusion Detection/Prevention System) — Network sensor di traffico malevolo. Suricata, Snort, Zeek. *[sez. 03, 23]*

**IMDS** (Instance Metadata Service) — Endpoint cloud (169.254.169.254) per credentials e config istanza. v2 mitigation contro SSRF. *[sez. 11, 18]*

**Impacket** — Suite Python di tool per protocolli Microsoft (SMB, Kerberos, MSRPC). *[sez. 13]*

**Indicator of Compromise (IoC)** — Artefatto osservabile di un attacco (hash, IP, domain). *[sez. 24]*

**Indicator of Attack (IoA)** — Comportamento di un attacco in corso (vs statico IoC). *[sez. 24]*

**Initial Access** — Prima fase di un attacco: come l'attaccante entra. *[sez. 16]*

**Injection** — Famiglia di vuln: codice inserito dove dovevano esserci solo dati. SQLi, XSS, command inj, LDAP inj, etc. *[sez. 10]*

**InfoSec / OPSEC / NetSec / AppSec / DevSecOps** — Sotto-discipline. *[sez. 00]*

**IoT** — Internet of Things. Dispositivi connessi (smart home, industria). *[sez. 20]*

**ISMS** (Information Security Management System) — Framework di gestione (ISO 27001). *[sez. 25]*

**ISO 27001/27002** — Standard internazionale ISMS. *[sez. 25]*

## J

**JADX** — Decompiler Android (DEX → Java). *[sez. 17]*

**JEA / JIT** (Just Enough / Just In Time Admin) — Modello AD/PAM di privilegi temporanei. *[sez. 13]*

**JTAG / SWD** — Interfacce hardware di debug. *[sez. 21]*

**JWT** (JSON Web Token) — Token autenticazione con firma. `header.payload.signature`. Molti attacchi: alg none, HS/RS confusion, weak secret. *[sez. 05, 11]*

## K

**Kali Linux** — Distribuzione offensive con tool preinstallati. *[sez. 02]*

**KDC** (Key Distribution Center) — Componente Kerberos che emette ticket. Sul DC. *[sez. 13]*

**Kerberos** — Protocollo autenticazione AD basato su ticket cifrati. *[sez. 13]*

**KEV** (Known Exploited Vulnerabilities) — Catalogo CISA di CVE attivamente sfruttate. *[sez. 25]*

**KQL** — Kusto Query Language di Microsoft Sentinel/Defender. *[sez. 23]*

**KSP** (Key Storage Provider) — Su Windows, store chiavi. *[sez. 06]*

**krbtgt** — Account speciale AD la cui password cifra tutti i TGT. Hash krbtgt = golden ticket. *[sez. 13]*

## L

**LAPS** (Local Administrator Password Solution) — Microsoft tool che rotaper-host la password admin local. *[sez. 13]*

**LDAP** — Lightweight Directory Access Protocol. AD lo usa. *[sez. 13]*

**libc** — Libreria standard C su Linux (glibc, musl). *[sez. 14]*

**Little/Big endian** — Vedi Endianness.

**ligolo-ng** — Tool moderno di pivoting (tun-mode). *[sez. 12]*

**Linux capabilities** — Vedi Capability.

**LLM** — Large Language Model (GPT, Claude, etc.). Nuova attack surface (sez. 27).

**LLMNR / NBT-NS** — Protocolli legacy di name resolution su Windows. Vulnerabili a Responder. *[sez. 12, 13]*

**Load Balancer** — Distribuisce traffico tra backend. *[sez. 03]*

**LoLBin / LoLBAS** (Living Off the Land Binaries) — Binari firmati Microsoft riutilizzati per scopi malevoli (certutil, bitsadmin, etc.). *[sez. 16]*

**LPE / EoP** (Local Privilege Escalation / Elevation of Privilege) — Da user → root/SYSTEM. *[sez. 00]*

**LSASS** — Local Security Authority Subsystem Service. Processo Windows che gestisce credenziali. Target preferito di Mimikatz. *[sez. 06, 13]*

## M

**MAC address** — Indirizzo fisico scheda di rete (48 bit). *[sez. 03]*

**MAC** (Message Authentication Code) — Funzione che garantisce integrità+autenticità con chiave. HMAC. *[sez. 05]*

**Malware** — Software malevolo (virus, RAT, ransomware, rootkit, ...). *[sez. 16]*

**MD5** — Hash legacy 128 bit. **Rotto.** *[sez. 05]*

**Memory forensics** — Analisi di dump RAM (Volatility). *[sez. 22]*

**MFA / 2FA** — Multi-Factor Authentication. *[sez. 25]*

**Mimikatz** — Tool di Benjamin Delpy per estrarre credenziali da memoria Windows. *[sez. 06, 13]*

**MISP** (Malware Information Sharing Platform) — Piattaforma open source per scambio CTI. *[sez. 24]*

**MITRE** — Org no-profit. Pubblica ATT&CK, ATLAS, CVE. *[sez. 16, 24]*

**MITM** (Man-In-The-Middle) — Attaccante in mezzo a comunicazione. *[sez. 03, 12]*

**MTTD / MTTR** (Mean Time to Detect / Respond) — Metriche SOC. *[sez. 23]*

**MTU** (Maximum Transmission Unit) — Dimensione max pacchetto. *[sez. 03]*

**Mutex** — Oggetto sincronizzazione kernel Windows. Spesso malware controlla esistenza di mutex prima di lanciare (evita doppia istanza). *[sez. 16]*

## N

**Namespace** (Linux) — Isolamento risorse (mnt, pid, net, user, ...). Base dei container. *[sez. 06]*

**NAT** (Network Address Translation) — Riscrittura IP da router (privato → pubblico). *[sez. 03]*

**NDR** (Network Detection and Response) — Sensor di traffico ML-based. ExtraHop, Vectra, Darktrace. *[sez. 23]*

**NDS / NFS / SMB** — Filesystem di rete. *[sez. 09]*

**NetExec / CrackMapExec** — Tool di pentest interno AD. *[sez. 13]*

**NIS / NIS2** — Direttiva UE su cybersecurity di settori critici. NIS2 in vigore 2024. *[sez. 25, 31]*

**NIST CSF** (Cybersecurity Framework) — Framework strategico US, 6 funzioni. *[sez. 25]*

**Nmap** — Network mapper / port scanner. *[sez. 09]*

**Non-ripudio** — Garanzia che l'autore non può negare. Firme digitali. *[sez. 05]*

**Nonce** — Number used once. Random per prevenire replay. *[sez. 05]*

**ntdll** — Libreria userland Windows che fa da bridge a syscall kernel. Target di EDR hooking. *[sez. 06]*

**NTDS.dit** — Database AD su DC. Contiene hash di tutti gli utenti. *[sez. 13]*

**NTLM** — Protocollo auth Microsoft legacy (precede Kerberos). Hash MD4 della password. *[sez. 13]*

**Nuclei** — Vulnerability scanner basato su template YAML. *[sez. 09]*

## O

**OAuth 2.0 / OIDC** — Framework di delegated authorization / identity layer. *[sez. 11]*

**ObjC / Cocoa** — Linguaggi/framework macOS/iOS. *[sez. 17]*

**OAEP** (Optimal Asymmetric Encryption Padding) — Padding sicuro per RSA encryption. *[sez. 05]*

**OOB** (Out-of-Band) — Comunicazione fuori dal canale principale. OOB SQLi via DNS. *[sez. 10]*

**OPA** (Open Policy Agent) — Engine policy-as-code (REGO). *[sez. 19, 25]*

**OPSEC** (Operations Security) — Disciplina di non lasciare tracce. *[sez. 26]*

**OS** — Operating System (Linux, Windows, macOS, ...). *[sez. 06]*

**OSI** — Modello a 7 livelli di rete. Didattico. *[sez. 03]*

**OSINT** — Open Source Intelligence. *[sez. 08]*

**OSCP / OSEP / OSWE / OSED** — Cert offensive di Offensive Security. *[sez. 28]*

**OWASP** — Open Web Application Security Project. Top 10 + ASVS + ZAP. *[sez. 10]*

## P

**PAC** (Pointer Authentication Code) — ARM mitigation: firma puntatori. *[sez. 14]*

**PAM** (Pluggable Authentication Modules) — Framework di auth Linux. *[sez. 02]*

**PaaS / IaaS / SaaS** — Modelli di servizio cloud. *[sez. 18]*

**PCI-DSS** — Standard contrattuale per processori di carte di credito. *[sez. 25]*

**PE** (Portable Executable) — Format binari Windows. *[sez. 06, 15]*

**Pegasus** — Spyware commerciale di NSO group. *[sez. 17]*

**PEM** — Format ASCII per chiavi/cert. Base64 + delimitatori `-----BEGIN ...-----`. *[sez. 05]*

**Pentest** — Penetration test. *[sez. 26]*

**PHP** — Linguaggio web server-side. Storico, ancora popolare. *[sez. 10]*

**PII** (Personally Identifiable Information) — Dati personali. *[sez. 25]*

**PIE** (Position Independent Executable) — Binary compilato per essere ASLR-compatibile. *[sez. 01, 14]*

**Pipeline** (CI/CD) — Build/test/deploy automatizzato. DevSecOps gates. *[sez. 25]*

**PKI** (Public Key Infrastructure) — Sistema di CA, certificati, validazione. *[sez. 05]*

**PMF** (Protected Management Frames) — Estensione 802.11w che protegge frame management WiFi. Obbligatoria in WPA3. *[sez. 20]*

**PoC** (Proof of Concept) — Codice che dimostra una vuln senza pretesa di essere weaponized. *[sez. 00]*

**Pod (Kubernetes)** — Unità di deployment K8s. 1+ container. *[sez. 19]*

**Port forwarding** — Reindirizzare traffico tra porte/host. SSH -L/-R. *[sez. 02]*

**Pre-image** — Input che produce un dato output di hash. Hash sicuro = pre-image resistente. *[sez. 05]*

**Prepared statement** — Query SQL con placeholder per parametri. Mitigation SQLi. *[sez. 10]*

**Process Hollowing** — Tecnica malware: avvia processo legitimo sospeso, sostituisce sezione, resume. *[sez. 16]*

**Prowler** — Audit tool cloud open source. *[sez. 18]*

**PRT** (Primary Refresh Token) — Token Microsoft Entra ID su workstation joined. Target di "pass-the-PRT". *[sez. 13]*

**PSK** (Pre-Shared Key) — Passphrase WiFi WPA2/WPA3-Personal. *[sez. 20]*

**Purple team** — Esercizio coordinato red+blue. *[sez. 26]*

**pwntools** — Libreria Python per exploit dev/CTF. *[sez. 07]*

## Q

**QUIC** — Protocollo trasporto su UDP, base di HTTP/3. *[sez. 04]*

## R

**RAM** — Memoria volatile del PC. *[sez. 01]*

**Ransomware** — Malware che cifra file e chiede riscatto. *[sez. 16]*

**RBAC** (Role-Based Access Control) — Permessi basati su ruolo. *[sez. 19]*

**RBCD** (Resource-Based Constrained Delegation) — Attack AD basato su modifica `msDS-AllowedToActOnBehalfOfOtherIdentity`. *[sez. 13]*

**RCE** (Remote Code Execution) — Esecuzione codice da remoto. *[sez. 00]*

**RDP** (Remote Desktop Protocol) — Protocollo Microsoft per desktop remoto. *[sez. 03]*

**RE / Reverse Engineering** — *[sez. 15]*

**Redirector** — Server di "rimbalzo" nel red team che proxy il traffico C2. *[sez. 26]*

**Registry (Windows)** — DB gerarchico di config. *[sez. 06]*

**RegRipper** — Tool forensics di parsing del registry. *[sez. 22]*

**RELRO** — Mitigation Linux: read-only GOT. *[sez. 14]*

**Responder** — Tool che cattura LLMNR/NBT-NS poison + relay NTLM. *[sez. 12]*

**REST** — Architettura API HTTP. *[sez. 11]*

**RFC** — Request for Comments. Standard Internet. *[sez. 04]*

**RFID / NFC** — Tecnologie wireless a corto raggio. *[sez. 20]*

**RIP** — Registro CPU x86-64: instruction pointer. *[sez. 01, 01b]*

**ROE** (Rules of Engagement) — Documento contrattuale per pentest/red team. *[sez. 26]*

**ROP** (Return-Oriented Programming) — Tecnica exploit che concatena gadget esistenti via `ret`. *[sez. 14]*

**Rootkit** — Malware kernel-level che si nasconde. *[sez. 06, 16]*

**RPC** — Remote Procedure Call. *[sez. 09]*

**rsync** — Tool di copia incrementale Linux. *[sez. 02]*

## S

**SAML** — Standard XML di SSO. *[sez. 11]*

**Sandbox** — Ambiente isolato dove eseguire codice non fidato. *[sez. 06, 16]*

**SAN** (Subject Alternative Name) — Lista di host coperti da certificato X.509. *[sez. 04]*

**SAST** (Static Application Security Testing) — Analisi codice statica. *[sez. 07]*

**Scapy** — Libreria Python per costruzione/sniffing pacchetti. *[sez. 07]*

**SCAP** (Security Content Automation Protocol) — Standard NIST per compliance check. *[sez. 25]*

**SCM** (Service Control Manager) — Gestisce servizi Windows. *[sez. 06]*

**seccomp** — Filtro syscall Linux. *[sez. 06]*

**Sec-WebSocket-Accept** — Header WS handshake. *[sez. 04]*

**SELinux** — MAC kernel module Linux. *[sez. 06]*

**SHA-1 / SHA-256** — Famiglia hash. SHA-1 morto, SHA-256 standard. *[sez. 05]*

**Shellcode** — Sequenza istruzioni asm che spawna shell o equivalente, embedded in exploit. *[sez. 14]*

**SIEM** — Security Information and Event Management. Splunk, ES, Sentinel. *[sez. 23]*

**Sigma** — Format YAML per detection rule, convertibile a SIEM-specific. *[sez. 16, 23]*

**SIM swap** — Attacco social engineering su mobile carrier per dirottare SMS 2FA. *[sez. 25]*

**Skiddie / Script kiddie** — Chi usa tool senza capire. *[sez. 00]*

**Sliver** — C2 framework open source. *[sez. 26]*

**SMB** — Server Message Block. Protocollo file sharing Microsoft. *[sez. 09]*

**SOAR** — Security Orchestration, Automation, Response. Playbook automatizzati. *[sez. 23]*

**SOC** (Security Operations Center) — Team che monitora 24/7. *[sez. 23]*

**Socket** — Endpoint di comunicazione di rete (IP+porta+proto). *[sez. 01]*

**SOC 2** — Standard americano per service organization (AICPA). *[sez. 25]*

**SOP** (Same-Origin Policy) — Sicurezza base browser: JS di un origin non legge response di altri. *[sez. 04]*

**SPF** (Sender Policy Framework) — Record DNS anti-spoofing email. *[sez. 25]*

**SPN** (Service Principal Name) — Identifica servizio in AD. Base di Kerberoasting. *[sez. 13]*

**SQL injection** — *[sez. 10, 10b]*

**SSH** — Secure Shell. *[sez. 02]*

**SSL / TLS** — Protocollo cifratura trasporto. SSL legacy, TLS attuale. *[sez. 04, 05]*

**SSRF** — Server-Side Request Forgery. *[sez. 10, 11]*

**SSO** — Single Sign-On. Identità centralizzata. *[sez. 11]*

**SSTI** — Server-Side Template Injection. *[sez. 11]*

**Stack** — Area di memoria LIFO. Variabili locali, return address. *[sez. 01, 01b]*

**STIX / TAXII** — Standard di scambio CTI. *[sez. 24]*

**STRIDE** — Framework threat modeling di Microsoft. *[sez. 25]*

**Subdomain takeover** — Quando un sottodominio punta a un servizio dismesso che l'attaccante può rivendicare. *[sez. 08]*

**SUID / setuid** — Bit Unix: il programma esegue con UID dell'owner. *[sez. 01]*

**Sysmon** — Driver Windows di telemetria dettagliata. *[sez. 06, 23]*

**syscall** — Chiamata di sistema dal user mode al kernel. *[sez. 01, 06]*

## T

**TCP / UDP** — Protocolli trasporto. TCP connection-oriented, UDP no. *[sez. 03]*

**TGT / TGS** — Ticket Kerberos: granting + service. *[sez. 13]*

**Threat Hunting** — Ricerca proactive di attaccanti. *[sez. 23]*

**Threat Model** — Analisi di minacce + mitigation. STRIDE, PASTA. *[sez. 25]*

**TLS** — Vedi SSL.

**TOCTOU** (Time-of-Check vs Time-of-Use) — Race condition tipica. *[sez. 01, 11]*

**Token (Windows)** — Struttura kernel che rappresenta security context di un processo. *[sez. 06]*

**Tor** — Network di anonimizzazione. *[sez. 26]*

**TPM** (Trusted Platform Module) — Chip hardware per chiavi e attestation. *[sez. 05, 06]*

**Trojan** — Malware mascherato da legitimo. *[sez. 16]*

**TTP** — Tactics, Techniques, Procedures (MITRE). *[sez. 24]*

## U

**UAC** (User Account Control) — Prompt elevazione Windows. *[sez. 06]*

**UDP** — Vedi TCP.

**Unicode** — Standard di codifica caratteri (UTF-8, UTF-16). Sorgente di parsing tricks. *[sez. 02b]*

**UNIX** — Famiglia di OS (Linux, BSD, macOS). *[sez. 02]*

**URL** — Uniform Resource Locator. *[sez. 04]*

**USB** — Universal Serial Bus. Vettore di attacco (BadUSB, USB drop). *[sez. 16]*

## V

**Velociraptor** — Tool DFIR live response. *[sez. 22]*

**Virtual Machine** (VM) — Sistema emulato (VirtualBox, VMware, KVM). *[sez. 00]*

**Volatility** — Tool memory forensics. *[sez. 22]*

**VPN** — Virtual Private Network. *[sez. 03]*

**VPS** — Virtual Private Server. *[sez. 26]*

## W

**WAF** (Web Application Firewall) — Filtra request HTTP malevole. *[sez. 04, 09]*

**WebAuthn** — Vedi FIDO2.

**WHOIS** — Database registrazione domini. *[sez. 08]*

**WiFi / 802.11** — Standard wireless. *[sez. 20]*

**WinRM** — Windows Remote Management (porta 5985/5986). *[sez. 13]*

**WMI** (Windows Management Instrumentation) — Framework di gestione + spesso vettore persistence/lateral. *[sez. 06]*

**Worm** — Malware che si propaga autonomamente. *[sez. 16]*

**WPA2 / WPA3** — Standard sicurezza WiFi. *[sez. 20]*

**Write-up** — Pubblicazione che descrive come è stata risolta una challenge / scoperta una vuln. *[sez. 28]*

## X

**X.509** — Standard certificati. *[sez. 04, 05]*

**XDR** (Extended Detection and Response) — Piattaforma unificata EDR+NDR+cloud+identity. *[sez. 23]*

**XOR** — Operazione bit a bit: $a \oplus b = (a \lor b) \land \lnot(a \land b)$. Auto-inversa. *[sez. 00b]*

**XSS** (Cross-Site Scripting) — Iniezione JS nel browser vittima. *[sez. 10]*

**XXE** (XML External Entity) — Iniezione di entità esterne in parser XML → LFI/SSRF. *[sez. 10]*

## Y

**YARA** — Tool pattern matching per file. *[sez. 16]*

## Z

**Zero-day (0-day)** — Vuln senza patch nota. *[sez. 00]*

**Zero Trust** — Modello di sicurezza: "mai fidarsi, sempre verificare". *[sez. 00, 03]*

**Zeek (Bro)** — Sensor di rete, produce log strutturati. *[sez. 22, 23]*

---

> Manca un termine? Aggiungilo come issue mentale e cercalo nelle sezioni del percorso (la sezione di riferimento è citata accanto al lemma).
