---
title: "Successioni di Cauchy e completezza di R"
area: Successioni
summary: "La condizione **interna** \"i termini si avvicinano fra loro\" — successione di Cauchy — equivale in $\\mathbb{R}$ alla convergenza. Lo strumento per dimostrare l'**esistenza** di un limite **senza sapere quale sia**."
order: 14
level: intermedio
prereq:
  - "Definizione ε-N (sez. 11)"
  - "Bolzano-Weierstrass (sez. 13)"
  - "Topologia di R (sez. 10)"
tools:
  - "Rudin — *Principles*, cap. 3"
  - "Giusti — *Analisi 1*"
  - "Tao — *Analysis I*"
---

# Successioni di Cauchy e completezza di R

## Perché parlarne

Per dimostrare $a_n \to L$ con la definizione ε-N (cap. 11) devi **conoscere** $L$. Spesso non lo conosci — vuoi solo sapere se la successione "si sta stabilizzando da qualche parte". Cauchy offre un criterio **intrinseco**: i termini si avvicinano fra loro indefinitamente.

In $\mathbb{R}$ — e questo è il senso preciso di "completo" — **essere di Cauchy ed essere convergente sono la stessa cosa**.

**Uso pratico**: nelle dimostrazioni di esistenza (soluzioni di equazioni, radici, integrali come limiti di somme) è molto più facile mostrare "è di Cauchy" che esibire il limite. La completezza ti regala il limite gratuitamente.

## Intuizione

Una successione $(a_n)$ è **di Cauchy** se, da un certo indice in poi, **i termini sono tutti fra loro vicini**. Non c'è bisogno di un candidato limite: basta guardare le distanze interne.

- In $\mathbb{R}$ questo basta per garantire la convergenza.
- In $\mathbb{Q}$ no: puoi costruire successioni razionali che si addensano "puntando" a un irrazionale (un buco in $\mathbb{Q}$).

## Definizione

### Successione di Cauchy

**Definizione.** $(a_n)$ è **di Cauchy** se
$$\forall \varepsilon > 0,\ \exists N,\ \forall n, m \ge N,\ |a_n - a_m| < \varepsilon.$$

> **Glossarietto della formula:**
>
> - $\varepsilon$ ("epsilon") = la solita "tolleranza" piccola positiva.
> - $N$ = indice soglia ("da quando in poi vale la condizione").
> - $n, m$ = **due indici** qualunque, entrambi $\ge N$.
> - $|a_n - a_m|$ = la **distanza** fra il termine $n$-esimo e l'$m$-esimo.
>
> **Tradotto:** per ogni soglia $\varepsilon$, esiste un indice $N$ tale che, prendendo due indici qualunque $n, m$ entrambi $\ge N$, i corrispondenti termini distano meno di $\varepsilon$. Cioè: "da $N$ in poi tutti i termini stanno entro $\varepsilon$ l'uno dall'altro".

**Notazione equivalente** (cambio di variabile $m = n + p$):
$$\forall \varepsilon > 0,\ \exists N,\ \forall n \ge N,\ \forall p \ge 0,\ |a_{n + p} - a_n| < \varepsilon.$$

### Completezza

**Definizione.** Uno spazio metrico $(X, d)$ è **completo** se ogni successione di Cauchy in $X$ converge a un elemento di $X$.

> **Teorema centrale di questo capitolo:** $\mathbb{R}$ con la distanza $|x - y|$ è completo. $\mathbb{Q}$ no.

## Teoremi

### Teorema 1 — Convergente ⇒ Cauchy

> Se $a_n \to L$, allora $(a_n)$ è di Cauchy.

*Dim.* Dato $\varepsilon > 0$, per definizione di limite $\exists N : |a_n - L| < \varepsilon/2$ per $n \ge N$. Per $n, m \ge N$:
$$|a_n - a_m| \le |a_n - L| + |L - a_m| < \varepsilon/2 + \varepsilon/2 = \varepsilon. \quad\blacksquare$$

(Vale in qualunque spazio metrico, non solo $\mathbb{R}$.)

### Teorema 2 — Cauchy ⇒ limitata

> Se $(a_n)$ è di Cauchy, allora è limitata.

*Dim.* Per $\varepsilon = 1$, $\exists N : |a_n - a_m| < 1$ per $n, m \ge N$. In particolare $|a_n - a_N| < 1$ per $n \ge N$, da cui $|a_n| < |a_N| + 1$.

I termini iniziali $a_0, \dots, a_{N-1}$ sono finiti in numero, modulo massimo $M_0$. Posto $M = \max(M_0, |a_N| + 1)$, $|a_n| \le M$ per ogni $n$. ∎

### Teorema 3 — Completezza di $\mathbb{R}$ (Cauchy ⇒ convergente)

> Ogni successione di Cauchy in $\mathbb{R}$ converge.

*Dim.* Sia $(a_n)$ di Cauchy in $\mathbb{R}$.

1. Per Teorema 2, $(a_n)$ è limitata.
2. Per **Bolzano-Weierstrass** (cap. 13), esiste sottosuccessione $a_{n_k} \to L$ per qualche $L \in \mathbb{R}$.
3. Affermiamo che l'intera successione converge a $L$.

Dato $\varepsilon > 0$:
- Essere di Cauchy: $\exists N_1$ con $|a_n - a_m| < \varepsilon/2$ per $n, m \ge N_1$.
- $a_{n_k} \to L$: $\exists K$ con $|a_{n_k} - L| < \varepsilon/2$ per $k \ge K$.

Scegliamo $k$ abbastanza grande tale che $k \ge K$ **e** $n_k \ge N_1$ (esiste perché $n_k \to \infty$). Per ogni $n \ge N_1$:
$$|a_n - L| \le |a_n - a_{n_k}| + |a_{n_k} - L| < \varepsilon/2 + \varepsilon/2 = \varepsilon. \quad\blacksquare$$

Quindi $a_n \to L$. ∎

**Riepilogo logico in $\mathbb{R}$:**
$$\text{convergente} \iff \text{Cauchy}.$$

L'implicazione facile $(\Rightarrow)$ vale sempre. L'implicazione difficile $(\Leftarrow)$ è equivalente alla completezza.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">Cauchy: termini fra loro vicini, "code" che si stringono</text>
  <line x1="50" y1="240" x2="580" y2="240" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="50" x2="50" y2="260" stroke="#3a4868" stroke-width="1"/>
  <g fill="#6fb38a">
    <circle cx="80" cy="100" r="4"/>
    <circle cx="120" cy="200" r="4"/>
    <circle cx="160" cy="120" r="4"/>
    <circle cx="200" cy="180" r="4"/>
    <circle cx="240" cy="140" r="4"/>
    <circle cx="280" cy="170" r="4"/>
    <circle cx="320" cy="150" r="4"/>
    <circle cx="360" cy="162" r="4"/>
    <circle cx="400" cy="155" r="4"/>
    <circle cx="440" cy="160" r="4"/>
    <circle cx="480" cy="158" r="4"/>
    <circle cx="520" cy="159" r="4"/>
  </g>
  <rect x="280" y="145" width="300" height="25" fill="#d4af37" fill-opacity="0.15" stroke="#e8a04a" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="285" y="140" fill="#e8a04a" font-family="ui-monospace" font-size="10">tutti i termini dopo N stanno in una banda di larghezza ε</text>
  <line x1="280" y1="50" x2="280" y2="260" stroke="#e07a8d" stroke-width="1.5" stroke-dasharray="4 4"/>
  <text x="285" y="65" fill="#e07a8d" font-family="ui-monospace" font-size="11">N</text>
  <text x="50" y="280" fill="#f3eed9" font-family="ui-monospace" font-size="11">L'esistenza di L non è richiesta. La condizione è "interna".</text>
</svg>
<div class="chart-caption">Cauchy: dopo $N$ tutti i termini stanno in una banda di larghezza $\varepsilon$, senza bisogno di sapere a cosa convergano.</div>
</div>

### Teorema 4 — $\mathbb{Q}$ non è completo

> Esiste una successione $(q_n) \subseteq \mathbb{Q}$ di Cauchy che non converge in $\mathbb{Q}$.

*Dim.* Sia $q_n$ il troncamento decimale di $\sqrt 2$ alla $n$-esima cifra: $q_1 = 1.4$, $q_2 = 1.41$, $q_3 = 1.414, \dots$

*Cauchy*: $|q_n - q_m| \le 10^{-\min(n, m)}$, tende a zero.

*Non converge in $\mathbb{Q}$*: in $\mathbb{R}$ converge a $\sqrt 2$ (per costruzione). Per unicità del limite, nessun razionale può essere limite. ∎

### Teorema 5 — Equivalenza delle forme di completezza

Le seguenti proprietà di $\mathbb{R}$ sono tutte **equivalenti**:

(a) Ogni sottoinsieme non vuoto limitato superiormente ha un sup (assioma di completezza, cap. 06-07).
(b) Ogni successione monotona limitata converge (cap. 13).
(c) Bolzano-Weierstrass: ogni successione limitata ha sottosuccessione convergente (cap. 13).
(d) Ogni successione di Cauchy converge (questo capitolo).
(e) Cantor: intervalli chiusi incatenati con $|I_n| \to 0$ hanno intersezione di un punto (cap. 07).

Tutte sono modi diversi di dire **"non ci sono buchi in $\mathbb{R}$"**.

## Perché serve davvero — il punto fisso di Banach

**Caso d'uso pratico.** Sia $f : [0, 1] \to [0, 1]$ tale che $|f(x) - f(y)| \le c |x - y|$ con $c \in (0, 1)$ (si dice **contrazione**). Posto $a_0 \in [0, 1]$ e $a_{n+1} = f(a_n)$, vogliamo dimostrare che $(a_n)$ converge a un punto $L$ con $f(L) = L$ (un **punto fisso**).

*Strategia con Cauchy.* Si dimostra:
$$|a_{n+1} - a_n| = |f(a_n) - f(a_{n-1})| \le c |a_n - a_{n-1}| \le \dots \le c^n |a_1 - a_0|.$$

Per $n < m$:
$$|a_m - a_n| \le \sum_{k=n}^{m-1} |a_{k+1} - a_k| \le |a_1 - a_0| \sum_{k=n}^{m-1} c^k \le |a_1 - a_0| \cdot \frac{c^n}{1 - c} \to 0.$$

Quindi $(a_n)$ è di Cauchy. Per **completezza di $\mathbb{R}$**, $a_n \to L$ per qualche $L$. Per continuità (cap. 25), $f(L) = L$.

> **Teorema del punto fisso di Banach** in 1D. Senza completezza, non avremmo potuto concludere "$L$ esiste".

Cauchy è il **modo di costruire un limite senza supporlo a priori**.

## Esempi guidati

### Esempio 1 — Serie geometrica

$a_n = 1 + \frac 1 2 + \frac 1 4 + \dots + \frac{1}{2^n}$.

$|a_{n + p} - a_n| = \frac{1}{2^{n+1}} + \dots + \frac{1}{2^{n+p}} < \frac{1}{2^n}$.

Dato $\varepsilon > 0$, scegliamo $N > \log_2(1/\varepsilon)$. Cauchy → converge (a $2$).

### Esempio 2 — Serie armonica (NON Cauchy)

$a_n = 1 + \frac 1 2 + \frac 1 3 + \dots + \frac 1 n$ (somma armonica).

Mostriamo che NON è Cauchy. Controllo:
$$a_{2n} - a_n = \sum_{k=n+1}^{2n} \frac{1}{k} \ge n \cdot \frac{1}{2n} = \frac{1}{2}.$$

(Ogni termine $\ge 1/(2n)$, e ce ne sono $n$.) Quindi per $\varepsilon = 1/2$ nessun $N$ funziona. Non Cauchy, quindi non converge. (Diverge a $+\infty$, sebbene $1/n \to 0$ — paradosso noto.)

### Esempio 3 — Criterio di Cauchy per serie

Una serie $\sum a_k$ **converge** se e solo se le somme parziali $S_n = \sum_{k=0}^n a_k$ sono di Cauchy, cioè:
$$\forall \varepsilon > 0,\ \exists N,\ \forall m > n \ge N : \left|\sum_{k = n+1}^m a_k\right| < \varepsilon.$$

Strumento principe per lo studio delle serie (cap. 45).

## Trappole comuni

- **"$|a_{n+1} - a_n| \to 0$" NON implica Cauchy.** Controesempio: $a_n = \sqrt n$. $\sqrt{n+1} - \sqrt n = \frac{1}{\sqrt{n+1} + \sqrt n} \to 0$, ma $\sqrt n \to +\infty$, non Cauchy. La condizione di Cauchy richiede vicinanza per **qualunque** coppia $n, m$ grandi, non solo per consecutivi.
- **Cauchy non è una proprietà "del limite"**: si verifica senza menzionare il limite. È proprio questo che la rende utile.
- **In spazi non completi, Cauchy non basta.** Costruire una successione di Cauchy non basta per concludere "esiste limite": serve sapere che lo spazio è completo. In $\mathbb{Q}$, in spazi di funzioni con norme particolari, ci sono Cauchy non convergenti.
- **Il completamento è unico.** $\mathbb{R}$ è — formalmente — il "completamento di $\mathbb{Q}$": si costruisce come quoziente di successioni di Cauchy di razionali (cap. 08).

## Esercizi

<details>
<summary>Esercizio 1 — Cauchy con stima diretta</summary>

Sia $a_n = \sum_{k=0}^n \frac{(-1)^k}{k+1}$ (serie armonica alternata). Mostra che è di Cauchy.

**Soluzione.** Per Leibniz (cap. 47), la coda di una serie alternante con termini $1/(k+1)$ decrescenti a 0 è limitata dal primo termine:
$$|a_m - a_n| = \left|\sum_{k=n+1}^m \frac{(-1)^k}{k+1}\right| \le \frac{1}{n + 2}.$$
Per $\varepsilon > 0$, basta $N > 1/\varepsilon - 2$. ∎
</details>

<details>
<summary>Esercizio 2 — Successione non Cauchy</summary>

Sia $a_n = \sum_{k=1}^n 1/\sqrt k$. Mostra che NON è di Cauchy.

**Soluzione.** $a_{4n} - a_n = \sum_{k=n+1}^{4n} \frac{1}{\sqrt k} \ge 3n \cdot \frac{1}{\sqrt{4n}} = \frac{3 \sqrt n}{2} \to +\infty$. Per $\varepsilon = 1$ nessun $N$ va bene. ∎
</details>

<details>
<summary>Esercizio 3 — Contrazione</summary>

Sia $T(x) = (x + 4)/3$. Posto $x_0 = 0$, $x_{n+1} = T(x_n)$. Mostra che $(x_n)$ è di Cauchy e calcola il limite.

**Soluzione.** $|T(x) - T(y)| = |x - y|/3$ → contrazione con $c = 1/3$. Quindi $|x_{n+1} - x_n| \le (1/3)^n |x_1 - x_0| = (1/3)^n \cdot 4/3$. Per $n < m$:
$$|x_m - x_n| \le \sum_{k=n}^{m-1} (1/3)^k \cdot 4/3 \le \frac{4/3 \cdot (1/3)^n}{1 - 1/3} = 2 \cdot (1/3)^n \to 0.$$
Cauchy → converge. Punto fisso: $L = (L + 4)/3 \Rightarrow L = 2$. ∎
</details>

<details>
<summary>Esercizio 4 — Cauchy ⇒ Cauchy di $a_n^2$</summary>

Mostra che se $(a_n)$ è di Cauchy, anche $(a_n^2)$ lo è.

**Soluzione.** $|a_n^2 - a_m^2| = |a_n - a_m| \cdot |a_n + a_m| \le |a_n - a_m| \cdot (|a_n| + |a_m|)$. Per Teorema 2, $|a_n| \le M$ per qualche $M$. Quindi $|a_n^2 - a_m^2| \le 2 M |a_n - a_m|$. Dato $\varepsilon$, scegliamo $|a_n - a_m| < \varepsilon/(2M)$. ∎
</details>

<details>
<summary>Esercizio 5 — $\mathbb{Q}$ non completo, controesempio diretto</summary>

Sia $a_0 = 1$, $a_{n+1} = (a_n + 2/a_n)/2$. Mostra che $(a_n) \subseteq \mathbb{Q}$, è di Cauchy, ma non ha limite in $\mathbb{Q}$.

**Soluzione.** *Razionalità*: per induzione (somma e quoziente di razionali è razionale, e $a_n > 0$).

*Cauchy*: come nel metodo di Erone (cap. 13, es. 2), $a_n \to \sqrt 2$ in $\mathbb{R}$, quindi è Cauchy.

*Non in $\mathbb{Q}$*: il limite è $\sqrt 2$, irrazionale. ∎

Controesempio canonico: questa è "**la**" successione che mostra l'incompletezza di $\mathbb{Q}$.
</details>

<details>
<summary>Esercizio 6 — Monotona ⇒ Cauchy senza passare per BW</summary>

Dimostra direttamente: monotona + limitata $\Rightarrow$ Cauchy.

**Soluzione.** WLOG crescente, limitata. Sia $L = \sup a_n$. Per ogni $\varepsilon > 0$, per la $\varepsilon$-caratterizzazione del sup (cap. 07), $\exists N : a_N > L - \varepsilon$. Per monotonia e maggiorante, $a_n \in (L - \varepsilon, L]$ per $n \ge N$. Quindi $|a_n - a_m| < \varepsilon$ per $n, m \ge N$. ∎
</details>

<details>
<summary>Esercizio 7 — Assoluta sommabilità delle differenze</summary>

Mostra: se $\sum_{n=0}^\infty |a_{n+1} - a_n| < \infty$, allora $(a_n)$ è di Cauchy.

**Soluzione.** Dato $\varepsilon > 0$, esiste $N$ tale che $\sum_{k=N}^\infty |a_{k+1} - a_k| < \varepsilon$ (perché la serie converge → la coda è piccola). Per $m > n \ge N$:
$$|a_m - a_n| \le \sum_{k=n}^{m-1} |a_{k+1} - a_k| \le \sum_{k=N}^\infty |a_{k+1} - a_k| < \varepsilon. \quad\blacksquare$$

Criterio comodo: si chiama **assoluta sommabilità delle differenze** e implica convergenza.
</details>

## Riassunto in una riga

In $\mathbb{R}$, $(a_n)$ converge **se e solo se** è di Cauchy — slogan: "*sono di Cauchy, quindi convergo*" — e questa equivalenza è esattamente la completezza di $\mathbb{R}$ (falsa in $\mathbb{Q}$).
