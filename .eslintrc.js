module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': [0, 'never'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-underscore-dangle': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-restricted-exports': 'off',
    'react/jsx-pascal-case': 'off',
    // "typescript/eslint/ban"
    'max-classes-per-file': 'off',
    '@typescript-eslint/ban-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'no-empty': 'off',
    'react/no-unescaped-entities': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
