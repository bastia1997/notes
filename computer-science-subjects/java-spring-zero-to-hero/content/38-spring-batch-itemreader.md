---
title: "ItemReader: flat file, XML/JSON, JDBC cursor/paging, JPA, multi-resource"
area: "Spring Batch"
order: 38
level: "avanzato"
summary: "Tutti gli ItemReader della libreria standard. FlatFileItemReader, JsonItemReader, StaxEventItemReader. Cursor-based vs paging JDBC. JpaPagingItemReader. MultiResourceItemReader. Custom reader. Restartability."
prereq: ["Sezione 37"]
tools: ["Spring Batch 5.x"]
---

# ItemReader in profondità

## `FlatFileItemReader`: file delimitati e fixed-length

```java
@Bean
public FlatFileItemReader<Customer> csvReader() {
    return new FlatFileItemReaderBuilder<Customer>()
        .name("customerReader")
        .resource(new FileSystemResource("input/customers.csv"))
        .linesToSkip(1)
        .delimited().delimiter(",").quoteCharacter('"')
        .names("id", "name", "email", "city")
        .fieldSetMapper(fs -> new Customer(
            fs.readLong("id"), fs.readString("name"),
            fs.readString("email"), fs.readString("city")
        ))
        .build();
}
```

### Fixed-length

```java
.fixedLength()
.columns(new Range[]{ new Range(1, 10), new Range(11, 40), new Range(41, 80) })
.names("id", "name", "email")
```

### Header parsing

```java
.linesToSkip(1)
.skippedLinesCallback(line -> log.info("header: {}", line))
```

### `LineMapper` custom

```java
.lineMapper((line, lineNumber) -> {
    // parsing custom (es. JSON per riga)
    return parseJsonLine(line);
})
```

## `JsonItemReader`: file JSON con array

```java
@Bean
public JsonItemReader<Customer> jsonReader() {
    return new JsonItemReaderBuilder<Customer>()
        .name("jsonReader")
        .resource(new FileSystemResource("input/customers.json"))
        .jsonObjectReader(new JacksonJsonObjectReader<>(Customer.class))
        .build();
}
```

Si aspetta un file con array root: `[ {...}, {...}, ... ]`.

Per JSON Lines (un oggetto per riga) usa `FlatFileItemReader` con un mapper Jackson.

## `StaxEventItemReader`: XML streaming

```java
@Bean
public StaxEventItemReader<Customer> xmlReader() {
    return new StaxEventItemReaderBuilder<Customer>()
        .name("xmlReader")
        .resource(new FileSystemResource("input/customers.xml"))
        .addFragmentRootElements("customer")
        .unmarshaller(jaxb2Marshaller())
        .build();
}
```

Streaming = legge un elemento `<customer>` alla volta, non tutto in memoria.

## JDBC: cursor vs paging

### `JdbcCursorItemReader`: cursore lato server

```java
@Bean
public JdbcCursorItemReader<Order> cursorReader(DataSource ds) {
    return new JdbcCursorItemReaderBuilder<Order>()
        .name("ordersCursor")
        .dataSource(ds)
        .sql("SELECT id, customer_id, total FROM orders WHERE status = 'NEW'")
        .rowMapper((rs, rn) -> new Order(rs.getLong("id"),
            rs.getLong("customer_id"), rs.getBigDecimal("total")))
        .build();
}
```

- **Pro**: stream lineare, basso overhead.
- **Contro**: tiene una connessione aperta a lungo. Restart difficile (devi ricomporre da `sortedBy` + offset salvato).

### `JdbcPagingItemReader`: paging

```java
@Bean
public JdbcPagingItemReader<Order> pagingReader(DataSource ds) {
    Map<String, Order> sortKeys = Map.of("id", Order.ASCENDING);

    return new JdbcPagingItemReaderBuilder<Order>()
        .name("ordersPaging")
        .dataSource(ds)
        .selectClause("SELECT id, customer_id, total")
        .fromClause("FROM orders")
        .whereClause("status = :status")
        .parameterValues(Map.of("status", "NEW"))
        .sortKeys(sortKeys)
        .pageSize(500)
        .rowMapper(...)
        .build();
}
```

- **Pro**: ogni pagina è una query separata; connessione tenuta poco.
- **Pro**: facile da restartare (riprende dall'ultimo id).
- **Contro**: deep paging può essere lento. Indici su `sortKeys` obbligatori.

> **In produzione, preferisci paging**: scalabile, restartable.

## `JpaPagingItemReader`

```java
@Bean
public JpaPagingItemReader<Customer> jpaReader(EntityManagerFactory emf) {
    return new JpaPagingItemReaderBuilder<Customer>()
        .name("jpaReader")
        .entityManagerFactory(emf)
        .queryString("SELECT c FROM Customer c WHERE c.active = true ORDER BY c.id")
        .pageSize(500)
        .build();
}
```

Trappola: il `PersistenceContext` cresce per pagina. Usa `JpaPagingItemReader` con `setSaveState(false)` o pulizia esplicita per dataset grandi.

## `MultiResourceItemReader`

Quando hai N file da elaborare in un solo step:

```java
@Bean
public MultiResourceItemReader<Customer> multiReader() {
    var r = new MultiResourceItemReader<Customer>();
    r.setName("multi");
    r.setResources(new PathMatchingResourcePatternResolver()
        .getResources("classpath:input/customers-*.csv"));
    r.setDelegate(csvReader());
    return r;
}
```

Spring scorre file per file, salvando lo stato (utile per restart).

## `IteratorItemReader` (lista in memoria)

```java
@Bean
public IteratorItemReader<String> staticReader() {
    return new IteratorItemReader<>(List.of("a", "b", "c").iterator());
}
```

Utile per test e per dati piccoli.

## Custom `ItemReader<T>`

```java
@Component
@StepScope
public class MyReader implements ItemReader<Order>, ItemStream {

    private Iterator<Order> it;
    private long position;

    @Override
    public void open(ExecutionContext ctx) {
        position = ctx.getLong("position", 0);
        it = mySource.iteratorFrom(position);
    }

    @Override
    public Order read() {
        if (!it.hasNext()) return null;
        position++;
        return it.next();
    }

    @Override
    public void update(ExecutionContext ctx) {
        ctx.putLong("position", position);
    }

    @Override
    public void close() {}
}
```

Per essere **restartable**, implementa `ItemStream`: `open/update/close` salvano lo stato nell'`ExecutionContext`.

## `@StepScope`

```java
@Bean
@StepScope
public FlatFileItemReader<X> reader(@Value("#{jobParameters['inputFile']}") String filename) {
    return new FlatFileItemReaderBuilder<X>()...
        .resource(new FileSystemResource(filename))
        .build();
}
```

`@StepScope` crea il bean **una volta per step execution** invece che singleton. Permette di iniettare `#{jobParameters['x']}` o `#{stepExecutionContext['y']}`.

## Esercizi

<details>
<summary>Es 38.1 — Multi-resource CSV</summary>

Cartella `input/` con `customers-2026-05-19.csv`, `customers-2026-05-20.csv`, ... Crea un `MultiResourceItemReader` che li legge tutti.

</details>

<details>
<summary>Es 38.2 — JDBC paging</summary>

Migra da `JdbcCursorItemReader` a `JdbcPagingItemReader`. Confronta tempo di esecuzione e comportamento al restart.

</details>

<details>
<summary>Es 38.3 — Custom reader API</summary>

`ItemReader` che chiama un endpoint paginato HTTP (`GET /api/items?page=N`) e ritorna gli oggetti uno alla volta. Restartable via `ExecutionContext`.

</details>

## Cosa devi portarti via

- `FlatFileItemReader` (CSV/fixed), `JsonItemReader`, `StaxEventItemReader` per file.
- JDBC: **paging > cursor** in produzione.
- `JpaPagingItemReader` per leggere entità.
- `MultiResourceItemReader` per N file.
- Custom reader: implementa `ItemStream` per essere restartable.
- `@StepScope` per accesso a parametri dinamici.

Prossimo: ItemWriter (file, JDBC, JPA, composite).
