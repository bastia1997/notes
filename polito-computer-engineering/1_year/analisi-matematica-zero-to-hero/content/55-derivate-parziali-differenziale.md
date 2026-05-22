---
title: "Derivate parziali e differenziale in più variabili"
area: R^n
summary: "**Derivate parziali**, **gradiente** $\\nabla f$, derivata direzionale. **Differenziabilità** (esistenza di approssimazione lineare). Teorema del differenziale totale, catena, **Schwarz**, **Hessiana**, max/min liberi."
order: 55
level: avanzato
prereq:
  - "Topologia in $\\mathbb{R}^n$ (sez. 54)"
  - "Calcolo differenziale 1D (sez. 30-35)"
tools:
  - "Rudin — *Principles*, cap. 9"
---

# Derivate parziali e differenziale in $\mathbb{R}^n$

## Perché parlarne

Estendere il calcolo differenziale a $f: \mathbb{R}^n \to \mathbb{R}$. **Parziali, gradiente, differenziale, Hessiana** sono gli strumenti. La sorpresa: in più variabili, "derivabile" ≠ "differenziabile".

## Derivate parziali

**Definizione.** $f : A \subseteq \mathbb{R}^n \to \mathbb{R}$, $A$ aperto, $x_0 \in A$:
$$\frac{\partial f}{\partial x_i}(x_0) := \lim_{h\to 0} \frac{f(x_0 + h e_i) - f(x_0)}{h}.$$

> **Glossarietto:**
>
> - $e_i$ = $i$-esimo vettore della base canonica.
> - **Operativamente:** "congelo" tutte le variabili tranne $x_i$ e derivo in 1D.
> - Notazioni: $\partial_i f$, $f_{x_i}$.

**Esempio.** $f = x^2 yz + \sin(yz)$: $\partial_x = 2xyz$, $\partial_y = x^2 z + z\cos(yz)$, $\partial_z = x^2 y + y\cos(yz)$.

### Gradiente

$$\nabla f(x_0) := (\partial_1 f(x_0), \dots, \partial_n f(x_0)) \in \mathbb{R}^n.$$

### Derivata direzionale

$$D_v f(x_0) := \lim_{t\to 0}\frac{f(x_0 + tv) - f(x_0)}{t}.$$

> Per funzioni "regolari": $D_v f = \nabla f \cdot v$. **Ma non sempre** sotto sola esistenza delle parziali!

## Differenziabilità

**Definizione.** $f$ è **differenziabile** in $x_0$ se esiste applicazione lineare $L: \mathbb{R}^n \to \mathbb{R}$ tale che
$$f(x_0 + h) = f(x_0) + L(h) + o(\|h\|), \quad h \to 0.$$

$L = df(x_0)$ è il **differenziale**.

> **Glossarietto:**
>
> - $L$ = **approssimazione lineare** locale.
> - $o(\|h\|)$ = errore che tende a 0 più velocemente di $\|h\|$.

**Teorema.** Se $f$ differenziabile in $x_0$:
1. $f$ continua in $x_0$.
2. Tutte le parziali esistono e $L(h) = \nabla f(x_0) \cdot h$.
3. $D_v f(x_0) = \nabla f(x_0) \cdot v$ per ogni $v$.

*Dim. (2).* Con $h = te_i$: $\partial_i f(x_0) = L(e_i)$. Linearità: $L(h) = \sum L(e_i) h_i$. ∎

## Parziali ≠ differenziabilità (controesempio)

**Esempio.** $f(x,y) = xy/(x^2+y^2)$ con $f(0,0)=0$. Parziali in 0 esistono (entrambe nulle), ma $f$ **non è continua** in 0 (lungo $y=mx$, $f \to m/(1+m^2)$). Quindi **non differenziabile**.

> **Morale.** "Derivabile per direzioni" è **strettamente più debole** di "differenziabile". Errore tipico: confonderli.

## Teorema del differenziale totale

Condizione sufficiente operativa:

**Teorema.** Se le parziali $\partial_i f$ esistono in un intorno di $x_0$ e sono **continue** in $x_0$, allora $f$ è differenziabile in $x_0$.

*Dim. (per $n=2$).* Spezza $f(x_0+h) - f(x_0)$ in due passi, applica Lagrange 1D ad ognuno, ottieni
$$f(x_0+h) - f(x_0) = \partial_1 f(\xi_1, \cdot)h_1 + \partial_2 f(\cdot, \xi_2)h_2.$$
Per continuità delle parziali, $\partial_i f(\xi_i, \cdot) \to \partial_i f(x_0)$. ∎

> **Convenzione.** $f \in C^1(A)$ (parziali continue su $A$) ⇒ differenziabile ovunque.

## Piano tangente

Per $f: \mathbb{R}^2 \to \mathbb{R}$ differenziabile in $(x_0, y_0)$:
$$z = f(x_0, y_0) + \partial_x f(x_0,y_0)(x-x_0) + \partial_y f(x_0, y_0)(y-y_0).$$

Il differenziale **è** l'applicazione lineare il cui grafico è il piano tangente.

## Regola della catena

**Teorema (curva nella funzione).** $g: I \to \mathbb{R}^n$ derivabile, $f$ differenziabile in $g(t_0)$. Allora $F = f \circ g$:
$$F'(t_0) = \nabla f(g(t_0)) \cdot g'(t_0).$$

**Versione matriciale.** $g: \mathbb{R}^k \to \mathbb{R}^n$, $f: \mathbb{R}^n \to \mathbb{R}^m$:
$$J_{f\circ g}(u_0) = J_f(g(u_0)) \cdot J_g(u_0).$$

**Esempio.** $f = x^2+y^2$, $g(t) = (\cos t, \sin t)$. $F(t) = 1$, $F'=0$. Verifica: $\nabla f \cdot g' = 2(\cos t, \sin t) \cdot (-\sin t, \cos t) = 0$. ✓

## Teorema di Schwarz

**Teorema.** Se $\partial^2_{ij} f$ e $\partial^2_{ji} f$ esistono e sono continue in $x_0$, allora coincidono.

*Idea.* Differenza simmetrizzata $\Delta(h,k) = f(x_0+he_i+ke_j) - f(x_0+he_i) - f(x_0+ke_j) + f(x_0)$. Applicando Lagrange nei due ordini diversi: stesso limite. ∎

> $f \in C^2$ ⇒ Hessiana simmetrica.

**Controesempio (Peano).** $f(x,y) = xy(x^2-y^2)/(x^2+y^2)$ con $f(0,0)=0$: $\partial^2_{xy} f(0,0) = 1$, $\partial^2_{yx} f(0,0) = -1$. Schwarz fallisce (parziali seconde non continue).

## Hessiana e formula di Taylor

**Hessiana.** Per $f \in C^2$:
$$H_f(x_0) = (\partial^2_{ij} f(x_0))_{ij}.$$

Matrice $n\times n$ simmetrica.

**Taylor secondo ordine.**
$$f(x_0+h) = f(x_0) + \nabla f(x_0)\cdot h + \frac{1}{2} h^\top H_f(x_0) h + o(\|h\|^2).$$

## Massimi e minimi liberi

**Fermat.** $f$ differenziabile in $x_0$ interno, estremante locale ⇒ $\nabla f(x_0) = 0$ (**punto critico**).

**Test seconda derivata.** $x_0$ critico, $H = H_f(x_0)$:
- $H$ **definita positiva** (autovalori $>0$): **minimo** locale stretto.
- $H$ **definita negativa**: **massimo** locale stretto.
- Autovalori di segno **discorde**: **sella**.
- Semidefinita (autovalore 0): inconcludente.

### Criterio operativo $n=2$

$H = \begin{pmatrix} A & B \\ B & C\end{pmatrix}$, $\det H = AC - B^2$:

| $\det H$ | $A$ | Esito |
|---|---|---|
| $>0$ | $>0$ | minimo |
| $>0$ | $<0$ | massimo |
| $<0$ | — | sella |
| $=0$ | — | inconcludente |

### Esempio

$f = x^2 + 2y^2 - 2xy - 4x$. $\nabla f = (2x-2y-4, 4y-2x) = 0$ → $(4, 2)$. $H = \begin{pmatrix} 2 & -2 \\ -2 & 4\end{pmatrix}$, $\det = 4 > 0$, $A=2>0$: **minimo**. $f(4,2) = -8$.

## Esercizi

<details>
<summary>Esercizio 1 — Gradiente</summary>

$f = e^{xy}\sin z$. $\nabla f = e^{xy}(y\sin z, x\sin z, \cos z)$. ∎
</details>

<details>
<summary>Esercizio 2 — Parziali sì, differenz. no</summary>

$f(x,y) = \sqrt{|xy|}$. Parziali in 0 = 0. Lungo $y=x$: $f(x,x) = |x|$, rapporto incrementale $\|h\|$-normalizzato non tende a 0. **Non differenziabile**. ∎
</details>

<details>
<summary>Esercizio 3 — Classifica critici</summary>

$f = x^3 + y^3 - 3xy$. $\nabla = 0$ → $(0,0)$ e $(1,1)$. $H = \begin{pmatrix} 6x & -3 \\ -3 & 6y\end{pmatrix}$. $(0,0)$: $\det=-9$, sella. $(1,1)$: $\det=27>0$, $A=6>0$, minimo. ∎
</details>

<details>
<summary>Esercizio 4 — Differenziale per approx</summary>

$f = xe^y$, $\nabla f(1,0) = (1,1)$. $f(1.1, 0.05) \approx 1 + 0.1 + 0.05 = 1.15$ (valore esatto $\approx 1.156$). ∎
</details>

<details>
<summary>Esercizio 5 — Polari (catena)</summary>

$z = f(x,y)$, $x = r\cos\theta$, $y = r\sin\theta$:
$$\partial_r z = f_x \cos\theta + f_y \sin\theta, \quad \partial_\theta z = r(-f_x \sin\theta + f_y \cos\theta). \qquad ∎$$
</details>

<details>
<summary>Esercizio 6 — Derivata direzionale</summary>

$f = x^2 y - xy^2 + y$, $\nabla f(1,1) = (1, 0)$. $v = (3,4)/5$: $D_v f = 3/5$. ∎
</details>

## Riassunto in una riga

In $\mathbb{R}^n$ **parziali** ≠ **differenziabilità**: serve l'approssimazione lineare $f(x_0+h) = f(x_0)+\nabla f\cdot h+o(\|h\|)$; condizione sufficiente: **parziali continue** ($C^1$); **Schwarz** dà Hessiana simmetrica in $C^2$; max/min liberi via $\nabla f=0$ e segno autovalori di $H$.
