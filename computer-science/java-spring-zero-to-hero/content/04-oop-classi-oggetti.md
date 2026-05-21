---
title: "OOP I — Classi, oggetti, costruttori, this, package, visibilità"
area: "Java Foundations"
order: 4
level: "principiante"
summary: "La classe come stampo, l'oggetto come istanza. Campi e metodi, costruttori (default, parametrizzati, overload). this. static vs instance. Visibilità: public, protected, package-private, private. Package e organizzazione del codice."
prereq: ["Sezione 3"]
tools: ["JDK 21"]
---

# OOP I — Classi, oggetti, costruttori, this, package, visibilità

## La classe è lo stampo, l'oggetto è ciò che lo stampo produce

Una **classe** descrive *come è fatto* qualcosa: che dati ha (campi) e cosa sa fare (metodi). Un **oggetto** è un'istanza specifica della classe, con i suoi valori.

```java
public class Persona {
    String nome;
    int eta;

    void saluta() {
        System.out.println("Ciao, sono " + nome + " e ho " + eta + " anni");
    }
}
```

```java
Persona p1 = new Persona();   // crea un oggetto Persona sull'heap
p1.nome = "Anna";
p1.eta = 30;
p1.saluta();                  // "Ciao, sono Anna e ho 30 anni"

Persona p2 = new Persona();   // un secondo oggetto, indipendente
p2.nome = "Beppe";
p2.eta = 45;
p2.saluta();
```

`p1` e `p2` sono **due oggetti** sullo stesso "stampo".

## Costruttori

Il **costruttore** inizializza l'oggetto. Java ne fornisce uno di default senza parametri se tu non ne dichiari nessuno.

```java
public class Persona {
    String nome;
    int eta;

    // costruttore parametrizzato
    public Persona(String nome, int eta) {
        this.nome = nome;
        this.eta = eta;
    }
}
```

```java
Persona p = new Persona("Anna", 30);
```

> Appena dichiari **un** costruttore, il default sparisce. Se ne vuoi anche uno senza parametri, lo dichiari esplicitamente.

### `this`

Dentro un metodo o costruttore, `this` è il riferimento all'oggetto corrente. Serve quando un parametro **maschera** un campo (`this.nome = nome`):

```java
public Persona(String nome, int eta) {
    this.nome = nome;   // this.nome = il campo; nome = il parametro
    this.eta = eta;
}
```

`this()` chiama un altro costruttore della stessa classe:

```java
public class Persona {
    String nome;
    int eta;

    public Persona() {
        this("anonimo", 0);   // chiama l'altro costruttore
    }

    public Persona(String nome, int eta) {
        this.nome = nome;
        this.eta = eta;
    }
}
```

`this(...)` deve essere la **prima istruzione** del costruttore.

### Overload di costruttori

Puoi avere più costruttori con **firma diversa** (numero/tipo di parametri):

```java
public class Punto {
    double x, y;

    public Punto() { this(0, 0); }
    public Punto(double x, double y) { this.x = x; this.y = y; }
    public Punto(Punto altro) { this(altro.x, altro.y); }  // copy constructor
}
```

## Campi e metodi

```java
public class ContoCorrente {
    // campi (state)
    private String iban;
    private double saldo;

    // costruttore
    public ContoCorrente(String iban, double saldoIniziale) {
        this.iban = iban;
        this.saldo = saldoIniziale;
    }

    // metodi (behavior)
    public void deposita(double importo) {
        if (importo <= 0) throw new IllegalArgumentException("importo non positivo");
        saldo += importo;
    }

    public void preleva(double importo) {
        if (importo > saldo) throw new IllegalStateException("saldo insufficiente");
        saldo -= importo;
    }

    public double getSaldo() {
        return saldo;
    }
}
```

### Getter e setter

Convenzione: campi `private`, accesso via metodi `getX()` / `setX(...)`. In questo modo controlli cosa entra/esce.

```java
public class Persona {
    private String nome;
    private int eta;

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public int getEta() { return eta; }
    public void setEta(int eta) {
        if (eta < 0) throw new IllegalArgumentException("età < 0");
        this.eta = eta;
    }
}
```

> Non sempre serve un setter. Se un campo non deve mai cambiare dopo la costruzione, lascialo solo con getter (o **non** offrirlo affatto). Vedremo i `record` (Java 14+) che fanno tutto questo gratis.

## `static`: appartiene alla classe, non all'istanza

Un campo o metodo `static` esiste **una volta sola** per la classe, non una volta per oggetto.

```java
public class Contatore {
    private static int istanze = 0;   // condiviso

    private int id;

    public Contatore() {
        istanze++;          // incrementa il contatore di classe
        this.id = istanze;  // assegna l'id corrente
    }

    public static int quanti() { return istanze; }
    public int getId() { return id; }
}
```

```java
new Contatore(); new Contatore(); new Contatore();
System.out.println(Contatore.quanti());   // 3
```

Caso d'uso classico: **utility class** con solo metodi statici (es. `java.lang.Math`, `java.util.Arrays`).

### Inizializzatori statici

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

Il blocco `static { ... }` viene eseguito **una volta** al caricamento della classe.

## Visibilità (access modifiers)

| Modificatore | Visibile da... |
|---|---|
| `public` | Ovunque |
| `protected` | Stesso package + sottoclassi (ovunque siano) |
| (nessuno) = "package-private" | Solo stesso package |
| `private` | Solo dentro la stessa classe |

```java
public class Esempio {
    public    int pub;       // tutti
    protected int prot;      // sotto-classi e package
              int pkg;       // solo package
    private   int priv;      // solo dentro Esempio
}
```

**Regola pratica**: campi `private`, metodi `public` quando fanno parte del contratto della classe. Esponi il minimo indispensabile.

## Package

Un **package** è un namespace gerarchico. Tutte le classi di un'app si organizzano in package:

```
src/main/java/
└── it/
    └── zth/
        └── banca/
            ├── ContoCorrente.java     // package it.zth.banca
            ├── Cliente.java
            └── transazioni/
                └── Bonifico.java       // package it.zth.banca.transazioni
```

Ogni file deve dichiarare il proprio package come **prima istruzione**:

```java
package it.zth.banca;
```

### Import

```java
import java.util.List;
import java.util.ArrayList;
import java.util.*;           // tutto java.util (sconsigliato in progetti seri)
import static java.lang.Math.PI;  // import statico
```

Le classi di `java.lang` (String, Integer, System, ...) sono importate automaticamente.

## Cosa succede al `new`?

```mermaid
sequenceDiagram
    participant C as Codice
    participant JVM as JVM
    participant H as Heap
    participant CON as Costruttore

    C->>JVM: new Persona("Anna", 30)
    JVM->>H: alloca memoria per Persona
    H-->>JVM: indirizzo oggetto
    JVM->>JVM: inizializza campi al default (0, false, null)
    JVM->>CON: chiama Persona(String, int)
    CON->>CON: this.nome = "Anna"; this.eta = 30
    CON-->>JVM: oggetto pronto
    JVM-->>C: ritorna riferimento
```

1. La JVM **alloca memoria** sull'heap per l'oggetto.
2. Inizializza tutti i campi al loro valore di default (`0`, `false`, `null`).
3. Chiama il costruttore.
4. Restituisce il riferimento.

## Esempio completo: un mini sistema

```java
package it.zth.shop;

public class Prodotto {
    private final String codice;
    private final String nome;
    private double prezzo;

    public Prodotto(String codice, String nome, double prezzo) {
        if (prezzo < 0) throw new IllegalArgumentException("prezzo < 0");
        this.codice = codice;
        this.nome = nome;
        this.prezzo = prezzo;
    }

    public String getCodice() { return codice; }
    public String getNome()   { return nome; }
    public double getPrezzo() { return prezzo; }

    public void applicaSconto(double percentuale) {
        if (percentuale < 0 || percentuale > 100)
            throw new IllegalArgumentException("percentuale invalida");
        this.prezzo *= (1 - percentuale / 100.0);
    }

    @Override
    public String toString() {
        return "Prodotto[" + codice + " " + nome + " " + prezzo + "€]";
    }
}
```

`@Override` su `toString()` ti farà capire perché esiste appena vedrai l'ereditarietà (sezione 5).

```java
Prodotto p = new Prodotto("ABC-123", "Tastiera", 49.90);
System.out.println(p);          // Prodotto[ABC-123 Tastiera 49.9€]
p.applicaSconto(10);
System.out.println(p);          // Prodotto[ABC-123 Tastiera 44.910...€]
```

## Esercizi

<details>
<summary>Es 4.1 — Classe `Punto2D`</summary>

Crea una classe `Punto2D` con campi `double x` e `double y`, costruttore parametrizzato, metodo `distanza(Punto2D altro)` che calcola la distanza euclidea, e `toString()`.

```java
public class Punto2D {
    private final double x, y;

    public Punto2D(double x, double y) { this.x = x; this.y = y; }
    public double getX() { return x; }
    public double getY() { return y; }

    public double distanza(Punto2D altro) {
        double dx = x - altro.x;
        double dy = y - altro.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    @Override
    public String toString() { return "(" + x + ", " + y + ")"; }
}
```

</details>

<details>
<summary>Es 4.2 — `ContoCorrente` con `IllegalStateException`</summary>

Implementa `ContoCorrente` con `deposita`, `preleva`, `getSaldo`. Solleva `IllegalArgumentException` per importi negativi e `IllegalStateException` per scoperto.

Vedi l'esempio in alto. Aggiungi un test:

```java
public static void main(String[] args) {
    ContoCorrente c = new ContoCorrente("IT60X0000", 100);
    c.deposita(50);
    System.out.println(c.getSaldo()); // 150
    try {
        c.preleva(200);
    } catch (IllegalStateException e) {
        System.out.println("KO: " + e.getMessage());
    }
}
```

</details>

<details>
<summary>Es 4.3 — Singleton con `static`</summary>

Crea una classe `Logger` con un'**unica istanza** ottenibile da `Logger.getInstance()`. Il costruttore deve essere `private`.

```java
public class Logger {
    private static final Logger INSTANCE = new Logger();
    private Logger() {}
    public static Logger getInstance() { return INSTANCE; }

    public void info(String msg) {
        System.out.println("[INFO] " + msg);
    }
}

// uso
Logger.getInstance().info("ciao");
```

Pattern Singleton classico. In Spring lo farai con un `@Bean` o `@Component` (default scope singleton).

</details>

<details>
<summary>Es 4.4 — Costruttori in cascata</summary>

Crea `Rettangolo` con due costruttori: uno che prende larghezza e altezza, l'altro che prende solo il lato (quadrato). Il costruttore "lato" deve chiamare quello "larghezza+altezza" via `this(...)`.

```java
public class Rettangolo {
    private final double larghezza, altezza;

    public Rettangolo(double larghezza, double altezza) {
        if (larghezza <= 0 || altezza <= 0)
            throw new IllegalArgumentException("dimensione non positiva");
        this.larghezza = larghezza;
        this.altezza = altezza;
    }

    public Rettangolo(double lato) {
        this(lato, lato);   // quadrato
    }

    public double area() { return larghezza * altezza; }
}
```

</details>

<details>
<summary>Es 4.5 — Variabili static vs instance</summary>

Quanti messaggi stampa questo programma?

```java
public class Mistero {
    static int s = 0;
    int i = 0;

    public Mistero() { s++; i++; }

    public static void main(String[] args) {
        Mistero a = new Mistero();
        Mistero b = new Mistero();
        Mistero c = new Mistero();
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

`s` è condiviso fra le tre istanze (è `static`): viene incrementato tre volte. `i` è per istanza: ognuna lo vede a 1.

</details>

## Cosa devi portarti via

- **Classe** = stampo, **oggetto** = istanza creata con `new`.
- Costruttore = inizializzazione. `this(...)` chiama un altro costruttore della stessa classe.
- `this` risolve l'ambiguità tra campo e parametro.
- `static` appartiene alla classe, non all'istanza.
- Visibilità: `private` per dettagli interni, `public` per il contratto. Espai il minimo.
- Organizza in **package** (cartelle) per dominio funzionale.

Prossimo: ereditarietà, polimorfismo, interfacce.
