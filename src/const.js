const filterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

/**
 * @typedef {('day'|'event'|'time'|'price'|'offers')} SortType
 */
/**
 * @type {{[key: string], SortType}}
 */
const sortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export {filterType, sortType};
