---
title: "Beyond Riemann: Lebesgue, Banach, Hilbert"
area: Advanced
summary: "Limits of Riemann and Dirichlet's function. **Lebesgue** (measures the codomain). $L^p$ spaces and **Banach**. **Hilbert** spaces, orthogonality, orthonormal bases, **Parseval**, **Riesz**. Why it matters."
order: 56
level: advanced
prereq:
  - "Riemann integration (sec. 39-43)"
  - "Topology in $\\mathbb{R}^n$ (sec. 54)"
tools:
  - "Rudin — *Real and Complex Analysis*"
  - "Brezis — *Functional Analysis*"
---

# Beyond Riemann: Lebesgue, Banach, Hilbert

## Why

Panorama: why Riemann **isn't enough**, what **Lebesgue** offers, the two functional-analytic edifices (**Banach**, **Hilbert**). No complete proofs: definitions, statements, deep reasons.

## Riemann's limits

**Defect 1 — "Reasonable" functions not integrable.**

Dirichlet's function:
$$D(x) = \begin{cases} 1 & x \in \mathbb{Q} \\ 0 & x \notin \mathbb{Q}.\end{cases}$$
On any subinterval $\sup D = 1, \inf D = 0$: Riemann sums don't converge. **Not Riemann-integrable**. Yet rationals are "negligible" → integral should be 0.

**Defect 2 — Fragile limit-integral exchange.**

$f_n \to f$ pointwise, $f_n$ R-integrable: $f$ may not be, or $\int f_n \not\to \int f$. Requires uniform convergence (often unavailable).

**Defect 3 — $\mathcal{R}([0,1])$ not complete.**

Cauchy sequences in $L^1$ norm without limit in $\mathcal{R}$. Disastrous for functional analysis.

> **Diagnosis.** Riemann partitions the **domain** ($x$). For pathological $f$, partition the **codomain** ($y$) instead.

## Lebesgue's idea (1902)

Inversion: for $f \ge 0$,
1. Partition the **codomain**: $y_k = k\delta$.
2. Measure $m(\{x: y_k \le f(x) < y_{k+1}\})$.
3. Sum $y_k \cdot m(\cdot)$ and let $\delta \to 0$.

> **Key step:** define the **measure** of an arbitrary set.

## Lebesgue measure (glimpse)

**Outer measure.** $m^*(E) := \inf\{\sum (b_k - a_k) : E \subseteq \bigcup (a_k, b_k)\}$.

> **Glossary:**
>
> - $m^*([a,b]) = b-a$.
> - **Countable** sets have measure zero ($m^*(\mathbb Q) = 0$).
> - $m^*$ subadditive but not additive on all subsets.

**Carathéodory.** $E$ **measurable** if $m^*(A) = m^*(A\cap E) + m^*(A\setminus E)$ for every $A$.

The family $\mathcal{M}$ of measurable sets is a $\sigma$-algebra. On $\mathcal{M}$, $m$ is **$\sigma$-additive**:
$$m\Bigl(\bigsqcup_k E_k\Bigr) = \sum_k m(E_k).$$

## Lebesgue integral

**Step 1 — Simple:** $\varphi = \sum \alpha_k \mathbf{1}_{E_k}$, $\int \varphi := \sum \alpha_k m(E_k)$.

**Step 2 — Positive:** $\int f = \sup\{\int \varphi : 0 \le \varphi \le f, \varphi \text{ simple}\}$.

**Step 3 — Any sign:** $f = f^+ - f^-$, $\int f = \int f^+ - \int f^-$ (if both finite, $f \in L^1$).

**Dirichlet.** $D = \mathbf{1}_{\mathbb{Q}\cap[0,1]}$: $m(\mathbb{Q}\cap[0,1]) = 0$, $\int D = 0$. ∎

## Convergence theorems

**Monotone (Beppo Levi).** $0 \le f_n \nearrow f$ a.e. ⇒ $\int f_n \nearrow \int f$.

**Fatou's lemma.** $f_n \ge 0$: $\int \liminf f_n \le \liminf \int f_n$.

**Dominated (Lebesgue).** $f_n \to f$ a.e., $|f_n| \le g \in L^1$ ⇒ $\int f_n \to \int f$.

> **Importance.** Bread of QM, PDEs, probability. Without Lebesgue, no $L^2$ Fourier series, no rigorous QM.

## Banach spaces

**Definition.** Normed vector space that is **complete**.

**Examples.**
- $(\mathbb{R}^n, \|\cdot\|_2)$.
- $(C^0([a,b]), \|\cdot\|_\infty)$.
- $(L^p, \|\cdot\|_p)$ with $\|f\|_p = (\int |f|^p)^{1/p}$, $1 \le p < \infty$.
- $L^\infty$: ess-sup.
- $\ell^p$: $p$-summable sequences.

**Hölder.** $1/p + 1/q = 1$: $\int |fg| \le \|f\|_p \|g\|_q$.

**Minkowski.** $\|f+g\|_p \le \|f\|_p + \|g\|_p$.

**Theorem (Riesz-Fischer).** $L^p$ is **complete**.

> Without Lebesgue, $L^p$ wouldn't be complete: functional analysis collapses.

## Hilbert spaces

**Definition.** Banach with **inner product** sesquilinear, hermitian, positive definite, $\|x\| = \sqrt{\langle x,x\rangle}$.

**Canonical examples:**
- $\mathbb{R}^n, \mathbb{C}^n$.
- $\ell^2$: $\langle x,y\rangle = \sum \overline{x_k} y_k$.
- $L^2(\Omega)$: $\langle f,g\rangle = \int \overline f g\,dm$.

> All infinite-dim separable Hilbert spaces are **isomorphic to $\ell^2$**.

### Projection

**Theorem.** $C \subset H$ convex closed nonempty. For every $x$ there is unique $p \in C$ minimizing $\|x-y\|$: $P_C(x)$.

For $C$ closed subspace: $P_C$ linear, $x - P_C(x) \perp C$.

### Orthonormal bases

$\{e_n\}$ **orthonormal**: $\langle e_i, e_j\rangle = \delta_{ij}$. **Orthonormal basis** (complete): span dense.

**Fourier coefficients:** $\hat x_n = \langle e_n, x\rangle$, $x = \sum \hat x_n e_n$.

**Bessel:** $\sum |\hat x_n|^2 \le \|x\|^2$.

**Parseval (complete basis):** $\sum |\hat x_n|^2 = \|x\|^2$.

### Riesz theorem

**Theorem.** $H$ Hilbert, $\ell: H \to \mathbb{C}$ linear continuous. Unique $y \in H$:
$$\ell(x) = \langle y, x\rangle, \quad \|\ell\| = \|y\|.$$

> **Hilbert dual ≅ Hilbert.** Basis of QM, variational PDEs, distributions.

## Why it matters

- **QM.** States = unit vectors in Hilbert. Observables = self-adjoint operators.
- **Variational PDEs.** Sobolev spaces $H^1, H^2$ (Hilbert) + Riesz/Lax-Milgram → existence/uniqueness.
- **Probability.** Random variables = measurable functions. Expectation = Lebesgue integral.
- **Signal processing.** Fourier $L^2 \to L^2$ is Hilbert isomorphism (Plancherel).
- **Machine learning.** Kernel methods → RKHS (Hilbert with reproducing kernel).

## Conceptual exercises

<details>
<summary>Exercise 1 — Measure of $\mathbb Q$</summary>

$\mathbb Q \cap [0,1]$ countable $\{q_k\}$. Cover with $(q_k - \varepsilon/2^{k+1}, q_k + \varepsilon/2^{k+1})$: total length $= \varepsilon$. So $m^* = 0$. ∎
</details>

<details>
<summary>Exercise 2 — Hölder $p=q=2$</summary>

$\int |fg| \le \|f\|_2 \|g\|_2$ (integral Cauchy-Schwarz). ∎
</details>

<details>
<summary>Exercise 3 — Bessel</summary>

$\|x - \sum \hat x_n e_n\|^2 = \|x\|^2 - \sum |\hat x_n|^2 \ge 0$. ∎
</details>

<details>
<summary>Exercise 4 — Explicit Riesz</summary>

$\ell(f) = \int_0^1 fx\,dx$ in $L^2([0,1])$. $\ell(f) = \langle g, f\rangle$ with $g(x) = x$. $\|\ell\| = 1/\sqrt 3$. ∎
</details>

## One-line takeaway

Riemann partitions the domain (fragile); **Lebesgue** measures the codomain via $\sigma$-algebra and $\sigma$-additivity, freely swaps limit and integral (Beppo Levi, Fatou, dominated); **$L^p$** are complete Banach, **$L^2$** is Hilbert with orthonormal bases, Parseval and Riesz — universal language of QM, PDEs, probability.
