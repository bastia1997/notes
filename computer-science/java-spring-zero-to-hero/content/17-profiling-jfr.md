---
title: "Profiling: JFR, async-profiler, jstack, heap dump, jcmd"
area: "JVM Deep"
order: 17
level: "avanzato"
summary: "Java Flight Recorder (JFR) per profiling continuo in produzione. async-profiler per flame graph. jstack per thread dump, jmap/jcmd per heap dump. Workflow di troubleshooting tipici."
prereq: ["Sezione 16"]
tools: ["JDK 21", "JMC, async-profiler", "Eclipse MAT"]
---

# Profiling: JFR, async-profiler, jstack, heap dump, jcmd

## Toolkit di base

| Strumento | Quando |
|---|---|
| **`jps`** | Lista i processi Java in esecuzione |
| **`jstack`** | Stack dump (cosa sta facendo ogni thread) |
| **`jmap`** / **`jcmd ... GC.histogram`** | Conteggio oggetti per classe |
| **`jcmd ... GC.heap_dump`** | Heap dump completo (hprof) |
| **`jstat`** | Statistiche GC live |
| **JFR (Java Flight Recorder)** | Profiling integrato, low-overhead, sempre disponibile |
| **JMC (Java Mission Control)** | UI per leggere file JFR |
| **VisualVM** | Profiling/monitoring grafico |
| **async-profiler** | Sampling profiler, ottimo per CPU e allocation flame graph |

## JFR: Java Flight Recorder

JFR registra eventi nella JVM (alloc, GC, lock, exception, IO, ...) con overhead **<1%**. Pensato per girare anche in produzione.

```powershell
# avvia con JFR già acceso
java -XX:StartFlightRecording=duration=60s,filename=app.jfr -jar app.jar

# o attiva su processo già in esecuzione
jcmd <pid> JFR.start duration=60s filename=app.jfr
jcmd <pid> JFR.stop
```

Apri `app.jfr` con **Java Mission Control** (JMC, gratis, jetbrains "Open in JMC"). Vedrai:
- Hot methods (CPU)
- Allocation hot spots
- Lock contention
- Garbage Collection timeline
- I/O waits

### Eventi custom

Puoi pubblicare i tuoi eventi:

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
... // logica
e.orderId = order.id();
e.amount = order.total();
e.commit();
```

## async-profiler: flame graph

[async-profiler](https://github.com/async-profiler/async-profiler) usa eventi perf del kernel: minor overhead, profila anche stack nativi (JIT, lib C).

```powershell
asprof start -e cpu <pid>
# ...lascia girare...
asprof stop -f profile.html <pid>
```

Output: HTML interattivo con **flame graph**. Larghezza barra = tempo CPU. Vai dall'alto verso il basso: ogni barra è un metodo, sopra ci sono i suoi caller.

## Thread dump

```powershell
jstack <pid> > dump.txt
# o (più completo):
jcmd <pid> Thread.print > dump.txt
```

Cosa cerchi:
- **BLOCKED** ⟶ in attesa di un lock.
- **WAITING/TIMED_WAITING** ⟶ in attesa di altro thread (Object.wait, sleep, condition).
- **Deadlock** ⟶ alla fine `jstack` lo segnala esplicito.

3 dump a distanza di 5 secondi: i thread "fermi" sempre sullo stesso stack frame sono il problema.

## Heap dump

```powershell
jcmd <pid> GC.heap_dump path/to/heap.hprof
# o automatico al crash OOM:
java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./heap.hprof -jar app.jar
```

Aprilo con **Eclipse MAT**:
- **Dominator Tree**: chi tiene vivo cosa.
- **Leak Suspects**: report automatico.
- **Retained Heap**: spazio totale "dominato" da un oggetto.

## Workflow di troubleshooting

### "L'app è lenta"

1. `jstack` ⟶ ci sono thread bloccati?
2. JFR per 60s ⟶ apri in JMC, guarda Hot methods.
3. async-profiler flame graph ⟶ dove va il CPU?
4. Database? Query plan, indici, slow query log.

### "L'app crasha con OOM"

1. `-XX:+HeapDumpOnOutOfMemoryError` (avresti dovuto attivarlo *prima*).
2. MAT ⟶ Leak Suspects.
3. Identifica la `static` collection o cache che cresce.

### "Spike di CPU al 100%"

1. `top -H -p <pid>` (Linux) ⟶ trovi il thread che sta consumando.
2. Converti TID in hex e cercalo nel `jstack`.
3. Vedrai esattamente cosa fa quel thread.

## Esercizi

<details>
<summary>Es 17.1 — JFR su un'app reale</summary>

Scrivi un'app che fa lavoro misto (CPU + I/O simulato + GC). Lancia con `-XX:StartFlightRecording=duration=30s,filename=jfr.jfr`. Apri in JMC.

</details>

<details>
<summary>Es 17.2 — Thread dump diagnostico</summary>

Forza un deadlock (Es 12.3). Esegui `jstack <pid>`. Identifica la sezione "Found one Java-level deadlock".

</details>

<details>
<summary>Es 17.3 — Flame graph</summary>

Installa async-profiler. Profila un programma che ha un metodo "lento" (es. ricorsione naive di Fibonacci). Genera il flame graph: vedrai dove va il tempo.

</details>

## Cosa devi portarti via

- **JFR + JMC**: profiling continuo low-overhead. Attivalo in produzione.
- async-profiler per flame graph CPU.
- `jstack` per "perché è bloccato?".
- Heap dump + Eclipse MAT per OOM e memory leak.
- Sappi creare uno workflow di diagnosi: dati ⟶ ipotesi ⟶ verifica.

Prossimo: Java moderno (record, sealed, pattern matching, text blocks, virtual threads...).
