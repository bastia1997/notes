---
title: "Configurazione: Java config, @ComponentScan, profili, conditionals, properties"
area: "Spring Core"
order: 24
level: "intermedio"
summary: "Java config con @Configuration/@Bean, @ComponentScan, @Import. application.properties e application.yml, @Value, @ConfigurationProperties. @Profile e @Conditional. Esternalizzazione."
prereq: ["Sezione 23"]
tools: ["Spring Boot 3.x"]
---

# Configurazione: Java config, properties, profili, conditionals

## Java config: l'unica che ti serve nel 2026

```java
@Configuration
@ComponentScan("it.zth.app")
@PropertySource("classpath:custom.properties")
public class AppConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper m = new ObjectMapper();
        m.registerModule(new JavaTimeModule());
        m.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return m;
    }

    @Bean(destroyMethod = "close")
    public DataSource dataSource(@Value("${db.url}") String url,
                                  @Value("${db.user}") String user,
                                  @Value("${db.pwd}") String pwd) {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(url); ds.setUsername(user); ds.setPassword(pwd);
        return ds;
    }
}
```

In Spring Boot, `@SpringBootApplication` include implicitamente `@Configuration` e `@ComponentScan` del package corrente.

## `application.properties` / `application.yml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: postgres
    password: ${DB_PWD:secret}     # variabile env con default

app:
  retry:
    max-attempts: 3
    backoff-ms: 200
  feature:
    new-checkout: true
```

Spring Boot risolve i placeholder `${...}` automaticamente.

### `@Value` (semplice)

```java
@Value("${app.retry.max-attempts}")
private int maxAttempts;

@Value("${app.retry.max-attempts:5}")    // default 5
private int maxAttempts;
```

### `@ConfigurationProperties` (consigliato)

```java
@ConfigurationProperties(prefix = "app.retry")
public record RetryProps(int maxAttempts, int backoffMs) {}
```

Abilita con:
```java
@SpringBootApplication
@EnableConfigurationProperties(RetryProps.class)
public class App {}
```

E usalo:
```java
@Service
public class HttpRetrier {
    private final RetryProps props;
    public HttpRetrier(RetryProps props) { this.props = props; }
}
```

Vantaggi: type-safe, validabile con `@Validated` + `@NotNull`/`@Min`/...

## Esternalizzazione: l'ordine di precedenza

Da più alta a più bassa:
1. Argomenti CLI: `--app.retry.max-attempts=5`
2. Variabili d'ambiente: `APP_RETRY_MAX_ATTEMPTS=5` (mappato automaticamente)
3. `application-{profile}.yml`
4. `application.yml`
5. `@PropertySource`
6. Default nel codice

> **Mai committare password in `application.yml`.** Usa env var o secret manager (Vault, AWS Secrets Manager, Azure Key Vault).

## Profili

```yaml
spring:
  profiles:
    active: dev

---
spring:
  config:
    activate:
      on-profile: dev
db:
  url: jdbc:h2:mem:test

---
spring:
  config:
    activate:
      on-profile: prod
db:
  url: jdbc:postgresql://prod-db:5432/mydb
```

Attivi profili:
- `-Dspring.profiles.active=dev`
- `SPRING_PROFILES_ACTIVE=dev`
- `spring.profiles.active=dev` in `application.yml`

`@Profile("dev")` su bean li include solo se quel profilo è attivo.

## `@Conditional` e family

`@ConditionalOnClass`, `@ConditionalOnMissingBean`, `@ConditionalOnProperty`, `@ConditionalOnBean`, ...

```java
@Bean
@ConditionalOnProperty(name = "app.cache.enabled", havingValue = "true")
public CacheManager cacheManager() { ... }
```

Spring Boot auto-configurazione usa questi pesantemente: vedi `spring-boot-autoconfigure.jar`.

## `@Import`: comporre configurazioni

```java
@Configuration
@Import({ DataConfig.class, SecurityConfig.class, BatchConfig.class })
public class AppConfig {}
```

Utile per modulare app grandi.

## `META-INF/spring.factories` / `AutoConfiguration.imports`

Per creare uno **starter** custom: dichiari configurazioni che Spring Boot deve caricare automaticamente quando la libreria è nel classpath. È il meccanismo dietro `spring-boot-starter-*`.

## Esercizi

<details>
<summary>Es 24.1 — @ConfigurationProperties</summary>

Crea `app.http.client` con `connect-timeout`, `read-timeout`, `base-url`. Iniettali tramite record `HttpClientProps`.

</details>

<details>
<summary>Es 24.2 — Profilo dev vs prod</summary>

Stesso `Repo` con due impl, una `@Profile("dev")` con in-memory, l'altra `@Profile("prod")` con JDBC. Verifica con `spring.profiles.active`.

</details>

<details>
<summary>Es 24.3 — Feature flag</summary>

Usa `@ConditionalOnProperty("feature.x.enabled")` per abilitare/disabilitare un bean.

</details>

## Cosa devi portarti via

- Java config + Spring Boot fa il resto.
- `@ConfigurationProperties` > `@Value` per gruppi di proprietà.
- Profili `dev`/`prod` per ambiente.
- `@Conditional*` per bean opzionali.
- Niente segreti in file: env var o secret manager.

Prossimo: AOP — il segreto di `@Transactional` e simili.
