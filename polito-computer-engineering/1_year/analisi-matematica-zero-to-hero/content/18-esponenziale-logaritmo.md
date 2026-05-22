---
title: "Esponenziale, logaritmo, potenze"
area: Funzioni elementari
summary: "Come costruire $a^x$ partendo da $a^n$ con $n$ intero e arrivare a esponente reale qualsiasi. Il numero $e$ come limite. Il **logaritmo** come inversa dell'esponenziale. Identità da sapere a memoria e i grafici simmetrici."
order: 18
level: principiante
prereq:
  - "Successioni e limiti (sez. 11)"
  - "Sup/inf, completezza di $\\mathbb{R}$ (sez. 07)"
tools:
  - "Rudin — *Principles*, cap. 1 e 8"
  - "Giusti — *Analisi 1*"
---

# Esponenziale, logaritmo, potenze

## Perché ci servono

L'esponenziale $e^x$ e il logaritmo $\ln x$ sono le funzioni "biologiche" dell'analisi: descrivono crescita demografica, decadimento radioattivo, interesse composto, entropia.

**Tecnicamente**, $e^x$ è l'unica funzione (a meno di scala) **uguale alla propria derivata**. Questo la rende centrale in tutte le equazioni differenziali. In questa sezione la costruiamo passo per passo.

## Potenze a esponente intero

Per $a \in \mathbb{R}$ e $n \in \mathbb{N}_+$:
$$a^n = \underbrace{a \cdot a \cdots a}_{n \text{ fattori}}, \quad a^0 = 1 \ (a \ne 0), \quad a^{-n} = \frac{1}{a^n}\ (a \ne 0).$$

Proprietà familiari:
$$a^{m + n} = a^m a^n, \quad (a^m)^n = a^{mn}, \quad (ab)^n = a^n b^n.$$

## Potenze a esponente razionale

Per $a > 0$ e $n \in \mathbb{N}_+$: $a^{1/n}$ = l'**unico** numero positivo $b$ tale che $b^n = a$.

> **Esistenza e unicità** derivano dalla completezza di $\mathbb{R}$: $x \mapsto x^n$ è strettamente crescente continua su $[0, +\infty)$, quindi biiettiva sull'immagine.

Per $p/q \in \mathbb{Q}$ con $q > 0$:
$$a^{p/q} = (a^{1/q})^p = (a^p)^{1/q}.$$

Le proprietà delle potenze si estendono.

## Potenze a esponente reale

**Definizione (via sup).** Per $a > 1$ e $x \in \mathbb{R}$:
$$a^x := \sup\{a^r : r \in \mathbb{Q},\ r \le x\}.$$
Per $0 < a < 1$, $a^x := 1/(1/a)^x$. Per $a = 1$, $a^x = 1$.

> **Glossarietto:**
>
> - $\sup\{a^r : r \in \mathbb{Q}, r \le x\}$ = "il più piccolo dei numeri che maggiorano tutti i $a^r$ con $r$ razionale e $r \le x$". Cap. 07.
> - Per $x$ razionale, la nuova definizione coincide con quella algebrica.
> - Per $x$ irrazionale, è il "limite naturale" da sotto via razionali.

**Proposizione.** La funzione $x \mapsto a^x$ ($a > 0$, $a \ne 1$) è:
1. ben definita su $\mathbb{R}$;
2. strettamente monotona (crescente se $a > 1$, decrescente se $0 < a < 1$);
3. continua;
4. $a^{x + y} = a^x \cdot a^y$, $(a^x)^y = a^{x y}$;
5. immagine $(0, +\infty)$.

(Le proprietà (4) si ereditano dal caso razionale per continuità.)

## Il numero $e$

**Definizione.** $\displaystyle e := \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n$.

**Teorema.** Il limite esiste finito, ed è in $(2, 3)$.

*Dim. (già vista in cap. 13).* La successione $a_n = (1 + 1/n)^n$ è monotona crescente e limitata superiormente da 3. Per il teorema delle monotone, converge.

Stime: $a_1 = 2$, $a_2 = 9/4 = 2.25$, e $a_n \le 3$, quindi $e \in [2.25, 3] \subseteq (2, 3)$. ∎

**Valore approssimato:** $e \approx 2.71828\,18284\,59045\dots$ Irrazionale (Eulero), trascendente (Hermite 1873).

## La funzione esponenziale $e^x$

Con $a = e$ nella costruzione di sopra otteniamo $\exp(x) := e^x$.

**Proprietà fondamentali:**

- **Dominio** $\mathbb{R}$, **immagine** $(0, +\infty)$.
- $e^0 = 1$, $e^1 = e$.
- $e^{x + y} = e^x e^y$, $e^{-x} = 1/e^x$.
- **Strettamente crescente**, continua.
- $\lim_{x \to +\infty} e^x = +\infty$, $\lim_{x \to -\infty} e^x = 0$.
- **Derivata** (cap. 30): $(e^x)' = e^x$ — è l'unica funzione (a meno di scala) uguale alla sua derivata.

**Caratterizzazione equivalente** (vedremo i dettagli in capp. 33, 49):
$$e^x = \lim_{n \to \infty}\left(1 + \frac{x}{n}\right)^n = \sum_{k=0}^{\infty} \frac{x^k}{k!}.$$

La seconda è la **serie di Taylor**, convergente per ogni $x \in \mathbb{R}$.

## Il logaritmo

Poiché $\exp : \mathbb{R} \to (0, +\infty)$ è biiettiva e strettamente crescente, ammette inversa.

**Definizione.** Il **logaritmo naturale** $\ln : (0, +\infty) \to \mathbb{R}$ è l'inversa di $\exp$:
$$\ln y = x \iff e^x = y.$$

> **Glossarietto:**
>
> - $\ln$ = "logaritmo naturale", base $e$. **In analisi è sempre questo**, salvo specifica del contrario.
> - $\log_a x$ = logaritmo in base $a$ (vedi sotto).
> - $\log_{10}, \log_2$ sono comuni in ingegneria/informatica.

**Proprietà del logaritmo:**

- **Dominio** $(0, +\infty)$, **immagine** $\mathbb{R}$.
- $\ln 1 = 0$, $\ln e = 1$.
- $\ln(x y) = \ln x + \ln y$ ("il logaritmo trasforma prodotti in somme").
- $\ln(x/y) = \ln x - \ln y$.
- $\ln(x^\alpha) = \alpha \ln x$.
- **Strettamente crescente**, continua, concava.
- $\lim_{x \to 0^+} \ln x = -\infty$, $\lim_{x \to +\infty} \ln x = +\infty$.

*Dim. di $\ln(x y) = \ln x + \ln y$.* Posto $u = \ln x$, $v = \ln y$: $e^u = x$, $e^v = y$, e $xy = e^u e^v = e^{u + v}$. Applicando $\ln$: $\ln(xy) = u + v = \ln x + \ln y$. ∎

### Altre basi e cambio base

Per $a > 0$, $a \ne 1$:
$$\log_a x = \frac{\ln x}{\ln a}.$$

**Cambio base:** $\log_a x = \log_b x / \log_b a$.

## Grafici di $e^x$ e $\ln x$

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="320" fill="#111a30"/>
<line x1="40" y1="270" x2="580" y2="270" stroke="#948f78" stroke-width="1"/>
<line x1="300" y1="20" x2="300" y2="300" stroke="#948f78" stroke-width="1"/>
<line x1="40" y1="530" x2="580" y2="-50" stroke="#948f78" stroke-width="0.8" stroke-dasharray="3,3"/>
<text x="560" y="50" fill="#d8d3bd" font-size="11" font-style="italic">y = x</text>
<polyline points="180,267 220,261 260,251 280,243 300,230 320,213 340,191 360,162 380,124 400,76 420,16" fill="none" stroke="#d4af37" stroke-width="2.2"/>
<text x="425" y="20" fill="#d4af37" font-size="13">y = eˣ</text>
<polyline points="303,265 309,260 319,250 337,230 376,190 414,150 454,110 494,70" fill="none" stroke="#6fb38a" stroke-width="2.2"/>
<text x="500" y="65" fill="#6fb38a" font-size="13">y = ln x</text>
<circle cx="300" cy="230" r="2.5" fill="#e07a8d"/>
<text x="282" y="222" fill="#e07a8d" font-size="10">(0,1)</text>
<circle cx="340" cy="270" r="2.5" fill="#e07a8d"/>
<text x="343" y="285" fill="#e07a8d" font-size="10">(1,0)</text>
<text x="305" y="290" fill="#f3eed9" font-size="10">0</text>
</svg>
<div class="chart-caption">$e^x$ (oro) e $\ln x$ (salvia) sono inverse: simmetriche rispetto alla bisettrice $y = x$. $e^x$ passa per $(0, 1)$, $\ln$ per $(1, 0)$.</div>
</div>

## La funzione potenza $x^\alpha$

Per $\alpha \in \mathbb{R}$ e $x > 0$:
$$x^\alpha := e^{\alpha \ln x}.$$

(Per $x = 0$: $0^\alpha = 0$ se $\alpha > 0$; $0^0$ è convenzionale, di solito $1$ in combinatorica, indeterminato nei limiti. Per $x < 0$: richiede $\alpha$ razionale a denominatore dispari, o entriamo nei complessi.)

**Proprietà:**
- $x^\alpha x^\beta = x^{\alpha + \beta}$.
- $(x^\alpha)^\beta = x^{\alpha \beta}$.
- $(x y)^\alpha = x^\alpha y^\alpha$.
- Monotonia su $(0, +\infty)$: crescente se $\alpha > 0$, decrescente se $\alpha < 0$, costante (=1) se $\alpha = 0$.

**Confronto tra crescite** (per $x \to +\infty$):
$$\ln x \ll x^\alpha \ll e^{\beta x},$$
per ogni $\alpha, \beta > 0$. Logaritmo cresce più lento di qualunque potenza positiva; l'esponenziale più rapidamente di qualunque potenza.

## Identità da memorizzare

$$e^{x + y} = e^x e^y, \quad e^{-x} = \frac{1}{e^x}, \quad (e^x)^y = e^{x y}$$
$$\ln(xy) = \ln x + \ln y, \quad \ln(x/y) = \ln x - \ln y, \quad \ln(x^\alpha) = \alpha \ln x$$
$$a^x = e^{x \ln a}, \quad \log_a x = \frac{\ln x}{\ln a}$$

## Esercizi

<details>
<summary>Esercizio 1 — Tutto via $e$ e $\ln$</summary>

Riscrivi usando solo $e$ e $\ln$:
(a) $2^x$; (b) $5^{x^2 - 1}$; (c) $\log_3 x$; (d) $x^x$.

**Soluzione.**
(a) $2^x = e^{x \ln 2}$.
(b) $5^{x^2 - 1} = e^{(x^2 - 1) \ln 5}$.
(c) $\log_3 x = \ln x / \ln 3$.
(d) $x^x = e^{x \ln x}$ (per $x > 0$). ∎
</details>

<details>
<summary>Esercizio 2 — Equazioni esponenziali</summary>

Risolvi:
(a) $e^{2x} - 3 e^x + 2 = 0$.
(b) $\ln(x + 1) + \ln(x - 1) = 0$.

**Soluzione.**
(a) Pongo $t = e^x > 0$: $t^2 - 3t + 2 = 0 \Rightarrow t = 1$ o $t = 2$. $e^x = 1 \Rightarrow x = 0$, oppure $e^x = 2 \Rightarrow x = \ln 2$.

(b) Dominio: $x > 1$. $\ln((x+1)(x-1)) = 0 \Rightarrow x^2 - 1 = 1 \Rightarrow x = \sqrt 2$ (solo positivo). ∎
</details>

<details>
<summary>Esercizio 3 — Disequazione</summary>

Risolvi $\ln(x^2 - 4) < \ln(3 x)$.

**Soluzione.** Dominio: $x^2 - 4 > 0$ e $3 x > 0$ → $x > 2$.

$\ln$ è strettamente crescente, quindi $x^2 - 4 < 3 x \Rightarrow x^2 - 3 x - 4 < 0 \Rightarrow (x - 4)(x + 1) < 0 \Rightarrow -1 < x < 4$.

Intersezione col dominio: $2 < x < 4$. ∎
</details>

<details>
<summary>Esercizio 4 — Cambio base</summary>

Calcola $\log_4 32$ esattamente.

**Soluzione.** $32 = 2^5$, $4 = 2^2$. $\log_4 32 = \frac{\ln 32}{\ln 4} = \frac{5 \ln 2}{2 \ln 2} = \frac{5}{2}$. ∎
</details>

<details>
<summary>Esercizio 5 — AM-GM via esponenziale</summary>

Mostra che per $a, b > 0$: $\frac{a^x + b^x}{2} \ge (ab)^{x/2}$.

**Soluzione.** Poni $u = a^{x/2}, v = b^{x/2}$. Disuguaglianza: $(u^2 + v^2)/2 \ge u v$, cioè $(u - v)^2 \ge 0$. Vero. ∎
</details>

## Riassunto in una riga

$e^x$ è "la funzione che è la propria derivata", $\ln x$ è la sua inversa (definita su $(0, +\infty)$), e ogni $a^x$, ogni $\log_a$, ogni $x^\alpha$ si riscrive elegantemente con $e^{\cdot \ln \cdot}$ — è l'algebra esponenziale, la lingua dei tassi di crescita.
