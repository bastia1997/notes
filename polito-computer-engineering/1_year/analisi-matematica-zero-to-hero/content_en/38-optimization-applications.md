---
title: "Optimization applications: physics, economics, geometry"
area: Applications
summary: "Max/min problems from the real world solved with derivatives. The uniform recipe and three classical examples (optimal can, Snell's law, max profit)."
order: 38
level: intermediate
prereq:
  - "Derivatives, Fermat (sec. 31)"
  - "Curve sketching (sec. 37)"
tools:
  - "Marcellini-Sbordone, vol. 1"
---

# Optimization applications

## Why

All of differential calculus converges in one recurring question: **given a constraint, which configuration makes a given quantity maximum/minimum?**

Engineers ask it (sizing a can), physicists (light path), economists (production quantity). Same recipe:

> **Glossary:**
>
> - **Objective** $Q$ = what you minimize/maximize (area, cost, time, profit).
> - **Free variables** = quantities you control.
> - **Constraints** = relations binding the variables (e.g., fixed volume).
> - **Domain** $I$ = interval of admissible values (e.g., radius $> 0$).
> - **Critical point** = $f'(x) = 0$.
> - **Domain endpoints** = boundary of $I$ (check separately: $f'$ may not vanish there).

## Operational recipe

1. **Identify the quantity** $Q$ to optimize.
2. **Identify variables** $x, y, z, \dots$
3. **Use constraints** to reduce to one variable: $Q = f(x)$, $x \in I$.
4. **Compute $f'$, find critical points** in $I$.
5. **Classify** with $f''$ or sign of $f'$. Also check domain endpoints.
6. **Return to the problem**: answer with the required quantity, not just optimal $x$.

> **Most common error:** skipping step 6 (giving $x$ instead of the area/cost/time).
> **Second:** forgetting domain endpoints.

## Example 1 — Fixed-volume can, minimum surface

Cylindrical can of fixed volume $V$ (e.g., 33 cl). Which radius $r$ and height $h$ minimize surface (= material used)?

**Constraint:** $V = \pi r^2 h$, fixed.

**Cost function:** $S = 2 \pi r^2 + 2 \pi r h$ (two bases + lateral).

**Reduction:** $h = V/(\pi r^2)$. Thus $S(r) = 2 \pi r^2 + 2 V/r$ for $r > 0$.

**Derivative:** $S'(r) = 4 \pi r - 2 V/r^2$. $S'(r) = 0 \Rightarrow r^3 = V/(2\pi)$, $r = (V/(2\pi))^{1/3}$.

**Classification:** $S'' = 4 \pi + 4 V/r^3 > 0$, hence minimum.

**Optimal height:** $h = V/(\pi r^2) = 2 r$ (substituting).

**Final answer:** can with $h = 2r$. (Curiously, real cans are taller — different practical constraints.)

## Example 2 — Snell's law (refraction)

Light passes from medium 1 (speed $v_1$) to medium 2 (speed $v_2$) through a surface. Which path minimizes time?

**Time:** $T = (\text{distance in 1})/v_1 + (\text{distance in 2})/v_2$.

Parametrize by refraction point: $T(x) = \sqrt{a^2 + x^2}/v_1 + \sqrt{b^2 + (d - x)^2}/v_2$.

$T'(x) = x/(v_1 \sqrt{a^2 + x^2}) - (d - x)/(v_2 \sqrt{b^2 + (d - x)^2}) = 0$.

Recognizing the sines of angles with respect to normal: $\sin \theta_1/v_1 = \sin \theta_2/v_2$.

**Snell's law:** $\sin\theta_1/\sin\theta_2 = v_1/v_2 = n_2/n_1$. Fundamental physics result from a minimum principle (Fermat).

## Example 3 — Maximum profit

Firm sells $q$ units at price $p(q) = a - b q$ (more produced, lower price). Total cost $C(q) = c_0 + c q$. Find $q$ maximizing **profit** $\Pi = q p(q) - C(q)$.

**Profit:** $\Pi(q) = q(a - bq) - c_0 - cq = -b q^2 + (a - c) q - c_0$.

**Derivative:** $\Pi'(q) = -2 b q + (a - c) = 0 \Rightarrow q^* = (a - c)/(2 b)$.

**$\Pi'' = -2 b < 0$**: maximum. Optimal profit: $\Pi(q^*) = (a - c)^2/(4 b) - c_0$.

## Exercises

<details>
<summary>Exercise 1 — Inscribed rectangle</summary>

Find the rectangle of maximum area inscribed in a semicircle of radius $R$ (base on diameter).

**Solution.** Vertices $(\pm x, y)$ with $x^2 + y^2 = R^2$, base $= 2x$, height $= y = \sqrt{R^2 - x^2}$. Area $= 2x \sqrt{R^2 - x^2}$. Maximizing: $x = R/\sqrt 2$, $y = R/\sqrt 2$, area $= R^2$. ∎
</details>

<details>
<summary>Exercise 2 — Minimum distance</summary>

Minimum distance from $(2, 0)$ to the graph of $y = x^2$.

**Solution.** Squared distance: $d^2 = (x - 2)^2 + x^4$. Derivative: $2(x - 2) + 4 x^3 = 0 \Rightarrow 2 x^3 + x - 2 = 0$. Numerically $x \approx 0.8$. ∎
</details>

## One-line takeaway

Optimization = uniform recipe (quantity, variables, constraints, $f' = 0$, classify, answer) for real problems in geometry, physics, economics — the true "why" of differential calculus.
