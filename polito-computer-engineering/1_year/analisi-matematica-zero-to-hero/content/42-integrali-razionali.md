---
title: "Integrazione di funzioni razionali"
area: Integrali
summary: "**Algoritmo deterministico** per integrare ogni $P(x)/Q(x)$: divisione euclidea, fattorizzazione di $Q$, decomposizione in **fratti semplici**, integrazione termine a termine. Risultato sempre elementare (Liouville)."
order: 42
level: intermedio
prereq:
  - "Tecniche di integrazione (sez. 41)"
  - "Polinomi, divisione euclidea, T.F. dell'algebra"
tools:
  - "Apostol — *Calculus*, vol. I, cap. 6"
---

# Integrazione di funzioni razionali

## Perché parlarne

Le **funzioni razionali** — quozienti di polinomi $P/Q$ — sono la più semplice classe non banale di funzioni elementari. Sono importanti perché:

1. Sono il punto di arrivo di molte sostituzioni (Weierstrass, $t = \sqrt[n]{ax+b}$).
2. **Si integrano sempre** in termini elementari: esiste un *algoritmo finito* (fratti semplici) che le riduce a logaritmi e arcotangenti.

## Algoritmo in 5 passi

1. **Divisione euclidea** se $\deg P \ge \deg Q$: $P = NQ + R$, quindi $P/Q = N + R/Q$. Integra $N$ direttamente.
2. **Fattorizza $Q$** su $\mathbb{R}$: prodotto di $(x-\alpha_i)^{m_i}$ e $(x^2 + b_j x + c_j)^{n_j}$ irriducibili.
3. **Decomponi** $R/Q$ in fratti semplici.
4. **Trova i coefficienti** (cover-up o sistema lineare).
5. **Integra** ogni pezzo (ln, potenze, arctan).

## Decomposizione in fratti semplici

**Teorema (esistenza e unicità).** $R/Q$ con $\deg R < \deg Q$ si scrive in modo unico come
$$\frac{R(x)}{Q(x)} = \sum_{i,k} \frac{A_{i,k}}{(x-\alpha_i)^k} + \sum_{j,l} \frac{B_{j,l} x + C_{j,l}}{(x^2 + b_j x + c_j)^l}.$$

> **Glossarietto:**
>
> - $\alpha_i$ = radice reale di $Q$ di molteplicità $m_i$.
> - $x^2+b_j x+c_j$ = fattore quadratico irriducibile ($b_j^2-4c_j<0$).
> - $A_{i,k}, B_{j,l}, C_{j,l} \in \mathbb{R}$ = coefficienti da determinare.

### Integrali base

- $\int \frac{A}{x-\alpha}\,dx = A\ln|x-\alpha|$.
- $\int \frac{A}{(x-\alpha)^k}\,dx = -\frac{A}{(k-1)(x-\alpha)^{k-1}}$, $k \ge 2$.
- $\int \frac{Bx+C}{x^2+bx+c}\,dx$ → completa il quadrato, spezza in $\ln$ + $\arctan$.

## Caso 1 — Radici reali distinte

**Esempio.** $\int \frac{dx}{x^2-1}$. $(x-1)(x+1)$:
$$\frac{1}{(x-1)(x+1)} = \frac{A}{x-1} + \frac{B}{x+1}.$$
**Cover-up:** $A = 1/(x+1)|_{x=1} = 1/2$; $B = 1/(x-1)|_{x=-1} = -1/2$.
$$\int \frac{dx}{x^2-1} = \frac{1}{2}\ln\left|\frac{x-1}{x+1}\right| + c.$$

## Caso 2 — Radici reali multiple

**Esempio.** $\int \frac{3x+5}{(x-1)^2(x+2)}\,dx$.
$$\frac{3x+5}{(x-1)^2(x+2)} = \frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{C}{x+2}.$$
$3x+5 = A(x-1)(x+2) + B(x+2) + C(x-1)^2$. $x=1$: $B=8/3$. $x=-2$: $C=-1/9$. Coef. $x^2$: $A=1/9$.

$$\int = \frac{1}{9}\ln|x-1| - \frac{8/3}{x-1} - \frac{1}{9}\ln|x+2| + c.$$

## Caso 3 — Fattore quadratico irriducibile

**Algoritmo:**

1. **Completa il quadrato:** $x^2+bx+c = (x+b/2)^2 + \gamma^2$, $u = x+b/2$.
2. **Spezza** $Bx+C = Bu + (C-B\,b/2)$.
3. **Integra:**
$$\int \frac{Bu}{u^2+\gamma^2}\,du = \frac{B}{2}\ln(u^2+\gamma^2), \quad \int \frac{C-Bb/2}{u^2+\gamma^2}\,du = \frac{C-Bb/2}{\gamma}\arctan\frac{u}{\gamma}.$$

**Esempio.** $\int \frac{x+3}{x^2+2x+5}\,dx$. $(x+1)^2+4$, $u=x+1$, $x+3 = u+2$:
$$\int \frac{u+2}{u^2+4}\,du = \frac{1}{2}\ln(x^2+2x+5) + \arctan\left(\frac{x+1}{2}\right) + c.$$

## Esempi

**1.** $\int \frac{2x-5}{x^2-x-6}\,dx$. $(x-3)(x+2)$. Cover-up: $A=1/5$, $B=9/5$.
$$= \frac{1}{5}\ln|x-3| + \frac{9}{5}\ln|x+2| + c.$$

**2.** $\int \frac{dx}{x^3+x} = \int \frac{dx}{x(x^2+1)}$. $A=1, B=-1, C=0$:
$$= \ln|x| - \frac{1}{2}\ln(x^2+1) + c.$$

**3.** $\int \frac{x^4}{x^2-1}\,dx$. Divisione: $x^4/(x^2-1) = x^2+1+1/(x^2-1)$.
$$= \frac{x^3}{3} + x + \frac{1}{2}\ln\left|\frac{x-1}{x+1}\right| + c.$$

## Esercizi

<details>
<summary>Esercizio 1 — Radici semplici</summary>

$\int \frac{dx}{x^4-1}$. $(x-1)(x+1)(x^2+1)$: $A=1/4, B=-1/4, C=0, D=-1/2$:
$$= \frac{1}{4}\ln\left|\frac{x-1}{x+1}\right| - \frac{1}{2}\arctan x + c. \qquad ∎$$
</details>

<details>
<summary>Esercizio 2 — Integrale definito con $\arctan$</summary>

$\int_0^1 \frac{dx}{x^2+x+1}$. $(x+1/2)^2+3/4$:
$$= \frac{2}{\sqrt 3}\left[\arctan(\sqrt 3) - \arctan(1/\sqrt 3)\right] = \frac{2}{\sqrt 3}\cdot \frac{\pi}{6} = \frac{\pi\sqrt 3}{9}. \qquad ∎$$
</details>

<details>
<summary>Esercizio 3 — Molteplicità + quadratico</summary>

$\int \frac{dx}{(x-1)^2(x^2+1)}$. $A=-1/2, B=1/2, C=1/2, D=0$:
$$= -\frac{1}{2}\ln|x-1| - \frac{1}{2(x-1)} + \frac{1}{4}\ln(x^2+1) + c. \qquad ∎$$
</details>

## Riassunto in una riga

L'integrazione razionale è un **algoritmo deterministico**: divisione → fattorizzazione → fratti semplici → integrazione termine a termine; radici reali producono $\ln$, complesse $\arctan$, molteplicità potenze — funziona **sempre** (Liouville, 1833).
