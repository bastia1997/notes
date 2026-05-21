---
title: "Algebra lineare per data scientist"
area: "Matematica"
summary: "Vettori, matrici, prodotto scalare, norme, autovalori. Senza algebra lineare PCA, regressione, NN, embeddings sono scatole nere — qui apriamo la scatola."
order: 3
level: "intermedio"
prereq:
  - "matematica liceo (vettori 2D, sistemi lineari)"
tools:
  - "carta + penna"
  - "NumPy per verifiche"
---

# Algebra lineare per data scientist

## Perché ti serve davvero

I dati in ML sono **sempre** matrici: $n$ righe (osservazioni), $p$ colonne (feature). Ogni operazione su questi dati — proiettarli, ruotarli, comprimerli, classificarli — è un'operazione di algebra lineare. Non capire algebra lineare significa usare scikit-learn alla cieca.

Concetti che richiedono algebra lineare diretta:

- **PCA** (autovalori della matrice di covarianza)
- **Regressione lineare** (soluzione in forma chiusa: $\hat{\beta} = (X^T X)^{-1} X^T y$)
- **Sistemi di raccomandazione** (fattorizzazione di matrici, SVD)
- **Reti neurali** (ogni layer è $y = W x + b$)
- **Embeddings** (vettori in spazi ad alta dimensione)
- **Attention** in Transformer (è una moltiplicazione matriciale "intelligente")

## Vettori

Un **vettore** è una lista ordinata di numeri:

$$\mathbf{v} = \begin{bmatrix} 3 \\ -1 \\ 2 \end{bmatrix} \in \mathbb{R}^3$$

In ML un vettore rappresenta tipicamente **una osservazione**: ad esempio un cliente è $(eta, reddito, spese, ...) \in \mathbb{R}^p$ dove $p$ è il numero di feature.

### Operazioni base

**Somma**: componente per componente.

$$\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} + \begin{bmatrix} 4 \\ 5 \\ 6 \end{bmatrix} = \begin{bmatrix} 5 \\ 7 \\ 9 \end{bmatrix}$$

**Prodotto per scalare**: moltiplica ogni componente.

$$2 \cdot \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} = \begin{bmatrix} 2 \\ 4 \\ 6 \end{bmatrix}$$

### Prodotto scalare (dot product)

Il **cuore** dell'algebra lineare applicata. Definizione:

$$\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i = a_1 b_1 + a_2 b_2 + \dots + a_n b_n$$

Esempio: $(1, 2, 3) \cdot (4, 5, 6) = 4 + 10 + 18 = 32$.

**Interpretazione geometrica**:

$$\mathbf{a} \cdot \mathbf{b} = \|\mathbf{a}\| \|\mathbf{b}\| \cos\theta$$

dove $\theta$ è l'angolo tra i vettori. Conseguenze cruciali:

- Se $\mathbf{a} \cdot \mathbf{b} = 0$, sono **ortogonali** (perpendicolari).
- Se $\mathbf{a} \cdot \mathbf{b} > 0$, puntano "verso lo stesso lato".
- È la base della **similarità coseno**: $\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \|\mathbf{b}\|}$, usatissima in NLP e recommender.

<div class="chart"><svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7aa2ff"/></marker><marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ffb347"/></marker></defs>
<line x1="40" y1="170" x2="340" y2="170" stroke="#444" stroke-width="1"/>
<line x1="40" y1="20" x2="40" y2="170" stroke="#444" stroke-width="1"/>
<line x1="40" y1="170" x2="220" y2="50" stroke="#7aa2ff" stroke-width="2.5" marker-end="url(#ah)"/>
<line x1="40" y1="170" x2="300" y2="110" stroke="#ffb347" stroke-width="2.5" marker-end="url(#ah2)"/>
<path d="M 79 161 A 40 40 0 0 1 73 148" fill="none" stroke="#c084fc" stroke-width="2"/>
<text x="92" y="152" fill="#c084fc" font-size="13">θ</text>
<text x="225" y="42" fill="#7aa2ff" font-size="13">a</text>
<text x="305" y="105" fill="#ffb347" font-size="13">b</text>
</svg><div class="chart-caption">Due vettori in ℝ²: il prodotto scalare misura quanto sono "allineati".</div></div>

### Norme

La **norma L2** (lunghezza euclidea):

$$\|\mathbf{v}\|_2 = \sqrt{\sum_i v_i^2}$$

La **norma L1** (somma dei valori assoluti):

$$\|\mathbf{v}\|_1 = \sum_i |v_i|$$

In ML appaiono come regolarizzazione: **Ridge** usa L2, **Lasso** usa L1 — vedremo perché producono comportamenti diversi (Lasso forza coefficienti esattamente a zero, Ridge li riduce ma raramente li azzera). Dipende dalla forma della "palla" della norma:

<div class="chart"><svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(70,80)">
  <line x1="-60" y1="0" x2="60" y2="0" stroke="#555"/>
  <line x1="0" y1="-60" x2="0" y2="60" stroke="#555"/>
  <polygon points="0,-50 50,0 0,50 -50,0" fill="rgba(255,179,71,0.18)" stroke="#ffb347" stroke-width="2"/>
  <text x="-25" y="-65" fill="#ffb347" font-size="12">‖v‖₁=1</text>
</g>
<g transform="translate(210,80)">
  <line x1="-60" y1="0" x2="60" y2="0" stroke="#555"/>
  <line x1="0" y1="-60" x2="0" y2="60" stroke="#555"/>
  <circle r="50" fill="rgba(122,162,255,0.18)" stroke="#7aa2ff" stroke-width="2"/>
  <text x="-25" y="-65" fill="#7aa2ff" font-size="12">‖v‖₂=1</text>
</g>
</svg><div class="chart-caption">Palla unitaria L1 (rombo) vs L2 (cerchio). Gli spigoli del rombo forzano soluzioni sparse.</div></div>

## Matrici

Una **matrice** $A \in \mathbb{R}^{m \times n}$ è una griglia di numeri con $m$ righe e $n$ colonne:

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \in \mathbb{R}^{2 \times 3}$$

In ML una **matrice di design** $X$ ha forma $(n, p)$: $n$ osservazioni, $p$ feature. Ogni riga è un esempio.

### Moltiplicazione matriciale

Regola: per moltiplicare $A \cdot B$, il numero di colonne di $A$ deve essere uguale al numero di righe di $B$.

$$A_{m \times k} \cdot B_{k \times n} = C_{m \times n}$$

L'elemento $C_{ij}$ è il prodotto scalare della riga $i$ di $A$ con la colonna $j$ di $B$:

$$C_{ij} = \sum_{l=1}^{k} A_{il} B_{lj}$$

Esempio:
$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \cdot \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$$

Calcolo del $(1,1)$: $1 \cdot 5 + 2 \cdot 7 = 19$. **Verifica sempre a mano** un esempio piccolo, è l'unico modo per cementare l'intuizione.

> **Attenzione**: la moltiplicazione matriciale **non è commutativa**: $AB \neq BA$ in generale.

### Matrice identità, inversa, trasposta

**Identità** $I_n$: 1 sulla diagonale, 0 altrove. $I A = A I = A$.

**Trasposta** $A^T$: scambia righe e colonne. $(A^T)_{ij} = A_{ji}$.

**Inversa** $A^{-1}$: esiste solo per matrici **quadrate non singolari**, e soddisfa $A A^{-1} = I$.

Per matrici $2 \times 2$:
$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad-bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

dove $ad - bc$ è il **determinante**. Se è zero, la matrice è singolare e non si inverte.

> **In pratica non si calcola mai l'inversa a mano** in ML. Si risolve un sistema lineare con metodi numerici (LU, QR, Cholesky). Calcolare l'inversa per poi moltiplicarla è instabile e lento.

### Rank di una matrice

Il **rango** è il numero di righe (o colonne) linearmente indipendenti. Una matrice $n \times p$ ha rango massimo $\min(n, p)$.

- Se $X$ ha colonne **collineari** (es: due feature identiche), il rango cala e $X^T X$ diventa singolare → regressione lineare esplode.
- Soluzione: rimuovere feature ridondanti o usare regolarizzazione (Ridge ne è immune).

## Sistemi lineari e regressione

L'equazione fondamentale di mezza ML:

$$\mathbf{y} = X \boldsymbol{\beta} + \boldsymbol{\epsilon}$$

dove:
- $\mathbf{y} \in \mathbb{R}^n$ — target
- $X \in \mathbb{R}^{n \times p}$ — feature
- $\boldsymbol{\beta} \in \mathbb{R}^p$ — coefficienti (quello che vogliamo trovare)
- $\boldsymbol{\epsilon}$ — rumore

La **regressione lineare** trova $\boldsymbol{\beta}$ minimizzando $\|\mathbf{y} - X\boldsymbol{\beta}\|_2^2$. La soluzione in forma chiusa (**OLS — Ordinary Least Squares**):

$$\hat{\boldsymbol{\beta}} = (X^T X)^{-1} X^T \mathbf{y}$$

Questa formula è **la più importante** di tutto il percorso. Comparirà ovunque: kernel ridge, GLM, neural networks, Gaussian processes. Ne capirai la derivazione nella sezione su regressione lineare.

## Autovalori e autovettori

Per una matrice quadrata $A$, un **autovettore** $\mathbf{v}$ e il suo **autovalore** $\lambda$ soddisfano:

$$A \mathbf{v} = \lambda \mathbf{v}$$

Significato: $A$ applicata a $\mathbf{v}$ produce lo stesso $\mathbf{v}$ scalato di $\lambda$. Geometricamente, $\mathbf{v}$ è una "direzione preferita" della trasformazione.

**Esempio**: $A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$. Autovettori: $(1,0)$ con $\lambda=2$, $(0,1)$ con $\lambda=3$.

<div class="chart"><svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="ah3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7aa2ff"/></marker><marker id="ah4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ffb347"/></marker></defs>
<g transform="translate(20,100)">
  <line x1="0" y1="0" x2="280" y2="0" stroke="#444"/>
  <line x1="140" y1="-90" x2="140" y2="90" stroke="#444"/>
  <line x1="140" y1="0" x2="180" y2="0" stroke="#7aa2ff" stroke-width="3" marker-end="url(#ah3)"/>
  <line x1="140" y1="0" x2="140" y2="-60" stroke="#ffb347" stroke-width="3" marker-end="url(#ah4)"/>
  <text x="195" y="-4" fill="#7aa2ff" font-size="11">Av (λ=2)</text>
  <text x="150" y="-65" fill="#ffb347" font-size="11">Av (λ=3)</text>
  <line x1="140" y1="0" x2="160" y2="0" stroke="#7aa2ff" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="140" y1="0" x2="140" y2="-20" stroke="#ffb347" stroke-width="1.5" stroke-dasharray="3,2"/>
</g>
</svg><div class="chart-caption">A scala vettori lungo le direzioni principali (autovettori) di fattori λ (autovalori).</div></div>

**Decomposizione spettrale**: per una matrice simmetrica $A$, si può scrivere $A = Q \Lambda Q^T$ dove $\Lambda$ è diagonale con gli autovalori e $Q$ ha gli autovettori come colonne. Questa è la chiave di **PCA**.

## SVD: il coltellino svizzero

La **Singular Value Decomposition** scompone qualsiasi matrice $A \in \mathbb{R}^{m \times n}$ come:

$$A = U \Sigma V^T$$

dove:
- $U \in \mathbb{R}^{m \times m}$, $V \in \mathbb{R}^{n \times n}$ matrici ortogonali (rotazioni)
- $\Sigma \in \mathbb{R}^{m \times n}$ diagonale con i **valori singolari** $\sigma_1 \geq \sigma_2 \geq \dots \geq 0$

Interpretazione: ogni trasformazione lineare è una **rotazione + scala + rotazione**.

<div class="chart"><svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,10)">
  <text x="50" y="-2" fill="#8b949e" font-size="11" text-anchor="middle">cerchio unitario</text>
  <circle cx="50" cy="80" r="40" fill="rgba(122,162,255,0.12)" stroke="#7aa2ff" stroke-width="2"/>
  <line x1="50" y1="80" x2="90" y2="80" stroke="#ffb347" stroke-width="2"/>
  <line x1="50" y1="80" x2="50" y2="40" stroke="#5ee2c4" stroke-width="2"/>
</g>
<text x="135" y="95" fill="#c084fc" font-size="14">→ Vᵀ</text>
<g transform="translate(160,10)">
  <text x="50" y="-2" fill="#8b949e" font-size="11" text-anchor="middle">rotazione</text>
  <circle cx="50" cy="80" r="40" fill="rgba(122,162,255,0.12)" stroke="#7aa2ff" stroke-width="2"/>
  <line x1="50" y1="80" x2="78" y2="52" stroke="#ffb347" stroke-width="2"/>
  <line x1="50" y1="80" x2="78" y2="108" stroke="#5ee2c4" stroke-width="2"/>
</g>
<text x="275" y="95" fill="#c084fc" font-size="14">→ Σ</text>
<g transform="translate(300,10)">
  <text x="60" y="-2" fill="#8b949e" font-size="11" text-anchor="middle">scala (ellisse)</text>
  <ellipse cx="60" cy="80" rx="55" ry="25" fill="rgba(122,162,255,0.12)" stroke="#7aa2ff" stroke-width="2"/>
  <line x1="60" y1="80" x2="98" y2="61" stroke="#ffb347" stroke-width="2"/>
  <line x1="60" y1="80" x2="79" y2="98" stroke="#5ee2c4" stroke-width="2"/>
</g>
<text x="435" y="95" fill="#c084fc" font-size="14">→ U</text>
<g transform="translate(460,10)">
  <text x="50" y="-2" fill="#8b949e" font-size="11" text-anchor="middle">rotazione</text>
  <ellipse cx="50" cy="80" rx="55" ry="25" fill="rgba(122,162,255,0.12)" stroke="#7aa2ff" stroke-width="2" transform="rotate(-25 50 80)"/>
  <line x1="50" y1="80" x2="80" y2="48" stroke="#ffb347" stroke-width="2"/>
  <line x1="50" y1="80" x2="34" y2="100" stroke="#5ee2c4" stroke-width="2"/>
</g>
<text x="280" y="170" fill="#7aa2ff" font-size="11" text-anchor="middle">Una matrice arbitraria = rotazione → scala (in 2 direzioni) → rotazione.</text>
</svg><div class="chart-caption">SVD scompone QUALSIASI trasformazione lineare in tre operazioni semplici. Le σ sono gli assi dell'ellisse.</div></div>

**Applicazioni**:

- **PCA**: i primi $k$ valori singolari catturano la varianza principale; troncare a $k$ comprime i dati.
- **Recommender systems**: SVD su matrice utente×film fattorizza in fattori latenti.
- **Pseudoinversa** $A^+$: serve quando $A$ non è quadrata o singolare. È $V \Sigma^+ U^T$ dove $\Sigma^+$ inverte i valori singolari non nulli.

## NumPy: tutto questo in pratica

```python
import numpy as np

# vettori
v = np.array([1, 2, 3])
w = np.array([4, 5, 6])

v + w                       # somma
v * w                       # prodotto element-wise
v @ w                       # prodotto scalare → 32
np.dot(v, w)                # equivalente
np.linalg.norm(v)           # ||v||₂ = √14

# matrici
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

A @ B                       # moltiplicazione matriciale
A * B                       # element-wise (NON la moltiplicazione!)
A.T                         # trasposta
np.linalg.inv(A)            # inversa
np.linalg.det(A)            # determinante
np.linalg.matrix_rank(A)    # rango

# autovalori
eigvals, eigvecs = np.linalg.eig(A)

# SVD
U, S, Vt = np.linalg.svd(A)

# risolvere sistema lineare Ax = b (NON usare inv)
b = np.array([1, 2])
x = np.linalg.solve(A, b)   # più stabile di inv(A) @ b
```

> **Regola d'oro**: usa `@` per moltiplicazione matriciale, `*` per element-wise. Mai confonderli.

## Broadcasting: il superpotere di NumPy

Quando operi tra array di forme diverse, NumPy le "stira" automaticamente:

```python
A = np.array([[1, 2, 3],
              [4, 5, 6]])    # shape (2, 3)
v = np.array([10, 20, 30])   # shape (3,)

A + v
# array([[11, 22, 33],
#        [14, 25, 36]])
```

Regole di broadcasting (semplificate): allinea le shape a destra, le dimensioni devono essere uguali o una delle due deve essere 1.

```python
# OK: (3, 1) + (1, 4) → (3, 4)
# OK: (5, 1) + (5,) → (5, 5)
# NO: (3, 2) + (4,) → ValueError
```

Esempio frequente — centratura di una matrice:

```python
X = np.random.randn(100, 5)        # 100 osservazioni, 5 feature
X_centered = X - X.mean(axis=0)    # sottrae media per colonna
# X.mean(axis=0).shape == (5,)
# broadcast a (100, 5)
```

## Esercizi

<details>
<summary>Esercizio 1 — Prodotto scalare a mano</summary>

Calcola a mano: $(2, -1, 4) \cdot (3, 5, -2)$.

**Soluzione**: $6 - 5 - 8 = -7$. Verifica con NumPy.
</details>

<details>
<summary>Esercizio 2 — Verifica ortogonalità</summary>

I vettori $(1, 2)$ e $(-2, 1)$ sono ortogonali? E $(1, 2, 3)$ e $(4, -5, 2)$?

**Soluzione**: Primo: $-2 + 2 = 0$ → sì. Secondo: $4 - 10 + 6 = 0$ → sì.
</details>

<details>
<summary>Esercizio 3 — Moltiplicazione matriciale</summary>

Calcola $A \cdot B$ a mano dove:

$$A = \begin{bmatrix} 2 & 1 \\ -1 & 3 \end{bmatrix}, \quad B = \begin{bmatrix} 4 & 0 \\ 1 & 2 \end{bmatrix}$$

**Soluzione**:
$$AB = \begin{bmatrix} 2\cdot4+1\cdot1 & 2\cdot0+1\cdot2 \\ -1\cdot4+3\cdot1 & -1\cdot0+3\cdot2 \end{bmatrix} = \begin{bmatrix} 9 & 2 \\ -1 & 6 \end{bmatrix}$$
</details>

<details>
<summary>Esercizio 4 — OLS in 5 righe</summary>

Implementa OLS da zero e confronta con sklearn:

```python
import numpy as np
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(42)
X = rng.standard_normal((100, 3))
y = X @ np.array([1.5, -2.0, 0.5]) + rng.standard_normal(100) * 0.1

# OLS a mano
X_b = np.column_stack([np.ones(100), X])    # intercetta
beta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
print("manuale:", beta)

# sklearn
m = LinearRegression().fit(X, y)
print("sklearn:", m.intercept_, m.coef_)
```

Devono coincidere a meno di errori numerici. (In pratica, sostituisci `inv(X.T @ X) @ X.T @ y` con `np.linalg.lstsq(X_b, y, rcond=None)[0]` — più stabile.)
</details>

<details>
<summary>Esercizio 5 — Similarità coseno tra documenti</summary>

Tre brevi documenti, rappresentati come vettori bag-of-words su un vocabolario di 4 parole:

- $d_1 = (3, 0, 1, 0)$ — "cane gatto cane cane"
- $d_2 = (2, 0, 1, 1)$ — "cane gatto cane volpe"
- $d_3 = (0, 4, 0, 0)$ — "topo topo topo topo"

Calcola la similarità coseno tra ogni coppia.

```python
import numpy as np
docs = np.array([[3,0,1,0],[2,0,1,1],[0,4,0,0]])
def cos_sim(a, b):
    return (a @ b) / (np.linalg.norm(a)*np.linalg.norm(b))

for i in range(3):
    for j in range(i+1, 3):
        print(f"d{i+1}-d{j+1}: {cos_sim(docs[i], docs[j]):.3f}")
```

Output atteso: d1–d2 ≈ 0.96 (molto simili), d1–d3 = 0 (ortogonali), d2–d3 = 0.

Questo è esattamente come funziona la ricerca semantica nelle prime versioni dei motori di ricerca, e ancora oggi nei sistemi di RAG (Retrieval-Augmented Generation).
</details>

<details>
<summary>Esercizio 6 — Rank di una matrice</summary>

Qual è il rango di:
$$M = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 0 & 0 & 0 \end{bmatrix}?$$

**Soluzione**: rango 1. La seconda riga è 2× la prima, la terza è zero. Solo una riga è indipendente.

```python
np.linalg.matrix_rank(np.array([[1,2,3],[2,4,6],[0,0,0]]))  # 1
```
</details>

<details>
<summary>Esercizio 7 — PCA da zero (anteprima)</summary>

Usando SVD, riduci a 2D un dataset random 5D:

```python
rng = np.random.default_rng(0)
X = rng.standard_normal((200, 5))
X_c = X - X.mean(0)
U, S, Vt = np.linalg.svd(X_c, full_matrices=False)
X_2d = U[:, :2] * S[:2]    # proiezione sui primi 2 componenti
print(X_2d.shape)          # (200, 2)
```

I dettagli su PCA nella sezione dedicata. Per ora goditi il fatto che hai appena ridotto 5 dimensioni a 2 con quattro righe di codice.
</details>

## Cosa portarti via

- I dati sono matrici, e i modelli sono trasformazioni di matrici.
- Prodotto scalare = similarità. Norme = "quanto è grande". Autovalori = direzioni preferite.
- $\hat{\beta} = (X^T X)^{-1} X^T y$ è la formula da memorizzare.
- SVD è il coltellino svizzero: PCA, recommender, pseudoinversa.
- **Mai** calcolare l'inversa esplicitamente: usa `np.linalg.solve` o `lstsq`.

## Letture

- **Gilbert Strang** — "Introduction to Linear Algebra" (e le sue video-lezioni MIT 18.06 su YouTube, gratis): la cura per chiunque odi l'algebra lineare.
- **3Blue1Brown** — serie "Essence of Linear Algebra" (YouTube): 15 video, 3 ore totali, ti cambia il cervello.
- **Boyd & Vandenberghe** — "Introduction to Applied Linear Algebra" (gratis online): orientato all'applicazione.

Prossima sezione: calcolo differenziale e gradient descent. La discesa del gradiente — il motore di ogni rete neurale.
