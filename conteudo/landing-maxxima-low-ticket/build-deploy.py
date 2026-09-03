#!/usr/bin/env python3
"""
Gera a pasta deploy/ otimizada a partir dos arquivos "master"
(index.html, qualificacao.html, obrigado.html), que ficam com as
imagens embutidas em base64 de propósito — é o formato que o Artifact
exige pra pré-visualização (arquivo único, autocontido).

O que esse script faz:
  1. Lê cada arquivo master.
  2. Extrai toda imagem base64 embutida pra um arquivo real em deploy/images/.
  3. Troca a tag <img src="data:image/...;base64,..."> por
     <img src="images/nome-do-arquivo.ext">.
  4. Salva a versão enxuta em deploy/.

Isso reduz o HTML de vários MB pra poucas dezenas de KB — o navegador
carrega o HTML quase instantâneo e baixa as imagens em paralelo (várias
delas já com loading="lazy", só carregando quando a pessoa rola até lá).

USAR SEMPRE que fizer uma mudança de conteúdo/imagem no index.html,
qualificacao.html ou obrigado.html "master" e for publicar de novo.
NUNCA copiar o master direto pra deploy/ com um cp simples — isso
desfaz essa otimização e volta a página pra 3,6MB+.

Uso: python3 build-deploy.py
(roda a partir da pasta conteudo/landing-maxxima-low-ticket/)
"""

import re
import base64
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEPLOY_DIR = os.path.join(BASE_DIR, "deploy")
IMAGES_DIR = os.path.join(DEPLOY_DIR, "images")

EXT_MAP = {"jpeg": "jpg", "png": "png", "webp": "webp"}
PATTERN = re.compile(r'data:image/([a-zA-Z+]+);base64,([A-Za-z0-9+/=]+)')

# páginas a processar: (arquivo master, prefixo do nome das imagens extraídas)
PAGES = [
    ("index.html", "img"),
    ("qualificacao.html", "qualificacao"),
    ("obrigado.html", "obrigado"),
]

# a partir de qual índice (nessa página) começa a valer loading="lazy"
# None = não força lazy loading extra (a página já decide sozinha, ex:
# imagens que já tinham loading="lazy" no master continuam tendo)
LAZY_FROM = {
    "index.html": 14,  # imagem 14 em diante (abaixo da dobra) ganha lazy
}


def build_page(fname, prefix):
    master_path = os.path.join(BASE_DIR, fname)
    with open(master_path, "r", encoding="utf-8") as f:
        content = f.read()

    original_size = len(content)
    counter = [0]
    lazy_from = LAZY_FROM.get(fname)

    def replace_and_save(m):
        counter[0] += 1
        idx = counter[0]
        mime = m.group(1)
        b64data = m.group(2)
        ext = EXT_MAP.get(mime, mime)
        img_fname = f"{prefix}{idx:02d}.{ext}" if prefix == "img" else f"{prefix}-{idx:02d}.{ext}"
        raw = base64.b64decode(b64data)
        with open(os.path.join(IMAGES_DIR, img_fname), "wb") as imgf:
            imgf.write(raw)
        return f"images/{img_fname}"

    new_content = PATTERN.sub(replace_and_save, content)

    # adiciona loading="lazy" a partir do índice configurado, se ainda não tiver
    if lazy_from:
        for n in range(lazy_from, counter[0] + 1):
            ext = None
            for candidate_ext in ("jpg", "png", "webp"):
                candidate = f'src="images/{prefix}{n:02d}.{candidate_ext}"'
                if candidate in new_content and "loading=" not in new_content.split(candidate)[1][:20]:
                    new_content = new_content.replace(candidate, candidate + ' loading="lazy"', 1)
                    break

    deploy_path = os.path.join(DEPLOY_DIR, fname)
    with open(deploy_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"{fname}: {original_size/1024:.0f} KB -> {len(new_content)/1024:.0f} KB "
          f"({counter[0]} imagens extraídas)")


def main():
    os.makedirs(IMAGES_DIR, exist_ok=True)
    for fname, prefix in PAGES:
        build_page(fname, prefix)
    print("\nPronto. Agora sobe a pasta deploy/ inteira no Cloudflare Pages"
          " (Implantações -> Criar implantação -> arrasta a pasta deploy).")


if __name__ == "__main__":
    main()
