---
title: "Algebra dei limiti di successioni"
area: Successioni
summary: "Le regole che permettono di calcolare i limiti **senza** ogni volta riapplicare la definizione ε-N. Come si comportano somma, prodotto, quoziente — e quali sono le **forme indeterminate** dove l'algebra cieca non basta."
order: 12
level: intermedio
prereq:
  - "Definizione ε-N (sez. 11)"
  - "Disuguaglianza triangolare (sez. 06)"
tools:
  - "Rudin — *Principles*, cap. 3"
  - "Giusti — *Analisi 1*"
  - "Demidovich — *Esercizi di Analisi*"
---

# Algebra dei limiti di successioni

## Perché parlarne

Una volta capita la definizione di limite (cap. 11), calcolare ogni $\lim a_n$ a colpi di $\varepsilon$-$N$ sarebbe insostenibile. Dimostriamo una volta per tutte che il limite è **lineare** (somma di limiti = limite di somma), **moltiplicativo**, **rispetta il quoziente** (con cautela) — e poi lavoriamo solo con regole algebriche.

L'unica eccezione: certe **forme indeterminate** (come $\infty - \infty$ o $0 \cdot \infty$) dove l'algebra cieca non basta e serve manipolare con creatività.

## Intuizione

Se $a_n \to A$ e $b_n \to B$, allora $a_n + b_n$ deve tendere ad $A + B$: sommando "code vicine ad $A$" e "code vicine a $B$" ottieni "code vicine ad $A + B$". Lo stesso per prodotto e quoziente.

L'unico fastidio sono i casi tipo "$0 \cdot \infty$", "$\infty - \infty$" e simili: i due ingredienti tirano in direzioni opposte e il risultato non è determinato dalle sole velocità dei limiti. Va analizzato caso per caso.

## La retta estesa

Lavoriamo nella **retta reale estesa**:
$$\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty,\ +\infty\}.$$

> **Glossarietto:**
>
> - $\overline{\mathbb{R}}$ = i reali con l'aggiunta di due "punti all'infinito".
> - $+\infty$, $-\infty$ NON sono numeri: sono simboli che rappresentano "diverge crescendo" e "diverge calando".
> - Le operazioni si estendono **parzialmente**.

### Operazioni definite con $\infty$

| operazione | risultato |
|---|---|
| $a + \infty$ ($a \in \mathbb{R}$) | $+\infty$ |
| $a \cdot (+\infty)$ con $a > 0$ | $+\infty$ |
| $a \cdot (+\infty)$ con $a < 0$ | $-\infty$ |
| $a / (\pm \infty)$ | $0$ |
| $(+\infty) + (+\infty)$ | $+\infty$ |
| $(+\infty) \cdot (+\infty)$ | $+\infty$ |

### Forme **indeterminate** (non definite)

$$\infty - \infty,\quad 0 \cdot \infty,\quad \frac{0}{0},\quad \frac{\infty}{\infty},\quad 1^\infty,\quad 0^0,\quad \infty^0.$$

> **Attenzione.** "Indeterminata" **non** significa "senza limite". Significa che il limite *non è determinato dai soli limiti delle due parti* — il risultato dipende da *come* le due parti vanno a zero/infinito (la "velocità" relativa).
>
> Esempio: $\infty - \infty$:
> - $(n + 1) - n = 1 \to 1$
> - $n^2 - n \to +\infty$
> - $n - n^2 \to -\infty$
> - $n + (-1)^n - n = (-1)^n$ (oscilla)
>
> Stesso scheletro "$\infty - \infty$", quattro esiti diversi.

## Algebra dei limiti finiti

### Teorema 1 — Le quattro operazioni

> Siano $a_n \to A \in \mathbb{R}$ e $b_n \to B \in \mathbb{R}$. Allora:
>
> (i) **Somma**: $a_n + b_n \to A + B$.
> (ii) **Prodotto**: $a_n \cdot b_n \to A \cdot B$.
> (iii) **Quoziente** (se $B \ne 0$): $a_n / b_n \to A / B$ (e definitivamente $b_n \ne 0$).
> (iv) **Modulo**: $|a_n| \to |A|$.
> (v) **Scalare**: per $\lambda \in \mathbb{R}$, $\lambda a_n \to \lambda A$.

*Dim. di (i).* Già fatta in cap. 11, esercizio 5 (trucco del $\varepsilon/2$).

*Dim. di (ii)* — un piccolo classico. Vogliamo $|a_n b_n - A B| \to 0$. Usiamo il **trucco di somma e sottrazione** del termine $A b_n$:
$$a_n b_n - A B = a_n b_n - A b_n + A b_n - A B = (a_n - A) b_n + A (b_n - B).$$
Per la disuguaglianza triangolare:
$$|a_n b_n - A B| \le |a_n - A| \cdot |b_n| + |A| \cdot |b_n - B|.$$
Dato che $b_n \to B$, $(b_n)$ è limitata (cap. 11, Teor. 2): $|b_n| \le M$ definitivamente.

Dato $\varepsilon > 0$, scegliamo $N$ tale che, per $n \ge N$,
$$|a_n - A| < \frac{\varepsilon}{2 M}, \qquad |b_n - B| < \frac{\varepsilon}{2(|A| + 1)}.$$
Allora $|a_n b_n - AB| < \frac{\varepsilon}{2M} \cdot M + |A| \cdot \frac{\varepsilon}{2(|A|+1)} < \varepsilon$. ∎

*Dim. di (iii).* Per la permanenza del segno (cap. 11), $|b_n| > |B|/2 > 0$ definitivamente, quindi $b_n \ne 0$. Conto:
$$\left|\frac{a_n}{b_n} - \frac{A}{B}\right| = \left|\frac{a_n B - A b_n}{b_n B}\right| \le \frac{|a_n - A| \cdot |B| + |A| \cdot |b_n - B|}{|b_n B|}.$$
Con $|b_n B| > |B|^2/2$, e con controlli simili a (ii) sul numeratore, si conclude. ∎

*(iv)* Per la disuguaglianza triangolare inversa $\big||a_n| - |A|\big| \le |a_n - A| \to 0$.

*(v)* Caso particolare di (ii) con $b_n \equiv \lambda$. ∎

## Algebra con limiti infiniti

Le regole della tabella in alto si dimostrano direttamente. Esempio:

**Proposizione.** Se $a_n \to A \in \mathbb{R}$ e $b_n \to +\infty$, allora $a_n + b_n \to +\infty$.

*Dim.* Dato $M > 0$:
- Per $a_n \to A$: $\exists N_1$ con $|a_n - A| < 1$, cioè $a_n > A - 1$, per $n \ge N_1$.
- Per $b_n \to +\infty$: $\exists N_2$ con $b_n > M - A + 1$ per $n \ge N_2$.

Per $n \ge \max(N_1, N_2)$:
$$a_n + b_n > (A - 1) + (M - A + 1) = M. \quad\blacksquare$$

## Teorema del confronto

### Teorema 2 — Confronto

> Se $a_n \le b_n$ definitivamente e $a_n \to A$, $b_n \to B$ in $\overline{\mathbb{R}}$, allora $A \le B$.

> **A parole:** la disuguaglianza al limite si conserva (debolmente).

*Dim. (per assurdo, caso $A, B$ finiti).* Sia $A > B$. Posto $\varepsilon = (A - B)/3 > 0$:
- Definitivamente $a_n > A - \varepsilon$.
- Definitivamente $b_n < B + \varepsilon$.

Quindi $a_n - b_n > (A - \varepsilon) - (B + \varepsilon) = (A - B) - 2 \varepsilon = (A - B)/3 > 0$, contraddicendo $a_n \le b_n$. (Casi infiniti analoghi.) ∎

> **Attenzione: la disuguaglianza stretta non si conserva.** Esempio: $1/n < 2/n$ per ogni $n$, ma entrambi $\to 0$, NON $0 < 0$.

### Teorema 3 — Carabinieri (sandwich)

> Se $a_n \le b_n \le c_n$ definitivamente, e $a_n \to L$, $c_n \to L$ in $\mathbb{R}$, allora $b_n \to L$.

> **A parole:** due successioni che convergono allo stesso limite "stringono" una terza fra loro, forzandola allo stesso limite.

*Dim.* Dato $\varepsilon > 0$, $\exists N$ tale che $L - \varepsilon < a_n$ e $c_n < L + \varepsilon$ per $n \ge N$. Quindi:
$$L - \varepsilon < a_n \le b_n \le c_n < L + \varepsilon,$$
cioè $|b_n - L| < \varepsilon$. ∎

**Versione asimmetrica:** se $a_n \le b_n$ e $a_n \to +\infty$, allora $b_n \to +\infty$. (E duale per $-\infty$.)

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="300" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">Teorema dei carabinieri</text>
  <line x1="50" y1="240" x2="580" y2="240" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="50" x2="50" y2="250" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="150" x2="580" y2="150" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="555" y="146" fill="#d4af37" font-family="ui-monospace" font-size="11">L</text>
  <path d="M 80 220 Q 200 200 320 170 T 560 152" fill="none" stroke="#6aa9d8" stroke-width="2.5"/>
  <path d="M 80 80 Q 200 100 320 130 T 560 148" fill="none" stroke="#e07a8d" stroke-width="2.5"/>
  <path d="M 80 140 Q 200 165 320 145 T 560 150" fill="none" stroke="#6fb38a" stroke-width="3" stroke-dasharray="4 3"/>
  <text x="90" y="225" fill="#6aa9d8" font-family="ui-monospace" font-size="11">aₙ (basso)</text>
  <text x="90" y="75" fill="#e07a8d" font-family="ui-monospace" font-size="11">cₙ (alto)</text>
  <text x="200" y="180" fill="#6fb38a" font-family="ui-monospace" font-size="11">bₙ (in mezzo)</text>
  <text x="60" y="270" fill="#f3eed9" font-family="ui-monospace" font-size="11">aₙ, cₙ → L stringono bₙ che è forzata a L</text>
</svg>
<div class="chart-caption">Carabinieri: due successioni convergenti a $L$ stringono una terza, costringendola a $L$.</div>
</div>

## Esempi guidati

### Esempio 1 — Quoziente di polinomi (forma $\infty/\infty$)

$$\lim_{n \to \infty} \frac{n + 1}{n^2 + 3}.$$

*Soluzione.* Dividi sopra e sotto per $n^2$ (la potenza dominante del denominatore):
$$\frac{n + 1}{n^2 + 3} = \frac{1/n + 1/n^2}{1 + 3/n^2} \to \frac{0 + 0}{1 + 0} = 0.$$

> **Tecnica.** In un quoziente di polinomi: dividi per la potenza dominante del denominatore. Il limite è:
> - **rapporto dei coefficienti dominanti** se gradi uguali;
> - **$0$** se grado num < grado den;
> - **$\pm \infty$** se grado num > grado den.

### Esempio 2 — Forma $\infty - \infty$ (razionalizzazione)

$$\lim_{n \to \infty} (\sqrt{n^2 + n} - n).$$

*Soluzione.* Razionalizzo moltiplicando per il **coniugato** $(\sqrt{n^2+n} + n)$:
$$\sqrt{n^2 + n} - n = \frac{(n^2 + n) - n^2}{\sqrt{n^2 + n} + n} = \frac{n}{\sqrt{n^2 + n} + n} = \frac{1}{\sqrt{1 + 1/n} + 1} \to \frac{1}{2}.$$

> **Lezione.** $\infty - \infty$ può dare *qualunque cosa*. Per uscirne, riscrivi.

### Esempio 3 — Carabinieri con $\sin$

$$\lim_{n \to \infty} \frac{\sin n}{n}.$$

*Soluzione.* $|\sin n| \le 1$, quindi $\left|\frac{\sin n}{n}\right| \le \frac{1}{n}$. Per carabinieri ($-1/n \le \sin n / n \le 1/n$, entrambi $\to 0$): limite $= 0$.

### Esempio 4 — Fattoriali

$$\lim_{n \to \infty} \frac{n!}{n^n}.$$

*Soluzione.* Scriviamo:
$$\frac{n!}{n^n} = \frac{1 \cdot 2 \cdot 3 \cdots n}{n \cdot n \cdot n \cdots n} = \frac{1}{n} \cdot \frac{2}{n} \cdot \frac{3}{n} \cdots \frac{n}{n}.$$

Tutti i fattori sono $\le 1$, e il primo è $1/n$. Quindi:
$$0 \le \frac{n!}{n^n} \le \frac{1}{n} \cdot 1 \cdot 1 \cdots 1 = \frac{1}{n} \to 0.$$
Carabinieri: limite $= 0$.

### Esempio 5 — La forma $0 \cdot \infty$ dà qualsiasi cosa

- $\lim n \cdot \frac{1}{n^2} = \lim \frac{1}{n} = 0$.
- $\lim n \cdot \frac{1}{n} = \lim 1 = 1$.
- $\lim n^2 \cdot \frac{1}{n} = \lim n = +\infty$.

Stesso scheletro "$0 \cdot \infty$", tre esiti diversi.

### Esempio 6 — Somma con riscrittura

$$\lim_{n \to \infty} \frac{1 + 2 + \dots + n}{n^2}.$$

*Soluzione.* Usa la formula di Gauss (cap. 03) $1 + 2 + \dots + n = n(n+1)/2$:
$$\lim \frac{n(n+1)/2}{n^2} = \lim \frac{n + 1}{2 n} = \lim \frac{1 + 1/n}{2} = \frac{1}{2}.$$

## Strategie operative

Riassunto pratico:

1. **Polinomi in $n$**: raccogli la potenza dominante.
2. **Radici**: razionalizza moltiplicando e dividendo per il coniugato.
3. **Quozienti $0/0$ o $\infty/\infty$**: semplifica algebricamente, o usa limiti notevoli (cap. 15).
4. **Espressioni con $\sin, \cos$**: usa $|\sin x|, |\cos x| \le 1$ + carabinieri.
5. **Forme $1^\infty$**: scrivi come $e^{n \ln(\dots)}$ e analizza l'esponente (cap. 15).
6. **Fattoriali**: usa rapporti consecutivi (criterio del rapporto).

## Trappole comuni

- **"$\infty - \infty = 0$" è falso in generale.** Vedi esempio 2.
- **"$0 \cdot \infty = 0$" è falso.** Vedi esempio 5.
- **Disuguaglianza stretta non si conserva.** $1/n > 0$ per ogni $n$, ma $\lim = 0$, non $> 0$.
- **L'algebra dei limiti richiede limiti esistenti.** Se $a_n = (-1)^n$ (no limite) e $b_n = 1 - (-1)^n = $ alterna $0, 2$, allora $a_n + b_n = 1$ costante. La somma converge anche se i pezzi no — ma **non** si può dedurre dall'algebra (che presuppone entrambi i limiti).
- **Quoziente con $B = 0$:** se $a_n \to A \ne 0$ e $b_n \to 0$, allora $a_n/b_n$ diverge in modulo, ma il segno può essere instabile (se $b_n$ cambia segno).
- **Carabinieri richiede stesso limite per $a$ e $c$.** Se $a_n \to L_1 \ne L_2 \leftarrow c_n$, non puoi concludere.

## Esercizi

<details>
<summary>Esercizio 1 — Quoziente di polinomi</summary>

Calcola $\displaystyle \lim_{n \to \infty} \frac{5 n^4 - 3 n^2 + 7}{2 n^4 + n^3 - 1}$.

**Soluzione.** Dividi per $n^4$: $\frac{5 - 3/n^2 + 7/n^4}{2 + 1/n - 1/n^4} \to \frac{5}{2}$. ∎
</details>

<details>
<summary>Esercizio 2 — Razionalizzazione</summary>

Calcola $\displaystyle \lim_{n \to \infty} (\sqrt{n^2 + 5 n + 1} - \sqrt{n^2 - 2 n})$.

**Soluzione.** Moltiplico per il coniugato:
$$\sqrt{n^2 + 5n + 1} - \sqrt{n^2 - 2n} = \frac{(n^2 + 5n + 1) - (n^2 - 2n)}{\sqrt{n^2+5n+1} + \sqrt{n^2-2n}} = \frac{7 n + 1}{\sqrt{n^2 + 5n + 1} + \sqrt{n^2 - 2n}}.$$

Divido sopra e sotto per $n$:
$$\frac{7 + 1/n}{\sqrt{1 + 5/n + 1/n^2} + \sqrt{1 - 2/n}} \to \frac{7}{1 + 1} = \frac{7}{2}. \quad\blacksquare$$
</details>

<details>
<summary>Esercizio 3 — Carabinieri con seno/coseno</summary>

Calcola $\displaystyle \lim_{n \to \infty} \frac{n^2 + \cos n}{2 n^2 - \sin n}$.

**Soluzione.** $\cos n, \sin n \in [-1, 1]$ per ogni $n$. Quindi:
$$\frac{n^2 - 1}{2 n^2 + 1} \le \frac{n^2 + \cos n}{2 n^2 - \sin n} \le \frac{n^2 + 1}{2 n^2 - 1}.$$
Entrambi gli estremi $\to 1/2$. Per carabinieri, limite $= 1/2$. ∎
</details>

<details>
<summary>Esercizio 4 — Forma $0 \cdot \infty$</summary>

Calcola $\displaystyle \lim_{n \to \infty} n \sin(1/n^2)$.

**Soluzione.** $|\sin x| \le |x|$ per ogni $x$ (limite notevole anticipato dal cap. 15). Quindi $|\sin(1/n^2)| \le 1/n^2$, da cui $|n \sin(1/n^2)| \le 1/n \to 0$. Limite $= 0$. ∎
</details>

<details>
<summary>Esercizio 5 — Forme $0 \cdot \infty$ con esiti diversi</summary>

Trova due successioni $(a_n), (b_n)$ con $a_n \to 0$ e $b_n \to +\infty$, e $a_n b_n$ che faccia rispettivamente $0$, $1$, $+\infty$, $-\infty$.

**Soluzione.**
- $a_n = 1/n^2,\ b_n = n$: $a_n b_n = 1/n \to 0$.
- $a_n = 1/n,\ b_n = n$: $a_n b_n = 1 \to 1$.
- $a_n = 1/n,\ b_n = n^2$: $a_n b_n = n \to +\infty$.
- $a_n = -1/n,\ b_n = n^2$: $a_n b_n = -n \to -\infty$. ∎
</details>

<details>
<summary>Esercizio 6 — Somma telescopica</summary>

Sia $S_n = \sum_{k=1}^n \frac{1}{k(k + 1)}$. Calcola $\lim S_n$.

**Soluzione.** Usa la decomposizione **telescopica**: $\frac{1}{k(k+1)} = \frac{1}{k} - \frac{1}{k+1}$ (verifica: somma dei due termini = $\frac{(k+1) - k}{k(k+1)} = \frac{1}{k(k+1)}$ ✓).

Quindi $S_n = \sum_{k=1}^n \left(\frac 1 k - \frac{1}{k+1}\right) = 1 - \frac{1}{n + 1} \to 1$. ∎
</details>

<details>
<summary>Esercizio 7 — Radice n-esima di una somma</summary>

Sia $a_n = \sqrt[n]{n^2 + 2^n}$. Calcola $\lim a_n$.

**Soluzione.** Per $n$ grande $2^n$ domina $n^2$. Più precisamente, definitivamente $2^n \le n^2 + 2^n \le 2 \cdot 2^n$. Quindi:
$$\sqrt[n]{2^n} \le a_n \le \sqrt[n]{2 \cdot 2^n} = \sqrt[n]{2} \cdot 2.$$
Cioè $2 \le a_n \le 2 \cdot 2^{1/n}$. Siccome $2^{1/n} \to 1$ (sez. 11), per carabinieri $a_n \to 2$. ∎

> **Trucco generale:** $\sqrt[n]{c \cdot d^n} \to d$ se $c, d > 0$ (basta che $c$ cresca al massimo polinomialmente).
</details>

<details>
<summary>Esercizio 8 — Successione per ricorrenza</summary>

Sia $a_1 = 1$, $a_{n+1} = \sqrt{2 + a_n}$. Assumendo che il limite esista, calcolalo.

**Soluzione.** Se $a_n \to L$, allora anche $a_{n+1} \to L$. E per continuità della radice (che vedremo formalmente in cap. 25), $\sqrt{2 + a_n} \to \sqrt{2 + L}$. Quindi
$$L = \sqrt{2 + L} \Longrightarrow L^2 = 2 + L \Longrightarrow L^2 - L - 2 = 0 \Longrightarrow (L - 2)(L + 1) = 0.$$
Le soluzioni sono $L = 2$ e $L = -1$. Scartiamo $-1$ perché $a_n > 0$ per ogni $n$. Quindi $L = 2$. ∎

(L'esistenza del limite si dimostra per monotonia + limitatezza, cap. 13.)
</details>

## Tabella riassuntiva

| forma | esito |
|---|---|
| $A + B$ ($A, B$ finiti) | $A + B$ |
| $A + (\pm\infty)$ ($A$ finito) | $\pm \infty$ |
| $\infty + \infty$ (stesso segno) | $\pm\infty$ |
| $\infty - \infty$ | **indeterminata** |
| $A \cdot B$ ($A, B$ finiti) | $A B$ |
| $0 \cdot \infty$ | **indeterminata** |
| $A / B$ ($B \ne 0$) | $A/B$ |
| $A/0$ ($A \ne 0$) | $\pm \infty$ (segno dipende da $b_n$) |
| $0/0$, $\infty/\infty$, $1^\infty$, $0^0$, $\infty^0$ | **indeterminate** |

## Riassunto in una riga

L'algebra dei limiti dice "i limiti commutano con $+, \cdot, /$" — e basta per il 90% degli esercizi; il restante 10% (forme indeterminate) richiede manipolazione algebrica e i **limiti notevoli** (cap. 15).
