---
title: "Statistica descrittiva"
area: "Statistica"
summary: "Tendenza centrale, dispersione, asimmetria, curtosi. Boxplot, istogrammi, density plot. Capire un dataset prima di toccare un modello."
order: 6
level: "principiante"
prereq:
  - "[[probabilita]]"
tools:
  - "NumPy, pandas, matplotlib"
---

# Statistica descrittiva

## Lo scopo: riassumere senza tradire

Prima di modellare, **descrivi**. La statistica descrittiva produce sintesi numeriche e grafiche di un dataset. È la prima difesa contro il bias di conferma: forza a guardare i dati prima di credere a quello che si vuole credere.

> "Statistics is the science of changing your mind under uncertainty" — Persi Diaconis. Per cambiare idea devi prima vedere cosa c'è.

## Anteprima visiva: stesso "5 numeri", distribuzioni completamente diverse

Prima di studiare le formule, occhio a questo: 5 dataset, **tutti con la stessa media e deviazione standard**, ma con distribuzioni radicalmente diverse. È la dimostrazione visiva che "media e std" non bastano mai da soli.

<div class="chart"><svg viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,10)">
  <text x="50" y="-2" fill="#7aa2ff" font-size="10" text-anchor="middle">simmetrica</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <path d="M 0 128 Q 25 110 50 50 Q 75 110 100 128" fill="rgba(122,162,255,0.18)" stroke="#7aa2ff" stroke-width="1.5"/>
</g>
<g transform="translate(140,10)">
  <text x="50" y="-2" fill="#ffb347" font-size="10" text-anchor="middle">skew destra</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <path d="M 0 128 Q 15 90 25 50 Q 40 95 70 120 Q 90 128 100 128" fill="rgba(255,179,71,0.18)" stroke="#ffb347" stroke-width="1.5"/>
</g>
<g transform="translate(260,10)">
  <text x="50" y="-2" fill="#c084fc" font-size="10" text-anchor="middle">bimodale</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <path d="M 0 128 Q 15 100 25 70 Q 35 100 50 120 Q 65 100 75 70 Q 85 100 100 128" fill="rgba(192,132,252,0.18)" stroke="#c084fc" stroke-width="1.5"/>
</g>
<g transform="translate(380,10)">
  <text x="50" y="-2" fill="#5ee2c4" font-size="10" text-anchor="middle">uniforme</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <rect x="10" y="80" width="80" height="50" fill="rgba(94,226,196,0.18)" stroke="#5ee2c4" stroke-width="1.5"/>
</g>
<g transform="translate(500,10)">
  <text x="50" y="-2" fill="#ff7a7a" font-size="10" text-anchor="middle">code pesanti</text>
  <line x1="0" y1="130" x2="100" y2="130" stroke="#444"/>
  <path d="M 0 125 Q 30 122 45 30 Q 55 30 70 122 Q 90 128 100 128" fill="rgba(255,122,122,0.18)" stroke="#ff7a7a" stroke-width="1.5"/>
</g>
</svg><div class="chart-caption">Tutte hanno stessa media e stessa varianza. La distribuzione non è "un numero": è una forma.</div></div>

## Tendenza centrale

### Media aritmetica

$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i$$

Sensibile agli outlier. Una persona con reddito 1 milione in un campione di 99 con reddito medio 30k spinge la media a 39.7k. Non rappresenta nessuno.

### Mediana

Il valore centrale ordinato. **Robusta** agli outlier: i 99 hanno mediana ~30k, l'unico ricco non sposta nulla.

### Moda

Il valore più frequente. Utile per dati categoriali, raramente per continui.

### Media troncata (trimmed mean)

Ignora $\alpha\%$ dei valori estremi sopra e sotto. Compromesso tra media e mediana, usata in benchmark (es: olimpiadi, voti).

```python
import numpy as np
from scipy import stats
x = np.array([1,2,3,4,5,6,7,8,9,100])
np.mean(x), np.median(x), stats.trim_mean(x, 0.1)
# (14.5, 5.5, 5.0)
```

## Dispersione

### Varianza e deviazione standard

$$s^2 = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2$$

Nota il **denominatore $n-1$** (correzione di Bessel) — produce uno stimatore **non distorto** della varianza popolazione. NumPy ha `ddof=0` di default, pandas `ddof=1`. Sempre verificare.

### Range, IQR

- **Range** = $\max - \min$. Estremo, non robusto.
- **Interquartile Range (IQR)** = $Q_3 - Q_1$ (75° percentile − 25° percentile). Robusta, contiene il 50% centrale dei dati.

### MAD — Median Absolute Deviation

$$\text{MAD} = \text{mediana}(|x_i - \text{mediana}(x)|)$$

Versione robusta della deviazione standard. Usata in detection di outlier:

$$|x_i - \text{mediana}| > 3 \cdot \text{MAD} \implies \text{outlier sospetto}$$

## Quantili e boxplot

I **quantili** dividono i dati ordinati in parti uguali. Il quantile $q$ è il valore $x_q$ tale che frazione $q$ dei dati sta sotto:

- $Q_1$ = 0.25 (primo quartile)
- $Q_2$ = mediana = 0.50
- $Q_3$ = 0.75

Il **boxplot** (Tukey, 1977) li visualizza:

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
<text x="160" y="125" fill="#ffb347" font-size="10" text-anchor="middle">mediana</text>
<text x="220" y="120" fill="#7aa2ff" font-size="10" text-anchor="middle">Q3</text>
<text x="280" y="120" fill="#7aa2ff" font-size="10" text-anchor="middle">max</text>
<text x="310" y="120" fill="#ff7a7a" font-size="10" text-anchor="middle">outlier</text>
</svg><div class="chart-caption">Box = IQR, whisker = 1.5×IQR, punti = outlier oltre i whisker.</div></div>

## Asimmetria (skewness) e curtosi (kurtosis)

**Skewness** $= E[(X-\mu)^3]/\sigma^3$. Misura la asimmetria della distribuzione.

- $> 0$: coda destra (right-skewed). Es: reddito, durata sessione.
- $< 0$: coda sinistra. Raro nei dati naturali.

**Kurtosis** $= E[(X-\mu)^4]/\sigma^4$. Misura quanto la distribuzione ha "code pesanti".

- Normale ha kurtosis 3 (eccesso 0).
- $> 3$: leptocurtica (code pesanti, picchi alti). Es: rendimenti finanziari, taglie file.
- $< 3$: platicurtica (più piatta). Es: uniforme.

<div class="chart"><svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,10)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <path d="M 0 118 Q 20 50 60 50 Q 80 50 100 90 Q 110 110 120 118" fill="none" stroke="#ffb347" stroke-width="2"/>
  <text x="60" y="140" fill="#ffb347" font-size="11" text-anchor="middle">skew &gt; 0</text>
</g>
<g transform="translate(180,10)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <path d="M 0 118 Q 30 90 50 50 Q 60 30 70 50 Q 90 90 120 118" fill="none" stroke="#7aa2ff" stroke-width="2"/>
  <text x="60" y="140" fill="#7aa2ff" font-size="11" text-anchor="middle">simmetrica</text>
</g>
<g transform="translate(340,10)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <path d="M 0 118 Q 50 105 60 20 Q 70 105 120 118" fill="none" stroke="#c084fc" stroke-width="2"/>
  <text x="60" y="140" fill="#c084fc" font-size="11" text-anchor="middle">kurtosis alta</text>
</g>
</svg></div>

## Istogrammi e densità

**Istogramma**: dividi il range in bin e conta. Scelta del bin: troppi → frastagliato, troppo pochi → perdi struttura.

Regole comuni:
- **Sturges**: $k = 1 + \log_2 n$
- **Freedman-Diaconis**: $h = 2 \cdot \text{IQR} / n^{1/3}$ (più robusta a code pesanti)

```python
import numpy as np, matplotlib.pyplot as plt
x = np.random.lognormal(0, 0.5, 1000)
plt.hist(x, bins='fd', density=True, alpha=0.6, color='#7aa2ff')
plt.show()
```

**KDE (kernel density estimation)**: alternativa liscia all'istogramma. Per ogni punto applica un kernel (gaussiano) e somma. Il parametro `bandwidth` controlla la levigatura.

```python
import seaborn as sns
sns.kdeplot(x, fill=True)
```

## Statistiche bivariate

### Scatter plot

L'unico modo onesto per vedere la relazione tra due variabili continue. Una correlazione di 0.8 può essere lineare perfetta, parabolica, o totalmente sballata da outlier. **Sempre plottare**.

### Heatmap di correlazione

Per molte variabili. Le `seaborn.heatmap(df.corr())` sono ovunque. Attenzione: mostrano solo correlazione lineare di Pearson. Per dati non lineari, usa **Spearman** (correlazione di rango).

```python
import seaborn as sns
sns.heatmap(df.corr(method='spearman'), annot=True, cmap='RdBu_r', center=0)
```

## Statistiche per dati categoriali

- **Frequenze**: `df['col'].value_counts(normalize=True)`.
- **Tabella di contingenza**: `pd.crosstab(df.a, df.b)`.
- **Cramér's V**: associazione tra due categoriali, in $[0, 1]$.
- **Chi-quadrato** per test di indipendenza (vedi sezione test).

## Trasformazioni utili

Quando i dati sono fortemente skew, alcune trasformazioni li avvicinano alla normale o stabilizzano la varianza:

| Dati | Trasformazione |
|---|---|
| Skew destra (positivi) | $\log(x+c)$ — c piccolo per gestire zeri |
| Skew destra severa | $\sqrt{x}$ |
| Conteggi (Poisson) | $\sqrt{x}$ o Anscombe |
| Percentuali $[0,1]$ | $\log(p/(1-p))$ (logit) |
| Generale | **Box-Cox** o **Yeo-Johnson** |

```python
from sklearn.preprocessing import PowerTransformer
pt = PowerTransformer(method='yeo-johnson')
x_trasf = pt.fit_transform(x.reshape(-1, 1))
```

## Esercizi

<details>
<summary>Esercizio 1 — Outlier influenzano la media</summary>

Calcola media e mediana di `[10, 12, 11, 13, 14, 15, 1000]`. Confronta.

**Soluzione**: media ≈ 153.6, mediana = 13. Un outlier sposta la media di 10×.
</details>

<details>
<summary>Esercizio 2 — Cinque-numeri di Tukey</summary>

Per il dataset `[2, 4, 4, 4, 5, 5, 7, 9]`, calcola min, Q1, mediana, Q3, max.

**Soluzione**: 2, 4, 4.5, 6, 9. Verifica:
```python
np.percentile([2,4,4,4,5,5,7,9], [0, 25, 50, 75, 100])
```
</details>

<details>
<summary>Esercizio 3 — Skew interpretato</summary>

Genera 10000 campioni da una log-normale, calcola skew e curtosi:

```python
import numpy as np
from scipy.stats import skew, kurtosis
x = np.random.lognormal(0, 1, 10_000)
print(skew(x), kurtosis(x))  # entrambi positivi, alti
```

Applica `np.log(x)` e ricalcola. Cosa succede? Perché?

**Risposta**: dopo il log, skew ≈ 0 e kurtosis ≈ 0 (è gaussiana). La log-normale è proprio "exp di una normale".
</details>

<details>
<summary>Esercizio 4 — Anscombe quartet</summary>

I 4 dataset di Anscombe hanno **stessa media, varianza, correlazione, retta di regressione**, ma sono completamente diversi se plottati. Caricali e plottali:

```python
import seaborn as sns
a = sns.load_dataset('anscombe')
sns.lmplot(data=a, x='x', y='y', col='dataset', col_wrap=2, ci=None)
```

Lezione: **mai fidarsi solo dei numeri sintetici. Plotta sempre.**
</details>

<details>
<summary>Esercizio 5 — Detect outlier con IQR e MAD</summary>

```python
import numpy as np
rng = np.random.default_rng(0)
x = np.concatenate([rng.normal(0, 1, 100), [10, 12, 15]])

# metodo IQR
q1, q3 = np.percentile(x, [25, 75])
iqr = q3 - q1
mask = (x < q1 - 1.5*iqr) | (x > q3 + 1.5*iqr)
print("outlier IQR:", x[mask])

# metodo MAD
med = np.median(x)
mad = np.median(np.abs(x - med))
mask = np.abs(x - med) > 3 * 1.4826 * mad   # 1.4826 → consistenza con sigma normale
print("outlier MAD:", x[mask])
```
</details>

## Cosa portarti via

- Media + dev. standard descrivono bene **solo se** la distribuzione è ~simmetrica.
- Mediana + IQR sono robusti, da preferire con dati skew o sporchi.
- Plotta sempre. Anscombe insegna.
- Trasformazioni (log, Box-Cox, Yeo-Johnson) sono i tuoi amici per distribuzioni storte.

Prossima: statistica inferenziale, test di ipotesi, p-value e cose che 9 statistici su 10 spiegano male.
