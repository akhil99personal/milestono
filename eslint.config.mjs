import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginCssModules from "eslint-plugin-css-modules";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {...globals.browser,  process: "readonly", Intl: "readonly"},
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // "no-console": "error",
      "prettier/prettier": "error",
      "no-warning-comments": "error",
      "no-inline-comments": "error",
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
