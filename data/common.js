'use strict';

const siteNames = [
  'Bahai9', 'Bahaipedia', 'Wikipedia', 'Bahaiworks'
]; // Used in SpecialWritingsMap
const baseURLs = [
  'https://bahai9.com/wiki/', 'https://bahaipedia.org/',
  'https://en.wikipedia.org/wiki/', 'https://bahai.works/'
];
const [baseURL] = baseURLs;

function $ (sel) {
  return document.querySelector(sel);
}
function $$ (sel) {
  return document.querySelectorAll(sel);
}
