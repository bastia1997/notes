---
title: "Listeners, restart, monitoring, Spring Boot and Kubernetes integration"
area: "Spring Batch"
order: 41
level: "expert"
summary: "All listeners: Job, Step, Chunk, Item, Skip, Retry. Restart in practice: what's needed, what's NOT restartable. Monitoring with Micrometer/Prometheus. Spring Cloud Task. Jobs on Kubernetes (Spring Cloud Data Flow or CronJob)."
prereq: ["Section 40"]
tools: ["Spring Boot 3.x", "Kubernetes", "Prometheus"]
---

# Listeners, restart, monitoring, K8s

## Listeners summary

| Listener | Hooks |
|---|---|
| `JobExecutionListener` | `beforeJob`, `afterJob` |
| `StepExecutionListener` | `beforeStep`, `afterStep` |
| `ChunkListener` | `beforeChunk`, `afterChunk`, `afterChunkError` |
| `ItemReadListener<T>` | `beforeRead`, `afterRead`, `onReadError` |
| `ItemProcessListener<I, O>` | `beforeProcess`, `afterProcess`, `onProcessError` |
| `ItemWriteListener<O>` | `beforeWrite`, `afterWrite`, `onWriteError` |
| `SkipListener<I, O>` | skip in read/process/write |
| `RetryListener` | open/close/onError of retry |

Annotation impl:

```java
@Component
public class JobLogger {
    @BeforeJob
    public void before(JobExecution exec) {
        log.info("starting job {} #{}", exec.getJobInstance().getJobName(), exec.getId());
    }
    @AfterJob
    public void after(JobExecution exec) {
        log.info("job {} ended status={}", exec.getJobInstance().getJobName(), exec.getStatus());
    }
}
```

Register:
```java
new JobBuilder("import", jr).listener(jobLogger).start(...)
```

## Restart in practice

To restart a job:

1. Previous execution must be `FAILED` or `STOPPED` (not `COMPLETED`).
2. Same identifying `JobParameters`.
3. Reader / writer must be **stateful** (implement `ItemStream`).

```java
op.restart(jobExecutionId);
```

Spring Batch:
1. Loads the saved `ExecutionContext`.
2. Re-activates the reader with the context: the reader knows where it left off.
3. Resumes.

### What's NOT restartable

- Step with `.allowStartIfComplete(true)`: re-run even if OK.
- Already `COMPLETED` step is **skipped**, not redone.
- Custom reader without `ItemStream`: starts from scratch.

## What to save in the ExecutionContext

If you modify external state (e.g. downloaded file), save it:

```java
@AfterStep
public ExitStatus afterStep(StepExecution se) {
    se.getExecutionContext().putString("lastFileProcessed", file.getName());
    return ExitStatus.COMPLETED;
}
```

At restart read from `BeforeStep`.

## Monitoring

Spring Batch exposes **Micrometer** metrics:

- `spring.batch.job` (timer)
- `spring.batch.step` (timer)
- `spring.batch.item.read` / `process` / `write` (counter)
- `spring.batch.chunk.write` (timer)

With `spring-boot-starter-actuator` + `micrometer-registry-prometheus`:

```
GET /actuator/prometheus
```

Grafana dashboard:
- Average time per job.
- Throughput (records/s).
- Failure rate.
- Skip count per job.

## Custom job events

Publish event at job end:

```java
@Component
public class JobNotifyListener implements JobExecutionListener {
    private final ApplicationEventPublisher publisher;

    @Override
    public void afterJob(JobExecution exec) {
        publisher.publishEvent(new JobFinishedEvent(exec.getJobInstance().getJobName(),
                                                   exec.getStatus()));
    }
}

@EventListener
public void onJobFinished(JobFinishedEvent e) {
    if (e.status() != BatchStatus.COMPLETED) {
        slack.send("⚠️ Job " + e.name() + " ended " + e.status());
    }
}
```

## Spring Cloud Task

Extension tracking "task" (batch job) executions as persistent records. Integrates with Spring Cloud Data Flow for orchestration/UI.

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-task</artifactId>
</dependency>
```

```java
@SpringBootApplication
@EnableTask
public class App { }
```

`TASK_EXECUTION` tables complement `BATCH_*`.

## Spring Batch on Kubernetes

### Option 1: K8s CronJob launching a container

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-import
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: app
            image: acme/import-job:1.2.3
            args: ["--spring.batch.job.names=importJob"]
          restartPolicy: OnFailure
```

Advantages:
- No scheduler in Java.
- K8s manages restart, logging, monitoring.
- Per-pod resource limits.

Key config:
- `spring.batch.job.names`: job to run.
- `spring.batch.job.enabled=true` (you want it on in K8s).
- `JobParameters` from env vars: `--businessDate=${BUSINESS_DATE}`.

### Option 2: Spring Cloud Data Flow

UI + REST API to orchestrate jobs on K8s. More complex, useful for enterprise with dozens of jobs.

### Option 3: Argo Workflows

For complex DAGs (more than one job).

## Production best practices

1. **Write idempotency** (upsert, ON CONFLICT).
2. **Restart-safe**: stateful reader, idempotent writer.
3. **Structured logging** with `traceId`.
4. **Micrometer metrics** exposed to Prometheus.
5. **Alerts** on FAILED, on abnormal duration, on high skip_count.
6. **JobParameters** include **businessDate**: rerunning for the same date ⟶ same effect.
7. **Lock to avoid concurrency** on the same JobInstance (Spring Batch protects only within the same JVM).
8. **Integration tests** with Testcontainers + `JobLauncherTestUtils`.

```java
@SpringBatchTest
@SpringBootTest
class ImportJobTest {

    @Autowired JobLauncherTestUtils utils;

    @Test
    void importsAllRecords() throws Exception {
        JobExecution exec = utils.launchJob();
        assertThat(exec.getStatus()).isEqualTo(BatchStatus.COMPLETED);
        assertThat(exec.getStepExecutions().iterator().next().getWriteCount()).isEqualTo(1000);
    }
}
```

## Exercises

<details>
<summary>Ex 41.1 — Full JobExecutionListener</summary>

Listener logging times, read/write/skip counts, and sending a Slack event on FAILED.

</details>

<details>
<summary>Ex 41.2 — Working restart</summary>

Job with 3 steps: A, B, C. Force a fail in B. Restart: A is skipped, B restarts (default).

</details>

<details>
<summary>Ex 41.3 — Expose Prometheus metrics</summary>

Add Actuator + Micrometer-Prometheus. Run a job. Check `/actuator/prometheus` contains `spring_batch_*`.

</details>

<details>
<summary>Ex 41.4 — Test with JobLauncherTestUtils</summary>

Test running a mini-job with embedded CSV and verifying `read_count`, `write_count`.

</details>

## Take-aways

- Listeners at every level: job, step, chunk, item.
- Restart needs a stateful reader (`ItemStream`).
- Save required state in the ExecutionContext.
- Monitoring: Micrometer + Prometheus + Grafana.
- On K8s: **CronJob** is the simple, clean pattern.
- Idempotency + restart-safe + logging + metrics = production ready.

Next: design patterns in Java/Spring (synthesis).
