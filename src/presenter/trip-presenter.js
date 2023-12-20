import {render} from '../render';
import EventItemView from '../view/event-item-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import EditEventFormView from '../view/edit-event-form-view';

export default class TripPresenter {
  eventListComponent = new EventListView();

  constructor({tripContainer, tripsModel}) {
    this.tripContainer = tripContainer;
    this.tripsModel = tripsModel;
  }

  init() {
    this.presenterEvents = [...this.tripsModel.getTrips()];

    render(new SortView(), this.tripContainer);
    render(this.eventListComponent, this.tripContainer);
    render(new EditEventFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < this.presenterEvents.length; i++) {
      render(new EventItemView({event: this.presenterEvents[i]}), this.eventListComponent.getElement());
    }
  }
}
