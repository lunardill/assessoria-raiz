# Plano de Ação — Evento PRO 2026 (Subida PRO)

Origem: 12 palestras, 49 ações levantadas. Priorizado cruzando com o foco atual (processo comercial, prospecção, consolidação do posicionamento em lojas de veículos). Depois de rever os slides fotografados de cada palestra (não só as anotações escritas), a síntese completa com os frameworks está em [administrativo/evento-pro-2026-aprendizados.md](administrativo/evento-pro-2026-aprendizados.md).

## Por que essa ordem

Depois de conferir o estado real de cada frente (não só o framework das palestras), três coisas mudaram:

1. **Preço vem antes de operação, e sem risco conhecido.** A ordem certa das 5 alavancas de lucro (palestra 09, Bruno Choran) é: aumentar preço → baixar custo de entrega → consertar quem não performa → aumentar volume → baixar custo de estrutura. O ticket girou devagar de R$1.500 pra R$1.800 nos últimos contratos, sem nunca ter sido testado de forma deliberada nem ter batido em resistência de cliente. É a ação de maior retorno com menor esforço técnico — não depende de CRM, dev ou ninguém além de você.
2. **O número de churn atual não é confiável.** Churn de 5,1% ao ano não é matematicamente compatível com um LTV médio de 7,5 meses — essa combinação exigiria um churn mensal na casa de 13%, não 5,1% anual. Antes de usar esse número pra qualquer decisão (remuneração de CS atrelada a LTV, projeção de crescimento), a métrica precisa ser redefinida e recalculada. Isso vira o primeiro passo da ação "nova métrica de MRR Churn", não um item qualquer do Tier 2.
3. **O CRM já existe** — foi feito sob medida pra vocês. Não é "implementar", é ajustar: funil de 7 etapas e critérios de entrada/saída você edita direto no sistema; follow-up automatizado e notificação de lead no zap podem depender do desenvolvedor. E quem executa quase tudo isso é você sozinho, sem CS ainda, com ajuda pontual do Matheus. Por isso o Tier 1 virou sequência por semana em vez de lista simultânea — problema real de agência gerando falha por sobrecarga vira mais um caso de "churn por fator interno", o mesmo problema que apareceu na sua resposta sobre os últimos clientes perdidos.

Vale notar: churn dos últimos clientes foi majoritariamente por fatores internos do negócio deles, mas teve casos de falha de comunicação do lado de vocês — isso é exatamente o que funil com critério e follow-up com data e motivo resolvem. Não é reformular o serviço, é reforçar processo.

Separei o que é ação de agência do que é desenvolvimento pessoal. Ambos importam, mas só o primeiro bloco entra na operação.

---

## Tier 1 — Sequência por semana (execução solo, sem CS)

**Semana 1 — decisão e diagnóstico, sem dependência técnica**
- [ ] Definir novo ticket médio e aplicar em propostas novas e renovações a partir de agora (palestra 09 — Bruno Choran / palestra 02 — Zucco)
- [ ] Redefinir a métrica de churn: esclarecer o que hoje é medido como "5,1% ao ano" e recalcular junto com o LTV real, antes de usar esses números em qualquer outra decisão (palestra 01 — Sobral / palestra 09 — Bruno Choran)

**Semana 2 — ajustes que você mesmo edita no CRM**
- [ ] Configurar o funil de 7 etapas com critério de entrada/saída escrito por etapa, direto no CRM existente (palestra 11 — Matheus Barbosa)
- [ ] Ajustar primeira mensagem pro lead, tem foto de exemplo salva (palestra 11 — Matheus Barbosa)
- [ ] Estruturar cadência de prospecção ativa, canal 2 dos 4 motores de captação (palestra 11 — Matheus Barbosa)

**Semana 3 em diante — depende de automação/dev ou mais tempo de construção**
- [ ] Criar sistema de acompanhamento comercial (zap) com o Claude — checar com o dev do CRM o que dá pra automatizar por fora (palestra 03 — Cássio Prado)
- [ ] Criar automação no Claude pra notificar lead no zap (palestra 03 — Cássio Prado)
- [ ] Criar automação pra responder o lead quando chegar, caso não consiga ligar (palestra 11 — Matheus Barbosa)
- [ ] Usar o Claude pra montar o playbook de vendas (palestra 11 — Matheus Barbosa)

**Roda em paralelo, é o Matheus que executa**
- [ ] Testar sempre 3 criativos por vez (palestra 11 — Matheus Barbosa)

## Rotina semanal pronta pra implementar (1h/dia, palestra 11 — Matheus Barbosa)

Assim que o CRM e a cadência estiverem de pé, essa é a rotina "máquina sempre cheia":

- **Segunda**: revisa a campanha, corta o pior criativo e sobe um novo, confere verba e custo por lead
- **Terça**: 20 aberturas D1 de prospecção (lista pronta da semana anterior)
- **Quarta**: publica o artigo da semana, roda os follows D2 e D4 da cadência
- **Quinta**: 20 aberturas D1, convida 1 cliente satisfeito pro programa de indicação
- **Sexta**: breakups D7, reativação de propostas paradas há 30+ dias

## Tier 2 — Curto prazo (base financeira e de gestão)

Ainda não existe CS na equipe hoje — os itens de cargo/remuneração de CS abaixo são pré-requisito pra abrir essa vaga, não ajuste de algo que já existe. Fazem mais sentido depois que a métrica de churn/LTV da Semana 1 estiver correta, porque é ela que vai definir a remuneração.

- [ ] Calcular CAC da agência sem considerar tráfego, com custo da operação (palestra 09 — Bruno Choran)
- [ ] Calcular LTV sobre CAC (palestra 09 — Bruno Choran)
- [ ] Criar filtro pra ver LTV por período: último mês, 3, 6, ano (palestra 10 — Guilherme Nagel)
- [ ] Descritivos de cargo de CS e gestor, junto com remuneração — usar o modelo "departamento alavancado" (supervisor = confiança, sênior = expertise, júnior+IA = operacional) (palestra 10 — Guilherme Nagel / palestra 09 — Bruno Choran)
- [ ] Colocar regras de aumento de pró-labore e divisão de lucros (palestra 10 — Guilherme Nagel)
- [ ] Remuneração de CS/gestor atrelada ao LTV da conta — só depois da métrica de LTV estar confiável (palestra 10 — Guilherme Nagel)
- [ ] Fazer reunião de apresentação de resultados entre os sócios (palestra 01 — Sobral)
- [ ] Estruturar pagamento dos clientes no início do mês — **levar pra mentoria/hotseat antes de executar** (palestra 01 — Sobral)
- [ ] Estudar estrutura de receita, Renata Cintirion (palestra 10 — Guilherme Nagel)

## Tier 3 — Médio prazo (crescimento e produto)

- [ ] Criar Sistema Raiz completo como produto, não só serviço interno (palestra 04 — Thiago Tessman)
- [ ] Fazer campanhas segmentadas por estado, uma campanha por estado (palestra 11 — Matheus Barbosa)
- [ ] Analisar prospecção via LinkedIn (palestra 02 — Zucco)
- [ ] Masterizar melhor a indicação, canal 3 de captação (palestra 02 — Zucco)
- [ ] Criar landing page pro programa de embaixadores (palestra 11 — Matheus Barbosa)
- [ ] Estruturar venda de e-mail marketing (palestra 02 — Zucco)
- [ ] Criar blog, canal 4 de captação e autoridade (palestra 11 — Matheus Barbosa)
- [ ] Pegar histórico de atendimento, venda e resolução de problema, e treinar a IA a atender como o Lucas atende, revisando a cada 3 meses (palestra 04 — Thiago Tessman)

## Tier 4 — Conteúdo (importante, mas não é foco imediato segundo estrategia.md)

- [ ] Criar conteúdos com base no formato validado: testar, validar, replicar, não criar do zero cada vez (palestra 07 — Hanah Franklin)
- [ ] Gravar conteúdo analisando lojas grandes: posicionamento, Instagram, criativo (palestra 07 — Hanah Franklin)
- [ ] Aplicar estrutura IHC e gatilhos psicológicos nos roteiros (palestra 07 — Hanah Franklin)
- [ ] Remover o máximo de texto dos slides, apresentações e propostas (palestra 02 — Zucco)

## Pessoal (fora do escopo da agência)

Diário uau — 3 bênçãos, 3 aprendizados, 3 melhorias por dia —, melhorar postura e dicção, exercitar positividade, se preocupar só com o dia de hoje, agradecer por cada dificuldade (palestra 06 — Gislene Isquierdo). Controlar dieta, começar jiu-jítsu, 1h de oração, 1h de exercício, 1h de estudo por dia, eliminar convivências que não fazem sentido (palestra 12 — Guilherme Freire).

---

## Pendências que dependem de terceiros

- Pitch de venda do downsell e cashback já gravado na galeria do celular — verificar e usar (palestra 10 — Guilherme Nagel)
- Link do entregável da palestra: https://redirecione.com/subidopro?qr=1 (palestra 03 — Cássio Prado)
- Materiais completos do evento: https://entregaveis.ofmatheusbarbosa.com/materiais, senha SUBIDOPRO26 (palestra 11 — Matheus Barbosa)
- Trello de formatos criativos validados: https://trello.com/b/BWowty9n/brinde-formatos-criativos-validados (palestra 07 — Hanah Franklin)

*Fonte das anotações: Obsidian Vault, pasta "Eventos/Evento PRO 2026"*
