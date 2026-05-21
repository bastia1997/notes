---
title: "Spring intro: IoC, DI, ApplicationContext, BeanFactory"
area: "Spring Core"
order: 22
level: "intermedio"
summary: "Cos'è Spring, perché esiste, principio IoC (Inversion of Control), DI (Dependency Injection) per costruttore, setter, field. ApplicationContext e BeanFactory. Primo programma Spring."
prereq: ["Sezione 21"]
tools: ["JDK 21", "Maven", "Spring Boot 3.x"]
---

# Spring intro: IoC, DI, ApplicationContext, BeanFactory

## Cos'è Spring

**Spring Framework** è un IoC container + un set di librerie per costruire applicazioni Java enterprise. Nato nel 2003 (Rod Johnson) come reazione alla complessità di EJB.

Oggi "Spring" significa principalmente:
- **Spring Framework** (core, IoC, AOP, MVC, ...)
- **Spring Boot** (auto-configurazione, opinionated)
- **Spring Data** (repository per JPA, MongoDB, Redis, ...)
- **Spring Security** (auth e authz)
- **Spring Batch** (job batch)
- **Spring Cloud** (microservizi)
- altre 20 sotto-progetti

## Il problema che risolve: accoppiamento

Codice "classico" senza IoC:

```java
public class OrderService {
    private CustomerRepository repo = new CustomerRepositoryImpl();
    private EmailSender mail = new SmtpEmailSender("smtp.x.it", 587);
    private PaymentGateway pay = new StripeGateway("sk_...");
    // ...
}
```

Problemi:
- `OrderService` sa **come** costruire le sue dipendenze.
- Testing: non puoi sostituire `repo` con un mock.
- Configurazione cambia ⟶ ricompili.

## IoC: chi controlla cosa

**Inversion of Control**: invece che la classe crea i suoi collaboratori, il **container** glieli passa.

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

Il container vede i parametri del costruttore e gliele "inietta". Questa è la **Dependency Injection**.

## Le 3 forme di DI

### 1) Constructor injection (consigliata)

```java
@Service
public class OrderService {
    private final CustomerRepository repo;
    public OrderService(CustomerRepository repo) {   // Spring lo riconosce
        this.repo = repo;
    }
}
```

Vantaggi:
- Campi `final` (immutabili).
- Dipendenze esplicite e obbligatorie.
- Facile testare (passi mock dal costruttore).

### 2) Setter injection (per dipendenze opzionali)

```java
@Service
public class OrderService {
    private CustomerRepository repo;

    @Autowired(required = false)
    public void setRepo(CustomerRepository repo) { this.repo = repo; }
}
```

### 3) Field injection (sconsigliata)

```java
@Service
public class OrderService {
    @Autowired
    private CustomerRepository repo;
}
```

Sembra comoda ma:
- Niente `final` ⟶ campi mutabili.
- Difficile testare senza il container (puoi solo via reflection o `@InjectMocks`).
- Nasconde le dipendenze.

> **Costruttore sempre.** Se IntelliJ ti suggerisce `@Autowired` su field, ignora.

## Bean: cosa è

Un **bean** è un oggetto gestito dal container Spring. Spring lo:
- crea (chiamando il costruttore con le sue dipendenze),
- inietta dove richiesto,
- distrugge a fine vita.

Per dichiarare un bean:

```java
@Component   // generico
@Service     // semantica "servizio"
@Repository  // semantica "DAO/repository"
@Controller  // semantica "controller MVC"
```

(Tutte e tre sono `@Component`. Differenza solo semantica + alcuni feature aggiuntive.)

O dichiarazione esplicita:

```java
@Configuration
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource(...);
    }
}
```

## ApplicationContext: il container

`ApplicationContext` è il container di alto livello (estende `BeanFactory`). Cosa fa:
- Scansiona classi con `@Component` (component scan).
- Risolve dipendenze, crea il grafo dei bean.
- Espone i bean: `ctx.getBean(MyService.class)`.

```java
ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
OrderService svc = ctx.getBean(OrderService.class);
svc.placeOrder(...);
```

Con Spring Boot, il container parte da solo:

```java
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
```

## Primo programma Spring Boot

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
    public String greet(String name) { return "Ciao " + name; }
}
```

```powershell
mvn spring-boot:run
# output: Ciao Mario
```

## BeanFactory vs ApplicationContext

`BeanFactory` è la versione "pigra" di base: crea bean on-demand. Quasi mai usato direttamente.

`ApplicationContext` aggiunge:
- Event publishing (`ApplicationEventPublisher`).
- Internationalization (`MessageSource`).
- Risorse (`ResourceLoader`).
- Caricamento eager dei bean singleton.

Tu userai **sempre `ApplicationContext`** (di solito tramite Spring Boot).

## Risoluzione delle ambiguità

Se due bean dello stesso tipo:

```java
@Bean public PaymentGateway stripe() { ... }
@Bean public PaymentGateway paypal() { ... }
```

Spring non sa quale iniettare. Soluzioni:

1. **`@Primary`** sul preferito:
   ```java
   @Bean @Primary public PaymentGateway stripe() { ... }
   ```
2. **`@Qualifier("stripe")`** al sito di iniezione:
   ```java
   public OrderService(@Qualifier("stripe") PaymentGateway pay) {}
   ```
3. **Inietta `List<PaymentGateway>`**: ottieni tutti.

## Esercizi

<details>
<summary>Es 22.1 — Hello Spring Boot</summary>

Crea il progetto come sopra. Aggiungi 2 servizi: `Greeter` con `greet(name)` e `Counter` che incrementa un contatore quando greet è chiamato. Iniettalo nel `Greeter`.

</details>

<details>
<summary>Es 22.2 — Multiple impl</summary>

Crea interfaccia `Notifier` con due impl: `EmailNotifier`, `SmsNotifier`. Quando inietti `Notifier` in un service, Spring fallisce. Risolvi con `@Primary` su una.

</details>

<details>
<summary>Es 22.3 — Inject all</summary>

```java
@Service
public class NotifierBroadcaster {
    private final List<Notifier> all;
    public NotifierBroadcaster(List<Notifier> all) { this.all = all; }
    public void notify(String msg) { all.forEach(n -> n.send(msg)); }
}
```

</details>

## Cosa devi portarti via

- IoC: il container costruisce e collega gli oggetti.
- DI per costruttore: l'unica forma sensata.
- `@Component/@Service/@Repository/@Controller` per registrare bean.
- `@Bean` in `@Configuration` per dichiarazione esplicita.
- `ApplicationContext` = il container. Spring Boot lo avvia per te.
- Ambiguità: `@Primary` o `@Qualifier`.

Prossimo: scope, lifecycle, BeanPostProcessor.
