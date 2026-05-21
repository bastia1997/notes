---
title: "Linear regression and regularization"
area: "Machine Learning"
summary: "OLS derivation, assumptions, residual diagnostics, Ridge, Lasso, Elastic Net, GLM. The model everything starts from."
order: 17
level: "intermediate"
prereq:
  - "[[linear-algebra]]"
  - "[[ml-fundamentals]]"
tools:
  - "scikit-learn, statsmodels"
---

# Linear regression and regularization

## The base model

$$y_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \dots + \beta_p x_{ip} + \epsilon_i$$

In matrix form, including the intercept as a first column of 1s in $X$:

$$\mathbf{y} = X \boldsymbol{\beta} + \boldsymbol{\epsilon}$$

OLS (Ordinary Least Squares) minimizes the sum of squared errors:

$$\hat{\boldsymbol{\beta}} = \arg\min_\beta \|\mathbf{y} - X \boldsymbol{\beta}\|_2^2$$

### What it means visually

You have points $(x_i, y_i)$ in the plane. The line $\hat{y} = \hat{\beta}_0 + \hat{\beta}_1 x$ is the "best line" in the sense that it **minimizes the sum of squared vertical distances** between points and line:

<div class="chart"><svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="210" x2="460" y2="210" stroke="#555"/>
<line x1="40" y1="20" x2="40" y2="210" stroke="#555"/>
<text x="250" y="232" fill="#8b949e" font-size="11">x</text>
<text x="22" y="120" fill="#8b949e" font-size="11">y</text>

<line x1="60" y1="195" x2="440" y2="40" stroke="#7aa2ff" stroke-width="2"/>

<circle cx="80" cy="180" r="4" fill="#ffb347"/>
<line x1="80" y1="180" x2="80" y2="187" stroke="#ff7a7a" stroke-width="1.5" stroke-dasharray="2,2"/>

<circle cx="130" cy="140" r="4" fill="#ffb347"/>
<line x1="130" y1="140" x2="130" y2="166" stroke="#ff7a7a" stroke-width="1.5" stroke-dasharray="2,2"/>

<circle cx="180" cy="155" r="4" fill="#ffb347"/>
<line x1="180" y1="155" x2="180" y2="146" stroke="#ff7a7a" stroke-width="1.5" stroke-dasharray="2,2"/>

<circle cx="230" cy="110" r="4" fill="#ffb347"/>
<line x1="230" y1="110" x2="230" y2="126" stroke="#ff7a7a" stroke-width="1.5" stroke-dasharray="2,2"/>

<circle cx="280" cy="120" r="4" fill="#ffb347"/>
<line x1="280" y1="120" x2="280" y2="105" stroke="#ff7a7a" stroke-width="1.5" stroke-dasharray="2,2"/>

<circle cx="340" cy="70" r="4" fill="#ffb347"/>
<line x1="340" y1="70" x2="340" y2="81" stroke="#ff7a7a" stroke-width="1.5" stroke-dasharray="2,2"/>

<circle cx="400" cy="80" r="4" fill="#ffb347"/>
<line x1="400" y1="80" x2="400" y2="56" stroke="#ff7a7a" stroke-width="1.5" stroke-dasharray="2,2"/>

<text x="320" y="170" fill="#7aa2ff" font-size="11">OLS line</text>
<text x="100" y="55" fill="#ff7a7a" font-size="10">residuals (red) → squared → summed → minimized</text>
</svg><div class="chart-caption">OLS does NOT minimize point-to-line geometric distance — it minimizes the VERTICAL difference (residuals).</div></div>

**Why squared?** Three reasons:

1. Positive and negative errors don't cancel (MAE uses absolute value but isn't differentiable at 0).
2. Penalizes large errors more (error of 4 counts 16, two of 2 only 8).
3. Has a **closed-form** solution (one math step), shown below.

## Deriving the solution

Compute the gradient and set to zero:

$$\frac{\partial}{\partial \boldsymbol{\beta}} \|\mathbf{y} - X \boldsymbol{\beta}\|^2 = -2 X^T (\mathbf{y} - X \boldsymbol{\beta}) = 0$$

$$X^T X \boldsymbol{\beta} = X^T \mathbf{y}$$

If $X^T X$ is invertible:

$$\boxed{\hat{\boldsymbol{\beta}} = (X^T X)^{-1} X^T \mathbf{y}}$$

The **normal equations**. The formula to frame.

> In practice, don't compute the inverse. `np.linalg.lstsq(X, y)` uses SVD, more stable.

## Assumptions (Gauss-Markov's sacred 5)

For OLS to be BLUE — Best Linear Unbiased Estimator:

1. **Linearity**: $E[y|X] = X\beta$.
2. **Exogeneity**: $E[\epsilon|X] = 0$ (errors uncorrelated with $X$).
3. **Homoscedasticity**: $\text{Var}(\epsilon|X) = \sigma^2$ constant.
4. **No multicollinearity**: $X^T X$ has full rank.
5. **Uncorrelated errors**: $\text{Cov}(\epsilon_i, \epsilon_j) = 0$.

If you also add **error normality** ($\epsilon \sim \mathcal{N}(0, \sigma^2 I)$), then OLS = MLE, and you can do inference (t-tests, CIs).

### Diagnostics

```python
import statsmodels.api as sm
X_ = sm.add_constant(X)
model = sm.OLS(y, X_).fit()
print(model.summary())
```

`summary()` outputs:
- Coefficients, standard errors, p-values, CIs.
- $R^2$, $\bar{R}^2$.
- Durbin-Watson (error correlation), Jarque-Bera (normality).
- Condition number (multicollinearity).

Plot residuals:

```python
import matplotlib.pyplot as plt
fitted = model.fittedvalues
resid = model.resid

# 1. residuals vs fitted
plt.scatter(fitted, resid); plt.axhline(0, c='red')
# Look for pattern? Variance growing with fitted → heteroscedasticity

# 2. Q-Q plot of residuals
sm.qqplot(resid, line='45')

# 3. residuals vs a feature
plt.scatter(X[:, 0], resid)
```

## $R^2$ and $\bar{R}^2$

$$R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$$

Fraction of explained variance. $R^2 = 1$ perfect, $0$ useless (predicts mean only).

$\bar{R}^2$ (adjusted) penalizes models with more features:

$$\bar{R}^2 = 1 - (1 - R^2) \frac{n-1}{n-p-1}$$

> High $R^2$ $\neq$ "good model". Can be high and the model wrong. Always with diagnostics.

## Interpreting coefficients

For **unstandardized** coefficients: $\hat{\beta}_j$ = expected increase in $y$ for **one unit** more of $x_j$, **holding others fixed**.

For **standardized** coefficients (scale $X$ to mean 0, var 1): $\hat{\beta}_j$ = increase in $y$ for **one standard deviation** more.

> "Holding others fixed" is the crucial detail. If two features are correlated, "holding the other fixed" is an abstraction: in reality changing $x_1$ also changes $x_2$ in your data.

## Multicollinearity

When features are correlated, standard errors inflate, coefficients become unstable, p-values lose meaning.

**Detect**: **Variance Inflation Factor** (VIF):

$$\text{VIF}_j = \frac{1}{1 - R_j^2}$$

where $R_j^2$ is the $R^2$ of regressing $x_j$ on the others. VIF > 5–10 = problematic.

```python
from statsmodels.stats.outliers_influence import variance_inflation_factor
[variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
```

**Fixes**:

- Drop one of the correlated features.
- Use PCA to replace with orthogonal components.
- Use **Ridge** regression: designed for this.

## Regularization

### Ridge (L2)

$$\hat{\boldsymbol{\beta}}^{\text{ridge}} = \arg\min \|y - X\beta\|^2 + \lambda \|\beta\|_2^2$$

Closed-form solution:

$$\hat{\boldsymbol{\beta}}^{\text{ridge}} = (X^T X + \lambda I)^{-1} X^T y$$

Adding $\lambda I$ makes it always invertible, even with multicollinearity.

$\lambda$ controls shrinkage:
- $\lambda = 0$: back to OLS.
- $\lambda \to \infty$: all coefficients → 0.

### Lasso (L1)

$$\hat{\boldsymbol{\beta}}^{\text{lasso}} = \arg\min \|y - X\beta\|^2 + \lambda \|\beta\|_1$$

Unlike Ridge, Lasso **zeros out** irrelevant coefficients — automatic feature selection.

### Elastic Net

$$\hat{\boldsymbol{\beta}}^{\text{en}} = \arg\min \|y - X\beta\|^2 + \lambda_1 \|\beta\|_1 + \lambda_2 \|\beta\|_2^2$$

Combines both. Useful when features are correlated (Lasso alone arbitrarily picks one; Elastic Net keeps them together).

### Tuning $\lambda$

```python
from sklearn.linear_model import RidgeCV, LassoCV, ElasticNetCV
ridge = RidgeCV(alphas=np.logspace(-3, 3, 50), cv=5).fit(X_tr, y_tr)
lasso = LassoCV(alphas=np.logspace(-3, 3, 50), cv=5, max_iter=10_000).fit(X_tr, y_tr)
en = ElasticNetCV(l1_ratio=[.1,.5,.9], cv=5).fit(X_tr, y_tr)

print("ridge alpha:", ridge.alpha_)
print("lasso alpha:", lasso.alpha_, " - n non-zero features:", (lasso.coef_ != 0).sum())
```

> **Scaling features is mandatory** for Ridge/Lasso. Without it, large-scale features get penalized more.

## Generalized Linear Models (GLM)

OLS assumes $y$ continuous, normal. GLMs generalize:

- A **link function** $g$ such that $g(E[y|X]) = X\beta$.
- A **distribution** from the exponential family for $y$.

| Model | Link | Distribution |
|---|---|---|
| OLS | Identity | Normal |
| Logistic | Logit | Bernoulli |
| Poisson | Log | Poisson |
| Gamma | Inverse / Log | Gamma |
| Negative Binomial | Log | NegBin (overdispersed Poisson) |

```python
import statsmodels.api as sm
# Poisson for counts
m = sm.GLM(y, X_, family=sm.families.Poisson()).fit()
# Gamma for durations
m = sm.GLM(y, X_, family=sm.families.Gamma(link=sm.families.links.Log())).fit()
```

## Complete example

```python
import numpy as np
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, RidgeCV, LassoCV
from sklearn.metrics import r2_score, mean_squared_error

X, y = fetch_california_housing(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

sc = StandardScaler().fit(X_tr)
X_tr_s = sc.transform(X_tr); X_te_s = sc.transform(X_te)

for name, model in [
    ('OLS', LinearRegression()),
    ('Ridge', RidgeCV(alphas=np.logspace(-3, 3, 50))),
    ('Lasso', LassoCV(alphas=np.logspace(-3, 3, 50), max_iter=10000)),
]:
    model.fit(X_tr_s, y_tr)
    pred = model.predict(X_te_s)
    print(f"{name:6s} R²={r2_score(y_te, pred):.3f}  RMSE={np.sqrt(mean_squared_error(y_te, pred)):.3f}")
```

## Limitations

OLS is excellent when:
- relationship is actually linear,
- residuals ~ normal,
- $n \gg p$.

It is NOT excellent when:
- strong nonlinearity → polynomials, GAM, trees.
- unspecified interactions → trees capture automatically.
- huge $p$ → Lasso, Ridge, sparse models.

## Exercises

<details>
<summary>Exercise 1 — OLS by hand</summary>

You have $X = [[1,1],[1,2],[1,3]]$ (1 intercept col + 1 feature) and $y = [2, 3, 5]$. Compute $\hat{\beta}$.

**Solution**:
$$X^T X = \begin{bmatrix} 3 & 6 \\ 6 & 14 \end{bmatrix}, \quad X^T y = \begin{bmatrix} 10 \\ 23 \end{bmatrix}$$
$$\det(X^TX) = 42-36 = 6$$
$$(X^TX)^{-1} = \frac{1}{6}\begin{bmatrix} 14 & -6 \\ -6 & 3 \end{bmatrix}$$
$$\hat{\beta} = \frac{1}{6}\begin{bmatrix} 14\cdot10 - 6\cdot23 \\ -6\cdot10 + 3\cdot23 \end{bmatrix} = \frac{1}{6}\begin{bmatrix} 2 \\ 9 \end{bmatrix} = \begin{bmatrix} 0.333 \\ 1.5 \end{bmatrix}$$

Intercept ≈ 0.33, slope = 1.5. Verify: predictions 1.83, 3.33, 4.83. Errors (0.17, -0.33, 0.17), sum = 0 ✓.
</details>

<details>
<summary>Exercise 2 — Residuals and diagnostics</summary>

Generate data with heteroscedasticity: variance growing with $x$. Verify OLS underestimates standard errors.

```python
import numpy as np, statsmodels.api as sm, matplotlib.pyplot as plt
rng = np.random.default_rng(0)
x = np.linspace(1, 10, 200)
y = 2*x + rng.normal(0, x*0.5, 200)

X = sm.add_constant(x)
m = sm.OLS(y, X).fit()
fitted = m.fittedvalues
resid = m.resid
plt.scatter(fitted, resid); plt.axhline(0)
plt.show()
# the "fan shape" reveals heteroscedasticity
```

Fix: robust standard errors (sandwich), or transformations (log).
</details>

<details>
<summary>Exercise 3 — Ridge vs Lasso with correlated features</summary>

```python
import numpy as np
from sklearn.linear_model import Ridge, Lasso
rng = np.random.default_rng(0)
x1 = rng.standard_normal(200)
x2 = x1 + rng.standard_normal(200) * 0.1   # x2 nearly equal to x1
x3 = rng.standard_normal(200)
X = np.column_stack([x1, x2, x3])
y = 2*x1 + 0*x2 + 3*x3 + rng.standard_normal(200)*0.5

for name, m in [('OLS', Ridge(alpha=0)), ('Ridge', Ridge(alpha=1)), ('Lasso', Lasso(alpha=0.1))]:
    m.fit(X, y)
    print(f"{name}: {m.coef_}")
```

Observe: with OLS the coefficients on $x_1$ and $x_2$ are unstable (split the "true" 2 arbitrarily). Ridge balances them. Lasso zeros one (preferable for feature selection).
</details>

<details>
<summary>Exercise 4 — Poisson for counts</summary>

```python
import numpy as np, statsmodels.api as sm
rng = np.random.default_rng(0)
x = rng.uniform(0, 2, 500)
lam = np.exp(0.5 + 1.5*x)
y = rng.poisson(lam)

X = sm.add_constant(x)
m_ols = sm.OLS(y, X).fit()
m_poi = sm.GLM(y, X, family=sm.families.Poisson()).fit()
print("OLS:", m_ols.params)
print("Poisson:", m_poi.params)
# Poisson recovers ~[0.5, 1.5], OLS doesn't (variance scales with mean)
```
</details>

## Takeaways

- OLS = cornerstone. Understanding it = understanding half of statistics.
- 5 Gauss-Markov assumptions; diagnostics via residuals.
- Ridge = stabilizes under multicollinearity. Lasso = feature selection. Elastic Net = compromise.
- GLM = generalizes to Poisson, logistic, Gamma. Same framework.
- High $R^2$ $\neq$ right model. Plot residuals.

Next: logistic regression and binary classification.
