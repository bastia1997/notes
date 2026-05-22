---
title: "Spring Data JPA: Repository, derived queries, pagination, Specification"
area: "Spring Core"
order: 27
level: "intermediate"
summary: "JpaRepository, CrudRepository, PagingAndSortingRepository. Derived query methods (findByEmail, findByAgeBetween). @Query with JPQL/native. Pagination (Pageable, Page). Specifications for dynamic filters. Projections."
prereq: ["Section 26"]
tools: ["Spring Boot 3.x + spring-boot-starter-data-jpa"]
---

# Spring Data JPA: Repository, derived queries, pagination, Specification

## Repository interface

```java
public interface CustomerRepository extends JpaRepository<Customer, Long> {}
```

You get free: `save`, `findById`, `findAll`, `delete`, `count`, `existsById`. Plus pagination, sorting, bulk ops.

```java
@Service
public class CustomerService {
    private final CustomerRepository repo;
    public CustomerService(CustomerRepository repo) { this.repo = repo; }

    public Customer create(String name) { return repo.save(new Customer(name)); }
    public Customer get(long id) { return repo.findById(id).orElseThrow(); }
}
```

Spring Data generates the impl at runtime (proxy + reflection).

## Derived queries

From method name to SQL:

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

Spring Data parses the name and generates JPQL. Keywords: `And`, `Or`, `Between`, `LessThan`, `GreaterThan`, `Like`, `Containing`, `StartingWith`, `EndingWith`, `IsNull`, `In`, `IgnoreCase`, `OrderBy<Field>Asc/Desc`, `Top<N>`, `Distinct`.

> **Limit**: names become unreadable with many conditions. Beyond 3 conditions, switch to `@Query` or Specification.

## `@Query`: JPQL and native

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

`@Modifying` for UPDATE/DELETE. Requires transaction.

## Pagination and sorting

```java
Page<Customer> page = repo.findAll(PageRequest.of(0, 20, Sort.by("name").ascending()));
page.getContent();
page.getTotalElements();
page.getTotalPages();
page.hasNext();
```

```java
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Page<Customer> findByCity(String city, Pageable pageable);
}

Page<Customer> p = repo.findByCity("Milan",
    PageRequest.of(0, 20, Sort.by(Direction.DESC, "createdAt")));
```

In `@RestController`, Spring Boot extracts `Pageable` from the query string (`?page=0&size=20&sort=name,asc`).

## Specifications: dynamic filters

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

List<Customer> result = repo.findAll(
    Specification.where(hasCity("Milan")).and(olderThan(30))
);
```

Combine with `.and(...)`, `.or(...)`, `.not(...)`. Perfect for optional filters.

## Projections: read only what's needed

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

Spring generates SQL selecting only the needed columns. Saves bandwidth and dirty checking.

With explicit DTO + constructor:

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

For `@CreatedBy` provide an `AuditorAware<String>`.

## Exercises

<details>
<summary>Ex 27.1 — Full CRUD</summary>

`Customer(id, name, email, city)` + repository + service + REST controller with `POST`, `GET /{id}`, `GET (paginated)`, `DELETE /{id}`.

</details>

<details>
<summary>Ex 27.2 — Derived + @Query</summary>

`findByCity(String city, Pageable)` as derived. `topSpenders(int n)` as `@Query`.

</details>

<details>
<summary>Ex 27.3 — Specifications</summary>

REST endpoint `GET /customers?city=...&minAge=...&search=...`. Each filter optional. Compose `Specification` only if param present.

</details>

## Take-aways

- `JpaRepository<T, ID>` gives you CRUD for free.
- Derived queries up to 2-3 conditions; beyond, `@Query` or Specification.
- `Pageable` + `Page<T>` for pagination.
- Specifications for dynamic filters.
- Projections to read only what's needed.

Next: Spring MVC and REST.
