---
title: "Concurrency III — java.util.concurrent: locks, atomics, concurrent collections"
area: "Standard Library"
order: 14
level: "avanzato"
summary: "ReentrantLock, ReadWriteLock, StampedLock. Atomics (AtomicInteger, AtomicReference, ...) e CAS. Concurrent collections (ConcurrentHashMap, BlockingQueue, ConcurrentLinkedQueue). CountDownLatch, CyclicBarrier, Semaphore."
prereq: ["Sezione 13"]
tools: ["JDK 21"]
---

# Concurrency III — `java.util.concurrent`

## Lock espliciti

### `ReentrantLock`

Più flessibile di `synchronized`: timeout, tryLock, condizioni multiple.

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // critical section
} finally {
    lock.unlock();   // SEMPRE in finally
}
```

`tryLock(timeout)` evita deadlock:

```java
if (lock.tryLock(100, TimeUnit.MILLISECONDS)) {
    try { ... } finally { lock.unlock(); }
}
```

`new ReentrantLock(true)` per **fairness** (FIFO sui thread in attesa, più lento).

### `ReadWriteLock`

Tanti lettori, un solo scrittore. Ottimo per dati letti molto e scritti poco:

```java
ReadWriteLock rw = new ReentrantReadWriteLock();
rw.readLock().lock(); try { ... } finally { rw.readLock().unlock(); }
rw.writeLock().lock(); try { ... } finally { rw.writeLock().unlock(); }
```

### `StampedLock` (Java 8+)

Variante ottimistica: read senza acquisire lock, verifica al termine.

## Atomics

`AtomicInteger`, `AtomicLong`, `AtomicReference<T>`, `AtomicBoolean`, `AtomicIntegerArray`, ...

Usano **CAS (Compare-And-Swap)**: una singola istruzione hardware.

```java
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();         // ++counter atomico
counter.addAndGet(5);
counter.compareAndSet(10, 20);     // se è 10, mettilo a 20

AtomicReference<State> state = new AtomicReference<>(State.IDLE);
state.compareAndSet(State.IDLE, State.RUNNING);
```

CAS è non-blocking: niente lock, niente attesa, niente deadlock. Più veloce di synchronized per contatori.

### `LongAdder`

Per contatori ad alta concorrenza, ancora più veloce di `AtomicLong` (split del contatore in più celle):

```java
LongAdder visits = new LongAdder();
visits.increment();
long total = visits.sum();
```

## Concurrent collections

### `ConcurrentHashMap`

Thread-safe, alta concorrenza:

```java
Map<String, Integer> map = new ConcurrentHashMap<>();
map.put("a", 1);
map.compute("a", (k, v) -> (v == null) ? 1 : v + 1);
map.merge("b", 1, Integer::sum);
```

`compute`, `merge`, `putIfAbsent` sono **atomici**.

> Non sostituire `synchronized HashMap` con `ConcurrentHashMap` solo per fare. Le iterazioni hanno semantiche **weak consistency**: non vedi necessariamente le modifiche concorrenti.

### `CopyOnWriteArrayList` / `CopyOnWriteArraySet`

Ogni modifica copia. Ottimo per molti lettori, pochi scrittori (listener pattern).

### `BlockingQueue<E>`

Coda thread-safe con bloccaggio. Cuore del produttore-consumatore moderno.

```java
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);

// producer
queue.put(task);          // blocca se piena

// consumer
Task t = queue.take();    // blocca se vuota
```

Varianti:
- `ArrayBlockingQueue(capacity)` — bounded
- `LinkedBlockingQueue` — opzionalmente bounded
- `PriorityBlockingQueue` — con priorità
- `SynchronousQueue` — capacità 0, hand-off diretto
- `DelayQueue` — task con delay

`ExecutorService` interno usa queste code per la coda dei task pendenti.

### `ConcurrentLinkedQueue`

Non bloccante, lock-free. Per scenari ad alte performance senza necessità di blocco.

## Coordinatori

### `CountDownLatch`

"Aspetta che N task siano fatti".

```java
CountDownLatch latch = new CountDownLatch(3);
for (int i = 0; i < 3; i++) {
    ex.submit(() -> {
        doWork();
        latch.countDown();
    });
}
latch.await();   // blocca fino a quando il contatore = 0
```

Una volta sceso a zero, non riusabile. Per cicli ripetuti: `CyclicBarrier`.

### `CyclicBarrier`

N thread si aspettano l'un l'altro. Riusabile.

```java
CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println("tutti arrivati"));
// ogni thread:
doWork();
barrier.await();   // si sblocca quando tutti e 3 sono arrivati
```

### `Semaphore`

Limita il numero di accessi concorrenti:

```java
Semaphore s = new Semaphore(5);   // max 5 thread concorrenti
s.acquire();
try { doCall(); } finally { s.release(); }
```

Usi tipici: rate limit a un'API esterna.

### `Phaser`

Versione avanzata di `CyclicBarrier`, con fasi dinamiche. Più raro.

## ThreadLocal

Una variabile per-thread:

```java
ThreadLocal<SimpleDateFormat> fmt =
    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

String s = fmt.get().format(new Date());
```

Caso d'uso classico: oggetti non thread-safe (`SimpleDateFormat`!) che vuoi riutilizzare.

> Spring usa `ThreadLocal` ovunque: `RequestContextHolder`, `TransactionSynchronizationManager`. Con virtual threads, attenzione: ogni VT ha il suo TL, e milioni di VT = molti oggetti in memoria.

## Esercizi

<details>
<summary>Es 14.1 — Contatore lock-free</summary>

Sostituisci un `synchronized` con `AtomicInteger`. Misura le differenze di velocità con 10 thread x 1M increment.

</details>

<details>
<summary>Es 14.2 — Producer-consumer con BlockingQueue</summary>

```java
BlockingQueue<String> q = new ArrayBlockingQueue<>(10);
Thread prod = new Thread(() -> {
    for (int i = 0; i < 100; i++) {
        try { q.put("msg-" + i); } catch (InterruptedException e) { break; }
    }
});
Thread cons = new Thread(() -> {
    while (true) {
        try {
            String m = q.take();
            System.out.println(m);
        } catch (InterruptedException e) { break; }
    }
});
prod.start(); cons.start();
```

</details>

<details>
<summary>Es 14.3 — CountDownLatch</summary>

Avvia N thread, aspetta che TUTTI finiscano prima di stampare "done".

```java
CountDownLatch latch = new CountDownLatch(N);
for (int i = 0; i < N; i++) {
    new Thread(() -> {
        doWork();
        latch.countDown();
    }).start();
}
latch.await();
System.out.println("done");
```

</details>

## Cosa devi portarti via

- `ReentrantLock` per controllo fine. Sempre `unlock()` in `finally`.
- `Atomic*` per contatori senza lock. CAS è la base.
- `ConcurrentHashMap` per mappe condivise, `BlockingQueue` per code thread-safe.
- `CountDownLatch`, `CyclicBarrier`, `Semaphore` per coordinare.
- `ThreadLocal` per dati per-thread, attento ai leak.

Prossimo: JVM internals (classloader, bytecode, JIT, area di memoria).
