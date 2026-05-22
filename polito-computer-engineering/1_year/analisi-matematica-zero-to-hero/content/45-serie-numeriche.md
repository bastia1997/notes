---
title: "Serie numeriche: definizione e convergenza"
area: Serie
summary: "Sommare **infiniti** termini = limite di somme parziali. **Geometrica** (forma chiusa), **armonica** (diverge lentamente), **armonica generalizzata**. Condizione necessaria $a_n \\to 0$. Telescopiche, criterio di Cauchy."
order: 45
level: intermedio
prereq:
  - "Successioni e limiti (sez. 11-15)"
  - "Completezza di $\\mathbb{R}$, Cauchy"
tools:
  - "Rudin — *Principles*, cap. 3"
---

# Serie numeriche: definizione e convergenza

## Perché parlarne

Sommare un numero **finito** di termini è banale. Sommare **infiniti** termini è un'operazione **analitica**: bisogna decidere cosa significa $a_1 + a_2 + \dots$, e questa decisione passa per il **limite**.

Già Zenone si chiedeva come fosse possibile coprire una distanza con $1/2 + 1/4 + 1/8 + \dots$. La risposta moderna: somma di infiniti termini = **limite di somme finite**.

## Definizione

**Definizione.** Sia $(a_n)$ successione reale. La **successione delle somme parziali** è
$$S_n := \sum_{k=1}^n a_k.$$
La **serie** $\sum_{n=1}^\infty a_n$ si identifica con $(S_n)$.

> **Glossarietto:**
>
> - $a_n$ = termine generale.
> - $S_n$ = $n$-esima somma parziale.
> - $\sum_{n=1}^\infty a_n$ = la serie (o, ambiguamente, la sua somma se esiste).

**Carattere.**

- **Convergente** se $S_n \to S \in \mathbb{R}$. Allora $S = \sum a_n$ è la **somma**.
- **Divergente** se $S_n \to \pm\infty$.
- **Indeterminata** se $\lim S_n$ non esiste in $\overline{\mathbb{R}}$.

## Serie geometrica

**Teorema.** $\sum_{n=0}^\infty q^n$:
- $|q| < 1$: converge a $1/(1-q)$.
- $q \ge 1$: diverge a $+\infty$.
- $q \le -1$: indeterminata.

*Dim.* $S_n = (1-q^{n+1})/(1-q)$ per $q \ne 1$.
- $|q|<1$: $q^{n+1} \to 0$, $S_n \to 1/(1-q)$.
- $q=1$: $S_n = n+1 \to \infty$.
- $q>1$: $S_n \to \infty$.
- $q=-1$: $S_n$ oscilla $1,0,1,0,\dots$.
- $q<-1$: oscilla con ampiezza crescente. ∎

**Esempi.**
- $\sum (1/2)^n = 2$. (Risolve Zenone: $1/2 + 1/4 + \dots = 1$.)
- $\sum (-1/3)^n = 3/4$.

## Serie armonica

**Teorema (Oresme).** $\sum 1/n$ **diverge** a $+\infty$.

*Dim. (Oresme).* Raggruppa per potenze di 2: blocco da $1/(2^{j-1}+1)$ a $1/2^j$ ha $2^{j-1}$ termini, ciascuno $\ge 1/2^j$, somma $\ge 1/2$:
$$S_{2^k} \ge 1 + k/2 \to \infty. \qquad ∎$$

**Asintotica.** $H_n = \sum_{k=1}^n 1/k = \ln n + \gamma + o(1)$, $\gamma \approx 0.5772$ (costante di Eulero-Mascheroni).

## Serie armonica generalizzata

**Teorema.** $\sum 1/n^\alpha$ converge $\iff \alpha > 1$.

(Dimostrazione completa via criterio integrale, sez. 46.)

| $\alpha$ | Carattere | Valore notevole |
|---|---|---|
| $\le 0$ | diverge (termini non infinitesimi) | — |
| $0 < \alpha \le 1$ | diverge | $\sum 1/n$, $\sum 1/\sqrt n$ |
| $\alpha > 1$ | converge | $\zeta(2) = \pi^2/6$, $\zeta(4) = \pi^4/90$ |

## Condizione necessaria

**Teorema.** $\sum a_n$ converge $\Rightarrow$ $a_n \to 0$.

*Dim.* $S_n \to S$ e $S_{n-1} \to S$, quindi $a_n = S_n - S_{n-1} \to 0$. ∎

> **Attenzione:** è **necessario ma non sufficiente**. $\sum 1/n$ ha $a_n \to 0$ ma diverge.

**Uso pratico.** Se $a_n \not\to 0$, la serie sicuramente **non converge**.

## Linearità

**Teorema.** $\sum a_n \to A$, $\sum b_n \to B$, $\lambda, \mu \in \mathbb{R}$. Allora $\sum (\lambda a_n + \mu b_n) = \lambda A + \mu B$.

## Serie telescopiche

**Definizione.** $\sum a_n$ è **telescopica** se $a_n = b_n - b_{n+1}$.

**Formula.** $S_n = b_1 - b_{n+1}$ (cancellazione a cascata).

**Esempio.** $\sum_{n=1}^\infty \frac{1}{n(n+1)}$. Decomp.: $\frac{1}{n(n+1)} = \frac{1}{n} - \frac{1}{n+1}$:
$$S_n = 1 - \frac{1}{n+1} \to 1.$$

## Criterio di Cauchy

**Teorema.** $\sum a_n$ converge $\iff$ $\forall \varepsilon > 0,\ \exists N$: $\forall m \ge n \ge N$:
$$\left|\sum_{k=n}^m a_k\right| < \varepsilon.$$

*Dim.* $(S_n)$ è di Cauchy $\iff$ converge ($\mathbb{R}$ completo). ∎

## Esercizi

<details>
<summary>Esercizio 1 — Geometriche miste</summary>

$\sum_{n=0}^\infty \frac{2^n + 3^n}{5^n} = \frac{1}{1-2/5} + \frac{1}{1-3/5} = \frac{5}{3} + \frac{5}{2} = \frac{25}{6}$. ∎
</details>

<details>
<summary>Esercizio 2 — Telescopica triplice</summary>

$\sum \frac{1}{n(n+1)(n+2)}$. Decomp.: $= \frac{1}{2}[\frac{1}{n(n+1)} - \frac{1}{(n+1)(n+2)}]$, telescopica. Somma $= 1/4$. ∎
</details>

<details>
<summary>Esercizio 3 — Termine non infinitesimo</summary>

$\sum \frac{n^2+1}{2n^2-5}$. $a_n \to 1/2 \ne 0$ → **diverge**. ∎
</details>

<details>
<summary>Esercizio 4 — Resti</summary>

Se $\sum a_n = S$, il **resto** $R_n = \sum_{k=n+1}^\infty a_k$ soddisfa $R_n \to 0$.

*Dim.* $R_n = S - S_n \to 0$. ∎
</details>

## Riassunto in una riga

Una **serie** è il limite delle somme parziali; **geometrica** converge a $1/(1-q)$ per $|q|<1$, **armonica** diverge come $\ln n$, **armonica generalizzata** converge sse $\alpha > 1$; $a_n \to 0$ è necessario ma non sufficiente; telescopiche e Cauchy sono gli strumenti base.
