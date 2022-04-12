import '../polyfills/browser-polyfill.js';

/* globals exports, require -- Need to fix */

// This is an active module of the Bahai Reference Library Wiki Overlay Add-on
exports.main = function () {
  'use strict';
  const {data} = require('sdk/self'),
    pageMod = require('sdk/page-mod'),
    {prefs} = require('sdk/simple-prefs');

  pageMod.PageMod({
    include: /http:\/\/reference\.bahai\.org\/en\/t\/\w{1,3}\/.+/u,
    contentScriptWhen: 'ready',
    contentScriptFile: [
      data.url('common.js'),
      data.url('Writings-map.js'),
      data.url('Writings-behavior-map.js'),
      data.url('wiki-overlay.js')
    ],
    onAttach (worker) {
      worker.port.emit('ready', [prefs]);
    }
  });
};
