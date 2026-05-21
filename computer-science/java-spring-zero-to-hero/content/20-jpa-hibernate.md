---
title: "JPA / Hibernate: entità, relazioni, lazy/eager, N+1, cache"
area: "Persistenza"
order: 20
level: "avanzato"
summary: "JPA come specifica, Hibernate come implementazione. Entità, @Id, @GeneratedValue, @Column. Relazioni @OneToMany, @ManyToOne, fetch type. PersistenceContext, JPQL. Problema N+1 e come evitarlo. Cache L1, L2, query cache."
prereq: ["Sezione 19"]
tools: ["JDK 21", "Hibernate 6.x", "Spring Boot"]
---

# JPA / Hibernate: ORM in Java

## JPA vs Hibernate

- **JPA (Jakarta Persistence API)**: specifica standard, `jakarta.persistence.*`. Solo interfacce.
- **Hibernate**: l'implementazione più diffusa. Spring Boot la usa di default.

Esistono altre implementazioni (EclipseLink, OpenJPA), ma Hibernate vince.

## Entità

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

    // costruttore vuoto OBBLIGATORIO da JPA
    public Customer() {}
    public Customer(String name, String email) { this.name = name; this.email = email; }
    // getter, setter, equals, hashCode...
}
```

> JPA richiede un costruttore senza argomenti (lo usa per creare istanze da DB).

### `@Id` e generazione

| Strategy | Quando |
|---|---|
| `IDENTITY` | Auto-increment (Postgres `SERIAL`, MySQL `AUTO_INCREMENT`) |
| `SEQUENCE` | Sequenza DB (Postgres, Oracle) — più batch-friendly |
| `UUID` (Hibernate) | Per chiavi UUID |
| `AUTO` | Hibernate sceglie | 

### Relazioni

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

- `LAZY`: l'associazione viene caricata solo quando la usi (proxy).
- `EAGER`: caricata sempre, anche se non ti serve.

**Regola**: usa **sempre `LAZY`** per associazioni `@ManyToOne`, `@OneToMany`. `EAGER` è una piaga: carica troppi dati. Default JPA: `@OneToMany`/`@ManyToMany` = LAZY, `@ManyToOne`/`@OneToOne` = EAGER. **Cambia sempre i `@ManyToOne` in LAZY.**

## EntityManager e PersistenceContext

```java
@PersistenceContext
private EntityManager em;

public Customer save(Customer c) {
    em.persist(c);   // INSERT
    return c;
}

public Customer find(Long id) {
    return em.find(Customer.class, id);   // SELECT by id
}

public void delete(Long id) {
    Customer c = em.find(Customer.class, id);
    em.remove(c);
}
```

Il **persistence context** è una cache di prima livello: tiene le entità "managed". Modifiche a entità managed sono auto-rilevate (dirty checking) e flushate al commit:

```java
@Transactional
public void rinomina(Long id, String nuovoNome) {
    Customer c = em.find(Customer.class, id);   // managed
    c.setName(nuovoNome);                        // niente em.merge necessario
    // a fine metodo, JPA fa l'UPDATE
}
```

## JPQL e Criteria API

### JPQL: SQL su entità

```java
TypedQuery<Customer> q = em.createQuery(
    "SELECT c FROM Customer c WHERE c.name LIKE :name", Customer.class);
q.setParameter("name", "A%");
List<Customer> result = q.getResultList();
```

JPQL usa **nomi di entità e campi Java**, non tabelle/colonne SQL.

### Criteria (per query dinamiche)

```java
CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery<Customer> q = cb.createQuery(Customer.class);
Root<Customer> root = q.from(Customer.class);
q.where(cb.like(root.get("name"), "A%"));
List<Customer> result = em.createQuery(q).getResultList();
```

In Spring Data preferisci `JpaSpecificationExecutor`.

## Il problema N+1

```java
List<Order> orders = em.createQuery("SELECT o FROM Order o", Order.class).getResultList();
for (Order o : orders) {
    System.out.println(o.getCustomer().getName());   // BOOM: query per ogni order
}
```

Una SELECT per le order (1) + N SELECT per il customer di ognuna = **N+1 query**. È il bug più frequente di tutto JPA.

### Soluzioni

1. **JOIN FETCH** (uguale, una sola query):
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

> **Per ogni query JPA**, chiediti: "quante SELECT esegue davvero?" Attiva `spring.jpa.show-sql=true` durante lo sviluppo.

## Cache

### L1 — persistence context (gratis)

Tutte le entità lette in una transazione sono cachate. `em.find(X.class, 1)` due volte = una sola SELECT.

### L2 — second-level cache (opzionale)

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

Cachano per **classe**, condivisa fra transazioni. Attenta con dati che cambiano.

### Query cache

Cachano i risultati di JPQL. Raramente la attivi: di solito è meglio una cache applicativa (Caffeine/Redis).

## Transazioni in JPA / Spring

```java
@Transactional
public Order placeOrder(NewOrderRequest r) {
    Customer c = repo.findById(r.customerId()).orElseThrow();
    Order o = new Order(c);
    r.lines().forEach(l -> o.addLine(new OrderLine(l.product(), l.price())));
    return repo.save(o);
}
```

`@Transactional`: il proxy Spring apre una transazione all'entrata, commit/rollback all'uscita. Vedi sezione 25 (AOP) e 27 (Spring Data JPA).

## Esercizi

<details>
<summary>Es 20.1 — Entità + repository</summary>

Modella `Customer`, `Order`, `OrderLine`. Implementa CRUD basic con Spring Data:

```java
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByNameContainingIgnoreCase(String s);
}
```

</details>

<details>
<summary>Es 20.2 — Riproduci N+1</summary>

Carica `findAll()` di Order e itera su `o.getCustomer().getName()`. Attiva `show-sql` e conta le query. Risolvi con `@EntityGraph`.

</details>

<details>
<summary>Es 20.3 — Dirty checking</summary>

```java
@Transactional
public void rinomina(Long id, String nuovoNome) {
    Customer c = em.find(Customer.class, id);
    c.setName(nuovoNome);   // niente save
}
```

Verifica nei log che parte una sola UPDATE.

</details>

## Cosa devi portarti via

- JPA = specifica, Hibernate = implementazione (la userai).
- `@Entity` + `@Id` + `@GeneratedValue`. Costruttore senza args obbligatorio.
- **Sempre LAZY** sui `@ManyToOne`.
- **N+1** è il bug più frequente. Risolvi con `JOIN FETCH` o `@EntityGraph`.
- Persistence context = cache L1. Modifiche a entità managed sono auto-flushate.
- `@Transactional` su metodi di servizio.

Prossimo: SQL essenziale per il programmatore Java.
