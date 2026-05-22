---
title: "Derivative: definition and geometric interpretation"
area: Derivatives
summary: "The definition of the **derivative** as a limit of difference quotients — the instantaneous slope of a curve. Geometric meaning (tangent), physical (velocity). Differentiable ⇒ continuous, but not conversely ($|x|$ at 0)."
order: 28
level: intermediate
prereq:
  - "Function limits (sec. 20-22)"
  - "Continuity (sec. 24)"
tools:
  - "Rudin — *Principles*, ch. 5"
---

# Derivative: definition and geometric interpretation

## Origin

Two historically distinct problems converge to the same object:

- **Tangent** (Fermat, Descartes): what's the slope of the tangent to $y = f(x)$ at $(x_0, f(x_0))$?
- **Instantaneous velocity** (Newton): given position $s(t)$, what's the velocity at $t_0$?

Both require the **limit** of $\Delta y / \Delta x$ as $\Delta x \to 0$. This is the **derivative**.

## Definition

**Definition.** $f : I \to \mathbb{R}$ on open interval, $x_0 \in I$. $f$ is **differentiable at $x_0$** if the limit
$$f'(x_0) := \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}$$
exists finite.

> **Glossary:**
>
> - $h$ = small increment of $x$. As $h \to 0$, we "shrink" around $x_0$.
> - $(f(x_0 + h) - f(x_0))/h$ = **difference quotient**: change in $y$ over change in $x$.
> - Geometrically: slope of secant through $(x_0, f(x_0))$ and $(x_0 + h, f(x_0 + h))$.
> - As $h \to 0$, secant becomes **tangent**, slope is $f'(x_0)$.

Equivalently with $x = x_0 + h$: $f'(x_0) = \lim_{x \to x_0}(f(x) - f(x_0))/(x - x_0)$.

**Notation:** $f'(x_0)$ (Lagrange), $df/dx(x_0)$ (Leibniz), $\dot f$ (Newton).

## One-sided derivatives

$f'_+(x_0) = \lim_{h \to 0^+}$, $f'_-(x_0) = \lim_{h \to 0^-}$. $f$ differentiable iff both equal.

## Geometric interpretation

**Tangent line** at $(x_0, f(x_0))$:
$$y = f(x_0) + f'(x_0)(x - x_0).$$

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <line x1="40" y1="270" x2="580" y2="270" stroke="#948f78" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="290" stroke="#948f78" stroke-width="1"/>
  <path d="M 80 240 Q 200 260 300 180 Q 400 100 540 60" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <line x1="200" y1="240" x2="450" y2="80" stroke="#d4af37" stroke-width="2"/>
  <text x="455" y="75" fill="#d4af37" font-size="12">tangent</text>
  <circle cx="300" cy="180" r="4" fill="#6fb38a"/>
</svg>
<div class="chart-caption">$f'(x_0)$ is the slope of the tangent at $(x_0, f(x_0))$.</div>
</div>

## Guided examples

### Example 1: $x^2$ at $x_0 = 3$

$((3+h)^2 - 9)/h = 6 + h \to 6$. So $f'(3) = 6$. In general $(x^2)' = 2x$.

### Example 2: $\sqrt x$ at $x_0 > 0$

$(\sqrt{x_0+h} - \sqrt{x_0})/h = 1/(\sqrt{x_0+h} + \sqrt{x_0}) \to 1/(2\sqrt{x_0})$.

### Example 3: $|x|$ at 0 — NOT differentiable

$(|h| - 0)/h = \text{sgn}(h)$. $f'_+(0) = 1$, $f'_-(0) = -1$. Different → not differentiable.

> **Lesson:** at "corner" points, derivative doesn't exist even if continuous.

## Differentiable ⇒ continuous

**Theorem.** Differentiable at $x_0$ ⇒ continuous at $x_0$.

*Proof.* $f(x) - f(x_0) = ((f(x) - f(x_0))/(x - x_0)) \cdot (x - x_0) \to f'(x_0) \cdot 0 = 0$. ∎

> **Converse false.** $|x|$ continuous at 0 but not differentiable.

## Special cases

**Vertical tangent.** If difference quotient $\to \pm\infty$, no derivative but vertical tangent. E.g. $\sqrt[3]{x}$ at 0.

**Cusp.** $f'_- = -\infty$, $f'_+ = +\infty$ (or reverse). E.g. $\sqrt[3]{x^2}$ at 0.

## Exercises

<details>
<summary>Exercise 1 — Derivative of $1/x$</summary>

**Solution.** $(1/(x_0+h) - 1/x_0)/h = -1/(x_0(x_0+h)) \to -1/x_0^2$. ∎
</details>

<details>
<summary>Exercise 2 — Corner</summary>

$f(x) = x|x|$. Differentiable at 0?

**Solution.** $x > 0$: $f = x^2$, $f'_+(0) = 0$. $x < 0$: $f = -x^2$, $f'_-(0) = 0$. Equal → **differentiable**, $f'(0) = 0$. ∎
</details>

<details>
<summary>Exercise 3 — Vertical tangent</summary>

$\sqrt[3]{x}$ at 0?

**Solution.** $\sqrt[3]{h}/h = 1/h^{2/3} \to +\infty$. Not differentiable, but vertical tangent. ∎
</details>

## One-line takeaway

The derivative $f'(x_0) = \lim_{h \to 0}(f(x_0 + h) - f(x_0))/h$ is the **instantaneous slope** at $x_0$ — unifying "geometric tangent" with "physical velocity" — and differentiable ⇒ continuous, but not conversely.
