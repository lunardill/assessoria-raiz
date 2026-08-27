# Qualificação pós-compra — Protocolo Visita Garantida

Formulário de 2 perguntas na página de obrigado (`conteudo/landing-maxxima-low-ticket/obrigado.html`),
que grava as respostas direto numa planilha do Google Sheets e avisa o grupo do WhatsApp.

## Passo a passo pra deixar no ar

1. **Cria a planilha**
   - Google Sheets → planilha nova → chama de algo tipo "Qualificação — Protocolo Visita Garantida".
   - Renomeia a primeira aba pra **`Respostas`** (exatamente esse nome).
   - Cabeçalho na linha 1: `Data/Hora | Possui loja de carros? | Instagram da loja | Página`.

2. **Cola os dois scripts**
   - Na planilha: Extensões → Apps Script.
   - Cria um arquivo de script e cola o conteúdo de `receber-respostas.gs`.
   - Cria outro arquivo de script (ícone "+" ao lado de "Arquivos") e cola o conteúdo de `avisar-whatsapp.gs`.
   - Salva o projeto.

3. **Configura as credenciais do Z-API**
   - No editor do Apps Script: ⚙️ Configurações do projeto → Propriedades do script → Adicionar propriedade do script.
   - Adiciona `ZAPI_INSTANCE_ID`, `ZAPI_TOKEN`, `ZAPI_CLIENT_TOKEN`, `ZAPI_GROUP_ID`.
   - Se for avisar o mesmo grupo "Avisos Leads - RAIZ" de sempre, usa os mesmos valores já configurados no projeto de leads de anúncio.

4. **Publica como App da Web**
   - Implantar → Nova implantação → tipo **App da Web**.
   - Executar como: **Eu** (sua conta).
   - Quem pode acessar: **Qualquer pessoa**.
   - Copia a URL gerada (termina em `/exec`).

5. **Cola a URL na página**
   - Abre `conteudo/landing-maxxima-low-ticket/obrigado.html`.
   - Procura `COLE_AQUI_A_URL_DO_APPS_SCRIPT` e substitui pela URL do passo 4.
   - Copia o arquivo atualizado pra `deploy/obrigado.html` e sobe de novo no Cloudflare Pages (mesmo processo do `index.html`).

6. **Cria o gatilho do aviso de WhatsApp**
   - No editor do Apps Script: ícone de relógio (Gatilhos) → Adicionar gatilho.
   - Função: `avisarWhatsappNovaResposta`.
   - Tipo de evento: baseado em tempo, a cada 5 ou 10 minutos.
   - Antes de ativar de vez, roda manualmente a função `inicializarUltimaLinhaQualificacao` uma vez (evita avisar de respostas antigas que não existem ainda, mas garante que o contador comece do jeito certo).

7. **Testa**
   - Roda manualmente `testarGravacao` (grava uma linha de teste na planilha).
   - Roda manualmente `testarEnvioWhatsappQualificacao` (manda uma mensagem de teste pro grupo).
   - Abre a página `obrigado.html` local, preenche o formulário e confirma que a linha aparece na planilha.

8. **Hotmart**
   - No produto, configura o redirecionamento pós-compra pra apontar pra URL final de `obrigado.html`
     (ex: `https://protocolo.assessoriaraiz.com.br/obrigado`).

## Observação

O formulário só pede "possui loja de carros?" e "Instagram da loja" — nome, telefone e e-mail do
comprador já ficam registrados no painel da Hotmart, não precisam ser pedidos de novo aqui.
