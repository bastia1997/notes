---
title: "50 esercizi cumulativi: dalla sintassi a Spring Batch"
area: "Esercizi finali"
order: 44
level: "intermedio"
summary: "50 problemi misti per consolidare quanto imparato. Sintassi base, OOP, collections, stream, concurrency, JDBC/JPA, Spring Core, REST, Security, Spring Batch. Soluzioni nascoste."
prereq: ["Tutto il percorso"]
tools: ["JDK 21", "Spring Boot 3.x"]
---

# 50 esercizi cumulativi

## Java Foundations (1-10)

<details>
<summary>Ex 1 — Counter atomico</summary>

Implementa un contatore thread-safe usando `AtomicInteger` e testa con 10 thread che incrementano 100k volte ciascuno.

```java
class Counter {
    private final AtomicInteger n = new AtomicInteger();
    public void inc() { n.incrementAndGet(); }
    public int get() { return n.get(); }
}
```

</details>

<details>
<summary>Ex 2 — Palindromo Unicode</summary>

Funzione `isPalindrome(String)` che ignora case, spazi e accenti. Suggerimento: `Normalizer.normalize(s, NFD).replaceAll("\\p{M}", "")`.

</details>

<details>
<summary>Ex 3 — Sort di record</summary>

`record Persona(String nome, int eta)`. Ordina una lista per età decrescente, poi nome crescente.

```java
people.sort(Comparator.comparingInt(Persona::eta).reversed()
    .thenComparing(Persona::nome));
```

</details>

<details>
<summary>Ex 4 — Generic Pair swap</summary>

```java
public record Pair<A, B>(A a, B b) {
    public Pair<B, A> swap() { return new Pair<>(b, a); }
}
```

</details>

<details>
<summary>Ex 5 — Custom exception</summary>

`InvalidIbanException extends IllegalArgumentException` con `code` e `reason`.

</details>

<details>
<summary>Ex 6 — Equals/hashCode di record</summary>

Crea record `Money(BigDecimal amount, String currency)` e verifica che `equals`/`hashCode` sono già implementati.

</details>

<details>
<summary>Ex 7 — Defensive copy</summary>

Rendi `Periodo(LocalDate from, LocalDate to)` immutabile veramente. (LocalDate è già immutabile, quindi basta avere campi `final`.)

</details>

<details>
<summary>Ex 8 — Bitwise: count set bits</summary>

```java
int n = 0b10110011;
System.out.println(Integer.bitCount(n));   // 5
```

</details>

<details>
<summary>Ex 9 — Switch espressione</summary>

Funzione `nomeMese(int m)` con arrow switch.

```java
String nomeMese(int m) {
    return switch (m) {
        case 1 -> "Gennaio";
        case 2 -> "Febbraio";
        // ...
        case 12 -> "Dicembre";
        default -> throw new IllegalArgumentException();
    };
}
```

</details>

<details>
<summary>Ex 10 — Sealed types per validazione</summary>

```java
sealed interface ValidationResult permits Ok, Error {}
record Ok() implements ValidationResult {}
record Error(String message) implements ValidationResult {}

ValidationResult v = validate(input);
String msg = switch (v) {
    case Ok ok -> "valid";
    case Error e -> "invalid: " + e.message();
};
```

</details>

## Collections, Stream, IO, Concurrency (11-20)

<details>
<summary>Ex 11 — Top 3 città per popolazione</summary>

`List<City>` (`name`, `population`). Stampa le top 3 con stream.

```java
cities.stream()
    .sorted(Comparator.comparingInt(City::population).reversed())
    .limit(3)
    .forEach(System.out::println);
```

</details>

<details>
<summary>Ex 12 — Group by con sum</summary>

`List<Order>(date, total)`. Mappa `LocalDate → BigDecimal` con totale per giorno.

```java
Map<LocalDate, BigDecimal> daily = orders.stream()
    .collect(Collectors.groupingBy(Order::date,
        Collectors.reducing(BigDecimal.ZERO, Order::total, BigDecimal::add)));
```

</details>

<details>
<summary>Ex 13 — Word count da file</summary>

```java
try (Stream<String> lines = Files.lines(Path.of("text.txt"), UTF_8)) {
    Map<String, Long> wc = lines
        .flatMap(l -> Arrays.stream(l.toLowerCase().split("\\W+")))
        .filter(s -> !s.isBlank())
        .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    wc.entrySet().stream()
        .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
        .limit(10).forEach(System.out::println);
}
```

</details>

<details>
<summary>Ex 14 — Parallelize chiamate</summary>

10 ID in input. Per ognuno chiama un servizio (simula con sleep). In parallelo:

```java
ExecutorService ex = Executors.newVirtualThreadPerTaskExecutor();
List<CompletableFuture<String>> futs = ids.stream()
    .map(id -> CompletableFuture.supplyAsync(() -> svc.fetch(id), ex))
    .toList();
List<String> result = futs.stream().map(CompletableFuture::join).toList();
```

</details>

<details>
<summary>Ex 15 — LRU cache</summary>

Vedi Es 9.3. Implementa con `LinkedHashMap(accessOrder=true)` + `removeEldestEntry`.

</details>

<details>
<summary>Ex 16 — Race condition fix</summary>

Codice non thread-safe con `int n; void inc() { n++; }`. Aggiungi `synchronized`, poi sostituisci con `AtomicInteger`. Misura.

</details>

<details>
<summary>Ex 17 — Producer-consumer</summary>

`BlockingQueue` con 1 producer e 2 consumer. Producer mette 1000 numeri, consumer li sommano.

</details>

<details>
<summary>Ex 18 — Optional chaining</summary>

Modella `Order.customer.address.city` con `Optional` annidato. Usa `flatMap`.

</details>

<details>
<summary>Ex 19 — File walk</summary>

Conta i file `.java` in una directory ricorsivamente, escludendo `target/`.

```java
try (Stream<Path> s = Files.walk(root)) {
    long n = s.filter(Files::isRegularFile)
        .filter(p -> !p.toString().contains("target"))
        .filter(p -> p.toString().endsWith(".java"))
        .count();
    System.out.println(n);
}
```

</details>

<details>
<summary>Ex 20 — Virtual threads stress</summary>

100.000 thread che dormono 1s. Misura il tempo totale.

</details>

## JVM, JDBC, JPA, SQL (21-30)

<details>
<summary>Ex 21 — `javap` reverse</summary>

Disassembla una semplice classe e trova `iadd`, `iload`, `istore` nel main.

</details>

<details>
<summary>Ex 22 — Forza OOM e analizza</summary>

Programma che riempie una `List<byte[]>`. Lancia con `-Xmx128m -XX:+HeapDumpOnOutOfMemoryError`. Apri il dump con Eclipse MAT.

</details>

<details>
<summary>Ex 23 — JDBC PreparedStatement</summary>

H2 in-memory + tabella `persona`. Insert 1000 record con batch + select con paging.

</details>

<details>
<summary>Ex 24 — Trasferimento atomico</summary>

```java
try (Connection c = ds.getConnection()) {
    c.setAutoCommit(false);
    try {
        ps1.executeUpdate(); // - amount da A
        ps2.executeUpdate(); // + amount su B
        c.commit();
    } catch (Exception e) { c.rollback(); throw e; }
}
```

</details>

<details>
<summary>Ex 25 — JPA entità + relazione</summary>

`Customer` 1-N `Order`. Tutti LAZY. Carica un Customer e i suoi Order con `JOIN FETCH`.

</details>

<details>
<summary>Ex 26 — N+1 in azione</summary>

Forza N+1 caricando `findAll()` di Order e iterando `o.getCustomer().getName()`. Risolvi con `@EntityGraph`.

</details>

<details>
<summary>Ex 27 — Spring Data derived</summary>

`CustomerRepository.findByCityAndAgeBetween(String, int, int)`.

</details>

<details>
<summary>Ex 28 — Window function SQL</summary>

```sql
SELECT name, salary,
    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rank_in_dept
FROM employee;
```

</details>

<details>
<summary>Ex 29 — Indice per query</summary>

Crea tabella con 1M righe. Query `WHERE email = ?` lenta. `EXPLAIN ANALYZE`. Aggiungi index. Confronta tempi.

</details>

<details>
<summary>Ex 30 — Locking ottimistico</summary>

Aggiungi `@Version Long version` all'entità. Due thread aggiornano in parallelo: uno fallisce con `OptimisticLockException`.

</details>

## Spring Core, Boot, MVC, Security (31-40)

<details>
<summary>Ex 31 — DI per costruttore</summary>

`OrderService(CustomerRepo, PaymentGateway)`. Test con Mockito.

</details>

<details>
<summary>Ex 32 — Profilo dev vs prod</summary>

`InMemoryRepo` (profile `dev`) e `JdbcRepo` (profile `prod`).

</details>

<details>
<summary>Ex 33 — AOP timing</summary>

`@Timed` annotation custom + aspetto che logga `metodo took N ms`.

</details>

<details>
<summary>Ex 34 — @Transactional self-invocation</summary>

Riproduci il bug: due `@Transactional` nella stessa classe, uno chiama l'altro. Osserva che il secondo non funziona.

</details>

<details>
<summary>Ex 35 — REST CRUD completo</summary>

`@RestController` con GET/POST/PUT/DELETE per `Customer`, validation, `@RestControllerAdvice` per errori.

</details>

<details>
<summary>Ex 36 — Spring Data paginato</summary>

`GET /customers?page=0&size=20&sort=name,asc`.

</details>

<details>
<summary>Ex 37 — Specification</summary>

`GET /customers?city=...&minAge=...&search=...` con tutti i filtri opzionali.

</details>

<details>
<summary>Ex 38 — Security con form login</summary>

2 utenti in-memory (`user`/`admin`). Proteggi `/admin/**`.

</details>

<details>
<summary>Ex 39 — JWT resource server</summary>

Configura un Keycloak/Auth0 di test. Endpoint protetto con `@PreAuthorize("hasAuthority('SCOPE_read')")`.

</details>

<details>
<summary>Ex 40 — WebClient parallelo</summary>

3 chiamate a endpoint diversi in parallelo, combina con `Mono.zip`.

</details>

## Spring Batch + Test (41-50)

<details>
<summary>Ex 41 — Mini batch CSV → DB</summary>

Vedi Es 34.2 del percorso. 1000 record nel CSV → 1000 righe in DB.

</details>

<details>
<summary>Ex 42 — Job con 3 step</summary>

Download (tasklet) → Parse CSV (chunk) → Notify (tasklet).

</details>

<details>
<summary>Ex 43 — Skip + retry</summary>

Processor che lancia `InvalidRecordException` per record con email senza `@`. `skipLimit(10)`. Verifica `skip_count`.

</details>

<details>
<summary>Ex 44 — JDBC paging reader</summary>

Job che legge 100k record da `orders` con `JdbcPagingItemReader`, processa, scrive su file.

</details>

<details>
<summary>Ex 45 — Multi-resource CSV</summary>

`MultiResourceItemReader` legge tutti i `customers-*.csv` di una cartella.

</details>

<details>
<summary>Ex 46 — Partitioning per range</summary>

Partitioner che divide 1M record in 8 partizioni. 8 slave step concorrenti.

</details>

<details>
<summary>Ex 47 — Restart funzionante</summary>

Forza fail al 50%. Restart: il job continua, non rifa da zero.

</details>

<details>
<summary>Ex 48 — JobLauncherTestUtils</summary>

Test integrato del job CSV → DB con Testcontainers.

</details>

<details>
<summary>Ex 49 — Custom listener notify</summary>

`JobExecutionListener` che invia un evento (Slack/email/queue) al termine del job.

</details>

<details>
<summary>Ex 50 — Schedule con `@Scheduled`</summary>

`@EnableScheduling` + `@Scheduled(cron = "0 0 2 * * *")` lancia il job di notte.

```java
@Component
public class Scheduler {
    @Scheduled(cron = "0 0 2 * * *")
    public void nightly() throws Exception {
        launcher.run(importJob, params());
    }
}
```

</details>

## Come usare questi esercizi

- Non leggere subito le soluzioni: prova prima.
- Esegui tutto: compila, runna, verifica.
- Se ne fai 35 su 50 senza guardare le soluzioni, sei a livello "professionista".
- Se ne fai 45+ con elaborate ottimizzazioni e variazioni, sei "senior".

Prossimo: il progetto finale guidato.
