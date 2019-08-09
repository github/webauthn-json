import pkg from "./package.json";
import {terser} from "rollup-plugin-terser";
import * as typescript from "typescript";
import typescript2 from "rollup-plugin-typescript2";
import tslint from "rollup-plugin-tslint";

const plugins = [
  tslint({}),
  typescript2({
    typescript: typescript,
  }),
];

if (!process.env.ROLLUP_WATCH) {
  plugins.push(terser());
}

const configs = [{
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "umd",
      name: "webauthnJSON",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins
}, {
  input: "src/bin/webauthn-json.ts",
  output: [
    {
      file: pkg.bin["webauthn-json"],
      format: "umd",
      sourcemap: true,
      banner: `#!/usr/bin/env node\nconst version = \"${pkg.version}\";`,
    },
  ],
  plugins
}];

export default configs;
