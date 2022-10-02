const prettierConfig = require("./prettier.config");

module.exports = {
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:testcafe/recommended"
  ],
  globals: {
    testcafe: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "allowImportExportEverywhere": true,
    "ecmaFeatures": {
      "modules": true,
      "legacyDecorators": true
    }
  },
  ignorePatterns: [
    ".eslintrc.js",
  ],
  plugins: [
    "@typescript-eslint",
    "prettier",
    "import",
    "jest",
    "testcafe"
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "prettier/prettier": ["error", prettierConfig],
    "prefer-const": "error",
    "require-atomic-updates": "warn",
    "valid-jsdoc": [
      "error",
      {"requireReturnType": false, "requireParamType": false, "requireReturn": false}
    ],
    "import/named": "off",
    "import/no-useless-path-segments": "warn",
    "import/first": "warn",
    "import/order": ["warn", {
      "newlines-between": "always",
      "alphabetize": {"order": "asc", "caseInsensitive": true},
      "warnOnUnassignedImports": true
    }],
    "import/newline-after-import": ["warn"],
    "sort-imports": ["warn", {
      "ignoreCase": false,
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
      "allowSeparatedGroups": false
  }],
    "@typescript-eslint/no-non-null-assertion": "error",
    "camelcase": "off",
    "no-multiple-empty-lines": ["warn"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "enumMember",
        "format": ["UPPER_CASE", "PascalCase", "camelCase"]
      },
      {
        "selector": "function",
        "format": ["PascalCase", "camelCase"]
      },
      {
        "selector": "variable",
        "format": ["PascalCase", "camelCase", "UPPER_CASE"],
        "leadingUnderscore": "allow"
      }
    ],
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": ["error"],
    "no-duplicate-imports": "off",
    "@typescript-eslint/no-duplicate-imports": ["error"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["error"],
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": ["error"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", {"ignoreRestSiblings": true}],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["warn"],
    "no-undef": "off",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/no-namespace": "error",
    "max-lines": "warn",
    "no-console": ["error", { "allow": ["log"] }],
    "no-debugger": ["error"],
    "no-loop-func": 1,
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-warning-comments": 1,
    "@typescript-eslint/no-var-requires": 0
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
