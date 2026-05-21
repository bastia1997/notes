---
title: "Linear algebra for data scientists"
area: "Mathematics"
summary: "Vectors, matrices, dot products, norms, eigenvalues. Without linear algebra PCA, regression, NN, embeddings are black boxes — here we open the box."
order: 3
level: "intermediate"
prereq:
  - "high-school math (2D vectors, linear systems)"
tools:
  - "paper + pencil"
  - "NumPy for verification"
---

# Linear algebra for data scientists

## Why you really need it

Data in ML is **always** matrices: $n$ rows (observations), $p$ columns (features). Every operation on this data — projecting, rotating, compressing, classifying — is linear algebra. Without it, scikit-learn is a black box.

Concepts that need linear algebra directly:

- **PCA** (eigenvalues of the covariance matrix)
- **Linear regression** (closed-form solution: $\hat{\beta} = (X^T X)^{-1} X^T y$)
- **Recommender systems** (matrix factorization, SVD)
- **Neural networks** (each layer is $y = W x + b$)
- **Embeddings** (vectors in high-dimensional spaces)
- **Attention** in Transformers (a "smart" matrix multiplication)

## Vectors

A **vector** is an ordered list of numbers:

$$\mathbf{v} = \begin{bmatrix} 3 \\ -1 \\ 2 \end{bmatrix} \in \mathbb{R}^3$$

In ML, a vector typically represents **one observation**: e.g. a customer is $(age, income, spend, \dots) \in \mathbb{R}^p$ where $p$ is the number of features.

### Basic operations

**Sum**: component-wise.

$$\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} + \begin{bmatrix} 4 \\ 5 \\ 6 \end{bmatrix} = \begin{bmatrix} 5 \\ 7 \\ 9 \end{bmatrix}$$

**Scalar product**: multiplies each component.

$$2 \cdot \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} = \begin{bmatrix} 2 \\ 4 \\ 6 \end{bmatrix}$$

### Dot product

The **heart** of applied linear algebra. Definition:

$$\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i = a_1 b_1 + a_2 b_2 + \dots + a_n b_n$$

Example: $(1, 2, 3) \cdot (4, 5, 6) = 4 + 10 + 18 = 32$.

**Geometric interpretation**:

$$\mathbf{a} \cdot \mathbf{b} = \|\mathbf{a}\| \|\mathbf{b}\| \cos\theta$$

where $\theta$ is the angle between vectors. Key consequences:

- If $\mathbf{a} \cdot \mathbf{b} = 0$, they are **orthogonal** (perpendicular).
- If $\mathbf{a} \cdot \mathbf{b} > 0$, they point "in the same direction".
- It's the basis of **cosine similarity**: $\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \|\mathbf{b}\|}$, used everywhere in NLP and recommenders.

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
</svg><div class="chart-caption">Two vectors in ℝ²: the dot product measures how aligned they are.</div></div>

### Norms

The **L2 norm** (Euclidean length):

$$\|\mathbf{v}\|_2 = \sqrt{\sum_i v_i^2}$$

The **L1 norm** (sum of absolute values):

$$\|\mathbf{v}\|_1 = \sum_i |v_i|$$

In ML they appear as regularization: **Ridge** uses L2, **Lasso** uses L1 — we'll see why they produce different behavior (Lasso forces coefficients exactly to zero, Ridge shrinks them but rarely zeros them). It depends on the shape of the norm "ball":

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
</svg><div class="chart-caption">L1 unit ball (diamond) vs L2 (circle). Diamond corners force sparse solutions.</div></div>

## Matrices

A **matrix** $A \in \mathbb{R}^{m \times n}$ is a grid of numbers with $m$ rows and $n$ columns:

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \in \mathbb{R}^{2 \times 3}$$

In ML, a **design matrix** $X$ has shape $(n, p)$: $n$ observations, $p$ features. Each row is one example.

### Matrix multiplication

Rule: to multiply $A \cdot B$, the number of columns of $A$ must equal rows of $B$.

$$A_{m \times k} \cdot B_{k \times n} = C_{m \times n}$$

Element $C_{ij}$ is the dot product of row $i$ of $A$ with column $j$ of $B$:

$$C_{ij} = \sum_{l=1}^{k} A_{il} B_{lj}$$

Example:
$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \cdot \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$$

Computing $(1,1)$: $1 \cdot 5 + 2 \cdot 7 = 19$. **Always verify by hand** a small example — it's the only way to cement the intuition.

> **Beware**: matrix multiplication **is not commutative**: $AB \neq BA$ in general.

### Identity, inverse, transpose

**Identity** $I_n$: 1 on the diagonal, 0 elsewhere. $I A = A I = A$.

**Transpose** $A^T$: swap rows and columns. $(A^T)_{ij} = A_{ji}$.

**Inverse** $A^{-1}$: exists only for **square non-singular** matrices, satisfies $A A^{-1} = I$.

For $2 \times 2$:
$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad-bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

where $ad - bc$ is the **determinant**. If zero, the matrix is singular and can't be inverted.

> **In practice you never compute the inverse by hand** in ML. You solve a linear system with numerical methods (LU, QR, Cholesky). Computing the inverse to then multiply is unstable and slow.

### Matrix rank

The **rank** is the number of linearly independent rows (or columns). An $n \times p$ matrix has max rank $\min(n, p)$.

- If $X$ has **collinear** columns (e.g., two identical features), rank drops and $X^T X$ becomes singular → linear regression blows up.
- Fix: remove redundant features or use regularization (Ridge is immune).

## Linear systems and regression

The fundamental equation of half of ML:

$$\mathbf{y} = X \boldsymbol{\beta} + \boldsymbol{\epsilon}$$

where:
- $\mathbf{y} \in \mathbb{R}^n$ — target
- $X \in \mathbb{R}^{n \times p}$ — features
- $\boldsymbol{\beta} \in \mathbb{R}^p$ — coefficients (what we want to find)
- $\boldsymbol{\epsilon}$ — noise

**Linear regression** finds $\boldsymbol{\beta}$ minimizing $\|\mathbf{y} - X\boldsymbol{\beta}\|_2^2$. Closed-form solution (**OLS — Ordinary Least Squares**):

$$\hat{\boldsymbol{\beta}} = (X^T X)^{-1} X^T \mathbf{y}$$

This formula is **the most important** of the whole path. It will appear everywhere: kernel ridge, GLM, neural networks, Gaussian processes. You'll understand its derivation in the linear regression section.

## Eigenvalues and eigenvectors

For a square matrix $A$, an **eigenvector** $\mathbf{v}$ and its **eigenvalue** $\lambda$ satisfy:

$$A \mathbf{v} = \lambda \mathbf{v}$$

Meaning: applying $A$ to $\mathbf{v}$ produces the same $\mathbf{v}$ scaled by $\lambda$. Geometrically, $\mathbf{v}$ is a "preferred direction" of the transformation.

**Example**: $A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$. Eigenvectors: $(1,0)$ with $\lambda=2$, $(0,1)$ with $\lambda=3$.

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
</svg><div class="chart-caption">A scales vectors along its principal directions (eigenvectors) by factors λ (eigenvalues).</div></div>

**Spectral decomposition**: for a symmetric matrix $A$, you can write $A = Q \Lambda Q^T$ where $\Lambda$ is diagonal with eigenvalues and $Q$ has eigenvectors as columns. This is the key to **PCA**.

## SVD: the Swiss army knife

**Singular Value Decomposition** factors any matrix $A \in \mathbb{R}^{m \times n}$ as:

$$A = U \Sigma V^T$$

where:
- $U \in \mathbb{R}^{m \times m}$, $V \in \mathbb{R}^{n \times n}$ orthogonal matrices (rotations)
- $\Sigma \in \mathbb{R}^{m \times n}$ diagonal with **singular values** $\sigma_1 \geq \sigma_2 \geq \dots \geq 0$

Interpretation: every linear transformation is a **rotation + scaling + rotation**.

<div class="chart"><svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,10)">
  <text x="50" y="-2" fill="#8b949e" font-size="11" text-anchor="middle">unit circle</text>
  <circle cx="50" cy="80" r="40" fill="rgba(122,162,255,0.12)" stroke="#7aa2ff" stroke-width="2"/>
  <line x1="50" y1="80" x2="90" y2="80" stroke="#ffb347" stroke-width="2"/>
  <line x1="50" y1="80" x2="50" y2="40" stroke="#5ee2c4" stroke-width="2"/>
</g>
<text x="135" y="95" fill="#c084fc" font-size="14">→ Vᵀ</text>
<g transform="translate(160,10)">
  <text x="50" y="-2" fill="#8b949e" font-size="11" text-anchor="middle">rotation</text>
  <circle cx="50" cy="80" r="40" fill="rgba(122,162,255,0.12)" stroke="#7aa2ff" stroke-width="2"/>
  <line x1="50" y1="80" x2="78" y2="52" stroke="#ffb347" stroke-width="2"/>
  <line x1="50" y1="80" x2="78" y2="108" stroke="#5ee2c4" stroke-width="2"/>
</g>
<text x="275" y="95" fill="#c084fc" font-size="14">→ Σ</text>
<g transform="translate(300,10)">
  <text x="60" y="-2" fill="#8b949e" font-size="11" text-anchor="middle">scaling (ellipse)</text>
  <ellipse cx="60" cy="80" rx="55" ry="25" fill="rgba(122,162,255,0.12)" stroke="#7aa2ff" stroke-width="2"/>
  <line x1="60" y1="80" x2="98" y2="61" stroke="#ffb347" stroke-width="2"/>
  <line x1="60" y1="80" x2="79" y2="98" stroke="#5ee2c4" stroke-width="2"/>
</g>
<text x="435" y="95" fill="#c084fc" font-size="14">→ U</text>
<g transform="translate(460,10)">
  <text x="50" y="-2" fill="#8b949e" font-size="11" text-anchor="middle">rotation</text>
  <ellipse cx="50" cy="80" rx="55" ry="25" fill="rgba(122,162,255,0.12)" stroke="#7aa2ff" stroke-width="2" transform="rotate(-25 50 80)"/>
  <line x1="50" y1="80" x2="80" y2="48" stroke="#ffb347" stroke-width="2"/>
  <line x1="50" y1="80" x2="34" y2="100" stroke="#5ee2c4" stroke-width="2"/>
</g>
<text x="280" y="170" fill="#7aa2ff" font-size="11" text-anchor="middle">Arbitrary matrix = rotation → scaling (in 2 directions) → rotation.</text>
</svg><div class="chart-caption">SVD decomposes ANY linear transformation into three simple operations. The σ values are the ellipse axes.</div></div>

**Applications**:

- **PCA**: top $k$ singular values capture the principal variance; truncating to $k$ compresses data.
- **Recommender systems**: SVD of user×movie matrix factors into latent factors.
- **Pseudoinverse** $A^+$: needed when $A$ is non-square or singular. Equals $V \Sigma^+ U^T$ where $\Sigma^+$ inverts non-zero singular values.

## NumPy: all this in practice

```python
import numpy as np

# vectors
v = np.array([1, 2, 3])
w = np.array([4, 5, 6])

v + w                       # sum
v * w                       # element-wise product
v @ w                       # dot product → 32
np.dot(v, w)                # equivalent
np.linalg.norm(v)           # ||v||₂ = √14

# matrices
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

A @ B                       # matrix multiplication
A * B                       # element-wise (NOT matrix mult!)
A.T                         # transpose
np.linalg.inv(A)            # inverse (rarely needed)
np.linalg.det(A)            # determinant
np.linalg.matrix_rank(A)    # rank

# eigenvalues
eigvals, eigvecs = np.linalg.eig(A)

# SVD
U, S, Vt = np.linalg.svd(A)

# solve Ax = b (do NOT use inv)
b = np.array([1, 2])
x = np.linalg.solve(A, b)   # more stable than inv(A) @ b
```

> **Golden rule**: use `@` for matrix multiplication, `*` for element-wise. Never confuse them.

## Broadcasting: NumPy's superpower

When you operate between arrays of different shapes, NumPy "stretches" them automatically:

```python
A = np.array([[1, 2, 3],
              [4, 5, 6]])    # shape (2, 3)
v = np.array([10, 20, 30])   # shape (3,)

A + v
# array([[11, 22, 33],
#        [14, 25, 36]])
```

Broadcasting rules (simplified): align shapes right, dimensions must be equal or one must be 1.

```python
# OK: (3, 1) + (1, 4) → (3, 4)
# OK: (5, 1) + (5,) → (5, 5)
# NO: (3, 2) + (4,) → ValueError
```

Common example — centering a matrix:

```python
X = np.random.randn(100, 5)        # 100 observations, 5 features
X_centered = X - X.mean(axis=0)    # subtract per-column mean
# X.mean(axis=0).shape == (5,)
# broadcast to (100, 5)
```

## Exercises

<details>
<summary>Exercise 1 — Dot product by hand</summary>

Compute by hand: $(2, -1, 4) \cdot (3, 5, -2)$.

**Solution**: $6 - 5 - 8 = -7$. Verify with NumPy.
</details>

<details>
<summary>Exercise 2 — Check orthogonality</summary>

Are $(1, 2)$ and $(-2, 1)$ orthogonal? And $(1, 2, 3)$ and $(4, -5, 2)$?

**Solution**: First: $-2 + 2 = 0$ → yes. Second: $4 - 10 + 6 = 0$ → yes.
</details>

<details>
<summary>Exercise 3 — Matrix multiplication</summary>

Compute $A \cdot B$ by hand where:

$$A = \begin{bmatrix} 2 & 1 \\ -1 & 3 \end{bmatrix}, \quad B = \begin{bmatrix} 4 & 0 \\ 1 & 2 \end{bmatrix}$$

**Solution**:
$$AB = \begin{bmatrix} 2\cdot4+1\cdot1 & 2\cdot0+1\cdot2 \\ -1\cdot4+3\cdot1 & -1\cdot0+3\cdot2 \end{bmatrix} = \begin{bmatrix} 9 & 2 \\ -1 & 6 \end{bmatrix}$$
</details>

<details>
<summary>Exercise 4 — OLS in 5 lines</summary>

Implement OLS from scratch and compare with sklearn:

```python
import numpy as np
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(42)
X = rng.standard_normal((100, 3))
y = X @ np.array([1.5, -2.0, 0.5]) + rng.standard_normal(100) * 0.1

# OLS by hand
X_b = np.column_stack([np.ones(100), X])    # intercept
beta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
print("manual:", beta)

# sklearn
m = LinearRegression().fit(X, y)
print("sklearn:", m.intercept_, m.coef_)
```

They must match up to numerical error. (In practice replace `inv(X.T @ X) @ X.T @ y` with `np.linalg.lstsq(X_b, y, rcond=None)[0]` — more stable.)
</details>

<details>
<summary>Exercise 5 — Cosine similarity between documents</summary>

Three short documents as bag-of-words vectors over a 4-word vocab:

- $d_1 = (3, 0, 1, 0)$ — "dog cat dog dog"
- $d_2 = (2, 0, 1, 1)$ — "dog cat dog fox"
- $d_3 = (0, 4, 0, 0)$ — "mouse mouse mouse mouse"

Compute cosine similarity for each pair.

```python
import numpy as np
docs = np.array([[3,0,1,0],[2,0,1,1],[0,4,0,0]])
def cos_sim(a, b):
    return (a @ b) / (np.linalg.norm(a)*np.linalg.norm(b))

for i in range(3):
    for j in range(i+1, 3):
        print(f"d{i+1}-d{j+1}: {cos_sim(docs[i], docs[j]):.3f}")
```

Expected output: d1–d2 ≈ 0.96 (very similar), d1–d3 = 0 (orthogonal), d2–d3 = 0.

This is exactly how early search engines worked, and still how RAG (Retrieval-Augmented Generation) does it today.
</details>

<details>
<summary>Exercise 6 — Matrix rank</summary>

What's the rank of:
$$M = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 0 & 0 & 0 \end{bmatrix}?$$

**Solution**: rank 1. The second row is 2× the first, third is zero. Only one independent row.

```python
np.linalg.matrix_rank(np.array([[1,2,3],[2,4,6],[0,0,0]]))  # 1
```
</details>

<details>
<summary>Exercise 7 — PCA from scratch (preview)</summary>

Using SVD, reduce a random 5D dataset to 2D:

```python
rng = np.random.default_rng(0)
X = rng.standard_normal((200, 5))
X_c = X - X.mean(0)
U, S, Vt = np.linalg.svd(X_c, full_matrices=False)
X_2d = U[:, :2] * S[:2]    # projection onto top 2 components
print(X_2d.shape)          # (200, 2)
```

Details in the PCA section. For now, enjoy the fact you just reduced 5 dimensions to 2 in four lines of code.
</details>

## Takeaways

- Data is matrices, and models are matrix transformations.
- Dot product = similarity. Norms = "how big". Eigenvalues = preferred directions.
- $\hat{\beta} = (X^T X)^{-1} X^T y$ is the formula to memorize.
- SVD is the Swiss army knife: PCA, recommenders, pseudoinverse.
- **Never** compute the inverse explicitly: use `np.linalg.solve` or `lstsq`.

## Further reading

- **Gilbert Strang** — "Introduction to Linear Algebra" (and his MIT 18.06 YouTube lectures, free): the cure for anyone who hates linear algebra.
- **3Blue1Brown** — "Essence of Linear Algebra" (YouTube): 15 videos, 3 hours total, will rewire your brain.
- **Boyd & Vandenberghe** — "Introduction to Applied Linear Algebra" (free online): application-oriented.

Next: calculus and gradient descent. The engine of every neural network.
