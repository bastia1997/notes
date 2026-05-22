---
title: "Limit superior, limit inferior, subsequences"
area: Sequences
summary: "Any sequence (even oscillating) **always** has two 'asymptotic shoulders' — $\\liminf$ and $\\limsup$ — the smallest and largest subsequence limits. The universal tool for talking about limits even when the 'real' limit doesn't exist."
order: 16
level: advanced
prereq:
  - "Sequences and limits (sec. 11)"
  - "Monotone and Bolzano-Weierstrass (sec. 13)"
  - "Topology of R (sec. 10)"
tools:
  - "Rudin — *Principles*, ch. 3"
---

# Limit superior, limit inferior, subsequences

## Why this matters

A sequence may **have no limit**, but it **always** has $\liminf$ and $\limsup$ in $\overline{\mathbb{R}}$. They are the two "asymptotic shoulders" — the smallest and largest subsequence limits. They:

- give a general convergence criterion: "$(a_n)$ converges $\iff$ $\liminf = \limsup$";
- enable the **root test** for series (ch. 46);
- formalize "asymptotic oscillation" even for irregular sequences.

Once mastered, they're the universal tool for limit reasoning **without first proving existence**.

## Intuition

For $a_n = (-1)^n = 1, -1, 1, -1, \dots$: no limit, but
- $\liminf = -1$ (limit of the "low half").
- $\limsup = +1$ (limit of the "high half").

More generally: look at the **tail** $\{a_n, a_{n+1}, \dots\}$. As $n$ grows, the tail shrinks.
- **Sup of tail** decreases (removing elements can only shrink the sup).
- **Inf of tail** grows.

Their limits are $\limsup$ and $\liminf$.

## Definition via sup/inf of tails

For every $n$:
$$S_n := \sup_{k \ge n} a_k \in \overline{\mathbb{R}}, \qquad I_n := \inf_{k \ge n} a_k \in \overline{\mathbb{R}}.$$

> **Glossary:**
> - $S_n$ is **decreasing** in $n$ (removing the term $a_n$ doesn't increase sup).
> - $I_n$ is **increasing**.

Define:
$$\limsup_{n \to \infty} a_n := \lim_{n \to \infty} S_n = \inf_n S_n,$$
$$\liminf_{n \to \infty} a_n := \lim_{n \to \infty} I_n = \sup_n I_n.$$

> **Always exist.** $(S_n)$ decreasing → limit exists in $\overline{\mathbb{R}}$ (ch. 13). Same for $(I_n)$.

## Definition via subsequences

Let $E := \{L \in \overline{\mathbb{R}} : \exists\, a_{n_k} \to L\}$ — the set of **subsequential limits**.

> **Theorem.** $\limsup a_n = \max E$, $\liminf a_n = \min E$, $E \ne \emptyset$.

### Limit cases

- $a_n \to +\infty$ $\iff$ $\liminf = \limsup = +\infty$.
- $a_n \to L \in \mathbb{R}$ $\iff$ $\liminf = \limsup = L$.

> **Convergence is exactly equality of the two.**

## Theorems

### Theorem 1 — Fundamental relation

> $\liminf a_n \le \limsup a_n$ always. Also $\limsup(-a_n) = -\liminf a_n$.

*Proof.* $I_n \le S_n$ for every $n$; pass to limit. ∎

### Theorem 2 — Convergence

> $(a_n)$ converges to $L$ in $\overline{\mathbb{R}}$ $\iff$ $\liminf = \limsup = L$.

### Theorem 3 — ε-characterization of limsup

> $L^* = \limsup a_n \in \mathbb{R}$ $\iff$:
>
> (a) $\forall \varepsilon > 0$: **eventually** $a_n < L^* + \varepsilon$.
> (b) $\forall \varepsilon > 0$: **frequently** $a_n > L^* - \varepsilon$.

> **Mnemonic.** $\limsup$ is "**eventually below $L^* + \varepsilon$, frequently above $L^* - \varepsilon$**".
>
> **Glossary:**
> - "Eventually" = "from some $N$ on, all $n$".
> - "Frequently" = "infinitely often".

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">Oscillating aₙ: limsup vs liminf</text>
  <line x1="50" y1="240" x2="580" y2="240" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="40" x2="50" y2="260" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="80" x2="580" y2="80" stroke="#d4af37" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="555" y="76" fill="#d4af37" font-family="ui-monospace" font-size="11">limsup</text>
  <line x1="50" y1="200" x2="580" y2="200" stroke="#6aa9d8" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="555" y="216" fill="#6aa9d8" font-family="ui-monospace" font-size="11">liminf</text>
  <rect x="50" y="80" width="530" height="120" fill="#e8a04a" fill-opacity="0.06"/>
  <g fill="#6fb38a">
    <circle cx="90" cy="90" r="4"/>
    <circle cx="120" cy="195" r="4"/>
    <circle cx="160" cy="85" r="4"/>
    <circle cx="200" cy="205" r="4"/>
    <circle cx="240" cy="87" r="4"/>
    <circle cx="280" cy="198" r="4"/>
    <circle cx="320" cy="82" r="4"/>
    <circle cx="360" cy="203" r="4"/>
    <circle cx="400" cy="84" r="4"/>
    <circle cx="440" cy="200" r="4"/>
    <circle cx="480" cy="83" r="4"/>
    <circle cx="520" cy="201" r="4"/>
  </g>
  <text x="50" y="290" fill="#f3eed9" font-family="ui-monospace" font-size="11">limsup = limit of sup of tails (max subseq. limit)</text>
  <text x="50" y="305" fill="#f3eed9" font-family="ui-monospace" font-size="11">liminf = limit of inf of tails (min subseq. limit)</text>
</svg>
<div class="chart-caption">The band between $\liminf$ and $\limsup$ is the "asymptotic oscillation zone".</div>
</div>

### Theorem 4 — Operations (cautious)

> (i) $\limsup(a_n + b_n) \le \limsup a_n + \limsup b_n$.
> (ii) $\liminf(a_n + b_n) \ge \liminf a_n + \liminf b_n$.
> (iii) If $a_n \to A \in \mathbb{R}$: $\limsup(a_n + b_n) = A + \limsup b_n$.

> **Strict inequality possible.** $a_n = (-1)^n$, $b_n = -(-1)^n$: $\limsup a + \limsup b = 2$ but $a_n + b_n = 0$, $\limsup = 0$.

## Guided examples

**1. $a_n = (-1)^n$.** $\limsup = 1$, $\liminf = -1$. $E = \{-1, 1\}$.

**2. $a_n = \sin(n\pi/3)$.** Period 6, values $\{0, \sqrt 3/2, \sqrt 3/2, 0, -\sqrt 3/2, -\sqrt 3/2\}$. $\limsup = \sqrt 3/2$, $\liminf = -\sqrt 3/2$.

**3. $a_n = (1 + (-1)^n) n$.** $E = \{0, +\infty\}$. $\limsup = +\infty$, $\liminf = 0$.

**4. $a_n = \sin n$.** $\{n \bmod 2\pi\}$ dense in $[0, 2\pi]$ (Weyl). $E = [-1, 1]$, $\limsup = 1$, $\liminf = -1$.

## Application: root test

For series $\sum b_n$ with $b_n \ge 0$:
$$\rho := \limsup \sqrt[n]{b_n}.$$
- $\rho < 1$: converges.
- $\rho > 1$: diverges.
- $\rho = 1$: inconclusive.

The $\limsup$ is essential: it tracks the "worst asymptotic behavior". For power series, radius of convergence is $R = 1/\limsup \sqrt[n]{|a_n|}$ (ch. 48).

## Common pitfalls

- **$\limsup \ne \sup$.** Sup is over all values; $\limsup$ is asymptotic.
- **$\liminf, \limsup$ always exist** in $\overline{\mathbb{R}}$.
- **$\liminf < \limsup \iff$ not convergent.** Convenient for non-convergence proofs.
- **Operations $\le$ NOT equal.**

## Exercises

<details>
<summary>Exercise 1 — Direct computation</summary>

$\liminf, \limsup$ of $a_n = \cos(n \pi / 2)$.

**Solution.** Period 4, values $1, 0, -1, 0$. $E = \{-1, 0, 1\}$. $\liminf = -1$, $\limsup = 1$. ∎
</details>

<details>
<summary>Exercise 2 — Custom sequence</summary>

Find $(a_n)$ with $\liminf = 0$, $\limsup = +\infty$.

**Solution.** $a_n = 0$ if $n$ even, $a_n = n$ if $n$ odd. ∎
</details>

<details>
<summary>Exercise 3 — Strict inequality in operations</summary>

$a_n = (-1)^n$, $b_n = (-1)^{n+1}$. Compare $\limsup(a_n + b_n)$ vs $\limsup a_n + \limsup b_n$.

**Solution.** $a_n + b_n = 0$ always → $\limsup = 0$. But $\limsup a + \limsup b = 2$. Strict: $0 < 2$. ∎
</details>

<details>
<summary>Exercise 4 — Use of criterion</summary>

If $\limsup a_n < 1$, then eventually $a_n < 1$.

**Solution.** $L^* < 1$, take $\varepsilon = (1 - L^*)/2$. By Theorem 3(a), eventually $a_n < L^* + \varepsilon < 1$. ∎

(Used by root test.)
</details>

## One-line takeaway

$\liminf a_n = \sup_n \inf_{k \ge n} a_k = \min E$ and $\limsup a_n = \inf_n \sup_{k \ge n} a_k = \max E$ (with $E$ = subsequential limits) — **always exist**, and $(a_n)$ converges to $L$ exactly when $\liminf = \limsup = L$.
