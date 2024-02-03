import {SortType} from '../const';

/**
 * @typedef {Object} SortTypeItemObject
 * @property {ISortType} name
 * @property {boolean} disabled
 */
/**
 * sort list object
 * @type {{[key: string]: SortTypeItemObject}}
 */
const sort = {
  [SortType.DAY]: { name: SortType.DAY, disabled: false },
  [SortType.EVENT]: { name: SortType.EVENT, disabled: true },
  [SortType.TIME]: { name: SortType.TIME, disabled: false },
  [SortType.PRICE]: { name: SortType.PRICE, disabled: false },
  [SortType.OFFERS]: { name: SortType.OFFERS, disabled: true }
};

export {sort};
