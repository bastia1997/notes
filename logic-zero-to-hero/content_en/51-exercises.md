---
title: "Full exercise book with solutions"
area: "Reference"
summary: "Thirty exercises covering propositional logic, fallacies, Bayes, problem solving, paradoxes, argumentation, epistemology, science, causality. Solutions hidden in &lt;details&gt;."
order: 51
level: "intermediate"
prereq: []
tools:
  - "Paper and pen"
---

# Full exercise book with solutions

Thirty exercises across the course. Solve before revealing solution.

## A — Propositional logic and inference

### 1. Truth table

Build the truth table of $(p \rightarrow q) \rightarrow ((q \rightarrow r) \rightarrow (p \rightarrow r))$. Is it a tautology?

<details><summary>Solution</summary>

8 rows. All true. Tautology — form of hypothetical syllogism as implication.
</details>

### 2. Equivalence

Show $(p \rightarrow q) \wedge (p \rightarrow r) \equiv p \rightarrow (q \wedge r)$.

<details><summary>Solution</summary>

$(\neg p \vee q) \wedge (\neg p \vee r) \equiv \neg p \vee (q \wedge r) \equiv p \rightarrow (q \wedge r)$.
</details>

### 3. CNF conversion

Convert $\neg(p \rightarrow (q \vee \neg r))$ to CNF.

<details><summary>Solution</summary>

$\equiv \neg(\neg p \vee q \vee \neg r) \equiv p \wedge \neg q \wedge r$. Three unit clauses.
</details>

### 4. Structured proof

From $p \rightarrow q$, $r \rightarrow \neg q$, $p$, derive $\neg r$.

<details><summary>Solution</summary>

1. $p \rightarrow q$ (P)
2. $r \rightarrow \neg q$ (P)
3. $p$ (P)
4. $q$ (MP 1, 3)
5. $\neg\neg q$ (DN 4)
6. $\neg r$ (MT 2, 5)
</details>

### 5. Valid or fallacy?

"If it rains the street is wet. The street is wet. Therefore it rained."

<details><summary>Solution</summary>

**Affirming the consequent** — invalid. Could be a cleaning truck.
</details>

### 6. FOL translation

"Every student loves at least one teacher". $S(x)$ = student, $T(x)$ = teacher, $L(x,y)$ = $x$ loves $y$.

<details><summary>Solution</summary>

$\forall x (S(x) \rightarrow \exists y (T(y) \wedge L(x,y)))$.
</details>

## B — Fallacies

### 7

"You can't criticize the army — you've never served."

<details><summary>Solution</summary>

**Ad hominem circumstantial / tu quoque**. Validity of criticism doesn't depend on having served.
</details>

### 8

"Working more hours raises your salary. You want more salary. So you must work more hours."

<details><summary>Solution</summary>

**False dichotomy / undervalued alternatives**: ignores changing jobs, renegotiating, training.
</details>

### 9

"If we allow same-sex marriage, soon we'll allow polygamy, incest, animal marriage."

<details><summary>Solution</summary>

**Slippery slope** without causal mechanism.
</details>

### 10

"Prof. Rossi, Nobel in physics, says climate change is a hoax. So it is."

<details><summary>Solution</summary>

**Appeal to inappropriate authority**. Nobel in physics doesn't imply expertise in climatology. Topic has scientific consensus in climate journals.
</details>

## C — Probability and Bayes

### 11. Medical test variant

Disease prevalence 1%. Sensitivity 95%, specificity 90%. P(disease | positive)?

<details><summary>Solution</summary>

$P(+) = 0.95 \cdot 0.01 + 0.10 \cdot 0.99 = 0.1085$. $P(D|+) = 0.0095/0.1085 ≈ 8.76\%$.
</details>

### 12. Two positive tests

Same scenario, two independent positives. Probability?

<details><summary>Solution</summary>

After first: $P(D) ≈ 0.0876$. LR = 9.5. Prior odds = 0.096. Posterior odds = 0.912. P ≈ 47.7%.
</details>

### 13. 100-door Monty Hall

100 doors, 1 car. Pick one. Monty opens 98 (all goats). Switch?

<details><summary>Solution</summary>

Initial P(car) = 1/100. P(remaining unopened = car) = 99/100. **Always switch**.
</details>

### 14. Simpson's paradox

University: men 50% admission, women 30%. Per department: A — M 70%, F 75%. B — M 20%, F 25%. Explain.

<details><summary>Solution</summary>

Women apply more to harder dept B. Aggregating loses causal info. Per-department, women are admitted at higher rates.
</details>

### 15. Linda

Linda is 31, single, brilliant, feminist activist. More probable? (a) Linda is a bank teller. (b) Linda is a bank teller AND feminist activist.

<details><summary>Solution</summary>

(a). $P(A \wedge B) \le P(A)$. **Conjunction fallacy** + representativeness.
</details>

## D — Problem solving

### 16. Weights and balance

8 balls, all equal except one heavier. With a balance, minimum weighings to find it?

<details><summary>Solution</summary>

**2 weighings**. Split 3-3-2. Weigh 3 vs 3. If equal → heavier is in pair (1 vs 1). If unbalanced → heavier in trio (1 vs 1).
</details>

### 17. 17 camels

Father wills 17 camels: 1/2 to first son, 1/3 to second, 1/9 to third. Split without cutting camels.

<details><summary>Solution</summary>

Add an 18th (lent). 18/2=9, 18/3=6, 18/9=2. Total 17. 18th returns. ($1/2+1/3+1/9 = 17/18$, the will is underspecified.)
</details>

### 18. Light bulbs

Three switches in one room control three bulbs in another. Enter only once. How?

<details><summary>Solution</summary>

Turn A on 10 min. Off. Turn B on. Enter. Lit = B. Off + warm = A. Off + cold = C. Uses heat as extra channel.
</details>

### 19. Gauss sum

Prove $1 + 2 + \ldots + n = n(n+1)/2$ by induction.

<details><summary>Solution</summary>

Base $n=1$: $1 = 1 \cdot 2/2$ ✓.
Step: $n(n+1)/2 + (n+1) = (n+1)(n/2+1) = (n+1)(n+2)/2$ ✓.
</details>

## E — Argumentation

### 20. Toulmin

Map: "Italy should grant ius scholae citizenship because youths born and raised here are de facto Italian."

<details><summary>Solution</summary>

- Claim: ius scholae.
- Data: born and raised in Italy.
- Warrant: de facto Italianness ⇒ legal citizenship.
- Backing: equity, integration principles.
- Missing rebuttal: sovereignty, EU context, specific parameters.
</details>

### 21. Steelman

Steelman: "Generative AI should be banned."

<details><summary>Solution</summary>

Steel: unregulated GenAI replaces intellectual work, accelerates disinformation (deepfakes), concentrates power in few US/CN companies without democratic control, and systems aren't understood even by creators (alignment). Preventive ban like with human cloning would be legitimate until safe standards.

Weak points to address: massive benefits (medicine, research); ban shifts research elsewhere; total ban likely unenforceable. Serious response must discuss **targeted regulation**, not deny the problem.
</details>

### 22. Prisoner's dilemma

Build payoff matrix for "two companies deciding whether to use deceptive advertising" and analyze.

<details><summary>Solution</summary>

| | Other honest | Other deceptive |
|---|---|---|
| **You honest** | 5, 5 | 2, 8 |
| **You deceptive** | 8, 2 | 3, 3 |

Dominant: deceptive. Nash equilibrium: (3,3) — worse than (5,5). Solutions: regulation, long-term reputation (repeated game), industry agreements.
</details>

## F — Paradoxes

### 23. Birthday

How many people to push P(common birthday) > 0.99?

<details><summary>Solution</summary>

Numerically, $n = 57$ gives ~0.99.
</details>

### 24. Russell's paradox

$R = \{x : x \notin x\}$. Show contradiction.

<details><summary>Solution</summary>

If $R \in R$ → by def $R \notin R$. If $R \notin R$ → by def $R \in R$. Contradiction. Led to ZFC.
</details>

### 25. Sorites

10000 grains = heap. Take one away, still heap? Yes. Iterate. Paradox?

<details><summary>Solution</summary>

Premise 1: 10000 grains = heap. Premise 2 (induction step): if $n$ = heap, $n-1$ = heap. By induction: 1 grain = heap, 0 = heap. Absurd.

Solutions: vague predicates lack bivalence; fuzzy logic; contextualism.
</details>

## G — Epistemology and science

### 26. Gettier

Build a Gettier case: JTB but not knowledge.

<details><summary>Solution</summary>

Maria hears on radio "9:00 train arrives". Believes it. Justified. By coincidence the train arrives at 9:00 (but the news was old, train was 15 min late — happens to coincide). JTB but not knowledge.
</details>

### 27. Popper

Homeopathy diluted past Avogadro (30C) has curative effects beyond placebo. Falsifiable? Test?

<details><summary>Solution</summary>

Yes, falsifiable. RCT double-blind. Tested (Linde 1997, Shang 2005): effect vanishes with proper blinding and sample size. Empirically falsified.
</details>

## H — Complex systems

### 28. Cynefin

Classify: (a) make coffee with moka, (b) design a Mars rocket, (c) reduce school bullying.

<details><summary>Solution</summary>

(a) Clear (obvious procedure).
(b) Complicated (expert analysis, soluble a priori).
(c) Complex (emergent, multiple actors, value tensions).
</details>

## I — Causality

### 29. DAG

Smoking and lung cancer correlate. Causation? Possible confounder DAG?

<details><summary>Solution</summary>

Pearl: gene $G \to F$ (smoking), $G \to C$ (cancer). Possible confounder. RCT impossible ethically. Twin studies, natural experiments (tax shocks), Mendelian randomization: evidence converges that smoking *causes* cancer beyond gene effect.
</details>

### 30. Frontdoor

$X \to M \to Y$ with unobserved confounder $U$ on $X$ and $Y$. $M$ observable, not caused by $U$. How to estimate $P(Y|do(X))$?

<details><summary>Solution</summary>

Frontdoor (Pearl 1995): $P(Y|do(X)) = \sum_m P(M=m|X) \sum_{x'} P(Y|M=m, X=x') P(X=x')$.
</details>

## Summary

- 30 exercises across 8 areas.
- Solve manually before reading solutions.
- Each links to a course section — return there if stuck.

## Further reading

- Smullyan, *What Is the Name of This Book?*
- Engel, *Problem-Solving Strategies* (1998).
- Mosteller, *Fifty Challenging Problems in Probability*.
