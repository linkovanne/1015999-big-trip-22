import AbstractView from '../framework/view/abstract-view';

/**
 * function that returns filters form template
 * @param {FilterOfferObjectData} filter
 * @param {boolean} isChecked
 * @return {string}
 */
function createFilterItemTemplate(filter, isChecked) {
  const {type, count} = filter;
  const checked = isChecked ? 'checked' : '';
  const disabled = count > 0 ? '' : 'disabled';

  return (`<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter" value="${type}" ${checked} ${disabled}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`);
}

/**
 * function that returns filters form template
 * @param {Array<FilterOfferObjectData>} filters
 * @return {string}
 */
function createFiltersTemplate(filters) {

  return filters.length > 0 && (
    `<form class="trip-filters" action="#" method="get">
        ${filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('')}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends AbstractView {
  /**
   * @type Array<FilterOfferObjectData>
   */
  #filters = [];

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
