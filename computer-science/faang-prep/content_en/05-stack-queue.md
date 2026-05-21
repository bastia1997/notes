---
title: Stack and queue
area: Data structures
summary: LIFO and FIFO from scratch. Monotonic stack visualized (superpower for "next greater"), deque for O(n) sliding window.
order: 5
---

# Stack and queue

Stack and queue look simple. But one variant — the **monotonic stack** — is one of the most devastating tricks in FAANG interviews.

## Part 1 — Stack (LIFO)

### The analogy: stack of plates

Plates on a table. Natural operations:

- **Push**: add a plate on top.
- **Pop**: take the top plate.
- **Peek**: look at top without taking.

The **last** plate put is the **first** removed. **LIFO** (Last In, First Out).

### Stack in Python

Use a `list`:

```python
st = []
st.append(x)        # push, O(1) amortized
x = st.pop()        # pop, O(1)
top = st[-1]        # peek
len(st) == 0        # empty?
```

### When to use it

Stack is right when you must **remember what's still "open"** and process LIFO.

- **Bracket matching**: each open `(` goes on the stack. When `)` arrives, must match the last open.
- **Iterative DFS** (see ch. 06, 08).
- **Undo/redo**: last action undone first.
- **Postfix expression evaluation**.
- **Function call stack**: the computer itself uses a stack for function calls.
- **Monotonic stack** (the juicy part below).

### Example: balanced parentheses

```python
def valid_parens(s):
    st = []
    pair = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in '([{':
            st.append(c)
        elif c in ')]}':
            if not st or st.pop() != pair[c]:
                return False
    return not st   # at end stack must be empty
```

## Part 2 — Queue (FIFO)

### The analogy: line at the supermarket

First to queue is first served. **FIFO**.

### Implementation in Python

**Don't use `list` as queue**. `list.pop(0)` is O(n). Use `collections.deque`:

```python
from collections import deque
q = deque()
q.append(x)         # enqueue, O(1)
x = q.popleft()     # dequeue, O(1)
q.appendleft(x)     # push at head
q.pop()             # remove from end
front = q[0]; back = q[-1]
```

### When to use it

- **BFS**: already seen in trees and graphs chapters.
- **Producer/Consumer**.
- **Round-robin scheduling**.
- **Sliding window max** with monotonic deque (ch. 12).

## Part 3 — Deque (double-ended queue)

Python's `collections.deque` supports O(1) push/pop at **both ends**. Simultaneously a stack and a queue.

```python
dq = deque()
dq.append(x)        # right
dq.appendleft(x)    # left
dq.pop()            # right
dq.popleft()        # left
```

## Part 4 — Monotonic stack (the superpower)

### The motivating problem

> *"For each element of the array, find the first element to its right that is greater."*

Example: `arr = [3, 1, 2, 4]`. Result: `[4, 2, 4, -1]` (last has none larger to right).

**Brute force**: double loop → O(n²).

**Sliding window**? No, no "window".

**Monotonic stack idea**: O(n).

### The intuition

Scan the array from left. Keep a stack of **indices** whose values are **decreasing** from bottom. Bottom has largest, top has smallest (among those on stack).

When new element `arr[i]` arrives:

- If **larger** than stack top: means **`arr[i]` is "next greater element" for that top**. Pop, record result.
- Continue until stack is empty or top is ≥ arr[i].
- Then push i.

Trace on `arr = [3, 1, 2, 4]`:

```
i=0 arr[i]=3: stack empty, push 0. stack=[0] (values below: [3])
i=1 arr[i]=1: arr[stack.top]=3 ≥ 1, no pop. push 1. stack=[0,1] (values: [3,1])
i=2 arr[i]=2: arr[1]=1 < 2 → pop 1, res[1]=2. Now arr[0]=3 ≥ 2, stop. push 2. stack=[0,2] (values: [3,2])
i=3 arr[i]=4: arr[2]=2 < 4 → pop 2, res[2]=4. arr[0]=3 < 4 → pop 0, res[0]=4. stack empty. push 3. stack=[3] (values: [4])
end. Elements left in stack (3) have no next greater → res[3]=-1.
```

Result: `[4, 2, 4, -1]`. ✓

### Code

```python
def next_greater(arr):
    n = len(arr)
    res = [-1] * n
    st = []   # indices, monotonically decreasing values from bottom
    for i, x in enumerate(arr):
        while st and arr[st[-1]] < x:
            res[st.pop()] = x
        st.append(i)
    return res
```

### Why is it O(n)?

Each element enters and exits the stack **at most once**. The inner while may look "n²" but in total it does at most n pops across the entire execution. Amortized: O(n).

### Variant: next smaller

Swap `<` with `>`. Keep increasing stack.

### Variant: previous greater / smaller

Scan **right to left**.

### Pattern recognition: when to apply it

When the problem says one of these:

- "Next greater/smaller element".
- "For each element, find the first that..."
- "Stock span" (consecutive days while price was lower).
- "Daily temperatures": days until warmer.
- "Largest rectangle in histogram".

In all these cases: **monotonic stack**.

## Part 5 — Largest Rectangle in Histogram (classic hard)

Array of heights `h`. Find max area rectangle under the histogram.

### The idea with monotonic stack

For each bar, I want to know: **how far does a rectangle of height = bar's height extend**?

Extends left until you meet a shorter bar (inclusive). Same on right.

So for each bar `h[i]`:

- `left[i]` = index of first bar to left **shorter**.
- `right[i]` = index of first bar to right **shorter**.

Max area with bar `i` as "height" = `h[i] × (right[i] - left[i] - 1)`.

Compute `left` and `right` with monotonic stack.

**Elegant one-pass version**:

```python
def largest_rect(h):
    h.append(0)   # sentinel to close stack at end
    st = []       # indices, heights increasing from bottom
    best = 0
    for i, x in enumerate(h):
        while st and h[st[-1]] >= x:
            top = st.pop()
            width = i if not st else i - st[-1] - 1
            best = max(best, h[top] * width)
        st.append(i)
    h.pop()
    return best
```

O(n) time, O(n) space.

## Part 6 — Sliding Window Maximum (monotonic deque)

Max in each window of length k, in total O(n).

Already seen in ch. 12. Idea: deque of **indices** with values decreasing from the front. Head is always window's max.

```python
from collections import deque
def max_in_windows(arr, k):
    dq = deque()
    res = []
    for i, x in enumerate(arr):
        # Remove from back all values ≤ x (never max again)
        while dq and arr[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        # Remove from head if outside window
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(arr[dq[0]])
    return res
```

## Part 7 — Expression evaluation

### Postfix (Reverse Polish Notation)

`"3 4 + 5 *"` means `(3 + 4) * 5 = 35`.

```python
def eval_postfix(tokens):
    st = []
    for t in tokens:
        if t in '+-*/':
            b = st.pop(); a = st.pop()
            if t == '+': st.append(a + b)
            elif t == '-': st.append(a - b)
            elif t == '*': st.append(a * b)
            else: st.append(int(a / b))   # int() truncates toward 0
        else:
            st.append(int(t))
    return st[0]
```

### Infix (with parentheses)

Notations with parentheses (e.g. `"(2+3)*4"`) are more complex. Two stacks (operands + operators) and operator precedence rule (Dijkstra "shunting-yard" algorithm). Rare in interviews.

## Part 8 — Iterative DFS

Equivalent to recursion, but with explicit stack. Avoids stack overflow for deep trees/graphs.

```python
def dfs_iter(root, graph):
    st = [root]
    visited = set()
    while st:
        n = st.pop()
        if n in visited: continue
        visited.add(n)
        for nb in graph[n]:
            if nb not in visited:
                st.append(nb)
```

LIFO visit → "depth-first": explore a branch deeply before backtracking.

## Part 9 — Common traps

### Trap 1 — Using `list` as queue

`list.pop(0)` is O(n). Use `deque`.

### Trap 2 — Confusing stack and queue

Stack pop = last added. Queue pop = first added.

### Trap 3 — Monotonic stack: confusing `<` and `<=`

Often "next greater" vs "next greater or equal" changes a single `<` vs `<=`. Draw a small example on paper to check.

### Trap 4 — Forgetting the sentinel

In Largest Rectangle, without the appended `0`, elements left in stack at end never get popped.

## Exercises

### Exercise 5.1 — Valid Parentheses <span class="problem-tag easy">EASY</span>

<details><summary>Solution</summary>

See Part 1.
</details>

### Exercise 5.2 — Min Stack <span class="problem-tag medium">MEDIUM</span>

Stack supporting `push, pop, top, getMin` all in O(1).

<details><summary>Reasoning</summary>

Keep **two** stacks: one with values, one with current minimums.

```python
class MinStack:
    def __init__(self):
        self.st = []
        self.mins = []
    def push(self, x):
        self.st.append(x)
        if not self.mins or x <= self.mins[-1]:
            self.mins.append(x)
    def pop(self):
        x = self.st.pop()
        if x == self.mins[-1]:
            self.mins.pop()
    def top(self): return self.st[-1]
    def getMin(self): return self.mins[-1]
```

Push to min only if ≤ current min. Pop from min only if removing the min.

O(1) everything.
</details>

### Exercise 5.3 — Daily Temperatures <span class="problem-tag medium">MEDIUM</span>

For each day, how many days to wait for warmer temperature?

<details><summary>Solution</summary>

Monotonic stack of indices:

```python
def daily_temps(T):
    n = len(T)
    res = [0] * n
    st = []
    for i, t in enumerate(T):
        while st and T[st[-1]] < t:
            j = st.pop()
            res[j] = i - j
        st.append(i)
    return res
```

O(n).
</details>

### Exercise 5.4 — Evaluate RPN <span class="problem-tag medium">MEDIUM</span>

See Part 7.

### Exercise 5.5 — Sliding Window Maximum <span class="problem-tag hard">HARD</span>

See Part 6.

### Exercise 5.6 — Largest Rectangle in Histogram <span class="problem-tag hard">HARD</span>

See Part 5.

### Exercise 5.7 — Implement Queue using Stacks <span class="problem-tag easy">EASY</span>

<details><summary>Reasoning</summary>

Two stacks: `inb` for push, `outb` for pop. When `outb` empty, pour all `inb` into `outb` (reverses order → FIFO).

```python
class MyQueue:
    def __init__(self):
        self.inb = []
        self.outb = []
    def push(self, x):
        self.inb.append(x)
    def pop(self):
        self._move()
        return self.outb.pop()
    def peek(self):
        self._move()
        return self.outb[-1]
    def empty(self):
        return not self.inb and not self.outb
    def _move(self):
        if not self.outb:
            while self.inb:
                self.outb.append(self.inb.pop())
```

O(1) **amortized** for push/pop. Each element enters/exits each of the two stacks at most once.
</details>

### Exercise 5.8 — Decode String <span class="problem-tag medium">MEDIUM</span>

Decode strings like `"3[a2[c]]"` → `"accaccacc"`.

<details><summary>Solution</summary>

```python
def decode(s):
    st = []
    cur = ""
    k = 0
    for c in s:
        if c.isdigit():
            k = k * 10 + int(c)
        elif c == '[':
            st.append((cur, k))
            cur = ""
            k = 0
        elif c == ']':
            prev, n = st.pop()
            cur = prev + cur * n
        else:
            cur += c
    return cur
```

Stack of states `(partial string, multiplier)`. On `[`, save state. On `]`, repeat current string and concat to previous.
</details>

### Exercise 5.9 — Asteroid Collision <span class="problem-tag medium">MEDIUM</span>

Array of asteroids: positive = right-bound, negative = left-bound. Same speed, larger survives.

<details><summary>Solution</summary>

```python
def asteroid_collision(arr):
    st = []
    for a in arr:
        while st and a < 0 < st[-1]:
            if st[-1] < -a:
                st.pop()       # one on stack is smaller, explodes
                continue
            elif st[-1] == -a:
                st.pop()       # both explode
            break              # one on stack is larger, arriving explodes
        else:
            st.append(a)        # no collision, add
    return st
```

Python's `for ... else`: else executes **if for finishes without break**.
</details>

### Exercise 5.10 — Basic Calculator <span class="problem-tag hard">HARD</span>

Evaluate expressions with `+, -, ()` and spaces. Without `eval()`.

<details><summary>Solution</summary>

```python
def calculate(s):
    st = [1]
    sign = 1
    res = 0
    i = 0
    while i < len(s):
        c = s[i]
        if c == ' ': i += 1
        elif c == '+': sign = st[-1]; i += 1
        elif c == '-': sign = -st[-1]; i += 1
        elif c == '(': st.append(sign); i += 1
        elif c == ')': st.pop(); i += 1
        else:
            num = 0
            while i < len(s) and s[i].isdigit():
                num = num * 10 + int(s[i])
                i += 1
            res += sign * num
    return res
```

Stack of "current external sign". Very clean trick.
</details>

## Summary

1. **Stack LIFO**, **queue FIFO**. Use `list` for stack, `deque` for queue.
2. **Never `list.pop(0)`**: it's O(n). Use `deque.popleft()`.
3. **Monotonic stack**: O(n) for "next greater/smaller". Killer pattern.
4. **Largest rectangle**: monotonic stack + sentinel at end.
5. **Monotonic deque**: O(n) for "max in window".
6. **Parsing pattern**: state stack for parenthesized expressions.

Stack looks "easy", but its monotonic variants are among the most powerful techniques for hard problems.
