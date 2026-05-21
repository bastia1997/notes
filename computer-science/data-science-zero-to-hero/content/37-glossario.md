---
title: "Glossario A-Z"
area: "Riferimento"
summary: "Tutti i termini tecnici del percorso, definiti in 1-2 righe. Da consultare quando un acronimo ti suona ma non ti torna in mente."
order: 37
level: "principiante"
prereq: []
tools: []
---

# Glossario A-Z

Tutti i termini incontrati nel percorso, in una pagina sola. Usalo come dizionario.

## A

**Accuracy** — frazione di predizioni corrette. Ingannevole su classi sbilanciate.

**Activation function** — funzione non lineare applicata in un neurone (ReLU, sigmoid, tanh, GELU).

**Adam** — ottimizzatore di default per reti neurali. Adatta il learning rate per parametro.

**ADF (Augmented Dickey-Fuller)** — test di stazionarietà per time series.

**AIC (Akaike Information Criterion)** — metrica di selezione modello: $-2\log L + 2k$.

**ANOVA** — Analysis of Variance: test per confrontare medie di 3+ gruppi.

**API** — Application Programming Interface. In ML: endpoint HTTP che serve un modello.

**ARIMA** — modello classico per time series: AutoRegressive + Integrated + Moving Average.

**Attention** — meccanismo che pesa quanto un token "guarda" gli altri. Base dei Transformer.

**AUC (Area Under the Curve)** — metrica di classificazione. ROC AUC, PR AUC. 1 = perfetto, 0.5 = random.

**Autoencoder** — rete neurale che impara a riprodurre l'input attraverso una rappresentazione compressa.

**Autograd** — differenziazione automatica (PyTorch, JAX).

## B

**Backpropagation** — algoritmo per calcolare gradienti in una rete neurale via chain rule.

**Bagging (Bootstrap Aggregating)** — addestrare modelli su bootstrap e mediare. Base di Random Forest.

**Bayes (teorema)** — $P(A|B) = P(B|A)P(A)/P(B)$. Aggiorna credenze coi dati.

**Bayesian** — approccio in cui i parametri sono variabili aleatorie con distribuzioni.

**BCE (Binary Cross-Entropy)** — loss standard per classificazione binaria.

**BERT** — Bidirectional Encoder Representations from Transformers. Modello pre-allenato per NLP.

**Bias (statistico)** — errore sistematico di uno stimatore.

**Bias-variance tradeoff** — più capacità = meno bias, più varianza. Il cuore della teoria ML.

**BIC (Bayesian Information Criterion)** — come AIC ma penalizza di più: $-2\log L + k\log n$.

**Boosting** — ensemble sequenziale: ogni modello corregge il precedente (GBM, XGBoost, LightGBM, CatBoost).

**Bootstrap** — ricampionamento con rimpiazzo. Per stimare distribuzioni e CI.

**BPE (Byte Pair Encoding)** — tokenizzazione subword usata in GPT.

**Broadcasting** — meccanismo NumPy per operare su array di shape diverse compatibili.

## C

**Categorical encoding** — convertire categorie in numeri (one-hot, ordinal, target encoding).

**CatBoost** — gradient boosting che gestisce nativamente categoriali.

**CI (Confidence Interval)** — intervallo di confidenza. Frequentista: copre il vero parametro in N% dei campionamenti.

**CLT (Central Limit Theorem)** — la media di tanti campioni iid tende a una normale.

**CNN (Convolutional Neural Network)** — rete con conv layer, ottima per immagini.

**Confusion matrix** — tabella TP/FP/FN/TN per classificazione.

**CRISP-DM** — Cross-Industry Standard Process for Data Mining. 6 fasi di un progetto ML.

**Cross-entropy** — loss per classificazione: $-\sum y \log \hat{p}$.

**Cross-validation** — split del dataset per stima onesta dell'errore (K-fold, stratified, time-series).

## D

**DAG (Directed Acyclic Graph)** — grafo diretto senza cicli. In causal inference rappresenta relazioni causali.

**Data drift** — cambio della distribuzione delle feature nel tempo.

**DBSCAN** — clustering density-based, scopre cluster di forma arbitraria, identifica noise.

**Decision tree** — modello a domande "$x_j < t$" annidate.

**Deep Learning** — reti neurali profonde (3+ hidden layer).

**Distillation** — trasferire la conoscenza di un modello grande a uno piccolo.

**Dropout** — regolarizzazione che "spegne" casualmente neuroni durante il training.

**DVC** — Data Version Control. Git-like per dati grandi.

## E

**Early stopping** — fermare il training quando la val loss smette di migliorare.

**EDA (Exploratory Data Analysis)** — fase di esplorazione iniziale dei dati.

**Elastic Net** — regressione regolarizzata L1 + L2 combinati.

**ELU (Exponential Linear Unit)** — attivazione: ReLU + parte exp per $x < 0$.

**EM (Expectation-Maximization)** — algoritmo iterativo per fittare GMM e altri modelli latenti.

**Embedding** — rappresentazione vettoriale densa di un oggetto discreto (parola, utente, prodotto).

**Ensemble** — combinazione di più modelli (bagging, boosting, stacking).

**Entropia** — $H(X) = -\sum p \log p$. Quantifica "incertezza".

**Epoch** — un passaggio completo sul training set durante il training di una NN.

**ETL/ELT** — Extract-Transform-Load: pipeline dati.

## F

**F1 score** — media armonica di precision e recall.

**FAISS** — libreria Meta per ricerca rapida su vettori densi.

**Feature engineering** — costruire feature predittive dai dati grezzi.

**Feature importance** — quanto ciascuna feature contribuisce alle predizioni.

**Feature store** — sistema centralizzato per definire/calcolare feature di ML.

**Fine-tuning** — riallenare un modello pre-trained su nuovo task.

**FP / FN** — False Positive / False Negative.

**FPR (False Positive Rate)** — FP / (FP + TN). L'asse X della ROC.

## G

**GAN (Generative Adversarial Network)** — due reti che si "sfidano": una genera, una giudica.

**Gaussiana** — distribuzione normale.

**GBM (Gradient Boosting Machine)** — boosting con alberi e gradient descent funzionale.

**GELU** — attivazione usata nei Transformer.

**Gini index** — $1 - \sum p_k^2$. Misura impurità per alberi decisionali.

**GMM (Gaussian Mixture Model)** — mistura di gaussiane, fittata via EM.

**Gradient** — vettore delle derivate parziali. Direzione di massima crescita.

**Gradient descent** — $\theta \leftarrow \theta - \eta \nabla L$.

**Grid search** — tuning hyperparametri provando tutte le combinazioni.

**GRU (Gated Recurrent Unit)** — variante semplificata di LSTM.

## H

**Hessiana** — matrice delle derivate seconde.

**Holdout** — set tenuto da parte per valutazione finale.

**Hot encoding** — vedi One-hot.

**Huber loss** — mix MSE/MAE: quadratica per piccoli errori, lineare per grandi.

**Hyperparameter** — parametro impostato prima del training (lr, max_depth, ...).

## I

**iid** — independent and identically distributed. Assunzione base di molti metodi statistici.

**Imputation** — riempire valori mancanti.

**Inference** — predire con un modello allenato. Anche "inferenza statistica".

**IQR (Interquartile Range)** — Q3 - Q1.

**Isolation Forest** — algoritmo per anomaly detection.

## J

**JAX** — framework Google per autograd + JIT su accelerator.

**Jensen-Shannon divergence** — versione simmetrica di KL divergence.

**Joint distribution** — $P(X, Y)$, distribuzione di due o più variabili.

## K

**Kaggle** — piattaforma di competizioni ML.

**K-Means** — clustering: minimizza distanze quadrate ai centroidi.

**KNN (K-Nearest Neighbors)** — classifica/regredisce dalla maggioranza/media dei $k$ vicini più vicini.

**KL divergence** — $D_{KL}(P\|Q) = \sum p \log(p/q)$. Quanto $P$ è diversa da $Q$.

**KPSS** — test di stazionarietà (complementare ad ADF).

**Kurtosi** — momento 4°, misura "code pesanti" di una distribuzione.

## L

**L1, L2** — norme/regolarizzazioni: somma valori assoluti / somma quadrati.

**LangChain** — framework per applicazioni LLM.

**Laplace smoothing** — aggiungi pseudo-conta α per evitare probabilità zero in Naive Bayes.

**Lasso** — regressione con regolarizzazione L1. Feature selection automatica.

**Layer normalization** — normalizza per esempio (vs batch norm che normalizza per feature).

**Leakage** — info del test set "trapelata" nel training. Sempre da prevenire.

**Learning rate** — parametro $\eta$ in gradient descent.

**Likelihood** — $P(\text{dati} | \text{parametri})$.

**LightGBM** — implementazione veloce di gradient boosting.

**Linear regression** — modello $y = X\beta + \epsilon$.

**LLM (Large Language Model)** — Transformer enormi pre-allenati su testo.

**Log loss** — sinonimo di cross-entropy.

**LoRA** — Low-Rank Adaptation. Fine-tuning efficiente con poche matrici aggiunte.

**LSTM (Long Short-Term Memory)** — RNN con gate per gestire dipendenze lunghe.

## M

**MAE (Mean Absolute Error)** — errore medio assoluto.

**Mahalanobis distance** — distanza che considera la covarianza dei dati.

**MAP (Maximum A Posteriori)** — stima bayesiana puntuale: argmax del posterior.

**MAR / MCAR / MNAR** — tipi di missing: At Random / Completely At Random / Not At Random.

**Mask** — vettore booleano per filtri.

**MASE (Mean Absolute Scaled Error)** — metrica time series scala-indipendente.

**MCMC (Markov Chain Monte Carlo)** — sampling da distribuzioni complesse. Cuore del Bayesiano moderno.

**Mean (media)** — $\bar{x} = \frac{1}{n}\sum x_i$.

**Median (mediana)** — valore centrale ordinato. Robusta a outlier.

**MLE (Maximum Likelihood Estimation)** — argmax della likelihood.

**MLflow** — tracking e registry per esperimenti ML.

**MLOps** — DevOps per modelli ML.

**MLP (Multi-Layer Perceptron)** — rete feedforward fully connected.

**Multimodal** — modello che gestisce più tipi di dato (testo+immagini).

**Multicollinearità** — feature troppo correlate tra loro. Nemica della regressione.

## N

**Naive Bayes** — classificatore probabilistico che assume indipendenza tra feature.

**NER (Named Entity Recognition)** — estrarre persone, luoghi, organizzazioni dal testo.

**Newton's method** — ottimizzazione con Hessian. Convergenza quadratica ma costoso.

**NLP (Natural Language Processing)** — elaborazione del linguaggio naturale.

**Normalization** — scaling delle feature.

**Notebook** — Jupyter / Colab. Documento interattivo Python.

**NumPy** — libreria base per array numerici in Python.

## O

**OLS (Ordinary Least Squares)** — regressione lineare classica.

**One-hot encoding** — categoria → vettore con 1 in una posizione, 0 altrove.

**Optimizer** — algoritmo che aggiorna i pesi (SGD, Adam, AdamW, ...).

**Optuna** — libreria per Bayesian hyperparameter optimization.

**Outlier** — punto molto diverso dalla maggioranza.

**Overfitting** — modello che si adatta al rumore del training. Errore train basso, test alto.

## P

**Padding** — riempire con zeri/None per uniformare lunghezze.

**Pandas** — libreria DataFrame per Python.

**Parametri vs Iperparametri** — i primi sono appresi (pesi); i secondi sono scelti prima (lr).

**Parquet** — formato file columnar binario, efficiente.

**PCA (Principal Component Analysis)** — riduzione dim lineare via autovalori della covarianza.

**Pearson correlation** — correlazione lineare in $[-1, 1]$.

**Permutation importance** — feature importance robusta: misura calo accuracy permutando una feature.

**Pipeline (scikit-learn)** — composizione di trasformazioni + modello.

**Polars** — alternativa moderna a pandas, scritta in Rust.

**Pooling** — operazione di aggregazione locale in una CNN (max, average).

**Posterior** — $P(\text{parametri} | \text{dati})$ bayesiano.

**Precision** — TP / (TP + FP).

**Prior** — $P(\text{parametri})$ bayesiano.

**Probabilistic programming** — costruire modelli probabilistici come programmi (PyMC, Stan, NumPyro).

**Prompt engineering** — scrivere bene le richieste per LLM.

**Pruning** — tagliare rami di alberi o trial in Optuna.

**p-value** — probabilità di osservare dati estremi assumendo H0 vera. NON la probabilità che H0 sia vera.

**Python** — il linguaggio.

**PyTorch** — framework deep learning di Meta.

## Q

**Q-Q plot** — confronto grafico tra distribuzione campionaria e teorica.

**Quantile** — valore sotto cui sta una frazione dei dati.

**Quantile regression** — regredisce un quantile invece della media.

**QLoRA** — LoRA + quantizzazione 4-bit. Fine-tune LLM su singola GPU.

## R

**R²** — frazione di varianza spiegata. 1 perfetto, 0 = predice solo media.

**RAG (Retrieval-Augmented Generation)** — LLM + retrieval da una base di documenti.

**Random Forest** — bagging di alberi decisionali.

**Random search** — campionamento random nello spazio degli hyperparam.

**Recall** — TP / (TP + FN).

**Regularization** — penalità per evitare overfit (L1, L2, dropout).

**ReLU** — $\max(0, x)$. Attivazione di default.

**Residui** — $y - \hat{y}$.

**Ridge** — regressione con regolarizzazione L2.

**RMSE** — $\sqrt{\text{MSE}}$. Errore in unità di $y$.

**RNN (Recurrent Neural Network)** — rete con stato interno per sequenze.

**ROC** — Receiver Operating Characteristic. Plot TPR vs FPR.

**RoPE (Rotary Position Embedding)** — encoding posizionale moderno per Transformer.

## S

**SARIMAX** — ARIMA stagionale con variabili esogene.

**Scaling** — normalizzazione delle feature (StandardScaler, MinMax, Robust).

**Scikit-learn** — libreria ML di riferimento per Python.

**SGD (Stochastic Gradient Descent)** — gradient descent su un sample alla volta.

**SHAP (SHapley Additive exPlanations)** — spiegabilità basata su Shapley values della teoria dei giochi.

**Sigmoid** — $1/(1+e^{-x})$. Schiaccia in $(0,1)$.

**Silhouette** — metrica di clustering interno, in $[-1, 1]$.

**Skewness** — asimmetria di una distribuzione.

**SMOTE** — Synthetic Minority Oversampling. Genera esempi sintetici della classe minoritaria.

**Softmax** — generalizza sigmoid a $K$ classi. Output: distribuzione di probabilità.

**Sparsity** — la maggior parte degli elementi sono zero.

**Spark** — framework Big Data distribuito (Apache).

**SQL** — linguaggio query per database relazionali.

**Standardization** — $(x - \mu)/\sigma$. Media 0, std 1.

**Stationary (stazionarietà)** — proprietà statistiche costanti nel tempo.

**SVD (Singular Value Decomposition)** — $A = U\Sigma V^T$. Generalizza autovalori a matrici qualsiasi.

**SVM (Support Vector Machine)** — classificatore a margine massimo.

## T

**Tanh** — $\tanh(x)$. Attivazione tra -1 e 1.

**Target encoding** — categoria → media del target per quella categoria (con cross-validation).

**Tensor** — array N-dimensionale (NumPy, PyTorch).

**TensorFlow** — framework deep learning di Google.

**TF-IDF** — Term Frequency × Inverse Document Frequency. Rappresentazione testo classica.

**TimeSeriesSplit** — cross-validation rispettosa del tempo.

**TN, TP, FN, FP** — True/False Negative/Positive.

**Tokenization** — testo → lista di token (parole/subword/char).

**TPR (True Positive Rate)** — sinonimo di recall.

**Transfer learning** — riutilizzare un modello pre-trained.

**Transformer** — architettura "Attention is all you need" (2017).

**t-SNE** — riduzione dim per visualizzazione 2D/3D.

**t-test** — test parametrico per confronto medie.

## U

**UMAP** — successore moderno di t-SNE. Più veloce, preserva meglio struttura globale.

**Underfitting** — modello troppo semplice. Train e test entrambi alti.

**Univariate** — riguardante una singola variabile.

## V

**Validation set** — set per tuning hyperparam.

**Variance** — varianza. $\sigma^2 = E[(X-\mu)^2]$.

**Vectorization** — usare operazioni su array invece di for loop.

**VIF (Variance Inflation Factor)** — misura multicollinearità.

**ViT (Vision Transformer)** — Transformer per immagini (patch tokens).

## W

**Weight decay** — regolarizzazione L2 implementata nell'optimizer.

**Welch's t-test** — t-test per varianze diverse.

**Window function (SQL)** — `OVER(PARTITION BY ...)`. Calcola aggregati per riga senza collassare.

## X

**XGBoost** — implementazione molto popolare di gradient boosting.

**Xavier / Glorot init** — inizializzazione pesi per tanh/sigmoid.

## Y

**Yeo-Johnson transform** — generalizza Box-Cox per dati negativi.

## Z

**Z-score** — $(x - \mu)/\sigma$. Quante deviazioni standard sopra/sotto la media.

**Zero-shot** — modello che esegue un task senza training specifico.
