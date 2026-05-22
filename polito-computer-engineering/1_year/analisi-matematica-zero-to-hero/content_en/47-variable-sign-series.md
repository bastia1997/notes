---
title: "Variable-sign series, Leibniz, absolute convergence"
area: Series
summary: "For variable-sign terms, positive criteria don't suffice. **Leibniz** for alternating, **absolute convergence** (stronger than simple), **Riemann** on rearrangements, **Dirichlet** and **Abel**."
order: 47
level: intermediate
prereq:
  - "Positive series tests (sec. 46)"
  - "Summation by parts (Abel)"
tools:
  - "Rudin — *Principles*, ch. 3"
---

# Variable-sign series

## Why

For $a_n \ge 0$, convergence = bounded sums. All this **crashes** when signs vary: there's possibility of **cancellation** between positives and negatives.

Paradigmatic example: $\sum (-1)^{n+1}/n = 1 - 1/2 + 1/3 - \dots$ **converges** (to $\ln 2$), but $\sum 1/n$ **diverges**.

## Leibniz criterion

**Definition.** **Alternating** = $\sum (-1)^n b_n$ with $b_n \ge 0$.

**Theorem (Leibniz, 1682).** Let $(b_n)$ satisfy:
1. $b_n \ge 0$;
2. $b_n$ eventually **decreasing** ($b_{n+1} \le b_n$);
3. $b_n \to 0$.

Then $\sum (-1)^{n+1} b_n$ **converges**, and
$$|S - S_n| \le b_{n+1}.$$

> **Glossary:**
>
> - **Remainder estimate** $\le b_{n+1}$ is precious for numerical bounds.

*Proof.* $(S_{2k})$ increasing, $(S_{2k+1})$ decreasing, both bounded by $b_1$; $S_{2k+1} - S_{2k} = b_{2k+1} \to 0$. Same limit $S$. ∎

**Examples.**
- $\sum (-1)^{n+1}/n$: $b_n = 1/n \searrow 0$. Converges to $\ln 2$.
- $\sum (-1)^n/\ln n$ ($n \ge 2$): $b_n = 1/\ln n \searrow 0$. Converges.

> **Warning:** monotonicity is essential. Without it, pathologies arise.

## Absolute convergence

**Definition.** $\sum a_n$ **absolutely convergent** if $\sum |a_n|$ converges.

**Definition.** **Conditionally** (simply) convergent if converges but not absolutely.

**Theorem.** Absolute ⇒ simple convergence.

*Proof 1 (Cauchy).* $|\sum_{k=n}^m a_k| \le \sum_{k=n}^m |a_k| < \varepsilon$. Cauchy for $\sum a_n$. ∎

*Proof 2 (decomposition).* $a_n^+ = \max(a_n,0)$, $a_n^- = \max(-a_n,0)$. $a_n = a_n^+ - a_n^-$, $|a_n| = a_n^+ + a_n^-$, $0 \le a_n^\pm \le |a_n|$. By comparison they converge; by linearity $\sum a_n$ converges. ∎

**Examples.**
- $\sum (-1)^n/n^2$: **absolutely** convergent.
- $\sum (-1)^{n+1}/n$: **conditionally** convergent.

### Practical implications

With **absolute convergence** the following are legal:
1. **Rearrangements** (changing order).
2. Grouping.
3. Cauchy products.

With **conditional** convergence, **none** are automatic.

## Riemann's rearrangement theorem

**Theorem (Riemann, 1854).** Let $\sum a_n$ be **conditionally convergent**. For every $L \in \mathbb{R} \cup \{\pm\infty\}$ there exists a **permutation** $\sigma$ with $\sum a_{\sigma(n)} = L$. There also exists $\sigma$ making it oscillating.

*Sketch.* $p_k$ = positives, $q_k$ = $|$negatives$|$. Conditional convergence ⇒ $\sum p_k = \sum q_k = \infty$, but $p_k, q_k \to 0$. Add positives until you exceed $L$, then negatives until below, repeat. ∎

> **Lesson:** summing infinitely many is not commutative. Conditional + permutation = any sum.

## Dirichlet criterion

Generalizes Leibniz: bounded partial sums × decreasing to zero.

**Theorem.** Let $(a_n), (b_n)$ with:
1. $A_n = \sum_{k=1}^n a_k$ **bounded**: $|A_n| \le M$;
2. $(b_n)$ **decreasing** and $b_n \to 0$.

Then $\sum a_n b_n$ converges.

**Tool — Abel summation by parts:**
$$\sum_{k=m}^n a_k b_k = A_n b_n - A_{m-1} b_m + \sum_{k=m}^{n-1} A_k (b_k - b_{k+1}).$$

*Proof.* Abel + boundedness: $|\sum_m^n a_k b_k| \le 2Mb_m \to 0$. Cauchy. ∎

**Example.** $\sum \sin(n\theta)/n$ for $\theta \ne 2k\pi$: $\sin(n\theta)$ partial sums bounded, $1/n \searrow 0$: converges.

## Abel criterion

**Theorem.** If $\sum a_n$ converges and $(b_n)$ is **monotone and bounded**, then $\sum a_n b_n$ converges.

*Idea.* $b_n \to L$: $b_n = L + (b_n-L)$, constant part converges by hypothesis, residual by Dirichlet. ∎

**Example.** $\sum (-1)^n/n \cdot \arctan n$: $\sum (-1)^n/n$ converges, $\arctan n$ increasing bounded. Converges.

## Operational summary

| Situation | Tool |
|---|---|
| $a_n \ge 0$ | positive tests (sec. 46) |
| Alternating with $|a_n| \searrow 0$ | Leibniz |
| General | study $\sum |a_n|$ first |
| $\sum |a_n|$ converges | absolute (and hence simple) |
| $\sum |a_n|$ diverges, non-alternating sign | Dirichlet/Abel |

## Exercises

<details>
<summary>Exercise 1 — Leibniz with estimate</summary>

$\sum (-1)^{n+1}/n^2$. $b_n=1/n^2 \searrow 0$: converges (absolutely indeed). Estimate: $|S - S_{10}| \le 1/121 \approx 0.0083$. ∎
</details>

<details>
<summary>Exercise 2 — Conditionally convergent</summary>

$\sum (-1)^n/(n\ln n)$ ($n\ge 2$). $1/(n\ln n) \searrow 0$: Leibniz gives convergence. $\sum 1/(n\ln n)$ diverges (Bertrand): **conditionally convergent**. ∎
</details>

<details>
<summary>Exercise 3 — Trigonometric Dirichlet</summary>

$\sum \cos(n\pi/3)/n$. $A_n = \sum \cos(k\pi/3)$ periodic of period 6, bounded. $1/n \searrow 0$: Dirichlet. Converges. ∎
</details>

<details>
<summary>Exercise 4 — Abel</summary>

$\sum a_n$ converges ⇒ $\sum a_n \cdot n/(n+1)$ converges.

*Proof.* $n/(n+1)$ increasing, bounded $\le 1$. Abel. ∎
</details>

## One-line takeaway

**Leibniz** for alternating with $|a_n| \searrow 0$; **absolute convergence** ($\sum|a_n|<\infty$) is stronger than simple and allows rearrangements; **Riemann** shows conditional series are fragile (rearrangeable to any sum); **Dirichlet/Abel** extend Leibniz via summation by parts.
