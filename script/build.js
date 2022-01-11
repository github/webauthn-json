import { build } from "esbuild";
import { readFileSync } from "fs";

build({
  entryPoints: ["src/webauthn-json/index.ts"],
  format: "esm",
  target: "es2020",
  bundle: true,
  outfile: "dist/esm/webauthn-json.js",
});

build({
  entryPoints: ["src/webauthn-json/extended.ts"],
  format: "esm",
  target: "es2020",
  bundle: true,
  outfile: "dist/esm/webauthn-json.extended.js",
});

build({
  entryPoints: ["src/webauthn-json/browser-global.ts"],
  format: "cjs",
  target: "es6",
  bundle: true,
  outfile: "dist/esm/webauthn-json.browser-global.js",
});

build({
  entryPoints: ["src/dev/inspector/inspector.ts"],
  format: "iife",
  target: "es6",
  bundle: true,
  outfile: "dist/inspector/inspector.js",
});

const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url)),
);
build({
  entryPoints: ["src/bin/main.ts"],
  format: "esm",
  target: "es2020",
  bundle: true,
  banner: { js: `const version = "${version}";\n` },
  outfile: "dist/bin/main.js",
});
