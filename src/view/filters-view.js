import AbstractView from '../framework/view/abstract-view';

/**
 * function that returns filters form template
 * @param {FilterOfferObjectData} filter
 * @param {IFilterType} currentFilterType
 * @return {string}
 */
function createFilterItemTemplate(filter, currentFilterType) {
  const {type, count} = filter;
  const checked = filter.type === currentFilterType ? 'checked' : '';
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
 * @param {IFilterType} currentFilterType
 * @return {string}
 */
function createFiltersTemplate(filters, currentFilterType) {
  return filters.length > 0 && (
    `<form class="trip-filters" action="#" method="get">
        ${filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('')}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends AbstractView {
  /**
   * @type {?IFilterType}
   */
  #currentFilterType = null;
  /**
   * @type Array<FilterOfferObjectData>
   */
  #filters = [];
  /**
   * @type {function}
   */
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (event) => {
    if (event.target?.tagName !== 'INPUT' || event.target?.disabled) {
      return;
    }

    event.preventDefault();
    this.#handleFilterTypeChange(event.target?.value);
  };
}
