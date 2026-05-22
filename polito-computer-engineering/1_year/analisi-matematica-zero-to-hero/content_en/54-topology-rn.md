---
title: "Topology of $\\mathbb{R}^n$"
area: R^n
summary: "Euclidean norm, **Cauchy-Schwarz**, triangle. Open, closed, boundary, accumulation. **Heine-Borel** (compact = closed + bounded). Path-connectedness. Sequences and completeness."
order: 54
level: intermediate
prereq:
  - "Topology of $\\mathbb{R}$ (sec. 10)"
  - "Sequences and completeness (sec. 11-16)"
tools:
  - "Rudin — *Principles*, ch. 2"
---

# Topology of $\mathbb{R}^n$

## Why

$\mathbb{R}^n = \{(x_1,\dots,x_n) : x_i \in \mathbb{R}\}$ is an $n$-dimensional vector space. We add **norm**, **distance**, **topology** to extend 1D analysis to multivariable.

## Inner product and norm

**Definition.**
$$\langle x, y\rangle = \sum_{i=1}^n x_i y_i, \quad \|x\| = \sqrt{\langle x, x\rangle}.$$

> **Glossary:**
>
> - $\langle x, y\rangle$ = **inner product** (bilinear, symmetric, positive definite).
> - $\|x\|$ = **Euclidean norm**.
> - $d(x,y) = \|x-y\|$ = distance.

### Cauchy-Schwarz

**Theorem.** $|\langle x, y\rangle| \le \|x\|\cdot \|y\|$, equality iff $x, y$ lin. dependent.

*Proof.* For $y \ne 0$, $\|x-ty\|^2 \ge 0$: quadratic in $t$, discriminant $\le 0$:
$$\langle x,y\rangle^2 \le \|x\|^2\|y\|^2. \qquad ∎$$

### Triangle

**Theorem.** $\|x+y\| \le \|x\| + \|y\|$.

*Proof.* $\|x+y\|^2 \le (\|x\|+\|y\|)^2$ by Cauchy-Schwarz. ∎

Reverse triangle: $|\,\|x\| - \|y\|\,| \le \|x-y\|$.

### Equivalent norms

On $\mathbb{R}^n$ **all norms are equivalent**:

| Norm | Definition |
|---|---|
| $\|x\|_\infty$ | $\max_i |x_i|$ |
| $\|x\|_1$ | $\sum_i |x_i|$ |
| $\|x\|_2$ | $\sqrt{\sum x_i^2}$ |

$\|x\|_\infty \le \|x\|_2 \le \|x\|_1 \le n\|x\|_\infty$. Topological notions (open, convergence) are **identical**. Not so in infinite dimension.

## Neighborhoods, open, closed

**Open ball:** $B(x_0, r) = \{x : \|x-x_0\| < r\}$. **Closed:** $\overline B(x_0, r)$.

**Definitions.** Let $A \subseteq \mathbb{R}^n$.
- **Interior point:** $\exists r > 0$ with $B(x,r) \subset A$.
- **Open:** $A = \text{int}(A)$.
- **Accumulation point:** $\forall r$, $(B(x,r)\setminus\{x\}) \cap A \ne \emptyset$.
- **Closure:** $\overline A = A \cup A'$.
- **Closed:** $A = \overline A$, equivalent: $A^c$ open.
- **Boundary:** $\partial A = \overline A \cap \overline{A^c}$.
- **Bounded:** $A \subset B(0, M)$.

### Properties

1. Arbitrary union of open = open; **finite** intersection = open.
2. Arbitrary intersection of closed = closed; **finite** union = closed.
3. $A$ closed $\iff$ contains all sequence limits.

## Sequences in $\mathbb{R}^n$

**Convergence.** $x^{(k)} \to x$ if $\|x^{(k)} - x\| \to 0$.

**Theorem (componentwise).** $x^{(k)} \to x \iff x^{(k)}_i \to x_i$ for every $i$.

*Proof.* $|x^{(k)}_i - x_i| \le \|x^{(k)} - x\| \le \sqrt n \max_i |x^{(k)}_i - x_i|$. ∎

**Theorem (completeness).** $\mathbb{R}^n$ is complete.

## Compactness — Heine-Borel

**Definition (covering).** $K$ **compact** if every open cover admits a finite subcover.

**Definition (sequential).** Every sequence in $K$ has a subsequence converging to a point of $K$.

> In metric spaces (and $\mathbb{R}^n$) the two are **equivalent**.

**Theorem (Heine-Borel).** In $\mathbb{R}^n$:
$$K \text{ compact} \iff K \text{ closed and bounded}.$$

*Proof (⇐).* Bolzano-Weierstrass on each component + diagonal method. ∎

**Consequences** (as in $\mathbb{R}$):
- **Weierstrass:** continuous on compact has max/min.
- **Heine-Cantor:** continuous on compact is uniformly continuous.

## Connectedness

**Disconnected:** open $U, V$ with $A \subset U \cup V$, $A \cap U \ne \emptyset \ne A \cap V$, $A \cap U \cap V = \emptyset$.

**Path-connected:** $\forall x, y \in A$, $\exists \gamma: [0,1] \to A$ continuous with $\gamma(0) = x, \gamma(1) = y$.

**Theorem.** Path-connected ⇒ connected. **For open sets** in $\mathbb{R}^n$ also conversely.

**Convex:** $\forall x,y, \forall t \in [0,1]$: $(1-t)x + ty \in A$. Convex ⇒ path-connected.

**Examples.**
- Balls: connected (convex).
- $\mathbb{R}^n \setminus \{0\}$: connected for $n \ge 2$, disconnected for $n=1$.

## Continuous multivariable functions

**Definition.** $f: A \to \mathbb{R}^m$ continuous at $x_0$:
$$\forall \varepsilon > 0\ \exists \delta > 0: \|x-x_0\|<\delta \Rightarrow \|f(x)-f(x_0)\|<\varepsilon.$$

**Characterizations:**
- **Sequential:** $x^{(k)} \to x_0 \Rightarrow f(x^{(k)}) \to f(x_0)$.
- **Topological:** $f^{-1}(\text{open})$ is open.
- **Componentwise:** $f = (f_1, \dots, f_m)$ continuous $\iff$ each $f_i$ continuous.

### Examples and traps

**(a)** $f(x,y) = x^2 + y$: continuous.

**(b)** Classic trap:
$$f(x,y) = \frac{xy}{x^2+y^2} \text{ if } (x,y) \ne 0, \quad f(0,0)=0.$$
Along $y = mx$: $f = m/(1+m^2)$, depends on $m$ → **limit doesn't exist**. Continuity "along lines" doesn't suffice!

**(c)** $f(x,y) = x^2 y/(x^4+y^2)$. Along $y = mx$: $\to 0$. Along $y = x^2$: $\to 1/2$. **Not continuous**.

> **Lesson.** For multivariate continuity, **all paths** must be checked, not just lines.

## Exercises

<details>
<summary>Exercise 1 — Norm comparison</summary>

$\|x\|_1 \le \sqrt n \|x\|_2$. Cauchy-Schwarz on $u = (|x_i|)$ and $v = (1,\dots,1)$. ∎
</details>

<details>
<summary>Exercise 2 — Set topology</summary>

$A = \{x^2+y^2 < 1\} \cup \{(2,0)\}$. $\text{int} A = \{x^2+y^2<1\}$, $\overline A = \{x^2+y^2 \le 1\}\cup\{(2,0)\}$, $\partial A = \{x^2+y^2=1\}\cup\{(2,0)\}$. ∎
</details>

<details>
<summary>Exercise 3 — Closed not compact</summary>

$S = \{(x,y): xy = 1\}$. Closed, not bounded: not compact. ∎
</details>

<details>
<summary>Exercise 4 — Continuity at 0</summary>

$f = (x^2+y^2)\log(x^2+y^2)$. $r^2 \log r^2 = 2r^2\log r \to 0$. **Continuous**. ∎
</details>

## One-line takeaway

$\mathbb{R}^n$ is complete with Euclidean norm ($\langle\cdot,\cdot\rangle$ + Cauchy-Schwarz + triangle); open/closed/boundary defined via balls; **Heine-Borel** says **compact = closed and bounded** (cornerstone), **convergence = componentwise**, **continuity along lines isn't enough** (classic trap $xy/(x^2+y^2)$).
