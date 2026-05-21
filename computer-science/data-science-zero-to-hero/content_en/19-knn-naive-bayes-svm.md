---
title: "KNN, Naive Bayes, SVM"
area: "Machine Learning"
summary: "Three 'classic' families still winning in specific scenarios. When and why."
order: 19
level: "intermediate"
prereq:
  - "[[ml-fundamentals]]"
tools:
  - "scikit-learn"
---

# KNN, Naive Bayes, SVM

## K-Nearest Neighbors

### Idea

> To predict $y$ for a new point $x$, look at the $k$ closest points in the training set and "average" (regression) or "vote" (classification).

No real "training": the model is the dataset itself. Inference is costly ($O(n)$ per query naively), optimized with data structures: **KD-Tree** ($d \leq 20$), **Ball Tree**, **HNSW** or **FAISS** for high-dim.

### Pseudocode

```python
def knn_predict(x_query, X_train, y_train, k=5):
    d = ((X_train - x_query)**2).sum(axis=1)   # squared euclidean distances
    nn = np.argsort(d)[:k]
    return np.bincount(y_train[nn]).argmax()   # majority vote
```

### Hyperparameters

| | Effect |
|---|---|
| small $k$ (1, 3) | flexible, low bias, high variance |
| large $k$ (50+) | smooth, high bias, low variance |
| **Distance** | euclidean (default), Manhattan, cosine for text |
| **Weights** | uniform or distance-inverse |

### When to use

- Small–medium dataset ($n < 10^5$).
- Few features ($d < 20$, else **curse of dimensionality**).
- Complex, nonlinear decision boundaries.

### When NOT to use

- Large $d$: in high dimensions distances "collapse" (all points look similar).
- Real-time inference on big data.
- Features on different scales (always scale!).

### Example

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
sc = StandardScaler().fit(X_tr)
knn = KNeighborsClassifier(n_neighbors=5, weights='distance').fit(sc.transform(X_tr), y_tr)
```

> KNN for regression: `KNeighborsRegressor`. Predicts mean of $k$ neighbors.

## Naive Bayes

### Idea

Apply Bayes assuming **conditional independence** of features given target:

$$P(y | x_1, \dots, x_p) \propto P(y) \prod_{j=1}^p P(x_j | y)$$

The assumption is almost always **false**, hence "naive". But works great in practice for many tasks, especially NLP.

### Variants

| Version | For which features |
|---|---|
| **GaussianNB** | continuous, ~normal per class |
| **MultinomialNB** | counts (e.g., word counts) |
| **BernoulliNB** | binary (e.g., word present/absent) |
| **ComplementNB** | like Multinomial, better on imbalanced classes |

### Example: spam classification

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

pipe = Pipeline([
    ('vec', CountVectorizer(ngram_range=(1,2))),
    ('nb', MultinomialNB(alpha=0.5)),  # alpha = Laplace smoothing
])
pipe.fit(X_train_text, y_train)
```

### Smoothing (why needed)

If a word never appeared in the "spam" class in training, $P(\text{word}|\text{spam}) = 0$ → entire probability becomes zero, unusable.

**Laplace smoothing**: add a pseudo-count $\alpha$ to all:

$$P(x_j | y) = \frac{\text{count}(x_j, y) + \alpha}{\text{count}(y) + \alpha V}$$

### When to use Naive Bayes

- Super-fast baseline for text (1 minute, AUC ~0.9 often).
- Very little data (NB handles small well).
- Ultra-fast inference required.
- Naturally independent features (rare).

## Support Vector Machines (SVM)

### Idea: maximize the margin

Find the hyperplane that **separates two classes with the widest possible margin**.

<div class="chart"><svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="170" x2="320" y2="40" stroke="#7aa2ff" stroke-width="2.5"/>
<line x1="60" y1="190" x2="320" y2="60" stroke="#7aa2ff" stroke-dasharray="4,4" stroke-width="1.5"/>
<line x1="60" y1="150" x2="320" y2="20" stroke="#7aa2ff" stroke-dasharray="4,4" stroke-width="1.5"/>
<circle cx="100" cy="160" r="6" fill="#ffb347"/>
<circle cx="130" cy="180" r="6" fill="#ffb347"/>
<circle cx="170" cy="135" r="6" fill="#ffb347" stroke="#fff" stroke-width="2"/>
<circle cx="220" cy="60" r="6" fill="#5ee2c4"/>
<circle cx="260" cy="40" r="6" fill="#5ee2c4"/>
<circle cx="200" cy="80" r="6" fill="#5ee2c4" stroke="#fff" stroke-width="2"/>
<text x="60" y="195" fill="#8b949e" font-size="11">class -</text>
<text x="260" y="20" fill="#8b949e" font-size="11">class +</text>
<text x="135" y="115" fill="#7aa2ff" font-size="11">margin</text>
</svg><div class="chart-caption">Linear SVM: maximizes the "road" between classes. Points on the road are "support vectors".</div></div>

Mathematically: minimize $\|\mathbf{w}\|^2$ subject to $y_i (\mathbf{w}^T \mathbf{x}_i + b) \geq 1$.

In **soft margin** form (for not perfectly separable data):

$$\min_{w,b} \frac{1}{2}\|w\|^2 + C \sum_i \xi_i \quad \text{s.t. } y_i(w^T x_i + b) \geq 1 - \xi_i, \xi_i \geq 0$$

$C$ controls the trade-off: high $C$ = strongly penalizes errors (overfit risk), low $C$ = more tolerant.

### Hinge loss

The equivalent SVM loss:

$$L = \max(0, 1 - y_i (w^T x_i + b))$$

(with $y \in \{-1, +1\}$.) "Zero if I classify correctly with margin ≥ 1, otherwise pay the distance from the margin."

### Kernel trick

For not-linearly separable data, map to a higher-dimensional space where they are. The "trick" is not computing $\phi(x)$ explicitly, but using a **kernel** $K(x, x') = \phi(x)^T \phi(x')$:

| Kernel | $K(x, x')$ | Use |
|---|---|---|
| Linear | $x^T x'$ | linearly separable |
| Polynomial | $(x^T x' + c)^d$ | interactions |
| RBF (Gaussian) | $\exp(-\gamma \|x - x'\|^2)$ | default, flexible |
| Sigmoid | $\tanh(\gamma x^T x' + c)$ | rare |

```python
from sklearn.svm import SVC
SVC(kernel='rbf', C=1.0, gamma='scale').fit(X_tr_s, y_tr)
```

### Hyperparameters

- **C**: regularization (inverse). Typical: `np.logspace(-2, 2, 10)`.
- **gamma** (RBF): kernel width. `'scale' = 1/(n_features * X.var())`, sensible default.

### When to use SVM

- **Medium** dataset ($n < 10^5$ — SVM scales badly, $\sim O(n^2)$).
- $p > n$ (more features than examples): SVM handles well.
- Complex but "readable margin" decision boundaries.
- NLP with TF-IDF + Linear SVM is a classic baseline, still competitive.

### When NOT to use SVM

- Huge dataset ($n > 10^6$).
- Need calibrated probabilities (SVM doesn't give them naturally, calibrate with Platt).
- Want interpretability (linear OK, RBF no).

## Comparison

| | KNN | Naive Bayes | SVM (RBF) | Logistic |
|---|---|---|---|---|
| Training | instant | very fast | $O(n^2)$ | $O(n p)$ |
| Inference | $O(n)$ naive | $O(p)$ | $O(p \cdot n_{SV})$ | $O(p)$ |
| Multi-class | native | native | OvR/OvO | softmax |
| Probabilities | via neighbors | yes | manual calibration | yes |
| Feature scaling | mandatory | often no | mandatory | recommended |
| Tabular | OK but marginal | text basis | ok but data-hungry | gold standard |

## Exercises

<details>
<summary>Exercise 1 — KNN on Iris</summary>

```python
from sklearn.datasets import load_iris
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score
import matplotlib.pyplot as plt

X, y = load_iris(return_X_y=True)
acc = [cross_val_score(KNeighborsClassifier(k), X, y, cv=5).mean() for k in range(1, 30)]
plt.plot(range(1, 30), acc); plt.xlabel('k'); plt.ylabel('CV accuracy')
```

Typical sweet spot $k=5-15$. With $k=1$ overfit, $k=100$ underfit.
</details>

<details>
<summary>Exercise 2 — Spam with MultinomialNB</summary>

```python
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
data = pd.DataFrame({
    'text': ['win prize free!!','hello come tomorrow','free win money click','meeting at 3pm',
             'cheap meds discount','let\'s grab lunch'],
    'label':[1,0,1,0,1,0]
})
X_tr, X_te, y_tr, y_te = train_test_split(data.text, data.label, test_size=0.3, random_state=0)
```

Even with 6 examples NB learns something. On a real SMS spam dataset (~5500 examples) it reaches ~98% accuracy in 1 second.
</details>

<details>
<summary>Exercise 3 — SVM with grid search</summary>

```python
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

pipe = Pipeline([('sc', StandardScaler()), ('svm', SVC())])
grid = {
    'svm__C': [0.01, 0.1, 1, 10],
    'svm__gamma': [0.01, 0.1, 1, 'scale'],
    'svm__kernel': ['rbf'],
}
gs = GridSearchCV(pipe, grid, cv=5, scoring='roc_auc', n_jobs=-1)
gs.fit(X, y)
print(gs.best_params_, gs.best_score_)
```
</details>

<details>
<summary>Exercise 4 — Compare 4 models</summary>

On `load_breast_cancer`, compare KNN, NB, SVM, Logistic. Compare accuracy, AUC, training time, inference time.

```python
import time
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, roc_auc_score

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)
sc = StandardScaler().fit(X_tr); X_tr_s = sc.transform(X_tr); X_te_s = sc.transform(X_te)

models = {
    'NB': GaussianNB(),
    'KNN': KNeighborsClassifier(7),
    'SVM': SVC(probability=True),
    'Logistic': LogisticRegression(max_iter=2000),
}
for name, m in models.items():
    t = time.perf_counter()
    m.fit(X_tr_s, y_tr)
    t_fit = time.perf_counter() - t
    t = time.perf_counter()
    proba = m.predict_proba(X_te_s)[:, 1]
    t_pred = time.perf_counter() - t
    print(f"{name:8s} fit={t_fit:.3f}s pred={t_pred:.4f}s "
          f"AUC={roc_auc_score(y_te, proba):.3f}")
```
</details>

## Takeaways

- KNN: zero training, instance-based, suffers in high dim.
- Naive Bayes: "naive" assumption that works, text basis, classic NLP.
- SVM: maximize margin, kernel trick for nonlinearity, scales poorly.
- Logistic usually remains the default for engineered-feature tabular tasks.

Next: decision trees.
