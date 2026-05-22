---
title: Introduzione e come usare questo percorso
area: Meta
summary: A chi serve, come è strutturato, mindset, errori che fanno tutti nei primi giorni, e quando sei davvero pronto a candidarti.
order: 0
---

# Introduzione

Questo è un **percorso completo** per passare i colloqui tecnici delle Big Tech (Google, Meta, Amazon, Apple, Netflix, Microsoft, Stripe, Uber, Airbnb, ecc.). Non è un libro: è un manuale operativo. Tutto qui dentro è ottimizzato per **passare il colloquio**, non per ottenere una laurea in informatica.

## Parte 1 — A chi serve

### Profili target

- **Studenti / nessuna esperienza coding interview**: parti dal cap. 01 e segui la roadmap di 90 giorni. Tempo richiesto: ~3-4 mesi, 2h/giorno.
- **Dev con 2-5 anni di esperienza**: puoi accelerare. Tempo: ~2 mesi, 1.5h/giorno.
- **Senior con esperienza recente di colloqui**: usa come riferimento. Tempo: ~3-4 settimane di refresh + 5+ mock interview.

### Cosa serve come prerequisito

- **Saper programmare** in almeno un linguaggio. Va bene anche essere "ok" — non serve essere esperti.
- **Capire variabili, loop, funzioni, classi**. Se non sai cosa è una classe, leggi un tutorial Python di 3 ore prima.
- **Pazienza**. È un cammino lungo. Ogni giorno migliori del 1%, alla fine spacchi.

## Parte 2 — Cosa aspettarsi da un loop FAANG

Un loop tipico è **4-6 ore di interviste** divise così:

- **2-4 round di coding** (~45 min ciascuno): 1-2 problemi su data structures & algorithms.
- **1-2 round di system design** (~45-60 min): solo per mid/senior. Per junior spesso sostituiti da OOP/design.
- **1 round behavioral** (~45 min). Amazon ne fa anche 2. Meta ha "Jedi" specifico.
- **Eventuale "domain"** per ruoli specializzati (ML, infra, mobile, security).

### Cosa misurano davvero

Il colloquio non valuta "quanto sai di CS". Valuta:

1. **Pattern recognition**: riconosci il pattern del problema in &lt;60 sec?
2. **Comunicazione**: parli mentre risolvi? Strutturi il pensiero?
3. **Coding quality**: nomi delle variabili, edge case, complessità?
4. **Behavior**: collabori? Ti riprendi dagli errori? Ti adatti agli hint?

La differenza tra un hire e un no-hire è **quasi sempre comunicazione**, non algoritmi.

## Parte 3 — Cosa NON è questo percorso

- **Non è LeetCode random**. Risolvere problemi a caso fa perdere tempo. Qui i problemi sono organizzati per pattern.
- **Non è un libro di teoria pura**. Niente Cook-Levin. Solo quello che serve.
- **Non è un sostituto della pratica**. Devi scrivere codice, non solo leggere.

## Parte 4 — Come è organizzato il materiale

### Sezioni 00-15: fondamenti DS&A

Complessità, strutture dati base e avanzate, algoritmi e tecniche.

### Sezioni 16-22: pattern di interview, OOP, system design

Composti tra "cap. 22 — coding patterns" (essenziale per il loop) e i fondamentali di system design.

### Sezioni 23-24: behavioral + mock

Strategia di colloquio, STAR, Amazon LP, dinamica del round.

### Sezione 25: roadmap 90 giorni

Piano operativo giorno per giorno.

### Sezione 26: banca esercizi

230+ problemi master list ordinati per pattern.

## Parte 5 — Linguaggio

Tutto il codice è in **Python**. Motivi:

1. È il linguaggio più rapido da scrivere a lavagna/Replit.
2. Tutti i FAANG lo accettano.
3. La sintassi non rallenta — puoi concentrarti sul problema.

Se preferisci Java/C++/Go/JS, i pattern sono identici. Solo la sintassi cambia. Ma in colloquio FAANG **Python è la scelta consigliata** anche se conosci altro.

## Parte 6 — Convenzioni del materiale

Ogni capitolo segue questa struttura:

- **Concetto base**: spiegato dalle fondamenta.
- **Pattern**: 3-6 schemi tipici di problema, ognuno con motivazione.
- **Snippet pronti**: codice da incollare/ricordare.
- **Trappole comuni**: errori da non commettere.
- **Esercizi**: con difficoltà, hint, soluzione, ragionamento step-by-step.

Gli esercizi sono marcati:

<span class="problem-tag easy">EASY</span> <span class="problem-tag medium">MEDIUM</span> <span class="problem-tag hard">HARD</span>

Hint e soluzione sono in box espandibili. **Prova sempre da solo prima di aprire**.

## Parte 7 — I 3 errori dei primi 14 giorni

Quasi tutti li commettono. Evita.

### Errore 1 — Leggere senza scrivere codice

> *"Ho letto i capitoli 1-5, capisco tutto."*

Sbagliato. Capire un concetto leggendo è il 10% del lavoro. Il 90% è la **memoria muscolare** di scrivere codice sotto pressione. Se non hai scritto codice ogni giorno, **non hai studiato**.

### Errore 2 — Saltare la fase di pensare

> *"Vedo il problema → vado subito su LeetCode soluzioni → copio."*

Allenamento sprecato. La skill da costruire è **vedere un problema nuovo e ragionarci sopra per 15-25 minuti**. Se ti arrendi prima, non costruisci pattern recognition.

**Regola**: ogni problema, datti un budget di tempo (15 min easy, 25 medium, 40 hard). Se sfori, **leggi solo l'hint**, non la soluzione completa.

### Errore 3 — Avere fretta di passare a problemi hard

> *"Easy sono noiosi. Vado subito sui hard."*

Anti-pattern. Gli hard sono per il **5%** del loop. Gli easy/medium per il **95%**. E gli hard si risolvono **combinando** pattern degli easy/medium.

**Regola**: 50 easy + 75 medium prima di toccare hard. Quando vedi pattern in 30 secondi sui medium, allora hard.

## Parte 8 — Mindset

Tre regole non negoziabili.

### 1. TTY: Think → Talk → You

In colloquio: prima **parla**, poi **pensa**, poi **scrivi**. Esporre il ragionamento a voce alta è il 50% del round.

### 2. Pattern > memoria

Non memorizzare 500 soluzioni. Memorizza **16 pattern** (cap. 22) e impara a riconoscerli. Tutto il resto è esecuzione meccanica.

### 3. Pulito al primo colpo

Niente `x`, `aux`, `t2`. Variabili che hanno un nome. Edge case gestiti **prima** della soluzione, non dopo. L'intervistatore valuta il codice come PR review.

## Parte 9 — Setup

### Cosa serve

- **Editor**: VS Code, IntelliJ, Replit. Niente esotico.
- **Piattaforme**: LeetCode (essenziale), Pramp/interviewing.io (mock), excalidraw (system design).
- **Cronometro**: ogni problema ha un budget.
- **Quaderno fisico**: per behavioral e system design. Scrivere a mano cementa la memoria.

### Tracking

Crea un foglio Google "FAANG log" con:

| Data | Problema | D | Tempo | Esito | Pattern |
|---|---|---|---|---|---|
| ... | Two Sum | E | 8 min | ✓ solo | hashmap |
| ... | LRU Cache | M | 30 min | ⚠ hint | DLL+dict |

Esito: ✓ solo / ⚠ con hint / ✗ soluzione.

A fine settimana: rifa i ⚠ e ✗.

## Parte 10 — Quanto tempo serve

Tre scenari realistici:

| Profilo | Tempo |
|---|---|
| Studente, nessuna esperienza interview | **3-4 mesi**, 2h/giorno |
| Dev 2-5 anni esperienza | **2 mesi**, 1.5h/giorno |
| Senior con esperienza recente di colloqui | **3-4 settimane**, 1h/giorno + 5 mock |

Vedi [Roadmap 90 giorni](25-roadmap-90-giorni.html).

## Parte 11 — Quando sei pronto a candidarti

Checklist minima:

- [ ] Hai risolto almeno **150 problemi** (50 easy + 75 medium + 25 hard).
- [ ] Risolvi un **medium random in 25 min** senza guardare hint nel 70% dei casi.
- [ ] Sai descrivere a voce **3+ sistemi end-to-end** in 35 min.
- [ ] Hai **7-10 storie behavioral** strutturate in STAR.
- [ ] Hai fatto almeno **5 mock interview** con persone reali.
- [ ] Conosci i 16 coding patterns **a memoria**.

Se tutte spuntate: **applica**. Non aspettare di sentirti "completamente pronto" — quel momento non arriva mai.

## Parte 12 — Come affrontare un capitolo

Per ogni capitolo:

1. **Leggi tutta la teoria** in una sessione.
2. **Riprova mentalmente** i pattern (chiudi il libro).
3. **Risolvi tutti gli esercizi del capitolo**.
4. Dopo 1 settimana, **torna al capitolo** e rifai 3 esercizi.
5. Dopo 1 mese, **un'altra rivisitazione**.

Il sapere si consolida con **ripetizione spaziata**, non con una lettura intensa.

## Pronto?

Vai al [cap. 01 — Complessità computazionale](01-complessita.html).
