module.exports = {
  "env": {
    "webextensions": true
  },
  "settings": {
    "polyfills": [
    ]
  },
  "extends": ["ash-nazg/sauron"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "require-jsdoc": 0
  }
};
