---
title: "Regole di derivazione (somma, prodotto, quoziente, catena)"
area: Derivate
summary: "Le regole algebriche per derivare combinazioni di funzioni — somma, prodotto (Leibniz), quoziente, **regola della catena**, derivata dell'inversa. Tutte dimostrate dalla definizione, applicate quotidianamente."
order: 29
level: intermedio
prereq:
  - "Derivata: definizione (sez. 28)"
  - "Limiti e continuità (sez. 21, 24)"
tools:
  - "Rudin — *Principles*, cap. 5"
---

# Regole di derivazione

## Perché regole, non solo definizione

Derivare dalla definizione è proibitivo: anche per $(x^3 \sin x)/(x^2 + 1)$, il rapporto incrementale è un mostro. Le **regole di derivazione** sono teoremi che permettono di costruire la derivata da pezzi elementari.

## Linearità

> $(f + g)' = f' + g'$, $(\lambda f)' = \lambda f'$.

*Dim. somma.* Rapporto incrementale di $f + g$ = somma dei rapporti incrementali di $f$ e $g$. Per linearità del limite → $f' + g'$. ∎

## Regola del prodotto (Leibniz)

> $(f g)'(x_0) = f'(x_0) g(x_0) + f(x_0) g'(x_0)$.

*Dim.* Trucco "somma e sottrai $f(x_0 + h) g(x_0)$":
$$\frac{f(x_0+h)g(x_0+h) - f(x_0)g(x_0)}{h} = f(x_0+h) \cdot \frac{g(x_0+h) - g(x_0)}{h} + g(x_0) \cdot \frac{f(x_0+h) - f(x_0)}{h}.$$
Per $h \to 0$: $f(x_0 + h) \to f(x_0)$ (continuità), e i rapporti → $g'(x_0), f'(x_0)$. Risultato: $f g' + g f'$. ∎

> **Mnemonico:** "(derivo il primo) × (lascio il secondo) + (lascio il primo) × (derivo il secondo)".

## Regola del quoziente

> $\left(\dfrac{f}{g}\right)'(x_0) = \dfrac{f'(x_0) g(x_0) - f(x_0) g'(x_0)}{g(x_0)^2}$ (per $g(x_0) \ne 0$).

*Dim.* Si dimostra prima $(1/g)' = -g'/g^2$ (via Leibniz su $1 = g \cdot 1/g$), poi $f/g = f \cdot 1/g$ via Leibniz. ∎

## Regola della catena (chain rule)

**La più importante.** Dice come derivare la composizione $(g \circ f)(x) = g(f(x))$.

> **Teorema (catena).** Se $f$ è derivabile in $x_0$ e $g$ è derivabile in $f(x_0)$, allora $g \circ f$ è derivabile in $x_0$ e
> $$(g \circ f)'(x_0) = g'(f(x_0)) \cdot f'(x_0).$$

> **Glossarietto:**
>
> - $g \circ f$ = **composizione**: prima si applica $f$, poi $g$. $(g \circ f)(x) = g(f(x))$.
> - $f$ = funzione **interna**; $g$ = funzione **esterna**.
> - $g'(f(x_0))$ = derivata di $g$ valutata nel valore intermedio $f(x_0)$.
> - $f'(x_0)$ = derivata di $f$ in $x_0$.
> - **Mnemonico:** "derivo l'esterna (lasciando l'interna dentro), moltiplico per la derivata dell'interna".

> **In Leibniz:** $\dfrac{d (g(f))}{dx} = \dfrac{dg}{df} \cdot \dfrac{df}{dx}$. Le "dx" si semplificano formalmente, ma è una notazione (non si possono manipolare come frazioni in generale).

*Dim. (idea).* $\dfrac{g(f(x)) - g(f(x_0))}{x - x_0} = \dfrac{g(f(x)) - g(f(x_0))}{f(x) - f(x_0)} \cdot \dfrac{f(x) - f(x_0)}{x - x_0}$. Per $x \to x_0$, $f(x) \to f(x_0)$ (continuità), quindi il primo fattore $\to g'(f(x_0))$ e il secondo $\to f'(x_0)$. ∎

(Cautela tecnica quando $f(x) = f(x_0)$ in un intorno: si gestisce a parte.)

**Esempio.** Derivare $h(x) = \sin(x^2)$.

$f(x) = x^2$, $g(y) = \sin y$. $f'(x) = 2x$, $g'(y) = \cos y$.

$h'(x) = g'(f(x)) \cdot f'(x) = \cos(x^2) \cdot 2 x = 2 x \cos(x^2)$.

## Derivata dell'inversa

> Sia $f$ continua e strettamente monotona su un intervallo, derivabile in $x_0$ con $f'(x_0) \ne 0$. Allora $f^{-1}$ è derivabile in $y_0 = f(x_0)$ e
> $$(f^{-1})'(y_0) = \frac{1}{f'(x_0)} = \frac{1}{f'(f^{-1}(y_0))}.$$

*Idea.* Dalla relazione $f^{-1}(f(x)) = x$, derivo con la catena: $(f^{-1})'(f(x)) \cdot f'(x) = 1$.

**Esempio.** $f(x) = e^x$, $f^{-1}(y) = \ln y$. $(f^{-1})'(y) = 1/f'(\ln y) = 1/e^{\ln y} = 1/y$.

## Esercizi

<details>
<summary>Esercizio 1 — Leibniz</summary>

Deriva $f(x) = x^3 \sin x$.

**Soluzione.** $f' = 3 x^2 \sin x + x^3 \cos x$. ∎
</details>

<details>
<summary>Esercizio 2 — Quoziente</summary>

Deriva $f(x) = (x^2 + 1)/(x - 2)$.

**Soluzione.** $f' = \frac{2x(x - 2) - (x^2 + 1)}{(x - 2)^2} = \frac{x^2 - 4x - 1}{(x - 2)^2}$. ∎
</details>

<details>
<summary>Esercizio 3 — Catena</summary>

Deriva $f(x) = \sin(\cos(x^2))$.

**Soluzione.** Applico catena due volte: $f' = \cos(\cos(x^2)) \cdot (-\sin(x^2)) \cdot 2x = -2x \sin(x^2) \cos(\cos(x^2))$. ∎
</details>

<details>
<summary>Esercizio 4 — Derivata di $a^x$</summary>

Deriva $a^x$ per $a > 0$.

**Soluzione.** $a^x = e^{x \ln a}$. Per catena: $(e^{x \ln a})' = e^{x \ln a} \cdot \ln a = a^x \ln a$. ∎
</details>

<details>
<summary>Esercizio 5 — Inversa</summary>

Deriva $\arctan y$ usando la regola dell'inversa.

**Soluzione.** $f(x) = \tan x$, $f'(x) = 1 + \tan^2 x$. $(\arctan)'(y) = 1/(1 + \tan^2 (\arctan y)) = 1/(1 + y^2)$. ∎
</details>

## Riassunto in una riga

Cinque regole — **linearità**, **Leibniz** (prodotto), **quoziente**, **catena** (composizione), **inversa** — bastano a derivare qualunque combinazione delle funzioni elementari, riducendo il calcolo a un'algebra meccanica.
