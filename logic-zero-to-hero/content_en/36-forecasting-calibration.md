---
title: "Forecasting and calibration"
area: "Decision"
summary: "How to measure the quality of a probabilistic prediction? Brier score, calibration, sharpness, and the techniques of Tetlock's superforecasters."
order: 36
level: "advanced"
prereq:
  - "Have read [Bayes' theorem](33-bayes-theorem.html)"
tools:
  - "gjopen.com, Metaculus, Manifold"
---

# Forecasting and calibration

When a meteorologist says "70% chance of rain tomorrow", how do I evaluate whether they're right? A single prediction can't be falsified — even 90% can be wrong, just unlikely. To evaluate a forecaster you need *many* predictions and specific metrics.

## 1. Calibration

A forecaster is **well-calibrated** if events they call at $p\%$ occur about $p\%$ of the time over many similar predictions.

### Calibration curve

X-axis: predicted probability. Y-axis: observed frequency. Perfect calibration is the diagonal.

<div class="chart">
<svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" style="background:#181834">
  <line x1="40" y1="240" x2="280" y2="240" stroke="#9890b8"/>
  <line x1="40" y1="240" x2="40" y2="40" stroke="#9890b8"/>
  <text x="135" y="270" fill="#ecebff" font-size="11">predicted probability</text>
  <line x1="40" y1="240" x2="280" y2="40" stroke="#4cb38a" stroke-dasharray="4,3"/>
  <text x="240" y="55" fill="#4cb38a" font-size="10">ideal</text>
  <polyline points="40,230 88,200 136,170 184,135 232,90 280,60" stroke="#9a8cf0" stroke-width="2" fill="none"/>
  <text x="100" y="190" fill="#9a8cf0" font-size="10">good forecaster</text>
  <polyline points="40,210 88,170 136,140 184,100 232,70 280,50" stroke="#e07a8d" stroke-width="2"  fill="none"/>
  <text x="160" y="115" fill="#e07a8d" font-size="10">overconfident</text>
</svg>
<div class="chart-caption">Calibration: good forecaster tracks diagonal; overconfident overshoots.</div>
</div>

- **Overconfident**: says 90% and 70% happens. Most "experts".
- **Underconfident**: says 60% and 80% happens. Superforecasters slightly so.

## 2. Brier score

For one binary event:

$$BS = (p - o)^2$$

$o = 1$ if event, 0 else. Over $N$ predictions:

$$\bar{BS} = \frac{1}{N} \sum (p_i - o_i)^2$$

Range $[0, 1]$. **Lower is better**. Perfect = 0. Constantly 50% on 50/50 events = 0.25.

### Murphy decomposition

$$\bar{BS} = \underbrace{\bar o(1-\bar o)}_{\text{uncertainty}} + \underbrace{\text{calib.}}_{\text{penalty}} - \underbrace{\text{resolution}}_{\text{bonus}}$$

A constant-50% forecaster is calibrated on aggregate but has zero resolution.

## 3. Log score (proper scoring rule)

$$LS = -\log p_{\text{true}}$$

Heavily penalizes "confident wrong" (e.g. $p=0.01$ on event → $-\log 0.01 = 4.6$). Proper rule: maximizing expected log-score requires reporting true probability — no bluff.

## 4. Sharpness

How far your predictions stray from the base rate. Sharp = informative. Between equally-calibrated forecasters, the sharper wins.

## 5. Tetlock's research

Philip Tetlock, *Expert Political Judgment* (2005): 20 years, ~28000 expert political predictions. Conclusion: experts don't beat uniform-distribution algorithm significantly. But within the mass, **foxes** (vs **hedgehogs**) stand out.

### Foxes vs hedgehogs (Berlin 1953, Tetlock)

- **Hedgehog**: one big idea, applies it to everything. Narrative, certain, simplifying. TV-friendly, poor forecaster.
- **Fox**: many ideas, eclectic, embraces contradictory evidence, updates. Less charismatic, significantly better calibrated.

### Good Judgment Project (2011-2015)

Tetlock & Mellers in the IARPA Geopolitical Forecasting Tournament. Top 2% emerge as **superforecasters**: Brier ~30% better than the field, beating CIA analysts with access to classified info.

### Superforecaster techniques

1. **Triage**: skip too-easy and too-hard questions; focus on Goldilocks.
2. **Decomposition**: break the prediction into measurable sub-questions (Fermi estimation).
3. **Reference class** (outside view): historical base rates.
4. **Bayesian updating**: small steps proportional to evidence.
5. **Granularity**: 47%, not "50ish".
6. **Aggregation**: team work, median estimates.
7. **Post-mortem**: analyze errors, update methodology.

## 6. Worked example

Three forecasters predict 3 events:

| Event | Outcome | A: p | B: p | C: p |
|---|---|---|---|---|
| 1 | True | 0.7 | 0.5 | 0.9 |
| 2 | False | 0.3 | 0.5 | 0.1 |
| 3 | True | 0.8 | 0.5 | 0.4 |

A's BS: $((0.7-1)^2 + (0.3-0)^2 + (0.8-1)^2)/3 = 0.073$.
B's BS: 0.25 (constant 50% baseline).
C's BS: $((0.9-1)^2 + (0.1-0)^2 + (0.4-1)^2)/3 = 0.127$.

**A wins**, sharp and calibrated. C overconfident on first two, wrong on third.

## 7. Prediction markets

Polymarket, Metaculus, Manifold, PredictIt: buy "shares" paying $1 if event, 0 else. Price = implied probability.

On average, markets beat individual experts and equal top forecasters (Wolfers & Zitzewitz 2004). Advantages: financial incentives → honesty; aggregate distributed info. Limits: thin participation on niche events, legality.

## Exercises

<details>
  <summary>BS for a forecaster always saying 50% on fair coins?</summary>

Each $(0.5 - o)^2 = 0.25$. $\bar{BS} = 0.25$ — baseline. A 80%-biased coin known forecaster: $\bar{BS} \approx 0.16$.
</details>

<details>
  <summary>Forecasting "my team wins the title". Outside vs inside view?</summary>

**Outside**: historically, what % of teams in this position with 10 matches to go win the league? Maybe 20%. With this squad? Coach?

**Inside**: injuries, schedule, recent form.

Superforecaster: start outside (15-20%), then update with inside details. Not the reverse.
</details>

## Summary

- Calibration: say 70% when 70% of similar events occur.
- Brier score (lower better); log score (proper rule); sharpness.
- Murphy: uncertainty + (calibration − resolution).
- Tetlock: experts mediocre, superforecasters ~30% better, foxes > hedgehogs.
- Prediction markets aggregate and beat singles.

## Further reading

- Tetlock, *Expert Political Judgment* (2005).
- Tetlock & Gardner, *Superforecasting* (2015).
- Murphy, *A New Vector Partition of the Probability Score* (1973).
- Silver, *The Signal and the Noise* (2012).
