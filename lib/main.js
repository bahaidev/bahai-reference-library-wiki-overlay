/*jslint regexp: true*/
/*globals exports, require */

// This is an active module of the Bahai Reference Library Wiki Overlay Add-on
exports.main = function() {
    'use strict';
    var data = require('sdk/self').data,
        pageMod = require('sdk/page-mod'),
        prefs = require('sdk/simple-prefs').prefs;

    pageMod.PageMod({
        include: /http:\/\/reference\.bahai\.org\/en\/t\/\w{1,3}\/.+/,
        contentScriptWhen: 'ready',
        contentScriptFile: [
            data.url('common.js'),
            data.url('Writings-map.js'),
            data.url('Writings-behavior-map.js'),
            data.url('wiki-overlay.js')
        ],
        onAttach: function (worker) {
            worker.port.emit('ready', [prefs]);
        }
    });
};
