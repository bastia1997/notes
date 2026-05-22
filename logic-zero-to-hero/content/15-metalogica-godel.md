---
title: "Metalogica: soundness, completezza, teoremi di Gödel"
area: "Metalogica"
summary: "I risultati che la logica ha dimostrato su sé stessa: correttezza e completezza della FOL (Gödel 1930), compactness e Löwenheim-Skolem, indecidibilità di Church, e i due teoremi di incompletezza che hanno chiuso il programma di Hilbert."
order: 15
level: "esperto"
prereq:
  - "Aver letto [FOL: semantica](13-logica-predicati-semantica.html)"
  - "Aver letto [Sistemi assiomatici e sequenti](11-sistemi-assiomatici-sequenti.html)"
  - "Familiarità con [Insiemi e funzioni](14-insiemi-relazioni-funzioni.html)"
tools:
  - "Carta e penna"
  - "Lettura consigliata: Hofstadter, *Gödel, Escher, Bach* per intuizione"
---

# Metalogica: soundness, completezza, teoremi di Gödel

La **metalogica** è la logica applicata alla logica stessa: prende un sistema deduttivo come oggetto matematico e ne dimostra proprietà — coerenza, completezza, decidibilità. Nasce di fatto al congresso di Bologna del 1928, quando David Hilbert articola il suo programma: fondare tutta la matematica su un sistema assiomatico **coerente** (privo di contraddizioni), **completo** (ogni enunciato vero è dimostrabile) e **decidibile** (esiste un algoritmo che dice se una formula è teorema). Due anni dopo, Kurt Gödel — venticinquenne — pubblica due risultati che cambiano per sempre il panorama: la **completezza** della logica del primo ordine (1930) e i due **teoremi di incompletezza** dell'aritmetica (1931). Pochi anni dopo Church e Turing aggiungono l'**indecidibilità**. Il programma di Hilbert è scardinato.

Questa è una sezione difficile, da affrontare dopo aver digerito sintassi (sez. 11-12) e semantica (sez. 13). Si chiude con le conseguenze filosofiche, che ancora oggi sono materia di dibattito.

## 1. Soundness (correttezza)

La **correttezza** afferma che il sistema deduttivo non dimostra falsità:

$$\Gamma \vdash \varphi \quad \Longrightarrow \quad \Gamma \models \varphi$$

Se $\varphi$ è dimostrabile da $\Gamma$, allora è conseguenza semantica di $\Gamma$. Dimostrazione: per induzione strutturale sulla derivazione. Si verifica che (i) ogni assioma è valido; (ii) ogni regola di inferenza preserva la verità.

La correttezza è la proprietà *minima* che si pretende da un sistema deduttivo. Senza di essa il sistema è inutilizzabile — dimostrerebbe assurdità.

## 2. Completezza (Gödel 1930)

La **completezza** è il converso:

$$\Gamma \models \varphi \quad \Longrightarrow \quad \Gamma \vdash \varphi$$

Tutto ciò che è semanticamente conseguenza è anche sintatticamente dimostrabile. Insieme alla correttezza:

$$\Gamma \vdash \varphi \quad \Longleftrightarrow \quad \Gamma \models \varphi$$

Sintassi e semantica della FOL coincidono. È un risultato profondo: significa che un sistema *finitario* di regole simboliche cattura *tutta* la nozione platonica di verità logica.

**Dimostrazione (Henkin 1949, versione moderna)**: data una teoria $T$ coerente, si costruisce un modello canonico aggiungendo costanti per ogni $\exists x\, \varphi$ ("testimoni di Henkin") e completando massimalmente $T$. Il modello canonico è il quoziente del linguaggio per equivalenza sintattica.

## 3. Compactness

$\Gamma$ è soddisfacibile sse ogni sottoinsieme finito di $\Gamma$ lo è.

**Equivalente**: se $\Gamma \models \varphi$, allora esiste $\Gamma_0 \subseteq \Gamma$ finito tale che $\Gamma_0 \models \varphi$.

Conseguenza di completezza: una dimostrazione usa solo finiti pezzi delle ipotesi.

**Applicazione famosa: modelli non standard dell'aritmetica**. Sia $T = \text{Th}(\mathfrak{N})$ (tutto ciò che è vero nel modello standard). Si estende il linguaggio con una nuova costante $c$ e si considera

$$T' = T \cup \{c > S^n(0) : n \in \mathbb{N}\}$$

Ogni $T'_0 \subseteq T'$ finito menziona solo finiti $c > S^n(0)$: basta interpretare $c$ come un naturale grande abbastanza per soddisfarli. Per compactness $T'$ è soddisfacibile: esiste un modello $\mathfrak{N}^*$ con un elemento $c$ "infinitamente grande". Robinson (1960) ha usato questa idea per fondare l'**analisi non standard**.

## 4. Löwenheim-Skolem

Se una teoria del primo ordine ha un modello infinito, ne ha uno di **ogni cardinalità infinita** $\geq |\mathcal{L}|$.

- **Downward**: se ha un modello, ne ha uno numerabile.
- **Upward**: se ne ha uno infinito, ne ha di arbitrariamente grande.

**Paradosso di Skolem**: ZFC dimostra l'esistenza di insiemi non numerabili ma per Löwenheim-Skolem ha un modello numerabile. Soluzione: "non numerabile" è una proprietà *interna* al modello — significa "nessuna biiezione *all'interno del modello*", anche se *vista da fuori* l'insieme è numerabile.

## 5. Decidibilità e indecidibilità

Una teoria è **decidibile** se esiste un algoritmo che, data una formula $\varphi$, in tempo finito decide se $T \vdash \varphi$.

- La **logica proposizionale** è decidibile (tabella di verità o SAT solver) — in NP-completo nel caso peggiore (Cook 1971).
- La **FOL pura** è **indecidibile** (Church 1936, Turing 1936): non esiste algoritmo generale. È solo **semi-decidibile**: se $\vdash \varphi$ vero, un algoritmo (enumerare dimostrazioni) lo trova; se falso, l'algoritmo può non terminare.
- L'**aritmetica di Peano** è anch'essa indecidibile (Church).

**Teorema di Church (Entscheidungsproblem, 1936)**: non esiste algoritmo per decidere la validità di una formula FOL arbitraria. Riduzione: dal halting problem di Turing. Dimostrazione fra le pietre miliari della teoria della computabilità.

## 6. Aritmetica di Peano e codifica di Gödel

L'**aritmetica di Peano (PA)** è la teoria del primo ordine con linguaggio $\{0, S, +, \cdot, =\}$ e i sette assiomi di Peano (1889) + lo schema di induzione:

$$\forall \bar{y}\, ((\varphi(0, \bar{y}) \wedge \forall x\, (\varphi(x, \bar{y}) \rightarrow \varphi(S(x), \bar{y}))) \rightarrow \forall x\, \varphi(x, \bar{y}))$$

Una formula per ogni $\varphi(x, \bar{y})$ — schema **infinito** in FOL.

**Codifica di Gödel** (cenno tecnico): a ogni simbolo del linguaggio si assegna un numero naturale; alla sequenza di simboli che compone una formula si associa un numero (es. via produttoria di primi: $2^{a_1} \cdot 3^{a_2} \cdot 5^{a_3} \cdots$). Idem per le dimostrazioni. Il risultato:

1. proprietà sintattiche come "è una formula ben formata" o "è una dimostrazione di $\varphi$" diventano **predicati ricorsivi** sui naturali;
2. PA è abbastanza potente da esprimere questi predicati come formule del suo stesso linguaggio (PA "parla di sé stessa");
3. esiste un predicato $\text{Prov}_T(\#\varphi)$ che dice "il numero che codifica $\varphi$ è dimostrabile in $T$".

Con questa macchinaria Gödel costruisce un punto fisso autoreferenziale.

## 7. Primo teorema di incompletezza (Gödel 1931)

**Enunciato**: ogni teoria $T$ coerente, ricorsivamente assiomatizzabile, che include PA, contiene un enunciato $G$ tale che:

$$T \nvdash G \quad \text{e} \quad T \nvdash \neg G$$

cioè $G$ è **indecidibile** in $T$. Eppure, se $T$ è coerente, $G$ è **vera** (nel modello standard).

**Idea**: la formula $G$ dice di sé stessa "io non sono dimostrabile in $T$". Per costruzione, usando un lemma di punto fisso (diagonalizzazione di Cantor riadattata):

$$T \vdash G \leftrightarrow \neg \text{Prov}_T(\#G)$$

Se $T \vdash G$, allora $T \vdash \neg \text{Prov}_T(\#G)$, ma anche $T \vdash \text{Prov}_T(\#G)$ (perché $G$ è dimostrabile) — contraddizione. Quindi $T \nvdash G$. Se inoltre $T$ è $\omega$-coerente (ipotesi rafforzata da Rosser 1936 a semplice coerenza), anche $T \nvdash \neg G$.

**Conseguenza didattica**: nessun sistema formale ragionevole può catturare *tutte* le verità aritmetiche. La nozione di "verità" eccede quella di "dimostrabilità".

```mermaid
flowchart LR
  PA[Teoria T ⊇ PA, coerente] --> Cod[Codifica di Gödel]
  Cod --> Prov[Predicato Prov_T è formalizzabile in T]
  Prov --> FP[Lemma di punto fisso\nG ↔ ¬Prov_T(#G)]
  FP --> Inc["G vera ma indimostrabile in T:\n T ⊬ G  e  T ⊬ ¬G"]
```

## 8. Secondo teorema di incompletezza (Gödel 1931)

**Enunciato**: se $T$ è coerente, $T \nvdash \text{Coh}_T$, dove $\text{Coh}_T \equiv \neg \text{Prov}_T(\# \bot)$ è la formula che esprime la coerenza di $T$.

Cioè: **una teoria coerente non può dimostrare la propria coerenza** (a meno di essere troppo debole per esprimere PA, o di rinunciare a coerenza).

**Conseguenza per il programma di Hilbert**: Hilbert sperava di dimostrare la coerenza di teorie forti (come la teoria degli insiemi) usando solo metodi *finitistici*, codificabili in PA. Gödel mostra che è impossibile: se PA fosse capace di dimostrare la coerenza di un sistema $T \supseteq \text{PA}$, allora — per il secondo teorema — $T$ dimostrerebbe la propria coerenza, contraddicendo il teorema stesso (assumendo PA come sotto-sistema fidato).

Gentzen (1936) dimostrerà la coerenza di PA usando induzione fino a $\epsilon_0$ (un ordinale "appena sopra" $\omega^\omega \cdots$). Non finitistico secondo Hilbert, ma costruttivamente accettabile.

## 9. Conseguenze filosofiche

Il dibattito non si è mai chiuso. Tre posizioni:

### Anti-meccanismo (Lucas-Penrose)

J. R. Lucas (1961) e Roger Penrose (*The Emperor's New Mind*, 1989; *Shadows of the Mind*, 1994): la mente umana **non** è una macchina di Turing, perché può "vedere" la verità di $G$ pur non potendola dimostrare nel sistema $T$. Argomento controverso: presuppone che la mente sappia di essere coerente (cosa di cui dubitare per primo).

### Risposta classica (Putnam, Feferman)

Hilary Putnam: la mente può oltrepassare *qualsiasi* sistema fissato, ma forse opera in un sistema più ampio non assolutizzabile. Solomon Feferman ha studiato gerarchie di estensioni progressive (sequenze di teorie sempre più forti che internalizzano la coerenza della precedente).

### Pluralismo logico

I teoremi di Gödel non parlano di "matematica" tout court ma di *teorie formali specifiche*. Il pluralismo (Carnap, Beall-Restall) considera coesistenti molte logiche per scopi diversi. Cfr. [logiche non classiche](18-logiche-non-classiche.html).

> Hofstadter, in *Gödel, Escher, Bach*, esplora il teorema come fenomeno di **strange loop** — autoreferenzialità che produce livelli emergenti. Lettura cult anche se a tratti vaga.

## 10. Tabella riassuntiva

| Risultato                          | Anno   | Autore                | Enunciato                                              |
|------------------------------------|--------|-----------------------|--------------------------------------------------------|
| Completezza FOL                    | 1930   | Gödel                 | $\models \Leftrightarrow \vdash$                       |
| Compactness                        | 1930   | Gödel (conseguenza)   | $\Gamma$ sat ↔ ogni $\Gamma_0$ finito sat              |
| Löwenheim-Skolem                   | 1915/22| Löwenheim/Skolem      | Teoria con modello infinito ha modelli di ogni cardinalità |
| Indecidibilità FOL                 | 1936   | Church, Turing        | Nessun algoritmo decide validità                       |
| 1° incompletezza                   | 1931   | Gödel                 | PA coerente ⇒ ∃ G vera ma indecidibile                 |
| 2° incompletezza                   | 1931   | Gödel                 | PA coerente ⇒ PA ⊬ Coh(PA)                             |
| Coerenza di PA via $\epsilon_0$    | 1936   | Gentzen               | Dimostrabile con induzione transfinita                 |

## 11. Esercizi

<details>
  <summary>Esercizio 1 — perché la logica proposizionale è completa e decidibile?</summary>

**Completezza**: sistemi di Hilbert, ND, sequenti tutti completi rispetto alla semantica veritativo-funzionale. Dimostrabile via Lindenbaum: ogni teoria coerente si estende a una massimale, e si valutano le variabili a partire dall'estensione.

**Decidibilità**: una formula $\varphi$ con $n$ atomiche ha una tabella di verità di $2^n$ righe; in tempo $O(2^n)$ si controlla se è valida. SAT è NP-completo in generale, ma sempre decidibile.

La FOL "ricca" perde la decidibilità per la presenza dei quantificatori su un dominio potenzialmente infinito.
</details>

<details>
  <summary>Esercizio 2 — la teoria $T = $ "aritmetica di Robinson" (PA senza induzione) è essenzialmente indecidibile. Perché Gödel-1° si applica?</summary>

La cosiddetta **aritmetica di Robinson Q** è sorprendentemente potente nonostante non abbia induzione. Tarski-Mostowski-Robinson (1953) mostrano che Q rappresenta ogni funzione ricorsiva, condizione sufficiente per Gödel-1°. Quindi anche Q è incompleta (in realtà, **essenzialmente indecidibile**: ogni sua estensione coerente lo è).
</details>

<details>
  <summary>Esercizio 3 — è vero che "Gödel ha dimostrato che la matematica è incoerente"?</summary>

**No**, è un fraintendimento popolare. Gödel ha dimostrato:

1. una teoria $T \supseteq \text{PA}$ è incompleta (esiste $G$ indecidibile);
2. una teoria coerente non dimostra la propria coerenza.

Niente di tutto ciò implica incoerenza. Anzi: la coerenza è un'ipotesi del teorema. Una teoria *incoerente* dimostrerebbe tutto (ex contradictione quodlibet), inclusa la propria "coerenza", banalmente.
</details>

## Sintesi

- **Correttezza** + **completezza** ⇒ sintassi e semantica della FOL coincidono.
- **Compactness** e **Löwenheim-Skolem** danno strutture impreviste: modelli non standard, paradosso di Skolem.
- **Church-Turing**: la FOL è indecidibile. Solo semi-decidibile.
- **Primo Gödel**: ogni teoria coerente ⊇ PA contiene enunciati veri ma indimostrabili.
- **Secondo Gödel**: tale teoria non può dimostrare la propria coerenza ⇒ chiude il programma di Hilbert.
- Le conseguenze filosofiche (mente vs macchina, pluralismo) rimangono aperte.

## Letture

- Kurt Gödel, *Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I* (1931). Tradotto in Heijenoort, *From Frege to Gödel* (Harvard UP).
- Raymond Smullyan, *Gödel's Incompleteness Theorems* (Oxford UP, 1992) — esposizione tecnica chiara.
- Torkel Franzén, *Gödel's Theorem: An Incomplete Guide to Its Use and Abuse* (A K Peters, 2005) — antidoto agli usi pop.
- Douglas Hofstadter, *Gödel, Escher, Bach* (Basic Books, 1979) — lettura culturale.
- Carlo Cellucci, *Filosofia e matematica* (Laterza) per la prospettiva italiana.
