import {sortType} from '../const';

/**
 * @typedef {Object} SortTypeItemObject
 * @property {SortType} name
 * @property {boolean} disabled
 */
/**
 * sort list object
 * @type {{[key: string]: SortTypeItemObject}}
 */
const sort = {
  [sortType.DAY]: { name: sortType.DAY, disabled: false },
  [sortType.EVENT]: { name: sortType.EVENT, disabled: true },
  [sortType.TIME]: { name: sortType.TIME, disabled: false },
  [sortType.PRICE]: { name: sortType.PRICE, disabled: false },
  [sortType.OFFERS]: { name: sortType.OFFERS, disabled: true }
};

export {sort};
