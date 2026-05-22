---
title: "Limite superiore, limite inferiore, sottosuccessioni"
area: Successioni
summary: "Una successione qualunque (anche oscillante) ha **sempre** due 'spalle asintotiche' — $\\liminf$ e $\\limsup$ — il più piccolo e il più grande dei limiti delle sottosuccessioni. Lo strumento universale per parlare di limiti anche quando il limite 'vero' non esiste."
order: 16
level: avanzato
prereq:
  - "Successioni e limiti (sez. 11)"
  - "Monotone e Bolzano-Weierstrass (sez. 13)"
  - "Topologia di R (sez. 10)"
tools:
  - "Rudin — *Principles*, cap. 3"
  - "Apostol — *Mathematical Analysis*"
---

# Limite superiore, limite inferiore, sottosuccessioni

## Perché parlarne

Una successione qualunque può **non avere limite**, ma ha **sempre** $\liminf$ e $\limsup$ in $\overline{\mathbb{R}}$. Sono le sue due "spalle asintotiche" — il più piccolo e il più grande dei limiti di sottosuccessioni. Servono a:

- formulare un criterio di convergenza generale: "$(a_n)$ converge $\iff$ $\liminf = \limsup$";
- studiare serie (criterio della radice $n$-esima, cap. 46);
- formalizzare la nozione di "oscillazione asintotica" anche per successioni irregolari.

Una volta digeriti, $\liminf$ e $\limsup$ sono lo strumento universale per ragionare con limiti **senza dover prima dimostrare l'esistenza**.

## Intuizione

Pensa a $a_n = (-1)^n = 1, -1, 1, -1, \dots$. Non converge, ma "in basso" insiste su $-1$, "in alto" su $+1$.
- $\liminf = -1$ (il limite della "metà bassa").
- $\limsup = +1$ (il limite della "metà alta").

Più in generale: guarda la **coda** $\{a_n, a_{n+1}, a_{n+2}, \dots\}$. Più $n$ è grande, più la coda è piccola.
- Il **sup della coda** decresce (togliendo elementi, il sup non può aumentare).
- L'**inf della coda** cresce.

I loro limiti sono $\limsup$ e $\liminf$.

## Definizione via sup/inf di code

Sia $(a_n)$ una successione reale. Per ogni $n$ definiamo:

$$S_n := \sup_{k \ge n} a_k \in \overline{\mathbb{R}}, \qquad I_n := \inf_{k \ge n} a_k \in \overline{\mathbb{R}}.$$

> **Glossarietto:**
>
> - $\sup_{k \ge n} a_k$ = "il sup degli $a_k$ per $k$ a partire da $n$" — il sup della coda da $n$ in poi.
> - $S_n$ è **decrescente** in $n$: passando da $n$ a $n + 1$ togliamo l'elemento $a_n$, quindi il sup non aumenta.
> - $I_n$ è **crescente**: simmetricamente.

Definiamo allora:
$$\limsup_{n \to \infty} a_n := \lim_{n \to \infty} S_n = \inf_n S_n,$$
$$\liminf_{n \to \infty} a_n := \lim_{n \to \infty} I_n = \sup_n I_n.$$

> **Esistenza garantita.** $(S_n)$ è decrescente, quindi ha limite in $\overline{\mathbb{R}}$ (cap. 13, Teorema 1). Idem $(I_n)$ è crescente. Quindi $\liminf$ e $\limsup$ **esistono sempre**.

## Definizione via sottosuccessioni

Sia $E := \{L \in \overline{\mathbb{R}} : \exists\, a_{n_k} \to L\}$ l'insieme dei **limiti subsequenziali** di $(a_n)$.

> **Teorema (caratterizzazione).** $\limsup a_n = \sup E = \max E$, $\liminf a_n = \inf E = \min E$, e $E \ne \emptyset$.

Dimostrazione fra poco. Ma l'intuizione è già chiara: $\limsup$ è il "limite più alto possibile" lungo una sottosuccessione, $\liminf$ il più basso.

### Casi limite

- $a_n \to +\infty$ $\iff$ $\liminf = \limsup = +\infty$.
- $a_n \to -\infty$ $\iff$ $\liminf = \limsup = -\infty$.
- $a_n \to L \in \mathbb{R}$ $\iff$ $\liminf = \limsup = L$.

> **La convergenza è esattamente l'uguaglianza dei due.**

## Teoremi

### Teorema 1 — Relazione fondamentale

> $\liminf a_n \le \limsup a_n$ sempre.
> Inoltre $\limsup(-a_n) = -\liminf a_n$.

*Dim.* Per ogni $n$, $I_n \le S_n$ (inf $\le$ sup). Passando al limite: $\liminf = \lim I_n \le \lim S_n = \limsup$. ∎

### Teorema 2 — Convergenza

> $(a_n)$ converge in $\overline{\mathbb{R}}$ a $L$ $\iff$ $\liminf a_n = \limsup a_n = L$.

*Dim.*

$(\Rightarrow)$ Sia $a_n \to L \in \mathbb{R}$. Dato $\varepsilon > 0$, $\exists N : |a_n - L| < \varepsilon$ per $n \ge N$. Per $n \ge N$, $L - \varepsilon \le I_n \le a_n \le S_n \le L + \varepsilon$, quindi $|I_n - L|, |S_n - L| \le \varepsilon$. Passando al limite, $\liminf = \limsup = L$.

$(\Leftarrow)$ Supponiamo $\liminf = \limsup = L$. Dato $\varepsilon > 0$, $\exists N$ con $L - \varepsilon < I_N \le S_N < L + \varepsilon$. Per $n \ge N$, $I_N \le I_n \le a_n \le S_n \le S_N$, quindi $|a_n - L| < \varepsilon$. ∎

### Teorema 3 — $\varepsilon$-caratterizzazione del limsup

> $L^* = \limsup a_n \in \mathbb{R}$ $\iff$:
>
> **(a)** $\forall \varepsilon > 0$: **definitivamente** $a_n < L^* + \varepsilon$.
> **(b)** $\forall \varepsilon > 0$: **frequentemente** $a_n > L^* - \varepsilon$.

> **Mnemonico.** $\limsup$ è "**definitivamente sotto $L^* + \varepsilon$, frequentemente sopra $L^* - \varepsilon$**".
>
> **Glossarietto:**
> - "**Definitivamente**" = "da un certo $N$ in poi, per tutti gli $n$".
> - "**Frequentemente**" = "infinite volte" (esistono infiniti $n$ per cui vale).

(Versione duale per $\liminf$: "definitivamente sopra, frequentemente sotto".)

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">aₙ oscillante: limsup vs liminf</text>
  <line x1="50" y1="240" x2="580" y2="240" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="40" x2="50" y2="260" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="80" x2="580" y2="80" stroke="#d4af37" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="555" y="76" fill="#d4af37" font-family="ui-monospace" font-size="11">limsup</text>
  <line x1="50" y1="200" x2="580" y2="200" stroke="#6aa9d8" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="555" y="216" fill="#6aa9d8" font-family="ui-monospace" font-size="11">liminf</text>
  <rect x="50" y="80" width="530" height="120" fill="#e8a04a" fill-opacity="0.06"/>
  <g fill="#6fb38a">
    <circle cx="90" cy="90" r="4"/>
    <circle cx="120" cy="195" r="4"/>
    <circle cx="160" cy="85" r="4"/>
    <circle cx="200" cy="205" r="4"/>
    <circle cx="240" cy="87" r="4"/>
    <circle cx="280" cy="198" r="4"/>
    <circle cx="320" cy="82" r="4"/>
    <circle cx="360" cy="203" r="4"/>
    <circle cx="400" cy="84" r="4"/>
    <circle cx="440" cy="200" r="4"/>
    <circle cx="480" cy="83" r="4"/>
    <circle cx="520" cy="201" r="4"/>
  </g>
  <text x="50" y="290" fill="#f3eed9" font-family="ui-monospace" font-size="11">limsup = limite del sup delle code (max limite subsequenziale)</text>
  <text x="50" y="305" fill="#f3eed9" font-family="ui-monospace" font-size="11">liminf = limite dell'inf delle code (min limite subsequenziale)</text>
</svg>
<div class="chart-caption">La banda fra $\liminf$ e $\limsup$ è la "zona di oscillazione asintotica" della successione.</div>
</div>

### Teorema 4 — Operazioni (con cautela)

> Per $(a_n), (b_n)$:
> (i) $\limsup(a_n + b_n) \le \limsup a_n + \limsup b_n$.
> (ii) $\liminf(a_n + b_n) \ge \liminf a_n + \liminf b_n$.
> (iii) Se $(a_n)$ converge ad $A \in \mathbb{R}$: $\limsup(a_n + b_n) = A + \limsup b_n$.
> (iv) Per $a_n, b_n \ge 0$: $\limsup(a_n b_n) \le \limsup a_n \cdot \limsup b_n$.

> **Attenzione: in (i) e (ii) la disuguaglianza può essere stretta.** Esempio: $a_n = (-1)^n$, $b_n = -(-1)^n$. $\limsup a = \limsup b = 1$, ma $a_n + b_n = 0$, $\limsup = 0 < 2$.

## Esempi guidati

### Esempio 1 — $a_n = (-1)^n$

Code: ogni coda contiene sia $+1$ sia $-1$. $S_n = 1$, $I_n = -1$ per ogni $n$. Quindi $\limsup = 1$, $\liminf = -1$, non converge.

Sottosuccessioni: $a_{2k} \to 1$, $a_{2k+1} \to -1$. $E = \{-1, 1\}$, $\max E = 1$, $\min E = -1$. ✓

### Esempio 2 — $a_n = \sin(n \pi / 3)$

Periodico di periodo 6, valori $\{0, \sqrt 3/2, \sqrt 3/2, 0, -\sqrt 3/2, -\sqrt 3/2\}$. $E = \{-\sqrt 3/2, 0, \sqrt 3/2\}$, $\limsup = \sqrt 3/2$, $\liminf = -\sqrt 3/2$.

### Esempio 3 — $a_n = (1 + (-1)^n) n$

$a_{2k} = 4k \to +\infty$, $a_{2k+1} = 0$. $E = \{0, +\infty\}$, $\limsup = +\infty$, $\liminf = 0$.

### Esempio 4 — $a_n = \sin n$ (in radianti)

Si dimostra che $\{n \bmod 2\pi : n \in \mathbb{N}\}$ è denso in $[0, 2\pi]$ (teorema di Weyl). Quindi $\{\sin n\}$ è denso in $[-1, 1]$. Per ogni $L \in [-1, 1]$ c'è una sottosuccessione $\to L$. $E = [-1, 1]$, $\limsup = 1$, $\liminf = -1$.

## Applicazione: criterio della radice

Per una serie $\sum b_n$ con $b_n \ge 0$, il **criterio della radice (Cauchy-Hadamard)** dice:
$$\rho := \limsup \sqrt[n]{b_n}.$$
- Se $\rho < 1$: $\sum b_n$ converge.
- Se $\rho > 1$: $\sum b_n$ diverge.
- Se $\rho = 1$: incerto.

Il $\limsup$ è essenziale: anche se $\sqrt[n]{b_n}$ oscilla, il criterio guarda al "peggior comportamento asintotico".

Per le **serie di potenze**, il raggio di convergenza è $R = 1/\limsup \sqrt[n]{|a_n|}$ (cap. 48).

## Trappole comuni

- **$\limsup \ne \sup$.** Il sup è sull'insieme di tutti i valori; $\limsup$ è asintotico (tronca i primi termini). Esempio: $a_0 = 100$, $a_n = (-1)^n$ per $n \ge 1$: $\sup = 100$, $\limsup = 1$.
- **$\liminf$ e $\limsup$ esistono sempre** in $\overline{\mathbb{R}}$, anche per successioni senza limite.
- **$\liminf < \limsup \iff$ non convergente.** Comodissimo per dimostrare non-convergenza: basta esibire due sottosuccessioni con limiti diversi.
- **$\limsup(a + b) \le \limsup a + \limsup b$, NON uguale.** Stessa cosa per $\liminf$ con $\ge$.
- **$\limsup$ è raggiunto da una sottosuccessione**, ma può non essere "raggiunto frequentemente" da tutti i termini.

## Esercizi

<details>
<summary>Esercizio 1 — Calcolo diretto</summary>

Calcola $\liminf$ e $\limsup$ di $a_n = \cos(n \pi / 2)$.

**Soluzione.** $\cos$ con argomento $0, \pi/2, \pi, 3\pi/2, 2\pi, \dots$ cicla su $1, 0, -1, 0, 1, 0, -1, 0, \dots$ Periodo 4. $E = \{-1, 0, 1\}$, $\liminf = -1$, $\limsup = 1$. ∎
</details>

<details>
<summary>Esercizio 2 — Successione su misura</summary>

Trova $(a_n)$ tale che $\liminf a_n = 0$ e $\limsup a_n = +\infty$.

**Soluzione.** $a_n = 0$ se $n$ pari, $a_n = n$ se $n$ dispari. Le due sottosuccessioni convergono a 0 e $+\infty$. ∎
</details>

<details>
<summary>Esercizio 3 — Operazioni: disuguaglianza stretta</summary>

Siano $a_n = (-1)^n$, $b_n = (-1)^{n+1}$. Calcola $\limsup(a_n + b_n)$ e $\limsup a_n + \limsup b_n$.

**Soluzione.** $a_n + b_n = 0$ per ogni $n$ → $\limsup = 0$. Invece $\limsup a_n + \limsup b_n = 1 + 1 = 2$. Disuguaglianza stretta $0 < 2$. ∎
</details>

<details>
<summary>Esercizio 4 — Monotonia</summary>

Sia $(a_n)$ crescente. Mostra $\liminf a_n = \limsup a_n = \sup a_n$.

**Soluzione.** Per Teorema 1 cap. 13, monotona converge al sup. Per Teorema 2 di questo capitolo, $\liminf = \limsup = \lim = \sup$. ∎
</details>

<details>
<summary>Esercizio 5 — Uso del criterio</summary>

Dimostra: se $\limsup a_n < 1$, allora definitivamente $a_n < 1$.

**Soluzione.** Sia $L^* := \limsup a_n < 1$. Posto $\varepsilon = (1 - L^*)/2 > 0$, per Teorema 3(a) definitivamente $a_n < L^* + \varepsilon = (1 + L^*)/2 < 1$. ∎

Usato dal criterio della radice: se $\limsup \sqrt[n]{b_n} < 1$, esiste $r < 1$ con $\sqrt[n]{b_n} < r$ definitivamente, quindi $b_n < r^n$, convergente per confronto.
</details>

## Riassunto in una riga

$\liminf a_n = \sup_n \inf_{k \ge n} a_k = \min E$ e $\limsup a_n = \inf_n \sup_{k \ge n} a_k = \max E$ (con $E$ = insieme dei limiti subsequenziali) — **esistono sempre**, e $(a_n)$ converge a $L$ esattamente quando $\liminf = \limsup = L$.
