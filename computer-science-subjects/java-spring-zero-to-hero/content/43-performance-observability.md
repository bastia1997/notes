---
title: "Performance tuning e observability production-grade"
area: "Patterns & Best Practices"
order: 43
level: "esperto"
summary: "JVM tuning per server. Caching (Caffeine, Redis). Connection pool tuning. Logging strutturato (logback + JSON). Tracing distribuito con OpenTelemetry. Metriche dorate (RED, USE). Production checklist completa."
prereq: ["Sezione 42"]
tools: ["JDK 21", "Micrometer", "OpenTelemetry"]
---

# Performance tuning e observability production-grade

## JVM tuning di base per server

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

Spiegazione:
- `-Xms == -Xmx`: niente resize a runtime.
- `G1GC` con target 200ms: default sensato per server.
- `UseStringDeduplication`: G1 cerca String duplicate, le condivide.
- `HeapDumpOnOutOfMemoryError`: dump al crash, indispensabile.
- `ExitOnOutOfMemoryError`: termina (K8s/Docker fa il restart) invece di restare in stato corrotto.

## Caching

### Caffeine (in-memory, locale)

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

O via Spring `@Cacheable`:

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

### Redis (distribuito)

Per cache condivisa fra istanze:

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
      maximum-pool-size: 20         # max connessioni
      minimum-idle: 5
      connection-timeout: 30000      # ms attesa per get connection
      idle-timeout: 600000           # idle connection chiusa dopo
      max-lifetime: 1800000          # connection max age
      leak-detection-threshold: 60000
```

Dimensionamento: `connections = ((core_count * 2) + effective_spindle_count)` come **punto di partenza**. Per app I/O-bound, di più.

Trappola: pool troppo grande ⟶ DB sotto pressione, lock, latenza peggiore.

## Logging strutturato

`logback-spring.xml`:

```xml
<configuration>
  <appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
  </appender>
  <root level="INFO"><appender-ref ref="JSON"/></root>
</configuration>
```

Output JSON per riga ⟶ parse-friendly per ELK/Datadog/Splunk.

Aggiungi contesto con MDC:

```java
MDC.put("orderId", order.id().toString());
try {
    log.info("processing");
} finally {
    MDC.clear();
}
```

`%X{orderId}` nel pattern lo include.

## Tracing distribuito

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
      probability: 1.0    # in dev; in prod 0.1 o lower
  otlp:
    tracing:
      endpoint: http://tempo:4318/v1/traces
```

Spring Boot 3 propaga `traceId` automaticamente via `traceparent` header (W3C trace context). Vedi tutta la pipeline in **Tempo** o **Jaeger**.

## Metriche dorate

### RED (per servizi)

- **R**equests per second
- **E**rrors per second
- **D**uration (latency percentile p50, p95, p99)

### USE (per risorse)

- **U**tilization (% di uso)
- **S**aturation (coda di richieste pendenti)
- **E**rrors

Tipici dashboard Grafana:
- p99 latency `http_server_requests_seconds`
- Errore rate per endpoint
- JVM heap usage
- GC pause time
- Connessioni pool DB attive/idle

## Production checklist

### 🔴 Critici

- [ ] **Health endpoint** (`/actuator/health`).
- [ ] **Metriche Prometheus** (`/actuator/prometheus`).
- [ ] **Logging JSON** strutturato.
- [ ] **`-Xms == -Xmx`** in JVM args.
- [ ] **`HeapDumpOnOutOfMemoryError`** abilitato.
- [ ] **Backup automatico** del DB.
- [ ] **TLS** su tutte le comunicazioni esterne.
- [ ] **Secret** non in repo (vault).

### 🟡 Importanti

- [ ] **Circuit breaker** su client HTTP esterni.
- [ ] **Retry esponenziale** su chiamate transient-error.
- [ ] **Timeout** ovunque (HTTP client, DB query, Kafka send).
- [ ] **Idempotency** key su POST critici.
- [ ] **Rate limit** sui client.
- [ ] **CORS** configurato correttamente.
- [ ] **CSP headers**.
- [ ] **Audit log** delle azioni di scrittura sensibili.

### 🟢 Best practice

- [ ] **Smoke test** al deploy.
- [ ] **Blue/green** o **rolling** deploy.
- [ ] **DB migration** automatiche (Flyway/Liquibase).
- [ ] **Runbook** scritto per i job critici.
- [ ] **Alert** su SLO violati.
- [ ] **Disaster recovery** test annuale.

## Esercizi

<details>
<summary>Es 43.1 — Cache con Caffeine</summary>

Aggiungi `@Cacheable` su `CustomerService.get(long)`. Verifica nei log che la seconda chiamata non fa query.

</details>

<details>
<summary>Es 43.2 — JSON logging</summary>

Configura logback con `LogstashEncoder`. Aggiungi MDC con `requestId`.

</details>

<details>
<summary>Es 43.3 — Dashboard Grafana</summary>

Espone `/actuator/prometheus`. Importa una dashboard Spring Boot da grafana.com. Vedi heap usage, req/s, p95 latency.

</details>

## Cosa devi portarti via

- JVM tuning di base: heap fisso, G1 con target pausa.
- Cache: Caffeine in locale, Redis distribuito.
- Logging JSON + MDC + tracing OpenTelemetry.
- RED + USE metriche.
- Production checklist: 25+ punti da verificare al go-live.

Prossimo: esercizi di sintesi.
