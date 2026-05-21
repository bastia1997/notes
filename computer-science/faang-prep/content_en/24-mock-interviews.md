---
title: Mock interview and interview strategy
area: Strategy
summary: How the 45 minutes unfold, opening template, handling being stuck, how to "sell yourself" while solving, detailed mock.
order: 24
---

# Mock interview and interview strategy

Solving problems at home is one thing. Doing it with someone watching, interrupting, imposing constraints is another. This is the most important skill of the FAANG loop, and it's trained only by doing **mock interviews**.

## Part 1 — Anatomy of a 45-min coding round

| Phase | Time | What to do |
|---|---|---|
| Intro + warm-up | 2 min | Greetings, interviewer introduces themselves, you introduce yourself |
| Problem statement | 1 min | They read / paste it in the doc |
| **Clarifying questions** | 3-5 min | **YOU ask questions** |
| **Approach discussion** | 5-7 min | **YOU describe plan + complexity** |
| **Coding** | 20-25 min | Implement while talking |
| **Testing / dry-run** | 3-5 min | Walk-through with input |
| **Follow-up** | 5-10 min | Variants, optimizations |
| Your questions | 3-5 min | YOU ask interviewer |

### Rookie mistake

Jumping to "clarifying" or "approach" and running straight to coding. **Wrong**. First two phases are 30-40% of the round.

## Part 2 — Opening template

When the interviewer finishes reading the problem:

> *"Let me make sure I understand. So we have X and we need to Y. Is that right?"*

Wait for confirmation. Then:

> *"A few quick questions:*
>
> *1. What's the input size order of magnitude?*
> *2. Are there constraints on values? Negatives, duplicates, null/empty?*
> *3. Is the input sorted? Can be empty? Can be modified?*
> *4. What should I return for invalid input?*
> *5. Should I optimize for time or space?"*

Wait for answers. **Transcribe examples on the whiteboard**: makes it concrete + helps you during debug.

### Why it works

1. Demonstrates rigor.
2. Gives you time to think.
3. **Constraints reveal target complexity**. "n ≤ 10⁵" → O(n log n).
4. Reduces risk of catastrophic misunderstanding.

## Part 3 — Approach discussion

> *"OK, the strategy I see: brute force would be X, that's O(n²). I think we can do better. If I leverage Y, I can use [pattern Z]:*
>
> *- Maintain X*
> *- For each element, do Y*
> *- This gives us O(n)*
>
> *Space would be O(k) for the dict. Does this approach make sense?"*

### Key points

- **Always** mention brute force before optimization. Shows progressive reasoning.
- **Wait for feedback before writing code**. If interviewer hesitates, reconsider.
- **Declare complexity immediately**. Time and space.

### What to do if stuck on approach

1. **Verbalize the block**: *"I'm stuck on how to handle the case where..."*.
2. **Go back to examples**. Draw on whiteboard.
3. **Think of similar problems**: *"This reminds me of X. I wonder if the same pattern applies."*
4. **Ask for a hint**: *"Could you give me a small hint?"* — it's OK, but not immediately.

## Part 4 — Coding: thinking out loud

While you write, **talk**.

> *"I'm using a hashmap to store value → index. Wait, what if the array has duplicates? Let me think. ... OK, I'll store the latest index seen.*
>
> *Now I iterate through the array. For each element, I check if (target - x) is in the map..."*

### Why critical

- The interviewer doesn't read your code while you write. They hear your words.
- Prolonged silence = punishment. They think you don't know.
- Verbalizing helps you **catch bugs** earlier.

### What NOT to do

- **Code without variable names** (`x`, `t`, `aux`). Use `prev_max`, `latest_idx`.
- **Skip edge case checks** before writing.
- **Erase and rewrite** if interviewer doesn't ask.

## Part 5 — Mental test (BEFORE declaring done)

Never say *"I'm done"* without:

### 1. Dry-run on an example

Take a small example. **Step-by-step trace**:

> *"With input [1, 2, 3, 4], k=3. At step 1, i=0, x=1. seen={}. complement=2 not in seen. Add 1→0. seen={1:0}. Step 2, i=1, x=2. complement=1 in seen → return [0, 1]. ✓"*

### 2. Edge cases

- Empty input.
- Single element.
- All elements equal.
- Negatives/zero.
- Extremes (max/min int).
- Already sorted / reverse sorted.
- Duplicates.

### 3. Complexity

Announce at the end: *"Time O(n), space O(n) for the dict."*

Only at this point: *"I think this is correct. Want me to dive into edge cases more, or move to a follow-up?"*

## Part 6 — Time management

| Difficulty | Budget |
|---|---|
| Easy | 10-15 min |
| Medium | 20-30 min |
| Hard | 35-45 min |

If you exceed, it means:

- You're slow at coding (practice more typing).
- You hesitate too much in voice (practice more mock).
- Wrong approach (review).

## Part 7 — Killer mistakes (immediate point loss)

1. **Code without explanation**. Makes them think you're memorizing.
2. **Variables without names**.
3. **Off-by-one not corrected**. Shows lack of rigor.
4. **No mental test before "done"**. Interviewer tries a case, finds bug, decides you're not senior.
5. **Brute force "optimal" without mentioning naive version**. Interviewer wants progressive reasoning.
6. **Discussing only verbally without writing anything**. Open sketch + examples.
7. **Not handling edge cases** with `if not arr: return ...` at top.

## Part 8 — When you finish early

Never *"I'm done early, anything else?"*. Instead:

1. **Look for subtler edge cases**.
2. **Propose further optimizations**.
3. **Propose variants**: *"What if the input were a stream? What if it were sorted? What if we needed to support deletes?"*
4. **Discuss scaling**: *"For 10x the size, what would change?"*

## Part 9 — Mock interview: where to do them

- **Pramp**: free, peer-to-peer.
- **interviewing.io**: anonymous, with active FAANG devs (paid).
- **Meetapro / IGotAnOffer**: structured feedback (paid).
- **With friends**: even just doing problems to each other. Better than nothing.
- **Alone**: record yourself on Loom while solving. Brutal but effective.

**How many**: minimum 5, ideally 10+ before first FAANG loop.

## Part 10 — Example: full 45-min mock interview

Problem: **Top K Frequent Elements**.

```
[0:00] Interviewer: "Given an integer array nums and an integer k, return the k most frequent elements. Order doesn't matter."

[0:30] You: "Let me confirm. Input nums = [1,1,1,2,2,3], k=2 → output [1,2]?"
       Interviewer: "Yes."

[1:00] You: "Some clarifications:
            - Size of nums: 10^5? OK.
            - Range of values: -10^4 to 10^4? OK.
            - K is always valid (1 <= k <= unique count)? OK.
            - Ties? Any valid output? OK."

[2:00] You: "Brute force: count frequencies (O(n)), sort by frequency (O(u log u) where u = unique).
            Optimal with heap: O(n log k) using a min-heap of size k.
            Best: bucket sort by frequency, O(n).
            I'll start with heap, then mention bucket sort if there's time."

[Interviewer: "Sounds good."]

[4:00] You code (talking):
       """
       from collections import Counter
       import heapq

       def top_k(nums, k):
           c = Counter(nums)          # O(n)
           # min-heap of (freq, val), size k
           h = []
           for val, freq in c.items():
               if len(h) < k:
                   heapq.heappush(h, (freq, val))
               elif freq > h[0][0]:
                   heapq.heapreplace(h, (freq, val))
           return [val for freq, val in h]
       """

[10:00] You: "Let me trace with [1,1,1,2,2,3], k=2.
             c = {1:3, 2:2, 3:1}. Iterate items:
             (1,3): h=[(3,1)].
             (2,2): h=[(2,2),(3,1)] after push... wait, that's len=2, ok.
             (3,1): len(h)==2, h[0]=(2,2). 1 < 2, skip.
             Return [val for freq, val in h] = [2,1]. ✓"

[13:00] You: "Edge cases:
             - Empty array? Problem says n >= 1.
             - All same value? c={x: n}, h=[(n,x)], return [x]. ✓
             - k == unique count? Returns all values. ✓"

[15:00] You: "Complexity:
             Time: O(n) for Counter + O(u log k) for heap = O(n log k).
             Space: O(u) for Counter + O(k) for heap = O(n) worst case."

[17:00] Interviewer: "Can we do it in O(n)?"

[18:00] You: "Yes! Bucket sort by frequency. Create n+1 buckets. For each (val, freq), put val in bucket[freq]. Then iterate from bucket[n] down to bucket[1], collecting values."
       """
       def top_k_bucket(nums, k):
           c = Counter(nums)
           buckets = [[] for _ in range(len(nums) + 1)]
           for val, freq in c.items():
               buckets[freq].append(val)
           res = []
           for freq in range(len(buckets) - 1, 0, -1):
               for val in buckets[freq]:
                   res.append(val)
                   if len(res) == k: return res
       """

[24:00] Interviewer: "Great. What about scale? If nums is too large to fit in memory?"

[25:00] You: "Good question. If nums is a stream:
             - Counter still works if u (unique values) fits in memory.
             - If u is also too large: lossy counting / count-min sketch (approximate).
             - For top-K real-time: heavy hitters algorithms like SpaceSaving."

[30:00] Interviewer: "OK, that's it for coding. Any questions for me?"

[30:30] You: "3 questions:
             1. What's the most challenging engineering problem the team has tackled recently?
             2. How is success measured for this role in the first 6 months?
             3. What's the on-call rotation like?"

[40:00] Interviewer answers.

[45:00] End.
```

## Part 11 — Self-eval rubric

After every mock or solo problem, evaluate on these axes (1-5):

- [ ] **Communication**: clarity, rhythm, expression of thought.
- [ ] **Approach quality**: pattern recognition, trade-off discussion.
- [ ] **Code quality**: cleanliness, naming, edge cases.
- [ ] **Correctness**: mental test, dry-run.
- [ ] **Time management**: did you finish? Exceed?

Keep a log. See where you're weak and work there.

## Part 12 — The interview day

### Morning

- Slept 7+ hours.
- Big breakfast.
- 30 min of "warm-up" problems (easy, no new material).

### Setup

- Browser tabs open: editor, problem statement.
- Distraction block list.
- Water within reach.
- Bathroom done.

### Mindset

- The interviewer **wants** you to pass. They're not an enemy.
- Every interview is an experience that improves you.
- Even if you don't know something: *"I've never done this, but I'd reason like this..."* is a valid answer.

## Summary

1. **45 min** = 30% pre-coding, 50% coding, 20% test+follow-up.
2. **Clarifying questions** always. They're 1/3 of the value.
3. **Think out loud**. Silence = punishment.
4. **Mental test before "done"**. Dry-run + edge cases + complexity.
5. **When stuck**: verbalize, go back to examples, ask for hint only if not advancing.
6. **5-10 mocks before first loop**. Indispensable skill.

The difference between "knows how to solve" and "passes the interview" is all here.
