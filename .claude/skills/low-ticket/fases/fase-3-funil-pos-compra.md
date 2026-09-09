# Fase 3 — Funil pós-compra

## Por que existe

A Hotmart não passa de forma confiável os dados do comprador (nome, telefone, e-mail) pra uma
página de obrigado externa via URL — por isso, se quiser coletar dado adicional de qualificação
(ex: "possui loja própria?", Instagram do negócio), o jeito é pedir de novo numa página própria,
sem repetir o que a Hotmart já tem certeza que vai ter (não pedir nome/telefone/e-mail de novo se
não for por esse motivo).

## Duas páginas

1. **`/[produto]/qualificacao`** — formulário curto (só o que não dá pra saber por outro canal).
   Todos os campos obrigatórios, a menos que o usuário peça o contrário.
2. **`/[produto]/obrigado`** — confirmação final ("fica de olho no seu e-mail, é lá que chega o
   acesso").

Fluxo: Hotmart (compra aprovada) → `/qualificacao` → `/obrigado`.

**Honestidade na copy da página de qualificação:** se usar linguagem de urgência tipo "não pule
essa etapa, você precisa preencher pra acessar o produto" (padrão comum em página de referência
low ticket), ter em mente que isso não é tecnicamente verdade — o acesso já foi liberado pela
Hotmart independente do formulário. Avisar o usuário dessa nuance antes de implementar esse tipo de
copy, mesmo que ele decida usar mesmo assim.

## Automação (planilha + WhatsApp)

Fica em `administrativo/automacoes/[produto]-pos-compra/`, dois arquivos:

- `receber-respostas.gs` — `doPost(e)` que recebe o POST do formulário (via `fetch` da página,
  content-type `text/plain` pra evitar preflight de CORS) e grava linha na planilha.
- `avisar-whatsapp.gs` — gatilho de tempo que varre linha nova da planilha e manda mensagem pro
  grupo via Z-API.

**Coleta tudo numa linha só** (nome, telefone, e-mail, + campos de qualificação) — não tentar
separar "dado da Hotmart" de "dado do formulário" em abas diferentes achando que webhook da
Hotmart vai completar a outra parte automaticamente. Sem um identificador em comum confiável entre
os dois eventos (webhook de compra x formulário preenchido depois), correlacionar automaticamente
é frágil — mais simples e confiável pedir tudo de uma vez no formulário, mesmo que pareça
redundante com o que a Hotmart "já sabe".

## Cuidado: projeto Apps Script compartilhado

Ver `fases/fase-4-tracking.md`, seção de infraestrutura compartilhada — o mesmo cuidado de prefixo
único em nome de `const`/`function` vale aqui. A função `doPost` é a única exceção (nome fixo,
exigido pelo Apps Script) — se o projeto já tiver um `doPost` de outra automação, avisar o usuário
que precisa unificar a lógica dos dois num só, não dá pra ter dois.

**Depois de editar o código, sempre criar Nova Versão da implantação** (Implantar → Gerenciar
implantações → editar → Nova versão) antes de considerar testado — rodar a função manualmente no
editor usa sempre a versão mais recente, mas a URL pública (`/exec`) só atualiza depois desse
passo. Já causou bug real (formulário funcionando no teste manual, mas não na página de verdade)
mais de uma vez.

## Depois de testar

Sempre que rodar teste de verdade (preenchendo o formulário), apagar a linha de teste da planilha
e rodar a função de "inicializar última linha" de novo — senão o contador do aviso de WhatsApp
pode pular a próxima resposta real.
