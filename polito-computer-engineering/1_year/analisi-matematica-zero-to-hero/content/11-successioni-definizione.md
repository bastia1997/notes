---
title: "Successioni e limiti: la definizione ε-N"
area: Successioni
summary: "La **definizione rigorosa di limite** di una successione. Spiegata con esempi concretissimi prima dei simboli, e con un glossarietto di ogni lettera ($\\varepsilon$, $N$, $a_n$). La riga su cui poggia tutta l'analisi."
order: 11
level: intermedio
prereq:
  - "Topologia di R: intorni, punti di accumulazione (sez. 10)"
  - "Quantificatori ∀ ed ∃ (sez. 01)"
  - "Valore assoluto e disuguaglianze (sez. 06)"
tools:
  - "Rudin — *Principles*, cap. 3"
  - "Giusti — *Analisi 1*"
  - "Tao — *Analysis I*, ch. 6"
---

# Successioni e limiti: la definizione ε-N

## Perché parlarne

Le successioni sono il **microscopio** dell'analisi. Ogni nozione "continua" (limite di funzione, integrale, derivata, serie) si riduce — o si caratterizza — tramite successioni. Capire bene la definizione $\varepsilon$-$N$ significa avere in mano lo strumento universale.

L'idea: una successione $(a_n)$ converge a $L$ se i suoi termini si avvicinano *definitivamente* a $L$, dove "definitivamente" è quantificato in modo preciso da $\varepsilon$ e $N$.

## Intuizione veloce, prima dei simboli

Pensa alla successione $a_n = 1/n$:
$$1,\ \tfrac{1}{2},\ \tfrac{1}{3},\ \tfrac{1}{4},\ \tfrac{1}{5},\ \dots$$

I termini si "schiacciano" verso $0$ ma non lo raggiungono mai. Diciamo che il **limite** è $0$.

Come si formalizza "si schiacciano verso 0"? Così: per ogni **tolleranza** $\varepsilon > 0$ — diciamo $\varepsilon = 0.01$ — c'è un **indice di partenza** $N$ tale che da $N$ in poi i termini sono entro $\varepsilon$ da 0.
- Per $\varepsilon = 0.01$: ci serve $1/n < 0.01$, cioè $n > 100$. Quindi $N = 101$ basta.
- Per $\varepsilon = 0.0001$: ci serve $n > 10000$. $N = 10001$.

L'**$N$ dipende da $\varepsilon$**: più stretta è la tolleranza, più tardi inizia la "coda buona".

**Punto chiave**: il limite **non parla di un singolo termine**, parla di una **coda** (i termini da $N$ in poi). Una successione può oscillare per i primi $10^{100}$ termini e poi stabilizzarsi: il limite se ne frega di quello che succede all'inizio. Conta solo "alla fine".

## Cos'è una successione

Una **successione** in $\mathbb{R}$ è una funzione $a : \mathbb{N} \to \mathbb{R}$, che si scrive in forma compatta $(a_n)_{n \in \mathbb{N}}$ oppure $(a_n)$.

> **Glossarietto:**
>
> - $a_n$ = il **termine $n$-esimo** della successione (il valore in $n$).
> - L'indice $n$ può partire da $0$, da $1$ o da un $n_0$ qualsiasi — non cambia nulla nelle proprietà asintotiche (ciò che vale "da un certo punto in poi").
> - Esempi: $a_n = 1/n$, $a_n = n^2$, $a_n = (-1)^n$, $a_n = \sin(n)$.

## La definizione ε-N di limite finito

**Definizione.** $(a_n)$ **converge a** $L \in \mathbb{R}$ — scritto $\lim_{n \to \infty} a_n = L$ oppure $a_n \to L$ — se

$$\forall \varepsilon > 0,\ \exists N \in \mathbb{N},\ \forall n \ge N,\ |a_n - L| < \varepsilon.$$

> **Glossarietto della formula — leggiamola simbolo per simbolo:**
>
> - $\forall \varepsilon > 0$ = "per ogni tolleranza positiva $\varepsilon$, anche piccolissima". $\varepsilon$ (epsilon) è lettera greca standard per "errore piccolo".
> - $\exists N \in \mathbb{N}$ = "esiste un indice $N$" (un numero naturale, la "soglia temporale").
> - $\forall n \ge N$ = "per ogni $n$ uguale o maggiore di $N$" — cioè "da $N$ in poi".
> - $|a_n - L|$ = la **distanza** fra il termine $a_n$ e il limite $L$ (vedi sez. 06 sul valore assoluto).
> - $|a_n - L| < \varepsilon$ = "$a_n$ è entro $\varepsilon$ da $L$".
>
> **Tradotta in italiano:** "per quanto stretto tu fissi un margine $\varepsilon$, esiste un indice $N$ tale che da quel $N$ in poi tutti i termini stanno entro $\varepsilon$ dal limite $L$".

**Ordine cruciale dei quantificatori.** $\varepsilon$ viene prima di $N$: prima fissi la tolleranza, poi *cerchi* (in funzione di $\varepsilon$) la soglia $N$. Se invertissi l'ordine — $\exists N, \forall \varepsilon$ — la definizione diventerebbe "esiste un $N$ tale che da quel punto in poi $a_n = L$ esattamente", troppo forte (richiederebbe che la successione fosse *uguale* a $L$ definitivamente).

### Negazione

Negando la definizione (regola di sez. 01: scambia $\forall \leftrightarrow \exists$, nega la condizione finale):
$$\exists \varepsilon > 0,\ \forall N,\ \exists n \ge N,\ |a_n - L| \ge \varepsilon.$$

> **Tradotto.** "$a_n \not\to L$" significa: esiste una soglia $\varepsilon$ tale che, per quanto avanti tu vada (per ogni $N$), trovi sempre un termine successivo ($n \ge N$) che dista almeno $\varepsilon$ da $L$.

## Limiti infiniti

**$\lim a_n = +\infty$** se
$$\forall M > 0,\ \exists N,\ \forall n \ge N,\ a_n > M.$$

> **Glossarietto:**
>
> - $M$ = una "soglia di grandezza" (rivolta in alto), arbitrariamente grande.
> - $a_n > M$ = "$a_n$ supera $M$".
>
> **Tradotto.** "Per quanto grande tu fissi un valore $M$, da un certo indice in poi tutti i termini lo superano".

**$\lim a_n = -\infty$** se
$$\forall M > 0,\ \exists N,\ \forall n \ge N,\ a_n < -M.$$

(Stesso schema, ma rivolto in basso.)

### Vocabolario delle successioni

- **Convergente**: ha limite finito.
- **Divergente**: ha limite $+\infty$ o $-\infty$.
- **Irregolare** (o **oscillante**): non ha limite (es. $(-1)^n$).

## Riformulazione topologica

Per chi conosce gli intorni (sez. 10): la definizione di limite equivale a

> $a_n \to L$ $\iff$ per ogni intorno $U$ di $L$, **definitivamente** $a_n \in U$.

Cioè da un certo indice in poi tutti i termini stanno dentro l'intorno scelto. Questa è la forma "topologica" che si generalizza a spazi qualunque.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">aₙ = 1 + (−1)ⁿ / n  →  1</text>
  <line x1="50" y1="250" x2="580" y2="250" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="60" x2="50" y2="270" stroke="#3a4868" stroke-width="1"/>
  <line x1="50" y1="160" x2="580" y2="160" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="555" y="156" fill="#d4af37" font-family="ui-monospace" font-size="11">L=1</text>
  <rect x="50" y="135" width="530" height="50" fill="#d4af37" fill-opacity="0.08"/>
  <line x1="50" y1="135" x2="580" y2="135" stroke="#e8a04a" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="50" y1="185" x2="580" y2="185" stroke="#e8a04a" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="10" y="139" fill="#e8a04a" font-family="ui-monospace" font-size="10">L+ε</text>
  <text x="10" y="189" fill="#e8a04a" font-family="ui-monospace" font-size="10">L−ε</text>
  <g fill="#6fb38a">
    <circle cx="80" cy="100" r="4"/>
    <circle cx="120" cy="220" r="4"/>
    <circle cx="160" cy="120" r="4"/>
    <circle cx="200" cy="200" r="4"/>
    <circle cx="240" cy="135" r="4"/>
    <circle cx="280" cy="185" r="4"/>
    <circle cx="320" cy="145" r="4"/>
    <circle cx="360" cy="175" r="4"/>
    <circle cx="400" cy="152" r="4"/>
    <circle cx="440" cy="168" r="4"/>
    <circle cx="480" cy="156" r="4"/>
    <circle cx="520" cy="164" r="4"/>
  </g>
  <line x1="240" y1="60" x2="240" y2="270" stroke="#e07a8d" stroke-width="1.5" stroke-dasharray="4 4"/>
  <text x="245" y="75" fill="#e07a8d" font-family="ui-monospace" font-size="11">N(ε)</text>
  <text x="245" y="290" fill="#e07a8d" font-family="ui-monospace" font-size="11">da qui in poi tutti dentro la banda</text>
  <text x="50" y="270" fill="#f3eed9" font-family="ui-monospace" font-size="10">n=1</text>
  <text x="540" y="270" fill="#f3eed9" font-family="ui-monospace" font-size="10">n→∞</text>
</svg>
<div class="chart-caption">La banda $[L - \varepsilon, L + \varepsilon]$ cattura definitivamente tutti i termini. La soglia $N$ dipende da $\varepsilon$.</div>
</div>

## Teoremi base

### Teorema 1 — Unicità del limite

> Se $a_n \to L$ e $a_n \to L'$, allora $L = L'$.

> **A parole:** una successione non può avere due limiti diversi.

*Dim. (per assurdo).* Supponiamo $L \ne L'$. Sia $\varepsilon = |L - L'|/3 > 0$.

Per $a_n \to L$: $\exists N_1$ tale che $|a_n - L| < \varepsilon$ per $n \ge N_1$.
Per $a_n \to L'$: $\exists N_2$ tale che $|a_n - L'| < \varepsilon$ per $n \ge N_2$.

Per $n \ge \max(N_1, N_2)$, per la disuguaglianza triangolare:
$$|L - L'| \le |L - a_n| + |a_n - L'| < 2 \varepsilon = \frac{2}{3} |L - L'|.$$
Quindi $1 \le 2/3$, assurdo. ∎

### Teorema 2 — Convergente implica limitata

> Se $(a_n)$ converge, allora è **limitata**: $\exists M > 0 : |a_n| \le M$ per ogni $n$.

*Dim.* Sia $a_n \to L$. Applichiamo $\varepsilon = 1$: $\exists N$ tale che $|a_n - L| < 1$ per $n \ge N$, da cui $|a_n| < |L| + 1$.

I termini iniziali $a_0, a_1, \dots, a_{N-1}$ sono **finiti in numero**, hanno modulo massimo $M_0 = \max(|a_0|, \dots, |a_{N-1}|)$. Posto $M = \max(M_0, |L| + 1)$, $|a_n| \le M$ per ogni $n$. ∎

> **Il viceversa è falso.** $(-1)^n$ è limitata ($|a_n| = 1$) ma non converge.

### Teorema 3 — Permanenza del segno

> Se $a_n \to L > 0$, allora **definitivamente** $a_n > L/2 > 0$.

> **A parole:** se il limite è strettamente positivo, da un certo punto in poi i termini sono "almeno la metà" del limite, quindi positivi.

*Dim.* Applichiamo $\varepsilon = L/2 > 0$: $\exists N$ tale che $|a_n - L| < L/2$ per $n \ge N$. Da cui $a_n > L - L/2 = L/2 > 0$. ∎

(Versione duale per $L < 0$.)

**Versione "debole"** (con $\le$): se $a_n \ge 0$ definitivamente e $a_n \to L$, allora $L \ge 0$ (ma non necessariamente $L > 0$: per $a_n = 1/n > 0$ il limite è $L = 0$).

## Esempi guidati

### Esempio 1: $1/n \to 0$

*Dim.* Dato $\varepsilon > 0$, scegliamo $N > 1/\varepsilon$ (esiste per archimedeicità — sez. 06). Allora per $n \ge N$:
$$n \ge N > 1/\varepsilon \Longrightarrow 1/n < \varepsilon \Longrightarrow |1/n - 0| < \varepsilon. \quad\blacksquare$$

### Esempio 2: $(-1)^n$ non ha limite

*Dim. (per assurdo).* Supponiamo $a_n = (-1)^n \to L$. Per $\varepsilon = 1/2$, $\exists N : |a_n - L| < 1/2$ per $n \ge N$.

Ma $a_n$ alterna $+1, -1$: per indici consecutivi $n, n+1 \ge N$, $|a_n - a_{n+1}| = 2$. Però:
$$|a_n - a_{n+1}| \le |a_n - L| + |L - a_{n+1}| < 1/2 + 1/2 = 1,$$
quindi $2 < 1$, assurdo. ∎

### Esempio 3: $a^n \to 0$ se $|a| < 1$

*Dim.* Scriviamo $|a| = \dfrac{1}{1 + h}$ con $h > 0$ (esiste se $|a| < 1$). Per la disuguaglianza di Bernoulli (sez. 03), $(1 + h)^n \ge 1 + n h > n h$. Quindi:
$$|a|^n = \frac{1}{(1 + h)^n} < \frac{1}{n h}.$$
Dato $\varepsilon > 0$, scegliamo $N > 1/(h \varepsilon)$. Per $n \ge N$, $|a^n - 0| = |a|^n < 1/(n h) < \varepsilon$. ∎

### Esempio 4: $\sqrt{n + 1} - \sqrt n \to 0$

*Dim.* **Razionalizziamo** moltiplicando per il coniugato:
$$\sqrt{n + 1} - \sqrt{n} = \frac{(\sqrt{n+1} - \sqrt n)(\sqrt{n+1} + \sqrt n)}{\sqrt{n+1} + \sqrt n} = \frac{(n+1) - n}{\sqrt{n+1} + \sqrt n} = \frac{1}{\sqrt{n+1} + \sqrt n} < \frac{1}{2 \sqrt n}.$$

Dato $\varepsilon > 0$, scegliamo $N > 1/(4 \varepsilon^2)$. Per $n \ge N$, $|a_n - 0| < 1/(2\sqrt n) < \varepsilon$. ∎

## Tecnica generale per dimostrare un limite

Lo schema "ufficiale":

1. **Fissa** $\varepsilon > 0$ (arbitrario).
2. **Maggiora** $|a_n - L|$ con una quantità più semplice $f(n)$ che tende a 0.
3. **Risolvi** $f(n) < \varepsilon$ in $n$, trovando una soglia $N(\varepsilon)$.
4. **Concludi**: per ogni $n \ge N$, $|a_n - L| \le f(n) < \varepsilon$.

Il passo (2) è il cuore tecnico: serve un *bound* gestibile. Tecniche tipiche:
- Disuguaglianza di Bernoulli ($(1 + h)^n \ge 1 + nh$).
- Razionalizzazione (moltiplicare per il coniugato $\sqrt a + \sqrt b$).
- Disuguaglianza triangolare ($|x + y| \le |x| + |y|$).
- Binomio di Newton.

## Trappole comuni

- **L'ordine "$\forall \varepsilon$, $\exists N$" non si inverte.** "$\exists N, \forall \varepsilon$" è troppo forte (richiederebbe $a_n = L$ esattamente da $N$ in poi).
- **$N$ non è unico.** Qualunque $N' \ge N$ funziona. Non cercare il minimo $N$ — cerca *un* $N$ che basti.
- **Limite ≠ valore raggiunto.** $1/n$ non vale **mai** $0$, eppure $\lim = 0$. Il limite è ciò a cui ci si **avvicina**, non ciò che si raggiunge.
- **"Definitivamente" è una parola tecnica:** significa "da un certo indice in poi". Non confondere con "spesso" o "infinite volte" (descrive sottosuccessioni, cap. 13).
- **Limitata non implica convergente.** $(-1)^n$ è limitata e non converge. (Servirà "monotona + limitata", cap. 13.)

## Esercizi

<details>
<summary>Esercizio 1 — Limite con la definizione</summary>

Dimostra che $\displaystyle \lim_{n \to \infty} \frac{2n + 1}{n + 3} = 2$.

**Soluzione.**
$$\left|\frac{2n + 1}{n + 3} - 2\right| = \left|\frac{2n + 1 - 2(n + 3)}{n + 3}\right| = \left|\frac{-5}{n + 3}\right| = \frac{5}{n + 3} < \frac{5}{n}.$$

Dato $\varepsilon > 0$, scegliamo $N > 5/\varepsilon$. Per $n \ge N$, $\frac{5}{n} \le \frac{5}{N} < \varepsilon$, quindi $|a_n - 2| < \varepsilon$. ∎
</details>

<details>
<summary>Esercizio 2 — Soglia esplicita</summary>

Per $a_n = \dfrac{n^2 - 1}{n^2 + 1}$, mostra $a_n \to 1$ e calcola $N(\varepsilon)$ esplicito per $\varepsilon = 10^{-3}$.

**Soluzione.**
$$|a_n - 1| = \left|\frac{n^2 - 1 - (n^2 + 1)}{n^2 + 1}\right| = \frac{2}{n^2 + 1} < \frac{2}{n^2}.$$

Per $\varepsilon = 10^{-3}$, vogliamo $2/n^2 < 10^{-3}$, cioè $n^2 > 2000$, $n > \sqrt{2000} \approx 44.7$. Basta $N = 45$. ∎

In generale, $N(\varepsilon) = \lceil \sqrt{2/\varepsilon} \rceil$.
</details>

<details>
<summary>Esercizio 3 — Divergenza a $+\infty$</summary>

Dimostra che $\sqrt n \to +\infty$.

**Soluzione.** Dato $M > 0$, scegliamo $N = \lceil M^2 \rceil + 1$. Per $n \ge N$, $\sqrt n \ge \sqrt N > M$. ∎
</details>

<details>
<summary>Esercizio 4 — Successione oscillante</summary>

Sia $a_n = \sin(n \pi/2)$. Determina se ha limite.

**Soluzione.** I valori ciclano: $\sin(0) = 0, \sin(\pi/2) = 1, \sin(\pi) = 0, \sin(3\pi/2) = -1, \sin(2\pi) = 0, \dots$ I valori sono $0, 1, 0, -1, 0, 1, 0, -1, \dots$

Per qualunque $L$ candidato, scegli $\varepsilon < 1/2$. Esistono infiniti $n$ con $a_n = 1$ e infiniti con $a_n = -1$. Almeno uno fra $|1 - L|$ e $|-1 - L|$ è $\ge 1 > \varepsilon$ — infinite volte. Quindi non c'è nessun $N$ che funzioni. Nessun limite. ∎
</details>

<details>
<summary>Esercizio 5 — Somma di limiti (anticipo)</summary>

Siano $a_n \to A$ e $b_n \to B$. Dimostra $a_n + b_n \to A + B$ usando solo la definizione.

**Soluzione.** Per la disuguaglianza triangolare:
$$|(a_n + b_n) - (A + B)| \le |a_n - A| + |b_n - B|.$$
Dato $\varepsilon > 0$:
- $\exists N_1$ con $|a_n - A| < \varepsilon/2$ per $n \ge N_1$ (definizione di $a_n \to A$).
- $\exists N_2$ con $|b_n - B| < \varepsilon/2$ per $n \ge N_2$.

Per $n \ge \max(N_1, N_2)$: $|(a_n + b_n) - (A + B)| < \varepsilon/2 + \varepsilon/2 = \varepsilon$. ∎

> **Trucco del $\varepsilon/2$.** Classico: per ottenere $< \varepsilon$ alla fine, si applica la definizione con la metà a ciascun pezzo. Vedremo l'algebra completa nel cap. 12.
</details>

<details>
<summary>Esercizio 6 — Sandwich primitivo (carabinieri)</summary>

Siano $a_n \le b_n \le c_n$ definitivamente, e $a_n, c_n \to L$. Dimostra $b_n \to L$.

**Soluzione.** Dato $\varepsilon > 0$:
- $\exists N_1$ con $L - \varepsilon < a_n < L + \varepsilon$ per $n \ge N_1$.
- $\exists N_2$ con $L - \varepsilon < c_n < L + \varepsilon$ per $n \ge N_2$.

Per $n \ge \max(N_1, N_2)$:
$$L - \varepsilon < a_n \le b_n \le c_n < L + \varepsilon,$$
quindi $|b_n - L| < \varepsilon$. ∎

Questo è il **teorema dei carabinieri** (i due carabinieri $a_n, c_n$ "scortano" $b_n$ fino a $L$). Fondamentale.
</details>

## Riassunto in una riga

Il limite di una successione si definisce in *una sola riga* di simboli:
$$\forall \varepsilon > 0,\ \exists N,\ \forall n \ge N,\ |a_n - L| < \varepsilon$$
che si legge "*per ogni margine $\varepsilon$ c'è un indice da cui in poi tutti i termini stanno entro $\varepsilon$ dal limite $L$*" — tutta l'analisi reale torna a questa riga, riformulata.
