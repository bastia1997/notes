---
title: "Spring Boot: auto-configuration, starters, Actuator"
area: "Spring Core"
order: 26
level: "intermedio"
summary: "Spring Boot = Spring + opinioni + auto-config. Starter dependencies. Auto-configuration: come funziona, come escluderla. Embedded server (Tomcat). Actuator: endpoint di health, metrics, info. Build di un jar eseguibile."
prereq: ["Sezione 25"]
tools: ["Spring Boot 3.x", "Maven o Gradle"]
---

# Spring Boot: auto-configuration, starters, Actuator

## Cos'è Spring Boot

Spring Boot **non è** un framework diverso da Spring: è Spring + **opinioni** + **auto-configurazione**. Risolve il "ho impiegato 3 settimane a configurare Spring".

3 idee chiave:
1. **Starters**: dipendenze "tutto incluso".
2. **Auto-configuration**: bean creati automaticamente in base al classpath.
3. **Embedded server**: Tomcat dentro il JAR, niente WAR su application server.

## Starter

Invece di mettere 15 dipendenze coordinate, includi UNO starter:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Ti porta dentro: Spring MVC, Tomcat, Jackson, validation, slf4j, ... versioni coordinate, testate insieme.

Starters comuni:
- `spring-boot-starter-web` — REST/MVC + Tomcat
- `spring-boot-starter-data-jpa` — JPA + Hibernate
- `spring-boot-starter-security` — Spring Security
- `spring-boot-starter-test` — JUnit + Mockito + AssertJ + Testcontainers integration
- `spring-boot-starter-actuator` — endpoint di monitoring
- `spring-boot-starter-batch` — Spring Batch
- `spring-boot-starter-validation` — Bean Validation

## Auto-configuration

Quando avvii, Spring Boot scansiona `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` da ogni jar. Ogni autoconfig è una classe `@Configuration` con `@ConditionalOn*`:

```java
@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
public class DataSourceAutoConfiguration {
    @Bean
    public DataSource dataSource(DataSourceProperties props) { ... }
}
```

In pratica: "se hai un driver JDBC nel classpath e non hai già definito tu un `DataSource`, te ne creo uno".

### Vedere cosa è auto-configurato

```yaml
debug: true
```
Oppure `--debug` da CLI. Stampa il **Conditions Evaluation Report**.

### Escludere

```java
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
```
O:
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

`mvn spring-boot:run` ⟶ Tomcat parte sulla porta 8080.

Cambi server senza modificare codice:

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

## Jar eseguibile

```powershell
mvn package
java -jar target/myapp-1.0.0.jar
```

Spring Boot crea un "fat jar" con tutte le dipendenze incluse. Niente application server.

## Spring Boot Actuator

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Espone endpoint sotto `/actuator/`:

| Endpoint | Cosa fa |
|---|---|
| `/actuator/health` | Stato app (UP/DOWN), liveness/readiness K8s |
| `/actuator/info` | Info build, version |
| `/actuator/metrics` | Lista metriche; `/actuator/metrics/jvm.memory.used` |
| `/actuator/loggers` | Modifica livelli log a caldo |
| `/actuator/threaddump` | Thread dump JSON |
| `/actuator/heapdump` | Heap dump (.hprof) |
| `/actuator/env` | Tutte le properties risolte |
| `/actuator/beans` | Tutti i bean caricati |
| `/actuator/mappings` | Tutti gli endpoint MVC |

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

> Health check + metriche Prometheus: il minimo per andare in produzione.

## Micrometer: metriche

Spring Boot include Micrometer. Per esportare a Prometheus:

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

`GET /actuator/prometheus` ⟶ formato testo Prometheus.

Metriche custom:

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

## DevTools (sviluppo)

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <scope>runtime</scope>
  <optional>true</optional>
</dependency>
```

Restart automatico al cambio classi, live-reload browser.

## Esercizi

<details>
<summary>Es 26.1 — REST + Actuator</summary>

Crea un'app con un `@RestController` "GET /hello". Aggiungi Actuator, esponi `health,info,metrics`. Verifica `/actuator/health`.

</details>

<details>
<summary>Es 26.2 — Custom metric</summary>

Aggiungi un `Counter` `hello.calls` che si incrementa ad ogni chiamata. Verifica via `/actuator/metrics/hello.calls`.

</details>

<details>
<summary>Es 26.3 — Profilo dev con devtools</summary>

Lancia in profilo `dev` con devtools. Modifica un Controller: vedi il restart automatico.

</details>

## Cosa devi portarti via

- Spring Boot = Spring + opinioni + auto-config.
- Includi **starters**, non singole librerie.
- Auto-configurazione via `@ConditionalOn*`.
- Embedded Tomcat ⟶ `java -jar` basta.
- **Actuator** per health/metrics ⟶ obbligatorio in produzione.
- Micrometer + Prometheus per dashboard Grafana.

Prossimo: Spring Data JPA — repository, paginazione, specification.
