---
title: "Essential SQL for the Java developer"
area: "Persistence"
order: 21
level: "intermediate"
summary: "SELECT, WHERE, ORDER BY, LIMIT/OFFSET. JOINs (inner, left, right, full). GROUP BY, HAVING, aggregates. Subqueries and CTEs. Indexes, query plans, locks, deadlocks. Window functions. When to push logic into the DB."
prereq: ["Section 20"]
tools: ["PostgreSQL/Oracle/MySQL"]
---

# Essential SQL for the Java developer

## The basic queries you must know

```sql
SELECT id, name, email
FROM customer
WHERE city = 'Milan' AND age >= 18
ORDER BY name
LIMIT 10 OFFSET 20;
```

| Clause | Use |
|---|---|
| `SELECT` | Columns returned |
| `FROM` | Source table |
| `WHERE` | Row filter |
| `ORDER BY` | Sorting |
| `LIMIT/OFFSET` | Pagination |
| `GROUP BY` | Grouping |
| `HAVING` | Group filter |

> Postgres/Oracle/MySQL have syntactic differences (e.g. pagination). SQL standard: `OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY`.

## JOINs

```sql
-- INNER: only matching rows
SELECT o.id, c.name
FROM orders o
JOIN customer c ON c.id = o.customer_id;

-- LEFT: all left rows, NULL on right when no match
SELECT c.name, o.id
FROM customer c
LEFT JOIN orders o ON o.customer_id = c.id;
```

> "Customers without orders": `LEFT JOIN ... WHERE o.id IS NULL`.

## Aggregates and GROUP BY

```sql
SELECT customer_id, COUNT(*) AS n_orders, SUM(total) AS total_spend
FROM orders
WHERE created_at >= '2026-01-01'
GROUP BY customer_id
HAVING SUM(total) > 1000
ORDER BY total_spend DESC;
```

Aggregates: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `STRING_AGG`.

## Subqueries and CTEs

### Scalar subquery

```sql
SELECT name, (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS n
FROM customer c;
```

### CTE (Common Table Expression) — more readable

```sql
WITH top_customers AS (
    SELECT customer_id, SUM(total) AS spend
    FROM orders
    GROUP BY customer_id
    HAVING SUM(total) > 5000
)
SELECT c.name, t.spend
FROM customer c
JOIN top_customers t ON t.customer_id = c.id;
```

### Recursive CTE

```sql
WITH RECURSIVE org(id, name, manager_id, level) AS (
    SELECT id, name, manager_id, 0 FROM employee WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id, o.level + 1
    FROM employee e
    JOIN org o ON e.manager_id = o.id
)
SELECT * FROM org;
```

For hierarchies (orgcharts, BOM, trees).

## Window functions

Aggregates that DON'T collapse rows:

```sql
SELECT
    customer_id,
    order_date,
    total,
    SUM(total) OVER (PARTITION BY customer_id ORDER BY order_date) AS cum_total,
    RANK() OVER (ORDER BY total DESC) AS global_rank,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS n_per_customer
FROM orders;
```

Powerful window functions: `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`, `LEAD`, `FIRST_VALUE`, `LAST_VALUE`.

## Indexes

```sql
CREATE INDEX idx_customer_email ON customer(email);
CREATE UNIQUE INDEX uq_customer_email ON customer(email);
CREATE INDEX idx_orders_customer_date ON orders(customer_id, created_at);
```

Rules:
- Index columns in **WHERE**, **JOIN**, **ORDER BY**.
- Composite indexes: order **matters**. `(a, b)` usable for `WHERE a = ?` and `WHERE a = ? AND b = ?`, but not `WHERE b = ?` alone.
- Indexes **cost** on INSERT/UPDATE. Don't overdo it.
- Partial indexes (Postgres): `CREATE INDEX ... WHERE active = true`.

## Query plan: `EXPLAIN ANALYZE`

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 42;
```

Node types:
- **Seq Scan** ⟶ full table scan (slow if big).
- **Index Scan** ⟶ uses the index.
- **Index Only Scan** ⟶ all from index, no table.
- **Bitmap Index Scan + Bitmap Heap Scan** ⟶ many rows via index.
- **Hash Join / Merge Join / Nested Loop** ⟶ join algorithms.

> **When a query is slow**, the first thing is `EXPLAIN ANALYZE`. Without it, you're guessing.

## Transactions and locks

```sql
BEGIN;
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

### Pessimistic locking

```sql
SELECT * FROM account WHERE id = 1 FOR UPDATE;
-- other UPDATE on id=1 block until COMMIT
```

### Deadlock

Two transactions acquiring locks in reverse order. Postgres detects and rolls one back.

Prevention: always order rows the same way (e.g. ascending id).

## When to push logic into the DB

✅ **Yes if**: simple aggregations, filters, JOINs, ordering. The DB is optimized for this.

❌ **No if**: complex business logic with changing rules (keep in Java); "creative" calcs hard to test.

> A good rule: **don't pull 100k rows into Java to compute a sum**. Do it in SQL. But don't write 500-line stored procedures: they become maintenance nightmares.

## Exercises

<details>
<summary>Ex 21.1 — Basic JOIN</summary>

```sql
CREATE TABLE customer(id BIGSERIAL PRIMARY KEY, name TEXT, city TEXT);
CREATE TABLE orders(id BIGSERIAL PRIMARY KEY, customer_id BIGINT, total NUMERIC);
```

```sql
SELECT c.name, o.id, o.total
FROM customer c
JOIN orders o ON o.customer_id = c.id
ORDER BY c.name, o.id;
```

</details>

<details>
<summary>Ex 21.2 — Top spender per city</summary>

```sql
WITH spend AS (
    SELECT c.id, c.name, c.city, COALESCE(SUM(o.total), 0) AS tot
    FROM customer c
    LEFT JOIN orders o ON o.customer_id = c.id
    GROUP BY c.id, c.name, c.city
)
SELECT * FROM (
    SELECT *, RANK() OVER (PARTITION BY city ORDER BY tot DESC) AS r
    FROM spend
) x WHERE r = 1;
```

</details>

<details>
<summary>Ex 21.3 — EXPLAIN on a slow query</summary>

Build a 1M-row table with a query `WHERE unindexed_col = 'X'`. Run `EXPLAIN ANALYZE`. Add the index, rerun, compare.

</details>

## Take-aways

- `SELECT/FROM/WHERE/GROUP BY/HAVING/ORDER BY/LIMIT` for 90% of queries.
- JOINs (inner, left) and CTEs.
- **Indexes** on WHERE/JOIN/ORDER BY columns.
- **`EXPLAIN ANALYZE`** to diagnose slowness.
- Window functions: `ROW_NUMBER`, `RANK`, `SUM OVER PARTITION BY`.
- Push to the DB what the DB does best. Don't write business logic there.

Next: Spring Core — IoC, DI, ApplicationContext.
