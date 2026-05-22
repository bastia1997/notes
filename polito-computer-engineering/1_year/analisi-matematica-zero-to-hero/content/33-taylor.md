---
title: "Polinomi e formula di Taylor"
area: Calcolo differenziale
summary: "Approssimare $f$ con un polinomio di grado $n$ vicino a un punto. **Formula di Taylor** con resto di Peano, Lagrange, integrale. Sviluppi notevoli di $e^x, \\sin x, \\cos x, \\ln(1+x), (1+x)^\\alpha$."
order: 33
level: intermedio
prereq:
  - "Derivate successive (sez. 29)"
  - "Teorema di Cauchy (sez. 31)"
  - "o-piccolo (sez. 15)"
tools:
  - "Rudin — *Principles*, cap. 5"
---

# Polinomi e formula di Taylor

## Perché parlarne

La derivata $f'(x_0)$ è la **migliore approssimazione lineare** vicino a $x_0$: $f(x_0 + h) \approx f(x_0) + f'(x_0) h$ è la retta tangente.

**Taylor estende l'idea ai polinomi di grado superiore**: aggiungere termini quadratici, cubici, …, $n$-esimi per migliorare l'approssimazione. Strumento quantitativo per controllare l'errore.

Da Taylor: tecniche di limiti (cap. 34), studi locali, analisi numerica, serie di potenze, significato di $e^x, \sin, \cos$ via serie.

## Polinomio di Taylor

**Definizione.** Sia $f$ derivabile $n$ volte in $x_0$. Il **polinomio di Taylor di grado $n$ di $f$ in $x_0$** è
$$T_n(x) := \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!} (x - x_0)^k = f(x_0) + f'(x_0)(x - x_0) + \frac{f''(x_0)}{2}(x - x_0)^2 + \dots + \frac{f^{(n)}(x_0)}{n!}(x - x_0)^n.$$

> **Glossarietto:**
>
> - $f^{(k)}(x_0)$ = $k$-esima derivata di $f$ in $x_0$. $f^{(0)} = f$, $f^{(1)} = f'$, $f^{(2)} = f''$, ecc.
> - $k!$ = $k$ fattoriale (cap. 03). $0! = 1$, $1! = 1$, $2! = 2$, $3! = 6$, ecc.
> - Per $x_0 = 0$ si chiama **polinomio di Maclaurin**.

**Caratterizzazione.** $T_n$ è l'**unico polinomio** di grado $\le n$ che ha le stesse $n + 1$ "derivate iniziali" di $f$ in $x_0$: $T_n^{(k)}(x_0) = f^{(k)}(x_0)$ per $k = 0, 1, \dots, n$.

## Formula di Taylor con resto

L'**errore** $R_n(x) := f(x) - T_n(x)$ è ciò che dobbiamo controllare. Diverse forme:

### Resto di Peano (qualitativo)

$$f(x) = T_n(x) + o((x - x_0)^n) \quad \text{per } x \to x_0.$$

> **In parole:** l'errore è "infinitamente più piccolo" di $(x - x_0)^n$.

*Ipotesi:* $f$ derivabile $n$ volte in $x_0$.

### Resto di Lagrange (quantitativo)

$$f(x) = T_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!} (x - x_0)^{n+1}$$
per qualche $c$ fra $x_0$ e $x$.

*Ipotesi:* $f$ derivabile $n+1$ volte su un intervallo.

> **Utile** per stime esplicite dell'errore.

## Sviluppi di Maclaurin notevoli

Tutti per $x \to 0$, da memorizzare:

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots + \frac{x^n}{n!} + o(x^n)$$

$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots + \frac{(-1)^k x^{2k+1}}{(2k+1)!} + o(x^{2k+2})$$

$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots + \frac{(-1)^k x^{2k}}{(2k)!} + o(x^{2k+1})$$

$$\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots + \frac{(-1)^{n+1} x^n}{n} + o(x^n)$$

$$(1 + x)^\alpha = 1 + \alpha x + \binom{\alpha}{2} x^2 + \dots + \binom{\alpha}{n} x^n + o(x^n)$$

dove $\binom{\alpha}{n} = \alpha(\alpha - 1) \cdots (\alpha - n + 1)/n!$.

## Esempi

**1.** $e^x$ in $x_0 = 0$, ordine 3: $T_3(x) = 1 + x + x^2/2 + x^3/6$. Errore: $o(x^3)$.

**2.** $\sin x$ vicino a 0, ordine 5: $T_5(x) = x - x^3/6 + x^5/120$.

**3.** $\ln(1 + x)$ ordine 2: $T_2(x) = x - x^2/2$. Stima: $|\ln(1.1) - (0.1 - 0.005)| = |0.0953 - 0.095| = 0.0003$ (corretto).

## Esercizi

<details>
<summary>Esercizio 1 — Calcolo</summary>

Polinomio di Taylor di $f(x) = \tan x$ in $x_0 = 0$, ordine 3.

**Soluzione.** $f(0) = 0$. $f'(x) = 1/\cos^2 x$, $f'(0) = 1$. $f''(x) = 2\sin x/\cos^3 x$, $f''(0) = 0$. $f'''(x) = 2/\cos^2 x + 6 \sin^2 x/\cos^4 x$, $f'''(0) = 2$.

$T_3(x) = x + 0 + 2 x^3/6 = x + x^3/3$. ∎
</details>

<details>
<summary>Esercizio 2 — Approssimazione numerica</summary>

Stima $\sin(0.5)$ con $T_3$ e l'errore di Lagrange.

**Soluzione.** $T_3 = 0.5 - 0.5^3/6 = 0.5 - 0.02083 = 0.47917$.

Errore Lagrange: $|R_3| \le |f^{(4)}(c)/4!| \cdot 0.5^4 = |\sin c|/24 \cdot 0.0625 \le 0.00260$.

Valore vero: $\sin(0.5) \approx 0.47943$. Errore reale $\approx 0.00026$, ben sotto la stima. ∎
</details>

## Riassunto in una riga

Taylor approssima $f$ vicino a $x_0$ con un polinomio $T_n(x) = \sum f^{(k)}(x_0)/k! (x - x_0)^k$, con errore controllato (Peano: $o((x-x_0)^n)$; Lagrange: stima esplicita) — base di tutti i calcoli locali in analisi.
