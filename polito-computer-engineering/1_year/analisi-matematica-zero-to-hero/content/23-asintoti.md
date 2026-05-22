---
title: "Asintoti orizzontali, verticali, obliqui"
area: Limiti
summary: "Le rette a cui il grafico di una funzione \"si avvicina indefinitamente\". Definizione precisa dei tre tipi (orizzontale, verticale, obliquo), formule per trovare $m$ e $q$ degli obliqui, e l'algoritmo per cercarli tutti."
order: 23
level: intermedio
prereq:
  - "Limiti di funzione (sez. 20-22)"
tools:
  - "Bramanti-Pagani-Salsa — *Analisi 1*"
---

# Asintoti orizzontali, verticali, obliqui

## Cosa sono e perché interessano

Un **asintoto** è una **retta** a cui il grafico di una funzione si "avvicina indefinitamente" — senza necessariamente toccarla. Studiare gli asintoti è il primo passo dello **studio di funzione** (cap. 37): ti dice come $f$ si comporta all'infinito e vicino ai punti dove non è definita.

## Asintoto orizzontale

**Definizione.** La retta $y = L$ è un **asintoto orizzontale** per $f$ a $+\infty$ se
$$\lim_{x \to +\infty} f(x) = L \in \mathbb{R}.$$

> **Glossarietto:** $y = L$ è una retta orizzontale di altezza $L$. Il grafico si "appiattisce" a quella altezza.

Analogamente a $-\infty$. I due possono essere diversi.

**Esempi:**
- $1/x$: asintoto $y = 0$ a $\pm\infty$.
- $\arctan x$: asintoti $y = \pi/2$ a $+\infty$ e $y = -\pi/2$ a $-\infty$ (diversi).
- $\tanh x$: asintoti $y = \pm 1$.
- $\sin x$: nessun asintoto (oscilla).

## Asintoto verticale

**Definizione.** La retta $x = x_0$ è un **asintoto verticale** per $f$ se
$$\lim_{x \to x_0^+} f(x) = \pm \infty \quad\text{oppure}\quad \lim_{x \to x_0^-} f(x) = \pm \infty.$$

(Basta uno dei limiti laterali.)

Tipicamente $x_0$ è un punto **fuori dal dominio** dove qualche denominatore si annulla o un argomento di $\ln$ va a 0.

**Esempi:**
- $1/x$: asintoto $x = 0$.
- $1/(x - 2)^2$: asintoto $x = 2$ con $\lim = +\infty$ da entrambi i lati.
- $\ln x$: asintoto $x = 0$ con $\lim_{x \to 0^+} = -\infty$.
- $\tan x$: asintoti $x = \pi/2 + k \pi$.

## Asintoto obliquo

Non solo orizzontali e verticali: il grafico può avvicinarsi a una **retta inclinata** $y = m x + q$ con $m \ne 0$.

**Definizione.** $y = m x + q$ ($m \ne 0$) è **asintoto obliquo** per $f$ a $+\infty$ se
$$\lim_{x \to +\infty} [f(x) - (m x + q)] = 0.$$

> **Mutuamente esclusivi:** asintoto orizzontale e asintoto obliquo a $+\infty$ **non possono coesistere** (il grafico non può tendere a due rette diverse).

### Come trovare $m$ e $q$

**Teorema.** Se $f$ ha asintoto obliquo $y = m x + q$ a $+\infty$, allora:
$$m = \lim_{x \to +\infty} \frac{f(x)}{x}, \qquad q = \lim_{x \to +\infty} [f(x) - m x].$$

*Dim.* Da $f(x) - m x - q \to 0$:
- $f(x)/x = m + q/x + o(1)/x \to m$.
- $f(x) - mx \to q$ direttamente. ∎

**Algoritmo (per $+\infty$):**

1. **Verifica preliminare:** $\lim_{x \to +\infty} f(x) = \pm \infty$? Altrimenti niente obliquo.
2. **Calcola $m$:** $m = \lim f(x)/x$. Se non finito o vale 0, nessun obliquo.
3. **Calcola $q$:** $q = \lim (f(x) - m x)$. Se non finito, nessun obliquo.
4. Se entrambi finiti, $m \ne 0$: asintoto $y = m x + q$.

Stesso schema a $-\infty$.

## Esempi guidati

### Esempio 1 — $f(x) = (x^2 + 1)/x$

**Dominio**: $\mathbb{R} \setminus \{0\}$.

**Verticale.** $\lim_{x \to 0^+} = +\infty$, $\lim_{x \to 0^-} = -\infty$. Asintoto $x = 0$.

**Obliquo a $+\infty$.** $f/x = (x^2 + 1)/x^2 \to 1 = m$. $f - x = (x^2 + 1 - x^2)/x = 1/x \to 0 = q$. Asintoto $y = x$.

> **Verifica rapida con manipolazione algebrica:** $\frac{x^2 + 1}{x} = x + \frac{1}{x}$. La parte $1/x \to 0$, quindi $f \approx x$: asintoto $y = x$ ovvio.

### Esempio 2 — Patologia con $f/x \to m$ ma $q$ non finito

$f(x) = x + \sqrt x$ (per $x > 0$). $f/x = 1 + 1/\sqrt x \to 1 = m$. Ma $q = \lim (x + \sqrt x - x) = \lim \sqrt x = +\infty$. **Nessun asintoto obliquo.**

### Esempio 3 — Funzione razionale generica

$f(x) = (2x^3 + x + 1)/(x^2 - 1)$.

**Verticali:** $x = \pm 1$.

**Obliquo:** divisione polinomiale: $f(x) = 2x + (3x + 1)/(x^2 - 1)$. Resto $\to 0$. Asintoto $y = 2 x$.

> **Regola per razionali $P/Q$:**
> - $\deg P < \deg Q$: asintoto orizzontale $y = 0$.
> - $\deg P = \deg Q$: asintoto orizzontale $y$ = rapporto leading.
> - $\deg P = \deg Q + 1$: asintoto obliquo (quoziente della divisione polinomiale).
> - $\deg P > \deg Q + 1$: nessun asintoto rettilineo.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="160" x2="580" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="290" stroke="#948f78" stroke-width="1"/>
<text x="295" y="175" fill="#f3eed9" font-size="11">0</text>
<line x1="40" y1="420" x2="580" y2="-120" stroke="#e07a8d" stroke-width="1.4" stroke-dasharray="6,4"/>
<text x="540" y="35" fill="#e07a8d" font-size="12">y = x</text>
<line x1="300" y1="20" x2="300" y2="290" stroke="#e07a8d" stroke-width="1.4" stroke-dasharray="6,4"/>
<text x="305" y="285" fill="#e07a8d" font-size="12">x = 0</text>
<polyline points="308,-40 312,30 316,80 320,110 324,130 332,150 340,158 360,160 380,164 400,170 420,176 440,184 460,194 480,202 500,210 540,228" fill="none" stroke="#d4af37" stroke-width="2.2"/>
<polyline points="292,360 288,290 284,240 280,210 276,190 268,170 260,162 240,160 220,156 200,150 180,144 160,136 140,126 120,118 100,110 60,92" fill="none" stroke="#d4af37" stroke-width="2.2"/>
<text x="100" y="125" fill="#d4af37" font-size="13" font-style="italic">f(x) = x + 1/x</text>
</svg>
<div class="chart-caption">$f(x) = x + 1/x$ con asintoto verticale $x = 0$ e obliquo $y = x$ a $\pm \infty$.</div>
</div>

## Patologie

### 1. Oscillazione: $m$ esiste ma $q$ no

$f(x) = x + \sin x$. $f/x \to 1 = m$. Ma $q = \lim \sin x$ non esiste. **Nessun obliquo**, anche se $|f - x| \le 1$ (banda).

### 2. Asintoti diversi a $+\infty$ e $-\infty$

$f(x) = \sqrt{x^2 + 1}$. A $+\infty$ asintoto $y = x$. A $-\infty$ asintoto $y = -x$.

## Procedura completa

Dato $f$:

1. **Determina il dominio** $A$.
2. **Per ogni $x_0 \notin A$ di accumulazione:** calcola $\lim_{x \to x_0^\pm} f$. Se uno è $\pm \infty$: asintoto verticale $x = x_0$.
3. **Se $A$ illimitato sopra:** $\lim_{x \to +\infty} f$.
   - Finito $L$: asintoto orizzontale $y = L$.
   - $\pm \infty$: cerca obliquo (calcola $m$, poi $q$).
   - Non esiste: nessun asintoto a $+\infty$.
4. **Stesso per $-\infty$.**

## Esercizi

<details>
<summary>Esercizio 1 — Razionale</summary>

Trova tutti gli asintoti di $f(x) = (3 x^2 - 2)/(x + 1)$.

**Soluzione.**
- Verticale: $x = -1$.
- Divisione: $3x^2 - 2 = (x+1)(3x - 3) + 1$, quindi $f(x) = 3x - 3 + 1/(x+1)$. Asintoto obliquo $y = 3x - 3$ a $\pm \infty$. ∎
</details>

<details>
<summary>Esercizio 2 — Radice</summary>

$f(x) = \sqrt{x^2 + 2x}$.

**Soluzione.** Dominio $x \le -2$ o $x \ge 0$.

A $+\infty$: $m = 1$, $q = \lim 2 x/(\sqrt{x^2 + 2x} + x) = 1$. Asintoto $y = x + 1$.

A $-\infty$: $m = -1$, $q = -1$. Asintoto $y = -x - 1$. ∎
</details>

<details>
<summary>Esercizio 3 — Esponenziale</summary>

$f(x) = x e^{1/x}$, dominio $x \ne 0$.

**Soluzione.**
- Verticale $x = 0^+$: $\to +\infty$.
- A $\pm \infty$: $m = 1$, $q = \lim x(e^{1/x} - 1) \to 1$ (sostituendo $y = 1/x$). Asintoto $y = x + 1$. ∎
</details>

<details>
<summary>Esercizio 4 — Logaritmica</summary>

$f(x) = x - \ln x$, $x > 0$.

**Soluzione.**
- Verticale $x = 0$: $f \to +\infty$.
- A $+\infty$: $m = 1$, $q = -\lim \ln x = -\infty$. **Nessun obliquo.** ∎
</details>

<details>
<summary>Esercizio 5 — Arctan</summary>

$f(x) = x + \arctan x$.

**Soluzione.**
- A $+\infty$: $m = 1$, $q = \lim \arctan x = \pi/2$. Asintoto $y = x + \pi/2$.
- A $-\infty$: $y = x - \pi/2$. ∎
</details>

## Riassunto in una riga

Tre tipi di asintoti — **verticali** (denominatore zero), **orizzontali** ($\lim$ finito a $\pm\infty$), **obliqui** ($m = \lim f/x$ finito non nullo, $q = \lim(f - mx)$ finito) — ed è la prima cosa da cercare in uno studio di funzione.
