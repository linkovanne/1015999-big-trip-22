import AbstractView from '../framework/view/abstract-view';

function createEmptyEventListTemplate () {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class EmptyEventListView extends AbstractView {
  get template() {
    return createEmptyEventListTemplate();
  }
}
