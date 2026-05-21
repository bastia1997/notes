---
title: "JDBC: connessione, PreparedStatement, transazioni, isolation levels"
area: "Persistenza"
order: 19
level: "intermedio"
summary: "JDBC URL, DriverManager vs DataSource. Statement, PreparedStatement (SQL injection-safe), ResultSet. Transazioni: commit, rollback, savepoint. Isolation levels e fenomeni anomali."
prereq: ["Sezione 18"]
tools: ["JDK 21", "PostgreSQL/H2", "Maven"]
---

# JDBC: il fondamento della persistenza in Java

## Cos'è JDBC

JDBC (`java.sql.*`, `javax.sql.*`) è l'API standard di Java per parlare con un DB relazionale. Sotto Spring Data, Hibernate, JOOQ, MyBatis — c'è sempre JDBC.

Componenti:
- **Driver**: implementazione fornita dal vendor (postgres-jdbc, mysql-connector, ojdbc, h2, ...).
- **Connection**: una connessione TCP al DB.
- **Statement / PreparedStatement**: una query SQL.
- **ResultSet**: il risultato di una `SELECT`.
- **DataSource**: factory di connessioni, di solito un pool.

## Setup

Aggiungi il driver in `pom.xml`:

```xml
<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>postgresql</artifactId>
  <version>42.7.4</version>
</dependency>
```

## Connessione: DriverManager (didattico)

```java
String url = "jdbc:postgresql://localhost:5432/mydb";
String user = "postgres", pwd = "secret";

try (Connection c = DriverManager.getConnection(url, user, pwd)) {
    System.out.println(c.getMetaData().getDatabaseProductVersion());
}
```

URL JDBC: `jdbc:<driver>://<host>:<port>/<db>?<params>`.

> **In produzione** usi **HikariCP** o il pool di Spring (`spring.datasource.hikari.*`). Mai `DriverManager` direttamente per i tuoi servizi.

## DataSource con HikariCP

```java
HikariDataSource ds = new HikariDataSource();
ds.setJdbcUrl(url);
ds.setUsername(user);
ds.setPassword(pwd);
ds.setMaximumPoolSize(20);

try (Connection c = ds.getConnection()) {
    ...
}
```

HikariCP è il pool più veloce di Java. Spring Boot lo usa per default.

## `PreparedStatement` (sempre, ovunque)

```java
String sql = "SELECT id, name, email FROM customer WHERE city = ? AND age >= ?";

try (Connection c = ds.getConnection();
     PreparedStatement ps = c.prepareStatement(sql)) {
    ps.setString(1, "Milano");
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

### Perché PreparedStatement e non Statement

- **SQL injection-safe**: i `?` sono placeholder, mai concatenare stringhe utente.
- **Performance**: il DB può pianificare la query una volta.
- **Tipi**: `setString`, `setInt`, `setBigDecimal`, `setTimestamp` — niente parser fragili.

### MAI fare così

```java
String sql = "SELECT * FROM customer WHERE city = '" + city + "'";
// BOOM, SQL injection
```

## Update e returning

```java
String sql = "UPDATE account SET balance = balance - ? WHERE id = ?";
try (PreparedStatement ps = c.prepareStatement(sql)) {
    ps.setBigDecimal(1, amount);
    ps.setLong(2, accountId);
    int rows = ps.executeUpdate();
    System.out.println("aggiornate " + rows + " righe");
}
```

INSERT con id generato:

```java
String sql = "INSERT INTO customer(name, email) VALUES (?, ?)";
try (PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
    ps.setString(1, "Anna");
    ps.setString(2, "anna@x.it");
    ps.executeUpdate();
    try (ResultSet rs = ps.getGeneratedKeys()) {
        if (rs.next()) System.out.println("nuovo id: " + rs.getLong(1));
    }
}
```

## Batch update

Per inserire/aggiornare N righe, evita N round-trip:

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

Speedup tipico: 10-100x. Fondamentale in Spring Batch.

## Transazioni

```java
try (Connection c = ds.getConnection()) {
    c.setAutoCommit(false);            // disattiva auto-commit
    try {
        // due update che devono andare insieme
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

Fenomeni anomali:
- **Dirty read**: leggi dati non committati.
- **Non-repeatable read**: leggi lo stesso record due volte, valori diversi.
- **Phantom read**: leggi un set di record due volte, comparsa/scomparsa di righe.

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

> Più alto isolation = più lock = meno concorrenza. La scelta giusta è quasi sempre **READ COMMITTED** + locking esplicito quando serve.

### Savepoint

```java
Savepoint sp = c.setSavepoint("dopo_step1");
// ...
c.rollback(sp);  // rollback parziale
```

## ResultSet: scorrimento e tipi

```java
while (rs.next()) {
    long id = rs.getLong("id");
    String name = rs.getString("name");
    Timestamp ts = rs.getTimestamp("created_at");
    BigDecimal amt = rs.getBigDecimal("amount");
    boolean active = rs.getBoolean("active");
    // tipo java per ogni tipo SQL
}
```

| SQL | Java |
|---|---|
| INTEGER | `int` / `Integer` |
| BIGINT | `long` / `Long` |
| VARCHAR | `String` |
| NUMERIC, DECIMAL | `BigDecimal` |
| DATE | `LocalDate` (usa `rs.getObject("col", LocalDate.class)`) |
| TIMESTAMP | `LocalDateTime` o `Instant` |
| BOOLEAN | `boolean` |

## Esercizi

<details>
<summary>Es 19.1 — Setup H2 in-memory + CRUD</summary>

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
        s.execute("CREATE TABLE persona(id BIGINT AUTO_INCREMENT, nome VARCHAR, eta INT)");
    }
    try (PreparedStatement ps = c.prepareStatement(
            "INSERT INTO persona(nome, eta) VALUES (?, ?)")) {
        ps.setString(1, "Anna"); ps.setInt(2, 30); ps.executeUpdate();
        ps.setString(1, "Beppe"); ps.setInt(2, 45); ps.executeUpdate();
    }
    try (PreparedStatement ps = c.prepareStatement("SELECT * FROM persona");
         ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getLong("id") + " " + rs.getString("nome") + " " + rs.getInt("eta"));
        }
    }
}
```

</details>

<details>
<summary>Es 19.2 — Trasferimento atomico</summary>

Implementa `trasferisci(from, to, amount)` con transazione + rollback in caso di errore.

</details>

<details>
<summary>Es 19.3 — Batch insert</summary>

Inserisci 10.000 record con e senza batch. Misura il tempo.

</details>

## Cosa devi portarti via

- Sempre **`PreparedStatement`** (mai concatenare SQL).
- **`try-with-resources`** per Connection, Statement, ResultSet.
- Pool di connessioni: **HikariCP**.
- Transazioni: `setAutoCommit(false)` + `commit/rollback`.
- Isolation level di default = READ COMMITTED. Cambialo solo se sai perché.
- Batch update per inserimenti massivi (cruciale per Spring Batch).

Prossimo: JPA / Hibernate.
