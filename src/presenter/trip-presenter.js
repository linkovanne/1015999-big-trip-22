import {render} from '../render';
import EventItemView from '../view/event-item-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import EditEventFormView from '../view/edit-event-form-view';

export default class TripPresenter {
  eventListComponent = new EventListView();

  constructor({tripContainer, tripModel}) {
    this.tripContainer = tripContainer;
    this.tripModel = tripModel;
  }

  init() {
    this.events = [...this.tripModel.getEvents()];
    this.offers = [...this.tripModel.getOffers()];
    this.destinations = [...this.tripModel.getDestinations()];

    render(new SortView(), this.tripContainer);
    render(this.eventListComponent, this.tripContainer);
    render(new EditEventFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < this.events.length; i++) {
      const currentEvent = this.events[i];
      const currentOffers = this.offers.find((offer) => offer.type === currentEvent.type)?.offers;
      const currentDestination = this.destinations.find((destination) => destination.id === currentEvent.destination);

      render(new EventItemView({
        event: currentEvent,
        offers: currentOffers,
        destination: currentDestination
      }), this.eventListComponent.getElement());
    }
  }
}
