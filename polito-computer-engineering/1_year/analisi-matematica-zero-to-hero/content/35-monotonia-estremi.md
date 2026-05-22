---
title: "Monotonia, massimi, minimi, punti critici"
area: Calcolo differenziale
summary: "Dal **segno di $f'$** alla monotonia. Test della derivata prima e seconda per riconoscere massimi/minimi/flessi. Strumenti per studi di funzione e ottimizzazione."
order: 35
level: intermedio
prereq:
  - "Fermat e Lagrange (sez. 31)"
tools:
  - "Rudin — *Principles*, cap. 5"
---

# Monotonia, massimi, minimi, punti critici

## Perché parlarne

Il legame fra il **segno di $f'$** e il comportamento di $f$ è il ponte locale → globale (l'altro è $f''$, cap. 36). Sapere se cresce/decresce, dove tocca max/min, come ottimizzare problemi concreti.

## Monotonia da derivata

**Teorema (corollario di Lagrange, cap. 31).** Sia $f$ continua su $[a, b]$, derivabile su $(a, b)$.

- $f' \ge 0$ su $(a, b)$ $\iff$ $f$ crescente su $[a, b]$.
- $f' > 0$ ⇒ $f$ **strettamente** crescente.
- $f' \equiv 0$ ⇒ $f$ costante.

> **Attenzione:** "$f' > 0$" è sufficiente, non necessaria. $f(x) = x^3$ è strettamente crescente su $\mathbb{R}$ ma $f'(0) = 0$.

## Punti critici e classificazione

**Definizione.** Un **punto critico** (o **stazionario**) di $f$ è $x_0$ con $f'(x_0) = 0$.

> **Glossarietto:**
>
> - $f'(x_0) = 0$ = la tangente al grafico in $x_0$ è **orizzontale**.
> - **Massimo/minimo locale** = valore più alto/basso in un intorno (non necessariamente globalmente).
> - **Flesso a tangente orizzontale** = punto in cui la curva attraversa la tangente cambiando concavità (es. $x^3$ in 0).
> - **Estremo assoluto** (globale): max/min su tutto il dominio considerato.

Per Fermat (cap. 31), i punti di estremo locale interni dove $f$ è derivabile sono critici. Il viceversa NON vale: $x_0$ critico può essere max, min, o **flesso** ($f(x) = x^3$ in 0).

### Test della derivata prima

**Per $x_0$ punto critico:**

- $f' > 0$ a sinistra, $f' < 0$ a destra → **massimo locale**.
- $f' < 0$ a sinistra, $f' > 0$ a destra → **minimo locale**.
- $f'$ stesso segno su entrambi i lati → **flesso a tangente orizzontale**.

> **Mnemonico:** segna $f'$ su una retta; quando passa da $+$ a $-$, è un picco; da $-$ a $+$, una valle.

### Test della derivata seconda

**Per $x_0$ critico con $f''$ continua:**

- $f''(x_0) > 0$ → **minimo locale** (concavità verso l'alto).
- $f''(x_0) < 0$ → **massimo locale** (concavità verso il basso).
- $f''(x_0) = 0$ → **inconcludente** (serve test più fine: $f'''$, Taylor).

## Estremi assoluti

Su **compatto** $[a, b]$ (per Weierstrass, cap. 25): max e min esistono e sono in $\{$ critici interni $\} \cup \{a, b\} \cup \{$ punti non derivabili $\}$. Algoritmo:

1. Trova tutti i punti critici in $(a, b)$.
2. Aggiungi gli estremi $a, b$ (e ogni punto non derivabile).
3. Calcola $f$ in tutti i punti candidati.
4. Max/min sono il più grande/più piccolo.

## Esempio guidato

$f(x) = x^4 - 4 x^3$ su $\mathbb{R}$.

$f'(x) = 4 x^3 - 12 x^2 = 4 x^2 (x - 3) = 0$ in $x = 0, 3$.

**Segno di $f'$:** $x^2 \ge 0$, $(x - 3) < 0$ per $x < 3$, $> 0$ per $x > 3$. Quindi $f' < 0$ per $x < 3$ (esclusi gli zeri), $f' > 0$ per $x > 3$. Wait — più preciso: $f' = 4 x^2 (x - 3)$ è negativo per $x < 3$ (sia $x < 0$ sia $0 < x < 3$), positivo per $x > 3$.

- Su $(-\infty, 0)$: $f$ decrescente.
- In 0: punto critico. Stesso segno di $f'$ ai due lati ($-$) → **flesso a tangente orizzontale**.
- Su $(0, 3)$: $f$ ancora decrescente.
- Su $(3, +\infty)$: $f$ crescente.
- In 3: $f' < 0$ a sinistra, $> 0$ a destra → **minimo locale**.

Minimo locale: $f(3) = 81 - 108 = -27$.

## Esercizi

<details>
<summary>Esercizio 1 — Studio classico</summary>

Trova max/min di $f(x) = x^3 - 3x$ su $[-2, 2]$.

**Soluzione.** $f'(x) = 3x^2 - 3 = 0$ in $x = \pm 1$. Candidati: $-2, -1, 1, 2$. $f(-2) = -2$, $f(-1) = 2$, $f(1) = -2$, $f(2) = 2$.

Max assoluto $= 2$ in $x = -1$ e $x = 2$. Min assoluto $= -2$ in $x = -2$ e $x = 1$. ∎
</details>

<details>
<summary>Esercizio 2 — Test della seconda</summary>

$f(x) = x e^{-x^2}$. Trova gli estremi.

**Soluzione.** $f'(x) = e^{-x^2}(1 - 2x^2) = 0$ in $x = \pm 1/\sqrt 2$. $f''(x)$ con calcolo: in $x = 1/\sqrt 2$, $f'' < 0$ → **max locale**. In $x = -1/\sqrt 2$, $f'' > 0$ → **min locale**.

$f(\pm 1/\sqrt 2) = \pm e^{-1/2}/\sqrt 2$. ∎
</details>

## Riassunto in una riga

**Crescenza** dal segno di $f'$ (positiva → cresce); **estremi interni** dove $f' = 0$ (punti critici), classificati dal **cambio di segno** di $f'$ o dal **segno di $f''$**; **estremi assoluti** su compatti = max/min fra critici, estremi del dominio, punti non derivabili.
