---
title: "Tecniche di integrazione: per parti, per sostituzione"
area: Integrali
summary: "Le **due grandi tecniche**. **Per parti** = trasposta della regola del prodotto, $\\int u\\,dv = uv - \\int v\\,du$. **Sostituzione** = trasposta della catena, $\\int f(\\varphi)\\varphi'\\,dx = \\int f(u)\\,du$. Sostituzioni standard."
order: 41
level: intermedio
prereq:
  - "TFC e tabella integrali immediati (sez. 40)"
  - "Regola prodotto e catena"
tools:
  - "Apostol — *Calculus*, vol. I, cap. 5"
---

# Tecniche di integrazione

## Perché parlarne

Il TFC riduce $\int_a^b f$ alla ricerca di una primitiva. La tabella degli integrali immediati copre i mattoni base, ma in pratica abbiamo **composizioni** e **prodotti**. Servono manipolazioni che riducano integrali complessi a forme tabulate. Padroneggiando le due tecniche base si risolve **circa l'80%** degli integrali "classici".

## Integrazione per parti

**Teorema.** $f, g \in C^1(I)$. Allora
$$\int f(x)\,g'(x)\,dx = f(x)\,g(x) - \int f'(x)\,g(x)\,dx.$$

> **Glossarietto:**
>
> - $f(x)g(x)$ = il "prodotto bell'è fatto".
> - $\int f'g$ = il nuovo integrale residuo, che speriamo più semplice.
> - **Forma differenziale (mantra):** $\int u\,dv = uv - \int v\,du$.

*Dim.* Da $(fg)' = f'g + fg'$, integrando: $fg = \int f'g + \int fg'$, isola. ∎

### Strategia LIATE

Scegli $u$ secondo l'ordine:

- **L** Logaritmi
- **I** Inverse trigonometriche
- **A** Algebriche (polinomi)
- **T** Trigonometriche
- **E** Esponenziali

$u$ = prima categoria presente (deve *semplificarsi* derivando); $dv$ = il resto (deve essere *facilmente integrabile*).

### Esempi

**1.** $\int x e^x\,dx$. $u = x$, $dv = e^x dx$: $= xe^x - \int e^x dx = e^x(x-1) + c$.

**2.** $\int \ln x\,dx$. Trucco: $\ln x = \ln x \cdot 1$, $u = \ln x$, $dv = dx$: $= x\ln x - x + c$.

**3.** $\int x^2 \sin x\,dx$ (due volte). Risultato: $-x^2\cos x + 2x\sin x + 2\cos x + c$.

**4. Trucco circolare.** $I = \int e^x \sin x\,dx$. Per parti due volte ritrova $I$:
$$I = -e^x\cos x + e^x\sin x - I \Rightarrow I = \frac{e^x(\sin x - \cos x)}{2} + c.$$

**5.** $\int \arctan x\,dx = x\arctan x - \frac{1}{2}\ln(1+x^2) + c$.

## Integrazione per sostituzione

**Teorema.** $\varphi: I \to J$ derivabile $C^1$, $f: J \to \mathbb{R}$ continua, $F$ primitiva di $f$. Allora
$$\int f(\varphi(x))\,\varphi'(x)\,dx = F(\varphi(x)) + c.$$

> **Glossarietto:**
>
> - $\varphi(x)$ = funzione **interna**.
> - $\varphi'(x)\,dx$ = "differenziale interno", deve apparire nell'integranda.
> - Si pone $u = \varphi(x)$, $du = \varphi'(x)dx$.
> - **Forma definita:** $\int_\alpha^\beta f(\varphi)\varphi' = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(u)\,du$.

*Dim.* Regola della catena: $(F\circ\varphi)' = F'(\varphi)\varphi' = f(\varphi)\varphi'$. ∎

### Tre situazioni tipiche

1. **Riconoscimento diretto:** $\int 2x e^{x^2}dx = e^{x^2} + c$ con $u = x^2$.
2. **Sostituzione lineare:** $u = ax + b$. $\int \sin(3x+1) dx = -\frac{1}{3}\cos(3x+1) + c$.
3. **Sostituzione creativa:** $u = \sqrt x$, $u = e^x$, $u = \tan(x/2)$.

### Esempi

**1.** $\int \frac{x}{\sqrt{1+x^2}}dx$, $u=1+x^2$: $= \sqrt{1+x^2} + c$.

**2.** $\int \tan x\,dx = \int \sin x/\cos x\,dx$, $u = \cos x$: $= -\ln|\cos x| + c$.

**3.** $\int \sqrt{1-x^2}\,dx$, $x = \sin\theta$: $= \frac{\arcsin x}{2} + \frac{x\sqrt{1-x^2}}{2} + c$.

## Sostituzioni standard

### Trigonometriche (radicali)

| Forma | Sostituzione |
|---|---|
| $\sqrt{a^2 - x^2}$ | $x = a\sin\theta$ |
| $\sqrt{a^2 + x^2}$ | $x = a\tan\theta$ |
| $\sqrt{x^2 - a^2}$ | $x = a\sec\theta$ |

### Weierstrass (razionali in $\sin/\cos$)

Per $\int R(\sin x, \cos x)\,dx$: $t = \tan(x/2)$. Allora
$$\sin x = \frac{2t}{1+t^2},\quad \cos x = \frac{1-t^2}{1+t^2},\quad dx = \frac{2\,dt}{1+t^2}.$$

**Esempio.** $\int \frac{dx}{\sin x}$ con Weierstrass: $\int \frac{dt}{t} = \ln|\tan(x/2)| + c$.

### Radicali $\sqrt[n]{ax+b}$

$t = \sqrt[n]{ax+b}$, $x = (t^n-b)/a$, $dx = (n t^{n-1}/a)\,dt$. Trasforma in razionale.

## Tabella mnemonica

| Integranda | Tecnica |
|---|---|
| $P(x)e^{ax}, P(x)\sin(ax)$ | per parti, $u=P$ |
| $P(x)\ln x, P(x)\arctan x$ | per parti, $u=\ln x$ o $\arctan x$ |
| $e^{ax}\sin(bx), e^{ax}\cos(bx)$ | trucco circolare |
| $f(g(x))g'(x)$ | sostituzione $u=g$ |
| $\sqrt{a^2 \pm x^2}, \sqrt{x^2-a^2}$ | sost. trigonometrica |
| $R(\sin x,\cos x)$ | Weierstrass |

## Esercizi

<details>
<summary>Esercizio 1 — Per parti</summary>

$\int x\cos(2x)\,dx$. $u=x$, $dv=\cos(2x)dx$, $v=\sin(2x)/2$:
$$= \frac{x\sin(2x)}{2} + \frac{\cos(2x)}{4} + c. \qquad ∎$$
</details>

<details>
<summary>Esercizio 2 — Logaritmo per parti</summary>

$\int \frac{\ln x}{x^2}\,dx$. $u=\ln x$, $dv=dx/x^2$, $v=-1/x$:
$$= -\frac{\ln x}{x} - \frac{1}{x} + c. \qquad ∎$$
</details>

<details>
<summary>Esercizio 3 — Sostituzione trigonometrica</summary>

$\int \frac{dx}{\sqrt{4-x^2}}$. $x = 2\sin\theta$:
$$\int d\theta = \arcsin(x/2) + c. \qquad ∎$$
</details>

<details>
<summary>Esercizio 4 — Riduzione potenza dispari</summary>

$\int_0^{\pi/2}\sin^3 x\,dx$. $\sin^3 = \sin(1-\cos^2)$, $u=\cos x$:
$$= \int_0^1(1-u^2)du = 2/3. \qquad ∎$$
</details>

## Riassunto in una riga

**Per parti** ($\int u\,dv = uv - \int v\,du$) è la trasposta del prodotto; **sostituzione** ($u = \varphi(x)$) è la trasposta della catena — l'80% degli integrali si risolve combinandole, con un catalogo di sostituzioni standard per radicali e razionali trigonometrici.
