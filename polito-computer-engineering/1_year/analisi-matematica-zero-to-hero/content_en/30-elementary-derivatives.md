---
title: "Derivatives of elementary functions"
area: Derivatives
summary: "The **table of fundamental derivatives** — the core vocabulary of calculus. Every entry proved, from the power rule to inverse trig. Memorize, don't redo the limit each time."
order: 30
level: intermediate
prereq:
  - "Derivative definition (sec. 28)"
  - "Differentiation rules (sec. 29)"
tools:
  - "Rudin — *Principles*, ch. 5"
---

# Derivatives of elementary functions

## Life-saving table

All proved below. But **memorize**: without it, $(e^{\sin x})'$ is impossible.

> **Glossary:**
>
> - $c$ = real constant (fixed number).
> - $n \in \mathbb{N}$ = natural number.
> - $\alpha \in \mathbb{R}$ = any real exponent (positive, negative, or fractional).
> - $a > 0$, $a \ne 1$ = base of exponential/logarithm (for $a = e$ we recover $e^x, \ln x$).
> - **Domain** = set of $x$ where both $f$ and $f'$ are defined.
> - $\sinh x = (e^x - e^{-x})/2$, $\cosh x = (e^x + e^{-x})/2$ = **hyperbolic functions**.

| $f(x)$ | $f'(x)$ | domain |
|---|---|---|
| $c$ (constant) | $0$ | $\mathbb{R}$ |
| $x^n$, $n \in \mathbb{N}$ | $n x^{n-1}$ | $\mathbb{R}$ |
| $x^\alpha$, $\alpha \in \mathbb{R}$ | $\alpha x^{\alpha-1}$ | $x > 0$ |
| $\sqrt x$ | $1/(2\sqrt x)$ | $x > 0$ |
| $1/x$ | $-1/x^2$ | $x \ne 0$ |
| $e^x$ | $e^x$ | $\mathbb{R}$ |
| $a^x$ | $a^x \ln a$ | $\mathbb{R}$ |
| $\ln x$ | $1/x$ | $x > 0$ |
| $\log_a x$ | $1/(x \ln a)$ | $x > 0$ |
| $\sin x$ | $\cos x$ | $\mathbb{R}$ |
| $\cos x$ | $-\sin x$ | $\mathbb{R}$ |
| $\tan x$ | $1/\cos^2 x$ | $\cos x \ne 0$ |
| $\arcsin x$ | $1/\sqrt{1 - x^2}$ | $|x| < 1$ |
| $\arccos x$ | $-1/\sqrt{1 - x^2}$ | $|x| < 1$ |
| $\arctan x$ | $1/(1 + x^2)$ | $\mathbb{R}$ |
| $\sinh x$ | $\cosh x$ | $\mathbb{R}$ |
| $\cosh x$ | $\sinh x$ | $\mathbb{R}$ |
| $\tanh x$ | $1/\cosh^2 x$ | $\mathbb{R}$ |

## Proofs

### Integer power $x^n$

By induction: $(x \cdot x^n)' = x^n + x \cdot n x^{n-1} = (n+1) x^n$ (Leibniz). ∎

### General power $x^\alpha$ ($x > 0$)

$x^\alpha = e^{\alpha \ln x}$. Chain: $(x^\alpha)' = x^\alpha \cdot \alpha/x = \alpha x^{\alpha - 1}$. ∎

### Exponential $e^x$

$(e^{x_0+h} - e^{x_0})/h = e^{x_0}(e^h - 1)/h \to e^{x_0}$ (notable limit). ∎

### Logarithm $\ln x$

Inverse of $e^x$: $(\ln)'(y) = 1/e^{\ln y} = 1/y$. ∎

### Sine

$(\sin(x+h) - \sin x)/h = \sin x \cdot (\cos h - 1)/h + \cos x \cdot \sin h/h \to 0 + \cos x = \cos x$. ∎

### Tangent

$(\sin/\cos)' = (\cos^2 + \sin^2)/\cos^2 = 1/\cos^2$. ∎

### Arcsine

$(\arcsin)'(y) = 1/\cos(\arcsin y) = 1/\sqrt{1 - y^2}$. ∎

### Arctangent

$(\arctan)'(y) = 1/(1 + y^2)$. ∎

### Hyperbolic

$(\sinh)' = (e^x + e^{-x})/2 = \cosh$. $(\cosh)' = \sinh$. Direct.

## Composite examples

**1.** $(e^{\sin x})' = e^{\sin x} \cos x$.

**2.** $(\ln(\cos x))' = -\tan x$.

**3.** $(x^x)' = x^x(\ln x + 1)$ (via $e^{x \ln x}$).

**4.** $(\arctan(x^2))' = 2x/(1 + x^4)$.

## Exercises

<details>
<summary>Exercise 1 — Leibniz + chain</summary>

$f(x) = \sin(x^2) e^{3x}$. $f' = e^{3x}(2x \cos(x^2) + 3\sin(x^2))$. ∎
</details>

<details>
<summary>Exercise 2 — $x^{\sin x}$</summary>

$(x^{\sin x})' = x^{\sin x}(\cos x \ln x + \sin x/x)$. ∎
</details>

## One-line takeaway

Memorize the elementary derivatives table + apply the 5 rules (ch. 29) — any function built from these is differentiable algorithmically.
