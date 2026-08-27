/**
 * Avisa o grupo do WhatsApp toda vez que uma resposta nova cai na aba
 * "Vendas Hotmart" (ver receber-respostas.gs, no mesmo projeto Apps Script).
 *
 * Mesmo padrão do script que já existe em
 * administrativo/automacoes/leadads-grupo-whatsapp/apps-script.js —
 * só que apontando pra essa planilha de qualificação em vez da de leads
 * de anúncio.
 *
 * IMPORTANTE: esse projeto Apps Script é compartilhado com outras
 * automações que já existiam (notificacaoWhatsapp.gs, notificacaoMeetime.gs,
 * etc.) — todos os nomes aqui (const e function) levam o prefixo PVG_ / pvg
 * (Protocolo Visita Garantida) justamente pra não colidir com nada que já
 * exista nos outros arquivos desse mesmo projeto.
 *
 * Configuração necessária (Extensões > Propriedades do projeto > Propriedades do script):
 *   ZAPI_INSTANCE_ID, ZAPI_TOKEN, ZAPI_CLIENT_TOKEN, ZAPI_GROUP_ID
 *   (esses 4 nomes já existem nesse projeto, reaproveitados do script de leads)
 *
 * Gatilho: configurar um gatilho de tempo (a cada 5 ou 10 minutos, por
 * exemplo) chamando pvgAvisarWhatsappNovaResposta.
 */

const PVG_NOME_ABA_QUALIFICACAO = "Vendas Hotmart";
const PVG_COLUNA_DATA = 1;
const PVG_COLUNA_NOME = 2;
const PVG_COLUNA_TELEFONE = 3;
const PVG_COLUNA_EMAIL = 4;
const PVG_COLUNA_TEM_LOJA = 5;
const PVG_COLUNA_INSTAGRAM_LOJA = 6;
const PVG_COLUNA_PAGINA = 7;

const PVG_MAX_TENTATIVAS = 3;
const PVG_ESPERA_ENTRE_TENTATIVAS_MS = 5000;

function pvgAvisarWhatsappNovaResposta() {
  for (let tentativa = 1; tentativa <= PVG_MAX_TENTATIVAS; tentativa++) {
    try {
      pvgProcessarRespostasNovas();
      return;
    } catch (erro) {
      if (tentativa < PVG_MAX_TENTATIVAS) {
        Utilities.sleep(PVG_ESPERA_ENTRE_TENTATIVAS_MS);
        continue;
      }
      MailApp.sendEmail({
        to: "assessoriaraizz@gmail.com",
        subject: "⚠️ Falha na notificação de qualificação (WhatsApp)",
        body: "A automação de WhatsApp da página de qualificação do Protocolo falhou depois de " + PVG_MAX_TENTATIVAS + " tentativas.\n\nErro: " + erro.message + "\n\nStack: " + erro.stack
      });
    }
  }
}

function pvgProcessarRespostasNovas() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PVG_NOME_ABA_QUALIFICACAO);
  const linhaAtual = sheet.getLastRow();

  const props = PropertiesService.getScriptProperties();
  const ultimaLinha = Number(props.getProperty("pvgUltimaLinhaQualificacao") || 1); // linha 1 é cabeçalho

  if (linhaAtual <= ultimaLinha) return;

  for (let linha = ultimaLinha + 1; linha <= linhaAtual; linha++) {
    const dataHora = sheet.getRange(linha, PVG_COLUNA_DATA).getValue();
    const nome = sheet.getRange(linha, PVG_COLUNA_NOME).getValue();
    const telefone = sheet.getRange(linha, PVG_COLUNA_TELEFONE).getValue();
    const email = sheet.getRange(linha, PVG_COLUNA_EMAIL).getValue();
    const temLoja = sheet.getRange(linha, PVG_COLUNA_TEM_LOJA).getValue();
    const instagram = sheet.getRange(linha, PVG_COLUNA_INSTAGRAM_LOJA).getValue();

    if (!dataHora) continue; // linha vazia, pula

    const horario = pvgFormatarData(dataHora);

    const mensagem =
      "🎉 *Compra qualificada — Protocolo Visita Garantida*\n\n" +
      "*Nome:* " + (nome || "não informado") + "\n" +
      "*Telefone:* " + (telefone || "não informado") + "\n" +
      "*E-mail:* " + (email || "não informado") + "\n" +
      "*Possui loja de carros?* " + (temLoja || "não informado") + "\n" +
      "*Instagram da loja:* " + (instagram || "não informado") + "\n\n" +
      "*Respondido em:* " + horario;

    pvgEnviarMensagemWhatsapp(mensagem, props);
  }

  props.setProperty("pvgUltimaLinhaQualificacao", linhaAtual.toString());
}

function pvgFormatarData(valor) {
  if (valor instanceof Date) {
    return Utilities.formatDate(valor, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");
  }
  return String(valor);
}

function pvgEnviarMensagemWhatsapp(mensagem, props) {
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
function pvgInicializarUltimaLinha() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PVG_NOME_ABA_QUALIFICACAO);
  const props = PropertiesService.getScriptProperties();
  props.setProperty("pvgUltimaLinhaQualificacao", String(sheet.getLastRow()));
  Logger.log("Última linha marcada como processada (qualificação): " + sheet.getLastRow());
}

/**
 * Roda manualmente pra testar o envio sem esperar resposta nova.
 */
function pvgTestarEnvioWhatsapp() {
  const props = PropertiesService.getScriptProperties();
  pvgEnviarMensagemWhatsapp("✅ Teste de conexão — automação de qualificação pós-compra configurada com sucesso.", props);
}
