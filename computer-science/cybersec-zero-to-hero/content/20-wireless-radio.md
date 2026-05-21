---
title: "Wireless e radio: WiFi, BT, SDR"
area: "Wireless"
order: 20
level: "avanzato"
summary: "802.11 frame, WEP/WPA/WPA2/WPA3, PMKID, KRACK, evil twin, Bluetooth/BLE basics (BlueBorne, BIAS, KNOB), introduzione a SDR (HackRF, RTL-SDR), GSM/4G/5G concept, RFID/NFC basics."
prereq:
  - "Sezione 03, 12"
tools:
  - "aircrack-ng suite, hcxtools, hcxdumptool"
  - "hostapd, hostapd-wpe"
  - "bettercap, WiFi Pumpkin 3"
  - "RTL-SDR / HackRF, GNURadio, GQRX"
  - "Bluetooth: bluez, btlejack, gattacker, Flipper Zero"
---

# Wireless e radio

## 802.11 — il protocollo WiFi

Frame management/control/data. Ricognizione passive:
- **Probe Request**: device cerca SSID conosciuti.
- **Probe Response**: AP risponde se SSID match (o se "any").
- **Beacon**: AP annuncia SSID, capabilities, security.
- **Authentication / Association**.

### Setup monitor mode
```bash
sudo airmon-ng check kill
sudo airmon-ng start wlan0       # crea wlan0mon
iw dev wlan0mon set type monitor
iwconfig wlan0mon                # verifica mode Monitor
```

### Discovery
```bash
sudo airodump-ng wlan0mon
sudo airodump-ng --band abg wlan0mon
# Capturando un BSSID specifico
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w cap wlan0mon
```

### WEP (storia)
Rotto. RC4 + IV 24-bit → collisions. Crack in 10 min con `aircrack-ng`. Se trovi WEP nel 2026, è negligenza criminale.

### WPA/WPA2-Personal (PSK)
PSK passphrase + SSID + nonces → 4-way handshake → PMK/PTK.

**Cattura handshake:**
```bash
# Provoca disconnessione → riassociazione → handshake
sudo aireplay-ng -0 5 -a AP_MAC -c CLIENT_MAC wlan0mon
# Salva cap
```

**Crack:**
```bash
hcxpcapngtool -o handshake.hc22000 cap.cap
hashcat -m 22000 handshake.hc22000 rockyou.txt
```

#### PMKID attack (Hashcat #16800/22000)
Anche senza client connesso, alcuni AP "regalano" il PMKID durante M1 del 4-way. `hcxdumptool` lo cattura:

```bash
sudo hcxdumptool -i wlan0mon -o capture.pcapng --enable_status=15
hcxpcapngtool -o hash.hc22000 capture.pcapng
hashcat -m 22000 hash.hc22000 rockyou.txt
```

**Mitigazione:** passphrase lunghe, WPA3, disable PMKID se possibile, segregazione SSID.

### WPA-Enterprise (802.1X EAP)
Auth basata su certificato/credenziali tramite RADIUS. Comune in aziende.

Attacchi:
- **Rogue AP** con stesso SSID + cert self-signed → device che non valida cert → invia MSCHAPv2 → crack offline (`asleap` o crack.sh).
- `hostapd-wpe` automatizza.

```bash
hostapd-wpe ./hostapd-wpe.conf
# Cattura: MS-CHAPv2 challenge/response → crack
```

**Mitigazione:** **certificate validation strict** sui client (server cert pinned, CA validata).

### KRACK (CVE-2017-13077 e correlati)
Riprodurre nonce nel 4-way handshake → reinstall key → decrypt. Mathy Vanhoef. Patchato ovunque ormai.

### WPA3
- **SAE** (Simultaneous Authentication of Equals): handshake con dragonfly, niente offline crack di passphrase debole.
- **Forward secrecy**.
- **Management Frame Protection (PMF)** obbligatoria.

Attacchi:
- **Dragonblood** (2019): side channel su SAE → recovery PSK in alcuni casi.
- **Downgrade** WPA3 → WPA2 in transition mode.

### Deauth attacks
Frame management non protetti (pre-PMF) → deauth spoofed. DoS efficace, costringe a re-auth. `aireplay-ng -0`. PMF blocca questo.

## Evil twin e captive portal phishing

Crea AP fake con stesso SSID, segnale più forte. Tool: **WiFi Pumpkin 3**, **airgeddon**, **fluxion** (legacy). Captive portal che chiede password "per riconnettere" → log.

Aziende: monitorare BSSID non autorizzati. WIDS (Wireless IDS) come Aerohive, Cisco Wireless IDS.

## Bluetooth e BLE

### Bluetooth Classic
- Pairing: legacy (PIN, MITM-able), Secure Simple Pairing (SSP) — 2007+.
- Modes: Just Works, Numeric Comparison, Passkey, OOB.

### BLE (Low Energy, 4.0+)
- GAP / GATT model.
- Pairing methods stessi nomi ma protocollo diverso. **Just Works** = senza MITM protection.
- Security: pre-5.0 ECDH a 128 bit, dal 5.x più robusto.

### Attacchi famosi
- **BlueBorne** (2017): RCE wireless senza pairing su molti stack.
- **KNOB** (Key Negotiation of Bluetooth, 2019): downgrade entropy della key BR/EDR a 1 byte → brute force.
- **BIAS** (Bluetooth Impersonation AttackS, 2020): impersonation.
- **BrakTooth, SweynTooth**: famiglie di bug stack.
- **BLE replay** su lock smart.

Tool:
- **bluez** (Linux stack).
- **btlejack** (Mike Ryan).
- **gattacker** (Node BLE MITM).
- **Flipper Zero** (hardware multi-protocol — BLE, sub-GHz, NFC, RFID, IR).

### Cosa cercare in pentest
- Smart lock / IoT con BLE: pairing su PIN debole, no rotation.
- Tracker (AirTag, Tile): protocolli di privacy (stalking detection).
- Wearable con dati health.

## SDR — Software Defined Radio

Una radio è "software"-defined: il tuner cattura RF, il computer demodula. Hardware:

| Hardware | Range | TX? | Prezzo |
|---|---|---|---|
| **RTL-SDR** | 25 MHz – 1.7 GHz | RX only | ~30€ |
| **HackRF One** | 1 MHz – 6 GHz | RX+TX (half) | ~300€ |
| **BladeRF** | varia | RX+TX (full) | 400€+ |
| **LimeSDR** | 100 kHz – 3.8 GHz | RX+TX | 250€+ |
| **USRP** (Ettus) | enterprise | RX+TX | 800€+ |
| **Flipper Zero** | sub-GHz limited | varia | 170€ |

Software:
- **GQRX** — spectrum/audio receiver semplice.
- **SDR#** — Windows.
- **GNURadio** — flowgraph development.
- **inspectrum** — analisi visiva burst.
- **rtl_433** — riconosce 100+ protocolli ISM (meteo stations, energy meters, gate remote).
- **URH** (Universal Radio Hacker).

### Bande comuni
- **433/315/868/915 MHz**: gate remote, telecomandi, sensori, LoRa.
- **2.4 GHz / 5 GHz**: WiFi, BT, ZigBee.
- **1 GHz – 2 GHz**: GSM (storica 900 MHz), GPS (1.5).
- **5 GHz +**: WiFi alta banda.

### Cosa puoi imparare a fare
- Catturare e replay di telecomandi gate / wireless doorbell / sensor smart home.
- Decodifica protocolli ISM con `rtl_433`.
- Analisi traffico LoRa / Sigfox.
- ADS-B (aerei in volo) con dump1090.
- AIS (navi).
- POCSAG pagers.
- GPS sintetico (illegale trasmettere → solo ricezione/simulazione locale).

### Limiti legali
**TX su frequenze licensed è illegale.** ISM bands (433.92, 868.3 in EU) hanno power limit precisi. Sperimentare TX in laboratorio chiuso (Faraday cage) o solo RX. In Italia: D.Lgs. 259/2003 (Codice delle comunicazioni elettroniche).

## RFID e NFC

- **RFID LF** (125 kHz, EM4100, HID Prox) — vecchi badge, **clonabili facilmente** con Proxmark3 o Flipper.
- **RFID HF** (13.56 MHz, ISO 14443, Mifare Classic) — Mifare Classic ha key crack noto (CRYPTO1). Più sicuri Mifare DESFire EV2/EV3 (AES, secure messaging).
- **NFC** = subset HF + protocollo applicativo (smartphone tap, payment).
- **HID iCLASS, Legic, FELICA**: vari livelli di sicurezza.

### Tool
- **Proxmark3** — il "coltello svizzero" RFID. ~250€.
- **Flipper Zero** — buono per la maggior parte LF/HF, NFC limitato.
- **PN532** breakout board — economico per imparare.

### Attacchi
- Clone di badge LF/Mifare Classic non patchato.
- Sniff e replay di card NFC contactless (sebbene EMV protocol abbia replay protection con cryptogram).
- Long-range RFID con antenne potenti (skimming).

## GSM / 3G / 4G / 5G cenni

- **GSM** (2G) — A5/1 ciphering crackable (decenni). IMSI catcher (Stingray, Rayzone) intercetta cellulari forzando downgrade. **Illegali** in molte giurisdizioni a privato.
- **3G/4G/5G** — auth mutua più robusta. SUPI/SUCI in 5G protegge identità.

In pentest mobile reale: spesso non si va su livello radio (illegale e oltre scope). Si testa l'app + back-end.

## IoT industriale e SCADA (cenni)

Protocolli OT/ICS: Modbus, DNP3, IEC-104, BACnet, EtherCAT, Profinet. Spesso senza auth o cifratura. Difesa: segmentazione totale (air-gap o data diode), monitoraggio passivo (Claroty, Nozomi).

## Esercizi

### Esercizio 20.1 — WiFi recon
Con USB WiFi compatibile monitor mode (Alfa AWUS036NHA, AWUS036ACS):
- airmon-ng start.
- airodump-ng → quante reti? quanti BSSID? quale canale è più trafficato?
- Probe request analysis: quanti SSID "ricordati" dai tuoi vicini sono leak?

### Esercizio 20.2 — Cattura handshake WPA2 (su tua rete)
Sul tuo WiFi di casa (non quello del vicino):
- airodump targeted.
- aireplay-ng -0 (5 deauth).
- Cattura .cap con EAPOL frames.
- Converti, crack con hashcat.

Se la tua passphrase è lunga e random, sarà infrangibile in tempi ragionevoli. Bonus.

### Esercizio 20.3 — PMKID
```bash
sudo hcxdumptool -i wlan0mon -o cap.pcapng --enable_status=15
# attendi PMKID (non sempre)
hcxpcapngtool -o hash.hc22000 cap.pcapng
hashcat -m 22000 hash.hc22000 rockyou.txt
```

Verifica se il tuo AP è vulnerabile a PMKID (alcuni l'hanno disabilitato).

### Esercizio 20.4 — Evil twin (in lab isolato)
Setup hostapd-wpe per simulare WPA-Enterprise rogue. Connetti un client (test phone con SSID configurato a connect senza cert validation). Cattura MS-CHAPv2. Crack con `asleap` o `hashcat -m 5500`.

**Solo su tua rete + tuo device.**

### Esercizio 20.5 — Bluetooth scan
```bash
sudo bluetoothctl
[bluetooth]# scan on
```

Quanti device? Quale loro nome è descrittivo (smartphone-Marco, MacBook-Anna)? OPSEC implications?

### Esercizio 20.6 — SDR primo step
- USB RTL-SDR (~25€).
- GQRX su Linux/macOS o SDR# su Win.
- Tune su 88-108 MHz: dovresti vedere stazioni FM.
- Tune 162.55 MHz (NOAA weather US) o 433.92 MHz (devices casa).

### Esercizio 20.7 — rtl_433
```bash
rtl_433 -f 433.92M -F json
```

Ascolta sensori meteo, telecomandi, energy meter. Quanti device passive emettono dati personali (ID, valore)?

### Esercizio 20.8 — Flipper Zero (se hai)
- Sub-GHz: registra telecomando, replay.
- NFC: leggi un badge non protetto, dump UID.
- BadUSB / IR: explore.

### Esercizio 20.9 — Read up
- "WiFi Hacking with Aircrack-ng" — guide ufficiali.
- Mathy Vanhoef's site (KRACK, FragAttacks).
- DEF CON Wireless Village talks.
- "Hacking Exposed: Wireless" (libro).

## Concetti chiave

1. **Monitor mode** è il prerequisito per qualsiasi WiFi recon.
2. **WPA2-PSK con passphrase debole** = crack in minuti.
3. **WPA-Enterprise** sicuro solo con server cert validation client-side rigida.
4. **WPA3** chiude molte falle WPA2 ma non tutte.
5. **Bluetooth** richiede conoscenze stack-specifiche.
6. **SDR** apre il mondo radio — entry kit a 30€.
7. **Legalità del TX**: occhio, è seriamente regolamentato.

Avanti: hardware e firmware.
