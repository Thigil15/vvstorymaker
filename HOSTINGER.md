# Deploy na Hostinger (Node.js + GitHub)

Este repositorio esta pronto para rodar na **Hostinger** atraves do recurso
**Node.js + importar do GitHub**. Tudo que a Hostinger precisa esta na pasta
[`hostinger/`](./hostinger).

## Como funciona

- O site (Storymaker) e uma SPA estatica gerada com Vite.
- A pasta `hostinger/public/` ja contem o **build pronto** (HTML/CSS/JS/imagens/videos).
- O arquivo `hostinger/server.js` e um servidor Express minimo que:
  - serve os arquivos estaticos com cache otimizado,
  - faz **fallback de SPA** (qualquer rota client-side cai no `index.html`),
  - redireciona `www.dominio` -> `dominio` (301),
  - escuta na porta definida em `process.env.PORT` (exigencia da Hostinger).
- O `hostinger/package.json` tem **so o `express`** como dependencia, entao o
  `npm install` da Hostinger e rapido e nao precisa de pnpm/monorepo.

## Configuracao no hPanel (1a vez)

1. Faca push deste repo para o GitHub (branch `main`).
2. No hPanel da Hostinger -> **Avancado -> Node.js** (ou **Sites -> Node.js**),
   clique em **Criar aplicacao**.
3. Preencha:
   - **Versao do Node.js:** 20 (ou superior; minimo 18)
   - **Modo da aplicacao:** Producao
   - **Diretorio raiz da aplicacao:** `hostinger`  *(importante: nao deixar em branco)*
   - **URL da aplicacao:** seu dominio (ex: `vvstorymaker.com`)
   - **Arquivo de inicializacao da aplicacao:** `server.js`
4. Conecte o repositorio do GitHub (a Hostinger tem um botao "Importar do GitHub").
5. Quando a importacao terminar, clique em **Executar NPM Install** e depois em
   **Iniciar aplicacao**.

Pronto. O site ja deve estar no ar no seu dominio.

## Como atualizar o site depois

Sempre que mexer no codigo do site, dentro do Replit (ou local):

```bash
pnpm install
pnpm --filter @workspace/storymaker run build
node hostinger/sync-public.js
git add hostinger/public
git commit -m "deploy: atualizar build"
git push
```

Depois, na hPanel da Hostinger:

1. Abra sua aplicacao Node.js.
2. Clique em **Pull from GitHub** (ou Git -> Pull).
3. Clique em **Restart** (ou **Reiniciar aplicacao**).

A nova versao entra no ar em segundos.

## Dominio e SSL

- Aponte seu dominio no painel **Dominios** da Hostinger para a aplicacao Node.js.
- Ative o **SSL gratis (Let's Encrypt)** em **SSL** -> **Instalar**.
- Para ativar o redirect 301 de `www.seudominio.com` -> `seudominio.com`,
  configure a variavel de ambiente **`CANONICAL_HOST`** no painel da aplicacao
  Node.js (ex: `CANONICAL_HOST=vvstorymaker.com`). Sem essa variavel o redirect
  fica desligado (por seguranca, para nao confiar no header `Host`).

## Solucao de problemas

- **Tela em branco / 404 em sub-rotas:** confirme que `hostinger/public/index.html`
  existe no repo (precisa ter sido commitado).
- **`npm install` falhou:** confirme que **Diretorio raiz da aplicacao** esta
  como `hostinger` (e nao a raiz do repo). A raiz tem um `preinstall` que
  bloqueia `npm` de proposito (forca pnpm no monorepo).
- **Porta:** nunca defina a porta manualmente. O `server.js` ja usa
  `process.env.PORT` que a Hostinger injeta.
- **Mudei codigo mas nada apareceu:** voce esqueceu de rodar
  `node hostinger/sync-public.js` antes do commit, ou esqueceu de clicar em
  **Pull from GitHub** + **Restart** na hPanel.
