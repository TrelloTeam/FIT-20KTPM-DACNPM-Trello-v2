module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase']
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow'
      },
      {
        selector: 'variable',
        modifiers: ['const', 'exported'],
        format: ['PascalCase', 'UPPER_CASE']
      }
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: false
      }
    ]
  }
}
