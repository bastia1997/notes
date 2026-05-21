---
title: "NumPy: thinking in arrays"
area: "Tooling"
summary: "ndarray, dtypes, broadcasting, advanced indexing, vectorization, the operations you need daily (and those that look similar but aren't)."
order: 9
level: "intermediate"
prereq:
  - "[[python-for-data-science]]"
  - "[[linear-algebra]]"
tools:
  - "numpy"
---

# NumPy: thinking in arrays

## Why NumPy

All numerical computation in Python flows through NumPy: pandas, scikit-learn, PyTorch (its APIs deliberately mimic NumPy), TensorFlow, JAX, OpenCV.

**What makes it fast**:

- **Contiguous memory** arrays (a linear block, not scattered Python objects).
- Operations executed in **C** under the hood.
- **Vectorization**: writing `a + b` instead of a for loop calls a single C function on the whole array.

Comparison: summing 10⁶ numbers.

```python
import numpy as np, time
arr = np.arange(1_000_000)
lst = list(range(1_000_000))

t = time.perf_counter(); sum(lst); print(f"python sum: {time.perf_counter()-t:.3f}s")
t = time.perf_counter(); arr.sum(); print(f"numpy sum: {time.perf_counter()-t:.4f}s")
# python sum: ~0.020s
# numpy sum: ~0.0007s  → ~30x faster
```

## ndarray and dtype

```python
import numpy as np

a = np.array([1, 2, 3])
a.shape       # (3,)
a.dtype       # int64
a.ndim        # 1
a.size        # 3
a.nbytes      # 24 (3 elements × 8 bytes)
```

### Numeric types (dtypes)

| dtype | bytes | range |
|---|---|---|
| `int8` | 1 | -128..127 |
| `int32` | 4 | ±2.1·10⁹ |
| `int64` | 8 | ±9.2·10¹⁸ |
| `float16` | 2 | ~10⁻⁵..10⁵, 3 digits |
| `float32` | 4 | ~10⁻³⁸..10³⁸, 7 digits |
| `float64` | 8 | ~10⁻³⁰⁸..10³⁰⁸, 15 digits |
| `bool` | 1 | True/False |
| `complex128` | 16 | complex numbers |

> Choosing the right dtype can cut RAM by 4-8×. `float32` instead of `float64` doubles GPU speed without significant loss for ML.

```python
a = np.zeros(1_000_000, dtype=np.float32)
a.nbytes  # 4 MB (vs 8 MB with float64)
```

## Creating arrays

```python
np.array([1,2,3])             # from list
np.zeros((3, 4))              # all zeros, shape (3,4)
np.ones((2, 3))               # all ones
np.full((2, 2), 7)            # all 7s
np.eye(4)                     # 4x4 identity
np.arange(0, 10, 0.5)         # like range, but float
np.linspace(0, 1, 11)         # 11 evenly spaced 0..1
np.logspace(0, 3, 4)          # [1, 10, 100, 1000]
np.empty((2, 2))              # uninitialized (faster, BEWARE)
```

### Random — the modern API

The legacy API `np.random.rand`, `np.random.normal` etc. **should be avoided** (global state). Use the **Generator**:

```python
rng = np.random.default_rng(seed=42)
rng.standard_normal((100, 5))
rng.integers(0, 10, size=20)
rng.choice([0, 1], size=50, p=[0.3, 0.7])
rng.shuffle(array)
```

Reproducible, thread-safe, officially recommended.

## Indexing and slicing

### 1D slicing

```python
a = np.arange(10)
a[2:5]     # [2 3 4]
a[::2]     # [0 2 4 6 8]
a[::-1]    # reverse
```

> NumPy slicing creates a **view** (no copy). Modifying the view modifies the original. For explicit copy: `a[2:5].copy()`.

### 2D slicing

```python
A = np.arange(20).reshape(4, 5)
A[1, 2]        # 7
A[1]           # row 1
A[:, 2]        # column 2
A[:2, 1:4]     # submatrix
```

### Fancy indexing

```python
a = np.arange(10) * 10
a[[1, 3, 5]]        # [10 30 50]
A[[0, 2]]           # rows 0 and 2

# bool mask
a[a > 30]           # [40 50 60 70 80 90]

# combined
A[A > 10] = 0
```

> Fancy indexing creates **copies**, slicing creates **views**. Common source of bugs.

## Element-wise operations

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

a + b           # [5 7 9]
a * b           # [4 10 18]  (NOT dot product)
a ** 2          # [1 4 9]
np.sqrt(a)
np.exp(a)
np.log(a)
np.sin(a)
```

**All** NumPy **ufuncs** (universal functions) are vectorized and very fast.

### Aggregations

```python
A = np.arange(12).reshape(3, 4)
A.sum()             # 66
A.sum(axis=0)       # [12 15 18 21] (per column)
A.sum(axis=1)       # [6 22 38] (per row)
A.mean(axis=0)
A.std(ddof=1)
A.argmax()          # index of max (on flattened)
A.argmax(axis=1)    # index per row
```

> Mnemonic: `axis=0` means "collapse rows" → output has shape of a row. `axis=1` collapses columns.

## Broadcasting (in detail)

Rules:

1. Align shapes to the right.
2. Dimensions must be **equal** or **one must be 1**.
3. Size-1 dimensions are virtually "stretched".

Examples:

```python
A = np.ones((3, 4))
b = np.array([10, 20, 30, 40])      # shape (4,)
A + b                                # (3,4) + (4,) → broadcasts to (3,4)

c = np.array([[1], [2], [3]])       # shape (3,1)
A + c                                # (3,4) + (3,1) → broadcasts to (3,4)
```

### Tricky case

```python
A = np.ones((3, 4))
b = np.array([10, 20, 30])           # shape (3,) — NO!
A + b                                # ValueError
A + b[:, None]                       # now b is (3,1), works
```

`b[:, None]` adds a dimension. `None` is alias for `np.newaxis`.

## Reshape, concat, split

```python
a = np.arange(12)
a.reshape(3, 4)
a.reshape(2, -1)         # -1 = "you figure it out"
a.T                      # transpose (for 2D)

# concatenation
np.concatenate([a, b], axis=0)
np.vstack([a, b])
np.hstack([a, b])
np.column_stack([a, b])

# split
np.split(a, 3)
np.array_split(a, 5)
```

## Linear algebra (recap)

```python
A @ B                    # matrix multiplication
np.linalg.inv(A)         # inverse (rarely)
np.linalg.solve(A, b)    # solve Ax=b
np.linalg.eig(A)         # eigenvalues
np.linalg.svd(A)         # SVD
np.linalg.norm(v)
```

## Tricks and common patterns

### Manual one-hot encoding

```python
y = np.array([0, 1, 2, 1, 0])
n_classes = 3
one_hot = np.eye(n_classes)[y]
```

### Distance matrix

Euclidean distances between all row pairs:

```python
X = np.random.randn(100, 5)
diff = X[:, None, :] - X[None, :, :]   # (100, 100, 5)
D = np.sqrt((diff ** 2).sum(axis=-1))

# better (faster, avoids 3D):
sq = (X ** 2).sum(axis=1)
D2 = np.sqrt(sq[:, None] + sq[None, :] - 2 * X @ X.T)
```

### where, select, clip

```python
np.where(x > 0, x, 0)        # ReLU
np.clip(x, 0, 10)            # clamp in [0, 10]
np.select([x<0, x<5], [-1, 1], default=10)
```

### Argsort and top-k

```python
a = np.array([3, 1, 4, 1, 5, 9, 2, 6])
np.argsort(a)              # indices to sort
a[np.argsort(a)]           # sorted
np.argsort(a)[-3:][::-1]   # top-3 descending
np.argpartition(a, -3)[-3:]  # top-3 (unsorted, O(n))
```

## Memory layout, views, copies — the trap

```python
A = np.arange(12).reshape(3, 4)
B = A[:, ::2]      # view
B[0, 0] = 999
A[0, 0]            # 999 — A also modified!

C = A[[0, 1]]      # fancy indexing → copy
C[0, 0] = 0
A[0, 0]            # unchanged
```

In doubt: `arr.flags.writeable`, `arr.base is None` (None = owns memory, not view).

## Performance: profile and optimize

```python
import numpy as np

arr = np.array([1, 2, 3], dtype=np.float32)

# preallocate
out = np.empty(n)
for i in range(n):
    out[i] = compute(i)
# better: vectorize

# np.einsum is gold for complex ops
np.einsum('ij,jk->ik', A, B)        # equivalent to A @ B
np.einsum('ii->i', A)               # diagonal
np.einsum('ij,ij->i', A, A)         # squared row norms
```

## Exercises

<details>
<summary>Exercise 1 — Standardization</summary>

Standardize a matrix (mean 0, std 1 per column) **without** scikit-learn:

```python
X = np.random.randn(100, 5) * 10 + 5
mu = X.mean(0)
sigma = X.std(0, ddof=1)
X_std = (X - mu) / sigma
print(X_std.mean(0), X_std.std(0, ddof=1))  # ~[0,...] [1,...]
```
</details>

<details>
<summary>Exercise 2 — Outlier detection with z-score</summary>

Find outliers (|z| > 3) in a 1D dataset.

```python
x = np.concatenate([np.random.randn(100), [10, -8, 12]])
z = (x - x.mean()) / x.std()
outliers = np.where(np.abs(z) > 3)[0]
print(outliers)  # indices of 3 outliers
```
</details>

<details>
<summary>Exercise 3 — Mini-batch sampling</summary>

Create a function that splits $X$ (n × p) into batches of size 32, in random order:

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
<summary>Exercise 4 — 1D convolution without scipy</summary>

```python
def conv1d(x, k):
    return np.array([
        (x[i:i+len(k)] * k).sum()
        for i in range(len(x) - len(k) + 1)
    ])

x = np.array([1, 2, 3, 4, 5])
k = np.array([1, 0, -1])
print(conv1d(x, k))  # [-2 -2 -2]
```
</details>

<details>
<summary>Exercise 5 — Pairwise Euclidean distance matrix</summary>

```python
def pairwise_dist(X):
    sq = (X**2).sum(axis=1)
    return np.sqrt(np.maximum(sq[:, None] + sq[None, :] - 2 * X @ X.T, 0))

X = np.random.randn(5, 3)
D = pairwise_dist(X)
assert np.allclose(D, D.T)
assert np.allclose(np.diag(D), 0)
```
</details>

<details>
<summary>Exercise 6 — Numerically stable softmax</summary>

```python
def softmax(x, axis=-1):
    x = x - x.max(axis=axis, keepdims=True)   # stability: subtract max
    e = np.exp(x)
    return e / e.sum(axis=axis, keepdims=True)

logits = np.array([1000., 1001., 1002.])
softmax(logits)  # [0.09, 0.24, 0.67] — without subtraction: NaN
```

Standard trick: subtracting the max doesn't change the result (by exp + normalization properties) but avoids exp of huge numbers.
</details>

## Takeaways

- Think in arrays, not for loops.
- Broadcasting multiplies expressive power — study it.
- Slicing = view, fancy = copy. Confusing them = bugs.
- `np.linalg.solve` > `inv()`. `@` for matmul, `*` element-wise.
- `default_rng()` for randomness — not the legacy API.
- `np.einsum` is a saber. Learn when ready.

Next: pandas, the swiss army knife for tabular data.
