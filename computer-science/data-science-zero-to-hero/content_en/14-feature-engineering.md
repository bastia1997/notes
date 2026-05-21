---
title: "Feature engineering"
area: "Data"
summary: "Building features that capture signal. Binning, interactions, target encoding, features from dates, text, geo. 80% of accuracy comes from here."
order: 14
level: "intermediate"
prereq:
  - "[[data-wrangling]]"
tools:
  - "pandas, scikit-learn, featuretools (optional)"
---

# Feature engineering

## Why it matters more than the model

> "Coming up with features is difficult, time-consuming, requires expert knowledge. Applied machine learning is basically feature engineering." — Andrew Ng

In a winning Kaggle entry, typically:
- Base models: everyone uses XGBoost/LightGBM with similar tuning.
- **The difference**: who found the right features.

At work: a good feature found in 2 hours raises AUC by 0.05; the same improvement via hyperparameter tuning takes weeks.

## Numeric features

### Basic transformations

```python
df['log_amount'] = np.log1p(df['amount'])  # log(1+x), handles x=0

df['sqrt_count'] = np.sqrt(df['count'])

df['x_sq'] = df['x'] ** 2
df['x_cubed'] = df['x'] ** 3

df['1_over_age'] = 1 / (df['age'] + 1)
```

### Binning / discretization

Turns a continuous variable into categorical. Useful when relationship is nonlinear.

```python
df['age_bin'] = pd.cut(df['age'], bins=[0, 18, 35, 65, 120],
                       labels=['minor','young','adult','senior'])

df['amount_dec'] = pd.qcut(df['amount'], q=10, labels=False)

from sklearn.preprocessing import KBinsDiscretizer
kbd = KBinsDiscretizer(n_bins=10, strategy='quantile', encode='ordinal')
```

### Interactions

Combine features: `salary / age`, `clicks * cost`, geo distances.

```python
df['salary_per_year_exp'] = df['salary'] / (df['years_experience'] + 1)
df['debt_to_income'] = df['debt'] / df['income']

from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, interaction_only=True)
X_poly = poly.fit_transform(X)
```

> **Caveat**: with $p$ features, interactions $p(p-1)/2$ explode fast. Use carefully.

## Categorical features

### One-hot, ordinal, target encoding

```python
df_dummies = pd.get_dummies(df, columns=['city'], drop_first=True)

from sklearn.preprocessing import OrdinalEncoder
oe = OrdinalEncoder(categories=[['low','mid','high']])
df['level'] = oe.fit_transform(df[['level']])

from category_encoders import TargetEncoder
te = TargetEncoder(cols=['city'])
X_train_enc = te.fit_transform(X_train, y_train)
X_test_enc = te.transform(X_test)
```

### Frequency / count encoding

```python
freq = df['city'].value_counts(normalize=True)
df['city_freq'] = df['city'].map(freq)
```

Works because **rarity** is often informative.

### Hashing trick

For categoricals with thousands of values (e.g., URL, user_id):

```python
from sklearn.feature_extraction import FeatureHasher
fh = FeatureHasher(n_features=64, input_type='string')
X_hash = fh.transform(df['url'].astype(str).values.reshape(-1, 1))
```

Maps categories into a fixed-size $n$ space. Collisions acceptable.

### Embedding (for high-cardinality categoricals)

In deep learning, each category becomes a learned vector. See embedding/NN section.

## Date features

A `datetime` column alone is useless for classic models. Extract:

```python
df['hour'] = df['ts'].dt.hour
df['dow'] = df['ts'].dt.dayofweek          # 0=Mon
df['week'] = df['ts'].dt.isocalendar().week
df['month'] = df['ts'].dt.month
df['quarter'] = df['ts'].dt.quarter
df['is_weekend'] = df['dow'].isin([5, 6]).astype(int)
df['is_business_hours'] = df['hour'].between(9, 17).astype(int)
df['days_since_epoch'] = (df['ts'] - pd.Timestamp('1970-01-01')).dt.days
```

### Cyclicity

Hour=23 and hour=0 are "close" but the model doesn't know if hour is numeric. Encode with sine/cosine:

$$\text{hour\_sin} = \sin\left(\frac{2\pi \cdot \text{hour}}{24}\right), \quad \text{hour\_cos} = \cos\left(\frac{2\pi \cdot \text{hour}}{24}\right)$$

```python
df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)
df['dow_sin'] = np.sin(2 * np.pi * df['dow'] / 7)
df['dow_cos'] = np.cos(2 * np.pi * df['dow'] / 7)
```

Heavily used in time series.

### Lag, rolling, expanding features

For temporal data:

```python
df = df.sort_values(['user_id', 'ts'])
df['amount_lag1'] = df.groupby('user_id')['amount'].shift(1)
df['amount_ma7'] = df.groupby('user_id')['amount'].transform(lambda s: s.rolling(7).mean())
df['amount_diff'] = df.groupby('user_id')['amount'].diff()
df['days_since_last_event'] = df.groupby('user_id')['ts'].diff().dt.days
df['cumsum_amount'] = df.groupby('user_id')['amount'].cumsum()
```

> **Watch for data leakage** in time series: only use data `≤ t` to build features at time $t$. `shift(1)` is your friend; `rolling().mean()` includes the current value — use it only after shifting.

## Aggregate (group-level) features

For each user, summarize their history:

```python
agg = df.groupby('user_id').agg(
    total_spent=('amount', 'sum'),
    avg_order=('amount', 'mean'),
    n_orders=('amount', 'count'),
    first_order=('ts', 'min'),
    last_order=('ts', 'max'),
    unique_products=('product_id', 'nunique'),
).reset_index()
agg['days_active'] = (agg.last_order - agg.first_order).dt.days
agg['recency_days'] = (df.ts.max() - agg.last_order).dt.days
```

RFM pattern (Recency, Frequency, Monetary) — base for churn models.

## Text features

From basic to modern:

### Bag-of-words / TF-IDF

```python
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(ngram_range=(1,2), min_df=5, max_df=0.95, max_features=20_000)
X_text = tfidf.fit_transform(df['review'])
```

Output: sparse $n \times d$ matrix with $d$ ~ thousands.

### Text statistics

```python
df['n_chars'] = df['text'].str.len()
df['n_words'] = df['text'].str.split().str.len()
df['avg_word_len'] = df['n_chars'] / df['n_words']
df['n_punct'] = df['text'].str.count(r'[.!?;,]')
df['n_uppercase'] = df['text'].str.count(r'[A-Z]')
df['has_url'] = df['text'].str.contains(r'http', regex=True).astype(int)
```

### Semantic embeddings (modern)

```python
from sentence_transformers import SentenceTransformer
m = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
embeddings = m.encode(df['review'].tolist())  # (n, 384)
```

384 dense features capturing semantics. Replace TF-IDF in many modern tasks.

## Geo features

```python
def haversine(lat1, lon1, lat2, lon2):
    R = 6371                          # km
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat/2)**2 + np.cos(lat1)*np.cos(lat2)*np.sin(dlon/2)**2
    return 2 * R * np.arcsin(np.sqrt(a))

df['dist_from_center'] = haversine(df.lat, df.lon, 45.464, 9.190)  # Milan
```

Other geo features: zip code → aggregated mean income, spatial clusters (k-means on lat/lon), POI density (OpenStreetMap).

## Feature selection

When you have 1000+ features, discard useless ones:

### Statistical filters

```python
from sklearn.feature_selection import SelectKBest, mutual_info_classif, f_classif
sel = SelectKBest(mutual_info_classif, k=50).fit(X, y)
```

- `f_classif` / `chi2`: linear/categorical relation.
- `mutual_info_classif`: captures nonlinearity too.

### Wrappers

- **Forward selection**: add features one at a time.
- **Backward elimination**: start with all, remove.
- **Recursive Feature Elimination (RFE)**: use model importance to remove worst.

```python
from sklearn.feature_selection import RFECV
rfe = RFECV(estimator=RandomForestClassifier(n_estimators=100), cv=5)
rfe.fit(X, y)
```

### Embedded (regularization)

Lasso (L1) zeros out irrelevant coefficients. Random Forest / Boosting provide feature importance.

```python
from sklearn.linear_model import LassoCV
ls = LassoCV().fit(X, y)
selected = ls.coef_ != 0
```

## Workflow: scikit-learn pipeline

To avoid duplicating code train/test and prevent leakage:

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

numeric = ['age', 'income']
cat = ['country', 'plan']

pre = ColumnTransformer([
    ('num', Pipeline([
        ('imp', SimpleImputer(strategy='median')),
        ('sc', StandardScaler()),
    ]), numeric),
    ('cat', Pipeline([
        ('imp', SimpleImputer(strategy='constant', fill_value='UNKNOWN')),
        ('oh', OneHotEncoder(handle_unknown='ignore')),
    ]), cat),
])

full = Pipeline([
    ('pre', pre),
    ('clf', RandomForestClassifier()),
])
full.fit(X_train, y_train)
```

**Everything** (imputation, scaling, encoding, model) bundled. Save `full` with joblib, rebuild on new data without thinking.

## Exercises

<details>
<summary>Exercise 1 — RFM features</summary>

For `orders(user_id, order_date, amount)`, build R(ecency), F(requency), M(onetary) features.

```python
ref = orders.order_date.max()
rfm = orders.groupby('user_id').agg(
    recency=('order_date', lambda s: (ref - s.max()).days),
    frequency=('order_date', 'count'),
    monetary=('amount', 'sum'),
)
for c in rfm.columns:
    rfm[c + '_dec'] = pd.qcut(rfm[c], 10, labels=False, duplicates='drop')
```
</details>

<details>
<summary>Exercise 2 — Cyclical time features</summary>

Generate 8760 hourly timestamps (a year). Plot x=hour vs sin/cos to see cyclicity.

```python
import pandas as pd, numpy as np, matplotlib.pyplot as plt
ts = pd.date_range('2025-01-01', periods=8760, freq='H')
df = pd.DataFrame({'ts': ts})
df['hour'] = df.ts.dt.hour
df['hsin'] = np.sin(2*np.pi*df.hour/24)
df['hcos'] = np.cos(2*np.pi*df.hour/24)
plt.scatter(df.hsin[:48], df.hcos[:48])
plt.gca().set_aspect('equal'); plt.show()
```

Forms a circle. Cycle preservation done.
</details>

<details>
<summary>Exercise 3 — Target encoding without leakage</summary>

Implement K-fold target encoding:

```python
import numpy as np, pandas as pd
from sklearn.model_selection import KFold

def kfold_target_encode(X, y, col, n_splits=5, smoothing=10):
    kf = KFold(n_splits, shuffle=True, random_state=0)
    enc = pd.Series(index=X.index, dtype='float64')
    global_mean = y.mean()
    for tr, va in kf.split(X):
        agg = pd.DataFrame({col: X[col].iloc[tr], 'y': y.iloc[tr]})
        means = agg.groupby(col)['y'].agg(['mean','count'])
        smoothed = (means['mean']*means['count'] + global_mean*smoothing) / (means['count']+smoothing)
        enc.iloc[va] = X[col].iloc[va].map(smoothed).fillna(global_mean)
    return enc
```

Smoothing balances per-category mean and global mean: useful for rare categories.
</details>

<details>
<summary>Exercise 4 — Random Forest feature importance</summary>

```python
from sklearn.ensemble import RandomForestClassifier
m = RandomForestClassifier(n_estimators=200, random_state=0).fit(X, y)
imp = pd.Series(m.feature_importances_, index=X.columns).sort_values(ascending=False)
print(imp.head(20))
imp.head(20).plot.barh()
```

Bonus: use **permutation importance** (more reliable):

```python
from sklearn.inspection import permutation_importance
r = permutation_importance(m, X_val, y_val, n_repeats=10, random_state=0)
pd.Series(r.importances_mean, index=X.columns).sort_values(ascending=False).head(20).plot.barh()
```
</details>

## Takeaways

- Feature engineering > model tuning, usually.
- Dates → many derived features, possibly cyclical.
- High-cardinality categoricals: target encoding with CV, hashing, or embedding.
- Scikit-learn pipelines save your life.
- Permutation importance > naive `feature_importance_`.

Next: EDA — the workflow for exploring a real dataset.
