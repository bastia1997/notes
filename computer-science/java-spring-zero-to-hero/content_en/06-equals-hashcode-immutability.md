---
title: "OOP III — equals, hashCode, toString, immutability, record"
area: "Java Foundations"
order: 6
level: "intermediate"
summary: "The equals/hashCode contract, why breaking one breaks the other. toString. Immutable classes: the 5 rules. record (Java 14+) as free immutability. Cloning, defensive copy. Comparable and Comparator."
prereq: ["Section 5"]
tools: ["JDK 21"]
---

# OOP III — equals, hashCode, toString, immutability, record

## The `equals` contract

`Object.equals(Object o)` by default compares references. For **logical** equality (two different objects but "same thing") you must override it.

### The 5 formal rules

`equals` must be:

1. **Reflexive**: `x.equals(x)` ⟶ `true`
2. **Symmetric**: `x.equals(y) == y.equals(x)`
3. **Transitive**: `x.equals(y) && y.equals(z)` ⟶ `x.equals(z)`
4. **Consistent**: repeated calls yield the same result (if objects aren't modified)
5. `x.equals(null)` ⟶ `false`

### Standard implementation

```java
public class Person {
    private final String name;
    private final int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person p)) return false;
        return age == p.age && Objects.equals(name, p.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

Key notes:
- `this == o` shortcut for same object.
- `instanceof Person p` (Java 16+) checks type *and* casts.
- `Objects.equals(a, b)` handles `null`s.
- `Objects.hash(...)` generates hash from multiple fields.

## The `hashCode` contract

Rule: **if `equals` returns true, then `hashCode` must return the same value**.

The converse is not required: two `!equals` objects can have the same `hashCode` (collision, normal).

**Practical consequences**:
- `HashMap` and `HashSet` use `hashCode` to find the bucket, then `equals` to confirm.
- If you override `equals` but *not* `hashCode`, `HashMap` breaks subtly: `map.put(x, ...); map.get(x);` might return `null`.

**Iron rule**: always override `equals` and `hashCode` together.

### What to include in `equals`/`hashCode`

Include exactly the fields that identify the **logical identity**. For a user:

- `username` (natural id) → YES
- `email` (unique) → YES
- `firstName`, `lastName` → usually YES
- `createdAt` → NO (metadata)
- `lastLogin` → NO (changes constantly)

### Inheritance trap

If the class has subclasses adding fields, equality gets slippery (symmetry can break). Solutions:

1. Use `getClass() == o.getClass()` instead of `instanceof` (rigid, no subtypes).
2. Make the class `final`.
3. Prefer composition over inheritance.

## `toString`

Default `Object.toString()` is useless: `Person@1d44bcfa`. Always override:

```java
@Override
public String toString() {
    return "Person{name='" + name + "', age=" + age + "}";
}
```

Saves your life in logs and debugger. IntelliJ generates it with one click.

## Immutability

A class is **immutable** if, once an object is created, its state cannot change.

### The 5 rules

1. The class is `final` (or all constructors are `private`).
2. All fields are `private` and `final`.
3. No setters, no methods modifying state.
4. If fields are mutable objects (e.g. `Date`, `List`), do **defensive copy** in and out.
5. Don't expose `this` during construction (no "this leak").

```java
public final class ImmutablePoint {
    private final double x;
    private final double y;

    public ImmutablePoint(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() { return x; }
    public double getY() { return y; }

    public ImmutablePoint translate(double dx, double dy) {
        return new ImmutablePoint(x + dx, y + dy);   // NEW object
    }
}
```

### Why immutable?

- **Thread-safe for free**. No locks.
- **Cacheable**: usable as map keys without fear.
- **Predictable**: a reference to an immutable means the value won't change.

`String`, `Integer`, `LocalDate`, `BigDecimal` are immutable. **Always** prefer them to mutable counterparts.

### Defensive copy

If you must accept/return mutable objects:

```java
public final class Period {
    private final Date start;
    private final Date end;

    public Period(Date start, Date end) {
        this.start = new Date(start.getTime());   // copy in
        this.end = new Date(end.getTime());
    }

    public Date getStart() {
        return new Date(start.getTime());          // copy out
    }
}
```

> Today use `LocalDate`/`Instant` which are already immutable. But know the pattern.

## `record` (Java 14+ stable in 16): free immutability

A `record` is syntactic sugar for immutable data classes: the compiler generates fields, constructor, accessors, `equals`, `hashCode`, `toString`.

```java
public record Person(String name, int age) {}
```

Equivalent to ~50 lines of code. Usage:

```java
Person p = new Person("Anna", 30);
System.out.println(p.name());     // accessor (not getName)
System.out.println(p.age());
System.out.println(p);            // Person[name=Anna, age=30]

Person p2 = new Person("Anna", 30);
System.out.println(p.equals(p2)); // true
```

### Compact constructor

```java
public record Person(String name, int age) {
    public Person {
        if (age < 0) throw new IllegalArgumentException("age < 0");
        name = name.strip();   // normalization allowed
    }
}
```

Validations go here. You **cannot** add extra instance fields (only static).

### Records with methods

```java
public record Rectangle(double width, double height) {
    public double area() { return width * height; }
    public static Rectangle square(double side) { return new Rectangle(side, side); }
}
```

Records can implement interfaces, but cannot extend classes (they extend `Record`).

### When to use records

- DTOs for REST APIs
- Value objects (Money, Coordinate, IbanCode, ...)
- Intermediate stream results
- Composite map keys

No more "thousand accessor boilerplate classes".

## `Comparable<T>`: natural ordering

Implement `Comparable<T>` to define a "natural" ordering:

```java
public record Score(String student, int points) implements Comparable<Score> {
    @Override
    public int compareTo(Score other) {
        return Integer.compare(this.points, other.points);
    }
}
```

`compareTo` returns:
- `< 0` if `this` is "less than" other,
- `0` if equal,
- `> 0` if `this` is "greater".

```java
List<Score> scores = new ArrayList<>(List.of(
    new Score("Anna", 28),
    new Score("Beppe", 30),
    new Score("Carla", 24)
));
Collections.sort(scores);
```

**Contract**: `compareTo` should be consistent with `equals`. If `a.compareTo(b) == 0`, `a.equals(b)` *should* be `true`. Violations are allowed but `TreeSet`/`TreeMap` behave oddly.

## `Comparator<T>`: alternative orderings

For sorting in different ways without modifying the class:

```java
List<Score> scores = ...;

// by name
scores.sort(Comparator.comparing(Score::student));

// by points descending
scores.sort(Comparator.comparingInt(Score::points).reversed());

// points desc, then name asc
scores.sort(Comparator.comparingInt(Score::points).reversed()
    .thenComparing(Score::student));
```

Comparators compose. Beautiful.

## Exercises

<details>
<summary>Ex 6.1 — `equals`/`hashCode` for `Point2D`</summary>

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Point2D p)) return false;
    return Double.compare(p.x, x) == 0 && Double.compare(p.y, y) == 0;
}

@Override
public int hashCode() {
    return Objects.hash(x, y);
}
```

`Double.compare` handles `NaN` and signed zero correctly.

</details>

<details>
<summary>Ex 6.2 — Turn `Person` into a `record`</summary>

Before:
```java
public class Person {
    private final String name;
    private final int age;
    // constructor, getters, equals, hashCode, toString...
}
```

After:
```java
public record Person(String name, int age) {}
```

</details>

<details>
<summary>Ex 6.3 — Defensive copy</summary>

```java
public final class Group {
    private final List<String> members;

    public Group(List<String> members) {
        this.members = List.copyOf(members);   // immutable (Java 10+)
    }

    public List<String> getMembers() {
        return members;
    }
}
```

`List.copyOf` creates an immutable `List`. Modification attempts throw `UnsupportedOperationException`.

</details>

<details>
<summary>Ex 6.4 — Composite comparator</summary>

```java
scores.sort(
    Comparator.comparingInt(Score::points).reversed()
        .thenComparing(Score::student)
);
```

</details>

<details>
<summary>Ex 6.5 — Hash collisions</summary>

Create two `Person("X", 1)` and put them in a `HashSet`. How many elements? What if you override only `equals` but not `hashCode`?

With `record`: 1 element (equals + hashCode generated correctly).

With handcrafted class *without* `hashCode` override: 2 elements. `HashSet` doesn't recognize them as "equal" because they end up in different buckets — bug.

</details>

## Take-aways

- `equals` and `hashCode` always **together**. Use `Objects.equals` / `Objects.hash`.
- Always override `toString`: saves you in logs and debug.
- **Immutability** = thread-safe for free + fewer bugs. Always prefer when possible.
- **`record`** is the right tool for value objects.
- `Comparable` for natural ordering, `Comparator` for alternative composite orderings.

Next: exceptions, try/catch/finally, custom exceptions.
