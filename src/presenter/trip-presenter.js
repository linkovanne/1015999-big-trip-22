import {render} from '../render';
import EventItemView from '../view/event-item-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import EditEventFormView from '../view/edit-event-form-view';

const TRIPS_COUNTER = 3;

export default class TripPresenter {
  eventListComponent = new EventListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new SortView(), this.tripContainer);
    render(this.eventListComponent, this.tripContainer);
    render(new EditEventFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < TRIPS_COUNTER; i++) {
      render(new EventItemView(), this.eventListComponent.getElement());
    }
  }
}
