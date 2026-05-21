---
title: "Feature engineering"
area: "Dati"
summary: "Creare feature che catturano segnale. Binning, interazioni, target encoding, feature da date, da testo, da geo. L'80% dell'accuratezza viene da qui."
order: 14
level: "intermedio"
prereq:
  - "[[data-wrangling]]"
tools:
  - "pandas, scikit-learn, featuretools (opzionale)"
---

# Feature engineering

## Perché conta più del modello

> "Coming up with features is difficult, time-consuming, requires expert knowledge. Applied machine learning is basically feature engineering." — Andrew Ng

In una competizione Kaggle vinta tipicamente:
- Modelli base: tutti usano XGBoost/LightGBM con tuning simile.
- **La differenza**: chi ha trovato le feature giuste.

In azienda: una buona feature trovata in 2 ore aumenta l'AUC dello 0.05; lo stesso miglioramento via tuning di hyperparameter richiede settimane.

## Feature numeriche

### Trasformazioni base

```python
# log per skew destra
df['log_amount'] = np.log1p(df['amount'])  # log(1+x), gestisce x=0

# square / sqrt
df['sqrt_count'] = np.sqrt(df['count'])

# polinomiali
df['x_sq'] = df['x'] ** 2
df['x_cubed'] = df['x'] ** 3

# reciproco (anche se attento a x=0)
df['1_over_age'] = 1 / (df['age'] + 1)
```

### Binning / discretizzazione

Trasforma una continua in categoriale. Utile quando la relazione non è lineare.

```python
df['age_bin'] = pd.cut(df['age'], bins=[0, 18, 35, 65, 120],
                       labels=['minor','young','adult','senior'])

# uniforme su quantili
df['amount_dec'] = pd.qcut(df['amount'], q=10, labels=False)

# sklearn
from sklearn.preprocessing import KBinsDiscretizer
kbd = KBinsDiscretizer(n_bins=10, strategy='quantile', encode='ordinal')
```

### Interazioni

Combina feature: `salary / age`, `clicks * cost`, distanze in spazi geo.

```python
df['salary_per_year_exp'] = df['salary'] / (df['years_experience'] + 1)
df['debt_to_income'] = df['debt'] / df['income']

# polinomiali automatiche
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, interaction_only=True)
X_poly = poly.fit_transform(X)
```

> **Caveat**: con $p$ feature, le interazioni $p(p-1)/2$ esplodono in fretta. Usa con criterio.

## Feature categoriali

### One-hot, ordinal, target encoding

```python
# one-hot
df_dummies = pd.get_dummies(df, columns=['city'], drop_first=True)

# ordinal con ordine esplicito
from sklearn.preprocessing import OrdinalEncoder
oe = OrdinalEncoder(categories=[['low','mid','high']])
df['level'] = oe.fit_transform(df[['level']])

# target encoding (mean encoding)
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

Funziona perché la **rarità** è spesso informativa.

### Hashing trick

Per categoriali con migliaia di valori (es: URL, user_id):

```python
from sklearn.feature_extraction import FeatureHasher
fh = FeatureHasher(n_features=64, input_type='string')
X_hash = fh.transform(df['url'].astype(str).values.reshape(-1, 1))
```

Mappa categorie in uno spazio fisso di dimensione $n$. Collisioni accettabili.

### Embedding (per categorie ad alta cardinalità)

In deep learning, ogni categoria diventa un vettore appreso. Vedi sezione embedding/NN.

## Feature da date

Una colonna `datetime` da sola è inutile per modelli classici. Estrai:

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

### Ciclicità

Hour=23 e hour=0 sono "vicini" ma il modello non lo sa se hour è numerico. Codifica con seno/coseno:

$$\text{hour\_sin} = \sin\left(\frac{2\pi \cdot \text{hour}}{24}\right), \quad \text{hour\_cos} = \cos\left(\frac{2\pi \cdot \text{hour}}{24}\right)$$

```python
df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)
df['dow_sin'] = np.sin(2 * np.pi * df['dow'] / 7)
df['dow_cos'] = np.cos(2 * np.pi * df['dow'] / 7)
```

Pattern usatissimo in time series.

### Feature lag, rolling, expanding

Per dati temporali:

```python
df = df.sort_values(['user_id', 'ts'])
df['amount_lag1'] = df.groupby('user_id')['amount'].shift(1)
df['amount_ma7'] = df.groupby('user_id')['amount'].transform(lambda s: s.rolling(7).mean())
df['amount_diff'] = df.groupby('user_id')['amount'].diff()
df['days_since_last_event'] = df.groupby('user_id')['ts'].diff().dt.days
df['cumsum_amount'] = df.groupby('user_id')['amount'].cumsum()
```

> **Attenzione al data leakage** nelle time series: usare solo dati `≤ t` per costruire feature di tempo $t$. `shift(1)` è l'amico, `rolling().mean()` include il valore corrente — usalo solo dopo aver shifted.

## Feature aggregate (group-level)

Per ogni utente, riassumi il suo storico:

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

Pattern RFM (Recency, Frequency, Monetary) — base per modelli di churn.

## Feature da testo

Dalle base al moderno:

### Bag-of-words / TF-IDF

```python
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(ngram_range=(1,2), min_df=5, max_df=0.95, max_features=20_000)
X_text = tfidf.fit_transform(df['review'])
```

Output: matrice sparsa $n \times d$ con $d$ ~ migliaia.

### Statistiche del testo

```python
df['n_chars'] = df['text'].str.len()
df['n_words'] = df['text'].str.split().str.len()
df['avg_word_len'] = df['n_chars'] / df['n_words']
df['n_punct'] = df['text'].str.count(r'[.!?;,]')
df['n_uppercase'] = df['text'].str.count(r'[A-Z]')
df['has_url'] = df['text'].str.contains(r'http', regex=True).astype(int)
```

### Embedding semantici (moderno)

```python
from sentence_transformers import SentenceTransformer
m = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
embeddings = m.encode(df['review'].tolist())  # (n, 384)
```

384 feature dense che catturano semantica. Sostituiscono TF-IDF in molti task moderni.

## Feature da geo

```python
# distanza tra due punti (Haversine)
def haversine(lat1, lon1, lat2, lon2):
    R = 6371                          # km
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat/2)**2 + np.cos(lat1)*np.cos(lat2)*np.sin(dlon/2)**2
    return 2 * R * np.arcsin(np.sqrt(a))

df['dist_from_center'] = haversine(df.lat, df.lon, 45.464, 9.190)  # Milano
```

Altre feature geo: zip code → reddito medio aggregato, cluster spaziali (k-means su lat/lon), densità di POI nelle vicinanze (OpenStreetMap).

## Feature selection

Quando hai 1000+ feature, scartane di inutili:

### Filtri statistici

```python
from sklearn.feature_selection import SelectKBest, mutual_info_classif, f_classif
sel = SelectKBest(mutual_info_classif, k=50).fit(X, y)
```

- `f_classif` / `chi2`: relazione lineare/categoriale.
- `mutual_info_classif`: cattura anche non linearità.

### Wrapper

- **Forward selection**: aggiungi feature una alla volta.
- **Backward elimination**: parti con tutte e rimuovi.
- **Recursive Feature Elimination (RFE)**: usa importance di un modello per rimuovere le peggiori.

```python
from sklearn.feature_selection import RFECV
rfe = RFECV(estimator=RandomForestClassifier(n_estimators=100), cv=5)
rfe.fit(X, y)
```

### Embedded (regolarizzazione)

Lasso (L1) azzera coefficienti irrilevanti. Random Forest / Boosting forniscono feature importance.

```python
from sklearn.linear_model import LassoCV
ls = LassoCV().fit(X, y)
selected = ls.coef_ != 0
```

## Workflow: pipeline scikit-learn

Per non duplicare codice tra train e test, e per evitare leakage:

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

**Tutto** (imputazione, scaling, encoding, modello) impacchettato. Quando salvi `full` con joblib, ricostruisci la pipeline su dati nuovi senza pensare.

## Esercizi

<details>
<summary>Esercizio 1 — RFM features</summary>

Per `orders(user_id, order_date, amount)`, costruisci feature R(ecency), F(requency), M(onetary).

```python
ref = orders.order_date.max()
rfm = orders.groupby('user_id').agg(
    recency=('order_date', lambda s: (ref - s.max()).days),
    frequency=('order_date', 'count'),
    monetary=('amount', 'sum'),
)
# spesso si normalizzano in decili
for c in rfm.columns:
    rfm[c + '_dec'] = pd.qcut(rfm[c], 10, labels=False, duplicates='drop')
```
</details>

<details>
<summary>Esercizio 2 — Time features cicliche</summary>

Genera 8760 timestamp orari (un anno). Plotta x=hour vs sin/cos per vedere la ciclicità.

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

Forma un cerchio. Cycle preservation done.
</details>

<details>
<summary>Esercizio 3 — Target encoding senza leak</summary>

Implementa target encoding con K-fold per evitare leak:

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

Lo smoothing pondera tra media per categoria e media globale: utile per categorie rare.
</details>

<details>
<summary>Esercizio 4 — Feature importance con Random Forest</summary>

```python
from sklearn.ensemble import RandomForestClassifier
m = RandomForestClassifier(n_estimators=200, random_state=0).fit(X, y)
imp = pd.Series(m.feature_importances_, index=X.columns).sort_values(ascending=False)
print(imp.head(20))
imp.head(20).plot.barh()
```

Bonus: usa **permutation importance** (più affidabile):

```python
from sklearn.inspection import permutation_importance
r = permutation_importance(m, X_val, y_val, n_repeats=10, random_state=0)
pd.Series(r.importances_mean, index=X.columns).sort_values(ascending=False).head(20).plot.barh()
```
</details>

## Cosa portarti via

- Feature engineering > model tuning, di solito.
- Date → tante feature derivate, possibilmente cicliche.
- Categoriche ad alta cardinalità: target encoding con CV, oppure hashing, oppure embedding.
- Pipeline scikit-learn salvano vita.
- Permutation importance > feature_importance_ "naive".

Prossimo: EDA — il workflow di esplorazione su un dataset reale.
