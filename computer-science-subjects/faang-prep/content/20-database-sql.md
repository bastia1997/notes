---
title: Database e SQL
area: Sistemi
summary: SQL da zero a window functions, indici spiegati con analogia, ACID, isolation levels, SQL vs NoSQL.
order: 20
---

# Database e SQL

In molti loop FAANG (Meta, Amazon, Stripe in particolare) c'è un round dedicato a **SQL**. Per ruoli backend serve anche conoscere indici, transazioni, NoSQL.

## Parte 1 — Cos'è un database, davvero

### Il problema

Hai dati che devono **sopravvivere** ai crash dell'applicazione, essere **interrogati** efficientemente, e **modificati** in modo sicuro anche con accessi concorrenti.

Una soluzione "fai da te": file JSON. Funziona finché:

- Hai pochi dati (< 1 GB).
- Un solo writer alla volta.
- Non ti importa di indici e query complesse.

Quando cresci, hai bisogno di un DBMS (Database Management System).

### Le due famiglie

**Relazionali (RDBMS)**: PostgreSQL, MySQL, Oracle, SQL Server. Schema rigido (tabelle con colonne), JOIN, ACID.

**NoSQL**: varie famiglie:
- Document (MongoDB).
- Key-value (Redis, DynamoDB).
- Wide-column (Cassandra).
- Graph (Neo4j).
- Time-series (InfluxDB).

In questo capitolo focalizziamoci su RDBMS + SQL, poi tocchiamo NoSQL alla fine.

## Parte 2 — SQL essenziale

SQL è il linguaggio standard dei DB relazionali. **Dichiarativo**: dici cosa vuoi, non come ottenerlo. Il DB ottimizza per te.

### CRUD base

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

### SELECT — l'arma principale

```sql
SELECT colonna1, colonna2, ...
FROM tabella
WHERE filtro
GROUP BY raggruppamento
HAVING filtro_post_aggregate
ORDER BY colonna [ASC|DESC]
LIMIT n;
```

### Ordine LOGICO di esecuzione (non sintattico!)

Importantissimo per capire SQL:

1. **FROM** (e JOIN)
2. **WHERE**
3. **GROUP BY**
4. **HAVING**
5. **SELECT** (incluse window functions)
6. **ORDER BY**
7. **LIMIT**

Questo spiega perché in `SELECT name AS n ... WHERE n > 0` non funziona: l'alias `n` non esiste ancora in WHERE (eseguito prima di SELECT).

## Parte 3 — JOIN

Combinare righe da più tabelle.

### Setup esempio

```sql
employees: (id, name, dept_id, salary)
departments: (id, name)
```

### INNER JOIN

Solo righe che matchano in entrambe.

```sql
SELECT e.name, d.name AS dept
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;
```

Visualizzazione: intersezione dei due insiemi.

### LEFT JOIN

Tutte le righe da sinistra. Se non c'è match a destra, NULL.

```sql
SELECT e.name, d.name AS dept
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;
```

Dipendenti senza dipartimento → `dept` = NULL ma compaiono comunque.

### RIGHT JOIN / FULL OUTER JOIN

Simmetrico / unione completa. Meno usati.

### CROSS JOIN

Prodotto cartesiano: ogni riga × ogni riga. Raramente intenzionale.

### Self join

La stessa tabella due volte (con alias diversi). Tipico per gerarchie.

```sql
-- Mostra ogni dipendente con il proprio manager (entrambi in employees)
SELECT e.name AS emp, m.name AS mgr
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

## Parte 4 — Aggregation: GROUP BY e HAVING

Raggruppa righe e calcola statistiche.

```sql
SELECT dept_id, COUNT(*) AS n_emp, AVG(salary) AS avg_sal
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 50000;
```

**WHERE vs HAVING**:

- WHERE filtra **righe** prima del raggruppamento.
- HAVING filtra **gruppi** dopo l'aggregazione.

Aggregate functions: COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT (MySQL) / STRING_AGG (Postgres).

## Parte 5 — Window functions (l'arma segreta)

Calcolano valori "in finestra" senza collassare le righe come fa GROUP BY.

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

### Differenze ROW_NUMBER vs RANK vs DENSE_RANK

Stipendi `[100, 100, 90, 80]`:

- `ROW_NUMBER`: 1, 2, 3, 4 (sempre unici).
- `RANK`: 1, 1, 3, 4 (lascia gap).
- `DENSE_RANK`: 1, 1, 2, 3 (no gap).

### LAG e LEAD

Accesso a riga precedente / successiva.

```sql
SELECT name, salary, LAG(salary) OVER (ORDER BY hire_date) AS prev
FROM employees;
```

Utile per: differenze consecutive, run-length, time-series.

### Running totals

```sql
SELECT user_id, date,
       SUM(amount) OVER (PARTITION BY user_id ORDER BY date) AS running_total
FROM transactions;
```

## Parte 6 — CTE (Common Table Expression)

Sotto-query nominata, **leggibile** e riusabile.

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

Sostituiscono le sub-query annidate. Più leggibili, debuggabili.

### CTE ricorsive

Per gerarchie (alberi, grafi).

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

## Parte 7 — Gestione di NULL

`NULL` significa "assente/sconosciuto". Logica a 3 valori (true, false, **unknown**).

```sql
NULL = NULL          -- unknown (NON true!)
NULL IS NULL         -- true
COALESCE(x, default) -- x se non null, altrimenti default
```

```sql
SELECT COALESCE(phone, email, 'n/a') AS contact FROM users;
```

## Parte 8 — Index

Un **index** è una struttura dati separata (B-tree, hash) che velocizza certe query.

### Analogia: l'indice di un libro

Senza indice: per trovare "ricorsione" sfogli tutto il libro pagina per pagina. O(n).

Con indice: vai a fine libro, cerca "ricorsione" → "pag. 347". O(log n).

### Costi

Index non è gratis:

- **Spazio**: index occupa memoria su disco.
- **Insert/Update/Delete più lenti**: ogni modifica deve aggiornare anche l'index.

Regola: index su colonne **frequentemente filtrate** o **usate in JOIN/ORDER BY**. Non su colonne raramente interrogate.

### Tipi di index

- **B-tree** (default): supporta `=`, range (<, >), ORDER BY.
- **Hash**: solo `=`. Più veloce per equality.
- **GIN** (Postgres): full-text search, JSON.
- **Bitmap** (Oracle, Postgres): colonne con pochi valori distinti.

### Composite index

Index su più colonne, ordinato lessicograficamente.

```sql
CREATE INDEX idx ON employees(dept_id, salary);
```

Usabile per:

- `WHERE dept_id = X` ✓
- `WHERE dept_id = X AND salary > Y` ✓
- `WHERE salary > Y` **NO** (l'ordine è (dept, salary), non (salary)).

**Regola del leftmost prefix**: l'index aiuta solo se filtri sulle colonne **iniziali**.

### EXPLAIN

In Postgres/MySQL: `EXPLAIN ANALYZE <query>` mostra il piano di esecuzione.

- **Seq Scan**: tabella intera (no index usato). Lento per grandi tabelle.
- **Index Scan / Index Only Scan**: ottimo.
- **Nested Loop, Hash Join, Merge Join**: tipi di join.

Strumento di debug fondamentale per query lente.

## Parte 9 — Transazioni e ACID

### Cos'è una transazione

Sequenza di operazioni che devono essere eseguite come **un'unità atomica**.

Esempio: bonifico da A a B.

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
  UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
COMMIT;
```

Se il sistema crasha tra le due UPDATE, vuoi che **entrambe** falliscano (rollback), non che soldi spariscono.

### ACID

- **A**tomicity: tutto o niente. Crash → rollback.
- **C**onsistency: vincoli rispettati (foreign keys, check constraints).
- **I**solation: transazioni concorrenti come se serial.
- **D**urability: una volta commit, persistono anche se sistema cade.

### Isolation levels

Quanto strict deve essere l'isolation? 4 livelli, da debole a forte:

| Livello | Dirty read | Non-repeatable read | Phantom read |
|---|---|---|---|
| Read Uncommitted | ✓ | ✓ | ✓ |
| Read Committed | ✗ | ✓ | ✓ |
| Repeatable Read | ✗ | ✗ | ✓ |
| Serializable | ✗ | ✗ | ✗ |

Anomalie:

- **Dirty read**: leggi dati non ancora commit da un'altra transazione.
- **Non-repeatable read**: leggi 2 volte la stessa riga, valori diversi.
- **Phantom read**: leggi 2 volte un range, righe diverse (insert/delete concorrenti).

**Postgres default**: Read Committed.
**MySQL InnoDB default**: Repeatable Read.

Più strict = più sicuro ma più lento.

## Parte 10 — Lock e MVCC

### Lock

- **Shared (read) lock**: molti possono averlo simultaneamente.
- **Exclusive (write) lock**: uno solo.

Quando una transazione scrive una riga, prende l'exclusive lock. Altri lettori aspettano.

### MVCC (Multi-Version Concurrency Control)

Postgres/InnoDB usano MVCC: ogni transazione vede uno **snapshot** del database al momento del suo inizio (o di ogni statement, dipende dal livello).

Conseguenza: le **letture non bloccano le scritture e viceversa**. Maggiore concorrenza.

## Parte 11 — Normalizzazione

Schema senza ridondanza, con dipendenze pulite.

### Forme normali

- **1NF**: ogni cella ha un valore atomico (no liste in una cella).
- **2NF**: 1NF + nessuna dipendenza parziale dalla chiave composta.
- **3NF**: 2NF + nessuna dipendenza transitiva (un attributo dipende dalla chiave, non da altri attributi).
- **BCNF**: ogni dipendenza ha un superkey come determinante.

In pratica si arriva a 3NF.

### Denormalizzazione

Per **performance**, a volte si duplicano dati. Es. salvi `user_name` in ogni `order` invece di fare JOIN. NoSQL spesso denormalizza by design.

Trade-off: storage + complessità writes vs velocità reads.

## Parte 12 — SQL vs NoSQL: decision tree

| Scenario | Scelta |
|---|---|
| Transazioni multi-tabella ACID | SQL |
| Schema evoluto rapidamente | NoSQL document |
| Letture/scritture massicce per chiave | NoSQL KV |
| JOIN complesse | SQL |
| Scale orizzontale enorme (10M+ QPS) | NoSQL |
| Time-series / log | Time-series DB |
| Relazioni complesse (social graph) | Graph DB |
| Full-text search | Elasticsearch |

## Parte 13 — Esercizi SQL

### Esercizio 20.1 — Second Highest Salary <span class="problem-tag easy">EASY</span>

<details><summary>Soluzione</summary>

```sql
SELECT MAX(salary) AS second
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

O con window:

```sql
SELECT DISTINCT salary
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk
  FROM employees
) t
WHERE rk = 2;
```
</details>

### Esercizio 20.2 — Nth Highest Salary <span class="problem-tag medium">MEDIUM</span>

Generalizzazione. `DENSE_RANK() = N`.

### Esercizio 20.3 — Department Top Three Salaries <span class="problem-tag hard">HARD</span>

<details><summary>Soluzione</summary>

```sql
SELECT dept, name, salary FROM (
  SELECT d.name AS dept, e.name, e.salary,
         DENSE_RANK() OVER (PARTITION BY d.id ORDER BY e.salary DESC) AS rk
  FROM employees e
  JOIN departments d ON e.dept_id = d.id
) t
WHERE rk <= 3;
```

Window con PARTITION BY = "top N per gruppo".
</details>

### Esercizio 20.4 — Duplicate Emails <span class="problem-tag easy">EASY</span>

<details><summary>Soluzione</summary>

```sql
SELECT email FROM users GROUP BY email HAVING COUNT(*) > 1;
```

HAVING per filtrare gruppi post-aggregate.
</details>

### Esercizio 20.5 — Customers Who Never Order <span class="problem-tag easy">EASY</span>

<details><summary>Soluzione</summary>

```sql
SELECT c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
```

LEFT JOIN + filtro su NULL: "anti-join".
</details>

### Esercizio 20.6 — Trips and Users <span class="problem-tag hard">HARD</span>

Cancellation rate per giorno, escludendo utenti banditi.

<details><summary>Soluzione</summary>

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

Tecnica: `CASE WHEN ... THEN 1 ELSE 0 END` per conteggiare condizionalmente in SUM.
</details>

### Esercizio 20.7 — Consecutive Numbers <span class="problem-tag medium">MEDIUM</span>

Trova valori `num` che appaiono almeno 3 volte consecutivamente nei log.

<details><summary>Soluzione</summary>

```sql
SELECT DISTINCT l1.num AS ConsecutiveNums
FROM logs l1
JOIN logs l2 ON l2.id = l1.id + 1 AND l2.num = l1.num
JOIN logs l3 ON l3.id = l1.id + 2 AND l3.num = l1.num;
```

Self-join tre volte. Per "almeno k consecutive" generalizzato, meglio window con LAG/LEAD.
</details>

### Esercizio 20.8 — Running Total <span class="problem-tag medium">MEDIUM</span>

```sql
SELECT user_id, date,
       SUM(amount) OVER (PARTITION BY user_id ORDER BY date) AS running_total
FROM transactions;
```

### Esercizio 20.9 — Median Salary <span class="problem-tag hard">HARD</span>

<details><summary>Soluzione</summary>

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

Per n dispari: una sola riga (rn = (n+1)/2). Per n pari: media delle due centrali.
</details>

## Riassunto

1. **SQL dichiarativo**: dici cosa vuoi, DB ottimizza.
2. **Ordine logico**: FROM → WHERE → GROUP → HAVING → SELECT → ORDER → LIMIT.
3. **JOIN**: INNER (intersezione), LEFT (tutta sinistra), self-join per gerarchie.
4. **Window functions**: superpotere. ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD, running totals.
5. **Indici**: come l'indice di un libro. B-tree per `=` e range, hash per `=`.
6. **ACID + isolation levels**: 4 livelli, trade-off concorrenza/sicurezza.
7. **MVCC**: letture non bloccano scritture. Postgres/InnoDB.
8. **SQL vs NoSQL**: SQL per transazioni e JOIN, NoSQL per scala e schema flessibile.

In colloquio SQL: pratica con LeetCode SQL (50 problemi è un buon target). Window functions sono **must-have** per i livelli medi.
