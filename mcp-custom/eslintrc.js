module.exports = {
    env: {
      node: true,
      browser: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'no-console': 'error',
      'max-len': ['warn', 100],
      'indent': ['warn', 4],
      'semi-spacing': ['off'],
      'quotes': ['off'],
      'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
      '@typescript-eslint/explicit-module-boundaries': ['error'],
      '@typescript-eslint/naming-convention': ['error', {
        selector: 'Variable',
        format: 'camelCase',
      }],
    },
  };