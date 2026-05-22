---
title: "Teoremi sui limiti di funzioni"
area: Limiti
summary: "Le regole \"algebriche\" che permettono di calcolare limiti **senza** tornare alla definizione $\\varepsilon$-$\\delta$ ogni volta. Unicità, somma/prodotto/quoziente, permanenza del segno, **carabinieri**, sostituzione, forme indeterminate."
order: 21
level: intermedio
prereq:
  - "Definizione di limite di funzione (sez. 20)"
  - "Teoremi sui limiti di successioni (sez. 12)"
tools:
  - "Rudin — *Principles*, cap. 4"
  - "Bramanti-Pagani-Salsa — *Analisi 1*"
---

# Teoremi sui limiti di funzioni

## Idea generale

Una volta capita la definizione (cap. 20), calcolare ogni limite a colpi di $\varepsilon$-$\delta$ è insostenibile. I teoremi di questa sezione sono il "calcolo" dei limiti: combinano limiti elementari per ottenere limiti complessi **senza** ripassare per la definizione.

Quasi tutti si dimostrano direttamente o tramite la **caratterizzazione sequenziale di Heine** (cap. 20): "tradurre" un limite di funzione in un limite di successione, su cui abbiamo già teoria (cap. 12).

**Convenzione.** In tutta la sezione: $f, g : A \to \mathbb{R}$, $x_0 \in A'$, e $\lim_{x \to x_0} f(x) = L$, $\lim_{x \to x_0} g(x) = M$ esistono finiti, salvo dove specificato.

> **Glossarietto:**
>
> - $f, g$ = funzioni reali da analizzare.
> - $A \subseteq \mathbb{R}$ = dominio (insieme di numeri su cui $f, g$ sono definite).
> - $x_0 \in A'$ = **punto di accumulazione** di $A$ (vi si possono "avvicinare" punti di $A$ senza mai raggiungerlo).
> - $L, M \in \mathbb{R}$ = i due limiti (numeri reali finiti).
> - $\varepsilon, \delta > 0$ = tolleranze (verticale, orizzontale) della definizione di limite.
> - **Intorno bucato** di $x_0$ = $(x_0 - \delta, x_0 + \delta) \setminus \{x_0\}$ — escludiamo il punto centrale.

## Unicità del limite

**Teorema.** Se $\lim f = L_1$ e $\lim f = L_2$ (stesso $x_0$), allora $L_1 = L_2$.

*Dim. (per assurdo).* Se $L_1 \ne L_2$, prendi $\varepsilon = |L_1 - L_2|/2 > 0$. Per la definizione, $\exists \delta : |f(x) - L_1| < \varepsilon$ e $|f(x) - L_2| < \varepsilon$. Per triangolare: $|L_1 - L_2| < 2\varepsilon = |L_1 - L_2|$, assurdo. ∎

## Algebra dei limiti

**Teorema.** Siano $\lim f = L$, $\lim g = M$ finiti. Allora:

1. **Somma**: $\lim (f + g) = L + M$.
2. **Prodotto**: $\lim (f \cdot g) = L \cdot M$.
3. **Scalare**: $\lim (c f) = c L$ per ogni $c \in \mathbb{R}$.
4. **Quoziente**: se $M \ne 0$, $\lim (f / g) = L / M$ (per $x$ vicino a $x_0$, $g(x) \ne 0$).
5. **Modulo**: $\lim |f| = |L|$.

*Dim. della somma.* Per la disuguaglianza triangolare:
$$|f(x) + g(x) - (L + M)| \le |f(x) - L| + |g(x) - M|.$$
Dato $\varepsilon > 0$: $\exists \delta_1$ con $|f - L| < \varepsilon/2$ e $\exists \delta_2$ con $|g - M| < \varepsilon/2$. Posto $\delta = \min(\delta_1, \delta_2)$: somma $< \varepsilon$. ∎

*Dim. del prodotto.* Trucco "somma e sottrai $L g$" (come per successioni, cap. 12):
$$|fg - LM| \le |g| \cdot |f - L| + |L| \cdot |g - M|.$$
Limitando $|g| \le |M| + 1 =: K$ vicino a $x_0$, e scegliendo $|f - L| < \varepsilon/(2K)$, $|g - M| < \varepsilon/(2(|L|+1))$: $|fg - LM| < \varepsilon$. ∎

## Permanenza del segno

**Teorema.** Se $\lim_{x \to x_0} f(x) = L > 0$, allora **esiste un intorno bucato** di $x_0$ in cui $f(x) > 0$.

> **A parole:** se il limite è strettamente positivo, definitivamente lo è anche $f(x)$.

*Dim.* Prendi $\varepsilon = L/2 > 0$. $\exists \delta : |f - L| < L/2$, quindi $f(x) > L - L/2 = L/2 > 0$. ∎

**Corollario.** Se $f(x) \ge 0$ in un intorno bucato e $\lim f = L$, allora $L \ge 0$.

> **Attenzione:** con $>$ stretto non funziona. $f(x) = x^2 > 0$ su $(0, 1)$ ma $\lim_{x \to 0^+} f = 0$, non $> 0$.

## Teorema del confronto

**Teorema.** Se $f(x) \le g(x)$ in un intorno bucato di $x_0$, e $\lim f = L$, $\lim g = M$ esistono, allora $L \le M$.

*Dim.* Applico la permanenza del segno a $g - f \ge 0$: $M - L \ge 0$. ∎

## Teorema dei carabinieri

**Teorema (carabinieri / sandwich).** Siano $f, g, h$ definite in un intorno bucato di $x_0$ con $f(x) \le g(x) \le h(x)$ ivi. Se $\lim f = \lim h = L$ (stesso $L$), allora $\lim g = L$.

> **A parole:** due funzioni che convergono allo stesso limite "stringono" una terza fra loro a convergere allo stesso limite.

*Dim.* Dato $\varepsilon > 0$, $\exists \delta$ tale che $L - \varepsilon < f(x)$ e $h(x) < L + \varepsilon$ (combinando le definizioni). Allora $L - \varepsilon < f(x) \le g(x) \le h(x) < L + \varepsilon$, quindi $|g(x) - L| < \varepsilon$. ∎

### Esempio paradigmatico

$\lim_{x \to 0} x \sin(1/x) = 0$.

*Soluzione.* Per ogni $x \ne 0$: $-|x| \le x \sin(1/x) \le |x|$ (perché $|\sin| \le 1$). Entrambi gli estremi $\to 0$. Per carabinieri, limite $= 0$.

> **Curiosità.** $\lim_{x \to 0} \sin(1/x)$ NON esiste (oscilla), ma moltiplicato per $x$ "si schiaccia" a 0.

## Sostituzione (cambio di variabile)

**Teorema.** Siano $g : A \to B$ con $\lim_{x \to x_0} g(x) = y_0$, e $f : B \to \mathbb{R}$ con $\lim_{y \to y_0} f(y) = L$. Se vale **almeno una** delle:

- $g(x) \ne y_0$ in un intorno bucato di $x_0$, **oppure**
- $f$ è continua in $y_0$ con $f(y_0) = L$,

allora $\lim_{x \to x_0} f(g(x)) = L$.

> **Perché serve la condizione extra:** senza, $g$ potrebbe valere $y_0$ infinite volte e $f(y_0)$ potrebbe essere diverso da $L$, rovinando la composizione.

**Esempio buono.** $\lim_{x \to 0} \sin(\sin x)$. Pongo $y = \sin x \to 0$. Poi $\sin y \to 0$. Risultato 0.

## Forme indeterminate

Le **forme indeterminate** sono espressioni che non si risolvono con la sola algebra dei limiti:

$$\frac{0}{0},\ \frac{\infty}{\infty},\ 0 \cdot \infty,\ \infty - \infty,\ 1^\infty,\ 0^0,\ \infty^0.$$

> **Attenzione.** "Indeterminata" NON significa "limite non esiste". Significa "il limite **dipende dalla velocità** con cui le parti vanno a 0 o $\infty$, non solo dai loro limiti".

**Esempi della stessa forma $0/0$:**
- $\lim_{x \to 0} x/x = 1$.
- $\lim_{x \to 0} x^2/x = 0$.
- $\lim_{x \to 0} x/x^2 = \pm \infty$.
- $\lim_{x \to 0} \sin x / x = 1$ (limite notevole).

### Forme NON indeterminate

Per chiarezza: $1/0^+ = +\infty$, $\infty + \infty = +\infty$, $\infty \cdot \infty = +\infty$, $a^\infty$ con $|a| > 1$ è $\pm \infty$, $a^\infty$ con $|a| < 1$ è $0$.

## Limiti notevoli (anteprima, cap. 22)

I limiti "atomici" per sciogliere forme indeterminate:

$$\lim_{x \to 0} \frac{\sin x}{x} = 1, \quad \lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}$$
$$\lim_{x \to 0} \frac{e^x - 1}{x} = 1, \quad \lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1$$
$$\lim_{x \to \pm\infty} (1 + 1/x)^x = e$$
$$\lim_{x \to +\infty} \frac{\ln x}{x^\alpha} = 0\ (\alpha > 0), \quad \lim_{x \to +\infty} \frac{x^\alpha}{e^x} = 0$$

## Esempi calcolati

**1.** $\lim_{x \to 2} (x^2 - 3 x + 1) = 4 - 6 + 1 = -1$ (polinomi: il limite è il valore).

**2.** $\lim_{x \to 1} (x^2 - 1)/(x - 1)$. Forma $0/0$. Fattorizzo: $(x - 1)(x + 1)/(x - 1) = x + 1$ per $x \ne 1$. Limite $= 2$.

**3.** $\lim_{x \to +\infty} (3 x^2 - x + 1)/(2 x^2 + 5)$. Forma $\infty/\infty$. Raccolgo $x^2$: $\frac{3 - 1/x + 1/x^2}{2 + 5/x^2} \to 3/2$.

**4.** $\lim_{x \to 0} \sin(3 x)/x = 3 \cdot \lim \sin(3x)/(3x) = 3 \cdot 1 = 3$.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="170" x2="580" y2="170" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="290" stroke="#948f78" stroke-width="1"/>
<text x="295" y="185" fill="#f3eed9" font-size="11">0</text>
<polyline points="100,300 300,170 500,300" fill="none" stroke="#d4af37" stroke-width="2"/>
<text x="495" y="290" fill="#d4af37" font-size="12">h(x) = |x|</text>
<polyline points="100,40 300,170 500,40" fill="none" stroke="#d4af37" stroke-width="2"/>
<text x="495" y="50" fill="#d4af37" font-size="12">f(x) = −|x|</text>
<polyline points="120,260 140,225 155,200 170,235 185,210 200,240 215,205 230,232 250,200 270,195 285,182 295,175 305,168 315,160 330,148 350,138 370,118 385,135 400,108 415,135 430,100 450,128 470,90 490,118" fill="none" stroke="#6fb38a" stroke-width="1.8"/>
<text x="475" y="78" fill="#6fb38a" font-size="12">g(x) = x sin(1/x)</text>
</svg>
<div class="chart-caption">$g(x) = x \sin(1/x)$ oscilla violentemente vicino a 0, ma è schiacciata fra $-|x|$ e $|x|$, entrambe $\to 0$. Per carabinieri, $g(x) \to 0$.</div>
</div>

## Esercizi

<details>
<summary>Esercizio 1 — Algebra</summary>

$\lim_{x \to 3} (x^2 - 5)/(x + 2)$.

**Soluzione.** Numeratore $\to 4$, denominatore $\to 5 \ne 0$. Limite $= 4/5$. ∎
</details>

<details>
<summary>Esercizio 2 — Forma $0/0$ con fattorizzazione</summary>

$\lim_{x \to 2} (x^3 - 8)/(x^2 - 4)$.

**Soluzione.** Num $= (x-2)(x^2 + 2x + 4)$. Den $= (x-2)(x+2)$. Per $x \ne 2$: $(x^2 + 2x + 4)/(x + 2) \to 12/4 = 3$. ∎
</details>

<details>
<summary>Esercizio 3 — Carabinieri</summary>

$\lim_{x \to 0} x^2 \cos(1/x^3)$.

**Soluzione.** $|x^2 \cos(1/x^3)| \le x^2 \to 0$. Per carabinieri, limite $= 0$. ∎
</details>

<details>
<summary>Esercizio 4 — Razionalizzazione</summary>

$\lim_{x \to +\infty} (\sqrt{x^2 + 1} - x)$.

**Soluzione.** Forma $\infty - \infty$. Coniugato:
$$\sqrt{x^2 + 1} - x = \frac{1}{\sqrt{x^2 + 1} + x} \to 0. \quad\blacksquare$$
</details>

<details>
<summary>Esercizio 5 — Sostituzione</summary>

$\lim_{x \to 0} \sin(x^2)/x^2$.

**Soluzione.** Pongo $y = x^2 \to 0^+$. $\sin y / y \to 1$. ∎
</details>

<details>
<summary>Esercizio 6 — Permanenza del segno</summary>

Se $\lim_{x \to x_0} f(x) = -3$, mostra che esiste un intorno bucato dove $f(x) < -2$.

**Soluzione.** $\varepsilon = 1$: $\exists \delta : |f + 3| < 1$, cioè $-4 < f < -2$. In particolare $f < -2$. ∎
</details>

<details>
<summary>Esercizio 7 — $\infty - \infty$</summary>

$\lim_{x \to +\infty} (x - \ln x)$.

**Soluzione.** $x - \ln x = x(1 - \ln x/x)$. Per limite notevole, $\ln x/x \to 0$, quindi $1 - \ln x/x \to 1$. Quindi $x - \ln x \to +\infty$. ∎
</details>

## Riassunto in una riga

I limiti di funzione si calcolano con le **regole algebriche** (somma, prodotto, quoziente) + il **teorema dei carabinieri** + le **manipolazioni standard** (fattorizzazione, razionalizzazione, sostituzione) + i **limiti notevoli** (cap. 22) — tornando alla definizione $\varepsilon$-$\delta$ solo per stabilire le regole, non per i calcoli quotidiani.
