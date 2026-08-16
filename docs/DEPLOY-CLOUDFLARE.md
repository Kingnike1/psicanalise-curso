# Publicação na Cloudflare

## Site

A pasta `site/` contém uma aplicação estática. Ela pode ser publicada em Cloudflare Workers com Static Assets ou Cloudflare Pages.

### Direct Upload

1. Entre no painel da Cloudflare.
2. Abra Workers & Pages.
3. Crie ou abra o projeto do Instituto ADE.
4. Use a opção de upload de arquivos estáticos.
5. Envie o conteúdo da pasta `site/` (ou um ZIP contendo esses arquivos na raiz).
6. Implante.

O arquivo principal é `index.html`.

## Laboratório com IA

O backend está em `worker/`.

### Pelo painel

1. Crie um Worker chamado `instituto-ade-lab`.
2. Substitua o código de exemplo pelo conteúdo de `worker/src/worker.js`.
3. Nas configurações do Worker, adicione um binding do tipo **Workers AI**.
4. O nome do binding deve ser exatamente `AI`.
5. Implante.
6. Teste:

```text
https://SEU-WORKER.workers.dev/api/lab/health
```

A resposta deve indicar `ok: true`.

### Pelo Wrangler

Dentro da pasta `worker/`:

```bash
npm install
npm run deploy
```

O arquivo `wrangler.jsonc` já contém o binding `AI`.

## Conectar o site ao Worker

No Instituto ADE, abra o Laboratório e informe a URL base do Worker, por exemplo:

```text
https://instituto-ade-lab.seu-subdominio.workers.dev
```

Não acrescente `/api/lab/health` no campo de configuração.
