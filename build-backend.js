import { exec } from "child_process";
const services = process.argv.slice(2);
console.log(services);
function buildPush(v) {
  console.log("Start build: ", v);
  exec(
    `docker build -f Dockerfile.backend --build-arg SERVICE_NAME=${v} -t lamlance/trello-backend:${v}-latest .`,
    (err, stdout) => {
      console.log("Build: ", v, err, stdout);
      if (!err) {
        console.log("Start push: ", v);
        exec(`docker push lamlance/trello-backend:${v}-latest`, (err, stdout) =>
          console.log("Push: ", v, err, stdout)
        );
      }
    }
  );
}

services.forEach((v, i) => {
  buildPush(v);
});
