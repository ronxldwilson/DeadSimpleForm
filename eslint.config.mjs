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
      // Disable unused vars check
      "@typescript-eslint/no-unused-vars": "off",
      
      // Allow explicit any type
      "@typescript-eslint/no-explicit-any": "off",
      
      // Allow unescaped entities in JSX
      "react/no-unescaped-entities": "off",
      
      // Disable exhaustive deps warning for useEffect
      "react-hooks/exhaustive-deps": "warn", // Keep as warning instead of error
    }
  }
];

export default eslintConfig;