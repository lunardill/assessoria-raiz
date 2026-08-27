# Qualificação pós-compra — Protocolo Visita Garantida

Formulário de 2 perguntas na página de qualificação (`conteudo/landing-maxxima-low-ticket/qualificacao.html`),
que grava as respostas direto numa planilha do Google Sheets e avisa o grupo do WhatsApp. Depois de
responder, a pessoa é redirecionada pra `conteudo/landing-maxxima-low-ticket/obrigado.html`, a página
final de confirmação.

Fluxo completo: Hotmart → `/qualificacao` (formulário) → `/obrigado` (confirmação, "fica de olho no seu e-mail").

Além disso, a mesma planilha recebe os dados de nome/e-mail/telefone de quem comprou, direto do
**Webhook da Hotmart** — automático, sem precisar pedir esses dados de novo no formulário.

**Importante:** os dados de compra (aba "Compras") e as respostas de qualificação (aba "Respostas")
ficam em abas separadas da mesma planilha, não numa linha só — a Hotmart não garante nenhum dado em
comum entre o webhook de compra e a página de obrigado pra cruzar as duas automaticamente. Pra
relacionar uma compra com uma resposta, usa a data/hora como referência.

## Passo a passo pra deixar no ar

1. **Cria a planilha (ou usa uma já existente)**
   - Cria duas abas:
     - **`Respostas`** — cabeçalho: `Data/Hora | Possui loja de carros? | Instagram da loja | Página`
     - **`Compras`** — cabeçalho: `Data/Hora | Nome | E-mail | Telefone | Transação`

2. **Cola o script**
   - Na planilha: Extensões → Apps Script.
   - Cria um arquivo de script e cola o conteúdo de `receber-respostas.gs`.
   - Cria outro arquivo de script (ícone "+" ao lado de "Arquivos") e cola o conteúdo de `avisar-whatsapp.gs`.
   - Salva o projeto.

3. **Publica como App da Web**
   - Implantar → Nova implantação → tipo **App da Web**.
   - Executar como: **Eu** (sua conta).
   - Quem pode acessar: **Qualquer pessoa**.
   - Copia a URL gerada (termina em `/exec`) — essa mesma URL vai ser usada em dois lugares: no
     formulário da página e no webhook da Hotmart.

4. **Cola a URL na página**
   - Abre `conteudo/landing-maxxima-low-ticket/qualificacao.html`.
   - Procura `COLE_AQUI_A_URL_DO_APPS_SCRIPT` e substitui pela URL do passo 3.
   - Copia o arquivo atualizado pra `deploy/qualificacao.html` e sobe de novo no Cloudflare Pages.

5. **Configura o Webhook na Hotmart**
   - No painel da Hotmart: Ferramentas → Webhook → Criar webhook.
   - Evento: **Compra aprovada** (`PURCHASE_APPROVED`).
   - URL: a mesma URL do passo 3.
   - Salva e copia o **Hottok** gerado.

6. **Configura as credenciais (Propriedades do Script)**
   - No editor do Apps Script: ⚙️ Configurações do projeto → Propriedades do script → Adicionar propriedade do script.
   - Adiciona `HOTMART_HOTTOK` com o valor copiado no passo 5 (trava de segurança: sem isso, qualquer
     um poderia mandar uma notificação falsa de "compra aprovada" pro nosso endpoint).
   - Adiciona também `ZAPI_INSTANCE_ID`, `ZAPI_TOKEN`, `ZAPI_CLIENT_TOKEN`, `ZAPI_GROUP_ID` — se for
     avisar o mesmo grupo "Avisos Leads - RAIZ" de sempre, usa os mesmos valores já configurados no
     projeto de leads de anúncio.

7. **Cria o gatilho do aviso de WhatsApp**
   - No editor do Apps Script: ícone de relógio (Gatilhos) → Adicionar gatilho.
   - Função: `avisarWhatsappNovaResposta`.
   - Tipo de evento: baseado em tempo, a cada 5 ou 10 minutos.
   - Antes de ativar de vez, roda manualmente a função `inicializarUltimaLinhaQualificacao` uma vez.

8. **Testa**
   - Roda manualmente `testarGravacaoRespostas` (grava uma linha de teste na aba "Respostas").
   - Roda manualmente `testarGravacaoCompras` (simula uma compra aprovada, grava na aba "Compras").
   - Roda manualmente `testarEnvioWhatsappQualificacao` (manda uma mensagem de teste pro grupo).
   - Abre a página `qualificacao.html` local, preenche o formulário e confirma que a linha aparece na
     planilha e que ela te leva pra `obrigado.html` no final.
   - Faz uma compra de teste de verdade (se a Hotmart permitir) e confirma que a linha aparece na aba
     "Compras" sozinha, sem precisar fazer nada.

9. **Hotmart — redirecionamento pós-compra**
   - No produto, configura o redirecionamento pós-compra pra apontar pra URL de `qualificacao.html`
     (ex: `https://protocolo.assessoriaraiz.com.br/qualificacao`).

## Observação

O formulário só pede "possui loja de carros?" e "Instagram da loja" — nome, telefone e e-mail do
comprador chegam sozinhos na aba "Compras" via webhook da Hotmart, não precisam ser pedidos de novo.
