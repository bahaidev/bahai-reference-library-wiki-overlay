/* eslint-env browser, webextensions -- Has own globals */
import {jml} from '../data/vendor/jamilih/jml-es-noinnerh.js';

/**
 * @param {...string} args
 * @returns {string}
 */
function _ (...args) {
  return browser.i18n.getMessage(...args);
}

document.title = _('extensionName'); // If switch to tabs
(async () => {
jml('section', await Promise.all([
  ['brlMainCollectionHidden'],
  ['brlCollectionHidden'],
  ['brlMainSectionHidden'],
  ['brlSubSectionHidden'],
  ['brlExtraSectionHidden'],
  ['brlAnchorLinksHidden'],
  ['brlAnchorLinkIframesHidden']
].map(async ([preferenceKey]) => {
  let enabled = false;
  try {
    ({[preferenceKey]: enabled = false} =
        await browser.storage.local.get(preferenceKey));
  } catch (err) {}
  return ['label', [
    ['input', {
      type: 'checkbox',
      checked: enabled,
      $on: {
        async change ({target}) {
          await browser.storage.local.set({
            [preferenceKey]: target.checked
          });
        }
      }
    }],
    ' ',
    _(preferenceKey + '_title'),
    ['section', {class: 'addon-description'}, [
      _(preferenceKey + '_description')
    ]],
    ['br']
  ]];
})), document.body);
})();
