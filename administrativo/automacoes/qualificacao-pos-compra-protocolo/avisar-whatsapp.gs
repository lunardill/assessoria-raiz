/**
 * Avisa o grupo do WhatsApp toda vez que uma resposta nova cai na aba
 * "Respostas" (ver receber-respostas.gs, no mesmo projeto Apps Script).
 *
 * Mesmo padrão do script que já existe em
 * administrativo/automacoes/leadads-grupo-whatsapp/apps-script.js —
 * só que apontando pra essa planilha de qualificação em vez da de leads
 * de anúncio. Cola este arquivo como uma aba NOVA de script dentro do
 * MESMO projeto Apps Script do receber-respostas.gs (mesma planilha).
 *
 * Configuração necessária (Extensões > Propriedades do projeto > Propriedades do script):
 *   ZAPI_INSTANCE_ID, ZAPI_TOKEN, ZAPI_CLIENT_TOKEN, ZAPI_GROUP_ID
 *   Se for avisar o MESMO grupo "Avisos Leads - RAIZ" de sempre, usa os
 *   mesmos valores que já estão configurados no projeto de leads
 *   (arquivo administrativo/automacoes/leadads-grupo-whatsapp/.env).
 *
 * Gatilho: configurar um gatilho de tempo (a cada 5 ou 10 minutos, por
 * exemplo) chamando avisarWhatsappNovaResposta.
 */

const NOME_ABA_QUALIFICACAO = "Respostas";
const COLUNA_DATA = 1;
const COLUNA_NOME = 2;
const COLUNA_TELEFONE = 3;
const COLUNA_EMAIL = 4;
const COLUNA_TEM_LOJA = 5;
const COLUNA_INSTAGRAM_LOJA = 6;
const COLUNA_PAGINA = 7;

const MAX_TENTATIVAS_QUALIFICACAO = 3;
const ESPERA_ENTRE_TENTATIVAS_QUALIFICACAO_MS = 5000;

function avisarWhatsappNovaResposta() {
  for (let tentativa = 1; tentativa <= MAX_TENTATIVAS_QUALIFICACAO; tentativa++) {
    try {
      processarRespostasNovas();
      return;
    } catch (erro) {
      if (tentativa < MAX_TENTATIVAS_QUALIFICACAO) {
        Utilities.sleep(ESPERA_ENTRE_TENTATIVAS_QUALIFICACAO_MS);
        continue;
      }
      MailApp.sendEmail({
        to: "assessoriaraizz@gmail.com",
        subject: "⚠️ Falha na notificação de qualificação (WhatsApp)",
        body: "A automação de WhatsApp da página de obrigado do Protocolo falhou depois de " + MAX_TENTATIVAS_QUALIFICACAO + " tentativas.\n\nErro: " + erro.message + "\n\nStack: " + erro.stack
      });
    }
  }
}

function processarRespostasNovas() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA_QUALIFICACAO);
  const linhaAtual = sheet.getLastRow();

  const props = PropertiesService.getScriptProperties();
  const ultimaLinha = Number(props.getProperty("ultimaLinhaQualificacao") || 1); // linha 1 é cabeçalho

  if (linhaAtual <= ultimaLinha) return;

  for (let linha = ultimaLinha + 1; linha <= linhaAtual; linha++) {
    const dataHora = sheet.getRange(linha, COLUNA_DATA).getValue();
    const nome = sheet.getRange(linha, COLUNA_NOME).getValue();
    const telefone = sheet.getRange(linha, COLUNA_TELEFONE).getValue();
    const email = sheet.getRange(linha, COLUNA_EMAIL).getValue();
    const temLoja = sheet.getRange(linha, COLUNA_TEM_LOJA).getValue();
    const instagram = sheet.getRange(linha, COLUNA_INSTAGRAM_LOJA).getValue();

    if (!dataHora) continue; // linha vazia, pula

    const horario = formatarDataQualificacao(dataHora);

    const mensagem =
      "🎉 *Compra qualificada — Protocolo Visita Garantida*\n\n" +
      "*Nome:* " + (nome || "não informado") + "\n" +
      "*Telefone:* " + (telefone || "não informado") + "\n" +
      "*E-mail:* " + (email || "não informado") + "\n" +
      "*Possui loja de carros?* " + (temLoja || "não informado") + "\n" +
      "*Instagram da loja:* " + (instagram || "não informado") + "\n\n" +
      "*Respondido em:* " + horario;

    enviarMensagemWhatsappQualificacao(mensagem, props);
  }

  props.setProperty("ultimaLinhaQualificacao", linhaAtual.toString());
}

function formatarDataQualificacao(valor) {
  if (valor instanceof Date) {
    return Utilities.formatDate(valor, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");
  }
  return String(valor);
}

function enviarMensagemWhatsappQualificacao(mensagem, props) {
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
 * Roda manualmente UMA VEZ, na primeira configuração, pra marcar as
 * respostas já existentes como "já processadas" (evita avisar de todas
 * de uma vez quando o gatilho começar a rodar).
 */
function inicializarUltimaLinhaQualificacao() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA_QUALIFICACAO);
  const props = PropertiesService.getScriptProperties();
  props.setProperty("ultimaLinhaQualificacao", String(sheet.getLastRow()));
  Logger.log("Última linha marcada como processada (qualificação): " + sheet.getLastRow());
}

/**
 * Roda manualmente pra testar o envio sem esperar resposta nova.
 */
function testarEnvioWhatsappQualificacao() {
  const props = PropertiesService.getScriptProperties();
  enviarMensagemWhatsappQualificacao("✅ Teste de conexão — automação de qualificação pós-compra configurada com sucesso.", props);
}
