---
title: "EDO del primo ordine"
area: EDO
summary: "$y' = f(x,y)$. **Variabili separabili** (decadimento, logistica). **Lineari** con **fattore integrante** $\\mu = e^{\\int a}$. Cenni a Bernoulli, equazioni esatte, campi di direzioni."
order: 51
level: intermedio
prereq:
  - "Calcolo differenziale (sez. 30-35)"
  - "Integrazione (sez. 40-43)"
tools:
  - "Pagani-Salsa — *Analisi 2*, cap. 1"
  - "Arnol'd — *Equazioni differenziali ordinarie*"
---

# EDO del primo ordine

## Perché parlarne

Una **EDO** (equazione differenziale ordinaria) lega una funzione incognita $y(x)$ alle sue derivate. Forma generale di ordine $n$: $F(x, y, y', \dots, y^{(n)}) = 0$. **In forma normale**: $y^{(n)} = G(x, y, \dots, y^{(n-1)})$.

Qui ci limitiamo all'ordine 1: $y' = f(x, y)$.

Le EDO modellano **tutto ciò che cambia nel tempo**: decadimento, crescita, circuiti, dinamiche di popolazioni, pendoli.

## Definizioni

**Soluzione.** $\varphi : I \to \mathbb{R}$ derivabile su intervallo $I$, con $\varphi'(x) = f(x, \varphi(x))$.

> **Glossarietto:**
>
> - **Soluzione generale:** famiglia $y = \varphi(x; C)$ con $C$ parametro.
> - **Soluzione particolare:** fissata da condizione iniziale $y(x_0) = y_0$.
> - **Soluzioni singolari:** non ottenibili da $C$, vanno cercate a parte.

## Interpretazione geometrica: campo di direzioni

$y' = f(x,y)$ assegna a ogni $(x,y)$ una **pendenza** $f(x,y)$. Disegnando piccoli segmenti di pendenza $f$ → **campo di direzioni**. Una soluzione è una curva tangente in ogni punto.

**Isocline:** curve $f(x,y) = k$, dove tutte le soluzioni hanno la stessa pendenza.

## EDO a variabili separabili

**Forma.** $y' = g(x)\,h(y)$.

**Algoritmo:** dove $h(y) \ne 0$, separa formalmente:
$$\frac{dy}{h(y)} = g(x)\,dx \Rightarrow \int \frac{dy}{h(y)} = \int g(x)\,dx + C.$$

Detta $H$ primitiva di $1/h$ e $G$ di $g$: $H(y) = G(x) + C$, invertibile in $y = H^{-1}(G(x)+C)$.

> **Soluzioni costanti.** Se $h(y_0) = 0$, allora $y \equiv y_0$ è soluzione. La separazione (che divide per $h$) la perde: va aggiunta a mano.

### Esempio 1 — Decadimento radioattivo

$N'(t) = -\lambda N(t)$, $\lambda > 0$. Separabile: $dN/N = -\lambda\,dt$:
$$N(t) = N_0 e^{-\lambda t}.$$

Tempo di dimezzamento: $t_{1/2} = \ln 2/\lambda$.

### Esempio 2 — Logistica (Verhulst)

$y' = r y(1 - y/K)$, $r, K > 0$. Soluzioni costanti $y = 0, K$. Per $0<y<K$:
$$\frac{dy}{y(1-y/K)} = r\,dx.$$
Fratti semplici: $1/y + (1/K)/(1-y/K)$. Integrando e invertendo:
$$y(x) = \frac{K}{1 + Be^{-rx}}, \quad B = (K-y_0)/y_0.$$

$y \to K$ per $x \to \infty$ (capacità portante).

### Esempio 3 — Caduta con attrito

$v' = g - \alpha v$. Separabile (e anche lineare): $v(t) = g/\alpha + Ce^{-\alpha t}$. **Velocità limite:** $g/\alpha$.

## EDO lineari del primo ordine

**Forma.** $y' + a(x) y = b(x)$, con $a, b$ continue.

- **Omogenea** se $b \equiv 0$.
- **Completa** altrimenti.

### Caso omogeneo

$y' + a(x) y = 0$ è separabile:
$$y(x) = C e^{-A(x)}, \quad A(x) = \int a(x)\,dx.$$

> Spazio vettoriale 1-dimensionale di soluzioni.

### Fattore integrante (caso completo)

Cerchiamo $\mu(x) > 0$ tale che $\mu y' + \mu a y = (\mu y)'$. Ciò richiede $\mu' = \mu a$, ovvero
$$\mu(x) = e^{A(x)}.$$

Allora l'equazione diventa
$$(e^{A(x)} y)' = e^{A(x)} b(x).$$

Integrando:
$$\boxed{y(x) = e^{-A(x)}\left[C + \int e^{A(x)} b(x)\,dx\right].}$$

> **Glossarietto:**
>
> - $\mu = e^{\int a}$ = **fattore integrante**.
> - $y_{\text{gen}} = y_{\text{om}} + y_{\text{part}}$ (sottospazio + traslazione).

### Esempio 4 — $y' + y = e^x$

$a = 1$, $\mu = e^x$. $(e^x y)' = e^{2x}$, $e^x y = e^{2x}/2 + C$:
$$y = \frac{1}{2} e^x + C e^{-x}.$$

### Esempio 5 — $xy' - 2y = x^3$ ($x>0$)

Forma normale: $y' - (2/x)y = x^2$. $\mu = x^{-2}$. $(x^{-2} y)' = 1$, $x^{-2} y = x + C$:
$$y = x^3 + Cx^2.$$

### Esempio 6 — Circuito RC

$RC\,v'(t) + v(t) = V(t)$. Con $V$ costante: $v(t) = V + (v(0) - V) e^{-t/RC}$. Transitorio esponenziale verso il regime $V$.

## Equazione di Bernoulli

**Forma.** $y' + a(x) y = b(x) y^\alpha$, $\alpha \ne 0, 1$.

**Sostituzione** $z = y^{1-\alpha}$ → lineare in $z$:
$$z' = (1-\alpha)[b(x) - a(x) z].$$

La logistica è il caso $\alpha = 2$.

## Equazioni esatte (cenno)

$M(x,y)\,dx + N(x,y)\,dy = 0$ è **esatta** se esiste $F$ con $F_x = M$, $F_y = N$. Allora soluzioni: $F(x,y) = C$.

**Condizione:** $M_y = N_x$ (su aperti semplicemente connessi).

## Riepilogo metodi

| Forma | Metodo |
|---|---|
| $y' = g(x) h(y)$ | separa e integra |
| $y' + a(x) y = b(x)$ | $\mu = e^{\int a}$ |
| $y' + ay = by^\alpha$ | $z = y^{1-\alpha}$ (Bernoulli) |
| $M\,dx + N\,dy = 0$ con $M_y = N_x$ | $F$ tale che $F_x = M, F_y = N$ |

## Esercizi

<details>
<summary>Esercizio 1 — Separabile con blow-up</summary>

$y' = xy^2$, $y(0) = 1$. Separabile: $-1/y = x^2/2 + C$. $y(0)=1$ → $C=-1$. $y = 2/(2-x^2)$. **Blow-up** in $\pm\sqrt 2$. ∎
</details>

<details>
<summary>Esercizio 2 — Lineare</summary>

$y' - 2xy = x$. $\mu = e^{-x^2}$. $(e^{-x^2} y)' = xe^{-x^2}$, $e^{-x^2}y = -e^{-x^2}/2 + C$:
$$y = -1/2 + Ce^{x^2}. \qquad ∎$$
</details>

<details>
<summary>Esercizio 3 — Logistica numerica</summary>

$r=1$, $K=10$, $y(0)=2$. $B=4$, $y(x) = 10/(1+4e^{-x})$. $y(2) \approx 10/(1+0.541) \approx 6.49$. ∎
</details>

<details>
<summary>Esercizio 4 — Bernoulli</summary>

$y' + y = y^3$. $z = y^{-2}$: $z' - 2z = -2$. $\mu = e^{-2x}$: $z = 1 + Ce^{2x}$. $y = \pm 1/\sqrt{1+Ce^{2x}}$. ∎
</details>

<details>
<summary>Esercizio 5 — Non-unicità (Cauchy fallisce)</summary>

$y' = \sqrt{|y|}$, $y(0)=0$. Due soluzioni: $y \equiv 0$ e $y = x^2/4$ ($x \ge 0$). **Infinite soluzioni miste**. $f$ non lipschitziana in 0: unicità fallisce. ∎
</details>

## Riassunto in una riga

Per EDO del primo ordine ci sono due metodi base: **separazione** $\int dy/h = \int g\,dx$ per $y' = gh$, e **fattore integrante** $\mu = e^{\int a}$ per le lineari $y'+ay = b$ — Bernoulli e esatte si riducono ai precedenti; ricorda le **soluzioni costanti** quando $h$ si annulla.
