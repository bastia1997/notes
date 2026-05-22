---
title: Logica e dimostrazioni per l'analisi
area: Preliminari
summary: "I simboli che ci servono per scrivere matematica — ∀ (\"per ogni\"), ∃ (\"esiste\"), ¬ (\"non\"), e i quattro modi di dimostrare un teorema. Tutto spiegato simbolo per simbolo, con esempi banali prima dei tecnici."
order: 1
level: principiante
prereq:
  - "Saper leggere un'espressione matematica (es. 'x al quadrato è 4')"
tools:
  - "Cap. 1 di Rudin"
  - "Halmos — *Naive Set Theory* (per insiemi + logica informali ma rigorosi)"
---

# Logica e dimostrazioni per l'analisi

## Perché parlarne (e cosa rischi senza)

Quasi tutte le definizioni dell'analisi hanno la forma:

> "**Per ogni** $\varepsilon$ piccolo **esiste** un $\delta$ piccolo tale che…"

Se non capisci l'ordine delle parole "per ogni" e "esiste", **non puoi capire le definizioni**: leggerai per anni teoremi senza afferrare cosa dicono davvero. La distinzione fra "continuità" e "uniforme continuità" — che vedremo fra molte lezioni — è *esattamente* uno scambio di queste due parole. E le due cose sono profondamente diverse.

Questa lezione è il vocabolario. Brevissima, ma da rivedere quando in seguito incontri un teorema confuso.

## I cinque simboli che dovrai riconoscere a vista

Prima di qualsiasi tecnica, ecco i simboli che useremo *ovunque*. Imparali ora come si imparano le faccine "🙂" "😢" — a vista.

| simbolo | si legge | significato |
|---------|----------|-------------|
| $\forall$ | "per ogni" | si applica a tutti gli elementi |
| $\exists$ | "esiste" | almeno uno esiste |
| $\exists!$ | "esiste un unico" | uno solo |
| $\Rightarrow$ | "implica" / "allora" | se la cosa di sinistra è vera, lo è anche quella di destra |
| $\Leftrightarrow$ | "se e solo se" | le due cose sono vere insieme o false insieme |
| $\neg$ | "non" | nega la frase che segue |
| $\land$ | "e" | entrambe vere |
| $\lor$ | "o" (inclusivo) | almeno una vera |
| $\in$ | "appartiene a" | l'elemento è dentro l'insieme |
| $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$ | "i naturali, gli interi, i razionali, i reali" | i quattro insiemi numerici di base |

> **Trucco mnemonico.** $\forall$ è una "A" rovesciata = *All* (in inglese "tutti"). $\exists$ è una "E" rovesciata = *Exists* ("esiste").

## I connettivi logici: "e", "o", "non", "se… allora"

Una **proposizione** è una frase che è o vera o falsa, non altro. Chiamiamole $P$ e $Q$.

| simbolo | nome | vero quando |
|---------|------|-------------|
| $\neg P$ | negazione di $P$ | $P$ è falsa |
| $P \land Q$ | $P$ e $Q$ | sia $P$ sia $Q$ sono vere |
| $P \lor Q$ | $P$ oppure $Q$ | almeno una delle due è vera |
| $P \Rightarrow Q$ | se $P$, allora $Q$ | è falsa **solo** se $P$ vera e $Q$ falsa |
| $P \Leftrightarrow Q$ | $P$ se e solo se $Q$ | $P$ e $Q$ hanno lo stesso valore di verità |

### Esempi banali, uno per riga

- $P$ = "piove"; $Q$ = "prendo l'ombrello". $P \Rightarrow Q$ = "se piove allora prendo l'ombrello". Quando questa frase è vera? *Sempre tranne* in un caso: piove (vera) e non prendo l'ombrello (falsa). In tutti gli altri tre casi (piove + prendo; non piove + prendo; non piove + non prendo) la frase non è violata.
- $P$ = "il numero è pari"; $Q$ = "il numero è divisibile per 2". $P \Leftrightarrow Q$ è sempre vera: pari ≡ divisibile per 2, per definizione.

### Punto sottile: l'implicazione "a vuoto"

$P \Rightarrow Q$ è considerata *vera* quando $P$ è falsa, *qualunque sia* $Q$.

Sembra strano. Esempio: "Se la luna è fatta di formaggio, allora $2+2 = 5$". In logica classica questa frase è **vera**. Si chiama **vacuità** dell'implicazione.

**Perché serve.** In matematica scriviamo spesso "Se $f$ è derivabile in $x_0$, allora …". Se $f$ *non* è derivabile in $x_0$ (l'ipotesi è falsa), il teorema *resta vero*, semplicemente non dice nulla di interessante in quel caso. Senza la vacuità, ogni teorema andrebbe spezzettato in mille casi.

## Tavole di verità

Una **tavola di verità** elenca tutti i casi possibili (vera/falsa per ogni proposizione) e mostra quanto vale il connettivo.

| $P$ | $Q$ | $P \Rightarrow Q$ | $\neg P \lor Q$ |
|---|---|---|---|
| V | V | V | V |
| V | F | F | F |
| F | V | V | V |
| F | F | V | V |

Le colonne 3 e 4 sono identiche, quindi:

$$P \Rightarrow Q \quad \Leftrightarrow \quad \neg P \lor Q.$$

**Tradotto.** "$P$ implica $Q$" è la stessa cosa di "**o** $P$ è falsa, **o** $Q$ è vera" — il che riformula la regola di sopra.

Questa equivalenza è utilissima per **negare** un'implicazione. Negare $P \Rightarrow Q$ significa negare $\neg P \lor Q$, e per De Morgan (lo vedremo) viene $P \land \neg Q$. Cioè: l'unica situazione in cui "se $P$ allora $Q$" è falsa è quando $P$ è vera e $Q$ è falsa. Confermato.

## I quantificatori: $\forall$ e $\exists$

Un **predicato** è un'affermazione su una variabile, tipo "$x$ è positivo". Diventa una proposizione (vera o falsa) appena specifichi *chi* è $x$. I quantificatori dicono "per chi vale".

- **Universale** $\forall x \in X,\ P(x)$. Si legge: "per ogni $x$ nell'insieme $X$ vale $P(x)$".
  Esempio: $\forall x \in \mathbb{N},\ x \ge 0$ — "ogni naturale è $\ge 0$". Vero.
- **Esistenziale** $\exists x \in X,\ P(x)$. Si legge: "esiste (almeno) un $x$ in $X$ tale che vale $P(x)$".
  Esempio: $\exists x \in \mathbb{N},\ x^2 = 4$ — "esiste un naturale il cui quadrato è 4". Vero ($x = 2$).
- **Unicità** $\exists! x \in X,\ P(x)$. "Esiste *uno e un solo* $x$ tale che $P(x)$".
  Esempio: $\exists! x \in \mathbb{R},\ x^3 = 8$ — "esiste un unico reale il cui cubo è 8". Vero ($x = 2$).

### La regola d'oro: $\forall \exists$ ≠ $\exists \forall$

Cambiare l'ordine dei quantificatori cambia il significato. Questo è **il** punto più importante di tutta la logica matematica.

**Esempio numerico, vita quotidiana.** Considera la frase:

> "Per ogni persona $p$, esiste una madre $m$ tale che $m$ è la madre di $p$."

$\forall p, \exists m : m$ è madre di $p$. Vera: ognuno ha una madre.

Adesso scambia l'ordine:

> "Esiste una madre $m$ tale che, per ogni persona $p$, $m$ è la madre di $p$."

$\exists m, \forall p : m$ è madre di $p$. Falsa: non esiste una persona che sia madre di *tutti*.

**Cosa è cambiato.** Nel primo caso, $m$ può dipendere da $p$ (madre diversa per persona diversa). Nel secondo, $m$ è scelta una volta sola e deve "funzionare" per tutti.

### L'esempio che useremo cento volte: continuità

Confronta le due definizioni (le rivedremo a fondo molti capitoli più avanti, qui solo per il pattern dei quantificatori):

$$\forall \varepsilon > 0,\ \exists \delta > 0 : |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon \quad \text{(continuità in $x_0$)}$$

$$\forall \varepsilon > 0,\ \exists \delta > 0 : \forall x_0,\ |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon \quad \text{(uniforme continuità)}$$

> **Glossarietto delle formule** — leggiamole simbolo per simbolo:
>
> - $f$ = una funzione (es. $f(x) = x^2$). Per ora pensala come una "scatola" che dato un numero ne restituisce un altro.
> - $x_0$ = un punto fissato (si legge "x con zero", dove "zero" è solo un'etichetta per dire "il punto di riferimento"). Tipo $x_0 = 3$.
> - $x$ = un punto generico, che faremo "muovere" vicino a $x_0$.
> - $\varepsilon$ ("epsilon", lettera greca) = una distanza piccolissima sull'asse dei valori $f(x)$. Si legge come "il margine di errore che accetto sul risultato".
> - $\delta$ ("delta", lettera greca) = una distanza piccolissima sull'asse degli $x$. Si legge come "quanto vicino a $x_0$ devo stare con l'input".
> - $|x - x_0|$ = la **distanza** tra $x$ e $x_0$ (le sbarrette $|\cdot|$ sono il "valore assoluto" = togli il segno meno se c'è). $|x - x_0| < \delta$ vuol dire "$x$ è entro $\delta$ da $x_0$".
> - $|f(x) - f(x_0)| < \varepsilon$ = "il valore di $f$ in $x$ è entro $\varepsilon$ dal valore di $f$ in $x_0$".
> - $\Rightarrow$ = "implica": se vale la cosa di sinistra, vale anche quella di destra.
>
> Tradotta in italiano corrente, la **prima formula** dice: "per ogni margine di errore $\varepsilon$ che mi prefisso, esiste una distanza $\delta$ tale che, se $x$ è dentro $\delta$ da $x_0$, allora $f(x)$ è dentro $\varepsilon$ da $f(x_0)$". A parole povere: "se sposto poco l'input, il risultato cambia poco". Questo è cosa significa "$f$ è continua in $x_0$".

**Cosa cambia tra le due.** Guarda *dove* sta $\forall x_0$:

- **Prima** (continuità in $x_0$): $x_0$ è fissato all'inizio, *fuori* dalla formula. Quindi quando scelgo $\delta$, posso usare informazioni su quel particolare $x_0$. **$\delta$ può dipendere da $x_0$.**
- **Seconda** (uniforme): $\forall x_0$ è *dentro* la formula, dopo $\exists \delta$. Quindi $\delta$ è scelto **prima** di vedere $x_0$, e poi deve funzionare per *tutti* gli $x_0$. **$\delta$ non può dipendere da $x_0$.**

La rileggerai cento volte. La prima volta è normale che ti sembri uguale: non lo è.

## Come si negano le formule con quantificatori

**Regola meccanica** (e dimostrabile):

$$\neg(\forall x,\ P(x)) \ \Leftrightarrow\ \exists x,\ \neg P(x)$$
$$\neg(\exists x,\ P(x)) \ \Leftrightarrow\ \forall x,\ \neg P(x)$$

**A parole.** Negare "per ogni" diventa "esiste un controesempio". Negare "esiste" diventa "non c'è nessuno", cioè "per ogni $x$ è falso".

### Esempio concreto: negare "$f$ è continua in $x_0$"

Partiamo dall'enunciato di continuità (lo abbiamo letto poco fa):
$$\forall \varepsilon > 0,\ \exists \delta > 0 : |x - x_0| < \delta \Rightarrow |f(x) - f(x_0)| < \varepsilon.$$

Lo neghiamo applicando la regola meccanica un quantificatore alla volta: ogni $\forall$ diventa $\exists$ e ogni $\exists$ diventa $\forall$, poi si nega il "cuore" della formula in fondo.

**Passi della negazione.** Partiamo dal $\forall$ più esterno:

1. $\neg(\forall \varepsilon > 0,\ \dots)$ diventa $\exists \varepsilon > 0,\ \neg(\dots)$. ("Non vale per ogni $\varepsilon$" = "esiste un $\varepsilon$ per cui non vale".)
2. Adesso devo negare $\exists \delta > 0,\ \dots$ → $\forall \delta > 0,\ \neg(\dots)$.
3. Resta da negare l'implicazione "$P \Rightarrow Q$" dove $P$ = "$|x - x_0| < \delta$" e $Q$ = "$|f(x) - f(x_0)| < \varepsilon$". Per quanto detto sopra: $\neg(P \Rightarrow Q) \iff P \land \neg Q$. Quindi: "$|x - x_0| < \delta$ **e** $|f(x) - f(x_0)| \ge \varepsilon$".
4. Però attenzione: nell'enunciato originale $x$ è una variabile libera, e leggendo bene "$P(x) \Rightarrow Q(x)$ vale per ogni $x$" è sottinteso un $\forall x$. Negandolo diventa $\exists x$.

Risultato finale:

$$\exists \varepsilon > 0,\ \forall \delta > 0,\ \exists x : |x - x_0| < \delta \land |f(x) - f(x_0)| \ge \varepsilon.$$

> **Glossarietto della formula** — leggiamola simbolo per simbolo:
>
> - $\exists \varepsilon > 0$ = "esiste una distanza positiva $\varepsilon$".
> - $\forall \delta > 0$ = "per quanto piccolo prendi $\delta > 0$".
> - $\exists x$ = "trovi un punto $x$".
> - $|x - x_0| < \delta$ = "$x$ è entro $\delta$ da $x_0$" (cioè *molto vicino*).
> - $\land$ = "e" (entrambe le condizioni valgono).
> - $|f(x) - f(x_0)| \ge \varepsilon$ = "il valore $f(x)$ dista *almeno* $\varepsilon$ dal valore $f(x_0)$" (cioè *non vicino*).

**Tradotto in italiano corrente.** "$f$ *non* è continua in $x_0$" vuol dire: esiste una soglia $\varepsilon$ (un "salto minimo") tale che, **per quanto vicino** ti metti a $x_0$ (per ogni $\delta$ piccolo), **riesci sempre a trovare** un $x$ entro quella vicinanza il cui valore $f(x)$ è comunque *distante* da $f(x_0)$ di almeno $\varepsilon$.

In pratica: **la funzione "salta" vicino a $x_0$**. Per quanto stringi sull'input, c'è sempre un campione che ti dà un output lontano.

## Le quattro tecniche di dimostrazione

Tutte le dimostrazioni che leggerai usano una di queste quattro (o una loro combinazione).

### 1. Dimostrazione diretta

**Per dimostrare $P \Rightarrow Q$:** assumi $P$, deduci $Q$ con passi logici.

**Esempio.** *Se $n$ è pari, allora $n^2$ è pari.*

*Dim.* "$n$ pari" significa $n = 2k$ per qualche intero $k$. Allora $n^2 = (2k)^2 = 4k^2 = 2 \cdot (2k^2)$. Il fattore 2 davanti dice che anche $n^2$ è pari. ∎

(Il simbolo ∎ chiude la dimostrazione: "fine", come in geometria QED, "quod erat demonstrandum".)

### 2. Dimostrazione per contronominale (o contrapositiva)

**Idea.** $P \Rightarrow Q$ è logicamente equivalente a $\neg Q \Rightarrow \neg P$. Cioè invece di "se A allora B", dimostro "se non-B allora non-A". A volte è molto più facile.

**Esempio.** *Se $n^2$ è pari, allora $n$ è pari.*

Dimostrarlo direttamente è scomodo (devi capire da $n^2 = 2m$ chi è $n$). Per contronominale invece è facile: dimostriamo "se $n$ è dispari, allora $n^2$ è dispari".

*Dim.* Sia $n = 2k+1$ (definizione di dispari). Allora
$$n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1.$$
Il "$+1$" in fondo dice che $n^2$ ha resto 1 nella divisione per 2: dispari. ∎

### 3. Dimostrazione per assurdo (*reductio ad absurdum*)

**Idea.** Per dimostrare $P$, assumi $\neg P$ e deduci una **contraddizione**. Se assumere il contrario ti porta a un assurdo, allora il contrario è falso, quindi $P$ è vera.

**Esempio storico.** *$\sqrt 2$ è irrazionale (cioè non si può scrivere come frazione fra due interi).*

> **Glossarietto.**
>
> - $\sqrt 2$ = "radice quadrata di 2" = quel numero positivo che moltiplicato per se stesso fa 2. Approssimativamente $1.414\dots$
> - **razionale** = un numero che si può scrivere come frazione $p/q$ con $p, q$ interi e $q \ne 0$. Esempi: $1/2$, $-3/7$, $5 = 5/1$.
> - **irrazionale** = non razionale (non c'è nessuna frazione che lo rappresenti esattamente).
> - **coprimi**: due interi $p, q$ sono coprimi se non hanno fattori comuni oltre a 1. Es: $3$ e $5$ sono coprimi; $6$ e $9$ no (hanno $3$ in comune).
> - $\gcd(p, q)$ = "massimo comune divisore" tra $p$ e $q$. Coprimi ↔ $\gcd(p, q) = 1$.
> - "$3 \mid p$" si legge "3 divide $p$": esiste un intero $m$ con $p = 3m$.

*Dim. (per assurdo).* Supponiamo che $\sqrt 2$ sia **razionale**. Quindi possiamo scrivere
$$\sqrt 2 = \frac{p}{q}$$
con $p, q$ interi, $q \ne 0$. Possiamo anche assumere $p$ e $q$ **coprimi** (se ci fosse un fattore comune, lo semplifichiamo finché non ce n'è più — operazione sempre lecita per le frazioni).

**Passo 1 — eleviamo al quadrato entrambi i lati.**
$$(\sqrt 2)^2 = \left(\frac{p}{q}\right)^2 \quad\Longrightarrow\quad 2 = \frac{p^2}{q^2}.$$
Moltiplicando per $q^2$:
$$p^2 = 2 q^2. \tag{$\ast$}$$
La $(\ast)$ dice: $p^2$ è $2$ moltiplicato per qualcosa, quindi $p^2$ è **pari**.

**Passo 2 — se $p^2$ è pari, allora $p$ è pari.** Lo abbiamo dimostrato sopra (esempio 2 con la contronominale: se $p$ fosse dispari, $p^2$ sarebbe dispari). Quindi $p$ è pari, cioè possiamo scrivere
$$p = 2m \quad\text{per qualche intero } m.$$

**Passo 3 — sostituiamo $p = 2m$ in $(\ast)$.**
$$(2m)^2 = 2 q^2 \quad\Longrightarrow\quad 4 m^2 = 2 q^2 \quad\Longrightarrow\quad q^2 = 2 m^2.$$
La stessa logica del Passo 1-2 applicata a $q$: $q^2$ è pari, quindi $q$ è pari.

**Passo 4 — l'assurdo.** Abbiamo concluso che **sia $p$ sia $q$ sono pari**. Ma allora hanno il fattore $2$ in comune, contraddicendo l'ipotesi iniziale che fossero **coprimi**. Contraddizione.

L'ipotesi di partenza ("$\sqrt 2$ è razionale") porta a un assurdo, quindi è falsa. Conclusione: $\sqrt 2$ è irrazionale. ∎

### 4. Dimostrazione per induzione

Per enunciati che dipendono da un numero naturale $n$ (tipo: "vale per ogni $n \ge 1$"). Vedremo a fondo nel [capitolo 3](03-induzione-naturali.html). Idea: dimostri il caso $n = 1$ (base) e poi mostri che, se vale per $n$, vale per $n+1$ (passo). Come una scala di domino: spingi la prima tessera, ogni tessera ne fa cadere la successiva, cadono tutte.

### Bonus: costruttiva vs non costruttiva

**Costruttiva.** Per dimostrare "esiste $x$ tale che $P(x)$", esibisci *un* $x$ specifico.

**Non costruttiva.** Dimostri che se *non* esistesse, ne uscirebbe un assurdo — senza mai esibire un $x$ esplicito.

Entrambe valide in logica classica. In matematica intuizionista solo la prima. Noi accettiamo entrambe.

### Esempio non costruttivo (curiosità famosa)

**Teorema.** Esistono due numeri irrazionali $a, b$ tali che $a^b$ è razionale.

*Dim.* Considera $c = \sqrt 2 ^{\sqrt 2}$. Due casi:

- **Caso 1:** $c$ è razionale. Allora prendendo $a = b = \sqrt 2$ (irrazionali entrambi) abbiamo $a^b = c$ razionale. Fine.
- **Caso 2:** $c$ è irrazionale. Allora prendendo $a = c$ (irrazionale per ipotesi) e $b = \sqrt 2$ (irrazionale), $a^b = c^{\sqrt 2} = (\sqrt 2^{\sqrt 2})^{\sqrt 2} = \sqrt 2 ^{(\sqrt 2 \cdot \sqrt 2)} = \sqrt 2 ^2 = 2$, razionale. Fine.

In entrambi i casi i due irrazionali esistono, quindi il teorema è dimostrato. ∎

**Curiosità.** Non sappiamo, dalla dimostrazione, *quale* dei due casi sia quello vero. (Per inciso: il teorema di Gelfond–Schneider dice che $c$ è irrazionale, ma è una macchina più pesante.) Eppure abbiamo dimostrato l'esistenza. Questa è la potenza della dimostrazione non costruttiva.

## Esercizi

<details>
<summary>Esercizio 1 — Negare un enunciato</summary>

Negare la frase in simboli: "$\forall n \in \mathbb{N},\ \exists m \in \mathbb{N} : m > n^2$".

**Soluzione.** Scambiamo i quantificatori e neghiamo la condizione finale:

$$\exists n \in \mathbb{N},\ \forall m \in \mathbb{N},\ m \le n^2.$$

In parole: "esiste un naturale $n$ tale che ogni naturale $m$ è $\le n^2$". Cioè $n^2$ è un maggiorante di $\mathbb{N}$. Falso (i naturali sono illimitati), quindi la frase originale è vera.
</details>

<details>
<summary>Esercizio 2 — Contrapositiva</summary>

Scrivere la contronominale di: "Se $x + y > 0$ allora $x > 0$ oppure $y > 0$".

**Soluzione.** Nego conclusione e ipotesi, scambiando:

"Se $x \le 0$ e $y \le 0$, allora $x + y \le 0$".

Quest'ultima è ovviamente vera (somma di due cose non positive è non positiva), quindi l'originale è vera.
</details>

<details>
<summary>Esercizio 3 — Per assurdo</summary>

Dimostrare per assurdo che $\sqrt 3$ è irrazionale.

**Soluzione.** Supponi $\sqrt 3 = p/q$ con $\gcd(p, q) = 1$ (coprimi). Allora $p^2 = 3 q^2$, quindi $3 \mid p^2$ (3 divide $p^2$).

**Lemma.** Se $3 \mid p^2$, allora $3 \mid p$. (Perché 3 è primo: se non dividesse $p$, non dividerebbe nemmeno $p^2$.)

Quindi $p = 3m$. Sostituendo: $9m^2 = 3 q^2$, cioè $q^2 = 3 m^2$, quindi $3 \mid q$.

Ma allora $3 \mid \gcd(p, q) = 1$, assurdo. ∎
</details>

<details>
<summary>Esercizio 4 — Quantificatori sulle successioni</summary>

Tradurre in simboli: "La successione $(a_n)$ tende a $L$" e negarlo.

**Soluzione.**

Tendere a $L$ significa: "per ogni distanza piccola $\varepsilon$ scelta, da un certo indice $N$ in poi i $a_n$ sono entro $\varepsilon$ da $L$".

In simboli: $\forall \varepsilon > 0,\ \exists N \in \mathbb{N} : \forall n \ge N,\ |a_n - L| < \varepsilon$.

Negazione (scambiamo $\forall \leftrightarrow \exists$ uno alla volta):

$\exists \varepsilon > 0,\ \forall N \in \mathbb{N},\ \exists n \ge N : |a_n - L| \ge \varepsilon$.

A parole: "esiste una soglia $\varepsilon$ tale che, comunque lontano (indice $N$) tu vada, trovi un termine $a_n$ ancora *distante* da $L$ di almeno $\varepsilon$".
</details>

## Trappole comuni

- **"P o Q" è inclusivo.** "Vado al cinema o a cena": potresti fare entrambe le cose. La "o esclusiva" (una sì e l'altra no) si scrive $P \oplus Q$ e non la useremo quasi mai.
- **Implicazione "a vuoto".** $P \Rightarrow Q$ è vera quando $P$ è falsa, qualsiasi sia $Q$. Non è una furbizia: tiene insieme la teoria.
- **Confondere $\forall \exists$ e $\exists \forall$.** Esempio:
  - $\forall x \in \mathbb{R},\ \exists y \in \mathbb{R} : x + y = 0$. Vero (basta $y = -x$).
  - $\exists y \in \mathbb{R},\ \forall x \in \mathbb{R} : x + y = 0$. Falso (non esiste *un solo* $y$ che annulli ogni $x$).
- **Dimenticare il dominio.** "$\forall x$" senza specificare *dove* è ambiguo. Sempre: $\forall x \in X$, $\exists x \in X$.

> **Pillola operativa.** Quando leggi un teorema con tre o più quantificatori, **scrivilo a margine numerandoli** ($\forall_1 \varepsilon, \exists_2 \delta, \forall_3 x \dots$). E poi traduci ciascuno in italiano. Senza questa abitudine, dopo cinque mesi avrai gli stessi dubbi.

## Riassunto in una riga

I quantificatori $\forall$ e $\exists$ scritti nell'ordine giusto sono la spina dorsale di ogni definizione dell'analisi — saperli leggere, negare e usare è il prerequisito a tutto il resto.
