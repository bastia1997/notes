---
title: "Integrale di Riemann: definizione"
area: Integrali
summary: "La costruzione rigorosa dell'**integrale** come \"area sotto la curva\". Somme superiori/inferiori, criterio di integrabilità, integrabilità di funzioni continue e monotone, proprietà (linearità, monotonia, additività, teorema della media)."
order: 39
level: intermedio
prereq:
  - "Funzioni continue su compatti (sez. 25-26)"
  - "Sup/inf (sez. 07)"
tools:
  - "Rudin — *Principles*, cap. 6"
---

# Integrale di Riemann: definizione

## Motivazione

Il problema della **quadratura** (area di una regione curva) è antico — Archimede. Newton e Leibniz capirono che derivare e integrare sono inverse, ma in modo informale. **Riemann (1854)** diede la definizione rigorosa che ancora usiamo.

**Idea:** approssimare l'area sotto $f : [a, b] \to \mathbb{R}$ con **plurirettangoli** (somme di aree di rettangoli), poi raffinare finché l'errore svanisce.

## Partizioni e somme

**Definizione.** Una **partizione** di $[a, b]$ è una scelta finita di punti $a = x_0 < x_1 < \dots < x_n = b$.

**Sottointervalli:** $I_k = [x_{k-1}, x_k]$, con ampiezza $\Delta x_k = x_k - x_{k-1}$.

**Finezza:** $|D| = \max \Delta x_k$.

> **Glossarietto:**
>
> - $D$ (o $P$) = una **partizione** dell'intervallo $[a,b]$.
> - $n$ = numero di sottointervalli (varia con la partizione).
> - $\Delta x_k$ = larghezza del $k$-esimo rettangolo.
> - $|D|$ = **finezza** = larghezza del rettangolo più largo (più piccola, partizione più fine).
> - $m_k = \inf_{I_k} f$ = "altezza minima" di $f$ su $I_k$ (rettangolo inscritto).
> - $M_k = \sup_{I_k} f$ = "altezza massima" su $I_k$ (rettangolo circoscritto).

> Su ogni $I_k$ definiamo:
> - $m_k = \inf_{I_k} f$ (estremo inferiore di $f$ sull'intervallo).
> - $M_k = \sup_{I_k} f$.

**Somma inferiore:** $s(f, D) = \sum_{k=1}^n m_k \Delta x_k$ (rettangoli inscritti dal basso).

**Somma superiore:** $S(f, D) = \sum_{k=1}^n M_k \Delta x_k$ (rettangoli inscritti dall'alto).

> Sempre $s(f, D) \le S(f, D)$.

## Integrale superiore e inferiore

**Definizione.** Per $f$ limitata su $[a, b]$:
$$\underline{\int_a^b} f := \sup_D s(f, D), \qquad \overline{\int_a^b} f := \inf_D S(f, D).$$

Sempre $\underline{\int} \le \overline{\int}$.

**Definizione (integrabile).** $f$ è **Riemann-integrabile** su $[a, b]$ se $\underline{\int} = \overline{\int}$. Il valore comune è l'**integrale di Riemann**
$$\int_a^b f(x)\, dx.$$

## Criterio di integrabilità

**Teorema.** $f$ limitata è integrabile su $[a, b]$ $\iff$ $\forall \varepsilon > 0,\ \exists D$ con $S(f, D) - s(f, D) < \varepsilon$.

> **In parole:** posso stringere "il quanto so dall'alto" con "il quanto so dal basso" sotto qualunque tolleranza.

## Classi di funzioni integrabili

**Teorema.** Sono Riemann-integrabili su $[a, b]$:
1. Le **funzioni continue**.
2. Le **funzioni monotone**.
3. Le funzioni con un numero **finito** (o numerabile, in casi più raffinati) di discontinuità.

*Idea per le continue.* Heine-Cantor (cap. 26): continua su compatto ⇒ uniformemente continua. Per ogni $\varepsilon$ scegli $\delta$ uniforme, partizione con $|D| < \delta$: gli oscillazioni $M_k - m_k < \varepsilon/(b-a)$, da cui $S - s < \varepsilon$. ∎

## Proprietà fondamentali

1. **Linearità:** $\int(\alpha f + \beta g) = \alpha \int f + \beta \int g$.
2. **Monotonia:** $f \le g \Rightarrow \int f \le \int g$.
3. **Additività:** $\int_a^b f = \int_a^c f + \int_c^b f$ ($a < c < b$).
4. **Triangolare:** $|\int f| \le \int |f|$.
5. **Teorema della media:** se $f$ continua su $[a, b]$, esiste $c \in [a, b]$ con $\int_a^b f = f(c) (b - a)$.

> **Media:** $f(c)$ è il "valore medio" di $f$ su $[a, b]$.

## Esempi

**1.** $\int_0^1 x \, dx = 1/2$. Per partizione uniforme con $n$ intervalli: $s = (n-1)/(2n) \to 1/2$, $S = (n+1)/(2n) \to 1/2$.

**2.** $\int_a^b c\, dx = c(b - a)$ (costante).

**3.** Funzione di Dirichlet $\chi_\mathbb{Q}$ su $[0, 1]$: $m_k = 0$, $M_k = 1$ per ogni $D$. $\underline{\int} = 0 \ne 1 = \overline{\int}$. **NON Riemann-integrabile** (servirà Lebesgue, cap. 56).

## Esercizi

<details>
<summary>Esercizio 1 — Calcolo via somme di Riemann</summary>

$\int_0^1 x^2 dx = 1/3$ usando somma di Riemann con partizione uniforme.

**Soluzione.** $x_k = k/n$. Su $[x_{k-1}, x_k]$, $M_k = (k/n)^2$. $S_n = \sum_{k=1}^n (k/n)^2 \cdot 1/n = (1/n^3) \sum k^2 = (1/n^3) n(n+1)(2n+1)/6 \to 1/3$. ∎
</details>

<details>
<summary>Esercizio 2 — Integrale di funzione monotona</summary>

Mostra che ogni funzione monotona è integrabile.

**Soluzione (sketch).** Per partizione uniforme con $n$ intervalli: $S - s = \sum (M_k - m_k) \Delta x_k$. Per monotonia (es. crescente): $M_k - m_k = f(x_k) - f(x_{k-1})$. Sommando: $S - s = (f(b) - f(a)) \cdot (b - a)/n \to 0$. ∎
</details>

## Riassunto in una riga

L'**integrale di Riemann** è il valore comune di sup di somme inferiori e inf di somme superiori — esiste per le continue e le monotone (e poco altro) e gode di linearità, monotonia, additività; per casi più ampi (Dirichlet) serve Lebesgue.
