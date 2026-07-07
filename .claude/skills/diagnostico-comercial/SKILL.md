---
name: diagnostico-comercial
description: >
  Analisa uma reuniao ou call de triagem comercial (transcricao ou anotacoes) e gera um diagnostico
  estrategico do lead, pronto pra virar proposta. Tambem responde perguntas pontuais sobre negociacoes
  em andamento (objecao, proximo passo, como abordar um lead especifico) usando o mesmo raciocinio de
  vendas. Use quando o usuario colar uma transcricao/anotacao de call, mencionar "diagnostico comercial",
  "analisa essa call", "monta o diagnostico do lead", "reuniao de triagem", ou pedir ajuda com uma
  negociacao, objecao ou lead especifico.
---

# /diagnostico-comercial

## Dependencias

- `_contexto/empresa.md` — Metodo RAIZ, ICP, processo comercial (SPIN Selling, BANT, DEF)
- `_contexto/preferencias.md` — tom de voz
- `_contexto/metodo-raiz-comercial.md` — playbook comercial detalhado (pilares, frases-chave, tecnica de fechamento, o que nunca fazer)

Ler os tres antes de gerar qualquer diagnostico ou responder qualquer pergunta comercial.

---

## Modo 1 — Gerar diagnostico a partir de uma call

Trigger: usuario cola a transcricao ou as anotacoes de uma call de triagem/venda (ligacao de WhatsApp, reuniao gravada, etc).

### Passo 1 — Coletar o material

Se o usuario ainda nao mandou, perguntar:
1. Nome do lead/loja
2. O material da call — transcricao completa ou as anotacoes que ele fez durante a ligacao

### Passo 2 — Extrair o diagnostico

Ler o material (mesmo cru ou desorganizado) e montar um documento com estas 8 secoes fixas:

1. **Contexto do negocio** — historico, estrutura, equipe, produto/ticket medio
2. **Situacao atual** — por que estao buscando ajuda agora
3. **Dores principais** — com a frase-chave do cliente entre aspas, literal
4. **Numeros** — vendas/leads/investimento atual e metas, sempre que mencionados na call
5. **Oportunidade da proposta** — pilares do Metodo RAIZ (ver `_contexto/metodo-raiz-comercial.md`) que fazem mais sentido pras dores levantadas, cada um ligado a uma dor especifica
6. **Objecoes provaveis** — e como responder cada uma, usando as tecnicas e frases do playbook
7. **Abordagem recomendada pra reuniao de proposta** — frase de abertura sugerida + estrutura do plano a apresentar
8. **Posicionamento de fechamento** — a frase-sintese de como vender a proposta (nao vender como "gestao de trafego", vender pelo resultado que o lead realmente quer, seguindo as analogias e principios do playbook)

**Se o material for uma call rica** (transcricao com idas e vindas, nao so respostas curtas), adicionar uma 9a secao, **Sinais de venda**:
- Perfil e nivel de consciencia do prospect
- O que ele realmente valoriza
- Onde a conversa perdeu forca (se perdeu)
- Objecao oculta — a que ele nao disse direto
- Temperatura do lead — interesse / confianca / urgencia, nota de 0 a 10 pra cada, com justificativa curta
- Frases dele pra reaproveitar na proposta

**Regra critica:** nunca inventar numero, frase ou dado que nao esta no material. Se uma secao nao tiver informacao suficiente, escrever "nao abordado na call" em vez de forcar conteudo.

### Passo 3 — Salvar

Salvar em `propostas/[nome-lead]/diagnostico.md` (criar a pasta se nao existir).

### Passo 4 — Proximo passo

Perguntar: "Quer que eu ja rode `/proposta-comercial` em cima desse diagnostico?"

---

## Modo 2 — Consultoria pontual

Trigger: usuario pergunta algo especifico sobre uma negociacao em andamento, sem estar colando uma call nova. Exemplos: "como eu respondo essa objecao do fulano", "o que acha desse lead", "qual o proximo passo com a Diniz Laser".

### Passo 1

Se existir `propostas/[nome-lead]/diagnostico.md` pro lead em questao, ler antes de responder.

### Passo 2

Responder com raciocinio de vendas (SPIN Selling, BANT, metodo DEF, Metodo RAIZ), direto ao ponto. Nao validar a ideia do usuario so porque ele trouxe ela — apontar riscos, pontos cegos e trade-offs quando fizer sentido, seguindo `_contexto/preferencias.md`.

---

## Regras gerais

- Tom segue `_contexto/preferencias.md`: direto, sem travessao, sem "ta", sem jargao vazio de marketing
- Nunca inventar dado que nao foi dito na call
- O diagnostico nao e a proposta final — e a municao estrategica pra montar ela depois no `/proposta-comercial`
- Quando o lead virar cliente, a pasta `propostas/[nome-lead]/` continua existindo, nao precisa mover nem apagar
