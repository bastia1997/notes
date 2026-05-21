---
title: "Strings, arrays, console I/O"
area: "Java Foundations"
order: 3
level: "beginner"
summary: "String is immutable: why it matters. StringBuilder and StringBuffer, formatting, text blocks. One- and multi-dimensional arrays. Reading input from console with Scanner and BufferedReader."
prereq: ["Section 2"]
tools: ["JDK 21"]
---

# Strings, arrays, console I/O

## The `String` class: immutable, and why it matters

In Java `String` is **immutable**: once created, the object never changes. Operations that "modify" a string actually create a new one.

```java
String s = "hello";
s.toUpperCase();         // creates "HELLO" and THROWS IT AWAY
System.out.println(s);   // "hello" — unchanged
s = s.toUpperCase();     // now s points to "HELLO"
System.out.println(s);   // "HELLO"
```

**Why immutable?** Security (a password string can't be modified under you), caching (`hashCode` computed once), automatic thread-safety, **string pool** (see below).

### String pool

**String literals** are stored in an internal cache (`String pool`):

```java
String a = "hi";
String b = "hi";
System.out.println(a == b);   // true, same pooled object

String c = new String("hi");
System.out.println(a == c);   // false, fresh object on heap
System.out.println(a == c.intern());  // true, intern() returns pool instance
```

Almost never use `new String("...")`: it wastes memory.

### Essential `String` methods

```java
String s = "  Hello, World!  ";
s.length();                 // 17
s.trim();                   // "Hello, World!" (strips leading/trailing whitespace)
s.strip();                  // like trim but Unicode-aware (Java 11+)
s.toLowerCase();
s.toUpperCase();
s.charAt(2);                // 'H'
s.indexOf("World");         // 9
s.indexOf("xyz");           // -1 (not found)
s.substring(7, 12);         // "World"  [start, end)
s.replace("World", "Java"); // "  Hello, Java!  "
s.contains("World");        // true
s.startsWith("  Hello");    // true
s.endsWith("!  ");          // true
s.split(",\\s*");           // ["  Hello", "World!  "]
s.isEmpty();                // false
s.isBlank();                // false (Java 11+) — true if only whitespace
String.join(", ", "a", "b", "c");  // "a, b, c"
"abc".repeat(3);            // "abcabcabc" (Java 11+)
```

### Comparison

```java
"foo".equals("FOO");                 // false
"foo".equalsIgnoreCase("FOO");       // true
"abc".compareTo("abd");              // -1 (lexicographic)
```

### Concatenation vs `StringBuilder`

`+` concatenation inside a loop is **slow**: each `+` creates a new `String`.

```java
String s = "";
for (int i = 0; i < 10_000; i++) {
    s += i;       // 10,000 temporary String objects!
}
```

Use `StringBuilder` to build strings efficiently:

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10_000; i++) {
    sb.append(i);
}
String s = sb.toString();
```

`StringBuilder` is mutable and not thread-safe (fast). `StringBuffer` is its synchronized version (slower, rarely needed).

> **Modern Java note**: the compiler may optimize `a + b + c` into `StringBuilder` automatically (Java 9+ with `invokedynamic`). But inside loops you have to do it yourself.

### Formatting

```java
String s = String.format("Hi %s, you are #%d", "Mario", 42);
// "Hi Mario, you are #42"

System.out.printf("%-10s %6.2f%n", "Price", 19.99);
// "Price       19.99"

// Java 15+: text blocks for multi-line strings
String html = """
        <html>
          <body>
            <h1>%s</h1>
          </body>
        </html>
        """.formatted("Title");
```

### Character encoding

`String` is internally stored as UTF-16 (2 bytes per char, 4 for emoji/rare glyphs). When you go to bytes:

```java
byte[] utf8 = "hello".getBytes(StandardCharsets.UTF_8);
String back = new String(utf8, StandardCharsets.UTF_8);
```

**Always** specify the charset: the default is the "platform default" (on Windows ITA = `windows-1252`, guaranteed bugs).

## Arrays

### Declaration and initialization

```java
int[] a = new int[5];        // [0,0,0,0,0]
int[] b = {1, 2, 3, 4, 5};   // literal
int[] c = new int[]{10, 20}; // alternative
String[] names = {"Anna", "Beppe", "Carlo"};
```

Length: `a.length` (field, not method).

### Access

```java
b[0];           // 1
b[b.length - 1]; // 5
b[10];          // ArrayIndexOutOfBoundsException at runtime
```

Arrays are **objects**: they have `.length` but no meaningful `.equals()` (compares references). To compare contents use `Arrays.equals()`.

### Multi-dimensional

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};
matrix[1][2];   // 6
matrix.length;     // 2 (number of rows)
matrix[0].length;  // 3 (columns of row 0)
```

Actually **arrays of arrays**: rows can have different lengths.

```java
int[][] jagged = new int[3][];
jagged[0] = new int[]{1};
jagged[1] = new int[]{1, 2, 3};
jagged[2] = new int[]{1, 2};
```

### `Arrays`: the utility class

```java
import java.util.Arrays;

int[] nums = {3, 1, 4, 1, 5, 9, 2, 6};
Arrays.sort(nums);
System.out.println(Arrays.toString(nums));   // [1, 1, 2, 3, 4, 5, 6, 9]

int[] copy = Arrays.copyOf(nums, 4);  // [1, 1, 2, 3]
int idx = Arrays.binarySearch(nums, 5); // 5 (requires sorted array)

Arrays.fill(nums, 0);     // all zeros

int[] a = {1,2,3};
int[] b = {1,2,3};
System.out.println(a == b);              // false (references)
System.out.println(Arrays.equals(a, b)); // true
```

## Console I/O

### Printing

```java
System.out.println("hi");      // newline at end
System.out.print("new ");
System.out.print("line");
System.out.println();           // newline
System.out.printf("%s is %d%n", "Luca", 30);
System.err.println("error!");  // to stderr
```

`%n` is the portable newline (`\n` on Linux, `\r\n` on Windows).

### Reading: `Scanner`

```java
import java.util.Scanner;

public class Echo {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Your name? ");
            String name = sc.nextLine();
            System.out.print("Age: ");
            int age = sc.nextInt();
            System.out.printf("Hi %s, you're %d%n", name, age);
        }
    }
}
```

> **Classic trap**: after `nextInt()` the newline stays in the buffer. A subsequent `nextLine()` reads an empty line. To avoid it: call a "cleaning" `sc.nextLine()` after the int.

### Reading: `BufferedReader` (more efficient)

```java
import java.io.*;

try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
    String line = br.readLine();
    int n = Integer.parseInt(line);
    System.out.println("Got: " + n);
}
```

`BufferedReader.readLine()` is much faster than `Scanner` for reading large inputs.

### `try-with-resources`

Resources (files, scanners, connections) must be closed. Java 7+ has the `try-with-resources` pattern:

```java
try (Scanner sc = new Scanner(System.in)) {
    // ...
} // sc.close() automatically, even on exception
```

Anything implementing `AutoCloseable` works here. We'll use it everywhere.

### Command-line arguments

```java
public static void main(String[] args) {
    if (args.length < 1) {
        System.err.println("Usage: java MyApp <name>");
        System.exit(1);
    }
    System.out.println("Hello " + args[0]);
}
```

`args` holds arguments after the class name.

## Exercises

<details>
<summary>Ex 3.1 — Palindrome</summary>

Write a function that returns `true` if the string is a palindrome, case- and space-insensitive.

```java
public static boolean isPalindrome(String s) {
    String clean = s.toLowerCase().replaceAll("\\s+", "");
    int i = 0, j = clean.length() - 1;
    while (i < j) {
        if (clean.charAt(i++) != clean.charAt(j--)) return false;
    }
    return true;
}

// test
isPalindrome("anna");          // true
isPalindrome("Ama il mami");   // true
isPalindrome("hello");         // false
```

</details>

<details>
<summary>Ex 3.2 — In-place array reverse</summary>

Reverse an `int[]` in place (mutating the original).

```java
public static void reverse(int[] a) {
    int i = 0, j = a.length - 1;
    while (i < j) {
        int tmp = a[i];
        a[i++] = a[j];
        a[j--] = tmp;
    }
}
```

</details>

<details>
<summary>Ex 3.3 — Word count</summary>

Read one line from stdin, count the words (separated by one or more spaces).

```java
import java.util.Scanner;
public class WordCount {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Sentence: ");
            String line = sc.nextLine().trim();
            int count = line.isEmpty() ? 0 : line.split("\\s+").length;
            System.out.println("Words: " + count);
        }
    }
}
```

</details>

<details>
<summary>Ex 3.4 — StringBuilder vs `+=`</summary>

Build a string of 1..100,000 concatenated, first with `+=`, then with `StringBuilder`. Time it with `System.nanoTime`.

```java
public class BuildPerf {
    public static void main(String[] args) {
        int N = 100_000;

        long t1 = System.nanoTime();
        String s = "";
        for (int i = 0; i < N; i++) s += i;
        long t2 = System.nanoTime();
        System.out.printf("+= : %.2f ms%n", (t2 - t1) / 1e6);

        long t3 = System.nanoTime();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < N; i++) sb.append(i);
        String s2 = sb.toString();
        long t4 = System.nanoTime();
        System.out.printf("sb : %.2f ms%n", (t4 - t3) / 1e6);
    }
}
```

Expect 100x differences or more. For small N (< 100) the gap is negligible.

</details>

<details>
<summary>Ex 3.5 — Anagrams</summary>

Two words are anagrams if they have the same letters in different order.

```java
public static boolean isAnagram(String a, String b) {
    char[] x = a.toLowerCase().toCharArray();
    char[] y = b.toLowerCase().toCharArray();
    if (x.length != y.length) return false;
    Arrays.sort(x);
    Arrays.sort(y);
    return Arrays.equals(x, y);
}
```

</details>

## Take-aways

- `String` is immutable. "Modifications" create new objects.
- To build strings in loops: `StringBuilder`.
- For comparisons: `.equals()`, never `==` with strings (except null checks).
- Arrays have `.length` (field). Out-of-range access throws `ArrayIndexOutOfBoundsException`.
- Use `Arrays.toString`, `Arrays.equals`, `Arrays.sort`, `Arrays.copyOf`.
- For input: `Scanner` (simple), `BufferedReader` (fast). Always `try-with-resources`.
- **Always** specify the **charset** when converting `String` ⟷ `byte[]`.

Next: OOP — classes, objects, constructors.
