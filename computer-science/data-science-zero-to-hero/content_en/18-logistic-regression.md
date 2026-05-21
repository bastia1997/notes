---
title: "Logistic regression and classification"
area: "Machine Learning"
summary: "Sigmoid, log-loss, odds and log-odds, MLE, multi-class, decision thresholds. 'Logistic' beats NN in 60% of real tabular problems."
order: 18
level: "intermediate"
prereq:
  - "[[linear-regression]]"
  - "[[calculus-optimization]]"
tools:
  - "scikit-learn, statsmodels"
---

# Logistic regression and classification

## Why not OLS for classification

If you apply OLS to $y \in \{0, 1\}$, you get:

- Predictions outside $[0, 1]$ (nonsensical as probabilities).
- Heteroscedasticity (variance depends on $p$).
- Inadequate loss: the model "barely punishes" a certain error (e.g., prediction 0.99 when true is 0).

Solution: **logistic regression**.

## The model

For class-1 probability:

$$P(y=1 | \mathbf{x}) = \sigma(\mathbf{w}^T \mathbf{x} + b) = \frac{1}{1 + e^{-(\mathbf{w}^T \mathbf{x} + b)}}$$

The **sigmoid** $\sigma$ squashes $(-\infty, \infty)$ into $(0, 1)$.

<div class="chart"><svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="160" x2="340" y2="160" stroke="#555"/>
<line x1="180" y1="20" x2="180" y2="160" stroke="#555"/>
<line x1="30" y1="30" x2="340" y2="30" stroke="#333" stroke-dasharray="3,3"/>
<line x1="30" y1="95" x2="340" y2="95" stroke="#333" stroke-dasharray="3,3"/>
<path d="M 30 158 C 130 158 230 32 340 32" fill="none" stroke="#7aa2ff" stroke-width="2.5"/>
<text x="345" y="34" fill="#7aa2ff" font-size="11">1</text>
<text x="345" y="99" fill="#7aa2ff" font-size="11">0.5</text>
<text x="345" y="165" fill="#7aa2ff" font-size="11">0</text>
<text x="185" y="175" fill="#ffb347" font-size="11">z=0</text>
</svg><div class="chart-caption">Sigmoid: linear near 0, saturates at 0 and 1.</div></div>

## Log-odds (logit)

Rearranging:

$$\log \frac{P(y=1|x)}{P(y=0|x)} = \mathbf{w}^T \mathbf{x} + b$$

**Log-odds** is linear in $\mathbf{x}$. Interpretation:

> $w_j$ = log-odds increase for one extra unit of $x_j$.

Exponentiating: $e^{w_j}$ = **odds multiplier** per extra unit of $x_j$. E.g., $w_j = 0.69 \Rightarrow e^{0.69} \approx 2$: presence of that feature **doubles the odds**.

## Loss: log-likelihood

For a single example:

$$P(y_i | \mathbf{x}_i) = p_i^{y_i} (1 - p_i)^{1 - y_i}$$

Likelihood across all examples:

$$L(\mathbf{w}) = \prod_i p_i^{y_i} (1-p_i)^{1-y_i}$$

Log-likelihood (maximize) or **negative cross-entropy** (minimize):

$$-\log L(\mathbf{w}) = -\sum_i [y_i \log p_i + (1 - y_i) \log(1-p_i)]$$

This loss is **convex** in $\mathbf{w}$ → gradient descent finds the global minimum. No closed form like OLS, but convergence is guaranteed.

## Gradient

For those who want to derive:

$$\nabla_{\mathbf{w}} L = X^T (\mathbf{p} - \mathbf{y})$$

where $\mathbf{p}$ is the vector of predicted probabilities. Same form as OLS, with $\mathbf{p}$ in place of $\hat{y}$. Beautiful.

So:

$$\mathbf{w}_{t+1} = \mathbf{w}_t - \eta X^T (\mathbf{p}_t - \mathbf{y})$$

## Example

```python
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)

sc = StandardScaler().fit(X_tr)
X_tr_s = sc.transform(X_tr); X_te_s = sc.transform(X_te)

m = LogisticRegression(C=1.0, max_iter=5000).fit(X_tr_s, y_tr)
print("Accuracy:", m.score(X_te_s, y_te))
print("Coefficients (first 5):", m.coef_[0, :5])
```

> `C` is the **inverse** of regularization: large `C` = little reg, small `C` = strong. Default `C=1.0`.

## Regularization (again)

```python
LogisticRegression(penalty='l2', C=1.0)       # default Ridge-like
LogisticRegression(penalty='l1', solver='liblinear', C=0.5)
LogisticRegression(penalty='elasticnet', solver='saga', l1_ratio=0.5, C=0.5)
```

L1 does automatic feature selection.

## Multi-class: two strategies

### One-vs-Rest (OvR)

$K$ binary classifiers, each "class $k$" vs "everything else". Pick the class with the highest probability.

### Softmax (Multinomial Logistic)

Direct generalization:

$$P(y=k | \mathbf{x}) = \frac{e^{\mathbf{w}_k^T \mathbf{x}}}{\sum_j e^{\mathbf{w}_j^T \mathbf{x}}}$$

Loss = categorical cross-entropy:

$$L = -\sum_i \sum_k \mathbb{1}[y_i=k] \log P(y_i=k|x_i)$$

```python
LogisticRegression(multi_class='multinomial', solver='lbfgs')
```

> sklearn default `'auto'` picks multinomial when solver supports it. Generally better than OvR.

## Decision threshold

By default `predict()` uses threshold 0.5. But 0.5 isn't sacred:

- If **false positives** are costly (e.g., spam blocking important emails) → higher threshold.
- If **false negatives** are costly (e.g., undiagnosed cancer) → lower threshold.

Choose threshold by **cost**:

```python
proba = m.predict_proba(X_te)[:, 1]
y_pred = (proba > 0.3).astype(int)
```

Pro approach: optimize threshold on validation w.r.t. the metric you care about (F1, precision at fixed recall, etc.).

## Classification metrics

See dedicated section. Quick summary:

| Metric | Formula | When |
|---|---|---|
| Accuracy | $(TP+TN)/N$ | balanced classes, equal costs |
| Precision | $TP/(TP+FP)$ | care about positives correctness |
| Recall | $TP/(TP+FN)$ | care about catching all positives |
| F1 | P, R harmonic mean | trade-off |
| AUC ROC | area under ROC | ranking, threshold-independent |
| AUC PR | area under Precision-Recall | for imbalanced classes |
| Log loss | cross-entropy | probability calibration |

## Calibrated probabilities

Logistic produces **fairly calibrated** probabilities by default. Verify with a **reliability diagram**:

```python
from sklearn.calibration import calibration_curve
prob_true, prob_pred = calibration_curve(y_te, m.predict_proba(X_te)[:, 1], n_bins=10)
import matplotlib.pyplot as plt
plt.plot([0,1],[0,1], '--', color='gray')
plt.plot(prob_pred, prob_true, marker='o')
plt.xlabel('Predicted probability'); plt.ylabel('Real fraction')
```

If the curve is below the diagonal: model overestimates. Above: underestimates.

To **calibrate**:
```python
from sklearn.calibration import CalibratedClassifierCV
cal = CalibratedClassifierCV(m, method='sigmoid', cv=5).fit(X_tr, y_tr)
```

> Random Forest and SVM tend to be poorly calibrated. Logistic is already OK.

## Logit in the real world: interpretability

Domains where logistic remains the main model:

- **Medicine**: clinical scoring, calibration critical.
- **Finance/credit**: regulators require interpretability.
- **Marketing**: lift, propensity scoring.
- **Politics/sociology**: understand variable effects.

The fact that `exp(w_j)` is an odds ratio is crucial for communication. "Smoking multiplies lung cancer odds by 15×" is something you can write and people understand.

## Exercises

<details>
<summary>Exercise 1 — Interpreting coefficients</summary>

Logistic model with `age` (years) and `smoker` (0/1). Standardized coefs: $w_\text{age} = 0.04$, $w_\text{smoke} = 1.5$.

- How much do odds increase per extra year?
- How much for being a smoker?

**Answer**: $e^{0.04} \approx 1.041$ → +4.1% per year. $e^{1.5} \approx 4.48$ → odds nearly 4.5× for smokers.
</details>

<details>
<summary>Exercise 2 — Implement logistic from scratch</summary>

```python
import numpy as np

def sigmoid(z): return 1 / (1 + np.exp(-z))

def train(X, y, lr=0.1, n_iter=1000):
    X_ = np.column_stack([np.ones(len(X)), X])
    w = np.zeros(X_.shape[1])
    for _ in range(n_iter):
        p = sigmoid(X_ @ w)
        grad = X_.T @ (p - y) / len(y)
        w -= lr * grad
    return w

# test
rng = np.random.default_rng(0)
X = rng.standard_normal((500, 3))
true_w = np.array([0.5, 1.0, -1.5])
y = (sigmoid(0.2 + X @ true_w) > rng.uniform(size=500)).astype(int)
w_hat = train(X, y, lr=0.5, n_iter=2000)
print("hat:", w_hat)        # ~[0.2, 0.5, 1.0, -1.5]
```
</details>

<details>
<summary>Exercise 3 — Threshold tuning</summary>

For cancer screening, false negatives are catastrophic. Find the threshold producing recall ≥ 0.95:

```python
from sklearn.metrics import precision_recall_curve
proba = m.predict_proba(X_val)[:, 1]
prec, rec, thr = precision_recall_curve(y_val, proba)
mask = rec >= 0.95
idx = np.argmax(prec[:-1] * mask[:-1])
print(f"threshold: {thr[idx]:.3f}, precision: {prec[idx]:.3f}, recall: {rec[idx]:.3f}")
```
</details>

<details>
<summary>Exercise 4 — Logistic vs trees</summary>

On Titanic, train logistic and Random Forest. Compare AUC and interpretability.

```python
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import train_test_split

df = sns.load_dataset('titanic').dropna(subset=['age','embarked'])
y = df.survived
X = df[['pclass','age','sibsp','parch','fare']].assign(
    male=(df.sex == 'male').astype(int)
)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)

sc = StandardScaler().fit(X_tr)
lr = LogisticRegression(max_iter=2000).fit(sc.transform(X_tr), y_tr)
rf = RandomForestClassifier(n_estimators=300, random_state=0).fit(X_tr, y_tr)

print("Logistic AUC:", roc_auc_score(y_te, lr.predict_proba(sc.transform(X_te))[:,1]))
print("RF AUC:", roc_auc_score(y_te, rf.predict_proba(X_te)[:,1]))
print("Logistic coefficients:", dict(zip(X.columns, lr.coef_[0])))
```

Often on Titanic: RF slightly better, but logistic more interpretable.
</details>

## Takeaways

- Logistic = OLS with sigmoid and log-loss.
- Coefficients = log-odds. $e^w$ = odds ratio.
- Convex loss → global minimum.
- Decision threshold: 0.5 default, but rarely optimal for asymmetric costs.
- Calibrated probabilities "out of the box" — more than almost any other model.

Next: KNN and Naive Bayes — simple, still useful models.
