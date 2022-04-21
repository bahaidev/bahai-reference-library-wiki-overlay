import './polyfills/browser-polyfill.js';
import {$} from './data/vendor/jamilih/jml-es-noinnerh.js';

$('#search').addEventListener('submit', (e) => {
  e.preventDefault();
  const baseURL = 'https://www.bahai.org/library/authoritative-texts/search#';

  browser.tabs.create({
    active: true,
    url: `${baseURL}${new URLSearchParams({
      q: $('#searchTerm').value,
      s: $('#searchCategory').value
    })}`
  });
});
