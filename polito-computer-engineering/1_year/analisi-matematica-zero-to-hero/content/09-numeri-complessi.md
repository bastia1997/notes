---
title: Numeri complessi
area: Numeri complessi
summary: "$\\mathbb{C}$ è \"$\\mathbb{R}$ con un nuovo numero $i$ che soddisfa $i^2 = -1$\". Cosa cambia, perché serve, e come la trigonometria si semplifica in algebra grazie alla **formula di Eulero** $e^{i\\theta} = \\cos\\theta + i \\sin\\theta$."
order: 9
level: intermedio
prereq:
  - "Numeri reali (sez. 06)"
  - "Trigonometria di base (seno, coseno)"
tools:
  - "Ahlfors — *Complex Analysis*, cap. 1"
  - "Spiegel — *Variabili complesse* (Schaum)"
  - "Marcellini-Sbordone, vol. 1, cap. complessi"
---

# Numeri complessi

## Perché parlarne

In $\mathbb{R}$ l'equazione
$$x^2 + 1 = 0$$
non ha soluzione: ogni quadrato è $\ge 0$ (sez. 06), quindi $x^2 + 1 \ge 1 > 0$ per ogni $x$ reale.

Estendendo i numeri da $\mathbb{R}$ a $\mathbb{C}$, otteniamo una proprietà magnifica: **ogni polinomio di grado positivo ha una radice** (Teorema fondamentale dell'algebra). E in più $\mathbb{C}$ è la naturale ambientazione per:
- **Analisi armonica** (Fourier, segnali, audio, MP3).
- **Fisica quantistica** (la funzione d'onda è a valori complessi).
- **Geometria piana** (la moltiplicazione complessa è rotazione + scala).

Vale la pena fissare le idee con cura.

## La costruzione: $\mathbb{C} = \mathbb{R}^2$ con un prodotto

**Definizione.** $\mathbb{C} := \mathbb{R}^2$ (insieme di coppie ordinate di reali) con queste operazioni:

- **Somma**: $(a, b) + (c, d) := (a + c,\ b + d)$ — componente per componente.
- **Prodotto**: $(a, b) \cdot (c, d) := (a c - b d,\ a d + b c)$.

> **Glossarietto della definizione di prodotto:**
>
> - $(a, b)$ e $(c, d)$ sono due elementi di $\mathbb{C}$, scritti come coppie di reali.
> - La regola del prodotto è: prima componente = "moltiplica i primi e sottrai il prodotto dei secondi" ($ac - bd$); seconda componente = "incrocia" ($ad + bc$).
> - Sembra strana, ma il motivo (vedremo subito) è far sì che $(0, 1) \cdot (0, 1) = (-1, 0)$, cioè un numero il cui quadrato è $-1$.

Lo zero è $(0, 0)$, l'uno è $(1, 0)$.

### L'unità immaginaria

**Definizione.** $i := (0, 1)$. Calcoliamo $i^2$:
$$i \cdot i = (0, 1) \cdot (0, 1) = (0 \cdot 0 - 1 \cdot 1,\ 0 \cdot 1 + 1 \cdot 0) = (-1, 0).$$
Identificando $(-1, 0)$ con il reale $-1$, otteniamo **$i^2 = -1$**.

### $\mathbb{R}$ vive dentro $\mathbb{C}$

Identifichiamo il reale $a \in \mathbb{R}$ con la coppia $(a, 0) \in \mathbb{C}$. Verifica:
- Somma: $(a, 0) + (c, 0) = (a + c, 0) \leftrightarrow a + c$. ✓
- Prodotto: $(a, 0) \cdot (c, 0) = (a c, 0) \leftrightarrow a c$. ✓

Quindi $\mathbb{R} \subseteq \mathbb{C}$ è un sottoinsieme che si comporta esattamente come il "vecchio" $\mathbb{R}$.

### Forma algebrica

Ogni $(a, b) \in \mathbb{C}$ si può scrivere così:
$$(a, b) = (a, 0) + (0, b) = (a, 0) + (b, 0) \cdot (0, 1) = a + b \cdot i = a + b i.$$

Quindi scriviamo $z = a + b i$ con
- $a = \operatorname{Re}(z)$ = **parte reale** di $z$,
- $b = \operatorname{Im}(z)$ = **parte immaginaria** di $z$ (notare: è un numero **reale**, è il coefficiente di $i$).

> **Glossarietto:**
>
> - $\operatorname{Re}(z)$, $\operatorname{Im}(z)$ = parti reale e immaginaria. Esempio: $z = 3 - 7i$, $\operatorname{Re}(z) = 3$, $\operatorname{Im}(z) = -7$ (non $-7i$).
> - $i$ = unità immaginaria; soddisfa $i^2 = -1$.

### Aritmetica concreta

Le regole funzionano come per i polinomi, ricordandosi che $i^2 = -1$:

- **Somma**: $(a + b i) + (c + d i) = (a + c) + (b + d) i$.
- **Prodotto**: $(a + b i)(c + d i) = ac + a d i + b c i + b d i^2 = (a c - b d) + (a d + b c) i$.

(Nessuna magia: distributiva ordinaria, più $i^2 = -1$.)

## $\mathbb{C}$ è un campo

**Teorema.** $(\mathbb{C}, +, \cdot)$ è un **campo** (sez. 06).

Le proprietà associativa, commutativa, distributiva si verificano con un po' di calcolo. L'unico punto interessante è **l'inverso moltiplicativo**.

Sia $z = a + b i$ con $z \ne 0$ (cioè $(a, b) \ne (0, 0)$, cioè $a^2 + b^2 > 0$). Definiamo
$$z^{-1} := \frac{a - b i}{a^2 + b^2}.$$

> **Glossarietto:** sopra-fratto-sotto significa "diviso", cioè moltiplicare il numeratore per l'inverso del denominatore (che qui è un reale positivo, quindi semplice).

*Verifica.* $z \cdot z^{-1} = \dfrac{(a + bi)(a - bi)}{a^2 + b^2} = \dfrac{a^2 - (bi)^2}{a^2 + b^2} = \dfrac{a^2 + b^2}{a^2 + b^2} = 1$. ✓

> **Trucco operativo.** Per dividere $z/w$ in pratica: moltiplichi numeratore e denominatore per il **coniugato** del denominatore (definito tra poco), così il denominatore diventa reale.

### $\mathbb{C}$ **non** è ordinabile

A differenza di $\mathbb{R}$, in $\mathbb{C}$ non c'è un ordine $\le$ compatibile con le operazioni.

*Dim.* Per assurdo, supponiamo che ci sia un tale ordine. Allora $i > 0$ oppure $i < 0$ (totalità).

- Se $i > 0$: $i \cdot i > 0 \cdot i = 0$ (compatibilità prodotto). Ma $i \cdot i = -1 < 0$. Contraddizione.
- Se $i < 0$: $-i > 0$, e $(-i)(-i) > 0$. Ma $(-i)(-i) = i^2 = -1 < 0$. Contraddizione.

Quindi non c'è ordine compatibile. ∎

> **Conseguenza.** Non scrivere mai "$z < w$" per complessi. Si può confrontare $|z|$ e $|w|$ (numeri reali), questo sì.

## Coniugato e modulo

**Coniugato.** $\overline{z} := a - b i$. Geometricamente: la riflessione di $z$ rispetto all'asse reale.

> **Glossarietto:** la barra sopra $z$, $\bar z$, è la notazione standard. Non confondere con la barra che indica "media" o altre operazioni.

Proprietà:
- $\overline{z + w} = \bar z + \bar w$, $\overline{z w} = \bar z \cdot \bar w$.
- $\overline{\overline{z}} = z$ (coniugare due volte ritorna allo stesso numero).
- $z + \bar z = 2 \operatorname{Re}(z)$, $z - \bar z = 2 i \operatorname{Im}(z)$.
- $z \cdot \bar z = (a + b i)(a - b i) = a^2 + b^2 \ge 0$, sempre reale.

**Modulo.** $|z| := \sqrt{a^2 + b^2} = \sqrt{z \cdot \bar z}$.

> **Glossarietto:** $|z|$ è la **lunghezza del vettore $(a, b)$** nel piano. Generalizza il valore assoluto reale: per $z = a + 0 i$ reale, $|z| = \sqrt{a^2} = |a|$.

Proprietà:
- $|z| \ge 0$, e $|z| = 0 \iff z = 0$.
- $|z w| = |z| \cdot |w|$ (il modulo è moltiplicativo).
- **Disuguaglianza triangolare**: $|z + w| \le |z| + |w|$.

*Dim. di $|zw| = |z||w|$:* $|zw|^2 = (zw) \overline{(zw)} = z w \bar z \bar w = (z \bar z)(w \bar w) = |z|^2 |w|^2$. Radice. ∎

*Dim. della triangolare:* $|z+w|^2 = (z+w)(\bar z + \bar w) = z \bar z + w \bar w + z \bar w + \bar z w = |z|^2 + |w|^2 + 2 \operatorname{Re}(z \bar w)$.

Poiché $\operatorname{Re}(\zeta) \le |\zeta|$ per ogni $\zeta \in \mathbb{C}$, e $|z \bar w| = |z| |w|$:
$$|z + w|^2 \le |z|^2 + |w|^2 + 2 |z| |w| = (|z| + |w|)^2.$$
Estraendo radice (entrambi i membri $\ge 0$): $|z + w| \le |z| + |w|$. ∎

## Forma trigonometrica e polare

Un complesso $z = a + b i \ne 0$ può anche essere descritto in **coordinate polari**:
- $r = |z|$ = distanza dall'origine,
- $\theta = \arg z$ = angolo (misurato dall'asse reale positivo, in senso antiorario).

In simboli:
$$z = r (\cos \theta + i \sin \theta).$$

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="300" fill="#111a30"/>
  <line x1="300" y1="20" x2="300" y2="280" stroke="#f3eed9" stroke-width="1"/>
  <line x1="30" y1="150" x2="570" y2="150" stroke="#f3eed9" stroke-width="1"/>
  <text x="580" y="155" fill="#f3eed9" font-family="serif" font-size="13">Re</text>
  <text x="305" y="20" fill="#f3eed9" font-family="serif" font-size="13">Im</text>
  <line x1="300" y1="150" x2="450" y2="60" stroke="#d4af37" stroke-width="2"/>
  <circle cx="450" cy="60" r="4" fill="#d4af37"/>
  <text x="460" y="55" fill="#d4af37" font-family="serif" font-size="14">z = a + bi</text>
  <line x1="450" y1="60" x2="450" y2="150" stroke="#6fb38a" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="450" y1="60" x2="300" y2="60" stroke="#6fb38a" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="450" y="170" fill="#6fb38a" font-family="serif" font-size="13" text-anchor="middle">a</text>
  <text x="285" y="65" fill="#6fb38a" font-family="serif" font-size="13" text-anchor="end">b</text>
  <text x="370" y="100" fill="#d4af37" font-family="serif" font-size="13">r = |z|</text>
  <path d="M 340 150 A 40 40 0 0 0 326 124" fill="none" stroke="#e07a8d" stroke-width="2"/>
  <text x="355" y="135" fill="#e07a8d" font-family="serif" font-size="14">θ</text>
</svg>
<div class="chart-caption">Il piano di Argand–Gauss: $z = a + b i = r(\cos\theta + i \sin\theta)$ con $r = |z|$ e $\theta = \arg z$.</div>
</div>

> **Glossarietto:**
>
> - $r$ = $|z|$ = modulo = **lunghezza** del segmento dall'origine a $z$.
> - $\theta$ = $\arg z$ = **angolo** (in radianti) tra l'asse reale positivo e il segmento da $0$ a $z$.
> - L'argomento è definito **modulo $2\pi$**: aggiungere $2\pi$ non cambia la posizione di $z$.
> - **Argomento principale**: si sceglie $\theta \in (-\pi, \pi]$ come rappresentante canonico, notato $\operatorname{Arg}(z)$.

### Moltiplicazione in polare: l'idea-chiave

Siano $z_1 = r_1 (\cos\theta_1 + i \sin\theta_1)$ e $z_2 = r_2 (\cos\theta_2 + i \sin\theta_2)$. Calcoliamo il prodotto usando le formule di addizione trigonometriche:
$$z_1 z_2 = r_1 r_2 \left[(\cos\theta_1\cos\theta_2 - \sin\theta_1\sin\theta_2) + i(\cos\theta_1\sin\theta_2 + \sin\theta_1\cos\theta_2)\right]$$
$$= r_1 r_2 \big(\cos(\theta_1 + \theta_2) + i \sin(\theta_1 + \theta_2)\big).$$

**Risultato luminoso.** Moltiplicare due complessi = moltiplicare i moduli + sommare gli argomenti.

> **Tradotto.** Moltiplicare per un complesso $z$ di modulo 1 = **ruotare** di $\arg z$ nel piano. Moltiplicare per un complesso $z$ con $|z| = r$ = ruotare di $\arg z$ + scalare di un fattore $r$.

### Formula di De Moivre

Per induzione su $n$ (cap. 03):
$$z^n = r^n \big(\cos(n \theta) + i \sin(n \theta)\big), \qquad n \in \mathbb{Z}.$$

Cioè: elevare a potenza $n$ = elevare il modulo a $n$ + moltiplicare l'angolo per $n$.

## Formula di Eulero

**Teorema (Eulero).**
$$e^{i \theta} = \cos\theta + i \sin\theta.$$

Una delle formule più belle della matematica. La spieghiamo brevemente.

**Derivazione (informale, via serie).** Le serie convergenti definiscono $e^z, \cos z, \sin z$ anche per argomenti complessi:
$$e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!}, \quad \cos z = \sum_{n=0}^{\infty} \frac{(-1)^n z^{2 n}}{(2 n)!}, \quad \sin z = \sum_{n=0}^{\infty} \frac{(-1)^n z^{2 n + 1}}{(2 n + 1)!}.$$

Sostituiamo $z = i \theta$ in $e^z$:
$$e^{i \theta} = \sum_{n=0}^{\infty} \frac{(i \theta)^n}{n!} = \sum_{n=0}^{\infty} \frac{i^n \theta^n}{n!}.$$

Le potenze di $i$ sono cicliche con periodo 4: $i^0 = 1$, $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$, …

Separiamo le potenze pari ($n = 2 k$, $i^{2 k} = (-1)^k$) dalle dispari ($n = 2 k + 1$, $i^{2 k + 1} = (-1)^k i$):
$$e^{i \theta} = \underbrace{\sum_k \frac{(-1)^k \theta^{2 k}}{(2 k)!}}_{= \cos\theta} + i \underbrace{\sum_k \frac{(-1)^k \theta^{2 k + 1}}{(2 k + 1)!}}_{= \sin\theta} = \cos\theta + i \sin\theta. \quad \blacksquare$$

### Forma esponenziale

Per $z \ne 0$, scriviamo
$$z = r \, e^{i \theta}.$$

**Moltiplicazione:** $z_1 z_2 = r_1 r_2 \, e^{i (\theta_1 + \theta_2)}$. Le regole degli esponenziali "funzionano" come per i reali.

### L'identità di Eulero (caso $\theta = \pi$)

$$e^{i \pi} + 1 = 0.$$

Una sola formula con **cinque costanti fondamentali** della matematica: $e$, $i$, $\pi$, $1$, $0$. È universalmente considerata "la formula più bella della matematica".

## Radici $n$-esime

**Problema.** Dato $w \in \mathbb{C}$ non nullo, trovare tutti i $z \in \mathbb{C}$ con $z^n = w$.

In $\mathbb{R}$ questo problema ha al più 1 o 2 soluzioni. In $\mathbb{C}$ ne ha **sempre esattamente $n$**.

Scriviamo $w = R \, e^{i \varphi}$ e $z = r \, e^{i \theta}$. Allora $z^n = r^n e^{i n \theta}$. L'equazione $z^n = w$ richiede:

- $r^n = R$, cioè $r = R^{1/n}$ (radice $n$-esima reale di $R > 0$, unica).
- $n \theta = \varphi + 2 k \pi$ per un intero $k$, cioè $\theta = \dfrac{\varphi + 2 k \pi}{n}$.

Variando $k = 0, 1, 2, \dots, n - 1$ otteniamo **$n$ argomenti distinti** modulo $2\pi$. Per $k = n$ si ricomincia.

Quindi le radici $n$-esime di $w$ sono:
$$z_k = R^{1/n} \, e^{i (\varphi + 2 k \pi) / n}, \qquad k = 0, 1, \dots, n - 1.$$

Geometricamente: i **vertici di un poligono regolare di $n$ lati** centrato nell'origine, di raggio $R^{1/n}$.

### Esempio: radici cubiche di $-8$

$w = -8 = 8 \, e^{i \pi}$ ($R = 8$, $\varphi = \pi$). Le radici cubiche sono $z_k = 8^{1/3} e^{i (\pi + 2 k \pi)/3} = 2 e^{i (\pi + 2 k \pi)/3}$ per $k = 0, 1, 2$:

- $z_0 = 2 e^{i \pi/3} = 2 (\cos(\pi/3) + i \sin(\pi/3)) = 2 \left(\frac 1 2 + i \frac{\sqrt 3}{2}\right) = 1 + i \sqrt 3$.
- $z_1 = 2 e^{i \pi} = -2$.
- $z_2 = 2 e^{i 5 \pi / 3} = 2 \left(\frac 1 2 - i \frac{\sqrt 3}{2}\right) = 1 - i \sqrt 3$.

Verifica per $z_0$: $(1 + i\sqrt 3)^2 = 1 - 3 + 2 i \sqrt 3 = -2 + 2 i \sqrt 3$. Poi $(1 + i\sqrt 3)^3 = (-2 + 2 i \sqrt 3)(1 + i\sqrt 3) = -2 - 2 i \sqrt 3 + 2 i \sqrt 3 + 2 i^2 \cdot 3 = -2 - 6 = -8$. ✓

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="300" fill="#111a30"/>
  <line x1="300" y1="20" x2="300" y2="280" stroke="#f3eed9" stroke-width="1"/>
  <line x1="30" y1="150" x2="570" y2="150" stroke="#f3eed9" stroke-width="1"/>
  <circle cx="300" cy="150" r="100" fill="none" stroke="#6fb38a" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="300" y1="150" x2="350" y2="63" stroke="#d4af37" stroke-width="2"/>
  <circle cx="350" cy="63" r="4" fill="#d4af37"/>
  <text x="360" y="55" fill="#d4af37" font-family="serif" font-size="13">z₀ = 1+i√3</text>
  <line x1="300" y1="150" x2="200" y2="150" stroke="#d4af37" stroke-width="2"/>
  <circle cx="200" cy="150" r="4" fill="#d4af37"/>
  <text x="170" y="170" fill="#d4af37" font-family="serif" font-size="13">z₁ = −2</text>
  <line x1="300" y1="150" x2="350" y2="237" stroke="#d4af37" stroke-width="2"/>
  <circle cx="350" cy="237" r="4" fill="#d4af37"/>
  <text x="360" y="245" fill="#d4af37" font-family="serif" font-size="13">z₂ = 1−i√3</text>
  <polygon points="350,63 200,150 350,237" fill="#d4af37" fill-opacity="0.1" stroke="#d4af37" stroke-width="1"/>
  <text x="100" y="40" fill="#f3eed9" font-family="serif" font-size="14">Radici cubiche di −8</text>
  <text x="100" y="60" fill="#f3eed9" font-family="serif" font-size="12">vertici di un triangolo equilatero</text>
  <text x="100" y="75" fill="#f3eed9" font-family="serif" font-size="12">sul cerchio di raggio 2</text>
</svg>
<div class="chart-caption">Le tre radici cubiche di $-8$ formano un triangolo equilatero inscritto nel cerchio di raggio 2.</div>
</div>

### Radici $n$-esime dell'unità

Caso speciale $w = 1$: $1 = e^{i \cdot 0}$, quindi
$$\omega_k = e^{2 \pi i k / n}, \qquad k = 0, 1, \dots, n - 1.$$

> **Glossarietto.** $\omega$ ("omega") è la lettera greca usata per indicare convenzionalmente le radici dell'unità.

Per $n = 4$: $\omega_0 = 1$, $\omega_1 = i$, $\omega_2 = -1$, $\omega_3 = -i$. Vertici di un quadrato.

**Proprietà.** La somma di tutte le radici $n$-esime dell'unità (per $n \ge 2$) è zero:
$$\sum_{k=0}^{n - 1} \omega_k = 0.$$
(Serie geometrica: $\sum_{k=0}^{n-1} \omega^k = \frac{\omega^n - 1}{\omega - 1} = 0$ se $\omega \ne 1$ e $\omega^n = 1$.)

## Teorema fondamentale dell'algebra

**Teorema (TFA).** Ogni polinomio non costante a coefficienti complessi
$$p(z) = a_n z^n + a_{n-1} z^{n-1} + \dots + a_1 z + a_0, \quad a_n \ne 0,\ n \ge 1,$$
ha (almeno) una radice in $\mathbb{C}$.

**Corollario.** Ogni polinomio di grado $n$ ha **esattamente $n$ radici** in $\mathbb{C}$ (contate con molteplicità).

> **Significato.** Aggiungendo *un solo* nuovo numero ($i$, con $i^2 = -1$) abbiamo "risolto" ogni equazione polinomiale di qualunque grado. Niente è gratis: poteva andare male e invece ha funzionato magnificamente.

*Idea della dim. (sketch — la dimostrazione completa richiede strumenti di analisi complessa).*

1. Per $|z|$ grande, $|p(z)| \approx |a_n| |z|^n \to +\infty$. Quindi $|p|$ ha un minimo su un disco grande $D_R$.
2. Per continuità, il minimo è raggiunto in qualche $z_0 \in D_R$.
3. Se $p(z_0) \ne 0$, si dimostra (sviluppando $p$ attorno a $z_0$) che si può trovare $z_1$ vicino a $z_0$ con $|p(z_1)| < |p(z_0)|$, contraddicendo la minimalità.
4. Quindi $p(z_0) = 0$. ∎

**Dimostrazioni alternative**: via teorema di Liouville (se $p$ non ha zeri, $1/p$ è intera e limitata, quindi costante per Liouville), via grado topologico, eccetera.

## Esempi e calcoli rapidi

**1.** $(1 + i)(1 - i) = 1 - i^2 = 1 - (-1) = 2$.

**2.** $|1 + i| = \sqrt{1 + 1} = \sqrt 2$. $\arg(1 + i) = \pi/4$ (primo quadrante, angolo a 45°). Quindi $1 + i = \sqrt 2 \, e^{i \pi/4}$.

**3.** $(1 + i)^8 = (\sqrt 2)^8 \, e^{i \cdot 8 \cdot \pi/4} = 16 \cdot e^{i 2 \pi} = 16 \cdot 1 = 16$.

**4.** Risolvere $z^2 = i$. $i = e^{i \pi/2}$. Radici: $z_0 = e^{i \pi/4} = \frac{\sqrt 2}{2}(1 + i)$ e $z_1 = e^{i 5\pi/4} = -\frac{\sqrt 2}{2}(1 + i)$.

**5.** Formule di **Eulero per seno e coseno**: invertendo $e^{i \theta} = \cos\theta + i \sin\theta$ e $e^{-i\theta} = \cos\theta - i \sin\theta$:
$$\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}, \qquad \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2 i}.$$

(Estendibili a $\theta \in \mathbb{C}$. Utilissime in trigonometria computazionale.)

## Esercizi

<details>
<summary>Esercizio 1 — Calcolo polare</summary>

Scrivi $z = -\sqrt 3 + i$ in forma esponenziale e calcola $z^{10}$.

**Soluzione.** $|z| = \sqrt{3 + 1} = 2$. Per l'argomento: $z$ sta nel secondo quadrante ($\operatorname{Re} = -\sqrt 3 < 0$, $\operatorname{Im} = 1 > 0$). $\tan(\arg z) = 1 / (-\sqrt 3) = -1/\sqrt 3$, e nel secondo quadrante $\arg z = \pi - \pi/6 = 5\pi/6$. Quindi
$$z = 2 \, e^{i 5\pi/6}.$$
$z^{10} = 2^{10} e^{i \cdot 10 \cdot 5\pi/6} = 1024 \, e^{i \cdot 25\pi/3} = 1024 \, e^{i (25 \pi/3 - 8\pi)} = 1024 \, e^{i \pi/3} = 1024 \cdot \left(\frac 1 2 + i \frac{\sqrt 3}{2}\right) = 512 + 512 i \sqrt 3$.
</details>

<details>
<summary>Esercizio 2 — Radici quinte di 1</summary>

Trova tutte le radici di $z^5 = 1$.

**Soluzione.** $\omega_k = e^{2\pi i k / 5}$ per $k = 0, 1, 2, 3, 4$:

- $\omega_0 = 1$.
- $\omega_1 = \cos(72°) + i \sin(72°) \approx 0.309 + 0.951 i$.
- $\omega_2 \approx -0.809 + 0.588 i$.
- $\omega_3 = \overline{\omega_2} \approx -0.809 - 0.588 i$.
- $\omega_4 = \overline{\omega_1} \approx 0.309 - 0.951 i$.

Pentagono regolare inscritto nel cerchio unitario. Somma: 0.
</details>

<details>
<summary>Esercizio 3 — Equazione quadratica complessa</summary>

Risolvi $z^2 + (1 - i) z + (2 - i) = 0$.

**Soluzione.** Discriminante: $\Delta = (1 - i)^2 - 4(2 - i) = (1 - 2i + i^2) - 8 + 4i = -2i - 8 + 4i = -8 + 2i$.

Per la radice quadrata $w = \sqrt{-8 + 2i}$: sia $w = x + y i$. Allora $w^2 = (x^2 - y^2) + 2 x y i = -8 + 2 i$. Sistema:
- $x^2 - y^2 = -8$,
- $2 x y = 2$, cioè $x y = 1$, quindi $y = 1/x$.

Sostituendo: $x^2 - 1/x^2 = -8$, ovvero $x^4 + 8 x^2 - 1 = 0$. Risolvendo per $x^2$: $x^2 = (-8 + \sqrt{68})/2 = -4 + \sqrt{17} \approx 0.123$. Quindi $x \approx \pm 0.350$, $y = 1/x \approx \pm 2.857$.

Soluzioni dell'equazione: $z = \dfrac{-(1 - i) \pm w}{2}$.
</details>

<details>
<summary>Esercizio 4 — Formule di addizione via Eulero</summary>

Usa $e^{i (\theta_1 + \theta_2)} = e^{i \theta_1} \cdot e^{i \theta_2}$ per dedurre le formule di addizione di seno e coseno.

**Soluzione.**

A destra: $e^{i \theta_1} \cdot e^{i \theta_2} = (\cos\theta_1 + i \sin\theta_1)(\cos\theta_2 + i \sin\theta_2) = (\cos\theta_1 \cos\theta_2 - \sin\theta_1 \sin\theta_2) + i (\sin\theta_1 \cos\theta_2 + \cos\theta_1 \sin\theta_2)$.

A sinistra: $e^{i (\theta_1 + \theta_2)} = \cos(\theta_1 + \theta_2) + i \sin(\theta_1 + \theta_2)$.

Identificando parti reali e immaginarie:
$$\cos(\theta_1 + \theta_2) = \cos\theta_1 \cos\theta_2 - \sin\theta_1 \sin\theta_2,$$
$$\sin(\theta_1 + \theta_2) = \sin\theta_1 \cos\theta_2 + \cos\theta_1 \sin\theta_2.$$
Le solite formule, in due righe.
</details>

<details>
<summary>Esercizio 5 — TFA esplicito</summary>

Trova tutte le radici di $p(z) = z^4 - 1$.

**Soluzione.** $z^4 = 1$, quindi $z$ è una radice quarta dell'unità: $z \in \{1, i, -1, -i\}$.

Fattorizzazione: $z^4 - 1 = (z^2 - 1)(z^2 + 1) = (z - 1)(z + 1)(z - i)(z + i)$.

Verifica TFA: 4 radici (= grado del polinomio), tutte distinte. ✓
</details>

## Trappole comuni

- **"$\sqrt{-1} = i$" è una convenzione, non un teorema.** $i^2 = -1$ ma anche $(-i)^2 = -1$. La "radice quadrata" in $\mathbb{C}$ è una funzione multivalore: serve una scelta di **branca**. In algebra elementare la scelta è $i$.
- **$\mathbb{C}$ NON si ordina.** Non scrivere mai "$z_1 < z_2$" per complessi (a meno che entrambi siano reali). Confrontare $|z_1|$ e $|z_2|$ va bene.
- **Argomento modulo $2\pi$.** L'argomento è definito a meno di multipli di $2\pi$. Quando dici "l'argomento" intendi una scelta (es. $\operatorname{Arg}(z) \in (-\pi, \pi]$). Sommare due argomenti può uscire dall'intervallo, e va riportato dentro.
- **Confondere $\bar z$ con $|z|$.** $\bar z$ è un numero complesso (la riflessione di $z$); $|z|$ è un numero reale non-negativo. Relazione: $z \bar z = |z|^2$.
- **"$e^{i\theta}$ è solo notazione."** **No**: è veramente la funzione esponenziale via serie, valutata in argomento immaginario. La serie converge anche per $z \in \mathbb{C}$, e la formula di Eulero è un teorema.

> **Pillola operativa.** Quando vedi qualcosa di "ostico" in $\mathbb{R}$ — oscillazioni, formule trigonometriche complicate, integrali con $\sin/\cos$ — **passa a $\mathbb{C}$ via Eulero**: trasformi trigonometria in algebra. La maggior parte dei "trucchi calcolatori" dell'analisi sono questo.

## Riassunto in una riga

$\mathbb{C} = \mathbb{R}^2$ con un prodotto speciale che fa di $i = (0, 1)$ una radice di $-1$ — è un campo (non ordinato) in cui *ogni* polinomio ha radici, e la formula di Eulero $e^{i\theta} = \cos\theta + i \sin\theta$ trasforma la trigonometria in algebra esponenziale.
