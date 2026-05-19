const fs = require("fs");
const path = require("path");

const indexHtml = path.join(__dirname, "public", "index.html");

if (!fs.existsSync(indexHtml)) {
  console.error(
    "[hostinger] hostinger/public/index.html ausente.\n" +
      "           Rode antes do push:\n" +
      "             pnpm --filter @workspace/storymaker run build\n" +
      "             node hostinger/sync-public.js",
  );
  process.exit(1);
}

console.log("[hostinger] build OK -> public/index.html presente");
