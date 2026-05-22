---
title: "Teorema fondamentale del calcolo integrale"
area: Integrali
summary: "Il **ponte** tra derivata e integrale. **TFC-I:** la funzione integrale ha per derivata l'integranda. **TFC-II (Newton-Leibniz):** $\\int_a^b f = F(b) - F(a)$. Tabella degli integrali immediati."
order: 40
level: intermedio
prereq:
  - "Integrale di Riemann (sez. 39)"
  - "Teorema della media integrale (sez. 39)"
tools:
  - "Rudin — *Principles*, cap. 6"
---

# Teorema fondamentale del calcolo integrale

## Perché parlarne

L'integrale di Riemann è costruito come **area** (limite di somme). La derivata è una **velocità di variazione** (limite di rapporti incrementali). Apparentemente nessun rapporto. Ma Newton (1666) e Leibniz (1675) scoprirono indipendentemente che le due operazioni sono **inverse**.

Questo è il **Teorema Fondamentale del Calcolo (TFC)**, l'asse dell'analisi del XVII secolo. Si presenta in due forme:

- **TFC-I (derivata della funzione integrale):** $\dfrac{d}{dx}\int_a^x f(t)\,dt = f(x)$.
- **TFC-II (Newton-Leibniz):** $\int_a^b f(x)\,dx = F(b) - F(a)$, dove $F' = f$.

## La funzione integrale

**Definizione.** Sia $f \in \mathcal{R}([a,b])$ (Riemann-integrabile). La **funzione integrale** di $f$ con punto base $a$ è
$$F(x) := \int_a^x f(t)\,dt, \qquad x \in [a,b].$$

> **Glossarietto:**
>
> - $\int_a^x f(t)\,dt$ = area orientata sotto $f$ tra $a$ e $x$.
> - $t$ = variabile **muta** di integrazione (non conta il nome).
> - $x$ = variabile della funzione $F$.
> - Convenzione: $F(a) = 0$.

**Proposizione (continuità).** Se $|f| \le K$, $F$ è $K$-lipschitziana, in particolare continua.

*Dim.* $|F(x') - F(x)| = |\int_x^{x'} f|\le K|x'-x|$. ∎

## TFC parte I

**Teorema (TFC-I).** $f \in \mathcal{R}([a,b])$, $F(x) = \int_a^x f$. Se $f$ è **continua in $x_0$**, allora $F$ è derivabile in $x_0$ e
$$F'(x_0) = f(x_0).$$

In particolare, se $f \in C([a,b])$, $F \in C^1$ con $F' = f$.

*Dimostrazione.* Rapporto incrementale:
$$\frac{F(x_0+h)-F(x_0)}{h} = \frac{1}{h}\int_{x_0}^{x_0+h} f(t)\,dt.$$
Sottraendo $f(x_0) = \frac{1}{h}\int_{x_0}^{x_0+h} f(x_0)\,dt$:
$$\frac{F(x_0+h)-F(x_0)}{h} - f(x_0) = \frac{1}{h}\int_{x_0}^{x_0+h}[f(t)-f(x_0)]\,dt.$$
Per continuità, $|f(t)-f(x_0)|<\varepsilon$ per $|h|<\delta$; il modulo del membro destro è $\le \varepsilon$. Quindi tende a 0. ∎

## Primitive e integrale indefinito

**Definizione.** $G$ è **primitiva** (o antiderivata) di $f$ su $I$ se $G' = f$ ovunque su $I$.

**Proposizione.** Due primitive di $f$ su un intervallo differiscono per una costante.

*Dim.* $H = G_1 - G_2$ ha $H' = 0$ → $H$ costante per Lagrange. ∎

**Notazione.** L'**integrale indefinito**:
$$\int f(x)\,dx = G(x) + c, \quad c \in \mathbb{R}.$$

Famiglia di tutte le primitive; $c$ è la **costante di integrazione**.

**Corollario.** Se $f \in C([a,b])$, $f$ ammette primitiva (la funzione integrale).

## TFC parte II (Newton-Leibniz)

**Teorema (TFC-II).** $f \in \mathcal{R}([a,b])$ con primitiva $G$. Allora
$$\int_a^b f(x)\,dx = G(b) - G(a) =: [G(x)]_a^b.$$

*Dimostrazione.* Partizione $D$. Telescopica: $G(b) - G(a) = \sum [G(x_k)-G(x_{k-1})]$. Per Lagrange su $[x_{k-1},x_k]$: $G(x_k)-G(x_{k-1}) = G'(\xi_k)\Delta x_k = f(\xi_k)\Delta x_k$. Quindi
$$s(D,f) \le \sum f(\xi_k)\Delta x_k = G(b)-G(a) \le S(D,f).$$
Passando a sup/inf e usando l'integrabilità: $G(b)-G(a) = \int_a^b f$. ∎

## Tabella degli integrali immediati

| $f(x)$ | $\int f(x)\,dx$ |
|---|---|
| $x^\alpha$, $\alpha \ne -1$ | $\dfrac{x^{\alpha+1}}{\alpha+1}$ |
| $1/x$ | $\ln |x|$ |
| $e^x$ | $e^x$ |
| $a^x$, $a>0$, $a \ne 1$ | $a^x/\ln a$ |
| $\sin x$ | $-\cos x$ |
| $\cos x$ | $\sin x$ |
| $1/\cos^2 x$ | $\tan x$ |
| $1/\sqrt{1-x^2}$ | $\arcsin x$ |
| $1/(1+x^2)$ | $\arctan x$ |
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |

> Conoscerle a memoria è essenziale: ogni tecnica di integrazione mira a ricondurre l'integranda a queste forme.

## Esempi

**1.** $\int_0^\pi \sin x\,dx = [-\cos x]_0^\pi = -(-1) - (-1) = 2$.

**2.** $\int_1^e \frac{dx}{x} = [\ln x]_1^e = 1$.

**3.** $\int_0^1 x^n\,dx = 1/(n+1)$.

**4.** Funzione $G(x) = \int_0^x e^{-t^2}\,dt$ (errore, a meno di costanti): non esprimibile con funzioni elementari, ma per TFC-I $G \in C^1$ con $G'(x) = e^{-x^2}$.

## Esercizi

<details>
<summary>Esercizio 1 — Derivata di funzione integrale</summary>

$F(x) = \int_0^x \sin(t^2)\,dt$. Calcola $F', F''$.

**Soluzione.** Per TFC-I, $F'(x) = \sin(x^2)$. Catena: $F''(x) = 2x \cos(x^2)$. ∎
</details>

<details>
<summary>Esercizio 2 — Estremi variabili</summary>

$H(x) = \int_x^{x^2} e^{-t^2}\,dt$. Calcola $H'$.

**Soluzione.** $H(x) = \int_0^{x^2} - \int_0^x$, quindi $H'(x) = e^{-x^4}\cdot 2x - e^{-x^2}$. ∎
</details>

<details>
<summary>Esercizio 3 — Calcolo diretto</summary>

$\int_0^2 (3x^2 - 2x + 1)\,dx = [x^3 - x^2 + x]_0^2 = 8 - 4 + 2 = 6$. ∎
</details>

## Riassunto in una riga

Il **TFC** afferma che derivata e integrale sono inverse: **parte I** dice che $F(x) = \int_a^x f$ ha derivata $f$ (per $f$ continua); **parte II** (Newton-Leibniz) calcola $\int_a^b f = F(b) - F(a)$ con qualunque primitiva $F$.
