import {FilterType} from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  /**
   * @type {IFilterType}
   */
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  /**
   * @method
   * @param {any} updateType
   * @param {IFilterType} filter
   */
  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
