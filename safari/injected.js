// Added this object for the sake of Safari
var self = {port:{on: function (type, cb) {
    // We add regex check in Safari to be safe since match patterns not as precise as regex as we use in Firefox
    if (window.location.href.match(/http:\/\/reference\.bahai\.org\/en\/t\/\w{1,3}\/.+/)) {
        cb();
    }
}}};
