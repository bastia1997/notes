---
title: Bit manipulation
area: Algoritmi
summary: Dal binario alla manipolazione dei bit. AND/OR/XOR spiegati con esempi, trucchi classici, XOR magic, bitmask DP.
order: 15
---

# Bit manipulation

Capitolo veloce ma fondamentale. Nei colloqui non è quasi mai il fulcro, ma compare in problemi come "single number", "subset enumeration", "bitmask DP". Saperlo ti distingue.

## Parte 1 — Numero binario

### Cifre, ma in base 2

Sappiamo contare in base 10: 487 = 4×100 + 8×10 + 7×1.

In base 2, le cifre sono solo 0 e 1, e i "pesi" sono potenze di 2:

`1101` (binario) = 1×8 + 1×4 + 0×2 + 1×1 = **13** (decimale).

In Python:
```python
bin(13)        # '0b1101'
int('1101', 2) # 13
0b1101         # 13 (letterale binario)
```

### Bit, byte, word

- **Bit**: 0 o 1.
- **Byte**: 8 bit. Può rappresentare 256 valori (0-255 unsigned, -128..127 signed).
- **Word**: tipicamente 32 o 64 bit. Dimensione "naturale" del processore.

### Numeri negativi: complemento a due

Un numero negativo in binario si rappresenta col **complemento a 2**: inverti i bit e somma 1.

```
+5 (8 bit): 00000101
-5 (8 bit): 11111011   (inversione di 00000101 = 11111010, +1 = 11111011)
```

Vantaggio: l'hardware fa la somma normale, e `+5 + (-5) = 0`.

In Python interi sono illimitati, quindi i bit negativi sono "concettualmente infiniti". Per operazioni bit a 32 bit puoi usare maschere: `x & 0xFFFFFFFF`.

## Parte 2 — Gli operatori

### AND `&`

Bit a bit: 1 se entrambi 1, altrimenti 0.

```
0b1100
0b1010 &
------
0b1000
```

Uso: **mascherare** bit (selezionare).

### OR `|`

Bit a bit: 1 se almeno uno è 1.

```
0b1100
0b1010 |
------
0b1110
```

Uso: **settare** bit.

### XOR `^`

Bit a bit: 1 se i due bit sono **diversi**.

```
0b1100
0b1010 ^
------
0b0110
```

Proprietà chiave:

- `a ^ 0 = a`
- `a ^ a = 0`
- `a ^ b ^ a = b` (commutativo e associativo)

XOR si usa per: cancellare un valore, swap, parità, single number.

### NOT `~`

Inverte ogni bit. In Python: `~a = -a - 1` (per via del complemento a 2).

```python
~5    # -6
~(-5) # 4
```

In colloquio raro.

### Shift `<<` `>>`

`a << k` = sposta a sinistra di k posizioni = `a × 2^k`.

`a >> k` = sposta a destra = `a // 2^k`.

```python
1 << 5    # 32 (= 2^5)
8 >> 2    # 2  (= 8 // 4)
```

Velocissimi: una singola istruzione macchina.

## Parte 3 — Trucchi che devi memorizzare

### 1. Verifica se `x` è potenza di 2

```python
x > 0 and (x & (x - 1)) == 0
```

**Perché?** Una potenza di 2 in binario ha **un solo bit a 1** (es. 8 = `1000`). `x - 1` lo sposta a destra trasformando in `0111`. AND tra `1000` e `0111` = 0.

### 2. Conta i bit a 1 (popcount)

Tre versioni:

```python
# Versione 1: bin string
bin(x).count('1')

# Versione 2: Brian Kernighan
def count(x):
    c = 0
    while x:
        x &= x - 1   # rimuove l'ultimo bit a 1
        c += 1
    return c

# Versione 3: Python 3.10+
x.bit_count()
```

Brian Kernighan è geniale: `x & (x-1)` rimuove **l'ultimo bit settato**. Quindi loopi una volta per ogni bit a 1, non per ogni bit totale.

### 3. Estrai l'ultimo bit a 1

```python
x & -x
```

Esempio: `x = 0b1100`. `-x` in complemento a 2 (8 bit) = `0b...11110100`. AND = `0b0100`. Sopravvive solo il bit più basso di `x`.

Usato in: Fenwick tree (BIT).

### 4. Set/clear/toggle/test del bit `i`-esimo

```python
x | (1 << i)     # set bit i
x & ~(1 << i)    # clear bit i
x ^ (1 << i)     # toggle bit i
(x >> i) & 1     # test bit i (ritorna 0 o 1)
```

### 5. Verifica parità

```python
x & 1   # 1 se dispari, 0 se pari
```

### 6. Swap senza variabile temp

```python
a ^= b
b ^= a
a ^= b
```

Trick "stupido" — non usarlo in codice reale. Ma chi te lo chiede in colloquio si aspetta che lo sappia.

## Parte 4 — XOR magic

XOR è il preferito dei colloqui per trucchi geniali.

### Pattern 1 — Single Number

> In un array, ogni elemento appare 2 volte tranne uno. Trova quello unico.

```python
def single_number(arr):
    res = 0
    for x in arr:
        res ^= x
    return res
```

**Perché funziona?** XOR è commutativo e associativo. `a ^ a = 0`, `0 ^ x = x`. Quindi tutti i doppioni si cancellano, rimane il singolo.

### Pattern 2 — Find Missing

> Array di n distinct in `[0..n]`, trova il mancante.

```python
def missing(nums):
    res = len(nums)   # n
    for i, x in enumerate(nums):
        res ^= i ^ x
    return res
```

**Perché?** XOR di tutto `0..n` con tutti i presenti `nums` lascia solo il mancante (perché tutti i presenti hanno il loro corrispondente in `0..n` che si cancella).

### Pattern 3 — Find Two Single Numbers

> Array dove tutti appaiono 2 volte tranne due. Trova entrambi.

XOR di tutto = `a ^ b` (i due unici). Ora trova un bit dove differiscono (es. l'ultimo bit set di `a^b`). Splitta l'array in due gruppi (quel bit è 0 o 1). XOR di ciascun gruppo dà uno dei due.

```python
def two_singles(arr):
    xor = 0
    for x in arr: xor ^= x
    diff = xor & -xor   # ultimo bit settato
    a = b = 0
    for x in arr:
        if x & diff: a ^= x
        else: b ^= x
    return [a, b]
```

## Parte 5 — Bitmask: rappresentare set come interi

### L'idea

Un intero a `n` bit può rappresentare un sottoinsieme di `n` elementi: il bit `i`-esimo è 1 se l'elemento `i` è nel sottoinsieme.

Esempio: per 4 elementi `{A, B, C, D}`, la maschera `0b1010` = `{B, D}`.

### Operazioni

```python
mask | (1 << i)   # aggiungi elemento i
mask & ~(1 << i)  # rimuovi
(mask >> i) & 1   # è presente?
mask ^ (1 << i)   # toggle
```

### Enumerare tutti i sottoinsiemi

```python
n = len(arr)
for mask in range(1 << n):
    subset = [arr[i] for i in range(n) if (mask >> i) & 1]
    process(subset)
```

`1 << n` = `2^n`. Iteri da 0 (vuoto) a `2^n - 1` (tutto). Ogni mask rappresenta un sottoinsieme.

**Solo per `n ≤ 20-25`**. Per `n=30`, `2^30 = 10^9` iterazioni → troppo.

### Bitmask DP

Stato include una maschera di "cosa è stato visitato". Esempio classico: **Traveling Salesman Problem**.

```python
def tsp(dist):
    n = len(dist)
    INF = float('inf')
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0   # parto da 0, ho visitato solo 0
    for mask in range(1, 1 << n):
        for u in range(n):
            if not (mask >> u) & 1: continue
            for v in range(n):
                if (mask >> v) & 1: continue
                new_mask = mask | (1 << v)
                dp[new_mask][v] = min(dp[new_mask][v], dp[mask][u] + dist[u][v])
    return min(dp[(1 << n) - 1][u] + dist[u][0] for u in range(1, n))
```

O(2^n × n^2). Per n=20: ~10^9 op. Borderline.

## Parte 6 — Trappole

### 1. Python interi infiniti

A differenza di C/Java, Python non ha overflow. `1 << 100` funziona. Per simulare 32-bit, usa maschere `x & 0xFFFFFFFF`.

### 2. Confusione AND vs &&

In Python `and` è logico (boolean), `&` è bit-a-bit. Non confonderli.

```python
1 and 2   # 2 (logico, ritorna l'ultimo truthy)
1 & 2     # 0 (bit-a-bit, 01 & 10 = 00)
```

### 3. Precedenza degli operatori

`&`, `|`, `^` hanno **precedenza più bassa** del `==`. Servono parentesi.

```python
x & 1 == 0   # SBAGLIATO: x & (1 == 0) = x & False = 0
(x & 1) == 0 # CORRETTO
```

### 4. Shift di numeri grandi

`1 << 1000` funziona in Python ma occupa memoria. In C/Java è UB (undefined behavior). Attenzione se traduci.

## Parte 7 — Esercizi

### Esercizio 15.1 — Single Number <span class="problem-tag easy">EASY</span>

Vedi parte 4.

### Esercizio 15.2 — Number of 1 Bits <span class="problem-tag easy">EASY</span>

Vedi parte 3 trucco 2.

### Esercizio 15.3 — Counting Bits <span class="problem-tag easy">EASY</span>

Per ogni `i ∈ [0..n]`, conta i bit a 1.

<details><summary>Ragionamento</summary>

DP geniale: `dp[i] = dp[i >> 1] + (i & 1)`.

Perché? Il numero di bit di `i` è quello di `i >> 1` (= `i // 2`) più 1 se l'ultimo bit di `i` è 1.

```python
def counting_bits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp
```

O(n).
</details>

### Esercizio 15.4 — Missing Number <span class="problem-tag easy">EASY</span>

Vedi parte 4 pattern 2.

### Esercizio 15.5 — Reverse Bits <span class="problem-tag easy">EASY</span>

Reverse di un intero a 32 bit.

<details><summary>Soluzione</summary>

```python
def reverse_bits(x):
    res = 0
    for _ in range(32):
        res = (res << 1) | (x & 1)
        x >>= 1
    return res
```

Idea: shift result a sinistra, prendi l'ultimo bit di x, shift x a destra. Ripeti 32 volte.
</details>

### Esercizio 15.6 — Sum of Two Integers <span class="problem-tag medium">MEDIUM</span>

Somma senza usare `+` o `-`.

<details><summary>Ragionamento</summary>

Sum senza carry = XOR. Carry = AND seguito da shift sinistro.

```python
a ^ b           # somma senza considerare carry
(a & b) << 1    # bit di carry generati
```

Ripeti finché il carry è 0.

In Python, con interi illimitati, dovrai mascherare a 32 bit:

```python
def sum_no_plus(a, b):
    MASK = 0xFFFFFFFF
    MAX = 0x7FFFFFFF
    while b:
        carry = (a & b) << 1
        a = (a ^ b) & MASK
        b = carry & MASK
    return a if a <= MAX else ~(a ^ MASK)
```

Complesso per i negativi in Python.
</details>

### Esercizio 15.7 — Single Number II <span class="problem-tag medium">MEDIUM</span>

Tutti appaiono 3 volte tranne uno. Trovalo.

<details><summary>Idea</summary>

Conta i bit modulo 3 ad ogni posizione. I bit del numero unico sono "il resto mod 3" della somma.

```python
def single_three(arr):
    res = 0
    for i in range(32):
        bit_sum = sum((x >> i) & 1 for x in arr) % 3
        res |= bit_sum << i
    return res if res < (1 << 31) else res - (1 << 32)
```

O(32n).

C'è anche una versione "stato a due bit" più elegante ma più criptica.
</details>

### Esercizio 15.8 — Subsets via Bitmask <span class="problem-tag medium">MEDIUM</span>

Tutti i sottoinsiemi di un array di n elementi (n piccolo).

<details><summary>Soluzione</summary>

```python
def subsets(arr):
    n = len(arr)
    res = []
    for mask in range(1 << n):
        sub = [arr[i] for i in range(n) if (mask >> i) & 1]
        res.append(sub)
    return res
```

`2^n` sottoinsiemi totali.
</details>

## Riassunto

1. **Operatori bit**: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (shift sinistra), `>>` (destra).
2. **Trucchi da memoria**: `x & (x-1)` rimuove ultimo bit, `x & -x` estrae ultimo bit settato, `x & 1` parità.
3. **XOR magic**: `a^a=0`, `a^0=a`. Risolvi "single number" senza extra spazio.
4. **Bitmask**: rappresenta sottoinsiemi come interi. Per `n ≤ 20`.
5. **Bitmask DP**: stato include la maschera di "cosa è stato già usato". TSP.

Bit manipulation è una "tassa" da pagare una volta: poi torna utile spesso.
