import AbstractView from '../framework/view/abstract-view';
import {sortType} from '../const';
import {sort} from '../utils/sort';

/**
 * method to create item of sort form
 * @method
 * @param {SortType} currentSortType
 * @param {SortTypeItemObject} sortItem
 */
function createSortItemTemplate(currentSortType, sortItem) {
  const {name, disabled} = sortItem;

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort" value="sort-${name}" data-sort-type="${name}"
        ${currentSortType === name ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>`
  );
}

function createSortTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${Object.values(sort).map((value) => createSortItemTemplate(currentSortType, value)).join('')}
    </form>`
  );
}

export default class SortView extends AbstractView {
  /**
   * @type {SortType}
   */
  #currentSortType = sortType.DAY;
  /**
   * @type {(null|function)}
   */
  #handleSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();

    this.#currentSortType = currentSortType;

    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  /**
   * @method
   * @param {Event} event
   */
  #sortTypeChangeHandler = (event) => {
    if (event.target?.control?.tagName !== 'INPUT' || event.target?.control.disabled) {
      return;
    }
    event.preventDefault();
    this.#handleSortTypeChange(event.target?.control?.dataset?.sortType);
  };
}
