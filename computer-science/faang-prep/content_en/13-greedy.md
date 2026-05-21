---
title: Greedy
area: Algorithms
summary: When a locally "obvious" choice leads to global optimum. Recognizing greedy problems, the exchange argument, when to stop and switch to DP.
order: 13
---

# Greedy

Greedy is the simplest technique to write — and the most treacherous to use well. **It doesn't always work**. You must know when you can use it, and prove it (or convince yourself, in interview).

## Part 1 — The idea

A greedy algorithm makes, at each step, the **locally best choice**, hoping it leads to the global optimum.

Analogy: to reach a mountain peak, **always go uphill**. Greedy. Works if the mountain is "convex" (single peak). Doesn't work if there are intermediate valleys to cross.

### Example that WORKS — Coin change (UK)

You must give X cents in change with coins `[1, 2, 5, 10, 20, 50, 100]`. Min number of coins.

Greedy: at each step take the largest coin not exceeding X.

X = 87:
- 50 → leaves 37
- 20 → leaves 17
- 10 → leaves 7
- 5 → leaves 2
- 2 → leaves 0

5 coins. **Works**.

### Example that DOESN'T WORK — Change with weird coins

Same problem, coins `[1, 3, 4]`. X = 6.

Greedy: 4, 1, 1 → 3 coins.

Optimal: 3, 3 → **2 coins**.

Greedy made a mistake. You need DP.

### Lesson

Greedy works only if you have two properties:

1. **Greedy choice property**: global optimum can be built always making locally optimal choices.
2. **Optimal substructure**: optimum of the problem contains optima of sub-problems.

When (1) is missing, greedy fails.

## Part 2 — How you "prove" greedy in interview

No formal proof needed. Just two arguments, in order:

### Argument 1 — Examples

Try greedy on 2-3 small inputs. If it works, ok. **Look for counterexamples**: inputs where greedy fails. If you find them, discard it.

### Argument 2 — Exchange argument (informal)

Assume the optimal solution OPT doesn't make the greedy choice at some point. Show that you can "swap" OPT's choice with greedy's without worsening. If you succeed, greedy is optimal.

Classic example: **Activity Selection**.

> You have a set of activities (start, end). Max number non-overlapping.

**Greedy**: sort by `end`, take the first that starts after the end of the last taken.

**Why optimal?** Suppose OPT doesn't take the activity with min `end`. Then OPT takes some other activity `A` with end > greedy's end. Replacing A with greedy in OPT, **I don't interfere with subsequent** ones (because greedy ends first). Same number of activities, but with greedy. Iterating: the optimal solution can be rewritten using greedy. □

## Part 3 — Fundamental patterns

### Pattern 1 — Sort + scan

Sort by some metric, one pass.

**Activity Selection / Non-overlapping Intervals**:

```python
def max_non_overlap(intervals):
    intervals.sort(key=lambda x: x[1])   # sort by END!
    count = 0
    end = float('-inf')
    for s, e in intervals:
        if s >= end:
            count += 1
            end = e
    return count
```

**Why sort by end, not start?** See above. Choosing the activity that ends first leaves more room for others.

### Pattern 2 — Heap for "next best"

When "local best" changes dynamically. Heap keeps top in O(log n).

Example: Task Scheduler (ch. 07).

### Pattern 3 — Two passes

Sometimes one pass isn't enough. Pass left-to-right + pass right-to-left.

Example: **Candy distribution**. Each child has a rating. Children with rating greater than neighbors receive more candy. Min total.

```python
def candy(ratings):
    n = len(ratings)
    c = [1] * n
    # Pass left-to-right: handle left neighbors
    for i in range(1, n):
        if ratings[i] > ratings[i-1]:
            c[i] = c[i-1] + 1
    # Pass right-to-left: handle right neighbors
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i+1]:
            c[i] = max(c[i], c[i+1] + 1)
    return sum(c)
```

One pass alone isn't enough because each child has two neighbors, and one direction doesn't see the other.

### Pattern 4 — Greedy + local invariant

Maintain something that stays "true" during the scan.

Example: Jump Game.

> Array of jumps. `arr[i]` = max jump from i. Can you reach the last index?

**Greedy**: keep `reach` = max reachable index so far. For each i, if i > reach, fail. Otherwise update reach.

```python
def can_jump(nums):
    reach = 0
    for i, x in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + x)
    return True
```

O(n). Invariant: "up to `reach` all are reachable".

## Part 4 — When NOT to use greedy

Triggers of "probably DP, not greedy":

- "Number of ways..." → DP counting.
- "How many X max with budget Y" → Knapsack-like, usually DP.
- "Coin change with arbitrary coins" → DP.
- "Subset with sum X" → DP.
- "Obvious greedy gives counterexample in 3 minutes" → DP.

**Operative rule of thumb**:

- If you must "choose k out of n" and **order DOESN'T matter**: probably DP.
- If you must "order" or "min number of X" with sequential and independent choices: probably greedy.

## Part 5 — Guided exercises

### Exercise 13.1 — Jump Game <span class="problem-tag medium">MEDIUM</span>

See Part 3 pattern 4.

### Exercise 13.2 — Jump Game II <span class="problem-tag medium">MEDIUM</span>

Minimum number of jumps to reach the end.

<details><summary>Reasoning</summary>

**Implicit BFS**: each "jump" covers an interval. Find the farthest reachable point from current interval, that's the next level.

```python
def jump(nums):
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps
```

**Idea**: each "jump" extends the reachable radius. When you exhaust the current jump's radius, make a new jump to the farthest point seen so far.
</details>

### Exercise 13.3 — Gas Station <span class="problem-tag medium">MEDIUM</span>

Cycle of stations with gas[i] and cost[i]. Station to start from to complete the loop, or -1.

<details><summary>Reasoning</summary>

**Insight 1**: If sum(gas) < sum(cost), impossible.

**Insight 2**: If from `i` the reserve goes negative at point `j`, then **no station between `i` and `j`** can be the start. Why? If you started at `k` with `i ≤ k ≤ j`, you'd have a starting point with less fuel (because you didn't accumulate the surplus between `i` and `k`). So the first candidate is `j+1`.

```python
def can_complete(gas, cost):
    if sum(gas) < sum(cost): return -1
    start = 0
    tank = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1
            tank = 0
    return start
```

O(n).
</details>

### Exercise 13.4 — Non-overlapping Intervals <span class="problem-tag medium">MEDIUM</span>

Min intervals to remove to have no overlaps.

<details><summary>Solution</summary>

```python
def erase_overlap(intervals):
    intervals.sort(key=lambda x: x[1])
    end = float('-inf')
    kept = 0
    for s, e in intervals:
        if s >= end:
            kept += 1
            end = e
    return len(intervals) - kept
```

= "total - how many I can keep without overlap". Activity Selection pattern.
</details>

### Exercise 13.5 — Merge Intervals <span class="problem-tag medium">MEDIUM</span>

<details><summary>Solution</summary>

```python
def merge_intervals(intervals):
    intervals.sort()
    res = []
    for s, e in intervals:
        if res and res[-1][1] >= s:
            res[-1][1] = max(res[-1][1], e)
        else:
            res.append([s, e])
    return res
```

Sort by start. If next overlaps with last merged, extend. Otherwise, new interval.
</details>

### Exercise 13.6 — Insert Interval <span class="problem-tag medium">MEDIUM</span>

Insert `[s, e]` in sorted list, merging if necessary.

<details><summary>Solution</summary>

Three phases:

1. Copy intervals that end **before** the new one.
2. Merge those overlapping.
3. Copy the rest.

```python
def insert(intervals, new):
    res = []
    i = 0
    n = len(intervals)
    while i < n and intervals[i][1] < new[0]:
        res.append(intervals[i])
        i += 1
    while i < n and intervals[i][0] <= new[1]:
        new[0] = min(new[0], intervals[i][0])
        new[1] = max(new[1], intervals[i][1])
        i += 1
    res.append(new)
    res.extend(intervals[i:])
    return res
```

O(n).
</details>

### Exercise 13.7 — Task Scheduler <span class="problem-tag medium">MEDIUM</span>

See ch. 07.

### Exercise 13.8 — Partition Labels <span class="problem-tag medium">MEDIUM</span>

Partition string into parts such that each letter appears in at most one part.

<details><summary>Reasoning</summary>

Pre-compute **last position** of each char. Expand window until you reach the last position of all chars seen inside.

```python
def partition_labels(s):
    last = {c: i for i, c in enumerate(s)}
    res = []
    start = end = 0
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            res.append(end - start + 1)
            start = i + 1
    return res
```
</details>

### Exercise 13.9 — Hand of Straights <span class="problem-tag medium">MEDIUM</span>

Can you divide `hand` into groups of k consecutive cards?

<details><summary>Solution</summary>

```python
from collections import Counter
def is_n_straight(hand, k):
    if len(hand) % k: return False
    c = Counter(hand)
    for x in sorted(c):
        if c[x] > 0:
            n = c[x]
            for i in range(k):
                if c[x + i] < n: return False
                c[x + i] -= n
    return True
```

Greedy: start from smallest card, "consume" k consecutive starting there.
</details>

### Exercise 13.10 — Min Arrows to Burst Balloons <span class="problem-tag medium">MEDIUM</span>

<details><summary>Solution</summary>

```python
def find_min_arrows(points):
    points.sort(key=lambda p: p[1])
    arrows = 0
    end = float('-inf')
    for s, e in points:
        if s > end:
            arrows += 1
            end = e
    return arrows
```

Activity Selection pattern.
</details>

## Summary

1. **Greedy = locally optimal choice at each step**, hoping for global optimum.
2. **Works only if** the problem's structure allows. Often verified with examples/exchange argument.
3. **Main patterns**: sort + scan, "next best" heap, two passes, local invariant.
4. **When NOT works**: often DP is needed.
5. **Activity Selection pattern**: sort by **end**, not start.

When in doubt: "does greedy work here?", **build 2 counterexamples**. If it survives, use it; otherwise, DP.
