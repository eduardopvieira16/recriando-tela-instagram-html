# Segurança e limitações

## Escopo

A aplicação é inteiramente estática e não possui backend. O formulário executa somente validação local e apaga a senha após a simulação de envio.

## Proteção client-side

O arquivo `js/ui-deterrence.js` dificulta ações casuais ao bloquear:

- F12.
- `Ctrl + Shift + I`, `Ctrl + Shift + J` e `Ctrl + Shift + C`.
- `Ctrl + U`.
- Equivalentes comuns no macOS.
- Arraste de imagens.
- Menu de contexto em imagens ou em todo o documento, conforme configuração.

Essas medidas não oferecem proteção real do código ou dos assets. Qualquer conteúdo entregue ao navegador pode ser obtido por DevTools aberto previamente, painel de rede, cache, automação, proxy, desativação do JavaScript ou captura de tela.

## Controles efetivos para produção

Para proteger conteúdo real, use controles no servidor ou CDN:

- Autorização antes da entrega de assets privados.
- URLs assinadas com expiração curta.
- Rate limiting e detecção de abuso.
- Watermarking quando aplicável.
- Política de cache adequada.
- Cabeçalhos CSP, HSTS, `X-Content-Type-Options` e `Referrer-Policy` configurados no servidor.
- Nunca incorporar segredos, tokens privados ou regras de autorização no JavaScript do navegador.
