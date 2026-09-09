# Fase 7 — Roteiro de criativo

Cria roteiro de criativo de anúncio (vídeo ou estático) pra vender o produto low ticket via
tráfego pago, usando a estrutura PRSA (Problema, Rota, Solução, Ação) e o banco de formatos
validados.

**Essa fase pode ser chamada direto, sem passar pelas fases 0-6**, quando o produto já existe e o
usuário só quer roteiro de criativo novo.

## Dependências

Ler sempre antes de gerar qualquer roteiro:

- **Banco de formatos validados** (mecânica, ganchos e exemplos de cada um):
  `conteudo/criativos-low-ticket/banco-formatos.md` — fonte da verdade, não duplicar aqui. Se o
  arquivo mudar, o comportamento da fase muda junto. Formatos de vídeo: Analogia, Selfie em
  movimento, Objeto estranho, Situação estranha, Narrativo, Teatrinho, Caixinha de perguntas, Dedo
  na tela, Diálogo/Prova social, Podcast. Formatos estáticos: Resposta simulada, Print de
  WhatsApp, Falsa notícia, Comparativo, Escolha seu lado, Placa de papelão, Ainda tem vaga.
- **Brief do produto**: `conteudo/criativos-low-ticket/produtos/[nome-do-produto].md` — dor,
  desejo, oferta, objeções e prova. Vem da Fase 0 se o produto foi criado por essa skill; se não
  existir ainda, criar seguindo o Passo 1 abaixo.
- **Tom de voz geral do negócio**: `_contexto/preferencias.md` — mas ver a nota de tom abaixo,
  esse gênero tem exceção deliberada.

Diferente da skill `/conteudo` (roteiro institucional pra construir autoridade): aqui o objetivo é
vender o produto na hora.

## Nota de tom (importante, não é omissão)

`_contexto/preferencias.md` pede pra evitar "tá" em contexto profissional. **Essa regra não se
aplica aqui.** Roteiro de criativo é fala pra câmera, venda direta, persona de criador de
infoproduto — diferente da voz institucional da agência. O padrão validado usa "tá", "né", "cara",
repetição e ênfase oral de propósito, porque é assim que os criativos de referência convertem.
Sempre calibrar pelo tom dos exemplos em `banco-formatos.md`, não pela regra de preferencias.md
pra essa fase específica.

O que continua valendo de preferencias.md: nada de jargão vazio de marketing, nada de frase em
espelho tipo "não é sobre X, é sobre Y", nada de formalidade excessiva. Fala natural de venda, não
"cara de curso de copy".

## Workflow

### Passo 1 — Identificar o produto

Perguntar (se não tiver ficado claro): "Qual produto é esse criativo?"

- Se já existir brief em `conteudo/criativos-low-ticket/produtos/`, usar direto — não perguntar de
  novo dor/desejo/oferta que já estão documentados lá.
- Se for produto novo sem brief, voltar pra `fases/fase-0-definicao-produto.md` antes de escrever
  qualquer roteiro.

### Passo 2 — Escolher o formato

- Se o usuário já pediu um formato específico ("faz um de Teatrinho", "testa Selfie em
  movimento"), usar esse.
- Se não especificou, listar os formatos de `banco-formatos.md` com uma linha de descrição cada
  (separando vídeo de estático) e perguntar qual testar — ou sugerir um com base no que ainda não
  foi testado pra esse produto (ver Passo 6).
- **Regra fixa:** sempre que o usuário disser algo como "outro formato", "outro estilo", "faz mais
  um" sem especificar qual, nunca escolher sozinho e seguir direto — sempre perguntar qual formato
  ele quer, ou dar uma sugestão explícita (nomeando o formato) e esperar confirmação antes de
  escrever o roteiro.

### Passo 3 — Escrever o roteiro com estrutura PRSA

Sempre nessa ordem lógica, ainda que o gancho do formato entre antes do "Problema" explícito:

1. **Gancho** — a mecânica visual/verbal do formato escolhido (ver `banco-formatos.md`), adaptada
   com os dados reais do produto (nunca deixar `[PLACEHOLDER]` no roteiro final — preencher com a
   dor/desejo/prova reais do brief).
2. **Problema** — nomeia a dor específica da persona.
3. **Rota** — contraste entre o jeito que não funciona (o que a persona já tenta) e o caminho
   certo.
4. **Solução** — apresenta o produto como a rota concreta, com 1-2 entregáveis específicos da
   oferta (não listar a oferta inteira, isso é papel da página de venda).
5. **Ação** — CTA direto ("toca em Saiba Mais", "garante o seu agora").

Formato de saída depende do tipo:

**Vídeo:** roteiro corrido de fala (como os exemplos do banco), com uma nota de direção de cena no
topo quando o formato exigir (ex: "[CENA: caminhando com carro de luxo ao fundo]", "[CENA: aponta
pro print de ROI, depois vira pra câmera]").

**Estático:** descrição da imagem/composição visual + o texto exato que vai no card, seguindo a
estrutura do formato (ex: pergunta/resposta, checklist antes-depois).

### Passo 4 — Regra de honestidade nos números e prova

Nunca inventar número de resultado, depoimento ou prova social que não esteja no brief do produto
ou que o usuário não confirmou. Se o formato pedir uma prova específica (print de ROI, depoimento,
resultado em R$) e não tiver dado real disponível, marcar `[PREENCHER COM DADO REAL]` no lugar e
avisar o usuário — nunca preencher com invenção.

### Passo 5 — Entregar

**Não salvar arquivo por padrão.** Entregar o roteiro direto no chat. Só salvar em
`conteudo/criativos-low-ticket/roteiros/[produto]-[formato]-[data].md` se o usuário pedir
explicitamente ("salva esse", "guarda isso").

### Passo 6 — Registrar o teste

Manter uma tabela de controle no fim do brief do produto
(`conteudo/criativos-low-ticket/produtos/[produto].md`), seção "Criativos testados":

| Data | Formato | Resultado | Observação |
|------|---------|-----------|------------|

Quando o usuário voltar informando o resultado do criativo (rodou, ROI, se vale repetir o
formato), atualizar essa linha. Usar esse histórico pra sugerir formato ainda não testado no
Passo 2, evitando repetir sempre o mesmo.

## Regras

- **Vocabulário sempre específico do nicho do produto, nunca genérico.** Usar o vocabulário real
  da persona do brief (ex: pro Protocolo Visita Garantida, termos de loja de carro — km, troca,
  test-drive, financiamento, tabela — em vez de "vendedor"/"cliente" genérico).
- **Tom segue o padrão validado de `banco-formatos.md`, não a regra geral de "tá" de
  preferencias.md** — ver nota de tom acima.
- **Nunca inventar prova, número ou depoimento** — se não tiver dado real, marcar
  `[PREENCHER COM DADO REAL]` e avisar.
- **Nunca deixar placeholder de gancho sem preencher** no roteiro final — todo `[DOR DA PERSONA]`,
  `[DESEJO DA PERSONA]` etc. do banco de formatos precisa virar texto real específico do produto
  antes de entregar.
- Estrutura PRSA é fixa; o formato/gancho é a variável de teste.
- Se o produto ainda não tem brief salvo, voltar pra `fases/fase-0-definicao-produto.md` — não
  assumir dor/desejo genérico.
- Ao criar brief de produto novo, seguir o modelo de `protocolo-visita-garantida.md` (mesmas
  seções).
