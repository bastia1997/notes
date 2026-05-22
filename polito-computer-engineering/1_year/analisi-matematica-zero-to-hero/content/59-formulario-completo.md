---
title: Formulario completo di Analisi Matematica I
area: Reference
summary: "Tutte le formule che servono, in tabelle ben organizzate. Disuguaglianze, limiti notevoli, derivate, primitive, sviluppi di Taylor, identità trigonometriche e iperboliche, serie notevoli, schemi EDO."
order: 59
level: avanzato
prereq:
  - "Le sezioni precedenti"
tools:
  - "Gradshteyn-Ryzhik (tavola integrali)"
  - "Abramowitz-Stegun"
---

# Formulario completo di Analisi Matematica I

Questo è il **formulario di riferimento** del corso. È pensato come tavola da consultare durante esercitazioni, compiti e ripassi: tutte le formule fondamentali in un unico posto, organizzate per argomento e con la stessa notazione usata nelle sezioni teoriche.

Convenzioni:

- $\mathbb{N}=\{0,1,2,\dots\}$, $\mathbb{N}^*=\mathbb{N}\setminus\{0\}$, $\mathbb{R}^*=\mathbb{R}\setminus\{0\}$, $\mathbb{R}_+=[0,+\infty)$.
- $\log$ indica il logaritmo naturale (in base $e$) salvo precisazione; $\log_a$ è il logaritmo in base $a$.
- $\alpha, \beta$ esponenti reali; $n$ intero naturale; $a,b,c$ costanti reali (positive quando il contesto lo richiede).
- $f \sim g$ in $x_0$ significa $\lim_{x\to x_0} f(x)/g(x)=1$.
- $o(\cdot)$, $O(\cdot)$ sono i simboli di Landau ($o$ piccolo: trascurabile; $O$ grande: stesso ordine o inferiore).
- $C$ è la costante arbitraria nelle primitive indefinite.

---

## 1. Disuguaglianze fondamentali

### 1.1 Disuguaglianze del valore assoluto

| Disuguaglianza | Validità |
|---|---|
| $|x|\geq 0$, $|x|=0 \iff x=0$ | $\forall x\in\mathbb{R}$ |
| $|xy|=|x|\,|y|$ | $\forall x,y\in\mathbb{R}$ |
| $|x+y|\leq |x|+|y|$ (triangolare) | $\forall x,y\in\mathbb{R}$ |
| $\big||x|-|y|\big|\leq |x-y|$ (triangolare inversa) | $\forall x,y\in\mathbb{R}$ |
| $|x|<a \iff -a<x<a$ | $a>0$ |
| $|x|>a \iff x<-a \ \lor\ x>a$ | $a>0$ |
| $|x|\leq a \iff -a\leq x\leq a$ | $a\geq 0$ |
| $\sqrt{x^2}=|x|$ | $\forall x\in\mathbb{R}$ |

### 1.2 Disuguaglianza di Bernoulli

| Forma | Ipotesi |
|---|---|
| $(1+x)^n \geq 1+nx$ | $x>-1$, $n\in\mathbb{N}$, $n\geq 1$ |
| $(1+x)^\alpha \geq 1+\alpha x$ | $x>-1$, $\alpha\in\mathbb{R}$, $\alpha\leq 0$ oppure $\alpha\geq 1$ |
| $(1+x)^\alpha \leq 1+\alpha x$ | $x>-1$, $0\leq \alpha \leq 1$ |
| Uguaglianza | $x=0$ oppure $\alpha\in\{0,1\}$ |

### 1.3 Medie e disuguaglianza AM-GM-HM-QM

Per $a_1,\dots,a_n>0$ si definiscono:

$$
H_n=\frac{n}{\sum_{k=1}^n 1/a_k},\quad
G_n=\sqrt[n]{a_1 a_2 \cdots a_n},\quad
A_n=\frac{a_1+\cdots+a_n}{n},\quad
Q_n=\sqrt{\frac{a_1^2+\cdots+a_n^2}{n}}.
$$

Vale la **catena delle medie**:

$$
H_n \leq G_n \leq A_n \leq Q_n,
$$

con uguaglianza se e solo se $a_1=a_2=\cdots=a_n$.

Caso $n=2$:

$$
\frac{2ab}{a+b}\leq \sqrt{ab}\leq \frac{a+b}{2}\leq \sqrt{\frac{a^2+b^2}{2}}.
$$

### 1.4 Cauchy-Schwarz, Hölder, Minkowski

| Disuguaglianza | Enunciato | Spazio |
|---|---|---|
| Cauchy-Schwarz | $\left|\sum_{k=1}^n a_k b_k\right|\leq \sqrt{\sum_{k=1}^n a_k^2}\sqrt{\sum_{k=1}^n b_k^2}$ | $\mathbb{R}^n$ |
| Cauchy-Schwarz integrale | $\left|\int_a^b f g\, dx\right|\leq \sqrt{\int_a^b f^2\, dx}\sqrt{\int_a^b g^2\, dx}$ | $L^2[a,b]$ |
| Young | $ab \leq \dfrac{a^p}{p}+\dfrac{b^q}{q}$, $a,b\geq 0$, $\tfrac{1}{p}+\tfrac{1}{q}=1$, $p,q>1$ | $\mathbb{R}_+$ |
| Hölder | $\sum |a_k b_k| \leq \left(\sum |a_k|^p\right)^{1/p}\left(\sum |b_k|^q\right)^{1/q}$ | $\ell^p, \ell^q$ |
| Hölder integrale | $\int |fg| \leq \|f\|_p \cdot \|g\|_q$ | $L^p, L^q$ |
| Minkowski | $\left(\sum |a_k+b_k|^p\right)^{1/p}\leq \left(\sum |a_k|^p\right)^{1/p}+\left(\sum |b_k|^p\right)^{1/p}$ | $\ell^p$, $p\geq 1$ |

### 1.5 Equazioni e disequazioni quadratiche

Per $ax^2+bx+c=0$ con $a\neq 0$:

$$
x_{1,2}=\frac{-b\pm \sqrt{b^2-4ac}}{2a},\qquad \Delta=b^2-4ac.
$$

| Segno di $\Delta$ | Soluzioni |
|---|---|
| $\Delta>0$ | due reali distinte |
| $\Delta=0$ | una reale doppia $x=-b/(2a)$ |
| $\Delta<0$ | due complesse coniugate |

Relazioni di Viète: $x_1+x_2=-b/a$, $x_1 x_2=c/a$.

| Segno di $ax^2+bx+c$ | Risultato (con $a>0$) |
|---|---|
| $\Delta>0$, $x_1<x_2$ | $>0$ per $x<x_1\lor x>x_2$; $<0$ per $x_1<x<x_2$ |
| $\Delta=0$ | $\geq 0$ ovunque, $=0$ solo in $x_1$ |
| $\Delta<0$ | $>0$ per ogni $x$ |

### 1.6 Disuguaglianze classiche utili

| Formula | Validità |
|---|---|
| $\sin x \leq x$ | $x\geq 0$ |
| $|\sin x|\leq |x|$ | $x\in\mathbb{R}$ |
| $\sin x \geq x - x^3/6$ | $x\geq 0$ |
| $\cos x \geq 1 - x^2/2$ | $x\in\mathbb{R}$ |
| $e^x \geq 1+x$ | $x\in\mathbb{R}$ |
| $\log(1+x)\leq x$ | $x>-1$ |
| $\log x \leq x-1$ | $x>0$ |
| $\tan x \geq x$ | $x\in[0,\pi/2)$ |

---

## 2. Limiti notevoli — successioni

Tutti i limiti seguenti sono per $n\to +\infty$.

| Successione | Limite | Note |
|---|---|---|
| $\dfrac{1}{n^\alpha}$ | $0$ | $\alpha>0$ |
| $n^\alpha$ | $+\infty$ | $\alpha>0$ |
| $a^n$ | $0$ se $|a|<1$; $1$ se $a=1$; $+\infty$ se $a>1$; oscilla se $a\leq -1$ | $a\in\mathbb{R}$ |
| $\sqrt[n]{n}=n^{1/n}$ | $1$ | |
| $\sqrt[n]{a}$ | $1$ | $a>0$ |
| $\left(1+\dfrac{1}{n}\right)^n$ | $e$ | definizione di $e$ |
| $\left(1+\dfrac{x}{n}\right)^n$ | $e^x$ | $x\in\mathbb{R}$ |
| $\left(1+\dfrac{1}{n}\right)^{n+1}$ | $e$ | decrescente, $>e$ |
| $\sqrt[n]{n!}$ | $+\infty$ | |
| $\dfrac{\sqrt[n]{n!}}{n}$ | $\dfrac{1}{e}$ | conseguenza di Stirling |
| $\dfrac{a^n}{n!}$ | $0$ | $a\in\mathbb{R}$ |
| $\dfrac{n!}{n^n}$ | $0$ | |
| $\dfrac{(\log n)^\beta}{n^\alpha}$ | $0$ | $\alpha>0$, $\beta\in\mathbb{R}$ |
| $\dfrac{n^\alpha}{a^n}$ | $0$ | $a>1$, $\alpha\in\mathbb{R}$ |
| $\dfrac{a^n}{n^n}$ | $0$ | $a\in\mathbb{R}$ |
| $n!\sim \sqrt{2\pi n}\,(n/e)^n$ | (Stirling) | $n\to\infty$ |
| $\binom{2n}{n}\sim \dfrac{4^n}{\sqrt{\pi n}}$ | | $n\to\infty$ |
| $H_n=\sum_{k=1}^n \dfrac{1}{k}\sim \log n$ | $H_n-\log n\to \gamma$ | $\gamma\approx 0.5772$ |

### 2.1 Gerarchia degli infiniti (successioni)

Per $n\to+\infty$, con $\alpha,\beta>0$ e $a>1$:

$$
\log^\beta n \ \prec\ n^\alpha \ \prec\ a^n \ \prec\ n! \ \prec\ n^n,
$$

dove $f\prec g$ significa $f(n)/g(n)\to 0$.

---

## 3. Limiti notevoli — funzioni

Tutti i limiti seguenti sono per $x\to 0$ salvo diversa indicazione.

### 3.1 Trigonometrici

| Limite | Valore |
|---|---|
| $\lim_{x\to 0}\dfrac{\sin x}{x}$ | $1$ |
| $\lim_{x\to 0}\dfrac{1-\cos x}{x^2}$ | $\dfrac{1}{2}$ |
| $\lim_{x\to 0}\dfrac{1-\cos x}{x}$ | $0$ |
| $\lim_{x\to 0}\dfrac{\tan x}{x}$ | $1$ |
| $\lim_{x\to 0}\dfrac{\arcsin x}{x}$ | $1$ |
| $\lim_{x\to 0}\dfrac{\arctan x}{x}$ | $1$ |
| $\lim_{x\to 0}\dfrac{x-\sin x}{x^3}$ | $\dfrac{1}{6}$ |
| $\lim_{x\to 0}\dfrac{\tan x - x}{x^3}$ | $\dfrac{1}{3}$ |
| $\lim_{x\to 0}\dfrac{\arctan x - x}{x^3}$ | $-\dfrac{1}{3}$ |

### 3.2 Esponenziali e logaritmici

| Limite | Valore |
|---|---|
| $\lim_{x\to 0}\dfrac{e^x-1}{x}$ | $1$ |
| $\lim_{x\to 0}\dfrac{a^x-1}{x}$ | $\log a$ |
| $\lim_{x\to 0}\dfrac{\log(1+x)}{x}$ | $1$ |
| $\lim_{x\to 0}\dfrac{\log_a(1+x)}{x}$ | $\dfrac{1}{\log a}$ |
| $\lim_{x\to 0}\dfrac{(1+x)^\alpha-1}{x}$ | $\alpha$ |
| $\lim_{x\to +\infty}\left(1+\dfrac{1}{x}\right)^x$ | $e$ |
| $\lim_{x\to 0}(1+x)^{1/x}$ | $e$ |
| $\lim_{x\to +\infty}\dfrac{\log x}{x^\alpha}$ | $0$ se $\alpha>0$ |
| $\lim_{x\to +\infty}\dfrac{x^\alpha}{e^x}$ | $0$ se $\alpha\in\mathbb{R}$ |
| $\lim_{x\to 0^+} x^\alpha \log x$ | $0$ se $\alpha>0$ |
| $\lim_{x\to 0^+} x^x$ | $1$ |
| $\lim_{x\to +\infty} x^{1/x}$ | $1$ |

### 3.3 Iperbolici

| Limite | Valore |
|---|---|
| $\lim_{x\to 0}\dfrac{\sinh x}{x}$ | $1$ |
| $\lim_{x\to 0}\dfrac{\cosh x - 1}{x^2}$ | $\dfrac{1}{2}$ |
| $\lim_{x\to 0}\dfrac{\tanh x}{x}$ | $1$ |
| $\lim_{x\to 0}\dfrac{\text{arcsinh}\, x}{x}$ | $1$ |
| $\lim_{x\to 0}\dfrac{\text{arctanh}\, x}{x}$ | $1$ |

---

## 4. Confronto fra ordini di infinito e di infinitesimo

### 4.1 Gerarchia generale (per $x\to +\infty$)

$$
(\log x)^\beta \ \prec\ x^\alpha \ \prec\ a^x \ \prec\ x! \ \prec\ x^x,
$$

con $\alpha,\beta>0$ e $a>1$. Vale anche $\log^\beta x \ll x^{1/n}$ per ogni $n\in\mathbb{N}^*$.

### 4.2 Stime asintotiche standard ($x\to 0$)

| Funzione | $\sim$ | Resto di Peano |
|---|---|---|
| $\sin x$ | $x$ | $x - x^3/6 + o(x^4)$ |
| $1-\cos x$ | $x^2/2$ | $x^2/2 - x^4/24 + o(x^5)$ |
| $\tan x$ | $x$ | $x + x^3/3 + o(x^4)$ |
| $\arcsin x$ | $x$ | $x + x^3/6 + o(x^4)$ |
| $\arctan x$ | $x$ | $x - x^3/3 + o(x^4)$ |
| $e^x - 1$ | $x$ | $x + x^2/2 + o(x^2)$ |
| $\log(1+x)$ | $x$ | $x - x^2/2 + o(x^2)$ |
| $(1+x)^\alpha - 1$ | $\alpha x$ | $\alpha x + \tfrac{\alpha(\alpha-1)}{2}x^2 + o(x^2)$ |
| $\sinh x$ | $x$ | $x + x^3/6 + o(x^4)$ |
| $\cosh x - 1$ | $x^2/2$ | $x^2/2 + x^4/24 + o(x^5)$ |

### 4.3 Stime asintotiche standard ($x\to +\infty$)

| Espressione | $\sim$ |
|---|---|
| $\log(1+x)$ | $\log x$ |
| $\sqrt{x^2+1}$ | $x$ |
| $\sqrt{x^2+ax+b}$ | $x+a/2 + o(1)$ |
| $\sqrt[n]{x^n+P_{n-1}(x)}$ | $x + \tfrac{a_{n-1}}{n} + o(1)$ |
| $\Gamma(x+1)=x!$ | $\sqrt{2\pi x}\,(x/e)^x$ |
| $\binom{2n}{n}$ | $4^n/\sqrt{\pi n}$ |

### 4.4 Algebra dei simboli di Landau

| Regola | Formula |
|---|---|
| Somma stesso ordine | $o(x^n)+o(x^n)=o(x^n)$ |
| Prodotto | $o(x^m)\cdot o(x^n)=o(x^{m+n})$ |
| Prodotto per potenza | $x^m\cdot o(x^n)=o(x^{m+n})$ |
| Costante | $c\cdot o(x^n)=o(x^n)$ se $c\neq 0$ |
| Inclusione | $o(x^n)\subset o(x^m)$ per $n>m$ (in $x\to 0$) |
| Equivalente | $f\sim g \iff f=g+o(g)$ |

---

## 5. Derivate elementari

Funzioni di una variabile reale, derivate rispetto a $x$.

### 5.1 Funzioni algebriche

| $f(x)$ | $f'(x)$ | Dominio di derivabilità |
|---|---|---|
| $c$ (costante) | $0$ | $\mathbb{R}$ |
| $x$ | $1$ | $\mathbb{R}$ |
| $x^\alpha$ | $\alpha x^{\alpha-1}$ | $\alpha\in\mathbb{R}$ (dominio dipende) |
| $\sqrt{x}$ | $\dfrac{1}{2\sqrt{x}}$ | $x>0$ |
| $\sqrt[n]{x}$ | $\dfrac{1}{n}\, x^{1/n - 1}$ | secondo $n$ pari/dispari |
| $\dfrac{1}{x}$ | $-\dfrac{1}{x^2}$ | $x\neq 0$ |
| $|x|$ | $\operatorname{sgn}(x)$ | $x\neq 0$ |

### 5.2 Esponenziali e logaritmiche

| $f(x)$ | $f'(x)$ |
|---|---|
| $e^x$ | $e^x$ |
| $a^x$ | $a^x \log a$ ($a>0$) |
| $\log x$ | $\dfrac{1}{x}$ ($x>0$) |
| $\log|x|$ | $\dfrac{1}{x}$ ($x\neq 0$) |
| $\log_a x$ | $\dfrac{1}{x \log a}$ ($x>0$, $a>0$, $a\neq 1$) |
| $x^x$ | $x^x(\log x + 1)$ ($x>0$) |
| $f(x)^{g(x)}$ | $f^g\!\left(g'\log f + \dfrac{g f'}{f}\right)$ |

### 5.3 Trigonometriche

| $f(x)$ | $f'(x)$ |
|---|---|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x = 1+\tan^2 x = \dfrac{1}{\cos^2 x}$ |
| $\cot x$ | $-\csc^2 x = -(1+\cot^2 x) = -\dfrac{1}{\sin^2 x}$ |
| $\sec x = 1/\cos x$ | $\sec x \tan x$ |
| $\csc x = 1/\sin x$ | $-\csc x \cot x$ |

### 5.4 Inverse trigonometriche

| $f(x)$ | $f'(x)$ | Dominio |
|---|---|---|
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ | $|x|<1$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ | $|x|<1$ |
| $\arctan x$ | $\dfrac{1}{1+x^2}$ | $\mathbb{R}$ |
| $\text{arccot}\, x$ | $-\dfrac{1}{1+x^2}$ | $\mathbb{R}$ |
| $\text{arcsec}\, x$ | $\dfrac{1}{|x|\sqrt{x^2-1}}$ | $|x|>1$ |
| $\text{arccsc}\, x$ | $-\dfrac{1}{|x|\sqrt{x^2-1}}$ | $|x|>1$ |

### 5.5 Iperboliche

| $f(x)$ | $f'(x)$ |
|---|---|
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $\text{sech}^2 x = 1-\tanh^2 x = \dfrac{1}{\cosh^2 x}$ |
| $\coth x$ | $-\text{csch}^2 x = 1-\coth^2 x$ |
| $\text{sech}\, x$ | $-\text{sech}\, x\, \tanh x$ |
| $\text{csch}\, x$ | $-\text{csch}\, x\, \coth x$ |

### 5.6 Inverse iperboliche

| $f(x)$ | $f'(x)$ | Dominio |
|---|---|---|
| $\text{arcsinh}\, x = \log(x+\sqrt{x^2+1})$ | $\dfrac{1}{\sqrt{x^2+1}}$ | $\mathbb{R}$ |
| $\text{arccosh}\, x = \log(x+\sqrt{x^2-1})$ | $\dfrac{1}{\sqrt{x^2-1}}$ | $x>1$ |
| $\text{arctanh}\, x = \tfrac{1}{2}\log\!\tfrac{1+x}{1-x}$ | $\dfrac{1}{1-x^2}$ | $|x|<1$ |
| $\text{arccoth}\, x = \tfrac{1}{2}\log\!\tfrac{x+1}{x-1}$ | $\dfrac{1}{1-x^2}$ | $|x|>1$ |

### 5.7 Regole di derivazione

| Regola | Formula |
|---|---|
| Linearità | $(\alpha f + \beta g)' = \alpha f' + \beta g'$ |
| Prodotto | $(fg)' = f'g + fg'$ |
| Quoziente | $(f/g)' = (f'g - fg')/g^2$ |
| Catena | $(f\circ g)'(x) = f'(g(x))\cdot g'(x)$ |
| Inversa | $(f^{-1})'(y) = \dfrac{1}{f'(f^{-1}(y))}$ |
| Logaritmica | $(\log|f|)' = f'/f$ |
| Leibniz | $(fg)^{(n)} = \sum_{k=0}^n \binom{n}{k}f^{(k)}g^{(n-k)}$ |
| Parametriche | $\dfrac{dy}{dx} = \dfrac{y'(t)}{x'(t)}$ |
| Implicite | $\dfrac{dy}{dx} = -\dfrac{F_x}{F_y}$ con $F(x,y)=0$ |

---

## 6. Sviluppi di Maclaurin (centrati in $x_0=0$)

Tutti gli sviluppi seguenti valgono per $x\to 0$, con resto di Peano $o(x^n)$.

### 6.1 Esponenziali e logaritmiche

| Funzione | Sviluppo |
|---|---|
| $e^x$ | $1+x+\dfrac{x^2}{2!}+\dfrac{x^3}{3!}+\cdots+\dfrac{x^n}{n!}+o(x^n)$ |
| $a^x = e^{x\log a}$ | $1+(\log a)x+\dfrac{(\log a)^2}{2}x^2+\cdots+\dfrac{(\log a)^n}{n!}x^n+o(x^n)$ |
| $\log(1+x)$ | $x-\dfrac{x^2}{2}+\dfrac{x^3}{3}-\cdots+(-1)^{n-1}\dfrac{x^n}{n}+o(x^n)$ |
| $\log(1-x)$ | $-x-\dfrac{x^2}{2}-\dfrac{x^3}{3}-\cdots-\dfrac{x^n}{n}+o(x^n)$ |
| $\dfrac{1}{2}\log\dfrac{1+x}{1-x}=\text{arctanh}\, x$ | $x+\dfrac{x^3}{3}+\dfrac{x^5}{5}+\cdots+\dfrac{x^{2n+1}}{2n+1}+o(x^{2n+2})$ |

### 6.2 Trigonometriche

| Funzione | Sviluppo |
|---|---|
| $\sin x$ | $x-\dfrac{x^3}{3!}+\dfrac{x^5}{5!}-\cdots+(-1)^n\dfrac{x^{2n+1}}{(2n+1)!}+o(x^{2n+2})$ |
| $\cos x$ | $1-\dfrac{x^2}{2!}+\dfrac{x^4}{4!}-\cdots+(-1)^n\dfrac{x^{2n}}{(2n)!}+o(x^{2n+1})$ |
| $\tan x$ | $x+\dfrac{x^3}{3}+\dfrac{2x^5}{15}+\dfrac{17 x^7}{315}+o(x^8)$ |
| $\arcsin x$ | $x+\dfrac{x^3}{6}+\dfrac{3 x^5}{40}+\dfrac{15 x^7}{336}+o(x^8)$ |
| $\arctan x$ | $x-\dfrac{x^3}{3}+\dfrac{x^5}{5}-\cdots+(-1)^n\dfrac{x^{2n+1}}{2n+1}+o(x^{2n+2})$ |

### 6.3 Iperboliche

| Funzione | Sviluppo |
|---|---|
| $\sinh x$ | $x+\dfrac{x^3}{3!}+\dfrac{x^5}{5!}+\cdots+\dfrac{x^{2n+1}}{(2n+1)!}+o(x^{2n+2})$ |
| $\cosh x$ | $1+\dfrac{x^2}{2!}+\dfrac{x^4}{4!}+\cdots+\dfrac{x^{2n}}{(2n)!}+o(x^{2n+1})$ |
| $\tanh x$ | $x-\dfrac{x^3}{3}+\dfrac{2x^5}{15}-\dfrac{17 x^7}{315}+o(x^8)$ |
| $\text{arcsinh}\, x$ | $x-\dfrac{x^3}{6}+\dfrac{3 x^5}{40}-\dfrac{15 x^7}{336}+o(x^8)$ |

### 6.4 Binomiale e geometrica

| Funzione | Sviluppo |
|---|---|
| $(1+x)^\alpha$ | $1+\alpha x+\dbinom{\alpha}{2}x^2+\cdots+\dbinom{\alpha}{n}x^n+o(x^n)$ |
| $\dfrac{1}{1-x}$ | $1+x+x^2+x^3+\cdots+x^n+o(x^n)$ |
| $\dfrac{1}{1+x}$ | $1-x+x^2-x^3+\cdots+(-1)^n x^n+o(x^n)$ |
| $\dfrac{1}{(1-x)^2}$ | $1+2x+3x^2+\cdots+(n+1)x^n+o(x^n)$ |
| $\dfrac{1}{1+x^2}$ | $1-x^2+x^4-x^6+\cdots+(-1)^n x^{2n}+o(x^{2n+1})$ |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $1+\dfrac{x^2}{2}+\dfrac{3 x^4}{8}+\dfrac{15 x^6}{48}+o(x^7)$ |
| $\sqrt{1+x}$ | $1+\dfrac{x}{2}-\dfrac{x^2}{8}+\dfrac{x^3}{16}-\dfrac{5 x^4}{128}+o(x^4)$ |
| $\dfrac{1}{\sqrt{1+x}}$ | $1-\dfrac{x}{2}+\dfrac{3 x^2}{8}-\dfrac{5 x^3}{16}+\dfrac{35 x^4}{128}+o(x^4)$ |

dove $\dbinom{\alpha}{k}=\dfrac{\alpha(\alpha-1)\cdots(\alpha-k+1)}{k!}$ è il **coefficiente binomiale generalizzato**.

### 6.5 Resto di Lagrange

Se $f\in C^{n+1}$ in un intorno di $x_0$:

$$
f(x)=\sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!}(x-x_0)^k + \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}
$$

per un opportuno $\xi$ fra $x_0$ e $x$.

### 6.6 Composizioni notevoli

| Espressione | Sviluppo per $x\to 0$ |
|---|---|
| $e^{\sin x}$ | $1+x+\dfrac{x^2}{2}-\dfrac{x^4}{8}+o(x^4)$ |
| $\log(\cos x)$ | $-\dfrac{x^2}{2}-\dfrac{x^4}{12}-\dfrac{x^6}{45}+o(x^6)$ |
| $\dfrac{\sin x}{x}$ | $1-\dfrac{x^2}{6}+\dfrac{x^4}{120}+o(x^4)$ |
| $\dfrac{\tan x}{x}$ | $1+\dfrac{x^2}{3}+\dfrac{2 x^4}{15}+o(x^4)$ |

---

## 7. Primitive elementari

Salvo precisazione, tutte le formule valgono in intervalli su cui le funzioni siano definite e continue. $C$ è la costante d'integrazione arbitraria.

### 7.1 Potenze, esponenziali, logaritmi

| Integrale | Risultato |
|---|---|
| $\int x^\alpha\, dx$, $\alpha\neq -1$ | $\dfrac{x^{\alpha+1}}{\alpha+1}+C$ |
| $\int \dfrac{dx}{x}$ | $\log|x|+C$ |
| $\int e^x\, dx$ | $e^x+C$ |
| $\int e^{ax}\, dx$ | $\dfrac{1}{a}e^{ax}+C$ |
| $\int a^x\, dx$ | $\dfrac{a^x}{\log a}+C$ ($a>0$, $a\neq 1$) |
| $\int \log x\, dx$ | $x\log x - x+C$ |
| $\int \log_a x\, dx$ | $\dfrac{x\log x - x}{\log a}+C$ |

### 7.2 Trigonometriche

| Integrale | Risultato |
|---|---|
| $\int \sin x\, dx$ | $-\cos x + C$ |
| $\int \cos x\, dx$ | $\sin x + C$ |
| $\int \tan x\, dx$ | $-\log|\cos x|+C = \log|\sec x|+C$ |
| $\int \cot x\, dx$ | $\log|\sin x|+C$ |
| $\int \sec x\, dx$ | $\log|\sec x + \tan x|+C$ |
| $\int \csc x\, dx$ | $-\log|\csc x + \cot x|+C = \log|\tan(x/2)|+C$ |
| $\int \sec^2 x\, dx$ | $\tan x + C$ |
| $\int \csc^2 x\, dx$ | $-\cot x + C$ |
| $\int \sec x \tan x\, dx$ | $\sec x + C$ |
| $\int \csc x \cot x\, dx$ | $-\csc x + C$ |
| $\int \sin^2 x\, dx$ | $\dfrac{x}{2}-\dfrac{\sin 2x}{4}+C$ |
| $\int \cos^2 x\, dx$ | $\dfrac{x}{2}+\dfrac{\sin 2x}{4}+C$ |
| $\int \tan^2 x\, dx$ | $\tan x - x + C$ |

### 7.3 Iperboliche

| Integrale | Risultato |
|---|---|
| $\int \sinh x\, dx$ | $\cosh x + C$ |
| $\int \cosh x\, dx$ | $\sinh x + C$ |
| $\int \tanh x\, dx$ | $\log(\cosh x)+C$ |
| $\int \coth x\, dx$ | $\log|\sinh x|+C$ |
| $\int \text{sech}^2 x\, dx$ | $\tanh x + C$ |
| $\int \text{csch}^2 x\, dx$ | $-\coth x + C$ |
| $\int \sinh^2 x\, dx$ | $\dfrac{\sinh 2x}{4}-\dfrac{x}{2}+C$ |
| $\int \cosh^2 x\, dx$ | $\dfrac{\sinh 2x}{4}+\dfrac{x}{2}+C$ |

### 7.4 Primitive che danno arctan, arcsin, arctanh

| Integrale | Risultato |
|---|---|
| $\int \dfrac{dx}{1+x^2}$ | $\arctan x + C$ |
| $\int \dfrac{dx}{a^2+x^2}$ | $\dfrac{1}{a}\arctan\dfrac{x}{a}+C$ |
| $\int \dfrac{dx}{\sqrt{1-x^2}}$ | $\arcsin x + C$ |
| $\int \dfrac{dx}{\sqrt{a^2-x^2}}$ | $\arcsin\dfrac{x}{a}+C$ |
| $\int \dfrac{dx}{\sqrt{x^2+1}}$ | $\text{arcsinh}\, x + C = \log(x+\sqrt{x^2+1})+C$ |
| $\int \dfrac{dx}{\sqrt{x^2+a^2}}$ | $\log(x+\sqrt{x^2+a^2})+C$ |
| $\int \dfrac{dx}{\sqrt{x^2-1}}$ | $\text{arccosh}\, x + C = \log(x+\sqrt{x^2-1})+C$ |
| $\int \dfrac{dx}{\sqrt{x^2-a^2}}$ | $\log|x+\sqrt{x^2-a^2}|+C$ |
| $\int \dfrac{dx}{1-x^2}$ | $\text{arctanh}\, x + C = \dfrac{1}{2}\log\!\left|\dfrac{1+x}{1-x}\right|+C$ |
| $\int \dfrac{dx}{a^2-x^2}$ | $\dfrac{1}{2a}\log\!\left|\dfrac{a+x}{a-x}\right|+C$ |
| $\int \dfrac{dx}{x^2-a^2}$ | $\dfrac{1}{2a}\log\!\left|\dfrac{x-a}{x+a}\right|+C$ |

### 7.5 Integrali con radicali quadratici

Per $\int \sqrt{a^2-x^2}\, dx$ ed analoghi:

| Integrale | Risultato |
|---|---|
| $\int \sqrt{a^2-x^2}\, dx$ | $\dfrac{x}{2}\sqrt{a^2-x^2}+\dfrac{a^2}{2}\arcsin\dfrac{x}{a}+C$ |
| $\int \sqrt{x^2+a^2}\, dx$ | $\dfrac{x}{2}\sqrt{x^2+a^2}+\dfrac{a^2}{2}\log(x+\sqrt{x^2+a^2})+C$ |
| $\int \sqrt{x^2-a^2}\, dx$ | $\dfrac{x}{2}\sqrt{x^2-a^2}-\dfrac{a^2}{2}\log|x+\sqrt{x^2-a^2}|+C$ |

### 7.6 Regole generali

| Tecnica | Formula |
|---|---|
| Linearità | $\int (\alpha f+\beta g)\,dx = \alpha\int f\,dx+\beta\int g\,dx$ |
| Sostituzione | $\int f(g(x))g'(x)\,dx = \int f(u)\,du$, $u=g(x)$ |
| Per parti | $\int f g'\,dx = f g - \int f' g\,dx$ |
| Logaritmica | $\int \dfrac{f'(x)}{f(x)}\,dx = \log|f(x)|+C$ |
| Potenza | $\int f(x)^\alpha f'(x)\,dx = \dfrac{f(x)^{\alpha+1}}{\alpha+1}+C$ ($\alpha\neq -1$) |
| Razionali fratte | decomposizione in fratti semplici |
| Trigonometriche | $t=\tan(x/2)$ Weierstrass |
| Razionali in $e^x$ | $t=e^x$ |
| Quadratiche $\sqrt{a^2-x^2}$ | $x=a\sin\theta$ |
| Quadratiche $\sqrt{x^2+a^2}$ | $x=a\tan\theta$ oppure $x=a\sinh t$ |
| Quadratiche $\sqrt{x^2-a^2}$ | $x=a\sec\theta$ oppure $x=a\cosh t$ |

### 7.7 Sostituzione di Weierstrass

Per integrali razionali in $\sin x, \cos x$ si pone $t=\tan(x/2)$, $x\in(-\pi,\pi)$:

$$
\sin x = \frac{2t}{1+t^2},\quad \cos x = \frac{1-t^2}{1+t^2},\quad \tan x = \frac{2t}{1-t^2},\quad dx = \frac{2}{1+t^2}\,dt.
$$

---

## 8. Identità trigonometriche

### 8.1 Identità fondamentali

| Identità | Validità |
|---|---|
| $\sin^2\alpha + \cos^2\alpha = 1$ | $\forall \alpha$ |
| $1+\tan^2\alpha = \sec^2\alpha = 1/\cos^2\alpha$ | $\cos\alpha\neq 0$ |
| $1+\cot^2\alpha = \csc^2\alpha = 1/\sin^2\alpha$ | $\sin\alpha\neq 0$ |
| $\sin(-\alpha) = -\sin\alpha$ | dispari |
| $\cos(-\alpha) = \cos\alpha$ | pari |
| $\tan(-\alpha) = -\tan\alpha$ | dispari |
| $\sin(\alpha+\pi) = -\sin\alpha$ | $\pi$-antiperiodica |
| $\cos(\alpha+\pi) = -\cos\alpha$ | $\pi$-antiperiodica |
| $\sin(\pi/2-\alpha) = \cos\alpha$ | complementarità |
| $\cos(\pi/2-\alpha) = \sin\alpha$ | complementarità |
| $\sin(\pi-\alpha) = \sin\alpha$ | |
| $\cos(\pi-\alpha) = -\cos\alpha$ | |

### 8.2 Somma e differenza

| Formula |
|---|
| $\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$ |
| $\sin(\alpha-\beta) = \sin\alpha\cos\beta - \cos\alpha\sin\beta$ |
| $\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$ |
| $\cos(\alpha-\beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta$ |
| $\tan(\alpha+\beta) = \dfrac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}$ |
| $\tan(\alpha-\beta) = \dfrac{\tan\alpha-\tan\beta}{1+\tan\alpha\tan\beta}$ |
| $\cot(\alpha+\beta) = \dfrac{\cot\alpha\cot\beta-1}{\cot\alpha+\cot\beta}$ |

### 8.3 Duplicazione

| Formula | Equivalenti |
|---|---|
| $\sin 2\alpha = 2\sin\alpha\cos\alpha$ | $= \dfrac{2\tan\alpha}{1+\tan^2\alpha}$ |
| $\cos 2\alpha = \cos^2\alpha-\sin^2\alpha$ | $= 1-2\sin^2\alpha = 2\cos^2\alpha-1 = \dfrac{1-\tan^2\alpha}{1+\tan^2\alpha}$ |
| $\tan 2\alpha = \dfrac{2\tan\alpha}{1-\tan^2\alpha}$ | |
| $\cot 2\alpha = \dfrac{\cot^2\alpha-1}{2\cot\alpha}$ | |

### 8.4 Triplicazione

| Formula |
|---|
| $\sin 3\alpha = 3\sin\alpha - 4\sin^3\alpha$ |
| $\cos 3\alpha = 4\cos^3\alpha - 3\cos\alpha$ |
| $\tan 3\alpha = \dfrac{3\tan\alpha - \tan^3\alpha}{1-3\tan^2\alpha}$ |

### 8.5 Bisezione

| Formula |
|---|
| $\sin\dfrac{\alpha}{2} = \pm\sqrt{\dfrac{1-\cos\alpha}{2}}$ |
| $\cos\dfrac{\alpha}{2} = \pm\sqrt{\dfrac{1+\cos\alpha}{2}}$ |
| $\tan\dfrac{\alpha}{2} = \pm\sqrt{\dfrac{1-\cos\alpha}{1+\cos\alpha}} = \dfrac{1-\cos\alpha}{\sin\alpha} = \dfrac{\sin\alpha}{1+\cos\alpha}$ |

I segni $\pm$ vanno scelti in base al quadrante di $\alpha/2$.

### 8.6 Formule di Werner (prodotto in somma)

| Formula |
|---|
| $\sin\alpha\sin\beta = \dfrac{1}{2}[\cos(\alpha-\beta)-\cos(\alpha+\beta)]$ |
| $\cos\alpha\cos\beta = \dfrac{1}{2}[\cos(\alpha-\beta)+\cos(\alpha+\beta)]$ |
| $\sin\alpha\cos\beta = \dfrac{1}{2}[\sin(\alpha+\beta)+\sin(\alpha-\beta)]$ |
| $\cos\alpha\sin\beta = \dfrac{1}{2}[\sin(\alpha+\beta)-\sin(\alpha-\beta)]$ |

### 8.7 Prostaferesi (somma in prodotto)

| Formula |
|---|
| $\sin p + \sin q = 2\sin\dfrac{p+q}{2}\cos\dfrac{p-q}{2}$ |
| $\sin p - \sin q = 2\cos\dfrac{p+q}{2}\sin\dfrac{p-q}{2}$ |
| $\cos p + \cos q = 2\cos\dfrac{p+q}{2}\cos\dfrac{p-q}{2}$ |
| $\cos p - \cos q = -2\sin\dfrac{p+q}{2}\sin\dfrac{p-q}{2}$ |

### 8.8 Formule parametriche $t=\tan(\alpha/2)$

| Formula |
|---|
| $\sin\alpha = \dfrac{2t}{1+t^2}$ |
| $\cos\alpha = \dfrac{1-t^2}{1+t^2}$ |
| $\tan\alpha = \dfrac{2t}{1-t^2}$ |

### 8.9 Quadrati e potenze (lineari)

| Formula |
|---|
| $\sin^2\alpha = \dfrac{1-\cos 2\alpha}{2}$ |
| $\cos^2\alpha = \dfrac{1+\cos 2\alpha}{2}$ |
| $\sin^3\alpha = \dfrac{3\sin\alpha - \sin 3\alpha}{4}$ |
| $\cos^3\alpha = \dfrac{3\cos\alpha + \cos 3\alpha}{4}$ |
| $\sin^4\alpha = \dfrac{3-4\cos 2\alpha + \cos 4\alpha}{8}$ |
| $\cos^4\alpha = \dfrac{3+4\cos 2\alpha + \cos 4\alpha}{8}$ |

### 8.10 Valori notevoli

| $\alpha$ | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ |
|---|---|---|---|---|---|
| $\sin\alpha$ | $0$ | $1/2$ | $\sqrt{2}/2$ | $\sqrt{3}/2$ | $1$ |
| $\cos\alpha$ | $1$ | $\sqrt{3}/2$ | $\sqrt{2}/2$ | $1/2$ | $0$ |
| $\tan\alpha$ | $0$ | $\sqrt{3}/3$ | $1$ | $\sqrt{3}$ | $\not\exists$ |
| $\cot\alpha$ | $\not\exists$ | $\sqrt{3}$ | $1$ | $\sqrt{3}/3$ | $0$ |

---

## 9. Identità iperboliche

### 9.1 Definizioni in $e^x$

| Funzione | Espressione |
|---|---|
| $\sinh x$ | $\dfrac{e^x - e^{-x}}{2}$ |
| $\cosh x$ | $\dfrac{e^x + e^{-x}}{2}$ |
| $\tanh x$ | $\dfrac{e^x - e^{-x}}{e^x + e^{-x}} = \dfrac{e^{2x}-1}{e^{2x}+1}$ |
| $\coth x$ | $\dfrac{e^x + e^{-x}}{e^x - e^{-x}}$ |
| $\text{sech}\, x$ | $\dfrac{2}{e^x + e^{-x}}$ |
| $\text{csch}\, x$ | $\dfrac{2}{e^x - e^{-x}}$ |

### 9.2 Identità fondamentali

| Formula |
|---|
| $\cosh^2 x - \sinh^2 x = 1$ |
| $1 - \tanh^2 x = \text{sech}^2 x$ |
| $\coth^2 x - 1 = \text{csch}^2 x$ |
| $\sinh(-x) = -\sinh x$ (dispari) |
| $\cosh(-x) = \cosh x$ (pari) |
| $\tanh(-x) = -\tanh x$ (dispari) |

### 9.3 Somma, differenza, duplicazione

| Formula |
|---|
| $\sinh(\alpha\pm\beta) = \sinh\alpha\cosh\beta\pm\cosh\alpha\sinh\beta$ |
| $\cosh(\alpha\pm\beta) = \cosh\alpha\cosh\beta\pm\sinh\alpha\sinh\beta$ |
| $\tanh(\alpha\pm\beta) = \dfrac{\tanh\alpha\pm\tanh\beta}{1\pm\tanh\alpha\tanh\beta}$ |
| $\sinh 2\alpha = 2\sinh\alpha\cosh\alpha$ |
| $\cosh 2\alpha = \cosh^2\alpha + \sinh^2\alpha = 2\cosh^2\alpha - 1 = 1 + 2\sinh^2\alpha$ |
| $\tanh 2\alpha = \dfrac{2\tanh\alpha}{1+\tanh^2\alpha}$ |
| $\sinh^2\alpha = \dfrac{\cosh 2\alpha - 1}{2}$ |
| $\cosh^2\alpha = \dfrac{\cosh 2\alpha + 1}{2}$ |

### 9.4 Inverse iperboliche in forma logaritmica

| Funzione | Espressione |
|---|---|
| $\text{arcsinh}\, x$ | $\log(x+\sqrt{x^2+1})$ |
| $\text{arccosh}\, x$ | $\log(x+\sqrt{x^2-1})$, $x\geq 1$ |
| $\text{arctanh}\, x$ | $\dfrac{1}{2}\log\dfrac{1+x}{1-x}$, $|x|<1$ |
| $\text{arccoth}\, x$ | $\dfrac{1}{2}\log\dfrac{x+1}{x-1}$, $|x|>1$ |

---

## 10. Eulero e numeri complessi

### 10.1 Formula di Eulero

$$
e^{i\theta} = \cos\theta + i\sin\theta,\qquad \theta\in\mathbb{R}.
$$

In particolare:

$$
e^{i\pi}+1 = 0,\qquad e^{i\pi/2}=i,\qquad e^{i 2\pi}=1.
$$

### 10.2 Espressione di seno e coseno

| Formula |
|---|
| $\cos\theta = \dfrac{e^{i\theta}+e^{-i\theta}}{2}$ |
| $\sin\theta = \dfrac{e^{i\theta}-e^{-i\theta}}{2i}$ |
| $\tan\theta = \dfrac{e^{i\theta}-e^{-i\theta}}{i(e^{i\theta}+e^{-i\theta})}$ |
| $\cosh\theta = \cos(i\theta)$ |
| $\sinh\theta = -i\sin(i\theta)$ |

### 10.3 Operazioni sui complessi

Se $z = a+ib = r e^{i\theta} = r(\cos\theta+i\sin\theta)$ con $r=|z|=\sqrt{a^2+b^2}$, $\theta=\arg z$:

| Operazione | Formula |
|---|---|
| Coniugato | $\bar z = a - ib = r e^{-i\theta}$ |
| Modulo | $|z| = \sqrt{z\bar z}$ |
| Reciproco | $1/z = \bar z / |z|^2 = r^{-1} e^{-i\theta}$ |
| Prodotto | $z_1 z_2 = r_1 r_2\, e^{i(\theta_1+\theta_2)}$ |
| Quoziente | $z_1/z_2 = (r_1/r_2)\, e^{i(\theta_1-\theta_2)}$ |
| Potenza intera | $z^n = r^n e^{in\theta}$ |
| Esponenziale | $e^z = e^a(\cos b + i\sin b)$ |
| Logaritmo | $\log z = \log|z| + i\arg z + 2\pi i k$ |

### 10.4 De Moivre

$$
(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta),\qquad n\in\mathbb{Z}.
$$

### 10.5 Radici n-esime

Le **radici n-esime** di $w=R\,e^{i\varphi}$ con $w\neq 0$ sono $n$ valori distinti:

$$
z_k = R^{1/n}\, e^{i(\varphi + 2\pi k)/n},\qquad k=0,1,\dots,n-1.
$$

Geometricamente: vertici di un poligono regolare di $n$ lati centrato in $0$, inscritto nel cerchio di raggio $R^{1/n}$.

### 10.6 Radici n-esime dell'unità

Le $n$ soluzioni di $z^n=1$ sono:

$$
\omega_k = e^{i 2\pi k/n},\qquad k=0,1,\dots,n-1.
$$

Proprietà:

| Proprietà | Formula |
|---|---|
| Somma | $\sum_{k=0}^{n-1}\omega_k = 0$ ($n\geq 2$) |
| Prodotto | $\prod_{k=0}^{n-1}\omega_k = (-1)^{n-1}$ |
| Radice primitiva | $\omega = e^{i 2\pi/n}$, $\omega_k = \omega^k$ |

### 10.7 Teorema fondamentale dell'algebra

Ogni polinomio $p(z) = a_n z^n + a_{n-1} z^{n-1} + \cdots + a_0$ con $a_n\neq 0$ e coefficienti in $\mathbb{C}$ ha esattamente $n$ radici complesse contate con molteplicità.

---

## 11. Somme e serie notevoli

### 11.1 Somme finite

| Somma | Risultato |
|---|---|
| $\displaystyle\sum_{k=1}^n 1$ | $n$ |
| $\displaystyle\sum_{k=1}^n k$ | $\dfrac{n(n+1)}{2}$ |
| $\displaystyle\sum_{k=1}^n k^2$ | $\dfrac{n(n+1)(2n+1)}{6}$ |
| $\displaystyle\sum_{k=1}^n k^3$ | $\left(\dfrac{n(n+1)}{2}\right)^2$ |
| $\displaystyle\sum_{k=1}^n k^4$ | $\dfrac{n(n+1)(2n+1)(3n^2+3n-1)}{30}$ |
| $\displaystyle\sum_{k=0}^n q^k$ ($q\neq 1$) | $\dfrac{1-q^{n+1}}{1-q}$ |
| $\displaystyle\sum_{k=0}^n \binom{n}{k}$ | $2^n$ |
| $\displaystyle\sum_{k=0}^n (-1)^k\binom{n}{k}$ | $0$ |
| $\displaystyle\sum_{k=0}^n \binom{n}{k}x^k$ | $(1+x)^n$ (binomio di Newton) |
| $\displaystyle\sum_{k=0}^n \binom{n}{k}^2$ | $\binom{2n}{n}$ |

### 11.2 Somme telescopiche

| Identità | Risultato |
|---|---|
| $\sum_{k=1}^n (a_{k+1}-a_k)$ | $a_{n+1}-a_1$ |
| $\sum_{k=1}^n \dfrac{1}{k(k+1)}$ | $1 - \dfrac{1}{n+1}\to 1$ |
| $\sum_{k=1}^n \dfrac{1}{k(k+1)(k+2)}$ | $\dfrac{1}{4}-\dfrac{1}{2(n+1)(n+2)}\to \dfrac{1}{4}$ |
| $\sum_{k=2}^n \log\dfrac{k}{k-1}$ | $\log n$ |

### 11.3 Serie geometrica e derivate formali

| Serie | Somma | Convergenza |
|---|---|---|
| $\displaystyle\sum_{n=0}^\infty x^n$ | $\dfrac{1}{1-x}$ | $|x|<1$ |
| $\displaystyle\sum_{n=1}^\infty n x^{n-1}$ | $\dfrac{1}{(1-x)^2}$ | $|x|<1$ |
| $\displaystyle\sum_{n=1}^\infty n x^n$ | $\dfrac{x}{(1-x)^2}$ | $|x|<1$ |
| $\displaystyle\sum_{n=2}^\infty n(n-1)x^{n-2}$ | $\dfrac{2}{(1-x)^3}$ | $|x|<1$ |
| $\displaystyle\sum_{n=1}^\infty n^2 x^n$ | $\dfrac{x(1+x)}{(1-x)^3}$ | $|x|<1$ |

### 11.4 Serie di funzioni elementari (Taylor a x=1 o ai valori notevoli)

| Serie | Somma |
|---|---|
| $\displaystyle\sum_{n=0}^\infty \dfrac{1}{n!}$ | $e$ |
| $\displaystyle\sum_{n=0}^\infty \dfrac{x^n}{n!}$ | $e^x$ |
| $\displaystyle\sum_{n=0}^\infty \dfrac{(-1)^n}{(2n+1)!}$ | $\sin 1$ |
| $\displaystyle\sum_{n=0}^\infty \dfrac{(-1)^n}{(2n)!}$ | $\cos 1$ |
| $\displaystyle\sum_{n=1}^\infty \dfrac{(-1)^{n-1}}{n}$ | $\log 2$ |
| $\displaystyle\sum_{n=0}^\infty \dfrac{(-1)^n}{2n+1}$ | $\dfrac{\pi}{4}$ (Leibniz) |
| $\displaystyle\sum_{n=1}^\infty \dfrac{(-1)^{n-1}}{2n-1}$ | $\dfrac{\pi}{4}$ |

### 11.5 Valori speciali di $\zeta(s)$

La funzione zeta è $\zeta(s)=\displaystyle\sum_{n=1}^\infty 1/n^s$ per $s>1$.

| Serie | Valore |
|---|---|
| $\zeta(2) = \displaystyle\sum_{n=1}^\infty \dfrac{1}{n^2}$ | $\dfrac{\pi^2}{6}$ (Basilea) |
| $\zeta(4) = \displaystyle\sum_{n=1}^\infty \dfrac{1}{n^4}$ | $\dfrac{\pi^4}{90}$ |
| $\zeta(6) = \displaystyle\sum_{n=1}^\infty \dfrac{1}{n^6}$ | $\dfrac{\pi^6}{945}$ |
| $\zeta(8)$ | $\dfrac{\pi^8}{9450}$ |
| $\displaystyle\sum_{n=1}^\infty \dfrac{(-1)^{n-1}}{n^2}$ | $\dfrac{\pi^2}{12}$ |
| $\displaystyle\sum_{n=0}^\infty \dfrac{1}{(2n+1)^2}$ | $\dfrac{\pi^2}{8}$ |
| $\displaystyle\sum_{n=1}^\infty \dfrac{1}{n^2(n+1)^2}$ | $\dfrac{\pi^2}{3}-3$ |

### 11.6 Serie armoniche e iperarmoniche

| Serie | Comportamento |
|---|---|
| $\sum 1/n$ | diverge (somme parziali $\sim \log n$) |
| $\sum 1/n^\alpha$ | converge per $\alpha>1$, diverge per $\alpha\leq 1$ |
| $\sum (-1)^{n-1}/n^\alpha$ | converge per $\alpha>0$ (Leibniz), assolutamente per $\alpha>1$ |
| $\sum 1/(n\log^\beta n)$ | converge per $\beta>1$, diverge per $\beta\leq 1$ |

### 11.7 Criteri di convergenza (riepilogo rapido)

| Criterio | Condizione |
|---|---|
| Necessario | $\sum a_n$ converge $\implies a_n\to 0$ |
| Confronto | $0\leq a_n\leq b_n$, $\sum b_n$ converge $\implies \sum a_n$ converge |
| Confronto asintotico | $a_n,b_n>0$, $a_n/b_n\to L\in(0,\infty)$: stesso carattere |
| Rapporto (D'Alembert) | $a_{n+1}/a_n \to L$: $L<1$ converge, $L>1$ diverge |
| Radice (Cauchy) | $\sqrt[n]{|a_n|}\to L$: $L<1$ converge, $L>1$ diverge |
| Integrale | $f$ decrescente positiva: $\sum f(n)$ e $\int_1^\infty f(x)dx$ stesso carattere |
| Leibniz | $a_n\geq 0$ decrescente con $a_n\to 0$: $\sum (-1)^n a_n$ converge |
| Condensazione | $a_n$ decrescente positiva: $\sum a_n$ e $\sum 2^k a_{2^k}$ stesso carattere |
| Abel-Dirichlet | somme parziali di $b_n$ limitate, $a_n$ monotona a $0$: $\sum a_n b_n$ converge |

---

## 12. Funzione gamma e fattoriale

### 12.1 Definizione e proprietà di $\Gamma$

$$
\Gamma(s) = \int_0^\infty t^{s-1} e^{-t}\, dt,\qquad s>0\ (\text{o}\ \Re s>0).
$$

| Proprietà | Formula |
|---|---|
| Relazione di ricorrenza | $\Gamma(s+1) = s\,\Gamma(s)$ |
| Fattoriale | $\Gamma(n+1) = n!$ per $n\in\mathbb{N}$ |
| Valore in $1/2$ | $\Gamma(1/2) = \sqrt{\pi}$ |
| Valore in $n+1/2$ | $\Gamma(n+1/2) = \dfrac{(2n)!}{4^n\, n!}\sqrt{\pi}$ |
| Riflessione (Eulero) | $\Gamma(s)\Gamma(1-s) = \dfrac{\pi}{\sin(\pi s)}$, $s\notin\mathbb{Z}$ |
| Duplicazione (Legendre) | $\Gamma(s)\Gamma(s+\tfrac{1}{2}) = \sqrt{\pi}\, 2^{1-2s}\,\Gamma(2s)$ |
| Convessità log | $\log\Gamma$ è convessa su $(0,\infty)$ |
| Beta | $B(p,q) = \dfrac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)} = \int_0^1 t^{p-1}(1-t)^{q-1}dt$ |

### 12.2 Approssimazione di Stirling

| Formula | Validità |
|---|---|
| $n!\sim \sqrt{2\pi n}\left(\dfrac{n}{e}\right)^n$ | $n\to\infty$ |
| $\Gamma(s+1)\sim \sqrt{2\pi s}\left(\dfrac{s}{e}\right)^s$ | $s\to\infty$ |
| $\log n! = n\log n - n + \dfrac{1}{2}\log(2\pi n) + O(1/n)$ | $n\to\infty$ |

Forma estesa con correzioni:

$$
n! = \sqrt{2\pi n}\left(\frac{n}{e}\right)^n\!\left(1 + \frac{1}{12 n} + \frac{1}{288 n^2} + O(n^{-3})\right).
$$

### 12.3 Coefficienti binomiali

| Identità | Formula |
|---|---|
| Definizione | $\binom{n}{k} = \dfrac{n!}{k!(n-k)!}$ |
| Simmetria | $\binom{n}{k} = \binom{n}{n-k}$ |
| Tartaglia/Pascal | $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$ |
| Vandermonde | $\binom{m+n}{r} = \sum_{k=0}^r \binom{m}{k}\binom{n}{r-k}$ |
| Generalizzato | $\binom{\alpha}{k} = \dfrac{\alpha(\alpha-1)\cdots(\alpha-k+1)}{k!}$ |
| Centrale | $\binom{2n}{n}\sim 4^n/\sqrt{\pi n}$ |

---

## 13. EDO — schemi risolutivi

### 13.1 EDO del primo ordine

| Tipo | Forma | Schema risolutivo |
|---|---|---|
| Variabili separabili | $y' = f(x) g(y)$ | $\displaystyle\int \dfrac{dy}{g(y)} = \int f(x)\,dx + C$ (per $g(y)\neq 0$) |
| Lineare omogenea | $y' + a(x) y = 0$ | $y(x) = C\, e^{-\int a(x)\,dx}$ |
| Lineare non omogenea | $y' + a(x) y = b(x)$ | $y = e^{-A(x)}\!\left(\int b(x) e^{A(x)} dx + C\right)$, $A=\int a$ |
| Fattore integrante | $y' + a y = b$ | $\mu = e^{\int a\,dx}$; $(\mu y)' = \mu b$; $y = \mu^{-1}\!\left(\int \mu b\,dx + C\right)$ |
| Bernoulli | $y' + a(x) y = b(x) y^\alpha$, $\alpha\neq 0,1$ | sostituzione $v = y^{1-\alpha}$ riduce a lineare |
| Omogenea (di grado) | $y' = F(y/x)$ | sostituzione $v = y/x$, riduce a separabili |
| Esatta | $M(x,y)\,dx + N(x,y)\,dy = 0$ con $M_y = N_x$ | $F(x,y)=C$ con $F_x = M$, $F_y = N$ |
| Non esatta con $\mu$ | $\mu M\,dx + \mu N\,dy = 0$ esatta | si cerca $\mu(x)$ se $(M_y-N_x)/N$ dipende solo da $x$; analogo per $\mu(y)$ |
| Autonoma | $y' = f(y)$ | separabile; analisi qualitativa per punti di equilibrio |
| Riccati | $y' = a(x) y^2 + b(x) y + c(x)$ | se nota una soluzione $y_1$, $y = y_1 + 1/v$ riduce a lineare |
| Clairaut | $y = x y' + f(y')$ | soluzione generale $y = Cx + f(C)$; singolare per inviluppo |

### 13.2 Cauchy: esistenza e unicità

Problema: $\begin{cases} y' = f(x,y)\\ y(x_0)=y_0 \end{cases}$.

| Ipotesi | Conclusione |
|---|---|
| $f$ continua in un intorno di $(x_0,y_0)$ | esistenza locale (Peano) |
| $f$ continua + lipschitziana in $y$ | esistenza e unicità locale (Cauchy-Lipschitz) |
| $f\in C^1$ | esistenza e unicità locale, dipendenza regolare dai dati |
| $f$ globalmente lipschitziana in $y$ su striscia | esistenza e unicità globali |

### 13.3 EDO lineari del secondo ordine omogenee a coefficienti costanti

Equazione: $y'' + p y' + q y = 0$ con $p,q\in\mathbb{R}$.

Equazione caratteristica: $\lambda^2 + p\lambda + q = 0$, discriminante $\Delta = p^2 - 4q$.

| Segno di $\Delta$ | Radici | Soluzione generale |
|---|---|---|
| $\Delta>0$ | $\lambda_1\neq \lambda_2$ reali | $y = C_1 e^{\lambda_1 x} + C_2 e^{\lambda_2 x}$ |
| $\Delta=0$ | $\lambda_1 = \lambda_2 = \lambda$ | $y = (C_1 + C_2 x) e^{\lambda x}$ |
| $\Delta<0$ | $\lambda = \alpha \pm i\beta$ | $y = e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$ |

### 13.4 EDO lineari del secondo ordine non omogenee

Equazione: $y'' + p y' + q y = g(x)$.

Soluzione generale: $y = y_h + y_p$, con $y_h$ soluzione dell'omogenea associata e $y_p$ soluzione particolare.

**Metodo dei coefficienti indeterminati** (forzante speciale):

| $g(x)$ | Tentativo per $y_p$ (se nessuna risonanza) |
|---|---|
| $P_n(x)$ polinomio grado $n$ | $Q_n(x)$ polinomio grado $n$ |
| $P_n(x) e^{ax}$ | $Q_n(x) e^{ax}$ |
| $P_n(x) e^{ax}\cos(bx)$ o $\sin(bx)$ | $e^{ax}[Q_n(x)\cos(bx) + R_n(x)\sin(bx)]$ |
| Risonanza: $a$ (o $a\pm ib$) radice di molteplicità $m$ | moltiplicare il tentativo per $x^m$ |

**Metodo della variazione delle costanti** (Lagrange):

Dato $y_h = C_1 y_1 + C_2 y_2$, si cerca $y_p = u_1(x) y_1 + u_2(x) y_2$ con sistema:

$$
\begin{cases} u_1' y_1 + u_2' y_2 = 0\\ u_1' y_1' + u_2' y_2' = g(x) \end{cases}
$$

Soluzione tramite wronskiano $W = y_1 y_2' - y_1' y_2$:

$$
u_1' = -\frac{y_2\, g}{W},\qquad u_2' = \frac{y_1\, g}{W}.
$$

### 13.5 EDO lineari di ordine $n$ a coefficienti costanti

$y^{(n)} + a_{n-1} y^{(n-1)} + \cdots + a_1 y' + a_0 y = g(x)$.

Equazione caratteristica: $\lambda^n + a_{n-1}\lambda^{n-1} + \cdots + a_0 = 0$.

| Tipo di radice | Contributo alla base di soluzioni |
|---|---|
| $\lambda$ reale di molteplicità $m$ | $e^{\lambda x}, x e^{\lambda x}, \dots, x^{m-1} e^{\lambda x}$ |
| $\lambda = \alpha\pm i\beta$ di molteplicità $m$ | $e^{\alpha x}\cos\beta x,\dots, x^{m-1}e^{\alpha x}\cos\beta x$ e analoghi con $\sin$ |

### 13.6 EDO di Eulero (Cauchy-Eulero)

$x^2 y'' + a x y' + b y = 0$, $x>0$.

Sostituzione $x = e^t$ (o $t=\log x$) riduce a equazione lineare a coefficienti costanti in $t$:

$$
\frac{d^2 y}{dt^2} + (a-1)\frac{dy}{dt} + b y = 0.
$$

Alternativa: cercare $y = x^\lambda$. L'equazione indiciale è $\lambda(\lambda-1) + a\lambda + b = 0$.

### 13.7 Sistemi lineari del primo ordine

$\mathbf{y}' = A\,\mathbf{y}$ con $A\in\mathbb{R}^{n\times n}$.

| Tipo di autovalori di $A$ | Soluzione |
|---|---|
| $\lambda_k$ reali e distinti, autovettori $\mathbf v_k$ | $\mathbf y = \sum_k C_k\, e^{\lambda_k t}\,\mathbf v_k$ |
| Autovalore complesso $\lambda = \alpha\pm i\beta$ con $\mathbf v = \mathbf u\pm i\mathbf w$ | $e^{\alpha t}[(\cos\beta t)\mathbf u - (\sin\beta t)\mathbf w]$ e analoga con seno e coseno scambiati |
| Autovalore multiplo (con difetto) | uso autovettori generalizzati: $(A-\lambda I)^k \mathbf v = 0$ |
| Generica | $\mathbf y = e^{tA}\,\mathbf y_0$ con $e^{tA}=\sum_{k=0}^\infty (tA)^k/k!$ |

### 13.8 Stime e dipendenza continua

**Disuguaglianza di Gronwall (forma differenziale).** Se $u\in C^1([a,b])$, $\alpha,\beta$ continue con $\beta\geq 0$, e $u'(t)\leq \alpha(t) + \beta(t) u(t)$, allora:

$$
u(t)\leq u(a)\, e^{\int_a^t \beta(s)\, ds} + \int_a^t \alpha(s)\, e^{\int_s^t \beta(\tau)\, d\tau}\,ds.
$$

**Forma integrale (Gronwall classica).** Se $u\geq 0$ continua e $u(t)\leq c + \int_a^t \beta(s) u(s)\,ds$ con $\beta\geq 0$, allora $u(t)\leq c\, e^{\int_a^t \beta(s)\,ds}$.

---

## Indice rapido dei simboli

| Simbolo | Significato |
|---|---|
| $\mathbb{N},\mathbb{Z},\mathbb{Q},\mathbb{R},\mathbb{C}$ | naturali, interi, razionali, reali, complessi |
| $\log,\ln$ | logaritmo naturale (base $e$) |
| $\log_a$ | logaritmo in base $a$ |
| $e\approx 2.71828$ | base di Nepero |
| $\pi\approx 3.14159$ | pi greco |
| $\gamma\approx 0.5772$ | costante di Eulero-Mascheroni |
| $\Gamma(s)$ | funzione gamma |
| $\zeta(s)$ | funzione zeta di Riemann |
| $o(f), O(f)$ | simboli di Landau (piccolo o, grande O) |
| $f\sim g$ | $f/g \to 1$ |
| $\binom{n}{k}$ | coefficiente binomiale |
| $\sec, \csc, \cot$ | secante, cosecante, cotangente |
| $\sinh, \cosh, \tanh$ | seno, coseno, tangente iperbolici |
| $C$ | costante arbitraria di integrazione |
| $\mathbf{v}$ (grassetto) | vettore |
| $\langle \cdot,\cdot\rangle$ | prodotto scalare |
| $\|\cdot\|$ | norma |

---

## Note finali

Questo formulario raccoglie le formule che ricorrono in **tutto il corso di Analisi I** (un anno completo) ed è pensato come riferimento da consultare durante esercizi, scritti e ripassi. Le tavole più estese (integrali speciali, valori di $\zeta$, identità ipergeometriche, identità di Bessel) si trovano nelle opere classiche:

- **Gradshteyn-Ryzhik**, *Table of Integrals, Series, and Products*: tavola sterminata di integrali e somme.
- **Abramowitz-Stegun**, *Handbook of Mathematical Functions*: funzioni speciali con tabelle numeriche.
- **DLMF** (Digital Library of Mathematical Functions): versione online, costantemente aggiornata, dell'Abramowitz-Stegun.

Per i confronti asintotici e i limiti notevoli, ricordare che **gli sviluppi di Taylor centrati in 0** sono in genere la via più efficiente: sostituiscono in colpo solo molte tabelle di limiti.
