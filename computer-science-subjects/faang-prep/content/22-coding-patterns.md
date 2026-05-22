---
title: I 16 coding patterns dei colloqui
area: Pattern recognition
summary: La sintesi essenziale. Per ogni problema sconosciuto, in &lt; 60 secondi devi identificare a quale di questi 16 pattern appartiene. Capitolo da rileggere prima di ogni colloquio.
order: 22
---

# I 16 coding patterns

Quasi ogni problema di colloquio FAANG si riduce a uno di questi 16 pattern. **Studiali a fondo**. Quando vedi un nuovo problema, la prima domanda non è "come lo risolvo?" ma **"a quale pattern appartiene?"**.

## Tabella riassuntiva

| # | Pattern | Trigger nel testo del problema |
|---|---|---|
| 1 | Two pointers | "array ordinato", "coppia/triplet con somma", palindromo |
| 2 | Sliding window | "subarray/substring contiguo", "più lungo/più corto con proprietà" |
| 3 | Fast & slow pointers | linked list ciclo, mediana, k-esimo dalla fine |
| 4 | Merge intervals | intervalli, "overlapping", "merge"/"insert"/"non-overlapping" |
| 5 | Cyclic sort | array di [1..n] con un valore mancante/duplicato |
| 6 | In-place reverse linked list | LL "reverse"/"rotate" |
| 7 | BFS / Level order | shortest path su grafo non pesato, alberi level by level |
| 8 | DFS / Backtracking | tutte le permutazioni/combinazioni/sottoinsiemi |
| 9 | Two heaps | mediana stream, scheduling |
| 10 | Subsets / power set | enumerare tutti i sottoinsiemi |
| 11 | Modified binary search | array ordinato (con rotazione/duplicati), "find first/last X" |
| 12 | Top K elements | "K più grandi/piccoli/frequenti" |
| 13 | K-way merge | "merge N liste/array ordinati", k smallest in matrix |
| 14 | Topological sort | dipendenze, ordinamento, "prerequisiti" |
| 15 | Dynamic programming | "numero di modi", "max/min con scelte", "esiste cammino con somma" |
| 16 | Union-Find (DSU) | "connected components" dinamici, MST, cicli in non orientato |

---

## 1. Two pointers

→ vedi cap. 12.

**Forma**: `l = 0, r = n-1` (collide) oppure `slow, fast` (same direction).

**Problemi tipo**: Two Sum II, 3Sum, Trapping Rain Water, Remove Duplicates, Container With Most Water.

## 2. Sliding window

→ vedi cap. 12.

**Forma**: `l = 0; for r in ...; while not valid: l += 1`.

**Problemi tipo**: Longest Substring Without Repeating, Min Window Substring, Permutation in String, Max Sum Subarray of K.

## 3. Fast & slow pointers (Floyd)

Slow di 1, fast di 2. Ciclo? Middle? Inizio del ciclo?

**Problemi tipo**: Linked List Cycle, Find Duplicate Number (array come funzione), Happy Number, Palindrome Linked List.

```python
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow is fast: ...
```

## 4. Merge intervals

Ordina per start (o end). Confronta consecutivi.

**Problemi tipo**: Merge Intervals, Insert Interval, Meeting Rooms II, Employee Free Time.

```python
intervals.sort()
res = []
for s, e in intervals:
    if res and res[-1][1] >= s:
        res[-1][1] = max(res[-1][1], e)
    else:
        res.append([s, e])
```

## 5. Cyclic sort

Array di n elementi in [1..n] o [0..n-1]: ogni elemento appartiene a una posizione precisa. Mettilo lì.

```python
i = 0
while i < n:
    j = arr[i] - 1   # posizione corretta di arr[i]
    if arr[i] != arr[j]:
        arr[i], arr[j] = arr[j], arr[i]
    else:
        i += 1
```

**Problemi tipo**: Find All Missing Numbers, First Missing Positive, Find Duplicate, Set Mismatch.

## 6. In-place reverse linked list

Pattern "prev / cur / next". Memorizzato a memoria.

```python
prev = None; cur = head
while cur:
    nxt = cur.next
    cur.next = prev
    prev = cur; cur = nxt
return prev
```

**Problemi tipo**: Reverse, Reverse in K-Group, Reorder List, Swap Nodes in Pairs.

## 7. BFS / Tree Level Order

Coda + processa per livello.

```python
q = deque([root])
while q:
    for _ in range(len(q)):
        n = q.popleft()
        ...
        q.append(n.left); q.append(n.right)
```

**Problemi tipo**: Level Order, Zigzag, Right Side View, Min Depth, Rotting Oranges, Word Ladder.

## 8. DFS / Backtracking

Ricorsione che esplora + annulla scelte. → vedi cap. 10.

**Problemi tipo**: All permutations/combinations/subsets, N-Queens, Sudoku, Word Search, Letter Combinations.

## 9. Two heaps (max-heap + min-heap)

Bilanciare due metà per accesso a mediana / split balance.

**Problemi tipo**: Find Median from Data Stream, Sliding Window Median, IPO (heap di tasks).

## 10. Subsets / Power set

Generare tutti i 2ⁿ sottoinsiemi. Iterativo o ricorsivo. → vedi cap. 10.

```python
res = [[]]
for x in arr:
    res += [s + [x] for s in res]
```

## 11. Modified binary search

Quando hai "qualcosa di ordinato" ma non array dritto:

- Rotated sorted array.
- Sorted matrix.
- "Smallest k such that f(k) = ok".
- "Find first/last X".

Template binary search → vedi cap. 11. Riconosci dalla frase **"in O(log n)"** o input enorme con risposta "minimo/massimo X tale che...".

## 12. Top K elements

Heap di dimensione k. Min-heap per i k più grandi, max-heap per i k più piccoli.

→ vedi cap. 7.

## 13. K-way merge

K liste/array ordinati. Heap iniziale con il primo elemento di ciascuno.

→ vedi cap. 7 "Merge K sorted lists".

**Problemi tipo**: Merge K Sorted Lists, Kth Smallest in M Sorted Lists, Smallest Range Covering K Lists.

## 14. Topological sort

DAG, "prerequisite", "build order". Kahn (indegree) o DFS postorder reverse.

→ vedi cap. 8.

**Problemi tipo**: Course Schedule, Alien Dictionary, Sequence Reconstruction, Parallel Courses.

## 15. Dynamic programming

L'enorme bucket. Identifica sotto-pattern:

- **1D**: Fibonacci-like, House Robber, Word Break, Decode Ways.
- **2D griglia**: Unique Paths, Min Path Sum.
- **Knapsack**: 0/1, unbounded.
- **LIS / LCS / Edit Distance**.
- **Intervalli**: Burst Balloons, MCM, Palindrome Partitioning.
- **Bitmask** (n ≤ 20): TSP, Partition to K Equal Sum.
- **Stati con cooldown**: Stock problems II/III/IV.

→ vedi cap. 14.

## 16. Union-Find (DSU)

Componenti connesse, ciclo in non orientato, MST.

→ vedi cap. 8.

**Problemi tipo**: Number of Connected Components, Redundant Connection, Accounts Merge, Most Stones Removed.

---

## Workflow di pattern recognition in colloquio

Quando ti danno un problema, **per 30-60 secondi non scrivere codice**. Pensa:

1. Qual è la **struttura di input**? (array, lista, grafo, stringa, intervalli...)
2. È **ordinato**? Posso ordinarlo?
3. Quale è l'**output**? Un numero, un cammino, un boolean, una lista?
4. Quali **constraint** danno? `n ≤ 10⁵` → O(n log n). `n ≤ 20` → bitmask / backtracking. `n ≤ 500` → O(n³) ok.
5. **Riconosci il pattern**: ad alta voce di' "questo sembra un problema di sliding window perché... ".

Se l'intervistatore conferma o dà un hint, va bene. Se è scettico, riconsidera.

## Cheat sheet finale (stampa e portati al colloquio mentale)

| Quando vedi nel testo... | Pattern |
|---|---|
| Array **ordinato** | two pointers / binary search |
| **Substring/subarray contiguo** | sliding window |
| LL **ciclo** / **mediana** in LL | fast & slow |
| Intervalli **sovrapposti** | sort + scan |
| Array di **[1..n]** | cyclic sort |
| **Reverse** LL | prev/cur/next |
| **Shortest path** non pesato | BFS |
| **Tutte le combinazioni** | backtracking |
| **Mediana** in stream | two heaps |
| **Tutti i sottoinsiemi** | subsets / power set |
| "Ordinato + log n" | modified binary search |
| "**K più** ..." | heap di dim k |
| **Merge N** liste/array | k-way merge heap |
| "**Prerequisiti**" | topological sort |
| "Numero di modi" / "max-min con scelte" | DP |
| "Componenti connesse" / "cycle in undirected" | DSU |

Rileggi questo capitolo **prima di ogni colloquio**.
