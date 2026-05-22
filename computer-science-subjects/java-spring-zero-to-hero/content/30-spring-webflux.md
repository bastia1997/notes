---
title: "Spring WebFlux + Reactor: Mono, Flux, programmazione reattiva"
area: "Spring Web"
order: 30
level: "avanzato"
summary: "Programmazione reattiva: cosa cambia rispetto a MVC tradizionale. Reactor: Mono e Flux. Operatori (map, flatMap, filter, zip, ...). WebClient. R2DBC. Backpressure. Quando usare WebFlux e quando no."
prereq: ["Sezione 29"]
tools: ["Spring Boot starter webflux"]
---

# Spring WebFlux + Reactor: programmazione reattiva

## MVC vs WebFlux

| Aspetto | Spring MVC | Spring WebFlux |
|---|---|---|
| Modello | Servlet, thread-per-request | Reattivo, event loop |
| API | `@Controller`, sync | `@Controller`, async (Mono/Flux) |
| Server default | Tomcat | Netty (anche Tomcat) |
| Database | JPA blocking | R2DBC reactive |
| Throughput a stessa risorse | Buono | Più alto con I/O intensi |
| Complessità | Bassa | Alta (debug, stack trace) |

> **Con virtual threads (Java 21)**, gran parte dei motivi per WebFlux sono caduti: Spring MVC su virtual threads scala come WebFlux per I/O-bound, con codice più semplice.

## Reactor: `Mono` e `Flux`

- **`Mono<T>`**: 0 o 1 elemento.
- **`Flux<T>`**: 0..N elementi (anche infiniti, streaming).

```java
Mono<String> m = Mono.just("ciao");
Flux<Integer> f = Flux.range(1, 5);   // 1,2,3,4,5

m.subscribe(System.out::println);     // niente accade finché non subscribe
f.subscribe(System.out::println);
```

**Lazy**: il pipeline non gira finché qualcuno non si **subscribe**.

## Operatori principali

```java
Mono.just(42)
    .map(n -> n * 2)
    .flatMap(n -> repo.findById(n))   // Mono<User>
    .filter(u -> u.isActive())
    .defaultIfEmpty(emptyUser)
    .doOnNext(u -> log.info("got {}", u))
    .onErrorResume(ex -> Mono.just(fallback))
    .subscribe(u -> ...);

Flux.fromIterable(ids)
    .flatMap(id -> repo.findById(id))    // parallelo per default
    .filter(User::isActive)
    .map(User::email)
    .collectList()
    .subscribe(list -> ...);
```

Operatori chiave: `map`, `flatMap`, `filter`, `zip`, `merge`, `concat`, `take(n)`, `skip(n)`, `delayElements`, `retry`, `timeout`, `onErrorResume`.

## Controller reattivo

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

## `WebClient`: HTTP client reattivo

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

Funziona in MVC tradizionale: WebClient è **già il default consigliato** anche senza WebFlux. RestTemplate è in manutenzione.

## R2DBC: JDBC reattivo

```java
public interface UserRepository extends R2dbcRepository<User, Long> {
    Flux<User> findByCity(String city);
}
```

Vincolo: non hai JPA. Devi mappare a mano o usare DTO semplici.

## Backpressure

Il problema dei consumatori più lenti dei produttori. Reactor lo gestisce con `request(n)`: il subscriber dice "voglio n elementi alla volta".

Strategie: `onBackpressureBuffer`, `onBackpressureDrop`, `onBackpressureLatest`.

## Quando NON usare WebFlux

- App "normale" CRUD con DB ⟶ MVC + virtual threads. Più semplice.
- Team non esperti di reattivo ⟶ debug doloroso.
- Necessità JPA/Hibernate ⟶ JPA è blocking, ti tocca workaround.

### Quando usare WebFlux

- API gateway che fa "fan-out" di chiamate a microservizi.
- Server con molte connessioni long-lived (SSE, WebSocket).
- Streaming dati continuo.

## Esercizi

<details>
<summary>Es 30.1 — Hello reactive</summary>

Crea endpoint `/hello/{name}` con `Mono<String>`. Aggiungi un `delayElement(Duration.ofSeconds(1))` per simulare I/O.

</details>

<details>
<summary>Es 30.2 — WebClient parallelo</summary>

Chiama 3 endpoint diversi in parallelo, combina con `Mono.zip`.

</details>

<details>
<summary>Es 30.3 — Server-Sent Events</summary>

Endpoint `/events` che emette un evento al secondo:
```java
@GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<String> events() {
    return Flux.interval(Duration.ofSeconds(1)).map(i -> "evt " + i);
}
```

</details>

## Cosa devi portarti via

- WebFlux = reattivo. `Mono` (0/1) e `Flux` (0..N).
- Lazy: solo `subscribe` esegue.
- Operatori funzionali: `map`, `flatMap`, `filter`, ...
- `WebClient` è il client HTTP di prima scelta anche in MVC.
- **Per la maggior parte delle app, MVC + virtual threads basta.** Usa WebFlux solo se hai motivi specifici.

Prossimo: Spring Security.
