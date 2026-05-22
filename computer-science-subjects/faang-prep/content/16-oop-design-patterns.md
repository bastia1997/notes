---
title: OOP e design patterns
area: Software design
summary: 4 pilastri OOP da zero, SOLID con esempi concreti, design patterns GoF essenziali, problemi tipo "Design X" risolti.
order: 16
---

# OOP e design patterns

I round "Design X" (Parking Lot, Tic-Tac-Toe, Snake Game, Elevator) sono spesso parte del loop FAANG (specialmente Amazon, Microsoft, Apple, Bloomberg). Non testano algoritmi: testano **se sai modellare un sistema reale in classi pulite**.

Questo capitolo ti dà tutto quello che serve.

## Parte 1 — Cos'è la OOP, davvero

### Il problema che la OOP risolve

Quando i programmi crescono oltre poche centinaia di righe, organizzare il codice diventa la sfida principale. Senza struttura:

- Lo stesso pezzo di logica viene duplicato in tanti posti.
- Modificare una cosa rompe altre dieci.
- Aggiungere una nuova feature richiede di cambiare codice ovunque.

OOP (Object-Oriented Programming) è un **modo di organizzare il codice** che mira a risolvere questo. L'idea: raggruppa **dati** e **comportamenti** correlati in unità chiamate **oggetti**.

### I 4 pilastri

#### 1. Encapsulation (incapsulamento)

Nascondi i dettagli interni di un oggetto, esponi solo un'**API pubblica**.

```python
class Counter:
    def __init__(self):
        self._count = 0           # privato per convenzione (_underscore)
    def increment(self):
        self._count += 1
    def get(self):
        return self._count
```

Chi usa `Counter` non vede `_count`. Domani puoi cambiarne il tipo (da int a dict per tracciare per chiave) senza rompere chi lo usa.

**Perché?** Modifiche interne non rompono il mondo esterno. Riduce la "superficie di attacco" dei bug.

#### 2. Inheritance (ereditarietà)

Una classe può **estendere** un'altra, ereditando attributi e metodi.

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return "Bau!"

class Cat(Animal):
    def speak(self):
        return "Miao!"
```

`Dog` e `Cat` riusano `__init__` di `Animal` e ne specializzano `speak`.

#### 3. Polymorphism (polimorfismo)

Stessa interfaccia, comportamenti diversi.

```python
animals = [Dog("Rex"), Cat("Felix")]
for a in animals:
    print(a.name, a.speak())   # ognuno parla diversamente
```

Il codice tratta gli oggetti come `Animal` senza sapere quale sottoclasse. Lo "smistamento" è automatico (**dynamic dispatch**).

#### 4. Abstraction (astrazione)

Lavora con "concetti" astratti, non con implementazioni concrete.

```python
def feed(animal: Animal):
    animal.eat()
```

`feed` non sa né si interessa se è un cane o un gatto. Lavora con l'astrazione `Animal`.

## Parte 2 — SOLID: i 5 principi del design OOP

Acronimo. Memorizzalo: in colloquio te lo possono chiedere.

### S — Single Responsibility

> Una classe = una responsabilità.

Una classe non dovrebbe avere "due motivi per cambiare". Esempio negativo:

```python
class UserManager:
    def create_user(self, ...): ...
    def send_email(self, ...): ...
    def write_log(self, ...): ...
    def export_to_csv(self, ...): ...
```

4 responsabilità diverse. Difficile da testare, manutenere, evolvere.

Meglio: `UserService`, `EmailService`, `Logger`, `Exporter` separati.

### O — Open/Closed

> Aperta a estensione, chiusa a modifica.

Dovresti poter aggiungere comportamento senza **modificare** il codice esistente.

Esempio: invece di `if/elif` per ogni tipo di forma, usa polimorfismo:

```python
# MALE: chiusa a estensione (devi modificare per nuove forme)
def area(shape):
    if shape.type == 'circle': return pi * shape.r**2
    elif shape.type == 'square': return shape.side**2
    # nuova forma → modifichi questa funzione

# BENE: aperta
class Shape:
    def area(self): ...
class Circle(Shape):
    def area(self): return pi * self.r**2
class Square(Shape):
    def area(self): return self.side**2
# nuova forma → aggiungi una classe, niente modifiche
```

### L — Liskov Substitution

> Una sottoclasse deve poter sostituire la classe base senza rompere il client.

Se `Square extends Rectangle` con `setWidth/setHeight`, il client si aspetta che `setWidth(3); setHeight(5)` produca area 15. Ma `Square` forza width=height → bug. **Violazione LSP**.

Lezione: non ogni "is-a" reale è "is-a" in OOP. Un quadrato è un rettangolo nella geometria, **ma non nel codice se i contratti differiscono**.

### I — Interface Segregation

> Molte interfacce piccole > una grande.

Un'interfaccia `IWorker` con 20 metodi è scomoda: chi implementa "leggero" deve riempire 15 metodi inutili.

Meglio: `IReader`, `IWriter`, `IPrinter`. Ogni implementazione adotta solo quelle che le servono.

### D — Dependency Inversion

> Dipendi da astrazioni, non da concrete.

```python
# MALE
class OrderService:
    def __init__(self):
        self.db = MySQLDatabase()   # dipende da DB concreto

# BENE
class OrderService:
    def __init__(self, db: Database):
        self.db = db   # dipende da astrazione
```

Conseguenza: nei test passi un `MockDatabase`, in produzione `MySQLDatabase`. Codice flessibile e testabile.

## Parte 3 — Composition vs inheritance

Anti-pattern classico OOP: **abusare** dell'ereditarietà.

```python
class Bird:
    def fly(self): ...
class Ostrich(Bird):
    def fly(self): raise NotImplementedError   # VIOLA LSP!
```

Lo struzzo non vola. Forzato a essere `Bird` solo perché "è un uccello".

**Composition over inheritance**: piuttosto che ereditare, **composisci**.

```python
class FlyBehaviour:
    def fly(self): ...
class NoFlyBehaviour(FlyBehaviour):
    def fly(self): pass

class Bird:
    def __init__(self, fly_b: FlyBehaviour):
        self.fly_b = fly_b
    def fly(self): self.fly_b.fly()

eagle = Bird(NormalFlyBehaviour())
ostrich = Bird(NoFlyBehaviour())
```

Più flessibile: cambi comportamento al runtime, riusi i behaviour in più classi.

Regola in colloquio: **mai eredità più di 1-2 livelli profondi**.

## Parte 4 — Design Patterns essenziali (GoF)

I "Gang of Four" hanno descritto 23 pattern. **Devi conoscere bene 8**.

### 1. Singleton

Una sola istanza globale.

```python
class Logger:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

**Quando**: logger, config, connection pool. **Anti-pattern** se diventa "global state nascosto".

In Python preferisci modulo-level globals (più semplici).

### 2. Factory

Funzione/classe che crea istanze concrete senza esporre i costruttori al client.

```python
class ShapeFactory:
    @staticmethod
    def create(kind: str) -> Shape:
        if kind == "circle": return Circle()
        elif kind == "square": return Square()
        raise ValueError(kind)
```

Il client chiede `factory.create("circle")` senza conoscere `Circle`. Cambia implementazione → cambi solo la factory.

### 3. Builder

Costruisce oggetti complessi step-by-step. Fluent API.

```python
pizza = (PizzaBuilder()
         .with_dough("thin")
         .with_topping("ham")
         .with_topping("cheese")
         .build())
```

**Quando**: oggetto con tanti parametri opzionali. Più leggibile di un costruttore con 12 argomenti.

### 4. Observer (pub-sub)

Soggetto notifica osservatori al cambiamento.

```python
class Subject:
    def __init__(self):
        self.observers = []
    def attach(self, o):
        self.observers.append(o)
    def notify(self, event):
        for o in self.observers:
            o.update(event)
```

**Quando**: UI (modello → vista), event-driven systems.

### 5. Strategy

Algoritmi intercambiabili tramite oggetto.

```python
class Sorter:
    def __init__(self, strategy):
        self.strategy = strategy
    def sort(self, arr):
        return self.strategy.sort(arr)

# strategies concrete: QuickSort(), MergeSort(), HeapSort()
```

**Quando**: hai più modi di fare la stessa cosa e vuoi scegliere a runtime.

### 6. Decorator

Aggiunge funzionalità a un oggetto senza modificare la classe.

```python
class Coffee:
    def cost(self): return 5

class MilkDecorator:
    def __init__(self, base):
        self.base = base
    def cost(self):
        return self.base.cost() + 1

coffee = MilkDecorator(MilkDecorator(Coffee()))   # caffè con doppio latte
coffee.cost()   # 7
```

**Quando**: aggiungere caratteristiche (logging, caching, auth) a metodi esistenti.

Python ha sintassi nativa `@decorator` per funzioni.

### 7. Adapter

Trasforma un'interfaccia in un'altra che il client si aspetta.

**Quando**: integrare una libreria esterna che non matcha il tuo design.

### 8. Iterator

Espone elementi sequenzialmente senza esporre la struttura sottostante.

In Python: `__iter__`/`__next__`. Anche generator (`yield`) è pattern Iterator.

## Parte 5 — Workflow "Design X" in colloquio

Per ogni problema "design", segui 6 step:

### 1. Clarify requirements (5 min)

- Cosa deve fare il sistema?
- Chi sono gli utenti?
- Cosa NON serve?

Questo dimostra rigore. Non saltarlo mai.

### 2. Identifica le entità

Nomi nei requisiti → potenziali classi.

### 3. Identifica i comportamenti

Verbi nei requisiti → potenziali metodi.

### 4. Disegna le relazioni

- **Composition** (has-a): X ha un Y.
- **Inheritance** (is-a): X è un tipo di Y.
- **Aggregation**: X usa Y ma non lo possiede.

Cardinalità: 1-1, 1-N, N-N.

### 5. Scrivi le firme delle classi

Costruttore + metodi pubblici. **Niente implementazione completa** (non hai tempo).

### 6. Discuti edge case + estensioni

Concurrency, persistenza, scalabilità, autorizzazioni.

## Parte 6 — Esercizi "Design X"

### Esercizio 16.1 — Parking Lot <span class="problem-tag medium">MEDIUM</span>

<details><summary>Soluzione completa</summary>

**Requisiti** (chiariti):

- Veicoli di 3 tipi: motorcycle, car, truck.
- Spot di 3 tipi: small (solo moto), compact (moto+car), large (tutti).
- Multi-livello.
- Operazioni: park, leave, ticket.

**Entità**: Vehicle, Spot, Level, ParkingLot, Ticket.

```python
from enum import Enum
from typing import Optional

class VType(Enum):
    MOTO = 1; CAR = 2; TRUCK = 3

class SType(Enum):
    SMALL = 1; COMPACT = 2; LARGE = 3

class Vehicle:
    def __init__(self, plate, vtype: VType):
        self.plate = plate
        self.vtype = vtype

class Spot:
    def __init__(self, sid, stype: SType):
        self.sid = sid
        self.stype = stype
        self.vehicle: Optional[Vehicle] = None
    def can_fit(self, v: Vehicle):
        if self.stype == SType.SMALL: return v.vtype == VType.MOTO
        if self.stype == SType.COMPACT: return v.vtype in (VType.MOTO, VType.CAR)
        return True
    def park(self, v: Vehicle):
        self.vehicle = v
    def free(self):
        v = self.vehicle; self.vehicle = None; return v

class Level:
    def __init__(self, lid, spots):
        self.lid = lid
        self.spots = spots
    def park(self, v: Vehicle) -> Optional[Spot]:
        for s in self.spots:
            if s.vehicle is None and s.can_fit(v):
                s.park(v)
                return s
        return None

class ParkingLot:
    def __init__(self, levels):
        self.levels = levels
        self.plate_to_spot = {}
    def park(self, v: Vehicle) -> Optional[Spot]:
        for lvl in self.levels:
            s = lvl.park(v)
            if s:
                self.plate_to_spot[v.plate] = s
                return s
        return None
    def leave(self, plate):
        s = self.plate_to_spot.pop(plate, None)
        if s: return s.free()
        return None
```

**Da discutere**: tariffazione (subclassa Ticket), prenotazioni, concorrenza (lock per level).
</details>

### Esercizio 16.2 — Tic-Tac-Toe <span class="problem-tag medium">MEDIUM</span>

<details><summary>Soluzione "O(1) per mossa"</summary>

Trick: per ogni riga/colonna/diagonale, mantieni un contatore con +1 per giocatore 1, -1 per giocatore 2. Se raggiunge ±n, qualcuno vince.

```python
class TicTacToe:
    def __init__(self, n):
        self.n = n
        self.rows = [0] * n
        self.cols = [0] * n
        self.diag = 0
        self.anti = 0
    def move(self, row, col, player):
        val = 1 if player == 1 else -1
        self.rows[row] += val
        self.cols[col] += val
        if row == col: self.diag += val
        if row + col == self.n - 1: self.anti += val
        if (abs(self.rows[row]) == self.n or
            abs(self.cols[col]) == self.n or
            abs(self.diag) == self.n or
            abs(self.anti) == self.n):
            return player
        return 0
```

O(1) per mossa. Notare il bel trucco del +1/-1 per "indistinguere" il vincitore.
</details>

### Esercizio 16.3 — LRU Cache <span class="problem-tag medium">MEDIUM</span>

Vedi cap. 04 (DLL + hashmap).

### Esercizio 16.4 — Logger Rate Limiter <span class="problem-tag medium">MEDIUM</span>

<details><summary>Soluzione</summary>

```python
class Logger:
    def __init__(self):
        self.last = {}
    def should_print(self, ts, msg):
        if msg in self.last and ts - self.last[msg] < 10:
            return False
        self.last[msg] = ts
        return True
```

Semplice ma è proprio una "design question": hashmap msg → last_ts.
</details>

### Esercizio 16.5 — Hit Counter <span class="problem-tag medium">MEDIUM</span>

<details><summary>Soluzione</summary>

```python
from collections import deque
class HitCounter:
    def __init__(self):
        self.q = deque()
    def hit(self, t):
        self.q.append(t)
    def get_hits(self, t):
        while self.q and self.q[0] <= t - 300:
            self.q.popleft()
        return len(self.q)
```

Deque per buffer di timestamps. Pop quelli più vecchi di 300 secondi.
</details>

### Esercizio 16.6 — Snake Game <span class="problem-tag medium">MEDIUM</span>

<details><summary>Soluzione</summary>

```python
from collections import deque
class SnakeGame:
    def __init__(self, w, h, food):
        self.w = w; self.h = h
        self.food = deque(food)
        self.snake = deque([(0, 0)])
        self.body = {(0, 0)}
        self.score = 0
    def move(self, direction):
        head = self.snake[-1]
        d = {'U':(-1,0),'D':(1,0),'L':(0,-1),'R':(0,1)}[direction]
        nh = (head[0]+d[0], head[1]+d[1])
        if not (0 <= nh[0] < self.h and 0 <= nh[1] < self.w):
            return -1
        if self.food and tuple(self.food[0]) == nh:
            self.food.popleft()
            self.score += 1
        else:
            tail = self.snake.popleft()
            self.body.discard(tail)
        if nh in self.body: return -1
        self.snake.append(nh)
        self.body.add(nh)
        return self.score
```

Snake come deque (testa/coda). Set per controllo O(1) "collide con sé stesso".
</details>

### Esercizio 16.7 — Elevator System <span class="problem-tag hard">HARD</span>

<details><summary>Approccio skeleton</summary>

Classi: `Elevator` (stato: piano corrente, direzione, queue di richieste), `ElevatorController` (riceve richieste e le assegna agli ascensori).

Algoritmo classico: **SCAN/LOOK** ("scan in una direzione finché ci sono richieste, poi inverti").

Discuti: priorità di assegnamento (vicino, stessa direzione), gestione emergenze, capacità max.
</details>

### Esercizio 16.8 — In-Memory File System <span class="problem-tag hard">HARD</span>

<details><summary>Idea</summary>

Trie di nodi: ogni nodo è una directory o un file. `Node.children` = dict di subnodes. `Node.content` per file.

Operazioni: `ls(path)`, `mkdir(path)`, `addContent(path, content)`, `readContent(path)`.

Esercizio sulla manipolazione di alberi di nomi.
</details>

## Riassunto

1. **4 pilastri OOP**: encapsulation, inheritance, polymorphism, abstraction.
2. **SOLID**: Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion.
3. **Composition > Inheritance**. Ereditarietà oltre 2 livelli è red flag.
4. **8 GoF pattern essenziali**: Singleton, Factory, Builder, Observer, Strategy, Decorator, Adapter, Iterator.
5. **"Design X" in colloquio**: clarify → entità → comportamenti → relazioni → firme → edge case.

Quando ti chiedono "design X", **non gettarti sul codice**. Chiarisci requisiti, disegna classi alla lavagna, poi codifica le firme.
