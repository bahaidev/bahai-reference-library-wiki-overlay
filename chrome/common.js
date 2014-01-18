var siteNames = ['Bahai9', 'Bahaikipedia', 'Wikipedia', 'Bahaitext'], // Used in SpecialWritingsMap
    baseURLs = ['http://bahai9.com/wiki/', 'http://bahaikipedia.org/', 'http://en.wikipedia.org/wiki/', 'http://en.bahaitext.org/'],
    baseURL = baseURLs[0];

function _$ (sel) {
    return document.querySelector(sel);
}
function _$$ (sel) {
    return document.querySelectorAll(sel);
}