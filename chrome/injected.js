// Added this file and object for the sake of adapting Firefox-based code for Chrome
const self = {port:{on: function (type, cb) {'use strict';
    // We add regex check in Chrome to be safe since match patterns not as precise as regex as we use in Firefox
    if (window.location.href.match(/http:\/\/reference\.bahai\.org\/en\/t\/\w{1,3}\/.+/)) {
        cb();
    }
}}};
