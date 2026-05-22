---
title: "Limiti notevoli per funzioni"
area: Limiti
summary: "I limiti 'atomici' su cui poggia il calcolo con esponenziali, logaritmi e trigonometriche. $\\sin x/x \\to 1$, $(e^x - 1)/x \\to 1$, $\\ln(1+x)/x \\to 1$, $(1 + x)^{1/x} \\to e$, e tutti gli altri. Dimostrati con cura, applicati con tecniche standard."
order: 22
level: intermedio
prereq:
  - "Definizione di limite (sez. 20)"
  - "Teoremi sui limiti (sez. 21)"
  - "Esp/log e trigo (sez. 18, 19)"
tools:
  - "Rudin — *Principles*, cap. 4"
---

# Limiti notevoli per funzioni

## Perché "notevoli"

Tutti i calcoli analitici non triviali con esponenziali, logaritmi e funzioni trigonometriche si riducono — prima o poi — a uno di questi limiti. Una volta dimostrati, diventano "strumenti": insieme alla manipolazione algebrica e al cambio di variabile, ti permettono di sciogliere quasi ogni forma indeterminata.

## L1 — Il limite trigonometrico fondamentale

$$\boxed{\lim_{x \to 0} \frac{\sin x}{x} = 1}$$

> **Glossarietto della formula:**
>
> - $\sin x$ = seno di $x$ (cap. 19), $x$ in radianti.
> - Forma del limite: $0/0$. Indeterminata.
> - Il risultato 1 è "magico" — è precisamente per questo che la misura in radianti è quella giusta.

### Dimostrazione geometrica

Considera il cerchio unitario, $x \in (0, \pi/2)$.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<circle cx="300" cy="160" r="120" fill="none" stroke="#948f78" stroke-width="1"/>
<line x1="100" y1="160" x2="500" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="40" x2="300" y2="290" stroke="#948f78" stroke-width="1"/>
<polygon points="300,160 420,160 377,68" fill="#6fb38a" opacity="0.3" stroke="#6fb38a" stroke-width="1.5"/>
<path d="M 300,160 L 420,160 A 120,120 0 0,0 377,68 Z" fill="#d4af37" opacity="0.2" stroke="#d4af37" stroke-width="1.5"/>
<polygon points="300,160 420,160 420,17" fill="none" stroke="#e07a8d" stroke-width="1.5"/>
<circle cx="300" cy="160" r="3" fill="#f3eed9"/>
<text x="287" y="175" fill="#f3eed9" font-size="11">O</text>
<circle cx="420" cy="160" r="3" fill="#f3eed9"/>
<text x="423" y="178" fill="#f3eed9" font-size="11">A=(1,0)</text>
<circle cx="377" cy="68" r="3" fill="#f3eed9"/>
<text x="383" y="65" fill="#f3eed9" font-size="11">P=(cos x, sin x)</text>
<circle cx="420" cy="17" r="3" fill="#f3eed9"/>
<text x="425" y="20" fill="#f3eed9" font-size="11">T=(1, tan x)</text>
<text x="310" y="143" fill="#e8a04a" font-size="12" font-style="italic">x</text>
</svg>
<div class="chart-caption">Triangolo OAP (interno, area $\sin x/2$), settore OAP (area $x/2$), triangolo OAT (esterno, area $\tan x/2$). Quindi $\sin x < x < \tan x$.</div>
</div>

Confronto aree:
- Triangolo $OAP$ con base $OA = 1$, altezza $\sin x$: area $\sin x / 2$.
- Settore circolare $OAP$ con angolo $x$ rad: area $x / 2$.
- Triangolo $OAT$ con $T = (1, \tan x)$: area $\tan x / 2$.

Disuguaglianza fra aree (geometria):
$$\frac{\sin x}{2} < \frac{x}{2} < \frac{\tan x}{2} \quad\Longrightarrow\quad \sin x < x < \tan x = \frac{\sin x}{\cos x}.$$

Dividendo per $\sin x > 0$:
$$1 < \frac{x}{\sin x} < \frac{1}{\cos x}.$$

Passando ai reciproci (entrambi positivi):
$$\cos x < \frac{\sin x}{x} < 1.$$

Per $x \to 0^+$, $\cos x \to 1$. **Carabinieri:** $\lim_{x \to 0^+} \sin x/x = 1$.

Per simmetria ($\sin$ è dispari): $\sin(-x)/(-x) = \sin x/x$, quindi limite a sinistra = limite a destra = 1. ∎

### Conseguenze immediate

- $\lim_{x \to 0} \sin x = 0$.
- $\lim_{x \to 0} \tan x / x = 1$ (perché $\tan x / x = \sin x / (x \cos x)$).
- $\lim_{x \to 0} \arcsin x / x = 1$, $\lim_{x \to 0} \arctan x / x = 1$ (sostituzione).

## L2 — Coseno

$$\boxed{\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}}$$

*Dim.* Razionalizzo moltiplicando per $(1 + \cos x)/(1 + \cos x)$:
$$\frac{1 - \cos x}{x^2} = \frac{(1 - \cos x)(1 + \cos x)}{x^2 (1 + \cos x)} = \frac{1 - \cos^2 x}{x^2 (1 + \cos x)} = \frac{\sin^2 x}{x^2 (1 + \cos x)}.$$

Ora:
$$\frac{\sin^2 x}{x^2 (1 + \cos x)} = \left(\frac{\sin x}{x}\right)^2 \cdot \frac{1}{1 + \cos x} \to 1^2 \cdot \frac{1}{2} = \frac{1}{2}. \quad\blacksquare$$

**Conseguenza:** $\lim_{x \to 0} (1 - \cos x)/x = 0$ (moltiplica e dividi per $x$).

## L3 — Esponenziale

$$\boxed{\lim_{x \to 0} \frac{e^x - 1}{x} = 1}$$

*Dim. (schizzo).* Dalle disuguaglianze $1 + x \le e^x \le 1/(1 - x)$ valide per $|x| < 1$ (dalla convessità di $e^x$): per $x > 0$,
$$1 \le \frac{e^x - 1}{x} \le \frac{1}{1 - x} \to 1.$$
Carabinieri. Caso $x < 0$ analogo. ∎

**Generalizzazione (con base $a > 0$):**
$$\boxed{\lim_{x \to 0} \frac{a^x - 1}{x} = \ln a}$$

*Dim.* $a^x = e^{x \ln a}$. Pongo $y = x \ln a \to 0$:
$$\frac{a^x - 1}{x} = \ln a \cdot \frac{e^y - 1}{y} \to \ln a \cdot 1 = \ln a. \quad\blacksquare$$

## L4 — Logaritmo

$$\boxed{\lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1}$$

*Dim. (cambio variabile).* Pongo $y = \ln(1 + x)$, cioè $x = e^y - 1$. Per $x \to 0$, $y \to 0$. Quindi
$$\frac{\ln(1 + x)}{x} = \frac{y}{e^y - 1} = \frac{1}{(e^y - 1)/y} \to \frac{1}{1} = 1. \quad\blacksquare$$

## L5 — Limite di Eulero

$$\boxed{\lim_{x \to 0} (1 + x)^{1/x} = e, \qquad \lim_{x \to \pm \infty}\left(1 + \frac{1}{x}\right)^x = e}$$

(Estensione del limite di successione $(1 + 1/n)^n \to e$, cap. 13.)

**Generalizzazione:**
$$\lim_{x \to 0} (1 + \alpha x)^{1/x} = e^\alpha, \quad \lim_{x \to \pm\infty}(1 + \alpha/x)^x = e^\alpha.$$

## L6 — Potenza generalizzata

$$\boxed{\lim_{x \to 0} \frac{(1 + x)^\alpha - 1}{x} = \alpha}$$

*Dim.* $(1 + x)^\alpha = e^{\alpha \ln(1 + x)}$. Quindi
$$\frac{(1+x)^\alpha - 1}{x} = \frac{e^{\alpha \ln(1+x)} - 1}{\alpha \ln(1+x)} \cdot \frac{\alpha \ln(1+x)}{x} \to 1 \cdot \alpha = \alpha. \quad\blacksquare$$

## L7 — Confronto fra crescite ($x \to +\infty$)

$$\lim_{x \to +\infty} \frac{\ln x}{x^\alpha} = 0\ (\alpha > 0), \qquad \lim_{x \to +\infty} \frac{x^\alpha}{e^{\beta x}} = 0\ (\alpha \in \mathbb{R}, \beta > 0).$$

(Dimostrati con de l'Hôpital, cap. 32, o stime su Taylor.)

## Tabella riepilogativa — DA SAPERE A MEMORIA

| limite | valore |
|---|---|
| $\lim_{x \to 0} \sin x / x$ | $1$ |
| $\lim_{x \to 0} (1 - \cos x)/x^2$ | $1/2$ |
| $\lim_{x \to 0} \tan x / x$ | $1$ |
| $\lim_{x \to 0} \arcsin x / x$ | $1$ |
| $\lim_{x \to 0} \arctan x / x$ | $1$ |
| $\lim_{x \to 0} (e^x - 1)/x$ | $1$ |
| $\lim_{x \to 0} (a^x - 1)/x$ | $\ln a$ |
| $\lim_{x \to 0} \ln(1 + x)/x$ | $1$ |
| $\lim_{x \to 0} ((1 + x)^\alpha - 1)/x$ | $\alpha$ |
| $\lim_{x \to 0} (1 + x)^{1/x}$ | $e$ |
| $\lim_{x \to \pm\infty} (1 + 1/x)^x$ | $e$ |
| $\lim_{x \to 0} \sinh x / x$ | $1$ |
| $\lim_{x \to 0} (\cosh x - 1)/x^2$ | $1/2$ |

## Tecniche di applicazione

### Tecnica 1 — Sostituzione

$\lim_{x \to 0} \sin(5 x)/x = 5 \cdot \lim \sin(5x)/(5x) = 5 \cdot 1 = 5$.

### Tecnica 2 — Composizione con $1/x$

$\lim_{x \to +\infty} x \sin(1/x)$. Pongo $y = 1/x \to 0^+$: $x \sin(1/x) = \sin y / y \to 1$.

### Tecnica 3 — Logaritmo per $1^\infty$

$\lim_{x \to +\infty} (1 + 2/x)^{3x}$. Forma $1^\infty$. Riscrivo:
$$\ln L = \lim 3 x \ln(1 + 2/x) = \lim 3 x \cdot \frac{2}{x} \cdot \underbrace{\frac{\ln(1 + 2/x)}{2/x}}_{\to 1} = 6.$$
Quindi $L = e^6$.

### Tecnica 4 — "Decomposizione" in fattori di notevoli

$\lim_{x \to 0} \frac{e^{\sin x} - 1}{\ln(1 + \tan x)}$ = $\lim \frac{e^{\sin x} - 1}{\sin x} \cdot \frac{\sin x}{x} \cdot \frac{x}{\tan x} \cdot \frac{\tan x}{\ln(1 + \tan x)} \to 1$.

## Esercizi

<details>
<summary>Esercizio 1 — Trigonometrico</summary>

$\lim_{x \to 0} \sin(3x)/\sin(5x)$.

**Soluzione.** $\frac{\sin(3x)/(3x)}{\sin(5x)/(5x)} \cdot \frac{3}{5} \to 1 \cdot 1 \cdot 3/5 = 3/5$. ∎
</details>

<details>
<summary>Esercizio 2 — Coseno</summary>

$\lim_{x \to 0} (1 - \cos x)/(x \sin x)$.

**Soluzione.** $= \frac{1 - \cos x}{x^2} \cdot \frac{x}{\sin x} \to 1/2 \cdot 1 = 1/2$. ∎
</details>

<details>
<summary>Esercizio 3 — Esponenziale</summary>

$\lim_{x \to 0} (e^{3x} - e^{-x})/x$.

**Soluzione.** $\frac{e^{3x} - 1}{x} - \frac{e^{-x} - 1}{x} = 3 \cdot \frac{e^{3x}-1}{3x} - (-1) \cdot \frac{e^{-x}-1}{-x} \to 3 + 1 = 4$. ∎
</details>

<details>
<summary>Esercizio 4 — Logaritmo</summary>

$\lim_{x \to 0} \ln(1 + \sin x)/x$.

**Soluzione.** $\frac{\ln(1 + \sin x)}{\sin x} \cdot \frac{\sin x}{x} \to 1 \cdot 1 = 1$. ∎
</details>

<details>
<summary>Esercizio 5 — $1^\infty$</summary>

$\lim_{x \to +\infty} ((x+1)/(x-1))^x$.

**Soluzione.** $\frac{x+1}{x-1} = 1 + \frac{2}{x-1}$. $\ln L = \lim x \ln(1 + 2/(x-1)) \to x \cdot \frac{2}{x-1} \to 2$. Quindi $L = e^2$. ∎
</details>

<details>
<summary>Esercizio 6 — Radice</summary>

$\lim_{x \to 0} (\sqrt{1 + x} - 1)/x$.

**Soluzione.** Forma $((1+x)^{1/2} - 1)/x$ con $\alpha = 1/2$. Limite $= 1/2$. ∎
</details>

## Riassunto in una riga

I limiti notevoli sono i **mattoni** del calcolo dei limiti — memorizzati, permettono di sciogliere ogni forma indeterminata di esponenziali, logaritmi e trigonometriche con sostituzione, decomposizione, e — quando serve — passaggio a $e^{\ln(\cdot)}$.
