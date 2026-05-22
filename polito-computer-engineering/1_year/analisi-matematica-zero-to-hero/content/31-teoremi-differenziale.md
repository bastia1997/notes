---
title: "Teoremi del calcolo differenziale: Fermat, Rolle, Lagrange, Cauchy"
area: Calcolo differenziale
summary: "I **quattro teoremi** che trasformano la derivata da oggetto locale a strumento globale. **Fermat** (estremi interni → $f' = 0$), **Rolle** ($f$ uguale agli estremi → derivata si annulla), **Lagrange** (valor medio), **Cauchy** (generalizzazione a due funzioni)."
order: 31
level: intermedio
prereq:
  - "Derivate (sez. 29-30)"
  - "Weierstrass (sez. 25)"
tools:
  - "Rudin — *Principles*, cap. 5"
---

# Teoremi del calcolo differenziale

## Perché parlarne

$f'(x_0)$ è informazione **locale**. I quattro teoremi di questo capitolo trasformano informazioni locali sulla derivata in informazioni **globali** sull'intera funzione. Senza, non si può dire "$f' \ge 0 \Rightarrow f$ crescente", né dimostrare Hôpital o Taylor.

## 1. Teorema di Fermat (estremi interni)

**Teorema.** $f : (a, b) \to \mathbb{R}$ derivabile in $x_0 \in (a, b)$. Se $x_0$ è punto di **estremo locale**, allora $f'(x_0) = 0$.

> **A parole:** nei punti di massimo/minimo *interni* dove $f$ è derivabile, la pendenza è zero (tangente orizzontale).

*Dim.* WLOG $x_0$ massimo locale: $f(x) \le f(x_0)$ in un intorno.

Per $h > 0$ piccolo: $(f(x_0 + h) - f(x_0))/h \le 0$, quindi $f'_+(x_0) \le 0$.
Per $h < 0$: $(f(x_0 + h) - f(x_0))/h \ge 0$, quindi $f'_-(x_0) \ge 0$.

Derivabile: $f'_+ = f'_- = f'(x_0)$. Quindi $f'(x_0) \le 0$ e $\ge 0$, da cui $= 0$. ∎

> **Attenzioni:**
> - **Solo punti interni.** $f(x) = x$ su $[0, 1]$: max in 1 con $f'(1) = 1 \ne 0$.
> - **Solo punti derivabili.** $|x|$ ha min in 0 ma non è derivabile.
> - **Necessaria, non sufficiente.** $f(x) = x^3$ ha $f'(0) = 0$ ma nessun estremo (flesso).

I punti dove $f'(x) = 0$ si chiamano **punti critici** o **stazionari**.

## 2. Teorema di Rolle

**Teorema.** Sia $f : [a, b] \to \mathbb{R}$ continua su $[a, b]$, derivabile su $(a, b)$, e $f(a) = f(b)$. Allora esiste $c \in (a, b)$ con $f'(c) = 0$.

> **Intuizione:** se la funzione parte e arriva alla stessa quota (in modo continuo e liscio), in mezzo deve avere una tangente orizzontale (un picco o una valle).

*Dim.* Per Weierstrass (cap. 25), $f$ su $[a, b]$ compatto ha max e min. Due casi:
- Max e min entrambi agli estremi: per ipotesi $f(a) = f(b)$, quindi $f$ è costante → $f' \equiv 0$. Ogni $c$ va bene.
- Almeno uno degli estremi è interno: in quel punto $c \in (a, b)$, per Fermat, $f'(c) = 0$. ∎

## 3. Teorema di Lagrange (valor medio)

> **IL teorema più importante del capitolo.**

**Teorema (Lagrange).** $f : [a, b] \to \mathbb{R}$ continua su $[a, b]$, derivabile su $(a, b)$. Allora esiste $c \in (a, b)$ con
$$f'(c) = \frac{f(b) - f(a)}{b - a}.$$

> **Glossarietto:**
>
> - $[a, b]$ = intervallo chiuso (estremi inclusi).
> - $(a, b)$ = intervallo aperto (estremi esclusi); $f$ deve essere derivabile qui, non necessariamente agli estremi.
> - $f'(c)$ = **pendenza istantanea** in $c$.
> - $(f(b) - f(a))/(b - a)$ = **pendenza media** = pendenza della corda che unisce $(a, f(a))$ a $(b, f(b))$.
> - **In parole:** esiste un punto $c$ dove istantanea = media; tangente in $c$ parallela alla corda agli estremi.

*Dim. (riconduzione a Rolle).* Definisci $g(x) = f(x) - \frac{f(b) - f(a)}{b - a} (x - a)$. $g$ è continua su $[a, b]$, derivabile su $(a, b)$, e $g(a) = f(a) = g(b)$ (verifica). Per Rolle, $\exists c$ con $g'(c) = 0$, cioè $f'(c) = (f(b) - f(a))/(b - a)$. ∎

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <line x1="40" y1="270" x2="580" y2="270" stroke="#948f78" stroke-width="1"/>
  <path d="M 80 250 Q 250 150 350 100 Q 450 80 540 130" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <line x1="80" y1="250" x2="540" y2="130" stroke="#6aa9d8" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="100" y="280" fill="#6aa9d8" font-size="11">pendenza media</text>
  <circle cx="80" cy="250" r="3" fill="#f3eed9"/>
  <text x="65" y="290" fill="#f3eed9" font-size="11" font-style="italic">a</text>
  <circle cx="540" cy="130" r="3" fill="#f3eed9"/>
  <text x="535" y="290" fill="#f3eed9" font-size="11" font-style="italic">b</text>
  <circle cx="350" cy="100" r="4" fill="#d4af37"/>
  <text x="345" y="90" fill="#d4af37" font-size="11" font-style="italic">c</text>
  <line x1="270" y1="120" x2="430" y2="80" stroke="#d4af37" stroke-width="1.5"/>
  <text x="335" y="60" fill="#d4af37" font-size="11">tangente in c</text>
</svg>
<div class="chart-caption">Lagrange: esiste $c$ dove la tangente è **parallela** alla retta secante per $(a, f(a))$ e $(b, f(b))$.</div>
</div>

### Conseguenze cruciali

**Corollario 1 (caratterizzazione della crescenza).**
- $f' \ge 0$ su $(a, b)$ $\Rightarrow$ $f$ crescente.
- $f' > 0$ su $(a, b)$ $\Rightarrow$ $f$ strettamente crescente.
- $f' \equiv 0$ $\Rightarrow$ $f$ costante.

*Dim.* Per $x_1 < x_2$, applica Lagrange su $[x_1, x_2]$: $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) \ge 0$. ∎

> Senza Lagrange non si poteva dire questa cosa "ovvia": $f' \ge 0$ è un'informazione locale, "$f$ crescente" è globale.

**Corollario 2 (disuguaglianza).** Se $|f'(x)| \le M$ su $(a, b)$, allora $|f(x) - f(y)| \le M |x - y|$ (Lipschitz).

## 4. Teorema di Cauchy (valor medio generalizzato)

**Teorema.** $f, g : [a, b] \to \mathbb{R}$ continue, derivabili su $(a, b)$, $g'(x) \ne 0$ su $(a, b)$. Allora $\exists c \in (a, b)$ con
$$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(c)}{g'(c)}.$$

Per $g(x) = x$ si riottiene Lagrange.

*Dim.* Applica Rolle a $h(x) = f(x) - \frac{f(b) - f(a)}{g(b) - g(a)} (g(x) - g(a))$. ∎

**Uso principale:** dimostrare la regola di **de l'Hôpital** (cap. 32).

## Esercizi

<details>
<summary>Esercizio 1 — Rolle al lavoro</summary>

Mostra che $p(x) = x^3 - 3x + 1$ ha esattamente 3 radici reali.

**Soluzione.** $p(\pm \infty) = \pm \infty$, quindi almeno una radice per IVT. $p'(x) = 3x^2 - 3 = 0$ in $x = \pm 1$. Studiando segno di $p'$: cresce su $(-\infty, -1)$, decresce su $(-1, 1)$, cresce su $(1, +\infty)$. $p(-1) = 3 > 0$, $p(1) = -1 < 0$. Tre cambi di segno → 3 radici. ∎
</details>

<details>
<summary>Esercizio 2 — Lagrange per disuguaglianze</summary>

Mostra $|\sin x - \sin y| \le |x - y|$.

**Soluzione.** Per Lagrange su $[y, x]$ (WLOG $y < x$): $\sin x - \sin y = \cos(c) (x - y)$ per qualche $c$. Quindi $|\sin x - \sin y| = |\cos c| \cdot |x - y| \le |x - y|$. ∎
</details>

<details>
<summary>Esercizio 3 — Punti critici</summary>

Trova i punti critici di $f(x) = x^4 - 2x^2$ e classificali.

**Soluzione.** $f'(x) = 4x^3 - 4x = 4x(x^2 - 1) = 0$ in $x = 0, \pm 1$. Studiando $f'$: negativa in $(-1, 0) \cup (1, +\infty)$... wait, $f'(x) = 4x(x-1)(x+1)$, segno: $-, +, -, +$ in $(-\infty, -1), (-1, 0), (0, 1), (1, +\infty)$. Quindi $x = -1, 1$ min, $x = 0$ max locale. ∎
</details>

## Riassunto in una riga

**Fermat** (estremi interni → $f' = 0$), **Rolle** (uguali agli estremi → derivata si annulla), **Lagrange** (pendenza media = pendenza istantanea), **Cauchy** (valor medio per coppie): quattro teoremi che trasformano informazione locale (derivata) in informazione globale (monotonia, crescita, Lipschitz).
