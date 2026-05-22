---
title: "Oltre Riemann: Lebesgue, Banach, Hilbert"
area: Approfondimenti
summary: "Limiti di Riemann e funzione di Dirichlet. **Lebesgue** (misura del codominio). Spazi $L^p$ e **Banach**. Spazi di **Hilbert**, ortogonalità, basi ortonormali, **Parseval**, **Riesz**. Perché serve."
order: 56
level: avanzato
prereq:
  - "Integrazione di Riemann (sez. 39-43)"
  - "Topologia in $\\mathbb{R}^n$ (sez. 54)"
tools:
  - "Rudin — *Real and Complex Analysis*"
  - "Brezis — *Functional Analysis*"
---

# Oltre Riemann: Lebesgue, Banach, Hilbert

## Perché parlarne

Panorama: perché Riemann **non basta**, cosa offre **Lebesgue**, e i due edifici dell'analisi funzionale (**Banach**, **Hilbert**). Nessuna dim. completa: definizioni, enunciati, ragioni.

## I limiti di Riemann

**Difetto 1 — Funzioni "ragionevoli" non integrabili.**

Funzione di Dirichlet:
$$D(x) = \begin{cases} 1 & x \in \mathbb{Q} \\ 0 & x \notin \mathbb{Q}.\end{cases}$$
Su ogni intervallino $\sup D=1, \inf D=0$: somme superiori/inferiori non si avvicinano. **Non Riemann-integrabile**. Eppure i razionali sono "trascurabili" → dovrebbe essere 0.

**Difetto 2 — Scambio limite-integrale fragile.**

$f_n \to f$ puntualmente, $f_n$ R-integrabili: $f$ può non esserlo, o $\int f_n \not\to \int f$. Serve convergenza uniforme (spesso non si ha).

**Difetto 3 — $\mathcal{R}([0,1])$ non completo.**

Successioni di Cauchy in norma $L^1$ senza limite in $\mathcal{R}$. Devastante per analisi funzionale.

> **Diagnosi.** Riemann partiziona il **dominio** ($x$). Per $f$ patologiche serve partizionare il **codominio** ($y$).

## L'idea di Lebesgue (1902)

Inversione: per $f \ge 0$,
1. Partiziona il **codominio**: $y_k = k\delta$.
2. Misura $m(\{x: y_k \le f(x) < y_{k+1}\})$.
3. Somma $y_k \cdot m(\cdot)$ e fai $\delta \to 0$.

> **Passo chiave:** definire la **misura** di un insieme arbitrario.

## Misura di Lebesgue (sguardo)

**Misura esterna.** $m^*(E) := \inf\{\sum (b_k - a_k) : E \subseteq \bigcup (a_k, b_k)\}$.

> **Glossarietto:**
>
> - $m^*([a,b]) = b-a$.
> - Insiemi **numerabili** hanno misura zero ($m^*(\mathbb Q) = 0$).
> - $m^*$ subadditiva ma non additiva su tutti i sottoinsiemi.

**Carathéodory.** $E$ è **misurabile** se $m^*(A) = m^*(A\cap E) + m^*(A\setminus E)$ per ogni $A$.

La famiglia $\mathcal{M}$ degli insiemi misurabili è $\sigma$-algebra (chiusa per unioni/intersezioni numerabili, complementare). Su $\mathcal{M}$, $m$ è **$\sigma$-additiva**:
$$m\Bigl(\bigsqcup_k E_k\Bigr) = \sum_k m(E_k).$$

Tutti gli aperti/chiusi/Borel sono misurabili. (Insiemi non misurabili esistono con l'assioma della scelta — es. Vitali.)

## Integrale di Lebesgue

**Passo 1 — Semplici:** $\varphi = \sum \alpha_k \mathbf{1}_{E_k}$, $\int \varphi\,dm := \sum \alpha_k m(E_k)$.

**Passo 2 — Positive:** $\int f\,dm = \sup\{\int \varphi : 0\le \varphi \le f, \varphi \text{ semplice}\}$.

**Passo 3 — Segno qualunque:** $f = f^+ - f^-$, $\int f = \int f^+ - \int f^-$ (se entrambi finiti, $f \in L^1$).

**Dirichlet.** $D = \mathbf{1}_{\mathbb{Q}\cap[0,1]}$: $m(\mathbb{Q}\cap[0,1]) = 0$, $\int D = 0$. ∎

## Teoremi di convergenza

**Convergenza monotona (Beppo Levi).** $0 \le f_n \nearrow f$ q.o. ⇒ $\int f_n \nearrow \int f$.

**Lemma di Fatou.** $f_n \ge 0$: $\int \liminf f_n \le \liminf \int f_n$.

**Convergenza dominata (Lebesgue).** $f_n \to f$ q.o., $|f_n| \le g \in L^1$ ⇒ $\int f_n \to \int f$.

> **Importanza.** Pane di MQ, EDP, probabilità. Senza Lebesgue niente serie di Fourier in $L^2$, niente MQ rigorosa.

## Spazi di Banach

**Definizione.** Spazio vettoriale normato e **completo**.

**Esempi.**
- $(\mathbb{R}^n, \|\cdot\|_2)$.
- $(C^0([a,b]), \|\cdot\|_\infty)$.
- $(L^p, \|\cdot\|_p)$ con $\|f\|_p = (\int |f|^p)^{1/p}$, $1 \le p < \infty$.
- $L^\infty$: ess-sup.
- $\ell^p$: successioni $p$-sommabili.

**Hölder.** $1/p + 1/q = 1$: $\int |fg| \le \|f\|_p \|g\|_q$.

**Minkowski.** $\|f+g\|_p \le \|f\|_p + \|g\|_p$.

**Teorema (Riesz-Fischer).** $L^p$ è **completo**.

> Senza Lebesgue, $L^p$ non sarebbe completo: l'analisi funzionale crollerebbe.

## Spazi di Hilbert

**Definizione.** Banach con **prodotto scalare** sesquilineare, hermitiano, definito positivo, tale che $\|x\| = \sqrt{\langle x,x\rangle}$.

**Esempi canonici:**
- $\mathbb{R}^n, \mathbb{C}^n$.
- $\ell^2$: $\langle x,y\rangle = \sum \overline{x_k} y_k$.
- $L^2(\Omega)$: $\langle f,g\rangle = \int \overline f g\,dm$.

> Tutti gli Hilbert separabili infinito-dim sono **isomorfi a $\ell^2$**.

### Proiezione

**Teorema.** $C \subset H$ convesso chiuso non vuoto. Per ogni $x$ esiste unico $p \in C$ che minimizza $\|x-y\|$: $P_C(x)$.

Per $C$ sottospazio chiuso: $P_C$ lineare e $x - P_C(x) \perp C$.

### Basi ortonormali

$\{e_n\}$ **ortonormale**: $\langle e_i, e_j\rangle = \delta_{ij}$. **Base ortonormale** (completa): span denso.

**Coefficienti di Fourier:** $\hat x_n = \langle e_n, x\rangle$, $x = \sum \hat x_n e_n$.

**Bessel:** $\sum |\hat x_n|^2 \le \|x\|^2$.

**Parseval (base completa):** $\sum |\hat x_n|^2 = \|x\|^2$.

**Esempio.** $L^2([-\pi,\pi])$ con $\{e^{inx}/\sqrt{2\pi}\}$: Fourier $f = \sum c_n e^{inx}$, Parseval $\int |f|^2 = 2\pi \sum |c_n|^2$.

### Teorema di Riesz

**Teorema.** $H$ Hilbert, $\ell: H \to \mathbb{C}$ lineare continuo. Esiste unico $y \in H$:
$$\ell(x) = \langle y, x\rangle, \quad \|\ell\| = \|y\|.$$

> **Duale di Hilbert ≅ Hilbert.** Base di MQ, EDP variazionali, distribuzioni.

## Perché tutto questo conta

- **MQ.** Stati = vettori unitari in Hilbert. Osservabili = operatori autoaggiunti.
- **EDP variazionali.** Spazi di Sobolev $H^1, H^2$ (Hilbert) + Riesz/Lax-Milgram → esistenza/unicità.
- **Probabilità.** Variabili aleatorie = funzioni misurabili. Speranza = integrale di Lebesgue.
- **Signal processing.** Fourier $L^2 \to L^2$ è isomorfismo di Hilbert (Plancherel).
- **Machine learning.** Kernel methods → RKHS (Hilbert con kernel riproducente).

## Esercizi concettuali

<details>
<summary>Esercizio 1 — Misura di $\mathbb Q$</summary>

$\mathbb Q \cap [0,1]$ numerabile $\{q_k\}$. Copri $(q_k - \varepsilon/2^{k+1}, q_k + \varepsilon/2^{k+1})$: somma lunghezze $= \varepsilon$. Quindi $m^*(\mathbb Q \cap [0,1]) = 0$. ∎
</details>

<details>
<summary>Esercizio 2 — Hölder per $p=q=2$</summary>

$\int |fg| \le \|f\|_2 \|g\|_2$ (Cauchy-Schwarz integrale). ∎
</details>

<details>
<summary>Esercizio 3 — Bessel</summary>

$\|x - \sum_{n\le N}\hat x_n e_n\|^2 = \|x\|^2 - \sum |\hat x_n|^2 \ge 0$. Limite: $\sum |\hat x_n|^2 \le \|x\|^2$. ∎
</details>

<details>
<summary>Esercizio 4 — Convergenza dominata</summary>

$f_n(x) = nxe^{-nx}\mathbf 1_{[0,1]}$. Limite puntuale 0. Dominata da $1/e$ (costante). $\int f_n \to 0$. ∎
</details>

<details>
<summary>Esercizio 5 — Riesz esplicito</summary>

$\ell(f) = \int_0^1 fx\,dx$ in $L^2([0,1])$. $\ell(f) = \langle g, f\rangle$ con $g(x) = x$. $\|\ell\| = \|g\|_2 = 1/\sqrt 3$. ∎
</details>

## Riassunto in una riga

Riemann partiziona il dominio (fragile); **Lebesgue** misura il codominio via $\sigma$-algebra e $\sigma$-additività, scambia liberamente limite e integrale (Beppo Levi, Fatou, dominata); **$L^p$** sono Banach completi, **$L^2$** è Hilbert con basi ortonormali, Parseval e Riesz — linguaggio universale di MQ, EDP, probabilità.
