import {remove, render} from '../framework/render';
import EventListView from '../view/event-list-view';
import EmptyEventListView from '../view/empty-event-list-view';
import SortView from '../view/sort-view';
import NewEventButtonView from '../view/new-event-button-view';
// import AddEventFormView from '../view/add-event-form-view';
import EventPresenter from './event-presenter';
import FilterPresenter from './filter-presenter';
import {sortType, UpdateType, UserAction} from '../const';
import {sortByDay, sortByPrice, sortByTime} from '../utils/events';
import {filter} from '../utils/filters';

export default class TripPresenter {
  /**
   * @type {HTMLElement}
   */
  #headerContainer = null;
  /**
   * @type {HTMLElement}
   */
  #tripFiltersContainer = null;
  /**
   * @type {HTMLElement}
   */
  #tripContainer = null;
  /**
   * @type {TripModel}
   */
  #tripModel = null;
  /**
   * @type {FilterModel}
   */
  #filterModel = null;
  /**
   * @type {Map<string, EventPresenter>}
   */
  #eventPresenter = new Map();

  #handleAddEventForm = () => {
    this.#addEventState = !this.#addEventState;
  };

  #newEventButton = new NewEventButtonView({ onClick: this.#handleAddEventForm });
  #sortComponent = null;
  #eventListComponent = new EventListView();
  #emptyEventListComponent = new EmptyEventListView();


  /**
   * @type {boolean}
   */
  #addEventState = false;
  /**
   * @type {SortType}
   */
  #currentSortType = sortType.DAY;

  constructor({headerContainer, tripFiltersContainer, tripContainer, tripModel, filterModel}) {
    this.#headerContainer = headerContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
    this.#tripContainer = tripContainer;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    const filterType = this.#filterModel.filter;
    const events = this.#tripModel.events;
    const filteredEvents = filter[filterType](events);

    switch (this.#currentSortType) {
      case sortType.DAY:
        return filteredEvents.sort(sortByDay);
      case sortType.TIME:
        return filteredEvents.sort(sortByTime);
      case sortType.PRICE:
        return filteredEvents.sort(sortByPrice);
    }

    return filteredEvents;
  }

  get offers() {
    return this.#tripModel.offers;
  }

  get destinations() {
    return this.#tripModel.destinations;
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  /**
   * @method
   * @param {EventObjectData} event
   */
  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element,
      onEventChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event, this.offers, this.destinations);
    this.#eventPresenter.set(event.id, eventPresenter);
  }

  /**
   * @method
   * @param {UserActionType} actionType
   * @param {UpdateType} updateType
   * @param {EventObjectData} update
   */
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#tripModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#tripModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#tripModel.deleteEvent(updateType, update);
        break;
    }
  };

  /**
   * @method
   * @param {UpdateType} updateType
   * @param {EventObjectData} data
   */
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTrip();
        break;
    }
  };

  #clearTrip({resetSortType = false} = {}) {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyEventListComponent);

    if (resetSortType) {
      this.#currentSortType = sortType.DAY;
    }
  }

  #renderTrip() {
    this.#renderSort();
    render(this.#eventListComponent, this.#tripContainer);

    if (this.events.length === 0) {
      return render(this.#emptyEventListComponent, this.#tripContainer);
    }

    for (const event of this.events) {
      this.#renderEvent(event);
    }
  }

  /**
   * @method
   * @param {SortType} type
   */
  #handleSortTypeChange = (type) => {
    if (this.#currentSortType === type) {
      return;
    }

    this.#currentSortType = type;
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripContainer);
  }

  #renderFilters() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#tripFiltersContainer,
      filterModel: this.#filterModel,
      tripModel: this.#tripModel
    });

    filterPresenter.init();
  }

  /**
   * function to render page components
   */
  init() {

    render(this.#newEventButton, this.#headerContainer);

    this.#renderFilters();
    this.#renderTrip();
  }
}
