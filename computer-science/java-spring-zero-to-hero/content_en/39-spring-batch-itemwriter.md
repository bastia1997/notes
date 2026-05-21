---
title: "ItemWriter: file, JDBC, JPA, composite, classifier, batch insert"
area: "Spring Batch"
order: 39
level: "advanced"
summary: "FlatFileItemWriter, JsonFileItemWriter, JdbcBatchItemWriter, JpaItemWriter. CompositeItemWriter and ClassifierCompositeItemWriter. Custom writer. Performance: batch insert, prepared statement reuse."
prereq: ["Section 38"]
tools: ["Spring Batch 5.x"]
---

# ItemWriter in depth

## `FlatFileItemWriter`: file output

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

For fixed-length: `.formatted()` + format string.

## `JdbcBatchItemWriter`: massive SQL writes

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

`beanMapped()` maps object properties to named parameters. Alternatively `columnMapped()` for Maps.

**Performance**: Spring uses `PreparedStatement.addBatch()` to write the whole chunk in a single round-trip. On Postgres with `reWriteBatchedInserts=true`, throughput 10x.

## `JpaItemWriter`

```java
@Bean
public JpaItemWriter<Customer> jpaWriter(EntityManagerFactory emf) {
    JpaItemWriter<Customer> w = new JpaItemWriter<>();
    w.setEntityManagerFactory(emf);
    return w;
}
```

Iterates the list calling `entityManager.persist(...)` per item. Slower than JDBC batch but convenient when objects are already `@Entity`.

> For huge datasets: **use `JdbcBatchItemWriter`**, not JPA. JPA keeps the persistence context, which grows.

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

## `CompositeItemWriter`: write to multiple destinations

```java
@Bean
public CompositeItemWriter<Customer> compositeWriter(JdbcBatchItemWriter<Customer> db,
                                                     FlatFileItemWriter<Customer> file) {
    CompositeItemWriter<Customer> c = new CompositeItemWriter<>();
    c.setDelegates(List.of(db, file));
    return c;
}
```

Each item is written to all writers (DB + audit file, for example).

## `ClassifierCompositeItemWriter`: choose destination per item

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

Typical: split records by category, write to different files/tables.

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

> **Performance**: if possible, send the chunk in bulk (e.g. `POST /customers/bulk`) instead of one call per record.

## Write-side idempotency

Job restart ⟶ already-written rows could be re-written. Strategies:

1. **`INSERT ... ON CONFLICT DO NOTHING`** (Postgres) or `MERGE` (Oracle/SQL Server/H2).
2. **Truncate** at start if overwriting (in a first step).
3. **Upsert by `id`** at the app level.
4. **Idempotent producer** when writing to Kafka.

## Example: Audit + DB

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

## Exercises

<details>
<summary>Ex 39.1 — DB + audit</summary>

CompositeItemWriter writing to DB and concurrently building an audit CSV.

</details>

<details>
<summary>Ex 39.2 — Classifier</summary>

For records with `amount > 0` write to `income` table, for `amount < 0` to `expense`.

</details>

<details>
<summary>Ex 39.3 — Idempotent</summary>

Change the writer to use `INSERT ... ON CONFLICT(id) DO UPDATE`. Verify restarting doesn't duplicate.

</details>

## Take-aways

- `JdbcBatchItemWriter` for mass writes (faster than JPA).
- `JpaItemWriter` when objects are already entities (mind the persistence context).
- `CompositeItemWriter` to write to multiple destinations.
- `ClassifierCompositeItemWriter` for per-item routing.
- **Idempotency** in write: ON CONFLICT, upsert, MERGE.

Next: scaling — multi-thread step, partitioning, remote partitioning.
