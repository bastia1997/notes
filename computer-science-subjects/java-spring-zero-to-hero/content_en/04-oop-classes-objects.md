---
title: "OOP I — Classes, objects, constructors, this, packages, visibility"
area: "Java Foundations"
order: 4
level: "beginner"
summary: "Class as a template, object as an instance. Fields and methods, constructors (default, parameterized, overloaded). this. static vs instance. Visibility: public, protected, package-private, private. Packages and code organization."
prereq: ["Section 3"]
tools: ["JDK 21"]
---

# OOP I — Classes, objects, constructors, this, packages, visibility

## A class is the template, an object is what the template produces

A **class** describes *how something is made*: which data it has (fields) and what it can do (methods). An **object** is a specific instance of the class, with its own values.

```java
public class Person {
    String name;
    int age;

    void greet() {
        System.out.println("Hi, I'm " + name + " and I'm " + age);
    }
}
```

```java
Person p1 = new Person();   // creates a Person object on the heap
p1.name = "Anna";
p1.age = 30;
p1.greet();                  // "Hi, I'm Anna and I'm 30"

Person p2 = new Person();   // second, independent object
p2.name = "Beppe";
p2.age = 45;
p2.greet();
```

`p1` and `p2` are **two objects** from the same "template".

## Constructors

The **constructor** initializes the object. Java provides a default parameter-less one if you don't declare any.

```java
public class Person {
    String name;
    int age;

    // parameterized constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

```java
Person p = new Person("Anna", 30);
```

> As soon as you declare **any** constructor, the default disappears. If you also want a no-arg one, declare it explicitly.

### `this`

Inside a method or constructor, `this` is a reference to the current object. It's needed when a parameter **shadows** a field (`this.name = name`):

```java
public Person(String name, int age) {
    this.name = name;   // this.name = the field; name = the parameter
    this.age = age;
}
```

`this()` calls another constructor in the same class:

```java
public class Person {
    String name;
    int age;

    public Person() {
        this("anonymous", 0);   // calls the other constructor
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

`this(...)` must be the **first statement** of the constructor.

### Constructor overloading

You can have multiple constructors with **different signatures** (number/type of parameters):

```java
public class Point {
    double x, y;

    public Point() { this(0, 0); }
    public Point(double x, double y) { this.x = x; this.y = y; }
    public Point(Point other) { this(other.x, other.y); }  // copy constructor
}
```

## Fields and methods

```java
public class BankAccount {
    private String iban;
    private double balance;

    public BankAccount(String iban, double initial) {
        this.iban = iban;
        this.balance = initial;
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("non-positive amount");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalStateException("insufficient funds");
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

### Getters and setters

Convention: `private` fields, access via `getX()` / `setX(...)` methods. This way you control what goes in/out.

```java
public class Person {
    private String name;
    private int age;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) {
        if (age < 0) throw new IllegalArgumentException("age < 0");
        this.age = age;
    }
}
```

> A setter isn't always needed. If a field must never change after construction, leave just a getter (or **don't** offer one at all). We'll see `record` (Java 14+) that does this for free.

## `static`: belongs to the class, not the instance

A `static` field or method exists **once per class**, not once per object.

```java
public class Counter {
    private static int instances = 0;   // shared

    private int id;

    public Counter() {
        instances++;
        this.id = instances;
    }

    public static int howMany() { return instances; }
    public int getId() { return id; }
}
```

```java
new Counter(); new Counter(); new Counter();
System.out.println(Counter.howMany());   // 3
```

Classic use case: **utility classes** with only static methods (e.g. `java.lang.Math`, `java.util.Arrays`).

### Static initializers

```java
public class Config {
    static final Map<String, String> MAP;

    static {
        MAP = new HashMap<>();
        MAP.put("env", "prod");
        MAP.put("region", "eu-south");
    }
}
```

The `static { ... }` block runs **once** when the class is loaded.

## Visibility (access modifiers)

| Modifier | Visible from... |
|---|---|
| `public` | Everywhere |
| `protected` | Same package + subclasses (anywhere) |
| (none) = "package-private" | Same package only |
| `private` | Only within the same class |

```java
public class Sample {
    public    int pub;       // anyone
    protected int prot;      // subclasses and package
              int pkg;       // package only
    private   int priv;      // only inside Sample
}
```

**Practical rule**: `private` fields, `public` methods when part of the class contract. Expose the minimum.

## Packages

A **package** is a hierarchical namespace. All classes are organized into packages:

```
src/main/java/
└── it/
    └── zth/
        └── bank/
            ├── BankAccount.java     // package it.zth.bank
            ├── Customer.java
            └── transactions/
                └── Transfer.java     // package it.zth.bank.transactions
```

Each file must declare its package as the **first statement**:

```java
package it.zth.bank;
```

### Imports

```java
import java.util.List;
import java.util.ArrayList;
import java.util.*;           // everything in java.util (discouraged in serious projects)
import static java.lang.Math.PI;  // static import
```

`java.lang` classes (String, Integer, System, ...) are auto-imported.

## What happens at `new`?

```mermaid
sequenceDiagram
    participant C as Code
    participant JVM as JVM
    participant H as Heap
    participant CON as Constructor

    C->>JVM: new Person("Anna", 30)
    JVM->>H: allocate memory for Person
    H-->>JVM: object address
    JVM->>JVM: initialize fields to defaults (0, false, null)
    JVM->>CON: call Person(String, int)
    CON->>CON: this.name = "Anna"; this.age = 30
    CON-->>JVM: object ready
    JVM-->>C: return reference
```

1. JVM **allocates memory** on the heap.
2. Initializes all fields to defaults (`0`, `false`, `null`).
3. Calls the constructor.
4. Returns the reference.

## Full example: a mini system

```java
package it.zth.shop;

public class Product {
    private final String code;
    private final String name;
    private double price;

    public Product(String code, String name, double price) {
        if (price < 0) throw new IllegalArgumentException("price < 0");
        this.code = code;
        this.name = name;
        this.price = price;
    }

    public String getCode() { return code; }
    public String getName() { return name; }
    public double getPrice() { return price; }

    public void applyDiscount(double percent) {
        if (percent < 0 || percent > 100)
            throw new IllegalArgumentException("invalid percent");
        this.price *= (1 - percent / 100.0);
    }

    @Override
    public String toString() {
        return "Product[" + code + " " + name + " " + price + "€]";
    }
}
```

`@Override` on `toString()` will make sense as soon as you see inheritance (section 5).

```java
Product p = new Product("ABC-123", "Keyboard", 49.90);
System.out.println(p);          // Product[ABC-123 Keyboard 49.9€]
p.applyDiscount(10);
System.out.println(p);          // Product[ABC-123 Keyboard 44.910...€]
```

## Exercises

<details>
<summary>Ex 4.1 — `Point2D` class</summary>

Create a `Point2D` class with `double x`, `double y` fields, parameterized constructor, `distance(Point2D other)` method computing Euclidean distance, and `toString()`.

```java
public class Point2D {
    private final double x, y;

    public Point2D(double x, double y) { this.x = x; this.y = y; }
    public double getX() { return x; }
    public double getY() { return y; }

    public double distance(Point2D other) {
        double dx = x - other.x;
        double dy = y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    @Override
    public String toString() { return "(" + x + ", " + y + ")"; }
}
```

</details>

<details>
<summary>Ex 4.2 — `BankAccount` with `IllegalStateException`</summary>

Implement `BankAccount` with `deposit`, `withdraw`, `getBalance`. Throw `IllegalArgumentException` for negative amounts, `IllegalStateException` for overdraft.

See the example above. Add a test:

```java
public static void main(String[] args) {
    BankAccount c = new BankAccount("IT60X0000", 100);
    c.deposit(50);
    System.out.println(c.getBalance()); // 150
    try {
        c.withdraw(200);
    } catch (IllegalStateException e) {
        System.out.println("KO: " + e.getMessage());
    }
}
```

</details>

<details>
<summary>Ex 4.3 — Singleton with `static`</summary>

Create a `Logger` class with a **single instance** obtainable via `Logger.getInstance()`. The constructor must be `private`.

```java
public class Logger {
    private static final Logger INSTANCE = new Logger();
    private Logger() {}
    public static Logger getInstance() { return INSTANCE; }

    public void info(String msg) {
        System.out.println("[INFO] " + msg);
    }
}

// usage
Logger.getInstance().info("hi");
```

Classic Singleton pattern. In Spring you'll do it with `@Bean` or `@Component` (default singleton scope).

</details>

<details>
<summary>Ex 4.4 — Constructor chaining</summary>

Create `Rectangle` with two constructors: one takes width and height, the other takes only the side (square). The "side" constructor must call the other via `this(...)`.

```java
public class Rectangle {
    private final double width, height;

    public Rectangle(double width, double height) {
        if (width <= 0 || height <= 0)
            throw new IllegalArgumentException("non-positive dimension");
        this.width = width;
        this.height = height;
    }

    public Rectangle(double side) {
        this(side, side);
    }

    public double area() { return width * height; }
}
```

</details>

<details>
<summary>Ex 4.5 — Static vs instance variables</summary>

How many lines does this program print?

```java
public class Mystery {
    static int s = 0;
    int i = 0;

    public Mystery() { s++; i++; }

    public static void main(String[] args) {
        Mystery a = new Mystery();
        Mystery b = new Mystery();
        Mystery c = new Mystery();
        System.out.println(a.s + " " + a.i);
        System.out.println(b.s + " " + b.i);
        System.out.println(c.s + " " + c.i);
    }
}
```

Output:
```
3 1
3 1
3 1
```

`s` is shared across all instances (`static`): incremented three times. `i` is per instance: each sees it as 1.

</details>

## Take-aways

- **Class** = template, **object** = instance created with `new`.
- Constructor = initialization. `this(...)` calls another constructor in the same class.
- `this` disambiguates field vs parameter.
- `static` belongs to the class, not the instance.
- Visibility: `private` for internals, `public` for the contract. Expose the minimum.
- Organize into **packages** (folders) by functional domain.

Next: inheritance, polymorphism, interfaces.
