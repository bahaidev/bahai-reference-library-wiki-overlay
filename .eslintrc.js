'use strict';

module.exports = {
  env: {
    webextensions: true,
    browser: true,
    'shared-node-browser': false
  },
  settings: {
    polyfills: [
      'Promise.all'
    ]
  },
  extends: ['ash-nazg/sauron-overrides'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    'require-jsdoc': 0,
    strict: 0,
    'import/unambiguous': 0,
    'import/no-commonjs': 0
  }
};
