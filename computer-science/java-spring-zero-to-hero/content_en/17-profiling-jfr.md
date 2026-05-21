---
title: "Profiling: JFR, async-profiler, jstack, heap dump, jcmd"
area: "JVM Deep"
order: 17
level: "advanced"
summary: "Java Flight Recorder (JFR) for continuous production profiling. async-profiler for flame graphs. jstack for thread dumps, jmap/jcmd for heap dumps. Typical troubleshooting workflows."
prereq: ["Section 16"]
tools: ["JDK 21", "JMC, async-profiler", "Eclipse MAT"]
---

# Profiling: JFR, async-profiler, jstack, heap dump, jcmd

## Base toolkit

| Tool | When |
|---|---|
| **`jps`** | List running Java processes |
| **`jstack`** | Stack dump (what each thread is doing) |
| **`jmap`** / **`jcmd ... GC.histogram`** | Object count per class |
| **`jcmd ... GC.heap_dump`** | Full heap dump (hprof) |
| **`jstat`** | Live GC stats |
| **JFR (Java Flight Recorder)** | Built-in, low-overhead profiling |
| **JMC (Java Mission Control)** | UI for JFR files |
| **VisualVM** | Graphical profiling/monitoring |
| **async-profiler** | Sampling profiler, great for CPU and allocation flame graphs |

## JFR: Java Flight Recorder

JFR records JVM events (alloc, GC, lock, exception, IO, ...) with **<1%** overhead. Designed for production.

```powershell
# start with JFR enabled
java -XX:StartFlightRecording=duration=60s,filename=app.jfr -jar app.jar

# or enable on running process
jcmd <pid> JFR.start duration=60s filename=app.jfr
jcmd <pid> JFR.stop
```

Open `app.jfr` with **Java Mission Control** (JMC, free). You'll see:
- Hot methods (CPU)
- Allocation hot spots
- Lock contention
- GC timeline
- I/O waits

### Custom events

```java
@Name("it.zth.OrderProcessed")
@Label("Order processed")
@Category("Business")
public class OrderEvent extends Event {
    @Label("Order Id") public long orderId;
    @Label("Amount") public double amount;
}

OrderEvent e = new OrderEvent();
e.begin();
... // logic
e.orderId = order.id();
e.amount = order.total();
e.commit();
```

## async-profiler: flame graph

[async-profiler](https://github.com/async-profiler/async-profiler) uses kernel perf events: minimal overhead, profiles native stacks too (JIT, C libs).

```powershell
asprof start -e cpu <pid>
asprof stop -f profile.html <pid>
```

Output: interactive HTML **flame graph**. Bar width = CPU time. Top-down: each bar is a method, callers above.

## Thread dump

```powershell
jstack <pid> > dump.txt
jcmd <pid> Thread.print > dump.txt
```

Look for:
- **BLOCKED** ⟶ waiting on a lock.
- **WAITING/TIMED_WAITING** ⟶ waiting on another thread (Object.wait, sleep, condition).
- **Deadlock** ⟶ `jstack` flags it explicitly.

3 dumps 5s apart: threads "stuck" on the same frame are the problem.

## Heap dump

```powershell
jcmd <pid> GC.heap_dump path/to/heap.hprof
java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./heap.hprof -jar app.jar
```

Open with **Eclipse MAT**:
- **Dominator Tree**: who keeps what alive.
- **Leak Suspects**: automatic report.
- **Retained Heap**: total space "dominated" by an object.

## Troubleshooting workflows

### "App is slow"

1. `jstack` ⟶ any blocked threads?
2. JFR for 60s ⟶ JMC, Hot methods view.
3. async-profiler flame graph ⟶ where is CPU going?
4. Database? Query plan, indexes, slow query log.

### "App crashes with OOM"

1. `-XX:+HeapDumpOnOutOfMemoryError` (should've been on *before*).
2. MAT ⟶ Leak Suspects.
3. Find the growing `static` collection or cache.

### "CPU spike to 100%"

1. `top -H -p <pid>` (Linux) ⟶ find the consuming thread.
2. Convert TID to hex, search in `jstack`.
3. You'll see exactly what that thread is doing.

## Exercises

<details>
<summary>Ex 17.1 — JFR on a real app</summary>

Write an app doing mixed work (CPU + simulated I/O + GC). Run with `-XX:StartFlightRecording=duration=30s,filename=jfr.jfr`. Open in JMC.

</details>

<details>
<summary>Ex 17.2 — Diagnostic thread dump</summary>

Force a deadlock (Ex 12.3). Run `jstack <pid>`. Find the "Found one Java-level deadlock" block.

</details>

<details>
<summary>Ex 17.3 — Flame graph</summary>

Install async-profiler. Profile a program with a "slow" method (e.g. naive Fibonacci recursion). Generate the flame graph: see where time goes.

</details>

## Take-aways

- **JFR + JMC**: continuous low-overhead profiling. Enable in production.
- async-profiler for CPU flame graphs.
- `jstack` for "why is it stuck?".
- Heap dump + Eclipse MAT for OOM and memory leaks.
- Build a diagnosis workflow: data ⟶ hypothesis ⟶ verify.

Next: modern Java (records, sealed, pattern matching, text blocks, virtual threads, ...).
