module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true
  },
  extends: ['react-app', 'eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'jest'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'comma-spacing': ['error', { before: false, after: true }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'react/prop-types': 0
  }
};
