# Fase 5 — Performance da página

## O problema raiz

O arquivo "master" da página (`conteudo/[produto]/index.html`) mantém as imagens embutidas em
base64 de propósito, porque é o formato exigido pra publicar como Artifact de prévia (arquivo
único, autocontido). Isso é **péssimo pra produção**: infla o HTML em ~33% a mais que o tamanho
real da imagem, e o navegador precisa baixar o HTML inteiro (pode passar de 3MB) antes de
conseguir renderizar qualquer coisa — em vez de baixar as imagens em paralelo conforme precisa.
Isso derruba First Contentful Paint e Largest Contentful Paint pra mais de 10 segundos no celular.

## A solução: build de deploy separado do master

**Nunca copiar o master direto pra pasta `deploy/` com um `cp` simples.** Sempre gerar a pasta de
deploy através de um script (`conteudo/[produto]/build-deploy.py`) que:

1. Lê o(s) arquivo(s) master.
2. Extrai toda imagem base64 embutida pra um arquivo real em `deploy/images/`.
3. Troca `<img src="data:image/...;base64,...">` por `<img src="images/nome.ext">`.
4. Adiciona `loading="lazy"` nas imagens abaixo da dobra (a partir de um índice configurável por
   página).
5. Copia arquivos estáticos auxiliares (`robots.txt`, `_headers`) pra `deploy/`.

Ver o script já usado no Protocolo Visita Garantida como modelo
(`conteudo/landing-maxxima-low-ticket/build-deploy.py`) — reaproveitar a mesma lógica pra produto
novo, adaptando só os nomes de arquivo/prefixo.

**Rodar esse script sempre que editar imagem/conteúdo no master, antes de publicar no Cloudflare
Pages.** Esquecer esse passo é o erro mais fácil de cometer — o `cp` simples parece funcionar mas
desfaz toda a otimização.

## Checklist de correções de performance (nessa ordem de impacto)

1. **Extrair imagens base64 pra arquivo real** (o item acima) — maior impacto sozinho.
2. **`loading="lazy"`** em toda imagem abaixo da dobra inicial.
3. **`fetchpriority="high"`** na(s) imagem(ns) que é o elemento de LCP (geralmente a imagem
   principal do topo/hero) — garante que ela não perca prioridade de banda pra outro recurso.
4. **Fonte do Google não deve travar a renderização** — trocar
   `<link rel="stylesheet" href="...">` simples por:
   ```html
   <link href="URL" rel="stylesheet" media="print" onload="this.media='all'">
   <noscript><link href="URL" rel="stylesheet"></noscript>
   ```
   **Não usar `rel="preload"` junto** — preload da fonte compete por banda com a imagem de LCP e
   pode piorar o LCP em vez de ajudar (já aconteceu: LCP foi de 5,2s pra 10,4s só de adicionar o
   preload). Testar sem preload primeiro.
5. **`width`/`height` explícitos em toda imagem, MAIS `height:auto` na regra CSS
   correspondente.** As duas coisas juntas, nunca só uma:
   - `width`/`height` HTML fazem o navegador reservar o espaço certo antes de carregar (corrige
     CLS — troca de layout ao carregar imagem lazy).
   - **Esquecer o `height:auto` no CSS trava a altura no valor literal do atributo, ESTICANDO a
     imagem** quando a largura real de exibição é diferente do atributo. Bug já aconteceu 2x
     seguidas na mesma sessão por esquecer isso em classes diferentes (`.compare-img`,
     `.result-img`, `.trust-badges`, `.dialogue img` — qualquer classe de imagem que usa
     `width:100%` sem `height` explícito no CSS precisa ganhar `height:auto` junto com os
     atributos HTML). Antes de considerar terminado, grepar todo `width:100%` de imagem no CSS e
     confirmar que cada uma tem `height:auto` — não corrigir uma classe de cada vez reagindo a
     reclamação, fazer a varredura completa de uma vez.
   - Exceção: padrão `.art-fill{width:100%;height:100%;object-fit:cover}` é diferente por design
     (preenche um contêiner de proporção fixa definida no elemento pai) — não precisa de
     `height:auto`.
6. **Redimensionar imagem grande demais pro tamanho real de exibição.** Servir imagem de 1100px de
   largura pra um espaço que renderiza a ~350-500px no celular desperdiça banda. Usar `sips -Z
   [tamanho] -s format jpeg -s formatOptions 75` (macOS) pra reduzir dimensão + comprimir antes de
   reinserir no master.
7. **`<meta name="description">`** — SEO básico, fácil de esquecer.
8. **`robots.txt` real publicado** — se não existir, o Cloudflare cai numa página de erro genérica
   quando alguém pede esse endereço, e ferramentas de SEO tentam interpretar aquele HTML como
   regra de robots (gera centenas de "erros" falsos). Criar um `robots.txt` simples
   (`User-agent: * / Allow: / / Disallow: /qualificacao / Disallow: /obrigado`, adaptando os
   caminhos privados do funil) e incluir no script de build.
9. **Cache de imagem** — arquivo `_headers` do Cloudflare Pages:
   ```
   /images/*
     Cache-Control: public, max-age=31536000, immutable
   ```

## Depois de qualquer troca de imagem no master

**Cuidado com a ordem das imagens ao trocar base64 diretamente por índice/posição no documento.**
Se o produto tem logo + várias imagens de conteúdo, contar errado qual ocorrência é qual
(esquecendo que a logo entra entre o favicon e a primeira imagem de conteúdo, por exemplo) já
causou troca de imagem errada mais de uma vez. Conferir visualmente (ler o arquivo de imagem
extraído) antes de assumir que a troca aplicou no lugar certo — não confiar só na contagem manual.

## Testar

Google PageSpeed Insights, aba Celular. **Os números de LCP e Total Blocking Time têm variação
real entre testes** (a página depende de servidor externo do Google Fonts e GTM, cuja latência
varia a cada teste) — rodar pelo menos 2 vezes seguidas sem mudar código no meio antes de
diagnosticar uma "regressão" como bug real. First Contentful Paint, Speed Index, SEO e Práticas
Recomendadas costumam ficar estáveis entre testes — esses são os números confiáveis pra julgar se
uma correção funcionou.
