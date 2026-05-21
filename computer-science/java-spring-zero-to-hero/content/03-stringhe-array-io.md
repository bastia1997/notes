---
title: "Stringhe, array, I/O da console"
area: "Java Foundations"
order: 3
level: "principiante"
summary: "String è immutabile: perché conta. StringBuilder e StringBuffer, formattazione, text blocks. Array a una e più dimensioni. Lettura input da console con Scanner e BufferedReader."
prereq: ["Sezione 2"]
tools: ["JDK 21"]
---

# Stringhe, array, I/O da console

## La classe `String`: immutabile, e perché conta

In Java `String` è **immutabile**: una volta creato, l'oggetto non cambia mai. Le operazioni che "modificano" una stringa in realtà ne creano una nuova.

```java
String s = "ciao";
s.toUpperCase();         // crea "CIAO" e lo BUTTA VIA
System.out.println(s);   // "ciao" — invariato
s = s.toUpperCase();     // ora s punta a "CIAO"
System.out.println(s);   // "CIAO"
```

**Perché immutabile?** Sicurezza (la stringa di una password non può essere modificata da sotto), caching (`hashCode` calcolato una volta), thread-safety automatica, **string pool** (vedi sotto).

### String pool

Le **stringhe letterali** sono internamente in una cache (`String pool`):

```java
String a = "ciao";
String b = "ciao";
System.out.println(a == b);   // true, stesso oggetto in pool

String c = new String("ciao");
System.out.println(a == c);   // false, oggetto nuovo sull'heap
System.out.println(a == c.intern());  // true, intern() torna l'istanza dal pool
```

Non usare quasi mai `new String("...")`: spreca memoria.

### Metodi essenziali di `String`

```java
String s = "  Hello, World!  ";
s.length();                 // 17
s.trim();                   // "Hello, World!" (rimuove whitespace iniziale/finale)
s.strip();                  // come trim ma Unicode-aware (Java 11+)
s.toLowerCase();            // "  hello, world!  "
s.toUpperCase();
s.charAt(2);                // 'H'
s.indexOf("World");         // 9
s.indexOf("xyz");           // -1 (non trovato)
s.substring(7, 12);         // "World"  [start, end)
s.replace("World", "Java"); // "  Hello, Java!  "
s.contains("World");        // true
s.startsWith("  Hello");    // true
s.endsWith("!  ");          // true
s.split(",\\s*");           // ["  Hello", "World!  "]
s.isEmpty();                // false
s.isBlank();                // false (Java 11+) — true se solo whitespace
String.join(", ", "a", "b", "c");  // "a, b, c"
"abc".repeat(3);            // "abcabcabc" (Java 11+)
```

### Comparazione

```java
"foo".equals("FOO");                 // false
"foo".equalsIgnoreCase("FOO");       // true
"abc".compareTo("abd");              // -1 (ordinamento lessicografico)
```

### Concatenazione vs `StringBuilder`

La concatenazione con `+` in un loop è **lenta**: ogni `+` crea una nuova `String`.

```java
String s = "";
for (int i = 0; i < 10_000; i++) {
    s += i;       // 10.000 oggetti String temporanei!
}
```

Usa `StringBuilder` per costruire stringhe in modo efficiente:

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10_000; i++) {
    sb.append(i);
}
String s = sb.toString();
```

`StringBuilder` è mutabile e non thread-safe (veloce). `StringBuffer` è la sua versione sincronizzata (più lenta, raramente serve).

> **Nota Java moderno**: il compilatore può ottimizzare `a + b + c` in `StringBuilder` automaticamente (Java 9+ con `invokedynamic`). Ma dentro un loop devi pensarci tu.

### Formattazione

```java
String s = String.format("Ciao %s, sei il #%d", "Mario", 42);
// "Ciao Mario, sei il #42"

System.out.printf("%-10s %6.2f%n", "Prezzo", 19.99);
// "Prezzo      19.99"

// Java 15+: text blocks per stringhe multilinea
String html = """
        <html>
          <body>
            <h1>%s</h1>
          </body>
        </html>
        """.formatted("Titolo");
```

### Codifica caratteri

`String` internamente memorizza in UTF-16 (2 byte per char, 4 per emoji/glifi rari). Quando vai su byte:

```java
byte[] utf8 = "ciao".getBytes(StandardCharsets.UTF_8);
String back = new String(utf8, StandardCharsets.UTF_8);
```

**Sempre** specifica la charset: di default è la "platform default" (su Windows ITA = `windows-1252`, bug garantiti).

## Array

### Dichiarazione e inizializzazione

```java
int[] a = new int[5];        // [0,0,0,0,0]
int[] b = {1, 2, 3, 4, 5};   // letterale
int[] c = new int[]{10, 20}; // alternativa
String[] names = {"Anna", "Beppe", "Carlo"};
```

Lunghezza: `a.length` (campo, non metodo).

### Accesso

```java
b[0];           // 1
b[b.length - 1]; // 5
b[10];          // ArrayIndexOutOfBoundsException a runtime
```

Gli array sono **oggetti**: hanno `.length` ma non `.equals()` significativo (confronta riferimenti). Per confrontare contenuti usa `Arrays.equals()`.

### Multidimensionali

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};
matrix[1][2];   // 6
matrix.length;     // 2 (numero di righe)
matrix[0].length;  // 3 (colonne della riga 0)
```

In realtà sono **array di array**: le righe possono avere lunghezze diverse.

```java
int[][] jagged = new int[3][];
jagged[0] = new int[]{1};
jagged[1] = new int[]{1, 2, 3};
jagged[2] = new int[]{1, 2};
```

### `Arrays`: la classe utility

```java
import java.util.Arrays;

int[] nums = {3, 1, 4, 1, 5, 9, 2, 6};
Arrays.sort(nums);
System.out.println(Arrays.toString(nums));   // [1, 1, 2, 3, 4, 5, 6, 9]

int[] copy = Arrays.copyOf(nums, 4);  // [1, 1, 2, 3]
int idx = Arrays.binarySearch(nums, 5); // 5 (richiede array ordinato)

Arrays.fill(nums, 0);     // tutti a zero

int[] a = {1,2,3};
int[] b = {1,2,3};
System.out.println(a == b);              // false (riferimenti)
System.out.println(Arrays.equals(a, b)); // true
```

## I/O da console

### Stampa

```java
System.out.println("ciao");     // newline alla fine
System.out.print("nuovo ");
System.out.print("riga");
System.out.println();           // newline
System.out.printf("%s ha %d anni%n", "Luca", 30);
System.err.println("errore!"); // su stderr
```

`%n` è il newline portabile (`\n` su Linux, `\r\n` su Windows).

### Lettura: `Scanner`

```java
import java.util.Scanner;

public class Echo {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Come ti chiami? ");
            String nome = sc.nextLine();
            System.out.print("Età: ");
            int eta = sc.nextInt();
            System.out.printf("Ciao %s, hai %d anni%n", nome, eta);
        }
    }
}
```

> **Trappola classica**: dopo `nextInt()`, il newline rimane nel buffer. Un successivo `nextLine()` legge una riga vuota. Per evitarlo: chiama `sc.nextLine()` "di pulizia" dopo l'int.

### Lettura: `BufferedReader` (più efficiente)

```java
import java.io.*;

try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
    String line = br.readLine();
    int n = Integer.parseInt(line);
    System.out.println("Letto: " + n);
}
```

`BufferedReader.readLine()` è molto più veloce di `Scanner` per leggere grandi quantità di dati.

### `try-with-resources`

Le risorse (file, scanner, connessioni) vanno chiuse. Java 7+ ha il pattern `try-with-resources`:

```java
try (Scanner sc = new Scanner(System.in)) {
    // ...
} // sc.close() automatico, anche se eccezione
```

Tutto ciò che implementa `AutoCloseable` funziona qui dentro. Le useremo dappertutto.

### Argomenti da riga di comando

```java
public static void main(String[] args) {
    if (args.length < 1) {
        System.err.println("Usage: java MyApp <nome>");
        System.exit(1);
    }
    System.out.println("Ciao " + args[0]);
}
```

`args` contiene gli argomenti dopo il nome della classe.

## Esercizi

<details>
<summary>Es 3.1 — Palindromo</summary>

Scrivi una funzione che restituisce `true` se la stringa è un palindromo, ignorando case e spazi.

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
isPalindrome("ciao");          // false
```

</details>

<details>
<summary>Es 3.2 — Reverse di array senza copia</summary>

Inverti un array `int[]` in-place (modificando l'originale).

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
<summary>Es 3.3 — Conta parole</summary>

Leggi una riga da stdin, conta le parole (separate da uno o più spazi).

```java
import java.util.Scanner;
public class WordCount {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Frase: ");
            String line = sc.nextLine().trim();
            int count = line.isEmpty() ? 0 : line.split("\\s+").length;
            System.out.println("Parole: " + count);
        }
    }
}
```

</details>

<details>
<summary>Es 3.4 — Sostituisci StringBuilder a `+=`</summary>

Genera una stringa con i numeri da 1 a 100.000 concatenati, prima con `+=`, poi con `StringBuilder`. Misura il tempo (`System.nanoTime`).

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

Vedrai differenze di 100x o più. Per N piccoli (< 100) la differenza è trascurabile.

</details>

<details>
<summary>Es 3.5 — Anagrammi</summary>

Due parole sono anagrammi se hanno le stesse lettere in ordine diverso. Implementa:

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

## Cosa devi portarti via

- `String` è immutabile. Le "modifiche" creano nuovi oggetti.
- Per costruire stringhe nei loop: `StringBuilder`.
- Per confronti: `.equals()`, mai `==` con stringhe (tranne controllo `null`).
- Array hanno `.length` (campo). Gli accessi fuori range lanciano `ArrayIndexOutOfBoundsException`.
- Usa `Arrays.toString`, `Arrays.equals`, `Arrays.sort`, `Arrays.copyOf`.
- Per leggere input: `Scanner` (semplice), `BufferedReader` (veloce). Sempre `try-with-resources`.
- Specifica sempre la **charset** quando converti `String` ⟷ `byte[]`.

Prossimo passo: OOP — classi, oggetti, costruttori.
