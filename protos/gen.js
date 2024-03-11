import { exec } from "child_process";
import fs from "fs";
import { dirname } from "node:path";
import { fileURLToPath } from "url";

const __dirname =
  import.meta.dirname || dirname(fileURLToPath(import.meta.url));
const protos_file = fs.readdirSync(".").filter((d) => d.includes(".proto"));

protos_file.forEach((filename) => {
  const cmd = `protoc -I . --js_out=import_style=commonjs:./builds --grpc-web_out=import_style=typescript,mode=grpcweb:./builds ${filename}`;
  exec(cmd);
});
