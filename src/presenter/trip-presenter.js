import {render} from '../render';
import EventItemView from '../view/event-item-view';
import EventListView from '../view/event-list-view';
import SortFormView from '../view/sort-form-view';
import EditEventFormView from '../view/edit-event-form-view';

export default class TripPresenter {
  eventListComponent = new EventListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new SortFormView(), this.tripContainer);
    render(this.eventListComponent, this.tripContainer);
    render(new EditEventFormView(), this.eventListComponent.getElement());

    const tripsCounter = 3;
    for (let i = 0; i < tripsCounter; i++) {
      render(new EventItemView(), this.eventListComponent.getElement());
    }
  }
}
