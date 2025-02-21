/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 80,
  semi: true,
  vueIndentScriptAndStyle: false,
  bracketSpacing: true,
  bracketSameLine: false,
  singleAttributePerLine: false,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/env(.*)$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "",
    "^@/hooks/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "^@/components/(.*)$",
    "",
    "^[./]",
  ],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
