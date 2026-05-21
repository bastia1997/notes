---
title: "Formulario: tutte le formule del percorso"
area: "Riferimento"
summary: "Le ~60 formule, distribuzioni, metriche e regole pratiche viste nel percorso, raggruppate per area. Stampa e tieni sulla scrivania."
order: 38
level: "principiante"
prereq: []
tools: []
---

# Formulario: tutte le formule del percorso

## Statistica descrittiva

$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i \qquad s^2 = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2 \qquad s = \sqrt{s^2}$$

$$\text{IQR} = Q_3 - Q_1 \qquad \text{MAD} = \text{med}(|x_i - \text{med}(x)|)$$

$$\text{Skewness} = \frac{E[(X-\mu)^3]}{\sigma^3} \qquad \text{Kurtosis} = \frac{E[(X-\mu)^4]}{\sigma^4}$$

$$\text{Cov}(X, Y) = E[(X-\mu_X)(Y-\mu_Y)] \qquad \rho_{XY} = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$$

## Probabilità

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

$$P(A|B) = \frac{P(A \cap B)}{P(B)} \qquad P(A,B) = P(A|B)P(B)$$

**Bayes**:
$$P(H|D) = \frac{P(D|H)P(H)}{P(D)}$$

**Indipendenza**: $P(A,B) = P(A)P(B)$.

**Valore atteso e varianza**:
$$E[X] = \sum_x x \, p(x) = \int x f(x) dx$$
$$\text{Var}(X) = E[X^2] - E[X]^2 = E[(X-\mu)^2]$$
$$\text{Var}(aX + bY) = a^2\text{Var}(X) + b^2\text{Var}(Y) + 2ab \text{Cov}(X,Y)$$

**LGN e CLT**:
$$\bar{X}_n \to \mu \quad (n \to \infty)$$
$$\sqrt{n}(\bar{X}_n - \mu) \to \mathcal{N}(0, \sigma^2)$$

## Distribuzioni

| Distribuzione | PMF/PDF | $E[X]$ | $\text{Var}(X)$ |
|---|---|---|---|
| Bernoulli$(p)$ | $p^x(1-p)^{1-x}$ | $p$ | $p(1-p)$ |
| Binomiale$(n,p)$ | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Poisson$(\lambda)$ | $\lambda^k e^{-\lambda}/k!$ | $\lambda$ | $\lambda$ |
| Geometrica$(p)$ | $(1-p)^{k-1}p$ | $1/p$ | $(1-p)/p^2$ |
| Uniforme$(a,b)$ | $1/(b-a)$ | $(a+b)/2$ | $(b-a)^2/12$ |
| Esponenziale$(\lambda)$ | $\lambda e^{-\lambda x}$ | $1/\lambda$ | $1/\lambda^2$ |
| Normale$(\mu,\sigma^2)$ | $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ |
| Gamma$(k,\theta)$ | $\frac{1}{\Gamma(k)\theta^k}x^{k-1}e^{-x/\theta}$ | $k\theta$ | $k\theta^2$ |
| Beta$(\alpha,\beta)$ | $\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}$ | $\frac{\alpha}{\alpha+\beta}$ | $\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$ |

## Inferenza statistica

**Intervallo di confidenza al $(1-\alpha)$ per la media**:
$$\bar{x} \pm t_{n-1, 1-\alpha/2} \cdot \frac{s}{\sqrt{n}}$$

**z-score**:
$$z = \frac{x - \mu}{\sigma}$$

**Test t a un campione** ($H_0: \mu = \mu_0$):
$$t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}, \quad \text{df} = n-1$$

**Effect size** (Cohen's d):
$$d = \frac{\bar{x}_1 - \bar{x}_2}{s_\text{pooled}}$$

**Bonferroni**: $\alpha_\text{adj} = \alpha / m$.

## Algebra lineare

**Prodotto scalare**: $\mathbf{a} \cdot \mathbf{b} = \sum_i a_i b_i = \|\mathbf{a}\| \|\mathbf{b}\| \cos\theta$.

**Norme**: $\|\mathbf{v}\|_2 = \sqrt{\sum v_i^2}$, $\|\mathbf{v}\|_1 = \sum |v_i|$.

**Moltiplicazione matriciale**: $(AB)_{ij} = \sum_k A_{ik} B_{kj}$.

**Inversa 2×2**:
$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad-bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

**Autovalori**: $A\mathbf{v} = \lambda \mathbf{v}$.

**SVD**: $A = U \Sigma V^T$.

**Similarità coseno**: $\cos(\mathbf{a}, \mathbf{b}) = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|\|\mathbf{b}\|}$.

## Calcolo

**Derivate fondamentali**:

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

**Adam** (tutto in uno):
$$m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t$$
$$v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2$$
$$\theta_{t+1} = \theta_t - \eta \frac{m_t / (1-\beta_1^t)}{\sqrt{v_t/(1-\beta_2^t)} + \epsilon}$$

Default: $\beta_1=0.9, \beta_2=0.999, \epsilon=10^{-8}$.

## Modelli supervisionati

**Regressione lineare (OLS)**:
$$\hat{\boldsymbol{\beta}} = (X^T X)^{-1} X^T \mathbf{y}$$

**Ridge**:
$$\hat{\boldsymbol{\beta}}^\text{ridge} = (X^T X + \lambda I)^{-1} X^T \mathbf{y}$$

**Lasso**: $\arg\min \|y - X\beta\|^2 + \lambda \|\beta\|_1$.

**Regressione logistica**:
$$P(y=1|x) = \sigma(w^T x + b) = \frac{1}{1+e^{-(w^Tx+b)}}$$
$$\text{log-odds: } \log \frac{p}{1-p} = w^T x + b$$

**Softmax** (multi-classe):
$$P(y=k|x) = \frac{e^{w_k^T x}}{\sum_j e^{w_j^T x}}$$

**Naive Bayes**:
$$P(y|x_1, \dots, x_p) \propto P(y) \prod_j P(x_j | y)$$

**KNN classification**: voto maggioranza tra i $k$ vicini.

**Albero — Gini**: $G = 1 - \sum_k p_k^2$.

**Albero — Entropia**: $H = -\sum_k p_k \log_2 p_k$.

**Information Gain**: $IG = L_\text{parent} - \frac{n_L}{n} L_L - \frac{n_R}{n} L_R$.

## Loss functions

| Task | Loss |
|---|---|
| Regressione | $L = \frac{1}{n}\sum(y_i - \hat{y}_i)^2$ (MSE) |
| Regressione robusta | $L = \frac{1}{n}\sum\|y_i - \hat{y}_i\|$ (MAE) |
| Huber | quadratica vicino a 0, lineare lontano |
| Classif. binaria | $L = -\frac{1}{n}\sum [y \log \hat{p} + (1-y)\log(1-\hat{p})]$ |
| Classif. multi | $L = -\sum_i \sum_k y_{ik} \log \hat{p}_{ik}$ |
| SVM | $L = \max(0, 1 - y(w^Tx + b))$ (hinge) |

## Metriche di classificazione

|  | Pred 0 | Pred 1 |
|---|---|---|
| Reale 0 | TN | FP |
| Reale 1 | FN | TP |

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

## Metriche di regressione

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

**ARIMA(p,d,q)**: AR(p) + differenziazione d + MA(q).

## Clustering

**K-Means objective**:
$$J = \sum_{k=1}^K \sum_{x \in C_k} \|x - \mu_k\|^2$$

**Silhouette** per punto $i$:
$$s_i = \frac{b_i - a_i}{\max(a_i, b_i)}$$

dove $a_i$ = dist media intra-cluster, $b_i$ = dist media al cluster più vicino.

**Davies-Bouldin**: media di $\max_j (\sigma_i + \sigma_j) / d(c_i, c_j)$. Basso = buono.

## Riduzione dimensionale

**PCA**: autovalori di $C = \frac{1}{n-1} X^T X$ (con $X$ centrato).

**Varianza spiegata**: $\sum_{k \leq K} \lambda_k / \sum_k \lambda_k$.

**t-SNE**: minimizza KL tra distribuzioni di similarità in alta e bassa dim.

**UMAP**: ottimizzazione cross-entropy su grafo di vicini.

## Reti neurali

**Forward (singolo layer)**: $h = \phi(Wx + b)$.

**Sigmoid**: $\sigma(z) = \frac{1}{1+e^{-z}}$, $\sigma'(z) = \sigma(z)(1-\sigma(z))$.

**ReLU**: $\max(0, z)$, derivata $\mathbb{1}[z>0]$.

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

| Likelihood | Prior coniugata | Posterior |
|---|---|---|
| Bernoulli/Binomiale | Beta$(\alpha, \beta)$ | Beta$(\alpha + s, \beta + n - s)$ |
| Poisson | Gamma$(\alpha, \beta)$ | Gamma$(\alpha + \sum x_i, \beta + n)$ |
| Normale ($\sigma$ noto) | Normale | Normale |

**MAP**: $\arg\max P(\theta|D) = \arg\max P(D|\theta) P(\theta)$.

**BIC**: $-2 \log L + k \log n$.

**AIC**: $-2 \log L + 2k$.

## Regole pratiche da memorizzare

| Situazione | Cosa fare |
|---|---|
| Feature continue scala diversa | StandardScaler |
| Feature continue con outlier | RobustScaler |
| Distribuzione skew destra | log(1+x) o Yeo-Johnson |
| Categorica cardinalità bassa | one-hot |
| Categorica cardinalità alta | target encoding con CV |
| Date | ciclica (sin, cos) + dow, month, hour |
| Classi 50/50 | accuracy OK |
| Classi sbilanciate | F1, PR AUC, class_weight |
| Dati temporali | TimeSeriesSplit, mai shuffle |
| Soggetti ripetuti | GroupKFold |
| Test di normalità | Q-Q plot + Shapiro per piccoli n |
| Multicollinearità | VIF, Ridge, rimuovi duplicati |
| Modello sospetto AUC>0.95 | cerca leakage |
| NN che non converge | overfit un singolo batch |
| ML tabellare | LightGBM/XGBoost |
| Sequenze brevi | LSTM/GRU |
| Sequenze lunghe | Transformer |
| Immagini | ResNet/ConvNeXt + transfer learning |
| Embedding | sentence-transformers o LLM API |
| LLM su tuoi dati | RAG |
| Esperimenti multipli | Optuna con TPE |

## Costanti utili

- $e \approx 2.71828$
- $\pi \approx 3.14159$
- $\ln 2 \approx 0.693$, $\ln 10 \approx 2.303$
- $\log_2 10 \approx 3.322$
- Normale: 68-95-99.7 dentro $\mu \pm 1\sigma, 2\sigma, 3\sigma$

## Conversioni tra log

$$\log_b x = \frac{\ln x}{\ln b}$$

$$\log_2 x = \log_{10} x / \log_{10} 2 = \log_{10} x \cdot 3.322$$

## Tempo "regola del log"

Numero di parametri di una rete cresce in fretta:

| Rete | Parametri |
|---|---|
| Logistic 100 feature | ~100 |
| MLP 100→64→10 | ~7000 |
| ResNet-50 | 25M |
| GPT-2 small | 117M |
| GPT-3 | 175B |
| GPT-4 (stima) | ~1.7T |

## Note finali

Stampa, salva come PDF, tieni alla mano. Quando non ricordi una formula, **non barare** cercando online: prima prova a derivarla da quelle vicine. La derivazione costruisce intuizione. La copia, no.
