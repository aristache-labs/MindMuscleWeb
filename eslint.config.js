import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Customize rules as needed
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      'max-lines': [
        'warn',
        {
          max: 1500, // Increased from 300 to 500 for React Native components
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      complexity: ['warn', { max: 15 }], // Increased from 10 to 15 for mobile UI logic
    },
  },
];

export default eslintConfig; 