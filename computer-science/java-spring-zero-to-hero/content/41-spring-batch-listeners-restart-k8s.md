---
title: "Listeners, restart, monitoring, integrazione con Spring Boot e Kubernetes"
area: "Spring Batch"
order: 41
level: "esperto"
summary: "Tutti i listener: Job, Step, Chunk, Item, Skip, Retry. Restart in pratica: cosa serve, cosa NON è restartable. Monitoring con Micrometer/Prometheus. Spring Cloud Task. Job su Kubernetes (Spring Cloud Data Flow o CronJob)."
prereq: ["Sezione 40"]
tools: ["Spring Boot 3.x", "Kubernetes", "Prometheus"]
---

# Listeners, restart, monitoring, K8s

## Listener riepilogati

| Listener | Hook |
|---|---|
| `JobExecutionListener` | `beforeJob`, `afterJob` |
| `StepExecutionListener` | `beforeStep`, `afterStep` |
| `ChunkListener` | `beforeChunk`, `afterChunk`, `afterChunkError` |
| `ItemReadListener<T>` | `beforeRead`, `afterRead`, `onReadError` |
| `ItemProcessListener<I, O>` | `beforeProcess`, `afterProcess`, `onProcessError` |
| `ItemWriteListener<O>` | `beforeWrite`, `afterWrite`, `onWriteError` |
| `SkipListener<I, O>` | skip in read/process/write |
| `RetryListener` | open/close/onError di retry |

Implementazione con annotation:

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

Registra:
```java
new JobBuilder("import", jr).listener(jobLogger).start(...)
```

## Restart in pratica

Per restartare un job:

1. La precedente esecuzione deve essere in stato `FAILED` o `STOPPED` (non `COMPLETED`).
2. Stessi `JobParameters` identifying.
3. Reader / writer devono essere **stateful** (implementare `ItemStream`).

```java
op.restart(jobExecutionId);
```

Spring Batch:
1. Carica l'`ExecutionContext` salvato.
2. Riattiva il reader col contesto: il reader sa dove era arrivato.
3. Riprende da lì.

### Cosa NON è restartable

- Step con `.allowStartIfComplete(true)`: rieseguito anche se OK.
- Step già `COMPLETED` viene **saltato**, non rifatto.
- Custom reader senza `ItemStream`: ricomincia da capo.

## Cosa salvare nell'ExecutionContext

Se tu modifichi stato esterno (es. file scaricato), salva nel contesto:

```java
@AfterStep
public ExitStatus afterStep(StepExecution se) {
    se.getExecutionContext().putString("lastFileProcessed", file.getName());
    return ExitStatus.COMPLETED;
}
```

Al restart leggi da `BeforeStep`.

## Monitoring

Spring Batch espone metriche **Micrometer**:

- `spring.batch.job` (timer)
- `spring.batch.step` (timer)
- `spring.batch.item.read` / `process` / `write` (counter)
- `spring.batch.chunk.write` (timer)

Con `spring-boot-starter-actuator` + `micrometer-registry-prometheus`:

```
GET /actuator/prometheus
```

Grafana dashboard:
- Tempo medio per job.
- Throughput (record/s).
- Failure rate.
- Skip count per job.

## Job custom event

Pubblicare evento al termine del job:

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

// e poi un listener che manda mail/Slack
@EventListener
public void onJobFinished(JobFinishedEvent e) {
    if (e.status() != BatchStatus.COMPLETED) {
        slack.send("⚠️ Job " + e.name() + " ended " + e.status());
    }
}
```

## Spring Cloud Task

Estensione che traccia esecuzioni di "task" (job batch) come record persistenti. Si integra con Spring Cloud Data Flow per orchestrazione/UI.

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

Tabelle `TASK_EXECUTION` complementari a `BATCH_*`.

## Spring Batch su Kubernetes

### Opzione 1: CronJob K8s che lancia un container

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-import
spec:
  schedule: "0 2 * * *"   # ogni notte alle 2
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

Vantaggi:
- Niente schedulatore in Java.
- K8s gestisce restart, logging, monitoring.
- Resource limits per pod.

Configurazione importanti:
- `spring.batch.job.names`: nome del job da eseguire.
- `spring.batch.job.enabled=true` (in K8s lo vuoi attivo).
- Lettura `JobParameters` da env var: `--businessDate=${BUSINESS_DATE}`.

### Opzione 2: Spring Cloud Data Flow

UI + REST API per orchestrare job in K8s. Complessità maggiore, ma utile per ambienti enterprise con decine di job.

### Opzione 3: Argo Workflows

Per DAG complessi (più di un singolo job).

## Best practice per produzione

1. **Idempotenza in scrittura** (upsert, ON CONFLICT).
2. **Restart-safe**: reader stateful, writer idempotente.
3. **Logging strutturato** con `traceId`.
4. **Metriche Micrometer** esposte a Prometheus.
5. **Alert** su FAILED, su durata anomala, su skip_count alto.
6. **JobParameters** che includono **businessDate**: rilanciare per la stessa data ⟶ stesso effetto.
7. **Lock per evitare concorrenza** sullo stesso JobInstance (Spring Batch ti protegge solo se la JVM è la stessa).
8. **Test integrati** con Testcontainers + `JobLauncherTestUtils`.

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

## Esercizi

<details>
<summary>Es 41.1 — JobExecutionListener completo</summary>

Listener che logga tempi, record letti/scritti/skippati, e manda evento Slack se FAILED.

</details>

<details>
<summary>Es 41.2 — Restart funzionante</summary>

Job in 3 step: A,B,C. Forza fail in B. Restart: A viene saltato, B riparte dall'inizio (default).

</details>

<details>
<summary>Es 41.3 — Esponi metriche Prometheus</summary>

Aggiungi Actuator + Micrometer-Prometheus. Lancia job. Verifica `/actuator/prometheus` ha `spring_batch_*`.

</details>

<details>
<summary>Es 41.4 — Test con JobLauncherTestUtils</summary>

Test che lancia un mini-job con un piccolo CSV embedded e verifica `read_count`, `write_count`.

</details>

## Cosa devi portarti via

- Listener su ogni livello: job, step, chunk, item.
- Restart richiede reader stateful (`ItemStream`).
- Salva nell'ExecutionContext lo stato necessario.
- Monitoring: Micrometer + Prometheus + Grafana.
- Su K8s: **CronJob** è il pattern semplice e pulito.
- Idempotenza + restart-safe + logging + metriche = production ready.

Prossimo: design patterns in Java/Spring (sintesi).
