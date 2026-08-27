/**
 * Recebe DUAS coisas diferentes no mesmo endpoint, e distingue uma da outra
 * pelo formato do JSON recebido:
 *
 *   1. As respostas do formulário de qualificação (qualificacao.html)
 *      → grava na aba "Respostas".
 *   2. O aviso de compra aprovada, mandado automaticamente pelo Webhook
 *      da própria Hotmart → grava na aba "Compras" (nome, e-mail, telefone).
 *
 * Importante: a Hotmart não garante nenhum dado em comum entre o webhook de
 * compra e o formulário de qualificação (não documenta passar e-mail/ID de
 * transação na URL da página de obrigado). Por isso ficam em DUAS ABAS
 * separadas da mesma planilha, não numa linha só — pra cruzar as duas, usa
 * a data/hora como referência.
 *
 * Como publicar:
 *   1. Cria uma planilha (ou usa uma já existente) com duas abas:
 *      - "Respostas": Data/Hora | Possui loja de carros? | Instagram da loja | Página
 *      - "Compras":   Data/Hora | Nome | E-mail | Telefone | Transação
 *   2. Extensões > Apps Script, apaga o conteúdo padrão e cola este arquivo inteiro.
 *   3. Implantar > Nova implantação > tipo "App da Web".
 *      - Executar como: Eu (sua conta)
 *      - Quem pode acessar: Qualquer pessoa
 *   4. Copia a URL do App da Web gerada e cola:
 *      - No lugar de ENDPOINT_URL dentro de qualificacao.html
 *        (procure "COLE_AQUI_A_URL_DO_APPS_SCRIPT")
 *      - Como URL do Webhook lá na Hotmart (ver passo 5)
 *   5. Na Hotmart: Ferramentas > Webhook > Criar webhook.
 *      - Evento: "Compra aprovada" (PURCHASE_APPROVED)
 *      - URL: a mesma URL do passo 4
 *      - Salva e copia o "Hottok" gerado
 *   6. De volta no Apps Script: ⚙️ Configurações do projeto > Propriedades do
 *      script > adiciona a propriedade HOTMART_HOTTOK com o valor copiado.
 *      (Sem isso configurado, o script aceita qualquer webhook sem checar
 *      se é mesmo da Hotmart — funciona, mas sem essa trava de segurança.)
 *   7. Toda vez que editar o código depois de já implantado, tem que ir em
 *      Implantar > Gerenciar implantações > editar (lápis) > Nova versão,
 *      senão a URL antiga continua rodando o código velho.
 */

const NOME_ABA_RESPOSTAS = "Respostas";
const NOME_ABA_COMPRAS = "Compras";

function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);

    // Webhook da Hotmart sempre manda um campo "event" (ex: PURCHASE_APPROVED).
    // Nosso formulário de qualificação nunca manda esse campo.
    if (dados.event) {
      return processarWebhookHotmart(dados);
    }

    return processarRespostaQualificacao(dados);
  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: erro.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function processarRespostaQualificacao(dados) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA_RESPOSTAS);
  sheet.appendRow([
    new Date(),
    dados.temLoja || "",
    dados.instagram || "",
    dados.pagina || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function processarWebhookHotmart(dados) {
  const props = PropertiesService.getScriptProperties();
  const hottokEsperado = props.getProperty("HOTMART_HOTTOK");
  const hottokRecebido = dados.hottok || "";

  // Log do payload bruto na primeira vez ajuda a confirmar o formato exato
  // que a Hotmart está mandando, caso algum campo abaixo venha vazio.
  Logger.log("Webhook Hotmart recebido: " + JSON.stringify(dados));

  if (hottokEsperado && hottokRecebido !== hottokEsperado) {
    Logger.log("Hottok não confere, ignorando notificação.");
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: "hottok inválido" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (dados.event !== "PURCHASE_APPROVED") {
    // Só nos interessa registrar compra aprovada por enquanto.
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, ignorado: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const buyer = (dados.data && dados.data.buyer) || {};
  const purchase = (dados.data && dados.data.purchase) || {};

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA_COMPRAS);
  sheet.appendRow([
    new Date(),
    buyer.name || "",
    buyer.email || "",
    buyer.checkout_phone || buyer.phone || "",
    purchase.transaction || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Roda manualmente pra testar se a aba "Respostas" está certa, sem precisar
 * mandar uma requisição de verdade.
 */
function testarGravacaoRespostas() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA_RESPOSTAS);
  sheet.appendRow([new Date(), "Sim", "@teste_manual", "teste"]);
  Logger.log("Linha de teste gravada em Respostas.");
}

/**
 * Roda manualmente pra testar se a aba "Compras" está certa, simulando um
 * webhook de compra aprovada sem precisar esperar uma venda de verdade.
 */
function testarGravacaoCompras() {
  processarWebhookHotmart({
    event: "PURCHASE_APPROVED",
    hottok: PropertiesService.getScriptProperties().getProperty("HOTMART_HOTTOK") || "",
    data: {
      buyer: { name: "Comprador Teste", email: "teste@exemplo.com", checkout_phone: "51999999999" },
      purchase: { transaction: "TESTE123" },
    },
  });
  Logger.log("Linha de teste gravada em Compras.");
}
