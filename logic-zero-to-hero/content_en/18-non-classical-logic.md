---
title: "Non-classical logics: intuitionistic, fuzzy, paraconsistent"
area: "Philosophical Logic"
summary: "Drop excluded middle (intuitionistic), allow intermediate values (fuzzy), tolerate contradictions (paraconsistent). One classical-logic assumption challenged at a time."
order: 18
level: "expert"
prereq:
  - "Have read [Propositional logic](07-propositional-logic.html)"
tools: []
---

# Non-classical logics: intuitionistic, fuzzy, paraconsistent

Classical logic assumes: bivalence (every proposition is true or false), excluded middle ($p \vee \neg p$ holds always), and *ex contradictione quodlibet* (a contradiction entails everything). Relaxing each gives a whole family of logics.

## 1. Intuitionistic logic

Origin: Brouwer's constructive math (1907), Heyting's formalization (1930). Intuition: a proposition is true *only if you can construct a proof*. No "truth out there" independent of proof.

### 1.1 What changes

**Excluded middle $p \vee \neg p$ is NOT a theorem.** To have it, you'd need to exhibit either a proof of $p$ or of $\neg p$. For open problems (Riemann hypothesis, Goldbach), you have neither.

**Double negation doesn't collapse**: $\neg\neg p \not\equiv p$ in general. $p \rightarrow \neg\neg p$ holds, but not the converse.

**BHK semantics**:

- Proof of $p \wedge q$ = pair (proof $p$, proof $q$).
- Proof of $p \vee q$ = tag + proof of tagged side.
- Proof of $p \rightarrow q$ = function from proofs of $p$ to proofs of $q$.
- Proof of $\neg p$ = function from proofs of $p$ to a contradiction.

Computational reading: **Curry-Howard correspondence** (sec. 19). Intuitionistic proofs ARE typed programs.

### 1.2 Models

- **Kripke models** (monotonic): $w \models p$ implies $w' \models p$ for $wRw'$. "Growing knowledge".
- **Topologies**: $p$ true ↔ open set.
- **Typed lambda calculus**: programs.

## 2. Fuzzy logic (Zadeh 1965)

Truth value lives in $[0,1]$.

Standard t-norm/t-conorm operators:

- AND (min): $v(p \wedge q) = \min(v(p), v(q))$. Variant product: $v(p) \cdot v(q)$.
- OR (max): $v(p \vee q) = \max(v(p), v(q))$.
- NOT: $v(\neg p) = 1 - v(p)$.

### 2.1 Applied example: washing machine control

Linguistic variables: "load = heavy", "clothes = dirty", "time = long".

Rules: IF (load heavy) AND (clothes very dirty) THEN time long.

Membership functions convert physical measures to $[0,1]$ degrees. A fuzzy controller combines rules and *defuzzifies* to produce concrete minutes. Used in ABS, climate controllers, cameras, Sendai metro since 1987.

### 2.2 Caveat

Probability and fuzziness are NOT the same. "70% probability" and "0.7 truth" mean different things. Probability is about *epistemic uncertainty*; fuzziness about *intrinsic vagueness*. "Tall" is vague, not uncertain.

## 3. Paraconsistent logics

Classical logic's weakness: *ex contradictione quodlibet* (ECQ). A single contradiction destroys the system. Unacceptable in practice — real databases, encyclopedias, laws contain inconsistencies.

**Paraconsistent logics** (Newton da Costa 1963; Graham Priest 1979) reject ECQ. $p$ and $\neg p$ can coexist without trivializing.

Example: da Costa's system $C_1$; Priest's LP (Logic of Paradox) with three values {true, false, both}.

### 3.1 Applications

- **Inconsistent databases**: query a DB with contradictory records.
- **Philosophy of change**: liar paradox can be "true and false" without explosion.
- **AI commonsense**: catalog contradictory beliefs without immediate resolution.

### 3.2 Dialetheism

Priest's radical view: some genuine contradictions are true. The liar sentence is both true and false. Highly controversial.

## 4. Many-valued logics

Łukasiewicz (1920) adds a third value $\frac{1}{2}$ ("indeterminate"). Useful for Aristotelian future contingents ("Will there be a sea battle tomorrow?").

## 5. Linear logic (Girard 1987)

Treats hypotheses as **resources to consume**, not truths to reuse. $p, p \vdash p \wedge p$ holds only with two "copies" of $p$. Uses: memory management, concurrency, transactions. Fine-grained connectives: tensor $\otimes$ vs $\&$, plus $\oplus$ vs par $⅋$.

## 6. Comparison

| Logic | What it drops | Used in |
|---|---|---|
| Classical | nothing | standard math |
| Intuitionistic | excluded middle, double-neg | constructive math, type theory, Coq/Agda |
| Fuzzy | bivalence | industrial control, AI vagueness |
| Paraconsistent | ECQ | inconsistent DB, philosophy |
| Many-valued | bivalence | future-contingent semantics |
| Linear | contraction/weakening | concurrency, transactions |

## Exercises

<details>
  <summary>In intuitionism, $\neg\neg(p \vee \neg p)$ is provable but $p \vee \neg p$ is not. Why?</summary>

Assume $\neg(p \vee \neg p)$. From it, contradict. So $\neg\neg(p \vee \neg p)$ holds. But to prove $p \vee \neg p$ directly, BHK requires exhibiting either a proof of $p$ or of $\neg p$ — generally not constructible.
</details>

<details>
  <summary>Compute $v((p \wedge q) \vee \neg q)$ in fuzzy with $v(p)=0.7, v(q)=0.4$, using min/max/1−.</summary>

$v(p \wedge q) = 0.4$. $v(\neg q) = 0.6$. $v((p \wedge q) \vee \neg q) = \max(0.4, 0.6) = 0.6$.
</details>

## Summary

- Intuitionistic: constructive, no excluded middle, deep ties to computation.
- Fuzzy: $[0,1]$, AND=min OR=max. For vagueness, not uncertainty.
- Paraconsistent: tolerates contradiction. Useful for messy real data.
- Many-valued, linear: extensions for specific needs.
- Right logic depends on what you model.

## Further reading

- Heyting, *Intuitionism: An Introduction* (1956).
- Zadeh, *Fuzzy Sets*, Info & Control (1965).
- Priest, *In Contradiction* (1987).
- Girard, *Linear Logic*, TCS (1987).
