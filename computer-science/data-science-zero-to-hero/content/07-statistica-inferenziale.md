---
title: "Statistica inferenziale e test di ipotesi"
area: "Statistica"
summary: "Stimatori, intervalli di confidenza, p-value (e perché tutti li interpretano male), test t, chi-quadrato, ANOVA, potenza statistica."
order: 7
level: "intermedio"
prereq:
  - "[[probabilita]]"
  - "[[statistica-descrittiva]]"
tools:
  - "scipy.stats, statsmodels"
---

# Statistica inferenziale e test di ipotesi

## Inferenza in una riga

> Dati osservati di un **campione**, cosa possiamo dire della **popolazione**?

Tutto il resto è dettaglio tecnico. Le risposte vengono in due forme: **stime** (con intervalli di confidenza) e **test** (con p-value).

## Stimatori puntuali

Vogliamo stimare un parametro $\theta$ (es: media popolazione $\mu$) dai dati. Un **stimatore** $\hat{\theta}$ è una funzione del campione.

Proprietà che vogliamo:

- **Non distorto** (unbiased): $E[\hat{\theta}] = \theta$
- **Consistente**: $\hat{\theta} \to \theta$ al crescere di $n$
- **Efficiente**: bassa varianza tra gli stimatori non distorti

La **media campionaria** $\bar{X}$ è non distorta, consistente, efficiente (per dati gaussiani) per stimare $\mu$.

### MLE — Maximum Likelihood Estimation

Il metodo principe per costruire stimatori. Data una famiglia di modelli $p(x | \theta)$ e dati $x_1, \dots, x_n$ iid, la **verosimiglianza** è:

$$L(\theta) = \prod_{i=1}^n p(x_i | \theta)$$

MLE sceglie $\theta$ che massimizza $L$ (o equivalentemente $\log L$, che è numericamente più stabile e algebricamente più gestibile).

**Esempio**: $X_i \sim \mathcal{N}(\mu, \sigma^2)$. La MLE di $\mu$ è $\bar{X}$, e di $\sigma^2$ è $\frac{1}{n}\sum (x_i - \bar{X})^2$. (Nota: con $n$, non $n-1$. La versione MLE è distorta verso il basso; per non distorta si usa $n-1$.)

MLE generalizza a regressione, logistica, modelli misti, NN — sotto, ogni "training" è massimizzazione di una log-likelihood (o minimizzazione della cross-entropy negativa).

## Intervalli di confidenza

Un **intervallo di confidenza al 95%** per $\mu$ è una procedura che produce intervalli i quali, **al ripetersi dell'esperimento**, conterrebbero $\mu$ nel 95% dei casi.

**Interpretazione corretta**: 

> "Se ripetessimo lo studio 100 volte, ~95 dei 100 intervalli costruiti includerebbero il vero $\mu$."

**Interpretazione SBAGLIATA** (che fanno tutti):

> "C'è 95% di probabilità che $\mu$ stia in questo intervallo." (Quello è bayesiano — credible interval — diverso.)

Per la media:

$$\bar{x} \pm t_{n-1, 1-\alpha/2} \cdot \frac{s}{\sqrt{n}}$$

dove $t$ è il quantile della t-Student con $n-1$ gradi di libertà.

```python
import numpy as np
from scipy import stats

x = np.random.normal(50, 10, 30)
mean = x.mean()
se = stats.sem(x)              # s/√n
ci = stats.t.interval(0.95, len(x)-1, loc=mean, scale=se)
print(mean, ci)
```

### Bootstrap: l'IC senza assumere nulla

Quando non vuoi assumere normalità o non hai una formula chiusa:

1. Ricampiona con rimpiazzo dai dati $B$ volte (es: $B=1000$).
2. Calcola la statistica su ogni ricampionamento.
3. Prendi i percentili 2.5 e 97.5 della distribuzione delle statistiche.

```python
rng = np.random.default_rng(0)
B = 5000
boot_means = [rng.choice(x, size=len(x), replace=True).mean() for _ in range(B)]
np.percentile(boot_means, [2.5, 97.5])
```

Bootstrap funziona per quasi qualsiasi statistica: mediana, IQR, R², metriche di ML.

## Test di ipotesi

Ogni test è un dialogo:

1. Stabilisci un'**ipotesi nulla** $H_0$ (di solito "non c'è effetto").
2. Stabilisci l'**alternativa** $H_1$.
3. Calcola una **statistica test** $T$ dai dati.
4. Sotto $H_0$, $T$ ha una certa distribuzione nota.
5. Calcola la probabilità di osservare $T$ o un valore più estremo, **assumendo $H_0$ vera**. Questo è il **p-value**.
6. Se p-value < $\alpha$ (tipicamente 0.05), rifiuti $H_0$.

### Cos'è davvero il p-value

> "p-value = probabilità di osservare dati estremi come questi (o più estremi), **assumendo che $H_0$ sia vera**."

**Non è**:
- P($H_0$ vera | dati). Non è una probabilità su $H_0$.
- La probabilità di sbagliare a rifiutare.
- Una misura dell'**ampiezza dell'effetto**. p=0.001 con effetto microscopico è clinicamente irrilevante.

### Errori di tipo I e II

| | $H_0$ vera | $H_0$ falsa |
|---|---|---|
| **Rifiuti $H_0$** | Errore tipo I (α) — falso positivo | Decisione corretta (potenza $1-\beta$) |
| **Non rifiuti $H_0$** | Decisione corretta | Errore tipo II (β) — falso negativo |

$\alpha$ è scelto da te (di solito 0.05). $\beta$ dipende dall'ampiezza dell'effetto e da $n$. **Più campioni = più potenza**.

## I test che ti servono

### t-test

Confronta medie. Tre versioni:

- **One sample**: $\bar{x}$ vs valore atteso $\mu_0$.
- **Two sample independent**: $\bar{x}_1$ vs $\bar{x}_2$ (gruppi separati).
- **Paired**: due misure sugli stessi soggetti (pre/post).

Assunzioni: dati ~normali (TLC aiuta per $n>30$), varianze ~uguali (per la versione classica; usa **Welch** se diverse).

```python
from scipy.stats import ttest_ind, ttest_rel
ttest_ind(group_a, group_b, equal_var=False)   # Welch
```

### Mann-Whitney U / Wilcoxon

Non-parametrici, sostituiscono il t-test quando i dati non sono normali (skew, code).

```python
from scipy.stats import mannwhitneyu
mannwhitneyu(group_a, group_b, alternative='two-sided')
```

### ANOVA

Confronta $k > 2$ gruppi. $H_0$: tutte le medie uguali.

```python
from scipy.stats import f_oneway
f_oneway(group_a, group_b, group_c)
```

Se rifiuti, segue test **post-hoc** (Tukey HSD) per capire quali coppie differiscono.

### Chi-quadrato

Per categoriali. Due tipi:

- **Goodness of fit**: una variabile categoriale segue una distribuzione attesa?
- **Indipendenza**: due categoriali sono indipendenti?

```python
import pandas as pd
from scipy.stats import chi2_contingency
table = pd.crosstab(df.gender, df.purchased)
chi2, p, dof, expected = chi2_contingency(table)
```

### Test di normalità

- **Shapiro-Wilk** (`scipy.stats.shapiro`): potente per $n < 5000$.
- **Anderson-Darling**, **Kolmogorov-Smirnov**.
- **Q-Q plot**: il modo grafico migliore. Se i punti stanno sulla retta, è normale.

> **Caveat**: con $n$ grande, ogni test di normalità rifiuta $H_0$ anche per scostamenti minimi. Usa il **Q-Q plot** e il senso comune.

## Correzione per test multipli

Se fai 20 test indipendenti con $\alpha=0.05$, ti aspetti $\sim 1$ falso positivo per puro caso. In genomica o in A/B test su molte metriche, **bisogna correggere**:

- **Bonferroni**: $\alpha_{adj} = \alpha / m$. Conservativo.
- **Benjamini-Hochberg (FDR)**: controlla la frazione di falsi positivi tra i rifiutati. Meno conservativo, standard in biologia.

```python
from statsmodels.stats.multitest import multipletests
reject, p_adj, _, _ = multipletests(p_values, alpha=0.05, method='fdr_bh')
```

## Potenza statistica e sample size

Prima di lanciare uno studio: quanti campioni servono per rilevare un effetto di una certa ampiezza?

Per un t-test a due campioni con effetto **Cohen's d = 0.5** (medio), $\alpha=0.05$, potenza 80%, servono **~64 soggetti per gruppo**.

```python
from statsmodels.stats.power import TTestIndPower
power = TTestIndPower()
power.solve_power(effect_size=0.5, alpha=0.05, power=0.8)
# ≈ 63.7
```

> Lezione: un test che non rifiuta non significa "$H_0$ è vera". Potrebbe significare "$n$ era troppo piccolo".

## A/B testing nel mondo reale

```mermaid
flowchart LR
    A[Definisci metrica primaria] --> B[Calcola sample size<br/>con MDE realistico]
    B --> C[Assegna utenti<br/>casualmente A/B]
    C --> D[Raccogli dati<br/>fino a sample size]
    D --> E[Analizza UNA volta<br/>al termine]
    E --> F[Decidi]
```

**Errori frequenti**:

1. **Peeking**: guardare i risultati ogni giorno e fermare quando sembra significativo. Inflaziona il falso positivo. Usa **sequential testing** o **always-valid p-values** se vuoi early stopping.
2. **Metriche multiple**: testare 10 metriche aumenta la probabilità di falso positivo. Pre-registra la metrica primaria.
3. **Effetto novelty**: il nuovo design eccita gli utenti i primi giorni. Run per almeno 1–2 settimane.
4. **Assegnazione non casuale**: per device, per cohort, per location. Verifica sempre il bilanciamento.

## Bayesiano vs frequentista in 30 secondi

| | Frequentista | Bayesiano |
|---|---|---|
| Parametri | Fissi (sconosciuti) | Variabili aleatorie con distribuzione |
| Output | p-value, IC | Posterior, credible interval |
| Prior | Non c'è | Sì |
| Interpretazione IC/credible | Sulla procedura | Sul parametro |
| Costo computazionale | Basso | Spesso alto (MCMC) |

Entrambi funzionano. In industria il frequentista domina (A/B test, regression analysis). In ricerca scientifica bayesiano sta crescendo.

## Esercizi

<details>
<summary>Esercizio 1 — IC manuale</summary>

Hai $n=25$, $\bar{x}=78$, $s=12$. Calcola l'IC al 95% per $\mu$.

**Soluzione**: $t_{24, 0.975} \approx 2.064$. SE = $12/\sqrt{25} = 2.4$. IC = $78 \pm 2.064 \cdot 2.4 = 78 \pm 4.95 = [73.05, 82.95]$.
</details>

<details>
<summary>Esercizio 2 — Quanto effetto è "vero"?</summary>

Un test mostra p = 0.04 con effetto = 0.5 punti percentuali su una metrica con media 50%. È un risultato importante?

**Risposta**: probabilmente no. La significatività statistica non implica significatività pratica. 0.5pp su 50% è un miglioramento dell'1% relativo: spesso il costo dell'implementazione lo annulla. **Sempre riportare effect size** (Cohen's d, OR, lift) accanto al p-value.
</details>

<details>
<summary>Esercizio 3 — A/B test simulato</summary>

Simula un A/B test in cui il gruppo trattamento ha conversion rate 10.5% vs controllo 10%. Quanti campioni per gruppo servono per p<0.05 con potenza 80%?

```python
from statsmodels.stats.power import NormalIndPower
from statsmodels.stats.proportion import proportion_effectsize
es = proportion_effectsize(0.105, 0.10)
n = NormalIndPower().solve_power(effect_size=es, alpha=0.05, power=0.8)
print(int(n))  # ~60000 per gruppo
```

Lezione: piccoli effetti su rate richiedono enormi sample size. Per questo A/B test su feature minori richiedono settimane di traffico Netflix-scale.
</details>

<details>
<summary>Esercizio 4 — Multiple testing</summary>

Simula 100 test indipendenti tutti sotto $H_0$ con $\alpha=0.05$. Quanti rifiuti aspetti? Verifica.

```python
import numpy as np
from scipy.stats import ttest_1samp
rng = np.random.default_rng(0)
ps = []
for _ in range(100):
    x = rng.normal(0, 1, 30)
    _, p = ttest_1samp(x, 0)
    ps.append(p)
print(sum(p < 0.05 for p in ps))  # ~5
```

Ora applica Bonferroni e BH:
```python
from statsmodels.stats.multitest import multipletests
print("Bonferroni:", multipletests(ps, alpha=0.05, method='bonferroni')[0].sum())
print("BH (FDR):", multipletests(ps, alpha=0.05, method='fdr_bh')[0].sum())
```
</details>

<details>
<summary>Esercizio 5 — Bootstrap CI per la mediana</summary>

```python
import numpy as np
rng = np.random.default_rng(0)
x = rng.lognormal(0, 1, 200)

B = 5000
boot = np.array([np.median(rng.choice(x, len(x), replace=True)) for _ in range(B)])
ci = np.percentile(boot, [2.5, 97.5])
print(f"mediana: {np.median(x):.3f}, IC: {ci}")
```

Confronta con un'IC analitica (che per la mediana è complessa). Bootstrap rende facile l'inferenza per quasi qualsiasi statistica.
</details>

## Cosa portarti via

- p-value $\neq$ P(H_0 vera). Imparalo a memoria.
- IC al 95% è una proprietà della **procedura**, non del singolo intervallo.
- Bootstrap = swiss army knife per IC senza assunzioni di normalità.
- Effect size importa quanto la significatività.
- A/B test fatti male sono peggio di non farli.

Prossimo: le distribuzioni di probabilità che incontrerai ogni giorno.
