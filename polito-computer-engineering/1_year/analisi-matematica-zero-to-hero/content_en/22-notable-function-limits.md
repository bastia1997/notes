---
title: "Notable limits for functions"
area: Limits
summary: "The 'atomic' limits underlying calculus with exponentials, logarithms, trigonometric. $\\sin x/x \\to 1$, $(e^x - 1)/x \\to 1$, $\\ln(1+x)/x \\to 1$, $(1+x)^{1/x} \\to e$, and the rest. Proved carefully, applied with standard techniques."
order: 22
level: intermediate
prereq:
  - "Limit definition (sec. 20)"
  - "Limit theorems (sec. 21)"
  - "Exp/log and trig (sec. 18, 19)"
tools:
  - "Rudin — *Principles*, ch. 4"
---

# Notable limits for functions

## Why "notable"

All non-trivial analytic computations with exponentials, logarithms, and trigonometric functions eventually reduce to one of these. Once proven, they become **tools** to resolve any indeterminate form.

## L1 — Fundamental trigonometric limit

$$\boxed{\lim_{x \to 0} \frac{\sin x}{x} = 1}$$

### Geometric proof

On the unit circle, $x \in (0, \pi/2)$:
- Triangle $OAP$ area $= \sin x/2$.
- Sector $OAP$ area $= x/2$.
- Triangle $OAT$ area $= \tan x/2$.

So $\sin x < x < \tan x$. Dividing by $\sin x > 0$: $1 < x/\sin x < 1/\cos x$. Reciprocating: $\cos x < \sin x/x < 1$.

For $x \to 0^+$, $\cos x \to 1$. Squeeze: $\sin x/x \to 1$. By symmetry, the left limit is the same. ∎

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<circle cx="300" cy="160" r="120" fill="none" stroke="#948f78" stroke-width="1"/>
<line x1="100" y1="160" x2="500" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="40" x2="300" y2="290" stroke="#948f78" stroke-width="1"/>
<polygon points="300,160 420,160 377,68" fill="#6fb38a" opacity="0.3" stroke="#6fb38a" stroke-width="1.5"/>
<path d="M 300,160 L 420,160 A 120,120 0 0,0 377,68 Z" fill="#d4af37" opacity="0.2" stroke="#d4af37" stroke-width="1.5"/>
<polygon points="300,160 420,160 420,17" fill="none" stroke="#e07a8d" stroke-width="1.5"/>
<text x="310" y="143" fill="#e8a04a" font-size="12" font-style="italic">x</text>
</svg>
<div class="chart-caption">$\sin x < x < \tan x$ from areas of triangle/sector/triangle.</div>
</div>

### Consequences

- $\lim_0 \tan x / x = 1$.
- $\lim_0 \arcsin x/x = 1$, $\lim_0 \arctan x/x = 1$.

## L2 — Cosine

$$\boxed{\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}}$$

*Proof.* Multiply by $(1 + \cos x)/(1 + \cos x)$:
$$\frac{1 - \cos x}{x^2} = \frac{\sin^2 x}{x^2(1 + \cos x)} = \left(\frac{\sin x}{x}\right)^2 \cdot \frac{1}{1 + \cos x} \to 1 \cdot \frac{1}{2} = \frac{1}{2}. \blacksquare$$

## L3 — Exponential

$$\boxed{\lim_{x \to 0} \frac{e^x - 1}{x} = 1}$$

From $1 + x \le e^x \le 1/(1 - x)$ (convexity), divide by $x$ and squeeze.

**Generalization.** $\lim_0 (a^x - 1)/x = \ln a$ for $a > 0$.

*Proof.* $a^x = e^{x \ln a}$, substitute $y = x \ln a$: $\to \ln a \cdot 1 = \ln a$. ∎

## L4 — Logarithm

$$\boxed{\lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1}$$

*Proof.* Substitute $y = \ln(1 + x)$, $x = e^y - 1$: $\ln(1+x)/x = y/(e^y - 1) \to 1$. ∎

## L5 — Euler limit

$$\boxed{\lim_0 (1 + x)^{1/x} = e, \quad \lim_{\pm\infty}(1 + 1/x)^x = e}$$

**Generalization:** $\lim_0(1 + \alpha x)^{1/x} = e^\alpha$.

## L6 — Generalized power

$$\boxed{\lim_{x \to 0} \frac{(1+x)^\alpha - 1}{x} = \alpha}$$

*Proof.* $(1+x)^\alpha = e^{\alpha \ln(1+x)}$. Decompose. ∎

## Memorize table

| limit | value |
|---|---|
| $\lim_0 \sin x/x$ | $1$ |
| $\lim_0 (1 - \cos x)/x^2$ | $1/2$ |
| $\lim_0 \tan x/x$ | $1$ |
| $\lim_0 \arctan x/x$ | $1$ |
| $\lim_0 (e^x - 1)/x$ | $1$ |
| $\lim_0 (a^x - 1)/x$ | $\ln a$ |
| $\lim_0 \ln(1+x)/x$ | $1$ |
| $\lim_0 ((1+x)^\alpha - 1)/x$ | $\alpha$ |
| $\lim_0 (1+x)^{1/x}$ | $e$ |
| $\lim_{\pm\infty}(1 + 1/x)^x$ | $e$ |
| $\lim_0 \sinh x/x$ | $1$ |
| $\lim_0 (\cosh x - 1)/x^2$ | $1/2$ |

## Techniques

### 1. Substitution

$\lim_0 \sin(5x)/x = 5 \lim \sin(5x)/(5x) = 5$.

### 2. $1/x$ composition

$\lim_{+\infty} x \sin(1/x) = \lim_{y \to 0^+} \sin y/y = 1$.

### 3. Logarithm for $1^\infty$

$\lim (1 + 2/x)^{3x}$: $\ln L = \lim 3x \ln(1 + 2/x) \to 3 \cdot 2 = 6$. $L = e^6$.

### 4. Decomposition into notable factors

$\lim_0 (e^{\sin x} - 1)/\ln(1 + \tan x) = \prod (\text{notable ratios}) \to 1$.

## Exercises

<details>
<summary>Exercise 1 — Trigonometric</summary>

$\lim_0 \sin(3x)/\sin(5x) = 3/5$. ∎
</details>

<details>
<summary>Exercise 2 — Cosine</summary>

$\lim_0 (1 - \cos x)/(x \sin x) = \frac{1 - \cos x}{x^2} \cdot \frac{x}{\sin x} \to 1/2$. ∎
</details>

<details>
<summary>Exercise 3 — Exponential</summary>

$\lim_0 (e^{3x} - e^{-x})/x = 3 - (-1) = 4$. ∎
</details>

<details>
<summary>Exercise 4 — $1^\infty$</summary>

$\lim_{+\infty}((x+1)/(x-1))^x = e^2$. ∎
</details>

<details>
<summary>Exercise 5 — Power</summary>

$\lim_0 (\sqrt{1+x} - 1)/x = 1/2$. ∎
</details>

## One-line takeaway

Notable limits are the **building blocks** of limit calculus — memorize them and any indeterminate form of exp, log, trig can be cracked via substitution, decomposition, or — when needed — $e^{\ln(\cdot)}$.
