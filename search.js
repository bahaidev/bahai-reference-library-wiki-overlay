import {render, html} from
  './data/vendor/bahai-reflib-data-server/vendor/uhtml/esm.js';
import {
  getWorkNames, getSectionInfoForWork, getParagraphsForSectionId,
  getUrlForId, getIdForWorkSectionAndParagraph, getSubsectionUrlForWork,
  getUrlForWork
} from
  './data/vendor/bahai-reflib-data/src/index-browser.js';

import setChooseWorkSectionParagraph from
  // eslint-disable-next-line max-len -- Too Long
  './data/vendor/bahai-reflib-data-server/views/set-choose-work-section-paragraph.js';

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

setChooseWorkSectionParagraph({
  /**
   * @type {JsonFetcher}
   */
  async workNamesFetch () {
    return await getWorkNames();
  },
  /**
   * @type {JsonFetcher}
   */
  async setupSectionFetch (url) {
    const {searchParams} = new URL(url, location);
    const work = searchParams.get('work');
    return (await getSectionInfoForWork(
      work // language
    )).map(({id, title}) => {
      return [id, title];
    });
  },
  /**
   * @type {JsonFetcher}
   */
  async paragraphsForSectionIdFetch (url) {
    const {searchParams} = new URL(url, location);
    const id = searchParams.get('id');
    const paragraphs = await getParagraphsForSectionId(id);
    return paragraphs || [];
  },
  /**
   * @type {JsonFetcher}
   */
  async urlForIdFetch (url) {
    const {searchParams} = new URL(url, location);
    const id = searchParams.get('id');
    return await getUrlForId(id);
  },
  /**
   * @type {JsonFetcher}
   */
  async idForWorkSectionAndParagraphFetch (url) {
    const {searchParams} = new URL(url, location);
    const work = searchParams.get('work');
    const section = searchParams.get('section');
    const paragraph = searchParams.get('paragraph');
    return await getIdForWorkSectionAndParagraph(work, section, paragraph);
  },
  /**
   * @type {JsonFetcher}
   */
  async subsectionUrlForWorkFetch (url) {
    const {searchParams} = new URL(url, location);
    const work = searchParams.get('work');
    return await getSubsectionUrlForWork(work);
  },
  /**
   * @type {JsonFetcher}
   */
  async urlForWorkFetch (url) {
    const {searchParams} = new URL(url, location);
    const work = searchParams.get('work');
    return await getUrlForWork(work);
  },

  /**
   * @param {string} url
   * @returns {void}
   */
  redirectHandler (url) {
    browser.tabs.create({
      active: true,
      url
    });
  }
});

render($('#jumpToPage'), html`
  <main>
    <choose-work-section-paragraph redirect local-fetch>
    </choose-work-section-paragraph>
  </main>
`);
