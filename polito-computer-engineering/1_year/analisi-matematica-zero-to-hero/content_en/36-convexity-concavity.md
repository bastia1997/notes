---
title: "Convexity, concavity, inflection points"
area: Derivatives
summary: "The **global curvature** of a function. **Convex** = chords above graph (\"valley shape\"). Equivalent definitions (geometric, $f'' \\ge 0$, Jensen). Inflection points, classical inequalities."
order: 36
level: intermediate
prereq:
  - "First and second derivatives (sec. 29-30)"
  - "Monotonicity from derivative (sec. 35)"
tools:
  - "Rudin — *Principles*, ch. 5"
---

# Convexity, concavity, inflection points

## Why

$f'$ tells whether $f$ grows or shrinks. $f''$ tells whether it grows **accelerating** or **decelerating**: whether the curve "holds the chord above" or "below". This is **convexity**.

Consequences: Jensen's inequality, the big inequalities (AM-GM, Young, Cauchy-Schwarz), existence of global minima in optimization.

## Geometric definition

**Definition.** $f : I \to \mathbb{R}$ ($I$ interval) is **convex** if for every $x, y \in I$ and $\lambda \in [0, 1]$:
$$f(\lambda x + (1 - \lambda) y) \le \lambda f(x) + (1 - \lambda) f(y).$$

> **Glossary:**
>
> - $\lambda x + (1 - \lambda) y$ = **convex combination** of $x$ and $y$ (a point between $x$ and $y$).
> - **Geometrically:** the chord joining $(x, f(x))$ to $(y, f(y))$ stays **above** the graph.
> - Prototype example: $x^2$ (upward-opening parabola).

$f$ is **concave** if $-f$ is convex (chord below). Example: $\sqrt x$, $\ln x$.

## Characterization via $f''$

**Theorem.** $f$ with continuous $f''$ on an interval. Then:
- $f$ convex $\iff$ $f''(x) \ge 0$.
- $f$ concave $\iff$ $f''(x) \le 0$.

> **In words:** $f''$ positive → "smiles" (opens upward). $f''$ negative → "frowns" (opens downward).

**Inflection point** = point where concavity changes ($f''$ changes sign).

## Examples

- $x^2$: $f'' = 2 > 0$, **convex** everywhere.
- $-x^2$: $f'' = -2 < 0$, **concave**.
- $x^3$: $f'' = 6x$, changes sign at 0. **Inflection** at 0.
- $e^x$: $f'' = e^x > 0$, convex.
- $\ln x$: $f'' = -1/x^2 < 0$, concave on $(0, +\infty)$.
- $\sin x$: convex on $(\pi, 2\pi)$, concave on $(0, \pi)$, inflections at $k \pi$.

## Jensen's inequality (useful)

**For $f$ convex** and $\lambda_i \ge 0$ with $\sum \lambda_i = 1$:
$$f\left(\sum \lambda_i x_i\right) \le \sum \lambda_i f(x_i).$$

(Generalization to $n$ points of the definition.)

## Consequences (classical inequalities)

Applying Jensen to specific $f$ yields:

- **AM-GM:** $\sqrt[n]{x_1 \cdots x_n} \le (x_1 + \dots + x_n)/n$ (from $\ln$ concave).
- **Young:** $a b \le a^p/p + b^q/q$ with $1/p + 1/q = 1$ (from $\ln$ concave).
- **Cauchy-Schwarz:** $|\sum a_i b_i| \le \sqrt{\sum a_i^2} \cdot \sqrt{\sum b_i^2}$.

## Exercises

<details>
<summary>Exercise 1 — Concavity study</summary>

Find inflection points of $f(x) = x^4 - 6 x^2$.

**Solution.** $f'' = 12 x^2 - 12 = 12(x - 1)(x + 1) = 0$ at $x = \pm 1$. $f'' < 0$ on $(-1, 1)$ (concave), $> 0$ outside (convex). Inflections at $x = \pm 1$. ∎
</details>

<details>
<summary>Exercise 2 — Jensen at work</summary>

Show that $\sqrt{ab} \le (a + b)/2$ for $a, b > 0$ via Jensen.

**Solution.** $f(x) = \ln x$ concave (Jensen reversed): $\ln((a + b)/2) \ge (\ln a + \ln b)/2 = \ln \sqrt{ab}$. Exponentiating: $(a + b)/2 \ge \sqrt{ab}$. ∎
</details>

## One-line takeaway

$f$ **convex** = chord above graph ($f'' \ge 0$), $f$ **concave** = chord below ($f'' \le 0$); inflections where concavity changes. **Jensen** generalizes to $n$ points and yields the big inequalities (AM-GM, Young, Cauchy-Schwarz).
