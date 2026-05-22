---
title: "Theorems on limits of functions"
area: Limits
summary: "Algebraic rules to compute limits **without** going back to the $\\varepsilon$-$\\delta$ definition every time. Uniqueness, sum/product/quotient, sign persistence, **squeeze theorem**, substitution, indeterminate forms."
order: 21
level: intermediate
prereq:
  - "Definition of function limit (sec. 20)"
  - "Theorems on sequence limits (sec. 12)"
tools:
  - "Rudin — *Principles*, ch. 4"
---

# Theorems on limits of functions

## General idea

Once the definition (ch. 20) is mastered, computing every limit via $\varepsilon$-$\delta$ is unsustainable. These theorems form the "limit calculus": combining elementary limits to get complex ones **without** revisiting the definition.

Most proofs go directly or through Heine's sequential characterization.

In all the section: $f, g : A \to \mathbb{R}$, $x_0 \in A'$, and $\lim f = L$, $\lim g = M$ exist finite (unless stated).

> **Glossary:**
>
> - $f, g$ = real functions to analyze.
> - $A \subseteq \mathbb{R}$ = domain.
> - $x_0 \in A'$ = **accumulation point** of $A$ (points of $A$ approach it arbitrarily close, possibly without reaching it).
> - $L, M \in \mathbb{R}$ = the two limits (finite).
> - $\varepsilon, \delta > 0$ = tolerances (vertical, horizontal) in the limit definition.
> - **Punctured neighborhood** of $x_0$ = $(x_0 - \delta, x_0 + \delta) \setminus \{x_0\}$ — excludes the center.

## Uniqueness of limit

**Theorem.** If $\lim f = L_1$ and $\lim f = L_2$, then $L_1 = L_2$.

*Proof (by contradiction).* If $L_1 \ne L_2$, take $\varepsilon = |L_1 - L_2|/2$. Then $|L_1 - L_2| < 2\varepsilon = |L_1 - L_2|$, absurd. ∎

## Algebra of limits

> (i) **Sum**: $\lim(f + g) = L + M$.
> (ii) **Product**: $\lim(fg) = LM$.
> (iii) **Scalar**: $\lim(cf) = cL$.
> (iv) **Quotient** (if $M \ne 0$): $\lim(f/g) = L/M$.
> (v) **Absolute value**: $\lim |f| = |L|$.

*Sum proof.* $|f + g - (L + M)| \le |f - L| + |g - M|$. With $\varepsilon/2$ each, sum $< \varepsilon$. ∎

*Product proof.* "Add and subtract $Lg$" trick: $|fg - LM| \le |g| \cdot |f - L| + |L| \cdot |g - M|$. Bound $|g| \le |M| + 1$ near $x_0$. ∎

## Sign persistence

**Theorem.** If $\lim_{x \to x_0} f(x) = L > 0$, there's a punctured neighborhood of $x_0$ where $f(x) > 0$.

> If the limit is strictly positive, $f$ is eventually positive too.

*Proof.* $\varepsilon = L/2$: $f(x) > L - L/2 = L/2 > 0$. ∎

> **Warning:** with weak $\ge$, only $L \ge 0$ (not $> 0$). E.g. $x^2 > 0$ on $(0, 1)$ but $\lim_0 = 0$.

## Comparison theorem

**Theorem.** If $f(x) \le g(x)$ near $x_0$ and limits exist, then $L \le M$.

*Proof.* Apply sign persistence to $g - f$. ∎

## Squeeze theorem (sandwich)

**Theorem.** If $f \le g \le h$ near $x_0$ and $\lim f = \lim h = L$, then $\lim g = L$.

> **In words:** two functions converging to the same limit squeeze a third one between them, forcing it to the same limit.

### Paradigmatic example

$\lim_{x \to 0} x \sin(1/x) = 0$.

For $x \ne 0$: $-|x| \le x \sin(1/x) \le |x|$. Both ends $\to 0$. Squeeze: limit $= 0$.

> **Note:** $\lim_{x \to 0} \sin(1/x)$ doesn't exist (oscillates), but multiplied by $x$ it "shrinks" to 0.

## Substitution (change of variable)

**Theorem.** If $\lim_{x \to x_0} g(x) = y_0$, $\lim_{y \to y_0} f(y) = L$, and **either** $g(x) \ne y_0$ in a punctured neighborhood, **or** $f$ is continuous at $y_0$ with $f(y_0) = L$, then $\lim_{x \to x_0} f(g(x)) = L$.

**Example.** $\lim_{x \to 0} \sin(\sin x)$. Set $y = \sin x \to 0$. Then $\sin y \to 0$. ∎

## Indeterminate forms

Expressions where algebra alone doesn't decide:
$$\frac{0}{0}, \frac{\infty}{\infty}, 0 \cdot \infty, \infty - \infty, 1^\infty, 0^0, \infty^0.$$

> **"Indeterminate" does NOT mean "no limit"** — it means "depends on the speeds, not just the limits".

Same $0/0$ form, different outcomes:
- $\lim_0 x/x = 1$
- $\lim_0 x^2/x = 0$
- $\lim_0 x/x^2 = \pm\infty$
- $\lim_0 \sin x/x = 1$ (notable limit)

## Notable limits (preview, ch. 22)

$$\lim_0 \frac{\sin x}{x} = 1, \quad \lim_0 \frac{1 - \cos x}{x^2} = \frac{1}{2}$$
$$\lim_0 \frac{e^x - 1}{x} = 1, \quad \lim_0 \frac{\ln(1+x)}{x} = 1$$
$$\lim_{\pm\infty}(1 + 1/x)^x = e$$

## Worked examples

**1.** $\lim_{x \to 2}(x^2 - 3x + 1) = -1$ (polynomial: limit = value).

**2.** $\lim_{x \to 1}(x^2 - 1)/(x - 1) = 0/0$. Factor: $(x+1) \to 2$.

**3.** $\lim_{+\infty}(3x^2 - x + 1)/(2x^2 + 5) = 3/2$ (divide by $x^2$).

**4.** $\lim_0 \sin(3x)/x = 3 \cdot \lim \sin(3x)/(3x) = 3$.

## Exercises

<details>
<summary>Exercise 1 — Algebra</summary>

$\lim_{x \to 3}(x^2 - 5)/(x + 2) = 4/5$. ∎
</details>

<details>
<summary>Exercise 2 — $0/0$ factorization</summary>

$\lim_{x \to 2}(x^3 - 8)/(x^2 - 4) = (x^2 + 2x + 4)/(x + 2) \to 12/4 = 3$. ∎
</details>

<details>
<summary>Exercise 3 — Squeeze</summary>

$\lim_0 x^2 \cos(1/x^3) = 0$ (bound by $x^2$). ∎
</details>

<details>
<summary>Exercise 4 — Rationalization</summary>

$\lim_{+\infty}(\sqrt{x^2 + 1} - x) = \lim 1/(\sqrt{x^2+1} + x) = 0$. ∎
</details>

<details>
<summary>Exercise 5 — Substitution</summary>

$\lim_0 \sin(x^2)/x^2$: $y = x^2 \to 0^+$, $\sin y/y \to 1$. ∎
</details>

## One-line takeaway

Function limits compute via **algebraic rules** (sum, product, quotient) + **squeeze theorem** + **standard manipulations** (factor, rationalize, substitute) + **notable limits** (ch. 22) — going back to $\varepsilon$-$\delta$ only to establish the rules.
