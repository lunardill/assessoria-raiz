/**
 * Notificação de Lead no Grupo do WhatsApp — Assessoria Raiz
 *
 * Roda ao lado do script existente "Notificação de Leads Meta" (Código.gs,
 * função enviarEmailNovoLead) no MESMO projeto Apps Script da planilha.
 * Não usa nem modifica nada do script de e-mail — segue o mesmo padrão dele
 * (controle de última linha via PropertiesService), mas com chave própria,
 * pra não colidir com a dele.
 *
 * Configuração necessária (Extensões > Propriedades do projeto > Propriedades do script):
 *   ZAPI_INSTANCE_ID, ZAPI_TOKEN, ZAPI_CLIENT_TOKEN, ZAPI_GROUP_ID
 *   (valores em administrativo/automacoes/leadads-grupo-whatsapp/.env, neste repositório)
 *
 * Gatilho: configurar um gatilho de tempo (a cada 5 minutos) chamando enviarWhatsappNovoLead.
 */

const NOME_ABA = "Leads Forms"; // mesma aba usada pelo script de e-mail
const COLUNA_NOME = 17;      // Q — nome_completo
const COLUNA_TELEFONE = 18;  // R — telefone
const COLUNA_CAMPANHA = 8;   // H — campaign_name
const COLUNA_ANUNCIO = 4;    // D — ad_name

function enviarWhatsappNovoLead(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA);
  const linhaAtual = sheet.getLastRow();

  const props = PropertiesService.getScriptProperties();
  const ultimaLinhaWhatsapp = Number(props.getProperty("ultimaLinhaWhatsapp") || 0);

  if (linhaAtual <= ultimaLinhaWhatsapp) return; // não cresceu, não é lead novo

  // Processa todas as linhas novas desde a última checada (não só a última)
  for (let linha = ultimaLinhaWhatsapp + 1; linha <= linhaAtual; linha++) {
    const nome = sheet.getRange(linha, COLUNA_NOME).getValue();
    const telefoneRaw = sheet.getRange(linha, COLUNA_TELEFONE).getValue();
    const campanha = sheet.getRange(linha, COLUNA_CAMPANHA).getValue();
    const anuncio = sheet.getRange(linha, COLUNA_ANUNCIO).getValue();

    if (!nome && !telefoneRaw) continue; // linha vazia, pula

    const telefone = String(telefoneRaw).replace(/[^\d]/g, "");

    const mensagem =
      "🚨 *Lead novo!*\n\n" +
      "*Nome:* " + nome + "\n" +
      "*Telefone:* " + telefone + "\n" +
      "*Campanha:* " + campanha + "\n" +
      "*Anúncio:* " + anuncio;

    enviarMensagemWhatsapp(mensagem, props);
  }

  props.setProperty("ultimaLinhaWhatsapp", linhaAtual.toString());
}

function enviarMensagemWhatsapp(mensagem, props) {
  const instanceId = props.getProperty("ZAPI_INSTANCE_ID");
  const token = props.getProperty("ZAPI_TOKEN");
  const clientToken = props.getProperty("ZAPI_CLIENT_TOKEN");
  const grupoId = props.getProperty("ZAPI_GROUP_ID");

  const url = "https://api.z-api.io/instances/" + instanceId + "/token/" + token + "/send-text";

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Client-Token": clientToken,
    },
    payload: JSON.stringify({
      phone: grupoId,
      message: mensagem,
    }),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}

/**
 * Rode essa função manualmente UMA VEZ pra testar sem esperar lead novo.
 * Não mexe no controle de "última linha", só manda uma mensagem de teste pro grupo.
 */
function testarEnvioWhatsapp() {
  const props = PropertiesService.getScriptProperties();
  enviarMensagemWhatsapp("✅ Teste de conexão — automação de leads configurada com sucesso.", props);
}

/**
 * Rode essa função manualmente UMA VEZ, na primeira configuração, pra marcar
 * a linha atual como "já processada" (evita mandar aviso de TODOS os leads antigos de uma vez).
 * Nome diferente de propósito do "inicializarUltimaLinha" que já existe no script de e-mail,
 * pra não colidir.
 */
function inicializarUltimaLinhaWhatsapp() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA);
  const props = PropertiesService.getScriptProperties();
  props.setProperty("ultimaLinhaWhatsapp", String(sheet.getLastRow()));
  Logger.log("Última linha marcada como processada (WhatsApp): " + sheet.getLastRow());
}
