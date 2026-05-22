---
title: "Formula sheet / cheat sheet"
area: "Reference"
summary: "All formulas, schemes, checklists from the course on a single quick-reference page. Connectives, equivalences, inference rules, Bayes, modal, Toulmin, fallacies, biases, frameworks."
order: 53
level: "intermediate"
prereq: []
tools: []
---

# Formula sheet / cheat sheet

Quick reference. Redundant with the course but compact.

## 1. Propositional connectives

| Symbol | Name | T/T | T/F | F/T | F/F |
|---|---|---|---|---|---|
| $\neg p$ | NOT | F | F | T | T |
| $p \wedge q$ | AND | T | F | F | F |
| $p \vee q$ | OR (incl) | T | T | T | F |
| $p \rightarrow q$ | conditional | T | F | T | T |
| $p \leftrightarrow q$ | biconditional | T | F | F | T |
| $p \oplus q$ | XOR | F | T | T | F |
| $p \uparrow q$ | NAND | F | T | T | T |
| $p \downarrow q$ | NOR | F | F | F | T |

## 2. Fundamental equivalences

- $\neg\neg p \equiv p$
- $p \wedge p \equiv p$; $p \vee p \equiv p$ (idempotence)
- Commutative, associative.
- Distributive: $p \wedge (q \vee r) \equiv (p \wedge q) \vee (p \wedge r)$
- Absorption: $p \wedge (p \vee q) \equiv p$
- De Morgan: $\neg(p \wedge q) \equiv \neg p \vee \neg q$
- Material implication: $p \rightarrow q \equiv \neg p \vee q$
- Contrapositive: $p \rightarrow q \equiv \neg q \rightarrow \neg p$
- Biconditional: $p \leftrightarrow q \equiv (p \rightarrow q) \wedge (q \rightarrow p)$
- Excluded middle / non-contradiction.

## 3. Inference rules

| Sigla | Schema | Name |
|---|---|---|
| MP | $p \rightarrow q, p \vdash q$ | modus ponens |
| MT | $p \rightarrow q, \neg q \vdash \neg p$ | modus tollens |
| HS | $p \rightarrow q, q \rightarrow r \vdash p \rightarrow r$ | hypothetical syllogism |
| DS | $p \vee q, \neg p \vdash q$ | disjunctive syllogism |
| CD | $(p \rightarrow q)(r \rightarrow s), p \vee r \vdash q \vee s$ | constructive dilemma |
| Simp | $p \wedge q \vdash p$ | simplification |
| Conj | $p, q \vdash p \wedge q$ | conjunction |
| Add | $p \vdash p \vee q$ | addition |
| Res | $p \vee q, \neg p \vee r \vdash q \vee r$ | resolution |

## 4. Quantifiers (FOL)

- $\forall x \, P(x)$: for all $x$.
- $\exists x \, P(x)$: there exists $x$.
- $\neg \forall x \, P(x) \equiv \exists x \, \neg P(x)$
- $\neg \exists x \, P(x) \equiv \forall x \, \neg P(x)$
- $\forall x (P \wedge Q) \equiv \forall x P \wedge \forall x Q$
- $\exists x (P \vee Q) \equiv \exists x P \vee \exists x Q$

## 5. Modal logic

| System | $R$ property | Characteristic axiom |
|---|---|---|
| K | any | $\Box(p \rightarrow q) \rightarrow (\Box p \rightarrow \Box q)$ |
| T | reflexive | $\Box p \rightarrow p$ |
| B | refl + symm | $p \rightarrow \Box\Diamond p$ |
| S4 | refl + trans | $\Box p \rightarrow \Box\Box p$ |
| S5 | refl + trans + symm | $\Diamond p \rightarrow \Box\Diamond p$ |

Duality: $\Diamond p \equiv \neg\Box\neg p$.

## 6. Probability

- Axioms: $P \ge 0$, $P(\Omega)=1$, σ-additivity.
- Conditional: $P(A|B) = P(A \cap B)/P(B)$.
- Independence: $P(A \cap B) = P(A)P(B)$.
- Total probability: $P(A) = \sum P(A|B_i)P(B_i)$.
- $\mathbb{E}[X] = \sum x p(x)$ or $\int xf$.
- $\text{Var}(X) = \mathbb{E}[X^2] - \mathbb{E}[X]^2$.
- $\rho_{X,Y} = \text{Cov}/(\sigma_X \sigma_Y)$.

## 7. Bayes' theorem

$$P(A|B) = \frac{P(B|A) P(A)}{P(B)}$$

Multi-hypothesis:
$$P(A_i|B) = \frac{P(B|A_i)P(A_i)}{\sum_j P(B|A_j)P(A_j)}$$

Odds form: **posterior odds = likelihood ratio × prior odds**.

**Medical test example**: rare disease P=0.001, sens 0.99, spec 0.99. $P(D|+) \approx 9\%$.

## 8. Brier score

$$BS = \frac{1}{N} \sum (p_i - o_i)^2$$

Range $[0,1]$, lower better. Constant 0.5 on 50/50 = 0.25.

## 9. Expected utility and prospect theory

- vNM: $\mathbb{E}[u(X)] = \sum p_i u(x_i)$.
- Risk aversion: $u'' < 0$.
- Arrow-Pratt: $r(x) = -u''(x)/u'(x)$.

Prospect theory value:
$$v(x) = \begin{cases} x^{0.88} & x \ge 0 \\ -2.25(-x)^{0.88} & x < 0 \end{cases}$$
$\lambda \approx 2.25$ (loss aversion).

## 10. Toulmin schema

```
DATA   →  CLAIM   (qualifier)
        ▲
      WARRANT
        ▲
      BACKING        REBUTTAL
```

| Component | Role |
|---|---|
| Claim | thesis |
| Data | facts |
| Warrant | link |
| Backing | justifies warrant |
| Qualifier | "probably", "perhaps" |
| Rebuttal | exception conditions |

## 11. Compact fallacy catalog

**Formal**: affirming consequent, denying antecedent, faulty syllogism, undistributed middle, existential.

**Informal — relevance**: ad hominem (abusive/circumst./tu quoque), straw man, red herring, inappropriate authority, ad populum, ad ignorantiam, naturalistic, genetic, whataboutism, false dichotomy, slippery slope, appeal to emotion.

**Informal — presumption**: petitio principii, complex question, hasty generalization, biased sample, post hoc, cum hoc, anecdotal, gambler, base rate, equivocation, amphiboly, composition, division, no true Scotsman, moving the goalposts.

## 12. Compact bias catalog

- **Attention**: confirmation, attentional, availability, survivorship.
- **Memory**: recency, primacy, hindsight, misattribution.
- **Judgment**: representativeness, anchoring, framing, halo, FAE, Dunning-Kruger.
- **Decision**: loss aversion, sunk cost, status quo, endowment, choice overload, default.
- **Social**: in-group, illusion of explanatory depth, IKEA, false consensus, bystander.

## 13. Polya 4 steps

1. Understand.
2. Devise plan.
3. Carry out.
4. Look back.

## 14. SCAMPER

Substitute · Combine · Adapt · Modify · Put to other use · Eliminate · Reverse

## 15. Computational thinking (Wing 2006)

Decomposition · Pattern recognition · Abstraction · Algorithms

## 16. Cynefin (5 domains)

| Domain | Approach |
|---|---|
| Clear | sense → categorize → respond |
| Complicated | sense → analyze → respond |
| Complex | probe → sense → respond |
| Chaotic | act → sense → respond |
| Disorder | discover which domain |

## 17. Meadows — 12 leverage points (summary)

From weakest to strongest:
1. Numerical constants
2. Buffer size
3. Stock-flow structure
4. Delay length
5. Strength of balancing loops
6. Strength of reinforcing loops
7. Information flow structure
8. System rules (incentives, constraints)
9. Self-organize power
10. System goals
11. Originating paradigm
12. Ability to transcend paradigms

## 18. Paul-Elder intellectual standards

Clarity · Accuracy · Precision · Relevance · Depth · Breadth · Logic · Significance · Fairness

## 19. SIFT (news literacy)

**S**top · **I**nvestigate the source · **F**ind better coverage · **T**race the original

## 20. BATNA / ZOPA

**BATNA** = Best Alternative To Negotiated Agreement.
**ZOPA** = Zone Of Possible Agreement.

## 21. OODA, PDCA, DMAIC

- **OODA** (Boyd): Observe → Orient → Decide → Act.
- **PDCA** (Deming): Plan → Do → Check → Act.
- **DMAIC** (Six Sigma): Define → Measure → Analyze → Improve → Control.

## 22. Pearl: do-calculus (summary)

- Level 1: $P(Y|X)$ — association.
- Level 2: $P(Y|do(X))$ — intervention.
- Level 3: $P(Y_x | Y'=y')$ — counterfactual.

Backdoor: $P(Y|do(X)) = \sum_z P(Y|X, Z) P(Z)$ for $Z$ blocking all backdoor paths.

## 23. Top mental models

First principles · Inversion · Second-order · Opportunity cost · Margin of safety · Hanlon's razor · Occam · Circle of competence · Chesterton's fence · Regression to mean.

## 24. Game theory — canonical matrices

Prisoner's dilemma:
| | Silent | Confess |
|---|---|---|
| **Silent** | -1, -1 | -10, 0 |
| **Confess** | 0, -10 | -5, -5 |

Dominant equilibrium (suboptimal): both confess.

Tit-for-tat: cooperate first; then copy opponent's last move.

## 25. Virtuous epistemic acts

- Suspend judgment when evidence lacks.
- Actively seek counter-evidence.
- Calibrate confidence to evidence strength.
- Make your assumptions explicit.
- Update gradually.
- Anticipate strongest counter.

## 26. Formulas you'd bring to a desert island

1. Bayes: $P(A|B) = P(B|A)P(A)/P(B)$.
2. Modus ponens / tollens.
3. De Morgan: $\neg(A \wedge B) \equiv \neg A \vee \neg B$.
4. Expectation: $\mathbb{E}[X] = \sum xp(x)$.
5. Likelihood ratio odds update.
6. Loss aversion $\lambda \approx 2.25$.
7. Toulmin: claim/data/warrant.
8. Cynefin (which type of problem am I in).
9. SIFT (news literacy in 30 seconds).
10. Polya 4 steps (for any new problem).
