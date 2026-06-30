# Assessoria Raiz — Claude Code OS

## O que é esse workspace
Workspace de operações da Assessoria Raiz. Aqui ficam os clientes, documentação interna, propostas, contratos, financeiro e materiais de trabalho do Lucas.

**Estrutura de pastas:**
- `_contexto/` — memória do sistema (não apagar)
- `clientes/` — uma pasta por cliente com todos os documentos relacionados
- `financeiro/` — controle financeiro e faturamento
- `administrativo/` — processos e documentação interna
- `contratos/` — contratos e minutas
- `conteudo/` — materiais, ebooks, apresentações
- `dados/` — drop zone pra arquivos analisar (CSV, XLSX, PDF, imagens)
- `templates/skills/` — templates de skills prontos pra personalizar com /mapear
- `templates/ferramentas/catalogo.md` — APIs e ferramentas disponíveis pra usar em skills
- `tarefas.md` — lista de tarefas corrente

## Sobre o negócio
A Assessoria Raiz é uma assessoria de crescimento comercial especializada em tráfego pago e consultoria de vendas para lojas de veículos. Atua com Meta Ads, Google Ads e melhoria do processo comercial. O diferencial é olhar o negócio como um todo — marketing, vendas, atendimento e processo comercial em sincronia.

**Sócios:**
- Lucas Lunardi — Comercial, Administrativo, Financeiro, Estratégia Comercial
- Matheus Faria — Operação, Estratégia de Marketing, Sucesso do Cliente
- Serviços audiovisuais terceirizados

## ICP e posicionamento
Foco de prospecção: lojas de veículos, revendas, multimarcas e seminovos. A carteira também inclui outros nichos. O posicionamento é de assessoria de crescimento comercial, não apenas agência de tráfego pago.

## O que mais fazemos aqui
- Prospecção comercial e gestão do pipeline de vendas
- Propostas comerciais e apresentações
- Contratos e documentação de clientes
- Revisões estratégicas e relatórios mensais
- Desenvolvimento de processos internos e metodologias
- Criação de materiais (ebooks, apresentações, landing pages)
- Gestão financeira e administrativa

## Tom de voz
Direto, consultivo, profissional mas próximo. Sem formalidade excessiva. Orientado a vendas e tomada de decisão. Transmite autoridade sem arrogância.

Evitar: travessão (—), palavra "tá" em contexto profissional, respostas genéricas, formalidade excessiva, frases longas, jargões vazios de marketing, validação sem senso crítico, cara de IA.

## Ferramentas conectadas
- [ ] Gmail
- [ ] Google Calendar
- [ ] Google Drive
- [ ] Meta Ads (/meta-ads-ratos)
- [ ] Google Ads (/google-ads-ratos)

*(Marcar conforme for instalando os MCPs)*

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (se existirem e estiverem configurados):

1. `_contexto/empresa.md` — quem é o usuário, o que faz, como funciona o negócio
2. `_contexto/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_contexto/estrategia.md` — foco atual, prioridades, o que pode esperar

Usar essas informações como base pra qualquer resposta ou decisão. Ao sugerir prioridades, formatos ou abordagens, considerar o foco atual descrito em `estrategia.md`.

Para qualquer tarefa visual (carrossel, proposta, slide, landing page), consultar `marca/design-guide.md` como referência de estilo.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe uma skill relevante em `.claude/skills/` ou `.claude/commands/`.
Se encontrar, seguir as instruções da skill.
Se não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (o usuário provavelmente vai pedir de novo no futuro), perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o padrão de repetição for claro.

---

## Aprender com correções

Quando o usuário corrigir algo, melhorar uma resposta ou dar uma instrução que parece permanente (frases como "na verdade é assim", "não faça mais isso", "prefiro assim", "sempre que...", "evita...", "da próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o negócio** → `_contexto/empresa.md`
- **Sobre preferências e estilo** → `_contexto/preferencias.md`
- **Sobre prioridades e foco atual** → `_contexto/estrategia.md`
- **Regra de comportamento nessa pasta** → este `CLAUDE.md`
- **Mudança visual** → `marca/design-guide.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro. Confirmar o que foi salvo mostrando a linha adicionada.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante no projeto (novo cliente, nova skill, mudança de foco, novo processo, ferramenta instalada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize os arquivos de memória?"

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo inteiro, só adicionar ou editar a linha relevante.

---

## Regras do sistema

- Clientes: criar pasta em `clientes/[nome-cliente]/` com briefing.md, proposta.html, contrato.md e subpastas `reunioes/` e `relatorios/`
- Usar `clientes/_modelo-cliente/` como base pra novos clientes
- Contratos avulsos e minutas vão em `contratos/`
- Conteúdo e materiais da agência vão em `conteudo/`
- Arquivos pra analisar vão em `dados/`

---

## Criação de skills

Quando o usuário pedir pra criar uma nova skill:

1. Verificar se existe um template relevante em `templates/skills/`
2. Perguntar: "Essa skill é específica pra esse projeto ou vai ser útil em qualquer projeto?"
   - Específica desse negócio → `.claude/skills/nome-da-skill/SKILL.md`
   - Útil em qualquer projeto → `~/.claude/skills/nome-da-skill/SKILL.md`
3. Ler `_contexto/empresa.md` e `_contexto/preferencias.md` pra calibrar ao contexto do negócio
