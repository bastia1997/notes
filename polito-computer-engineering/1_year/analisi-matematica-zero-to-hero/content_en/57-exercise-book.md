---
title: "Exercise book: exam-style problems"
area: Reference
summary: "Fifty-plus exam-style exercises with fully worked solutions, grouped by topic. Difficulty mixed from drill to harder synthesis problems typical of an Analysis I written exam."
order: 57
level: advanced
prereq:
  - "All earlier sections of the path"
  - "Comfort with KaTeX-rendered formulae"
tools:
  - "Demidovich — *Problems in Mathematical Analysis*"
  - "Spivak — *Calculus*, exercise sets"
  - "Apostol — *Calculus I*, problem sets"
  - "Marcellini-Sbordone — *Esercitazioni di Matematica*"
---

# Exercise book: exam-style problems

This is a working session. Treat each problem as a closed-book attempt: read the statement, put a watch in front of you, give yourself five to twenty minutes, only then open the solution. Reading solutions is **not** practising analysis; producing them is.

Notation is standard across the book: $\mathbb{N},\mathbb{Z},\mathbb{Q},\mathbb{R}$ for the usual number sets, $o,O$ for Landau symbols, $\sim$ for asymptotic equivalence at the indicated limit point. All logarithms are natural unless stated otherwise.

---

## A. Sequence limits (5)

### A.1 Polynomial-over-polynomial sequence

**Statement.** Compute $\displaystyle \lim_{n\to\infty}\frac{3n^3 - 2n^2 + 7}{5n^3 + n - 4}$.

<details><summary>Solution</summary>

Divide numerator and denominator by $n^3$ (the highest power on either side):

$$\frac{3 - 2/n + 7/n^3}{5 + 1/n^2 - 4/n^3} \longrightarrow \frac{3}{5}.$$

All correction terms are $O(1/n)$ and vanish. Limit: $\boxed{3/5}$.

</details>

### A.2 Root cancellation

**Statement.** Compute $\displaystyle \lim_{n\to\infty}\bigl(\sqrt{n^2+n} - n\bigr)$.

<details><summary>Solution</summary>

Indeterminate form $\infty - \infty$. Rationalise:

$$\sqrt{n^2+n}-n = \frac{(n^2+n)-n^2}{\sqrt{n^2+n}+n} = \frac{n}{\sqrt{n^2+n}+n}.$$

Factor $n$ inside the root: $\sqrt{n^2+n}=n\sqrt{1+1/n}$. So

$$\frac{n}{n\sqrt{1+1/n}+n}=\frac{1}{\sqrt{1+1/n}+1}\longrightarrow \frac{1}{2}.$$

Limit: $\boxed{1/2}$.

</details>

### A.3 Notable exponential limit

**Statement.** Compute $\displaystyle \lim_{n\to\infty}\Bigl(1+\frac{3}{n}\Bigr)^{2n}$.

<details><summary>Solution</summary>

Write $(1+3/n)^{2n} = \bigl[(1+3/n)^{n/3}\bigr]^{6}$. The bracket tends to $e$, hence the limit is $e^6$.

Alternatively, $(1+3/n)^{2n}=\exp\bigl(2n\ln(1+3/n)\bigr)$ and $2n\ln(1+3/n)\sim 2n\cdot 3/n=6$.

Limit: $\boxed{e^6}$.

</details>

### A.4 Factorial versus exponential

**Statement.** Compute $\displaystyle \lim_{n\to\infty}\frac{2^n\, n!}{n^n}$.

<details><summary>Solution</summary>

Use Stirling $n!\sim \sqrt{2\pi n}\,(n/e)^n$:

$$\frac{2^n n!}{n^n}\sim \frac{2^n \sqrt{2\pi n}\,(n/e)^n}{n^n}=\sqrt{2\pi n}\,\Bigl(\frac{2}{e}\Bigr)^n.$$

Since $2/e<1$, the geometric factor crushes the $\sqrt n$ growth and the limit is $\boxed{0}$.

</details>

### A.5 Recursive sequence

**Statement.** Let $a_1=1$ and $a_{n+1}=\sqrt{2+a_n}$. Show the sequence converges and find its limit.

<details><summary>Solution</summary>

By induction $0<a_n<2$: base $a_1=1$; step if $a_n<2$ then $a_{n+1}=\sqrt{2+a_n}<\sqrt 4=2$. Monotone increasing: $a_{n+1}^2-a_n^2 = 2+a_n-a_n^2 = -(a_n-2)(a_n+1) > 0$ for $a_n\in(0,2)$, hence $a_{n+1}>a_n$. Monotone and bounded above implies convergent, $a_n\to L\in(0,2]$. Pass to the limit in the recursion: $L=\sqrt{2+L}\Rightarrow L^2-L-2=0\Rightarrow L=2$. Limit: $\boxed{2}$.

</details>

---

## B. Function limits (5)

### B.1 Standard $0/0$ with $\sin$

**Statement.** Compute $\displaystyle \lim_{x\to 0}\frac{\sin(3x)}{\tan(5x)}$.

<details><summary>Solution</summary>

As $x\to 0$, $\sin(3x)\sim 3x$ and $\tan(5x)\sim 5x$, so the ratio is asymptotic to $3x/(5x)=3/5$. Limit $\boxed{3/5}$.

</details>

### B.2 Indeterminate $\infty^0$

**Statement.** Compute $\displaystyle \lim_{x\to +\infty} x^{1/x}$.

<details><summary>Solution</summary>

Write $x^{1/x}=\exp(\ln x / x)$. The exponent $\ln x / x \to 0$ by the growth hierarchy. Limit $\boxed{1}$.

</details>

### B.3 Right and left limit

**Statement.** Compute $\displaystyle \lim_{x\to 0^+} x\ln x$ and $\displaystyle \lim_{x\to 0^-} x\ln|x|$.

<details><summary>Solution</summary>

For $x\to 0^+$ substitute $x=e^{-t}$ with $t\to+\infty$: $x\ln x = -te^{-t}\to 0$. The right limit is $0$. For $x\to 0^-$, $|x|\to 0^+$ and $x\ln|x|=-|x|\ln|x|\to 0$ by the previous computation. Both limits $\boxed{0}$.

</details>

### B.4 Hôpital then Taylor

**Statement.** Compute $\displaystyle \lim_{x\to 0}\frac{e^x-1-x-x^2/2}{x^3}$.

<details><summary>Solution</summary>

By the Maclaurin expansion $e^x = 1+x+x^2/2+x^3/6+o(x^3)$. The numerator equals $x^3/6+o(x^3)$, so the ratio is $1/6+o(1)$. Limit $\boxed{1/6}$.

</details>

### B.5 Limit with parameter

**Statement.** Determine the value of $\alpha\in\mathbb{R}$ such that $\displaystyle \lim_{x\to 0}\frac{\ln(1+x)-x+\alpha x^2}{x^3}$ is finite and non-zero, and compute it.

<details><summary>Solution</summary>

Maclaurin: $\ln(1+x)=x-x^2/2+x^3/3+o(x^3)$. Numerator $= -x^2/2 + \alpha x^2 + x^3/3 + o(x^3) = (\alpha-1/2)x^2 + x^3/3 + o(x^3)$. For the limit to be finite we need the $x^2$ coefficient to vanish: $\alpha=1/2$. Then the ratio is $1/3 + o(1) \to 1/3$. Answer: $\alpha=1/2$, limit $\boxed{1/3}$.

</details>

---

## C. Continuity (3)

### C.1 Removable discontinuity

**Statement.** Classify the discontinuity of $f(x)=\dfrac{\sin x}{x}$ at $x=0$ and define $f(0)$ so it becomes continuous.

<details><summary>Solution</summary>

$\lim_{x\to 0}\sin x/x = 1$. The function has a **removable** discontinuity at $0$; extend with $f(0)=1$. The extension is continuous on all of $\mathbb{R}$.

</details>

### C.2 Jump discontinuity

**Statement.** Classify the discontinuity of $f(x)=\dfrac{|x|}{x}$ at $0$.

<details><summary>Solution</summary>

For $x>0$, $f(x)=1$; for $x<0$, $f(x)=-1$. Left and right limits are $-1$ and $+1$: **jump** (first-kind) discontinuity with jump amplitude $2$. Not removable.

</details>

### C.3 Intermediate value

**Statement.** Show that the equation $x^5+x-1=0$ has at least one real root in $(0,1)$.

<details><summary>Solution</summary>

$f(x)=x^5+x-1$ is continuous on $[0,1]$. $f(0)=-1<0$, $f(1)=1>0$. By the Intermediate Value Theorem there exists $\xi\in(0,1)$ with $f(\xi)=0$. (Uniqueness follows from $f'>0$, but that was not asked.)

</details>

---

## D. Derivatives (5)

### D.1 Quotient rule

**Statement.** Compute $f'(x)$ for $f(x)=\dfrac{x^2+1}{x^2-1}$ and its domain of differentiability.

<details><summary>Solution</summary>

Domain $\mathbb{R}\setminus\{\pm 1\}$. Quotient rule:

$$f'(x)=\frac{2x(x^2-1)-(x^2+1)(2x)}{(x^2-1)^2}=\frac{2x[(x^2-1)-(x^2+1)]}{(x^2-1)^2}=\frac{-4x}{(x^2-1)^2}.$$

</details>

### D.2 Chain rule and logarithm

**Statement.** Compute $\dfrac{d}{dx}\ln(\sqrt{x^2+1}+x)$.

<details><summary>Solution</summary>

Let $u=\sqrt{x^2+1}+x$. Then $u'=\dfrac{x}{\sqrt{x^2+1}}+1=\dfrac{x+\sqrt{x^2+1}}{\sqrt{x^2+1}}=\dfrac{u}{\sqrt{x^2+1}}$. Therefore

$$\frac{d}{dx}\ln u=\frac{u'}{u}=\frac{1}{\sqrt{x^2+1}}.$$

This is the well-known derivative of $\operatorname{arsinh}x$.

</details>

### D.3 Logarithmic differentiation

**Statement.** Compute $f'(x)$ for $f(x)=x^x$ ($x>0$).

<details><summary>Solution</summary>

Write $f=e^{x\ln x}$. Then $f'=e^{x\ln x}\cdot(\ln x+1)=x^x(1+\ln x)$.

</details>

### D.4 Implicit differentiation

**Statement.** Given $x^3+y^3=3xy$, compute $y'(x)$ where $y$ is locally a differentiable function of $x$.

<details><summary>Solution</summary>

Differentiate both sides: $3x^2+3y^2 y' = 3y+3xy'$. Solve: $(y^2-x)y' = y-x^2$, hence

$$y'=\frac{y-x^2}{y^2-x}\quad (y^2\ne x).$$

This is the **folium of Descartes**.

</details>

### D.5 Higher-order derivative

**Statement.** Compute $f^{(n)}(0)$ for $f(x)=\dfrac{1}{1-x}$ at $x=0$.

<details><summary>Solution</summary>

$f(x)=\sum_{k=0}^\infty x^k$, hence $f^{(n)}(x)=\sum_{k\ge n} k(k-1)\cdots(k-n+1)x^{k-n}$. At $x=0$ only $k=n$ survives: $f^{(n)}(0)=n!$.

</details>

---

## E. Curve sketching (5)

### E.1 Rational function

**Statement.** Sketch $f(x)=\dfrac{x^2}{x-1}$.

<details><summary>Solution</summary>

Domain $\mathbb{R}\setminus\{1\}$. No symmetries. $f(x)=0\iff x=0$ (double). Sign: $f>0$ for $x>1$, $f\le 0$ for $x\le 1$ except undefined at $1$.

Vertical asymptote $x=1$: $\lim_{x\to 1^\pm}f=\pm\infty$.

Oblique asymptote: divide, $f=x+1+\dfrac{1}{x-1}$, hence $y=x+1$ at both $\pm\infty$.

Derivative: $f'(x)=\dfrac{2x(x-1)-x^2}{(x-1)^2}=\dfrac{x^2-2x}{(x-1)^2}=\dfrac{x(x-2)}{(x-1)^2}$. Critical points $x=0,2$. $f'>0$ on $(-\infty,0)\cup(2,+\infty)$, $f'<0$ on $(0,1)\cup(1,2)$. Local max at $x=0$ with $f(0)=0$; local min at $x=2$ with $f(2)=4$.

Second derivative: $f''(x)=\dfrac{2}{(x-1)^3}$. Convex on $(1,+\infty)$, concave on $(-\infty,1)$.

</details>

### E.2 Logarithmic family

**Statement.** Sketch $f(x)=x\ln x$ on $(0,+\infty)$ (with $f(0)=0$ by continuous extension).

<details><summary>Solution</summary>

Domain $(0,+\infty)$, extended at $0$. $f(1)=0$, $f<0$ on $(0,1)$, $f>0$ on $(1,+\infty)$. $\lim_{x\to+\infty}f=+\infty$ (superlinear).

$f'(x)=\ln x+1$. Zero at $x=1/e$. Decreasing on $(0,1/e)$, increasing on $(1/e,+\infty)$. Global min $f(1/e)=-1/e$.

$f''=1/x>0$: convex everywhere on $(0,+\infty)$. No inflections.

Asymptotes: none oblique, $f(x)/x=\ln x\to+\infty$.

</details>

### E.3 Function with parameter

**Statement.** Discuss the number of critical points of $f(x)=x^3-3kx+1$ as a function of $k\in\mathbb{R}$.

<details><summary>Solution</summary>

$f'(x)=3x^2-3k=3(x^2-k)$. If $k<0$, $f'>0$ always, no critical points. If $k=0$, single critical point $x=0$ (an inflection with horizontal tangent). If $k>0$, two critical points $x=\pm\sqrt k$, a max at $-\sqrt k$ and a min at $+\sqrt k$.

</details>

### E.4 Even function with vertical asymptote

**Statement.** Sketch $f(x)=\dfrac{x^2}{x^2-4}$.

<details><summary>Solution</summary>

Even. Domain $\mathbb{R}\setminus\{\pm 2\}$. Zero at $0$. Sign: positive on $(-\infty,-2)\cup(2,+\infty)$, negative on $(-2,0)\cup(0,2)$ (with $f(0)=0$).

Vertical asymptotes $x=\pm 2$. Horizontal $y=1$ at both infinities.

Long division: $f=1+\dfrac{4}{x^2-4}$. Derivative $f'(x)=\dfrac{-8x}{(x^2-4)^2}$. Zero at $0$, positive on $(-\infty,-2)\cup(-2,0)$, negative on $(0,2)\cup(2,+\infty)$. Local max at $0$ with $f(0)=0$.

$f''(x)=\dfrac{8(3x^2+4)}{(x^2-4)^3}$: positive on $|x|>2$, negative on $|x|<2$.

</details>

### E.5 Exponential decay times polynomial

**Statement.** Sketch $f(x)=x^2 e^{-x}$.

<details><summary>Solution</summary>

Domain $\mathbb{R}$. $f\ge 0$, zero only at $0$. $\lim_{x\to-\infty}f=+\infty$, $\lim_{x\to+\infty}f=0$ (growth hierarchy).

$f'(x)=(2x-x^2)e^{-x}=x(2-x)e^{-x}$. Sign of $f'$ is the sign of $x(2-x)$: negative on $(-\infty,0)$, positive on $(0,2)$, negative on $(2,+\infty)$. Local min at $0$ ($f=0$), local max at $2$ ($f(2)=4/e^2$).

$f''(x)=(x^2-4x+2)e^{-x}$. Zeros at $x=2\pm\sqrt 2$: two inflection points. Horizontal asymptote $y=0$ at $+\infty$, no oblique asymptote at $-\infty$ (the function dominates).

</details>

---

## F. Indefinite integrals (8)

### F.1 Linear substitution

**Statement.** Compute $\displaystyle \int \cos(3x+1)\,dx$.

<details><summary>Solution</summary>

Substitute $u=3x+1$, $du=3\,dx$: $\int\cos u\,\dfrac{du}{3}=\dfrac{1}{3}\sin u+C=\dfrac{1}{3}\sin(3x+1)+C$.

</details>

### F.2 Power times derivative

**Statement.** Compute $\displaystyle \int x\sqrt{x^2+1}\,dx$.

<details><summary>Solution</summary>

$u=x^2+1$, $du=2x\,dx$. Integral becomes $\dfrac{1}{2}\int\sqrt u\,du = \dfrac{1}{3}u^{3/2}+C = \dfrac{1}{3}(x^2+1)^{3/2}+C$.

</details>

### F.3 Integration by parts

**Statement.** Compute $\displaystyle \int x e^x\,dx$.

<details><summary>Solution</summary>

$u=x$, $dv=e^x dx$, $du=dx$, $v=e^x$. $\int x e^x dx = xe^x - \int e^x dx = (x-1)e^x + C$.

</details>

### F.4 Repeated by parts

**Statement.** Compute $\displaystyle \int x^2\sin x\,dx$.

<details><summary>Solution</summary>

By parts twice (tabular):

$$\int x^2\sin x\,dx = -x^2\cos x + 2\int x\cos x\,dx = -x^2\cos x + 2(x\sin x + \cos x) + C.$$

Final: $(2-x^2)\cos x + 2x\sin x + C$.

</details>

### F.5 Cyclic by parts

**Statement.** Compute $\displaystyle I = \int e^x\sin x\,dx$.

<details><summary>Solution</summary>

By parts twice with $u=\sin x$ then $u=\cos x$:

$$I = e^x\sin x - \int e^x\cos x\,dx = e^x\sin x - e^x\cos x - \int e^x\sin x\,dx.$$

Hence $2I=e^x(\sin x-\cos x)$, $I=\dfrac{e^x(\sin x-\cos x)}{2}+C$.

</details>

### F.6 Partial fractions

**Statement.** Compute $\displaystyle \int\frac{1}{x^2-1}\,dx$.

<details><summary>Solution</summary>

$\dfrac{1}{x^2-1}=\dfrac{1}{2}\bigl(\dfrac{1}{x-1}-\dfrac{1}{x+1}\bigr)$. Integral: $\dfrac{1}{2}\ln\bigl|\dfrac{x-1}{x+1}\bigr|+C = \operatorname{artanh}^{-1}$ form on $|x|<1$.

</details>

### F.7 Trig substitution

**Statement.** Compute $\displaystyle \int\frac{dx}{\sqrt{1-x^2}}$.

<details><summary>Solution</summary>

Substitute $x=\sin\theta$, $dx=\cos\theta\,d\theta$, $\sqrt{1-x^2}=\cos\theta$ (for $\theta\in(-\pi/2,\pi/2)$). Integral $=\int d\theta = \theta + C = \arcsin x + C$.

</details>

### F.8 Rational with quadratic denominator

**Statement.** Compute $\displaystyle \int\frac{x+1}{x^2+4x+5}\,dx$.

<details><summary>Solution</summary>

Write $x^2+4x+5=(x+2)^2+1$. Decompose numerator: $x+1=(x+2)-1$. Hence

$$\int\frac{x+2}{(x+2)^2+1}\,dx-\int\frac{1}{(x+2)^2+1}\,dx=\frac{1}{2}\ln((x+2)^2+1)-\arctan(x+2)+C.$$

</details>

---

## G. Definite and improper integrals (5)

### G.1 Direct evaluation

**Statement.** Compute $\displaystyle \int_0^{\pi/2}\sin^2 x\,dx$.

<details><summary>Solution</summary>

Use $\sin^2 x = (1-\cos 2x)/2$:

$$\int_0^{\pi/2}\frac{1-\cos 2x}{2}\,dx = \frac{1}{2}\Bigl[x-\frac{\sin 2x}{2}\Bigr]_0^{\pi/2} = \frac{1}{2}\cdot\frac{\pi}{2} = \frac{\pi}{4}.$$

</details>

### G.2 Symmetry

**Statement.** Show that $\displaystyle \int_{-1}^{1}\frac{x^3}{1+x^4}\,dx = 0$ without antiderivative.

<details><summary>Solution</summary>

The integrand is odd ($f(-x)=-f(x)$) and the interval symmetric about $0$. By the symmetry rule the integral is $0$.

</details>

### G.3 Improper at infinity, convergent

**Statement.** Compute $\displaystyle \int_1^{+\infty}\frac{dx}{x^2}$.

<details><summary>Solution</summary>

$\int_1^R x^{-2}dx = [-1/x]_1^R = 1 - 1/R \to 1$ as $R\to+\infty$. The improper integral converges to $1$.

</details>

### G.4 Improper at endpoint

**Statement.** Compute $\displaystyle \int_0^1\frac{dx}{\sqrt x}$.

<details><summary>Solution</summary>

$\int_\varepsilon^1 x^{-1/2}dx = [2\sqrt x]_\varepsilon^1 = 2-2\sqrt\varepsilon \to 2$. The integral converges to $2$.

</details>

### G.5 Gaussian-like

**Statement.** Compute $\displaystyle \int_0^{+\infty} x e^{-x^2}\,dx$.

<details><summary>Solution</summary>

Substitute $u=x^2$, $du=2x\,dx$: $\int_0^{+\infty}\dfrac{e^{-u}}{2}du = \dfrac{1}{2}$.

</details>

---

## H. Numerical series (5)

### H.1 Telescoping

**Statement.** Compute $\displaystyle \sum_{n=1}^\infty \frac{1}{n(n+1)}$.

<details><summary>Solution</summary>

$\dfrac{1}{n(n+1)}=\dfrac{1}{n}-\dfrac{1}{n+1}$. Partial sum $s_N=1-1/(N+1)\to 1$. Sum $=\boxed{1}$.

</details>

### H.2 p-series

**Statement.** Determine the values of $p\in\mathbb{R}$ for which $\displaystyle \sum_{n=1}^\infty \frac{1}{n^p}$ converges.

<details><summary>Solution</summary>

Integral test (or condensation): converges iff $p>1$. For $p\le 1$ diverges.

</details>

### H.3 Ratio test

**Statement.** Study the convergence of $\displaystyle \sum_{n=1}^\infty \frac{n!}{n^n}$.

<details><summary>Solution</summary>

$\dfrac{a_{n+1}}{a_n}=\dfrac{(n+1)!}{(n+1)^{n+1}}\cdot\dfrac{n^n}{n!}=\dfrac{n^n}{(n+1)^n}=\Bigl(\dfrac{n}{n+1}\Bigr)^n\to 1/e<1$. By ratio test the series **converges** absolutely.

</details>

### H.4 Leibniz alternating

**Statement.** Discuss convergence and absolute convergence of $\displaystyle \sum_{n=1}^\infty \frac{(-1)^{n+1}}{n}$.

<details><summary>Solution</summary>

Conditionally convergent. $|a_n|=1/n$ gives the harmonic series, divergent: no absolute convergence. But $1/n$ is monotonically decreasing to $0$, so by Leibniz the series converges. Sum equals $\ln 2$.

</details>

### H.5 Asymptotic comparison

**Statement.** Study $\displaystyle \sum_{n=1}^\infty \sin\!\frac{1}{n^2}$.

<details><summary>Solution</summary>

As $n\to\infty$, $\sin(1/n^2)\sim 1/n^2$. Comparison with $\sum 1/n^2$ (p-series, $p=2>1$): the series converges absolutely.

</details>

---

## I. Power and Taylor series (4)

### I.1 Radius of convergence

**Statement.** Determine the radius of convergence of $\displaystyle \sum_{n=0}^\infty \frac{x^n}{n!}$.

<details><summary>Solution</summary>

By the ratio test $\bigl|\dfrac{a_{n+1}}{a_n}\bigr|=\dfrac{|x|}{n+1}\to 0$. The series converges for all $x\in\mathbb{R}$, so $R=+\infty$. (It equals $e^x$.)

</details>

### I.2 Geometric series

**Statement.** For $|x|<1$ write $\dfrac{1}{1-x}$ as a power series and compute the radius.

<details><summary>Solution</summary>

$\dfrac{1}{1-x}=\sum_{n=0}^\infty x^n$, convergent for $|x|<1$, $R=1$. Diverges at $x=\pm 1$.

</details>

### I.3 Maclaurin of arctan

**Statement.** Derive the Maclaurin expansion of $\arctan x$ via term-by-term integration.

<details><summary>Solution</summary>

$\dfrac{1}{1+t^2}=\sum_{n=0}^\infty (-1)^n t^{2n}$ for $|t|<1$. Integrate from $0$ to $x$:

$$\arctan x = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1},\quad |x|<1.$$

At $x=1$ (Abel) one recovers $\arctan 1=\pi/4 = 1-1/3+1/5-\cdots$.

</details>

### I.4 Taylor with remainder

**Statement.** Estimate $|\sin(0.1) - 0.1|$ using the Lagrange remainder.

<details><summary>Solution</summary>

Maclaurin of $\sin x$ truncated at degree $1$: $\sin x = x + R_2(x)$ with $|R_2(x)|\le |x|^3/6$ (since $|\sin^{(3)}|\le 1$). At $x=0.1$: $|R_2|\le 10^{-3}/6 \approx 1.67\cdot 10^{-4}$.

</details>

---

## J. Ordinary differential equations (5)

### J.1 Separable

**Statement.** Solve $y' = xy$ with $y(0)=2$.

<details><summary>Solution</summary>

Separate: $dy/y = x\,dx$. Integrate: $\ln|y|=x^2/2+C$, so $y=A e^{x^2/2}$. Initial condition: $A=2$. Solution $y(x)=2e^{x^2/2}$.

</details>

### J.2 First-order linear

**Statement.** Solve $y' + 2y = e^x$.

<details><summary>Solution</summary>

Integrating factor $\mu = e^{2x}$. Multiply: $(e^{2x}y)' = e^{3x}$. Integrate: $e^{2x}y = e^{3x}/3 + C$, hence $y(x) = \dfrac{e^x}{3} + C e^{-2x}$.

</details>

### J.3 Bernoulli

**Statement.** Solve $y' + y = y^2$.

<details><summary>Solution</summary>

Bernoulli with $\alpha=2$. Substitute $v=y^{-1}$: $v' = -y^{-2}y' = -y^{-2}(y^2-y) = -1 + y^{-1} = -1+v$. So $v'-v=-1$, integrating factor $e^{-x}$: $(ve^{-x})'=-e^{-x}$, $ve^{-x}=e^{-x}+C$, $v=1+Ce^x$. Hence $y = 1/(1+Ce^x)$ (plus the singular solution $y\equiv 0$).

</details>

### J.4 Linear second-order with constant coefficients (homogeneous)

**Statement.** Solve $y'' - 5y' + 6y = 0$.

<details><summary>Solution</summary>

Characteristic polynomial $\lambda^2-5\lambda+6=0$, roots $\lambda=2,3$. General solution $y(x) = c_1 e^{2x} + c_2 e^{3x}$.

</details>

### J.5 Non-homogeneous linear

**Statement.** Solve $y'' + y = \cos x$.

<details><summary>Solution</summary>

Homogeneous: $\lambda^2+1=0$, $\lambda=\pm i$, $y_h = c_1\cos x + c_2\sin x$. The forcing $\cos x$ is a resonance: try $y_p = x(A\cos x + B\sin x)$. Substitute and equate: $2(-A\sin x + B\cos x) = \cos x$ gives $A=0$, $B=1/2$. Hence $y_p = (x/2)\sin x$. General solution $y = c_1\cos x + c_2\sin x + (x/2)\sin x$.

</details>

---

## K. Bonus: synthesis problems (3)

### K.1 Existence of a fixed point

**Statement.** Show that the equation $\cos x = x$ has a unique solution in $\mathbb{R}$.

<details><summary>Solution</summary>

Define $g(x)=\cos x - x$. Continuous on $\mathbb{R}$. $g(0)=1>0$, $g(\pi/2)=-\pi/2<0$, IVT gives a root in $(0,\pi/2)$. Uniqueness: $g'(x)=-\sin x - 1 \le 0$ with equality only on a discrete set, so $g$ is strictly decreasing — unique root.

</details>

### K.2 Integral with parameter

**Statement.** Define $F(t)=\displaystyle \int_0^t \dfrac{\ln(1+x)}{x}\,dx$ for $t>-1$. Show $F\in C^1((-1,+\infty))$ and compute $F'(t)$.

<details><summary>Solution</summary>

The integrand $\ln(1+x)/x$ has a removable singularity at $0$ ($\to 1$). Hence it is continuous on $(-1,+\infty)$ once extended by $1$ at $0$. By the Fundamental Theorem of Calculus $F'(t)=\ln(1+t)/t$ (with $F'(0)=1$).

</details>

### K.3 Convergence-with-parameter

**Statement.** For which $\alpha\in\mathbb{R}$ does $\displaystyle \int_0^1 \dfrac{dx}{x^\alpha (1-x)^\alpha}$ converge?

<details><summary>Solution</summary>

Singularities at both endpoints. Near $0$: integrand $\sim x^{-\alpha}$, converges iff $\alpha<1$. Near $1$: similarly $\alpha<1$ by symmetry. Hence convergence iff $\boxed{\alpha < 1}$.

</details>

---

## How to use this book

Work three exercises a day in your weakest area. After two weeks rotate to a new area. Keep a notebook with the **mistakes** you make, not the right answers: those are the cheap signal about your true level. Re-solve every exercise twice — second time without looking. When you can produce all solutions cleanly under twenty minutes, you are exam-ready.
