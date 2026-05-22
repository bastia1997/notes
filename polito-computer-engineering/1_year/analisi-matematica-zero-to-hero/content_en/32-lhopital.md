---
title: "L'Hôpital's rule"
area: Derivatives
summary: "The most-used (and most-abused) tool for $0/0$ and $\\infty/\\infty$ forms — differentiate numerator and denominator separately and retry. Works when hypotheses hold; fails when they're forgotten."
order: 32
level: intermediate
prereq:
  - "Cauchy theorem (sec. 31)"
  - "Indeterminate forms (sec. 21)"
tools:
  - "Rudin — *Principles*, ch. 5"
---

# L'Hôpital's rule

## Why

For $0/0$ or $\infty/\infty$ limits, algebra fails. **Hôpital**: differentiate numerator and denominator separately, retry. Justification: Cauchy theorem (ch. 31).

> Most misunderstood tool. Doesn't apply to *all* indeterminate forms.

## Statement

**Theorem (Hôpital, $0/0$).** $f, g$ differentiable in punctured neighborhood of $x_0$, $g' \ne 0$. If:
1. $\lim f = 0$ and $\lim g = 0$;
2. $\lim f'/g' = L$;

then $\lim f/g = L$.

**Theorem ($\infty/\infty$).** Same with $\lim |g| = +\infty$.

> **In words:** if you can't compute $\lim f/g$, try $\lim f'/g'$ — if that exists, same answer.

*Proof ($0/0$).* Extend $f(x_0) = g(x_0) = 0$. By Cauchy on $[x_0, x]$: $f(x)/g(x) = f'(c)/g'(c)$ for some $c \in (x_0, x)$. As $x \to x_0$, $c \to x_0$. ∎

## Examples

**1.** $\lim_0 \sin x/x$. $0/0$. Hôpital: $\cos x/1 \to 1$. ✓

**2.** $\lim_0 (e^x - 1 - x)/x^2$. $0/0$ twice: $\lim e^x/2 = 1/2$.

**3.** $\lim_{+\infty} \ln x/x$. $\infty/\infty$. Hôpital: $1/x \to 0$.

**4.** $\lim_{+\infty} x^\alpha/e^x = 0$. Iterate Hôpital.

## Other indeterminate forms

Reduce to $0/0$ or $\infty/\infty$:

- **$0 \cdot \infty$:** rewrite as $f/(1/g)$.
- **$\infty - \infty$:** factor or common denominator.
- **$1^\infty, 0^0, \infty^0$:** $f^g = e^{g \ln f}$, work on exponent.

**Example.** $\lim_{0^+} x \ln x$. $0 \cdot (-\infty)$. $= \ln x/(1/x) \to \infty/\infty$. Hôpital: $(1/x)/(-1/x^2) = -x \to 0$.

## When NOT to use Hôpital

**1. Algebra suffices.** $\lim_0 \sin(3x)/\sin(5x) = 3/5$ via notable limits, faster than Hôpital.

**2. Derivatives worse.** Rationalization often beats Hôpital.

**3. Derivative ratio oscillates.** $\lim_{+\infty}(x + \sin x)/x = 1$ (algebra). Hôpital gives $\lim(1 + \cos x)$, doesn't exist!

> **Hypothesis (2) "$\lim f'/g' = L$" is essential.** If it doesn't exist, Hôpital says nothing.

## Exercises

<details>
<summary>Exercise 1</summary>

$\lim_0 (1 - \cos x)/x^2 = \sin x/(2x) \to 1/2$. ∎
</details>

<details>
<summary>Exercise 2 — Iterated</summary>

$\lim_0 (\tan x - x)/x^3 = 1/3$ (Hôpital + notable). ∎
</details>

<details>
<summary>Exercise 3 — $0^0$</summary>

$\lim_{0^+} x^x = e^0 = 1$ (since $x \ln x \to 0$). ∎
</details>

## One-line takeaway

Hôpital: for $0/0$ and $\infty/\infty$, $\lim f/g = \lim f'/g'$ if the latter exists — powerful but use with care, reducing other indeterminate forms to standard.
