---
title: "Assembly x86-64 e ARM64 da zero"
area: "Prerequisiti"
order: 1.5
level: "principiante"
summary: "Assembly da chi non l'ha mai visto. Cosa fa la CPU istruzione per istruzione. Registri, stack, calling convention, layout di un programma in memoria, con disegni e tracce passo-passo. Tutto ciò che serve per reverse engineering ed exploit dev."
prereq:
  - "Sezione 01 (memoria, processi)"
  - "Sezione 00b (binario, hex)"
tools:
  - "gcc, objdump, gdb (+ pwndbg/gef)"
  - "Compiler Explorer (godbolt.org) per esperimenti veloci"
---

# Assembly da zero

> Tutto ciò che la CPU fa è eseguire istruzioni assembly. Linguaggi alti (C, Python, Rust) vengono *compilati o interpretati* a istruzioni macchina. Capire assembly = capire cosa accade DAVVERO. Senza non vedi quello che vedono i reverse engineer e gli exploit dev.

## Il modello base

Una CPU in 30 secondi:
- Ha **registri**: piccole memorie ultraveloci dentro la CPU.
- Esegue istruzioni in sequenza, ognuna **modifica registri o memoria**.
- C'è un registro speciale, `RIP` (instruction pointer), che dice "qual è la prossima istruzione".
- L'istruzione `jmp` cambia `RIP` → salto. `call` salva `RIP` e salta. `ret` ripristina `RIP`.

```
  [   CPU   ]                              [    RAM    ]
  ┌─────────┐                              ┌───────────┐
  │ RAX  =? │   fetch istruzione           │ 0x4000:   │
  │ RBX  =? │  ◄───────────────────────────┤ mov rax,5 │
  │ RCX  =? │                              │ 0x4007:   │
  │ ...     │   esegue, aggiorna RAX=5     │ add rax,3 │
  │ RIP  +→ │                              │ 0x400e:   │
  └─────────┘   poi fetch successiva...    │ ret       │
                                           └───────────┘
```

## I registri x86-64 (System V — Linux/macOS)

L'architettura **x86-64** (anche detta AMD64, EM64T, x64) ha **16 registri general-purpose da 64 bit**:

| 64-bit | 32-bit | 16-bit | 8-bit |
|---|---|---|---|
| RAX | EAX | AX | AL |
| RBX | EBX | BX | BL |
| RCX | ECX | CX | CL |
| RDX | EDX | DX | DL |
| RSI | ESI | SI | SIL |
| RDI | EDI | DI | DIL |
| RBP | EBP | BP | BPL |
| RSP | ESP | SP | SPL |
| R8 – R15 | R8D – R15D | R8W – R15W | R8B – R15B |

Più registri speciali:
- **RIP** — instruction pointer.
- **RFLAGS** — flag (ZF zero, CF carry, SF sign, OF overflow, ...).

```
       64-bit RAX
   ┌──────────────────────────────────────────┐
   │  R63...R32     R31...R16   R15...R8 R7..R0 │
   └──────────────────────────────────────────┘
                    └──────────EAX──────────────┘
                                └─────AX────────┘
                                       └──AH─┴─AL─┘
```

Scrivere su `EAX` **azzera** la parte alta di `RAX` (è una stranezza dell'ISA — utile da ricordare).

### Convenzioni ruoli (System V x86-64)

Anche se "general-purpose", per convenzione ognuno ha un ruolo:

| Registro | Ruolo |
|---|---|
| RAX | accumulator, **ritorno di funzione** |
| RDI | **1° argomento** |
| RSI | **2° argomento** |
| RDX | **3° argomento** |
| RCX | **4° argomento** |
| R8 | **5° argomento** |
| R9 | **6° argomento** |
| RBP | base pointer (frame) |
| RSP | **stack pointer** |
| RBX, R12-R15 | callee-saved (la funzione chiamata li deve preservare) |
| RAX, RCX, RDX, RSI, RDI, R8-R11 | caller-saved (la funzione li può rovinare) |

> **Microsoft x64** ABI (Windows) usa **RCX, RDX, R8, R9** per primi 4 argomenti + 32 byte di "shadow space" sullo stack. Diverso! Se reversi binari Windows fai attenzione.

## Sintassi: Intel vs AT&T

Esistono due notazioni:

```asm
; Intel (più leggibile, default su Windows e in pwntools)
mov rax, 5
add rax, rbx

# AT&T (default su Linux objdump, gdb)
movq $5, %rax
addq %rbx, %rax
```

**Differenze:**
- Intel: `mov dst, src` (sorgente a destra).
- AT&T: `mov src, dst` (al contrario!), `$` per immediate, `%` per registri, suffisso `q/l/w/b` per size.

In questa guida **uso Intel**. In gdb: `set disassembly-flavor intel`.

## Le istruzioni che incontrerai sempre

### Movimento e aritmetica

```asm
mov rax, rbx            ; rax = rbx
mov rax, 0x1234         ; rax = 0x1234 (immediate)
mov rax, [rbx]          ; rax = memoria all'indirizzo rbx (dereferenza)
mov [rbx], rax          ; memoria[rbx] = rax
mov rax, [rbx + 8]      ; rax = memoria[rbx+8] (offset)
mov rax, [rbx + rcx*4]  ; indicizzato (rbx base, rcx*4 offset)

lea rax, [rbx + 8]      ; rax = rbx + 8 (Load Effective Address; aritmetica senza memoria!)

add rax, rbx            ; rax += rbx
sub rax, 10
imul rax, rbx           ; rax *= rbx (signed)
inc rax / dec rax       ; ++ / --
neg rax                 ; rax = -rax

xor rax, rax            ; rax = 0 (idioma)
and rax, 0xff           ; mask low byte
or  rax, 1
shl rax, 4              ; rax <<= 4 (moltiplica per 16)
shr rax, 4              ; rax >>= 4 (divisione intera per 16)
not rax                 ; complementa bit
```

### Confronto e salti

```asm
cmp rax, 10             ; setta flag in base a rax - 10 (senza modificare rax)
test rax, rax           ; setta flag in base a rax & rax (zero test efficiente)

je   label              ; jump if equal       (ZF = 1)
jne  label              ; jump if not equal   (ZF = 0)
jg   label              ; jump if greater (signed)
jl   label              ; jump if less (signed)
ja   label              ; jump if above (unsigned)
jb   label              ; jump if below (unsigned)
jz   label              ; jump if zero
jnz  label              ; jump if not zero
jmp  label              ; salto incondizionato
```

### Stack: push, pop, call, ret

```asm
push rax                ; rsp -= 8; [rsp] = rax
pop rax                 ; rax = [rsp]; rsp += 8
call funct              ; push RIP_next; jmp funct
ret                     ; rax_ret = [rsp]; rsp += 8; jmp rax_ret
```

**Lo stack cresce verso indirizzi BASSI** (in x86). `push` decrementa `RSP`, `pop` lo incrementa.

```
            indirizzi alti
       ┌──────────────────┐
       │   ...vecchi...   │
       │                  │
       │   valore A       │ ← prima del push
       ├──────────────────┤
       │   valore B       │ ← dopo "push B", RSP punta qui
       │                  │
       │                  │
       └──────────────────┘
            indirizzi bassi
```

### syscall

`syscall` chiede al kernel di fare qualcosa. Convenzione Linux x86-64:
- `RAX` = numero syscall.
- `RDI, RSI, RDX, R10, R8, R9` = argomenti (nota: R10, non RCX, per syscall).
- Ritorno in `RAX`.

```asm
; write(1, "hello\n", 6)
mov rax, 1            ; sys_write
mov rdi, 1            ; fd 1 = stdout
mov rsi, msg          ; buffer
mov rdx, 6            ; count
syscall

; exit(0)
mov rax, 60           ; sys_exit
xor rdi, rdi
syscall
```

Lista syscall: `/usr/include/asm/unistd_64.h` o `man syscalls`.

## "Hello, world!" in assembly puro

```asm
; hello.asm
section .data
msg:    db "Hello, asm!", 0x0a
mlen:   equ $ - msg

section .text
global _start
_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, mlen
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
```

Compila e esegui:
```bash
nasm -felf64 hello.asm -o hello.o
ld hello.o -o hello
./hello
# Hello, asm!
```

**12 istruzioni, 0 librerie, output reale.** Questo è ciò che fanno gli shellcode.

## Il prologo e l'epilogo di una funzione

Quando una funzione C viene chiamata, il compilatore genera tipicamente:

```asm
funct:
    push rbp            ; salva il base pointer del chiamante
    mov  rbp, rsp       ; nuovo frame: rbp = rsp
    sub  rsp, 32        ; alloca 32 byte per variabili locali
    
    ; ... corpo della funzione ...
    
    leave               ; mov rsp, rbp ; pop rbp   (smonta il frame)
    ret                 ; pop e jmp al return address
```

Visualizziamo lo stack durante l'esecuzione:

```
       indirizzi alti
   ┌──────────────────┐
   │   arg7 (se >6)   │
   │   ...            │
   ├──────────────────┤
   │ return address   │  ← RIP salvato (lo lascia "call")
   ├──────────────────┤
   │ saved RBP        │  ← saved RBP del chiamante
   ├──────────────────┤  ← RBP ora punta qui
   │ var locale 1     │
   │ var locale 2     │
   │ ...              │  ← RSP cresce verso il basso
   └──────────────────┘
       indirizzi bassi
```

Quando un **buffer overflow** scrive oltre `var locale`, sovrascrive prima `saved RBP`, poi `return address`. **Sovrascrivere il return address = controllare dove la CPU andrà al `ret`**. Questa è la base di ogni exploit binario.

## Esempio completo: tracing di una funzione in C → asm

```c
// add.c
int add(int a, int b) {
    return a + b;
}
int main(void) {
    int r = add(3, 4);
    return r;
}
```

Compila con `gcc -O0 -S add.c -masm=intel` (`-S` produce `.s` file con asm). Output (semplificato):

```asm
add:
    push rbp
    mov  rbp, rsp
    mov  DWORD PTR [rbp-4], edi    ; salva a (1° arg, EDI)
    mov  DWORD PTR [rbp-8], esi    ; salva b (2° arg, ESI)
    mov  edx, DWORD PTR [rbp-4]
    mov  eax, DWORD PTR [rbp-8]
    add  eax, edx                  ; EAX = b + a
    pop  rbp
    ret                            ; return value in EAX

main:
    push rbp
    mov  rbp, rsp
    sub  rsp, 16
    mov  esi, 4                    ; 2° arg
    mov  edi, 3                    ; 1° arg
    call add
    mov  DWORD PTR [rbp-4], eax    ; r = ret value
    mov  eax, DWORD PTR [rbp-4]
    leave
    ret
```

**Leggi una riga alla volta.** Vedi come `int` è 4 byte → uso di `EAX`/`EDX`/`EDI`/`ESI` (la metà bassa dei registri 64-bit). Compatti, eleganti.

## Esempio: un overflow di buffer in asm

```c
// vuln.c
#include <string.h>
#include <stdio.h>
void greet(char *name) {
    char buf[8];
    strcpy(buf, name);
    printf("hi %s\n", buf);
}
int main(int argc, char **argv) {
    if (argc > 1) greet(argv[1]);
    return 0;
}
```

Stack frame di `greet` dopo prologo:

```
       indirizzi alti
   ┌──────────────────┐
   │ return address   │  rbp+8
   ├──────────────────┤
   │ saved RBP        │  rbp
   ├──────────────────┤
   │ buf[7]           │  rbp-1
   │ buf[6]           │  rbp-2
   │ ...              │
   │ buf[0]           │  rbp-8     ← rsp (e inizio di buf)
   └──────────────────┘
       indirizzi bassi
```

Se `strcpy` copia 30 byte:
- byte 0-7  → `buf`.
- byte 8-15 → sovrascrivono `saved RBP`.
- byte 16-23 → sovrascrivono `return address`. **Controllo RIP.**

A byte 16-23 metti l'indirizzo dove vuoi che la CPU salti. **Game on.** (Dettagli completi in sezione 14b.)

## Endianness — vedi il caos

Sui sistemi x86 (little-endian), la memoria è organizzata "byte basso per primo". Significa che il valore `0x1234567890ABCDEF` in RAM è scritto come:

```
indirizzi → 0x00   0x01   0x02   0x03   0x04   0x05   0x06   0x07
bytes:       EF     CD     AB     90     78     56     34     12
```

L'**EF**, byte meno significativo, sta all'indirizzo **basso**. Quando scrivi un exploit, **devi** invertire i byte di un indirizzo per metterlo in un buffer:

```python
# Se vuoi che la CPU veda 0x4006a0 come prossimo RIP:
payload += b"\xa0\x06\x40\x00\x00\x00\x00\x00"
# oppure
from struct import pack
payload += pack("<Q", 0x4006a0)   # < = little-endian, Q = 8 byte unsigned
```

## ARM64 (AArch64) — quel che ti serve di base

In mobile (iOS/Android), molti server cloud (ARM Graviton), Raspberry, M1/M2/M3 Mac: **ARM64**. Diversa filosofia (**RISC** invece di CISC).

**Registri:**
- `X0`–`X30` general-purpose 64-bit, `W0`–`W30` versione 32-bit (low half).
- `XZR` (registro zero, sempre 0).
- `SP` stack pointer, `PC` program counter.
- `X30` = "Link Register" (LR), dove `ret` torna (analogo del return address salvato sullo stack in x86 — ma in ARM è in un registro, salvato sullo stack solo se la funzione chiama altre funzioni).

**Calling convention:**
- `X0`–`X7` per primi 8 argomenti.
- `X0` ritorno.
- `X29` frame pointer.

**Istruzioni RISC** (4 byte fissi, semantica orthogonal):

```asm
mov   x0, #5
add   x0, x1, x2          ; x0 = x1 + x2
sub   x0, x1, #3
ldr   x0, [x1]            ; load
ldr   x0, [x1, #8]        ; load con offset
str   x0, [x1]            ; store
ldp   x29, x30, [sp]      ; load PAIR (carica 2 registri da sp e sp+8 con un'istruzione!)
stp   x29, x30, [sp, #-16]!   ; store pair, pre-decrement (push)
b     label               ; branch
bl    funct               ; branch-and-link (call, salva PC+4 in X30)
ret                       ; jump a X30
cbz   x0, label           ; compare-and-branch-if-zero
```

Prologo tipico:
```asm
funct:
    stp x29, x30, [sp, #-16]!   ; push fp + lr
    mov x29, sp
    ; ... corpo ...
    ldp x29, x30, [sp], #16     ; pop fp + lr
    ret
```

Le istruzioni sono semantica più sicura per default (offset bounded), e ARM moderno ha **PAC** (Pointer Authentication Code) che firma i puntatori → exploit BoF su iOS recenti è significativamente più duro.

## Tools: come leggere e scrivere asm

### Compiler Explorer (godbolt.org)
**Imperdibile.** Scrivi C, vedi assembly. Cambia flag (`-O0`, `-O2`, `-fstack-protector`), confronta GCC/clang/MSVC. Lab di apprendimento velocissimo.

### objdump
```bash
gcc -c -O0 prog.c -o prog.o
objdump -d -M intel prog.o      # disasm Intel
objdump -d -M intel prog.o | less
```

### gdb + pwndbg
```bash
gdb ./prog
(gdb) set disassembly-flavor intel
(gdb) layout asm
(gdb) layout regs
(gdb) break main
(gdb) run
(gdb) stepi          # step di una istruzione asm
(gdb) info registers
(gdb) x/16wx $rsp    # esamina 16 word esadecimali a partire da $rsp
(gdb) x/s 0x402004   # esamina come stringa
(gdb) disas funct    # disasm di una funzione
```

Plugin `pwndbg` (`apt install pwndbg` o git) rende gdb usabile come tool di pwn.

### NASM (assembler)
```bash
nasm -felf64 file.asm -o file.o
ld file.o -o file
```

## Esempi tracciati passo-passo

### Esempio 1: somma in registro

```asm
mov rax, 5            ; ① RAX = 5
mov rbx, 3            ; ② RBX = 3
add rax, rbx          ; ③ RAX = RAX + RBX = 8
```

Stato dopo ogni step:

```
            RAX        RBX
inizio:     ?          ?
dopo ①:     5          ?
dopo ②:     5          3
dopo ③:     8          3
```

### Esempio 2: loop counting

```asm
        mov rcx, 10         ; counter
loop:
        sub rcx, 1
        jnz loop            ; se RCX != 0, ritorna a loop
```

`rcx` parte da 10, decrementi, salti finché non è 0. Loop di 10 iterazioni.

### Esempio 3: leggere un byte da un puntatore

C:
```c
char c = *p;
```

Asm (assumendo `p` in RDI):
```asm
mov al, byte ptr [rdi]    ; AL = byte all'indirizzo RDI
```

### Esempio 4: array indexing

C:
```c
int x = arr[i];
```

Asm (assumendo `arr` in RDI, `i` in RSI; int = 4 byte):
```asm
mov eax, dword ptr [rdi + rsi*4]    ; EAX = arr[i]
```

L'addressing mode `[base + index*scale + disp]` è potentissimo, evita istruzioni intermedie.

## Esercizi

### Es 1b.1 — Leggi questa funzione
Cosa fa?

```asm
funct:
    push rbp
    mov  rbp, rsp
    mov  eax, edi
    imul eax, edi
    pop  rbp
    ret
```

<details><summary>Soluzione</summary>

Eleva al quadrato il primo argomento. `EAX = EDI * EDI`. Equivale a `int square(int x) { return x*x; }`.

</details>

### Es 1b.2 — Scrivi a mano
Scrivi assembly che calcola il massimo tra `RDI` e `RSI`, ritorna in `RAX`.

<details><summary>Soluzione</summary>

```asm
max:
    mov rax, rdi
    cmp rdi, rsi
    jge done
    mov rax, rsi
done:
    ret
```

</details>

### Es 1b.3 — Godbolt experiment
Su [godbolt.org](https://godbolt.org), compila con GCC `-O0` e `-O3` il seguente C:

```c
int sum(int *arr, int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    return s;
}
```

Confronta gli output. `-O3` vettorizza (usa registri XMM/YMM)? Quanto è più corto/efficiente?

### Es 1b.4 — Trace dello stack
Per il seguente codice C, disegna lo stack frame di `greet` subito dopo il prologo:

```c
void greet(int a, int b) {
    char buf[24];
    int local = a + b;
}
```

<details><summary>Suggerimento</summary>

`a` arriva in EDI, `b` in ESI. Compilatore salva spesso a in `[rbp-4]`, b in `[rbp-8]` (o registri se ottimizzato). `buf[24]` occupa 24 byte allineati. `local` 4 byte. RSP scende di abbastanza per allinearsi a 16 byte (richiesto ABI).

</details>

### Es 1b.5 — Shellcode minimo execve("/bin/sh")
Cerca su shell-storm.org un shellcode `execve("/bin/sh", NULL, NULL)` x86-64 Linux. Leggilo. Identifica:
- Come la stringa "/bin/sh" viene messa in memoria (push, mov).
- Quale syscall number è `execve` (= 59).
- Perché si usa `xor reg, reg` invece di `mov reg, 0` (no null byte → utile per overflow via strcpy che si ferma su \0).

### Es 1b.6 — gdb come strumento didattico
Compila e gdb-step questo:

```c
// stepme.c
int main(void) {
    int a = 5, b = 3;
    int c = a + b;
    return c;
}
```

`gcc -O0 -g stepme.c -o stepme`. In gdb: `start`, `layout asm`, `stepi` finché non torni. Per ogni istruzione, scrivi cosa cambia.

## Concetti chiave

1. **CPU = registri + memoria + RIP**. Tutto il resto è abstraction.
2. **Stack frame**: prologo `push rbp; mov rbp,rsp; sub rsp,N`. Epilogo `leave; ret`.
3. **Return address sullo stack** = il punto di rottura di buffer overflow.
4. **Calling convention SysV**: RDI, RSI, RDX, RCX, R8, R9 + RAX ritorno. Windows è diversa.
5. **Little-endian** x86: byte basso prima.
6. **ARM64** = RISC, link register X30, PAC su mobile.
7. **Godbolt + gdb intel + pwndbg** = setup di apprendimento perfetto.

Ora puoi affrontare reverse (15) ed exploit dev (14, 14b) senza il muro di "ma cosa significa `mov`".
