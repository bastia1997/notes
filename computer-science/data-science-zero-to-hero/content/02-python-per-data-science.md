---
title: "Python per data science: setup professionale"
area: "Fondamenti"
summary: "Ambienti virtuali, gestione dipendenze, Jupyter vs script, decoratori e iteratori, gli idiomi che ti distinguono da un principiante."
order: 2
level: "principiante"
prereq:
  - "saper installare un programma"
  - "concetti base di programmazione (variabili, if, for)"
tools:
  - "Python 3.11+"
  - "uv (o conda)"
  - "Jupyter Lab"
  - "VS Code"
---

# Python per data science: setup professionale

## Perché Python (e non R, Julia, Scala)

Risposta breve: l'ecosistema. NumPy/SciPy/Pandas + scikit-learn + PyTorch/TensorFlow + Hugging Face è la combinazione più potente al mondo per ML applicato, e tutto parla Python.

| Linguaggio | Punto forte | Quando ha senso |
|---|---|---|
| **Python** | Ecosistema gigantesco, generalista | Quasi sempre |
| **R** | Statistica avanzata, grafica (ggplot2) | Ricerca, biostatistica, accademia |
| **Julia** | Velocità (compilato JIT), sintassi matematica | Calcolo scientifico pesante |
| **Scala/Spark** | Big data distribuito | Pipeline su cluster |
| **SQL** | Manipolazione dati relazionali | Sempre, in parallelo a Python |

Imparerai Python + SQL. Punto.

## Setup: la versione professionale

### Step 1 — Python 3.11+ via uv (o conda)

**uv** è il package manager moderno scritto in Rust (Astral, 2024). 10–100× più veloce di pip. Lo userai per gestire ambienti.

```bash
# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verifica
uv --version
```

Alternativa storica: **conda / miniconda**, se preferisci il classico (più lento ma più diffuso in università).

### Step 2 — Un progetto pulito

Mai installare pacchetti nell'ambiente Python di sistema. **Mai.** Crea un ambiente per progetto:

```bash
mkdir mio-progetto-ds
cd mio-progetto-ds
uv venv --python 3.11
source .venv/bin/activate    # Linux/macOS
.venv\Scripts\activate       # Windows
```

Installa lo stack base:

```bash
uv pip install numpy pandas scikit-learn matplotlib seaborn jupyterlab ipykernel
```

### Step 3 — Versionare le dipendenze

Crea un `pyproject.toml` (moderno) o `requirements.txt` (classico):

```toml
# pyproject.toml
[project]
name = "mio-progetto"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "numpy>=1.26",
    "pandas>=2.1",
    "scikit-learn>=1.4",
    "matplotlib>=3.8",
    "seaborn>=0.13",
    "jupyterlab>=4.0",
]
```

Poi `uv sync` ricrea l'ambiente identico ovunque. Non commettere mai `.venv/`. Aggiungi al `.gitignore`:

```gitignore
.venv/
__pycache__/
*.pyc
.ipynb_checkpoints/
.DS_Store
data/raw/         # dati grezzi NON in git
*.csv             # se sono > 50MB
.env              # secret
```

## Jupyter vs script: quando usare cosa

| | Jupyter / Colab | Script (.py) |
|---|---|---|
| **Esplorazione iniziale** | ✅ ottimo | ❌ |
| **Visualizzazione** | ✅ inline | ❌ |
| **Codice riusabile** | ❌ caos | ✅ |
| **Test / CI** | ❌ | ✅ |
| **Pipeline produzione** | ❌ MAI | ✅ |
| **Insegnamento** | ✅ | ⚠️ |

Regola operativa: **Jupyter per esplorare, script per riusare**. Quando una cella in notebook fa qualcosa di utile, refactorala in una funzione in un `.py` e importala. Notebook eterni con 50 celle disordinate sono il peccato originale del DS junior.

## Sintassi Python che devi padroneggiare

### Comprensioni di liste/dizionari/set

```python
quadrati = [x**2 for x in range(10)]
pari = [x for x in range(20) if x % 2 == 0]
mappa = {nome: len(nome) for nome in ["alice", "bob", "claire"]}
unici = {x % 7 for x in range(100)}
```

Sono più veloci dei `for` loop equivalenti e Pythonic. **Non abusarne**: una comprehension annidata su 3 livelli è meno leggibile di un for.

### Unpacking e starred expressions

```python
a, b, c = [1, 2, 3]
first, *rest = [1, 2, 3, 4, 5]      # first=1, rest=[2,3,4,5]
*init, last = [1, 2, 3, 4, 5]       # init=[1,2,3,4], last=5
a, b = b, a                          # swap senza temp

def f(**kwargs):
    print(kwargs)
f(**{"x": 1, "y": 2})                # x=1, y=2

# unione di dict (3.9+)
a = {"x": 1}; b = {"y": 2}
c = a | b                            # {"x": 1, "y": 2}
```

### f-string con format spec

```python
x = 3.14159
print(f"{x:.2f}")        # 3.14
print(f"{x:>10.3f}")     # padding a destra
print(f"{x:.2%}")        # percentuale: 314.16%
print(f"{1234567:,}")    # 1,234,567 (separatori)
print(f"{0.001:e}")      # 1.000000e-03 (scientifica)
print(f"{x=}")           # debug: 'x=3.14159' (3.8+)
```

### Funzioni: argomenti, type hints, *args / **kwargs

```python
from typing import Optional

def predict(
    model,
    X,
    threshold: float = 0.5,
    *,                              # tutto dopo è keyword-only
    return_proba: bool = False,
    feature_names: Optional[list] = None,
) -> "np.ndarray":
    ...
```

**Linee guida**:

- Type hints obbligatori in codice di produzione, consigliati ovunque.
- Argomenti default **mai mutabili** (no `def f(x=[])`): condivisi tra chiamate, sorgente infinito di bug.
- Keyword-only (dopo `*`) per booleani: `predict(X, return_proba=True)` è più chiaro di `predict(X, True)`.

### Iteratori e generatori

```python
# generatore (memory-friendly)
def primi_n(n):
    for i in range(2, n):
        if all(i % j != 0 for j in range(2, int(i**0.5)+1)):
            yield i

# uso
list(primi_n(50))
# o streaming:
for p in primi_n(1_000_000):
    if p > 100: break
```

`itertools` è una miniera d'oro. Almeno questi:

```python
from itertools import chain, combinations, permutations, product, groupby, accumulate

list(chain([1,2], [3,4]))                # [1, 2, 3, 4]
list(combinations([1,2,3], 2))           # [(1,2), (1,3), (2,3)]
list(product([0,1], repeat=3))           # tutti i 8 vettori binari di lunghezza 3
list(accumulate([1,2,3,4]))              # [1, 3, 6, 10]  (somma cumulativa)
```

### Decoratori (almeno questi 3)

```python
from functools import lru_cache, wraps
import time

@lru_cache(maxsize=128)
def fib(n):
    return n if n < 2 else fib(n-1) + fib(n-2)

def timeit(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        r = func(*args, **kwargs)
        print(f"{func.__name__}: {time.perf_counter()-t0:.3f}s")
        return r
    return wrapper

@timeit
def somma_quadrati(n):
    return sum(i*i for i in range(n))
```

### Context manager

```python
with open("data.csv") as f:
    data = f.read()
# il file è chiuso anche se c'è un'eccezione

# scriviti il tuo:
from contextlib import contextmanager
@contextmanager
def cronometro(nome):
    t = time.perf_counter()
    yield
    print(f"{nome}: {time.perf_counter()-t:.2f}s")

with cronometro("training"):
    model.fit(X, y)
```

## Anti-pattern frequenti nei junior

| Anti-pattern | Perché è male | Cosa fare |
|---|---|---|
| `df = df.append(row)` in un loop | O(n²), terribile | accumulare in lista e `pd.DataFrame()` |
| `for i in range(len(lst))` | non Pythonic | `for x in lst` o `for i, x in enumerate(lst)` |
| Eccezioni catch-all `except:` | mangia anche `KeyboardInterrupt` | `except SpecificError as e:` |
| Path con stringhe e `+` | rotto su Windows | `from pathlib import Path` |
| `import *` | namespace inquinato | `from x import y, z` |
| Notebook ordinati alla buona | irriproducibile | celle che girano top→bottom, sempre |

## Strumenti che voglio nel tuo workflow

1. **black** o **ruff format** — formatta il codice automaticamente. Niente più discussioni.
2. **ruff** — linter velocissimo (sostituisce flake8 + isort + pyupgrade).
3. **mypy** o **pyright** — type checker statico, opzionale ma molto utile.
4. **pytest** — testing.
5. **pre-commit** — esegue tutto al commit, così non ti dimentichi.

Installa il minimo indispensabile:

```bash
uv pip install ruff pytest pre-commit
```

E un `.pre-commit-config.yaml` minimal:

```yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.0
    hooks:
      - id: ruff
      - id: ruff-format
```

`pre-commit install` e ogni commit verrà ripulito automaticamente.

## VS Code, le 4 estensioni essenziali

1. **Python** (Microsoft)
2. **Jupyter** (Microsoft) — esegue notebook nell'editor
3. **Pylance** — type checking
4. **Ruff** (Astral)

Bonus: **Data Wrangler** per esplorare DataFrame visualmente.

## Esercizi

<details>
<summary>Esercizio 1 — Setup completo da zero</summary>

Su un PC pulito (o in una nuova cartella):

1. Installa uv.
2. Crea progetto `pratica-ds`, ambiente Python 3.11.
3. Installa `numpy pandas scikit-learn matplotlib jupyterlab`.
4. Lancia `jupyter lab`.
5. Crea un notebook che importa numpy e stampa `np.random.randn(5)`.
6. Esce, riattiva l'ambiente, ricostruiscilo da `pyproject.toml`.

Se tutti i passi funzionano senza Googlare, sei pronto.
</details>

<details>
<summary>Esercizio 2 — Refactor anti-pattern</summary>

Trasforma questo codice in versione Pythonic:

```python
result = []
for i in range(len(numeri)):
    if numeri[i] > 0:
        result.append(numeri[i] * 2)
```

**Soluzione:**
```python
result = [n * 2 for n in numeri if n > 0]
```

Una riga, più veloce, più leggibile.
</details>

<details>
<summary>Esercizio 3 — Generatore di Fibonacci infinito</summary>

Scrivi un generatore che produca Fibonacci all'infinito. Usalo per stampare il 1000-esimo termine.

```python
def fib_inf():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

from itertools import islice
print(next(islice(fib_inf(), 1000, 1001)))
```

Domanda di follow-up: `fib_inf()` calcola tutti i numeri prima del 1000-esimo, o si ferma al bisogno? (Risposta: si ferma al bisogno — è proprio lo scopo dei generatori.)
</details>

<details>
<summary>Esercizio 4 — Decoratore che logga input e output</summary>

Scrivi un decoratore `@log_io` che stampa argomenti e valore di ritorno di una funzione:

```python
@log_io
def somma(a, b):
    return a + b

somma(2, 3)
# Output:
# somma(2, 3) → 5
```

**Soluzione:**
```python
from functools import wraps
def log_io(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        all_args = ", ".join(
            [repr(a) for a in args] +
            [f"{k}={v!r}" for k, v in kwargs.items()]
        )
        result = func(*args, **kwargs)
        print(f"{func.__name__}({all_args}) → {result!r}")
        return result
    return wrapper
```
</details>

<details>
<summary>Esercizio 5 — Lettura file di grandi dimensioni</summary>

Hai un file `access.log` da 5 GB. Devi contare quante righe contengono `"ERROR"`. **Non puoi** caricarlo in memoria. Soluzione?

```python
with open("access.log") as f:
    n = sum(1 for line in f if "ERROR" in line)
print(n)
```

Perché funziona: `open()` restituisce un iteratore riga-per-riga. La generator expression scorre senza materializzare in lista.
</details>

## Cosa portarti via

- **Mai** scrivere in Python di sistema. Sempre venv/conda per progetto.
- **Type hints + ruff format**: la differenza visibile tra junior e senior.
- **Comprensione di iteratori / generatori**: la chiave per gestire dati grossi senza fare boom RAM.
- **Notebook per esplorare, script per produrre**.

## Letture consigliate

- **Luciano Ramalho** — "Fluent Python" (2ª ed.): se vuoi diventare davvero forte in Python, è il libro.
- **Brett Slatkin** — "Effective Python": 90 ricette da senior.
- Documentazione ufficiale di `itertools`, `functools`, `collections`. Leggile.

Nella prossima sezione: matematica. Algebra lineare resa masticabile.
