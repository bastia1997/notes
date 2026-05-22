---
title: "Account AWS, utente root, billing"
area: "Fondamenti"
summary: "Apri l'account, blocca il root user, configura MFA, allerte di costo, free tier. Le decisioni delle prime 30 minuti che ti evitano disastri."
order: 3
level: "principiante"
prereq:
  - "sezioni 1-2"
  - "carta di credito o di debito internazionale"
tools:
  - "console: https://console.aws.amazon.com"
  - "yubikey o app authenticator (Google/Microsoft/Authy)"
---

# Account AWS, utente root, billing

L'account AWS è il **confine di billing e di sicurezza primario**. Tutte le risorse che crei (EC2, S3, IAM users) vivono dentro un account. Le aziende serie hanno **decine o centinaia** di account (uno per team, ambiente, workload) federati sotto AWS Organizations (sezione 8). Qui apri il primo.

## 1. Cosa è davvero un account

Un account AWS ha:

- Un **account ID** numerico a 12 cifre (es. `123456789012`), che vedrai negli ARN.
- Un'unica email di registrazione e una password (l'**utente root**).
- Una propria fatturazione (PAN su carta o invoicing per Enterprise).
- Un proprio "tenant" IAM: utenti, ruoli, policy.
- Un proprio insieme di risorse, isolate dagli altri account a meno di sharing esplicito (Resource Access Manager, cross-account roles).

L'account è **gratis di per sé**. Paghi solo le risorse che usi.

## 2. La regola d'oro del root user

L'utente root ha **permessi assoluti** (può chiudere l'account, cambiare l'email, accedere alla fatturazione). Se qualcuno lo compromette, hai perso. Quindi:

1. **MFA obbligatorio**. Subito, prima di chiudere il browser. Idealmente con una hardware key (YubiKey). Da inizio 2024 AWS impone MFA sul root per account in Organizations.
2. **Mai usato per il lavoro quotidiano**. Dopo la creazione, fai logout e non rientrare salvo emergenze (es. chiusura account, cambio billing).
3. **Niente access key sul root**. Cancella immediatamente eventuali access key del root. Mai più crearne.
4. **Email su un alias dedicato**. Non `lavoro@tuaazienda.it` (può sparire se cambi lavoro): `aws-root+nomeazienda@…` con casella controllata da un alias di team.

## 3. Apri l'account — checklist

```text
1. Vai su https://aws.amazon.com → "Crea un account AWS"
2. Email + password (forte, password manager)
3. Tipo: Personal o Business — Business sblocca features per Organizations
4. Dati fiscali (Partita IVA se Italia/EU per fatturazione esente IVA reverse-charge)
5. Carta di credito (AWS preautorizza ~$1 e rilascia)
6. Verifica telefono via SMS o chiamata
7. Piano di supporto: scegli Basic (gratis)
```

A registrazione completata: **ferma**. Le prime 30 minuti sono critiche.

## 4. Hardening immediato (le prime 30 minuti)

In ordine:

1. **Abilita MFA sul root**: Console → in alto a destra "Security credentials" → "Multi-factor authentication" → Assign.
2. **Cancella access key root** (se per qualche motivo è stata creata).
3. **Crea il tuo IAM user personale** o, meglio, un **IAM Identity Center user** (vedi sezione 5/39). Per ora basta un IAM user con policy `AdministratorAccess` + MFA. Useremo solo questo da ora in poi.
4. **Imposta alias account**: IAM dashboard → Account Alias. Così l'URL di login diventa `https://nomealias.signin.aws.amazon.com/console` invece dell'ID a 12 cifre.
5. **Abilita IAM password policy**: minimum length, mix di caratteri, rotazione, no riuso.
6. **Disabilita le region che non userai**: Account settings → Regions. Riduce la superficie d'attacco e impedisce che qualcuno lanci EC2 a São Paulo.
7. **Abilita CloudTrail in tutte le region** (creiamo trail "multi-region"). Logging audit di ogni chiamata API. Saver: $2/mese tipico, fondamentale per indagini.

## 5. Billing setup — non saltarlo mai

Ogni account dovrebbe avere **due** allarmi minimi al primo giorno:

```bash
# Esempio: budget mensile $20 con notifica email a $15 (75%) e $20 (100%)
aws budgets create-budget \
  --account-id 123456789012 \
  --budget '{
    "BudgetName":"monthly-soft-cap",
    "BudgetLimit":{"Amount":"20","Unit":"USD"},
    "TimeUnit":"MONTHLY",
    "BudgetType":"COST"
  }' \
  --notifications-with-subscribers '[{
    "Notification":{
      "NotificationType":"ACTUAL",
      "ComparisonOperator":"GREATER_THAN",
      "Threshold":75
    },
    "Subscribers":[{"SubscriptionType":"EMAIL","Address":"tu@tuaazienda.it"}]
  }]'
```

Inoltre attiva:

- **Free Tier Alerts**: Billing dashboard → Preferences → "Receive Free Tier Usage Alerts".
- **Cost Explorer**: gratis da abilitare, ti dà breakdown per servizio e tag.
- **Cost Anomaly Detection**: ML-based, ti scrive se vede uno spike sospetto.

## 6. Free tier: cosa è davvero gratis

Tre categorie:

| Tipo | Esempio | Dura |
|---|---|---|
| **12-month free** | 750h/mese EC2 t2/t3.micro, 5 GB S3 Standard, 750h RDS db.t2/t3/t4g.micro | primi 12 mesi dall'apertura |
| **Always free** | 1M Lambda invocazioni/mese, 25 GB DynamoDB, 100 GB egress CloudFront, 750h ElastiCache micro | sempre |
| **Trials** | Inspector, Macie e altri: 30–90 giorni | una tantum |

**Trappola classica**: il free tier copre **certi tipi di istanza in certe Region**. Se per sbaglio lanci una `t3.large` o stai in `me-south-1`, sei addebitato pieno. Verifica sempre [aws.amazon.com/free](https://aws.amazon.com/free/).

## 7. Cosa è il costo "data transfer" — il bidone nascosto

| Direzione | Costo tipico |
|---|---|
| Internet → AWS (ingress) | gratis |
| AWS → Internet (egress) | ~$0.09/GB (con 100 GB free/mese al 2024+) |
| EC2 → EC2 stessa AZ via private IP | gratis |
| EC2 → EC2 cross-AZ stessa Region | $0.01/GB in ogni direzione |
| Cross-Region | $0.02–0.09/GB |
| NAT Gateway processing | $0.045/GB processato |
| VPC Endpoint Gateway (S3/DynamoDB) | gratis (no NAT) |

Esempio di disastro: app in privata subnet che chiama S3 attraverso un NAT Gateway. 1 TB di traffico al mese: $45 di NAT + $0 verso S3 same-region. Mettere un VPC Gateway Endpoint per S3 ti porta a $0. Vedremo questo nella sezione 10.

## 8. Esercizio: setup nuovo account

<details>
<summary>Apri un nuovo account AWS. Quali sono le 7 azioni nelle prime 30 minuti?</summary>

1. MFA sul root user (hardware key se possibile).
2. Logout dal root, mai usarlo per il lavoro.
3. Crea IAM user (o IAM Identity Center) admin con MFA.
4. Imposta alias account per login più semplice.
5. Configura password policy IAM.
6. Disabilita Region inutilizzate.
7. Abilita CloudTrail multi-region + Budget alert.

Bonus: abilita Cost Anomaly Detection, AWS Config (per audit di configurazione), e — se hai un'organizzazione esistente — invita questo account in Organizations.
</details>

<details>
<summary>Hai dimenticato la password root e perso accesso all'email registrata. Come recuperi?</summary>

Procedura formale via [aws.amazon.com/support](https://aws.amazon.com/contact-us/account-support/): devi provare la proprietà con documenti aziendali, ricevute della carta, ecc. Può richiedere giorni. **Motivo per cui l'email di root deve essere su un alias di team controllabile.**

Se hai MFA e perdi il device, c'è una procedura di "alternate verification" (telefono + email): può richiedere 1-2 giorni.
</details>

> **Riassunto**: l'account è il confine di billing e sicurezza. Il root user è "presidente": vota una volta (apertura) poi via. MFA subito, IAM user per il lavoro, budget alert al primo giorno, CloudTrail attivo per audit. Free tier copre 12 mesi + alcuni "always free", ma controlla regione e istanza. La voce di costo che fregra è il **data transfer**, soprattutto egress e NAT Gateway.
