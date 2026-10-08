# Link na bio — Lucas Lunardi

Página pessoal de link na bio pro Instagram do Lucas, no formato que o Matheus já usa (foto, cards de link, card de produto em destaque com preço).

## Arquivos
- `index.html` — a página em si (fonte)
- `deploy/index.html` + `deploy/assets/` — cópia espelho, é essa pasta que sobe no Cloudflare. Sempre que editar `index.html` ou os assets, copiar de novo pra `deploy/` antes de publicar.
- `assets/avatar.jpg` — foto de perfil (recorte quadrado de `dados/WhatsApp Image 2026-08-25 at 22.18.15.jpeg`)
- `assets/raiz-logo.png` — logo "RAIZ" recortado de `marca/logo.png`, fundo transparente
- `assets/protocolo-logo.png` — logo do Protocolo Visita Garantida (ícone + wordmark completo), recortado de `dados/Gemini_Generated_Image_wn3kpuwn3kpuwn3k.jpeg` com remoção de fundo via chroma key

## Estrutura da página (de cima pra baixo)
1. Foto + nome
2. Linha escura com logo da Raiz: **Conheça a Assessoria Raiz** → `https://www.assessoriaraiz.com.br/`
3. Linha clara com ícone do WhatsApp: **Fale comigo** → `https://wa.me/5554992013758`
4. Divisor "Tem uma loja de carros?"
5. Card de destaque (verde, logo do Protocolo centralizado, preço R$67): **Quero aplicar na minha loja** → `https://protocolo.assessoriaraiz.com.br/`

## Domínio: direto no `workers.dev`

Histórico da decisão: cogitamos usar `www.assessoriaraiz.com.br/bio-ig-lucas` (path no domínio da Raiz) via um Worker-ponte, mas não rolou — rotas de Worker só funcionam em zonas totalmente gerenciadas pelo Cloudflare, e `assessoriaraiz.com.br` continua com o DNS no Registro.br (só o `www` tem um CNAME pro Cloudflare Pages). Migrar a zona inteira pro Cloudflare resolveria, mas arriscaria o e-mail que já funciona nesse domínio — decisão de não mexer nisso.

Decisão final: usar o link direto que o próprio Cloudflare gerou, sem domínio customizado.

**URL pública (é esse o link pra bio do Instagram):**
```
https://lucaslunardi.assessoriaraizz.workers.dev/
```

Publicado via upload direto da pasta `deploy/` em Workers & Pages → Create → Worker → "Upload your static files" (no painel novo do Cloudflare, upload de arquivo estático vira um Worker com assets, não mais um projeto "Pages" clássico).

**Pra atualizar a página depois:** editar `index.html`/assets aqui, copiar pra `deploy/`, entrar nesse mesmo Worker no painel Cloudflare e fazer upload da pasta `deploy/` de novo.

## Tracking (GA4 pessoal, separado da Raiz)

Decisão: não reaproveitar o GTM/GA4 compartilhado da Raiz (`GTM-KDBRK7ZH` / `G-1F7WPFZY4W`), porque essa página é pessoal. A página já vem com `gtag.js` direto (sem GTM) e dispara 3 eventos customizados por clique:
- `linkbio_click_lp_raiz`
- `linkbio_click_whatsapp`
- `linkbio_click_protocolo`

**Propriedade GA4 pessoal:** "Lucas Lunardi - Link na Bio", Measurement ID `G-09PS1Y7FZN` — já configurado em `index.html` (e replicado em `deploy/`), já coletando dado.

**Dashboard de cliques/visitas: pausado por decisão do Lucas** (2026-10-08) — não vale a pena o esforço de service account + `/ga4-ratos` pra um uso que ele não daria muita bola agora. Se quiser retomar no futuro, falta:
1. Criar service account no Google Cloud + ativar Google Analytics Data API + dar acesso de "Leitor" nessa propriedade GA4
2. Instalar a skill `/ga4-ratos` (`git clone https://github.com/duduesh/ga4-ratos ~/.claude/skills/ga4-ratos`) pra puxar os dados e montar o dashboard, no mesmo estilo dos relatórios que o Matheus já tem (ver `templates/ferramentas/catalogo.md` linha ~205)
