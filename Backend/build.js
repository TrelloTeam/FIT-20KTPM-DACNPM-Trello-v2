const { readFileSync, writeFileSync, copyFileSync } = require('fs')
const { exec } = require('child_process')
const fs = require('fs')

const service_name = process.argv.slice(2)[0]
exec(`npx ncc build apps/${service_name}/src/main.ts --out build`, (err, stdout, stderr) => {
  console.log(err, stderr, stdout)
  copyFileSync('.env', 'build/.env')
  const file = readFileSync('./build/index.js')
  writeFileSync('./build/index.js', file.toString().replace('`${`${__dirname}/default`}`', '__dirname'))
})

// const file = readFileSync('./build/index.js')
// writeFileSync('./build/index.js', file.toString().replace('`${`${__dirname}/default`}`', '__dirname'))
