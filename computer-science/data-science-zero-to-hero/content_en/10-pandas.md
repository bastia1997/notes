---
title: "Pandas: the swiss army knife"
area: "Tooling"
summary: "Series, DataFrame, indexes, merge, group by, pivot, time series. The pandas idioms that separate you from mediocre tutorials."
order: 10
level: "intermediate"
prereq:
  - "[[numpy]]"
tools:
  - "pandas 2.x"
---

# Pandas: the swiss army knife

## Why pandas

For tabular data, pandas is the de facto standard. From Excel, it's "Excel on steroids". From SQL, it's "SQL but in memory, with more expressiveness". You spend 60% of hours here.

> Pandas 2.x introduced an optional Arrow backend that makes it dramatically faster. `pd.options.future.infer_string = True` and use `dtype="string[pyarrow]"` if memory matters.

## Series and DataFrame

```python
import pandas as pd
import numpy as np

# Series = column with labels
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'], name='temp')
s['b']         # 20
s.values       # numpy array
s.index        # Index(['a','b','c'])

# DataFrame = table
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Claire'],
    'age': [30, 25, 35],
    'salary': [50000, 60000, 75000],
})
df.shape
df.dtypes
df.info()
df.describe()
```

## Read/write

```python
df = pd.read_csv("data.csv")
df = pd.read_csv("data.csv", parse_dates=['date'], dtype={'id': 'int32'})
df = pd.read_parquet("data.parquet")    # MUCH faster than CSV
df = pd.read_excel("data.xlsx", sheet_name=0)
df = pd.read_sql("SELECT * FROM users", conn)
df = pd.read_json("data.json")

df.to_parquet("out.parquet", compression='snappy')
df.to_csv("out.csv", index=False)
```

> **Golden rule**: for data > 100 MB use Parquet or Feather, never CSV. Faster (10-100x), preserves dtypes, compresses well.

## Selection: `loc`, `iloc`, `[]`

| | What it does |
|---|---|
| `df[col]` | one column (Series) |
| `df[[col1, col2]]` | multiple columns (DataFrame) |
| `df[bool_mask]` | filter rows |
| `df.loc[rows, cols]` | by **label** |
| `df.iloc[i, j]` | by **integer position** |
| `df.at[r, c]` | scalar by label (fastest) |
| `df.iat[i, j]` | scalar by position (fastest) |

```python
df[df['age'] > 30]
df.loc[df['age'] > 30, ['name', 'salary']]
df.loc[0:2, 'name':'age']       # label slice (inclusive!)
df.iloc[0:2, 0:2]               # position slice (exclusive!)
```

> Beware: `df.loc[0:2]` includes 0, 1, **and 2**. `df.iloc[0:2]` includes 0, 1.

## The 5 daily operations

### 1. Filter

```python
df[(df.age > 30) & (df.salary > 60000)]
df.query("age > 30 and salary > 60000")     # cleaner alternative

df[df.city.isin(['Rome', 'Milan'])]
df[df.age.between(25, 40)]

df[df.name.str.startswith('A')]
df[df.email.str.contains('@gmail', na=False)]
```

### 2. Create columns

```python
df['salary_eur'] = df['salary'] * 0.92
df['age_cat'] = pd.cut(df.age, bins=[0, 30, 50, 100], labels=['young','mid','old'])
df['log_salary'] = np.log1p(df.salary)

# assign (for pipelines)
df = (
    df
    .assign(salary_eur=lambda d: d.salary * 0.92)
    .assign(senior=lambda d: d.age >= 35)
)
```

> Using `assign` with lambda lets you build immutable pipelines. Preferable to in-place modification.

### 3. Group by

The queen operation:

```python
df.groupby('city')['salary'].mean()

# multi-aggregation
df.groupby('city').agg(
    avg_salary=('salary', 'mean'),
    n=('id', 'count'),
    max_age=('age', 'max'),
)

# multiple group keys
df.groupby(['city', 'gender'])['salary'].mean().unstack()
```

### 4. Merge / join

Like SQL:

```python
m = pd.merge(orders, users, on='user_id', how='left')
m = pd.merge(orders, users, left_on='uid', right_on='id', how='inner')
```

**Concat** is different: stacks DataFrames, doesn't join.

```python
pd.concat([df1, df2], axis=0)
pd.concat([df1, df2], axis=1)
```

### 5. Pivot / melt

```python
# wide ← long
wide = df.pivot(index='date', columns='product', values='sales')

# long ← wide
long = wide.reset_index().melt(id_vars='date', var_name='product', value_name='sales')

# pivot_table with aggregation
pt = df.pivot_table(
    index='city', columns='product',
    values='sales', aggfunc='sum', fill_value=0
)
```

## Missing values

```python
df.isna().sum()
df.dropna()
df.dropna(subset=['col'])
df.fillna(0)
df.fillna(df.mean())
df.fillna(method='ffill')

from sklearn.impute import SimpleImputer, KNNImputer
```

> **Never** drop NaN rows without thinking. The fact they're NaN is often informative.

## Time series

Pandas is excellent with time.

```python
df['date'] = pd.to_datetime(df['date'])
df.set_index('date', inplace=True)

daily = df['value'].resample('D').sum()
monthly = df['value'].resample('M').mean()

df['date'].dt.year
df['date'].dt.dayofweek
df['date'].dt.is_month_end

df['lag1'] = df['value'].shift(1)
df['delta'] = df['value'].diff()
df['ma7'] = df['value'].rolling(7).mean()
df['ema'] = df['value'].ewm(alpha=0.3).mean()
```

## Performance: 5 rules

1. **Never `iterrows` or row-wise `apply`** if you can vectorize. 100-1000× slower.
2. **Categorical** for low-cardinality columns → less RAM, faster group by.
3. **Parquet** instead of CSV.
4. **Set index** for frequent merges on the same key.
5. **Polars `pl.read_csv`** if pandas isn't enough — similar syntax, 10x faster.

```python
df['city'] = df['city'].astype('category')
df = df.set_index('user_id')
```

## Frequent anti-patterns

```python
# BAD
new_df = pd.DataFrame()
for i in range(len(df)):
    new_df = new_df.append(df.iloc[i])    # O(n²)

# GOOD: vectorize, or list + concat
rows = []
for ...: rows.append({...})
new_df = pd.DataFrame(rows)
```

```python
# BAD: SettingWithCopyWarning
df[df.x > 0]['y'] = 1

# GOOD
df.loc[df.x > 0, 'y'] = 1
```

## Method chaining: the pandas pipeline

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

Reads like a recipe. No intermediate variables to confuse.

## Exercises

<details>
<summary>Exercise 1 — Diamonds exploration</summary>

```python
import seaborn as sns
df = sns.load_dataset('diamonds')
df.info()
df.describe()
df.cut.value_counts(normalize=True)
df.groupby('cut')['price'].agg(['mean','median','count'])
```
</details>

<details>
<summary>Exercise 2 — Customer lifetime value</summary>

Given `orders(user_id, order_date, amount)`, compute for each user: total spent, avg order, first order, last order, recency.

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
<summary>Exercise 3 — Cohort analysis</summary>

For a SaaS platform: for each signup cohort (month), how many users are still active in subsequent months?

```python
users['cohort'] = users.signup_date.dt.to_period('M')
e = events.merge(users[['user_id','cohort']], on='user_id')
e['event_month'] = e.event_date.dt.to_period('M')
e['months_since'] = (e.event_month - e.cohort).apply(lambda x: x.n)
cohort_table = e.groupby(['cohort','months_since']).user_id.nunique().unstack()
retention = cohort_table.div(cohort_table.iloc[:, 0], axis=0)
```

Visualize with `sns.heatmap(retention)`. THE product metrics chart.
</details>

<details>
<summary>Exercise 4 — Rolling features</summary>

For column `daily_sales` indexed by date: compute 7-day moving average, 30-day std, yesterday's value, value 1 week ago.

```python
df['ma7']  = df['daily_sales'].rolling(7).mean()
df['std30'] = df['daily_sales'].rolling(30).std()
df['lag1'] = df['daily_sales'].shift(1)
df['lag7'] = df['daily_sales'].shift(7)
```
</details>

<details>
<summary>Exercise 5 — Inverse pivot</summary>

You have a wide table:

```
date       prodA  prodB  prodC
2024-01-01   100    50    20
2024-01-02    90    60    25
```

Transform to long:

```python
df_long = df.melt(id_vars='date', var_name='product', value_name='sales')
```
</details>

## Takeaways

- `loc` vs `iloc`: label vs position. Never confuse.
- Vectorize, never `iterrows`.
- Parquet > CSV.
- Method chaining = readable pipelines.
- Categorical and `astype` for memory.
- Polars is the future if pandas slows you down.

Next: SQL, because most data lives in databases.
