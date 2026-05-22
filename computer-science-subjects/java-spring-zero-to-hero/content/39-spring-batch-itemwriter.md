---
title: "ItemWriter: file, JDBC, JPA, composite, classifier, batch insert"
area: "Spring Batch"
order: 39
level: "avanzato"
summary: "FlatFileItemWriter, JsonFileItemWriter, JdbcBatchItemWriter, JpaItemWriter. CompositeItemWriter e ClassifierCompositeItemWriter. Custom writer. Performance: batch insert, prepared statement reuse."
prereq: ["Sezione 38"]
tools: ["Spring Batch 5.x"]
---

# ItemWriter in profondità

## `FlatFileItemWriter`: scrittura su file

```java
@Bean
public FlatFileItemWriter<Customer> csvWriter() {
    return new FlatFileItemWriterBuilder<Customer>()
        .name("customerWriter")
        .resource(new FileSystemResource("output/customers.csv"))
        .delimited().delimiter(",")
        .names("id", "name", "email")
        .headerCallback(w -> w.write("id,name,email"))
        .footerCallback(w -> w.write("# end"))
        .build();
}
```

Per fixed-length: `.formatted()` + format string.

## `JdbcBatchItemWriter`: scrittura SQL massiva

```java
@Bean
public JdbcBatchItemWriter<Customer> jdbcWriter(DataSource ds) {
    return new JdbcBatchItemWriterBuilder<Customer>()
        .dataSource(ds)
        .sql("INSERT INTO customer(name, email) VALUES (:name, :email)")
        .beanMapped()
        .build();
}
```

`beanMapped()` mappa proprietà dell'oggetto ai named parameter. In alternativa, `columnMapped()` per Map.

**Performance**: Spring usa `PreparedStatement.addBatch()` per scrivere tutto il chunk in un solo round-trip. Su Postgres con `reWriteBatchedInserts=true`, throughput 10x.

## `JpaItemWriter`

```java
@Bean
public JpaItemWriter<Customer> jpaWriter(EntityManagerFactory emf) {
    JpaItemWriter<Customer> w = new JpaItemWriter<>();
    w.setEntityManagerFactory(emf);
    return w;
}
```

Itera la lista chiamando `entityManager.persist(...)` per ogni. Più lento di JDBC batch ma comodo se gli oggetti sono già `@Entity`.

> Per dataset enormi: **usa `JdbcBatchItemWriter`**, non JPA. JPA tiene il persistence context, che cresce.

## `JsonFileItemWriter`

```java
@Bean
public JsonFileItemWriter<Customer> jsonWriter() {
    return new JsonFileItemWriterBuilder<Customer>()
        .name("jsonWriter")
        .resource(new FileSystemResource("output/customers.json"))
        .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
        .build();
}
```

## `StaxEventItemWriter`: XML

```java
@Bean
public StaxEventItemWriter<Customer> xmlWriter() {
    return new StaxEventItemWriterBuilder<Customer>()
        .name("xmlWriter")
        .resource(new FileSystemResource("output/customers.xml"))
        .rootTagName("customers")
        .marshaller(jaxb2Marshaller())
        .build();
}
```

## `CompositeItemWriter`: scrivi in più destinazioni

```java
@Bean
public CompositeItemWriter<Customer> compositeWriter(JdbcBatchItemWriter<Customer> db,
                                                     FlatFileItemWriter<Customer> file) {
    CompositeItemWriter<Customer> c = new CompositeItemWriter<>();
    c.setDelegates(List.of(db, file));
    return c;
}
```

Ogni item viene scritto a tutti i writer (DB + file di audit, per esempio).

## `ClassifierCompositeItemWriter`: scegli destinazione per item

```java
@Bean
public ClassifierCompositeItemWriter<Transaction> classifierWriter(
        ItemWriter<Transaction> creditWriter,
        ItemWriter<Transaction> debitWriter) {
    var w = new ClassifierCompositeItemWriter<Transaction>();
    w.setClassifier((Classifier<Transaction, ItemWriter<? super Transaction>>) tx ->
        tx.amount().signum() > 0 ? creditWriter : debitWriter);
    return w;
}
```

Tipico: separa i record per categoria, scrive a file/tabelle diverse.

## Custom `ItemWriter<T>`

```java
public class HttpWriter implements ItemWriter<Customer> {

    private final WebClient client;

    @Override
    public void write(Chunk<? extends Customer> chunk) throws Exception {
        for (Customer c : chunk) {
            client.post().uri("/customers").bodyValue(c).retrieve().toBodilessEntity().block();
        }
    }
}
```

> **Performance**: se possibile, manda chunk in batch (es. `POST /customers/bulk`) invece di una chiamata per record.

## Idempotency in scrittura

Restart del job ⟶ righe già scritte potrebbero essere ri-scritte. Strategie:

1. **`INSERT ... ON CONFLICT DO NOTHING`** (Postgres) o `MERGE` (Oracle/SQL Server/H2).
2. **Truncate** all'inizio se è un'overwrite (in un primo step).
3. **Upsert via `id`** lato applicazione.
4. **Idempotent producer** se scrivi su Kafka.

## Esempio: Audit + DB

```java
@Bean
public Step transformAndLoad(JobRepository jr, PlatformTransactionManager tx,
                              ItemReader<Customer> reader,
                              ItemProcessor<Customer, Customer> proc,
                              CompositeItemWriter<Customer> writer) {
    return new StepBuilder("transform", jr)
        .<Customer, Customer>chunk(500, tx)
        .reader(reader)
        .processor(proc)
        .writer(writer)
        .build();
}
```

## Esercizi

<details>
<summary>Es 39.1 — DB + audit</summary>

CompositeItemWriter che scrive in DB e contemporaneamente accumula un CSV di audit.

</details>

<details>
<summary>Es 39.2 — Classifier</summary>

Per record con `amount > 0` scrivi in tabella `income`, per `amount < 0` in `expense`.

</details>

<details>
<summary>Es 39.3 — Idempotente</summary>

Cambia il writer per usare `INSERT ... ON CONFLICT(id) DO UPDATE`. Verifica che restartare il job non duplica.

</details>

## Cosa devi portarti via

- `JdbcBatchItemWriter` per scritture massive (più veloce di JPA).
- `JpaItemWriter` se gli oggetti sono già entità (attenzione al persistence context).
- `CompositeItemWriter` per scrivere a destinazioni multiple.
- `ClassifierCompositeItemWriter` per routing per item.
- **Idempotenza** in scrittura: ON CONFLICT, upsert, MERGE.

Prossimo: scaling — multi-thread step, partitioning, remote partitioning.
