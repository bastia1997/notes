---
title: "Continuità: la definizione e le prime proprietà"
area: Continuità
summary: "La definizione $\\varepsilon$-$\\delta$ di continuità — la condizione \"niente salti\" — e cosa cambia rispetto al limite. Caratterizzazione di Heine, algebra delle continue, composizione, ed esempi guida (Dirichlet ovunque discontinua, $x \\sin(1/x)$ estendibile)."
order: 24
level: intermedio
prereq:
  - "Limiti di funzioni (sez. 20-22)"
  - "Bolzano–Weierstrass (sez. 13)"
tools:
  - "Rudin — *Principles*, cap. 4"
  - "Giusti — *Analisi 1*"
---

# Continuità: la definizione e le prime proprietà

## Perché la continuità

Il limite descrive cosa succede *avvicinandosi* a un punto. La **continuità** è la condizione minima per cui quel comportamento al limite **coincide col valore della funzione in quel punto**: niente salti, niente strappi.

Tutto il calcolo differenziale e integrale poggia sulla continuità. È la classe di funzioni più piccola dove ha senso scrivere "scambio limite e funzione".

## Definizione $\varepsilon$-$\delta$

Sia $f : D \to \mathbb{R}$, $x_0 \in D$.

**Definizione.** $f$ è **continua in $x_0$** se
$$\forall \varepsilon > 0,\ \exists \delta > 0 : \forall x \in D,\ |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon.$$

> **Glossarietto:**
>
> - **Confronto con il limite (cap. 20):** identica struttura, ma manca "$0 < |x - x_0|$" — qui includiamo $x = x_0$ (anche se è un caso banale).
> - $x_0$ deve **appartenere a $D$** (a differenza del limite, dove poteva essere fuori).
> - Se $x_0$ è **isolato** in $D$, $f$ è automaticamente continua in $x_0$ (basta $\delta$ così piccolo da escludere ogni altro punto).

**Relazione col limite.** Se $x_0$ è di accumulazione di $D$:
$$f \text{ continua in } x_0 \iff \lim_{x \to x_0} f(x) = f(x_0).$$

**Continuità su un insieme.** $f$ continua su $A$ se è continua in ogni punto di $A$. Notazione: $f \in C(A)$ o $f \in C^0(A)$.

## Caratterizzazione sequenziale (Heine)

**Teorema (Heine).** $f$ continua in $x_0$ $\iff$ per ogni $(x_n) \subseteq D$ con $x_n \to x_0$, $f(x_n) \to f(x_0)$.

*Dim.* Stessa di cap. 20 con $L = f(x_0)$. ∎

> **Importanza:** Heine permette di "trasportare" proprietà di successioni (limiti, Bolzano-Weierstrass) a funzioni continue. Ponte fondamentale.

<div class="chart">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="320" fill="#111a30"/>
  <line x1="40" y1="280" x2="580" y2="280" stroke="#f3eed9" stroke-width="1"/>
  <line x1="60" y1="20" x2="60" y2="300" stroke="#f3eed9" stroke-width="1"/>
  <rect x="220" y="40" width="160" height="240" fill="#6aa9d8" fill-opacity="0.18"/>
  <rect x="40" y="140" width="540" height="60" fill="#d4af37" fill-opacity="0.18"/>
  <path d="M 60 260 Q 200 80 300 170 T 580 100" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <circle cx="300" cy="170" r="4" fill="#f3eed9"/>
  <text x="296" y="300" fill="#f3eed9" font-size="14" font-family="serif" font-style="italic">x₀</text>
  <text x="222" y="300" fill="#6aa9d8" font-size="13">x₀−δ</text>
  <text x="345" y="300" fill="#6aa9d8" font-size="13">x₀+δ</text>
  <text x="10" y="145" fill="#d4af37" font-size="13" font-style="italic">f(x₀)+ε</text>
  <text x="10" y="205" fill="#d4af37" font-size="13" font-style="italic">f(x₀)−ε</text>
  <text x="10" y="174" fill="#f3eed9" font-size="13" font-style="italic">f(x₀)</text>
</svg>
<div class="chart-caption">Banda orizzontale di altezza $2\varepsilon$ attorno a $f(x_0)$: la continuità richiede che esista una banda verticale di larghezza $2\delta$ attorno a $x_0$ tale che il grafico stia tutto dentro la banda gialla.</div>
</div>

## Algebra delle continue

**Teorema.** Se $f, g : D \to \mathbb{R}$ sono continue in $x_0$, allora:

1. $f + g$, $\lambda f$, $fg$ sono continue in $x_0$.
2. $f/g$ è continua in $x_0$ se $g(x_0) \ne 0$.
3. $|f|$ è continua.

**Composizione.** Se $f : D \to E$ continua in $x_0$ e $g : E \to \mathbb{R}$ continua in $f(x_0)$, allora $g \circ f$ è continua in $x_0$.

(Dimostrazioni come per i limiti.)

**Corollario.** **Polinomi, razionali, esponenziali, logaritmi, trigonometriche** (e loro combinazioni, dove definite) sono continue. È il pane quotidiano dell'analisi.

## Esempi guida

### 1. Polinomi: continui ovunque

Per induzione su grado, usando $\lim x = x_0$, e algebra delle continue.

*Dim. diretta per $f(x) = x^2$.* $|x^2 - x_0^2| = |x - x_0| \cdot |x + x_0|$. Restringendo a $|x - x_0| < 1$: $|x + x_0| < 1 + 2|x_0|$. Quindi basta $\delta = \min(1, \varepsilon/(1 + 2|x_0|))$.

### 2. Funzione di Dirichlet: ovunque discontinua

$$\chi_\mathbb{Q}(x) = \begin{cases} 1 & x \in \mathbb{Q} \\ 0 & x \notin \mathbb{Q} \end{cases}$$

**Discontinua in ogni $x_0$.**

*Dim.* Per densità, esiste $(r_n) \to x_0$ con $r_n \in \mathbb{Q}$ (allora $\chi(r_n) = 1$) e $(s_n) \to x_0$ con $s_n \notin \mathbb{Q}$ (allora $\chi(s_n) = 0$). Per Heine, $\chi$ continua dovrebbe avere $\chi(r_n), \chi(s_n) \to \chi(x_0)$, ma uno tende a 1 e l'altro a 0. Assurdo. ∎

### 3. $f(x) = x \sin(1/x)$: estendibile per continuità in 0

$f$ è definita per $x \ne 0$ e ivi continua. In 0 non è definita, ma
$$\lim_{x \to 0} x \sin(1/x) = 0$$
(per carabinieri, $|x \sin(1/x)| \le |x|$).

Definendo $\tilde f(0) = 0$, otteniamo un'estensione continua. Si dice che $0$ è una **discontinuità eliminabile** (cap. 27).

<div class="chart">
<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="280" fill="#111a30"/>
  <line x1="40" y1="140" x2="580" y2="140" stroke="#f3eed9" stroke-width="1"/>
  <line x1="300" y1="20" x2="300" y2="260" stroke="#f3eed9" stroke-width="1"/>
  <path d="M 40 60 Q 300 140 580 220" stroke="#6fb38a" stroke-width="1" fill="none" opacity="0.5"/>
  <path d="M 40 220 Q 300 140 580 60" stroke="#6fb38a" stroke-width="1" fill="none" opacity="0.5"/>
  <path d="M 50 75 Q 80 200 110 80 Q 140 195 170 90 Q 200 190 230 100 Q 260 180 290 130 L 300 140 L 310 150 Q 340 100 370 180 Q 400 90 430 190 Q 460 80 490 200 Q 520 70 550 205" stroke="#e8a04a" stroke-width="2" fill="none"/>
  <text x="540" y="60" fill="#6fb38a" font-size="12" font-style="italic">y = x</text>
  <text x="540" y="235" fill="#6fb38a" font-size="12" font-style="italic">y = −x</text>
</svg>
<div class="chart-caption">$f(x) = x \sin(1/x)$ (arancio) racchiusa fra $y = \pm x$ (verdi). L'oscillazione si "stringe" verso 0, garantendo il limite nullo.</div>
</div>

## Funzioni continue notevoli

| funzione | dominio | continua? |
|---|---|---|
| $\chi_\mathbb{Q}$ | $\mathbb{R}$ | **mai** |
| $\lfloor x \rfloor$ | $\mathbb{R}$ | sì tranne in $\mathbb{Z}$ |
| $\text{sgn}(x)$ | $\mathbb{R}$ | sì tranne in 0 |
| $x \sin(1/x)$ esteso a 0 | $\mathbb{R}$ | sì ovunque |
| $\sin(1/x)$ | $\mathbb{R} \setminus \{0\}$ | sì su dominio, NON estendibile |
| Riemann $R(x)$ | $\mathbb{R}$ | continua negli irrazionali, discontinua nei razionali |

> **Riemann notevole.** $R(p/q) = 1/q$ (frazione ridotta), $R(\text{irr}) = 0$. Continua **solo** sugli irrazionali. È un esempio "patologico" ma utile.

## Trappole comuni

- **"Continua su un denso ⇒ continua ovunque": FALSO.** Dirichlet vale 0 sugli irrazionali densi ma è discontinua ovunque.
- **Limite esiste ≠ continua.** Il limite può esistere ma essere diverso da $f(x_0)$ (discontinuità eliminabile).
- **Continua non implica derivabile.** $|x|$ è continua in 0 ma non derivabile (cap. 28).

## Esercizi

<details>
<summary>Esercizio 1 — Continuità di $\sqrt x$</summary>

Mostra che $f(x) = \sqrt x$ è continua in $x_0 \ge 0$.

**Soluzione.** Per $x_0 > 0$, razionalizzo: $|\sqrt x - \sqrt{x_0}| = |x - x_0|/(\sqrt x + \sqrt{x_0}) \le |x - x_0|/\sqrt{x_0}$. $\delta = \varepsilon \sqrt{x_0}$. Per $x_0 = 0$: $\delta = \varepsilon^2$. ∎
</details>

<details>
<summary>Esercizio 2 — Continua tranne in un punto</summary>

$f(x) = x$ se $x \ne 1$, $f(1) = 7$. Dove è continua?

**Soluzione.** Ovunque tranne 1. In 1: $\lim_{x \to 1} f = 1 \ne 7 = f(1)$. ∎
</details>

<details>
<summary>Esercizio 3 — Heine al contrario</summary>

Se $f(x_n) \to f(0)$ per ogni $x_n \to 0$ con $x_n > 0$, $f$ è continua in 0?

**Soluzione.** **No.** Heine richiede tutte le successioni. Controesempio: $f(x) = 0$ per $x \ge 0$, $f(x) = 1$ per $x < 0$. ∎
</details>

<details>
<summary>Esercizio 4 — Riemann sugli irrazionali</summary>

Mostra che $R$ è continua in ogni irrazionale.

**Soluzione.** Sia $x_0$ irrazionale, $\varepsilon > 0$. In $[x_0 - 1, x_0 + 1]$ ci sono solo finiti razionali $p/q$ con $1/q \ge \varepsilon$ (cioè $q \le 1/\varepsilon$). Sia $\delta$ la distanza minima da $x_0$ a tali razionali ($> 0$ perché $x_0$ irrazionale). Per $|x - x_0| < \delta$: se $x$ irrazionale, $R(x) = 0$; se $x = p/q$, $q > 1/\varepsilon$ → $R(x) = 1/q < \varepsilon$. ∎
</details>

<details>
<summary>Esercizio 5 — Sin(1/x) non estendibile</summary>

Si può estendere $\sin(1/x)$ a una funzione continua su $\mathbb{R}$?

**Soluzione.** No. $x_n = 1/(\pi/2 + 2 n \pi) \to 0$ dà $f(x_n) = 1$, $y_n = 1/(-\pi/2 + 2 n \pi) \to 0$ dà $f(y_n) = -1$. Per Heine, $\lim_{x \to 0}$ non esiste. ∎
</details>

> **Pillola.** Per dimostrare $f$ continua in $x_0$, cerca una stima $|f(x) - f(x_0)| \le C |x - x_0|^\alpha$ — se la trovi (lipschitz/Hölder), la continuità è gratuita: $\delta = (\varepsilon/C)^{1/\alpha}$.

## Riassunto in una riga

$f$ continua in $x_0$ significa "$\lim_{x \to x_0} f(x) = f(x_0)$" — il valore della funzione coincide col limite — e i polinomi/razionali/esp/log/trigo sono tutte continue dove definite, mentre la Dirichlet è il prototipo di funzione "patologicamente discontinua ovunque".
