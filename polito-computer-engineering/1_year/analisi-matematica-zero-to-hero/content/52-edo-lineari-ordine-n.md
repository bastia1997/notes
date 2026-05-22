---
title: "EDO lineari di ordine $n$ a coefficienti costanti"
area: EDO
summary: "Omogenea: **polinomio caratteristico**, struttura della soluzione (radici reali distinte, multiple, complesse). Completa: **coefficienti indeterminati**, **variazione delle costanti**, **risonanza**. Wronskiano."
order: 52
level: intermedio
prereq:
  - "EDO del primo ordine (sez. 51)"
  - "Dipendenza lineare, basi"
  - "Numeri complessi, Eulero"
tools:
  - "Pagani-Salsa — *Analisi 2*"
---

# EDO lineari di ordine $n$

## Perché parlarne

Una **EDO lineare di ordine $n$**:
$$L[y] := y^{(n)} + a_{n-1}(x) y^{(n-1)} + \dots + a_0(x) y = b(x).$$

$L$ è **operatore lineare**: $L[\alpha y_1 + \beta y_2] = \alpha L[y_1] + \beta L[y_2]$. Tutto il problema vive nell'**algebra lineare**.

**Principio di sovrapposizione.** Soluzioni di $L[y] = b$ formano il **sottospazio affine** $y_{\text{part}} + \ker L$.

Assumiamo $a_i \in \mathbb{R}$ **costanti**.

## Spazio delle soluzioni

**Teorema.** $\ker L$ ha **dimensione $n$** su $\mathbb{R}$.

**Wronskiano.** Per $y_1, \dots, y_n$:
$$W(y_1,\dots,y_n)(x) = \det\begin{pmatrix} y_1 & \cdots & y_n \\ y_1' & \cdots & y_n' \\ \vdots & & \vdots \\ y_1^{(n-1)} & \cdots & y_n^{(n-1)}\end{pmatrix}.$$

> **Glossarietto:**
>
> - $W(x_0) \ne 0$ per qualche $x_0$ ⇒ **sistema fondamentale** (base di $\ker L$).
> - Per soluzioni di $L[y]=0$: $W \equiv 0$ oppure $W \ne 0$ ovunque (Abel).

## Equazione omogenea — polinomio caratteristico

Cerchiamo $y = e^{\lambda x}$:
$$e^{\lambda x}(\lambda^n + a_{n-1}\lambda^{n-1} + \dots + a_0) = 0.$$

**Polinomio caratteristico:** $p(\lambda) = \lambda^n + a_{n-1}\lambda^{n-1} + \dots + a_0$.

Per il T.F. dell'algebra: $p$ ha $n$ radici in $\mathbb{C}$ (con molteplicità).

### Caso 1 — Radici reali distinte

$\lambda_1, \dots, \lambda_n$ distinte. Base: $\{e^{\lambda_i x}\}$. Wronskiano = Vandermonde × $e^{\sum\lambda_i x} \ne 0$.

$$y(x) = c_1 e^{\lambda_1 x} + \dots + c_n e^{\lambda_n x}.$$

### Caso 2 — Radici reali multiple

$\lambda_0$ di molteplicità $m$: contribuiscono
$$e^{\lambda_0 x},\ x e^{\lambda_0 x},\ x^2 e^{\lambda_0 x},\ \dots,\ x^{m-1} e^{\lambda_0 x}.$$

*Idea della dim.* Regola di traslazione $P(D)(e^{\lambda x}\varphi) = e^{\lambda x} P(D+\lambda)\varphi$. Per $\lambda = \lambda_0$ e $\varphi = x^k$ con $k<m$: $P(D+\lambda_0) x^k = 0$ perché $p(\lambda_0+\mu) = \mu^m q(\lambda_0+\mu)$. ∎

### Caso 3 — Radici complesse coniugate

Se $\lambda = \alpha + i\beta$ è radice ($\beta \ne 0$), anche $\bar\lambda = \alpha - i\beta$. Combinando:
$$e^{\alpha x}\cos(\beta x), \quad e^{\alpha x}\sin(\beta x).$$

Con molteplicità $m$: moltiplicare per $1, x, \dots, x^{m-1}$.

### Esempi

| Equazione | $p(\lambda)$ | Radici | Soluzione generale |
|---|---|---|---|
| $y'' + y = 0$ | $\lambda^2+1$ | $\pm i$ | $c_1 \cos x + c_2 \sin x$ |
| $y'' - 3y' + 2y = 0$ | $(\lambda-1)(\lambda-2)$ | $1, 2$ | $c_1 e^x + c_2 e^{2x}$ |
| $y'' - 2y' + y = 0$ | $(\lambda-1)^2$ | $1$ doppia | $(c_1 + c_2 x)e^x$ |
| $y''' - y = 0$ | $(\lambda-1)(\lambda^2+\lambda+1)$ | $1, -1/2 \pm i\sqrt 3/2$ | $c_1 e^x + e^{-x/2}(c_2 \cos + c_3 \sin)$ |
| $y^{(4)} + 2y'' + y = 0$ | $(\lambda^2+1)^2$ | $\pm i$ doppie | $(c_1+c_3 x)\cos x + (c_2+c_4 x)\sin x$ |

## Equazione completa $L[y] = b(x)$

Struttura: $y_{\text{gen}} = y_{\text{om}} + y_{\text{part}}$.

### Coefficienti indeterminati

Per $b$ "speciale" (polinomio × esponenziale × $\sin/\cos$):

| Forzante $b(x)$ | Ansatz $y_p$ |
|---|---|
| $P_k(x)$ | $Q_k(x)$ |
| $e^{\mu x} P_k(x)$ | $e^{\mu x} Q_k(x)$ |
| $\sin(\omega x), \cos(\omega x)$ | $A\cos\omega x + B\sin\omega x$ |
| $e^{\mu x}(P_k \cos + R_k \sin)$ | $e^{\mu x}(Q_k \cos + S_k \sin)$ |

> **Risonanza.** Se $\mu$ è radice di $p$ di molteplicità $m$, l'ansatz va moltiplicato per $x^m$.

### Esempio — Oscillatore forzato

$y'' + \omega_0^2 y = F_0 \cos(\omega x)$.

**Non risonante** ($\omega \ne \omega_0$). Ansatz $y_p = A\cos\omega x + B\sin\omega x$:
$$A = \frac{F_0}{\omega_0^2 - \omega^2}, \quad B = 0.$$
Ampiezza diverge per $\omega \to \omega_0$.

**Risonante** ($\omega = \omega_0$). $i\omega_0$ è radice di $p$, $m=1$. Ansatz $y_p = x(A\cos + B\sin)$:
$$y_p = \frac{F_0}{2\omega_0} x \sin(\omega_0 x).$$
**Ampiezza cresce linearmente** — risonanza pura.

### Variazione delle costanti (Lagrange)

Per **qualsiasi** $b(x)$ continuo. Per $n=2$: base $\{y_1, y_2\}$, cerco $y_p = u_1(x) y_1 + u_2(x) y_2$ con vincolo $u_1' y_1 + u_2' y_2 = 0$.

**Sistema:**
$$\begin{pmatrix} y_1 & y_2 \\ y_1' & y_2' \end{pmatrix}\begin{pmatrix} u_1' \\ u_2' \end{pmatrix} = \begin{pmatrix} 0 \\ b \end{pmatrix}.$$

Per Cramer (det = $W$):
$$u_1' = -\frac{y_2 b}{W}, \quad u_2' = \frac{y_1 b}{W}.$$

Integrare per ottenere $u_1, u_2$.

### Esempio — Variazione: $y'' + y = 1/\cos x$

Base: $\{\cos x, \sin x\}$, $W = 1$.
$$u_1' = -\tan x \Rightarrow u_1 = \ln|\cos x|, \quad u_2' = 1 \Rightarrow u_2 = x.$$
$$y_p = \cos x \ln|\cos x| + x \sin x.$$

## Problema di Cauchy

Per ordine $n$: $n$ condizioni iniziali $y(x_0), y'(x_0), \dots, y^{(n-1)}(x_0)$. Fissano univocamente $c_1, \dots, c_n$ (matrice di sistema = Wronskiano).

**Esempio.** $y'' - y = 0$, $y(0)=1$, $y'(0)=0$. $y = c_1 e^x + c_2 e^{-x}$ con $c_1=c_2=1/2$: $y = \cosh x$.

## Esercizi

<details>
<summary>Esercizio 1 — Radici reali distinte</summary>

$y'' - 5y' + 6y = 0$. $p = (\lambda-2)(\lambda-3)$: $y = c_1 e^{2x} + c_2 e^{3x}$. ∎
</details>

<details>
<summary>Esercizio 2 — Radici complesse</summary>

$y'' + 4y' + 13y = 0$. $\lambda = -2 \pm 3i$: $y = e^{-2x}(c_1\cos 3x + c_2\sin 3x)$. ∎
</details>

<details>
<summary>Esercizio 3 — Risonanza doppia</summary>

$y'' - 2y' + y = 6e^x$, $y(0)=y'(0)=0$. $(\lambda-1)^2$, $\mu=1$ molteplicità 2. Ansatz $Ax^2 e^x$ → $A=3$: $y_p = 3x^2 e^x$. Con condizioni iniziali: $y = 3x^2 e^x$. ∎
</details>

<details>
<summary>Esercizio 4 — Oscillatore smorzato</summary>

$y'' + 2y' + 2y = 0$, $y(0)=1, y'(0)=0$. $\lambda = -1\pm i$: $y = e^{-x}(\cos x + \sin x) \to 0$. ∎
</details>

<details>
<summary>Esercizio 5 — Variazione delle costanti</summary>

$y'' + y = \sec x$: $y_p = \cos x \ln|\cos x| + x\sin x$. ∎
</details>

## Riassunto in una riga

Per EDO lineari a coefficienti costanti, l'**omogenea** si risolve col **polinomio caratteristico** (esponenziali, con $x^k$ per molteplicità, e $\sin/\cos$ per radici complesse); la **completa** col metodo dei **coefficienti indeterminati** (forzanti speciali, attenzione alla risonanza) o **variazione delle costanti** (sempre applicabile via Wronskiano).
