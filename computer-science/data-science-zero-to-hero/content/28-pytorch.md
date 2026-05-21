---
title: "PyTorch: dal toy model al training loop"
area: "Deep Learning"
summary: "Tensor, autograd, nn.Module, DataLoader, training loop, mixed precision, GPU. Il framework che oggi domina la ricerca e produzione."
order: 28
level: "avanzato"
prereq:
  - "[[reti-neurali]]"
tools:
  - "torch 2.x"
---

# PyTorch: dal toy model al training loop

## Perché PyTorch

Nel 2026, PyTorch è il framework dominante per ricerca (NeurIPS, ICML) e produzione (Meta, Tesla, OpenAI usano PyTorch). Sintassi Pythonica, autograd dinamico, ecosistema (Lightning, HuggingFace, torchvision).

TensorFlow esiste ancora ma è in fase calante. JAX cresce nei laboratori ma è di nicchia.

```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
# (versione CUDA, controlla pytorch.org per il tuo sistema)
```

## Tensor: NumPy con superpoteri

```python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
x.dtype          # torch.float32
x.shape          # torch.Size([3])
x.device         # cpu

# da numpy, e ritorno
import numpy as np
a = np.array([[1,2],[3,4]])
t = torch.from_numpy(a)
t.numpy()

# operazioni come numpy
x + x; x * x; x @ x
torch.exp(x); torch.log(x); torch.sigmoid(x)
```

### GPU

```python
device = 'cuda' if torch.cuda.is_available() else 'cpu'
x = x.to(device)
# o
x = torch.randn(1000, 1000, device='cuda')
```

> Su Mac M1+ usa `device='mps'` (Apple GPU acceleration).

## Autograd: differenziazione automatica

Ogni tensor ha un flag `requires_grad`. Se True, PyTorch costruisce un **grafo computazionale** che permette di calcolare i gradienti via chain rule:

```python
x = torch.tensor(2.0, requires_grad=True)
y = x**3 + 2*x
y.backward()
print(x.grad)        # dy/dx in x=2: 3*4 + 2 = 14
```

Per gradiente vettoriale:

```python
x = torch.randn(5, requires_grad=True)
y = (x**2).sum()
y.backward()
print(x.grad)        # 2x
```

## nn.Module: il building block

```python
import torch.nn as nn
import torch.nn.functional as F

class MLP(nn.Module):
    def __init__(self, in_dim=784, hidden=128, n_classes=10):
        super().__init__()
        self.fc1 = nn.Linear(in_dim, hidden)
        self.fc2 = nn.Linear(hidden, hidden)
        self.fc3 = nn.Linear(hidden, n_classes)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = F.relu(self.fc2(x))
        return self.fc3(x)               # logits, NO softmax

model = MLP()
print(model)
print(sum(p.numel() for p in model.parameters()))   # # parametri
```

> Convenzione: `forward()` ritorna **logit** (output lineare), non probabilità. `CrossEntropyLoss` applica softmax internamente.

## Dataset e DataLoader

```python
from torch.utils.data import Dataset, DataLoader

class MyDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.as_tensor(X, dtype=torch.float32)
        self.y = torch.as_tensor(y, dtype=torch.long)
    def __len__(self):
        return len(self.X)
    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

ds = MyDataset(X, y)
loader = DataLoader(ds, batch_size=64, shuffle=True, num_workers=4, pin_memory=True)
```

Per dati standard, `torchvision.datasets` ne offre già di pronti (MNIST, CIFAR, ImageNet).

## Training loop completo

```python
import torch, torch.nn as nn
from torch.optim import AdamW
from torch.utils.data import DataLoader

device = 'cuda' if torch.cuda.is_available() else 'cpu'

model = MLP().to(device)
opt = AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)
loss_fn = nn.CrossEntropyLoss()

# scheduler (opzionale ma utile)
from torch.optim.lr_scheduler import CosineAnnealingLR
scheduler = CosineAnnealingLR(opt, T_max=10)

for epoch in range(10):
    model.train()
    for xb, yb in train_loader:
        xb, yb = xb.to(device), yb.to(device)
        opt.zero_grad()                  # reset gradienti
        logits = model(xb)               # forward
        loss = loss_fn(logits, yb)
        loss.backward()                  # backprop
        opt.step()                       # update
    scheduler.step()

    # validation
    model.eval()
    correct = total = 0
    with torch.no_grad():
        for xb, yb in val_loader:
            xb, yb = xb.to(device), yb.to(device)
            pred = model(xb).argmax(dim=1)
            correct += (pred == yb).sum().item()
            total += yb.size(0)
    print(f"epoch {epoch+1}: val acc = {correct/total:.3f}")
```

Cose IMPORTANTI:

- **`opt.zero_grad()` PRIMA del backward**. Altrimenti i gradienti si accumulano.
- **`model.train()`** abilita dropout e batchnorm in modalità train; **`model.eval()`** li disabilita.
- **`torch.no_grad()`** nel validation: niente grafo, meno memoria.

## Mixed precision (FP16)

Per modelli grandi, FP16 riduce memoria 2× e accelera su GPU recenti:

```python
from torch.cuda.amp import autocast, GradScaler
scaler = GradScaler()

for xb, yb in loader:
    xb, yb = xb.to(device), yb.to(device)
    opt.zero_grad()
    with autocast():
        logits = model(xb)
        loss = loss_fn(logits, yb)
    scaler.scale(loss).backward()
    scaler.step(opt)
    scaler.update()
```

## Salvare e caricare

```python
# salva
torch.save(model.state_dict(), 'model.pt')

# carica
model = MLP()                            # ricrea architettura
model.load_state_dict(torch.load('model.pt'))
model.eval()
```

> Salva `state_dict()`, non il modello intero. Più portabile.

## PyTorch Lightning: il template

Per progetti seri, **PyTorch Lightning** rimuove il boilerplate:

```python
import pytorch_lightning as L

class LitModel(L.LightningModule):
    def __init__(self):
        super().__init__()
        self.model = MLP()
        self.loss = nn.CrossEntropyLoss()

    def training_step(self, batch, idx):
        x, y = batch
        out = self.model(x)
        loss = self.loss(out, y)
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, idx):
        x, y = batch
        out = self.model(x)
        loss = self.loss(out, y)
        acc = (out.argmax(1) == y).float().mean()
        self.log_dict({'val_loss': loss, 'val_acc': acc}, prog_bar=True)

    def configure_optimizers(self):
        return torch.optim.AdamW(self.parameters(), lr=1e-3)

trainer = L.Trainer(max_epochs=10, accelerator='auto')
trainer.fit(LitModel(), train_loader, val_loader)
```

Gestisce automaticamente: GPU, distributed training, checkpoint, logging, mixed precision.

## Debug: tricks utili

### Stampa shape

```python
class Debug(nn.Module):
    def __init__(self, name=""): super().__init__(); self.name = name
    def forward(self, x):
        print(f"{self.name}: {tuple(x.shape)}")
        return x

# insert tra i layer per vedere dove cambia
```

### Stampa gradienti

```python
for name, p in model.named_parameters():
    if p.grad is not None:
        print(f"{name}: ||grad|| = {p.grad.norm():.4f}")
```

Se vedi norme enormi → exploding, ridimensiona (`torch.nn.utils.clip_grad_norm_`). Se vedi norme zero → vanishing, cambia attivazione o init.

### Overfit un singolo batch

Pratica sacrosanta per validare il training loop:

```python
# pesca un singolo batch
x, y = next(iter(train_loader))
model = MLP()
opt = AdamW(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()
for _ in range(200):
    opt.zero_grad()
    loss = loss_fn(model(x), y)
    loss.backward()
    opt.step()
print(loss.item())   # deve scendere ~ 0
```

Se non riesci a overfittare un singolo batch, c'è un bug. Tipico: y non è long, x non è float, gradient non scorre.

## Esercizi

<details>
<summary>Esercizio 1 — MNIST in 30 righe</summary>

```python
import torch, torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

device = 'cuda' if torch.cuda.is_available() else 'cpu'

tr = datasets.MNIST('.', train=True, download=True,
                    transform=transforms.ToTensor())
te = datasets.MNIST('.', train=False, transform=transforms.ToTensor())
trl = DataLoader(tr, batch_size=128, shuffle=True)
tel = DataLoader(te, batch_size=512)

model = nn.Sequential(
    nn.Flatten(), nn.Linear(28*28, 128), nn.ReLU(),
    nn.Dropout(0.2), nn.Linear(128, 10)
).to(device)
opt = torch.optim.AdamW(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

for e in range(5):
    model.train()
    for x, y in trl:
        x, y = x.to(device), y.to(device)
        opt.zero_grad()
        loss = loss_fn(model(x), y); loss.backward(); opt.step()
    model.eval()
    with torch.no_grad():
        c = sum((model(x.to(device)).argmax(1) == y.to(device)).sum().item()
                for x, y in tel)
    print(f"epoch {e+1}: test acc {c/len(te):.3f}")
```

Test accuracy ~97% in 5 epoche. 30 righe.
</details>

<details>
<summary>Esercizio 2 — Implementa MSE da zero usando autograd</summary>

```python
import torch
x = torch.randn(100, 3)
true_w = torch.tensor([1.5, -2.0, 0.5])
y = x @ true_w + torch.randn(100)*0.1

w = torch.zeros(3, requires_grad=True)
lr = 0.05
for _ in range(200):
    pred = x @ w
    loss = ((pred - y)**2).mean()
    loss.backward()
    with torch.no_grad():
        w -= lr * w.grad
        w.grad.zero_()
print(w)   # ~ [1.5, -2.0, 0.5]
```
</details>

<details>
<summary>Esercizio 3 — Modello che si rifiuta di overfit</summary>

Prendi un singolo batch di 8 immagini MNIST. Allena un MLP per 500 step. La loss DEVE scendere vicino a zero. Se non scende: c'è un bug. Spesso: `requires_grad=False`, learning rate sbagliato, log/softmax conflict.
</details>

<details>
<summary>Esercizio 4 — Salvataggio + ripresa training</summary>

Allena per 3 epoche, salva, ricarica, continua per altre 3. Verifica continuità della loss.

```python
ckpt = {
    'model': model.state_dict(),
    'opt': opt.state_dict(),
    'epoch': epoch,
}
torch.save(ckpt, 'ckpt.pt')

# poi
ckpt = torch.load('ckpt.pt')
model.load_state_dict(ckpt['model'])
opt.load_state_dict(ckpt['opt'])
```
</details>

## Cosa portarti via

- Tensor = NumPy + autograd + GPU.
- `nn.Module` per il modello, `forward()` ritorna logit.
- Training loop: zero_grad → forward → loss → backward → step.
- `model.train()` / `model.eval()` cruciali (dropout, batchnorm).
- Overfit un singolo batch come smoke test.
- Lightning per progetti seri, riduce il boilerplate.

Prossimo: CNN per computer vision.
