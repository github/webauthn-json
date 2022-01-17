import { barelyServe } from "barely-a-dev-server";

barelyServe({
  dev: false,
  entryRoot: "src/dev",
  outDir: "./dist/pages",
});
