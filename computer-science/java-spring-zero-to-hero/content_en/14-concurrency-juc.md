---
title: "Concurrency III — java.util.concurrent: locks, atomics, concurrent collections"
area: "Standard Library"
order: 14
level: "advanced"
summary: "ReentrantLock, ReadWriteLock, StampedLock. Atomics (AtomicInteger, AtomicReference, ...) and CAS. Concurrent collections (ConcurrentHashMap, BlockingQueue, ConcurrentLinkedQueue). CountDownLatch, CyclicBarrier, Semaphore."
prereq: ["Section 13"]
tools: ["JDK 21"]
---

# Concurrency III — `java.util.concurrent`

## Explicit locks

### `ReentrantLock`

More flexible than `synchronized`: timeout, tryLock, multiple conditions.

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // critical section
} finally {
    lock.unlock();   // ALWAYS in finally
}
```

`tryLock(timeout)` avoids deadlock:

```java
if (lock.tryLock(100, TimeUnit.MILLISECONDS)) {
    try { ... } finally { lock.unlock(); }
}
```

`new ReentrantLock(true)` for **fairness** (FIFO on waiting threads, slower).

### `ReadWriteLock`

Many readers, one writer. Great for data read often, rarely written:

```java
ReadWriteLock rw = new ReentrantReadWriteLock();
rw.readLock().lock(); try { ... } finally { rw.readLock().unlock(); }
rw.writeLock().lock(); try { ... } finally { rw.writeLock().unlock(); }
```

### `StampedLock` (Java 8+)

Optimistic variant: read without acquiring, validate at the end.

## Atomics

`AtomicInteger`, `AtomicLong`, `AtomicReference<T>`, `AtomicBoolean`, ...

They use **CAS (Compare-And-Swap)**: a single hardware instruction.

```java
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();
counter.addAndGet(5);
counter.compareAndSet(10, 20);

AtomicReference<State> state = new AtomicReference<>(State.IDLE);
state.compareAndSet(State.IDLE, State.RUNNING);
```

CAS is non-blocking: no lock, no wait, no deadlock. Faster than synchronized for counters.

### `LongAdder`

For high-contention counters, faster than `AtomicLong` (counter split across cells):

```java
LongAdder visits = new LongAdder();
visits.increment();
long total = visits.sum();
```

## Concurrent collections

### `ConcurrentHashMap`

Thread-safe, high concurrency:

```java
Map<String, Integer> map = new ConcurrentHashMap<>();
map.put("a", 1);
map.compute("a", (k, v) -> (v == null) ? 1 : v + 1);
map.merge("b", 1, Integer::sum);
```

`compute`, `merge`, `putIfAbsent` are **atomic**.

### `CopyOnWriteArrayList` / `CopyOnWriteArraySet`

Each modification copies. Great for many readers, few writers (listener pattern).

### `BlockingQueue<E>`

Thread-safe queue with blocking. Heart of modern producer-consumer.

```java
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);

// producer
queue.put(task);          // blocks if full

// consumer
Task t = queue.take();    // blocks if empty
```

Variants: `ArrayBlockingQueue`, `LinkedBlockingQueue`, `PriorityBlockingQueue`, `SynchronousQueue`, `DelayQueue`.

### `ConcurrentLinkedQueue`

Non-blocking, lock-free.

## Coordinators

### `CountDownLatch`

"Wait until N tasks are done".

```java
CountDownLatch latch = new CountDownLatch(3);
for (int i = 0; i < 3; i++) {
    ex.submit(() -> {
        doWork();
        latch.countDown();
    });
}
latch.await();   // blocks until counter = 0
```

Single-shot. For cycles use `CyclicBarrier`.

### `CyclicBarrier`

N threads wait for each other. Reusable.

```java
CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println("all arrived"));
doWork();
barrier.await();
```

### `Semaphore`

Limit concurrent access:

```java
Semaphore s = new Semaphore(5);   // max 5 concurrent
s.acquire();
try { doCall(); } finally { s.release(); }
```

Typical: rate-limit calls to an external API.

## ThreadLocal

Per-thread variable:

```java
ThreadLocal<SimpleDateFormat> fmt =
    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

String s = fmt.get().format(new Date());
```

Classic use case: non-thread-safe objects (`SimpleDateFormat`!) reused.

> Spring uses `ThreadLocal` everywhere: `RequestContextHolder`, `TransactionSynchronizationManager`. With virtual threads, beware: each VT has its TL, and millions of VTs = many objects.

## Exercises

<details>
<summary>Ex 14.1 — Lock-free counter</summary>

Replace a `synchronized` with `AtomicInteger`. Measure speed differences with 10 threads × 1M increments.

</details>

<details>
<summary>Ex 14.2 — Producer-consumer with BlockingQueue</summary>

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
<summary>Ex 14.3 — CountDownLatch</summary>

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

## Take-aways

- `ReentrantLock` for fine control. Always `unlock()` in `finally`.
- `Atomic*` for lock-free counters. CAS is the foundation.
- `ConcurrentHashMap` for shared maps, `BlockingQueue` for thread-safe queues.
- `CountDownLatch`, `CyclicBarrier`, `Semaphore` to coordinate.
- `ThreadLocal` for per-thread data, watch for leaks.

Next: JVM internals (classloader, bytecode, JIT, memory areas).
