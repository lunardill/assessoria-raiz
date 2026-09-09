# Fase 1 — Página de vendas

## Onde fica

`conteudo/[nome-do-produto]/index.html` — HTML/CSS/JS num arquivo só, sem framework, sem
WordPress/Elementor. Imagens embutidas em base64 nesse arquivo "master" (necessário pra poder
publicar como Artifact de prévia durante o desenvolvimento) — a extração pra arquivo real de
imagem acontece só na hora de gerar a pasta de deploy, ver `fases/fase-5-performance.md`.

## Estrutura de referência (14 blocos)

Baseado no molde validado (mesma família dos 7 exemplos de referência já estudados):

1. Hero — headline de ruminação mental ("Eu sei... [dor específica], não é mesmo?")
2. Comparação antes/depois (duas imagens lado a lado)
3. Resultados reais (grade de prints/depoimentos verdadeiros)
4. Ruminação — bloco com as frases de diálogo interno da persona, sobre foto
5. Alerta/pivô — caixa de contraste (cor literal só se o usuário pedir explicitamente)
6. Checklist de benefícios
7-8. Módulos da oferta (row-cards alternados, com ícone/ilustração)
9. Bônus (mesma estrutura de row-card)
10. Faixa de recapitulação da oferta
11. Ledger de preço (itens com valor riscado somando um "deveria custar", vs preço real)
12. Como acessar (3 passos)
13. Autoridade — foto real + bio (nunca inventar anos de experiência ou fato sobre a pessoa, usar
    o que está em `_contexto/empresa.md` ou o que o usuário confirmar)
14. Duas opções (continuar como está x aplicar a solução) + FAQ + rodapé

Numeração dos blocos é só organização interna — não expor "01 · Bloco X" pro visitante a menos
que o usuário peça.

## Design system

- Tokens de cor: `--ink`, `--paper`, `--paper-line`, `--surface`, `--surface-line`, `--dark`,
  `--dark-line`, `--text-on-dark`, `--muted-on-dark`, `--accent`, `--accent-strong`, `--accent-soft`,
  `--price`, `--price-soft`, `--negative`, `--negative-soft` — adaptar os valores hex pra
  identidade do produto novo, manter os nomes dos tokens.
- Fontes: uma serifada de destaque (headline), uma sans de corpo, uma mono pra
  labels/números/kickers — carregadas via Google Fonts (único host externo liberado no Artifact).
  Checar o nome exato da família no link do Google Fonts bate com o `font-family` no CSS (bug já
  aconteceu: `'Plex Sans'` no CSS vs `IBM+Plex+Sans` no link — tem que ser o nome completo real da
  fonte nos dois lugares).
- Faixas de fundo alternadas (`.band-paper`, `.band-surface`, `.band-dark`) — nunca duas faixas
  adjacentes com o mesmo fundo, reequilibrar sempre que reordenar/remover bloco.
- Padrão `.art` / `.art-flush` / `.art-fill`: `.art` sozinho é placeholder hachurado; `.art-flush`
  tira padding/borda pra imagem real de sangria; `.art-fill` põe `width:100%;height:100%;
  object-fit:cover` na imagem — usar esse combo quando a imagem precisa preencher um contêiner de
  proporção fixa sem distorcer.

## Regras de conteúdo

- **Nunca inventar fato, número ou depoimento.** Se pedir prova e não tiver dado real, avisar e
  não preencher com genérico — sempre usar o material real que o usuário fornecer (research de
  ruminação, roteiro real, transcrição de call real, print de resultado real).
- Ao copiar estrutura visual de referência, adaptar cor/conteúdo pra identidade do produto — só
  copiar cor literal se o usuário pedir explicitamente ("com vermelho e amarelo, do jeito que te
  mandei").
- Toda mudança pontual (cor, fonte, texto, posição) só o que foi pedido — não expandir escopo sem
  confirmar.

## Publicar prévia pro usuário revisar

Publicar como Artifact (arquivo com base64 embutido funciona direto, sem precisar de asset
externo). Carregar a skill `artifact-design` antes de publicar a primeira versão — mas como o
design já segue o design system do produto (definido uma vez, reaproveitado em edição), não é
"design do zero" a cada ajuste pontual.
