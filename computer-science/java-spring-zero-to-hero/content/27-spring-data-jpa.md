---
title: "Spring Data JPA: Repository, derived queries, paginazione, Specification"
area: "Spring Core"
order: 27
level: "intermedio"
summary: "JpaRepository, CrudRepository, PagingAndSortingRepository. Derived query methods (findByEmail, findByAgeBetween). @Query con JPQL/native. Paginazione (Pageable, Page). Specifications per filtri dinamici. Projections."
prereq: ["Sezione 26"]
tools: ["Spring Boot 3.x + spring-boot-starter-data-jpa"]
---

# Spring Data JPA: Repository, derived queries, paginazione, Specification

## Repository interface

```java
public interface CustomerRepository extends JpaRepository<Customer, Long> {}
```

Hai gratis: `save`, `findById`, `findAll`, `delete`, `count`, `existsById`. Più paginazione, sorting, bulk operations.

```java
@Service
public class CustomerService {
    private final CustomerRepository repo;
    public CustomerService(CustomerRepository repo) { this.repo = repo; }

    public Customer create(String name) { return repo.save(new Customer(name)); }
    public Customer get(long id) { return repo.findById(id).orElseThrow(); }
}
```

Spring Data genera l'implementazione a runtime (proxy + reflection).

## Derived queries

Da nome metodo a query SQL:

```java
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);
    List<Customer> findByCityAndAgeGreaterThan(String city, int age);
    List<Customer> findByNameContainingIgnoreCase(String s);
    List<Customer> findByCreatedAtBetween(Instant from, Instant to);
    long countByActive(boolean active);
    boolean existsByEmail(String email);
    void deleteByEmail(String email);
    List<Customer> findTop10ByOrderByCreatedAtDesc();
}
```

Spring Data parsa il nome e genera la query JPQL. Keywords:
- `findBy`, `getBy`, `readBy`, `queryBy` (sinonimi)
- `And`, `Or`, `Between`, `LessThan`, `GreaterThan`, `Like`, `Containing`, `StartingWith`, `EndingWith`
- `IsNull`, `IsNotNull`, `In`, `NotIn`
- `IgnoreCase`
- `OrderBy<Field>Asc/Desc`
- `Top<N>`, `First<N>`, `Distinct`

> **Limite**: nomi diventano illeggibili con tante condizioni. Da 3+ condizioni passa a `@Query` o Specification.

## `@Query`: JPQL e native

```java
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.total > :min AND o.customer.city = :city")
    List<Order> findBigOrders(@Param("min") BigDecimal min, @Param("city") String city);

    @Query(value = "SELECT * FROM orders WHERE created_at >= NOW() - INTERVAL '7 days'",
           nativeQuery = true)
    List<Order> findLastWeek();

    @Modifying
    @Query("UPDATE Customer c SET c.active = false WHERE c.lastLoginAt < :cutoff")
    int deactivateInactive(@Param("cutoff") Instant cutoff);
}
```

`@Modifying` per UPDATE/DELETE. Richiede transazione.

## Paginazione e sorting

```java
Page<Customer> page = repo.findAll(PageRequest.of(0, 20, Sort.by("name").ascending()));
page.getContent();       // List<Customer> della pagina
page.getTotalElements(); // totale
page.getTotalPages();
page.hasNext();
```

```java
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Page<Customer> findByCity(String city, Pageable pageable);
}

// uso
Page<Customer> p = repo.findByCity("Milano",
    PageRequest.of(0, 20, Sort.by(Direction.DESC, "createdAt")));
```

Nel `@RestController` Spring Boot estrae `Pageable` dalla query string (`?page=0&size=20&sort=name,asc`).

## Specifications: filtri dinamici

```java
public interface CustomerRepository extends JpaRepository<Customer, Long>,
                                              JpaSpecificationExecutor<Customer> {}
```

```java
public class CustomerSpecs {
    public static Specification<Customer> hasCity(String city) {
        return (root, query, cb) -> cb.equal(root.get("city"), city);
    }
    public static Specification<Customer> olderThan(int age) {
        return (root, query, cb) -> cb.greaterThan(root.get("age"), age);
    }
}

// uso
List<Customer> result = repo.findAll(
    Specification.where(hasCity("Milano")).and(olderThan(30))
);
```

Combini specifiche con `.and(...)`, `.or(...)`, `.not(...)`. Perfetto per ricerche con filtri opzionali.

## Projections: leggere solo ciò che serve

```java
public interface CustomerSummary {
    Long getId();
    String getName();
    String getEmail();
}

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<CustomerSummary> findByCity(String city);
}
```

Spring genera SQL che seleziona solo le colonne necessarie. Risparmia banda e dirty checking.

Con DTO esplicito + costruttore:

```java
public record CustomerDto(Long id, String name, String email) {}

@Query("SELECT new it.zth.dto.CustomerDto(c.id, c.name, c.email) FROM Customer c")
List<CustomerDto> allDtos();
```

## Auditing

```java
@EnableJpaAuditing
@Configuration
public class JpaAuditingConfig {}

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Customer {
    @CreatedDate     private Instant createdAt;
    @LastModifiedDate private Instant updatedAt;
    @CreatedBy        private String createdBy;
    @LastModifiedBy   private String updatedBy;
}
```

Per `@CreatedBy` devi fornire un `AuditorAware<String>`.

## Esercizi

<details>
<summary>Es 27.1 — CRUD completo</summary>

`Customer(id, name, email, city)` + repository + service + REST controller con `POST`, `GET /{id}`, `GET (con paginazione)`, `DELETE /{id}`.

</details>

<details>
<summary>Es 27.2 — Derived + @Query</summary>

`findByCity(String city, Pageable)` come derived. `topSpenders(int n)` come `@Query`.

</details>

<details>
<summary>Es 27.3 — Specifications</summary>

Endpoint REST `GET /customers?city=...&minAge=...&search=...`. Ogni filtro è opzionale. Componi `Specification` solo se il parametro è presente.

</details>

## Cosa devi portarti via

- `JpaRepository<T, ID>` ti dà CRUD gratis.
- Derived queries fino a 2-3 condizioni; oltre, `@Query` o Specification.
- `Pageable` + `Page<T>` per paginazione.
- Specifications per filtri dinamici.
- Projections per leggere solo ciò che serve.

Prossimo: Spring MVC e REST.
