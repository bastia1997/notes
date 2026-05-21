---
title: OOP and design patterns
area: Software design
summary: 4 OOP pillars from scratch, SOLID with concrete examples, essential GoF design patterns, "Design X" problems solved.
order: 16
---

# OOP and design patterns

"Design X" rounds (Parking Lot, Tic-Tac-Toe, Snake Game, Elevator) are often part of FAANG loops (especially Amazon, Microsoft, Apple, Bloomberg). They don't test algorithms: they test **whether you can model a real system in clean classes**.

This chapter gives you everything you need.

## Part 1 — What OOP really is

### The problem OOP solves

When programs grow beyond a few hundred lines, organizing code becomes the main challenge. Without structure:

- The same logic gets duplicated in many places.
- Modifying one thing breaks ten others.
- Adding a new feature requires changing code everywhere.

OOP (Object-Oriented Programming) is a **way to organize code** that aims to solve this. The idea: group **data** and **behaviors** related to a thing into units called **objects**.

### The 4 pillars

#### 1. Encapsulation

Hide internal details of an object, expose only a **public API**.

```python
class Counter:
    def __init__(self):
        self._count = 0           # private by convention (_underscore)
    def increment(self):
        self._count += 1
    def get(self):
        return self._count
```

Whoever uses `Counter` doesn't see `_count`. Tomorrow you can change its type (from int to dict to track by key) without breaking users.

**Why?** Internal changes don't break the outside world. Reduces the "attack surface" of bugs.

#### 2. Inheritance

A class can **extend** another, inheriting attributes and methods.

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"
```

`Dog` and `Cat` reuse `Animal`'s `__init__` and specialize `speak`.

#### 3. Polymorphism

Same interface, different behaviors.

```python
animals = [Dog("Rex"), Cat("Felix")]
for a in animals:
    print(a.name, a.speak())   # each speaks differently
```

The code treats objects as `Animal` without knowing which subclass. The "dispatching" is automatic (**dynamic dispatch**).

#### 4. Abstraction

Work with "concepts", not concrete implementations.

```python
def feed(animal: Animal):
    animal.eat()
```

`feed` doesn't know nor care if it's a dog or a cat. It works with the `Animal` abstraction.

## Part 2 — SOLID: the 5 OOP design principles

Acronym. Memorize it: in interview they might ask.

### S — Single Responsibility

> One class = one responsibility.

A class shouldn't have "two reasons to change". Negative example:

```python
class UserManager:
    def create_user(self, ...): ...
    def send_email(self, ...): ...
    def write_log(self, ...): ...
    def export_to_csv(self, ...): ...
```

4 different responsibilities. Hard to test, maintain, evolve.

Better: separate `UserService`, `EmailService`, `Logger`, `Exporter`.

### O — Open/Closed

> Open to extension, closed to modification.

You should be able to add behavior without **modifying** existing code.

Example: instead of `if/elif` for each shape type, use polymorphism:

```python
# BAD: closed to extension (must modify for new shapes)
def area(shape):
    if shape.type == 'circle': return pi * shape.r**2
    elif shape.type == 'square': return shape.side**2
    # new shape → modify this function

# GOOD: open
class Shape:
    def area(self): ...
class Circle(Shape):
    def area(self): return pi * self.r**2
class Square(Shape):
    def area(self): return self.side**2
# new shape → add a class, no modifications
```

### L — Liskov Substitution

> A subclass must be able to replace the base class without breaking the client.

If `Square extends Rectangle` with `setWidth/setHeight`, the client expects `setWidth(3); setHeight(5)` to produce area 15. But `Square` forces width=height → bug. **LSP violation**.

Lesson: not every real "is-a" is "is-a" in OOP. A square is a rectangle in geometry, **but not in code if contracts differ**.

### I — Interface Segregation

> Many small interfaces > one big one.

An `IWorker` interface with 20 methods is annoying: those implementing "light" must fill 15 useless methods.

Better: `IReader`, `IWriter`, `IPrinter`. Each implementation adopts only what it needs.

### D — Dependency Inversion

> Depend on abstractions, not on concrete.

```python
# BAD
class OrderService:
    def __init__(self):
        self.db = MySQLDatabase()   # depends on concrete DB

# GOOD
class OrderService:
    def __init__(self, db: Database):
        self.db = db   # depends on abstraction
```

Consequence: in tests pass a `MockDatabase`, in production `MySQLDatabase`. Flexible and testable code.

## Part 3 — Composition vs inheritance

Classic OOP anti-pattern: **abusing** inheritance.

```python
class Bird:
    def fly(self): ...
class Ostrich(Bird):
    def fly(self): raise NotImplementedError   # VIOLATES LSP!
```

Ostriches don't fly. Forced to be `Bird` just because "it's a bird".

**Composition over inheritance**: rather than inheriting, **compose**.

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

More flexible: you change behavior at runtime, reuse behaviors in multiple classes.

Rule in interview: **never inheritance more than 1-2 levels deep**.

## Part 4 — Essential design patterns (GoF)

The "Gang of Four" described 23 patterns. **You must know well 8**.

### 1. Singleton

A single global instance.

```python
class Logger:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

**When**: logger, config, connection pool. **Anti-pattern** if it becomes "hidden global state".

In Python prefer module-level globals (simpler).

### 2. Factory

Function/class creating concrete instances without exposing constructors to client.

```python
class ShapeFactory:
    @staticmethod
    def create(kind: str) -> Shape:
        if kind == "circle": return Circle()
        elif kind == "square": return Square()
        raise ValueError(kind)
```

The client asks `factory.create("circle")` without knowing `Circle`. Change implementation → only change factory.

### 3. Builder

Builds complex objects step-by-step. Fluent API.

```python
pizza = (PizzaBuilder()
         .with_dough("thin")
         .with_topping("ham")
         .with_topping("cheese")
         .build())
```

**When**: object with many optional parameters. More readable than a constructor with 12 args.

### 4. Observer (pub-sub)

Subject notifies observers on change.

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

**When**: UI (model → view), event-driven systems.

### 5. Strategy

Interchangeable algorithms via object.

```python
class Sorter:
    def __init__(self, strategy):
        self.strategy = strategy
    def sort(self, arr):
        return self.strategy.sort(arr)

# concrete strategies: QuickSort(), MergeSort(), HeapSort()
```

**When**: multiple ways to do the same thing and want to choose at runtime.

### 6. Decorator

Adds functionality to an object without modifying the class.

```python
class Coffee:
    def cost(self): return 5

class MilkDecorator:
    def __init__(self, base):
        self.base = base
    def cost(self):
        return self.base.cost() + 1

coffee = MilkDecorator(MilkDecorator(Coffee()))   # coffee with double milk
coffee.cost()   # 7
```

**When**: add features (logging, caching, auth) to existing methods.

Python has native `@decorator` syntax for functions.

### 7. Adapter

Transforms one interface into another the client expects.

**When**: integrate an external library that doesn't match your design.

### 8. Iterator

Exposes elements sequentially without exposing the underlying structure.

In Python: `__iter__`/`__next__`. Also generator (`yield`) is the Iterator pattern.

## Part 5 — "Design X" workflow in interview

For every "design" problem, follow 6 steps:

### 1. Clarify requirements (5 min)

- What does the system do?
- Who are the users?
- What's NOT needed?

This demonstrates rigor. Never skip.

### 2. Identify entities

Nouns in requirements → potential classes.

### 3. Identify behaviors

Verbs in requirements → potential methods.

### 4. Draw the relationships

- **Composition** (has-a): X has a Y.
- **Inheritance** (is-a): X is a type of Y.
- **Aggregation**: X uses Y but doesn't own it.

Cardinality: 1-1, 1-N, N-N.

### 5. Write class signatures

Constructor + public methods. **No full implementation** (no time).

### 6. Discuss edge cases + extensions

Concurrency, persistence, scalability, authorizations.

## Part 6 — "Design X" exercises

### Exercise 16.1 — Parking Lot <span class="problem-tag medium">MEDIUM</span>

<details><summary>Complete solution</summary>

**Requirements** (clarified):

- 3 vehicle types: motorcycle, car, truck.
- 3 spot types: small (motos only), compact (motos+cars), large (all).
- Multi-level.
- Operations: park, leave, ticket.

**Entities**: Vehicle, Spot, Level, ParkingLot, Ticket.

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

**To discuss**: pricing (subclass Ticket), reservations, concurrency (lock per level).
</details>

### Exercise 16.2 — Tic-Tac-Toe <span class="problem-tag medium">MEDIUM</span>

<details><summary>"O(1) per move" solution</summary>

Trick: for each row/column/diagonal, keep a counter with +1 for player 1, -1 for player 2. If reaches ±n, someone wins.

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

O(1) per move. Note the nice +1/-1 trick to "indistinguish" the winner.
</details>

### Exercise 16.3 — LRU Cache <span class="problem-tag medium">MEDIUM</span>

See ch. 04 (DLL + hashmap).

### Exercise 16.4 — Logger Rate Limiter <span class="problem-tag medium">MEDIUM</span>

<details><summary>Solution</summary>

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

Simple but it's a real "design question": hashmap msg → last_ts.
</details>

### Exercise 16.5 — Hit Counter <span class="problem-tag medium">MEDIUM</span>

<details><summary>Solution</summary>

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

Deque for timestamp buffer. Pop those older than 300 seconds.
</details>

### Exercise 16.6 — Snake Game <span class="problem-tag medium">MEDIUM</span>

<details><summary>Solution</summary>

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

Snake as deque (head/tail). Set for O(1) "collides with itself" check.
</details>

### Exercise 16.7 — Elevator System <span class="problem-tag hard">HARD</span>

<details><summary>Skeleton approach</summary>

Classes: `Elevator` (state: current floor, direction, request queue), `ElevatorController` (receives requests and assigns to elevators).

Classic algorithm: **SCAN/LOOK** ("scan in one direction while there are requests, then reverse").

Discuss: assignment priority (closest, same direction), emergency handling, max capacity.
</details>

### Exercise 16.8 — In-Memory File System <span class="problem-tag hard">HARD</span>

<details><summary>Idea</summary>

Trie of nodes: each node is a directory or file. `Node.children` = dict of subnodes. `Node.content` for files.

Operations: `ls(path)`, `mkdir(path)`, `addContent(path, content)`, `readContent(path)`.

Exercise on manipulating name trees.
</details>

## Summary

1. **4 OOP pillars**: encapsulation, inheritance, polymorphism, abstraction.
2. **SOLID**: Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion.
3. **Composition > Inheritance**. Inheritance over 2 levels is a red flag.
4. **8 essential GoF patterns**: Singleton, Factory, Builder, Observer, Strategy, Decorator, Adapter, Iterator.
5. **"Design X" in interview**: clarify → entities → behaviors → relationships → signatures → edge cases.

When they ask you to "design X", **don't dive into code**. Clarify requirements, draw classes on whiteboard, then code the signatures.
