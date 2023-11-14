module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prefer-arrow'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'arrow-body-style': ['error', 'as-needed'],
    'react-refresh/only-export-components': 'warn',

    'prefer-arrow-callback': ['error', { allowNamedFunctions: true, allowUnboundThis: false }],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: false,
      },
    ],
  },
};
