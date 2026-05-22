---
title: "Spring WebFlux + Reactor: Mono, Flux, reactive programming"
area: "Spring Web"
order: 30
level: "advanced"
summary: "Reactive programming: how it differs from traditional MVC. Reactor: Mono and Flux. Operators (map, flatMap, filter, zip, ...). WebClient. R2DBC. Backpressure. When to use WebFlux and when not."
prereq: ["Section 29"]
tools: ["Spring Boot starter webflux"]
---

# Spring WebFlux + Reactor: reactive programming

## MVC vs WebFlux

| Aspect | Spring MVC | Spring WebFlux |
|---|---|---|
| Model | Servlet, thread-per-request | Reactive, event loop |
| API | `@Controller`, sync | `@Controller`, async (Mono/Flux) |
| Default server | Tomcat | Netty (Tomcat too) |
| Database | JPA blocking | R2DBC reactive |
| Throughput at same resources | Good | Higher for I/O-heavy |
| Complexity | Low | High (debug, stack traces) |

> **With virtual threads (Java 21)**, most reasons for WebFlux are gone: Spring MVC on virtual threads scales like WebFlux for I/O-bound work, with simpler code.

## Reactor: `Mono` and `Flux`

- **`Mono<T>`**: 0 or 1 element.
- **`Flux<T>`**: 0..N elements (also infinite/streaming).

```java
Mono<String> m = Mono.just("hi");
Flux<Integer> f = Flux.range(1, 5);

m.subscribe(System.out::println);
f.subscribe(System.out::println);
```

**Lazy**: the pipeline runs only when someone **subscribes**.

## Main operators

```java
Mono.just(42)
    .map(n -> n * 2)
    .flatMap(n -> repo.findById(n))
    .filter(u -> u.isActive())
    .defaultIfEmpty(emptyUser)
    .doOnNext(u -> log.info("got {}", u))
    .onErrorResume(ex -> Mono.just(fallback))
    .subscribe(u -> ...);

Flux.fromIterable(ids)
    .flatMap(id -> repo.findById(id))    // parallel by default
    .filter(User::isActive)
    .map(User::email)
    .collectList()
    .subscribe(list -> ...);
```

Key operators: `map`, `flatMap`, `filter`, `zip`, `merge`, `concat`, `take(n)`, `skip(n)`, `delayElements`, `retry`, `timeout`, `onErrorResume`.

## Reactive controller

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repo;
    public UserController(UserRepository repo) { this.repo = repo; }

    @GetMapping
    public Flux<User> all() { return repo.findAll(); }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<User>> get(@PathVariable long id) {
        return repo.findById(id)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<User> create(@RequestBody Mono<NewUser> body) {
        return body.map(n -> new User(n.name()))
                   .flatMap(repo::save);
    }
}
```

## `WebClient`: reactive HTTP client

```java
WebClient client = WebClient.builder()
    .baseUrl("https://api.example.com")
    .build();

Mono<Customer> c = client.get()
    .uri("/customers/{id}", 42)
    .retrieve()
    .bodyToMono(Customer.class);

Flux<Order> orders = client.get()
    .uri("/customers/{id}/orders", 42)
    .retrieve()
    .bodyToFlux(Order.class);
```

Works in traditional MVC: WebClient is the **default recommended HTTP client** even without WebFlux. RestTemplate is in maintenance.

## R2DBC: reactive JDBC

```java
public interface UserRepository extends R2dbcRepository<User, Long> {
    Flux<User> findByCity(String city);
}
```

Constraint: no JPA. Map manually or use simple DTOs.

## Backpressure

The problem of consumers slower than producers. Reactor handles it via `request(n)`: the subscriber says "I want n at a time".

Strategies: `onBackpressureBuffer`, `onBackpressureDrop`, `onBackpressureLatest`.

## When NOT to use WebFlux

- "Normal" CRUD app with DB ⟶ MVC + virtual threads. Simpler.
- Teams not experienced with reactive ⟶ painful debug.
- Need JPA/Hibernate ⟶ JPA is blocking, you'll work around.

### When to use WebFlux

- API gateway "fanning out" calls to microservices.
- Servers with many long-lived connections (SSE, WebSocket).
- Continuous data streaming.

## Exercises

<details>
<summary>Ex 30.1 — Reactive hello</summary>

Endpoint `/hello/{name}` returning `Mono<String>`. Add `delayElement(Duration.ofSeconds(1))` to simulate I/O.

</details>

<details>
<summary>Ex 30.2 — Parallel WebClient</summary>

Call 3 endpoints in parallel, combine with `Mono.zip`.

</details>

<details>
<summary>Ex 30.3 — Server-Sent Events</summary>

Endpoint `/events` emitting an event per second:
```java
@GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<String> events() {
    return Flux.interval(Duration.ofSeconds(1)).map(i -> "evt " + i);
}
```

</details>

## Take-aways

- WebFlux = reactive. `Mono` (0/1) and `Flux` (0..N).
- Lazy: only `subscribe` runs.
- Functional operators: `map`, `flatMap`, `filter`, ...
- `WebClient` is the first-choice HTTP client even in MVC.
- **For most apps, MVC + virtual threads is enough.** Use WebFlux only with specific reasons.

Next: Spring Security.
