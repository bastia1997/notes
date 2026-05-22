---
title: Bit manipulation
area: Algorithms
summary: From binary to bit manipulation. AND/OR/XOR explained with examples, classic tricks, XOR magic, bitmask DP.
order: 15
---

# Bit manipulation

Quick but fundamental chapter. In interviews it's rarely the focus, but appears in problems like "single number", "subset enumeration", "bitmask DP". Knowing it distinguishes you.

## Part 1 — Binary number

### Digits, but in base 2

We can count in base 10: 487 = 4×100 + 8×10 + 7×1.

In base 2, digits are only 0 and 1, and "weights" are powers of 2:

`1101` (binary) = 1×8 + 1×4 + 0×2 + 1×1 = **13** (decimal).

In Python:
```python
bin(13)        # '0b1101'
int('1101', 2) # 13
0b1101         # 13 (binary literal)
```

### Bit, byte, word

- **Bit**: 0 or 1.
- **Byte**: 8 bits. Can represent 256 values (0-255 unsigned, -128..127 signed).
- **Word**: typically 32 or 64 bits. "Natural" size of the processor.

### Negative numbers: two's complement

A negative number in binary is represented with **two's complement**: invert the bits and add 1.

```
+5 (8 bit): 00000101
-5 (8 bit): 11111011   (inversion of 00000101 = 11111010, +1 = 11111011)
```

Advantage: hardware does normal addition, and `+5 + (-5) = 0`.

In Python integers are unlimited, so negative bits are "conceptually infinite". For 32-bit operations you can use masks: `x & 0xFFFFFFFF`.

## Part 2 — The operators

### AND `&`

Bit by bit: 1 if both 1, else 0.

```
0b1100
0b1010 &
------
0b1000
```

Use: **masking** bits (selecting).

### OR `|`

Bit by bit: 1 if at least one is 1.

```
0b1100
0b1010 |
------
0b1110
```

Use: **setting** bits.

### XOR `^`

Bit by bit: 1 if the two bits are **different**.

```
0b1100
0b1010 ^
------
0b0110
```

Key properties:

- `a ^ 0 = a`
- `a ^ a = 0`
- `a ^ b ^ a = b` (commutative and associative)

XOR is used for: clearing a value, swap, parity, single number.

### NOT `~`

Inverts every bit. In Python: `~a = -a - 1` (due to two's complement).

```python
~5    # -6
~(-5) # 4
```

In interview rare.

### Shift `<<` `>>`

`a << k` = shift left by k positions = `a × 2^k`.

`a >> k` = shift right = `a // 2^k`.

```python
1 << 5    # 32 (= 2^5)
8 >> 2    # 2  (= 8 // 4)
```

Very fast: single machine instruction.

## Part 3 — Tricks to memorize

### 1. Check if `x` is power of 2

```python
x > 0 and (x & (x - 1)) == 0
```

**Why?** A power of 2 in binary has **one bit set** (e.g. 8 = `1000`). `x - 1` shifts it right turning into `0111`. AND between `1000` and `0111` = 0.

### 2. Count set bits (popcount)

Three versions:

```python
# Version 1: bin string
bin(x).count('1')

# Version 2: Brian Kernighan
def count(x):
    c = 0
    while x:
        x &= x - 1   # removes last set bit
        c += 1
    return c

# Version 3: Python 3.10+
x.bit_count()
```

Brian Kernighan is genius: `x & (x-1)` removes **the lowest set bit**. So you loop once per set bit, not per total bit.

### 3. Extract the lowest set bit

```python
x & -x
```

Example: `x = 0b1100`. `-x` in two's complement (8 bit) = `0b...11110100`. AND = `0b0100`. Only the lowest bit of `x` survives.

Used in: Fenwick tree (BIT).

### 4. Set/clear/toggle/test i-th bit

```python
x | (1 << i)     # set bit i
x & ~(1 << i)    # clear bit i
x ^ (1 << i)     # toggle bit i
(x >> i) & 1     # test bit i (returns 0 or 1)
```

### 5. Check parity

```python
x & 1   # 1 if odd, 0 if even
```

### 6. Swap without temp variable

```python
a ^= b
b ^= a
a ^= b
```

"Silly" trick — don't use in real code. But interviewer asking it expects you to know.

## Part 4 — XOR magic

XOR is the favorite of interviewers for genius tricks.

### Pattern 1 — Single Number

> In an array, every element appears 2 times except one. Find the unique one.

```python
def single_number(arr):
    res = 0
    for x in arr:
        res ^= x
    return res
```

**Why it works?** XOR is commutative and associative. `a ^ a = 0`, `0 ^ x = x`. So all pairs cancel, the single remains.

### Pattern 2 — Find Missing

> Array of n distinct in `[0..n]`, find the missing.

```python
def missing(nums):
    res = len(nums)   # n
    for i, x in enumerate(nums):
        res ^= i ^ x
    return res
```

**Why?** XOR of all `0..n` with all present `nums` leaves only the missing one (because all present have their corresponding in `0..n` that cancels).

### Pattern 3 — Find Two Single Numbers

> Array where all appear 2 times except two. Find both.

XOR of everything = `a ^ b` (the two unique). Now find a bit where they differ (e.g. lowest set bit of `a^b`). Split the array into two groups (that bit is 0 or 1). XOR of each group gives one of them.

```python
def two_singles(arr):
    xor = 0
    for x in arr: xor ^= x
    diff = xor & -xor   # lowest set bit
    a = b = 0
    for x in arr:
        if x & diff: a ^= x
        else: b ^= x
    return [a, b]
```

## Part 5 — Bitmask: representing sets as integers

### The idea

An `n`-bit integer can represent a subset of `n` elements: the `i`-th bit is 1 if element `i` is in the subset.

Example: for 4 elements `{A, B, C, D}`, mask `0b1010` = `{B, D}`.

### Operations

```python
mask | (1 << i)   # add element i
mask & ~(1 << i)  # remove
(mask >> i) & 1   # is it present?
mask ^ (1 << i)   # toggle
```

### Enumerate all subsets

```python
n = len(arr)
for mask in range(1 << n):
    subset = [arr[i] for i in range(n) if (mask >> i) & 1]
    process(subset)
```

`1 << n` = `2^n`. Iterate from 0 (empty) to `2^n - 1` (full). Each mask represents a subset.

**Only for `n ≤ 20-25`**. For `n=30`, `2^30 = 10^9` iterations → too many.

### Bitmask DP

State includes a "visited" mask. Classic example: **Traveling Salesman Problem**.

```python
def tsp(dist):
    n = len(dist)
    INF = float('inf')
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0   # start from 0, visited only 0
    for mask in range(1, 1 << n):
        for u in range(n):
            if not (mask >> u) & 1: continue
            for v in range(n):
                if (mask >> v) & 1: continue
                new_mask = mask | (1 << v)
                dp[new_mask][v] = min(dp[new_mask][v], dp[mask][u] + dist[u][v])
    return min(dp[(1 << n) - 1][u] + dist[u][0] for u in range(1, n))
```

O(2^n × n^2). For n=20: ~10^9 ops. Borderline.

## Part 6 — Traps

### 1. Python infinite integers

Unlike C/Java, Python has no overflow. `1 << 100` works. To simulate 32-bit, use masks `x & 0xFFFFFFFF`.

### 2. AND vs && confusion

In Python `and` is logical (boolean), `&` is bit-by-bit. Don't confuse.

```python
1 and 2   # 2 (logical, returns last truthy)
1 & 2     # 0 (bit-by-bit, 01 & 10 = 00)
```

### 3. Operator precedence

`&`, `|`, `^` have **lower precedence** than `==`. Need parentheses.

```python
x & 1 == 0   # WRONG: x & (1 == 0) = x & False = 0
(x & 1) == 0 # CORRECT
```

### 4. Shifting huge numbers

`1 << 1000` works in Python but takes memory. In C/Java it's UB (undefined behavior). Beware if translating.

## Part 7 — Exercises

### Exercise 15.1 — Single Number <span class="problem-tag easy">EASY</span>

See Part 4.

### Exercise 15.2 — Number of 1 Bits <span class="problem-tag easy">EASY</span>

See Part 3 trick 2.

### Exercise 15.3 — Counting Bits <span class="problem-tag easy">EASY</span>

For each `i ∈ [0..n]`, count set bits.

<details><summary>Reasoning</summary>

Brilliant DP: `dp[i] = dp[i >> 1] + (i & 1)`.

Why? Number of bits of `i` is that of `i >> 1` (= `i // 2`) plus 1 if last bit of `i` is 1.

```python
def counting_bits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp
```

O(n).
</details>

### Exercise 15.4 — Missing Number <span class="problem-tag easy">EASY</span>

See Part 4 pattern 2.

### Exercise 15.5 — Reverse Bits <span class="problem-tag easy">EASY</span>

Reverse a 32-bit integer.

<details><summary>Solution</summary>

```python
def reverse_bits(x):
    res = 0
    for _ in range(32):
        res = (res << 1) | (x & 1)
        x >>= 1
    return res
```

Idea: shift result left, take last bit of x, shift x right. Repeat 32 times.
</details>

### Exercise 15.6 — Sum of Two Integers <span class="problem-tag medium">MEDIUM</span>

Sum without using `+` or `-`.

<details><summary>Reasoning</summary>

Sum without carry = XOR. Carry = AND followed by left shift.

```python
a ^ b           # sum ignoring carry
(a & b) << 1    # carry bits generated
```

Repeat until carry is 0.

In Python, with unlimited integers, you must mask to 32 bits:

```python
def sum_no_plus(a, b):
    MASK = 0xFFFFFFFF
    MAX = 0x7FFFFFFF
    while b:
        carry = (a & b) << 1
        a = (a ^ b) & MASK
        b = carry & MASK
    return a if a <= MAX else ~(a ^ MASK)
```

Complex for negatives in Python.
</details>

### Exercise 15.7 — Single Number II <span class="problem-tag medium">MEDIUM</span>

All appear 3 times except one. Find it.

<details><summary>Idea</summary>

Count bits modulo 3 at each position. The unique number's bits are "the remainder mod 3" of the sum.

```python
def single_three(arr):
    res = 0
    for i in range(32):
        bit_sum = sum((x >> i) & 1 for x in arr) % 3
        res |= bit_sum << i
    return res if res < (1 << 31) else res - (1 << 32)
```

O(32n).

A more elegant but cryptic "two-bit state" version also exists.
</details>

### Exercise 15.8 — Subsets via Bitmask <span class="problem-tag medium">MEDIUM</span>

All subsets of an array of n elements (n small).

<details><summary>Solution</summary>

```python
def subsets(arr):
    n = len(arr)
    res = []
    for mask in range(1 << n):
        sub = [arr[i] for i in range(n) if (mask >> i) & 1]
        res.append(sub)
    return res
```

`2^n` total subsets.
</details>

## Summary

1. **Bit operators**: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (shift left), `>>` (right).
2. **Memorize tricks**: `x & (x-1)` removes lowest bit, `x & -x` extracts lowest set bit, `x & 1` parity.
3. **XOR magic**: `a^a=0`, `a^0=a`. Solve "single number" with no extra space.
4. **Bitmask**: represents subsets as integers. For `n ≤ 20`.
5. **Bitmask DP**: state includes mask of "what's already used". TSP.

Bit manipulation is a "tax" to pay once: then it pays off often.
