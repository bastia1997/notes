---
title: "Fundamental theorem of calculus"
area: Integrals
summary: "The **bridge** between derivative and integral. **FTC-I:** the integral function has the integrand as derivative. **FTC-II (Newton-Leibniz):** $\\int_a^b f = F(b) - F(a)$. Table of immediate integrals."
order: 40
level: intermediate
prereq:
  - "Riemann integral (sec. 39)"
  - "Mean-value theorem for integrals (sec. 39)"
tools:
  - "Rudin — *Principles*, ch. 6"
---

# Fundamental theorem of calculus

## Why

The Riemann integral is built as **area** (limit of sums). The derivative is a **rate of change** (limit of difference quotients). Apparently no relation. But Newton (1666) and Leibniz (1675) discovered independently that the two operations are **inverses**.

This is the **Fundamental Theorem of Calculus (FTC)**, the axis of 17th-century analysis. Two forms:

- **FTC-I (derivative of integral function):** $\dfrac{d}{dx}\int_a^x f(t)\,dt = f(x)$.
- **FTC-II (Newton-Leibniz):** $\int_a^b f(x)\,dx = F(b) - F(a)$, where $F' = f$.

## The integral function

**Definition.** Let $f \in \mathcal{R}([a,b])$ (Riemann-integrable). The **integral function** of $f$ with base point $a$:
$$F(x) := \int_a^x f(t)\,dt, \qquad x \in [a,b].$$

> **Glossary:**
>
> - $\int_a^x f(t)\,dt$ = signed area under $f$ between $a$ and $x$.
> - $t$ = **dummy** integration variable (name doesn't matter).
> - $x$ = variable of $F$.
> - Convention: $F(a) = 0$.

**Proposition (continuity).** If $|f| \le K$, $F$ is $K$-Lipschitz, in particular continuous.

*Proof.* $|F(x') - F(x)| = |\int_x^{x'} f| \le K|x'-x|$. ∎

## FTC part I

**Theorem (FTC-I).** $f \in \mathcal{R}([a,b])$, $F(x) = \int_a^x f$. If $f$ is **continuous at $x_0$**, then $F$ is differentiable at $x_0$ with
$$F'(x_0) = f(x_0).$$

In particular, if $f \in C([a,b])$, $F \in C^1$ with $F' = f$.

*Proof.* Difference quotient:
$$\frac{F(x_0+h)-F(x_0)}{h} = \frac{1}{h}\int_{x_0}^{x_0+h} f(t)\,dt.$$
Subtracting $f(x_0) = \frac{1}{h}\int_{x_0}^{x_0+h} f(x_0)\,dt$:
$$\frac{F(x_0+h)-F(x_0)}{h} - f(x_0) = \frac{1}{h}\int_{x_0}^{x_0+h}[f(t)-f(x_0)]\,dt.$$
By continuity, $|f(t)-f(x_0)|<\varepsilon$ for $|h|<\delta$; modulus of RHS is $\le \varepsilon$. Hence $\to 0$. ∎

## Antiderivatives and indefinite integral

**Definition.** $G$ is an **antiderivative** (or primitive) of $f$ on $I$ if $G' = f$ everywhere on $I$.

**Proposition.** Two antiderivatives on an interval differ by a constant.

*Proof.* $H = G_1 - G_2$ has $H' = 0$ → $H$ constant by Lagrange. ∎

**Notation.** The **indefinite integral**:
$$\int f(x)\,dx = G(x) + c, \quad c \in \mathbb{R}.$$

Family of all antiderivatives; $c$ is the **integration constant**.

**Corollary.** If $f \in C([a,b])$, $f$ admits an antiderivative (the integral function).

## FTC part II (Newton-Leibniz)

**Theorem (FTC-II).** $f \in \mathcal{R}([a,b])$ with antiderivative $G$. Then
$$\int_a^b f(x)\,dx = G(b) - G(a) =: [G(x)]_a^b.$$

*Proof.* Partition $D$. Telescoping: $G(b) - G(a) = \sum [G(x_k)-G(x_{k-1})]$. By Lagrange on $[x_{k-1},x_k]$: $G(x_k)-G(x_{k-1}) = G'(\xi_k)\Delta x_k = f(\xi_k)\Delta x_k$. Hence
$$s(D,f) \le \sum f(\xi_k)\Delta x_k = G(b)-G(a) \le S(D,f).$$
Passing to sup/inf and using integrability: $G(b)-G(a) = \int_a^b f$. ∎

## Table of immediate integrals

| $f(x)$ | $\int f(x)\,dx$ |
|---|---|
| $x^\alpha$, $\alpha \ne -1$ | $\dfrac{x^{\alpha+1}}{\alpha+1}$ |
| $1/x$ | $\ln |x|$ |
| $e^x$ | $e^x$ |
| $a^x$, $a>0$, $a \ne 1$ | $a^x/\ln a$ |
| $\sin x$ | $-\cos x$ |
| $\cos x$ | $\sin x$ |
| $1/\cos^2 x$ | $\tan x$ |
| $1/\sqrt{1-x^2}$ | $\arcsin x$ |
| $1/(1+x^2)$ | $\arctan x$ |
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |

> Memorizing these is essential: every integration technique aims to reduce the integrand to these forms.

## Examples

**1.** $\int_0^\pi \sin x\,dx = [-\cos x]_0^\pi = -(-1) - (-1) = 2$.

**2.** $\int_1^e \frac{dx}{x} = [\ln x]_1^e = 1$.

**3.** $\int_0^1 x^n\,dx = 1/(n+1)$.

**4.** $G(x) = \int_0^x e^{-t^2}\,dt$ (error function, up to constants): not elementary, but by FTC-I $G \in C^1$ with $G'(x) = e^{-x^2}$.

## Exercises

<details>
<summary>Exercise 1 — Derivative of integral function</summary>

$F(x) = \int_0^x \sin(t^2)\,dt$. Compute $F', F''$.

**Solution.** By FTC-I, $F'(x) = \sin(x^2)$. Chain: $F''(x) = 2x \cos(x^2)$. ∎
</details>

<details>
<summary>Exercise 2 — Variable endpoints</summary>

$H(x) = \int_x^{x^2} e^{-t^2}\,dt$. Compute $H'$.

**Solution.** $H(x) = \int_0^{x^2} - \int_0^x$, so $H'(x) = e^{-x^4}\cdot 2x - e^{-x^2}$. ∎
</details>

<details>
<summary>Exercise 3 — Direct computation</summary>

$\int_0^2 (3x^2 - 2x + 1)\,dx = [x^3 - x^2 + x]_0^2 = 8 - 4 + 2 = 6$. ∎
</details>

## One-line takeaway

The **FTC** states derivative and integral are inverses: **part I** says $F(x) = \int_a^x f$ has derivative $f$ (for $f$ continuous); **part II** (Newton-Leibniz) computes $\int_a^b f = F(b) - F(a)$ with any antiderivative $F$.
