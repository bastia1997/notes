---
title: "Probability: the language of uncertainty"
area: "Mathematics"
summary: "Sample space, events, independence, Bayes, expected value, variance. The foundations of statistics, ML, and every decision under uncertainty."
order: 5
level: "intermediate"
prereq:
  - "[[linear-algebra]]"
tools:
  - "paper, NumPy"
---

# Probability: the language of uncertainty

## Why probability

Data science lives in uncertainty. Every estimate has error. Every prediction is a distribution. Every decision balances risks. Probability is the formal language to reason about all this.

**Where it shows up**:

- **Naive Bayes**, **logistic regression**, **GMM** — directly formulated in probability.
- **Maximum likelihood estimation (MLE)** — the principle behind OLS, logistic, NN.
- **Bayesian inference** — probabilistic models, MCMC.
- **Statistical tests** — p-values, confidence intervals.
- **Sampling** — every Monte Carlo, every stochastic gradient.

## Sample space and events

A random experiment has:

- **Sample space** $\Omega$: set of all possible outcomes.
- **Event** $A \subseteq \Omega$: subset of outcomes.
- **Probability** $P: 2^\Omega \to [0, 1]$ satisfying **Kolmogorov's axioms** (1933):

1. $P(A) \geq 0$ for every $A$.
2. $P(\Omega) = 1$.
3. If $A_1, A_2, \dots$ are **mutually exclusive**, $P(A_1 \cup A_2 \cup \dots) = \sum_i P(A_i)$.

**Example**: rolling a die. $\Omega = \{1,2,3,4,5,6\}$. Event "even" is $A = \{2,4,6\}$, $P(A) = 3/6 = 0.5$.

### Derived rules

- $P(\emptyset) = 0$
- $P(A^c) = 1 - P(A)$
- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ (**inclusion-exclusion**)

## Conditional probability

$$P(A | B) = \frac{P(A \cap B)}{P(B)}, \quad \text{if } P(B) > 0$$

"Probability of $A$ **given that** $B$ happened". Restricts the sample space to $B$.

**Example**: dice roll, $A$ = "rolls 6", $B$ = "rolls even". Then $P(A|B) = 1/3$ (among the three evens, only one is 6).

### Independent events

$A$ and $B$ are **independent** if $P(A | B) = P(A)$, equivalently $P(A \cap B) = P(A) P(B)$.

**Watch out**: independence isn't "don't touch each other". Two events can seem unrelated yet be dependent (and vice versa).

## Bayes' theorem

The most famous probability theorem, and the most misunderstood:

$$P(A | B) = \frac{P(B | A) \cdot P(A)}{P(B)}$$

In **scientific** form:

$$P(\text{hypothesis} | \text{data}) = \frac{P(\text{data} | \text{hypothesis}) \cdot P(\text{hypothesis})}{P(\text{data})}$$

The four terms:

- $P(H | D)$ = **posterior**: what we believe after seeing data.
- $P(D | H)$ = **likelihood**: how compatible the data is with the hypothesis.
- $P(H)$ = **prior**: what we believed before.
- $P(D)$ = **evidence**: normalization.

### Bayes tree: the visual way to grok it

Before the formula, try the **natural frequencies method** (Gigerenzer). A rare disease affects 1 in 1000 people. A test has:
- Sensitivity (true positive) = 99%: $P(+|\text{sick}) = 0.99$
- Specificity = 99%: $P(-|\text{healthy}) = 0.99$

You test positive. What's the probability you're sick? Intuition says 99%. The real answer is **9%**.

Let's build a **tree** with 10,000 people:

<div class="chart"><svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect x="240" y="10" width="120" height="40" fill="rgba(122,162,255,0.18)" stroke="#7aa2ff" rx="4"/>
<text x="300" y="35" fill="#7aa2ff" font-size="12" text-anchor="middle">10,000 people</text>

<line x1="290" y1="50" x2="120" y2="90" stroke="#7aa2ff" stroke-width="1.5"/>
<line x1="310" y1="50" x2="480" y2="90" stroke="#7aa2ff" stroke-width="1.5"/>
<text x="180" y="75" fill="#8b949e" font-size="10">0.1% sick</text>
<text x="420" y="75" fill="#8b949e" font-size="10">99.9% healthy</text>

<rect x="50" y="90" width="140" height="40" fill="rgba(255,122,122,0.15)" stroke="#ff7a7a" rx="4"/>
<text x="120" y="115" fill="#ff7a7a" font-size="12" text-anchor="middle">10 sick</text>

<rect x="410" y="90" width="140" height="40" fill="rgba(94,226,196,0.15)" stroke="#5ee2c4" rx="4"/>
<text x="480" y="115" fill="#5ee2c4" font-size="12" text-anchor="middle">9990 healthy</text>

<line x1="100" y1="130" x2="55" y2="170" stroke="#ff7a7a" stroke-width="1.5"/>
<line x1="140" y1="130" x2="185" y2="170" stroke="#ff7a7a" stroke-width="1.5"/>
<text x="50" y="155" fill="#8b949e" font-size="9">99% +</text>
<text x="170" y="155" fill="#8b949e" font-size="9">1% -</text>

<line x1="460" y1="130" x2="415" y2="170" stroke="#5ee2c4" stroke-width="1.5"/>
<line x1="500" y1="130" x2="545" y2="170" stroke="#5ee2c4" stroke-width="1.5"/>
<text x="410" y="155" fill="#8b949e" font-size="9">1% +</text>
<text x="530" y="155" fill="#8b949e" font-size="9">99% -</text>

<rect x="15" y="170" width="80" height="40" fill="rgba(255,179,71,0.25)" stroke="#ffb347" rx="4"/>
<text x="55" y="195" fill="#ffb347" font-size="12" text-anchor="middle">~10 true +</text>

<rect x="150" y="170" width="80" height="40" fill="rgba(60,80,100,0.3)" stroke="#5b6669" rx="4"/>
<text x="190" y="195" fill="#8b949e" font-size="11" text-anchor="middle">0 false -</text>

<rect x="375" y="170" width="80" height="40" fill="rgba(255,179,71,0.25)" stroke="#ffb347" rx="4"/>
<text x="415" y="195" fill="#ffb347" font-size="12" text-anchor="middle">~100 false +</text>

<rect x="510" y="170" width="80" height="40" fill="rgba(60,80,100,0.3)" stroke="#5b6669" rx="4"/>
<text x="550" y="195" fill="#8b949e" font-size="11" text-anchor="middle">~9890 true -</text>

<rect x="100" y="250" width="400" height="50" fill="rgba(122,162,255,0.08)" stroke="#7aa2ff" stroke-dasharray="4,3" rx="4"/>
<text x="300" y="270" fill="#7aa2ff" font-size="12" text-anchor="middle">Total positives ≈ 10 + 100 = 110</text>
<text x="300" y="288" fill="#ffb347" font-size="12" text-anchor="middle">P(sick | +) = 10 / 110 ≈ 9.1%</text>
</svg><div class="chart-caption">Natural frequency tree: counting 10 true positives and 100 false positives makes the result obvious.</div></div>

**And now the formula**:

$$P(M|+) = \frac{P(+|M) P(M)}{P(+|M) P(M) + P(+|H) P(H)} = \frac{0.99 \cdot 0.001}{0.99 \cdot 0.001 + 0.01 \cdot 0.999} \approx 0.090$$

Same result. But the tree is **infinitely more intuitive**: Gigerenzer's studies show even expert doctors miscompute $P(M|+)$ with the formula but almost all answer correctly when posed as "out of 1000 patients…". Lesson: when a Bayesian problem confuses you, **convert to frequencies**.

Lesson: **rare events stay rare even after a test**, if the prior is low enough. This is the epistemic basis for medical screening, fraud detection, anomaly detection.

## Random variables

A **random variable** $X$ is a function $X: \Omega \to \mathbb{R}$. Examples:
- $X$ = sum of two dice.
- $X$ = height of a random person.
- $X$ = number of clicks per day.

### Discrete vs continuous

- **Discrete**: takes values in a countable set. E.g., click count. Described by the **probability mass function** (PMF) $p(x) = P(X = x)$.
- **Continuous**: takes values in $\mathbb{R}$. E.g., height. Described by the **probability density function** (PDF) $f(x)$, where $P(a \leq X \leq b) = \int_a^b f(x) dx$.

In both cases, the **cumulative distribution function** (CDF) is $F(x) = P(X \leq x)$.

> For continuous variables $P(X = x) = 0$ for any $x$. Probability is "over intervals", not points.

## Expected value, variance, covariance

### Expected value (theoretical mean)

Discrete: $E[X] = \sum_x x \, p(x)$

Continuous: $E[X] = \int_{-\infty}^{\infty} x f(x) \, dx$

Essential properties:
- **Linearity**: $E[aX + bY] = a E[X] + b E[Y]$ **even if X, Y are not independent**.
- $E[c] = c$ for a constant.
- $E[XY] = E[X] E[Y]$ **only if** $X, Y$ are independent.

### Variance (dispersion)

$$\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - E[X]^2$$

The **standard deviation** is $\sigma = \sqrt{\text{Var}(X)}$, in the same units as $X$.

Properties:
- $\text{Var}(aX + b) = a^2 \text{Var}(X)$
- $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\text{Cov}(X, Y)$

### Covariance and correlation

$$\text{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])]$$

If positive, $X$ and $Y$ tend to grow together. The **Pearson correlation** normalizes to $[-1, 1]$:

$$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y}$$

> **Correlation ≠ causation**. Mantra. You'll repeat it a thousand times to colleagues. See causal inference section.

> **Linear** correlation. Two variables can have $\rho = 0$ and be strongly dependent (e.g., $Y = X^2$, $X \sim N(0,1)$, $\rho = 0$ but $Y$ is a function of $X$).

## Independence and iid

In ML, the **iid assumption** is fundamental: samples $X_1, \dots, X_n$ are assumed **independent** and **identically distributed**. This assumption underpins:

- Cross-validation
- Bootstrap
- Standard error estimates

When the assumption **doesn't hold** (e.g., time series, spatial data, social graphs), you need caution.

## Law of large numbers (LLN)

For iid $X_1, X_2, \dots$ with mean $\mu$:

$$\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i \xrightarrow{n \to \infty} \mu$$

In words: the sample mean converges to the true mean. This is **why** more data improves estimates.

## Central limit theorem (CLT)

Perhaps the most powerful theorem in statistics:

> For iid $X_i$ with mean $\mu$ and finite variance $\sigma^2$, the sample mean, **properly scaled**, converges to a normal:

$$\sqrt{n} (\bar{X}_n - \mu) \xrightarrow{d} \mathcal{N}(0, \sigma^2)$$

Practical consequence: **even if the original distribution is not normal**, the mean of many samples becomes normal. This justifies confidence intervals using the normal even for weird data.

<div class="chart"><svg viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,20)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <rect x="0" y="20" width="120" height="100" fill="rgba(255,179,71,0.3)" stroke="#ffb347"/>
  <text x="60" y="145" fill="#ffb347" font-size="11" text-anchor="middle">n=1 (uniform)</text>
</g>
<g transform="translate(170,20)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <polygon points="0,120 60,20 120,120" fill="rgba(192,132,252,0.3)" stroke="#c084fc"/>
  <text x="60" y="145" fill="#c084fc" font-size="11" text-anchor="middle">n=2 (triangular)</text>
</g>
<g transform="translate(320,20)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <path d="M 0 118 Q 30 110 50 60 Q 60 30 70 60 Q 90 110 120 118" fill="rgba(122,162,255,0.3)" stroke="#7aa2ff"/>
  <text x="60" y="145" fill="#7aa2ff" font-size="11" text-anchor="middle">n=30 (≈ normal)</text>
</g>
</svg><div class="chart-caption">Sum of uniforms: starts rectangular, becomes triangular, then normal. Magic.</div></div>

## Exercises

<details>
<summary>Exercise 1 — Loaded dice</summary>

A die is loaded: face 6 comes up 30%, the others uniformly.
1. What is $P(6)$?
2. What is $P(\text{even})$?
3. What is the expected value?

**Solutions**:
1. 0.30.
2. P(2) + P(4) + P(6) = 0.14 + 0.14 + 0.30 = 0.58.
3. $1 \cdot 0.14 \cdot 5 + 6 \cdot 0.30 = 0.14 \cdot 15 + 1.8 = 2.1 + 1.8 = 3.9$.

Verify:
```python
import numpy as np
probs = [0.14]*5 + [0.30]
vals = list(range(1,7))
sum(v*p for v,p in zip(vals, probs))  # 3.9
```
</details>

<details>
<summary>Exercise 2 — Bayes on a medical test</summary>

A disease has prevalence 0.5%. Test has sensitivity 95%, specificity 98%. What's $P(\text{sick} | +)$?

**Solution**:
$$P(M|+) = \frac{0.95 \cdot 0.005}{0.95 \cdot 0.005 + 0.02 \cdot 0.995} = \frac{0.00475}{0.02465} \approx 0.193$$

Only 19%. Even with a "precise" test, if the disease is rare most positives are false.
</details>

<details>
<summary>Exercise 3 — Monty Hall</summary>

You have 3 doors. Behind one is a car, behind the other two are goats. You pick door 1. The host (who knows where the car is) opens door 3, revealing a goat. He offers to swap to door 2. Should you?

**Solution**: YES, switch. Switching wins with probability 2/3, staying with 1/3. The door the host opens depends on your initial pick: if you picked wrong (prob 2/3), he's "forced" to open the other goat, leaving the car on the remaining one.

Simulation:
```python
import numpy as np
rng = np.random.default_rng(0)
n = 100_000
stay_wins = switch_wins = 0
for _ in range(n):
    car = rng.integers(3)
    pick = rng.integers(3)
    # host opens a door that is not your pick nor the car
    door_to_open = next(d for d in range(3) if d != pick and d != car)
    switch_pick = next(d for d in range(3) if d != pick and d != door_to_open)
    if pick == car: stay_wins += 1
    if switch_pick == car: switch_wins += 1
print(f"stay: {stay_wins/n:.3f}  switch: {switch_wins/n:.3f}")
# stay: ~0.333  switch: ~0.667
```
</details>

<details>
<summary>Exercise 4 — Expected value and variance</summary>

$X$ uniformly distributed on $\{1, 2, \dots, 10\}$. Compute $E[X]$, $E[X^2]$, $\text{Var}(X)$.

**Solution**:
- $E[X] = \frac{1+2+\dots+10}{10} = 5.5$
- $E[X^2] = \frac{1+4+9+\dots+100}{10} = \frac{385}{10} = 38.5$
- $\text{Var}(X) = 38.5 - 5.5^2 = 38.5 - 30.25 = 8.25$
</details>

<details>
<summary>Exercise 5 — Independence vs uncorrelated</summary>

$X \sim \mathcal{N}(0, 1)$, $Y = X^2$. Show that $\text{Cov}(X, Y) = 0$ but $X, Y$ are NOT independent.

**Solution**:
$\text{Cov}(X, Y) = E[X \cdot X^2] - E[X] E[X^2] = E[X^3] - 0 \cdot E[X^2] = 0$ (X symmetric → odd moments are zero).

Not independent because $Y$ is a deterministic function of $X$.

Lesson: **correlation only measures linear dependence**. For nonlinear dependence use mutual information, distance correlation, etc.
</details>

<details>
<summary>Exercise 6 — CLT simulation</summary>

Simulate 10000 means of 30 die rolls. Plot the histogram. You should see a normal.

```python
import numpy as np, matplotlib.pyplot as plt
rng = np.random.default_rng(0)
means = rng.integers(1, 7, size=(10_000, 30)).mean(axis=1)
plt.hist(means, bins=40, density=True)
plt.title(f"Mean of 30 dice · μ={means.mean():.3f}, σ={means.std():.3f}")
plt.show()
```

CLT predicts $\mu = 3.5$, $\sigma = \sqrt{35/12 / 30} \approx 0.31$. Verify.
</details>

<details>
<summary>Exercise 7 — Birthday paradox</summary>

How many people do you need in a room so that the probability of at least two sharing a birthday exceeds 50%?

**Solution**: 23 (always surprises). Formula:
$$P(\text{all different}) = \frac{365 \cdot 364 \cdots (365-n+1)}{365^n}$$

$P(\text{at least one match}) > 0.5$ for $n = 23$.

```python
import math
n = 1
while True:
    p = math.prod((365-i)/365 for i in range(n))
    if 1-p > 0.5:
        print(n); break
    n += 1
# 23
```
</details>

## Takeaways

- Bayes: the formal way to update beliefs with data.
- $E[\cdot]$ is linear always; for $\text{Var}(X+Y)$ you need covariance.
- Correlation only measures linear dependence.
- CLT is why the normal appears everywhere.
- Rare events + imperfect tests = many false positives. Teach it to doctors (and PMs).

## Reading

- **Sheldon Ross** — "A First Course in Probability": the classic text.
- **3Blue1Brown** — Bayes video (YouTube).
- **Tijms** — "Understanding Probability": full of fun paradoxes.

Next: descriptive statistics — when the data speaks first.
