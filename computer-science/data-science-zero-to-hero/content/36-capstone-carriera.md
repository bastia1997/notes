---
title: "Capstone, portfolio, carriera"
area: "Carriera"
summary: "Progetti capstone per consolidare. Portfolio sul GitHub, kaggle, interview prep, cosa studiare dopo."
order: 36
level: "intermedio"
prereq:
  - "tutto il percorso"
tools:
  - "Git, Kaggle, LinkedIn"
---

# Capstone, portfolio, carriera

## La verità sui percorsi "zero to hero"

Tutti i tutorial finiscono qui: "ora hai le basi, vai a fare progetti". Ma **come** fare progetti che insegnano davvero (e che si possono mettere su LinkedIn) è raramente spiegato.

Sezione finale: 5 capstone progettati per costringerti a usare tutto il percorso, e un piano di carriera.

## 5 Capstone progressivi

### Capstone 1 — End-to-end churn prediction (livello: intermedio)

**Scenario**: una telco con 100k clienti vuole identificare chi cancellerà nei prossimi 60 giorni.

**Pezzi che eserciti**:
- Caricamento + pulizia (Pandas).
- Feature engineering temporale (recency, frequency, RFM).
- EDA con grafici (Seaborn).
- Baseline (logistica) + Random Forest + LightGBM.
- Tuning con Optuna.
- Threshold tuning per costo asimmetrico.
- Spiegabilità con SHAP.
- Deploy come API FastAPI.
- README con risultati e business case.

**Dataset**: cerca "Telco Customer Churn" su Kaggle.

**Deliverable**:
- Notebook EDA + modeling.
- API server.
- README con metriche, decisioni di design, limiti.

### Capstone 2 — Computer vision: classificatore custom (livello: intermedio)

**Scenario**: classifica immagini di piante in 10 specie con solo 30 immagini per classe.

**Pezzi**:
- Data augmentation aggressiva.
- Transfer learning con ResNet/ConvNeXt pre-allenato.
- Fine-tuning con LR differenziale.
- Confusion matrix per classe.
- Grad-CAM per visualizzare cosa guarda il modello.
- Deploy con Gradio per demo interattiva.

**Bonus**: prova due architetture (CNN vs ViT) e confronta.

### Capstone 3 — NLP: RAG su tuoi documenti (livello: avanzato)

**Scenario**: hai 200 PDF di manuali tecnici. Vuoi una chat che risponda dalle informazioni di quei manuali.

**Pezzi**:
- Estrazione testo (PyPDF / unstructured).
- Chunking intelligente (per paragrafo + overlap).
- Embedding con sentence-transformers.
- Vector DB (Chroma o FAISS).
- LLM via API (Claude / GPT / Ollama).
- Reranker (cross-encoder).
- Streamlit UI.
- Eval set: 30 Q&A annotate per misurare accuracy.

### Capstone 4 — Time series: forecasting di sales (livello: avanzato)

**Scenario**: 50 store × 30 prodotti × 3 anni di vendite. Prevedi i prossimi 30 giorni per ogni serie.

**Pezzi**:
- Decomposizione + EDA.
- Feature engineering: lag, rolling, calendario.
- Baseline: naive + Prophet.
- LightGBM globale (un modello per tutte le serie).
- Deep model (N-BEATS o TFT).
- TimeSeriesSplit CV con MASE.
- Intervalli predittivi (quantile).

**Dataset**: Kaggle "Store Item Demand Forecasting" o M5 competition.

### Capstone 5 — MLOps full-stack (livello: esperto)

**Scenario**: un modello in produzione con monitoring drift.

**Pezzi**:
- Training pipeline con DVC + MLflow.
- API FastAPI + Docker.
- Deploy su un VPS o Cloud Run.
- Logging predizioni in DB.
- Job schedulato che calcola drift settimanalmente (Evidently).
- Alert via email se drift > soglia.
- Retraining automatico se metrica degrada.
- Dashboard Grafana.

Questo è il capstone che ti farà assumere come **ML engineer**.

## Portfolio su GitHub

Anti-pattern frequenti del portfolio junior:

1. **Notebook senza README**. Nessuno scorrerà 200 celle senza contesto.
2. **Risultati millantati**. AUC 0.99 → leakage. I recruiter senior lo vedono.
3. **Solo Kaggle copy**. Differenziati.
4. **Codice senza struttura**. `src/`, `notebooks/`, `data/`, `tests/`.
5. **Niente test**. Anche un solo test pytest dimostra che sai farlo.

### Cosa mostrare

- 3-5 progetti **completi** (incluso README, deploy se applicabile).
- README con: problema, dati, metodo, risultati, **decisioni difficili e tradeoff**.
- Codice pulito: type hint, ruff format, docstring.
- Un blog post (Medium / proprio) per ogni progetto. Spiega in 5 minuti.

### Stack consigliato per la repo

```
mio-progetto/
├── README.md           # principale
├── pyproject.toml
├── data/
│   ├── raw/            # NON commit
│   └── processed/
├── notebooks/          # esplorazione
├── src/
│   ├── data.py         # caricamento + pulizia
│   ├── features.py     # feature engineering
│   ├── models.py       # train + predict
│   └── api.py          # FastAPI
├── tests/
└── .github/workflows/  # CI
```

## Kaggle: utile o no?

Utile per imparare tecniche, sì. Ma:

- Kaggle competitions ≠ data science del mondo reale.
- Vincere top-10 richiede mesi di blending paranoico, non rappresentativo.
- Mostra che sai usare gli strumenti, non che sai trovare il problema giusto.

Strategia: 2-3 competizioni con soluzioni complete e blog post. Non gareggiare per le medaglie d'oro.

## Interview prep

Tipologie di colloquio:

1. **SQL live**: una query complessa con window function. Esercitati su Stratascratch, LeetCode SQL.
2. **Python coding**: data manipulation, qualche algoritmo. Pandas + NumPy.
3. **ML theory**: bias-variance, regolarizzazione, scelta del modello, metriche. Hai imparato tutto in questo percorso.
4. **Case study**: "come affronteresti il problema X?". Mostra rigorosamente il processo CRISP-DM.
5. **System design**: "progetta un recommender per Netflix". Architettura end-to-end.
6. **Behavioral**: "raccontami di un progetto che è andato male". Sii onesto.

### Domande tipiche di teoria

- Spiegami bias-variance.
- Quando preferiresti L1 a L2?
- Cosa è data leakage e come lo eviti?
- Differenza tra precision e recall? Quando ti importa più di una?
- Come spiegheresti un albero a un non-tecnico?
- Cosa è il vanishing gradient?
- Come scegli K in K-means?
- Cosa è il bonferroni e quando si usa?
- Spiega la cross-entropy loss.

## Cosa studiare dopo questo percorso

Per andare oltre:

| Direzione | Risorse |
|---|---|
| **Approfondimento statistica** | ISLR (Hastie), ESL (più tosto), Andrew Ng CS229 |
| **Deep learning avanzato** | Goodfellow's book, fast.ai (top), Stanford CS231n + CS224n |
| **MLOps serio** | "Designing ML Systems" (Chip Huyen), MLOps Zoomcamp (gratis) |
| **Bayesian** | Statistical Rethinking (McElreath, top), BDA3 (Gelman) |
| **Causal** | "The Book of Why" (Pearl), Mostly Harmless Econometrics |
| **Time series** | Hyndman "FPP3" (gratis online) |
| **NLP/LLM** | Karpathy YouTube (oro), HuggingFace course |
| **System design ML** | "Machine Learning System Design Interview" (Aminian) |

## Comunità

- **Twitter/X**: segui Andrej Karpathy, Yann LeCun, Sebastian Raschka, Cassie Kozyrkov.
- **YouTube**: Two Minute Papers, 3Blue1Brown, StatQuest, Yannic Kilcher.
- **Newsletter**: "The Batch" (Andrew Ng), "Import AI" (Jack Clark), "The Sequence".
- **Reddit**: r/MachineLearning per paper, r/datascience per carriera.
- **Discord**: comunità HuggingFace, fast.ai forum.

## Conclusione: la mentalità

In 36 sezioni hai visto matematica, codice, modelli, deployment. La cosa più importante non sta in nessuna di esse:

> Un buon data scientist è **scettico**, soprattutto verso i propri risultati. È **curioso** dei dati, non solo dei modelli. **Comunica** in modo chiaro. **Documenta** quel che fa. **Non innamora** di un metodo. **Sa quando il problema non è ML**.

Buona strada. Le sezioni precedenti restano qui — torna a rileggerle. Niente di tutto questo si capisce davvero al primo passaggio.

## Esercizio finale (uno solo)

Scegli **uno** dei capstone. Falli per davvero, anche solo a livello base. Mettilo su GitHub con un README onesto su cosa funziona e cosa no.

Quel progetto vale più delle 36 sezioni di teoria messe insieme.

Buon lavoro.
