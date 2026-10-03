import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scratch/**",
  ]),
  {
    plugins: {
      ...nextVitals[0]?.plugins,
    },
    rules: {
      // Enforce consistent return types for TypeScript functions
      "@typescript-eslint/explicit-function-return-type": "off",
      // Warn on unused variables but allow underscore-prefixed ones
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Prefer const over let when variable is not reassigned
      "prefer-const": "error",
      // Disallow var declarations
      "no-var": "error",
      // Enforce consistent import ordering
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      // React-specific rules
      "react/self-closing-comp": "warn",
      "react/jsx-sort-props": "off",
      // Performance: Avoid inline functions in JSX where possible
      "react/jsx-no-bind": "off",
    },
  },
]);

export default eslintConfig;
