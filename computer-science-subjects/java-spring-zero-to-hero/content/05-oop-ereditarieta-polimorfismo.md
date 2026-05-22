---
title: "OOP II — Ereditarietà, polimorfismo, interfacce, classi astratte"
area: "Java Foundations"
order: 5
level: "principiante"
summary: "Ereditarietà con extends, super, override. Polimorfismo dinamico. Interfacce (con metodi default e statici dal Java 8), classi astratte, quando usare quale. Diamond problem evitato. sealed classes."
prereq: ["Sezione 4"]
tools: ["JDK 21"]
---

# OOP II — Ereditarietà, polimorfismo, interfacce, classi astratte

## Ereditarietà: "estende"

Una classe può **ereditare** da un'altra: prende campi e metodi non-private e può aggiungerne o ridefinirne.

```java
public class Animale {
    protected String nome;

    public Animale(String nome) { this.nome = nome; }

    public void mangia() {
        System.out.println(nome + " sta mangiando");
    }
}

public class Cane extends Animale {
    private String razza;

    public Cane(String nome, String razza) {
        super(nome);             // chiama il costruttore di Animale
        this.razza = razza;
    }

    public void abbaia() {
        System.out.println(nome + " abbaia: Woof!");
    }
}
```

```java
Cane c = new Cane("Rex", "Labrador");
c.mangia();   // ereditato da Animale: "Rex sta mangiando"
c.abbaia();   // metodo proprio di Cane
```

- `extends` indica l'eredità. **Java è single-inheritance**: una classe ha al massimo *una* superclasse.
- `super(...)` chiama il costruttore della superclasse. Deve essere la **prima istruzione** del costruttore figlio.
- Se non chiami `super(...)`, Java aggiunge `super()` automaticamente. Se la superclasse non ha costruttore senza parametri, devi chiamarne uno esplicitamente.

### `super` per accedere ai metodi della superclasse

```java
public class Cane extends Animale {
    @Override
    public void mangia() {
        super.mangia();           // chiama Animale.mangia()
        System.out.println("...e poi scodinzola");
    }
}
```

## `Object`: il padre di tutti

Tutte le classi ereditano implicitamente da `java.lang.Object`. Da qui arrivano questi metodi (che spesso vorrai ridefinire):

- `equals(Object)` — uguaglianza logica
- `hashCode()` — hash per `HashMap`/`HashSet`
- `toString()` — rappresentazione testuale
- `getClass()` — tipo runtime
- `clone()`, `finalize()` — vecchi, evitali

Approfondiamo nella prossima sezione.

## Override e polimorfismo dinamico

**Override** = ridefinire un metodo della superclasse mantenendone la firma:

```java
public class Animale {
    public String verso() { return "..."; }
}
public class Cane extends Animale {
    @Override
    public String verso() { return "Woof!"; }
}
public class Gatto extends Animale {
    @Override
    public String verso() { return "Miao"; }
}
```

```java
Animale[] zoo = { new Cane("Rex", "Lab"), new Gatto("Bea") };
for (Animale a : zoo) {
    System.out.println(a.verso());
}
// stampa: Woof!  Miao
```

Anche se la variabile `a` ha tipo `Animale`, viene chiamato il `verso()` **della classe reale dell'oggetto**. Questo è il **dispatch dinamico** (o "late binding"): il metodo viene risolto a runtime in base al tipo effettivo. È il cuore del polimorfismo.

> **`@Override`** non è obbligatoria ma fortemente raccomandata: il compilatore controlla che tu stia veramente sovrascrivendo. Se sbagli la firma (es. `verso(int x)` invece di `verso()`), il compilatore ti avvisa.

### Regole dell'override

| Aspetto | Vincolo |
|---|---|
| Nome metodo | Identico |
| Parametri | Identici |
| Tipo di ritorno | Stesso o **sottotipo** (covariant return) |
| Visibilità | Stessa o **più permissiva** (`protected` ⟶ `public` ok; `public` ⟶ `protected` no) |
| Eccezioni checked | Stesse o **sottotipi** o nessuna |

## Casting di riferimenti

```java
Animale a = new Cane("Rex", "Lab");   // upcast, sempre sicuro
Cane c = (Cane) a;                     // downcast, va verificato
c.abbaia();
```

Se l'oggetto non è davvero un `Cane`, ottieni `ClassCastException`. Controlla prima con `instanceof`:

```java
if (a instanceof Cane c) {     // pattern matching for instanceof (Java 16+)
    c.abbaia();
}
```

Sotto Java 16+ puoi anche scrivere così con il *pattern binding*, evitando il cast esplicito.

## Classi astratte

Una classe **astratta** non può essere istanziata: serve da base per le sottoclassi. Può contenere metodi astratti (senza corpo) e/o metodi concreti.

```java
public abstract class Forma {
    public abstract double area();   // i sottoclassi DEVONO implementare

    public void stampa() {            // metodo concreto, condiviso
        System.out.println("Area: " + area());
    }
}

public class Cerchio extends Forma {
    private double raggio;
    public Cerchio(double r) { this.raggio = r; }
    @Override
    public double area() { return Math.PI * raggio * raggio; }
}
```

```java
Forma f = new Forma(...);    // ERRORE compilazione
Forma f = new Cerchio(5);    // OK
f.stampa();                   // "Area: 78.539..."
```

Quando usi una classe astratta? Quando hai uno **scheletro** comune con dettagli che variano per sottoclasse.

## Interfacce

Un'**interfaccia** è un contratto: dichiara *cosa* sa fare un tipo, senza l'*implementazione* (in origine).

```java
public interface Volabile {
    void decolla();
    void atterra();
}

public class Aereo implements Volabile {
    @Override public void decolla() { System.out.println("Roll-out, V1, rotate, decollo"); }
    @Override public void atterra() { System.out.println("Final approach, touchdown"); }
}

public class Uccello implements Volabile {
    @Override public void decolla() { System.out.println("Plof plof"); }
    @Override public void atterra() { System.out.println("Pioto sul ramo"); }
}
```

Una classe può **implementare più interfacce** (mentre può estendere una sola classe):

```java
public class Anfibio implements Volabile, Nuotante, Camminante { ... }
```

### Metodi `default` (Java 8+)

Dal Java 8, le interfacce possono avere metodi con implementazione di default:

```java
public interface Saluto {
    String saluto();

    default String salutoConPunto() {
        return saluto() + "!";   // implementazione di default
    }
}
```

Le classi che implementano `Saluto` ottengono `salutoConPunto()` gratis, e possono comunque sovrascriverlo.

### Metodi `static` nelle interfacce

```java
public interface MathUtils {
    static double quadrato(double x) { return x * x; }
}
// uso:
double q = MathUtils.quadrato(3);  // 9
```

### Costanti nelle interfacce

Tutti i campi in un'interfaccia sono implicitamente `public static final`:

```java
public interface Costanti {
    int MAX_RETRY = 3;   // automaticamente public static final
}
```

### Diamond problem evitato

In Java non puoi ereditare da due classi, ma puoi implementare due interfacce con lo stesso metodo `default`. Se conflittono, **devi** risolverle manualmente:

```java
interface A { default String saluta() { return "ciao da A"; } }
interface B { default String saluta() { return "ciao da B"; } }

class C implements A, B {
    @Override
    public String saluta() {
        return A.super.saluta();   // o B.super.saluta(), o tutta nuova logica
    }
}
```

## Classe astratta vs interfaccia: quando usare quale?

| Caratteristica | Classe astratta | Interfaccia |
|---|---|---|
| Stato (campi non-final) | Sì | No (solo costanti) |
| Costruttori | Sì | No |
| Ereditarietà multipla | No (una sola superclasse) | Sì (più interfacce) |
| Metodi `default` | Sempre concreti o astratti | Default dal Java 8 |
| Quando usare | Quando condividi **stato** e logica comune | Quando definisci un **contratto** |

**Regola pratica**: parti da un'interfaccia. Se ti accorgi che serve condividere stato/codice, valuta una classe astratta. Spesso entrambe: interfaccia per il contratto, classe astratta come base per le implementazioni standard.

```java
public interface Repository<T> {
    Optional<T> findById(long id);
    List<T> findAll();
    T save(T entity);
}

public abstract class AbstractRepository<T> implements Repository<T> {
    protected DataSource ds;
    public AbstractRepository(DataSource ds) { this.ds = ds; }
    // implementazioni di base condivise
}
```

Spring usa esattamente questo schema dappertutto.

## `final` su classi e metodi

- `final` su una classe: non può essere estesa. (Es. `String`, `Integer`).
- `final` su un metodo: non può essere sovrascritto.
- `final` su un campo: vedi sezione 2.

```java
public final class Util { ... }   // non puoi extends Util
public class Base {
    public final void critico() {  // sottoclassi NON possono override
        ...
    }
}
```

## `sealed` (Java 17+): ereditarietà controllata

```java
public sealed interface Forma permits Cerchio, Quadrato, Triangolo {}

public final class Cerchio implements Forma { ... }
public final class Quadrato implements Forma { ... }
public final class Triangolo implements Forma { ... }
```

`Forma` può essere implementata **solo** da `Cerchio`, `Quadrato`, `Triangolo`. Utile per il pattern matching esaustivo nello switch (sez. 18).

## Esempio integrato: un piccolo sistema di pagamenti

```java
public interface Pagamento {
    void esegui(double importo);
}

public abstract class PagamentoBase implements Pagamento {
    protected String id;
    public PagamentoBase(String id) { this.id = id; }

    @Override
    public final void esegui(double importo) {  // template method
        valida(importo);
        elabora(importo);
        registra(importo);
    }

    protected void valida(double importo) {
        if (importo <= 0) throw new IllegalArgumentException("importo <= 0");
    }
    protected abstract void elabora(double importo);
    protected void registra(double importo) {
        System.out.println("[" + id + "] registrato " + importo);
    }
}

public class CartaCredito extends PagamentoBase {
    public CartaCredito(String id) { super(id); }
    @Override
    protected void elabora(double importo) {
        System.out.println("Addebito su carta " + id + ": " + importo);
    }
}

public class Bonifico extends PagamentoBase {
    public Bonifico(String id) { super(id); }
    @Override
    protected void elabora(double importo) {
        System.out.println("Bonifico SEPA " + id + ": " + importo);
    }
}
```

Questo è il **template method pattern**: l'algoritmo generale è definito una volta (`esegui`), le variazioni sono in `elabora`. La parte "uguale" si scrive una volta sola.

## Esercizi

<details>
<summary>Es 5.1 — Veicoli</summary>

Crea una classe astratta `Veicolo` con campo `targa`, metodo astratto `nRuote()`, metodo concreto `descrivi()` che usa `nRuote()`. Implementa `Auto` (4 ruote), `Moto` (2), `Camion` (6).

```java
public abstract class Veicolo {
    protected String targa;
    public Veicolo(String t) { this.targa = t; }
    public abstract int nRuote();
    public void descrivi() {
        System.out.println(targa + " ha " + nRuote() + " ruote");
    }
}
public class Auto extends Veicolo {
    public Auto(String t) { super(t); }
    @Override public int nRuote() { return 4; }
}
// ... e così via
```

</details>

<details>
<summary>Es 5.2 — Composizione di interfacce</summary>

Crea `Pesce` che implementa `Nuotante` (`nuota()`) e `Riproducibile` (`riproduce()`).

```java
interface Nuotante { void nuota(); }
interface Riproducibile { void riproduce(); }

public class Pesce implements Nuotante, Riproducibile {
    public void nuota() { System.out.println("Glub glub"); }
    public void riproduce() { System.out.println("Depongo uova"); }
}
```

</details>

<details>
<summary>Es 5.3 — Cast e instanceof</summary>

Dato l'array `Veicolo[] flotta = { new Auto("AA-111-BB"), new Moto("XX-222-YY") }`, conta quante sono auto.

```java
int autoCount = 0;
for (Veicolo v : flotta) {
    if (v instanceof Auto) autoCount++;
}
```

Con il pattern matching:

```java
int autoCount = 0;
for (Veicolo v : flotta) {
    if (v instanceof Auto a) {
        // qui `a` è già castata ad Auto
        autoCount++;
    }
}
```

</details>

<details>
<summary>Es 5.4 — Default conflittuali</summary>

Due interfacce, stesso default, una classe che implementa entrambe. Cosa succede?

```java
interface A { default String saluta() { return "ciao A"; } }
interface B { default String saluta() { return "ciao B"; } }

class C implements A, B {
    // questa classe NON compila finché non ridefinisci saluta()
}
```

Devi sovrascrivere `saluta()` in `C`. Se vuoi delegare a uno dei due:

```java
class C implements A, B {
    @Override
    public String saluta() {
        return A.super.saluta();
    }
}
```

</details>

<details>
<summary>Es 5.5 — Sealed gerarchia</summary>

Crea una gerarchia `sealed` per i tipi di documento di identità: `Documento` ha solo `CartaIdentita`, `Patente`, `Passaporto` come permitted.

```java
public sealed interface Documento permits CartaIdentita, Patente, Passaporto {
    String numero();
}
public record CartaIdentita(String numero) implements Documento {}
public record Patente(String numero, String categoria) implements Documento {}
public record Passaporto(String numero, String paese) implements Documento {}
```

</details>

## Cosa devi portarti via

- **Ereditarietà** (extends) per riusare/estendere. Java è single-inheritance.
- **Override** = stessa firma, polimorfismo dinamico. Usa sempre `@Override`.
- `super` chiama costruttore o metodo della superclasse.
- **Interfacce** = contratti. Puoi implementarne molte. Metodi `default` dal Java 8.
- **Classi astratte** = base con stato condiviso. `abstract` impedisce istanziazione.
- `final`, `sealed` per controllare l'estensibilità.
- Pattern fondamentali: template method, strategy, decorator (li vediamo nella sezione design pattern).

Prossimo: equals/hashCode, immutabilità, `record`.
