---
title: "Formula Sheet"
area: "Reference"
summary: "Every formula used across the site, grouped by area: time value of money, rates, mortgages, bond and equity valuation, portfolio, derivatives, statistics, macro, Italian taxes."
order: 44
level: "beginner"
prereq: []
tools:
  - "scientific calculator or spreadsheet"
---

# Formula Sheet

This is your quick reference: every formula you meet in the course sections, grouped by topic, with symbols defined and a worked example. Formulas are KaTeX-formatted so you can copy them straight into Notion, Obsidian or LaTeX. All examples use euros.

---

## 1. Time Value of Money

### 1.1 Future value (compound)

$$
FV = PV \cdot (1 + r)^n
$$

- $FV$: future value
- $PV$: present value
- $r$: rate per period
- $n$: number of periods

**Example.** I invest €10,000 at 5% per year for 10 years.
$FV = 10{,}000 \cdot 1.05^{10} = 10{,}000 \cdot 1.6289 = €16{,}288.95$.

→ sec. 11 Compound interest

### 1.2 Present value (discount)

$$
PV = \frac{FV}{(1+r)^n}
$$

**Example.** I'll receive €20,000 in 8 years; discount rate 4%.
$PV = 20{,}000 / 1.04^8 = 20{,}000 / 1.3686 = €14{,}613.73$.

### 1.3 Simple vs compound interest

$$
FV_{\text{simple}} = PV \cdot (1 + r \cdot n), \qquad FV_{\text{compound}} = PV \cdot (1 + r)^n
$$

They match for small $r \cdot n$. They diverge exponentially over long horizons.

**Example.** €1,000 at 6% for 30 years:
- simple: $1{,}000 \cdot (1 + 0.06 \cdot 30) = €2{,}800$
- compound: $1{,}000 \cdot 1.06^{30} = €5{,}743.49$

### 1.4 Continuous compounding

$$
FV = PV \cdot e^{r \cdot n}
$$

**Example.** €1,000 at 5% continuous for 10 years: $1{,}000 \cdot e^{0.5} = €1{,}648.72$.

### 1.5 Discrete ↔ continuous rate equivalence

$$
r_{\text{cont}} = \ln(1 + r_{\text{discrete}}), \qquad r_{\text{discrete}} = e^{r_{\text{cont}}} - 1
$$

**Example.** 5% annual discrete → $r_{\text{cont}} = \ln(1.05) = 4.879\%$.

### 1.6 Rule of 72

$$
n_{\text{double}} \approx \frac{72}{r\,(\%)}
$$

**Example.** At 6% per year capital doubles in $72/6 = 12$ years. (Exact value: $\ln 2 / \ln 1.06 = 11.90$ years.)

→ sec. 11

---

## 2. Rates

### 2.1 Annual nominal ↔ equivalent monthly rate

$$
r_m = (1 + r_a)^{1/12} - 1
$$

**Example.** Annual = 5% → monthly $1.05^{1/12} - 1 = 0.4074\%$.

### 2.2 APR / TAEG / ISC

The APR is the rate $i$ that solves

$$
\sum_{k=1}^{n} \frac{R_k}{(1+i)^{t_k/12}} = C_0
$$

- $R_k$: payment $k$ (including all mandatory fees and insurance)
- $t_k$: month of payment $k$
- $C_0$: net amount disbursed (after origination fees)

**Example.** €10,000 loan repaid in 12 payments of €870 (total €10,440).
Solving $\sum_{k=1}^{12} 870/(1+i)^{k/12} = 10{,}000$ gives $i \approx 7.9\%$ APR.

→ sec. 8 Loans and APR

### 2.3 Fisher equation (real rate)

$$
1 + r_{\text{real}} = \frac{1 + r_{\text{nominal}}}{1 + \pi}
$$

First-order approximation for small $\pi$:

$$
r_{\text{real}} \approx r_{\text{nominal}} - \pi
$$

- $\pi$: expected inflation

**Example.** Savings account at 4%, expected inflation 3%. $r_{\text{real}} = 1.04/1.03 - 1 = 0.971\%$ (approximation gives 1%).

→ sec. 4 Inflation

### 2.4 Periodic rate conversion

$$
r_{\text{year}} = (1 + r_{\text{period}})^{m} - 1
$$

where $m$ is the number of periods in a year (12 for monthly).

**Example.** Monthly 0.5% → annual compound $1.005^{12} - 1 = 6.168\%$.

---

## 3. Mortgages and loans

### 3.1 French amortization (constant payment)

$$
R = C_0 \cdot \frac{i \cdot (1+i)^n}{(1+i)^n - 1}
$$

- $R$: constant payment
- $C_0$: initial principal
- $i$: periodic rate (annual rate / 12 for a monthly mortgage)
- $n$: number of payments

**Example.** €150,000 mortgage at 3.5% nominal, 25 years (300 payments). $i = 0.035/12 = 0.002917$.

$R = 150{,}000 \cdot \frac{0.002917 \cdot 1.002917^{300}}{1.002917^{300} - 1} = €750.93/\text{month}$.

→ sec. 8 Mortgage step by step

### 3.2 Interest and principal portions (payment $k$)

$$
I_k = D_{k-1} \cdot i, \qquad Q_k = R - I_k
$$

- $D_{k-1}$: outstanding balance after payment $k-1$
- $I_k$: interest portion of payment $k$
- $Q_k$: principal portion

**Example (first payment of the mortgage above).**
$I_1 = 150{,}000 \cdot 0.002917 = €437.50$, $Q_1 = 750.93 - 437.50 = €313.43$.

### 3.3 Outstanding balance after $k$ payments

$$
D_k = C_0 \cdot \frac{(1+i)^n - (1+i)^k}{(1+i)^n - 1}
$$

**Example.** After 60 payments (5 years) of the mortgage above:
$D_{60} = 150{,}000 \cdot \frac{1.002917^{300} - 1.002917^{60}}{1.002917^{300} - 1} = €132{,}910$.

### 3.4 Total interest paid

$$
\text{Total interest} = n \cdot R - C_0
$$

**Example.** Mortgage above: $300 \cdot 750.93 - 150{,}000 = €75{,}279$.

---

## 4. Bond valuation

### 4.1 Price as sum of discounted cash flows

$$
P = \sum_{t=1}^{n} \frac{C}{(1+y)^t} + \frac{F}{(1+y)^n}
$$

- $P$: clean bond price
- $C$: periodic coupon
- $F$: face value (redemption)
- $y$: yield to maturity (per period)

**Example.** 5-year bond, $F = 100$, annual coupon $C = 4$, $y = 3\%$.
$P = \sum_{t=1}^{5} 4/1.03^t + 100/1.03^5 = 18.32 + 86.26 = 104.58$.

→ sec. 12 Bonds

### 4.2 YTM (implicit definition)

YTM is the rate $y$ that solves equation 4.1 given price $P$. Found numerically (bisection, Newton).

**Example.** Given $P = 95$ for the bond above, solving yields $y \approx 5.17\%$.

### 4.3 Macaulay duration

$$
D_{\text{Mac}} = \frac{1}{P} \sum_{t=1}^{n} t \cdot \frac{CF_t}{(1+y)^t}
$$

- $CF_t$: cash flow at time $t$ (coupon, or coupon + face value at maturity)

**Example.** Bond from 4.1.
$D_{\text{Mac}} = (1 \cdot 4/1.03 + 2 \cdot 4/1.03^2 + \dots + 5 \cdot 104/1.03^5)/P \approx 4.63$ years.

### 4.4 Modified duration

$$
D_{\text{mod}} = \frac{D_{\text{Mac}}}{1+y}
$$

**Example.** $D_{\text{mod}} = 4.63/1.03 = 4.50$.

### 4.5 Convexity

$$
C = \frac{1}{P} \sum_{t=1}^{n} t(t+1) \cdot \frac{CF_t}{(1+y)^{t+2}}
$$

### 4.6 Price-change approximation

$$
\frac{\Delta P}{P} \approx -D_{\text{mod}} \cdot \Delta y + \frac{1}{2} \cdot C \cdot (\Delta y)^2
$$

**Example.** $D_{\text{mod}} = 4.5$, $C = 24$. If $\Delta y = +1\%$:
$\Delta P / P \approx -4.5 \cdot 0.01 + 0.5 \cdot 24 \cdot 0.0001 = -4.5\% + 0.12\% = -4.38\%$.

→ sec. 13 Duration and convexity

---

## 5. Equity valuation

### 5.1 P/E (Price-to-Earnings)

$$
P/E = \frac{P}{EPS}
$$

- $P$: share price
- $EPS$: earnings per share

**Example.** Stock at €50, EPS = €3 → $P/E = 16.7$.

### 5.2 PEG

$$
PEG = \frac{P/E}{g\,(\%)}
$$

where $g$ is the expected earnings growth rate in %.

**Example.** $P/E = 25$, $g = 20\%$ → $PEG = 25/20 = 1.25$.

### 5.3 P/B

$$
P/B = \frac{P}{BV/N}
$$

- $BV$: book value of equity
- $N$: shares outstanding

### 5.4 EV/EBITDA

$$
EV/EBITDA = \frac{\text{Market cap} + \text{Debt} - \text{Cash}}{EBITDA}
$$

**Example.** Market cap €800m, debt €300m, cash €100m, EBITDA €200m.
$EV = 800 + 300 - 100 = 1{,}000$, $EV/EBITDA = 1{,}000/200 = 5$.

### 5.5 DCF (Discounted Cash Flow)

$$
V_0 = \sum_{t=1}^{N} \frac{FCFF_t}{(1+WACC)^t} + \frac{TV_N}{(1+WACC)^N}
$$

- $FCFF_t$: Free Cash Flow to Firm in year $t$
- $TV_N$: terminal value at end of explicit horizon
- $WACC$: weighted average cost of capital

**Example (simplified).** $FCFF$ flat at €50m for 5 years, $WACC = 8\%$, $TV_5 = €600m$.
$V_0 = \sum_{t=1}^{5} 50/1.08^t + 600/1.08^5 = 199.6 + 408.3 = €607.9m$.

→ sec. 15 Fundamental valuation

### 5.6 Gordon growth (perpetuity Dividend Discount Model)

$$
P_0 = \frac{D_1}{r - g}
$$

- $D_1$: expected dividend next year
- $r$: discount rate (cost of equity)
- $g$: perpetual dividend growth rate, with $g < r$

**Example.** Expected dividend €3, cost of equity 8%, growth 3%. $P_0 = 3/(0.08 - 0.03) = €60$.

### 5.7 WACC

$$
WACC = \frac{E}{E+D} \cdot r_E + \frac{D}{E+D} \cdot r_D \cdot (1-T)
$$

- $E, D$: market values of equity and debt
- $r_E$: cost of equity (from CAPM)
- $r_D$: cost of debt
- $T$: corporate tax rate

**Example.** $E = 800$, $D = 200$, $r_E = 10\%$, $r_D = 4\%$, $T = 24\%$.
$WACC = 0.8 \cdot 0.10 + 0.2 \cdot 0.04 \cdot 0.76 = 0.08 + 0.00608 = 8.608\%$.

### 5.8 DuPont (ROE decomposition)

$$
ROE = NPM \cdot AT \cdot EM = \frac{\text{Net income}}{\text{Sales}} \cdot \frac{\text{Sales}}{\text{Assets}} \cdot \frac{\text{Assets}}{\text{Equity}}
$$

- $NPM$: Net Profit Margin
- $AT$: Asset Turnover
- $EM$: Equity Multiplier (leverage)

**Example.** $NPM = 8\%$, $AT = 1.5$, $EM = 2$ → $ROE = 0.08 \cdot 1.5 \cdot 2 = 24\%$.

### 5.9 FCFF and FCFE

$$
FCFF = EBIT \cdot (1-T) + D\&A - \Delta WC - CapEx
$$

$$
FCFE = FCFF - \text{Interest} \cdot (1-T) + \Delta \text{Debt}
$$

---

## 6. Portfolio theory

### 6.1 Expected portfolio return

$$
E[R_p] = \sum_{i=1}^{n} w_i \cdot E[R_i]
$$

- $w_i$: weight of asset $i$ (sum to 1)

**Example.** 60% equity with $E[R]=8\%$, 40% bonds with $E[R]=3\%$.
$E[R_p] = 0.6 \cdot 8 + 0.4 \cdot 3 = 6\%$.

### 6.2 2-asset portfolio variance

$$
\sigma_p^2 = w_1^2 \sigma_1^2 + w_2^2 \sigma_2^2 + 2 w_1 w_2 \rho_{12} \sigma_1 \sigma_2
$$

- $\rho_{12}$: correlation between the two assets

**Example.** $w_1 = 0.6$, $\sigma_1 = 15\%$; $w_2 = 0.4$, $\sigma_2 = 6\%$; $\rho = 0.2$.
$\sigma_p^2 = 0.6^2 \cdot 0.15^2 + 0.4^2 \cdot 0.06^2 + 2 \cdot 0.6 \cdot 0.4 \cdot 0.2 \cdot 0.15 \cdot 0.06 = 0.0081 + 0.000576 + 0.000864 = 0.00954$.
$\sigma_p = \sqrt{0.00954} = 9.77\%$.

### 6.3 $n$-asset portfolio variance (matrix form)

$$
\sigma_p^2 = \mathbf{w}^T \Sigma \mathbf{w}
$$

where $\Sigma$ is the covariance matrix.

### 6.4 Covariance and correlation

$$
\text{Cov}(R_i, R_j) = E[(R_i - E[R_i])(R_j - E[R_j])], \qquad \rho_{ij} = \frac{\text{Cov}(R_i, R_j)}{\sigma_i \sigma_j}
$$

### 6.5 Sharpe ratio

$$
S = \frac{E[R_p] - R_f}{\sigma_p}
$$

**Example.** $E[R_p]=8\%$, $R_f=2\%$, $\sigma_p=12\%$ → $S = (8-2)/12 = 0.50$.

→ sec. 21 Risk measures

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

- $R_b$: benchmark return

### 6.9 Modigliani M²

$$
M^2 = R_f + S_p \cdot \sigma_m
$$

- $S_p$: portfolio Sharpe
- $\sigma_m$: market volatility

### 6.10 Jensen's alpha

$$
\alpha = E[R_p] - [R_f + \beta_p (E[R_m] - R_f)]
$$

**Example.** $E[R_p]=11\%$, $R_f=2\%$, $\beta_p=1.1$, $E[R_m]=8\%$.
$\alpha = 11 - [2 + 1.1 \cdot 6] = 11 - 8.6 = 2.4\%$.

→ sec. 21

---

## 7. CAPM and factor models

### 7.1 CAPM

$$
E[R_i] = R_f + \beta_i \cdot (E[R_m] - R_f)
$$

- $E[R_m] - R_f$: equity risk premium

**Example.** $R_f = 3\%$, ERP = 6%, $\beta = 1.2$ → $E[R_i] = 3 + 1.2 \cdot 6 = 10.2\%$.

→ sec. 19 CAPM

### 7.2 Beta as Cov/Var

$$
\beta_i = \frac{\text{Cov}(R_i, R_m)}{\text{Var}(R_m)}
$$

**Example.** $\text{Cov}(R_i, R_m) = 0.0288$, $\text{Var}(R_m) = 0.0225$ → $\beta = 1.28$.

### 7.3 Fama-French 3-factor

$$
R_i - R_f = \alpha + \beta_M (R_m - R_f) + \beta_{SMB} \cdot SMB + \beta_{HML} \cdot HML + \varepsilon
$$

- $SMB$: small minus big (size)
- $HML$: high minus low book-to-market (value)

### 7.4 Fama-French 5-factor

$$
R_i - R_f = \alpha + \beta_M MKT + \beta_{SMB} SMB + \beta_{HML} HML + \beta_{RMW} RMW + \beta_{CMA} CMA + \varepsilon
$$

- $RMW$: robust minus weak (profitability)
- $CMA$: conservative minus aggressive (investment)

→ sec. 20 Factor investing

---

## 8. Risk measures

### 8.1 Parametric VaR (normal distribution)

$$
VaR_\alpha = -z_\alpha \cdot \sigma \cdot V_0
$$

- $z_\alpha$: standard normal quantile at level $\alpha$ (e.g. $z_{0.99} = 2.326$)
- $\sigma$: portfolio volatility over the horizon
- $V_0$: portfolio value

**Example.** $V_0 = €1{,}000{,}000$, $\sigma_{1d} = 1\%$, 99% level.
$VaR_{99\%, 1d} = 2.326 \cdot 0.01 \cdot 1{,}000{,}000 = €23{,}260$.

→ sec. 21 VaR and Expected Shortfall

### 8.2 Scaling VaR across horizons

$$
VaR_T = VaR_1 \cdot \sqrt{T}
$$

(assuming i.i.d. returns).

**Example.** From 1d to 10d: $VaR_{10d} = 23{,}260 \cdot \sqrt{10} = €73{,}540$.

### 8.3 Historical VaR

$$
VaR_\alpha = -\text{Quantile}_\alpha(\{R_t\}_{t=1}^{T}) \cdot V_0
$$

Sort historical returns and take the empirical $\alpha$ quantile.

### 8.4 CVaR / Expected Shortfall

$$
ES_\alpha = -E[R \mid R < -VaR_\alpha] \cdot V_0
$$

Average loss in the worst cases beyond VaR.

### 8.5 Maximum Drawdown

$$
MaxDD = \min_{t} \frac{V_t - \max_{s \le t} V_s}{\max_{s \le t} V_s}
$$

**Example.** Peak 100, subsequent low 70 → $MaxDD = (70-100)/100 = -30\%$.

### 8.6 Calmar ratio

$$
\text{Calmar} = \frac{R_{\text{annual}}}{|MaxDD|}
$$

**Example.** Annual return 12%, MaxDD –20% → Calmar = 0.6.

---

## 9. Derivatives

### 9.1 Call and put payoffs (at expiry)

$$
\text{Payoff}_{\text{call}}(S_T) = \max(S_T - K, 0)
$$
$$
\text{Payoff}_{\text{put}}(S_T) = \max(K - S_T, 0)
$$

- $S_T$: underlying price at expiry
- $K$: strike

### 9.2 Straddle payoff (long)

$$
\text{Payoff}_{\text{straddle}}(S_T) = \max(S_T - K, 0) + \max(K - S_T, 0) = |S_T - K|
$$

### 9.3 Put-Call parity (European, no dividends)

$$
C - P = S_0 - K \cdot e^{-rT}
$$

- $C, P$: European call and put prices with same strike $K$ and expiry $T$

**Example.** $S_0 = 100$, $K = 100$, $r = 4\%$, $T = 1$, $C = 9$.
$P = C - S_0 + K e^{-rT} = 9 - 100 + 100 \cdot e^{-0.04} = 9 - 100 + 96.079 = 5.079$.

### 9.4 Black-Scholes (European, no dividends)

$$
C = S_0 \cdot N(d_1) - K e^{-rT} \cdot N(d_2)
$$
$$
P = K e^{-rT} \cdot N(-d_2) - S_0 \cdot N(-d_1)
$$
$$
d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma \sqrt{T}}, \qquad d_2 = d_1 - \sigma \sqrt{T}
$$

- $N(\cdot)$: standard normal CDF
- $\sigma$: annualized volatility
- $T$: time to expiry in years
- $r$: continuous risk-free rate

**Example.** $S_0 = 100$, $K = 100$, $r = 4\%$, $\sigma = 20\%$, $T = 1$.
$d_1 = (0 + (0.04 + 0.02) \cdot 1)/(0.20) = 0.30$; $d_2 = 0.30 - 0.20 = 0.10$.
$N(0.30) = 0.6179$, $N(0.10) = 0.5398$.
$C = 100 \cdot 0.6179 - 100 \cdot e^{-0.04} \cdot 0.5398 = 61.79 - 51.86 = 9.93$.
$P = 100 \cdot e^{-0.04} \cdot N(-0.10) - 100 \cdot N(-0.30) = 96.08 \cdot 0.4602 - 100 \cdot 0.3821 = 44.21 - 38.21 = 6.00$.
Check: $C - P = 9.93 - 6.00 = 3.93 \approx S_0 - K e^{-rT} = 100 - 96.08 = 3.92$. ✓

→ sec. 23 Black-Scholes

### 9.5 Greeks (Black-Scholes closed forms, no dividends)

Let $\phi(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$ (normal density):

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

**Example (continuing 9.4).**
$\phi(0.30) = 0.3814$.
- $\Delta_{\text{call}} = N(0.30) = 0.618$
- $\Gamma = 0.3814 / (100 \cdot 0.20 \cdot 1) = 0.01907$
- Vega $= 100 \cdot 0.3814 \cdot 1 = 38.14$ (per unit change in $\sigma$, i.e. 100%; per 1 percentage point, divide by 100 → 0.381)

→ sec. 23

---

## 10. Statistics for finance

### 10.1 Arithmetic return

$$
R_t = \frac{P_t - P_{t-1}}{P_{t-1}}
$$

### 10.2 Log-return

$$
r_t = \ln\!\left(\frac{P_t}{P_{t-1}}\right)
$$

Log-returns are time-additive: $r_{1,T} = \sum_{t=1}^{T} r_t$.

**Example.** $P_0 = 100$, $P_1 = 105$. $R_1 = 5\%$, $r_1 = \ln 1.05 = 4.879\%$.

### 10.3 Volatility annualization

$$
\sigma_{\text{annual}} = \sigma_{\text{daily}} \cdot \sqrt{252}
$$

(252 = trading days in a year; use 12 for monthly data: $\sigma_{\text{annual}} = \sigma_m \sqrt{12}$).

**Example.** $\sigma_{1d} = 1\%$ → $\sigma_{\text{annual}} = 1\% \cdot \sqrt{252} = 15.87\%$.

→ sec. 19

### 10.4 VaR as % of value

$$
VaR_\alpha\,(\%) = z_\alpha \cdot \sigma
$$

**Example.** $\sigma_{\text{annual}} = 16\%$, 99% level → $VaR = 2.326 \cdot 16 = 37.2\%$.

---

## 11. Macro

### 11.1 Fisher equation (rates)

$$
i \approx r + \pi^e
$$

- $i$: nominal rate
- $r$: real rate
- $\pi^e$: expected inflation

(Exact form: $1+i = (1+r)(1+\pi^e)$, see 2.3.)

→ sec. 4

### 11.2 Taylor rule (simplified)

$$
i_t = r^* + \pi_t + 0.5(\pi_t - \pi^*) + 0.5 \cdot \text{output gap}_t
$$

- $r^*$: neutral real rate (R*)
- $\pi^*$: central-bank inflation target (e.g. 2%)
- $\pi_t$: current inflation
- output gap = (actual GDP – potential GDP) / potential GDP

**Example.** $r^* = 0.5\%$, $\pi^* = 2\%$, $\pi_t = 4\%$, output gap = +1%.
$i_t = 0.5 + 4 + 0.5(4-2) + 0.5 \cdot 1 = 6\%$. Rule suggests rates at 6%.

→ sec. 3 ECB/Fed

### 11.3 GDP: expenditure identity

$$
Y = C + I + G + (X - M)
$$

- $C$: consumption
- $I$: investment
- $G$: government spending
- $X, M$: exports, imports

### 11.4 Inflation (CPI growth)

$$
\pi_t = \frac{CPI_t - CPI_{t-12}}{CPI_{t-12}}
$$

(year-on-year reading; for monthly annualized: $\pi_{\text{ann}} = (1 + \pi_m)^{12} - 1$).

---

## 12. Italian taxes

### 12.1 Net capital gain

$$
\text{Net gain} = \text{Gross gain} \cdot (1 - \tau)
$$

with $\tau = 26\%$ (most instruments) or $\tau = 12.5\%$ (Italian government bonds, white-list and supranational such as EU/EIB).

**Example.** I sell 100 Apple shares with a €3,000 gross gain. Net = 3,000 × 0.74 = €2,220.

→ sec. 36 Tax on investments

### 12.2 Stamp duty on securities account

$$
\text{Stamp duty} = 0.002 \cdot V
$$

where $V$ is the average value of the account during the period. (For individuals; legal entities have a €14,000 annual cap.)

**Example.** Account with average value €80,000 → stamp duty €80,000 × 0.002 = €160 per year.

### 12.3 IVAFE (Italian tax on foreign assets)

On foreign financial assets (shares, ETFs, brokerage accounts):

$$
IVAFE = 0.002 \cdot V
$$

For foreign current accounts there is a threshold: 0 if below limit, otherwise a flat **€34.20** per year (per holder).

**Example.** Interactive Brokers account with average value €50,000 → IVAFE = 50,000 × 0.002 = €100.

### 12.4 IMU (second home)

$$
IMU = V_{\text{cadastral}} \cdot 1.05 \cdot 160 \cdot \text{rate}
$$

- $V_{\text{cadastral}}$: cadastral income revalued by 5% then multiplied by 160 (multiplier varies by category A, B, C)
- rate: typical 0.86%, customizable by municipality between 0.46% and 1.06%

**Example.** Cadastral income €800/year, rate 0.86%.
Taxable base = 800 × 1.05 × 160 = €134,400. IMU = 134,400 × 0.0086 = €1,155.84.

### 12.5 IRPEF (2026 brackets)

Progressive rates on taxable income:

| Bracket | Rate |
|---|---|
| 0 – €28,000 | 23% |
| €28,000 – €50,000 | 35% |
| above €50,000 | 43% |

Plus regional surcharge (1.23%–3.33%) and municipal surcharge (0%–0.9%).

**Example.** Taxable income €35,000.
Gross IRPEF = 28,000 × 0.23 + 7,000 × 0.35 = 6,440 + 2,450 = €8,890.

→ sec. 35 Italian tax system

### 12.6 Cedolare secca (flat tax on rents)

$$
\text{Tax} = \text{Rent} \cdot \tau
$$

with $\tau = 21\%$ (open market) or $\tau = 10\%$ (capped rents in high-pressure cities).

**Example.** Rent €1,000/month, open market. Tax = 12,000 × 0.21 = €2,520/year.

→ sec. 36

---

## 13. Useful constants

- $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$, $z_{0.995} = 2.576$
- US trading days per year: 252; per week: 5
- Italian capital-gain standard rate: 26% (Italian govies and similar: 12.5%)
- Stamp duty on securities accounts: 0.20%/year (individuals), 0.20% capped at €14,000 (entities)
- IVAFE: 0.20% (foreign brokerage accounts), €34.20 flat (foreign current accounts)
- 2026 IRPEF: 23% / 35% / 43%
- US dividend rate for Italian residents with W-8BEN: 15%

---

When a course section introduces a new formula, it gets added here. If you find one used in the lessons but missing here, flag it as a bug in the material.
