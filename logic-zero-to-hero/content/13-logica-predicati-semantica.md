---
title: "FOL: semantica, modelli, validità"
area: "Logica formale"
summary: "Le formule FOL prendono vita: una struttura interpreta i simboli, un'assegnazione dà valori alle variabili, e la relazione di soddisfacibilità di Tarski stabilisce quando una formula è vera. Validità, modelli, compactness."
order: 13
level: "avanzato"
prereq:
  - "Aver letto [Logica dei predicati: sintassi](12-logica-predicati-sintassi.html)"
  - "Aver letto [Insiemi e funzioni](14-insiemi-relazioni-funzioni.html)"
tools:
  - "Carta e penna"
  - "Software opzionale: Tarski's World per modelli grafici"
---

# FOL: semantica, modelli, validità

Le formule del primo ordine, viste in [sez. 12](12-logica-predicati-sintassi.html), sono finora solo stringhe ben formate. Per attribuir loro un significato — e quindi un valore di verità — serve la **semantica**, sviluppata in forma matura da Alfred Tarski negli anni '30 (*Der Wahrheitsbegriff in den formalisierten Sprachen*, 1933). L'idea è che una formula non è "vera in sé": è vera **in una struttura** (un universo concreto) sotto **un'assegnazione** delle variabili libere. La validità — verità in *tutte* le strutture — è il concetto chiave.

Questa sezione introduce strutture, soddisfacibilità, validità; mostra esempi di modelli (aritmetica, grafi, relazioni di parentela); discute il **controesempio** come strumento per refutare la validità; enuncia tre risultati metateorici fondamentali (compactness, Löwenheim-Skolem) e accenna alla differenza con la logica del **secondo ordine**.

## 1. Struttura (o modello) di un linguaggio

Dato un linguaggio $\mathcal{L}$ con costanti, simboli di funzione e di predicato, una **struttura** (o $\mathcal{L}$-interpretazione) $\mathcal{M}$ consiste di:

1. un **dominio** non vuoto $M$ (l'universo del discorso);
2. per ogni costante $c$, un elemento $c^{\mathcal{M}} \in M$;
3. per ogni simbolo di funzione $n$-ario $f$, una funzione $f^{\mathcal{M}}: M^n \rightarrow M$;
4. per ogni simbolo di predicato $n$-ario $P$, una relazione $P^{\mathcal{M}} \subseteq M^n$.

Esempio. Linguaggio aritmetico $\mathcal{L}_{\text{ar}}$ = $\{0, S, +, \cdot, =\}$. La **struttura standard** $\mathfrak{N}$ ha:

- $M = \mathbb{N}$;
- $0^{\mathfrak{N}} = 0$;
- $S^{\mathfrak{N}}(n) = n+1$;
- $+^{\mathfrak{N}}, \cdot^{\mathfrak{N}}$ le solite operazioni;
- $=^{\mathfrak{N}}$ l'identità.

Ma si può interpretare lo stesso linguaggio in **strutture non standard**: per esempio prendendo $M$ come gli interi modulo 7, $S(n) = n+1 \mod 7$. In questa struttura $S^7(0) = 0$ — falso nell'aritmetica standard.

## 2. Assegnazione e valutazione

Un'**assegnazione** è una funzione $s : \text{Var} \rightarrow M$ che dà a ciascuna variabile un elemento del dominio. Il **valore** di un termine $t$ in $\mathcal{M}$ sotto $s$, scritto $t^{\mathcal{M}}[s]$, si definisce induttivamente:

- $x^{\mathcal{M}}[s] = s(x)$
- $c^{\mathcal{M}}[s] = c^{\mathcal{M}}$
- $f(t_1, \ldots, t_n)^{\mathcal{M}}[s] = f^{\mathcal{M}}(t_1^{\mathcal{M}}[s], \ldots, t_n^{\mathcal{M}}[s])$

## 3. Soddisfacibilità (definizione di Tarski)

La relazione $\mathcal{M}, s \models \varphi$ ("$\mathcal{M}$ soddisfa $\varphi$ sotto $s$") si definisce ricorsivamente sulla struttura di $\varphi$:

- $\mathcal{M}, s \models P(t_1, \ldots, t_n)$ sse $(t_1^{\mathcal{M}}[s], \ldots, t_n^{\mathcal{M}}[s]) \in P^{\mathcal{M}}$
- $\mathcal{M}, s \models t_1 = t_2$ sse $t_1^{\mathcal{M}}[s] = t_2^{\mathcal{M}}[s]$
- $\mathcal{M}, s \models \neg \varphi$ sse non $\mathcal{M}, s \models \varphi$
- $\mathcal{M}, s \models \varphi \wedge \psi$ sse $\mathcal{M}, s \models \varphi$ e $\mathcal{M}, s \models \psi$
- (analoghe per $\vee, \rightarrow, \leftrightarrow$)
- $\mathcal{M}, s \models \forall x\, \varphi$ sse per ogni $a \in M$, $\mathcal{M}, s[x \mapsto a] \models \varphi$
- $\mathcal{M}, s \models \exists x\, \varphi$ sse esiste $a \in M$ tale che $\mathcal{M}, s[x \mapsto a] \models \varphi$

Dove $s[x \mapsto a]$ è l'assegnazione $s$ modificata in modo che $x \mapsto a$. Questa definizione, oggi standard, è **la grande invenzione di Tarski**: rende matematica la nozione filosofica di verità.

Per sentenze (formule chiuse), l'assegnazione è irrilevante: si scrive semplicemente $\mathcal{M} \models \varphi$ ("$\varphi$ è vera in $\mathcal{M}$").

## 4. Conseguenza logica e validità

Dato un insieme di formule $\Gamma$ e una formula $\varphi$:

- $\Gamma \models \varphi$ ($\varphi$ è **conseguenza logica** di $\Gamma$) sse per ogni $\mathcal{M}$ e $s$, se $\mathcal{M}, s \models \gamma$ per ogni $\gamma \in \Gamma$, allora $\mathcal{M}, s \models \varphi$.
- $\models \varphi$ ($\varphi$ è **valida**, o logicamente vera) sse $\emptyset \models \varphi$, cioè $\varphi$ è vera in ogni struttura sotto ogni assegnazione.
- $\varphi$ è **soddisfacibile** sse esiste $\mathcal{M}$ e $s$ con $\mathcal{M}, s \models \varphi$.
- $\varphi$ è **insoddisfacibile** (o contraddittoria) sse non lo è.

**Dualità**: $\varphi$ è valida sse $\neg \varphi$ è insoddisfacibile.

## 5. Esempi di modelli concreti

### Modello aritmetico

$\mathfrak{N} = (\mathbb{N}, 0, S, +, \cdot, =)$. La formula $\forall x\, \exists y\, (y = S(x))$ ("ogni numero ha un successore") è vera in $\mathfrak{N}$. Lo è anche $\forall x\, \forall y\, (x + y = y + x)$ (commutatività). Non lo è $\exists x\, (S(x) = 0)$ (nessun naturale ha 0 come successore).

### Modello a grafi

Linguaggio: un predicato binario $E(x, y)$ ("c'è un arco da $x$ a $y$"). Una struttura è semplicemente un grafo orientato. La formula $\forall x \forall y\, (E(x, y) \rightarrow E(y, x))$ è vera in un grafo non orientato (simmetrico), falsa in uno propriamente orientato.

### Modello di parentela

Dominio: persone di una famiglia. Predicati: $\text{Padre}(x, y)$ "$x$ è padre di $y$", $\text{Maschio}(x)$, $\text{Femmina}(x)$.

La formula "ogni padre è maschio" si esprime $\forall x \forall y\, (\text{Padre}(x, y) \rightarrow \text{Maschio}(x))$. È vera in qualsiasi modello "biologicamente corretto" — ma se costruiamo un modello "patologico" con Pierino femmina e padre di Luigi, la formula è falsa lì. Quindi **non è valida**: serve un'assunzione extra.

### Grafico: una piccola struttura come grafo

<div class="chart">
<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esempio di struttura come grafo">
  <rect width="480" height="220" fill="#0f0f23"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13" fill="#ecebff">
    <circle cx="80" cy="60" r="22" fill="#181834" stroke="#9a8cf0" stroke-width="2"/>
    <text x="80" y="65" text-anchor="middle">a</text>
    <circle cx="240" cy="60" r="22" fill="#181834" stroke="#9a8cf0" stroke-width="2"/>
    <text x="240" y="65" text-anchor="middle">b</text>
    <circle cx="400" cy="60" r="22" fill="#181834" stroke="#9a8cf0" stroke-width="2"/>
    <text x="400" y="65" text-anchor="middle">c</text>
    <circle cx="160" cy="160" r="22" fill="#181834" stroke="#9a8cf0" stroke-width="2"/>
    <text x="160" y="165" text-anchor="middle">d</text>
    <circle cx="320" cy="160" r="22" fill="#181834" stroke="#9a8cf0" stroke-width="2"/>
    <text x="320" y="165" text-anchor="middle">e</text>
    <line x1="100" y1="68" x2="220" y2="68" stroke="#9a8cf0" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="260" y1="68" x2="380" y2="68" stroke="#9a8cf0" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="95" y1="80" x2="150" y2="142" stroke="#9a8cf0" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="255" y1="80" x2="310" y2="142" stroke="#9a8cf0" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="180" y1="160" x2="300" y2="160" stroke="#9a8cf0" stroke-width="1.5" marker-end="url(#arrow)"/>
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#9a8cf0"/>
      </marker>
    </defs>
    <text x="240" y="205" text-anchor="middle" fill="#7a7aa0">M = {a,b,c,d,e}; E = {(a,b),(b,c),(a,d),(b,e),(d,e)}</text>
  </g>
</svg>
<div class="chart-caption">In questa struttura: $\exists x\, \forall y\, \neg E(y, x)$ vero (l'elemento $a$ non ha archi entranti). $\forall x \exists y\, E(x, y)$ falso (i nodi $c$ ed $e$ non hanno archi uscenti).</div>
</div>

## 6. Refutare la validità con un controesempio

Strategia tipica: per mostrare che $\varphi$ **non** è valida, esibire una struttura in cui è falsa.

**Esempio**: $\varphi := \forall x \exists y\, E(x, y) \rightarrow \exists y \forall x\, E(x, y)$.

Controesempio. Dominio $\{1, 2\}$, $E = \{(1, 2), (2, 1)\}$. L'antecedente è vero: ogni elemento ha un successore. Il conseguente è falso: nessun $y$ è connesso da tutti gli $x$ (sia $1$ che $2$ non sono successori di sé stessi). Quindi $\varphi$ è falsa qui, e **non valida**.

> Costruire controesempi piccoli (2-3 elementi) è la skill più utile per ragionare su validità. È esattamente quello che il software *Tarski's World* permette di fare interattivamente.

## 7. Tre risultati metateorici della FOL

Anticipiamo qui i teoremi che [Metalogica](15-metalogica-godel.html) tratterà nel dettaglio.

### Teorema di completezza (Gödel 1930)

$$\Gamma \models \varphi \quad \Longleftrightarrow \quad \Gamma \vdash \varphi$$

Le due relazioni — semantica ($\models$) e sintattica ($\vdash$) — coincidono. Tutto ciò che è semanticamente conseguenza è dimostrabile.

### Teorema di compactness

$\Gamma$ è soddisfacibile se e solo se **ogni suo sottoinsieme finito** è soddisfacibile.

Conseguenze sorprendenti: si possono costruire modelli **non standard** dell'aritmetica con "numeri infiniti" (Robinson, Skolem). Argomento: $\text{Th}(\mathfrak{N}) \cup \{c > 0, c > S(0), c > S(S(0)), \ldots\}$ ha ogni sottoinsieme finito soddisfacibile (basta interpretare $c$ come un naturale abbastanza grande). Per compactness, è soddisfacibile nell'insieme: esiste un modello con un elemento $c$ più grande di ogni naturale standard.

### Löwenheim-Skolem

Se un insieme di sentenze ha un modello infinito, ne ha uno di ogni cardinalità infinita. In particolare, ha sempre un modello numerabile.

**Paradosso di Skolem**: la teoria degli insiemi ZFC dimostra l'esistenza di insiemi non numerabili (come $\mathbb{R}$), ma per Löwenheim-Skolem ZFC ha un modello numerabile. Apparentemente paradossale, in realtà significa che "non numerabile" è una nozione relativa al modello.

## 8. Differenza con il secondo ordine (cenno)

Nella **logica del secondo ordine** (SOL) si quantifica anche su **predicati e funzioni**, non solo su individui. Esempio: il principio di induzione,

$$\forall P\, ((P(0) \wedge \forall x\, (P(x) \rightarrow P(S(x)))) \rightarrow \forall x\, P(x))$$

è un'unica formula in SOL. In FOL si esprime come schema di assiomi (uno per ogni formula $\varphi$).

**Prezzo**: la SOL **non ha** un sistema deduttivo completo (Gödel 1931). La completezza è una virtù peculiare della FOL — il "first-order" è la "logica giusta" per un sacco di applicazioni matematiche.

## 9. Esercizi

<details>
  <summary>Esercizio 1 — la formula $\forall x \exists y\, (x \neq y)$ è valida?</summary>

No. È falsa in qualsiasi struttura con dominio di un solo elemento: lì $\forall x \exists y$ richiederebbe un $y \neq x$, ma non esiste. È invece valida nella **classe** delle strutture con dominio $\geq 2$ elementi — questa è una nozione relativa, non assoluta.
</details>

<details>
  <summary>Esercizio 2 — trova un controesempio per "$\exists x\, P(x) \wedge \exists x\, Q(x) \rightarrow \exists x\, (P(x) \wedge Q(x))$"</summary>

Dominio $\{a, b\}$. $P^{\mathcal{M}} = \{a\}$, $Q^{\mathcal{M}} = \{b\}$. L'antecedente è vero (esiste un $P$, esiste un $Q$). Il conseguente è falso (nessuno è insieme $P$ e $Q$). Quindi non è valida.

L'errore intuitivo è scambiare l'esistente con un nome proprio: i due $x$ esistenziali sono indipendenti, non designano lo stesso elemento.
</details>

<details>
  <summary>Esercizio 3 — Costruisci una struttura in cui $\forall x \exists y\, R(x, y)$ è vera e $\exists y \forall x\, R(x, y)$ è falsa</summary>

Dominio $\mathbb{N}$, $R(x, y) := y > x$. Per ogni $x$ esiste $y$ maggiore (es. $x+1$): vero. Ma non c'è un $y$ maggiore di **tutti** gli $x$: falso. Controesempio classico del "tutti hanno una madre, ma non c'è una madre di tutti".
</details>

## Sintesi

- Una **struttura** $\mathcal{M}$ dà dominio e interpretazione a costanti, funzioni, predicati.
- La relazione di **soddisfacibilità** (Tarski) si definisce induttivamente sulla struttura della formula.
- $\varphi$ è **valida** sse è vera in **ogni** struttura sotto ogni assegnazione; **soddisfacibile** se vera almeno in una.
- Refutare validità: **controesempio** (piccolo dominio).
- Tre risultati cardine della FOL: **completezza**, **compactness**, **Löwenheim-Skolem**.
- La logica del **secondo ordine** è più espressiva ma perde la completezza — vedi [Metalogica](15-metalogica-godel.html).

## Letture

- Alfred Tarski, *Der Wahrheitsbegriff in den formalisierten Sprachen* (1933).
- Herbert Enderton, *A Mathematical Introduction to Logic* (Academic Press, 2nd ed.).
- Wilfrid Hodges, *A Shorter Model Theory* (Cambridge UP, 1997).
- Dirk van Dalen, *Logic and Structure* (Springer, 5th ed.).
- David Marker, *Model Theory: An Introduction* (Springer, 2002) — per approfondire dopo.
