---
title: "Algebra of sequence limits"
area: Sequences
summary: "The rules that let you compute limits **without** reapplying the ε-N definition every time. How sum, product, quotient behave — and the **indeterminate forms** where blind algebra fails."
order: 12
level: intermediate
prereq:
  - "ε-N definition (sec. 11)"
  - "Triangle inequality (sec. 06)"
tools:
  - "Rudin — *Principles*, ch. 3"
---

# Algebra of sequence limits

## Why this matters

Once you understand the definition of limit (ch. 11), computing every $\lim a_n$ via $\varepsilon$-$N$ would be unsustainable. We prove once and for all that the limit is **linear** (sum of limits = limit of sum), **multiplicative**, **respects quotients** (with care) — and from then on work purely with algebraic rules.

The only exceptions: certain **indeterminate forms** (like $\infty - \infty$ or $0 \cdot \infty$) where blind algebra fails and creativity is needed.

## Intuition

If $a_n \to A$ and $b_n \to B$, then $a_n + b_n$ should tend to $A + B$: summing "tails close to $A$" with "tails close to $B$" gives "tails close to $A + B$". Same for product and quotient.

The trouble are cases like "$0 \cdot \infty$" and "$\infty - \infty$": the two ingredients pull in opposite directions and the outcome isn't determined just by their limits. Needs case-by-case analysis.

## Extended real line

We work in the **extended real line**:
$$\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty,\ +\infty\}.$$

> **Glossary:**
>
> - $\overline{\mathbb{R}}$ = reals with two "points at infinity" added.
> - $+\infty, -\infty$ are **not numbers**: they're symbols meaning "diverges growing/shrinking".
> - Operations extend **partially**.

### Defined operations with $\infty$

| operation | result |
|---|---|
| $a + \infty$ ($a \in \mathbb{R}$) | $+\infty$ |
| $a \cdot (+\infty)$ with $a > 0$ | $+\infty$ |
| $a \cdot (+\infty)$ with $a < 0$ | $-\infty$ |
| $a / (\pm\infty)$ | $0$ |
| $(+\infty) + (+\infty)$ | $+\infty$ |
| $(+\infty) \cdot (+\infty)$ | $+\infty$ |

### **Indeterminate** forms (not defined)

$$\infty - \infty,\quad 0 \cdot \infty,\quad \frac{0}{0},\quad \frac{\infty}{\infty},\quad 1^\infty,\quad 0^0,\quad \infty^0.$$

> **Warning.** "Indeterminate" does **not** mean "no limit". It means the limit isn't determined by the two parts alone — depends on **how** they go to zero/infinity (relative speed).
>
> Example, $\infty - \infty$:
> - $(n + 1) - n = 1 \to 1$
> - $n^2 - n \to +\infty$
> - $n - n^2 \to -\infty$
> - $n + (-1)^n - n = (-1)^n$ (oscillates)
>
> Same skeleton, four different outcomes.

## Algebra of finite limits

### Theorem 1 — Four operations

> Let $a_n \to A$ and $b_n \to B$, both in $\mathbb{R}$. Then:
>
> (i) **Sum**: $a_n + b_n \to A + B$.
> (ii) **Product**: $a_n \cdot b_n \to A \cdot B$.
> (iii) **Quotient** (if $B \ne 0$): $a_n / b_n \to A / B$.
> (iv) **Absolute value**: $|a_n| \to |A|$.
> (v) **Scalar**: for $\lambda \in \mathbb{R}$, $\lambda a_n \to \lambda A$.

*Proof of (i).* Done in ch. 11 (the $\varepsilon/2$ trick).

*Proof of (ii) — a classic.* We want $|a_n b_n - AB| \to 0$. Use **add and subtract** $A b_n$:
$$a_n b_n - A B = (a_n - A) b_n + A(b_n - B).$$
By triangle:
$$|a_n b_n - AB| \le |a_n - A| \cdot |b_n| + |A| \cdot |b_n - B|.$$
Since $b_n \to B$, $(b_n)$ is bounded: $|b_n| \le M$. Given $\varepsilon > 0$, pick $N$ such that $|a_n - A| < \varepsilon/(2M)$ and $|b_n - B| < \varepsilon/(2(|A|+1))$. Then $< \varepsilon$. ∎

*Proof of (iii).* By sign persistence (ch. 11), $|b_n| > |B|/2 > 0$ eventually. Same trick: $\frac{a_n}{b_n} - \frac{A}{B} = \frac{a_n B - A b_n}{b_n B}$, bound numerator, denominator from below. ∎

## Algebra with infinite limits

Same flavor. Example:

**Proposition.** If $a_n \to A \in \mathbb{R}$ and $b_n \to +\infty$, then $a_n + b_n \to +\infty$.

*Proof.* Given $M > 0$: $\exists N_1$ with $a_n > A - 1$ (definition with $\varepsilon = 1$); $\exists N_2$ with $b_n > M - A + 1$. For $n \ge \max(N_1, N_2)$: $a_n + b_n > M$. ∎

## Comparison

### Theorem 2 — Comparison

> If $a_n \le b_n$ eventually and $a_n \to A$, $b_n \to B$ in $\overline{\mathbb{R}}$, then $A \le B$.

> **The inequality is preserved at the limit (weakly).**

*Proof (by contradiction, $A, B$ finite).* If $A > B$, take $\varepsilon = (A - B)/3 > 0$. Eventually $a_n > A - \varepsilon$ and $b_n < B + \varepsilon$, so $a_n - b_n > (A - B) - 2\varepsilon = (A - B)/3 > 0$, contradicting $a_n \le b_n$. ∎

> **Watch out: strict inequality is NOT preserved.** $1/n < 2/n$ but both $\to 0$, not $0 < 0$.

### Theorem 3 — Squeeze (sandwich)

> If $a_n \le b_n \le c_n$ eventually, $a_n \to L$, $c_n \to L$ in $\mathbb{R}$, then $b_n \to L$.

> **In words:** two sequences converging to the same $L$ "squeeze" a third between them, forcing it to the same limit.

*Proof.* As in ch. 11 ex. 6. ∎

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="300" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">Squeeze theorem</text>
  <line x1="50" y1="240" x2="580" y2="240" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="50" x2="50" y2="250" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="150" x2="580" y2="150" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="555" y="146" fill="#d4af37" font-family="ui-monospace" font-size="11">L</text>
  <path d="M 80 220 Q 200 200 320 170 T 560 152" fill="none" stroke="#6aa9d8" stroke-width="2.5"/>
  <path d="M 80 80 Q 200 100 320 130 T 560 148" fill="none" stroke="#e07a8d" stroke-width="2.5"/>
  <path d="M 80 140 Q 200 165 320 145 T 560 150" fill="none" stroke="#6fb38a" stroke-width="3" stroke-dasharray="4 3"/>
  <text x="90" y="225" fill="#6aa9d8" font-family="ui-monospace" font-size="11">aₙ (low)</text>
  <text x="90" y="75" fill="#e07a8d" font-family="ui-monospace" font-size="11">cₙ (high)</text>
  <text x="200" y="180" fill="#6fb38a" font-family="ui-monospace" font-size="11">bₙ (middle)</text>
  <text x="60" y="270" fill="#f3eed9" font-family="ui-monospace" font-size="11">aₙ, cₙ → L squeeze bₙ which is forced to L</text>
</svg>
<div class="chart-caption">Squeeze: two sequences converging to $L$ squeeze a third one to $L$.</div>
</div>

## Guided examples

### Example 1 — Polynomial ratio ($\infty/\infty$)

$$\lim_{n \to \infty} \frac{n + 1}{n^2 + 3}.$$

*Solution.* Divide by $n^2$ (highest power in denominator):
$$\frac{n + 1}{n^2 + 3} = \frac{1/n + 1/n^2}{1 + 3/n^2} \to \frac{0 + 0}{1 + 0} = 0.$$

> **Technique.** In polynomial ratio: divide by highest power of the denominator. Limit is:
> - ratio of leading coefficients (same degrees);
> - $0$ (num degree < den degree);
> - $\pm \infty$ (num degree > den degree).

### Example 2 — $\infty - \infty$ (rationalize)

$$\lim_{n \to \infty}(\sqrt{n^2 + n} - n).$$

*Solution.* Multiply by conjugate $(\sqrt{n^2 + n} + n)$:
$$\sqrt{n^2 + n} - n = \frac{n}{\sqrt{n^2 + n} + n} = \frac{1}{\sqrt{1 + 1/n} + 1} \to \frac{1}{2}.$$

### Example 3 — Squeeze with $\sin$

$\lim \dfrac{\sin n}{n}$. Since $|\sin n| \le 1$, $\left|\frac{\sin n}{n}\right| \le \frac{1}{n}$, so limit $= 0$.

### Example 4 — Factorials

$\lim \dfrac{n!}{n^n}$.

*Solution.* $\frac{n!}{n^n} = \frac{1}{n} \cdot \frac{2}{n} \cdots \frac{n}{n} \le \frac{1}{n} \cdot 1 \cdots 1 = \frac{1}{n} \to 0$. Squeeze. ∎

### Example 5 — $0 \cdot \infty$ gives anything

- $\lim n \cdot 1/n^2 = 0$.
- $\lim n \cdot 1/n = 1$.
- $\lim n^2 \cdot 1/n = +\infty$.

### Example 6 — Sum with rewriting

$\lim \dfrac{1 + 2 + \dots + n}{n^2}$.

*Solution.* By Gauss (ch. 03): $1 + \dots + n = n(n+1)/2$. So limit $= \lim \frac{n+1}{2n} = 1/2$. ∎

## Operating strategies

1. **Polynomials in $n$**: factor out the dominant power.
2. **Radicals**: rationalize via conjugate.
3. **$0/0$ or $\infty/\infty$**: algebraic simplification, or notable limits (ch. 15).
4. **Expressions with $\sin, \cos$**: use $|\sin x|, |\cos x| \le 1$ + squeeze.
5. **$1^\infty$ forms**: rewrite as $e^{n \log(\dots)}$ and analyze the exponent (ch. 15).
6. **Factorials**: use consecutive ratios.

## Common pitfalls

- **"$\infty - \infty = 0$" is false in general.** See example 2.
- **"$0 \cdot \infty = 0$" is false.** See example 5.
- **Strict inequality not preserved.** $1/n > 0$ but $\lim = 0$.
- **Algebra of limits requires existing limits.** $a_n = (-1)^n$ doesn't converge, but $a_n + (1 - a_n) = 1$ converges. Algebra needs both pieces convergent.
- **Quotient with $B = 0$:** if $a_n \to A \ne 0$ and $b_n \to 0$, $a_n/b_n$ diverges in modulus, but the sign may be unstable.
- **Squeeze requires same limit for $a, c$.** If $a_n \to L_1 \ne L_2 \leftarrow c_n$, you can't conclude.

## Exercises

<details>
<summary>Exercise 1 — Polynomial ratio</summary>

Compute $\displaystyle \lim \frac{5 n^4 - 3 n^2 + 7}{2 n^4 + n^3 - 1}$.

**Solution.** Divide by $n^4$: $\to \frac{5}{2}$. ∎
</details>

<details>
<summary>Exercise 2 — Rationalization</summary>

Compute $\displaystyle \lim (\sqrt{n^2 + 5n + 1} - \sqrt{n^2 - 2n})$.

**Solution.** Multiply by conjugate, then divide top and bottom by $n$:
$$\frac{7n + 1}{\sqrt{n^2 + 5n + 1} + \sqrt{n^2 - 2n}} \to \frac{7}{2}. \quad\blacksquare$$
</details>

<details>
<summary>Exercise 3 — Squeeze with sin/cos</summary>

Compute $\displaystyle \lim \frac{n^2 + \cos n}{2 n^2 - \sin n}$.

**Solution.** Bounded between $\frac{n^2 - 1}{2n^2 + 1}$ and $\frac{n^2 + 1}{2n^2 - 1}$, both $\to 1/2$. Squeeze: limit $= 1/2$. ∎
</details>

<details>
<summary>Exercise 4 — $0 \cdot \infty$</summary>

Compute $\displaystyle \lim n \sin(1/n^2)$.

**Solution.** $|\sin x| \le |x|$, so $|\sin(1/n^2)| \le 1/n^2$. Therefore $|n \sin(1/n^2)| \le 1/n \to 0$. Limit $= 0$. ∎
</details>

<details>
<summary>Exercise 5 — Different outcomes for $0 \cdot \infty$</summary>

Find $a_n \to 0$ and $b_n \to +\infty$ with $a_n b_n$ tending to $0$, $1$, $+\infty$, $-\infty$.

**Solution.**
- $a_n = 1/n^2,\ b_n = n$: $\to 0$.
- $a_n = 1/n,\ b_n = n$: $\to 1$.
- $a_n = 1/n,\ b_n = n^2$: $\to +\infty$.
- $a_n = -1/n,\ b_n = n^2$: $\to -\infty$. ∎
</details>

<details>
<summary>Exercise 6 — Telescoping sum</summary>

Compute $\displaystyle \lim \sum_{k=1}^n \frac{1}{k(k+1)}$.

**Solution.** Telescoping: $\frac{1}{k(k+1)} = \frac{1}{k} - \frac{1}{k+1}$. Sum $= 1 - 1/(n+1) \to 1$. ∎
</details>

<details>
<summary>Exercise 7 — $n$-th root of a sum</summary>

Compute $\lim \sqrt[n]{n^2 + 2^n}$.

**Solution.** $2^n \le n^2 + 2^n \le 2 \cdot 2^n$ eventually. So $2 \le \sqrt[n]{n^2 + 2^n} \le 2 \cdot 2^{1/n} \to 2$. Squeeze: $\to 2$. ∎
</details>

<details>
<summary>Exercise 8 — Recursive sequence</summary>

$a_1 = 1$, $a_{n+1} = \sqrt{2 + a_n}$. Assuming the limit exists, compute it.

**Solution.** If $a_n \to L$, then $\sqrt{2 + a_n} \to \sqrt{2 + L}$ by continuity. So $L = \sqrt{2 + L}$, $L^2 - L - 2 = 0$, $L = 2$ ($L = -1$ rejected, $a_n > 0$). ∎

(Existence proved by monotonicity + boundedness, ch. 13.)
</details>

## Summary table

| form | outcome |
|---|---|
| $A + B$ ($A, B$ finite) | $A + B$ |
| $A + (\pm\infty)$ ($A$ finite) | $\pm \infty$ |
| $\infty + \infty$ (same sign) | $\pm\infty$ |
| $\infty - \infty$ | **indeterminate** |
| $A \cdot B$ ($A, B$ finite) | $AB$ |
| $0 \cdot \infty$ | **indeterminate** |
| $A/B$ ($B \ne 0$) | $A/B$ |
| $A/0$ ($A \ne 0$) | $\pm\infty$ (sign depends) |
| $0/0$, $\infty/\infty$, $1^\infty$, $0^0$, $\infty^0$ | **indeterminate** |

## One-line takeaway

Algebra of limits says "limits commute with $+, \cdot, /$" — enough for 90% of exercises; the remaining 10% (indeterminate forms) requires algebraic manipulation + **notable limits** (ch. 15).
