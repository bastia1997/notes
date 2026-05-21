---
title: "Inferential statistics and hypothesis testing"
area: "Statistics"
summary: "Estimators, confidence intervals, p-values (and why everyone misinterprets them), t-tests, chi-squared, ANOVA, statistical power."
order: 7
level: "intermediate"
prereq:
  - "[[probability]]"
  - "[[descriptive-statistics]]"
tools:
  - "scipy.stats, statsmodels"
---

# Inferential statistics and hypothesis testing

## Inference in one line

> Given observed data from a **sample**, what can we say about the **population**?

Everything else is technical detail. Answers come in two forms: **estimates** (with confidence intervals) and **tests** (with p-values).

## Point estimators

We want to estimate a parameter $\theta$ (e.g., population mean $\mu$) from data. An **estimator** $\hat{\theta}$ is a function of the sample.

Properties we want:

- **Unbiased**: $E[\hat{\theta}] = \theta$
- **Consistent**: $\hat{\theta} \to \theta$ as $n$ grows
- **Efficient**: low variance among unbiased estimators

The **sample mean** $\bar{X}$ is unbiased, consistent, efficient (for Gaussian data) for estimating $\mu$.

### MLE — Maximum Likelihood Estimation

The premier method to build estimators. Given a model family $p(x | \theta)$ and iid data $x_1, \dots, x_n$, the **likelihood** is:

$$L(\theta) = \prod_{i=1}^n p(x_i | \theta)$$

MLE picks $\theta$ maximizing $L$ (or equivalently $\log L$, which is more numerically stable and algebraically tractable).

**Example**: $X_i \sim \mathcal{N}(\mu, \sigma^2)$. The MLE of $\mu$ is $\bar{X}$, and of $\sigma^2$ is $\frac{1}{n}\sum (x_i - \bar{X})^2$. (Note: with $n$, not $n-1$. The MLE version is biased downward; for unbiased use $n-1$.)

MLE generalizes to regression, logistic, mixed models, NNs — every "training" is maximizing a log-likelihood (or minimizing negative cross-entropy).

## Confidence intervals

A **95% confidence interval** for $\mu$ is a procedure that produces intervals which, **on repeated experiments**, contain $\mu$ in 95% of cases.

**Correct interpretation**:

> "If we repeated the study 100 times, ~95 of the 100 constructed intervals would contain the true $\mu$."

**WRONG interpretation** (which everyone makes):

> "There's a 95% probability that $\mu$ is in this interval." (That's Bayesian — credible interval — different.)

For the mean:

$$\bar{x} \pm t_{n-1, 1-\alpha/2} \cdot \frac{s}{\sqrt{n}}$$

where $t$ is the quantile of Student's t with $n-1$ degrees of freedom.

```python
import numpy as np
from scipy import stats

x = np.random.normal(50, 10, 30)
mean = x.mean()
se = stats.sem(x)              # s/√n
ci = stats.t.interval(0.95, len(x)-1, loc=mean, scale=se)
print(mean, ci)
```

### Bootstrap: CI without assumptions

When you don't want to assume normality or have no closed form:

1. Resample with replacement from data $B$ times (e.g., $B=1000$).
2. Compute the statistic on each resample.
3. Take the 2.5 and 97.5 percentiles of the distribution of statistics.

```python
rng = np.random.default_rng(0)
B = 5000
boot_means = [rng.choice(x, size=len(x), replace=True).mean() for _ in range(B)]
np.percentile(boot_means, [2.5, 97.5])
```

Bootstrap works for almost any statistic: median, IQR, R², ML metrics.

## Hypothesis tests

Every test is a dialogue:

1. Set a **null hypothesis** $H_0$ (usually "no effect").
2. Set the **alternative** $H_1$.
3. Compute a **test statistic** $T$ from data.
4. Under $H_0$, $T$ follows a known distribution.
5. Compute the probability of observing $T$ or more extreme, **assuming $H_0$ is true**. This is the **p-value**.
6. If p-value < $\alpha$ (typically 0.05), you reject $H_0$.

### What the p-value really is

> "p-value = probability of observing data as extreme as this (or more), **assuming $H_0$ is true**."

**It is not**:
- P($H_0$ true | data). It's not a probability about $H_0$.
- The probability of erring in rejecting.
- A measure of **effect size**. p=0.001 with microscopic effect is clinically irrelevant.

### Type I and II errors

| | $H_0$ true | $H_0$ false |
|---|---|---|
| **Reject $H_0$** | Type I error (α) — false positive | Correct decision (power $1-\beta$) |
| **Don't reject $H_0$** | Correct | Type II error (β) — false negative |

You choose $\alpha$ (usually 0.05). $\beta$ depends on effect size and $n$. **More samples = more power**.

## Tests you need

### t-test

Compares means. Three versions:

- **One sample**: $\bar{x}$ vs expected $\mu_0$.
- **Two sample independent**: $\bar{x}_1$ vs $\bar{x}_2$ (separate groups).
- **Paired**: two measurements on same subjects (pre/post).

Assumptions: data ~normal (CLT helps for $n>30$), variances ~equal (for the classic version; use **Welch** if different).

```python
from scipy.stats import ttest_ind, ttest_rel
ttest_ind(group_a, group_b, equal_var=False)   # Welch
```

### Mann-Whitney U / Wilcoxon

Non-parametric, replace t-tests when data isn't normal (skewed, heavy tails).

```python
from scipy.stats import mannwhitneyu
mannwhitneyu(group_a, group_b, alternative='two-sided')
```

### ANOVA

Compares $k > 2$ groups. $H_0$: all means equal.

```python
from scipy.stats import f_oneway
f_oneway(group_a, group_b, group_c)
```

If you reject, follows **post-hoc** test (Tukey HSD) to identify which pairs differ.

### Chi-squared

For categorical. Two kinds:

- **Goodness of fit**: does a categorical follow an expected distribution?
- **Independence**: are two categoricals independent?

```python
import pandas as pd
from scipy.stats import chi2_contingency
table = pd.crosstab(df.gender, df.purchased)
chi2, p, dof, expected = chi2_contingency(table)
```

### Normality tests

- **Shapiro-Wilk** (`scipy.stats.shapiro`): powerful for $n < 5000$.
- **Anderson-Darling**, **Kolmogorov-Smirnov**.
- **Q-Q plot**: the best visual method. If points sit on the line, it's normal.

> **Caveat**: with large $n$, every normality test rejects $H_0$ even for tiny deviations. Use the **Q-Q plot** and common sense.

## Multiple testing correction

If you do 20 independent tests at $\alpha=0.05$, you expect $\sim 1$ false positive by chance. In genomics or A/B testing across many metrics, **correct**:

- **Bonferroni**: $\alpha_{adj} = \alpha / m$. Conservative.
- **Benjamini-Hochberg (FDR)**: controls the false discovery rate. Less conservative, biology standard.

```python
from statsmodels.stats.multitest import multipletests
reject, p_adj, _, _ = multipletests(p_values, alpha=0.05, method='fdr_bh')
```

## Statistical power and sample size

Before launching a study: how many samples to detect an effect of a given size?

For a two-sample t-test with **Cohen's d = 0.5** (medium), $\alpha=0.05$, 80% power, you need **~64 subjects per group**.

```python
from statsmodels.stats.power import TTestIndPower
power = TTestIndPower()
power.solve_power(effect_size=0.5, alpha=0.05, power=0.8)
# ≈ 63.7
```

> Lesson: a test that doesn't reject doesn't mean "$H_0$ is true". It might mean "$n$ was too small".

## A/B testing in the real world

```mermaid
flowchart LR
    A[Define primary metric] --> B[Compute sample size<br/>with realistic MDE]
    B --> C[Assign users<br/>randomly A/B]
    C --> D[Collect data<br/>up to sample size]
    D --> E[Analyze ONCE<br/>at the end]
    E --> F[Decide]
```

**Frequent mistakes**:

1. **Peeking**: looking at results daily and stopping when significant. Inflates false positive rate. Use **sequential testing** or **always-valid p-values** if you want early stopping.
2. **Multiple metrics**: testing 10 metrics increases false positive probability. Pre-register primary metric.
3. **Novelty effect**: new design excites users first days. Run at least 1–2 weeks.
4. **Non-random assignment**: by device, cohort, location. Always check balance.

## Bayesian vs frequentist in 30 seconds

| | Frequentist | Bayesian |
|---|---|---|
| Parameters | Fixed (unknown) | Random variables with distribution |
| Output | p-value, CI | Posterior, credible interval |
| Prior | None | Yes |
| CI/credible interpretation | About the procedure | About the parameter |
| Compute cost | Low | Often high (MCMC) |

Both work. In industry frequentist dominates (A/B test, regression). In scientific research Bayesian is growing.

## Exercises

<details>
<summary>Exercise 1 — Manual CI</summary>

You have $n=25$, $\bar{x}=78$, $s=12$. Compute the 95% CI for $\mu$.

**Solution**: $t_{24, 0.975} \approx 2.064$. SE = $12/\sqrt{25} = 2.4$. CI = $78 \pm 2.064 \cdot 2.4 = 78 \pm 4.95 = [73.05, 82.95]$.
</details>

<details>
<summary>Exercise 2 — How much effect is "real"?</summary>

A test shows p = 0.04 with effect = 0.5 percentage points on a metric averaging 50%. Important result?

**Answer**: probably not. Statistical significance doesn't imply practical significance. 0.5pp on 50% is a 1% relative improvement: often implementation cost wipes it out. **Always report effect size** (Cohen's d, OR, lift) alongside p-value.
</details>

<details>
<summary>Exercise 3 — Simulated A/B test</summary>

Simulate an A/B test where treatment has conversion rate 10.5% vs control 10%. How many samples per group to get p<0.05 with 80% power?

```python
from statsmodels.stats.power import NormalIndPower
from statsmodels.stats.proportion import proportion_effectsize
es = proportion_effectsize(0.105, 0.10)
n = NormalIndPower().solve_power(effect_size=es, alpha=0.05, power=0.8)
print(int(n))  # ~60000 per group
```

Lesson: small rate effects require huge sample sizes. This is why A/B tests on minor features require weeks of Netflix-scale traffic.
</details>

<details>
<summary>Exercise 4 — Multiple testing</summary>

Simulate 100 independent tests all under $H_0$ at $\alpha=0.05$. How many rejections do you expect? Verify.

```python
import numpy as np
from scipy.stats import ttest_1samp
rng = np.random.default_rng(0)
ps = []
for _ in range(100):
    x = rng.normal(0, 1, 30)
    _, p = ttest_1samp(x, 0)
    ps.append(p)
print(sum(p < 0.05 for p in ps))  # ~5
```

Now apply Bonferroni and BH:
```python
from statsmodels.stats.multitest import multipletests
print("Bonferroni:", multipletests(ps, alpha=0.05, method='bonferroni')[0].sum())
print("BH (FDR):", multipletests(ps, alpha=0.05, method='fdr_bh')[0].sum())
```
</details>

<details>
<summary>Exercise 5 — Bootstrap CI for the median</summary>

```python
import numpy as np
rng = np.random.default_rng(0)
x = rng.lognormal(0, 1, 200)

B = 5000
boot = np.array([np.median(rng.choice(x, len(x), replace=True)) for _ in range(B)])
ci = np.percentile(boot, [2.5, 97.5])
print(f"median: {np.median(x):.3f}, CI: {ci}")
```

Compare with an analytical CI (complex for median). Bootstrap makes inference easy for almost any statistic.
</details>

## Takeaways

- p-value $\neq$ P(H_0 true). Memorize.
- 95% CI is a property of the **procedure**, not the single interval.
- Bootstrap = swiss army knife for CIs without normality assumptions.
- Effect size matters as much as significance.
- A/B tests done wrong are worse than not doing them.

Next: probability distributions you'll meet daily.
