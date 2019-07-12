import pkg from "./package.json";
import {terser} from "rollup-plugin-terser";
import * as typescript from "typescript";
import typescript2 from "rollup-plugin-typescript2";
import tslint from "rollup-plugin-tslint";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.umd,
      format: "umd",
      name: "webauthnJSON",
      sourcemap: true,
    },
  ],
  plugins: [
    tslint({}),
    typescript2({
      typescript: typescript,
    }),
    terser(),
  ],
};
