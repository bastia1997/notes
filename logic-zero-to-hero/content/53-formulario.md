---
title: "Formulario / scheda riassuntiva"
area: "Reference"
summary: "Tutte le formule, schemi, checklist del corso in una pagina di consultazione rapida. Connettivi, equivalenze, regole di inferenza, Bayes, modali, Toulmin, fallacie, bias, framework."
order: 53
level: "intermedio"
prereq: []
tools: []
---

# Formulario / scheda riassuntiva

Pagina di consultazione rapida. Tutto è ridondante rispetto al corso, ma compatto.

## 1. Connettivi proposizionali

| Simbolo | Nome | $p,q$ V/V | V/F | F/V | F/F |
|---|---|---|---|---|---|
| $\neg p$ | negazione | F | F | V | V |
| $p \wedge q$ | AND | V | F | F | F |
| $p \vee q$ | OR (incl.) | V | V | V | F |
| $p \rightarrow q$ | implicazione | V | F | V | V |
| $p \leftrightarrow q$ | biconcizionale | V | F | F | V |
| $p \oplus q$ | XOR | F | V | V | F |
| $p \uparrow q$ | NAND | F | V | V | V |
| $p \downarrow q$ | NOR | F | F | F | V |

## 2. Equivalenze fondamentali

- $\neg \neg p \equiv p$
- $p \wedge p \equiv p$, $p \vee p \equiv p$ (idempotenza)
- $p \wedge q \equiv q \wedge p$, $p \vee q \equiv q \vee p$ (commutativa)
- $(p \wedge q) \wedge r \equiv p \wedge (q \wedge r)$ (associativa)
- $p \wedge (q \vee r) \equiv (p \wedge q) \vee (p \wedge r)$ (distributiva)
- $p \vee (q \wedge r) \equiv (p \vee q) \wedge (p \vee r)$
- $p \wedge (p \vee q) \equiv p$ (assorbimento)
- $\neg (p \wedge q) \equiv \neg p \vee \neg q$ (De Morgan)
- $\neg (p \vee q) \equiv \neg p \wedge \neg q$
- $p \rightarrow q \equiv \neg p \vee q$ (implicazione materiale)
- $p \rightarrow q \equiv \neg q \rightarrow \neg p$ (contropositiva)
- $p \leftrightarrow q \equiv (p \rightarrow q) \wedge (q \rightarrow p)$
- $p \vee \neg p \equiv \top$ (terzo escluso)
- $p \wedge \neg p \equiv \bot$ (non-contraddizione)

## 3. Regole di inferenza

| Sigla | Schema | Nome |
|---|---|---|
| MP | $p \rightarrow q, p \vdash q$ | modus ponens |
| MT | $p \rightarrow q, \neg q \vdash \neg p$ | modus tollens |
| HS | $p \rightarrow q, q \rightarrow r \vdash p \rightarrow r$ | sillogismo ipotetico |
| DS | $p \vee q, \neg p \vdash q$ | sillogismo disgiuntivo |
| CD | $(p \rightarrow q)(r \rightarrow s), p \vee r \vdash q \vee s$ | dilemma costruttivo |
| Simp | $p \wedge q \vdash p$ | semplificazione |
| Conj | $p, q \vdash p \wedge q$ | congiunzione |
| Add | $p \vdash p \vee q$ | addizione |
| Res | $p \vee q, \neg p \vee r \vdash q \vee r$ | risoluzione |

## 4. Quantificatori (FOL)

- $\forall x \, P(x)$: per ogni $x$, $P(x)$.
- $\exists x \, P(x)$: esiste un $x$ tale che $P(x)$.
- $\neg \forall x \, P(x) \equiv \exists x \, \neg P(x)$
- $\neg \exists x \, P(x) \equiv \forall x \, \neg P(x)$
- $\forall x (P(x) \wedge Q(x)) \equiv \forall x P(x) \wedge \forall x Q(x)$
- $\exists x (P(x) \vee Q(x)) \equiv \exists x P(x) \vee \exists x Q(x)$

## 5. Logica modale (sistemi base)

| Sistema | Relazione $R$ | Assioma caratteristico |
|---|---|---|
| K | qualsiasi | $\Box(p \rightarrow q) \rightarrow (\Box p \rightarrow \Box q)$ |
| T | riflessiva | $\Box p \rightarrow p$ |
| B | rifl. + simmetrica | $p \rightarrow \Box \Diamond p$ |
| S4 | rifl. + transitiva | $\Box p \rightarrow \Box \Box p$ |
| S5 | rifl. + trans. + simm. | $\Diamond p \rightarrow \Box \Diamond p$ |

Dualità: $\Diamond p \equiv \neg \Box \neg p$.

## 6. Probabilità

- Assiomi: $P(A) \ge 0$, $P(\Omega) = 1$, σ-additività.
- Condizionale: $P(A|B) = P(A \cap B)/P(B)$.
- Indipendenza: $P(A \cap B) = P(A)P(B)$.
- Probabilità totale: $P(A) = \sum_i P(A|B_i)P(B_i)$.
- $\mathbb{E}[X] = \sum_x x \cdot p(x)$ o $\int x f(x)dx$.
- $\text{Var}(X) = \mathbb{E}[X^2] - \mathbb{E}[X]^2$.
- $\rho_{X,Y} = \text{Cov}(X,Y)/(\sigma_X \sigma_Y)$.

## 7. Teorema di Bayes

$$P(A|B) = \frac{P(B|A) P(A)}{P(B)}$$

Forma multi-ipotesi:
$$P(A_i|B) = \frac{P(B|A_i)P(A_i)}{\sum_j P(B|A_j)P(A_j)}$$

Forma odds:
$$\text{posterior odds} = \text{likelihood ratio} \times \text{prior odds}$$

**Esempio test medico**: malattia rara $P=0.001$, sens. 0.99, spec. 0.99. $P(M|+) = 0.99 \cdot 0.001 / (0.99 \cdot 0.001 + 0.01 \cdot 0.999) \approx 9\%$.

## 8. Brier score

$$BS = \frac{1}{N}\sum (p_i - o_i)^2$$

Range $[0,1]$, più basso meglio. Costantemente 0.5 su 50/50 = 0.25.

## 9. Utilità attesa e prospect theory

- vNM: $\mathbb{E}[u(X)] = \sum p_i u(x_i)$.
- Avversione al rischio: $u'' < 0$ (concava).
- Misura Arrow-Pratt: $r(x) = -u''(x)/u'(x)$.

Prospect theory:
$$v(x) = \begin{cases} x^{0.88} & x \ge 0 \\ -2.25 (-x)^{0.88} & x < 0 \end{cases}$$
$\lambda \approx 2.25$ (loss aversion coefficient).

## 10. Toulmin schema

```
DATA   ──> CLAIM    (qualifier)
        ▲
        │
      WARRANT
        ▲
        │
      BACKING        REBUTTAL
```

| Componente | Ruolo |
|---|---|
| Claim | la tesi |
| Data | i fatti |
| Warrant | il legame |
| Backing | giustifica il warrant |
| Qualifier | "forse", "probabilmente" |
| Rebuttal | condizioni di eccezione |

## 11. Catalogo fallacie compatto

**Formali**: affermazione del conseguente, negazione dell'antecedente, sillogismo categorico errato, undistributed middle, fallacia esistenziale.

**Informali — rilevanza**: ad hominem (abusivo / circumst. / tu quoque), straw man, red herring, autorità impropria, ad populum, ad ignorantiam, naturalistic fallacy, genetic fallacy, whataboutism, false dichotomy, slippery slope, appeal to emotion.

**Informali — presunzione**: petitio principii, complex question, hasty generalization, biased sample, post hoc, cum hoc, anecdotal evidence, gambler's fallacy, base rate fallacy, equivocation, amphiboly, composition, division, no true Scotsman, moving the goalposts.

## 12. Catalogo bias compatto

- **Attenzione**: confirmation, attentional, availability, survivorship.
- **Memoria**: recency, primacy, hindsight, misattribution.
- **Giudizio**: representativeness, anchoring, framing, halo, FAE, Dunning-Kruger.
- **Decisione**: loss aversion, sunk cost, status quo, endowment, choice overload, default effect.
- **Sociale**: in-group, illusion of explanatory depth, IKEA effect, false consensus, bystander.

## 13. Polya (4 step)

1. Comprendere il problema.
2. Concepire un piano.
3. Eseguire il piano.
4. Rivedere la soluzione.

## 14. SCAMPER (pensiero creativo)

Substitute • Combine • Adapt • Modify • Put to other use • Eliminate • Reverse

## 15. Pensiero computazionale (Wing 2006)

Decomposizione · Pattern recognition · Astrazione · Algoritmi

## 16. Cynefin (5 domini)

| Dominio | Approccio |
|---|---|
| Clear | sense → categorize → respond |
| Complicated | sense → analyze → respond |
| Complex | probe → sense → respond |
| Chaotic | act → sense → respond |
| Disorder | scoprire in che dominio si è |

## 17. Meadows — 12 leverage points (sintesi)

Dal più debole al più forte:
1. Costanti, parametri, numeri
2. Dimensione di stock-buffer
3. Struttura degli stock-flussi
4. Lunghezza dei delay
5. Forza dei loop di bilanciamento
6. Forza dei loop di rinforzo
7. Struttura del flusso di info
8. Regole del sistema (incentivi, vincoli)
9. Potere di self-organize
10. Goal del sistema
11. Paradigma da cui nasce il sistema
12. Capacità di cambiare paradigma

## 18. Standard intellettuali Paul-Elder

Chiarezza · Accuratezza · Precisione · Rilevanza · Profondità · Ampiezza · Logicità · Significatività · Equità

## 19. SIFT (news literacy)

**S**top · **I**nvestigate the source · **F**ind better coverage · **T**race the original

## 20. BATNA / ZOPA

**BATNA** = Best Alternative To a Negotiated Agreement (la tua forza).
**ZOPA** = Zone Of Possible Agreement (range in cui esiste accordo).

## 21. OODA, PDCA, DMAIC (cicli operativi)

- **OODA** (Boyd): Observe → Orient → Decide → Act.
- **PDCA** (Deming): Plan → Do → Check → Act.
- **DMAIC** (Six Sigma): Define → Measure → Analyze → Improve → Control.

## 22. Pearl: do-calculus (sintesi)

- **Livello 1**: $P(Y|X)$ — associazione.
- **Livello 2**: $P(Y|do(X))$ — intervento.
- **Livello 3**: $P(Y_x|Y'=y')$ — controfattuale.

Regola 1 (inserzione/cancellazione di osservazioni): se $Z$ irrilevante data una struttura, indifferente includerla.
Regola 2 (action ↔ observation): in certe condizioni $do(X) \equiv X$ condizionato.
Regola 3 (inserzione/cancellazione di azioni): se l'azione non altera la distribuzione, eliminabile.

Backdoor: $P(Y|do(X)) = \sum_z P(Y|X,Z) P(Z)$ per $Z$ che blocca tutti i backdoor.

## 23. Mental models (top 10)

First principles · Inversion · Second-order thinking · Opportunity cost · Margin of safety · Hanlon's razor · Occam's razor · Circle of competence · Chesterton's fence · Regression to the mean.

## 24. Game theory: matrici canoniche

Dilemma del prigioniero:
| | Tace | Confessa |
|---|---|---|
| **Tace** | -1, -1 | -10, 0 |
| **Confessa** | 0, -10 | -5, -5 |

Equilibrio dominante (sub-ottimo): entrambi confessano.

Tit-for-tat: coopera al primo turno, poi fai ciò che l'altro ha fatto al turno precedente.

## 25. Insieme degli "atti epistemici" virtuosi

- Sospendi il giudizio in assenza di evidenza.
- Cerca evidenza contraria attivamente.
- Calibra confidenza alla forza dell'evidenza.
- Rendi esplicite le tue assunzioni.
- Aggiorna gradualmente.
- Anticipa l'obiezione più forte.

## 26. Le formule che ti porteresti in un'isola deserta

1. Bayes: $P(A|B) = P(B|A)P(A)/P(B)$.
2. Modus ponens / tollens.
3. De Morgan: $\neg(A \wedge B) \equiv \neg A \vee \neg B$.
4. Aspettativa: $\mathbb{E}[X] = \sum x p(x)$.
5. Likelihood ratio aggiornamento odds.
6. Loss aversion $\lambda \approx 2.25$.
7. Toulmin: claim/data/warrant.
8. Cynefin (in che tipo di problema sono).
9. SIFT (news literacy in 30 secondi).
10. Polya 4-step (per qualsiasi problema nuovo).
