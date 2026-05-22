---
title: "Power series and radius of convergence"
area: Series
summary: "$\\sum a_n (x-x_0)^n$. Always a **radius** $R \\in [0, +\\infty]$: converges for $|x-x_0|<R$, diverges for $|x-x_0|>R$. **Cauchy-Hadamard**, term-by-term derivation/integration, boundaries case by case."
order: 48
level: intermediate
prereq:
  - "Numerical series (sec. 45-47)"
  - "Sequences and $\\limsup$"
tools:
  - "Rudin — *Principles*, ch. 8"
---

# Power series and radius of convergence

## Why

Until now each $a_n$ was a number. Now we consider series depending on $x$. The most "rigid" and fundamental is the **power series**.

**Definition.** A **power series** centered at $x_0$ is
$$\sum_{n=0}^\infty a_n (x - x_0)^n.$$

> **Glossary:**
>
> - $a_n \in \mathbb{R}$ = **coefficients**.
> - $x_0$ = **center**.
> - At fixed $x$, numerical series; convergence depends on $x$.

WLOG $x_0 = 0$.

## Abel's theorem (geometric structure)

**Theorem (Abel, 1826).** If $\sum a_n x_1^n$ converges at $x_1 \ne 0$, then $\sum a_n x^n$ converges **absolutely** for $|x| < |x_1|$.

*Proof.* $a_n x_1^n \to 0$, bounded: $|a_n x_1^n| \le M$. Set $r = |x/x_1| < 1$:
$$|a_n x^n| \le M r^n.$$
Geometric + comparison. ∎

**Corollary.** There exists $R \in [0, +\infty]$ such that the series converges for $|x|<R$, diverges for $|x|>R$. $R$ = **radius of convergence**.

> **Boundaries $|x| = R$:** case by case (absolute, simple, or divergence).

## Cauchy-Hadamard

**Theorem.** The radius is
$$\frac{1}{R} = \limsup_{n\to\infty} \sqrt[n]{|a_n|}.$$
(Conventions: $1/0 = +\infty$, $1/\infty = 0$.)

*Proof.* Root test: $\limsup \sqrt[n]{|a_n x^n|} = |x|/R$. Converges if $<1$, diverges if $>1$. ∎

**Ratio formula** (if the limit exists):
$$\frac{1}{R} = \lim_{n\to\infty} \left|\frac{a_{n+1}}{a_n}\right|.$$

In practice: ratio is simpler; Hadamard needed when ratio oscillates.

## Paradigmatic examples

| Series | $R$ | Boundaries | Sum |
|---|---|---|---|
| $\sum x^n$ | 1 | $x=1$ diverges, $x=-1$ oscillates | $1/(1-x)$ |
| $\sum x^n/n$ | 1 | $x=1$ diverges, $x=-1$ converges | $-\ln(1-x)$ |
| $\sum x^n/n^2$ | 1 | converges absolutely $\pm 1$ | — |
| $\sum x^n/n!$ | $+\infty$ | — | $e^x$ |
| $\sum n! x^n$ | 0 | — | only at 0 |

## Uniform convergence on compacts

**Theorem.** For every $r$ with $0 < r < R$, $\sum a_n x^n$ converges **uniformly** on $[-r, r]$.

*Proof (Weierstrass M-test).* $|a_n x^n| \le |a_n| r^n$ with $\sum |a_n| r^n < \infty$. ∎

**Consequences:**
- $f(x) = \sum a_n x^n$ is **continuous** on $(-R, R)$.
- Integrable term by term.
- Differentiable term by term.

> **Caution:** uniform convergence on **compacts** $\subset (-R,R)$, not on the entire open interval.

## Term-by-term derivation and integration

**Theorem.** $\sum a_n x^n$ with radius $R > 0$:
1. $\sum n a_n x^{n-1}$ has **same radius** $R$.
2. $f'(x) = \sum n a_n x^{n-1}$ on $(-R, R)$.
3. $\int_0^x f = \sum a_n x^{n+1}/(n+1)$ has radius $R$.
4. $f \in C^\infty(-R, R)$.

*Proof (part 1).* $\sqrt[n]{n|a_n|} = \sqrt[n]{n}\sqrt[n]{|a_n|}$, $\sqrt[n]{n} \to 1$. ∎

**Corollary (uniqueness).** If two series coincide near 0, they have the same coefficients: $a_n = f^{(n)}(0)/n!$.

## Abel's theorem at the boundary

**Theorem.** If $\sum a_n R^n$ converges, then $\lim_{x \to R^-} \sum a_n x^n = \sum a_n R^n$.

**Notable applications:**

- $\ln(1+x) = \sum (-1)^{n+1} x^n/n$ for $|x|<1$. At $x=1$: $\sum (-1)^{n+1}/n$ converges (Leibniz). By Abel:
$$\sum_{n=1}^\infty \frac{(-1)^{n+1}}{n} = \ln 2.$$

- $\arctan x = \sum (-1)^n x^{2n+1}/(2n+1)$. At $x=1$: $\sum (-1)^n/(2n+1)$ converges. By Abel:
$$\sum_{n=0}^\infty \frac{(-1)^n}{2n+1} = \frac{\pi}{4} \quad \text{(Leibniz-Madhava)}.$$

## Arithmetic of power series

For $f = \sum a_n x^n$, $g = \sum b_n x^n$, radii $R_f, R_g$, $R = \min(R_f, R_g)$:

- **Sum:** $f+g = \sum (a_n+b_n) x^n$, radius $\ge R$.
- **Product (Cauchy):** $f \cdot g = \sum c_n x^n$ with $c_n = \sum_{k=0}^n a_k b_{n-k}$.
- **Quotient:** if $g(0) \ne 0$, $1/g$ is a power series near 0.
- **Composition:** if $g(0) = 0$, $f \circ g$ is a power series near 0.

## Derived notable expansions

- $1/(1-x)^2 = \sum_{n=0}^\infty (n+1) x^n$ (derivative of geometric).
- $\arctan x = \sum (-1)^n x^{2n+1}/(2n+1)$ (integration of $1/(1+x^2) = \sum (-1)^n x^{2n}$).
- $-\ln(1-x) = \sum x^n/n$ (integration of geometric).

## Exercises

<details>
<summary>Exercise 1 — Standard radius</summary>

$\sum \binom{2n}{n} x^n$. Ratio: $\frac{(2n+2)(2n+1)}{(n+1)^2} \to 4$. $R = 1/4$. ∎
</details>

<details>
<summary>Exercise 2 — Hadamard unavoidable</summary>

$a_n = 2^n$ if even, $3^n$ if odd. Ratio oscillates. Hadamard: $\sqrt[n]{|a_n|}$ takes 2 or 3; $\limsup = 3$. $R = 1/3$. ∎
</details>

<details>
<summary>Exercise 3 — Closed-form sum</summary>

$\sum n x^n$ for $|x|<1$:
$$= x \frac{d}{dx}\sum x^n = x \frac{d}{dx}\frac{1}{1-x} = \frac{x}{(1-x)^2}. \qquad ∎$$
</details>

<details>
<summary>Exercise 4 — Abel at boundary</summary>

$\sum (-1)^n/(2n+1) = \pi/4$ via $\arctan x$ + Abel. ∎
</details>

<details>
<summary>Exercise 5 — Translated center</summary>

$1/x$ centered at $x_0 = 1$: $1/x = 1/(1+(x-1)) = \sum (-1)^n (x-1)^n$ for $|x-1|<1$. $R = 1$. ∎
</details>

## One-line takeaway

Every power series has a **radius** $R$ (Cauchy-Hadamard: $1/R = \limsup\sqrt[n]{|a_n|}$); converges absolutely in $(-R,R)$ and uniformly on compacts inside; **term-by-term derivation/integration** preserve the radius; boundaries case by case; **Abel at boundary** links series to sums.
