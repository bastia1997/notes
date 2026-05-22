---
title: "Eserciziario: problemi tipo d'esame"
area: Reference
summary: "Cinquanta esercizi rappresentativi degli scritti universitari italiani, divisi per area, con testo, suggerimenti impliciti e soluzioni passo-passo. Difficoltà mista, da riscaldamento a problemi di seconda parte."
order: 57
level: avanzato
prereq:
  - "Le sezioni precedenti del percorso"
tools:
  - "Marcellini, Sbordone — *Esercitazioni di Matematica 1* (i due volumi rossi)"
  - "Pagani, Salsa — *Analisi Matematica 1, esercizi*"
  - "Giusti — *Esercizi e complementi di Analisi Matematica*"
  - "Demidovich — *Problems in Mathematical Analysis* (classico russo)"
---

> "Saper risolvere un problema è ricordarsene un altro simile risolto in precedenza." — George Polya
>
> Questo eserciziario è una collezione personale di esercizi *tipici*. Non c'è nulla di esotico: sono i problemi che ti aspetti su uno scritto di Analisi I in una buona università italiana. Risolvili **prima** di guardare la soluzione, anche se ne hai voglia per cinque minuti soltanto. Cinque minuti di tentativo onesto valgono più di un'ora di lettura passiva.

Ogni esercizio ha la stessa struttura: **testo**, eventuale piccolo **suggerimento** in linea, e **soluzione** racchiusa in un elemento espandibile. Le soluzioni sono complete, non solo il risultato: l'esame si vince sulla *via*, non sull'arrivo.

---

## Parte A — Limiti di successioni (5)

### A1. Limite di una forma indeterminata $\infty-\infty$ con radici

Calcolare
$$
\lim_{n\to\infty}\Bigl(\sqrt{n^2+n}-n\Bigr).
$$

<details><summary>Soluzione</summary>

Razionalizziamo moltiplicando e dividendo per il coniugato:
$$
\sqrt{n^2+n}-n = \frac{(n^2+n)-n^2}{\sqrt{n^2+n}+n} = \frac{n}{\sqrt{n^2+n}+n}.
$$
Dividiamo sopra e sotto per $n$:
$$
= \frac{1}{\sqrt{1+1/n}+1} \xrightarrow[n\to\infty]{} \frac{1}{1+1}=\frac{1}{2}.
$$
**Risultato:** $1/2$.
</details>

### A2. Limite con fattoriale

Calcolare
$$
\lim_{n\to\infty}\frac{n!}{n^n}.
$$

<details><summary>Soluzione</summary>

Stimiamo $\frac{n!}{n^n}=\frac{1\cdot 2\cdots n}{n\cdot n\cdots n}=\prod_{k=1}^n \frac{k}{n}$.

Il fattore $k=1$ vale $1/n\to 0$ mentre tutti gli altri fattori sono $\le 1$. Quindi $0\le \frac{n!}{n^n}\le \frac{1}{n}\to 0$. Per il teorema dei carabinieri il limite è $0$.

In alternativa, criterio del rapporto sulla successione $a_n=n!/n^n$:
$$
\frac{a_{n+1}}{a_n}=\frac{(n+1)!}{(n+1)^{n+1}}\cdot\frac{n^n}{n!}=\frac{n^n}{(n+1)^n}=\frac{1}{(1+1/n)^n}\to \frac{1}{e}<1,
$$
quindi $a_n\to 0$.

**Risultato:** $0$.
</details>

### A3. Limite tipo $e$

Calcolare
$$
\lim_{n\to\infty}\left(\frac{n+3}{n-2}\right)^{\!n}.
$$

<details><summary>Soluzione</summary>

Scriviamo
$$
\frac{n+3}{n-2}=1+\frac{5}{n-2}.
$$
Quindi
$$
\left(1+\frac{5}{n-2}\right)^{n}=\left[\left(1+\frac{5}{n-2}\right)^{(n-2)/5}\right]^{5n/(n-2)}.
$$
La parentesi quadra tende a $e$ (limite notevole), l'esponente $5n/(n-2)\to 5$. Quindi il limite è $e^5$.

**Risultato:** $e^5$.
</details>

### A4. Limite tramite Cesàro/Stolz

Calcolare
$$
\lim_{n\to\infty}\frac{1+2+\cdots+n}{n^2}.
$$

<details><summary>Soluzione</summary>

Per la nota formula $1+2+\cdots+n=\frac{n(n+1)}{2}$. Quindi
$$
\frac{1+\cdots+n}{n^2}=\frac{n(n+1)}{2n^2}=\frac{1}{2}\cdot\frac{n+1}{n}\to\frac{1}{2}.
$$
In alternativa Stolz–Cesàro: se $b_n=n^2$ è strettamente crescente e divergente,
$$
\lim\frac{a_{n+1}-a_n}{b_{n+1}-b_n}=\lim\frac{n+1}{(n+1)^2-n^2}=\lim\frac{n+1}{2n+1}=\frac{1}{2}.
$$

**Risultato:** $1/2$.
</details>

### A5. Successione ricorsiva

Si definisca $a_1=1$, $a_{n+1}=\sqrt{2+a_n}$. Studiare convergenza e calcolare $\lim a_n$.

<details><summary>Soluzione</summary>

**Monotonia:** mostriamo per induzione che $a_n\le a_{n+1}$. Base: $a_1=1\le \sqrt{3}=a_2$. Passo: se $a_n\le a_{n+1}$ allora $2+a_n\le 2+a_{n+1}$ e $\sqrt{\,\cdot\,}$ è crescente, da cui $a_{n+1}\le a_{n+2}$. Quindi $(a_n)$ è crescente.

**Limitatezza:** mostriamo $a_n\le 2$ per induzione. Base ok. Passo: $a_{n+1}=\sqrt{2+a_n}\le\sqrt{2+2}=2$.

Per il teorema delle successioni monotone, $(a_n)$ converge a un $\ell\in [1,2]$. Passando al limite nella ricorsione: $\ell=\sqrt{2+\ell}$, cioè $\ell^2-\ell-2=0$, $\ell=2$ (scartando $-1$).

**Risultato:** $\lim a_n=2$.
</details>

---

## Parte B — Limiti di funzioni (5)

### B1. Forma $0/0$ trigonometrica

Calcolare
$$
\lim_{x\to 0}\frac{1-\cos x}{x^2}.
$$

<details><summary>Soluzione</summary>

Limite notevole standard. Usiamo l'identità $1-\cos x = 2\sin^2(x/2)$:
$$
\frac{1-\cos x}{x^2}=\frac{2\sin^2(x/2)}{x^2}=\frac{1}{2}\left(\frac{\sin(x/2)}{x/2}\right)^{\!2}\to\frac{1}{2}\cdot 1=\frac{1}{2}.
$$
Oppure Taylor: $\cos x = 1 - x^2/2 + o(x^2)$, quindi $\frac{1-\cos x}{x^2}=\frac{x^2/2+o(x^2)}{x^2}\to 1/2$.

**Risultato:** $1/2$.
</details>

### B2. Sostituzione e limite notevole

Calcolare
$$
\lim_{x\to 0}\frac{\ln(1+\sin 3x)}{\tan 5x}.
$$

<details><summary>Soluzione</summary>

Per $x\to 0$: $\ln(1+u)\sim u$, $\tan u\sim u$, $\sin u\sim u$. Quindi
$$
\ln(1+\sin 3x)\sim \sin 3x\sim 3x,\qquad \tan 5x\sim 5x.
$$
Il rapporto tende a $3x/(5x)=3/5$.

**Risultato:** $3/5$.
</details>

### B3. Forma $\infty^0$

Calcolare
$$
\lim_{x\to +\infty} x^{1/x}.
$$

<details><summary>Soluzione</summary>

Passiamo al logaritmo: $\ln(x^{1/x})=\frac{\ln x}{x}\to 0$ per $x\to +\infty$ (l'esponenziale batte il logaritmo). Quindi $x^{1/x}\to e^0=1$.

**Risultato:** $1$.
</details>

### B4. Limite a sinistra/destra

Calcolare i limiti destro e sinistro di
$$
f(x)=\frac{|x-1|}{x-1}\quad\text{per } x\to 1.
$$

<details><summary>Soluzione</summary>

Per $x>1$: $|x-1|=x-1$, quindi $f(x)=1$.
Per $x<1$: $|x-1|=-(x-1)$, quindi $f(x)=-1$.

Limite destro $=1$, limite sinistro $=-1$, il limite non esiste.

**Risultato:** $\lim_{x\to 1^+}f=1$, $\lim_{x\to 1^-}f=-1$, $\lim_{x\to 1}f$ non esiste.
</details>

### B5. Hôpital con cura

Calcolare
$$
\lim_{x\to 0}\frac{e^x - 1 - x - x^2/2}{x^3}.
$$

<details><summary>Soluzione</summary>

Forma $0/0$. Applichiamo Hôpital (o usiamo Taylor, più rapido). Con Taylor:
$$
e^x = 1+x+\frac{x^2}{2}+\frac{x^3}{6}+o(x^3),
$$
quindi
$$
e^x-1-x-\frac{x^2}{2}=\frac{x^3}{6}+o(x^3),
$$
e il quoziente tende a $1/6$.

**Risultato:** $1/6$.
</details>

---

## Parte C — Continuità (3)

### C1. Prolungamento per continuità

Si stabilisca se la funzione
$$
f(x)=\frac{\sin x}{x},\qquad x\ne 0,
$$
è prolungabile per continuità in $x=0$. In caso affermativo, scrivere il prolungamento.

<details><summary>Soluzione</summary>

$\lim_{x\to 0}\sin x/x=1$ (limite notevole). Quindi $f$ è prolungabile per continuità in $0$ definendo
$$
\tilde f(x)=\begin{cases}\sin x/x & x\ne 0\\ 1 & x=0\end{cases}
$$
**Risultato:** sì, $\tilde f(0)=1$.
</details>

### C2. Classificazione discontinuità

Si classifichi la discontinuità in $x=0$ di
$$
f(x)=\frac{1}{1+e^{1/x}},\quad x\ne 0.
$$

<details><summary>Soluzione</summary>

Limite destro: $x\to 0^+$ implica $1/x\to +\infty$, quindi $e^{1/x}\to +\infty$ e $f(x)\to 0$.
Limite sinistro: $x\to 0^-$ implica $1/x\to -\infty$, quindi $e^{1/x}\to 0$ e $f(x)\to 1$.

I due limiti laterali sono finiti ma diversi: **discontinuità di prima specie (salto)**, ampiezza $|1-0|=1$.

**Risultato:** discontinuità di salto.
</details>

### C3. Applicazione teorema degli zeri

Si dimostri che l'equazione $x^3+x-1=0$ ha esattamente una soluzione reale in $[0,1]$.

<details><summary>Soluzione</summary>

Sia $f(x)=x^3+x-1$. È continua (polinomio). $f(0)=-1<0$, $f(1)=1>0$. Per il teorema degli zeri (Bolzano) esiste $c\in (0,1)$ con $f(c)=0$.

Unicità: $f'(x)=3x^2+1>0$ ovunque, quindi $f$ è strettamente crescente, lo zero è unico.

**Risultato:** esiste un'unica radice in $(0,1)$; numericamente $\approx 0{,}6823$ ("radice plastica" famosa).
</details>

---

## Parte D — Derivate (5)

### D1. Derivata con regola del prodotto e composizione

Calcolare $f'(x)$ per
$$
f(x)=x^2\sin(3x+1).
$$

<details><summary>Soluzione</summary>

Prodotto + composizione:
$$
f'(x)=2x\sin(3x+1)+x^2\cos(3x+1)\cdot 3=2x\sin(3x+1)+3x^2\cos(3x+1).
$$

**Risultato:** $f'(x)=2x\sin(3x+1)+3x^2\cos(3x+1)$.
</details>

### D2. Derivata logaritmica

Calcolare $f'(x)$ per
$$
f(x)=x^x,\qquad x>0.
$$

<details><summary>Soluzione</summary>

$\ln f(x)=x\ln x$. Derivando entrambi i membri rispetto a $x$:
$$
\frac{f'(x)}{f(x)}=\ln x + 1 \;\Longrightarrow\; f'(x)=x^x(\ln x+1).
$$

**Risultato:** $f'(x)=x^x(\ln x+1)$.
</details>

### D3. Derivabilità e modulo

Si studi la derivabilità in $x=0$ di $f(x)=|x|^{3/2}$.

<details><summary>Soluzione</summary>

Per $x>0$: $f(x)=x^{3/2}$, $f'(x)=\frac{3}{2}x^{1/2}$, $f'(0^+)=0$.
Per $x<0$: $f(x)=(-x)^{3/2}=-x\sqrt{-x}$, $f'(x)=-\frac{3}{2}\sqrt{-x}$, $f'(0^-)=0$.

Le derivate laterali coincidono e valgono $0$. $f$ è derivabile in $0$ con $f'(0)=0$.

**Risultato:** $f'(0)=0$ (a differenza di $|x|$ che non è derivabile in 0).
</details>

### D4. Funzione inversa

Sia $f(x)=x+e^x$. Si calcoli $(f^{-1})'(1)$.

<details><summary>Soluzione</summary>

$f$ è strettamente crescente ($f'(x)=1+e^x>0$), quindi invertibile. Notiamo $f(0)=0+1=1$, quindi $f^{-1}(1)=0$.

Per la formula della derivata dell'inversa:
$$
(f^{-1})'(1)=\frac{1}{f'(0)}=\frac{1}{1+e^0}=\frac{1}{2}.
$$

**Risultato:** $1/2$.
</details>

### D5. Derivata implicita

Sia data la curva $x^2+xy+y^2=7$. Calcolare $y'(x)$ nel punto $(2,1)$.

<details><summary>Soluzione</summary>

Verifichiamo: $4+2+1=7$ ✓. Derivando implicitamente rispetto a $x$:
$$
2x+y+xy'+2yy'=0 \;\Longrightarrow\; y'(x+2y)=-(2x+y) \;\Longrightarrow\; y'=-\frac{2x+y}{x+2y}.
$$
In $(2,1)$: $y'=-\frac{5}{4}$.

**Risultato:** $y'(2)=-5/4$.
</details>

---

## Parte E — Studi di funzione (5)

### E1. Studio di $f(x)=\dfrac{x^2}{x-1}$

Dominio, asintoti, monotonia, estremi, grafico qualitativo.

<details><summary>Soluzione</summary>

**Dominio:** $\mathbb R\setminus\{1\}$.
**Asintoti verticali:** $x=1$. $f(x)\to +\infty$ per $x\to 1^+$, $-\infty$ per $x\to 1^-$.
**Asintoto obliquo:** divisione $x^2/(x-1)=x+1+\frac{1}{x-1}$. Quindi $y=x+1$ è asintoto obliquo.
**Derivata:** $f'(x)=\frac{2x(x-1)-x^2}{(x-1)^2}=\frac{x^2-2x}{(x-1)^2}=\frac{x(x-2)}{(x-1)^2}$.
**Segno $f'$:** positivo per $x<0$ o $x>2$, negativo per $0<x<1$ e $1<x<2$.
**Estremi:** massimo locale in $x=0$, $f(0)=0$; minimo locale in $x=2$, $f(2)=4$.

Grafico qualitativo: ramo in basso a sinistra con max $(0,0)$, ramo in alto a destra con min $(2,4)$, asintoto obliquo $y=x+1$.
</details>

### E2. Studio di $f(x)=xe^{-x}$

<details><summary>Soluzione</summary>

**Dominio:** $\mathbb R$. **Limiti:** $f(x)\to -\infty$ per $x\to -\infty$ (poiché $xe^{-x}=x\cdot e^{-x}$ con $e^{-x}\to+\infty$); $f(x)\to 0^+$ per $x\to +\infty$ (esponenziale batte polinomio).
**Asintoto orizzontale:** $y=0$ a $+\infty$.
**Derivata:** $f'(x)=e^{-x}-xe^{-x}=(1-x)e^{-x}$. Positiva per $x<1$, negativa per $x>1$.
**Estremo:** massimo in $x=1$, $f(1)=1/e$.
**Concavità:** $f''(x)=-e^{-x}-(1-x)e^{-x}\cdot(-1)\dots$ Conto: $f''=(x-2)e^{-x}$. Cambio concavità in $x=2$ (flesso), $f(2)=2/e^2$.

Curva sale da $-\infty$, attraversa l'origine, raggiunge il max in $(1,1/e)$, decresce a zero.
</details>

### E3. Studio di $f(x)=\dfrac{\ln x}{x}$

<details><summary>Soluzione</summary>

**Dominio:** $(0,+\infty)$. **Zeri:** $x=1$. **Segno:** $f<0$ per $0<x<1$, $f>0$ per $x>1$.
**Limiti:** $x\to 0^+$: $\ln x/x\to -\infty$. $x\to +\infty$: $\to 0^+$.
**Asintoti:** verticale $x=0$, orizzontale $y=0$.
**Derivata:** $f'(x)=\frac{1/x\cdot x-\ln x}{x^2}=\frac{1-\ln x}{x^2}$. Positiva per $\ln x<1$ cioè $x<e$. Massimo in $x=e$, $f(e)=1/e$.
**Concavità:** $f''(x)=\frac{-1/x\cdot x^2-(1-\ln x)\cdot 2x}{x^4}=\frac{-x-2x(1-\ln x)}{x^4}=\frac{2\ln x-3}{x^3}$. Flesso in $x=e^{3/2}$.
</details>

### E4. Studio di $f(x)=\arctan\!\left(\dfrac{1}{x}\right)$

<details><summary>Soluzione</summary>

**Dominio:** $\mathbb R\setminus\{0\}$. 
**Simmetria:** dispari.
**Limiti:** $x\to 0^+$: $1/x\to +\infty$, $\arctan\to \pi/2$. $x\to 0^-$: $\to -\pi/2$. Salto.
$x\to \pm\infty$: $1/x\to 0$, $f\to 0$.
**Derivata:** $f'(x)=\frac{1}{1+1/x^2}\cdot(-1/x^2)=-\frac{1}{x^2+1}$. Sempre negativa: $f$ strettamente decrescente sui due rami.
**Grafico:** ramo sinistro va da $0$ a $-\pi/2$, ramo destro va da $\pi/2$ a $0$.
</details>

### E5. Studio di $f(x)=x^3-3x+1$

<details><summary>Soluzione</summary>

**Dominio:** $\mathbb R$. **Limiti:** $\pm\infty$.
**$f'=3x^2-3=3(x-1)(x+1)$.** Positiva fuori da $[-1,1]$.
**Massimo locale** in $x=-1$, $f(-1)=3$; **minimo locale** in $x=1$, $f(1)=-1$.
**$f''=6x$.** Concavità: convessa per $x>0$, concava per $x<0$. Flesso in $x=0$, $f(0)=1$.
**Zeri:** tre zeri reali (max e min hanno segno opposto). Numericamente $\approx -1{,}88; \;0{,}347;\; 1{,}53$.
</details>

---

## Parte F — Integrali indefiniti (8)

### F1. Integrazione per sostituzione

$$
\int \frac{x}{\sqrt{1+x^2}}\,dx.
$$

<details><summary>Soluzione</summary>

Sostituzione $u=1+x^2$, $du=2x\,dx$, $x\,dx=du/2$:
$$
\int \frac{du/2}{\sqrt u}=\frac{1}{2}\int u^{-1/2}\,du=\sqrt u + C=\sqrt{1+x^2}+C.
$$

**Risultato:** $\sqrt{1+x^2}+C$.
</details>

### F2. Integrazione per parti

$$
\int x e^x\,dx.
$$

<details><summary>Soluzione</summary>

Parti con $u=x$, $dv=e^x dx$, $du=dx$, $v=e^x$:
$$
\int x e^x\,dx = xe^x - \int e^x\,dx = xe^x - e^x + C = e^x(x-1)+C.
$$

**Risultato:** $e^x(x-1)+C$.
</details>

### F3. Integrale razionale

$$
\int \frac{1}{x^2-1}\,dx.
$$

<details><summary>Soluzione</summary>

Decomposizione in fratti semplici: $\frac{1}{x^2-1}=\frac{1}{(x-1)(x+1)}=\frac{1/2}{x-1}-\frac{1/2}{x+1}$.

$$
\int=\frac{1}{2}\ln|x-1|-\frac{1}{2}\ln|x+1|+C=\frac{1}{2}\ln\left|\frac{x-1}{x+1}\right|+C.
$$

**Risultato:** $\frac{1}{2}\ln\left|\frac{x-1}{x+1}\right|+C$.
</details>

### F4. Integrale trigonometrico

$$
\int \sin^3 x\,dx.
$$

<details><summary>Soluzione</summary>

$\sin^3 x=\sin x(1-\cos^2 x)$. Sostituzione $u=\cos x$, $du=-\sin x\,dx$:
$$
\int \sin x(1-\cos^2 x)\,dx=-\int(1-u^2)\,du=-u+\frac{u^3}{3}+C=-\cos x+\frac{\cos^3 x}{3}+C.
$$

**Risultato:** $-\cos x+\frac{\cos^3 x}{3}+C$.
</details>

### F5. Sostituzione trigonometrica

$$
\int \sqrt{1-x^2}\,dx.
$$

<details><summary>Soluzione</summary>

Sostituzione $x=\sin\theta$, $dx=\cos\theta\,d\theta$, $\sqrt{1-x^2}=\cos\theta$:
$$
\int \cos^2\theta\,d\theta=\int \frac{1+\cos 2\theta}{2}d\theta=\frac{\theta}{2}+\frac{\sin 2\theta}{4}+C.
$$
Riportando: $\sin 2\theta=2\sin\theta\cos\theta=2x\sqrt{1-x^2}$, $\theta=\arcsin x$:
$$
\frac{\arcsin x}{2}+\frac{x\sqrt{1-x^2}}{2}+C.
$$

**Risultato:** $\frac{\arcsin x + x\sqrt{1-x^2}}{2}+C$.
</details>

### F6. Parti ricorrenti

$$
\int e^x \cos x\,dx.
$$

<details><summary>Soluzione</summary>

Sia $I=\int e^x\cos x\,dx$. Parti con $u=\cos x$, $dv=e^x dx$:
$$
I=e^x\cos x+\int e^x\sin x\,dx.
$$
Parti di nuovo con $u=\sin x$, $dv=e^x dx$:
$$
\int e^x\sin x\,dx=e^x\sin x-\int e^x\cos x\,dx=e^x\sin x-I.
$$
Sostituendo:
$$
I=e^x\cos x+e^x\sin x - I \;\Longrightarrow\; 2I=e^x(\sin x+\cos x).
$$

**Risultato:** $\frac{e^x(\sin x+\cos x)}{2}+C$.
</details>

### F7. Fratto semplice con quadrato

$$
\int \frac{1}{x^2+2x+5}\,dx.
$$

<details><summary>Soluzione</summary>

Completiamo il quadrato: $x^2+2x+5=(x+1)^2+4$. Sostituzione $u=x+1$:
$$
\int \frac{du}{u^2+4}=\frac{1}{2}\arctan\frac{u}{2}+C=\frac{1}{2}\arctan\frac{x+1}{2}+C.
$$

**Risultato:** $\frac{1}{2}\arctan\frac{x+1}{2}+C$.
</details>

### F8. Logaritmo come parte

$$
\int \ln x\,dx.
$$

<details><summary>Soluzione</summary>

Parti con $u=\ln x$, $dv=dx$, $du=dx/x$, $v=x$:
$$
\int \ln x\,dx=x\ln x-\int 1\,dx=x\ln x-x+C.
$$

**Risultato:** $x\ln x - x + C$.
</details>

---

## Parte G — Integrali definiti e impropri (5)

### G1. Calcolo per simmetria

$$
\int_{-1}^{1}\frac{\sin x}{1+x^2}\,dx.
$$

<details><summary>Soluzione</summary>

L'integrando è dispari ($\sin(-x)/(1+x^2)=-\sin x/(1+x^2)$) e l'intervallo è simmetrico rispetto a $0$. Quindi l'integrale è $0$.

**Risultato:** $0$.
</details>

### G2. Integrale di Gauss "elementare"

Calcolare
$$
\int_0^{+\infty} xe^{-x^2}\,dx.
$$

<details><summary>Soluzione</summary>

Sostituzione $u=x^2$, $du=2x\,dx$:
$$
\int_0^{+\infty} xe^{-x^2}dx=\frac{1}{2}\int_0^{+\infty}e^{-u}du=\frac{1}{2}.
$$

**Risultato:** $1/2$.
</details>

### G3. Improprio del primo tipo

Stabilire per quali $\alpha\in\mathbb R$ converge
$$
\int_1^{+\infty}\frac{1}{x^\alpha}\,dx.
$$

<details><summary>Soluzione</summary>

Per $\alpha\ne 1$: $\int_1^M x^{-\alpha}dx=\frac{x^{1-\alpha}}{1-\alpha}\Big|_1^M=\frac{M^{1-\alpha}-1}{1-\alpha}$. Per $M\to\infty$ converge se $1-\alpha<0$, cioè $\alpha>1$, e vale $\frac{1}{\alpha-1}$.

Per $\alpha=1$: $\int_1^M dx/x=\ln M\to\infty$, diverge.

**Risultato:** converge $\iff \alpha>1$. (Caso "armonica improprio".)
</details>

### G4. Improprio del secondo tipo

Stabilire per quali $\alpha$ converge
$$
\int_0^1 \frac{1}{x^\alpha}\,dx.
$$

<details><summary>Soluzione</summary>

Per $\alpha\ne 1$: $\int_\epsilon^1 x^{-\alpha}dx=\frac{1-\epsilon^{1-\alpha}}{1-\alpha}$. Per $\epsilon\to 0^+$: converge se $1-\alpha>0$, cioè $\alpha<1$.

Per $\alpha=1$: diverge ($\ln$).

**Risultato:** converge $\iff \alpha<1$.
</details>

### G5. Confronto asintotico

Studiare la convergenza di
$$
\int_2^{+\infty}\frac{1}{x\ln x}\,dx \quad\text{e}\quad \int_2^{+\infty}\frac{1}{x(\ln x)^2}\,dx.
$$

<details><summary>Soluzione</summary>

Sostituzione $u=\ln x$, $du=dx/x$:

Prima: $\int_{\ln 2}^{+\infty}\frac{du}{u}=\ln u|_{\ln 2}^\infty=+\infty$. Diverge.

Seconda: $\int_{\ln 2}^{+\infty}\frac{du}{u^2}=\left[-\frac{1}{u}\right]_{\ln 2}^\infty=\frac{1}{\ln 2}<\infty$. Converge.

**Risultato:** la prima diverge, la seconda converge a $1/\ln 2$.
</details>

---

## Parte H — Serie numeriche (5)

### H1. Serie geometrica

Calcolare $\sum_{n=0}^\infty \frac{(-1)^n}{3^n}$.

<details><summary>Soluzione</summary>

Geometrica di ragione $r=-1/3$, $|r|<1$, converge:
$$
\sum_{n=0}^\infty (-1/3)^n=\frac{1}{1-(-1/3)}=\frac{1}{4/3}=\frac{3}{4}.
$$

**Risultato:** $3/4$.
</details>

### H2. Confronto

Stabilire se converge $\sum_{n=1}^\infty \frac{n}{n^3+1}$.

<details><summary>Soluzione</summary>

Asintoticamente $\frac{n}{n^3+1}\sim \frac{1}{n^2}$. La serie di confronto $\sum 1/n^2$ converge ($p=2>1$), quindi anche la nostra converge (criterio del confronto asintotico).

**Risultato:** converge.
</details>

### H3. Rapporto

Stabilire se converge $\sum_{n=1}^\infty \frac{n!}{n^n}$.

<details><summary>Soluzione</summary>

Criterio del rapporto:
$$
\frac{a_{n+1}}{a_n}=\frac{(n+1)!}{(n+1)^{n+1}}\cdot\frac{n^n}{n!}=\frac{n^n}{(n+1)^n}=\frac{1}{(1+1/n)^n}\to\frac{1}{e}<1.
$$
Serie convergente.

**Risultato:** converge.
</details>

### H4. Leibniz

Stabilire se converge (semplicemente o assolutamente)
$$
\sum_{n=1}^\infty \frac{(-1)^{n+1}}{\sqrt n}.
$$

<details><summary>Soluzione</summary>

Termini $1/\sqrt n$ positivi, decrescenti, tendenti a $0$ ⇒ per criterio di Leibniz la serie converge (semplicemente).

Assoluta: $\sum 1/\sqrt n$ diverge ($p=1/2<1$). 

**Risultato:** converge semplicemente ma non assolutamente.
</details>

### H5. Telescopica

Calcolare $\sum_{n=1}^\infty \frac{1}{n(n+1)}$.

<details><summary>Soluzione</summary>

Decomposizione $\frac{1}{n(n+1)}=\frac{1}{n}-\frac{1}{n+1}$. Somma parziale:
$$
S_N=\left(1-\frac{1}{2}\right)+\left(\frac{1}{2}-\frac{1}{3}\right)+\cdots+\left(\frac{1}{N}-\frac{1}{N+1}\right)=1-\frac{1}{N+1}\to 1.
$$

**Risultato:** $1$.
</details>

---

## Parte I — Serie di potenze e Taylor (4)

### I1. Raggio di convergenza

Trovare il raggio di convergenza di $\sum_{n=0}^\infty \frac{x^n}{n!}$.

<details><summary>Soluzione</summary>

Criterio del rapporto sui coefficienti: $a_n=1/n!$. 
$$
\left|\frac{a_{n+1}}{a_n}\right|=\frac{n!}{(n+1)!}=\frac{1}{n+1}\to 0.
$$
Quindi $R=+\infty$. La serie converge per ogni $x\in\mathbb R$ e somma $e^x$.
</details>

### I2. Raggio di convergenza con radice

Trovare $R$ per $\sum_{n=1}^\infty \frac{x^n}{n}$.

<details><summary>Soluzione</summary>

$\sqrt[n]{1/n}=n^{-1/n}\to 1$, quindi $R=1$. In $x=1$: serie armonica, diverge. In $x=-1$: serie armonica alternata, converge. Insieme di convergenza: $[-1,1)$.
</details>

### I3. Taylor di $\ln(1+x)$ in $x=0$

Calcolare lo sviluppo fino al quarto ordine.

<details><summary>Soluzione</summary>

$\frac{d}{dx}\ln(1+x)=\frac{1}{1+x}=\sum_{n=0}^\infty (-1)^n x^n$ per $|x|<1$. Integrando termine a termine:
$$
\ln(1+x)=\sum_{n=1}^\infty \frac{(-1)^{n-1}x^n}{n}=x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\cdots
$$

**Risultato:** $x-x^2/2+x^3/3-x^4/4+o(x^4)$.
</details>

### I4. Uso del Taylor per limiti

Calcolare $\lim_{x\to 0}\frac{\sin x - x + x^3/6}{x^5}$.

<details><summary>Soluzione</summary>

$\sin x = x - x^3/6 + x^5/120 + o(x^5)$, quindi $\sin x - x + x^3/6 = x^5/120 + o(x^5)$. Il limite è $1/120$.

**Risultato:** $1/120$.
</details>

---

## Parte J — Equazioni differenziali ordinarie (5)

### J1. EDO a variabili separabili

Risolvere $y'=xy$ con $y(0)=1$.

<details><summary>Soluzione</summary>

$\frac{dy}{y}=x\,dx$, $\ln|y|=x^2/2+C$, $y=Ae^{x^2/2}$. Da $y(0)=1$: $A=1$. 

**Risultato:** $y(x)=e^{x^2/2}$.
</details>

### J2. EDO lineare primo ordine

Risolvere $y'+y=e^{-x}$, $y(0)=0$.

<details><summary>Soluzione</summary>

Fattore integrante $\mu=e^x$. Equazione $(e^x y)'=e^x\cdot e^{-x}=1$. Integrando: $e^x y = x + C$, $y=(x+C)e^{-x}$. Da $y(0)=0$: $C=0$.

**Risultato:** $y(x)=xe^{-x}$.
</details>

### J3. EDO lineare a coefficienti costanti, omogenea

Risolvere $y''-3y'+2y=0$.

<details><summary>Soluzione</summary>

Polinomio caratteristico $\lambda^2-3\lambda+2=(\lambda-1)(\lambda-2)=0$. Radici $1$ e $2$.

**Risultato:** $y=C_1 e^x + C_2 e^{2x}$.
</details>

### J4. EDO lineare a coefficienti costanti con termine forzante

Risolvere $y''-y=e^x$.

<details><summary>Soluzione</summary>

Omogenea: $\lambda^2-1=0$, $\lambda=\pm 1$, $y_h=C_1 e^x+C_2 e^{-x}$.
Termine forzante $e^x$ con $\lambda=1$ radice semplice: tentativo $y_p=Axe^x$. $y_p'=Ae^x+Axe^x$, $y_p''=2Ae^x+Axe^x$. Sostituendo: $2Ae^x+Axe^x - Axe^x = 2Ae^x = e^x$, $A=1/2$.

**Risultato:** $y=C_1 e^x + C_2 e^{-x} + \frac{x}{2}e^x$.
</details>

### J5. Problema di Cauchy completo

Risolvere $y''+y=\sin x$, $y(0)=0$, $y'(0)=1$.

<details><summary>Soluzione</summary>

Omogenea: $\lambda^2+1=0$, $\lambda=\pm i$, $y_h=C_1\cos x+C_2\sin x$.
Forzante $\sin x$ con $\pm i$ radici dell'omogenea: tentativo $y_p=x(A\cos x+B\sin x)$. Calcolo:
$y_p'=A\cos x+B\sin x+x(-A\sin x+B\cos x)$,
$y_p''=-2A\sin x+2B\cos x + x(-A\cos x-B\sin x)$.
$y_p''+y_p=-2A\sin x+2B\cos x = \sin x$, quindi $A=-1/2$, $B=0$. $y_p=-\frac{x}{2}\cos x$.

Soluzione generale: $y=C_1\cos x+C_2\sin x-\frac{x}{2}\cos x$.
Condizioni: $y(0)=C_1=0$. $y'(x)=-C_1\sin x+C_2\cos x-\frac{1}{2}\cos x+\frac{x}{2}\sin x$. $y'(0)=C_2-1/2=1$, $C_2=3/2$.

**Risultato:** $y(x)=\frac{3}{2}\sin x - \frac{x}{2}\cos x$.
</details>

---

> **Come usare questo eserciziario.** Fai due passaggi: un primo round dove tenti tutti gli esercizi e segni quelli che hai sbagliato; un secondo round, una settimana dopo, dove ripeti *solo* i falliti. Il fattore di ritenzione raddoppia. È la stessa logica delle flashcard di Anki applicata all'analisi.
