---
title: "50 cumulative exercises: from syntax to Spring Batch"
area: "Final exercises"
order: 44
level: "intermediate"
summary: "50 mixed problems to consolidate what you've learned. Basic syntax, OOP, collections, streams, concurrency, JDBC/JPA, Spring Core, REST, Security, Spring Batch. Hidden solutions."
prereq: ["Whole path"]
tools: ["JDK 21", "Spring Boot 3.x"]
---

# 50 cumulative exercises

## Java Foundations (1-10)

<details>
<summary>Ex 1 — Atomic counter</summary>

Thread-safe counter with `AtomicInteger`, test with 10 threads × 100k increments.

```java
class Counter {
    private final AtomicInteger n = new AtomicInteger();
    public void inc() { n.incrementAndGet(); }
    public int get() { return n.get(); }
}
```

</details>

<details>
<summary>Ex 2 — Unicode palindrome</summary>

`isPalindrome(String)` ignoring case, spaces and accents. Hint: `Normalizer.normalize(s, NFD).replaceAll("\\p{M}", "")`.

</details>

<details>
<summary>Ex 3 — Record sorting</summary>

`record Person(String name, int age)`. Sort a list by age desc, then name asc.

```java
people.sort(Comparator.comparingInt(Person::age).reversed()
    .thenComparing(Person::name));
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

`InvalidIbanException extends IllegalArgumentException` with `code` and `reason`.

</details>

<details>
<summary>Ex 6 — Record equals/hashCode</summary>

Create `Money(BigDecimal amount, String currency)` record and verify `equals`/`hashCode` are auto-implemented.

</details>

<details>
<summary>Ex 7 — Defensive copy</summary>

Make `Period(LocalDate from, LocalDate to)` truly immutable. (LocalDate is immutable, so `final` fields suffice.)

</details>

<details>
<summary>Ex 8 — Bitwise: count set bits</summary>

```java
int n = 0b10110011;
System.out.println(Integer.bitCount(n));   // 5
```

</details>

<details>
<summary>Ex 9 — Switch expression</summary>

`monthName(int m)` with arrow switch.

</details>

<details>
<summary>Ex 10 — Sealed types for validation</summary>

```java
sealed interface ValidationResult permits Ok, Error {}
record Ok() implements ValidationResult {}
record Error(String message) implements ValidationResult {}

String msg = switch (v) {
    case Ok ok -> "valid";
    case Error e -> "invalid: " + e.message();
};
```

</details>

## Collections, Stream, IO, Concurrency (11-20)

<details>
<summary>Ex 11 — Top 3 cities by population</summary>

```java
cities.stream()
    .sorted(Comparator.comparingInt(City::population).reversed())
    .limit(3)
    .forEach(System.out::println);
```

</details>

<details>
<summary>Ex 12 — Group by with sum</summary>

```java
Map<LocalDate, BigDecimal> daily = orders.stream()
    .collect(Collectors.groupingBy(Order::date,
        Collectors.reducing(BigDecimal.ZERO, Order::total, BigDecimal::add)));
```

</details>

<details>
<summary>Ex 13 — Word count from file</summary>

```java
try (Stream<String> lines = Files.lines(Path.of("text.txt"), UTF_8)) {
    Map<String, Long> wc = lines
        .flatMap(l -> Arrays.stream(l.toLowerCase().split("\\W+")))
        .filter(s -> !s.isBlank())
        .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
}
```

</details>

<details>
<summary>Ex 14 — Parallelize calls</summary>

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

See Ex 9.3. Implement with `LinkedHashMap(accessOrder=true)` + `removeEldestEntry`.

</details>

<details>
<summary>Ex 16 — Race condition fix</summary>

Non-safe `int n; void inc() { n++; }`. Add `synchronized`, then `AtomicInteger`. Measure.

</details>

<details>
<summary>Ex 17 — Producer-consumer</summary>

`BlockingQueue` with 1 producer, 2 consumers. 1000 numbers, consumers sum them.

</details>

<details>
<summary>Ex 18 — Optional chaining</summary>

Model `Order.customer.address.city` with nested `Optional`. Use `flatMap`.

</details>

<details>
<summary>Ex 19 — File walk</summary>

Count `.java` files recursively, excluding `target/`.

</details>

<details>
<summary>Ex 20 — Virtual threads stress</summary>

100,000 threads sleeping 1s. Measure total time.

</details>

## JVM, JDBC, JPA, SQL (21-30)

<details>
<summary>Ex 21 — `javap` reverse</summary>

Disassemble a simple class, spot `iadd`, `iload`, `istore` in main.

</details>

<details>
<summary>Ex 22 — Force OOM and analyze</summary>

Program filling `List<byte[]>`. Run with `-Xmx128m -XX:+HeapDumpOnOutOfMemoryError`. Open in Eclipse MAT.

</details>

<details>
<summary>Ex 23 — JDBC PreparedStatement</summary>

H2 in-memory + `person` table. Insert 1000 records with batch + select with paging.

</details>

<details>
<summary>Ex 24 — Atomic transfer</summary>

```java
try (Connection c = ds.getConnection()) {
    c.setAutoCommit(false);
    try {
        ps1.executeUpdate();
        ps2.executeUpdate();
        c.commit();
    } catch (Exception e) { c.rollback(); throw e; }
}
```

</details>

<details>
<summary>Ex 25 — JPA entity + relation</summary>

`Customer` 1-N `Order`. All LAZY. Load a Customer and its Orders with `JOIN FETCH`.

</details>

<details>
<summary>Ex 26 — N+1 in action</summary>

Force N+1 loading `findAll()` of Order and iterating `o.getCustomer().getName()`. Fix with `@EntityGraph`.

</details>

<details>
<summary>Ex 27 — Spring Data derived</summary>

`CustomerRepository.findByCityAndAgeBetween(String, int, int)`.

</details>

<details>
<summary>Ex 28 — SQL window function</summary>

```sql
SELECT name, salary,
    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rank_in_dept
FROM employee;
```

</details>

<details>
<summary>Ex 29 — Index for query</summary>

1M-row table. Slow `WHERE email = ?`. `EXPLAIN ANALYZE`. Add index. Compare times.

</details>

<details>
<summary>Ex 30 — Optimistic locking</summary>

Add `@Version Long version`. Two parallel updates: one fails with `OptimisticLockException`.

</details>

## Spring Core, Boot, MVC, Security (31-40)

<details>
<summary>Ex 31 — Constructor DI</summary>

`OrderService(CustomerRepo, PaymentGateway)`. Test with Mockito.

</details>

<details>
<summary>Ex 32 — Dev vs prod profile</summary>

`InMemoryRepo` (`dev`) and `JdbcRepo` (`prod`).

</details>

<details>
<summary>Ex 33 — AOP timing</summary>

`@Timed` custom annotation + aspect logging `method took N ms`.

</details>

<details>
<summary>Ex 34 — @Transactional self-invocation</summary>

Reproduce the bug.

</details>

<details>
<summary>Ex 35 — Full REST CRUD</summary>

`@RestController` with GET/POST/PUT/DELETE for `Customer`, validation, `@RestControllerAdvice`.

</details>

<details>
<summary>Ex 36 — Paginated Spring Data</summary>

`GET /customers?page=0&size=20&sort=name,asc`.

</details>

<details>
<summary>Ex 37 — Specification</summary>

`GET /customers?city=...&minAge=...&search=...` with optional filters.

</details>

<details>
<summary>Ex 38 — Security with form login</summary>

2 in-memory users (`user`/`admin`). Protect `/admin/**`.

</details>

<details>
<summary>Ex 39 — JWT resource server</summary>

Set up a test Keycloak/Auth0. Endpoint protected by `@PreAuthorize("hasAuthority('SCOPE_read')")`.

</details>

<details>
<summary>Ex 40 — Parallel WebClient</summary>

3 calls to different endpoints in parallel, combine with `Mono.zip`.

</details>

## Spring Batch + Test (41-50)

<details>
<summary>Ex 41 — Mini batch CSV → DB</summary>

1000 CSV records → 1000 DB rows.

</details>

<details>
<summary>Ex 42 — Job with 3 steps</summary>

Download (tasklet) → Parse CSV (chunk) → Notify (tasklet).

</details>

<details>
<summary>Ex 43 — Skip + retry</summary>

Processor throws `InvalidRecordException` for records with email missing `@`. `skipLimit(10)`. Verify `skip_count`.

</details>

<details>
<summary>Ex 44 — JDBC paging reader</summary>

Job reading 100k from `orders` with `JdbcPagingItemReader`, processing, writing to file.

</details>

<details>
<summary>Ex 45 — Multi-resource CSV</summary>

`MultiResourceItemReader` reads all `customers-*.csv` in a folder.

</details>

<details>
<summary>Ex 46 — Range partitioning</summary>

Partitioner splitting 1M records into 8 partitions. 8 concurrent slave steps.

</details>

<details>
<summary>Ex 47 — Working restart</summary>

Force fail at 50%. Restart: job continues, not from scratch.

</details>

<details>
<summary>Ex 48 — JobLauncherTestUtils</summary>

Integration test of the CSV → DB job with Testcontainers.

</details>

<details>
<summary>Ex 49 — Custom listener notify</summary>

`JobExecutionListener` sending an event (Slack/email/queue) on job end.

</details>

<details>
<summary>Ex 50 — Schedule with `@Scheduled`</summary>

`@EnableScheduling` + `@Scheduled(cron = "0 0 2 * * *")` runs the job nightly.

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

## How to use these exercises

- Don't read the solutions first: try.
- Run everything: compile, run, verify.
- If you do 35/50 unaided, you're "professional".
- If you do 45+ with optimizations and variations, you're "senior".

Next: the guided final project.
