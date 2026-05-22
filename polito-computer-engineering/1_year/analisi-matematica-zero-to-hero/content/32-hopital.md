---
title: "Regola di de L'Hôpital"
area: Calcolo differenziale
summary: "Lo strumento più usato (e abusato) per risolvere forme $0/0$ e $\\infty/\\infty$ — derivare numeratore e denominatore separatamente e ritentare. Funziona quando le ipotesi sono soddisfatte; sbaglia quando le si dimentica."
order: 32
level: intermedio
prereq:
  - "Teorema di Cauchy (sez. 31)"
  - "Forme indeterminate (sez. 21)"
tools:
  - "Rudin — *Principles*, cap. 5"
---

# Regola di de L'Hôpital

## Perché parlarne

Davanti a un limite $0/0$ o $\infty/\infty$, l'algebra si blocca. **Hôpital** è la prima difesa: deriva numeratore e denominatore separatamente, ritenta. Funziona perché vicino al punto $f/g$ è guidato dal "decadimento" relativo, e la derivata misura quel decadimento al primo ordine. Giustificazione: Cauchy (cap. 31).

> **Attenzione:** è anche lo strumento più frainteso. Non si applica a *tutte* le forme indeterminate, non è sempre vantaggioso. Imparare a NON usarla è importante quanto saperla usare.

## Enunciato

**Teorema (Hôpital, forma $0/0$).** Siano $f, g$ derivabili in un intorno bucato di $x_0$, $g'(x) \ne 0$. Se:
1. $\lim_{x \to x_0} f = 0$ e $\lim_{x \to x_0} g = 0$;
2. $\lim_{x \to x_0} f'(x)/g'(x) = L$ (finito o $\pm \infty$);

allora $\lim_{x \to x_0} f(x)/g(x) = L$.

**Teorema (forma $\infty/\infty$).** Stesse ipotesi di regolarità, ma con $\lim |g| = +\infty$.

> **Glossarietto:**
>
> - **Forma $0/0$:** sia $f$ sia $g$ tendono a 0.
> - **Forma $\infty/\infty$:** $g$ tende a $\pm\infty$ (e di solito anche $f$).
> - Conclusione: il limite del rapporto = limite del rapporto delle derivate.
>
> **Tradotto:** se non riesci a calcolare $\lim f/g$, prova con $\lim f'/g'$ — se quello esiste, dà la stessa risposta.

*Dim. (caso $0/0$).* Estendi $f, g$ a $x_0$ con $f(x_0) = g(x_0) = 0$. Per Cauchy su $[x_0, x]$: $\exists c \in (x_0, x)$ con $f(x)/g(x) = f'(c)/g'(c)$. Per $x \to x_0$, $c \to x_0$, quindi $\lim f/g = \lim f'/g' = L$. ∎

## Esempi

**1.** $\lim_{x \to 0} \sin x / x$. Forma $0/0$. Hôpital: $\lim \cos x / 1 = 1$. ✓

**2.** $\lim_{x \to 0} (e^x - 1 - x)/x^2$. Forma $0/0$. Hôpital: $\lim (e^x - 1)/(2x)$, ancora $0/0$. Riapplico: $\lim e^x/2 = 1/2$.

**3.** $\lim_{x \to +\infty} \ln x / x$. Forma $\infty/\infty$. Hôpital: $\lim (1/x)/1 = 0$.

**4.** $\lim_{x \to +\infty} x^\alpha/e^x$ ($\alpha > 0$). Forma $\infty/\infty$. Hôpital iterato $\lceil \alpha \rceil$ volte: tende a 0.

## Altre forme indeterminate

Hôpital diretto vale solo per $0/0$ e $\infty/\infty$. Le altre vanno **ridotte** a queste:

- **$0 \cdot \infty$:** $f \cdot g = f / (1/g)$ (diventa $0/0$).
- **$\infty - \infty$:** spesso fattorizzazione o denominatore comune.
- **$1^\infty, 0^0, \infty^0$:** $f^g = e^{g \ln f}$, lavoro sull'esponente.

**Esempio.** $\lim_{x \to 0^+} x \ln x$. Forma $0 \cdot (-\infty)$. Riscrivo $= \lim \ln x / (1/x)$ → $\infty/\infty$. Hôpital: $\lim (1/x)/(-1/x^2) = \lim -x = 0$.

## Quando Hôpital NON serve (o peggiora)

**1. Quando l'algebra normale basta.**
$\lim_{x \to 0} \sin(3x)/\sin(5x)$: scrivere $= 3/5 \cdot (\sin(3x)/(3x))/(\sin(5x)/(5x)) \to 3/5$ è più veloce di Hôpital.

**2. Quando le derivate sono peggiori.**
$\lim_{x \to +\infty} (\sqrt{x^2 + 1} - x)$. Hôpital qui non si applica perché non è $0/0$ o $\infty/\infty$ in forma standard. Razionalizzazione invece risolve subito.

**3. Quando il rapporto delle derivate oscilla.**
$\lim_{x \to +\infty} (x + \sin x)/x$. Hôpital: $\lim (1 + \cos x)/1$ non esiste! Ma il limite originale è 1 (algebra: $1 + \sin x/x \to 1$).

> **Attenzione:** ipotesi (2) "$\lim f'/g' = L$" è essenziale. Se NON esiste, Hôpital non dice nulla.

## Esercizi

<details>
<summary>Esercizio 1 — Hôpital classico</summary>

$\lim_{x \to 0} (1 - \cos x)/x^2$.

**Soluzione.** $0/0$. Hôpital: $\lim \sin x / (2x) = 1/2$ (per limite notevole). ∎
</details>

<details>
<summary>Esercizio 2 — Iterato</summary>

$\lim_{x \to 0} (\tan x - x)/x^3$.

**Soluzione.** $0/0$. Hôpital: $\lim (1/\cos^2 x - 1)/(3 x^2) = \lim (\tan^2 x)/(3 x^2) = (1/3) \lim (\sin x/x)^2 / \cos^2 x = 1/3$. ∎
</details>

<details>
<summary>Esercizio 3 — Forma $0 \cdot \infty$</summary>

$\lim_{x \to 0^+} x^x$.

**Soluzione.** $0^0$. $x^x = e^{x \ln x}$. $\lim x \ln x = 0$ (es. sopra). Quindi $x^x \to e^0 = 1$. ∎
</details>

## Riassunto in una riga

Hôpital: per $0/0$ e $\infty/\infty$, $\lim f/g = \lim f'/g'$ se quest'ultimo esiste — strumento potente ma da usare con prudenza, riducendo altre forme indeterminate al caso standard.
