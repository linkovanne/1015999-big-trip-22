import {render} from '../framework/render';
import EventItemView from '../view/event-item-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import EditEventFormView from '../view/edit-event-form-view';

export default class TripPresenter {
  #tripContainer = null;
  #tripModel = null;

  #eventListComponent = new EventListView();

  #events = [];
  #offers = [];
  #destinations = [];

  constructor({tripContainer, tripModel}) {
    this.#tripContainer = tripContainer;
    this.#tripModel = tripModel;
  }

  #renderEvent(event, offers, destination) {
    const eventItem = new EventItemView({event, offers, destination});

    render(eventItem, this.#eventListComponent.element);
  }

  #renderEditEventForm(event, offers, destinations) {
    const editEventForm = new EditEventFormView({event, offers, destinations});

    render(editEventForm, this.#eventListComponent.element);
  }

  init() {
    this.#events = [...this.#tripModel.events];
    this.#offers = [...this.#tripModel.offers];
    this.#destinations = [...this.#tripModel.destinations];

    render(new SortView(), this.#tripContainer);
    render(this.#eventListComponent, this.#tripContainer);

    for (let i = 0; i < this.#events.length; i++) {
      const currentEvent = this.#events[i];
      const currentOffers = this.#offers.find((offer) => offer.type === currentEvent.type)?.offers;
      const currentDestination = this.#destinations.find((destination) => destination.id === currentEvent.destination);

      this.#renderEvent(currentEvent, currentOffers, currentDestination);
      this.#renderEditEventForm(currentEvent, this.#offers, this.#destinations);
    }
  }
}
