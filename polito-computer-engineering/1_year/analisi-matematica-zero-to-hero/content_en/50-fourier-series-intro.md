---
title: "Fourier series: introduction"
area: Series
summary: "Decomposing **periodic** functions into harmonics $\\{1, \\cos nx, \\sin nx\\}$. Coefficients, convergence (Dirichlet, $L^2$), **Parseval**, **Gibbs** phenomenon. The gateway to harmonic analysis."
order: 50
level: advanced
prereq:
  - "Numerical series and integrals (sec. 45-49)"
  - "Trigonometric, complex exponential"
tools:
  - "Stein-Shakarchi — *Fourier Analysis*"
---

# Fourier series

## Why

In sec. 48-49 we decomposed analytic functions into **powers** $\{1, x, x^2, \dots\}$. For **periodic** functions this basis is wrong: $x^n$ isn't periodic. We need a basis of periodic functions.

In 1822 **Fourier**, studying heat propagation, intuited that every periodic function can be written as a sum (potentially infinite) of **sines and cosines**. Today it's the pillar of harmonic analysis, PDEs, signal processing, quantum mechanics, JPEG, MP3.

## Trigonometric polynomials

**Definition.** A **trigonometric polynomial** of degree $N$:
$$P(x) = \frac{a_0}{2} + \sum_{n=1}^N \big( a_n \cos(nx) + b_n \sin(nx) \big).$$

Complex form:
$$P(x) = \sum_{n=-N}^N c_n e^{inx}, \quad c_n = (a_n - ib_n)/2.$$

> **Glossary:**
>
> - $a_n, b_n \in \mathbb{R}$ = real coefficients.
> - $c_n \in \mathbb{C}$ = complex coefficients.
> - **Normalization** $a_0/2$: pure convention to unify formulas.

## Orthogonality

**Lemma (real form).** For $n, m \ge 1$:
$$\int_{-\pi}^\pi \cos(nx)\cos(mx)\,dx = \pi\delta_{nm}, \quad \int \sin(nx)\sin(mx) = \pi\delta_{nm},$$
$$\int \cos(nx)\sin(mx) = 0, \quad \int 1\,dx = 2\pi.$$

**Lemma (complex).** $\int_{-\pi}^\pi e^{inx}\overline{e^{imx}}\,dx = 2\pi\delta_{nm}$.

> The system $\{1, \cos nx, \sin nx\}$ is **orthogonal**. Equivalently $\{e^{inx}\}$ is orthogonal with norm $\sqrt{2\pi}$.

## Fourier coefficients

**Definition.** For $f$ $2\pi$-periodic integrable:
$$a_n = \frac{1}{\pi}\int_{-\pi}^\pi f(x)\cos(nx)\,dx, \quad b_n = \frac{1}{\pi}\int f(x)\sin(nx)\,dx.$$

**Complex form:**
$$c_n = \frac{1}{2\pi}\int_{-\pi}^\pi f(x)\,e^{-inx}\,dx.$$

**Fourier series:**
$$S_f(x) := \frac{a_0}{2} + \sum_{n=1}^\infty [a_n \cos(nx) + b_n \sin(nx)] = \sum_{n=-\infty}^{\infty} c_n e^{inx}.$$

## Parity

- $f$ **even**: $b_n = 0$ (cosines only).
- $f$ **odd**: $a_n = 0$ (sines only).
- Zero mean: $a_0 = 0$.

## Cardinal examples

### Square wave (odd)

$f(x) = \text{sgn}(x)$ on $(-\pi,\pi)$. Odd:
$$b_n = \frac{2(1-(-1)^n)}{n\pi} = \begin{cases} 4/(n\pi) & n \text{ odd} \\ 0 & n \text{ even} \end{cases}$$
$$S_f(x) = \frac{4}{\pi}\sum_{k=0}^\infty \frac{\sin((2k+1)x)}{2k+1}.$$

**At $x = \pi/2$:** $\pi/4 = 1 - 1/3 + 1/5 - \dots$ (Leibniz).

### Sawtooth (odd)

$f(x) = x$ on $(-\pi, \pi)$. $b_n = 2(-1)^{n+1}/n$.

### Triangle wave (even)

$f(x) = |x|$. $a_0 = \pi$, $a_n = -4/(\pi n^2)$ for odd $n$.

> **Heuristic.** The smoother $f$, the faster coefficients decay: jumps → $1/n$, $C^0$ with corners → $1/n^2$, $C^k$ periodic → $1/n^{k+1}$.

## Pointwise convergence (Dirichlet, 1829)

**Definition.** $f$ **piecewise smooth** if a finite partition exists where $f, f'$ continuous with finite lateral limits.

**Theorem (Dirichlet).** $f$ $2\pi$-periodic, piecewise smooth. Then for every $x$:
$$\lim_{N\to\infty} S_N f(x) = \frac{f(x^+) + f(x^-)}{2}.$$

At continuity points: $S_N f(x) \to f(x)$.

> **Sketch.** $S_N f(x) = \frac{1}{2\pi}\int f(t) D_N(x-t)\,dt$ with **Dirichlet kernel** $D_N(u) = \sin((N+1/2)u)/\sin(u/2)$; Riemann-Lebesgue lemma.

**Warning.** Continuous functions exist whose Fourier series **diverges** at some point (Du Bois-Reymond, 1873). Continuity alone is not enough.

## Convergence in $L^2$

**Space.** $L^2(-\pi,\pi)$: square-integrable functions, $\langle f,g\rangle = \int f\bar g$, norm $\|f\|_2$.

**Theorem.** $\{e^{inx}/\sqrt{2\pi}\}_{n\in\mathbb{Z}}$ is an **orthonormal basis** of $L^2$. For every $f \in L^2$:
$$\|S_N f - f\|_2 \to 0.$$

> $S_N f$ is the orthogonal projection of $f$ on the finite subspace, hence the **best approximation** in $L^2$ norm.

## Parseval's identity

**Theorem.** For $f \in L^2(-\pi,\pi)$:
$$\sum_{n=-\infty}^\infty |c_n|^2 = \frac{1}{2\pi}\int_{-\pi}^\pi |f(x)|^2\,dx.$$

Real form:
$$\frac{a_0^2}{4} + \frac{1}{2}\sum_{n=1}^\infty (a_n^2 + b_n^2) = \frac{1}{2\pi}\int |f|^2.$$

### Numerical jewels

**From sawtooth.** $\|f\|^2 = 2\pi^3/3$, $b_n^2 = 4/n^2$:
$$\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6} \quad \text{(Basel problem!)}.$$

**From triangle.** $\sum 1/(2k+1)^4 = \pi^4/96$, hence $\sum 1/n^4 = \pi^4/90$.

## Gibbs phenomenon

Even with $S_N f \to f$ everywhere, near a jump $S_N f$ **doesn't approach monotonically**: it oscillates with a **persistent ~9% overshoot** of the jump height, which doesn't disappear as $N$ grows.

Gibbs constant:
$$G = \frac{1}{\pi}\int_0^\pi \frac{\sin t}{t}\,dt - \frac{1}{2} \approx 0.0895.$$

> **Practical.** Truncated $S_N f$ aren't ideal for signals with discontinuities: use **windows** (Fejér, Hann) or **wavelets**.

## Applications

### Heat equation

$u_t = u_{xx}$, $u(0,t) = u(\pi,t) = 0$, $u(x,0) = f(x)$. Separation: $u_n = \sin(nx)e^{-n^2 t}$, solution
$$u(x,t) = \sum b_n e^{-n^2 t}\sin(nx).$$

High frequencies decay first: **heat smooths**.

### JPEG/MP3 compression

JPEG: $8\times 8$ blocks → DCT → quantization of high frequencies (eye insensitive). MP3: spectral analysis + psychoacoustic masking. **Without Fourier, no Spotify**.

## Exercises

<details>
<summary>Exercise 1 — Basel</summary>

From Parseval on $f(x)=x$ (sawtooth): $\|f\|^2 = 2\pi^3/3$, $b_n^2 = 4/n^2$:
$$\frac{1}{2}\sum 4/n^2 = \pi^2/3 \Rightarrow \sum 1/n^2 = \pi^2/6. \qquad ∎$$
</details>

<details>
<summary>Exercise 2 — $\pi/8$ from square wave</summary>

Parseval on square wave: $\|f\|^2 = 2\pi$, $b_n^2 = 16/(n\pi)^2$ ($n$ odd):
$$\sum 1/(2k+1)^2 = \pi^2/8. \qquad ∎$$
</details>

<details>
<summary>Exercise 3 — Term-by-term differentiation</summary>

$f$ continuous $2\pi$-periodic $C^1$ piecewise with $f(-\pi)=f(\pi)$: coefficients of $f'$ are $\hat c_n = in c_n$.

*Proof.* By parts, boundary zero (periodicity). Consequence: $f \in C^k$ → $|c_n| = O(1/n^k)$. ∎
</details>

<details>
<summary>Exercise 4 — Explicit heat equation</summary>

$u_t = u_{xx}$ on $(0,\pi)$, $u=0$ at boundary, $u(x,0) = \sin x + 3\sin(4x)$:
$$u(x,t) = e^{-t}\sin x + 3 e^{-16 t}\sin(4x).$$
Mode 4 decays 16 times faster. ∎
</details>

## One-line takeaway

**Fourier series** decompose $2\pi$-periodic functions in the orthogonal basis $\{e^{inx}\}$; **Dirichlet** gives pointwise convergence to $(f^+ + f^-)/2$ for piecewise smooth, **$L^2$** is the natural framework (Pythagoras ⇒ **Parseval** $\sum|c_n|^2 = \|f\|^2/(2\pi)$), **Gibbs** is the ~9% overshoot at jumps — basis of PDEs, signal processing, JPEG/MP3.
