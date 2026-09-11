# Contexto da Empresa — Assessoria Raiz

**Nome:** Lucas Lunardi
**Negócio:** Assessoria Raiz
**O que faz:** Assessoria de crescimento comercial especializada em tráfego pago e consultoria de vendas para lojas de veículos. Atua com Meta Ads, Google Ads e melhoria do processo comercial.
**Perfil:** agencia
**Atende clientes:** externos — foco em lojas de veículos, revendas, multimarcas e seminovos. A carteira também inclui outros nichos.
**Equipe:** 2 sócios (50/50)
- Lucas Lunardi: Comercial, Administrativo, Financeiro, Estratégia Comercial (não está na operação) — mais de 3 anos de experiência em treinamento comercial pra lojas de veículos (não usar "4 anos", correção feita em 2026-08-27)
- Matheus Faria: Operação, Estratégia de Marketing, Sucesso do Cliente
- Serviços audiovisuais terceirizados
**Ferramentas:** Meta Ads, Google Ads, Google Meu Negócio, Google Sheets, Google Forms, Google Apps Script, WhatsApp Business, CRM próprio (customizável), Gamma, Lovable, ClickUp, Kiwify, Instagram, Autentique, Meetime, Sistema Raiz
**Principais entregas:** Gestão de Meta Ads, gestão de Google Ads, estratégia de geração de leads, consultoria comercial, diagnóstico comercial, melhoria de atendimento e follow-up, Google Meu Negócio, reuniões mensais, relatórios estratégicos, materiais comerciais (apresentações, ebooks, landing pages)

## Método RAIZ
Metodologia própria de crescimento para lojas de veículos. 4 pilares:
1. **R — Raiz Firme:** estrutura, configuração, estratégia inicial e acompanhamento comercial
2. **A — Alinhamento e Transparência:** suporte diário, relatórios, análise de métricas, processo de atendimento
3. **I — Impulsionamento Estratégico:** campanhas segmentadas, criativos, posicionamento digital
4. **Z — Zelo Contínuo:** acompanhamento próximo, otimização diária, reuniões estratégicas mensais

## Posicionamento e diferencial
Não é percebida como agência de tráfego pago. O posicionamento é de assessoria de crescimento comercial — olha marketing, vendas, atendimento, processo comercial e estratégia como partes conectadas.

Diferencial: visão de negócio, não de campanha. Analisa se o problema está no anúncio, na oferta, no atendimento, no CRM, no follow-up, no estoque, no posicionamento ou no processo comercial.

Analogias usadas na comunicação:
- Engrenagens funcionando em sincronia (visão de negócio vs. foco em partes isoladas)
- Criança aprendendo a caminhar (crescimento como processo, não resultado imediato)
- Viagem com preparação, estrada e ajustes (explicação do Método RAIZ)

## ICP
Lojas de veículos, revendas, multimarcas e seminovos. Perfil ideal: pelo menos 3 funcionários, nota 4.5+ no Google com mais de 10 avaliações, presença ativa no Instagram, consciência de que tráfego pago é processo.

Evitar: clientes imediatistas, desorganizados, que não seguem combinados, que não aceitam melhorar processo comercial. Não atender apostas/bets.

## Processo comercial
Prospecção via cold call e WhatsApp. Método de venda consultiva real usado: método DEF (curso Vendas Pro, Neto Simões) — SPIN Selling e BANT são só referência de mercado, não o que é aplicado na prática. Detalhamento completo do DEF em `_contexto/metodo-def.md`, usado pela skill `/vendedor`. Foco em diagnosticar o momento do cliente antes de vender.

## Contexto adicional
- Sistema Raiz: plataforma interna criada com Claude Code para gestão da agência (organização, financeiro, operação)
- CRM próprio com desenvolvedor disponível para alterações
- Foco em previsibilidade, processos claros e escalabilidade
- Interesse constante em automações, IA e ferramentas de eficiência
- Lucas tem acesso a todas as contas da agência (GitHub, Vercel, Supabase, Meta, Google etc.) e consegue gerar tokens/credenciais direto, sem depender do Matheus pra liberar acesso

## Captação de leads (atualizado 13/08/2026)
Formulário de leads do Meta trocou de "Leads Forms" pra "Novo Forms" (aba nova, mesma planilha "Assessoria Raiz - Dados"). Leads Forms ficou congelada como histórico, não recebe lead novo desde 11/08/2026.
- Aba Pipeline (mesma planilha): linhas 2-54 são histórico fixo (valor colado); linha 55 em diante espelha a Novo Forms ao vivo por fórmula, incluindo data automática
- Notificação de lead novo (e-mail pra assessoriaraizz@gmail.com + grupo WhatsApp "Avisos Leads - RAIZ" via Z-API) migrada pra ler a Novo Forms — scripts em `administrativo/automacoes/leadads-grupo-whatsapp/` e no Código.gs do projeto Apps Script da planilha. Os dois têm alerta de falha por e-mail se a automação quebrar.
- Meetime também recebe lead novo automaticamente (script `notificacaoMeetime.gs` no mesmo Apps Script), já como status Ativo, com campos personalizados preenchidos (Instagram, nome e número do dono/responsável). Mesmo padrão de controle por última linha e alerta de falha por e-mail dos outros dois.
- Mensagem automática direto pro WhatsApp do lead foi **testada e removida** (script `mensagemLeadWhatsapp.gs` existiu por poucos dias, depois excluído). Motivo: o número comercial tomou bloqueio de 24h no WhatsApp, provavelmente por mandar mensagem automática pra números que nunca tinham falado com esse número antes (comportamento que o WhatsApp associa a spam, mesmo em volume baixo). Não reativar essa automação sem antes migrar pra API oficial do WhatsApp Business com template pré-aprovado, ou pelo menos reduzir bastante a frequência/agressividade — o risco já se confirmou na prática uma vez.
- Os 3 scripts de automação de lead que continuam ativos (e-mail, WhatsApp grupo, Meetime) têm retry automático (até 3 tentativas) além do alerta de falha por e-mail, adicionado depois de uma falha real registrada em 18/08/2026.
- Regra importante: nunca apagar linha da Novo Forms depois que tiver lead real — o controle de "lead já notificado" é por número de linha (PropertiesService), e apagar linha desalinha o contador e pode fazer lead sumir sem avisar ninguém. Se precisar remover lead ruim/duplicado, faz isso na Pipeline, não na fonte.
- Aba Outbound (mesma planilha) ganhou painel de funil espelhando a estrutura do inbound (Pipeline), adaptado pra prospecção ativa (sem etapa de qualificação, com breakdown de status Ganho/Perdido/Ativo)

## Captação Geral — segunda frente de leads (atualizado 03/09/2026)
Além das lojas de veículos, a Raiz passou a rodar campanha de captação de **empresas em geral** (não só automotivo), com duas campanhas em paralelo — uma na cidade do Lucas, outra na cidade do Matheus — cada uma com formulário próprio no Meta, ambas caindo na mesma aba **"Captação geral "** da planilha "Assessoria Raiz - Dados" (repara no espaço sobrando no final do nome da aba, importa pra fórmula).
- Os dois formulários usam nomenclatura de campo diferente por trás (um em inglês, outro em português), mas o conector já normaliza tudo pras mesmas colunas (nome, telefone, e-mail) — não precisa tratamento especial por formulário.
- Entra misturado na mesma Pipeline das lojas de veículos (decisão do Lucas), a partir da linha 200 — mesmo padrão de fórmula robusta (FILTER, imune a inserção de linha na fonte) usado pra Novo Forms.
- Reaproveitadas as colunas M/N da Pipeline (que ficaram livres depois que a Novo Forms tirou as perguntas de qualificação de loja) pra guardar as 2 perguntas de qualificação da Captação Geral (faturamento médio, já investe em tráfego pago). Cabeçalho genérico agora ("Qualificação 1/2"), já que o conteúdo depende da origem do lead.
- Mesma cadência da Meetime usada pras lojas de veículos, com 2 campos personalizados a mais (`faturamentoMedio`, `jaInvesteEmTrafego`).
- 3 scripts clonados no mesmo Apps Script pra essa frente: `emailCaptacaoGeral.gs`, `whatsappCaptacaoGeral.gs`, `meetimeCaptacaoGeral.gs` — mesmo padrão de retry, alerta de falha e controle por última linha dos scripts das lojas de veículos, mas com contadores de propriedade separados (não colidem entre si).
- Achado importante: a fórmula `IF` simples com intervalo fixo (ex: `B55:B1000`) quebra quando o intervalo referenciado é resultado de outra fórmula de array (`FILTER`) — nesses casos, refazer o cálculo direto da fonte com `FILTER` de novo, em vez de encadear em cima de outra coluna já calculada.

## Campanhas de loja de veículos pausadas (atualizado 11/09/2026)
As campanhas de captação pra lojas de veículos (Novo Forms) foram pausadas — não chega lead novo desse segmento por enquanto. Foco atual de captação é só a Captação Geral (empresas em geral). Os leads de loja de veículos que já estavam na Pipeline (linhas 55 em diante) não estão sendo trabalhados pelo time.

## Integração Pipeline → CRM interno (atualizado 11/09/2026)
O dev criou um Apps Script separado (`importarLeads`) que manda leads da Pipeline pro CRM interno (`app.assessoriaraiz.com.br`), via endpoint `/api/integrations/meta-lead-ads`. Roda a cada 5 min, controla duplicidade por coluna própria ("Importado CRM", carimbo por linha, mais robusto que os nossos contadores de última linha).
- Só importa a partir da **linha 200** da Pipeline (`DATA_START_ROW`) — ou seja, só traz leads da Captação Geral, nunca trouxe os de loja de veículos (linhas 55-199). Confirmado testando busca no CRM: leads recentes de loja de veículos não aparecem lá. Não é urgente corrigir agora porque a campanha de loja tá pausada e ninguém trabalha o backlog, mas fica registrado caso a campanha de loja volte um dia — nesse caso, mudar `DATA_START_ROW` pra 55.
- Só traz dado de cadastro (id, data, anúncio, campanha, e-mail, nome, telefone) — não sincroniza status de funil nem campos de qualificação.
- Chave de API (`IMPORT_KEY`) fica hardcoded no script, não em Propriedades — diferente do padrão que a gente usa nos outros scripts. Vale considerar sugerir pro dev migrar.
- CRM interno também tem um usuário "Claude" (conta criada pro Lucas compartilhar acesso comigo) cadastrado como Supervisor em `/team` — checar se o toggle de "recebendo leads" tá desligado, pra não entrar no rodízio de distribuição automática.
