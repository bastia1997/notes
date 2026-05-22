---
title: "Cryptography: theory and practice"
area: "Cryptography"
order: 5
level: "intermediate"
summary: "Symmetric ciphers (AES, ChaCha20), asymmetric ciphers (RSA, ECC), hashes, MACs, digital signatures, KDFs, random number generators, PKI, password hashing, attacks (padding oracle, length extension, weak RNG)."
prereq:
  - "Section 01 (XOR, bits, endianness)"
  - "Section 04 (TLS)"
tools:
  - "openssl"
  - "Python cryptography / pycryptodome"
  - "hashcat / john"
  - "CyberChef"
---

# Cryptography: theory and practice

> Golden rule: **don't roll your own crypto**. Cryptography is a discipline where the "obvious" ideas are almost always wrong. Use standard primitives (libsodium, NaCl, the recommended TLS recipe) and well-tested libraries. This chapter is here to help you *understand* it, not to rewrite it.

## What cryptography guarantees

Four security properties:

1. **Confidentiality** — only the intended recipients can read.
2. **Integrity** — the data has not been modified.
3. **Authenticity** — you know who sent it.
4. **Non-repudiation** — the sender cannot deny having sent it.

Different primitives provide different ones:

| Primitive | Confid. | Integrity | Auth. | Non-rep. |
|---|:---:|:---:|:---:|:---:|
| Symmetric cipher only (e.g. AES-CTR) | ✅ | ❌ | ❌ | ❌ |
| AEAD (AES-GCM, ChaCha20-Poly1305) | ✅ | ✅ | ✅ (shared key) | ❌ |
| MAC (HMAC) | ❌ | ✅ | ✅ (shared key) | ❌ |
| Hash (SHA-256) | ❌ | ✅ (on its own) | ❌ | ❌ |
| Digital signature (RSA, ECDSA, Ed25519) | ❌ | ✅ | ✅ | ✅ |
| Hybrid encryption (RSA-OAEP + AES-GCM) | ✅ | ✅ | varies | varies |

## Basic primitives

### Symmetric ciphers

One shared key for both encryption and decryption.

#### Block ciphers
- **AES** (Rijndael) — the standard. 128-bit block size, 128/192/256-bit keys.
- 3DES (deprecated).
- Camellia, Serpent, Twofish (alternatives).

Block ciphers encrypt *one block* at a time. For longer messages you need **modes**.

#### Block cipher modes (extremely important)

| Mode | Confidentiality | Integrity | Notes |
|---|---|---|---|
| **ECB** | partial | ❌ | **Never use.** Patterns are visible (see the Tux penguin). |
| **CBC** | yes | ❌ | Vulnerable to padding oracle and bit flipping without a MAC. Use with `Encrypt-then-MAC`. |
| **CTR** | yes | ❌ | Turns a block cipher into a stream. Nonce reuse = catastrophe. |
| **GCM** ✅ | yes | yes (AEAD) | AES-CTR + GMAC. **Modern standard.** 96-bit nonce, NEVER reuse with the same key. |
| **CCM** | yes | yes | For embedded environments (Bluetooth, ZigBee). |
| **OCB** | yes | yes | Excellent but long patented, now free. |
| **CBC-MAC, CMAC** | (MAC, not encryption) | yes | |

**Padding oracle** (Vaudenay 2002): if a CBC server without a MAC returns different errors for "bad padding" vs "other errors", an attacker can decrypt a block byte-by-byte (256 queries max per byte). The story keeps going: POODLE, BEAST, etc.

#### Stream ciphers

- **ChaCha20** (Bernstein) — modern, simple, fast in software. Combined with **Poly1305** it gives an AEAD (`ChaCha20-Poly1305`).
- **RC4** — dead, banned in TLS since 2015.

### Asymmetric ciphers (public key)

Two keys: one public (encryption, signature verification) and one private (decryption, signing).

#### RSA
- Security based on the difficulty of factoring large numbers.
- 2048-bit keys minimum today, 3072+ recommended, 4096 conservative. Below 2048 = inadequate.
- **Uses:**
  - Encryption: with **RSA-OAEP** padding (never "textbook RSA" or PKCS#1 v1.5 above the application layer).
  - Signature: with **RSA-PSS** padding, preferred over PKCS#1 v1.5.

> **"Textbook" RSA** (no padding) is insecure: deterministic, malleable (E(m1)·E(m2) = E(m1·m2)), vulnerable to chosen-plaintext attacks.

#### Elliptic curves (ECC)
- Security based on the discrete logarithm over elliptic curves.
- Much shorter keys than RSA for equivalent security (256-bit ECC ≈ 3072-bit RSA).
- Standard curves: P-256, P-384, P-521 (NIST), Curve25519 (Bernstein, used in TLS, SSH, Signal, Tor).
- **Uses:**
  - **ECDH** (Diffie-Hellman) for key exchange.
  - **ECDSA, EdDSA (Ed25519)** for signatures.

Ed25519 is the preferred signature scheme today: fast, secure, no RNG dependency during signing (a historical ECDSA issue that allowed the leak of Sony's PlayStation 3 key).

### Hashes

A one-way function: given `m`, returns `h(m)` of fixed length. Desired properties:
- **Pre-image resistant:** hard to find `m` given `h`.
- **Second pre-image:** hard to find `m'` ≠ `m` with `h(m') = h(m)`.
- **Collision resistant:** hard to find `m1, m2` with `h(m1) = h(m2)`.

| Hash | Output | Status |
|---|---|---|
| MD5 | 128 bit | **Broken** (collisions in seconds). Use only for non-security checksumming. |
| SHA-1 | 160 bit | **Broken** (SHAttered 2017). Use only for legacy. |
| SHA-256, SHA-512 | 256/512 bit | OK |
| SHA-3 (Keccak) | various | OK, different design (sponge). |
| BLAKE2, BLAKE3 | various | OK, very fast. |

### MAC (Message Authentication Code)

Confirms integrity + authenticity with a shared key.

- **HMAC**: `HMAC-SHA-256(key, msg)`. A construction that works with any hash. **Standard.**
- **CMAC, GMAC**: based on a block cipher.
- **Poly1305**: modern MAC used with ChaCha20.

> Don't confuse **hash** (no key) with **MAC** (with key). A hash alone does *not* authenticate a message.

### KDF (Key Derivation Function)

Given a secret (password / pre-master), derive robust cryptographic keys.

| KDF | Use |
|---|---|
| **HKDF** (HMAC-based) | Derive multiple keys from a high-entropy secret (TLS 1.3 uses HKDF). |
| **PBKDF2** | From a password. Slow by design. High iteration count. |
| **scrypt** | From a password. Memory-hard. |
| **bcrypt** | From a password. CPU + memory cost. |
| **Argon2id** ✅ | From a password. **Modern standard** (winner of the Password Hashing Competition 2015). |

### RNG (Random Number Generator)

All crypto systems break if the randomness is predictable.

- **CSPRNG**: cryptographically secure PRNG. On Linux: `/dev/urandom` or the `getrandom()` syscall. On Windows: `BCryptGenRandom`. In Python: `secrets`, **not** `random` (Mersenne Twister, predictable).
- **Hardware RNG**: TPM, RDRAND.
- **Historical mistakes:**
  - Debian OpenSSL bug 2008: the SSH key was determined by 32k seeds → mass key disclosure.
  - Sony PS3 ECDSA with a constant nonce.
  - Java SecureRandom poorly seeded in Android Bitcoin wallets (2013).

## AEAD — what to use today

To encrypt an arbitrary blob:

```python
from cryptography.hazmat.primitives.ciphers.aead import AESGCM, ChaCha20Poly1305
import os

key = AESGCM.generate_key(bit_length=256)
nonce = os.urandom(12)
aesgcm = AESGCM(key)
ct = aesgcm.encrypt(nonce, b"messaggio segreto", associated_data=b"context")
pt = aesgcm.decrypt(nonce, ct, b"context")
```

**GCM nonce rule:** 96 bits, **never** reused with the same key. Counter or secure random. Reuse → recovery of the authentication key and plaintext (see the forbidden-attack).

For "envelope" encryption: hybrid encryption (asymmetric for the key, symmetric for the payload). E.g. a library like **libsodium** offers `crypto_box_seal` (ECC + ChaCha20-Poly1305) — convenient.

## Digital signatures

A signature guarantees: integrity, authenticity (who signs), non-repudiation.

```python
from cryptography.hazmat.primitives.asymmetric import ed25519
priv = ed25519.Ed25519PrivateKey.generate()
pub = priv.public_key()
sig = priv.sign(b"messaggio")
pub.verify(sig, b"messaggio")  # raise se non valido
```

In TLS, in firmware signing, in code signing (Authenticode, GPG, Sigstore), in signed JWTs, in GPG/SSH-signed Git commits.

## PKI and certificates (summary)

See section 4. Key points for crypto:
- A **CA** is an entity that signs certificates. Trust is transitive: if you trust the CA, you trust every cert it signs.
- A chain: end-entity ← intermediate ← root.
- A **trust store** (operating systems, browsers) contains "trusted" root CAs by default.
- **Revocation:** CRL (list) or OCSP (real-time query). OCSP stapling lets the server serve the signed OCSP response.
- **Web of trust** (PGP) — a decentralized alternative.

## Password hashing — the top real-world scenario

Storing passwords on the server: **never** in cleartext, **never** plain SHA-256, **never** MD5/SHA-1.

Correct scheme:

```text
hash = argon2id(password, salt, params: m=64MB, t=3, p=4)
salva: hash, salt, params
```

- **Salt** is a unique random value for each user → defeats rainbow tables.
- **Pepper** (a secret in an HSM/env, not in the DB) is optional → in case of a DB leak without the pepper, the attacker cannot crack.
- **Argon2id**, **bcrypt** or **scrypt**. Configured to require ~250ms on the server hardware.

```python
import argon2
hasher = argon2.PasswordHasher(memory_cost=65536, time_cost=3, parallelism=4)
encoded = hasher.hash("password_dell_utente")
hasher.verify(encoded, "password_dell_utente")  # raise se sbagliata
```

For authentication: constant-time comparison (to avoid timing attacks). `argon2.verify` does this.

## Attacks and categories to know

### 1. Brute force / dictionary
Guessing passwords / keys by trial. **Defenses:** length, slow KDF, rate limiting, MFA.

Cracking tools:
- **hashcat** (GPU-accelerated): `hashcat -m 1800 hashes.txt rockyou.txt`. `-m` is the mode (1800 = sha512crypt, 22000 = WPA2, 13100 = Kerberos AS-REP).
- **John the Ripper**: similar.

### 2. Side channel
Crypto breaks **outside** the math:
- **Timing attacks**: non constant-time `memcmp` → leaks the key bit by bit.
- **Cache attacks** (Flush+Reload, Prime+Probe).
- **Power analysis** (SPA, DPA) — useful on smartcards/embedded.
- **Electromagnetic** (TEMPEST).
- **Spectre/Meltdown**: a side-channel branch on modern CPUs (speculative execution).
- **Acoustic** (Genkin/Shamir 2014, recovering GPG keys from CPU noise).

**Mitigation:** constant-time comparisons (`hmac.compare_digest` in Python), constant-time implementations of primitives.

### 3. Padding oracle
Described above. Breaks CBC without a MAC. Tool: `padbuster`. Famous: POODLE, .NET Web Forms 2010.

### 4. Length extension
Merkle–Damgård hashes (MD5, SHA-1, SHA-256) are subject to it: given `hash(secret || msg)` and the length of `secret`, you can compute `hash(secret || msg || pad || ext)` without knowing `secret`. **Solution:** use HMAC, not `hash(secret || msg)`. Or SHA-3 (immune).

### 5. Bit flipping on CBC without a MAC
Controlled modification of a bit in the ciphertext of block N → flip of the corresponding bit in the plaintext of block N+1. If nobody checks integrity, the attacker modifies messages.

### 6. Replay
Resending an already encrypted/signed message that the attacker intercepts. **Defense:** nonce, timestamp, sequence number, challenge-response.

### 7. Downgrade
Forcing the negotiation of a weaker protocol. **Defenses:** TLS 1.3 (removes weak choices), SCSV, supported_versions extension.

### 8. Math attacks on RSA
- **Common modulus, low exponent, broadcast** (Hastad).
- **Wiener attack** (small private exponent).
- **Boneh-Durfee.**
- **Coppersmith** (partial information).

They live in crypto CTFs; rarely seen in real pentests but worth knowing.

## Post-quantum cryptography (PQC)

Quantum computers would break RSA and ECC with Shor. Hashes and symmetric ciphers are "only" halved by Grover (AES-256 stays secure at the "classic AES-128" level).

NIST has standardized (2024–2025):
- **ML-KEM** (CRYSTALS-Kyber) for key encapsulation.
- **ML-DSA** (CRYSTALS-Dilithium) for signatures.
- **SLH-DSA** (SPHINCS+) for hash-based signatures.

Already in TLS 1.3 (X25519MLKEM768 hybrid in Chrome 124+). Expect a "hybrid" transition (classic + PQC) for years.

## Exercises

### Exercise 5.1 — Encrypt and decrypt with openssl
```bash
echo "messaggio segreto" > pt.txt
openssl rand -hex 32 > key.hex
openssl enc -aes-256-gcm -in pt.txt -out ct.bin -K "$(cat key.hex)" -iv "$(openssl rand -hex 12)" -nopad
# (in pratica AES-GCM da CLI è scomodo, vedi alternative)

# alternativa più amichevole:
openssl enc -aes-256-cbc -pbkdf2 -salt -in pt.txt -out ct.bin -pass pass:foobar
openssl enc -aes-256-cbc -pbkdf2 -d -in ct.bin -out pt2.txt -pass pass:foobar
```

Discuss: why is CBC without a MAC a bad idea in production?

### Exercise 5.2 — Implement HMAC in Python
Without using `hmac.new`, write a function that computes HMAC-SHA-256 from the spec ([RFC 2104](https://www.rfc-editor.org/rfc/rfc2104)).

<details><summary>Solution</summary>

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

### Exercise 5.3 — Crack passwords with hashcat
1. Generate 5 hashes with bcrypt and 5 with SHA-256 of passwords taken from `rockyou.txt`.
2. Run hashcat. What do you notice about the speed?

```bash
# bcrypt: hashcat -m 3200 hashes_bcrypt.txt rockyou.txt
# sha256: hashcat -m 1400 hashes_sha256.txt rockyou.txt
```

<details><summary>Explanation</summary>

SHA-256 does billions of attempts per second on a GPU. bcrypt does a few thousand. That's why bcrypt/argon2/scrypt are mandatory for passwords.

</details>

### Exercise 5.4 — Cryptopals Set 1 and 2
[Cryptopals Crypto Challenges](https://cryptopals.com) — Matasano. **The best way to learn practical crypto.** Complete Set 1 (basics: XOR, base64, single-byte XOR break, repeating-key XOR break, AES-ECB detection) and Set 2 (CBC bit-flipping, padding oracle).

### Exercise 5.5 — Padding oracle (guided challenge)
PortSwigger Web Security Academy has free labs on [authentication](https://portswigger.net/web-security/authentication) and [server-side template injection](https://portswigger.net/web-security/server-side-template-injection). For padding oracle specifically, also see [CryptoHack](https://cryptohack.org) (excellent platform).

### Exercise 5.6 — JWT
A JWT is made of `header.payload.signature` (base64url). Write a Python decoder that parses a JWT and verifies the HS256 signature.

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

Then study the classic JWT attacks:
- **alg: none** (server accepts an unsigned token).
- **HS256 vs RS256 confusion** (server uses the public key as the HMAC key).
- **kid path traversal**.

You will see examples in section 11.

### Exercise 5.7 — Tell DH from ECDH
Look up DH and ECDH on Wikipedia. Write a 6-line explanation: what do Alice and Bob exchange? Why does security depend on the discrete logarithm?

### Exercise 5.8 — Crypto CTFs
- [CryptoHack](https://cryptohack.org) — *the* gym for crypto.
- [picoCTF](https://picoctf.org) Crypto section.
- [Cryptohack: ECC](https://cryptohack.org/courses/elliptic/) for guided elliptic curves.

### Exercise 5.9 — MD5 security
Generate two different inputs that produce the same MD5 (a collision). Hint: use sample files or `md5collgen` (Wang et al.). Discuss: where would it be dangerous to use MD5 for code signing / certificates / commits?

## "What to use today" cheat sheet

| Purpose | Modern choice | Avoid |
|---|---|---|
| Encrypt a file | AES-256-GCM or XChaCha20-Poly1305 | AES-ECB, AES-CBC without MAC, RC4 |
| Encrypt in transit | TLS 1.3 (library) | rolling your own |
| Hash of a document | SHA-256, SHA-3, BLAKE3 | MD5, SHA-1 |
| Password storage | Argon2id, bcrypt, scrypt | MD5(salt+pwd), SHA-256, PBKDF2 with few iter |
| Code signing | Ed25519 / RSA-PSS 4096 | RSA-PKCS1 v1.5 1024 |
| Key exchange | X25519 (TLS) / X25519+MLKEM (PQC hybrid) | DH 1024, RSA encryption |
| Random | `os.urandom` / `secrets` / `getrandom` | `random`, `rand()`, `Math.random()` for keys |
| JWT | Ed25519/EdDSA or RS256 (with `alg` verification) | HS256 in client-side, "none" |

## Key concepts

1. Don't roll your own crypto.
2. AEAD (AES-GCM / ChaCha20-Poly1305) for encryption.
3. HMAC, not `hash(secret||msg)`.
4. Passwords with Argon2id/bcrypt/scrypt + salt.
5. Secure hashes: SHA-256 and beyond; MD5/SHA-1 dead for security.
6. Random: CSPRNG, no generic PRNGs.
7. PKI and signatures are the way to authenticate in a distributed world.
8. Know at least by name: padding oracle, length extension, bit flipping, downgrade, replay, side channel.

You have the building blocks. Now we move into advanced OS internals and then into the practical weapons.
