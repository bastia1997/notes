---
title: "Temporal, deontic, epistemic logics"
area: "Philosophical Logic"
summary: "When 'necessarily' becomes 'always', 'obligatory', or 'a knows that': three modal families with concrete applications to verification, ethics, and knowledge."
order: 17
level: "advanced"
prereq:
  - "Have read [Modal logic](16-modal-logic.html)"
tools: []
---

# Temporal, deontic, epistemic logics

Modal logic is a chassis. Mounting different interpretations of "necessarily" and "accessibility" gives different families with different applications.

## 1. Temporal logic

Replace possible worlds with time instants. $R$ = "comes after".

**LTL operators** (Prior 1957, Pnueli 1977):

- $G\varphi$ ("globally"): $\varphi$ holds at all future instants.
- $F\varphi$ ("finally"): $\varphi$ holds at some future instant.
- $X\varphi$ ("next"): $\varphi$ holds at the next instant.
- $\varphi U \psi$ ("until"): $\varphi$ holds until $\psi$ becomes true.

**CTL** adds quantifiers over branches of a time tree: $A$ (all futures), $E$ (some future). $AG\varphi, EF\varphi$, etc.

### 1.1 Model checking

Industrial applications: verifying hardware/software:

- $G \neg \text{deadlock}$ — safety.
- $G(\text{request} \rightarrow F\,\text{response})$ — liveness.
- $GF\,\text{access}$ — fairness.

Tools: SPIN, NuSMV, TLA+. Have found critical bugs in protocols, CPU microcode, aerospace control.

## 2. Deontic logic

Operators (von Wright 1951):

- $O\varphi$: obligatory.
- $P\varphi$: permitted.
- $F\varphi$: forbidden ($\equiv O\neg\varphi$).

Accessibility = "deontically ideal worlds": those where all obligations are fulfilled.

### 2.1 Paradoxes

**Ross's paradox**: $Op$ entails $O(p \vee q)$ by modal addition. But "obligatory to mail the letter" doesn't entail "obligatory to mail-or-burn it". Naive deontic logic doesn't work.

**Chisholm's paradox** (1963): "John ought to help. If he helps, he ought to announce. If he doesn't help, he ought not to announce. He doesn't help." Standard deontic logic derives contradictory formulas. Solutions: contrary-to-duty obligations, conditional obligations, dyadic deontic logic.

### 2.2 Uses

- Formal specification of policy and law (e.g. GDPR compliance).
- AI ethics: making systems respect rules.
- Formal moral philosophy.

## 3. Epistemic logic

"$K_a \varphi$" = "agent $a$ knows that $\varphi$". Hintikka, *Knowledge and Belief* (1962).

### 3.1 Axioms

- **K**: $K_a(\varphi \rightarrow \psi) \rightarrow (K_a\varphi \rightarrow K_a\psi)$ — logical closure.
- **T**: $K_a\varphi \rightarrow \varphi$ — knowledge implies truth.
- **4**: $K_a\varphi \rightarrow K_aK_a\varphi$ — positive introspection.
- **5**: $\neg K_a\varphi \rightarrow K_a\neg K_a\varphi$ — negative introspection (controversial).

Standard system: **S5** for idealized rational agents.

### 3.2 Multi-agent

- **Distributed knowledge** $D\varphi$: pooled, all agents combined would know.
- **Common knowledge** $C\varphi$: everyone knows, everyone knows everyone knows, ad infinitum.

Common knowledge is crucial for coordination: the **Coordinated Attack Problem** (Halpern & Moses 1990) — without common knowledge, two armies on an unreliable channel can never coordinate, a foundational result for distributed systems.

### 3.3 Three wise men with hats

Three sages, each with white or black hat. At least one is black. Each sees only the other two. Sequentially asked "do you know your color?" When the first says "yes", we can determine the configuration. The problem is solved by epistemic reasoning over rounds — each "no" adds common knowledge.

### 3.4 Knowledge vs belief

For **belief** ($B_a$), drop T: you can believe falsehoods. Keep D: $B_a\varphi \rightarrow \neg B_a\neg\varphi$ (consistency).

## 4. Comparison

| Logic | Operator | "Necessarily" means | Standard system |
|---|---|---|---|
| Aletic | $\Box$ | in every possible world | S5 |
| Temporal | $G, F, X, U$ | at every (future) instant | LTL/CTL |
| Deontic | $O, P, F$ | in every deontically ideal world | KD |
| Epistemic | $K_a, B_a$ | in every world compatible with $a$'s knowledge | S5 / KD45 |
| Dynamic | $[a], \langle a \rangle$ | after executing action $a$ | PDL |

## Exercises

<details>
  <summary>LTL: every request gets a response while server stays up.</summary>

$G(\text{request} \rightarrow (\neg\text{shutdown}\,U\,\text{response}))$.
</details>

<details>
  <summary>Why is $Op \rightarrow p$ not desirable in deontic logic?</summary>

If "obligatory $p$" guaranteed "$p$ true", obligations could never be violated. Real obligations are violable. Deontic logic uses KD, not KT.
</details>

## Summary

- LTL/CTL formalize "always", "eventually", "until" — foundation of model checking.
- Deontic: $O, P, F$. Paradoxes (Ross, Chisholm) push toward richer systems.
- Epistemic: $K_a$, distributed $D$, common $C$. Common knowledge is the coordination boundary.
- All built on Kripke semantics with different readings of worlds and accessibility.

## Further reading

- Prior, *Time and Modality* (1957).
- Hintikka, *Knowledge and Belief* (1962).
- Halpern, Moses, Vardi, *Reasoning About Knowledge* (1995).
- Clarke, Grumberg, Peled, *Model Checking* (1999).
