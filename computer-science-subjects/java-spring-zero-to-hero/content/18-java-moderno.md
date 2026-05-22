---
title: "Java moderno: dal 8 al 21 — features chiave"
area: "JVM Deep"
order: 18
level: "intermedio"
summary: "Tour delle novità di Java 8, 9, 11, 17, 21: lambda/stream (8), modules (9), var (10), HttpClient (11), record/sealed/switch espressivi (14-17), text blocks (15), virtual threads e pattern matching (21)."
prereq: ["Sezione 17"]
tools: ["JDK 21"]
---

# Java moderno: dal 8 al 21

## Versioni LTS

| Versione | Anno | Feature chiave |
|---|---|---|
| **Java 8** (LTS) | 2014 | Lambda, Stream, `Optional`, `LocalDate`, `default` methods |
| **Java 9** | 2017 | Modules (Jigsaw), `var` ... wait no, `var` è 10 |
| **Java 10** | 2018 | `var` per locali |
| **Java 11** (LTS) | 2018 | HttpClient, `String.strip()`, `Files.readString` |
| **Java 14-16** | 2020-21 | Switch expression, record, pattern matching (preview) |
| **Java 17** (LTS) | 2021 | Sealed classes, record stabili, pattern matching `instanceof` |
| **Java 21** (LTS) | 2023 | Virtual threads, pattern matching for switch, sequenced collections |

## Java 8: la grande rivoluzione

### Lambda

```java
button.addListener(e -> System.out.println("click"));
list.forEach(System.out::println);
```

### Stream

```java
int sum = list.stream().mapToInt(Integer::intValue).sum();
```

### `Optional<T>`

Vedi sez. 10.

### `LocalDate`, `LocalTime`, `ZonedDateTime`

```java
LocalDate today = LocalDate.now();
LocalDate next = today.plusDays(7);
Duration d = Duration.between(t1, t2);
```

Sostituiscono il vecchio `java.util.Date` (immutabile, thread-safe).

### Default methods

```java
public interface Saluto {
    default String saluto() { return "ciao"; }
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

Per la maggior parte delle app non-libreria, non li usi. Spring Boot va benissimo senza moduli.

## Java 10: `var`

```java
var list = new ArrayList<String>();
var fmt = DateTimeFormatter.ISO_LOCAL_DATE;
```

Solo per locali, vedi sez. 2.

## Java 11: HttpClient + altre utility

```java
HttpClient c = HttpClient.newHttpClient();
HttpResponse<String> r = c.send(
    HttpRequest.newBuilder(URI.create("https://api.example.com")).build(),
    HttpResponse.BodyHandlers.ofString()
);
```

Asincrono:
```java
c.sendAsync(req, BodyHandlers.ofString())
 .thenApply(HttpResponse::body)
 .thenAccept(System.out::println);
```

Sostituisci `HttpURLConnection` ovunque puoi.

## Java 14-16: switch expression, record, instanceof pattern

### Switch espressione (arrow)

```java
String giorno = switch (n) {
    case 1, 2, 3, 4, 5 -> "lavorativo";
    case 6, 7 -> "weekend";
    default -> {
        log.warn("invalid n: " + n);
        yield "??";
    }
};
```

### Record

Vedi sez. 6.

### Pattern matching `instanceof`

```java
if (o instanceof String s) {
    // s è già castata
    System.out.println(s.length());
}
```

## Java 17: sealed classes

```java
public sealed interface Forma permits Cerchio, Quadrato, Triangolo {}
```

Vedi sez. 5.

## Java 21: virtual threads + pattern matching per switch

### Virtual threads

Vedi sez. 13. La feature più importante per server I/O-bound.

### Pattern matching per switch

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

**Esaustivo**: se aggiungi `Triangle` al permits e non lo gestisci, **errore di compilazione**. Pattern matching + sealed = polymorphism alternative al classico override.

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

// switch:
return switch (shape) {
    case Circle(double r) -> Math.PI * r * r;
    case Rect(double w, double h) -> w * h;
};
```

### Sequenced Collections

`List` ora ha `getFirst()`, `getLast()`, `reversed()` ufficialmente.

## Esercizi

<details>
<summary>Es 18.1 — Migrare da if-else a switch espressione</summary>

```java
// vecchio
String label;
if (status == 1) label = "A";
else if (status == 2) label = "B";
else label = "?";

// nuovo
String label = switch (status) {
    case 1 -> "A";
    case 2 -> "B";
    default -> "?";
};
```

</details>

<details>
<summary>Es 18.2 — Sealed + pattern matching</summary>

Modella un albero binario di interi con sealed:

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
<summary>Es 18.3 — Virtual threads stress test</summary>

```java
try (var ex = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 1_000_000)
        .forEach(i -> ex.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return null;
        }));
}
// completa in ~1 secondo
```

Con thread classici sarebbe impossibile.

</details>

## Cosa devi portarti via

- Le LTS importanti: **8**, **11**, **17**, **21**.
- Java moderno significa: **record**, **sealed**, **switch espressione**, **pattern matching**, **virtual threads**, **text blocks**.
- Le librerie e Spring si aspettano sempre più queste feature: stare su Java 8 nel 2026 è uno svantaggio.

Prossimo: persistenza — JDBC, JPA, SQL essenziale.
