---
title: "Criteri di convergenza per serie a termini positivi"
area: Serie
summary: "Per $a_n \\ge 0$, convergenza $\\iff$ somme parziali limitate. Catalogo dei criteri: **confronto**, **confronto asintotico**, **rapporto** (D'Alembert), **radice** (Cauchy), **condensazione**, **integrale**."
order: 46
level: intermedio
prereq:
  - "Serie numeriche (sez. 45)"
  - "Integrali impropri (sez. 43, per criterio integrale)"
tools:
  - "Rudin — *Principles*, cap. 3"
---

# Criteri di convergenza per serie positive

## Perché parlarne

Per $a_n \ge 0$, $S_n$ è **monotona non decrescente**. Per il teorema delle successioni monotone, ha sempre limite in $[0, +\infty]$.

> **Principio fondamentale.** Per serie a termini $\ge 0$: convergente $\iff$ somme parziali **limitate**. Altrimenti diverge a $+\infty$ (mai indeterminata).

Lo studio si riduce a **maggiorazioni**. Da qui la batteria di criteri.

## Criterio del confronto diretto

**Teorema.** $0 \le a_n \le b_n$ definitivamente. Allora:
1. $\sum b_n$ converge ⇒ $\sum a_n$ converge.
2. $\sum a_n$ diverge ⇒ $\sum b_n$ diverge.

*Dim.* $A_n \le B_n$ monotone non decrescenti; la limitatezza si trasferisce. ∎

**Esempi.**
- $\sum 1/(n^2+n) \le \sum 1/n^2$: converge.
- $\sum 1/\ln n \ge \sum 1/n$ ($\ln n \le n$): diverge.

## Criterio del confronto asintotico

**Teorema.** $a_n, b_n > 0$ definitivamente, $\lim a_n/b_n = \ell$.
- $\ell \in (0, +\infty)$: stesso carattere.
- $\ell = 0$ e $\sum b_n$ converge ⇒ $\sum a_n$ converge.
- $\ell = +\infty$ e $\sum b_n$ diverge ⇒ $\sum a_n$ diverge.

*Dim.* $\ell/2 \cdot b_n \le a_n \le 3\ell/2 \cdot b_n$ definitivamente; confronto. ∎

**Esempi.**
- $\sum \sin(1/n) \sim \sum 1/n$: diverge.
- $\sum (1-\cos(1/n)) \sim \sum 1/(2n^2)$: converge.
- $\sum (n+1)/(n^3-2) \sim 1/n^2$: converge.

## Criterio del rapporto (D'Alembert)

**Teorema.** $a_n > 0$, $\lim a_{n+1}/a_n = L$.
- $L < 1$: **converge**.
- $L > 1$: **diverge** ($a_n \to \infty$).
- $L = 1$: **inconcludente**.

*Dim.* $L < 1$: scegli $q$ con $L<q<1$; iterando $a_n \le C q^n$, confronto geometrica. $L>1$: $a_n \ge Cq^n \to \infty$. $L=1$: esempi $1/n$ (diverge) vs $1/n^2$ (converge). ∎

**Esempi.**
- $\sum n!/n^n$: rapporto $= (n/(n+1))^n \to 1/e < 1$. Converge.
- $\sum 2^n/n!$: rapporto $= 2/(n+1) \to 0$. Converge.

## Criterio della radice (Cauchy)

**Teorema.** $a_n \ge 0$, $\lim \sqrt[n]{a_n} = L$ (o $\limsup$).
- $L < 1$: converge. $L > 1$: diverge. $L = 1$: inconcludente.

*Dim.* $L<1$: $a_n \le q^n$ definitivamente. $L>1$: sottosucc. con $a_{n_k} \ge 1$. ∎

**Esempi.**
- $\sum (1-1/n)^{n^2}$: $\sqrt[n]{a_n} = (1-1/n)^n \to 1/e$. Converge.
- $\sum (n/(2n+1))^n$: $\to 1/2$. Converge.

### Confronto rapporto vs radice

**Lemma.** Se $\lim a_{n+1}/a_n = L$ esiste, allora anche $\lim \sqrt[n]{a_n} = L$. Quindi **radice $\supseteq$ rapporto**.

## Criterio di condensazione (Cauchy)

**Teorema.** $a_n \ge 0$ **decrescente**. Allora
$$\sum_{n=1}^\infty a_n \text{ converge} \iff \sum_{k=0}^\infty 2^k a_{2^k} \text{ converge}.$$

> **Glossarietto:**
>
> - $a_{2^k}$ = termine indicizzato da potenza di 2.
> - Idea: blocchi $[2^k, 2^{k+1})$ hanno $2^k$ termini, ciascuno $\sim a_{2^k}$.

*Dim. (sketch).* Raggruppo: $S_{2^{m+1}-1} \le T_m$ (per maggiorazione) e $S_{2^{m+1}} \ge (T_{m+1}-a_1)/2$. ∎

**Applicazione 1 (armonica generalizzata).** $a_n = 1/n^\alpha$: $2^k a_{2^k} = (2^{1-\alpha})^k$, geometrica. **Converge $\iff \alpha > 1$**.

**Applicazione 2 (Bertrand).** $\sum 1/(n(\ln n)^\beta)$: condensando, $\sum 1/(k^\beta (\ln 2)^\beta)$. **Converge $\iff \beta > 1$**.

## Criterio integrale (Cauchy-Maclaurin)

**Teorema.** $f: [1,\infty) \to [0,\infty)$ continua, decrescente. Allora
$$\sum_{n=1}^\infty f(n) \text{ converge} \iff \int_1^\infty f(x)\,dx \text{ converge}.$$

*Dim.* $f$ decrescente: $f(k+1) \le \int_k^{k+1} f \le f(k)$. Sommando: doppia limitatezza simultanea. ∎

**Esempio.** $\sum 1/(n \ln n)$: $\int dx/(x\ln x) = \ln\ln x \to \infty$. **Diverge**.

## Tabella diagnostica

| Forma di $a_n$ | Criterio consigliato |
|---|---|
| Polinomi e potenze: $1/n^\alpha$, $1/(n^2+1)$ | confronto asintotico con $1/n^\alpha$ |
| Esponenziali, fattoriali: $q^n$, $n^k/n!$ | rapporto |
| In $n$-esima potenza: $(f(n))^n$ | radice |
| Logaritmi nel denominatore | condensazione o integrale |
| $\sin(1/n), \ln(1+1/n)$ | confronto asintotico (Taylor) |

## Strategia pratica

1. **Controlla $a_n \to 0$**. Se no, diverge.
2. **Riconosci la famiglia**: polinomiale? esponenziale-fattoriale? logaritmica?
3. **Asintotico** per polinomiali.
4. **Rapporto/radice** per fattoriali/esponenziali.
5. **Condensazione/integrale** per logaritmi.

## Esercizi

<details>
<summary>Esercizio 1 — Razionalizzazione</summary>

$\sum \frac{\sqrt{n+1}-\sqrt n}{n}$. Razionalizzo: $\sqrt{n+1}-\sqrt n = 1/(\sqrt{n+1}+\sqrt n) \sim 1/(2\sqrt n)$. $a_n \sim 1/(2n^{3/2})$, $\alpha=3/2 > 1$: **converge**. ∎
</details>

<details>
<summary>Esercizio 2 — Rapporto su fattoriali</summary>

$\sum \frac{(n!)^2}{(2n)!}$. Rapporto $= \frac{(n+1)^2}{(2n+1)(2n+2)} \to 1/4 < 1$: **converge**. ∎
</details>

<details>
<summary>Esercizio 3 — Radice indispensabile</summary>

$\sum \left(\frac{n}{n+1}\right)^{n^2}$. Radice: $(n/(n+1))^n \to 1/e < 1$: **converge**. ∎
</details>

<details>
<summary>Esercizio 4 — Stirling</summary>

$\sum \frac{n^n}{n! \cdot e^n}$. Stirling: $n! \sim n^n e^{-n}\sqrt{2\pi n}$, quindi $a_n \sim 1/\sqrt{2\pi n}$. $\alpha=1/2$: **diverge**. ∎
</details>

## Riassunto in una riga

Per serie positive convergenza $=$ somme parziali limitate; **confronto/asintotico** per polinomiali, **rapporto/radice** per fattoriali/esponenziali, **condensazione/integrale** per logaritmi — armonica generalizzata $\sum 1/n^\alpha$ converge sse $\alpha>1$, Bertrand $\sum 1/(n\ln^\beta n)$ sse $\beta>1$.
