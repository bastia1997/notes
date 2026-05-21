---
title: "OOP II — Inheritance, polymorphism, interfaces, abstract classes"
area: "Java Foundations"
order: 5
level: "beginner"
summary: "Inheritance with extends, super, override. Dynamic polymorphism. Interfaces (with default and static methods since Java 8), abstract classes, when to use which. Diamond problem avoided. sealed classes."
prereq: ["Section 4"]
tools: ["JDK 21"]
---

# OOP II — Inheritance, polymorphism, interfaces, abstract classes

## Inheritance: "extends"

A class can **inherit** from another: it gets non-private fields and methods and can add to or redefine them.

```java
public class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public void eat() { System.out.println(name + " is eating"); }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }

    public void bark() { System.out.println(name + " barks: Woof!"); }
}
```

```java
Dog d = new Dog("Rex", "Labrador");
d.eat();    // inherited from Animal
d.bark();   // Dog's own method
```

- `extends` denotes inheritance. **Java is single-inheritance**: a class has at most *one* superclass.
- `super(...)` calls the superclass constructor. Must be the **first statement** of the child constructor.
- If you don't call `super(...)`, Java adds `super()` automatically. If the superclass has no no-arg constructor, you must call one explicitly.

### `super` to access superclass methods

```java
public class Dog extends Animal {
    @Override
    public void eat() {
        super.eat();
        System.out.println("...and wags its tail");
    }
}
```

## `Object`: the parent of all

Every class implicitly extends `java.lang.Object`. From there you get these (often overridden) methods:

- `equals(Object)` — logical equality
- `hashCode()` — hash for `HashMap`/`HashSet`
- `toString()` — textual representation
- `getClass()` — runtime type
- `clone()`, `finalize()` — old, avoid

Covered in the next section.

## Override and dynamic polymorphism

**Override** = redefine a superclass method keeping the signature:

```java
public class Animal {
    public String sound() { return "..."; }
}
public class Dog extends Animal {
    @Override public String sound() { return "Woof!"; }
}
public class Cat extends Animal {
    @Override public String sound() { return "Meow"; }
}
```

```java
Animal[] zoo = { new Dog("Rex", "Lab"), new Cat("Bea") };
for (Animal a : zoo) {
    System.out.println(a.sound());
}
// prints: Woof!  Meow
```

Even though `a` is declared `Animal`, the call resolves to **the actual object's class**. This is **dynamic dispatch** (late binding): methods are resolved at runtime based on the actual type. The heart of polymorphism.

> **`@Override`** is not mandatory but strongly recommended: the compiler verifies you're actually overriding. If you mis-spell the signature (e.g. `sound(int x)` instead of `sound()`), it warns you.

### Override rules

| Aspect | Constraint |
|---|---|
| Method name | Identical |
| Parameters | Identical |
| Return type | Same or **subtype** (covariant return) |
| Visibility | Same or **more permissive** (`protected` ⟶ `public` ok; `public` ⟶ `protected` not ok) |
| Checked exceptions | Same or **subtypes** or none |

## Reference casting

```java
Animal a = new Dog("Rex", "Lab");   // upcast, always safe
Dog d = (Dog) a;                     // downcast, must be verified
d.bark();
```

If the object is not really a `Dog`, you get `ClassCastException`. Check first with `instanceof`:

```java
if (a instanceof Dog d) {     // pattern matching for instanceof (Java 16+)
    d.bark();
}
```

Under Java 16+ you can use the *pattern binding* and skip the explicit cast.

## Abstract classes

An **abstract** class cannot be instantiated: it's a base for subclasses. It may have abstract methods (no body) and/or concrete ones.

```java
public abstract class Shape {
    public abstract double area();

    public void print() {
        System.out.println("Area: " + area());
    }
}

public class Circle extends Shape {
    private double radius;
    public Circle(double r) { this.radius = r; }
    @Override
    public double area() { return Math.PI * radius * radius; }
}
```

```java
Shape s = new Shape(...);    // compile error
Shape s = new Circle(5);     // ok
s.print();                    // "Area: 78.539..."
```

When to use an abstract class? When you have a common **skeleton** with details that vary per subclass.

## Interfaces

An **interface** is a contract: declares *what* a type can do, without the *implementation* (originally).

```java
public interface Flyable {
    void takeOff();
    void land();
}

public class Plane implements Flyable {
    @Override public void takeOff() { System.out.println("V1, rotate, climb"); }
    @Override public void land()    { System.out.println("Final approach"); }
}
```

A class can **implement many interfaces** (while it can extend only one class):

```java
public class Amphibian implements Flyable, Swimmable, Walker { ... }
```

### `default` methods (Java 8+)

Since Java 8, interfaces can have default implementations:

```java
public interface Greeting {
    String greet();

    default String greetWithBang() {
        return greet() + "!";
    }
}
```

Classes implementing `Greeting` get `greetWithBang()` for free, can still override.

### `static` methods in interfaces

```java
public interface MathUtils {
    static double square(double x) { return x * x; }
}
double q = MathUtils.square(3);  // 9
```

### Constants in interfaces

All fields in an interface are implicitly `public static final`:

```java
public interface Constants {
    int MAX_RETRY = 3;   // automatically public static final
}
```

### Diamond problem avoided

In Java you can't inherit from two classes, but you can implement two interfaces with the same `default` method. If they conflict, you **must** resolve manually:

```java
interface A { default String hi() { return "from A"; } }
interface B { default String hi() { return "from B"; } }

class C implements A, B {
    @Override
    public String hi() {
        return A.super.hi();   // or B.super.hi(), or fresh logic
    }
}
```

## Abstract class vs interface: which one?

| Feature | Abstract class | Interface |
|---|---|---|
| State (non-final fields) | Yes | No (only constants) |
| Constructors | Yes | No |
| Multiple inheritance | No (one superclass) | Yes (many interfaces) |
| Methods | Concrete or abstract | Default since Java 8 |
| When to use | When sharing **state** and common logic | When defining a **contract** |

**Practical rule**: start with an interface. If you find yourself sharing state/code, consider an abstract class. Often both: interface for the contract, abstract class as a base for standard implementations.

```java
public interface Repository<T> {
    Optional<T> findById(long id);
    List<T> findAll();
    T save(T entity);
}

public abstract class AbstractRepository<T> implements Repository<T> {
    protected DataSource ds;
    public AbstractRepository(DataSource ds) { this.ds = ds; }
}
```

Spring uses exactly this pattern everywhere.

## `final` on classes and methods

- `final` on a class: cannot be extended (e.g. `String`, `Integer`).
- `final` on a method: cannot be overridden.
- `final` on a field: see section 2.

```java
public final class Util { ... }
public class Base {
    public final void critical() {  // subclasses CANNOT override
        ...
    }
}
```

## `sealed` (Java 17+): controlled inheritance

```java
public sealed interface Shape permits Circle, Square, Triangle {}

public final class Circle implements Shape { ... }
public final class Square implements Shape { ... }
public final class Triangle implements Shape { ... }
```

`Shape` can be implemented **only** by `Circle`, `Square`, `Triangle`. Useful for exhaustive pattern matching (section 18).

## Integrated example: a tiny payment system

```java
public interface Payment {
    void execute(double amount);
}

public abstract class BasePayment implements Payment {
    protected String id;
    public BasePayment(String id) { this.id = id; }

    @Override
    public final void execute(double amount) {  // template method
        validate(amount);
        process(amount);
        record(amount);
    }

    protected void validate(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("amount <= 0");
    }
    protected abstract void process(double amount);
    protected void record(double amount) {
        System.out.println("[" + id + "] recorded " + amount);
    }
}

public class CreditCard extends BasePayment {
    public CreditCard(String id) { super(id); }
    @Override
    protected void process(double amount) {
        System.out.println("Charge card " + id + ": " + amount);
    }
}

public class WireTransfer extends BasePayment {
    public WireTransfer(String id) { super(id); }
    @Override
    protected void process(double amount) {
        System.out.println("SEPA transfer " + id + ": " + amount);
    }
}
```

This is the **template method pattern**: general algorithm defined once (`execute`), variations in `process`. The "same" parts written once.

## Exercises

<details>
<summary>Ex 5.1 — Vehicles</summary>

Create an abstract class `Vehicle` with field `plate`, abstract `wheels()`, concrete `describe()` that uses `wheels()`. Implement `Car` (4), `Bike` (2), `Truck` (6).

```java
public abstract class Vehicle {
    protected String plate;
    public Vehicle(String p) { this.plate = p; }
    public abstract int wheels();
    public void describe() {
        System.out.println(plate + " has " + wheels() + " wheels");
    }
}
public class Car extends Vehicle {
    public Car(String p) { super(p); }
    @Override public int wheels() { return 4; }
}
```

</details>

<details>
<summary>Ex 5.2 — Interface composition</summary>

Create `Fish` implementing `Swimmable` (`swim()`) and `Reproducible` (`reproduce()`).

```java
interface Swimmable { void swim(); }
interface Reproducible { void reproduce(); }

public class Fish implements Swimmable, Reproducible {
    public void swim() { System.out.println("Glub glub"); }
    public void reproduce() { System.out.println("Laying eggs"); }
}
```

</details>

<details>
<summary>Ex 5.3 — Cast and instanceof</summary>

Given `Vehicle[] fleet = { new Car("AA-111-BB"), new Bike("XX-222-YY") }`, count the cars.

```java
int cars = 0;
for (Vehicle v : fleet) {
    if (v instanceof Car) cars++;
}
```

Pattern matching version:

```java
int cars = 0;
for (Vehicle v : fleet) {
    if (v instanceof Car c) {
        cars++;
    }
}
```

</details>

<details>
<summary>Ex 5.4 — Conflicting defaults</summary>

Two interfaces, same default, a class implementing both. What happens?

```java
interface A { default String hi() { return "A"; } }
interface B { default String hi() { return "B"; } }

class C implements A, B {
    // doesn't compile until you override hi()
}
```

You must override `hi()` in `C`. To delegate to one:

```java
class C implements A, B {
    @Override
    public String hi() {
        return A.super.hi();
    }
}
```

</details>

<details>
<summary>Ex 5.5 — Sealed hierarchy</summary>

Create a `sealed` hierarchy for ID document types: `Document` permits only `IdCard`, `DriverLicense`, `Passport`.

```java
public sealed interface Document permits IdCard, DriverLicense, Passport {
    String number();
}
public record IdCard(String number) implements Document {}
public record DriverLicense(String number, String category) implements Document {}
public record Passport(String number, String country) implements Document {}
```

</details>

## Take-aways

- **Inheritance** (extends) to reuse/extend. Java is single-inheritance.
- **Override** = same signature, dynamic polymorphism. Always use `@Override`.
- `super` calls superclass constructor or method.
- **Interfaces** = contracts. Implement many. `default` methods since Java 8.
- **Abstract classes** = base with shared state. `abstract` prevents instantiation.
- `final`, `sealed` to control extensibility.
- Fundamental patterns: template method, strategy, decorator (see the design patterns section).

Next: equals/hashCode, immutability, `record`.
