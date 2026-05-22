---
title: "First-order ODEs"
area: ODEs
summary: "$y' = f(x,y)$. **Separable** (decay, logistic). **Linear** with **integrating factor** $\\mu = e^{\\int a}$. Bernoulli, exact equations, direction fields."
order: 51
level: intermediate
prereq:
  - "Differential calculus (sec. 30-35)"
  - "Integration (sec. 40-43)"
tools:
  - "Pagani-Salsa — *Analisi 2*, ch. 1"
  - "Arnol'd — *Ordinary Differential Equations*"
---

# First-order ODEs

## Why

An **ODE** relates an unknown function $y(x)$ to its derivatives. General form of order $n$: $F(x, y, y', \dots, y^{(n)}) = 0$. **Normal form:** $y^{(n)} = G(x, y, \dots, y^{(n-1)})$.

Here order 1: $y' = f(x, y)$.

ODEs model **everything that changes in time**: decay, growth, circuits, populations, pendulums.

## Definitions

**Solution.** $\varphi : I \to \mathbb{R}$ differentiable on interval $I$, with $\varphi'(x) = f(x, \varphi(x))$.

> **Glossary:**
>
> - **General solution:** family $y = \varphi(x; C)$ with parameter $C$.
> - **Particular solution:** fixed by initial condition $y(x_0) = y_0$.
> - **Singular solutions:** not obtainable from $C$, must be sought separately.

## Geometric interpretation: direction field

$y' = f(x,y)$ assigns to each $(x,y)$ a **slope** $f(x,y)$. Drawing small segments → **direction field**. A solution is a curve tangent at each point.

**Isoclines:** curves $f(x,y) = k$, where all solutions have the same slope.

## Separable ODEs

**Form.** $y' = g(x)\,h(y)$.

**Algorithm:** where $h(y) \ne 0$, formally separate:
$$\frac{dy}{h(y)} = g(x)\,dx \Rightarrow \int \frac{dy}{h(y)} = \int g(x)\,dx + C.$$

> **Constant solutions.** If $h(y_0) = 0$, $y \equiv y_0$ is a solution. Separation (dividing by $h$) loses it: add it back manually.

### Example 1 — Radioactive decay

$N'(t) = -\lambda N(t)$. Separable:
$$N(t) = N_0 e^{-\lambda t}.$$

Half-life: $t_{1/2} = \ln 2/\lambda$.

### Example 2 — Logistic (Verhulst)

$y' = r y(1 - y/K)$. Constants $y = 0, K$. For $0<y<K$:
$$y(x) = \frac{K}{1 + Be^{-rx}}, \quad B = (K-y_0)/y_0.$$

$y \to K$ as $x \to \infty$ (carrying capacity).

### Example 3 — Falling with drag

$v' = g - \alpha v$: $v(t) = g/\alpha + Ce^{-\alpha t}$. **Terminal velocity:** $g/\alpha$.

## Linear first-order ODEs

**Form.** $y' + a(x) y = b(x)$, $a, b$ continuous.

- **Homogeneous** if $b \equiv 0$.
- **Complete** otherwise.

### Homogeneous case

$y' + a(x) y = 0$ separable:
$$y(x) = C e^{-A(x)}, \quad A(x) = \int a(x)\,dx.$$

> 1-dim vector space of solutions.

### Integrating factor (complete)

Seek $\mu(x) > 0$ such that $\mu y' + \mu a y = (\mu y)'$. Requires $\mu' = \mu a$, hence
$$\mu(x) = e^{A(x)}.$$

Then
$$(e^{A(x)} y)' = e^{A(x)} b(x).$$

Integrating:
$$\boxed{y(x) = e^{-A(x)}\left[C + \int e^{A(x)} b(x)\,dx\right].}$$

> **Glossary:**
>
> - $\mu = e^{\int a}$ = **integrating factor**.
> - $y_{\text{gen}} = y_{\text{hom}} + y_{\text{part}}$ (subspace + translation).

### Example 4 — $y' + y = e^x$

$a = 1$, $\mu = e^x$. $(e^x y)' = e^{2x}$, $e^x y = e^{2x}/2 + C$:
$$y = \frac{1}{2} e^x + C e^{-x}.$$

### Example 5 — $xy' - 2y = x^3$ ($x>0$)

Normal form: $y' - (2/x)y = x^2$. $\mu = x^{-2}$. $(x^{-2} y)' = 1$:
$$y = x^3 + Cx^2.$$

### Example 6 — RC circuit

$RC\,v'(t) + v(t) = V(t)$. With $V$ constant: $v(t) = V + (v(0) - V) e^{-t/RC}$. Exponential transient toward steady-state $V$.

## Bernoulli equation

**Form.** $y' + a(x) y = b(x) y^\alpha$, $\alpha \ne 0, 1$.

**Substitution** $z = y^{1-\alpha}$ → linear in $z$:
$$z' = (1-\alpha)[b(x) - a(x) z].$$

Logistic is the case $\alpha = 2$.

## Exact equations (brief)

$M(x,y)\,dx + N(x,y)\,dy = 0$ is **exact** if there exists $F$ with $F_x = M$, $F_y = N$. Then solutions: $F(x,y) = C$.

**Condition:** $M_y = N_x$ (on simply connected open sets).

## Method summary

| Form | Method |
|---|---|
| $y' = g(x) h(y)$ | separate and integrate |
| $y' + a(x) y = b(x)$ | $\mu = e^{\int a}$ |
| $y' + ay = by^\alpha$ | $z = y^{1-\alpha}$ (Bernoulli) |
| $M\,dx + N\,dy = 0$ with $M_y = N_x$ | $F$ such that $F_x = M, F_y = N$ |

## Exercises

<details>
<summary>Exercise 1 — Separable with blow-up</summary>

$y' = xy^2$, $y(0) = 1$. Separable: $-1/y = x^2/2 + C$. $y(0)=1$ → $C=-1$. $y = 2/(2-x^2)$. **Blow-up** at $\pm\sqrt 2$. ∎
</details>

<details>
<summary>Exercise 2 — Linear</summary>

$y' - 2xy = x$. $\mu = e^{-x^2}$. $(e^{-x^2} y)' = xe^{-x^2}$:
$$y = -1/2 + Ce^{x^2}. \qquad ∎$$
</details>

<details>
<summary>Exercise 3 — Numerical logistic</summary>

$r=1$, $K=10$, $y(0)=2$. $B=4$, $y(x) = 10/(1+4e^{-x})$. $y(2) \approx 6.49$. ∎
</details>

<details>
<summary>Exercise 4 — Bernoulli</summary>

$y' + y = y^3$. $z = y^{-2}$: $z' - 2z = -2$. $\mu = e^{-2x}$: $z = 1 + Ce^{2x}$. $y = \pm 1/\sqrt{1+Ce^{2x}}$. ∎
</details>

<details>
<summary>Exercise 5 — Non-uniqueness</summary>

$y' = \sqrt{|y|}$, $y(0)=0$. Two solutions: $y \equiv 0$ and $y = x^2/4$. **Infinitely many mixed solutions**. $f$ not Lipschitz at 0: uniqueness fails. ∎
</details>

## One-line takeaway

For first-order ODEs there are two base methods: **separation** $\int dy/h = \int g\,dx$ for $y' = gh$, and **integrating factor** $\mu = e^{\int a}$ for linear $y'+ay = b$ — Bernoulli and exact reduce to the above; remember **constant solutions** when $h$ vanishes.
