---
title: "Final guided project: nightly bank ETL"
area: "Final exercises"
order: 45
level: "expert"
summary: "Build a complete bank ETL integrating EVERYTHING in the path: file/API ingestion, Spring Batch with partitioning, Postgres writes, REST for monitoring, JWT auth, Prometheus metrics, Docker deploy, scheduling, integration tests."
prereq: ["All sections"]
tools: ["JDK 21", "Spring Boot 3.x", "Postgres", "Docker", "Testcontainers"]
---

# Final project: nightly bank ETL

## Scenario

You're on the team of an Italian bank. Each night CSV files arrive with **daily transactions** from 5 branches. You must:

1. Download from an endpoint (locally simulated).
2. Validate (required fields, correct ABI codes, positive amounts).
3. Categorize (in/out based on sign).
4. Load into Postgres table `transactions`.
5. Update aggregate `daily_summary(branch, date, total_in, total_out)`.
6. Notify via Slack on errors.
7. Expose REST for:
   - Job status (`GET /batch/runs`).
   - Manual run (`POST /batch/run`).
   - Query `daily_summary` (`GET /summary?branch=...&date=...`).
8. JWT auth on REST.
9. Prometheus metrics.
10. Dockerize and deploy.

## Project layout

```
etl-bank/
├── pom.xml
├── docker-compose.yml
├── src/main/java/it/zth/etl/
│   ├── EtlApp.java
│   ├── domain/
│   │   ├── Transaction.java
│   │   ├── DailySummary.java
│   │   └── Branch.java
│   ├── batch/
│   │   ├── BatchConfig.java
│   │   ├── TxReader.java
│   │   ├── TxProcessor.java
│   │   ├── TxWriter.java
│   │   ├── SummaryStepConfig.java
│   │   └── BranchPartitioner.java
│   ├── repo/
│   ├── api/
│   ├── notify/
│   ├── security/
│   └── ...
└── src/test/java/...
```

## Main steps

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
  <dependency>...spring-boot-starter-test</dependency>
  <dependency>...spring-batch-test</dependency>
  <dependency>...testcontainers (postgresql, junit-jupiter)</dependency>
</dependencies>
```

### 2. Entities

```java
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id @GeneratedValue Long id;
    @Column(length = 4) String branch;
    LocalDate date;
    String accountFrom;
    String accountTo;
    BigDecimal amount;
    String type;
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

### 3. Batch config

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
            .build();
    }
}
```

### 4. Branch partitioner

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

### 5. Step-scoped reader

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
            throw new InvalidTransactionException("null or zero amount");
        }
        if (!row.branch().matches("^[A-Z]{2}\\d{2}$")) {
            throw new InvalidTransactionException("invalid branch: " + row.branch());
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

### 7. JDBC batch writer

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

### 8. Aggregation step

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

### 10. Scheduling

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
                + " ended " + exec.getStatus());
        }
    }
}
```

### 12. Docker

`Dockerfile`:
```dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/etl-bank.jar app.jar
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

  prometheus:
    image: prom/prometheus
    ports: ["9090:9090"]

  grafana:
    image: grafana/grafana
    ports: ["3000:3000"]

  etl:
    build: .
    depends_on: [db]
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/etl
    ports: ["8080:8080"]
```

### 13. Integration tests

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
        JobExecution exec = utils.launchJob();
        assertThat(exec.getStatus()).isEqualTo(BatchStatus.COMPLETED);
        assertThat(txRepo.count()).isEqualTo(EXPECTED_TOTAL);
    }
}
```

## Delivery checklist

1. Clone or build the layout above.
2. DB setup: `docker-compose up db`.
3. Initial schema with **Flyway** in `src/main/resources/db/migration/V1__init.sql`.
4. Implement step by step.
5. Test each step on its own (`@SpringBatchTest`).
6. End-to-end integration test with Testcontainers.
7. `docker-compose up` for the full stack.
8. Open `http://localhost:8080/swagger-ui.html` to test the API.
9. `http://localhost:9090` for Prometheus, `http://localhost:3000` for Grafana.
10. Run via `Scheduler` or manually from REST.

## Senior-level extensions

- **Idempotency**: `INSERT ... ON CONFLICT` on `transactions(branch, source_tx_id)`.
- **Restart-safe**: relaunch never duplicates.
- **Multi-tenant**: per-customer tables/schemas.
- **Audit trail**: every modification logged to `audit_log`.
- **Reconciliation**: daily compare with central bank file.
- **Reactive notifications**: SSE on `/runs/{id}/stream` to watch progress live.
- **Multi-region**: two K8s clusters, each transaction replicated.

## What you've demonstrated

If you got here, you've integrated:

- Modern Java (records, sealed, switch expressions).
- Basic JVM tuning.
- JDBC, JPA, SQL indexes.
- Spring Core (DI, AOP, transactions).
- Spring Boot + Actuator.
- Spring Data JPA + Specifications.
- Spring MVC + validation + OpenAPI.
- Spring Security with JWT.
- Deep Spring Batch: partitioning, skip, restart, listeners.
- Micrometer + Prometheus metrics.
- Integration tests with Testcontainers.
- Docker + docker-compose.

You're ready for the role. **Congratulations**: you've finished the path.
