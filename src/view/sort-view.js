import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';
import {sort} from '../utils/sort';
import {isControlType, isDisabledControl} from '../utils/common';

/**
 * method to create item of sort form
 * @method
 * @param {ISortType} currentSortType
 * @param {SortTypeItemObject} sortItem
 */
function createSortItemTemplate(currentSortType, sortItem) {
  const {name, disabled} = sortItem;

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort" value="${name}" data-sort-type="${name}"
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
   * @type {ISortType}
   */
  #currentSortType = SortType.DAY;
  /**
   * @type {function}
   */
  #handleSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();

    this.#currentSortType = currentSortType;

    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  /**
   * @method
   * @param {Event} event
   */
  #sortTypeChangeHandler = (event) => {
    if (isControlType(event, 'INPUT') || isDisabledControl(event)) {
      return;
    }

    event.preventDefault();
    this.#handleSortTypeChange(event.target?.value);
  };
}
