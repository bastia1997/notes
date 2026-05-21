---
title: "Crittografia: teoria e pratica"
area: "Crittografia"
order: 5
level: "intermedio"
summary: "Cifrari simmetrici (AES, ChaCha20), asimmetrici (RSA, ECC), hash, MAC, firme digitali, KDF, generatori casuali, PKI, password hashing, attacchi (padding oracle, length extension, weak RNG)."
prereq:
  - "Sezione 01 (XOR, bit, endianness)"
  - "Sezione 04 (TLS)"
tools:
  - "openssl"
  - "Python cryptography / pycryptodome"
  - "hashcat / john"
  - "CyberChef"
---

# Crittografia: teoria e pratica

> Regola d'oro: **non scriverti la tua crypto**. La crittografia è una disciplina dove le idee "ovvie" sono quasi sempre sbagliate. Usa primitive standard (libsodium, NaCl, ricetta consigliata di TLS) e librerie testate. Questo capitolo serve a *capirla*, non a riscriverla.

## Cosa garantisce la crittografia

Quattro proprietà di sicurezza:

1. **Confidenzialità** — solo i destinatari leggono.
2. **Integrità** — i dati non sono stati modificati.
3. **Autenticità** — sai chi li ha inviati.
4. **Non-ripudio** — il mittente non può negare di averli inviati.

Diverse primitive ne forniscono diverse:

| Primitiva | Confid. | Integrità | Auth. | Non-rip. |
|---|:---:|:---:|:---:|:---:|
| Cifrario simmetrico solo (es. AES-CTR) | ✅ | ❌ | ❌ | ❌ |
| AEAD (AES-GCM, ChaCha20-Poly1305) | ✅ | ✅ | ✅ (chiave condivisa) | ❌ |
| MAC (HMAC) | ❌ | ✅ | ✅ (chiave condivisa) | ❌ |
| Hash (SHA-256) | ❌ | ✅ (di per sé) | ❌ | ❌ |
| Firma digitale (RSA, ECDSA, Ed25519) | ❌ | ✅ | ✅ | ✅ |
| Cifratura ibrida (RSA-OAEP + AES-GCM) | ✅ | ✅ | varia | varia |

## Primitive di base

### Cifrari simmetrici

Una chiave condivisa per cifrare e decifrare.

#### A blocchi
- **AES** (Rijndael) — standard. Block size 128 bit, chiavi 128/192/256.
- 3DES (deprecato).
- Camellia, Serpent, Twofish (alternative).

I cifrari a blocchi cifrano *un blocco* alla volta. Per messaggi più lunghi servono **modalità**.

#### Modalità di cifrari a blocchi (importantissimo)

| Modalità | Confidenzialità | Integrità | Note |
|---|---|---|---|
| **ECB** | parziale | ❌ | **Mai usare.** Pattern visibili (vedi il pinguino di Tux). |
| **CBC** | sì | ❌ | Vulnerabile a padding oracle e a bit flipping senza MAC. Usa con `Encrypt-then-MAC`. |
| **CTR** | sì | ❌ | Trasforma block cipher in stream. Riuso nonce = catastrofe. |
| **GCM** ✅ | sì | sì (AEAD) | AES-CTR + GMAC. **Standard moderno.** Nonce 96 bit, MAI riusare con stessa chiave. |
| **CCM** | sì | sì | Per ambienti embedded (Bluetooth, ZigBee). |
| **OCB** | sì | sì | Eccellente ma brevettato a lungo, ora libero. |
| **CBC-MAC, CMAC** | (MAC, non cifratura) | sì | |

**Padding oracle** (Vaudenay 2002): se un server in CBC senza MAC restituisce errori diversi per "padding sbagliato" vs "altri errori", l'attaccante può decifrare un blocco byte-per-byte (256 query massimo per byte). Storia continua: POODLE, BEAST, etc.

#### Stream cipher

- **ChaCha20** (Bernstein) — moderno, semplice, veloce in software. Combinato con **Poly1305** dà AEAD (`ChaCha20-Poly1305`).
- **RC4** — morto, vietato in TLS dal 2015.

### Cifrari asimmetrici (chiave pubblica)

Due chiavi: una pubblica (cifratura, verifica firma) e una privata (decifratura, firma).

#### RSA
- Sicurezza basata sulla difficoltà di fattorizzare grandi numeri.
- Chiavi 2048 bit minimo oggi, 3072+ raccomandato, 4096 conservativo. Sotto 2048 = inadeguato.
- **Usi:**
  - Cifratura: con padding **RSA-OAEP** (mai "textbook RSA" o PKCS#1 v1.5 sopra strato applicativo).
  - Firma: con padding **RSA-PSS** preferito a PKCS#1 v1.5.

> **RSA "textbook"** (senza padding) è insicuro: deterministico, malleabile (E(m1)·E(m2) = E(m1·m2)), vulnerabile a chosen-plaintext.

#### Curve ellittiche (ECC)
- Sicurezza basata sul logaritmo discreto su curve ellittiche.
- Chiavi molto più corte di RSA per pari sicurezza (256 bit ECC ≈ 3072 bit RSA).
- Curve standard: P-256, P-384, P-521 (NIST), Curve25519 (Bernstein, usata in TLS, SSH, Signal, Tor).
- **Usi:**
  - **ECDH** (Diffie-Hellman) per key exchange.
  - **ECDSA, EdDSA (Ed25519)** per firme.

Ed25519 è la firma preferita oggi: veloce, sicura, niente dipendenza da RNG durante la firma (problema storico ECDSA che ha permesso il leak della chiave PlayStation 3 di Sony).

### Hash

Funzione one-way: dato `m`, restituisce `h(m)` di lunghezza fissa. Proprietà desiderate:
- **Pre-immagine resistente:** difficile trovare `m` dato `h`.
- **Seconda pre-immagine:** difficile trovare `m'` ≠ `m` con `h(m') = h(m)`.
- **Collision resistant:** difficile trovare `m1, m2` con `h(m1) = h(m2)`.

| Hash | Output | Stato |
|---|---|---|
| MD5 | 128 bit | **Rotto** (collisioni in secondi). Usare solo checksumming non-security. |
| SHA-1 | 160 bit | **Rotto** (SHAttered 2017). Usare solo legacy. |
| SHA-256, SHA-512 | 256/512 bit | OK |
| SHA-3 (Keccak) | varie | OK, design diverso (sponge). |
| BLAKE2, BLAKE3 | varie | OK, velocissimi. |

### MAC (Message Authentication Code)

Conferma integrità + autenticità con una chiave condivisa.

- **HMAC**: `HMAC-SHA-256(key, msg)`. Costruzione che funziona con qualsiasi hash. **Standard.**
- **CMAC, GMAC**: basati su block cipher.
- **Poly1305**: MAC moderno usato con ChaCha20.

> Non confondere **hash** (no chiave) con **MAC** (con chiave). Un hash da solo *non* autentica un messaggio.

### KDF (Key Derivation Function)

Dato un secret (password / pre-master), derivano chiavi crittografiche robuste.

| KDF | Uso |
|---|---|
| **HKDF** (HMAC-based) | Derivare più chiavi da un secret di alta entropia (TLS 1.3 usa HKDF). |
| **PBKDF2** | Da password. Lento per design. Conta iterazioni alta. |
| **scrypt** | Da password. Memory-hard. |
| **bcrypt** | Da password. CPU + memory cost. |
| **Argon2id** ✅ | Da password. **Standard moderno** (winner Password Hashing Competition 2015). |

### RNG (Random Number Generator)

Tutti i sistemi crypto si rompono se il random è prevedibile.

- **CSPRNG**: cryptographically secure PRNG. Su Linux: `/dev/urandom` o syscall `getrandom()`. Su Windows: `BCryptGenRandom`. In Python: `secrets`, **non** `random` (Mersenne Twister, prevedibile).
- **Hardware RNG**: TPM, RDRAND.
- **Errori storici:**
  - Debian OpenSSL bug 2008: la chiave SSH era determinata da 32k semi → mass key disclosure.
  - Sony PS3 ECDSA con nonce costante.
  - Java SecureRandom seedato male in Android Bitcoin wallet (2013).

## AEAD — cosa usare oggi

Per cifrare un blob arbitrario:

```python
from cryptography.hazmat.primitives.ciphers.aead import AESGCM, ChaCha20Poly1305
import os

key = AESGCM.generate_key(bit_length=256)
nonce = os.urandom(12)
aesgcm = AESGCM(key)
ct = aesgcm.encrypt(nonce, b"messaggio segreto", associated_data=b"context")
pt = aesgcm.decrypt(nonce, ct, b"context")
```

**Regola nonce GCM:** 96 bit, **mai** riusare con la stessa chiave. Counter o random sicuro. Riuso → recovery dell'authentication key e plaintext (vedi forbidden-attack).

Per cifratura "a busta": cifratura ibrida (asimmetrica per la chiave, simmetrica per il payload). Es: una libreria come **libsodium** offre `crypto_box_seal` (ECC + ChaCha20-Poly1305) — comodo.

## Firme digitali

Una firma garantisce: integrità, autenticità (chi firma), non-ripudio.

```python
from cryptography.hazmat.primitives.asymmetric import ed25519
priv = ed25519.Ed25519PrivateKey.generate()
pub = priv.public_key()
sig = priv.sign(b"messaggio")
pub.verify(sig, b"messaggio")  # raise se non valido
```

In TLS, in firma di firmware, in firma di codice (Authenticode, GPG, Sigstore), in JWT firmati, in commit Git firmati GPG/SSH.

## PKI e certificati (riepilogo)

Vedi sezione 4. Punti chiave per crypto:
- Una **CA** è un'entità che firma certificati. La fiducia è transitiva: se ti fidi della CA, ti fidi di tutti i cert che firma.
- Una catena: end-entity ← intermediate ← root.
- **Trust store** (sistemi operativi, browser) contiene root CA "trustate" di default.
- **Revoca:** CRL (lista) o OCSP (query in tempo reale). OCSP stapling permette al server di servire la response OCSP firmata.
- **Web of trust** (PGP) — alternativa decentralizzata.

## Password hashing — il top scenario reale

Memorizzazione di password sul server: **mai** in chiaro, **mai** solo SHA-256, **mai** MD5/SHA-1.

Schema corretto:

```text
hash = argon2id(password, salt, params: m=64MB, t=3, p=4)
salva: hash, salt, params
```

- **Salt** è random univoco per ogni utente → impedisce rainbow tables.
- **Pepper** (segreto in HSM/env, non in DB) opzionale → in caso di DB leak senza pepper l'attaccante non può fare crack.
- **Argon2id** o **bcrypt** o **scrypt**. Configurati per richiedere ~250ms su hardware del server.

```python
import argon2
hasher = argon2.PasswordHasher(memory_cost=65536, time_cost=3, parallelism=4)
encoded = hasher.hash("password_dell_utente")
hasher.verify(encoded, "password_dell_utente")  # raise se sbagliata
```

Per autenticare: confronto a tempo costante (per evitare timing attack). `argon2.verify` lo fa.

## Attacchi e categorie da conoscere

### 1. Brute force / dictionary
Indovinare password / chiavi via tentativi. **Difese:** lunghezza, KDF lenta, rate limit, MFA.

Cracking tool:
- **hashcat** (GPU-accelerated): `hashcat -m 1800 hashes.txt rockyou.txt`. `-m` è il modo (1800 = sha512crypt, 22000 = WPA2, 13100 = Kerberos AS-REP).
- **John the Ripper**: simile.

### 2. Side channel
La crittografia si rompe **fuori** dalla matematica:
- **Timing attacks**: `memcmp` non a tempo costante → leak della chiave bit per bit.
- **Cache attacks** (Flush+Reload, Prime+Probe).
- **Power analysis** (SPA, DPA) — utile su smartcard/embedded.
- **Electromagnetic** (TEMPEST).
- **Spectre/Meltdown**: ramo di side channel su CPU moderne (esecuzione speculativa).
- **Acoustic** (Genkin/Shamir 2014, recuperare chiavi GPG dal rumore della CPU).

**Mitigazione:** confronti tempo costante (`hmac.compare_digest` in Python), implementazioni constant-time delle primitive.

### 3. Padding oracle
Descritto sopra. Vulnera CBC senza MAC. Tool: `padbuster`. Famoso: POODLE, .NET Web Forms 2010.

### 4. Length extension
Hash di tipo Merkle–Damgård (MD5, SHA-1, SHA-256) sono soggetti: dato `hash(secret || msg)` e la lunghezza di `secret`, puoi calcolare `hash(secret || msg || pad || ext)` senza conoscere `secret`. **Soluzione:** usare HMAC, non `hash(secret || msg)`. Oppure SHA-3 (immune).

### 5. Bit flipping su CBC senza MAC
Modifica controllata di un bit nel ciphertext del blocco N → flip bit corrispondente nel plaintext del blocco N+1. Se nessuno controlla integrità, l'attaccante modifica messaggi.

### 6. Replay
Inviare di nuovo un messaggio già cifrato/firmato che l'attaccante intercetta. **Difesa:** nonce, timestamp, sequence number, challenge-response.

### 7. Downgrade
Forzare la negoziazione di un protocollo più debole. **Difese:** TLS 1.3 (rimuove choice deboli), SCSV, supported_versions extension.

### 8. Math attacks su RSA
- **Common modulus, low exponent, broadcast** (Hastad).
- **Wiener attack** (private exponent piccolo).
- **Boneh-Durfee.**
- **Coppersmith** (partial information).

Vivono nei CTF crypto; raro vederli in pentest reali ma da conoscere.

## Crittografia post-quantum (PQC)

I computer quantistici romperebbero RSA e ECC con Shor. Hash e simmetrici sono "solo" dimezzati da Grover (AES-256 resta sicuro a livello "AES-128 classico").

NIST ha standardizzato (2024–2025):
- **ML-KEM** (CRYSTALS-Kyber) per key encapsulation.
- **ML-DSA** (CRYSTALS-Dilithium) per firme.
- **SLH-DSA** (SPHINCS+) per firme hash-based.

Già in TLS 1.3 (X25519MLKEM768 hybrid in Chrome 124+). Aspettati transizione "hybrid" (classic + PQC) per anni.

## Esercizi

### Esercizio 5.1 — Cifra e decifra con openssl
```bash
echo "messaggio segreto" > pt.txt
openssl rand -hex 32 > key.hex
openssl enc -aes-256-gcm -in pt.txt -out ct.bin -K "$(cat key.hex)" -iv "$(openssl rand -hex 12)" -nopad
# (in pratica AES-GCM da CLI è scomodo, vedi alternative)

# alternativa più amichevole:
openssl enc -aes-256-cbc -pbkdf2 -salt -in pt.txt -out ct.bin -pass pass:foobar
openssl enc -aes-256-cbc -pbkdf2 -d -in ct.bin -out pt2.txt -pass pass:foobar
```

Discuti: perché CBC senza MAC è una cattiva idea in produzione?

### Esercizio 5.2 — Implementa HMAC in Python
Senza usare `hmac.new`, scrivi una funzione che fa HMAC-SHA-256 da spec ([RFC 2104](https://www.rfc-editor.org/rfc/rfc2104)).

<details><summary>Soluzione</summary>

```python
import hashlib

def hmac_sha256(key: bytes, msg: bytes) -> bytes:
    block_size = 64
    if len(key) > block_size:
        key = hashlib.sha256(key).digest()
    if len(key) < block_size:
        key = key + b'\x00' * (block_size - len(key))
    o_key_pad = bytes(k ^ 0x5c for k in key)
    i_key_pad = bytes(k ^ 0x36 for k in key)
    inner = hashlib.sha256(i_key_pad + msg).digest()
    return hashlib.sha256(o_key_pad + inner).digest()

import hmac
assert hmac_sha256(b"key", b"data") == hmac.new(b"key", b"data", "sha256").digest()
```

</details>

### Esercizio 5.3 — Crack password con hashcat
1. Genera 5 hash con bcrypt e 5 con SHA-256 di password tratte da `rockyou.txt`.
2. Lancia hashcat. Cosa noti sulla velocità?

```bash
# bcrypt: hashcat -m 3200 hashes_bcrypt.txt rockyou.txt
# sha256: hashcat -m 1400 hashes_sha256.txt rockyou.txt
```

<details><summary>Spiegazione</summary>

SHA-256 fa miliardi di tentativi al secondo su GPU. bcrypt poche migliaia. Per questo bcrypt/argon2/scrypt sono obbligatori per password.

</details>

### Esercizio 5.4 — Cryptopals Set 1 e 2
[Cryptopals Crypto Challenges](https://cryptopals.com) — Matasano. **Il modo migliore per imparare crypto pratica.** Completa i Set 1 (basics: XOR, base64, single-byte XOR break, repeating-key XOR break, AES-ECB detection) e Set 2 (CBC bit-flipping, padding oracle).

### Esercizio 5.5 — Padding oracle (challenge guidato)
PortSwigger Web Security Academy ha lab gratuiti su [authentication](https://portswigger.net/web-security/authentication) e [server-side template injection](https://portswigger.net/web-security/server-side-template-injection). Per padding oracle specifico, vedi anche [CryptoHack](https://cryptohack.org) (eccellente piattaforma).

### Esercizio 5.6 — JWT
JWT è formato da `header.payload.signature` (base64url). Scrivi un decoder Python che parsa un JWT e verifica firma HS256.

```python
import base64, json, hmac, hashlib

def b64url_decode(s):
    s = s + '=' * (-len(s) % 4)
    return base64.urlsafe_b64decode(s)

def verify_jwt_hs256(token: str, key: bytes) -> bool:
    h, p, sig = token.split('.')
    expected = hmac.new(key, f"{h}.{p}".encode(), hashlib.sha256).digest()
    return hmac.compare_digest(expected, b64url_decode(sig))
```

Studia poi i classici attacchi JWT:
- **alg: none** (server accetta token non firmato).
- **HS256 vs RS256 confusion** (server usa chiave pubblica come HMAC key).
- **kid path traversal**.

Vedrai esempi in sezione 11.

### Esercizio 5.7 — Distingui DH da ECDH
Cerca su Wikipedia DH e ECDH. Scrivi una spiegazione in 6 righe: cosa scambiano Alice e Bob? Perché la sicurezza dipende dal logaritmo discreto?

### Esercizio 5.8 — CTF Crypto
- [CryptoHack](https://cryptohack.org) — *the* gym per crypto.
- [picoCTF](https://picoctf.org) sezione Crypto.
- [Cryptohack: ECC](https://cryptohack.org/courses/elliptic/) per curve ellittiche guidato.

### Esercizio 5.9 — Sicurezza di MD5
Genera due input diversi che producono lo stesso MD5 (collisione). Suggerimento: usa file di esempio o `md5collgen` (Wang et al.). Discuti: dove sarebbe pericoloso usare MD5 per firma codice / certificati / commit?

## Cheat sheet "cosa usare oggi"

| Scopo | Scelta moderna | Da evitare |
|---|---|---|
| Cifrare un file | AES-256-GCM o XChaCha20-Poly1305 | AES-ECB, AES-CBC senza MAC, RC4 |
| Cifrare a transito | TLS 1.3 (libreria) | scrivere il tuo |
| Hash di documento | SHA-256, SHA-3, BLAKE3 | MD5, SHA-1 |
| Password storage | Argon2id, bcrypt, scrypt | MD5(salt+pwd), SHA-256, PBKDF2 con poche iter |
| Firma codice | Ed25519 / RSA-PSS 4096 | RSA-PKCS1 v1.5 1024 |
| Key exchange | X25519 (TLS) / X25519+MLKEM (PQC hybrid) | DH 1024, RSA encryption |
| Random | `os.urandom` / `secrets` / `getrandom` | `random`, `rand()`, `Math.random()` per chiavi |
| JWT | Ed25519/EdDSA o RS256 (con verifica `alg`) | HS256 in client-side, "none" |

## Concetti chiave

1. Non costruirti la tua crypto.
2. AEAD (AES-GCM / ChaCha20-Poly1305) per cifrare.
3. HMAC, non `hash(secret||msg)`.
4. Password con Argon2id/bcrypt/scrypt + salt.
5. Hash sicuri: SHA-256 e oltre; MD5/SHA-1 morti per security.
6. Random: CSPRNG, niente PRNG generici.
7. PKI e firma sono il modo per autenticare in mondo distribuito.
8. Conosci almeno per nome: padding oracle, length extension, bit flipping, downgrade, replay, side channel.

Hai i mattoni. Adesso entriamo nell'OS internals avanzati e poi nelle armi pratiche.
