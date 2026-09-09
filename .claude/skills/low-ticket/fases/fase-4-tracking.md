# Fase 4 — Tracking (GTM + GA4 + Meta Pixel)

## O cuidado mais importante dessa fase inteira

**A Assessoria Raiz reaproveita o mesmo GTM, o mesmo projeto Apps Script e os mesmos presets de
coluna do Meta Ads pra vários produtos/funis diferentes** — não é uma conta isolada por produto.
Isso já causou colisão real:

- Um gatilho genérico de "Form text contém X" de outro funil quase disparou tag errada porque o
  texto do botão de "enviando" da nossa página batia com a condição.
- Nomes de `const`/`function` sem prefixo colidiram entre scripts de automações diferentes no
  mesmo projeto Apps Script.
- Já existia um preset de colunas do Meta Ads Manager usado por outro funil (nunca editar preset
  existente sem confirmar antes se é exclusivo do produto atual).

**Antes de criar qualquer gatilho, tag, variável, script ou preset novo:** checar se já existe algo
parecido pra outro funil. Se a conta é compartilhada, usar nome/condição específica o suficiente
pra nunca colidir — nunca texto genérico, sempre prefixo do produto (ex: `PVG_` pro Protocolo
Visita Garantida) em nome de variável/função, e condição de gatilho por hostname/form ID/nome de
evento customizado, nunca por texto de botão genérico.

## Estrutura de tags no GTM

- **Gatilho base do produto**: Page Hostname contém `[dominio-do-produto]` — usado só se o produto
  precisar de tag própria de configuração (normalmente as tags base de GA4/Meta já disparam em
  "Todas as páginas" da conta inteira e cobrem o produto novo automaticamente, sem precisar
  duplicar).
- **Antes de criar uma tag de configuração nova**, checar se já existe uma tag base (GA4 Config,
  Meta Pixel base) disparando em "Todas as páginas" — se já existir, reaproveitar, não duplicar
  (duplicar conta pageview em dobro).
- **Eventos de funil recomendados** (adaptar nome pro produto):
  - Clique no botão de compra → GA4 `generate_lead` (ou nome customizado) + Meta `InitiateCheckout`
  - Início do preenchimento do formulário de qualificação (via `dataLayer.push` customizado no
    código da própria página, não é evento nativo do GTM)
  - Visualizou página de qualificação
  - Enviou formulário de qualificação → Meta `Lead` (evento mais forte que existe nesse funil
    específico, porque só dispara depois de compra aprovada)
  - Visualizou página de obrigado
- **Decisão deliberada**: os eventos de pós-compra (visualizou qualificação/obrigado) vão só pro
  GA4, não pro Meta — evita diluir o sinal de otimização do Meta com evento de baixo valor pra
  anúncio.

## GA4 — propriedade própria

Criar propriedade GA4 dentro da conta que a Raiz realmente controla (não reaproveitar propriedade
de dono incerto/compartilhada de origem desconhecida). Ao trocar de propriedade, **não mexer na
variável/tag compartilhada que outros funis já usam** — criar tag nova, só pro produto atual,
apontando pro ID novo.

### Comportamentos que parecem bug mas são normais numa propriedade nova

1. **"Tempo real" funciona na hora, relatórios de Exploração demoram até 24-48h** pra processar,
   mesmo com o evento sendo coletado certinho. Checar "Tempo real" pra confirmar que o dado tá
   chegando antes de desconfiar de bug.
2. **Parâmetro de evento padrão (ex: `page_location`) não aparece pra filtrar numa Exploração até
   virar Dimensão Personalizada.** Registrar em Admin → Definições personalizadas → Criar dimensão
   personalizada, **Escopo: Evento** (não "Usuário", que vem pré-selecionado errado). Só passa a
   filtrar dado a partir da data de criação da dimensão, não retroage.

### Funil de Exploração

Analisar → Análise detalhada de funil, com as etapas do funil real do produto (página de venda →
clique no botão → checkout → qualificação visualizada → qualificação enviada → obrigado). Editar
via o ícone de lápis ao lado de "Etapas" — se o evento/parâmetro não aparecer na busca, usar
"Criar evento: [nome]" via texto livre em vez de esperar.

## Meta Pixel

ID do pixel principal + variável `{{Meta Ads Pixel ID}}` já existe reaproveitado de outros funis
(checar antes de criar um novo). Tags de evento seguem o modelo "Facebook Pixel" da galeria
(gerenciam Web + API de Conversões junto, não escrever `fbq()` na mão via Custom HTML).

## UTM da campanha

```
utm_source=facebook (ou {{site_source_name}} pra diferenciar FB/IG automaticamente)
utm_medium=paid-social
utm_campaign={{campaign.name}}
utm_content={{ad.name}}
utm_term={{adset.name}}
```

Erro comum a evitar: **não colocar `{{campaign.id}}` em `utm_source`** nem nome de conjunto em
`utm_medium` — isso quebra o agrupamento de canal padrão do GA4 (a campanha inteira vira
"Unassigned" nos relatórios). `utm_source`/`utm_medium` são valores padronizados
(fonte/meio), não IDs dinâmicos da campanha.

No Gerenciador de Anúncios do Meta, colar a UTM no campo **"Parâmetros de URL"** (sem o `?` na
frente), deixando o campo "Link do site" só com a URL limpa — nunca os dois ao mesmo tempo (duplica
parâmetro).

## Testar antes de publicar de vez

Usar o modo **"Visualizar"** do GTM (não precisa publicar pra testar) — conecta na URL real do
produto e mostra em tempo real quais tags disparam em cada ação. Testar a sequência completa
(carregar página → clicar no botão → chegar na qualificação → preencher e enviar → chegar no
obrigado) numa sessão só antes de clicar em "Enviar" de vez.
