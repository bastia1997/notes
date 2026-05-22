---
title: "Calculus, gradients, and optimization"
area: "Mathematics"
summary: "Derivatives, gradients, Hessian, chain rule. Gradient descent from theory to code — the engine of every modern neural network."
order: 4
level: "intermediate"
prereq:
  - "[[linear-algebra]]"
  - "intuitive concept of a function"
tools:
  - "paper, NumPy, matplotlib"
---

# Calculus, gradients, and optimization

## Why calculus

Almost every ML algorithm minimizes a **loss function** $L(\boldsymbol{\theta})$ with respect to parameters $\boldsymbol{\theta}$. Finding the minimum requires knowing **which way to go down**: this is the definition of a derivative/gradient.

> "Backpropagation" — the heart of deep learning — is just iterated application of the **chain rule**.

## One-variable derivatives

The derivative of $f(x)$ at $x_0$ measures the **slope** of the function there:

$$f'(x_0) = \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}$$

Geometrically: the slope of the tangent line at $x_0$.

<div class="chart"><svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="200" x2="340" y2="200" stroke="#444"/>
<line x1="30" y1="20" x2="30" y2="200" stroke="#444"/>
<path d="M 30 195 Q 100 195 180 110 T 340 30" fill="none" stroke="#7aa2ff" stroke-width="2.5"/>
<line x1="120" y1="180" x2="240" y2="80" stroke="#ffb347" stroke-width="2"/>
<circle cx="180" cy="130" r="4" fill="#ffb347"/>
<text x="190" y="125" fill="#ffb347" font-size="11">x₀, f(x₀)</text>
<text x="245" y="100" fill="#ffb347" font-size="11">f'(x₀) = slope</text>
</svg><div class="chart-caption">The derivative is the tangent slope at a point.</div></div>

### Essential rules

| Function | Derivative |
|---|---|
| $c$ (constant) | $0$ |
| $x^n$ | $n x^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $\sin x$ | $\cos x$ |
| $\sigma(x) = \frac{1}{1+e^{-x}}$ | $\sigma(x)(1-\sigma(x))$ |
| $\text{ReLU}(x) = \max(0, x)$ | $1$ if $x>0$, $0$ otherwise |
| $\tanh x$ | $1 - \tanh^2 x$ |

And combination rules:

- **Sum**: $(f+g)' = f' + g'$
- **Product**: $(fg)' = f'g + fg'$
- **Quotient**: $(f/g)' = (f'g - fg')/g^2$
- **Chain**: $(f(g(x)))' = f'(g(x)) \cdot g'(x)$

The **chain rule** is the most important piece. You'll use it at every step of backpropagation.

### Example: sigmoid derivative

$\sigma(x) = \frac{1}{1+e^{-x}}$. Show that $\sigma'(x) = \sigma(x)(1 - \sigma(x))$.

Let $u = 1 + e^{-x}$. Then $\sigma = u^{-1}$ and $u' = -e^{-x}$. By the chain rule:

$$\sigma'(x) = -u^{-2} \cdot u' = \frac{e^{-x}}{(1+e^{-x})^2}$$

Rewriting: $\frac{e^{-x}}{1+e^{-x}} = 1 - \frac{1}{1+e^{-x}} = 1 - \sigma(x)$. So $\sigma'(x) = \sigma(x)(1 - \sigma(x))$. Beautiful, isn't it?

## Multivariable functions: the gradient

For $f: \mathbb{R}^n \to \mathbb{R}$, the **gradient** is the vector of partial derivatives:

$$\nabla f(\mathbf{x}) = \left( \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \dots, \frac{\partial f}{\partial x_n} \right)^T$$

**Key property**: $\nabla f$ points in the direction of **maximum increase**. Going opposite direction $-\nabla f$ descends fastest. This is the basis of **gradient descent**.

### Example: $f(x, y) = x^2 + y^2$

$\frac{\partial f}{\partial x} = 2x$, $\frac{\partial f}{\partial y} = 2y$. So $\nabla f = (2x, 2y)^T$.

At point $(1, 1)$ the gradient is $(2, 2)$ — pointing northeast, away from the minimum at $(0, 0)$. To descend we move toward $(-2, -2)$.

<div class="chart"><svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(160,110)">
  <circle r="80" fill="none" stroke="#444" stroke-width="1"/>
  <circle r="60" fill="none" stroke="#444" stroke-width="1"/>
  <circle r="40" fill="none" stroke="#444" stroke-width="1"/>
  <circle r="20" fill="none" stroke="#444" stroke-width="1"/>
  <line x1="-100" y1="0" x2="100" y2="0" stroke="#555"/>
  <line x1="0" y1="-100" x2="0" y2="100" stroke="#555"/>
  <circle cx="0" cy="0" r="3" fill="#5ee2c4"/>
  <text x="6" y="-6" fill="#5ee2c4" font-size="10">min</text>
  <circle cx="50" cy="-50" r="4" fill="#ffb347"/>
  <line x1="50" y1="-50" x2="80" y2="-80" stroke="#ffb347" stroke-width="2"/>
  <polygon points="80,-80 73,-75 75,-83" fill="#ffb347"/>
  <text x="56" y="-46" fill="#ffb347" font-size="10">∇f</text>
  <line x1="50" y1="-50" x2="20" y2="-20" stroke="#7aa2ff" stroke-width="2" stroke-dasharray="3,2"/>
  <polygon points="20,-20 27,-25 25,-17" fill="#7aa2ff"/>
  <text x="6" y="-32" fill="#7aa2ff" font-size="10">-∇f</text>
</g>
</svg><div class="chart-caption">Level curves of f=x²+y². ∇f is perpendicular to the curves, points uphill. -∇f is the descent direction.</div></div>

### Hessian

The matrix of second derivatives:

$$H_f(\mathbf{x}) = \begin{bmatrix} \frac{\partial^2 f}{\partial x_1^2} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\ \vdots & \ddots & \vdots \\ \frac{\partial^2 f}{\partial x_n \partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_n^2} \end{bmatrix}$$

Used in:
- **Min/max test**: $H$ positive definite → $\mathbf{x}$ is a local min.
- **Newton's method**: $\mathbf{x}_{k+1} = \mathbf{x}_k - H^{-1} \nabla f$. Quadratic convergence, but expensive.
- **Curvature**: characterizes loss surface shape.

## Gradient descent

The most important algorithm in modern ML:

```
initialize θ
repeat:
    g = ∇L(θ)              # compute gradient
    θ = θ - η · g          # step opposite direction
until convergence
```

where $\eta$ (eta) is the **learning rate**.

### Choosing the learning rate

```mermaid
graph LR
    A[η too small<br/>slow convergence] --- B[η optimal<br/>fast convergence] --- C[η too large<br/>oscillates / diverges]
```

<div class="chart"><svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,20)">
  <path d="M 0 160 Q 60 0 120 160" fill="none" stroke="#5ee2c4" stroke-width="2"/>
  <circle cx="20" cy="120" r="3" fill="#ffb347"/>
  <circle cx="32" cy="95" r="3" fill="#ffb347"/>
  <circle cx="44" cy="75" r="3" fill="#ffb347"/>
  <circle cx="55" cy="55" r="3" fill="#ffb347"/>
  <text x="20" y="190" fill="#5ee2c4" font-size="11">η small</text>
</g>
<g transform="translate(180,20)">
  <path d="M 0 160 Q 60 0 120 160" fill="none" stroke="#5ee2c4" stroke-width="2"/>
  <circle cx="20" cy="120" r="3" fill="#ffb347"/>
  <circle cx="55" cy="55" r="3" fill="#ffb347"/>
  <circle cx="60" cy="40" r="3" fill="#ffb347"/>
  <text x="20" y="190" fill="#5ee2c4" font-size="11">η optimal</text>
</g>
<g transform="translate(340,20)">
  <path d="M 0 160 Q 60 0 120 160" fill="none" stroke="#5ee2c4" stroke-width="2"/>
  <circle cx="20" cy="120" r="3" fill="#ff7a7a"/>
  <circle cx="95" cy="100" r="3" fill="#ff7a7a"/>
  <circle cx="10" cy="135" r="3" fill="#ff7a7a"/>
  <circle cx="100" cy="120" r="3" fill="#ff7a7a"/>
  <text x="20" y="190" fill="#ff7a7a" font-size="11">η too large</text>
</g>
</svg></div>

In practice: try $\eta \in \{10^{-1}, 10^{-2}, 10^{-3}, 10^{-4}\}$ and watch the loss. There are **schedulers** that reduce $\eta$ over time (cosine, step decay, warmup).

### Manual implementation

```python
import numpy as np

def f(x):
    return (x - 3) ** 2 + 2          # minimum at x=3, f=2

def grad(x):
    return 2 * (x - 3)

x = 0.0
eta = 0.1
history = [x]
for step in range(50):
    g = grad(x)
    x = x - eta * g
    history.append(x)
print(f"final x: {x:.4f}, f: {f(x):.4f}")
# final x: 2.9999, f: 2.0000
```

### Visualized: "ball rolling into the valley"

<div class="chart"><svg viewBox="0 0 460 240" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="200" x2="440" y2="200" stroke="#555"/>
<line x1="40" y1="20" x2="40" y2="200" stroke="#555"/>
<text x="240" y="225" fill="#8b949e" font-size="11" text-anchor="middle">parameter θ →</text>
<text x="22" y="120" fill="#8b949e" font-size="11">loss L(θ)</text>

<path d="M 60 50 Q 250 230 440 50" fill="none" stroke="#7aa2ff" stroke-width="2"/>

<circle cx="80" cy="76" r="6" fill="#ffb347"/>
<text x="60" y="70" fill="#ffb347" font-size="10">θ₀</text>

<circle cx="130" cy="135" r="6" fill="#ffb347" opacity="0.85"/>
<text x="115" y="128" fill="#ffb347" font-size="10">θ₁</text>

<circle cx="180" cy="175" r="6" fill="#ffb347" opacity="0.7"/>
<text x="165" y="168" fill="#ffb347" font-size="10">θ₂</text>

<circle cx="230" cy="195" r="6" fill="#ffb347" opacity="0.55"/>
<text x="215" y="188" fill="#ffb347" font-size="10">θ₃</text>

<circle cx="250" cy="200" r="7" fill="#5ee2c4"/>
<text x="265" y="198" fill="#5ee2c4" font-size="11">minimum θ*</text>

<line x1="80" y1="76" x2="130" y2="135" stroke="#ffb347" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="130" y1="135" x2="180" y2="175" stroke="#ffb347" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="180" y1="175" x2="230" y2="195" stroke="#ffb347" stroke-width="1" stroke-dasharray="3,2"/>
<line x1="230" y1="195" x2="250" y2="200" stroke="#ffb347" stroke-width="1" stroke-dasharray="3,2"/>

<text x="240" y="35" fill="#8b949e" font-size="11" text-anchor="middle">long steps at start (large gradient), short near minimum (small gradient)</text>
</svg><div class="chart-caption">Gradient descent: each step moves opposite the gradient, scaled by the slope.</div></div>

### Variants you'll see in real code

| Variant | Idea | When |
|---|---|---|
| **Batch GD** | $\nabla L$ over all data | Small datasets |
| **SGD** | $\nabla L$ on 1 random sample | Historical, noisy but scalable |
| **Mini-batch SGD** | $\nabla L$ on batches of 32–512 | Standard in DL |
| **SGD + momentum** | accumulates past directions | Accelerates in narrow valleys |
| **Adam** | adapts learning rate per parameter | Default starter for NN |
| **AdamW** | Adam with proper decay | Current default for Transformers |
| **L-BFGS** | approximates Hessian | Small convex problems (Logistic, MLE) |

Adam in compact form:

$$m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t$$
$$v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2$$
$$\hat{m}_t = m_t / (1-\beta_1^t), \quad \hat{v}_t = v_t / (1-\beta_2^t)$$
$$\theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}$$

Memorize $\beta_1=0.9$, $\beta_2=0.999$, $\epsilon=10^{-8}$ as defaults.

## The chain rule, again: backpropagation

A neural network is a composed function:

$$y = f_L(f_{L-1}(\dots f_1(\mathbf{x}; \theta_1) \dots; \theta_{L-1}); \theta_L)$$

We want $\frac{\partial L}{\partial \theta_l}$ for each layer $l$. Backpropagation computes these gradients applying the chain rule layer by layer, right to left. Cost is O(forward pass) — this is the miracle.

Two-layer example:

$$y = \sigma(w_2 \cdot \sigma(w_1 \cdot x + b_1) + b_2)$$

$$L = \frac{1}{2}(y - y_\text{true})^2$$

By chain rule:

$$\frac{\partial L}{\partial w_1} = \underbrace{(y - y_\text{true})}_{\partial L / \partial y} \cdot \underbrace{\sigma'(\dots)}_{\partial y / \partial z_2} \cdot \underbrace{w_2}_{\partial z_2/\partial h_1} \cdot \underbrace{\sigma'(\dots)}_{\partial h_1/\partial z_1} \cdot \underbrace{x}_{\partial z_1/\partial w_1}$$

Long, but mechanical. PyTorch does it automatically with autograd.

## Constrained optimization and Lagrangians

To minimize $f(\mathbf{x})$ subject to $g(\mathbf{x}) = 0$, introduce the **Lagrange multiplier**:

$$\mathcal{L}(\mathbf{x}, \lambda) = f(\mathbf{x}) + \lambda g(\mathbf{x})$$

and solve $\nabla_{\mathbf{x}} \mathcal{L} = 0$, $\nabla_\lambda \mathcal{L} = 0$.

**Where in ML?** SVM (max margin), constrained regression, PCA with unit-norm constraint. More in dedicated sections.

## Convex functions: the optimization promise

A function $f$ is **convex** if the segment between two points on the graph lies above the graph:

$$f(\alpha x_1 + (1-\alpha) x_2) \leq \alpha f(x_1) + (1-\alpha) f(x_2), \quad \alpha \in [0,1]$$

**Why you care**: for convex functions, **every local minimum is global**, and gradient descent converges to the true minimum. These are convex:

- Linear regression's squared loss
- Logistic regression's loss
- SVM hinge loss
- L1 and L2 functions

**Not convex**: neural networks. That's why GD on NNs finds local minima (but in practice works anyway — one of deep learning's happy mysteries).

## Numbers to memorize

- Derivative of $x^n$: $nx^{n-1}$
- $\sigma'(x) = \sigma(x)(1-\sigma(x))$
- $\text{softmax}_i' = p_i (\delta_{ij} - p_j)$ (NN section)
- $\frac{d}{dx} \ln x = 1/x$, basis of all cross-entropy

## Exercises

<details>
<summary>Exercise 1 — Basic derivatives</summary>

Compute:
1. $f(x) = 3x^4 - 2x^2 + 5$
2. $f(x) = e^{2x} \sin(x)$
3. $f(x) = \ln(1 + x^2)$
4. $f(x) = \sigma(2x + 1)$ (sigmoid)

**Solutions**:
1. $12x^3 - 4x$
2. $2 e^{2x} \sin x + e^{2x} \cos x = e^{2x}(2\sin x + \cos x)$
3. $\frac{2x}{1+x^2}$
4. $2 \sigma(2x+1)(1 - \sigma(2x+1))$
</details>

<details>
<summary>Exercise 2 — Vector function gradients</summary>

Compute $\nabla f$ for:
1. $f(x, y) = x^2 + 3xy + 2y^2$
2. $f(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$ with $A$ symmetric
3. $f(\mathbf{w}) = \|\mathbf{y} - X \mathbf{w}\|_2^2$ (OLS loss)

**Solutions**:
1. $(2x + 3y, 3x + 4y)$
2. $2 A \mathbf{x}$
3. $-2 X^T (\mathbf{y} - X \mathbf{w})$ → set to zero: $X^T X \mathbf{w} = X^T \mathbf{y}$ (Normal Equations)
</details>

<details>
<summary>Exercise 3 — Gradient descent on 2D function</summary>

Implement GD for $f(x, y) = x^2 + 5y^2$, starting at $(3, 2)$. Plot the trajectory.

```python
import numpy as np, matplotlib.pyplot as plt

def f(p): return p[0]**2 + 5*p[1]**2
def grad(p): return np.array([2*p[0], 10*p[1]])

p = np.array([3.0, 2.0])
eta = 0.05
traj = [p.copy()]
for _ in range(50):
    p = p - eta * grad(p)
    traj.append(p.copy())
traj = np.array(traj)

x = np.linspace(-4, 4, 80); y = np.linspace(-3, 3, 80)
X, Y = np.meshgrid(x, y); Z = X**2 + 5*Y**2
plt.contour(X, Y, Z, 20)
plt.plot(traj[:,0], traj[:,1], 'o-', color='orange')
plt.show()
```

Observe: the path "zigzags" because the function is "narrow" on $y$. This is why we normalize features in ML.
</details>

<details>
<summary>Exercise 4 — SGD vs Adam</summary>

On a simple anisotropic 2D function $(x^2 + 25 y^2)$, compare convergence of vanilla GD vs Adam:

```python
import numpy as np

def grad(p): return np.array([2*p[0], 50*p[1]])

def run_gd(p0, eta, n=200):
    p = p0.copy(); h = [p.copy()]
    for _ in range(n):
        p = p - eta * grad(p); h.append(p.copy())
    return np.array(h)

def run_adam(p0, eta=0.1, n=200, b1=0.9, b2=0.999, eps=1e-8):
    p = p0.copy(); m = np.zeros_like(p); v = np.zeros_like(p)
    h = [p.copy()]
    for t in range(1, n+1):
        g = grad(p)
        m = b1*m + (1-b1)*g
        v = b2*v + (1-b2)*g*g
        mh = m/(1-b1**t); vh = v/(1-b2**t)
        p = p - eta * mh / (np.sqrt(vh)+eps)
        h.append(p.copy())
    return np.array(h)

p0 = np.array([5.0, 1.0])
gd = run_gd(p0, eta=0.03)
ad = run_adam(p0)
print("GD final:", gd[-1], " Adam final:", ad[-1])
```

Adam typically converges much faster on this landscape.
</details>

<details>
<summary>Exercise 5 — Convexity</summary>

Which are convex?
1. $f(x) = x^4$
2. $f(x) = -\ln(x)$ for $x > 0$
3. $f(x) = x \sin(x)$
4. $f(x) = \max(0, 1 - x)$ (hinge loss)
5. $f(x) = x^2 - 4x + 3$

**Solutions**: 1 yes (second derivative $= 12x^2 \geq 0$), 2 yes ($1/x^2 > 0$), 3 NO (oscillates), 4 yes (max of two convex), 5 yes (parabola).
</details>

## Takeaways

- Derivative = slope. Gradient = "direction of steepest increase".
- Gradient descent: $\theta \leftarrow \theta - \eta \nabla L$, the algorithm that moves everything.
- Chain rule = backpropagation. Understanding it = understanding deep learning.
- Convexity guarantees global minima. NNs aren't convex but work anyway.
- Adam as default for NN, SGD+momentum still valid (sometimes better generalization).

## Reading

- **3Blue1Brown** — "Essence of Calculus" (YouTube)
- **Stanford CS229** — math notes (free)
- **Goodfellow, Bengio, Courville** — "Deep Learning", chapters 4–5: optimization theory in DL

Next: probability — the language of uncertainty.
