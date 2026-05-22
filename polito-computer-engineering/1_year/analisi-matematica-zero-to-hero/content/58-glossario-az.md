---
title: Glossario A-Z dell'Analisi Matematica I
area: Reference
summary: "Voci alfabetiche con definizioni precise (1-3 righe) e rimando alla sezione del sito. Da consultare avanti e indietro."
order: 58
level: avanzato
prereq:
  - "Le sezioni precedenti del percorso"
tools:
  - "Rudin"
  - "Marcellini-Sbordone"
  - "Giusti"
---

Questo glossario raccoglie in ordine alfabetico le voci fondamentali dell'Analisi Matematica I (e una manciata di estensioni a piu' variabili e funzionale, presenti nelle ultime sezioni). Ogni voce contiene una definizione precisa o un enunciato sintetico, eventualmente una formula in KaTeX, e a fine voce un rimando alla sezione del sito dove l'argomento e' trattato in modo esteso.

Si consiglia di usarlo in due modi: leggere una voce per fissare la definizione, oppure partire da una voce e seguire i rimandi alla sezione completa quando serve la dimostrazione o il contesto.

---

## A

### Accumulazione (punto di)
Sia $A\subseteq\mathbb{R}$ e $x_0\in\mathbb{R}$. $x_0$ e' punto di accumulazione di $A$ se in ogni intorno di $x_0$ cade almeno un punto di $A$ diverso da $x_0$, cioe' $\forall\,\delta>0\ \exists\,x\in A\setminus\{x_0\}$ con $|x-x_0|<\delta$. Non occorre che $x_0\in A$. Vedi sezione 10.

### Aderenza (punto di)
$x_0$ e' aderente ad $A$ se ogni intorno di $x_0$ contiene almeno un punto di $A$ (eventualmente $x_0$ stesso). L'insieme dei punti aderenti e' la chiusura $\overline{A}$. Vedi sezione 10.

### Aperto (insieme)
$A\subseteq\mathbb{R}$ e' aperto se per ogni $x\in A$ esiste $\delta>0$ tale che $(x-\delta,x+\delta)\subseteq A$. Equivalentemente, $A$ coincide con il suo interno. In $\mathbb{R}^n$ la definizione e' identica usando palle euclidee. Vedi sezioni 10 e 54.

### Archimede (proprieta' di)
Per ogni $a,b\in\mathbb{R}$ con $a>0$ esiste $n\in\mathbb{N}$ tale che $na>b$. Equivale a dire che $\mathbb{N}$ non e' superiormente limitato in $\mathbb{R}$. Conseguenza diretta del completamento per sezioni. Vedi sezione 06.

### Argomento (di un complesso)
Per $z=x+iy\neq 0$, l'argomento $\theta$ e' l'angolo tale che $z=|z|(\cos\theta+i\sin\theta)$. Definito modulo $2\pi$; il valore principale si sceglie in $(-\pi,\pi]$. Vedi sezione 09.

### Armonica (serie)
La serie $\sum_{n=1}^{+\infty}\frac{1}{n}$. Diverge (somme parziali $H_n\sim\ln n$). Generalizzazione: $\sum 1/n^\alpha$ converge sse $\alpha>1$. Vedi sezione 46.

### Asintoto orizzontale
Retta $y=L$ con $L\in\mathbb{R}$ tale che $\lim_{x\to+\infty}f(x)=L$ (o $-\infty$). Indica il comportamento "piatto" all'infinito. Vedi sezione 23.

### Asintoto verticale
Retta $x=x_0$ tale che $\lim_{x\to x_0^\pm}f(x)=\pm\infty$. Tipicamente in punti di non definizione (zeri del denominatore, log in zero, ecc.). Vedi sezione 23.

### Asintoto obliquo
Retta $y=mx+q$ con $m\neq 0$ tale che $\lim_{x\to\pm\infty}[f(x)-(mx+q)]=0$. Si trova con $m=\lim_{x\to\pm\infty}f(x)/x$ e $q=\lim_{x\to\pm\infty}(f(x)-mx)$. Esiste sse entrambi i limiti sono finiti e $m\neq 0$. Vedi sezione 23.

### Assoluta convergenza (di una serie)
La serie $\sum a_n$ converge assolutamente se $\sum |a_n|$ converge. L'assoluta convergenza implica la convergenza semplice, ma non viceversa (es. $\sum (-1)^n/n$). Vedi sezione 47.

### Assoluta convergenza (di un integrale improprio)
$\int_a^{+\infty} f$ converge assolutamente se $\int_a^{+\infty}|f|$ converge. Implica la convergenza semplice ed e' la nozione "buona" per scambiare limiti e integrali. Vedi sezione 43.

### Assioma di completezza
Ogni sottoinsieme non vuoto di $\mathbb{R}$ superiormente limitato ammette estremo superiore in $\mathbb{R}$. E' l'assioma che distingue $\mathbb{R}$ da $\mathbb{Q}$. Vedi sezioni 06 e 07.

---

## B

### Bernoulli (disuguaglianza di)
Per $x\geq -1$ e $n\in\mathbb{N}$: $(1+x)^n\geq 1+nx$. Estensione reale: per $\alpha\geq 1$ e $x\geq -1$, $(1+x)^\alpha\geq 1+\alpha x$. Si dimostra per induzione. Vedi sezione 03.

### Binomio di Newton
$(a+b)^n=\sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k$, con $\binom{n}{k}=\frac{n!}{k!(n-k)!}$. Si prova per induzione usando la formula di Pascal. Vedi sezione 03.

### Bolzano (teorema degli zeri)
Se $f:[a,b]\to\mathbb{R}$ e' continua e $f(a)f(b)<0$, allora esiste $c\in(a,b)$ con $f(c)=0$. Base del metodo di bisezione e del teorema dei valori intermedi. Vedi sezione 25.

### Bolzano-Weierstrass (teorema di)
Ogni successione reale limitata ammette una sottosuccessione convergente. Equivale, in $\mathbb{R}$, a dire che ogni insieme infinito e limitato ha un punto di accumulazione. Vedi sezione 13.

### Buon ordinamento
Ogni sottoinsieme non vuoto di $\mathbb{N}$ ha minimo. Equivalente al principio di induzione. Vedi sezione 03.

---

## C

### Cardinalita'
Misura "quantita' di elementi" di un insieme. Due insiemi hanno la stessa cardinalita' se esiste una biiezione tra di loro. $|\mathbb{N}|=|\mathbb{Z}|=|\mathbb{Q}|=\aleph_0$; $|\mathbb{R}|=2^{\aleph_0}>\aleph_0$. Vedi sezione 05.

### Cauchy (successione di)
Successione $\{a_n\}$ tale che $\forall\,\varepsilon>0\ \exists\,N$ con $|a_n-a_m|<\varepsilon\ \forall n,m\geq N$. In $\mathbb{R}$ (completo) coincide con le successioni convergenti. Vedi sezione 14.

### Cauchy (problema di)
Sistema costituito da una EDO $y'=f(x,y)$ e da una condizione iniziale $y(x_0)=y_0$. Si cerca una funzione $y$ definita in un intorno di $x_0$ che soddisfi entrambe. Vedi sezione 53.

### Cauchy (criterio di per serie)
$\sum a_n$ converge sse $\forall\,\varepsilon>0\ \exists\,N$ tale che $|a_{n+1}+\cdots+a_m|<\varepsilon\ \forall m>n\geq N$. Vedi sezione 45.

### Cauchy-Schwarz (disuguaglianza)
Per ogni $a,b\in\mathbb{R}^n$: $|\langle a,b\rangle|\leq\|a\|\,\|b\|$. Forma integrale: $|\int fg|\leq\sqrt{\int f^2}\sqrt{\int g^2}$. Caso di uguaglianza solo se $a,b$ sono proporzionali. Vedi sezione 54.

### Chiuso (insieme)
$C\subseteq\mathbb{R}$ e' chiuso se il suo complementare e' aperto, equivalentemente se contiene tutti i suoi punti di accumulazione. Vedi sezioni 10 e 54.

### Chiusura
La chiusura $\overline{A}$ di $A$ e' il piu' piccolo chiuso che contiene $A$, cioe' $\overline{A}=A\cup A'$ con $A'$ insieme dei punti di accumulazione. Vedi sezione 10.

### Compatto
In $\mathbb{R}^n$: $K$ compatto $\iff$ $K$ chiuso e limitato (Heine-Borel). Caratterizzazione sequenziale: ogni successione in $K$ ha una sottosuccessione convergente a un punto di $K$. Vedi sezione 54.

### Completezza
$\mathbb{R}$ e' completo: ogni successione di Cauchy converge. Equivale all'assioma del sup. $\mathbb{Q}$ non e' completo (es.: troncate decimali di $\sqrt 2$). Vedi sezioni 06 e 14.

### Composizione di funzioni
$(g\circ f)(x)=g(f(x))$. Continuita': se $f$ continua in $x_0$ e $g$ continua in $f(x_0)$, allora $g\circ f$ continua in $x_0$. Per derivata: regola della catena. Vedi sezione 02.

### Concavita'
$f$ e' concava su $I$ se per ogni $x,y\in I$ e $t\in[0,1]$: $f(tx+(1-t)y)\geq tf(x)+(1-t)f(y)$. Equivale a $-f$ convessa. Se $f\in C^2$: $f''\leq 0$. Vedi sezione 36.

### Continuita' (in un punto)
$f$ e' continua in $x_0$ se $\lim_{x\to x_0}f(x)=f(x_0)$. Equivalentemente (Heine), per ogni successione $x_n\to x_0$ si ha $f(x_n)\to f(x_0)$. Vedi sezione 24.

### Continuita' (su un insieme)
$f$ e' continua su $A$ se e' continua in ogni $x_0\in A$. Notazione $f\in C^0(A)$. Vedi sezione 24.

### Convergenza puntuale
Successione di funzioni $f_n:A\to\mathbb{R}$ converge puntualmente a $f$ se $\forall x\in A,\ f_n(x)\to f(x)$. Non garantisce scambio di limiti, derivate, integrali. Vedi sezione 48.

### Convergenza uniforme
$f_n\to f$ uniformemente su $A$ se $\sup_{x\in A}|f_n(x)-f(x)|\to 0$. Implica continuita' del limite, scambio limite-integrale, scambio limite-derivata sotto ipotesi extra. Vedi sezione 48.

### Convergenza assoluta
Vedi voci "Assoluta convergenza" (serie e integrali).

### Convergenza condizionata
Convergenza non assoluta: $\sum a_n$ converge ma $\sum|a_n|$ diverge. Tipico esempio: serie armonica a segni alterni. Si maneggia con il teorema di Riemann (riordinamenti). Vedi sezione 47.

### Convessita'
$f:I\to\mathbb{R}$ e' convessa se $\forall x,y\in I,\ t\in[0,1]:\ f(tx+(1-t)y)\leq tf(x)+(1-t)f(y)$. Se $f\in C^2$: $f''\geq 0$. Vedi sezione 36.

### Coseno
Funzione $\cos:\mathbb{R}\to[-1,1]$, periodica di periodo $2\pi$, pari, $\cos 0=1$. Vedi sezione 19.

### Coseno iperbolico
$\cosh x=\frac{e^x+e^{-x}}{2}$. Pari, $\cosh 0=1$, $\cosh^2 x-\sinh^2 x=1$, derivata $\sinh x$. Vedi sezione 19.

### Crescente (funzione)
$f:A\to\mathbb{R}$ e' (debolmente) crescente se $x<y\Rightarrow f(x)\leq f(y)$; strettamente crescente se $x<y\Rightarrow f(x)<f(y)$. Per $f$ derivabile: $f'\geq 0\Rightarrow$ crescente. Vedi sezione 35.

### Criterio del confronto (serie)
Se $0\leq a_n\leq b_n$ definitivamente, allora: $\sum b_n$ converge $\Rightarrow$ $\sum a_n$ converge; $\sum a_n$ diverge $\Rightarrow$ $\sum b_n$ diverge. Vedi sezione 46.

### Criterio del rapporto
Se $a_n>0$ e $\lim a_{n+1}/a_n=L$: se $L<1$ la serie converge, se $L>1$ diverge, se $L=1$ il test non decide. Vedi sezione 46.

### Criterio della radice
Se $a_n\geq 0$ e $\lim \sqrt[n]{a_n}=L$: come sopra. Versione con $\limsup$ funziona sempre. Vedi sezione 46.

---

## D

### Darboux (somme di)
Per $f$ limitata su $[a,b]$ e partizione $P$: $s(f,P)=\sum m_i\Delta x_i$ (inferiore), $S(f,P)=\sum M_i\Delta x_i$ (superiore), con $m_i=\inf_{[x_{i-1},x_i]} f$, $M_i=\sup$. $f$ Riemann-integrabile sse $\sup s = \inf S$. Vedi sezione 39.

### Dedekind (sezione di)
Coppia $(A,B)$ con $A,B\subset\mathbb{Q}$ non vuoti, $A\cup B=\mathbb{Q}$, $\forall a\in A\,\forall b\in B:\ a<b$. Le sezioni di $\mathbb{Q}$ definiscono $\mathbb{R}$ (costruzione di Dedekind). Vedi sezione 08.

### Densita'
$A$ e' denso in $B$ se $\overline{A}\supseteq B$. Esempio: $\mathbb{Q}$ denso in $\mathbb{R}$; gli irrazionali pure. Vedi sezione 06.

### Derivata
$f'(x_0)=\lim_{h\to 0}\frac{f(x_0+h)-f(x_0)}{h}$, se il limite esiste finito. Geometricamente: pendenza della tangente al grafico in $(x_0,f(x_0))$. Vedi sezione 28.

### Derivata destra/sinistra
$f'_+(x_0)=\lim_{h\to 0^+}\frac{f(x_0+h)-f(x_0)}{h}$; analogamente $f'_-$. $f$ derivabile in $x_0$ sse $f'_+$ e $f'_-$ esistono finite e coincidono. Vedi sezione 28.

### Derivata parziale
Per $f:A\subseteq\mathbb{R}^n\to\mathbb{R}$, $\frac{\partial f}{\partial x_i}(x_0)=\lim_{h\to 0}\frac{f(x_0+he_i)-f(x_0)}{h}$. Derivata di $f$ tenendo le altre variabili fisse. Vedi sezione 55.

### Differenziabilita'
$f:A\subseteq\mathbb{R}^n\to\mathbb{R}$ e' differenziabile in $x_0$ se esiste $L:\mathbb{R}^n\to\mathbb{R}$ lineare con $f(x_0+h)=f(x_0)+L(h)+o(\|h\|)$. Allora $L(h)=\nabla f(x_0)\cdot h$. Vedi sezione 55.

### Differenziale
L'applicazione lineare $df_{x_0}:h\mapsto\nabla f(x_0)\cdot h$. In 1D: $df=f'(x_0)\,dx$. Vedi sezioni 28 e 55.

### Dirichlet (criterio di)
Per serie $\sum a_n b_n$: se $\sum a_n$ ha somme parziali limitate, $\{b_n\}$ e' monotona e tende a $0$, allora $\sum a_n b_n$ converge. Vedi sezione 47.

### Dirichlet (funzione di)
$D(x)=1$ se $x\in\mathbb{Q}$, $D(x)=0$ altrimenti. Esempio classico di funzione discontinua ovunque e non Riemann-integrabile su $[0,1]$, ma Lebesgue-integrabile con integrale $0$. Vedi sezioni 27 e 56.

### Discontinuita'
Classificazione: di prima specie / a salto ($f(x_0^+)\neq f(x_0^-)$, entrambi finiti); eliminabile ($\lim$ esiste finito ma diverso da $f(x_0)$); essenziale / di seconda specie (almeno un limite laterale non esiste o e' infinito). Vedi sezione 27.

### Distanza
In $\mathbb{R}^n$ euclidea: $d(x,y)=\|x-y\|=\sqrt{\sum(x_i-y_i)^2}$. Soddisfa positivita', simmetria, disuguaglianza triangolare. Vedi sezione 54.

---

## E

### e (numero di Eulero)
$e=\lim_{n\to+\infty}\left(1+\frac{1}{n}\right)^n=\sum_{n=0}^{+\infty}\frac{1}{n!}\approx 2{,}71828$. Irrazionale e trascendente. Vedi sezione 15.

### EDO (equazione differenziale ordinaria)
Equazione che lega una funzione incognita $y(x)$ e alcune sue derivate. Ordine = massima derivata che compare. Vedi sezioni 51 e 52.

### Esponenziale
$\exp x=e^x=\sum_{n=0}^{+\infty}\frac{x^n}{n!}$. Definita su $\mathbb{R}$, positiva, strettamente crescente, $\exp'=\exp$. Vedi sezione 18.

### Esponenziale complesso
$e^z=\sum_{n=0}^{+\infty}\frac{z^n}{n!}$. Soddisfa $e^{z+w}=e^z e^w$ e formula di Eulero $e^{i\theta}=\cos\theta+i\sin\theta$. Vedi sezione 09.

### Estremo superiore
Per $A\subseteq\mathbb{R}$ superiormente limitato, $\sup A$ e' il minimo dei maggioranti. Esiste in $\mathbb{R}$ per l'assioma di completezza. Se $\sup A\in A$ si chiama massimo. Vedi sezione 07.

### Estremo inferiore
Per $A$ inferiormente limitato, $\inf A$ e' il massimo dei minoranti. Vedi sezione 07.

### Eulero (formula di)
$e^{i\theta}=\cos\theta+i\sin\theta$. Per $\theta=\pi$: $e^{i\pi}+1=0$. Vedi sezione 09.

---

## F

### Fattoriale
$0!=1$, $n!=n\cdot(n-1)!$ per $n\geq 1$. Cresce piu' veloce di ogni esponenziale: $n!\to+\infty$ piu' rapidamente di $a^n$ per ogni $a>0$. Vedi sezione 03.

### Fermat (teorema di)
Se $f$ ha un estremo locale in $x_0$ interno al dominio e $f'(x_0)$ esiste, allora $f'(x_0)=0$. Condizione necessaria, non sufficiente. Vedi sezione 31.

### Forma indeterminata
Limite del tipo $0/0$, $\infty/\infty$, $0\cdot\infty$, $\infty-\infty$, $1^\infty$, $0^0$, $\infty^0$: la sola sostituzione non determina il valore, servono tecniche (de l'Hopital, Taylor, sostituzioni). Vedi sezioni 22 e 32.

### Fourier (serie di)
Per $f$ periodica di periodo $2\pi$ e integrabile: $f(x)\sim\frac{a_0}{2}+\sum_{n\geq 1}(a_n\cos nx+b_n\sin nx)$ con $a_n,b_n$ coefficienti integrali di Fourier. Cenni in sezione 56.

### Frontiera
$\partial A=\overline{A}\cap\overline{A^c}$: punti aderenti sia ad $A$ che al complementare. In $\mathbb{R}$: $\partial(a,b)=\{a,b\}$. Vedi sezioni 10 e 54.

### Funzione
Legge $f:A\to B$ che a ogni $a\in A$ associa un unico $f(a)\in B$. $A$ = dominio, $B$ = codominio, $f(A)$ = immagine. Vedi sezione 02.

### Funzione caratteristica
$\chi_E(x)=1$ se $x\in E$, $0$ altrimenti. Strumento base in teoria della misura. Vedi sezione 56.

### Funzione composta
Vedi voce "Composizione di funzioni".

### Funzione integrale
$F(x)=\int_a^x f(t)\,dt$. Se $f$ e' continua, $F$ e' $C^1$ con $F'=f$ (TFC). Vedi sezione 44.

### Funzione inversa
Se $f:A\to B$ e' biiettiva, $f^{-1}:B\to A$ e' la funzione che soddisfa $f^{-1}(f(x))=x$. Per $f$ continua su intervallo, $f$ invertibile sse $f$ strettamente monotona; $f^{-1}$ e' anch'essa continua e monotona. Vedi sezione 25.

---

## G

### Gamma di Eulero
$\Gamma(s)=\int_0^{+\infty} t^{s-1}e^{-t}\,dt$ per $s>0$. Estensione del fattoriale: $\Gamma(n+1)=n!$. Soddisfa $\Gamma(s+1)=s\Gamma(s)$. Vedi sezione 43.

### Geometrica (serie)
$\sum_{n=0}^{+\infty} q^n=\frac{1}{1-q}$ se $|q|<1$; diverge se $|q|\geq 1$. Prototipo di tutte le serie di potenze. Vedi sezione 45.

### Gradiente
Per $f:A\subseteq\mathbb{R}^n\to\mathbb{R}$ differenziabile, $\nabla f(x_0)=\big(\partial_{x_1} f,\dots,\partial_{x_n} f\big)(x_0)$. Indica direzione di massima crescita. Vedi sezione 55.

### Grafico
$\Gamma_f=\{(x,f(x)):x\in A\}\subseteq A\times B$. Visualizza la funzione. Vedi sezione 02.

---

## H

### Heine (caratterizzazione di)
$\lim_{x\to x_0} f(x)=L$ sse per ogni successione $x_n\to x_0$ (con $x_n\neq x_0$) si ha $f(x_n)\to L$. Strumento principale per ricondurre limiti di funzione a limiti di successione. Vedi sezione 21.

### Heine-Borel (teorema di)
In $\mathbb{R}^n$: $K$ compatto $\iff$ $K$ chiuso e limitato. Equivalentemente: ogni ricoprimento aperto di $K$ ammette un sotto-ricoprimento finito. Vedi sezione 54.

### Hessiana (matrice)
Per $f:\mathbb{R}^n\to\mathbb{R}$ di classe $C^2$: $H_{ij}=\partial^2 f/\partial x_i\partial x_j$. Per Schwarz e' simmetrica. Segna la natura dei punti critici (definita positiva $\Rightarrow$ minimo locale). Vedi sezione 55.

### Hilbert (spazio di)
Spazio vettoriale con prodotto scalare, completo rispetto alla norma indotta. Esempio: $L^2$. Cenni in sezione 56.

### Hopital (regola di de l')
Sotto opportune ipotesi (forma $0/0$ o $\infty/\infty$, derivabilita', $g'\neq 0$ vicino, esistenza di $\lim f'/g'$): $\lim f/g=\lim f'/g'$. Va usata con cautela. Vedi sezione 32.

### Holder (disuguaglianza di)
Per $p,q>1$ con $1/p+1/q=1$: $\sum |a_k b_k|\leq\big(\sum|a_k|^p\big)^{1/p}\big(\sum|b_k|^q\big)^{1/q}$. Forma integrale analoga. Caso $p=q=2$: Cauchy-Schwarz. Vedi sezione 54.

---

## I

### Immagine
$f(A)=\{f(x):x\in A\}\subseteq B$. Per $E\subseteq A$: $f(E)$. Per insieme di arrivo si distingue $f(A)\subseteq B$. Vedi sezione 02.

### Incremento
$\Delta f = f(x_0+h)-f(x_0)$; rapporto incrementale $\Delta f/h$, da cui derivata. Vedi sezione 28.

### Induzione (principio di)
Se $P(0)$ vale e $P(n)\Rightarrow P(n+1)$, allora $P(n)$ vale per ogni $n\in\mathbb{N}$. Esistono varianti (forte, dal basso $n_0$, doppia). Vedi sezione 03.

### Infinito (ordine di)
Per $f,g\to+\infty$: $f$ ha ordine maggiore di $g$ se $f/g\to+\infty$. Gerarchia tipica: $\log\ll\text{potenze}\ll\text{esponenziali}\ll n!$. Vedi sezione 15.

### Infinitesimo
$f\to 0$ per $x\to x_0$; ordine di infinitesimo rispetto a $g$ infinitesimo: $f=O(g)$, $o(g)$, $\Theta(g)$. Vedi sezione 15.

### Iniettiva (funzione)
$f$ e' iniettiva se $x_1\neq x_2\Rightarrow f(x_1)\neq f(x_2)$. Per $f$ continua su intervallo: iniettiva $\iff$ strettamente monotona. Vedi sezione 02.

### Insieme aperto / chiuso
Vedi voci "Aperto" e "Chiuso".

### Integrale di Riemann
Per $f$ limitata su $[a,b]$: $\int_a^b f$ esiste sse $\sup s(f,P)=\inf S(f,P)$ (somme di Darboux). Equivalente alla convergenza delle somme di Riemann. Vedi sezione 39.

### Integrale di Lebesgue
Costruzione basata sulla misura: per $f$ misurabile $\geq 0$, $\int f\,d\mu=\sup\{\int s\,d\mu:s\text{ semplice},\ 0\leq s\leq f\}$. Generalizza Riemann e gestisce limiti di funzioni. Vedi sezione 56.

### Integrale improprio
Estensione dell'integrale di Riemann a intervalli illimitati ($\int_a^{+\infty}f$) o a funzioni illimitate ($\int_a^b f$ con $f$ illimitata in $a$ o $b$). Si definisce come limite di integrali su sottointervalli. Vedi sezione 43.

### Integrale indefinito
Insieme di tutte le primitive di $f$: $\int f(x)\,dx=F(x)+c$, $F'=f$. Vedi sezione 39.

### Integrazione per parti
$\int u\,dv = uv-\int v\,du$. Strumento per scaricare la derivata. Vedi sezione 41.

### Integrazione per sostituzione
$\int f(g(x))g'(x)\,dx=\int f(t)\,dt$ con $t=g(x)$. Vale a livello indefinito; per il definito attenzione agli estremi. Vedi sezione 41.

### Interno (punto / parte interna)
$x_0$ e' interno ad $A$ se esiste $\delta>0$ con $(x_0-\delta,x_0+\delta)\subseteq A$. La parte interna $\mathring{A}$ e' il piu' grande aperto contenuto in $A$. Vedi sezione 10.

### Intorno
Insieme che contiene un aperto contenente $x_0$. In $\mathbb{R}$ tipicamente $(x_0-\delta,x_0+\delta)$. In $\mathbb{R}^n$ tipicamente palle euclidee. Vedi sezioni 10 e 54.

### Inversa
Vedi voce "Funzione inversa".

### Inviluppo convesso
Il piu' piccolo insieme convesso che contiene $A$. Utile in ottimizzazione. Vedi sezione 36.

### Irrazionale
Numero reale non in $\mathbb{Q}$. Esempi: $\sqrt 2$, $e$, $\pi$. Gli irrazionali sono densi e piu' numerosi dei razionali. Vedi sezioni 06 e 08.

---

## J

### Jensen (disuguaglianza di)
Se $\varphi$ e' convessa e $X$ e' variabile aleatoria / media discreta o continua: $\varphi(E[X])\leq E[\varphi(X)]$. Forma elementare: $\varphi\big(\frac{1}{n}\sum x_i\big)\leq\frac{1}{n}\sum\varphi(x_i)$. Vedi sezione 36.

---

## L

### Lagrange (teorema di / del valor medio)
Se $f$ e' continua su $[a,b]$ e derivabile su $(a,b)$, esiste $c\in(a,b)$ con $f(b)-f(a)=f'(c)(b-a)$. Consente di trasferire informazioni da $f'$ a $f$. Vedi sezione 31.

### Landau (o piccolo)
$f=o(g)$ per $x\to x_0$ se $\lim_{x\to x_0} f(x)/g(x)=0$. Significa "$f$ trascurabile rispetto a $g$". Vedi sezione 15.

### Landau (O grande)
$f=O(g)$ se esistono $C,\delta>0$ con $|f(x)|\leq C|g(x)|$ vicino a $x_0$. Vedi sezione 15.

### Lebesgue (misura di)
Misura $\lambda$ su $\mathbb{R}^n$ che estende la nozione di lunghezza/area/volume agli insiemi misurabili. $\lambda$-misura di un intervallo $[a,b]$ e' $b-a$. Cenni in sezione 56.

### Lebesgue (integrale di)
Vedi voce "Integrale di Lebesgue".

### Lebesgue (criterio di Riemann-integrabilita')
$f$ limitata su $[a,b]$ e' Riemann-integrabile sse l'insieme dei suoi punti di discontinuita' ha misura di Lebesgue nulla. Vedi sezione 56.

### Leibniz (criterio di)
Per serie a segni alterni $\sum (-1)^n a_n$ con $a_n\geq 0$ decrescente a $0$: la serie converge e $|R_N|\leq a_{N+1}$. Vedi sezione 47.

### Leibniz (formula di)
Derivata $n$-esima del prodotto: $(fg)^{(n)}=\sum_{k=0}^{n}\binom{n}{k}f^{(k)}g^{(n-k)}$. Vedi sezione 29.

### Limite (di successione)
$a_n\to L$ se $\forall\,\varepsilon>0\ \exists\,N$ con $|a_n-L|<\varepsilon\ \forall n\geq N$. Per $L=\pm\infty$ definizione con $M$. Vedi sezione 11.

### Limite (di funzione)
$\lim_{x\to x_0} f(x)=L$ se $\forall\,\varepsilon>0\ \exists\,\delta>0$ con $0<|x-x_0|<\delta\Rightarrow |f(x)-L|<\varepsilon$. Versioni con $x_0,L=\pm\infty$. Vedi sezione 20.

### Limite destro / sinistro
$\lim_{x\to x_0^+} f(x)$: si considerano solo $x>x_0$; analogamente $x_0^-$. $\lim_{x\to x_0} f=L$ sse i due limiti laterali esistono e valgono $L$. Vedi sezione 20.

### Limite notevole
Limite "base" da memorizzare. Esempi: $\lim_{x\to 0}\frac{\sin x}{x}=1$, $\lim_{x\to 0}\frac{1-\cos x}{x^2}=\frac{1}{2}$, $\lim_{x\to 0}\frac{e^x-1}{x}=1$, $\lim_{x\to 0}\frac{\log(1+x)}{x}=1$. Vedi sezioni 15 e 22.

### Limite superiore / inferiore
$\limsup a_n=\lim_{n}\sup_{k\geq n} a_k$; $\liminf a_n=\lim_n\inf_{k\geq n} a_k$. Esistono sempre in $\overline{\mathbb{R}}$; $\{a_n\}$ converge sse $\liminf=\limsup$ in $\mathbb{R}$. Vedi sezione 16.

### Limitato
$A\subseteq\mathbb{R}$ limitato $\iff$ $\exists\,M>0$ con $|x|\leq M\ \forall x\in A$. In $\mathbb{R}^n$ idem con norma euclidea. Vedi sezioni 07 e 54.

### Lipschitziana (funzione)
$f$ e' Lipschitziana su $A$ se $\exists\,L\geq 0$ con $|f(x)-f(y)|\leq L|x-y|\ \forall x,y\in A$. Implica uniforme continuita'. Vedi sezione 26.

### Logaritmo
Inversa dell'esponenziale: $\log:(0,+\infty)\to\mathbb{R}$, $\log e=1$, $\log 1=0$, $(\log x)'=1/x$, $\log(xy)=\log x+\log y$. Vedi sezione 18.

---

## M

### Maggiorante
$M$ e' maggiorante di $A$ se $a\leq M\ \forall a\in A$. $A$ superiormente limitato $\iff$ esiste un maggiorante. Vedi sezione 07.

### Massimo / Minimo (assoluti)
$M\in A$ e' massimo di $A$ se $a\leq M\ \forall a\in A$; analogo per minimo. Se esiste, $M=\sup A$. Vedi sezione 07.

### Massimo / Minimo (locali)
$x_0$ e' massimo locale di $f$ se esiste $\delta>0$ con $f(x)\leq f(x_0)\ \forall x\in (x_0-\delta,x_0+\delta)\cap A$. Vedi sezione 35.

### Misura nulla
$E\subseteq\mathbb{R}$ ha misura nulla se per ogni $\varepsilon>0$ esiste un ricoprimento di intervalli aperti $\{I_k\}$ con $\sum|I_k|<\varepsilon$. Tutti gli insiemi numerabili (es. $\mathbb{Q}$) hanno misura nulla. Vedi sezione 56.

### Modulo (di un reale)
$|x|=x$ se $x\geq 0$, $-x$ altrimenti. Disuguaglianza triangolare: $|x+y|\leq|x|+|y|$. Vedi sezione 06.

### Modulo (di un complesso)
$|z|=\sqrt{x^2+y^2}$ per $z=x+iy$. Soddisfa $|zw|=|z||w|$ e disuguaglianza triangolare. Vedi sezione 09.

### Monotona (funzione/successione)
Funzione/successione che e' crescente oppure decrescente (anche solo debole). Le successioni monotone e limitate convergono (teorema fondamentale). Vedi sezioni 11 e 35.

---

## N

### Newton-Leibniz (formula)
Se $f$ e' continua su $[a,b]$ e $F$ e' una primitiva: $\int_a^b f(x)\,dx=F(b)-F(a)$. Conseguenza del TFC. Vedi sezione 40.

### Norma
Funzione $\|\cdot\|:V\to\mathbb{R}$ con $\|x\|\geq 0$, $\|x\|=0\iff x=0$, $\|\alpha x\|=|\alpha|\|x\|$, $\|x+y\|\leq\|x\|+\|y\|$. In $\mathbb{R}^n$: norma euclidea $\sqrt{\sum x_i^2}$. Vedi sezione 54.

### Numerabile
Insieme in biiezione con $\mathbb{N}$. Esempi: $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{N}\times\mathbb{N}$. $\mathbb{R}$ non e' numerabile (Cantor). Vedi sezione 05.

### Numero complesso
$z=a+ib$ con $a,b\in\mathbb{R}$ e $i^2=-1$. $\mathbb{C}$ e' algebricamente chiuso (teorema fondamentale dell'algebra). Vedi sezione 09.

---

## O

### Ordine di infinito
Vedi voce "Infinito (ordine di)".

### Ordine di infinitesimo
$f=o(g)$ con entrambi infinitesimi: $f$ va a zero piu' velocemente di $g$. Vedi sezione 15.

### Ordine di derivabilita'
$f\in C^k(A)$ se $f$ e' $k$ volte derivabile e $f^{(k)}$ e' continua. $C^\infty$: infinitamente derivabile. $C^\omega$: analitica. Vedi sezioni 29 e 33.

---

## P

### Parita'
$f$ e' pari se $f(-x)=f(x)$, dispari se $f(-x)=-f(x)$. Esempi: $\cos$ pari, $\sin$ dispari. Vedi sezione 17.

### Partizione (di un intervallo)
Insieme ordinato $a=x_0<x_1<\cdots<x_n=b$. Usata per definire somme di Riemann/Darboux. Norma $|P|=\max\Delta x_i$. Vedi sezione 39.

### Peano (teorema di esistenza)
Per $y'=f(x,y)$, $y(x_0)=y_0$ con $f$ solo continua in un intorno: esistenza locale (non unicita'). Vedi sezione 53.

### Picard-Lindelof (teorema di esistenza e unicita')
Se $f$ e' continua e Lipschitziana in $y$ uniformemente in $x$ vicino a $(x_0,y_0)$, il problema di Cauchy ha unica soluzione locale. Vedi sezione 53.

### Piano tangente
Per $f:\mathbb{R}^2\to\mathbb{R}$ differenziabile in $(x_0,y_0)$: piano di equazione $z=f(x_0,y_0)+\nabla f(x_0,y_0)\cdot(x-x_0,y-y_0)$. Vedi sezione 55.

### Polinomio caratteristico
Associato a EDO lineare a coefficienti costanti $y^{(n)}+a_{n-1}y^{(n-1)}+\cdots+a_0 y=0$: $\lambda^n+a_{n-1}\lambda^{n-1}+\cdots+a_0=0$. Le sue radici danno le soluzioni di base. Vedi sezione 52.

### Polinomio di Taylor
$T_n(x;x_0)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k$. Migliore approssimazione polinomiale di ordine $n$. Vedi sezione 33.

### Potenza
$x^\alpha=e^{\alpha\log x}$ per $x>0$, $\alpha\in\mathbb{R}$. Definita anche per $x=0$ (con $\alpha>0$). Per $x<0$ solo $\alpha\in\mathbb{Z}$ (o radici dispari). Vedi sezione 17.

### Primitiva
$F$ e' primitiva di $f$ su $I$ se $F'=f$ su $I$. Due primitive differiscono per una costante. Vedi sezione 40.

### Prodotto scalare
$\langle x,y\rangle=\sum x_i y_i$ in $\mathbb{R}^n$. Bilineare, simmetrico, definito positivo. Induce la norma euclidea. Vedi sezione 54.

---

## Q

### Quoziente di differenze
$\frac{f(x_0+h)-f(x_0)}{h}$. Il suo limite per $h\to 0$ definisce la derivata. Vedi sezione 28.

---

## R

### Raggio di convergenza
Per serie di potenze $\sum a_n(x-x_0)^n$: $R=\frac{1}{\limsup\sqrt[n]{|a_n|}}$ (Cauchy-Hadamard). La serie converge per $|x-x_0|<R$ e diverge per $|x-x_0|>R$; al bordo: caso per caso. Vedi sezione 48.

### Rapporto incrementale
Vedi voce "Quoziente di differenze".

### Razionale
Numero esprimibile come $p/q$ con $p\in\mathbb{Z}$, $q\in\mathbb{N}\setminus\{0\}$. $\mathbb{Q}$ e' numerabile, denso in $\mathbb{R}$, non completo. Vedi sezione 04.

### Resto (di Taylor)
$R_n(x)=f(x)-T_n(x;x_0)$. Forme: Peano $R_n=o((x-x_0)^n)$; Lagrange $R_n=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$; integrale. Vedi sezione 33.

### Resto di Lagrange
$R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$ per qualche $\xi$ tra $x_0$ e $x$. Utile per stimare l'errore. Vedi sezione 33.

### Resto di Peano
$R_n(x)=o((x-x_0)^n)$ per $x\to x_0$. Forma locale, qualitativa. Vedi sezione 33.

### Riemann (somme di)
Per partizione $P$ e scelte $\xi_i\in[x_{i-1},x_i]$: $S(f,P,\xi)=\sum f(\xi_i)\Delta x_i$. $\int_a^b f$ esiste sse il limite di queste somme per $|P|\to 0$ esiste indipendentemente dalle scelte. Vedi sezione 39.

### Riemann (teorema di riordinamento)
Una serie convergente ma non assolutamente convergente puo' essere riordinata in modo da convergere a qualsiasi reale o divergere. Vedi sezione 47.

### Rolle (teorema di)
Se $f$ e' continua su $[a,b]$, derivabile su $(a,b)$ e $f(a)=f(b)$, allora esiste $c\in(a,b)$ con $f'(c)=0$. Caso particolare di Lagrange. Vedi sezione 31.

---

## S

### Schwarz (teorema di)
Se $f:\mathbb{R}^n\to\mathbb{R}$ e' di classe $C^2$, le derivate parziali miste coincidono: $\partial^2 f/\partial x_i\partial x_j=\partial^2 f/\partial x_j\partial x_i$. L'hessiana e' simmetrica. Vedi sezione 55.

### Seno
Funzione $\sin:\mathbb{R}\to[-1,1]$, periodica di periodo $2\pi$, dispari, $\sin 0=0$. Vedi sezione 19.

### Seno iperbolico
$\sinh x=\frac{e^x-e^{-x}}{2}$. Dispari, $\sinh 0=0$, derivata $\cosh x$. Vedi sezione 19.

### Serie
Per successione $\{a_n\}$: $\sum_{n\geq 0} a_n$ e' il limite (se esiste) della successione delle somme parziali $S_N=\sum_{n=0}^{N} a_n$. Vedi sezione 45.

### Serie armonica
Vedi voce "Armonica (serie)".

### Serie geometrica
Vedi voce "Geometrica (serie)".

### Serie di potenze
$\sum a_n (x-x_0)^n$. Convergenza in un disco di raggio $R$; la funzione somma e' $C^\infty$ nel disco aperto e analitica. Vedi sezione 48.

### Serie di Taylor
Serie di potenze $\sum_{n\geq 0}\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n$. Convergenza alla funzione richiede analiticita' (non basta $C^\infty$). Esempio classico controesempio: $f(x)=e^{-1/x^2}$. Vedi sezione 49.

### Sottosuccessione
Successione $\{a_{n_k}\}$ con $\{n_k\}$ strettamente crescente in $\mathbb{N}$. Se $\{a_n\}$ converge a $L$, ogni sua sottosuccessione converge a $L$. Vedi sezione 13.

### Successione
Funzione $\mathbb{N}\to\mathbb{R}$ (o $\mathbb{C}$). Notazione $\{a_n\}_{n\in\mathbb{N}}$. Vedi sezione 11.

### Sup / Inf
Vedi voci "Estremo superiore" e "Estremo inferiore".

### Suriettiva (funzione)
$f:A\to B$ suriettiva se $f(A)=B$. Per $f$ continua su intervallo: l'immagine e' un intervallo (valori intermedi). Vedi sezione 02.

---

## T

### Tangente (retta)
Per $f$ derivabile in $x_0$: retta $y=f(x_0)+f'(x_0)(x-x_0)$. Migliore approssimazione lineare locale: $f(x)=$ retta tangente $+ o(x-x_0)$. Vedi sezione 28.

### Taylor (teorema di / polinomio di)
Se $f\in C^n$ in un intorno di $x_0$: $f(x)=T_n(x;x_0)+R_n(x)$, con $T_n$ il polinomio di Taylor di grado $n$. Vedi voce "Polinomio di Taylor" e sezione 33.

### Tecniche di integrazione
Sostituzione, integrazione per parti, decomposizione in fratti semplici (per razionali), sostituzioni trigonometriche/iperboliche. Vedi sezioni 41 e 42.

### Teorema fondamentale del calcolo (TFC)
Parte I: se $f$ continua su $[a,b]$ e $F(x)=\int_a^x f$, allora $F\in C^1$ e $F'=f$. Parte II (formula di Newton-Leibniz): $\int_a^b f=F(b)-F(a)$ per qualunque primitiva $F$. Vedi sezione 40.

### Topologia
Struttura che definisce gli aperti di uno spazio. In $\mathbb{R}$ (e $\mathbb{R}^n$): topologia metrica indotta dalla distanza euclidea. Vedi sezioni 10 e 54.

### Triangolare (disuguaglianza)
$|x+y|\leq |x|+|y|$ in $\mathbb{R}$, $\mathbb{C}$, $\mathbb{R}^n$ (norma). Conseguenza: $\big| |x|-|y| \big|\leq |x-y|$. Vedi sezioni 06 e 54.

### Trigonometriche (funzioni)
$\sin$, $\cos$, $\tan$, $\cot$, $\sec$, $\csc$. Identita' fondamentali: $\sin^2 x+\cos^2 x=1$, formule di addizione, duplicazione, prostaferesi. Vedi sezione 19.

---

## U

### Uniforme continuita'
$f$ e' uniformemente continua su $A$ se $\forall\,\varepsilon>0\,\exists\,\delta>0:\ |x-y|<\delta\Rightarrow |f(x)-f(y)|<\varepsilon\ \forall x,y\in A$ ($\delta$ non dipende dai punti). Su compatto, continua $\Rightarrow$ uniformemente continua (Heine-Cantor). Vedi sezione 26.

### Uniforme convergenza
Vedi voce "Convergenza uniforme".

---

## V

### Valore assoluto
Vedi voce "Modulo (di un reale)".

### Valori intermedi (teorema dei)
Se $f:[a,b]\to\mathbb{R}$ e' continua e $y$ e' compreso tra $f(a)$ e $f(b)$, esiste $c\in[a,b]$ con $f(c)=y$. Conseguenza: l'immagine di un intervallo via continua e' un intervallo. Vedi sezione 25.

### Variabile separabili (EDO a)
EDO del tipo $y'=g(x)h(y)$. Si risolve riscrivendo $dy/h(y)=g(x)\,dx$ e integrando. Vedi sezione 51.

---

## W

### Weierstrass (teorema di / dei valori estremi)
Se $f:[a,b]\to\mathbb{R}$ e' continua, allora $f$ ammette massimo e minimo su $[a,b]$. Generalizzazione: $f$ continua su compatto $\Rightarrow$ assume max e min. Vedi sezione 25.

### Weierstrass (criterio M-test)
Per serie di funzioni $\sum f_n$ su $A$: se esiste $\sum M_n<+\infty$ con $|f_n(x)|\leq M_n\ \forall x\in A$, allora $\sum f_n$ converge totalmente (in particolare uniformemente e assolutamente). Vedi sezione 48.

### Wronskiano
Per $y_1,\dots,y_n$ soluzioni di EDO lineare omogenea di ordine $n$: $W(x)=\det\big(y_j^{(i-1)}(x)\big)$. $W\neq 0$ in un punto $\iff$ le soluzioni sono linearmente indipendenti. Vedi sezione 52.

---

## Z

### Zero (di una funzione)
$x_0$ tale che $f(x_0)=0$. Per polinomi: radice. Esistenza in intervalli garantita dal teorema di Bolzano (se cambia segno). Vedi sezione 25.

---

## Come usare questo glossario

1. **In avanti** (lezione $\to$ definizioni): se durante lo studio incontri un termine non chiaro, cerca qui la definizione minima e poi torna alla sezione di riferimento per l'approfondimento.
2. **Indietro** (ripasso): scorri una lettera per volta e prova a riformulare la definizione coperta con la mano, scoprendo le voci ancora poco fissate.
3. **In trasversale**: molte voci rimandano a piu' sezioni; segui questi link per costruire la mappa concettuale (es. "completezza" lega 06, 14, 56).

Quando una voce contiene una formula, verifica di saperla scrivere senza guardare. Quando rimanda a un teorema, verifica di sapere le ipotesi minime: nell'esame e' la differenza tra rispondere bene e impantanarsi.
