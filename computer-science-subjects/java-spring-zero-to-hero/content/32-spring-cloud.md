---
title: "Spring Cloud: Config Server, Discovery, Gateway, Resilience4j"
area: "Security & Cloud"
order: 32
level: "avanzato"
summary: "Architettura microservizi e cosa portare. Spring Cloud Config (configurazione centralizzata), Eureka/Consul (discovery), Spring Cloud Gateway (API gateway), Resilience4j (circuit breaker, retry, bulkhead), distributed tracing."
prereq: ["Sezione 31"]
tools: ["Spring Cloud 2024.x"]
---

# Spring Cloud: microservizi con Spring

## Microservizi: serve davvero?

Distribuire un'app in N servizi ha **costo**:
- Latenza di rete fra servizi.
- Tracing distribuito (devi configurarlo).
- Deploy coordinati.
- Schema database condiviso/separato.
- Failure cascading.

> **Regola pratica**: parti **monolitico**. Splitta in microservizi solo quando hai problemi concreti che lo motivano (team multipli, scaling differenziato, ecc.). "Microservizi perché tutti li fanno" porta a tragedia.

## Spring Cloud Config

Centralizza la configurazione in un repository git.

Server:
```java
@SpringBootApplication
@EnableConfigServer
public class ConfigServer {}
```

```yaml
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/acme/config-repo
```

Il repo contiene `myapp-prod.yml`, `myapp-dev.yml`, ...

Client:
```yaml
spring:
  application:
    name: myapp
  config:
    import: configserver:http://config.acme.com
```

## Service discovery

In un'architettura microservizi, gli IP cambiano: il servizio A non chiama B su `http://10.0.1.42:8080`, ma chiede al **discovery server**.

### Eureka (Netflix, ancora supportato)

Server:
```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaApp {}
```

Client:
```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

I client si registrano automaticamente. Altri servizi li trovano per `serviceId`.

Alternative: **Consul**, **Kubernetes service discovery** (DNS interno) — il futuro è più verso questi.

## Spring Cloud Gateway

API gateway: punto unico per le richieste in entrata, fa routing, autenticazione, rate limiting.

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: orders
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - StripPrefix=2
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
```

## Resilience4j: circuit breaker, retry, bulkhead

```xml
<dependency>
  <groupId>io.github.resilience4j</groupId>
  <artifactId>resilience4j-spring-boot3</artifactId>
</dependency>
```

```java
@Service
public class CustomerClient {

    @CircuitBreaker(name = "customers", fallbackMethod = "fallback")
    @Retry(name = "customers")
    @TimeLimiter(name = "customers")
    public CompletableFuture<Customer> get(long id) {
        return webClient.get().uri("/{id}", id).retrieve().bodyToMono(Customer.class).toFuture();
    }

    public CompletableFuture<Customer> fallback(long id, Throwable t) {
        return CompletableFuture.completedFuture(Customer.cached(id));
    }
}
```

```yaml
resilience4j:
  circuitbreaker:
    instances:
      customers:
        slidingWindowSize: 10
        failureRateThreshold: 50
        waitDurationInOpenState: 30s
  retry:
    instances:
      customers:
        maxAttempts: 3
        waitDuration: 200ms
```

## Distributed tracing

OpenTelemetry + Micrometer Tracing + Tempo/Jaeger.

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

Spring Boot 3 propaga automaticamente `traceId` fra chiamate (header `traceparent`).

In log:
```yaml
logging:
  pattern:
    level: '%5p [%X{traceId:-},%X{spanId:-}]'
```

## Esercizi

<details>
<summary>Es 32.1 — Config Server</summary>

Avvia un Config Server con repo locale (`file:///c:/Users/.../config-repo`). Una webapp client legge `app.message` dal config server.

</details>

<details>
<summary>Es 32.2 — Circuit breaker</summary>

Servizio che chiama un endpoint volutamente fallibile. Aggiungi `@CircuitBreaker` con fallback. Verifica che dopo N fallimenti l'open-state interviene.

</details>

<details>
<summary>Es 32.3 — Gateway + 2 backend</summary>

Spring Cloud Gateway che ruta `/api/a/**` su un service A e `/api/b/**` su B.

</details>

## Cosa devi portarti via

- Microservizi: aggiungi complessità. Parti monolitico.
- Spring Cloud Config per configurazione centralizzata.
- Service discovery: Eureka o (meglio) Kubernetes DNS.
- Spring Cloud Gateway per routing/rate limit/auth all'ingresso.
- **Resilience4j** in OGNI client HTTP fra servizi.
- OpenTelemetry per tracing distribuito.

Prossimo: testing — JUnit 5, Mockito, Testcontainers.
