---
title: "Computing limits with Taylor expansions"
area: Derivatives
summary: "The most powerful technique for $0/0$ limits with elementary functions. Replace each $f$ with its Taylor polynomial of sufficient order, do the algebra, read the limit from the dominant term."
order: 34
level: intermediate
prereq:
  - "Taylor polynomial (sec. 33)"
  - "$o$-small (sec. 15)"
tools:
  - "Rudin — *Principles*, ch. 5"
---

# Computing limits with Taylor expansions

## Why

**Hôpital** transforms a limit into another. **Taylor** transforms it into **algebra**: replace each function with its Maclaurin polynomial of suitable order, do algebra, read the limit.

For expressions with $\exp, \sin, \cos, \ln$, powers: almost always fastest with fewest errors.

## General strategy

For $\lim_{x \to 0} f(x)/g(x)$ in $0/0$ form:

1. **Estimate order** of $f, g$ at 0: $f \sim a x^p$, $g \sim b x^q$.
2. **Expand** $f, g$ via Taylor up to $\max(p, q)$.
3. **Substitute**, simplify.
4. **Limit** = ratio of lowest non-zero order terms.

## Base expansions (memorize)

$$e^x = 1 + x + x^2/2 + x^3/6 + o(x^3)$$
$$\sin x = x - x^3/6 + o(x^4)$$
$$\cos x = 1 - x^2/2 + x^4/24 + o(x^5)$$
$$\ln(1+x) = x - x^2/2 + x^3/3 + o(x^3)$$
$$(1+x)^\alpha = 1 + \alpha x + \binom{\alpha}{2} x^2 + o(x^2)$$

> **Glossary:**
>
> - $o(x^n)$ = "**little-o** of $x^n$": term going to 0 **faster** than $x^n$ as $x \to 0$.
> - $f(x) \sim a x^p$ ($x \to 0$) = $f$ is **asymptotic** to $ax^p$ (ratio $\to 1$), $p$ is the **order** of $f$ at 0.
> - $\binom{\alpha}{2} = \alpha(\alpha-1)/2$ = generalized binomial coefficient.
> - **Adequate order:** how many derivatives you need depends on the expected order of vanishing of the numerator.

## Examples

### 1. Classic limit

$\lim_0 (\sin x - x)/x^3$. $\sin x = x - x^3/6 + o(x^3)$. Numerator: $-x^3/6 + o(x^3)$. Limit: $-1/6$.

### 2. Exponential

$\lim_0 (e^x - 1 - x)/x^2 = (x^2/2 + o(x^2))/x^2 \to 1/2$.

### 3. Multi-ingredient

$\lim_0 (\ln(1+x) - \sin x)/x^2$. $\ln(1+x) = x - x^2/2 + o(x^2)$, $\sin x = x + o(x^2)$. Diff: $-x^2/2 + o(x^2)$. Limit: $-1/2$.

### 4. All Taylor

$\lim_0 (\cos x - 1 + x^2/2)/x^4$. $\cos x = 1 - x^2/2 + x^4/24 + o(x^4)$. Numerator: $x^4/24 + o(x^4)$. Limit: $1/24$.

## Common errors

**Order too low.** $\lim_0 (\sin x - x)/x^3$ with $\sin x = x + o(x)$: numerator $= o(x)$, too vague.

**$o$ propagation.** $\sin(x^2) = x^2 - x^6/6 + o(x^6)$ (not $o(x^2)$).

**Cancellations.** If main terms cancel, expand to higher order.

## Exercises

<details>
<summary>Exercise 1</summary>

$\lim_0 (e^{x^2} - \cos x)/x^2 = (1 + x^2 - (1 - x^2/2) + o(x^2))/x^2 \to 3/2$. ∎
</details>

<details>
<summary>Exercise 2</summary>

$\lim_0 (x - \sin x)/(x - \tan x) = (x^3/6)/(-x^3/3) = -1/2$. ∎
</details>

## One-line takeaway

**Taylor for limits:** replace each function with Maclaurin to sufficient order, simplify, read the ratio of dominant terms — most powerful technique for $0/0$ with elementary functions.
