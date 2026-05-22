---
title: "Integration of rational functions"
area: Integrals
summary: "**Deterministic algorithm** to integrate any $P(x)/Q(x)$: euclidean division, factorization of $Q$, **partial fractions**, term-by-term integration. Result always elementary (Liouville)."
order: 42
level: intermediate
prereq:
  - "Integration techniques (sec. 41)"
  - "Polynomials, euclidean division, fundamental theorem of algebra"
tools:
  - "Apostol — *Calculus*, vol. I, ch. 6"
---

# Integration of rational functions

## Why

**Rational functions** — quotients of polynomials $P/Q$ — are the simplest nontrivial class of elementary functions. Important because:

1. They are the destination of many substitutions (Weierstrass, $t = \sqrt[n]{ax+b}$).
2. They **always integrate** in elementary terms: a finite *algorithm* (partial fractions) reduces them to logarithms and arctangents.

## 5-step algorithm

1. **Euclidean division** if $\deg P \ge \deg Q$: $P = NQ + R$, so $P/Q = N + R/Q$. Integrate $N$ directly.
2. **Factor $Q$** over $\mathbb{R}$: product of $(x-\alpha_i)^{m_i}$ and irreducible $(x^2 + b_j x + c_j)^{n_j}$.
3. **Decompose** $R/Q$ in partial fractions.
4. **Find coefficients** (cover-up or linear system).
5. **Integrate** each piece (ln, powers, arctan).

## Partial fraction decomposition

**Theorem (existence and uniqueness).** $R/Q$ with $\deg R < \deg Q$ writes uniquely as
$$\frac{R(x)}{Q(x)} = \sum_{i,k} \frac{A_{i,k}}{(x-\alpha_i)^k} + \sum_{j,l} \frac{B_{j,l} x + C_{j,l}}{(x^2 + b_j x + c_j)^l}.$$

> **Glossary:**
>
> - $\alpha_i$ = real root of $Q$ of multiplicity $m_i$.
> - $x^2+b_j x+c_j$ = irreducible quadratic factor ($b_j^2-4c_j<0$).
> - $A_{i,k}, B_{j,l}, C_{j,l} \in \mathbb{R}$ = coefficients to determine.

### Base integrals

- $\int \frac{A}{x-\alpha}\,dx = A\ln|x-\alpha|$.
- $\int \frac{A}{(x-\alpha)^k}\,dx = -\frac{A}{(k-1)(x-\alpha)^{k-1}}$, $k \ge 2$.
- $\int \frac{Bx+C}{x^2+bx+c}\,dx$ → complete the square, split into $\ln$ + $\arctan$.

## Case 1 — Distinct real roots

**Example.** $\int \frac{dx}{x^2-1}$. $(x-1)(x+1)$:
$$\frac{1}{(x-1)(x+1)} = \frac{A}{x-1} + \frac{B}{x+1}.$$
**Cover-up:** $A = 1/(x+1)|_{x=1} = 1/2$; $B = 1/(x-1)|_{x=-1} = -1/2$.
$$\int \frac{dx}{x^2-1} = \frac{1}{2}\ln\left|\frac{x-1}{x+1}\right| + c.$$

## Case 2 — Multiple real roots

**Example.** $\int \frac{3x+5}{(x-1)^2(x+2)}\,dx$.
$$\frac{3x+5}{(x-1)^2(x+2)} = \frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{C}{x+2}.$$
$3x+5 = A(x-1)(x+2) + B(x+2) + C(x-1)^2$. $x=1$: $B=8/3$. $x=-2$: $C=-1/9$. Coef. $x^2$: $A=1/9$.

$$\int = \frac{1}{9}\ln|x-1| - \frac{8/3}{x-1} - \frac{1}{9}\ln|x+2| + c.$$

## Case 3 — Irreducible quadratic factor

**Algorithm:**

1. **Complete the square:** $x^2+bx+c = (x+b/2)^2 + \gamma^2$, $u = x+b/2$.
2. **Split** $Bx+C = Bu + (C-B\,b/2)$.
3. **Integrate:**
$$\int \frac{Bu}{u^2+\gamma^2}\,du = \frac{B}{2}\ln(u^2+\gamma^2), \quad \int \frac{C-Bb/2}{u^2+\gamma^2}\,du = \frac{C-Bb/2}{\gamma}\arctan\frac{u}{\gamma}.$$

**Example.** $\int \frac{x+3}{x^2+2x+5}\,dx$. $(x+1)^2+4$, $u=x+1$, $x+3 = u+2$:
$$\int \frac{u+2}{u^2+4}\,du = \frac{1}{2}\ln(x^2+2x+5) + \arctan\left(\frac{x+1}{2}\right) + c.$$

## Examples

**1.** $\int \frac{2x-5}{x^2-x-6}\,dx$. $(x-3)(x+2)$. Cover-up: $A=1/5$, $B=9/5$.
$$= \frac{1}{5}\ln|x-3| + \frac{9}{5}\ln|x+2| + c.$$

**2.** $\int \frac{dx}{x^3+x} = \int \frac{dx}{x(x^2+1)}$. $A=1, B=-1, C=0$:
$$= \ln|x| - \frac{1}{2}\ln(x^2+1) + c.$$

**3.** $\int \frac{x^4}{x^2-1}\,dx$. Division: $x^4/(x^2-1) = x^2+1+1/(x^2-1)$.
$$= \frac{x^3}{3} + x + \frac{1}{2}\ln\left|\frac{x-1}{x+1}\right| + c.$$

## Exercises

<details>
<summary>Exercise 1 — Simple roots</summary>

$\int \frac{dx}{x^4-1}$. $(x-1)(x+1)(x^2+1)$: $A=1/4, B=-1/4, C=0, D=-1/2$:
$$= \frac{1}{4}\ln\left|\frac{x-1}{x+1}\right| - \frac{1}{2}\arctan x + c. \qquad ∎$$
</details>

<details>
<summary>Exercise 2 — Definite integral with $\arctan$</summary>

$\int_0^1 \frac{dx}{x^2+x+1}$. $(x+1/2)^2+3/4$:
$$= \frac{2}{\sqrt 3}\left[\arctan(\sqrt 3) - \arctan(1/\sqrt 3)\right] = \frac{2}{\sqrt 3}\cdot \frac{\pi}{6} = \frac{\pi\sqrt 3}{9}. \qquad ∎$$
</details>

<details>
<summary>Exercise 3 — Multiplicity + quadratic</summary>

$\int \frac{dx}{(x-1)^2(x^2+1)}$. $A=-1/2, B=1/2, C=1/2, D=0$:
$$= -\frac{1}{2}\ln|x-1| - \frac{1}{2(x-1)} + \frac{1}{4}\ln(x^2+1) + c. \qquad ∎$$
</details>

## One-line takeaway

Rational integration is a **deterministic algorithm**: division → factorization → partial fractions → term-by-term integration; real roots produce $\ln$, complex ones $\arctan$, multiplicities powers — works **always** (Liouville, 1833).
