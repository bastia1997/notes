---
title: "A–Z glossary of Mathematical Analysis I"
area: Reference
summary: "Alphabetical glossary of the technical vocabulary of Analysis I. Each entry is a precise one-to-three-line definition with cross-reference to the corresponding site section."
order: 58
level: advanced
prereq:
  - "Earlier sections of the path"
tools:
  - "Rudin — *Principles of Mathematical Analysis*, index"
  - "Apostol — *Mathematical Analysis*, glossary"
  - "Encyclopedia of Mathematics (online), terminological entries"
---

# A–Z glossary of Mathematical Analysis I

Definitions are kept formal and minimal. Each entry points to the section of the path where the concept is developed and motivated. Cross-references inside an entry use boldface for terms that have their own entry. KaTeX is used for formulae.

---

## A

### Absolutely convergent series
A series $\sum a_n$ is **absolutely convergent** if $\sum |a_n|$ converges. Absolute convergence implies convergence and permits arbitrary rearrangements (Riemann theorem). See section 41.

### Accumulation point
A point $x_0$ is an accumulation point of $A\subseteq\mathbb{R}$ if every neighbourhood of $x_0$ contains some point of $A$ different from $x_0$. Equivalent: there exists a sequence in $A\setminus\{x_0\}$ tending to $x_0$. See section 10.

### Analytic function
A real function is analytic on $I$ if for every $x_0\in I$ there is a neighbourhood in which $f$ equals its Taylor series at $x_0$. Strictly stronger than $C^\infty$. See section 47.

### Antiderivative (primitive)
A function $F$ is an antiderivative of $f$ on $I$ if $F'=f$ on $I$. Two antiderivatives on a connected interval differ by an additive constant. See section 34.

### Archimedean property
For every $x\in\mathbb{R}$ there exists $n\in\mathbb{N}$ with $n>x$. Equivalently: $\mathbb{N}$ is unbounded in $\mathbb{R}$. See section 7.

### Asymptote
A line approached by the graph of $f$ at infinity. **Horizontal** $y=L$ if $\lim_{x\to\pm\infty}f=L$; **vertical** $x=x_0$ if $\lim_{x\to x_0^\pm}f=\pm\infty$; **oblique** $y=mx+q$ if $\lim_{x\to\pm\infty}(f(x)-mx-q)=0$. See sections 22–23.

---

## B

### Bernoulli inequality
$(1+x)^n \ge 1+nx$ for $x\ge -1$, $n\in\mathbb{N}$. Generalised to real $n\ge 1$. See section 5.

### Bolzano's theorem
A continuous function on $[a,b]$ taking values of opposite sign at the endpoints has at least one zero in $(a,b)$. Special case of Intermediate Value Theorem. See section 26.

### Bolzano-Weierstrass theorem
Every bounded sequence in $\mathbb{R}$ admits a convergent subsequence. Equivalent to completeness for $\mathbb{R}$. See section 15.

### Boundary (frontier)
The boundary $\partial A$ of $A\subseteq\mathbb{R}$ is the set of points $x$ such that every neighbourhood of $x$ meets both $A$ and $\mathbb{R}\setminus A$. Equivalently $\partial A = \bar A \setminus \mathring A$. See section 10.

### Bounded
$A\subseteq\mathbb{R}$ is bounded if there exists $M>0$ with $|x|\le M$ for all $x\in A$. A sequence is bounded if its range is. See section 7.

---

## C

### Cauchy problem (initial value problem)
A first-order ODE $y'=f(x,y)$ together with an initial condition $y(x_0)=y_0$. Existence and uniqueness given by Picard-Lindelöf under Lipschitz. See section 52.

### Cauchy product
For two series $\sum a_n,\sum b_n$ the Cauchy product is $\sum c_n$ with $c_n=\sum_{k=0}^n a_k b_{n-k}$. Converges absolutely when both factors do. See section 41.

### Cauchy sequence
A sequence $(a_n)$ such that $\forall\varepsilon>0\,\exists N\,\forall m,n\ge N: |a_m-a_n|<\varepsilon$. In $\mathbb{R}$, Cauchy equals convergent (completeness). See section 14.

### Cauchy-Schwarz inequality
For finite sums (or integrals): $\left(\sum a_k b_k\right)^2 \le \left(\sum a_k^2\right)\left(\sum b_k^2\right)$. See section 5.

### Characteristic polynomial (linear ODE)
For $a_n y^{(n)}+\cdots+a_0 y = 0$ with constant coefficients, the polynomial $p(\lambda)=a_n\lambda^n+\cdots+a_0$. Its roots determine the basis of solutions. See section 53.

### Compact set
A subset $K\subseteq\mathbb{R}$ is compact if every open cover admits a finite subcover. By **Heine-Borel** $K$ compact in $\mathbb{R}$ iff $K$ closed and bounded. See section 10.

### Completeness of $\mathbb{R}$
Every non-empty subset of $\mathbb{R}$ bounded above admits a supremum in $\mathbb{R}$. Equivalent to the Cauchy criterion. Distinguishes $\mathbb{R}$ from $\mathbb{Q}$. See section 6.

### Complex number
An element of $\mathbb{C}=\{a+ib : a,b\in\mathbb{R}, i^2=-1\}$. Algebraically closed field, isomorphic to $\mathbb{R}^2$ as a vector space. See section 8.

### Concavity
$f$ is concave on $I$ if $f(\lambda x+(1-\lambda)y)\ge \lambda f(x)+(1-\lambda)f(y)$ for $\lambda\in[0,1]$. Equivalent (for $C^2$) to $f''\le 0$. See section 28.

### Continuity
$f$ is continuous at $x_0$ if $\lim_{x\to x_0}f(x)=f(x_0)$. Equivalent: for every sequence $x_n\to x_0$, $f(x_n)\to f(x_0)$ (sequential criterion). See section 24.

### Convergence (sequence)
$a_n\to L$ if $\forall\varepsilon>0\,\exists N\,\forall n\ge N: |a_n-L|<\varepsilon$. See section 12.

### Convergence (series)
$\sum a_n$ converges if the sequence of partial sums $s_N=\sum_{n\le N}a_n$ converges. See section 40.

### Convexity
$f$ is convex on $I$ if $f(\lambda x+(1-\lambda)y)\le \lambda f(x)+(1-\lambda)f(y)$. Equivalent (for $C^2$) to $f''\ge 0$. See section 28.

### Countable
A set $A$ is countable if there is a bijection $\mathbb{N}\to A$ (or it is finite). $\mathbb{Q}$ is countable, $\mathbb{R}$ is not. See section 6.

### Critical point
A point $x_0$ in the interior of the domain of $f$ where $f'(x_0)=0$ (or $f'$ does not exist). Necessary condition for an interior local extremum (Fermat). See section 28.

---

## D

### Darboux's theorem
The derivative of a function on an interval has the intermediate-value property (even if it is discontinuous). See section 27.

### Dedekind cut
A partition of $\mathbb{Q}$ into two non-empty sets $A,B$ with $A$ has no maximum and $a<b$ for all $a\in A, b\in B$. Used to construct $\mathbb{R}$. See section 6.

### Density (of $\mathbb{Q}$ in $\mathbb{R}$)
Between any two real numbers there is a rational. Equivalent: $\bar{\mathbb{Q}}=\mathbb{R}$. See section 7.

### Derivative
$f'(x_0) = \lim_{h\to 0}\dfrac{f(x_0+h)-f(x_0)}{h}$, when the limit exists and is finite. See section 27.

### Differentiable function
A function for which the derivative exists at every point of its domain. In one real variable equivalent to having a tangent line. See section 27.

### Differential
For $f$ differentiable at $x_0$, $df_{x_0}(h) = f'(x_0) h$. The linear part of the increment. See section 27.

### Dirichlet test
If $a_n$ has bounded partial sums and $b_n$ is monotone decreasing to $0$, then $\sum a_n b_n$ converges. Generalises Leibniz. See section 42.

### Discontinuity
A point of the domain where the function is not continuous. Three types: **removable** (limit exists, differs from value), **first-kind/jump** (left and right limits exist, differ), **second-kind** (at least one one-sided limit fails to exist or is infinite). See section 25.

---

## E

### Euler's number $e$
$e = \lim_{n\to\infty}(1+1/n)^n = \sum_{k=0}^\infty 1/k! \approx 2.71828$. Irrational and transcendental. See section 16.

### Even/odd function
$f$ is **even** if $f(-x)=f(x)$, **odd** if $f(-x)=-f(x)$. Affects symmetry of graphs and integrals over symmetric intervals. See section 19.

---

## F

### Factorial
$n! = 1\cdot 2\cdots n$ for $n\in\mathbb{N}$, with $0!=1$. Extended to non-integers by the Gamma function. See section 16.

### Fermat's theorem (stationarity)
If $f$ has a local extremum at an interior point $x_0$ where it is differentiable, then $f'(x_0)=0$. See section 28.

### Fourier series
A representation of a periodic function as $\sum (a_n\cos nx + b_n\sin nx)$. Touched only marginally in Analysis I. See section 49.

### Function
A correspondence $f:A\to B$ assigning to each $a\in A$ exactly one $b=f(a)\in B$. Pillar of analysis. See section 17.

---

## G

### Gamma function
$\Gamma(s) = \int_0^\infty t^{s-1}e^{-t}\,dt$ for $\Re s>0$. Satisfies $\Gamma(n+1)=n!$, $\Gamma(s+1)=s\Gamma(s)$. See section 39.

### Geometric series
$\sum_{n=0}^\infty x^n = \dfrac{1}{1-x}$ for $|x|<1$, divergent for $|x|\ge 1$. The prototype of every convergence test. See section 40.

### Gradient
For $f:\mathbb{R}^n\to\mathbb{R}$, $\nabla f = (\partial f/\partial x_1, \dots, \partial f/\partial x_n)$. Outside the Analysis I syllabus but mentioned for continuity with the multivariate course. See section 55.

---

## H

### Heine's theorem
A continuous function on a compact set is uniformly continuous. See section 26.

### Heine-Borel theorem
In $\mathbb{R}^n$ a set is compact iff it is closed and bounded. See section 10.

### Hessian (matrix)
For $f:\mathbb{R}^n\to\mathbb{R}$ of class $C^2$, the matrix of second partial derivatives. Sign-definiteness classifies critical points. See section 55.

### Hilbert space
A complete inner-product vector space. Mentioned only in passing as the natural successor of $\mathbb{R}^n$. See section 54.

### Hölder inequality
$\sum |a_k b_k| \le (\sum |a_k|^p)^{1/p}(\sum |b_k|^q)^{1/q}$ with $1/p+1/q=1$, $p,q>1$. Generalises Cauchy-Schwarz ($p=q=2$). See section 5.

---

## I

### Image (range)
$f(A) = \{f(a) : a\in A\}$. See section 17.

### Improper integral
A definite integral on an unbounded interval, or of a function unbounded near an endpoint, defined as a limit of definite integrals. See section 38.

### Induction (principle)
If a property $P(n)$ holds for $n=1$ and $P(n)\Rightarrow P(n+1)$, then $P$ holds for every $n\in\mathbb{N}$. See section 3.

### Infimum
The greatest lower bound of a non-empty set bounded below. Exists by completeness. See section 7.

### Injective function
$f$ is injective if $f(x)=f(y)\Rightarrow x=y$. See section 17.

### Integral (Riemann)
Limit of Riemann sums on partitions of $[a,b]$ as the mesh goes to $0$, when the limit exists. Equivalent to upper-lower sum equality (Darboux). See section 35.

### Integral (Lebesgue)
Generalises the Riemann integral via measures of sublevel sets. Sketched at the end of the course. See section 48.

### Inverse function
For $f:A\to B$ bijective, $f^{-1}:B\to A$ defined by $f^{-1}(y)=x\iff f(x)=y$. Continuous if $f$ is continuous on a compact interval. See section 17.

---

## J

### Jensen's inequality
For $f$ convex and probability weights $\lambda_k$: $f(\sum\lambda_k x_k)\le \sum\lambda_k f(x_k)$. See section 28.

### Jump (discontinuity)
First-kind discontinuity at $x_0$: both one-sided limits exist and are finite, with $\lim_{x\to x_0^-}f\ne \lim_{x\to x_0^+}f$. See section 25.

---

## K

### Kakutani / Knaster-Tarski / Brouwer (fixed-point theorems)
Out of Analysis I syllabus. Mentioned only for orientation. See section 54.

---

## L

### Lagrange (Mean Value Theorem)
If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, there exists $\xi\in(a,b)$ with $f'(\xi) = (f(b)-f(a))/(b-a)$. See section 30.

### Lagrange remainder
For Taylor expansion of order $n$ at $x_0$: $R_n(x) = \dfrac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$ for some $\xi$ between $x_0$ and $x$. See section 32.

### Landau symbols
$o(\cdot)$ and $O(\cdot)$ asymptotic notations. $f=o(g)$ at $x_0$ if $f/g\to 0$; $f=O(g)$ if $f/g$ is bounded near $x_0$. See section 21.

### Lebesgue (measure / integral)
Length-like measure on $\mathbb{R}$ extending the natural measure of intervals. Provides a richer integration theory than Riemann. See section 48.

### Leibniz test (alternating series)
If $b_n$ is monotone decreasing to $0$, then $\sum (-1)^n b_n$ converges; the truncation error is bounded by $b_{N+1}$. See section 42.

### Limit (sequence)
See **Convergence (sequence)**. See section 12.

### Limit (function)
$\lim_{x\to x_0}f(x)=L$ if $\forall\varepsilon>0\,\exists\delta>0: 0<|x-x_0|<\delta\Rightarrow |f(x)-L|<\varepsilon$. See section 20.

### Liminf / Limsup
$\limsup a_n = \lim_{N\to\infty}\sup_{n\ge N}a_n$, similarly $\liminf$. Always exist in $\overline{\mathbb{R}}$; equal iff the sequence converges (or diverges definitely). See section 14.

### Lipschitz function
$|f(x)-f(y)|\le L|x-y|$ for some $L\ge 0$. Lipschitz functions are uniformly continuous, every Lipschitz function is absolutely continuous. See section 26.

### Logarithm (natural)
$\ln x = \int_1^x dt/t$ for $x>0$. Inverse of $e^x$. See section 18.

---

## M

### Maximum / minimum (function)
Global max of $f$ on $A$: a point $x_0\in A$ with $f(x_0)\ge f(x)$ for all $x\in A$. Local: same with neighbourhood. By Weierstrass continuous functions on compacta attain both. See section 26.

### Measure (Lebesgue)
A countably additive set function generalising "length". See section 48.

### Minkowski inequality
$\|x+y\|_p\le \|x\|_p+\|y\|_p$ for $p\ge 1$. The triangle inequality of $\ell^p$-norms. See section 5.

### Modulus (absolute value)
$|x|=x$ if $x\ge 0$, $|x|=-x$ otherwise. Satisfies $|x+y|\le |x|+|y|$, $|xy|=|x||y|$. See section 5.

### Monotone function/sequence
Non-decreasing (resp. non-increasing) on its domain. Monotone bounded sequences converge. See section 13.

---

## N

### Natural numbers
$\mathbb{N}=\{0,1,2,\dots\}$ (or $\{1,2,\dots\}$ in the analytic tradition). Characterised by Peano axioms. See section 3.

### Neighbourhood
Of a point $x_0\in\mathbb{R}$: any open interval containing $x_0$, or a set containing such an interval. See section 10.

### Norm
A function $\|\cdot\|:V\to\mathbb{R}_{\ge 0}$ such that $\|v\|=0\iff v=0$, $\|\alpha v\|=|\alpha|\|v\|$, $\|v+w\|\le \|v\|+\|w\|$. The absolute value is the canonical norm on $\mathbb{R}$. See section 5.

### Notable limit
Recurrent limit such as $\lim_{x\to 0}\sin x/x = 1$ or $\lim_{x\to 0}(1+x)^{1/x}=e$. Catalogued in section 21.

---

## O

### Open set
$A\subseteq\mathbb{R}$ is open if every $x\in A$ has a neighbourhood contained in $A$. Arbitrary unions and finite intersections of open sets are open. See section 10.

### Order of infinity
A way of ranking how fast functions tend to $\pm\infty$: $f$ is of higher order than $g$ at $x_0$ if $g=o(f)$ there. See section 21.

---

## P

### Parity
The property of being even or odd, see **Even/odd function**. See section 19.

### Partition (of $[a,b]$)
A finite increasing sequence $a=x_0<x_1<\cdots<x_n=b$. Underlies Riemann sums. See section 35.

### Peano (axioms / theorem)
**Axioms**: characterise $\mathbb{N}$. **Theorem (ODEs)**: under continuity alone, existence (not uniqueness) of solutions to the Cauchy problem. See sections 3 and 52.

### Peano remainder
Form of the remainder in Taylor's expansion: $R_n(x)=o((x-x_0)^n)$ as $x\to x_0$. See section 32.

### Picard iteration
The fixed-point iteration $y_{k+1}(x)=y_0+\int_{x_0}^x f(t,y_k(t))\,dt$ used to prove existence/uniqueness in ODEs. See section 52.

### Picard-Lindelöf theorem
Under continuity in $x$ and Lipschitz-in-$y$, the Cauchy problem has a unique local solution. See section 52.

### Power series
A series of the form $\sum_{n=0}^\infty a_n (x-x_0)^n$. Converges in $|x-x_0|<R$, with $R$ the radius of convergence. See section 46.

### Pythagorean identity
$\sin^2 x + \cos^2 x = 1$. Generates the entire trigonometric algebra. See section 18.

---

## Q

### Quotient (difference)
$\dfrac{f(x_0+h)-f(x_0)}{h}$: the secant slope, whose limit (when it exists) is the derivative. See section 27.

---

## R

### Radius of convergence
For $\sum a_n(x-x_0)^n$, $R = 1/\limsup |a_n|^{1/n}$ (Cauchy-Hadamard). Inside the disc $|x-x_0|<R$ the series converges absolutely. See section 46.

### Real numbers
The complete ordered field $\mathbb{R}$, characterised up to isomorphism by completeness. See section 6.

### Riemann integral
See **Integral (Riemann)**. See section 35.

### Riemann sum
$\sum_k f(\xi_k)(x_k-x_{k-1})$ for a partition and chosen sample points. See section 35.

### Rolle's theorem
If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, there exists $\xi\in(a,b)$ with $f'(\xi)=0$. See section 30.

---

## S

### Schwarz inequality
Synonym of **Cauchy-Schwarz**. See section 5.

### Sequence
A function $\mathbb{N}\to\mathbb{R}$, denoted $(a_n)_{n\in\mathbb{N}}$. See section 11.

### Series
A pair of sequences $(a_n)$ (the terms) and $(s_N)$ (the partial sums, $s_N=\sum_{n\le N}a_n$). See section 40.

### Subsequence
$(a_{n_k})_{k\in\mathbb{N}}$ obtained from $(a_n)$ via a strictly increasing function $k\mapsto n_k$. See section 15.

### Supremum
The least upper bound of a non-empty set bounded above. Exists by completeness. See section 7.

### Surjective function
$f:A\to B$ is surjective if $f(A)=B$. See section 17.

---

## T

### Tangent line
The line through $(x_0,f(x_0))$ with slope $f'(x_0)$. The graph of $f$ separates from the tangent line as $o(x-x_0)$. See section 27.

### Tangent plane
Multivariable analogue, $z = f(x_0,y_0) + \nabla f\cdot ((x,y)-(x_0,y_0))$. Outside the Analysis I syllabus. See section 55.

### Taylor polynomial
$P_n(x) = \sum_{k=0}^n \dfrac{f^{(k)}(x_0)}{k!}(x-x_0)^k$. Best polynomial approximant of degree $\le n$ at $x_0$. See section 32.

### Taylor series
$\sum_{k=0}^\infty \dfrac{f^{(k)}(x_0)}{k!}(x-x_0)^k$. Equals $f$ on its disc of convergence iff $f$ is analytic. See section 47.

### Topology (of $\mathbb{R}$)
The collection of open subsets of $\mathbb{R}$. Generated by open intervals. See section 10.

### Triangle inequality
$|x+y|\le |x|+|y|$, with equality iff $xy\ge 0$. The seed of every metric inequality. See section 5.

---

## U

### Uniform continuity
$\forall\varepsilon>0\,\exists\delta>0\,\forall x,y: |x-y|<\delta\Rightarrow |f(x)-f(y)|<\varepsilon$. Stronger than continuity; equivalent on compacta (Heine). See section 26.

### Upper bound
$M$ is an upper bound of $A\subseteq\mathbb{R}$ if $a\le M$ for all $a\in A$. See section 7.

---

## V

### Volterra integral equation
$y(x)=g(x)+\int_{x_0}^x K(x,t)y(t)\,dt$. Cauchy problems rephrase as such. See section 52.

---

## W

### Weierstrass theorem (extreme value)
A continuous function on a compact set attains its supremum and infimum. See section 26.

### Wronskian
For $n$ functions $y_1,\dots,y_n\in C^{n-1}(I)$, $W(x)=\det(y_j^{(i-1)})_{i,j}$. Non-zero Wronskian $\Rightarrow$ linear independence. See section 53.

---

## Y

### Young's inequality
$ab\le \dfrac{a^p}{p}+\dfrac{b^q}{q}$ for $a,b\ge 0$ and $1/p+1/q=1$, $p,q>1$. Underlies Hölder. See section 5.

---

## Z

### Zero of a function
A point $x_0$ in the domain with $f(x_0)=0$. The Bolzano theorem locates zeros of continuous functions. See section 26.

### Zorn's lemma
Equivalent to the Axiom of Choice. Mentioned only for completeness of foundations. See section 6.

---

## Numerical / Greek symbols

### $\aleph_0$
The cardinality of $\mathbb{N}$ (countable infinity). See section 6.

### $\mathfrak{c}$
The cardinality of $\mathbb{R}$ (continuum). $\mathfrak{c} = 2^{\aleph_0}$. See section 6.

### $\pi$
$\pi = $ ratio of circumference to diameter; analytically the smallest positive zero of $\sin/2$. Transcendental. See section 18.

### $\gamma$ (Euler-Mascheroni constant)
$\gamma = \lim_{N\to\infty}(\sum_{n=1}^N 1/n - \ln N) \approx 0.5772$. Whether it is irrational is open. See section 40.

---

## How to use this glossary

Read the glossary entry **before** the corresponding section if you arrive cold; **after** it if you want to fix the formal core. Use the cross-references to navigate sideways: definitions that share a section often share a proof technique. Memorise the formal statement, then think of one example and one counterexample for each entry. That is what graduates from understanding the words to wielding them.
