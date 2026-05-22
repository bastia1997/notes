---
title: "Cauchy problem, existence and uniqueness"
area: ODEs
summary: "Cauchy problem = IVP. **Picard-Lindelöf** (Cauchy-Lipschitz) via contraction + iteration. **Peano** (continuity alone). Counterexample $y' = \\sqrt{|y|}$. Extension, **Gronwall**, continuous dependence."
order: 53
level: advanced
prereq:
  - "First-order ODEs (sec. 51)"
  - "Metric spaces, completeness"
  - "Uniform convergence"
tools:
  - "Pagani-Salsa — *Analisi 2*"
---

# Cauchy problem

## Why

Given $\Omega \subseteq \mathbb{R}^2$ open, $f: \Omega \to \mathbb{R}$ continuous, $(x_0, y_0) \in \Omega$, the **Cauchy problem (IVP)**:
$$\begin{cases} \varphi'(x) = f(x, \varphi(x)) \\ \varphi(x_0) = y_0. \end{cases}$$

> **Glossary:**
>
> - **IVP** = initial value problem.
> - $(x_0, y_0)$ = **initial datum**.

Three questions:
1. **Existence** (at least one solution)?
2. **Uniqueness**?
3. **Extension** (how far)?

## Integral reformulation

$\varphi$ solves IVP $\iff$
$$\varphi(x) = y_0 + \int_{x_0}^x f(t, \varphi(t))\,dt.$$

*Proof.* (⇒) Integrate. (⇐) FTC gives $\varphi' = f$, and $\varphi(x_0)=y_0$. ∎

> Moves the problem from $C^1$ to $C^0$: natural domain of **contractions** in Banach.

## Cauchy-Lipschitz (Picard-Lindelöf)

**Definition.** $f$ **locally Lipschitz in $y$**: for every $(x_0,y_0)$ there is a neighborhood $U$ and $L \ge 0$:
$$|f(x,y_1) - f(x,y_2)| \le L |y_1 - y_2| \quad \forall (x,y_i)\in U.$$

> $\partial f/\partial y$ continuous ⇒ locally Lipschitz.

**Theorem.** $f$ continuous on $R = [x_0-a, x_0+a]\times[y_0-b, y_0+b]$, $|f| \le M$, Lipschitz in $y$ with constant $L$. Let $h = \min\{a, b/M\}$. The IVP has **unique** solution $\varphi \in C^1([x_0-h, x_0+h])$.

*Proof (sketch).*

1. **Space:** $X = \{\varphi \in C^0: \varphi(x_0)=y_0, |\varphi-y_0|\le b\}$, complete in $\|\cdot\|_\infty$.

2. **Picard operator:** $(T\varphi)(x) = y_0 + \int_{x_0}^x f(t,\varphi(t))\,dt$. Well-defined: $|T\varphi - y_0| \le Mh \le b$.

3. **Contractive iterate:** $|(T^n\varphi_1 - T^n\varphi_2)(x)| \le \frac{(L|x-x_0|)^n}{n!}\|\varphi_1 - \varphi_2\|_\infty$.

4. **Banach-Caccioppoli:** unique fixed point $\varphi^* = T\varphi^*$ = unique solution. ∎

### Picard iteration

Explicit construction: $\varphi_0(x) \equiv y_0$,
$$\varphi_{n+1}(x) = y_0 + \int_{x_0}^x f(t, \varphi_n(t))\,dt.$$

**Example.** $y' = y$, $y(0)=1$:
- $\varphi_n = \sum_{k=0}^n x^k/k! \to e^x$.

**Free** Taylor expansion of $e^x$.

## Peano theorem

**Theorem.** $f \in C^0(\Omega)$. For every $(x_0,y_0)$ there is $h>0$ and a solution $\varphi \in C^1([x_0-h, x_0+h])$.

> Continuity alone → existence, no uniqueness. Proof via Ascoli-Arzelà.

## Counterexample to uniqueness

$y' = \sqrt{|y|}$, $y(0)=0$. $f(y) = \sqrt{|y|}$ continuous but **not Lipschitz** at 0.

**Solutions:**
- $\varphi \equiv 0$.
- $\varphi(x) = x^2/4$ ($x \ge 0$).
- For every $a \ge 0$: $\varphi_a \equiv 0$ on $[0,a]$, then $(x-a)^2/4$. **Infinitely many**.

> **Moral.** Continuity isn't enough. Lipschitz prevents bifurcation.

## Extension

Local solutions glue into **maximal solution** on open interval $(\alpha, \beta)$.

**Theorem (escape from compacts).** If $\beta < +\infty$, the solution leaves every compact $K \subset \Omega$ as $x \to \beta^-$.

**Example (blow-up).** $y' = y^2$, $y(0)=1$: $y(x) = 1/(1-x)$, maximal on $(-\infty, 1)$.

**Global solutions.** Linear $y' = a(x) y + b(x)$ on continuous $I$: global. Sublinear growth + Gronwall.

## Gronwall lemma

**Lemma (integral form).** $u: [a,b] \to \mathbb{R}$ continuous, $u \ge 0$. If $u(x) \le C + L\int_a^x u(t)\,dt$, then
$$u(x) \le C\,e^{L(x-a)}.$$

*Proof.* $v = C + L\int u$, $v' = Lu \le Lv$, $(ve^{-Lx})' \le 0$. ∎

## Continuous dependence on initial data

**Theorem.** $f$ Lipschitz in $y$. Solutions $\varphi, \psi$ with data $y_0, \tilde y_0$:
$$|\varphi(x) - \psi(x)| \le |y_0 - \tilde y_0|\,e^{L|x-x_0|}.$$

## Exercises

<details>
<summary>Exercise 1 — Picard for $e^{x^2}$</summary>

$y' = 2xy$, $y(0)=1$. $\varphi_n(x) = \sum_{k=0}^n x^{2k}/k! \to e^{x^2}$. ∎
</details>

<details>
<summary>Exercise 2 — Blow-up</summary>

$y' = y^2$, $y(0)=1$: $y = 1/(1-x)$, maximal on $(-\infty, 1)$. ∎
</details>

<details>
<summary>Exercise 3 — When uniqueness</summary>

$y' = y^\alpha$, $y(0)=0$. Uniqueness $\iff \alpha \ge 1$. For $0<\alpha<1$: $y \equiv 0$ and $y = ((1-\alpha)x)^{1/(1-\alpha)}$ both solutions. ∎
</details>

<details>
<summary>Exercise 4 — Gronwall</summary>

$y' = y\sin(xy)$. $|y'| \le |y|$. Gronwall: $|y(x)| \le |y_0|e^x$. **Global existence**. ∎
</details>

## One-line takeaway

The **IVP** is equivalent to the integral equation; **Cauchy-Lipschitz** gives local existence and uniqueness via Picard contraction (Lipschitz in $y$ essential); **Peano** gives only existence with mere continuity; $y'=\sqrt{|y|}$ is the counterexample; maximal solutions "escape compacts"; **Gronwall** is the universal tool for growth estimates and continuous dependence.
