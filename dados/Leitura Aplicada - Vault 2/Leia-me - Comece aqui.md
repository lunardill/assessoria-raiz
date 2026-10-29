---
cssclasses:
  - guia
---

![[logo.png|240]]

Aqui cada livro vira **uma nota só**, da indicação até a síntese final. E o **[[Painel de Leitura]]**
mostra sozinho o que você está lendo, o que vem a seguir e o que já leu.

## Comece agora: seu primeiro livro

> [!tip] Em 3 cliques
> 1. Na barra da esquerda, clique com o botão direito na pasta **Livros** → **Nova nota**.
> 2. Escreva o nome de um livro que alguém te indicou.
> 3. No topo da nota, preencha **`fonte`** (quem indicou), **`tema`** e **`prioridade`**.
>
> Pronto. Abra o **[[Painel de Leitura]]** e veja o seu livro lá.
>
> **Quer a capa no painel?** Procure a capa do livro na internet, clique com o botão direito na
> imagem → **Copiar endereço da imagem** e cole no campo **`capa`**.

## Como o livro avança

Pra um livro mudar de fase, você muda **uma palavra** no topo da nota: a `situacao`.

![[fluxo.png|640]]

> [!note] Fase 1: Indicado
> ![[estagio-1.png|96]]
> **Quando:** alguém te indicou um livro.
> - É o que você acabou de fazer lá em cima.
> - Escreva em 1 a 3 linhas por que ele entrou na lista.
>
> **No painel:** aparece em "Indicados", na aba da prioridade que você escolheu, e em "Explorar".
>
> **Já decidiu que é o próximo?** Troque `situacao` pra `na fila` e dê uma posição em `posicao_fila`
> (1 é o próximo, depois 2, 3...). Ele vai pra "Estante", aba "Na fila", em ordem.

> [!tip] Fase 2: Vai começar a ler
> ![[estagio-2.png|96]]
> **Quando:** antes de abrir a primeira página.
> - Troque `situacao` pra `lendo` e preencha `data_inicio`.
> - Se quiser ver o progresso: `paginas_total` e `data_prevista` (quando pretende terminar).
> - Responda a **parte 2** da nota: por que agora, o que espera tirar, folheada e ideia central.
>
> **No painel:** o livro vai pra "Lendo agora", com a capa, a barra de progresso e quantas páginas
> por dia faltam pra terminar na data prevista. As páginas lidas você atualiza ali mesmo.

> [!example] Fase 3: Durante a leitura
> ![[estagio-3.png|96]]
> **Quando:** a cada sessão ou capítulo.
> - Use a **parte 3**: resumo, até 5 insights, a decisão e uma ação de 15 a 30 minutos.
> - Pra uma sessão nova, copie o bloco "Sessão 01" e troque o número.

> [!success] Fase 4: Terminou
> ![[estagio-4.png|96]]
> **Quando:** acabou a última página.
> - Troque `situacao` pra `concluido`, preencha `data_fim` e dê uma `avaliacao` de 1 a 5.
> - Feche a **parte 4**: 5 ideias, 3 decisões e 1 projeto (ou "nenhum").
>
> **No painel:** vai pra "Estante", aba "Lidos", com as estrelas, e entra no cronograma.

> [!warning] Parou no meio?
> Troque `situacao` pra `pausado` e deixe `paginas_lidas` na página onde parou. O livro vai pra
> "Estante", aba "Pausados", mostrando onde você parou. Pra voltar, é só trocar pra `lendo` de novo.

Dentro de cada parte da nota tem uma caixinha **💡 Como usar esta parte**, fechada. Clique nela
quando tiver dúvida.

## O painel

> [!info] No [[Painel de Leitura]] você vê
> - 📊 **Resumo:** quantos livros você leu no ano, a média de dias, o que está lendo, a fila e os indicados
> - 📖 **Lendo agora:** cada livro com capa, progresso e previsão. Atualize as páginas lidas direto no cartão
> - 📚 **Estante:** abas Na fila (em ordem), Lidos (com estrelas) e Pausados
> - 🗓 **Cronograma:** uma linha do tempo de quando você leu cada livro
> - 🔥 **Indicados:** abas por prioridade (alta, média e normal)
> - 🧭 **Explorar:** por tema (apareceu um problema? o livro certo já está esperando) e por autor
>
> Nas faixas com muitos livros, arraste pro lado pra ver o resto.

## Ligar ideias

> [!abstract] O gráfico da esquerda
> Mostra com quais notas a nota aberta se liga. Pra criar uma ligação, escreva o nome de uma ideia
> entre `[[ ]]` dentro da nota do livro e clique nela. A nota da ideia nasce na pasta **Ideias**.
>
> Veja o exemplo: abra [[Maldição do Conhecimento]] e olhe o gráfico.

## Os exemplos

As notas com "(exemplo)" no nome são livros reais da minha leitura, um em cada fase, e a pasta
`Ideias` tem uma ideia ligada a um deles. Servem pra você ver o painel preenchido e como fica uma
nota bem usada. Apague quando quiser.

## Algo não funciona?

> [!question]- O painel está vazio ou a nota nova veio em branco
> O Obsidian abriu o vault em **modo restrito**, e os plugins ficaram desligados.
> Vá em **Configurações → Plugins da comunidade** e desligue o modo restrito. Depois feche e abra
> o Obsidian de novo.

> [!question]- Um livro sumiu do painel
> Confira a palavra no campo `situacao` ou `prioridade`. O painel entende estas:
>
> | Campo | Palavras |
> |---|---|
> | `situacao` | `indicado`, `na fila`, `lendo`, `concluido` ou `pausado` |
> | `prioridade` | `alta`, `média` ou `fila normal` |

> [!question]- Uma data aparece como texto, não como data
> Clique no ícone ao lado do nome do campo (por exemplo `data_inicio`) e escolha **Data**. Pros
> campos de páginas, posição e avaliação, escolha **Número**.

> [!question]- Quero o modo escuro
> Vá em **Configurações → Aparência** e escolha o modo escuro. O visual do Leitura Aplicada
> continua, só que em versão noturna.

---

*Leitura Aplicada, vault v1.1 (outubro de 2026)*
