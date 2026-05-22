---
title: "Types of discontinuities"
area: Continuity
summary: "Three types of isolated discontinuities — **removable** (limit exists, $\\ne f(x_0)$), **jump** (different one-sided limits), **essential** (a one-sided limit missing or infinite). Monotone functions have only jumps, at most countably many."
order: 27
level: intermediate
prereq:
  - "Continuity (sec. 24)"
  - "One-sided limits (sec. 20)"
tools:
  - "Rudin — *Principles*, ch. 4"
---

# Types of discontinuities

## Classical classification (Dirichlet)

Let $f : D \to \mathbb{R}$ and $x_0$ a two-sided accumulation point. If $f$ isn't continuous at $x_0$, look at the one-sided limits:
$$\ell^- = \lim_{x \to x_0^-} f(x), \qquad \ell^+ = \lim_{x \to x_0^+} f(x).$$

> **Glossary:**
>
> - $x \to x_0^-$ = $x$ approaches $x_0$ **from the left** (smaller values).
> - $x \to x_0^+$ = $x$ approaches $x_0$ **from the right** (larger values).
> - $\ell^-$ = **left limit**; $\ell^+$ = **right limit**.
> - $f(x_0)$ = the value of $f$ at the point itself (may differ from limits).
> - Continuity $\iff \ell^- = \ell^+ = f(x_0)$.

Cases:

1. **Removable:** $\ell^-, \ell^+$ exist finite and $\ell^- = \ell^+ =: \ell \ne f(x_0)$ (or $x_0 \notin D$). Redefining $f(x_0) = \ell$ makes $f$ continuous.

2. **Jump (first kind):** $\ell^-, \ell^+$ finite but $\ell^- \ne \ell^+$. **Jump** = $\ell^+ - \ell^-$.

3. **Essential (second kind):** at least one one-sided limit missing or infinite.

## 1. Removable

**Canonical example.** $f(x) = (x^2 - 1)/(x - 1)$. For $x \ne 1$: $f = x + 1 \to 2$. Extends to $\tilde f(1) = 2$.

**Classical:** $\sin x/x$ at 0 (limit 1). The **sinc** function is $\sin x/x$ with $\text{sinc}(0) = 1$.

## 2. Jump (first kind)

**Examples:**
- $\text{sgn}(x)$ at 0: $\ell^- = -1$, $\ell^+ = 1$, jump = 2.
- $\lfloor x \rfloor$ at every $n \in \mathbb{Z}$: jump 1.
- **Heaviside** $H$.

## 3. Essential

**Example 1 (infinite):** $1/x$ at 0.

**Example 2 (oscillation):** $\sin(1/x)$ at 0. No one-sided limit.

## Monotone functions: only jumps

**Theorem.** Monotone $f$ on $(a, b)$ has only **first-kind** discontinuities, at most **countably many**.

*Idea.* Monotone has both one-sided limits always; no essential. Each jump corresponds to a disjoint interval $(\ell^-, \ell^+)$; only countably many disjoint intervals fit in $\mathbb{R}$.

## Exercises

<details>
<summary>Exercise 1 — Classify</summary>

(a) $\sin x/x$ at 0. (b) $\lfloor x \rfloor$ at 3. (c) $1/x^2$ at 0.

**Solution.** (a) Removable. (b) Jump (size 1). (c) Essential. ∎
</details>

<details>
<summary>Exercise 2 — Many jumps</summary>

Build a monotone function with infinitely many discontinuities.

**Solution.** $f(x) = \sum_{n: 1/n < x} 1/n^2$. Jumps at $1/n$. ∎
</details>

## One-line takeaway

Three isolated discontinuity types: **removable** (limit exists, $\ne f(x_0)$), **jump** ($\ell^- \ne \ell^+$ finite), **essential** (missing or infinite) — monotone functions have **only** jumps, at most countably many.
