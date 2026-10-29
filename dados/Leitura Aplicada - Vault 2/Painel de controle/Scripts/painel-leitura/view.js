// Painel de Leitura: cada bloco da nota chama este arquivo com uma seção.
// dv.view("Painel de controle/Scripts/painel-leitura", { secao: "lendo" })
// Seções: resumo, lendo, estante, cronograma, indicados, explorar.

const PASTA_LIVROS = '"Livros"';
const PASTA_MAPAS = "Mapas mentais/Livros";
const MODELO_MAPA = "Painel de controle/Modelos/Modelo - Mapa mental.xmind";

const livros = dv.pages(PASTA_LIVROS).array();
const hoje = dv.luxon.DateTime.now().startOf("day");
const raiz = dv.container.createDiv({ cls: "plv" });

// ---------- ajudantes ----------
const norm = s => String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[_-]/g, " ").trim();
const sit = p => norm(p.situacao);
const prio = p => { const v = norm(p.prioridade); return v === "alta" ? "alta" : v === "media" ? "media" : "normal"; };
const data = v => { if (!v) return null; const d = dv.date(v); return d && d.isValid ? d.startOf("day") : null; };
const fmt = d => d ? d.toFormat("dd/MM/yy") : "-";
const num = v => { const n = Number(v); return Number.isFinite(n) && n > 0 ? n : null; };
const nomeArq = s => String(s).replace(/[\\/:*?"<>|]/g, "");
const por = (lista, chave, desc = false) => [...lista].sort((a, b) => {
  const x = chave(a), y = chave(b);
  if (x == null && y == null) return 0;
  if (x == null) return 1;
  if (y == null) return -1;
  return (x < y ? -1 : x > y ? 1 : 0) * (desc ? -1 : 1);
});

const de = s => livros.filter(p => sit(p) === s);
const lendo = () => de("lendo");
const naFila = () => por(de("na fila"), p => num(p.posicao_fila));
const lidos = () => por(de("concluido"), p => data(p.data_fim)?.toMillis(), true);
const pausados = () => de("pausado");
const indicados = () => de("indicado");

function abrir(el, p) {
  el.addEventListener("click", e => {
    e.preventDefault();
    app.workspace.openLinkText(p.file.path, dv.currentFilePath, e.metaKey || e.ctrlKey);
  });
}

function link(pai, p) {
  const a = pai.createEl("a", { cls: "plv-link", text: p.file.name, href: "#" });
  abrir(a, p);
  return a;
}

function srcCapa(p) {
  const c = p.capa;
  if (!c) return null;
  if (typeof c === "object" && c.path) {
    const f = app.metadataCache.getFirstLinkpathDest(c.path, p.file.path);
    return f ? app.vault.getResourcePath(f) : null;
  }
  return String(c);
}

function capa(pai, p) {
  const box = pai.createDiv({ cls: "plv-capa" });
  const src = srcCapa(p);
  if (src) {
    const img = box.createEl("img", { attr: { src, alt: "", loading: "lazy" } });
    img.addEventListener("error", () => { img.remove(); box.createDiv({ cls: "plv-capa-vazia", text: p.file.name }); });
  } else {
    box.createDiv({ cls: "plv-capa-vazia", text: p.file.name });
  }
  return box;
}

function vazio(pai, texto) {
  pai.createDiv({ cls: "plv-vazio", text: texto });
}

function estrelas(n) {
  const v = Math.max(0, Math.min(5, Math.round(Number(n) || 0)));
  return v ? "★".repeat(v) + "☆".repeat(5 - v) : null;
}

function abas(pai, defs) {
  const barra = pai.createDiv({ cls: "plv-abas", attr: { role: "tablist" } });
  const corpo = pai.createDiv({ cls: "plv-aba-corpo" });
  const botoes = defs.map(([nome], i) => {
    const b = barra.createEl("button", { cls: "plv-aba", text: nome, attr: { type: "button", role: "tab" } });
    b.addEventListener("click", () => mostrar(i));
    return b;
  });
  function mostrar(i) {
    botoes.forEach((b, j) => { b.toggleClass("is-ativa", i === j); b.setAttr("aria-selected", String(i === j)); });
    corpo.empty();
    defs[i][1](corpo);
  }
  mostrar(0);
}

function galeria(pai, lista, extra) {
  if (!lista.length) return false;
  const g = pai.createDiv({ cls: "plv-galeria" });
  for (const p of lista) {
    const c = g.createDiv({ cls: "plv-card", attr: { tabindex: "0", role: "link", "aria-label": p.file.name } });
    abrir(c, p);
    c.addEventListener("keydown", e => { if (e.key === "Enter") c.click(); });
    capa(c, p);
    c.createDiv({ cls: "plv-titulo", text: p.file.name });
    if (p.autor) c.createDiv({ cls: "plv-autor", text: String(p.autor) });
    extra?.(c, p);
  }
  return true;
}

function tabela(pai, lista, colunas) {
  if (!lista.length) return false;
  const wrap = pai.createDiv({ cls: "plv-tabela-wrap" });
  const t = wrap.createEl("table", { cls: "plv-tabela" });
  const h = t.createEl("thead").createEl("tr");
  h.createEl("th", { text: "Livro" });
  for (const [nome] of colunas) h.createEl("th", { text: nome });
  const corpo = t.createEl("tbody");
  for (const p of lista) {
    const tr = corpo.createEl("tr");
    link(tr.createEl("td"), p);
    for (const [, valor] of colunas) tr.createEl("td", { text: valor(p) ?? "-" });
  }
  return true;
}

async function salvar(p, campo, valor) {
  const f = app.vault.getAbstractFileByPath(p.file.path);
  if (!f) return;
  await app.fileManager.processFrontMatter(f, fm => { fm[campo] = valor; });
}

function campoNumero(pai, rotulo, valorAtual, aoSalvar) {
  const l = pai.createEl("label", { cls: "plv-campo" });
  l.createSpan({ text: rotulo });
  const inp = l.createEl("input", { attr: { type: "number", min: "0", inputmode: "numeric", value: valorAtual ?? "", placeholder: "0" } });
  const ok = l.createSpan({ cls: "plv-ok", attr: { "aria-live": "polite" } });
  l.addEventListener("click", e => e.stopPropagation());
  inp.addEventListener("keydown", e => { if (e.key === "Enter") inp.blur(); });
  inp.addEventListener("change", async () => {
    const v = Number(inp.value);
    if (inp.value === "" || !Number.isFinite(v) || v < 0) return;
    await aoSalvar(Math.round(v));
    ok.setText("salvo");
  });
}

// ---------- seções ----------
function resumo() {
  const ano = hoje.year;
  const doAno = lidos().filter(p => data(p.data_fim)?.year === ano);
  const dias = lidos()
    .map(p => { const i = data(p.data_inicio), f = data(p.data_fim); return i && f ? Math.round(f.diff(i, "days").days) : null; })
    .filter(d => d != null && d >= 0);
  const media = dias.length ? Math.round(dias.reduce((a, b) => a + b, 0) / dias.length) : "-";
  const tiles = [
    [doAno.length, `livros lidos em ${ano}`],
    [media, "dias em média por livro"],
    [lendo().length, "lendo agora"],
    [naFila().length, "na fila"],
    [indicados().length, "indicados"],
  ];
  const w = raiz.createDiv({ cls: "la-stats" });
  for (const [n, l] of tiles) {
    const t = w.createDiv({ cls: "la-stat" });
    t.createDiv({ cls: "la-stat-n", text: String(n) });
    t.createDiv({ cls: "la-stat-l", text: l });
  }
}

function lendoAgora() {
  const lista = por(lendo(), p => data(p.data_inicio)?.toMillis(), true);
  if (!lista.length) return vazio(raiz, "Nenhum livro com situação lendo. Quando começar um, mude a situação dele pra lendo.");
  const g = raiz.createDiv({ cls: "plv-lendo-grade" });
  for (const p of lista) {
    const c = g.createDiv({ cls: "plv-lendo-card" });
    const cp = capa(c, p);
    cp.addClass("plv-clicavel");
    abrir(cp, p);
    const info = c.createDiv({ cls: "plv-lendo-info" });
    link(info.createDiv({ cls: "plv-titulo plv-titulo-g" }), p);
    if (p.autor) info.createDiv({ cls: "plv-autor", text: String(p.autor) });

    const total = num(p.paginas_total);
    const lidas = num(p.paginas_lidas) ?? 0;
    const pct = total ? Math.min(100, Math.round((lidas / total) * 100)) : null;
    const barra = info.createDiv({ cls: "plv-barra", attr: { role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": String(pct ?? 0) } });
    barra.createDiv({ cls: "plv-barra-fill" }).style.width = `${pct ?? 0}%`;
    info.createDiv({ cls: "plv-meta", text: total ? `${lidas} de ${total} páginas (${pct}%)` : "Preencha o total de páginas pra ver o progresso" });

    const inicio = data(p.data_inicio), prev = data(p.data_prevista);
    const linhas = [];
    if (inicio) linhas.push(`Começou em ${fmt(inicio)}`);
    if (prev) {
      const faltam = Math.round(prev.diff(hoje, "days").days);
      linhas.push(faltam >= 0 ? `Previsão ${fmt(prev)} (faltam ${faltam} dias)` : `Previsão era ${fmt(prev)} (passou ${-faltam} dias)`);
      if (total && faltam > 0 && lidas < total) linhas.push(`Ritmo pra chegar lá: ${Math.ceil((total - lidas) / faltam)} páginas por dia`);
    }
    if (linhas.length) info.createDiv({ cls: "plv-meta", text: linhas.join(" · ") });

    const campos = info.createDiv({ cls: "plv-campos" });
    campoNumero(campos, "Páginas lidas", p.paginas_lidas, v => salvar(p, "paginas_lidas", v));
    if (!total) campoNumero(campos, "Total", null, v => salvar(p, "paginas_total", v));

    const caminhoMapa = `${PASTA_MAPAS}/${nomeArq(p.file.name)}.xmind`;
    // O botão só aparece se o vault tiver o modelo do Xmind (o vault do produto não tem).
    if (app.vault.getAbstractFileByPath(MODELO_MAPA) && !app.vault.getAbstractFileByPath(caminhoMapa)) {
      const b = info.createEl("button", { cls: "plv-botao", text: "Criar mapa mental", attr: { type: "button" } });
      b.addEventListener("click", async e => {
        e.stopPropagation();
        await app.vault.copy(app.vault.getAbstractFileByPath(MODELO_MAPA), caminhoMapa);
        b.setText("Mapa criado em Mapas mentais/Livros");
        b.disabled = true;
      });
    }
  }
}

function estante() {
  const fila = naFila(), feitos = lidos(), parados = pausados();
  abas(raiz, [
    [`Na fila (${fila.length})`, el => {
      galeria(el, fila, (c, p) => {
        const pos = num(p.posicao_fila);
        if (pos) c.createDiv({ cls: "plv-selo", text: `${pos}º` });
        if (p.tema) c.createDiv({ cls: "plv-meta", text: String(p.tema) });
      }) || vazio(el, "Fila vazia. Quando decidir o próximo livro, mude a situação dele pra na fila e dê uma posição (1, 2, 3...).");
    }],
    [`Lidos (${feitos.length})`, el => {
      galeria(el, feitos, (c, p) => {
        const s = estrelas(p.avaliacao);
        if (s) c.createDiv({ cls: "plv-estrelas", text: s, attr: { "aria-label": `${p.avaliacao} de 5` } });
        if (data(p.data_fim)) c.createDiv({ cls: "plv-meta", text: `Terminou em ${fmt(data(p.data_fim))}` });
      }) || vazio(el, "Nenhum livro concluído ainda.");
    }],
    [`Pausados (${parados.length})`, el => {
      galeria(el, parados, (c, p) => {
        const total = num(p.paginas_total), lidas = num(p.paginas_lidas);
        if (total && lidas) c.createDiv({ cls: "plv-meta", text: `Parou na página ${lidas} de ${total}` });
      }) || vazio(el, "Nenhum livro pausado.");
    }],
  ]);
}

function cronograma() {
  const itens = livros
    .filter(p => ["lendo", "concluido", "pausado"].includes(sit(p)) && data(p.data_inicio))
    .map(p => {
      const ini = data(p.data_inicio);
      const fim = sit(p) === "concluido" ? (data(p.data_fim) ?? hoje) : hoje;
      const prev = sit(p) === "lendo" ? data(p.data_prevista) : null;
      return { p, ini, fim, prev };
    });
  if (!itens.length) return vazio(raiz, "Nenhum livro lido, lendo ou pausado com data de início.");

  // Janela: do mês do livro mais antigo até um mês depois da previsão mais distante.
  const inicioJanela = itens.reduce((m, i) => (i.ini < m ? i.ini : m), hoje).startOf("month");
  const maisLonge = itens.reduce((m, i) => (i.prev && i.prev > m ? i.prev : m), hoje);
  const fimJanela = maisLonge.plus({ months: 1 }).endOf("month");
  const span = fimJanela.diff(inicioJanela, "days").days;
  const x = d => Math.max(0, Math.min(100, (d.diff(inicioJanela, "days").days / span) * 100));
  const nMeses = Math.ceil(fimJanela.diff(inicioJanela, "months").months);

  const box = raiz.createDiv({ cls: "plv-crono" });
  box.style.setProperty("--plv-meses", String(nMeses));
  const cab = box.createDiv({ cls: "plv-crono-linha plv-crono-cab" });
  cab.createDiv({ cls: "plv-crono-nome" });
  const meses = cab.createDiv({ cls: "plv-trilho" });
  for (let m = inicioJanela; m < fimJanela; m = m.plus({ months: 1 })) {
    const mostraAno = m.month === 1 || m.equals(inicioJanela);
    const rot = meses.createDiv({ cls: "plv-mes", text: m.setLocale("pt-BR").toFormat(mostraAno ? "LLL yy" : "LLL").replace(".", "") });
    rot.style.left = `${x(m)}%`;
  }

  for (const { p, ini, fim, prev } of por(itens, i => i.ini.toMillis(), true)) {
    const linha = box.createDiv({ cls: "plv-crono-linha" });
    link(linha.createDiv({ cls: "plv-crono-nome" }), p);
    const trilho = linha.createDiv({ cls: "plv-trilho" });
    const a = x(ini), b = Math.max(x(fim), a + 0.6);
    const bloco = trilho.createDiv({ cls: `plv-bloco plv-${sit(p)}` });
    bloco.style.left = `${a}%`;
    bloco.style.width = `${b - a}%`;
    bloco.setAttr("title", `${p.file.name}: ${fmt(ini)} até ${fmt(fim)}`);
    if (prev && prev > fim) {
      const r = trilho.createDiv({ cls: "plv-bloco plv-previsto" });
      r.style.left = `${b}%`;
      r.style.width = `${x(prev) - b}%`;
      r.setAttr("title", `Previsão: ${fmt(prev)}`);
    }
    trilho.createDiv({ cls: "plv-hoje" }).style.left = `${x(hoje)}%`;
  }
  // Abre rolado até hoje, com um pouco de folga pra previsão aparecer à direita.
  setTimeout(() => {
    const trilho = box.querySelector(".plv-crono-cab .plv-trilho");
    if (!trilho) return;
    const hojePx = trilho.offsetLeft + (trilho.offsetWidth * x(hoje)) / 100;
    box.scrollLeft = Math.max(0, hojePx - box.clientWidth * 0.7);
  }, 50);
  const leg = raiz.createDiv({ cls: "plv-legenda" });
  for (const [cls, txt] of [["plv-concluido", "lido"], ["plv-lendo", "lendo"], ["plv-previsto", "previsão"], ["plv-pausado", "pausado"]]) {
    const i = leg.createSpan({ cls: "plv-leg-item" });
    i.createSpan({ cls: `plv-leg-cor ${cls}` });
    i.createSpan({ text: txt });
  }
}

function indicadosPorPrioridade() {
  const lista = por(indicados(), p => data(p.data_adicionado)?.toMillis(), true);
  const cols = [
    ["Tema", p => p.tema ? String(p.tema) : null],
    ["Quem indicou", p => p.fonte ? String(p.fonte) : null],
    ["Adicionado", p => data(p.data_adicionado) ? fmt(data(p.data_adicionado)) : null],
  ];
  const grupos = [["Alta", "alta"], ["Média", "media"], ["Normal", "normal"]];
  abas(raiz, grupos.map(([nome, chave]) => {
    const sub = lista.filter(p => prio(p) === chave);
    return [`${nome} (${sub.length})`, el => { tabela(el, sub, cols) || vazio(el, "Nenhum indicado com essa prioridade."); }];
  }));
}

function agrupar(lista, chave) {
  const m = new Map();
  for (const p of lista) {
    const k = chave(p);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(p);
  }
  return [...m.entries()];
}

function grupos(el, pares, rotulo) {
  const w = el.createDiv({ cls: "plv-grupos" });
  for (const [nome, lista] of pares) {
    const g = w.createDiv({ cls: "plv-grupo" });
    const h = g.createDiv({ cls: "plv-grupo-nome" });
    h.createSpan({ text: nome });
    h.createSpan({ cls: "plv-conta", text: String(lista.length) });
    const chips = g.createDiv({ cls: "plv-chips" });
    for (const p of lista) {
      const c = chips.createDiv({ cls: "plv-chip" });
      link(c, p);
      const r = rotulo?.(p);
      if (r) c.createSpan({ cls: "plv-chip-sit", text: r });
    }
  }
}

function explorar() {
  abas(raiz, [
    ["Por tema", el => {
      el.createDiv({ cls: "plv-dica", text: "O que ainda não leu (indicados e na fila), pelo problema que cada livro resolve." });
      const lista = livros.filter(p => ["indicado", "na fila"].includes(sit(p)));
      const pares = agrupar(lista, p => p.tema ? String(p.tema) : "sem tema")
        .sort((a, b) => (a[0] === "sem tema") - (b[0] === "sem tema") || a[0].localeCompare(b[0], "pt-BR"));
      pares.length ? grupos(el, pares, p => sit(p) === "na fila" ? "na fila" : null) : vazio(el, "Nada esperando.");
    }],
    ["Por autor", el => {
      el.createDiv({ cls: "plv-dica", text: "Todos os livros com autor preenchido, do autor com mais livros pro com menos." });
      const lista = livros.filter(p => p.autor);
      const pares = agrupar(lista, p => String(p.autor))
        .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "pt-BR"));
      pares.length ? grupos(el, pares, p => sit(p)) : vazio(el, "Nenhum livro com autor preenchido.");
    }],
  ]);
}

const secoes = { resumo, lendo: lendoAgora, estante, cronograma, indicados: indicadosPorPrioridade, explorar };
const fn = secoes[input?.secao];
if (fn) fn();
else vazio(raiz, `Seção desconhecida: ${input?.secao}. Use: ${Object.keys(secoes).join(", ")}.`);
