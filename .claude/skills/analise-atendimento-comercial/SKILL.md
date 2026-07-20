---
name: analise-atendimento-comercial
description: >
  Analisa o atendimento comercial de um cliente da Assessoria Raiz (prints de WhatsApp,
  transcrição de call de venda, textos de copia e cola usados pela equipe) e gera um
  diagnóstico de venda consultiva: o que já funciona, onde está errando com clareza,
  atendimentos reescritos mostrando a versão certa, e plano de ação. Se o cliente já
  tiver material de treinamento comercial documentado (PDF, apostila, roteiro), cruza
  o diagnóstico item a item contra esse material, cobrando como reincidência. Use quando
  o usuário mandar prints de atendimento, mencionar "analisa esse atendimento", "revisa
  o atendimento do cliente X", "atendimento comercial tá ruim", "diagnóstico de
  atendimento", "devolutiva pro vendedor/atendente", ou pedir ajuda como conselheiro
  comercial pra analisar como a equipe de um cliente está vendendo.
---

# /analise-atendimento-comercial

## Diferença pra /diagnostico-comercial

`/diagnostico-comercial` analisa uma call de triagem com um **lead novo** da Assessoria Raiz, gera diagnóstico pra virar proposta. `/analise-atendimento-comercial` analisa como a **equipe de um cliente já ativo** vende pros clientes finais dele (loja de veículos vendendo carro, salão vendendo procedimento, etc). Um é sobre fechar a Assessoria Raiz, o outro é sobre melhorar o comercial de quem já é cliente.

## Dependências

- `_contexto/empresa.md` — contexto do negócio
- `_contexto/preferencias.md` — tom de voz
- `clientes/[nome-cliente]/briefing.md` — se existir, ler antes de perguntar o que já está documentado
- Qualquer material de treinamento comercial que o cliente já tenha recebido (PDF, apostila, roteiro de atendimento), se existir

---

## Passo 1 — Coletar contexto

Perguntar o que faltar:

1. **Qual cliente.** Se não existir pasta em `clientes/[nome-cliente]/`, avisar que vai ser criada (usar `clientes/_modelo-cliente/` como base) e perguntar se é específica ou não do nicho de veículos, pra calibrar linguagem no briefing.
2. **O material de evidência do atendimento real** — prints de WhatsApp, transcrição de call, textos de copia e cola que a equipe usa de verdade. Confirmar a origem exata de cada peça (é atendimento real capturado, ou é material que o cliente/usuário te mandou separadamente pra revisão?) — isso muda o peso da evidência e não deve ser assumido.
3. **Já existe treinamento comercial anterior documentado** (PDF, apostila, lista de passos) que essa equipe já recebeu? Se sim, pedir o material — ele vira a régua de auditoria, e cada erro encontrado passa a ser cobrado como reincidência de algo já ensinado, não como novidade. Se não existir, o diagnóstico usa só o framework universal da seção 3.
4. **Qual o destino final do material.** Isso determina a voz do documento:
   - **Análise interna** pro Lucas avaliar a situação → terceira pessoa, formato de relatório
   - **Devolutiva que vai virar PDF/treinamento pro funcionário** → segunda pessoa, endereçada direto à pessoa, tom de professor/mentor, explicando o porquê de cada ponto
   
   Se não estiver claro, perguntar antes de escrever a versão longa.

---

## Passo 2 — Framework de análise (venda consultiva)

Independente do nicho do cliente, avaliar o atendimento real contra esses critérios. Eles formam a espinha dorsal do diagnóstico, com ou sem material de treinamento prévio pra cruzar:

- **Tempo de resposta** — lead quente (principalmente vindo de anúncio pago) esfria rápido. Sinalizar qualquer demora que ultrapasse o razoável pro contexto do negócio.
- **Uso da informação que o cliente já deu de graça** — quando quem procura já conta a necessidade, o receio, o contexto, isso é diagnóstico pronto. Ignorar isso e mandar resposta genérica é o erro mais grave porque é evitável sem nem precisar perguntar.
- **Pergunta de diagnóstico antes de informar** — toda demanda ampla merece pergunta direcionada antes de qualquer descrição de produto/serviço. Pergunta fechada tipo sim/não que não é aprofundada depois não conta como diagnóstico.
- **Prescrição única em vez de cardápio** — depois do diagnóstico, indicar UMA opção com justificativa ligada ao que a pessoa disse. Mandar lista completa de produtos/serviços (mesmo que curta, mesmo que bonita) transfere o trabalho de decidir de volta pro cliente, que é o oposto de venda consultiva. Encurtar o texto de uma lista não resolve o problema, porque a estrutura de cardápio continua a mesma — só decorar melhor não é diagnosticar.
- **Personalização ao longo da conversa** — nome e tom espelhado usados a conversa inteira, não só como gatilho de fechamento.
- **Fechamento** — pergunta fechada com opções concretas (dois horários, por exemplo) fecha mais fácil que pergunta aberta.
- **Apresentação de valor** — parcelamento e enquadramento como oferta, quando fizer sentido pro ticket do negócio.

---

## Passo 3 — Se houver material de treinamento prévio

Ler o material completo e mapear cada item/passo dele. Pra cada um, marcar um veredito com evidência extraída do atendimento real:
- ✅ Seguido
- ⚠️ Parcial (explicar o que falta)
- ❌ Violado (explicar com o trecho específico do atendimento)
- Não avaliável com o material disponível (não forçar veredito sem evidência)

Abrir com um resumo numérico curto (quantos itens avaliáveis, quantos seguidos/parciais/violados) — isso dá ao usuário um número concreto pra abrir a conversa com a equipe.

Atenção especial: se algum item do treinamento foi seguido só na forma e não no espírito (ex: pediu "textos mais curtos" e a pessoa só encurtou frases sem mudar a estrutura do problema), isso deve ser nomeado explicitamente como o ponto mais importante do diagnóstico — é o tipo de erro que passa despercebido numa auditoria superficial.

---

## Passo 4 — Reescrever exemplos reais

Pegar pelo menos os casos de atendimento mais ricos em evidência (onde o cliente final deu bastante informação) e reescrever a conversa inteira, mensagem por mensagem, aplicando os pontos identificados. Não é teoria solta, é a mesma conversa, corrigida, pra servir de referência direta.

Se houver um problema recorrente e generalizável (tipo o hábito de mandar cardápio de opções), montar um ou dois exemplos adicionais fora dos casos reais, mostrando o "antes" (estrutura errada) e "depois" (diagnóstico → prescrição única), reaproveitando o conteúdo técnico que a equipe já tem, só reorganizado.

---

## Passo 5 — Plano de ação

Fechar com:
- Se o material de treinamento tinha exercícios práticos previstos (tipo autoauditoria de conversas, follow-up de contatos antigos), reaproveitar esses exercícios como próximo passo, em vez de inventar tarefa nova
- Uma lista curta (3 a 5 itens) de mudanças de aplicação imediata, que não dependem de reciclar o treinamento inteiro

---

## Passo 6 — Salvar

Salvar em `clientes/[nome-cliente]/relatorios/`:
- Se for análise interna: `diagnostico-atendimento-[aaaa-mm].md`
- Se for devolutiva pro funcionário: `devolutiva-atendimento-[nome-funcionario]-[aaaa-mm].md`

Se as duas versões fizerem sentido (uma análise interna mais crua + uma devolutiva already polida), perguntar antes de gerar as duas, não assumir.

Se a pasta do cliente ainda não existir, criar `briefing.md` com o que foi levantado na conversa antes de salvar o relatório.

---

## Regras gerais

- Tom segue `_contexto/preferencias.md`: direto, sem travessão, sem "tá", sem jargão vazio, sem validação gratuita
- Nunca inventar trecho de conversa ou dado que não veio do material real fornecido
- Reconhecer o que já funciona antes de listar erros — a correção não deve apagar o que já está certo
- Confirmar sempre a origem de cada peça de evidência (atendimento real vs. material à parte) antes de tratar as duas como equivalentes
