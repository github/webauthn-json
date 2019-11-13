import { join } from "path";
import { terser } from "rollup-plugin-terser";
import tslint from "rollup-plugin-tslint";
import typescript2 from "rollup-plugin-typescript2";
import * as typescript from "typescript";
import extendedPkg from "./extended/package.json";
import pkg from "./package.json";

const plugins = [
  tslint({}),
  typescript2({
    typescript: typescript,
  }),
];

if (!process.env.ROLLUP_WATCH) {
  plugins.push(terser());
}

const configs = [ {
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
  plugins,
}, {
  input: "src/extended.ts",
  output: [
    {
      file: join("extended", extendedPkg.main),
      format: "umd",
      name: "webauthnJSONExtended",
      sourcemap: true,
    },
    {
      file: join("extended", extendedPkg.module),
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins,
}, {
  input: "src/bin/webauthn-json.ts",
  output: [
    {
      banner: `#!/usr/bin/env node\nconst version = \"${pkg.version}\";`,
      file: pkg.bin[ "webauthn-json" ],
      format: "umd",
      sourcemap: true,
    },
  ],
  plugins,
} ];

export default configs;
