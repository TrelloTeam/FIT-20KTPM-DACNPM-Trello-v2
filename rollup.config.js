import commonjs from "@rollup/plugin-commonjs";
import fs from "fs";

const protos_js = fs.readdirSync("./protos/builds");
export default {
  input: protos_js
    .filter((d) => d.includes(".js"))
    .map((n) => `protos/builds/${n}`),
  output: {
    dir: "protos/builds",
    format: "cjs",
  },
  plugins: [
    commonjs({
      esmExternals: true,
      extensions: ".js",
    }),
  ],
};
