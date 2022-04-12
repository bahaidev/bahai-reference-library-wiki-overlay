import {$} from './utils.js';

// CONFIG
const siteNames = [
  'Bahai9', 'Bahaipedia', 'Wikipedia', 'Bahaiworks'
]; // Used in `SpecialWritingsMap`

// Add bahai.media? bahai-library.com/tags ? bahai-browser.org/indexes/ ?
const baseURLs = [
  'https://bahai9.com/wiki/', 'https://bahaipedia.org/',
  'https://en.wikipedia.org/wiki/', 'https://bahai.works/'
];
const [baseURL] = baseURLs;

const pageTitle = $('.pageTitle'),
  textNode = pageTitle.firstChild,
  // range = document.createRange(),
  // workInfo = $('#workinfo'),
  fontSize = '9pt',
  newTextNode = textNode.cloneNode(true),
  // Todo: Check: /http:\/\/reference\.bahai\.org\/en\/t\/\w{1,3}\/.+/u,
  workPath = location.href.replace(

    /http:\/\/reference\.bahai\.org\/en\/t\/(?<work>[^/]*\/[^/]*)\/.*$/u, '$<work>'
  ),
  work = (WritingsMap[workPath] || newTextNode.textContent).replace(/ /gu, '_');

/**
 *
 * @param {string} text
 * @returns {void}
 */
function addSpan (text) {
  const spanBegin = document.createElement('span');
  spanBegin.style.fontSize = fontSize;
  spanBegin.textContent = text;
  pageTitle.append(spanBegin);
}

if (WritingsBehaviorMap[workPath]) {
  // eslint-disable-next-line max-len -- Too long
  WritingsBehaviorMap[workPath](work, baseURL); // lgtm [js/unvalidated-dynamic-method-call]
}

const nbsp = '\u00A0';
addSpan(`${nbsp} ${nbsp} (`);

siteNames.forEach(function (siteName, i) {
  const newNode = document.createElement('a'),
    space = document.createTextNode(' \u00A0'),
    created = !MissingWritingsMap[siteName].includes(workPath);

  newNode.href = baseURLs[i] + encodeURIComponent(
    SpecialWritingsMap[siteName][workPath] || work
  ) + (created ? '' : '?action=edit');

  newNode.id = 'brl-injected-link';
  newNode.target = '_blank';

  const wikiText = siteName;
  newNode.append(wikiText);

  newNode.style.fontSize = fontSize;
  newNode.style.color = created ? 'blue' : 'orange';
  newNode.style.textDecoration = 'underline';

  // workInfo.parentNode.insertBefore(space, workInfo);
  // workInfo.parentNode.insertBefore(newNode, workInfo);
  if (i !== 0) {
    pageTitle.append(space);
  }
  pageTitle.append(newNode);
});

addSpan(')');
