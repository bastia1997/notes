---
title: "Monotone sequences and Bolzano-Weierstrass"
area: Sequences
summary: "Two cornerstone results. **Bounded monotone sequences converge** — tool to prove existence of limits without knowing them. **Bolzano-Weierstrass** — every bounded sequence has a convergent subsequence. Both fail in $\\mathbb{Q}$ and characterize completeness of $\\mathbb{R}$."
order: 13
level: intermediate
prereq:
  - "Sequences and limits (sec. 11)"
  - "Algebra of limits (sec. 12)"
  - "Topology of R, sup/inf (sec. 07, 10)"
tools:
  - "Rudin — *Principles*, ch. 3"
---

# Monotone sequences and Bolzano-Weierstrass

## Why this matters

Two pillars:

1. **Bounded monotone sequences converge** — tool to prove a limit *exists* without knowing it. Crucial for defining the number $e$, recursive sequences, computing roots as iteration limits.
2. **Bolzano-Weierstrass** — every bounded sequence has a convergent subsequence. The bridge between "bounded" and "convergent": even when the full sequence oscillates, it lets you construct candidate limits.

Both rely on **completeness of $\mathbb{R}$**. They *fail* in $\mathbb{Q}$.

## Intuition

**Monotone bounded.** If $a_n$ grows and never exceeds a cap $M$, it must "stabilize" somewhere below $M$. That somewhere is $\sup\{a_n\}$.

**Bolzano-Weierstrass.** Take a sequence wiggling in $[a, b]$. Cut in half: one half contains **infinitely many** terms (since the union has infinitely many, both can't be finite). Iterate: nested intervals shrinking to a single point $L$. Picking one term per interval yields a subsequence converging to $L$.

## Vocabulary

### Monotonicity

- **Increasing**: $a_n \le a_{n+1}$ for every $n$; **strictly** with $<$.
- **Decreasing**: $a_n \ge a_{n+1}$.
- **Monotone**: increasing or decreasing.

### Subsequence

A **subsequence** of $(a_n)$ is built by picking indices in increasing order: $n_0 < n_1 < n_2 < \dots$, taking $(a_{n_k})_k$.

> **Glossary:** $n_k$ = the $k$-th chosen index.
>
> Example: $(a_n) = (n)$ has subsequence $(a_{2k}) = 0, 2, 4, \dots$ (even indices).

Useful fact: $n_k \ge k$ for every $k$.

**Base fact.** If $a_n \to L$, then **every** subsequence $a_{n_k} \to L$.

*Proof.* Given $\varepsilon > 0$, $\exists N : |a_n - L| < \varepsilon$ for $n \ge N$. Since $n_k \ge k$, also $|a_{n_k} - L| < \varepsilon$ for $k \ge N$. ∎

## Theorem 1 — Monotone sequences

> Let $(a_n)$ be monotone.
>
> (i) If increasing: $\lim a_n = \sup_n a_n \in \overline{\mathbb{R}}$.
> (ii) If decreasing: $\lim a_n = \inf_n a_n \in \overline{\mathbb{R}}$.
>
> In particular, **monotone + bounded $\Rightarrow$ convergent** (in $\mathbb{R}$).

*Proof (increasing).*

**Case 1: $S = \sup_n a_n \in \mathbb{R}$.** By $\varepsilon$-characterization of sup (ch. 07):
1. $a_n \le S$ for every $n$.
2. $\forall \varepsilon > 0,\ \exists N : a_N > S - \varepsilon$.

By monotonicity, $a_n \ge a_N > S - \varepsilon$ for $n \ge N$. Combined: $|a_n - S| < \varepsilon$. So $a_n \to S$. ∎

**Case 2: $\sup a_n = +\infty$.** For every $M$, $\exists N : a_N > M$. By monotonicity, $a_n > M$ for $n \ge N$. So $a_n \to +\infty$. ∎

## Theorem 2 — Bolzano-Weierstrass

> Every **bounded** sequence in $\mathbb{R}$ has a convergent subsequence.

*Proof (by bisection).*

Let $a_n \in [a, b] =: I_0$.

**Building the intervals.** Cut $I_0$ in half. The union has infinitely many terms, so at least one half $I_1$ contains infinitely many.

Iterate: each $I_{k+1}$ = the half of $I_k$ containing infinitely many terms.

We get $I_0 \supseteq I_1 \supseteq I_2 \supseteq \dots$, closed nested intervals with $|I_k| = (b - a)/2^k \to 0$.

**Building the subsequence.** Choose $n_0$ with $a_{n_0} \in I_0$. Then $n_1 > n_0$ with $a_{n_1} \in I_1$ (exists: $I_1$ has infinitely many terms). Continue: $n_{k+1} > n_k$ with $a_{n_{k+1}} \in I_{k+1}$.

**Convergence.** By Cantor's nested intervals (ch. 07), $\bigcap_k I_k = \{L\}$. Since $a_{n_k} \in I_k$ and $L \in I_k$, $|a_{n_k} - L| \le |I_k| \to 0$. So $a_{n_k} \to L$. ∎

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="300" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">Bisection: building nested Iₖ</text>
  <line x1="80" y1="60" x2="540" y2="60" stroke="#d4af37" stroke-width="4"/>
  <text x="50" y="65" fill="#d4af37" font-family="ui-monospace" font-size="11">I₀</text>
  <line x1="310" y1="105" x2="540" y2="105" stroke="#e8a04a" stroke-width="4"/>
  <text x="280" y="110" fill="#e8a04a" font-family="ui-monospace" font-size="11">I₁</text>
  <line x1="310" y1="150" x2="425" y2="150" stroke="#6fb38a" stroke-width="4"/>
  <text x="280" y="155" fill="#6fb38a" font-family="ui-monospace" font-size="11">I₂</text>
  <line x1="367.5" y1="195" x2="425" y2="195" stroke="#6aa9d8" stroke-width="4"/>
  <text x="338" y="200" fill="#6aa9d8" font-family="ui-monospace" font-size="11">I₃</text>
  <line x1="367.5" y1="240" x2="396" y2="240" stroke="#e07a8d" stroke-width="4"/>
  <text x="338" y="245" fill="#e07a8d" font-family="ui-monospace" font-size="11">I₄</text>
  <circle cx="381" cy="275" r="5" fill="#d4af37"/>
  <text x="386" y="280" fill="#d4af37" font-family="ui-monospace" font-size="11">L = ∩ Iₖ</text>
</svg>
<div class="chart-caption">Each $I_{k+1}$ is the half of $I_k$ containing infinitely many terms. Intersection is one point $\{L\}$.</div>
</div>

### Corollary — Monotone subsequence

> Every sequence $(a_n)$ has a **monotone** subsequence.

*Proof.* Call $n$ a **peak** if $a_n > a_m$ for every $m > n$.

**Case A: infinitely many peaks.** Let $n_0 < n_1 < \dots$ be the peaks. Then $a_{n_0} > a_{n_1} > \dots$: strictly decreasing subsequence.

**Case B: finitely many peaks.** Let $n_0$ past all peaks. Not a peak, so $\exists n_1 > n_0$ with $a_{n_1} \ge a_{n_0}$. Iterate: increasing subsequence. ∎

Combining Theorem 1 + Corollary gives a second proof of BW.

## Cardinal examples

### Example 1 — Defining $e$

$$a_n = \left(1 + \frac{1}{n}\right)^n.$$

**Claim.** $(a_n)$ is increasing and bounded; the limit *defines* $e$.

**Monotone, bounded by 3.** See ch. 15 for details.

By Theorem 1, $\lim$ exists $\in [2, 3]$. Define $e := \lim a_n \approx 2.71828\dots$

### Example 2 — Recursive sequence

$a_0 = 0$, $a_{n+1} = \sqrt{2 + a_n}$. Bounded by 2, increasing. By Theorem 1, $a_n \to L \le 2$. Passing to limit: $L = \sqrt{2 + L}$, $L = 2$.

### Example 3 — BW in action

$a_n = \sin n$. Bounded, doesn't converge. By BW, has convergent subsequence — actually a subsequence to every $L \in [-1, 1]$ (Weyl equidistribution).

## Common pitfalls

- **"Increasing ⇒ convergent" is false without boundedness.** $a_n = n$ diverges to $+\infty$.
- **BW needs boundedness.** $a_n = n$ has no convergent subsequence in $\mathbb{R}$.
- **In $\mathbb{Q}$ BW fails.** $a_n =$ decimal expansion of $\sqrt 2$ to $n$ digits: bounded in $\mathbb{Q} \cap [1, 2]$ but no subsequence converges in $\mathbb{Q}$ (would converge to $\sqrt 2 \notin \mathbb{Q}$). BW $\equiv$ completeness.
- **Don't pass to limit without proving existence.** $a_{n+1} = a_n^2$, $a_0 = 2$: passing to limit gives $L = L^2 \Rightarrow L \in \{0, 1\}$. But $a_n = 2^{2^n} \to +\infty$! The fix: first prove the limit exists.

## Exercises

<details>
<summary>Exercise 1 — Recursive sequence</summary>

$a_1 = 1$, $a_{n+1} = (a_n + 6)/2$. Compute $\lim a_n$.

**Solution.** Increasing (verify), bounded by 6. By Theorem 1, $L \le 6$. Passing: $L = (L + 6)/2 \Rightarrow L = 6$. ∎
</details>

<details>
<summary>Exercise 2 — Root via Newton</summary>

$a_1 = 2$, $a_{n+1} = (a_n + 2/a_n)/2$. Show $a_n \to \sqrt 2$.

**Solution.** $a_n \ge \sqrt 2$ by AM-GM. Decreasing: $a_{n+1} - a_n = (2/a_n - a_n)/2 \le 0$. By Theorem 1, $L \ge \sqrt 2$. Passing: $L = \sqrt 2$. ∎
</details>

<details>
<summary>Exercise 3 — BW constructive</summary>

$a_n = (-1)^n n/(n+1)$. Find two subsequences with different limits.

**Solution.** $a_{2k} \to 1$, $a_{2k+1} \to -1$. ∎
</details>

<details>
<summary>Exercise 4 — BW fails in $\mathbb{Q}$</summary>

Build $(a_n) \subseteq \mathbb{Q} \cap [1, 2]$ with no subsequence converging in $\mathbb{Q}$.

**Solution.** $a_n =$ decimal expansion of $\sqrt 2$ to $n$ digits. Any subsequence converges to $\sqrt 2 \notin \mathbb{Q}$. ∎
</details>

<details>
<summary>Exercise 5 — Sup is the limit of a sequence inside</summary>

Show: if $A \subseteq \mathbb{R}$ is nonempty, upper-bounded, there's $(a_n) \subseteq A$ with $a_n \to \sup A$.

**Solution.** Let $S = \sup A$. By $\varepsilon$-characterization, for each $n \ge 1$, $\exists a_n \in A$ with $a_n > S - 1/n$. Also $a_n \le S$. Squeeze: $a_n \to S$. ∎
</details>

## Summary table

| Hypothesis | Conclusion |
|---|---|
| increasing, bounded above | $\to \sup a_n \in \mathbb{R}$ |
| increasing, unbounded | $\to +\infty$ |
| bounded in $\mathbb{R}$ | has convergent subsequence (BW) |
| any sequence | has monotone subsequence |
| closed nested intervals | nonempty intersection |

## One-line takeaway

**Bounded monotone sequences converge**, **bounded sequences have convergent subsequences** (Bolzano-Weierstrass): two results equivalent to completeness of $\mathbb{R}$ — both fail in $\mathbb{Q}$ — and the main tools for proving existence of limits without explicit computation.
