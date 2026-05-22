---
title: "REST: best practices, OpenAPI/Swagger, HATEOAS, versioning"
area: "Spring Web"
order: 29
level: "intermediate"
summary: "REST principles: resources, correct HTTP verbs, status codes. URI naming. API versioning. OpenAPI with springdoc. HATEOAS with Spring HATEOAS. Idempotency, standard pagination, filtering."
prereq: ["Section 28"]
tools: ["Spring Boot starter web", "springdoc-openapi"]
---

# REST: best practices, OpenAPI/Swagger, HATEOAS, versioning

## REST principles (in practice)

1. **Resources**, not actions. URL: `/api/orders/{id}`, not `/api/createOrder`.
2. **Correct HTTP verbs**:
   | Verb | Semantics | Idempotent |
   |---|---|---|
   | `GET` | read | yes |
   | `POST` | create | no |
   | `PUT` | replace whole | yes |
   | `PATCH` | partial update | no (in general) |
   | `DELETE` | delete | yes |
3. **Correct status codes**: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500.
4. **Plural** for collections: `/users` not `/user`.
5. **No verbs in URLs**: `/users/{id}/activate` is acceptable as a non-CRUD "action".
6. **HATEOAS** if you want to be "truly REST" (Richardson Level 3). Almost nobody is.

## Versioning

3 approaches:

- **URL**: `/api/v1/orders`, `/api/v2/orders`. Ugly but clear.
- **Header**: `Accept: application/vnd.acme.v2+json`. Clean, curl-unfriendly.
- **Param**: `?version=2`. Discouraged.

In practice in enterprises: **URL versioning** (`/v1/`) for simplicity.

## OpenAPI / Swagger with springdoc

```xml
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
  <version>2.6.0</version>
</dependency>
```

That's it. Run the app:

- `GET /v3/api-docs` ⟶ OpenAPI 3 JSON
- `GET /swagger-ui.html` ⟶ UI to test

Customize with `@Operation`, `@Schema`, `@ApiResponse`:

```java
@Operation(summary = "Create a customer", description = "...")
@ApiResponses({
    @ApiResponse(responseCode = "201", description = "Created"),
    @ApiResponse(responseCode = "400", description = "Validation error")
})
@PostMapping
public CustomerDto create(@RequestBody @Valid NewCustomerRequest req) { ... }
```

## HATEOAS with Spring HATEOAS

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
        linkTo(methodOn(OrderController.class).list(id)).withRel("orders")
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
    "orders": { "href": "/api/orders?customerId=42" }
  }
}
```

## Response conventions

### Uniform errors

```json
{
  "code": "VALIDATION_ERROR",
  "message": "name must not be blank",
  "details": [{ "field": "name", "message": "must not be blank" }],
  "timestamp": "2026-05-21T10:00:00Z",
  "path": "/api/customers"
}
```

Or use **`ProblemDetail`** (RFC 7807):

```java
throw new ResponseStatusException(HttpStatus.NOT_FOUND, "customer 42 not found");
```

### Pagination

Spring Data returns `Page<T>` ⟶ JSON:

```json
{
  "content": [...],
  "page": { "size": 20, "number": 0, "totalElements": 123, "totalPages": 7 }
}
```

## Idempotency

`POST /payments` with double-click ⟶ double payment? Use an **idempotency key**:

```
POST /payments
Idempotency-Key: 8f7c2a-...
```

Server stores the `Idempotency-Key` for N hours. Same key ⟶ returns cached response.

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

Or on a single controller: `@CrossOrigin`.

## Exercises

<details>
<summary>Ex 29.1 — Swagger UI</summary>

Add springdoc to the Ex 28.1 app and check `/swagger-ui.html`.

</details>

<details>
<summary>Ex 29.2 — ProblemDetail for errors</summary>

Replace your `@RestControllerAdvice` with `ProblemDetail` (RFC 7807).

</details>

<details>
<summary>Ex 29.3 — Versioning</summary>

Create `/v1/customers` (old format) and `/v2/customers` (new with `fullName` instead of `name`).

</details>

## Take-aways

- Correct HTTP verbs + status codes.
- Plural for collections.
- **Free OpenAPI/Swagger** with springdoc.
- Uniform errors (ProblemDetail RFC 7807).
- URL versioning: pragmatic.
- Idempotency-Key for critical POSTs.

Next: Spring WebFlux and reactive programming.
