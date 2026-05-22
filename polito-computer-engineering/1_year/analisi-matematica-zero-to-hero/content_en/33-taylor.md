---
title: "Taylor polynomial and Taylor's formula"
area: Derivatives
summary: "Approximating $f$ by a polynomial of degree $n$ near a point. **Taylor's formula** with Peano, Lagrange, integral remainders. Notable Maclaurin expansions of $e^x, \\sin x, \\cos x, \\ln(1+x), (1+x)^\\alpha$."
order: 33
level: intermediate
prereq:
  - "Higher derivatives (sec. 29)"
  - "Cauchy theorem (sec. 31)"
  - "$o$-small (sec. 15)"
tools:
  - "Rudin — *Principles*, ch. 5"
---

# Taylor polynomial and Taylor's formula

## Why

$f'(x_0)$ gives the **best linear approximation** near $x_0$: $f(x_0 + h) \approx f(x_0) + f'(x_0) h$ is the tangent line.

**Taylor extends to higher-degree polynomials**: quadratic, cubic, ..., $n$-th terms to improve. Quantitative error control.

Used in: limit computation (ch. 34), local function studies, numerical analysis, power series, defining $e^x, \sin, \cos$ via series.

## Taylor polynomial

**Definition.** $f$ differentiable $n$ times at $x_0$. The **Taylor polynomial of degree $n$**:
$$T_n(x) := \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k = f(x_0) + f'(x_0)(x - x_0) + \frac{f''(x_0)}{2}(x - x_0)^2 + \dots$$

> **Glossary:**
>
> - $f^{(k)}(x_0)$ = $k$-th derivative at $x_0$.
> - $k!$ = factorial.
> - For $x_0 = 0$: **Maclaurin polynomial**.

**Characterization.** $T_n$ is the **unique** degree-$\le n$ polynomial with $T_n^{(k)}(x_0) = f^{(k)}(x_0)$ for $k = 0, \dots, n$.

## Taylor's formula with remainder

**Error:** $R_n(x) = f(x) - T_n(x)$.

### Peano remainder (qualitative)

$$f(x) = T_n(x) + o((x - x_0)^n) \quad (x \to x_0).$$

### Lagrange remainder (quantitative)

$$f(x) = T_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!}(x - x_0)^{n+1}$$
for some $c$ between $x_0$ and $x$.

> Useful for explicit error bounds.

## Notable Maclaurin expansions

For $x \to 0$, memorize:

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots + \frac{x^n}{n!} + o(x^n)$$
$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots + o(x^{2k+2})$$
$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots + o(x^{2k+1})$$
$$\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots + o(x^n)$$
$$(1 + x)^\alpha = 1 + \alpha x + \binom{\alpha}{2} x^2 + \dots + o(x^n)$$

## Examples

**1.** $e^x$ at $x_0 = 0$, order 3: $T_3 = 1 + x + x^2/2 + x^3/6$.

**2.** $\sin x$ order 5: $T_5 = x - x^3/6 + x^5/120$.

**3.** $\ln(1.1) \approx T_2 = 0.1 - 0.005 = 0.095$ (true $\approx 0.0953$).

## Exercises

<details>
<summary>Exercise 1 — Taylor of tan</summary>

$\tan x$ at 0, order 3: $T_3 = x + x^3/3$. ∎
</details>

<details>
<summary>Exercise 2 — Numerical approx</summary>

$\sin(0.5)$ via $T_3$: $0.5 - 0.5^3/6 = 0.47917$. Lagrange error bound: $\le 0.0026$. True: $0.47943$. ∎
</details>

## One-line takeaway

Taylor approximates $f$ near $x_0$ via polynomial $T_n(x) = \sum f^{(k)}(x_0)/k! (x - x_0)^k$, with controlled error (Peano: $o((x-x_0)^n)$; Lagrange: explicit) — basis of all local calculus computations.
