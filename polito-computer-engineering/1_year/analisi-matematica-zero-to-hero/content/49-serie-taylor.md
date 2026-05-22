---
title: "Serie di Taylor e analiticità"
area: Serie
summary: "Data $f \\in C^\\infty$ vicino a $x_0$, la **serie di Taylor** è $\\sum f^{(n)}(x_0)(x-x_0)^n/n!$. Converge a $f$ $\\iff R_n \\to 0$. Funzioni **analitiche**, sviluppi cardine, il celebre controesempio $C^\\infty$ non analitico."
order: 49
level: avanzato
prereq:
  - "Serie di potenze (sez. 48)"
  - "Taylor con resto (sez. 33)"
tools:
  - "Rudin — *Principles*, cap. 8"
---

# Serie di Taylor e analiticità

## Perché parlarne

Nella sezione precedente: data $\sum a_n x^n$, trovare $R$, somma $C^\infty$.

Ora **invertiamo**: data $f \in C^\infty$ in un intorno di $x_0$, **quando** $f$ è somma di una serie di potenze? Risposta: precisamente quando $f$ è **analitica**.

## Polinomio e serie di Taylor

**Definizione.** $f \in C^n$ vicino a $x_0$. Il **polinomio di Taylor di grado $n$**:
$$T_n(x) := \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!} (x-x_0)^k.$$

**Definizione.** $f \in C^\infty$ vicino a $x_0$. La **serie di Taylor**:
$$\sum_{n=0}^\infty \frac{f^{(n)}(x_0)}{n!} (x-x_0)^n.$$

> **Glossarietto:**
>
> - $x_0 = 0$ → serie di **Maclaurin**.
> - La serie è una serie di potenze: ha raggio $R$, somma $S(x)$.
> - **Domanda chiave:** $S(x) = f(x)$? Non necessariamente!

## Resto di Taylor — criterio di analiticità

**Lagrange.** $f \in C^{n+1}$: esiste $\xi$ tra $x_0$ e $x$:
$$f(x) - T_n(x) = R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}.$$

**Criterio fondamentale.** La serie di Taylor converge a $f$ in $x$ $\iff$ $R_n(x) \to 0$.

> "$f$ è analitica?" $\equiv$ "il resto va a zero?"

## Funzioni analitiche

**Definizione.** $f$ è **analitica in $x_0$** se esiste $\delta > 0$ tale che per $|x-x_0|<\delta$:
$$f(x) = \sum_{n=0}^\infty \frac{f^{(n)}(x_0)}{n!}(x-x_0)^n.$$

**Notazione:** $f \in C^\omega$.

**Gerarchia:** $C^\omega \subsetneq C^\infty \subsetneq \dots \subsetneq C^1 \subsetneq C^0$.

**Proprietà.**
1. Somma, prodotto, quoziente, composizione di analitiche è analitica.
2. Derivata e primitiva di analitica è analitica.
3. **Principio di identità:** se $f, g$ analitiche su connesso e coincidono su un insieme con punto di accumulazione, allora $f \equiv g$. (Forte, raro in $C^\infty$.)

## Sviluppi cardine

### $e^x$

**Teorema.** $e^x = \sum x^n/n!$ per ogni $x$.

*Dim.* $f^{(n)}(x) = e^x$. Resto: $|R_n(x)| \le e^x |x|^{n+1}/(n+1)! \to 0$ ($n! \gg |x|^n$). ∎

### $\sin, \cos$

**Teorema.** $\sin x = \sum (-1)^n x^{2n+1}/(2n+1)!$ e $\cos x = \sum (-1)^n x^{2n}/(2n)!$ per ogni $x$.

*Dim.* $|f^{(n)}(\xi)| \le 1$, quindi $|R_n| \le |x|^{n+1}/(n+1)! \to 0$. ∎

**Eulero (formale).** $e^{ix} = \cos x + i\sin x$ (sostituendo $ix$ nella serie di $e^x$).

### $\ln(1+x)$

**Teorema.** Per $-1 < x \le 1$:
$$\ln(1+x) = \sum_{n=1}^\infty (-1)^{n+1} x^n/n.$$

*Dim.* Integro $1/(1+t) = \sum(-1)^n t^n$ su $[0,x]$. In $x=1$: Leibniz + Abel al bordo. ∎

**Conseguenza:** $\ln 2 = 1 - 1/2 + 1/3 - 1/4 + \dots$

### Binomiale $(1+x)^\alpha$

**Teorema (Newton).** Per $\alpha \in \mathbb{R}$ e $|x| < 1$:
$$(1+x)^\alpha = \sum_{n=0}^\infty \binom{\alpha}{n} x^n, \quad \binom{\alpha}{n} = \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}.$$

**Casi utili:**
- $\alpha = 1/2$: $\sqrt{1+x} = 1 + x/2 - x^2/8 + \dots$
- $\alpha = -1$: $(1+x)^{-1} = \sum (-1)^n x^n$.
- $\alpha = -1/2$: $1/\sqrt{1+x}$ (usata in $\arcsin$).

## Tabella delle Maclaurin notevoli

| $f(x)$ | Serie | Validità |
|---|---|---|
| $e^x$ | $\sum x^n/n!$ | $\forall x$ |
| $\sin x$ | $\sum (-1)^n x^{2n+1}/(2n+1)!$ | $\forall x$ |
| $\cos x$ | $\sum (-1)^n x^{2n}/(2n)!$ | $\forall x$ |
| $\sinh x$ | $\sum x^{2n+1}/(2n+1)!$ | $\forall x$ |
| $\cosh x$ | $\sum x^{2n}/(2n)!$ | $\forall x$ |
| $\ln(1+x)$ | $\sum (-1)^{n+1} x^n/n$ | $-1 < x \le 1$ |
| $\arctan x$ | $\sum (-1)^n x^{2n+1}/(2n+1)$ | $-1 \le x \le 1$ |
| $(1+x)^\alpha$ | $\sum \binom{\alpha}{n} x^n$ | $|x|<1$ |
| $1/(1-x)$ | $\sum x^n$ | $-1<x<1$ |

## Il controesempio: $C^\infty$ non analitica

**Definizione.**
$$f(x) := \begin{cases} e^{-1/x^2} & x \ne 0 \\ 0 & x = 0. \end{cases}$$

**Teorema.** $f \in C^\infty(\mathbb{R})$ e $f^{(n)}(0) = 0$ per ogni $n$.

*Dim. (sketch).* Per $x \ne 0$, $f$ è composizione $C^\infty$. In 0:
- $f'(0) = \lim_{h\to 0} e^{-1/h^2}/h$. Posto $t = 1/h^2$: $\pm\sqrt t\,e^{-t} \to 0$.
- Per induzione, $f^{(n)}(x) = P_n(1/x) e^{-1/x^2}$ per $x \ne 0$. Limite in 0 = 0 (esponenziale schiaccia ogni polinomio). ∎

**Conseguenza.** La serie di Taylor in 0 è $\sum 0 \cdot x^n/n! = 0$, ma $f \not\equiv 0$. **Non analitica in 0**.

> **Morale.** $C^\infty$ non garantisce analiticità. Serve $R_n \to 0$, condizione non locale.

## Funzioni "bump"

Il controesempio è la base per **bump functions** $C^\infty$ a supporto compatto, ad es.
$$\varphi(x) = \begin{cases} e^{-1/(1-x^2)} & |x|<1 \\ 0 & |x| \ge 1. \end{cases}$$

Impossibili nell'analitico (principio di identità). Pilastri di distribuzioni, analisi armonica, PDE.

## Tecniche di sviluppo

- **Sostituzione:** $\sin(x^2) = \sum (-1)^n x^{4n+2}/(2n+1)!$.
- **Combinazione:** $\cosh x = (e^x + e^{-x})/2$.
- **Prodotto:** Cauchy.
- **Derivazione/integrazione termine a termine.**

## Esercizi

<details>
<summary>Esercizio 1 — $\pi$ via Leibniz</summary>

Con $\pi/4 = \sum (-1)^n/(2n+1)$: $S_5 = 4(1-1/3+1/5-1/7+1/9) \approx 3.34$. Errore Leibniz $\le 4/11 \approx 0.36$. **Lentissima** (serve Machin per accelerare). ∎
</details>

<details>
<summary>Esercizio 2 — Sviluppo binomiale</summary>

$\sqrt{1-x^2}$ fino a $x^6$. $u = -x^2$, $\alpha = 1/2$:
$$= 1 - x^2/2 - x^4/8 - x^6/16 + O(x^8). \qquad ∎$$
</details>

<details>
<summary>Esercizio 3 — Stima errore $e^x$</summary>

Quanti termini servono per $e^{0.5}$ con errore $< 10^{-5}$? $|R_n| \le 2 \cdot 0.5^{n+1}/(n+1)!$. Provando: $n=5$ insufficiente, $n=6$ basta. **7 termini**. ∎
</details>

<details>
<summary>Esercizio 4 — Identità di Poisson</summary>

$\sum r^n \cos(n\theta) = (1-r\cos\theta)/(1-2r\cos\theta+r^2)$ per $|r|<1$.

*Dim.* Geometrica complessa $\sum (re^{i\theta})^n = 1/(1-re^{i\theta})$, parte reale. ∎
</details>

## Riassunto in una riga

La **serie di Taylor** di $f \in C^\infty$ converge a $f$ $\iff R_n \to 0$; le funzioni **analitiche** sono il sottoinsieme di $C^\infty$ con questa proprietà; esempi cardine ($e^x, \sin, \cos, \ln(1+x), \arctan, (1+x)^\alpha$) sono analitiche; il celebre $e^{-1/x^2}$ è $C^\infty$ ma non analitica in 0, base delle bump function.
