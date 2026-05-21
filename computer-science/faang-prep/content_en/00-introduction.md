---
title: Introduction and how to use this path
area: Meta
summary: Who it's for, how it's structured, mindset, common mistakes in the first days of study, and when you're truly ready to apply.
order: 0
---

# Introduction

This is a **complete path** to pass technical interviews at Big Tech companies (Google, Meta, Amazon, Apple, Netflix, Microsoft, Stripe, Uber, Airbnb, etc.). It's not a book: it's an operational manual. Everything in here is optimized to **pass the interview**, not to earn a CS degree.

## Part 1 — Who it's for

### Target profiles

- **Students / no coding interview experience**: start from chapter 01 and follow the 90-day roadmap. Time needed: ~3-4 months, 2h/day.
- **Devs with 2-5 years of experience**: you can accelerate. Time: ~2 months, 1.5h/day.
- **Seniors with recent interview experience**: use as reference. Time: ~3-4 weeks of refresh + 5+ mock interviews.

### Prerequisites

- **Ability to program** in at least one language. "Okay" is fine — you don't need to be an expert.
- **Understand variables, loops, functions, classes**. If you don't know what a class is, read a 3-hour Python tutorial first.
- **Patience**. It's a long path. Every day you improve by 1%, and at the end you crush it.

## Part 2 — What to expect from a FAANG loop

A typical loop is **4-6 hours of interviews** divided like this:

- **2-4 coding rounds** (~45 min each): 1-2 problems on data structures & algorithms.
- **1-2 system design rounds** (~45-60 min): only for mid/senior. For juniors, often replaced with OOP/design.
- **1 behavioral round** (~45 min). Amazon does 2. Meta has a specific "Jedi" round.
- **Eventual "domain"** for specialized roles (ML, infra, mobile, security).

### What they really measure

The interview doesn't evaluate "how much CS you know". It evaluates:

1. **Pattern recognition**: can you recognize the problem pattern in <60 sec?
2. **Communication**: do you talk while solving? Do you structure your thinking?
3. **Coding quality**: variable names, edge cases, complexity?
4. **Behavior**: do you collaborate? Do you recover from mistakes? Do you adapt to hints?

The difference between a hire and a no-hire is **almost always communication**, not algorithms.

## Part 3 — What this path is NOT

- **It's not random LeetCode**. Solving random problems wastes time. Here problems are organized by pattern.
- **It's not pure theory**. No Cook-Levin. Just what you need.
- **It's not a substitute for practice**. You must write code, not just read.

## Part 4 — How the material is organized

### Sections 00-15: DS&A foundations

Complexity, basic and advanced data structures, algorithms and techniques.

### Sections 16-22: interview patterns, OOP, system design

Composed between "ch. 22 — coding patterns" (essential for the loop) and the system design fundamentals.

### Sections 23-24: behavioral + mock

Interview strategy, STAR, Amazon LP, round dynamics.

### Section 25: 90-day roadmap

Day-by-day operational plan.

### Section 26: problem bank

230+ master list of problems ordered by pattern.

## Part 5 — Language

All code is in **Python**. Reasons:

1. Fastest language to write on a whiteboard/Replit.
2. All FAANGs accept it.
3. Syntax doesn't slow you down — you can focus on the problem.

If you prefer Java/C++/Go/JS, the patterns are identical. Only the syntax changes. But in FAANG interviews **Python is the recommended choice** even if you know others.

## Part 6 — Material conventions

Each chapter follows this structure:

- **Base concept**: explained from the foundations.
- **Patterns**: 3-6 typical problem schemes, each with motivation.
- **Ready snippets**: code to paste/remember.
- **Common traps**: errors to avoid.
- **Exercises**: with difficulty, hints, solutions, step-by-step reasoning.

Exercises are marked:

<span class="problem-tag easy">EASY</span> <span class="problem-tag medium">MEDIUM</span> <span class="problem-tag hard">HARD</span>

Hints and solutions are in expandable boxes. **Always try on your own first before opening**.

## Part 7 — The 3 mistakes of the first 14 days

Almost everyone makes them. Avoid them.

### Mistake 1 — Reading without writing code

> *"I read chapters 1-5, I understand everything."*

Wrong. Understanding a concept by reading is 10% of the work. 90% is the **muscle memory** of writing code under pressure. If you haven't written code every day, **you haven't studied**.

### Mistake 2 — Skipping the thinking phase

> *"I see the problem → go straight to LeetCode solutions → copy."*

Wasted training. The skill to build is **seeing a new problem and reasoning on it for 15-25 minutes**. If you give up earlier, you don't build pattern recognition.

**Rule**: for each problem, give yourself a time budget (15 min easy, 25 medium, 40 hard). If you exceed, **read only the hint**, not the full solution.

### Mistake 3 — Rushing to hard problems

> *"Easy ones are boring. I'll go straight to hard."*

Anti-pattern. Hards are **5%** of the loop. Easy/medium are **95%**. And hards are solved by **combining** patterns from easy/medium.

**Rule**: 50 easy + 75 medium before touching hard. When you see patterns in 30 seconds on mediums, then hard.

## Part 8 — Mindset

Three non-negotiable rules.

### 1. TTY: Think → Talk → You

In interview: first **talk**, then **think**, then **write**. Exposing your reasoning out loud is 50% of the round.

### 2. Patterns > memory

Don't memorize 500 solutions. Memorize **16 patterns** (ch. 22) and learn to recognize them. Everything else is mechanical execution.

### 3. Clean on first try

No `x`, `aux`, `t2`. Variables with a name. Edge cases handled **before** the solution, not after. The interviewer evaluates the code like a PR review.

## Part 9 — Setup

### What you need

- **Editor**: VS Code, IntelliJ, Replit. Nothing exotic.
- **Platforms**: LeetCode (essential), Pramp/interviewing.io (mock), excalidraw (system design).
- **Timer**: every problem has a budget.
- **Physical notebook**: for behavioral and system design. Writing by hand cements memory.

### Tracking

Create a Google Sheet "FAANG log" with:

| Date | Problem | D | Time | Result | Pattern |
|---|---|---|---|---|---|
| ... | Two Sum | E | 8 min | ✓ alone | hashmap |
| ... | LRU Cache | M | 30 min | ⚠ hint | DLL+dict |

Result: ✓ alone / ⚠ with hint / ✗ solution.

End of week: redo the ⚠ and ✗.

## Part 10 — How much time it takes

Three realistic scenarios:

| Profile | Time |
|---|---|
| Student, no interview experience | **3-4 months**, 2h/day |
| Dev 2-5 years experience | **2 months**, 1.5h/day |
| Senior with recent interview experience | **3-4 weeks**, 1h/day + 5 mocks |

See [90-day Roadmap](25-roadmap-90-days.html).

## Part 11 — When you're ready to apply

Minimum checklist:

- [ ] You've solved at least **150 problems** (50 easy + 75 medium + 25 hard).
- [ ] You solve a **random medium in 25 min** without looking at hints 70% of the time.
- [ ] You can describe **3+ systems end-to-end** in 35 min.
- [ ] You have **7-10 behavioral stories** structured in STAR.
- [ ] You've done at least **5 mock interviews** with real people.
- [ ] You know the 16 coding patterns **by heart**.

If all checked: **apply**. Don't wait to feel "completely ready" — that moment never comes.

## Part 12 — How to approach a chapter

For each chapter:

1. **Read all the theory** in one session.
2. **Mentally retry** the patterns (close the book).
3. **Solve all chapter exercises**.
4. After 1 week, **return to the chapter** and redo 3 exercises.
5. After 1 month, **another revision**.

Knowledge consolidates with **spaced repetition**, not with intense reading.

## Ready?

Go to [ch. 01 — Computational complexity](01-complexity.html).
