---
title: "Capstone, portfolio, career"
area: "Career"
summary: "Capstone projects to consolidate your skills. Portfolio on GitHub, Kaggle, interview prep, and what to study next."
order: 36
level: "intermediate"
prereq:
  - "the entire path"
tools:
  - "Git, Kaggle, LinkedIn"
---

# Capstone, portfolio, career

## The truth about "zero to hero" courses

All tutorials end here: "now you have the basics, go build projects". But **how** to build projects that truly teach (and that you can put on LinkedIn) is rarely explained.

Final section: 5 capstones designed to force you to use everything in the course, plus a career plan.

## 5 Progressive Capstones

### Capstone 1 — End-to-end churn prediction (level: intermediate)

**Scenario**: a telco with 100k customers wants to identify who will cancel in the next 60 days.

**Skills you practice**:
- Loading + cleaning (Pandas).
- Temporal feature engineering (recency, frequency, RFM).
- EDA with charts (Seaborn).
- Baseline (logistic) + Random Forest + LightGBM.
- Tuning with Optuna.
- Threshold tuning for asymmetric cost.
- Explainability with SHAP.
- Deploy as a FastAPI API.
- README with results and business case.

**Dataset**: search for "Telco Customer Churn" on Kaggle.

**Deliverables**:
- EDA + modeling notebook.
- API server.
- README with metrics, design decisions, and limitations.

### Capstone 2 — Computer vision: custom classifier (level: intermediate)

**Scenario**: classify plant images into 10 species with only 30 images per class.

**Skills**:
- Aggressive data augmentation.
- Transfer learning with pre-trained ResNet/ConvNeXt.
- Fine-tuning with differential LR.
- Confusion matrix per class.
- Grad-CAM to visualize what the model looks at.
- Deploy with Gradio for an interactive demo.

**Bonus**: try two architectures (CNN vs ViT) and compare.

### Capstone 3 — NLP: RAG on your own documents (level: advanced)

**Scenario**: you have 200 PDFs of technical manuals. You want a chat that answers from the information in those manuals.

**Skills**:
- Text extraction (PyPDF / unstructured).
- Intelligent chunking (by paragraph + overlap).
- Embedding with sentence-transformers.
- Vector DB (Chroma or FAISS).
- LLM via API (Claude / GPT / Ollama).
- Reranker (cross-encoder).
- Streamlit UI.
- Eval set: 30 annotated Q&As to measure accuracy.

### Capstone 4 — Time series: sales forecasting (level: advanced)

**Scenario**: 50 stores × 30 products × 3 years of sales. Forecast the next 30 days for each series.

**Skills**:
- Decomposition + EDA.
- Feature engineering: lag, rolling, calendar.
- Baseline: naive + Prophet.
- Global LightGBM (one model for all series).
- Deep model (N-BEATS or TFT).
- TimeSeriesSplit CV with MASE.
- Prediction intervals (quantile).

**Dataset**: Kaggle "Store Item Demand Forecasting" or M5 competition.

### Capstone 5 — Full-stack MLOps (level: expert)

**Scenario**: a production model with drift monitoring.

**Skills**:
- Training pipeline with DVC + MLflow.
- FastAPI + Docker API.
- Deploy on a VPS or Cloud Run.
- Log predictions to a DB.
- Scheduled job that computes drift weekly (Evidently).
- Alert via email if drift > threshold.
- Automatic retraining if metric degrades.
- Grafana dashboard.

This is the capstone that will get you hired as an **ML engineer**.

## Portfolio on GitHub

Common anti-patterns in a junior portfolio:

1. **Notebooks without a README**. Nobody will scroll through 200 cells without context.
2. **Inflated results**. AUC 0.99 → leakage. Senior recruiters will spot it.
3. **Only Kaggle copies**. Differentiate yourself.
4. **Code without structure**. `src/`, `notebooks/`, `data/`, `tests/`.
5. **No tests**. Even a single pytest test shows you know how to write them.

### What to show

- 3-5 **complete** projects (including README, deploy if applicable).
- README with: problem, data, method, results, **hard decisions and tradeoffs**.
- Clean code: type hints, ruff format, docstrings.
- A blog post (Medium / your own) for each project. Explain it in 5 minutes.

### Recommended repo structure

```
my-project/
├── README.md           # main
├── pyproject.toml
├── data/
│   ├── raw/            # DO NOT commit
│   └── processed/
├── notebooks/          # exploration
├── src/
│   ├── data.py         # loading + cleaning
│   ├── features.py     # feature engineering
│   ├── models.py       # train + predict
│   └── api.py          # FastAPI
├── tests/
└── .github/workflows/  # CI
```

## Kaggle: useful or not?

Useful for learning techniques, yes. But:

- Kaggle competitions ≠ real-world data science.
- Winning top-10 requires months of paranoid blending, which is not representative.
- It shows you can use the tools, not that you can find the right problem.

Strategy: 2-3 competitions with complete solutions and blog posts. Don't chase gold medals.

## Interview prep

Types of interviews:

1. **Live SQL**: a complex query with window functions. Practice on Stratascratch, LeetCode SQL.
2. **Python coding**: data manipulation, some algorithms. Pandas + NumPy.
3. **ML theory**: bias-variance, regularization, model selection, metrics. You learned all of this in this course.
4. **Case study**: "how would you approach problem X?". Rigorously show the CRISP-DM process.
5. **System design**: "design a recommender for Netflix". End-to-end architecture.
6. **Behavioral**: "tell me about a project that went wrong". Be honest.

### Typical theory questions

- Explain bias-variance to me.
- When would you prefer L1 over L2?
- What is data leakage and how do you prevent it?
- Difference between precision and recall? When does one matter more?
- How would you explain a decision tree to a non-technical person?
- What is the vanishing gradient?
- How do you choose K in K-means?
- What is Bonferroni correction and when is it used?
- Explain the cross-entropy loss.

## What to study after this course

To go further:

| Direction | Resources |
|---|---|
| **Statistics deep dive** | ISLR (Hastie), ESL (harder), Andrew Ng CS229 |
| **Advanced deep learning** | Goodfellow's book, fast.ai (top), Stanford CS231n + CS224n |
| **Serious MLOps** | "Designing ML Systems" (Chip Huyen), MLOps Zoomcamp (free) |
| **Bayesian** | Statistical Rethinking (McElreath, top), BDA3 (Gelman) |
| **Causal** | "The Book of Why" (Pearl), Mostly Harmless Econometrics |
| **Time series** | Hyndman "FPP3" (free online) |
| **NLP/LLM** | Karpathy YouTube (gold), HuggingFace course |
| **ML System design** | "Machine Learning System Design Interview" (Aminian) |

## Community

- **Twitter/X**: follow Andrej Karpathy, Yann LeCun, Sebastian Raschka, Cassie Kozyrkov.
- **YouTube**: Two Minute Papers, 3Blue1Brown, StatQuest, Yannic Kilcher.
- **Newsletters**: "The Batch" (Andrew Ng), "Import AI" (Jack Clark), "The Sequence".
- **Reddit**: r/MachineLearning for papers, r/datascience for career.
- **Discord**: HuggingFace community, fast.ai forum.

## Conclusion: the mindset

In 36 sections you have seen math, code, models, and deployment. The most important thing is not found in any of them:

> A good data scientist is **skeptical**, especially of their own results. They are **curious** about the data, not just the models. They **communicate** clearly. They **document** what they do. They **don't fall in love** with a method. They **know when the problem is not ML**.

Good luck. The previous sections are still here — come back and reread them. None of this is truly understood on the first pass.

## Final exercise (just one)

Choose **one** of the capstones. Actually do it, even just at a basic level. Put it on GitHub with an honest README about what works and what doesn't.

That project is worth more than all 36 sections of theory combined.

Good work.
