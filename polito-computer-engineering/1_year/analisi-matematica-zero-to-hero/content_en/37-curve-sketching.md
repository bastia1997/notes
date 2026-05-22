---
title: "Complete curve sketching"
area: Derivatives
summary: "The canonical procedure to draw the graph of $f(x)$ — domain, symmetries, sign, asymptotes, monotonicity, concavity. The \"synthesis\" of all differential calculus seen so far."
order: 37
level: intermediate
prereq:
  - "Asymptotes (sec. 23)"
  - "Monotonicity/extrema (sec. 35)"
  - "Convexity (sec. 36)"
tools:
  - "Marcellini-Sbordone, vol. 1"
---

# Complete curve sketching

## Why

The "function study" is the canonical synthesis exercise: starting from $y = f(x)$, end with a qualitative sketch of the graph. Not just for exams: it's the most direct way to "see" a function.

> **Glossary:**
>
> - **Domain** = set of $x$ where $f(x)$ is defined.
> - **Even function** ($f(-x) = f(x)$) = graph symmetric about $y$-axis.
> - **Odd function** ($f(-x) = -f(x)$) = symmetric about origin.
> - **Horizontal asymptote** $y = L$ = $\lim_{\pm\infty} f = L$.
> - **Vertical asymptote** $x = a$ = $f(x) \to \pm\infty$ as $x \to a$.
> - **Oblique asymptote** $y = mx + q$ = curve approaches the line at $\pm\infty$.
> - **Critical point** = $f'(x) = 0$; **inflection** = $f''$ changes sign.

## Canonical procedure (10 steps)

1. **Domain**: exclude zero denominators, $\ln$ of non-positives, even roots of negatives, etc.
2. **Symmetries**: even ($f(-x) = f(x)$), odd ($f(-x) = -f(x)$), periodicity.
3. **Axis intersections**: $f(0)$ if in domain; solve $f(x) = 0$.
4. **Sign** of $f$: where $> 0$, $< 0$.
5. **Limits at endpoints** of domain and at infinity.
6. **Asymptotes** (ch. 23): vertical, horizontal, oblique.
7. **$f'$ and its sign** → monotonicity, critical points.
8. **Classify critical points** → local max/min.
9. **$f''$ and its sign** → concavity, inflections.
10. **Sketch**.

## Guided example: $f(x) = x e^{-x^2/2}$

**1. Domain:** $\mathbb{R}$.

**2. Symmetry:** $f(-x) = -x e^{-x^2/2} = -f(x)$ → **odd**. Study for $x \ge 0$, then symmetry.

**3. Intersections:** $f(0) = 0$. $f(x) = 0$ only at $x = 0$ (exponential always $> 0$).

**4. Sign:** $f(x) > 0 \iff x > 0$ (and symmetrically).

**5-6. Limits and asymptotes:** $\lim_{+\infty} x e^{-x^2/2} = 0$ (negative exponential dominates). Horizontal asymptote $y = 0$ at $\pm \infty$. No vertical asymptotes (domain is all $\mathbb{R}$).

**7. $f'$:** $f'(x) = e^{-x^2/2}(1 - x^2)$. Sign = sign of $1 - x^2$.
- For $|x| < 1$: $f' > 0$ → $f$ increasing.
- For $|x| > 1$: $f' < 0$ → $f$ decreasing.

Critical points: $x = \pm 1$.

**8. Classification:** $x = 1$: $f' > 0$ left, $< 0$ right → **local max**. $f(1) = e^{-1/2} \approx 0.607$. By symmetry $x = -1$ is **local min**.

**9. $f''$:** $f''(x) = e^{-x^2/2} \cdot x(x^2 - 3)$. Zeros: $x = 0, \pm \sqrt 3$. Sign: studying factors.
- $f''(x) < 0$ for $x < -\sqrt 3$, $> 0$ for $-\sqrt 3 < x < 0$, $< 0$ for $0 < x < \sqrt 3$, $> 0$ for $x > \sqrt 3$.

Inflections at $x = 0, \pm \sqrt 3$.

**10. Sketch.** Odd curve, starts at $0$, rises to max at $(1, e^{-1/2})$, descends to 0; left side by symmetry.

## Exercises

<details>
<summary>Exercise 1 — Study</summary>

Perform the full study of $f(x) = x^2/(x - 1)$.

**Solution (schematic).**
1. Domain: $\mathbb{R} \setminus \{1\}$.
2. Neither even nor odd.
3. Intersections: $f(0) = 0$.
4. Sign: $f > 0$ for $x > 1$, $< 0$ for $x < 1$, $x \ne 0$.
5-6. Vertical $x = 1$. Oblique at $\pm \infty$: polynomial division $x^2/(x-1) = x + 1 + 1/(x-1)$. Asymptote $y = x + 1$.
7. $f'(x) = (x^2 - 2x)/(x-1)^2 = x(x-2)/(x-1)^2$. Critical $x = 0, 2$.
8. $f' > 0$ for $x < 0$, $< 0$ for $0 < x < 1$, $< 0$ for $1 < x < 2$, $> 0$ for $x > 2$. Max at $x = 0$, min at $x = 2$.
9. $f''$: computation... $f'' = 2/(x-1)^3$. $> 0$ for $x > 1$ (convex), $< 0$ for $x < 1$ (concave).
10. Sketch. ∎
</details>

## One-line takeaway

Curve sketching = 10 standard steps (domain, symmetries, sign, limits, asymptotes, $f'$/critical, classification, $f''$/concavity, sketch) combining all differential calculus to "see" the graph.
