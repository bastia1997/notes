---
title: "Differentiation rules (sum, product, quotient, chain)"
area: Derivatives
summary: "Algebraic rules for differentiating combinations — sum, product (Leibniz), quotient, **chain rule**, derivative of inverse. All proved from the definition, applied daily."
order: 29
level: intermediate
prereq:
  - "Derivative definition (sec. 28)"
tools:
  - "Rudin — *Principles*, ch. 5"
---

# Differentiation rules

## Why rules, not just the definition

Differentiating from the definition is prohibitive: for $(x^3 \sin x)/(x^2 + 1)$, the difference quotient is a monster. **Rules** let us build derivatives from elementary pieces.

## Linearity

> $(f + g)' = f' + g'$, $(\lambda f)' = \lambda f'$.

## Product rule (Leibniz)

> $(fg)'(x_0) = f'(x_0) g(x_0) + f(x_0) g'(x_0)$.

*Proof.* Add-subtract $f(x_0 + h) g(x_0)$:
$$\frac{fg(x_0+h) - fg(x_0)}{h} = f(x_0+h) \cdot \frac{g(x_0+h) - g(x_0)}{h} + g(x_0) \cdot \frac{f(x_0+h) - f(x_0)}{h}.$$
As $h \to 0$: continuity of $f$, ratios → $g'$, $f'$. Result: $fg' + gf'$. ∎

> **Mnemonic:** "(derivative of first) × (second) + (first) × (derivative of second)".

## Quotient rule

> $\left(\dfrac{f}{g}\right)'(x_0) = \dfrac{f'(x_0) g(x_0) - f(x_0) g'(x_0)}{g(x_0)^2}$ (if $g(x_0) \ne 0$).

## Chain rule (most important)

> **Theorem.** If $f$ differentiable at $x_0$ and $g$ at $f(x_0)$:
> $$(g \circ f)'(x_0) = g'(f(x_0)) \cdot f'(x_0).$$

> **Glossary:**
>
> - $g \circ f$ = **composition**: $f$ first, then $g$. $(g \circ f)(x) = g(f(x))$.
> - $f$ = **inner** function; $g$ = **outer** function.
> - $g'(f(x_0))$ = derivative of $g$ evaluated at the intermediate value $f(x_0)$.
> - $f'(x_0)$ = derivative of $f$ at $x_0$.
> - **Mnemonic:** "differentiate the outer (leaving the inner inside), multiply by the derivative of the inner".

> **In Leibniz:** $\frac{d g(f)}{dx} = \frac{dg}{df} \cdot \frac{df}{dx}$. The "dx" formally cancel.

*Proof (idea).* $\frac{g(f(x)) - g(f(x_0))}{x - x_0} = \frac{g(f(x)) - g(f(x_0))}{f(x) - f(x_0)} \cdot \frac{f(x) - f(x_0)}{x - x_0} \to g'(f(x_0)) \cdot f'(x_0)$. ∎

**Example.** $h(x) = \sin(x^2)$. $h'(x) = \cos(x^2) \cdot 2x$.

## Derivative of inverse

> Let $f$ continuous strictly monotone, differentiable at $x_0$ with $f'(x_0) \ne 0$. Then $f^{-1}$ differentiable at $y_0 = f(x_0)$ and
> $$(f^{-1})'(y_0) = \frac{1}{f'(x_0)} = \frac{1}{f'(f^{-1}(y_0))}.$$

**Idea.** From $f^{-1}(f(x)) = x$, derive by chain: $(f^{-1})'(f(x)) f'(x) = 1$.

**Example.** $f(x) = e^x$, $f^{-1}(y) = \ln y$. $(\ln)'(y) = 1/e^{\ln y} = 1/y$.

## Exercises

<details>
<summary>Exercise 1 — Leibniz</summary>

$f(x) = x^3 \sin x$. $f' = 3x^2 \sin x + x^3 \cos x$. ∎
</details>

<details>
<summary>Exercise 2 — Quotient</summary>

$f(x) = (x^2 + 1)/(x - 2)$. $f' = (x^2 - 4x - 1)/(x - 2)^2$. ∎
</details>

<details>
<summary>Exercise 3 — Chain</summary>

$f(x) = \sin(\cos(x^2))$. $f' = -2x \sin(x^2) \cos(\cos(x^2))$. ∎
</details>

<details>
<summary>Exercise 4 — $a^x$</summary>

$a^x = e^{x \ln a}$. $(a^x)' = a^x \ln a$. ∎
</details>

<details>
<summary>Exercise 5 — Inverse</summary>

$\arctan y$ via inverse rule: $(\arctan)'(y) = 1/(1 + y^2)$. ∎
</details>

## One-line takeaway

Five rules — **linearity**, **Leibniz** (product), **quotient**, **chain** (composition), **inverse** — suffice to differentiate any combination of elementary functions, reducing the computation to mechanical algebra.
