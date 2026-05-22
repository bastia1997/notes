---
title: "Problema di Cauchy, esistenza e unicità"
area: EDO
summary: "Problema di Cauchy = PVI. **Picard-Lindelöf** (Cauchy-Lipschitz) via contrazione + iterazione. **Peano** (sola continuità). Controesempio $y' = \\sqrt{|y|}$. Prolungabilità, **Gronwall**, dipendenza continua."
order: 53
level: avanzato
prereq:
  - "EDO del primo ordine (sez. 51)"
  - "Spazi metrici, completezza"
  - "Convergenza uniforme"
tools:
  - "Pagani-Salsa — *Analisi 2*"
---

# Problema di Cauchy

## Perché parlarne

Dato $\Omega \subseteq \mathbb{R}^2$ aperto, $f: \Omega \to \mathbb{R}$ continua, $(x_0, y_0) \in \Omega$, il **problema di Cauchy (PVI)**:
$$\begin{cases} \varphi'(x) = f(x, \varphi(x)) \\ \varphi(x_0) = y_0. \end{cases}$$

> **Glossarietto:**
>
> - **PVI** = problema ai valori iniziali.
> - $(x_0, y_0)$ = **dato iniziale**.

Tre domande:
1. **Esistenza** (almeno una soluzione)?
2. **Unicità**?
3. **Prolungabilità** (fino a dove)?

## Riformulazione integrale

$\varphi$ è soluzione del PVI $\iff$
$$\varphi(x) = y_0 + \int_{x_0}^x f(t, \varphi(t))\,dt.$$

*Dim.* ($\Rightarrow$) Integra. ($\Leftarrow$) TFC dà $\varphi' = f$, e $\varphi(x_0)=y_0$. ∎

> Trasferisce il problema da $C^1$ a $C^0$: dominio naturale delle **contrazioni** in Banach.

## Teorema di Cauchy-Lipschitz (Picard-Lindelöf)

**Definizione.** $f$ **localmente lipschitziana in $y$**: per ogni $(x_0,y_0)$ esiste intorno $U$ e $L \ge 0$ con
$$|f(x,y_1) - f(x,y_2)| \le L |y_1 - y_2| \quad \forall (x,y_i)\in U.$$

> $\partial f/\partial y$ continua ⇒ localmente Lipschitz (Lagrange in $y$).

**Teorema.** $f$ continua su $R = [x_0-a, x_0+a]\times[y_0-b, y_0+b]$, $|f| \le M$, Lipschitz in $y$ con costante $L$. Posto $h = \min\{a, b/M\}$, il PVI ha **unica** soluzione $\varphi \in C^1([x_0-h, x_0+h])$.

*Dim. (schema).*

1. **Spazio:** $X = \{\varphi \in C^0([x_0-h, x_0+h]): \varphi(x_0)=y_0, |\varphi-y_0|\le b\}$, completo in $\|\cdot\|_\infty$.

2. **Operatore di Picard:** $(T\varphi)(x) = y_0 + \int_{x_0}^x f(t,\varphi(t))\,dt$. Ben definito ($T\varphi \in X$): $|(T\varphi) - y_0| \le Mh \le b$.

3. **Iterata contrattiva:** $|(T^n\varphi_1 - T^n\varphi_2)(x)| \le \frac{(L|x-x_0|)^n}{n!}\|\varphi_1 - \varphi_2\|_\infty$. Per $n$ grande contrattiva.

4. **Banach-Caccioppoli:** unico punto fisso $\varphi^* = T\varphi^*$, che è l'unica soluzione del PVI. ∎

### Iterazione di Picard

Costruzione esplicita: $\varphi_0(x) \equiv y_0$,
$$\varphi_{n+1}(x) = y_0 + \int_{x_0}^x f(t, \varphi_n(t))\,dt.$$
$\varphi_n \to \varphi^*$ uniformemente.

**Esempio.** $y' = y$, $y(0)=1$:
- $\varphi_0 = 1$
- $\varphi_1 = 1 + x$
- $\varphi_2 = 1 + x + x^2/2$
- $\varphi_n = \sum_{k=0}^n x^k/k! \to e^x$.

Ottieni **gratis** lo sviluppo di Taylor di $e^x$.

## Teorema di Peano

**Teorema.** $f \in C^0(\Omega)$. Per ogni $(x_0,y_0)$ esiste $h>0$ e una soluzione $\varphi \in C^1([x_0-h, x_0+h])$.

> Sola continuità → esistenza, non unicità. Dimostrazione via Ascoli-Arzelà su spezzate di Eulero.

## Controesempio all'unicità

$y' = \sqrt{|y|}$, $y(0)=0$. $f(y) = \sqrt{|y|}$ continua ma **non Lipschitz** in 0 ($1/\sqrt y \to \infty$).

**Soluzioni:**
- $\varphi \equiv 0$.
- $\varphi(x) = x^2/4$ ($x \ge 0$).
- Per ogni $a \ge 0$: $\varphi_a \equiv 0$ su $[0,a]$, poi $(x-a)^2/4$. **Infinite soluzioni**.

> **Morale.** Continuità non basta. La lipschitzianità impedisce le biforcazioni.

## Prolungabilità

Soluzioni locali si incollano in **soluzione massimale** su intervallo aperto $(\alpha, \beta)$.

**Teorema (fuga dai compatti).** Se $\beta < +\infty$, la soluzione esce da ogni compatto $K \subset \Omega$ per $x \to \beta^-$.

**Esempio (blow-up).** $y' = y^2$, $y(0)=1$: $y(x) = 1/(1-x)$, massimale su $(-\infty, 1)$. Blow-up in 1.

**Soluzioni globali.** Lineari $y' = a(x) y + b(x)$ con $a,b$ continue su $I$: globali su $I$ (no blow-up). Più in generale, crescita sublineare in $y$ + Gronwall.

## Lemma di Gronwall

**Lemma (forma integrale).** $u: [a,b] \to \mathbb{R}$ continua, $u \ge 0$. Se $u(x) \le C + L\int_a^x u(t)\,dt$, allora
$$u(x) \le C\,e^{L(x-a)}.$$

*Dim.* $v(x) = C + L\int_a^x u$. $v' = Lu \le Lv$, $v(a)=C$. $(ve^{-Lx})' \le 0$, $v \le C e^{L(x-a)}$, $u \le v$. ∎

## Dipendenza continua dai dati

**Teorema.** $f$ Lipschitz in $y$. Due soluzioni $\varphi, \psi$ con dati $y_0, \tilde y_0$:
$$|\varphi(x) - \psi(x)| \le |y_0 - \tilde y_0|\,e^{L|x-x_0|}.$$

(Conseguenza diretta di Gronwall.)

## Esercizi

<details>
<summary>Esercizio 1 — Picard per $e^{x^2}$</summary>

$y' = 2xy$, $y(0)=1$. $\varphi_n(x) = \sum_{k=0}^n x^{2k}/k! \to e^{x^2}$. ∎
</details>

<details>
<summary>Esercizio 2 — Blow-up</summary>

$y' = y^2$, $y(0)=1$. $y = 1/(1-x)$, massimale su $(-\infty, 1)$. ∎
</details>

<details>
<summary>Esercizio 3 — Quando unicità</summary>

$y' = y^\alpha$, $y(0)=0$. Unicità $\iff \alpha \ge 1$ ($f$ Lipschitz). Per $0<\alpha<1$: $y \equiv 0$ e $y = ((1-\alpha)x)^{1/(1-\alpha)}$ entrambi soluzioni. ∎
</details>

<details>
<summary>Esercizio 4 — Gronwall</summary>

$y' = y\sin(xy)$, $y(0)=y_0$. $|y'| \le |y|$. Gronwall: $|y(x)| \le |y_0|\,e^x$. **Esistenza globale**. ∎
</details>

<details>
<summary>Esercizio 5 — Iterazione Picard</summary>

$y' = x+y$, $y(0)=0$: $\varphi_3 = x^2/2 + x^3/6 + x^4/24$. Limite: $e^x - 1 - x$. ∎
</details>

## Riassunto in una riga

Il **PVI** equivale all'equazione integrale; **Cauchy-Lipschitz** dà esistenza e unicità locale via contrazione di Picard (lipschitzianità in $y$ essenziale); **Peano** garantisce sola esistenza con sola continuità; $y'=\sqrt{|y|}$ è il controesempio; soluzioni massimali "fuggono dai compatti"; **Gronwall** è lo strumento universale per stime e dipendenza continua.
