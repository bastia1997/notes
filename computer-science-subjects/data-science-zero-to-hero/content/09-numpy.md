---
title: "NumPy: pensare in array"
area: "Tooling"
summary: "ndarray, dtypes, broadcasting, indexing avanzato, vectorization, le operazioni che servono ogni giorno (e quelle che sembrano simili ma non lo sono)."
order: 9
level: "intermedio"
prereq:
  - "[[python-per-data-science]]"
  - "[[algebra-lineare]]"
tools:
  - "numpy"
---

# NumPy: pensare in array

## Perché NumPy

Tutto il calcolo numerico in Python passa da NumPy: pandas, scikit-learn, PyTorch (le sue API copiano NumPy intenzionalmente), TensorFlow, JAX, OpenCV.

**Cosa lo rende veloce**:

- Array a **memoria contigua** (un blocco lineare, non oggetti Python sparsi).
- Operazioni eseguite in **C** sotto il cofano.
- **Vectorization**: scrivere `a + b` invece di un for loop chiama un'unica funzione C su tutto l'array.

Confronto: somma di 10⁶ numeri.

```python
import numpy as np, time
arr = np.arange(1_000_000)
lst = list(range(1_000_000))

t = time.perf_counter(); sum(lst); print(f"python sum: {time.perf_counter()-t:.3f}s")
t = time.perf_counter(); arr.sum(); print(f"numpy sum: {time.perf_counter()-t:.4f}s")
# python sum: ~0.020s
# numpy sum: ~0.0007s  → ~30x più veloce
```

## ndarray e dtype

```python
import numpy as np

a = np.array([1, 2, 3])
a.shape       # (3,)
a.dtype       # int64
a.ndim        # 1
a.size        # 3
a.nbytes      # 24 (3 elementi × 8 byte)
```

### Tipi numerici (dtypes)

| dtype | bytes | range |
|---|---|---|
| `int8` | 1 | -128..127 |
| `int32` | 4 | ±2.1·10⁹ |
| `int64` | 8 | ±9.2·10¹⁸ |
| `float16` | 2 | ~10⁻⁵..10⁵, 3 cifre |
| `float32` | 4 | ~10⁻³⁸..10³⁸, 7 cifre |
| `float64` | 8 | ~10⁻³⁰⁸..10³⁰⁸, 15 cifre |
| `bool` | 1 | True/False |
| `complex128` | 16 | numeri complessi |

> Scegliere il dtype giusto può tagliare la RAM x4-x8. `float32` invece di `float64` raddoppia la velocità su GPU senza perdita significativa per ML.

```python
a = np.zeros(1_000_000, dtype=np.float32)
a.nbytes  # 4 MB (vs 8 MB con float64)
```

## Creare array

```python
np.array([1,2,3])             # da lista
np.zeros((3, 4))              # tutti zero, shape (3,4)
np.ones((2, 3))               # tutti uno
np.full((2, 2), 7)            # tutti 7
np.eye(4)                     # identità 4x4
np.arange(0, 10, 0.5)         # come range, ma con float
np.linspace(0, 1, 11)         # 11 punti equispaziati 0..1
np.logspace(0, 3, 4)          # [1, 10, 100, 1000]
np.empty((2, 2))              # non inizializzato (più veloce, ATTENZIONE)
```

### Random — l'API moderna

L'API legacy `np.random.rand`, `np.random.normal` ecc. **è da evitare** (stato globale). Usa il **Generator**:

```python
rng = np.random.default_rng(seed=42)
rng.standard_normal((100, 5))
rng.integers(0, 10, size=20)
rng.choice([0, 1], size=50, p=[0.3, 0.7])
rng.shuffle(array)
```

Riproducibile, thread-safe, ufficialmente raccomandata.

## Indexing e slicing

### Slicing 1D

```python
a = np.arange(10)
a[2:5]     # [2 3 4]
a[::2]     # [0 2 4 6 8]
a[::-1]    # inverso
```

> Lo slicing in NumPy crea una **vista** (no copia). Modificare la vista modifica l'originale. Per copia esplicita: `a[2:5].copy()`.

### Slicing 2D

```python
A = np.arange(20).reshape(4, 5)
# array([[ 0,  1,  2,  3,  4],
#        [ 5,  6,  7,  8,  9],
#        [10, 11, 12, 13, 14],
#        [15, 16, 17, 18, 19]])

A[1, 2]        # 7
A[1]           # riga 1: [5 6 7 8 9]
A[:, 2]        # colonna 2: [2 7 12 17]
A[:2, 1:4]     # sottomatrice
```

### Fancy indexing

```python
a = np.arange(10) * 10
a[[1, 3, 5]]        # [10 30 50]
A[[0, 2]]           # righe 0 e 2

# bool mask
a[a > 30]           # [40 50 60 70 80 90]

# combinato
A[A > 10] = 0       # azzera tutti i valori > 10
```

> Fancy indexing crea **copie**, slicing crea **viste**. Sorgente comune di bug.

## Operazioni elemento-per-elemento

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

a + b           # [5 7 9]
a * b           # [4 10 18]  (NON prodotto scalare)
a ** 2          # [1 4 9]
np.sqrt(a)      # [1 1.41 1.73]
np.exp(a)       # exponenziali
np.log(a)       # logaritmi
np.sin(a)
```

**Tutti** gli **ufunc** (universal functions) di NumPy sono vettorizzati e velocissimi.

### Aggregazioni

```python
A = np.arange(12).reshape(3, 4)
A.sum()             # 66 (totale)
A.sum(axis=0)       # [12 15 18 21] (per colonna)
A.sum(axis=1)       # [6 22 38] (per riga)
A.mean(axis=0)
A.std(ddof=1)       # sample std
A.argmax()          # indice del massimo (sull'array piatto)
A.argmax(axis=1)    # indice per riga
```

> Mnemonico: `axis=0` significa "collassa lungo le righe" → output ha forma di una riga. `axis=1` collassa lungo le colonne.

## Broadcasting (di nuovo, in dettaglio)

Regole:

1. Allinea le shape a destra.
2. Le dimensioni devono essere **uguali** o **una delle due deve essere 1**.
3. Le dimensioni di taglia 1 sono "stirate" virtualmente.

Esempi:

```python
A = np.ones((3, 4))
b = np.array([10, 20, 30, 40])      # shape (4,)
A + b                                # (3,4) + (4,) → broadcast a (3,4)

c = np.array([[1], [2], [3]])       # shape (3,1)
A + c                                # (3,4) + (3,1) → broadcast a (3,4)
```

### Caso problematico

```python
A = np.ones((3, 4))
b = np.array([10, 20, 30])           # shape (3,) — NO!
A + b                                # ValueError
A + b[:, None]                       # ora b è (3,1), funziona
```

`b[:, None]` aggiunge una dimensione. `None` è alias di `np.newaxis`.

## Reshape, concatenazione, split

```python
a = np.arange(12)
a.reshape(3, 4)
a.reshape(2, -1)         # -1 = "calcola tu"
a.T                      # trasposta (per array 2D)

# concatenazione
np.concatenate([a, b], axis=0)
np.vstack([a, b])        # stack verticale
np.hstack([a, b])        # stack orizzontale
np.column_stack([a, b])  # colonne (1D → 2D)

# split
np.split(a, 3)
np.array_split(a, 5)     # gestisce dimensioni non divisibili
```

## Linear algebra (richiamo)

```python
A @ B                    # prodotto matriciale
np.linalg.inv(A)         # inversa (raramente)
np.linalg.solve(A, b)    # risolve Ax=b
np.linalg.eig(A)         # autovalori
np.linalg.svd(A)         # SVD
np.linalg.norm(v)        # norma
```

## Trucchi e pattern frequenti

### One-hot encoding manuale

```python
y = np.array([0, 1, 2, 1, 0])
n_classes = 3
one_hot = np.eye(n_classes)[y]
# array([[1., 0., 0.],
#        [0., 1., 0.],
#        [0., 0., 1.],
#        [0., 1., 0.],
#        [1., 0., 0.]])
```

### Distance matrix

Distanze euclidee tra tutte le coppie di righe:

```python
X = np.random.randn(100, 5)
# broadcasting trick
diff = X[:, None, :] - X[None, :, :]   # (100, 100, 5)
D = np.sqrt((diff ** 2).sum(axis=-1))  # (100, 100)

# meglio (più rapido, evita la 3D):
sq = (X ** 2).sum(axis=1)
D2 = np.sqrt(sq[:, None] + sq[None, :] - 2 * X @ X.T)
```

### where, select, clip

```python
np.where(x > 0, x, 0)        # ReLU
np.clip(x, 0, 10)            # tronca in [0, 10]
np.select([x<0, x<5], [-1, 1], default=10)
```

### Argsort e top-k

```python
a = np.array([3, 1, 4, 1, 5, 9, 2, 6])
np.argsort(a)              # indici per ordinare
a[np.argsort(a)]           # ordinato
np.argsort(a)[-3:][::-1]   # top-3 in ordine decrescente
np.argpartition(a, -3)[-3:]  # top-3 (non ordinati, ma O(n))
```

## Memory layout, views, copies — la trappola

```python
A = np.arange(12).reshape(3, 4)
B = A[:, ::2]      # vista
B[0, 0] = 999
A[0, 0]            # 999 — modificato anche A!

C = A[[0, 1]]      # fancy indexing → copia
C[0, 0] = 0
A[0, 0]            # invariato
```

In dubbio: `arr.flags.writeable`, `arr.base is None` (None = è proprietaria della memoria, non vista).

## Performance: profile e ottimizza

```python
import numpy as np

# evita conversioni in dtype dinamiche
arr = np.array([1, 2, 3], dtype=np.float32)

# preallocazione
out = np.empty(n)
for i in range(n):
    out[i] = compute(i)
# meglio: vettorizza

# np.einsum è oro per operazioni complesse
np.einsum('ij,jk->ik', A, B)        # equivalente di A @ B
np.einsum('ii->i', A)               # diagonale
np.einsum('ij,ij->i', A, A)         # norme delle righe al quadrato
```

## Esercizi

<details>
<summary>Esercizio 1 — Standardizzazione</summary>

Standardizza una matrice (media 0, std 1 per colonna) **senza** scikit-learn:

```python
X = np.random.randn(100, 5) * 10 + 5
mu = X.mean(0)
sigma = X.std(0, ddof=1)
X_std = (X - mu) / sigma
print(X_std.mean(0), X_std.std(0, ddof=1))  # ~[0,...] [1,...]
```
</details>

<details>
<summary>Esercizio 2 — Detect outlier con z-score</summary>

Trova gli outlier (|z| > 3) in un dataset 1D.

```python
x = np.concatenate([np.random.randn(100), [10, -8, 12]])
z = (x - x.mean()) / x.std()
outliers = np.where(np.abs(z) > 3)[0]
print(outliers)  # indici dei 3 outlier
```
</details>

<details>
<summary>Esercizio 3 — Mini-batch sampling</summary>

Crea una funzione che divide $X$ (n × p) in batch di taglia 32, in ordine casuale:

```python
def batches(X, y, batch_size=32, seed=None):
    rng = np.random.default_rng(seed)
    idx = rng.permutation(len(X))
    for start in range(0, len(X), batch_size):
        b = idx[start:start+batch_size]
        yield X[b], y[b]

for Xb, yb in batches(X, y, 32):
    train_step(Xb, yb)
```
</details>

<details>
<summary>Esercizio 4 — Convoluzione 1D senza scipy</summary>

Implementa una convoluzione 1D con kernel di taglia 3:

```python
def conv1d(x, k):
    return np.array([
        (x[i:i+len(k)] * k).sum()
        for i in range(len(x) - len(k) + 1)
    ])

# o vettorizzato (più elegante):
def conv1d_vec(x, k):
    n_out = len(x) - len(k) + 1
    return np.array([(x[i:i+len(k)] * k).sum() for i in range(n_out)])

x = np.array([1, 2, 3, 4, 5])
k = np.array([1, 0, -1])
print(conv1d(x, k))  # [-2 -2 -2]
```
</details>

<details>
<summary>Esercizio 5 — Matrice di distanza Euclidea</summary>

Calcola la matrice $(n,n)$ delle distanze tra $n$ punti in $\mathbb{R}^p$.

```python
def pairwise_dist(X):
    sq = (X**2).sum(axis=1)
    return np.sqrt(np.maximum(sq[:, None] + sq[None, :] - 2 * X @ X.T, 0))

X = np.random.randn(5, 3)
D = pairwise_dist(X)
assert np.allclose(D, D.T)       # simmetrica
assert np.allclose(np.diag(D), 0) # diagonale zero
```
</details>

<details>
<summary>Esercizio 6 — Softmax stabile numericamente</summary>

Implementa softmax evitando overflow:

```python
def softmax(x, axis=-1):
    x = x - x.max(axis=axis, keepdims=True)   # stabilità: sottrai max
    e = np.exp(x)
    return e / e.sum(axis=axis, keepdims=True)

logits = np.array([1000., 1001., 1002.])
softmax(logits)  # [0.09, 0.24, 0.67] — senza la sottrazione: NaN
```

Trucco standard: sottrarre il massimo non cambia il risultato (per proprietà di exp + normalizzazione) ma evita exp di numeri giganti.
</details>

## Cosa portarti via

- Pensa in array, non in for loop.
- Broadcasting moltiplica la potenza espressiva — studialo.
- Slicing = vista, fancy = copia. Confondersi = bug.
- `np.linalg.solve` > `inv()`. `@` per matmul, `*` per element-wise.
- `default_rng()` per random — non l'API legacy.
- Software stack: `np.einsum` è una sciabola. Imparalo quando ti senti pronto.

Prossimo: pandas, il coltellino svizzero per dati tabellari.
