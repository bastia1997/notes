---
title: "Generics: parametric types, PECS, type erasure, wildcards"
area: "Java Foundations"
order: 8
level: "intermediate"
summary: "What a generic type is, why it exists, type parameters in classes and methods, bounded type parameters, wildcards (extends, super, ?), PECS rule, type erasure and its limits."
prereq: ["Section 7"]
tools: ["JDK 21"]
---

# Generics: parametric types, PECS, type erasure, wildcards

## Why generics exist

Pre-Java 5, `List` was:

```java
List names = new ArrayList();
names.add("Anna");
names.add(42);                    // ouch, compiles but...
String s = (String) names.get(1); // ClassCastException at runtime
```

Without generics, collections only "knew" they held `Object`. Manual casting, runtime errors.

**Generics** (Java 5+) give you **compile-time type safety**:

```java
List<String> names = new ArrayList<>();
names.add("Anna");
names.add(42);                    // compile error
String s = names.get(0);          // no cast
```

## Generic classes and methods

### Generic class

```java
public class Box<T> {
    private T content;
    public Box(T content) { this.content = content; }
    public T get() { return content; }
    public void set(T v) { this.content = v; }
}

Box<String> b1 = new Box<>("hi");
Box<Integer> b2 = new Box<>(42);
```

`T` is the **type parameter**. Conventions:
- `T` (Type) — generic
- `E` (Element) — for collections
- `K`, `V` (Key, Value) — for maps
- `R` (Return)
- `N` (Number)

### Multiple parameters

```java
public class Pair<K, V> {
    private final K key;
    private final V value;
    public Pair(K k, V v) { this.key = k; this.value = v; }
    public K key() { return key; }
    public V value() { return value; }
}
```

### Generic method

```java
public static <T> T first(List<T> list) {
    if (list.isEmpty()) return null;
    return list.get(0);
}

String s = first(List.of("a", "b"));   // T = String
Integer i = first(List.of(1, 2));      // T = Integer
```

`<T>` *before* the return type introduces the parameter.

## Bounded type parameters

### Upper bound: `extends`

Limits `T` to a subtype.

```java
public static <T extends Number> double sum(List<T> nums) {
    double s = 0;
    for (T n : nums) s += n.doubleValue();
    return s;
}

sum(List.of(1, 2, 3));         // ok, Integer extends Number
sum(List.of(1.0, 2.0));        // ok
sum(List.of("a", "b"));        // ERROR
```

### Multiple bounds

```java
public static <T extends Number & Comparable<T>> T max(List<T> l) {
    T m = l.get(0);
    for (T x : l) if (x.compareTo(m) > 0) m = x;
    return m;
}
```

`& Comparable<T>` adds a second constraint. The class (if any) must be the first bound.

## Wildcards

### `?` — unknown wildcard

```java
List<?> list = ...;        // list of something, unknown
list.size();               // ok
list.add("x");             // ERROR
Object x = list.get(0);    // ok, but only as Object
```

`List<?>` is read-only for "something" but not addable (except `null`).

### `? extends T` — covariance (read)

```java
public static double sumNumbers(List<? extends Number> nums) {
    double s = 0;
    for (Number n : nums) s += n.doubleValue();
    return s;
}

sumNumbers(List.of(1, 2, 3));         // List<Integer>: ok
sumNumbers(List.of(1.0, 2.0));        // List<Double>: ok
```

`List<? extends Number>` accepts `List<Integer>`, `List<Double>`, etc. But:

```java
List<? extends Number> l = new ArrayList<Integer>();
l.add(42);  // ERROR: you don't know exactly what's inside
```

You can **read** but not **write** (except `null`).

### `? super T` — contravariance (write)

```java
public static void addAll(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}

List<Integer> li = new ArrayList<>();
List<Number> ln = new ArrayList<>();
List<Object> lo = new ArrayList<>();
addAll(li);   // ok
addAll(ln);   // ok
addAll(lo);   // ok
```

`List<? super Integer>` accepts `List<Integer>`, `List<Number>`, `List<Object>`. You can **write** but reads come back as `Object`.

### PECS: Producer Extends, Consumer Super

Golden rule:

- Collection **produces** values for you (read) → `? extends T`
- Collection **consumes** values from you (write) → `? super T`

```java
public static <T> void copy(List<? extends T> src, List<? super T> dest) {
    for (T x : src) dest.add(x);
    //       ↑ produces           ↑ consumes
}
```

Real JDK example: `Collections.copy(List<? super T> dest, List<? extends T> src)`.

## Type erasure: the dirty secret

Generics exist *only at compile time*. At runtime, the JVM doesn't see them:

```java
List<String> li = new ArrayList<>();
List<Integer> li2 = new ArrayList<>();
System.out.println(li.getClass() == li2.getClass());   // true!
```

At runtime they're both `ArrayList`. All `T`s are erased, replaced by the bound (`Object` if none).

### Practical consequences

1. **Can't `new T()`**:
   ```java
   public class Box<T> {
       T newOne() { return new T(); }   // doesn't compile
   }
   ```
   Workaround: pass a `Supplier<T>` or `Class<T>`.

2. **Can't `instanceof List<String>`**:
   ```java
   if (x instanceof List<String>) ...   // no
   if (x instanceof List<?>) ...        // yes
   ```

3. **Generic arrays forbidden**:
   ```java
   T[] arr = new T[10];                 // no
   List<String>[] arr = new List[10];   // unsafe warning
   ```
   Use `List<T>` instead.

4. **"Phantom" overloads**:
   ```java
   void f(List<String> l) {}
   void f(List<Integer> l) {}   // doesn't compile: same signature after erasure
   ```

### Reified vs erased

C# has reified generics: the type is available at runtime. Java doesn't. Sometimes you must work around:

```java
public <T> T parse(String json, Class<T> clazz) {
    // get T at runtime
}
parse("{...}", Customer.class);
```

Libraries like Jackson and Spring use `TypeReference` or `ParameterizedTypeReference` to work around.

## Generics and JDK collections

All collections are generic:

```java
List<Customer> customers = new ArrayList<>();
Map<String, Customer> byEmail = new HashMap<>();
Set<UUID> ids = new HashSet<>();
Optional<User> user = repo.find(42);
Stream<Order> orders = ...;
```

The diamond `<>` (Java 7+) lets you infer the right-hand type:

```java
List<Customer> list = new ArrayList<>();
```

## Integrated example: generic Repository

```java
public interface Repository<T, ID> {
    Optional<T> findById(ID id);
    List<T> findAll();
    T save(T entity);
    void deleteById(ID id);
}

public class JdbcRepository<T, ID> implements Repository<T, ID> {
    private final DataSource ds;
    private final RowMapper<T> mapper;
    private final String tableName;

    public JdbcRepository(DataSource ds, String tableName, RowMapper<T> mapper) {
        this.ds = ds;
        this.tableName = tableName;
        this.mapper = mapper;
    }

    @Override
    public Optional<T> findById(ID id) {
        // SELECT * FROM tableName WHERE id = ?
        return Optional.empty();
    }
}
```

Spring Data JPA uses exactly this pattern: `JpaRepository<T, ID>`.

## Exercises

<details>
<summary>Ex 8.1 — `Pair<A, B>`</summary>

```java
public record Pair<A, B>(A first, B second) {
    public Pair<B, A> swap() { return new Pair<>(second, first); }
}
```

</details>

<details>
<summary>Ex 8.2 — Generic `min`</summary>

```java
public static <T extends Comparable<T>> T min(List<T> list) {
    if (list.isEmpty()) throw new IllegalArgumentException("empty");
    T m = list.get(0);
    for (T x : list) if (x.compareTo(m) < 0) m = x;
    return m;
}
```

</details>

<details>
<summary>Ex 8.3 — Apply PECS</summary>

```java
public static <T> void addAll(List<? super T> dest, T... items) {
    for (T e : items) dest.add(e);
}
```

</details>

<details>
<summary>Ex 8.4 — Type erasure trap</summary>

```java
public class Wrap<T> {
    public T value() { ... }
    public Integer value() { return 0; }   // overload?
}
```

**Doesn't compile.** After erasure both are `Object value()`/`Integer value()` with conflicting signatures.

</details>

<details>
<summary>Ex 8.5 — Wildcard quiz</summary>

Which compile?

```java
List<Number> ln = new ArrayList<>();
List<? extends Number> lext = ln;
List<? super Number> lsup = ln;

lext.add(1);     // ?
lsup.add(1);     // ?
Number n1 = lext.get(0);     // ?
Number n2 = lsup.get(0);     // ?
```

- `lext.add(1)` → **error**.
- `lsup.add(1)` → **ok**.
- `n1 = lext.get(0)` → **ok**.
- `n2 = lsup.get(0)` → **error** (returns `Object`).

</details>

## Take-aways

- Generics = compile-time type safety. No explicit casts.
- `<T extends X>` to bound to a subtype of X.
- **PECS**: `? extends` to produce (read), `? super` to consume (write).
- **Type erasure**: at runtime, type parameters are gone. Implications: no `new T()`, no direct generic arrays.
- Records + generics + collections = foundations of modern Java programming.

Next: the Collections framework in detail.
