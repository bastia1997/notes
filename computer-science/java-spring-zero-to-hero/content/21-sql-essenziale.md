---
title: "SQL essenziale per chi sviluppa in Java"
area: "Persistenza"
order: 21
level: "intermedio"
summary: "SELECT, WHERE, ORDER BY, LIMIT/OFFSET. JOIN (inner, left, right, full). GROUP BY, HAVING, aggregati. Subquery e CTE. Indici, query plan, lock, deadlock. Funzioni window. Quando spingere logica nel DB."
prereq: ["Sezione 20"]
tools: ["PostgreSQL/Oracle/MySQL"]
---

# SQL essenziale per chi sviluppa in Java

## Le query base che devi sapere

```sql
SELECT id, name, email
FROM customer
WHERE city = 'Milano' AND age >= 18
ORDER BY name
LIMIT 10 OFFSET 20;
```

| Clausola | Uso |
|---|---|
| `SELECT` | Colonne da restituire |
| `FROM` | Tabella sorgente |
| `WHERE` | Filtro righe |
| `ORDER BY` | Ordinamento |
| `LIMIT/OFFSET` | Paginazione |
| `GROUP BY` | Raggruppamento |
| `HAVING` | Filtro sui gruppi |

> Postgres/Oracle/MySQL hanno differenze sintattiche (es. paginazione). Standard SQL: `OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY`.

## JOIN

```sql
-- INNER: solo righe che matchano
SELECT o.id, c.name
FROM orders o
JOIN customer c ON c.id = o.customer_id;

-- LEFT: tutte le righe a sinistra, NULL a destra se non matcha
SELECT c.name, o.id
FROM customer c
LEFT JOIN orders o ON o.customer_id = c.id;

-- RIGHT: simmetrico
-- FULL: tutte le righe da entrambi i lati
```

> Per "clienti senza ordini": `LEFT JOIN ... WHERE o.id IS NULL`.

## Aggregati e GROUP BY

```sql
SELECT customer_id, COUNT(*) AS n_ordini, SUM(total) AS spesa_totale
FROM orders
WHERE created_at >= '2026-01-01'
GROUP BY customer_id
HAVING SUM(total) > 1000
ORDER BY spesa_totale DESC;
```

Aggregati: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `STRING_AGG`.

## Subquery e CTE

### Subquery scalare

```sql
SELECT name, (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS n
FROM customer c;
```

### CTE (Common Table Expression) — più leggibili

```sql
WITH top_customers AS (
    SELECT customer_id, SUM(total) AS spesa
    FROM orders
    GROUP BY customer_id
    HAVING SUM(total) > 5000
)
SELECT c.name, t.spesa
FROM customer c
JOIN top_customers t ON t.customer_id = c.id;
```

### CTE ricorsiva

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

Per gerarchie (organigramma, BOM, alberi).

## Window functions

Aggregati che NON collassano le righe:

```sql
SELECT
    customer_id,
    order_date,
    total,
    SUM(total) OVER (PARTITION BY customer_id ORDER BY order_date) AS cum_total,
    RANK() OVER (ORDER BY total DESC) AS rank_globale,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS n_per_cliente
FROM orders;
```

Funzioni window potenti: `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`, `LEAD`, `FIRST_VALUE`, `LAST_VALUE`.

## Indici

```sql
CREATE INDEX idx_customer_email ON customer(email);
CREATE UNIQUE INDEX uq_customer_email ON customer(email);
CREATE INDEX idx_orders_customer_date ON orders(customer_id, created_at);
```

Regole d'oro:
- Indicizza le colonne in **WHERE**, **JOIN**, **ORDER BY**.
- Indici composti: l'ordine **conta**. `(a, b)` usabile per `WHERE a = ?` e `WHERE a = ? AND b = ?`, ma **non** per `WHERE b = ?` da solo.
- Indici **costano** in INSERT/UPDATE. Non esagerare.
- Indici parziali (Postgres): `CREATE INDEX ... WHERE active = true`.

## Query plan: `EXPLAIN ANALYZE`

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 42;
```

Tipi di nodo:
- **Seq Scan** ⟶ scansione completa tabella (lento se grande).
- **Index Scan** ⟶ usa l'indice.
- **Index Only Scan** ⟶ tutto dall'indice, no tabella.
- **Bitmap Index Scan + Bitmap Heap Scan** ⟶ molte righe via indice.
- **Hash Join / Merge Join / Nested Loop** ⟶ algoritmi di join.

> **Quando una query è lenta**, la prima cosa è `EXPLAIN ANALYZE`. Senza, stai indovinando.

## Transazioni e lock

```sql
BEGIN;
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

### Lock pessimistico

```sql
SELECT * FROM account WHERE id = 1 FOR UPDATE;
-- altre transazioni che fanno UPDATE su id=1 si bloccano fino al COMMIT
```

### Deadlock

Due transazioni che acquisiscono lock in ordine inverso. Postgres rileva e rolla back una. Diagnosi: log di Postgres.

Prevenzione: ordina sempre le righe nello stesso modo (es. per id crescente).

## Quando spingere logica nel DB

✅ **Sì se**: aggregazioni semplici, filtri, JOIN, ordinamenti. Il DB è ottimizzato per questo.

❌ **No se**: business logic complessa con regole che cambiano (mantieni in Java); calcoli "creativi" difficili da testare.

> Una buona regola: **non recuperare 100k righe in Java per fare la somma**. La fai in SQL. Ma non scrivere stored procedure di 500 righe: diventano un incubo da mantenere.

## Esercizi

<details>
<summary>Es 21.1 — JOIN base</summary>

Schema:
```sql
CREATE TABLE customer(id BIGSERIAL PRIMARY KEY, name TEXT, city TEXT);
CREATE TABLE orders(id BIGSERIAL PRIMARY KEY, customer_id BIGINT, total NUMERIC);
```

Scrivi una query: nome cliente + totale di ogni ordine, ordinato per cliente.

```sql
SELECT c.name, o.id, o.total
FROM customer c
JOIN orders o ON o.customer_id = c.id
ORDER BY c.name, o.id;
```

</details>

<details>
<summary>Es 21.2 — Top spender per città</summary>

Trova il cliente che ha speso di più in ogni città.

```sql
WITH spese AS (
    SELECT c.id, c.name, c.city, COALESCE(SUM(o.total), 0) AS tot
    FROM customer c
    LEFT JOIN orders o ON o.customer_id = c.id
    GROUP BY c.id, c.name, c.city
)
SELECT * FROM (
    SELECT *, RANK() OVER (PARTITION BY city ORDER BY tot DESC) AS r
    FROM spese
) x WHERE r = 1;
```

</details>

<details>
<summary>Es 21.3 — EXPLAIN su una query lenta</summary>

Crea una tabella con 1M righe e una query con `WHERE non_indicizzato = 'X'`. Lancia `EXPLAIN ANALYZE`. Aggiungi l'indice e rilancia: confronta.

</details>

## Cosa devi portarti via

- `SELECT/FROM/WHERE/GROUP BY/HAVING/ORDER BY/LIMIT` per il 90% delle query.
- JOIN (inner, left) e CTE.
- **Indici** sulle colonne in WHERE/JOIN/ORDER BY.
- **`EXPLAIN ANALYZE`** per diagnosticare lentezza.
- Window functions: `ROW_NUMBER`, `RANK`, `SUM OVER PARTITION BY`.
- Spingi nel DB ciò che il DB fa meglio. Non ci scrivere business logic.

Prossimo: Spring Core — IoC, DI, ApplicationContext.
