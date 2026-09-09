# Fase 6 — Campanha de anúncio

## Colunas no Meta Ads Manager

Antes de montar, checar se já existe um preset de colunas de outro funil (ex: "Funil Raiz") — não
editar o existente, **criar um preset novo específico do produto**.

Métricas nativas (só marcar a caixinha): Valor gasto, Impressões, Alcance, Frequência, CPM,
Cliques no link, CTR, CPC, Visualizações da página de destino **no site** (usar a variante "no
site", não a genérica, evita misturar com app), Finalizações da compra iniciadas **no site**,
Cadastros/Leads **no site**, Compras **no site**, Valor de conversão da compra **no site**, Custo
por compra, ROAS das compras **no site**.

Métricas que precisam ser criadas como fórmula personalizada:
- **Connect Rate** = Visualizações da página de destino ÷ Cliques no link × 100
- **Taxa de conversão da página de venda** = Finalizações da compra iniciadas ÷ Visualizações da
  página de destino × 100
- **Hook Rate** (só se anúncio for vídeo) = Reproduções de vídeo de 3 segundos ÷ Impressões × 100

Ordem sugerida pra ler o funil da esquerda pra direita: gasto → alcance/frequência → hook (se
vídeo) → clique → connect rate → visualização da página → taxa de conversão da venda → checkout
iniciado → lead → compra/valor/custo/ROAS.

## Evento de otimização — hierarquia de migração

Sem histórico de conversão na conta, o Meta não libera "Compra" como meta de otimização
selecionável (só aparece depois de disparar pelo menos uma vez). Caminho de migração:

1. **Início: "Iniciar finalização de compra"** (InitiateCheckout) — maior volume de dado
   disponível logo de cara, ajuda o algoritmo a sair da fase de aprendizado mais rápido. Trade-off
   consciente: o algoritmo otimiza pra "quem clica", não "quem compra" — vai trazer clique barato
   sem necessariamente trazer venda.
2. **Assim que tiver volume do evento pós-compra do funil** (ex: `Lead`, se o funil manda esse
   evento só depois de compra aprovada — ver `fases/fase-4-tracking.md`): considerar subir pra
   ele. **Atenção**: em campanha tipo Advantage+ de Vendas, o evento pode aparecer como "ativo" no
   pixel mas **não ficar selecionável** como meta de otimização, porque esse tipo de campanha
   restringe a hierarquia de evento só aos de comércio (Ver conteúdo → Iniciar finalização de
   compra → Compra). Se acontecer isso, não force — os dois caminhos que sobram são ficar no
   InitiateCheckout até acumular Compra, ou considerar campanha de estrutura diferente.
3. **Assim que tiver volume de Compra real**: subir a otimização pra Compra, é o objetivo final.

Trocar o evento de otimização reinicia a fase de aprendizado do conjunto (Meta trata como "edição
significativa") — normal, não precisa duplicar a campanha por causa disso, só editar direto.

## Diagnóstico: "chega no checkout mas não converte"

Se o funil mostra bastante gente chegando na página de checkout mas quase ninguém completando a
compra, checar nessa ordem:

1. **Evento de otimização da campanha é o principal suspeito.** Se estiver otimizando em
   "Iniciar finalização de compra" (InitiateCheckout), o algoritmo literalmente não tem instrução
   pra filtrar por intenção real de pagamento — ele é recompensado por achar clicador, não
   comprador. É o padrão esperado desse trade-off (ver seção acima), não necessariamente bug.
2. **Fricção normal de checkout** — abandono é comum em tráfego frio de anúncio e em mobile
   (preencher cartão/CPF tem atrito natural).
3. **Algo quebrado no checkout específico** — abrir o link de pagamento pessoalmente e conferir se
   preço, parcelamento e PIX aparecem certinho, sem nada confuso.
4. **Volume baixo ainda não é padrão real** — se só teve poucas chegadas no checkout até agora
   (ex: menos de 20-30), pode ser variação de amostra pequena, não sinal definitivo ainda.

Se o item 1 for a causa provável e "Compra" ainda não estiver disponível: considerar uma **compra
de teste real** pra destravar o evento (ver `fases/fase-2-checkout-hotmart.md`, seção "Não dá pra
simular venda de graça") — o custo da taxa de gateway costuma ser bem menor que o desperdício de
verba otimizando no sinal errado por mais tempo.
