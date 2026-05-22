---
title: "Serie di potenze e raggio di convergenza"
area: Serie
summary: "$\\sum a_n (x-x_0)^n$. Esiste sempre un **raggio** $R \\in [0, +\\infty]$: converge per $|x-x_0|<R$, diverge per $|x-x_0|>R$. **Cauchy-Hadamard**, derivazione/integrazione termine a termine, bordi caso per caso."
order: 48
level: intermedio
prereq:
  - "Serie numeriche (sez. 45-47)"
  - "Successioni e $\\limsup$"
tools:
  - "Rudin — *Principles*, cap. 8"
---

# Serie di potenze e raggio di convergenza

## Perché parlarne

Finora ogni $a_n$ era un numero. Ora consideriamo serie dipendenti da $x$. La più "rigida" e fondamentale è la **serie di potenze**.

**Definizione.** Una **serie di potenze** centrata in $x_0$ è
$$\sum_{n=0}^\infty a_n (x - x_0)^n.$$

> **Glossarietto:**
>
> - $a_n \in \mathbb{R}$ = **coefficienti**.
> - $x_0$ = **centro**.
> - In $x$ fissato è una serie numerica; convergenza dipende da $x$.

Senza perdita di generalità $x_0 = 0$.

## Teorema di Abel (struttura geometrica)

**Teorema (Abel, 1826).** Se $\sum a_n x_1^n$ converge in $x_1 \ne 0$, allora $\sum a_n x^n$ converge **assolutamente** per $|x| < |x_1|$.

*Dim.* $a_n x_1^n \to 0$, limitata: $|a_n x_1^n| \le M$. Posto $r = |x/x_1| < 1$:
$$|a_n x^n| \le M r^n.$$
Geometrica + confronto. ∎

**Corollario.** Esiste $R \in [0, +\infty]$ tale che la serie converge per $|x|<R$, diverge per $|x|>R$. $R$ = **raggio di convergenza**.

> **Bordi $|x| = R$:** caso per caso (convergenza assoluta, semplice, o divergenza).

## Cauchy-Hadamard

**Teorema.** Il raggio è
$$\frac{1}{R} = \limsup_{n\to\infty} \sqrt[n]{|a_n|}.$$
(Convenzioni: $1/0 = +\infty$, $1/\infty = 0$.)

*Dim.* Criterio della radice: $\limsup \sqrt[n]{|a_n x^n|} = |x|/R$. Converge se $<1$, diverge se $>1$. ∎

**Formula via rapporto** (se il limite esiste):
$$\frac{1}{R} = \lim_{n\to\infty} \left|\frac{a_{n+1}}{a_n}\right|.$$

In pratica: rapporto è più semplice; Hadamard serve quando il rapporto oscilla.

## Esempi paradigmatici

| Serie | $R$ | Bordi | Somma |
|---|---|---|---|
| $\sum x^n$ | 1 | $x=1$ diverge, $x=-1$ indeterm. | $1/(1-x)$ |
| $\sum x^n/n$ | 1 | $x=1$ diverge, $x=-1$ converge | $-\ln(1-x)$ |
| $\sum x^n/n^2$ | 1 | converge assolutamente $\pm 1$ | — |
| $\sum x^n/n!$ | $+\infty$ | — | $e^x$ |
| $\sum n! x^n$ | 0 | — | solo in 0 |

## Convergenza uniforme su compatti

**Teorema.** Per ogni $r$ con $0 < r < R$, $\sum a_n x^n$ converge **uniformemente** su $[-r, r]$.

*Dim. (Weierstrass M-test).* $|a_n x^n| \le |a_n| r^n$ con $\sum |a_n| r^n < \infty$. ∎

**Conseguenze:**
- $f(x) = \sum a_n x^n$ è **continua** su $(-R, R)$.
- Integrabile termine a termine.
- Derivabile termine a termine.

> **Cautela:** convergenza uniforme su **compatti** $\subset (-R,R)$, non sull'intero intervallo aperto.

## Derivazione e integrazione termine a termine

**Teorema.** $\sum a_n x^n$ con raggio $R > 0$:
1. $\sum n a_n x^{n-1}$ ha **stesso raggio** $R$.
2. $f'(x) = \sum n a_n x^{n-1}$ su $(-R, R)$.
3. $\int_0^x f = \sum a_n x^{n+1}/(n+1)$ ha raggio $R$.
4. $f \in C^\infty(-R, R)$.

*Dim. (parte 1).* $\sqrt[n]{n|a_n|} = \sqrt[n]{n}\sqrt[n]{|a_n|}$, $\sqrt[n]{n} \to 1$. ∎

**Corollario (unicità).** Se due serie coincidono in un intorno di 0, hanno gli stessi coefficienti: $a_n = f^{(n)}(0)/n!$.

## Teorema di Abel al bordo

**Teorema.** Se $\sum a_n R^n$ converge, allora $\lim_{x \to R^-} \sum a_n x^n = \sum a_n R^n$.

**Applicazioni notevoli:**

- $\ln(1+x) = \sum (-1)^{n+1} x^n/n$ per $|x|<1$. In $x=1$: $\sum (-1)^{n+1}/n$ converge (Leibniz). Per Abel:
$$\sum_{n=1}^\infty \frac{(-1)^{n+1}}{n} = \ln 2.$$

- $\arctan x = \sum (-1)^n x^{2n+1}/(2n+1)$. In $x=1$: $\sum (-1)^n/(2n+1)$ converge. Per Abel:
$$\sum_{n=0}^\infty \frac{(-1)^n}{2n+1} = \frac{\pi}{4} \quad \text{(Leibniz-Madhava)}.$$

## Aritmetica delle serie di potenze

Per $f = \sum a_n x^n$, $g = \sum b_n x^n$, raggi $R_f, R_g$, $R = \min(R_f, R_g)$:

- **Somma:** $f+g = \sum (a_n+b_n) x^n$, raggio $\ge R$.
- **Prodotto (Cauchy):** $f \cdot g = \sum c_n x^n$ con $c_n = \sum_{k=0}^n a_k b_{n-k}$.
- **Quoziente:** se $g(0) \ne 0$, $1/g$ è serie di potenze in un intorno di 0.
- **Composizione:** se $g(0) = 0$, $f \circ g$ è serie di potenze in un intorno di 0.

## Sviluppi notevoli derivati

- $1/(1-x)^2 = \sum_{n=0}^\infty (n+1) x^n$ (derivata di geometrica).
- $\arctan x = \sum (-1)^n x^{2n+1}/(2n+1)$ (integrazione di $1/(1+x^2) = \sum (-1)^n x^{2n}$).
- $-\ln(1-x) = \sum x^n/n$ (integrazione di geometrica).

## Esercizi

<details>
<summary>Esercizio 1 — Raggio standard</summary>

$\sum \binom{2n}{n} x^n$. Rapporto: $\frac{(2n+2)(2n+1)}{(n+1)^2} \to 4$. $R = 1/4$. ∎
</details>

<details>
<summary>Esercizio 2 — Hadamard ineludibile</summary>

$a_n = 2^n$ se pari, $3^n$ se dispari. Rapporto oscilla. Hadamard: $\sqrt[n]{|a_n|}$ vale 2 o 3; $\limsup = 3$. $R = 1/3$. ∎
</details>

<details>
<summary>Esercizio 3 — Somma in forma chiusa</summary>

$\sum n x^n$ per $|x|<1$:
$$= x \frac{d}{dx}\sum x^n = x \frac{d}{dx}\frac{1}{1-x} = \frac{x}{(1-x)^2}. \qquad ∎$$
</details>

<details>
<summary>Esercizio 4 — Abel al bordo</summary>

$\sum (-1)^n/(2n+1) = \pi/4$ via $\arctan x$ + Abel. ∎
</details>

<details>
<summary>Esercizio 5 — Centratura traslata</summary>

$1/x$ centrato in $x_0 = 1$: $1/x = 1/(1+(x-1)) = \sum (-1)^n (x-1)^n$ per $|x-1|<1$. $R = 1$. ∎
</details>

## Riassunto in una riga

Ogni serie di potenze ha un **raggio** $R$ (Cauchy-Hadamard: $1/R = \limsup\sqrt[n]{|a_n|}$); converge assolutamente in $(-R,R)$ e uniformemente sui compatti dentro; **derivazione/integrazione termine a termine** preservano il raggio; bordi caso per caso; **Abel al bordo** lega serie a somme.
