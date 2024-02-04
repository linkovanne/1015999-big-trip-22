import AbstractView from '../framework/view/abstract-view';

function createLoadingTripTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class LoadingTripView extends AbstractView {
  get template() {
    return createLoadingTripTemplate();
  }
}
