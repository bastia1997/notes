---
title: "Topologia in $\\mathbb{R}^n$"
area: R^n
summary: "Norma euclidea, **Cauchy-Schwarz**, triangolare. Aperti, chiusi, frontiera, accumulazione. **Heine-Borel** (compatto = chiuso + limitato). Connessione per archi. Successioni e completezza."
order: 54
level: intermedio
prereq:
  - "Topologia in $\\mathbb{R}$ (sez. 10)"
  - "Successioni e completezza (sez. 11-16)"
tools:
  - "Rudin — *Principles*, cap. 2"
---

# Topologia in $\mathbb{R}^n$

## Perché parlarne

$\mathbb{R}^n = \{(x_1,\dots,x_n) : x_i \in \mathbb{R}\}$ è spazio vettoriale di dimensione $n$. Su di esso introduciamo **norma**, **distanza**, **topologia** per estendere tutta l'analisi 1D al multivariato.

## Prodotto scalare e norma

**Definizione.**
$$\langle x, y\rangle = \sum_{i=1}^n x_i y_i, \quad \|x\| = \sqrt{\langle x, x\rangle} = \sqrt{x_1^2 + \dots + x_n^2}.$$

> **Glossarietto:**
>
> - $\langle x, y\rangle$ = **prodotto scalare** (bilineare, simmetrico, definito positivo).
> - $\|x\|$ = **norma euclidea**.
> - $d(x,y) = \|x-y\|$ = distanza.

### Cauchy-Schwarz

**Teorema.** $|\langle x, y\rangle| \le \|x\|\cdot \|y\|$, uguaglianza sse $x, y$ lin. dipendenti.

*Dim.* Per $y \ne 0$, $\|x-ty\|^2 \ge 0$: polinomio quadratico in $t$ non negativo, discriminante $\le 0$:
$$4\langle x,y\rangle^2 - 4\|x\|^2\|y\|^2 \le 0. \qquad ∎$$

### Triangolare

**Teorema.** $\|x+y\| \le \|x\| + \|y\|$.

*Dim.* $\|x+y\|^2 = \|x\|^2 + 2\langle x,y\rangle + \|y\|^2 \le (\|x\|+\|y\|)^2$ per Cauchy-Schwarz. ∎

Conseguenza: $|\,\|x\| - \|y\|\,| \le \|x-y\|$ (triangolare inversa).

### Norme equivalenti

Su $\mathbb{R}^n$ **tutte le norme sono equivalenti** ($c\|x\|_a \le \|x\|_b \le C\|x\|_a$). Esempi:

| Norma | Definizione |
|---|---|
| $\|x\|_\infty$ | $\max_i |x_i|$ |
| $\|x\|_1$ | $\sum_i |x_i|$ |
| $\|x\|_2$ | $\sqrt{\sum x_i^2}$ |

$\|x\|_\infty \le \|x\|_2 \le \|x\|_1 \le n\|x\|_\infty$. Le nozioni topologiche (aperti, convergenze) sono **identiche**. In dimensione infinita non più.

## Intorni, aperti, chiusi

**Palla aperta:** $B(x_0, r) = \{x : \|x-x_0\| < r\}$. **Chiusa:** $\overline B(x_0, r)$.

**Definizioni.** Sia $A \subseteq \mathbb{R}^n$.
- **Punto interno:** $\exists r > 0$ con $B(x,r) \subset A$.
- **Aperto:** $A = \text{int}(A)$.
- **Punto di accumulazione:** $\forall r$, $(B(x,r)\setminus\{x\}) \cap A \ne \emptyset$.
- **Chiusura:** $\overline A = A \cup A'$.
- **Chiuso:** $A = \overline A$, equivalente: $A^c$ aperto.
- **Frontiera:** $\partial A = \overline A \cap \overline{A^c}$.
- **Limitato:** $A \subset B(0, M)$.

### Proprietà

1. Unione arbitraria di aperti = aperto; intersezione **finita** = aperto.
2. Intersezione arbitraria di chiusi = chiuso; unione **finita** = chiuso.
3. $A$ chiuso $\iff$ contiene tutti i suoi limiti di successioni.

## Successioni in $\mathbb{R}^n$

**Convergenza.** $x^{(k)} \to x$ se $\|x^{(k)} - x\| \to 0$.

**Teorema (componente per componente).** $x^{(k)} \to x \iff x^{(k)}_i \to x_i$ per ogni $i$.

*Dim.* $|x^{(k)}_i - x_i| \le \|x^{(k)} - x\| \le \sqrt n \max_i |x^{(k)}_i - x_i|$. ∎

**Teorema (completezza).** $\mathbb{R}^n$ è completo (Cauchy implica convergente).

*Dim.* Componenti Cauchy in $\mathbb{R}$ → convergenti → vettore convergente. ∎

## Compattezza — Heine-Borel

**Definizione (per ricoprimenti).** $K$ è **compatto** se ogni ricoprimento aperto ammette sottoricoprimento finito.

**Definizione (sequenziale).** Ogni successione in $K$ ha sottosuccessione convergente a un punto di $K$.

> In spazi metrici (e $\mathbb{R}^n$) le due definizioni sono **equivalenti**.

**Teorema (Heine-Borel).** In $\mathbb{R}^n$:
$$K \text{ compatto} \iff K \text{ chiuso e limitato}.$$

*Dim. (⇐).* Bolzano-Weierstrass su ogni componente + metodo diagonale: estrai sottosuccessione con tutte le componenti convergenti. $K$ chiuso → limite in $K$. ∎

**Conseguenze** (come in $\mathbb{R}$):
- **Weierstrass:** $f: K \to \mathbb{R}$ continua su compatto ammette max/min.
- **Heine-Cantor:** continua su compatto è uniformemente continua.

## Connessione

**Sconnesso:** esistono aperti $U, V$ con $A \subset U \cup V$, $A \cap U \ne \emptyset \ne A \cap V$, $A \cap U \cap V = \emptyset$.

**Connesso per archi:** $\forall x, y \in A$, esiste $\gamma: [0,1] \to A$ continua con $\gamma(0) = x, \gamma(1) = y$.

**Teorema.** Connesso per archi ⇒ connesso. **Per aperti** di $\mathbb{R}^n$ vale anche il viceversa.

**Convesso:** $\forall x,y \in A, \forall t \in [0,1]$: $(1-t)x + ty \in A$. Convesso ⇒ connesso per archi.

**Esempi.**
- Palle: connesse (convesse).
- $\mathbb{R}^n \setminus \{0\}$: connesso per $n \ge 2$, sconnesso per $n=1$.

## Funzioni continue di più variabili

**Definizione.** $f: A \to \mathbb{R}^m$ continua in $x_0$:
$$\forall \varepsilon > 0\ \exists \delta > 0: \|x-x_0\|<\delta \Rightarrow \|f(x)-f(x_0)\|<\varepsilon.$$

**Caratterizzazioni:**
- **Sequenziale:** $x^{(k)} \to x_0 \Rightarrow f(x^{(k)}) \to f(x_0)$.
- **Topologica:** $f^{-1}(\text{aperto})$ è aperto.
- **Componente:** $f = (f_1, \dots, f_m)$ continua $\iff$ ogni $f_i$ continua.

### Esempi e trappole

**(a)** $f(x,y) = x^2 + y$: continua.

**(b)** Trappola classica:
$$f(x,y) = \frac{xy}{x^2+y^2} \text{ se } (x,y) \ne 0, \quad f(0,0)=0.$$
Lungo $y = mx$: $f = m/(1+m^2)$, dipende da $m$ → **limite non esiste**. La continuità "per rette" non basta!

**(c)** $f(x,y) = x^2 y/(x^4+y^2)$. Lungo $y = mx$: $\to 0$. Lungo $y = x^2$: $\to 1/2$. **Non continua**.

> **Lezione.** Per continuità multivariata, occorre verificare **tutti i cammini**, non solo le rette.

## Esercizi

<details>
<summary>Esercizio 1 — Confronto norme</summary>

$\|x\|_1 \le \sqrt n \|x\|_2$. Cauchy-Schwarz su $u = (|x_i|)$ e $v = (1,\dots,1)$: $\|x\|_1 = \langle u,v\rangle \le \sqrt n \|x\|_2$. ∎
</details>

<details>
<summary>Esercizio 2 — Topologia di un insieme</summary>

$A = \{x^2+y^2 < 1\} \cup \{(2,0)\}$. $\text{int} A = \{x^2+y^2<1\}$. $\overline A = \{x^2+y^2 \le 1\}\cup\{(2,0)\}$. $\partial A = \{x^2+y^2=1\}\cup\{(2,0)\}$. ∎
</details>

<details>
<summary>Esercizio 3 — Chiuso non compatto</summary>

$S = \{(x,y): xy = 1\}$. Chiuso, non limitato ($(t, 1/t) \to \infty$): non compatto. ∎
</details>

<details>
<summary>Esercizio 4 — Continuità in 0</summary>

$f(x,y) = (x^2+y^2)\log(x^2+y^2)$, $f(0,0)=0$. Posto $r^2 = x^2+y^2$: $f = r^2 \log r^2 = 2r^2 \log r \to 0$. **Continua**. ∎
</details>

<details>
<summary>Esercizio 5 — Intersezione di compatti annidati</summary>

$K_1 \supset K_2 \supset \dots$ compatti non vuoti. Scegliendo $x_k \in K_k$, sottosuccessione $\to x \in \bigcap K_m$ (per chiusura). ∎
</details>

## Riassunto in una riga

$\mathbb{R}^n$ è completo con norma euclidea ($\langle\cdot,\cdot\rangle$ + Cauchy-Schwarz + triangolare); aperti/chiusi/frontiera si definiscono via palle; **Heine-Borel** dice **compatto = chiuso e limitato** (cardine), **convergenza = componente per componente**, **continuità per rette non basta** (trappola classica $xy/(x^2+y^2)$).
