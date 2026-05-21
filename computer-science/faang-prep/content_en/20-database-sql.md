---
title: Database and SQL
area: Systems
summary: SQL from scratch to window functions, indexes explained with analogy, ACID, isolation levels, SQL vs NoSQL.
order: 20
---

# Database and SQL

In many FAANG loops (Meta, Amazon, Stripe in particular) there's a round dedicated to **SQL**. For backend roles you also need to know indexes, transactions, NoSQL.

## Part 1 — What a database really is

### The problem

You have data that must **survive** application crashes, be efficiently **queried**, and **modified** safely even with concurrent access.

A DIY solution: JSON file. Works until:

- You have little data (< 1 GB).
- One writer at a time.
- You don't care about indexes and complex queries.

When you grow, you need a DBMS (Database Management System).

### The two families

**Relational (RDBMS)**: PostgreSQL, MySQL, Oracle, SQL Server. Rigid schema (tables with columns), JOINs, ACID.

**NoSQL**: various families:
- Document (MongoDB).
- Key-value (Redis, DynamoDB).
- Wide-column (Cassandra).
- Graph (Neo4j).
- Time-series (InfluxDB).

In this chapter let's focus on RDBMS + SQL, then touch NoSQL at the end.

## Part 2 — Essential SQL

SQL is the standard language for relational DBs. **Declarative**: you say what you want, not how to get it. DB optimizes for you.

### Base CRUD

```sql
-- CREATE (insert)
INSERT INTO users (name, age) VALUES ('Alice', 30);

-- READ (select)
SELECT name, age FROM users WHERE age > 18;

-- UPDATE
UPDATE users SET age = 31 WHERE name = 'Alice';

-- DELETE
DELETE FROM users WHERE age < 0;
```

### SELECT — the main weapon

```sql
SELECT column1, column2, ...
FROM table
WHERE filter
GROUP BY grouping
HAVING filter_post_aggregate
ORDER BY column [ASC|DESC]
LIMIT n;
```

### LOGICAL execution order (not syntactic!)

Very important to understand SQL:

1. **FROM** (and JOIN)
2. **WHERE**
3. **GROUP BY**
4. **HAVING**
5. **SELECT** (including window functions)
6. **ORDER BY**
7. **LIMIT**

This explains why `SELECT name AS n ... WHERE n > 0` doesn't work: the alias `n` doesn't exist yet in WHERE (executed before SELECT).

## Part 3 — JOIN

Combining rows from multiple tables.

### Example setup

```sql
employees: (id, name, dept_id, salary)
departments: (id, name)
```

### INNER JOIN

Only rows matching in both.

```sql
SELECT e.name, d.name AS dept
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;
```

Visualization: intersection of the two sets.

### LEFT JOIN

All rows from the left. If no match on right, NULL.

```sql
SELECT e.name, d.name AS dept
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;
```

Employees without department → `dept` = NULL but still appear.

### RIGHT JOIN / FULL OUTER JOIN

Symmetric / complete union. Less used.

### CROSS JOIN

Cartesian product: every row × every row. Rarely intentional.

### Self join

Same table twice (with different aliases). Typical for hierarchies.

```sql
-- Show each employee with their own manager (both in employees)
SELECT e.name AS emp, m.name AS mgr
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

## Part 4 — Aggregation: GROUP BY and HAVING

Group rows and calculate statistics.

```sql
SELECT dept_id, COUNT(*) AS n_emp, AVG(salary) AS avg_sal
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 50000;
```

**WHERE vs HAVING**:

- WHERE filters **rows** before grouping.
- HAVING filters **groups** after aggregation.

Aggregate functions: COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT (MySQL) / STRING_AGG (Postgres).

## Part 5 — Window functions (the secret weapon)

Compute values "in window" without collapsing rows like GROUP BY does.

```sql
SELECT
  name, dept, salary,
  RANK()       OVER (PARTITION BY dept ORDER BY salary DESC) AS rk,
  DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS drk,
  ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn,
  LAG(salary)  OVER (PARTITION BY dept ORDER BY salary)      AS prev_sal,
  SUM(salary)  OVER (PARTITION BY dept)                       AS total_dept
FROM employees;
```

### ROW_NUMBER vs RANK vs DENSE_RANK differences

Salaries `[100, 100, 90, 80]`:

- `ROW_NUMBER`: 1, 2, 3, 4 (always unique).
- `RANK`: 1, 1, 3, 4 (leaves gaps).
- `DENSE_RANK`: 1, 1, 2, 3 (no gaps).

### LAG and LEAD

Access previous / next row.

```sql
SELECT name, salary, LAG(salary) OVER (ORDER BY hire_date) AS prev
FROM employees;
```

Useful for: consecutive differences, run-length, time-series.

### Running totals

```sql
SELECT user_id, date,
       SUM(amount) OVER (PARTITION BY user_id ORDER BY date) AS running_total
FROM transactions;
```

## Part 6 — CTE (Common Table Expression)

Named sub-query, **readable** and reusable.

```sql
WITH dept_avg AS (
  SELECT dept_id, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY dept_id
)
SELECT e.name
FROM employees e
JOIN dept_avg d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_sal;
```

Replace nested sub-queries. More readable, debuggable.

### Recursive CTE

For hierarchies (trees, graphs).

```sql
WITH RECURSIVE tree AS (
  -- base case
  SELECT id, parent_id, 0 AS depth FROM nodes WHERE parent_id IS NULL
  UNION ALL
  -- recursive step
  SELECT n.id, n.parent_id, t.depth + 1
  FROM nodes n
  JOIN tree t ON n.parent_id = t.id
)
SELECT * FROM tree;
```

## Part 7 — Handling NULL

`NULL` means "absent/unknown". 3-valued logic (true, false, **unknown**).

```sql
NULL = NULL          -- unknown (NOT true!)
NULL IS NULL         -- true
COALESCE(x, default) -- x if not null, else default
```

```sql
SELECT COALESCE(phone, email, 'n/a') AS contact FROM users;
```

## Part 8 — Index

An **index** is a separate data structure (B-tree, hash) that speeds up specific queries.

### Analogy: the index of a book

Without index: to find "recursion" you flip through the whole book page by page. O(n).

With index: go to end of book, look up "recursion" → "p. 347". O(log n).

### Costs

Index isn't free:

- **Space**: index takes disk memory.
- **Slower Insert/Update/Delete**: every change must update the index too.

Rule: index on **frequently filtered** or **JOIN/ORDER BY** columns. Not on rarely queried columns.

### Index types

- **B-tree** (default): supports `=`, range (<, >), ORDER BY.
- **Hash**: only `=`. Faster for equality.
- **GIN** (Postgres): full-text search, JSON.
- **Bitmap** (Oracle, Postgres): columns with few distinct values.

### Composite index

Index on multiple columns, sorted lexicographically.

```sql
CREATE INDEX idx ON employees(dept_id, salary);
```

Usable for:

- `WHERE dept_id = X` ✓
- `WHERE dept_id = X AND salary > Y` ✓
- `WHERE salary > Y` **NO** (the order is (dept, salary), not (salary)).

**Leftmost prefix rule**: index helps only if you filter on **leading** columns.

### EXPLAIN

In Postgres/MySQL: `EXPLAIN ANALYZE <query>` shows the execution plan.

- **Seq Scan**: full table (no index used). Slow for large tables.
- **Index Scan / Index Only Scan**: great.
- **Nested Loop, Hash Join, Merge Join**: join types.

Fundamental debug tool for slow queries.

## Part 9 — Transactions and ACID

### What a transaction is

Sequence of operations that must be executed as **an atomic unit**.

Example: bank transfer from A to B.

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
  UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
COMMIT;
```

If the system crashes between the two UPDATEs, you want **both** to fail (rollback), not money to disappear.

### ACID

- **A**tomicity: all or nothing. Crash → rollback.
- **C**onsistency: constraints respected (foreign keys, check constraints).
- **I**solation: concurrent transactions as if serial.
- **D**urability: once commit, persists even if system goes down.

### Isolation levels

How strict must isolation be? 4 levels, weak to strong:

| Level | Dirty read | Non-repeatable read | Phantom read |
|---|---|---|---|
| Read Uncommitted | ✓ | ✓ | ✓ |
| Read Committed | ✗ | ✓ | ✓ |
| Repeatable Read | ✗ | ✗ | ✓ |
| Serializable | ✗ | ✗ | ✗ |

Anomalies:

- **Dirty read**: read data not yet committed by another transaction.
- **Non-repeatable read**: read same row twice, different values.
- **Phantom read**: read same range twice, different rows (concurrent insert/delete).

**Postgres default**: Read Committed.
**MySQL InnoDB default**: Repeatable Read.

Stricter = safer but slower.

## Part 10 — Lock and MVCC

### Lock

- **Shared (read) lock**: many can hold simultaneously.
- **Exclusive (write) lock**: only one.

When a transaction writes a row, it takes the exclusive lock. Other readers wait.

### MVCC (Multi-Version Concurrency Control)

Postgres/InnoDB use MVCC: each transaction sees a **snapshot** of the database at the moment it started (or of every statement, depends on level).

Consequence: **reads don't block writes and vice versa**. Greater concurrency.

## Part 11 — Normalization

Schema without redundancy, with clean dependencies.

### Normal forms

- **1NF**: every cell has an atomic value (no lists in a cell).
- **2NF**: 1NF + no partial dependency on composite key.
- **3NF**: 2NF + no transitive dependency (an attribute depends on key, not on other attributes).
- **BCNF**: every dependency has a superkey as determinant.

In practice you reach 3NF.

### Denormalization

For **performance**, sometimes you duplicate data. E.g. save `user_name` in every `order` instead of doing JOINs. NoSQL often denormalizes by design.

Trade-off: storage + write complexity vs read speed.

## Part 12 — SQL vs NoSQL: decision tree

| Scenario | Choice |
|---|---|
| ACID multi-table transactions | SQL |
| Rapidly evolving schema | NoSQL document |
| Massive per-key reads/writes | NoSQL KV |
| Complex JOINs | SQL |
| Huge horizontal scale (10M+ QPS) | NoSQL |
| Time-series / log | Time-series DB |
| Complex relationships (social graph) | Graph DB |
| Full-text search | Elasticsearch |

## Part 13 — SQL exercises

### Exercise 20.1 — Second Highest Salary <span class="problem-tag easy">EASY</span>

<details><summary>Solution</summary>

```sql
SELECT MAX(salary) AS second
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

Or with window:

```sql
SELECT DISTINCT salary
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk
  FROM employees
) t
WHERE rk = 2;
```
</details>

### Exercise 20.2 — Nth Highest Salary <span class="problem-tag medium">MEDIUM</span>

Generalization. `DENSE_RANK() = N`.

### Exercise 20.3 — Department Top Three Salaries <span class="problem-tag hard">HARD</span>

<details><summary>Solution</summary>

```sql
SELECT dept, name, salary FROM (
  SELECT d.name AS dept, e.name, e.salary,
         DENSE_RANK() OVER (PARTITION BY d.id ORDER BY e.salary DESC) AS rk
  FROM employees e
  JOIN departments d ON e.dept_id = d.id
) t
WHERE rk <= 3;
```

Window with PARTITION BY = "top N per group".
</details>

### Exercise 20.4 — Duplicate Emails <span class="problem-tag easy">EASY</span>

<details><summary>Solution</summary>

```sql
SELECT email FROM users GROUP BY email HAVING COUNT(*) > 1;
```

HAVING to filter groups post-aggregate.
</details>

### Exercise 20.5 — Customers Who Never Order <span class="problem-tag easy">EASY</span>

<details><summary>Solution</summary>

```sql
SELECT c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
```

LEFT JOIN + NULL filter: "anti-join".
</details>

### Exercise 20.6 — Trips and Users <span class="problem-tag hard">HARD</span>

Per-day cancellation rate, excluding banned users.

<details><summary>Solution</summary>

```sql
SELECT request_at AS Day,
       ROUND(
         SUM(CASE WHEN status != 'completed' THEN 1 ELSE 0 END)::numeric / COUNT(*),
         2
       ) AS "Cancellation Rate"
FROM trips
WHERE request_at BETWEEN '2013-10-01' AND '2013-10-03'
  AND client_id NOT IN (SELECT users_id FROM users WHERE banned = 'Yes')
  AND driver_id NOT IN (SELECT users_id FROM users WHERE banned = 'Yes')
GROUP BY request_at;
```

Technique: `CASE WHEN ... THEN 1 ELSE 0 END` to count conditionally in SUM.
</details>

### Exercise 20.7 — Consecutive Numbers <span class="problem-tag medium">MEDIUM</span>

Find `num` values appearing at least 3 times consecutively in logs.

<details><summary>Solution</summary>

```sql
SELECT DISTINCT l1.num AS ConsecutiveNums
FROM logs l1
JOIN logs l2 ON l2.id = l1.id + 1 AND l2.num = l1.num
JOIN logs l3 ON l3.id = l1.id + 2 AND l3.num = l1.num;
```

Self-join three times. For "at least k consecutive" generalized, window with LAG/LEAD is better.
</details>

### Exercise 20.8 — Running Total <span class="problem-tag medium">MEDIUM</span>

```sql
SELECT user_id, date,
       SUM(amount) OVER (PARTITION BY user_id ORDER BY date) AS running_total
FROM transactions;
```

### Exercise 20.9 — Median Salary <span class="problem-tag hard">HARD</span>

<details><summary>Solution</summary>

```sql
WITH ranked AS (
  SELECT salary,
         ROW_NUMBER() OVER (ORDER BY salary) AS rn,
         COUNT(*) OVER () AS n
  FROM employees
)
SELECT AVG(salary) AS median
FROM ranked
WHERE rn IN (FLOOR((n+1)/2), CEIL((n+1)/2));
```

For odd n: single row (rn = (n+1)/2). For even n: average of the two centrals.
</details>

## Summary

1. **Declarative SQL**: you say what you want, DB optimizes.
2. **Logical order**: FROM → WHERE → GROUP → HAVING → SELECT → ORDER → LIMIT.
3. **JOIN**: INNER (intersection), LEFT (all left), self-join for hierarchies.
4. **Window functions**: superpower. ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD, running totals.
5. **Indexes**: like book index. B-tree for `=` and range, hash for `=`.
6. **ACID + isolation levels**: 4 levels, concurrency/safety trade-off.
7. **MVCC**: reads don't block writes. Postgres/InnoDB.
8. **SQL vs NoSQL**: SQL for transactions and JOINs, NoSQL for scale and flexible schema.

In SQL interview: practice with LeetCode SQL (50 problems is a good target). Window functions are **must-have** for medium levels.
