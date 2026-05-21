---
title: "Glossary A-Z"
area: "Reference"
summary: "All the technical terms from the course, defined in 1-2 lines. Look it up when an acronym rings a bell but you can't quite recall what it means."
order: 37
level: "beginner"
prereq: []
tools: []
---

# Glossary A-Z

All the terms encountered throughout the course, on a single page. Use it as a dictionary.

## A

**Accuracy** — fraction of correct predictions. Misleading on imbalanced classes.

**Activation function** — nonlinear function applied in a neuron (ReLU, sigmoid, tanh, GELU).

**Adam** — default optimizer for neural networks. Adapts the learning rate per parameter.

**ADF (Augmented Dickey-Fuller)** — stationarity test for time series.

**AIC (Akaike Information Criterion)** — model selection metric: $-2\log L + 2k$.

**ANOVA** — Analysis of Variance: test for comparing means of 3+ groups.

**API** — Application Programming Interface. In ML: an HTTP endpoint serving a model.

**ARIMA** — classical time series model: AutoRegressive + Integrated + Moving Average.

**Attention** — mechanism that weights how much a token "looks at" the others. Foundation of Transformers.

**AUC (Area Under the Curve)** — classification metric. ROC AUC, PR AUC. 1 = perfect, 0.5 = random.

**Autoencoder** — neural network that learns to reproduce its input through a compressed representation.

**Autograd** — automatic differentiation (PyTorch, JAX).

## B

**Backpropagation** — algorithm for computing gradients in a neural network via the chain rule.

**Bagging (Bootstrap Aggregating)** — train models on bootstrap samples and average them. Foundation of Random Forest.

**Bayes (theorem)** — $P(A|B) = P(B|A)P(A)/P(B)$. Updates beliefs with data.

**Bayesian** — approach in which parameters are random variables with distributions.

**BCE (Binary Cross-Entropy)** — standard loss for binary classification.

**BERT** — Bidirectional Encoder Representations from Transformers. Pre-trained model for NLP.

**Bias (statistical)** — systematic error of an estimator.

**Bias-variance tradeoff** — more capacity = less bias, more variance. The heart of ML theory.

**BIC (Bayesian Information Criterion)** — like AIC but with a stronger penalty: $-2\log L + k\log n$.

**Boosting** — sequential ensemble: each model corrects the previous one (GBM, XGBoost, LightGBM, CatBoost).

**Bootstrap** — resampling with replacement. Used to estimate distributions and CIs.

**BPE (Byte Pair Encoding)** — subword tokenization used in GPT.

**Broadcasting** — NumPy mechanism for operating on arrays with compatible but different shapes.

## C

**Categorical encoding** — converting categories to numbers (one-hot, ordinal, target encoding).

**CatBoost** — gradient boosting that natively handles categoricals.

**CI (Confidence Interval)** — frequentist: covers the true parameter in N% of samples.

**CLT (Central Limit Theorem)** — the mean of many iid samples tends to a normal distribution.

**CNN (Convolutional Neural Network)** — network with conv layers, excellent for images.

**Confusion matrix** — TP/FP/FN/TN table for classification.

**CRISP-DM** — Cross-Industry Standard Process for Data Mining. 6 phases of an ML project.

**Cross-entropy** — loss for classification: $-\sum y \log \hat{p}$.

**Cross-validation** — dataset splitting for honest error estimation (K-fold, stratified, time-series).

## D

**DAG (Directed Acyclic Graph)** — directed graph with no cycles. In causal inference it represents causal relationships.

**Data drift** — change in the distribution of features over time.

**DBSCAN** — density-based clustering; discovers arbitrarily shaped clusters and identifies noise.

**Decision tree** — model based on nested "$x_j < t$" questions.

**Deep Learning** — deep neural networks (3+ hidden layers).

**Distillation** — transferring knowledge from a large model to a smaller one.

**Dropout** — regularization that randomly "turns off" neurons during training.

**DVC** — Data Version Control. Git-like tool for large data.

## E

**Early stopping** — stop training when the validation loss stops improving.

**EDA (Exploratory Data Analysis)** — initial data exploration phase.

**Elastic Net** — regularized regression combining L1 + L2.

**ELU (Exponential Linear Unit)** — activation: ReLU + exponential part for $x < 0$.

**EM (Expectation-Maximization)** — iterative algorithm for fitting GMMs and other latent models.

**Embedding** — dense vector representation of a discrete object (word, user, product).

**Ensemble** — combination of multiple models (bagging, boosting, stacking).

**Entropy** — $H(X) = -\sum p \log p$. Quantifies "uncertainty".

**Epoch** — one complete pass over the training set during NN training.

**ETL/ELT** — Extract-Transform-Load: data pipeline.

## F

**F1 score** — harmonic mean of precision and recall.

**FAISS** — Meta library for fast search over dense vectors.

**Feature engineering** — building predictive features from raw data.

**Feature importance** — how much each feature contributes to predictions.

**Feature store** — centralized system for defining/computing ML features.

**Fine-tuning** — retraining a pre-trained model on a new task.

**FP / FN** — False Positive / False Negative.

**FPR (False Positive Rate)** — FP / (FP + TN). The X-axis of the ROC curve.

## G

**GAN (Generative Adversarial Network)** — two networks that "compete": one generates, one judges.

**Gaussian** — normal distribution.

**GBM (Gradient Boosting Machine)** — boosting with trees and functional gradient descent.

**GELU** — activation used in Transformers.

**Gini index** — $1 - \sum p_k^2$. Measures impurity for decision trees.

**GMM (Gaussian Mixture Model)** — mixture of Gaussians, fitted via EM.

**Gradient** — vector of partial derivatives. Direction of steepest ascent.

**Gradient descent** — $\theta \leftarrow \theta - \eta \nabla L$.

**Grid search** — hyperparameter tuning by trying all combinations.

**GRU (Gated Recurrent Unit)** — simplified variant of LSTM.

## H

**Hessian** — matrix of second-order partial derivatives.

**Holdout** — set kept aside for final evaluation.

**Hot encoding** — see One-hot.

**Huber loss** — mix of MSE/MAE: quadratic for small errors, linear for large ones.

**Hyperparameter** — parameter set before training (lr, max_depth, ...).

## I

**iid** — independent and identically distributed. Basic assumption of many statistical methods.

**Imputation** — filling in missing values.

**Inference** — making predictions with a trained model. Also "statistical inference".

**IQR (Interquartile Range)** — Q3 - Q1.

**Isolation Forest** — algorithm for anomaly detection.

## J

**JAX** — Google framework for autograd + JIT on accelerators.

**Jensen-Shannon divergence** — symmetric version of KL divergence.

**Joint distribution** — $P(X, Y)$, distribution of two or more variables.

## K

**Kaggle** — ML competition platform.

**K-Means** — clustering: minimizes squared distances to centroids.

**KNN (K-Nearest Neighbors)** — classifies/regresses based on the majority/mean of the $k$ nearest neighbors.

**KL divergence** — $D_{KL}(P\|Q) = \sum p \log(p/q)$. How different $P$ is from $Q$.

**KPSS** — stationarity test (complementary to ADF).

**Kurtosis** — 4th moment, measures "heavy tails" of a distribution.

## L

**L1, L2** — norms/regularizations: sum of absolute values / sum of squares.

**LangChain** — framework for LLM applications.

**Laplace smoothing** — add pseudo-count α to avoid zero probabilities in Naive Bayes.

**Lasso** — regression with L1 regularization. Automatic feature selection.

**Layer normalization** — normalizes per example (vs batch norm which normalizes per feature).

**Leakage** — test set information "leaking" into training. Always to be prevented.

**Learning rate** — parameter $\eta$ in gradient descent.

**Likelihood** — $P(\text{data} | \text{parameters})$.

**LightGBM** — fast implementation of gradient boosting.

**Linear regression** — model $y = X\beta + \epsilon$.

**LLM (Large Language Model)** — very large Transformers pre-trained on text.

**Log loss** — synonym for cross-entropy.

**LoRA** — Low-Rank Adaptation. Efficient fine-tuning with a few added matrices.

**LSTM (Long Short-Term Memory)** — RNN with gates for handling long-range dependencies.

## M

**MAE (Mean Absolute Error)** — mean absolute error.

**Mahalanobis distance** — distance that accounts for the covariance of the data.

**MAP (Maximum A Posteriori)** — Bayesian point estimate: argmax of the posterior.

**MAR / MCAR / MNAR** — types of missingness: At Random / Completely At Random / Not At Random.

**Mask** — boolean vector for filtering.

**MASE (Mean Absolute Scaled Error)** — scale-independent time series metric.

**MCMC (Markov Chain Monte Carlo)** — sampling from complex distributions. Core of modern Bayesian inference.

**Mean** — $\bar{x} = \frac{1}{n}\sum x_i$.

**Median** — central ordered value. Robust to outliers.

**MLE (Maximum Likelihood Estimation)** — argmax of the likelihood.

**MLflow** — tracking and registry for ML experiments.

**MLOps** — DevOps for ML models.

**MLP (Multi-Layer Perceptron)** — fully connected feedforward network.

**Multimodal** — model handling multiple data types (text + images).

**Multicollinearity** — features that are too correlated with each other. Enemy of regression.

## N

**Naive Bayes** — probabilistic classifier assuming feature independence.

**NER (Named Entity Recognition)** — extracting persons, places, organizations from text.

**Newton's method** — optimization using the Hessian. Quadratic convergence but expensive.

**NLP (Natural Language Processing)** — processing of natural language.

**Normalization** — feature scaling.

**Notebook** — Jupyter / Colab. Interactive Python document.

**NumPy** — core library for numerical arrays in Python.

## O

**OLS (Ordinary Least Squares)** — classical linear regression.

**One-hot encoding** — category → vector with 1 in one position, 0 elsewhere.

**Optimizer** — algorithm that updates weights (SGD, Adam, AdamW, ...).

**Optuna** — library for Bayesian hyperparameter optimization.

**Outlier** — data point very different from the majority.

**Overfitting** — model that adapts to training noise. Low train error, high test error.

## P

**Padding** — filling with zeros/None to equalize lengths.

**Pandas** — DataFrame library for Python.

**Parameters vs Hyperparameters** — the former are learned (weights); the latter are chosen beforehand (lr).

**Parquet** — binary columnar file format, efficient.

**PCA (Principal Component Analysis)** — linear dimensionality reduction via eigenvalues of the covariance matrix.

**Pearson correlation** — linear correlation in $[-1, 1]$.

**Permutation importance** — robust feature importance: measures accuracy drop when permuting a feature.

**Pipeline (scikit-learn)** — composition of transformations + model.

**Polars** — modern alternative to pandas, written in Rust.

**Pooling** — local aggregation operation in a CNN (max, average).

**Posterior** — Bayesian $P(\text{parameters} | \text{data})$.

**Precision** — TP / (TP + FP).

**Prior** — Bayesian $P(\text{parameters})$.

**Probabilistic programming** — building probabilistic models as programs (PyMC, Stan, NumPyro).

**Prompt engineering** — writing good prompts for LLMs.

**Pruning** — trimming tree branches or trials in Optuna.

**p-value** — probability of observing extreme data assuming H0 is true. NOT the probability that H0 is true.

**Python** — the language.

**PyTorch** — Meta's deep learning framework.

## Q

**Q-Q plot** — graphical comparison between sample and theoretical distributions.

**Quantile** — value below which a fraction of the data falls.

**Quantile regression** — regresses a quantile instead of the mean.

**QLoRA** — LoRA + 4-bit quantization. Fine-tune LLMs on a single GPU.

## R

**R²** — fraction of variance explained. 1 = perfect, 0 = predicts only the mean.

**RAG (Retrieval-Augmented Generation)** — LLM + retrieval from a document base.

**Random Forest** — bagging of decision trees.

**Random search** — random sampling in the hyperparameter space.

**Recall** — TP / (TP + FN).

**Regularization** — penalty to prevent overfitting (L1, L2, dropout).

**ReLU** — $\max(0, x)$. Default activation.

**Residuals** — $y - \hat{y}$.

**Ridge** — regression with L2 regularization.

**RMSE** — $\sqrt{\text{MSE}}$. Error in units of $y$.

**RNN (Recurrent Neural Network)** — network with internal state for sequences.

**ROC** — Receiver Operating Characteristic. Plot of TPR vs FPR.

**RoPE (Rotary Position Embedding)** — modern positional encoding for Transformers.

## S

**SARIMAX** — seasonal ARIMA with exogenous variables.

**Scaling** — normalizing features (StandardScaler, MinMax, Robust).

**Scikit-learn** — reference ML library for Python.

**SGD (Stochastic Gradient Descent)** — gradient descent on one sample at a time.

**SHAP (SHapley Additive exPlanations)** — explainability based on Shapley values from game theory.

**Sigmoid** — $1/(1+e^{-x})$. Squashes to $(0,1)$.

**Silhouette** — internal clustering metric, in $[-1, 1]$.

**Skewness** — asymmetry of a distribution.

**SMOTE** — Synthetic Minority Oversampling. Generates synthetic examples of the minority class.

**Softmax** — generalizes sigmoid to $K$ classes. Output: probability distribution.

**Sparsity** — most elements are zero.

**Spark** — distributed Big Data framework (Apache).

**SQL** — query language for relational databases.

**Standardization** — $(x - \mu)/\sigma$. Mean 0, std 1.

**Stationarity** — statistical properties constant over time.

**SVD (Singular Value Decomposition)** — $A = U\Sigma V^T$. Generalizes eigenvalues to arbitrary matrices.

**SVM (Support Vector Machine)** — maximum-margin classifier.

## T

**Tanh** — $\tanh(x)$. Activation between -1 and 1.

**Target encoding** — category → mean of the target for that category (with cross-validation).

**Tensor** — N-dimensional array (NumPy, PyTorch).

**TensorFlow** — Google's deep learning framework.

**TF-IDF** — Term Frequency × Inverse Document Frequency. Classic text representation.

**TimeSeriesSplit** — time-respecting cross-validation.

**TN, TP, FN, FP** — True/False Negative/Positive.

**Tokenization** — text → list of tokens (words/subwords/chars).

**TPR (True Positive Rate)** — synonym for recall.

**Transfer learning** — reusing a pre-trained model.

**Transformer** — "Attention is all you need" architecture (2017).

**t-SNE** — dimensionality reduction for 2D/3D visualization.

**t-test** — parametric test for comparing means.

## U

**UMAP** — modern successor to t-SNE. Faster, better preserves global structure.

**Underfitting** — model too simple. Both train and test errors are high.

**Univariate** — concerning a single variable.

## V

**Validation set** — set for hyperparameter tuning.

**Variance** — $\sigma^2 = E[(X-\mu)^2]$.

**Vectorization** — using array operations instead of for loops.

**VIF (Variance Inflation Factor)** — measures multicollinearity.

**ViT (Vision Transformer)** — Transformer for images (patch tokens).

## W

**Weight decay** — L2 regularization implemented in the optimizer.

**Welch's t-test** — t-test for unequal variances.

**Window function (SQL)** — `OVER(PARTITION BY ...)`. Computes aggregates per row without collapsing.

## X

**XGBoost** — very popular implementation of gradient boosting.

**Xavier / Glorot init** — weight initialization for tanh/sigmoid.

## Y

**Yeo-Johnson transform** — generalizes Box-Cox for negative data.

## Z

**Z-score** — $(x - \mu)/\sigma$. How many standard deviations above/below the mean.

**Zero-shot** — model that performs a task without task-specific training.
