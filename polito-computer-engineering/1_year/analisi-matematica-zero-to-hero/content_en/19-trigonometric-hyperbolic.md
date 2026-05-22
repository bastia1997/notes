---
title: "Trigonometric and hyperbolic functions"
area: Elementary functions
summary: "The functions of oscillation ($\\sin, \\cos, \\tan$) built from the unit circle. The **hyperbolic** ($\\sinh, \\cosh, \\tanh$) — algebraic cousins via $e^x$. Identities, graphs, inverses."
order: 19
level: beginner
prereq:
  - "Exponential and logarithm (sec. 18)"
  - "Geometry of the circle"
---

# Trigonometric and hyperbolic functions

## Why

**Trigonometric** = periodic functions. Wherever there's oscillation — AC current, sound, quantum waves, vibrations — $\sin$ and $\cos$ appear. Their algebra (addition formulas, duplication, etc.) is computational machinery you'll use in derivatives, integrals, ODEs, Fourier.

**Hyperbolic** = algebraic cousins via $e^x$. Same identities, sign changes. Crucial in linear ODEs, hyperbolic geometry, relativistic physics.

## Geometric definition

Consider the **unit circle** $C : x^2 + y^2 = 1$. We measure angles in **radians**: $\theta$ is the arc length on $C$ starting from $(1, 0)$ counterclockwise.

> **Glossary:**
>
> - **Radian** = angle unit based on arc. Full angle $= 2\pi$ rad $= 360°$. So $\pi$ rad $= 180°$.
> - **Always use radians in mathematics**.

**Definition.** For $\theta \in \mathbb{R}$, let $P_\theta = (x_\theta, y_\theta)$ be the point on the unit circle reached by going an arc of length $\theta$.

$$\cos\theta := x_\theta, \qquad \sin\theta := y_\theta.$$

**Immediate consequences:**
- $\sin^2\theta + \cos^2\theta = 1$. **Pythagorean identity.**
- $-1 \le \sin\theta, \cos\theta \le 1$.
- Period $2\pi$.
- $\sin(-\theta) = -\sin\theta$ (odd), $\cos(-\theta) = \cos\theta$ (even).
- $\sin(\pi/2 - \theta) = \cos\theta$, $\cos(\pi/2 - \theta) = \sin\theta$ (cofunctions).

**Tangent**: $\tan\theta = \sin\theta/\cos\theta$ (where $\cos \ne 0$). Period $\pi$ (not $2\pi$).

## Notable values

| $\theta$ | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ | $\pi$ |
|---|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $1/2$ | $\sqrt 2/2$ | $\sqrt 3/2$ | $1$ | $0$ |
| $\cos\theta$ | $1$ | $\sqrt 3/2$ | $\sqrt 2/2$ | $1/2$ | $0$ | $-1$ |
| $\tan\theta$ | $0$ | $1/\sqrt 3$ | $1$ | $\sqrt 3$ | $\nexists$ | $0$ |

## Addition formulas (most important)

$$\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$$
$$\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$$

### Double angle

$$\sin(2\alpha) = 2\sin\alpha\cos\alpha$$
$$\cos(2\alpha) = \cos^2\alpha - \sin^2\alpha = 1 - 2\sin^2\alpha$$

### Half angle

$$\sin^2(\alpha/2) = (1 - \cos\alpha)/2, \quad \cos^2(\alpha/2) = (1 + \cos\alpha)/2.$$

## Graphs

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="160" x2="580" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<text x="80" y="175" fill="#d8d3bd" font-size="11">−2π</text>
<text x="186" y="175" fill="#d8d3bd" font-size="11">−π</text>
<text x="408" y="175" fill="#d8d3bd" font-size="11">π</text>
<text x="518" y="175" fill="#d8d3bd" font-size="11">2π</text>
<text x="296" y="148" fill="#d8d3bd" font-size="11">1</text>
<polyline points="80,160 100,124 120,107 140,108 160,127 180,158 200,176 220,194 240,205 260,196 280,180 300,160 320,140 340,125 360,124 380,135 400,158 420,180 440,200 460,212 480,213 500,196 520,178 540,170 560,160" fill="none" stroke="#d4af37" stroke-width="2"/>
<text x="555" y="148" fill="#d4af37" font-size="12">sin x</text>
<polyline points="80,100 100,108 120,127 140,158 160,176 180,194 200,205 220,196 240,180 260,160 280,140 300,100 320,140 340,160 360,180 380,196 400,205 420,194 440,176 460,158 480,127 500,108 520,100 540,108 560,127" fill="none" stroke="#6fb38a" stroke-width="2"/>
<text x="565" y="125" fill="#6fb38a" font-size="12">cos x</text>
</svg>
<div class="chart-caption">$\sin$ (gold) and $\cos$ (sage) shifted by $\pi/2$. Period $2\pi$, amplitude 1.</div>
</div>

## Inverse functions: arcs

### Arcsine

$\sin : [-\pi/2, \pi/2] \to [-1, 1]$ bijective. Inverse:
$$\arcsin : [-1, 1] \to [-\pi/2, \pi/2].$$

### Arccosine

$\cos : [0, \pi] \to [-1, 1]$ bijective. Inverse:
$$\arccos : [-1, 1] \to [0, \pi].$$

Relation: $\arcsin x + \arccos x = \pi/2$.

### Arctangent

$\tan : (-\pi/2, \pi/2) \to \mathbb{R}$ bijective. Inverse:
$$\arctan : \mathbb{R} \to (-\pi/2, \pi/2).$$

Bounded: $\lim_{x \to \pm\infty} \arctan x = \pm \pi/2$.

## Hyperbolic functions

**Definition via $e^x$:**
$$\sinh x = \frac{e^x - e^{-x}}{2}, \quad \cosh x = \frac{e^x + e^{-x}}{2}, \quad \tanh x = \frac{\sinh x}{\cosh x}.$$

> **Glossary:**
>
> - $\sinh$ = "hyperbolic sine", $\cosh$ = "hyperbolic cosine", $\tanh$ = "hyperbolic tangent".
> - **Etymology**: $(\cosh t, \sinh t)$ parametrizes a branch of the **hyperbola** $x^2 - y^2 = 1$, like $(\cos t, \sin t)$ parametrizes the unit circle.

**Fundamental identity:**
$$\cosh^2 x - \sinh^2 x = 1.$$

*Proof.* $\cosh^2 - \sinh^2 = \frac{(e^x + e^{-x})^2 - (e^x - e^{-x})^2}{4} = \frac{4 e^x e^{-x}}{4} = 1$. ∎

> **Sign distinction:** trigonometric $\sin^2 + \cos^2 = 1$ (sum); hyperbolic $\cosh^2 - \sinh^2 = 1$ (difference).

**Properties:**
- $\sinh : \mathbb{R} \to \mathbb{R}$, odd, strictly increasing.
- $\cosh : \mathbb{R} \to [1, +\infty)$, even, decreasing on $(-\infty, 0]$ and increasing on $[0, +\infty)$, min $\cosh 0 = 1$.
- $\tanh : \mathbb{R} \to (-1, 1)$, odd, strictly increasing, asymptotes $\pm 1$.

**Hyperbolic addition formulas:**
$$\sinh(a + b) = \sinh a \cosh b + \cosh a \sinh b$$
$$\cosh(a + b) = \cosh a \cosh b + \sinh a \sinh b$$

(Note: "$+$" in $\cosh$, unlike trigonometric.)

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="220" x2="580" y2="220" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<polyline points="160,30 180,60 200,90 220,118 240,144 260,170 280,193 300,210 320,193 340,170 360,144 380,118 400,90 420,60 440,30" fill="none" stroke="#d4af37" stroke-width="2.2"/>
<text x="438" y="25" fill="#d4af37" font-size="13">cosh x</text>
<polyline points="160,300 180,280 200,260 220,242 240,228 260,219 280,213 300,210 320,207 340,202 360,193 380,178 400,158 420,134 440,108 460,80 480,52 500,22" fill="none" stroke="#6fb38a" stroke-width="2.2"/>
<text x="500" y="20" fill="#6fb38a" font-size="13">sinh x</text>
<polyline points="60,232 100,232 140,233 180,234 200,236 220,238 240,242 260,250 280,260 300,210 320,160 340,170 360,178 380,182 400,184 420,186 440,188 480,188 540,188" fill="none" stroke="#6aa9d8" stroke-width="2.2"/>
<text x="545" y="195" fill="#6aa9d8" font-size="13">tanh x</text>
</svg>
<div class="chart-caption">$\cosh$ (gold, "catenary"), $\sinh$ (sage, odd), $\tanh$ (blue, asymptotes $\pm 1$).</div>
</div>

### Inverse hyperbolic

$$\operatorname{arsinh} x = \ln(x + \sqrt{x^2 + 1})$$
$$\operatorname{arcosh} x = \ln(x + \sqrt{x^2 - 1}), \quad x \ge 1$$
$$\operatorname{artanh} x = \frac{1}{2}\ln\frac{1+x}{1-x}, \quad |x| < 1$$

## Identities to memorize

$$\sin^2 + \cos^2 = 1, \quad 1 + \tan^2 = \sec^2$$
$$\cosh^2 - \sinh^2 = 1, \quad 1 - \tanh^2 = \mathrm{sech}^2$$
$$\sin(2x) = 2\sin x \cos x, \quad \cos(2x) = 1 - 2\sin^2 x$$
$$\sinh(2x) = 2\sinh x \cosh x, \quad \cosh(2x) = 1 + 2\sinh^2 x$$

## Exercises

<details>
<summary>Exercise 1 — Addition</summary>

Compute $\sin(\pi/12)$.

**Solution.** $\pi/12 = \pi/3 - \pi/4$.
$$\sin(\pi/12) = \sin(\pi/3)\cos(\pi/4) - \cos(\pi/3)\sin(\pi/4) = \frac{\sqrt 6 - \sqrt 2}{4}.$$
</details>

<details>
<summary>Exercise 2 — Trig identity</summary>

Show $\sin^4 x - \cos^4 x = -\cos(2x)$.

**Solution.** $= (\sin^2 - \cos^2)(\sin^2 + \cos^2) = -(\cos^2 - \sin^2) = -\cos(2x)$. ∎
</details>

<details>
<summary>Exercise 3 — Trig equation</summary>

$2\sin^2 x - \sin x - 1 = 0$ in $[0, 2\pi)$.

**Solution.** $t = \sin x$: $t = 1$ or $-1/2$. $x \in \{\pi/2, 7\pi/6, 11\pi/6\}$. ∎
</details>

<details>
<summary>Exercise 4 — Hyperbolic identity</summary>

Show $\sinh(2x) = 2\sinh x \cosh x$.

**Solution.** $\sinh(2x) = (e^{2x} - e^{-2x})/2 = (e^x - e^{-x})(e^x + e^{-x})/2 = 2\sinh x \cosh x$. ∎
</details>

<details>
<summary>Exercise 5 — Inverse hyperbolic</summary>

Prove $\operatorname{arsinh} x = \ln(x + \sqrt{x^2 + 1})$.

**Solution.** From $y = (e^x - e^{-x})/2$, let $u = e^x$: $u^2 - 2yu - 1 = 0$, $u = y + \sqrt{y^2 + 1}$ (positive root). So $x = \ln u$. ∎
</details>

## One-line takeaway

**Trigonometric** $(\sin, \cos, \tan)$ live on the unit circle with $\sin^2 + \cos^2 = 1$; **hyperbolic** $(\sinh, \cosh, \tanh)$ live on $x^2 - y^2 = 1$, defined via $e^x$, with $\cosh^2 - \sinh^2 = 1$ — same identities, sign changes.
