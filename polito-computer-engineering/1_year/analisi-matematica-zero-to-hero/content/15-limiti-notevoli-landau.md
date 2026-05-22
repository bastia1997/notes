---
title: "Limiti notevoli e simboli di Landau (o-piccolo, O-grande)"
area: Successioni
summary: "I limiti \"atomici\" che si ripresentano in mille forme — $(1 + 1/n)^n \\to e$, $n^{1/n} \\to 1$, la gerarchia $\\log \\ll n^\\alpha \\ll a^n \\ll n!$ — e la **notazione di Landau** ($o$, $O$, $\\sim$) che fa parlare di \"velocità\" di un infinito senza calcoli."
order: 15
level: intermedio
prereq:
  - "Algebra dei limiti (sez. 12)"
  - "Monotone, Bolzano-Weierstrass (sez. 13)"
tools:
  - "Rudin — *Principles*, cap. 3"
  - "Giusti — *Analisi 1*"
---

# Limiti notevoli e simboli di Landau

## Perché parlarne

Pochi limiti "atomici" si ripresentano in mille forme. Una volta che li hai memorizzati, sblocchi il calcolo di limiti complicati per riduzione algebrica.

In parallelo, la **notazione asintotica di Landau** — i simboli $o$, $O$, $\sim$ — fornisce una grammatica per **confrontare velocità** di convergenza/divergenza senza ricorrere ogni volta a manipolazioni $\varepsilon$.

Avere automatico in testa che
$$\log n \ll n^\alpha \ll a^n \ll n! \ll n^n$$
(per $\alpha > 0$, $a > 1$) è metà della velocità di calcolo in analisi.

## Intuizione

Ogni successione che tende a 0 (o a $\infty$) lo fa con una **velocità**. Confronta:
- $1/n$ va piano a zero.
- $1/n^2$ va più veloce.
- $1/2^n$ va molto più veloce.

Stesso lato per gli infiniti:
- $n$ cresce piano.
- $n^2$ più veloce.
- $2^n$ molto più veloce.
- $n!$ ancora di più.

Landau dà nomi formali a queste velocità relative.

## Simboli di Landau (per successioni, $n \to \infty$)

Date $(a_n), (b_n)$ con $b_n \ne 0$ definitivamente:

- **o-piccolo**: $a_n = o(b_n)$ se $\displaystyle \lim_{n \to \infty} \frac{a_n}{b_n} = 0$.
- **O-grande**: $a_n = O(b_n)$ se $\exists C > 0, \exists N : |a_n| \le C |b_n|$ per $n \ge N$.
- **Asintotico**: $a_n \sim b_n$ se $\displaystyle \lim \frac{a_n}{b_n} = 1$.
- **Stesso ordine**: $a_n = \Theta(b_n)$ se $\exists c, C > 0$ con $c |b_n| \le |a_n| \le C |b_n|$ definitivamente.

> **Glossarietto:**
>
> - $o(b_n)$ ("o piccolo di $b_n$") = "trascurabile rispetto a $b_n$": cresce/decresce strettamente più lentamente.
> - $O(b_n)$ ("O grande di $b_n$") = "limitato in scala da $b_n$": può essere paragonabile o più piccolo, ma non più grande di una costante per $b_n$.
> - $\sim$ ("tilde") = "uguale in scala con costante 1": stesso ordine, stesso coefficiente leading.
> - $\Theta$ ("theta") = "stesso ordine di grandezza" (più debole di $\sim$: ammette costante moltiplicativa qualsiasi $> 0$).
>
> **Esempio.** Per $n \to \infty$:
> - $n^2 = o(n^3)$ — $n^2$ è trascurabile rispetto a $n^3$ (rapporto $1/n \to 0$).
> - $n^2 = O(2 n^2)$ — limitato in scala ($C = 1/2$).
> - $n^2 + 5 n \sim n^2$ — stesso leading (rapporto $\to 1$).
> - $\sin n + n = \Theta(n)$ — stesso ordine (oscilla ma scala di $n$).

### Notazione standard "abusata"

"$a_n = o(b_n)$" è un abuso comodo. Davvero significa: "$a_n$ appartiene alla classe delle successioni trascurabili rispetto a $b_n$". Quindi quando scrivi "$f(n) = 1 + o(1/n)$" intendi: $f(n)$ è $1$ più qualcosa $a_n$ con $a_n = o(1/n)$.

### Regole di calcolo con $o$-piccolo

Per $n \to \infty$:

1. $o(b_n) + o(b_n) = o(b_n)$.
2. $c \cdot o(b_n) = o(b_n)$ per $c$ costante non nulla.
3. $o(b_n) \cdot o(c_n) = o(b_n c_n)$.
4. $a_n \cdot o(b_n) = o(a_n b_n)$.
5. Se $a_n = o(b_n)$ e $b_n = o(c_n)$, allora $a_n = o(c_n)$ (transitiva).

Sono tutte conseguenze immediate del fatto che "il limite del rapporto è 0".

## Limiti notevoli base — DA SAPERE A MEMORIA

Per $n \to \infty$:

| limite | valore |
|---|---|
| $\dfrac{1}{n^\alpha}$ con $\alpha > 0$ | $0$ |
| $a^n$ con $\|a\| < 1$ | $0$ |
| $a^n$ con $a > 1$ | $+\infty$ |
| $n^\alpha$ con $\alpha > 0$ | $+\infty$ |
| $\dfrac{n^\alpha}{a^n}$ con $\alpha > 0, a > 1$ | $0$ |
| $\dfrac{a^n}{n!}$ con $a > 0$ | $0$ |
| $\dfrac{n!}{n^n}$ | $0$ |
| $n^{1/n}$ | $1$ |
| $a^{1/n}$ con $a > 0$ | $1$ |
| $\left(1 + \dfrac{1}{n}\right)^n$ | $e$ |
| $\left(1 + \dfrac{x}{n}\right)^n$ con $x$ fissato | $e^x$ |
| $\dfrac{\log n}{n^\alpha}$ con $\alpha > 0$ | $0$ |

### Gerarchia degli infiniti (a memoria)

$$\log^\beta n \ll n^\alpha \ll a^n \ll n! \ll n^n$$

per ogni $\alpha, \beta > 0$ e $a > 1$. Il simbolo $\ll$ si legge "è $o(\dots)$ di".

> **A parole**: il fattoriale schiaccia l'esponenziale, l'esponenziale schiaccia il polinomio, il polinomio schiaccia il logaritmo. Sempre, asintoticamente. Tienitelo a mente come una "scala".

## Teoremi principali

### Teorema 1 — Definizione di $e$

> $\displaystyle e := \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n \in (2, 3)$.

Già dimostrato in cap. 13: monotona crescente + limitata da 3.

### Teorema 2 — $n^{1/n} \to 1$

*Dim.* Posto $b_n := n^{1/n} - 1 \ge 0$. Allora $n = (1 + b_n)^n$. Per il binomio di Newton (per $n \ge 2$):
$$n = (1 + b_n)^n \ge \binom{n}{2} b_n^2 = \frac{n(n-1)}{2} b_n^2,$$
quindi $b_n^2 \le \frac{2}{n - 1} \to 0$, e $b_n \le \sqrt{2/(n-1)} \to 0$. Quindi $n^{1/n} = 1 + b_n \to 1$. ∎

### Teorema 3 — L'esponenziale schiaccia il polinomio

> $\displaystyle \lim_{n \to \infty} \frac{n^\alpha}{a^n} = 0$ per ogni $\alpha > 0$, $a > 1$.

*Dim.* Studiamo il rapporto consecutivo di $c_n = n^\alpha / a^n$:
$$\frac{c_{n+1}}{c_n} = \frac{(n+1)^\alpha}{a \cdot n^\alpha} = \frac{1}{a} \left(1 + \frac{1}{n}\right)^\alpha \to \frac{1}{a} < 1.$$

Quindi definitivamente $c_{n+1}/c_n < r$ per un $r < 1$ fisso, da cui $c_n \le c_N \cdot r^{n - N} \to 0$. ∎

Stesso schema per $a^n / n!$ (rapporto $a/(n+1) \to 0$) e per $n!/n^n$ (rapporto $\to 1/e < 1$).

### Teorema 4 — Il logaritmo schiaccia il polinomio

> $\displaystyle \lim_{n \to \infty} \frac{\log n}{n^\alpha} = 0$ per ogni $\alpha > 0$.

*Idea.* Cambia variabile $u = \log n$. Vogliamo $u/e^{\alpha u} \to 0$ per $u \to +\infty$. Dalla serie di Taylor, $e^v \ge v^2/2$ per $v \ge 0$, quindi $u/e^{\alpha u} \le 2/(\alpha^2 u) \to 0$. ∎

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="320" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">Gerarchia degli infiniti, scala log</text>
  <line x1="60" y1="280" x2="580" y2="280" stroke="#3a4868" stroke-width="1"/>
  <line x1="60" y1="40" x2="60" y2="290" stroke="#3a4868" stroke-width="1"/>
  <text x="65" y="295" fill="#f3eed9" font-family="ui-monospace" font-size="11">n=1</text>
  <text x="555" y="295" fill="#f3eed9" font-family="ui-monospace" font-size="11">n=30</text>
  <path d="M 60 270 Q 200 250 350 235 T 580 220" fill="none" stroke="#6aa9d8" stroke-width="2.5"/>
  <text x="540" y="215" fill="#6aa9d8" font-family="ui-monospace" font-size="11">log n</text>
  <path d="M 60 275 Q 320 190 580 100" fill="none" stroke="#6fb38a" stroke-width="2.5"/>
  <text x="540" y="95" fill="#6fb38a" font-family="ui-monospace" font-size="11">n</text>
  <path d="M 60 278 Q 280 230 500 80 T 580 60" fill="none" stroke="#d4af37" stroke-width="2.5"/>
  <text x="540" y="55" fill="#d4af37" font-family="ui-monospace" font-size="11">n²</text>
  <path d="M 60 278 Q 350 270 460 100 T 580 45" fill="none" stroke="#e8a04a" stroke-width="2.5"/>
  <text x="540" y="40" fill="#e8a04a" font-family="ui-monospace" font-size="11">2ⁿ</text>
  <path d="M 60 279 Q 380 278 480 50 T 580 45" fill="none" stroke="#e07a8d" stroke-width="2.5"/>
  <text x="500" y="55" fill="#e07a8d" font-family="ui-monospace" font-size="11">n!</text>
</svg>
<div class="chart-caption">$\log n \ll n \ll n^2 \ll 2^n \ll n!$: il fattoriale è il vincitore asintotico.</div>
</div>

## Esempi guidati

### Esempio 1 — Calcolo con $o$-piccolo

$$\lim_{n \to \infty} \frac{n^3 + 5 n^{2.5} + \log n}{2 n^3 - n^2}.$$

*Soluzione.* Identifica il **termine dominante** sopra e sotto: $n^3$.
- Numeratore = $n^3 (1 + 5/n^{0.5} + \log n / n^3) = n^3 (1 + o(1))$.
- Denominatore = $n^3 (2 - 1/n) = n^3 (2 + o(1))$.
- Quoziente = $\frac{1 + o(1)}{2 + o(1)} \to \frac{1}{2}$.

> **Tecnica standard.** Identifica il dominante (sopra e sotto), raccoglilo, ciò che resta è $o(1)$ → vai al limite.

### Esempio 2 — Forma $1^\infty$ con $e$

$\displaystyle \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^{2 n} = \lim \left[\left(1 + \frac{1}{n}\right)^n\right]^2 = e^2$.

Più in generale: $\lim (1 + 1/n)^{a n + b} = e^a$ ($a, b$ costanti).

### Esempio 3 — Forma $1^\infty$ generica

$\displaystyle \lim_{n \to \infty} \left(\frac{n + 2}{n + 1}\right)^n$.

*Soluzione.* $\frac{n+2}{n+1} = 1 + \frac{1}{n+1}$. Quindi
$$\lim \left(1 + \frac{1}{n + 1}\right)^n.$$
Posto $m = n + 1$: $\lim_{m \to \infty} (1 + 1/m)^{m - 1} = e / (1) = e$.

### Esempio 4 — Log vs polinomio

$\lim \frac{\log^{10} n}{n^{0.001}} = 0$. Il polinomio vince **sempre**, anche con esponente piccolissimo e logaritmo elevato a potenza alta. (Teorema 4 per $\alpha = 0.001$, poi prendi la $10$-esima potenza.)

### Esempio 5 — Forma con $\sin$

$\lim n \sin(1/n)$.

*Soluzione.* Posto $x = 1/n \to 0$: $\frac{\sin x}{x} \to 1$ (limite notevole, sez. 22). Quindi $n \sin(1/n) = \frac{\sin(1/n)}{1/n} \to 1$.

### Esempio 6 — Composizioni

$\lim n \log(1 + 1/n)$.

*Soluzione.* $\log(1 + x)/x \to 1$ per $x \to 0$ (limite notevole), quindi con $x = 1/n$: $n \log(1 + 1/n) \to 1$. Equivalente: $\log(1 + 1/n) \sim 1/n$.

## Limiti notevoli "continui" (anticipo cap. 22)

Per $x \to 0$, validi anche per successioni $a_n \to 0$:

| limite | valore |
|---|---|
| $\sin x / x$ | $1$ |
| $(1 - \cos x)/x^2$ | $1/2$ |
| $\log(1 + x)/x$ | $1$ |
| $(e^x - 1)/x$ | $1$ |
| $((1 + x)^\alpha - 1)/x$ | $\alpha$ |
| $\tan x / x$ | $1$ |
| $\arctan x / x$ | $1$ |

Sostituendo $x = 1/n$ si trasportano alle successioni.

## Tabella di confronto asintotico

| $f(n)$ | $n = 1$ | $n = 10$ | $n = 100$ | $n = 1000$ |
|---|---|---|---|---|
| $\log_2 n$ | $0$ | $\sim 3.3$ | $\sim 6.6$ | $\sim 10$ |
| $n$ | $1$ | $10$ | $100$ | $1000$ |
| $n^2$ | $1$ | $100$ | $10^4$ | $10^6$ |
| $2^n$ | $2$ | $1024$ | $\sim 10^{30}$ | $\sim 10^{301}$ |
| $n!$ | $1$ | $\sim 3.6 \cdot 10^6$ | $\sim 9.3 \cdot 10^{157}$ | $\sim 10^{2568}$ |
| $n^n$ | $1$ | $10^{10}$ | $10^{200}$ | $10^{3000}$ |

La differenza è esplosiva: $2^{1000}$ ha 300 cifre, $1000!$ ne ha 2568.

## Trappole comuni

- **$o(1)$ NON è una costante.** Significa "qualcosa che tende a 0". Quindi $5 + o(1) \to 5$, ma due "$o(1)$" diversi non sono uguali fra loro.
- **$a_n \sim b_n$ NON implica $a_n - b_n \to 0$.** Esempio: $n + 1 \sim n$ (rapporto $\to 1$), ma $n + 1 - n = 1 \not\to 0$. L'asintotico parla di **rapporti**, non di differenze.
- **Non si possono sottrarre asintotici.** $a_n \sim a_n', b_n \sim b_n'$ NON implica $a_n - b_n \sim a_n' - b_n'$. (Vedi esercizio.)
- **Limiti notevoli vanno applicati nella forma esatta.** $\sin x / x \to 1$ per $x \to 0$, NON per $x \to \infty$. Se $x = n \to \infty$, $\sin n / n \to 0$ (carabinieri).
- **$(1 + 1/n)^n \to e$ ma $(1 + 1/n^2)^n \to 1$ e $(1 + 1/n)^{n^2} \to +\infty$.** L'esponente deve crescere "alla stessa velocità" del reciproco dentro la parentesi.

## Esercizi

<details>
<summary>Esercizio 1 — $(1 + x/n)^n$</summary>

Calcola $\lim (1 + 5/n)^n$.

**Soluzione.** $\left(1 + \frac{5}{n}\right)^n = e^{n \log(1 + 5/n)}$. Esponente: $n \cdot (5/n + o(1/n)) = 5 + o(1) \to 5$. Per continuità di $e^x$, limite $= e^5$. ∎
</details>

<details>
<summary>Esercizio 2 — Confronto</summary>

Calcola $\lim \frac{n^{100} \log^{200} n}{2^n}$.

**Soluzione.** $2^n$ schiaccia qualunque polinomio (anche moltiplicato per $\log^{200} n$, perché $\log^{200} n = o(n^\epsilon)$ per ogni $\epsilon > 0$). Limite $= 0$. ∎
</details>

<details>
<summary>Esercizio 3 — Limite con $e$</summary>

$\lim \left(\dfrac{n - 1}{n + 1}\right)^n$.

**Soluzione.** $\frac{n-1}{n+1} = 1 - \frac{2}{n+1}$. Esponente $n \log(1 - 2/(n+1)) \to -2$. Quindi limite $= e^{-2}$. ∎
</details>

<details>
<summary>Esercizio 4 — Radice di una somma</summary>

$\lim \sqrt[n]{n^3 + 5^n}$.

**Soluzione.** Per grandi $n$, $5^n$ domina: $5^n \le n^3 + 5^n \le 2 \cdot 5^n$. Estraendo la radice $n$-esima: $5 \le \sqrt[n]{n^3 + 5^n} \le 5 \cdot 2^{1/n} \to 5$. Carabinieri: limite $= 5$. ∎
</details>

<details>
<summary>Esercizio 5 — $n(\sqrt[n]{2} - 1)$</summary>

$\lim n(\sqrt[n]{2} - 1)$.

**Soluzione.** $\sqrt[n]{2} = e^{(\log 2)/n} = 1 + (\log 2)/n + o(1/n)$. Quindi $\sqrt[n]{2} - 1 = (\log 2)/n + o(1/n)$, e $n(\sqrt[n]{2} - 1) = \log 2 + o(1) \to \log 2$. ∎
</details>

<details>
<summary>Esercizio 6 — Formula di Stirling "light"</summary>

Dimostra che $\sqrt[n]{n!} / n \to 1/e$.

**Soluzione (sketch).** $\log \sqrt[n]{n!} = (1/n) \sum_{k=1}^n \log k$. Per Stirling (cap. 33), $\sum_{k=1}^n \log k = n \log n - n + O(\log n)$, quindi $\log \sqrt[n]{n!} = \log n - 1 + O(\log n / n)$. Dunque $\sqrt[n]{n!}/n = e^{\log \sqrt[n]{n!} - \log n} = e^{-1 + o(1)} \to 1/e$. ∎

(Versione precisa: $n! \sim \sqrt{2 \pi n} (n/e)^n$, formula di Stirling.)
</details>

## Riassunto in una riga

**Limiti notevoli** (memoria) + **Landau** (linguaggio) = "*identifico il termine dominante, scrivo tutto come dominante + $o$(dominante), semplifico, leggo il limite*" — la tecnica che risolve il 95% dei limiti in Analisi I.
