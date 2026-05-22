---
title: "Numerical series: definition and convergence"
area: Series
summary: "Summing **infinitely many** terms = limit of partial sums. **Geometric** (closed form), **harmonic** (diverges slowly), **generalized harmonic**. Necessary condition $a_n \\to 0$. Telescoping, Cauchy criterion."
order: 45
level: intermediate
prereq:
  - "Sequences and limits (sec. 11-15)"
  - "Completeness of $\\mathbb{R}$, Cauchy"
tools:
  - "Rudin — *Principles*, ch. 3"
---

# Numerical series

## Why

Summing **finitely many** terms is trivial. Summing **infinitely many** is an **analytical** operation: we must decide what $a_1 + a_2 + \dots$ means, and this decision goes through **limit**.

Zeno asked how it's possible to cover a distance with $1/2 + 1/4 + 1/8 + \dots$. Modern answer: sum of infinitely many = **limit of finite sums**.

## Definition

**Definition.** Let $(a_n)$ be a real sequence. The **sequence of partial sums**:
$$S_n := \sum_{k=1}^n a_k.$$
The **series** $\sum_{n=1}^\infty a_n$ is identified with $(S_n)$.

> **Glossary:**
>
> - $a_n$ = general term.
> - $S_n$ = $n$-th partial sum.
> - $\sum_{n=1}^\infty a_n$ = the series (or, ambiguously, its sum if it exists).

**Character.**

- **Convergent** if $S_n \to S \in \mathbb{R}$. Then $S = \sum a_n$ is the **sum**.
- **Divergent** if $S_n \to \pm\infty$.
- **Oscillating** if $\lim S_n$ doesn't exist in $\overline{\mathbb{R}}$.

## Geometric series

**Theorem.** $\sum_{n=0}^\infty q^n$:
- $|q| < 1$: converges to $1/(1-q)$.
- $q \ge 1$: diverges to $+\infty$.
- $q \le -1$: oscillates.

*Proof.* $S_n = (1-q^{n+1})/(1-q)$ for $q \ne 1$.
- $|q|<1$: $q^{n+1} \to 0$, $S_n \to 1/(1-q)$.
- $q=1$: $S_n = n+1 \to \infty$.
- $q>1$: $S_n \to \infty$.
- $q=-1$: $S_n$ oscillates $1,0,1,0,\dots$.
- $q<-1$: oscillates with growing amplitude. ∎

**Examples.**
- $\sum (1/2)^n = 2$. (Solves Zeno: $1/2 + 1/4 + \dots = 1$.)
- $\sum (-1/3)^n = 3/4$.

## Harmonic series

**Theorem (Oresme).** $\sum 1/n$ **diverges** to $+\infty$.

*Proof (Oresme).* Group by powers of 2: block from $1/(2^{j-1}+1)$ to $1/2^j$ has $2^{j-1}$ terms, each $\ge 1/2^j$, sum $\ge 1/2$:
$$S_{2^k} \ge 1 + k/2 \to \infty. \qquad ∎$$

**Asymptotic.** $H_n = \sum_{k=1}^n 1/k = \ln n + \gamma + o(1)$, $\gamma \approx 0.5772$ (Euler-Mascheroni constant).

## Generalized harmonic series

**Theorem.** $\sum 1/n^\alpha$ converges $\iff \alpha > 1$.

(Full proof via integral test, sec. 46.)

| $\alpha$ | Character | Notable value |
|---|---|---|
| $\le 0$ | diverges (not infinitesimal) | — |
| $0 < \alpha \le 1$ | diverges | $\sum 1/n$, $\sum 1/\sqrt n$ |
| $\alpha > 1$ | converges | $\zeta(2) = \pi^2/6$, $\zeta(4) = \pi^4/90$ |

## Necessary condition

**Theorem.** $\sum a_n$ converges $\Rightarrow$ $a_n \to 0$.

*Proof.* $S_n \to S$ and $S_{n-1} \to S$, so $a_n = S_n - S_{n-1} \to 0$. ∎

> **Warning:** **necessary but not sufficient**. $\sum 1/n$ has $a_n \to 0$ but diverges.

**Practical use.** If $a_n \not\to 0$, the series surely **doesn't converge**.

## Linearity

**Theorem.** $\sum a_n \to A$, $\sum b_n \to B$, $\lambda, \mu \in \mathbb{R}$. Then $\sum (\lambda a_n + \mu b_n) = \lambda A + \mu B$.

## Telescoping series

**Definition.** $\sum a_n$ is **telescoping** if $a_n = b_n - b_{n+1}$.

**Formula.** $S_n = b_1 - b_{n+1}$ (cascade cancellation).

**Example.** $\sum_{n=1}^\infty \frac{1}{n(n+1)}$. Decomp.: $\frac{1}{n(n+1)} = \frac{1}{n} - \frac{1}{n+1}$:
$$S_n = 1 - \frac{1}{n+1} \to 1.$$

## Cauchy criterion

**Theorem.** $\sum a_n$ converges $\iff$ $\forall \varepsilon > 0,\ \exists N$: $\forall m \ge n \ge N$:
$$\left|\sum_{k=n}^m a_k\right| < \varepsilon.$$

*Proof.* $(S_n)$ Cauchy $\iff$ converges ($\mathbb{R}$ complete). ∎

## Exercises

<details>
<summary>Exercise 1 — Mixed geometric</summary>

$\sum_{n=0}^\infty \frac{2^n + 3^n}{5^n} = \frac{1}{1-2/5} + \frac{1}{1-3/5} = \frac{5}{3} + \frac{5}{2} = \frac{25}{6}$. ∎
</details>

<details>
<summary>Exercise 2 — Triple telescoping</summary>

$\sum \frac{1}{n(n+1)(n+2)}$. Decomp.: $= \frac{1}{2}[\frac{1}{n(n+1)} - \frac{1}{(n+1)(n+2)}]$, telescoping. Sum $= 1/4$. ∎
</details>

<details>
<summary>Exercise 3 — Non-infinitesimal term</summary>

$\sum \frac{n^2+1}{2n^2-5}$. $a_n \to 1/2 \ne 0$ → **diverges**. ∎
</details>

<details>
<summary>Exercise 4 — Remainders</summary>

If $\sum a_n = S$, the **remainder** $R_n = \sum_{k=n+1}^\infty a_k$ satisfies $R_n \to 0$.

*Proof.* $R_n = S - S_n \to 0$. ∎
</details>

## One-line takeaway

A **series** is the limit of partial sums; **geometric** converges to $1/(1-q)$ for $|q|<1$, **harmonic** diverges like $\ln n$, **generalized harmonic** converges iff $\alpha > 1$; $a_n \to 0$ is necessary but not sufficient; telescoping and Cauchy are the base tools.
