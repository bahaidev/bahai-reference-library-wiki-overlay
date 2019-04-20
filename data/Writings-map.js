/* eslint-disable import/unambiguous, max-len */
const WritingsMap = {
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

const SpecialWritingsMap = {
  Bahai9: {},
  Bahaipedia: {'b/GWB': 'Gleanings from the Writings of Bahá’u’lláh', 'ab/ABL': '‘Abdu’l-Bahá in London'},
  Wikipedia: {'ab/WT': 'Will_and_Testament_of_`Abdu\'l-Bahá',
    'se/BA': 'Bahá\'í_Administration_(book)', 'se/DND': 'Dawn of a New Day (book)',
    'se/LDG1': 'Light of Divine Guidance', 'se/LDG2': 'Light of Divine Guidance',
    'uhj/PWP': 'The Promise of World Peace',
    'bwc/BK': 'Bahíyyih Khánum (book)',
    'nz/DB': 'The Dawn-Breakers'
  },
  Bahaiworks: {'b/GWB': 'Gleanings from the Writings of Bahá’u’lláh', 'ab/ABL': '‘Abdu’l-Bahá in London',
    'nz/DB': 'The Dawn-Breakers'
  }
};

const MissingWritingsMap = {
  Bahai9: [],
  Bahaipedia: [
    'b/PM', 'b/PB', 'b/SVFV',
    'ab/ABL', 'c/BWF', 'ab/MF', 'ab/TAB', 'ab/TN',
    'se/ARO', 'se/CF', 'se/DND', 'se/DG', 'se/HE', 'se/LANZ', 'se/LDG1', 'se/LDG2', 'se/MA', 'se/MC', 'se/MBW', 'se/PDC', 'se/UD',
    'uhj/PWP', 'bic/COL', 'bic/OCF', 'bic/PRH', 'bic/SB', 'c/BP', 'c/BE', 'c/CP', 'c/SCH', 'c/CW', 'c/HC', 'c/JWTA', 'bwc/BK'
  ],
  Wikipedia: [
    'b/PM', 'b/PB', 'b/SVFV',
    'ab/ABL', 'ab/MF', 'ab/PUP', 'ab/SAB', 'ab/TAF', 'ab/TAB', 'ab/TN',
    'se/ARO', 'se/CF', 'se/DND', 'se/DG', 'se/HE', 'se/LANZ', 'se/LDG1', 'se/LDG2', 'se/MA', 'se/MC', 'se/MBW', 'se/UD',
    'bic/COL', 'bic/OCF', 'bic/PRH', 'bic/SB', 'c/BP', 'c/BE', 'c/CP', 'c/SCH', 'c/CW', 'c/HC', 'c/JWTA', 'bwc/BK'
  ],
  Bahaiworks: [
    'b/PB',
    'ab/ABL', 'c/BWF', 'ab/MF', 'ab/PT', 'ab/MF', 'ab/SAB', 'ab/TAF', 'ab/TAB', 'ab/TDP', 'ab/TN', 'ab/WT',
    'se/ARO', 'se/BA', 'se/CF', 'se/DND', 'se/DG', 'se/GPB', 'se/HE',
    'se/LANZ', 'se/LDG1', 'se/LDG2', 'se/MA', 'se/MC', 'se/MBW', 'se/PDC', 'se/UD', 'se/WOB',
    'uhj/PWP', 'bic/COL', 'bic/OCF', 'bic/PRH', 'bic/SB', 'c/BP', 'c/BE', 'c/CP', 'c/SCH', 'c/CW', 'c/HC', 'c/JWTA', 'je/BNE', 'bwc/BK'
  ]
};
