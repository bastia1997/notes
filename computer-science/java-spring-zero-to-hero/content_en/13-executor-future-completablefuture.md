---
title: "Concurrency II — ExecutorService, Future, CompletableFuture"
area: "Standard Library"
order: 13
level: "advanced"
summary: "Thread pools, ExecutorService and its factories (newFixedThreadPool, newCachedThreadPool, newSingleThreadExecutor). Submitting Runnable/Callable, Future and get/cancel. CompletableFuture: async, chaining, combine, exception handling."
prereq: ["Section 12"]
tools: ["JDK 21"]
---

# Concurrency II — ExecutorService, Future, CompletableFuture

## Why a pool

Creating `new Thread()` each time is costly: the OS allocates stack, registers, context. A **thread pool** recycles threads.

```java
ExecutorService ex = Executors.newFixedThreadPool(8);
ex.submit(() -> doWork());
ex.shutdown();
```

`ExecutorService` is the interface. Factories in `Executors`:

| Factory | When to use |
|---|---|
| `newFixedThreadPool(n)` | Fixed-size pool. CPU-bound at "n = core count". |
| `newCachedThreadPool()` | Elastic, creates on demand, reuses idle. Dangerous if task count can explode. |
| `newSingleThreadExecutor()` | One thread, sequential. |
| `newScheduledThreadPool(n)` | Time-scheduled tasks. |
| `newVirtualThreadPerTaskExecutor()` (Java 21) | One virtual thread per task. I/O-bound. |

`shutdown()` says "no new tasks, finish queued ones". `shutdownNow()` interrupts running ones.

## `Runnable` vs `Callable`

- `Runnable` (`void run()`) — no return value.
- `Callable<V>` (`V call() throws Exception`) — returns `V` or throws.

```java
Future<Integer> f = ex.submit(() -> {
    Thread.sleep(1000);
    return 42;
});
Integer r = f.get();    // BLOCKS until done
```

### `Future`

| Method | What it does |
|---|---|
| `get()` | Blocks, returns result (or throws) |
| `get(timeout, TimeUnit)` | Blocks with timeout |
| `cancel(boolean mayInterrupt)` | Cancel |
| `isDone()`, `isCancelled()` | State |

`Future` is limited: no chaining, no combining. For that, `CompletableFuture`.

## `CompletableFuture`: the composable future

```java
CompletableFuture<Integer> cf = CompletableFuture.supplyAsync(() -> compute());

cf.thenApply(i -> "value: " + i);
cf.thenCompose(id -> findUserAsync(id));
cf.thenAccept(v -> System.out.println(v));
cf.exceptionally(ex -> { log(ex); return -1; });

CompletableFuture<Integer> a = CompletableFuture.supplyAsync(() -> svc1());
CompletableFuture<Integer> b = CompletableFuture.supplyAsync(() -> svc2());
CompletableFuture<Integer> sum = a.thenCombine(b, Integer::sum);

CompletableFuture.allOf(a, b).join();
CompletableFuture<Object> first = CompletableFuture.anyOf(a, b);
```

### Async vs sync chaining

- `thenApply(f)` — runs `f` on the thread completing the CF (could be the caller).
- `thenApplyAsync(f)` — runs `f` on the **common pool** (or a provided pool).

> For non-trivial workflows, always use `Async` with your own executor to avoid swamping the common pool.

## Common patterns

### Parallelize N I/O calls

```java
List<CompletableFuture<Resp>> futures = ids.stream()
    .map(id -> CompletableFuture.supplyAsync(() -> client.fetch(id), pool))
    .toList();

List<Resp> results = futures.stream()
    .map(CompletableFuture::join)
    .toList();
```

### Timeout

```java
cf.orTimeout(2, TimeUnit.SECONDS)
  .exceptionally(ex -> fallback());
```

### Exception composition

```java
client.fetchAsync(id)
    .thenApply(this::process)
    .exceptionallyCompose(ex -> client.fetchBackupAsync(id))
    .thenApply(this::process);
```

## Virtual threads (Java 21)

Revolutionary: ultra-light threads managed by the JVM, not the OS. You can have **millions**.

```java
try (var ex = Executors.newVirtualThreadPerTaskExecutor()) {
    ex.submit(() -> blockingHttpCall());
}
```

Use for **I/O-bound tasks** (HTTP, DB, file). CPU-bound work still uses traditional pools.

> For Spring 3.2+ set `spring.threads.virtual.enabled=true` to use virtual threads in the Tomcat container.

## Exercises

<details>
<summary>Ex 13.1 — Pool with submit</summary>

Compute the sum of squares 1..1,000,000 in 4 parallel tasks.

```java
ExecutorService ex = Executors.newFixedThreadPool(4);
List<Future<Long>> futs = new ArrayList<>();
int chunk = 250_000;
for (int i = 0; i < 4; i++) {
    final int from = i * chunk + 1, to = (i + 1) * chunk;
    futs.add(ex.submit(() -> {
        long s = 0;
        for (long j = from; j <= to; j++) s += j * j;
        return s;
    }));
}
long total = 0;
for (var f : futs) total += f.get();
ex.shutdown();
```

</details>

<details>
<summary>Ex 13.2 — Async combine</summary>

```java
CompletableFuture<Integer> a = CompletableFuture.supplyAsync(() -> { sleep(500); return 10; });
CompletableFuture<Integer> b = CompletableFuture.supplyAsync(() -> { sleep(300); return 20; });
int sum = a.thenCombine(b, Integer::sum).join();
```

</details>

<details>
<summary>Ex 13.3 — Virtual threads</summary>

```java
try (var ex = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 100_000; i++) {
        ex.submit(() -> Thread.sleep(Duration.ofSeconds(1)));
    }
}
// finishes in ~1 second, not 100,000
```

</details>

## Take-aways

- Don't `new Thread()` everywhere: use a pool.
- `Callable` if you need to return; `Runnable` if not.
- `CompletableFuture` for composable async workflows.
- `thenCombine` to combine, `allOf` to wait for all, `exceptionally` for errors.
- Virtual threads (Java 21) for massive I/O-bound.

Next: advanced locks and `java.util.concurrent` (Atomic, concurrent collections).
