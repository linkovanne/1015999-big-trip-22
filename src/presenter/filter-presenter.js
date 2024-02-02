import {remove, render, replace} from '../framework/render';
import FiltersView from '../view/filters-view';
import {FilterType, UpdateType} from '../const';
import {filter} from '../utils/filters';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tripModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, tripModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripModel = tripModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }


  /**
   * Filter object
   * @typedef {Object} FilterOfferObjectData
   * @property {string} type
   * @property {number} count
   */
  /**
   * @typedef {Array<FilterOfferObjectData>}
   */
  get filters() {
    const events = this.#tripModel.events;

    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](events).length
    }));
  }


  init() {
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FiltersView({
      filters: this.filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);

      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
