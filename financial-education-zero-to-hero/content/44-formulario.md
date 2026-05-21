---
title: "Formulario"
area: "Reference"
summary: "Tutte le formule usate nel sito raccolte per area: time value of money, tassi, mutui, valutazione bond/equity, portfolio, derivati, statistica, macro, tasse."
order: 44
level: "principiante"
prereq: []
tools:
  - "calcolatrice scientifica o foglio di calcolo"
---

# Formulario

Questa pagina è il riferimento rapido: ogni formula che incontri nelle sezioni del corso, raccolta per area con simboli definiti ed un esempio numerico. Le formule sono scritte in KaTeX e si possono copiare direttamente in Notion, Obsidian o LaTeX. Tutti gli esempi sono in euro.

---

## 1. Time Value of Money

### 1.1 Valore futuro (capitalizzazione composta)

$$
FV = PV \cdot (1 + r)^n
$$

- $FV$: valore futuro
- $PV$: valore attuale
- $r$: tasso periodale (per periodo)
- $n$: numero di periodi

**Esempio.** Investo 10.000 € al 5% annuo per 10 anni.
$FV = 10\,000 \cdot 1{,}05^{10} = 10\,000 \cdot 1{,}6289 = 16\,288{,}95\ \text{€}$.

→ sez. 11 Interesse composto

### 1.2 Valore attuale (sconto)

$$
PV = \frac{FV}{(1+r)^n}
$$

**Esempio.** Riceverò 20.000 € fra 8 anni; il tasso di sconto è il 4%.
$PV = 20\,000 / 1{,}04^8 = 20\,000 / 1{,}3686 = 14\,613{,}73\ \text{€}$.

### 1.3 Capitalizzazione semplice vs composta

$$
FV_{\text{semplice}} = PV \cdot (1 + r \cdot n), \qquad FV_{\text{composta}} = PV \cdot (1 + r)^n
$$

Per $r \cdot n$ piccolo le due coincidono. Per orizzonti lunghi divergono in modo esponenziale.

**Esempio.** 1.000 € al 6% per 30 anni:
- semplice: $1\,000 \cdot (1 + 0{,}06 \cdot 30) = 2\,800\ \text{€}$
- composta: $1\,000 \cdot 1{,}06^{30} = 5\,743{,}49\ \text{€}$

### 1.4 Capitalizzazione continua

$$
FV = PV \cdot e^{r \cdot n}
$$

**Esempio.** 1.000 € al 5% continuo per 10 anni: $1\,000 \cdot e^{0{,}5} = 1\,648{,}72\ \text{€}$.

### 1.5 Equivalenza tasso periodico ↔ continuo

$$
r_{\text{cont}} = \ln(1 + r_{\text{discreto}}), \qquad r_{\text{discreto}} = e^{r_{\text{cont}}} - 1
$$

**Esempio.** 5% discreto annuo → $r_{\text{cont}} = \ln(1{,}05) = 4{,}879\%$.

### 1.6 Regola del 72

$$
n_{\text{raddoppio}} \approx \frac{72}{r\,(\%)}
$$

**Esempio.** Al 6% annuo il capitale raddoppia in $72/6 = 12$ anni. (Valore esatto: $\ln 2 / \ln 1{,}06 = 11{,}90$ anni.)

→ sez. 11

---

## 2. Tassi

### 2.1 TAN annuo ↔ tasso mensile equivalente

$$
r_m = (1 + r_a)^{1/12} - 1
$$

**Esempio.** TAN = 5% → tasso mensile $1{,}05^{1/12} - 1 = 0{,}4074\%$.

### 2.2 TAEG / ISC

Il TAEG è il tasso $i$ che risolve

$$
\sum_{k=1}^{n} \frac{R_k}{(1+i)^{t_k/12}} = C_0
$$

- $R_k$: rata $k$ (incluse spese, assicurazioni obbligatorie, polizze incendio se richieste dalla banca)
- $t_k$: mese di pagamento della rata $k$
- $C_0$: importo netto erogato (al netto delle spese istruttoria)

**Esempio.** Prestito di 10.000 € da rimborsare con 12 rate da 870 € (totale 10.440 €).
Cercando $i$ tale che $\sum_{k=1}^{12} 870/(1+i)^{k/12} = 10\,000$ trovo $i \approx 7{,}9\%$ (TAEG).

→ sez. 8 Prestiti e TAEG

### 2.3 Equazione di Fisher (tasso reale)

$$
1 + r_{\text{reale}} = \frac{1 + r_{\text{nominale}}}{1 + \pi}
$$

Approssimazione di primo ordine valida per $\pi$ piccola:

$$
r_{\text{reale}} \approx r_{\text{nominale}} - \pi
$$

- $\pi$: tasso d'inflazione attesa

**Esempio.** Conto deposito al 4%, inflazione attesa 3%. $r_{\text{reale}} = 1{,}04/1{,}03 - 1 = 0{,}971\%$ (l'approssimazione darebbe 1%).

→ sez. 4 Inflazione

### 2.4 Conversione tassi periodali

$$
r_{\text{anno}} = (1 + r_{\text{periodo}})^{m} - 1
$$

dove $m$ è il numero di periodi nell'anno (es. 12 per il mese).

**Esempio.** Mensile 0,5% → annuale composto $1{,}005^{12} - 1 = 6{,}168\%$.

---

## 3. Mutui e prestiti

### 3.1 Rata francese (rata costante)

$$
R = C_0 \cdot \frac{i \cdot (1+i)^n}{(1+i)^n - 1}
$$

- $R$: rata costante
- $C_0$: capitale iniziale
- $i$: tasso periodale (TAN/12 per mutuo mensile)
- $n$: numero di rate

**Esempio.** Mutuo 150.000 € a TAN 3,5%, durata 25 anni (300 rate). $i = 0{,}035/12 = 0{,}002917$.

$R = 150\,000 \cdot \frac{0{,}002917 \cdot 1{,}002917^{300}}{1{,}002917^{300} - 1} = 750{,}93\ \text{€/mese}$.

→ sez. 8 Mutuo passo passo

### 3.2 Quota interessi e quota capitale (rata $k$-esima)

$$
I_k = D_{k-1} \cdot i, \qquad Q_k = R - I_k
$$

- $D_{k-1}$: debito residuo dopo la rata $k-1$
- $I_k$: quota interessi della rata $k$
- $Q_k$: quota capitale

**Esempio (rata 1 del mutuo sopra).**
$I_1 = 150\,000 \cdot 0{,}002917 = 437{,}50\ \text{€}$, $Q_1 = 750{,}93 - 437{,}50 = 313{,}43\ \text{€}$.

### 3.3 Capitale residuo dopo $k$ rate

$$
D_k = C_0 \cdot \frac{(1+i)^n - (1+i)^k}{(1+i)^n - 1}
$$

**Esempio.** Dopo 60 rate (5 anni) del mutuo sopra:
$D_{60} = 150\,000 \cdot \frac{1{,}002917^{300} - 1{,}002917^{60}}{1{,}002917^{300} - 1} = 132\,910\ \text{€}$.

### 3.4 Totale interessi pagati

$$
\text{Tot interessi} = n \cdot R - C_0
$$

**Esempio.** Mutuo sopra: $300 \cdot 750{,}93 - 150\,000 = 75\,279\ \text{€}$.

---

## 4. Valutazione bond

### 4.1 Prezzo come somma flussi attualizzati

$$
P = \sum_{t=1}^{n} \frac{C}{(1+y)^t} + \frac{F}{(1+y)^n}
$$

- $P$: prezzo del bond (corso secco)
- $C$: cedola periodica
- $F$: valore nominale (rimborso)
- $y$: yield to maturity (per periodo)

**Esempio.** Bond a 5 anni, $F = 100$, cedola annua $C = 4$, $y = 3\%$.
$P = \sum_{t=1}^{5} 4/1{,}03^t + 100/1{,}03^5 = 18{,}32 + 86{,}26 = 104{,}58$.

→ sez. 12 Obbligazioni

### 4.2 YTM (definizione implicita)

Il YTM è il tasso $y$ che risolve l'equazione 4.1 dato il prezzo $P$. Si trova numericamente (bisection, Newton).

**Esempio.** Dato $P = 95$ per il bond sopra, risolvo l'equazione e trovo $y \approx 5{,}17\%$.

### 4.3 Duration di Macaulay

$$
D_{\text{Mac}} = \frac{1}{P} \sum_{t=1}^{n} t \cdot \frac{CF_t}{(1+y)^t}
$$

- $CF_t$: cassa al tempo $t$ (cedola o cedola + rimborso a scadenza)

**Esempio.** Bond di 4.1.
$D_{\text{Mac}} = (1 \cdot 4/1{,}03 + 2 \cdot 4/1{,}03^2 + \dots + 5 \cdot 104/1{,}03^5)/P \approx 4{,}63$ anni.

### 4.4 Duration modificata

$$
D_{\text{mod}} = \frac{D_{\text{Mac}}}{1+y}
$$

**Esempio.** $D_{\text{mod}} = 4{,}63/1{,}03 = 4{,}50$.

### 4.5 Convexity

$$
C = \frac{1}{P} \sum_{t=1}^{n} t(t+1) \cdot \frac{CF_t}{(1+y)^{t+2}}
$$

### 4.6 Approssimazione variazione prezzo

$$
\frac{\Delta P}{P} \approx -D_{\text{mod}} \cdot \Delta y + \frac{1}{2} \cdot C \cdot (\Delta y)^2
$$

**Esempio.** $D_{\text{mod}} = 4{,}5$, $C = 24$. Se $\Delta y = +1\%$:
$\Delta P / P \approx -4{,}5 \cdot 0{,}01 + 0{,}5 \cdot 24 \cdot 0{,}0001 = -4{,}5\% + 0{,}12\% = -4{,}38\%$.

→ sez. 13 Duration e convexity

---

## 5. Equity valuation

### 5.1 P/E (Price-to-Earnings)

$$
P/E = \frac{P}{EPS}
$$

- $P$: prezzo dell'azione
- $EPS$: utile per azione (Earnings Per Share)

**Esempio.** Azione a 50 €, EPS = 3 € → $P/E = 16{,}7$.

### 5.2 PEG

$$
PEG = \frac{P/E}{g\,(\%)}
$$

dove $g$ è il tasso di crescita atteso degli utili in %.

**Esempio.** $P/E = 25$, $g = 20\%$ → $PEG = 25/20 = 1{,}25$.

### 5.3 P/B

$$
P/B = \frac{P}{BV/N}
$$

- $BV$: equity di libro (book value)
- $N$: numero di azioni

### 5.4 EV/EBITDA

$$
EV/EBITDA = \frac{\text{Mkt cap} + \text{Debito} - \text{Cash}}{EBITDA}
$$

**Esempio.** Mkt cap 800 mln, debito 300 mln, cash 100 mln, EBITDA 200 mln.
$EV = 800 + 300 - 100 = 1\,000$, $EV/EBITDA = 1\,000/200 = 5$.

### 5.5 DCF (Discounted Cash Flow)

$$
V_0 = \sum_{t=1}^{N} \frac{FCFF_t}{(1+WACC)^t} + \frac{TV_N}{(1+WACC)^N}
$$

- $FCFF_t$: Free Cash Flow to Firm anno $t$
- $TV_N$: terminal value alla fine dell'orizzonte esplicito
- $WACC$: weighted average cost of capital

**Esempio (semplificato).** $FCFF$ atteso costante a 50 mln per 5 anni, $WACC = 8\%$, $TV_5 = 600$ mln.
$V_0 = \sum_{t=1}^{5} 50/1{,}08^t + 600/1{,}08^5 = 199{,}6 + 408{,}3 = 607{,}9\ \text{mln}$.

→ sez. 15 Valutazione fondamentale

### 5.6 Gordon growth (Dividend Discount Model perpetuità)

$$
P_0 = \frac{D_1}{r - g}
$$

- $D_1$: dividendo atteso al prossimo anno
- $r$: tasso di sconto (costo dell'equity)
- $g$: tasso di crescita perpetua dei dividendi, con $g < r$

**Esempio.** Dividendo atteso 3 €, costo equity 8%, crescita 3%. $P_0 = 3/(0{,}08 - 0{,}03) = 60\ \text{€}$.

### 5.7 WACC

$$
WACC = \frac{E}{E+D} \cdot r_E + \frac{D}{E+D} \cdot r_D \cdot (1-T)
$$

- $E, D$: valore di mercato di equity e debito
- $r_E$: costo dell'equity (da CAPM)
- $r_D$: costo del debito
- $T$: aliquota fiscale

**Esempio.** $E = 800$, $D = 200$, $r_E = 10\%$, $r_D = 4\%$, $T = 24\%$.
$WACC = 0{,}8 \cdot 0{,}10 + 0{,}2 \cdot 0{,}04 \cdot 0{,}76 = 0{,}08 + 0{,}00608 = 8{,}608\%$.

### 5.8 DuPont (ROE scomposto)

$$
ROE = NPM \cdot AT \cdot EM = \frac{\text{Utile netto}}{\text{Vendite}} \cdot \frac{\text{Vendite}}{\text{Attivo}} \cdot \frac{\text{Attivo}}{\text{Equity}}
$$

- $NPM$: Net Profit Margin
- $AT$: Asset Turnover
- $EM$: Equity Multiplier (leva)

**Esempio.** $NPM = 8\%$, $AT = 1{,}5$, $EM = 2$ → $ROE = 0{,}08 \cdot 1{,}5 \cdot 2 = 24\%$.

### 5.9 FCFF e FCFE

$$
FCFF = EBIT \cdot (1-T) + D\&A - \Delta WC - CapEx
$$

$$
FCFE = FCFF - \text{Interessi} \cdot (1-T) + \Delta \text{Debito}
$$

---

## 6. Portfolio theory

### 6.1 Rendimento atteso di un portafoglio

$$
E[R_p] = \sum_{i=1}^{n} w_i \cdot E[R_i]
$$

- $w_i$: peso dell'asset $i$ (somma = 1)

**Esempio.** 60% azioni con $E[R]=8\%$, 40% bond con $E[R]=3\%$.
$E[R_p] = 0{,}6 \cdot 8 + 0{,}4 \cdot 3 = 6\%$.

### 6.2 Varianza portafoglio a 2 asset

$$
\sigma_p^2 = w_1^2 \sigma_1^2 + w_2^2 \sigma_2^2 + 2 w_1 w_2 \rho_{12} \sigma_1 \sigma_2
$$

- $\rho_{12}$: correlazione tra i due asset

**Esempio.** $w_1 = 0{,}6$, $\sigma_1 = 15\%$; $w_2 = 0{,}4$, $\sigma_2 = 6\%$; $\rho = 0{,}2$.
$\sigma_p^2 = 0{,}6^2 \cdot 0{,}15^2 + 0{,}4^2 \cdot 0{,}06^2 + 2 \cdot 0{,}6 \cdot 0{,}4 \cdot 0{,}2 \cdot 0{,}15 \cdot 0{,}06 = 0{,}0081 + 0{,}000576 + 0{,}000864 = 0{,}00954$.
$\sigma_p = \sqrt{0{,}00954} = 9{,}77\%$.

### 6.3 Varianza portafoglio $n$ asset (forma matriciale)

$$
\sigma_p^2 = \mathbf{w}^T \Sigma \mathbf{w}
$$

dove $\Sigma$ è la matrice di covarianza degli asset.

### 6.4 Covarianza e correlazione

$$
\text{Cov}(R_i, R_j) = E[(R_i - E[R_i])(R_j - E[R_j])], \qquad \rho_{ij} = \frac{\text{Cov}(R_i, R_j)}{\sigma_i \sigma_j}
$$

### 6.5 Sharpe ratio

$$
S = \frac{E[R_p] - R_f}{\sigma_p}
$$

**Esempio.** $E[R_p]=8\%$, $R_f=2\%$, $\sigma_p=12\%$ → $S = (8-2)/12 = 0{,}50$.

→ sez. 21 Misure di rischio

### 6.6 Sortino ratio

$$
\text{Sortino} = \frac{E[R_p] - R_f}{\sigma_{\text{downside}}}, \quad \sigma_{\text{downside}} = \sqrt{\frac{1}{T}\sum_{t} \min(R_t - R_f, 0)^2}
$$

### 6.7 Treynor ratio

$$
T = \frac{E[R_p] - R_f}{\beta_p}
$$

### 6.8 Information ratio

$$
IR = \frac{E[R_p] - E[R_b]}{\sigma(R_p - R_b)}
$$

- $R_b$: rendimento del benchmark

### 6.9 M² di Modigliani

$$
M^2 = R_f + S_p \cdot \sigma_m
$$

- $S_p$: Sharpe del portafoglio
- $\sigma_m$: volatilità del mercato

### 6.10 Jensen alpha

$$
\alpha = E[R_p] - [R_f + \beta_p (E[R_m] - R_f)]
$$

**Esempio.** $E[R_p]=11\%$, $R_f=2\%$, $\beta_p=1{,}1$, $E[R_m]=8\%$.
$\alpha = 11 - [2 + 1{,}1 \cdot 6] = 11 - 8{,}6 = 2{,}4\%$.

→ sez. 21

---

## 7. CAPM e factor models

### 7.1 CAPM

$$
E[R_i] = R_f + \beta_i \cdot (E[R_m] - R_f)
$$

- $E[R_m] - R_f$: equity risk premium

**Esempio.** $R_f = 3\%$, ERP = 6%, $\beta = 1{,}2$ → $E[R_i] = 3 + 1{,}2 \cdot 6 = 10{,}2\%$.

→ sez. 19 CAPM

### 7.2 Beta come Cov/Var

$$
\beta_i = \frac{\text{Cov}(R_i, R_m)}{\text{Var}(R_m)}
$$

**Esempio.** $\text{Cov}(R_i, R_m) = 0{,}0288$, $\text{Var}(R_m) = 0{,}0225$ → $\beta = 1{,}28$.

### 7.3 Fama-French 3 fattori

$$
R_i - R_f = \alpha + \beta_M (R_m - R_f) + \beta_{SMB} \cdot SMB + \beta_{HML} \cdot HML + \varepsilon
$$

- $SMB$: small minus big (size)
- $HML$: high minus low book-to-market (value)

### 7.4 Fama-French 5 fattori

$$
R_i - R_f = \alpha + \beta_M MKT + \beta_{SMB} SMB + \beta_{HML} HML + \beta_{RMW} RMW + \beta_{CMA} CMA + \varepsilon
$$

- $RMW$: robust minus weak (profitability)
- $CMA$: conservative minus aggressive (investment)

→ sez. 20 Factor investing

---

## 8. Risk measures

### 8.1 VaR parametrico (distribuzione normale)

$$
VaR_\alpha = -z_\alpha \cdot \sigma \cdot V_0
$$

- $z_\alpha$: quantile della normale standard al livello $\alpha$ (es. $z_{0{,}99} = 2{,}326$)
- $\sigma$: volatilità del portafoglio sull'orizzonte considerato
- $V_0$: valore del portafoglio

**Esempio.** $V_0 = 1\,000\,000$ €, $\sigma_{1d} = 1\%$, livello 99%.
$VaR_{99\%, 1d} = 2{,}326 \cdot 0{,}01 \cdot 1\,000\,000 = 23\,260\ \text{€}$.

→ sez. 21 VaR e Expected Shortfall

### 8.2 Scaling VaR sull'orizzonte

$$
VaR_T = VaR_1 \cdot \sqrt{T}
$$

(assumendo rendimenti i.i.d.).

**Esempio.** Da VaR 1g a 10g: $VaR_{10d} = 23\,260 \cdot \sqrt{10} = 73\,540\ \text{€}$.

### 8.3 VaR storico

$$
VaR_\alpha = -\text{Quantile}_\alpha(\{R_t\}_{t=1}^{T}) \cdot V_0
$$

Si ordina la serie storica dei rendimenti e si prende il quantile $\alpha$ empirico.

### 8.4 CVaR / Expected Shortfall

$$
ES_\alpha = -E[R \mid R < -VaR_\alpha] \cdot V_0
$$

In altre parole, è la perdita media nei casi peggiori oltre il VaR.

### 8.5 Maximum Drawdown

$$
MaxDD = \min_{t} \frac{V_t - \max_{s \le t} V_s}{\max_{s \le t} V_s}
$$

**Esempio.** Picco 100, minimo successivo 70 → $MaxDD = (70-100)/100 = -30\%$.

### 8.6 Calmar ratio

$$
\text{Calmar} = \frac{R_{\text{annuo}}}{|MaxDD|}
$$

**Esempio.** Rendimento annuo 12%, MaxDD –20% → Calmar = 0,6.

---

## 9. Derivati

### 9.1 Payoff call e put (alla scadenza)

$$
\text{Payoff}_{\text{call}}(S_T) = \max(S_T - K, 0)
$$
$$
\text{Payoff}_{\text{put}}(S_T) = \max(K - S_T, 0)
$$

- $S_T$: prezzo del sottostante a scadenza
- $K$: strike

### 9.2 Payoff straddle (long)

$$
\text{Payoff}_{\text{straddle}}(S_T) = \max(S_T - K, 0) + \max(K - S_T, 0) = |S_T - K|
$$

### 9.3 Put-Call parity (opzioni europee, no dividendi)

$$
C - P = S_0 - K \cdot e^{-rT}
$$

- $C, P$: prezzi di call e put europee con stesso strike $K$ e scadenza $T$

**Esempio.** $S_0 = 100$, $K = 100$, $r = 4\%$, $T = 1$, $C = 9$.
$P = C - S_0 + K e^{-rT} = 9 - 100 + 100 \cdot e^{-0{,}04} = 9 - 100 + 96{,}079 = 5{,}079$.

### 9.4 Black-Scholes (call e put europee, senza dividendi)

$$
C = S_0 \cdot N(d_1) - K e^{-rT} \cdot N(d_2)
$$
$$
P = K e^{-rT} \cdot N(-d_2) - S_0 \cdot N(-d_1)
$$
$$
d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma \sqrt{T}}, \qquad d_2 = d_1 - \sigma \sqrt{T}
$$

- $N(\cdot)$: cumulata della normale standard
- $\sigma$: volatilità annualizzata
- $T$: tempo a scadenza in anni
- $r$: tasso risk-free continuo

**Esempio.** $S_0 = 100$, $K = 100$, $r = 4\%$, $\sigma = 20\%$, $T = 1$.
$d_1 = (0 + (0{,}04 + 0{,}02) \cdot 1)/(0{,}20) = 0{,}30$; $d_2 = 0{,}30 - 0{,}20 = 0{,}10$.
$N(0{,}30) = 0{,}6179$, $N(0{,}10) = 0{,}5398$.
$C = 100 \cdot 0{,}6179 - 100 \cdot e^{-0{,}04} \cdot 0{,}5398 = 61{,}79 - 51{,}86 = 9{,}93$.
$P = 100 \cdot e^{-0{,}04} \cdot N(-0{,}10) - 100 \cdot N(-0{,}30) = 96{,}08 \cdot 0{,}4602 - 100 \cdot 0{,}3821 = 44{,}21 - 38{,}21 = 6{,}00$.
Verifica: $C - P = 9{,}93 - 6{,}00 = 3{,}93 \approx S_0 - K e^{-rT} = 100 - 96{,}08 = 3{,}92$. ✓

→ sez. 23 Black-Scholes

### 9.5 Greche (formule chiuse Black-Scholes, no dividendi)

Posto $\phi(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$ (densità normale):

$$
\Delta_{\text{call}} = N(d_1), \qquad \Delta_{\text{put}} = N(d_1) - 1
$$
$$
\Gamma = \frac{\phi(d_1)}{S_0 \sigma \sqrt{T}}
$$
$$
\text{Vega} = S_0 \cdot \phi(d_1) \cdot \sqrt{T}
$$
$$
\Theta_{\text{call}} = -\frac{S_0 \phi(d_1) \sigma}{2\sqrt{T}} - r K e^{-rT} N(d_2)
$$
$$
\Theta_{\text{put}} = -\frac{S_0 \phi(d_1) \sigma}{2\sqrt{T}} + r K e^{-rT} N(-d_2)
$$
$$
\rho_{\text{call}} = K T e^{-rT} N(d_2), \qquad \rho_{\text{put}} = -K T e^{-rT} N(-d_2)
$$

**Esempio (continuando dall'esempio 9.4).**
$\phi(0{,}30) = 0{,}3814$.
- $\Delta_{\text{call}} = N(0{,}30) = 0{,}618$
- $\Gamma = 0{,}3814 / (100 \cdot 0{,}20 \cdot 1) = 0{,}01907$
- Vega $= 100 \cdot 0{,}3814 \cdot 1 = 38{,}14$ (per variazione unitaria di $\sigma$, cioè 100%; per 1% punto, dividi per 100 → 0,381)

→ sez. 23

---

## 10. Statistica per finanza

### 10.1 Rendimento aritmetico

$$
R_t = \frac{P_t - P_{t-1}}{P_{t-1}}
$$

### 10.2 Rendimento logaritmico

$$
r_t = \ln\!\left(\frac{P_t}{P_{t-1}}\right)
$$

I log-return sono additivi nel tempo: $r_{1,T} = \sum_{t=1}^{T} r_t$.

**Esempio.** $P_0 = 100$, $P_1 = 105$. $R_1 = 5\%$, $r_1 = \ln 1{,}05 = 4{,}879\%$.

### 10.3 Annualizzazione della volatilità

$$
\sigma_{\text{annua}} = \sigma_{\text{giornaliera}} \cdot \sqrt{252}
$$

(252 = giorni di trading nell'anno; usare 12 per dati mensili: $\sigma_{\text{annua}} = \sigma_m \sqrt{12}$).

**Esempio.** $\sigma_{1d} = 1\%$ → $\sigma_{\text{annua}} = 1\% \cdot \sqrt{252} = 15{,}87\%$.

→ sez. 19

### 10.4 VaR in percentuale del valore

$$
VaR_\alpha\,(\%) = z_\alpha \cdot \sigma
$$

**Esempio.** $\sigma_{\text{annua}} = 16\%$, livello 99% → $VaR = 2{,}326 \cdot 16 = 37{,}2\%$.

---

## 11. Macro

### 11.1 Equazione di Fisher (tassi)

$$
i \approx r + \pi^e
$$

- $i$: tasso nominale
- $r$: tasso reale
- $\pi^e$: inflazione attesa

(Forma esatta: $1+i = (1+r)(1+\pi^e)$, vedi 2.3.)

→ sez. 4

### 11.2 Regola di Taylor (semplificata)

$$
i_t = r^* + \pi_t + 0{,}5(\pi_t - \pi^*) + 0{,}5 \cdot \text{output gap}_t
$$

- $r^*$: tasso reale neutrale (R*)
- $\pi^*$: obiettivo d'inflazione della banca centrale (es. 2%)
- $\pi_t$: inflazione corrente
- output gap = (PIL effettivo – PIL potenziale) / PIL potenziale

**Esempio.** $r^* = 0{,}5\%$, $\pi^* = 2\%$, $\pi_t = 4\%$, output gap = +1%.
$i_t = 0{,}5 + 4 + 0{,}5(4-2) + 0{,}5 \cdot 1 = 6\%$. Il modello suggerisce tassi al 6%.

→ sez. 3 BCE/Fed

### 11.3 PIL: identità della spesa

$$
Y = C + I + G + (X - M)
$$

- $C$: consumi
- $I$: investimenti
- $G$: spesa pubblica
- $X, M$: esportazioni, importazioni

### 11.4 Inflazione (variazione CPI)

$$
\pi_t = \frac{CPI_t - CPI_{t-12}}{CPI_{t-12}}
$$

(misurazione tendenziale anno su anno; per mensile annualizzata: $\pi_{\text{ann}} = (1 + \pi_m)^{12} - 1$).

---

## 12. Tasse Italia

### 12.1 Capital gain netto

$$
\text{Plus netta} = \text{Plus lorda} \cdot (1 - \tau)
$$

con $\tau = 26\%$ (la maggior parte degli strumenti) o $\tau = 12{,}5\%$ (titoli di Stato italiani, white list e sovranazionali come UE/BEI).

**Esempio.** Vendo 100 azioni Apple con plus di 3.000 € lorda. Netto = 3.000 · 0,74 = 2.220 €.

→ sez. 36 Fiscalità degli investimenti

### 12.2 Bollo deposito titoli

$$
\text{Bollo annuo} = 0{,}002 \cdot V
$$

dove $V$ è il controvalore medio del deposito durante il periodo. (Per le persone fisiche; per le persone giuridiche c'è un tetto annuo di 14.000 €.)

**Esempio.** Deposito con valore medio 80.000 € → bollo 80.000 · 0,002 = 160 € all'anno.

### 12.3 IVAFE

Su attività finanziarie estere (azioni, ETF, conti titoli):

$$
IVAFE = 0{,}002 \cdot V
$$

Per i conti correnti esteri c'è una franchigia: 0 € sotto soglia, altrimenti **34,20 €** fissi all'anno (per intestatario).

**Esempio.** Conto Interactive Brokers con valore medio 50.000 € → IVAFE = 50.000 · 0,002 = 100 €.

### 12.4 IMU (seconda casa)

$$
IMU = V_{\text{catastale}} \cdot 1{,}05 \cdot 160 \cdot \text{aliquota}
$$

- $V_{\text{catastale}}$: rendita catastale rivalutata del 5% e moltiplicata per 160 (categoria A, B, C diversa)
- aliquota: tipica 0,86%, modificabile dal Comune nel range 0,46%–1,06%

**Esempio.** Rendita catastale 800 €/anno, aliquota 0,86%.
Base imponibile = 800 · 1,05 · 160 = 134.400 €. IMU = 134.400 · 0,0086 = 1.155,84 €.

### 12.5 IRPEF (scaglioni 2026)

Aliquote progressive sul reddito imponibile:

| Scaglione | Aliquota |
|---|---|
| 0 – 28.000 € | 23% |
| 28.000 – 50.000 € | 35% |
| oltre 50.000 € | 43% |

Più addizionale regionale (1,23%–3,33%) e comunale (0%–0,9%).

**Esempio.** Reddito imponibile 35.000 €.
IRPEF lorda = 28.000 · 0,23 + 7.000 · 0,35 = 6.440 + 2.450 = 8.890 €.

→ sez. 35 Sistema fiscale italiano

### 12.6 Cedolare secca affitti

$$
\text{Imposta} = \text{Canone} \cdot \tau
$$

con $\tau = 21\%$ (mercato libero) o $\tau = 10\%$ (canone concordato in città ad alta tensione abitativa).

**Esempio.** Affitto 1.000 €/mese, libero. Cedolare = 12.000 · 0,21 = 2.520 €/anno.

→ sez. 36

---

## 13. Riepilogo costanti utili

- $z_{0{,}95} = 1{,}645$, $z_{0{,}975} = 1{,}960$, $z_{0{,}99} = 2{,}326$, $z_{0{,}995} = 2{,}576$
- Giorni di trading anno US: 252; settimana: 5
- Aliquota standard capital gain Italia: 26% (titoli di Stato e simili: 12,5%)
- Bollo titoli: 0,20% annuo (PF), 0,20% con tetto 14.000 € (PG)
- IVAFE: 0,20% (depositi titoli esteri), 34,20 € fissi (conti correnti esteri)
- IRPEF 2026: 23% / 35% / 43%
- Aliquota dividendi USA per residenti italiani con W-8BEN: 15%

---

Quando una sezione del corso introduce una nuova formula, viene aggiunta qui. Se ne trovi una usata nelle sezioni e non presente, è un bug del materiale: segnalalo.
