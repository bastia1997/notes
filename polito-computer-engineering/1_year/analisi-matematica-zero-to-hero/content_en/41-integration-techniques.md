---
title: "Integration techniques: parts, substitution"
area: Integrals
summary: "The **two great techniques**. **Parts** = transpose of product rule, $\\int u\\,dv = uv - \\int v\\,du$. **Substitution** = transpose of chain rule, $\\int f(\\varphi)\\varphi'\\,dx = \\int f(u)\\,du$. Standard substitutions."
order: 41
level: intermediate
prereq:
  - "FTC and immediate integrals table (sec. 40)"
  - "Product and chain rules"
tools:
  - "Apostol — *Calculus*, vol. I, ch. 5"
---

# Integration techniques

## Why

The FTC reduces $\int_a^b f$ to finding an antiderivative. The immediate-integrals table covers the basic bricks, but in practice we have **compositions** and **products**. We need manipulations that reduce complex integrals to tabulated forms. Mastering the two base techniques solves **about 80%** of classical integrals.

## Integration by parts

**Theorem.** $f, g \in C^1(I)$. Then
$$\int f(x)\,g'(x)\,dx = f(x)\,g(x) - \int f'(x)\,g(x)\,dx.$$

> **Glossary:**
>
> - $f(x)g(x)$ = the "already done" product.
> - $\int f'g$ = the new residual integral, hopefully simpler.
> - **Differential form (mantra):** $\int u\,dv = uv - \int v\,du$.

*Proof.* From $(fg)' = f'g + fg'$, integrating: $fg = \int f'g + \int fg'$, isolate. ∎

### LIATE strategy

Choose $u$ by the order:

- **L** Logarithms
- **I** Inverse trigonometric
- **A** Algebraic (polynomials)
- **T** Trigonometric
- **E** Exponentials

$u$ = first category present (should *simplify* under derivation); $dv$ = the rest (must be *easily integrable*).

### Examples

**1.** $\int x e^x\,dx$. $u = x$, $dv = e^x dx$: $= xe^x - \int e^x dx = e^x(x-1) + c$.

**2.** $\int \ln x\,dx$. Trick: $\ln x = \ln x \cdot 1$, $u = \ln x$, $dv = dx$: $= x\ln x - x + c$.

**3.** $\int x^2 \sin x\,dx$ (twice). Result: $-x^2\cos x + 2x\sin x + 2\cos x + c$.

**4. Circular trick.** $I = \int e^x \sin x\,dx$. Twice by parts returns $I$:
$$I = -e^x\cos x + e^x\sin x - I \Rightarrow I = \frac{e^x(\sin x - \cos x)}{2} + c.$$

**5.** $\int \arctan x\,dx = x\arctan x - \frac{1}{2}\ln(1+x^2) + c$.

## Integration by substitution

**Theorem.** $\varphi: I \to J$ differentiable $C^1$, $f: J \to \mathbb{R}$ continuous, $F$ antiderivative of $f$. Then
$$\int f(\varphi(x))\,\varphi'(x)\,dx = F(\varphi(x)) + c.$$

> **Glossary:**
>
> - $\varphi(x)$ = **inner** function.
> - $\varphi'(x)\,dx$ = "inner differential", must appear in integrand.
> - Set $u = \varphi(x)$, $du = \varphi'(x)dx$.
> - **Definite form:** $\int_\alpha^\beta f(\varphi)\varphi' = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(u)\,du$.

*Proof.* Chain rule: $(F\circ\varphi)' = F'(\varphi)\varphi' = f(\varphi)\varphi'$. ∎

### Three typical situations

1. **Direct recognition:** $\int 2x e^{x^2}dx = e^{x^2} + c$ with $u = x^2$.
2. **Linear substitution:** $u = ax + b$. $\int \sin(3x+1) dx = -\frac{1}{3}\cos(3x+1) + c$.
3. **Creative substitution:** $u = \sqrt x$, $u = e^x$, $u = \tan(x/2)$.

### Examples

**1.** $\int \frac{x}{\sqrt{1+x^2}}dx$, $u=1+x^2$: $= \sqrt{1+x^2} + c$.

**2.** $\int \tan x\,dx = \int \sin x/\cos x\,dx$, $u = \cos x$: $= -\ln|\cos x| + c$.

**3.** $\int \sqrt{1-x^2}\,dx$, $x = \sin\theta$: $= \frac{\arcsin x}{2} + \frac{x\sqrt{1-x^2}}{2} + c$.

## Standard substitutions

### Trigonometric (radicals)

| Form | Substitution |
|---|---|
| $\sqrt{a^2 - x^2}$ | $x = a\sin\theta$ |
| $\sqrt{a^2 + x^2}$ | $x = a\tan\theta$ |
| $\sqrt{x^2 - a^2}$ | $x = a\sec\theta$ |

### Weierstrass (rationals in $\sin/\cos$)

For $\int R(\sin x, \cos x)\,dx$: $t = \tan(x/2)$. Then
$$\sin x = \frac{2t}{1+t^2},\quad \cos x = \frac{1-t^2}{1+t^2},\quad dx = \frac{2\,dt}{1+t^2}.$$

**Example.** $\int \frac{dx}{\sin x}$ via Weierstrass: $\int \frac{dt}{t} = \ln|\tan(x/2)| + c$.

### Radicals $\sqrt[n]{ax+b}$

$t = \sqrt[n]{ax+b}$, $x = (t^n-b)/a$, $dx = (n t^{n-1}/a)\,dt$. Transforms into rational.

## Mnemonic table

| Integrand | Technique |
|---|---|
| $P(x)e^{ax}, P(x)\sin(ax)$ | parts, $u=P$ |
| $P(x)\ln x, P(x)\arctan x$ | parts, $u=\ln x$ or $\arctan x$ |
| $e^{ax}\sin(bx), e^{ax}\cos(bx)$ | circular trick |
| $f(g(x))g'(x)$ | substitution $u=g$ |
| $\sqrt{a^2 \pm x^2}, \sqrt{x^2-a^2}$ | trig substitution |
| $R(\sin x,\cos x)$ | Weierstrass |

## Exercises

<details>
<summary>Exercise 1 — Parts</summary>

$\int x\cos(2x)\,dx$. $u=x$, $dv=\cos(2x)dx$, $v=\sin(2x)/2$:
$$= \frac{x\sin(2x)}{2} + \frac{\cos(2x)}{4} + c. \qquad ∎$$
</details>

<details>
<summary>Exercise 2 — Logarithm by parts</summary>

$\int \frac{\ln x}{x^2}\,dx$. $u=\ln x$, $dv=dx/x^2$, $v=-1/x$:
$$= -\frac{\ln x}{x} - \frac{1}{x} + c. \qquad ∎$$
</details>

<details>
<summary>Exercise 3 — Trig substitution</summary>

$\int \frac{dx}{\sqrt{4-x^2}}$. $x = 2\sin\theta$:
$$\int d\theta = \arcsin(x/2) + c. \qquad ∎$$
</details>

<details>
<summary>Exercise 4 — Odd-power reduction</summary>

$\int_0^{\pi/2}\sin^3 x\,dx$. $\sin^3 = \sin(1-\cos^2)$, $u=\cos x$:
$$= \int_0^1(1-u^2)du = 2/3. \qquad ∎$$
</details>

## One-line takeaway

**Parts** ($\int u\,dv = uv - \int v\,du$) is the transpose of product rule; **substitution** ($u = \varphi(x)$) is the transpose of chain rule — 80% of integrals dissolve by combining them, with a catalog of standard substitutions for radicals and trigonometric rationals.
