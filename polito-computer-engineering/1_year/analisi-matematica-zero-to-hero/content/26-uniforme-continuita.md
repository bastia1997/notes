---
title: "Uniforme continuità, Heine, lipschitzianità"
area: Continuità
summary: "La **continuità uniforme** — stessa $\\delta$ per tutti i punti, non solo \"una $\\delta$ per ogni punto\". Lo scambio dell'ordine dei quantificatori produce una nozione **strettamente più forte**. Teorema di Heine-Cantor (compatto ⇒ uniforme), lipschitziane e hölderiane."
order: 26
level: intermedio
prereq:
  - "Continuità (sez. 24)"
  - "Weierstrass su compatti (sez. 25)"
tools:
  - "Rudin — *Principles*, cap. 4"
---

# Uniforme continuità, Heine, lipschitzianità

## L'ordine dei quantificatori è tutto

La continuità di $f$ su $A$ si scrive:
$$\forall x_0 \in A,\ \forall \varepsilon > 0,\ \exists \delta > 0 : \forall x \in A,\ |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon.$$

Qui $\delta$ può dipendere **sia da $\varepsilon$ sia da $x_0$**. Se chiediamo che $\delta$ dipenda **solo da $\varepsilon$** (non dal punto), otteniamo una nozione **strettamente più forte**.

**Definizione.** $f : A \to \mathbb{R}$ è **uniformemente continua** su $A$ se:
$$\forall \varepsilon > 0,\ \exists \delta > 0 : \forall x, y \in A,\ |x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon.$$

> **Glossarietto della formula:**
>
> - $\forall x, y \in A$: si parla di due punti qualunque del dominio (non più un punto fissato $x_0$).
> - **Stesso $\delta$ per ogni coppia.** Il $\delta$ è "uniforme" — non cambia da punto a punto.
>
> **Differenza con la continuità (cap. 24):** $\forall x_0$ viene **prima** di $\exists \delta$ nella continuità (quindi $\delta$ dipende da $x_0$); nella uniforme $\forall x, y$ viene **dopo** $\exists \delta$.

### Negazione (utile per controesempi)

$f$ **non** è uniformemente continua su $A$ se:
$$\exists \varepsilon_0 > 0,\ \forall \delta > 0,\ \exists x_\delta, y_\delta \in A : |x_\delta - y_\delta| < \delta\ \land\ |f(x_\delta) - f(y_\delta)| \ge \varepsilon_0.$$

Operativamente: trova due successioni $(x_n), (y_n) \subseteq A$ con $|x_n - y_n| \to 0$ ma $|f(x_n) - f(y_n)| \not\to 0$.

## Esempio: $x^2$ su $\mathbb{R}$ — continua ma NON uniformemente

$f(x) = x^2$ è continua su $\mathbb{R}$. Non è uniformemente continua.

*Dim.* Scelgo $x_n = n$, $y_n = n + 1/n$. Allora $|x_n - y_n| = 1/n \to 0$, ma:
$$|f(y_n) - f(x_n)| = (n + 1/n)^2 - n^2 = 2 + 1/n^2 \ge 2.$$
Con $\varepsilon_0 = 2$, nessun $\delta$ uniforme funziona. ∎

> **Interpretazione:** all'infinito la pendenza di $x^2$ diverge. Per mantenere la stessa oscillazione $\varepsilon$ in uscita serve $\delta$ sempre più piccolo, dipendente dal punto.

## Teorema di Heine-Cantor

> **Teorema (Heine-Cantor).** Se $f : K \to \mathbb{R}$ è continua su un compatto $K$, allora $f$ è uniformemente continua su $K$.

**Conseguenza pratica:** su un intervallo chiuso e limitato $[a, b]$, **continua ⇒ uniformemente continua**. Diventano lo stesso concetto.

*Dim. (per assurdo).* Supponi $f$ continua su $K$ compatto ma non uniformemente continua. Allora $\exists \varepsilon_0 > 0$ e successioni $(x_n), (y_n) \subseteq K$ con $|x_n - y_n| < 1/n$ e $|f(x_n) - f(y_n)| \ge \varepsilon_0$.

$K$ compatto → per Bolzano-Weierstrass, $x_{n_k} \to x^* \in K$. Poiché $|y_{n_k} - x_{n_k}| < 1/n_k \to 0$, anche $y_{n_k} \to x^*$.

Per continuità di $f$ (Heine): $f(x_{n_k}) \to f(x^*)$ e $f(y_{n_k}) \to f(x^*)$. Quindi $|f(x_{n_k}) - f(y_{n_k})| \to 0$. Ma per ipotesi $\ge \varepsilon_0$. Contraddizione. ∎

## Funzioni lipschitziane

**Definizione.** $f : A \to \mathbb{R}$ è **lipschitziana** (con costante $L$) se
$$|f(x) - f(y)| \le L |x - y| \quad \forall x, y \in A.$$

> **Glossarietto:** $L \ge 0$ è la **costante di Lipschitz**. Limita la "pendenza" tra due punti qualunque del grafico.

**Proprietà.** Lipschitziana ⇒ uniformemente continua (basta $\delta = \varepsilon/L$). Più forte della uniforme.

**Esempi:**
- $\sin x, \cos x$ sono lipschitziane con $L = 1$ (dalle formule di prostaferesi).
- $|x|$ è lipschitziana con $L = 1$.
- $\sqrt x$ su $[0, 1]$ NON è lipschitziana (pendenza esplode in 0), ma è uniformemente continua.

## Funzioni hölderiane

**Definizione.** $f$ è **hölderiana di esponente $\alpha \in (0, 1]$** se
$$|f(x) - f(y)| \le C |x - y|^\alpha.$$

Per $\alpha = 1$ è lipschitziana. Per $\alpha < 1$ è una versione "debole" (es. $\sqrt x$ è $1/2$-hölderiana su $[0, 1]$).

**Gerarchia:**
$$\text{lipschitziana} \subset \text{hölderiana} \subset \text{uniformemente continua} \subset \text{continua}.$$

## Esempi di funzioni uniformemente continue

- **Su intervalli compatti:** ogni continua (per Heine-Cantor).
- **$\sin x$ su tutto $\mathbb{R}$:** lipschitziana con $L = 1$.
- **$\sqrt x$ su $[0, +\infty)$:** uniformemente continua ($1/2$-hölderiana globalmente).

## Esempi che NON sono uniformemente continue

- **$x^2$ su $\mathbb{R}$** (visto sopra).
- **$1/x$ su $(0, 1]$** (oscillazioni vicino a 0 esplodono).
- **$\sin(1/x)$ su $(0, 1]$.

## Esercizi

<details>
<summary>Esercizio 1 — Funzione lipschitziana</summary>

Mostra che $f(x) = \sin x$ è lipschitziana su $\mathbb{R}$ con $L = 1$.

**Soluzione.** Per la formula di prostaferesi:
$$|\sin x - \sin y| = \left|2 \sin\frac{x-y}{2} \cos\frac{x+y}{2}\right| \le 2 \left|\sin\frac{x-y}{2}\right| \le 2 \cdot \frac{|x - y|}{2} = |x - y|.$$
∎
</details>

<details>
<summary>Esercizio 2 — Continua ma non uniforme su intervallo aperto</summary>

$f(x) = 1/x$ su $(0, 1]$.

**Soluzione.** $x_n = 1/n$, $y_n = 1/(n+1)$. $|x_n - y_n| = 1/(n(n+1)) \to 0$. Ma $|f(x_n) - f(y_n)| = |n - (n+1)| = 1$. Non uniforme. ∎
</details>

<details>
<summary>Esercizio 3 — $\sqrt x$ su $[0, +\infty)$</summary>

Mostra che $\sqrt x$ è uniformemente continua su $[0, +\infty)$.

**Soluzione (cenno).** Si usa che $|\sqrt x - \sqrt y| \le \sqrt{|x - y|}$ (verifica algebrica). Quindi $\delta = \varepsilon^2$. ∎
</details>

<details>
<summary>Esercizio 4 — Heine-Cantor "all'opera"</summary>

Mostra che $\sin(x^2)$ è uniformemente continua su $[0, 10]$.

**Soluzione.** $[0, 10]$ è compatto. $\sin(x^2)$ è continua (composizione di continue). Per Heine-Cantor, uniformemente continua. ∎

(Su $[0, +\infty)$ NON è uniformemente continua: stesso argomento di $x^2$.)
</details>

## Riassunto in una riga

**Continuità uniforme** = stessa $\delta$ per tutti i punti del dominio (non punto per punto) — strettamente più forte della continuità, ma coincidente con essa sui **compatti** (teorema di Heine-Cantor).
