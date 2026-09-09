---
name: low-ticket
description: >
  Skill principal pra desenvolver um produto digital low ticket do zero até anúncio rodando —
  definição do produto, página de venda, checkout na Hotmart, funil pós-compra, tracking
  (GTM/GA4/Meta Pixel), performance da página, estrutura de campanha de anúncio e roteiro de
  criativo. Processo validado na prática construindo o Protocolo Visita Garantida, do primeiro
  rascunho até a campanha rodando de verdade. Use quando o usuário pedir "criar um produto low
  ticket", "montar um low ticket do zero", "novo produto low ticket", "monta o funil desse
  produto", ou chamar /low-ticket. Pra só escrever roteiro de criativo de um produto que já existe,
  ir direto pra Fase 7 (`fases/fase-7-criativos.md`) sem passar pelas fases anteriores.
---

# /low-ticket — Criar produto low ticket do zero

## O que essa skill cobre

O processo completo de tirar um produto digital low ticket do papel e colocar rodando com
anúncio de verdade, em 7 fases. Cada fase tem um arquivo de referência próprio em `fases/` —
ler o arquivo da fase antes de executar ela, não confiar só no resumo abaixo.

| Fase | O quê | Referência |
|---|---|---|
| 0 | Definição do produto (dor, desejo, oferta, preço) | `fases/fase-0-definicao-produto.md` |
| 1 | Página de vendas | `fases/fase-1-pagina-vendas.md` |
| 2 | Checkout na Hotmart | `fases/fase-2-checkout-hotmart.md` |
| 3 | Funil pós-compra (qualificação + obrigado) | `fases/fase-3-funil-pos-compra.md` |
| 4 | Tracking (GTM + GA4 + Meta Pixel) | `fases/fase-4-tracking.md` |
| 5 | Performance da página | `fases/fase-5-performance.md` |
| 6 | Campanha de anúncio | `fases/fase-6-campanha-anuncio.md` |
| 7 | Roteiro de criativo | `fases/fase-7-criativos.md` |

Não são fases estritamente sequenciais no sentido de "só pode começar a próxima quando terminar
a anterior" — mas a ordem acima é a ordem de dependência real (ex: não dá pra configurar tracking
antes de ter página de venda no ar; não dá pra escrever criativo antes de saber o mecanismo do
produto). Se o usuário pedir pra pular direto pra uma fase (ex: "só quero o tracking desse produto
que já existe"), ir direto pra ela, mas avisar se alguma fase anterior parece não ter sido feita
ainda (ex: pedir tracking sem ter mencionado onde a página está publicada).

## Como identificar em que fase o usuário está

Perguntar (se não estiver claro pelo contexto): "Isso é um produto novo do zero, ou você já tem
algo pronto e quer continuar de onde parou?"

- Produto novo → começar pela Fase 0.
- Produto com página pronta mas sem checkout → Fase 2.
- Produto vendendo mas sem tracking → Fase 4.
- Produto com tracking mas devagar/pesado → Fase 5.
- Produto rodando mas sem anúncio ainda → Fase 6.
- Produto rodando com anúncio, só precisa de roteiro novo → Fase 7 direto, sem ler as fases 0-6
  (ver `fases/fase-7-criativos.md`, que já tem seu próprio fluxo de brief de produto).

## Regras que valem pra skill inteira, não só uma fase

- **Nunca inventar número, prova, depoimento ou resultado.** Se não tiver dado real (do usuário ou
  já documentado no brief do produto), marcar `[PREENCHER COM DADO REAL]` e avisar — nunca
  preencher com invenção. Vale pra copy de página, roteiro de criativo, e qualquer texto que cite
  resultado.
- **Nunca assumir que a conta do Meta/GTM/Apps Script é exclusiva desse produto.** A Assessoria
  Raiz reaproveita a mesma infraestrutura de marketing pra vários produtos/funis diferentes. Antes
  de criar gatilho, tag, variável, script ou preset de coluna novo, checar se já existe algo
  parecido de outro funil, e sempre nomear com prefixo específico do produto pra nunca colidir.
  Detalhe completo em `fases/fase-4-tracking.md`.
- **Confirmar decisões de risco antes de executar** — trocar domínio, mexer em DNS, publicar
  página com dado sensível de cliente, decisão que custa dinheiro real (ex: compra de teste pra
  destravar evento de Compra no Meta). Ver CLAUDE.md, seção "Segurança e riscos".
- **Tom da copy de venda (página, criativo) segue o padrão validado, não a regra geral de "tá" de
  `_contexto/preferencias.md`** — ver nota de tom em `fases/fase-7-criativos.md`. Fora da copy de
  venda (conversa normal, documentação técnica), a regra geral de preferencias.md continua valendo.

## Onde as coisas ficam (convenção de pastas)

Pra manter consistência entre produtos diferentes:

- `conteudo/[nome-do-produto]/` — página de venda, qualificação, obrigado, `deploy/`,
  `build-deploy.py`, PDFs de material de apoio. Ver `fases/fase-1-pagina-vendas.md`.
- `conteudo/criativos-low-ticket/produtos/[produto].md` — brief do produto pra geração de
  criativo (dor, desejo, oferta, objeções, prova). Ver `fases/fase-7-criativos.md`.
- `conteudo/criativos-low-ticket/roteiros/` — roteiros de criativo gerados (só salva se o usuário
  pedir).
- `administrativo/automacoes/[produto]-pos-compra/` — Apps Script da automação de
  qualificação/planilha/WhatsApp. Ver `fases/fase-3-funil-pos-compra.md`.
- `tarefas.md` (raiz do workspace) — pendências pontuais de cada produto em andamento.

## Processo real que validou essa skill

Essa skill nasceu do processo de construir o **Protocolo Visita Garantida** (produto pra
vendedores de loja de veículos) do zero até campanha rodando — incluindo os erros e correções
reais no caminho (colisão de infra compartilhada, bug de CLS por `height:auto` faltando, evento de
otimização errado no Meta, etc.). Sempre que aparecer um erro novo relevante o suficiente pra
repetir em produtos futuros, atualizar o arquivo de fase correspondente — não deixar o
conhecimento só na conversa.
