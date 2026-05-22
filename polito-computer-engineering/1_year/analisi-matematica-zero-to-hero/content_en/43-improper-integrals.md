---
title: "Improper integrals"
area: Integrals
summary: "Extension of Riemann to unbounded intervals (**1st kind**) and unbounded functions (**2nd kind**) via **limit**. $p$-test, comparison, asymptotic comparison, integral test. Absolute convergence. Euler's $\\Gamma$ function."
order: 43
level: intermediate
prereq:
  - "Riemann integral and FTC (sec. 39-40)"
  - "Limits, series criteria"
tools:
  - "Rudin — *Principles*, ch. 6"
---

# Improper integrals

## Why

The Riemann integral is defined for **bounded functions** on **compact intervals** $[a,b]$. But many natural situations violate one of the two conditions:

- **1st kind:** unbounded interval, $\int_1^\infty f$.
- **2nd kind:** unbounded function near an endpoint, $\int_0^1 1/\sqrt x\,dx$.

In both cases we extend via **limit**.

## Definitions

### 1st kind (unbounded interval)

**Definition.** $f:[a,+\infty)\to\mathbb{R}$ with $f \in \mathcal{R}([a,b])$ for every $b > a$:
$$\int_a^{+\infty} f(x)\,dx := \lim_{b\to+\infty} \int_a^b f(x)\,dx.$$

> **Glossary:**
>
> - **Finite** limit = **convergent** integral.
> - Limit $\pm\infty$ = **divergent**.
> - Doesn't exist = **oscillating**.

### 2nd kind (unbounded function)

**Definition.** $f:[a,b)\to\mathbb{R}$ unbounded near $b$:
$$\int_a^b f(x)\,dx := \lim_{c\to b^-} \int_a^c f(x)\,dx.$$

## $p$-test (reference integrals)

**Theorem ($p$-test on $[1,\infty)$).** $\int_1^{+\infty} \dfrac{dx}{x^\alpha}$ converges $\iff \alpha > 1$.

*Proof.* For $\alpha \ne 1$: $\int_1^b x^{-\alpha}dx = (b^{1-\alpha}-1)/(1-\alpha)$. Finite limit $\iff 1-\alpha < 0 \iff \alpha > 1$. For $\alpha=1$: $\ln b \to \infty$. ∎

**Theorem ($p$-test on $(0,1]$).** $\int_0^1 \dfrac{dx}{x^\alpha}$ converges $\iff \alpha < 1$.

> **Mnemonic.** Near $\infty$: $1/x^\alpha$ converges if $\alpha > 1$ ("decays fast enough"). Near $0$: converges if $\alpha < 1$ ("blows up not too much"). Case $\alpha=1$ ($1/x$) diverges in both directions.

## Convergence criteria (for $f \ge 0$)

**Comparison.** $0 \le f \le g$. $\int g$ converges ⇒ $\int f$ converges.

**Asymptotic comparison.** $f, g > 0$ with $\lim f/g = L \in (0,+\infty)$. Then $\int f$ converges $\iff \int g$ converges.

> **Operational strategy:** find an asymptotic $f(x) \sim C/x^\alpha$ and apply $p$-test.

### Examples

**1.** $\int_1^\infty \frac{dx}{x^2+x+1} \sim 1/x^2$, $\alpha=2>1$: **converges**.

**2.** $\int_1^\infty \frac{x}{\sqrt{x^5+1}}\,dx \sim x \cdot x^{-5/2} = x^{-3/2}$, $\alpha=3/2>1$: **converges**.

## Integral test (connection to series)

**Theorem (Cauchy).** $f:[1,\infty) \to \mathbb{R}$ positive and decreasing. Then
$$\sum_{n=1}^\infty f(n) \text{ converges} \iff \int_1^\infty f(x)\,dx \text{ converges}.$$

*Proof.* $f$ decreasing: $f(n+1) \le \int_n^{n+1} f \le f(n)$. Summing from $n=1$ to $N-1$: sum sandwiched between partials of series with same character. ∎

**Consequence.** $\sum 1/n^\alpha$ converges $\iff \alpha > 1$ (same threshold).

## Absolute convergence

**Definition.** $\int f$ **absolutely convergent** if $\int |f|$ converges.

**Theorem.** Absolute convergence ⇒ convergence.

*Proof.* $f = f^+ - f^-$ with $0 \le f^\pm \le |f|$; by comparison, $\int f^\pm$ converge. ∎

> $\int_1^\infty \sin x/x\,dx$ converges **conditionally** but not absolutely (see Dirichlet).

## Euler's gamma function

**Definition.** For $s > 0$:
$$\Gamma(s) := \int_0^{+\infty} t^{s-1} e^{-t}\,dt.$$

**Proposition.** Converges for every $s > 0$. Near 0: $\sim t^{s-1}$, integrable if $s>0$. Near $\infty$: decays faster than any power.

**Fundamental relation.** $\Gamma(s+1) = s\,\Gamma(s)$.

*Proof.* By parts on $\Gamma(s+1)$: $u=t^s$, $dv=e^{-t}dt$, $v=-e^{-t}$. Boundary terms $=0$ for $s>0$, leaves $s\Gamma(s)$. ∎

**Corollary.** $\Gamma(n+1) = n!$ for $n \in \mathbb{N}$. It's a **continuous extension of factorial**.

## Exercises

<details>
<summary>Exercise 1 — Improper by parts</summary>

$\int_2^\infty \frac{\ln x}{x^2}\,dx$. By parts, $u=\ln x$, $v=-1/x$:
$$= [-\ln x/x]_2^\infty + \int_2^\infty dx/x^2 = \ln 2/2 + 1/2 = (\ln 2 + 1)/2. \qquad ∎$$
</details>

<details>
<summary>Exercise 2 — Double singularity</summary>

$\int_0^1 \frac{dx}{\sqrt{x(1-x)}}$. Asymptotics $\sim 1/\sqrt x$ at 0 and $\sim 1/\sqrt{1-x}$ at 1: converges. Substitution $x = \sin^2\theta$:
$$= \int_0^{\pi/2} 2\,d\theta = \pi. \qquad ∎$$
</details>

<details>
<summary>Exercise 3 — $\Gamma(1/2)$</summary>

$\Gamma(1/2) = \int_0^\infty t^{-1/2}e^{-t}\,dt$. Substitution $t=u^2$: $= 2\int_0^\infty e^{-u^2}du = \sqrt\pi$ (Gaussian integral). ∎
</details>

<details>
<summary>Exercise 4 — Integral test</summary>

Study $\sum_{n=2}^\infty 1/(n\ln n)$. $f(x)=1/(x\ln x)$, positive, decreasing. Substitution $u=\ln x$: $\int_2^b dx/(x\ln x) = \ln\ln b - \ln\ln 2 \to \infty$. **Diverges**. ∎
</details>

## One-line takeaway

**Improper integrals** extend Riemann via limit to unbounded intervals/functions; **$p$-test** ($1/x^\alpha$: $\alpha>1$ near $\infty$, $\alpha<1$ near 0) + asymptotic comparison solve most cases; **integral test** links series and integrals; $\Gamma$ is the continuous factorial.
