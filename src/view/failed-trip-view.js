import AbstractView from '../framework/view/abstract-view';

function createFailedTripTemplate() {
  return '<p class="trip-events__msg">Failed to load latest route information</p>';
}

export default class FailedTripView extends AbstractView {
  get template() {
    return createFailedTripTemplate();
  }
}
