---
name: conteudo
description: >
  Cria roteiro de vídeo curto (Reels/TikTok) pra redes sociais da Assessoria Raiz, usando o método
  IHC (Identificação, História, Conteúdo) da Hanah Franklin e o banco de formatos validados (Tela
  dividida, Tela verde, Palestrinha, Dinamismo, Trivial). Consulta o banco de argumentos do ICP de
  lojas de veículos, testa formatos até achar o validado (3 acertos seguidos) e recomenda CTA sem
  aplicar por padrão. Use quando o usuário pedir "roteiro de conteúdo", "cria um vídeo sobre X",
  "roteiro pra Reels", "testa esse formato", "roteiro de análise de loja", ou chamar /conteudo.
---

# /conteudo — Roteiro de Conteúdo (método Hanah Franklin)

## Dependências

Ler sempre antes de gerar qualquer roteiro:

- **Contexto do negócio:** `_contexto/empresa.md`
- **Tom de voz:** `_contexto/preferencias.md` (aplicar à risca — inclui a regra específica de evitar "não é sobre X, é sobre Y" e malabarismo de frase em espelho)
- **Método completo, banco de argumentos, os 5 formatos e regra de validação:** `conteudo/roteiros-criativos/metodo-conteudo.md` — essa é a fonte da verdade, não duplicar o conteúdo aqui dentro. Se o arquivo mudar, o comportamento da skill muda junto.
- **Prompt de adaptação de roteiro viral** (usar só nos formatos Tela dividida e Palestrinha): `conteudo/roteiros-criativos/prompt-adaptacao-roteiro.md`

---

## Workflow

### Passo 1 — Entender o pedido

Identificar o tema/ideia do vídeo:
- Se o usuário já trouxe uma ideia clara, usar direto.
- Se não trouxe, oferecer sugestão puxando do banco de argumentos em `metodo-conteudo.md` (as 3 conclusões: identificação, confiança, prova). Perguntar qual conclusão ele quer reforçar nesse vídeo específico.

### Passo 2 — Escolher o formato

Ler a tabela "Formatos testados" em `metodo-conteudo.md`:
- Se algum formato já estiver com status **Validado** (bateu 3 acertos seguidos), sugerir esse primeiro como padrão — mas perguntar se o usuário quer testar outro formato mesmo assim.
- Se nenhum validado ainda, listar os 5 formatos com uma linha de descrição cada (Tela dividida, Tela verde, Palestrinha, Dinamismo, Trivial) e perguntar qual testar, ou sugerir o próximo lógico considerando o que já foi tentado.

### Passo 3 — Se o formato for Tela dividida ou Palestrinha

**Regra inegociável:** esses dois formatos exigem uma referência real de roteiro viral (link do vídeo + a análise de por que funcionou, ou o texto colado). Nunca gerar sem isso. Se o usuário não trouxer, pedir antes de continuar — não inventar história, personagem ou situação fictícia pra preencher a lacuna.

Usar `prompt-adaptacao-roteiro.md` como base do prompt de adaptação: manter a estrutura, os gatilhos e o nível de tensão emocional do roteiro de referência, trocando só o tema pelo nicho de lojas de veículos. Se o roteiro original citar pessoa/marca real, a nova versão também precisa citar pessoa/marca real, verificável, com fonte. Se não souber quem usar, dizer isso ao usuário — nunca preencher com invenção.

### Passo 4 — Escrever o roteiro

Estrutura IHC, sempre nessa ordem:
1. **Gancho de abertura** — tema de cultura pop (celebridade, filme/série, meme, livro, personagem, música) ou conflito universal (relacionamento, família, sonhos/medos, outros)
2. **Identificação** — "isso tem a ver comigo"
3. **História** — conexão emocional + prova do ponto, usando o banco de argumentos real (nunca inventar caso específico)
4. **Conteúdo** — a moral/direção: o ensinamento, a reflexão, a mudança de crença ou o serviço

Se o formato exigir direção de cena (Trivial, Tela verde, Dinamismo), incluir a ação em cena no topo do roteiro (ex: "fazendo café", "b-roll de trabalho").

Anotar cada trecho do roteiro com o gatilho usado entre colchetes, no padrão:
`[IDENTIFICAÇÃO — conflito universal: esforço sem resultado]`

Tom: seguir `_contexto/preferencias.md` estritamente. Frases curtas, diretas, sem gíria de internet genérica, sem cara de IA, sem o padrão "não é sobre X, é sobre Y". Nunca copiar o tom de exemplos de referência externos (ex: estilo solto de UGC "gente/mano/pô") — a mecânica se aplica, o tom não.

### Passo 5 — Recomendar CTA

Nunca aplicar CTA automaticamente. Analisar o objetivo daquele vídeo específico e dar uma recomendação justificada: incluir CTA (e qual tipo — engajamento leve como comentário/DM, ou oferta direta) ou deixar só a reflexão/moral. Lembrar sempre que a maioria dos vídeos NÃO deveria ter CTA comercial — variar é parte da estratégia, senão o perfil vira propaganda constante.

### Passo 6 — Salvar

Salvar o roteiro em `conteudo/roteiros-criativos/roteiro-[tema]-[data].md`.

### Passo 7 — Registrar o teste

Adicionar ou atualizar uma linha na tabela "Formatos testados" de `metodo-conteudo.md` com: data, formato, objetivo, resultado ("roteiro escrito, aguardando gravação"), status ("Em teste (x/3)").

### Passo 8 — Fechar o loop depois de gravado/postado

Quando o usuário voltar informando que gravou/postou e como foi o resultado:
- Atualizar a linha correspondente na tabela com o resultado real.
- Se funcionou, incrementar a contagem daquele formato.
- Ao bater **3 acertos seguidos** com o mesmo formato, marcar status **Validado ✅** e avisar o usuário. A partir daí, esse formato vira a sugestão padrão no passo 2 (sem travar a possibilidade de testar formato novo se o usuário quiser).

---

## Regras

- **Nunca inventar caso, pessoa ou situação fictícia** nos formatos Tela dividida e Palestrinha — regra inegociável, vem do material original da Hanah Franklin.
- **CTA nunca por padrão** — sempre recomendação justificada, nunca aplicação automática.
- **Tom segue `_contexto/preferencias.md` à risca**, incluindo a regra de evitar "não é sobre X, é sobre Y" e frases em espelho.
- **Mecânica sim, tom não** — nunca copiar o estilo de exemplos de referência trazidos de fora (UGC solto, gírias de outro nicho).
- **Piada/gatilho de nicho sempre mirando o público (donos e gerentes de loja de veículos), nunca a bolha da própria agência** (gestores de tráfego, colegas de profissão) — é fácil errar isso copiando referência de creator que fala pro próprio nicho profissional.
- Se o objetivo do vídeo não estiver claro, perguntar antes de gerar — não assumir.
- Formato e ideia de conteúdo são escolhas independentes: um objetivo + um formato + uma ideia específica, sempre.
