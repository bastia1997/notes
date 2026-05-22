---
title: "Successioni monotone e Bolzano-Weierstrass"
area: Successioni
summary: "Due risultati cardine. **Successioni monotone limitate convergono** — arma per dimostrare esistenza di limiti senza conoscerli. **Bolzano-Weierstrass** — ogni successione limitata ha una sottosuccessione convergente. Entrambi crollano in $\\mathbb{Q}$ e caratterizzano la completezza di $\\mathbb{R}$."
order: 13
level: intermedio
prereq:
  - "Successioni e limite (sez. 11)"
  - "Algebra dei limiti (sez. 12)"
  - "Topologia di R, sup/inf (sez. 07, 10)"
tools:
  - "Rudin — *Principles*, cap. 3"
  - "Giusti — *Analisi 1*"
---

# Successioni monotone e Bolzano-Weierstrass

## Perché parlarne

Due architravi:

1. **Successioni monotone limitate convergono** — uno strumento per dimostrare che un limite esiste *senza conoscerlo*. Cruciale per definire il numero $e$, per analizzare successioni ricorsive, per calcolare radici come limite di iterazioni.
2. **Bolzano-Weierstrass** — ogni successione limitata ha una sottosuccessione convergente. È il teorema-ponte tra "limitato" e "convergente": permette di costruire candidati al limite anche quando l'intera successione oscilla.

Entrambi i risultati dipendono dalla **completezza di $\mathbb{R}$** (l'assenza di "buchi"). Sono *falsi* in $\mathbb{Q}$.

## Intuizione

**Monotone limitate.** Se $a_n$ cresce e non supera una "cappa" $M$, allora deve "stabilizzarsi" da qualche parte sotto $M$. Quel "da qualche parte" è $\sup\{a_n\}$. I termini non lo superano (limitati) ma si avvicinano arbitrariamente (sup). Conclusione: convergono al sup.

**Bolzano-Weierstrass.** Prendi una successione che si dimena dentro $[a, b]$. Dividi a metà: una delle due metà contiene **infiniti** termini (perché l'unione delle due metà ha tutti gli infiniti termini, e non possono stare tutti in una metà finita). Iteriamo: bisezioni successive producono intervalli incatenati di diametro che dimezza ogni volta → 0. La loro intersezione è un solo punto $L$. Scegliendo un termine per intervallo, otteniamo una sottosuccessione che converge a $L$.

## Vocabolario

### Monotonia

- $(a_n)$ è **crescente** se $a_n \le a_{n+1}$ per ogni $n$; **strettamente crescente** se $a_n < a_{n+1}$.
- $(a_n)$ è **decrescente** se $a_n \ge a_{n+1}$; strettamente se $a_n > a_{n+1}$.
- $(a_n)$ è **monotona** se è crescente o decrescente.

### Sottosuccessione

Data $(a_n)$, una **sottosuccessione** si costruisce scegliendo indici crescenti: $n_0 < n_1 < n_2 < \dots$, e prendendo $(a_{n_k})_k$.

> **Glossarietto:**
>
> - $n_k$ = il $k$-esimo indice scelto (i $n$ con pedice non sono gli stessi $n$ della successione originale!).
> - Formalmente: $\varphi : \mathbb{N} \to \mathbb{N}$ strettamente crescente, $\varphi(k) = n_k$.
> - **Esempio.** Se $(a_n) = (n) = 0, 1, 2, 3, 4, \dots$, una sottosuccessione è $(a_{2k}) = 0, 2, 4, 6, \dots$ (gli indici pari).

**Osservazione utile**: $n_k \ge k$ per ogni $k$ (induzione: $n_0 \ge 0$, $n_{k+1} > n_k \ge k$, quindi $n_{k+1} \ge k + 1$).

**Fatto base**: se $a_n \to L$, allora **ogni** sottosuccessione $a_{n_k} \to L$.

*Dim.* Dato $\varepsilon > 0$, $\exists N : |a_n - L| < \varepsilon$ per $n \ge N$. Poiché $n_k \ge k$, anche $|a_{n_k} - L| < \varepsilon$ per $k \ge N$. ∎

## Teorema delle successioni monotone

> **Teorema 1.** Sia $(a_n)$ monotona.
>
> (i) Se è crescente: $\lim a_n = \sup_n a_n \in \overline{\mathbb{R}}$.
> (ii) Se è decrescente: $\lim a_n = \inf_n a_n \in \overline{\mathbb{R}}$.
>
> In particolare, **monotona + limitata $\Rightarrow$ convergente** (in $\mathbb{R}$).

> **Glossarietto:**
>
> - $\sup_n a_n$ = $\sup \{a_n : n \in \mathbb{N}\}$, estremo superiore dell'insieme di tutti i termini.
> - $\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, +\infty\}$ (sez. 12): se la successione cresce senza limite, $\sup = +\infty$.

*Dim. del caso crescente.*

**Caso 1: $S = \sup_n a_n \in \mathbb{R}$** (cioè limitata superiormente). Per la definizione di sup (cap. 07):
1. $a_n \le S$ per ogni $n$.
2. $\forall \varepsilon > 0,\ \exists N : a_N > S - \varepsilon$ ($\varepsilon$-caratterizzazione).

Per monotonia, $a_n \ge a_N > S - \varepsilon$ per ogni $n \ge N$. Combinando con (1): $S - \varepsilon < a_n \le S < S + \varepsilon$, cioè $|a_n - S| < \varepsilon$. Quindi $a_n \to S$. ∎

**Caso 2: $\sup a_n = +\infty$** (non limitata). Per ogni $M > 0$, $M$ non è maggiorante, quindi $\exists N : a_N > M$. Per monotonia, $a_n > M$ per $n \ge N$. Quindi $a_n \to +\infty$. ∎

Caso decrescente: analogo con $\inf$.

## Teorema di Bolzano-Weierstrass

> **Teorema 2 (BW).** Ogni successione **limitata** in $\mathbb{R}$ ammette una sottosuccessione convergente.

*Dim. (per bisezione).*

Sia $a_n \in [a, b] =: I_0$.

**Costruzione degli intervalli.** Dividiamo $I_0$ in due metà uguali: $\left[a, \frac{a+b}{2}\right]$ e $\left[\frac{a+b}{2}, b\right]$. Poiché l'unione contiene **infiniti** termini ($a_n$ con $n \in \mathbb{N}$), almeno una delle due metà contiene infiniti termini. Sia $I_1$ tale metà (se entrambe vanno bene, scegli la sinistra).

Iteriamo: ad ogni passo dividi l'intervallo corrente $I_k$ a metà, scegli la metà $I_{k+1}$ che contiene infiniti termini.

Otteniamo $I_0 \supseteq I_1 \supseteq I_2 \supseteq \dots$, intervalli **chiusi e incatenati**, ciascuno con lunghezza $|I_k| = (b - a)/2^k \to 0$.

**Costruzione della sottosuccessione.** Scegli:
- $n_0 = 0$ (o un qualunque indice con $a_{n_0} \in I_0$).
- $n_1 > n_0$ con $a_{n_1} \in I_1$ (esiste: $I_1$ contiene infiniti termini, quindi anche con indice $> n_0$).
- In generale, $n_{k+1} > n_k$ con $a_{n_{k+1}} \in I_{k+1}$.

**Convergenza.** Gli $\{I_k\}$ sono chiusi incatenati con lunghezza $\to 0$. Per il **teorema degli intervalli incatenati di Cantor** (sez. 07, conseguenza della completezza), $\bigcap_k I_k = \{L\}$ per un unico $L \in \mathbb{R}$.

Per costruzione, $a_{n_k} \in I_k$ e $L \in I_k$. Quindi:
$$|a_{n_k} - L| \le |I_k| = \frac{b - a}{2^k} \to 0.$$
Conclusione: $a_{n_k} \to L$. ∎

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="300" fill="#111a30"/>
  <text x="20" y="25" fill="#f3eed9" font-family="ui-monospace" font-size="13">Bisezione: costruzione di Iₖ incatenati</text>
  <line x1="80" y1="60" x2="540" y2="60" stroke="#d4af37" stroke-width="4"/>
  <text x="50" y="65" fill="#d4af37" font-family="ui-monospace" font-size="11">I₀</text>
  <text x="80" y="50" fill="#f3eed9" font-family="ui-monospace" font-size="10">a</text>
  <text x="540" y="50" fill="#f3eed9" font-family="ui-monospace" font-size="10">b</text>
  <line x1="310" y1="105" x2="540" y2="105" stroke="#e8a04a" stroke-width="4"/>
  <text x="280" y="110" fill="#e8a04a" font-family="ui-monospace" font-size="11">I₁</text>
  <line x1="310" y1="150" x2="425" y2="150" stroke="#6fb38a" stroke-width="4"/>
  <text x="280" y="155" fill="#6fb38a" font-family="ui-monospace" font-size="11">I₂</text>
  <line x1="367.5" y1="195" x2="425" y2="195" stroke="#6aa9d8" stroke-width="4"/>
  <text x="338" y="200" fill="#6aa9d8" font-family="ui-monospace" font-size="11">I₃</text>
  <line x1="367.5" y1="240" x2="396" y2="240" stroke="#e07a8d" stroke-width="4"/>
  <text x="338" y="245" fill="#e07a8d" font-family="ui-monospace" font-size="11">I₄</text>
  <circle cx="381" cy="275" r="5" fill="#d4af37"/>
  <text x="386" y="280" fill="#d4af37" font-family="ui-monospace" font-size="11">L = ∩ Iₖ</text>
</svg>
<div class="chart-caption">Ogni $I_{k+1}$ è la metà di $I_k$ che contiene infiniti termini. L'intersezione è un singoletto $\{L\}$.</div>
</div>

### Corollario — Sottosuccessione monotona

> **Corollario.** Ogni successione $(a_n)$ ammette una sottosuccessione **monotona**.

*Dim.* Diciamo che $n$ è una **vetta** se $a_n > a_m$ per ogni $m > n$ (tutti i termini dopo sono più piccoli).

**Caso A: ci sono infinite vette.** Siano $n_0 < n_1 < n_2 < \dots$ le vette. Per definizione $a_{n_0} > a_{n_1} > a_{n_2} > \dots$: sottosuccessione **strettamente decrescente**.

**Caso B: ci sono finite vette.** Sia $n_0$ un indice più grande di tutte le vette. $n_0$ non è vetta, quindi $\exists n_1 > n_0$ con $a_{n_1} \ge a_{n_0}$. Pure $n_1$ non è vetta, $\exists n_2 > n_1$ con $a_{n_2} \ge a_{n_1}$. Iteriamo: otteniamo sottosuccessione **crescente**. ∎

**Combinando Teorema 1 + Corollario** otteniamo una seconda dimostrazione di BW: limitata $\Rightarrow$ sottosuccessione monotona $\Rightarrow$ (limitata + monotona) $\Rightarrow$ converge.

## Esempi cardine

### Esempio 1 — La definizione di $e$ via successione

$$a_n = \left(1 + \frac{1}{n}\right)^n.$$

**Tesi.** $(a_n)$ è crescente e limitata, quindi converge. Il limite *definisce* il numero $e$:
$$e := \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n.$$

**Schizzo della monotonia.** Sviluppo del binomio:
$$a_n = \sum_{k=0}^n \binom{n}{k} \frac{1}{n^k} = \sum_{k=0}^n \frac{1}{k!} \cdot \prod_{j=0}^{k-1}\left(1 - \frac{j}{n}\right).$$
Confrontando con $a_{n+1}$: ogni fattore $\left(1 - \frac{j}{n+1}\right) > \left(1 - \frac{j}{n}\right)$, e $a_{n+1}$ ha un termine in più (positivo). Quindi $a_{n+1} > a_n$.

**Limitatezza** (sopra da 3). $a_n \le \sum_{k=0}^n \frac{1}{k!} \le 1 + \sum_{k=1}^\infty \frac{1}{2^{k-1}} = 1 + 2 = 3$. (Usato $k! \ge 2^{k-1}$ per $k \ge 1$.)

Per il Teorema 1, $\lim$ esiste finito $\in [2, 3]$. Si definisce $e := \lim a_n \approx 2.71828\dots$

### Esempio 2 — Successione ricorsiva $a_{n+1} = \sqrt{2 + a_n}$, $a_0 = 0$

**Limitata da 2.** Per induzione: $a_0 = 0 < 2$; se $a_n < 2$, allora $a_{n+1} = \sqrt{2 + a_n} < \sqrt 4 = 2$. ✓

**Crescente.** $a_{n+1}^2 - a_n^2 = (2 + a_n) - a_n^2 = -(a_n^2 - a_n - 2) = -(a_n - 2)(a_n + 1) > 0$ per $a_n \in [0, 2)$. Cioè $a_{n+1} > a_n$.

**Convergenza.** Per il Teorema 1, $a_n \to L = \sup a_n \le 2$. Passando al limite nell'equazione di ricorrenza: $L = \sqrt{2 + L}$, $L^2 - L - 2 = 0$, $L = 2$. (L'altra radice $L = -1$ è scartata, $a_n \ge 0$.)

### Esempio 3 — BW in azione (sin n)

$a_n = \sin n$. Successione **limitata** ($|a_n| \le 1$), **non monotona**, **non convergente** (lo si può dimostrare).

Per BW esiste una sottosuccessione convergente. Anzi, si dimostra che per *ogni* $L \in [-1, 1]$ esiste una sottosuccessione $a_{n_k} \to L$ (teorema di equidistribuzione di Weyl). Una successione apparentemente "caotica" è in realtà ricchissima di sottosuccessioni.

## Trappole comuni

- **"Crescente $\Rightarrow$ convergente" è falso senza limitatezza.** $a_n = n$ cresce ma diverge a $+\infty$. (Il teorema dice "convergente in $\overline{\mathbb{R}}$": il limite può essere $\pm\infty$.)
- **BW richiede limitatezza.** $a_n = n$ non ha sottosuccessioni convergenti in $\mathbb{R}$.
- **In $\mathbb{Q}$ BW è falso.** Esempio: $a_n =$ approssimazione decimale di $\sqrt 2$ a $n$ cifre. Limitata in $\mathbb{Q} \cap [1, 2]$, ma nessuna sottosuccessione converge in $\mathbb{Q}$ (convergerebbe a $\sqrt 2 \notin \mathbb{Q}$). BW equivale alla completezza.
- **Passare al limite senza giustificare l'esistenza.** Errore classico: data $a_{n+1} = a_n^2$, $a_0 = 2$, se passi al limite $L = L^2 \Rightarrow L \in \{0, 1\}$. **Falso**: $a_n = 2^{2^n} \to +\infty$. Il vizio: hai passato al limite assumendo che esistesse finito. La regola: prima dimostra che il limite esiste, poi puoi passarlo.

## Esercizi

<details>
<summary>Esercizio 1 — Successione ricorsiva</summary>

Sia $a_1 = 1$, $a_{n+1} = \frac{a_n + 6}{2}$. Calcola $\lim a_n$.

**Soluzione.**
*Monotonia.* $a_{n+1} - a_n = \frac{a_n + 6}{2} - a_n = \frac{6 - a_n}{2}$, positivo $\iff a_n < 6$. Per induzione $a_n < 6$ (base $a_1 = 1 < 6$; passo $a_n < 6 \Rightarrow a_{n+1} = (a_n + 6)/2 < 6$). Quindi $(a_n)$ crescente.

*Limitatezza.* Da sopra da 6.

*Limite.* Per Teorema 1, esiste $L \le 6$. Passando al limite: $L = (L + 6)/2 \Rightarrow L = 6$. ∎
</details>

<details>
<summary>Esercizio 2 — Radice come limite (metodo di Newton)</summary>

Sia $a_1 = 2$, $a_{n+1} = \frac{1}{2}\left(a_n + \frac{2}{a_n}\right)$ (metodo di Newton per $\sqrt 2$). Dimostra $a_n \to \sqrt 2$.

**Soluzione.**

*Limitatezza inferiore.* $a_n \ge \sqrt 2$ per $n \ge 1$ (per AM-GM: $\frac{a + 2/a}{2} \ge \sqrt{a \cdot \frac{2}{a}} = \sqrt 2$).

*Decrescenza.* $a_{n+1} - a_n = \frac{1}{2}\left(\frac{2}{a_n} - a_n\right) = \frac{2 - a_n^2}{2 a_n} \le 0$ (perché $a_n^2 \ge 2$).

*Limite.* Per Teorema 1, $a_n \to L \ge \sqrt 2$. Passando: $L = (L + 2/L)/2 \Rightarrow L^2 = 2 \Rightarrow L = \sqrt 2$. ∎

(Bonus: il metodo di Newton converge in modo *quadratico* — il numero di cifre corrette raddoppia ad ogni passo. Velocissimo.)
</details>

<details>
<summary>Esercizio 3 — BW costruttivo</summary>

Sia $a_n = (-1)^n \frac{n}{n + 1}$. Trova due sottosuccessioni con limiti diversi.

**Soluzione.**
$a_{2k} = \frac{2k}{2k+1} \to 1$ (limite della sottosuccessione di indici pari).
$a_{2k+1} = -\frac{2k+1}{2k+2} \to -1$ (indici dispari). ∎
</details>

<details>
<summary>Esercizio 4 — Intervalli incatenati con condizione che fallisce</summary>

Sia $I_n = [n, n + 1/n]$. Verifica che $I_{n+1} \not\subseteq I_n$ e che $\bigcap I_n = \emptyset$. Perché Cantor non si applica?

**Soluzione.** $I_1 = [1, 2]$, $I_2 = [2, 2.5]$, $I_3 = [3, 3.33], \dots$ Gli estremi inferiori crescono: gli intervalli non sono incatenati ($I_2 \not\subseteq I_1$ perché $\sup I_1 = 2 < \inf I_2 = 2$? no in realtà sono al limite — più chiaramente $I_3$ inizia in 3 ma $I_2$ finisce a 2.5).

L'intersezione è vuota perché un punto fissato $x$ può stare al più in uno dei $I_n$.

Cantor richiede inclusione successiva, qui assente. ∎
</details>

<details>
<summary>Esercizio 5 — Monotone "definitivamente"</summary>

Dimostra: se $(a_n)$ è monotona definitivamente (cioè $\exists N : a_n \le a_{n+1}$ per $n \ge N$) e limitata, allora converge.

**Soluzione.** Considera la sottosuccessione $b_k = a_{N + k}$: monotona e limitata, quindi $b_k \to L$ per Teorema 1.

I primi $N$ termini di $(a_n)$ non influenzano il limite: dato $\varepsilon > 0$, $\exists K$ con $|b_k - L| < \varepsilon$ per $k \ge K$, cioè $|a_n - L| < \varepsilon$ per $n \ge N + K$. ∎
</details>

<details>
<summary>Esercizio 6 — BW negato in $\mathbb{Q}$</summary>

Costruisci $(a_n) \subseteq \mathbb{Q} \cap [1, 2]$ tale che nessuna sottosuccessione converga in $\mathbb{Q}$.

**Soluzione.** $a_n$ = approssimazione decimale di $\sqrt 2$ a $n$ cifre: $a_1 = 1.4$, $a_2 = 1.41$, $a_3 = 1.414, \dots$ Tutti razionali, limitati in $[1, 2]$.

Qualunque sottosuccessione converge a $\sqrt 2 \notin \mathbb{Q}$ (in $\mathbb{R}$; in $\mathbb{Q}$ non c'è limite). Quindi BW fallisce in $\mathbb{Q}$. ∎

Conclusione: **BW ⇔ completezza** di $\mathbb{R}$.
</details>

<details>
<summary>Esercizio 7 — Caratterizzazione del sup come limite</summary>

Dimostra: se $A \subseteq \mathbb{R}$ è non vuoto e limitato superiormente, allora esiste $(a_n) \subseteq A$ con $a_n \to \sup A$.

**Soluzione.** Sia $S = \sup A$. Per la $\varepsilon$-caratterizzazione (cap. 07), per ogni $n \ge 1$, $S - 1/n$ non è maggiorante, quindi $\exists a_n \in A$ con $a_n > S - 1/n$. Inoltre $a_n \le S$.

Per carabinieri: $S - 1/n < a_n \le S$, entrambi gli estremi $\to S$. Quindi $a_n \to S$. ∎

> **Risultato fondamentale**: il sup è sempre limite di una successione *dentro* l'insieme.
</details>

## Riassunto in tabella

| Ipotesi | Conclusione |
|---|---|
| crescente, limitata sopra | $\to \sup a_n \in \mathbb{R}$ |
| crescente, non limitata | $\to +\infty$ |
| limitata in $\mathbb{R}$ | ha sottosuccessione convergente (BW) |
| qualsiasi successione | ha sottosuccessione monotona |
| intervalli chiusi incatenati | intersezione non vuota |

## Riassunto in una riga

**Monotone limitate convergono**, **limitate hanno sottosuccessioni convergenti** (Bolzano-Weierstrass): due risultati equivalenti alla completezza di $\mathbb{R}$ — falsi in $\mathbb{Q}$ — e gli strumenti principali per dimostrare l'esistenza di limiti senza calcolarli esplicitamente.
