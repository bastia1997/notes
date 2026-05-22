---
title: "Regressione lineare e regolarizzazione"
area: "Machine Learning"
summary: "OLS derivata, assunzioni, diagnostica residui, Ridge, Lasso, Elastic Net, GLM. Il modello da cui parte tutto."
order: 17
level: "intermedio"
prereq:
  - "[[algebra-lineare]]"
  - "[[ml-fondamenti]]"
tools:
  - "scikit-learn, statsmodels"
---

# Regressione lineare e regolarizzazione

## Il modello base

$$y_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \dots + \beta_p x_{ip} + \epsilon_i$$

In forma matriciale, includendo l'intercetta come prima colonna di 1 in $X$:

$$\mathbf{y} = X \boldsymbol{\beta} + \boldsymbol{\epsilon}$$

OLS (Ordinary Least Squares) minimizza la somma dei quadrati degli errori:

$$\hat{\boldsymbol{\beta}} = \arg\min_\beta \|\mathbf{y} - X \boldsymbol{\beta}\|_2^2$$

### Cosa significa visivamente

Hai dei punti $(x_i, y_i)$ nel piano. La retta $\hat{y} = \hat{\beta}_0 + \hat{\beta}_1 x$ è la "miglior linea retta" nel senso che **minimizza la somma dei quadrati delle distanze verticali** tra i punti e la retta:

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

<text x="320" y="170" fill="#7aa2ff" font-size="11">retta OLS</text>
<text x="100" y="55" fill="#ff7a7a" font-size="10">residui (rosso) → al quadrato → sommati → minimizzati</text>
</svg><div class="chart-caption">OLS NON minimizza la distanza geometrica dal punto alla retta — minimizza la differenza VERTICALE (residui).</div></div>

**Perché al quadrato?** Tre ragioni:

1. Gli errori positivi e negativi non si cancellano (un MAE userebbe il valore assoluto, ma non è derivabile in 0).
2. Penalizza di più gli errori grandi (un errore di 4 conta 16, due da 2 contano solo 8).
3. C'è una soluzione **chiusa** (in 1 passaggio matematico), che vedrai sotto.

## Derivazione della soluzione

Calcola il gradiente e poni a zero:

$$\frac{\partial}{\partial \boldsymbol{\beta}} \|\mathbf{y} - X \boldsymbol{\beta}\|^2 = -2 X^T (\mathbf{y} - X \boldsymbol{\beta}) = 0$$

$$X^T X \boldsymbol{\beta} = X^T \mathbf{y}$$

Se $X^T X$ è invertibile:

$$\boxed{\hat{\boldsymbol{\beta}} = (X^T X)^{-1} X^T \mathbf{y}}$$

Le **normal equations**. La formula da incorniciare.

> In pratica, non si calcola l'inversa. `np.linalg.lstsq(X, y)` usa SVD, più stabile.

## Assunzioni (le sacre 5 di Gauss-Markov)

Perché OLS sia il BLUE — Best Linear Unbiased Estimator:

1. **Linearità**: $E[y|X] = X\beta$.
2. **Esogeneità**: $E[\epsilon|X] = 0$ (gli errori non correlati con $X$).
3. **Omoschedasticità**: $\text{Var}(\epsilon|X) = \sigma^2$ costante.
4. **Non multicollinearità**: $X^T X$ ha rango pieno.
5. **Errori incorrelati**: $\text{Cov}(\epsilon_i, \epsilon_j) = 0$.

Se aggiungi **normalità degli errori** ($\epsilon \sim \mathcal{N}(0, \sigma^2 I)$), allora OLS = MLE, e puoi fare inferenza (test t, IC).

### Diagnostica delle assunzioni

```python
import statsmodels.api as sm
X_ = sm.add_constant(X)
model = sm.OLS(y, X_).fit()
print(model.summary())
```

`summary()` produce:
- Coefficienti, errori standard, p-value, IC.
- $R^2$, $\bar{R}^2$.
- Statistiche di durbin-watson (correlazione errori), Jarque-Bera (normalità).
- Condition number (multicollinearità).

Plotta i residui:

```python
import matplotlib.pyplot as plt
fitted = model.fittedvalues
resid = model.resid

# 1. residui vs fitted
plt.scatter(fitted, resid); plt.axhline(0, c='red')
# Cerchi un pattern? Se la varianza cambia con fitted → eteroschedasticità

# 2. Q-Q plot dei residui
sm.qqplot(resid, line='45')

# 3. residui in funzione di una feature
plt.scatter(X[:, 0], resid)
```

## $R^2$ e $\bar{R}^2$

$$R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$$

Frazione di varianza spiegata. $R^2 = 1$ perfetto, $0$ inutile (predice solo la media).

$\bar{R}^2$ (adjusted) penalizza modelli con più feature:

$$\bar{R}^2 = 1 - (1 - R^2) \frac{n-1}{n-p-1}$$

> $R^2$ alto $\neq$ "buon modello". Può essere alto e il modello sbagliato. Sempre con diagnostica.

## Interpretare i coefficienti

Per coefficienti **non standardizzati**: $\hat{\beta}_j$ = aumento atteso di $y$ per **un'unità** in più di $x_j$, **tenendo le altre fisse**.

Per coefficienti **standardizzati** (scali $X$ a media 0, varianza 1): $\hat{\beta}_j$ = aumento di $y$ per **una deviazione standard** in più di $x_j$.

> "Tenendo le altre fisse" è il dettaglio cruciale. Se due feature sono correlate, "tenere fissa l'altra" è un'astrazione: in realtà cambiando $x_1$ cambia anche $x_2$ nei tuoi dati.

## Multicollinearità

Quando feature sono correlate, gli errori standard si gonfiano, i coefficienti diventano instabili, i p-value perdono senso.

**Detect**: **Variance Inflation Factor** (VIF):

$$\text{VIF}_j = \frac{1}{1 - R_j^2}$$

dove $R_j^2$ è l'$R^2$ della regressione di $x_j$ sulle altre. VIF > 5–10 = problematico.

```python
from statsmodels.stats.outliers_influence import variance_inflation_factor
[variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
```

**Rimedi**:

- Rimuovi una delle feature correlate.
- Usa PCA per rimpiazzare con componenti ortogonali.
- Usa **Ridge** regression: è proprio progettata per questo.

## Regolarizzazione

### Ridge (L2)

$$\hat{\boldsymbol{\beta}}^{\text{ridge}} = \arg\min \|y - X\beta\|^2 + \lambda \|\beta\|_2^2$$

Soluzione in forma chiusa:

$$\hat{\boldsymbol{\beta}}^{\text{ridge}} = (X^T X + \lambda I)^{-1} X^T y$$

L'aggiunta di $\lambda I$ rende sempre invertibile, anche con multicollinearità.

$\lambda$ controlla la quantità di shrinkage:
- $\lambda = 0$: torna a OLS.
- $\lambda \to \infty$: tutti coefficienti tendono a 0.

### Lasso (L1)

$$\hat{\boldsymbol{\beta}}^{\text{lasso}} = \arg\min \|y - X\beta\|^2 + \lambda \|\beta\|_1$$

A differenza di Ridge, Lasso **azzera** coefficienti irrilevanti — feature selection automatica.

### Elastic Net

$$\hat{\boldsymbol{\beta}}^{\text{en}} = \arg\min \|y - X\beta\|^2 + \lambda_1 \|\beta\|_1 + \lambda_2 \|\beta\|_2^2$$

Combina i due. Utile quando feature sono correlate (Lasso da solo sceglie arbitrariamente una delle correlate; Elastic Net le mantiene insieme).

### Tuning di $\lambda$

```python
from sklearn.linear_model import RidgeCV, LassoCV, ElasticNetCV
ridge = RidgeCV(alphas=np.logspace(-3, 3, 50), cv=5).fit(X_tr, y_tr)
lasso = LassoCV(alphas=np.logspace(-3, 3, 50), cv=5, max_iter=10_000).fit(X_tr, y_tr)
en = ElasticNetCV(l1_ratio=[.1,.5,.9], cv=5).fit(X_tr, y_tr)

print("ridge alpha:", ridge.alpha_)
print("lasso alpha:", lasso.alpha_, " - n feature non-zero:", (lasso.coef_ != 0).sum())
```

> **Scalare le feature è obbligatorio** per Ridge/Lasso. Senza, i coefficienti delle feature con scale grandi vengono penalizzati di più.

## Generalized Linear Models (GLM)

OLS assume $y$ continua, normale. GLM generalizzano:

- Una **funzione di link** $g$ tale che $g(E[y|X]) = X\beta$.
- Una **distribuzione** della famiglia esponenziale per $y$.

| Modello | Link | Distribuzione |
|---|---|---|
| OLS | Identità | Normale |
| Logistic | Logit | Bernoulli |
| Poisson | Log | Poisson |
| Gamma | Inverse / Log | Gamma |
| Negative Binomial | Log | NegBin (Poisson overdispersed) |

```python
import statsmodels.api as sm
# Poisson per conteggi
m = sm.GLM(y, X_, family=sm.families.Poisson()).fit()
# Gamma per durate
m = sm.GLM(y, X_, family=sm.families.Gamma(link=sm.families.links.Log())).fit()
```

## Esempio completo

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

## Limitazioni

OLS è ottima quando:
- relazione lineare effettiva,
- residui ~ normali,
- $n \gg p$.

NON è ottima quando:
- non-linearità forte → polinomi, GAM, alberi.
- interazioni non specificate → alberi catturano automaticamente.
- $p$ enorme → Lasso, Ridge, modelli sparsi.

## Esercizi

<details>
<summary>Esercizio 1 — OLS a mano</summary>

Hai $X = [[1,1],[1,2],[1,3]]$ (1 colonna intercetta + 1 feature) e $y = [2, 3, 5]$. Calcola $\hat{\beta}$.

**Soluzione**:
$$X^T X = \begin{bmatrix} 3 & 6 \\ 6 & 14 \end{bmatrix}, \quad X^T y = \begin{bmatrix} 10 \\ 23 \end{bmatrix}$$
$$\det(X^TX) = 42-36 = 6$$
$$(X^TX)^{-1} = \frac{1}{6}\begin{bmatrix} 14 & -6 \\ -6 & 3 \end{bmatrix}$$
$$\hat{\beta} = \frac{1}{6}\begin{bmatrix} 14\cdot10 - 6\cdot23 \\ -6\cdot10 + 3\cdot23 \end{bmatrix} = \frac{1}{6}\begin{bmatrix} 2 \\ 9 \end{bmatrix} = \begin{bmatrix} 0.333 \\ 1.5 \end{bmatrix}$$

Intercetta ≈ 0.33, slope = 1.5. Verifica: predizioni 1.83, 3.33, 4.83. Errori (0.17, -0.33, 0.17), somma = 0 ✓.
</details>

<details>
<summary>Esercizio 2 — Residui e diagnostica</summary>

Genera dati con eteroschedasticità: varianza che cresce con $x$. Verifica che OLS sottostima gli errori standard.

```python
import numpy as np, statsmodels.api as sm, matplotlib.pyplot as plt
rng = np.random.default_rng(0)
x = np.linspace(1, 10, 200)
y = 2*x + rng.normal(0, x*0.5, 200)  # rumore cresce con x

X = sm.add_constant(x)
m = sm.OLS(y, X).fit()
fitted = m.fittedvalues
resid = m.resid
plt.scatter(fitted, resid); plt.axhline(0)
plt.show()
# il "fan shape" rivela eteroschedasticità
```

Soluzione: standard error robusti (sandwich), o trasformazioni (log).
</details>

<details>
<summary>Esercizio 3 — Ridge vs Lasso con feature correlate</summary>

```python
import numpy as np
from sklearn.linear_model import Ridge, Lasso
rng = np.random.default_rng(0)
x1 = rng.standard_normal(200)
x2 = x1 + rng.standard_normal(200) * 0.1   # x2 quasi uguale a x1
x3 = rng.standard_normal(200)
X = np.column_stack([x1, x2, x3])
y = 2*x1 + 0*x2 + 3*x3 + rng.standard_normal(200)*0.5

for name, m in [('OLS', Ridge(alpha=0)), ('Ridge', Ridge(alpha=1)), ('Lasso', Lasso(alpha=0.1))]:
    m.fit(X, y)
    print(f"{name}: {m.coef_}")
```

Osserva: con OLS i coefficienti su $x_1$ e $x_2$ sono instabili (dividono il "vero" 2 in modi arbitrari). Ridge li bilancia. Lasso ne azzera uno (preferibile per feature selection).
</details>

<details>
<summary>Esercizio 4 — Poisson per conteggi</summary>

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
# Poisson recupera ~[0.5, 1.5], OLS no (varianza scala con la media)
```
</details>

## Cosa portarti via

- OLS = pietra angolare. Capirlo = capire mezza statistica.
- 5 assunzioni di Gauss-Markov; diagnostica via residui.
- Ridge = stabilizza in multicollinearità. Lasso = feature selection. Elastic Net = compromesso.
- GLM = generalizza a Poisson, logistica, Gamma. Stesso framework.
- $R^2$ alto $\neq$ modello giusto. Plotta i residui.

Prossimo: regressione logistica e classificazione binaria.
