---
title: Supremum and completeness
area: Real numbers
summary: "What's \"the least upper bound\" — the **sup** — and why it's the most powerful tool in analysis. Definition, $\\varepsilon$-characterization (the \"operational\" form), difference from max, and equivalent forms of completeness of $\\mathbb{R}$."
order: 7
level: intermediate
prereq:
  - "Axioms of $\\mathbb{R}$ (sec. 06)"
tools:
  - "Rudin — ch. 1"
---

# Supremum and completeness

## Why this matters

The **sup** is the workhorse of all analysis. Practically every **existence** proof (a limit exists, a maximum exists, an integral exists, ...) has this shape:

> "Consider the set $A$ of $x$'s with property $P$. Take $s = \sup A$. Show $s$ is the one we want."

Mastering the **$\varepsilon$-characterization of the sup** is the first big technical leap in the course. If you don't get it now, it'll haunt you all year.

## Basic definitions

Let $A \subseteq \mathbb{R}$ be a nonempty subset.

- **Upper bound** of $A$: a number $M \in \mathbb{R}$ such that $\forall a \in A,\ a \le M$. A "ceiling" above $A$.
- **Lower bound** of $A$: a number $m \in \mathbb{R}$ such that $\forall a \in A,\ a \ge m$. A "floor" below $A$.
- $A$ is **upper-bounded** if it has at least one upper bound.
- $A$ is **lower-bounded** if it has at least one lower bound.
- $A$ is **bounded** if it's bounded above and below. Equivalent: $\exists C \ge 0 : \forall a \in A,\ |a| \le C$.

> **Glossary:**
>
> - $A \subseteq \mathbb{R}$ = "$A$ is a subset of $\mathbb{R}$".
> - $\forall a \in A$ = "for every element $a$ of $A$".
> - $|a|$ = absolute value (sec. 06).
>
> **Translation:** "bounded" = "lives inside an interval $[-C, C]$ for some finite $C$".

**Maximum** $\max A$ = an *upper bound* belonging to $A$. If it exists, unique.

**Minimum** $\min A$ = a *lower bound* belonging to $A$. If it exists, unique.

> **Example.** $A = [0, 1]$ (closed interval): $\min A = 0$, $\max A = 1$. $A = (0, 1)$ (open): no min, no max (endpoints not inside).

## Supremum: definition

**Definition.** $s$ is the **supremum** of $A$ (symbolically $s = \sup A$) if it is the **least upper bound**. I.e.:

- **(S1)** $s$ is an upper bound of $A$: $\forall a \in A,\ a \le s$.
- **(S2)** $s$ is the *smallest*: for every $s' < s$, $s'$ is not an upper bound.

Analogously, $i = \inf A$ is the **greatest lower bound**.

> **Translation.** $\sup A$ is the "tightest cap possible" above $A$. No smaller number still sits above all of $A$.

### Sup vs. Max — not the same

If $\max A$ exists, then $\sup A = \max A$ (check: $\max A$ is upper bound in $A$; a smaller upper bound would sit below an element of $A$, contradiction).

But $\sup A$ can exist **even when $\max A$ doesn't**.

**Key example.** $A = (0, 1)$ (open). $\sup A = 1$, $\inf A = 0$, but $\max A$ and $\min A$ don't exist (0 and 1 aren't in $A$).

## The operational form: $\varepsilon$-characterization of the sup

(S1)–(S2) above are conceptually clear, but to **work with the sup** we need a handier reformulation. Here it is.

**Theorem ($\varepsilon$-characterization of sup).** Let $A \subseteq \mathbb{R}$ be nonempty. Then $s = \sup A$ **if and only if**:

- **(C1)** $\forall a \in A,\ a \le s$ — $s$ is an upper bound.
- **(C2)** $\forall \varepsilon > 0,\ \exists a \in A : a > s - \varepsilon$ — anything smaller than $s$ fails to be an upper bound.

> **Glossary for the formula:**
>
> - $\varepsilon$ ("epsilon") = a small positive distance, "the wiggle margin".
> - $\forall \varepsilon > 0$ = "for every positive $\varepsilon$, however small".
> - $\exists a \in A$ = "there is at least one element $a$ in $A$".
> - $a > s - \varepsilon$ = "$a$ exceeds the value $s - \varepsilon$ (sits between $s - \varepsilon$ and $s$)".
>
> **Plain English:** "*$s$* is the sup if (C1) it sits above all of $A$, and (C2) every time you go down a little (by $\varepsilon$), some element of $A$ immediately exceeds that lower cap". Together (C1) and (C2) say $s$ is right "stuck" to $A$ from above: no room for a smaller upper bound.

*Proof of the theorem.*

$(\Rightarrow)$ If $s = \sup A$, then (C1) by (S1). For (C2): if for some $\varepsilon > 0$ we had $a \le s - \varepsilon$ for every $a \in A$, then $s - \varepsilon$ would be a smaller upper bound than $s$, contradicting (S2).

$(\Leftarrow)$ (C1) gives $s$ is an upper bound. For minimality: let $s' < s$. Let $\varepsilon = s - s' > 0$. By (C2), there's $a \in A$ with $a > s - \varepsilon = s'$, so $s'$ isn't an upper bound. ∎

**Symmetric version for inf:** $i = \inf A$ iff $i$ is lower bound and $\forall \varepsilon > 0,\ \exists a \in A : a < i + \varepsilon$.

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="300" fill="#111a30"/>
  <line x1="30" y1="180" x2="570" y2="180" stroke="#f3eed9" stroke-width="2"/>
  <rect x="100" y="170" width="300" height="20" fill="#d4af37" fill-opacity="0.3"/>
  <text x="250" y="160" fill="#d4af37" font-family="serif" font-size="14" text-anchor="middle">A (set)</text>
  <line x1="400" y1="60" x2="400" y2="200" stroke="#e07a8d" stroke-width="2" stroke-dasharray="5 5"/>
  <text x="400" y="50" fill="#e07a8d" font-family="serif" font-size="14" text-anchor="middle">s = sup A</text>
  <line x1="360" y1="100" x2="360" y2="200" stroke="#6fb38a" stroke-width="2" stroke-dasharray="3 3"/>
  <text x="340" y="90" fill="#6fb38a" font-family="serif" font-size="12" text-anchor="end">s − ε</text>
  <circle cx="380" cy="180" r="4" fill="#6aa9d8"/>
  <text x="380" y="220" fill="#6aa9d8" font-family="serif" font-size="13" text-anchor="middle">∃ a ∈ A, a &gt; s−ε</text>
  <text x="300" y="270" fill="#f3eed9" font-family="serif" font-size="13" text-anchor="middle">ε-characterization: for every ε, some element of A exceeds s−ε</text>
</svg>
<div class="chart-caption">$\sup A$: every quantity less than $s$ is "exceeded" by some element of $A$. This is the version used in proofs.</div>
</div>

## The central theorem

**Supremum theorem.** In $\mathbb{R}$, **every** nonempty upper-bounded set has a supremum.

(This is exactly the completeness axiom from sec. 06, restated as a "daily-use" theorem.)

**Immediate consequences:**
1. Every nonempty lower-bounded $A$ has $\inf$. (Trick: consider $-A = \{-a : a \in A\}$; it has $\sup$ by the theorem; $-\sup(-A) = \inf A$.)
2. $\mathbb{N}$ isn't upper-bounded in $\mathbb{R}$ (Archimedean property — sec. 06).

## Computed examples

**Example 1.** $A = \{1 - 1/n : n \ge 1\} = \{0, 1/2, 2/3, 3/4, 4/5, \dots\}$.

*Claim*: $\sup A = 1$ (no max), $\inf A = 0$ (= min, achieved).

*Sup check.*
- (C1): $1 - 1/n < 1$ for every $n \ge 1$. ✓
- (C2): given $\varepsilon > 0$, pick $n > 1/\varepsilon$ (exists by Archimedes). Then $1/n < \varepsilon$, so $1 - 1/n > 1 - \varepsilon$. ✓

Not a max because $1 \notin A$ (would need $1/n = 0$, impossible).

**Example 2.** $A = \{x \in \mathbb{Q} : x^2 < 2\}$.

In $\mathbb{R}$: $\sup A = \sqrt 2$. In $\mathbb{Q}$: sup doesn't exist (sec. 04: $\mathbb{Q}$ not complete).

**Example 3 (convention).** By convention $\sup \emptyset := -\infty$ and $\inf \emptyset := +\infty$. (Reason: every real is "vacuously" an upper bound of the empty set, so the least upper bound is $-\infty$.)

## Sup and operations

**Theorem.** Let $A, B \subseteq \mathbb{R}$ be nonempty upper-bounded. Then:

1. **Union**: $\sup(A \cup B) = \max(\sup A,\ \sup B)$.
2. **Sum**: $\sup(A + B) = \sup A + \sup B$, where $A + B = \{a + b : a \in A, b \in B\}$.
3. **Product** (if $A, B \subseteq [0, +\infty)$): $\sup(A \cdot B) = \sup A \cdot \sup B$.
4. **Positive scalar**: if $c > 0$, $\sup(cA) = c \sup A$.
5. **Negative scalar**: if $c < 0$, $\sup(cA) = c \inf A$ (the minus sign "swaps" sup and inf).

*Proof of (2).* Let $s = \sup A$, $t = \sup B$.
- Upper bound: for every $a + b \in A + B$, $a \le s$ and $b \le t$, so $a + b \le s + t$. ✓
- (C2): given $\varepsilon > 0$, $\exists a \in A$ with $a > s - \varepsilon/2$ and $b \in B$ with $b > t - \varepsilon/2$. Then $a + b > s + t - \varepsilon$. ✓

By $\varepsilon$-characterization, $\sup(A + B) = s + t$. ∎

> **Warning (product).** The formula $\sup(AB) = \sup A \cdot \sup B$ requires **non-negativity**. Without it, it fails: see Exercise 4.

## Equivalent forms of completeness

The sup axiom isn't the only way to say "$\mathbb{R}$ has no holes". The following are **all equivalent** in an ordered field:

1. **(Sup)** Every nonempty upper-bounded set has sup.
2. **(Cantor nested intervals)** Every decreasing sequence $[a_n, b_n]$ of closed bounded intervals has nonempty intersection.
3. **(Dedekind)** For every "cut" $\mathbb{R} = A \sqcup B$ with $A < B$ there exists $c$ with $\sup A = \inf B = c$.
4. **(Cauchy)** Every Cauchy sequence converges.
5. **(Bolzano-Weierstrass)** Every bounded sequence has a convergent subsequence.

We'll see them in depth in sec. 08 and sequence chapters.

### Sup ⇒ Nested intervals (example of inter-form proof)

**Theorem (Cantor — nested intervals).** Let $[a_n, b_n]$ be a sequence of **closed bounded** intervals, with $[a_{n+1}, b_{n+1}] \subseteq [a_n, b_n]$ for every $n$. Then $\bigcap_n [a_n, b_n] \ne \emptyset$.

> **Glossary:**
>
> - "Nested" = each interval sits inside the previous.
> - "Closed bounded" = endpoints included, endpoints finite.

*Proof.* The sequence $(a_n)$ is **increasing** ($a_n \le a_{n+1}$) and **upper-bounded** (by $b_0$ — check). Let $c = \sup\{a_n : n \in \mathbb{N}\}$. By (C1), $c \ge a_n$ for every $n$.

Show $c \le b_n$ for every $n$. Claim: every $b_n$ is an upper bound of $\{a_k\}_k$. *Check:* for $k \le n$, $a_k \le a_n \le b_n$; for $k > n$, $a_k \le b_k \le b_n$ (since intervals are nested: $b_k \le b_n$ if $k > n$). So $b_n$ bounds all $a_k$, and $c$ is the *least* upper bound, hence $c \le b_n$.

Putting it together: $a_n \le c \le b_n$ for every $n$, i.e. $c \in \bigcap_n [a_n, b_n]$. ∎

```mermaid
flowchart LR
  Sup["Sup-completeness"] -.equivalent.-> Int["Nested intervals"]
  Int -.equivalent.-> Ded["Dedekind cuts"]
  Ded -.equivalent.-> Cauchy["Cauchy convergence"]
  Cauchy -.equivalent.-> BW["Bolzano-Weierstrass"]
  BW -.equivalent.-> Sup
```

## A strong consequence: Bolzano-Weierstrass (sketch)

**Theorem (BW).** Every bounded sequence in $\mathbb{R}$ has a **convergent subsequence**.

> **Glossary.** A **subsequence** of $(x_n)$ is a sequence $(x_{n_k})_k$ with $n_0 < n_1 < n_2 < \dots$ — "we pick only some terms, in order".

*Idea of proof by bisection.* Let $|x_n| \le M$ for every $n$. Let $I_0 = [-M, M]$. At least one half $[-M, 0]$ or $[0, M]$ contains **infinitely many** $x_n$ (since there are infinitely many in total). Call it $I_1$. Iterate: at each step bisect the current interval and pick the half with infinitely many terms. We get $I_0 \supseteq I_1 \supseteq I_2 \supseteq \dots$, nested intervals with length halving, hence tending to 0.

By Cantor's theorem, $\bigcap_k I_k = \{L\}$. Extracting some $x_{n_k} \in I_k$ per $k$ (with increasing $n_k$), we have $x_{n_k} \to L$. ∎

We'll see BW in depth in ch. 13.

## More computed examples

**Example A.** $\sup_{n \ge 1} \frac{n}{n + 1} = ?$

The sequence is $\frac{1}{2}, \frac{2}{3}, \frac{3}{4}, \dots$, **increasing** towards 1 ($\frac{n}{n+1} = 1 - \frac{1}{n+1}$). So $\sup = 1$, not achieved.

**Example B.** $\sup\{x y : x \in [0, 1], y \in [0, 1]\} = ?$

By rule (3) with $A = B = [0, 1]$ (both non-negative): $\sup A \cdot \sup B = 1 \cdot 1 = 1$. Achieved at $(1, 1)$.

**Example C.** $\sup_{x > 0} \dfrac{x}{x^2 + 1} = ?$

By AM–GM (sec. 03): $x^2 + 1 \ge 2 x$, so $\dfrac{x}{x^2 + 1} \le \dfrac{x}{2x} = \dfrac{1}{2}$, with equality at $x = 1$. So $\sup = 1/2$, **achieved** at $x = 1$ (hence max).

## Exercises

<details>
<summary>Exercise 1 — Compute sup/inf of a classic set</summary>

Compute $\sup$ and $\inf$ of $A = \left\{(-1)^n \cdot \dfrac{n}{n + 1} : n \in \mathbb{N}, n \ge 1\right\}$. Are they achieved?

**Solution.** Split by parity:

- $n$ **even**: $(-1)^n = 1$, the element is $\frac{n}{n+1} \in [\frac{1}{2}, 1)$, increasing toward 1 (not achieved).
- $n$ **odd**: $(-1)^n = -1$, the element is $-\frac{n}{n+1} \in (-1, -\frac{1}{2}]$. Maximum (least negative) at $n = 1$: $-\frac{1}{2}$.

$\sup A = 1$ (not achieved, since $\frac{n}{n+1} < 1$ always). $\inf A = -1$ (not achieved, same reason).
</details>

<details>
<summary>Exercise 2 — Characterization via sequences</summary>

Let $A \subseteq \mathbb{R}$ be nonempty, upper-bounded. Show that $s = \sup A$ iff $s$ is upper bound **and** there is a sequence $(a_n) \subseteq A$ with $a_n \to s$.

**Solution.**

$(\Rightarrow)$ By (C2), for every $n \ge 1$ there's $a_n \in A$ with $a_n > s - 1/n$. Then $s - 1/n < a_n \le s$, and by squeeze theorem $a_n \to s$.

$(\Leftarrow)$ $s$ is upper bound by hypothesis. For (C2): given $\varepsilon > 0$, by definition of limit there's $N$ with $|a_n - s| < \varepsilon$ for $n \ge N$, in particular $a_N > s - \varepsilon$. ∎

(Important: the "sequence-to-sup" version is often used operationally.)
</details>

<details>
<summary>Exercise 3 — Sup of a union</summary>

Let $A, B \subseteq \mathbb{R}$ be nonempty, upper-bounded. Prove $\sup(A \cup B) = \max(\sup A,\ \sup B)$.

**Solution.** Let $s = \max(\sup A,\ \sup B)$.

*Upper bound:* every $x \in A \cup B$ is in $A$ or in $B$. If in $A$, $x \le \sup A \le s$. Same if in $B$.

*(C2):* given $\varepsilon > 0$, WLOG $s = \sup A$. By $\varepsilon$-characterization of $\sup A$, $\exists a \in A$ with $a > s - \varepsilon$. And $a \in A \cup B$.

By $\varepsilon$-characterization, $\sup(A \cup B) = s$. ∎
</details>

<details>
<summary>Exercise 4 — Non-negativity is essential for product</summary>

Find an example with $\sup(A \cdot B) \ne \sup A \cdot \sup B$.

**Solution.** $A = B = [-2, 1]$. $\sup A = \sup B = 1$, product of sups $= 1$.

But $A \cdot B$ contains $(-2)(-2) = 4$ (product of two big negatives is big positive). So $\sup(A \cdot B) \ge 4 \ne 1$.

The formula $\sup(AB) = \sup A \cdot \sup B$ requires $A, B \subseteq [0, +\infty)$.
</details>

<details>
<summary>Exercise 5 — Sup of sin on various intervals</summary>

Let $f(x) = \sin x$. Compute:
- $\sup_{x \in \mathbb{R}} f(x)$
- $\sup_{x \in (0, \pi/4)} f(x)$
- $\sup_{x \in [0, \pi/4]} f(x)$

**Solution.**
- $\sup_\mathbb{R} \sin = 1$, achieved at $x = \pi/2 + 2 k \pi$ (max).
- $\sup_{(0, \pi/4)} \sin = \sin(\pi/4) = \sqrt 2 / 2 \approx 0.707$. **Not achieved** (since $\pi/4 \notin (0, \pi/4)$).
- $\sup_{[0, \pi/4]} \sin = \sqrt 2 / 2$, **achieved** at $x = \pi/4$ (max).
</details>

## Common pitfalls

- **Confusing sup with max.** The sup is the *smallest upper bound*; not necessarily an element of $A$. Universal example: $\sup(0, 1) = 1 \notin (0, 1)$.
- **Forgetting non-emptiness.** The theorem says "$A$ nonempty AND upper-bounded". By convention $\sup \emptyset = -\infty$.
- **Wrong computations.** $\sup(A + B) = \sup A + \sup B$ always. $\sup(A \cdot B) = \sup A \cdot \sup B$ **only** with non-negativity. $\sup(-A) = -\inf A$ (minus swaps sup ↔ inf).
- **Skipping (C2).** Typical mistake: proving some $s$ is upper bound and stopping. Missing the verification that it's the *smallest* — i.e. (C2). Without (C2), you only have "an" upper bound, not the sup.

> **Operating pill.** Practically every existence proof in Calculus I reads:
> "Consider $A := \{x : \text{some property}\}$. Take $s := \sup A$. Show $s$ has the desired property."
>
> Keep this mental schema: you'll recognize it in: intermediate value theorem (Bolzano), Weierstrass (max/min of continuous functions), Riemann integral as sup of lower sums, existence of roots, and much more.

## One-line takeaway

$\sup A$ = "least upper bound" of $A$ — **always** exists in $\mathbb{R}$ if $A$ is nonempty and upper-bounded (completeness axiom), and its $\varepsilon$-characterization (it's an upper bound + nothing smaller is) is the most powerful tool in analysis.
