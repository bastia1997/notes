---
title: "Continuity: definition and first properties"
area: Continuity
summary: "The $\\varepsilon$-$\\delta$ definition of continuity — the \"no jumps\" condition — and what changes from a limit. Heine's sequential characterization, algebra of continuous functions, composition, and guiding examples (Dirichlet nowhere continuous, $x\\sin(1/x)$ extendable)."
order: 24
level: intermediate
prereq:
  - "Limits of functions (sec. 20-22)"
  - "Bolzano-Weierstrass (sec. 13)"
tools:
  - "Rudin — *Principles*, ch. 4"
---

# Continuity: definition and first properties

## Why continuity

The limit says what happens *approaching* a point. **Continuity** is the minimal condition for the limit behavior to **coincide with the function's value** there: no jumps, no rips.

All differential and integral calculus rests on continuity.

## $\varepsilon$-$\delta$ definition

Let $f : D \to \mathbb{R}$, $x_0 \in D$.

**Definition.** $f$ is **continuous at $x_0$** if
$$\forall \varepsilon > 0,\ \exists \delta > 0 : \forall x \in D,\ |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon.$$

> **Glossary:**
>
> - Compared to the limit (ch. 20), no "$0 < |x - x_0|$" — we include $x = x_0$ (trivial).
> - $x_0$ **must be in $D$**.
> - If $x_0$ is **isolated** in $D$, $f$ is automatically continuous there.

**Relation with limit.** If $x_0$ is an accumulation point:
$$f \text{ continuous at } x_0 \iff \lim_{x \to x_0} f(x) = f(x_0).$$

**On a set.** $f$ continuous on $A$ if continuous at every point of $A$. Notation: $f \in C(A)$.

## Heine's sequential characterization

**Theorem (Heine).** $f$ continuous at $x_0$ $\iff$ for every $(x_n) \subseteq D$ with $x_n \to x_0$, $f(x_n) \to f(x_0)$.

> Heine "transports" sequence properties (limits, Bolzano-Weierstrass) to functions.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="320" fill="#111a30"/>
  <line x1="40" y1="280" x2="580" y2="280" stroke="#f3eed9" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="300" stroke="#f3eed9" stroke-width="1"/>
  <rect x="220" y="40" width="160" height="240" fill="#6aa9d8" fill-opacity="0.18"/>
  <rect x="40" y="140" width="540" height="60" fill="#d4af37" fill-opacity="0.18"/>
  <path d="M 60 260 Q 200 80 300 170 T 580 100" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <circle cx="300" cy="170" r="4" fill="#f3eed9"/>
</svg>
<div class="chart-caption">Horizontal band of height $2\varepsilon$ around $f(x_0)$: continuity requires a vertical band of width $2\delta$ around $x_0$ whose graph lies entirely in the yellow band.</div>
</div>

## Algebra of continuous functions

**Theorem.** If $f, g$ continuous at $x_0$:
1. $f + g$, $\lambda f$, $fg$ continuous.
2. $f/g$ continuous if $g(x_0) \ne 0$.
3. $|f|$ continuous.

**Composition.** If $f : D \to E$ continuous at $x_0$ and $g : E \to \mathbb{R}$ continuous at $f(x_0)$, then $g \circ f$ continuous at $x_0$.

> **Corollary.** **Polynomials, rationals, exponentials, logarithms, trigonometric** (and combinations, where defined) are continuous.

## Guiding examples

### 1. Polynomials: continuous everywhere

By induction on degree, using algebra.

### 2. Dirichlet: nowhere continuous

$$\chi_\mathbb{Q}(x) = \begin{cases} 1 & x \in \mathbb{Q} \\ 0 & x \notin \mathbb{Q} \end{cases}$$

By density, for any $x_0$ both $r_n \to x_0$ rational ($\chi = 1$) and $s_n \to x_0$ irrational ($\chi = 0$). Heine fails. Nowhere continuous.

### 3. $x \sin(1/x)$: removably discontinuous at 0

Defined for $x \ne 0$, continuous there. $\lim_{x \to 0} x \sin(1/x) = 0$ (squeeze). Setting $\tilde f(0) = 0$ extends to a continuous function. **Removable discontinuity** (ch. 27).

## Notable continuous/discontinuous functions

| function | continuous? |
|---|---|
| $\chi_\mathbb{Q}$ | **never** |
| $\lfloor x \rfloor$ | yes except in $\mathbb{Z}$ |
| $\text{sgn}(x)$ | yes except at 0 |
| $x \sin(1/x)$ extended | yes everywhere |
| Riemann $R(x)$ | continuous on irrationals, discontinuous on rationals |

## Common pitfalls

- **"Continuous on a dense set ⇒ continuous everywhere": FALSE.** Dirichlet.
- **Limit exists ≠ continuous.** Removable discontinuity.
- **Continuous ≠ differentiable.** $|x|$ at 0.

## Exercises

<details>
<summary>Exercise 1 — Continuity of $\sqrt x$</summary>

Show $f(x) = \sqrt x$ continuous at $x_0 \ge 0$.

**Solution.** For $x_0 > 0$: $|\sqrt x - \sqrt{x_0}| \le |x - x_0|/\sqrt{x_0}$. $\delta = \varepsilon \sqrt{x_0}$. For $x_0 = 0$: $\delta = \varepsilon^2$. ∎
</details>

<details>
<summary>Exercise 2 — Continuous except one</summary>

$f(x) = x$ if $x \ne 1$, $f(1) = 7$. Where continuous?

**Solution.** Everywhere except 1 (where $\lim = 1 \ne 7$). ∎
</details>

<details>
<summary>Exercise 3 — Heine reversed</summary>

If $f(x_n) \to f(0)$ for every $x_n \to 0$ with $x_n > 0$, is $f$ continuous at 0?

**Solution.** **No.** Heine needs all sequences. Counterexample: $f(x) = 0$ for $x \ge 0$, $f(x) = 1$ for $x < 0$. ∎
</details>

<details>
<summary>Exercise 4 — Riemann on irrationals</summary>

Show Riemann's $R$ is continuous at every irrational.

**Solution.** For irrational $x_0$, $\varepsilon > 0$: only finitely many rationals $p/q$ in $[x_0 - 1, x_0 + 1]$ with $1/q \ge \varepsilon$. Take $\delta$ = distance to closest such. Then for $|x - x_0| < \delta$: if $x$ irrational $R = 0$; if rational, $R < \varepsilon$. ∎
</details>

<details>
<summary>Exercise 5 — $\sin(1/x)$ not extendable</summary>

Can $\sin(1/x)$ be extended continuously to $\mathbb{R}$?

**Solution.** No. $x_n = 1/(\pi/2 + 2n\pi) \to 0$ gives $f = 1$, $y_n = 1/(-\pi/2 + 2n\pi)$ gives $f = -1$. Heine fails. ∎
</details>

## One-line takeaway

$f$ continuous at $x_0$ means "$\lim_{x \to x_0} f(x) = f(x_0)$" — value coincides with limit — and polynomials/rationals/exp/log/trig are all continuous where defined, while Dirichlet is the prototype of "pathologically discontinuous everywhere".
