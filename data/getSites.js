/* eslint-disable @stylistic/max-len -- Some titles are long */

const getSiteSource = browser.runtime.getURL('./data/getSite.js');

/**
 * @returns {Site[]}
 */
async function getSites () {
  const [
    {getSite}
  ] = await Promise.all([
    getSiteSource
  ].map((source) => {
    // eslint-disable-next-line no-unsanitized/method -- Own files
    return import(source);
  }));

  const Site = await getSite();

  // CONFIG
  // Allow disabling any in preferences?
  return {
    Site,
    sites: [
      new Site({
        name: 'Bahai9',
        baseURL: 'https://bahai9.com/wiki/',
        wiki: true,
        redirects: {
          subSections: {
            'authoritative-texts/bahaullah/kitab-i-aqdas/5': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/6': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/7': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/hidden-words/2': 'Hidden Words',
            'authoritative-texts/bahaullah/hidden-words/3': 'Hidden Words'
          }
        },
        byVerseSupport: {
          section: {
            'authoritative-texts/bahaullah/hidden-words/2': 'Hidden Words/Arabic/num',
            'authoritative-texts/bahaullah/hidden-words/3': 'Hidden Words/Persian/num'
          },
          work: {
            'authoritative-texts/bahaullah/kitab-i-aqdas': 'Kitáb-i-Aqdas/par',
            'authoritative-texts/bahaullah/kitab-i-iqan': 'Kitáb-i-Íqán/par'
          }
        }
      }),
      new Site({
        name: 'Bahaipedia',
        baseURL: 'https://bahaipedia.org/',
        wiki: true,
        missing: {
          mainSections: [
            'b/PB', // Proclamation of Bahá'u'lláh not on new bahai.org site
            'authoritative-texts/bahaullah/prayers-meditations',
            'authoritative-texts/bahaullah/seven-valleys-four-valleys',

            'ab/ABL', // 'Abdu'l-Bahá in London not on new bahai.org site
            'ab/TAB', // Tablets of 'Abdu'l-Bahá not on new bahai.org site
            'authoritative-texts/abdul-baha/memorials-faithful',
            'authoritative-texts/abdul-baha/travelers-narrative',

            // These Shoghi Effendi titles are not on the new site
            'se/ARO',
            'se/DND',
            'se/DG',
            'se/HE',
            'se/LANZ',
            'se/LDG1',
            'se/LDG2',
            'se/MA',
            'se/MC',
            'se/MBW',
            'se/UD',

            'authoritative-texts/shoghi-effendi/citadel-faith',
            'authoritative-texts/shoghi-effendi/promised-day-come',

            'other-literature/official-statements-commentaries/century-light',
            'other-literature/official-statements-commentaries/one-common-faith',
            'other-literature/official-statements-commentaries/prosperity-humankind',
            'other-literature/official-statements-commentaries/bahaullah',

            'authoritative-texts/compilations/peace',
            'authoritative-texts/compilations/scholarship',
            'authoritative-texts/compilations/women',
            'authoritative-texts/compilations/huququllah-right-god',
            'authoritative-texts/prayers/bahai-prayers',

            // These compilations are not on the newsite
            'c/BWF', // Bahá'í World Faith not on new bahai.org site
            'c/BE', // Bahá'í Education not on new bahai.org site
            'c/JWTA', // Japan Will Turn Ablaze not on new bahai.org site
            'bwc/BK' // Bahá'í Khanum compilation not on new bahai.org site
          ],
          subSections: [
            'authoritative-texts/the-universal-house-of-justice/messages/#19851001_001'
          ]
        },
        redirects: {
          subSections: {
            'authoritative-texts/bahaullah/kitab-i-aqdas/5': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/6': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/7': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/hidden-words/2': 'Hidden Words',
            'authoritative-texts/bahaullah/hidden-words/3': 'Hidden Words'
          },
          mainSections: {
            'authoritative-texts/shoghi-effendi/bahai-administration':
              'Bahá\'í Administration (book)'
          }
        }
      }),
      new Site({
        name: 'Wikipedia',
        baseURL: 'https://en.wikipedia.org/wiki/',
        wiki: true,
        missing: {
          mainSections: [
            'authoritative-texts/bahaullah/prayers-meditations',
            'b/PB', // Proclamation of Bahá'u'lláh not on new bahai.org site
            'authoritative-texts/bahaullah/seven-valleys-four-valleys',
            'ab/ABL', // 'Abdu'l-Bahá in London not on new bahai.org site
            'authoritative-texts/abdul-baha/memorials-faithful',
            'authoritative-texts/abdul-baha/travelers-narrative',
            'authoritative-texts/abdul-baha/promulgation-universal-peace',
            'authoritative-texts/abdul-baha/selections-writings-abdul-baha',
            'authoritative-texts/abdul-baha/tablet-august-forel',
            'ab/TAB', // Tablets of 'Abdu'l-Bahá not on new bahai.org site
            'authoritative-texts/shoghi-effendi/citadel-faith',
            // These Shoghi Effendi titles are not on the new site
            'se/ARO',
            'se/DND',
            'se/DG',
            'se/HE',
            'se/LANZ',
            'se/LDG1',
            'se/LDG2',
            'se/MA',
            'se/MC',
            'se/MBW',
            'se/UD',

            'other-literature/official-statements-commentaries/century-light',
            'other-literature/official-statements-commentaries/one-common-faith',
            'other-literature/official-statements-commentaries/prosperity-humankind',

            'other-literature/official-statements-commentaries/bahaullah',

            'authoritative-texts/compilations/peace',
            'authoritative-texts/compilations/scholarship',
            'authoritative-texts/compilations/women',
            'authoritative-texts/compilations/huququllah-right-god',
            'authoritative-texts/prayers/bahai-prayers',

            // These compilations are not on the newsite
            'c/BE', // Bahá'í Education not on new bahai.org site
            'c/JWTA', // Japan Will Turn Ablaze not on new bahai.org site
            'bwc/BK' // Bahá'í Khanum compilation not on new bahai.org site
          ]
        },
        redirects: {
          subSections: {
            'authoritative-texts/bahaullah/kitab-i-aqdas/5': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/6': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/7': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/hidden-words/2': 'Hidden Words',
            'authoritative-texts/bahaullah/hidden-words/3': 'Hidden Words'
          }
        }
      }),
      new Site({
        name: 'Bahaiworks',
        baseURL: 'https://bahai.works/',
        wiki: true,
        missing: {
          mainSections: [
            'b/PB', // Proclamation of Bahá'u'lláh not on new bahai.org site
            'ab/ABL', // 'Abdu'l-Bahá in London not on new bahai.org site
            'c/BWF', // Bahá'í World Faith not on new bahai.org site
            'authoritative-texts/abdul-baha/memorials-faithful',
            'authoritative-texts/abdul-baha/travelers-narrative',
            'authoritative-texts/abdul-baha/paris-talks',
            'authoritative-texts/abdul-baha/selections-writings-abdul-baha',
            'authoritative-texts/abdul-baha/tablet-august-forel',
            'ab/TAB', // Tablets of 'Abdu'l-Bahá not on new bahai.org site
            'authoritative-texts/abdul-baha/tablets-divine-plan',
            'authoritative-texts/abdul-baha/will-testament-abdul-baha',
            'authoritative-texts/shoghi-effendi/bahai-administration',
            'authoritative-texts/shoghi-effendi/citadel-faith',
            'authoritative-texts/shoghi-effendi/promised-day-come',
            'authoritative-texts/shoghi-effendi/god-passes-by',
            'authoritative-texts/shoghi-effendi/world-order-bahaullah',
            // These Shoghi Effendi titles are not on the new site
            'se/ARO',
            'se/DND',
            'se/DG',
            'se/HE',
            'se/LANZ',
            'se/LDG1',
            'se/LDG2',
            'se/MA',
            'se/MC',
            'se/MBW',
            'se/UD',

            'other-literature/official-statements-commentaries/century-light',
            'other-literature/official-statements-commentaries/one-common-faith',
            'other-literature/official-statements-commentaries/prosperity-humankind',

            'other-literature/official-statements-commentaries/bahaullah',

            'authoritative-texts/compilations/peace',
            'authoritative-texts/compilations/women',
            'authoritative-texts/compilations/huququllah-right-god',
            'authoritative-texts/prayers/bahai-prayers',

            // These compilations are not on the newsite
            'c/BE', // Bahá'í Education not on new bahai.org site
            'c/JWTA', // Japan Will Turn Ablaze not on new bahai.org site
            'bwc/BK', // Bahá'í Khanum compilation not on new bahai.org site

            'authoritative-texts/compilations/scholarship',
            'other-literature/publications-individual-authors/bahaullah-new-era'
          ],
          subSections: [
            'authoritative-texts/the-universal-house-of-justice/messages/#19851001_001'
          ]
        },
        redirects: {
          subSections: {
            'authoritative-texts/bahaullah/kitab-i-aqdas/5': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/6': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/7': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/hidden-words/2': 'Hidden Words',
            'authoritative-texts/bahaullah/hidden-words/3': 'Hidden Words'
          }
        }
      }),
      new Site({
        name: 'Bahai.media',
        baseURL: 'https://bahai.media/Category:',
        wiki: true
      }),
      // Crashing in Chrome (but not Firefox)
      new Site({
        name: 'Index',
        whitelist: true,
        baseURL: 'https://bahai-browser.org/indexes/',
        wiki: false,
        redirects: {
          mainSections: {
            'authoritative-texts/bahaullah/kitab-i-aqdas': 'json/' +
              '?entriesOrLinks=2&collapse=collapseSearchEntriesPages' +
              '&books=2',
            'authoritative-texts/bahaullah/kitab-i-iqan': 'json/' +
              '?entriesOrLinks=2&collapse=collapseSearchEntriesPages' +
              '&books=3',
            'authoritative-texts/bahaullah/gleanings-writings-bahaullah': 'json/' +
              '?entriesOrLinks=2&collapse=collapseSearchEntriesPages' +
              '&books=1'
          },
          subSections: {
            'authoritative-texts/bahaullah/kitab-i-aqdas/5': 'json/' +
              '?entriesOrLinks=2&collapse=collapseSearchEntriesPages' +
              '&books=2',
            'authoritative-texts/bahaullah/kitab-i-aqdas/6': 'json/' +
              '?entriesOrLinks=2&collapse=collapseSearchEntriesPages' +
              '&books=2',
            'authoritative-texts/bahaullah/kitab-i-aqdas/7': 'json/' +
              '?entriesOrLinks=2&collapse=collapseSearchEntriesPages' +
              '&books=2'
          }
        },
        byVerseSupport: {
          work: {
            'authoritative-texts/bahaullah/kitab-i-aqdas':
              'json/?entriesOrLinksPages=2&collapse=collapseSearchEntries' +
              '&booksPages=2&indexPage=K'
          }
        }
      }),
      new Site({
        name: 'B-L tags',
        whitelist: true,
        baseURL: 'https://bahai-library.com/tags/',
        wiki: false,
        redirects: {
          subSections: {
            'authoritative-texts/bahaullah/kitab-i-aqdas/5': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/6': 'Kitáb-i-Aqdas',
            'authoritative-texts/bahaullah/kitab-i-aqdas/7': 'Kitáb-i-Aqdas'
          }
        }
      })
    ]
  };
}

export {getSites};
