import {render} from '../framework/render';
import EventListView from '../view/event-list-view';
import EmptyEventListView from '../view/empty-event-list-view';
import SortView from '../view/sort-view';
import NewEventButtonView from '../view/new-event-button-view';
import FiltersView from '../view/filters-view';
// import AddEventFormView from '../view/add-event-form-view';
import {generateFilter} from '../mock/filter';
import EventPresenter from './event-presenter';
import {updateEvent} from '../utils/common';

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
  #sortComponent = new SortView();
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
  // #clearEventList() {
  //   this.#eventPresenter.forEach((presenter) => presenter.destroy());
  //   this.#eventPresenter.clear();
  // }

  // #renderAddEventForm() {
  //   const addEventForm = new AddEventFormView();
  //
  //   render(addEventForm, this.#eventListComponent.element);
  // }

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

    render(this.#sortComponent, this.#tripContainer);
    render(this.#eventListComponent, this.#tripContainer);

    for (const event of this.#events) {
      this.#renderEvent(event, this.#offers, this.#destinations);
    }
  }
}
