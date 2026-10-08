// Cloudflare Worker — serve a página de link na bio do Lucas em
// www.assessoriaraiz.com.br/bio-ig-lucas, sem tocar no projeto do site principal.
//
// Como funciona: a página de verdade está publicada como um Worker com assets
// estáticos (royal-brook-69cf.assessoriaraizz.workers.dev). Esse Worker-ponte
// só pega qualquer request que bater na rota /bio-ig-lucas* e repassa pra lá,
// devolvendo a resposta como se fosse nativa do domínio da Raiz.

const PREFIX = '/bio-ig-lucas';
const ORIGIN_HOST = 'royal-brook-69cf.assessoriaraizz.workers.dev';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // /bio-ig-lucas (sem barra) -> redireciona pra /bio-ig-lucas/
    // pra garantir que os links relativos (assets/...) resolvam certo.
    if (url.pathname === PREFIX) {
      url.pathname = PREFIX + '/';
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname.startsWith(PREFIX + '/')) {
      url.pathname = url.pathname.slice(PREFIX.length) || '/';
    } else {
      url.pathname = '/';
    }

    url.protocol = 'https:';
    url.hostname = ORIGIN_HOST;

    const originRequest = new Request(url.toString(), request);
    const response = await fetch(originRequest);
    return new Response(response.body, response);
  },
};
