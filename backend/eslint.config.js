const globals = require("globals");
const eslintConfigLove = require("eslint-config-love");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    files: ["**/*.js", "**/*.ts"],
    ignores: ["node_modules/**", "dist/**"],
  },
  eslintConfigLove,
  eslintConfigPrettier,
];