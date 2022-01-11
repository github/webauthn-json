import { build } from "esbuild";

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
  format: "esm",
  target: "es6",
  bundle: true,
  outfile: "dist/esm/webauthn-json.browser-global.js",
});
