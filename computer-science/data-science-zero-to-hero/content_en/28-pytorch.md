---
title: "PyTorch: from toy model to training loop"
area: "Deep Learning"
summary: "Tensor, autograd, nn.Module, DataLoader, training loop, mixed precision, GPU. The framework that dominates research and production today."
order: 28
level: "advanced"
prereq:
  - "[[neural-networks]]"
tools:
  - "torch 2.x"
---

# PyTorch: from toy model to training loop

## Why PyTorch

In 2026, PyTorch is the dominant framework for research (NeurIPS, ICML) and production (Meta, Tesla, OpenAI all use PyTorch). Pythonic syntax, dynamic autograd, rich ecosystem (Lightning, HuggingFace, torchvision).

TensorFlow still exists but is declining. JAX is growing in labs but remains niche.

```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
# (CUDA version, check pytorch.org for your system)
```

## Tensor: NumPy with superpowers

```python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
x.dtype          # torch.float32
x.shape          # torch.Size([3])
x.device         # cpu

# from numpy, and back
import numpy as np
a = np.array([[1,2],[3,4]])
t = torch.from_numpy(a)
t.numpy()

# operations like numpy
x + x; x * x; x @ x
torch.exp(x); torch.log(x); torch.sigmoid(x)
```

### GPU

```python
device = 'cuda' if torch.cuda.is_available() else 'cpu'
x = x.to(device)
# or
x = torch.randn(1000, 1000, device='cuda')
```

> On Mac M1+ use `device='mps'` (Apple GPU acceleration).

## Autograd: automatic differentiation

Every tensor has a `requires_grad` flag. If True, PyTorch builds a **computational graph** that allows gradients to be computed via the chain rule:

```python
x = torch.tensor(2.0, requires_grad=True)
y = x**3 + 2*x
y.backward()
print(x.grad)        # dy/dx at x=2: 3*4 + 2 = 14
```

For vector gradients:

```python
x = torch.randn(5, requires_grad=True)
y = (x**2).sum()
y.backward()
print(x.grad)        # 2x
```

## nn.Module: the building block

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
print(sum(p.numel() for p in model.parameters()))   # # parameters
```

> Convention: `forward()` returns **logits** (linear output), not probabilities. `CrossEntropyLoss` applies softmax internally.

## Dataset and DataLoader

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

For standard data, `torchvision.datasets` already provides ready-made ones (MNIST, CIFAR, ImageNet).

## Complete training loop

```python
import torch, torch.nn as nn
from torch.optim import AdamW
from torch.utils.data import DataLoader

device = 'cuda' if torch.cuda.is_available() else 'cpu'

model = MLP().to(device)
opt = AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)
loss_fn = nn.CrossEntropyLoss()

# scheduler (optional but useful)
from torch.optim.lr_scheduler import CosineAnnealingLR
scheduler = CosineAnnealingLR(opt, T_max=10)

for epoch in range(10):
    model.train()
    for xb, yb in train_loader:
        xb, yb = xb.to(device), yb.to(device)
        opt.zero_grad()                  # reset gradients
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

IMPORTANT things:

- **`opt.zero_grad()` BEFORE backward**. Otherwise gradients accumulate.
- **`model.train()`** enables dropout and batchnorm in train mode; **`model.eval()`** disables them.
- **`torch.no_grad()`** during validation: no graph, less memory.

## Mixed precision (FP16)

For large models, FP16 halves memory and speeds up on modern GPUs:

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

## Saving and loading

```python
# save
torch.save(model.state_dict(), 'model.pt')

# load
model = MLP()                            # recreate architecture
model.load_state_dict(torch.load('model.pt'))
model.eval()
```

> Save `state_dict()`, not the whole model. More portable.

## PyTorch Lightning: the template

For serious projects, **PyTorch Lightning** removes the boilerplate:

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

Handles automatically: GPU, distributed training, checkpointing, logging, mixed precision.

## Debugging: useful tricks

### Print shape

```python
class Debug(nn.Module):
    def __init__(self, name=""): super().__init__(); self.name = name
    def forward(self, x):
        print(f"{self.name}: {tuple(x.shape)}")
        return x

# insert between layers to see where shape changes
```

### Print gradients

```python
for name, p in model.named_parameters():
    if p.grad is not None:
        print(f"{name}: ||grad|| = {p.grad.norm():.4f}")
```

If you see huge norms → exploding, clip them (`torch.nn.utils.clip_grad_norm_`). If you see zero norms → vanishing, change activation or init.

### Overfit a single batch

An essential practice to validate the training loop:

```python
# grab a single batch
x, y = next(iter(train_loader))
model = MLP()
opt = AdamW(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()
for _ in range(200):
    opt.zero_grad()
    loss = loss_fn(model(x), y)
    loss.backward()
    opt.step()
print(loss.item())   # should drop to ~ 0
```

If you can't overfit a single batch, there's a bug. Common causes: y is not long, x is not float, gradient is not flowing.

## Exercises

<details>
<summary>Exercise 1 — MNIST in 30 lines</summary>

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

Test accuracy ~97% in 5 epochs. 30 lines.
</details>

<details>
<summary>Exercise 2 — Implement MSE from scratch using autograd</summary>

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
<summary>Exercise 3 — Model that refuses to overfit</summary>

Take a single batch of 8 MNIST images. Train an MLP for 500 steps. The loss MUST drop close to zero. If it doesn't: there's a bug. Common causes: `requires_grad=False`, wrong learning rate, log/softmax conflict.
</details>

<details>
<summary>Exercise 4 — Save + resume training</summary>

Train for 3 epochs, save, reload, continue for 3 more. Verify the loss continuity.

```python
ckpt = {
    'model': model.state_dict(),
    'opt': opt.state_dict(),
    'epoch': epoch,
}
torch.save(ckpt, 'ckpt.pt')

# then
ckpt = torch.load('ckpt.pt')
model.load_state_dict(ckpt['model'])
opt.load_state_dict(ckpt['opt'])
```
</details>

## Key takeaways

- Tensor = NumPy + autograd + GPU.
- `nn.Module` for the model, `forward()` returns logits.
- Training loop: zero_grad → forward → loss → backward → step.
- `model.train()` / `model.eval()` are crucial (dropout, batchnorm).
- Overfit a single batch as a smoke test.
- Lightning for serious projects, reduces boilerplate.

Next: CNN for computer vision.
