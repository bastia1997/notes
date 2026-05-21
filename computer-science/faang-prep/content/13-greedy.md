---
title: Greedy
area: Algoritmi
summary: Quando una scelta locale "ovvia" porta all'ottimo globale. Riconoscere problemi greedy, l'exchange argument, quando smettere e passare a DP.
order: 13
---

# Greedy

Greedy è la tecnica più semplice da scrivere — e la più insidiosa da usare bene. **Non funziona sempre**. Devi sapere quando puoi usarla, e dimostrarlo (o convincerti, in colloquio).

## Parte 1 — L'idea

Un algoritmo greedy (avido) fa, ad ogni passo, la **scelta che sembra localmente migliore**, sperando arrivi all'ottimo globale.

Analogia: per andare in cima a una montagna, **sempre vai in salita**. Greedy. Funziona se la montagna è "convessa" (una sola cima). Non funziona se ci sono valli intermedie da attraversare.

### Esempio che FUNZIONA — Resto in monete (UK)

Devi dare resto di X centesimi con monete `[1, 2, 5, 10, 20, 50, 100]`. Min numero di monete.

Greedy: ad ogni passo prendi la moneta più grande che non supera X.

X = 87:
- 50 → resta 37
- 20 → resta 17
- 10 → resta 7
- 5 → resta 2
- 2 → resta 0

5 monete. **Funziona**.

### Esempio che NON FUNZIONA — Resto con monete strane

Stesso problema, monete `[1, 3, 4]`. X = 6.

Greedy: 4, 1, 1 → 3 monete.

Ottimo: 3, 3 → **2 monete**.

Greedy ha sbagliato. Serve DP.

### Lezione

Greedy funziona solo se hai due proprietà:

1. **Greedy choice property**: l'ottimo globale può essere costruito facendo sempre la scelta locale ottima.
2. **Optimal substructure**: l'ottimo del problema contiene gli ottimi dei sotto-problemi.

Quando manca (1), greedy fallisce.

## Parte 2 — Come si "dimostra" greedy in colloquio

Non serve dimostrazione formale. Bastano due argomenti, in ordine:

### Argomento 1 — Esempi

Prova greedy su 2-3 input piccoli. Se funziona, ok. **Cerca controesempi**: input dove greedy sbaglia. Se ne trovi, scartalo.

### Argomento 2 — Exchange argument (informale)

Suppone che la soluzione ottima OPT non faccia la scelta greedy in qualche punto. Mostra che puoi "scambiare" la scelta di OPT con quella greedy senza peggiorare. Se ci riesci, greedy è ottimo.

Esempio classico: **Activity Selection**.

> Hai un set di attività (start, end). Massimo numero non-sovrapposte.

**Greedy**: ordina per `end`, prendi la prima che inizia dopo la fine dell'ultima presa.

**Perché ottimo?** Suppone OPT non prende l'attività con `end` minimo. Allora OPT prende qualche altra attività `A` con end > end della greedy. Sostituendo A con la greedy nell'OPT, **non interferisco con le successive** (perché la greedy finisce prima). Stesso numero di attività, ma con la greedy. Iterando: la soluzione ottima può essere riscritta usando greedy. □

## Parte 3 — Pattern fondamentali

### Pattern 1 — Sort + scan

Ordina per qualche metrica, una passata.

**Activity Selection / Non-overlapping Intervals**:

```python
def max_non_overlap(intervals):
    intervals.sort(key=lambda x: x[1])   # ordina per END!
    count = 0
    end = float('-inf')
    for s, e in intervals:
        if s >= end:
            count += 1
            end = e
    return count
```

**Perché ordini per end, non per start?** Vedi sopra. Scegliendo l'attività che finisce prima, lasci più spazio per le altre.

### Pattern 2 — Heap per "next best"

Quando il "best locale" cambia dinamicamente. Heap mantiene il top in O(log n).

Esempio: Task Scheduler (cap. 07).

### Pattern 3 — Due passate

A volte una sola passata non basta. Pass left-to-right + pass right-to-left.

Esempio: **Candy distribution**. Ogni bimbo ha un rating. Bimbi con rating maggiore dei vicini ricevono più caramelle. Min totale.

```python
def candy(ratings):
    n = len(ratings)
    c = [1] * n
    # Pass left-to-right: gestisci vicini sinistri
    for i in range(1, n):
        if ratings[i] > ratings[i-1]:
            c[i] = c[i-1] + 1
    # Pass right-to-left: gestisci vicini destri
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i+1]:
            c[i] = max(c[i], c[i+1] + 1)
    return sum(c)
```

Una passata sola non basta perché ogni bimbo ha due vicini, e una direzione non vede l'altra.

### Pattern 4 — Greedy + invariante locale

Mantieni qualcosa che resta "vero" durante la scansione.

Esempio: Jump Game.

> Array di salti. `arr[i]` = salto max da i. Puoi raggiungere l'ultimo indice?

**Greedy**: tieni `reach` = massimo indice raggiungibile finora. Per ogni i, se i > reach, fallisci. Altrimenti aggiorna reach.

```python
def can_jump(nums):
    reach = 0
    for i, x in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + x)
    return True
```

O(n). Invariante: "fino a `reach` sono tutti raggiungibili".

## Parte 4 — Quando NON usare greedy

Trigger di "probabilmente DP, non greedy":

- "Numero di modi di..." → DP di conteggio.
- "Quanti X massimi puoi fare con un budget Y" → Knapsack-like, di solito DP.
- "Coin change con monete arbitrarie" → DP.
- "Sottoinsieme con somma X" → DP.
- "Greedy ovvio dà controesempio in 3 minuti" → DP.

**Rule of thumb operativa**:

- Se devi "scegliere k tra n" e **l'ordine NON conta**: probabilmente DP.
- Se devi "ordinare" o "minimo numero di X" con scelte sequenziali e indipendenti: probabilmente greedy.

## Parte 5 — Esercizi guidati

### Esercizio 13.1 — Jump Game <span class="problem-tag medium">MEDIUM</span>

Vedi parte 3 pattern 4.

### Esercizio 13.2 — Jump Game II <span class="problem-tag medium">MEDIUM</span>

Numero minimo di salti per arrivare alla fine.

<details><summary>Ragionamento</summary>

**BFS implicito**: ogni "salto" copre un intervallo. Trovi il punto più lontano raggiungibile dall'intervallo corrente, quello è il prossimo livello.

```python
def jump(nums):
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps
```

Trace `[2, 3, 1, 1, 4]`:

```
i=0 farthest = max(0, 0+2) = 2. i==cur_end=0 → jumps=1, cur_end=2.
i=1 farthest = max(2, 1+3) = 4.
i=2 farthest = max(4, 2+1) = 4. i==cur_end=2 → jumps=2, cur_end=4.
i=3 farthest = max(4, 3+1) = 4.
fine (i=4 è ultimo, non lo processiamo).
```

2 salti.

**Idea**: ogni "salto" estende il raggio raggiungibile. Quando esaurisci il raggio del salto corrente, fai un nuovo salto al punto più lontano fin qui visto.
</details>

### Esercizio 13.3 — Gas Station <span class="problem-tag medium">MEDIUM</span>

Ciclo di stazioni con gas[i] e cost[i]. Stazione da cui partire per fare il giro completo, o -1.

<details><summary>Ragionamento</summary>

**Insight 1**: Se sum(gas) < sum(cost), impossibile.

**Insight 2**: Se da `i` la riserva diventa negativa al punto `j`, allora **nessuna stazione tra `i` e `j`** può essere partenza. Perché? Se partissi da `k` con `i ≤ k ≤ j`, avresti un punto di partenza con meno carburante (perché non hai accumulato il surplus tra `i` e `k`). Quindi il primo candidato è `j+1`.

```python
def can_complete(gas, cost):
    if sum(gas) < sum(cost): return -1
    start = 0
    tank = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1
            tank = 0
    return start
```

O(n).
</details>

### Esercizio 13.4 — Non-overlapping Intervals <span class="problem-tag medium">MEDIUM</span>

Min intervalli da rimuovere per non avere sovrapposizioni.

<details><summary>Soluzione</summary>

```python
def erase_overlap(intervals):
    intervals.sort(key=lambda x: x[1])
    end = float('-inf')
    kept = 0
    for s, e in intervals:
        if s >= end:
            kept += 1
            end = e
    return len(intervals) - kept
```

= "totale - quanti posso tenere senza overlap". Pattern Activity Selection.
</details>

### Esercizio 13.5 — Merge Intervals <span class="problem-tag medium">MEDIUM</span>

<details><summary>Soluzione</summary>

```python
def merge_intervals(intervals):
    intervals.sort()
    res = []
    for s, e in intervals:
        if res and res[-1][1] >= s:
            res[-1][1] = max(res[-1][1], e)
        else:
            res.append([s, e])
    return res
```

Ordina per start. Se il prossimo si sovrappone con l'ultimo merged, estendi. Altrimenti, nuovo intervallo.
</details>

### Esercizio 13.6 — Insert Interval <span class="problem-tag medium">MEDIUM</span>

Inserisci `[s, e]` in lista ordinata, mergiando se necessario.

<details><summary>Soluzione</summary>

Tre fasi:

1. Copia gli intervalli che finiscono **prima** del nuovo.
2. Mergi quelli che si sovrappongono.
3. Copia il resto.

```python
def insert(intervals, new):
    res = []
    i = 0
    n = len(intervals)
    # Phase 1
    while i < n and intervals[i][1] < new[0]:
        res.append(intervals[i])
        i += 1
    # Phase 2
    while i < n and intervals[i][0] <= new[1]:
        new[0] = min(new[0], intervals[i][0])
        new[1] = max(new[1], intervals[i][1])
        i += 1
    res.append(new)
    # Phase 3
    res.extend(intervals[i:])
    return res
```

O(n).
</details>

### Esercizio 13.7 — Task Scheduler <span class="problem-tag medium">MEDIUM</span>

Vedi cap. 07.

### Esercizio 13.8 — Partition Labels <span class="problem-tag medium">MEDIUM</span>

Partiziona stringa in parti tali che ogni lettera appaia in al massimo una parte.

<details><summary>Ragionamento</summary>

Pre-calcola **ultima posizione** di ogni char. Espandi la finestra finché non raggiungi l'ultima posizione di tutti i char visti dentro.

```python
def partition_labels(s):
    last = {c: i for i, c in enumerate(s)}
    res = []
    start = end = 0
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            res.append(end - start + 1)
            start = i + 1
    return res
```

Trace `s = "ababcbacadefegdehijhklij"`:

```
last = {'a': 8, 'b': 5, 'c': 7, 'd': 14, 'e': 15, 'f': 11, 'g': 13, 'h': 19, 'i': 22, 'j': 23, 'k': 20, 'l': 21}
i=0 c='a': end=max(0,8)=8. i!=end.
i=1 c='b': end=max(8,5)=8.
...
i=8 c='a': end=8. i==end → partition [0..8] size 9. start=9.
i=9 c='d': end=max(0,14)=14.
...
i=15 c='e': end=15. i==end → partition [9..15] size 7. start=16.
...
```

Risultato: [9, 7, 8].
</details>

### Esercizio 13.9 — Hand of Straights <span class="problem-tag medium">MEDIUM</span>

Puoi dividere `hand` in gruppi di k carte consecutive?

<details><summary>Soluzione</summary>

```python
from collections import Counter
def is_n_straight(hand, k):
    if len(hand) % k: return False
    c = Counter(hand)
    for x in sorted(c):
        if c[x] > 0:
            n = c[x]
            for i in range(k):
                if c[x + i] < n: return False
                c[x + i] -= n
    return True
```

Greedy: parti dalla carta più piccola, "consuma" k consecutive partendo da lì.
</details>

### Esercizio 13.10 — Min Arrows to Burst Balloons <span class="problem-tag medium">MEDIUM</span>

<details><summary>Soluzione</summary>

```python
def find_min_arrows(points):
    points.sort(key=lambda p: p[1])
    arrows = 0
    end = float('-inf')
    for s, e in points:
        if s > end:
            arrows += 1
            end = e
    return arrows
```

Pattern Activity Selection.
</details>

## Riassunto

1. **Greedy = scelta locale ottima ad ogni passo**, sperando arrivi all'ottimo globale.
2. **Funziona solo se** la struttura del problema lo permette. Spesso da verificare con esempi/exchange argument.
3. **Pattern principali**: sort + scan, heap "next best", due passate, invariante locale.
4. **Quando NON funziona**: spesso serve DP.
5. **Pattern Activity Selection**: ordina per **end**, non per start.

Quando hai dubbi: "greedy funziona qui?", **costruisci 2 controesempi**. Se sopravvive, usalo; altrimenti, DP.
