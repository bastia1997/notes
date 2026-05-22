---
title: "Calcolo di limiti tramite Taylor"
area: Calcolo differenziale
summary: "La tecnica più potente per risolvere limiti $0/0$ con funzioni elementari. Sostituisci ogni $f$ col suo polinomio di Taylor a ordine adeguato, fai l'algebra dei termini, leggi il limite dall'ordine dominante."
order: 34
level: intermedio
prereq:
  - "Polinomio di Taylor (sez. 33)"
  - "$o$-piccolo (sez. 15)"
tools:
  - "Rudin — *Principles*, cap. 5"
---

# Calcolo di limiti tramite Taylor

## Perché parlarne

**Hôpital** trasforma un limite in un altro limite. **Taylor** lo trasforma in **calcolo algebrico**: sostituisci ogni funzione con il suo polinomio di Maclaurin a ordine adatto, fai l'algebra, leggi il limite.

Per espressioni con $\exp, \sin, \cos, \ln, $ potenze, è quasi sempre la via più rapida e con meno errori.

## Strategia generale

Per $\lim_{x \to 0} f(x)/g(x)$ in forma $0/0$:

1. **Stima l'ordine** di $f$ e $g$ in 0 (cioè $f \sim a x^p$, $g \sim b x^q$).
2. **Sviluppa** $f$ e $g$ con Taylor fino ad almeno $\max(p, q)$.
3. **Sostituisci** e semplifica.
4. **Limite** = rapporto dei termini di ordine più basso non nullo.

## Sviluppi base (da memoria)

$$e^x = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + o(x^3)$$
$$\sin x = x - \frac{x^3}{6} + o(x^4)$$
$$\cos x = 1 - \frac{x^2}{2} + \frac{x^4}{24} + o(x^5)$$
$$\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} + o(x^3)$$
$$(1 + x)^\alpha = 1 + \alpha x + \binom{\alpha}{2} x^2 + o(x^2)$$

> **Glossarietto:**
>
> - $o(x^n)$ = "**o-piccolo** di $x^n$": termine che tende a 0 **più velocemente** di $x^n$ per $x \to 0$.
> - $f(x) \sim a x^p$ ($x \to 0$) = $f$ è **asintotica** a $ax^p$ (rapporto $\to 1$), cioè $p$ è l'**ordine** di $f$ in 0.
> - $\binom{\alpha}{2} = \alpha(\alpha-1)/2$ = coefficiente binomiale generalizzato.
> - **Ordine adeguato:** quante derivate ti servono dipende dall'ordine di annullamento previsto del numeratore (vedi strategia).

## Esempi guidati

### Esempio 1 — Limite classico

$\lim_{x \to 0} \frac{\sin x - x}{x^3}$.

*Soluzione.* $\sin x = x - x^3/6 + o(x^3)$. Quindi $\sin x - x = -x^3/6 + o(x^3)$. Diviso $x^3$: $-1/6 + o(1) \to -1/6$.

### Esempio 2 — Con esponenziale

$\lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$.

*Soluzione.* $e^x = 1 + x + x^2/2 + o(x^2)$. $e^x - 1 - x = x^2/2 + o(x^2)$. Diviso $x^2$: $1/2$.

### Esempio 3 — Multipli ingredienti

$\lim_{x \to 0} \frac{\ln(1 + x) - \sin x}{x^2}$.

*Soluzione.* $\ln(1 + x) = x - x^2/2 + o(x^2)$, $\sin x = x + o(x^2)$ (ordine 3 in più, è già zero a ordine 2). Differenza: $-x^2/2 + o(x^2)$. Diviso $x^2$: $-1/2$.

### Esempio 4 — Tutto Taylor

$\lim_{x \to 0} \frac{\cos x - 1 + x^2/2}{x^4}$.

*Soluzione.* $\cos x = 1 - x^2/2 + x^4/24 + o(x^4)$. Numeratore: $x^4/24 + o(x^4)$. Limite: $1/24$.

## Errori da evitare

**Errore 1: ordine troppo basso.**
$\lim_0 (\sin x - x)/x^3$ con $\sin x = x + o(x)$: numeratore $= o(x)$, diviso $x^3$ dà $o(1/x^2)$ — informazione insufficiente. Serve almeno $\sin x = x - x^3/6 + o(x^3)$.

**Errore 2: dimenticare di propagare $o$.**
$\sin(x^2) = x^2 + o(x^2)$ NO. Si sostituisce $y = x^2$, e $\sin y = y + o(y) = x^2 + o(x^2)$ no, ancora sbagliato: deve essere $o(y^3) = o(x^6)$. Quindi $\sin(x^2) = x^2 - x^6/6 + o(x^6)$.

**Errore 3: cancellazioni di termini di ordine principale.**
Se i termini di grado più basso si cancellano, devi sviluppare a ordine più alto. (Vedi esempio 3 vs 4.)

## Esercizi

<details>
<summary>Esercizio 1</summary>

$\lim_{x \to 0} \frac{e^{x^2} - \cos x}{x^2}$.

**Soluzione.** $e^{x^2} = 1 + x^2 + o(x^2)$, $\cos x = 1 - x^2/2 + o(x^2)$. Differenza: $3 x^2/2 + o(x^2)$. Limite: $3/2$. ∎
</details>

<details>
<summary>Esercizio 2</summary>

$\lim_{x \to 0} \frac{x - \sin x}{x - \tan x}$.

**Soluzione.** $x - \sin x = x^3/6 + o(x^3)$. $\tan x = x + x^3/3 + o(x^3)$, quindi $x - \tan x = -x^3/3 + o(x^3)$. Rapporto: $(x^3/6)/(-x^3/3) = -1/2$. ∎
</details>

## Riassunto in una riga

**Taylor per i limiti:** sostituisci ogni funzione col suo Maclaurin a ordine sufficiente, simplifica, leggi il rapporto dei termini dominanti — la tecnica più potente per limiti $0/0$ con funzioni elementari.
