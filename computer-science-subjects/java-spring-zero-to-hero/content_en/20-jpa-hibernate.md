---
title: "JPA / Hibernate: entities, relationships, lazy/eager, N+1, cache"
area: "Persistence"
order: 20
level: "advanced"
summary: "JPA as specification, Hibernate as implementation. Entities, @Id, @GeneratedValue, @Column. Relationships @OneToMany, @ManyToOne, fetch types. PersistenceContext, JPQL. N+1 problem and how to avoid it. L1/L2/query cache."
prereq: ["Section 19"]
tools: ["JDK 21", "Hibernate 6.x", "Spring Boot"]
---

# JPA / Hibernate: ORM in Java

## JPA vs Hibernate

- **JPA (Jakarta Persistence API)**: standard spec, `jakarta.persistence.*`. Interfaces only.
- **Hibernate**: the most widespread implementation. Spring Boot uses it by default.

Other impls exist (EclipseLink, OpenJPA), but Hibernate wins.

## Entity

```java
import jakarta.persistence.*;

@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(unique = true)
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Customer() {}   // REQUIRED by JPA
    public Customer(String name, String email) { this.name = name; this.email = email; }
}
```

> JPA requires a no-arg constructor (used to instantiate from DB).

### `@Id` and id generation

| Strategy | When |
|---|---|
| `IDENTITY` | Auto-increment (Postgres `SERIAL`, MySQL `AUTO_INCREMENT`) |
| `SEQUENCE` | DB sequence (Postgres, Oracle) — more batch-friendly |
| `UUID` (Hibernate) | UUID keys |
| `AUTO` | Hibernate picks |

### Relationships

```java
@Entity
public class Order {
    @Id @GeneratedValue private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderLine> lines = new ArrayList<>();
}

@Entity
public class OrderLine {
    @Id @GeneratedValue private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    private String product;
    private BigDecimal price;
}
```

### Fetch type

- `LAZY`: association loaded only when used (proxy).
- `EAGER`: always loaded, even if you don't need it.

**Rule**: always use **`LAZY`** for `@ManyToOne`, `@OneToMany`. `EAGER` is a plague. JPA default: `@OneToMany`/`@ManyToMany` = LAZY, `@ManyToOne`/`@OneToOne` = EAGER. **Always switch `@ManyToOne` to LAZY.**

## EntityManager and PersistenceContext

```java
@PersistenceContext
private EntityManager em;

public Customer save(Customer c) {
    em.persist(c);
    return c;
}

public Customer find(Long id) {
    return em.find(Customer.class, id);
}

public void delete(Long id) {
    Customer c = em.find(Customer.class, id);
    em.remove(c);
}
```

The **persistence context** is a first-level cache: keeps "managed" entities. Changes to managed entities are auto-detected (dirty checking) and flushed at commit:

```java
@Transactional
public void rename(Long id, String newName) {
    Customer c = em.find(Customer.class, id);   // managed
    c.setName(newName);                          // no em.merge needed
    // at method end, JPA issues UPDATE
}
```

## JPQL and Criteria API

### JPQL: SQL on entities

```java
TypedQuery<Customer> q = em.createQuery(
    "SELECT c FROM Customer c WHERE c.name LIKE :name", Customer.class);
q.setParameter("name", "A%");
List<Customer> result = q.getResultList();
```

JPQL uses **entity and field names**, not SQL tables/columns.

### Criteria (for dynamic queries)

```java
CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery<Customer> q = cb.createQuery(Customer.class);
Root<Customer> root = q.from(Customer.class);
q.where(cb.like(root.get("name"), "A%"));
List<Customer> result = em.createQuery(q).getResultList();
```

In Spring Data prefer `JpaSpecificationExecutor`.

## The N+1 problem

```java
List<Order> orders = em.createQuery("SELECT o FROM Order o", Order.class).getResultList();
for (Order o : orders) {
    System.out.println(o.getCustomer().getName());   // BOOM: one query per order
}
```

One SELECT for orders (1) + N SELECTs for each customer = **N+1 queries**. The most frequent JPA bug.

### Fixes

1. **JOIN FETCH** (single query):
   ```java
   "SELECT o FROM Order o JOIN FETCH o.customer"
   ```
2. **`@EntityGraph`** (Spring Data):
   ```java
   @EntityGraph(attributePaths = "customer")
   List<Order> findAll();
   ```
3. **Batch size**:
   ```java
   @ManyToOne(fetch = LAZY)
   @BatchSize(size = 50)   // Hibernate
   private Customer customer;
   ```

> For every JPA query, ask: "how many SELECTs does it really run?" Enable `spring.jpa.show-sql=true` in development.

## Cache

### L1 — persistence context (free)

All entities read in a transaction are cached. `em.find(X.class, 1)` twice = one SELECT.

### L2 — second-level cache (opt-in)

```yaml
spring:
  jpa:
    properties:
      hibernate.cache.use_second_level_cache: true
      hibernate.cache.region.factory_class: org.hibernate.cache.jcache.JCacheRegionFactory
```

```java
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Customer { ... }
```

Cached **per class**, shared across transactions. Careful with frequently-changing data.

### Query cache

Caches JPQL results. Rarely enabled: usually an application cache (Caffeine/Redis) is better.

## Transactions in JPA / Spring

```java
@Transactional
public Order placeOrder(NewOrderRequest r) {
    Customer c = repo.findById(r.customerId()).orElseThrow();
    Order o = new Order(c);
    r.lines().forEach(l -> o.addLine(new OrderLine(l.product(), l.price())));
    return repo.save(o);
}
```

`@Transactional`: Spring's proxy opens a transaction on entry, commit/rollback on exit. See section 25 (AOP) and 27 (Spring Data JPA).

## Exercises

<details>
<summary>Ex 20.1 — Entities + repository</summary>

Model `Customer`, `Order`, `OrderLine`. Implement CRUD with Spring Data:

```java
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByNameContainingIgnoreCase(String s);
}
```

</details>

<details>
<summary>Ex 20.2 — Reproduce N+1</summary>

Load `findAll()` on Order and iterate `o.getCustomer().getName()`. Enable `show-sql` and count queries. Fix with `@EntityGraph`.

</details>

<details>
<summary>Ex 20.3 — Dirty checking</summary>

```java
@Transactional
public void rename(Long id, String newName) {
    Customer c = em.find(Customer.class, id);
    c.setName(newName);   // no save
}
```

Verify logs show a single UPDATE.

</details>

## Take-aways

- JPA = spec, Hibernate = implementation (the one you'll use).
- `@Entity` + `@Id` + `@GeneratedValue`. No-arg constructor required.
- **Always LAZY** on `@ManyToOne`.
- **N+1** is the most frequent bug. Fix with `JOIN FETCH` or `@EntityGraph`.
- Persistence context = L1 cache. Changes to managed entities auto-flushed.
- `@Transactional` on service methods.

Next: essential SQL for the Java programmer.
