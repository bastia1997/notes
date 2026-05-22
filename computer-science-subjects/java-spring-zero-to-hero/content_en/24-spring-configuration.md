---
title: "Configuration: Java config, @ComponentScan, profiles, conditionals, properties"
area: "Spring Core"
order: 24
level: "intermediate"
summary: "Java config with @Configuration/@Bean, @ComponentScan, @Import. application.properties and application.yml, @Value, @ConfigurationProperties. @Profile and @Conditional. Externalization."
prereq: ["Section 23"]
tools: ["Spring Boot 3.x"]
---

# Configuration: Java config, properties, profiles, conditionals

## Java config: the only one you need in 2026

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

In Spring Boot, `@SpringBootApplication` implies `@Configuration` and `@ComponentScan` of the current package.

## `application.properties` / `application.yml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: postgres
    password: ${DB_PWD:secret}

app:
  retry:
    max-attempts: 3
    backoff-ms: 200
  feature:
    new-checkout: true
```

Spring Boot resolves `${...}` placeholders automatically.

### `@Value` (simple)

```java
@Value("${app.retry.max-attempts}")
private int maxAttempts;

@Value("${app.retry.max-attempts:5}")    // default 5
private int maxAttempts;
```

### `@ConfigurationProperties` (recommended)

```java
@ConfigurationProperties(prefix = "app.retry")
public record RetryProps(int maxAttempts, int backoffMs) {}
```

Enable:
```java
@SpringBootApplication
@EnableConfigurationProperties(RetryProps.class)
public class App {}
```

Use:
```java
@Service
public class HttpRetrier {
    private final RetryProps props;
    public HttpRetrier(RetryProps props) { this.props = props; }
}
```

Pros: type-safe, validatable with `@Validated` + `@NotNull`/`@Min`/...

## Externalization: precedence order

High to low:
1. CLI args: `--app.retry.max-attempts=5`
2. Env vars: `APP_RETRY_MAX_ATTEMPTS=5` (mapped automatically)
3. `application-{profile}.yml`
4. `application.yml`
5. `@PropertySource`
6. Code defaults

> **Never commit passwords in `application.yml`.** Use env vars or a secret manager (Vault, AWS Secrets Manager, Azure Key Vault).

## Profiles

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

Activate:
- `-Dspring.profiles.active=dev`
- `SPRING_PROFILES_ACTIVE=dev`
- `spring.profiles.active=dev` in `application.yml`

`@Profile("dev")` on beans includes them only when that profile is active.

## `@Conditional` family

`@ConditionalOnClass`, `@ConditionalOnMissingBean`, `@ConditionalOnProperty`, `@ConditionalOnBean`, ...

```java
@Bean
@ConditionalOnProperty(name = "app.cache.enabled", havingValue = "true")
public CacheManager cacheManager() { ... }
```

Spring Boot auto-configuration uses these heavily.

## `@Import`: composing configs

```java
@Configuration
@Import({ DataConfig.class, SecurityConfig.class, BatchConfig.class })
public class AppConfig {}
```

## `META-INF/spring.factories` / `AutoConfiguration.imports`

For custom starters: declare configurations that Spring Boot auto-loads when the library is on the classpath. Mechanism behind `spring-boot-starter-*`.

## Exercises

<details>
<summary>Ex 24.1 — @ConfigurationProperties</summary>

Create `app.http.client` with `connect-timeout`, `read-timeout`, `base-url`. Inject via `HttpClientProps` record.

</details>

<details>
<summary>Ex 24.2 — dev vs prod profile</summary>

Same `Repo`, two impls, one `@Profile("dev")` in-memory, the other `@Profile("prod")` JDBC. Verify via `spring.profiles.active`.

</details>

<details>
<summary>Ex 24.3 — Feature flag</summary>

Use `@ConditionalOnProperty("feature.x.enabled")` to enable/disable a bean.

</details>

## Take-aways

- Java config + Spring Boot do the rest.
- `@ConfigurationProperties` > `@Value` for property groups.
- Profiles `dev`/`prod` per environment.
- `@Conditional*` for optional beans.
- No secrets in files: env vars or secret manager.

Next: AOP — the secret of `@Transactional` and friends.
