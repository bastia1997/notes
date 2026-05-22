---
title: "Serie a segno qualunque, Leibniz, convergenza assoluta"
area: Serie
summary: "Per termini di segno variabile i criteri positivi non bastano. **Leibniz** per alternate, **convergenza assoluta** (più forte della semplice), **Riemann** sui riarrangiamenti, **Dirichlet** e **Abel**."
order: 47
level: intermedio
prereq:
  - "Criteri positivi (sez. 46)"
  - "Sommazione per parti (Abel)"
tools:
  - "Rudin — *Principles*, cap. 3"
---

# Serie a segno qualunque

## Perché parlarne

Per $a_n \ge 0$, convergenza = somme limitate. Tutto questo **crolla** se i termini cambiano segno: c'è la possibilità di **compensazione** tra positivi e negativi.

Esempio paradigmatico: $\sum (-1)^{n+1}/n = 1 - 1/2 + 1/3 - \dots$ **converge** (a $\ln 2$), ma $\sum 1/n$ **diverge**.

## Criterio di Leibniz

**Definizione.** **Alternata** = $\sum (-1)^n b_n$ con $b_n \ge 0$.

**Teorema (Leibniz, 1682).** Sia $(b_n)$ con:
1. $b_n \ge 0$;
2. $b_n$ definitivamente **decrescente** ($b_{n+1} \le b_n$);
3. $b_n \to 0$.

Allora $\sum (-1)^{n+1} b_n$ **converge**, e
$$|S - S_n| \le b_{n+1}.$$

> **Glossarietto:**
>
> - **Stima del resto** $\le b_{n+1}$ è preziosa per stime numeriche.

*Dim.* $(S_{2k})$ crescente, $(S_{2k+1})$ decrescente, entrambe limitate da $b_1$; $S_{2k+1} - S_{2k} = b_{2k+1} \to 0$. Stesso limite $S$. ∎

**Esempi.**
- $\sum (-1)^{n+1}/n$: $b_n = 1/n \searrow 0$. Converge a $\ln 2$.
- $\sum (-1)^n/\ln n$ ($n \ge 2$): $b_n = 1/\ln n \searrow 0$. Converge.

> **Attenzione:** la decrescenza è essenziale. Senza, possono esserci patologie.

## Convergenza assoluta

**Definizione.** $\sum a_n$ **assolutamente convergente** se $\sum |a_n|$ converge.

**Definizione.** **Semplicemente** (o **condizionatamente**) convergente se converge ma non assolutamente.

**Teorema.** Convergenza assoluta ⇒ convergenza.

*Dim. 1 (Cauchy).* $|\sum_{k=n}^m a_k| \le \sum_{k=n}^m |a_k| < \varepsilon$. Cauchy per $\sum a_n$. ∎

*Dim. 2 (decomposizione).* $a_n^+ = \max(a_n,0)$, $a_n^- = \max(-a_n,0)$. $a_n = a_n^+ - a_n^-$, $|a_n| = a_n^+ + a_n^-$, $0 \le a_n^\pm \le |a_n|$. Per confronto convergono; per linearità $\sum a_n$ converge. ∎

**Esempi.**
- $\sum (-1)^n/n^2$: **assolutamente** convergente.
- $\sum (-1)^{n+1}/n$: **condizionatamente** convergente.

### Implicazioni pratiche

Con **assoluta convergenza** sono leciti:
1. **Riarrangiamenti** (cambio di ordine).
2. Raggruppamenti.
3. Prodotti alla Cauchy.

Con **semplice** convergenza, **nessuna** è automatica.

## Teorema di Riemann sui riarrangiamenti

**Teorema (Riemann, 1854).** Sia $\sum a_n$ **semplicemente convergente**. Per ogni $L \in \mathbb{R} \cup \{\pm\infty\}$ esiste una **permutazione** $\sigma$ tale che $\sum a_{\sigma(n)} = L$. Esiste anche $\sigma$ che la rende indeterminata.

*Sketch.* $p_k$ = positivi, $q_k$ = $|$negativi$|$. Semplice convergenza ⇒ $\sum p_k = \sum q_k = \infty$, ma $p_k, q_k \to 0$. Aggiungi positivi finché superi $L$, poi negativi finché scendi sotto, ripeti. ∎

> **Lezione:** sommare infiniti numeri non è commutativo. Conditional + permutazione = qualunque somma.

## Criterio di Dirichlet

Generalizza Leibniz: somme parziali limitate × decrescente a zero.

**Teorema.** Siano $(a_n), (b_n)$ con:
1. $A_n = \sum_{k=1}^n a_k$ **limitate**: $|A_n| \le M$;
2. $(b_n)$ **decrescente** e $b_n \to 0$.

Allora $\sum a_n b_n$ converge.

**Strumento — Sommazione per parti (Abel):**
$$\sum_{k=m}^n a_k b_k = A_n b_n - A_{m-1} b_m + \sum_{k=m}^{n-1} A_k (b_k - b_{k+1}).$$

*Dim.* Abel + limitatezza: $|\sum_m^n a_k b_k| \le 2Mb_m \to 0$. Cauchy. ∎

**Esempio.** $\sum \sin(n\theta)/n$ per $\theta \ne 2k\pi$: somme di $\sin(n\theta)$ limitate, $1/n \searrow 0$: converge.

## Criterio di Abel

**Teorema.** Se $\sum a_n$ converge e $(b_n)$ è **monotona e limitata**, allora $\sum a_n b_n$ converge.

*Idea.* $b_n \to L$: $b_n = L + (b_n-L)$, parte costante converge per ipotesi, residuo per Dirichlet. ∎

**Esempio.** $\sum (-1)^n/n \cdot \arctan n$: $\sum (-1)^n/n$ converge, $\arctan n$ crescente limitata. Converge.

## Riepilogo operativo

| Situazione | Strumento |
|---|---|
| $a_n \ge 0$ | criteri positivi (sez. 46) |
| Alternata con $|a_n| \searrow 0$ | Leibniz |
| Generale | studia prima $\sum |a_n|$ |
| $\sum |a_n|$ converge | assoluta (e quindi semplice) |
| $\sum |a_n|$ diverge, segno non alterno | Dirichlet/Abel |

## Esercizi

<details>
<summary>Esercizio 1 — Leibniz con stima</summary>

$\sum (-1)^{n+1}/n^2$. $b_n=1/n^2 \searrow 0$: converge (anzi assolutamente). Stima: $|S - S_{10}| \le 1/121 \approx 0.0083$. ∎
</details>

<details>
<summary>Esercizio 2 — Condizionalmente convergente</summary>

$\sum (-1)^n/(n\ln n)$ ($n\ge 2$). $1/(n\ln n) \searrow 0$: Leibniz dà convergenza. $\sum 1/(n\ln n)$ diverge (Bertrand): **condizionatamente convergente**. ∎
</details>

<details>
<summary>Esercizio 3 — Dirichlet trigonometrico</summary>

$\sum \cos(n\pi/3)/n$. $A_n = \sum \cos(k\pi/3)$ periodiche di periodo 6, limitate. $1/n \searrow 0$: Dirichlet. Converge. ∎
</details>

<details>
<summary>Esercizio 4 — Abel</summary>

$\sum a_n$ convergente ⇒ $\sum a_n \cdot n/(n+1)$ converge.

*Dim.* $n/(n+1)$ crescente, limitata $\le 1$. Abel. ∎
</details>

## Riassunto in una riga

**Leibniz** per alternate con $|a_n| \searrow 0$; **assoluta convergenza** ($\sum|a_n|<\infty$) è più forte della semplice e permette riarrangiamenti; **Riemann** dimostra che le condizionali sono fragilissime (riarrangia a piacere); **Dirichlet/Abel** estendono Leibniz via sommazione per parti.
