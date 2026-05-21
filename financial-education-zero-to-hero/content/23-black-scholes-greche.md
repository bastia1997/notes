---
title: "Black-Scholes e le greche"
area: "Derivati"
summary: "La formula del 1973 che ha rivoluzionato la finanza: derivazione intuitiva, calcolo passo passo, greche (Delta, Gamma, Vega, Theta, Rho) e volatilità implicita."
order: 23
level: "esperto"
prereq:
  - "Aver letto [Derivati: futures, opzioni, swap](22-derivati.html)"
  - "Distribuzione normale standard"
  - "Logaritmi, esponenziali, derivate parziali"
tools:
  - "Foglio Excel (NORMSDIST per Φ)"
  - "Python con scipy.stats.norm"
  - "Tavole della distribuzione normale standard"
---

# Black-Scholes e le greche

Nel 1973, due mesi dopo l'apertura della Chicago Board Options Exchange, **Fischer Black** e **Myron Scholes** pubblicano "The Pricing of Options and Corporate Liabilities". Lo stesso anno, **Robert Merton** sviluppa la stessa equazione con un approccio più rigoroso. Nasce un modello chiuso per il prezzo di un'opzione europea: la **formula di Black-Scholes-Merton**.

L'impatto è gigantesco. Per la prima volta i trader hanno un riferimento matematico per stabilire se un'opzione è cara o a sconto. Le scrivanie di opzioni esplodono. Scholes e Merton vincono il **Nobel 1997** (Black era morto due anni prima). E nello stesso anno, ironicamente, l'hedge fund LTCM in cui i due lavorano fa default su un'esposizione di 100 miliardi $.

In questo capitolo: ipotesi del modello, cenno alla PDE, formula chiusa per la call europea, calcolo numerico passo passo, put-call parity, le cinque greche (Delta, Gamma, Vega, Theta, Rho), volatilità implicita, smile/skew, modelli alternativi (Heston, SABR), hedging dinamico, implementazione Python.

## 1. Le ipotesi del modello

Black-Scholes non funziona "perché sì". Si appoggia su ipotesi forti:

1. **Sottostante lognormale**: i log-rendimenti sono distribuiti normalmente con media e varianza costanti. Equivalente: $S_T$ segue moto browniano geometrico.
2. **Volatilità $\sigma$ costante** nel tempo e per tutti gli strike. (Falso nel mondo reale: vedi §10.)
3. **Tasso risk-free $r$ costante** e privo di credito.
4. **Niente dividendi** (la versione base; la variante Merton aggiunge $q$).
5. **Niente costi di transazione**, niente tasse, sottostante divisibile.
6. **Short selling illimitato** e libero accesso al funding.
7. **No arbitraggio**.
8. **Mercati continui**: si possono ribilanciare i portafogli in tempo continuo.
9. **Opzione europea**: esercizio solo a scadenza.

Nessuna di queste regge perfettamente, ma il modello funziona "abbastanza bene" per opzioni vicino al denaro su sottostanti liquidi.

## 2. Cenno alla PDE di Black-Scholes-Merton

Costruisci un portafoglio $\Pi$ composto da una opzione e $-\Delta$ unità del sottostante. Scrivendo l'evoluzione di $\Pi$ tramite il lemma di Itô e imponendo che il portafoglio sia istantaneamente risk-free (deve rendere $r$ per assenza di arbitraggio), si ottiene la PDE:

$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + rS\frac{\partial V}{\partial S} - rV = 0$$

Con condizione al contorno $V(S,T) = \max(S-K,0)$ per la call. La soluzione esplicita è la formula chiusa che vedi nel paragrafo successivo. (Per il dettaglio rigoroso si rimanda a Hull, *Options Futures*, cap. 15; oppure Wilmott, *Quantitative Finance*.)

## 3. La formula chiusa

Per una **call europea** su un sottostante senza dividendi:

$$\boxed{C = S_0 \Phi(d_1) - K e^{-rT} \Phi(d_2)}$$

Per la **put europea**:

$$\boxed{P = K e^{-rT} \Phi(-d_2) - S_0 \Phi(-d_1)}$$

Dove:

$$d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}$$

$$d_2 = d_1 - \sigma\sqrt{T} = \frac{\ln(S_0/K) + (r - \sigma^2/2)T}{\sigma\sqrt{T}}$$

E $\Phi(\cdot)$ è la **funzione di ripartizione della normale standard** (l'integrale della campana di Gauss).

### 3.1 Interpretazione intuitiva

- $\Phi(d_2)$ è (in misura risk-neutral) la **probabilità che l'opzione finisca ITM** (cioè $S_T > K$).
- $\Phi(d_1)$ è la **delta** della call, ossia la sensibilità del prezzo al sottostante.
- $S_0 \Phi(d_1)$ è il valore atteso del sottostante condizionato all'esercizio.
- $K e^{-rT} \Phi(d_2)$ è il valore attuale dello strike pagato in caso di esercizio.

Insomma: prezzo call = (valore atteso di ricevere il sottostante se esercito) − (valore attuale dello strike se esercito).

## 4. Calcolo numerico passo passo

Esempio concreto: $S=100$, $K=100$, $r=4\%$, $\sigma=20\%$, $T=1$ anno. Calcoliamo il prezzo della call europea.

**Passo 1**: calcola $d_1$.

$$d_1 = \frac{\ln(100/100) + (0.04 + 0.20^2/2) \cdot 1}{0.20 \cdot \sqrt{1}}$$

$$d_1 = \frac{0 + (0.04 + 0.02)}{0.20} = \frac{0.06}{0.20} = 0.30$$

**Passo 2**: calcola $d_2$.

$$d_2 = d_1 - \sigma\sqrt{T} = 0.30 - 0.20 = 0.10$$

**Passo 3**: leggi $\Phi(d_1)$ e $\Phi(d_2)$ dalle tavole della normale standard.

| z | Φ(z) |
|---|---|
| 0.00 | 0.5000 |
| 0.10 | 0.5398 |
| 0.20 | 0.5793 |
| 0.30 | 0.6179 |
| 0.40 | 0.6554 |
| 0.50 | 0.6915 |

Quindi $\Phi(0.30) = 0.6179$ e $\Phi(0.10) = 0.5398$.

**Passo 4**: calcola $e^{-rT}$.

$$e^{-0.04 \cdot 1} = e^{-0.04} \approx 0.9608$$

**Passo 5**: assembla la formula.

$$C = 100 \cdot 0.6179 - 100 \cdot 0.9608 \cdot 0.5398$$

$$C = 61.79 - 51.86 = 9.93$$

**Prezzo della call ≈ 9.93**.

**Passo 6** (bonus): calcola la put via parità.

$$P = C - S_0 + K e^{-rT} = 9.93 - 100 + 96.08 = 6.01$$

Verifica diretta:

$$P = K e^{-rT} \Phi(-d_2) - S_0 \Phi(-d_1)$$
$$= 96.08 \cdot (1 - 0.5398) - 100 \cdot (1 - 0.6179)$$
$$= 96.08 \cdot 0.4602 - 100 \cdot 0.3821$$
$$= 44.21 - 38.21 = 6.00$$

(Il piccolo scarto da 6.01 è arrotondamento sulle tavole.)

## 5. Put-Call Parity (verifica)

Per opzioni europee senza dividendi:

$$C - P = S_0 - K e^{-rT}$$

Nel nostro esempio: $C - P = 9.93 - 6.00 = 3.93$. E $S_0 - Ke^{-rT} = 100 - 96.08 = 3.92$. Combacia (errore di arrotondamento).

Se non valesse, esisterebbe un arbitraggio: vendi il lato sopravvalutato, compri il sintetico, lock-in del profitto.

## 6. Le greche: sensibilità del prezzo

Le **greche** sono le derivate parziali del prezzo dell'opzione rispetto ai vari parametri. Servono per **gestire il rischio** di un libro di opzioni.

### 6.1 Delta

$$\Delta = \frac{\partial C}{\partial S} = \Phi(d_1) \quad \text{(call)}$$

$$\Delta = \Phi(d_1) - 1 = -\Phi(-d_1) \quad \text{(put)}$$

| Tipo | Range Delta |
|---|---|
| Call deep ITM | → 1 |
| Call ATM | ≈ 0.5 |
| Call deep OTM | → 0 |
| Put deep ITM | → −1 |
| Put ATM | ≈ −0.5 |
| Put deep OTM | → 0 |

Interpretazione: se il sottostante sale di 1€, una call con $\Delta=0.6$ aumenta di 0.6€. Delta è anche il rapporto di hedge: per coprire 1 call venduta serve comprare $\Delta$ unità di sottostante (delta hedging).

Nel nostro esempio: $\Delta_{\text{call}} = \Phi(0.30) = 0.6179$.

### 6.2 Gamma

$$\Gamma = \frac{\partial^2 C}{\partial S^2} = \frac{\phi(d_1)}{S_0 \sigma \sqrt{T}}$$

Dove $\phi(\cdot)$ è la densità della normale standard: $\phi(z) = \frac{1}{\sqrt{2\pi}} e^{-z^2/2}$.

Gamma è la **convessità**: dice quanto Delta cambia quando $S$ cambia. È massima ATM e diminuisce sia ITM che OTM. È sempre positiva sia per call che per put long.

Nel nostro esempio: $\phi(0.30) = \frac{1}{\sqrt{2\pi}} e^{-0.045} \approx 0.3814$. Quindi $\Gamma = 0.3814 / (100 \cdot 0.20 \cdot 1) = 0.01907$. Se $S$ sale di 1€, $\Delta$ aumenta di 0.019.

### 6.3 Vega

$$\mathcal{V} = \frac{\partial C}{\partial \sigma} = S_0 \sqrt{T} \cdot \phi(d_1)$$

(Nota: Vega non è una vera lettera greca, è un nome convenzionale.)

Vega misura la sensibilità a $\sigma$. Una variazione di 1 punto percentuale (es. da 20% a 21%) modifica il prezzo di Vega/100.

Nel nostro esempio: $\mathcal{V} = 100 \cdot 1 \cdot 0.3814 = 38.14$. Per un aumento di volatilità da 20% a 21% il prezzo della call passa da 9.93 a circa 9.93 + 0.3814 = **10.31**.

### 6.4 Theta

$$\Theta_{\text{call}} = -\frac{S_0 \sigma \phi(d_1)}{2\sqrt{T}} - rK e^{-rT}\Phi(d_2)$$

Theta è la **derivata rispetto al tempo** (sempre negativa per opzioni long): il valore temporale si "consuma" man mano che si avvicina la scadenza. È il famoso **time decay**.

Nel nostro esempio (annuo): 
$$\Theta = -\frac{100 \cdot 0.20 \cdot 0.3814}{2} - 0.04 \cdot 96.08 \cdot 0.5398 \approx -3.81 - 2.07 = -5.88 \text{ €/anno}$$

Diviso per 252 giorni di trading: ≈ **−0.023 €/giorno**. Ogni giorno che passa, la call perde 2.3 centesimi di valore (a parità di altro).

### 6.5 Rho

$$\rho_{\text{call}} = KT e^{-rT} \Phi(d_2)$$

Sensibilità al tasso risk-free. Aumento di $r$ → aumenta la call (penso a un costo opportunità di tenere cash invece di esercitare). Rho è la greca "meno importante" perché $r$ varia poco su orizzonti brevi.

Nel nostro esempio: $\rho = 100 \cdot 1 \cdot 0.9608 \cdot 0.5398 \approx 51.86$. Variazione di 1 punto percentuale di $r$ → impatto di 0.5186 sul prezzo.

### 6.6 Tabella riassuntiva

Greche al nostro punto $S=100, K=100, r=4\%, \sigma=20\%, T=1$:

| Greca | Valore | Significato pratico |
|---|---|---|
| $\Delta$ (Delta) | 0.6179 | +€1 in S → +€0.62 in C |
| $\Gamma$ (Gamma) | 0.01907 | +€1 in S → +0.019 in $\Delta$ |
| $\mathcal{V}$ (Vega) | 38.14 | +1pp σ → +€0.38 in C |
| $\Theta$ (Theta) | −5.88/anno | ogni giorno: −€0.023 |
| $\rho$ (Rho) | 51.86 | +1pp r → +€0.52 in C |

## 7. Volatilità implicita

Tutti i parametri della formula sono osservabili **tranne $\sigma$**. Quindi nella pratica si fa il contrario: dato il prezzo di mercato $C_{\text{mkt}}$, si trova la $\sigma$ che, inserita nella formula, restituisce $C_{\text{mkt}}$.

$$\sigma_{\text{implicita}} : BS(S, K, r, T, \sigma) = C_{\text{mkt}}$$

Si risolve numericamente (Newton-Raphson o bisezione). La volatilità implicita (IV) è la "previsione del mercato" sulla volatilità futura del sottostante.

### 7.1 VIX

Il **VIX** (CBOE Volatility Index) è una media ponderata della IV di opzioni S&P 500 a 30 giorni. È il "termometro della paura" del mercato:

- VIX < 15: bassa volatilità attesa, mercato calmo.
- VIX 15–25: livelli normali.
- VIX > 30: stress.
- VIX > 50: panico (es. 2008, marzo 2020 COVID).

## 8. Smile e skew di volatilità

La volatilità implicita non è costante (contrariamente all'ipotesi di Black-Scholes). Plottata in funzione dello strike $K$ assume forme caratteristiche.

### 8.1 Smile

Su FX e indici, opzioni deep ITM/OTM hanno IV più alta delle ATM. Il grafico ha forma di sorriso.

### 8.2 Skew

Su equity index (S&P 500, FTSE MIB), opzioni OTM-put hanno IV molto più alta delle OTM-call. È il **volatility skew**, comparso vistosamente dopo il crash del **19 ottobre 1987** ("Black Monday"). Riflette il fatto che il mercato teme molto i crash al ribasso.

```mermaid
flowchart LR
    A[OTM put<br/>IV alta] --> B[ATM<br/>IV media]
    B --> C[OTM call<br/>IV più bassa]
```

Implicazione: Black-Scholes con $\sigma$ costante sottoprezza le put OTM e sovraprezza le call OTM rispetto al mercato. Da qui i modelli più sofisticati.

## 9. Modelli alternativi (cenni)

### 9.1 Heston (1993)

Volatilità **stocastica** che segue il suo processo di mean reversion:

$$dv_t = \kappa(\theta - v_t)dt + \xi\sqrt{v_t}\,dW_t$$

Genera naturalmente smile/skew. Pricing semi-analitico via trasformata di Fourier. Usato dalle banche di investimento per FX e equity index.

### 9.2 SABR (2002, Hagan et al.)

Modello a 4 parametri ($\alpha, \beta, \rho, \nu$) molto popolare per interest rate options (swaption). Buon fit empirico dello skew.

### 9.3 Modelli a salti (Merton 1976, Kou 2002)

Aggiungono un processo di Poisson al sottostante. Catturano gap e crash.

### 9.4 Local volatility (Dupire 1994)

$\sigma(S,t)$ è funzione deterministica di sottostante e tempo. Si calibra perfettamente a una superficie di IV osservata, ma non genera bene la dinamica futura.

## 10. Hedging dinamico (delta hedging)

L'idea: se vendi una call e vuoi essere "neutro" al sottostante, compri $\Delta$ azioni. Ma siccome $\Delta$ cambia (Gamma!), devi **ribilanciare** continuamente.

Esempio: vendi 100 call con $\Delta = 0.6$ (cioè 60 azioni equivalenti). Compri 60 azioni del sottostante. Il giorno dopo $S$ è salito, $\Delta$ è 0.65 → devi comprare altre 5 azioni. Ribilanciamento.

Costi: ogni ribilanciamento sostiene commissioni e bid-ask spread. In teoria (Black-Scholes) il delta hedging continuo replica perfettamente l'opzione. In pratica c'è errore di replica + costi. Le "P&L attribution" delle scrivanie opzioni decompongono il P&L tra Theta (incassato vendendo opzioni), Vega (esposizione a IV), Gamma scalping (guadagni/perdite dal ribilanciamento), Rho.

## 11. Implementazione Python

```python
import numpy as np
from scipy.stats import norm

def bs_call(S, K, r, T, sigma):
    d1 = (np.log(S/K) + (r + 0.5*sigma**2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    C  = S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)
    return C

def bs_put(S, K, r, T, sigma):
    d1 = (np.log(S/K) + (r + 0.5*sigma**2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    P  = K*np.exp(-r*T)*norm.cdf(-d2) - S*norm.cdf(-d1)
    return P

def greeks(S, K, r, T, sigma):
    d1 = (np.log(S/K) + (r + 0.5*sigma**2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    delta = norm.cdf(d1)
    gamma = norm.pdf(d1) / (S*sigma*np.sqrt(T))
    vega  = S*np.sqrt(T)*norm.pdf(d1)
    theta = -S*sigma*norm.pdf(d1)/(2*np.sqrt(T)) - r*K*np.exp(-r*T)*norm.cdf(d2)
    rho   = K*T*np.exp(-r*T)*norm.cdf(d2)
    return dict(delta=delta, gamma=gamma, vega=vega, theta=theta, rho=rho)

# Esempio
print(bs_call(100, 100, 0.04, 1, 0.20))   # ~9.93
print(greeks(100, 100, 0.04, 1, 0.20))
```

Per la **volatilità implicita** si usa Newton-Raphson:

```python
def implied_vol(C_mkt, S, K, r, T, tol=1e-6, max_iter=100):
    sigma = 0.2  # guess iniziale
    for _ in range(max_iter):
        price = bs_call(S, K, r, T, sigma)
        d1 = (np.log(S/K) + (r + 0.5*sigma**2)*T) / (sigma*np.sqrt(T))
        vega = S*np.sqrt(T)*norm.pdf(d1)
        diff = price - C_mkt
        if abs(diff) < tol:
            return sigma
        sigma -= diff / vega
    return sigma
```

## 12. Esercizi

<details><summary>Esercizio: prezzo di una put europea</summary>

$S=100$, $K=110$, $r=3\%$, $\sigma=25\%$, $T=0.5$. Calcola il prezzo della put.

1. $d_1 = [\ln(100/110) + (0.03 + 0.5\cdot 0.0625)\cdot 0.5] / (0.25 \cdot \sqrt{0.5}) = [-0.0953 + 0.03065] / 0.1768 = -0.0647/0.1768 = -0.366$.
2. $d_2 = -0.366 - 0.1768 = -0.543$.
3. $\Phi(-d_1) = \Phi(0.366) \approx 0.6428$.
4. $\Phi(-d_2) = \Phi(0.543) \approx 0.7065$.
5. $Ke^{-rT} = 110 \cdot e^{-0.015} \approx 108.36$.
6. $P = 108.36 \cdot 0.7065 - 100 \cdot 0.6428 = 76.56 - 64.28 = $ **€12.28**.

</details>

<details><summary>Esercizio: delta hedging</summary>

Hai venduto 1000 call su un'azione con $\Delta = 0.45$. Quante azioni devi comprare per essere delta-neutrale?

1000 · 0.45 = **450 azioni**. Il giorno dopo $\Delta$ è 0.52 → 1000·0.52 = 520 azioni. Compri altre 70 azioni per restare neutrale.

Il P&L tra i due ribilanciamenti dipende da quanto $S$ si è mosso vs quanto previsto dalla IV (questo è il **gamma scalping**).

</details>

<details><summary>Esercizio: cosa succede a una call ATM a 1 giorno dalla scadenza?</summary>

$S=K=100$, $r=4\%$, $\sigma=20\%$, $T=1/365$.

1. $d_1 = [0 + (0.04 + 0.02) \cdot 0.00274] / (0.20 \cdot 0.05234) = 0.000164 / 0.01047 = 0.0157$.
2. $d_2 = 0.0157 - 0.01047 = 0.00527$.
3. $\Phi(0.0157) \approx 0.5063$, $\Phi(0.00527) \approx 0.5021$.
4. $C = 100 \cdot 0.5063 - 100 \cdot e^{-0.000109} \cdot 0.5021 \approx 50.63 - 50.20 = $ **€0.43**.

A 1 giorno il valore temporale è quasi zero. La call ATM vale solo lo "speranza" di muoversi nelle prossime 24h: praticamente $\sim \sigma\sqrt{T}/\sqrt{2\pi} \cdot S \approx 0.20 \cdot 0.0524 \cdot 100 \cdot 0.4 \approx 0.42$ €.

</details>

## 13. Critiche e limiti

- **$\sigma$ costante** non è vera (vedi skew/smile).
- **Distribuzione lognormale** sottostima fortemente le code fat (i crash sono molto più frequenti del previsto).
- **Mercati continui** sono finzione: nei weekend e holidays non puoi hedgare.
- **No costi di transazione**: in pratica il delta hedging continuo è infattibile, si fa con frequenza discreta.
- **Tassi e dividendi costanti**: deviazioni accettabili su orizzonti brevi, problematiche su LEAPS (opzioni multi-annuali).
- **Liquidità del sottostante**: su single name illiquidi il modello sbanda.

Nonostante tutto, BS è ancora il **lingua franca** del mercato delle opzioni: anche chi usa Heston o SABR quota e gestisce in termini di "BS-implied vol", e i pricing più sofisticati sono raffinamenti del modello base.

## 14. Riferimenti

- Black, Scholes (1973), "The Pricing of Options and Corporate Liabilities", *Journal of Political Economy*.
- Merton (1973), "Theory of Rational Option Pricing", *Bell Journal of Economics*.
- Hull, *Options, Futures, and Other Derivatives* (capitoli 15–19).
- Wilmott, *Paul Wilmott on Quantitative Finance* (3 vol.).
- Gatheral, *The Volatility Surface*.

## Punti chiave

- **Black-Scholes (1973)** è il primo modello chiuso per opzioni europee.
- Ipotesi forti: sottostante lognormale, $\sigma$ e $r$ costanti, no arbitraggio, mercati continui.
- Formula call: $C = S_0 \Phi(d_1) - K e^{-rT} \Phi(d_2)$.
- Esempio numerico (S=K=100, r=4%, σ=20%, T=1): **call ≈ 9.93 €**.
- **Put-Call Parity**: $C - P = S_0 - K e^{-rT}$.
- Greche: $\Delta$ (sensibilità a S), $\Gamma$ (convessità), $\mathcal{V}$ (Vega, sensibilità a σ), $\Theta$ (time decay), $\rho$ (sensibilità a r).
- **Volatilità implicita** = σ che riproduce il prezzo di mercato; il **VIX** la misura sull'S&P 500.
- **Smile/skew** post-1987 mostra che $\sigma$ non è costante: nascono Heston, SABR, local vol.
- **Delta hedging** è la strategia base per gestire un libro di opzioni; **Gamma scalping** ne è il sottoprodotto P&L.
- Implementazione in Python in ~15 righe con `scipy.stats.norm`.
