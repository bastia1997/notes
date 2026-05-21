---
title: "Spring Cloud: Config Server, Discovery, Gateway, Resilience4j"
area: "Security & Cloud"
order: 32
level: "advanced"
summary: "Microservice architecture and trade-offs. Spring Cloud Config (centralized configuration), Eureka/Consul (discovery), Spring Cloud Gateway (API gateway), Resilience4j (circuit breaker, retry, bulkhead), distributed tracing."
prereq: ["Section 31"]
tools: ["Spring Cloud 2024.x"]
---

# Spring Cloud: microservices with Spring

## Microservices: do you really need them?

Splitting an app into N services has a **cost**:
- Inter-service network latency.
- Distributed tracing (configure it).
- Coordinated deploys.
- Shared/separated DB schemas.
- Cascading failures.

> **Rule of thumb**: start **monolithic**. Split into microservices only when concrete problems motivate it (multiple teams, differentiated scaling, ...). "Microservices because everyone does" leads to tragedy.

## Spring Cloud Config

Centralize configuration in a git repo.

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

Repo contains `myapp-prod.yml`, `myapp-dev.yml`, ...

Client:
```yaml
spring:
  application:
    name: myapp
  config:
    import: configserver:http://config.acme.com
```

## Service discovery

With microservices, IPs change: service A doesn't call B at `http://10.0.1.42:8080`, it asks the **discovery server**.

### Eureka (Netflix, still supported)

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

Clients auto-register. Other services find them by `serviceId`.

Alternatives: **Consul**, **Kubernetes service discovery** (internal DNS) — the future is more this.

## Spring Cloud Gateway

API gateway: single entry point for incoming requests, does routing, auth, rate limiting.

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

Spring Boot 3 propagates `traceId` automatically across calls (header `traceparent`).

In logs:
```yaml
logging:
  pattern:
    level: '%5p [%X{traceId:-},%X{spanId:-}]'
```

## Exercises

<details>
<summary>Ex 32.1 — Config Server</summary>

Run a Config Server with a local repo. A client webapp reads `app.message` from it.

</details>

<details>
<summary>Ex 32.2 — Circuit breaker</summary>

Service calling a deliberately-failing endpoint. Add `@CircuitBreaker` with fallback. Verify after N failures open-state triggers.

</details>

<details>
<summary>Ex 32.3 — Gateway + 2 backends</summary>

Spring Cloud Gateway routing `/api/a/**` to A and `/api/b/**` to B.

</details>

## Take-aways

- Microservices: add complexity. Start monolithic.
- Spring Cloud Config for centralized configuration.
- Service discovery: Eureka or (better) Kubernetes DNS.
- Spring Cloud Gateway for routing/rate-limit/auth at the edge.
- **Resilience4j** on EVERY inter-service HTTP client.
- OpenTelemetry for distributed tracing.

Next: testing — JUnit 5, Mockito, Testcontainers.
