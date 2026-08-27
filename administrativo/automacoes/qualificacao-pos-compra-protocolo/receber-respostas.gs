/**
 * Recebe as respostas do formulário da página de qualificação
 * (qualificacao.html) e grava uma linha só, com tudo, na planilha.
 *
 * IMPORTANTE: esse projeto Apps Script é compartilhado com outras
 * automações que já existiam (notificacaoWhatsapp.gs, notificacaoMeetime.gs,
 * etc.) — os nomes de constante/função aqui levam o prefixo PVG_ / pvg
 * (Protocolo Visita Garantida) pra não colidir com nada que já existisse.
 *
 * A função doPost(e) É a exceção — esse nome é fixo, exigido pelo Apps
 * Script como ponto de entrada de um "App da Web". Se algum dos outros
 * arquivos desse projeto (notificacaoWhatsapp.gs, notificacaoMeetime.gs,
 * Código.gs) JÁ tiver uma função doPost própria, vai dar exatamente o
 * mesmo tipo de erro que já apareceu com COLUNA_NOME — só que nesse caso
 * não dá pra só renomear, porque doPost precisa ter esse nome exato. Se
 * acontecer, avisa que a gente resolve juntando a lógica dos dois doPost
 * num só (usando o campo dos dados recebidos pra decidir qual das duas
 * coisas fazer).
 *
 * Como publicar:
 *   1. Cria uma planilha nova no Google Sheets (ex: "Qualificação — Protocolo Visita Garantida").
 *   2. Nela, cria uma aba chamada exatamente "Vendas Hotmart" com o cabeçalho na linha 1:
 *      Data/Hora | Nome | Telefone | E-mail | Possui loja de carros? | Instagram da loja | Página
 *   3. Extensões > Apps Script, apaga o conteúdo padrão e cola este arquivo inteiro.
 *   4. Implantar > Nova implantação > tipo "App da Web".
 *      - Executar como: Eu (sua conta)
 *      - Quem pode acessar: Qualquer pessoa
 *   5. Copia a URL do App da Web gerada e cola no lugar de ENDPOINT_URL
 *      dentro de qualificacao.html (procure "COLE_AQUI_A_URL_DO_APPS_SCRIPT").
 *   6. Toda vez que editar o código depois de já implantado, tem que ir em
 *      Implantar > Gerenciar implantações > editar (lápis) > Nova versão,
 *      senão a URL antiga continua rodando o código velho.
 */

const PVG_NOME_ABA_RESPOSTAS = "Vendas Hotmart";

function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PVG_NOME_ABA_RESPOSTAS);
    sheet.appendRow([
      new Date(),
      dados.nome || "",
      dados.telefone || "",
      dados.email || "",
      dados.temLoja || "",
      dados.instagram || "",
      dados.pagina || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: erro.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Roda manualmente pra testar se a planilha/aba estão certas, sem precisar
 * mandar uma requisição de verdade.
 */
function pvgTestarGravacao() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PVG_NOME_ABA_RESPOSTAS);
  sheet.appendRow([
    new Date(),
    "Comprador Teste",
    "51999999999",
    "teste@exemplo.com",
    "Sim",
    "@teste_manual",
    "teste",
  ]);
  Logger.log("Linha de teste gravada com sucesso.");
}
