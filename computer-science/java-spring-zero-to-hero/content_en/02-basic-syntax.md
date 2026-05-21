---
title: "Basic syntax: types, variables, operators, control flow"
area: "Java Foundations"
order: 2
level: "beginner"
summary: "Primitive types (int, long, double, boolean, ...) vs references, variable scope, casts and promotion, arithmetic and bitwise operators, if/else, switch expression, while/do-while/for/for-each, break/continue, subtleties (overflow, integer division, ==)."
prereq: ["Section 1"]
tools: ["JDK 21"]
---

# Basic syntax: types, variables, operators, control flow

## The primitive types: 8, full stop

Java has **8 primitive types**. They live outside the heap (on the stack), are not objects, have no methods. They are pure "memory cells".

| Type | Size | Range | Default | Typical use |
|---|---|---|---|---|
| `boolean` | 1 logical bit (1 byte JVM) | `true` / `false` | `false` | Flags |
| `byte` | 8 bit | -128 .. 127 | `0` | File/protocol bytes |
| `short` | 16 bit | -32768 .. 32767 | `0` | Rare, legacy |
| `char` | 16 bit unsigned | 0 .. 65535 (UTF-16 code unit) | ` ` | Single character |
| `int` | 32 bit | ~ ±2.1 billion | `0` | Default for integers |
| `long` | 64 bit | ~ ±9.2·10¹⁸ | `0L` | Big ids, timestamps |
| `float` | 32 bit IEEE 754 | ±3.4·10³⁸ | `0.0f` | Rare, graphics |
| `double` | 64 bit IEEE 754 | ±1.8·10³⁰⁸ | `0.0` | Default for decimals |

> **Practical rule**: use `int` for almost all integers and `double` for almost all decimals. `long` if you really need it (e.g. millis timestamp). Never use `float` unless you know *exactly* why. **Never** use `float`/`double` for money (see below).

### Suffixes and literals

```java
int  a = 100;
long b = 100L;          // L required if it exceeds int
long c = 9_999_999_999L; // underscores are readable, ignored
double pi = 3.14;
float  pif = 3.14f;     // f required
int hex = 0xFF;          // 255
int bin = 0b1010_0001;   // 161
char cc = 'A';           // single quotes
char unicode = '€';
```

### References (everything else)

Everything that isn't a primitive is a **reference** to an object on the heap.

```java
String  name = "Mario";          // reference (pointer) to a String object
Integer x    = 42;               // boxed Integer, NOT primitive int
int[]   arr  = {1, 2, 3};        // reference to an array
LocalDate d  = LocalDate.now();  // reference to LocalDate
```

References can be `null`. Primitives cannot.

```java
String s = null;     // ok
int    n = null;     // does NOT compile
```

## Variables: declaration and scope

```java
public class ScopeDemo {
    static int globalCounter = 0;   // class field (static)
    int instanceCounter = 0;        // instance field

    public void demo() {
        int localCounter = 0;       // local variable
        for (int i = 0; i < 5; i++) {
            int inLoop = i * 2;     // scope: only inside the for
            localCounter += inLoop;
        }
        // here `inLoop` no longer exists
        System.out.println(localCounter);
    }
}
```

Rule: **a variable exists from the point of declaration to the end of the `{ }` block that contains it**.

### `var`: type inference (Java 10+)

```java
var name = "Mario";        // inferred: String
var n    = 42;             // inferred: int
var list = new ArrayList<String>();  // inferred: ArrayList<String>
```

Constraints:
- Only for **local** variables with **initialization**.
- Not for method parameters, class fields, return types.
- `var n = null;` does NOT compile (no type info).
- `var n;` does NOT compile.

> **Use `var` when the type is obvious from the value on the right**. Not to hide complex types: the reader has to understand at a glance.

### `final`: the variable cannot be reassigned

```java
final int MAX = 10;
MAX = 11;   // compile error
```

`final` does not mean "deeply immutable":

```java
final List<Integer> nums = new ArrayList<>();
nums.add(1);  // ok! the reference is final, but the object is mutable
nums = new ArrayList<>();  // ERROR: you're reassigning
```

For true immutability you need immutable classes (`List.of()`, `Collections.unmodifiableList`, `record`, we'll see).

## Operators

### Arithmetic

```java
int a = 17, b = 5;
System.out.println(a + b);   // 22
System.out.println(a - b);   // 12
System.out.println(a * b);   // 85
System.out.println(a / b);   // 3   <-- INTEGER division (truncates)
System.out.println(a % b);   // 2   <-- modulo
System.out.println((double) a / b);  // 3.4  <-- forcing double
```

**Trap**: division between `int` truncates. `(int)(7/2) == 3`. For decimals you need at least one operand in floating point.

### Compound assignment

```java
int x = 10;
x += 5;   // x = 15
x -= 2;   // x = 13
x *= 3;   // x = 39
x /= 4;   // x = 9
x %= 5;   // x = 4
```

### Increment

```java
int i = 5;
int a = i++;  // a = 5, then i becomes 6 (post-increment)
int j = 5;
int b = ++j;  // j becomes 6, then b = 6 (pre-increment)
```

### Bitwise

```java
int x = 0b1100;
int y = 0b1010;
System.out.println(Integer.toBinaryString(x & y));  // 1000 (AND)
System.out.println(Integer.toBinaryString(x | y));  // 1110 (OR)
System.out.println(Integer.toBinaryString(x ^ y));  // 0110 (XOR)
System.out.println(Integer.toBinaryString(~x));     // ...11110011 (NOT)
System.out.println(Integer.toBinaryString(x << 2)); // 110000 (left shift)
System.out.println(Integer.toBinaryString(x >> 1)); // 110 (right shift, keeps sign)
System.out.println(Integer.toBinaryString(x >>> 1));// 110 (right shift, zero-fill)
```

### Comparison

```java
a == b   // equality (primitives: values; objects: SAME reference)
a != b
a < b, a <= b, a > b, a >= b
```

> **`==` between objects compares references, not contents.** To compare contents use `.equals()`.

```java
String s1 = new String("hi");
String s2 = new String("hi");
System.out.println(s1 == s2);       // false (different references)
System.out.println(s1.equals(s2));  // true  (same content)
```

### Logical

```java
a && b   // AND (short-circuit: if a is false, b is not evaluated)
a || b   // OR  (short-circuit: if a is true, b is not evaluated)
!a       // NOT
```

Short-circuit saves you from `NullPointerException`:

```java
if (s != null && s.length() > 0) { ... }  // ok
if (s.length() > 0 && s != null) { ... }  // BOOM if s is null
```

### Ternary

```java
int x = (a > b) ? a : b;
String msg = (n == 1) ? "1 item" : n + " items";
```

## Overflow: why a positive number can turn negative

`int` has range -2³¹ .. 2³¹-1 (~ ±2.1 billion). If you overflow, it wraps (**silent wrap-around**):

```java
int big = Integer.MAX_VALUE;     // 2147483647
System.out.println(big + 1);     // -2147483648   <-- silent overflow!
```

Java does not throw on integer overflow. It is *the* bug source in badly written financial code.

**Solutions:**
1. Use `long`. Works as long as you stay under 9·10¹⁸.
2. Use `Math.addExact`, `Math.multiplyExact`, ... which throws `ArithmeticException` on overflow:
   ```java
   int sum = Math.addExact(big, 1);  // ArithmeticException: integer overflow
   ```
3. For money and precise calculations: **`BigDecimal`**. Always. See section 6.

## Floating point: why 0.1 + 0.2 isn't 0.3

```java
System.out.println(0.1 + 0.2);   // 0.30000000000000004
System.out.println(0.1 + 0.2 == 0.3);  // false
```

`double` is IEEE 754: 0.1 cannot be represented exactly in binary (it's periodic, like 1/3 in decimal). Never use `double` for money. Use `BigDecimal`:

```java
import java.math.BigDecimal;
BigDecimal a = new BigDecimal("0.1");
BigDecimal b = new BigDecimal("0.2");
System.out.println(a.add(b));   // 0.3 exact
```

Note: pass **strings** to the constructor, not `double`. `new BigDecimal(0.1)` is already "broken" because 0.1 itself is imprecise.

## Control flow

### `if / else`

```java
if (balance > 1000) {
    tier = "GOLD";
} else if (balance > 100) {
    tier = "SILVER";
} else {
    tier = "BRONZE";
}
```

### Classic `switch`

```java
String day = switch (n) {
    case 1: yield "Mon";    // syntax with yield (Java 14+)
    case 2: yield "Tue";
    default: yield "Unknown";
};
```

### Arrow `switch` expression (Java 14+)

```java
String day = switch (n) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3, 4, 5 -> "Workday";
    case 6, 7 -> "Weekend";
    default -> "Unknown";
};
```

> Arrow switch has no fall-through: no `break` needed. Safer.

### Pattern matching in switch (Java 21)

```java
sealed interface Shape permits Circle, Square {}
record Circle(double r) implements Shape {}
record Square(double side) implements Shape {}

double area(Shape s) {
    return switch (s) {
        case Circle c -> Math.PI * c.r() * c.r();
        case Square sq -> sq.side() * sq.side();
    };
}
```

Covered in detail in Section 18.

### `while` and `do-while`

```java
int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}

int j = 0;
do {
    System.out.println(j);
    j++;
} while (j < 5);   // runs at least once
```

### Classic `for`

```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

### `for-each`

```java
int[] nums = {1, 2, 3, 4, 5};
for (int n : nums) {
    System.out.println(n);
}

List<String> words = List.of("hello", "world");
for (String w : words) {
    System.out.println(w);
}
```

### `break` and `continue`

```java
for (int i = 0; i < 100; i++) {
    if (i == 50) break;        // exits the loop
    if (i % 2 == 0) continue;  // skip to next i
    System.out.println(i);     // prints only odd < 50
}
```

### Labeled `break` (rare, but exists)

```java
outer:
for (int i = 0; i < 10; i++) {
    for (int j = 0; j < 10; j++) {
        if (i * j > 30) break outer;  // exits BOTH loops
    }
}
```

## Exercises

<details>
<summary>Ex 2.1 — Explicit overflow</summary>

Write a program that:
1. Prints `Integer.MAX_VALUE`.
2. Computes `Integer.MAX_VALUE + 1` and prints the result (you'll see negative).
3. Uses `Math.addExact` to do the same sum. Catches the exception and prints "overflow".

```java
public class Overflow {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;
        System.out.println("max = " + max);
        System.out.println("max + 1 (silent) = " + (max + 1));
        try {
            int r = Math.addExact(max, 1);
            System.out.println("r = " + r);
        } catch (ArithmeticException e) {
            System.out.println("overflow detected!");
        }
    }
}
```

</details>

<details>
<summary>Ex 2.2 — Correct money</summary>

Implement a function `addVat(BigDecimal price, BigDecimal rate)` that returns the VAT-inclusive price. Rate in `0.22` format for 22%.

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

public class Vat {
    public static BigDecimal addVat(BigDecimal price, BigDecimal rate) {
        return price.multiply(BigDecimal.ONE.add(rate))
                    .setScale(2, RoundingMode.HALF_UP);
    }

    public static void main(String[] args) {
        BigDecimal p = new BigDecimal("19.99");
        BigDecimal v = new BigDecimal("0.22");
        System.out.println(addVat(p, v));  // 24.39
    }
}
```

Key points: pass strings, use `.multiply` not `*`, use `setScale` to round to 2 decimals.

</details>

<details>
<summary>Ex 2.3 — FizzBuzz (the classic)</summary>

Print numbers 1..30. For multiples of 3 print "Fizz", for multiples of 5 "Buzz", for multiples of both "FizzBuzz".

```java
public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 30; i++) {
            String out;
            if (i % 15 == 0) out = "FizzBuzz";
            else if (i % 3 == 0) out = "Fizz";
            else if (i % 5 == 0) out = "Buzz";
            else out = String.valueOf(i);
            System.out.println(out);
        }
    }
}
```

</details>

<details>
<summary>Ex 2.4 — `==` vs `.equals()`</summary>

Guess the output:

```java
String a = "hi";
String b = "hi";
String c = new String("hi");

System.out.println(a == b);
System.out.println(a == c);
System.out.println(a.equals(c));
```

Answer:

- `a == b` → **true**. String literals are interned: same object in memory.
- `a == c` → **false**. `new String("...")` creates a new heap object.
- `a.equals(c)` → **true**. Content comparison.

Lesson: **for strings always use `.equals()`**, never `==`.

</details>

<details>
<summary>Ex 2.5 — Loop with two indexes</summary>

Print a 5×5 matrix where each cell contains `i*j`. Align columns (use `%4d` with `printf`).

```java
public class Matrix {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 5; j++) {
                System.out.printf("%4d", i * j);
            }
            System.out.println();
        }
    }
}
```

</details>

## Take-aways

- 8 primitives, everything else is a reference. `null` only for references.
- `int` and `double` as defaults. **Never** `double` for money: use `BigDecimal`.
- `==` compares references for objects. Use `.equals()`.
- `int` overflow is silent. Use `Math.addExact` or `long`/`BigInteger`.
- Arrow `switch` expressions are almost always better than the classic form.
- `var` only for locals, when the type is obvious from the value.

Next: strings, arrays and console I/O.
