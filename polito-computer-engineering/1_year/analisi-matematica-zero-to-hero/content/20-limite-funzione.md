---
title: "Limite di funzione: la definizione"
area: Limiti
summary: "La definizione $\\varepsilon$-$\\delta$ di \"$f(x) \\to L$ quando $x \\to x_0$\" — la traduzione rigorosa dell'idea di \"si avvicina\". Versioni con limiti laterali, all'infinito, infiniti. Caratterizzazione sequenziale di Heine."
order: 20
level: intermedio
prereq:
  - "Successioni e limiti (sez. 11)"
  - "Logica e quantificatori (sez. 01)"
  - "Topologia di base in $\\mathbb{R}$ (sez. 10)"
tools:
  - "Rudin — *Principles*, cap. 4"
  - "Giusti — *Analisi 1*"
---

# Limite di funzione: la definizione

## Perché la definizione $\varepsilon$-$\delta$

Hai un'idea intuitiva: "$f(x) \to L$ quando $x \to x_0$" significa "$f(x)$ si avvicina a $L$ quando $x$ si avvicina a $x_0$".

Per fare matematica seria, questa frase non basta: cosa vuol dire "si avvicina"? Cauchy l'ha tradotta in simboli (1820), Weierstrass l'ha formalizzata (1860): è la definizione $\varepsilon$-$\delta$, su cui si fondano le dimostrazioni.

## Punto di accumulazione

Prima di definire il limite, devi sapere **dove** ha senso farlo.

**Definizione.** Sia $A \subseteq \mathbb{R}$ e $x_0 \in \mathbb{R}$. $x_0$ è un **punto di accumulazione** di $A$ se ogni intorno di $x_0$ contiene almeno un punto di $A$ **diverso da $x_0$**:
$$\forall \delta > 0,\ (x_0 - \delta, x_0 + \delta) \cap (A \setminus \{x_0\}) \ne \emptyset.$$

> **Glossarietto:**
>
> - $A$ = dominio della funzione (insieme dove $f$ è definita).
> - $x_0$ può **non appartenere** ad $A$ — basta esserle "vicino quanto si vuole".
>
> **Esempi.**
> - $A = (0, 1)$: punti di accumulazione $= [0, 1]$. Anche $0$ e $1$, pur non in $A$, lo sono.
> - $A = \{1/n : n \ge 1\}$: l'unico punto di accumulazione è $0$. Tutti gli $1/n$ sono *isolati*.
> - $A = \mathbb{Q}$: punti di accumulazione $= \mathbb{R}$ (densità).
> - $A = \mathbb{N}$: nessun punto di accumulazione.

**Perché serve.** Per parlare di $\lim_{x \to x_0} f(x)$ serve poter "avvicinarsi" a $x_0$ dentro al dominio. Se $x_0$ è isolato (intorno di $x_0$ disgiunto da $A \setminus \{x_0\}$), il limite non è definito.

## Definizione di limite finito al finito

**Definizione (Cauchy-Weierstrass).** Sia $f : A \to \mathbb{R}$, $x_0 \in A'$ punto di accumulazione, $L \in \mathbb{R}$. Si dice $\lim_{x \to x_0} f(x) = L$ se:
$$\forall \varepsilon > 0,\ \exists \delta > 0 : \forall x \in A,\ 0 < |x - x_0| < \delta \Rightarrow |f(x) - L| < \varepsilon.$$

> **Glossarietto della formula — leggiamola simbolo per simbolo:**
>
> - $\forall \varepsilon > 0$ = "per ogni soglia di **tolleranza sul valore $f(x)$**, anche piccolissima". $\varepsilon$ è l'errore sulla destinazione $L$.
> - $\exists \delta > 0$ = "esiste una soglia di **vicinanza sul punto $x$**". $\delta$ è la distanza da $x_0$.
> - $\forall x \in A$ = "per ogni $x$ nel dominio".
> - $0 < |x - x_0| < \delta$ = "$x$ è entro $\delta$ da $x_0$ MA $x \ne x_0$" (il "$0 <$" esclude il punto stesso).
> - $|f(x) - L| < \varepsilon$ = "$f(x)$ è entro $\varepsilon$ da $L$".
>
> **Tradotto in italiano:** "per ogni tolleranza $\varepsilon$ sul valore $f(x)$, posso trovare una vicinanza $\delta$ del punto $x_0$ tale che, se $x$ è entro $\delta$ da $x_0$ (ma diverso), allora $f(x)$ è entro $\varepsilon$ da $L$".

**Punti sottili — leggi 3 volte:**

1. **La condizione $0 < |x - x_0|$ esclude $x = x_0$.** Il valore $f(x_0)$ (se esiste) **non influenza il limite**. Esempio: $f(x) = x^2$ se $x \ne 3$ e $f(3) = 100$. $\lim_{x \to 3} f(x) = 9$ (il valore in $3$ è ignorato).
2. **$x$ deve stare in $A$.** Se $A = [0, 1]$ e $x_0 = 0$, "entro $\delta$ da $x_0$" significa $0 \le x < \delta$ (parte sinistra esclusa dal dominio).
3. **$\delta$ dipende da $\varepsilon$** (e in generale da $x_0$). Scriviamo $\delta = \delta(\varepsilon)$. Più stretto $\varepsilon$, più piccolo $\delta$.

## Esempio guidato 1: $\lim_{x \to 2} (3x - 1) = 5$ (lineare)

Vogliamo: $\forall \varepsilon > 0,\ \exists \delta > 0$ con $0 < |x - 2| < \delta \Rightarrow |(3x - 1) - 5| < \varepsilon$.

**Lavoro sull'obiettivo.** $|(3x - 1) - 5| = |3x - 6| = 3 |x - 2|$. Voglio $3 |x - 2| < \varepsilon$, cioè $|x - 2| < \varepsilon/3$.

**Scelta.** $\delta = \varepsilon/3$.

**Verifica.** Sia $\varepsilon > 0$. Posto $\delta = \varepsilon/3$: se $0 < |x - 2| < \delta$, allora $|3x - 6| = 3|x - 2| < 3 \delta = \varepsilon$. ∎

## Esempio guidato 2: $\lim_{x \to 3} x^2 = 9$ (non lineare)

Voglio $|x^2 - 9| < \varepsilon$. Fattorizzo: $|x^2 - 9| = |x - 3| \cdot |x + 3|$.

Il problema: $|x + 3|$ non è fisso. Lo controllo restringendo a $|x - 3| < 1$ (cioè $2 < x < 4$), così $|x + 3| < 7$.

In quest'intervallo: $|x^2 - 9| < 7 |x - 3|$, che è $< \varepsilon$ se $|x - 3| < \varepsilon/7$.

**Scelta.** $\delta = \min(1,\ \varepsilon/7)$.

**Verifica.** Se $0 < |x - 3| < \delta$: $|x - 3| < 1$ (quindi $|x + 3| < 7$) E $|x - 3| < \varepsilon/7$. Quindi $|x^2 - 9| < 7 \cdot \varepsilon/7 = \varepsilon$. ∎

> **Lezione cardine** (tecnica per limiti non lineari):
> 1. **Limita** $|x - x_0|$ con una costante (tipicamente $1$) per "controllare i termini rumorosi" (es. $|x + x_0|$).
> 2. Ottieni una stima del tipo $|f(x) - L| \le C |x - x_0|$.
> 3. Scegli $\delta = \min(1, \varepsilon/C)$.

## Limiti laterali (destro e sinistro)

A volte $f$ non si comporta uguale a sinistra e a destra di $x_0$ — pensa al gradino $\text{sgn}(x)$.

**Definizione.** Per $x_0$ punto di accumulazione di $A \cap (x_0, +\infty)$:
$$\lim_{x \to x_0^+} f(x) = L \iff \forall \varepsilon > 0,\ \exists \delta > 0 : \forall x \in A,\ x_0 < x < x_0 + \delta \Rightarrow |f(x) - L| < \varepsilon.$$

(Si guarda solo gli $x$ **a destra** di $x_0$.)

Analogamente $x \to x_0^-$ (a sinistra, $x_0 - \delta < x < x_0$).

> **Teorema.** $\lim_{x \to x_0} f(x) = L$ esiste **se e solo se** entrambi i limiti laterali esistono e coincidono con $L$.

**Esempio.** $f(x) = \text{sgn}(x)$ = $1$ se $x > 0$, $-1$ se $x < 0$, $0$ se $x = 0$.
$$\lim_{x \to 0^+} \text{sgn}(x) = 1, \quad \lim_{x \to 0^-} \text{sgn}(x) = -1.$$
I limiti laterali sono diversi, quindi il limite bilatero **non esiste**.

## Limiti all'infinito

Se il dominio è illimitato superiormente, posso far "andare $x$ all'infinito":

$$\lim_{x \to +\infty} f(x) = L \iff \forall \varepsilon > 0,\ \exists M > 0 : \forall x \in A,\ x > M \Rightarrow |f(x) - L| < \varepsilon.$$

> **Glossarietto:**
>
> - $M$ = soglia "di quanto andare lontani" (analogo all'$N$ delle successioni).
> - $x > M$ = "$x$ è grande abbastanza".

**Esempio.** $\lim_{x \to +\infty} 1/x = 0$. Dato $\varepsilon$, scegli $M = 1/\varepsilon$. Se $x > M$, allora $0 < 1/x < 1/M = \varepsilon$. ∎

## Limiti infiniti

Quando $f$ stessa "esplode":
$$\lim_{x \to x_0} f(x) = +\infty \iff \forall N > 0,\ \exists \delta > 0 : 0 < |x - x_0| < \delta \Rightarrow f(x) > N.$$

> **Glossarietto:** $N$ = "qualunque grandezza" che $f(x)$ deve superare.

**Esempio.** $\lim_{x \to 0^+} 1/x = +\infty$. Dato $N$, scegli $\delta = 1/N$: se $0 < x < \delta$, allora $1/x > 1/\delta = N$. ∎

## Caratterizzazione sequenziale (Heine)

**Teorema (Heine).** Siano $f : A \to \mathbb{R}$, $x_0 \in A'$, $L \in \mathbb{R}$. Le seguenti sono **equivalenti**:

1. $\lim_{x \to x_0} f(x) = L$ (definizione $\varepsilon$-$\delta$).
2. Per **ogni** successione $(x_n) \subseteq A \setminus \{x_0\}$ con $x_n \to x_0$, vale $f(x_n) \to L$.

> **A parole:** la versione "funzione" del limite equivale alla versione "qualunque successione converga al punto, la sua immagine converge al limite".

**Utilità.** Spesso è più facile lavorare con successioni (capp. 11-15). Heine traduce una in un'altra.

*Dim. ($1 \Rightarrow 2$).* Dato $\varepsilon > 0$, per $(1)$ esiste $\delta$ tale che $0 < |x - x_0| < \delta \Rightarrow |f(x) - L| < \varepsilon$. Poiché $x_n \to x_0$, esiste $N$ con $|x_n - x_0| < \delta$ per $n \ge N$, e $x_n \ne x_0$, quindi $|f(x_n) - L| < \varepsilon$. ∎

*Dim. ($2 \Rightarrow 1$) per contronominale.* Se $(1)$ falsa, $\exists \varepsilon_0$ tale che per ogni $\delta > 0$ trovi $x \in A$ con $0 < |x - x_0| < \delta$ e $|f(x) - L| \ge \varepsilon_0$.

Prendi $\delta = 1/n$: trovi $x_n$ con $|x_n - x_0| < 1/n$ e $|f(x_n) - L| \ge \varepsilon_0$. Allora $x_n \to x_0$ ma $f(x_n) \not\to L$, negando $(2)$. ∎

### Applicazione: non esistenza del limite

Per mostrare che $\lim$ **non** esiste, basta esibire due successioni $(x_n), (y_n) \to x_0$ con $f(x_n) \to L_1 \ne L_2 \leftarrow f(y_n)$.

**Esempio.** $f(x) = \sin(1/x)$, $x_0 = 0$.
- $x_n = 1/(n \pi) \to 0$: $f(x_n) = \sin(n\pi) = 0 \to 0$.
- $y_n = 1/(\pi/2 + 2 n \pi) \to 0$: $f(y_n) = \sin(\pi/2 + 2 n \pi) = 1 \to 1$.

Due limiti diversi → $\lim_{x \to 0} \sin(1/x)$ NON esiste.

## Visualizzazione ε-δ

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="270" x2="580" y2="270" stroke="#948f78" stroke-width="1"/>
<line x1="80" y1="20" x2="80" y2="290" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="270" x2="300" y2="280" stroke="#948f78"/>
<text x="293" y="290" fill="#f3eed9" font-size="11" font-style="italic">x₀</text>
<line x1="80" y1="150" x2="70" y2="150" stroke="#948f78"/>
<text x="50" y="155" fill="#f3eed9" font-size="11" font-style="italic">L</text>
<rect x="80" y="120" width="500" height="60" fill="#d4af37" opacity="0.10"/>
<line x1="80" y1="120" x2="580" y2="120" stroke="#d4af37" stroke-width="0.8" stroke-dasharray="4,3"/>
<line x1="80" y1="180" x2="580" y2="180" stroke="#d4af37" stroke-width="0.8" stroke-dasharray="4,3"/>
<text x="45" y="125" fill="#d4af37" font-size="11">L+ε</text>
<text x="45" y="185" fill="#d4af37" font-size="11">L−ε</text>
<rect x="250" y="20" width="100" height="250" fill="#6fb38a" opacity="0.10"/>
<line x1="250" y1="20" x2="250" y2="290" stroke="#6fb38a" stroke-width="0.8" stroke-dasharray="4,3"/>
<line x1="350" y1="20" x2="350" y2="290" stroke="#6fb38a" stroke-width="0.8" stroke-dasharray="4,3"/>
<text x="225" y="305" fill="#6fb38a" font-size="11">x₀−δ</text>
<text x="335" y="305" fill="#6fb38a" font-size="11">x₀+δ</text>
<path d="M 100,250 Q 200,200 280,160 Q 300,148 320,138 Q 400,90 560,40" fill="none" stroke="#e8a04a" stroke-width="2.2"/>
<text x="535" y="55" fill="#e8a04a" font-size="12" font-style="italic">f(x)</text>
<circle cx="300" cy="150" r="3" fill="#e07a8d"/>
</svg>
<div class="chart-caption">Definizione ε-δ: data una banda orizzontale $(L - \varepsilon, L + \varepsilon)$, devi trovare una banda verticale $(x_0 - \delta, x_0 + \delta)$ tale che il grafico (escluso $x = x_0$) cada dentro la banda orizzontale.</div>
</div>

## Riassunto delle 6 varianti di limite

| $x \to$ | $\lim f =$ | struttura quantificatori |
|---|---|---|
| $x_0$ finito | $L$ finito | $\forall \varepsilon, \exists \delta : \|x-x_0\| < \delta$ |
| $x_0$ finito | $\pm \infty$ | $\forall N, \exists \delta : \|x-x_0\| < \delta$ |
| $+\infty$ | $L$ finito | $\forall \varepsilon, \exists M : x > M$ |
| $+\infty$ | $\pm \infty$ | $\forall N, \exists M : x > M$ |
| $-\infty$ | analoghi | con $x < -M$ |

> **Pattern unico:** $\forall$ tolleranza sull'arrivo, $\exists$ soglia sulla partenza. È lo schema universale.

## Esercizi

<details>
<summary>Esercizio 1 — Verifica $\varepsilon$-$\delta$ lineare</summary>

Dimostra con $\varepsilon$-$\delta$ che $\lim_{x \to 1} (2x + 5) = 7$.

**Soluzione.** $|2x + 5 - 7| = 2|x - 1| < \varepsilon \iff |x - 1| < \varepsilon/2$.

**Scelta:** $\delta = \varepsilon/2$. Verifica diretta. ∎
</details>

<details>
<summary>Esercizio 2 — Verifica $\varepsilon$-$\delta$ non lineare</summary>

Dimostra $\lim_{x \to 4} \sqrt x = 2$.

**Soluzione.** $|\sqrt x - 2| = \frac{|x - 4|}{\sqrt x + 2}$ (razionalizzo).

Restringo a $|x - 4| < 1$ ($3 < x < 5$): $\sqrt x + 2 > 3$, quindi $|\sqrt x - 2| < |x - 4|/3$.

**Scelta:** $\delta = \min(1, 3 \varepsilon)$. ∎
</details>

<details>
<summary>Esercizio 3 — Limite infinito</summary>

Dimostra $\lim_{x \to 2} \frac{1}{(x - 2)^2} = +\infty$.

**Soluzione.** Dato $N$, voglio $1/(x-2)^2 > N$, cioè $|x - 2| < 1/\sqrt N$.

**Scelta:** $\delta = 1/\sqrt N$. ∎
</details>

<details>
<summary>Esercizio 4 — Non esistenza con Heine</summary>

Mostra che $\lim_{x \to 0} \cos(1/x)$ non esiste.

**Soluzione.** $x_n = 1/(2 n \pi) \to 0$: $\cos(1/x_n) = \cos(2 n \pi) = 1$.
$y_n = 1/((2n + 1) \pi) \to 0$: $\cos(1/y_n) = \cos((2n + 1) \pi) = -1$.

Limiti diversi → per Heine il limite non esiste. ∎
</details>

<details>
<summary>Esercizio 5 — Limite all'infinito</summary>

Dimostra $\lim_{x \to +\infty} \frac{3x + 1}{x - 2} = 3$.

**Soluzione.** $\left|\frac{3x + 1}{x - 2} - 3\right| = \frac{7}{|x - 2|}$. Voglio $< \varepsilon$, cioè $x > 2 + 7/\varepsilon$.

**Scelta:** $M = 2 + 7/\varepsilon$. ∎
</details>

<details>
<summary>Esercizio 6 — Limiti laterali</summary>

Calcola $\lim_{x \to 0^+}$ e $\lim_{x \to 0^-}$ di $f(x) = x/|x|$.

**Soluzione.** Per $x > 0$: $f(x) = x/x = 1 \to 1$. Per $x < 0$: $f(x) = x/(-x) = -1 \to -1$. Bilatero non esiste. ∎
</details>

## Riassunto in una riga

$\lim_{x \to x_0} f(x) = L$ significa "$\forall$ tolleranza $\varepsilon$ su $f(x)$, $\exists$ soglia $\delta$ su $x$ tale che $0 < |x - x_0| < \delta \Rightarrow |f(x) - L| < \varepsilon$" — la versione "funzione" della definizione $\varepsilon$-$N$ delle successioni, equivalente via Heine al "ogni successione $x_n \to x_0$ produce $f(x_n) \to L$".
