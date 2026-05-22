---
title: "Derivate delle funzioni elementari"
area: Derivate
summary: "La **tabella delle derivate fondamentali** — il vocabolario di base del calcolo. Ogni voce dimostrata, dalla regola di potenza ai trigonometrici inversi. Da memorizzare per non rifare i conti ogni volta."
order: 30
level: intermedio
prereq:
  - "Derivata: definizione (sez. 28)"
  - "Regole di derivazione (sez. 29)"
tools:
  - "Rudin — *Principles*, cap. 5"
---

# Derivate delle funzioni elementari

## Tabella che salva la vita

Tutte le derivate qui sotto si dimostrano. Ma vanno **memorizzate**: senza, scrivere $(e^{\sin x})'$ è impossibile.

> **Glossarietto:**
>
> - $c$ = costante reale (numero fisso).
> - $n \in \mathbb{N}$ = numero naturale.
> - $\alpha \in \mathbb{R}$ = esponente qualunque reale (positivo, negativo o frazionario).
> - $a > 0$, $a \ne 1$ = base di esponenziale/logaritmo (per $a = e$ riotteniamo $e^x, \ln x$).
> - **Dominio** = insieme dei valori $x$ per cui sia $f$ sia $f'$ sono definite.
> - $\sinh x = (e^x - e^{-x})/2$, $\cosh x = (e^x + e^{-x})/2$ = **funzioni iperboliche**.

| $f(x)$ | $f'(x)$ | dominio |
|---|---|---|
| $c$ (costante) | $0$ | $\mathbb{R}$ |
| $x^n$, $n \in \mathbb{N}$ | $n x^{n-1}$ | $\mathbb{R}$ |
| $x^\alpha$, $\alpha \in \mathbb{R}$ | $\alpha x^{\alpha-1}$ | $x > 0$ |
| $\sqrt x$ | $1/(2 \sqrt x)$ | $x > 0$ |
| $1/x$ | $-1/x^2$ | $x \ne 0$ |
| $e^x$ | $e^x$ | $\mathbb{R}$ |
| $a^x$ | $a^x \ln a$ | $\mathbb{R}$, $a > 0$ |
| $\ln x$ | $1/x$ | $x > 0$ |
| $\log_a x$ | $1/(x \ln a)$ | $x > 0$ |
| $\sin x$ | $\cos x$ | $\mathbb{R}$ |
| $\cos x$ | $-\sin x$ | $\mathbb{R}$ |
| $\tan x$ | $1/\cos^2 x = 1 + \tan^2 x$ | $\cos x \ne 0$ |
| $\arcsin x$ | $1/\sqrt{1 - x^2}$ | $|x| < 1$ |
| $\arccos x$ | $-1/\sqrt{1 - x^2}$ | $|x| < 1$ |
| $\arctan x$ | $1/(1 + x^2)$ | $\mathbb{R}$ |
| $\sinh x$ | $\cosh x$ | $\mathbb{R}$ |
| $\cosh x$ | $\sinh x$ | $\mathbb{R}$ |
| $\tanh x$ | $1/\cosh^2 x = 1 - \tanh^2 x$ | $\mathbb{R}$ |

## Dimostrazioni

### Potenza intera $x^n$

*Dim.* Per $n = 1$, $(x)' = 1$. Per induzione: $(x^{n+1})' = (x \cdot x^n)' = 1 \cdot x^n + x \cdot n x^{n-1} = (n+1) x^n$ (Leibniz). ∎

### Potenza generale $x^\alpha$ ($x > 0$)

*Dim.* $x^\alpha = e^{\alpha \ln x}$. Per catena: $(x^\alpha)' = e^{\alpha \ln x} \cdot \alpha/x = x^\alpha \cdot \alpha/x = \alpha x^{\alpha - 1}$. ∎

### Esponenziale $e^x$

*Dim.* Rapporto incrementale: $(e^{x_0 + h} - e^{x_0})/h = e^{x_0} \cdot (e^h - 1)/h \to e^{x_0} \cdot 1 = e^{x_0}$ (limite notevole). ∎

### Logaritmo $\ln x$

*Dim.* Inversa di $e^x$. $(e^x)' = e^x \ne 0$ ovunque. Per regola dell'inversa: $(\ln)'(y) = 1/e^{\ln y} = 1/y$. ∎

### Seno

*Dim.* $(\sin(x_0 + h) - \sin x_0)/h = (\sin x_0 \cos h + \cos x_0 \sin h - \sin x_0)/h = \sin x_0 \cdot (\cos h - 1)/h + \cos x_0 \cdot \sin h /h \to \sin x_0 \cdot 0 + \cos x_0 \cdot 1 = \cos x_0$. ∎

### Coseno

*Dim.* Analogo, oppure $\cos x = \sin(\pi/2 - x)$ e catena: $(\cos)' = \cos(\pi/2 - x) \cdot (-1) = -\sin x$. ∎

### Tangente

*Dim.* $\tan = \sin/\cos$. Per quoziente: $(\tan)' = (\cos \cdot \cos - \sin \cdot (-\sin))/\cos^2 = 1/\cos^2$. ∎

### Arcsin

*Dim.* Inversa di $\sin$ ristretto a $[-\pi/2, \pi/2]$. $(\sin)' = \cos$. $(\arcsin)'(y) = 1/\cos(\arcsin y)$. Per $|y| < 1$, $\cos(\arcsin y) = \sqrt{1 - y^2}$. Quindi $(\arcsin)'(y) = 1/\sqrt{1 - y^2}$. ∎

### Arctan

*Dim.* $(\arctan)'(y) = 1/(1 + \tan^2(\arctan y)) = 1/(1 + y^2)$. ∎

### Iperboliche

Direttamente dalla definizione $\sinh = (e^x - e^{-x})/2$, $\cosh = (e^x + e^{-x})/2$. Derivata di $e^x = e^x$, di $e^{-x} = -e^{-x}$ (catena). Quindi $(\sinh)' = (e^x + e^{-x})/2 = \cosh$, $(\cosh)' = (e^x - e^{-x})/2 = \sinh$.

## Esempi composti

**1.** $(e^{\sin x})' = e^{\sin x} \cdot \cos x$ (catena).

**2.** $(\ln(\cos x))' = (1/\cos x) \cdot (-\sin x) = -\tan x$.

**3.** $(x^x)' = (e^{x \ln x})' = e^{x \ln x} \cdot (\ln x + 1) = x^x (\ln x + 1)$.

**4.** $(\arctan(x^2))' = (1/(1 + x^4)) \cdot 2x = 2x/(1 + x^4)$.

## Esercizi

<details>
<summary>Esercizio 1</summary>

Deriva $f(x) = \sin(x^2) \cdot e^{3x}$.

**Soluzione.** Leibniz: $f' = 2x \cos(x^2) e^{3x} + 3 \sin(x^2) e^{3x} = e^{3x}(2x \cos(x^2) + 3 \sin(x^2))$. ∎
</details>

<details>
<summary>Esercizio 2 — Funzione potenza con esponente variabile</summary>

$(x^{\sin x})'$.

**Soluzione.** $= (e^{\sin x \ln x})' = x^{\sin x} \cdot (\cos x \ln x + \sin x/x)$. ∎
</details>

<details>
<summary>Esercizio 3 — Logaritmica</summary>

Deriva $\ln|\sec x + \tan x|$.

**Soluzione.** Catena: $1/(\sec x + \tan x) \cdot (\sec x \tan x + \sec^2 x) = \sec x (\tan x + \sec x)/(\sec x + \tan x) = \sec x$. ∎
</details>

## Riassunto in una riga

Memorizza la tabella delle derivate elementari, applica le 5 regole di derivazione (cap. 29) — e qualunque funzione costruita componendole è derivabile algoritmicamente.
