// ==UserScript==
// @include http://reference.bahai.org/en/t/*
// ==/UserScript==

var siteNames = ['Bahai9', 'Bahaipedia', 'Wikipedia', 'Bahaiworks'], // Used in SpecialWritingsMap
    baseURLs = ['https://bahai9.com/wiki/', 'https://bahaipedia.org/', 'https://en.wikipedia.org/wiki/', 'https://bahai.works/'],
    baseURL = baseURLs[0];

function _$ (sel) { 'use strict';
    return document.querySelector(sel);
}
function _$$ (sel) { 'use strict';
    return document.querySelectorAll(sel);
}
