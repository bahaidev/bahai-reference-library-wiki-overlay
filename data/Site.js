/* eslint-disable max-len -- Easier to track items */

const mainCollectionPattern = /^\/library\/[^/]+\/[^/]+\/$/u;

const $ = (sel) => {
  return document.querySelector(sel);
};

const writingsMap = {
  // 'b/ESW': 'Epistle to the Son of the Wolf',
  'b/GDM': 'Gems of Divine Mysteries', // 'Gems of Divine Mysteries (Javáhiru’l-Asrár)'
  'b/GWB': 'Gleanings from the Writings of Bahá\'u\'lláh', // 'Gleanings From the Writings of Bahá'u'lláh'
  'b/HW': 'Hidden Words', // 'The Hidden Words of Bahá'u'lláh'
  'b/KA': 'Kitáb-i-Aqdas', // 'The Kitáb-i-Aqdas'
  'b/KI': 'Kitáb-i-Íqán', // 'The Kitáb-i-Íqán'
  'b/PM': 'Prayers and Meditations', // 'Prayers and Meditations by Bahá'u'lláh'
  'b/PB': 'Proclamation of Bahá\'u\'lláh', // 'Proclamation of Bahá’u’lláh'
  'b/SVFV': 'Seven Valleys and the Four Valleys', // 'The Seven Valleys and the Four Valleys'
  'b/SLH': 'Summons of the Lord of Hosts', // 'The Summons of the Lord of Hosts'
  'b/TU': 'Tabernacle of Unity', // 'The Tabernacle of Unity'
  // 'b/TB': 'Tablets of Bahá’u’lláh Revealed After the Kitáb-i-Aqdas', // 'Tablets of Bahá’u’lláh Revealed After the Kitáb-i-Aqdas'

  'tb/SWB': 'Selections from the Writings of the Báb', // 'Selections From the Writings of the Báb'
  'ab/ABL': '`Abdu\'l-Bahá in London', // '': '‘Abdu’l-Bahá in London'
  'c/BWF': 'Bahá\'í World Faith', // 'Bahá’í World Faith—Selected Writings of Bahá’u’lláh and ‘Abdu’l-Bahá (‘Abdu’l-Bahá’s Section Only)'
  // 'c/FWU': 'Foundations of World Unity',
  // 'ab/MF': 'Memorials of the Faithful',
  // 'ab/PT': 'Paris Talks',
  'ab/PUP': 'Promulgation of Universal Peace', // 'The Promulgation of Universal Peace'
  'ab/SDC': 'Secret of Divine Civilization', // 'The Secret of Divine Civilization'
  'ab/SAB': 'Selections from the Writings of \'Abdu\'l-Bahá', // 'Selections from the Writings of ‘Abdu’l-Bahá'
  // 'ab/SAQ': 'Some Answered Questions',
  // 'ab/TAF': 'Tablet to August Forel',
  'ab/TAB': 'Tablets of \'Abdu\'l-Bahá', // 'Tablets of ‘Abdu’l-Bahá'
  // 'ab/TDP': 'Tablets of the Divine Plan',
  'ab/TN': 'Traveler\'s Narrative', // 'A Traveler's Narrative'
  'ab/WT': 'Will and Testament of \'Abdu\'l-Bahá', // 'The Will and Testament of ‘Abdu’l-Bahá'
  'se/ADJ': 'Advent of Divine Justice', // 'The Advent of Divine Justice'
  'se/ARO': 'Arohanui', // 'Arohanui: Letters to New Zealand'
  // 'se/BA': 'Bahá'í Administration',
  // 'se/CF': 'Citadel of Faith',
  // 'se/DND': 'Dawn of a New Day',
  // 'se/DG': 'Directives from the Guardian',
  // 'se/GPB': 'God Passes By',
  'se/HE': 'High Endeavours', // 'High Endeavours: Messages to Alaska'
  // 'se/LANZ': 'Letters from the Guardian to Australia and New Zealand',
  'se/LDG1': 'Light of Divine Guidance (vol1)', // 'The Light of Divine Guidance (Volume I)'
  'se/LDG2': 'Light of Divine Guidance (vol2)', // 'The Light of Divine Guidance (Volume II)'
  // 'se/MA': 'Messages to America',
  'se/MC': 'Messages to Canada',
  'se/MBW': 'Messages to the Bahá\'í World', // 'Messages to the Bahá'í World: 1950-1957'
  'se/PDC': 'Promised Day is Come', // 'The Promised Day is Come'
  'se/UD': 'Unfolding Destiny',
  'se/WOB': 'World Order of Bahá\'u\'lláh', // 'The World Order of Bahá'u'lláh'
  'uhj/PWP': 'Promise of World Peace', // 'The Promise of World Peace'

  // 'bic/COL': 'Century of Light',
  // 'bic/OCF': 'One Common Faith',
  'bic/PRH': 'Prosperity of Humankind',
  'bic/SB': 'Bahá\'u\'lláh (statement)',

  'c/BP': 'Bahá\'í Prayers', // 'Bahá'í Prayers: A selection of prayers revealed by Bahá'u'lláh, the Báb, and ‘Abdu’l-Baha.',
  'c/BE': 'Bahá\'í Education', // 'Compilation on Bahá'í Education',
  'c/CP': 'Peace (compilation)', // 'Compilation on Peace'
  'c/SCH': 'Scholarship (compilation)', // 'Compilation on Scholarship'
  'c/CW': 'Women (compilation)', // 'Compilation on Women'
  'c/HC': 'Huqúqu\'lláh—The Right of God', // 'Huqúqu’lláh—The Right of God'
  // 'c/JWTA': 'Japan Will Turn Ablaze!',

  'je/BNE': 'Bahá\'u\'lláh and the New Era',
  'bwc/BK': 'Bahíyyih Khánum (compilation)',
  'nz/DB': 'Dawn-Breakers' // , // 'The Dawn Breakers'

};

/**
 * Represents a website.
 */
class Site {
  /**
   * @returns {string}
   */
  #getRedirect () {
    const workPath = Site.#getWorkPath();
    return this.redirects[workPath] || workPath;
  }

  /**
   * @returns {string}
   */
  static #getWorkPath () {
    return location.href.replace(
      /https:\/\/(?:www\.)?bahai\.org\/library\/(?<work>[^/]*\/[^/]*)\/.*$/u,
      '$<work>'
    );
  }

  /**
   * @returns {string}
   */
  static #getHeading () {
    return $('h1.publication-page-title').textContent;
  }

  /**
   * @returns {string}
   */
  static #getWork () {
    const workPath = Site.#getWorkPath();
    return (workPath || Site.#getHeading()).replace(/ /gu, '_');
  }

  /**
   * @returns {boolean}
   */
  static #isMainCollection () {
    return mainCollectionPattern.test(location.pathname);
  }

  /**
   * @returns {string}
   */
  static getCurrentTitleHolder () {
    const isMainCollection = Site.#isMainCollection();
    return isMainCollection
      ? $('.body-content h1.tabtitle')
      // Todo: For secondary collections and individual pages
      : $();
  }

  static {
    this.currentTitle = Site.getCurrentTitleHolder().textContent;
  }

  /**
   * @returns {string}
   */
  #getCurrentWorkURL () {
    const created = !this.isMissingCurrentWork();
    return this.baseURL + encodeURI(
      this.#getRedirect() || Site.#getWork()
    ) + (created ? '' : '?action=edit');
  }

  /**
   * @returns {string}
   */
  #getCurrentPageURL () {
    return this.baseURL + encodeURI(Site.currentTitle);
  }

  /**
   * @param {object} cfg
   * @param {string} cfg.name
   * @param {string} cfg.baseURL
   * @param {string[]} [cfg.missing=[]]
   * @param {Object<string, string>} [cfg.redirects] This should not normally
   *   be used as wikis under our control at least should have redirects.
   * @param {string[]} [cfg.perParagraphSupport=[]] Works for which
   * per-paragraph wiki pages are available.
   */
  constructor ({
    name, baseURL,
    missing, redirects = [], perParagraphSupport = []
  }) {
    this.name = name;
    this.baseURL = baseURL;
    this.missing = missing || [];
    this.redirects = redirects;
    this.perParagraphSupport = perParagraphSupport;
  }

  /**
   * @returns {string}
   */
  isMissingCurrentWork () {
    const work = Site.#getWork();
    return this.missing.map((missingItem) => {
      return writingsMap[missingItem];
    }).includes(work);
  }

  /**
   * @returns {string}
   */
  getCurrentURL () {
    const isMainCollection = Site.#isMainCollection();
    return isMainCollection
      ? this.#getCurrentPageURL()
      : this.#getCurrentWorkURL();
  }

  /**
   * @returns {boolean}
   */
  currentWorkHasPerParagraphSupport () {
    const work = Site.#getWorkPath();
    return this.perParagraphSupport.includes(work);
  }
}

export {Site};
