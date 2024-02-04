import AbstractView from '../framework/view/abstract-view';

function createEmptyTripTemplate () {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class EmptyTripView extends AbstractView {
  get template() {
    return createEmptyTripTemplate();
  }
}
