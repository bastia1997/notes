---
title: "Math and computation theory (the bare minimum, integrated)"
area: "Prerequisites"
order: 0.5
level: "beginner"
summary: "Everything you need from math and computer science to avoid getting stuck in the advanced chapters: sets, boolean logic, modular arithmetic, primes and factorization, computational complexity, probability, information theory. No painkillers, no gratuitous abstraction."
prereq:
  - "Middle-school arithmetic"
tools:
  - "Pen and paper"
  - "Python REPL (to verify)"
---

# Math and computation theory

> You cannot understand why RSA works if you have no clue what "x mod n" means. You cannot understand why bcrypt is "deliberately slow" without understanding complexity. You cannot judge the security of a password without understanding entropy. This section is the **minimum package** so you don't get blocked. I explain only what you'll actually need.

## Sets and functions (in 3 minutes)

A **set** is a collection of distinct elements: $\{1, 2, 3\}$. We write $x \in A$ ("x belongs to A").

Sets that matter in security:
- $\mathbb{Z}$ — integers: $\{..., -2, -1, 0, 1, 2, ...\}$
- $\mathbb{N}$ — naturals: $\{0, 1, 2, ...\}$
- $\mathbb{Z}_n$ — integers modulo $n$: $\{0, 1, ..., n-1\}$. It's a circle: after $n-1$ you go back to $0$.
- $\{0,1\}^n$ — binary strings of $n$ bits. The set of fixed-size "messages".

A **function** $f: A \to B$ takes an input from $A$ and produces an output in $B$. Key concepts for security:

- **Injective** (one-to-one): different inputs → different outputs. No collisions.
- **Surjective** (onto): every output in $B$ is reachable.
- **Bijective**: both → invertible. A cipher *must* be bijective (otherwise you lose data).
- **One-way**: easy to compute $f(x)$, hard to compute $f^{-1}(y)$. **Hash functions are one-way** (ideally).
- **Trapdoor one-way**: same as above, but with a *secret* you can invert easily. **RSA is a trapdoor**: whoever has the private key inverts; everyone else can't.

### Visual example

```
SHA-256 hash function:
       any input                                output: 256 bits
  ┌───────────────────────────┐         ┌──────────────────────────────┐
  │ "ciao"                    │ ──f──▶  │ b133a0c0e9bee3be20163d2ad9 ..│
  │ "ciao mondo!"             │ ──f──▶  │ 8e0e5b3cd83d2c25b18a86ef0e ..│
  │ 4 GB of video             │ ──f──▶  │ 9d5e3c3a1f8a3e5b3cd83d2c25 ..│
  └───────────────────────────┘         └──────────────────────────────┘
                                          ▲
                                          │  All outputs are 256 bits.
                                          │  Knowing only the output, there's
                                          │  no "easy" way back to the input.
```

## Boolean logic — the algebra of bits

A **bit** is 0 or 1. **Three operations**:

| Op | Symbol | Table |
|---|---|---|
| AND | $\land$ or `&` | $0\land 0 = 0$, $0\land 1 = 0$, $1\land 1 = 1$ |
| OR | $\lor$ or `|` | $0\lor 0 = 0$, $0\lor 1 = 1$, $1\lor 1 = 1$ |
| XOR | $\oplus$ or `^` | $0\oplus 0 = 0$, $0\oplus 1 = 1$, $1\oplus 1 = 0$ |
| NOT | $\lnot$ or `~` | $\lnot 0 = 1$, $\lnot 1 = 0$ |

**Crucial XOR properties** (memorize them):
1. **Self-inverse**: $a \oplus a = 0$.
2. **Identity**: $a \oplus 0 = a$.
3. **Commutative**: $a \oplus b = b \oplus a$.
4. **Associative**: $(a \oplus b) \oplus c = a \oplus (b \oplus c)$.

From (1) and (2) follows the foundation of **half of all cryptography**:

$$ c = m \oplus k \quad\Rightarrow\quad c \oplus k = m \oplus k \oplus k = m $$

That is: you encrypt by XOR-ing the message with a key. **You decrypt by XOR-ing again with the same key**. If $k$ is truly random and used only once, this is the **one-time pad**, the only **perfect** cipher (Shannon 1949).

**So why don't we use OTP for everything?** Because the key must be as long as the message and never reused. Logistically impractical.

### Numerical XOR example by hand

Message: `0110 1001` (binary; in ASCII this is `i`, 0x69)
Key:     `1010 0011` (random)

```
  0110 1001   ← m
^ 1010 0011   ← k
─ ─────────
  1100 1010   ← c
```

To decrypt:
```
  1100 1010   ← c
^ 1010 0011   ← k
─ ─────────
  0110 1001   ← m  (recovered!)
```

Exercise: take `m = 0b01000001` (the letter 'A') and `k = 0b00001111`. Compute $c$ by hand. Verify with Python: `0b01000001 ^ 0b00001111`.

## Modular arithmetic (the math of the Internet)

Given $n > 0$, **modulo $n$** means "keep only the remainder of the division by $n$".

$$ 23 \mod 7 = 2 \quad(\text{because } 23 = 3 \cdot 7 + 2)$$

$$ -3 \mod 7 = 4 \quad(\text{in Python}\colon -3\%7 = 4) $$

**Think of it as a clock.** On a 12-hour clock: 14:00 = 2:00. It's arithmetic modulo 12.

<figure class="diagram">
<svg viewBox="-150 -150 300 300" width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <circle cx="0" cy="0" r="120" fill="none" stroke="#00e6ff" stroke-width="2"/>
  <g font-family="JetBrains Mono, monospace" font-size="14" fill="#e8eef0" text-anchor="middle" dominant-baseline="middle">
    <text x="0"   y="-138">0/12</text>
    <text x="69"  y="-119">1</text>
    <text x="119" y="-69">2</text>
    <text x="138" y="0">3</text>
    <text x="119" y="69">4</text>
    <text x="69"  y="119">5</text>
    <text x="0"   y="138">6</text>
    <text x="-69" y="119">7</text>
    <text x="-119" y="69">8</text>
    <text x="-138" y="0">9</text>
    <text x="-119" y="-69">10</text>
    <text x="-69" y="-119">11</text>
  </g>
  <!-- arrow showing 14 → 2 -->
  <line x1="0" y1="0" x2="100" y2="-58" stroke="#00ff9c" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="0" y1="0" x2="-58" y2="-100" stroke="#ff3da6" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arr2)"/>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#00ff9c"/>
    </marker>
    <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#ff3da6"/>
    </marker>
  </defs>
  <text x="0" y="0" font-family="JetBrains Mono, monospace" font-size="10" fill="#ffe066" text-anchor="middle">mod 12</text>
</svg>
<figcaption>Clock modulo 12 — green: position "2", magenta: "14" which lands on the same spot</figcaption>
</figure>

### Operations mod $n$

- **Addition:** $(a + b) \mod n$. E.g.: $(5+9) \mod 7 = 14 \mod 7 = 0$.
- **Multiplication:** $(a \cdot b) \mod n$. E.g.: $(4 \cdot 5) \mod 7 = 20 \mod 7 = 6$.
- **Power:** $a^k \mod n$. E.g.: $3^4 \mod 7 = 81 \mod 7 = 4$.

In Python: `pow(3, 4, 7)` → 4. The 3-argument form is optimized and handles huge numbers.

### Multiplicative inverse

The **inverse of $a$ modulo $n$** is that $b$ such that $a \cdot b \equiv 1 \pmod{n}$.

It exists **if and only if** $\gcd(a, n) = 1$ (i.e. $a$ and $n$ are **coprime**). It's computed with the **extended Euclidean algorithm**, or in Python: `pow(a, -1, n)`.

Example: inverse of $3$ mod $11$. $3 \cdot 4 = 12 \equiv 1 \pmod{11}$. So $3^{-1} \equiv 4$.

### Greatest Common Divisor (GCD) — Euclid's algorithm

$\gcd(a, b)$ = the largest integer that divides both $a$ and $b$. Algorithm:

```python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

print(gcd(48, 18))   # → 6
```

By hand:
```
gcd(48, 18)
  48 = 2·18 + 12   → gcd(18, 12)
  18 = 1·12 + 6    → gcd(12, 6)
  12 = 2·6 + 0     → gcd(6, 0) = 6
```

### Prime numbers and Fermat's theorem (mini)

**Prime**: divisible only by 1 and itself. $2, 3, 5, 7, 11, 13, ...$.

**Fermat's little theorem**: if $p$ is prime and $\gcd(a, p) = 1$, then $a^{p-1} \equiv 1 \pmod{p}$.

Example: $p = 7, a = 3$. $3^6 = 729 = 104 \cdot 7 + 1$. So $3^6 \equiv 1 \pmod 7$. ✅

From this comes Fermat's **primality test**: if $a^{p-1} \not\equiv 1 \pmod{p}$, then $p$ is NOT prime. (The converse doesn't always hold → in practice we use Miller-Rabin.)

### Euler's totient function $\varphi(n)$

$\varphi(n)$ = how many integers in $[1, n-1]$ are coprime to $n$.

- If $p$ is prime: $\varphi(p) = p - 1$ (all except 0).
- If $n = p \cdot q$ (both distinct primes): $\varphi(n) = (p-1)(q-1)$. **This is the RSA formula.**

**Euler's theorem**: if $\gcd(a, n) = 1$, then $a^{\varphi(n)} \equiv 1 \pmod{n}$.

From here, RSA: by choosing $e$ and $e^{-1} = d$ mod $\varphi(n)$, you get $m^{ed} = m^{1 + k\varphi(n)} = m \cdot (m^{\varphi(n)})^k = m$. **Mathematical magic turned into software.**

### "Pocket-sized" RSA example (we'll see the "real" example in 05b)

Let $p = 11, q = 13$.
- $n = pq = 143$.
- $\varphi(n) = 10 \cdot 12 = 120$.
- Choose $e = 7$ (must be coprime with 120). $\gcd(7, 120) = 1$ ✅.
- Compute $d = 7^{-1} \mod 120$. Check: $7 \cdot 103 = 721 = 6 \cdot 120 + 1$. So $d = 103$.
- Public key: $(n, e) = (143, 7)$. Private key: $(n, d) = (143, 103)$.

Encrypt the message $m = 9$:
$$c = m^e \mod n = 9^7 \mod 143$$

$9^7 = 4{,}782{,}969$. $4{,}782{,}969 \mod 143 = 48$ (check: $4{,}782{,}969 = 33{,}447 \cdot 143 + 48$).

Decrypt:
$$m = c^d \mod n = 48^{103} \mod 143 = 9 \quad ✅$$

(`pow(48, 103, 143)` in Python → 9). **It works.**

## Computational complexity ($O$ notation)

How does the runtime of an algorithm grow as a function of input size $n$?

| Notation | Practical meaning |
|---|---|
| $O(1)$ | constant (hash table lookup) |
| $O(\log n)$ | logarithmic (binary search) |
| $O(n)$ | linear (list scan) |
| $O(n \log n)$ | efficient sort (quicksort, merge sort) |
| $O(n^2)$ | two nested loops (bubble sort) |
| $O(2^n)$ | exponential (brute force over $n$ key bits) |
| $O(n!)$ | factorial (permutations) |

In security:
- AES-128 has 128-bit keys → brute force = $2^{128}$ attempts. Even at $10^{18}$ op/sec it would take $\sim 10^{19}$ years → impossible.
- AES-256 → $2^{256}$. Even more impossible (unless quantum computer + Grover, which reduces it to $2^{128}$, still impossible).
- SHA-256 collisions → "birthday bound" $\sim 2^{128}$.
- bcrypt is **deliberately slow**: every hash costs $\sim 100$ ms instead of $\sim 0.1$ µs → GPU brute force slowed down by a factor of $10^6$.

### Birthday paradox

Probability of collision in $N$ bits after $k$ attempts $\approx k^2 / 2^{N+1}$.

For $N = 256$ you need $k \approx 2^{128}$ attempts for a 50% collision. **This is why SHA-256 has "128-bit security" on collisions, not 256.**

Same principle: in a room of 23 people, there's a 50% chance two share a birthday. Counterintuitive, but pure math.

## Probability (just the minimum)

- $P(A) \in [0, 1]$.
- Independent events: $P(A \land B) = P(A) \cdot P(B)$.
- Union: $P(A \lor B) = P(A) + P(B) - P(A \land B)$.

In security:
- Probability that an 8-char [a-z] password is guessed on the first try: $1 / 26^8 \approx 1/2 \cdot 10^{11}$.
- At 1M attempts/sec: $26^8 / 10^6 \approx 200{,}000$ seconds = 2 days. **8 lowercase password = dead.**

## Entropy (Shannon)

The **entropy** of a random variable $X$ with possible values $x_i$ and probabilities $p_i$:

$$H(X) = -\sum_i p_i \log_2 p_i \quad\text{(in bits)}$$

Meaning: average number of bits needed to describe a value of $X$.

- Fair coin flip: $H = -(0.5 \log_2 0.5 + 0.5 \log_2 0.5) = 1$ bit.
- Biased coin 90/10: $H \approx 0.47$ bits (you already know the answer almost always).
- Uniform distribution over $n$ values: $H = \log_2 n$.

### Password entropy

A random 8-character password from 95 (printable ASCII):
$$H = 8 \log_2(95) \approx 52 \text{ bits}.$$

A 4-word passphrase from a dictionary of 7776 (EFF):
$$H = 4 \log_2(7776) \approx 51.7 \text{ bits}.$$

**Roughly equivalent** from the attacker's standpoint! But the passphrase you can remember.

> **Rule:** **80+ bits of entropy** is today's "safe" minimum (NIST 800-63). **128+ bits** for cryptography.

## Graph theory (a hint: you'll need it in AD)

A **graph** is a pair $(V, E)$ — vertices and edges. In Active Directory hacking, **BloodHound** builds a graph where nodes are users/computers/groups and edges are relationships ("has session on", "can reset the password of"...).

Algorithms: shortest path (Dijkstra, BFS). You hunt for attacker → Domain Admin edges.

```mermaid
graph LR
    A[alice<br/>user] -->|has_session| B[DESKTOP-01<br/>workstation]
    B -->|admin_to| C[SERVER-01<br/>file server]
    C -->|belongs_to| D[SQL_Admins<br/>group]
    D -->|member_of| E[Domain Admins<br/>privileged group]
    style A fill:#0b3a1a,stroke:#00ff9c
    style E fill:#3a0b0b,stroke:#ff4d4d,stroke-width:3px
```

A 4-edge chain says: "compromise alice → pivot to SERVER-01 (she administers it) → become a member of SQL_Admins (service) → Domain Admin". BloodHound finds this chain automatically with a BFS.

## Turing machines & decidability (from a distance)

**A Turing machine** is an abstract model of a computer: a head that reads/writes on a tape, finite states. Anything a computer can do, a TM can do (Church-Turing thesis).

**Halting problem**: given a program $P$ and an input $x$, will it terminate or run forever? **Undecidable** (Turing 1936). No general algorithm can solve it.

**Why should you care?** Security consequences:
- **A perfect antivirus is impossible**: deciding with certainty whether a program is malicious is equivalent to the halting problem → undecidable in general.
- **Perfect decompilation** is the same order of difficulty.
- **All security tools are heuristic** ("good enough" approximations).

## Formal languages (super-fast — section 02b digs deeper)

- **Regular** (regex): recognizes local patterns. Limited (no balanced parentheses).
- **Context-free** (BNF/PEG parsers): parsing of programming languages, HTML, JSON.
- **Context-sensitive, recursively enumerable**: progressively more powerful.

In security, **parser mismatch** between different layers is a huge source of bugs (HTTP smuggling, XML/JSON ambiguity, polyglot files).

## Exercises

### Ex 0b.1 — Modular arithmetic by hand
Compute **by hand** then verify with Python:
1. $(17 + 25) \mod 11$
2. $(5 \cdot 7) \mod 13$
3. $3^{10} \mod 7$
4. $7^{-1} \mod 13$ (use extended Euclid or `pow(7, -1, 13)`)

<details><summary>Solutions</summary>

1. $42 \mod 11 = 9$.
2. $35 \mod 13 = 9$.
3. $3^{10} = 59049$. $59049 = 8435 \cdot 7 + 4$. Result: 4. (Or: $3^6 \equiv 1 \pmod 7$ by Fermat, $3^{10} = 3^6 \cdot 3^4 \equiv 3^4 = 81 \equiv 4$.)
4. $7 \cdot 2 = 14 \equiv 1 \pmod{13}$. So $7^{-1} \equiv 2$.

</details>

### Ex 0b.2 — Real XOR cipher
Decrypt by hand this string encrypted with single-byte XOR and key $k = 0x42$ (ASCII 'B'):

`hex = 2a 27 2d 2d 2e 62 35 2d 36 2d 30`

<details><summary>Solution</summary>

```python
ct = bytes.fromhex("2a 27 2d 2d 2e 62 35 2d 36 2d 30".replace(" ",""))
print(bytes(b ^ 0x42 for b in ct))
# b'hello world'
```

By hand: $0x2a \oplus 0x42 = 0010\,1010 \oplus 0100\,0010 = 0110\,1000 = 0x68 = $ 'h'. And so on.

</details>

### Ex 0b.3 — Pocket-sized RSA
With $p = 7, q = 11$, $e = 7$:
1. Compute $n$, $\varphi(n)$.
2. Compute $d$.
3. Encrypt $m = 5$.
4. Decrypt and verify.

<details><summary>Solution</summary>

$n = 77$, $\varphi = 60$. $d = 7^{-1} \mod 60$. $7 \cdot 43 = 301 = 5 \cdot 60 + 1$, so $d = 43$.

$c = 5^7 \mod 77 = 78125 \mod 77 = 47$ (check: $78125 = 1014 \cdot 77 + 47$).

$m = 47^{43} \mod 77$. With `pow(47, 43, 77)` = 5. ✅

</details>

### Ex 0b.4 — Entropy
Compute the entropy (in bits) of:
1. A 10-digit password.
2. A 12-character password from `[a-zA-Z]`.
3. A 14-character password from `[a-zA-Z0-9]`.
4. A 6-word EFF passphrase (7776 words in the dictionary).
5. A 4-digit PIN.

<details><summary>Solutions</summary>

1. $10 \log_2 10 \approx 33$ bits. **Inadequate.**
2. $12 \log_2 52 \approx 68$ bits. Borderline.
3. $14 \log_2 62 \approx 83$ bits. ✅
4. $6 \log_2 7776 \approx 77.5$ bits. ✅
5. $\log_2 10^4 \approx 13$ bits. **Bad** but on physical cards (with lockout) it's enough.

</details>

### Ex 0b.5 — Birthday bound
SHA-1 has a 160-bit output. How many operations are needed to find a collision with 50% expected probability?

<details><summary>Solution</summary>

$\sim 2^{80}$ operations. SHAttered (Google 2017) reduced this via prefix attack to $\sim 2^{63}$ practical operations. That's why SHA-1 is **dead** for security.

</details>

### Ex 0b.6 — Brute force complexity
A 10-char password from `[a-z0-9]`. The space is $36^{10} \approx 3.6 \cdot 10^{15}$. At 1 GH/s (10^9 hashes/sec): how long to exhaust the whole space?

<details><summary>Solution</summary>

$3.6 \cdot 10^{15} / 10^9 = 3.6 \cdot 10^6$ seconds $\approx 42$ days. **Crackable** on a GPU farm. With a fast hash like NTLM, hours.

</details>

### Ex 0b.7 — Halting problem implication
Explain in 3 lines why no program `is_malware(x)` can exist that decides with certainty whether `x` is malicious for any `x`.

<details><summary>Hint</summary>

The definition of "malicious" is arbitrary; for many categories (e.g., "executes a forbidden syscall"), you'd need a full simulation of `x`, which is equivalent to halting → undecidable. **Every AV vendor** is heuristic (signature + ML + sandbox + behavior) → false positives/negatives are inevitable.

</details>

## Key concepts

1. **XOR** is the foundation of all symmetric cryptography. Self-inverse.
2. **Mod n** is a "clock" — integers on a circle.
3. **Modular exponentiation** + **inverse** = RSA basis.
4. **Coprimality + totient** = basis of the RSA theorem.
5. **Complexity $O$**: $2^{128}$ is impossible, $2^{40}$ is one GPU day.
6. **Entropy $H = -\sum p \log p$**: measures true-random security.
7. **Birthday bound**: $N$-bit hash → $N/2$ collision security.
8. **Halting problem** → a perfect AV is impossible, everything is heuristics.

You now have the tools. Cryptography (sections 5 + 5b) will no longer be magic.
