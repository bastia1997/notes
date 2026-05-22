---
title: "Limit of a function: the definition"
area: Limits
summary: "The $\\varepsilon$-$\\delta$ definition of \"$f(x) \\to L$ as $x \\to x_0$\" — the rigorous translation of \"gets close\". Versions with one-sided limits, at infinity, infinite. Heine's sequential characterization."
order: 20
level: intermediate
prereq:
  - "Sequences and limits (sec. 11)"
  - "Logic and quantifiers (sec. 01)"
  - "Basic topology of $\\mathbb{R}$ (sec. 10)"
tools:
  - "Rudin — *Principles*, ch. 4"
---

# Limit of a function: the definition

## Why the $\varepsilon$-$\delta$ definition

You have an intuitive idea: "$f(x) \to L$ as $x \to x_0$" means $f(x)$ gets close to $L$. For rigorous mathematics this isn't enough. Cauchy (1820) and Weierstrass (1860) formalized: **the $\varepsilon$-$\delta$ definition**.

## Accumulation point

Before defining the limit, decide **where** it makes sense.

**Definition.** $x_0$ is an **accumulation point** of $A \subseteq \mathbb{R}$ if every neighborhood of $x_0$ contains some point of $A$ **other than $x_0$**:
$$\forall \delta > 0,\ (x_0 - \delta, x_0 + \delta) \cap (A \setminus \{x_0\}) \ne \emptyset.$$

> $x_0$ may **not belong** to $A$.

## Definition of finite limit at finite point

**Definition (Cauchy-Weierstrass).** $\lim_{x \to x_0} f(x) = L$ if:
$$\forall \varepsilon > 0,\ \exists \delta > 0 : \forall x \in A,\ 0 < |x - x_0| < \delta \Rightarrow |f(x) - L| < \varepsilon.$$

> **Glossary for the formula:**
>
> - $\forall \varepsilon > 0$: "for every output tolerance".
> - $\exists \delta > 0$: "there is an input closeness".
> - $0 < |x - x_0| < \delta$: $x$ is within $\delta$ of $x_0$ but $\ne x_0$.
> - $|f(x) - L| < \varepsilon$: $f(x)$ within $\varepsilon$ of $L$.
>
> **In words:** "for every tolerance $\varepsilon$ on $f(x)$, I can find a closeness $\delta$ such that if $x$ is within $\delta$ of $x_0$ (and not equal), $f(x)$ is within $\varepsilon$ of $L$".

**Key points:**
1. The "$0 < |x - x_0|$" excludes $x = x_0$. **$f(x_0)$ doesn't matter** for the limit.
2. $x$ must be in $A$.
3. $\delta$ depends on $\varepsilon$ (and possibly $x_0$).

## Guided example 1: $\lim_{x \to 2} (3x - 1) = 5$

$|3x - 1 - 5| = 3 |x - 2| < \varepsilon \iff |x - 2| < \varepsilon/3$.

**Choice:** $\delta = \varepsilon/3$. ∎

## Guided example 2: $\lim_{x \to 3} x^2 = 9$

$|x^2 - 9| = |x - 3| \cdot |x + 3|$. Restrict $|x - 3| < 1$ (so $|x + 3| < 7$): $|x^2 - 9| < 7 |x - 3|$.

**Choice:** $\delta = \min(1, \varepsilon/7)$. ∎

> **Technique for nonlinear limits:**
> 1. Bound $|x - x_0|$ by a constant.
> 2. Get $|f(x) - L| \le C |x - x_0|$.
> 3. Choose $\delta = \min(1, \varepsilon/C)$.

## One-sided limits

For $x \to x_0^+$ (right):
$$\lim_{x \to x_0^+} f(x) = L \iff \forall \varepsilon, \exists \delta : x_0 < x < x_0 + \delta \Rightarrow |f(x) - L| < \varepsilon.$$

Analogously $x_0^-$.

> **Theorem.** Bilateral limit exists $\iff$ both one-sided limits exist and equal $L$.

**Example.** $\text{sgn}(x)$: $\lim_{0^+} = 1$, $\lim_{0^-} = -1$. Bilateral doesn't exist.

## Limits at infinity

$$\lim_{x \to +\infty} f(x) = L \iff \forall \varepsilon > 0,\ \exists M > 0 : x > M \Rightarrow |f(x) - L| < \varepsilon.$$

**Example.** $\lim 1/x = 0$ at $+\infty$. Choose $M = 1/\varepsilon$.

## Infinite limits

$$\lim_{x \to x_0} f(x) = +\infty \iff \forall N > 0,\ \exists \delta : 0 < |x - x_0| < \delta \Rightarrow f(x) > N.$$

**Example.** $\lim_{x \to 0^+} 1/x = +\infty$. Choose $\delta = 1/N$.

## Sequential characterization (Heine)

**Theorem (Heine).** $\lim_{x \to x_0} f(x) = L$ $\iff$ for **every** $(x_n) \subseteq A \setminus \{x_0\}$ with $x_n \to x_0$, $f(x_n) \to L$.

> **Use:** translate function-limit problems into sequence-limit problems, where we already have machinery.

### Application: showing a limit does NOT exist

Exhibit two sequences $x_n, y_n \to x_0$ with $f(x_n) \to L_1 \ne L_2 \leftarrow f(y_n)$.

**Example.** $f(x) = \sin(1/x)$, $x_0 = 0$. $x_n = 1/(n\pi)$: $f(x_n) = 0$. $y_n = 1/(\pi/2 + 2n\pi)$: $f(y_n) = 1$. Limit doesn't exist.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="270" x2="580" y2="270" stroke="#948f78" stroke-width="1"/>
<line x1="80" y1="20" x2="80" y2="290" stroke="#948f78" stroke-width="1"/>
<text x="293" y="290" fill="#f3eed9" font-size="11" font-style="italic">x₀</text>
<text x="50" y="155" fill="#f3eed9" font-size="11" font-style="italic">L</text>
<rect x="80" y="120" width="500" height="60" fill="#d4af37" opacity="0.10"/>
<rect x="250" y="20" width="100" height="250" fill="#6fb38a" opacity="0.10"/>
<path d="M 100,250 Q 200,200 280,160 Q 300,148 320,138 Q 400,90 560,40" fill="none" stroke="#e8a04a" stroke-width="2.2"/>
<circle cx="300" cy="150" r="3" fill="#e07a8d"/>
</svg>
<div class="chart-caption">$\varepsilon$-$\delta$: given horizontal band $(L - \varepsilon, L + \varepsilon)$, find vertical band $(x_0 - \delta, x_0 + \delta)$ such that graph (except $x_0$) lies in the horizontal band.</div>
</div>

## Summary of 6 variants

| $x \to$ | $\lim$ = | structure |
|---|---|---|
| $x_0$ finite | $L$ finite | $\forall \varepsilon, \exists \delta : |x-x_0| < \delta$ |
| $x_0$ finite | $\pm\infty$ | $\forall N, \exists \delta$ |
| $+\infty$ | $L$ finite | $\forall \varepsilon, \exists M : x > M$ |
| $+\infty$ | $\pm\infty$ | $\forall N, \exists M$ |
| $-\infty$ | analogous |  |

## Exercises

<details>
<summary>Exercise 1 — Linear $\varepsilon$-$\delta$</summary>

$\lim_{x \to 1} (2x + 5) = 7$.

**Solution.** $\delta = \varepsilon/2$. ∎
</details>

<details>
<summary>Exercise 2 — Nonlinear $\varepsilon$-$\delta$</summary>

$\lim_{x \to 4} \sqrt x = 2$.

**Solution.** $|\sqrt x - 2| = |x - 4|/(\sqrt x + 2)$. Restrict $|x - 4| < 1$: bound by $|x - 4|/3$. $\delta = \min(1, 3\varepsilon)$. ∎
</details>

<details>
<summary>Exercise 3 — Infinite limit</summary>

$\lim_{x \to 2} 1/(x - 2)^2 = +\infty$.

**Solution.** Want $1/(x-2)^2 > N \iff |x - 2| < 1/\sqrt N$. $\delta = 1/\sqrt N$. ∎
</details>

<details>
<summary>Exercise 4 — Non-existence via Heine</summary>

$\lim_{x \to 0} \cos(1/x)$ doesn't exist.

**Solution.** $x_n = 1/(2 n \pi)$: $\cos(2 n \pi) = 1$. $y_n = 1/((2n+1)\pi)$: $\cos((2n+1)\pi) = -1$. Different limits. ∎
</details>

## One-line takeaway

$\lim_{x \to x_0} f(x) = L$ means "$\forall$ output tolerance $\varepsilon$, $\exists$ input closeness $\delta$ such that $0 < |x - x_0| < \delta \Rightarrow |f(x) - L| < \varepsilon$" — the function version of the sequence definition, equivalent via Heine to "every $x_n \to x_0$ yields $f(x_n) \to L$".
