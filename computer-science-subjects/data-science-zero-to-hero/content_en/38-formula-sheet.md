---
title: "Formula Sheet: all the formulas from the course"
area: "Reference"
summary: "The ~60 formulas, distributions, metrics, and practical rules from the course, grouped by area. Print it and keep it on your desk."
order: 38
level: "beginner"
prereq: []
tools: []
---

# Formula Sheet: all the formulas from the course

## Descriptive statistics

$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i \qquad s^2 = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2 \qquad s = \sqrt{s^2}$$

$$\text{IQR} = Q_3 - Q_1 \qquad \text{MAD} = \text{med}(|x_i - \text{med}(x)|)$$

$$\text{Skewness} = \frac{E[(X-\mu)^3]}{\sigma^3} \qquad \text{Kurtosis} = \frac{E[(X-\mu)^4]}{\sigma^4}$$

$$\text{Cov}(X, Y) = E[(X-\mu_X)(Y-\mu_Y)] \qquad \rho_{XY} = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$$

## Probability

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

$$P(A|B) = \frac{P(A \cap B)}{P(B)} \qquad P(A,B) = P(A|B)P(B)$$

**Bayes**:
$$P(H|D) = \frac{P(D|H)P(H)}{P(D)}$$

**Independence**: $P(A,B) = P(A)P(B)$.

**Expected value and variance**:
$$E[X] = \sum_x x \, p(x) = \int x f(x) dx$$
$$\text{Var}(X) = E[X^2] - E[X]^2 = E[(X-\mu)^2]$$
$$\text{Var}(aX + bY) = a^2\text{Var}(X) + b^2\text{Var}(Y) + 2ab \text{Cov}(X,Y)$$

**LLN and CLT**:
$$\bar{X}_n \to \mu \quad (n \to \infty)$$
$$\sqrt{n}(\bar{X}_n - \mu) \to \mathcal{N}(0, \sigma^2)$$

## Distributions

| Distribution | PMF/PDF | $E[X]$ | $\text{Var}(X)$ |
|---|---|---|---|
| Bernoulli$(p)$ | $p^x(1-p)^{1-x}$ | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Poisson$(\lambda)$ | $\lambda^k e^{-\lambda}/k!$ | $\lambda$ | $\lambda$ |
| Geometric$(p)$ | $(1-p)^{k-1}p$ | $1/p$ | $(1-p)/p^2$ |
| Uniform$(a,b)$ | $1/(b-a)$ | $(a+b)/2$ | $(b-a)^2/12$ |
| Exponential$(\lambda)$ | $\lambda e^{-\lambda x}$ | $1/\lambda$ | $1/\lambda^2$ |
| Normal$(\mu,\sigma^2)$ | $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ |
| Gamma$(k,\theta)$ | $\frac{1}{\Gamma(k)\theta^k}x^{k-1}e^{-x/\theta}$ | $k\theta$ | $k\theta^2$ |
| Beta$(\alpha,\beta)$ | $\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}$ | $\frac{\alpha}{\alpha+\beta}$ | $\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$ |

## Statistical inference

**Confidence interval at $(1-\alpha)$ for the mean**:
$$\bar{x} \pm t_{n-1, 1-\alpha/2} \cdot \frac{s}{\sqrt{n}}$$

**z-score**:
$$z = \frac{x - \mu}{\sigma}$$

**One-sample t-test** ($H_0: \mu = \mu_0$):
$$t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}, \quad \text{df} = n-1$$

**Effect size** (Cohen's d):
$$d = \frac{\bar{x}_1 - \bar{x}_2}{s_\text{pooled}}$$

**Bonferroni**: $\alpha_\text{adj} = \alpha / m$.

## Linear algebra

**Dot product**: $\mathbf{a} \cdot \mathbf{b} = \sum_i a_i b_i = \|\mathbf{a}\| \|\mathbf{b}\| \cos\theta$.

**Norms**: $\|\mathbf{v}\|_2 = \sqrt{\sum v_i^2}$, $\|\mathbf{v}\|_1 = \sum |v_i|$.

**Matrix multiplication**: $(AB)_{ij} = \sum_k A_{ik} B_{kj}$.

**2×2 inverse**:
$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad-bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

**Eigenvalues**: $A\mathbf{v} = \lambda \mathbf{v}$.

**SVD**: $A = U \Sigma V^T$.

**Cosine similarity**: $\cos(\mathbf{a}, \mathbf{b}) = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|\|\mathbf{b}\|}$.

## Calculus

**Fundamental derivatives**:

| $f(x)$ | $f'(x)$ |
|---|---|
| $x^n$ | $n x^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $\sigma(x)$ | $\sigma(x)(1-\sigma(x))$ |
| $\tanh x$ | $1 - \tanh^2 x$ |
| ReLU$(x)$ | $\mathbb{1}[x>0]$ |

**Chain rule**: $(f(g(x)))' = f'(g(x)) \cdot g'(x)$.

**Gradient descent**: $\theta \leftarrow \theta - \eta \nabla L(\theta)$.

**Adam** (all-in-one):
$$m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t$$
$$v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2$$
$$\theta_{t+1} = \theta_t - \eta \frac{m_t / (1-\beta_1^t)}{\sqrt{v_t/(1-\beta_2^t)} + \epsilon}$$

Default: $\beta_1=0.9, \beta_2=0.999, \epsilon=10^{-8}$.

## Supervised models

**Linear regression (OLS)**:
$$\hat{\boldsymbol{\beta}} = (X^T X)^{-1} X^T \mathbf{y}$$

**Ridge**:
$$\hat{\boldsymbol{\beta}}^\text{ridge} = (X^T X + \lambda I)^{-1} X^T \mathbf{y}$$

**Lasso**: $\arg\min \|y - X\beta\|^2 + \lambda \|\beta\|_1$.

**Logistic regression**:
$$P(y=1|x) = \sigma(w^T x + b) = \frac{1}{1+e^{-(w^Tx+b)}}$$
$$\text{log-odds: } \log \frac{p}{1-p} = w^T x + b$$

**Softmax** (multi-class):
$$P(y=k|x) = \frac{e^{w_k^T x}}{\sum_j e^{w_j^T x}}$$

**Naive Bayes**:
$$P(y|x_1, \dots, x_p) \propto P(y) \prod_j P(x_j | y)$$

**KNN classification**: majority vote among the $k$ nearest neighbors.

**Decision tree — Gini**: $G = 1 - \sum_k p_k^2$.

**Decision tree — Entropy**: $H = -\sum_k p_k \log_2 p_k$.

**Information Gain**: $IG = L_\text{parent} - \frac{n_L}{n} L_L - \frac{n_R}{n} L_R$.

## Loss functions

| Task | Loss |
|---|---|
| Regression | $L = \frac{1}{n}\sum(y_i - \hat{y}_i)^2$ (MSE) |
| Robust regression | $L = \frac{1}{n}\sum\|y_i - \hat{y}_i\|$ (MAE) |
| Huber | quadratic near 0, linear far from 0 |
| Binary classification | $L = -\frac{1}{n}\sum [y \log \hat{p} + (1-y)\log(1-\hat{p})]$ |
| Multi-class classification | $L = -\sum_i \sum_k y_{ik} \log \hat{p}_{ik}$ |
| SVM | $L = \max(0, 1 - y(w^Tx + b))$ (hinge) |

## Classification metrics

|  | Pred 0 | Pred 1 |
|---|---|---|
| Actual 0 | TN | FP |
| Actual 1 | FN | TP |

$$\text{Accuracy} = \frac{TP+TN}{TP+TN+FP+FN}$$
$$\text{Precision} = \frac{TP}{TP+FP}$$
$$\text{Recall} = \frac{TP}{TP+FN}$$
$$\text{Specificity} = \frac{TN}{TN+FP}$$
$$F_1 = \frac{2 \cdot P \cdot R}{P + R}$$
$$F_\beta = (1+\beta^2)\frac{P \cdot R}{\beta^2 P + R}$$
$$\text{FPR} = \frac{FP}{FP+TN} = 1 - \text{Specificity}$$
$$\text{TPR} = \text{Recall}$$

**Log loss** (binary): $-\frac{1}{n}\sum [y \log\hat{p} + (1-y)\log(1-\hat{p})]$.

**Brier score**: $\frac{1}{n}\sum (\hat{p} - y)^2$.

## Regression metrics

$$\text{MSE} = \frac{1}{n}\sum(y - \hat{y})^2 \qquad \text{RMSE} = \sqrt{\text{MSE}}$$
$$\text{MAE} = \frac{1}{n}\sum|y - \hat{y}|$$
$$\text{MAPE} = \frac{1}{n}\sum \frac{|y - \hat{y}|}{|y|}$$
$$R^2 = 1 - \frac{\sum(y-\hat{y})^2}{\sum(y-\bar{y})^2}$$
$$\bar{R}^2 = 1 - (1-R^2)\frac{n-1}{n-p-1}$$

## Time series

**MASE**:
$$\text{MASE} = \frac{\text{MAE}(\hat{y}, y)}{\text{MAE}(\text{naive}, y_\text{train})}$$

**AR(p)**: $y_t = c + \sum_{i=1}^p \phi_i y_{t-i} + \epsilon_t$.

**MA(q)**: $y_t = c + \epsilon_t + \sum_{i=1}^q \theta_i \epsilon_{t-i}$.

**ARIMA(p,d,q)**: AR(p) + differencing d + MA(q).

## Clustering

**K-Means objective**:
$$J = \sum_{k=1}^K \sum_{x \in C_k} \|x - \mu_k\|^2$$

**Silhouette** for point $i$:
$$s_i = \frac{b_i - a_i}{\max(a_i, b_i)}$$

where $a_i$ = mean intra-cluster distance, $b_i$ = mean distance to the nearest other cluster.

**Davies-Bouldin**: mean of $\max_j (\sigma_i + \sigma_j) / d(c_i, c_j)$. Lower = better.

## Dimensionality reduction

**PCA**: eigenvalues of $C = \frac{1}{n-1} X^T X$ (with centered $X$).

**Explained variance**: $\sum_{k \leq K} \lambda_k / \sum_k \lambda_k$.

**t-SNE**: minimizes KL divergence between similarity distributions in high and low dimensions.

**UMAP**: cross-entropy optimization on a nearest-neighbor graph.

## Neural networks

**Forward pass (single layer)**: $h = \phi(Wx + b)$.

**Sigmoid**: $\sigma(z) = \frac{1}{1+e^{-z}}$, $\sigma'(z) = \sigma(z)(1-\sigma(z))$.

**ReLU**: $\max(0, z)$, derivative $\mathbb{1}[z>0]$.

**Tanh**: $\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$, $1 - \tanh^2 z$.

**Softmax**: $\text{softmax}(z)_i = e^{z_i}/\sum_j e^{z_j}$.

**Cross-entropy + softmax (gradient)**: $\partial L/\partial z = p - y$.

**Backprop** (per layer): $\delta_l = (\delta_{l+1} W_{l+1}) \odot \phi'(z_l)$.

**He init**: $W \sim \mathcal{N}(0, \sqrt{2/n_\text{in}})$.

**Xavier init**: $W \sim \mathcal{N}(0, \sqrt{1/n_\text{in}})$.

## Attention (Transformer)

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

$$\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h) W^O$$

## Bayesian (quickref)

| Likelihood | Conjugate prior | Posterior |
|---|---|---|
| Bernoulli/Binomial | Beta$(\alpha, \beta)$ | Beta$(\alpha + s, \beta + n - s)$ |
| Poisson | Gamma$(\alpha, \beta)$ | Gamma$(\alpha + \sum x_i, \beta + n)$ |
| Normal ($\sigma$ known) | Normal | Normal |

**MAP**: $\arg\max P(\theta|D) = \arg\max P(D|\theta) P(\theta)$.

**BIC**: $-2 \log L + k \log n$.

**AIC**: $-2 \log L + 2k$.

## Practical rules to memorize

| Situation | What to do |
|---|---|
| Continuous features on different scales | StandardScaler |
| Continuous features with outliers | RobustScaler |
| Right-skewed distribution | log(1+x) or Yeo-Johnson |
| Low-cardinality categorical | one-hot |
| High-cardinality categorical | target encoding with CV |
| Dates | cyclic (sin, cos) + dow, month, hour |
| Balanced classes 50/50 | accuracy OK |
| Imbalanced classes | F1, PR AUC, class_weight |
| Time series data | TimeSeriesSplit, never shuffle |
| Repeated subjects | GroupKFold |
| Normality test | Q-Q plot + Shapiro for small n |
| Multicollinearity | VIF, Ridge, remove duplicates |
| Suspiciously high AUC > 0.95 | check for leakage |
| NN not converging | overfit a single batch |
| Tabular ML | LightGBM/XGBoost |
| Short sequences | LSTM/GRU |
| Long sequences | Transformer |
| Images | ResNet/ConvNeXt + transfer learning |
| Embeddings | sentence-transformers or LLM API |
| LLM on your own data | RAG |
| Multiple experiments | Optuna with TPE |

## Useful constants

- $e \approx 2.71828$
- $\pi \approx 3.14159$
- $\ln 2 \approx 0.693$, $\ln 10 \approx 2.303$
- $\log_2 10 \approx 3.322$
- Normal: 68-95-99.7 within $\mu \pm 1\sigma, 2\sigma, 3\sigma$

## Log conversions

$$\log_b x = \frac{\ln x}{\ln b}$$

$$\log_2 x = \log_{10} x / \log_{10} 2 = \log_{10} x \cdot 3.322$$

## Network size "log rule"

The number of parameters in a network grows fast:

| Network | Parameters |
|---|---|
| Logistic 100 features | ~100 |
| MLP 100→64→10 | ~7000 |
| ResNet-50 | 25M |
| GPT-2 small | 117M |
| GPT-3 | 175B |
| GPT-4 (estimate) | ~1.7T |

## Final notes

Print it, save it as a PDF, keep it handy. When you can't remember a formula, **don't cheat** by searching online: first try to derive it from the ones nearby. Derivation builds intuition. Copying does not.
