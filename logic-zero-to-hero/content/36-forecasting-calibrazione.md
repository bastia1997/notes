---
title: "Forecasting e calibrazione: la lezione dei superforecaster"
area: "Decisione"
summary: "Come si misura la qualità di una previsione probabilistica? Brier score, calibrazione, sharpness, e le tecniche dei superforecaster di Tetlock."
order: 36
level: "avanzato"
prereq:
  - "Aver letto [Teorema di Bayes](33-teorema-bayes.html)"
tools:
  - "Good Judgment Open (gjopen.com)"
  - "Metaculus, Manifold"
---

# Forecasting e calibrazione

Quando un meteorologo dice "70% di pioggia domani", come valuto se ha sbagliato o no? Una singola previsione non si può falsificare: anche al 90% può non piovere, è solo improbabile. Per valutare un previsore servono *molte* previsioni e metriche specifiche.

## 1. Calibrazione

Un previsore è **ben calibrato** se, quando dice "70% di probabilità", quel tipo di evento si verifica circa il 70% delle volte (su molte previsioni simili).

### 1.1 Curva di calibrazione

Su ascissa la probabilità prevista, su ordinata la frequenza osservata. La calibrazione perfetta è la bisettrice.

<div class="chart">
<svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" style="background:#181834">
  <line x1="40" y1="240" x2="280" y2="240" stroke="#9890b8"/>
  <line x1="40" y1="240" x2="40" y2="40" stroke="#9890b8"/>
  <text x="135" y="270" fill="#ecebff" font-size="11">probabilità prevista</text>
  <text x="0" y="140" fill="#ecebff" font-size="11" transform="rotate(-90 14 140)">frequenza osservata</text>
  <line x1="40" y1="240" x2="280" y2="40" stroke="#4cb38a" stroke-dasharray="4,3" stroke-width="1.5"/>
  <text x="240" y="55" fill="#4cb38a" font-size="10">ideale</text>
  <polyline points="40,230 88,200 136,170 184,135 232,90 280,60" stroke="#9a8cf0" stroke-width="2" fill="none"/>
  <text x="100" y="190" fill="#9a8cf0" font-size="10">buon previsore</text>
  <polyline points="40,210 88,170 136,140 184,100 232,70 280,50" stroke="#e07a8d" stroke-width="2" fill="none"/>
  <text x="160" y="115" fill="#e07a8d" font-size="10">overconfident</text>
</svg>
<div class="chart-caption">Calibrazione: il "buon previsore" segue la bisettrice; l'overconfident sovrastima la propria certezza.</div>
</div>

### 1.2 Sopra/sotto-confidenti

- **Overconfident**: dice 90% e succede 70% — sovrastima la propria certezza.
- **Underconfident**: dice 60% e succede 80% — sottostima.

I "ricercatori esperti" su politica internazionale sono mediamente *overconfident* (Tetlock 2005). I superforecaster sono leggermente *underconfident* — un po' di umiltà migliora la calibrazione.

## 2. Brier score

Misura la qualità di una previsione *probabilistica*. Per un singolo evento binario:

$$BS = (p - o)^2$$

dove $p$ = probabilità prevista, $o$ = 1 se l'evento si verifica, 0 altrimenti.

Su $N$ previsioni:

$$\bar{BS} = \frac{1}{N} \sum_{i=1}^N (p_i - o_i)^2$$

Range: $[0, 1]$. **Più basso è meglio**. Previsione perfetta = 0. Costantemente al 50% su eventi 50/50 = 0,25.

### 2.1 Decomposizione di Murphy

$$\bar{BS} = \underbrace{\bar{o}(1-\bar{o})}_{\text{incertezza}} + \underbrace{\frac{1}{N}\sum_k n_k (p_k - \bar{o}_k)^2}_{\text{calibrazione}} - \underbrace{\frac{1}{N}\sum_k n_k (\bar{o}_k - \bar{o})^2}_{\text{risoluzione}}$$

- **Incertezza** intrinseca all'evento (varianza di $o$).
- **Calibrazione**: penalità se le previsioni non coincidono con le frequenze osservate (vorresti = 0).
- **Risoluzione**: bonus se sei in grado di discriminare tra eventi che accadono e che non accadono (vorresti grande).

Un previsore costantemente al 50% è ben calibrato sull'aggregato ma ha risoluzione zero.

### 2.2 Brier multi-classe

Per $K$ categorie:

$$BS = \frac{1}{K}\sum_{k=1}^K (p_k - o_k)^2$$

dove $p_k$ è la probabilità predetta per la classe $k$ e $o_k = 1$ se quella è la classe vera.

## 3. Log score (regola di scoring "propria")

$$LS = -\log p_{\text{vero}}$$

Penalizza fortemente le previsioni "confident e sbagliate" (es. $p=0{,}01$ per un evento che accade → $-\log 0{,}01 = 4{,}6$). È una "regola propria" come il Brier score: massimizzare il valor atteso del log-score equivale a dire la propria probabilità reale, non a bluffare.

## 4. Sharpness

Quanto le tue previsioni *si allontanano dalla base rate*. Una previsione sharp è "informativa": 95% di probabilità è molto più informativo di 51%. Tra previsori ugualmente calibrati, vince chi è più sharp.

## 5. Lo studio di Tetlock

Philip Tetlock, *Expert Political Judgment* (2005): per 20 anni raccoglie ~28000 previsioni di esperti politici. Conclusione famosa: gli "esperti" non battono significativamente un algoritmo che assegna prob. uniforme. Ma dentro la massa, una sottocategoria si distingue: i **foxes** (vs **hedgehogs**).

### 5.1 Foxes vs hedgehogs

Berlin (1953), poi Tetlock: due stili cognitivi.

- **Hedgehog**: una grande idea, tutto vi si riconduce. Stile narrativo, certezze, semplificazioni. Ottimo in TV, pessimo previsore.
- **Fox**: molte idee, eclettico, accoglie evidenze contrastanti, modifica idee. Sembra meno carismatico, è significativamente più calibrato.

### 5.2 The Good Judgment Project (2011-2015)

Tetlock & Mellers nell'IARPA Geopolitical Forecasting Tournament. Tornei in cui migliaia di volontari fanno previsioni su eventi geopolitici. Il top 2% emerge come **superforecaster**: Brier score circa il 30% migliore del campo, e batte gli analisti CIA con accesso a informazioni classificate.

### 5.3 Le tecniche dei superforecaster

(Tetlock & Gardner, *Superforecasting*, 2015)

1. **Triaging**: ignorano domande troppo facili o troppo impossibili, si concentrano sulla zona di Goldilocks.
2. **Decomposizione**: spezzano la previsione in sotto-domande misurabili (vedi [Fermi estimation](27-pensiero-computazionale.html)).
3. **Reference class** (outside view): cercano frequenze base ("quanti eventi simili sono successi negli ultimi N anni?").
4. **Bayesian-style updating**: aggiornano a piccoli passi, in modo proporzionale all'evidenza.
5. **Granularità**: usano probabilità a percentuali precise (47%, non "diciamo 50%").
6. **Aggregazione**: lavorano in team, mediano stime.
7. **Post-mortem**: analizzano i propri errori, aggiornano metodologia.

## 6. Calcolo numerico di esempio

Tre previsori predicono 3 eventi (vero=V, falso=F):

| Evento | Esito | A: p | B: p | C: p |
|---|---|---|---|---|
| 1 | V | 0,7 | 0,5 | 0,9 |
| 2 | F | 0,3 | 0,5 | 0,1 |
| 3 | V | 0,8 | 0,5 | 0,4 |

Brier:

A: $((0,7-1)^2 + (0,3-0)^2 + (0,8-1)^2)/3 = (0,09 + 0,09 + 0,04)/3 = 0,073$.
B: $((0,5-1)^2 + (0,5-0)^2 + (0,5-1)^2)/3 = (0,25 + 0,25 + 0,25)/3 = 0,25$.
C: $((0,9-1)^2 + (0,1-0)^2 + (0,4-1)^2)/3 = (0,01 + 0,01 + 0,36)/3 = 0,127$.

**A vince**, perché sharp E calibrato. B è "neutro" e ottiene il valor di base. C è troppo confident sui primi due eventi (vince ma per fortuna), ed errato sul terzo.

## 7. Mercati di previsione

Polymarket, Manifold, Metaculus, PredictIt: mercati in cui si comprano "share" che pagano 1 € se un evento accade, 0 altrimenti. Il prezzo di equilibrio è la probabilità implicita.

In media, i mercati di previsione battono i singoli previsori ed equivalgono ai migliori (Wolfers & Zitzewitz 2004). Vantaggi: incentivi finanziari spingono onestà; aggregano informazione distribuita. Limiti: manipolazione, partecipazione bassa su eventi di nicchia, illegalità in alcuni paesi.

## Esercizi

<details>
  <summary>Esercizio 1 — Quale Brier score per un previsore che dice sempre "50%" su monete eque?</summary>

Su $N$ lanci, esiti circa $N/2$ teste, $N/2$ croci. Per ciascuno, $(0{,}5 - o)^2 = 0{,}25$. Quindi $\bar{BS} = 0{,}25$ — il valor di base "indifferenza". Un previsore che sapesse veramente la probabilità (es. moneta truccata 80% testa) farebbe meglio: $\bar{BS} \approx 0{,}16$.
</details>

<details>
  <summary>Esercizio 2 — Sei stato chiamato a stimare "probabilità che la mia squadra vinca lo scudetto". Quali outside view e inside view useresti?</summary>

**Outside view**: in passato, quante squadre con questa posizione di classifica a 10 partite dalla fine sono riuscite a vincere lo scudetto? Magari 20%. Quante con questa rosa? Quante con questo allenatore?

**Inside view**: dettagli stagionali (infortuni, calendario, performance recente). Affinano (o smentiscono) la stima outside.

Superforecaster: comincia outside (es. 15-20%), poi aggiorna gradualmente con elementi inside. Non parte direttamente dall'inside (rischio di overconfidence narrativa).
</details>

## Sintesi

- Calibrazione: dire 70% solo quando il 70% degli eventi simili accade.
- Brier score (più basso meglio); log-score (penalizza confident errati); sharpness (allontanamento dalla base rate).
- Decomposizione di Murphy: incertezza + (calibrazione – risoluzione).
- Tetlock: gli esperti sono mediocri; i superforecaster (Brier ~30% migliore) lavorano outside-then-inside, aggiornano a piccoli passi, sono foxes.
- Mercati di previsione aggregano e battono i singoli.

## Letture

- Tetlock, *Expert Political Judgment* (2005).
- Tetlock & Gardner, *Superforecasting* (2015).
- Murphy, *A New Vector Partition of the Probability Score*, JAM (1973).
- Silver, *The Signal and the Noise* (2012).
