# Link na bio — Lucas Lunardi

Página pessoal de link na bio pro Instagram do Lucas, no formato que o Matheus já usa (foto, cards de link, card de produto em destaque com preço).

## Arquivos
- `index.html` — a página em si (fonte)
- `deploy/index.html` + `deploy/assets/` — cópia espelho, é essa pasta que sobe no Cloudflare Pages. Sempre que editar `index.html` ou os assets, copiar de novo pra `deploy/` antes de publicar.
- `worker.js` — Cloudflare Worker que monta a página em `www.assessoriaraiz.com.br/bio-ig-lucas` (ver seção de domínio abaixo)
- `assets/avatar.jpg` — foto de perfil (recorte quadrado de `dados/WhatsApp Image 2026-08-25 at 22.18.15.jpeg`)
- `assets/raiz-logo.png` — logo "RAIZ" recortado de `marca/logo.png`, fundo transparente
- `assets/protocolo-logo.png` — logo do Protocolo Visita Garantida (ícone + wordmark completo), recortado de `dados/Gemini_Generated_Image_wn3kpuwn3kpuwn3k.jpeg` com remoção de fundo via chroma key

## Estrutura da página (de cima pra baixo)
1. Foto + nome
2. Linha escura com logo da Raiz: **Conheça a Assessoria Raiz** → `https://www.assessoriaraiz.com.br/`
3. Linha clara com ícone do WhatsApp: **Fale comigo** → `https://wa.me/5554992013758`
4. Divisor "Tem uma loja de carros?"
5. Card de destaque (verde, logo do Protocolo centralizado, preço R$67): **Quero aplicar na minha loja** → `https://protocolo.assessoriaraiz.com.br/`

## Domínio: `www.assessoriaraiz.com.br/bio-ig-lucas`

Decisão (mudou de ideia em relação à primeira versão): usar o domínio da Raiz com um path, não um domínio separado. O site principal já é o projeto Cloudflare Pages **`assessoriaraiz-site`** (confirmado via DNS: `www.assessoriaraiz.com.br` → CNAME → `assessoriaraiz-site.pages.dev`), mas os arquivos-fonte desse projeto não estão nesse workspace — provavelmente vivem em outro repositório ou máquina.

Pra não mexer no projeto do site principal (zero risco de quebrar algo lá), a solução foi um **Cloudflare Worker** que atua só na rota `/bio-ig-lucas*`:

1. A página continua publicada normalmente como projeto Cloudflare Pages separado, nome sugerido `lucaslunardi` → gera `lucaslunardi.pages.dev`
   - Deploy manual: arrastar a pasta `deploy/` inteira (já inclui `assets/`)
2. Criar um Worker novo no Cloudflare (Workers & Pages → Create → Worker), colar o conteúdo de `worker.js`, dar deploy
3. Na aba **Routes** do Worker (ou em Workers Routes da zona `assessoriaraiz.com.br`), adicionar a rota: `www.assessoriaraiz.com.br/bio-ig-lucas*` apontando pra esse Worker
4. Testar `https://www.assessoriaraiz.com.br/bio-ig-lucas` — o Worker repassa a request pro `lucaslunardi.pages.dev` por baixo dos panos, sem o usuário perceber

Pra atualizar a página depois: só editar `index.html`/assets, copiar pra `deploy/` e re-publicar o projeto `lucaslunardi` no Pages — não precisa tocar no Worker de novo (ele só faz o repasse, não guarda conteúdo).

## Tracking (GA4 pessoal, separado da Raiz)

Decisão: não reaproveitar o GTM/GA4 compartilhado da Raiz (`GTM-KDBRK7ZH` / `G-1F7WPFZY4W`), porque essa página é pessoal. A página já vem com `gtag.js` direto (sem GTM) e dispara 3 eventos customizados por clique:
- `linkbio_click_lp_raiz`
- `linkbio_click_whatsapp`
- `linkbio_click_protocolo`

**Pendente — em andamento com o Lucas:**
1. Criar propriedade GA4 pessoal (conta Google pessoal, não a da Raiz) → copiar o Measurement ID (`G-...`)
2. Substituir o placeholder `G-XXXXXXXXXX` nas duas linhas do `<head>` de `index.html` (e copiar pra `deploy/`)
3. Criar service account no Google Cloud + ativar Google Analytics Data API + dar acesso de "Leitor" nessa propriedade
4. Instalar a skill `/ga4-ratos` (`git clone https://github.com/duduesh/ga4-ratos ~/.claude/skills/ga4-ratos`) pra puxar os dados e montar um dashboard de cliques/visitas, no mesmo estilo dos relatórios que o Matheus já tem (ver `templates/ferramentas/catalogo.md` linha ~205)

Depois de conectado, dá pra gerar o dashboard de acompanhamento (cliques por destino, visitas por dia, etc.) puxando os dados dessa propriedade via `/ga4-ratos`.
