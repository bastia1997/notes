---
title: "Cauchy sequences and completeness of R"
area: Sequences
summary: "The **internal** condition \"terms get close to each other\" — Cauchy sequence — is equivalent in $\\mathbb{R}$ to convergence. The tool to prove **existence** of a limit **without knowing what it is**."
order: 14
level: intermediate
prereq:
  - "ε-N definition (sec. 11)"
  - "Bolzano-Weierstrass (sec. 13)"
tools:
  - "Rudin — *Principles*, ch. 3"
---

# Cauchy sequences and completeness of R

## Why this matters

To prove $a_n \to L$ via ε-N (ch. 11), you must **know** $L$. Often you don't — you just want to know if the sequence "stabilizes somewhere". Cauchy offers an **intrinsic** test: terms get close to each other indefinitely.

In $\mathbb{R}$ — and this is what "complete" precisely means — **being Cauchy and being convergent are the same**.

**Practical use:** in existence proofs (equations, roots, integrals as limits of sums) it's far easier to show "is Cauchy" than exhibiting the limit. Completeness gives the limit for free.

## Intuition

A sequence is **Cauchy** if, from some index on, **terms are all close to each other**. No candidate limit needed: just internal distances.

- In $\mathbb{R}$ this is enough for convergence.
- In $\mathbb{Q}$ it isn't: you can construct rational sequences clustering at an irrational (a hole in $\mathbb{Q}$).

## Definition

**Definition.** $(a_n)$ is **Cauchy** if
$$\forall \varepsilon > 0,\ \exists N,\ \forall n, m \ge N,\ |a_n - a_m| < \varepsilon.$$

> **Glossary for the formula:**
>
> - $\varepsilon$ = small positive tolerance.
> - $N$ = threshold index.
> - $n, m$ = **two** arbitrary indices, both $\ge N$.
> - $|a_n - a_m|$ = distance between $n$-th and $m$-th terms.
>
> **In words:** for every threshold $\varepsilon$, there's an index $N$ such that **any two terms** past $N$ are within $\varepsilon$.

### Completeness

**Definition.** A metric space $(X, d)$ is **complete** if every Cauchy sequence in $X$ converges to an element of $X$.

> **Central theorem:** $\mathbb{R}$ with $d(x, y) = |x - y|$ is complete. $\mathbb{Q}$ is not.

## Theorems

### Theorem 1 — Convergent ⇒ Cauchy

> If $a_n \to L$, then $(a_n)$ is Cauchy.

*Proof.* Given $\varepsilon > 0$, $\exists N : |a_n - L| < \varepsilon/2$ for $n \ge N$. For $n, m \ge N$:
$$|a_n - a_m| \le |a_n - L| + |L - a_m| < \varepsilon. \quad\blacksquare$$

### Theorem 2 — Cauchy ⇒ bounded

> If $(a_n)$ is Cauchy, then bounded.

*Proof.* With $\varepsilon = 1$: $\exists N$ with $|a_n - a_m| < 1$ for $n, m \ge N$. In particular $|a_n - a_N| < 1$, so $|a_n| < |a_N| + 1$. Combined with finitely many initial terms (max modulus $M_0$): $|a_n| \le \max(M_0, |a_N| + 1)$. ∎

### Theorem 3 — Completeness of $\mathbb{R}$

> Every Cauchy sequence in $\mathbb{R}$ converges.

*Proof.* Let $(a_n)$ Cauchy in $\mathbb{R}$.

1. By Theorem 2, $(a_n)$ is bounded.
2. By **Bolzano-Weierstrass** (ch. 13), some subsequence $a_{n_k} \to L$.
3. Claim full sequence $\to L$.

Given $\varepsilon > 0$:
- Cauchy: $\exists N_1$ with $|a_n - a_m| < \varepsilon/2$ for $n, m \ge N_1$.
- $a_{n_k} \to L$: $\exists K$ with $|a_{n_k} - L| < \varepsilon/2$ for $k \ge K$.

Pick $k$ with $k \ge K$ AND $n_k \ge N_1$. For $n \ge N_1$:
$$|a_n - L| \le |a_n - a_{n_k}| + |a_{n_k} - L| < \varepsilon. \quad\blacksquare$$

**Summary in $\mathbb{R}$:**
$$\text{convergent} \iff \text{Cauchy}.$$

$(\Rightarrow)$ always; $(\Leftarrow)$ is completeness.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">Cauchy: terms close to each other, "tails" shrinking</text>
  <line x1="50" y1="240" x2="580" y2="240" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="50" x2="50" y2="260" stroke="#3a4868" stroke-width="1"/>
  <g fill="#6fb38a">
    <circle cx="80" cy="100" r="4"/>
    <circle cx="120" cy="200" r="4"/>
    <circle cx="160" cy="120" r="4"/>
    <circle cx="200" cy="180" r="4"/>
    <circle cx="240" cy="140" r="4"/>
    <circle cx="280" cy="170" r="4"/>
    <circle cx="320" cy="150" r="4"/>
    <circle cx="360" cy="162" r="4"/>
    <circle cx="400" cy="155" r="4"/>
    <circle cx="440" cy="160" r="4"/>
    <circle cx="480" cy="158" r="4"/>
    <circle cx="520" cy="159" r="4"/>
  </g>
  <rect x="280" y="145" width="300" height="25" fill="#d4af37" fill-opacity="0.15" stroke="#e8a04a" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="285" y="140" fill="#e8a04a" font-family="ui-monospace" font-size="10">all terms past N lie in a band of width ε</text>
  <line x1="280" y1="50" x2="280" y2="260" stroke="#e07a8d" stroke-width="1.5" stroke-dasharray="4 4"/>
  <text x="285" y="65" fill="#e07a8d" font-family="ui-monospace" font-size="11">N</text>
  <text x="50" y="280" fill="#f3eed9" font-family="ui-monospace" font-size="11">Existence of L is not required. The condition is "internal".</text>
</svg>
<div class="chart-caption">Cauchy: past $N$ all terms lie in a band of width $\varepsilon$, no need to know what they converge to.</div>
</div>

### Theorem 4 — $\mathbb{Q}$ is not complete

> Exists $(q_n) \subseteq \mathbb{Q}$ Cauchy that doesn't converge in $\mathbb{Q}$.

*Proof.* $q_n =$ decimal expansion of $\sqrt 2$ to $n$ digits. Cauchy ($|q_n - q_m| \le 10^{-\min(n, m)}$). In $\mathbb{R}$ converges to $\sqrt 2 \notin \mathbb{Q}$. ∎

## Why it matters — Banach fixed point

**Use case.** Let $f : [0, 1] \to [0, 1]$ with $|f(x) - f(y)| \le c |x - y|$, $c \in (0, 1)$ (**contraction**). Let $a_0 \in [0, 1]$, $a_{n+1} = f(a_n)$. Want to show $(a_n)$ converges to a **fixed point** $L = f(L)$.

*Strategy via Cauchy.* One shows $|a_{n+1} - a_n| \le c^n |a_1 - a_0|$. For $n < m$:
$$|a_m - a_n| \le \sum_{k=n}^{m-1} c^k |a_1 - a_0| \le |a_1 - a_0| \frac{c^n}{1 - c} \to 0.$$
Cauchy. By **completeness** of $\mathbb{R}$, $a_n \to L$. By continuity, $f(L) = L$.

> **Banach fixed point theorem** (1D). Without completeness, couldn't conclude.

## Guided examples

### Example 1 — Geometric series

$a_n = 1 + 1/2 + 1/4 + \dots + 1/2^n$. $|a_{n+p} - a_n| < 1/2^n$. Cauchy → converges (to 2).

### Example 2 — Harmonic series (NOT Cauchy)

$a_n = 1 + 1/2 + \dots + 1/n$. $a_{2n} - a_n = \sum_{k=n+1}^{2n} 1/k \ge n \cdot 1/(2n) = 1/2$. So for $\varepsilon = 1/2$, no $N$ works. NOT Cauchy, NOT convergent. Diverges to $+\infty$.

### Example 3 — Cauchy criterion for series

A series $\sum a_k$ **converges** iff partial sums $S_n$ are Cauchy:
$$\forall \varepsilon > 0,\ \exists N,\ \forall m > n \ge N : \left|\sum_{k=n+1}^m a_k\right| < \varepsilon.$$
Main tool in series theory (ch. 45).

## Common pitfalls

- **"$|a_{n+1} - a_n| \to 0$" does NOT imply Cauchy.** Counterexample: $a_n = \sqrt n$. $\sqrt{n+1} - \sqrt n \to 0$ but $\sqrt n \to +\infty$. Cauchy needs **all** pairs $n, m$ large.
- **Cauchy isn't a "limit property":** it's verifiable without mentioning the limit. That's the point.
- **In incomplete spaces, Cauchy doesn't suffice.** Must know the space is complete.

## Exercises

<details>
<summary>Exercise 1 — Cauchy with direct estimate</summary>

$a_n = \sum_{k=0}^n (-1)^k/(k+1)$ (alternating harmonic). Show Cauchy.

**Solution.** By Leibniz, $|a_m - a_n| \le 1/(n+2)$. Pick $N > 1/\varepsilon - 2$. ∎
</details>

<details>
<summary>Exercise 2 — Not Cauchy</summary>

$a_n = \sum_{k=1}^n 1/\sqrt k$. Show NOT Cauchy.

**Solution.** $a_{4n} - a_n \ge 3n/\sqrt{4n} = 3\sqrt n/2 \to \infty$. ∎
</details>

<details>
<summary>Exercise 3 — Contraction</summary>

$T(x) = (x + 4)/3$. $x_0 = 0$, $x_{n+1} = T(x_n)$. Show Cauchy and compute limit.

**Solution.** Contraction with $c = 1/3$. Cauchy by geometric bound. Fixed point: $L = (L + 4)/3 \Rightarrow L = 2$. ∎
</details>

<details>
<summary>Exercise 4 — Cauchy ⇒ $a_n^2$ Cauchy</summary>

If $(a_n)$ Cauchy, show $(a_n^2)$ Cauchy.

**Solution.** $|a_n^2 - a_m^2| = |a_n - a_m| \cdot |a_n + a_m| \le 2M |a_n - a_m|$ ($M$ bound). ∎
</details>

<details>
<summary>Exercise 5 — $\mathbb{Q}$ not complete</summary>

$a_0 = 1$, $a_{n+1} = (a_n + 2/a_n)/2$. Show $(a_n) \subseteq \mathbb{Q}$, Cauchy, no limit in $\mathbb{Q}$.

**Solution.** Rational by induction. Cauchy: Heron's method, $a_n \to \sqrt 2$ in $\mathbb{R}$. So Cauchy but $\sqrt 2 \notin \mathbb{Q}$. ∎
</details>

<details>
<summary>Exercise 6 — Monotone ⇒ Cauchy</summary>

Prove directly: monotone + bounded $\Rightarrow$ Cauchy.

**Solution.** WLOG increasing, $L = \sup a_n$. By $\varepsilon$-characterization, $\exists N : a_N > L - \varepsilon$. For $n, m \ge N$, $a_n, a_m \in (L - \varepsilon, L]$, so $|a_n - a_m| < \varepsilon$. ∎
</details>

## One-line takeaway

In $\mathbb{R}$, $(a_n)$ converges **iff** Cauchy — slogan: "*I'm Cauchy, so I converge*" — and this equivalence is exactly the completeness of $\mathbb{R}$ (false in $\mathbb{Q}$).
