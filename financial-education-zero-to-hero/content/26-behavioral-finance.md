---
title: "Behavioral finance: i bias che ti rovinano gli investimenti"
area: "Behavioral"
summary: "Prospect theory, loss aversion, dieci bias cognitivi che ti fanno comprare al top e vendere al fondo, e come limitarli."
order: 26
level: "intermedio"
prereq:
  - "Hai una qualche esperienza di investimento (anche piccola)"
  - "Hai letto la sezione su portafoglio"
tools:
  - "Quaderno e penna per il tuo investment journal"
  - "Foglio Excel per automazione"
  - "Buona dose di umiltà"
---

# Behavioral finance: i bias che ti rovinano gli investimenti

Per 50 anni la finanza ha costruito modelli su un'astrazione: l'**homo œconomicus**, razionale, informato, paziente, immune da emozioni. Poi sono arrivati due psicologi israeliani — Daniel Kahneman e Amos Tversky — e hanno fatto a pezzi quel personaggio. La behavioral finance è il pezzo di studio più utile che esista per il piccolo investitore: ti spiega perché compri al massimo e vendi al minimo e ti dà strumenti per smettere.

## Da homo œconomicus a esseri umani

La teoria classica assume tre cose:

1. **Preferenze coerenti** (assiomi di Von Neumann-Morgenstern).
2. **Aggiornamento bayesiano** delle credenze.
3. **Massimizzazione dell'utilità attesa**.

Tre cose che, sperimentalmente, gli umani non fanno. Il programma di ricerca behavioral parte da due ricerche fondative:

- **Tversky & Kahneman (1974)** — *Heuristics and biases*. Gli umani usano scorciatoie mentali (euristiche) che producono errori sistematici (bias).
- **Kahneman & Tversky (1979)** — *Prospect Theory*. Una teoria descrittiva della scelta sotto rischio che funziona, a differenza dell'utilità attesa.

Risultato: Nobel a Kahneman nel 2002, a Richard Thaler nel 2017.

## Prospect Theory in due grafici

La prospect theory ha quattro elementi.

### 1. Funzione del valore

Le persone valutano i risultati come **guadagni** e **perdite rispetto a un punto di riferimento**, non come livelli assoluti di ricchezza.

$$v(x) = \begin{cases} x^\alpha & x \ge 0 \\ -\lambda (-x)^\beta & x < 0 \end{cases}$$

Con $\alpha, \beta \approx 0.88$ e $\lambda \approx 2.25$. Tre fatti:

- **Concava sui guadagni** ($\alpha < 1$): avversione al rischio nei profitti. Preferisci 100 € sicuri a 50-50 di 0/200.
- **Convessa sulle perdite** ($\beta < 1$): propensione al rischio nelle perdite. Preferisci 50-50 di 0/-200 a -100 € sicuri (è il giocatore che raddoppia).
- **Più ripida sulle perdite** ($\lambda \approx 2$): **loss aversion**. Una perdita di 100 € fa più male di un guadagno di 100 €. Circa il doppio.

<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;background:#fafafa">
  <line x1="20" y1="120" x2="340" y2="120" stroke="#999"/>
  <line x1="180" y1="20" x2="180" y2="220" stroke="#999"/>
  <path d="M 180 120 C 220 100, 280 85, 330 80" stroke="#2a9d44" fill="none" stroke-width="2"/>
  <path d="M 180 120 C 150 145, 80 200, 25 215" stroke="#cc3333" fill="none" stroke-width="2"/>
  <text x="335" y="75" font-size="10" fill="#2a9d44">v(x) gain</text>
  <text x="20" y="220" font-size="10" fill="#cc3333">v(x) loss (più ripida)</text>
  <text x="185" y="15" font-size="10">v</text>
  <text x="335" y="135" font-size="10">x</text>
</svg>

### 2. Ponderazione delle probabilità

Gli umani **sovrappesano** probabilità piccole e **sottopesano** probabilità medio-alte:

$$w(p) = \frac{p^\gamma}{(p^\gamma + (1-p)^\gamma)^{1/\gamma}}$$

con $\gamma \approx 0.61$. Conseguenza: paghi troppo per assicurazioni e biglietti della lotteria (eventi rari sovrappesati), e sottostimi la probabilità di scenari "quasi certi".

### 3. Punto di riferimento

Il prezzo a cui hai comprato Tesla è un riferimento per il tuo cervello. Se ora è $-20\%$ sei "in perdita" anche se Tesla a quel prezzo, su un altro conto, sarebbe stata un'opportunità di acquisto. Il punto di riferimento è arbitrario ma domina la decisione.

### 4. Isolamento (framing)

Valuti scelte in modo separato dal resto del portafoglio (mental accounting). Una posizione a $-30\%$ ti fa più male se la guardi da sola che se la guardi come 2% di un patrimonio totale.

## Loss aversion: il bias di base

La loss aversion spiega gran parte degli errori d'investimento. **Asimmetria $\sim 2:1$**: il dolore di perdere 1.000 € è equivalente al piacere di guadagnarne 2.000.

Conseguenze pratiche:

- **Vendi i vincenti, tieni i perdenti** (disposition effect — Shefrin & Statman 1985). Realizzi guadagni piccoli per "sentirti bravo" e tieni in piedi le perdite sperando che "tornino in pari". Statisticamente perdente.
- Eviti l'azionario perché un $-30\%$ pesa il doppio di un $+30\%$ atteso (anche se equity premium è positivo).
- Sovra-assicuri rischi piccoli (estensione garanzia sull'auto da 20 €/mese) e sotto-assicuri rischi catastrofici (RC casa, polizza vita).

Esperimento classico: ti offro un coin flip — testa vincere $X$, croce perdere $100$. Per accettare, gli umani vogliono $X \approx 200$. Sotto utilità attesa con piccole somme rispetto alla ricchezza, dovresti accettare per $X > 100$.

## I dieci bias che contano

### 1. Anchoring (ancoraggio)

Ti fai influenzare da un numero ricevuto in apertura, anche se irrilevante. **Esperimento di Tversky**: ruota della fortuna che esce su 10 o 65, poi chiedono la % di paesi africani all'ONU. Stime medie: 25% (ancora 10), 45% (ancora 65). Negli investimenti: prezzo target del broker = ancora che condiziona ogni revisione futura.

### 2. Confirmation bias

Cerchi attivamente informazioni che **confermano** la tua tesi e ignori quelle che la contraddicono. Hai comprato Tesla? Leggi solo articoli pro-Tesla, segui solo investor pro-Tesla, non guardi le perdite di EBITDA del 2018. Antidoto: cerca attivamente la migliore tesi **contro** la tua posizione (steel man).

### 3. Hindsight bias

"Lo sapevo che sarebbe successo." Dopo il crollo del 2008, tutti dicevano di averlo previsto. Nei sondaggi pre-2007, < 5% lo prevedeva. Il cervello riscrive la memoria per renderti più intelligente. Antidoto: tieni un **investment journal** con le tesi scritte **prima** della decisione, leggile dopo.

### 4. Recency bias

Sovrappesi gli eventi recenti. Se l'S&P è salito 3 anni di fila, ti aspetti che salga ancora. Se è sceso 6 mesi, ti aspetti che continui a scendere. Statisticamente: i rendimenti annuali sono quasi indipendenti, il momentum esiste solo su orizzonti specifici (3–12 mesi).

### 5. Overconfidence

Sovrastimi le tue capacità di previsione. **Esperimento**: ti chiedono di stimare un intervallo al 90% di confidenza per N quantità. Le persone sbagliano nel 30–50% dei casi (dovrebbero sbagliare nel 10%). Negli investimenti: trader retail che over-tradano e perdono per commissioni. Studio Barber & Odean (2000) su 66.000 conti USA 1991–1996: i trader più attivi rendono $11.4\%$ vs $17.9\%$ del mercato, per via di commissioni e timing sbagliato.

### 6. Disposition effect

Vendere i vincenti, tenere i perdenti. Già discusso sotto loss aversion. Costo medio nel campione USA: $-3.4\%$/anno (Odean 1998).

### 7. Herd behavior / FOMO

Comprare quando tutti comprano, vendere quando tutti vendono. È la dinamica delle bolle: bitcoin a 65.000$ a novembre 2021 perché "tutti" lo compravano; bitcoin a 16.000$ a novembre 2022 perché "tutti" lo vendevano. Il social media amplifica il fenomeno.

### 8. Mental accounting

Tratti soldi diversamente a seconda della "scatola" mentale in cui li metti. 1.000 € di rimborso fiscale spesi in viaggio; 1.000 € risparmiati con fatica investiti. Stessi soldi, comportamento opposto. Thaler (1985, 1999).

### 9. House money effect

Dopo un guadagno, sei più propenso al rischio perché "stai giocando con i soldi del banco". Tipico di chi è entrato in crypto nel 2020 e ha visto x10: prende il guadagno e lo punta su altcoin sempre più rischiose. Asimmetria con il regret: quando perdi i "tuoi" soldi originali ti fa male più che perdere il guadagno.

### 10. Status quo bias

Mantieni la situazione attuale anche quando è subottimale. Risparmi sul conto corrente a 0% invece di muovere su titoli di stato a 3.5%. Hai un fondo a TER $2\%$ ereditato dalla banca e non lo cambi per "non perdere tempo". Costa migliaia di euro nel lungo periodo.

## Tabella riassuntiva

| Bias | Sintomo | Costo tipico | Antidoto |
|---|---|---|---|
| Anchoring | "Ho comprato a 10, aspetto 10" | tieni perdenti | rifletti senza prezzo carico |
| Confirmation | leggi solo amici | tesi sbagliate | cerca contro-tesi |
| Hindsight | "lo sapevo" | overconfidence futura | investment journal |
| Recency | "sale ancora" | comprare al top | media storiche, non ultimi 12 mesi |
| Overconfidence | over-trading | $-3\%$ a $-7\%$/anno | regola passiva |
| Disposition | vendi vincenti | $-3\%$/anno (Odean) | regola di stop loss & take profit |
| Herd / FOMO | compri perché tutti | bolle | piano di accumulo automatico |
| Mental accounting | soldi "diversi" | sub-ottimo | budget unico |
| House money | rischio post-guadagno | ridai indietro tutto | ribilancia, prendi profitto |
| Status quo | non muovi | persi anni di interesse | revisione semestrale |

## Errori sistematici dell'investitore retail

Il **Dalbar QAIB** (Quantitative Analysis of Investor Behavior) studia da 30 anni la differenza tra rendimento dei fondi e rendimento ottenuto dagli investitori (per via di timing). Risultati 2024 su 30 anni:

| Categoria | Fund return | Investor return | Gap |
|---|---:|---:|---:|
| Equity funds | $9.7\%$ | $7.7\%$ | $-2.0$ pp |
| Bond funds | $4.5\%$ | $0.5\%$ | $-4.0$ pp |
| Asset allocation | $7.0\%$ | $5.7\%$ | $-1.3$ pp |

Il gap (~2 pp sull'equity) è soldi lasciati a terra solo per timing emotivo. Su 100.000 € a 30 anni: $1.620.000$ vs $930.000$. Quasi 700.000 € di differenza, **per nessuna ragione tecnica**.

```mermaid
flowchart LR
    M[Mercato +9.7%/anno] --> F[Fondo equity +9.7%]
    F --> I[Investitore -2pp = 7.7%]
    I --> P[Decisioni emotive: compra top, vendi bottom]
```

## Choice architecture e nudge

Richard Thaler e Cass Sunstein hanno popolarizzato l'idea: invece di "educare" l'umano razionale, **progetta l'ambiente** in modo che le scelte di default siano buone. Esempi:

- **Iscrizione automatica a fondi pensione** (opt-out invece di opt-in). In USA partecipazione passa dal $40\%$ al $90\%$.
- **Save More Tomorrow** (Thaler & Benartzi 2004): incrementi automatici della contribuzione legati agli aumenti di stipendio. Tasso di risparmio in 4 anni: $3.5\% \rightarrow 13.6\%$.
- **Piani di accumulo automatici** (PAC su ETF): elimina il timing. Studi mostrano che gli investitori PAC hanno il 90% del gap Dalbar che si annulla.

L'idea generale: rendi l'azione virtuosa facile e l'azione distruttiva difficile.

## Robo-advisor come anti-bias

I robo-advisor (Moneyfarm, Betterment, Vanguard Digital Advisor) sono utili più come **scudo comportamentale** che come motori di rendimento. Tre meccanismi:

1. **Asset allocation pre-determinata** basata su questionario di rischio: ti costringono a riflettere prima di investire.
2. **Ribilanciamento automatico**: ti vende vincenti e compra perdenti senza chiedertelo (anti disposition effect).
3. **Difficoltà di intervento**: per cambiare allocazione devi fare passaggi, ti dà tempo di riflettere.

Costi: $0.5\%$ - $1\%$/anno. Se il "Dalbar gap" è $-2\%$ e il robo-advisor lo elimina, paga abbondantemente.

## Dieci regole personali per ridurre i bias

1. **Investment Policy Statement**: una pagina scritta su che cosa fai, in che %, perché. Letta prima di ogni decisione.
2. **Piano di accumulo automatico** mensile o trimestrale. Niente timing.
3. **Ribilanciamento meccanico**: una volta l'anno o quando uno asset esce dal range +/-5%.
4. **Investment journal**: data, decisione, tesi, prezzo. Rileggilo dopo 12 mesi.
5. **Pre-commitment a non vendere durante crash** > 20% nel primo mese.
6. **Lettura mensile, non giornaliera** del portafoglio. Guardarlo ogni giorno è il modo più sicuro di vendere.
7. **Cerca attivamente la contro-tesi** prima di un acquisto > 5% del portafoglio.
8. **Separa "core" e "satellite"**: 90% in core passivo, 10% per le idee. Il "core" non si tocca.
9. **No leverage**: la leva amplifica sia i guadagni sia i bias (panic selling forzato dalle margin call).
10. **Spiega l'investimento a un amico non-finanziario**: se non riesci a spiegarlo, non capisci, non lo fai.

## Esempio: l'effetto dei bias sul tuo wallet

Scenario: investitore retail con 50.000 € in S&P 500. Tra il 2007 e il 2024 il mercato fa $+220\%$ totale (con il crollo 2008). Tre profili:

| Comportamento | Valore finale | Rendimento annualizzato |
|---|---:|---:|
| Buy & hold totale | 160.000 € | $7.1\%$ |
| Vende a marzo 2009, rientra a fine 2010 | 95.000 € | $3.9\%$ |
| Vende a marzo 2009, mai più rientrato | 56.000 € | $0.7\%$ |
| Trader attivo medio | 110.000 € | $4.8\%$ |

Tre decisioni emotive separano 65.000 € in 17 anni dalla strategia "non fare niente".

## Trappole specifiche per ogni profilo

- **Studente / under 30**: FOMO crypto, recency su tech. Antidoto: PAC su ETF MSCI World, 10–15% massimo in "scommesse".
- **Genitore / 30–45**: status quo (paga TER 2%), confirmation (segue solo il consulente di banca). Antidoto: portafoglio passivo, controllo annuale costi.
- **Pre-pensione / 50–60**: loss aversion estrema (sposta tutto in bond), recency (compra oro nei picchi). Antidoto: glidepath programmato, non emotivo.
- **Pensionato / 60+**: status quo, herd di consigli familiari. Antidoto: revisione finanziaria annuale con consulente fee-only.

<details>
<summary>Esercizio: trova i bias nelle tue ultime 3 decisioni d'investimento</summary>

Prendi un foglio di carta. Scrivi le ultime 3 decisioni d'investimento (acquisto o vendita) degli ultimi 12 mesi. Per ognuna rispondi:

1. **Prezzo carico vs prezzo attuale**: stavi vendendo per "tornare in pari"? È disposition.
2. **Fonte dell'idea**: amico, news, social? È herd/FOMO.
3. **Hai cercato controargomenti**? Se no, è confirmation.
4. **Quanto tempo ha richiesto la decisione**? Meno di un'ora suggerisce overconfidence.
5. **Hai annotato la tesi prima**? Se no, sarai vittima di hindsight quando rivaluterai.
6. **Stavi "giocando" con un guadagno recente**? È house money.

Conta i bias presenti. Più di 2 = molto probabilmente la decisione era subottimale.

Poi imposta UNA regola per la prossima decisione (es. "investment journal di 1 paragrafo prima di ogni acquisto > 2.000 €"). Provala per 3 mesi.

</details>

## Cosa portare a casa

- L'investitore razionale non esiste: tu sei umano, anche quando investi.
- **Loss aversion** ($\sim 2:1$) è alla radice di metà dei tuoi errori.
- Dieci bias ricorrenti, ciascuno con un costo misurabile in rendimento perso.
- Il **Dalbar gap** dice che gli investitori medi lasciano $1.5–2$ punti percentuali sul tavolo ogni anno per puro comportamento.
- Soluzioni: **regole scritte**, **PAC automatico**, **ribilanciamento meccanico**, **investment journal**, **robo-advisor** o **consulente fee-only**.
- L'obiettivo non è essere intelligenti. È essere **costanti**.
