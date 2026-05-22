---
title: "Pandas: il coltellino svizzero"
area: "Tooling"
summary: "Series, DataFrame, indici, merge, group by, pivot, time series. Gli idiomi pandas che ti distinguono dai tutorial mediocri."
order: 10
level: "intermedio"
prereq:
  - "[[numpy]]"
tools:
  - "pandas 2.x"
---

# Pandas: il coltellino svizzero

## Perché pandas

Per dati tabellari, pandas è lo standard de facto. Se vieni da Excel, è "Excel su steroidi". Se vieni da SQL, è "SQL ma in memoria, con più espressività". È la libreria su cui passi il 60% delle ore.

> Pandas 2.x ha introdotto un backend Arrow opzionale che lo rende drammaticamente più veloce. `pd.options.future.infer_string = True` e usa `dtype="string[pyarrow]"` se ti pesa la memoria.

## Series e DataFrame

```python
import pandas as pd
import numpy as np

# Series = colonna con etichette
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'], name='temp')
s['b']         # 20
s.values       # numpy array
s.index        # Index(['a','b','c'])

# DataFrame = tabella
df = pd.DataFrame({
    'nome': ['Alice', 'Bob', 'Claire'],
    'eta': [30, 25, 35],
    'salary': [50000, 60000, 75000],
})
df.shape       # (3, 3)
df.dtypes
df.info()
df.describe()
```

## Lettura/scrittura

```python
df = pd.read_csv("data.csv")
df = pd.read_csv("data.csv", parse_dates=['date'], dtype={'id': 'int32'})
df = pd.read_parquet("data.parquet")    # MOLTO più veloce di CSV
df = pd.read_excel("data.xlsx", sheet_name=0)
df = pd.read_sql("SELECT * FROM users", conn)
df = pd.read_json("data.json")

df.to_parquet("out.parquet", compression='snappy')
df.to_csv("out.csv", index=False)
```

> **Regola d'oro**: per dati > 100 MB usa Parquet o Feather, mai CSV. Più rapido (10-100x), tiene il dtype, comprime bene.

## Selezione: `loc`, `iloc`, `[]`

| | Cosa fa |
|---|---|
| `df[col]` | una colonna (Series) |
| `df[[col1, col2]]` | più colonne (DataFrame) |
| `df[bool_mask]` | filtra righe |
| `df.loc[righe, colonne]` | per **etichetta** |
| `df.iloc[i, j]` | per **posizione intera** |
| `df.at[r, c]` | scalare per etichetta (fastest) |
| `df.iat[i, j]` | scalare per posizione (fastest) |

```python
# selezioni tipiche
df[df['eta'] > 30]                          # filter
df.loc[df['eta'] > 30, ['nome', 'salary']]  # filter + colonne
df.loc[0:2, 'nome':'eta']                   # slice etichette (inclusivo!)
df.iloc[0:2, 0:2]                            # slice posizionale (esclusivo!)
```

> Attenzione: `df.loc[0:2]` include 0, 1, **e 2**. `df.iloc[0:2]` include 0, 1.

## Le 5 operazioni che fai ogni giorno

### 1. Filtrare

```python
# multi-condizione
df[(df.eta > 30) & (df.salary > 60000)]
df.query("eta > 30 and salary > 60000")     # alternativa più leggibile

# isin / between
df[df.city.isin(['Roma', 'Milano'])]
df[df.eta.between(25, 40)]

# stringhe
df[df.nome.str.startswith('A')]
df[df.email.str.contains('@gmail', na=False)]
```

### 2. Creare colonne

```python
df['salary_eur'] = df['salary'] * 0.92
df['eta_cat'] = pd.cut(df.eta, bins=[0, 30, 50, 100], labels=['young','mid','old'])
df['log_salary'] = np.log1p(df.salary)

# assign (per pipeline)
df = (
    df
    .assign(salary_eur=lambda d: d.salary * 0.92)
    .assign(senior=lambda d: d.eta >= 35)
)
```

> Usare `assign` con lambda permette di costruire pipeline immutabili. Preferibile a modificare `df` in-place.

### 3. Group by

L'operazione regina:

```python
# media salary per città
df.groupby('city')['salary'].mean()

# multi-aggregazione
df.groupby('city').agg(
    avg_salary=('salary', 'mean'),
    n=('id', 'count'),
    max_eta=('eta', 'max'),
)

# group by multipli, output multi-index
df.groupby(['city', 'gender'])['salary'].mean().unstack()
```

### 4. Merge / join

Come SQL:

```python
m = pd.merge(orders, users, on='user_id', how='left')

# chiavi con nomi diversi
m = pd.merge(orders, users, left_on='uid', right_on='id', how='inner')

# tipi: inner, left, right, outer, cross
```

**Concat** è diverso: incolla DataFrame, non fa join.

```python
pd.concat([df1, df2], axis=0)   # stack verticale (più righe)
pd.concat([df1, df2], axis=1)   # affianca (più colonne)
```

### 5. Pivot / melt

```python
# wide ← long
wide = df.pivot(index='date', columns='product', values='sales')

# long ← wide
long = wide.reset_index().melt(id_vars='date', var_name='product', value_name='sales')

# pivot_table con aggregazione
pt = df.pivot_table(
    index='city', columns='product',
    values='sales', aggfunc='sum', fill_value=0
)
```

## Missing values

```python
df.isna().sum()                # conta NaN per colonna
df.dropna()                    # rimuove righe con QUALSIASI NaN
df.dropna(subset=['col'])      # solo se NaN in 'col'
df.fillna(0)
df.fillna(df.mean())           # media per colonna
df.fillna(method='ffill')      # forward fill (utile in time series)

# imputer più seri (sklearn)
from sklearn.impute import SimpleImputer, KNNImputer
```

> **Mai** rimuovere righe NaN senza pensare. Spesso il fatto che siano NaN è informativo (un campo non compilato è una scelta). Considera un'ulteriore flag `_was_missing`.

## Time series

Pandas è eccellente con il tempo.

```python
df['date'] = pd.to_datetime(df['date'])
df.set_index('date', inplace=True)

# resample
daily = df['value'].resample('D').sum()
monthly = df['value'].resample('M').mean()

# accessor .dt
df['date'].dt.year
df['date'].dt.dayofweek
df['date'].dt.is_month_end

# shift / diff / rolling
df['lag1'] = df['value'].shift(1)
df['delta'] = df['value'].diff()
df['ma7'] = df['value'].rolling(7).mean()
df['ema'] = df['value'].ewm(alpha=0.3).mean()
```

## Performance: 5 regole

1. **Mai `iterrows` o `apply` riga-per-riga** se puoi fare in modo vettorizzato. 100-1000× più lento.
2. **Categorical** per colonne con pochi valori unici → meno RAM, group by più rapido.
3. **Parquet** invece di CSV.
4. **Set index** per merge frequenti sulla stessa chiave.
5. **`pl.read_csv` di Polars** se davvero pandas non basta — sintassi simile, 10x più veloce per molti use case.

```python
df['city'] = df['city'].astype('category')
df = df.set_index('user_id')
```

## Anti-pattern frequenti

```python
# MALE
new_df = pd.DataFrame()
for i in range(len(df)):
    new_df = new_df.append(df.iloc[i])    # O(n²)

# BENE: vettorizza, o list + concat
rows = []
for ...: rows.append({...})
new_df = pd.DataFrame(rows)
```

```python
# MALE: SettingWithCopyWarning
df[df.x > 0]['y'] = 1               # forse modifica, forse no

# BENE
df.loc[df.x > 0, 'y'] = 1
```

```python
# MALE: chained indexing
df.loc[df.x > 0]['y'].mean()        # crea copie inutili

# BENE
df.loc[df.x > 0, 'y'].mean()
```

## Method chaining: la pipeline pandas

```python
result = (
    pd.read_parquet("orders.parquet")
    .query("status == 'completed'")
    .assign(month=lambda d: d.date.dt.to_period('M'))
    .groupby(['month', 'category'])
    .agg(revenue=('amount', 'sum'), n=('id', 'count'))
    .reset_index()
    .sort_values('revenue', ascending=False)
)
```

Legge come una ricetta. Niente variabili intermedie a confondere.

## Esercizi

<details>
<summary>Esercizio 1 — Diamonds, esplorazione</summary>

```python
import seaborn as sns
df = sns.load_dataset('diamonds')
df.info()
df.describe()
df.cut.value_counts(normalize=True)
df.groupby('cut')['price'].agg(['mean','median','count'])
```

Domande:
1. Prezzo medio per quality cut?
2. Esiste correlazione tra carat e price?
3. Diamanti con `carat > 2` hanno prezzo medio?
</details>

<details>
<summary>Esercizio 2 — Customer lifetime value</summary>

Dato un DataFrame `orders` con `user_id, order_date, amount`, calcola per ogni utente: totale speso, ordine medio, primo ordine, ultimo ordine, recency (giorni dall'ultimo ordine).

```python
ref_date = orders.order_date.max()
clv = orders.groupby('user_id').agg(
    total=('amount', 'sum'),
    avg=('amount', 'mean'),
    n=('amount', 'count'),
    first=('order_date', 'min'),
    last=('order_date', 'max'),
)
clv['recency_days'] = (ref_date - clv.last).dt.days
```
</details>

<details>
<summary>Esercizio 3 — Cohort analysis</summary>

Per una piattaforma SaaS: di ogni cohort di iscrizione (mese), quanti utenti sono ancora attivi nei mesi successivi?

```python
# 1. cohort = primo mese
users['cohort'] = users.signup_date.dt.to_period('M')

# 2. join con events
e = events.merge(users[['user_id','cohort']], on='user_id')
e['event_month'] = e.event_date.dt.to_period('M')
e['months_since'] = (e.event_month - e.cohort).apply(lambda x: x.n)

# 3. pivot
cohort_table = e.groupby(['cohort','months_since']).user_id.nunique().unstack()
retention = cohort_table.div(cohort_table.iloc[:, 0], axis=0)
```

Visualizza con `sns.heatmap(retention)`. È IL grafico delle metriche prodotto.
</details>

<details>
<summary>Esercizio 4 — Rolling features</summary>

Per una colonna `daily_sales` indicizzata per data: calcola media mobile 7 giorni, deviazione standard 30 giorni, valore di ieri, valore di una settimana fa.

```python
df['ma7']  = df['daily_sales'].rolling(7).mean()
df['std30'] = df['daily_sales'].rolling(30).std()
df['lag1'] = df['daily_sales'].shift(1)
df['lag7'] = df['daily_sales'].shift(7)
```

Sono **feature** classiche per modelli di forecasting.
</details>

<details>
<summary>Esercizio 5 — Pivot inverso</summary>

Hai una tabella wide:

```
date       prodA  prodB  prodC
2024-01-01   100    50    20
2024-01-02    90    60    25
```

Trasformala in long:

```python
df_long = df.melt(id_vars='date', var_name='product', value_name='sales')
```
</details>

## Cosa portarti via

- `loc` vs `iloc`: etichetta vs posizione. Mai confondere.
- Vectorize, mai `iterrows`.
- Parquet > CSV.
- Method chaining = pipeline leggibili.
- Categorical e `astype` per memoria.
- Polars è il futuro se pandas ti rallenta.

Prossimo: SQL, perché la maggioranza dei dati sta in database.
