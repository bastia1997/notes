---
title: "Differential calculus theorems: Fermat, Rolle, Lagrange, Cauchy"
area: Derivatives
summary: "The **four theorems** turning the derivative from local object into a global tool. **Fermat** (interior extrema → $f' = 0$), **Rolle** (equal at endpoints → $f' = 0$ somewhere), **Lagrange** (mean value), **Cauchy** (two-function generalization)."
order: 31
level: intermediate
prereq:
  - "Derivatives (sec. 29-30)"
  - "Weierstrass (sec. 25)"
tools:
  - "Rudin — *Principles*, ch. 5"
---

# Differential calculus theorems

## Why

$f'(x_0)$ is **local** information. These four theorems convert local info into **global** info on the whole function. Without them you can't say "$f' \ge 0 \Rightarrow f$ increasing", nor prove Hôpital or Taylor.

## 1. Fermat's theorem (interior extrema)

**Theorem.** $f$ differentiable at $x_0 \in (a, b)$, $x_0$ local extremum ⇒ $f'(x_0) = 0$.

> At interior max/min where $f$ is differentiable, slope is zero (horizontal tangent).

*Proof.* WLOG local max. For $h > 0$ small, $(f(x_0+h) - f(x_0))/h \le 0 \Rightarrow f'_+(x_0) \le 0$. For $h < 0$, $\ge 0 \Rightarrow f'_-(x_0) \ge 0$. Both equal $f'(x_0) = 0$. ∎

> **Warnings:**
> - **Interior only.** $f(x) = x$ on $[0, 1]$: max at 1 with $f'(1) = 1$.
> - **Differentiable only.** $|x|$ has min at 0 but not differentiable.
> - **Necessary, not sufficient.** $x^3$ at 0 has $f' = 0$ but no extremum (inflection).

Points where $f' = 0$ are **critical** or **stationary**.

## 2. Rolle's theorem

**Theorem.** $f$ continuous on $[a, b]$, differentiable on $(a, b)$, $f(a) = f(b)$ ⇒ $\exists c \in (a, b)$ with $f'(c) = 0$.

> **Intuition:** if $f$ starts and ends at the same height, somewhere in between it must have a horizontal tangent.

*Proof.* By Weierstrass, $f$ has max and min on $[a, b]$. Either both at endpoints (then $f$ constant), or one interior (by Fermat, $f' = 0$ there). ∎

## 3. Lagrange theorem (mean value)

> **The most important theorem of the chapter.**

**Theorem (Lagrange).** $f$ continuous on $[a, b]$, differentiable on $(a, b)$ ⇒ $\exists c \in (a, b)$ with
$$f'(c) = \frac{f(b) - f(a)}{b - a}.$$

> **Glossary:**
>
> - $[a, b]$ = closed interval (endpoints included).
> - $(a, b)$ = open interval (endpoints excluded); $f$ differentiable here, not necessarily at endpoints.
> - $f'(c)$ = **instantaneous slope** at $c$.
> - $(f(b) - f(a))/(b - a)$ = **average slope** = slope of the secant through $(a, f(a))$ and $(b, f(b))$.
> - **In words:** somewhere $c$, the tangent is parallel to the secant.

*Proof.* Apply Rolle to $g(x) = f(x) - \frac{f(b) - f(a)}{b - a}(x - a)$. $g(a) = g(b)$. ∎

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <line x1="40" y1="270" x2="580" y2="270" stroke="#948f78" stroke-width="1"/>
  <path d="M 80 250 Q 250 150 350 100 Q 450 80 540 130" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <line x1="80" y1="250" x2="540" y2="130" stroke="#6aa9d8" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="100" y="280" fill="#6aa9d8" font-size="11">average slope</text>
  <circle cx="350" cy="100" r="4" fill="#d4af37"/>
  <text x="345" y="90" fill="#d4af37" font-size="11" font-style="italic">c</text>
  <line x1="270" y1="120" x2="430" y2="80" stroke="#d4af37" stroke-width="1.5"/>
</svg>
<div class="chart-caption">Lagrange: there's a point $c$ where the tangent is **parallel** to the secant through $(a, f(a))$ and $(b, f(b))$.</div>
</div>

### Crucial consequences

**Corollary (monotonicity).**
- $f' \ge 0$ on $(a, b)$ ⇒ $f$ increasing.
- $f' > 0$ ⇒ strictly increasing.
- $f' \equiv 0$ ⇒ $f$ constant.

**Corollary (Lipschitz).** $|f'| \le M$ ⇒ $|f(x) - f(y)| \le M |x - y|$.

## 4. Cauchy theorem (generalized mean value)

**Theorem.** $f, g$ continuous on $[a, b]$, differentiable on $(a, b)$, $g' \ne 0$ ⇒ $\exists c$ with
$$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(c)}{g'(c)}.$$

For $g(x) = x$, reduces to Lagrange. **Used in proving Hôpital.**

## Exercises

<details>
<summary>Exercise 1 — Rolle at work</summary>

Show $p(x) = x^3 - 3x + 1$ has exactly 3 real roots.

**Solution.** $p(\pm\infty) = \pm\infty$, so at least one root. $p' = 3x^2 - 3 = 0$ at $\pm 1$. Monotonicity sign changes 3 times, $p(-1) > 0, p(1) < 0$: 3 roots. ∎
</details>

<details>
<summary>Exercise 2 — Lagrange for inequalities</summary>

Show $|\sin x - \sin y| \le |x - y|$.

**Solution.** By Lagrange, $\sin x - \sin y = \cos c (x - y)$. $|\cos c| \le 1$. ∎
</details>

## One-line takeaway

**Fermat** (interior extrema → $f' = 0$), **Rolle** (equal endpoints → derivative vanishes), **Lagrange** (avg = instantaneous slope), **Cauchy** (pair version): four theorems converting local derivative info into global function info.
