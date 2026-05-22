---
title: Estremo superiore e completezza
area: Numeri reali
summary: "Cos'è \"il più piccolo dei maggioranti\" — il **sup** — e perché è lo strumento più potente dell'analisi. Definizione, $\\varepsilon$-caratterizzazione (la forma \"operativa\"), differenza con il massimo, e le forme equivalenti di completezza di $\\mathbb{R}$."
order: 7
level: intermedio
prereq:
  - "Assiomi di $\\mathbb{R}$ (sez. 06)"
tools:
  - "Rudin — cap. 1"
  - "Giusti — *Analisi Matematica 1*"
  - "Marcellini-Sbordone, vol. 1"
---

# Estremo superiore e completezza

## Perché parlarne

Il **sup** è il cavallo di battaglia di tutta l'analisi. Praticamente ogni dimostrazione di **esistenza** (un limite esiste, un massimo esiste, un integrale esiste, ...) ha questo schema:

> "Considera l'insieme $A$ degli $x$ con la proprietà $P$. Prendi $s = \sup A$. Mostra che $s$ è quello cercato."

Padroneggiare la **$\varepsilon$-caratterizzazione del sup** è il primo grande salto tecnico del corso. Se non la capisci adesso, ti perseguiterà per tutto l'anno.

## Definizioni di base

Sia $A \subseteq \mathbb{R}$ un sottoinsieme non vuoto.

- **Maggiorante** di $A$: un numero $M \in \mathbb{R}$ tale che $\forall a \in A,\ a \le M$. Un "tetto" sopra $A$.
- **Minorante** di $A$: un numero $m \in \mathbb{R}$ tale che $\forall a \in A,\ a \ge m$. Un "pavimento" sotto $A$.
- $A$ è **superiormente limitato** se ha almeno un maggiorante.
- $A$ è **inferiormente limitato** se ha almeno un minorante.
- $A$ è **limitato** se è limitato sia sopra sia sotto. Equivalente: $\exists C \ge 0 : \forall a \in A,\ |a| \le C$.

> **Glossarietto:**
>
> - $A \subseteq \mathbb{R}$ = "$A$ è un sottoinsieme di $\mathbb{R}$".
> - $\forall a \in A$ = "per ogni elemento $a$ di $A$".
> - $|a|$ = valore assoluto (vedi sez. 06).
>
> **Tradotto:** "limitato" = "vive dentro un intervallo $[-C, C]$ per qualche $C$ finito".

**Massimo** $\max A$ = un *maggiorante* che appartiene ad $A$. Se esiste, è unico.

**Minimo** $\min A$ = un *minorante* che appartiene ad $A$. Se esiste, è unico.

> **Esempio.** $A = [0, 1]$ (intervallo chiuso): $\min A = 0$, $\max A = 1$. $A = (0, 1)$ (intervallo aperto): né min né max (gli estremi non sono dentro).

## Estremo superiore: definizione

**Definizione.** $s$ è l'**estremo superiore** di $A$ (in simboli $s = \sup A$) se è il **minimo dei maggioranti**. Cioè:

- **(S1)** $s$ è un maggiorante di $A$: $\forall a \in A,\ a \le s$.
- **(S2)** $s$ è il *più piccolo* maggiorante: per ogni $s' < s$, $s'$ non è maggiorante.

Analogamente, $i = \inf A$ è il **massimo dei minoranti**.

> **Tradotto.** $\sup A$ è la "cappa più stretta possibile" sopra $A$. Nessun numero più piccolo riesce ancora a stare sopra a tutto $A$.

### Sup vs. Max — non sono la stessa cosa

Se $\max A$ esiste, allora $\sup A = \max A$ (verifica: $\max A$ è maggiorante che sta in $A$; un maggiorante più piccolo dovrebbe stare sotto un elemento di $A$, contraddizione).

Ma $\sup A$ può esistere **anche quando $\max A$ non esiste**.

**Esempio chiave.** $A = (0, 1)$ (aperto). $\sup A = 1$, $\inf A = 0$, ma $\max A$ e $\min A$ non esistono (perché 0 e 1 non sono in $A$).

## La forma operativa: $\varepsilon$-caratterizzazione del sup

Le (S1)–(S2) sopra sono concettualmente chiare, ma per **lavorare con il sup** serve una riformulazione più maneggevole. Eccola.

**Teorema ($\varepsilon$-caratterizzazione del sup).** Sia $A \subseteq \mathbb{R}$ non vuoto. Allora $s = \sup A$ **se e solo se**:

- **(C1)** $\forall a \in A,\ a \le s$ — $s$ è maggiorante.
- **(C2)** $\forall \varepsilon > 0,\ \exists a \in A : a > s - \varepsilon$ — qualunque cosa più piccola di $s$ non è maggiorante.

> **Glossarietto della formula:**
>
> - $\varepsilon$ ("epsilon") = una piccola distanza positiva, "il margine di scostamento".
> - $\forall \varepsilon > 0$ = "per ogni $\varepsilon$ positivo, anche piccolissimo".
> - $\exists a \in A$ = "esiste almeno un elemento $a$ in $A$".
> - $a > s - \varepsilon$ = "$a$ supera il valore $s - \varepsilon$ (sta tra $s - \varepsilon$ e $s$)".
>
> **Tradotto a parole:** "*$s$* è il sup se (C1) sta sopra a tutti gli elementi di $A$, e (C2) ogni volta che provo a scendere anche di pochissimo (di $\varepsilon$), trovo subito un elemento di $A$ che supera quella quota più bassa". Insieme, (C1) e (C2) dicono che $s$ è proprio "incollato" ad $A$ dall'alto: non c'è spazio per un maggiorante più piccolo.

*Dim. del teorema.*

$(\Rightarrow)$ Se $s = \sup A$, allora (C1) per definizione (S1). Per (C2): se per qualche $\varepsilon > 0$ avessimo $a \le s - \varepsilon$ per ogni $a \in A$, allora $s - \varepsilon$ sarebbe un maggiorante più piccolo di $s$, contraddicendo (S2).

$(\Leftarrow)$ (C1) dà che $s$ è maggiorante. Per la minimalità: sia $s' < s$. Sia $\varepsilon = s - s' > 0$. Per (C2), esiste $a \in A$ con $a > s - \varepsilon = s'$, quindi $s'$ non è maggiorante. ∎

**Versione simmetrica per inf:** $i = \inf A$ se e solo se $i$ è minorante e $\forall \varepsilon > 0,\ \exists a \in A : a < i + \varepsilon$.

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="300" fill="#111a30"/>
  <line x1="30" y1="180" x2="570" y2="180" stroke="#f3eed9" stroke-width="2"/>
  <rect x="100" y="170" width="300" height="20" fill="#d4af37" fill-opacity="0.3"/>
  <text x="250" y="160" fill="#d4af37" font-family="serif" font-size="14" text-anchor="middle">A (insieme)</text>
  <line x1="400" y1="60" x2="400" y2="200" stroke="#e07a8d" stroke-width="2" stroke-dasharray="5 5"/>
  <text x="400" y="50" fill="#e07a8d" font-family="serif" font-size="14" text-anchor="middle">s = sup A</text>
  <line x1="360" y1="100" x2="360" y2="200" stroke="#6fb38a" stroke-width="2" stroke-dasharray="3 3"/>
  <text x="340" y="90" fill="#6fb38a" font-family="serif" font-size="12" text-anchor="end">s − ε</text>
  <circle cx="380" cy="180" r="4" fill="#6aa9d8"/>
  <text x="380" y="220" fill="#6aa9d8" font-family="serif" font-size="13" text-anchor="middle">∃ a ∈ A, a &gt; s−ε</text>
  <text x="300" y="270" fill="#f3eed9" font-family="serif" font-size="13" text-anchor="middle">ε-caratterizzazione: per ogni ε, qualcuno di A supera s−ε</text>
</svg>
<div class="chart-caption">$\sup A$: ogni quantità più piccola di $s$ viene "superata" da qualche elemento di $A$. Questa è la versione che si usa nelle dimostrazioni.</div>
</div>

## Il teorema centrale

**Teorema dell'estremo superiore.** In $\mathbb{R}$, **ogni** insieme non vuoto e superiormente limitato ammette estremo superiore.

(È esattamente l'assioma di completezza, sez. 06. Lo enunciamo qui come teorema "di uso quotidiano".)

**Conseguenze immediate:**
1. Ogni $A$ non vuoto e inferiormente limitato ha $\inf$. (Trucco: considera $-A = \{-a : a \in A\}$; ha $\sup$ per il teorema; $-\sup(-A) = \inf A$.)
2. $\mathbb{N}$ non è superiormente limitato in $\mathbb{R}$. (Proprietà archimedea — sez. 06.)

## Esempi calcolati

**Esempio 1.** $A = \{1 - 1/n : n \ge 1\} = \{0, 1/2, 2/3, 3/4, 4/5, \dots\}$.

*Affermo*: $\sup A = 1$ (non max), $\inf A = 0$ (= min, raggiunto).

*Verifica del sup.*
- (C1): $1 - 1/n < 1$ per ogni $n \ge 1$. ✓
- (C2): dato $\varepsilon > 0$, scelgo $n > 1/\varepsilon$ (esiste per archimedeicità). Allora $1/n < \varepsilon$, quindi $1 - 1/n > 1 - \varepsilon$. ✓

Non è massimo perché $1 \notin A$ (richiederebbe $1/n = 0$, impossibile).

**Esempio 2.** $A = \{x \in \mathbb{Q} : x^2 < 2\}$.

In $\mathbb{R}$: $\sup A = \sqrt 2$. In $\mathbb{Q}$: il sup non esiste (vedi sez. 04: $\mathbb{Q}$ non è completo).

**Esempio 3 (insieme convenzionale).** Per convenzione $\sup \emptyset := -\infty$ e $\inf \emptyset := +\infty$. (Motivo: ogni reale è "maggiorante a vuoto" dell'insieme vuoto, quindi il minimo dei maggioranti è $-\infty$.)

## Sup e operazioni

**Teorema.** Siano $A, B \subseteq \mathbb{R}$ non vuoti e superiormente limitati. Allora:

1. **Unione**: $\sup(A \cup B) = \max(\sup A,\ \sup B)$.
2. **Somma**: $\sup(A + B) = \sup A + \sup B$, dove $A + B = \{a + b : a \in A, b \in B\}$.
3. **Prodotto** (se $A, B \subseteq [0, +\infty)$): $\sup(A \cdot B) = \sup A \cdot \sup B$.
4. **Scalare positivo**: se $c > 0$, $\sup(cA) = c \sup A$.
5. **Scalare negativo**: se $c < 0$, $\sup(cA) = c \inf A$ (il segno meno "scambia" sup e inf).

*Dim. di (2).* Sia $s = \sup A$, $t = \sup B$.
- Maggiorante: per ogni $a + b \in A + B$, $a \le s$ e $b \le t$, quindi $a + b \le s + t$. ✓
- (C2): dato $\varepsilon > 0$, esistono $a \in A$ con $a > s - \varepsilon/2$ e $b \in B$ con $b > t - \varepsilon/2$. Allora $a + b > s + t - \varepsilon$. ✓

Per la $\varepsilon$-caratterizzazione, $\sup(A + B) = s + t$. ∎

> **Attenzione (prodotto).** La formula $\sup(AB) = \sup A \cdot \sup B$ richiede **positività**. Senza, fallisce: vedi esercizio 4.

## Forme equivalenti di completezza

L'assioma del sup non è l'unico modo di esprimere "$\mathbb{R}$ non ha buchi". Le proprietà seguenti sono **tutte equivalenti** in un campo ordinato:

1. **(Sup)** Ogni sottoinsieme non vuoto superiormente limitato ha sup.
2. **(Intervalli incapsulati di Cantor)** Ogni successione decrescente $[a_n, b_n]$ di intervalli chiusi limitati ha intersezione non vuota.
3. **(Dedekind)** Per ogni "taglio" $\mathbb{R} = A \sqcup B$ con $A < B$ esiste $c$ con $\sup A = \inf B = c$.
4. **(Cauchy)** Ogni successione di Cauchy converge.
5. **(Bolzano-Weierstrass)** Ogni successione limitata ha sottosuccessione convergente.

Le rivedremo a fondo in sez. 08 e nelle sezioni sulle successioni.

### Sup ⇒ Intervalli incapsulati (esempio di dimostrazione tra forme)

**Teorema (Cantor — intervalli incapsulati).** Siano $[a_n, b_n]$ una successione di intervalli **chiusi e limitati**, con $[a_{n+1}, b_{n+1}] \subseteq [a_n, b_n]$ per ogni $n$. Allora $\bigcap_n [a_n, b_n] \ne \emptyset$.

> **Glossarietto:**
>
> - "Incapsulati" = ogni intervallo sta dentro al precedente.
> - "Chiusi e limitati" = inclusi gli estremi, con estremi finiti.

*Dim.* La successione $(a_n)$ è **crescente** (perché $a_n \le a_{n+1}$) e **limitata superiormente** (da $b_0$ — verifica). Sia $c = \sup\{a_n : n \in \mathbb{N}\}$. Per (C1), $c \ge a_n$ per ogni $n$.

Mostriamo $c \le b_n$ per ogni $n$. Affermazione: ogni $b_n$ è un maggiorante di $\{a_k\}_k$. *Verifica:* per $k \le n$, $a_k \le a_n \le b_n$; per $k > n$, $a_k \le b_k \le b_n$ (perché gli intervalli sono incapsulati: $b_k \le b_n$ se $k > n$). Quindi $b_n$ maggiora tutti gli $a_k$, e $c$ è il *minimo* dei maggioranti, dunque $c \le b_n$.

Mettendo insieme: $a_n \le c \le b_n$ per ogni $n$, cioè $c \in \bigcap_n [a_n, b_n]$. ∎

```mermaid
flowchart LR
  Sup["Sup-completezza"] -.equivalente.-> Int["Intervalli incapsulati"]
  Int -.equivalente.-> Ded["Sezioni di Dedekind"]
  Ded -.equivalente.-> Cauchy["Cauchy converge"]
  Cauchy -.equivalente.-> BW["Bolzano-Weierstrass"]
  BW -.equivalente.-> Sup
```

## Una conseguenza forte: Bolzano-Weierstrass (cenno)

**Teorema (BW).** Ogni successione limitata in $\mathbb{R}$ ammette una **sottosuccessione** convergente.

> **Glossarietto.** Una **sottosuccessione** di $(x_n)$ è una successione del tipo $(x_{n_k})_k$ con $n_0 < n_1 < n_2 < \dots$ — "scegliamo solo alcuni termini, in ordine".

*Idea di dim. tramite bisezione.* Sia $|x_n| \le M$ per ogni $n$. Sia $I_0 = [-M, M]$. Almeno una delle due metà $[-M, 0]$ o $[0, M]$ contiene **infiniti** $x_n$ (perché in totale ce ne sono infiniti). Chiamala $I_1$. Iteriamo: ad ogni passo bisechiamo l'intervallo corrente e prendiamo la metà con infiniti termini. Otteniamo $I_0 \supseteq I_1 \supseteq I_2 \supseteq \dots$, intervalli incapsulati con lunghezza che si dimezza ogni volta, quindi tende a 0.

Per il teorema di Cantor, $\bigcap_k I_k = \{L\}$. Estraendo un $x_{n_k} \in I_k$ per ogni $k$ (con indici $n_k$ crescenti), si ha $x_{n_k} \to L$. ∎

Vedremo BW più a fondo nel capitolo 13.

## Esempi calcolati extra

**Esempio A.** $\sup_{n \ge 1} \frac{n}{n + 1} = ?$

La successione è $\frac{1}{2}, \frac{2}{3}, \frac{3}{4}, \dots$, **crescente** verso 1 ($\frac{n}{n+1} = 1 - \frac{1}{n+1}$). Quindi $\sup = 1$, non raggiunto (no $n$ rende $\frac{n}{n+1} = 1$).

**Esempio B.** $\sup\{x y : x \in [0, 1], y \in [0, 1]\} = ?$

Per la regola (3) con $A = B = [0, 1]$ (entrambi non-negativi): $\sup A \cdot \sup B = 1 \cdot 1 = 1$. Raggiunto in $(1, 1)$.

**Esempio C.** $\sup_{x > 0} \dfrac{x}{x^2 + 1} = ?$

Per AM–GM (sez. 03): $x^2 + 1 \ge 2 x$, quindi $\dfrac{x}{x^2 + 1} \le \dfrac{x}{2x} = \dfrac{1}{2}$, con uguaglianza in $x = 1$. Quindi $\sup = 1/2$, **raggiunto** in $x = 1$ (quindi è massimo).

## Esercizi

<details>
<summary>Esercizio 1 — Calcolo sup/inf di un insieme classico</summary>

Calcolare $\sup$ e $\inf$ di $A = \left\{(-1)^n \cdot \dfrac{n}{n + 1} : n \in \mathbb{N}, n \ge 1\right\}$. Stabilire se sono raggiunti.

**Soluzione.** Esaminiamo a seconda della parità di $n$:

- $n$ **pari**: $(-1)^n = 1$, l'elemento è $\frac{n}{n+1} \in [\frac{1}{2}, 1)$, crescente verso 1 (non raggiunto).
  Wait — il primo $n$ pari è $n = 2$: $\frac{2}{3}$. Poi $\frac{4}{5}, \frac{6}{7}, \dots$
- $n$ **dispari**: $(-1)^n = -1$, l'elemento è $-\frac{n}{n+1} \in (-1, -\frac{1}{2}]$. Il massimo (meno negativo) è in $n = 1$: $-\frac{1}{2}$.

$\sup A = 1$ (non raggiunto, perché $\frac{n}{n+1} < 1$ sempre). $\inf A = -1$ (non raggiunto, per lo stesso motivo).
</details>

<details>
<summary>Esercizio 2 — Caratterizzazione del sup tramite successioni</summary>

Sia $A \subseteq \mathbb{R}$ non vuoto, superiormente limitato. Mostra che $s = \sup A$ se e solo se $s$ è maggiorante **ed** esiste una successione $(a_n) \subseteq A$ con $a_n \to s$.

**Soluzione.**

$(\Rightarrow)$ Per (C2), per ogni $n \ge 1$ esiste $a_n \in A$ con $a_n > s - 1/n$. Allora $s - 1/n < a_n \le s$, e per il teorema del confronto $a_n \to s$.

$(\Leftarrow)$ $s$ è maggiorante per ipotesi. Per (C2): dato $\varepsilon > 0$, per definizione di limite esiste $N$ tale che $|a_n - s| < \varepsilon$ per $n \ge N$, in particolare $a_N > s - \varepsilon$. ∎

(Importante: spesso si usa la versione "successione $\to \sup$" come metodo operativo.)
</details>

<details>
<summary>Esercizio 3 — Sup di un'unione</summary>

Siano $A, B \subseteq \mathbb{R}$ non vuoti, superiormente limitati. Dimostra che $\sup(A \cup B) = \max(\sup A,\ \sup B)$.

**Soluzione.** Sia $s = \max(\sup A,\ \sup B)$.

*Maggiorante:* ogni $x \in A \cup B$ è in $A$ o in $B$. Se è in $A$, $x \le \sup A \le s$. Idem se è in $B$.

*(C2):* dato $\varepsilon > 0$, supponiamo WLOG $s = \sup A$. Per la $\varepsilon$-caratterizzazione di $\sup A$, esiste $a \in A$ con $a > s - \varepsilon$. E $a \in A \cup B$.

Per la $\varepsilon$-caratterizzazione, $\sup(A \cup B) = s$. ∎
</details>

<details>
<summary>Esercizio 4 — La positività è essenziale per il prodotto</summary>

Trova un esempio in cui $\sup(A \cdot B) \ne \sup A \cdot \sup B$.

**Soluzione.** $A = B = [-2, 1]$. $\sup A = \sup B = 1$, prodotto dei sup $= 1$.

Ma $A \cdot B$ contiene $(-2)(-2) = 4$ (prodotto di due elementi negativi è positivo grande). Quindi $\sup(A \cdot B) \ge 4 \ne 1$.

La formula $\sup(AB) = \sup A \cdot \sup B$ richiede $A, B \subseteq [0, +\infty)$.
</details>

<details>
<summary>Esercizio 5 — Sup di sin su vari intervalli</summary>

Sia $f(x) = \sin x$. Calcolare:
- $\sup_{x \in \mathbb{R}} f(x)$
- $\sup_{x \in (0, \pi/4)} f(x)$
- $\sup_{x \in [0, \pi/4]} f(x)$

**Soluzione.**
- $\sup_\mathbb{R} \sin = 1$, raggiunto in $x = \pi/2 + 2 k \pi$ (massimo).
- $\sup_{(0, \pi/4)} \sin = \sin(\pi/4) = \sqrt 2 / 2 \approx 0.707$. **Non raggiunto** (perché $\pi/4 \notin (0, \pi/4)$ — intervallo aperto).
- $\sup_{[0, \pi/4]} \sin = \sqrt 2 / 2$, **raggiunto** in $x = \pi/4$ (massimo).
</details>

## Trappole comuni

- **Confondere sup con max.** Il sup è il *minimo dei maggioranti*; non è necessariamente un elemento di $A$. Esempio universale: $\sup(0, 1) = 1 \notin (0, 1)$.
- **Dimenticare la non-vuotezza.** Il teorema dice "$A$ non vuoto E superiormente limitato". Per convenzione $\sup \emptyset = -\infty$.
- **Calcoli sbagliati.** $\sup(A + B) = \sup A + \sup B$ sempre. $\sup(A \cdot B) = \sup A \cdot \sup B$ **solo** con positività. $\sup(-A) = -\inf A$ (il segno meno scambia sup ↔ inf).
- **Saltare la (C2).** Errore tipico: si dimostra che un certo $s$ è maggiorante e ci si ferma. Manca la verifica che è il *minimo* dei maggioranti — cioè la (C2). Senza (C2) hai solo "un" maggiorante, non il sup.

> **Pillola operativa.** Praticamente ogni dimostrazione di esistenza in Analisi I si può leggere come:
> "Considera $A := \{x : \text{tale proprietà}\}$. Prendi $s := \sup A$. Mostra che $s$ ha la proprietà cercata."
>
> Tieni questo schema mentale: lo riconoscerai in: teorema degli zeri (Bolzano), Weierstrass (max/min di funzioni continue), integrale di Riemann come sup di somme inferiori, esistenza di radici, e tanto altro.

## Riassunto in una riga

$\sup A$ = "minimo dei maggioranti" di $A$ — esiste **sempre** in $\mathbb{R}$ se $A$ è non vuoto e limitato sopra (assioma di completezza), e la sua $\varepsilon$-caratterizzazione (è maggiorante + ogni cosa più piccola di $\varepsilon$ non lo è) è lo strumento più potente di tutta l'analisi.
