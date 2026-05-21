---
title: "Modern Java: from 8 to 21 — key features"
area: "JVM Deep"
order: 18
level: "intermediate"
summary: "Tour of new features in Java 8, 9, 11, 17, 21: lambda/stream (8), modules (9), var (10), HttpClient (11), record/sealed/switch expressions (14-17), text blocks (15), virtual threads and pattern matching (21)."
prereq: ["Section 17"]
tools: ["JDK 21"]
---

# Modern Java: from 8 to 21

## LTS versions

| Version | Year | Key feature |
|---|---|---|
| **Java 8** (LTS) | 2014 | Lambdas, Streams, `Optional`, `LocalDate`, `default` methods |
| **Java 9** | 2017 | Modules (Jigsaw) |
| **Java 10** | 2018 | `var` for locals |
| **Java 11** (LTS) | 2018 | HttpClient, `String.strip()`, `Files.readString` |
| **Java 14-16** | 2020-21 | Switch expression, records, instanceof pattern |
| **Java 17** (LTS) | 2021 | Sealed classes, stable records, instanceof pattern matching |
| **Java 21** (LTS) | 2023 | Virtual threads, switch pattern matching, sequenced collections |

## Java 8: the big revolution

### Lambdas
```java
button.addListener(e -> System.out.println("click"));
list.forEach(System.out::println);
```

### Streams
```java
int sum = list.stream().mapToInt(Integer::intValue).sum();
```

### `Optional<T>` — see section 10.

### `LocalDate`, `LocalTime`, `ZonedDateTime`
```java
LocalDate today = LocalDate.now();
LocalDate next = today.plusDays(7);
Duration d = Duration.between(t1, t2);
```
Replace the old `java.util.Date` (immutable, thread-safe).

### Default methods
```java
public interface Greeting {
    default String hello() { return "hi"; }
}
```

## Java 9: Modules

`module-info.java`:
```java
module it.zth.app {
    requires java.sql;
    requires java.net.http;
    exports it.zth.app.api;
}
```

For most non-library apps you won't use them. Spring Boot is fine without modules.

## Java 10: `var`

```java
var list = new ArrayList<String>();
var fmt = DateTimeFormatter.ISO_LOCAL_DATE;
```

Only for locals — see section 2.

## Java 11: HttpClient + extras

```java
HttpClient c = HttpClient.newHttpClient();
HttpResponse<String> r = c.send(
    HttpRequest.newBuilder(URI.create("https://api.example.com")).build(),
    HttpResponse.BodyHandlers.ofString()
);
```

Async:
```java
c.sendAsync(req, BodyHandlers.ofString())
 .thenApply(HttpResponse::body)
 .thenAccept(System.out::println);
```

Replace `HttpURLConnection` wherever you can.

## Java 14-16: switch expression, records, instanceof pattern

### Arrow switch
```java
String day = switch (n) {
    case 1, 2, 3, 4, 5 -> "workday";
    case 6, 7 -> "weekend";
    default -> {
        log.warn("invalid n: " + n);
        yield "??";
    }
};
```

### Records — see section 6.

### `instanceof` pattern matching
```java
if (o instanceof String s) {
    System.out.println(s.length());
}
```

## Java 17: sealed classes

```java
public sealed interface Shape permits Circle, Square, Triangle {}
```

See section 5.

## Java 21: virtual threads + switch pattern matching

### Virtual threads — see section 13.

### Switch pattern matching

```java
sealed interface Shape permits Circle, Square, Rect {}
record Circle(double r) implements Shape {}
record Square(double s) implements Shape {}
record Rect(double w, double h) implements Shape {}

double area(Shape s) {
    return switch (s) {
        case Circle c -> Math.PI * c.r() * c.r();
        case Square sq -> sq.s() * sq.s();
        case Rect r -> r.w() * r.h();
    };
}
```

**Exhaustive**: add `Triangle` to permits and don't handle it ⟶ **compile error**. Sealed + pattern matching = polymorphism alternative.

### Guarded patterns
```java
String classify(Object o) {
    return switch (o) {
        case Integer i when i < 0 -> "negative";
        case Integer i when i == 0 -> "zero";
        case Integer i -> "positive";
        case String s when s.isEmpty() -> "empty string";
        case String s -> "string: " + s;
        case null -> "null";
        default -> "unknown";
    };
}
```

### Record patterns (deconstruction)
```java
record Point(int x, int y) {}

if (obj instanceof Point(int x, int y)) {
    System.out.println(x + "," + y);
}

return switch (shape) {
    case Circle(double r) -> Math.PI * r * r;
    case Rect(double w, double h) -> w * h;
};
```

### Sequenced Collections
`List` now has `getFirst()`, `getLast()`, `reversed()` officially.

## Exercises

<details>
<summary>Ex 18.1 — Migrate if-else to switch expression</summary>

```java
String label = switch (status) {
    case 1 -> "A";
    case 2 -> "B";
    default -> "?";
};
```

</details>

<details>
<summary>Ex 18.2 — Sealed + pattern matching</summary>

```java
sealed interface Tree permits Leaf, Node {}
record Leaf(int value) implements Tree {}
record Node(Tree left, int value, Tree right) implements Tree {}

int sum(Tree t) {
    return switch (t) {
        case Leaf(int v) -> v;
        case Node(Tree l, int v, Tree r) -> v + sum(l) + sum(r);
    };
}
```

</details>

<details>
<summary>Ex 18.3 — Virtual threads stress test</summary>

```java
try (var ex = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 1_000_000)
        .forEach(i -> ex.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return null;
        }));
}
```

Completes in ~1 second. Impossible with platform threads.

</details>

## Take-aways

- Important LTSes: **8**, **11**, **17**, **21**.
- Modern Java = **records**, **sealed**, **switch expressions**, **pattern matching**, **virtual threads**, **text blocks**.
- Libraries and Spring rely more and more on these features: staying on Java 8 in 2026 is a handicap.

Next: persistence — JDBC, JPA, essential SQL.
