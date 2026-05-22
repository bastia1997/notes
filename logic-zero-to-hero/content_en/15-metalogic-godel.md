---
title: "Metalogic: soundness, completeness, Gödel's theorems"
area: "Metalogic"
summary: "Logic studied from the outside: when do derivations match truth (soundness, completeness)? Decidability. Gödel's incompleteness theorems and their philosophical fallout."
order: 15
level: "expert"
prereq:
  - "Have read [Predicate logic semantics](13-predicate-logic-semantics.html)"
  - "Have read [Sets, relations, functions](14-sets-relations-functions.html)"
tools: []
---

# Metalogic: soundness, completeness, Gödel's theorems

Metalogic studies logical systems *from the outside*: when do the syntactic rules of derivation match the semantic notion of truth?

## 1. Soundness and completeness

Notation: $\vdash$ for *provable* (syntactic), $\models$ for *valid* (semantic).

- **Soundness**: $\Gamma \vdash \varphi \Rightarrow \Gamma \models \varphi$. Every derivation produces something true.
- **Completeness**: $\Gamma \models \varphi \Rightarrow \Gamma \vdash \varphi$. Every truth has a derivation.

A sound but incomplete system misses truths. An unsound system is broken.

**Gödel's completeness theorem (1930)**: first-order logic (FOL) is sound and complete. The set of valid formulas equals the set of provable formulas.

## 2. Compactness

If every finite subset of $\Gamma$ is satisfiable, then $\Gamma$ itself is satisfiable. Surprising consequence: nonstandard models. E.g. arithmetic has models containing "infinite numbers" that no finite set of standard axioms can rule out.

## 3. Löwenheim-Skolem

Every consistent first-order theory with an infinite model has models of every infinite cardinality. Consequences: FOL can't characterize "the natural numbers" up to isomorphism (Skolem's paradox).

## 4. Decidability

A theory $T$ is **decidable** if there's an algorithm that, for any $\varphi$, decides whether $T \vdash \varphi$.

- Propositional logic: decidable (truth table).
- First-order logic: **undecidable** (Church 1936, Turing 1936) — though semi-decidable: if provable, you'll find the proof; if not, you might search forever.
- Peano arithmetic: undecidable.
- Presburger arithmetic (no multiplication): decidable.

## 5. Gödel's incompleteness theorems (1931)

The single most famous results in logic, and the most misunderstood.

### 5.1 Setup

Let $T$ be a formal system that:

- Includes Peano arithmetic (PA): basic axioms of natural numbers.
- Is **consistent**: doesn't prove a contradiction.
- Is **effectively axiomatized**: there's an algorithm to check if a string is an axiom.

### 5.2 First incompleteness theorem

There exists a sentence $G$ (the **Gödel sentence**) such that **neither $G$ nor $\neg G$ is provable in $T$**, yet $G$ is true (in the standard model of $\mathbb{N}$).

Sketch: $G$ encodes "this sentence is not provable in $T$". If $T \vdash G$, then $T$ proves its own negation (contradiction). If $T \vdash \neg G$, then $T$ proves that $G$ is provable, but $G$ isn't (contradiction). So both unprovable. Yet — interpreted — $G$ says something true: that it's not provable.

### 5.3 Second incompleteness theorem

$T$ cannot prove its own consistency. The consistency statement Cons($T$) is itself one of those unprovable-but-true sentences.

### 5.4 The encoding trick

Gödel **arithmetized syntax**: assigns a unique number (Gödel number) to every formula and proof. Statements about formulas (e.g. "this is a proof of that") become statements about numbers — expressible in PA itself. The system reasons about itself.

## 6. Philosophical consequences

What incompleteness **doesn't** mean (common misuses):

- It doesn't mean "we can never know anything".
- It doesn't mean "there's truth beyond logic" in a mystical sense.
- It doesn't apply to arbitrary informal systems — only to sufficiently strong formal axiomatizations.

What it *does* mean:

- **Hilbert's program** (formalize all of mathematics and prove its consistency by finitary means) is impossible as originally conceived.
- Truth and provability are *distinct concepts*. We must distinguish $\vdash$ from $\models$.
- Mathematics is not a single closed deductive system but a growing community of formal-and-informal practice.

## 7. Church-Turing

Closely related: the halting problem (Turing 1936) is undecidable. There's no algorithm that, given an arbitrary program and input, decides whether it halts. Connects metalogic to computer science.

## Exercises

<details>
  <summary>Is Boolean propositional logic complete?</summary>

Yes: standard axiom systems (Frege's, or natural deduction) are sound and complete for propositional logic, with the truth table as decision procedure.
</details>

<details>
  <summary>Does Gödel apply to Presburger arithmetic?</summary>

No — Presburger (addition only, no multiplication) is complete, consistent, and decidable. Multiplication is what lets you encode enough syntax to self-reference.
</details>

## Summary

- Soundness: $\vdash \Rightarrow \models$. Completeness: $\models \Rightarrow \vdash$.
- FOL is sound + complete (Gödel 1930), but undecidable (Church-Turing 1936).
- Gödel I: PA-extending consistent systems have true unprovable sentences.
- Gödel II: such systems can't prove their own consistency.
- Compactness, Löwenheim-Skolem: FOL can't pin down "the naturals" up to isomorphism.

## Further reading

- Gödel, *On Formally Undecidable Propositions* (1931).
- Smith, *An Introduction to Gödel's Theorems* (2007).
- Hofstadter, *Gödel, Escher, Bach* (1979) — popular but rigorous.
