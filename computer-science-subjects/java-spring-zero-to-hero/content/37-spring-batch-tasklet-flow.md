---
title: "Tasklet vs Chunk; flow control: decisioni, split, conditional"
area: "Spring Batch"
order: 37
level: "avanzato"
summary: "Quando usare un Tasklet invece di un chunk-step. Flow di un Job: sequence, decisioni con JobExecutionDecider, split paralleli, transizioni condizionate (on COMPLETED, FAILED, custom). Sub-flow riutilizzabili."
prereq: ["Sezione 36"]
tools: ["Spring Batch 5.x"]
---

# Tasklet vs Chunk; flow control

## Quando usare un Tasklet

Lo step "chunk" è perfetto quando hai un flusso di record da elaborare. Per **una singola azione** (es. "comprimi il file di output", "invoca un comando shell", "manda mail di notifica"), si usa un **Tasklet**.

```java
@Bean
public Step compressStep(JobRepository jr, PlatformTransactionManager tx) {
    return new StepBuilder("compress", jr)
        .tasklet((contribution, ctx) -> {
            // logica
            Files.copy(Path.of("out.csv"), Path.of("out.csv.gz")); // semplificato
            return RepeatStatus.FINISHED;
        }, tx)
        .build();
}
```

`Tasklet.execute(...)` può ritornare:
- `RepeatStatus.FINISHED` — fatto, prossimo step.
- `RepeatStatus.CONTINUABLE` — chiamami ancora (loop).

## Tasklet "system command"

```java
@Bean
public SystemCommandTasklet runScript() {
    var t = new SystemCommandTasklet();
    t.setCommand("python", "/scripts/post-process.py");
    t.setTimeout(30_000);
    return t;
}
```

## Flow: comporre step

### Sequenziale

```java
@Bean
public Job pipeline(JobRepository jr, Step extract, Step transform, Step load) {
    return new JobBuilder("etlJob", jr)
        .start(extract)
        .next(transform)
        .next(load)
        .build();
}
```

### Condizionale (basato su `ExitStatus`)

```java
@Bean
public Job conditionalJob(JobRepository jr, Step doIt, Step onSuccess, Step onFailure) {
    return new JobBuilder("condJob", jr)
        .start(doIt)
        .on("COMPLETED").to(onSuccess)
        .from(doIt).on("FAILED").to(onFailure)
        .end()
        .build();
}
```

Wildcards: `"*"` per "qualsiasi".

### `JobExecutionDecider`: decisioni custom

```java
@Component
public class TimeDecider implements JobExecutionDecider {
    @Override
    public FlowExecutionStatus decide(JobExecution jobExec, StepExecution stepExec) {
        return LocalTime.now().getHour() < 6 ? new FlowExecutionStatus("NIGHT") : new FlowExecutionStatus("DAY");
    }
}

@Bean
public Job withDecider(JobRepository jr, Step a, Step nightStep, Step dayStep, TimeDecider decider) {
    return new JobBuilder("dec", jr)
        .start(a)
        .next(decider)
        .on("NIGHT").to(nightStep)
        .from(decider).on("DAY").to(dayStep)
        .end()
        .build();
}
```

### Split: step in parallelo

```java
@Bean
public Job parallelJob(JobRepository jr, Step a, Step b, Step c) {
    Flow flow1 = new FlowBuilder<Flow>("flow1").start(a).build();
    Flow flow2 = new FlowBuilder<Flow>("flow2").start(b).build();

    return new JobBuilder("parallel", jr)
        .start(new FlowBuilder<Flow>("split")
            .split(new SimpleAsyncTaskExecutor())
            .add(flow1, flow2)
            .build())
        .next(c)            // c parte solo dopo che a E b sono finiti
        .end()
        .build();
}
```

> `SimpleAsyncTaskExecutor` crea un thread per ogni split. In produzione usa un `ThreadPoolTaskExecutor` configurato.

## Sub-flow riutilizzabili

```java
@Bean
public Flow validationFlow(Step validate, Step report) {
    return new FlowBuilder<Flow>("validation")
        .start(validate)
        .next(report)
        .build();
}

@Bean
public Job j1(JobRepository jr, Step extract, Flow validationFlow, Step load) {
    return new JobBuilder("j1", jr)
        .start(extract)
        .next(validationFlow)
        .next(load)
        .end()
        .build();
}
```

Riusabile in più job.

## `ExitStatus` custom

```java
@Bean
public Step myStep(...) {
    return new StepBuilder("s", jr)
        .tasklet((contribution, ctx) -> {
            if (qualcosa) {
                contribution.setExitStatus(new ExitStatus("EMPTY"));
            }
            return RepeatStatus.FINISHED;
        }, tx)
        .build();
}

// poi:
.start(myStep)
.on("EMPTY").end()
.from(myStep).on("*").to(nextStep)
```

## `Stoppable`: stop "elegante"

```java
op.stop(executionId);
```

Spring Batch propaga un flag: il reader/writer corrente termina il chunk in corso, poi lo step termina con `STOPPED`. Per riprenderlo: restart.

## Esercizi

<details>
<summary>Es 37.1 — Job con 3 step sequenziali</summary>

Step 1: download file (tasklet). Step 2: parse CSV → DB (chunk). Step 3: invio mail di summary (tasklet).

</details>

<details>
<summary>Es 37.2 — Decisione condizionale</summary>

Decider: se il numero di record è > 1000, esegui `bigProcess`, altrimenti `smallProcess`.

</details>

<details>
<summary>Es 37.3 — Split parallelo</summary>

Due step "scarica da fonte A" e "scarica da fonte B" in parallelo, poi merge.

</details>

## Cosa devi portarti via

- **Tasklet** per azioni singole; **chunk** per processare flussi di record.
- Flow control: `.on("STATUS").to(...)` per transizioni.
- `JobExecutionDecider` per decisioni custom.
- Split + Flow per parallelismo a livello di step.
- Sub-flow per riusare logica.

Prossimo: ItemReader in profondità (flat file, JDBC, JPA, multi-resource).
