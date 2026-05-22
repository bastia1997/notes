---
title: "Production-grade performance tuning and observability"
area: "Patterns & Best Practices"
order: 43
level: "expert"
summary: "JVM tuning for servers. Caching (Caffeine, Redis). Connection pool tuning. Structured logging (logback + JSON). Distributed tracing with OpenTelemetry. Golden metrics (RED, USE). Full production checklist."
prereq: ["Section 42"]
tools: ["JDK 21", "Micrometer", "OpenTelemetry"]
---

# Production-grade performance and observability

## Basic JVM tuning for servers

```powershell
java \
  -Xms2g -Xmx2g \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UseStringDeduplication \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:HeapDumpPath=/var/log/heap.hprof \
  -XX:+ExitOnOutOfMemoryError \
  -XX:NativeMemoryTracking=summary \
  -Dfile.encoding=UTF-8 \
  -jar app.jar
```

- `-Xms == -Xmx`: no runtime resize.
- `G1GC` with 200ms target: sensible default for servers.
- `UseStringDeduplication`: G1 finds duplicate Strings, shares them.
- `HeapDumpOnOutOfMemoryError`: dump on crash, essential.
- `ExitOnOutOfMemoryError`: terminate (K8s/Docker restarts) instead of remaining in a corrupted state.

## Caching

### Caffeine (in-memory, local)

```xml
<dependency>
  <groupId>com.github.ben-manes.caffeine</groupId>
  <artifactId>caffeine</artifactId>
</dependency>
```

```java
@Service
public class CustomerService {
    private final Cache<Long, Customer> cache = Caffeine.newBuilder()
        .maximumSize(10_000)
        .expireAfterWrite(Duration.ofMinutes(10))
        .recordStats()
        .build();

    public Customer get(long id) {
        return cache.get(id, this::loadFromDb);
    }
}
```

Or via Spring `@Cacheable`:

```yaml
spring:
  cache:
    type: caffeine
    caffeine:
      spec: maximumSize=10000,expireAfterWrite=10m
```

```java
@Cacheable("customers")
public Customer get(long id) { return repo.findById(id).orElseThrow(); }

@CacheEvict("customers")
public void update(Customer c) { repo.save(c); }
```

### Redis (distributed)

For cache shared across instances:

```yaml
spring:
  cache:
    type: redis
  data:
    redis:
      host: redis
      port: 6379
```

## Connection pool (HikariCP)

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
      leak-detection-threshold: 60000
```

Sizing: `connections = ((core_count * 2) + effective_spindle_count)` as a **starting point**. More for I/O-bound apps.

Trap: pool too big ⟶ DB under pressure, locks, worse latency.

## Structured logging

`logback-spring.xml`:

```xml
<configuration>
  <appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
  </appender>
  <root level="INFO"><appender-ref ref="JSON"/></root>
</configuration>
```

JSON per line ⟶ parse-friendly for ELK/Datadog/Splunk.

Add context with MDC:

```java
MDC.put("orderId", order.id().toString());
try {
    log.info("processing");
} finally {
    MDC.clear();
}
```

`%X{orderId}` in pattern includes it.

## Distributed tracing

```xml
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-tracing-bridge-otel</artifactId>
</dependency>
<dependency>
  <groupId>io.opentelemetry</groupId>
  <artifactId>opentelemetry-exporter-otlp</artifactId>
</dependency>
```

```yaml
management:
  tracing:
    sampling:
      probability: 1.0    # in dev; in prod 0.1 or lower
  otlp:
    tracing:
      endpoint: http://tempo:4318/v1/traces
```

Spring Boot 3 propagates `traceId` automatically via `traceparent` header (W3C trace context). See the full pipeline in **Tempo** or **Jaeger**.

## Golden metrics

### RED (for services)

- **R**equests per second
- **E**rrors per second
- **D**uration (latency percentile p50, p95, p99)

### USE (for resources)

- **U**tilization (% of use)
- **S**aturation (queued requests)
- **E**rrors

Typical Grafana dashboards:
- p99 latency `http_server_requests_seconds`
- Error rate per endpoint
- JVM heap usage
- GC pause time
- DB pool active/idle

## Production checklist

### 🔴 Critical

- [ ] **Health endpoint** (`/actuator/health`).
- [ ] **Prometheus metrics** (`/actuator/prometheus`).
- [ ] **Structured JSON logging**.
- [ ] **`-Xms == -Xmx`** in JVM args.
- [ ] **`HeapDumpOnOutOfMemoryError`** enabled.
- [ ] **Automatic DB backup**.
- [ ] **TLS** on all external comms.
- [ ] **Secrets** not in repo (vault).

### 🟡 Important

- [ ] **Circuit breaker** on external HTTP clients.
- [ ] **Exponential retry** on transient errors.
- [ ] **Timeouts** everywhere (HTTP, DB, Kafka).
- [ ] **Idempotency** key on critical POSTs.
- [ ] **Rate limit** on clients.
- [ ] **CORS** correctly configured.
- [ ] **CSP headers**.
- [ ] **Audit log** of sensitive write actions.

### 🟢 Best practices

- [ ] **Smoke test** at deploy.
- [ ] **Blue/green** or **rolling** deploy.
- [ ] **DB migrations** automated (Flyway/Liquibase).
- [ ] **Runbooks** for critical jobs.
- [ ] **Alerts** on SLO violations.
- [ ] **Disaster recovery** test annually.

## Exercises

<details>
<summary>Ex 43.1 — Caching with Caffeine</summary>

Add `@Cacheable` on `CustomerService.get(long)`. Verify in logs that the second call doesn't query.

</details>

<details>
<summary>Ex 43.2 — JSON logging</summary>

Configure logback with `LogstashEncoder`. Add MDC with `requestId`.

</details>

<details>
<summary>Ex 43.3 — Grafana dashboard</summary>

Expose `/actuator/prometheus`. Import a Spring Boot dashboard from grafana.com. See heap, req/s, p95 latency.

</details>

## Take-aways

- Basic JVM tuning: fixed heap, G1 with pause target.
- Cache: Caffeine local, Redis distributed.
- JSON logging + MDC + OpenTelemetry tracing.
- RED + USE metrics.
- Production checklist: 25+ items to verify at go-live.

Next: synthesis exercises.
