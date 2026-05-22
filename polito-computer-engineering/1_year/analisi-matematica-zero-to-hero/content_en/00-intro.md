---
title: What is mathematical analysis
area: Preliminaries
summary: "A map of the path, the discipline, and the method. Explained for someone who has never heard of \"limit\", \"derivative\" or \"integral\" — starting from the concrete questions that gave birth to it all."
order: 0
level: beginner
prereq:
  - "Knowing how to read numbers (integers and fractions)"
  - "Willingness not to skip the 'hard' pages"
tools:
  - "Walter Rudin — *Principles of Mathematical Analysis* (the rigorous classic)"
  - "Tom Apostol — *Calculus, Vol. 1* (friendlier, historical)"
  - "Stewart — *Calculus* (popular intro)"
---

# What is mathematical analysis

## An honest disclaimer

If you're here to "pass Calculus I", it'll work — but that's just a by-product. The real point of this site is to make you **understand why** analysis is built the way it is. The difference, over five university years and the next thirty, between someone who memorizes recipes and someone who understands the discipline is enormous.

Practical promise: **every formula will be translated into plain English**, every new symbol will be explained before being used, every "easy step" will *actually* be easy (because we'll unpack it).

## What "mathematical analysis" means, in words

Mathematical analysis is the discipline that studies **how quantities change** and **how infinitely many small things add up**.

Sounds abstract? Let's reformulate with three examples everyone has met.

### Example 1 — How fast are you going *right now*?

If you drive 90 km in 1 hour, your **average speed** is 90 km/h. Easy: distance divided by time.

But if your speedometer reads 90 km/h **at this instant**, what does that mean? You haven't driven for an hour — you've driven for *one instant*, which lasts zero. The division $90 / 0$ doesn't exist.

Yet speed *right now* does exist — it's what the speedometer shows. Analysis invents the tool to define it rigorously: it's called the **derivative**. Translated to English: "the ratio of distance traveled to time elapsed, when the time elapsed becomes infinitesimally small."

### Example 2 — How big is that "curved" area?

A rectangle has area `base × height`. A triangle, `base × height / 2`. Everyone agrees.

What about the area under the curve $y = x^2$ between $x = 0$ and $x = 1$? It's not a polygon. There's no formula from elementary geometry that gives you the answer directly.

Analysis's idea is brilliant: break the "curved" area into **lots of very thin rectangular strips**, sum the strip areas, and let the strips become *infinitely* thin. The tool is called the **integral**. Translated: "sum of infinitely many tiny things."

### Example 3 — What is $1/2 + 1/4 + 1/8 + 1/16 + \dots$?

You add a half, then a quarter, then an eighth, and so on *forever*. What's the total?

Answer: **exactly 1**. Not "about 1", not "1 with some error" — exactly 1.

But what does "summing infinitely many numbers" even mean? We can't really do it, we'd be at it forever. Analysis invents a way to give a *meaning* to this infinite sum. The tool is called a **series** (or "infinite sum"). Translated: "the value that the sum of the first $n$ terms gets closer and closer to, as $n$ grows."

### The common thread: the limit

The three examples share **one thing**: there's a process "that goes on forever" and we want to say where it "ends up". This concept is called the **limit**.

The limit is the cornerstone of all analysis. Derivatives, integrals, series: they're all special cases of the limit concept applied to different objects.

> **Pill.** If at the beginning of the course you wonder "but what am I really doing?" — the answer is always the same: *a limit*. Only what's inside the limit changes.

## Why this discipline exists (60 seconds of history)

In 1665, Newton invented calculus to study the motion of planets. In the same years, Leibniz invented it independently for geometric problems. Both used the concept of "infinitely small quantity" (infinitesimal) intuitively but on shaky logical ground.

It worked for computation — no question — but mathematicians like Berkeley in 1734 objected: "What is a quantity so small that it's almost zero, but not zero? It's the ghost of a departed quantity."

For a century and a half, mathematics lived in this limbo. Then in the 1800s Cauchy, Weierstrass, Dedekind, Riemann, and Cantor *laid the foundations* — they defined rigorously *what* "limit", "continuous", and "real number" mean. What you read in this course is essentially their version (with some modern adjustments).

**Moral.** When the definitions seem *needlessly complicated* — with those "for every $\varepsilon$ there exists $\delta$" that look scary — remember that it took **150 years** to arrive at those formulations. They're complicated because they protect against paradoxes that would otherwise pop up everywhere.

## The map of the path

The course is organized into 9 thematic "blocks", each built on the previous one. No skips: every chapter actively uses the ones before it.

<div class="chart">
<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#d4af37"/>
      <stop offset="1" stop-color="#e8a04a"/>
    </linearGradient>
  </defs>
  <rect x="20" y="20" width="200" height="80" rx="6" fill="#111a30" stroke="#d4af37"/>
  <text x="120" y="55" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">PRELIMINARIES</text>
  <text x="120" y="75" text-anchor="middle" fill="#d8d3bd" font-size="11">logic · sets · induction</text>

  <rect x="260" y="20" width="200" height="80" rx="6" fill="#111a30" stroke="#6aa9d8"/>
  <text x="360" y="55" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">REAL NUMBERS</text>
  <text x="360" y="75" text-anchor="middle" fill="#d8d3bd" font-size="11">axioms · sup · completeness</text>

  <rect x="500" y="20" width="200" height="80" rx="6" fill="#111a30" stroke="#6fb38a"/>
  <text x="600" y="55" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">SEQUENCES</text>
  <text x="600" y="75" text-anchor="middle" fill="#d8d3bd" font-size="11">limits · Cauchy · BW</text>

  <rect x="20" y="120" width="200" height="80" rx="6" fill="#111a30" stroke="#e8a04a"/>
  <text x="120" y="155" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">FUNCTIONS &amp; LIMITS</text>
  <text x="120" y="175" text-anchor="middle" fill="#d8d3bd" font-size="11">elementary · ε-δ · continuity</text>

  <rect x="260" y="120" width="200" height="80" rx="6" fill="#111a30" stroke="#e8a04a"/>
  <text x="360" y="155" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">DERIVATIVES</text>
  <text x="360" y="175" text-anchor="middle" fill="#d8d3bd" font-size="11">rules · Lagrange · Taylor</text>

  <rect x="500" y="120" width="200" height="80" rx="6" fill="#111a30" stroke="#e8a04a"/>
  <text x="600" y="155" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">INTEGRALS</text>
  <text x="600" y="175" text-anchor="middle" fill="#d8d3bd" font-size="11">Riemann · FTC · improper</text>

  <rect x="20" y="220" width="200" height="80" rx="6" fill="#111a30" stroke="#9890b8"/>
  <text x="120" y="255" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">SERIES</text>
  <text x="120" y="275" text-anchor="middle" fill="#d8d3bd" font-size="11">tests · power · Fourier</text>

  <rect x="260" y="220" width="200" height="80" rx="6" fill="#111a30" stroke="#9890b8"/>
  <text x="360" y="255" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">ODEs</text>
  <text x="360" y="275" text-anchor="middle" fill="#d8d3bd" font-size="11">1st order · linear · Cauchy</text>

  <rect x="500" y="220" width="200" height="80" rx="6" fill="#111a30" stroke="#9890b8"/>
  <text x="600" y="255" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">MULTIVARIABLE</text>
  <text x="600" y="275" text-anchor="middle" fill="#d8d3bd" font-size="11">R^n · partial derivatives</text>

  <rect x="20" y="320" width="680" height="40" rx="6" fill="#111a30" stroke="#e07a8d"/>
  <text x="360" y="345" text-anchor="middle" fill="#f3eed9" font-family="Georgia" font-size="14" font-weight="700">BEYOND: LEBESGUE · BANACH · HILBERT · EXERCISES · GLOSSARY · FORMULARY</text>
</svg>
<div class="chart-caption">Map of the path. Each block is an area we'll traverse. Read in order: each block uses the previous.</div>
</div>

### What each block is for

- **Preliminaries** — the *language*. Quantifiers ($\forall$ = "for all", $\exists$ = "there exists"), sets, proofs. Without these, you can't write mathematics.
- **Real numbers** — the *ground*. What exactly is $\mathbb{R}$? Why does $\sqrt 2$ exist if the rationals "aren't enough"?
- **Sequences** — *infinite lists of numbers*. First place you meet the limit "in the flesh".
- **Functions and limits** — *graphs* (parabolas, exponentials, sine…) and how they approach a value as $x$ approaches another.
- **Derivatives** — the *instantaneous slope* of a curve. Speed, in physics.
- **Integrals** — the *area under* a curve. Distance traveled, in physics.
- **Series** — *infinite sums*. From Zeno to Fourier.
- **ODEs** — *equations involving derivatives*. They model physics, biology, economics.
- **Multivariable** — when the function depends on more than one number ($f(x, y, z)$). Preview for Calculus II.

## How every page is written

Each chapter follows this scheme:

1. **Intuition** — a sentence in plain words anyone literate can understand.
2. **Formal definition** — mathematical symbols, each one explained. No "you know what $\delta$ is, right?": we introduce it.
3. **Theorems and proofs** — step by step, *without* "it's easy to see that…". If it's easy, we unpack it.
4. **Worked examples** — at least two or three numerical examples, computed all the way by hand.
5. **Exercises** — with hidden solutions. Try them before peeking.
6. **Pitfalls** — the mistakes everyone makes, and why.
7. **One-line takeaway** — what you *really* need to remember.

## An explicit promise

- No proof that starts with "obviously" before a non-obvious step.
- Every new symbol is introduced with its *name in English* and an example.
- Every important formula is followed by a **translation into words**.
- Diagrams are high-resolution inline SVG, not unreadable screenshots.

## How long will it take

- From scratch, with discipline (1 hour a day, exercises included): **6–9 months** to the end.
- From a good high-school calculus background: **3–5 months**.
- For pre-exam crash review: jump straight to the [glossary](58-glossary-az.html) and the [formulary](59-formulary-complete.html), then come back to fill gaps.

It's not a race: analysis isn't "finished", it's internalized. You go back to a chapter with fresh eyes after digesting a later one. That's normal.

## Next step

Go to the next section — [Logic for analysis](01-logic-proofs.html) — where we meet the symbols $\forall$ and $\exists$ (the ones in the title): without them you can't even write a definition.

> **One-line philosophy.** "Analysis is the discipline that teaches you not to fear the infinite" (paraphrasing Hilbert). It will change how you think about quantities for the rest of your life.

## One-line takeaway

Mathematical analysis is the rigorous study of change and the limit — born to answer three questions: *how much does it change? how big is it? what does it tend to?*
