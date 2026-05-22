---
title: "Matematica del liceo che ti serve davvero"
area: "Matematica"
summary: "Funzioni, esponenziali, logaritmi, sommatorie, derivata intuitiva. Tutto ciò che serve PRIMA di affrontare algebra lineare e calcolo — niente di assunto, niente di saltato."
order: 2.5
level: "principiante"
prereq:
  - "saper fare somme e moltiplicazioni"
tools:
  - "carta + matita"
---

# Matematica del liceo che ti serve davvero

## Perché esiste questa sezione

Tutti i corsi di data science assumono che tu ricordi la matematica del liceo. Tu probabilmente non la ricordi (o non l'hai mai capita davvero). Questa sezione **riempie il buco** in 30 minuti di lettura — niente di banale, niente di assunto.

Se sei già a tuo agio con esponenziali, logaritmi e il concetto di derivata, salta. Se anche solo una di queste tre parole ti mette ansia, leggi.

## 1. Funzioni: macchinette che trasformano

Una **funzione** è una "macchinetta": prende un input e restituisce un output, sempre lo stesso per lo stesso input.

$$f(x) = 2x + 3$$

Dai $x = 5$, ottieni $f(5) = 13$. Dai $x = 0$, ottieni $f(0) = 3$. Il "3" è l'**intercetta** (dove la retta tocca l'asse Y), il "2" è la **pendenza** (di quanto cresce per ogni unità di x).

### Funzioni che incontrerai nel percorso

<div class="chart"><svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,10)">
  <text x="60" y="10" fill="#7aa2ff" font-size="11" text-anchor="middle">lineare: y = 2x+1</text>
  <line x1="10" y1="180" x2="120" y2="180" stroke="#555"/>
  <line x1="10" y1="20" x2="10" y2="180" stroke="#555"/>
  <line x1="10" y1="160" x2="120" y2="40" stroke="#7aa2ff" stroke-width="2"/>
</g>
<g transform="translate(160,10)">
  <text x="60" y="10" fill="#ffb347" font-size="11" text-anchor="middle">quadratica: y = x²</text>
  <line x1="10" y1="180" x2="120" y2="180" stroke="#555"/>
  <line x1="10" y1="20" x2="10" y2="180" stroke="#555"/>
  <path d="M 10 30 Q 65 250 120 30" fill="none" stroke="#ffb347" stroke-width="2"/>
</g>
<g transform="translate(300,10)">
  <text x="60" y="10" fill="#c084fc" font-size="11" text-anchor="middle">esponenziale: y = eˣ</text>
  <line x1="10" y1="180" x2="120" y2="180" stroke="#555"/>
  <line x1="10" y1="20" x2="10" y2="180" stroke="#555"/>
  <path d="M 10 175 Q 70 170 90 130 Q 110 60 120 20" fill="none" stroke="#c084fc" stroke-width="2"/>
</g>
<g transform="translate(440,10)">
  <text x="60" y="10" fill="#5ee2c4" font-size="11" text-anchor="middle">logaritmica: y = ln(x)</text>
  <line x1="10" y1="180" x2="120" y2="180" stroke="#555"/>
  <line x1="10" y1="20" x2="10" y2="180" stroke="#555"/>
  <path d="M 12 250 Q 30 110 60 90 Q 90 75 120 65" fill="none" stroke="#5ee2c4" stroke-width="2"/>
</g>
</svg><div class="chart-caption">Le 4 funzioni che vedi più spesso in data science. Impara a riconoscerle al volo.</div></div>

| Funzione | Forma | Cresce come | La incontri in |
|---|---|---|---|
| Lineare | $y = ax + b$ | proporzionalmente | regressione lineare |
| Quadratica | $y = ax^2 + bx + c$ | come parabola | loss MSE, ottimizzazione |
| Esponenziale | $y = e^x$ | esplosiva | crescita virale, exp, softmax |
| Logaritmica | $y = \ln x$ | sempre più piano | log-likelihood, entropia |
| Sigmoide | $y = 1/(1+e^{-x})$ | "S" tra 0 e 1 | regressione logistica, NN |

## 2. Potenze ed esponenziali

### Le regole che devi conoscere a memoria

$$a^m \cdot a^n = a^{m+n}$$
$$\frac{a^m}{a^n} = a^{m-n}$$
$$(a^m)^n = a^{m \cdot n}$$
$$a^0 = 1 \quad \text{(per } a \neq 0\text{)}$$
$$a^{-n} = \frac{1}{a^n}$$
$$a^{1/n} = \sqrt[n]{a}$$

**Esempio**: $2^{10} = 1024$. $2^{-3} = 1/8 = 0.125$. $2^{1/2} = \sqrt{2} \approx 1.414$.

### Il numero $e$ (di Eulero)

$e \approx 2.71828$. Non è una scelta arbitraria: è l'unico numero la cui funzione $e^x$ ha **come derivata se stessa**. Compare ovunque dove c'è crescita "naturale" o decadimento.

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots$$

Per $x$ piccolo: $e^x \approx 1 + x$. Per $x = 1$: $e^1 = e$. Per $x \to \infty$: esplode.

> Dove lo vedi: softmax, sigmoid, decay del learning rate, distribuzione esponenziale, Gaussian PDF.

## 3. Logaritmi: l'esponenziale all'incontrario

Il **logaritmo in base $b$** di $x$ è il numero $y$ tale che $b^y = x$:

$$\log_b x = y \iff b^y = x$$

**Esempi**:
- $\log_{10} 1000 = 3$ (perché $10^3 = 1000$)
- $\log_2 8 = 3$ (perché $2^3 = 8$)
- $\log_2 1 = 0$ (perché $2^0 = 1$)

### Logaritmo naturale: $\ln x = \log_e x$

Quello che troverai sempre nei paper di ML. **Solo $\ln$, mai "log generico"**.

### Le regole da incorniciare

$$\ln(ab) = \ln a + \ln b$$
$$\ln(a/b) = \ln a - \ln b$$
$$\ln(a^k) = k \ln a$$
$$\ln 1 = 0, \quad \ln e = 1$$

### Perché i log appaiono ovunque in ML

**1. Trasformano prodotti in somme.** La verosimiglianza di $n$ campioni indipendenti è un prodotto:

$$L(\theta) = \prod_{i=1}^n p(x_i|\theta)$$

Numericamente: con $n=1000$, ogni $p \sim 10^{-3}$, il prodotto va a $10^{-3000}$ → underflow. Prendi il log:

$$\log L(\theta) = \sum_{i=1}^n \log p(x_i|\theta)$$

Somme di numeri "umani". Senza overflow.

**2. Compressano scale enormi.** Da 1 a 1 miliardo è invisibile in scala lineare. In log: da 0 a 9, perfettamente visibile.

<div class="chart"><svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(20,20)">
  <text x="120" y="0" fill="#7aa2ff" font-size="11">scala lineare</text>
  <line x1="10" y1="140" x2="270" y2="140" stroke="#555"/>
  <circle cx="10" cy="140" r="4" fill="#ffb347"/>
  <text x="10" y="155" fill="#ffb347" font-size="9" text-anchor="middle">1</text>
  <circle cx="11" cy="140" r="4" fill="#ffb347"/>
  <text x="20" y="125" fill="#ffb347" font-size="9">10</text>
  <circle cx="13" cy="140" r="4" fill="#ffb347"/>
  <text x="22" y="110" fill="#ffb347" font-size="9">100</text>
  <circle cx="35" cy="140" r="4" fill="#ffb347"/>
  <text x="35" y="125" fill="#ffb347" font-size="9" text-anchor="middle">10k</text>
  <circle cx="270" cy="140" r="4" fill="#ffb347"/>
  <text x="270" y="125" fill="#ffb347" font-size="9" text-anchor="middle">1M</text>
</g>
<g transform="translate(330,20)">
  <text x="120" y="0" fill="#7aa2ff" font-size="11">scala log</text>
  <line x1="10" y1="140" x2="270" y2="140" stroke="#555"/>
  <circle cx="10" cy="140" r="4" fill="#5ee2c4"/>
  <text x="10" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">1</text>
  <circle cx="55" cy="140" r="4" fill="#5ee2c4"/>
  <text x="55" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">10</text>
  <circle cx="100" cy="140" r="4" fill="#5ee2c4"/>
  <text x="100" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">100</text>
  <circle cx="190" cy="140" r="4" fill="#5ee2c4"/>
  <text x="190" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">10k</text>
  <circle cx="270" cy="140" r="4" fill="#5ee2c4"/>
  <text x="270" y="155" fill="#5ee2c4" font-size="9" text-anchor="middle">1M</text>
</g>
</svg><div class="chart-caption">In scala lineare i piccoli numeri scompaiono. In log sono distanziati equamente.</div></div>

## 4. Notazione: sommatorie e produttorie

### Sommatoria $\Sigma$

$$\sum_{i=1}^n a_i = a_1 + a_2 + \dots + a_n$$

**Da memorizzare**:

$$\sum_{i=1}^n i = \frac{n(n+1)}{2}$$

$$\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$$

### Produttoria $\Pi$

$$\prod_{i=1}^n a_i = a_1 \cdot a_2 \cdots a_n$$

### Regole base

Costanti escono dalla sommatoria:

$$\sum_i c \cdot a_i = c \sum_i a_i$$

Somma di somme:

$$\sum_i (a_i + b_i) = \sum_i a_i + \sum_i b_i$$

**Esempio concreto**: calcola la media di $\{3, 5, 7, 9\}$.

$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i = \frac{1}{4}(3+5+7+9) = \frac{24}{4} = 6$$

## 5. Insiemi e probabilità (basi)

| Simbolo | Significato | Esempio |
|---|---|---|
| $\in$ | appartiene | $3 \in \{1,2,3\}$ |
| $\subset$ | sottoinsieme | $\{1,2\} \subset \{1,2,3\}$ |
| $\cup$ | unione | $\{1,2\} \cup \{2,3\} = \{1,2,3\}$ |
| $\cap$ | intersezione | $\{1,2\} \cap \{2,3\} = \{2\}$ |
| $\emptyset$ | insieme vuoto | $\{1,2\} \cap \{3,4\} = \emptyset$ |
| $A^c$ o $\bar{A}$ | complementare | tutto ciò che NON è in A |
| $\|A\|$ | cardinalità | $\|\{1,2,3\}\| = 3$ |

## 6. Geometria: piano cartesiano

### Distanza tra due punti

$P_1 = (x_1, y_1)$, $P_2 = (x_2, y_2)$:

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

Generalizza in 3D con $z$, e in dimensione qualsiasi (vedi sezione algebra lineare).

### Equazione della retta

$$y = mx + q$$

- $m$ = pendenza (positiva = sale, negativa = scende, 0 = orizzontale)
- $q$ = intercetta sull'asse y

**Esempio**: $y = 2x - 3$. Pendenza 2 (per ogni +1 di x, y cresce di 2), passa per $(0, -3)$ e per $(1.5, 0)$.

### Equazione del cerchio

Cerchio di centro $(a, b)$ e raggio $r$:

$$(x - a)^2 + (y - b)^2 = r^2$$

## 7. Derivata: il concetto in 3 minuti

La **derivata** di $f(x)$ in $x_0$ è la **pendenza** della retta tangente al grafico di $f$ in $x_0$. Si scrive $f'(x_0)$ o $\frac{df}{dx}\big|_{x_0}$.

<div class="chart"><svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="200" x2="460" y2="200" stroke="#555"/>
<line x1="40" y1="20" x2="40" y2="200" stroke="#555"/>
<path d="M 40 200 Q 120 200 200 130 T 460 30" fill="none" stroke="#7aa2ff" stroke-width="2.5"/>
<line x1="120" y1="190" x2="280" y2="80" stroke="#ffb347" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="200" cy="135" r="5" fill="#ffb347"/>
<text x="210" y="130" fill="#ffb347" font-size="11">x₀, f(x₀)</text>
<text x="290" y="78" fill="#ffb347" font-size="11">pendenza tangente = f'(x₀)</text>
<text x="280" y="200" fill="#8b949e" font-size="10">se f' &gt; 0: cresce</text>
<text x="280" y="215" fill="#8b949e" font-size="10">se f' &lt; 0: scende</text>
<text x="280" y="230" fill="#8b949e" font-size="10">se f' = 0: estremo (max/min)</text>
</svg><div class="chart-caption">La derivata è "quanto cresce f vicino a x₀". Geometricamente: pendenza della tangente.</div></div>

### Le 5 derivate da sapere a memoria

| $f(x)$ | $f'(x)$ |
|---|---|
| $c$ (costante) | $0$ |
| $x$ | $1$ |
| $x^n$ | $n x^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |

**Esempio passo per passo**: $f(x) = 3x^2 + 5x - 1$.

Derivata termine per termine:
- $3x^2$ → $3 \cdot 2x = 6x$
- $5x$ → $5$
- $-1$ → $0$

Risultato: $f'(x) = 6x + 5$.

In $x_0 = 2$: $f'(2) = 17$. La pendenza in quel punto è 17 (ripida verso l'alto).

### Perché ci interessa

Nella sezione "calcolo e ottimizzazione" vedrai che **trovare il minimo di una funzione** (= minimizzare la loss di un modello) significa **trovare dove la derivata è zero**, o muoversi nella direzione opposta del gradiente (la versione vettoriale della derivata).

Tutto il machine learning moderno è derivate.

## 8. Algebra di base: le manipolazioni che farai sempre

### Risolvere un'equazione lineare

$$3x + 5 = 17$$

Sposta a destra: $3x = 17 - 5 = 12$. Dividi: $x = 4$.

### Risolvere un'equazione quadratica

$$ax^2 + bx + c = 0 \implies x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

La formula risolutiva. Memorizzala.

**Esempio**: $x^2 - 5x + 6 = 0$. $a=1, b=-5, c=6$. Delta = $25 - 24 = 1$. $x = (5 \pm 1)/2 = 3$ o $2$.

### Manipolare frazioni

$$\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$$
$$\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}$$
$$\frac{a/b}{c/d} = \frac{a}{b} \cdot \frac{d}{c} = \frac{ad}{bc}$$

### Sostituzione di variabili

Se $y = e^z$ e ti viene chiesto di scrivere $z$ in funzione di $y$: applica $\ln$ a entrambi i lati. $\ln y = \ln(e^z) = z$. Quindi $z = \ln y$.

Questa "ginnastica" tornerà mille volte: cambiare variabile per semplificare.

## 9. Trigonometria (versione minimale)

Ti serve raramente, ma in 2 contesti sì:

### Seno e coseno

Per un angolo $\theta$ in un triangolo rettangolo con ipotenusa 1:
- $\sin\theta$ = lato opposto
- $\cos\theta$ = lato adiacente

Proprietà chiave:
$$\sin^2\theta + \cos^2\theta = 1$$

In data science li trovi quando:
- Codifichi ore/giorni come feature cicliche (sez. feature engineering).
- Studi reti convoluzionali / segnali (Fourier).
- Vedi rotazioni in spazi vettoriali (PCA, embedding).

### Periodicità

$\sin$ e $\cos$ si ripetono ogni $2\pi$ (≈ 6.28). $\sin(0) = 0$, $\sin(\pi/2) = 1$, $\sin(\pi) = 0$, $\sin(3\pi/2) = -1$.

## 10. Cose che NON devi sapere (sorpresa)

Per evitare la sindrome dell'impostore: per fare data science applicata **NON ti serve**:

- Risolvere integrali a mano (i computer lo fanno).
- Conoscere teoria dei gruppi, anelli, campi.
- Saper dimostrare il teorema di Bolzano-Weierstrass.
- Tutto quanto ti hanno torturato al liceo scientifico nel "preparazione alla maturità".

Le **idee** ti servono. Le **tecniche di calcolo manuale** quasi mai. Quando ti serve un calcolo simbolico, c'è SymPy o WolframAlpha.

## Esercizi

<details>
<summary>Esercizio 1 — Esponenziali a mano</summary>

Calcola:
1. $2^5 \cdot 2^3$
2. $(3^2)^4$
3. $10^{-2}$
4. $4^{1/2}$
5. $2^{10}$

**Soluzioni**: 1. $2^8=256$. 2. $3^8 = 6561$. 3. $0.01$. 4. $2$. 5. $1024$.
</details>

<details>
<summary>Esercizio 2 — Logaritmi a mano</summary>

Calcola:
1. $\log_{10} 100$
2. $\log_2 32$
3. $\ln e^5$
4. $\log_2(8 \cdot 4)$ usando $\log(ab) = \log a + \log b$
5. $\ln(1/e)$

**Soluzioni**: 1. $2$. 2. $5$. 3. $5$. 4. $\log_2 8 + \log_2 4 = 3 + 2 = 5$. 5. $-1$.
</details>

<details>
<summary>Esercizio 3 — Derivate a mano</summary>

Deriva:
1. $f(x) = 7x^3$
2. $f(x) = x^2 - 4x + 3$
3. $f(x) = e^x + 5\ln x$
4. $f(x) = 1/x$ (suggerimento: $1/x = x^{-1}$)

**Soluzioni**: 1. $21x^2$. 2. $2x - 4$. 3. $e^x + 5/x$. 4. $-x^{-2} = -1/x^2$.
</details>

<details>
<summary>Esercizio 4 — Equazioni quadratiche</summary>

Risolvi:
1. $x^2 - 9 = 0$
2. $2x^2 - 8x + 6 = 0$
3. $x^2 + x - 6 = 0$

**Soluzioni**: 1. $x = \pm 3$. 2. Divide per 2: $x^2 - 4x + 3 = 0$. Delta=4. $x = (4 \pm 2)/2 = 3$ o $1$. 3. Delta = $1 + 24 = 25$. $x = (-1 \pm 5)/2 = 2$ o $-3$.
</details>

<details>
<summary>Esercizio 5 — Sommatorie</summary>

1. Calcola $\sum_{i=1}^5 i$.
2. Calcola $\sum_{i=1}^4 i^2$.
3. Riscrivi senza il simbolo: $\sum_{i=1}^3 (2i + 1)$.

**Soluzioni**: 1. $15$. 2. $30$. 3. $3 + 5 + 7 = 15$.
</details>

<details>
<summary>Esercizio 6 — Geometria</summary>

Distanza tra $P_1 = (1, 2)$ e $P_2 = (4, 6)$.

**Soluzione**: $\sqrt{(4-1)^2 + (6-2)^2} = \sqrt{9+16} = \sqrt{25} = 5$.

Lo riconoscerai come la "norma L2" in algebra lineare. Stessa formula, nuovo nome.
</details>

<details>
<summary>Esercizio 7 — Pendenza di una retta passante per 2 punti</summary>

Trova $m$ e $q$ per la retta passante per $(1, 3)$ e $(4, 9)$.

**Soluzione**: $m = (9-3)/(4-1) = 2$. $q$ dalla prima equazione: $3 = 2 \cdot 1 + q \Rightarrow q = 1$. Retta: $y = 2x + 1$.

Quando addestrerai una regressione lineare con scikit-learn, è esattamente quello che il computer fa — per migliaia di punti contemporaneamente.
</details>

## Cosa portarti via

- Funzioni base: lineare, quadratica, esponenziale, logaritmica, sigmoide. Visualizzale.
- $e \approx 2.718$. La sua derivata è se stesso.
- Log = esponenziale rovesciato. Trasforma prodotti in somme. Salvavita numerico.
- Sommatorie e produttorie sono solo notazione compatta.
- Derivata = pendenza tangente. Zero in massimi/minimi.
- Manipolazione algebrica è ginnastica: la fai senza pensarci.

Ora sei pronto per algebra lineare e calcolo, le 2 sezioni successive.
