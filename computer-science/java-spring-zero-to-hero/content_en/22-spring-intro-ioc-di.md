---
title: "Spring intro: IoC, DI, ApplicationContext, BeanFactory"
area: "Spring Core"
order: 22
level: "intermediate"
summary: "What Spring is, why it exists, IoC principle (Inversion of Control), DI (Dependency Injection) by constructor, setter, field. ApplicationContext and BeanFactory. First Spring program."
prereq: ["Section 21"]
tools: ["JDK 21", "Maven", "Spring Boot 3.x"]
---

# Spring intro: IoC, DI, ApplicationContext, BeanFactory

## What Spring is

**Spring Framework** is an IoC container + a library set for building Java enterprise apps. Born in 2003 (Rod Johnson) as a reaction to EJB complexity.

Today "Spring" mostly means:
- **Spring Framework** (core, IoC, AOP, MVC, ...)
- **Spring Boot** (auto-configuration, opinionated)
- **Spring Data** (repositories for JPA, MongoDB, Redis, ...)
- **Spring Security** (auth and authz)
- **Spring Batch** (batch jobs)
- **Spring Cloud** (microservices)
- 20 other sub-projects

## The problem it solves: coupling

"Classic" code without IoC:

```java
public class OrderService {
    private CustomerRepository repo = new CustomerRepositoryImpl();
    private EmailSender mail = new SmtpEmailSender("smtp.x.it", 587);
    private PaymentGateway pay = new StripeGateway("sk_...");
}
```

Problems:
- `OrderService` knows **how** to construct its collaborators.
- Testing: can't mock `repo`.
- Config changes ⟶ recompile.

## IoC: who controls what

**Inversion of Control**: instead of the class creating its collaborators, the **container** passes them in.

```java
public class OrderService {
    private final CustomerRepository repo;
    private final EmailSender mail;
    private final PaymentGateway pay;

    public OrderService(CustomerRepository repo, EmailSender mail, PaymentGateway pay) {
        this.repo = repo;
        this.mail = mail;
        this.pay = pay;
    }
}
```

The container reads the constructor params and "injects" them. This is **Dependency Injection**.

## The 3 DI forms

### 1) Constructor injection (recommended)

```java
@Service
public class OrderService {
    private final CustomerRepository repo;
    public OrderService(CustomerRepository repo) {
        this.repo = repo;
    }
}
```

Pros:
- `final` fields (immutable).
- Explicit, required dependencies.
- Easy to test (pass mocks via constructor).

### 2) Setter injection (optional deps)

```java
@Service
public class OrderService {
    private CustomerRepository repo;

    @Autowired(required = false)
    public void setRepo(CustomerRepository repo) { this.repo = repo; }
}
```

### 3) Field injection (discouraged)

```java
@Service
public class OrderService {
    @Autowired
    private CustomerRepository repo;
}
```

Looks convenient but:
- No `final` ⟶ mutable fields.
- Hard to test without the container.
- Hides dependencies.

> **Constructor always.** If IntelliJ suggests `@Autowired` on a field, ignore.

## Bean: what it is

A **bean** is an object managed by Spring. Spring:
- creates it (calling the constructor with its deps),
- injects it where needed,
- destroys it at end of life.

To declare a bean:

```java
@Component   // generic
@Service     // "service" semantics
@Repository  // "DAO/repository" semantics
@Controller  // "MVC controller" semantics
```

(All three are `@Component`. Only semantic + some extra features differ.)

Or explicit declaration:

```java
@Configuration
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource(...);
    }
}
```

## ApplicationContext: the container

`ApplicationContext` is the high-level container (extends `BeanFactory`). What it does:
- Scans `@Component` classes (component scan).
- Resolves dependencies, builds the bean graph.
- Exposes beans: `ctx.getBean(MyService.class)`.

```java
ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
OrderService svc = ctx.getBean(OrderService.class);
```

With Spring Boot, the container starts itself:

```java
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
```

## First Spring Boot program

`pom.xml`:

```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>3.3.5</version>
</parent>

<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
  </dependency>
</dependencies>
```

```java
@SpringBootApplication
public class App implements CommandLineRunner {
    private final HelloService hello;
    public App(HelloService hello) { this.hello = hello; }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Override
    public void run(String... args) {
        System.out.println(hello.greet("Mario"));
    }
}

@Service
class HelloService {
    public String greet(String name) { return "Hi " + name; }
}
```

```powershell
mvn spring-boot:run
```

## BeanFactory vs ApplicationContext

`BeanFactory` is the "lazy" base version: builds beans on-demand. Rarely used directly.

`ApplicationContext` adds:
- Event publishing.
- Internationalization (`MessageSource`).
- Resources (`ResourceLoader`).
- Eager singleton initialization.

You'll always use **`ApplicationContext`** (typically via Spring Boot).

## Resolving ambiguity

If two beans of the same type:

```java
@Bean public PaymentGateway stripe() { ... }
@Bean public PaymentGateway paypal() { ... }
```

Spring doesn't know which to inject. Fixes:

1. **`@Primary`** on the preferred one.
2. **`@Qualifier("stripe")`** at injection site:
   ```java
   public OrderService(@Qualifier("stripe") PaymentGateway pay) {}
   ```
3. **Inject `List<PaymentGateway>`**: get all.

## Exercises

<details>
<summary>Ex 22.1 — Hello Spring Boot</summary>

Add 2 services: `Greeter` with `greet(name)` and `Counter` that increments a counter when greet is called. Inject it into `Greeter`.

</details>

<details>
<summary>Ex 22.2 — Multiple impls</summary>

Interface `Notifier` with `EmailNotifier`, `SmsNotifier`. Injection fails. Fix with `@Primary` on one.

</details>

<details>
<summary>Ex 22.3 — Inject all</summary>

```java
@Service
public class NotifierBroadcaster {
    private final List<Notifier> all;
    public NotifierBroadcaster(List<Notifier> all) { this.all = all; }
    public void notify(String msg) { all.forEach(n -> n.send(msg)); }
}
```

</details>

## Take-aways

- IoC: the container builds and wires the objects.
- Constructor DI: the only sensible form.
- `@Component/@Service/@Repository/@Controller` to register beans.
- `@Bean` in `@Configuration` for explicit declaration.
- `ApplicationContext` = the container. Spring Boot starts it for you.
- Ambiguity: `@Primary` or `@Qualifier`.

Next: scopes, lifecycle, BeanPostProcessor.
