---
name: renovacao-contratual
description: >
  Monta o roteiro e a estrutura de reunião de renovação de contrato pra clientes
  existentes da Assessoria Raiz. Aplica o framework Ponto A / Ponto B / Ponto C,
  a estrutura macro pro micro (ano completo, quebra por fase, vitórias), o pitch
  de duas opções (mesmo ritmo vs. acelerado) e a virada de valor sem soar
  oportunista. Use quando o usuário mencionar "renovação", "renovar contrato",
  "reunião de renovação", "cliente vai renovar", "aditivo de contrato", "cliente
  completou 1 ano", ou pedir ajuda pra reajustar valor de cliente existente.
---

# /renovacao-contratual

## Dependências

Ler antes de montar qualquer roteiro:

- `_contexto/empresa.md` — Método RAIZ, ICP, processo comercial
- `_contexto/preferencias.md` — tom de voz
- `_contexto/metodo-raiz-comercial.md` — seção **"Metodologia de renovação (contratos de 12 meses)"** é a referência central desse fluxo. As outras seções (pilares, frases-chave, técnica de fechamento, princípios inegociáveis) também se aplicam
- **Google Drive (MCP conectado)** — usado pra localizar e ler a planilha de visão geral do cliente (investimento em tráfego x retorno em vendas). Ver `templates/ferramentas/catalogo.md` pra referência de uso

## Diferença pra /diagnostico-comercial

`/diagnostico-comercial` é pra lead novo, que nunca foi cliente, ainda decidindo se fecha. `/renovacao-contratual` é pra cliente que já está na base, chegando na virada de contrato. A lógica de venda muda: não é sobre convencer alguém que não te conhece, é sobre mostrar o quanto o Ponto B foi alcançado e vender o próximo destino.

---

## Workflow

### Passo 1 — Coletar contexto do cliente

Se existir `clientes/[nome-cliente]/` ou `propostas/[nome-lead]/diagnostico.md` da venda original desse cliente, ler antes de perguntar qualquer coisa — não repetir o que já está documentado.

**Se não existir nenhum registro anterior desse cliente** (nem pasta em `clientes/`, nem diagnóstico salvo), pedir a transcrição ou as anotações da reunião de triagem original antes de seguir. É de lá que vem o Ponto A (situação de partida) e o Ponto B (meta que o cliente definiu no início) — sem isso, o roteiro de renovação não tem base real pra comparação e vira genérico.

Reunir, perguntando o que faltar:

1. Nome do cliente
2. **Ponto A** — situação de partida e a meta original (faturamento, dor, contexto do negócio na época da triagem). Extrair da transcrição de triagem se ela foi fornecida
3. Dados do ciclo que está terminando: investimento total, faturamento (do tráfego e, se possível, faturamento total do negócio), leads, fechamentos, CAC, e explicação real de qualquer pico ou queda ao longo do período
4. Se já existe algo novo definido pro próximo ciclo (novo entregável, nova praça, mais investimento) ou se a renovação é sem mudança de escopo
5. Data de vencimento do contrato atual

**Dados de investimento e retorno — buscar na planilha de visão geral do cliente antes de perguntar pro usuário.** Cada cliente tem uma planilha de visão geral no Google Drive com o histórico de investimento em tráfego e retorno em vendas. Usar as ferramentas de Google Drive conectadas (busca por nome do cliente, algo como "[nome do cliente] visão geral" ou "[nome do cliente] overview") pra localizar e ler essa planilha direto, em vez de pedir esses números um por um pro usuário digitar. Só perguntar diretamente se a planilha não for encontrada, o acesso falhar, ou os dados na planilha não cobrirem o que falta (ex: faturamento total do negócio, que normalmente não está na planilha de tráfego).

**Regra crítica:** nunca inventar número. Se um dado não foi fornecido nem pela planilha nem pelo usuário, perguntar, não estimar. Comparar meta declarada numa call de triagem (aspiração, sem base real) com resultado operacional real é um erro, tratar como dados de naturezas diferentes.

### Passo 2 — Checar a timeline de preparação

Quem conduz a reunião é sempre o Lucas, papel comercial da sociedade, independente de quem fechou a venda originalmente. Matheus (operação/sucesso do cliente) participa e apoia com dado, mas não comanda.

Contra a data de vencimento do contrato:

- **3 meses antes** — o comercial já deveria estar acompanhando de perto as interações com o cliente
- **45 dias antes** — relatório do operacional já deveria ter sido solicitado (posição atual + sugestão de escopo, nunca aceitar sugestão de reduzir escopo)
- Alertar se a reunião está sendo montada em cima da hora, porque aditivo ou contrato novo pode levar até 15 dias entre leitura e assinatura

### Passo 3 — Montar o roteiro

Estrutura fixa, baseada na seção "Metodologia de renovação" do playbook:

1. **Abertura** — sinalizar que é uma conversa mais longa que o normal (a reunião de renovação leva de 1h30 a 2h)
2. **Panorama macro do ano — Ponto A** — de onde o cliente partiu e o que já foi entregue no ciclo inteiro
3. **Quebra por fases/trimestre** — macro pro micro, com transparência em qualquer queda (nunca esconder dado ruim no meio dos bons)
4. **Vitórias principais** — dados que provam operação madura (eficiência, consistência), não só crescimento bruto
5. **Confirmar o Ponto B** — perguntar o dado que falta pra saber se a meta original foi batida, nunca supor
6. **Ponte pro Ponto C** — definir o próximo destino com base no que já está em movimento no negócio do cliente, não uma meta genérica
7. **Duas opções, nunca uma só** — mesmo ritmo vs. acelerado. Se não tiver entregável novo definido pro ciclo, a opção acelerada vira intensidade de investimento em mídia ou ritmo de expansão, não módulo novo — isso preserva a decisão do usuário de não mudar escopo quando for o caso
8. **Virada de valor** — reajuste como assunto separado da decisão da etapa 7. Nunca argumentar "vocês tiveram resultado, agora paguem mais". Se fizer sentido pro caso, usar a evolução da própria agência (estrutura, sócios, processo) como espelho do crescimento do cliente
9. **Fechamento** — técnica de isolamento de objeção ("isso aqui te atende? o que ficou faltando pra você tomar a decisão?"), nunca "faz sentido?". Sair com renovação assinada ou data marcada, e iniciar o processo de aditivo o quanto antes

Se o ciclo que está terminando não teve resultado, ajustar a etapa 4 e 5: mostrar motivo real da queda, só prometer reversão se for genuinamente possível, e reconhecer que a chance de renovação é menor nesse cenário.

### Passo 4 — Salvar

Salvar em `clientes/[nome-cliente]/reunioes/renovacao-[ano].md`. Se a pasta do cliente ainda não existir, perguntar antes de criar.

### Passo 5 — Próximo passo

Perguntar se o usuário quer o deck visual da renovação, seguindo a estrutura de relatório documentada no playbook (capa, funil comparativo, evolução mês a mês, projeção, escopo em duas opções).

---

## Regras gerais

- Tom segue `_contexto/preferencias.md`: direto, sem travessão, sem "tá", sem "faz sentido?"
- Nunca misturar o resultado do cliente com o crescimento da agência na mesma frase que puxa o preço
- Nunca reduzir escopo pra baixar preço
- Nunca inventar dado, frase ou número que não foi fornecido pelo usuário
