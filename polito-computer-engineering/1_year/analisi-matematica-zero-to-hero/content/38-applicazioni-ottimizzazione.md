---
title: "Applicazioni dell'ottimizzazione: fisica, economia, geometria"
area: Applicazioni
summary: "Problemi di massimo e minimo dal mondo reale risolti con derivate. La ricetta uniforme e tre esempi classici (lattina ottima, legge di Snell, profitto massimo)."
order: 38
level: intermedio
prereq:
  - "Derivate, Fermat (sez. 31)"
  - "Studio di funzione (sez. 37)"
tools:
  - "Marcellini-Sbordone, vol. 1"
---

# Applicazioni dell'ottimizzazione

## Perché parlarne

Tutto il calcolo differenziale converge in una domanda ricorrente: **dato un vincolo, quale configurazione rende massima/minima una certa grandezza?**

Lo si chiede l'ingegnere (dimensiona una lattina), il fisico (cammino della luce), l'economista (quantità prodotta). Stessa ricetta:

> **Glossarietto:**
>
> - **Grandezza obiettivo** $Q$ = ciò che vuoi minimizzare/massimizzare (area, costo, tempo, profitto).
> - **Variabili libere** = grandezze su cui hai controllo.
> - **Vincoli** = relazioni che legano le variabili (es. volume fissato).
> - **Dominio** $I$ = intervallo dei valori ammissibili (es. raggio $> 0$).
> - **Punto critico** = $f'(x) = 0$.
> - **Estremi del dominio** = bordi di $I$ (vanno controllati a parte, lì $f'$ può non annullarsi).

## Ricetta operativa

1. **Identifica la grandezza** $Q$ da ottimizzare.
2. **Identifica le variabili** $x, y, z, \dots$
3. **Usa i vincoli** per ridurre a una variabile: $Q = f(x)$, $x \in I$.
4. **Calcola $f'$, trova punti critici** in $I$.
5. **Classifica** con $f''$ o segno di $f'$. Controlla anche gli estremi del dominio.
6. **Torna al problema**: rispondi con la quantità richiesta, non solo con $x$ ottimo.

> **Errore più comune:** saltare il passo 6 (dare $x$ invece dell'area/costo/tempo).
> **Secondo:** dimenticare gli estremi del dominio.

## Esempio 1 — Lattina di volume fisso, superficie minima

Lattina cilindrica di volume $V$ fissato (es. 33 cl). Quale raggio $r$ e altezza $h$ minimizzano la superficie (= materia usata)?

**Vincolo:** $V = \pi r^2 h$, fisso.

**Funzione costo:** $S = 2 \pi r^2 + 2 \pi r h$ (due basi + laterale).

**Riduzione:** $h = V/(\pi r^2)$. Quindi $S(r) = 2 \pi r^2 + 2 V/r$ per $r > 0$.

**Derivata:** $S'(r) = 4 \pi r - 2 V/r^2$. $S'(r) = 0 \Rightarrow r^3 = V/(2\pi)$, $r = (V/(2\pi))^{1/3}$.

**Classificazione:** $S'' = 4 \pi + 4 V/r^3 > 0$, quindi minimo.

**Altezza ottima:** $h = V/(\pi r^2) = 2 r$ (sostituendo).

**Risposta finale:** lattina con $h = 2r$. (Curiosamente, le lattine reali sono più sottili — vincoli pratici diversi.)

## Esempio 2 — Legge di Snell (rifrazione)

Luce passa da mezzo 1 (velocità $v_1$) a mezzo 2 (velocità $v_2$) attraverso una superficie. Quale percorso minimizza il tempo?

**Tempo:** $T = (\text{distanza in 1})/v_1 + (\text{distanza in 2})/v_2$.

Parametrizziamo col punto di rifrazione: $T(x) = \sqrt{a^2 + x^2}/v_1 + \sqrt{b^2 + (d - x)^2}/v_2$.

$T'(x) = x/(v_1 \sqrt{a^2 + x^2}) - (d - x)/(v_2 \sqrt{b^2 + (d - x)^2}) = 0$.

Riconoscendo i seni degli angoli rispetto alla normale: $\sin \theta_1/v_1 = \sin \theta_2/v_2$.

**Legge di Snell:** $\sin\theta_1/\sin\theta_2 = v_1/v_2 = n_2/n_1$. Derivata fisica fondamentale da un principio di minimo (Fermat).

## Esempio 3 — Profitto massimo

Azienda vende $q$ unità a prezzo $p(q) = a - b q$ (più produci, più scendi il prezzo). Costo totale $C(q) = c_0 + c q$. Trova $q$ che massimizza il **profitto** $\Pi = q p(q) - C(q)$.

**Profitto:** $\Pi(q) = q(a - bq) - c_0 - cq = -b q^2 + (a - c) q - c_0$.

**Derivata:** $\Pi'(q) = -2 b q + (a - c) = 0 \Rightarrow q^* = (a - c)/(2 b)$.

**$\Pi'' = -2 b < 0$**: massimo. Profitto ottimo: $\Pi(q^*) = (a - c)^2/(4 b) - c_0$.

## Esercizi

<details>
<summary>Esercizio 1 — Rettangolo iscritto</summary>

Trova il rettangolo di area massima iscritto in un semicerchio di raggio $R$ (con base sulla diametro).

**Soluzione.** Vertici $(\pm x, y)$ con $x^2 + y^2 = R^2$, base $= 2x$, altezza $= y = \sqrt{R^2 - x^2}$. Area $= 2x \sqrt{R^2 - x^2}$. Massimizzando: $x = R/\sqrt 2$, $y = R/\sqrt 2$, area $= R^2$. ∎
</details>

<details>
<summary>Esercizio 2 — Distanza minima</summary>

Distanza minima da $(2, 0)$ al grafico di $y = x^2$.

**Soluzione.** Distanza al quadrato: $d^2 = (x - 2)^2 + x^4$. Derivata: $2(x - 2) + 4 x^3 = 0 \Rightarrow 2 x^3 + x - 2 = 0$. Numericamente $x \approx 0.8$. ∎
</details>

## Riassunto in una riga

Ottimizzazione = ricetta uniforme (grandezza, variabili, vincoli, $f' = 0$, classifica, risposta) per problemi reali in geometria, fisica, economia — il vero "perché" del calcolo differenziale.
