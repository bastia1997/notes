---
title: "Notable limits and Landau symbols (little-o, big-O)"
area: Sequences
summary: "The \"atomic\" limits that show up in a thousand forms — $(1 + 1/n)^n \\to e$, $n^{1/n} \\to 1$, the hierarchy $\\log \\ll n^\\alpha \\ll a^n \\ll n!$ — and **Landau notation** ($o, O, \\sim$) that lets you talk about \"speeds\" of infinity without computation."
order: 15
level: intermediate
prereq:
  - "Algebra of limits (sec. 12)"
  - "Monotone, Bolzano-Weierstrass (sec. 13)"
tools:
  - "Rudin — *Principles*, ch. 3"
---

# Notable limits and Landau symbols

## Why this matters

A few "atomic" limits show up everywhere. Memorize them once, and complex limits reduce algebraically.

In parallel, **Landau asymptotic notation** ($o$, $O$, $\sim$) gives a grammar for **comparing speeds** of convergence/divergence without ε computations.

Having internalized that
$$\log n \ll n^\alpha \ll a^n \ll n! \ll n^n$$
(for $\alpha > 0$, $a > 1$) is half the speed in analysis.

## Intuition

Every sequence going to 0 (or $\infty$) does so at a **speed**. Compare:
- $1/n$ goes to 0 slowly.
- $1/n^2$ faster.
- $1/2^n$ much faster.

Symmetric for infinities. Landau formalizes these relative speeds.

## Landau symbols (for sequences, $n \to \infty$)

Given $(a_n), (b_n)$ with $b_n \ne 0$ eventually:

- **little-o**: $a_n = o(b_n)$ if $\lim a_n/b_n = 0$.
- **big-O**: $a_n = O(b_n)$ if $\exists C > 0, N : |a_n| \le C |b_n|$ for $n \ge N$.
- **asymptotic**: $a_n \sim b_n$ if $\lim a_n/b_n = 1$.
- **same order**: $a_n = \Theta(b_n)$ if $c |b_n| \le |a_n| \le C |b_n|$ eventually.

> **Glossary:**
>
> - $o(b_n)$ ("little-o of $b_n$") = "negligible compared to $b_n$".
> - $O(b_n)$ ("big-O of $b_n$") = "bounded on scale of $b_n$".
> - $\sim$ ("tilde") = "same scale with constant 1".
> - $\Theta$ = "same order of magnitude" (constant $> 0$).
>
> **Examples** ($n \to \infty$):
> - $n^2 = o(n^3)$
> - $n^2 + 5n \sim n^2$
> - $\sin n + n = \Theta(n)$

### Rules with little-o

For $n \to \infty$:

1. $o(b_n) + o(b_n) = o(b_n)$.
2. $c \cdot o(b_n) = o(b_n)$.
3. $o(b_n) \cdot o(c_n) = o(b_n c_n)$.
4. $a_n \cdot o(b_n) = o(a_n b_n)$.

## Notable limits — MEMORIZE

For $n \to \infty$:

| limit | value |
|---|---|
| $1/n^\alpha$ ($\alpha > 0$) | $0$ |
| $a^n$ ($\|a\| < 1$) | $0$ |
| $a^n$ ($a > 1$) | $+\infty$ |
| $n^\alpha/a^n$ ($\alpha > 0, a > 1$) | $0$ |
| $a^n/n!$ ($a > 0$) | $0$ |
| $n!/n^n$ | $0$ |
| $n^{1/n}$ | $1$ |
| $a^{1/n}$ ($a > 0$) | $1$ |
| $(1 + 1/n)^n$ | $e$ |
| $(1 + x/n)^n$ ($x$ fixed) | $e^x$ |
| $\log n / n^\alpha$ ($\alpha > 0$) | $0$ |

### Hierarchy of infinities (by heart)

$$\log^\beta n \ll n^\alpha \ll a^n \ll n! \ll n^n$$

for $\alpha, \beta > 0$, $a > 1$. "$\ll$" means "is $o(\dots)$ of".

> **In words:** factorial crushes exponential, exponential crushes polynomial, polynomial crushes logarithm. Always, asymptotically.

## Key theorems

### Theorem 1 — Definition of $e$

> $\displaystyle e := \lim_{n \to \infty}\left(1 + \frac{1}{n}\right)^n \in (2, 3)$.

Already proved (ch. 13): monotone increasing, bounded by 3.

### Theorem 2 — $n^{1/n} \to 1$

*Proof.* Let $b_n = n^{1/n} - 1 \ge 0$. Then $n = (1 + b_n)^n \ge \binom{n}{2} b_n^2 = \frac{n(n-1)}{2} b_n^2$, so $b_n \le \sqrt{2/(n-1)} \to 0$. ∎

### Theorem 3 — Exponential crushes polynomial

> $\lim n^\alpha / a^n = 0$ for $\alpha > 0$, $a > 1$.

*Proof.* Ratio of consecutive: $\frac{c_{n+1}}{c_n} = \frac{1}{a}(1 + 1/n)^\alpha \to 1/a < 1$. So $c_n \le c_N r^{n-N}$ for some $r < 1$, $c_n \to 0$. ∎

### Theorem 4 — Logarithm crushes polynomial

> $\lim \log n / n^\alpha = 0$ for $\alpha > 0$.

*Sketch.* Substitute $u = \log n$: want $u / e^{\alpha u} \to 0$. From Taylor $e^v \ge v^2/2$, get $u/e^{\alpha u} \le 2/(\alpha^2 u) \to 0$. ∎

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">Hierarchy of infinities, log scale</text>
  <line x1="60" y1="280" x2="580" y2="280" stroke="#3a4868" stroke-width="1"/>
  <line x1="60" y1="40" x2="60" y2="290" stroke="#3a4868" stroke-width="1"/>
  <text x="65" y="295" fill="#f3eed9" font-family="ui-monospace" font-size="11">n=1</text>
  <text x="555" y="295" fill="#f3eed9" font-family="ui-monospace" font-size="11">n=30</text>
  <path d="M 60 270 Q 200 250 350 235 T 580 220" fill="none" stroke="#6aa9d8" stroke-width="2.5"/>
  <text x="540" y="215" fill="#6aa9d8" font-family="ui-monospace" font-size="11">log n</text>
  <path d="M 60 275 Q 320 190 580 100" fill="none" stroke="#6fb38a" stroke-width="2.5"/>
  <text x="540" y="95" fill="#6fb38a" font-family="ui-monospace" font-size="11">n</text>
  <path d="M 60 278 Q 280 230 500 80 T 580 60" fill="none" stroke="#d4af37" stroke-width="2.5"/>
  <text x="540" y="55" fill="#d4af37" font-family="ui-monospace" font-size="11">n²</text>
  <path d="M 60 278 Q 350 270 460 100 T 580 45" fill="none" stroke="#e8a04a" stroke-width="2.5"/>
  <text x="540" y="40" fill="#e8a04a" font-family="ui-monospace" font-size="11">2ⁿ</text>
  <path d="M 60 279 Q 380 278 480 50 T 580 45" fill="none" stroke="#e07a8d" stroke-width="2.5"/>
  <text x="500" y="55" fill="#e07a8d" font-family="ui-monospace" font-size="11">n!</text>
</svg>
<div class="chart-caption">$\log n \ll n \ll n^2 \ll 2^n \ll n!$: factorial wins asymptotically.</div>
</div>

## Guided examples

### Example 1 — Computing with little-o

$$\lim \frac{n^3 + 5 n^{2.5} + \log n}{2 n^3 - n^2}.$$

*Solution.* Identify **dominant**: $n^3$ above and below.
- Numerator $= n^3(1 + o(1))$.
- Denominator $= n^3(2 + o(1))$.
- Ratio $\to 1/2$.

### Example 2 — $1^\infty$ with $e$

$\lim (1 + 1/n)^{2n} = e^2$.

### Example 3 — Generic $1^\infty$

$\lim \left(\frac{n + 2}{n + 1}\right)^n$. Rewrite $\frac{n+2}{n+1} = 1 + 1/(n+1)$. Exponent $n \log(1 + 1/(n+1)) \to 1$. Limit $= e$.

### Example 4 — log vs polynomial

$\lim \log^{10} n / n^{0.001} = 0$. Polynomial always wins.

### Example 5 — Composition

$\lim n \log(1 + 1/n) = 1$ (notable: $\log(1 + x)/x \to 1$).

## "Continuous" notable limits (preview ch. 22)

For $x \to 0$:

| limit | value |
|---|---|
| $\sin x / x$ | $1$ |
| $(1 - \cos x)/x^2$ | $1/2$ |
| $\log(1 + x)/x$ | $1$ |
| $(e^x - 1)/x$ | $1$ |
| $((1+x)^\alpha - 1)/x$ | $\alpha$ |
| $\tan x / x$ | $1$ |

Substitute $x = 1/n$ to apply to sequences.

## Asymptotic comparison table

| $f(n)$ | $n = 1$ | $n = 10$ | $n = 100$ | $n = 1000$ |
|---|---|---|---|---|
| $\log_2 n$ | $0$ | $\sim 3.3$ | $\sim 6.6$ | $\sim 10$ |
| $n$ | $1$ | $10$ | $100$ | $1000$ |
| $n^2$ | $1$ | $100$ | $10^4$ | $10^6$ |
| $2^n$ | $2$ | $1024$ | $\sim 10^{30}$ | $\sim 10^{301}$ |
| $n!$ | $1$ | $\sim 3.6 \cdot 10^6$ | $\sim 9.3 \cdot 10^{157}$ | $\sim 10^{2568}$ |

## Common pitfalls

- **$o(1)$ is NOT a constant.** Means "something going to 0".
- **$a_n \sim b_n$ does NOT imply $a_n - b_n \to 0$.** $n + 1 \sim n$ but $n + 1 - n = 1 \ne 0$. Tilde is about **ratios**.
- **Don't subtract asymptotics.** Risk: $a_n \sim a_n', b_n \sim b_n'$ doesn't imply $a_n - b_n \sim a_n' - b_n'$.
- **Notable limits applied in exact form.** $\sin x/x \to 1$ for $x \to 0$, NOT for $x \to \infty$.

## Exercises

<details>
<summary>Exercise 1 — $(1 + x/n)^n$</summary>

$\lim (1 + 5/n)^n$.

**Solution.** $e^{n \log(1 + 5/n)} = e^{5 + o(1)} \to e^5$. ∎
</details>

<details>
<summary>Exercise 2 — Comparison</summary>

$\lim n^{100} \log^{200} n / 2^n$.

**Solution.** $2^n$ crushes any polynomial × log power. Limit $= 0$. ∎
</details>

<details>
<summary>Exercise 3 — $e$ generic</summary>

$\lim \left(\frac{n - 1}{n + 1}\right)^n$.

**Solution.** $= 1 - 2/(n+1)$. Exponent $\to -2$. Limit $= e^{-2}$. ∎
</details>

<details>
<summary>Exercise 4 — Root of a sum</summary>

$\lim \sqrt[n]{n^3 + 5^n}$.

**Solution.** $5^n \le \cdot \le 2 \cdot 5^n$. So $5 \le \cdot \le 5 \cdot 2^{1/n} \to 5$. Squeeze. ∎
</details>

<details>
<summary>Exercise 5 — $n(\sqrt[n]{2} - 1)$</summary>

**Solution.** $\sqrt[n]{2} = 1 + (\log 2)/n + o(1/n)$. So $n(\sqrt[n]{2} - 1) \to \log 2$. ∎
</details>

## One-line takeaway

**Notable limits** (memory) + **Landau** (language) = "identify the dominant term, write everything as dominant + $o$(dominant), simplify, read the limit" — the technique solving 95% of Calculus I limits.
