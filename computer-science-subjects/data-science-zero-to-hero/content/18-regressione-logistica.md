---
title: "Regressione logistica e classificazione"
area: "Machine Learning"
summary: "Sigmoid, log-loss, odds e log-odds, MLE, multi-classe, soglie decisionali. La 'logistica' batte le NN nel 60% dei problemi tabellari reali."
order: 18
level: "intermedio"
prereq:
  - "[[regressione-lineare]]"
  - "[[calcolo-ottimizzazione]]"
tools:
  - "scikit-learn, statsmodels"
---

# Regressione logistica e classificazione

## Perché non OLS per la classificazione

Se applichi OLS a $y \in \{0, 1\}$, ottieni:

- Predizioni fuori da $[0, 1]$ (insensate come probabilità).
- Eteroschedasticità (varianza dipende da $p$).
- Loss inadeguata: il modello "punisce poco" un errore certo (es: predizione 0.99 quando il vero è 0).

Soluzione: **logistic regression**.

## Il modello

Per la probabilità di classe 1:

$$P(y=1 | \mathbf{x}) = \sigma(\mathbf{w}^T \mathbf{x} + b) = \frac{1}{1 + e^{-(\mathbf{w}^T \mathbf{x} + b)}}$$

La **sigmoid** $\sigma$ schiaccia $(-\infty, \infty)$ in $(0, 1)$.

<div class="chart"><svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="160" x2="340" y2="160" stroke="#555"/>
<line x1="180" y1="20" x2="180" y2="160" stroke="#555"/>
<line x1="30" y1="30" x2="340" y2="30" stroke="#333" stroke-dasharray="3,3"/>
<line x1="30" y1="95" x2="340" y2="95" stroke="#333" stroke-dasharray="3,3"/>
<path d="M 30 158 C 130 158 230 32 340 32" fill="none" stroke="#7aa2ff" stroke-width="2.5"/>
<text x="345" y="34" fill="#7aa2ff" font-size="11">1</text>
<text x="345" y="99" fill="#7aa2ff" font-size="11">0.5</text>
<text x="345" y="165" fill="#7aa2ff" font-size="11">0</text>
<text x="185" y="175" fill="#ffb347" font-size="11">z=0</text>
</svg><div class="chart-caption">La sigmoide: lineare attorno a 0, satura a 0 e 1.</div></div>

## Log-odds (logit)

Riarrangiando:

$$\log \frac{P(y=1|x)}{P(y=0|x)} = \mathbf{w}^T \mathbf{x} + b$$

Il **log-odds** è lineare in $\mathbf{x}$. Interpretazione:

> $w_j$ = aumento del log-odds per un'unità in più di $x_j$.

Esponenziando: $e^{w_j}$ = **moltiplicatore degli odds** per un'unità in più di $x_j$. Es: $w_j = 0.69 \Rightarrow e^{0.69} \approx 2$: la presenza di quella feature **raddoppia gli odds**.

## Loss: log-likelihood

Per un singolo esempio:

$$P(y_i | \mathbf{x}_i) = p_i^{y_i} (1 - p_i)^{1 - y_i}$$

Likelihood su tutti gli esempi:

$$L(\mathbf{w}) = \prod_i p_i^{y_i} (1-p_i)^{1-y_i}$$

Log-likelihood (massimizzare) o **cross-entropy negativa** (minimizzare):

$$-\log L(\mathbf{w}) = -\sum_i [y_i \log p_i + (1 - y_i) \log(1-p_i)]$$

Questa loss è **convessa** in $\mathbf{w}$ → gradient descent trova il minimo globale. Niente forma chiusa come OLS, ma convergenza garantita.

## Gradiente

Per chi vuole derivare:

$$\nabla_{\mathbf{w}} L = X^T (\mathbf{p} - \mathbf{y})$$

dove $\mathbf{p}$ è il vettore delle probabilità predette. Stessa forma dell'OLS, con $\mathbf{p}$ al posto di $\hat{y}$. Bello.

Quindi:

$$\mathbf{w}_{t+1} = \mathbf{w}_t - \eta X^T (\mathbf{p}_t - \mathbf{y})$$

## Esempio

```python
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)

sc = StandardScaler().fit(X_tr)
X_tr_s = sc.transform(X_tr); X_te_s = sc.transform(X_te)

m = LogisticRegression(C=1.0, max_iter=5000).fit(X_tr_s, y_tr)
print("Accuracy:", m.score(X_te_s, y_te))
print("Coefficienti (primi 5):", m.coef_[0, :5])
```

> `C` è l'**inverso** della regolarizzazione: `C` grande = poca regolarizzazione, `C` piccolo = forte. Default `C=1.0`.

## Regolarizzazione (di nuovo)

```python
LogisticRegression(penalty='l2', C=1.0)       # default Ridge-like
LogisticRegression(penalty='l1', solver='liblinear', C=0.5)
LogisticRegression(penalty='elasticnet', solver='saga', l1_ratio=0.5, C=0.5)
```

L1 fa feature selection automatica.

## Multi-classe: due strategie

### One-vs-Rest (OvR)

$K$ classificatori binari, ognuno "classe $k$" vs "tutto il resto". Si sceglie la classe con probabilità massima.

### Softmax (Multinomial Logistic)

Generalizzazione diretta:

$$P(y=k | \mathbf{x}) = \frac{e^{\mathbf{w}_k^T \mathbf{x}}}{\sum_j e^{\mathbf{w}_j^T \mathbf{x}}}$$

Loss = cross-entropy categoriale:

$$L = -\sum_i \sum_k \mathbb{1}[y_i=k] \log P(y_i=k|x_i)$$

```python
LogisticRegression(multi_class='multinomial', solver='lbfgs')
```

> Default in sklearn: `'auto'`, sceglie multinomial se solver supporta. In genere migliore di OvR.

## Soglia decisionale

Di default `predict()` usa soglia 0.5. Ma 0.5 non è sacro:

- Se i **falsi positivi** costano molto (es: spam che blocca email importanti) → soglia più alta.
- Se i **falsi negativi** costano molto (es: cancro non diagnosticato) → soglia più bassa.

Scegli la soglia in base al **costo**:

```python
proba = m.predict_proba(X_te)[:, 1]
y_pred = (proba > 0.3).astype(int)  # ad esempio
```

Il modo professionale: ottimizza la soglia su validation rispetto alla metrica che ti interessa (F1, precision a recall fissa, etc).

## Metriche per la classificazione

Vedi sezione dedicata. Sintesi:

| Metrica | Formula | Quando |
|---|---|---|
| Accuracy | $(TP+TN)/N$ | classi bilanciate, costi uguali |
| Precision | $TP/(TP+FP)$ | importa non sbagliare positivi |
| Recall | $TP/(TP+FN)$ | importa trovare tutti positivi |
| F1 | media armonica P, R | compromesso |
| AUC ROC | area sotto ROC | ranking, indip. dalla soglia |
| AUC PR | area sotto Precision-Recall | per classi sbilanciate |
| Log loss | cross-entropy | calibrazione probabilità |

## Probabilità calibrate

La logistica produce probabilità **abbastanza calibrate** di default. Verifica con **reliability diagram**:

```python
from sklearn.calibration import calibration_curve
prob_true, prob_pred = calibration_curve(y_te, m.predict_proba(X_te)[:, 1], n_bins=10)
import matplotlib.pyplot as plt
plt.plot([0,1],[0,1], '--', color='gray')
plt.plot(prob_pred, prob_true, marker='o')
plt.xlabel('Probabilità predetta'); plt.ylabel('Frazione reale')
```

Se la curva sta sotto la diagonale: modello sovrastima. Sopra: sottostima.

Per **calibrare**:
```python
from sklearn.calibration import CalibratedClassifierCV
cal = CalibratedClassifierCV(m, method='sigmoid', cv=5).fit(X_tr, y_tr)
```

> Random Forest e SVM tendono a essere mal calibrati. La logistica è già OK.

## Logit nel mondo reale: l'interpretabilità

Settori dove la logistica resta il modello principale:

- **Medicina**: clinical scoring, calibrazione critica.
- **Finanza/credito**: regolatori richiedono interpretabilità.
- **Marketing**: lift, propensity scoring.
- **Politica/sociologia**: capire effetti di variabili.

Il fatto che `exp(w_j)` sia un odds ratio è cruciale per la comunicazione. "Fumare aumenta gli odds di cancro al polmone del 15×" è una frase che si può scrivere e capire.

## Esercizi

<details>
<summary>Esercizio 1 — Interpretare i coefficienti</summary>

Modello logistico con feature `eta` (anni) e `fumatore` (0/1). Coefficienti standardizzati: $w_\text{eta} = 0.04$, $w_\text{fumo} = 1.5$.

- Quanto aumentano gli odds per un anno in più?
- Quanto aumentano per essere fumatori?

**Risposta**: $e^{0.04} \approx 1.041$ → +4.1% per anno. $e^{1.5} \approx 4.48$ → odds quasi 4.5× per fumatori.
</details>

<details>
<summary>Esercizio 2 — Implementa logistic da zero</summary>

```python
import numpy as np

def sigmoid(z): return 1 / (1 + np.exp(-z))

def train(X, y, lr=0.1, n_iter=1000):
    X_ = np.column_stack([np.ones(len(X)), X])
    w = np.zeros(X_.shape[1])
    for _ in range(n_iter):
        p = sigmoid(X_ @ w)
        grad = X_.T @ (p - y) / len(y)
        w -= lr * grad
    return w

# test
rng = np.random.default_rng(0)
X = rng.standard_normal((500, 3))
true_w = np.array([0.5, 1.0, -1.5])
y = (sigmoid(0.2 + X @ true_w) > rng.uniform(size=500)).astype(int)
w_hat = train(X, y, lr=0.5, n_iter=2000)
print("hat:", w_hat)        # ~[0.2, 0.5, 1.0, -1.5]
```
</details>

<details>
<summary>Esercizio 3 — Tuning della soglia</summary>

Per uno screening del cancro, falsi negativi sono catastrofici. Trova la soglia che produce recall ≥ 0.95:

```python
from sklearn.metrics import precision_recall_curve
proba = m.predict_proba(X_val)[:, 1]
prec, rec, thr = precision_recall_curve(y_val, proba)
mask = rec >= 0.95
idx = np.argmax(prec[:-1] * mask[:-1])
print(f"soglia: {thr[idx]:.3f}, precision: {prec[idx]:.3f}, recall: {rec[idx]:.3f}")
```
</details>

<details>
<summary>Esercizio 4 — Logistica vs alberi</summary>

Su Titanic, allena logistica e Random Forest. Confronta AUC e interpretabilità.

```python
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import train_test_split

df = sns.load_dataset('titanic').dropna(subset=['age','embarked'])
y = df.survived
X = df[['pclass','age','sibsp','parch','fare']].assign(
    male=(df.sex == 'male').astype(int)
)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)

sc = StandardScaler().fit(X_tr)
lr = LogisticRegression(max_iter=2000).fit(sc.transform(X_tr), y_tr)
rf = RandomForestClassifier(n_estimators=300, random_state=0).fit(X_tr, y_tr)

print("Logistic AUC:", roc_auc_score(y_te, lr.predict_proba(sc.transform(X_te))[:,1]))
print("RF AUC:", roc_auc_score(y_te, rf.predict_proba(X_te)[:,1]))
print("Coefficienti logistica:", dict(zip(X.columns, lr.coef_[0])))
```

Spesso su Titanic: RF leggermente meglio, ma logistica più interpretabile.
</details>

## Cosa portarti via

- Logistica = OLS con sigmoid e log-loss.
- Coefficienti = log-odds. $e^w$ = odds ratio.
- Loss convessa → minimo globale.
- Soglia decisionale: 0.5 è default, ma quasi mai ottimale per costi asimmetrici.
- Probabilità calibrate "out of the box" — più di quasi ogni altro modello.

Prossimo: KNN e Naive Bayes — modelli semplici, ancora utili.
