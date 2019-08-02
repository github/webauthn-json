import pkg from "./package.json";
import {terser} from "rollup-plugin-terser";
import * as typescript from "typescript";
import typescript2 from "rollup-plugin-typescript2";
import tslint from "rollup-plugin-tslint";

const config = {
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
  plugins: [
    tslint({}),
    typescript2({
      typescript: typescript,
    }),
  ],
};

if (!process.env.ROLLUP_WATCH) {
  config.plugins.push(terser());
}

export default config;
