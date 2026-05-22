---
title: "Probabilità: la lingua dell'incertezza"
area: "Matematica"
summary: "Spazio campionario, eventi, indipendenza, Bayes, valore atteso, varianza. Le fondamenta di statistica, ML e ogni decisione sotto incertezza."
order: 5
level: "intermedio"
prereq:
  - "[[algebra-lineare]]"
tools:
  - "carta, NumPy"
---

# Probabilità: la lingua dell'incertezza

## Perché probabilità

La data science vive nell'incertezza. Ogni stima ha errore. Ogni previsione è una distribuzione. Ogni decisione bilancia rischi. La probabilità è il linguaggio formale per ragionare su tutto questo.

**Dove apparirà**:

- **Naive Bayes**, **logistic regression**, **GMM** — direttamente formulati in probabilità.
- **Stima massima verosimiglianza (MLE)** — il principio alla base di OLS, logistica, NN.
- **Inferenza bayesiana** — modelli probabilistici, MCMC.
- **Test statistici** — p-value, intervalli di confidenza.
- **Sampling** — ogni Monte Carlo, ogni stocastic gradient.

## Spazio campionario ed eventi

Un esperimento aleatorio ha:

- **Spazio campionario** $\Omega$: insieme di tutti i possibili esiti.
- **Evento** $A \subseteq \Omega$: sottoinsieme di esiti.
- **Probabilità** $P: 2^\Omega \to [0, 1]$ che soddisfa gli **assiomi di Kolmogorov** (1933):

1. $P(A) \geq 0$ per ogni $A$.
2. $P(\Omega) = 1$.
3. Se $A_1, A_2, \dots$ sono **mutuamente esclusivi**, $P(A_1 \cup A_2 \cup \dots) = \sum_i P(A_i)$.

**Esempio**: lancio un dado. $\Omega = \{1,2,3,4,5,6\}$. L'evento "esce un pari" è $A = \{2,4,6\}$, e $P(A) = 3/6 = 0.5$.

### Regole derivate

- $P(\emptyset) = 0$
- $P(A^c) = 1 - P(A)$
- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ (**inclusione-esclusione**)

## Probabilità condizionata

$$P(A | B) = \frac{P(A \cap B)}{P(B)}, \quad \text{se } P(B) > 0$$

"Probabilità di $A$ **dato che** $B$ è successo". Restringe lo spazio campionario a $B$.

**Esempio**: lancio dado, $A$ = "esce 6", $B$ = "esce pari". Allora $P(A|B) = 1/3$ (tra i tre pari, solo uno è 6).

### Eventi indipendenti

$A$ e $B$ sono **indipendenti** se $P(A | B) = P(A)$, equivalentemente $P(A \cap B) = P(A) P(B)$.

**Attenzione**: indipendenza non è "non si toccano". Due eventi possono sembrare scollegati ma essere dipendenti (e viceversa).

## Teorema di Bayes

Il teorema più famoso della probabilità, e il più equivocato:

$$P(A | B) = \frac{P(B | A) \cdot P(A)}{P(B)}$$

In forma **scientifica**:

$$P(\text{ipotesi} | \text{dati}) = \frac{P(\text{dati} | \text{ipotesi}) \cdot P(\text{ipotesi})}{P(\text{dati})}$$

I quattro termini:

- $P(H | D)$ = **posterior**: cosa crediamo dopo aver visto i dati.
- $P(D | H)$ = **likelihood**: quanto i dati sono compatibili con l'ipotesi.
- $P(H)$ = **prior**: cosa credevamo prima.
- $P(D)$ = **evidence**: normalizzazione.

### Albero di Bayes: il modo visivo per capirlo

Prima della formula, prova il **metodo a frequenze naturali** (Gigerenzer). Una malattia rara colpisce 1 persona su 1000. Un test ha:
- Sensibilità (vero positivo) = 99%: $P(+|\text{malato}) = 0.99$
- Specificità = 99%: $P(-|\text{sano}) = 0.99$

Sei positivo al test. Qual è la probabilità di essere malato? L'intuizione dice 99%. La probabilità reale è **9%**.

Costruiamo un **albero** con 10.000 persone:

<div class="chart"><svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect x="240" y="10" width="120" height="40" fill="rgba(122,162,255,0.18)" stroke="#7aa2ff" rx="4"/>
<text x="300" y="35" fill="#7aa2ff" font-size="12" text-anchor="middle">10.000 persone</text>

<line x1="290" y1="50" x2="120" y2="90" stroke="#7aa2ff" stroke-width="1.5"/>
<line x1="310" y1="50" x2="480" y2="90" stroke="#7aa2ff" stroke-width="1.5"/>
<text x="180" y="75" fill="#8b949e" font-size="10">0.1% malati</text>
<text x="420" y="75" fill="#8b949e" font-size="10">99.9% sani</text>

<rect x="50" y="90" width="140" height="40" fill="rgba(255,122,122,0.15)" stroke="#ff7a7a" rx="4"/>
<text x="120" y="115" fill="#ff7a7a" font-size="12" text-anchor="middle">10 malati</text>

<rect x="410" y="90" width="140" height="40" fill="rgba(94,226,196,0.15)" stroke="#5ee2c4" rx="4"/>
<text x="480" y="115" fill="#5ee2c4" font-size="12" text-anchor="middle">9990 sani</text>

<line x1="100" y1="130" x2="55" y2="170" stroke="#ff7a7a" stroke-width="1.5"/>
<line x1="140" y1="130" x2="185" y2="170" stroke="#ff7a7a" stroke-width="1.5"/>
<text x="50" y="155" fill="#8b949e" font-size="9">99% +</text>
<text x="170" y="155" fill="#8b949e" font-size="9">1% -</text>

<line x1="460" y1="130" x2="415" y2="170" stroke="#5ee2c4" stroke-width="1.5"/>
<line x1="500" y1="130" x2="545" y2="170" stroke="#5ee2c4" stroke-width="1.5"/>
<text x="410" y="155" fill="#8b949e" font-size="9">1% +</text>
<text x="530" y="155" fill="#8b949e" font-size="9">99% -</text>

<rect x="15" y="170" width="80" height="40" fill="rgba(255,179,71,0.25)" stroke="#ffb347" rx="4"/>
<text x="55" y="195" fill="#ffb347" font-size="12" text-anchor="middle">~10 veri +</text>

<rect x="150" y="170" width="80" height="40" fill="rgba(60,80,100,0.3)" stroke="#5b6669" rx="4"/>
<text x="190" y="195" fill="#8b949e" font-size="11" text-anchor="middle">0 falsi -</text>

<rect x="375" y="170" width="80" height="40" fill="rgba(255,179,71,0.25)" stroke="#ffb347" rx="4"/>
<text x="415" y="195" fill="#ffb347" font-size="12" text-anchor="middle">~100 falsi +</text>

<rect x="510" y="170" width="80" height="40" fill="rgba(60,80,100,0.3)" stroke="#5b6669" rx="4"/>
<text x="550" y="195" fill="#8b949e" font-size="11" text-anchor="middle">~9890 veri -</text>

<rect x="100" y="250" width="400" height="50" fill="rgba(122,162,255,0.08)" stroke="#7aa2ff" stroke-dasharray="4,3" rx="4"/>
<text x="300" y="270" fill="#7aa2ff" font-size="12" text-anchor="middle">Totale positivi al test ≈ 10 + 100 = 110</text>
<text x="300" y="288" fill="#ffb347" font-size="12" text-anchor="middle">P(malato | +) = 10 / 110 ≈ 9.1%</text>
</svg><div class="chart-caption">Albero delle frequenze naturali: contare 10 veri positivi e 100 falsi positivi rende il risultato ovvio.</div></div>

**E ora la formula**:

$$P(M|+) = \frac{P(+|M) P(M)}{P(+|M) P(M) + P(+|S) P(S)} = \frac{0.99 \cdot 0.001}{0.99 \cdot 0.001 + 0.01 \cdot 0.999} \approx 0.090$$

Stesso risultato. Ma l'albero è **infinitamente più intuitivo**: studi di Gigerenzer mostrano che anche medici esperti sbagliano a calcolare $P(M|+)$ con la formula, ma quasi tutti rispondono bene se gliela poni come "su 1000 pazienti…". Lezione: quando un problema bayesiano ti confonde, **trasformalo in frequenze**.

<div class="chart"><svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="40" width="280" height="120" fill="none" stroke="#444"/>
<rect x="40" y="40" width="2" height="120" fill="#ff7a7a"/>
<text x="44" y="35" fill="#ff7a7a" font-size="10">1 malato</text>
<rect x="42" y="40" width="278" height="120" fill="rgba(122,162,255,0.18)"/>
<text x="180" y="100" fill="#7aa2ff" font-size="11" text-anchor="middle">999 sani</text>
<rect x="40" y="42" width="2" height="116" fill="#ffb347"/>
<text x="44" y="170" fill="#ffb347" font-size="10">~1 vero +</text>
<rect x="42" y="42" width="2.78" height="116" fill="#ffb347" opacity="0.9"/>
<text x="180" y="180" fill="#ffb347" font-size="10" text-anchor="middle">~10 falsi positivi tra i sani (1% di 999)</text>
</svg><div class="chart-caption">Su 1000 persone, ~10 falsi positivi e ~1 vero positivo: P(malato|+) ≈ 1/11 ≈ 9%.</div></div>

Lezione: **gli eventi rari restano rari anche dopo un test**, se il prior è abbastanza basso. È la base epistemica per screening medici, fraud detection, anomaly detection.

## Variabili aleatorie

Una **variabile aleatoria** $X$ è una funzione $X: \Omega \to \mathbb{R}$. Esempi:
- $X$ = somma di due dadi.
- $X$ = altezza di una persona scelta a caso.
- $X$ = numero di click in un giorno.

### Discrete vs continue

- **Discrete**: assumono valori in un insieme contabile. Es: numero di click. Descritte dalla **funzione di massa** (PMF) $p(x) = P(X = x)$.
- **Continue**: assumono valori in $\mathbb{R}$. Es: altezza. Descritte dalla **funzione di densità** (PDF) $f(x)$, dove $P(a \leq X \leq b) = \int_a^b f(x) dx$.

In entrambi i casi, la **funzione di ripartizione** (CDF) è $F(x) = P(X \leq x)$.

> Per variabili continue $P(X = x) = 0$ per qualsiasi $x$. La probabilità è "sull'intervallo", non sul punto.

## Valore atteso, varianza, covarianza

### Valore atteso (media teorica)

Discreta: $E[X] = \sum_x x \, p(x)$

Continua: $E[X] = \int_{-\infty}^{\infty} x f(x) \, dx$

Proprietà essenziali:
- **Linearità**: $E[aX + bY] = a E[X] + b E[Y]$ **anche se X, Y non indipendenti**.
- $E[c] = c$ per costante.
- $E[XY] = E[X] E[Y]$ **solo se** $X, Y$ indipendenti.

### Varianza (dispersione)

$$\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - E[X]^2$$

La **deviazione standard** è $\sigma = \sqrt{\text{Var}(X)}$, nelle stesse unità di $X$.

Proprietà:
- $\text{Var}(aX + b) = a^2 \text{Var}(X)$
- $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\text{Cov}(X, Y)$

### Covarianza e correlazione

$$\text{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])]$$

Se positiva, $X$ e $Y$ tendono a crescere insieme. La **correlazione di Pearson** normalizza in $[-1, 1]$:

$$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y}$$

> **Correlazione ≠ causalità**. Mantra. Lo ripeterai mille volte ai colleghi. Vedi sezione causal inference.

> Correlazione **lineare**. Due variabili possono avere $\rho = 0$ ed essere fortemente dipendenti (es: $Y = X^2$, $X \sim N(0,1)$, $\rho = 0$ ma $Y$ è funzione di $X$).

## Indipendenza e identicamente distribuite (iid)

In ML, l'**ipotesi iid** è fondamentale: si assume che i campioni $X_1, \dots, X_n$ siano **indipendenti** e **identicamente distribuiti**. Su questa ipotesi si reggono:

- Cross-validation
- Bootstrap
- Stime di errore standard

Quando l'ipotesi **non** vale (es: time series, dati spaziali, grafi sociali), serve cautela.

## Legge dei grandi numeri (LGN)

Per $X_1, X_2, \dots$ iid con media $\mu$:

$$\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i \xrightarrow{n \to \infty} \mu$$

In parole: la media campionaria converge alla media teorica. È **perché** una stima da molti dati è migliore di una da pochi.

## Teorema del limite centrale (TLC / CLT)

Forse il teorema più potente della statistica:

> Per $X_i$ iid con media $\mu$ e varianza $\sigma^2$ finita, la media campionaria, **opportunamente scalata**, converge a una normale:

$$\sqrt{n} (\bar{X}_n - \mu) \xrightarrow{d} \mathcal{N}(0, \sigma^2)$$

Conseguenza pratica: **anche se la distribuzione originale non è normale**, la media di tanti campioni lo diventa. Questo giustifica intervalli di confidenza con la normale anche per dati strani.

<div class="chart"><svg viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,20)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <rect x="0" y="20" width="120" height="100" fill="rgba(255,179,71,0.3)" stroke="#ffb347"/>
  <text x="60" y="145" fill="#ffb347" font-size="11" text-anchor="middle">n=1 (uniforme)</text>
</g>
<g transform="translate(170,20)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <polygon points="0,120 60,20 120,120" fill="rgba(192,132,252,0.3)" stroke="#c084fc"/>
  <text x="60" y="145" fill="#c084fc" font-size="11" text-anchor="middle">n=2 (triangolare)</text>
</g>
<g transform="translate(320,20)">
  <line x1="0" y1="120" x2="120" y2="120" stroke="#555"/>
  <path d="M 0 118 Q 30 110 50 60 Q 60 30 70 60 Q 90 110 120 118" fill="rgba(122,162,255,0.3)" stroke="#7aa2ff"/>
  <text x="60" y="145" fill="#7aa2ff" font-size="11" text-anchor="middle">n=30 (≈ normale)</text>
</g>
</svg><div class="chart-caption">Somma di uniformi: parte rettangolare, diventa triangolare, poi normale. Magia.</div></div>

## Esercizi

<details>
<summary>Esercizio 1 — Dadi truccati</summary>

Un dado è truccato: la faccia 6 esce il 30%, le altre faccia uniformemente.
1. Qual è $P(6)$?
2. Qual è $P(\text{pari})$?
3. Qual è il valore atteso?

**Soluzioni**:
1. 0.30.
2. P(2) + P(4) + P(6) = 0.14 + 0.14 + 0.30 = 0.58.
3. $1 \cdot 0.14 \cdot 5 + 6 \cdot 0.30 = 0.14 \cdot 15 + 1.8 = 2.1 + 1.8 = 3.9$.

Verifica:
```python
import numpy as np
probs = [0.14]*5 + [0.30]
vals = list(range(1,7))
sum(v*p for v,p in zip(vals, probs))  # 3.9
```
</details>

<details>
<summary>Esercizio 2 — Bayes su test medico</summary>

Una malattia ha prevalenza 0.5%. Il test ha sensibilità 95% e specificità 98%. Qual è $P(\text{malato} | +)$?

**Soluzione**:
$$P(M|+) = \frac{0.95 \cdot 0.005}{0.95 \cdot 0.005 + 0.02 \cdot 0.995} = \frac{0.00475}{0.02465} \approx 0.193$$

Solo 19%. Anche con un test "preciso", se la malattia è rara la maggior parte dei positivi sono falsi.
</details>

<details>
<summary>Esercizio 3 — Monty Hall</summary>

Hai 3 porte. Dietro una c'è un'auto, dietro le altre due una capra. Scegli la porta 1. Il presentatore (che sa dove sta l'auto) apre la porta 3, mostrando una capra. Ti offre di cambiare con la 2. Conviene?

**Soluzione**: SÌ, conviene. Cambiando vinci con probabilità 2/3, restando con 1/3. La porta che il presentatore apre dipende dalla tua scelta iniziale: se hai scelto male (prob 2/3), lui è "forzato" ad aprire l'altra capra, lasciando l'auto sulla rimanente.

Simulazione:
```python
import numpy as np
rng = np.random.default_rng(0)
n = 100_000
stay_wins = switch_wins = 0
for _ in range(n):
    car = rng.integers(3)
    pick = rng.integers(3)
    # presentatore apre una porta che non è quella scelta né quella dell'auto
    door_to_open = next(d for d in range(3) if d != pick and d != car)
    switch_pick = next(d for d in range(3) if d != pick and d != door_to_open)
    if pick == car: stay_wins += 1
    if switch_pick == car: switch_wins += 1
print(f"stay: {stay_wins/n:.3f}  switch: {switch_wins/n:.3f}")
# stay: ~0.333  switch: ~0.667
```
</details>

<details>
<summary>Esercizio 4 — Valore atteso e varianza</summary>

$X$ uniformemente distribuita su $\{1, 2, \dots, 10\}$. Calcola $E[X]$, $E[X^2]$, $\text{Var}(X)$.

**Soluzione**:
- $E[X] = \frac{1+2+\dots+10}{10} = 5.5$
- $E[X^2] = \frac{1+4+9+\dots+100}{10} = \frac{385}{10} = 38.5$
- $\text{Var}(X) = 38.5 - 5.5^2 = 38.5 - 30.25 = 8.25$
</details>

<details>
<summary>Esercizio 5 — Indipendenza vs scorrelazione</summary>

$X \sim \mathcal{N}(0, 1)$, $Y = X^2$. Mostra che $\text{Cov}(X, Y) = 0$ ma $X, Y$ NON sono indipendenti.

**Soluzione**:
$\text{Cov}(X, Y) = E[X \cdot X^2] - E[X] E[X^2] = E[X^3] - 0 \cdot E[X^2] = 0$ (X simmetrica → momenti dispari nulli).

Non indipendenti perché $Y$ è funzione deterministica di $X$.

Lezione: **correlazione misura solo dipendenza lineare**. Per dipendenze non lineari servono mutual information, distance correlation, ecc.
</details>

<details>
<summary>Esercizio 6 — Simulazione del TLC</summary>

Simula 10000 medie di 30 lanci di un dado. Plotta l'istogramma. Devi vedere una normale.

```python
import numpy as np, matplotlib.pyplot as plt
rng = np.random.default_rng(0)
means = rng.integers(1, 7, size=(10_000, 30)).mean(axis=1)
plt.hist(means, bins=40, density=True)
plt.title(f"Media di 30 dadi · μ={means.mean():.3f}, σ={means.std():.3f}")
plt.show()
```

Il TLC predice $\mu = 3.5$, $\sigma = \sqrt{35/12 / 30} \approx 0.31$. Verifica.
</details>

<details>
<summary>Esercizio 7 — Paradosso del compleanno</summary>

Quanti studenti servono in un'aula perché la probabilità che almeno due abbiano lo stesso compleanno sia > 50%?

**Soluzione**: 23 (sorprende sempre). La formula:
$$P(\text{tutti diversi}) = \frac{365 \cdot 364 \cdots (365-n+1)}{365^n}$$

$P(\text{almeno una coincidenza}) > 0.5$ per $n = 23$.

```python
import math
n = 1
while True:
    p = math.prod((365-i)/365 for i in range(n))
    if 1-p > 0.5:
        print(n); break
    n += 1
# 23
```
</details>

## Cosa portarti via

- Bayes: il modo formale per aggiornare credenze coi dati.
- Linearità di $E[\cdot]$ vale sempre; per $\text{Var}(X+Y)$ serve la covarianza.
- Correlazione misura solo dipendenza lineare.
- TLC giustifica perché la normale appare ovunque.
- Eventi rari + test imperfetti = falsi positivi tanti. Insegnalo ai medici (e ai PM).

## Letture

- **Sheldon Ross** — "A First Course in Probability": il testo classico.
- **3Blue1Brown** — video su Bayes (YouTube).
- **Tijms** — "Understanding Probability": ricco di paradossi divertenti.

Prossimo: statistica descrittiva — quando i dati parlano per primi.
