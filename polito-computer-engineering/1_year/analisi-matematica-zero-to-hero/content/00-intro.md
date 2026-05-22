---
title: Cos'è l'analisi matematica
area: Preliminari
summary: "Una mappa del percorso, della disciplina e del metodo. Spiegato a chi non ha mai sentito parlare di \"limite\", \"derivata\" o \"integrale\" — partendo dalle domande concrete che hanno fatto nascere tutto."
order: 0
level: principiante
prereq:
  - "Saper leggere i numeri (interi e frazioni)"
  - "Voglia di non saltare le pagine 'difficili'"
tools:
  - "Walter Rudin — *Principles of Mathematical Analysis* (il libro classico per chi vuole rigore puro)"
  - "Enrico Giusti — *Analisi Matematica 1* (italiano, paziente)"
  - "Paolo Marcellini, Carlo Sbordone — *Analisi Matematica I*"
  - "Tom Apostol — *Calculus, Vol. 1* (più amichevole, parte dalla storia)"
---

# Cos'è l'analisi matematica

## Un disclaimer onesto

Se sei qui per "passare l'esame di Analisi I", funzionerà — ma è solo un sottoprodotto. Il vero scopo di questo sito è farti **capire perché** l'analisi è fatta come è fatta. La differenza tra chi memorizza ricette e chi capisce, nei cinque anni di università e nei trent'anni dopo, è enorme.

Promessa pratica: **ogni formula sarà tradotta in italiano**, ogni simbolo nuovo sarà spiegato prima di essere usato, ogni "passaggio facile" sarà *davvero* facile (perché lo apriremo noi).

## Cosa significa "analisi matematica", a parole

L'analisi matematica è la disciplina che studia **come cambiano le quantità** e **come si sommano infinite cose piccole**.

Sembra astratto? Riformuliamo con tre esempi che ognuno ha incontrato.

### Esempio 1 — Quanto vai veloce *adesso*?

Se viaggi 90 km in 1 ora, la tua **velocità media** è 90 km/h. Facile: dividi spazio per tempo.

Ma se il tuo tachimetro segna 90 km/h **in questo istante**, cosa significa? Non hai percorso un'ora — hai percorso *un istante*, che dura zero. La divisione $90 / 0$ non esiste.

Eppure la velocità *adesso* esiste — è ciò che dice il tachimetro. L'analisi inventa lo strumento per definirla con rigore: si chiama **derivata**. Tradotto in italiano: "rapporto tra spazio percorso e tempo impiegato, quando il tempo impiegato diventa piccolissimo".

### Esempio 2 — Quanto è grande quell'area "storta"?

Un rettangolo ha area `base × altezza`. Un triangolo, `base × altezza / 2`. Tutti d'accordo.

E sotto la curva $y = x^2$ tra $x = 0$ e $x = 1$? Non è un poligono. Non c'è una formula della geometria che ti dia la risposta diretta.

L'idea dell'analisi è geniale: spezza l'area "storta" in **tantissime striscioline rettangolari sottilissime**, somma le aree delle striscioline, e fai diventare le striscioline *infinitamente* sottili. Lo strumento si chiama **integrale**. Tradotto: "somma di infinite cose minuscole".

### Esempio 3 — Cos'è $1/2 + 1/4 + 1/8 + 1/16 + \dots$?

Aggiungi metà, poi un quarto, poi un ottavo, e così via *per sempre*. Quanto fa?

Risposta: **esattamente 1**. Non "circa 1", non "1 a meno di un errore" — esattamente 1.

Ma cosa vuol dire "sommare infiniti numeri"? Non possiamo davvero farlo, finiremmo nel 2099 e non avremmo concluso. L'analisi inventa il modo di dare un *significato* a questa somma infinita. Lo strumento si chiama **serie** (o "somma infinita"). Tradotto: "valore a cui si avvicina sempre di più la somma dei primi $n$ termini, man mano che $n$ cresce".

### Il filo comune: il limite

I tre esempi sopra hanno **una cosa in comune**: c'è un processo "che continua all'infinito" e noi vogliamo dire dove "va a finire". Questo concetto si chiama **limite**.

Il limite è il mattone di tutta l'analisi. Derivate, integrali, serie: sono tutti casi particolari del concetto di limite applicato a oggetti diversi.

> **Pillola.** Se all'inizio del corso ti chiedi "ma alla fine cosa sto facendo davvero?" — la risposta è sempre la stessa: *un limite*. Cambia solo chi sta dentro al limite.

## Perché esiste questa disciplina (in 60 secondi di storia)

Nel 1665, Newton ha inventato il calcolo per studiare il moto dei pianeti. Negli stessi anni, Leibniz lo ha inventato indipendentemente per problemi geometrici. Entrambi usavano il concetto di "quantità infinitamente piccola" (infinitesimo) in modo intuitivo ma logicamente traballante.

Funzionava per i conti — niente da dire — ma matematici come Berkeley nel 1734 obiettavano: "Cos'è una quantità così piccola da essere quasi zero, ma non zero? È un fantasma di quantità defunta."

Per un secolo e mezzo, la matematica ha vissuto in questo limbo. Poi nell'Ottocento Cauchy, Weierstrass, Dedekind, Riemann e Cantor hanno *messo le fondamenta* — hanno definito *cosa significa* "limite", "continuo", "numero reale" in modo rigoroso. Quello che leggi in questo corso è essenzialmente la loro versione (con qualche aggiustamento moderno).

**Morale.** Quando ti sembra che le definizioni siano *complicate inutilmente* — con quei "per ogni $\varepsilon$ esiste $\delta$" che fanno paura — ricordati che ci sono voluti **150 anni** per arrivare a quelle formulazioni. Sono complicate perché difendono da paradossi che altrimenti spunterebbero ovunque.

## La mappa del percorso

Il corso è organizzato in 9 "blocchi" tematici, ognuno costruito sul precedente. Niente salti: ogni capitolo usa attivamente quelli prima.

<div class="chart">
<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#d4af37"/>
      <stop offset="1" stop-color="#e8a04a"/>
    </linearGradient>
  </defs>
  <rect x="20" y="20" width="200" height="80" rx="6" fill="#111a30" stroke="#d4af37"/>
  <text x="120" y="55" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">PRELIMINARI</text>
  <text x="120" y="75" text-anchor="middle" fill="#d8d3bd" font-size="11">logica · insiemi · induzione</text>

  <rect x="260" y="20" width="200" height="80" rx="6" fill="#111a30" stroke="#6aa9d8"/>
  <text x="360" y="55" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">NUMERI REALI</text>
  <text x="360" y="75" text-anchor="middle" fill="#d8d3bd" font-size="11">assiomi · sup · completezza</text>

  <rect x="500" y="20" width="200" height="80" rx="6" fill="#111a30" stroke="#6fb38a"/>
  <text x="600" y="55" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">SUCCESSIONI</text>
  <text x="600" y="75" text-anchor="middle" fill="#d8d3bd" font-size="11">limiti · Cauchy · BW</text>

  <rect x="20" y="120" width="200" height="80" rx="6" fill="#111a30" stroke="#e8a04a"/>
  <text x="120" y="155" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">FUNZIONI E LIMITI</text>
  <text x="120" y="175" text-anchor="middle" fill="#d8d3bd" font-size="11">elementari · ε-δ · continuità</text>

  <rect x="260" y="120" width="200" height="80" rx="6" fill="#111a30" stroke="#e8a04a"/>
  <text x="360" y="155" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">DERIVATE</text>
  <text x="360" y="175" text-anchor="middle" fill="#d8d3bd" font-size="11">regole · Lagrange · Taylor</text>

  <rect x="500" y="120" width="200" height="80" rx="6" fill="#111a30" stroke="#e8a04a"/>
  <text x="600" y="155" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">INTEGRALI</text>
  <text x="600" y="175" text-anchor="middle" fill="#d8d3bd" font-size="11">Riemann · TFC · impropri</text>

  <rect x="20" y="220" width="200" height="80" rx="6" fill="#111a30" stroke="#9890b8"/>
  <text x="120" y="255" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">SERIE</text>
  <text x="120" y="275" text-anchor="middle" fill="#d8d3bd" font-size="11">criteri · potenze · Fourier</text>

  <rect x="260" y="220" width="200" height="80" rx="6" fill="#111a30" stroke="#9890b8"/>
  <text x="360" y="255" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">EDO</text>
  <text x="360" y="275" text-anchor="middle" fill="#d8d3bd" font-size="11">primo ordine · lineari · Cauchy</text>

  <rect x="500" y="220" width="200" height="80" rx="6" fill="#111a30" stroke="#9890b8"/>
  <text x="600" y="255" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">PIÙ VARIABILI</text>
  <text x="600" y="275" text-anchor="middle" fill="#d8d3bd" font-size="11">R^n · derivate parziali</text>

  <rect x="20" y="320" width="680" height="40" rx="6" fill="#111a30" stroke="#e07a8d"/>
  <text x="360" y="345" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">OLTRE: LEBESGUE · BANACH · HILBERT · ESERCIZIARIO · GLOSSARIO · FORMULARIO</text>
</svg>
<div class="chart-caption">Mappa del percorso. Ogni blocco è un'area che attraverseremo. Si legge in ordine: ogni blocco usa il precedente.</div>
</div>

### A cosa serve ogni blocco

- **Preliminari** — il *linguaggio*. Quantificatori ($\forall$ = "per ogni", $\exists$ = "esiste"), insiemi, dimostrazioni. Senza, non si scrive matematica.
- **Numeri reali** — il *terreno*. Cos'è esattamente $\mathbb{R}$? Perché $\sqrt 2$ esiste se i razionali "non bastano"?
- **Successioni** — le *liste infinite di numeri*. Primo posto dove incontri il limite "in carne e ossa".
- **Funzioni e limiti** — i *grafici* (parabole, esponenziali, seno…) e come si avvicinano a un valore quando $x$ si avvicina a un altro.
- **Derivate** — la *pendenza istantanea* di una curva. Velocità nel caso fisico.
- **Integrali** — *l'area sotto* una curva. Spazio percorso nel caso fisico.
- **Serie** — le *somme infinite*. Da Zenone a Fourier.
- **EDO** — le *equazioni che coinvolgono derivate*. Modellano fisica, biologia, economia.
- **Più variabili** — quando la funzione dipende da più di un numero ($f(x, y, z)$). Anticipo per Analisi II.

## Come è scritta ogni pagina

Ogni capitolo segue questo schema:

1. **Intuizione** — la frase a parole comprensibile a chiunque sappia leggere.
2. **Definizione formale** — i simboli matematici, ognuno spiegato. Niente "sai cos'è $\delta$, vero?": lo introduciamo.
3. **Teoremi e dimostrazioni** — passo per passo, *senza* "è facile vedere che…". Se è facile, lo apriamo.
4. **Esempi lavorati** — almeno due-tre esempi numerici, calcolati a mano fino in fondo.
5. **Esercizi** — con soluzione nascosta. Provaci prima di sbirciare.
6. **Trappole** — gli errori che fanno tutti, e perché.
7. **Riassunto in una riga** — quello che devi *davvero* portarti a casa.

## Una promessa esplicita

- Nessuna dimostrazione che parte con "è ovvio che" prima di un passaggio non ovvio.
- Ogni nuovo simbolo è introdotto con il suo *nome in italiano* e un esempio.
- Ogni formula importante è seguita da una **traduzione in parole**.
- I grafici sono SVG inline ad alta risoluzione, non screenshot illeggibili.

## Quanto ci metterai

- Da zero, con disciplina (1 ora al giorno, esercizi inclusi): **6–9 mesi** per arrivare in fondo.
- Da liceo scientifico ben fatto: **3–5 mesi**.
- Per ripasso intensivo pre-esame: vai prima al [glossario](58-glossario-az.html) e al [formulario](59-formulario-completo.html), poi rileggi le sezioni in cui scopri di avere buchi.

Non è una gara: l'analisi non si "finisce", si interiorizza. Si torna indietro a rileggere un capitolo con occhi nuovi dopo averne digerito uno successivo. È normale.

## Prossimo passo

Vai alla prossima sezione — [Logica per l'analisi](01-logica-dimostrazioni.html) — dove vediamo i simboli $\forall$ e $\exists$ (quelli del titolo): senza di loro non si scrive nemmeno una definizione.

> **Filosofia in una riga.** "L'analisi è la disciplina che ti insegna a non aver paura dell'infinito" (parafrasando Hilbert). Ti farà cambiare il modo di pensare alle quantità per il resto della vita.

## Riassunto in una riga

L'analisi matematica è lo studio rigoroso del cambiamento e del limite — e nasce per rispondere a tre domande: *quanto cambia? quanto è grande? a cosa tende?*
