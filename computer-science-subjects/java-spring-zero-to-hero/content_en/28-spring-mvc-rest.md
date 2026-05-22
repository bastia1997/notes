---
title: "Spring MVC: DispatcherServlet, controllers, REST endpoints"
area: "Spring Web"
order: 28
level: "intermediate"
summary: "Spring MVC architecture: DispatcherServlet, HandlerMapping, ViewResolver. @Controller vs @RestController. Mapping (@GetMapping, @PostMapping, ...). PathVariable, RequestParam, RequestBody. ResponseEntity. ContentNegotiation."
prereq: ["Section 27"]
tools: ["Spring Boot starter web"]
---

# Spring MVC: DispatcherServlet, controllers, REST

## Architecture

```mermaid
sequenceDiagram
    participant C as Client
    participant DS as DispatcherServlet
    participant HM as HandlerMapping
    participant HA as HandlerAdapter
    participant CTRL as @Controller
    participant MC as MessageConverter

    C->>DS: HTTP request
    DS->>HM: find handler
    HM-->>DS: controller method
    DS->>HA: invoke
    HA->>MC: deserialize body
    HA->>CTRL: method(args)
    CTRL-->>HA: object / ResponseEntity
    HA->>MC: serialize
    MC-->>DS: bytes
    DS-->>C: HTTP response
```

Spring Boot starter-web configures everything.

## `@RestController`

```java
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService svc;
    public CustomerController(CustomerService svc) { this.svc = svc; }

    @GetMapping
    public List<CustomerDto> list(@RequestParam(required = false) String city) {
        return svc.list(city);
    }

    @GetMapping("/{id}")
    public CustomerDto get(@PathVariable long id) {
        return svc.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDto create(@RequestBody @Valid NewCustomerRequest req) {
        return svc.create(req);
    }

    @PutMapping("/{id}")
    public CustomerDto update(@PathVariable long id, @RequestBody @Valid UpdateRequest req) {
        return svc.update(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long id) {
        svc.delete(id);
    }
}
```

`@RestController` = `@Controller` + `@ResponseBody` (serializes return to JSON via Jackson).

## Parameters

| Annotation | What it binds |
|---|---|
| `@PathVariable` | Path segment: `/users/{id}` |
| `@RequestParam` | Query string: `?city=Milan` |
| `@RequestBody` | Request body (JSON/XML) |
| `@RequestHeader` | HTTP header |
| `@CookieValue` | Cookie |
| `@ModelAttribute` | Form data |
| `@AuthenticationPrincipal` | Authenticated user (Spring Security) |

`Pageable` is resolved automatically from the query string.

## `ResponseEntity` for fine control

```java
@GetMapping("/{id}")
public ResponseEntity<CustomerDto> get(@PathVariable long id) {
    return svc.find(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@PostMapping
public ResponseEntity<CustomerDto> create(@RequestBody NewCustomerRequest req) {
    CustomerDto c = svc.create(req);
    return ResponseEntity
        .created(URI.create("/api/customers/" + c.id()))
        .body(c);
}
```

## Validation

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

```java
public record NewCustomerRequest(
    @NotBlank @Size(max = 100) String name,
    @Email String email,
    @Min(0) @Max(150) Integer age
) {}

@PostMapping
public CustomerDto create(@RequestBody @Valid NewCustomerRequest req) { ... }
```

If validation fails, Spring throws `MethodArgumentNotValidException` ⟶ 400.

## Global exception handler

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> notFound(NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("NOT_FOUND", e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException e) {
        List<String> errors = e.getBindingResult().getFieldErrors().stream()
            .map(f -> f.getField() + ": " + f.getDefaultMessage())
            .toList();
        return ResponseEntity.badRequest()
            .body(new ErrorResponse("VALIDATION", String.join(", ", errors)));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> generic(Exception e) {
        log.error("uncaught", e);
        return ResponseEntity.internalServerError()
            .body(new ErrorResponse("INTERNAL", "internal error"));
    }
}

public record ErrorResponse(String code, String message) {}
```

Or **`ProblemDetail`** (RFC 7807, supported in Spring 6+).

## Filters, Interceptors, HandlerMethodArgumentResolver

- **Filter** (Servlet API): before/after everything, even before Spring.
- **Interceptor** (Spring): around handler, knows the method.
- **HandlerMethodArgumentResolver**: adds a new injectable type as controller param.

```java
@Component
public class TimingInterceptor implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) {
        req.setAttribute("t0", System.nanoTime());
        return true;
    }
    public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object handler, Exception e) {
        long t0 = (long) req.getAttribute("t0");
        log.info("{} {} {}ms", req.getMethod(), req.getRequestURI(), (System.nanoTime() - t0) / 1_000_000);
    }
}
```

## Exercises

<details>
<summary>Ex 28.1 — Full REST CRUD</summary>

Implement CRUD for `Customer` with `@RestController`. Add validation and `@RestControllerAdvice` for error handling.

</details>

<details>
<summary>Ex 28.2 — Pagination + sorting via query string</summary>

`GET /customers?page=0&size=20&sort=name,asc` ⟶ `Page<CustomerDto>`.

</details>

<details>
<summary>Ex 28.3 — Interceptor</summary>

Add an interceptor logging `method path status timeMs` per request.

</details>

## Take-aways

- `@RestController` for REST APIs.
- `@PathVariable`, `@RequestParam`, `@RequestBody`, `@Valid`.
- `ResponseEntity` for fine control of status/headers.
- **Always** `@RestControllerAdvice` for uniform errors.
- Validation with Bean Validation annotations.

Next: REST best practices, HATEOAS, OpenAPI.
