---
title: "Topology of R: neighbourhoods, open, closed, compact"
area: Topology
summary: "The formal grammar of \"near\" on $\\mathbb{R}$. What a neighbourhood is, what an accumulation point is, what \"open\" and \"closed\" mean, and why **compact sets** (= closed + bounded) are the real protagonist of analysis."
order: 10
level: intermediate
prereq:
  - "Real numbers and completeness (sup, inf — sec. 06-07)"
  - "Absolute value and inequalities"
  - "Quantifier logic (sec. 01)"
tools:
  - "Rudin — *Principles of Mathematical Analysis*, ch. 2"
  - "Apostol — *Mathematical Analysis*, ch. 3"
---

# Topology of R: neighbourhoods, open, closed, compact

## Why this matters

All of analysis is about **closeness**: the limit of a sequence is "where terms get close", a continuous function is "small change in input → small change in output". To write this rigorously, we need a formal language for "close" and "far".

That language is **topology**. In $\mathbb{R}$ it's very simple — just the distance $d(x, y) = |x - y|$ — but from that single notion grows everything: neighbourhoods, open sets, closed sets, compact sets, connected sets.

The conceptual leap: **stop thinking "numbers are points on a line"** and start thinking "every point lives inside families of neighbourhoods that contain it". It changes how you reason about local properties.

## Quick intuition

A point $x_0 \in \mathbb{R}$ has **neighbourhoods** — open intervals containing it.

A set $A$ is **open** if every point is "comfortably inside": it has a neighbourhood entirely contained in $A$. Example: $(0, 1)$.

A set is **closed** if it contains its "skin": all points "infinitely close" to it. Example: $[0, 1]$.

Compare $(0, 1)$ vs $[0, 1]$:
- $0.9999 \in (0, 1)$? Yes, has neighbourhood $(0.998, 0.9999\dots99)$ all inside. Comfortable.
- $1 \in (0, 1)$? No, *every* neighbourhood touches points outside. It's an **accumulation point** not included: that's why $(0, 1)$ is open but not closed.
- $1 \in [0, 1]$? Yes, the endpoint is included. So $[0, 1]$ is closed.

## Distance and neighbourhoods

### Distance in $\mathbb{R}$

$$d(x, y) := |x - y|, \quad x, y \in \mathbb{R}.$$

> **Glossary:**
>
> - $d(x, y)$ = "distance between $x$ and $y$".
> - $|x - y|$ = absolute value of the difference (sec. 06).
> - Satisfies: $d(x, y) \ge 0$, $d(x, y) = 0 \iff x = y$, $d(x, y) = d(y, x)$, $d(x, z) \le d(x, y) + d(y, z)$ (triangle).

### Spherical neighbourhoods

A **spherical neighbourhood** (or "ball") with center $x_0$ and radius $r > 0$ is
$$B_r(x_0) := \{x \in \mathbb{R} : |x - x_0| < r\} = (x_0 - r,\ x_0 + r).$$

> **Glossary:**
>
> - $B$ = "ball" — in $\mathbb{R}$ it's an open interval, in $\mathbb{R}^2$ a disk, in $\mathbb{R}^3$ a 3D ball.
> - $|x - x_0| < r$ = "distance between $x$ and $x_0$ is less than $r$".
> - $(x_0 - r, x_0 + r)$ = open interval (endpoints excluded).
>
> **Example.** $B_{0.5}(3) = (2.5, 3.5)$.

A general **neighbourhood** of $x_0$ is any set $U$ containing some spherical neighbourhood of $x_0$: $\exists r > 0$ with $B_r(x_0) \subseteq U$.

## Classification of points relative to a set

Let $A \subseteq \mathbb{R}$ and $x_0 \in \mathbb{R}$. Five point types:

- **Interior** to $A$: $\exists r > 0 : B_r(x_0) \subseteq A$.
- **Exterior** to $A$: $\exists r > 0 : B_r(x_0) \subseteq \mathbb{R} \setminus A$.
- **Boundary** of $A$: $\forall r > 0$, $B_r(x_0)$ touches both $A$ and $\mathbb{R} \setminus A$.
- **Accumulation** point of $A$: $\forall r > 0$, $(B_r(x_0) \setminus \{x_0\}) \cap A \ne \emptyset$.
- **Isolated** in $A$: $x_0 \in A$ and $\exists r > 0 : B_r(x_0) \cap A = \{x_0\}$.

> **Crucial distinction.** An accumulation point **may not belong** to $A$ (e.g. $0$ is an accumulation point of $\{1/n : n \ge 1\}$ but isn't in the set). And a point of $A$ may not be an accumulation point (it's isolated).

## Open, closed, closure, interior

- $A$ is **open** if every point is interior.
- $A$ is **closed** if its complement $\mathbb{R} \setminus A$ is open.
- **Interior** $\mathring{A}$ = the set of interior points of $A$. The largest open set in $A$.
- **Closure** $\overline{A}$ = $A$ united with its accumulation points. The smallest closed set containing $A$.
- **Boundary** $\partial A = \overline{A} \setminus \mathring{A}$.

> **In words:**
>
> - Open = "every point has breathing room around it". E.g. $(0, 1)$.
> - Closed = "contains its skin". E.g. $[0, 1]$.
> - Interior = the "belly" without the skin.
> - Closure = the set with its skin attached.
> - Boundary = just the skin.

### Fundamental geometric examples

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="300" fill="#111a30"/>
  <g font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#f3eed9">
    <text x="20" y="30">Types of intervals in R</text>
  </g>
  <line x1="80" y1="80" x2="520" y2="80" stroke="#3a4868" stroke-width="1"/>
  <line x1="160" y1="75" x2="160" y2="85" stroke="#f3eed9" stroke-width="1"/>
  <line x1="440" y1="75" x2="440" y2="85" stroke="#f3eed9" stroke-width="1"/>
  <line x1="160" y1="80" x2="440" y2="80" stroke="#d4af37" stroke-width="4"/>
  <circle cx="160" cy="80" r="6" fill="#111a30" stroke="#d4af37" stroke-width="2"/>
  <circle cx="440" cy="80" r="6" fill="#111a30" stroke="#d4af37" stroke-width="2"/>
  <text x="20" y="84" fill="#f3eed9" font-family="ui-monospace" font-size="12">(a,b)</text>
  <text x="540" y="84" fill="#6fb38a" font-family="ui-monospace" font-size="11">open</text>
  <line x1="80" y1="135" x2="520" y2="135" stroke="#3a4868" stroke-width="1"/>
  <line x1="160" y1="135" x2="440" y2="135" stroke="#e8a04a" stroke-width="4"/>
  <circle cx="160" cy="135" r="6" fill="#e8a04a"/>
  <circle cx="440" cy="135" r="6" fill="#e8a04a"/>
  <text x="20" y="139" fill="#f3eed9" font-family="ui-monospace" font-size="12">[a,b]</text>
  <text x="540" y="139" fill="#e8a04a" font-family="ui-monospace" font-size="11">closed, compact</text>
  <line x1="80" y1="190" x2="520" y2="190" stroke="#3a4868" stroke-width="1"/>
  <line x1="160" y1="190" x2="440" y2="190" stroke="#6aa9d8" stroke-width="4"/>
  <circle cx="160" cy="190" r="6" fill="#6aa9d8"/>
  <circle cx="440" cy="190" r="6" fill="#111a30" stroke="#6aa9d8" stroke-width="2"/>
  <text x="20" y="194" fill="#f3eed9" font-family="ui-monospace" font-size="12">[a,b)</text>
  <text x="540" y="194" fill="#e07a8d" font-family="ui-monospace" font-size="11">neither open nor closed</text>
  <line x1="80" y1="245" x2="520" y2="245" stroke="#3a4868" stroke-width="1"/>
  <line x1="160" y1="245" x2="520" y2="245" stroke="#6fb38a" stroke-width="4"/>
  <circle cx="160" cy="245" r="6" fill="#6fb38a"/>
  <polygon points="520,238 530,245 520,252" fill="#6fb38a"/>
  <text x="20" y="249" fill="#f3eed9" font-family="ui-monospace" font-size="12">[a,+∞)</text>
  <text x="540" y="249" fill="#e8a04a" font-family="ui-monospace" font-size="11">closed, unbounded</text>
  <text x="160" y="280" fill="#f3eed9" font-family="ui-monospace" font-size="11" text-anchor="middle">a</text>
  <text x="440" y="280" fill="#f3eed9" font-family="ui-monospace" font-size="11" text-anchor="middle">b</text>
</svg>
<div class="chart-caption">Filled circle = endpoint included; empty circle = excluded. Compactness requires both: closed AND bounded.</div>
</div>

## Core theorems

### Theorem 1 — Characterization of closed sets via accumulation

> $A \subseteq \mathbb{R}$ is closed $\iff$ $A$ contains all its accumulation points.

> **In words:** a set is closed exactly when it doesn't "leak" accumulation points that are close to it.

*Proof.*

$(\Rightarrow)$ Suppose $A$ closed, so $\mathbb{R} \setminus A$ is open. Let $x_0$ be an accumulation point of $A$. By contradiction $x_0 \notin A$, so $x_0 \in \mathbb{R} \setminus A$ (open), so $\exists r > 0$ with $B_r(x_0) \subseteq \mathbb{R} \setminus A$, i.e. $B_r(x_0) \cap A = \emptyset$, contradicting that $x_0$ is an accumulation point.

$(\Leftarrow)$ Show $\mathbb{R} \setminus A$ is open. Let $y \in \mathbb{R} \setminus A$. By hypothesis $y$ isn't an accumulation point of $A$ (else $y$ would be in $A$). So $\exists r > 0$ with $(B_r(y) \setminus \{y\}) \cap A = \emptyset$. Since also $y \notin A$, $B_r(y) \cap A = \emptyset$, i.e. $B_r(y) \subseteq \mathbb{R} \setminus A$. ∎

### Theorem 2 — Stability of open/closed sets

> (i) $\emptyset$ and $\mathbb{R}$ are both open and closed.
> (ii) **Arbitrary union** of open sets is open; **finite intersection** of open sets is open.
> (iii) **Arbitrary intersection** of closed sets is closed; **finite union** of closed sets is closed.

> **Crucial asymmetry:** "arbitrary" one side, "finite" the other.

*Proof of (ii).*

*Arbitrary union.* Let $\{A_\alpha\}$ be a family of open sets, $A = \bigcup A_\alpha$. If $x \in A$, then $x \in A_{\alpha_0}$ for some $\alpha_0$, and by openness $\exists r > 0 : B_r(x) \subseteq A_{\alpha_0} \subseteq A$.

*Finite intersection.* $A_1 \cap \dots \cap A_n$: if $x$ belongs to it, for each $i$ there's $r_i > 0$ with $B_{r_i}(x) \subseteq A_i$. Let $r = \min(r_1, \dots, r_n) > 0$. Then $B_r(x) \subseteq \bigcap A_i$.

**Why finiteness is needed:** with infinitely many open sets the $\min$ might not be $> 0$.

**Counterexample for infinite intersection.** $A_n = (-1/n, 1/n)$ all open. But $\bigcap_{n \ge 1} A_n = \{0\}$ — **closed**, not open. ∎

### Theorem 3 — Heine-Borel in $\mathbb{R}$ (the heart)

> $K \subseteq \mathbb{R}$ is **compact** $\iff$ $K$ is **closed AND bounded**.

Where "compact" is defined as:

**Definition (compact).** $K$ is **compact** if from every **open cover** $\{U_\alpha\}_{\alpha \in I}$ (i.e. family of opens with $K \subseteq \bigcup U_\alpha$) one can extract a **finite subcover**: $\exists \alpha_1, \dots, \alpha_n$ with $K \subseteq U_{\alpha_1} \cup \dots \cup U_{\alpha_n}$.

> **Glossary:**
>
> - **Open cover** = family of open sets whose union contains $K$. Like "a collection of neighbourhoods covering all of $K$".
> - **Finite subcover** = a finite subset that still covers $K$.
>
> **In words.** Compact = "however you fragment the cover, finitely many pieces are enough". Subtle concept, but exactly what's needed to turn local arguments into global ones.

*Proof.*

$(\Leftarrow)$ Model case $K = [a, b]$. Given open cover $\{U_\alpha\}$, let
$$S := \{x \in [a, b] : [a, x] \text{ is covered by finitely many } U_\alpha\}.$$

$S$ nonempty ($a \in S$) and upper-bounded by $b$. Let $c = \sup S \in [a, b]$.

*$c \in S$:* $\exists U_{\alpha_0}$ containing $c$, open, so containing $B_\delta(c)$. By definition of sup, $\exists x \in S$ with $c - \delta < x \le c$. Then $[a, x]$ has finite subcover $V_1, \dots, V_n$, and $[a, c] \subseteq V_1 \cup \dots \cup V_n \cup U_{\alpha_0}$. So $c \in S$.

*$c = b$:* by contradiction $c < b$. Then $\exists \delta' > 0$ with $c + \delta' < b$ and $B_{\delta'}(c) \subseteq U_{\alpha_0}$. Then $[a, c + \delta'/2]$ has finite subcover, and $c + \delta'/2 > c = \sup S$. Contradiction.

So $b \in S$.

For general closed bounded $K$: $K \subseteq [a, b]$; add $\mathbb{R} \setminus K$ (open since $K$ closed) to the cover, get cover of $[a, b]$, extract finite subcover, remove the $\mathbb{R} \setminus K$, get finite subcover of $K$.

$(\Rightarrow)$ Let $K$ compact.

*Bounded.* $K \subseteq \bigcup_{n \in \mathbb{N}} (-n, n)$: open cover. By compactness, finitely many suffice: $K \subseteq (-N, N)$.

*Closed.* Show $\mathbb{R} \setminus K$ open. Let $y \notin K$. For each $x \in K$, pick $r_x > 0$ with $|x - y| > 2 r_x$, so $B_{r_x}(x) \cap B_{r_x}(y) = \emptyset$. $\{B_{r_x}(x)\}_{x \in K}$ covers $K$; by compactness, finite subcover $B_{r_{x_i}}(x_i)$. Let $r = \min r_{x_i} > 0$, then $B_r(y)$ disjoint from all, so $B_r(y) \cap K = \emptyset$. ∎

> **Practical meaning.** On $\mathbb{R}$ (and $\mathbb{R}^n$), "compact" is easy to spot: just **closed AND bounded**. Doesn't hold in abstract metric spaces (e.g. $\ell^2$), but for real analysis it's exact.

### Theorem 4 — Connected in $\mathbb{R}$ = intervals

> $C \subseteq \mathbb{R}$ is **connected** $\iff$ $C$ is an **interval** ($\forall x, y \in C, \forall z$ with $x < z < y$, $z \in C$).

> **Glossary:** connected = "doesn't split into two separated pieces". A set is connected if it can't be written as a disjoint union of two nonempty relatively open sets.

*Proof (sketch).*

$(\Leftarrow)$ Suppose $C$ interval. By contradiction $C = A \cup B$ with $A, B$ relatively open, nonempty, disjoint. Pick $a \in A, b \in B$, WLOG $a < b$. Set $s = \sup\{x \in [a, b] \cap C : [a, x] \cap C \subseteq A\}$. One shows $s \notin A$ AND $s \notin B$, contradiction.

$(\Rightarrow)$ If $C$ isn't an interval, $\exists x < z < y$ with $x, y \in C, z \notin C$. Then $C = (C \cap (-\infty, z)) \cup (C \cap (z, +\infty))$: two disjoint nonempty relatively open sets. Disconnected. ∎

## Guided examples

**1. $\mathbb{Q}$ in $\mathbb{R}$.**
Not open (every neighbourhood of a rational contains irrationals).
Not closed (every irrational is an accumulation point not in $\mathbb{Q}$).
$\overline{\mathbb{Q}} = \mathbb{R}$, $\mathring{\mathbb{Q}} = \emptyset$.

**2. $\{1/n : n \ge 1\}$.**
Every $1/n$ is **isolated**.
The only accumulation point is $0$, and $0 \notin$ set.
Adding $0$: $\{0\} \cup \{1/n\}$ becomes **closed** (contains its accumulation point) and bounded → **compact**.

**3. Cantor set.**
Built by iteratively removing the "middle third" from $[0, 1]$. Closed, bounded → compact. **Empty interior** but **cardinality $\mathfrak{c}$** (sec. 05). Prototypical "weird" compact.

**4. Open sets of $\mathbb{R}$ = countable union of disjoint open intervals.**
Fundamental structural result.

## Exercises

<details>
<summary>Exercise 1 — Intersection of opens</summary>

Show $\bigcap_{n=1}^\infty \left(-\frac{1}{n},\ 1 + \frac{1}{n}\right) = [0, 1]$.

**Solution.**

*$\supseteq$.* If $x \in [0, 1]$, then for every $n$: $-1/n < 0 \le x \le 1 < 1 + 1/n$.

*$\subseteq$.* If $x$ is in every interval, then $x > -1/n$ for every $n$, so $x \ge 0$. Same for $x \le 1$. ∎

**Moral:** countable intersection of opens can give a closed set.
</details>

<details>
<summary>Exercise 2 — Closure, interior, boundary</summary>

Let $A = (0, 1) \cup \{2\} \cup (\mathbb{Q} \cap (3, 4))$. Compute $\overline{A}$, $\mathring{A}$, $\partial A$.

**Solution.**

- $\overline{A} = [0, 1] \cup \{2\} \cup [3, 4]$.
- $\mathring{A} = (0, 1)$ (the rationals in $(3, 4)$ aren't interior because every neighbourhood contains irrationals; $2$ is isolated).
- $\partial A = \{0, 1, 2\} \cup [3, 4]$.

**Notable:** the boundary can be "thick" like the interval $[3, 4]$.
</details>

<details>
<summary>Exercise 3 — Compact made of isolated points</summary>

Show $K = \{0\} \cup \{1/n : n \ge 1\}$ is compact, using the cover definition directly.

**Solution.** Given open cover $\{U_\alpha\}$ of $K$. $\exists U_{\alpha_0}$ containing $0$, open, so containing $B_r(0) = (-r, r)$ for some $r > 0$.

By Archimedes, $\exists N$ with $1/N < r$. So for every $n > N$, $1/n < r$, so $1/n \in U_{\alpha_0}$.

Remaining points $1, 1/2, \dots, 1/N$ — **finite**. For each, pick a $U_{\alpha_k}$ containing it.

Finite subcover: $\{U_{\alpha_0}, U_{\alpha_1}, \dots, U_{\alpha_N}\}$. ∎

**Classic technique:** "capture the tail" with the open around the accumulation point, handle remaining points manually.
</details>

<details>
<summary>Exercise 4 — Closed but not compact</summary>

Give a closed set of $\mathbb{R}$ that is NOT compact, and an open cover from which NO finite subcover can be extracted.

**Solution.** $K = \mathbb{N}$ is closed (complement is open). Not bounded → not compact by Heine-Borel.

Cover: $U_n = (n - 1/3,\ n + 1/3)$ for $n \in \mathbb{N}$. Each natural $n$ is covered only by $U_n$. No finite subset can cover all of $\mathbb{N}$. ∎
</details>

<details>
<summary>Exercise 5 — Topological Bolzano-Weierstrass</summary>

Prove: every **infinite bounded** subset of $\mathbb{R}$ has at least one accumulation point.

**Solution.** Let $A$ infinite, $A \subseteq [a, b]$. By contradiction, suppose no point of $[a, b]$ is an accumulation point of $A$. Then for every $x \in [a, b]$, $\exists r_x > 0$ with $B_{r_x}(x) \cap A \subseteq \{x\}$.

$\{B_{r_x}(x)\}$ is an open cover of $[a, b]$, compact by Heine-Borel. Finite subcover $B_{r_{x_1}}(x_1), \dots, B_{r_{x_n}}(x_n)$. Then:
$$A \subseteq \bigcup_{i=1}^n B_{r_{x_i}}(x_i) \cap A \subseteq \{x_1, \dots, x_n\},$$
so $A$ is finite. Contradiction. ∎
</details>

## Common pitfalls

- **"Closed" doesn't mean "not open".** $\mathbb{R}$ is both. $[0, 1)$ is neither. Negation of "open" isn't "closed".
- **Accumulation point ≠ interior point.** An accumulation point can be interior, exterior, or boundary.
- **Bounded doesn't imply compact:** $\mathbb{Q} \cap [0, 1]$ is bounded but not closed in $\mathbb{R}$.
- **Heine-Borel works in $\mathbb{R}^n$** but NOT in abstract metric spaces (e.g. $\ell^2$): "closed and bounded" isn't enough.
- **Stability asymmetry.** Arbitrary union of opens is open, but infinite intersection of opens may not be open.

> **Operating pill.** When an argument needs to "pass from local to global" (e.g. "for every point something good holds; does it hold globally?"), the *requirement* is almost always **compactness**.

## Summary table

| concept | operational def. | example in $\mathbb{R}$ |
|---|---|---|
| **open** | every point is interior | $(0, 1)$, $\mathbb{R}$, $\emptyset$ |
| **closed** | complement open / contains accumulation points | $[0, 1]$, $\mathbb{N}$, $\{0\} \cup \{1/n\}$ |
| **compact** | closed AND bounded (Heine-Borel) | $[a, b]$, Cantor, $\{0\} \cup \{1/n\}$ |
| **connected** | is an interval | $\mathbb{R}$, $[0, 1)$, $(-\infty, 5]$ |

## One-line takeaway

The topology of $\mathbb{R}$ is the formal language of "near", based on $|x - y|$ — and **compact sets** (= closed + bounded) are its most powerful tool: they turn local properties into global ones via finite subcovers.
