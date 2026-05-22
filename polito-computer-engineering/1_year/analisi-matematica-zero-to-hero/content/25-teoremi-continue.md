---
title: "Teoremi sulle funzioni continue (Weierstrass, valori intermedi)"
area: Continuità
summary: "I **tre pilastri** sulle funzioni continue di una variabile reale. **Bolzano** (zeri di funzioni continue), **Darboux** (valori intermedi), **Weierstrass** (max/min su compatti). Tutti dipendono dalla completezza di $\\mathbb{R}$."
order: 25
level: intermedio
prereq:
  - "Continuità: definizione (sez. 24)"
  - "Bolzano-Weierstrass e compatti (sez. 10, 13)"
tools:
  - "Rudin — *Principles*, cap. 4"
  - "Giusti — *Analisi 1*"
---

# Teoremi sulle funzioni continue (Weierstrass, valori intermedi)

## Mappa del capitolo

Tre teoremi fondamentali, ciascuno legato a una proprietà topologica di $\mathbb{R}$:

1. **Teorema degli zeri (Bolzano)** — dipende dalla **connessione** di un intervallo.
2. **Teorema dei valori intermedi (Darboux)** — corollario del precedente.
3. **Teorema di Weierstrass** — dipende dalla **compattezza** (Heine-Borel).

Senza completezza (es. in $\mathbb{Q}$) tutti e tre falliscono. Sono i teoremi che giustificano l'intuizione "una curva continua che parte sotto zero e arriva sopra zero deve passare per zero".

## Teorema degli zeri (Bolzano)

**Teorema.** Sia $f : [a, b] \to \mathbb{R}$ continua con $f(a) \cdot f(b) < 0$ (cioè $f(a)$ e $f(b)$ hanno segno opposto). Allora esiste $c \in (a, b)$ con $f(c) = 0$.

> **Glossarietto:**
>
> - $[a, b]$ = **intervallo chiuso e limitato** (compatto).
> - $f : [a,b] \to \mathbb{R}$ **continua** = nessun "salto", curva tracciabile senza alzare la matita.
> - $f(a) \cdot f(b) < 0$ = $f(a)$ e $f(b)$ hanno **segno opposto** (uno positivo, l'altro negativo).
> - $c \in (a, b)$ = punto interno (escludiamo gli estremi).
> - **A parole:** se $f$ parte sotto zero e arriva sopra (o viceversa), in mezzo deve toccare lo zero.

*Dim. (per bisezione — algoritmo costruttivo).* Sia WLOG $f(a) < 0 < f(b)$.

Costruiamo $[a_n, b_n]$ con $f(a_n) \le 0$, $f(b_n) \ge 0$, $b_n - a_n = (b - a)/2^n$:
- $[a_0, b_0] = [a, b]$.
- Posto $m_n = (a_n + b_n)/2$: se $f(m_n) = 0$ → fatto. Se $f(m_n) < 0$ → $a_{n+1} = m_n$, $b_{n+1} = b_n$. Se $f(m_n) > 0$ → $a_{n+1} = a_n$, $b_{n+1} = m_n$.

$(a_n)$ crescente limitata, $(b_n)$ decrescente limitata. Per monotone (cap. 13), $a_n \to \alpha$, $b_n \to \beta$. Poiché $b_n - a_n \to 0$, $\alpha = \beta =: c$.

Per continuità (Heine): $f(a_n) \to f(c)$, e dai segni $f(a_n) \le 0$, $f(b_n) \ge 0$ deduciamo $f(c) \le 0 \le f(c)$, quindi $f(c) = 0$. ∎

> **Bonus pratico.** La dimostrazione è un **algoritmo numerico**: ad ogni passo l'errore si dimezza. È il metodo più semplice (e robusto) per trovare zeri di equazioni continue.

<div class="chart">
<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="280" fill="#111a30"/>
  <line x1="40" y1="140" x2="580" y2="140" stroke="#f3eed9" stroke-width="1"/>
  <path d="M 60 240 Q 200 220 320 140 Q 440 60 560 50" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <circle cx="60" cy="240" r="4" fill="#e07a8d"/>
  <circle cx="560" cy="50" r="4" fill="#6fb38a"/>
  <circle cx="320" cy="140" r="5" fill="#d4af37"/>
  <text x="50" y="265" fill="#e07a8d" font-size="13">a, f(a)&lt;0</text>
  <text x="525" y="40" fill="#6fb38a" font-size="13">b, f(b)&gt;0</text>
  <text x="305" y="165" fill="#d4af37" font-size="13" font-style="italic">c</text>
</svg>
<div class="chart-caption">Una funzione continua che cambia segno su $[a, b]$ deve annullarsi: l'intuizione di Bolzano.</div>
</div>

## Teorema dei valori intermedi (Darboux)

**Teorema.** Sia $f : [a, b] \to \mathbb{R}$ continua. Per ogni $\eta$ compreso fra $f(a)$ e $f(b)$, esiste $c \in [a, b]$ con $f(c) = \eta$.

*Dim.* Applichiamo Bolzano a $g(x) = f(x) - \eta$. ∎

**Corollario.** L'immagine continua di un intervallo è un intervallo.

> **Attenzione.** Darboux NON caratterizza la continuità: esistono funzioni discontinue che assumono ogni valore intermedio. (Esempio: $\sin(1/x)$ esteso con 0.) La continuità è strettamente più forte.

## Teorema di Weierstrass

**Teorema.** Sia $f : [a, b] \to \mathbb{R}$ continua, $[a, b]$ chiuso e limitato. Allora $f$ ammette **massimo e minimo**: esistono $x_m, x_M \in [a, b]$ con $f(x_m) \le f(x) \le f(x_M)$ per ogni $x$.

*Dim.*

**Passo 1: $f$ è limitata sopra.** Per assurdo: $\forall n$ esiste $x_n$ con $f(x_n) > n$. $(x_n)$ è in $[a, b]$ compatto: per Bolzano-Weierstrass (cap. 13) ha sottosuccessione $x_{n_k} \to x^* \in [a, b]$. Per continuità, $f(x_{n_k}) \to f(x^*)$ finito. Ma $f(x_{n_k}) > n_k \to +\infty$. Contraddizione.

**Passo 2: il sup è raggiunto.** Sia $M = \sup f$. Per definizione di sup, esiste $(x_n) \subseteq [a, b]$ con $f(x_n) \to M$. Per BW, $x_{n_k} \to x_M \in [a, b]$. Per continuità, $f(x_{n_k}) \to f(x_M)$, ma anche $\to M$. Quindi $f(x_M) = M$. ∎

(Analogo per il minimo.)

> **Lettura strutturale.** [a, b] è compatto $+$ $f$ continua $\Rightarrow$ $f([a, b])$ è compatto, quindi chiuso e limitato, quindi contiene max e min.

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="300" fill="#111a30"/>
  <line x1="60" y1="250" x2="560" y2="250" stroke="#f3eed9" stroke-width="1"/>
  <line x1="60" y1="40" x2="60" y2="270" stroke="#f3eed9" stroke-width="1"/>
  <path d="M 80 200 Q 150 50 230 100 Q 310 160 380 70 Q 460 30 540 230" stroke="#e8a04a" stroke-width="2.5" fill="none"/>
  <line x1="60" y1="40" x2="560" y2="40" stroke="#6fb38a" stroke-dasharray="3,3"/>
  <line x1="60" y1="230" x2="560" y2="230" stroke="#e07a8d" stroke-dasharray="3,3"/>
  <circle cx="450" cy="40" r="5" fill="#6fb38a"/>
  <circle cx="540" cy="230" r="5" fill="#e07a8d"/>
  <text x="20" y="44" fill="#6fb38a" font-size="13" font-style="italic">M</text>
  <text x="20" y="234" fill="#e07a8d" font-size="13" font-style="italic">m</text>
  <text x="75" y="265" fill="#f3eed9" font-size="12" font-style="italic">a</text>
  <text x="535" y="265" fill="#f3eed9" font-size="12" font-style="italic">b</text>
</svg>
<div class="chart-caption">Su $[a, b]$ chiuso e limitato, $f$ continua tocca **sia** il massimo $M$ **sia** il minimo $m$. Valori raggiunti, non solo estremi.</div>
</div>

## Controesempi: tutte le ipotesi servono

1. **Intervallo aperto.** $f(x) = 1/x$ su $(0, 1]$: continua ma non limitata. Manca "chiuso".
2. **Intervallo illimitato.** $f(x) = x$ su $[0, +\infty)$: continua ma senza max. Manca "limitato".
3. **Funzione discontinua.** $f(x) = x$ su $[0, 1)$, $f(1) = 0$: limitata ma senza max. Manca "continua".

## Corollari

**Corollario.** $f([a, b])$ è un intervallo chiuso e limitato $[m, M]$.

**Corollario (continuità dell'inversa).** $f : [a, b] \to \mathbb{R}$ continua e strettamente monotona: $f^{-1}$ continua su $f([a, b])$.

**Corollario (punto fisso 1D).** $f : [0, 1] \to [0, 1]$ continua ha almeno un **punto fisso** $c$ con $f(c) = c$.

*Dim.* $g(x) = f(x) - x$ è continua. $g(0) = f(0) \ge 0$, $g(1) = f(1) - 1 \le 0$. Per Bolzano, esiste $c$ con $g(c) = 0$. ∎

(Versione 1D del teorema di Brouwer.)

## Trappole comuni

- **"Continua ⇒ max raggiunto" senza compattezza è falso.** $\arctan$ su $\mathbb{R}$ non raggiunge $\pi/2$.
- **Darboux non implica continua.** $\sin(1/x)$ esteso a 0: assume ogni valore in $[-1, 1]$ vicino a 0, ma è discontinuo.
- **Sup ≠ max.** Senza Weierstrass, il sup può non essere raggiunto.

## Esercizi

<details>
<summary>Esercizio 1 — Polinomio dispari ha radice reale</summary>

Ogni polinomio di grado dispari ha una radice reale.

**Soluzione.** $p(x)$ grado dispari, $a_n > 0$. $\lim_{+\infty} p = +\infty$, $\lim_{-\infty} = -\infty$. Esistono $A, B$ con $p(A) < 0 < p(B)$. Per Bolzano, $\exists c$ con $p(c) = 0$. ∎
</details>

<details>
<summary>Esercizio 2 — Punto fisso</summary>

$f : [0, 1] \to [0, 2]$ continua. Sempre punto fisso?

**Soluzione.** **No.** $f(x) = x + 1$: continua, $f(c) = c \Rightarrow c + 1 = c$, impossibile. Per garantirlo serve $f([0, 1]) \subseteq [0, 1]$.
</details>

<details>
<summary>Esercizio 3 — Weierstrass su semiretta</summary>

$f : [0, +\infty) \to \mathbb{R}$ continua, $\lim_{x \to +\infty} f = 0$. Allora $f$ ha max o min.

**Soluzione (idea).** Se $f$ non è identica a 0, $\exists x_0$ con $f(x_0) \ne 0$, WLOG $> 0$. Per il limite all'infinito, $\exists R$ con $|f| < f(x_0)/2$ per $x \ge R$. Su $[0, \max(x_0, R)]$ (compatto), Weierstrass dà max $M$. Per $x$ fuori, $|f| < M$. ∎
</details>

<details>
<summary>Esercizio 4 — Iniettiva continua ⇒ monotona</summary>

$f : \mathbb{R} \to \mathbb{R}$ continua e iniettiva. Allora $f$ è strettamente monotona.

**Soluzione (idea).** Se non monotona, $\exists a < b < c$ con $f(a) < f(b) > f(c)$ (o simmetrico). Scelto $\eta$ fra $\max(f(a), f(c))$ e $f(b)$, per Darboux $\exists x_1 \in (a, b)$ e $x_2 \in (b, c)$ con $f(x_1) = f(x_2) = \eta$. Iniettività violata. ∎
</details>

## Riassunto in una riga

**Bolzano** (zeri) + **Darboux** (valori intermedi) + **Weierstrass** (max/min su compatti) sono i tre teoremi che fanno funzionare l'analisi continua — tutti conseguenze della completezza di $\mathbb{R}$, tutti falsi in $\mathbb{Q}$.
