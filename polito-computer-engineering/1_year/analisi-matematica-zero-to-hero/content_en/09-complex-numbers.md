---
title: Complex numbers
area: Complex numbers
summary: "$\\mathbb{C}$ is $\\mathbb{R}$ with a new number $i$ satisfying $i^2 = -1$. What changes, why we need it, and how trigonometry simplifies into algebra through **Euler's formula** $e^{i\\theta} = \\cos\\theta + i \\sin\\theta$."
order: 9
level: intermediate
prereq:
  - "Real numbers (sec. 06)"
  - "Basic trigonometry (sine, cosine)"
tools:
  - "Ahlfors — *Complex Analysis*, ch. 1"
  - "Needham — *Visual Complex Analysis*"
---

# Complex numbers

## Why this matters

In $\mathbb{R}$ the equation
$$x^2 + 1 = 0$$
has no solution: every square is $\ge 0$ (sec. 06), so $x^2 + 1 \ge 1 > 0$ for every real $x$.

Extending from $\mathbb{R}$ to $\mathbb{C}$, we get a magnificent property: **every polynomial of positive degree has a root** (Fundamental Theorem of Algebra). Plus $\mathbb{C}$ is the natural setting for:
- **Harmonic analysis** (Fourier, signals, audio, MP3).
- **Quantum mechanics** (the wavefunction is complex-valued).
- **Plane geometry** (complex multiplication is rotation + scaling).

Worth nailing down.

## The construction: $\mathbb{C} = \mathbb{R}^2$ with a product

**Definition.** $\mathbb{C} := \mathbb{R}^2$ (set of ordered pairs of reals) with these operations:

- **Sum**: $(a, b) + (c, d) := (a + c,\ b + d)$ — componentwise.
- **Product**: $(a, b) \cdot (c, d) := (a c - b d,\ a d + b c)$.

> **Glossary for the product definition:**
>
> - $(a, b)$ and $(c, d)$ are two elements of $\mathbb{C}$, written as pairs of reals.
> - The product rule: first component = "multiply the firsts and subtract the product of the seconds" ($ac - bd$); second component = "cross multiply" ($ad + bc$).
> - Looks weird, but the reason (we'll see) is to make $(0, 1) \cdot (0, 1) = (-1, 0)$, i.e. a number whose square is $-1$.

Zero is $(0, 0)$, one is $(1, 0)$.

### The imaginary unit

**Definition.** $i := (0, 1)$. Compute $i^2$:
$$i \cdot i = (0, 1) \cdot (0, 1) = (0 \cdot 0 - 1 \cdot 1,\ 0 \cdot 1 + 1 \cdot 0) = (-1, 0).$$
Identifying $(-1, 0)$ with the real $-1$, we get **$i^2 = -1$**.

### $\mathbb{R}$ lives inside $\mathbb{C}$

Identify the real $a \in \mathbb{R}$ with the pair $(a, 0) \in \mathbb{C}$. Check:
- Sum: $(a, 0) + (c, 0) = (a + c, 0) \leftrightarrow a + c$. ✓
- Product: $(a, 0) \cdot (c, 0) = (a c, 0) \leftrightarrow a c$. ✓

So $\mathbb{R} \subseteq \mathbb{C}$ is a subset behaving exactly like the "old" $\mathbb{R}$.

### Algebraic form

Every $(a, b) \in \mathbb{C}$ can be written:
$$(a, b) = (a, 0) + (0, b) = (a, 0) + (b, 0) \cdot (0, 1) = a + b \cdot i = a + b i.$$

So we write $z = a + b i$ with
- $a = \operatorname{Re}(z)$ = **real part** of $z$,
- $b = \operatorname{Im}(z)$ = **imaginary part** of $z$ (note: it's a **real** number, the coefficient of $i$).

> **Glossary:**
>
> - $\operatorname{Re}(z)$, $\operatorname{Im}(z)$ = real and imaginary parts. Example: $z = 3 - 7i$, $\operatorname{Re}(z) = 3$, $\operatorname{Im}(z) = -7$ (not $-7i$).
> - $i$ = imaginary unit; satisfies $i^2 = -1$.

### Concrete arithmetic

Rules work like polynomials, remembering $i^2 = -1$:

- **Sum**: $(a + b i) + (c + d i) = (a + c) + (b + d) i$.
- **Product**: $(a + b i)(c + d i) = ac + a d i + b c i + b d i^2 = (a c - b d) + (a d + b c) i$.

(No magic: ordinary distributive, plus $i^2 = -1$.)

## $\mathbb{C}$ is a field

**Theorem.** $(\mathbb{C}, +, \cdot)$ is a **field** (sec. 06).

Associative, commutative, distributive properties are checked with some computation. The only interesting part is **multiplicative inverse**.

Let $z = a + b i$ with $z \ne 0$ (i.e. $(a, b) \ne (0, 0)$, i.e. $a^2 + b^2 > 0$). Define
$$z^{-1} := \frac{a - b i}{a^2 + b^2}.$$

> **Glossary:** numerator-over-denominator means "divided by", i.e. multiply numerator by inverse of denominator (which is a positive real here, so simple).

*Verify.* $z \cdot z^{-1} = \dfrac{(a + bi)(a - bi)}{a^2 + b^2} = \dfrac{a^2 - (bi)^2}{a^2 + b^2} = \dfrac{a^2 + b^2}{a^2 + b^2} = 1$. ✓

> **Practical trick.** To divide $z/w$: multiply numerator and denominator by the **conjugate** of the denominator (defined shortly), so the denominator becomes real.

### $\mathbb{C}$ **isn't** orderable

Unlike $\mathbb{R}$, $\mathbb{C}$ has no $\le$ compatible with the operations.

*Proof.* By contradiction, suppose such an order exists. Then $i > 0$ or $i < 0$ (totality).

- If $i > 0$: $i \cdot i > 0 \cdot i = 0$ (product compatibility). But $i \cdot i = -1 < 0$. Contradiction.
- If $i < 0$: $-i > 0$, and $(-i)(-i) > 0$. But $(-i)(-i) = i^2 = -1 < 0$. Contradiction.

So no compatible order. ∎

> **Consequence.** Never write "$z < w$" for complex numbers. You can compare $|z|$ and $|w|$ (real numbers), yes.

## Conjugate and modulus

**Conjugate.** $\overline{z} := a - b i$. Geometrically: reflection of $z$ across the real axis.

> **Glossary:** the bar over $z$, $\bar z$, is standard notation. Don't confuse with the bar for "average" or other things.

Properties:
- $\overline{z + w} = \bar z + \bar w$, $\overline{z w} = \bar z \cdot \bar w$.
- $\overline{\overline{z}} = z$ (conjugating twice returns to the same number).
- $z + \bar z = 2 \operatorname{Re}(z)$, $z - \bar z = 2 i \operatorname{Im}(z)$.
- $z \cdot \bar z = (a + b i)(a - b i) = a^2 + b^2 \ge 0$, always real.

**Modulus.** $|z| := \sqrt{a^2 + b^2} = \sqrt{z \cdot \bar z}$.

> **Glossary:** $|z|$ is the **length of the vector $(a, b)$** in the plane. Generalizes real absolute value: for $z = a + 0 i$ real, $|z| = \sqrt{a^2} = |a|$.

Properties:
- $|z| \ge 0$, and $|z| = 0 \iff z = 0$.
- $|z w| = |z| \cdot |w|$ (modulus is multiplicative).
- **Triangle inequality**: $|z + w| \le |z| + |w|$.

*Proof of $|zw| = |z||w|$:* $|zw|^2 = (zw) \overline{(zw)} = z w \bar z \bar w = (z \bar z)(w \bar w) = |z|^2 |w|^2$. Square root. ∎

*Proof of triangle inequality:* $|z+w|^2 = (z+w)(\bar z + \bar w) = z \bar z + w \bar w + z \bar w + \bar z w = |z|^2 + |w|^2 + 2 \operatorname{Re}(z \bar w)$.

Since $\operatorname{Re}(\zeta) \le |\zeta|$ for every $\zeta \in \mathbb{C}$, and $|z \bar w| = |z| |w|$:
$$|z + w|^2 \le |z|^2 + |w|^2 + 2 |z| |w| = (|z| + |w|)^2.$$
Square root (both sides $\ge 0$): $|z + w| \le |z| + |w|$. ∎

## Trigonometric and polar form

A complex number $z = a + b i \ne 0$ can also be described in **polar coordinates**:
- $r = |z|$ = distance from origin,
- $\theta = \arg z$ = angle (measured from positive real axis, counterclockwise).

In symbols:
$$z = r (\cos \theta + i \sin \theta).$$

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="300" fill="#111a30"/>
  <line x1="300" y1="20" x2="300" y2="280" stroke="#f3eed9" stroke-width="1"/>
  <line x1="30" y1="150" x2="570" y2="150" stroke="#f3eed9" stroke-width="1"/>
  <text x="580" y="155" fill="#f3eed9" font-family="serif" font-size="13">Re</text>
  <text x="305" y="20" fill="#f3eed9" font-family="serif" font-size="13">Im</text>
  <line x1="300" y1="150" x2="450" y2="60" stroke="#d4af37" stroke-width="2"/>
  <circle cx="450" cy="60" r="4" fill="#d4af37"/>
  <text x="460" y="55" fill="#d4af37" font-family="serif" font-size="14">z = a + bi</text>
  <line x1="450" y1="60" x2="450" y2="150" stroke="#6fb38a" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="450" y1="60" x2="300" y2="60" stroke="#6fb38a" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="450" y="170" fill="#6fb38a" font-family="serif" font-size="13" text-anchor="middle">a</text>
  <text x="285" y="65" fill="#6fb38a" font-family="serif" font-size="13" text-anchor="end">b</text>
  <text x="370" y="100" fill="#d4af37" font-family="serif" font-size="13">r = |z|</text>
  <path d="M 340 150 A 40 40 0 0 0 326 124" fill="none" stroke="#e07a8d" stroke-width="2"/>
  <text x="355" y="135" fill="#e07a8d" font-family="serif" font-size="14">θ</text>
</svg>
<div class="chart-caption">The Argand–Gauss plane: $z = a + b i = r(\cos\theta + i \sin\theta)$ with $r = |z|$ and $\theta = \arg z$.</div>
</div>

> **Glossary:**
>
> - $r$ = $|z|$ = modulus = **length** of the segment from origin to $z$.
> - $\theta$ = $\arg z$ = **angle** (radians) between positive real axis and the segment from $0$ to $z$.
> - The argument is defined **modulo $2\pi$**: adding $2\pi$ doesn't change $z$.
> - **Principal argument**: pick $\theta \in (-\pi, \pi]$ as canonical representative, denoted $\operatorname{Arg}(z)$.

### Multiplication in polar form: the key idea

Let $z_1 = r_1 (\cos\theta_1 + i \sin\theta_1)$ and $z_2 = r_2 (\cos\theta_2 + i \sin\theta_2)$. Compute the product using trig addition formulas:
$$z_1 z_2 = r_1 r_2 \left[(\cos\theta_1\cos\theta_2 - \sin\theta_1\sin\theta_2) + i(\cos\theta_1\sin\theta_2 + \sin\theta_1\cos\theta_2)\right]$$
$$= r_1 r_2 \big(\cos(\theta_1 + \theta_2) + i \sin(\theta_1 + \theta_2)\big).$$

**Bright result.** Multiplying two complex numbers = multiplying moduli + adding arguments.

> **Translation.** Multiplying by a unit-modulus complex $z$ = **rotating** by $\arg z$ in the plane. Multiplying by $z$ with $|z| = r$ = rotating by $\arg z$ + scaling by $r$.

### De Moivre's formula

By induction on $n$ (ch. 03):
$$z^n = r^n \big(\cos(n \theta) + i \sin(n \theta)\big), \qquad n \in \mathbb{Z}.$$

I.e. raising to the $n$-th power = raising modulus to $n$ + multiplying angle by $n$.

## Euler's formula

**Theorem (Euler).**
$$e^{i \theta} = \cos\theta + i \sin\theta.$$

One of the most beautiful formulas in mathematics. Brief explanation.

**Derivation (informal, via series).** Convergent series define $e^z, \cos z, \sin z$ even for complex arguments:
$$e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!}, \quad \cos z = \sum_{n=0}^{\infty} \frac{(-1)^n z^{2 n}}{(2 n)!}, \quad \sin z = \sum_{n=0}^{\infty} \frac{(-1)^n z^{2 n + 1}}{(2 n + 1)!}.$$

Substitute $z = i \theta$ in $e^z$:
$$e^{i \theta} = \sum_{n=0}^{\infty} \frac{(i \theta)^n}{n!} = \sum_{n=0}^{\infty} \frac{i^n \theta^n}{n!}.$$

Powers of $i$ are cyclic with period 4: $i^0 = 1$, $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$, …

Separate even powers ($n = 2 k$, $i^{2 k} = (-1)^k$) from odd ($n = 2 k + 1$, $i^{2 k + 1} = (-1)^k i$):
$$e^{i \theta} = \underbrace{\sum_k \frac{(-1)^k \theta^{2 k}}{(2 k)!}}_{= \cos\theta} + i \underbrace{\sum_k \frac{(-1)^k \theta^{2 k + 1}}{(2 k + 1)!}}_{= \sin\theta} = \cos\theta + i \sin\theta. \quad \blacksquare$$

### Exponential form

For $z \ne 0$, write
$$z = r \, e^{i \theta}.$$

**Multiplication:** $z_1 z_2 = r_1 r_2 \, e^{i (\theta_1 + \theta_2)}$. Exponential rules "work" as in the reals.

### Euler's identity (case $\theta = \pi$)

$$e^{i \pi} + 1 = 0.$$

One formula with **five fundamental constants** of mathematics: $e$, $i$, $\pi$, $1$, $0$. Universally considered "the most beautiful formula in mathematics".

## $n$-th roots

**Problem.** Given $w \in \mathbb{C}$ nonzero, find all $z \in \mathbb{C}$ with $z^n = w$.

In $\mathbb{R}$ this problem has at most 1 or 2 solutions. In $\mathbb{C}$ it has **always exactly $n$**.

Write $w = R \, e^{i \varphi}$ and $z = r \, e^{i \theta}$. Then $z^n = r^n e^{i n \theta}$. The equation $z^n = w$ requires:

- $r^n = R$, i.e. $r = R^{1/n}$ (real $n$-th root of $R > 0$, unique).
- $n \theta = \varphi + 2 k \pi$ for some integer $k$, i.e. $\theta = \dfrac{\varphi + 2 k \pi}{n}$.

Varying $k = 0, 1, 2, \dots, n - 1$ gives **$n$ distinct arguments** mod $2\pi$. For $k = n$ they repeat.

So the $n$-th roots of $w$ are:
$$z_k = R^{1/n} \, e^{i (\varphi + 2 k \pi) / n}, \qquad k = 0, 1, \dots, n - 1.$$

Geometrically: **vertices of a regular $n$-gon** centered at origin, radius $R^{1/n}$.

### Example: cube roots of $-8$

$w = -8 = 8 \, e^{i \pi}$ ($R = 8$, $\varphi = \pi$). Cube roots are $z_k = 8^{1/3} e^{i (\pi + 2 k \pi)/3} = 2 e^{i (\pi + 2 k \pi)/3}$ for $k = 0, 1, 2$:

- $z_0 = 2 e^{i \pi/3} = 2 (\cos(\pi/3) + i \sin(\pi/3)) = 2 \left(\frac 1 2 + i \frac{\sqrt 3}{2}\right) = 1 + i \sqrt 3$.
- $z_1 = 2 e^{i \pi} = -2$.
- $z_2 = 2 e^{i 5 \pi / 3} = 1 - i \sqrt 3$.

Check $z_0$: $(1 + i\sqrt 3)^2 = 1 - 3 + 2 i \sqrt 3 = -2 + 2 i \sqrt 3$. Then $(1 + i\sqrt 3)^3 = (-2 + 2 i \sqrt 3)(1 + i\sqrt 3) = -2 - 2 i \sqrt 3 + 2 i \sqrt 3 + 2 i^2 \cdot 3 = -2 - 6 = -8$. ✓

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="300" fill="#111a30"/>
  <line x1="300" y1="20" x2="300" y2="280" stroke="#f3eed9" stroke-width="1"/>
  <line x1="30" y1="150" x2="570" y2="150" stroke="#f3eed9" stroke-width="1"/>
  <circle cx="300" cy="150" r="100" fill="none" stroke="#6fb38a" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="300" y1="150" x2="350" y2="63" stroke="#d4af37" stroke-width="2"/>
  <circle cx="350" cy="63" r="4" fill="#d4af37"/>
  <text x="360" y="55" fill="#d4af37" font-family="serif" font-size="13">z₀ = 1+i√3</text>
  <line x1="300" y1="150" x2="200" y2="150" stroke="#d4af37" stroke-width="2"/>
  <circle cx="200" cy="150" r="4" fill="#d4af37"/>
  <text x="170" y="170" fill="#d4af37" font-family="serif" font-size="13">z₁ = −2</text>
  <line x1="300" y1="150" x2="350" y2="237" stroke="#d4af37" stroke-width="2"/>
  <circle cx="350" cy="237" r="4" fill="#d4af37"/>
  <text x="360" y="245" fill="#d4af37" font-family="serif" font-size="13">z₂ = 1−i√3</text>
  <polygon points="350,63 200,150 350,237" fill="#d4af37" fill-opacity="0.1" stroke="#d4af37" stroke-width="1"/>
  <text x="100" y="40" fill="#f3eed9" font-family="serif" font-size="14">Cube roots of −8</text>
  <text x="100" y="60" fill="#f3eed9" font-family="serif" font-size="12">vertices of an equilateral triangle</text>
  <text x="100" y="75" fill="#f3eed9" font-family="serif" font-size="12">on the circle of radius 2</text>
</svg>
<div class="chart-caption">The three cube roots of $-8$ form an equilateral triangle inscribed in the circle of radius 2.</div>
</div>

### $n$-th roots of unity

Special case $w = 1$: $1 = e^{i \cdot 0}$, so
$$\omega_k = e^{2 \pi i k / n}, \qquad k = 0, 1, \dots, n - 1.$$

> **Glossary.** $\omega$ ("omega") is the Greek letter conventionally used for roots of unity.

For $n = 4$: $\omega_0 = 1$, $\omega_1 = i$, $\omega_2 = -1$, $\omega_3 = -i$. Vertices of a square.

**Property.** The sum of all $n$-th roots of unity (for $n \ge 2$) is zero:
$$\sum_{k=0}^{n - 1} \omega_k = 0.$$
(Geometric series.)

## Fundamental theorem of algebra

**Theorem (FTA).** Every non-constant polynomial with complex coefficients
$$p(z) = a_n z^n + a_{n-1} z^{n-1} + \dots + a_1 z + a_0, \quad a_n \ne 0,\ n \ge 1,$$
has (at least) a root in $\mathbb{C}$.

**Corollary.** Every polynomial of degree $n$ has **exactly $n$ roots** in $\mathbb{C}$ (counted with multiplicity).

> **Meaning.** By adding *just one* new number ($i$, with $i^2 = -1$) we've "solved" every polynomial equation of any degree. Nothing's free: it could have gone badly, but instead it works magnificently.

*Idea of proof (sketch — full proof needs complex analysis).*

1. For $|z|$ large, $|p(z)| \approx |a_n| |z|^n \to +\infty$. So $|p|$ has a minimum on a large disk $D_R$.
2. By continuity, the min is attained at some $z_0 \in D_R$.
3. If $p(z_0) \ne 0$, you can show (expanding $p$ around $z_0$) that you find $z_1$ near $z_0$ with $|p(z_1)| < |p(z_0)|$, contradicting minimality.
4. So $p(z_0) = 0$. ∎

**Alternative proofs**: via Liouville's theorem (if $p$ has no zeros, $1/p$ is entire and bounded, hence constant), via topological degree, etc.

## Examples and quick computations

**1.** $(1 + i)(1 - i) = 1 - i^2 = 1 - (-1) = 2$.

**2.** $|1 + i| = \sqrt{1 + 1} = \sqrt 2$. $\arg(1 + i) = \pi/4$ (first quadrant, 45° angle). So $1 + i = \sqrt 2 \, e^{i \pi/4}$.

**3.** $(1 + i)^8 = (\sqrt 2)^8 \, e^{i \cdot 8 \cdot \pi/4} = 16 \cdot e^{i 2 \pi} = 16$.

**4.** Solve $z^2 = i$. $i = e^{i \pi/2}$. Roots: $z_0 = e^{i \pi/4} = \frac{\sqrt 2}{2}(1 + i)$ and $z_1 = e^{i 5\pi/4} = -\frac{\sqrt 2}{2}(1 + i)$.

**5.** Euler formulas for sin and cos: inverting $e^{i \theta} = \cos\theta + i \sin\theta$ and $e^{-i\theta} = \cos\theta - i \sin\theta$:
$$\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}, \qquad \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2 i}.$$

(Extendable to $\theta \in \mathbb{C}$. Very useful in computational trigonometry.)

## Exercises

<details>
<summary>Exercise 1 — Polar computation</summary>

Write $z = -\sqrt 3 + i$ in exponential form and compute $z^{10}$.

**Solution.** $|z| = \sqrt{3 + 1} = 2$. For the argument: $z$ is in the second quadrant ($\operatorname{Re} = -\sqrt 3 < 0$, $\operatorname{Im} = 1 > 0$). $\tan(\arg z) = 1 / (-\sqrt 3) = -1/\sqrt 3$, and in the second quadrant $\arg z = \pi - \pi/6 = 5\pi/6$. So
$$z = 2 \, e^{i 5\pi/6}.$$
$z^{10} = 2^{10} e^{i \cdot 10 \cdot 5\pi/6} = 1024 \, e^{i \cdot 25\pi/3} = 1024 \, e^{i \pi/3} = 1024 \cdot \left(\frac 1 2 + i \frac{\sqrt 3}{2}\right) = 512 + 512 i \sqrt 3$.
</details>

<details>
<summary>Exercise 2 — Fifth roots of 1</summary>

Find all roots of $z^5 = 1$.

**Solution.** $\omega_k = e^{2\pi i k / 5}$ for $k = 0, 1, 2, 3, 4$:

- $\omega_0 = 1$.
- $\omega_1 = \cos(72°) + i \sin(72°) \approx 0.309 + 0.951 i$.
- $\omega_2 \approx -0.809 + 0.588 i$.
- $\omega_3 = \overline{\omega_2}$.
- $\omega_4 = \overline{\omega_1}$.

Regular pentagon inscribed in the unit circle. Sum: 0.
</details>

<details>
<summary>Exercise 3 — Complex quadratic</summary>

Solve $z^2 + (1 - i) z + (2 - i) = 0$.

**Solution.** Discriminant: $\Delta = (1 - i)^2 - 4(2 - i) = -2i - 8 + 4i = -8 + 2i$.

Find square root $w = \sqrt{-8 + 2i}$: let $w = x + y i$. Then $w^2 = (x^2 - y^2) + 2 x y i = -8 + 2 i$. System: $x^2 - y^2 = -8$, $x y = 1$. So $y = 1/x$, $x^2 - 1/x^2 = -8$, $x^4 + 8 x^2 - 1 = 0$, $x^2 = -4 + \sqrt{17}$. Then $x \approx \pm 0.350$, $y \approx \pm 2.857$.

Solutions: $z = \dfrac{-(1 - i) \pm w}{2}$.
</details>

<details>
<summary>Exercise 4 — Addition formulas via Euler</summary>

Use $e^{i (\theta_1 + \theta_2)} = e^{i \theta_1} \cdot e^{i \theta_2}$ to derive sin and cos addition formulas.

**Solution.**

Right: $e^{i \theta_1} \cdot e^{i \theta_2} = (\cos\theta_1 + i \sin\theta_1)(\cos\theta_2 + i \sin\theta_2) = (\cos\theta_1 \cos\theta_2 - \sin\theta_1 \sin\theta_2) + i (\sin\theta_1 \cos\theta_2 + \cos\theta_1 \sin\theta_2)$.

Left: $e^{i (\theta_1 + \theta_2)} = \cos(\theta_1 + \theta_2) + i \sin(\theta_1 + \theta_2)$.

Identifying real and imaginary parts:
$$\cos(\theta_1 + \theta_2) = \cos\theta_1 \cos\theta_2 - \sin\theta_1 \sin\theta_2,$$
$$\sin(\theta_1 + \theta_2) = \sin\theta_1 \cos\theta_2 + \cos\theta_1 \sin\theta_2.$$
The usual formulas in two lines.
</details>

<details>
<summary>Exercise 5 — FTA explicit</summary>

Find all roots of $p(z) = z^4 - 1$.

**Solution.** $z^4 = 1$, so $z$ is a fourth root of unity: $z \in \{1, i, -1, -i\}$.

Factorization: $z^4 - 1 = (z^2 - 1)(z^2 + 1) = (z - 1)(z + 1)(z - i)(z + i)$.

FTA check: 4 roots (= degree), all distinct. ✓
</details>

## Common pitfalls

- **"$\sqrt{-1} = i$" is a convention, not a theorem.** $i^2 = -1$ but also $(-i)^2 = -1$. The "square root" in $\mathbb{C}$ is multi-valued: a **branch** choice is needed. In elementary algebra the choice is $i$.
- **$\mathbb{C}$ ISN'T orderable.** Never write "$z_1 < z_2$" for complexes (unless both are real). Comparing $|z_1|$ and $|z_2|$ is fine.
- **Argument modulo $2\pi$.** The argument is defined up to multiples of $2\pi$. When you say "the argument" you mean a choice (e.g. $\operatorname{Arg}(z) \in (-\pi, \pi]$). Summing two arguments may leave the interval — reduce.
- **Confusing $\bar z$ with $|z|$.** $\bar z$ is a complex number (reflection of $z$); $|z|$ is a nonnegative real. Relation: $z \bar z = |z|^2$.
- **"$e^{i\theta}$ is just notation."** **No**: it's truly the exponential function via series, evaluated at an imaginary argument. The series converges for $z \in \mathbb{C}$, and Euler's formula is a theorem.

> **Operating pill.** When something looks "ugly" in $\mathbb{R}$ — oscillations, complicated trig, integrals with $\sin/\cos$ — **switch to $\mathbb{C}$ via Euler**: turn trig into algebra. Most "computational tricks" in analysis are this.

## One-line takeaway

$\mathbb{C} = \mathbb{R}^2$ with a special product making $i = (0, 1)$ a square root of $-1$ — it's a (non-orderable) field where *every* polynomial has roots, and Euler's formula $e^{i\theta} = \cos\theta + i \sin\theta$ turns trigonometry into exponential algebra.
