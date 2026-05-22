---
title: "Sequences and limits: the ε-N definition"
area: Sequences
summary: "The **rigorous definition of a limit** of a sequence. Explained with very concrete examples before the symbols, with a glossary of every letter ($\\varepsilon$, $N$, $a_n$). The single line all of analysis rests on."
order: 11
level: intermediate
prereq:
  - "Topology of R: neighbourhoods, accumulation points (sec. 10)"
  - "Quantifiers ∀ and ∃ (sec. 01)"
  - "Absolute value and inequalities (sec. 06)"
tools:
  - "Rudin — *Principles*, ch. 3"
  - "Tao — *Analysis I*, ch. 6"
---

# Sequences and limits: the ε-N definition

## Why this matters

Sequences are the **microscope** of analysis. Every "continuous" notion (function limit, integral, derivative, series) reduces to — or is characterized by — sequences. Understanding the $\varepsilon$-$N$ definition well means having the universal tool.

The idea: a sequence $(a_n)$ converges to $L$ if its terms get *eventually* close to $L$, where "eventually" is precisely quantified by $\varepsilon$ and $N$.

## Intuition first, symbols later

Consider $a_n = 1/n$: $1, 1/2, 1/3, 1/4, 1/5, \dots$

The terms "squash" toward $0$ but never reach it. We say the **limit** is $0$.

How do we formalize "squash toward 0"? Like this: for every **tolerance** $\varepsilon > 0$ — say $\varepsilon = 0.01$ — there's a **starting index** $N$ such that from $N$ on the terms are within $\varepsilon$ of 0.
- For $\varepsilon = 0.01$: need $1/n < 0.01$, i.e. $n > 100$. So $N = 101$ works.
- For $\varepsilon = 0.0001$: need $n > 10000$. $N = 10001$.

**$N$ depends on $\varepsilon$**: the tighter the tolerance, the later the "good tail" begins.

**Key point**: the limit **does not speak of a single term**, it speaks of a **tail** (terms from $N$ on). A sequence may oscillate wildly for the first $10^{100}$ terms and then stabilize: the limit doesn't care about the start. Only "in the end".

## What a sequence is

A **sequence** in $\mathbb{R}$ is a function $a : \mathbb{N} \to \mathbb{R}$, written compactly $(a_n)_{n \in \mathbb{N}}$ or $(a_n)$.

> **Glossary:**
>
> - $a_n$ = the **$n$-th term** (value at $n$).
> - The index $n$ can start from $0$, $1$, or any $n_0$ — nothing changes asymptotically.
> - Examples: $a_n = 1/n$, $a_n = n^2$, $a_n = (-1)^n$, $a_n = \sin n$.

## The ε-N definition of finite limit

**Definition.** $(a_n)$ **converges to** $L \in \mathbb{R}$ — written $\lim_{n \to \infty} a_n = L$ or $a_n \to L$ — if
$$\forall \varepsilon > 0,\ \exists N \in \mathbb{N},\ \forall n \ge N,\ |a_n - L| < \varepsilon.$$

> **Glossary for the formula — read symbol by symbol:**
>
> - $\forall \varepsilon > 0$ = "for every positive tolerance $\varepsilon$, however small". $\varepsilon$ (epsilon) is the standard Greek letter for "small error".
> - $\exists N \in \mathbb{N}$ = "there exists an index $N$" (the "time threshold").
> - $\forall n \ge N$ = "for every $n$ greater or equal to $N$" — i.e. "from $N$ on".
> - $|a_n - L|$ = **distance** between the $n$-th term and the limit $L$.
> - $|a_n - L| < \varepsilon$ = "$a_n$ is within $\varepsilon$ of $L$".
>
> **In plain English:** "for any tightness $\varepsilon$ you fix, there is an index $N$ so that from $N$ on every term lies within $\varepsilon$ of the limit $L$".

**Critical quantifier order.** $\varepsilon$ comes **before** $N$: first you fix the tolerance, then you find (depending on $\varepsilon$) the threshold $N$. If swapped — $\exists N, \forall \varepsilon$ — it would mean "there's some $N$ such that from then on $a_n = L$ exactly", which is too strong (would require the sequence to *be equal* to $L$ eventually).

### Negation

Negating the definition (sec. 01: swap $\forall \leftrightarrow \exists$):
$$\exists \varepsilon > 0,\ \forall N,\ \exists n \ge N,\ |a_n - L| \ge \varepsilon.$$

> **In words.** "$a_n \not\to L$" means: there's a tolerance $\varepsilon$ such that, however far you go (every $N$), you find a later term ($n \ge N$) that's at least $\varepsilon$ away from $L$.

## Infinite limits

**$\lim a_n = +\infty$** if
$$\forall M > 0,\ \exists N,\ \forall n \ge N,\ a_n > M.$$

> **In words.** "However large you fix $M$, from some index on all terms exceed $M$".

**$\lim a_n = -\infty$** mirror.

### Vocabulary

- **Convergent**: has finite limit.
- **Divergent**: has limit $+\infty$ or $-\infty$.
- **Irregular** (or **oscillating**): no limit (e.g. $(-1)^n$).

## Topological reformulation

For those familiar with neighbourhoods (sec. 10):

> $a_n \to L$ $\iff$ for every neighbourhood $U$ of $L$, **eventually** $a_n \in U$.

This is the "topological" form that generalizes to any space.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">aₙ = 1 + (−1)ⁿ / n  →  1</text>
  <line x1="50" y1="250" x2="580" y2="250" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="60" x2="50" y2="270" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="160" x2="580" y2="160" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="555" y="156" fill="#d4af37" font-family="ui-monospace" font-size="11">L=1</text>
  <rect x="50" y="135" width="530" height="50" fill="#d4af37" fill-opacity="0.08"/>
  <line x1="50" y1="135" x2="580" y2="135" stroke="#e8a04a" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="50" y1="185" x2="580" y2="185" stroke="#e8a04a" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="10" y="139" fill="#e8a04a" font-family="ui-monospace" font-size="10">L+ε</text>
  <text x="10" y="189" fill="#e8a04a" font-family="ui-monospace" font-size="10">L−ε</text>
  <g fill="#6fb38a">
    <circle cx="80" cy="100" r="4"/>
    <circle cx="120" cy="220" r="4"/>
    <circle cx="160" cy="120" r="4"/>
    <circle cx="200" cy="200" r="4"/>
    <circle cx="240" cy="135" r="4"/>
    <circle cx="280" cy="185" r="4"/>
    <circle cx="320" cy="145" r="4"/>
    <circle cx="360" cy="175" r="4"/>
    <circle cx="400" cy="152" r="4"/>
    <circle cx="440" cy="168" r="4"/>
    <circle cx="480" cy="156" r="4"/>
    <circle cx="520" cy="164" r="4"/>
  </g>
  <line x1="240" y1="60" x2="240" y2="270" stroke="#e07a8d" stroke-width="1.5" stroke-dasharray="4 4"/>
  <text x="245" y="75" fill="#e07a8d" font-family="ui-monospace" font-size="11">N(ε)</text>
  <text x="245" y="290" fill="#e07a8d" font-family="ui-monospace" font-size="11">from here on, all inside the band</text>
  <text x="50" y="270" fill="#f3eed9" font-family="ui-monospace" font-size="10">n=1</text>
  <text x="540" y="270" fill="#f3eed9" font-family="ui-monospace" font-size="10">n→∞</text>
</svg>
<div class="chart-caption">The band $[L - \varepsilon, L + \varepsilon]$ eventually captures all terms. The threshold $N$ depends on $\varepsilon$.</div>
</div>

## Base theorems

### Theorem 1 — Uniqueness of limit

> If $a_n \to L$ and $a_n \to L'$, then $L = L'$.

*Proof (by contradiction).* Suppose $L \ne L'$. Let $\varepsilon = |L - L'|/3 > 0$.

For $a_n \to L$: $\exists N_1$ with $|a_n - L| < \varepsilon$ for $n \ge N_1$.
For $a_n \to L'$: $\exists N_2$ with $|a_n - L'| < \varepsilon$ for $n \ge N_2$.

For $n \ge \max(N_1, N_2)$, by triangle inequality:
$$|L - L'| \le |L - a_n| + |a_n - L'| < 2\varepsilon = \frac{2}{3}|L - L'|,$$
i.e. $1 \le 2/3$, absurd. ∎

### Theorem 2 — Convergent implies bounded

> If $(a_n)$ converges, then it's **bounded**: $\exists M > 0 : |a_n| \le M$ for every $n$.

*Proof.* Let $a_n \to L$. Apply with $\varepsilon = 1$: $\exists N$ with $|a_n - L| < 1$ for $n \ge N$, so $|a_n| < |L| + 1$.

Initial terms $a_0, \dots, a_{N-1}$ finite in number, max modulus $M_0 = \max(|a_0|, \dots, |a_{N-1}|)$. Set $M = \max(M_0, |L| + 1)$, then $|a_n| \le M$ for every $n$. ∎

> **Converse is false.** $(-1)^n$ is bounded but not convergent.

### Theorem 3 — Sign persistence

> If $a_n \to L > 0$, then **eventually** $a_n > L/2 > 0$.

*Proof.* Apply $\varepsilon = L/2 > 0$: $\exists N$ with $|a_n - L| < L/2$ for $n \ge N$. So $a_n > L - L/2 = L/2 > 0$. ∎

**Weak version** (with $\le$): if $a_n \ge 0$ eventually and $a_n \to L$, then $L \ge 0$ (but not necessarily $> 0$: e.g. $a_n = 1/n > 0$ but $L = 0$).

## Guided examples

### Example 1: $1/n \to 0$

*Proof.* Given $\varepsilon > 0$, pick $N > 1/\varepsilon$ (exists by Archimedes). For $n \ge N$: $n > 1/\varepsilon \Rightarrow 1/n < \varepsilon \Rightarrow |1/n - 0| < \varepsilon$. ∎

### Example 2: $(-1)^n$ has no limit

*Proof (by contradiction).* Suppose $a_n = (-1)^n \to L$. For $\varepsilon = 1/2$, $\exists N$ with $|a_n - L| < 1/2$ for $n \ge N$.

For consecutive indices $n, n+1 \ge N$: $|a_n - a_{n+1}| = 2$. But:
$$|a_n - a_{n+1}| \le |a_n - L| + |L - a_{n+1}| < 1/2 + 1/2 = 1,$$
so $2 < 1$, absurd. ∎

### Example 3: $a^n \to 0$ if $|a| < 1$

*Proof.* Write $|a| = 1/(1 + h)$ with $h > 0$. By Bernoulli (sec. 03), $(1 + h)^n \ge 1 + nh > nh$. So $|a|^n < 1/(nh)$. Given $\varepsilon > 0$, pick $N > 1/(h \varepsilon)$. ∎

### Example 4: $\sqrt{n+1} - \sqrt n \to 0$

*Proof.* Rationalize:
$$\sqrt{n+1} - \sqrt n = \frac{1}{\sqrt{n+1} + \sqrt n} < \frac{1}{2 \sqrt n}.$$
Given $\varepsilon > 0$, pick $N > 1/(4 \varepsilon^2)$. ∎

## General technique for proving a limit

The standard scheme:

1. **Fix** $\varepsilon > 0$ (arbitrary).
2. **Bound** $|a_n - L|$ by a simpler quantity $f(n)$ tending to 0.
3. **Solve** $f(n) < \varepsilon$ for $n$, finding threshold $N(\varepsilon)$.
4. **Conclude**: for every $n \ge N$, $|a_n - L| \le f(n) < \varepsilon$.

Step 2 is the heart. Typical techniques: Bernoulli, rationalization (multiply by conjugate $\sqrt a + \sqrt b$), triangle inequality, Newton binomial.

## Common pitfalls

- **The order "$\forall \varepsilon, \exists N$" can't be swapped.** "$\exists N, \forall \varepsilon$" is too strong.
- **$N$ isn't unique.** Any $N' \ge N$ works. Don't seek the minimum $N$ — just *a* working one.
- **Limit ≠ achieved value.** $1/n$ never equals 0, yet $\lim = 0$.
- **"Eventually" is technical:** "from some index on". Don't confuse with "often" or "infinitely many times" (those describe subsequences, sec. 13).
- **Bounded doesn't imply convergent.** $(-1)^n$ is bounded and doesn't converge.

## Exercises

<details>
<summary>Exercise 1 — Limit with definition</summary>

Prove $\displaystyle \lim_{n \to \infty} \frac{2n + 1}{n + 3} = 2$.

**Solution.**
$$\left|\frac{2n+1}{n+3} - 2\right| = \left|\frac{2n+1 - 2(n+3)}{n+3}\right| = \frac{5}{n+3} < \frac{5}{n}.$$
Given $\varepsilon > 0$, pick $N > 5/\varepsilon$. ∎
</details>

<details>
<summary>Exercise 2 — Explicit threshold</summary>

For $a_n = \dfrac{n^2 - 1}{n^2 + 1}$, show $a_n \to 1$ and compute $N(\varepsilon)$ for $\varepsilon = 10^{-3}$.

**Solution.** $|a_n - 1| = \dfrac{2}{n^2 + 1} < \dfrac{2}{n^2}$.

For $\varepsilon = 10^{-3}$, want $2/n^2 < 10^{-3}$, i.e. $n > \sqrt{2000} \approx 44.7$. Take $N = 45$. ∎

In general, $N(\varepsilon) = \lceil \sqrt{2/\varepsilon} \rceil$.
</details>

<details>
<summary>Exercise 3 — Divergence to $+\infty$</summary>

Prove $\sqrt n \to +\infty$.

**Solution.** Given $M > 0$, pick $N = \lceil M^2 \rceil + 1$. For $n \ge N$, $\sqrt n \ge \sqrt N > M$. ∎
</details>

<details>
<summary>Exercise 4 — Oscillating sequence</summary>

Let $a_n = \sin(n \pi/2)$. Does it have a limit?

**Solution.** Values cycle: $0, 1, 0, -1, 0, 1, 0, -1, \dots$ For any candidate $L$, pick $\varepsilon < 1/2$. Infinitely many $a_n = 1$, infinitely many $a_n = -1$. At least one of $|1 - L|, |-1 - L|$ is $\ge 1 > \varepsilon$ infinitely often. No limit. ∎
</details>

<details>
<summary>Exercise 5 — Sum of limits (preview)</summary>

Let $a_n \to A$ and $b_n \to B$. Prove $a_n + b_n \to A + B$ using only the definition.

**Solution.** $|(a_n + b_n) - (A + B)| \le |a_n - A| + |b_n - B|$.

Given $\varepsilon$: $\exists N_1$ with $|a_n - A| < \varepsilon/2$; $\exists N_2$ with $|b_n - B| < \varepsilon/2$. For $n \ge \max(N_1, N_2)$: sum $< \varepsilon$. ∎

> **Trick:** the "$\varepsilon/2$" classic — split the budget. Algebra of limits in sec. 12.
</details>

<details>
<summary>Exercise 6 — Sandwich (squeeze theorem)</summary>

Let $a_n \le b_n \le c_n$ eventually, $a_n, c_n \to L$. Prove $b_n \to L$.

**Solution.** Given $\varepsilon > 0$, $\exists N$ with $L - \varepsilon < a_n$ and $c_n < L + \varepsilon$ eventually. Then $L - \varepsilon < a_n \le b_n \le c_n < L + \varepsilon$, i.e. $|b_n - L| < \varepsilon$. ∎

This is the **squeeze theorem**, fundamental.
</details>

## One-line takeaway

A sequence's limit is defined in a *single* line of symbols:
$$\forall \varepsilon > 0,\ \exists N,\ \forall n \ge N,\ |a_n - L| < \varepsilon$$
that reads "*for every margin $\varepsilon$, there is an index from which all terms lie within $\varepsilon$ of the limit $L$*" — all of real analysis reduces back to this line.
