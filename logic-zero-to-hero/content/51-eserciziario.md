---
title: "Eserciziario completo con soluzioni"
area: "Reference"
summary: "Trenta esercizi su logica formale, fallacie, Bayes, problem solving, paradossi, argomentazione. Soluzione completa nascosta in &lt;details&gt;."
order: 51
level: "intermedio"
prereq: []
tools:
  - "Carta e penna"
---

# Eserciziario completo con soluzioni

Trenta esercizi che attraversano il corso. Risolvili prima di leggere la soluzione. Quando incollati, certi richiedono notazioni con KaTeX che potrebbero non funzionare in tutti i lettori — il testo è comunque comprensibile.

## A — Logica proposizionale e inferenza

### Esercizio 1 — Tabella di verità

Costruisci la tabella di verità di $(p \rightarrow q) \rightarrow ((q \rightarrow r) \rightarrow (p \rightarrow r))$. È una tautologia?

<details>
  <summary>Soluzione</summary>

8 righe ($2^3$). Si verifica che la formula vale V in tutte. È una **tautologia** — è una versione del **sillogismo ipotetico** in forma di implicazione.
</details>

### Esercizio 2 — Equivalenza

Mostra che $(p \rightarrow q) \wedge (p \rightarrow r) \equiv p \rightarrow (q \wedge r)$.

<details>
  <summary>Soluzione</summary>

$(p \rightarrow q) \wedge (p \rightarrow r) \equiv (\neg p \vee q) \wedge (\neg p \vee r)$ (implicazione materiale)
$\equiv \neg p \vee (q \wedge r)$ (distributiva)
$\equiv p \rightarrow (q \wedge r)$. ✓
</details>

### Esercizio 3 — Conversione in CNF

Convertire in CNF: $\neg(p \rightarrow (q \vee \neg r))$.

<details>
  <summary>Soluzione</summary>

$\neg(p \rightarrow (q \vee \neg r)) \equiv \neg(\neg p \vee q \vee \neg r) \equiv p \wedge \neg q \wedge r$. Tre clausole unitarie.
</details>

### Esercizio 4 — Dimostrazione strutturata

Da $p \rightarrow q$, $r \rightarrow \neg q$, $p$, deduci $\neg r$.

<details>
  <summary>Soluzione</summary>

1. $p \rightarrow q$ (P)
2. $r \rightarrow \neg q$ (P)
3. $p$ (P)
4. $q$ (MP 1, 3)
5. $\neg\neg q$ (doppia neg. 4)
6. $\neg r$ (MT 2, 5)
</details>

### Esercizio 5 — Fallacia o regola valida?

"Se piove la strada è bagnata. La strada è bagnata. Quindi piove."

<details>
  <summary>Soluzione</summary>

**Fallacia di affermazione del conseguente**. Schema $p \rightarrow q, q \vdash p$ non valido (controesempio: pioggia/strada → potrebbe essere irrigazione).
</details>

### Esercizio 6 — Quantificatori

Traduci in FOL: "Ogni studente ama almeno un professore". Dominio: persone. $S(x)$ = studente, $P(x)$ = professore, $L(x,y)$ = $x$ ama $y$.

<details>
  <summary>Soluzione</summary>

$\forall x \, (S(x) \rightarrow \exists y \, (P(y) \wedge L(x,y)))$.
</details>

## B — Fallacie

### Esercizio 7

"Non puoi criticare l'esercito perché non hai mai prestato servizio."

<details>
  <summary>Soluzione</summary>

**Ad hominem circumstantial** (genetic + tu quoque variant): rifiuto dell'argomento per la posizione del parlante. La validità di una critica non dipende dall'aver fatto il servizio.
</details>

### Esercizio 8

"Lavorare più ore aumenta lo stipendio. Tu vuoi più stipendio. Quindi devi lavorare più ore."

<details>
  <summary>Soluzione</summary>

**Premessa nascosta sub-valutata**: trascura alternative (cambio lavoro, ricontrattazione, formazione). Non una fallacia formale stretta ma argomento debole / **false dichotomy** implicita.
</details>

### Esercizio 9

"Se permettiamo i matrimoni omosessuali, presto consentiremo anche poligamia, incesto e matrimoni con animali."

<details>
  <summary>Soluzione</summary>

**Slippery slope** (china scivolosa). Senza meccanismo causale che leghi i passaggi, è un'estrapolazione retorica.
</details>

### Esercizio 10

"Il prof. Rossi, premio Nobel in fisica, dice che il cambiamento climatico è una bufala. Quindi lo è."

<details>
  <summary>Soluzione</summary>

**Appeal to inappropriate authority**. Il Nobel in fisica non implica competenza in climatologia. Sull'argomento esiste consenso scientifico nelle riviste di climatologia.
</details>

## C — Probabilità e Bayes

### Esercizio 11 — Bayes test medico (variante)

Malattia con prevalenza 1%. Test con sensibilità 95%, specificità 90%. Calcola $P(M \mid +)$.

<details>
  <summary>Soluzione</summary>

$P(M) = 0.01$, $P(+|M) = 0.95$, $P(+|\bar M) = 0.10$.
$P(+) = 0.95 \cdot 0.01 + 0.10 \cdot 0.99 = 0.0095 + 0.099 = 0.1085$.
$P(M | +) = 0.0095 / 0.1085 \approx 8.76\%$.
</details>

### Esercizio 12 — Bayes due test

Stesso scenario, fai due test indipendenti, entrambi positivi. Probabilità di malattia?

<details>
  <summary>Soluzione</summary>

Dopo il primo test, prior aggiornato $P(M) \approx 0.0876$. Likelihood ratio = $0.95 / 0.10 = 9.5$.
Prior odds = $0.0876 / 0.9124 \approx 0.096$. Posterior odds = $0.096 \cdot 9.5 \approx 0.912$. Probabilità $0.912 / 1.912 \approx 47.7\%$.
</details>

### Esercizio 13 — Monty Hall a 100 porte

100 porte, una con auto. Scegli una. Monty apre 98 porte (tutte capre). Devi cambiare?

<details>
  <summary>Soluzione</summary>

Probabilità prima scelta sia auto: $1/100$. Probabilità che la porta restante (non aperta da te) sia auto: $99/100$. **Cambia sempre**.
</details>

### Esercizio 14 — Simpson's paradox

Università ha tasso ammissione totale: maschi 50%, femmine 30%. Per dipartimento: A — M 70%, F 75%. B — M 20%, F 25%. Spiega.

<details>
  <summary>Soluzione</summary>

In ogni dipartimento le donne hanno tasso superiore. Probabilmente le donne si candidano di più al dip. B (più selettivo). L'aggregato favorisce gli uomini perché si candidano al dip. A più "facile". Esempio di Simpson's paradox. Aggregando perdi informazione causale.
</details>

### Esercizio 15 — Linda problem

Linda è 31, single, brillante, attivista femminista. Quale più probabile? (a) Linda è bancaria. (b) Linda è bancaria attiva nel movimento femminista.

<details>
  <summary>Soluzione</summary>

(a) è **più probabile** per gli assiomi della probabilità: $P(A \wedge B) \le P(A)$. Tversky-Kahneman 1983: la maggior parte risponde (b) — **conjunction fallacy** + **representativeness heuristic**.
</details>

## D — Problem solving e euristiche

### Esercizio 16 — Pesi e bilancia

Hai 8 palline identiche tranne una più pesante. Con una bilancia a due piatti, qual è il numero minimo di pesate per trovarla?

<details>
  <summary>Soluzione</summary>

**2 pesate**. Dividi in 3 gruppi (3, 3, 2). Pesa 3 vs 3. Se pari, la pesante è nei 2 — pesa una contro l'altra. Se sbilanciato, la pesante è nei 3 — prendi 1 vs 1 dei tre.
</details>

### Esercizio 17 — 17 cammelli (problema classico)

Un uomo lascia in eredità ai figli 17 cammelli da dividere così: 1/2 al primo, 1/3 al secondo, 1/9 al terzo. Come fare senza dividere cammelli?

<details>
  <summary>Soluzione</summary>

Aggiungi un 18° cammello (prestito). $18/2=9$, $18/3=6$, $18/9=2$. Totale 9+6+2=17. Il 18° resta, viene restituito. Trucco: $1/2+1/3+1/9 = 17/18 \ne 1$, l'eredità è sotto-specificata — il prestito completa il calcolo.
</details>

### Esercizio 18 — Lampadine

Tre interruttori in una stanza controllano 3 lampadine in un'altra stanza. Entri una sola volta. Come capisci?

<details>
  <summary>Soluzione</summary>

Accendi A per 10 minuti, spegnilo, accendi B, entra. Quella accesa = B. Quella spenta e calda = A. Quella spenta e fredda = C. Sfrutta un canale extra (calore).
</details>

### Esercizio 19 — Polya: somma di Gauss

Dimostra che $1 + 2 + \ldots + n = n(n+1)/2$ per induzione.

<details>
  <summary>Soluzione</summary>

Base $n=1$: $1 = 1 \cdot 2/2$. ✓
Passo: assumi $1+\ldots+n = n(n+1)/2$. Aggiungi $(n+1)$: $n(n+1)/2 + (n+1) = (n+1)(n/2 + 1) = (n+1)(n+2)/2$. ✓
</details>

## E — Argomentazione e dibattito

### Esercizio 20 — Toulmin

Mappa: "L'Italia deve adottare la cittadinanza per ius scholae perché i ragazzi nati e cresciuti qui sono italiani de facto."

<details>
  <summary>Soluzione</summary>

- **Claim**: adottare ius scholae.
- **Data/grounds**: ragazzi nati e cresciuti in Italia.
- **Warrant**: "italianità de facto = diritto alla cittadinanza formale".
- **Backing implicito**: principi di equità, integrazione.
- **Rebuttal/qualifier mancanti**: l'argomento non considera le obiezioni (sovranità nazionale come prerogativa politica, parametri specifici, contesto europeo).
</details>

### Esercizio 21 — Steelman

Steelman: "L'IA generativa va vietata."

<details>
  <summary>Soluzione</summary>

Versione steel: l'IA generativa, in assenza di regolamentazione, sostituisce massivamente lavoro intellettuale, accelera disinformazione (deepfake), concentra potere economico in poche aziende USA/Cina senza controllo democratico, e i suoi sistemi non sono comprensibili neanche dai loro creatori (alignment problem). Un divieto preventivo come quello sul clonaggio umano sarebbe legittimo finché non emergono standard sicuri.

Punti deboli da affrontare: l'IA produce anche benefici massicci (medicina, ricerca scientifica); il divieto in alcuni paesi sposta la ricerca altrove; e il divieto totale è probabilmente irraggiungibile. Una risposta seria deve discutere *regolamentazione mirata*, non rifiuto del problema.
</details>

### Esercizio 22 — Dilemma del prigioniero

Costruisci la matrice payoff per "due aziende che decidono se applicare pubblicità ingannevole" e analizza.

<details>
  <summary>Soluzione</summary>

| | Altra: onesta | Altra: ingannevole |
|---|---|---|
| **Tu onesta** | 5, 5 | 2, 8 |
| **Tu ingannevole** | 8, 2 | 3, 3 |

Strategia dominante per ciascuna: ingannevole. Equilibrio Nash: (3,3) — peggiore per entrambe rispetto a (5,5). Soluzioni: regolamentazione esterna (autorità garante), reputazione di lungo termine (gioco ripetuto), accordi di settore.
</details>

## F — Paradossi e ragionamento

### Esercizio 23 — Paradosso del compleanno

Quante persone servono perché la probabilità di compleanno comune superi 0.99?

<details>
  <summary>Soluzione</summary>

$1 - \prod_{k=0}^{n-1}(365-k)/365 > 0.99$. Numericamente, $n=57$ dà ~0.99. Per ogni 1% di certezza supplementare servono pochi nomi in più.
</details>

### Esercizio 24 — Paradosso di Russell

Sia $R = \{x : x \notin x\}$ (l'insieme degli insiemi che non contengono se stessi). Mostra contraddizione.

<details>
  <summary>Soluzione</summary>

Se $R \in R$, allora per definizione $R \notin R$. Se $R \notin R$, allora $R \in R$. Contraddizione. Ha portato all'abbandono della set theory naive verso ZFC con assioma di separazione restrittivo.
</details>

### Esercizio 25 — Sorites

Un mucchio di 10000 grani di sabbia è un mucchio. Togli uno, è ancora un mucchio? Sì. Iterando? Mostra il paradosso.

<details>
  <summary>Soluzione</summary>

Premessa 1: 10000 grani = mucchio.
Premessa 2: se $n$ grani = mucchio, anche $n-1$ = mucchio (1 grano è poco).
Per induzione: 1 grano = mucchio, 0 grani = mucchio. Assurdo.

Soluzioni: predicati vaghi non hanno verità bivalente; logica fuzzy; concezione contestuale.
</details>

## G — Epistemologia e scienza

### Esercizio 26 — Gettier case

Costruisci un Gettier case in cui $S$ ha JTB ma non sa.

<details>
  <summary>Soluzione</summary>

Maria sente alla radio "il treno per Roma arriva alle 9:00". Crede "il treno arriva alle 9:00". Giustificata dalla radio. Per caso il treno arriva alle 9:00 (ma la notizia era vecchia, una variante del prossimo orario era 9:15 — il treno è in ritardo di 15 min). JTB ma intuitivamente non sa.
</details>

### Esercizio 27 — Popper

L'omeopatia diluita oltre il numero di Avogadro (es. 30C) ha effetti curativi maggiori del placebo. Falsificabile? Test?

<details>
  <summary>Soluzione</summary>

Sì, falsificabile. RCT in doppio cieco. Test condotti (Linde 1997, Shang 2005): l'effetto si annulla con dimensioni di campione adeguate e blinding stretto. Falsificata empiricamente.
</details>

## H — Sistemi complessi e wicked

### Esercizio 28 — Cynefin classification

Classifica via Cynefin: (a) fare un caffè con la moka; (b) progettare un razzo per Marte; (c) ridurre il bullismo nelle scuole.

<details>
  <summary>Soluzione</summary>

(a) Clear (procedura ovvia).
(b) Complicated (richiede analisi esperta ma soluzione conoscibile a priori).
(c) Complex (esiti emergenti, vari attori, valori in tensione).
</details>

## I — Causalità

### Esercizio 29 — DAG

In un dataset, fumare e cancro al polmone sono correlati. È causazione? Disegna DAG con possibile confounder.

<details>
  <summary>Soluzione</summary>

Pearl considera: $G$ (gene) $\to F$ (fumo), $G \to C$ (cancro). Il "gene" sarebbe un confounder. La RCT in doppio cieco è eticamente impossibile. Studi gemellari, naturali experimenti (es. taxa improvvise), Mendelian randomization → l'evidenza converge che fumo *causa* cancro, non solo correla via gene.
</details>

### Esercizio 30 — Frontdoor

In un grafo $X \to M \to Y$ con confounder $U$ tra $X$ e $Y$, e $U$ non osservabile, ma $M$ osservabile e *non* causato da $U$, come si stima $P(Y|do(X))$?

<details>
  <summary>Soluzione</summary>

Frontdoor: $P(Y|do(X)) = \sum_m P(M=m|X) \sum_{x'} P(Y|M=m, X=x') P(X=x')$. Pearl-1995.
</details>

## Sintesi

- 30 esercizi su 8 aree: prop. logica, fallacie, Bayes, problem solving, argomentazione, paradossi, epistemologia, complessità, causalità.
- Lavorali a mano prima di guardare le soluzioni.
- La maggior parte ha collegamenti diretti a sezioni specifiche del corso — torna lì se ti blocchi.

## Letture

- Smullyan, *What Is the Name of This Book?* — puzzle logici.
- Engel, *Problem-Solving Strategies* (1998).
- Mosteller, *Fifty Challenging Problems in Probability*.
