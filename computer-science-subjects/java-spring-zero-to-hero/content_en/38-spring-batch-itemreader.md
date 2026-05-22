---
title: "ItemReader: flat file, XML/JSON, JDBC cursor/paging, JPA, multi-resource"
area: "Spring Batch"
order: 38
level: "advanced"
summary: "All standard ItemReaders. FlatFileItemReader, JsonItemReader, StaxEventItemReader. Cursor-based vs paging JDBC. JpaPagingItemReader. MultiResourceItemReader. Custom reader. Restartability."
prereq: ["Section 37"]
tools: ["Spring Batch 5.x"]
---

# ItemReader in depth

## `FlatFileItemReader`: delimited and fixed-length

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

### Custom `LineMapper`

```java
.lineMapper((line, lineNumber) -> {
    return parseJsonLine(line);
})
```

## `JsonItemReader`: JSON arrays

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

Expects a root array: `[ {...}, {...}, ... ]`.

For JSON Lines (one object per line) use `FlatFileItemReader` with a Jackson mapper.

## `StaxEventItemReader`: streaming XML

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

Streaming = reads one `<customer>` at a time, not whole file in memory.

## JDBC: cursor vs paging

### `JdbcCursorItemReader`: server-side cursor

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

- **Pro**: linear stream, low overhead.
- **Con**: holds a connection for a long time. Restart hard (recompose via `sortedBy` + saved offset).

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

- **Pro**: each page is a separate query; connection held briefly.
- **Pro**: easy to restart (resumes from last id).
- **Con**: deep paging can be slow. Indexes on `sortKeys` mandatory.

> **In production prefer paging**: scalable, restartable.

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

Trap: PersistenceContext grows per page. Use `setSaveState(false)` or explicit cleanup for huge datasets.

## `MultiResourceItemReader`

When you have N files to process in one step:

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

Spring iterates file by file, saving state (useful for restart).

## `IteratorItemReader` (in-memory list)

```java
@Bean
public IteratorItemReader<String> staticReader() {
    return new IteratorItemReader<>(List.of("a", "b", "c").iterator());
}
```

Useful for tests and small data.

## Custom `ItemReader<T>`

```java
@Component
@StepScope
public class MyReader implements ItemReader<Order>, ItemStream {

    private Iterator<Order> it;
    private long position;

    @Override public void open(ExecutionContext ctx) {
        position = ctx.getLong("position", 0);
        it = mySource.iteratorFrom(position);
    }

    @Override public Order read() {
        if (!it.hasNext()) return null;
        position++;
        return it.next();
    }

    @Override public void update(ExecutionContext ctx) { ctx.putLong("position", position); }
    @Override public void close() {}
}
```

For **restartability**, implement `ItemStream`: `open/update/close` save state in the `ExecutionContext`.

## `@StepScope`

```java
@Bean
@StepScope
public FlatFileItemReader<X> reader(@Value("#{jobParameters['inputFile']}") String filename) {
    return new FlatFileItemReaderBuilder<X>()
        .resource(new FileSystemResource(filename))
        ...
        .build();
}
```

`@StepScope` creates the bean **once per step execution**, not as singleton. Lets you inject `#{jobParameters['x']}` or `#{stepExecutionContext['y']}`.

## Exercises

<details>
<summary>Ex 38.1 — Multi-resource CSV</summary>

Folder `input/` with `customers-2026-05-19.csv`, `customers-2026-05-20.csv`, ... `MultiResourceItemReader` reading them all.

</details>

<details>
<summary>Ex 38.2 — JDBC paging</summary>

Migrate from `JdbcCursorItemReader` to `JdbcPagingItemReader`. Compare runtime and restart behavior.

</details>

<details>
<summary>Ex 38.3 — Custom API reader</summary>

`ItemReader` calling a paginated HTTP endpoint (`GET /api/items?page=N`) and returning objects one by one. Restartable via `ExecutionContext`.

</details>

## Take-aways

- `FlatFileItemReader` (CSV/fixed), `JsonItemReader`, `StaxEventItemReader` for files.
- JDBC: **paging > cursor** in production.
- `JpaPagingItemReader` for entity reads.
- `MultiResourceItemReader` for N files.
- Custom reader: implement `ItemStream` to be restartable.
- `@StepScope` for dynamic parameter access.

Next: ItemWriter (file, JDBC, JPA, composite).
