/**
 * ESLint 配置
 *
 * @see https://eslint.org/docs/user-guide/configuring
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,

  env: { es6: true, browser: true },

  plugins: ['prettier'],

  extends: ['eslint:recommended', 'prettier'],

  parserOptions: { ecmaVersion: 2020 },

  overrides: [
    {
      files: ['*.ts', '.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    {
      files: ['.eslintrc.js', '.prettierrc.js', 'babel.config.js', 'scripts/**/*.js', 'webpack.config.js'],
      env: { node: true },
    },
  ],

  ignorePatterns: ['/build', '/.cache', '/.git', '/node_modules'],
};
