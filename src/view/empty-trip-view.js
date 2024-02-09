import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const EmptyTripTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now'
};

function createEmptyTripTemplate (filterType) {
  const emptyTripTextValue = EmptyTripTextType[filterType];

  return `<p class="trip-events__msg">${emptyTripTextValue}</p>`;
}

export default class EmptyTripView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyTripTemplate(this.#filterType);
  }
}
