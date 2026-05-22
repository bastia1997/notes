---
title: "The Riemann integral: definition"
area: Integrals
summary: "Rigorous construction of the **integral** as \"area under the curve\". Upper/lower sums, integrability criterion, integrability of continuous and monotone functions, properties (linearity, monotonicity, additivity, mean-value theorem)."
order: 39
level: intermediate
prereq:
  - "Continuous functions on compacts (sec. 25-26)"
  - "Sup/inf (sec. 07)"
tools:
  - "Rudin — *Principles*, ch. 6"
---

# The Riemann integral: definition

## Motivation

The **quadrature** problem (area of a curved region) is ancient — Archimedes. Newton and Leibniz understood that differentiating and integrating are inverses, but informally. **Riemann (1854)** gave the rigorous definition we still use.

**Idea:** approximate the area under $f : [a, b] \to \mathbb{R}$ with **multirectangles** (sums of rectangle areas), then refine until the error vanishes.

## Partitions and sums

**Definition.** A **partition** of $[a, b]$ is a finite choice of points $a = x_0 < x_1 < \dots < x_n = b$.

**Subintervals:** $I_k = [x_{k-1}, x_k]$, with width $\Delta x_k = x_k - x_{k-1}$.

**Mesh:** $|D| = \max \Delta x_k$.

> **Glossary:**
>
> - $D$ (or $P$) = a **partition** of $[a,b]$.
> - $n$ = number of subintervals (varies with partition).
> - $\Delta x_k$ = width of the $k$-th rectangle.
> - $|D|$ = **mesh** = width of the widest rectangle (smaller = finer partition).
> - $m_k = \inf_{I_k} f$ = "minimum height" of $f$ on $I_k$ (inscribed rectangle).
> - $M_k = \sup_{I_k} f$ = "maximum height" on $I_k$ (circumscribed rectangle).

> On each $I_k$ define:
> - $m_k = \inf_{I_k} f$ (infimum of $f$ on the interval).
> - $M_k = \sup_{I_k} f$.

**Lower sum:** $s(f, D) = \sum_{k=1}^n m_k \Delta x_k$ (rectangles inscribed from below).

**Upper sum:** $S(f, D) = \sum_{k=1}^n M_k \Delta x_k$ (rectangles inscribed from above).

> Always $s(f, D) \le S(f, D)$.

## Upper and lower integrals

**Definition.** For $f$ bounded on $[a, b]$:
$$\underline{\int_a^b} f := \sup_D s(f, D), \qquad \overline{\int_a^b} f := \inf_D S(f, D).$$

Always $\underline{\int} \le \overline{\int}$.

**Definition (integrable).** $f$ is **Riemann-integrable** on $[a, b]$ if $\underline{\int} = \overline{\int}$. The common value is the **Riemann integral**
$$\int_a^b f(x)\, dx.$$

## Integrability criterion

**Theorem.** Bounded $f$ is integrable on $[a, b]$ $\iff$ $\forall \varepsilon > 0,\ \exists D$ with $S(f, D) - s(f, D) < \varepsilon$.

> **In words:** I can squeeze "what I know from above" with "what I know from below" within any tolerance.

## Classes of integrable functions

**Theorem.** Riemann-integrable on $[a, b]$:
1. **Continuous functions**.
2. **Monotone functions**.
3. Functions with **finitely** many (or countably many, in refined cases) discontinuities.

*Idea for continuous.* Heine-Cantor (ch. 26): continuous on compact ⇒ uniformly continuous. For each $\varepsilon$ choose uniform $\delta$, partition with $|D| < \delta$: oscillations $M_k - m_k < \varepsilon/(b-a)$, hence $S - s < \varepsilon$. ∎

## Fundamental properties

1. **Linearity:** $\int(\alpha f + \beta g) = \alpha \int f + \beta \int g$.
2. **Monotonicity:** $f \le g \Rightarrow \int f \le \int g$.
3. **Additivity:** $\int_a^b f = \int_a^c f + \int_c^b f$ ($a < c < b$).
4. **Triangle:** $|\int f| \le \int |f|$.
5. **Mean-value theorem:** if $f$ continuous on $[a, b]$, there exists $c \in [a, b]$ with $\int_a^b f = f(c) (b - a)$.

> **Mean:** $f(c)$ is the "average value" of $f$ on $[a, b]$.

## Examples

**1.** $\int_0^1 x \, dx = 1/2$. With uniform partition with $n$ intervals: $s = (n-1)/(2n) \to 1/2$, $S = (n+1)/(2n) \to 1/2$.

**2.** $\int_a^b c\, dx = c(b - a)$ (constant).

**3.** Dirichlet function $\chi_\mathbb{Q}$ on $[0, 1]$: $m_k = 0$, $M_k = 1$ for every $D$. $\underline{\int} = 0 \ne 1 = \overline{\int}$. **NOT Riemann-integrable** (need Lebesgue, ch. 56).

## Exercises

<details>
<summary>Exercise 1 — Computation via Riemann sums</summary>

$\int_0^1 x^2 dx = 1/3$ using Riemann sum with uniform partition.

**Solution.** $x_k = k/n$. On $[x_{k-1}, x_k]$, $M_k = (k/n)^2$. $S_n = \sum_{k=1}^n (k/n)^2 \cdot 1/n = (1/n^3) \sum k^2 = (1/n^3) n(n+1)(2n+1)/6 \to 1/3$. ∎
</details>

<details>
<summary>Exercise 2 — Integral of monotone function</summary>

Show every monotone function is integrable.

**Solution (sketch).** With uniform partition of $n$ intervals: $S - s = \sum (M_k - m_k) \Delta x_k$. For monotonic (e.g., increasing): $M_k - m_k = f(x_k) - f(x_{k-1})$. Summing: $S - s = (f(b) - f(a)) \cdot (b - a)/n \to 0$. ∎
</details>

## One-line takeaway

The **Riemann integral** is the common value of sup of lower sums and inf of upper sums — exists for continuous and monotone (and little else) and enjoys linearity, monotonicity, additivity; broader cases (Dirichlet) need Lebesgue.
