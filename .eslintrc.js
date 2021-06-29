/**
 * ESLint 配置
 *
 * @see https://eslint.org/docs/user-guide/configuring
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,

  env: { es6: true, browser: true },

  extends: [
    'plugin:react/recommended', //  从@eslint-plugin-react推荐规则
    'plugin:prettier/recommended', // 启用eslint-plugin-prettier，并将prettier错误显示为ESLint错误。确保这一项始终在数组的最后一项。
  ],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // 允许使用 imports 导入
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
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

  settings: {
    react: {
      version: 'detect', // 告诉eslint-plugin-react自动检测要使用的React版本
    },
  },
};
