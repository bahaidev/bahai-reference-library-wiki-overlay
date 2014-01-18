// ==UserScript==
// @include http://reference.bahai.org/en/t/*
// ==/UserScript==

// Added this object for the sake of adapting Firefox-based code for Opera

var self = {port:{on: function (type, cb) {
    // We add regex check in Opera to be safe since match patterns not as precise as regex as we use in Firefox
    if (window.location.href.match(/http:\/\/reference\.bahai\.org\/en\/t\/\w{1,3}\/.+/)) {
        window.addEventListener('DOMContentLoaded', function () {
            cb();
        }, false);
    }
}}};
