---
title: Arrays and strings
area: Data structures
summary: From foundations — memory, addresses, indices — to the main patterns. The most asked structures in interviews, explained from scratch.
order: 2
---

# Arrays and strings

They're **70% of interview problems**. Master this chapter deeply and you've done half the work.

Let's start from absolute basics.

## Part 1 — What an array really is

### Computer memory is a tape of cells

As seen in ch. 02, RAM memory is a huge tape of numbered cells. Each cell contains a byte (8 bits, a number from 0 to 255). Each cell has an **address**: 0, 1, 2, 3, ...

<div style="background:#161922;border:1px solid #262b3a;border-radius:8px;padding:16px;margin:14px 0;overflow-x:auto;">
<svg viewBox="0 0 480 100" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:auto;font-family:'Cascadia Code',monospace;">
  <defs>
    <style>
      .cell { fill:#1d2230; stroke:#262b3a; stroke-width:1; }
      .ct { fill:#e6e8ee; font-size:14px; font-weight:600; }
      .addr { fill:#7a8194; font-size:11px; }
      .lbl { fill:#b6bdcc; font-size:12px; font-weight:600; }
    </style>
  </defs>
  <text class="lbl" x="5" y="20">Address</text>
  <text class="lbl" x="5" y="55">Content</text>
  <g transform="translate(75, 5)">
    <text class="addr" x="20"  y="14" text-anchor="middle">0</text>
    <text class="addr" x="60"  y="14" text-anchor="middle">1</text>
    <text class="addr" x="100" y="14" text-anchor="middle">2</text>
    <text class="addr" x="140" y="14" text-anchor="middle">3</text>
    <text class="addr" x="180" y="14" text-anchor="middle">4</text>
    <text class="addr" x="220" y="14" text-anchor="middle">5</text>
    <text class="addr" x="260" y="14" text-anchor="middle">6</text>
    <text class="addr" x="320" y="14" text-anchor="middle">...</text>
    <rect class="cell" x="0"   y="22" width="40" height="40"/>
    <rect class="cell" x="40"  y="22" width="40" height="40"/>
    <rect class="cell" x="80"  y="22" width="40" height="40"/>
    <rect class="cell" x="120" y="22" width="40" height="40"/>
    <rect class="cell" x="160" y="22" width="40" height="40"/>
    <rect class="cell" x="200" y="22" width="40" height="40"/>
    <rect class="cell" x="240" y="22" width="40" height="40"/>
    <rect class="cell" x="280" y="22" width="60" height="40" stroke-dasharray="4,3"/>
    <text class="ct" x="20"  y="48" text-anchor="middle">42</text>
    <text class="ct" x="60"  y="48" text-anchor="middle">17</text>
    <text class="ct" x="100" y="48" text-anchor="middle">99</text>
    <text class="ct" x="140" y="48" text-anchor="middle">03</text>
    <text class="ct" x="180" y="48" text-anchor="middle">77</text>
    <text class="ct" x="220" y="48" text-anchor="middle">12</text>
    <text class="ct" x="260" y="48" text-anchor="middle">88</text>
    <text class="ct" x="310" y="48" text-anchor="middle">...</text>
  </g>
</svg>
</div>

### An array is a contiguous block of cells

An array is simply a **block of adjacent cells** dedicated to holding elements of the same type. If I have an array of 5 32-bit integers (4 bytes each), it lives in 20 consecutive cells.

Say the first element is at address 1000. Then:

- `arr[0]` → address 1000
- `arr[1]` → address 1004
- `arr[2]` → address 1008
- ...
- `arr[i]` → address `1000 + i × 4`

### Why `arr[i]` is O(1)

Here's the magic: to access `arr[i]` the computer does **one arithmetic operation**: computes `base + i × element_size`. Regardless of `i`. So it's O(1).

If the array is in cache, access is effectively instant (~1 ns). That's why arrays are "cache-friendly": elements close in index are close in memory → when you load one, adjacent ones load into cache too.

### What happens in Python?

In Python `list` is slightly different from C array: it contains **pointers** to objects (because Python is "duck-typed"). But the idea is the same: access to `list[i]` is O(1).

### Limits

To be O(1), the array needs to live in **a contiguous block**. Consequences:

- **Middle insert is O(n)**: to make space you must shift following elements.
- **Middle pop is O(n)**: same reason.
- **Tail append is O(1) amortized**: usually there's "trailing" space. When full, the array **reallocates** (doubles capacity) and copies all → O(n) occasionally.

```
before:    [42, 17, 99, _, _, _, _, _]   capacity 8, size 3
append 7:  [42, 17, 99, 7, _, _, _, _]   capacity 8, size 4  → O(1)
... until size reaches capacity ...
append:    reallocates to capacity 16, copies all → O(n) rare
```

On average, this is **O(1) amortized**.

## Part 2 — Strings: array of chars but immutable

In Python (and Java) a string is **an immutable array of characters**. Immutable means: **you can't modify it, only create a new one**.

```python
s = "hello"
s[0] = 'H'    # TypeError: 'str' object does not support item assignment
```

To modify it you must create a new string:

```python
s = "H" + s[1:]   # "Hello"
```

### Why immutable?

Three reasons:

1. **Safety**: a function receiving a string is certain it won't be modified "behind its back".
2. **Hashing**: strings can be dict keys (requires hashability, which requires immutability).
3. **Caching/interning**: Python can reuse the same string in multiple places (e.g. `"hello"` literal).

### The concatenation trap

```python
result = ""
for c in chars:
    result += c
```

Seems O(n). **It's O(n²)**. Because each `+=` creates a new string copying all previous characters. Iteration `i` copies `i` chars. Total: `1 + 2 + ... + n = n²/2`.

Fix: **build a list of chars, then join at the end**.

```python
parts = []
for c in chars:
    parts.append(c)
result = "".join(parts)   # O(n) total
```

This is one of the most important Python interview tricks.

## Part 3 — 2D arrays (matrices)

A 2D matrix is an "array of arrays". In Python:

```python
mat = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
mat[r][c]   # row r, column c
```

### Creating an empty n × m matrix

```python
# CORRECT:
mat = [[0] * m for _ in range(n)]
```

### Classic trap: aliasing

```python
# WRONG:
mat = [[0] * m] * n
mat[0][0] = 1
print(mat)   # All rows modified!
# [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
```

**Why?** `[[0]*m] * n` repeats `n` times **the same reference** to row `[0]*m`. Modifying a "row" modifies the only one existing.

The **list comprehension** version creates distinct objects each time.

### Visiting a matrix

```python
for r in range(len(mat)):
    for c in range(len(mat[0])):
        print(mat[r][c])
```

Complexity: O(n × m). For an n×n matrix: O(n²).

### Neighbors in a grid (4-directions)

Almost every grid problem uses this idiom:

```python
DIRS = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # up, down, left, right
for dr, dc in DIRS:
    nr, nc = r + dr, c + dc
    if 0 <= nr < R and 0 <= nc < C:
        ...
```

8-directions (including diagonals):

```python
DIRS = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]
```

## Part 4 — Essential Python operations

All to master by heart:

### Creation

```python
arr = []                 # empty
arr = [0] * n            # n zeros
arr = list(range(n))     # [0, 1, ..., n-1]
arr = [i*2 for i in range(n)]   # list comprehension
mat = [[0]*m for _ in range(n)]
```

### Slicing — Python's secret weapon

```python
arr[i:j]      # from i (inclusive) to j (exclusive). Creates COPY, O(k) with k=j-i.
arr[:k]       # first k
arr[k:]       # from k onwards
arr[::-1]     # reverse (copy)
arr[::2]      # every 2 elements
arr[1:5:2]    # from 1 to 5, step 2
```

**Beware**: slicing **copies**. For large arrays, watch memory.

### Modifications

```python
arr.append(x)        # tail, O(1) am.
arr.pop()            # removes and returns last, O(1)
arr.pop(0)           # removes and returns first, O(n) — AVOID!
arr.insert(i, x)     # O(n)
arr.remove(x)        # removes first occurrence, O(n)
arr.reverse()        # in-place, O(n)
arr.sort()           # in-place, O(n log n)
sorted(arr)          # returns sorted copy
arr.extend([1, 2])   # concatenates another list
```

### Strings

```python
s.lower(), s.upper(), s.strip(), s.title()
s.startswith("a"), s.endswith("z")
s.replace("a", "b")
s.split(",")         # split on separator
s.split()            # default: split on whitespace
",".join(list)       # concatenates with separator
s.find("sub")        # first index or -1
s.count("a")
ord('a'), chr(97)    # char ↔ ASCII code
s.isdigit(), s.isalpha(), s.isalnum()
```

## Part 5 — The 5 fundamental patterns

Now the big stuff. Almost all array problems reduce to one of these patterns.

### Pattern 1 — Two pointers

**The idea**: instead of two nested loops (O(n²)), use **two indices** that move in a coordinated way (O(n)).

When it works:

- Array is **sorted**.
- You're looking for **pairs/triplets** with target sum.
- You're looking for a **palindrome** or symmetry.

Example: "in a sorted array, find two indices whose sum is target".

```python
def two_sum_sorted(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        s = arr[l] + arr[r]
        if s == target:
            return (l, r)
        elif s < target:
            l += 1     # need a larger number → move left right
        else:
            r -= 1     # need a smaller one → move right left
    return None
```

**Why it works?** We exploit the sorting. If the sum is too small, **the only way** to increase it is to move `l` right (the other endpoint is already the max). If too large, decrease `r`. Never backward, never duplicates, always toward the center.

Complexity: **O(n)** (each iteration advances l or r by 1, total at most `n` iterations).

### Pattern 2 — Sliding window

**The idea**: keep a "window" `[l, r]` on the array, which **expands right** when it can, **contracts left** when it must.

When it works:

- **Contiguous subarray/substring** with some property.
- *"Longest / shortest / exists"* — many triggers.

Example: "longest substring with no repeated characters".

```python
def longest_unique(s):
    last_seen = {}      # char -> last index seen
    l = 0
    best = 0
    for r, c in enumerate(s):
        if c in last_seen and last_seen[c] >= l:
            l = last_seen[c] + 1  # contract left
        last_seen[c] = r
        best = max(best, r - l + 1)
    return best
```

Trace on `s = "abcabcbb"`:

```
r=0 c='a': last={a:0}, l=0, best=1     window [0,0] = "a"
r=1 c='b': last={a:0,b:1}, l=0, best=2 window [0,1] = "ab"
r=2 c='c': last={a:0,b:1,c:2}, l=0, best=3 window [0,2] = "abc"
r=3 c='a': 'a' seen at 0 ≥ l=0 → l=1.  last={a:3,b:1,c:2}, best=3
r=4 c='b': 'b' seen at 1 ≥ l=1 → l=2.  last={a:3,b:4,c:2}, best=3
r=5 c='c': 'c' seen at 2 ≥ l=2 → l=3.  best=3
r=6 c='b': 'b' seen at 4 ≥ l=3 → l=5.  best=3 (window [5,6])
r=7 c='b': 'b' seen at 6 ≥ l=5 → l=7.  best=3
```

Complexity: **O(n)**. `r` advances each `for` iteration. `l` only advances right. Total at most 2n moves.

### Pattern 3 — Prefix sum

**The idea**: precompute **cumulative sums** in an array, so range sums become O(1).

```python
def build_prefix(arr):
    pre = [0]
    for x in arr:
        pre.append(pre[-1] + x)
    return pre

# pre[i] = sum of arr[0..i-1]
# Sum of arr[i..j] (inclusive) = pre[j+1] - pre[i]
```

Example: `arr = [3, 1, 4, 1, 5, 9, 2]`, `pre = [0, 3, 4, 8, 9, 14, 23, 25]`.

Sum of `arr[2..4]` = `4 + 1 + 5 = 10`. Verify: `pre[5] - pre[2] = 14 - 4 = 10`. ✓

**When to use it**:

- You must answer many "range [i, j] sum" queries.
- You want to reduce `O(n)` per query to `O(1)` per query (cost: `O(n)` preprocessing).
- Combined with hashmap: "count subarrays with exact sum k" (see hashmap ch.).

### Pattern 4 — Hashmap-based

**The idea**: use a `dict` or `set` to remember seen info, reducing brute force `O(n²)` to `O(n)`.

Classic example: **Two Sum** (UNsorted array, find two indices with sum = target).

```python
def two_sum(arr, target):
    seen = {}   # value -> index
    for i, x in enumerate(arr):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
```

**Why it works?** For each `x`, instead of scanning the rest of the array to find the complement, we check if we've **already seen it before**. One pass, O(1) lookup.

Details in [ch. 03 — Hashmap](03-hashmap-set.html).

### Pattern 5 — Sort + scan

**The idea**: sometimes sorting first makes the problem trivial. You pay `O(n log n)` for the sort but then solve in `O(n)`.

Example: **remove duplicates** in-place.

```python
def remove_duplicates(arr):
    # Assume arr sorted
    if not arr: return 0
    w = 1   # write pointer
    for r in range(1, len(arr)):
        if arr[r] != arr[r-1]:
            arr[w] = arr[r]
            w += 1
    return w   # new length
```

In-place, O(n) time, O(1) space.

## Part 6 — The 5 traps that catch 90% of candidates

### Trap 1 — List aliasing

Already seen. `[[0]*m] * n` creates shared rows. Use list comprehension.

### Trap 2 — Modifying array during iteration

```python
# WRONG
for x in arr:
    if cond(x): arr.remove(x)   # skips elements!

# CORRECT 1: filter
arr = [x for x in arr if not cond(x)]

# CORRECT 2: iterate backwards
for i in range(len(arr) - 1, -1, -1):
    if cond(arr[i]): arr.pop(i)
```

### Trap 3 — Off-by-one

The most common bug. For every range, ask yourself:

- Is it **inclusive** or **exclusive** on the two sides?
- Does the loop go `< n` or `<= n`?
- Does the index start at 0 or 1?

Python convention: `range(a, b)` = `[a, a+1, ..., b-1]` (excluded b). `arr[i:j]` = `arr[i], ..., arr[j-1]` (excluded j).

In interview, **trace the algorithm on a small example** before declaring done.

### Trap 4 — String concatenation in loop

Already seen. `s += c` in loop = O(n²). Use `''.join(list)`.

### Trap 5 — Copy vs reference

```python
a = [1, 2, 3]
b = a
b.append(4)
print(a)   # [1, 2, 3, 4] !! Same object
```

To copy:

```python
b = a[:]        # shallow copy
b = list(a)
b = a.copy()

import copy
b = copy.deepcopy(a)   # if there are nested lists
```

## Part 7 — Golden snippets

To memorize. In interview you don't have time to re-derive them.

### In-place reverse of a range

```python
def reverse_range(arr, i, j):
    while i < j:
        arr[i], arr[j] = arr[j], arr[i]
        i += 1
        j -= 1
```

### Array rotation by k positions (3 reverses)

```python
def rotate(arr, k):
    n = len(arr)
    k %= n
    reverse_range(arr, 0, n-1)
    reverse_range(arr, 0, k-1)
    reverse_range(arr, k, n-1)
```

Example: `[1,2,3,4,5]`, `k=2`:

```
start:        [1, 2, 3, 4, 5]
reverse all:  [5, 4, 3, 2, 1]
reverse 0..1: [4, 5, 3, 2, 1]
reverse 2..4: [4, 5, 1, 2, 3]
```

✓ Rotated right by 2.

### Frequency counter

```python
from collections import Counter
freq = Counter("abracadabra")
# Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
freq.most_common(3)   # [('a',5), ('b',2), ('r',2)]
```

### Anagram check

```python
def is_anagram(a, b):
    return Counter(a) == Counter(b)
```

O(n+m). Alternative `sorted(a) == sorted(b)` is O(n log n).

### Palindrome check (with alphanumeric filter)

```python
def is_palindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True
```

Two pointers with skip of non-alphanumeric chars.

## Guided exercises

### Exercise 2.1 — Two Sum <span class="problem-tag easy">EASY</span>

Given an array `arr` and a target `t`, find two indices `i, j` with `arr[i] + arr[j] = t`. Guaranteed there is a solution.

<details><summary>Reasoning from scratch</summary>

**Brute force**: try all pairs. Two nested loops → O(n²).

```python
for i in range(n):
    for j in range(i+1, n):
        if arr[i] + arr[j] == t:
            return [i, j]
```

**Can I do better?** Yes, applying the **hashmap pattern**. For each `x` I see, I ask: "have I already seen `t - x`?". If yes, I have my pair. If no, I remember `x` for the future.

```python
def two_sum(arr, t):
    seen = {}   # value -> index
    for i, x in enumerate(arr):
        complement = t - x
        if complement in seen:
            return [seen[complement], i]
        seen[x] = i
```

**Complexity**: time O(n) (single pass, each lookup O(1)), space O(n) (hashmap can hold up to n elements).

**Lesson**: transform "find two things that combine" into "find one thing that combines with what I've already seen". It's the classic hashmap pattern.
</details>

### Exercise 2.2 — Best Time to Buy/Sell Stock <span class="problem-tag easy">EASY</span>

Array `prices`: `prices[i]` = stock price on day `i`. Buy 1 share one day and sell on a later day. Maximum profit.

<details><summary>Reasoning</summary>

**Brute force**: try all pairs (i, j) with i<j, compute `prices[j] - prices[i]`, keep the max. O(n²).

**Optimization**: what do you really need? For each day `j`, I want to know the **minimum price seen so far** (in some previous day). If I know it, the best profit selling on day `j` is `prices[j] - min_seen`.

So keep a `min_seen` variable updated as you scan.

```python
def max_profit(prices):
    min_seen = float('inf')
    best = 0
    for p in prices:
        min_seen = min(min_seen, p)
        best = max(best, p - min_seen)
    return best
```

O(n) time, O(1) space.

**Lesson**: often "min/max seen so far" is just one variable to update. No need for an array. Save space.
</details>

### Exercise 2.3 — Move Zeroes <span class="problem-tag easy">EASY</span>

Move all zeros to the end, keeping the order of other elements. In-place.

<details><summary>Reasoning</summary>

**Idea**: two pointers. A "write pointer" indicating where to write the next non-zero. A "read pointer" that scans all.

```python
def move_zeroes(arr):
    w = 0
    for r in range(len(arr)):
        if arr[r] != 0:
            arr[w], arr[r] = arr[r], arr[w]
            w += 1
```

Swap is important: instead of overwriting and then adding zeros at the end, you swap so you "gather" the zeros at the end automatically.

Trace on `[0, 1, 0, 3, 12]`:

```
r=0 arr[r]=0: skip. arr=[0,1,0,3,12], w=0
r=1 arr[r]=1: swap arr[0]<->arr[1]. arr=[1,0,0,3,12], w=1
r=2 arr[r]=0: skip. w=1
r=3 arr[r]=3: swap arr[1]<->arr[3]. arr=[1,3,0,0,12], w=2
r=4 arr[r]=12: swap arr[2]<->arr[4]. arr=[1,3,12,0,0], w=3
```

✓ Result: `[1, 3, 12, 0, 0]`.

O(n) time, O(1) space.
</details>

### Exercise 2.4 — Container With Most Water <span class="problem-tag medium">MEDIUM</span>

Array `heights`. Choose two indices `i < j`: area is `(j-i) × min(heights[i], heights[j])` (imagine two vertical bars and water between them). Find max area.

<details><summary>Reasoning (important!)</summary>

**Brute force**: all pairs. O(n²).

**Two pointers idea**: start from the two ends (`l=0, r=n-1`). You have the widest possible area. Then move pointers toward the center to "explore" other options.

Question: **which to move**?

Answer: **the one with smaller height**. Why? If you move the one with greater height:

- Width decreases.
- Min height **cannot increase** (still bound by the other bar, already smaller).

So area can only stay the same or decrease. Useless.

If you move the smaller one:

- Width decreases.
- Min height **could increase** (if you meet a taller bar).

There's hope. So always move the "low" pointer.

```python
def max_area(h):
    l, r = 0, len(h) - 1
    best = 0
    while l < r:
        area = (r - l) * min(h[l], h[r])
        best = max(best, area)
        if h[l] < h[r]:
            l += 1
        else:
            r -= 1
    return best
```

O(n).

**Lesson**: to do two pointers correctly, always **justify which pointer to move and why**. It's not mechanical.
</details>

### Exercise 2.5 — 3Sum <span class="problem-tag medium">MEDIUM</span>

Find all distinct triplets `(a, b, c)` with `a + b + c = 0`.

<details><summary>Reasoning</summary>

**Brute force**: triple loop → O(n³).

**Idea**: fix one element `arr[i]`, then the rest is "2Sum with target = -arr[i]" on the rest of the array. If you sort the array, you can do 2Sum with two pointers in O(n).

```python
def three_sum(arr):
    arr.sort()
    res = []
    n = len(arr)
    for i in range(n - 2):
        if arr[i] > 0: break   # optimization: all pos, no zero
        if i > 0 and arr[i] == arr[i-1]: continue   # skip duplicates
        l, r = i + 1, n - 1
        while l < r:
            s = arr[i] + arr[l] + arr[r]
            if s == 0:
                res.append([arr[i], arr[l], arr[r]])
                l += 1
                r -= 1
                # skip duplicates
                while l < r and arr[l] == arr[l-1]: l += 1
                while l < r and arr[r] == arr[r+1]: r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    return res
```

O(n²). Duplicate skipping is the subtle part: without it, you'd get `[-1,-1,2]` and `[-1,-1,2]` if the array has `-1` twice.

**Lesson**: fix one variable, reduce to a known sub-problem (2Sum). Sort + two pointers is the killer combo.
</details>

### Exercise 2.6 — Product Except Self <span class="problem-tag medium">MEDIUM</span>

Return `out[i] = product of all arr[j] with j ≠ i`. **Without division**, in O(n).

<details><summary>Reasoning</summary>

**Brute force**: for each `i`, product of others → O(n²).

**With division**: total product / arr[i]. O(n). But forbidden (and handle zeros).

**Trick**: `out[i] = product of elements left of i × product of elements right of i`.

Compute both in two passes.

```python
def product_except_self(arr):
    n = len(arr)
    out = [1] * n
    # First pass: out[i] = product left of i
    pre = 1
    for i in range(n):
        out[i] = pre
        pre *= arr[i]
    # Second pass: multiply by right product
    suf = 1
    for i in range(n - 1, -1, -1):
        out[i] *= suf
        suf *= arr[i]
    return out
```

Trace on `[1, 2, 3, 4]`:

```
After pass 1: out = [1, 1, 2, 6]  (prefix products)
Pass 2:
  i=3: out[3] = 6 * 1 = 6, suf = 4
  i=2: out[2] = 2 * 4 = 8, suf = 12
  i=1: out[1] = 1 * 12 = 12, suf = 24
  i=0: out[0] = 1 * 24 = 24
Result: [24, 12, 8, 6]
```

Verify: out[0] = 2·3·4 = 24 ✓, out[1] = 1·3·4 = 12 ✓, etc.

O(n) time, O(1) extra (excluding output).

**Lesson**: pre and post pass is a pattern. Memorize it, it reappears everywhere.
</details>

### Exercise 2.7 — Maximum Subarray (Kadane) <span class="problem-tag medium">MEDIUM</span>

Non-empty contiguous subarray with maximum sum.

<details><summary>Reasoning</summary>

**Brute force**: all subarrays. O(n²) (or O(n³) naively, but with prefix sum drops to O(n²)).

**Kadane idea**: for each position `i`, two possibilities:

1. **Extend** the subarray ending at `i-1`: current sum += arr[i].
2. **Restart** from `i`: current sum = arr[i].

Choose the one giving more. Track max seen.

```python
def max_subarray(arr):
    cur = best = arr[0]
    for x in arr[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best
```

Trace on `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

```
i=0 x=-2:  cur=-2, best=-2
i=1 x=1:   cur=max(1, -2+1)=1, best=1
i=2 x=-3:  cur=max(-3, 1-3)=-2, best=1
i=3 x=4:   cur=max(4, -2+4)=4, best=4
i=4 x=-1:  cur=max(-1, 4-1)=3, best=4
i=5 x=2:   cur=max(2, 3+2)=5, best=5
i=6 x=1:   cur=max(1, 5+1)=6, best=6
i=7 x=-5:  cur=max(-5, 6-5)=1, best=6
i=8 x=4:   cur=max(4, 1+4)=5, best=6
```

Result: 6 (subarray `[4, -1, 2, 1]`).

O(n), O(1).

**Lesson (most important for DP)**: Kadane is "DP in 1 variable". State `cur` represents "best subarray ending **exactly** at `i`". The `max` over all `cur` is the answer. Also called **space-optimized DP**.
</details>

### Exercise 2.8 — Longest Substring Without Repeating Characters <span class="problem-tag medium">MEDIUM</span>

<details><summary>Solution</summary>

See "longest_unique" snippet above in sliding window pattern. O(n).
</details>

### Exercise 2.9 — Group Anagrams <span class="problem-tag medium">MEDIUM</span>

Group strings that are anagrams.

<details><summary>Reasoning</summary>

**Idea**: two strings are anagrams iff they have the same "fingerprint". A canonical fingerprint is `sorted(s)`.

```python
from collections import defaultdict
def group_anagrams(strs):
    g = defaultdict(list)
    for s in strs:
        key = ''.join(sorted(s))
        g[key].append(s)
    return list(g.values())
```

Faster alternative (fixed alphabet): key = tuple of 26 counters.

O(n · k log k) with sorted; O(n · k) with counter.
</details>

### Exercise 2.10 — Longest Palindromic Substring <span class="problem-tag medium">MEDIUM</span>

Longest palindromic substring.

<details><summary>Reasoning — expand around center</summary>

**Brute force**: try all substrings, check if palindrome. O(n³).

**Idea**: every palindrome has a **center**. For each possible center, expand outward while they match.

Beware: two types of center!

- Single center (odd palindrome): e.g. "aba", center = 'b' at index 1.
- Double center (even palindrome): e.g. "abba", center between indices 1 and 2.

```python
def longest_pal(s):
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l+1:r]   # last valid indices

    best = ""
    for i in range(len(s)):
        odd = expand(i, i)
        even = expand(i, i+1)
        for cand in (odd, even):
            if len(cand) > len(best):
                best = cand
    return best
```

Each expansion is O(n), for O(n) centers → **O(n²)**.

There's also **Manacher** in O(n), but rarely asked.
</details>

### Exercise 2.11 — Trapping Rain Water <span class="problem-tag hard">HARD</span>

Array of heights, calculate how much rainwater is trapped between bars after rain.

<details><summary>Reasoning</summary>

**Key insight**: water above position `i` is bounded by `min(left_max, right_max)`. So:

```
water[i] = max(0, min(maxL[i], maxR[i]) - h[i])
```

**O(n) space version**: precompute `maxL` and `maxR` with two passes. Then a third pass computes the sum.

**O(1) space version (two pointers)**: idea is brilliant. Keep two variables `lmax` and `rmax`. Always move the pointer from the side with smaller height. Why?

If `h[l] < h[r]`, then `maxL` at `l` is already `>= h[l]`. And `maxR` at `l` is at least `h[r] > h[l]`. So min of the two `max` is `lmax`. Water above `l` is `lmax - h[l]`.

```python
def trap(h):
    l, r = 0, len(h) - 1
    lmax = rmax = 0
    water = 0
    while l < r:
        if h[l] < h[r]:
            lmax = max(lmax, h[l])
            water += lmax - h[l]
            l += 1
        else:
            rmax = max(rmax, h[r])
            water += rmax - h[r]
            r -= 1
    return water
```

O(n) time, O(1) space.

**Lesson**: "hard" problem due to non-obvious invariant. Once seen, very clean.
</details>

### Exercise 2.12 — Rotate Image <span class="problem-tag medium">MEDIUM</span>

n×n matrix. Rotate 90° clockwise, in-place.

<details><summary>Reasoning</summary>

90° rotation = **transpose** then **reverse each row**.

```python
def rotate(M):
    n = len(M)
    # In-place transpose
    for i in range(n):
        for j in range(i+1, n):
            M[i][j], M[j][i] = M[j][i], M[i][j]
    # Reverse each row
    for row in M:
        row.reverse()
```

Verify on 3×3:

| Start | | | | Transposed | | | | Reversed rows |
|--|--|--|--|--|--|--|--|--|
| 1 | 2 | 3 | → | 1 | 4 | 7 | → | 7 4 1 |
| 4 | 5 | 6 | | 2 | 5 | 8 | | 8 5 2 |
| 7 | 8 | 9 | | 3 | 6 | 9 | | 9 6 3 |

O(n²), O(1).
</details>

### Exercise 2.13 — Spiral Matrix <span class="problem-tag medium">MEDIUM</span>

Print matrix elements in spiral order.

<details><summary>Solution</summary>

```python
def spiral(M):
    res = []
    top, bot = 0, len(M) - 1
    lef, rig = 0, len(M[0]) - 1
    while top <= bot and lef <= rig:
        for j in range(lef, rig + 1): res.append(M[top][j])
        top += 1
        for i in range(top, bot + 1): res.append(M[i][rig])
        rig -= 1
        if top <= bot:
            for j in range(rig, lef - 1, -1): res.append(M[bot][j])
            bot -= 1
        if lef <= rig:
            for i in range(bot, top - 1, -1): res.append(M[i][lef])
            lef += 1
    return res
```

Four "boundary" layers. Each turn they tighten. The final `if`s avoid double-processing rows/columns in non-square matrices.
</details>

### Exercise 2.14 — Search Range in Sorted <span class="problem-tag medium">MEDIUM</span>

Sorted array, find first and last position of a target. O(log n).

<details><summary>Solution</summary>

```python
from bisect import bisect_left, bisect_right
def search_range(arr, t):
    l = bisect_left(arr, t)
    r = bisect_right(arr, t) - 1
    if l <= r and l < len(arr) and arr[l] == t:
        return [l, r]
    return [-1, -1]
```

`bisect_left(arr, t)` = first index to insert `t` keeping order = first index ≥ t. See ch. 11 binary search for details.
</details>

### Exercise 2.15 — Median of Two Sorted Arrays <span class="problem-tag hard">HARD</span>

Two sorted arrays, find median in O(log(min(n,m))).

<details><summary>Solution only (it's a famous Hard)</summary>

Idea: binary search on the shorter array, partition both in half.

```python
def find_median(a, b):
    if len(a) > len(b): a, b = b, a
    n, m = len(a), len(b)
    lo, hi = 0, n
    half = (n + m + 1) // 2
    while lo <= hi:
        i = (lo + hi) // 2
        j = half - i
        al = a[i-1] if i > 0 else float('-inf')
        ar = a[i]   if i < n else float('inf')
        bl = b[j-1] if j > 0 else float('-inf')
        br = b[j]   if j < m else float('inf')
        if al <= br and bl <= ar:
            if (n + m) % 2: return max(al, bl)
            return (max(al, bl) + min(ar, br)) / 2
        elif al > br: hi = i - 1
        else: lo = i + 1
```

Worth knowing, but asked rarely.
</details>

## Chapter summary

1. **Array** = contiguous block, O(1) access, middle insert/delete O(n), append O(1) amortized.
2. **Strings in Python are immutable** → loop concatenation is O(n²); use `''.join(list)`.
3. **Matrices**: beware aliasing `[[0]*m]*n` (wrong), use list comprehension.
4. **5 fundamental patterns**: two pointers, sliding window, prefix sum, hashmap, sort+scan.
5. **Traps**: aliasing, iteration modification, off-by-one, string concatenation, reference vs copy.

When you have mastery of this chapter, you should recognize the pattern of any array problem in < 60 seconds. Go to [ch. 03 — Hashmap](03-hashmap-set.html).
