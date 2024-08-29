import ashNazg from 'eslint-config-ash-nazg';
import globals from 'globals';

export default [
  {
    ignores: [
      'polyfills/browser-polyfill.js',
      'data/vendor',
      'chrome',
      'safari',
      'opera'
    ]
  },
  {
    languageOptions: {
      globals: globals.webextensions
    }
  },
  ...ashNazg(['sauron', 'browser']),
  {
    rules: {
      'import/unambiguous': 0,
      'import/no-commonjs': 0
    }
  }
];
