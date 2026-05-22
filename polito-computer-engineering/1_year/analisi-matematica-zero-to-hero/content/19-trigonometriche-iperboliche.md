---
title: "Funzioni trigonometriche e iperboliche"
area: Funzioni elementari
summary: "Le funzioni dell'oscillazione ($\\sin, \\cos, \\tan$) costruite dal cerchio unitario. Le **iperboliche** ($\\sinh, \\cosh, \\tanh$) — cugine algebriche tramite $e^x$. Identità, grafici, inverse."
order: 19
level: principiante
prereq:
  - "Esponenziale e logaritmo (sez. 18)"
  - "Geometria del cerchio"
tools:
  - "Bramanti-Pagani-Salsa — *Analisi 1*"
---

# Funzioni trigonometriche e iperboliche

## Perché parlarne

**Trigonometriche** = funzioni periodiche. Ovunque ci sia oscillazione — corrente alternata, suono, onde quantistiche, vibrazioni — compaiono $\sin$ e $\cos$. La loro algebra (formule di addizione, duplicazione, prostaferesi) è uno strumento di calcolo che userai in derivate, integrali, EDO, Fourier.

**Iperboliche** = "cugine algebriche" delle trigonometriche, costruite da $e^x$. Stesse identità, segni cambiati. Cruciali in EDO lineari, geometria iperbolica, fisica relativistica.

## Definizione geometrica delle trigonometriche

Considera il **cerchio unitario** $C: x^2 + y^2 = 1$. Misuriamo gli angoli in **radianti**: $\theta$ corrisponde alla lunghezza dell'arco di $C$ percorso da $(1, 0)$ in senso antiorario (positivo) o orario (negativo).

> **Glossarietto:**
>
> - **Radiante** = unità di misura dell'angolo basata sull'arco. Angolo completo $= 2\pi$ rad $= 360°$. Quindi $\pi$ rad $= 180°$, $\pi/2$ rad $= 90°$, $\pi/4$ rad $= 45°$.
> - In matematica si usano **sempre** i radianti — i gradi sono solo per la vita quotidiana.

**Definizione.** Per $\theta \in \mathbb{R}$, sia $P_\theta = (x_\theta, y_\theta)$ il punto del cerchio unitario raggiunto da $(1, 0)$ percorrendo un arco di lunghezza $\theta$.

$$\cos\theta := x_\theta, \qquad \sin\theta := y_\theta.$$

**Conseguenze immediate:**
- $\sin^2 \theta + \cos^2 \theta = 1$ (perché $P_\theta \in C$). **Identità pitagorica.**
- $-1 \le \sin\theta, \cos\theta \le 1$.
- **Periodicità**: $\sin(\theta + 2\pi) = \sin\theta$, $\cos(\theta + 2\pi) = \cos\theta$.
- **Simmetrie**:
  - $\sin(-\theta) = -\sin\theta$ (dispari), $\cos(-\theta) = \cos\theta$ (pari).
  - $\sin(\pi - \theta) = \sin\theta$, $\cos(\pi - \theta) = -\cos\theta$.
  - $\sin(\pi/2 - \theta) = \cos\theta$, $\cos(\pi/2 - \theta) = \sin\theta$ ("cofunzioni").

**Tangente, cotangente** (dove i denominatori non si annullano):
$$\tan\theta = \frac{\sin\theta}{\cos\theta}, \qquad \cot\theta = \frac{\cos\theta}{\sin\theta}.$$

Periodo di $\tan, \cot$ è $\pi$ (non $2\pi$).

## Valori notevoli

| $\theta$ | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ | $\pi$ |
|---|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $1/2$ | $\sqrt 2/2$ | $\sqrt 3/2$ | $1$ | $0$ |
| $\cos\theta$ | $1$ | $\sqrt 3/2$ | $\sqrt 2/2$ | $1/2$ | $0$ | $-1$ |
| $\tan\theta$ | $0$ | $1/\sqrt 3$ | $1$ | $\sqrt 3$ | $\nexists$ | $0$ |

## Formule di addizione (le più importanti)

$$\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$$
$$\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$$

Da queste, ponendo $\beta \to -\beta$:
$$\sin(\alpha - \beta) = \sin\alpha\cos\beta - \cos\alpha\sin\beta, \qquad \cos(\alpha - \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta.$$

Per la tangente:
$$\tan(\alpha + \beta) = \frac{\tan\alpha + \tan\beta}{1 - \tan\alpha\tan\beta}.$$

### Formule di duplicazione

Ponendo $\alpha = \beta$:
$$\sin(2\alpha) = 2\sin\alpha\cos\alpha$$
$$\cos(2\alpha) = \cos^2\alpha - \sin^2\alpha = 2\cos^2\alpha - 1 = 1 - 2\sin^2\alpha$$

### Formule di bisezione

$$\sin^2(\alpha/2) = \frac{1 - \cos\alpha}{2}, \qquad \cos^2(\alpha/2) = \frac{1 + \cos\alpha}{2}.$$

### Prostaferesi (somme in prodotti)

$$\sin p + \sin q = 2\sin\frac{p+q}{2}\cos\frac{p-q}{2}$$
$$\cos p + \cos q = 2\cos\frac{p+q}{2}\cos\frac{p-q}{2}$$
$$\cos p - \cos q = -2\sin\frac{p+q}{2}\sin\frac{p-q}{2}$$

## Grafici delle trigonometriche

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="160" x2="580" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<text x="80" y="175" fill="#d8d3bd" font-size="11">−2π</text>
<text x="186" y="175" fill="#d8d3bd" font-size="11">−π</text>
<text x="408" y="175" fill="#d8d3bd" font-size="11">π</text>
<text x="518" y="175" fill="#d8d3bd" font-size="11">2π</text>
<text x="296" y="148" fill="#d8d3bd" font-size="11">1</text>
<line x1="295" y1="100" x2="305" y2="100" stroke="#948f78" stroke-width="1"/>
<line x1="295" y1="220" x2="305" y2="220" stroke="#948f78" stroke-width="1"/>
<polyline points="80,160 100,124 120,107 140,108 160,127 180,158 200,176 220,194 240,205 260,196 280,180 300,160 320,140 340,125 360,124 380,135 400,158 420,180 440,200 460,212 480,213 500,196 520,178 540,170 560,160" fill="none" stroke="#d4af37" stroke-width="2"/>
<text x="555" y="148" fill="#d4af37" font-size="12">sin x</text>
<polyline points="80,100 100,108 120,127 140,158 160,176 180,194 200,205 220,196 240,180 260,160 280,140 300,100 320,140 340,160 360,180 380,196 400,205 420,194 440,176 460,158 480,127 500,108 520,100 540,108 560,127" fill="none" stroke="#6fb38a" stroke-width="2"/>
<text x="565" y="125" fill="#6fb38a" font-size="12">cos x</text>
</svg>
<div class="chart-caption">$\sin$ (oro) e $\cos$ (salvia) sono sfasate di $\pi/2$: $\cos x = \sin(x + \pi/2)$. Periodo $2\pi$, ampiezza 1.</div>
</div>

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="160" x2="580" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<line x1="190" y1="20" x2="190" y2="300" stroke="#e07a8d" stroke-width="0.8" stroke-dasharray="4,4"/>
<line x1="245" y1="20" x2="245" y2="300" stroke="#e07a8d" stroke-width="0.8" stroke-dasharray="4,4"/>
<line x1="355" y1="20" x2="355" y2="300" stroke="#e07a8d" stroke-width="0.8" stroke-dasharray="4,4"/>
<line x1="410" y1="20" x2="410" y2="300" stroke="#e07a8d" stroke-width="0.8" stroke-dasharray="4,4"/>
<polyline points="248,20 255,80 265,110 280,135 300,160 320,185 335,210 345,240 352,300" fill="none" stroke="#d4af37" stroke-width="2"/>
<polyline points="358,20 365,80 375,110 390,135 410,160" fill="none" stroke="#d4af37" stroke-width="2"/>
<polyline points="193,160 210,185 225,210 235,240 242,300" fill="none" stroke="#d4af37" stroke-width="2"/>
<text x="500" y="60" fill="#d4af37" font-size="13">tan x</text>
<text x="248" y="312" fill="#e07a8d" font-size="10">−π/2</text>
<text x="356" y="312" fill="#e07a8d" font-size="10">π/2</text>
</svg>
<div class="chart-caption">$\tan x$ ha periodo $\pi$ e asintoti verticali in $x = \pi/2 + k\pi$. Strettamente crescente su ogni intervallo $(-\pi/2 + k\pi,\ \pi/2 + k\pi)$.</div>
</div>

## Funzioni inverse: gli "archi"

Le trigonometriche non sono globalmente iniettive (periodiche!), quindi vanno ristrette.

### Arcoseno

$\sin: [-\pi/2, \pi/2] \to [-1, 1]$ è biiettiva. Inversa:
$$\arcsin: [-1, 1] \to [-\pi/2, \pi/2].$$
Strettamente crescente, dispari, continua. $\arcsin 0 = 0$, $\arcsin 1 = \pi/2$, $\arcsin(\sqrt 2/2) = \pi/4$.

### Arcocoseno

$\cos: [0, \pi] \to [-1, 1]$ è biiettiva. Inversa:
$$\arccos: [-1, 1] \to [0, \pi].$$
Strettamente decrescente. Relazione utile: $\arcsin x + \arccos x = \pi/2$.

### Arcotangente

$\tan: (-\pi/2, \pi/2) \to \mathbb{R}$ è biiettiva. Inversa:
$$\arctan: \mathbb{R} \to (-\pi/2, \pi/2).$$
Strettamente crescente, dispari, **limitata**: $\lim_{x \to \pm\infty} \arctan x = \pm \pi/2$ (asintoti orizzontali).

## Funzioni iperboliche

**Definizione tramite $e^x$:**
$$\sinh x = \frac{e^x - e^{-x}}{2}, \qquad \cosh x = \frac{e^x + e^{-x}}{2}, \qquad \tanh x = \frac{\sinh x}{\cosh x} = \frac{e^x - e^{-x}}{e^x + e^{-x}}.$$

> **Glossarietto:**
>
> - $\sinh$ = "seno iperbolico", si legge "sinch" o "shaine".
> - $\cosh$ = "coseno iperbolico", "cosh" o "kaine".
> - $\tanh$ = "tangente iperbolica".
> - **Etimologia "iperbolico"**: $(\cosh t, \sinh t)$ parametrizza un ramo dell'**iperbole** $x^2 - y^2 = 1$, esattamente come $(\cos t, \sin t)$ parametrizza il **cerchio** $x^2 + y^2 = 1$.

**Identità fondamentale (analoga della pitagorica):**
$$\cosh^2 x - \sinh^2 x = 1.$$

*Dim.* $\cosh^2 x - \sinh^2 x = \frac{(e^x + e^{-x})^2 - (e^x - e^{-x})^2}{4} = \frac{4 e^x e^{-x}}{4} = 1$. ∎

**Attenzione al segno**: per le trigonometriche è $\sin^2 + \cos^2 = 1$ (somma); per le iperboliche è $\cosh^2 - \sinh^2 = 1$ (differenza).

**Proprietà:**
- $\sinh: \mathbb{R} \to \mathbb{R}$, dispari, strettamente crescente.
- $\cosh: \mathbb{R} \to [1, +\infty)$, pari, decrescente su $(-\infty, 0]$ e crescente su $[0, +\infty)$, minimo $\cosh 0 = 1$.
- $\tanh: \mathbb{R} \to (-1, 1)$, dispari, strettamente crescente, asintoti $\pm 1$.

**Formule di addizione iperboliche** (notare i segni):
$$\sinh(a + b) = \sinh a \cosh b + \cosh a \sinh b$$
$$\cosh(a + b) = \cosh a \cosh b + \sinh a \sinh b$$

(Sì, il "$+$" anche per $\cosh$ — differenza coi trigonometrici.)

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="220" x2="580" y2="220" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<polyline points="160,30 180,60 200,90 220,118 240,144 260,170 280,193 300,210 320,193 340,170 360,144 380,118 400,90 420,60 440,30" fill="none" stroke="#d4af37" stroke-width="2.2"/>
<text x="438" y="25" fill="#d4af37" font-size="13">cosh x</text>
<polyline points="160,300 180,280 200,260 220,242 240,228 260,219 280,213 300,210 320,207 340,202 360,193 380,178 400,158 420,134 440,108 460,80 480,52 500,22" fill="none" stroke="#6fb38a" stroke-width="2.2"/>
<text x="500" y="20" fill="#6fb38a" font-size="13">sinh x</text>
<polyline points="60,232 100,232 140,233 180,234 200,236 220,238 240,242 260,250 280,260 300,210 320,160 340,170 360,178 380,182 400,184 420,186 440,188 480,188 540,188" fill="none" stroke="#6aa9d8" stroke-width="2.2"/>
<text x="545" y="195" fill="#6aa9d8" font-size="13">tanh x</text>
<line x1="40" y1="190" x2="580" y2="190" stroke="#6aa9d8" stroke-width="0.6" stroke-dasharray="3,3"/>
<line x1="40" y1="250" x2="580" y2="250" stroke="#6aa9d8" stroke-width="0.6" stroke-dasharray="3,3"/>
<text x="305" y="215" fill="#f3eed9" font-size="10">0</text>
</svg>
<div class="chart-caption">$\cosh$ (oro, "catenaria"), $\sinh$ (salvia, dispari come la cubica), $\tanh$ (azzurro, asintoti $\pm 1$).</div>
</div>

### Inverse iperboliche

$$\operatorname{arsinh} x = \ln(x + \sqrt{x^2 + 1}), \quad x \in \mathbb{R}$$
$$\operatorname{arcosh} x = \ln(x + \sqrt{x^2 - 1}), \quad x \ge 1$$
$$\operatorname{artanh} x = \frac{1}{2} \ln\frac{1 + x}{1 - x}, \quad |x| < 1$$

(Si ottengono risolvendo $y = \sinh x$ ecc. rispetto a $x$, equazione di 2° grado in $e^x$.)

## Identità da memorizzare

$$\sin^2 + \cos^2 = 1, \quad 1 + \tan^2 = \sec^2$$
$$\cosh^2 - \sinh^2 = 1, \quad 1 - \tanh^2 = \mathrm{sech}^2$$
$$\sin(2x) = 2\sin x \cos x, \quad \cos(2x) = 1 - 2\sin^2 x$$
$$\sinh(2x) = 2\sinh x \cosh x, \quad \cosh(2x) = 1 + 2\sinh^2 x$$

## Esercizi

<details>
<summary>Esercizio 1 — Calcoli con formule di addizione</summary>

Calcola esattamente $\sin(\pi/12)$.

**Soluzione.** $\pi/12 = \pi/3 - \pi/4$.
$$\sin(\pi/12) = \sin(\pi/3)\cos(\pi/4) - \cos(\pi/3)\sin(\pi/4) = \frac{\sqrt 3}{2} \cdot \frac{\sqrt 2}{2} - \frac{1}{2} \cdot \frac{\sqrt 2}{2} = \frac{\sqrt 6 - \sqrt 2}{4}.$$
</details>

<details>
<summary>Esercizio 2 — Identità trigonometrica</summary>

Dimostra che $\sin^4 x - \cos^4 x = -\cos(2 x)$.

**Soluzione.** $\sin^4 - \cos^4 = (\sin^2 - \cos^2)(\sin^2 + \cos^2) = (\sin^2 - \cos^2) \cdot 1 = -(\cos^2 - \sin^2) = -\cos(2x)$. ∎
</details>

<details>
<summary>Esercizio 3 — Equazione trigonometrica</summary>

Risolvi $2 \sin^2 x - \sin x - 1 = 0$ in $[0, 2\pi)$.

**Soluzione.** Pongo $t = \sin x$: $2 t^2 - t - 1 = 0 \Rightarrow t = 1$ o $t = -1/2$.
- $\sin x = 1 \Rightarrow x = \pi/2$.
- $\sin x = -1/2 \Rightarrow x = 7\pi/6$ o $x = 11\pi/6$.

Soluzioni: $\{\pi/2, 7\pi/6, 11\pi/6\}$.
</details>

<details>
<summary>Esercizio 4 — Identità iperbolica</summary>

Dimostra che $\sinh(2 x) = 2 \sinh x \cosh x$.

**Soluzione.**
$$\sinh(2x) = \frac{e^{2x} - e^{-2x}}{2} = \frac{(e^x - e^{-x})(e^x + e^{-x})}{2} = 2 \cdot \frac{e^x - e^{-x}}{2} \cdot \frac{e^x + e^{-x}}{2} = 2 \sinh x \cosh x. \quad\blacksquare$$
</details>

<details>
<summary>Esercizio 5 — Inversa iperbolica</summary>

Dimostra la formula $\operatorname{arsinh} x = \ln(x + \sqrt{x^2 + 1})$.

**Soluzione.** Da $y = \sinh x = (e^x - e^{-x})/2$. Pongo $u = e^x > 0$: $y = (u - 1/u)/2$, quindi $u^2 - 2 y u - 1 = 0$, $u = y \pm \sqrt{y^2 + 1}$. Poiché $u > 0$ e $\sqrt{y^2 + 1} > |y|$, prendo il $+$: $u = y + \sqrt{y^2 + 1}$. Quindi $x = \ln u = \ln(y + \sqrt{y^2 + 1})$. ∎
</details>

## Riassunto in una riga

**Trigonometriche** $(\sin, \cos, \tan)$ vivono sul cerchio unitario, con $\sin^2 + \cos^2 = 1$; **iperboliche** $(\sinh, \cosh, \tanh)$ vivono sull'iperbole $x^2 - y^2 = 1$, definite da $e^x$, con $\cosh^2 - \sinh^2 = 1$ — stesse identità con cambi di segno.
