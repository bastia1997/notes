---
title: "Exponential, logarithm, powers"
area: Elementary functions
summary: "How to construct $a^x$ starting from integer $a^n$ and reaching arbitrary real exponent. The number $e$ as a limit. The **logarithm** as inverse of the exponential. Identities to memorize and symmetric graphs."
order: 18
level: beginner
prereq:
  - "Sequences and limits (sec. 11)"
  - "Sup/inf, completeness of $\\mathbb{R}$ (sec. 07)"
tools:
  - "Rudin — *Principles*, ch. 1 and 8"
---

# Exponential, logarithm, powers

## Why we need them

$e^x$ and $\ln x$ are the "biological" functions of analysis: demographic growth, radioactive decay, compound interest, entropy.

**Technically**, $e^x$ is the unique function (up to scale) **equal to its own derivative**. This makes it central in all differential equations.

## Integer-exponent powers

For $a \in \mathbb{R}$, $n \in \mathbb{N}_+$:
$$a^n = \underbrace{a \cdot a \cdots a}_{n \text{ factors}}, \quad a^0 = 1, \quad a^{-n} = 1/a^n.$$

Familiar properties: $a^{m+n} = a^m a^n$, $(a^m)^n = a^{mn}$, $(ab)^n = a^n b^n$.

## Rational-exponent powers

For $a > 0$ and $n \in \mathbb{N}_+$: $a^{1/n}$ = the unique positive $b$ with $b^n = a$.

> **Existence/uniqueness** by completeness of $\mathbb{R}$.

For $p/q \in \mathbb{Q}$: $a^{p/q} = (a^{1/q})^p$.

## Real-exponent powers

**Definition (via sup).** For $a > 1$, $x \in \mathbb{R}$:
$$a^x := \sup\{a^r : r \in \mathbb{Q},\ r \le x\}.$$

For $0 < a < 1$: $a^x = 1/(1/a)^x$. For $a = 1$: $a^x = 1$.

**Proposition.** $x \mapsto a^x$ ($a > 0$, $a \ne 1$):
1. well-defined on $\mathbb{R}$;
2. strictly monotone;
3. continuous;
4. $a^{x+y} = a^x a^y$, $(a^x)^y = a^{xy}$;
5. image $(0, +\infty)$.

## The number $e$

**Definition.** $e := \lim_{n \to \infty} (1 + 1/n)^n$.

**Theorem.** The limit exists finite, in $(2, 3)$.

*Proof (ch. 13).* $(1 + 1/n)^n$ is monotone increasing, bounded by 3.

**Value:** $e \approx 2.71828\,18284\dots$ Irrational (Euler), transcendental (Hermite 1873).

## The exponential function $e^x$

**Properties:**
- **Domain** $\mathbb{R}$, **image** $(0, +\infty)$.
- $e^0 = 1$, $e^1 = e$.
- $e^{x + y} = e^x e^y$, $e^{-x} = 1/e^x$.
- **Strictly increasing**, continuous.
- $\lim_{x \to +\infty} e^x = +\infty$, $\lim_{x \to -\infty} e^x = 0$.
- **Derivative**: $(e^x)' = e^x$.

**Equivalent characterizations:**
$$e^x = \lim_{n \to \infty}\left(1 + \frac{x}{n}\right)^n = \sum_{k=0}^\infty \frac{x^k}{k!}.$$

## The logarithm

Since $\exp : \mathbb{R} \to (0, +\infty)$ is bijective, it has an inverse.

**Definition.** **Natural logarithm** $\ln : (0, +\infty) \to \mathbb{R}$ inverse of $\exp$:
$$\ln y = x \iff e^x = y.$$

> **Glossary:** $\ln$ = base $e$. **In analysis it's always this**, unless specified.

**Properties:**
- **Domain** $(0, +\infty)$, **image** $\mathbb{R}$.
- $\ln 1 = 0$, $\ln e = 1$.
- $\ln(x y) = \ln x + \ln y$ ("turns products into sums").
- $\ln(x/y) = \ln x - \ln y$.
- $\ln(x^\alpha) = \alpha \ln x$.
- **Strictly increasing**, continuous, concave.
- $\lim_{x \to 0^+} \ln x = -\infty$, $\lim_{x \to +\infty} \ln x = +\infty$.

*Proof of $\ln(xy) = \ln x + \ln y$.* Let $u = \ln x$, $v = \ln y$. Then $xy = e^u e^v = e^{u+v}$, so $\ln(xy) = u + v$. ∎

### Other bases

For $a > 0$, $a \ne 1$:
$$\log_a x = \frac{\ln x}{\ln a}.$$

**Change of base:** $\log_a x = \log_b x / \log_b a$.

## Graphs of $e^x$ and $\ln x$

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="270" x2="580" y2="270" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<line x1="40" y1="530" x2="580" y2="-50" stroke="#948f78" stroke-width="0.8" stroke-dasharray="3,3"/>
<text x="560" y="50" fill="#d8d3bd" font-size="11" font-style="italic">y = x</text>
<polyline points="180,267 220,261 260,251 280,243 300,230 320,213 340,191 360,162 380,124 400,76 420,16" fill="none" stroke="#d4af37" stroke-width="2.2"/>
<text x="425" y="20" fill="#d4af37" font-size="13">y = eˣ</text>
<polyline points="303,265 309,260 319,250 337,230 376,190 414,150 454,110 494,70" fill="none" stroke="#6fb38a" stroke-width="2.2"/>
<text x="500" y="65" fill="#6fb38a" font-size="13">y = ln x</text>
<circle cx="300" cy="230" r="2.5" fill="#e07a8d"/>
<text x="282" y="222" fill="#e07a8d" font-size="10">(0,1)</text>
<circle cx="340" cy="270" r="2.5" fill="#e07a8d"/>
<text x="343" y="285" fill="#e07a8d" font-size="10">(1,0)</text>
<text x="305" y="290" fill="#f3eed9" font-size="10">0</text>
</svg>
<div class="chart-caption">$e^x$ (gold) and $\ln x$ (sage) are inverses: symmetric about $y = x$.</div>
</div>

## Power function $x^\alpha$

For $\alpha \in \mathbb{R}$ and $x > 0$:
$$x^\alpha := e^{\alpha \ln x}.$$

**Properties:**
- $x^\alpha x^\beta = x^{\alpha + \beta}$.
- $(x^\alpha)^\beta = x^{\alpha \beta}$.
- $(xy)^\alpha = x^\alpha y^\alpha$.
- Monotone increasing if $\alpha > 0$, decreasing if $\alpha < 0$.

**Growth comparison** ($x \to +\infty$):
$$\ln x \ll x^\alpha \ll e^{\beta x}$$
for $\alpha, \beta > 0$.

## Identities to memorize

$$e^{x + y} = e^x e^y, \quad e^{-x} = 1/e^x, \quad (e^x)^y = e^{xy}$$
$$\ln(xy) = \ln x + \ln y, \quad \ln(x^\alpha) = \alpha \ln x$$
$$a^x = e^{x \ln a}, \quad \log_a x = \frac{\ln x}{\ln a}$$

## Exercises

<details>
<summary>Exercise 1 — Via $e$ and $\ln$</summary>

Rewrite using only $e$ and $\ln$: (a) $2^x$; (b) $5^{x^2 - 1}$; (c) $\log_3 x$; (d) $x^x$.

**Solution.** (a) $e^{x \ln 2}$. (b) $e^{(x^2 - 1) \ln 5}$. (c) $\ln x / \ln 3$. (d) $e^{x \ln x}$. ∎
</details>

<details>
<summary>Exercise 2 — Exponential equations</summary>

(a) $e^{2x} - 3e^x + 2 = 0$. (b) $\ln(x + 1) + \ln(x - 1) = 0$.

**Solution.**
(a) $t = e^x$: $t^2 - 3t + 2 = 0 \Rightarrow t = 1, 2 \Rightarrow x = 0$ or $\ln 2$.
(b) Domain $x > 1$. $\ln((x+1)(x-1)) = 0 \Rightarrow x = \sqrt 2$. ∎
</details>

<details>
<summary>Exercise 3 — Inequality</summary>

$\ln(x^2 - 4) < \ln(3x)$.

**Solution.** Domain $x > 2$. $x^2 - 4 < 3x \Rightarrow (x-4)(x+1) < 0 \Rightarrow -1 < x < 4$. Combined: $2 < x < 4$. ∎
</details>

<details>
<summary>Exercise 4 — Change of base</summary>

$\log_4 32 = ?$

**Solution.** $32 = 2^5$, $4 = 2^2$. $\log_4 32 = 5/2$. ∎
</details>

## One-line takeaway

$e^x$ is "the function that is its own derivative", $\ln x$ is its inverse (defined on $(0, +\infty)$), and every $a^x$, every $\log_a$, every $x^\alpha$ elegantly rewrites with $e^{\cdot \ln \cdot}$ — the algebra of growth rates.
