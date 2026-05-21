---
title: "JDBC: connection, PreparedStatement, transactions, isolation levels"
area: "Persistence"
order: 19
level: "intermediate"
summary: "JDBC URL, DriverManager vs DataSource. Statement, PreparedStatement (SQL-injection safe), ResultSet. Transactions: commit, rollback, savepoints. Isolation levels and anomalies."
prereq: ["Section 18"]
tools: ["JDK 21", "PostgreSQL/H2", "Maven"]
---

# JDBC: the foundation of Java persistence

## What JDBC is

JDBC (`java.sql.*`, `javax.sql.*`) is Java's standard API to talk to a relational DB. Under Spring Data, Hibernate, JOOQ, MyBatis — there's always JDBC.

Components:
- **Driver**: vendor-supplied implementation (postgres-jdbc, mysql-connector, ojdbc, h2, ...).
- **Connection**: a TCP connection to the DB.
- **Statement / PreparedStatement**: a SQL query.
- **ResultSet**: a `SELECT` result.
- **DataSource**: connection factory, usually a pool.

## Setup

```xml
<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>postgresql</artifactId>
  <version>42.7.4</version>
</dependency>
```

## Connection: DriverManager (didactic)

```java
String url = "jdbc:postgresql://localhost:5432/mydb";
String user = "postgres", pwd = "secret";

try (Connection c = DriverManager.getConnection(url, user, pwd)) {
    System.out.println(c.getMetaData().getDatabaseProductVersion());
}
```

JDBC URL: `jdbc:<driver>://<host>:<port>/<db>?<params>`.

> **In production** use **HikariCP** or Spring's pool (`spring.datasource.hikari.*`). Never `DriverManager` directly in services.

## DataSource with HikariCP

```java
HikariDataSource ds = new HikariDataSource();
ds.setJdbcUrl(url);
ds.setUsername(user);
ds.setPassword(pwd);
ds.setMaximumPoolSize(20);

try (Connection c = ds.getConnection()) { ... }
```

HikariCP is the fastest Java connection pool. Spring Boot default.

## `PreparedStatement` (always, everywhere)

```java
String sql = "SELECT id, name, email FROM customer WHERE city = ? AND age >= ?";

try (Connection c = ds.getConnection();
     PreparedStatement ps = c.prepareStatement(sql)) {
    ps.setString(1, "Milan");
    ps.setInt(2, 18);

    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            long id = rs.getLong("id");
            String name = rs.getString("name");
            String email = rs.getString("email");
            System.out.println(id + " " + name + " " + email);
        }
    }
}
```

### Why PreparedStatement instead of Statement

- **SQL-injection safe**: `?` are placeholders, never concatenate user input.
- **Performance**: DB plans the query once.
- **Types**: `setString`, `setInt`, `setBigDecimal`, `setTimestamp` — no fragile parsing.

### NEVER do this

```java
String sql = "SELECT * FROM customer WHERE city = '" + city + "'";
// BOOM, SQL injection
```

## Update and returning

```java
String sql = "UPDATE account SET balance = balance - ? WHERE id = ?";
try (PreparedStatement ps = c.prepareStatement(sql)) {
    ps.setBigDecimal(1, amount);
    ps.setLong(2, accountId);
    int rows = ps.executeUpdate();
}
```

INSERT with generated id:

```java
String sql = "INSERT INTO customer(name, email) VALUES (?, ?)";
try (PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
    ps.setString(1, "Anna");
    ps.setString(2, "anna@x.it");
    ps.executeUpdate();
    try (ResultSet rs = ps.getGeneratedKeys()) {
        if (rs.next()) System.out.println("new id: " + rs.getLong(1));
    }
}
```

## Batch update

For inserting/updating N rows, avoid N round-trips:

```java
String sql = "INSERT INTO log(msg) VALUES (?)";
try (PreparedStatement ps = c.prepareStatement(sql)) {
    for (String m : messages) {
        ps.setString(1, m);
        ps.addBatch();
    }
    int[] counts = ps.executeBatch();
}
```

Typical speedup: 10-100x. Critical in Spring Batch.

## Transactions

```java
try (Connection c = ds.getConnection()) {
    c.setAutoCommit(false);
    try {
        try (PreparedStatement ps1 = c.prepareStatement("UPDATE account SET balance = balance - ? WHERE id = ?")) {
            ps1.setBigDecimal(1, amt); ps1.setLong(2, from); ps1.executeUpdate();
        }
        try (PreparedStatement ps2 = c.prepareStatement("UPDATE account SET balance = balance + ? WHERE id = ?")) {
            ps2.setBigDecimal(1, amt); ps2.setLong(2, to); ps2.executeUpdate();
        }
        c.commit();
    } catch (Exception e) {
        c.rollback();
        throw e;
    }
}
```

### Isolation levels

Anomalies:
- **Dirty read**: read uncommitted data.
- **Non-repeatable read**: same record twice, different values.
- **Phantom read**: same set of records twice, new/removed rows.

| Level | Dirty | Non-rep | Phantom |
|---|---|---|---|
| READ UNCOMMITTED | ⚠️ | ⚠️ | ⚠️ |
| READ COMMITTED | OK | ⚠️ | ⚠️ |
| REPEATABLE READ | OK | OK | ⚠️ |
| SERIALIZABLE | OK | OK | OK |

Postgres default: **READ COMMITTED**. Oracle: **READ COMMITTED**. MySQL InnoDB: **REPEATABLE READ**.

```java
c.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);
```

> Higher isolation = more locks = less concurrency. The right pick is almost always **READ COMMITTED** + explicit locking when needed.

### Savepoint

```java
Savepoint sp = c.setSavepoint("after_step1");
c.rollback(sp);  // partial rollback
```

## ResultSet: traversal and types

```java
while (rs.next()) {
    long id = rs.getLong("id");
    String name = rs.getString("name");
    Timestamp ts = rs.getTimestamp("created_at");
    BigDecimal amt = rs.getBigDecimal("amount");
    boolean active = rs.getBoolean("active");
}
```

| SQL | Java |
|---|---|
| INTEGER | `int` / `Integer` |
| BIGINT | `long` / `Long` |
| VARCHAR | `String` |
| NUMERIC, DECIMAL | `BigDecimal` |
| DATE | `LocalDate` (use `rs.getObject("col", LocalDate.class)`) |
| TIMESTAMP | `LocalDateTime` or `Instant` |
| BOOLEAN | `boolean` |

## Exercises

<details>
<summary>Ex 19.1 — H2 in-memory setup + CRUD</summary>

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <version>2.2.224</version>
</dependency>
```

```java
String url = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1";
try (Connection c = DriverManager.getConnection(url, "sa", "")) {
    try (Statement s = c.createStatement()) {
        s.execute("CREATE TABLE person(id BIGINT AUTO_INCREMENT, name VARCHAR, age INT)");
    }
    try (PreparedStatement ps = c.prepareStatement(
            "INSERT INTO person(name, age) VALUES (?, ?)")) {
        ps.setString(1, "Anna"); ps.setInt(2, 30); ps.executeUpdate();
        ps.setString(1, "Beppe"); ps.setInt(2, 45); ps.executeUpdate();
    }
    try (PreparedStatement ps = c.prepareStatement("SELECT * FROM person");
         ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getLong("id") + " " + rs.getString("name") + " " + rs.getInt("age"));
        }
    }
}
```

</details>

<details>
<summary>Ex 19.2 — Atomic transfer</summary>

Implement `transfer(from, to, amount)` with a transaction + rollback on error.

</details>

<details>
<summary>Ex 19.3 — Batch insert</summary>

Insert 10,000 records with and without batching. Time it.

</details>

## Take-aways

- Always use **`PreparedStatement`** (never concatenate SQL).
- **`try-with-resources`** for Connection, Statement, ResultSet.
- Connection pool: **HikariCP**.
- Transactions: `setAutoCommit(false)` + `commit/rollback`.
- Default isolation level = READ COMMITTED. Change only if you know why.
- Batch update for massive inserts (key in Spring Batch).

Next: JPA / Hibernate.
