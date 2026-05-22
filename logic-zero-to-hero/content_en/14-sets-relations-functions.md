---
title: "Sets, relations, functions"
area: "Math of Logic"
summary: "The shared vocabulary of logic and mathematics: naive set theory, properties of relations (reflexive, symmetric, transitive), types of functions, countable vs uncountable. Russell's paradox introduced."
order: 14
level: "intermediate"
prereq:
  - "Have read [Predicate logic syntax](12-predicate-logic-syntax.html)"
tools: []
---

# Sets, relations, functions

Logic and mathematics share a common ground: set theory. Even informal use of sets, relations, and functions is enough to make many arguments precise.

## 1. Naive set theory

A **set** is a collection of distinct objects. Membership: $x \in A$. Standard operations:

- Union: $A \cup B = \{x : x \in A \vee x \in B\}$.
- Intersection: $A \cap B = \{x : x \in A \wedge x \in B\}$.
- Difference: $A \setminus B = \{x : x \in A \wedge x \notin B\}$.
- Subset: $A \subseteq B$ iff $\forall x (x \in A \rightarrow x \in B)$.
- Power set: $\mathcal{P}(A) = \{S : S \subseteq A\}$. Cardinality $2^{|A|}$.
- Cartesian product: $A \times B = \{(a,b) : a \in A, b \in B\}$.

De Morgan for sets: $\overline{A \cup B} = \overline{A} \cap \overline{B}$ (and dual).

## 2. Relations

A **binary relation** $R$ on $A$ is a subset of $A \times A$. Write $aRb$ for $(a,b) \in R$.

Key properties:

- **Reflexive**: $\forall a, aRa$.
- **Symmetric**: $\forall a,b, aRb \rightarrow bRa$.
- **Transitive**: $\forall a,b,c, (aRb \wedge bRc) \rightarrow aRc$.
- **Antisymmetric**: $\forall a,b, (aRb \wedge bRa) \rightarrow a=b$.

Two important kinds:

- **Equivalence relation**: reflexive + symmetric + transitive. Partitions the set into equivalence classes. E.g. "same age" on people.
- **Partial order**: reflexive + antisymmetric + transitive. E.g. $\le$ on numbers, $\subseteq$ on sets.

## 3. Functions

A function $f: A \to B$ assigns to each $a \in A$ exactly one $b \in B$.

- **Injective** (one-to-one): $f(a) = f(a') \Rightarrow a = a'$.
- **Surjective** (onto): every $b \in B$ has some preimage.
- **Bijective**: both.

Bijections are the gateway to **cardinality**.

## 4. Cardinality

Two sets have the same cardinality if there's a bijection between them.

- **Finite**: cardinality is a natural number.
- **Countably infinite** ($\aleph_0$): bijection with $\mathbb{N}$. Examples: $\mathbb{Z}, \mathbb{Q}$.
- **Uncountable**: no such bijection. Example: $\mathbb{R}$.

Cantor's diagonal argument (1891) proves $\mathbb{R}$ is uncountable. Sketch: assume a list of all reals in $(0,1)$; construct a new real whose $n$th digit differs from the $n$th digit of the $n$th listed real. This new real isn't in the list. Contradiction.

## 5. Russell's paradox

Naive set theory allows the construction:

$$R = \{x : x \notin x\}$$

The "set of all sets that don't contain themselves". Question: is $R \in R$?

If $R \in R$: by definition $R \notin R$. Contradiction.
If $R \notin R$: by definition $R \in R$. Contradiction.

Russell discovered this in 1901 reviewing Frege's *Begriffsschrift*. The paradox forced abandoning naive set theory in favor of axiomatic theories like **ZFC** (Zermelo-Fraenkel + Choice), which restricts comprehension to avoid the construction.

See [famous paradoxes](46-famous-paradoxes.html) for more.

## 6. Why this matters for logic

- Quantifiers $\forall, \exists$ range over sets (domains of discourse).
- Truth in a model = relations between sets ([predicate logic semantics](13-predicate-logic-semantics.html)).
- Categorical syllogisms can be visualized as Venn diagrams (intersection of sets).
- Proofs by counterexample exhibit an element of a set.

## Exercises

<details>
  <summary>Exercise 1 — Is "is a sibling of" an equivalence relation?</summary>

Reflexive? No: most don't consider themselves their own sibling.
Symmetric? Yes.
Transitive? If A is sibling of B, B of C → A of C? Yes if same family.

Missing reflexivity. So *not* an equivalence relation in the strict sense, though it generates one if you add self-relation. Mathematicians sometimes use "≈ same family" instead.
</details>

<details>
  <summary>Exercise 2 — Why is $\mathbb{Q}$ countable but $\mathbb{R}$ not?</summary>

$\mathbb{Q}$ can be enumerated by the Cantor pairing of $(p, q)$ with $p/q$ — explicit bijection with $\mathbb{N}$.

$\mathbb{R}$: Cantor's diagonal argument — assume countable, construct a real not in the list, contradiction.
</details>

## Summary

- Sets: ∈, ∪, ∩, ⊆, $\mathcal{P}$, ×.
- Relations: reflexive, symmetric, transitive, antisymmetric.
- Equivalence vs partial order.
- Functions: injective, surjective, bijective.
- Cardinality: finite < countable < uncountable. Cantor diagonal.
- Russell's paradox killed naive set theory; ZFC replaced it.

## Further reading

- Halmos, *Naive Set Theory* (1960).
- Enderton, *Elements of Set Theory* (1977).
