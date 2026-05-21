---
title: "High-school math you actually need"
area: "Mathematics"
summary: "Functions, exponentials, logarithms, summations, the intuition of derivatives. Everything required BEFORE linear algebra and calculus — nothing assumed, nothing skipped."
order: 2.5
level: "beginner"
prereq:
  - "addition and multiplication"
tools:
  - "paper + pencil"
---

# High-school math you actually need

## Why this section exists

Every data science course assumes you remember high-school math. You probably don't (or never really understood it). This section **fills the gap** in 30 minutes — nothing trivial, nothing assumed.

If you're comfortable with exponentials, logarithms, and the idea of a derivative, skip it. If even one of those three words gives you anxiety, read on.

## 1. Functions: little machines that transform

A **function** is a "machine": it takes an input and returns an output, always the same for the same input.

$$f(x) = 2x + 3$$

Give $x = 5$, get $f(5) = 13$. Give $x = 0$, get $f(0) = 3$. The "3" is the **intercept** (where the line crosses the y-axis), the "2" is the **slope** (how much it grows per unit of x).

### Functions you'll meet on the path

<div class="chart"><svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,10)">
  <text x="60" y="10" fill="#7aa2ff" font-size="11" text-anchor="middle">linear: y = 2x+1</text>
  <line x1="10" y1="180" x2="120" y2="180" stroke="#555"/>
  <line x1="10" y1="20" x2="10" y2="180" stroke="#555"/>
  <line x1="10" y1="160" x2="120" y2="40" stroke="#7aa2ff" stroke-width="2"/>
</g>
<g transform="translate(160,10)">
  <text x="60" y="10" fill="#ffb347" font-size="11" text-anchor="middle">quadratic: y = x²</text>
  <line x1="10" y1="180" x2="120" y2="180" stroke="#555"/>
  <line x1="10" y1="20" x2="10" y2="180" stroke="#555"/>
  <path d="M 10 30 Q 65 250 120 30" fill="none" stroke="#ffb347" stroke-width="2"/>
</g>
<g transform="translate(300,10)">
  <text x="60" y="10" fill="#c084fc" font-size="11" text-anchor="middle">exponential: y = eˣ</text>
  <line x1="10" y1="180" x2="120" y2="180" stroke="#555"/>
  <line x1="10" y1="20" x2="10" y2="180" stroke="#555"/>
  <path d="M 10 175 Q 70 170 90 130 Q 110 60 120 20" fill="none" stroke="#c084fc" stroke-width="2"/>
</g>
<g transform="translate(440,10)">
  <text x="60" y="10" fill="#5ee2c4" font-size="11" text-anchor="middle">logarithmic: y = ln(x)</text>
  <line x1="10" y1="180" x2="120" y2="180" stroke="#555"/>
  <line x1="10" y1="20" x2="10" y2="180" stroke="#555"/>
  <path d="M 12 250 Q 30 110 60 90 Q 90 75 120 65" fill="none" stroke="#5ee2c4" stroke-width="2"/>
</g>
</svg><div class="chart-caption">The 4 functions you see most often in data science. Learn to recognize them at a glance.</div></div>

| Function | Form | Grows like | You meet it in |
|---|---|---|---|
| Linear | $y = ax + b$ | proportionally | linear regression |
| Quadratic | $y = ax^2 + bx + c$ | parabola | MSE loss, optimization |
| Exponential | $y = e^x$ | explosive | viral growth, exp, softmax |
| Logarithmic | $y = \ln x$ | flattens out | log-likelihood, entropy |
| Sigmoid | $y = 1/(1+e^{-x})$ | "S" between 0 and 1 | logistic regression, NN |

## 2. Powers and exponentials

### Rules to memorize

$$a^m \cdot a^n = a^{m+n}$$
$$\frac{a^m}{a^n} = a^{m-n}$$
$$(a^m)^n = a^{m \cdot n}$$
$$a^0 = 1 \quad (a \neq 0)$$
$$a^{-n} = \frac{1}{a^n}$$
$$a^{1/n} = \sqrt[n]{a}$$

**Example**: $2^{10} = 1024$. $2^{-3} = 1/8 = 0.125$. $2^{1/2} = \sqrt{2} \approx 1.414$.

### Euler's number $e$

$e \approx 2.71828$. Not arbitrary: it's the unique number whose function $e^x$ has **itself as its derivative**. Appears everywhere "natural" growth or decay happens.

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots$$

For small $x$: $e^x \approx 1 + x$. For $x = 1$: $e^1 = e$. For $x \to \infty$: explodes.

> Where you see it: softmax, sigmoid, learning rate decay, exponential distribution, Gaussian PDF.

## 3. Logarithms: exponential in reverse

The **logarithm in base $b$** of $x$ is the number $y$ such that $b^y = x$:

$$\log_b x = y \iff b^y = x$$

**Examples**:
- $\log_{10} 1000 = 3$ (because $10^3 = 1000$)
- $\log_2 8 = 3$ (because $2^3 = 8$)
- $\log_2 1 = 0$ (because $2^0 = 1$)

### Natural log: $\ln x = \log_e x$

The one you'll always find in ML papers. **Just $\ln$, never "generic log"**.

### Rules to frame

$$\ln(ab) = \ln a + \ln b$$
$$\ln(a/b) = \ln a - \ln b$$
$$\ln(a^k) = k \ln a$$
$$\ln 1 = 0, \quad \ln e = 1$$

### Why logs appear everywhere in ML

**1. They turn products into sums.** The likelihood of $n$ independent samples is a product:

$$L(\theta) = \prod_{i=1}^n p(x_i|\theta)$$

Numerically: with $n=1000$ and each $p \sim 10^{-3}$, the product goes to $10^{-3000}$ → underflow. Take the log:

$$\log L(\theta) = \sum_{i=1}^n \log p(x_i|\theta)$$

Sums of "human" numbers. No overflow.

**2. They compress huge scales.** From 1 to 1 billion is invisible in linear scale. In log: 0 to 9, perfectly visible.

<div class="chart"><svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,20)">
  <text x="120" y="0" fill="#7aa2ff" font-size="11">linear scale</text>
  <line x1="10" y1="140" x2="270" y2="140" stroke="#555"/>
  <circle cx="10" cy="140" r="4" fill="#ffb347"/>
  <text x="10" y="155" fill="#ffb347" font-size="9" text-anchor="middle">1</text>
  <circle cx="11" cy="140" r="4" fill="#ffb347"/>
  <text x="20" y="125" fill="#ffb347" font-size="9">10</text>
  <circle cx="13" cy="140" r="4" fill="#ffb347"/>
  <text x="22" y="110" fill="#ffb347" font-size="9">100</text>
  <circle cx="35" cy="140" r="4" fill="#ffb347"/>
  <text x="35" y="125" fill="#ffb347" font-size="9" text-anchor="middle">10k</text>
  <circle cx="270" cy="140" r="4" fill="#ffb347"/>
  <text x="270" y="125" fill="#ffb347" font-size="9" text-anchor="middle">1M</text>
</g>
<g transform="translate(330,20)">
  <text x="120" y="0" fill="#7aa2ff" font-size="11">log scale</text>
  <line x1="10" y1="140" x2="270" y2="140" stroke="#555"/>
  <circle cx="10" cy="140" r="4" fill="#5ee2c4"/>
  <text x="10" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">1</text>
  <circle cx="55" cy="140" r="4" fill="#5ee2c4"/>
  <text x="55" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">10</text>
  <circle cx="100" cy="140" r="4" fill="#5ee2c4"/>
  <text x="100" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">100</text>
  <circle cx="190" cy="140" r="4" fill="#5ee2c4"/>
  <text x="190" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">10k</text>
  <circle cx="270" cy="140" r="4" fill="#5ee2c4"/>
  <text x="270" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">1M</text>
</g>
</svg><div class="chart-caption">In linear scale small numbers disappear. In log scale they're evenly spaced.</div></div>

## 4. Notation: sums and products

### Sum $\Sigma$

$$\sum_{i=1}^n a_i = a_1 + a_2 + \dots + a_n$$

**Memorize**:

$$\sum_{i=1}^n i = \frac{n(n+1)}{2}$$

$$\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$$

### Product $\Pi$

$$\prod_{i=1}^n a_i = a_1 \cdot a_2 \cdots a_n$$

### Basic rules

Constants pull out of sums:

$$\sum_i c \cdot a_i = c \sum_i a_i$$

Sum of sums:

$$\sum_i (a_i + b_i) = \sum_i a_i + \sum_i b_i$$

**Concrete example**: mean of $\{3, 5, 7, 9\}$.

$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i = \frac{1}{4}(3+5+7+9) = \frac{24}{4} = 6$$

## 5. Sets and probability (basics)

| Symbol | Meaning | Example |
|---|---|---|
| $\in$ | belongs to | $3 \in \{1,2,3\}$ |
| $\subset$ | subset | $\{1,2\} \subset \{1,2,3\}$ |
| $\cup$ | union | $\{1,2\} \cup \{2,3\} = \{1,2,3\}$ |
| $\cap$ | intersection | $\{1,2\} \cap \{2,3\} = \{2\}$ |
| $\emptyset$ | empty set | $\{1,2\} \cap \{3,4\} = \emptyset$ |
| $A^c$ or $\bar{A}$ | complement | everything NOT in A |
| $\|A\|$ | cardinality | $\|\{1,2,3\}\| = 3$ |

## 6. Geometry: Cartesian plane

### Distance between two points

$P_1 = (x_1, y_1)$, $P_2 = (x_2, y_2)$:

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

Generalizes to 3D with $z$, and to any dimension (see linear algebra section).

### Line equation

$$y = mx + q$$

- $m$ = slope (positive = goes up, negative = goes down, 0 = horizontal)
- $q$ = y-intercept

**Example**: $y = 2x - 3$. Slope 2 (for every +1 in x, y grows by 2), passes through $(0, -3)$ and $(1.5, 0)$.

### Circle equation

Circle centered at $(a, b)$ with radius $r$:

$$(x - a)^2 + (y - b)^2 = r^2$$

## 7. Derivative: the concept in 3 minutes

The **derivative** of $f(x)$ at $x_0$ is the **slope** of the tangent line to the graph of $f$ at $x_0$. Written $f'(x_0)$ or $\frac{df}{dx}\big|_{x_0}$.

<div class="chart"><svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="200" x2="460" y2="200" stroke="#555"/>
<line x1="40" y1="20" x2="40" y2="200" stroke="#555"/>
<path d="M 40 200 Q 120 200 200 130 T 460 30" fill="none" stroke="#7aa2ff" stroke-width="2.5"/>
<line x1="120" y1="190" x2="280" y2="80" stroke="#ffb347" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="200" cy="135" r="5" fill="#ffb347"/>
<text x="210" y="130" fill="#ffb347" font-size="11">x₀, f(x₀)</text>
<text x="290" y="78" fill="#ffb347" font-size="11">tangent slope = f'(x₀)</text>
<text x="280" y="200" fill="#8b949e" font-size="10">if f' &gt; 0: increasing</text>
<text x="280" y="215" fill="#8b949e" font-size="10">if f' &lt; 0: decreasing</text>
<text x="280" y="230" fill="#8b949e" font-size="10">if f' = 0: extremum (max/min)</text>
</svg><div class="chart-caption">The derivative is "how fast f grows near x₀". Geometrically: tangent slope.</div></div>

### The 5 derivatives to memorize

| $f(x)$ | $f'(x)$ |
|---|---|
| $c$ (constant) | $0$ |
| $x$ | $1$ |
| $x^n$ | $n x^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |

**Step-by-step example**: $f(x) = 3x^2 + 5x - 1$.

Derivative term by term:
- $3x^2$ → $3 \cdot 2x = 6x$
- $5x$ → $5$
- $-1$ → $0$

Result: $f'(x) = 6x + 5$.

At $x_0 = 2$: $f'(2) = 17$. Steep upward slope there.

### Why we care

In the "calculus and optimization" section you'll see that **finding the minimum of a function** (= minimizing a model's loss) means **finding where the derivative is zero**, or moving opposite to the gradient (vector version of the derivative).

All modern machine learning is derivatives.

## 8. Basic algebra: manipulations you'll do constantly

### Solve a linear equation

$$3x + 5 = 17$$

Move to the right: $3x = 17 - 5 = 12$. Divide: $x = 4$.

### Solve a quadratic

$$ax^2 + bx + c = 0 \implies x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

The quadratic formula. Memorize.

**Example**: $x^2 - 5x + 6 = 0$. $a=1, b=-5, c=6$. Delta = $25 - 24 = 1$. $x = (5 \pm 1)/2 = 3$ or $2$.

### Fractions

$$\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$$
$$\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}$$
$$\frac{a/b}{c/d} = \frac{a}{b} \cdot \frac{d}{c} = \frac{ad}{bc}$$

### Substitution

If $y = e^z$ and you want $z$ as a function of $y$: apply $\ln$ to both sides. $\ln y = \ln(e^z) = z$. So $z = \ln y$.

This "gymnastics" returns a thousand times: change variable to simplify.

## 9. Trigonometry (minimal version)

Rarely needed, but in 2 contexts yes:

### Sine and cosine

For an angle $\theta$ in a right triangle with hypotenuse 1:
- $\sin\theta$ = opposite side
- $\cos\theta$ = adjacent side

Key property:
$$\sin^2\theta + \cos^2\theta = 1$$

In data science you find them when:
- Encoding hour/day as cyclical features (feature engineering section).
- Studying convolutional networks / signals (Fourier).
- Seeing rotations in vector spaces (PCA, embeddings).

### Periodicity

$\sin$ and $\cos$ repeat every $2\pi$ (≈ 6.28). $\sin(0) = 0$, $\sin(\pi/2) = 1$, $\sin(\pi) = 0$, $\sin(3\pi/2) = -1$.

## 10. Things you do NOT need to know (surprise)

To avoid impostor syndrome: for applied data science you **do not need**:

- To solve integrals by hand (computers do it).
- Group theory, rings, fields.
- To prove Bolzano-Weierstrass.
- All the stuff high-school exam prep tortured you with.

You need **ideas**. **Manual calculation techniques** almost never. When you need symbolic computation, there's SymPy or WolframAlpha.

## Exercises

<details>
<summary>Exercise 1 — Exponentials by hand</summary>

Compute:
1. $2^5 \cdot 2^3$
2. $(3^2)^4$
3. $10^{-2}$
4. $4^{1/2}$
5. $2^{10}$

**Answers**: 1. $2^8=256$. 2. $3^8 = 6561$. 3. $0.01$. 4. $2$. 5. $1024$.
</details>

<details>
<summary>Exercise 2 — Logs by hand</summary>

Compute:
1. $\log_{10} 100$
2. $\log_2 32$
3. $\ln e^5$
4. $\log_2(8 \cdot 4)$ using $\log(ab) = \log a + \log b$
5. $\ln(1/e)$

**Answers**: 1. $2$. 2. $5$. 3. $5$. 4. $\log_2 8 + \log_2 4 = 3 + 2 = 5$. 5. $-1$.
</details>

<details>
<summary>Exercise 3 — Derivatives by hand</summary>

Differentiate:
1. $f(x) = 7x^3$
2. $f(x) = x^2 - 4x + 3$
3. $f(x) = e^x + 5\ln x$
4. $f(x) = 1/x$ (hint: $1/x = x^{-1}$)

**Answers**: 1. $21x^2$. 2. $2x - 4$. 3. $e^x + 5/x$. 4. $-x^{-2} = -1/x^2$.
</details>

<details>
<summary>Exercise 4 — Quadratics</summary>

Solve:
1. $x^2 - 9 = 0$
2. $2x^2 - 8x + 6 = 0$
3. $x^2 + x - 6 = 0$

**Answers**: 1. $x = \pm 3$. 2. Divide by 2: $x^2 - 4x + 3 = 0$. Delta=4. $x = (4 \pm 2)/2 = 3$ or $1$. 3. Delta = $1 + 24 = 25$. $x = (-1 \pm 5)/2 = 2$ or $-3$.
</details>

<details>
<summary>Exercise 5 — Summations</summary>

1. Compute $\sum_{i=1}^5 i$.
2. Compute $\sum_{i=1}^4 i^2$.
3. Rewrite without the symbol: $\sum_{i=1}^3 (2i + 1)$.

**Answers**: 1. $15$. 2. $30$. 3. $3 + 5 + 7 = 15$.
</details>

<details>
<summary>Exercise 6 — Geometry</summary>

Distance between $P_1 = (1, 2)$ and $P_2 = (4, 6)$.

**Answer**: $\sqrt{(4-1)^2 + (6-2)^2} = \sqrt{9+16} = \sqrt{25} = 5$.

You'll recognize it as the "L2 norm" in linear algebra. Same formula, new name.
</details>

<details>
<summary>Exercise 7 — Line through 2 points</summary>

Find $m$ and $q$ for the line through $(1, 3)$ and $(4, 9)$.

**Answer**: $m = (9-3)/(4-1) = 2$. $q$ from the first equation: $3 = 2 \cdot 1 + q \Rightarrow q = 1$. Line: $y = 2x + 1$.

When you train a linear regression with scikit-learn, that's exactly what the computer does — for thousands of points at once.
</details>

## Takeaways

- Basic functions: linear, quadratic, exponential, logarithmic, sigmoid. Visualize them.
- $e \approx 2.718$. Its derivative is itself.
- Log = exponential reversed. Turns products into sums. Numerical lifesaver.
- Sums and products are just compact notation.
- Derivative = tangent slope. Zero at max/min.
- Algebra manipulation is gymnastics: do it without thinking.

Now you're ready for linear algebra and calculus, the next two sections.
