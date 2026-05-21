---
title: Two pointers e sliding window
area: Algoritmi
summary: I due pattern che trasformano O(n²) in O(n) sul 40% dei problemi medium. Spiegati dal nulla, con traccia di esecuzione cella per cella.
order: 12
---

# Two pointers e sliding window

Se padroneggi solo questi due pattern, hai già strumenti per **il 40% dei problemi medium** su array e stringhe. Sono semplici nell'idea ma sottili nei dettagli.

## Parte 1 — Perché esistono questi pattern

### Il problema fondamentale

Molti problemi su array sembrano richiedere di provare tutte le coppie/triplette. Esempi:

- "Trova due elementi che sommano a target" — sembra O(n²).
- "Trova la sottostringa più lunga con qualche proprietà" — sembra O(n²) o O(n³).
- "Conta sottoarray con somma esatta k" — sembra O(n²).

Brute force scorrendo tutte le combinazioni: O(n²) o peggio.

**Two pointers** e **sliding window** sono due tecniche che, sfruttando la **struttura** del problema, riducono a O(n) facendo "muovere" gli indici in modo coordinato.

### Quando "puoi" usarle

- Two pointers funziona quando **muovere uno dei pointer in una direzione monotona** è giustificato.
- Sliding window funziona quando puoi mantenere uno **stato** della finestra e **aggiornare lo stato in O(1)** entrando/uscendo.

Se non hai questa "monotonia" o "stato aggiornabile", non sono applicabili.

## Parte 2 — Two pointers in profondità

### Configurazione 1: estremi che collidono

I due pointer partono dai due capi opposti e si muovono verso il centro.

<div style="background:#161922;border:1px solid #262b3a;border-radius:8px;padding:16px;margin:14px 0;overflow-x:auto;">
<svg viewBox="0 0 380 100" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:auto;font-family:'Cascadia Code',monospace;">
  <defs>
    <style>
      .cell { fill:#1d2230; stroke:#262b3a; stroke-width:1; }
      .cell-l { fill:#6cf3; stroke:#6cf; stroke-width:2; }
      .cell-r { fill:#ff79c63; stroke:#ff79c6; stroke-width:2; }
      .ct { fill:#e6e8ee; font-size:14px; font-weight:600; }
    </style>
  </defs>
  <g transform="translate(15, 30)">
    <rect class="cell-l" x="0" y="0" width="40" height="40"/>
    <rect class="cell" x="40" y="0" width="40" height="40"/>
    <rect class="cell" x="80" y="0" width="40" height="40"/>
    <rect class="cell" x="120" y="0" width="40" height="40"/>
    <rect class="cell" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <rect class="cell" x="280" y="0" width="40" height="40"/>
    <rect class="cell-r" x="320" y="0" width="40" height="40"/>
    <text class="ct" x="20" y="25" text-anchor="middle">a</text>
    <text class="ct" x="60" y="25" text-anchor="middle">b</text>
    <text class="ct" x="100" y="25" text-anchor="middle">c</text>
    <text class="ct" x="140" y="25" text-anchor="middle">d</text>
    <text class="ct" x="180" y="25" text-anchor="middle">e</text>
    <text class="ct" x="220" y="25" text-anchor="middle">f</text>
    <text class="ct" x="260" y="25" text-anchor="middle">g</text>
    <text class="ct" x="300" y="25" text-anchor="middle">h</text>
    <text class="ct" x="340" y="25" text-anchor="middle">i</text>
    <text fill="#6cf" font-size="13" font-weight="700" x="20" y="60" text-anchor="middle">l →</text>
    <text fill="#ff79c6" font-size="13" font-weight="700" x="340" y="60" text-anchor="middle">← r</text>
  </g>
</svg>
</div>

Si muovono finché `l < r`.

**Quando usarla**:

- Array **ordinato**.
- Coppie/triplette con somma target.
- Palindromo check.
- Container with most water.

#### Esempio 1: Two Sum su array ordinato

```python
def two_sum_sorted(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        s = arr[l] + arr[r]
        if s == target:
            return [l, r]
        elif s < target:
            l += 1     # somma piccola → aumenta il sinistro (verso valori più alti)
        else:
            r -= 1     # somma grande → diminuisci il destro
```

**Perché funziona?** Sfruttiamo l'ordinamento. Se `s < target`, sappiamo che l'unico modo di aumentarla è muovere `l` a destra (`r` è già il massimo che hai). Mai indietro, mai duplicati. Ogni iterazione avanza un pointer → al massimo `n` iterazioni → O(n).

#### Esempio 2: Container With Most Water

`arr[i]` = altezza barra `i`. Scegli `i < j`: l'area è `(j-i) × min(arr[i], arr[j])`. Max area.

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

**Perché muovere il pointer "basso"?** Se muovo quello alto:

- Larghezza diminuisce.
- Altezza minima rimane limitata dal pointer basso (quindi al massimo uguale).

→ Area può solo diminuire. Inutile.

Se muovo quello basso:

- Larghezza diminuisce.
- Altezza minima **potrebbe** aumentare (se incontro barra più alta).

→ C'è speranza.

**Lezione**: l'analisi "quale pointer muovere e perché" è il cuore dei two pointers. Sempre giustificalo.

### Configurazione 2: stesso verso (slow/fast)

Entrambi i pointer partono da sinistra e avanzano. `slow` "scrive", `fast` "esplora".

<div style="background:#161922;border:1px solid #262b3a;border-radius:8px;padding:16px;margin:14px 0;overflow-x:auto;">
<svg viewBox="0 0 360 90" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:auto;font-family:'Cascadia Code',monospace;">
  <defs>
    <style>
      .cell { fill:#1d2230; stroke:#262b3a; stroke-width:1; }
      .cell-slow { fill:#50fa7b33; stroke:#50fa7b; stroke-width:2; }
      .cell-fast { fill:#ffb86c33; stroke:#ffb86c; stroke-width:2; }
      .ct { fill:#e6e8ee; font-size:14px; font-weight:600; }
    </style>
  </defs>
  <g transform="translate(15, 15)">
    <rect class="cell-slow" x="0" y="0" width="40" height="40"/>
    <rect class="cell" x="40" y="0" width="40" height="40"/>
    <rect class="cell-fast" x="80" y="0" width="40" height="40"/>
    <rect class="cell" x="120" y="0" width="40" height="40"/>
    <rect class="cell" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <text class="ct" x="20" y="25" text-anchor="middle">a</text>
    <text class="ct" x="60" y="25" text-anchor="middle">b</text>
    <text class="ct" x="100" y="25" text-anchor="middle">c</text>
    <text class="ct" x="140" y="25" text-anchor="middle">d</text>
    <text class="ct" x="180" y="25" text-anchor="middle">e</text>
    <text class="ct" x="220" y="25" text-anchor="middle">f</text>
    <text class="ct" x="260" y="25" text-anchor="middle">g</text>
    <text fill="#50fa7b" font-size="12" font-weight="700" x="20" y="60" text-anchor="middle">slow</text>
    <text fill="#ffb86c" font-size="12" font-weight="700" x="100" y="60" text-anchor="middle">fast</text>
  </g>
</svg>
</div>

**Quando**:

- Remove duplicates in-place.
- Move zeros / partition.

#### Esempio: Remove Duplicates (array ordinato)

```python
def remove_duplicates(arr):
    if not arr: return 0
    w = 1   # write pointer (slow)
    for r in range(1, len(arr)):
        if arr[r] != arr[r-1]:
            arr[w] = arr[r]
            w += 1
    return w   # nuova lunghezza
```

Trace su `[1, 1, 2, 3, 3, 4]`:

```
r=1 arr[r]=1, prev=1, uguale → skip. arr=[1,1,2,3,3,4], w=1
r=2 arr[r]=2, prev=1, diverso → arr[1]=2, w=2. arr=[1,2,2,3,3,4]
r=3 arr[r]=3, prev=2, diverso → arr[2]=3, w=3. arr=[1,2,3,3,3,4]
r=4 arr[r]=3, prev=3, uguale → skip.
r=5 arr[r]=4, prev=3, diverso → arr[3]=4, w=4. arr=[1,2,3,4,3,4]
```

Risultato: lunghezza 4, primi 4 elementi sono `[1, 2, 3, 4]`. ✓

### Configurazione 3: due array in parallelo

Due indici, uno per ciascun array. Tipico nei merge.

```python
def merge_sorted(a, b):
    out = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i])
            i += 1
        else:
            out.append(b[j])
            j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out
```

Ogni iterazione avanza uno dei due pointer → O(n + m).

## Parte 3 — Sliding window in profondità

### L'idea visualizzata

Una finestra `[l, r]` scorre sull'array. Mantieni uno **stato** (es. somma, conteggio caratteri, dizionario).

Cresci a destra (`r++`), aggiorni stato.

Se invariante violato, contrai a sinistra (`l++`), aggiorni stato.

<div style="background:#161922;border:1px solid #262b3a;border-radius:8px;padding:18px;margin:16px 0;overflow-x:auto;">
<svg viewBox="0 0 540 240" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:auto;font-family:'Cascadia Code',monospace;">
  <defs>
    <style>
      .cell { fill:#1d2230; stroke:#262b3a; stroke-width:1; }
      .cell-win { fill:#1d3a5c; stroke:#6cf; stroke-width:2; }
      .cell-text { fill:#e6e8ee; font-size:14px; font-weight:600; }
      .ptr { fill:#ffb86c; font-size:12px; font-weight:700; }
      .step-label { fill:#7a8194; font-size:12px; }
    </style>
  </defs>
  <!-- Step 1: window [1..3] -->
  <text class="step-label" x="10" y="22">Step 1: finestra [l=1, r=3]</text>
  <g transform="translate(10, 35)">
    <rect class="cell" x="0"   y="0" width="40" height="40"/>
    <rect class="cell-win" x="40"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="80"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="120" y="0" width="40" height="40"/>
    <rect class="cell" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <text class="cell-text" x="20"  y="25" text-anchor="middle">a</text>
    <text class="cell-text" x="60"  y="25" text-anchor="middle">b</text>
    <text class="cell-text" x="100" y="25" text-anchor="middle">c</text>
    <text class="cell-text" x="140" y="25" text-anchor="middle">d</text>
    <text class="cell-text" x="180" y="25" text-anchor="middle">e</text>
    <text class="cell-text" x="220" y="25" text-anchor="middle">f</text>
    <text class="cell-text" x="260" y="25" text-anchor="middle">g</text>
    <text class="ptr" x="60"  y="60" text-anchor="middle">l</text>
    <text class="ptr" x="140" y="60" text-anchor="middle">r</text>
  </g>
  <!-- Step 2: r avanza -->
  <text class="step-label" x="10" y="105">Step 2: r avanza → finestra cresce</text>
  <g transform="translate(10, 118)">
    <rect class="cell" x="0"   y="0" width="40" height="40"/>
    <rect class="cell-win" x="40"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="80"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="120" y="0" width="40" height="40"/>
    <rect class="cell-win" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <text class="cell-text" x="20"  y="25" text-anchor="middle">a</text>
    <text class="cell-text" x="60"  y="25" text-anchor="middle">b</text>
    <text class="cell-text" x="100" y="25" text-anchor="middle">c</text>
    <text class="cell-text" x="140" y="25" text-anchor="middle">d</text>
    <text class="cell-text" x="180" y="25" text-anchor="middle">e</text>
    <text class="cell-text" x="220" y="25" text-anchor="middle">f</text>
    <text class="cell-text" x="260" y="25" text-anchor="middle">g</text>
    <text class="ptr" x="60"  y="60" text-anchor="middle">l</text>
    <text class="ptr" x="180" y="60" text-anchor="middle">r</text>
  </g>
  <!-- Step 3: l avanza -->
  <text class="step-label" x="10" y="188">Step 3: invariante violata → l avanza, finestra contrae</text>
  <g transform="translate(10, 201)">
    <rect class="cell" x="0"   y="0" width="40" height="40"/>
    <rect class="cell" x="40"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="80"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="120" y="0" width="40" height="40"/>
    <rect class="cell-win" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <text class="cell-text" x="20"  y="25" text-anchor="middle">a</text>
    <text class="cell-text" x="60"  y="25" text-anchor="middle">b</text>
    <text class="cell-text" x="100" y="25" text-anchor="middle">c</text>
    <text class="cell-text" x="140" y="25" text-anchor="middle">d</text>
    <text class="cell-text" x="180" y="25" text-anchor="middle">e</text>
    <text class="cell-text" x="220" y="25" text-anchor="middle">f</text>
    <text class="cell-text" x="260" y="25" text-anchor="middle">g</text>
    <text class="ptr" x="100" y="60" text-anchor="middle">l</text>
    <text class="ptr" x="180" y="60" text-anchor="middle">r</text>
  </g>
</svg>
</div>

### Template universale

```python
def sliding_window(arr):
    l = 0
    stato = init_stato()
    best = init_best()
    for r in range(len(arr)):
        # 1. INCLUDI arr[r] nella finestra (aggiorna stato)
        update_add(stato, arr[r])
        # 2. Mentre l'invariante è violato, CONTRAI a sinistra
        while not valido(stato):
            update_remove(stato, arr[l])
            l += 1
        # 3. Ora arr[l..r] è valida; aggiorna best
        best = improve(best, l, r, stato)
    return best
```

### Complessità

**Sempre O(n)**. Anche se sembra un "while dentro un for", entrambi i pointer si muovono solo a destra, al massimo `n` mosse ciascuno → 2n totali.

### Tipi di sliding window

#### Tipo A: fixed-size window

La finestra ha sempre dimensione `k`.

```python
def max_sum_k(arr, k):
    s = sum(arr[:k])    # somma iniziale
    best = s
    for r in range(k, len(arr)):
        s += arr[r] - arr[r-k]   # entra arr[r], esce arr[r-k]
        best = max(best, s)
    return best
```

#### Tipo B: variable-size "longest with constraint"

Espandi a destra. Quando l'invariante è violato, contrai a sinistra finché torna valido.

Esempio: lunghezza massima con al massimo k caratteri distinti.

```python
from collections import defaultdict
def longest_k_distinct(s, k):
    cnt = defaultdict(int)
    l = 0
    best = 0
    for r, c in enumerate(s):
        cnt[c] += 1
        while len(cnt) > k:   # invariante violata
            cnt[s[l]] -= 1
            if cnt[s[l]] == 0:
                del cnt[s[l]]
            l += 1
        best = max(best, r - l + 1)
    return best
```

Trace su `s = "abaccc"`, `k = 2`:

```
r=0 c='a': cnt={a:1}, distinti=1 ≤ 2 ok. best=1 (window [0,0])
r=1 c='b': cnt={a:1,b:1}, distinti=2 ok. best=2 (window [0,1])
r=2 c='a': cnt={a:2,b:1}. best=3 (window [0,2])
r=3 c='c': cnt={a:2,b:1,c:1}, distinti=3 > 2. Contrai:
    rimuovi arr[0]='a': cnt={a:1,b:1,c:1}, ancora 3. l=1.
    rimuovi arr[1]='b': cnt={a:1,c:1}, distinti=2. l=2.
    Ora window [2,3]="ac". best=3.
r=4 c='c': cnt={a:1,c:2}. best=3 (window [2,4]="acc")
r=5 c='c': cnt={a:1,c:3}. best=4 (window [2,5]="accc")
```

Risultato: 4.

#### Tipo C: variable-size "shortest covering"

Espandi finché matchi tutto. Poi contrai finché puoi senza perdere copertura.

Esempio: Minimum Window Substring (vedi sotto).

## Parte 4 — Differenza pratica: two pointers vs sliding window

| Caratteristica | Sliding window | Two pointers |
|---|---|---|
| Tipica struttura | sottoarray/substring contiguo | array spesso ordinato |
| "Più lungo/più corto contiene X" | sì | raro |
| "Coppia/tripla con somma" | raro | sì |
| Stato (Counter, set, sum) | quasi sempre | a volte |
| Movimento | r monotono, l monotono | possono muoversi entrambi |

Sliding window è **caso speciale** di two pointers. Ma utile distinguerli mentalmente.

## Parte 5 — Esercizi guidati

### Esercizio 12.1 — Two Sum II (sorted) <span class="problem-tag medium">MEDIUM</span>

Vedi parte 2.

### Esercizio 12.2 — Valid Palindrome <span class="problem-tag easy">EASY</span>

<details><summary>Soluzione</summary>

```python
def is_pal(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while l < r and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower(): return False
        l += 1; r -= 1
    return True
```

Two pointers ai bordi, skip non-alfanumerici.
</details>

### Esercizio 12.3 — Remove Duplicates <span class="problem-tag easy">EASY</span>

Vedi parte 2.

### Esercizio 12.4 — Squares of Sorted Array <span class="problem-tag easy">EASY</span>

Array ordinato (può contenere negativi). Restituisci array dei quadrati ordinato. O(n).

<details><summary>Ragionamento</summary>

Il quadrato del più grande in valore assoluto è il **massimo**. Due pointer ai bordi: confronta `|arr[l]|` e `|arr[r]|`, prendi il maggiore, posiziona dal fondo del risultato.

```python
def sorted_squares(arr):
    n = len(arr)
    res = [0] * n
    l, r = 0, n - 1
    w = n - 1
    while l <= r:
        if abs(arr[l]) > abs(arr[r]):
            res[w] = arr[l] * arr[l]
            l += 1
        else:
            res[w] = arr[r] * arr[r]
            r -= 1
        w -= 1
    return res
```

Riempi da fondo a inizio. O(n).
</details>

### Esercizio 12.5 — Max Average Subarray Length K <span class="problem-tag easy">EASY</span>

<details><summary>Soluzione</summary>

Fixed-size window:

```python
def find_max_average(arr, k):
    s = sum(arr[:k])
    best = s
    for r in range(k, len(arr)):
        s += arr[r] - arr[r-k]
        best = max(best, s)
    return best / k
```
</details>

### Esercizio 12.6 — Longest Substring Without Repeating Characters <span class="problem-tag medium">MEDIUM</span>

<details><summary>Soluzione</summary>

```python
def longest_unique(s):
    last = {}
    l = 0; best = 0
    for r, c in enumerate(s):
        if c in last and last[c] >= l:
            l = last[c] + 1
        last[c] = r
        best = max(best, r - l + 1)
    return best
```

Sliding window. Quando vedo un duplicato dentro la finestra, salto `l` subito dopo l'ultima posizione del duplicato.
</details>

### Esercizio 12.7 — Longest Repeating Character Replacement <span class="problem-tag medium">MEDIUM</span>

Stringa s + intero k. Puoi sostituire al massimo k caratteri. Sottostringa più lunga con tutte stesse lettere.

<details><summary>Ragionamento</summary>

Una finestra è valida se `(lunghezza - frequenza_carattere_più_comune) ≤ k`. Cioè: il numero di "sostituzioni" necessarie è quanti caratteri non sono quello dominante.

```python
def longest_repeat(s, k):
    cnt = {}
    max_f = 0
    l = 0; best = 0
    for r, c in enumerate(s):
        cnt[c] = cnt.get(c, 0) + 1
        max_f = max(max_f, cnt[c])
        if (r - l + 1) - max_f > k:
            cnt[s[l]] -= 1
            l += 1
        best = max(best, r - l + 1)
    return best
```

**Sottile**: `max_f` non viene decrementato quando contrai. È OK perché il `best` finale dipende da finestre dove `max_f` era effettivamente il massimo. Non c'è bisogno di un valore "preciso", solo del massimo storico.
</details>

### Esercizio 12.8 — Permutation in String <span class="problem-tag medium">MEDIUM</span>

`s2` contiene una permutazione di `s1`?

<details><summary>Soluzione</summary>

Fixed-size window di lunghezza `|s1|` su `s2`, confronta Counter.

```python
from collections import Counter
def check_inclusion(s1, s2):
    if len(s1) > len(s2): return False
    c1 = Counter(s1)
    c2 = Counter(s2[:len(s1)])
    if c1 == c2: return True
    for i in range(len(s1), len(s2)):
        c2[s2[i]] += 1
        c2[s2[i-len(s1)]] -= 1
        if c2[s2[i-len(s1)]] == 0:
            del c2[s2[i-len(s1)]]
        if c1 == c2: return True
    return False
```
</details>

### Esercizio 12.9 — Minimum Window Substring <span class="problem-tag hard">HARD</span>

Sottostringa più corta di `s` che contiene tutti i caratteri di `t` (con molteplicità).

<details><summary>Ragionamento</summary>

Sliding window "shortest covering":

1. `need = Counter(t)`: caratteri richiesti.
2. `have`: caratteri attualmente nella finestra.
3. `missing`: quanti caratteri mancano per coprire `t` (contando molteplicità).

Espandi a destra: ogni char "utile" decrementa `missing`. Quando `missing == 0`, finestra valida → prova a contrarre.

```python
from collections import Counter
def min_window(s, t):
    need = Counter(t)
    have = {}
    missing = len(t)
    l = 0
    best = (float('inf'), 0, 0)
    for r, c in enumerate(s):
        if need.get(c, 0) > 0:
            if have.get(c, 0) < need[c]:
                missing -= 1
        have[c] = have.get(c, 0) + 1
        while missing == 0:
            if r - l + 1 < best[0]:
                best = (r - l + 1, l, r)
            have[s[l]] -= 1
            if need.get(s[l], 0) > 0 and have[s[l]] < need[s[l]]:
                missing += 1
            l += 1
    return "" if best[0] == float('inf') else s[best[1]:best[2]+1]
```

O(n+m). Una delle domande più chieste (Meta, Google).
</details>

### Esercizio 12.10 — Sliding Window Maximum <span class="problem-tag hard">HARD</span>

Massimo in ogni finestra di lunghezza k, in O(n).

<details><summary>Ragionamento</summary>

**Brute force**: per ogni finestra, max in O(k). Totale O(nk).

**Idea (deque monotona)**: tieni una **deque** di indici in ordine decrescente di valore. La testa è sempre il max della finestra.

Quando entra un nuovo elemento `arr[r]`:

- Rimuovi dalla coda tutti gli indici i cui valori sono **minori** di `arr[r]` (non saranno mai più il max).
- Push `r`.

Quando la finestra avanza (`r >= k`):

- Se la testa è fuori dalla finestra (`dq[0] <= r - k`), rimuovila.
- Output `arr[dq[0]]`.

```python
from collections import deque
def max_sliding_window(arr, k):
    dq = deque()   # indici in ordine decrescente di valore
    res = []
    for i, x in enumerate(arr):
        while dq and arr[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(arr[dq[0]])
    return res
```

**Lezione**: la "deque monotona" è una variante avanzata di sliding window. Garantisce O(n) anche per problemi che sembrano richiedere O(nk).
</details>

### Esercizio 12.11 — Fruit Into Baskets <span class="problem-tag medium">MEDIUM</span>

Array di tipi di frutti. Hai 2 cestini (1 tipo per cestino). Max quantità raccoglibile.

<details><summary>Soluzione</summary>

Riconducibile a "sottostringa più lunga con al più 2 caratteri distinti". Vedi esercizio 3.9.
</details>

### Esercizio 12.12 — Subarrays with K Different Integers <span class="problem-tag hard">HARD</span>

Conta sottoarray con esattamente k interi distinti.

<details><summary>Ragionamento (importante)</summary>

**Problema**: "esattamente k distinct" è hard direttamente. Ma:

`exactly(k) = atMost(k) - atMost(k-1)`

Cioè: sottoarray con al più k distinct meno quelli con al più k-1 distinct = quelli con esattamente k.

`atMost(k)` è sliding window classico.

```python
def subarrays_k_distinct(arr, k):
    def at_most(k):
        cnt = {}
        l = res = 0
        for r, x in enumerate(arr):
            cnt[x] = cnt.get(x, 0) + 1
            while len(cnt) > k:
                cnt[arr[l]] -= 1
                if cnt[arr[l]] == 0:
                    del cnt[arr[l]]
                l += 1
            res += r - l + 1   # tutti i sottoarray che finiscono in r
        return res
    return at_most(k) - at_most(k - 1)
```

**Tecnica preziosissima**: "esattamente X" = "atMost(X) - atMost(X-1)". Si riutilizza in tantissimi problemi.

**Perché `res += r - l + 1`**? Il numero di sottoarray validi che terminano in `r` è `r - l + 1` (tutti quelli con left ∈ [l, r]).
</details>

## Riassunto del capitolo

1. **Two pointers**: due indici coordinati. Funziona se hai monotonia/ordinamento.
2. **Sliding window**: finestra `[l, r]`. Espandi a destra, contrai a sinistra quando invariante violato.
3. **Sempre giustifica "perché muovo questo pointer"**. È il cuore della tecnica.
4. **Stato della finestra**: Counter, dict, sum, set. Aggiornabile in O(1) entrando/uscendo.
5. **3 tipi di window**: fixed-size, longest, shortest covering.
6. **Trucchi avanzati**: deque monotona (O(n) per max in finestra), "exactly = atMost(k) - atMost(k-1)".

Quando questi due pattern ti vengono automatici, gran parte dei problemi "facili" diventano davvero facili.
