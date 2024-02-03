/**
 * @typedef {('UPDATE_EVENT' | 'ADD_EVENT' | 'DELETE_EVENT')} UserActionType
 */
/**
 * @type {{[key: string], UserActionType}}
 */
const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

/**
 * @typedef {('PATCH' | 'MINOR' | 'MAJOR')} UpdateType
 */
/**
 * @type {{[key: string], UpdateType}}
 */
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

/**
 * @typedef {('everything'|'future'|'present'|'past')} IFilterType
 */
/**
 * @type {{[key: string], IFilterType}}
 */
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

/**
 * @typedef {('day'|'event'|'time'|'price'|'offers')} ISortType
 */
/**
 * @type {{[key: string], ISortType}}
 */
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export {FilterType, SortType, UserAction, UpdateType};
