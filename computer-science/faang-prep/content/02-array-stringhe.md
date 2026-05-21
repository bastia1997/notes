---
title: Array e stringhe
area: Strutture dati
summary: Dalle fondamenta — memoria, indirizzi, indici — fino ai pattern principali. Le strutture più chieste in colloquio, spiegate dal nulla.
order: 2
---

# Array e stringhe

Sono il **70% dei problemi di interview**. Padroneggia questo capitolo a fondo e hai già fatto metà del lavoro.

Iniziamo dalla base assoluta.

## Parte 1 — Cos'è un array, davvero

### La memoria del computer è un nastro di celle

Il computer ha una **memoria RAM**, che puoi immaginare come un enorme nastro di celle numerate. Ogni cella contiene un byte (8 bit, un numero da 0 a 255). Ogni cella ha un **indirizzo**: 0, 1, 2, 3, ...

<div style="background:#161922;border:1px solid #262b3a;border-radius:8px;padding:16px;margin:14px 0;overflow-x:auto;">
<svg viewBox="0 0 480 100" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:auto;font-family:'Cascadia Code',monospace;">
  <defs>
    <style>
      .cell { fill:#1d2230; stroke:#262b3a; stroke-width:1; }
      .ct { fill:#e6e8ee; font-size:14px; font-weight:600; }
      .addr { fill:#7a8194; font-size:11px; }
      .lbl { fill:#b6bdcc; font-size:12px; font-weight:600; }
    </style>
  </defs>
  <text class="lbl" x="5" y="20">Indirizzo</text>
  <text class="lbl" x="5" y="55">Contenuto</text>
  <g transform="translate(75, 5)">
    <text class="addr" x="20"  y="14" text-anchor="middle">0</text>
    <text class="addr" x="60"  y="14" text-anchor="middle">1</text>
    <text class="addr" x="100" y="14" text-anchor="middle">2</text>
    <text class="addr" x="140" y="14" text-anchor="middle">3</text>
    <text class="addr" x="180" y="14" text-anchor="middle">4</text>
    <text class="addr" x="220" y="14" text-anchor="middle">5</text>
    <text class="addr" x="260" y="14" text-anchor="middle">6</text>
    <text class="addr" x="320" y="14" text-anchor="middle">...</text>
    <rect class="cell" x="0"   y="22" width="40" height="40"/>
    <rect class="cell" x="40"  y="22" width="40" height="40"/>
    <rect class="cell" x="80"  y="22" width="40" height="40"/>
    <rect class="cell" x="120" y="22" width="40" height="40"/>
    <rect class="cell" x="160" y="22" width="40" height="40"/>
    <rect class="cell" x="200" y="22" width="40" height="40"/>
    <rect class="cell" x="240" y="22" width="40" height="40"/>
    <rect class="cell" x="280" y="22" width="60" height="40" stroke-dasharray="4,3"/>
    <text class="ct" x="20"  y="48" text-anchor="middle">42</text>
    <text class="ct" x="60"  y="48" text-anchor="middle">17</text>
    <text class="ct" x="100" y="48" text-anchor="middle">99</text>
    <text class="ct" x="140" y="48" text-anchor="middle">03</text>
    <text class="ct" x="180" y="48" text-anchor="middle">77</text>
    <text class="ct" x="220" y="48" text-anchor="middle">12</text>
    <text class="ct" x="260" y="48" text-anchor="middle">88</text>
    <text class="ct" x="310" y="48" text-anchor="middle">...</text>
  </g>
</svg>
</div>

### Un array è un blocco contiguo di celle

Un array è semplicemente un **blocco di celle adiacenti** dedicate a contenere elementi dello stesso tipo. Se ho un array di 5 interi da 32 bit (4 byte ciascuno), sta in 20 celle consecutive.

Diciamo che il primo elemento è all'indirizzo 1000. Allora:

- `arr[0]` → indirizzo 1000
- `arr[1]` → indirizzo 1004
- `arr[2]` → indirizzo 1008
- ...
- `arr[i]` → indirizzo `1000 + i × 4`

### Perché `arr[i]` è O(1)

Ecco la magia: per accedere ad `arr[i]` il computer fa **una sola operazione aritmetica**: calcola `base + i × dimensione_elemento`. Indipendentemente da `i`. Quindi è O(1).

Se l'array è in cache, l'accesso è effettivamente istantaneo (~1 ns). Per questo gli array sono "cache-friendly": elementi vicini in indice sono vicini in memoria → quando ne carichi uno, ne carica anche di adiacenti in cache.

### Cosa succede in Python?

In Python `list` è leggermente diverso dall'array C: contiene **puntatori** a oggetti (perché Python è "duck-typed"). Ma l'idea è la stessa: accesso a `list[i]` è O(1).

### Limiti

Per essere O(1), l'array ha bisogno di stare **in un blocco contiguo**. Conseguenze:

- **Insert al centro è O(n)**: per fare spazio devi spostare gli elementi successivi.
- **Pop al centro è O(n)**: stesso motivo.
- **Append in coda è O(1) ammortizzato**: di solito c'è spazio "in fondo". Quando si riempie, l'array si **rialloca** (raddoppia capacità) e copia tutto → O(n) ogni tanto.

```
prima:     [42, 17, 99, _, _, _, _, _]   capacity 8, size 3
append 7:  [42, 17, 99, 7, _, _, _, _]   capacity 8, size 4  → O(1)
... finché size raggiunge capacity ...
append:    rialloca a capacity 16, copia tutto → O(n) raro
```

In media, questo è **O(1) ammortizzato**.

## Parte 2 — Stringhe: array di caratteri ma immutabili

In Python (e Java) una stringa è **un array di caratteri immutabile**. Immutabile significa: **non puoi modificarla, solo crearne una nuova**.

```python
s = "hello"
s[0] = 'H'    # TypeError: 'str' object does not support item assignment
```

Per modificarla devi creare una nuova stringa:

```python
s = "H" + s[1:]   # "Hello"
```

### Perché immutabile?

Tre motivi:

1. **Sicurezza**: una funzione che riceve una stringa è sicura che non venga modificata "alle spalle".
2. **Hashing**: le stringhe possono essere chiavi di dict (richiede hashabilità, che richiede immutabilità).
3. **Caching/interning**: Python può riusare la stessa stringa in più posti (es. `"hello"` letterale).

### La trappola della concatenazione

```python
risultato = ""
for c in chars:
    risultato += c
```

Sembra O(n). **È O(n²)**. Perché ogni `+=` crea una nuova stringa copiando tutti i caratteri precedenti. Iterazione `i` copia `i` caratteri. Totale: `1 + 2 + ... + n = n²/2`.

Soluzione: **costruisci una lista di char, poi join alla fine**.

```python
parti = []
for c in chars:
    parti.append(c)
risultato = "".join(parti)   # O(n) totale
```

Questo è uno dei trucchi più importanti per il colloquio Python.

## Parte 3 — Array a 2D (matrici)

Una matrice 2D è un "array di array". In Python:

```python
mat = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
mat[r][c]   # riga r, colonna c
```

### Creare una matrice n × m vuota

```python
# CORRETTO:
mat = [[0] * m for _ in range(n)]
```

### Trappola classica: l'aliasing

```python
# SBAGLIATO:
mat = [[0] * m] * n
mat[0][0] = 1
print(mat)   # Tutte le righe modificate!
# [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
```

**Perché?** `[[0]*m] * n` ripete `n` volte **lo stesso riferimento** alla riga `[0]*m`. Modificando una "riga" stai modificando l'unica esistente.

La versione con **list comprehension** invece crea oggetti distinti ogni volta.

### Visitare una matrice

```python
for r in range(len(mat)):
    for c in range(len(mat[0])):
        print(mat[r][c])
```

Complessità: O(n × m). Per una matrice n×n: O(n²).

### Vicini in una griglia (4-direzioni)

Quasi ogni problema su griglia ha questo idiom:

```python
DIRS = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # up, down, left, right
for dr, dc in DIRS:
    nr, nc = r + dr, c + dc
    if 0 <= nr < R and 0 <= nc < C:
        ...
```

8-direzioni (diagonali incluse):

```python
DIRS = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]
```

## Parte 4 — Operazioni Python essenziali

Tutte da padroneggiare a memoria:

### Creazione

```python
arr = []                 # vuoto
arr = [0] * n            # n zeri
arr = list(range(n))     # [0, 1, ..., n-1]
arr = [i*2 for i in range(n)]   # list comprehension
mat = [[0]*m for _ in range(n)]
```

### Slicing — l'arma segreta di Python

```python
arr[i:j]      # da i (incluso) a j (escluso). Crea COPIA, O(k) con k=j-i.
arr[:k]       # primi k
arr[k:]       # da k in poi
arr[::-1]     # reverse (copia)
arr[::2]      # ogni 2 elementi
arr[1:5:2]    # da 1 a 5, step 2
```

**Attenzione**: lo slicing **copia**. Per array grandi, occhio alla memoria.

### Modifiche

```python
arr.append(x)        # in coda, O(1) am.
arr.pop()            # rimuove e ritorna ultimo, O(1)
arr.pop(0)           # rimuove e ritorna primo, O(n) — EVITA!
arr.insert(i, x)     # O(n)
arr.remove(x)        # rimuove prima occorrenza, O(n)
arr.reverse()        # in-place, O(n)
arr.sort()           # in-place, O(n log n)
sorted(arr)          # ritorna copia ordinata
arr.extend([1, 2])   # concatena un'altra lista
```

### Stringhe

```python
s.lower(), s.upper(), s.strip(), s.title()
s.startswith("a"), s.endswith("z")
s.replace("a", "b")
s.split(",")         # split su separatore
s.split()            # default: split su whitespace
",".join(lista)      # concatena con separatore
s.find("sub")        # primo indice o -1
s.count("a")
ord('a'), chr(97)    # carattere ↔ codice ASCII
s.isdigit(), s.isalpha(), s.isalnum()
```

## Parte 5 — I 5 pattern fondamentali

Ora il pezzo grosso. Quasi tutti i problemi su array si riducono a uno di questi pattern.

### Pattern 1 — Two pointers

**L'idea**: invece di due loop annidati (O(n²)), usa **due indici** che si muovono in modo coordinato (O(n)).

Quando funziona:

- Array **ordinato**.
- Cerchi **coppie/triplette** con somma target.
- Cerchi un **palindromo** o simmetria.

Esempio: "in un array ordinato, trova due indici la cui somma è target".

```python
def two_sum_sorted(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        s = arr[l] + arr[r]
        if s == target:
            return (l, r)
        elif s < target:
            l += 1     # serve un numero più grande → muovi sinistra
        else:
            r -= 1     # serve uno più piccolo → muovi destra
    return None
```

**Perché funziona?** Sfruttiamo l'ordinamento. Se la somma è troppo piccola, **l'unico modo** per aumentarla è muovere `l` a destra (l'altro estremo è già il massimo). Se è troppo grande, abbassiamo `r`. Mai indietro, mai duplicati, sempre verso il centro.

Complessità: **O(n)** (ogni iterazione avanza l o r di 1, in totale al massimo `n` iterazioni).

### Pattern 2 — Sliding window

**L'idea**: mantenere una "finestra" `[l, r]` sull'array, che si **estende a destra** quando puoi, **contrae a sinistra** quando devi.

Quando funziona:

- **Sottoarray/sottostringa contigua** con qualche proprietà (somma, distinct count, ecc.).
- *"Più lunga/più corta"*, *"esiste"*, *"conta"* — molti trigger.

Esempio: "lunghezza massima di sottostringa senza caratteri ripetuti".

```python
def longest_unique(s):
    last_seen = {}      # char -> ultimo indice visto
    l = 0
    best = 0
    for r, c in enumerate(s):
        if c in last_seen and last_seen[c] >= l:
            l = last_seen[c] + 1  # contrai a sinistra
        last_seen[c] = r
        best = max(best, r - l + 1)
    return best
```

Traccia su `s = "abcabcbb"`:

```
r=0 c='a': last={a:0}, l=0, best=1     window [0,0] = "a"
r=1 c='b': last={a:0,b:1}, l=0, best=2 window [0,1] = "ab"
r=2 c='c': last={a:0,b:1,c:2}, l=0, best=3 window [0,2] = "abc"
r=3 c='a': 'a' visto a 0 ≥ l=0 → l=1.  last={a:3,b:1,c:2}, best=3
r=4 c='b': 'b' visto a 1 ≥ l=1 → l=2.  last={a:3,b:4,c:2}, best=3
r=5 c='c': 'c' visto a 2 ≥ l=2 → l=3.  best=3
r=6 c='b': 'b' visto a 4 ≥ l=3 → l=5.  best=3 (window [5,6])
r=7 c='b': 'b' visto a 6 ≥ l=5 → l=7.  best=3
```

Complessità: **O(n)**. `r` avanza ad ogni iterazione del `for`. `l` avanza solo a destra. Totale al massimo 2n movimenti.

### Pattern 3 — Prefix sum

**L'idea**: precalcolare le **somme cumulative** in un array, così le somme di range diventano O(1).

```python
def costruisci_prefix(arr):
    pre = [0]
    for x in arr:
        pre.append(pre[-1] + x)
    return pre

# pre[i] = somma di arr[0..i-1]
# Somma di arr[i..j] (inclusivi) = pre[j+1] - pre[i]
```

Esempio: `arr = [3, 1, 4, 1, 5, 9, 2]`, `pre = [0, 3, 4, 8, 9, 14, 23, 25]`.

Somma di `arr[2..4]` = `4 + 1 + 5 = 10`. Verifica: `pre[5] - pre[2] = 14 - 4 = 10`. ✓

**Quando usarlo**:

- Devi rispondere a tante query del tipo "somma del range [i, j]".
- Vuoi ridurre `O(n)` per query a `O(1)` per query (costo: `O(n)` di preprocessing).
- Combinato con hashmap: "conta sottoarray con somma esatta k" (vedi cap. hashmap).

### Pattern 4 — Hashmap-based

**L'idea**: usa un `dict` o `set` per ricordare informazioni viste, riducendo brute force `O(n²)` a `O(n)`.

Esempio classico: **Two Sum** (array NON ordinato, trova due indici con somma = target).

```python
def two_sum(arr, target):
    seen = {}   # valore -> indice
    for i, x in enumerate(arr):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
```

**Perché funziona?** Per ogni `x`, invece di scorrere il resto dell'array per cercare il complemento, controlliamo se l'abbiamo **già visto prima**. Una sola passata, lookup O(1).

Dettagli importanti in [cap. 03 — Hashmap](03-hashmap-set.html).

### Pattern 5 — Sort + scan

**L'idea**: a volte ordinare prima rende il problema banale. Paghi `O(n log n)` per il sort ma poi risolvi in `O(n)`.

Esempio: **rimuovi duplicati** in-place.

```python
def remove_duplicates(arr):
    # Assumi arr ordinato
    if not arr: return 0
    w = 1   # write pointer
    for r in range(1, len(arr)):
        if arr[r] != arr[r-1]:
            arr[w] = arr[r]
            w += 1
    return w   # nuova lunghezza
```

In-place, O(n) tempo, O(1) spazio.

## Parte 6 — Le 5 trappole che fanno cadere il 90% dei candidati

### Trappola 1 — Aliasing di liste

Già vista. `[[0]*m] * n` crea righe condivise. Usa list comprehension.

### Trappola 2 — Modificare l'array durante iterazione

```python
# SBAGLIATO
for x in arr:
    if cond(x): arr.remove(x)   # salta elementi!

# CORRETTO 1: filtro
arr = [x for x in arr if not cond(x)]

# CORRETTO 2: itera al contrario
for i in range(len(arr) - 1, -1, -1):
    if cond(arr[i]): arr.pop(i)
```

### Trappola 3 — Off-by-one

Il bug più comune. Per ogni range, chiediti:

- È **inclusivo** o **esclusivo** sui due lati?
- Il loop fa `< n` o `<= n`?
- L'indice parte da 0 o da 1?

Convenzione Python: `range(a, b)` = `[a, a+1, ..., b-1]` (escluso b). `arr[i:j]` = `arr[i], ..., arr[j-1]` (escluso j).

In colloquio, **traccia l'algoritmo su un esempio piccolo** prima di dichiarare done.

### Trappola 4 — Concatenazione di stringhe in loop

Già vista. `s += c` in loop = O(n²). Usa `''.join(lista)`.

### Trappola 5 — Copia vs riferimento

```python
a = [1, 2, 3]
b = a
b.append(4)
print(a)   # [1, 2, 3, 4] !! Stesso oggetto
```

Per copiare:

```python
b = a[:]        # shallow copy
b = list(a)
b = a.copy()

import copy
b = copy.deepcopy(a)   # se ci sono nested list
```

## Parte 7 — Snippet d'oro

Da memorizzare. In colloquio non hai tempo di riderivarli.

### Reverse in-place di un range

```python
def reverse_range(arr, i, j):
    while i < j:
        arr[i], arr[j] = arr[j], arr[i]
        i += 1
        j -= 1
```

### Rotazione di un array di k posizioni (3 reverse)

```python
def rotate(arr, k):
    n = len(arr)
    k %= n
    reverse_range(arr, 0, n-1)
    reverse_range(arr, 0, k-1)
    reverse_range(arr, k, n-1)
```

Esempio: `[1,2,3,4,5]`, `k=2`:

```
inizio:       [1, 2, 3, 4, 5]
reverse all:  [5, 4, 3, 2, 1]
reverse 0..1: [4, 5, 3, 2, 1]
reverse 2..4: [4, 5, 1, 2, 3]
```

✓ Ruotato a destra di 2.

### Counter di frequenze

```python
from collections import Counter
freq = Counter("abracadabra")
# Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
freq.most_common(3)   # [('a',5), ('b',2), ('r',2)]
```

### Verifica anagramma

```python
def is_anagram(a, b):
    return Counter(a) == Counter(b)
```

O(n+m). Alternativa `sorted(a) == sorted(b)` è O(n log n).

### Verifica palindromo (con filtro alfanumerico)

```python
def is_palindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True
```

Two pointers con skip dei caratteri non alfanumerici.

## Esercizi guidati

### Esercizio 2.1 — Two Sum <span class="problem-tag easy">EASY</span>

Dato un array `arr` e un target `t`, trova due indici `i, j` con `arr[i] + arr[j] = t`. Garantito esista una soluzione.

<details><summary>Ragionamento dal nulla</summary>

**Brute force**: prova tutte le coppie. Due loop annidati → O(n²).

```python
for i in range(n):
    for j in range(i+1, n):
        if arr[i] + arr[j] == t:
            return [i, j]
```

**Posso fare meglio?** Sì, applicando il **pattern hashmap**. Per ogni `x` che vedo, mi chiedo: "ho già visto `t - x`?". Se sì, ho la mia coppia. Se no, ricordo `x` per il futuro.

```python
def two_sum(arr, t):
    seen = {}   # valore -> indice
    for i, x in enumerate(arr):
        complemento = t - x
        if complemento in seen:
            return [seen[complemento], i]
        seen[x] = i
```

**Complessità**: tempo O(n) (una sola passata, ogni lookup è O(1)), spazio O(n) (hashmap può contenere fino a n elementi).

**Lezione**: trasformare un problema "trova due cose che combinano" in "trova una cosa che combina con quello che ho già visto". È il pattern hashmap classico.
</details>

### Esercizio 2.2 — Best Time to Buy/Sell Stock <span class="problem-tag easy">EASY</span>

Array `prices`: `prices[i]` = prezzo dell'azione al giorno `i`. Compri 1 azione in un giorno e vendi in un giorno successivo. Massimo profitto.

<details><summary>Ragionamento</summary>

**Brute force**: prova tutte le coppie (i, j) con i<j, calcola `prices[j] - prices[i]`, tieni il massimo. O(n²).

**Ottimizzazione**: cosa serve veramente? Per ogni giorno `j`, voglio sapere il **minimo prezzo visto finora** (in qualche giorno precedente). Se lo so, il miglior profitto vendendo al giorno `j` è `prices[j] - min_visto`.

Quindi tieni una variabile `min_visto` aggiornata mentre scorri.

```python
def max_profit(prices):
    min_visto = float('inf')
    best = 0
    for p in prices:
        min_visto = min(min_visto, p)
        best = max(best, p - min_visto)
    return best
```

O(n) tempo, O(1) spazio.

**Lezione**: spesso "il minimo/massimo visto finora" è una sola variabile da aggiornare. Non serve un array. Risparmi spazio.
</details>

### Esercizio 2.3 — Move Zeroes <span class="problem-tag easy">EASY</span>

Sposta tutti gli zeri alla fine, mantenendo l'ordine degli altri elementi. In-place.

<details><summary>Ragionamento</summary>

**Idea**: due puntatori. Un "write pointer" che indica dove scrivere il prossimo non-zero. Un "read pointer" che scorre tutto.

```python
def move_zeroes(arr):
    w = 0
    for r in range(len(arr)):
        if arr[r] != 0:
            arr[w], arr[r] = arr[r], arr[w]
            w += 1
```

Lo swap è importante: invece di sovrascrivere e poi aggiungere zeri alla fine, swappi così "raccogli" gli zero in fondo automaticamente.

Trace su `[0, 1, 0, 3, 12]`:

```
r=0 arr[r]=0: skip. arr=[0,1,0,3,12], w=0
r=1 arr[r]=1: swap arr[0]<->arr[1]. arr=[1,0,0,3,12], w=1
r=2 arr[r]=0: skip. w=1
r=3 arr[r]=3: swap arr[1]<->arr[3]. arr=[1,3,0,0,12], w=2
r=4 arr[r]=12: swap arr[2]<->arr[4]. arr=[1,3,12,0,0], w=3
```

✓ Risultato: `[1, 3, 12, 0, 0]`.

O(n) tempo, O(1) spazio.
</details>

### Esercizio 2.4 — Container With Most Water <span class="problem-tag medium">MEDIUM</span>

Array `heights`. Scegli due indici `i < j`: l'area è `(j-i) × min(heights[i], heights[j])` (immagina due barre verticali e l'acqua tra loro). Trova area massima.

<details><summary>Ragionamento (importante!)</summary>

**Brute force**: tutte le coppie. O(n²).

**Idea two pointers**: parti dai due estremi (`l=0, r=n-1`). Hai l'area più larga possibile. Poi muovi i pointer verso il centro per "esplorare" altre opzioni.

Domanda: **quale muovere**?

Risposta: **quello con altezza minore**. Perché? Se muovi quello con altezza maggiore:

- La larghezza diminuisce.
- L'altezza minima **non può aumentare** (è ancora limitata dall'altra barra, che era già la più bassa).

Quindi l'area può solo restare uguale o diminuire. Inutile.

Se muovi quello con altezza minore:

- La larghezza diminuisce.
- L'altezza minima **potrebbe aumentare** (se incontri una barra più alta).

C'è speranza. Quindi muovi sempre il pointer "basso".

```python
def max_area(h):
    l, r = 0, len(h) - 1
    best = 0
    while l < r:
        area = (r - l) * min(h[l], h[r])
        best = max(best, area)
        if h[l] < h[r]:
            l += 1
        else:
            r -= 1
    return best
```

O(n).

**Lezione**: per fare two pointers correttamente, devi sempre **giustificare quale pointer muovere e perché**. Non è meccanico.
</details>

### Esercizio 2.5 — 3Sum <span class="problem-tag medium">MEDIUM</span>

Trova tutte le triplette `(a, b, c)` distinte con `a + b + c = 0`.

<details><summary>Ragionamento</summary>

**Brute force**: triplo loop → O(n³).

**Idea**: fissa un elemento `arr[i]`, poi il resto è "2Sum con target = -arr[i]" sul resto dell'array. Se ordini l'array, puoi fare 2Sum con two pointers in O(n).

```python
def three_sum(arr):
    arr.sort()
    res = []
    n = len(arr)
    for i in range(n - 2):
        if arr[i] > 0: break   # ottimizzazione: tutti pos, non zero
        if i > 0 and arr[i] == arr[i-1]: continue   # skip duplicati
        l, r = i + 1, n - 1
        while l < r:
            s = arr[i] + arr[l] + arr[r]
            if s == 0:
                res.append([arr[i], arr[l], arr[r]])
                l += 1
                r -= 1
                # skip duplicati
                while l < r and arr[l] == arr[l-1]: l += 1
                while l < r and arr[r] == arr[r+1]: r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    return res
```

O(n²). Lo skip dei duplicati è la parte sottile: senza, otterresti `[-1,-1,2]` e `[-1,-1,2]` se l'array ha `-1` due volte.

**Lezione**: fissa una variabile, riduci a un sotto-problema noto (2Sum). Sort + two pointers è il combo killer.
</details>

### Esercizio 2.6 — Product Except Self <span class="problem-tag medium">MEDIUM</span>

Restituisci `out[i] = prodotto di tutti arr[j] con j ≠ i`. **Senza divisione**, in O(n).

<details><summary>Ragionamento</summary>

**Brute force**: per ogni `i`, prodotto degli altri → O(n²).

**Con divisione**: prodotto totale / arr[i]. O(n). Ma vietato (e gestisci zeri).

**Trucco**: `out[i] = prodotto degli elementi a sinistra di i × prodotto degli elementi a destra di i`.

Calcoliamo entrambi in due passate.

```python
def product_except_self(arr):
    n = len(arr)
    out = [1] * n
    # Prima passata: out[i] = prodotto a sinistra di i
    pre = 1
    for i in range(n):
        out[i] = pre
        pre *= arr[i]
    # Seconda passata: moltiplica per prodotto a destra
    suf = 1
    for i in range(n - 1, -1, -1):
        out[i] *= suf
        suf *= arr[i]
    return out
```

Trace su `[1, 2, 3, 4]`:

```
Dopo passata 1: out = [1, 1, 2, 6]  (prefix products)
Passata 2:
  i=3: out[3] = 6 * 1 = 6, suf = 4
  i=2: out[2] = 2 * 4 = 8, suf = 12
  i=1: out[1] = 1 * 12 = 12, suf = 24
  i=0: out[0] = 1 * 24 = 24
Risultato: [24, 12, 8, 6]
```

Verifica: out[0] = 2·3·4 = 24 ✓, out[1] = 1·3·4 = 12 ✓, ecc.

O(n) tempo, O(1) extra (escluso output).

**Lezione**: pre e post passata sono un pattern. Memorizzalo, riappare ovunque.
</details>

### Esercizio 2.7 — Maximum Subarray (Kadane) <span class="problem-tag medium">MEDIUM</span>

Sottoarray contiguo non vuoto con somma massima.

<details><summary>Ragionamento</summary>

**Brute force**: tutti i sottoarray. O(n²) (o O(n³) ingenuamente, ma con prefix sum scende a O(n²)).

**Idea Kadane**: per ogni posizione `i`, due possibilità:

1. **Estendi** il sottoarray finito a `i-1`: somma corrente += arr[i].
2. **Ricomincia** da `i`: somma corrente = arr[i].

Scegli quello che dà più. Tieni traccia del massimo visto.

```python
def max_subarray(arr):
    cur = best = arr[0]
    for x in arr[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best
```

Trace su `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

```
i=0 x=-2:  cur=-2, best=-2
i=1 x=1:   cur=max(1, -2+1)=1, best=1
i=2 x=-3:  cur=max(-3, 1-3)=-2, best=1
i=3 x=4:   cur=max(4, -2+4)=4, best=4
i=4 x=-1:  cur=max(-1, 4-1)=3, best=4
i=5 x=2:   cur=max(2, 3+2)=5, best=5
i=6 x=1:   cur=max(1, 5+1)=6, best=6
i=7 x=-5:  cur=max(-5, 6-5)=1, best=6
i=8 x=4:   cur=max(4, 1+4)=5, best=6
```

Risultato: 6 (sottoarray `[4, -1, 2, 1]`).

O(n), O(1).

**Lezione (la più importante per DP)**: Kadane è "DP in 1 variabile". Lo stato `cur` rappresenta "miglior sottoarray che termina **esattamente** in `i`". Il `max` su tutti i `cur` è la risposta. Si chiama anche **DP ottimizzata in spazio**.
</details>

### Esercizio 2.8 — Longest Substring Without Repeating Characters <span class="problem-tag medium">MEDIUM</span>

<details><summary>Soluzione</summary>

Vedi snippet "longest_unique" sopra nel pattern sliding window. O(n).
</details>

### Esercizio 2.9 — Group Anagrams <span class="problem-tag medium">MEDIUM</span>

Raggruppa stringhe che sono anagrammi.

<details><summary>Ragionamento</summary>

**Idea**: due stringhe sono anagrammi sse hanno la stessa "fingerprint". Una fingerprint canonica è `sorted(s)`.

```python
from collections import defaultdict
def group_anagrams(strs):
    g = defaultdict(list)
    for s in strs:
        key = ''.join(sorted(s))
        g[key].append(s)
    return list(g.values())
```

Alternativa più veloce (alfabeto fisso): chiave = tupla di 26 contatori.

O(n · k log k) con sorted; O(n · k) con counter.
</details>

### Esercizio 2.10 — Longest Palindromic Substring <span class="problem-tag medium">MEDIUM</span>

Sottostringa palindroma più lunga.

<details><summary>Ragionamento — expand around center</summary>

**Brute force**: prova tutte le sottostringhe, controlla se palindroma. O(n³).

**Idea**: ogni palindromo ha un **centro**. Per ogni possibile centro, espandi verso fuori finché matchano.

Attenzione: due tipi di centro!

- Centro singolo (palindromo dispari): es. "aba", centro = 'b' a indice 1.
- Centro doppio (palindromo pari): es. "abba", centro tra indici 1 e 2.

```python
def longest_pal(s):
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l+1:r]   # ultimi indici validi

    best = ""
    for i in range(len(s)):
        odd = expand(i, i)
        even = expand(i, i+1)
        for cand in (odd, even):
            if len(cand) > len(best):
                best = cand
    return best
```

Ogni espansione è O(n), per O(n) centri → **O(n²)**.

Esiste anche **Manacher** in O(n), ma quasi mai chiesto.
</details>

### Esercizio 2.11 — Trapping Rain Water <span class="problem-tag hard">HARD</span>

Array di altezze, calcola quanta acqua si raccoglie tra le barre dopo la pioggia.

<details><summary>Ragionamento</summary>

**Insight chiave**: l'acqua sopra la posizione `i` è limitata da `min(max_a_sinistra, max_a_destra)`. Quindi:

```
acqua[i] = max(0, min(maxL[i], maxR[i]) - h[i])
```

**Versione O(n) spazio**: precomputa `maxL` e `maxR` con due passate. Poi una terza passata calcola la somma.

**Versione O(1) spazio (two pointers)**: l'idea è geniale. Tieni due variabili `lmax` e `rmax`. Muovi sempre il pointer dal lato con altezza minore. Perché?

Se `h[l] < h[r]`, allora `maxL` ad `l` è già `>= h[l]`. E `maxR` ad `l` è almeno `h[r] > h[l]`. Quindi il minimo dei due `max` è `lmax`. L'acqua sopra `l` è `lmax - h[l]`.

```python
def trap(h):
    l, r = 0, len(h) - 1
    lmax = rmax = 0
    water = 0
    while l < r:
        if h[l] < h[r]:
            lmax = max(lmax, h[l])
            water += lmax - h[l]
            l += 1
        else:
            rmax = max(rmax, h[r])
            water += rmax - h[r]
            r -= 1
    return water
```

O(n) tempo, O(1) spazio.

**Lezione**: problema "hard" per la non-ovvietà dell'invariante. Una volta visto, è molto pulito.
</details>

### Esercizio 2.12 — Rotate Image <span class="problem-tag medium">MEDIUM</span>

Matrice n×n. Ruotala di 90° in senso orario, in-place.

<details><summary>Ragionamento</summary>

Rotazione 90° = **trasponi** poi **inverti ogni riga**.

```python
def rotate(M):
    n = len(M)
    # Trasposta in-place
    for i in range(n):
        for j in range(i+1, n):
            M[i][j], M[j][i] = M[j][i], M[i][j]
    # Reverse ogni riga
    for row in M:
        row.reverse()
```

Verifica su 3×3:

| Iniziale | | | | Trasposta | | | | Reverse righe |
|--|--|--|--|--|--|--|--|--|
| 1 | 2 | 3 | → | 1 | 4 | 7 | → | 7 4 1 |
| 4 | 5 | 6 | | 2 | 5 | 8 | | 8 5 2 |
| 7 | 8 | 9 | | 3 | 6 | 9 | | 9 6 3 |

✓ Ruotata di 90° orario.

O(n²), O(1).
</details>

### Esercizio 2.13 — Spiral Matrix <span class="problem-tag medium">MEDIUM</span>

Stampa elementi di una matrice in ordine a spirale.

<details><summary>Soluzione</summary>

```python
def spiral(M):
    res = []
    top, bot = 0, len(M) - 1
    lef, rig = 0, len(M[0]) - 1
    while top <= bot and lef <= rig:
        for j in range(lef, rig + 1): res.append(M[top][j])
        top += 1
        for i in range(top, bot + 1): res.append(M[i][rig])
        rig -= 1
        if top <= bot:
            for j in range(rig, lef - 1, -1): res.append(M[bot][j])
            bot -= 1
        if lef <= rig:
            for i in range(bot, top - 1, -1): res.append(M[i][lef])
            lef += 1
    return res
```

Quattro layer "boundary". Ad ogni giro si stringono. Gli `if` finali evitano di processare due volte righe/colonne in matrici non quadrate.
</details>

### Esercizio 2.14 — Search Range in Sorted <span class="problem-tag medium">MEDIUM</span>

Array ordinato, trova prima e ultima posizione di un target. O(log n).

<details><summary>Soluzione</summary>

```python
from bisect import bisect_left, bisect_right
def search_range(arr, t):
    l = bisect_left(arr, t)
    r = bisect_right(arr, t) - 1
    if l <= r and l < len(arr) and arr[l] == t:
        return [l, r]
    return [-1, -1]
```

`bisect_left(arr, t)` = primo indice in cui inserire `t` mantenendo l'ordine = primo indice ≥ t. Vedi cap. 11 binary search per il dettaglio.
</details>

### Esercizio 2.15 — Median of Two Sorted Arrays <span class="problem-tag hard">HARD</span>

Due array ordinati, trova la mediana in O(log(min(n,m))).

<details><summary>Solo soluzione (è un problema da Hard "famoso")</summary>

Idea: binary search sull'array più corto, partiziona entrambi a metà.

```python
def find_median(a, b):
    if len(a) > len(b): a, b = b, a
    n, m = len(a), len(b)
    lo, hi = 0, n
    half = (n + m + 1) // 2
    while lo <= hi:
        i = (lo + hi) // 2
        j = half - i
        al = a[i-1] if i > 0 else float('-inf')
        ar = a[i]   if i < n else float('inf')
        bl = b[j-1] if j > 0 else float('-inf')
        br = b[j]   if j < m else float('inf')
        if al <= br and bl <= ar:
            if (n + m) % 2: return max(al, bl)
            return (max(al, bl) + min(ar, br)) / 2
        elif al > br: hi = i - 1
        else: lo = i + 1
```

Vale la pena conoscerlo, ma chiesto raramente.
</details>

## Riassunto del capitolo

1. **Array** = blocco contiguo, accesso O(1), insert/delete in mezzo O(n), append O(1) ammortizzato.
2. **Stringhe in Python sono immutabili** → concatenazione in loop è O(n²); usa `''.join(lista)`.
3. **Matrici**: attento all'aliasing `[[0]*m]*n` (sbagliato), usa list comprehension.
4. **5 pattern fondamentali**: two pointers, sliding window, prefix sum, hashmap, sort+scan.
5. **Trappole**: aliasing, modifica in iterazione, off-by-one, concatenazione stringhe, riferimento vs copia.

Quando hai padronanza di questo capitolo, dovresti riconoscere il pattern di qualsiasi problema su array in &lt; 60 secondi. Vai al [cap. 03 — Hashmap](03-hashmap-set.html).
