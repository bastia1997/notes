---
title: "Integral functions and geometric applications"
area: Integrals
summary: "Study of $F(x) = \\int_a^x f(t)\\,dt$ as a function (monotonicity, concavity, extrema). **Geometric applications:** area between curves, volumes (disks, shells, Pappus-Guldinus), arc length, surface of revolution."
order: 44
level: intermediate
prereq:
  - "FTC and integration techniques (sec. 40-41)"
  - "Continuous functions, chain rule"
tools:
  - "Apostol — *Calculus*, vol. I, ch. 2"
---

# Integral functions and geometric applications

## Why

Given $f \in \mathcal{R}([a,b])$, the **integral function**
$$F(x) = \int_a^x f(t)\,dt$$
proved crucial in FTC. Now we study it **as a function**: often $F$ doesn't have an elementary expression, but we can say a lot **without computing it**.

## Fundamental properties (for $f \in C([a,b])$)

By FTC-I, $F \in C^1$ with $F' = f$ and $F(a) = 0$.

**Consequences:**
- **Monotonicity:** $F$ increases where $f > 0$, decreases where $f < 0$.
- **Local extrema:** $F$ has extrema where $f$ changes sign.
- **Concavity:** $F'' = f'$. $F$ convex where $f$ increasing.
- **Inflections:** where $f$ has local extrema.
- **Lipschitz:** with constant $\|f\|_\infty$.

### Variable endpoints: Leibniz's rule

$$\frac{d}{dx}\int_{u(x)}^{v(x)} f(t)\,dt = f(v(x))\,v'(x) - f(u(x))\,u'(x).$$

> **Glossary:**
>
> - $u(x), v(x)$ = endpoints (differentiable in $x$).
> - $f$ continuous.
> - **Idea:** write $\Phi = G(v(x)) - G(u(x))$ with $G$ antiderivative of $f$, apply chain rule.

## Area between two curves

If $g \le f$ on $[a,b]$:
$$\text{Area} = \int_a^b [f(x) - g(x)]\,dx.$$

**Example (circle area).** $x^2+y^2 \le r^2$: $-\sqrt{r^2-x^2} \le y \le \sqrt{r^2-x^2}$:
$$A = 2\int_{-r}^r \sqrt{r^2-x^2}\,dx \stackrel{x=r\sin\theta}{=} \pi r^2.$$

## Volumes of solids of revolution

### Disk method (rotation around $x$-axis)

For $f \ge 0$ on $[a,b]$, the solid obtained rotating the subgraph:
$$V = \pi \int_a^b f(x)^2\,dx.$$

> **Idea:** section at $x$ = disk of radius $f(x)$, area $\pi f(x)^2$ (Cavalieri).

**Example (sphere).** $f(x) = \sqrt{r^2-x^2}$ on $[-r,r]$:
$$V = \pi \int_{-r}^r (r^2 - x^2)\,dx = \frac{4}{3}\pi r^3.$$

**Example (cone).** $f(x) = Rx/h$ on $[0,h]$:
$$V = \pi \int_0^h \frac{R^2 x^2}{h^2}\,dx = \frac{1}{3}\pi R^2 h.$$

### Cylindrical shell method (rotation around $y$-axis)

For $a \ge 0$:
$$V = 2\pi \int_a^b x\,f(x)\,dx.$$

> **Idea:** element $dx$ at distance $x$ contributes a shell of height $f(x)$, circumference $2\pi x$.

### Pappus-Guldinus (1st theorem)

Region $\Omega$ of area $A$ with centroid $(x_G, y_G)$, rotated about $y$-axis:
$$V = 2\pi\,x_G\,A.$$

**Example (torus).** Circle radius $r$ centered at $(R,0)$, rotated about $y$-axis ($R>r$):
$$V = 2\pi R \cdot \pi r^2 = 2\pi^2 R r^2.$$

## Arc length

For $\gamma : [a,b] \to \mathbb{R}^2$, $\gamma(t) = (x(t), y(t))$, $C^1$:
$$L = \int_a^b \sqrt{x'(t)^2 + y'(t)^2}\,dt = \int_a^b \|\gamma'(t)\|\,dt.$$

**Graph case $y = f(x)$:**
$$L = \int_a^b \sqrt{1 + f'(x)^2}\,dx.$$

**Example (circumference).** $\gamma(t) = (r\cos t, r\sin t)$, $t \in [0,2\pi]$, $\|\gamma'\| = r$:
$$L = 2\pi r.$$

## Surface of revolution

Rotating $y = f(x) \ge 0$ about $x$-axis:
$$S = 2\pi \int_a^b f(x)\sqrt{1+f'(x)^2}\,dx.$$

**Pappus (2nd theorem).** Curve of length $L$, centroid $x_G$:
$$S = 2\pi\,x_G\,L.$$

**Example (sphere surface).** $f = \sqrt{r^2-x^2}$, $1+f'^2 = r^2/(r^2-x^2)$, $f\sqrt{1+f'^2} = r$:
$$S = 2\pi \int_{-r}^r r\,dx = 4\pi r^2.$$

> Archimedes' "miracle": $S$(sphere) = lateral surface of circumscribed cylinder.

## Exercises

<details>
<summary>Exercise 1 — Integral function study</summary>

$F(x) = \int_0^x \sin(t^2)\,dt$ (Fresnel). $F'(x) = \sin(x^2)$, zeros at $x = \sqrt{k\pi}$. $F$ odd (direct computation), oscillates. Not expressible with elementary functions. ∎
</details>

<details>
<summary>Exercise 2 — Area between sine and cosine</summary>

Area between $\sin x$ and $\cos x$ on $[\pi/4, 5\pi/4]$. $\sin \ge \cos$:
$$\int_{\pi/4}^{5\pi/4}(\sin x - \cos x)\,dx = 2\sqrt 2. \qquad ∎$$
</details>

<details>
<summary>Exercise 3 — Disk volume</summary>

$y = \sqrt x$, $x \in [0,4]$, rotates about $x$-axis:
$$V = \pi \int_0^4 x\,dx = 8\pi. \qquad ∎$$
</details>

<details>
<summary>Exercise 4 — Catenary length</summary>

$f = \cosh x$ on $[0,a]$: $1+f'^2 = \cosh^2 x$, $\sqrt{1+f'^2} = \cosh x$:
$$L = \int_0^a \cosh x\,dx = \sinh a. \qquad ∎$$
</details>

<details>
<summary>Exercise 5 — Torus via Pappus</summary>

Circle radius 1 at $(3,0)$, about $y$-axis. Volume: $V = 2\pi \cdot 3 \cdot \pi = 6\pi^2$. Surface: $S = 2\pi \cdot 3 \cdot 2\pi = 12\pi^2$. ∎
</details>

## One-line takeaway

$F(x)=\int_a^x f$ is studiable as a function ($F'=f$, monotonicity/concavity from $f, f'$); geometric applications are all **sums of infinitesimal contributions**: area $\int(f-g)$, volume $\pi\int f^2$ (disks) or $2\pi\int xf$ (shells), length $\int\sqrt{1+f'^2}$, surface $2\pi\int f\sqrt{1+f'^2}$; Pappus-Guldinus elegantly link centroid and rotational measures.
