---
title: "Spring Boot: auto-configuration, starters, Actuator"
area: "Spring Core"
order: 26
level: "intermediate"
summary: "Spring Boot = Spring + opinions + auto-config. Starter dependencies. Auto-configuration: how it works, how to exclude. Embedded server (Tomcat). Actuator: health, metrics, info endpoints. Executable JAR."
prereq: ["Section 25"]
tools: ["Spring Boot 3.x", "Maven or Gradle"]
---

# Spring Boot: auto-configuration, starters, Actuator

## What Spring Boot is

Spring Boot **isn't** a different framework: it's Spring + **opinions** + **auto-configuration**. Solves the "I spent 3 weeks configuring Spring" problem.

3 key ideas:
1. **Starters**: "all included" dependencies.
2. **Auto-configuration**: beans created automatically based on classpath.
3. **Embedded server**: Tomcat inside the JAR, no WAR on app server.

## Starters

Instead of pinning 15 versioned dependencies, include ONE starter:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Brings: Spring MVC, Tomcat, Jackson, validation, slf4j, ... coordinated versions.

Common starters:
- `spring-boot-starter-web` — REST/MVC + Tomcat
- `spring-boot-starter-data-jpa` — JPA + Hibernate
- `spring-boot-starter-security` — Spring Security
- `spring-boot-starter-test` — JUnit + Mockito + AssertJ + Testcontainers
- `spring-boot-starter-actuator` — monitoring endpoints
- `spring-boot-starter-batch` — Spring Batch
- `spring-boot-starter-validation` — Bean Validation

## Auto-configuration

On startup, Spring Boot scans `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` from each jar. Each autoconfig is a `@Configuration` class with `@ConditionalOn*`:

```java
@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
public class DataSourceAutoConfiguration {
    @Bean
    public DataSource dataSource(DataSourceProperties props) { ... }
}
```

In practice: "if there's a JDBC driver on the classpath and you haven't already defined a `DataSource`, I create one for you".

### See what was auto-configured

```yaml
debug: true
```
Or `--debug`. Prints the **Conditions Evaluation Report**.

### Excluding

```java
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
```
Or:
```yaml
spring:
  autoconfigure:
    exclude: org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
```

## Embedded server

```yaml
server:
  port: 8080
  servlet:
    context-path: /api
  tomcat:
    threads:
      max: 200
```

`mvn spring-boot:run` ⟶ Tomcat starts on port 8080.

Switch server without code changes:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <exclusions>
    <exclusion>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
    </exclusion>
  </exclusions>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```

## Executable jar

```powershell
mvn package
java -jar target/myapp-1.0.0.jar
```

Spring Boot creates a "fat jar" with all dependencies. No application server.

## Spring Boot Actuator

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Exposes endpoints under `/actuator/`:

| Endpoint | Purpose |
|---|---|
| `/actuator/health` | App status (UP/DOWN), K8s liveness/readiness |
| `/actuator/info` | Build/version info |
| `/actuator/metrics` | Metric list; `/actuator/metrics/jvm.memory.used` |
| `/actuator/loggers` | Live log level changes |
| `/actuator/threaddump` | Thread dump JSON |
| `/actuator/heapdump` | Heap dump (.hprof) |
| `/actuator/env` | All resolved properties |
| `/actuator/beans` | All loaded beans |
| `/actuator/mappings` | All MVC endpoints |

Config:
```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized
```

> Health check + Prometheus metrics: the minimum to go to production.

## Micrometer: metrics

Spring Boot includes Micrometer. To export to Prometheus:

```xml
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

```yaml
management:
  endpoints.web.exposure.include: prometheus
```

`GET /actuator/prometheus` ⟶ Prometheus text format.

Custom metrics:

```java
@Service
public class OrderService {
    private final Counter orders;

    public OrderService(MeterRegistry mr) {
        this.orders = mr.counter("orders.placed");
    }

    public void place(Order o) {
        orders.increment();
    }
}
```

## DevTools (development)

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <scope>runtime</scope>
  <optional>true</optional>
</dependency>
```

Auto-restart on class change, browser live-reload.

## Exercises

<details>
<summary>Ex 26.1 — REST + Actuator</summary>

Build an app with a `@RestController` "GET /hello". Add Actuator, expose `health,info,metrics`. Verify `/actuator/health`.

</details>

<details>
<summary>Ex 26.2 — Custom metric</summary>

Add a `Counter` `hello.calls` incremented on each call. Verify via `/actuator/metrics/hello.calls`.

</details>

<details>
<summary>Ex 26.3 — Dev profile with devtools</summary>

Run in `dev` profile with devtools. Edit a Controller: see auto-restart.

</details>

## Take-aways

- Spring Boot = Spring + opinions + auto-config.
- Include **starters**, not single libraries.
- Auto-configuration via `@ConditionalOn*`.
- Embedded Tomcat ⟶ `java -jar` is enough.
- **Actuator** for health/metrics ⟶ mandatory in production.
- Micrometer + Prometheus for Grafana dashboards.

Next: Spring Data JPA — repositories, pagination, specifications.
