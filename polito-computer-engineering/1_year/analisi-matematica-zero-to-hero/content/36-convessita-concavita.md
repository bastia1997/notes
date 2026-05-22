---
title: "Convessità, concavità, flessi"
area: Calcolo differenziale
summary: "La **curvatura** globale di una funzione. **Convessa** = corde sopra il grafico (\"a forma di valle\"). Definizioni equivalenti (geometrica, $f'' \\ge 0$, Jensen). Punti di flesso, disuguaglianze classiche."
order: 36
level: intermedio
prereq:
  - "Derivate prime e seconde (sez. 29-30)"
  - "Monotonia da derivata (sez. 35)"
tools:
  - "Rudin — *Principles*, cap. 5"
---

# Convessità, concavità, flessi

## Perché parlarne

$f'$ dice se $f$ cresce o cala. $f''$ dice se cresce **accelerando** o **frenando**: cioè se la curva "tiene la corda sopra" o "sotto". Questo è il concetto di **convessità**.

Conseguenze: disuguaglianza di Jensen, le grandi disuguaglianze (AM-GM, Young, Cauchy-Schwarz), esistenza di minimi globali in problemi ottimizzazione.

## Definizione geometrica

**Definizione.** $f : I \to \mathbb{R}$ ($I$ intervallo) è **convessa** se per ogni $x, y \in I$ e $\lambda \in [0, 1]$:
$$f(\lambda x + (1 - \lambda) y) \le \lambda f(x) + (1 - \lambda) f(y).$$

> **Glossarietto:**
>
> - $\lambda x + (1 - \lambda) y$ = **combinazione convessa** di $x$ e $y$ (un punto fra $x$ e $y$).
> - **Geometricamente:** la corda che congiunge $(x, f(x))$ a $(y, f(y))$ sta **sopra** il grafico.
> - Esempio prototipo: $x^2$ (parabola "verso l'alto").

$f$ è **concava** se $-f$ è convessa (corda sotto). Esempio: $\sqrt x$, $\ln x$.

## Caratterizzazione tramite $f''$

**Teorema.** $f$ con $f''$ continua su un intervallo. Allora:
- $f$ convessa $\iff$ $f''(x) \ge 0$.
- $f$ concava $\iff$ $f''(x) \le 0$.

> **In parole:** $f''$ positiva → "sorride" (apertura verso l'alto). $f''$ negativa → "triste" (apertura verso il basso).

**Punto di flesso** = punto dove la concavità cambia ($f''$ cambia segno).

## Esempi

- $x^2$: $f'' = 2 > 0$, **convessa** ovunque.
- $-x^2$: $f'' = -2 < 0$, **concava**.
- $x^3$: $f'' = 6x$, cambia segno in 0. **Flesso** in 0.
- $e^x$: $f'' = e^x > 0$, convessa.
- $\ln x$: $f'' = -1/x^2 < 0$, concava su $(0, +\infty)$.
- $\sin x$: convessa su $(\pi, 2\pi)$, concava su $(0, \pi)$, flessi negli $k \pi$.

## Disuguaglianza di Jensen (utile)

**Per $f$ convessa** e $\lambda_i \ge 0$ con $\sum \lambda_i = 1$:
$$f\left(\sum \lambda_i x_i\right) \le \sum \lambda_i f(x_i).$$

(Generalizzazione a $n$ punti della definizione.)

## Conseguenze (disuguaglianze classiche)

Applicando Jensen a $f$ specifiche si ottengono:

- **AM-GM:** $\sqrt[n]{x_1 \cdots x_n} \le (x_1 + \dots + x_n)/n$ (da $\ln$ concava).
- **Young:** $a b \le a^p/p + b^q/q$ con $1/p + 1/q = 1$ (da $\ln$ concava).
- **Cauchy-Schwarz:** $|\sum a_i b_i| \le \sqrt{\sum a_i^2} \cdot \sqrt{\sum b_i^2}$.

## Esercizi

<details>
<summary>Esercizio 1 — Studio della concavità</summary>

Trova i punti di flesso di $f(x) = x^4 - 6 x^2$.

**Soluzione.** $f'' = 12 x^2 - 12 = 12(x - 1)(x + 1) = 0$ in $x = \pm 1$. $f'' < 0$ su $(-1, 1)$ (concava), $> 0$ fuori (convessa). Flessi in $x = \pm 1$. ∎
</details>

<details>
<summary>Esercizio 2 — Jensen al lavoro</summary>

Dimostra che $\sqrt{ab} \le (a + b)/2$ per $a, b > 0$ via Jensen.

**Soluzione.** $f(x) = \ln x$ concava (per Jensen all'ingiù): $\ln((a + b)/2) \ge (\ln a + \ln b)/2 = \ln \sqrt{ab}$. Esponenziando: $(a + b)/2 \ge \sqrt{ab}$. ∎
</details>

## Riassunto in una riga

$f$ **convessa** = corda sopra grafico ($f'' \ge 0$), $f$ **concava** = corda sotto ($f'' \le 0$); flessi dove la concavità cambia. **Jensen** generalizza a $n$ punti e dà le grandi disuguaglianze (AM-GM, Young, Cauchy-Schwarz).
