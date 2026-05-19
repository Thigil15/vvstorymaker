const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const CANONICAL_HOST = (process.env.CANONICAL_HOST || "").trim().toLowerCase();

if (!fs.existsSync(path.join(PUBLIC_DIR, "index.html"))) {
  console.error(
    "[storymaker] ERRO: hostinger/public/index.html nao encontrado.\n" +
      "          Rode `pnpm --filter @workspace/storymaker run build` e\n" +
      "          `node hostinger/sync-public.js` antes de subir para o GitHub.",
  );
  process.exit(1);
}

app.disable("x-powered-by");

if (CANONICAL_HOST) {
  app.use((req, res, next) => {
    const rawHost = (req.headers.host || "").toLowerCase();
    const host = rawHost.split(":")[0];
    if (host === "www." + CANONICAL_HOST) {
      return res.redirect(301, "https://" + CANONICAL_HOST + req.url);
    }
    next();
  });
}

app.use(
  express.static(PUBLIC_DIR, {
    index: "index.html",
    setHeaders: (res, filePath) => {
      const rel = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, "/");
      if (rel === "index.html" || rel.endsWith("/index.html")) {
        res.setHeader("Cache-Control", "no-cache");
      } else if (rel.startsWith("assets/")) {
        res.setHeader(
          "Cache-Control",
          "public, max-age=31536000, immutable",
        );
      } else {
        res.setHeader("Cache-Control", "public, max-age=3600");
      }
    },
  }),
);

app.get("*", (req, res, next) => {
  if (req.method !== "GET") return next();
  if (path.extname(req.path)) return res.status(404).end();
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`[storymaker] servindo em http://0.0.0.0:${PORT}`);
  if (CANONICAL_HOST) {
    console.log(`[storymaker] redirect www.${CANONICAL_HOST} -> ${CANONICAL_HOST}`);
  }
});
