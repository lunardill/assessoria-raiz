# Link na bio — Lucas Lunardi

Página pessoal de link na bio pro Instagram do Lucas, no formato que o Matheus já usa (foto, card de produto em destaque com preço, link institucional, card de cross-sell pro WhatsApp).

## Arquivos
- `index.html` — a página em si (fonte)
- `deploy/index.html` + `deploy/assets/` — cópia espelho, é essa pasta que sobe no Cloudflare Pages. Sempre que editar `index.html` ou a foto, copiar de novo pra `deploy/` antes de publicar.
- `assets/avatar.jpg` — foto de perfil (recorte quadrado de `dados/WhatsApp Image 2026-08-25 at 22.18.15.jpeg`, 480x480)

## Estrutura da página
1. Foto + nome + "Comercial · Assessoria Raiz"
2. Card de destaque: **Protocolo Visita Garantida** (R$67 · acesso na hora) → `https://protocolo.assessoriaraiz.com.br/`
3. Linha simples: **Conheça a Assessoria Raiz** → `https://www.assessoriaraiz.com.br/`
4. Divisor "Tem uma empresa?"
5. Card de cross-sell (fundo verde, estilo Raiz): **Quer vender mais com tráfego pago?** → `https://wa.me/5554992013758`

## Deploy (Cloudflare Pages)
Página pessoal do Lucas, não usa domínio da Raiz.
1. Criar projeto novo no Cloudflare Pages (ex: `lucaslunardi`)
2. Deploy manual: arrastar a pasta `deploy/` inteira (ela já inclui `assets/`)
3. Domínio: usar o subdomínio grátis que o próprio Cloudflare Pages gera (ex: `lucaslunardi.pages.dev`) — não precisa registrar nada nem mexer em DNS. É esse link que vai na bio do Instagram.

## Tracking (GA4 pessoal, separado da Raiz)

Decisão: não reaproveitar o GTM/GA4 compartilhado da Raiz (`GTM-KDBRK7ZH` / `G-1F7WPFZY4W`), porque essa página é pessoal. A página já vem com `gtag.js` direto (sem GTM) e dispara 3 eventos customizados por clique:
- `linkbio_click_protocolo`
- `linkbio_click_lp_raiz`
- `linkbio_click_whatsapp`

**Pendente:** o código ainda tem o ID placeholder `G-XXXXXXXXXX` em duas linhas do `<head>` de `index.html` (e precisa copiar pra `deploy/` depois). Passos que faltam, em andamento:

1. Lucas cria uma propriedade GA4 nova (conta Google pessoal, não a da Raiz) → copiar o Measurement ID (`G-...`)
2. Substituir `G-XXXXXXXXXX` pelo ID real nas duas linhas do `<head>`
3. Criar service account no Google Cloud + ativar Google Analytics Data API + dar acesso de "Leitor" pra essa service account na propriedade GA4 nova
4. Instalar a skill `/ga4-ratos` (`git clone https://github.com/duduesh/ga4-ratos ~/.claude/skills/ga4-ratos`) pra conseguir puxar os dados e montar relatórios de cliques por destino, no mesmo estilo dos relatórios que o Matheus já tem.

Ver `templates/ferramentas/catalogo.md` linha ~205 pra referência da skill.
