// ==UserScript==
// @include http://reference.bahai.org/en/t/*
// ==/UserScript==

/*jslint regexp: true*/
/*globals self, WritingsMap, WritingsBehaviorMap, SpecialWritingsMap, baseURLs, siteNames, MissingWritingsMap, _$ */

self.port.on('ready', function (data) {
    'use strict';

    var pageTitle = _$('.pageTitle'),
        textNode = pageTitle.firstChild,
        // range = document.createRange(),
        // workInfo = _$('#workinfo'),
        fontSize = '9pt',
        newTextNode = textNode.cloneNode(true),
        workPath = window.location.href.replace(/http:\/\/reference\.bahai\.org\/en\/t\/([^\/]*\/[^\/]*)\/.*$/, '$1'),
        work = (WritingsMap[workPath] || newTextNode.textContent).replace(/ /g, '_');

    function addSpan (text) {
        var spanBegin = document.createElement('span');
        spanBegin.style.fontSize = fontSize;
        spanBegin.textContent = text;
        pageTitle.appendChild(spanBegin);
    }

    if (WritingsBehaviorMap[workPath]) {
        WritingsBehaviorMap[workPath](data, work);
    }

    addSpan('\u00a0 \u00a0 (');
    siteNames.forEach(function (siteName, i) {
        var wikiText,
            newNode = document.createElement('a'),
            space = document.createTextNode(' \u00a0'),
            created = MissingWritingsMap[siteName].indexOf(workPath) === -1;
        newNode.href = baseURLs[i] + encodeURIComponent(SpecialWritingsMap[siteName][workPath] || work) + (created ? '' : '?action=edit');
        newNode.id = 'brl-injected-link';
        newNode.target = '_blank';
        wikiText = document.createTextNode(siteName);
        newNode.appendChild(wikiText);
        newNode.style.fontSize = fontSize;
        newNode.style.color = created ? 'blue' : 'orange';
        newNode.style.textDecoration = 'underline';
        //workInfo.parentNode.insertBefore(space, workInfo);
        //workInfo.parentNode.insertBefore(newNode, workInfo);
        if (i !== 0) {
            pageTitle.appendChild(space);
        }
        pageTitle.appendChild(newNode);
    });
    addSpan(')');
});
