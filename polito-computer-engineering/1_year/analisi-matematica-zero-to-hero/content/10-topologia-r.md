---
title: "Topologia di R: intorni, aperti, chiusi, compatti"
area: Topologia
summary: "La grammatica formale del \"vicino\" su $\\mathbb{R}$. Cos'è un intorno, cos'è un punto di accumulazione, cosa vuol dire \"aperto\" e \"chiuso\", e perché i **compatti** (= chiusi + limitati) sono il vero protagonista dell'analisi."
order: 10
level: intermedio
prereq:
  - "Numeri reali e completezza (sup, inf — sez. 06-07)"
  - "Valore assoluto e disuguaglianze"
  - "Logica dei quantificatori (sez. 01)"
tools:
  - "Rudin — *Principles of Mathematical Analysis*, cap. 2"
  - "Giusti — *Analisi Matematica 1*"
  - "Apostol — *Mathematical Analysis*, cap. 3"
---

# Topologia di R: intorni, aperti, chiusi, compatti

## Perché parlarne

Tutta l'analisi parla di **vicinanza**: il limite di una successione è "dove i termini si avvicinano", una funzione continua è "se sposti poco l'input, sposti poco l'output". Per scrivere queste cose con rigore serve un linguaggio formale per "vicino" e "lontano".

Quel linguaggio è la **topologia**. In $\mathbb{R}$ è semplicissima — basta la distanza $d(x, y) = |x - y|$ — ma da quella singola nozione germoglia tutto: intorni, aperti, chiusi, compatti, connessi.

Il salto concettuale: **smetti di pensare "i numeri sono punti su una retta"** e inizia a pensare "ogni punto vive dentro famiglie di intorni che lo contengono". Cambia il modo in cui ragioni sulle proprietà locali.

## Intuizione veloce

Un punto $x_0 \in \mathbb{R}$ ha **intorni** — intervalli aperti che lo contengono.

Un insieme $A$ è **aperto** se ogni suo punto è "comodamente all'interno": ha un intorno tutto incluso in $A$. Esempio: $(0, 1)$.

Un insieme è **chiuso** se contiene la sua "buccia": tutti i punti che gli sono "infinitamente vicini". Esempio: $[0, 1]$.

Pensa a $(0, 1)$ vs $[0, 1]$:
- $0.9999 \in (0, 1)$? Sì, ha intorno $(0.998, 0.9999\dots99)$ tutto dentro. Comodo.
- $1 \in (0, 1)$? No, *ogni* suo intorno tocca punti fuori. È un **punto di accumulazione** non incluso: per questo $(0, 1)$ è aperto ma non chiuso.
- $1 \in [0, 1]$? Sì, l'estremo è incluso. Per questo $[0, 1]$ è chiuso.

## Distanza e intorni

### La distanza in $\mathbb{R}$

$$d(x, y) := |x - y|, \quad x, y \in \mathbb{R}.$$

> **Glossarietto:**
>
> - $d(x, y)$ = "distanza fra $x$ e $y$".
> - $|x - y|$ = valore assoluto della differenza (sez. 06). $|3 - 7| = 4$, $|2 - 2| = 0$.
> - Soddisfa: $d(x, y) \ge 0$, $d(x, y) = 0 \iff x = y$, $d(x, y) = d(y, x)$ (simmetria), $d(x, z) \le d(x, y) + d(y, z)$ (disuguaglianza triangolare).

### Intorni "sferici"

Un **intorno sferico** (o "palla") di centro $x_0$ e raggio $r > 0$ è
$$B_r(x_0) := \{x \in \mathbb{R} : |x - x_0| < r\} = (x_0 - r,\ x_0 + r).$$

> **Glossarietto:**
>
> - $B$ = "ball" (palla) — in $\mathbb{R}$ è un intervallo aperto, in $\mathbb{R}^2$ un disco, in $\mathbb{R}^3$ una palla 3D; il nome arriva da lì.
> - $|x - x_0| < r$ = "la distanza fra $x$ e $x_0$ è minore di $r$".
> - $(x_0 - r, x_0 + r)$ = intervallo aperto da $x_0 - r$ a $x_0 + r$ (estremi esclusi).
>
> **Esempio.** $B_{0.5}(3) = (2.5, 3.5)$.

Più in generale, un **intorno** di $x_0$ è un qualunque insieme $U$ che contiene almeno un intorno sferico di $x_0$: $\exists r > 0$ con $B_r(x_0) \subseteq U$.

## Classificazione dei punti rispetto a un insieme

Sia $A \subseteq \mathbb{R}$ e $x_0 \in \mathbb{R}$ (non necessariamente in $A$). Definiamo cinque tipi di punti.

- **Interno** ad $A$: $\exists r > 0 : B_r(x_0) \subseteq A$ (un intero intorno sferico sta dentro $A$).
- **Esterno** ad $A$: $\exists r > 0 : B_r(x_0) \subseteq \mathbb{R} \setminus A$ (un intero intorno sferico sta fuori da $A$).
- **Frontiera** per $A$: $\forall r > 0$, $B_r(x_0)$ tocca sia $A$ sia $\mathbb{R} \setminus A$ (ogni intorno è "diviso a metà").
- **Accumulazione** per $A$: $\forall r > 0$, $(B_r(x_0) \setminus \{x_0\}) \cap A \ne \emptyset$ (ogni intorno contiene un punto di $A$ diverso da $x_0$).
- **Isolato** in $A$: $x_0 \in A$ e $\exists r > 0 : B_r(x_0) \cap A = \{x_0\}$ ($x_0$ è in $A$ ma "da solo": l'intorno non contiene altri elementi di $A$).

> **Glossarietto delle definizioni:**
>
> - $A$ = un sottoinsieme di $\mathbb{R}$.
> - $\mathbb{R} \setminus A$ = il complementare di $A$, "tutto ciò che non è in $A$".
> - $B_r(x_0) \setminus \{x_0\}$ = la palla "bucata", senza il centro stesso.
> - $\cap$ = intersezione, $\ne \emptyset$ = "non vuoto".
>
> **Distinzione cruciale.** Un punto di accumulazione **può non appartenere** ad $A$ (esempio: $0$ è di accumulazione per $\{1/n : n \ge 1\}$, ma $0$ non è nell'insieme). E un punto di $A$ può non essere di accumulazione (è isolato).

## Aperti, chiusi, chiusura, interno

- $A$ è **aperto** se ogni suo punto è interno: $\forall x \in A, \exists r > 0 : B_r(x) \subseteq A$.
- $A$ è **chiuso** se il complementare $\mathbb{R} \setminus A$ è aperto.
- L'**interno** $\mathring{A}$ (o $\operatorname{int}(A)$) = l'insieme dei punti interni di $A$. È il più grande aperto contenuto in $A$.
- La **chiusura** $\overline{A}$ = $A$ unito ai suoi punti di accumulazione. È il più piccolo chiuso contenente $A$.
- La **frontiera** $\partial A = \overline{A} \setminus \mathring{A}$.

> **Tradotto a parole:**
>
> - Aperto = "ogni punto ha respiro intorno a sé". Esempio: $(0, 1)$.
> - Chiuso = "contiene la sua buccia". Esempio: $[0, 1]$.
> - Interno = la "pancia" senza la pelle.
> - Chiusura = l'insieme con la sua pelle inclusa.
> - Frontiera = la sola pelle.

### Esempi geometrici fondamentali

<div class="chart">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="300" fill="#111a30"/>
  <g font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#f3eed9">
    <text x="20" y="30">Tipologie di intervalli in R</text>
  </g>
  <line x1="80" y1="80" x2="520" y2="80" stroke="#3a4868" stroke-width="1"/>
  <line x1="160" y1="75" x2="160" y2="85" stroke="#f3eed9" stroke-width="1"/>
  <line x1="440" y1="75" x2="440" y2="85" stroke="#f3eed9" stroke-width="1"/>
  <line x1="160" y1="80" x2="440" y2="80" stroke="#d4af37" stroke-width="4"/>
  <circle cx="160" cy="80" r="6" fill="#111a30" stroke="#d4af37" stroke-width="2"/>
  <circle cx="440" cy="80" r="6" fill="#111a30" stroke="#d4af37" stroke-width="2"/>
  <text x="20" y="84" fill="#f3eed9" font-family="ui-monospace" font-size="12">(a,b)</text>
  <text x="540" y="84" fill="#6fb38a" font-family="ui-monospace" font-size="11">aperto</text>
  <line x1="80" y1="135" x2="520" y2="135" stroke="#3a4868" stroke-width="1"/>
  <line x1="160" y1="135" x2="440" y2="135" stroke="#e8a04a" stroke-width="4"/>
  <circle cx="160" cy="135" r="6" fill="#e8a04a"/>
  <circle cx="440" cy="135" r="6" fill="#e8a04a"/>
  <text x="20" y="139" fill="#f3eed9" font-family="ui-monospace" font-size="12">[a,b]</text>
  <text x="540" y="139" fill="#e8a04a" font-family="ui-monospace" font-size="11">chiuso, compatto</text>
  <line x1="80" y1="190" x2="520" y2="190" stroke="#3a4868" stroke-width="1"/>
  <line x1="160" y1="190" x2="440" y2="190" stroke="#6aa9d8" stroke-width="4"/>
  <circle cx="160" cy="190" r="6" fill="#6aa9d8"/>
  <circle cx="440" cy="190" r="6" fill="#111a30" stroke="#6aa9d8" stroke-width="2"/>
  <text x="20" y="194" fill="#f3eed9" font-family="ui-monospace" font-size="12">[a,b)</text>
  <text x="540" y="194" fill="#e07a8d" font-family="ui-monospace" font-size="11">né aperto né chiuso</text>
  <line x1="80" y1="245" x2="520" y2="245" stroke="#3a4868" stroke-width="1"/>
  <line x1="160" y1="245" x2="520" y2="245" stroke="#6fb38a" stroke-width="4"/>
  <circle cx="160" cy="245" r="6" fill="#6fb38a"/>
  <polygon points="520,238 530,245 520,252" fill="#6fb38a"/>
  <text x="20" y="249" fill="#f3eed9" font-family="ui-monospace" font-size="12">[a,+∞)</text>
  <text x="540" y="249" fill="#e8a04a" font-family="ui-monospace" font-size="11">chiuso, non limitato</text>
  <text x="160" y="280" fill="#f3eed9" font-family="ui-monospace" font-size="11" text-anchor="middle">a</text>
  <text x="440" y="280" fill="#f3eed9" font-family="ui-monospace" font-size="11" text-anchor="middle">b</text>
</svg>
<div class="chart-caption">Cerchio pieno = estremo incluso; cerchio vuoto = escluso. La compattezza richiede entrambi: chiuso e limitato.</div>
</div>

## Teoremi cardine

### Teorema 1 — Caratterizzazione dei chiusi via accumulazione

> $A \subseteq \mathbb{R}$ è chiuso $\iff$ $A$ contiene tutti i suoi punti di accumulazione.

> **A parole:** un insieme è chiuso esattamente quando non "perde" punti di accumulazione che gli sono vicini.

*Dim.*

$(\Rightarrow)$ Sia $A$ chiuso, cioè $\mathbb{R} \setminus A$ aperto. Sia $x_0$ punto di accumulazione di $A$. Per assurdo $x_0 \notin A$, dunque $x_0 \in \mathbb{R} \setminus A$, che è aperto: $\exists r > 0$ con $B_r(x_0) \subseteq \mathbb{R} \setminus A$, cioè $B_r(x_0) \cap A = \emptyset$, contro l'ipotesi che $x_0$ sia di accumulazione.

$(\Leftarrow)$ Mostriamo $\mathbb{R} \setminus A$ aperto. Sia $y \in \mathbb{R} \setminus A$. Per ipotesi $y$ non è di accumulazione di $A$ (altrimenti starebbe in $A$). Quindi $\exists r > 0$ con $(B_r(y) \setminus \{y\}) \cap A = \emptyset$; siccome anche $y \notin A$, $B_r(y) \cap A = \emptyset$, cioè $B_r(y) \subseteq \mathbb{R} \setminus A$. ∎

### Teorema 2 — Stabilità di aperti e chiusi

> (i) $\emptyset$ e $\mathbb{R}$ sono sia aperti sia chiusi.
> (ii) **Unione qualunque** di aperti è aperta; **intersezione finita** di aperti è aperta.
> (iii) **Intersezione qualunque** di chiusi è chiusa; **unione finita** di chiusi è chiusa.

> **Asimmetria importante:** "qualunque" da una parte, "finita" dall'altra. Vedi controesempio sotto.

*Dim. di (ii).*

*Unione qualunque.* Sia $\{A_\alpha\}$ famiglia di aperti, $A = \bigcup A_\alpha$. Se $x \in A$, $x \in A_{\alpha_0}$ per qualche $\alpha_0$, e per apertura $\exists r > 0 : B_r(x) \subseteq A_{\alpha_0} \subseteq A$.

*Intersezione finita.* $A_1 \cap \dots \cap A_n$: se $x$ vi appartiene, per ogni $i$ esiste $r_i > 0$ con $B_{r_i}(x) \subseteq A_i$. Posto $r = \min(r_1, \dots, r_n) > 0$, $B_r(x) \subseteq \bigcap A_i$.

**Perché serve la finitezza:** con infiniti aperti, il $\min$ potrebbe non essere $> 0$ (un $\inf$ di $r_i$ potrebbe essere 0).

**Controesempio per intersezione infinita.** $A_n = (-1/n, 1/n)$, tutti aperti. Ma
$$\bigcap_{n \ge 1} A_n = \{0\}$$
che è **chiuso** (un punto isolato), non aperto. ∎

### Teorema 3 — Heine-Borel in $\mathbb{R}$ (il cuore del capitolo)

> $K \subseteq \mathbb{R}$ è **compatto** $\iff$ $K$ è **chiuso e limitato**.

Dove la definizione di compatto è la seguente.

**Definizione (compatto).** $K$ è **compatto** se da ogni **copertura aperta** $\{U_\alpha\}_{\alpha \in I}$ (cioè una famiglia di aperti con $K \subseteq \bigcup U_\alpha$) si può estrarre una **sottocopertura finita**: esistono $\alpha_1, \dots, \alpha_n$ tali che $K \subseteq U_{\alpha_1} \cup \dots \cup U_{\alpha_n}$.

> **Glossarietto:**
>
> - **Copertura aperta** = famiglia di insiemi aperti la cui unione contiene $K$. Tipo "una collezione di intorni che ricopre tutto $K$".
> - **Sottocopertura finita** = ne basta un numero finito.
>
> **Tradotto.** Compatto = "per quanto frammenti il ricoprimento, ne bastano sempre finiti pezzi". Concetto sottile, ma esattamente ciò che serve per trasformare argomenti locali in globali.

*Dim.*

$(\Leftarrow)$ Caso modello $K = [a, b]$. Sia $\{U_\alpha\}$ copertura aperta. Definiamo
$$S := \{x \in [a, b] : [a, x] \text{ è coperto da finiti } U_\alpha\}.$$

$S$ è non vuoto ($a \in S$: basta uno $U_\alpha$ contenente $a$) e limitato superiormente da $b$. Sia $c = \sup S \in [a, b]$.

*$c \in S$:* esiste $U_{\alpha_0}$ contenente $c$, aperto, quindi contenente un intorno $B_\delta(c)$. Per definizione di sup, $\exists x \in S$ con $c - \delta < x \le c$. Allora $[a, x]$ ha sottocopertura finita $V_1, \dots, V_n$, e $[a, c] \subseteq V_1 \cup \dots \cup V_n \cup U_{\alpha_0}$. Dunque $c \in S$.

*$c = b$:* per assurdo $c < b$. Allora $\exists \delta' > 0$ tale che $c + \delta' < b$ e $B_{\delta'}(c) \subseteq U_{\alpha_0}$. Allora $[a, c + \delta'/2]$ ha sottocopertura finita, e $c + \delta'/2 \in S$ ma $c + \delta'/2 > c = \sup S$. Contraddizione.

Quindi $b \in S$: $[a, b]$ ha sottocopertura finita.

Per $K$ chiuso e limitato generico: $K \subseteq [a, b]$; data copertura $\{U_\alpha\}$ di $K$, aggiungiamo $\mathbb{R} \setminus K$ (aperto perché $K$ chiuso) ottenendo copertura di $[a, b]$, da cui estraiamo sottocopertura finita; togliendo $\mathbb{R} \setminus K$ resta sottocopertura finita di $K$.

$(\Rightarrow)$ Sia $K$ compatto.

*Limitato.* $K \subseteq \bigcup_{n \in \mathbb{N}} (-n, n)$: copertura aperta. Per compattezza ne bastano finiti: $K \subseteq (-N, N)$ per qualche $N$.

*Chiuso.* Mostriamo che $\mathbb{R} \setminus K$ è aperto. Sia $y \notin K$. Per ogni $x \in K$, scegliamo $r_x > 0$ con $|x - y| > 2 r_x$, sicché $B_{r_x}(x) \cap B_{r_x}(y) = \emptyset$. La famiglia $\{B_{r_x}(x)\}_{x \in K}$ copre $K$; per compattezza esistono $x_1, \dots, x_n$ con $K \subseteq \bigcup B_{r_{x_i}}(x_i)$. Posto $r = \min r_{x_i} > 0$, $B_r(y)$ è disgiunto da tutti i $B_{r_{x_i}}(x_i)$, quindi $B_r(y) \cap K = \emptyset$. ∎

> **Significato pratico.** Su $\mathbb{R}$ (e $\mathbb{R}^n$) "compatto" è facile da riconoscere: basta che sia **chiuso E limitato**. Non vale in spazi più astratti (es. spazi di funzioni $\ell^2$), ma per l'analisi reale è esatto.

### Teorema 4 — Connessi in $\mathbb{R}$ sono intervalli

> $C \subseteq \mathbb{R}$ è **connesso** $\iff$ $C$ è un **intervallo** (cioè $\forall x, y \in C, \forall z$ con $x < z < y$, $z \in C$).

> **Glossarietto:** connesso = "non si spezza in due pezzi separati". Un insieme è connesso se non si può scrivere come unione di due aperti disgiunti non vuoti.

*Dim. (schema).*

$(\Leftarrow)$ Sia $C$ intervallo e per assurdo $C = A \cup B$ con $A, B$ aperti relativi non vuoti disgiunti. Scegliamo $a \in A, b \in B$, WLOG $a < b$. Sia $s = \sup\{x \in [a, b] \cap C : [a, x] \cap C \subseteq A\}$. Si mostra che $s \notin A$ (perché $s$ è "al confine") e $s \notin B$ (per simmetria), contraddizione.

$(\Rightarrow)$ Se $C$ non è intervallo, $\exists x < z < y$ in $\mathbb{R}$ con $x, y \in C$, $z \notin C$. Allora $C = (C \cap (-\infty, z)) \cup (C \cap (z, +\infty))$: due aperti relativi disgiunti non vuoti. Quindi $C$ non connesso. ∎

## Esempi guida

**1. $\mathbb{Q}$ in $\mathbb{R}$.**
Non aperto (ogni intorno di un razionale contiene irrazionali).
Non chiuso (ogni irrazionale è di accumulazione per $\mathbb{Q}$ ma non appartiene).
$\overline{\mathbb{Q}} = \mathbb{R}$ (i razionali sono densi). $\mathring{\mathbb{Q}} = \emptyset$.

**2. L'insieme $\{1/n : n \ge 1\}$.**
Ogni $1/n$ è un **punto isolato** (con raggio $r < 1/(n(n+1))$ l'intorno contiene solo $1/n$).
L'unico punto di accumulazione è $0$, e $0 \notin$ insieme.
Aggiungendo $0$: $\{0\} \cup \{1/n\}$ diventa **chiuso** (contiene il suo punto di accumulazione) e limitato → **compatto**.

**3. L'insieme di Cantor.**
Si costruisce rimuovendo iterativamente il "terzo medio" da $[0, 1]$: prima rimuovi $(1/3, 2/3)$, poi i due terzi medi dei pezzi rimasti, ecc.
Risultato: chiuso, limitato → compatto. Ha **interno vuoto** (nessun punto è interno) ma **cardinalità $\mathfrak{c}$** (cap. 05). Esempio prototipico di compatto "strano".

**4. Aperti di $\mathbb{R}$ = unione numerabile di intervalli aperti disgiunti.**
Ogni aperto di $\mathbb{R}$ si scrive in modo unico come unione di al più numerabili intervalli aperti disgiunti (le sue componenti connesse). Risultato strutturale fondamentale.

## Esercizi

<details>
<summary>Esercizio 1 — Intersezione di aperti</summary>

Mostra che $\bigcap_{n=1}^\infty \left(-\frac{1}{n},\ 1 + \frac{1}{n}\right) = [0, 1]$.

**Soluzione.**

*$\supseteq$.* Se $x \in [0, 1]$, allora per ogni $n$: $-1/n < 0 \le x \le 1 < 1 + 1/n$, quindi $x$ sta in ogni intervallo.

*$\subseteq$.* Se $x$ sta in ogni $(-1/n, 1 + 1/n)$, allora $x > -1/n$ per ogni $n$, quindi $x \ge \lim(-1/n) = 0$. Analogamente $x \le 1$. Quindi $x \in [0, 1]$. ∎

**Morale**: intersezione numerabile di aperti può dare un chiuso.
</details>

<details>
<summary>Esercizio 2 — Chiusura, interno, frontiera</summary>

Sia $A = (0, 1) \cup \{2\} \cup (\mathbb{Q} \cap (3, 4))$. Calcola $\overline{A}$, $\mathring{A}$, $\partial A$.

**Soluzione.**

- $\overline{A} = [0, 1] \cup \{2\} \cup [3, 4]$. Spiegazione: la chiusura di $(0, 1)$ è $[0, 1]$. $\{2\}$ è già chiuso (punto isolato). I razionali in $(3, 4)$ sono **densi** in $(3, 4)$, quindi la loro chiusura in $\mathbb{R}$ è $[3, 4]$.
- $\mathring{A} = (0, 1)$. Spiegazione: nessun razionale in $(3, 4)$ è interno (ogni suo intorno contiene irrazionali $\notin A$). E $2$ è isolato, non interno.
- $\partial A = \overline{A} \setminus \mathring{A} = \{0, 1, 2\} \cup [3, 4]$.

**Notevole:** la frontiera può essere "spessa" come l'intervallo $[3, 4]$.
</details>

<details>
<summary>Esercizio 3 — Un compatto fatto di punti isolati</summary>

Mostra che $K = \{0\} \cup \{1/n : n \ge 1\}$ è compatto, usando direttamente la definizione (copertura aperta).

**Soluzione.** Sia $\{U_\alpha\}$ copertura aperta di $K$. Esiste $U_{\alpha_0}$ che contiene $0$, e in quanto aperto, contiene anche $B_r(0) = (-r, r)$ per un certo $r > 0$.

Per Archimede, esiste $N$ con $1/N < r$. Allora per ogni $n > N$, $1/n < 1/N < r$, quindi $1/n \in U_{\alpha_0}$.

Restano i punti $1, 1/2, \dots, 1/N$ — **un numero finito**. Per ciascuno scegli un $U_{\alpha_k}$ che lo contenga (esiste per definizione di copertura).

Sottocopertura finita: $\{U_{\alpha_0}, U_{\alpha_1}, \dots, U_{\alpha_N}\}$. ∎

**Tecnica classica:** "cattura la coda" con l'aperto intorno al punto di accumulazione, e poi gestisci a mano i punti rimanenti (in numero finito).
</details>

<details>
<summary>Esercizio 4 — Un chiuso non compatto</summary>

Esibisci un chiuso di $\mathbb{R}$ non compatto, e una copertura aperta da cui *non* si estrae sottocopertura finita.

**Soluzione.** $K = \mathbb{N}$ è chiuso (il complementare $\bigcup_{n \in \mathbb{Z}} (n, n+1)$ è aperto). Non limitato → non compatto per Heine-Borel.

Copertura: $U_n = (n - 1/3,\ n + 1/3)$ per $n \in \mathbb{N}$. Ciascun naturale $n$ è coperto da $U_n$, e da nessun altro. Quindi nessun sotto-insieme finito di $\{U_n\}$ può coprire tutto $\mathbb{N}$. ∎
</details>

<details>
<summary>Esercizio 5 — Bolzano-Weierstrass topologico</summary>

Dimostra: ogni sottoinsieme **infinito e limitato** di $\mathbb{R}$ ha almeno un punto di accumulazione.

**Soluzione.** Sia $A$ infinito e limitato, $A \subseteq [a, b]$. Per assurdo, supponiamo che nessun punto di $[a, b]$ sia di accumulazione di $A$. Allora per ogni $x \in [a, b]$, $\exists r_x > 0$ con $B_{r_x}(x) \cap A \subseteq \{x\}$.

La famiglia $\{B_{r_x}(x)\}_{x \in [a, b]}$ è una copertura aperta di $[a, b]$ — compatto per Heine-Borel. Quindi esiste sottocopertura finita $B_{r_{x_1}}(x_1), \dots, B_{r_{x_n}}(x_n)$. Allora:
$$A \subseteq A \cap [a, b] \subseteq \bigcup_{i=1}^n B_{r_{x_i}}(x_i) \cap A \subseteq \{x_1, \dots, x_n\},$$
quindi $A$ è finito. Contraddice l'ipotesi $|A| = \infty$. ∎

Questa è la versione "puntuale" di Bolzano-Weierstrass. Vedremo la versione "successioni" in [cap. 13](13-monotone-bolzano-weierstrass.html).
</details>

## Trappole comuni

- **"Chiuso" NON significa "non aperto".** $\mathbb{R}$ è entrambi. $[0, 1)$ è nessuno dei due. La negazione di "aperto" non è "chiuso": ci sono insiemi né aperti né chiusi, e insiemi entrambi (gli "clopen").
- **Punto di accumulazione ≠ punto interno.** Un punto di accumulazione può essere interno, esterno o di frontiera. Il concetto guarda alla densità di $A$ vicino al punto, non a quanto $A$ "contenga" intorno al punto.
- **Limitato non implica compatto** in generale: $\mathbb{Q} \cap [0, 1]$ è limitato ma non chiuso in $\mathbb{R}$.
- **Heine-Borel vale in $\mathbb{R}^n$** ma **non** in spazi metrici generici (es. $\ell^2$): in spazi astratti "chiuso e limitato" non basta per la compattezza.
- **Asimmetria stabilità.** Unione **qualunque** di aperti è aperta, ma intersezione **infinita** di aperti può non essere aperta. E viceversa per i chiusi.

> **Pillola operativa.** Quando in un'argomentazione devi "passare dal locale al globale" (es. "per ogni punto vale qualcosa di buono, lo stesso vale globalmente?"), il *requisito* è quasi sempre **compattezza**. È la proprietà che permette argomenti per "ricoperture finite".

## Riassunto in tabella

| concetto | def. operativa | esempio in $\mathbb{R}$ |
|---|---|---|
| **aperto** | ogni punto è interno | $(0, 1)$, $\mathbb{R}$, $\emptyset$ |
| **chiuso** | complementare aperto / contiene i suoi punti di accumulazione | $[0, 1]$, $\mathbb{N}$, $\{0\} \cup \{1/n\}$ |
| **compatto** | chiuso E limitato (Heine-Borel) | $[a, b]$, Cantor, $\{0\} \cup \{1/n\}$ |
| **connesso** | è un intervallo | $\mathbb{R}$, $[0, 1)$, $(-\infty, 5]$ |

## Riassunto in una riga

La topologia di $\mathbb{R}$ è il linguaggio formale del "vicino", basato sulla distanza $|x - y|$ — e i **compatti** (= chiusi + limitati) sono il suo strumento più potente: trasformano proprietà locali in globali tramite sottocoperture finite.
