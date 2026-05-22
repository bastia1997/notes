---
title: "Monotonicity, maxima, minima, critical points"
area: Derivatives
summary: "From **sign of $f'$** to monotonicity. First and second derivative tests for max/min/inflection. Tools for function studies and optimization."
order: 35
level: intermediate
prereq:
  - "Fermat and Lagrange (sec. 31)"
tools:
  - "Rudin — *Principles*, ch. 5"
---

# Monotonicity, maxima, minima, critical points

## Why

The link between **sign of $f'$** and behavior of $f$ is the local→global bridge (the other is $f''$, ch. 36). Knowing growth/decay, where max/min are, how to optimize real problems.

## Monotonicity from derivative

**Theorem (Lagrange corollary).** $f$ continuous on $[a, b]$, differentiable on $(a, b)$:

- $f' \ge 0$ on $(a, b)$ $\iff$ $f$ increasing.
- $f' > 0$ ⇒ **strictly** increasing.
- $f' \equiv 0$ ⇒ $f$ constant.

> "$f' > 0$" sufficient, not necessary: $x^3$ is strictly increasing but $f'(0) = 0$.

## Critical points and classification

**Definition.** **Critical** (stationary) point: $f'(x_0) = 0$.

> **Glossary:**
>
> - $f'(x_0) = 0$ = tangent line at $x_0$ is **horizontal**.
> - **Local max/min** = highest/lowest in a neighborhood (not necessarily globally).
> - **Inflection with horizontal tangent** = curve crosses its tangent, changing concavity (e.g., $x^3$ at 0).
> - **Absolute (global) extremum** = max/min over the whole domain considered.

By Fermat, interior local extrema with $f$ differentiable are critical. Converse false: critical can be max, min, or **inflection** ($x^3$ at 0).

### First derivative test

For critical $x_0$:
- $f' > 0$ left, $< 0$ right → **local max**.
- $f' < 0$ left, $> 0$ right → **local min**.
- Same sign on both sides → **inflection with horizontal tangent**.

### Second derivative test

For critical $x_0$ with continuous $f''$:
- $f''(x_0) > 0$ → **local min** (concave up).
- $f''(x_0) < 0$ → **local max** (concave down).
- $f''(x_0) = 0$ → **inconclusive**.

## Absolute extrema

On **compact** $[a, b]$ (Weierstrass): max/min exist among {interior critical} ∪ {endpoints} ∪ {non-differentiable points}.

Algorithm:
1. Find all interior critical points.
2. Add endpoints $a, b$.
3. Evaluate $f$ at all candidates.
4. Max/min = largest/smallest.

## Worked example

$f(x) = x^4 - 4 x^3$.

$f' = 4 x^3 - 12 x^2 = 4 x^2(x - 3) = 0$ at $x = 0, 3$.

Sign: $f' < 0$ for $x < 3$ (excluding zero), $f' > 0$ for $x > 3$.

- $x = 0$: same sign both sides → **inflection with horizontal tangent**.
- $x = 3$: $f'$ goes $- \to +$ → **local min**. $f(3) = -27$.

## Exercises

<details>
<summary>Exercise 1</summary>

Max/min of $f(x) = x^3 - 3x$ on $[-2, 2]$.

**Solution.** $f' = 3x^2 - 3 = 0$ at $\pm 1$. Candidates: $-2, -1, 1, 2$. Values $-2, 2, -2, 2$. Max $= 2$, min $= -2$. ∎
</details>

<details>
<summary>Exercise 2 — Second derivative test</summary>

$f(x) = x e^{-x^2}$. $f' = e^{-x^2}(1 - 2x^2) = 0$ at $x = \pm 1/\sqrt 2$. $f''$ sign gives min at $-1/\sqrt 2$, max at $1/\sqrt 2$. ∎
</details>

## One-line takeaway

**Monotonicity** from sign of $f'$; **interior extrema** at critical points ($f' = 0$), classified by sign change of $f'$ or sign of $f''$; **absolute extrema** on compacts among critical + endpoints + non-differentiable points.
