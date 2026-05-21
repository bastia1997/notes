---
title: "Python for data science: pro setup"
area: "Foundations"
summary: "Virtual environments, dependency management, Jupyter vs scripts, decorators and iterators, the idioms that separate you from beginner-grade tutorials."
order: 2
level: "beginner"
prereq:
  - "know how to install a program"
  - "basic programming concepts (variables, if, for)"
tools:
  - "Python 3.11+"
  - "uv (or conda)"
  - "Jupyter Lab"
  - "VS Code"
---

# Python for data science: pro setup

## Why Python (and not R, Julia, Scala)

Short answer: the ecosystem. NumPy/SciPy/Pandas + scikit-learn + PyTorch/TensorFlow + Hugging Face is the most powerful combination in the world for applied ML, and it all speaks Python.

| Language | Strength | When it makes sense |
|---|---|---|
| **Python** | Huge ecosystem, generalist | Almost always |
| **R** | Advanced statistics, graphics (ggplot2) | Research, biostatistics, academia |
| **Julia** | Speed (JIT-compiled), math-like syntax | Heavy scientific computing |
| **Scala/Spark** | Distributed big data | Cluster pipelines |
| **SQL** | Relational data manipulation | Always, alongside Python |

You'll learn Python + SQL. That's it.

## Setup: the professional version

### Step 1 — Python 3.11+ via uv (or conda)

**uv** is the modern Rust-based package manager (Astral, 2024). 10–100× faster than pip. Use it for environments.

```bash
# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verify
uv --version
```

Classic alternative: **conda / miniconda**, if you prefer the traditional approach (slower but more widespread in academia).

### Step 2 — A clean project

Never install packages in the system Python. **Never.** Create an environment per project:

```bash
mkdir my-ds-project
cd my-ds-project
uv venv --python 3.11
source .venv/bin/activate    # Linux/macOS
.venv\Scripts\activate       # Windows
```

Install the base stack:

```bash
uv pip install numpy pandas scikit-learn matplotlib seaborn jupyterlab ipykernel
```

### Step 3 — Version your dependencies

Create a `pyproject.toml` (modern) or `requirements.txt` (classic):

```toml
# pyproject.toml
[project]
name = "my-project"
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

Then `uv sync` recreates the identical environment anywhere. Never commit `.venv/`. Add to `.gitignore`:

```gitignore
.venv/
__pycache__/
*.pyc
.ipynb_checkpoints/
.DS_Store
data/raw/         # raw data NOT in git
*.csv             # if > 50MB
.env              # secrets
```

## Jupyter vs scripts: when to use what

| | Jupyter / Colab | Script (.py) |
|---|---|---|
| **Initial exploration** | ✅ great | ❌ |
| **Visualization** | ✅ inline | ❌ |
| **Reusable code** | ❌ messy | ✅ |
| **Test / CI** | ❌ | ✅ |
| **Production pipeline** | ❌ NEVER | ✅ |
| **Teaching** | ✅ | ⚠️ |

Working rule: **Jupyter to explore, scripts to reuse**. When a cell does something useful, refactor it into a function in a `.py` and import it. Eternal notebooks with 50 messy cells are the original sin of junior DS.

## Python syntax you must master

### List/dict/set comprehensions

```python
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
m = {name: len(name) for name in ["alice", "bob", "claire"]}
unique = {x % 7 for x in range(100)}
```

Faster than equivalent for loops, and Pythonic. **Don't overuse**: a 3-level nested comprehension is less readable than a loop.

### Unpacking and starred expressions

```python
a, b, c = [1, 2, 3]
first, *rest = [1, 2, 3, 4, 5]      # first=1, rest=[2,3,4,5]
*init, last = [1, 2, 3, 4, 5]       # init=[1,2,3,4], last=5
a, b = b, a                          # swap without temp

def f(**kwargs):
    print(kwargs)
f(**{"x": 1, "y": 2})                # x=1, y=2

# dict merge (3.9+)
a = {"x": 1}; b = {"y": 2}
c = a | b                            # {"x": 1, "y": 2}
```

### f-strings with format spec

```python
x = 3.14159
print(f"{x:.2f}")        # 3.14
print(f"{x:>10.3f}")     # right padded
print(f"{x:.2%}")        # percentage: 314.16%
print(f"{1234567:,}")    # 1,234,567 (thousand separator)
print(f"{0.001:e}")      # 1.000000e-03 (scientific)
print(f"{x=}")           # debug: 'x=3.14159' (3.8+)
```

### Functions: args, type hints, *args / **kwargs

```python
from typing import Optional

def predict(
    model,
    X,
    threshold: float = 0.5,
    *,                              # everything after is keyword-only
    return_proba: bool = False,
    feature_names: Optional[list] = None,
) -> "np.ndarray":
    ...
```

**Guidelines**:

- Type hints mandatory in production code, recommended everywhere.
- Default args **never mutable** (no `def f(x=[])`): shared across calls, source of bugs.
- Keyword-only (after `*`) for booleans: `predict(X, return_proba=True)` is clearer than `predict(X, True)`.

### Iterators and generators

```python
# generator (memory-friendly)
def primes_up_to(n):
    for i in range(2, n):
        if all(i % j != 0 for j in range(2, int(i**0.5)+1)):
            yield i

# usage
list(primes_up_to(50))
# or streaming:
for p in primes_up_to(1_000_000):
    if p > 100: break
```

`itertools` is a gold mine. At least these:

```python
from itertools import chain, combinations, permutations, product, groupby, accumulate

list(chain([1,2], [3,4]))                # [1, 2, 3, 4]
list(combinations([1,2,3], 2))           # [(1,2), (1,3), (2,3)]
list(product([0,1], repeat=3))           # all 8 binary vectors of length 3
list(accumulate([1,2,3,4]))              # [1, 3, 6, 10]  (cumulative sum)
```

### Decorators (at least these 3)

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
def sum_squares(n):
    return sum(i*i for i in range(n))
```

### Context managers

```python
with open("data.csv") as f:
    data = f.read()
# file is closed even on exception

# write your own:
from contextlib import contextmanager
@contextmanager
def chrono(name):
    t = time.perf_counter()
    yield
    print(f"{name}: {time.perf_counter()-t:.2f}s")

with chrono("training"):
    model.fit(X, y)
```

## Frequent junior anti-patterns

| Anti-pattern | Why it's bad | What to do |
|---|---|---|
| `df = df.append(row)` in a loop | O(n²), terrible | accumulate in list and `pd.DataFrame()` |
| `for i in range(len(lst))` | not Pythonic | `for x in lst` or `for i, x in enumerate(lst)` |
| Catch-all `except:` | swallows `KeyboardInterrupt` too | `except SpecificError as e:` |
| String paths with `+` | broken on Windows | `from pathlib import Path` |
| `import *` | polluted namespace | `from x import y, z` |
| Half-ordered notebooks | irreproducible | cells run top→bottom, always |

## Tools I want in your workflow

1. **black** or **ruff format** — auto-formats code. No more arguments.
2. **ruff** — blazing fast linter (replaces flake8 + isort + pyupgrade).
3. **mypy** or **pyright** — static type checker, optional but very useful.
4. **pytest** — testing.
5. **pre-commit** — runs everything on commit, so you don't forget.

Minimum install:

```bash
uv pip install ruff pytest pre-commit
```

And a minimal `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.0
    hooks:
      - id: ruff
      - id: ruff-format
```

`pre-commit install` and every commit will be auto-cleaned.

## VS Code, the 4 essential extensions

1. **Python** (Microsoft)
2. **Jupyter** (Microsoft) — runs notebooks in the editor
3. **Pylance** — type checking
4. **Ruff** (Astral)

Bonus: **Data Wrangler** to visually explore DataFrames.

## Exercises

<details>
<summary>Exercise 1 — Full setup from scratch</summary>

On a clean PC (or in a new folder):

1. Install uv.
2. Create project `ds-practice`, Python 3.11 env.
3. Install `numpy pandas scikit-learn matplotlib jupyterlab`.
4. Launch `jupyter lab`.
5. Create a notebook that imports numpy and prints `np.random.randn(5)`.
6. Exit, reactivate env, rebuild from `pyproject.toml`.

If all steps work without Googling, you're ready.
</details>

<details>
<summary>Exercise 2 — Refactor anti-pattern</summary>

Turn this code into Pythonic version:

```python
result = []
for i in range(len(numbers)):
    if numbers[i] > 0:
        result.append(numbers[i] * 2)
```

**Solution:**
```python
result = [n * 2 for n in numbers if n > 0]
```

One line, faster, more readable.
</details>

<details>
<summary>Exercise 3 — Infinite Fibonacci generator</summary>

Write a generator producing Fibonacci numbers forever. Use it to print the 1000th term.

```python
def fib_inf():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

from itertools import islice
print(next(islice(fib_inf(), 1000, 1001)))
```

Follow-up: does `fib_inf()` compute all numbers before the 1000th, or stop as needed? (Answer: on-demand — that's the whole point of generators.)
</details>

<details>
<summary>Exercise 4 — Decorator that logs input and output</summary>

Write a `@log_io` decorator that prints args and return value:

```python
@log_io
def add(a, b):
    return a + b

add(2, 3)
# Output:
# add(2, 3) → 5
```

**Solution:**
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
<summary>Exercise 5 — Large file reading</summary>

You have a 5GB `access.log`. Count rows containing `"ERROR"`. You **cannot** load into memory. Solution?

```python
with open("access.log") as f:
    n = sum(1 for line in f if "ERROR" in line)
print(n)
```

Why it works: `open()` returns a line-by-line iterator. The generator expression scans without materializing a list.
</details>

## Takeaways

- **Never** write in system Python. Always venv/conda per project.
- **Type hints + ruff format**: the visible diff between junior and senior.
- **Iterators / generators**: the key to handling big data without RAM explosions.
- **Notebooks to explore, scripts to ship**.

## Recommended reading

- **Luciano Ramalho** — "Fluent Python" (2nd ed.): if you want to get really strong in Python, this is the book.
- **Brett Slatkin** — "Effective Python": 90 senior-level recipes.
- Official docs of `itertools`, `functools`, `collections`. Read them.

Next: math. Linear algebra made chewable.
