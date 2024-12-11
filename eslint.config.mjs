import eslint from "@eslint/js";
import react from "@eslint-react/eslint-plugin";
import next from "@next/eslint-plugin-next";
import * as tsParser from "@typescript-eslint/parser";
import hooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,cjs,mjs,ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        projectService: true,
      },
      globals: globals.browser,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ...react.configs["recommended-type-checked"],
    files: ["**/*.{ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: react,
      "react-hooks": hooksPlugin,
      "@next/next": next,
    },
    rules: {
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
      ...hooksPlugin.configs.recommended.rules,
      ...next.configs["recommended"].rules,
    },
  },
);
