---
cssclasses:
  - painel
---

> Tudo aqui se atualiza sozinho a partir das notas da pasta `Livros`. Pra um livro mudar de
> lugar no painel, mude o campo `situacao` dele.

## 📊 Resumo das leituras
```dataviewjs
const livros = dv.pages('"Livros"').where(p => p.tipo === "livro");
const sit = p => String(p.situacao ?? "").toLowerCase();
const ano = dv.luxon.DateTime.now().year;
const lidos = livros.where(p => ["concluido", "concluído"].includes(sit(p)));
const lidosAno = lidos.where(p => p.data_fim && dv.date(p.data_fim).year === ano);
const dias = lidos.array()
  .filter(p => p.data_fim && p.data_inicio)
  .map(p => Math.round((dv.date(p.data_fim).toMillis() - dv.date(p.data_inicio).toMillis()) / 86400000))
  .filter(d => d >= 0);
const media = dias.length ? Math.round(dias.reduce((a, b) => a + b, 0) / dias.length) : "-";
const tiles = [
  [lidosAno.length, `livros lidos em ${ano}`],
  [media, "dias em média por livro"],
  [livros.where(p => sit(p) === "lendo").length, "lendo agora"],
  [livros.where(p => sit(p) === "indicado").length, "esperando na fila"],
];
const wrap = dv.container.createDiv({ cls: "la-stats" });
for (const [n, l] of tiles) {
  const t = wrap.createDiv({ cls: "la-stat" });
  t.createDiv({ cls: "la-stat-n", text: String(n) });
  t.createDiv({ cls: "la-stat-l", text: l });
}
```

## 📖 Lendo agora
```dataview
TABLE autor as Autor, tema as Tema, data_inicio as "Começou em"
FROM "Livros"
WHERE tipo = "livro" AND lower(default(situacao, "")) = "lendo"
SORT data_inicio desc
```

## 🔥 Próximos: prioridade alta
```dataview
TABLE tema as Tema, fonte as "Quem indicou", data_adicionado as Adicionado
FROM "Livros"
WHERE tipo = "livro" AND lower(default(situacao, "")) = "indicado"
AND lower(default(prioridade, "")) = "alta"
SORT data_adicionado desc
```

## Prioridade média
```dataview
TABLE tema as Tema, fonte as "Quem indicou", data_adicionado as Adicionado
FROM "Livros"
WHERE tipo = "livro" AND lower(default(situacao, "")) = "indicado"
AND (lower(default(prioridade, "")) = "média" OR lower(default(prioridade, "")) = "media")
SORT data_adicionado desc
```

## Fila normal
```dataview
TABLE tema as Tema, fonte as "Quem indicou", data_adicionado as Adicionado
FROM "Livros"
WHERE tipo = "livro" AND lower(default(situacao, "")) = "indicado"
AND lower(default(prioridade, "")) != "alta"
AND lower(default(prioridade, "")) != "média"
AND lower(default(prioridade, "")) != "media"
SORT data_adicionado desc
```

## 🧭 Por tema: o livro certo pro problema de agora
```dataview
TABLE WITHOUT ID key as Tema, rows.file.link as "Livros esperando"
FROM "Livros"
WHERE tipo = "livro" AND lower(default(situacao, "")) = "indicado"
GROUP BY default(tema, "sem tema")
SORT key asc
```

## ✅ Já lidos
```dataview
TABLE autor as Autor, data_inicio as "Começou", data_fim as "Terminou", (date(data_fim) - date(data_inicio)).days as "Dias pra ler"
FROM "Livros"
WHERE tipo = "livro" AND (lower(default(situacao, "")) = "concluido" OR lower(default(situacao, "")) = "concluído")
SORT data_fim desc
```
