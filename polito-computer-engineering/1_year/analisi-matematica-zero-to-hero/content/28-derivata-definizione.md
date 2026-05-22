---
title: "Derivata: definizione e interpretazione geometrica"
area: Derivate
summary: "La definizione di **derivata** come limite del rapporto incrementale — la pendenza istantanea di una curva. Significato geometrico (tangente), fisico (velocità). Derivabile ⇒ continua, ma non viceversa ($|x|$ in 0)."
order: 28
level: intermedio
prereq:
  - "Limiti di funzioni (sez. 20-22)"
  - "Continuità (sez. 24)"
tools:
  - "Rudin — *Principles*, cap. 5"
  - "Apostol — *Calculus*"
---

# Derivata: definizione e interpretazione geometrica

## Da dove viene la derivata

Due problemi storicamente distinti convergono nello stesso oggetto:

- **Tangente** (problema geometrico — Fermat, Cartesio): qual è la pendenza della retta tangente a $y = f(x)$ in $(x_0, f(x_0))$?
- **Velocità istantanea** (problema fisico — Newton): data la posizione $s(t)$, qual è la velocità all'istante $t_0$?

Entrambi richiedono il **passaggio al limite** di un rapporto $\Delta y / \Delta x$ quando $\Delta x \to 0$. Questo limite è la **derivata**.

## Definizione

**Definizione.** Sia $f : I \to \mathbb{R}$ su un intervallo aperto, $x_0 \in I$. $f$ è **derivabile in $x_0$** se esiste finito il limite:
$$f'(x_0) := \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}.$$

> **Glossarietto:**
>
> - $h$ = piccolo incremento di $x$. Quando $h \to 0$, "ci stringiamo" attorno a $x_0$.
> - $\frac{f(x_0 + h) - f(x_0)}{h}$ = **rapporto incrementale**: variazione di $y$ diviso variazione di $x$.
> - Geometricamente: pendenza della retta secante per $(x_0, f(x_0))$ e $(x_0 + h, f(x_0 + h))$.
> - Per $h \to 0$, la secante diventa **tangente**, e la pendenza è $f'(x_0)$.

Equivalentemente, ponendo $x = x_0 + h$:
$$f'(x_0) = \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}.$$

**Notazioni:**
- $f'(x_0)$ — Lagrange
- $\dot f(x_0)$ — Newton (in fisica)
- $\dfrac{df}{dx}(x_0)$ — Leibniz
- $Df(x_0)$

Useremo principalmente $f'$.

## Derivate laterali

Per analogia coi limiti:
$$f'_+(x_0) = \lim_{h \to 0^+} \frac{f(x_0 + h) - f(x_0)}{h}, \qquad f'_-(x_0) = \lim_{h \to 0^-} \frac{f(x_0 + h) - f(x_0)}{h}.$$

> $f$ derivabile in $x_0$ $\iff$ $f'_-(x_0) = f'_+(x_0)$ finite.

Servono nei "punti di spigolo" (es. $|x|$ in 0).

## Interpretazione geometrica

**Retta tangente** al grafico in $(x_0, f(x_0))$:
$$y = f(x_0) + f'(x_0) (x - x_0).$$

> $f'(x_0)$ è la pendenza di questa retta.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <line x1="40" y1="270" x2="580" y2="270" stroke="#948f78" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="290" stroke="#948f78" stroke-width="1"/>
  <path d="M 80 240 Q 200 260 300 180 Q 400 100 540 60" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <text x="525" y="50" fill="#e8a04a" font-size="13" font-style="italic">y = f(x)</text>
  <line x1="200" y1="240" x2="450" y2="80" stroke="#d4af37" stroke-width="2"/>
  <text x="455" y="75" fill="#d4af37" font-size="12">tangente</text>
  <circle cx="300" cy="180" r="4" fill="#6fb38a"/>
  <text x="305" y="200" fill="#6fb38a" font-size="12" font-style="italic">(x₀, f(x₀))</text>
  <line x1="300" y1="270" x2="300" y2="180" stroke="#6fb38a" stroke-dasharray="3,3"/>
  <text x="293" y="285" fill="#6fb38a" font-size="11" font-style="italic">x₀</text>
</svg>
<div class="chart-caption">La derivata $f'(x_0)$ è la pendenza della retta tangente in $(x_0, f(x_0))$.</div>
</div>

## Esempi guidati

### Esempio 1: $f(x) = x^2$ in $x_0 = 3$

$$\frac{f(3 + h) - f(3)}{h} = \frac{(3 + h)^2 - 9}{h} = \frac{6h + h^2}{h} = 6 + h \to 6.$$

Quindi $f'(3) = 6$. In generale per $f(x) = x^2$, $f'(x_0) = 2 x_0$.

### Esempio 2: $f(x) = \sqrt x$ in $x_0 > 0$

$$\frac{\sqrt{x_0 + h} - \sqrt{x_0}}{h} = \frac{1}{\sqrt{x_0 + h} + \sqrt{x_0}} \to \frac{1}{2 \sqrt{x_0}}.$$

(Razionalizzazione.) Quindi $f'(x_0) = 1/(2 \sqrt{x_0})$.

### Esempio 3: $f(x) = |x|$ in $x_0 = 0$ — NON derivabile

$$\frac{|h| - 0}{h} = \frac{|h|}{h} = \text{sgn}(h).$$

$f'_+(0) = 1$, $f'_-(0) = -1$. Diverse → **non derivabile** in 0.

> **Lezione:** in punti di "spigolo" la derivata non esiste anche se la funzione è continua.

## Derivabile ⇒ continua

**Teorema.** Se $f$ è derivabile in $x_0$, allora $f$ è continua in $x_0$.

*Dim.* $f(x) - f(x_0) = \frac{f(x) - f(x_0)}{x - x_0} \cdot (x - x_0) \to f'(x_0) \cdot 0 = 0$. Quindi $f(x) \to f(x_0)$. ∎

> **Il viceversa è falso.** $|x|$ è continua in 0 ma non derivabile. Continuità < Derivabilità.

## Casi speciali

**Tangente verticale.** Se $\lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h} = \pm \infty$, $f$ NON è derivabile in $x_0$, ma il grafico ha **tangente verticale**. Esempio: $f(x) = \sqrt[3]{x}$ in 0.

**Cuspide.** $f'_-(x_0) = -\infty$, $f'_+(x_0) = +\infty$ (o viceversa). Esempio: $f(x) = \sqrt[3]{x^2}$ in 0.

## Esercizi

<details>
<summary>Esercizio 1 — Derivata con definizione</summary>

Calcola la derivata di $f(x) = 1/x$ in $x_0 \ne 0$.

**Soluzione.**
$$\frac{1/(x_0 + h) - 1/x_0}{h} = \frac{-h}{h \cdot x_0 (x_0 + h)} = \frac{-1}{x_0 (x_0 + h)} \to \frac{-1}{x_0^2}.$$
Quindi $f'(x_0) = -1/x_0^2$. ∎
</details>

<details>
<summary>Esercizio 2 — Spigolo</summary>

$f(x) = x |x|$. Derivabile in 0?

**Soluzione.** Per $x > 0$: $f(x) = x^2$, $f'_+(0) = 0$ (limite del rapporto $x^2/x = x \to 0$). Per $x < 0$: $f(x) = -x^2$, $f'_-(0) = 0$. Uguali → **derivabile**, $f'(0) = 0$. (Anche se ha "cambio di concavità" in 0.)
</details>

<details>
<summary>Esercizio 3 — Tangente verticale</summary>

Mostra che $f(x) = \sqrt[3]{x}$ NON è derivabile in 0.

**Soluzione.** $(f(h) - f(0))/h = \sqrt[3]{h}/h = 1/h^{2/3} \to +\infty$. Limite infinito, quindi non derivabile (ma tangente verticale). ∎
</details>

## Riassunto in una riga

La derivata $f'(x_0) = \lim_{h \to 0} (f(x_0 + h) - f(x_0))/h$ è la **pendenza istantanea** della curva in $x_0$ — l'oggetto unificante di "tangente geometrica" e "velocità fisica" — e derivabile ⇒ continua, ma non viceversa.
