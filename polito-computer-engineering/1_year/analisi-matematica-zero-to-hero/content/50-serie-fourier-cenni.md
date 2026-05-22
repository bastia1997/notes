---
title: "Serie di Fourier: introduzione"
area: Serie
summary: "Decomporre **funzioni periodiche** in armoniche $\\{1, \\cos nx, \\sin nx\\}$. Coefficienti, convergenza (Dirichlet, $L^2$), **Parseval**, fenomeno di **Gibbs**. La porta dell'analisi armonica."
order: 50
level: avanzato
prereq:
  - "Serie numeriche e integrali (sez. 45-49)"
  - "Trigonometriche, esponenziale complesso"
tools:
  - "Stein-Shakarchi — *Fourier Analysis*"
---

# Serie di Fourier

## Perché parlarne

Nelle sezioni 48-49 abbiamo decomposto le funzioni analitiche in **potenze** $\{1, x, x^2, \dots\}$. Per le **funzioni periodiche** questa base è inadatta: $x^n$ non è periodica. Serve una base fatta di funzioni periodiche.

Nel 1822 **Fourier**, studiando la propagazione del calore, intuì che ogni funzione periodica può essere scritta come somma (potenzialmente infinita) di **seni e coseni**. Oggi è il pilastro di analisi armonica, EDP, signal processing, meccanica quantistica, JPEG, MP3.

## Polinomi trigonometrici

**Definizione.** Un **polinomio trigonometrico** di grado $N$:
$$P(x) = \frac{a_0}{2} + \sum_{n=1}^N \big( a_n \cos(nx) + b_n \sin(nx) \big).$$

In forma complessa:
$$P(x) = \sum_{n=-N}^N c_n e^{inx}, \quad c_n = (a_n - ib_n)/2.$$

> **Glossarietto:**
>
> - $a_n, b_n \in \mathbb{R}$ = coefficienti reali.
> - $c_n \in \mathbb{C}$ = coefficienti complessi.
> - **Normalizzazione** $a_0/2$: pura convenzione per uniformare formule.

## Ortogonalità

**Lemma (forma reale).** Per $n, m \ge 1$:
$$\int_{-\pi}^\pi \cos(nx)\cos(mx)\,dx = \pi\delta_{nm}, \quad \int \sin(nx)\sin(mx) = \pi\delta_{nm},$$
$$\int \cos(nx)\sin(mx) = 0, \quad \int 1\,dx = 2\pi.$$

**Lemma (forma complessa).** $\int_{-\pi}^\pi e^{inx}\overline{e^{imx}}\,dx = 2\pi\delta_{nm}$.

> Il sistema $\{1, \cos nx, \sin nx\}$ è **ortogonale**. Equivalentemente $\{e^{inx}\}_{n\in\mathbb{Z}}$ è ortogonale con norma $\sqrt{2\pi}$.

## Coefficienti di Fourier

**Definizione.** Per $f$ $2\pi$-periodica integrabile:
$$a_n = \frac{1}{\pi}\int_{-\pi}^\pi f(x)\cos(nx)\,dx, \quad b_n = \frac{1}{\pi}\int f(x)\sin(nx)\,dx.$$

**Forma complessa:**
$$c_n = \frac{1}{2\pi}\int_{-\pi}^\pi f(x)\,e^{-inx}\,dx.$$

**Serie di Fourier:**
$$S_f(x) := \frac{a_0}{2} + \sum_{n=1}^\infty [a_n \cos(nx) + b_n \sin(nx)] = \sum_{n=-\infty}^{\infty} c_n e^{inx}.$$

> **Motivazione (formale).** Se $f = \frac{a_0}{2} + \sum a_n\cos(nx) + b_n\sin(nx)$, integrando termine a termine contro $\cos(mx)$ per ortogonalità sopravvive solo $a_m \pi$.

## Parità

- $f$ **pari**: $b_n = 0$ (solo coseni).
- $f$ **dispari**: $a_n = 0$ (solo seni).
- Media nulla: $a_0 = 0$.

## Esempi cardine

### Onda quadra (dispari)

$f(x) = \text{sgn}(x)$ su $(-\pi,\pi)$. Dispari, $a_n = 0$:
$$b_n = \frac{2(1-(-1)^n)}{n\pi} = \begin{cases} 4/(n\pi) & n \text{ dispari} \\ 0 & n \text{ pari} \end{cases}$$
$$S_f(x) = \frac{4}{\pi}\sum_{k=0}^\infty \frac{\sin((2k+1)x)}{2k+1}.$$

**In $x = \pi/2$:** $1 = (4/\pi)(1 - 1/3 + 1/5 - \dots)$ ⇒ **$\pi/4 = \sum (-1)^k/(2k+1)$** (Leibniz).

### Dente di sega (dispari)

$f(x) = x$ su $(-\pi, \pi)$. $b_n = 2(-1)^{n+1}/n$:
$$S_f(x) = 2\sum_{n=1}^\infty \frac{(-1)^{n+1}}{n}\sin(nx).$$

### Onda triangolare (pari)

$f(x) = |x|$. $a_0 = \pi$, $a_n = -4/(\pi n^2)$ per $n$ dispari:
$$S_f(x) = \frac{\pi}{2} - \frac{4}{\pi}\sum_{k=0}^\infty \frac{\cos((2k+1)x)}{(2k+1)^2}.$$

> **Regola euristica.** Più $f$ è regolare, più velocemente decadono i coefficienti: salti → $1/n$, $C^0$ ma con angoli → $1/n^2$, $C^k$ periodica → $1/n^{k+1}$.

## Convergenza puntuale (Dirichlet, 1829)

**Definizione.** $f$ **regolare a tratti** se esiste partizione finita di $[-\pi,\pi]$ su cui $f, f'$ continue, con limiti laterali finiti.

**Teorema (Dirichlet).** $f$ $2\pi$-periodica, regolare a tratti. Allora per ogni $x$:
$$\lim_{N\to\infty} S_N f(x) = \frac{f(x^+) + f(x^-)}{2}.$$

Nei punti di continuità: $S_N f(x) \to f(x)$.

> **Sketch.** Si scrive $S_N f(x) = \frac{1}{2\pi}\int f(t) D_N(x-t)\,dt$ con **nucleo di Dirichlet** $D_N(u) = \sin((N+1/2)u)/\sin(u/2)$; lemma di Riemann-Lebesgue per concludere.

**Attenzione.** Esistono funzioni continue la cui serie di Fourier **diverge** in qualche punto (Du Bois-Reymond, 1873). La sola continuità **non basta**.

## Convergenza in $L^2$

**Spazio.** $L^2(-\pi,\pi)$: funzioni a quadrato integrabile, prodotto $\langle f,g\rangle = \int f\bar g$, norma $\|f\|_2$.

**Teorema.** $\{e^{inx}/\sqrt{2\pi}\}_{n\in\mathbb{Z}}$ è **base ortonormale** di $L^2$. Per ogni $f \in L^2$:
$$\|S_N f - f\|_2 \to 0.$$

> **Interpretazione.** $S_N f$ è la proiezione ortogonale di $f$ sul sottospazio finito, e dunque la **migliore approssimazione** in norma $L^2$.

## Identità di Parseval

**Teorema.** Per $f \in L^2(-\pi,\pi)$:
$$\sum_{n=-\infty}^\infty |c_n|^2 = \frac{1}{2\pi}\int_{-\pi}^\pi |f(x)|^2\,dx.$$

Forma reale:
$$\frac{a_0^2}{4} + \frac{1}{2}\sum_{n=1}^\infty (a_n^2 + b_n^2) = \frac{1}{2\pi}\int |f|^2.$$

> **Idea.** Pitagora in $L^2$ con base ortonormale.

### Applicazioni numeriche (gioielli)

**Dal dente di sega.** $\|f\|^2 = 2\pi^3/3$, $b_n^2 = 4/n^2$: Parseval dà
$$\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6} \quad \text{(problema di Basilea!)}.$$

**Dall'onda triangolare.** $\sum 1/(2k+1)^4 = \pi^4/96$, da cui $\sum 1/n^4 = \pi^4/90$.

## Fenomeno di Gibbs

Anche con $S_N f \to f$ ovunque, vicino a un salto $S_N f$ **non si avvicina monotonamente**: oscilla con un **picco persistente di circa il 9%** dell'altezza del salto, che non scompare aumentando $N$.

Costante di Gibbs:
$$G = \frac{1}{\pi}\int_0^\pi \frac{\sin t}{t}\,dt - \frac{1}{2} \approx 0.0895.$$

> **Conseguenza pratica.** Le somme tronche $S_N f$ non sono ideali per segnali con discontinuità: si usano **finestre** (Fejér, Hann) o **wavelet**.

## Applicazioni

### Equazione del calore

$u_t = u_{xx}$ con $u(0,t) = u(\pi,t) = 0$, $u(x,0) = f(x)$. Separazione variabili: $u_n = \sin(nx)e^{-n^2 t}$, soluzione
$$u(x,t) = \sum b_n e^{-n^2 t}\sin(nx).$$

Le alte frequenze decadono per prime: **il calore liscia**.

### Compressione JPEG/MP3

JPEG: blocchi $8\times 8$ → DCT → quantizzazione delle alte frequenze (occhio insensibile). MP3: analisi spettrale + mascheramento psicoacustico. **Senza Fourier, niente Spotify**.

## Esercizi

<details>
<summary>Esercizio 1 — Basilea</summary>

Da Parseval su $f(x)=x$ (dente di sega): $\|f\|^2 = 2\pi^3/3$, $b_n^2 = 4/n^2$:
$$\frac{1}{2}\sum 4/n^2 = \pi^2/3 \Rightarrow \sum 1/n^2 = \pi^2/6. \qquad ∎$$
</details>

<details>
<summary>Esercizio 2 — $\pi/8$ da onda quadra</summary>

Parseval su onda quadra: $\|f\|^2 = 2\pi$, $b_n^2 = 16/(n\pi)^2$ ($n$ dispari):
$$\sum 1/(2k+1)^2 = \pi^2/8. \qquad ∎$$
</details>

<details>
<summary>Esercizio 3 — Derivazione termine a termine</summary>

$f$ continua $2\pi$-periodica $C^1$ a tratti con $f(-\pi)=f(\pi)$: coefficienti di $f'$ sono $\hat c_n = in c_n$.

*Dim.* Per parti, bordo nullo (periodicità). Conseguenza: $f \in C^k$ → $|c_n| = O(1/n^k)$. ∎
</details>

<details>
<summary>Esercizio 4 — Equazione del calore esplicita</summary>

$u_t = u_{xx}$ su $(0,\pi)$, $u=0$ ai bordi, $u(x,0) = \sin x + 3\sin(4x)$:
$$u(x,t) = e^{-t}\sin x + 3 e^{-16 t}\sin(4x).$$
Il modo 4 decade 16 volte più velocemente. ∎
</details>

## Riassunto in una riga

Le **serie di Fourier** decompongono funzioni $2\pi$-periodiche nella base ortogonale $\{e^{inx}\}$; **Dirichlet** dà convergenza puntuale a $(f^+ +f^-)/2$ per regolari a tratti, **$L^2$** è il framework naturale (Pitagora ⇒ **Parseval** $\sum|c_n|^2 = \|f\|^2/(2\pi)$), **Gibbs** è l'overshoot ~9% ai salti — base di EDP, signal processing, JPEG/MP3.
