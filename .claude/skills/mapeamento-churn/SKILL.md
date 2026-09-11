---
name: mapeamento-churn
description: Analisa a transcrição ou anotações de uma reunião de saída (cliente cancelando com a Assessoria Raiz), responde um roteiro fixo de perguntas sobre o motivo do cancelamento e sugere a categoria do churn. Use quando o usuário colar transcrição ou anotação de reunião de cancelamento, mencionar "reunião de saída", "cliente cancelando", "mapeamento de churn", "análise de churn", "categoriza esse churn", "por que ele tá saindo", ou chamar /mapeamento-churn.
---

# Mapeamento de Churn

## Quando usar

Sempre que um cliente da Assessoria Raiz decidir cancelar, a reunião de saída gera uma transcrição ou anotação. O usuário cola esse material no chat e pede pra rodar o mapeamento.

## O que fazer

1. Ler o material colado (transcrição ou anotações da reunião de saída).
2. Responder, **direto no chat** (não salvar em arquivo), o roteiro fixo abaixo, na ordem, extraindo a resposta de cada pergunta a partir do que o cliente disse.
3. Se a conversa não trouxer elemento suficiente pra responder alguma pergunta com segurança, marcar como **"Não abordado na conversa"** — nunca inventar ou supor resposta que o cliente não deu.
4. Depois do roteiro, sugerir a categoria do churn (ver seção abaixo) com justificativa curta baseada nas respostas.
5. Não adicionar resumo executivo, diagnóstico extra ou comparação com outros clientes além da categorização pedida.

## Roteiro fixo

**1ª pergunta:** Por que o cliente está cancelando com a empresa?

**2ª pergunta:** O que a Raiz poderia ter feito diferente pra reter esse cliente?

**3ª pergunta:** Quais atributos, funções ou entregas ele sugere de melhoria?

- Se o cliente disser que não tem melhoria nenhuma a sugerir, incluir também:
  **3.1ª pergunta:** Quais são os diferenciais competitivos que ele acredita que a Raiz tem? O que ele mais gosta no serviço?

**4ª pergunta:** Quais foram os principais problemas que ele enfrentou dentro da empresa que motivaram a saída?

**5ª pergunta:** Se hoje a Raiz resolvesse todos os problemas levantados, ele voltaria a ser cliente?

## Categorização do churn

Depois de responder o roteiro, sugerir **uma** das 3 categorias abaixo (a que melhor explica a causa raiz do cancelamento) com justificativa curta baseada nas respostas dadas. Se o material sugerir mais de uma categoria com peso parecido, dizer isso e apontar qual pesa mais.

1. **Problema de entrega, resultado, relacionamento ou comunicação** — a operação não entregou o que devia, o resultado não veio, ou faltou comunicação/relacionamento no dia a dia com o cliente.
2. **Problema de alinhamento de expectativa** — o serviço rodou como devia, mas o cliente esperava algo diferente do que foi vendido ou combinado (prazo, formato de resultado, nível de envolvimento).
3. **Modelo de negócio ou problema interno** — a causa não é falha de entrega nem de expectativa, é algo estrutural do negócio do cliente (fechou, trocou de sócio, cortou custo, mudou de estratégia) ou um problema interno dele que não tem relação direta com o trabalho da Raiz.

## Formato da resposta

```
1ª pergunta: [repetir a pergunta]
Resposta: [o que o cliente disse, direto]

2ª pergunta: ...
Resposta: ...

(...)

Categoria sugerida: [nome da categoria]
Por quê: [justificativa curta, 1-2 linhas, baseada nas respostas acima]
```

## Tom

Direto e objetivo, sem travessão, sem jargão. Só reportar o que foi dito na reunião e sugerir a categoria com base nisso, sem suavizar nem interpretar além do que o cliente falou.
