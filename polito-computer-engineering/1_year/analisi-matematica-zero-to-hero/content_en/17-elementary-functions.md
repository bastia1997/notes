---
title: "Elementary functions: an overview"
area: Elementary functions
summary: "The \"building blocks\" of mathematics — polynomials, exponentials, logarithms, trigonometric, absolute value, integer part. Domain, image, parity, periodicity, monotonicity, composition, inverse. The operational vocabulary we'll use throughout the course."
order: 17
level: beginner
prereq:
  - "Real numbers and basic topology"
  - "Logic and quantifiers"
tools:
  - "Rudin — *Principles*, ch. 4"
---

# Elementary functions: an overview

## Why start here

Everything in analysis — limits, derivatives, integrals, series — revolves around **functions**. **Elementary functions** are the building blocks: polynomials, exponentials, logarithms, trigonometric, hyperbolic, and their combinations.

Mastering them graphically, algebraically, and structurally is the **prerequisite** for any analytic manipulation. Here we make the inventory; secs. 18 and 19 deepen exp-log and trig-hyperbolic.

## What a real-variable real function is

**Definition.** Let $A, B \subseteq \mathbb{R}$. A **function** $f : A \to B$ is a rule assigning to each $x \in A$ **one and only one** $y = f(x) \in B$.

> **Glossary:**
>
> - $A$ = **domain** (allowed inputs).
> - $B$ = **codomain** (where we "expect" outputs).
> - $f(A) = \{f(x) : x \in A\} \subseteq B$ = **image** — actually reached values.

**Graph**: $\mathrm{Graph}(f) = \{(x, f(x)) : x \in A\} \subseteq \mathbb{R}^2$. Each vertical line crosses it in **exactly one point** (vertical line test).

### Natural domain

If $f$ is given by a formula, the **natural domain** is the largest $A \subseteq \mathbb{R}$ on which the formula makes sense (no division by zero, no even root of negatives, no log of non-positives, etc.).

**Example.** $f(x) = \sqrt{1 - x^2}/(x - 2)$. Conditions: $1 - x^2 \ge 0$ ($x \in [-1, 1]$) and $x \ne 2$. Intersection: $[-1, 1]$.

## Structural properties

### Parity

- **Even**: $f(-x) = f(x)$ (symmetric about $y$-axis). E.g. $x^2, \cos x, |x|$.
- **Odd**: $f(-x) = -f(x)$ (symmetric about origin). E.g. $x^3, \sin x, 1/x$.

> **Warning:** most functions are **neither** (e.g. $e^x$, $x + 1$).

**Canonical decomposition.** Any $f$ on a symmetric domain:
$$f(x) = \underbrace{\frac{f(x) + f(-x)}{2}}_{\text{even}} + \underbrace{\frac{f(x) - f(-x)}{2}}_{\text{odd}}.$$
Example: $e^x = \cosh x + \sinh x$.

### Periodicity

$f$ is **periodic with period $T > 0$** if $f(x + T) = f(x)$ for every $x$. **Minimum period**: smallest such $T$.

Examples: $\sin, \cos$ period $2\pi$; $\tan$ period $\pi$.

### Monotonicity

- **Increasing**: $x_1 < x_2 \Rightarrow f(x_1) \le f(x_2)$.
- **Strictly increasing**: $<$ instead of $\le$.

> Strictly monotone functions are **injective**, hence **invertible** on the image.

### Boundedness

**Bounded** = $\exists M : |f(x)| \le M$ for every $x$.

## Composition and inverse

**Composition.** Given $g : A \to B$, $f : C \to D$ with $g(A) \subseteq C$: $(f \circ g)(x) = f(g(x))$.

> **Warning:** composition is NOT commutative.

**Inverse.** If $f : A \to B$ is bijective, $f^{-1} : B \to A$ exists with $f^{-1}(f(x)) = x$, $f(f^{-1}(y)) = y$.

Geometric: graph of $f^{-1}$ is graph of $f$ reflected across $y = x$.

**Trick to find $f^{-1}$:** start from $y = f(x)$, solve for $x = g(y)$. Then $f^{-1} = g$.

## Elementary families catalog

### 1. Polynomials

$P(x) = a_n x^n + \dots + a_0$. Domain $\mathbb{R}$. Asymptotically dominated by leading monomial.

### 2. Rational functions

$R(x) = P(x)/Q(x)$. Domain $\mathbb{R} \setminus \{$ zeros of $Q\}$.

### 3. Irrational

Roots: $\sqrt x$, $\sqrt[3]{x^2 - 1}$, $x^{1/4}$.

### 4. Exponential and logarithm (sec. 18)

$e^x$ (domain $\mathbb{R}$, image $(0, +\infty)$). $\ln x$ (domain $(0, +\infty)$, image $\mathbb{R}$).

### 5. Trigonometric (sec. 19)

$\sin, \cos$ on $\mathbb{R}$, image $[-1, 1]$. Inverses $\arcsin, \arccos, \arctan$.

### 6. Hyperbolic (sec. 19)

$\sinh, \cosh, \tanh$ via $e^x$.

### 7. Absolute value

$|x| = x$ if $x \ge 0$, $-x$ else.

### 8. Integer part

$\lfloor x \rfloor$ = largest integer $\le x$. "Steps", discontinuous at integers.

**Fractional part** $\{x\} = x - \lfloor x \rfloor \in [0, 1)$. Period 1.

## Schematic graphs

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="160" x2="580" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<text x="585" y="155" fill="#f3eed9" font-size="11" font-style="italic">x</text>
<text x="305" y="20" fill="#f3eed9" font-size="11" font-style="italic">y</text>
<path d="M 200,300 Q 250,40 300,160 Q 350,40 400,300" fill="none" stroke="#d4af37" stroke-width="2"/>
<text x="410" y="60" fill="#d4af37" font-size="12" font-style="italic">y = x²</text>
<polyline points="220,300 250,260 270,220 290,180 300,160 310,140 330,100 350,60 380,20" fill="none" stroke="#6fb38a" stroke-width="2"/>
<text x="385" y="20" fill="#6fb38a" font-size="12" font-style="italic">y = x³</text>
<path d="M 320,300 Q 320,180 380,165 Q 440,160 580,160" fill="none" stroke="#6aa9d8" stroke-width="2"/>
<path d="M 280,20 Q 280,140 220,155 Q 160,160 40,160" fill="none" stroke="#6aa9d8" stroke-width="2"/>
<text x="500" y="155" fill="#6aa9d8" font-size="12" font-style="italic">y = 1/x</text>
<circle cx="300" cy="160" r="2.5" fill="#f3eed9"/>
<text x="285" y="178" fill="#f3eed9" font-size="11">O</text>
</svg>
<div class="chart-caption">Three prototypes: parabola $x^2$ (even), cubic $x^3$ (odd), hyperbola $1/x$ (odd, domain $\mathbb{R} \setminus \{0\}$).</div>
</div>

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="160" x2="580" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<polyline points="100,300 300,160 500,300" fill="none" stroke="#d4af37" stroke-width="2"/>
<text x="510" y="290" fill="#d4af37" font-size="12">|x|</text>
<polyline points="300,160 310,140 330,118 360,100 400,86 450,72 500,62 550,52" fill="none" stroke="#6fb38a" stroke-width="2"/>
<text x="555" y="48" fill="#6fb38a" font-size="12">√x</text>
<polyline points="220,200 260,200 260,180 300,180 300,160 340,160 340,140 380,140 380,120 420,120" fill="none" stroke="#6aa9d8" stroke-width="2"/>
<text x="425" y="115" fill="#6aa9d8" font-size="12">⌊x⌋</text>
</svg>
<div class="chart-caption">$|x|$ (even, cusp at 0), $\sqrt x$ (only for $x \ge 0$), $\lfloor x \rfloor$ (steps).</div>
</div>

## Graph operations (at a glance)

Given $y = f(x)$, you can quickly draw:

- $y = f(x) + c$ → vertical shift by $c$.
- $y = f(x - a)$ → horizontal shift by $a$.
- $y = k f(x)$ → vertical scale.
- $y = f(k x)$ → horizontal scale (factor $1/k$).
- $y = -f(x)$ → reflect over $x$-axis.
- $y = f(-x)$ → reflect over $y$-axis.
- $y = |f(x)|$ → flip negative parts above.
- $y = f(|x|)$ → keep $x \ge 0$, mirror.

## Exercises

<details>
<summary>Exercise 1 — Natural domain</summary>

Find domain of $f(x) = \dfrac{\sqrt{x^2 - 4}}{\ln(3 - x)}$.

**Solution.** $x^2 - 4 \ge 0$, $3 - x > 0$, $\ln(3 - x) \ne 0$ → $x \in (-\infty, -2] \cup (2, 3)$. ∎
</details>

<details>
<summary>Exercise 2 — Parity</summary>

(a) $f(x) = x^3 \cos x$; (b) $f(x) = e^x + e^{-x}$; (c) $f(x) = x + \sin x$; (d) $f(x) = x^2 + x$.

**Solution.** (a) odd, (b) even, (c) odd, (d) neither. ∎
</details>

<details>
<summary>Exercise 3 — Compositions</summary>

$f(x) = 1/(1 + x)$, $g(x) = x^2$. Compute $f \circ g$, $g \circ f$, $f \circ f$.

**Solution.**
- $f \circ g = 1/(1 + x^2)$ on $\mathbb{R}$.
- $g \circ f = 1/(1+x)^2$ on $\mathbb{R} \setminus \{-1\}$.
- $f \circ f = (1+x)/(2+x)$ on $\mathbb{R} \setminus \{-1, -2\}$. ∎
</details>

<details>
<summary>Exercise 4 — Inverse</summary>

$f : [0, +\infty) \to [1, +\infty)$, $f(x) = x^2 + 1$. Find $f^{-1}$.

**Solution.** $y = x^2 + 1 \Rightarrow x = \sqrt{y - 1}$. $f^{-1}(y) = \sqrt{y - 1}$. ∎
</details>

<details>
<summary>Exercise 5 — Periodicity</summary>

(a) Period of $f(x) = \sin(3x) + \cos(5x)$. (b) Is $g(x) = \sin x + \sin(\pi x)$ periodic?

**Solution.**
(a) Periods $2\pi/3$ and $2\pi/5$. Common period $2\pi$.
(b) Periods $2\pi$ and $2$. Ratio $\pi$ irrational: NOT periodic. ∎
</details>

## One-line takeaway

A function $f : A \to B$ is "each input → one unique output", with key structural properties (parity, periodicity, monotonicity, boundedness); the elementary families (polynomials, rationals, irrational, exp/log, trig, hyperbolic, absolute value, integer part) are the vocabulary we'll use everywhere.
