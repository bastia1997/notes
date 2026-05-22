---
title: "Tipi di discontinuità"
area: Continuità
summary: "I tre tipi di discontinuità isolate — **eliminabile** (limite esiste ma non è $f(x_0)$), **di salto** (limiti laterali diversi), **essenziale** (un limite non esiste o è $\\infty$). Le monotone hanno solo discontinuità di salto, e al più numerabili."
order: 27
level: intermedio
prereq:
  - "Continuità (sez. 24)"
  - "Limiti destro/sinistro (sez. 20)"
tools:
  - "Rudin — *Principles*, cap. 4"
---

# Tipi di discontinuità

## Classificazione classica (Dirichlet)

Sia $f : D \to \mathbb{R}$ e $x_0$ punto di accumulazione bilatero del dominio. Se $f$ non è continua in $x_0$, distinguiamo guardando i **limiti laterali**:
$$\ell^- = \lim_{x \to x_0^-} f(x), \qquad \ell^+ = \lim_{x \to x_0^+} f(x).$$

> **Glossarietto:**
>
> - $x \to x_0^-$ = $x$ si avvicina a $x_0$ **da sinistra** (valori più piccoli).
> - $x \to x_0^+$ = $x$ si avvicina a $x_0$ **da destra** (valori più grandi).
> - $\ell^-$ = **limite sinistro**; $\ell^+$ = **limite destro**.
> - $f(x_0)$ = il valore di $f$ nel punto stesso (può differire dai limiti).
> - Continuità $\iff \ell^- = \ell^+ = f(x_0)$.

I casi:

1. **Eliminabile (rimovibile):** $\ell^-, \ell^+$ esistono finiti e $\ell^- = \ell^+ =: \ell$, ma $\ell \ne f(x_0)$ (o $x_0 \notin D$). Ridefinendo $f(x_0) = \ell$, $f$ diventa continua.

2. **Di salto (prima specie):** $\ell^-, \ell^+$ esistono finiti ma $\ell^- \ne \ell^+$. Il **salto** è $\ell^+ - \ell^-$.

3. **Essenziale (seconda specie):** almeno uno dei limiti laterali non esiste o è infinito.

## 1. Eliminabile

**Esempio canonico.** $f(x) = (x^2 - 1)/(x - 1)$ in $x_0 = 1$. Dominio: $\mathbb{R} \setminus \{1\}$.

Per $x \ne 1$: $f(x) = (x-1)(x+1)/(x-1) = x + 1$. Quindi $\lim_{x \to 1} f = 2$. Si estende a $\tilde f(1) = 2$ continua.

**Altro classico:** $\sin x / x$ in 0. Limite notevole $= 1$. La funzione **sinc** è $\sin x / x$ estesa con sinc$(0) = 1$.

## 2. Di salto (prima specie)

**Esempi:**
- $\text{sgn}(x)$ in 0: $\ell^- = -1$, $\ell^+ = +1$, salto $= 2$.
- $\lfloor x \rfloor$ in ogni $n \in \mathbb{Z}$: $\ell^- = n - 1$, $\ell^+ = n$, salto $= 1$.
- **Heaviside** $H(x) = 0$ se $x < 0$, $1$ se $x \ge 0$: salto $= 1$.

## 3. Essenziale (seconda specie)

**Esempio 1 (limite infinito):** $f(x) = 1/x$ in 0. $\ell^\pm = \pm \infty$.

**Esempio 2 (oscillazione):** $f(x) = \sin(1/x)$ in 0. Limiti laterali NON esistono (la funzione oscilla in $[-1, 1]$ infinitamente velocemente).

## Funzioni monotone: solo discontinuità di salto

**Teorema.** Se $f : (a, b) \to \mathbb{R}$ è monotona, allora ha al massimo discontinuità di **prima specie** (di salto), e queste sono **al più numerabili**.

*Idea.* I limiti laterali esistono sempre per le monotone (cap. 13, conseguenza). Quindi nessuna discontinuità essenziale. Numerabilità: ad ogni salto si associa un intervallo $(\ell^-, \ell^+)$ disgiunto dagli altri; nei reali ci stanno solo numerabilmente molti disgiunti.

## Esercizi

<details>
<summary>Esercizio 1 — Classificare</summary>

Classifica le discontinuità di:
(a) $f(x) = \frac{\sin x}{x}$ in 0;
(b) $f(x) = \lfloor x \rfloor$ in $x = 3$;
(c) $f(x) = \frac{1}{x^2}$ in 0.

**Soluzione.**
(a) **Eliminabile** ($\lim = 1$).
(b) **Di salto** ($\ell^- = 2$, $\ell^+ = 3 = f(3)$, salto 1).
(c) **Essenziale** ($\lim_{x \to 0} 1/x^2 = +\infty$, non finito).
</details>

<details>
<summary>Esercizio 2 — Funzione con tante discontinuità di salto</summary>

Costruisci una funzione monotona con infinite discontinuità.

**Soluzione.** $f(x) = \sum_{n: 1/n < x} 1/n^2$. Cresce di $1/n^2$ in ogni $1/n$. Continua altrove, salti in $\{1/n\}$. Salti sommano a $\pi^2/6$ (finito).
</details>

## Riassunto in una riga

Tre tipi di discontinuità isolate: **eliminabile** (limite esiste, $\ne f(x_0)$), **di salto** ($\ell^- \ne \ell^+$ finiti), **essenziale** (almeno un limite manca o è $\infty$) — le monotone hanno **solo** salti, e in numero al più numerabile.
