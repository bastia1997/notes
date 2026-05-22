---
title: "Tasklet vs Chunk; flow control: decisions, splits, conditionals"
area: "Spring Batch"
order: 37
level: "advanced"
summary: "When to use a Tasklet instead of a chunk-step. Job flow: sequence, decisions with JobExecutionDecider, parallel splits, conditional transitions (on COMPLETED, FAILED, custom). Reusable sub-flows."
prereq: ["Section 36"]
tools: ["Spring Batch 5.x"]
---

# Tasklet vs Chunk; flow control

## When to use a Tasklet

The "chunk" step is great for record streams. For **a single action** (e.g. "compress output file", "run a shell command", "send notification email"), use a **Tasklet**.

```java
@Bean
public Step compressStep(JobRepository jr, PlatformTransactionManager tx) {
    return new StepBuilder("compress", jr)
        .tasklet((contribution, ctx) -> {
            Files.copy(Path.of("out.csv"), Path.of("out.csv.gz")); // simplified
            return RepeatStatus.FINISHED;
        }, tx)
        .build();
}
```

`Tasklet.execute(...)` returns:
- `RepeatStatus.FINISHED` — done, next step.
- `RepeatStatus.CONTINUABLE` — call me again (loop).

## "System command" tasklet

```java
@Bean
public SystemCommandTasklet runScript() {
    var t = new SystemCommandTasklet();
    t.setCommand("python", "/scripts/post-process.py");
    t.setTimeout(30_000);
    return t;
}
```

## Flow: composing steps

### Sequential

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

### Conditional (based on `ExitStatus`)

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

Wildcards: `"*"` for "any".

### `JobExecutionDecider`: custom decisions

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

### Split: parallel steps

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
        .next(c)
        .end()
        .build();
}
```

> `SimpleAsyncTaskExecutor` creates a thread per split. In production use a configured `ThreadPoolTaskExecutor`.

## Reusable sub-flows

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

Reusable across jobs.

## Custom `ExitStatus`

```java
@Bean
public Step myStep(...) {
    return new StepBuilder("s", jr)
        .tasklet((contribution, ctx) -> {
            if (something) {
                contribution.setExitStatus(new ExitStatus("EMPTY"));
            }
            return RepeatStatus.FINISHED;
        }, tx)
        .build();
}

.start(myStep)
.on("EMPTY").end()
.from(myStep).on("*").to(nextStep)
```

## `Stoppable`: graceful stop

```java
op.stop(executionId);
```

Spring Batch propagates a flag: current reader/writer finishes its chunk, then step ends `STOPPED`. To resume: restart.

## Exercises

<details>
<summary>Ex 37.1 — Job with 3 sequential steps</summary>

Step 1: download file (tasklet). Step 2: parse CSV → DB (chunk). Step 3: send summary email (tasklet).

</details>

<details>
<summary>Ex 37.2 — Conditional decision</summary>

Decider: if record count > 1000, run `bigProcess`, else `smallProcess`.

</details>

<details>
<summary>Ex 37.3 — Parallel split</summary>

Two parallel "download from source A" and "download from source B" steps, then merge.

</details>

## Take-aways

- **Tasklet** for one-shot actions; **chunk** for record streams.
- Flow: `.on("STATUS").to(...)` for transitions.
- `JobExecutionDecider` for custom decisions.
- Split + Flow for step-level parallelism.
- Sub-flows to reuse logic.

Next: ItemReader in depth (flat files, JDBC, JPA, multi-resource).
