const jamilihSource = chrome.runtime.getURL(
  '/data/vendor/jamilih/jml-es-noinnerh.js'
);
const writingsMapSource = chrome.runtime.getURL('./data/Site.js');
// const addParagraphClickListenerSource =
//    chrome.runtime.getURL('./addParagraphClickListener.js');

(async () => {
const [
  {jml, nbsp},
  {Site}
  // addParagraphClickListener
] = await Promise.all([
  jamilihSource,
  writingsMapSource
  // addParagraphClickListenerSource
].map((source) => {
  // eslint-disable-next-line no-unsanitized/method -- Own files
  return import(source);
}));

// CONFIG
// Add bahai.media? bahai-library.com/tags ? bahai-browser.org/indexes/ ?
// Allow disabling any in preferences?
const sites = [
  new Site({
    name: 'Bahai9',
    baseURL: 'https://bahai9.com/wiki/',
    perParagraphSupport: ['b/KA', 'b/KI']
  }),
  new Site({
    name: 'Bahaipedia',
    baseURL: 'https://bahaipedia.org/',
    missing: [
      'b/PM', 'b/PB', 'b/SVFV',
      'ab/ABL', 'c/BWF', 'ab/MF', 'ab/TAB', 'ab/TN',
      'se/ARO', 'se/CF', 'se/DND', 'se/DG', 'se/HE', 'se/LANZ',
      'se/LDG1', 'se/LDG2', 'se/MA', 'se/MC', 'se/MBW', 'se/PDC', 'se/UD',
      'uhj/PWP', 'bic/COL', 'bic/OCF', 'bic/PRH', 'bic/SB', 'c/BP',
      'c/BE', 'c/CP', 'c/SCH', 'c/CW', 'c/HC', 'c/JWTA', 'bwc/BK'
    ],
    redirects: {
      'ab/WT': 'Will and Testament of `Abdu\'l-Bahá',
      'se/BA': 'Bahá\'í Administration (book)',
      'se/DND': 'Dawn of a New Day (book)',
      'se/LDG1': 'Light of Divine Guidance',
      'se/LDG2': 'Light of Divine Guidance',
      'uhj/PWP': 'The Promise of World Peace',
      'bwc/BK': 'Bahíyyih Khánum (book)',
      'nz/DB': 'The Dawn-Breakers'
    }
  }),
  new Site({
    name: 'Wikipedia',
    baseURL: 'https://en.wikipedia.org/wiki/',
    missing: [
      'b/PM', 'b/PB', 'b/SVFV',
      'ab/ABL', 'ab/MF', 'ab/PUP', 'ab/SAB', 'ab/TAF', 'ab/TAB', 'ab/TN',
      'se/ARO', 'se/CF', 'se/DND', 'se/DG', 'se/HE', 'se/LANZ', 'se/LDG1',
      'se/LDG2', 'se/MA', 'se/MC', 'se/MBW', 'se/UD',
      'bic/COL', 'bic/OCF', 'bic/PRH', 'bic/SB', 'c/BP', 'c/BE', 'c/CP',
      'c/SCH', 'c/CW', 'c/HC', 'c/JWTA', 'bwc/BK'
    ]
  }),
  new Site({
    name: 'Bahaiworks',
    baseURL: 'https://bahai.works/',
    missing: [
      'b/PB',
      'ab/ABL', 'c/BWF', 'ab/MF', 'ab/PT', 'ab/MF', 'ab/SAB', 'ab/TAF',
      'ab/TAB', 'ab/TDP', 'ab/TN', 'ab/WT',
      'se/ARO', 'se/BA', 'se/CF', 'se/DND', 'se/DG', 'se/GPB', 'se/HE',
      'se/LANZ', 'se/LDG1', 'se/LDG2', 'se/MA', 'se/MC', 'se/MBW', 'se/PDC',
      'se/UD', 'se/WOB',
      'uhj/PWP', 'bic/COL', 'bic/OCF', 'bic/PRH', 'bic/SB', 'c/BP', 'c/BE',
      'c/CP', 'c/SCH', 'c/CW', 'c/HC', 'c/JWTA', 'je/BNE', 'bwc/BK'
    ]
  })
];

const fontSize = '9pt';
/**
 *
 * @param {string} text
 * @returns {void}
 */
const addSpan = (text) => {
  /* const spanBegin = */ jml('span', {
    style: {fontSize}
  }, [
    text
  ], titleHolder);
};

const createLinkForSite = (siteInstance) => {
  const href = siteInstance.getCurrentURL();
  const created = !siteInstance.isMissingCurrentWork();
  return jml(
    'a', {
      href,
      className: 'brl-injected-link',
      target: '_blank',
      style: {
        fontSize,
        color: created ? 'blue' : 'orange',
        textDecoration: 'underline'
      }
    }, [
      siteInstance.name
    ]
  );
};

// e.g., https://www.bahai.org/library/authoritative-texts/bahaullah/
const titleHolder = Site.getCurrentTitleHolder();

addSpan(`${nbsp} ${nbsp} (`);

sites.forEach((site, i) => {
  site.currentWorkHasPerParagraphSupport(); // Todo

  const siteLink = createLinkForSite(site);

  if (i !== 0) {
    titleHolder.append(nbsp.repeat(2));
  }
  titleHolder.append(siteLink);
});

addSpan(')');
})();
