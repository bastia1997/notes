---
title: "x86-64 and ARM64 Assembly from zero"
area: "Prerequisites"
order: 1.5
level: "beginner"
summary: "Assembly for someone who has never seen it before. What the CPU does instruction by instruction. Registers, stack, calling convention, layout of a program in memory, with diagrams and step-by-step traces. Everything you need for reverse engineering and exploit dev."
prereq:
  - "Section 01 (memory, processes)"
  - "Section 00b (binary, hex)"
tools:
  - "gcc, objdump, gdb (+ pwndbg/gef)"
  - "Compiler Explorer (godbolt.org) for quick experiments"
---

# Assembly from zero

> Everything the CPU does is execute assembly instructions. High-level languages (C, Python, Rust) get *compiled or interpreted* down to machine instructions. Understanding assembly = understanding what is REALLY happening. Without it, you don't see what reverse engineers and exploit devs see.

## The basic model

A CPU in 30 seconds:
- It has **registers**: small ultra-fast memories inside the CPU.
- It executes instructions in sequence, each one **modifies registers or memory**.
- There is a special register, `RIP` (instruction pointer), that says "what is the next instruction".
- The `jmp` instruction changes `RIP` → jump. `call` saves `RIP` and jumps. `ret` restores `RIP`.

```
  [   CPU   ]                              [    RAM    ]
  ┌─────────┐                              ┌───────────┐
  │ RAX  =? │   fetch instruction          │ 0x4000:   │
  │ RBX  =? │  ◄───────────────────────────┤ mov rax,5 │
  │ RCX  =? │                              │ 0x4007:   │
  │ ...     │   executes, updates RAX=5    │ add rax,3 │
  │ RIP  +→ │                              │ 0x400e:   │
  └─────────┘   then fetch the next...     │ ret       │
                                           └───────────┘
```

## The x86-64 registers (System V — Linux/macOS)

The **x86-64** architecture (also called AMD64, EM64T, x64) has **16 general-purpose 64-bit registers**:

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

Plus special registers:
- **RIP** — instruction pointer.
- **RFLAGS** — flags (ZF zero, CF carry, SF sign, OF overflow, ...).

```
       64-bit RAX
   ┌──────────────────────────────────────────┐
   │  R63...R32     R31...R16   R15...R8 R7..R0 │
   └──────────────────────────────────────────┘
                    └──────────EAX──────────────┘
                                └─────AX────────┘
                                       └──AH─┴─AL─┘
```

Writing to `EAX` **zeroes** the upper part of `RAX` (it's a quirk of the ISA — useful to remember).

### Role conventions (System V x86-64)

Even though "general-purpose", by convention each one has a role:

| Register | Role |
|---|---|
| RAX | accumulator, **function return value** |
| RDI | **1st argument** |
| RSI | **2nd argument** |
| RDX | **3rd argument** |
| RCX | **4th argument** |
| R8 | **5th argument** |
| R9 | **6th argument** |
| RBP | base pointer (frame) |
| RSP | **stack pointer** |
| RBX, R12-R15 | callee-saved (the called function must preserve them) |
| RAX, RCX, RDX, RSI, RDI, R8-R11 | caller-saved (the function can clobber them) |

> **Microsoft x64** ABI (Windows) uses **RCX, RDX, R8, R9** for the first 4 arguments + 32 bytes of "shadow space" on the stack. Different! If you reverse Windows binaries, pay attention.

## Syntax: Intel vs AT&T

Two notations exist:

```asm
; Intel (more readable, default on Windows and in pwntools)
mov rax, 5
add rax, rbx

# AT&T (default on Linux objdump, gdb)
movq $5, %rax
addq %rbx, %rax
```

**Differences:**
- Intel: `mov dst, src` (source on the right).
- AT&T: `mov src, dst` (the opposite!), `$` for immediates, `%` for registers, `q/l/w/b` suffix for size.

In this guide **I use Intel**. In gdb: `set disassembly-flavor intel`.

## The instructions you will see all the time

### Movement and arithmetic

```asm
mov rax, rbx            ; rax = rbx
mov rax, 0x1234         ; rax = 0x1234 (immediate)
mov rax, [rbx]          ; rax = memory at address rbx (dereference)
mov [rbx], rax          ; memory[rbx] = rax
mov rax, [rbx + 8]      ; rax = memory[rbx+8] (offset)
mov rax, [rbx + rcx*4]  ; indexed (rbx base, rcx*4 offset)

lea rax, [rbx + 8]      ; rax = rbx + 8 (Load Effective Address; arithmetic without memory!)

add rax, rbx            ; rax += rbx
sub rax, 10
imul rax, rbx           ; rax *= rbx (signed)
inc rax / dec rax       ; ++ / --
neg rax                 ; rax = -rax

xor rax, rax            ; rax = 0 (idiom)
and rax, 0xff           ; mask low byte
or  rax, 1
shl rax, 4              ; rax <<= 4 (multiply by 16)
shr rax, 4              ; rax >>= 4 (integer divide by 16)
not rax                 ; bitwise complement
```

### Comparison and jumps

```asm
cmp rax, 10             ; sets flags based on rax - 10 (without modifying rax)
test rax, rax           ; sets flags based on rax & rax (efficient zero test)

je   label              ; jump if equal       (ZF = 1)
jne  label              ; jump if not equal   (ZF = 0)
jg   label              ; jump if greater (signed)
jl   label              ; jump if less (signed)
ja   label              ; jump if above (unsigned)
jb   label              ; jump if below (unsigned)
jz   label              ; jump if zero
jnz  label              ; jump if not zero
jmp  label              ; unconditional jump
```

### Stack: push, pop, call, ret

```asm
push rax                ; rsp -= 8; [rsp] = rax
pop rax                 ; rax = [rsp]; rsp += 8
call funct              ; push RIP_next; jmp funct
ret                     ; rax_ret = [rsp]; rsp += 8; jmp rax_ret
```

**The stack grows toward LOW addresses** (on x86). `push` decrements `RSP`, `pop` increments it.

```
            high addresses
       ┌──────────────────┐
       │   ...old...      │
       │                  │
       │   value A        │ ← before the push
       ├──────────────────┤
       │   value B        │ ← after "push B", RSP points here
       │                  │
       │                  │
       └──────────────────┘
            low addresses
```

### syscall

`syscall` asks the kernel to do something. Linux x86-64 convention:
- `RAX` = syscall number.
- `RDI, RSI, RDX, R10, R8, R9` = arguments (note: R10, not RCX, for syscalls).
- Return value in `RAX`.

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

Syscall list: `/usr/include/asm/unistd_64.h` or `man syscalls`.

## "Hello, world!" in pure assembly

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

Build and run:
```bash
nasm -felf64 hello.asm -o hello.o
ld hello.o -o hello
./hello
# Hello, asm!
```

**12 instructions, 0 libraries, real output.** This is what shellcodes do.

## The prologue and epilogue of a function

When a C function is called, the compiler typically generates:

```asm
funct:
    push rbp            ; save the caller's base pointer
    mov  rbp, rsp       ; new frame: rbp = rsp
    sub  rsp, 32        ; allocate 32 bytes for local variables
    
    ; ... function body ...
    
    leave               ; mov rsp, rbp ; pop rbp   (tears down the frame)
    ret                 ; pop and jmp to the return address
```

Let's visualize the stack during execution:

```
       high addresses
   ┌──────────────────┐
   │   arg7 (if >6)   │
   │   ...            │
   ├──────────────────┤
   │ return address   │  ← saved RIP (left by "call")
   ├──────────────────┤
   │ saved RBP        │  ← caller's saved RBP
   ├──────────────────┤  ← RBP now points here
   │ local var 1      │
   │ local var 2      │
   │ ...              │  ← RSP grows downward
   └──────────────────┘
       low addresses
```

When a **buffer overflow** writes past `local var`, it first overwrites `saved RBP`, then `return address`. **Overwriting the return address = controlling where the CPU will go on `ret`**. This is the basis of every binary exploit.

## Complete example: tracing a function from C → asm

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

Compile with `gcc -O0 -S add.c -masm=intel` (`-S` produces a `.s` file with asm). Output (simplified):

```asm
add:
    push rbp
    mov  rbp, rsp
    mov  DWORD PTR [rbp-4], edi    ; save a (1st arg, EDI)
    mov  DWORD PTR [rbp-8], esi    ; save b (2nd arg, ESI)
    mov  edx, DWORD PTR [rbp-4]
    mov  eax, DWORD PTR [rbp-8]
    add  eax, edx                  ; EAX = b + a
    pop  rbp
    ret                            ; return value in EAX

main:
    push rbp
    mov  rbp, rsp
    sub  rsp, 16
    mov  esi, 4                    ; 2nd arg
    mov  edi, 3                    ; 1st arg
    call add
    mov  DWORD PTR [rbp-4], eax    ; r = ret value
    mov  eax, DWORD PTR [rbp-4]
    leave
    ret
```

**Read it one line at a time.** See how `int` is 4 bytes → use of `EAX`/`EDX`/`EDI`/`ESI` (the low half of the 64-bit registers). Compact, elegant.

## Example: a buffer overflow in asm

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

Stack frame of `greet` after the prologue:

```
       high addresses
   ┌──────────────────┐
   │ return address   │  rbp+8
   ├──────────────────┤
   │ saved RBP        │  rbp
   ├──────────────────┤
   │ buf[7]           │  rbp-1
   │ buf[6]           │  rbp-2
   │ ...              │
   │ buf[0]           │  rbp-8     ← rsp (and start of buf)
   └──────────────────┘
       low addresses
```

If `strcpy` copies 30 bytes:
- bytes 0-7  → `buf`.
- bytes 8-15 → overwrite `saved RBP`.
- bytes 16-23 → overwrite `return address`. **RIP control.**

At bytes 16-23 you put the address where you want the CPU to jump. **Game on.** (Full details in section 14b.)

## Endianness — witness the chaos

On x86 systems (little-endian), memory is laid out "low byte first". This means the value `0x1234567890ABCDEF` in RAM is written as:

```
addresses → 0x00   0x01   0x02   0x03   0x04   0x05   0x06   0x07
bytes:       EF     CD     AB     90     78     56     34     12
```

The **EF**, least significant byte, is at the **low** address. When you write an exploit, you **must** reverse the bytes of an address to put it in a buffer:

```python
# If you want the CPU to see 0x4006a0 as the next RIP:
payload += b"\xa0\x06\x40\x00\x00\x00\x00\x00"
# or
from struct import pack
payload += pack("<Q", 0x4006a0)   # < = little-endian, Q = 8-byte unsigned
```

## ARM64 (AArch64) — what you need to know at a basic level

On mobile (iOS/Android), many cloud servers (ARM Graviton), Raspberry, M1/M2/M3 Macs: **ARM64**. Different philosophy (**RISC** instead of CISC).

**Registers:**
- `X0`–`X30` general-purpose 64-bit, `W0`–`W30` 32-bit version (low half).
- `XZR` (zero register, always 0).
- `SP` stack pointer, `PC` program counter.
- `X30` = "Link Register" (LR), where `ret` returns to (analogous to the return address saved on the stack in x86 — but on ARM it's in a register, saved on the stack only if the function calls other functions).

**Calling convention:**
- `X0`–`X7` for the first 8 arguments.
- `X0` return value.
- `X29` frame pointer.

**RISC instructions** (fixed 4 bytes, orthogonal semantics):

```asm
mov   x0, #5
add   x0, x1, x2          ; x0 = x1 + x2
sub   x0, x1, #3
ldr   x0, [x1]            ; load
ldr   x0, [x1, #8]        ; load with offset
str   x0, [x1]            ; store
ldp   x29, x30, [sp]      ; load PAIR (loads 2 registers from sp and sp+8 with one instruction!)
stp   x29, x30, [sp, #-16]!   ; store pair, pre-decrement (push)
b     label               ; branch
bl    funct               ; branch-and-link (call, saves PC+4 into X30)
ret                       ; jump to X30
cbz   x0, label           ; compare-and-branch-if-zero
```

Typical prologue:
```asm
funct:
    stp x29, x30, [sp, #-16]!   ; push fp + lr
    mov x29, sp
    ; ... body ...
    ldp x29, x30, [sp], #16     ; pop fp + lr
    ret
```

Instructions have safer-by-default semantics (bounded offsets), and modern ARM has **PAC** (Pointer Authentication Code) which signs pointers → BoF exploits on recent iOS are significantly harder.

## Tools: how to read and write asm

### Compiler Explorer (godbolt.org)
**A must-have.** Write C, see assembly. Change flags (`-O0`, `-O2`, `-fstack-protector`), compare GCC/clang/MSVC. Lightning-fast learning lab.

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
(gdb) stepi          # step one asm instruction
(gdb) info registers
(gdb) x/16wx $rsp    # examine 16 hex words starting at $rsp
(gdb) x/s 0x402004   # examine as string
(gdb) disas funct    # disasm a function
```

The `pwndbg` plugin (`apt install pwndbg` or git) makes gdb usable as a pwn tool.

### NASM (assembler)
```bash
nasm -felf64 file.asm -o file.o
ld file.o -o file
```

## Step-by-step traced examples

### Example 1: addition in a register

```asm
mov rax, 5            ; ① RAX = 5
mov rbx, 3            ; ② RBX = 3
add rax, rbx          ; ③ RAX = RAX + RBX = 8
```

State after each step:

```
            RAX        RBX
start:      ?          ?
after ①:    5          ?
after ②:    5          3
after ③:    8          3
```

### Example 2: loop counting

```asm
        mov rcx, 10         ; counter
loop:
        sub rcx, 1
        jnz loop            ; if RCX != 0, go back to loop
```

`rcx` starts at 10, you decrement, you jump until it's 0. Loop of 10 iterations.

### Example 3: reading a byte from a pointer

C:
```c
char c = *p;
```

Asm (assuming `p` in RDI):
```asm
mov al, byte ptr [rdi]    ; AL = byte at address RDI
```

### Example 4: array indexing

C:
```c
int x = arr[i];
```

Asm (assuming `arr` in RDI, `i` in RSI; int = 4 bytes):
```asm
mov eax, dword ptr [rdi + rsi*4]    ; EAX = arr[i]
```

The `[base + index*scale + disp]` addressing mode is extremely powerful and avoids intermediate instructions.

## Exercises

### Ex 1b.1 — Read this function
What does it do?

```asm
funct:
    push rbp
    mov  rbp, rsp
    mov  eax, edi
    imul eax, edi
    pop  rbp
    ret
```

<details><summary>Solution</summary>

It squares the first argument. `EAX = EDI * EDI`. Equivalent to `int square(int x) { return x*x; }`.

</details>

### Ex 1b.2 — Write it by hand
Write assembly that computes the maximum of `RDI` and `RSI`, returns it in `RAX`.

<details><summary>Solution</summary>

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

### Ex 1b.3 — Godbolt experiment
On [godbolt.org](https://godbolt.org), compile the following C with GCC `-O0` and `-O3`:

```c
int sum(int *arr, int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    return s;
}
```

Compare the outputs. Does `-O3` vectorize (use XMM/YMM registers)? How much shorter/more efficient is it?

### Ex 1b.4 — Stack trace
For the following C code, draw the stack frame of `greet` right after the prologue:

```c
void greet(int a, int b) {
    char buf[24];
    int local = a + b;
}
```

<details><summary>Hint</summary>

`a` arrives in EDI, `b` in ESI. The compiler often saves a at `[rbp-4]`, b at `[rbp-8]` (or in registers if optimized). `buf[24]` takes 24 aligned bytes. `local` 4 bytes. RSP drops enough to align to 16 bytes (required by the ABI).

</details>

### Ex 1b.5 — Minimal execve("/bin/sh") shellcode
Look up on shell-storm.org an `execve("/bin/sh", NULL, NULL)` x86-64 Linux shellcode. Read it. Identify:
- How the "/bin/sh" string is placed in memory (push, mov).
- Which syscall number `execve` is (= 59).
- Why `xor reg, reg` is used instead of `mov reg, 0` (no null byte → useful for overflow via strcpy, which stops on \0).

### Ex 1b.6 — gdb as a teaching tool
Compile and gdb-step through this:

```c
// stepme.c
int main(void) {
    int a = 5, b = 3;
    int c = a + b;
    return c;
}
```

`gcc -O0 -g stepme.c -o stepme`. In gdb: `start`, `layout asm`, `stepi` until you return. For each instruction, write down what changes.

## Key concepts

1. **CPU = registers + memory + RIP**. Everything else is abstraction.
2. **Stack frame**: prologue `push rbp; mov rbp,rsp; sub rsp,N`. Epilogue `leave; ret`.
3. **Return address on the stack** = the breaking point for buffer overflows.
4. **SysV calling convention**: RDI, RSI, RDX, RCX, R8, R9 + RAX for return. Windows is different.
5. **Little-endian** x86: low byte first.
6. **ARM64** = RISC, link register X30, PAC on mobile.
7. **Godbolt + gdb intel + pwndbg** = perfect learning setup.

Now you can tackle reverse (15) and exploit dev (14, 14b) without hitting the "but what does `mov` mean" wall.
