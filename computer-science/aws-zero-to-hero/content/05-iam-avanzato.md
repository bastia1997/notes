---
title: "IAM avanzato: policy condizionali, STS, ABAC"
area: "Identità & Sicurezza"
summary: "Condition keys, ABAC con tag, STS e credential vending, federazione SAML/OIDC, sts:ExternalId per cross-account sicuro, AssumeRoleWithWebIdentity per workload Kubernetes/CI."
order: 5
level: "intermedio"
prereq:
  - "sezione 4 (IAM fondamenti)"
tools:
  - "AWS CLI"
  - "jq per parsare output STS"
---

# IAM avanzato

Una volta capiti utenti, ruoli e policy, IAM si apre in tre direzioni avanzate: **condizioni** (granularità chirurgica), **ABAC** (attribute-based access control: governare per tag invece che policy esplose), e **STS** (il backbone della federazione e del cross-account).

## 1. Condition keys

Le condition keys arricchiscono `Allow`/`Deny` con vincoli runtime. Tre categorie:

- **Global**: prefissate `aws:` (esistono per tutti i servizi). Esempi: `aws:SourceIp`, `aws:MultiFactorAuthPresent`, `aws:RequestedRegion`, `aws:CurrentTime`, `aws:PrincipalOrgID`.
- **Servizio-specifiche**: prefissate dal servizio. `s3:x-amz-server-side-encryption`, `ec2:InstanceType`, `dynamodb:LeadingKeys`.
- **Per tag**: `aws:RequestTag/<key>`, `aws:ResourceTag/<key>`, `aws:PrincipalTag/<key>`.

```json
{
  "Effect":"Allow",
  "Action":"ec2:RunInstances",
  "Resource":"*",
  "Condition":{
    "StringEquals":{"ec2:InstanceType":["t3.micro","t3.small"]},
    "StringEqualsIfExists":{"aws:RequestTag/Project":"alpha"},
    "Bool":{"aws:MultiFactorAuthPresent":"true"},
    "IpAddress":{"aws:SourceIp":"203.0.113.0/24"}
  }
}
```

Tipi di operatore: `StringEquals`, `StringLike`, `NumericLessThan`, `DateGreaterThan`, `Bool`, `IpAddress`, `ArnLike`, `Null`, e i loro `*IfExists`. Si combinano con AND logico nel blocco `Condition` e OR logico negli array.

## 2. ABAC: governare per tag

ABAC = **Attribute-Based Access Control**. Invece di scrivere una policy per ciascun team/progetto, scrivi UNA policy che dice "puoi agire su risorse il cui tag `Project` corrisponde al tuo `Project`".

```json
{
  "Effect":"Allow",
  "Action":["s3:GetObject","s3:PutObject"],
  "Resource":"arn:aws:s3:::data-*/*",
  "Condition":{
    "StringEquals":{"aws:ResourceTag/Project":"${aws:PrincipalTag/Project}"}
  }
}
```

Vantaggi:

- Scali a 1000 team senza esplodere il numero di policy.
- Nuovo team = nuovo tag, zero codice IAM.
- Audit più semplice: i tag sono la verità.

Svantaggi:

- Richiede governance dei tag (chi li applica, validazione automatica).
- Risorse legacy senza tag → fallisce silenziosamente.
- Più difficile da debuggare ("perché non vedo questa risorsa?").

## 3. STS: il vending machine delle credenziali

**STS (Security Token Service)** emette credenziali temporanee. Ogni assumeRole, ogni federazione, ogni `aws sso login` finisce in una chiamata STS che restituisce tre cose: AccessKeyId, SecretAccessKey, SessionToken — valide 15 min–12 ore.

API principali:

| API | Quando |
|---|---|
| `AssumeRole` | il principal A assume un ruolo (in stesso account o altro) |
| `AssumeRoleWithSAML` | utente da IdP SAML (Okta, AD FS) assume un ruolo |
| `AssumeRoleWithWebIdentity` | identità da OIDC (Cognito, Google, GitHub Actions, Kubernetes IRSA) |
| `GetSessionToken` | un IAM user ottiene una sessione MFA |
| `GetFederationToken` | rare, per app proxy |

Punto critico: STS è **regionale**. Esiste un endpoint globale (`sts.amazonaws.com`) ma è considerato anti-pattern: usa l'endpoint regionale (`sts.eu-west-1.amazonaws.com`) per latenza e isolamento di failure.

## 4. Cross-account: il confused deputy e l'ExternalId

Scenario: tu (account A) vuoi che un fornitore (account B, es. Datadog) acceda al tuo S3. Crei un ruolo in A con `Principal: arn:aws:iam::B:root` in trust policy.

Problema: B potrebbe assumere il tuo ruolo per conto di **un altro suo cliente** (confused deputy). Soluzione: **sts:ExternalId** — un valore segreto che A genera e dà a B. B deve includerlo in `AssumeRole`. A lo verifica.

```json
"Condition":{
  "StringEquals":{"sts:ExternalId":"a-random-secret-12345"}
}
```

Tutti i fornitori SaaS seri (Datadog, Snowflake, Wiz, ecc.) lo richiedono.

## 5. Federazione moderna: IAM Identity Center + OIDC

**IAM Identity Center** (ex AWS SSO) è il modo 2026 per gestire umani. Si collega al tuo IdP (Entra ID, Okta, Google Workspace), e l'utente fa SSO una volta e accede a tutti gli account dell'Organization, con set di permessi (permission sets) per account.

**OIDC** (OpenID Connect) è il modo per workload non-AWS. Esempi pratici:

- **GitHub Actions** ottiene credenziali AWS senza access key statiche (`AssumeRoleWithWebIdentity` su un identity provider OIDC che fida GitHub).
- **Kubernetes IRSA** (IAM Roles for Service Accounts): pod EKS assume un ruolo basato sul service account.

Esempio trust policy per GitHub Actions:

```json
{
  "Version":"2012-10-17",
  "Statement":[{
    "Effect":"Allow",
    "Principal":{"Federated":"arn:aws:iam::111:oidc-provider/token.actions.githubusercontent.com"},
    "Action":"sts:AssumeRoleWithWebIdentity",
    "Condition":{
      "StringEquals":{"token.actions.githubusercontent.com:aud":"sts.amazonaws.com"},
      "StringLike":{"token.actions.githubusercontent.com:sub":"repo:myorg/myrepo:ref:refs/heads/main"}
    }
  }]
}
```

Risultato: il workflow CI ottiene credenziali AWS scadenti in 1 ora, niente segreti in repo.

## 6. Permissions boundary in dettaglio

Una boundary è una policy che limita il **massimo** che un'altra policy può concedere. Non concede nulla da sola. Pattern tipico: dai ai dev il diritto di creare ruoli, ma con boundary fissa.

```bash
aws iam create-role \
  --role-name app-role \
  --assume-role-policy-document file://trust.json \
  --permissions-boundary arn:aws:iam::111:policy/DevBoundary
```

Anche se il dev allega `AdministratorAccess` al ruolo creato, il ruolo non potrà superare la boundary.

## 7. Anti-pattern reali (incidenti veri)

- **`Action: *, Resource: *`** su ruoli applicativi. Una compromissione di un singolo container = totale takeover.
- **Trust policy con `Principal: *`**: chiunque al mondo può assumere il ruolo se conosce l'ARN.
- **Access key di un dev su laptop personale**, sincronizzato su iCloud, scoperto da phishing. Vita reale, multipla.
- **CloudFormation eseguito con `CAPABILITY_AUTO_EXPAND`** senza review delle policy generate.
- **EC2 metadata IMDSv1** (deprecata): SSRF banale espone credenziali. Forza IMDSv2 sempre.

## 8. Esercizio

<details>
<summary>Vuoi che un ruolo possa lanciare EC2 SOLO con `t3.micro/small` E con il tag `Owner=email-dev`. Policy?</summary>

```json
{
  "Effect":"Allow",
  "Action":["ec2:RunInstances","ec2:CreateTags"],
  "Resource":"*",
  "Condition":{
    "StringEquals":{"ec2:InstanceType":["t3.micro","t3.small"]},
    "StringEquals":{"aws:RequestTag/Owner":"${aws:username}@example.com"},
    "ForAllValues:StringEquals":{"aws:TagKeys":["Owner","Project"]}
  }
}
```

`ForAllValues` impedisce di aggiungere tag fuori lista. Senza `StringEquals` su `aws:RequestTag`, il dev può lanciare senza tag.
</details>

<details>
<summary>GitHub Actions deploy in AWS. Spiega come evitare di mettere chiavi nei Secrets di GitHub.</summary>

1. In AWS crea un OIDC identity provider che fida `token.actions.githubusercontent.com`.
2. Crea un ruolo IAM `github-deploy-role` con trust policy come sopra (con `sub` ristretta a repo/branch specifico).
3. Nel workflow GitHub:
```yaml
permissions:
  id-token: write
  contents: read
steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::111:role/github-deploy-role
      aws-region: eu-west-1
```
4. GitHub Actions richiede un OIDC token, lo invia ad AWS STS, ottiene credenziali AWS scadenti in 1 ora.

Niente chiavi statiche, niente "key rotation". Se il repo viene compromesso, basta restringere `sub` in trust policy.
</details>

> **Riassunto**: condition keys per granularità chirurgica; ABAC per scalare per tag invece che policy; STS per credenziali temporanee (mai statiche); ExternalId per cross-account con vendor; IAM Identity Center per umani; OIDC (`AssumeRoleWithWebIdentity`) per workload esterni come GitHub Actions e Kubernetes IRSA; permissions boundary per dare libertà ai dev senza esplodere.
