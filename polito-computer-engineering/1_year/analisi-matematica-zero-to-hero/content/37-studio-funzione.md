---
title: "Studio di funzione completo"
area: Calcolo differenziale
summary: "Il procedimento canonico per tracciare il grafico di $f(x)$ — dominio, simmetrie, segno, asintoti, monotonia, concavità. La \"sintesi\" di tutto il calcolo differenziale visto finora."
order: 37
level: intermedio
prereq:
  - "Asintoti (sez. 23)"
  - "Monotonia/estremi (sez. 35)"
  - "Convessità (sez. 36)"
tools:
  - "Marcellini-Sbordone, vol. 1"
---

# Studio di funzione completo

## Perché parlarne

Lo "studio di funzione" è l'esercizio canonico di sintesi: si parte da $y = f(x)$ e si arriva al disegno qualitativo del grafico. Non solo esame: è il modo più diretto per "vedere" la funzione.

> **Glossarietto:**
>
> - **Dominio** = insieme dei valori $x$ per cui $f(x)$ ha senso.
> - **Funzione pari** ($f(-x) = f(x)$) = grafico simmetrico rispetto all'asse $y$.
> - **Funzione dispari** ($f(-x) = -f(x)$) = simmetrica rispetto all'origine.
> - **Asintoto orizzontale** $y = L$ = limite a $\pm\infty$ è $L$.
> - **Asintoto verticale** $x = a$ = $f(x) \to \pm\infty$ per $x \to a$.
> - **Asintoto obliquo** $y = mx + q$ = la curva si avvicina alla retta a $\pm\infty$.
> - **Punto critico** = $f'(x) = 0$; **flesso** = $f''$ cambia segno.

## Procedimento canonico (10 passi)

1. **Dominio**: escludere denominatori zero, $\ln$ di non positivi, radici pari di negativi, ecc.
2. **Simmetrie**: pari ($f(-x) = f(x)$), dispari ($f(-x) = -f(x)$), periodicità.
3. **Intersezioni con assi**: $f(0)$ se in dominio; risolvere $f(x) = 0$.
4. **Segno** di $f$: dove $> 0$, $< 0$.
5. **Limiti agli estremi** del dominio e all'infinito.
6. **Asintoti** (cap. 23): verticali, orizzontali, obliqui.
7. **$f'$ e suo segno** → monotonia, punti critici.
8. **Classificazione punti critici** → max/min locali.
9. **$f''$ e suo segno** → concavità, flessi.
10. **Schizzo**.

## Esempio guidato: $f(x) = x e^{-x^2/2}$

**1. Dominio:** $\mathbb{R}$.

**2. Simmetria:** $f(-x) = -x e^{-x^2/2} = -f(x)$ → **dispari**. Basta studiarla per $x \ge 0$, poi simmetria.

**3. Intersezioni:** $f(0) = 0$. $f(x) = 0$ solo in $x = 0$ (l'esponenziale è sempre $> 0$).

**4. Segno:** $f(x) > 0 \iff x > 0$ (e simmetricamente).

**5-6. Limiti e asintoti:** $\lim_{+\infty} x e^{-x^2/2} = 0$ (l'esponenziale negativa schiaccia). Asintoto orizzontale $y = 0$ a $\pm \infty$. Nessun asintoto verticale (dominio tutto $\mathbb{R}$).

**7. $f'$:** $f'(x) = e^{-x^2/2}(1 - x^2)$. Segno = segno di $1 - x^2$.
- Per $|x| < 1$: $f' > 0$ → $f$ crescente.
- Per $|x| > 1$: $f' < 0$ → $f$ decrescente.

Punti critici: $x = \pm 1$.

**8. Classificazione:** $x = 1$: $f' > 0$ a sinistra, $< 0$ a destra → **max locale**. $f(1) = e^{-1/2} \approx 0.607$. Per simmetria $x = -1$ è **min locale**.

**9. $f''$:** $f''(x) = e^{-x^2/2} \cdot x(x^2 - 3)$. Zeri: $x = 0, \pm \sqrt 3$. Segno: studiando i fattori.
- $f''(x) < 0$ per $x < -\sqrt 3$, $> 0$ per $-\sqrt 3 < x < 0$, $< 0$ per $0 < x < \sqrt 3$, $> 0$ per $x > \sqrt 3$.

Flessi in $x = 0, \pm \sqrt 3$.

**10. Schizzo.** Curva dispari, parte da $0$, sale a max in $(1, e^{-1/2})$, scende a 0, e a sinistra simmetria.

## Esercizi

<details>
<summary>Esercizio 1 — Studio</summary>

Esegui lo studio completo di $f(x) = x^2/(x - 1)$.

**Soluzione (schematica).**
1. Dominio: $\mathbb{R} \setminus \{1\}$.
2. Né pari né dispari.
3. Intersezioni: $f(0) = 0$.
4. Segno: $f > 0$ per $x > 1$, $< 0$ per $x < 1$, $x \ne 0$.
5-6. Verticale $x = 1$. Obliquo a $\pm \infty$: divisione polinomiale $x^2/(x-1) = x + 1 + 1/(x-1)$. Asintoto $y = x + 1$.
7. $f'(x) = (x^2 - 2x)/(x-1)^2 = x(x-2)/(x-1)^2$. Critici $x = 0, 2$.
8. $f' > 0$ per $x < 0$, $< 0$ per $0 < x < 1$, $< 0$ per $1 < x < 2$, $> 0$ per $x > 2$. Max in $x = 0$, min in $x = 2$.
9. $f''$: calcolo... $f'' = 2/(x-1)^3$. $> 0$ per $x > 1$ (convessa), $< 0$ per $x < 1$ (concava).
10. Schizzo. ∎
</details>

## Riassunto in una riga

Studio di funzione = 10 passi standard (dominio, simmetrie, segno, limiti, asintoti, $f'$/critici, classificazione, $f''$/concavità, schizzo) che combinano tutto il calcolo differenziale per "vedere" il grafico.
