/**
 * Notificação de Lead no Grupo do WhatsApp — Assessoria Raiz
 *
 * Vigia a planilha de leads do Meta (primeira aba) e manda um aviso no grupo
 * "Avisos Leads - RAIZ" via Z-API toda vez que uma linha nova aparece.
 *
 * Configuração necessária (Extensões > Propriedades do projeto > Propriedades do script):
 *   ZAPI_INSTANCE_ID, ZAPI_TOKEN, ZAPI_CLIENT_TOKEN, ZAPI_GROUP_ID
 *   (valores em administrativo/automacoes/leadads-grupo-whatsapp/.env, neste repositório)
 *
 * Gatilho: configurar um gatilho de tempo (a cada 5 minutos) chamando checarLeadsNovos.
 */

const COLUNA_NOME = 17;      // Q — nome_completo
const COLUNA_TELEFONE = 18;  // R — telefone
const COLUNA_CAMPANHA = 8;   // H — campaign_name
const COLUNA_ANUNCIO = 4;    // D — ad_name

function checarLeadsNovos() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const props = PropertiesService.getScriptProperties();

  const ultimaLinhaProcessada = Number(props.getProperty("lastRow") || 1); // linha 1 = cabecalho
  const ultimaLinhaAtual = sheet.getLastRow();

  if (ultimaLinhaAtual <= ultimaLinhaProcessada) {
    return; // nada novo
  }

  for (let linha = ultimaLinhaProcessada + 1; linha <= ultimaLinhaAtual; linha++) {
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

    enviarWhatsApp(mensagem, props);
  }

  props.setProperty("lastRow", String(ultimaLinhaAtual));
}

function enviarWhatsApp(mensagem, props) {
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
function testarEnvio() {
  const props = PropertiesService.getScriptProperties();
  enviarWhatsApp("✅ Teste de conexão — automação de leads configurada com sucesso.", props);
}

/**
 * Rode essa função manualmente UMA VEZ, na primeira configuração, pra marcar
 * a linha atual como "já processada" (evita mandar aviso de TODOS os leads antigos de uma vez).
 */
function inicializarUltimaLinha() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const props = PropertiesService.getScriptProperties();
  props.setProperty("lastRow", String(sheet.getLastRow()));
  Logger.log("Última linha marcada como processada: " + sheet.getLastRow());
}
