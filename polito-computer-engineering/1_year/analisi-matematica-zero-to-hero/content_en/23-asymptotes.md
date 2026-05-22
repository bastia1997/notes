---
title: "Horizontal, vertical, oblique asymptotes"
area: Limits
summary: "The **lines** a function's graph approaches \"indefinitely\". Definitions of the three types, formulas for slope $m$ and intercept $q$ of obliques, and the algorithm to find all asymptotes."
order: 23
level: intermediate
prereq:
  - "Function limits (sec. 20-22)"
tools:
  - "Bramanti-Pagani-Salsa — *Analisi 1*"
---

# Horizontal, vertical, oblique asymptotes

## Why they matter

An **asymptote** is a **straight line** the graph approaches indefinitely — possibly without touching. Studying asymptotes is the first step of function analysis (ch. 37): tells you how $f$ behaves at infinity and near undefined points.

## Horizontal asymptote

**Definition.** $y = L$ is a **horizontal asymptote** at $+\infty$ if
$$\lim_{x \to +\infty} f(x) = L \in \mathbb{R}.$$

Analogous at $-\infty$. The two can differ.

**Examples:**
- $1/x$: $y = 0$ at $\pm\infty$.
- $\arctan x$: $y = \pi/2$ at $+\infty$, $y = -\pi/2$ at $-\infty$.
- $\sin x$: no asymptote.

## Vertical asymptote

**Definition.** $x = x_0$ is a **vertical asymptote** if $\lim_{x \to x_0^\pm} f = \pm\infty$ (at least one).

Typically $x_0$ is outside the domain where some denominator vanishes.

**Examples:** $1/x$ → $x = 0$. $\tan x$ → $x = \pi/2 + k\pi$.

## Oblique asymptote

**Definition.** $y = mx + q$ ($m \ne 0$) is an **oblique asymptote** at $+\infty$ if
$$\lim_{x \to +\infty}[f(x) - (mx + q)] = 0.$$

> **Mutually exclusive with horizontal:** can't have both at $+\infty$.

### Finding $m$ and $q$

> $m = \lim_{x \to +\infty} f(x)/x$, $q = \lim_{x \to +\infty}(f(x) - mx)$.

**Algorithm at $+\infty$:**
1. Check $\lim f = \pm\infty$ (else horizontal or none).
2. Compute $m$. Not finite or $= 0$ → no oblique.
3. Compute $q$. Not finite → no oblique.
4. Both finite, $m \ne 0$: asymptote $y = mx + q$.

Same for $-\infty$.

## Worked examples

### Example 1 — $(x^2 + 1)/x$

**Vertical** $x = 0$. **Oblique:** $f(x) = x + 1/x$, so $f - x \to 0$, asymptote $y = x$.

### Example 2 — Pathology: $m$ finite, $q$ not

$f(x) = x + \sqrt x$ ($x > 0$). $f/x \to 1$. But $q = \lim \sqrt x = +\infty$. **No oblique.**

### Example 3 — Rational function

$(2x^3 + x + 1)/(x^2 - 1)$. Polynomial division: $f = 2x + (3x + 1)/(x^2 - 1)$. Remainder $\to 0$. Asymptote $y = 2x$.

> **For rationals $P/Q$:**
> - $\deg P < \deg Q$: horizontal $y = 0$.
> - $\deg P = \deg Q$: horizontal = leading ratio.
> - $\deg P = \deg Q + 1$: oblique (polynomial division quotient).
> - $\deg P > \deg Q + 1$: no rectilinear asymptote.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="160" x2="580" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="290" stroke="#948f78" stroke-width="1"/>
<line x1="40" y1="420" x2="580" y2="-120" stroke="#e07a8d" stroke-width="1.4" stroke-dasharray="6,4"/>
<text x="540" y="35" fill="#e07a8d" font-size="12" font-style="italic">y = x</text>
<line x1="300" y1="20" x2="300" y2="290" stroke="#e07a8d" stroke-width="1.4" stroke-dasharray="6,4"/>
<text x="305" y="285" fill="#e07a8d" font-size="12">x = 0</text>
<polyline points="308,-40 312,30 316,80 320,110 324,130 332,150 340,158 360,160 380,164 400,170 420,176 440,184 460,194 480,202 500,210 540,228" fill="none" stroke="#d4af37" stroke-width="2.2"/>
<polyline points="292,360 288,290 284,240 280,210 276,190 268,170 260,162 240,160 220,156 200,150 180,144 160,136 140,126 120,118 100,110 60,92" fill="none" stroke="#d4af37" stroke-width="2.2"/>
<text x="100" y="125" fill="#d4af37" font-size="13" font-style="italic">f(x) = x + 1/x</text>
</svg>
<div class="chart-caption">$f(x) = x + 1/x$ with vertical $x = 0$ and oblique $y = x$ at $\pm\infty$.</div>
</div>

## Pathologies

### Oscillation: $m$ exists, $q$ doesn't

$f(x) = x + \sin x$. $f/x \to 1$. But $q = \lim \sin x$ doesn't exist. **No oblique** despite $|f - x| \le 1$.

### Different asymptotes at $+\infty$ and $-\infty$

$\sqrt{x^2 + 1}$: at $+\infty$ asymptote $y = x$; at $-\infty$ asymptote $y = -x$.

## Complete procedure

1. Determine domain $A$.
2. For each $x_0 \notin A$ accumulation: check vertical.
3. If $A$ unbounded above: $\lim_{+\infty} f$. Finite → horizontal. $\pm\infty$ → seek oblique.
4. Same for $-\infty$.

## Exercises

<details>
<summary>Exercise 1 — Rational</summary>

$f(x) = (3x^2 - 2)/(x + 1)$.

**Solution.** Vertical $x = -1$. Polynomial division: $f = 3x - 3 + 1/(x+1)$. Oblique $y = 3x - 3$. ∎
</details>

<details>
<summary>Exercise 2 — Radical</summary>

$f(x) = \sqrt{x^2 + 2x}$.

**Solution.** Domain $x \le -2$ or $x \ge 0$. At $+\infty$: $m = 1$, $q = 1$. Asymptote $y = x + 1$. At $-\infty$: $y = -x - 1$. ∎
</details>

<details>
<summary>Exercise 3 — Exponential</summary>

$f(x) = x e^{1/x}$.

**Solution.** Vertical $x = 0^+$. At $\pm\infty$: $m = 1$, $q = 1$. Asymptote $y = x + 1$. ∎
</details>

<details>
<summary>Exercise 4 — Logarithmic</summary>

$f(x) = x - \ln x$ ($x > 0$).

**Solution.** Vertical $x = 0$. At $+\infty$: $m = 1$ but $q = -\lim \ln x = -\infty$. **No oblique.** ∎
</details>

## One-line takeaway

Three types — **vertical** (denominator zero), **horizontal** (finite $\lim$ at $\pm\infty$), **oblique** ($m = \lim f/x$ finite non-zero, $q = \lim(f - mx)$ finite) — the first thing to look for in function analysis.
