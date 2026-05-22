---
title: "Funzioni integrali e applicazioni geometriche"
area: Integrali
summary: "Studio di $F(x) = \\int_a^x f(t)\\,dt$ come funzione (monotonia, concavità, estremi). **Applicazioni geometriche:** area tra curve, volumi (dischi, gusci, Pappo-Guldino), lunghezza d'arco, superficie di rivoluzione."
order: 44
level: intermedio
prereq:
  - "TFC e tecniche di integrazione (sez. 40-41)"
  - "Funzioni continue, regola della catena"
tools:
  - "Apostol — *Calculus*, vol. I, cap. 2"
---

# Funzioni integrali e applicazioni geometriche

## Perché parlarne

Dato $f \in \mathcal{R}([a,b])$, la **funzione integrale**
$$F(x) = \int_a^x f(t)\,dt$$
si è rivelata cruciale nel TFC. Ora la studiamo **come funzione**: spesso $F$ non si esprime in termini elementari, ma ne possiamo dire moltissimo **senza calcolarla**.

## Proprietà fondamentali (per $f \in C([a,b])$)

Per TFC-I, $F \in C^1$ con $F' = f$ e $F(a) = 0$.

**Conseguenze:**
- **Monotonia:** $F$ cresce dove $f > 0$, decresce dove $f < 0$.
- **Estremi locali:** $F$ ha estremi dove $f$ cambia segno.
- **Concavità:** $F'' = f'$. $F$ convessa dove $f$ crescente.
- **Flessi:** dove $f$ ha estremi locali.
- **Lipschitz:** con costante $\|f\|_\infty$.

### Estremi mobili: regola di Leibniz

$$\frac{d}{dx}\int_{u(x)}^{v(x)} f(t)\,dt = f(v(x))\,v'(x) - f(u(x))\,u'(x).$$

> **Glossarietto:**
>
> - $u(x), v(x)$ = estremi (derivabili in $x$).
> - $f$ continua.
> - **Idea:** scrivi $\Phi = G(v(x)) - G(u(x))$ con $G$ primitiva di $f$, applica catena.

## Area tra due curve

Se $g \le f$ su $[a,b]$:
$$\text{Area} = \int_a^b [f(x) - g(x)]\,dx.$$

**Esempio (area cerchio).** $x^2+y^2 \le r^2$: $-\sqrt{r^2-x^2} \le y \le \sqrt{r^2-x^2}$:
$$A = 2\int_{-r}^r \sqrt{r^2-x^2}\,dx \stackrel{x=r\sin\theta}{=} \pi r^2.$$

## Volumi di solidi di rotazione

### Metodo dei dischi (rotazione attorno all'asse $x$)

Per $f \ge 0$ su $[a,b]$, il solido ottenuto ruotando il sottografo:
$$V = \pi \int_a^b f(x)^2\,dx.$$

> **Idea:** sezione a $x$ = disco di raggio $f(x)$, area $\pi f(x)^2$ (Cavalieri).

**Esempio (sfera).** $f(x) = \sqrt{r^2-x^2}$ su $[-r,r]$:
$$V = \pi \int_{-r}^r (r^2 - x^2)\,dx = \frac{4}{3}\pi r^3.$$

**Esempio (cono).** $f(x) = Rx/h$ su $[0,h]$:
$$V = \pi \int_0^h \frac{R^2 x^2}{h^2}\,dx = \frac{1}{3}\pi R^2 h.$$

### Metodo dei gusci cilindrici (rotazione attorno all'asse $y$)

Per $a \ge 0$:
$$V = 2\pi \int_a^b x\,f(x)\,dx.$$

> **Idea:** elemento $dx$ a distanza $x$ contribuisce un guscio di altezza $f(x)$, circonferenza $2\pi x$.

### Pappo-Guldino (1° teorema)

Regione $\Omega$ di area $A$ con baricentro $(x_G, y_G)$, ruotata attorno all'asse $y$:
$$V = 2\pi\,x_G\,A.$$

**Esempio (toro).** Cerchio raggio $r$ centrato in $(R,0)$, ruotato attorno asse $y$ ($R>r$):
$$V = 2\pi R \cdot \pi r^2 = 2\pi^2 R r^2.$$

## Lunghezza d'arco

Per $\gamma : [a,b] \to \mathbb{R}^2$, $\gamma(t) = (x(t), y(t))$, $C^1$:
$$L = \int_a^b \sqrt{x'(t)^2 + y'(t)^2}\,dt = \int_a^b \|\gamma'(t)\|\,dt.$$

**Caso grafico $y = f(x)$:**
$$L = \int_a^b \sqrt{1 + f'(x)^2}\,dx.$$

**Esempio (circonferenza).** $\gamma(t) = (r\cos t, r\sin t)$, $t \in [0,2\pi]$, $\|\gamma'\| = r$:
$$L = 2\pi r.$$

## Superficie di rivoluzione

Ruotando $y = f(x) \ge 0$ attorno asse $x$:
$$S = 2\pi \int_a^b f(x)\sqrt{1+f'(x)^2}\,dx.$$

**Pappo (2° teorema).** Curva di lunghezza $L$, baricentro $x_G$:
$$S = 2\pi\,x_G\,L.$$

**Esempio (superficie sfera).** $f = \sqrt{r^2-x^2}$, $1+f'^2 = r^2/(r^2-x^2)$, $f\sqrt{1+f'^2} = r$:
$$S = 2\pi \int_{-r}^r r\,dx = 4\pi r^2.$$

> "Miracolo" di Archimede: $S$(sfera) = superficie laterale del cilindro circoscritto.

## Esercizi

<details>
<summary>Esercizio 1 — Studio funzione integrale</summary>

$F(x) = \int_0^x \sin(t^2)\,dt$ (Fresnel). $F'(x) = \sin(x^2)$, zeri in $x = \sqrt{k\pi}$. $F$ dispari (calcolo diretto), oscilla. Non esprimibile con funzioni elementari. ∎
</details>

<details>
<summary>Esercizio 2 — Area tra seno e coseno</summary>

Area tra $\sin x$ e $\cos x$ su $[\pi/4, 5\pi/4]$. $\sin \ge \cos$:
$$\int_{\pi/4}^{5\pi/4}(\sin x - \cos x)\,dx = 2\sqrt 2. \qquad ∎$$
</details>

<details>
<summary>Esercizio 3 — Volume dischi</summary>

$y = \sqrt x$, $x \in [0,4]$, ruota attorno asse $x$:
$$V = \pi \int_0^4 x\,dx = 8\pi. \qquad ∎$$
</details>

<details>
<summary>Esercizio 4 — Lunghezza catenaria</summary>

$f = \cosh x$ su $[0,a]$: $1+f'^2 = \cosh^2 x$, $\sqrt{1+f'^2} = \cosh x$:
$$L = \int_0^a \cosh x\,dx = \sinh a. \qquad ∎$$
</details>

<details>
<summary>Esercizio 5 — Toro via Pappo</summary>

Cerchio raggio 1 in $(3,0)$, attorno asse $y$. Volume: $V = 2\pi \cdot 3 \cdot \pi = 6\pi^2$. Superficie: $S = 2\pi \cdot 3 \cdot 2\pi = 12\pi^2$. ∎
</details>

## Riassunto in una riga

$F(x)=\int_a^x f$ è studiabile come funzione ($F'=f$, monotonia/concavità da $f, f'$); le applicazioni geometriche sono tutte **somma di contributi infinitesimi**: area $\int(f-g)$, volume $\pi\int f^2$ (dischi) o $2\pi\int xf$ (gusci), lunghezza $\int\sqrt{1+f'^2}$, superficie $2\pi\int f\sqrt{1+f'^2}$; Pappo-Guldino lega elegantemente baricentro e misure.
