const bahaiReflibDataSource = browser.runtime.getURL(
  '/data/vendor/bahai-reflib-data/src/index-browser.js'
);

const getDataSource = browser.runtime.getURL(
  '/data/vendor/bahai-reflib-data/src/getData.js'
);

// eslint-disable-next-line unicorn/no-unsafe-regex -- Todo
const collectionPattern = /^\/library\/(?<mainCollection>[^/]+)(?:\/(?<collection>[^/]+))?(?:\/(?<mainSection>[^/]+))?(?:\/(?<subSection>[^/]+))?(?:\/(?<extraSection>[^/]+))?\/?$/u;

/**
 * @param {Node} container
 * @returns {string}
 */
const getUrlForContainer = (container) => {
  const url = new URL(location);
  if (container) {
    url.pathname = url.pathname.replace(
      /(?<=\/)\d+$/u,
      container.dataset.fragment
    );
    url.hash = `#${
      container.querySelector('h2.brl-title .brl-location').id
    }`;
  }
  return url;
};

// const $ = (sel) => {
//   return document.querySelector(sel);
// };
// const $$ = (sel) => {
//   return [...document.querySelectorAll(sel)];
// };

const getURLGroups = (container) => {
  const url = getUrlForContainer(container);
  const match = collectionPattern.exec(url.pathname);

  // mainCollection
  // collection
  // mainSection
  // subSection
  return match.groups;
};

const wikifyLink = (link) => {
  return link.replace(/ /gu, '_');
};

const getSite = async () => {
  const [
    bahaiReflibData,
    {setFetch}
  ] = await Promise.all([
    bahaiReflibDataSource,
    getDataSource
  ].map((source) => {
    // eslint-disable-next-line no-unsanitized/method -- Own files
    return import(source);
  }));

  setFetch((path) => {
    const url = browser.runtime.getURL(path);
    return fetch(url);
  });

  const collections = await bahaiReflibData.getCollections();

  const works = await bahaiReflibData.getWorks();

  /**
   * Represents a website.
   */
  return class Site {
    /**
     * @returns {string}
     */
    #getExtraSectionRedirect () {
      const extraSectionPath = Site.#getExtraPath();
      return this.redirects?.extraSections?.[extraSectionPath];
    }

    /**
     * @param {Node} container
     * @returns {string}
     */
    #getSectionRedirect (container) {
      const sectionPath = Site.#getSectionPath(container);
      return this.redirects?.subSections?.[sectionPath];
    }

    /**
     * @returns {string}
     */
    #getWorkRedirect () {
      const workPath = Site.#getWorkPath();
      return this.redirects?.mainSections?.[workPath];
    }

    /**
     * @returns {string}
     */
    #getCollectionRedirect () {
      const collectionPath = Site.#getCollectionPath();
      return this.redirects?.collections?.[collectionPath];
    }

    /**
     * @returns {string}
     */
    #getMainCollectionRedirect () {
      const mainCollectionPath = Site.#getMainCollectionPath();
      return this.redirects?.mainCollections?.[mainCollectionPath];
    }

    /**
     * @returns {string}
     */
    static #getExtraPath () {
      const {
        mainCollection, collection, mainSection, subSection, extraSection
      } = getURLGroups();
      return `${mainCollection}/${collection}/` +
        `${mainSection}/${subSection}/${extraSection}`;
    }

    /**
     * @param {Node} container
     * @returns {string}
     */
    static #getSectionPath (container) {
      const {
        mainCollection, collection, mainSection, subSection
      } = getURLGroups(container);
      return `${mainCollection}/${collection}/${mainSection}/${subSection}`;
    }

    /**
     * @returns {string}
     */
    static #getWorkPath () {
      const {mainCollection, collection, mainSection} = getURLGroups();
      return `${mainCollection}/${collection}/${mainSection}`;
    }

    /**
     * @returns {string}
     */
    static #getCollectionPath () {
      const {mainCollection, collection} = getURLGroups();
      return `${mainCollection}/${collection}`;
    }

    /**
     * @returns {string}
     */
    static #getMainCollectionPath () {
      const {mainCollection} = getURLGroups();
      return mainCollection;
    }

    /**
     * @returns {boolean}
     */
    static #isExtraSection () {
      const {extraSection} = getURLGroups();
      return extraSection;
    }

    /**
     * @returns {boolean}
     */
    static #isSubSection () {
      const {subSection, extraSection} = getURLGroups();
      return subSection && !extraSection;
    }

    /**
     * @returns {boolean}
     */
    static #isMainSection () {
      const {mainSection, subSection} = getURLGroups();
      return mainSection && !subSection;
    }

    /**
     * @returns {boolean}
     */
    static #isCollection () {
      const {collection, mainSection} = getURLGroups();
      return collection && !mainSection;
    }

    /**
     * @returns {boolean}
     */
    static #isMainCollection () {
      const {mainCollection, collection} = getURLGroups();
      return mainCollection && !collection;
    }

    /**
     * @returns {Promise<boolean>}
     */
    static async isHidden () {
      const {
        brlMainCollectionHidden,
        brlCollectionHidden,
        brlMainSectionHidden,
        brlSubSectionHidden,
        brlExtraSectionHidden
      } = await browser.storage.local.get(null);

      return (
        (
          Site.#isMainCollection() && brlMainCollectionHidden
        ) ||
        (
          Site.#isCollection() && brlCollectionHidden
        ) ||
        (
          Site.#isMainSection() && brlMainSectionHidden
        ) ||
        (
          Site.#isSubSection() && brlSubSectionHidden
        ) ||
        (
          Site.#isExtraSection() && brlExtraSectionHidden
        )
      );
    }

    /**
     * @param {Node} container
     * @returns {string}
     */
    static getCurrentTitleHolder (container = document) {
      const $e = (sel) => {
        return container.querySelector(sel);
      };
      return Site.#isMainCollection()
        ? $e('h2.current-page')
        : Site.#isCollection()
          ? $e('.body-content h1.tabtitle')
          : Site.#isMainSection()
            ? $e('h1.publication-page-title')
            : Site.#isSubSection()
              ? $e('h2.brl-title')
              : Site.#isExtraSection()
                ? $e('.js-document-title .title-part-title')
                : null;
    }

    /**
     * @param {Node} container
     * @returns {string}
     */
    static getCurrentAnchorHolders (container = document) {
      return [
        ...container.querySelectorAll('a.brl-pnum')
      ]?.filter((anchorHolder) => {
        return anchorHolder.textContent &&
          // Avoid adding if child links already present
          !anchorHolder.querySelector('a');
      });
    }

    static {
      // Has to be early so that the titleHolder isn't populated
      //   recursively; we don't use for works since we want to use the
      //   work names uniformly based on the parent pages titling (used
      //   in APIs)
      this.currentTitle = Site.getCurrentTitleHolder()?.textContent;
    }

    /**
     * @param {string} currentTitle
     * @param {boolean} [created]
     * @returns {string|null}
     */
    #formURL (currentTitle, created = null) {
      if (!currentTitle) {
        return null;
      }
      return this.baseURL + encodeURI(
        this.wiki
          ? wikifyLink(currentTitle)
          : currentTitle
      ) + (typeof created === 'boolean'
        ? created || !this.wiki ? '' : '?action=edit'
        : '');
    }

    /**
     * @returns {Promise<string>}
     */
    async #getCurrentExtraSectionURL () {
      const created = !this.#isMissingCurrentExtraSection();
      let currentTitle = this.#getExtraSectionRedirect() ||
        (await bahaiReflibData.getFullInfoForUrl(
          location.href
        ))?.subSectionTitle;
      if (!currentTitle && !this.whitelist && !this.whitelistExtra) {
        const {
          workTitle,
          mainSectionTitle
        } = await bahaiReflibData.getFullInfoForUrl(
          location.href.replace(/#.*/u, '')
        );
        currentTitle = `${workTitle}/${mainSectionTitle}`;
      }
      return this.#formURL(currentTitle, created);
    }

    /**
     * @param {Node} container
     * @returns {Promise<string>}
     */
    async #getCurrentSectionURL (container) {
      const created = !this.#isMissingCurrentSection();
      let currentTitle = this.#getSectionRedirect(container);
      if (!currentTitle && !this.whitelist && !this.whitelistSection) {
        const url = getUrlForContainer(container);
        const {
          workTitle,
          subSectionTitle
        } = await bahaiReflibData.getFullInfoForUrl(
          url.toString()
        );
        currentTitle = `${workTitle}/${subSectionTitle}`;
      }

      return this.#formURL(currentTitle, created);
    }

    /**
     * @returns {string}
     */
    #getCurrentWorkURL () {
      const created = !this.#isMissingCurrentWork();

      const currentTitle = this.#getWorkRedirect() ||
        (!this.whitelist && !this.whitelistWork && (
          // We get this through the API to use the same work names as we query
          //   (i.e., from the parent page)
          works.find(({url}) => {
            return url === location.href;
          })?.title ||
          works.find(({url}) => {
            return url === location.href.replace(/#.*/u, '');
          })?.title)
        );

      return this.#formURL(currentTitle, created);
    }

    /**
     * @returns {string}
     */
    #getCurrentCollectionURL () {
      const currentTitle = this.#getCollectionRedirect() ||
        // We get this through the API to use the same work names as we query
        //   (i.e., from the parent page)
        (!this.whitelist && !this.whitelistCollection &&
          collections.find(({url}) => {
            return url === location.href;
          })?.title); // , language);
      return this.#formURL(currentTitle);
    }

    /**
     * @returns {string}
     */
    #getCurrentMainCollectionURL () {
      const currentTitle = this.#getMainCollectionRedirect() ||
        (!this.whitelist && !this.whitelistMainCollection &&
          Site.currentTitle);
      return this.#formURL(currentTitle);
    }

    /**
     * @param {object} cfg
     * @param {string} cfg.name
     * @param {string} cfg.baseURL
     * @param {boolean} cfg.wiki
     * @param {boolean} [cfg.whitelist=false] Set to true if you do not wish
     *   to have any fallbacks for redirects
     * @param {boolean} [cfg.whitelistExtra=false] Set to true if you do not
     *   wish to have an extra section fallback for redirecting
     * @param {boolean} [cfg.whitelistSection=false] Set to true if you do not
     *   wish to have a section fallback for redirecting
     * @param {boolean} [cfg.whitelistWork=false] Set to true if you do not
     *   wish to have a work fallback for redirecting
     * @param {boolean} [cfg.whitelistCollection=false] Set to true if you do
     *   not wish to have a collection fallback for redirecting
     * @param {boolean} [cfg.whitelistMainCollection=false] Set to true if you
     *   do not wish to have a main collection fallback for redirecting
     * @param {boolean} [cfg.defaultUncreated=false] Set to true if you wish
     *   orange links to be created not based on `missing` but if not handled
     * @param {{
     *   mainCollections: Object<string, string>,
     *   collections: Object<string, string>,
     *   mainSections: Object<string, string>,
     *   subSections: Object<string, string>,
     *   extraSections: Object<string, string>
     * }} cfg.hidden
     * @param {{
     *   mainSections: Object<string, string>,
     *   subSections: Object<string, string>,
     *   extraSections: Object<string, string>
     * }} [cfg.missing={mainSections: [], subSections: []}]
     * @param {{
     *   mainCollections: Object<string, string>,
     *   collections: Object<string, string>,
     *   mainSections: Object<string, string>,
     *   subSections: Object<string, string>,
     *   extraSections: Object<string, string>
     * }} [cfg.redirects] This should not normally be used as wikis
     *   under our control at least should have redirects.
     * @param {{
     *   work: Object<string, string>
     * }} [cfg.byVerseSupport={}] Works for which per-paragraph wiki pages
     *   are available.
     */
    constructor ({
      name, baseURL, wiki,
      whitelist, whitelistExtra, whitelistSection, whitelistWork,
      whitelistCollection, whitelistMainCollection,
      defaultUncreated,
      hidden = {
        mainCollections: [],
        collections: [],
        mainSections: [],
        subSections: []
      },
      missing = {
        // No `noMainCollections` or `collections` as should be significant
        //   enough to either be not used (hidden) or present
        mainSections: [], subSections: []
      },
      redirects = {
        mainSections: {}
      },
      byVerseSupport = {}
    }) {
      Object.assign(this, {
        name, baseURL, wiki,
        whitelist, whitelistExtra, whitelistSection, whitelistWork,
        whitelistCollection, whitelistMainCollection,
        defaultUncreated,
        hidden, missing, redirects, byVerseSupport
      });
    }

    /**
     * @returns {boolean}
     */
    #isMissingCurrentExtraSection () {
      const extraPath = Site.#getExtraPath();
      return (this.defaultUncreated && !this.#getExtraSectionRedirect()) ||
        (this.missing.extraSections || []).includes(extraPath);
    }

    /**
     * @param {Node} container
     * @returns {boolean}
     */
    #isMissingCurrentSection (container) {
      const sectionPath = Site.#getSectionPath();
      return (this.defaultUncreated && !this.#getSectionRedirect(container)) ||
        (this.missing.subSections || []).includes(sectionPath);
    }

    /**
     * @returns {boolean}
     */
    #isMissingCurrentWork () {
      const workPath = Site.#getWorkPath();
      return (this.defaultUncreated && !this.#getWorkRedirect()) ||
        (this.missing.mainSections || []).includes(workPath);
    }

    /**
     * @param {Node} container
     * @returns {boolean}
     */
    isMissingCurrent (container) {
      return (Site.#isMainSection() && this.#isMissingCurrentWork()) ||
        (Site.#isSubSection() && this.#isMissingCurrentSection(container)) ||
        (Site.#isExtraSection() && this.#isMissingCurrentExtraSection());
    }

    /**
     * @returns {boolean}
     */
    isHidden () {
      return (
        (
          Site.#isMainCollection() && this.hidden.mainCollections?.includes(
            Site.#getMainCollectionPath()
          )
        ) ||
        (
          Site.#isCollection() && this.hidden.collections?.includes(
            Site.#getCollectionPath()
          )
        ) ||
        (
          Site.#isMainSection() && this.hidden.mainSections?.includes(
            Site.#getWorkPath()
          )
        ) ||
        (
          Site.#isSubSection() && this.hidden.subSections?.includes(
            Site.#getSectionPath()
          )
        ) ||
        (
          Site.#isExtraSection() && this.hidden.extraSections?.includes(
            Site.#getExtraPath()
          )
        )
      );
    }

    /**
     * @param {Node} container Only needed for subSection-form URLs whose
     *   parent may need to be retrieved if it is a main (`/1`) form
     *   subsection.
     * @returns {Promise<string>}
     */
    async getCurrentURL (container) {
      return await (Site.#isMainCollection()
        ? this.#getCurrentMainCollectionURL()
        : Site.#isCollection()
          ? this.#getCurrentCollectionURL()
          : Site.#isMainSection()
            ? this.#getCurrentWorkURL()
            : Site.#isSubSection()
              ? this.#getCurrentSectionURL(container)
              : this.#getCurrentExtraSectionURL());
    }

    /**
     * @param {Node} container
     * @returns {Promise<string>}
     */
    async getCurrentAnchorBaseURL (container) {
      return `${
        (await this.getCurrentURL(container))
      }/${this.currentWorkByVerseSupport()}`;
    }

    /**
     * @returns {Promise<boolean>}
     */
    static async areAnchorLinksHidden () {
      const {
        brlAnchorLinksHidden
      } = await browser.storage.local.get(
        'brlAnchorLinksHidden'
      );

      return brlAnchorLinksHidden;
    }

    /**
     * @returns {Promise<boolean>}
     */
    static async areAnchorLinkIframesHidden () {
      const {
        brlAnchorLinkIframesHidden
      } = await browser.storage.local.get(
        'brlAnchorLinkIframesHidden'
      );

      return brlAnchorLinkIframesHidden;
    }

    /**
     * @returns {boolean}
     */
    currentWorkByVerseSupport () {
      const sectionPath = Site.#getSectionPath();
      const workPath = Site.#getWorkPath();

      return this.byVerseSupport.section?.[sectionPath] ||
        this.byVerseSupport.work?.[workPath];
    }
  };
};

export {getSite};
