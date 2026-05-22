---
title: "I/O and NIO.2: File, Path, channels, buffers"
area: "Standard Library"
order: 11
level: "intermediate"
summary: "Old java.io (InputStream, OutputStream, Reader, Writer) vs NIO.2 (Path, Files, Channels). Reading/writing text and binary files, walking directories, watch service, charset."
prereq: ["Section 10"]
tools: ["JDK 21"]
---

# I/O and NIO.2: File, Path, channels, buffers

## Two APIs, same job

Java has two I/O families:

- **`java.io`** (original, Java 1.0): `File`, `FileInputStream`, `BufferedReader`, ...
- **`java.nio.file`** (Java 7+): `Path`, `Files`, `Channels`, ...

**For files**: always use **NIO.2**. More powerful, modern, handles symlinks and attributes.

## Byte streams vs Reader/Writer

- `InputStream`/`OutputStream` = bytes. Binary files (images, archives, raw data).
- `Reader`/`Writer` = characters. Text files (with charset).

```mermaid
flowchart LR
    FILE[(file on disk)]
    FILE -- bytes --> FIS[FileInputStream] --> ISR[InputStreamReader<br/>+charset] --> BR[BufferedReader<br/>readLine]
```

`BufferedReader` adds an in-memory buffer (faster).

## `Path` and `Files`

```java
Path p = Path.of("data", "config.yml");
Path abs = p.toAbsolutePath();
Path home = Path.of(System.getProperty("user.home"));

Files.exists(p);
Files.isDirectory(p);
Files.isRegularFile(p);
Files.size(p);
Files.getLastModifiedTime(p);
```

### Reading

```java
String content = Files.readString(p, StandardCharsets.UTF_8);
List<String> lines = Files.readAllLines(p, StandardCharsets.UTF_8);
byte[] bytes = Files.readAllBytes(p);
```

For large files, **streaming**:

```java
try (Stream<String> lines = Files.lines(p, StandardCharsets.UTF_8)) {
    lines.filter(s -> !s.isBlank()).forEach(System.out::println);
}
```

`Files.lines` opens a lazy stream; requires `try-with-resources`.

### Writing

```java
Files.writeString(p, "hi", StandardCharsets.UTF_8);
Files.write(p, List.of("line 1", "line 2"), StandardCharsets.UTF_8);
Files.write(p, "x\n".getBytes(UTF_8),
    StandardOpenOption.APPEND, StandardOpenOption.CREATE);
```

### Buffered I/O

For fine control:

```java
try (BufferedReader r = Files.newBufferedReader(p, UTF_8);
     BufferedWriter w = Files.newBufferedWriter(out, UTF_8)) {
    String line;
    while ((line = r.readLine()) != null) {
        w.write(line.toUpperCase());
        w.newLine();
    }
}
```

### Copy, move, delete

```java
Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING);
Files.move(src, dst, StandardCopyOption.ATOMIC_MOVE);
Files.delete(p);
Files.deleteIfExists(p);
```

### Creating directories

```java
Files.createDirectory(dir);
Files.createDirectories(deep);   // recursive
```

### Walk: recursive visit

```java
try (Stream<Path> s = Files.walk(root)) {
    s.filter(Files::isRegularFile)
     .filter(p -> p.toString().endsWith(".java"))
     .forEach(System.out::println);
}
```

Or `Files.find(root, depth, BiPredicate)` for name+attribute filters.

### Watching

```java
WatchService ws = FileSystems.getDefault().newWatchService();
dir.register(ws, StandardWatchEventKinds.ENTRY_MODIFY,
                 StandardWatchEventKinds.ENTRY_CREATE,
                 StandardWatchEventKinds.ENTRY_DELETE);

while (true) {
    WatchKey key = ws.take();
    for (WatchEvent<?> e : key.pollEvents()) {
        System.out.println(e.kind() + ": " + e.context());
    }
    key.reset();
}
```

## Charset: NEVER use the default

```java
// BAD: platform-dependent
Files.readString(p);

// GOOD:
Files.readString(p, StandardCharsets.UTF_8);
```

Always specify the charset. Default on Windows ITA is `windows-1252`, on Linux `UTF-8`: guaranteed differences.

## Binary files

For large binary files use `FileChannel` with `ByteBuffer`:

```java
try (FileChannel fc = FileChannel.open(p, StandardOpenOption.READ)) {
    ByteBuffer buf = ByteBuffer.allocate(4096);
    while (fc.read(buf) != -1) {
        buf.flip();
        // consume buf
        buf.clear();
    }
}
```

For most cases `Files.readAllBytes(p)` is enough.

## `Properties`, YAML, JSON

For config:

```java
Properties props = new Properties();
try (InputStream is = Files.newInputStream(Path.of("app.properties"))) {
    props.load(is);
}
String host = props.getProperty("db.host", "localhost");
```

In Spring Boot, configuration is handled for you (YAML/properties).

For JSON: use **Jackson** (`com.fasterxml.jackson`):

```java
ObjectMapper m = new ObjectMapper();
Person p = m.readValue(Path.of("p.json").toFile(), Person.class);
String s = m.writerWithDefaultPrettyPrinter().writeValueAsString(p);
```

## Exercises

<details>
<summary>Ex 11.1 — Word count on a file</summary>

```java
try (Stream<String> lines = Files.lines(Path.of("text.txt"), UTF_8)) {
    long words = lines.flatMap(l -> Arrays.stream(l.split("\\s+")))
                      .filter(s -> !s.isBlank())
                      .count();
    System.out.println(words);
}
```

</details>

<details>
<summary>Ex 11.2 — All .log files modified in the last 24h</summary>

```java
Instant cutoff = Instant.now().minus(24, ChronoUnit.HOURS);
try (Stream<Path> s = Files.walk(root)) {
    s.filter(Files::isRegularFile)
     .filter(p -> p.toString().endsWith(".log"))
     .filter(p -> {
         try {
             return Files.getLastModifiedTime(p).toInstant().isAfter(cutoff);
         } catch (IOException e) { return false; }
     })
     .forEach(System.out::println);
}
```

</details>

<details>
<summary>Ex 11.3 — Copy with check</summary>

```java
try {
    Files.copy(src, dst);  // no REPLACE_EXISTING
} catch (FileAlreadyExistsException e) {
    System.err.println("destination exists: " + dst);
}
```

</details>

<details>
<summary>Ex 11.4 — Append to a log</summary>

```java
Files.writeString(Path.of("app.log"), "[" + LocalDateTime.now() + "] start\n",
    UTF_8, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
```

</details>

## Take-aways

- Use **NIO.2** (`Path`, `Files`). Leave `java.io.File` to legacy.
- **Always** specify the **charset** (`StandardCharsets.UTF_8`).
- `Files.lines` + `try-with-resources` for large files.
- For JSON use **Jackson**.
- `Files.walk` to explore directories recursively.

Next: concurrency (threads, synchronization, volatile).
