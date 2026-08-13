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
 * Gatilho: configurar um gatilho de tempo chamando enviarWhatsappNovoLead.
 */

const NOME_ABA = "Novo Forms"; // trocou de "Leads Forms" em 13/08/2026 — form antigo parou de receber lead, formulário novo é o Novo Forms
const COLUNA_HORARIO = 2;      // B — created_time
const COLUNA_ANUNCIO = 4;      // D — ad_name
const COLUNA_CONJUNTO = 6;     // F — adset_name
const COLUNA_CAMPANHA = 8;     // H — campaign_name
// COLUNA_CARROS_MES e COLUNA_INVESTIMENTO removidas — essas perguntas não existem mais no formulário novo
const COLUNA_INSTAGRAM = 13;   // M — qual é o instagram da sua loja de carros?
const COLUNA_EMAIL = 14;       // N — email
const COLUNA_NOME = 15;        // O — full_name
const COLUNA_TELEFONE = 16;    // P — phone_number

function enviarWhatsappNovoLead(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA);
    const linhaAtual = sheet.getLastRow();

    const props = PropertiesService.getScriptProperties();
    const ultimaLinhaWhatsapp = Number(props.getProperty("ultimaLinhaWhatsapp") || 0);

    if (linhaAtual <= ultimaLinhaWhatsapp) return; // não cresceu, não é lead novo

    // Processa todas as linhas novas desde a última checada (não só a última)
    for (let linha = ultimaLinhaWhatsapp + 1; linha <= linhaAtual; linha++) {
      const nome = sheet.getRange(linha, COLUNA_NOME).getValue();
      const telefoneRaw = sheet.getRange(linha, COLUNA_TELEFONE).getValue();
      const email = sheet.getRange(linha, COLUNA_EMAIL).getValue();
      const instagram = sheet.getRange(linha, COLUNA_INSTAGRAM).getValue();
      const campanha = sheet.getRange(linha, COLUNA_CAMPANHA).getValue();
      const conjunto = sheet.getRange(linha, COLUNA_CONJUNTO).getValue();
      const anuncio = sheet.getRange(linha, COLUNA_ANUNCIO).getValue();
      const horarioRaw = sheet.getRange(linha, COLUNA_HORARIO).getValue();

      if (!nome && !telefoneRaw) continue; // linha vazia, pula

      const telefone = String(telefoneRaw).replace(/[^\d]/g, "");
      const horario = formatarData(horarioRaw);

      const mensagem =
        "🚨 *Lead novo!*\n\n" +
        "*Nome:* " + nome + "\n" +
        "*Telefone:* " + telefone + "\n" +
        "*E-mail:* " + email + "\n" +
        "*Instagram da loja:* " + instagram + "\n\n" +
        "*Campanha:* " + campanha + "\n" +
        "*Conjunto de anúncio:* " + conjunto + "\n" +
        "*Anúncio:* " + anuncio + "\n" +
        "*Preenchido em:* " + horario;

      enviarMensagemWhatsapp(mensagem, props);
    }

    props.setProperty("ultimaLinhaWhatsapp", linhaAtual.toString());
  } catch (erro) {
    MailApp.sendEmail({
      to: "assessoriaraizz@gmail.com",
      subject: "⚠️ Falha na notificação de lead (WhatsApp)",
      body: "A automação de WhatsApp de leads novos falhou.\n\nErro: " + erro.message + "\n\nStack: " + erro.stack
    });
  }
}

function formatarData(valor) {
  if (valor instanceof Date) {
    return Utilities.formatDate(valor, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");
  }
  // valor vem como texto tipo "2026-05-08T09:05:22-05:00"
  const texto = String(valor);
  const match = texto.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (match) {
    return match[3] + "/" + match[2] + "/" + match[1] + " " + match[4] + ":" + match[5];
  }
  return texto;
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
