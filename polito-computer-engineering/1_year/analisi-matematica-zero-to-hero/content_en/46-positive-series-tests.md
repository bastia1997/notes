---
title: "Convergence tests for positive series"
area: Series
summary: "For $a_n \\ge 0$, convergence $\\iff$ partial sums bounded. Catalog of tests: **comparison**, **asymptotic comparison**, **ratio** (D'Alembert), **root** (Cauchy), **condensation**, **integral**."
order: 46
level: intermediate
prereq:
  - "Numerical series (sec. 45)"
  - "Improper integrals (sec. 43, for integral test)"
tools:
  - "Rudin — *Principles*, ch. 3"
---

# Convergence tests for positive series

## Why

For $a_n \ge 0$, $S_n$ is **monotone non-decreasing**. By the monotone sequences theorem, always has limit in $[0, +\infty]$.

> **Fundamental principle.** For series with $\ge 0$ terms: convergent $\iff$ partial sums **bounded**. Otherwise diverges to $+\infty$ (never oscillates).

Study reduces to **upper bounds**. Hence the battery of tests.

## Direct comparison

**Theorem.** $0 \le a_n \le b_n$ eventually. Then:
1. $\sum b_n$ converges ⇒ $\sum a_n$ converges.
2. $\sum a_n$ diverges ⇒ $\sum b_n$ diverges.

*Proof.* $A_n \le B_n$ monotone non-decreasing; boundedness transfers. ∎

**Examples.**
- $\sum 1/(n^2+n) \le \sum 1/n^2$: converges.
- $\sum 1/\ln n \ge \sum 1/n$ ($\ln n \le n$): diverges.

## Asymptotic comparison

**Theorem.** $a_n, b_n > 0$ eventually, $\lim a_n/b_n = \ell$.
- $\ell \in (0, +\infty)$: same character.
- $\ell = 0$ and $\sum b_n$ converges ⇒ $\sum a_n$ converges.
- $\ell = +\infty$ and $\sum b_n$ diverges ⇒ $\sum a_n$ diverges.

*Proof.* $\ell/2 \cdot b_n \le a_n \le 3\ell/2 \cdot b_n$ eventually; comparison. ∎

**Examples.**
- $\sum \sin(1/n) \sim \sum 1/n$: diverges.
- $\sum (1-\cos(1/n)) \sim \sum 1/(2n^2)$: converges.
- $\sum (n+1)/(n^3-2) \sim 1/n^2$: converges.

## Ratio test (D'Alembert)

**Theorem.** $a_n > 0$, $\lim a_{n+1}/a_n = L$.
- $L < 1$: **converges**.
- $L > 1$: **diverges** ($a_n \to \infty$).
- $L = 1$: **inconclusive**.

*Proof.* $L < 1$: choose $q$ with $L<q<1$; iterating $a_n \le C q^n$, comparison with geometric. $L>1$: $a_n \ge Cq^n \to \infty$. $L=1$: examples $1/n$ (diverges) vs $1/n^2$ (converges). ∎

**Examples.**
- $\sum n!/n^n$: ratio $= (n/(n+1))^n \to 1/e < 1$. Converges.
- $\sum 2^n/n!$: ratio $= 2/(n+1) \to 0$. Converges.

## Root test (Cauchy)

**Theorem.** $a_n \ge 0$, $\lim \sqrt[n]{a_n} = L$ (or $\limsup$).
- $L < 1$: converges. $L > 1$: diverges. $L = 1$: inconclusive.

*Proof.* $L<1$: $a_n \le q^n$ eventually. $L>1$: subseq. with $a_{n_k} \ge 1$. ∎

**Examples.**
- $\sum (1-1/n)^{n^2}$: $\sqrt[n]{a_n} = (1-1/n)^n \to 1/e$. Converges.
- $\sum (n/(2n+1))^n$: $\to 1/2$. Converges.

### Ratio vs root

**Lemma.** If $\lim a_{n+1}/a_n = L$ exists, then $\lim \sqrt[n]{a_n} = L$ too. So **root $\supseteq$ ratio**.

## Condensation test (Cauchy)

**Theorem.** $a_n \ge 0$ **decreasing**. Then
$$\sum_{n=1}^\infty a_n \text{ converges} \iff \sum_{k=0}^\infty 2^k a_{2^k} \text{ converges}.$$

> **Glossary:**
>
> - $a_{2^k}$ = term indexed by powers of 2.
> - Idea: blocks $[2^k, 2^{k+1})$ have $2^k$ terms, each $\sim a_{2^k}$.

*Proof (sketch).* Grouping: $S_{2^{m+1}-1} \le T_m$ (upper) and $S_{2^{m+1}} \ge (T_{m+1}-a_1)/2$. ∎

**Application 1 (generalized harmonic).** $a_n = 1/n^\alpha$: $2^k a_{2^k} = (2^{1-\alpha})^k$, geometric. **Converges $\iff \alpha > 1$**.

**Application 2 (Bertrand).** $\sum 1/(n(\ln n)^\beta)$: condensing, $\sum 1/(k^\beta (\ln 2)^\beta)$. **Converges $\iff \beta > 1$**.

## Integral test (Cauchy-Maclaurin)

**Theorem.** $f: [1,\infty) \to [0,\infty)$ continuous, decreasing. Then
$$\sum_{n=1}^\infty f(n) \text{ converges} \iff \int_1^\infty f(x)\,dx \text{ converges}.$$

*Proof.* $f$ decreasing: $f(k+1) \le \int_k^{k+1} f \le f(k)$. Summing: simultaneous double bound. ∎

**Example.** $\sum 1/(n \ln n)$: $\int dx/(x\ln x) = \ln\ln x \to \infty$. **Diverges**.

## Diagnostic table

| Form of $a_n$ | Recommended test |
|---|---|
| Polynomials and powers: $1/n^\alpha$, $1/(n^2+1)$ | asymptotic comparison with $1/n^\alpha$ |
| Exponentials, factorials: $q^n$, $n^k/n!$ | ratio |
| $n$-th power: $(f(n))^n$ | root |
| Logs in denominator | condensation or integral |
| $\sin(1/n), \ln(1+1/n)$ | asymptotic comparison (Taylor) |

## Practical strategy

1. **Check $a_n \to 0$**. If not, diverges.
2. **Recognize the family**: polynomial? exponential-factorial? logarithmic?
3. **Asymptotic** for polynomial.
4. **Ratio/root** for factorials/exponentials.
5. **Condensation/integral** for logarithms.

## Exercises

<details>
<summary>Exercise 1 — Rationalization</summary>

$\sum \frac{\sqrt{n+1}-\sqrt n}{n}$. Rationalize: $\sqrt{n+1}-\sqrt n = 1/(\sqrt{n+1}+\sqrt n) \sim 1/(2\sqrt n)$. $a_n \sim 1/(2n^{3/2})$, $\alpha=3/2 > 1$: **converges**. ∎
</details>

<details>
<summary>Exercise 2 — Ratio on factorials</summary>

$\sum \frac{(n!)^2}{(2n)!}$. Ratio $= \frac{(n+1)^2}{(2n+1)(2n+2)} \to 1/4 < 1$: **converges**. ∎
</details>

<details>
<summary>Exercise 3 — Root indispensable</summary>

$\sum \left(\frac{n}{n+1}\right)^{n^2}$. Root: $(n/(n+1))^n \to 1/e < 1$: **converges**. ∎
</details>

<details>
<summary>Exercise 4 — Stirling</summary>

$\sum \frac{n^n}{n! \cdot e^n}$. Stirling: $n! \sim n^n e^{-n}\sqrt{2\pi n}$, so $a_n \sim 1/\sqrt{2\pi n}$. $\alpha=1/2$: **diverges**. ∎
</details>

## One-line takeaway

For positive series, convergence $=$ partial sums bounded; **comparison/asymptotic** for polynomial, **ratio/root** for factorials/exponentials, **condensation/integral** for logs — generalized harmonic $\sum 1/n^\alpha$ converges iff $\alpha>1$, Bertrand $\sum 1/(n\ln^\beta n)$ iff $\beta>1$.
