---
cssclasses:
  - painel
---

> Tudo aqui se atualiza sozinho a partir das notas da pasta `Livros`. Pra um livro mudar de lugar,
> mude o campo `situacao` dele: `indicado` → `na fila` → `lendo` → `concluido` (ou `pausado`).

## 📊 Resumo
```dataviewjs
await dv.view("Painel de controle/Scripts/painel-leitura", { secao: "resumo" })
```

## 📖 Lendo agora
```dataviewjs
await dv.view("Painel de controle/Scripts/painel-leitura", { secao: "lendo" })
```

## 📚 Estante
```dataviewjs
await dv.view("Painel de controle/Scripts/painel-leitura", { secao: "estante" })
```

## 🗓 Cronograma
```dataviewjs
await dv.view("Painel de controle/Scripts/painel-leitura", { secao: "cronograma" })
```

## 🔥 Indicados
```dataviewjs
await dv.view("Painel de controle/Scripts/painel-leitura", { secao: "indicados" })
```

## 🧭 Explorar
```dataviewjs
await dv.view("Painel de controle/Scripts/painel-leitura", { secao: "explorar" })
```
