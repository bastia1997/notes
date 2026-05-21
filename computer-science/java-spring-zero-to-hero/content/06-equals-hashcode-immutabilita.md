---
title: "OOP III — equals, hashCode, toString, immutabilità, record"
area: "Java Foundations"
order: 6
level: "intermedio"
summary: "Il contratto equals/hashCode, perché rompere uno rompe l'altro. toString. Classi immutabili: le 5 regole. record (Java 14+) come immutabile gratuito. Cloning, defensive copy. Comparable e Comparator."
prereq: ["Sezione 5"]
tools: ["JDK 21"]
---

# OOP III — equals, hashCode, toString, immutabilità, record

## Il contratto `equals`

`Object.equals(Object o)` di default confronta riferimenti. Per uguaglianza **logica** (due oggetti diversi ma "stessa cosa") devi sovrascriverlo.

### Le 5 regole formali

`equals` deve essere:

1. **Riflessiva**: `x.equals(x)` ⟶ `true`
2. **Simmetrica**: `x.equals(y) == y.equals(x)`
3. **Transitiva**: `x.equals(y) && y.equals(z)` ⟶ `x.equals(z)`
4. **Coerente**: chiamate ripetute danno lo stesso risultato (se gli oggetti non sono modificati)
5. `x.equals(null)` ⟶ `false`

### Implementazione standard

```java
public class Persona {
    private final String nome;
    private final int eta;

    public Persona(String nome, int eta) {
        this.nome = nome;
        this.eta = eta;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Persona p)) return false;
        return eta == p.eta && Objects.equals(nome, p.nome);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nome, eta);
    }
}
```

Note importanti:
- `this == o` shortcut per stesso oggetto.
- `instanceof Persona p` (Java 16+) controlla tipo *e* fa il cast.
- `Objects.equals(a, b)` gestisce i `null` (`equals` "null-safe").
- `Objects.hash(...)` genera hash da più campi.

## Il contratto `hashCode`

Regola: **se `equals` ritorna true, allora `hashCode` deve ritornare lo stesso valore**.

Il contrario non è richiesto: due oggetti `!equals` possono avere lo stesso `hashCode` (collisione, normale).

**Conseguenze pratiche**:
- `HashMap` e `HashSet` usano `hashCode` per trovare il bucket, poi `equals` per confermare.
- Se sovrascrivi `equals` e *non* `hashCode`, `HashMap` si rompe in modo subdolo: `map.put(x, ...); map.get(x);` potrebbe restituire `null`.

**Regola di ferro**: sovrascrivi sempre `equals` e `hashCode` insieme.

### Cosa rendere parte di `equals`/`hashCode`

Includi tutti e soli i campi che identificano **l'identità logica** dell'oggetto. Es. per un utente:

- `username` (id naturale) → SÌ
- `email` (univoco) → SÌ
- `nome`, `cognome` → di solito SÌ
- `dataCreazione` → NO (metadato)
- `ultimoLogin` → NO (cambia di continuo)

### Trappola con eredità

Se la classe ha sottoclassi che aggiungono campi, l'uguaglianza diventa scivolosa (simmetria può rompersi). Soluzioni:

1. Usa `getClass() == o.getClass()` invece di `instanceof` (rigido, niente sotto-tipi).
2. Rendi la classe `final` per evitare il problema.
3. Usa la composizione invece dell'ereditarietà.

## `toString`

Default di `Object.toString()` è inutile: `Persona@1d44bcfa`. Sovrascrivi sempre:

```java
@Override
public String toString() {
    return "Persona{nome='" + nome + "', eta=" + eta + "}";
}
```

In log e debug ti salva la vita. IntelliJ lo genera con un click (`Alt+Insert` ⟶ `toString()`).

## Immutabilità

Una classe è **immutabile** se, una volta creato l'oggetto, il suo stato non può cambiare.

### Le 5 regole per renderla immutabile

1. La classe è `final` (o tutti i costruttori sono `private`).
2. Tutti i campi sono `private` e `final`.
3. Nessun setter, nessun metodo che modifica stato.
4. Se hai campi che sono oggetti mutabili (es. `Date`, `List`), fai **defensive copy** in entrata e in uscita.
5. Non esporre `this` durante la costruzione (no "this leak").

```java
public final class PuntoImmutabile {
    private final double x;
    private final double y;

    public PuntoImmutabile(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() { return x; }
    public double getY() { return y; }

    public PuntoImmutabile trasla(double dx, double dy) {
        return new PuntoImmutabile(x + dx, y + dy);   // NUOVO oggetto
    }
}
```

### Perché immutabile?

- **Thread-safe gratis**. Nessun lock necessario.
- **Cacheable**: puoi metterli in mappa come chiave senza paura.
- **Predicibile**: se hai un riferimento a un immutabile, sai che il valore non cambia.

`String`, `Integer`, `LocalDate`, `BigDecimal` sono immutabili. **Sempre** preferiscili a controparti mutabili.

### Defensive copy

Se devi accettare/restituire un oggetto mutabile:

```java
public final class Periodo {
    private final Date inizio;
    private final Date fine;

    public Periodo(Date inizio, Date fine) {
        this.inizio = new Date(inizio.getTime());   // copia in entrata
        this.fine = new Date(fine.getTime());
    }

    public Date getInizio() {
        return new Date(inizio.getTime());           // copia in uscita
    }
}
```

> Oggi useresti `LocalDate`/`Instant` che sono già immutabili. Ma il pattern è da conoscere.

## `record` (Java 14+ stabile dal 16): immutabilità gratis

Un `record` è uno zucchero sintattico per classi-dati immutabili: il compilatore genera campi, costruttore, getter, `equals`, `hashCode`, `toString`.

```java
public record Persona(String nome, int eta) {}
```

Equivale a ~50 righe di codice. Uso:

```java
Persona p = new Persona("Anna", 30);
System.out.println(p.nome());     // accessor (non getNome)
System.out.println(p.eta());
System.out.println(p);            // Persona[nome=Anna, eta=30]

Persona p2 = new Persona("Anna", 30);
System.out.println(p.equals(p2)); // true
System.out.println(p.hashCode() == p2.hashCode()); // true
```

### Costruttore compatto

```java
public record Persona(String nome, int eta) {
    public Persona {                              // costruttore compatto
        if (eta < 0) throw new IllegalArgumentException("eta < 0");
        nome = nome.strip();   // puoi normalizzare
    }
}
```

Le validazioni vanno qui. **Non** puoi aggiungere campi di istanza extra (solo statici).

### Record con metodi

```java
public record Rettangolo(double larghezza, double altezza) {
    public double area() {
        return larghezza * altezza;
    }
    public static Rettangolo quadrato(double lato) {
        return new Rettangolo(lato, lato);
    }
}
```

I record possono implementare interfacce, ma non possono estendere classi (estendono `Record`).

### Quando usare i record

- DTO (Data Transfer Object) per API REST
- Value object (Money, Coordinata, IbanCode, ...)
- Risultati intermedi di stream
- Chiavi composite di mappa

Niente più "ho mille classi di accessori boilerplate".

## `Comparable<T>`: ordinamento naturale

Implementa `Comparable<T>` per definire un ordinamento "naturale" dei tuoi oggetti:

```java
public record Voto(String studente, int punteggio) implements Comparable<Voto> {
    @Override
    public int compareTo(Voto altro) {
        return Integer.compare(this.punteggio, altro.punteggio);
    }
}
```

`compareTo` restituisce:
- `< 0` se `this` è "minore" di altro,
- `0` se uguali,
- `> 0` se `this` è "maggiore".

```java
List<Voto> voti = new ArrayList<>(List.of(
    new Voto("Anna", 28),
    new Voto("Beppe", 30),
    new Voto("Carla", 24)
));
Collections.sort(voti);
System.out.println(voti);
// [Voto[studente=Carla, punteggio=24], Voto[studente=Anna, punteggio=28], ...]
```

**Contratto**: `compareTo` deve essere coerente con `equals`. Se `a.compareTo(b) == 0` allora `a.equals(b)` *dovrebbe* essere `true`. Si può violare, ma `TreeSet`/`TreeMap` si comportano in modo strano.

## `Comparator<T>`: ordinamenti alternativi

Per ordinare in modi diversi senza modificare la classe:

```java
List<Voto> voti = ...;

// per nome
voti.sort(Comparator.comparing(Voto::studente));

// per punteggio decrescente
voti.sort(Comparator.comparingInt(Voto::punteggio).reversed());

// punteggio desc, poi nome asc
voti.sort(Comparator.comparingInt(Voto::punteggio).reversed()
    .thenComparing(Voto::studente));
```

I `Comparator` sono compositi. Bellissimi.

## Esercizi

<details>
<summary>Es 6.1 — `equals`/`hashCode` per `Punto2D`</summary>

Sovrascrivi `equals` e `hashCode` per `Punto2D(double x, double y)`.

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Punto2D p)) return false;
    return Double.compare(p.x, x) == 0 && Double.compare(p.y, y) == 0;
}

@Override
public int hashCode() {
    return Objects.hash(x, y);
}
```

`Double.compare` gestisce `NaN` e zero positivo/negativo correttamente.

</details>

<details>
<summary>Es 6.2 — Trasforma `Persona` in `record`</summary>

Era così:

```java
public class Persona {
    private final String nome;
    private final int eta;
    // costruttore, getter, equals, hashCode, toString...
}
```

Diventa:

```java
public record Persona(String nome, int eta) {}
```

Otto righe in meno.

</details>

<details>
<summary>Es 6.3 — Defensive copy</summary>

Dato `class Gruppo { List<String> membri; }`, rendi `Gruppo` veramente immutabile (la lista non deve poter essere modificata da fuori).

```java
public final class Gruppo {
    private final List<String> membri;

    public Gruppo(List<String> membri) {
        this.membri = List.copyOf(membri);   // immutabile (Java 10+)
    }

    public List<String> getMembri() {
        return membri;   // già immutabile
    }
}
```

`List.copyOf` crea una `List` immutabile. Tentativi di modifica lanciano `UnsupportedOperationException`.

</details>

<details>
<summary>Es 6.4 — Comparator composito</summary>

Hai `List<Voto>`. Ordina prima per `punteggio` decrescente, poi a parità di punteggio per `studente` crescente.

```java
voti.sort(
    Comparator.comparingInt(Voto::punteggio).reversed()
        .thenComparing(Voto::studente)
);
```

</details>

<details>
<summary>Es 6.5 — Hash collisions</summary>

Crea due `Persona("X", 1)` e mettile in una `HashSet`. Quanti elementi ci sono? Cosa succede se sovrascrivi solo `equals` ma non `hashCode`?

Con `record`: solo 1 elemento (equals + hashCode generati correttamente).

Con classe a mano *senza* override di `hashCode`: 2 elementi. La `HashSet` non riconosce che sono "uguali" perché finiscono in bucket diversi.

Prova:
```java
class P {
    String n; int e;
    P(String n, int e) { this.n = n; this.e = e; }
    @Override public boolean equals(Object o) { ... }
    // niente hashCode!
}
HashSet<P> s = new HashSet<>();
s.add(new P("X", 1));
s.add(new P("X", 1));
System.out.println(s.size());   // probabilmente 2: bug!
```

</details>

## Cosa devi portarti via

- `equals` e `hashCode` sempre **insieme**. Usa `Objects.equals` / `Objects.hash`.
- `toString` sovrascrivilo: in log e debug ti salva.
- **Immutabilità** = thread-safe gratis + meno bug. Preferisci sempre, se possibile.
- **`record`** è lo strumento giusto per value object.
- `Comparable` per ordinamento naturale, `Comparator` per ordinamenti alternativi compositi.
- `Comparator.comparing(...).thenComparing(...)` è la chiave per ordinamenti complessi.

Prossimo: eccezioni, try/catch/finally, custom exceptions.
