---
title: "KNN, Naive Bayes, SVM"
area: "Machine Learning"
summary: "Tre famiglie 'classiche' che ancora vincono in scenari specifici. Quando e perché usarle."
order: 19
level: "intermedio"
prereq:
  - "[[ml-fondamenti]]"
tools:
  - "scikit-learn"
---

# KNN, Naive Bayes, SVM

## K-Nearest Neighbors

### Idea

> Per predire $y$ di un nuovo punto $x$, guarda i $k$ punti più vicini nel training set e fai una "media" (regressione) o "voto" (classificazione).

Nessun "training" vero: il modello è il dataset stesso. Inferenza costosa ($O(n)$ per ogni query in versione naive), ottimizzata con strutture dati: **KD-Tree** ($d \leq 20$), **Ball Tree**, **HNSW** o **FAISS** per high-dim.

### Pseudocodice

```python
def knn_predict(x_query, X_train, y_train, k=5):
    d = ((X_train - x_query)**2).sum(axis=1)   # distanze euclidee quadrate
    nn = np.argsort(d)[:k]
    return np.bincount(y_train[nn]).argmax()   # voto maggioranza
```

### Iperparametri

| | Effetto |
|---|---|
| $k$ piccolo (1, 3) | flessibile, basso bias, alta varianza |
| $k$ grande (50+) | smooth, alto bias, bassa varianza |
| **Distanza** | euclidea (default), Manhattan, coseno per testi |
| **Pesi** | uniformi o ponderati per distanza inversa |

### Quando usarlo

- Dataset piccolo–medio ($n < 10^5$).
- Pochi feature ($d < 20$, altrimenti **curse of dimensionality**).
- Confini decisionali complessi, non lineari.

### Quando NON usarlo

- $d$ grande: in alte dimensioni le distanze "collassano" (tutti i punti sono simili).
- Inferenza in tempo reale su dati grossi.
- Feature di scala diversa (sempre scalare!).

### Esempio

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
sc = StandardScaler().fit(X_tr)
knn = KNeighborsClassifier(n_neighbors=5, weights='distance').fit(sc.transform(X_tr), y_tr)
```

> KNN per regressione: `KNeighborsRegressor`. Predice la media dei k vicini.

## Naive Bayes

### Idea

Applica Bayes assumendo **indipendenza condizionale** delle feature, dato il target:

$$P(y | x_1, \dots, x_p) \propto P(y) \prod_{j=1}^p P(x_j | y)$$

L'assunzione è quasi sempre **falsa**, da cui "naive". Ma in pratica funziona benissimo per molti task, specialmente NLP.

### Varianti

| Versione | Per quali feature |
|---|---|
| **GaussianNB** | continue, ~ normali per classe |
| **MultinomialNB** | conteggi (es: word count) |
| **BernoulliNB** | binarie (es: parola presente/no) |
| **ComplementNB** | come Multinomial, meglio su classi sbilanciate |

### Esempio: spam classification

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

### Smoothing (perché serve)

Se una parola non è mai apparsa nella classe "spam" nel training, $P(\text{parola}|\text{spam}) = 0$ → tutta la probabilità diventa zero, inutilizzabile.

**Laplace smoothing**: aggiungi una pseudo-conta $\alpha$ a tutti:

$$P(x_j | y) = \frac{\text{count}(x_j, y) + \alpha}{\text{count}(y) + \alpha V}$$

### Quando usare Naive Bayes

- Baseline rapidissimo per testi (1 minuto, AUC ~0.9 spesso).
- Pochissimi dati (NB regge bene poco).
- Inferenza ultra-veloce richiesta.
- Feature naturalmente indipendenti (raro).

## Support Vector Machines (SVM)

### Idea: massimizzare il margine

Trova l'iperpiano che **separa due classi con il margine più largo possibile**.

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
<text x="60" y="195" fill="#8b949e" font-size="11">classe -</text>
<text x="260" y="20" fill="#8b949e" font-size="11">classe +</text>
<text x="135" y="115" fill="#7aa2ff" font-size="11">margine</text>
</svg><div class="chart-caption">SVM lineare: massimizza la "strada" tra le classi. I punti sulla strada sono i "support vectors".</div></div>

Matematicamente: minimizza $\|\mathbf{w}\|^2$ soggetto a $y_i (\mathbf{w}^T \mathbf{x}_i + b) \geq 1$.

Nella forma **soft margin** (per dati non perfettamente separabili):

$$\min_{w,b} \frac{1}{2}\|w\|^2 + C \sum_i \xi_i \quad \text{s.t. } y_i(w^T x_i + b) \geq 1 - \xi_i, \xi_i \geq 0$$

$C$ controlla il tradeoff: $C$ alto = punisce molto gli errori (rischio overfit), $C$ basso = più tollerante.

### Hinge loss

La loss SVM equivalente:

$$L = \max(0, 1 - y_i (w^T x_i + b))$$

(con $y \in \{-1, +1\}$.) "Zero se classifico bene con margine ≥ 1, altrimenti pago la distanza dal margine."

### Kernel trick

Per dati non linearmente separabili, mappa in uno spazio a più dimensioni dove lo sono. Il "trucco" è non calcolare esplicitamente la mappa $\phi(x)$, ma usare un **kernel** $K(x, x') = \phi(x)^T \phi(x')$:

| Kernel | $K(x, x')$ | Uso |
|---|---|---|
| Lineare | $x^T x'$ | dati linearmente separabili |
| Polinomiale | $(x^T x' + c)^d$ | interazioni |
| RBF (Gaussiano) | $\exp(-\gamma \|x - x'\|^2)$ | default, flessibile |
| Sigmoide | $\tanh(\gamma x^T x' + c)$ | raro |

```python
from sklearn.svm import SVC
SVC(kernel='rbf', C=1.0, gamma='scale').fit(X_tr_s, y_tr)
```

### Iperparametri

- **C**: regolarizzazione (inverso). Tipico: `np.logspace(-2, 2, 10)`.
- **gamma** (RBF): larghezza del kernel. `'scale' = 1/(n_features * X.var())`, default sensato.

### Quando usare SVM

- Dataset **medio** ($n < 10^5$ — SVM scala male con $n$, complessità $\sim O(n^2)$).
- $p > n$ (più feature che esempi): SVM regge bene.
- Confini decisionali complessi ma con margine "leggibile".
- NLP con TF-IDF + Linear SVM è un baseline classico, ancora competitivo.

### Quando NON usare SVM

- Dataset enorme ($n > 10^6$).
- Servono probabilità calibrate (SVM non le dà naturalmente, vanno calibrate con Platt).
- Vuoi interpretabilità (lineare OK, RBF no).

## Comparazione

| | KNN | Naive Bayes | SVM (RBF) | Logistic |
|---|---|---|---|---|
| Training | istantaneo | velocissimo | $O(n^2)$ | $O(n p)$ |
| Inference | $O(n)$ naive | $O(p)$ | $O(p \cdot n_{SV})$ | $O(p)$ |
| Multi-classe | nativo | nativo | OvR/OvO | softmax |
| Probabilità | tramite vicini | sì | calibrate manuali | sì |
| Scaling feature | obbligatorio | spesso no | obbligatorio | consigliato |
| Tabular | OK ma marginale | base testi | ok ma data-hungry | gold standard |

## Esercizi

<details>
<summary>Esercizio 1 — KNN sul dataset Iris</summary>

```python
from sklearn.datasets import load_iris
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score
import matplotlib.pyplot as plt

X, y = load_iris(return_X_y=True)
acc = [cross_val_score(KNeighborsClassifier(k), X, y, cv=5).mean() for k in range(1, 30)]
plt.plot(range(1, 30), acc); plt.xlabel('k'); plt.ylabel('CV accuracy')
```

Il sweet spot tipico è $k=5-15$. Con $k=1$ overfitti, con $k=100$ underfitti.
</details>

<details>
<summary>Esercizio 2 — Spam con MultinomialNB</summary>

```python
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
# usa un dataset spam (ad esempio sms spam)
# semplificato:
data = pd.DataFrame({
    'text': ['win prize free!!','hello come tomorrow','free win money click','meeting at 3pm',
             'cheap meds discount','let\'s grab lunch'],
    'label':[1,0,1,0,1,0]
})
X_tr, X_te, y_tr, y_te = train_test_split(data.text, data.label, test_size=0.3, random_state=0)
pipe = make_pipeline = ...   # come sopra
```

Anche con 6 esempi NB impara qualcosa. Su dataset SMS reale (~5500 esempi) raggiunge ~98% accuracy in 1 secondo.
</details>

<details>
<summary>Esercizio 3 — SVM con grid search</summary>

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
<summary>Esercizio 4 — Confronto sui 4 modelli</summary>

Su `load_breast_cancer`, confronta KNN, NB, SVM, Logistic. Confronta accuracy, AUC, tempo di training, tempo di inference.

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

## Cosa portarti via

- KNN: zero training, esemplare-based, soffre alta dimensionalità.
- Naive Bayes: assunzione "ingenua" che funziona, base per testi, NLP storica.
- SVM: massimizza margine, kernel trick per non-linearità, scala male.
- Logistic resta in genere il default per tabulari con feature ingegnerizzate.

Prossimo: alberi decisionali.
