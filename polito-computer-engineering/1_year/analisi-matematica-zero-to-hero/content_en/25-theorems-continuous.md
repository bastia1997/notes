---
title: "Theorems on continuous functions (Weierstrass, intermediate values)"
area: Continuity
summary: "The **three pillars** on continuous functions of a real variable. **Bolzano** (zeros), **Darboux** (intermediate values), **Weierstrass** (max/min on compacts). All depend on completeness of $\\mathbb{R}$."
order: 25
level: intermediate
prereq:
  - "Continuity definition (sec. 24)"
  - "Bolzano-Weierstrass and compacts (sec. 10, 13)"
tools:
  - "Rudin — *Principles*, ch. 4"
---

# Theorems on continuous functions

## Map

Three fundamental theorems, each tied to a topological property of $\mathbb{R}$:

1. **Zero theorem (Bolzano)** — depends on **connectedness** of an interval.
2. **Intermediate value (Darboux)** — corollary.
3. **Weierstrass theorem** — depends on **compactness** (Heine-Borel).

Without completeness (e.g. in $\mathbb{Q}$), all fail.

## Zero theorem (Bolzano)

**Theorem.** $f : [a, b] \to \mathbb{R}$ continuous with $f(a) f(b) < 0$ ⇒ $\exists c \in (a, b)$ with $f(c) = 0$.

> **Glossary:**
>
> - $[a, b]$ = **closed bounded interval** (compact).
> - $f$ **continuous** = no "jumps", traceable without lifting the pen.
> - $f(a) f(b) < 0$ = $f(a)$ and $f(b)$ have **opposite signs** (one positive, one negative).
> - $c \in (a, b)$ = interior point (endpoints excluded).
> - **In words:** if $f$ starts below zero and ends above, it must cross zero.

*Proof (bisection).* WLOG $f(a) < 0 < f(b)$. Build $[a_n, b_n]$ with $f(a_n) \le 0 \le f(b_n)$, $b_n - a_n = (b-a)/2^n$. At each step, bisect and pick half with sign change.

Monotone bounded ⇒ $a_n \to c$, $b_n \to c$. By Heine (continuity), $f(a_n) \to f(c) \le 0$, $f(b_n) \to f(c) \ge 0$. So $f(c) = 0$. ∎

> **Bonus:** the proof is a numerical algorithm with error halving per step.

<div class="chart">
<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="280" fill="#111a30"/>
  <line x1="40" y1="140" x2="580" y2="140" stroke="#f3eed9" stroke-width="1"/>
  <path d="M 60 240 Q 200 220 320 140 Q 440 60 560 50" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <circle cx="60" cy="240" r="4" fill="#e07a8d"/>
  <circle cx="560" cy="50" r="4" fill="#6fb38a"/>
  <circle cx="320" cy="140" r="5" fill="#d4af37"/>
  <text x="305" y="165" fill="#d4af37" font-size="13" font-style="italic">c</text>
</svg>
<div class="chart-caption">Continuous function changing sign on $[a, b]$ must vanish.</div>
</div>

## Intermediate value theorem (Darboux)

**Theorem.** $f : [a, b] \to \mathbb{R}$ continuous. For every $\eta$ between $f(a)$ and $f(b)$, $\exists c \in [a, b]$ with $f(c) = \eta$.

*Proof.* Apply Bolzano to $g = f - \eta$. ∎

**Corollary.** Continuous image of an interval is an interval.

> **Warning:** Darboux does NOT imply continuity. $\sin(1/x)$ with $f(0) = 0$ satisfies IVT but is discontinuous at 0.

## Weierstrass theorem

**Theorem.** $f : [a, b] \to \mathbb{R}$ continuous, $[a, b]$ closed bounded ⇒ $f$ admits **max and min**.

*Proof.*

**Step 1: bounded.** By contradiction, $\forall n$ $\exists x_n$ with $f(x_n) > n$. By BW, $x_{n_k} \to x^* \in [a, b]$. By continuity, $f(x_{n_k}) \to f(x^*)$ finite. But $f(x_{n_k}) > n_k \to +\infty$. Contradiction.

**Step 2: sup achieved.** $M = \sup f$. $\exists x_n$ with $f(x_n) \to M$. By BW, $x_{n_k} \to x_M$. By continuity, $f(x_M) = M$. ∎

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="300" fill="#111a30"/>
  <line x1="60" y1="250" x2="560" y2="250" stroke="#f3eed9" stroke-width="1"/>
  <line x1="60" y1="40" x2="60" y2="270" stroke="#f3eed9" stroke-width="1"/>
  <path d="M 80 200 Q 150 50 230 100 Q 310 160 380 70 Q 460 30 540 230" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <line x1="60" y1="40" x2="560" y2="40" stroke="#6fb38a" stroke-dasharray="3,3"/>
  <line x1="60" y1="230" x2="560" y2="230" stroke="#e07a8d" stroke-dasharray="3,3"/>
  <circle cx="450" cy="40" r="5" fill="#6fb38a"/>
  <circle cx="540" cy="230" r="5" fill="#e07a8d"/>
  <text x="20" y="44" fill="#6fb38a" font-size="13" font-style="italic">M</text>
  <text x="20" y="234" fill="#e07a8d" font-size="13" font-style="italic">m</text>
</svg>
<div class="chart-caption">On $[a, b]$ closed bounded, continuous $f$ achieves **both** max and min. Values reached, not just suprema.</div>
</div>

## Counterexamples: all hypotheses needed

1. **Open interval.** $1/x$ on $(0, 1]$: continuous, unbounded.
2. **Unbounded.** $x$ on $[0, +\infty)$: continuous, no max.
3. **Discontinuous.** $x$ on $[0, 1)$, $f(1) = 0$: bounded, no max.

## Corollaries

**Fixed point 1D.** $f : [0, 1] \to [0, 1]$ continuous ⇒ $\exists c$ with $f(c) = c$.

*Proof.* $g(x) = f(x) - x$, $g(0) \ge 0$, $g(1) \le 0$. Bolzano. ∎

**Continuity of inverse.** $f : [a, b] \to \mathbb{R}$ continuous strictly monotone ⇒ $f^{-1}$ continuous.

## Common pitfalls

- **Continuous ⇒ max achieved** false without compactness. $\arctan$ on $\mathbb{R}$.
- **Darboux ⇒ continuous** false.
- **Sup ≠ max** without Weierstrass.

## Exercises

<details>
<summary>Exercise 1 — Odd-degree polynomial has real root</summary>

**Solution.** $p$ of odd degree, leading coeff $> 0$. $\lim_{+\infty} = +\infty$, $\lim_{-\infty} = -\infty$. Bolzano on $[A, B]$ with $p(A) < 0 < p(B)$. ∎
</details>

<details>
<summary>Exercise 2 — Fixed point</summary>

$f : [0, 1] \to [0, 2]$ continuous: always fixed point?

**Solution.** No: $f(x) = x + 1$. Need $f([0, 1]) \subseteq [0, 1]$. ∎
</details>

<details>
<summary>Exercise 3 — Weierstrass on half-line</summary>

$f : [0, +\infty) \to \mathbb{R}$ continuous, $\lim_{+\infty} f = 0$. Then $f$ has max or min.

**Solution.** WLOG $f$ takes positive value at $x_0$. For $x$ large, $|f| < f(x_0)/2$. On compact $[0, \max(x_0, R)]$, Weierstrass gives max $M \ge f(x_0)$. Outside, $|f| < M$. ∎
</details>

## One-line takeaway

**Bolzano** (zeros) + **Darboux** (intermediate values) + **Weierstrass** (max/min on compacts) are the three theorems making continuous analysis work — all consequences of completeness of $\mathbb{R}$, all false in $\mathbb{Q}$.
