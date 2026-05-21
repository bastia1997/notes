---
title: Two pointers and sliding window
area: Algorithms
summary: The two patterns that turn O(n²) into O(n) on 40% of medium problems. Explained from scratch, with cell-by-cell execution trace.
order: 12
---

# Two pointers and sliding window

If you master just these two patterns, you already have tools for **40% of medium problems** on arrays and strings. Simple in idea but subtle in details.

## Part 1 — Why these patterns exist

### The fundamental problem

Many array problems seem to require trying all pairs/triples. Examples:

- "Find two elements summing to target" — seems O(n²).
- "Find the longest substring with some property" — seems O(n²) or O(n³).
- "Count subarrays with exact sum k" — seems O(n²).

Brute force scanning all combinations: O(n²) or worse.

**Two pointers** and **sliding window** are two techniques that, exploiting the **structure** of the problem, reduce to O(n) by making indices "move" in a coordinated way.

### When you "can" use them

- Two pointers works when **moving one of the pointers in a monotonic direction** is justified.
- Sliding window works when you can keep a **state** of the window and **update the state in O(1)** entering/exiting.

If you don't have this "monotonicity" or "updatable state", they're not applicable.

## Part 2 — Two pointers in depth

### Configuration 1: colliding extremes

The two pointers start from the two opposite ends and move toward the center.

<div style="background:#161922;border:1px solid #262b3a;border-radius:8px;padding:16px;margin:14px 0;overflow-x:auto;">
<svg viewBox="0 0 380 100" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:auto;font-family:'Cascadia Code',monospace;">
  <defs>
    <style>
      .cell { fill:#1d2230; stroke:#262b3a; stroke-width:1; }
      .cell-l { fill:#6cf3; stroke:#6cf; stroke-width:2; }
      .cell-r { fill:#ff79c63; stroke:#ff79c6; stroke-width:2; }
      .ct { fill:#e6e8ee; font-size:14px; font-weight:600; }
    </style>
  </defs>
  <g transform="translate(15, 30)">
    <rect class="cell-l" x="0" y="0" width="40" height="40"/>
    <rect class="cell" x="40" y="0" width="40" height="40"/>
    <rect class="cell" x="80" y="0" width="40" height="40"/>
    <rect class="cell" x="120" y="0" width="40" height="40"/>
    <rect class="cell" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <rect class="cell" x="280" y="0" width="40" height="40"/>
    <rect class="cell-r" x="320" y="0" width="40" height="40"/>
    <text class="ct" x="20" y="25" text-anchor="middle">a</text>
    <text class="ct" x="60" y="25" text-anchor="middle">b</text>
    <text class="ct" x="100" y="25" text-anchor="middle">c</text>
    <text class="ct" x="140" y="25" text-anchor="middle">d</text>
    <text class="ct" x="180" y="25" text-anchor="middle">e</text>
    <text class="ct" x="220" y="25" text-anchor="middle">f</text>
    <text class="ct" x="260" y="25" text-anchor="middle">g</text>
    <text class="ct" x="300" y="25" text-anchor="middle">h</text>
    <text class="ct" x="340" y="25" text-anchor="middle">i</text>
    <text fill="#6cf" font-size="13" font-weight="700" x="20" y="60" text-anchor="middle">l →</text>
    <text fill="#ff79c6" font-size="13" font-weight="700" x="340" y="60" text-anchor="middle">← r</text>
  </g>
</svg>
</div>

They move while `l < r`.

**When to use it**:

- **Sorted** array.
- Pairs/triplets with target sum.
- Palindrome check.
- Container with most water.

#### Example 1: Two Sum on sorted array

```python
def two_sum_sorted(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        s = arr[l] + arr[r]
        if s == target:
            return [l, r]
        elif s < target:
            l += 1     # small sum → increase left (toward higher values)
        else:
            r -= 1     # large sum → decrease right
```

**Why does it work?** We exploit the sorting. If `s < target`, we know the only way to increase is to move `l` right (`r` is already the max). Never backward, never duplicates. Each iteration advances a pointer → at most `n` iterations → O(n).

#### Example 2: Container With Most Water

`arr[i]` = height of bar `i`. Choose `i < j`: area is `(j-i) × min(arr[i], arr[j])`. Max area.

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

**Why move the "low" pointer?** If I move the high one:

- Width decreases.
- Min height remains bounded by the low pointer (so at most equal).

→ Area can only decrease. Useless.

If I move the low one:

- Width decreases.
- Min height **might** increase (if I meet a taller bar).

→ There's hope.

**Lesson**: analyzing "which pointer to move and why" is the heart of two pointers. Always justify.

### Configuration 2: same direction (slow/fast)

Both pointers start from left and advance. `slow` "writes", `fast` "explores".

<div style="background:#161922;border:1px solid #262b3a;border-radius:8px;padding:16px;margin:14px 0;overflow-x:auto;">
<svg viewBox="0 0 360 90" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:auto;font-family:'Cascadia Code',monospace;">
  <defs>
    <style>
      .cell { fill:#1d2230; stroke:#262b3a; stroke-width:1; }
      .cell-slow { fill:#50fa7b33; stroke:#50fa7b; stroke-width:2; }
      .cell-fast { fill:#ffb86c33; stroke:#ffb86c; stroke-width:2; }
      .ct { fill:#e6e8ee; font-size:14px; font-weight:600; }
    </style>
  </defs>
  <g transform="translate(15, 15)">
    <rect class="cell-slow" x="0" y="0" width="40" height="40"/>
    <rect class="cell" x="40" y="0" width="40" height="40"/>
    <rect class="cell-fast" x="80" y="0" width="40" height="40"/>
    <rect class="cell" x="120" y="0" width="40" height="40"/>
    <rect class="cell" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <text class="ct" x="20" y="25" text-anchor="middle">a</text>
    <text class="ct" x="60" y="25" text-anchor="middle">b</text>
    <text class="ct" x="100" y="25" text-anchor="middle">c</text>
    <text class="ct" x="140" y="25" text-anchor="middle">d</text>
    <text class="ct" x="180" y="25" text-anchor="middle">e</text>
    <text class="ct" x="220" y="25" text-anchor="middle">f</text>
    <text class="ct" x="260" y="25" text-anchor="middle">g</text>
    <text fill="#50fa7b" font-size="12" font-weight="700" x="20" y="60" text-anchor="middle">slow</text>
    <text fill="#ffb86c" font-size="12" font-weight="700" x="100" y="60" text-anchor="middle">fast</text>
  </g>
</svg>
</div>

**When**:

- Remove duplicates in-place.
- Move zeros / partition.

#### Example: Remove Duplicates (sorted array)

```python
def remove_duplicates(arr):
    if not arr: return 0
    w = 1   # write pointer (slow)
    for r in range(1, len(arr)):
        if arr[r] != arr[r-1]:
            arr[w] = arr[r]
            w += 1
    return w   # new length
```

Trace on `[1, 1, 2, 3, 3, 4]`:

```
r=1 arr[r]=1, prev=1, equal → skip. arr=[1,1,2,3,3,4], w=1
r=2 arr[r]=2, prev=1, different → arr[1]=2, w=2. arr=[1,2,2,3,3,4]
r=3 arr[r]=3, prev=2, different → arr[2]=3, w=3. arr=[1,2,3,3,3,4]
r=4 arr[r]=3, prev=3, equal → skip.
r=5 arr[r]=4, prev=3, different → arr[3]=4, w=4. arr=[1,2,3,4,3,4]
```

Result: length 4, first 4 elements are `[1, 2, 3, 4]`. ✓

### Configuration 3: two arrays in parallel

Two indices, one for each array. Typical in merges.

```python
def merge_sorted(a, b):
    out = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i])
            i += 1
        else:
            out.append(b[j])
            j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out
```

Each iteration advances one of the two pointers → O(n + m).

## Part 3 — Sliding window in depth

### The visualized idea

A window `[l, r]` scans the array. Keep a **state** (e.g. sum, char count, dictionary).

Grow right (`r++`), update state.

If invariant violated, contract left (`l++`), update state.

<div style="background:#161922;border:1px solid #262b3a;border-radius:8px;padding:18px;margin:16px 0;overflow-x:auto;">
<svg viewBox="0 0 540 240" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:auto;font-family:'Cascadia Code',monospace;">
  <defs>
    <style>
      .cell { fill:#1d2230; stroke:#262b3a; stroke-width:1; }
      .cell-win { fill:#1d3a5c; stroke:#6cf; stroke-width:2; }
      .cell-text { fill:#e6e8ee; font-size:14px; font-weight:600; }
      .ptr { fill:#ffb86c; font-size:12px; font-weight:700; }
      .step-label { fill:#7a8194; font-size:12px; }
    </style>
  </defs>
  <text class="step-label" x="10" y="22">Step 1: window [l=1, r=3]</text>
  <g transform="translate(10, 35)">
    <rect class="cell" x="0"   y="0" width="40" height="40"/>
    <rect class="cell-win" x="40"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="80"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="120" y="0" width="40" height="40"/>
    <rect class="cell" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <text class="cell-text" x="20"  y="25" text-anchor="middle">a</text>
    <text class="cell-text" x="60"  y="25" text-anchor="middle">b</text>
    <text class="cell-text" x="100" y="25" text-anchor="middle">c</text>
    <text class="cell-text" x="140" y="25" text-anchor="middle">d</text>
    <text class="cell-text" x="180" y="25" text-anchor="middle">e</text>
    <text class="cell-text" x="220" y="25" text-anchor="middle">f</text>
    <text class="cell-text" x="260" y="25" text-anchor="middle">g</text>
    <text class="ptr" x="60"  y="60" text-anchor="middle">l</text>
    <text class="ptr" x="140" y="60" text-anchor="middle">r</text>
  </g>
  <text class="step-label" x="10" y="105">Step 2: r advances → window grows</text>
  <g transform="translate(10, 118)">
    <rect class="cell" x="0"   y="0" width="40" height="40"/>
    <rect class="cell-win" x="40"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="80"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="120" y="0" width="40" height="40"/>
    <rect class="cell-win" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <text class="cell-text" x="20"  y="25" text-anchor="middle">a</text>
    <text class="cell-text" x="60"  y="25" text-anchor="middle">b</text>
    <text class="cell-text" x="100" y="25" text-anchor="middle">c</text>
    <text class="cell-text" x="140" y="25" text-anchor="middle">d</text>
    <text class="cell-text" x="180" y="25" text-anchor="middle">e</text>
    <text class="cell-text" x="220" y="25" text-anchor="middle">f</text>
    <text class="cell-text" x="260" y="25" text-anchor="middle">g</text>
    <text class="ptr" x="60"  y="60" text-anchor="middle">l</text>
    <text class="ptr" x="180" y="60" text-anchor="middle">r</text>
  </g>
  <text class="step-label" x="10" y="188">Step 3: invariant violated → l advances, window contracts</text>
  <g transform="translate(10, 201)">
    <rect class="cell" x="0"   y="0" width="40" height="40"/>
    <rect class="cell" x="40"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="80"  y="0" width="40" height="40"/>
    <rect class="cell-win" x="120" y="0" width="40" height="40"/>
    <rect class="cell-win" x="160" y="0" width="40" height="40"/>
    <rect class="cell" x="200" y="0" width="40" height="40"/>
    <rect class="cell" x="240" y="0" width="40" height="40"/>
    <text class="cell-text" x="20"  y="25" text-anchor="middle">a</text>
    <text class="cell-text" x="60"  y="25" text-anchor="middle">b</text>
    <text class="cell-text" x="100" y="25" text-anchor="middle">c</text>
    <text class="cell-text" x="140" y="25" text-anchor="middle">d</text>
    <text class="cell-text" x="180" y="25" text-anchor="middle">e</text>
    <text class="cell-text" x="220" y="25" text-anchor="middle">f</text>
    <text class="cell-text" x="260" y="25" text-anchor="middle">g</text>
    <text class="ptr" x="100" y="60" text-anchor="middle">l</text>
    <text class="ptr" x="180" y="60" text-anchor="middle">r</text>
  </g>
</svg>
</div>

### Universal template

```python
def sliding_window(arr):
    l = 0
    state = init_state()
    best = init_best()
    for r in range(len(arr)):
        # 1. INCLUDE arr[r] in window (update state)
        update_add(state, arr[r])
        # 2. While invariant violated, CONTRACT left
        while not valid(state):
            update_remove(state, arr[l])
            l += 1
        # 3. Now arr[l..r] is valid; update best
        best = improve(best, l, r, state)
    return best
```

### Complexity

**Always O(n)**. Even if it looks "while inside a for", both pointers only move right, at most `n` moves each → 2n total.

### Window types

#### Type A: fixed-size window

The window always has size `k`.

```python
def max_sum_k(arr, k):
    s = sum(arr[:k])    # initial sum
    best = s
    for r in range(k, len(arr)):
        s += arr[r] - arr[r-k]   # arr[r] enters, arr[r-k] exits
        best = max(best, s)
    return best
```

#### Type B: variable-size "longest with constraint"

Expand right. When invariant violated, contract left until valid.

Example: max length with at most k distinct characters.

```python
from collections import defaultdict
def longest_k_distinct(s, k):
    cnt = defaultdict(int)
    l = 0
    best = 0
    for r, c in enumerate(s):
        cnt[c] += 1
        while len(cnt) > k:   # invariant violated
            cnt[s[l]] -= 1
            if cnt[s[l]] == 0:
                del cnt[s[l]]
            l += 1
        best = max(best, r - l + 1)
    return best
```

#### Type C: variable-size "shortest covering"

Expand until you match everything. Then contract while you can without losing coverage.

Example: Minimum Window Substring (see below).

## Part 4 — Practical difference: two pointers vs sliding window

| Characteristic | Sliding window | Two pointers |
|---|---|---|
| Typical structure | contiguous subarray/substring | often sorted array |
| "Longest/shortest contains X" | yes | rare |
| "Pair/triple with sum" | rare | yes |
| State (Counter, set, sum) | almost always | sometimes |
| Movement | r monotonic, l monotonic | can both move |

Sliding window is a **special case** of two pointers. But useful to distinguish mentally.

## Part 5 — Guided exercises

### Exercise 12.1 — Two Sum II (sorted) <span class="problem-tag medium">MEDIUM</span>

See Part 2.

### Exercise 12.2 — Valid Palindrome <span class="problem-tag easy">EASY</span>

<details><summary>Solution</summary>

```python
def is_pal(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while l < r and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower(): return False
        l += 1; r -= 1
    return True
```

Two pointers at edges, skip non-alphanumeric.
</details>

### Exercise 12.3 — Remove Duplicates <span class="problem-tag easy">EASY</span>

See Part 2.

### Exercise 12.4 — Squares of Sorted Array <span class="problem-tag easy">EASY</span>

Sorted array (can contain negatives). Return sorted array of squares. O(n).

<details><summary>Reasoning</summary>

The square of the largest in absolute value is the **max**. Two pointers at edges: compare `|arr[l]|` and `|arr[r]|`, take the larger, position from end of result.

```python
def sorted_squares(arr):
    n = len(arr)
    res = [0] * n
    l, r = 0, n - 1
    w = n - 1
    while l <= r:
        if abs(arr[l]) > abs(arr[r]):
            res[w] = arr[l] * arr[l]
            l += 1
        else:
            res[w] = arr[r] * arr[r]
            r -= 1
        w -= 1
    return res
```

Fill from end to start. O(n).
</details>

### Exercise 12.5 — Max Average Subarray Length K <span class="problem-tag easy">EASY</span>

<details><summary>Solution</summary>

Fixed-size window:

```python
def find_max_average(arr, k):
    s = sum(arr[:k])
    best = s
    for r in range(k, len(arr)):
        s += arr[r] - arr[r-k]
        best = max(best, s)
    return best / k
```
</details>

### Exercise 12.6 — Longest Substring Without Repeating Characters <span class="problem-tag medium">MEDIUM</span>

<details><summary>Solution</summary>

```python
def longest_unique(s):
    last = {}
    l = 0; best = 0
    for r, c in enumerate(s):
        if c in last and last[c] >= l:
            l = last[c] + 1
        last[c] = r
        best = max(best, r - l + 1)
    return best
```

Sliding window. When I see a duplicate inside the window, jump `l` right after the duplicate's last position.
</details>

### Exercise 12.7 — Longest Repeating Character Replacement <span class="problem-tag medium">MEDIUM</span>

String s + integer k. You can replace at most k characters. Longest substring with all same letters.

<details><summary>Reasoning</summary>

A window is valid if `(length - max_freq_char) ≤ k`. That is: number of "replacements" needed is how many chars aren't the dominant one.

```python
def longest_repeat(s, k):
    cnt = {}
    max_f = 0
    l = 0; best = 0
    for r, c in enumerate(s):
        cnt[c] = cnt.get(c, 0) + 1
        max_f = max(max_f, cnt[c])
        if (r - l + 1) - max_f > k:
            cnt[s[l]] -= 1
            l += 1
        best = max(best, r - l + 1)
    return best
```

**Subtle**: `max_f` isn't decremented when contracting. It's OK because final `best` depends on windows where `max_f` was actually max. No need for a "precise" value, just the historical max.
</details>

### Exercise 12.8 — Permutation in String <span class="problem-tag medium">MEDIUM</span>

Does `s2` contain a permutation of `s1`?

<details><summary>Solution</summary>

Fixed-size window of length `|s1|` on `s2`, compare Counter.

```python
from collections import Counter
def check_inclusion(s1, s2):
    if len(s1) > len(s2): return False
    c1 = Counter(s1)
    c2 = Counter(s2[:len(s1)])
    if c1 == c2: return True
    for i in range(len(s1), len(s2)):
        c2[s2[i]] += 1
        c2[s2[i-len(s1)]] -= 1
        if c2[s2[i-len(s1)]] == 0:
            del c2[s2[i-len(s1)]]
        if c1 == c2: return True
    return False
```
</details>

### Exercise 12.9 — Minimum Window Substring <span class="problem-tag hard">HARD</span>

Shortest substring of `s` containing all chars of `t` (with multiplicity).

<details><summary>Reasoning</summary>

Sliding window "shortest covering":

1. `need = Counter(t)`: required chars.
2. `have`: chars currently in window.
3. `missing`: how many chars still missing to cover `t`.

Expand right: each "useful" char decrements `missing`. When `missing == 0`, valid window → try to contract.

```python
from collections import Counter
def min_window(s, t):
    need = Counter(t)
    have = {}
    missing = len(t)
    l = 0
    best = (float('inf'), 0, 0)
    for r, c in enumerate(s):
        if need.get(c, 0) > 0:
            if have.get(c, 0) < need[c]:
                missing -= 1
        have[c] = have.get(c, 0) + 1
        while missing == 0:
            if r - l + 1 < best[0]:
                best = (r - l + 1, l, r)
            have[s[l]] -= 1
            if need.get(s[l], 0) > 0 and have[s[l]] < need[s[l]]:
                missing += 1
            l += 1
    return "" if best[0] == float('inf') else s[best[1]:best[2]+1]
```

O(n+m). One of the most asked (Meta, Google).
</details>

### Exercise 12.10 — Sliding Window Maximum <span class="problem-tag hard">HARD</span>

Max in each window of length k, in total O(n).

<details><summary>Reasoning</summary>

**Brute force**: for each window, max in O(k). Total O(nk).

**Idea (monotonic deque)**: keep a **deque** of **indices** with values decreasing from the front. Head is always the window's max.

When a new element `arr[r]` enters:

- Remove from queue all indices whose values are **less** than `arr[r]` (they'll never be max again).
- Push `r`.

When window advances (`r >= k`):

- If head is outside window (`dq[0] <= r - k`), remove it.
- Output `arr[dq[0]]`.

```python
from collections import deque
def max_sliding_window(arr, k):
    dq = deque()
    res = []
    for i, x in enumerate(arr):
        while dq and arr[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(arr[dq[0]])
    return res
```

**Lesson**: the "monotonic deque" is an advanced sliding window variant. Guarantees O(n) even for problems that seem to need O(nk).
</details>

### Exercise 12.11 — Fruit Into Baskets <span class="problem-tag medium">MEDIUM</span>

Array of fruit types. You have 2 baskets (1 type per basket). Max amount collectable.

<details><summary>Solution</summary>

Reducible to "longest substring with at most 2 distinct chars". See exercise 3.9.
</details>

### Exercise 12.12 — Subarrays with K Different Integers <span class="problem-tag hard">HARD</span>

Count subarrays with exactly k distinct integers.

<details><summary>Reasoning (important)</summary>

**Problem**: "exactly k distinct" is hard directly. But:

`exactly(k) = atMost(k) - atMost(k-1)`

That is: subarrays with at most k distinct minus those with at most k-1 distinct = those with exactly k.

`atMost(k)` is classic sliding window.

```python
def subarrays_k_distinct(arr, k):
    def at_most(k):
        cnt = {}
        l = res = 0
        for r, x in enumerate(arr):
            cnt[x] = cnt.get(x, 0) + 1
            while len(cnt) > k:
                cnt[arr[l]] -= 1
                if cnt[arr[l]] == 0:
                    del cnt[arr[l]]
                l += 1
            res += r - l + 1   # all subarrays ending at r
        return res
    return at_most(k) - at_most(k - 1)
```

**Precious technique**: "exactly X" = "atMost(X) - atMost(X-1)". Reused in tons of problems.

**Why `res += r - l + 1`**? The number of valid subarrays ending at `r` is `r - l + 1` (all with left ∈ [l, r]).
</details>

## Chapter summary

1. **Two pointers**: two coordinated indices. Works if you have monotonicity/sorting.
2. **Sliding window**: window `[l, r]`. Expand right, contract left when invariant violated.
3. **Always justify "why I move this pointer"**. It's the heart of the technique.
4. **Window state**: Counter, dict, sum, set. Updatable in O(1) entering/exiting.
5. **3 window types**: fixed-size, longest, shortest covering.
6. **Advanced tricks**: monotonic deque (O(n) for max in window), "exactly = atMost(k) - atMost(k-1)".

When these two patterns come naturally to you, much of the "easy" problems become really easy.
