# Fase 2 — Checkout na Hotmart

## Formas de pagamento

Pra ticket baixo (R$47-97): **cartão de crédito parcelado + PIX**. Desativar boleto de propósito —
atraso de 1-3 dias úteis pra compensar e alta taxa de abandono não compensam pra um valor tão
baixo comprado por impulso.

## Pixel de Rastreamento (Ferramentas → Pixel de Rastreamento)

A Hotmart aceita pixels específicos, cada um com seu próprio ID — **não aceita colar container do
GTM direto** ali (checkout é página travada por segurança/PCI):

- **Google Analytics 4** — pede o ID de medição (`G-XXXXXXXXXX`)
- **Google Ads** — ID de conversão
- **Facebook/Meta Pixel** — tem duas opções complementares, "via WEB" (pede o ID do pixel) e "via
  API de Conversão" (pede token gerado no Gerenciador de Eventos do Meta → Configurações do pixel
  → Lado do servidor → Gerar token de acesso). Recomendado marcar as duas — API de Conversão é
  redundância que ajuda contra bloqueio de rastreamento do navegador.
- **TikTok Pixel** — se aplicável

A Hotmart já dispara sozinha os eventos padrão (`page_view`, `begin_checkout`/visita na página de
pagamento, `purchase`/venda aprovada com valor da transação) pro pixel configurado — não precisa
escrever código pra isso.

**Cuidado ao gerar token de API de Conversão do Meta:** o Gerenciador de Eventos às vezes mostra
mais de um dataset pré-selecionado (ex: um de teste junto com o de produção) — desmarcar qualquer
dataset que não seja o do produto antes de gerar o token, porque a integração direta com a Dataset
Quality API não tem opção de desfazer depois de ativada.

## Redirecionamento pós-compra

Configurar em **Página de Checkout → Página de agradecimento externa** (ou nome equivalente,
varia um pouco por conta): URL pra "compras aprovadas" apontando pra
`https://[dominio-do-produto]/[nome-da-pagina-de-qualificacao]` — ver `fases/fase-3-funil-pos-compra.md`.
Deixar em branco os campos de "aguardando pagamento"/"aguardando análise de crédito" a menos que o
produto tenha página pronta pra esses casos.

## Não dá pra simular venda de graça

A Hotmart não tem modo sandbox nem permite cupom de 100% de desconto — não existe jeito de gerar
o evento de Compra sem um pagamento real acontecendo. As opções reais, quando precisar disparar
esse evento (ex: pra liberar "Compra" como meta de otimização no Meta Ads, ver
`fases/fase-6-campanha-anuncio.md`):

1. **Confiar nas partes já testadas separadamente** (cada pedaço do funil testado isolado, sem
   fazer a compra completa) — zero custo, mas o evento de Compra continua sem disparar até a
   primeira venda real.
2. **Fazer uma compra real e pedir reembolso depois** — todo produto na Hotmart tem garantia
   mínima de 7 dias por lei (direito de arrependimento, CDC), reembolso é processo padrão pela
   própria plataforma. A taxa de processamento do pagamento geralmente não volta (perda pequena,
   alguns reais) — vale a pena quando o motivo é destravar um evento de otimização de campanha que
   está sendo prejudicada por falta de sinal de compra real.

## Área de membros

Se o conteúdo for entregue pela Hotmart Club: conferir que os módulos estão marcados como
"Publicado" antes de divulgar (não "rascunho" — comprador entra e não vê nada). Material extra
(PDF de apoio, etc.) entra na seção "Material extra" de cada aula — aceita PDF, ZIP, DOC, XLS,
PPT, até 10 arquivos de 100MB cada.
