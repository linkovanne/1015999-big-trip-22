import {remove, render, replace} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import TripView from '../view/trip-view';
import EmptyTripView from '../view/empty-trip-view';
import LoadingTripView from '../view/loading-trip-view';
import FailedTripView from '../view/failed-trip-view';
import SortView from '../view/sort-view';
import AddEventButtonView from '../view/add-event-button-view';
import EventPresenter from './event-presenter';
import FilterPresenter from './filter-presenter';
import AddEventPresenter from './add-event-presenter';
import {FilterType, SortType, UpdateType, UserAction} from '../const';
import {sortByDay, sortByPrice, sortByTime} from '../utils/events';
import {filter} from '../utils/filters';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

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
  /**
   * @type {AddEventPresenter}
   */
  #addEventPresenter = null;

  #addEventButton = null;
  #sortComponent = null;
  #tripComponent = new TripView();
  #emptyTripComponent = null;
  #loadingTripComponent = new LoadingTripView();
  #failedTripComponent = new FailedTripView();
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  /**
   * @type {boolean}
   */
  #isLoading = true;
  /**
   * @type {ISortType}
   */
  #currentSortType = SortType.DAY;

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
    const filteredEvents = filter[filterType](events) || [];

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort(sortByDay);
      case SortType.TIME:
        return filteredEvents.sort(sortByTime);
      case SortType.PRICE:
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
    this.#addEventPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  /**
   * @method
   * @param {EventObjectData} event
   */
  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#tripComponent.element,
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
  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenter.get(update.id).setSaving();
        try {
          await this.#tripModel.updateEvent(updateType, update);
        } catch (error) {
          this.#eventPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#addEventPresenter.setSaving();
        try {
          await this.#tripModel.addEvent(updateType, update);
        } catch (error) {
          this.#addEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenter.get(update.id).setDeleting();
        try {
          await this.#tripModel.deleteEvent(updateType, update);
        } catch (error) {
          this.#eventPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingTripComponent);
        this.#renderTrip();
        this.#createAddEventPresenter();
        this.#addEventButton.updateElement({disabled: false});
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        this.#addEventButton.updateElement({disabled: true});
        this.#renderFailedState();
        this.#removeTrip();
        break;
    }
  };

  #createAddEventPresenter = () => {
    this.#addEventPresenter = new AddEventPresenter({
      offers: this.offers,
      destinations: this.destinations,
      eventListContainer: this.#tripComponent.element,
      onEventChange: this.#handleViewAction,
      onDestroy: this.#onAddEventDestroy
    });
  };

  #handleAddEventForm = () => {
    this.#addEvent();
    this.#addEventButton.updateElement({disabled: true});
  };

  #addEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addEventPresenter.init();
  }

  #onAddEventDestroy = () => {
    this.#addEventButton.updateElement({disabled: false});
  };

  #clearTrip({resetSortType = false} = {}) {
    this.#addEventPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingTripComponent);
    remove(this.#emptyTripComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEmptyTrip() {
    this.#emptyTripComponent = new EmptyTripView({filterType: this.#filterModel.filter});

    return render(this.#emptyTripComponent, this.#tripContainer);
  }

  #renderTrip() {
    if (this.#isLoading) {
      render(this.#loadingTripComponent, this.#tripContainer);
      return;
    }

    this.#renderSort();
    render(this.#tripComponent, this.#tripContainer);

    if (this.events.length === 0) {
      this.#renderEmptyTrip();
    }

    for (const event of this.events) {
      this.#renderEvent(event);
    }
  }

  #removeTrip() {
    remove(this.#sortComponent);
    remove(this.#tripComponent);
    remove(this.#emptyTripComponent);
    remove(this.#loadingTripComponent);
  }

  #renderFailedState() {
    render(this.#failedTripComponent, this.#tripContainer);
  }

  /**
   * @method
   * @param {ISortType} type
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

  #renderAddEventButton() {
    const prevAddEventButton = this.#addEventButton;
    this.#addEventButton = new AddEventButtonView({onClick: this.#handleAddEventForm});
    this.#addEventButton.updateElement({disabled: this.#isLoading});

    if (prevAddEventButton === null) {
      render(this.#addEventButton, this.#headerContainer);

      return;
    }

    replace(this.#addEventButton, prevAddEventButton);
    remove(prevAddEventButton);
  }

  /**
   * function to render page components
   */
  init() {
    this.#renderAddEventButton();

    this.#renderFilters();
    this.#renderTrip();
  }
}
