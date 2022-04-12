'use strict';
/**
 *
 * @param {string} work
 * @param {string} baseURL
 * @returns {void}
 */
function addParagraphClickListener (work, baseURL) {
  let url;
  const baseURLPar = baseURL + work + '/par',
    params = ''; // '?useskin=chick'; // Reenable if we use internal dialog and we can propagate this useskin parameter: see https://stackoverflow.com/questions/14698059/persist-mediawiki-skin-by-url-parameter/14712967

  window.addEventListener('click', function (e) {
    if (e.button === 2 ||
      // User may be trying to copy paste text
      window.getSelection().toString() !== '') {
      return;
    }

    const el = e.target;
    if (el.className === 'Sparanumber') {
      url = baseURLPar + el.textContent + params;
    } else if ([
      'Stext2', 'Sblockquote2', 'Stext2Noindent'
    ].includes(el.className)) {
      url = baseURLPar +
        el.parentNode.previousElementSibling.textContent + params;
    } else {
      return;
    }

    window.open(url);
  });
}

const WritingsBehaviorMap = {
  'b/KA': addParagraphClickListener,
  'b/KI': addParagraphClickListener
};
