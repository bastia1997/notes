---
title: "REST: best practice, OpenAPI/Swagger, HATEOAS, versionamento"
area: "Spring Web"
order: 29
level: "intermedio"
summary: "Principi REST: risorse, verbi HTTP corretti, status code. Naming di URI. Versionamento dell'API. OpenAPI con springdoc. HATEOAS con Spring HATEOAS. Idempotency, paginazione standard, filtro."
prereq: ["Sezione 28"]
tools: ["Spring Boot starter web", "springdoc-openapi"]
---

# REST: best practice, OpenAPI/Swagger, HATEOAS, versionamento

## Principi REST (in pratica)

1. **Risorse**, non azioni. URL: `/api/orders/{id}`, non `/api/createOrder`.
2. **Verbi HTTP corretti**:
   | Verbo | Semantica | Idempotente |
   |---|---|---|
   | `GET` | leggi | sì |
   | `POST` | crea | no |
   | `PUT` | sostituisci intero | sì |
   | `PATCH` | aggiornamento parziale | no (generale) |
   | `DELETE` | elimina | sì |
3. **Status code corretti**: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500.
4. **Plural** per collezioni: `/users` invece di `/user`.
5. **Niente verbi nell'URL**: `/users/{id}/activate` è ok come "azione" non-CRUD.
6. **HATEOAS** se vuoi essere "veramente REST" (livello 3 Richardson). Quasi nessuno lo è.

## Versionamento

3 approcci:

- **In URL**: `/api/v1/orders`, `/api/v2/orders`. Brutto ma chiaro.
- **Header**: `Accept: application/vnd.acme.v2+json`. Pulito, ma curl-unfriendly.
- **Param**: `?version=2`. Sconsigliato.

In pratica nelle aziende: **URL versioning** (`/v1/`) per semplicità.

## OpenAPI / Swagger con springdoc

```xml
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
  <version>2.6.0</version>
</dependency>
```

Niente altro. Lancia l'app:

- `GET /v3/api-docs` ⟶ JSON OpenAPI 3
- `GET /swagger-ui.html` ⟶ UI per testare

Personalizza con annotation `@Operation`, `@Schema`, `@ApiResponse`:

```java
@Operation(summary = "Crea un cliente", description = "...")
@ApiResponses({
    @ApiResponse(responseCode = "201", description = "Creato"),
    @ApiResponse(responseCode = "400", description = "Validation error")
})
@PostMapping
public CustomerDto create(@RequestBody @Valid NewCustomerRequest req) { ... }
```

## HATEOAS con Spring HATEOAS

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-hateoas</artifactId>
</dependency>
```

```java
@GetMapping("/{id}")
public EntityModel<CustomerDto> get(@PathVariable long id) {
    CustomerDto c = svc.get(id);
    return EntityModel.of(c,
        linkTo(methodOn(CustomerController.class).get(id)).withSelfRel(),
        linkTo(methodOn(OrderController.class).list(id)).withRel("orders"),
        linkTo(methodOn(CustomerController.class).delete(id)).withRel("delete")
    );
}
```

Output:
```json
{
  "id": 42,
  "name": "Anna",
  "_links": {
    "self": { "href": "/api/customers/42" },
    "orders": { "href": "/api/orders?customerId=42" },
    "delete": { "href": "/api/customers/42" }
  }
}
```

## Convenzioni di risposta

### Errori uniformi

```json
{
  "code": "VALIDATION_ERROR",
  "message": "name must not be blank",
  "details": [
    { "field": "name", "message": "must not be blank" }
  ],
  "timestamp": "2026-05-21T10:00:00Z",
  "path": "/api/customers"
}
```

Oppure usa **`ProblemDetail`** (RFC 7807):

```java
throw new ResponseStatusException(HttpStatus.NOT_FOUND, "customer 42 not found");
```

### Paginazione

Spring Data ritorna `Page<T>` ⟶ JSON:

```json
{
  "content": [...],
  "page": { "size": 20, "number": 0, "totalElements": 123, "totalPages": 7 }
}
```

## Idempotency

`POST /payments` con doppio click ⟶ doppio pagamento? Usa **idempotency key**:

```
POST /payments
Idempotency-Key: 8f7c2a-...

```

Server salva il `Idempotency-Key` per N ore. Stesso key ⟶ ritorna risposta cachata.

## CORS

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry r) {
                r.addMapping("/api/**")
                 .allowedOrigins("https://app.acme.com")
                 .allowedMethods("GET", "POST", "PUT", "DELETE")
                 .allowedHeaders("*");
            }
        };
    }
}
```

O su singolo controller: `@CrossOrigin`.

## Esercizi

<details>
<summary>Es 29.1 — Swagger UI</summary>

Aggiungi springdoc all'app dell'Es 28.1 e verifica `/swagger-ui.html`.

</details>

<details>
<summary>Es 29.2 — ProblemDetail per errori</summary>

Sostituisci il tuo `@RestControllerAdvice` con `ProblemDetail` (RFC 7807).

</details>

<details>
<summary>Es 29.3 — Versioning</summary>

Crea `/v1/customers` (vecchio formato) e `/v2/customers` (nuovo con `fullName` invece di `name`).

</details>

## Cosa devi portarti via

- Verbi HTTP + status code corretti.
- Plural per collezioni.
- **OpenAPI/Swagger gratis** con springdoc.
- Errori uniformi (ProblemDetail RFC 7807).
- Versionamento via URL: pragmatico.
- Idempotency-Key per POST critici.

Prossimo: Spring WebFlux e programmazione reattiva.
