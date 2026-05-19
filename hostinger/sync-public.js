#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..", "artifacts", "storymaker", "dist", "public");
const DEST = path.resolve(__dirname, "public");

if (!fs.existsSync(SRC)) {
  console.error(
    "[sync-public] Build nao encontrado em " + SRC + ".\n" +
      "             Rode antes: pnpm --filter @workspace/storymaker run build",
  );
  process.exit(1);
}

fs.rmSync(DEST, { recursive: true, force: true });
fs.mkdirSync(DEST, { recursive: true });

function copyDir(from, to) {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(dst, { recursive: true });
      copyDir(src, dst);
    } else if (entry.isFile()) {
      fs.copyFileSync(src, dst);
    }
  }
}

copyDir(SRC, DEST);
console.log("[sync-public] OK -> " + path.relative(process.cwd(), DEST));
