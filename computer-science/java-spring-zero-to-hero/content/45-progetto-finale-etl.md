---
title: "Progetto finale guidato: ETL bancario notturno"
area: "Esercizi finali"
order: 45
level: "esperto"
summary: "Sviluppa un ETL bancario completo che integra TUTTO il percorso: ingestion da file/API, Spring Batch con partitioning, scrittura su Postgres, REST per monitoring, JWT auth, metriche Prometheus, deploy con Docker, schedulazione, test integrati."
prereq: ["Tutte le sezioni"]
tools: ["JDK 21", "Spring Boot 3.x", "Postgres", "Docker", "Testcontainers"]
---

# Progetto finale: ETL bancario notturno

## Lo scenario

Sei nel team di una banca italiana. Ogni notte arrivano file CSV con le **transazioni del giorno** da 5 filiali. Devi:

1. Scaricarli da un endpoint (simulato locale).
2. Validarli (campi obbligatori, codici ABI corretti, importi positivi).
3. Categorizzarli (entrata/uscita, in base al segno).
4. Caricarli su Postgres in tabella `transactions`.
5. Aggiornare un'aggregata `daily_summary(branch, date, total_in, total_out)`.
6. Notificare via Slack se ci sono errori.
7. Esporre REST per:
   - Vedere lo stato dei job (`GET /batch/runs`).
   - Lanciare manualmente (`POST /batch/run`).
   - Consultare le `daily_summary` (`GET /summary?branch=...&date=...`).
8. JWT auth sui REST.
9. Metriche Prometheus.
10. Dockerizza e deploya.

## Struttura del progetto

```
etl-banca/
├── pom.xml
├── docker-compose.yml
├── src/main/java/it/zth/etl/
│   ├── EtlApp.java                  # @SpringBootApplication
│   ├── domain/
│   │   ├── Transaction.java         # @Entity
│   │   ├── DailySummary.java        # @Entity
│   │   └── Branch.java              # enum
│   ├── batch/
│   │   ├── BatchConfig.java         # Job + Step config
│   │   ├── TxReader.java            # custom reader multi-CSV
│   │   ├── TxProcessor.java         # validation + categorization
│   │   ├── TxWriter.java            # JdbcBatchItemWriter
│   │   ├── SummaryStepConfig.java   # aggregation step
│   │   └── BranchPartitioner.java
│   ├── repo/
│   │   ├── TransactionRepository.java
│   │   └── DailySummaryRepository.java
│   ├── api/
│   │   ├── BatchController.java
│   │   ├── SummaryController.java
│   │   └── ErrorHandler.java
│   ├── notify/
│   │   └── SlackNotifier.java
│   ├── security/
│   │   └── SecurityConfig.java
│   └── ...
└── src/test/java/...
```

## Step principali

### 1. Pom

```xml
<dependencies>
  <dependency>...spring-boot-starter-batch</dependency>
  <dependency>...spring-boot-starter-data-jpa</dependency>
  <dependency>...spring-boot-starter-web</dependency>
  <dependency>...spring-boot-starter-security</dependency>
  <dependency>...spring-boot-starter-oauth2-resource-server</dependency>
  <dependency>...spring-boot-starter-actuator</dependency>
  <dependency>...spring-boot-starter-validation</dependency>
  <dependency>...micrometer-registry-prometheus</dependency>
  <dependency>...postgresql</dependency>
  <dependency>...springdoc-openapi-starter-webmvc-ui</dependency>
  <!-- test -->
  <dependency>...spring-boot-starter-test</dependency>
  <dependency>...spring-batch-test</dependency>
  <dependency>...testcontainers (postgresql, junit-jupiter)</dependency>
</dependencies>
```

### 2. Entità

```java
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id @GeneratedValue Long id;
    @Column(length = 4) String branch;          // "MI01", "RM02", ...
    LocalDate date;
    String accountFrom;
    String accountTo;
    BigDecimal amount;
    String type;                                 // "IN" o "OUT"
    @Column(length = 200) String description;
    Instant createdAt = Instant.now();
}

@Entity
@Table(name = "daily_summary",
    uniqueConstraints = @UniqueConstraint(columnNames = {"branch", "date"}))
public class DailySummary {
    @Id @GeneratedValue Long id;
    String branch;
    LocalDate date;
    BigDecimal totalIn;
    BigDecimal totalOut;
    long count;
}
```

### 3. Batch config (Job + Step)

```java
@Configuration
public class BatchConfig {

    @Bean
    public Job nightlyEtlJob(JobRepository jr, Step ingestStep, Step summaryStep,
                              JobNotifyListener notifier) {
        return new JobBuilder("nightlyEtl", jr)
            .listener(notifier)
            .start(ingestStep)
            .next(summaryStep)
            .build();
    }

    @Bean
    public Step ingestStep(JobRepository jr, PlatformTransactionManager tx,
                           Step ingestSlaveStep, BranchPartitioner partitioner) {
        return new StepBuilder("ingestMaster", jr)
            .partitioner("ingestSlave", partitioner)
            .step(ingestSlaveStep)
            .taskExecutor(new SimpleAsyncTaskExecutor("part-"))
            .gridSize(5)
            .build();
    }

    @Bean
    public Step ingestSlaveStep(JobRepository jr, PlatformTransactionManager tx,
                                 ItemReader<TxRow> reader,
                                 ItemProcessor<TxRow, Transaction> processor,
                                 ItemWriter<Transaction> writer) {
        return new StepBuilder("ingestSlave", jr)
            .<TxRow, Transaction>chunk(500, tx)
            .reader(reader)
            .processor(processor)
            .writer(writer)
            .faultTolerant()
            .skipLimit(100)
            .skip(InvalidTransactionException.class)
            .listener(skipListener)
            .build();
    }
}
```

### 4. Partitioner per filiale

```java
@Component
public class BranchPartitioner implements Partitioner {
    @Override
    public Map<String, ExecutionContext> partition(int gridSize) {
        Map<String, ExecutionContext> m = new HashMap<>();
        for (String b : List.of("MI01", "MI02", "RM01", "TO01", "NA01")) {
            ExecutionContext ec = new ExecutionContext();
            ec.putString("branch", b);
            ec.putString("file", "input/tx-" + b + ".csv");
            m.put("p-" + b, ec);
        }
        return m;
    }
}
```

### 5. Reader stepscoped

```java
@Bean
@StepScope
public FlatFileItemReader<TxRow> reader(@Value("#{stepExecutionContext['file']}") String file) {
    return new FlatFileItemReaderBuilder<TxRow>()
        .name("txReader")
        .resource(new FileSystemResource(file))
        .linesToSkip(1)
        .delimited().delimiter(";")
        .names("branch", "date", "from", "to", "amount", "description")
        .targetType(TxRow.class)
        .build();
}
```

### 6. Processor

```java
@Component
public class TxProcessor implements ItemProcessor<TxRow, Transaction> {
    @Override
    public Transaction process(TxRow row) {
        if (row.amount() == null || row.amount().compareTo(BigDecimal.ZERO) == 0) {
            throw new InvalidTransactionException("amount nullo o zero");
        }
        if (!row.branch().matches("^[A-Z]{2}\\d{2}$")) {
            throw new InvalidTransactionException("filiale invalida: " + row.branch());
        }
        Transaction t = new Transaction();
        t.setBranch(row.branch());
        t.setDate(row.date());
        t.setAccountFrom(row.from());
        t.setAccountTo(row.to());
        t.setAmount(row.amount().abs());
        t.setType(row.amount().signum() > 0 ? "IN" : "OUT");
        t.setDescription(row.description());
        return t;
    }
}
```

### 7. Writer JDBC batch

```java
@Bean
public JdbcBatchItemWriter<Transaction> writer(DataSource ds) {
    return new JdbcBatchItemWriterBuilder<Transaction>()
        .dataSource(ds)
        .sql("""
            INSERT INTO transactions(branch, date, account_from, account_to,
                                       amount, type, description, created_at)
            VALUES (:branch, :date, :accountFrom, :accountTo, :amount, :type, :description, NOW())
            """)
        .beanMapped()
        .build();
}
```

### 8. Step di aggregazione

```java
@Bean
public Step summaryStep(JobRepository jr, PlatformTransactionManager tx,
                         JdbcTemplate jdbc) {
    return new StepBuilder("summary", jr)
        .tasklet((c, ctx) -> {
            jdbc.update("""
                INSERT INTO daily_summary(branch, date, total_in, total_out, count)
                SELECT branch, date,
                    SUM(CASE WHEN type = 'IN' THEN amount ELSE 0 END),
                    SUM(CASE WHEN type = 'OUT' THEN amount ELSE 0 END),
                    COUNT(*)
                FROM transactions
                WHERE created_at >= NOW() - INTERVAL '1 hour'
                GROUP BY branch, date
                ON CONFLICT (branch, date)
                DO UPDATE SET total_in = EXCLUDED.total_in,
                              total_out = EXCLUDED.total_out,
                              count = EXCLUDED.count;
                """);
            return RepeatStatus.FINISHED;
        }, tx)
        .build();
}
```

### 9. REST + Security

```java
@RestController
@RequestMapping("/batch")
@PreAuthorize("hasAuthority('SCOPE_batch:admin')")
public class BatchController {
    private final JobLauncher launcher;
    private final Job nightlyEtlJob;
    private final JobExplorer jobExplorer;

    @PostMapping("/run")
    public Map<String, Object> run() throws Exception {
        var p = new JobParametersBuilder()
            .addLocalDateTime("ts", LocalDateTime.now())
            .toJobParameters();
        var exec = launcher.run(nightlyEtlJob, p);
        return Map.of("id", exec.getId(), "status", exec.getStatus());
    }

    @GetMapping("/runs")
    public List<RunDto> recentRuns() {
        return jobExplorer.getJobInstances("nightlyEtl", 0, 20).stream()
            .flatMap(ji -> jobExplorer.getJobExecutions(ji).stream())
            .map(e -> new RunDto(e.getId(), e.getStatus().name(),
                                 e.getStartTime(), e.getEndTime()))
            .sorted(Comparator.comparing(RunDto::id).reversed())
            .toList();
    }
}

public record RunDto(Long id, String status, LocalDateTime start, LocalDateTime end) {}
```

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain chain(HttpSecurity http) throws Exception {
        return http
            .csrf(c -> c.disable())
            .authorizeHttpRequests(a -> a
                .requestMatchers("/actuator/health", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))
            .build();
    }
}
```

### 10. Schedulazione

```java
@EnableScheduling
@Component
public class Scheduler {

    @Scheduled(cron = "0 0 2 * * *")
    public void runNightly() throws Exception {
        launcher.run(nightlyEtlJob, new JobParametersBuilder()
            .addLocalDate("date", LocalDate.now())
            .toJobParameters());
    }
}
```

### 11. Notifier

```java
@Component
public class JobNotifyListener implements JobExecutionListener {
    private final SlackNotifier slack;

    @Override
    public void afterJob(JobExecution exec) {
        if (exec.getStatus() != BatchStatus.COMPLETED) {
            slack.send(":warning: Job " + exec.getJobInstance().getJobName()
                + " ended " + exec.getStatus()
                + " — errors: " + exec.getAllFailureExceptions());
        }
    }
}
```

### 12. Docker

`Dockerfile`:
```dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/etl-banca.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-Xms512m","-Xmx1g","-XX:+HeapDumpOnOutOfMemoryError","-XX:+ExitOnOutOfMemoryError","-jar","app.jar"]
```

`docker-compose.yml`:
```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: etl
      POSTGRES_USER: etl
      POSTGRES_PASSWORD: etl
    ports: ["5432:5432"]
    volumes: [pgdata:/var/lib/postgresql/data]

  prometheus:
    image: prom/prometheus
    ports: ["9090:9090"]
    volumes: [./prometheus.yml:/etc/prometheus/prometheus.yml]

  grafana:
    image: grafana/grafana
    ports: ["3000:3000"]

  etl:
    build: .
    depends_on: [db]
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/etl
      SPRING_DATASOURCE_USERNAME: etl
      SPRING_DATASOURCE_PASSWORD: etl
    ports: ["8080:8080"]

volumes:
  pgdata:
```

### 13. Test integrati

```java
@SpringBootTest
@SpringBatchTest
@Testcontainers
class NightlyEtlJobTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    @Autowired JobLauncherTestUtils utils;
    @Autowired TransactionRepository txRepo;

    @Test
    void ingest_all_branches() throws Exception {
        // i CSV di test sono in src/test/resources/input/
        JobExecution exec = utils.launchJob();
        assertThat(exec.getStatus()).isEqualTo(BatchStatus.COMPLETED);
        assertThat(txRepo.count()).isEqualTo(EXPECTED_TOTAL);
    }
}
```

## Cosa fare per consegnare il progetto

1. Cloni o crei la struttura sopra.
2. Setup DB con `docker-compose up db`.
3. Schema iniziale con **Flyway** in `src/main/resources/db/migration/V1__init.sql`.
4. Implementa la logica step by step.
5. Testa ogni step da solo (`@SpringBatchTest`).
6. Test integrato end-to-end con Testcontainers.
7. `docker-compose up` per girare tutto insieme.
8. Apri `http://localhost:8080/swagger-ui.html` per testare l'API.
9. Apri `http://localhost:9090` per Prometheus, `http://localhost:3000` per Grafana.
10. Configura `Scheduler` o lancia manualmente da REST.

## Estensioni (livello senior)

- **Idempotency**: usa `INSERT ... ON CONFLICT` su `transactions(branch, source_tx_id)`.
- **Restart-safe**: il job rilanciato non duplica.
- **Multi-tenant**: ogni cliente ha le sue tabelle / schema.
- **Audit trail**: ogni modifica scrive su `audit_log`.
- **Reconciliation**: confronto giornaliero con file della banca centrale.
- **Reactive notifications**: SSE su `/runs/{id}/stream` per vedere il progresso del job in tempo reale.
- **Multi-region**: due cluster K8s, ogni transazione replicata su entrambi.

## Cosa hai dimostrato di saper fare

Se sei arrivato qui, hai integrato:

- Java moderno (record, sealed, switch espressione).
- JVM tuning di base.
- JDBC, JPA, indici SQL.
- Spring Core (DI, AOP, transazioni).
- Spring Boot + Actuator.
- Spring Data JPA + Specifications.
- Spring MVC + validation + OpenAPI.
- Spring Security con JWT.
- Spring Batch profondo: partitioning, skip, restart, listener.
- Metriche Micrometer + Prometheus.
- Test integrati con Testcontainers.
- Docker + docker-compose.

Sei pronto per il ruolo. **Congratulazioni**: hai chiuso il percorso.
