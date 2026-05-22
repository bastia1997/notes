---
title: "Funzioni elementari: panoramica"
area: Funzioni elementari
summary: "I \"mattoni\" della matematica — polinomi, esponenziali, logaritmi, trigonometriche, valore assoluto, parte intera. Dominio, immagine, parità, periodicità, monotonia, composizione, inversa. Il vocabolario operativo che useremo in tutto il corso."
order: 17
level: principiante
prereq:
  - "Numeri reali e topologia di base"
  - "Logica e quantificatori"
tools:
  - "Giusti — *Analisi Matematica 1*"
  - "Rudin — *Principles*, cap. 4"
---

# Funzioni elementari: panoramica

## Perché iniziare da qui

Tutto ciò che farai in analisi — limiti, derivate, integrali, serie — gravita attorno a **funzioni**. Le **funzioni elementari** sono i mattoni: polinomi, esponenziali, logaritmi, trigonometriche, iperboliche e le loro combinazioni.

Padroneggiarle a livello grafico, algebrico e di proprietà strutturali è il **prerequisito** per qualunque manipolazione analitica. In questa pagina facciamo l'inventario; nelle sez. 18 e 19 approfondiamo esponenziale-logaritmo e trigonometriche-iperboliche.

## Cos'è una funzione reale di variabile reale

**Definizione.** Siano $A, B \subseteq \mathbb{R}$. Una **funzione** $f : A \to B$ è una legge che a ogni $x \in A$ associa **uno e un solo** $y = f(x) \in B$.

> **Glossarietto:**
>
> - $A$ = **dominio** (gli input ammessi).
> - $B$ = **codominio** (dove si "pensa" di atterrare).
> - $f(A) = \{f(x) : x \in A\} \subseteq B$ = **immagine** (o **rango**) — i valori davvero raggiunti.

**Grafico**: $\mathrm{Graph}(f) = \{(x, f(x)) : x \in A\} \subseteq \mathbb{R}^2$. Una curva nel piano che ogni retta verticale interseca in **esattamente un punto** (test della retta verticale).

### Dominio naturale

Se $f$ è data da una formula senza specificare $A$, per **dominio naturale** si intende il più grande $A \subseteq \mathbb{R}$ su cui la formula ha senso:
- no divisione per zero,
- no radici pari di numeri negativi,
- no $\log$ di non-positivi,
- ecc.

**Esempio.** $f(x) = \sqrt{1 - x^2} / (x - 2)$. Condizioni: $1 - x^2 \ge 0$ (cioè $x \in [-1, 1]$) e $x \ne 2$. Intersezione: $[-1, 1]$.

## Proprietà strutturali

### Parità

- $f$ è **pari** se $f(-x) = f(x)$ per ogni $x$ nel dominio (simmetrica rispetto all'asse $y$). Esempi: $x^2$, $\cos x$, $|x|$.
- $f$ è **dispari** se $f(-x) = -f(x)$ (simmetrica rispetto all'origine). Esempi: $x^3$, $\sin x$, $1/x$.

> **Attenzione:** la maggior parte delle funzioni **non sono né pari né dispari** (es. $e^x$, $x + 1$).

**Decomposizione canonica.** Ogni funzione $f$ definita su un dominio simmetrico si scrive in modo unico come somma di una pari e una dispari:
$$f(x) = \underbrace{\frac{f(x) + f(-x)}{2}}_{\text{pari}} + \underbrace{\frac{f(x) - f(-x)}{2}}_{\text{dispari}}.$$

Esempio paradigmatico: $e^x = \cosh x + \sinh x$.

### Periodicità

$f : \mathbb{R} \to \mathbb{R}$ è **periodica di periodo $T > 0$** se $f(x + T) = f(x)$ per ogni $x$. Il **periodo minimo** (o fondamentale) è il più piccolo $T$ con questa proprietà.

Esempi: $\sin, \cos$ hanno periodo $2\pi$; $\tan$ ha periodo $\pi$.

### Monotonia

- **Crescente**: $x_1 < x_2 \Rightarrow f(x_1) \le f(x_2)$.
- **Strettamente crescente**: $x_1 < x_2 \Rightarrow f(x_1) < f(x_2)$.
- (Decrescente e strettamente decrescente analogamente.)

> **Fatto importante:** le funzioni strettamente monotone sono **iniettive**, quindi **invertibili** sull'immagine.

### Limitatezza

$f$ è **limitata superiormente** se $\exists M : f(x) \le M$ per ogni $x$. Inferiormente analogamente. **Limitata** = entrambe, equivalente a $\exists M > 0 : |f(x)| \le M$.

## Composizione e inversa

**Composizione.** Date $g : A \to B$ e $f : C \to D$ con $g(A) \subseteq C$, la **composizione** $f \circ g : A \to D$ è $(f \circ g)(x) = f(g(x))$ ("prima $g$, poi $f$").

> **Attenzione:** la composizione NON è commutativa: $f \circ g \ne g \circ f$ in generale.

**Inversa.** Se $f : A \to B$ è iniettiva e suriettiva (= biiettiva), esiste l'inversa $f^{-1} : B \to A$ con:
$$f^{-1}(f(x)) = x, \qquad f(f^{-1}(y)) = y.$$

Geometricamente: il grafico di $f^{-1}$ è il grafico di $f$ riflesso rispetto alla bisettrice $y = x$.

**Trucco operativo per trovare $f^{-1}$:** parti da $y = f(x)$, risolvi rispetto a $x$, ottieni $x = g(y)$. Allora $f^{-1} = g$.

**Esempio.** $f(x) = 2x + 3$. Da $y = 2x + 3$: $x = (y - 3)/2$. Quindi $f^{-1}(y) = (y - 3)/2$.

## Le famiglie elementari (catalogo)

### 1. Polinomi

$P(x) = a_n x^n + \dots + a_0$, $a_n \ne 0$. Dominio $\mathbb{R}$, continui e derivabili ovunque. Asintoticamente comportamento del monomio dominante $a_n x^n$.

### 2. Funzioni razionali

$R(x) = P(x)/Q(x)$, $Q$ non identicamente nullo. Dominio $\mathbb{R} \setminus \{$ zeri di $Q\}$.

### 3. Funzioni irrazionali

Coinvolgono radici: $\sqrt x$, $\sqrt[3]{x^2 - 1}$, $x^{1/4}$. Dominio dipende dalla parità dell'indice.

### 4. Esponenziale e logaritmo

$e^x$ (dominio $\mathbb{R}$, immagine $(0, +\infty)$). $\ln x$ (dominio $(0, +\infty)$, immagine $\mathbb{R}$). Inverse l'una dell'altra. Vedi cap. 18.

### 5. Trigonometriche

$\sin, \cos$ su $\mathbb{R}$, immagine $[-1, 1]$. $\tan, \cot, \sec, \csc$ con domini esclusi. Inverse $\arcsin, \arccos, \arctan$ su domini ristretti. Vedi cap. 19.

### 6. Iperboliche

$\sinh, \cosh, \tanh$ definite tramite $e^x$. Vedi cap. 19.

### 7. Valore assoluto

$|x| = x$ se $x \ge 0$, $-x$ altrimenti. Pari, continua ovunque, non derivabile in 0.

### 8. Parte intera

$\lfloor x \rfloor$ = il più grande intero $\le x$. "Scalini", non continua negli interi.

**Parte frazionaria** $\{x\} = x - \lfloor x \rfloor \in [0, 1)$. Periodica di periodo 1.

## Grafici schematici delle prime potenze

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="160" x2="580" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<text x="585" y="155" fill="#f3eed9" font-size="11" font-style="italic">x</text>
<text x="305" y="20" fill="#f3eed9" font-size="11" font-style="italic">y</text>
<path d="M 200,300 Q 250,40 300,160 Q 350,40 400,300" fill="none" stroke="#d4af37" stroke-width="2"/>
<text x="410" y="60" fill="#d4af37" font-size="12" font-style="italic">y = x²</text>
<polyline points="220,300 250,260 270,220 290,180 300,160 310,140 330,100 350,60 380,20" fill="none" stroke="#6fb38a" stroke-width="2"/>
<text x="385" y="20" fill="#6fb38a" font-size="12" font-style="italic">y = x³</text>
<path d="M 320,300 Q 320,180 380,165 Q 440,160 580,160" fill="none" stroke="#6aa9d8" stroke-width="2"/>
<path d="M 280,20 Q 280,140 220,155 Q 160,160 40,160" fill="none" stroke="#6aa9d8" stroke-width="2"/>
<text x="500" y="155" fill="#6aa9d8" font-size="12" font-style="italic">y = 1/x</text>
<circle cx="300" cy="160" r="2.5" fill="#f3eed9"/>
<text x="285" y="178" fill="#f3eed9" font-size="11">O</text>
</svg>
<div class="chart-caption">Tre prototipi: parabola $y = x^2$ (pari), cubica $y = x^3$ (dispari), iperbole $y = 1/x$ (dispari, dominio $\mathbb{R} \setminus \{0\}$).</div>
</div>

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="160" x2="580" y2="160" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<polyline points="100,300 300,160 500,300" fill="none" stroke="#d4af37" stroke-width="2"/>
<text x="510" y="290" fill="#d4af37" font-size="12">|x|</text>
<polyline points="300,160 310,140 330,118 360,100 400,86 450,72 500,62 550,52" fill="none" stroke="#6fb38a" stroke-width="2"/>
<text x="555" y="48" fill="#6fb38a" font-size="12">√x</text>
<polyline points="220,200 260,200 260,180 300,180 300,160 340,160 340,140 380,140 380,120 420,120" fill="none" stroke="#6aa9d8" stroke-width="2"/>
<text x="425" y="115" fill="#6aa9d8" font-size="12">⌊x⌋</text>
</svg>
<div class="chart-caption">Valore assoluto $|x|$ (pari, spigolo in 0), radice $\sqrt x$ (definita solo per $x \ge 0$), parte intera $\lfloor x \rfloor$ (a scalini).</div>
</div>

## Operazioni sui grafici (a vista)

Dato il grafico di $y = f(x)$, sai disegnare al volo:

- $y = f(x) + c$ → traslazione **verticale** di $c$.
- $y = f(x - a)$ → traslazione **orizzontale** di $a$ (a destra se $a > 0$).
- $y = k f(x)$ → dilatazione verticale di fattore $k$.
- $y = f(k x)$ → dilatazione orizzontale di fattore $1/k$.
- $y = -f(x)$ → riflessione rispetto all'asse $x$.
- $y = f(-x)$ → riflessione rispetto all'asse $y$.
- $y = |f(x)|$ → ribalta sopra l'asse $x$ la parte sotto.
- $y = f(|x|)$ → tieni la parte $x \ge 0$ e copiala simmetricamente a sinistra.

## Esercizi

<details>
<summary>Esercizio 1 — Dominio naturale</summary>

Trova il dominio naturale di $f(x) = \dfrac{\sqrt{x^2 - 4}}{\ln(3 - x)}$.

**Soluzione.** Condizioni:
1. $x^2 - 4 \ge 0 \Rightarrow x \le -2$ o $x \ge 2$.
2. $3 - x > 0 \Rightarrow x < 3$.
3. $\ln(3 - x) \ne 0 \Rightarrow 3 - x \ne 1 \Rightarrow x \ne 2$.

Intersezione: $(-\infty, -2] \cup (2, 3)$. ∎
</details>

<details>
<summary>Esercizio 2 — Parità</summary>

Stabilisci se pari, dispari o nessuna:
(a) $f(x) = x^3 \cos x$; (b) $f(x) = e^x + e^{-x}$; (c) $f(x) = x + \sin x$; (d) $f(x) = x^2 + x$.

**Soluzione.**
(a) $f(-x) = (-x)^3 \cos(-x) = -x^3 \cos x = -f(x)$: **dispari**.
(b) $f(-x) = e^{-x} + e^x = f(x)$: **pari** (è $2 \cosh x$).
(c) $f(-x) = -x - \sin x = -f(x)$: **dispari**.
(d) Né pari né dispari. ∎
</details>

<details>
<summary>Esercizio 3 — Composizioni</summary>

Date $f(x) = 1/(1 + x)$ e $g(x) = x^2$. Calcola $f \circ g$, $g \circ f$, $f \circ f$.

**Soluzione.**
- $(f \circ g)(x) = f(x^2) = 1/(1 + x^2)$, dominio $\mathbb{R}$.
- $(g \circ f)(x) = (1/(1+x))^2 = 1/(1+x)^2$, dominio $\mathbb{R} \setminus \{-1\}$.
- $(f \circ f)(x) = 1/(1 + 1/(1+x)) = (1+x)/(2+x)$, dominio $\mathbb{R} \setminus \{-1, -2\}$. ∎
</details>

<details>
<summary>Esercizio 4 — Inversa</summary>

Mostra che $f : [0, +\infty) \to [1, +\infty)$, $f(x) = x^2 + 1$, è invertibile e trova $f^{-1}$.

**Soluzione.** Su $[0, +\infty)$ strettamente crescente, immagine $[1, +\infty)$ → biiettiva. Da $y = x^2 + 1$: $x = \sqrt{y - 1}$ ($+$ perché $x \ge 0$). Quindi $f^{-1}(y) = \sqrt{y - 1}$. ∎
</details>

<details>
<summary>Esercizio 5 — Periodicità</summary>

(a) Periodo di $f(x) = \sin(3 x) + \cos(5 x)$. (b) È periodica $g(x) = \sin x + \sin(\pi x)$?

**Soluzione.**
(a) $\sin(3 x)$: periodo $2\pi/3$. $\cos(5 x)$: periodo $2\pi/5$. Periodo comune = $\text{mcm} = 2\pi$.

(b) Periodi $2\pi$ e $2$. Rapporto $2\pi/2 = \pi$ irrazionale: **non periodica** (è "quasi-periodica", concetto avanzato). ∎
</details>

## Riassunto in una riga

Una funzione $f : A \to B$ è "ogni input → un unico output", caratterizzata da dominio/immagine/grafico e dalle proprietà strutturali (parità, periodicità, monotonia, limitatezza); le famiglie elementari (polinomi, razionali, irrazionali, esp/log, trigo, iperboliche, valore assoluto, parte intera) sono il vocabolario che useremo ovunque.
