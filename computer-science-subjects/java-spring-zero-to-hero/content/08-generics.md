---
title: "Generics: tipi parametrici, PECS, type erasure, wildcards"
area: "Java Foundations"
order: 8
level: "intermedio"
summary: "Cos'è un tipo generico, perché esiste, type parameters in classi e metodi, bounded type parameters, wildcards (extends, super, ?), regola PECS, type erasure e i suoi limiti."
prereq: ["Sezione 7"]
tools: ["JDK 21"]
---

# Generics: tipi parametrici, PECS, type erasure, wildcards

## Perché esistono i generics

Prima di Java 5, `List` era così:

```java
List nomi = new ArrayList();
nomi.add("Anna");
nomi.add(42);                    // ouch, compila ma...
String s = (String) nomi.get(1); // ClassCastException a runtime
```

Senza generics, le collezioni "sapevano" solo di contenere `Object`. Casting manuale, errori a runtime.

I **generics** (Java 5+) ti danno **type safety a compile time**:

```java
List<String> nomi = new ArrayList<>();
nomi.add("Anna");
nomi.add(42);                    // ERRORE compilazione
String s = nomi.get(0);          // niente cast
```

## Classi e metodi generici

### Classe generica

```java
public class Box<T> {
    private T contenuto;
    public Box(T contenuto) { this.contenuto = contenuto; }
    public T get() { return contenuto; }
    public void set(T v) { this.contenuto = v; }
}

Box<String> b1 = new Box<>("ciao");
Box<Integer> b2 = new Box<>(42);
```

`T` è il **type parameter**. Convenzioni:
- `T` (Type) — generico
- `E` (Element) — per collezioni
- `K`, `V` (Key, Value) — per mappe
- `R` (Return)
- `N` (Number)

### Più parametri

```java
public class Coppia<K, V> {
    private final K chiave;
    private final V valore;
    public Coppia(K k, V v) { this.chiave = k; this.valore = v; }
    public K chiave() { return chiave; }
    public V valore() { return valore; }
}
```

### Metodo generico

```java
public static <T> T primo(List<T> lista) {
    if (lista.isEmpty()) return null;
    return lista.get(0);
}

String s = primo(List.of("a", "b"));   // T = String
Integer i = primo(List.of(1, 2));      // T = Integer
```

Il `<T>` *prima* del tipo di ritorno introduce il parametro.

## Bounded type parameters

### Upper bound: `extends`

Limita `T` a essere un sottotipo di qualcosa.

```java
public static <T extends Number> double somma(List<T> nums) {
    double s = 0;
    for (T n : nums) s += n.doubleValue();   // Number ha doubleValue()
    return s;
}

somma(List.of(1, 2, 3));         // ok, Integer extends Number
somma(List.of(1.0, 2.0));        // ok
somma(List.of("a", "b"));        // ERRORE, String non extends Number
```

### Bound multipli

```java
public static <T extends Number & Comparable<T>> T max(List<T> l) {
    T m = l.get(0);
    for (T x : l) if (x.compareTo(m) > 0) m = x;
    return m;
}
```

`& Comparable<T>` aggiunge un secondo vincolo. La classe (se presente) deve essere il primo bound.

## Wildcards

### `?` — wildcard incognita

```java
List<?> lista = ...;        // lista di qualcosa, non so cosa
lista.size();               // ok
lista.add("x");             // ERRORE: non puoi aggiungere
Object x = lista.get(0);    // ok, ma solo come Object
```

`List<?>` è usabile per leggere "qualcosa", ma non per aggiungere (tranne `null`).

### `? extends T` — covariance (lettura)

```java
public static double sommaNumeri(List<? extends Number> nums) {
    double s = 0;
    for (Number n : nums) s += n.doubleValue();
    return s;
}

sommaNumeri(List.of(1, 2, 3));         // List<Integer>: ok
sommaNumeri(List.of(1.0, 2.0));        // List<Double>: ok
```

`List<? extends Number>` accetta `List<Integer>`, `List<Double>`, `List<Float>`, etc. Ma:

```java
List<? extends Number> l = new ArrayList<Integer>();
l.add(42);  // ERRORE: non sai esattamente cos'è dentro
```

Puoi **leggere** ma non **scrivere** (tranne `null`).

### `? super T` — contravariance (scrittura)

```java
public static void aggiungi(List<? super Integer> lista) {
    lista.add(1);
    lista.add(2);
}

List<Integer> li = new ArrayList<>();
List<Number> ln = new ArrayList<>();
List<Object> lo = new ArrayList<>();
aggiungi(li);   // ok
aggiungi(ln);   // ok
aggiungi(lo);   // ok
```

`List<? super Integer>` accetta `List<Integer>`, `List<Number>`, `List<Object>`. Puoi **scrivere** ma non sai cosa esce quando leggi (solo `Object`).

### PECS: Producer Extends, Consumer Super

Regola d'oro:

- Se la collezione **produce** valori per te (la leggi) → `? extends T`
- Se la collezione **consuma** valori che le passi (la scrivi) → `? super T`

```java
public static <T> void copia(List<? extends T> sorgente, List<? super T> destinazione) {
    for (T x : sorgente) destinazione.add(x);
    //       ↑ produce               ↑ consuma
}
```

Esempio reale dalla JDK: `Collections.copy(List<? super T> dest, List<? extends T> src)`.

## Type erasure: il segreto sporco

I generics esistono *solo a compile-time*. A runtime, la JVM non li vede:

```java
List<String> li = new ArrayList<>();
List<Integer> li2 = new ArrayList<>();
System.out.println(li.getClass() == li2.getClass());   // true!
```

A runtime sono entrambi `ArrayList`. Tutti i `T` vengono cancellati ("type erasure"), sostituiti col bound (`Object` se non specificato).

### Conseguenze pratiche

1. **Non puoi fare `new T()`**:
   ```java
   public class Box<T> {
       T newOne() { return new T(); }   // NON compila
   }
   ```
   Workaround: passa un `Supplier<T>` o una `Class<T>`.

2. **Non puoi fare `instanceof List<String>`**:
   ```java
   if (x instanceof List<String>) ...   // NON compila
   if (x instanceof List<?>) ...        // ok
   ```

3. **Array generici proibiti**:
   ```java
   T[] arr = new T[10];                   // NON compila
   List<String>[] arr = new List[10];     // unsafe warning
   ```
   Usa `List<T>` invece di array.

4. **Overload "fantasma"**:
   ```java
   void f(List<String> l) {}
   void f(List<Integer> l) {}   // NON compila: stessa firma dopo erasure
   ```

### Reified vs erased

C# ha "reified generics": il tipo è disponibile a runtime. Java no. Pagamenti tempo, ma a volte ti tocca:

```java
public <T> T parse(String json, Class<T> clazz) {
    // ottieni T a runtime
}
parse("{...}", Customer.class);
```

Le librerie come Jackson e Spring usano `TypeReference` o `ParameterizedTypeReference` per workaround.

## Generics e collezioni della JDK

Tutte le collezioni sono generiche:

```java
List<Customer> customers = new ArrayList<>();
Map<String, Customer> byEmail = new HashMap<>();
Set<UUID> ids = new HashSet<>();
Optional<User> user = repo.find(42);
Stream<Order> orders = ...;
```

Il diamond `<>` (Java 7+) lascia inferire il tipo a destra:

```java
List<Customer> list = new ArrayList<>();   // invece di new ArrayList<Customer>()
```

## Esempio integrato: Repository generico

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
        // ...
        return Optional.empty();
    }
    // ...
}
```

Spring Data JPA usa esattamente questo schema: `JpaRepository<T, ID>`.

## Esercizi

<details>
<summary>Es 8.1 — `Pair<A, B>`</summary>

Crea un record `Pair<A, B>` con metodi `first()`, `second()`, `swap()` (ritorna `Pair<B, A>`).

```java
public record Pair<A, B>(A first, B second) {
    public Pair<B, A> swap() { return new Pair<>(second, first); }
}

Pair<String, Integer> p = new Pair<>("ciao", 1);
Pair<Integer, String> q = p.swap();
```

</details>

<details>
<summary>Es 8.2 — `min` generico</summary>

Implementa `static <T extends Comparable<T>> T min(List<T> list)`.

```java
public static <T extends Comparable<T>> T min(List<T> list) {
    if (list.isEmpty()) throw new IllegalArgumentException("vuota");
    T m = list.get(0);
    for (T x : list) if (x.compareTo(m) < 0) m = x;
    return m;
}

min(List.of(3, 1, 4, 1, 5));        // 1
min(List.of("banana", "apple"));    // "apple"
```

</details>

<details>
<summary>Es 8.3 — Applica PECS</summary>

Scrivi `static <T> void aggiungiTutto(List<? super T> dest, T... elementi)`.

```java
public static <T> void aggiungiTutto(List<? super T> dest, T... elementi) {
    for (T e : elementi) dest.add(e);
}

List<Number> ln = new ArrayList<>();
aggiungiTutto(ln, 1, 2, 3);   // ln è List<Number>, ricevuto Integer: ok
```

</details>

<details>
<summary>Es 8.4 — Type erasure trap</summary>

Compila o no?

```java
public class Wrap<T> {
    public T value() { ... }
    public Integer value() { return 0; }   // overload?
}
```

**Non compila.** Dopo erasure entrambi i metodi sono `Object value()`/`Integer value()` con la stessa firma (`T` cancella in `Object`). Conflitto.

</details>

<details>
<summary>Es 8.5 — Wildcard quiz</summary>

Quale di queste compila?

```java
List<Number> ln = new ArrayList<>();
List<? extends Number> lext = ln;
List<? super Number> lsup = ln;

lext.add(1);     // ?
lsup.add(1);     // ?
Number n1 = lext.get(0);     // ?
Number n2 = lsup.get(0);     // ?
```

- `lext.add(1)` → **errore**: con `? extends`, non puoi aggiungere.
- `lsup.add(1)` → **ok**: puoi aggiungere Integer (subtipo di Number).
- `n1 = lext.get(0)` → **ok**: leggi come Number (limite superiore).
- `n2 = lsup.get(0)` → **errore**: con `? super`, leggi come `Object`.

</details>

## Cosa devi portarti via

- Generics = type safety a compile time. Niente cast espliciti.
- `<T extends X>` per limitare ad un sottotipo di X.
- **PECS**: `? extends` per produrre (leggere), `? super` per consumare (scrivere).
- **Type erasure**: a runtime i parametri di tipo sono cancellati. Implicazioni: niente `new T()`, niente array generici diretti.
- I record + generics + collezioni = fondamenta della programmazione moderna in Java.

Prossimo: Collections framework in dettaglio.
