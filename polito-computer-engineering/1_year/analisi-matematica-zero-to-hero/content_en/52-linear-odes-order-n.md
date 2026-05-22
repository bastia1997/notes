---
title: "Linear ODEs of order $n$ with constant coefficients"
area: ODEs
summary: "Homogeneous: **characteristic polynomial**, solution structure (distinct real roots, multiple, complex). Complete: **undetermined coefficients**, **variation of parameters**, **resonance**. Wronskian."
order: 52
level: intermediate
prereq:
  - "First-order ODEs (sec. 51)"
  - "Linear dependence, bases"
  - "Complex numbers, Euler"
tools:
  - "Pagani-Salsa — *Analisi 2*"
---

# Linear ODEs of order $n$

## Why

A **linear ODE of order $n$**:
$$L[y] := y^{(n)} + a_{n-1}(x) y^{(n-1)} + \dots + a_0(x) y = b(x).$$

$L$ is a **linear operator**: $L[\alpha y_1 + \beta y_2] = \alpha L[y_1] + \beta L[y_2]$. The whole problem lives in **linear algebra**.

**Superposition principle.** Solutions of $L[y] = b$ form the **affine subspace** $y_{\text{part}} + \ker L$.

Assume $a_i \in \mathbb{R}$ **constant**.

## Solution space

**Theorem.** $\ker L$ has **dimension $n$** over $\mathbb{R}$.

**Wronskian.** For $y_1, \dots, y_n$:
$$W(y_1,\dots,y_n)(x) = \det\begin{pmatrix} y_1 & \cdots & y_n \\ y_1' & \cdots & y_n' \\ \vdots & & \vdots \\ y_1^{(n-1)} & \cdots & y_n^{(n-1)}\end{pmatrix}.$$

> **Glossary:**
>
> - $W(x_0) \ne 0$ for some $x_0$ ⇒ **fundamental system** (basis of $\ker L$).
> - For solutions of $L[y]=0$: $W \equiv 0$ or $W \ne 0$ everywhere (Abel).

## Homogeneous — characteristic polynomial

Seek $y = e^{\lambda x}$:
$$e^{\lambda x}(\lambda^n + a_{n-1}\lambda^{n-1} + \dots + a_0) = 0.$$

**Characteristic polynomial:** $p(\lambda) = \lambda^n + a_{n-1}\lambda^{n-1} + \dots + a_0$.

By F.T. of algebra: $p$ has $n$ roots in $\mathbb{C}$ (with multiplicity).

### Case 1 — Distinct real roots

$\{e^{\lambda_i x}\}$ basis. $y = c_1 e^{\lambda_1 x} + \dots + c_n e^{\lambda_n x}$.

### Case 2 — Multiple real roots

$\lambda_0$ of multiplicity $m$ contributes:
$$e^{\lambda_0 x},\ x e^{\lambda_0 x},\ \dots,\ x^{m-1} e^{\lambda_0 x}.$$

*Proof idea.* Translation rule $P(D)(e^{\lambda x}\varphi) = e^{\lambda x} P(D+\lambda)\varphi$. For $\lambda = \lambda_0$, $\varphi = x^k$, $k<m$: $P(D+\lambda_0) x^k = 0$. ∎

### Case 3 — Complex conjugate roots

If $\lambda = \alpha + i\beta$ ($\beta \ne 0$), also $\bar\lambda$. Combine:
$$e^{\alpha x}\cos(\beta x), \quad e^{\alpha x}\sin(\beta x).$$

Multiplicity $m$: multiply by $1, x, \dots, x^{m-1}$.

### Examples

| Equation | $p(\lambda)$ | Roots | General solution |
|---|---|---|---|
| $y'' + y = 0$ | $\lambda^2+1$ | $\pm i$ | $c_1 \cos x + c_2 \sin x$ |
| $y'' - 3y' + 2y = 0$ | $(\lambda-1)(\lambda-2)$ | $1, 2$ | $c_1 e^x + c_2 e^{2x}$ |
| $y'' - 2y' + y = 0$ | $(\lambda-1)^2$ | $1$ double | $(c_1 + c_2 x)e^x$ |
| $y^{(4)} + 2y'' + y = 0$ | $(\lambda^2+1)^2$ | $\pm i$ double | $(c_1+c_3 x)\cos x + (c_2+c_4 x)\sin x$ |

## Complete equation

Structure: $y_{\text{gen}} = y_{\text{hom}} + y_{\text{part}}$.

### Undetermined coefficients

For $b$ "special" (polynomial × exponential × $\sin/\cos$):

| Forcing $b(x)$ | Ansatz $y_p$ |
|---|---|
| $P_k(x)$ | $Q_k(x)$ |
| $e^{\mu x} P_k(x)$ | $e^{\mu x} Q_k(x)$ |
| $\sin(\omega x), \cos(\omega x)$ | $A\cos\omega x + B\sin\omega x$ |
| $e^{\mu x}(P_k \cos + R_k \sin)$ | $e^{\mu x}(Q_k \cos + S_k \sin)$ |

> **Resonance.** If $\mu$ is root of $p$ of multiplicity $m$, multiply ansatz by $x^m$.

### Example — Forced oscillator

$y'' + \omega_0^2 y = F_0 \cos(\omega x)$.

**Non-resonant** ($\omega \ne \omega_0$): $A = F_0/(\omega_0^2 - \omega^2)$. Amplitude diverges as $\omega \to \omega_0$.

**Resonant** ($\omega = \omega_0$): ansatz $x(A\cos + B\sin)$:
$$y_p = \frac{F_0}{2\omega_0} x \sin(\omega_0 x).$$
**Amplitude grows linearly** — pure resonance.

### Variation of parameters (Lagrange)

For **any** continuous $b$. For $n=2$: basis $\{y_1, y_2\}$, seek $y_p = u_1 y_1 + u_2 y_2$ with $u_1' y_1 + u_2' y_2 = 0$.

By Cramer (det = $W$):
$$u_1' = -\frac{y_2 b}{W}, \quad u_2' = \frac{y_1 b}{W}.$$

### Example — $y'' + y = 1/\cos x$

Basis: $\{\cos x, \sin x\}$, $W = 1$:
$$u_1 = \ln|\cos x|, \quad u_2 = x.$$
$$y_p = \cos x \ln|\cos x| + x \sin x.$$

## Cauchy problem

For order $n$: $n$ initial conditions uniquely fix $c_1, \dots, c_n$.

**Example.** $y'' - y = 0$, $y(0)=1$, $y'(0)=0$: $y = \cosh x$.

## Exercises

<details>
<summary>Exercise 1 — Distinct real roots</summary>

$y'' - 5y' + 6y = 0$. $(\lambda-2)(\lambda-3)$: $y = c_1 e^{2x} + c_2 e^{3x}$. ∎
</details>

<details>
<summary>Exercise 2 — Complex roots</summary>

$y'' + 4y' + 13y = 0$. $\lambda = -2 \pm 3i$: $y = e^{-2x}(c_1\cos 3x + c_2\sin 3x)$. ∎
</details>

<details>
<summary>Exercise 3 — Double resonance</summary>

$y'' - 2y' + y = 6e^x$, $y(0)=y'(0)=0$. Ansatz $Ax^2 e^x$ → $A=3$: $y = 3x^2 e^x$. ∎
</details>

<details>
<summary>Exercise 4 — Damped oscillator</summary>

$y'' + 2y' + 2y = 0$, $y(0)=1, y'(0)=0$: $y = e^{-x}(\cos x + \sin x) \to 0$. ∎
</details>

## One-line takeaway

For linear ODEs with constant coefficients, the **homogeneous** is solved via the **characteristic polynomial** (exponentials, with $x^k$ for multiplicity, $\sin/\cos$ for complex roots); the **complete** via **undetermined coefficients** (special forcings, watch resonance) or **variation of parameters** (always via Wronskian).
