---
title: "Partial derivatives and differential in several variables"
area: R^n
summary: "**Partial derivatives**, **gradient** $\\nabla f$, directional derivative. **Differentiability** (linear approximation exists). Total differential theorem, chain, **Schwarz**, **Hessian**, free max/min."
order: 55
level: advanced
prereq:
  - "Topology of $\\mathbb{R}^n$ (sec. 54)"
  - "1D differential calculus (sec. 30-35)"
tools:
  - "Rudin — *Principles*, ch. 9"
---

# Partial derivatives and differential

## Why

Extend differential calculus to $f: \mathbb{R}^n \to \mathbb{R}$. **Partials, gradient, differential, Hessian** are the tools. Surprise: in several variables, "differentiable" ≠ "having partials".

## Partial derivatives

**Definition.** $f : A \to \mathbb{R}$, $A$ open, $x_0 \in A$:
$$\frac{\partial f}{\partial x_i}(x_0) := \lim_{h\to 0} \frac{f(x_0 + h e_i) - f(x_0)}{h}.$$

> **Glossary:**
>
> - $e_i$ = $i$-th canonical basis vector.
> - **Operational:** freeze all variables except $x_i$, differentiate as 1D.

**Example.** $f = x^2 yz + \sin(yz)$: $\partial_x = 2xyz$, $\partial_y = x^2 z + z\cos(yz)$, $\partial_z = x^2 y + y\cos(yz)$.

### Gradient

$$\nabla f(x_0) := (\partial_1 f(x_0), \dots, \partial_n f(x_0)).$$

### Directional derivative

$$D_v f(x_0) := \lim_{t\to 0}\frac{f(x_0 + tv) - f(x_0)}{t}.$$

> For "regular" functions: $D_v f = \nabla f \cdot v$. **Not always** with just partials!

## Differentiability

**Definition.** $f$ **differentiable** at $x_0$ if linear $L: \mathbb{R}^n \to \mathbb{R}$ exists with
$$f(x_0 + h) = f(x_0) + L(h) + o(\|h\|).$$

$L = df(x_0)$ is the **differential**.

**Theorem.** If $f$ differentiable at $x_0$:
1. $f$ continuous at $x_0$.
2. All partials exist and $L(h) = \nabla f(x_0) \cdot h$.
3. $D_v f(x_0) = \nabla f(x_0) \cdot v$ for every $v$.

*Proof (2).* With $h = te_i$: $\partial_i f(x_0) = L(e_i)$. Linearity. ∎

## Partials ≠ differentiability

**Example.** $f(x,y) = xy/(x^2+y^2)$ with $f(0,0)=0$. Partials at 0 exist (both zero), but $f$ **not continuous** at 0. So **not differentiable**.

> **Moral.** "Differentiable in all directions" is **strictly weaker** than "differentiable". Don't confuse them.

## Total differential theorem

**Theorem.** If partials $\partial_i f$ exist near $x_0$ and are **continuous** at $x_0$, then $f$ is differentiable at $x_0$.

*Proof (for $n=2$).* Split $f(x_0+h) - f(x_0)$ into two steps, apply Lagrange 1D:
$$= \partial_1 f(\xi_1, \cdot)h_1 + \partial_2 f(\cdot, \xi_2)h_2.$$
Continuity gives $\partial_i f \to \partial_i f(x_0)$. ∎

> $f \in C^1(A)$ (continuous partials) ⇒ differentiable everywhere.

## Tangent plane

For $f: \mathbb{R}^2 \to \mathbb{R}$ differentiable at $(x_0, y_0)$:
$$z = f(x_0, y_0) + \partial_x f(x_0,y_0)(x-x_0) + \partial_y f(x_0, y_0)(y-y_0).$$

## Chain rule

**Theorem.** $g: I \to \mathbb{R}^n$ differentiable, $f$ differentiable at $g(t_0)$. Then $F = f \circ g$:
$$F'(t_0) = \nabla f(g(t_0)) \cdot g'(t_0).$$

**Matrix version.**
$$J_{f\circ g}(u_0) = J_f(g(u_0)) \cdot J_g(u_0).$$

## Schwarz theorem

**Theorem.** If $\partial^2_{ij} f$ and $\partial^2_{ji} f$ exist and are continuous at $x_0$, they coincide.

> $f \in C^2$ ⇒ symmetric Hessian.

**Peano counterexample.** $f(x,y) = xy(x^2-y^2)/(x^2+y^2)$ with $f(0,0)=0$: $\partial^2_{xy} f(0,0) = 1$, $\partial^2_{yx} f(0,0) = -1$.

## Hessian and Taylor

$$H_f(x_0) = (\partial^2_{ij} f(x_0))_{ij}.$$

Symmetric $n\times n$.

**Second-order Taylor.**
$$f(x_0+h) = f(x_0) + \nabla f(x_0)\cdot h + \frac{1}{2} h^\top H_f(x_0) h + o(\|h\|^2).$$

## Free max/min

**Fermat.** $f$ differentiable, $x_0$ local extremum ⇒ $\nabla f(x_0) = 0$ (**critical point**).

**Second derivative test.** $x_0$ critical, $H = H_f(x_0)$:
- $H$ **positive definite**: **minimum**.
- $H$ **negative definite**: **maximum**.
- **Mixed sign** eigenvalues: **saddle**.
- Semidefinite: inconclusive.

### $n=2$ test

$H = \begin{pmatrix} A & B \\ B & C\end{pmatrix}$, $\det H = AC - B^2$:

| $\det H$ | $A$ | Result |
|---|---|---|
| $>0$ | $>0$ | minimum |
| $>0$ | $<0$ | maximum |
| $<0$ | — | saddle |
| $=0$ | — | inconclusive |

### Example

$f = x^2 + 2y^2 - 2xy - 4x$. $\nabla f = 0$ → $(4, 2)$. $H = \begin{pmatrix} 2 & -2 \\ -2 & 4\end{pmatrix}$, $\det = 4 > 0$, $A=2>0$: **minimum**.

## Exercises

<details>
<summary>Exercise 1 — Gradient</summary>

$f = e^{xy}\sin z$. $\nabla f = e^{xy}(y\sin z, x\sin z, \cos z)$. ∎
</details>

<details>
<summary>Exercise 2 — Partials yes, diff no</summary>

$f(x,y) = \sqrt{|xy|}$. Partials at 0 = 0. Along $y=x$: $f(x,x) = |x|$, ratio doesn't go to 0. **Not differentiable**. ∎
</details>

<details>
<summary>Exercise 3 — Classify critical points</summary>

$f = x^3 + y^3 - 3xy$. $\nabla = 0$ → $(0,0)$ saddle, $(1,1)$ minimum. ∎
</details>

<details>
<summary>Exercise 4 — Differential approximation</summary>

$f = xe^y$, $\nabla f(1,0) = (1,1)$. $f(1.1, 0.05) \approx 1.15$ (exact $\approx 1.156$). ∎
</details>

<details>
<summary>Exercise 5 — Polar (chain)</summary>

$x = r\cos\theta$, $y = r\sin\theta$:
$$\partial_r z = f_x \cos\theta + f_y \sin\theta, \quad \partial_\theta z = r(-f_x \sin\theta + f_y \cos\theta). \qquad ∎$$
</details>

## One-line takeaway

In $\mathbb{R}^n$ **partials** ≠ **differentiability**: linear approximation $f(x_0+h) = f(x_0)+\nabla f\cdot h+o(\|h\|)$ needed; sufficient condition: **continuous partials** ($C^1$); **Schwarz** gives symmetric Hessian in $C^2$; free max/min via $\nabla f=0$ and Hessian eigenvalue signs.
