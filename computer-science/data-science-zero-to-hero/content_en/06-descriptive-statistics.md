---
title: "Descriptive statistics"
area: "Statistics"
summary: "Central tendency, dispersion, skewness, kurtosis. Boxplots, histograms, density plots. Understanding a dataset before touching a model."
order: 6
level: "beginner"
prereq:
  - "[[probability]]"
tools:
  - "NumPy, pandas, matplotlib"
---

# Descriptive statistics

## The goal: summarize without lying

Before modeling, **describe**. Descriptive statistics produces numerical and graphical summaries. It's the first defense against confirmation bias: it forces you to see the data before believing what you want to believe.

> "Statistics is the science of changing your mind under uncertainty" — Persi Diaconis. To change your mind, first see what's there.

## Visual preview: same "5 numbers", radically different distributions

Before studying formulas, look at this: 5 datasets, **all with the same mean and standard deviation**, but with radically different distributions. This is the visual proof that "mean and std" never suffice alone.

<div class="chart"><svg viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,10)">
  <text x="50" y="-2" fill="#7aa2ff" font-size="10" text-anchor="middle">symmetric</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <path d="M 0 128 Q 25 110 50 50 Q 75 110 100 128" fill="rgba(122,162,255,0.18)" stroke="#7aa2ff" stroke-width="1.5"/>
</g>
<g transform="translate(140,10)">
  <text x="50" y="-2" fill="#ffb347" font-size="10" text-anchor="middle">right skewed</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <path d="M 0 128 Q 15 90 25 50 Q 40 95 70 120 Q 90 128 100 128" fill="rgba(255,179,71,0.18)" stroke="#ffb347" stroke-width="1.5"/>
</g>
<g transform="translate(260,10)">
  <text x="50" y="-2" fill="#c084fc" font-size="10" text-anchor="middle">bimodal</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <path d="M 0 128 Q 15 100 25 70 Q 35 100 50 120 Q 65 100 75 70 Q 85 100 100 128" fill="rgba(192,132,252,0.18)" stroke="#c084fc" stroke-width="1.5"/>
</g>
<g transform="translate(380,10)">
  <text x="50" y="-2" fill="#5ee2c4" font-size="10" text-anchor="middle">uniform</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <rect x="10" y="80" width="80" height="50" fill="rgba(94,226,196,0.18)" stroke="#5ee2c4" stroke-width="1.5"/>
</g>
<g transform="translate(500,10)">
  <text x="50" y="-2" fill="#ff7a7a" font-size="10" text-anchor="middle">heavy tails</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <path d="M 0 125 Q 30 122 45 30 Q 55 30 70 122 Q 90 128 100 128" fill="rgba(255,122,122,0.18)" stroke="#ff7a7a" stroke-width="1.5"/>
</g>
</svg><div class="chart-caption">All share mean and variance. A distribution isn't "a number": it's a shape.</div></div>

## Central tendency

### Arithmetic mean

$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i$$

Sensitive to outliers. One person with income 1M in a sample of 99 with mean 30k pushes the mean to 39.7k. Represents nobody.

### Median

The middle ordered value. **Robust** to outliers: those 99 have median ~30k, the one rich person doesn't move it.

### Mode

The most frequent value. Useful for categorical, rarely for continuous.

### Trimmed mean

Ignores $\alpha\%$ of extreme values top and bottom. Compromise between mean and median.

```python
import numpy as np
from scipy import stats
x = np.array([1,2,3,4,5,6,7,8,9,100])
np.mean(x), np.median(x), stats.trim_mean(x, 0.1)
# (14.5, 5.5, 5.0)
```

## Dispersion

### Variance and standard deviation

$$s^2 = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2$$

Note the **denominator $n-1$** (Bessel's correction) — produces an **unbiased** estimator of the population variance. NumPy default is `ddof=0`, pandas `ddof=1`. Always check.

### Range, IQR

- **Range** = $\max - \min$. Extreme, not robust.
- **Interquartile Range (IQR)** = $Q_3 - Q_1$. Robust, contains 50% of central data.

### MAD — Median Absolute Deviation

$$\text{MAD} = \text{median}(|x_i - \text{median}(x)|)$$

Robust version of std. Used for outlier detection:

$$|x_i - \text{median}| > 3 \cdot \text{MAD} \implies \text{suspect outlier}$$

## Quantiles and boxplots

**Quantiles** divide ordered data into equal parts. Quantile $q$ is the value $x_q$ such that fraction $q$ of data is below:

- $Q_1$ = 0.25 (first quartile)
- $Q_2$ = median = 0.50
- $Q_3$ = 0.75

The **boxplot** (Tukey, 1977) visualizes them:

<div class="chart"><svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="80" x2="320" y2="80" stroke="#444"/>
<line x1="60" y1="70" x2="60" y2="90" stroke="#7aa2ff" stroke-width="2"/>
<line x1="60" y1="80" x2="120" y2="80" stroke="#7aa2ff" stroke-width="2"/>
<rect x="120" y="55" width="100" height="50" fill="rgba(122,162,255,0.18)" stroke="#7aa2ff" stroke-width="2"/>
<line x1="160" y1="55" x2="160" y2="105" stroke="#ffb347" stroke-width="3"/>
<line x1="220" y1="80" x2="280" y2="80" stroke="#7aa2ff" stroke-width="2"/>
<line x1="280" y1="70" x2="280" y2="90" stroke="#7aa2ff" stroke-width="2"/>
<circle cx="310" cy="80" r="3" fill="#ff7a7a"/>
<text x="55" y="120" fill="#7aa2ff" font-size="10" text-anchor="middle">min</text>
<text x="120" y="120" fill="#7aa2ff" font-size="10" text-anchor="middle">Q1</text>
<text x="160" y="125" fill="#ffb347" font-size="10" text-anchor="middle">median</text>
<text x="220" y="120" fill="#7aa2ff" font-size="10" text-anchor="middle">Q3</text>
<text x="280" y="120" fill="#7aa2ff" font-size="10" text-anchor="middle">max</text>
<text x="310" y="120" fill="#ff7a7a" font-size="10" text-anchor="middle">outlier</text>
</svg><div class="chart-caption">Box = IQR, whiskers = 1.5×IQR, points = outliers beyond whiskers.</div></div>

## Skewness and kurtosis

**Skewness** $= E[(X-\mu)^3]/\sigma^3$. Measures asymmetry.

- $> 0$: right tail (right-skewed). E.g., income, session duration.
- $< 0$: left tail. Rare in natural data.

**Kurtosis** $= E[(X-\mu)^4]/\sigma^4$. Measures "heavy tails".

- Normal has kurtosis 3 (excess 0).
- $> 3$: leptokurtic (heavy tails, high peaks). E.g., financial returns, file sizes.
- $< 3$: platykurtic (flatter). E.g., uniform.

<div class="chart"><svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,10)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <path d="M 0 118 Q 20 50 60 50 Q 80 50 100 90 Q 110 110 120 118" fill="none" stroke="#ffb347" stroke-width="2"/>
  <text x="60" y="140" fill="#ffb347" font-size="11" text-anchor="middle">skew &gt; 0</text>
</g>
<g transform="translate(180,10)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <path d="M 0 118 Q 30 90 50 50 Q 60 30 70 50 Q 90 90 120 118" fill="none" stroke="#7aa2ff" stroke-width="2"/>
  <text x="60" y="140" fill="#7aa2ff" font-size="11" text-anchor="middle">symmetric</text>
</g>
<g transform="translate(340,10)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <path d="M 0 118 Q 50 105 60 20 Q 70 105 120 118" fill="none" stroke="#c084fc" stroke-width="2"/>
  <text x="60" y="140" fill="#c084fc" font-size="11" text-anchor="middle">high kurtosis</text>
</g>
</svg></div>

## Histograms and density

**Histogram**: divide the range into bins and count. Bin choice: too many → jagged, too few → loss of structure.

Common rules:
- **Sturges**: $k = 1 + \log_2 n$
- **Freedman-Diaconis**: $h = 2 \cdot \text{IQR} / n^{1/3}$ (more robust to heavy tails)

```python
import numpy as np, matplotlib.pyplot as plt
x = np.random.lognormal(0, 0.5, 1000)
plt.hist(x, bins='fd', density=True, alpha=0.6, color='#7aa2ff')
plt.show()
```

**KDE (kernel density estimation)**: smooth alternative to histograms. For each point applies a kernel (Gaussian) and sums. The `bandwidth` parameter controls smoothness.

```python
import seaborn as sns
sns.kdeplot(x, fill=True)
```

## Bivariate statistics

### Scatter plot

The only honest way to see a relationship between two continuous variables. A 0.8 correlation could be perfectly linear, parabolic, or totally skewed by outliers. **Always plot**.

### Correlation heatmap

For many variables. `seaborn.heatmap(df.corr())` is everywhere. Warning: shows only linear Pearson correlation. For nonlinear data, use **Spearman** (rank correlation).

```python
import seaborn as sns
sns.heatmap(df.corr(method='spearman'), annot=True, cmap='RdBu_r', center=0)
```

## Statistics for categorical data

- **Frequencies**: `df['col'].value_counts(normalize=True)`.
- **Contingency table**: `pd.crosstab(df.a, df.b)`.
- **Cramér's V**: association between two categoricals, in $[0, 1]$.
- **Chi-squared** for independence test (see tests section).

## Useful transformations

When data is strongly skewed, some transformations bring them toward normality or stabilize variance:

| Data | Transformation |
|---|---|
| Right skew (positive) | $\log(x+c)$ — small c handles zeros |
| Severe right skew | $\sqrt{x}$ |
| Counts (Poisson) | $\sqrt{x}$ or Anscombe |
| Percentages $[0,1]$ | $\log(p/(1-p))$ (logit) |
| Generic | **Box-Cox** or **Yeo-Johnson** |

```python
from sklearn.preprocessing import PowerTransformer
pt = PowerTransformer(method='yeo-johnson')
x_trans = pt.fit_transform(x.reshape(-1, 1))
```

## Exercises

<details>
<summary>Exercise 1 — Outliers affect the mean</summary>

Compute mean and median of `[10, 12, 11, 13, 14, 15, 1000]`. Compare.

**Solution**: mean ≈ 153.6, median = 13. One outlier shifts the mean by 10×.
</details>

<details>
<summary>Exercise 2 — Tukey's five-number summary</summary>

For dataset `[2, 4, 4, 4, 5, 5, 7, 9]`, compute min, Q1, median, Q3, max.

**Solution**: 2, 4, 4.5, 6, 9. Verify:
```python
np.percentile([2,4,4,4,5,5,7,9], [0, 25, 50, 75, 100])
```
</details>

<details>
<summary>Exercise 3 — Interpreted skew</summary>

Generate 10000 lognormal samples, compute skew and kurtosis:

```python
import numpy as np
from scipy.stats import skew, kurtosis
x = np.random.lognormal(0, 1, 10_000)
print(skew(x), kurtosis(x))  # both positive, high
```

Apply `np.log(x)` and recompute. What happens? Why?

**Answer**: after the log, skew ≈ 0 and kurtosis ≈ 0 (it's Gaussian). The lognormal is precisely "exp of a normal".
</details>

<details>
<summary>Exercise 4 — Anscombe quartet</summary>

Anscombe's 4 datasets have **same mean, variance, correlation, regression line**, but plotted look completely different. Load and plot:

```python
import seaborn as sns
a = sns.load_dataset('anscombe')
sns.lmplot(data=a, x='x', y='y', col='dataset', col_wrap=2, ci=None)
```

Lesson: **never trust summary numbers alone. Always plot.**
</details>

<details>
<summary>Exercise 5 — Detect outliers with IQR and MAD</summary>

```python
import numpy as np
rng = np.random.default_rng(0)
x = np.concatenate([rng.normal(0, 1, 100), [10, 12, 15]])

# IQR method
q1, q3 = np.percentile(x, [25, 75])
iqr = q3 - q1
mask = (x < q1 - 1.5*iqr) | (x > q3 + 1.5*iqr)
print("IQR outliers:", x[mask])

# MAD method
med = np.median(x)
mad = np.median(np.abs(x - med))
mask = np.abs(x - med) > 3 * 1.4826 * mad   # 1.4826 → normal-σ consistency
print("MAD outliers:", x[mask])
```
</details>

## Takeaways

- Mean + std describe well **only if** the distribution is ~symmetric.
- Median + IQR are robust, preferred for skewed or dirty data.
- Always plot. Anscombe teaches.
- Transformations (log, Box-Cox, Yeo-Johnson) are your friends for skewed distributions.

Next: inferential statistics, hypothesis tests, p-values, and things 9 out of 10 statisticians explain badly.
