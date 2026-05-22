---
title: Logic and proofs for analysis
area: Preliminaries
summary: "The symbols we need to write mathematics — ∀ (\"for all\"), ∃ (\"there exists\"), ¬ (\"not\"), and the four ways to prove a theorem. All explained symbol by symbol, with plain examples before the technical ones."
order: 1
level: beginner
prereq:
  - "Reading a mathematical expression (e.g. 'x squared is 4')"
tools:
  - "Rudin, ch. 1"
  - "Halmos — *Naive Set Theory* (informal but rigorous on logic + sets)"
---

# Logic and proofs for analysis

## Why this matters (and what you risk without it)

Almost every definition in analysis has the shape:

> "**For every** small $\varepsilon$ **there exists** a small $\delta$ such that..."

If you don't understand the order of the words "for every" and "there exists", **you can't understand the definitions**: you'll read theorems for years without grasping what they actually say. The distinction between "continuity" and "uniform continuity" — many chapters later — is *exactly* a swap of these two phrases. And the two things are deeply different.

This chapter is the vocabulary. Very short, but worth revisiting whenever a later theorem feels murky.

## The five symbols you'll have to recognize at a glance

Before any technique, here are the symbols we'll use *everywhere*. Learn them now the way you learned the smileys "🙂" "😢" — by sight.

| symbol | reads as | meaning |
|--------|----------|---------|
| $\forall$ | "for all" | applies to every element |
| $\exists$ | "there exists" | at least one exists |
| $\exists!$ | "there exists a unique" | one and only one |
| $\Rightarrow$ | "implies" / "then" | if the left thing is true, so is the right |
| $\Leftrightarrow$ | "if and only if" | both true or both false |
| $\neg$ | "not" | negates the statement that follows |
| $\land$ | "and" | both true |
| $\lor$ | "or" (inclusive) | at least one true |
| $\in$ | "belongs to" | the element is in the set |
| $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$ | "naturals, integers, rationals, reals" | the four basic number sets |

> **Mnemonic.** $\forall$ is an upside-down "A" = *All*. $\exists$ is a reversed "E" = *Exists*.

## Logical connectives: "and", "or", "not", "if... then"

A **proposition** is a sentence that is either true or false, nothing in between. Call them $P$ and $Q$.

| symbol | name | true when |
|--------|------|-----------|
| $\neg P$ | negation of $P$ | $P$ is false |
| $P \land Q$ | $P$ and $Q$ | both $P$ and $Q$ are true |
| $P \lor Q$ | $P$ or $Q$ | at least one of the two is true |
| $P \Rightarrow Q$ | if $P$, then $Q$ | false **only** when $P$ true and $Q$ false |
| $P \Leftrightarrow Q$ | $P$ if and only if $Q$ | $P$ and $Q$ have the same truth value |

### Plain examples, one per line

- $P$ = "it's raining"; $Q$ = "I take an umbrella". $P \Rightarrow Q$ = "if it's raining I take an umbrella". When is this true? *Always except* one case: raining (true) and not taking an umbrella (false). The other three combinations don't violate the sentence.
- $P$ = "the number is even"; $Q$ = "the number is divisible by 2". $P \Leftrightarrow Q$ is always true: even ≡ divisible by 2 by definition.

### Subtle point: the "vacuous" implication

$P \Rightarrow Q$ is considered *true* whenever $P$ is false, *whatever* $Q$ is.

Sounds strange. Example: "If the moon is made of cheese, then $2 + 2 = 5$". In classical logic this is **true**. It's called the **vacuity** of the implication.

**Why it matters.** In mathematics we often write "If $f$ is differentiable at $x_0$, then …". If $f$ is *not* differentiable at $x_0$ (the hypothesis is false), the theorem *still holds* — it just says nothing interesting in that case. Without vacuity, every theorem would have to be split into a thousand cases.

## Truth tables

A **truth table** lists all possible cases (true/false for each proposition) and shows the connective's value.

| $P$ | $Q$ | $P \Rightarrow Q$ | $\neg P \lor Q$ |
|---|---|---|---|
| T | T | T | T |
| T | F | F | F |
| F | T | T | T |
| F | F | T | T |

Columns 3 and 4 are identical, so:

$$P \Rightarrow Q \quad \Leftrightarrow \quad \neg P \lor Q.$$

**Translated.** "$P$ implies $Q$" is the same as "**either** $P$ is false, **or** $Q$ is true" — which rephrases the rule above.

This equivalence is extremely useful for **negating** an implication. Negating $P \Rightarrow Q$ means negating $\neg P \lor Q$, which by De Morgan (we'll see) becomes $P \land \neg Q$. So: the only situation in which "if $P$ then $Q$" is false is when $P$ is true and $Q$ is false. Confirmed.

## Quantifiers: $\forall$ and $\exists$

A **predicate** is a statement about a variable, like "$x$ is positive". It becomes a proposition (true or false) once you specify *who* $x$ is. Quantifiers say "for whom it holds".

- **Universal** $\forall x \in X,\ P(x)$. Reads: "for every $x$ in the set $X$, $P(x)$ holds".
  Example: $\forall x \in \mathbb{N},\ x \ge 0$ — "every natural is $\ge 0$". True.
- **Existential** $\exists x \in X,\ P(x)$. Reads: "there exists (at least) one $x$ in $X$ such that $P(x)$ holds".
  Example: $\exists x \in \mathbb{N},\ x^2 = 4$ — "there exists a natural whose square is 4". True ($x = 2$).
- **Uniqueness** $\exists! x \in X,\ P(x)$. "There exists *one and only one* $x$ such that $P(x)$".
  Example: $\exists! x \in \mathbb{R},\ x^3 = 8$ — "there is a unique real whose cube is 8". True ($x = 2$).

### Golden rule: $\forall \exists$ ≠ $\exists \forall$

Swapping the order of quantifiers changes the meaning. This is **the** most important point in all of mathematical logic.

**Plain numerical example, daily-life version.** Consider:

> "For every person $p$, there exists a mother $m$ such that $m$ is the mother of $p$."

$\forall p, \exists m : m$ is mother of $p$. True: everyone has a mother.

Now swap the order:

> "There exists a mother $m$ such that, for every person $p$, $m$ is the mother of $p$."

$\exists m, \forall p : m$ is mother of $p$. False: no single person is the mother of *everyone*.

**What changed.** In the first, $m$ can depend on $p$ (different mother for different person). In the second, $m$ is chosen once and has to "work" for all.

### The example we'll use a hundred times: continuity

Compare the two definitions (we'll revisit them many chapters later, here just for the pattern):

$$\forall \varepsilon > 0,\ \exists \delta > 0 : |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon \quad \text{(continuity at $x_0$)}$$

$$\forall \varepsilon > 0,\ \exists \delta > 0 : \forall x_0,\ |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon \quad \text{(uniform continuity)}$$

> **Glossary for the formulas** — read symbol by symbol:
>
> - $f$ = a function (e.g. $f(x) = x^2$). Think of it as a "box" that given a number returns another.
> - $x_0$ = a fixed point (read "x naught", where "naught" is just a label meaning "reference point"). E.g. $x_0 = 3$.
> - $x$ = a generic point that we'll let "move" near $x_0$.
> - $\varepsilon$ ("epsilon", Greek letter) = a tiny distance on the values axis $f(x)$. Read as "the error margin I accept on the output".
> - $\delta$ ("delta", Greek letter) = a tiny distance on the $x$ axis. Read as "how close to $x_0$ I have to stay with the input".
> - $|x - x_0|$ = the **distance** between $x$ and $x_0$ (the bars $|\cdot|$ are absolute value = drop the minus sign if there is one). $|x - x_0| < \delta$ means "$x$ is within $\delta$ of $x_0$".
> - $|f(x) - f(x_0)| < \varepsilon$ = "the value of $f$ at $x$ is within $\varepsilon$ of the value of $f$ at $x_0$".
> - $\Rightarrow$ = "implies".
>
> Translated into plain English, the **first formula** says: "for every error margin $\varepsilon$ I commit to, there exists a distance $\delta$ such that, if $x$ is within $\delta$ of $x_0$, then $f(x)$ is within $\varepsilon$ of $f(x_0)$". Simply: "small change in input ⇒ small change in output". This is what "$f$ is continuous at $x_0$" means.

**What changes between the two.** Look at *where* $\forall x_0$ sits:

- **First** (continuity at $x_0$): $x_0$ is fixed up front, *outside* the formula. So when I pick $\delta$, I can use information about this particular $x_0$. **$\delta$ may depend on $x_0$.**
- **Second** (uniform): $\forall x_0$ is *inside* the formula, after $\exists \delta$. So $\delta$ is chosen **before** seeing $x_0$, and then has to work for *all* $x_0$. **$\delta$ cannot depend on $x_0$.**

You'll read it a hundred times. It's normal that at first they look identical: they aren't.

## How to negate formulas with quantifiers

**Mechanical rule** (and provable):

$$\neg(\forall x,\ P(x)) \ \Leftrightarrow\ \exists x,\ \neg P(x)$$
$$\neg(\exists x,\ P(x)) \ \Leftrightarrow\ \forall x,\ \neg P(x)$$

**In words.** Negating "for all" becomes "there exists a counterexample". Negating "there exists" becomes "for every $x$ it fails".

### Concrete example: negating "$f$ is continuous at $x_0$"

Start from continuity (just read above):
$$\forall \varepsilon > 0,\ \exists \delta > 0 : |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon.$$

We negate by applying the mechanical rule one quantifier at a time: every $\forall$ becomes $\exists$, every $\exists$ becomes $\forall$, and we negate the "heart" of the formula at the end.

**Steps.** Start from the outermost $\forall$:

1. $\neg(\forall \varepsilon > 0,\ \dots)$ becomes $\exists \varepsilon > 0,\ \neg(\dots)$. ("Not for every $\varepsilon$" = "there is an $\varepsilon$ for which it fails".)
2. Now negate $\exists \delta > 0,\ \dots$ → $\forall \delta > 0,\ \neg(\dots)$.
3. Now negate the implication "$P \Rightarrow Q$" where $P$ = "$|x - x_0| < \delta$" and $Q$ = "$|f(x) - f(x_0)| < \varepsilon$". As shown above: $\neg(P \Rightarrow Q) \iff P \land \neg Q$. So: "$|x - x_0| < \delta$ **and** $|f(x) - f(x_0)| \ge \varepsilon$".
4. Note: in the original, $x$ is a free variable, and "$P(x) \Rightarrow Q(x)$ for every $x$" has an implicit $\forall x$. Negating it gives $\exists x$.

Final result:

$$\exists \varepsilon > 0,\ \forall \delta > 0,\ \exists x : |x - x_0| < \delta \land |f(x) - f(x_0)| \ge \varepsilon.$$

> **Glossary for the formula:**
>
> - $\exists \varepsilon > 0$ = "there exists a positive distance $\varepsilon$".
> - $\forall \delta > 0$ = "however small you choose $\delta > 0$".
> - $\exists x$ = "you can find a point $x$".
> - $|x - x_0| < \delta$ = "$x$ is within $\delta$ of $x_0$" (very close).
> - $\land$ = "and".
> - $|f(x) - f(x_0)| \ge \varepsilon$ = "the value $f(x)$ is at *least* $\varepsilon$ away from $f(x_0)$" (not close).

**Translated into plain English.** "$f$ is *not* continuous at $x_0$" means: there exists a threshold $\varepsilon$ (a "minimum jump") such that, **however close** you stay to $x_0$ (for every small $\delta$), you can **always find** an $x$ within that closeness whose value $f(x)$ is still *far* from $f(x_0)$ by at least $\varepsilon$.

In practice: **the function "jumps" near $x_0$**. No matter how tight you squeeze the input, there's always a sample giving you a far output.

## The four proof techniques

Every proof you'll read uses one of these four (or a combination).

### 1. Direct proof

**To prove $P \Rightarrow Q$:** assume $P$, deduce $Q$ via logical steps.

**Example.** *If $n$ is even, then $n^2$ is even.*

*Proof.* "$n$ even" means $n = 2 k$ for some integer $k$. Then $n^2 = (2k)^2 = 4 k^2 = 2 \cdot (2 k^2)$. The factor 2 in front says $n^2$ is even. ∎

(The symbol ∎ closes the proof: "done", like Q.E.D. in geometry, "quod erat demonstrandum".)

### 2. Contrapositive proof

**Idea.** $P \Rightarrow Q$ is logically equivalent to $\neg Q \Rightarrow \neg P$. So instead of "if A then B", you prove "if not-B then not-A". Sometimes much easier.

**Example.** *If $n^2$ is even, then $n$ is even.*

Direct proof is awkward (you'd have to figure out $n$ from $n^2 = 2 m$). The contrapositive is easy: we prove "if $n$ is odd, then $n^2$ is odd".

*Proof.* Let $n = 2k + 1$ (definition of odd). Then
$$n^2 = (2k + 1)^2 = 4 k^2 + 4 k + 1 = 2 (2 k^2 + 2 k) + 1.$$
The "$+ 1$" says $n^2$ has remainder 1 when divided by 2: odd. ∎

### 3. Proof by contradiction (*reductio ad absurdum*)

**Idea.** To prove $P$, assume $\neg P$ and deduce a **contradiction**. If assuming the opposite leads to absurdity, then the opposite is false, hence $P$ is true.

**Historical example.** *$\sqrt 2$ is irrational (i.e. cannot be written as a fraction of two integers).*

> **Glossary.**
>
> - $\sqrt 2$ = "square root of 2" = the positive number that multiplied by itself gives 2. Approximately $1.414\dots$
> - **rational** = a number that can be written as a fraction $p/q$ with $p, q$ integers and $q \ne 0$. Examples: $1/2$, $-3/7$, $5 = 5/1$.
> - **irrational** = not rational (no fraction represents it exactly).
> - **coprime**: two integers $p, q$ are coprime if they share no common factor beyond 1. E.g. $3$ and $5$ are coprime; $6$ and $9$ are not (they share $3$).
> - $\gcd(p, q)$ = "greatest common divisor" of $p$ and $q$. Coprime ↔ $\gcd(p, q) = 1$.
> - "$3 \mid p$" reads "3 divides $p$": there is an integer $m$ with $p = 3m$.

*Proof (by contradiction).* Suppose $\sqrt 2$ is **rational**. Then we can write
$$\sqrt 2 = \frac{p}{q}$$
with $p, q$ integers, $q \ne 0$. We may also assume $p$ and $q$ are **coprime** (any common factor can be canceled).

**Step 1 — square both sides.**
$$(\sqrt 2)^2 = \left(\frac{p}{q}\right)^2 \quad\Longrightarrow\quad 2 = \frac{p^2}{q^2}.$$
Multiplying by $q^2$:
$$p^2 = 2 q^2. \tag{$\ast$}$$
$(\ast)$ says $p^2$ is twice something, hence $p^2$ is **even**.

**Step 2 — if $p^2$ is even, then $p$ is even.** Proved above (Example 2 by contrapositive: if $p$ were odd, $p^2$ would be odd). So $p$ is even, i.e.
$$p = 2m \quad\text{for some integer } m.$$

**Step 3 — substitute $p = 2m$ into $(\ast)$.**
$$(2m)^2 = 2 q^2 \quad\Longrightarrow\quad 4 m^2 = 2 q^2 \quad\Longrightarrow\quad q^2 = 2 m^2.$$
Same logic as Steps 1–2 applied to $q$: $q^2$ is even, hence $q$ is even.

**Step 4 — the contradiction.** We've concluded that **both $p$ and $q$ are even**. But then they share the factor 2, contradicting our initial assumption that they were **coprime**. Contradiction.

The starting hypothesis ("$\sqrt 2$ rational") leads to absurdity, so it is false. Conclusion: $\sqrt 2$ is irrational. ∎

### 4. Proof by induction

For statements depending on a natural number $n$ (e.g. "holds for every $n \ge 1$"). We'll see in depth in [chapter 3](03-induction-naturals.html). Idea: prove the case $n = 1$ (base) and then show that, if it holds for $n$, it holds for $n+1$ (step). Like an infinite domino chain: push the first tile, each tile knocks the next, all of them fall.

### Bonus: constructive vs non-constructive

**Constructive.** To prove "there exists $x$ such that $P(x)$", exhibit *one* specific $x$.

**Non-constructive.** Prove that if *no* such $x$ existed, absurdity would follow — without ever displaying an explicit $x$.

Both valid in classical logic. In intuitionistic mathematics, only the first. We accept both.

### Non-constructive example (a famous curiosity)

**Theorem.** There exist two irrational numbers $a, b$ such that $a^b$ is rational.

*Proof.* Consider $c = \sqrt 2 ^{\sqrt 2}$. Two cases:

- **Case 1:** $c$ is rational. Then taking $a = b = \sqrt 2$ (both irrational) we have $a^b = c$ rational. Done.
- **Case 2:** $c$ is irrational. Then taking $a = c$ (irrational by assumption) and $b = \sqrt 2$ (irrational), $a^b = c^{\sqrt 2} = (\sqrt 2^{\sqrt 2})^{\sqrt 2} = \sqrt 2^{(\sqrt 2 \cdot \sqrt 2)} = \sqrt 2^2 = 2$, rational. Done.

In both cases two such irrationals exist, so the theorem is proved. ∎

**Curiosity.** From the proof, we don't know *which* of the two cases is the true one. (Aside: the Gelfond–Schneider theorem says $c$ is irrational, but that's a heavier machine.) Still, we proved existence. That's the power of non-constructive proof.

## Exercises

<details>
<summary>Exercise 1 — Negate a statement</summary>

Negate symbolically: "$\forall n \in \mathbb{N},\ \exists m \in \mathbb{N} : m > n^2$".

**Solution.** Swap quantifiers and negate the final condition:

$$\exists n \in \mathbb{N},\ \forall m \in \mathbb{N},\ m \le n^2.$$

In words: "there is a natural $n$ such that every natural $m$ is $\le n^2$", i.e. $n^2$ is an upper bound of $\mathbb{N}$. False (naturals are unbounded), so the original was true.
</details>

<details>
<summary>Exercise 2 — Contrapositive</summary>

Write the contrapositive of: "If $x + y > 0$ then $x > 0$ or $y > 0$".

**Solution.** Negate the conclusion and the hypothesis, swapping:

"If $x \le 0$ and $y \le 0$, then $x + y \le 0$".

Obviously true (sum of two non-positive numbers is non-positive), so the original is true.
</details>

<details>
<summary>Exercise 3 — By contradiction</summary>

Prove that $\sqrt 3$ is irrational.

**Solution.** Suppose $\sqrt 3 = p/q$ with $\gcd(p, q) = 1$. Then $p^2 = 3 q^2$, so $3 \mid p^2$. Since 3 is prime, $3 \mid p$, write $p = 3m$. Substituting: $9 m^2 = 3 q^2 \Rightarrow q^2 = 3 m^2$, so $3 \mid q$. Then $3 \mid \gcd(p, q) = 1$, contradiction. ∎
</details>

<details>
<summary>Exercise 4 — Quantifiers on sequences</summary>

Translate into symbols: "the sequence $(a_n)$ tends to $L$", and negate.

**Solution.**

Tending to $L$ means: "for every small distance $\varepsilon$ I choose, from some index $N$ onward all $a_n$ are within $\varepsilon$ of $L$".

In symbols: $\forall \varepsilon > 0,\ \exists N \in \mathbb{N} : \forall n \ge N,\ |a_n - L| < \varepsilon$.

Negation (swap $\forall \leftrightarrow \exists$ one at a time):

$\exists \varepsilon > 0,\ \forall N \in \mathbb{N},\ \exists n \ge N : |a_n - L| \ge \varepsilon$.

In words: "there is a threshold $\varepsilon$ such that, however far (index $N$) you go, you find a term $a_n$ still *distant* from $L$ by at least $\varepsilon$".
</details>

## Common pitfalls

- **"P or Q" is inclusive.** "I'll go to the cinema or to dinner" — in classical logic you could do both. The exclusive "or" (one yes, the other no) is written $P \oplus Q$ and we'll rarely use it.
- **Vacuous implication.** $P \Rightarrow Q$ is true when $P$ is false, whatever $Q$ is. Not a trick: it holds the theory together.
- **Confusing $\forall \exists$ and $\exists \forall$.** Example:
  - $\forall x \in \mathbb{R},\ \exists y \in \mathbb{R} : x + y = 0$. True (take $y = -x$).
  - $\exists y \in \mathbb{R},\ \forall x \in \mathbb{R} : x + y = 0$. False (no single $y$ cancels every $x$).
- **Forgetting the domain.** "$\forall x$" without specifying *where* is ambiguous. Always: $\forall x \in X$, $\exists x \in X$.

> **Operating pill.** When you read a theorem with three or more quantifiers, **write it in the margin numbering them** ($\forall_1 \varepsilon, \exists_2 \delta, \forall_3 x \dots$). Then translate each into English. Without this habit, after five months you'll still have the same doubts.

## One-line takeaway

The quantifiers $\forall$ and $\exists$ written in the right order are the backbone of every analysis definition — being able to read, negate, and use them is the prerequisite to everything else.
