module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'prettier',
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/space-before-blocks': ['error', 'always'],
    '@typescript-eslint/object-curly-spacing': [1, 'always'],
    '@typescript-eslint/indent': ['warn', 2, { 'SwitchCase': 1 }],
    '@typescript-eslint/semi': [1, 'never'],
    '@typescript-eslint/quotes': ['warn', 'single'],
    '@typescript-eslint/keyword-spacing': 1,
    '@typescript-eslint/comma-dangle': 1,
    '@typescript-eslint/comma-spacing': 1,
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: false,
      }
    ],
  },
}
