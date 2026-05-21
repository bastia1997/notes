---
title: Stack e coda
auto: stack e coda
area: Strutture dati
summary: LIFO e FIFO da zero. Monotonic stack visualizzato (il superpotere per "next greater"), deque per sliding window O(n).
order: 5
---

# Stack e coda

Stack e coda sono strutture semplicissime in apparenza. Ma una loro variante — il **monotonic stack** — è uno dei trucchi più devastanti dei colloqui FAANG. Dedichiamogli il tempo che merita.

## Parte 1 — Stack (LIFO)

### L'analogia: pila di piatti

Pensa a una pila di piatti su un tavolo. Le operazioni naturali sono:

- **Push**: aggiungi un piatto in cima.
- **Pop**: prendi il piatto in cima.
- **Peek**: guarda il piatto in cima senza prenderlo.

L'**ultimo** piatto che hai messo è il **primo** che togli. **LIFO** (Last In, First Out).

### Stack in Python

Usa una `list`:

```python
st = []
st.append(x)        # push, O(1) ammortizzato
x = st.pop()        # pop, O(1)
top = st[-1]        # peek
len(st) == 0        # empty?
```

### Quando usarlo

Lo stack è la struttura giusta quando devi **ricordare cosa è ancora "aperto"** e processarlo in ordine LIFO.

- **Matching di parentesi**: ogni `(` aperto va su una pila. Quando arriva `)`, deve corrispondere all'ultimo aperto.
- **DFS iterativo** (vedi cap. 06, 08).
- **Undo/redo**: l'ultima azione si annulla per prima.
- **Evaluation di espressioni postfix**.
- **Function call stack**: il computer stesso usa uno stack per le chiamate di funzione.
- **Monotonic stack** (la parte succosa, sotto).

### Esempio: parentesi bilanciate

```python
def valid_parens(s):
    st = []
    pair = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in '([{':
            st.append(c)
        elif c in ')]}':
            if not st or st.pop() != pair[c]:
                return False
    return not st   # alla fine lo stack deve essere vuoto
```

Trace su `"({[]})"`:

```
'(': push → ['(']
'{': push → ['(', '{']
'[': push → ['(', '{', '[']
']': pop '[', match con ']' → ['(', '{']
'}': pop '{', match → ['(']
')': pop '(', match → []
fine, stack vuoto → True
```

Trace su `"([)]"`:

```
'(': push → ['(']
'[': push → ['(', '[']
')': pop '[', MA il match di ')' è '(', non '[' → False
```

## Parte 2 — Coda (FIFO)

### L'analogia: la fila al supermercato

Il primo che si mette in fila è il primo servito. **FIFO** (First In, First Out).

```
Entra → [ A, B, C, D ] → Esce (A esce per primo)
```

### Implementazione in Python

**Non usare `list` come coda**. `list.pop(0)` è O(n) (deve shiftare tutti gli elementi). Usa `collections.deque`:

```python
from collections import deque
q = deque()
q.append(x)         # enqueue, O(1)
x = q.popleft()     # dequeue, O(1)
q.appendleft(x)     # push in testa
q.pop()             # rimuovi dalla fine
front = q[0]; back = q[-1]
```

### Quando usarla

- **BFS**: lo abbiamo già visto nei capitoli alberi e grafi.
- **Producer/Consumer**.
- **Round-robin scheduling**.
- **Sliding window max** con deque monotona (cap. 12).

## Parte 3 — Deque (double-ended queue)

`collections.deque` di Python supporta push/pop in **O(1) a entrambe le estremità**. È simultaneamente uno stack e una coda.

```python
dq = deque()
dq.append(x)        # destra
dq.appendleft(x)    # sinistra
dq.pop()            # destra
dq.popleft()        # sinistra
```

In colloquio: quando vedi "deve essere FIFO ma può servire anche da stack" → deque.

## Parte 4 — Monotonic stack (il superpotere)

### Il problema motivante

> *"Per ogni elemento dell'array, trova il primo elemento alla sua destra che è maggiore di lui."*

Esempio: `arr = [3, 1, 2, 4]`. Risultato: `[4, 2, 4, -1]` (l'ultimo non ha nessuno più grande a destra).

**Brute force**: doppio loop → O(n²).

**Sliding window**? No, non c'è "finestra".

**Idea monotonic stack**: O(n).

### L'intuizione

Scorriamo l'array da sinistra. Manteniamo uno stack di **indici** i cui valori sono **decrescenti** dal basso. Cioè: in fondo allo stack c'è il valore più grande, in cima il più piccolo (tra quelli sullo stack).

Quando arriva un nuovo elemento `arr[i]`:

- Se è **maggiore** del top dello stack, vuol dire: **`arr[i]` è il "next greater element" per quel top**. Pop, registra il risultato.
- Continua finché lo stack è vuoto o il top è ≥ arr[i].
- Poi push i.

Trace su `arr = [3, 1, 2, 4]`:

```
i=0 arr[i]=3: stack vuoto, push 0. stack=[0] (valori sotto: [3])
i=1 arr[i]=1: arr[stack.top]=3 ≥ 1, no pop. push 1. stack=[0,1] (valori: [3,1])
i=2 arr[i]=2: arr[1]=1 < 2 → pop 1, res[1]=2. Ora arr[0]=3 ≥ 2, stop. push 2. stack=[0,2] (valori: [3,2])
i=3 arr[i]=4: arr[2]=2 < 4 → pop 2, res[2]=4. arr[0]=3 < 4 → pop 0, res[0]=4. stack vuoto. push 3. stack=[3] (valori: [4])
fine. Elementi rimasti nello stack (3) non hanno next greater → res[3]=-1.
```

Risultato: `[4, 2, 4, -1]`. ✓

### Codice

```python
def next_greater(arr):
    n = len(arr)
    res = [-1] * n
    st = []   # indici, valori monotoni decrescenti dal basso
    for i, x in enumerate(arr):
        while st and arr[st[-1]] < x:
            res[st.pop()] = x
        st.append(i)
    return res
```

### Perché è O(n)?

Ogni elemento entra ed esce dallo stack **al massimo una volta**. Il while interno può sembrare "n²" ma in totale fa al massimo n pop sull'intera esecuzione. Ammortizzato: O(n).

### Variante: next smaller

Cambia `<` con `>`. Tieni stack crescente.

### Variante: previous greater / smaller

Scorri **da destra a sinistra**.

### Pattern recognition: quando applicarlo

Quando il problema dice una di queste cose:

- "Next greater/smaller element".
- "Per ogni elemento, trova il primo che..."
- "Stock span" (giorni consecutivi finché il prezzo era più basso).
- "Daily temperatures": quanti giorni fino a temperatura più alta.
- "Largest rectangle in histogram".

In tutti questi casi: **monotonic stack**.

## Parte 5 — Largest Rectangle in Histogram (classico hard)

Array di altezze `h`. Trova il rettangolo di area massima sotto l'istogramma.

```
       █
   █   █
   █ █ █   █
█  █ █ █ █ █
3  1 4 5 2 6
```

Vuoi trovare l'area "rettangolo solido" più grande sotto le barre.

### L'idea con monotonic stack

Per ogni barra, voglio sapere: **fino a dove si estende un rettangolo di altezza = altezza barra**?

Si estende a sinistra finché incontri una barra più bassa (incluso). Stessa cosa a destra.

Quindi, per ogni barra `h[i]`:

- `left[i]` = indice della prima barra a sinistra **più bassa**.
- `right[i]` = indice della prima barra a destra **più bassa**.

Area massima con barra `i` come "altezza" = `h[i] × (right[i] - left[i] - 1)`.

Calcoliamo `left` e `right` con monotonic stack.

**Versione one-pass elegante**:

```python
def largest_rect(h):
    h.append(0)   # sentinella per chiudere lo stack alla fine
    st = []       # indici, altezze crescenti dal basso
    best = 0
    for i, x in enumerate(h):
        while st and h[st[-1]] >= x:
            top = st.pop()
            width = i if not st else i - st[-1] - 1
            best = max(best, h[top] * width)
        st.append(i)
    h.pop()
    return best
```

Trace su `h = [2, 1, 5, 6, 2, 3, 0]` (l'ultimo 0 è la sentinella):

```
i=0 x=2: stack vuoto, push 0. stack=[0]
i=1 x=1: h[0]=2 ≥ 1, pop 0. width = 1 (stack vuoto). area = 2*1 = 2. best=2. push 1. stack=[1]
i=2 x=5: h[1]=1 < 5, push. stack=[1,2]
i=3 x=6: h[2]=5 < 6, push. stack=[1,2,3]
i=4 x=2: h[3]=6 ≥ 2, pop 3. width = 4 - 2 - 1 = 1. area = 6*1 = 6. best=6.
        h[2]=5 ≥ 2, pop 2. width = 4 - 1 - 1 = 2. area = 5*2 = 10. best=10.
        h[1]=1 < 2, push. stack=[1,4]
i=5 x=3: h[4]=2 < 3, push. stack=[1,4,5]
i=6 x=0 (sentinella): h[5]=3 ≥ 0, pop 5. width = 6-4-1 = 1. area = 3*1 = 3.
        h[4]=2 ≥ 0, pop 4. width = 6-1-1 = 4. area = 2*4 = 8.
        h[1]=1 ≥ 0, pop 1. width = 6 (stack vuoto). area = 1*6 = 6.
```

Risultato: best = 10. ✓ (rettangolo 5×2 sui valori 5,6)

O(n) tempo, O(n) spazio.

## Parte 6 — Sliding Window Maximum (deque monotona)

Massimo in ogni finestra di lunghezza k, in O(n) totale.

Già visto nel cap. 12. Idea: deque di **indici** con valori decrescenti dal davanti. La testa è sempre il massimo della finestra.

```python
from collections import deque
def max_in_windows(arr, k):
    dq = deque()
    res = []
    for i, x in enumerate(arr):
        # Rimuovi dal fondo tutti i valori ≤ x (mai più massimi)
        while dq and arr[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        # Rimuovi dalla testa se fuori finestra
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(arr[dq[0]])
    return res
```

## Parte 7 — Evaluation di espressioni

### Postfix (Reverse Polish Notation)

`"3 4 + 5 *"` significa `(3 + 4) * 5 = 35`.

```python
def eval_postfix(tokens):
    st = []
    for t in tokens:
        if t in '+-*/':
            b = st.pop(); a = st.pop()
            if t == '+': st.append(a + b)
            elif t == '-': st.append(a - b)
            elif t == '*': st.append(a * b)
            else: st.append(int(a / b))   # int() trunca verso 0
        else:
            st.append(int(t))
    return st[0]
```

Trace `["3","4","+","5","*"]`:

```
"3": push 3 → [3]
"4": push 4 → [3, 4]
"+": pop 4, pop 3, push 7 → [7]
"5": push 5 → [7, 5]
"*": pop 5, pop 7, push 35 → [35]
fine. result = 35.
```

### Infix (con parentesi)

Le notazioni con parentesi (es. `"(2+3)*4"`) sono più complesse. Si usano due stack (operandi + operatori) e la regola di precedenza degli operatori (algoritmo "shunting-yard" di Dijkstra). Raro in colloquio.

## Parte 8 — DFS iterativo

Equivalente a ricorsione, ma con stack esplicito. Evita stack overflow per alberi/grafi profondi.

```python
def dfs_iter(root, graph):
    st = [root]
    visited = set()
    while st:
        n = st.pop()
        if n in visited: continue
        visited.add(n)
        for nb in graph[n]:
            if nb not in visited:
                st.append(nb)
```

Visita LIFO → "depth-first": esplora a fondo un ramo prima di tornare indietro.

## Parte 9 — Trappole comuni

### Trappola 1 — Usare `list` come coda

`list.pop(0)` è O(n). Usa `deque`.

### Trappola 2 — Confondere stack e coda

Stack pop = ultimo aggiunto. Coda pop = primo aggiunto.

### Trappola 3 — Stack monotono: confondere `<` e `<=`

Spesso "next greater" vs "next greater or equal" cambia di un singolo `<` vs `<=`. Disegna su carta un esempio piccolo per controllare.

### Trappola 4 — Dimenticare la sentinella

In Largest Rectangle, senza l'ultimo `0` aggiunto, gli elementi rimasti in stack alla fine non vengono mai popped.

## Esercizi

### Esercizio 5.1 — Valid Parentheses <span class="problem-tag easy">EASY</span>

<details><summary>Soluzione</summary>

Vedi parte 1.
</details>

### Esercizio 5.2 — Min Stack <span class="problem-tag medium">MEDIUM</span>

Stack che supporta `push, pop, top, getMin` tutti in O(1).

<details><summary>Ragionamento</summary>

Tieni **due** stack: uno con i valori, uno con i minimi correnti.

```python
class MinStack:
    def __init__(self):
        self.st = []
        self.mins = []
    def push(self, x):
        self.st.append(x)
        if not self.mins or x <= self.mins[-1]:
            self.mins.append(x)
    def pop(self):
        x = self.st.pop()
        if x == self.mins[-1]:
            self.mins.pop()
    def top(self): return self.st[-1]
    def getMin(self): return self.mins[-1]
```

Push del minimo solo se ≤ del minimo corrente. Pop dal minimo solo se rimuovi proprio il minimo.

O(1) tutto.
</details>

### Esercizio 5.3 — Daily Temperatures <span class="problem-tag medium">MEDIUM</span>

Per ogni giorno, quanti giorni di attesa per temperatura più alta?

<details><summary>Soluzione</summary>

Monotonic stack di indici:

```python
def daily_temps(T):
    n = len(T)
    res = [0] * n
    st = []
    for i, t in enumerate(T):
        while st and T[st[-1]] < t:
            j = st.pop()
            res[j] = i - j
        st.append(i)
    return res
```

O(n).
</details>

### Esercizio 5.4 — Evaluate RPN <span class="problem-tag medium">MEDIUM</span>

Vedi parte 7.

### Esercizio 5.5 — Sliding Window Maximum <span class="problem-tag hard">HARD</span>

Vedi parte 6.

### Esercizio 5.6 — Largest Rectangle in Histogram <span class="problem-tag hard">HARD</span>

Vedi parte 5.

### Esercizio 5.7 — Implement Queue using Stacks <span class="problem-tag easy">EASY</span>

<details><summary>Ragionamento</summary>

Due stack: `inb` per push, `outb` per pop. Quando outb è vuota, riversa tutto inb in outb (inverte l'ordine → FIFO).

```python
class MyQueue:
    def __init__(self):
        self.inb = []
        self.outb = []
    def push(self, x):
        self.inb.append(x)
    def pop(self):
        self._move()
        return self.outb.pop()
    def peek(self):
        self._move()
        return self.outb[-1]
    def empty(self):
        return not self.inb and not self.outb
    def _move(self):
        if not self.outb:
            while self.inb:
                self.outb.append(self.inb.pop())
```

O(1) **ammortizzato** per push/pop. Ogni elemento entra/esce ognuno dei due stack al massimo una volta.
</details>

### Esercizio 5.8 — Decode String <span class="problem-tag medium">MEDIUM</span>

Decodifica stringhe tipo `"3[a2[c]]"` → `"accaccacc"`.

<details><summary>Soluzione</summary>

```python
def decode(s):
    st = []
    cur = ""
    k = 0
    for c in s:
        if c.isdigit():
            k = k * 10 + int(c)
        elif c == '[':
            st.append((cur, k))
            cur = ""
            k = 0
        elif c == ']':
            prev, n = st.pop()
            cur = prev + cur * n
        else:
            cur += c
    return cur
```

Stack di stati `(stringa parziale, moltiplicatore)`. Quando entri in `[`, salva stato. Quando esci da `]`, ripeti la stringa corrente e concatena al precedente.
</details>

### Esercizio 5.9 — Asteroid Collision <span class="problem-tag medium">MEDIUM</span>

Array di asteroidi: positivo = va a destra, negativo = va a sinistra. Stessa velocità, più grande sopravvive.

<details><summary>Soluzione</summary>

```python
def asteroid_collision(arr):
    st = []
    for a in arr:
        while st and a < 0 < st[-1]:
            if st[-1] < -a:
                st.pop()       # quello sullo stack è più piccolo, esplode
                continue
            elif st[-1] == -a:
                st.pop()       # entrambi esplodono
            break              # quello sullo stack è più grande, l'arrivato esplode
        else:
            st.append(a)        # niente collisione, aggiungi
    return st
```

`for ... else` di Python: l'else viene eseguito **se il for finisce senza break**.
</details>

### Esercizio 5.10 — Basic Calculator <span class="problem-tag hard">HARD</span>

Valuta espressioni con `+, -, ()` e spazi. Senza `eval()`.

<details><summary>Soluzione</summary>

```python
def calculate(s):
    st = [1]
    sign = 1
    res = 0
    i = 0
    while i < len(s):
        c = s[i]
        if c == ' ': i += 1
        elif c == '+': sign = st[-1]; i += 1
        elif c == '-': sign = -st[-1]; i += 1
        elif c == '(': st.append(sign); i += 1
        elif c == ')': st.pop(); i += 1
        else:
            num = 0
            while i < len(s) and s[i].isdigit():
                num = num * 10 + int(s[i])
                i += 1
            res += sign * num
    return res
```

Stack di "segno corrente esterno". Trucco molto pulito.
</details>

## Riassunto

1. **Stack LIFO**, **coda FIFO**. Usa `list` per stack, `deque` per coda.
2. **Mai `list.pop(0)`**: è O(n). Usa `deque.popleft()`.
3. **Monotonic stack**: O(n) per "next greater/smaller". Pattern killer.
4. **Largest rectangle**: monotonic stack + sentinella alla fine.
5. **Deque monotona**: O(n) per "max in finestra".
6. **Pattern parsing**: stack di stati per espressioni con parentesi.

Stack apparentemente "facile", ma le sue varianti monotone sono tra le tecniche più potenti per problemi hard.
