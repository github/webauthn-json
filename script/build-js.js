import { barelyServe } from "barely-a-dev-server";
import { build } from "esbuild";
import { readFileSync } from "fs";
import { chmod } from "fs/promises";

build({
  entryPoints: ["src/webauthn-json/index.ts"],
  format: "cjs",
  target: "es2015",
  bundle: true,
  sourcemap: true,
  outfile: "dist/cjs/webauthn-json.cjs",
});

build({
  entryPoints: ["src/webauthn-json/extended.ts"],
  format: "cjs",
  target: "es2015",
  bundle: true,
  sourcemap: true,
  outfile: "dist/cjs/webauthn-json.extended.cjs",
});

build({
  entryPoints: ["src/webauthn-json/index.ts"],
  format: "esm",
  target: "es2020",
  bundle: true,
  sourcemap: true,
  outfile: "dist/esm/webauthn-json.js",
});

build({
  entryPoints: ["src/webauthn-json/extended.ts"],
  format: "esm",
  target: "es2020",
  bundle: true,
  sourcemap: true,
  outfile: "dist/esm/webauthn-json.extended.js",
});

build({
  entryPoints: ["src/webauthn-json/browser-global.ts"],
  format: "cjs",
  target: "es6",
  bundle: true,
  sourcemap: true,
  outfile: "dist/browser-global/webauthn-json.browser-global.js",
});

build({
  entryPoints: ["src/dev/inspector/inspector.ts"],
  format: "iife",
  target: "es6",
  bundle: true,
  sourcemap: true,
  outfile: "dist/inspector/inspector.js",
});

const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url)),
);
await build({
  entryPoints: ["src/bin/main.ts"],
  format: "esm",
  target: "es2020",
  bundle: true,
  sourcemap: true,
  define: { WEBAUTHN_JSON_VERSION: JSON.stringify(version) },
  banner: { js: "#!/usr/bin/env node" },
  outfile: "dist/bin/main.js",
});
chmod("dist/bin/main.js", 0o755);
