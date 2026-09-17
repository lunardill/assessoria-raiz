# Link na bio — Lucas Lunardi

Página de link na bio pro Instagram do Lucas, no mesmo espírito da que o Matheus já usa (página simples com botões + tracking de clique por destino via GTM/GA4).

## Arquivos
- `index.html` — a página em si (fonte)
- `deploy/index.html` — cópia espelho, é essa pasta que sobe no Cloudflare Pages. Sempre que editar `index.html`, copiar de novo pra `deploy/` antes de publicar.

## Links atuais (nessa ordem)
1. Protocolo Visita Garantida → `https://protocolo.assessoriaraiz.com.br/`
2. Conheça a Assessoria Raiz → `https://www.assessoriaraiz.com.br/`
3. Fale no WhatsApp → `https://wa.me/5554992013758`

## Deploy (Cloudflare Pages)
Mesmo padrão do Protocolo Visita Garantida ([[protocolo-visita-garantida-funil]]):
1. Criar projeto novo no Cloudflare Pages (ex: `link-bio-lucas`)
2. Deploy manual: arrastar a pasta `deploy/` (nunca a pasta inteira do projeto)
3. Domínio sugerido: `link.assessoriaraiz.com.br` — criar CNAME no Registro.br apontando pro projeto do Cloudflare Pages, igual foi feito pra `protocolo.assessoriaraiz.com.br`. Domínio raiz continua no Registro.br, sem migrar nameserver.

## Tracking — o que falta configurar manualmente no GTM/GA4

A página já reaproveita o **mesmo container GTM** (`GTM-KDBRK7ZH`) e está pronta pra mandar dado pra **mesma propriedade GA4** ("Assessoria Raiz", `G-1F7WPFZY4W`) que já existe. Como é infraestrutura compartilhada com outros funis da Raiz, os nomes de evento usados aqui têm prefixo específico (`linkbio_`) pra não colidir com nada existente.

**Eventos que a página já dispara (via `dataLayer.push`):**
- `linkbio_click_protocolo` — clique no botão do Protocolo
- `linkbio_click_lp_raiz` — clique no botão da Assessoria Raiz
- `linkbio_click_whatsapp` — clique no botão do WhatsApp

Cada evento vem com o parâmetro `link_url` (a URL de destino).

**O que precisa ser feito dentro do GTM (interface web, não dá pra automatizar por aqui):**
1. Checar se a tag de **Configuração do GA4** existente nesse container dispara em "Todas as páginas" (sem restrição de hostname só pro `protocolo.assessoriaraiz.com.br`) — se estiver restrita, ou amplia o gatilho ou cria um gatilho novo de Hostname contém `link.assessoriaraiz.com.br` pra essa tag também disparar aqui e mandar o `page_view` normal.
2. Criar 3 gatilhos de **Evento personalizado**, um pra cada nome acima (`linkbio_click_protocolo`, `linkbio_click_lp_raiz`, `linkbio_click_whatsapp`).
3. Criar as tags de evento do GA4 correspondentes (reaproveitando a mesma tag de Configuração do GA4 já existente), uma pra cada gatilho, mandando o evento com esse mesmo nome pro GA4.
4. Publicar o container (as mudanças no GTM só valem depois de "Enviar"/publicar uma versão nova).

**Depois de configurado**, dá pra ver o desempenho em Explorar → funil ou tabela livre no GA4, filtrando pelos eventos `linkbio_click_*` — mesmo formato do relatório que o Matheus tem pra ele (cliques por destino, período, etc). Lembrete: propriedade GA4 recém-tocada pode levar até 24-48h pra processar dado em Exploração mesmo já aparecendo em Tempo real ([[ga4-propriedade-nova-comportamento]]).

## Cuidado — infraestrutura compartilhada
Esse GTM e essa propriedade GA4 já servem o Protocolo Visita Garantida e podem servir outros funis no futuro. Qualquer gatilho/tag novo aqui já nasce com nome específico o suficiente (`linkbio_*`) pra nunca colidir — ver [[infra-marketing-compartilhada-raiz]] antes de mexer em qualquer coisa genérica desse container.
