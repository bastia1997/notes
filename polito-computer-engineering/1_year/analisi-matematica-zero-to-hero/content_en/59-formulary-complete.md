---
title: "Complete formulary of Mathematical Analysis I"
area: Reference
summary: 'Complete formulary for Analysis I: inequalities, notable limits, growth hierarchy, derivative and primitive tables, Maclaurin expansions, trigonometric and hyperbolic identities, sums of notable series, ODE solution schemas.'
order: 59
level: advanced
prereq:
  - "Earlier sections of the path"
tools:
  - "Gradshteyn-Ryzhik — *Table of Integrals, Series, and Products*"
  - "Abramowitz-Stegun — *Handbook of Mathematical Functions*"
  - "Bronshtein-Semendyayev — *Handbook of Mathematics*"
---

# Complete formulary of Mathematical Analysis I

A formulary is a tool, not a replacement for understanding. Use it as a reference once each identity has been derived at least once. Keep it open during exam practice, then close it during the exam itself.

All identities are stated in their canonical form. Constants of integration in indefinite integrals are omitted to keep the table compact; in a written exam you must include them.

---

## 1. Fundamental inequalities

### 1.1 Triangle inequality
$$|x+y|\le |x|+|y|,\quad \bigl||x|-|y|\bigr|\le |x-y|.$$
Equality in the first iff $xy\ge 0$.

### 1.2 Bernoulli inequality
For $x\ge -1$ and $n\in\mathbb{N}$:
$$(1+x)^n \ge 1+nx.$$
Generalised: for real $\alpha\ge 1$ and $x\ge -1$, $(1+x)^\alpha \ge 1+\alpha x$. For $0\le \alpha\le 1$ the inequality is reversed.

### 1.3 AM-GM (arithmetic-geometric mean)
For $a_1,\dots,a_n\ge 0$:
$$\frac{a_1+\cdots+a_n}{n} \ge \sqrt[n]{a_1\cdots a_n}.$$
Equality iff all $a_k$ are equal.

### 1.4 AM-GM-HM
$$\frac{a_1+\cdots+a_n}{n} \ge \sqrt[n]{a_1\cdots a_n} \ge \frac{n}{\sum 1/a_k}.$$

### 1.5 Cauchy-Schwarz (discrete and integral)
$$\Bigl(\sum a_k b_k\Bigr)^2 \le \Bigl(\sum a_k^2\Bigr)\Bigl(\sum b_k^2\Bigr),\qquad \Bigl(\int_a^b fg\Bigr)^2 \le \Bigl(\int_a^b f^2\Bigr)\Bigl(\int_a^b g^2\Bigr).$$

### 1.6 Young's inequality
For $a,b\ge 0$ and conjugate exponents $1/p+1/q=1$ with $p,q>1$:
$$ab \le \frac{a^p}{p} + \frac{b^q}{q}.$$
Special case $p=q=2$: $ab\le (a^2+b^2)/2$.

### 1.7 Hölder's inequality
With $1/p+1/q=1$ and $p,q>1$:
$$\sum |a_k b_k| \le \Bigl(\sum |a_k|^p\Bigr)^{1/p}\Bigl(\sum |b_k|^q\Bigr)^{1/q}.$$

### 1.8 Minkowski's inequality
For $p\ge 1$:
$$\Bigl(\sum |a_k+b_k|^p\Bigr)^{1/p} \le \Bigl(\sum |a_k|^p\Bigr)^{1/p} + \Bigl(\sum |b_k|^p\Bigr)^{1/p}.$$

### 1.9 Jensen's inequality
For $\varphi$ convex and probability weights $\lambda_k\ge 0$, $\sum\lambda_k=1$:
$$\varphi\Bigl(\sum \lambda_k x_k\Bigr) \le \sum \lambda_k \varphi(x_k).$$
Integral form for a probability measure $\mu$: $\varphi(\int f\,d\mu)\le \int \varphi(f)\,d\mu$.

### 1.10 Frequently used algebraic inequalities
$$2ab \le a^2 + b^2,\qquad (a+b)^2 \le 2(a^2+b^2),\qquad (a+b)^p \le 2^{p-1}(a^p+b^p)\ (p\ge 1, a,b\ge 0).$$

---

## 2. Notable limits

### 2.1 Sequences

$$\lim_{n\to\infty}\Bigl(1+\frac{1}{n}\Bigr)^n = e,\qquad \lim_{n\to\infty}\Bigl(1+\frac{x}{n}\Bigr)^n = e^x.$$

$$\lim_{n\to\infty}\sqrt[n]{n} = 1,\qquad \lim_{n\to\infty}\sqrt[n]{a} = 1\ (a>0).$$

$$\lim_{n\to\infty} a^n = \begin{cases}0 & |a|<1,\\ 1 & a=1,\\ +\infty & a>1,\\ \text{no limit} & a\le -1.\end{cases}$$

$$\lim_{n\to\infty}\frac{a^n}{n!} = 0,\qquad \lim_{n\to\infty}\frac{n!}{n^n} = 0,\qquad \lim_{n\to\infty}\frac{(\ln n)^p}{n^q} = 0\ (p\in\mathbb{R}, q>0).$$

**Stirling**: $n!\sim \sqrt{2\pi n}\,(n/e)^n$ as $n\to\infty$.

### 2.2 Functions at $0$ (basic)

$$\lim_{x\to 0}\frac{\sin x}{x} = 1,\qquad \lim_{x\to 0}\frac{1-\cos x}{x^2} = \frac{1}{2},\qquad \lim_{x\to 0}\frac{\tan x}{x} = 1.$$

$$\lim_{x\to 0}\frac{e^x - 1}{x} = 1,\qquad \lim_{x\to 0}\frac{\ln(1+x)}{x} = 1,\qquad \lim_{x\to 0}\frac{(1+x)^\alpha - 1}{x} = \alpha.$$

$$\lim_{x\to 0}\frac{a^x - 1}{x} = \ln a\ (a>0),\qquad \lim_{x\to 0}\frac{\arcsin x}{x} = 1,\qquad \lim_{x\to 0}\frac{\arctan x}{x} = 1.$$

$$\lim_{x\to 0}\frac{\sinh x}{x} = 1,\qquad \lim_{x\to 0}\frac{\cosh x - 1}{x^2} = \frac{1}{2}.$$

### 2.3 Functions at infinity

$$\lim_{x\to +\infty}\Bigl(1+\frac{1}{x}\Bigr)^x = e,\qquad \lim_{x\to +\infty}\frac{\ln x}{x^\alpha} = 0\ (\alpha > 0).$$

$$\lim_{x\to +\infty}\frac{x^\alpha}{e^x} = 0\ (\alpha\in\mathbb{R}),\qquad \lim_{x\to +\infty} x^\alpha e^{-x} = 0\ (\alpha\in\mathbb{R}).$$

---

## 3. Hierarchy of growth at $+\infty$

For $a > 1$, $\alpha > 0$, $\beta > 0$:
$$\ln^\beta x \ \ll\ x^\alpha \ \ll\ a^x \ \ll\ x^x \ \ll\ \Gamma(x+1).$$

Here $f \ll g$ means $f(x)/g(x)\to 0$ as $x\to+\infty$. The hierarchy at $0^+$ for inverses of the above: $x^\alpha \ll \ln^\beta(1/x) \ll e^{-1/x}$, etc.

Useful corollary: for $\alpha,\beta>0$ and $a>1$,
$$x^\alpha (\ln x)^\beta = o(a^x),\quad a^x = o(x^{kx})\text{ for any }k>0.$$

---

## 4. Elementary derivatives

| $f(x)$ | $f'(x)$ |
|---|---|
| $c$ | $0$ |
| $x^\alpha$ | $\alpha x^{\alpha-1}$ |
| $a^x$ | $a^x \ln a$ |
| $e^x$ | $e^x$ |
| $\log_a x$ | $1/(x \ln a)$ |
| $\ln x$ | $1/x$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $1+\tan^2 x = 1/\cos^2 x$ |
| $\cot x$ | $-1-\cot^2 x = -1/\sin^2 x$ |
| $\arcsin x$ | $1/\sqrt{1-x^2}$ |
| $\arccos x$ | $-1/\sqrt{1-x^2}$ |
| $\arctan x$ | $1/(1+x^2)$ |
| $\operatorname{arccot} x$ | $-1/(1+x^2)$ |
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $1-\tanh^2 x = 1/\cosh^2 x$ |
| $\operatorname{arsinh} x$ | $1/\sqrt{x^2+1}$ |
| $\operatorname{arcosh} x$ | $1/\sqrt{x^2-1}\ (x>1)$ |
| $\operatorname{artanh} x$ | $1/(1-x^2)\ (|x|<1)$ |
| $|x|$ | $\operatorname{sgn}(x)\ (x\ne 0)$ |
| $\Gamma(x)$ | $\Gamma(x)\psi(x)$ ($\psi$ digamma) |

### Differentiation rules

$$(f+g)' = f'+g',\quad (fg)' = f'g + fg',\quad \Bigl(\frac{f}{g}\Bigr)' = \frac{f'g - fg'}{g^2}.$$

Chain rule: $(f\circ g)'(x) = f'(g(x))\,g'(x)$. Inverse: $(f^{-1})'(y) = 1/f'(f^{-1}(y))$.

Logarithmic differentiation: $\dfrac{d}{dx}\bigl[f(x)^{g(x)}\bigr] = f(x)^{g(x)}\Bigl(g'(x)\ln f(x) + g(x)\dfrac{f'(x)}{f(x)}\Bigr)$.

Leibniz formula (n-th derivative of a product):
$$(fg)^{(n)} = \sum_{k=0}^n \binom{n}{k} f^{(k)} g^{(n-k)}.$$

---

## 5. Maclaurin expansions (centred at $0$)

Each expansion is valid in the indicated interval; outside it the series diverges. Within the interval the function equals its series.

### Exponentials and logarithms

$$e^x = \sum_{n=0}^\infty \frac{x^n}{n!} = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \frac{x^4}{24} + \cdots,\quad x\in\mathbb{R}.$$

$$a^x = \sum_{n=0}^\infty \frac{(x\ln a)^n}{n!},\quad x\in\mathbb{R},\ a>0.$$

$$\ln(1+x) = \sum_{n=1}^\infty (-1)^{n+1}\frac{x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots,\quad -1<x\le 1.$$

$$\ln\frac{1+x}{1-x} = 2\sum_{n=0}^\infty \frac{x^{2n+1}}{2n+1},\quad |x|<1.$$

### Powers (binomial)

$$(1+x)^\alpha = \sum_{n=0}^\infty \binom{\alpha}{n} x^n,\quad |x|<1,\ \alpha\in\mathbb{R},$$
where $\binom{\alpha}{n} = \dfrac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}$.

Special cases:
$$\frac{1}{1-x} = \sum_{n=0}^\infty x^n,\quad \frac{1}{1+x} = \sum_{n=0}^\infty (-1)^n x^n,\quad |x|<1.$$
$$\frac{1}{(1-x)^2} = \sum_{n=1}^\infty n x^{n-1},\quad |x|<1.$$
$$\sqrt{1+x} = 1 + \frac{x}{2} - \frac{x^2}{8} + \frac{x^3}{16} - \cdots,\quad |x|\le 1.$$

### Trigonometric

$$\sin x = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots,\quad x\in\mathbb{R}.$$

$$\cos x = \sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!} = 1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots,\quad x\in\mathbb{R}.$$

$$\tan x = x + \frac{x^3}{3} + \frac{2x^5}{15} + \frac{17 x^7}{315} + \cdots,\quad |x|<\frac{\pi}{2}.$$

$$\arctan x = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots,\quad |x|\le 1.$$

$$\arcsin x = \sum_{n=0}^\infty \frac{(2n)!}{4^n (n!)^2 (2n+1)} x^{2n+1} = x + \frac{x^3}{6} + \frac{3 x^5}{40} + \cdots,\quad |x|\le 1.$$

### Hyperbolic

$$\sinh x = \sum_{n=0}^\infty \frac{x^{2n+1}}{(2n+1)!} = x + \frac{x^3}{6} + \frac{x^5}{120} + \cdots,\quad x\in\mathbb{R}.$$

$$\cosh x = \sum_{n=0}^\infty \frac{x^{2n}}{(2n)!} = 1 + \frac{x^2}{2} + \frac{x^4}{24} + \cdots,\quad x\in\mathbb{R}.$$

$$\tanh x = x - \frac{x^3}{3} + \frac{2 x^5}{15} - \cdots,\quad |x| < \frac{\pi}{2}.$$

$$\operatorname{arsinh} x = \ln(x + \sqrt{1+x^2}),\quad \operatorname{artanh} x = \frac{1}{2}\ln\frac{1+x}{1-x}\ (|x|<1).$$

---

## 6. Table of elementary primitives

We write $C$ for the integration constant in only the first few entries, then omit it.

$$\int x^\alpha\,dx = \frac{x^{\alpha+1}}{\alpha+1} + C\ (\alpha\ne -1),\qquad \int \frac{dx}{x} = \ln|x| + C.$$

$$\int e^x\,dx = e^x,\qquad \int a^x\,dx = \frac{a^x}{\ln a}\ (a>0,a\ne 1).$$

$$\int \sin x\,dx = -\cos x,\qquad \int \cos x\,dx = \sin x.$$

$$\int \tan x\,dx = -\ln|\cos x|,\qquad \int \cot x\,dx = \ln|\sin x|.$$

$$\int \frac{dx}{\cos^2 x} = \tan x,\qquad \int \frac{dx}{\sin^2 x} = -\cot x.$$

$$\int \sec x\,dx = \ln|\sec x + \tan x|,\qquad \int \csc x\,dx = -\ln|\csc x + \cot x|.$$

$$\int \sinh x\,dx = \cosh x,\qquad \int \cosh x\,dx = \sinh x.$$

$$\int \tanh x\,dx = \ln\cosh x,\qquad \int \coth x\,dx = \ln|\sinh x|.$$

$$\int \frac{dx}{1+x^2} = \arctan x,\qquad \int \frac{dx}{1-x^2} = \frac{1}{2}\ln\Bigl|\frac{1+x}{1-x}\Bigr| = \operatorname{artanh} x\ (|x|<1).$$

$$\int \frac{dx}{\sqrt{1-x^2}} = \arcsin x,\qquad \int \frac{dx}{\sqrt{1+x^2}} = \operatorname{arsinh} x = \ln(x+\sqrt{1+x^2}).$$

$$\int \frac{dx}{\sqrt{x^2-1}} = \operatorname{arcosh}|x| = \ln|x+\sqrt{x^2-1}|\ (|x|>1).$$

$$\int \frac{dx}{x^2 - a^2} = \frac{1}{2a}\ln\Bigl|\frac{x-a}{x+a}\Bigr|,\qquad \int \frac{dx}{x^2+a^2} = \frac{1}{a}\arctan\frac{x}{a}.$$

$$\int \frac{dx}{\sqrt{a^2-x^2}} = \arcsin\frac{x}{a},\qquad \int \frac{dx}{\sqrt{x^2 \pm a^2}} = \ln|x + \sqrt{x^2\pm a^2}|.$$

### Powers times logarithm or exponential

$$\int \ln x\,dx = x\ln x - x,\qquad \int x\ln x\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4}.$$

$$\int x e^x\,dx = (x-1)e^x,\qquad \int x^2 e^x\,dx = (x^2-2x+2)e^x.$$

$$\int e^{ax}\sin(bx)\,dx = \frac{e^{ax}}{a^2+b^2}(a\sin bx - b\cos bx).$$
$$\int e^{ax}\cos(bx)\,dx = \frac{e^{ax}}{a^2+b^2}(a\cos bx + b\sin bx).$$

### Powers of trig functions

$$\int \sin^2 x\,dx = \frac{x}{2} - \frac{\sin 2x}{4},\qquad \int \cos^2 x\,dx = \frac{x}{2} + \frac{\sin 2x}{4}.$$

$$\int \sin^n x\,dx = -\frac{\sin^{n-1}x\cos x}{n} + \frac{n-1}{n}\int \sin^{n-2}x\,dx\ (n\ge 2).$$

### Roots and trigonometric substitutions
$$\int \sqrt{a^2-x^2}\,dx = \frac{x\sqrt{a^2-x^2}}{2} + \frac{a^2}{2}\arcsin\frac{x}{a}.$$
$$\int \sqrt{x^2+a^2}\,dx = \frac{x\sqrt{x^2+a^2}}{2} + \frac{a^2}{2}\operatorname{arsinh}\frac{x}{a}.$$
$$\int \sqrt{x^2-a^2}\,dx = \frac{x\sqrt{x^2-a^2}}{2} - \frac{a^2}{2}\ln|x+\sqrt{x^2-a^2}|.$$

### Integration techniques cheat-sheet
- **By parts**: $\int u\,dv = uv - \int v\,du$.
- **Substitution**: $\int f(g(x))g'(x)\,dx = \int f(u)\,du$ with $u=g(x)$.
- **Partial fractions**: for proper rational $P/Q$, decompose using factorisation of $Q$.
- **Weierstrass $t = \tan(x/2)$**: $\sin x = 2t/(1+t^2)$, $\cos x = (1-t^2)/(1+t^2)$, $dx = 2\,dt/(1+t^2)$.

---

## 7. Trigonometric identities

### Pythagoras
$$\sin^2 x + \cos^2 x = 1,\quad 1 + \tan^2 x = \sec^2 x,\quad 1 + \cot^2 x = \csc^2 x.$$

### Addition formulae
$$\sin(x\pm y) = \sin x\cos y \pm \cos x \sin y,\quad \cos(x\pm y) = \cos x\cos y \mp \sin x \sin y.$$
$$\tan(x\pm y) = \frac{\tan x \pm \tan y}{1\mp \tan x \tan y}.$$

### Double-angle
$$\sin 2x = 2\sin x\cos x,\quad \cos 2x = \cos^2 x - \sin^2 x = 1-2\sin^2 x = 2\cos^2 x - 1.$$
$$\tan 2x = \frac{2\tan x}{1-\tan^2 x}.$$

### Half-angle
$$\sin^2 \frac{x}{2} = \frac{1-\cos x}{2},\quad \cos^2 \frac{x}{2} = \frac{1+\cos x}{2},\quad \tan\frac{x}{2} = \frac{\sin x}{1+\cos x} = \frac{1-\cos x}{\sin x}.$$

### Triple-angle
$$\sin 3x = 3\sin x - 4\sin^3 x,\quad \cos 3x = 4\cos^3 x - 3\cos x.$$

### Sum-to-product (prosthaphaeresis)
$$\sin x + \sin y = 2\sin\frac{x+y}{2}\cos\frac{x-y}{2},\quad \sin x - \sin y = 2\cos\frac{x+y}{2}\sin\frac{x-y}{2}.$$
$$\cos x + \cos y = 2\cos\frac{x+y}{2}\cos\frac{x-y}{2},\quad \cos x - \cos y = -2\sin\frac{x+y}{2}\sin\frac{x-y}{2}.$$

### Product-to-sum
$$2\sin x\sin y = \cos(x-y) - \cos(x+y),\quad 2\cos x\cos y = \cos(x-y) + \cos(x+y).$$
$$2\sin x\cos y = \sin(x+y) + \sin(x-y).$$

### Power-reduction
$$\sin^2 x = \frac{1-\cos 2x}{2},\quad \cos^2 x = \frac{1+\cos 2x}{2},\quad \sin^3 x = \frac{3\sin x - \sin 3x}{4}.$$

### Weierstrass substitution
With $t = \tan(x/2)$:
$$\sin x = \frac{2t}{1+t^2},\quad \cos x = \frac{1-t^2}{1+t^2},\quad \tan x = \frac{2t}{1-t^2}.$$

---

## 8. Hyperbolic identities

### Definitions
$$\sinh x = \frac{e^x - e^{-x}}{2},\quad \cosh x = \frac{e^x + e^{-x}}{2},\quad \tanh x = \frac{\sinh x}{\cosh x}.$$

### Pythagoras-like
$$\cosh^2 x - \sinh^2 x = 1,\quad \operatorname{sech}^2 x = 1 - \tanh^2 x,\quad \operatorname{csch}^2 x = \coth^2 x - 1.$$

### Addition
$$\sinh(x\pm y) = \sinh x\cosh y \pm \cosh x\sinh y,\quad \cosh(x\pm y) = \cosh x\cosh y \pm \sinh x\sinh y.$$

### Double-angle
$$\sinh 2x = 2\sinh x\cosh x,\quad \cosh 2x = \cosh^2 x + \sinh^2 x = 1+2\sinh^2 x = 2\cosh^2 x - 1.$$

### Inverse hyperbolic
$$\operatorname{arsinh} x = \ln(x+\sqrt{x^2+1}),\quad \operatorname{arcosh} x = \ln(x+\sqrt{x^2-1})\ (x\ge 1).$$
$$\operatorname{artanh} x = \frac{1}{2}\ln\frac{1+x}{1-x}\ (|x|<1).$$

---

## 9. Euler's formulas

$$e^{ix} = \cos x + i\sin x,\quad e^{-ix} = \cos x - i\sin x.$$

$$\cos x = \frac{e^{ix}+e^{-ix}}{2},\quad \sin x = \frac{e^{ix}-e^{-ix}}{2i}.$$

$$\cosh x = \cos(ix),\quad \sinh x = -i\sin(ix).$$

**De Moivre**: $(\cos x + i\sin x)^n = \cos(nx) + i\sin(nx)$ for $n\in\mathbb{Z}$.

**Euler's identity** (special case at $x=\pi$): $e^{i\pi} + 1 = 0$.

---

## 10. Sums of notable series

### Geometric and arithmetic
$$\sum_{n=0}^\infty x^n = \frac{1}{1-x}\ (|x|<1),\qquad \sum_{n=0}^{N-1} x^n = \frac{1-x^N}{1-x}.$$
$$\sum_{n=1}^N n = \frac{N(N+1)}{2},\quad \sum_{n=1}^N n^2 = \frac{N(N+1)(2N+1)}{6},\quad \sum_{n=1}^N n^3 = \Bigl(\frac{N(N+1)}{2}\Bigr)^2.$$

### Basel problem and zeta-2k

$$\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6},\quad \sum_{n=1}^\infty \frac{1}{n^4} = \frac{\pi^4}{90},\quad \sum_{n=1}^\infty \frac{1}{n^6} = \frac{\pi^6}{945}.$$

In general $\zeta(2k) = (-1)^{k+1} \dfrac{(2\pi)^{2k} B_{2k}}{2(2k)!}$, with $B_{2k}$ Bernoulli numbers.

### Alternating sums

$$\sum_{n=1}^\infty \frac{(-1)^{n+1}}{n} = \ln 2,\quad \sum_{n=0}^\infty \frac{(-1)^n}{2n+1} = \frac{\pi}{4},\quad \sum_{n=1}^\infty \frac{(-1)^{n+1}}{n^2} = \frac{\pi^2}{12}.$$

### Telescoping

$$\sum_{n=1}^\infty \frac{1}{n(n+1)} = 1,\quad \sum_{n=1}^\infty \frac{1}{n(n+1)(n+2)} = \frac{1}{4}.$$

### Exponential and trigonometric series

$$\sum_{n=0}^\infty \frac{x^n}{n!} = e^x,\quad \sum_{n=0}^\infty \frac{(-1)^n x^{2n}}{(2n)!} = \cos x,\quad \sum_{n=0}^\infty \frac{(-1)^n x^{2n+1}}{(2n+1)!} = \sin x.$$

### Harmonic-type
$$H_N = \sum_{n=1}^N \frac{1}{n} = \ln N + \gamma + \frac{1}{2N} - \frac{1}{12 N^2} + O(N^{-4}).$$

### Wallis product
$$\frac{\pi}{2} = \prod_{n=1}^\infty \frac{4 n^2}{4n^2 - 1} = \frac{2\cdot 2}{1\cdot 3}\cdot \frac{4\cdot 4}{3\cdot 5}\cdot \frac{6\cdot 6}{5\cdot 7}\cdots$$

---

## 11. Gamma function and factorial

### Definitions and basic identities
$$\Gamma(s) = \int_0^\infty t^{s-1} e^{-t}\,dt,\quad \Re s > 0.$$
$$\Gamma(s+1) = s\,\Gamma(s),\quad \Gamma(n+1) = n!\ (n\in\mathbb{N}).$$

### Reflection and duplication
$$\Gamma(s)\Gamma(1-s) = \frac{\pi}{\sin(\pi s)},\quad \Gamma(s)\Gamma(s+\tfrac{1}{2}) = \frac{\sqrt\pi}{2^{2s-1}}\,\Gamma(2s).$$

### Half-integer values
$$\Gamma(\tfrac{1}{2}) = \sqrt\pi,\quad \Gamma(\tfrac{3}{2}) = \tfrac{\sqrt\pi}{2},\quad \Gamma(\tfrac{5}{2}) = \tfrac{3\sqrt\pi}{4},\quad \Gamma(n+\tfrac{1}{2}) = \frac{(2n)!}{4^n n!}\sqrt\pi.$$

### Stirling (asymptotic at $+\infty$)
$$\Gamma(s) \sim \sqrt{\frac{2\pi}{s}}\Bigl(\frac{s}{e}\Bigr)^s,\quad n!\sim \sqrt{2\pi n}\Bigl(\frac{n}{e}\Bigr)^n.$$

### Beta function (companion)
$$B(p,q) = \int_0^1 t^{p-1}(1-t)^{q-1}\,dt = \frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}.$$

---

## 12. ODE solution schemas

### 12.1 Separable
$y' = f(x)g(y)$ with $g(y_0)\ne 0$:
$$\int \frac{dy}{g(y)} = \int f(x)\,dx + C.$$

### 12.2 First-order linear
$y' + p(x)y = q(x)$: integrating factor $\mu(x) = \exp(\int p\,dx)$.
$$y(x) = \mu(x)^{-1}\Bigl(\int \mu(x) q(x)\,dx + C\Bigr).$$

### 12.3 Bernoulli
$y' + p(x) y = q(x) y^\alpha$, $\alpha\ne 0,1$. Substitute $v = y^{1-\alpha}$:
$$v' + (1-\alpha) p(x) v = (1-\alpha) q(x).$$
Now linear in $v$.

### 12.4 Exact
$M(x,y)\,dx + N(x,y)\,dy = 0$ exact iff $\partial M/\partial y = \partial N/\partial x$. Solution: $F(x,y)=C$ with $F_x=M$, $F_y=N$. Find $F$ by integration.

### 12.5 Homogeneous (degree 0)
$y' = f(y/x)$. Substitute $v = y/x$, so $y' = v + x v'$:
$$x v' = f(v) - v \implies \int \frac{dv}{f(v)-v} = \ln|x| + C.$$

### 12.6 Linear ODEs with constant coefficients, second order
$y'' + p y' + q y = 0$. Characteristic polynomial $\lambda^2 + p\lambda + q = 0$, roots $\lambda_1,\lambda_2$.

- **Distinct real**: $y = c_1 e^{\lambda_1 x} + c_2 e^{\lambda_2 x}$.
- **Repeated real**: $y = (c_1 + c_2 x) e^{\lambda x}$.
- **Complex** $\lambda = \alpha\pm i\beta$: $y = e^{\alpha x}(c_1\cos\beta x + c_2\sin\beta x)$.

### 12.7 Non-homogeneous: undetermined coefficients
For $y'' + py' + qy = g(x)$ with $g$ of special form, try a particular solution of the same form:

| $g(x)$ | Trial $y_p$ |
|---|---|
| $P_n(x)$ polynomial | $Q_n(x)$ polynomial (same degree), $\times x^k$ if $0$ is a root |
| $e^{\alpha x} P_n(x)$ | $e^{\alpha x} Q_n(x)$, $\times x^k$ if $\alpha$ is a root of mult. $k$ |
| $e^{\alpha x}(A\cos\beta x + B\sin\beta x)$ | $e^{\alpha x}(C\cos\beta x + D\sin\beta x)$, $\times x^k$ if $\alpha\pm i\beta$ is a root |

### 12.8 Variation of parameters
For $y'' + p y' + q y = g(x)$ with homogeneous basis $y_1,y_2$:
$$y_p = -y_1 \int \frac{y_2 g}{W}\,dx + y_2 \int \frac{y_1 g}{W}\,dx,\quad W = y_1 y_2' - y_1' y_2 \text{ (Wronskian)}.$$

### 12.9 Euler equation
$x^2 y'' + a x y' + b y = 0$. Substitute $x = e^t$ (assume $x>0$), so $\frac{d}{dt} = x\frac{d}{dx}$, reducing to constant-coefficient linear.

### 12.10 First-order non-linear: separation, exact, Bernoulli, Riccati
For **Riccati** $y' = a(x) + b(x) y + c(x) y^2$: knowing one particular solution $y_1$, substitute $y = y_1 + 1/v$ to obtain a linear ODE in $v$.

---

## 13. Useful theorems compressed

### Fundamental Theorem of Calculus
Let $f$ be continuous on $[a,b]$. Then $F(x) = \int_a^x f(t)\,dt$ is differentiable on $(a,b)$ with $F'(x) = f(x)$. Furthermore $\int_a^b f(t)\,dt = G(b) - G(a)$ for any antiderivative $G$ of $f$.

### Mean Value Theorem (Lagrange)
$f$ continuous on $[a,b]$, differentiable on $(a,b)$: $\exists\xi\in(a,b): f'(\xi) = (f(b)-f(a))/(b-a)$.

### L'Hôpital's rule
For indeterminate forms $0/0$ or $\infty/\infty$, if $g'\ne 0$ near $x_0$ and $\lim f'/g' = L$, then $\lim f/g = L$. Applicable only under hypothesis.

### Cauchy condensation test
For $a_n\ge 0$ monotone decreasing: $\sum a_n$ converges iff $\sum 2^k a_{2^k}$ converges.

### Comparison and limit comparison
For $a_n,b_n\ge 0$: if $a_n\le b_n$ and $\sum b_n<\infty$ then $\sum a_n<\infty$. If $a_n/b_n\to L\in(0,\infty)$ then $\sum a_n$ and $\sum b_n$ have the same character.

### Cauchy-Hadamard
For $\sum a_n (x-x_0)^n$: $R = 1/\limsup |a_n|^{1/n}$, with $R=+\infty$ if the limsup is $0$ and $R=0$ if it is $+\infty$.

### Picard-Lindelöf
For $y'=f(x,y)$, $y(x_0)=y_0$ with $f$ continuous in $x$ and Lipschitz in $y$ on a rectangle: unique solution on a neighbourhood of $x_0$.

---

## 14. Constants in one place

$$e \approx 2.71828182846,\quad \pi \approx 3.14159265359,\quad \gamma \approx 0.57721566490.$$
$$\ln 2 \approx 0.69314718056,\quad \ln 10 \approx 2.30258509299,\quad \sqrt 2 \approx 1.41421356237.$$

---

## How to use this formulary

1. **Derive each formula at least once.** A formulary is for retrieval, not for first-time learning.
2. **Mark the formulae you keep forgetting.** Those need targeted drill, not browsing.
3. **In the exam, write the relevant ones at the top of the page before you start.** It costs thirty seconds and saves a panic later.
4. **Do not memorise what you can re-derive in ten seconds.** Half of these identities follow from one or two principles (Euler's formula, integration by parts, completing the square).
