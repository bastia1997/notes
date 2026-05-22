---
title: The 16 interview coding patterns
area: Pattern recognition
summary: The essential synthesis. For every unknown problem, in &lt; 60 seconds you must identify which of these 16 patterns it belongs to. Chapter to re-read before every interview.
order: 22
---

# The 16 coding patterns

Almost every FAANG interview problem reduces to one of these 16 patterns. **Study them deeply**. When you see a new problem, the first question isn't "how do I solve it?" but **"which pattern does it belong to?"**.

## Summary table

| # | Pattern | Problem text trigger |
|---|---|---|
| 1 | Two pointers | "sorted array", "pair/triplet with sum", palindrome |
| 2 | Sliding window | "contiguous subarray/substring", "longest/shortest with property" |
| 3 | Fast & slow pointers | linked list cycle, median, kth from end |
| 4 | Merge intervals | intervals, "overlapping", "merge"/"insert"/"non-overlapping" |
| 5 | Cyclic sort | array of [1..n] with a missing/duplicate value |
| 6 | In-place reverse linked list | LL "reverse"/"rotate" |
| 7 | BFS / Level order | shortest path on unweighted graph, trees level by level |
| 8 | DFS / Backtracking | all permutations/combinations/subsets |
| 9 | Two heaps | streaming median, scheduling |
| 10 | Subsets / power set | enumerate all subsets |
| 11 | Modified binary search | sorted array (with rotation/duplicates), "find first/last X" |
| 12 | Top K elements | "K largest/smallest/most frequent" |
| 13 | K-way merge | "merge N sorted lists/arrays", k smallest in matrix |
| 14 | Topological sort | dependencies, ordering, "prerequisites" |
| 15 | Dynamic programming | "number of ways", "max/min with choices", "exists path with sum" |
| 16 | Union-Find (DSU) | dynamic "connected components", MST, cycle in undirected |

---

## 1. Two pointers

→ see ch. 12.

**Form**: `l = 0, r = n-1` (collide) or `slow, fast` (same direction).

**Typical problems**: Two Sum II, 3Sum, Trapping Rain Water, Remove Duplicates, Container With Most Water.

## 2. Sliding window

→ see ch. 12.

**Form**: `l = 0; for r in ...; while not valid: l += 1`.

**Typical problems**: Longest Substring Without Repeating, Min Window Substring, Permutation in String, Max Sum Subarray of K.

## 3. Fast & slow pointers (Floyd)

Slow by 1, fast by 2. Cycle? Middle? Start of cycle?

**Typical problems**: Linked List Cycle, Find Duplicate Number (array as function), Happy Number, Palindrome Linked List.

```python
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow is fast: ...
```

## 4. Merge intervals

Sort by start (or end). Compare consecutive.

**Typical problems**: Merge Intervals, Insert Interval, Meeting Rooms II, Employee Free Time.

```python
intervals.sort()
res = []
for s, e in intervals:
    if res and res[-1][1] >= s:
        res[-1][1] = max(res[-1][1], e)
    else:
        res.append([s, e])
```

## 5. Cyclic sort

Array of n elements in [1..n] or [0..n-1]: each element belongs to a precise position. Put it there.

```python
i = 0
while i < n:
    j = arr[i] - 1   # correct position of arr[i]
    if arr[i] != arr[j]:
        arr[i], arr[j] = arr[j], arr[i]
    else:
        i += 1
```

**Typical problems**: Find All Missing Numbers, First Missing Positive, Find Duplicate, Set Mismatch.

## 6. In-place reverse linked list

Pattern "prev / cur / next". Memorized.

```python
prev = None; cur = head
while cur:
    nxt = cur.next
    cur.next = prev
    prev = cur; cur = nxt
return prev
```

**Typical problems**: Reverse, Reverse in K-Group, Reorder List, Swap Nodes in Pairs.

## 7. BFS / Tree Level Order

Queue + process per level.

```python
q = deque([root])
while q:
    for _ in range(len(q)):
        n = q.popleft()
        ...
        q.append(n.left); q.append(n.right)
```

**Typical problems**: Level Order, Zigzag, Right Side View, Min Depth, Rotting Oranges, Word Ladder.

## 8. DFS / Backtracking

Recursion that explores + undoes choices. → see ch. 10.

**Typical problems**: All permutations/combinations/subsets, N-Queens, Sudoku, Word Search, Letter Combinations.

## 9. Two heaps (max-heap + min-heap)

Balance two halves for median access / split balance.

**Typical problems**: Find Median from Data Stream, Sliding Window Median, IPO (heap of tasks).

## 10. Subsets / Power set

Generate all 2ⁿ subsets. Iterative or recursive. → see ch. 10.

```python
res = [[]]
for x in arr:
    res += [s + [x] for s in res]
```

## 11. Modified binary search

When you have "something sorted" but not a plain array:

- Rotated sorted array.
- Sorted matrix.
- "Smallest k such that f(k) = ok".
- "Find first/last X".

Binary search template → see ch. 11. Recognize from the phrase **"in O(log n)"** or huge input with answer "min/max X such that...".

## 12. Top K elements

Heap of size k. Min-heap for the k largest, max-heap for the k smallest.

→ see ch. 7.

## 13. K-way merge

K sorted lists/arrays. Initial heap with the first element of each.

→ see ch. 7 "Merge K sorted lists".

**Typical problems**: Merge K Sorted Lists, Kth Smallest in M Sorted Lists, Smallest Range Covering K Lists.

## 14. Topological sort

DAG, "prerequisite", "build order". Kahn (indegree) or DFS postorder reverse.

→ see ch. 8.

**Typical problems**: Course Schedule, Alien Dictionary, Sequence Reconstruction, Parallel Courses.

## 15. Dynamic programming

The huge bucket. Identify sub-pattern:

- **1D**: Fibonacci-like, House Robber, Word Break, Decode Ways.
- **2D grid**: Unique Paths, Min Path Sum.
- **Knapsack**: 0/1, unbounded.
- **LIS / LCS / Edit Distance**.
- **Intervals**: Burst Balloons, MCM, Palindrome Partitioning.
- **Bitmask** (n ≤ 20): TSP, Partition to K Equal Sum.
- **State machines with cooldown**: Stock problems II/III/IV.

→ see ch. 14.

## 16. Union-Find (DSU)

Connected components, cycle in undirected, MST.

→ see ch. 8.

**Typical problems**: Number of Connected Components, Redundant Connection, Accounts Merge, Most Stones Removed.

---

## Pattern recognition workflow in interview

When given a problem, **don't write code for 30-60 seconds**. Think:

1. What's the **input structure**? (array, list, graph, string, intervals...)
2. Is it **sorted**? Can I sort it?
3. What's the **output**? A number, a path, a boolean, a list?
4. What **constraints** are given? `n ≤ 10⁵` → O(n log n). `n ≤ 20` → bitmask / backtracking. `n ≤ 500` → O(n³) ok.
5. **Recognize the pattern**: say out loud "this seems like a sliding window problem because... ".

If the interviewer confirms or gives a hint, good. If skeptical, reconsider.

## Final cheat sheet (print and bring to your mental interview)

| When you see in text... | Pattern |
|---|---|
| **Sorted** array | two pointers / binary search |
| Contiguous **substring/subarray** | sliding window |
| LL **cycle** / **median** in LL | fast & slow |
| **Overlapping** intervals | sort + scan |
| Array of **[1..n]** | cyclic sort |
| **Reverse** LL | prev/cur/next |
| **Shortest path** unweighted | BFS |
| **All combinations** | backtracking |
| **Median** in stream | two heaps |
| **All subsets** | subsets / power set |
| "Sorted + log n" | modified binary search |
| "**K most** ..." | heap of size k |
| **Merge N** lists/arrays | k-way merge heap |
| "**Prerequisites**" | topological sort |
| "Number of ways" / "max-min with choices" | DP |
| "Connected components" / "cycle in undirected" | DSU |

Re-read this chapter **before every interview**.
