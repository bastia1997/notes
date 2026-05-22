---
title: "Integrali impropri"
area: Integrali
summary: "Estensione dell'integrale di Riemann a intervalli illimitati (**1° tipo**) e funzioni illimitate (**2° tipo**) via **limite**. $p$-test, confronto, confronto asintotico, criterio integrale. Convergenza assoluta. Funzione $\\Gamma$ di Eulero."
order: 43
level: intermedio
prereq:
  - "Integrale di Riemann e TFC (sez. 39-40)"
  - "Limiti, criteri per serie"
tools:
  - "Rudin — *Principles*, cap. 6"
---

# Integrali impropri

## Perché parlarne

L'integrale di Riemann è definito per **funzioni limitate** su **intervalli compatti** $[a,b]$. Ma molte situazioni naturali violano una delle due condizioni:

- **1° tipo:** intervallo illimitato, $\int_1^\infty f$.
- **2° tipo:** funzione illimitata vicino a un estremo, $\int_0^1 1/\sqrt x\,dx$.

In entrambi i casi estendiamo via **limite**.

## Definizioni

### 1° tipo (intervallo illimitato)

**Definizione.** $f:[a,+\infty)\to\mathbb{R}$ con $f \in \mathcal{R}([a,b])$ per ogni $b > a$:
$$\int_a^{+\infty} f(x)\,dx := \lim_{b\to+\infty} \int_a^b f(x)\,dx.$$

> **Glossarietto:**
>
> - Limite **finito** = integrale **convergente**.
> - Limite $\pm\infty$ = **divergente**.
> - Non esiste = **oscillante**.

### 2° tipo (funzione illimitata)

**Definizione.** $f:[a,b)\to\mathbb{R}$ illimitata vicino a $b$:
$$\int_a^b f(x)\,dx := \lim_{c\to b^-} \int_a^c f(x)\,dx.$$

## $p$-test (integrali di riferimento)

**Teorema ($p$-test su $[1,\infty)$).** $\int_1^{+\infty} \dfrac{dx}{x^\alpha}$ converge $\iff \alpha > 1$.

*Dim.* Per $\alpha \ne 1$: $\int_1^b x^{-\alpha}dx = (b^{1-\alpha}-1)/(1-\alpha)$. Limite finito $\iff 1-\alpha < 0 \iff \alpha > 1$. Per $\alpha=1$: $\ln b \to \infty$. ∎

**Teorema ($p$-test su $(0,1]$).** $\int_0^1 \dfrac{dx}{x^\alpha}$ converge $\iff \alpha < 1$.

> **Mnemonica.** Vicino a $\infty$: $1/x^\alpha$ converge se $\alpha > 1$ ("decade abbastanza"). Vicino a $0$: converge se $\alpha < 1$ ("esplode poco"). Caso $\alpha=1$ ($1/x$) diverge in entrambe le direzioni.

## Criteri di convergenza (per $f \ge 0$)

**Confronto.** $0 \le f \le g$. $\int g$ converge ⇒ $\int f$ converge.

**Confronto asintotico.** $f, g > 0$ con $\lim f/g = L \in (0,+\infty)$. Allora $\int f$ converge $\iff \int g$ converge.

> **Strategia operativa:** trova un'asintotica $f(x) \sim C/x^\alpha$ e applica il $p$-test.

### Esempi

**1.** $\int_1^\infty \frac{dx}{x^2+x+1} \sim 1/x^2$, $\alpha=2>1$: **converge**.

**2.** $\int_1^\infty \frac{x}{\sqrt{x^5+1}}\,dx \sim x \cdot x^{-5/2} = x^{-3/2}$, $\alpha=3/2>1$: **converge**.

## Criterio integrale (legame con serie)

**Teorema (Cauchy).** $f:[1,\infty) \to \mathbb{R}$ positiva e decrescente. Allora
$$\sum_{n=1}^\infty f(n) \text{ converge} \iff \int_1^\infty f(x)\,dx \text{ converge}.$$

*Dim.* $f$ decrescente: $f(n+1) \le \int_n^{n+1} f \le f(n)$. Sommando da $n=1$ a $N-1$: la somma è inquadrata tra parziali di serie a stesso carattere. ∎

**Conseguenza.** $\sum 1/n^\alpha$ converge $\iff \alpha > 1$ (stessa soglia).

## Convergenza assoluta

**Definizione.** $\int f$ **assolutamente convergente** se $\int |f|$ converge.

**Teorema.** Assoluta convergenza ⇒ convergenza.

*Dim.* $f = f^+ - f^-$ con $0 \le f^\pm \le |f|$; per confronto, $\int f^\pm$ convergono. ∎

> $\int_1^\infty \sin x/x\,dx$ converge **semplicemente** ma non assolutamente (vedi Dirichlet).

## Funzione gamma di Eulero

**Definizione.** Per $s > 0$:
$$\Gamma(s) := \int_0^{+\infty} t^{s-1} e^{-t}\,dt.$$

**Proposizione.** Converge per ogni $s > 0$. Vicino a 0: $\sim t^{s-1}$, integrabile se $s>0$. Vicino a $\infty$: decade più di ogni potenza.

**Relazione fondamentale.** $\Gamma(s+1) = s\,\Gamma(s)$.

*Dim.* Per parti su $\Gamma(s+1)$: $u=t^s$, $dv=e^{-t}dt$, $v=-e^{-t}$. Termini di bordo $=0$ per $s>0$, resta $s\Gamma(s)$. ∎

**Corollario.** $\Gamma(n+1) = n!$ per $n \in \mathbb{N}$. È un'**estensione continua del fattoriale**.

## Esercizi

<details>
<summary>Esercizio 1 — Per parti improprio</summary>

$\int_2^\infty \frac{\ln x}{x^2}\,dx$. Per parti, $u=\ln x$, $v=-1/x$:
$$= [-\ln x/x]_2^\infty + \int_2^\infty dx/x^2 = \ln 2/2 + 1/2 = (\ln 2 + 1)/2. \qquad ∎$$
</details>

<details>
<summary>Esercizio 2 — Doppia singolarità</summary>

$\int_0^1 \frac{dx}{\sqrt{x(1-x)}}$. Asintotiche $\sim 1/\sqrt x$ in 0 e $\sim 1/\sqrt{1-x}$ in 1: converge. Sostituzione $x = \sin^2\theta$:
$$= \int_0^{\pi/2} 2\,d\theta = \pi. \qquad ∎$$
</details>

<details>
<summary>Esercizio 3 — $\Gamma(1/2)$</summary>

$\Gamma(1/2) = \int_0^\infty t^{-1/2}e^{-t}\,dt$. Sostituzione $t=u^2$: $= 2\int_0^\infty e^{-u^2}du = \sqrt\pi$ (integrale gaussiano). ∎
</details>

<details>
<summary>Esercizio 4 — Criterio integrale</summary>

Studia $\sum_{n=2}^\infty 1/(n\ln n)$. $f(x)=1/(x\ln x)$, positiva, decrescente. Sostituzione $u=\ln x$: $\int_2^b dx/(x\ln x) = \ln\ln b - \ln\ln 2 \to \infty$. **Diverge**. ∎
</details>

## Riassunto in una riga

Gli **integrali impropri** estendono Riemann via limite a intervalli/funzioni non limitati; **$p$-test** ($1/x^\alpha$: $\alpha>1$ vicino a $\infty$, $\alpha<1$ vicino a 0) + confronto asintotico risolvono la maggior parte dei casi; il **criterio integrale** lega convergenza di serie e integrali; $\Gamma$ è il fattoriale continuo.
