import type { Config } from 'jest'
import { compilerOptions } from './tsconfig.json'
import type { JestConfigWithTsJest } from 'ts-jest'
import { pathsToModuleNameMapper } from 'ts-jest'

const args = process.argv.reduce(
  (acum, v, index) => {
    const kv = v.split('=')
    if (kv.length === 2) {
      acum[kv[0]] = kv[1]
    } else {
      acum[index.toString()] = v
    }
    return acum
  },
  {} as { [key: string]: string },
)

const config: JestConfigWithTsJest = {
  roots: [args['service'] ? `./apps/${args['service']}` : '.'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
}

export default config
// "jest": {
//   "moduleFileExtensions": [
//     "js",
//     "json",
//     "ts"
//   ],
//   "rootDir": "src",
//   "testRegex": ".*\\.spec\\.ts$",
//   "transform": {
//     "^.+\\.(t|j)s$": "ts-jest"
//   },
//   "collectCoverageFrom": [
//     "**/*.(t|j)s"
//   ],
//   "coverageDirectory": "../coverage",
//   "testEnvironment": "node"
// }
