import {remove, render} from '../framework/render';
import EventListView from '../view/event-list-view';
import EmptyEventListView from '../view/empty-event-list-view';
import SortView from '../view/sort-view';
import NewEventButtonView from '../view/new-event-button-view';
import FiltersView from '../view/filters-view';
// import AddEventFormView from '../view/add-event-form-view';
import {generateFilter} from '../mock/filter';
import EventPresenter from './event-presenter';
import {sortType} from '../const';
import {updateEvent} from '../utils/common';
import {sortByDay, sortByPrice, sortByTime} from '../utils/events';

export default class TripPresenter {
  /**
   * @type {(null|HTMLElement)}
   */
  #headerContainer = null;
  /**
   * @type {(null|HTMLElement)}
   */
  #tripFiltersContainer = null;
  /**
   * @type {(null|HTMLElement)}
   */
  #tripContainer = null;
  /**
   * @type {(null|TripModel)}
   */
  #tripModel = null;
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
   * @type {Array}
   */
  #events = [];
  /**
   * @type {Array}
   */
  #offers = [];
  /**
   * @type {Array}
   */
  #destinations = [];
  /**
   * @type {SortType}
   */
  #currentSortType = sortType.DAY;

  constructor({headerContainer, tripFiltersContainer, tripContainer, tripModel}) {
    this.#headerContainer = headerContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
    this.#tripContainer = tripContainer;
    this.#tripModel = tripModel;
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  /**
   * @method
   * @param {(EventObjectData)} event
   * @param {Array<OfferObjectData>} offers
   * @param {Array<DestinationObjectData>} destinations
   */
  #renderEvent(event, offers, destinations) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element,
      onEventChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event, offers, destinations);
    this.#eventPresenter.set(event.id, eventPresenter);
  }

  /**
   * @method
   * @param {(EventObjectData)} updatedEvent
   */
  #handleEventChange = (updatedEvent) => {
    this.#events = updateEvent(this.#events, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent, this.#offers, this.#destinations);
  };

  /**
   * @method
   */
  #clearEventList() {
    remove(this.#sortComponent);
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  }

  #renderEventList() {
    this.#renderSort();
    render(this.#eventListComponent, this.#tripContainer);

    for (const event of this.#events) {
      this.#renderEvent(event, this.#offers, this.#destinations);
    }
  }

  // #renderAddEventForm() {
  //   const addEventForm = new AddEventFormView();
  //
  //   render(addEventForm, this.#eventListComponent.element);
  // }

  /**
   * @method
   * @param {SortType} type
   */
  #sortEvents(type) {
    switch (type) {
      case sortType.DAY:
        this.#events.sort(sortByDay);
        break;
      case sortType.TIME:
        this.#events.sort(sortByTime);
        break;
      case sortType.PRICE:
        this.#events.sort(sortByPrice);
        break;
    }

    this.#currentSortType = type;
  }

  /**
   * @method
   * @param {SortType} type
   */
  #handleSortTypeChange = (type) => {
    if (this.#currentSortType === type) {
      return;
    }

    this.#sortEvents(type);
    this.#clearEventList();
    this.#renderEventList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripContainer);
  }

  #renderFilters(events) {
    /**
     * @type Array<FilterOfferObjectData>
     */
    const filters = generateFilter(events);
    const filtersComponent = new FiltersView({ filters });

    render(filtersComponent, this.#tripFiltersContainer);
  }

  /**
   * function to render page components
   */
  init() {
    this.#events = [...this.#tripModel.events];
    this.#offers = [...this.#tripModel.offers];
    this.#destinations = [...this.#tripModel.destinations];

    render(this.#newEventButton, this.#headerContainer);
    this.#renderFilters(this.#events);

    if (this.#events.length === 0) {
      return render(this.#emptyEventListComponent, this.#tripContainer);
    }

    this.#renderEventList();
  }
}
