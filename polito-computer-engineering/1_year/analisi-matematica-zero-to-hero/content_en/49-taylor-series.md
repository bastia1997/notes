---
title: "Taylor series and analyticity"
area: Series
summary: "For $f \\in C^\\infty$ near $x_0$, the **Taylor series** is $\\sum f^{(n)}(x_0)(x-x_0)^n/n!$. Converges to $f$ $\\iff R_n \\to 0$. **Analytic** functions, classical expansions, the celebrated $C^\\infty$ non-analytic counterexample."
order: 49
level: advanced
prereq:
  - "Power series (sec. 48)"
  - "Taylor with remainder (sec. 33)"
tools:
  - "Rudin — *Principles*, ch. 8"
---

# Taylor series and analyticity

## Why

Previous section: given $\sum a_n x^n$, find $R$, sum is $C^\infty$.

Now we **reverse**: given $f \in C^\infty$ near $x_0$, **when** is $f$ the sum of a power series? Answer: precisely when $f$ is **analytic**.

## Taylor polynomial and series

**Definition.** $f \in C^n$ near $x_0$. The **Taylor polynomial of degree $n$**:
$$T_n(x) := \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!} (x-x_0)^k.$$

**Definition.** $f \in C^\infty$ near $x_0$. The **Taylor series**:
$$\sum_{n=0}^\infty \frac{f^{(n)}(x_0)}{n!} (x-x_0)^n.$$

> **Glossary:**
>
> - $x_0 = 0$ → **Maclaurin** series.
> - The series is a power series: has radius $R$, sum $S(x)$.
> - **Key question:** $S(x) = f(x)$? Not necessarily!

## Taylor remainder — analyticity criterion

**Lagrange.** $f \in C^{n+1}$: there exists $\xi$ between $x_0$ and $x$:
$$f(x) - T_n(x) = R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}.$$

**Fundamental criterion.** Taylor series converges to $f$ at $x$ $\iff$ $R_n(x) \to 0$.

> "Is $f$ analytic?" $\equiv$ "does the remainder go to zero?"

## Analytic functions

**Definition.** $f$ is **analytic at $x_0$** if there exists $\delta > 0$ such that for $|x-x_0|<\delta$:
$$f(x) = \sum_{n=0}^\infty \frac{f^{(n)}(x_0)}{n!}(x-x_0)^n.$$

**Notation:** $f \in C^\omega$.

**Hierarchy:** $C^\omega \subsetneq C^\infty \subsetneq \dots \subsetneq C^1 \subsetneq C^0$.

**Properties.**
1. Sum, product, quotient, composition of analytic is analytic.
2. Derivative and antiderivative of analytic are analytic.
3. **Identity principle:** if $f, g$ analytic on a connected set and coincide on a set with accumulation point, then $f \equiv g$. (Strong, rare in $C^\infty$.)

## Classical expansions

### $e^x$

**Theorem.** $e^x = \sum x^n/n!$ for every $x$.

*Proof.* $f^{(n)}(x) = e^x$. Remainder: $|R_n(x)| \le e^x |x|^{n+1}/(n+1)! \to 0$ ($n! \gg |x|^n$). ∎

### $\sin, \cos$

**Theorem.** $\sin x = \sum (-1)^n x^{2n+1}/(2n+1)!$ and $\cos x = \sum (-1)^n x^{2n}/(2n)!$ for every $x$.

*Proof.* $|f^{(n)}(\xi)| \le 1$, so $|R_n| \le |x|^{n+1}/(n+1)! \to 0$. ∎

**Euler (formal).** $e^{ix} = \cos x + i\sin x$ (substituting $ix$ in series of $e^x$).

### $\ln(1+x)$

**Theorem.** For $-1 < x \le 1$:
$$\ln(1+x) = \sum_{n=1}^\infty (-1)^{n+1} x^n/n.$$

*Proof.* Integrate $1/(1+t) = \sum(-1)^n t^n$ on $[0,x]$. At $x=1$: Leibniz + Abel at boundary. ∎

**Consequence:** $\ln 2 = 1 - 1/2 + 1/3 - 1/4 + \dots$

### Binomial $(1+x)^\alpha$

**Theorem (Newton).** For $\alpha \in \mathbb{R}$ and $|x| < 1$:
$$(1+x)^\alpha = \sum_{n=0}^\infty \binom{\alpha}{n} x^n, \quad \binom{\alpha}{n} = \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}.$$

**Useful cases:**
- $\alpha = 1/2$: $\sqrt{1+x} = 1 + x/2 - x^2/8 + \dots$
- $\alpha = -1$: $(1+x)^{-1} = \sum (-1)^n x^n$.
- $\alpha = -1/2$: $1/\sqrt{1+x}$ (used in $\arcsin$).

## Table of notable Maclaurin series

| $f(x)$ | Series | Validity |
|---|---|---|
| $e^x$ | $\sum x^n/n!$ | $\forall x$ |
| $\sin x$ | $\sum (-1)^n x^{2n+1}/(2n+1)!$ | $\forall x$ |
| $\cos x$ | $\sum (-1)^n x^{2n}/(2n)!$ | $\forall x$ |
| $\sinh x$ | $\sum x^{2n+1}/(2n+1)!$ | $\forall x$ |
| $\cosh x$ | $\sum x^{2n}/(2n)!$ | $\forall x$ |
| $\ln(1+x)$ | $\sum (-1)^{n+1} x^n/n$ | $-1 < x \le 1$ |
| $\arctan x$ | $\sum (-1)^n x^{2n+1}/(2n+1)$ | $-1 \le x \le 1$ |
| $(1+x)^\alpha$ | $\sum \binom{\alpha}{n} x^n$ | $|x|<1$ |
| $1/(1-x)$ | $\sum x^n$ | $-1<x<1$ |

## The counterexample: $C^\infty$ non-analytic

**Definition.**
$$f(x) := \begin{cases} e^{-1/x^2} & x \ne 0 \\ 0 & x = 0. \end{cases}$$

**Theorem.** $f \in C^\infty(\mathbb{R})$ and $f^{(n)}(0) = 0$ for every $n$.

*Proof (sketch).* For $x \ne 0$, $f$ is $C^\infty$ composition. At 0:
- $f'(0) = \lim_{h\to 0} e^{-1/h^2}/h$. Set $t = 1/h^2$: $\pm\sqrt t\,e^{-t} \to 0$.
- By induction, $f^{(n)}(x) = P_n(1/x) e^{-1/x^2}$ for $x \ne 0$. Limit at 0 = 0 (exponential crushes any polynomial). ∎

**Consequence.** Taylor series at 0 is $\sum 0 \cdot x^n/n! = 0$, but $f \not\equiv 0$. **Not analytic at 0**.

> **Moral.** $C^\infty$ doesn't guarantee analyticity. Need $R_n \to 0$, non-local condition.

## Bump functions

The counterexample is the basis for **bump functions** $C^\infty$ with compact support, e.g.
$$\varphi(x) = \begin{cases} e^{-1/(1-x^2)} & |x|<1 \\ 0 & |x| \ge 1. \end{cases}$$

Impossible in the analytic (identity principle). Pillars of distributions, harmonic analysis, PDEs.

## Expansion techniques

- **Substitution:** $\sin(x^2) = \sum (-1)^n x^{4n+2}/(2n+1)!$.
- **Combination:** $\cosh x = (e^x + e^{-x})/2$.
- **Product:** Cauchy.
- **Term-by-term derivation/integration.**

## Exercises

<details>
<summary>Exercise 1 — $\pi$ via Leibniz</summary>

With $\pi/4 = \sum (-1)^n/(2n+1)$: $S_5 = 4(1-1/3+1/5-1/7+1/9) \approx 3.34$. Leibniz error $\le 4/11 \approx 0.36$. **Very slow** (need Machin to accelerate). ∎
</details>

<details>
<summary>Exercise 2 — Binomial expansion</summary>

$\sqrt{1-x^2}$ up to $x^6$. $u = -x^2$, $\alpha = 1/2$:
$$= 1 - x^2/2 - x^4/8 - x^6/16 + O(x^8). \qquad ∎$$
</details>

<details>
<summary>Exercise 3 — Error estimate $e^x$</summary>

How many terms needed for $e^{0.5}$ with error $< 10^{-5}$? $|R_n| \le 2 \cdot 0.5^{n+1}/(n+1)!$. Testing: $n=5$ insufficient, $n=6$ sufficient. **7 terms**. ∎
</details>

<details>
<summary>Exercise 4 — Poisson identity</summary>

$\sum r^n \cos(n\theta) = (1-r\cos\theta)/(1-2r\cos\theta+r^2)$ for $|r|<1$.

*Proof.* Complex geometric $\sum (re^{i\theta})^n = 1/(1-re^{i\theta})$, real part. ∎
</details>

## One-line takeaway

The **Taylor series** of $f \in C^\infty$ converges to $f$ $\iff R_n \to 0$; **analytic** functions are the subset of $C^\infty$ with this property; classical examples ($e^x, \sin, \cos, \ln(1+x), \arctan, (1+x)^\alpha$) are analytic; the celebrated $e^{-1/x^2}$ is $C^\infty$ but not analytic at 0, base of bump functions.
