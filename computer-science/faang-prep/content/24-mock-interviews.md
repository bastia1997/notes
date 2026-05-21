---
title: Mock interview e strategia in colloquio
area: Strategia
summary: Come si svolgono i 45 minuti, template di apertura, gestione del blocco, come "vendersi" durante la risoluzione, mock dettagliato.
order: 24
---

# Mock interview e strategia in colloquio

Una cosa è risolvere problemi a casa. Un'altra è farlo con qualcuno che ti guarda, ti interrompe, ti pone vincoli. Questa è la skill più importante del loop FAANG, e si allena solo facendo **mock interview**.

## Parte 1 — Anatomia di un coding round (45 min)

| Fase | Tempo | Cosa fare |
|---|---|---|
| Intro + warm-up | 2 min | Saluti, intervistatore si presenta, tu ti presenti |
| Problem statement | 1 min | Lo legge / ti incolla nel doc |
| **Clarifying questions** | 3-5 min | **TU fai domande** |
| **Approach discussion** | 5-7 min | **TU descrivi piano + complessità** |
| **Coding** | 20-25 min | Implementi parlando |
| **Testing / dry-run** | 3-5 min | Walk-through con un input |
| **Follow-up** | 5-10 min | Varianti, ottimizzazioni |
| Tue domande | 3-5 min | TU fai domande all'intervistatore |

### Errore di rookie

Saltare alle "clarifying" o all'"approach" e correre direttamente al coding. **Sbagliato**. Le prime due fasi valgono il 30-40% del round.

## Parte 2 — Template di apertura

Quando l'intervistatore finisce di leggere il problema:

> *"Let me make sure I understand. So we have X and we need to Y. Is that right?"*

Aspetta la conferma. Poi:

> *"A few quick questions:*
>
> *1. What's the input size order of magnitude?*
> *2. Are there constraints on values? Negatives, duplicates, null/empty?*
> *3. Is the input sorted? Can be empty? Can be modified?*
> *4. What should I return for invalid input?*
> *5. Should I optimize for time or space?"*

Aspetta risposte. **Trascrivi esempi sulla lavagna**: rendono concreto + ti aiutano durante il debug.

### Perché funziona

1. Dimostra rigore.
2. Ti dà tempo di pensare.
3. **Le constraints rivelano la complessità target**. "n ≤ 10⁵" → O(n log n).
4. Riduce il rischio di malintesi catastrofici.

## Parte 3 — Discussione dell'approccio

> *"OK, lo strategia che vedo: la brute force sarebbe X, cioè O(n²). Penso si possa fare meglio. Se sfrutto Y, posso usare [pattern Z]:*
>
> *- Maintain X*
> *- For each element, do Y*
> *- This gives us O(n)*
>
> *Lo spazio sarebbe O(k) per il dict. Does this approach make sense?"*

### Punti chiave

- **Sempre** menziona la brute force prima dell'ottimizzazione. Mostra ragionamento progressivo.
- **Aspetta feedback prima di scrivere codice**. Se l'intervistatore esita, riconsidera.
- **Dichiara la complessità subito**. Tempo e spazio.

### Cosa fare se sei bloccato sull'approccio

1. **Verbalizza il blocco**: *"I'm stuck on how to handle the case where..."*.
2. **Torna agli esempi**. Disegna sulla lavagna.
3. **Pensa a problemi simili**: *"This reminds me of X. I wonder if the same pattern applies."*
4. **Chiedi un hint**: *"Could you give me a small hint?"* — è OK, ma non subito.

## Parte 4 — Coding: il pensare a voce alta

Mentre scrivi, **parla**.

> *"I'm using a hashmap to store value → index. Wait, what if the array has duplicates? Let me think. ... OK, I'll store the latest index seen.*
>
> *Now I iterate through the array. For each element, I check if (target - x) is in the map..."*

### Perché è critico

- L'intervistatore non legge il tuo codice mentre scrivi. Sente le tue parole.
- Silenzio prolungato = punizione. Pensa che tu non sappia.
- Verbalizzare ti aiuta a **catturare bug** prima.

### Cosa NON fare

- **Codice senza nome di variabili** (`x`, `t`, `aux`). Usa `prev_max`, `latest_idx`.
- **Skippare check di edge case** prima di scrivere.
- **Cancellare e riscrivere** se l'intervistatore non te lo chiede.

## Parte 5 — Test mentale (PRIMA di dichiarare done)

Mai dire *"I'm done"* senza:

### 1. Dry-run su un esempio

Prendi un esempio piccolo. **Trace step-by-step**:

> *"With input [1, 2, 3, 4], k=3. At step 1, i=0, x=1. seen={}. complement=2 not in seen. Add 1→0. seen={1:0}. Step 2, i=1, x=2. complement=1 in seen → return [0, 1]. ✓"*

### 2. Edge cases

- Empty input.
- Single element.
- All elements uguali.
- Negativi/zero.
- Estremi (max/min int).
- Già ordinato / reverse ordinato.
- Duplicati.

### 3. Complessità

Annunciala alla fine: *"Time O(n), space O(n) for the dict."*

Solo a questo punto: *"I think this is correct. Want me to dive into edge cases more, or move to a follow-up?"*

## Parte 6 — Gestione del tempo

| Difficoltà | Budget |
|---|---|
| Easy | 10-15 min |
| Medium | 20-30 min |
| Hard | 35-45 min |

Se sfori, significa:

- Sei lento sul coding (pratica più dattilografia).
- Esiti troppo a voce (pratica più mock).
- Approccio sbagliato (rivedi).

## Parte 7 — Errori killer (perdita immediata di punti)

1. **Codice senza spiegazione**. Fa pensare che stai memorizzando.
2. **Variabili senza nome**.
3. **Off-by-one non corretto**. Mostra mancanza di rigore.
4. **No test mentale prima di "done"**. L'intervistatore prova un caso, trova bug, decide tu non sei senior.
5. **Brute force "ottimo" senza menzionare versione naive**. L'intervistatore vuole il ragionamento progressivo.
6. **Discutere solo a parole senza scrivere niente**. Apri lo sketch + esempi.
7. **Non gestire edge case** con `if not arr: return ...` in cima.

## Parte 8 — Quando finisci in anticipo

Mai *"I'm done early, anything else?"*. Invece:

1. **Cerca edge case più sottili**.
2. **Proponi ottimizzazioni** ulteriori.
3. **Proponi varianti**: *"What if the input were a stream? What if it were sorted? What if we needed to support deletes?"*
4. **Discuti scaling**: *"For 10x the size, what would change?"*

## Parte 9 — Mock interview: dove farli

- **Pramp**: gratis, peer-to-peer.
- **interviewing.io**: anonimo, con dev FAANG (pagato).
- **Meetapro / IGotAnOffer**: feedback strutturato (pagato).
- **Con amici**: anche solo a vicenda. Meglio di niente.
- **Solo**: registrati su Loom mentre risolvi. Brutale ma efficace.

**Quanti**: minimo 5, idealmente 10+ prima del primo loop FAANG.

## Parte 10 — Esempio: mock interview completo (45 min)

Problema: **Top K Frequent Elements**.

```
[0:00] Intervistatore: "Given an integer array nums and an integer k, return the k most frequent elements. Order doesn't matter."

[0:30] Tu: "Let me confirm. Input nums = [1,1,1,2,2,3], k=2 → output [1,2]?"
       Intervistatore: "Yes."

[1:00] Tu: "Some clarifications:
            - Size of nums: 10^5? OK.
            - Range of values: -10^4 to 10^4? OK.
            - K is always valid (1 <= k <= unique count)? OK.
            - Ties? Any valid output? OK."

[2:00] Tu: "Brute force: count frequencies (O(n)), sort by frequency (O(u log u) where u = unique).
            Optimal with heap: O(n log k) using a min-heap of size k.
            Best: bucket sort by frequency, O(n).
            I'll start with heap, then mention bucket sort if there's time."

[Intervistatore: "Sounds good."]

[4:00] Tu code (parlando):
       """
       from collections import Counter
       import heapq

       def top_k(nums, k):
           c = Counter(nums)          # O(n)
           # min-heap of (freq, val), size k
           h = []
           for val, freq in c.items():
               if len(h) < k:
                   heapq.heappush(h, (freq, val))
               elif freq > h[0][0]:
                   heapq.heapreplace(h, (freq, val))
           return [val for freq, val in h]
       """

[10:00] Tu: "Let me trace with [1,1,1,2,2,3], k=2.
             c = {1:3, 2:2, 3:1}. Iterate items:
             (1,3): h=[(3,1)].
             (2,2): h=[(2,2),(3,1)] after push... wait, that's len=2, ok.
             (3,1): len(h)==2, h[0]=(2,2). 1 < 2, skip.
             Return [val for freq, val in h] = [2,1]. ✓"

[13:00] Tu: "Edge cases:
             - Empty array? Problem says n >= 1.
             - All same value? c={x: n}, h=[(n,x)], return [x]. ✓
             - k == unique count? Returns all values. ✓"

[15:00] Tu: "Complexity:
             Time: O(n) for Counter + O(u log k) for heap = O(n log k).
             Space: O(u) for Counter + O(k) for heap = O(n) worst case."

[17:00] Intervistatore: "Can we do it in O(n)?"

[18:00] Tu: "Yes! Bucket sort by frequency. Create n+1 buckets. For each (val, freq), put val in bucket[freq]. Then iterate from bucket[n] down to bucket[1], collecting values."
       """
       def top_k_bucket(nums, k):
           c = Counter(nums)
           buckets = [[] for _ in range(len(nums) + 1)]
           for val, freq in c.items():
               buckets[freq].append(val)
           res = []
           for freq in range(len(buckets) - 1, 0, -1):
               for val in buckets[freq]:
                   res.append(val)
                   if len(res) == k: return res
       """

[24:00] Intervistatore: "Great. What about scale? If nums is too large to fit in memory?"

[25:00] Tu: "Good question. If nums is a stream:
             - Counter still works if u (unique values) fits in memory.
             - If u is also too large: lossy counting / count-min sketch (approximate).
             - For top-K real-time: heavy hitters algorithms like SpaceSaving."

[30:00] Intervistatore: "OK, that's it for coding. Any questions for me?"

[30:30] Tu: "3 questions:
             1. What's the most challenging engineering problem the team has tackled recently?
             2. How is success measured for this role in the first 6 months?
             3. What's the on-call rotation like?"

[40:00] Intervistatore risponde.

[45:00] Fine.
```

## Parte 11 — Self-eval rubric

Dopo ogni mock o problema solo, valuta su questi assi (1-5):

- [ ] **Communication**: chiarezza, ritmo, esposizione del pensiero.
- [ ] **Approach quality**: pattern recognition, trade-off discussion.
- [ ] **Code quality**: pulizia, naming, edge case.
- [ ] **Correctness**: test mentale, dry-run.
- [ ] **Time management**: hai finito? Sforato?

Tieni un log. Vedi dove sei debole e lavora lì.

## Parte 12 — Il giorno del colloquio

### Mattina

- Dormito 7+ ore.
- Colazione abbondante.
- 30 min di problemi "warm-up" (facili, no nuovo materiale).

### Setup

- Tab del browser aperti: editor, problem statement.
- Block list di distrazioni.
- Acqua a portata di mano.
- Bagno fatto.

### Mindset

- L'intervistatore **vuole** che tu passi. Non è un nemico.
- Ogni colloquio è un'esperienza che ti migliora.
- Anche se non sai una cosa: *"Non l'ho mai fatto, ma ragionerei così..."* è una risposta valida.

## Riassunto

1. **45 min** = 30% prima del coding, 50% coding, 20% test+follow-up.
2. **Clarifying questions** sempre. Sono 1/3 del valore.
3. **Pensa a voce alta**. Silenzio = punizione.
4. **Test mentale prima di "done"**. Dry-run + edge cases + complessità.
5. **Quando bloccato**: verbalizza, torna agli esempi, chiedi hint solo se non avanzi.
6. **5-10 mock prima del primo loop**. Skill irrinunciabile.

La differenza tra "sa risolvere" e "passa il colloquio" è tutta qui dentro.
