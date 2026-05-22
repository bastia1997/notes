---
title: "Uniform continuity, Heine, Lipschitz"
area: Continuity
summary: "**Uniform continuity** — same $\\delta$ for all points, not just 'one $\\delta$ per point'. Swapping quantifier order produces a **strictly stronger** notion. Heine-Cantor theorem (compact ⇒ uniform), Lipschitz and Hölder."
order: 26
level: intermediate
prereq:
  - "Continuity (sec. 24)"
  - "Weierstrass on compacts (sec. 25)"
tools:
  - "Rudin — *Principles*, ch. 4"
---

# Uniform continuity, Heine, Lipschitz

## Quantifier order is everything

Continuity on $A$:
$$\forall x_0 \in A,\ \forall \varepsilon > 0,\ \exists \delta > 0 : |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon.$$

$\delta$ may depend **on both $\varepsilon$ and $x_0$**. If we require $\delta$ depend **only on $\varepsilon$**, we get a strictly stronger notion.

**Definition.** $f : A \to \mathbb{R}$ is **uniformly continuous** on $A$ if:
$$\forall \varepsilon > 0,\ \exists \delta > 0 : \forall x, y \in A,\ |x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon.$$

> **Same $\delta$ for every pair.** Uniform across the domain.

### Negation

$f$ NOT uniformly continuous: find $(x_n), (y_n)$ with $|x_n - y_n| \to 0$ but $|f(x_n) - f(y_n)| \not\to 0$.

## Example: $x^2$ on $\mathbb{R}$ — continuous but NOT uniform

$x_n = n$, $y_n = n + 1/n$. $|x_n - y_n| = 1/n \to 0$. But $|y_n^2 - n^2| = 2 + 1/n^2 \ge 2$. With $\varepsilon_0 = 2$, no uniform $\delta$.

> **Interpretation:** at infinity slope of $x^2$ diverges. To maintain same output spread $\varepsilon$, need smaller $\delta$ depending on point.

## Heine-Cantor theorem

> **Theorem.** $f$ continuous on a **compact** $K$ ⇒ $f$ uniformly continuous on $K$.

**Practical consequence:** on $[a, b]$ closed bounded, **continuous ⇒ uniformly continuous**.

*Proof (by contradiction).* Continuous, not uniform: $\exists \varepsilon_0$ and $(x_n), (y_n)$ with $|x_n - y_n| < 1/n$, $|f(x_n) - f(y_n)| \ge \varepsilon_0$. By BW (compact), $x_{n_k} \to x^*$. Also $y_{n_k} \to x^*$. By continuity, $|f(x_{n_k}) - f(y_{n_k})| \to 0$. Contradiction. ∎

## Lipschitz functions

**Definition.** $f$ **Lipschitz** with constant $L$ if
$$|f(x) - f(y)| \le L |x - y|.$$

Lipschitz ⇒ uniformly continuous ($\delta = \varepsilon/L$). Strictly stronger.

**Examples:**
- $\sin x, \cos x$ Lipschitz with $L = 1$.
- $|x|$ Lipschitz with $L = 1$.
- $\sqrt x$ on $[0, 1]$ NOT Lipschitz (slope blows up at 0), but is uniformly continuous.

## Hölder functions

**Definition.** $f$ **Hölder with exponent $\alpha \in (0, 1]$** if
$$|f(x) - f(y)| \le C |x - y|^\alpha.$$

$\alpha = 1$ is Lipschitz. For $\alpha < 1$, "weaker".

**Hierarchy:** Lipschitz $\subset$ Hölder $\subset$ uniform $\subset$ continuous.

## Examples

**Uniformly continuous:**
- Continuous on compacts (Heine-Cantor).
- $\sin x$ on $\mathbb{R}$ (Lipschitz).
- $\sqrt x$ on $[0, +\infty)$.

**NOT uniformly continuous:**
- $x^2$ on $\mathbb{R}$.
- $1/x$ on $(0, 1]$.
- $\sin(1/x)$ on $(0, 1]$.

## Exercises

<details>
<summary>Exercise 1 — Lipschitz</summary>

Show $\sin x$ Lipschitz with $L = 1$.

**Solution.** $|\sin x - \sin y| = 2 |\sin((x-y)/2)| |\cos((x+y)/2)| \le 2 \cdot |x-y|/2 = |x - y|$. ∎
</details>

<details>
<summary>Exercise 2 — Not uniform on open interval</summary>

$1/x$ on $(0, 1]$.

**Solution.** $x_n = 1/n$, $y_n = 1/(n+1)$. $|x_n - y_n| \to 0$, $|f(x_n) - f(y_n)| = 1$. Not uniform. ∎
</details>

<details>
<summary>Exercise 3 — Heine-Cantor</summary>

Show $\sin(x^2)$ uniformly continuous on $[0, 10]$.

**Solution.** $[0, 10]$ compact, $\sin(x^2)$ continuous. Heine-Cantor. ∎
</details>

## One-line takeaway

**Uniform continuity** = same $\delta$ for all points (not point-by-point) — strictly stronger than continuity, but coincident on **compacts** (Heine-Cantor).
