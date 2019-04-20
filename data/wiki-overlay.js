/* eslint-disable strict, import/unambiguous */

/* globals self, WritingsMap, WritingsBehaviorMap,
  SpecialWritingsMap, baseURLs, siteNames, MissingWritingsMap, _$ */

self.port.on('ready', function (data) {
  'use strict';

  const pageTitle = _$('.pageTitle'),
    textNode = pageTitle.firstChild,
    // range = document.createRange(),
    // workInfo = _$('#workinfo'),
    fontSize = '9pt',
    newTextNode = textNode.cloneNode(true),
    // eslint-disable-next-line unicorn/no-unsafe-regex
    workPath = location.href.replace(/http:\/\/reference\.bahai\.org\/en\/t\/([^/]*\/[^/]*)\/.*$/u, '$1'),
    work = (WritingsMap[workPath] || newTextNode.textContent).replace(/ /gu, '_');

  function addSpan (text) {
    const spanBegin = document.createElement('span');
    spanBegin.style.fontSize = fontSize;
    spanBegin.textContent = text;
    pageTitle.append(spanBegin);
  }

  if (WritingsBehaviorMap[workPath]) {
    WritingsBehaviorMap[workPath](data, work); // lgtm [js/unvalidated-dynamic-method-call]
  }

  addSpan('\u00A0 \u00A0 (');
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
});
