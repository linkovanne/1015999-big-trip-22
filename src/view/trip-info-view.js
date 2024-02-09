import AbstractView from '../framework/view/abstract-view';
import {getTripCost} from '../utils/common';
import {humaniseDate} from '../utils/date';

/**
 * @method
 * @param {Array<EventObjectData>} events
 * @param {Array<OfferObjectData>} offers
 * @param {Array<DestinationObjectData>} destinations
 */
function createTripInfoTemplate(events, offers, destinations) {
  const MAX_LIST_COUNTER = 3;

  if(events.length === 0) {
    return;
  }
  const fullTripRoute = events.map((event) => destinations.find((item) => item.id === event.destination)?.name || '').join(' &mdash; ');
  const firstPoint = destinations.find((item) => item.id === events[0].destination)?.name || '';
  const firstDate = humaniseDate(events[0].dateFrom);
  const lastPoint = destinations.find((item) => item.id === events[events.length - 1].destination)?.name || '';
  const lastDate = humaniseDate(events[events.length - 1].dateTo);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${events.length <= MAX_LIST_COUNTER ? fullTripRoute : `${firstPoint} &mdash; ... &mdash; ${lastPoint}`}</h1>

        <p class="trip-info__dates">${firstDate}&nbsp;&mdash;&nbsp;${lastDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCost(events, offers)}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #events = [];
  #offers = [];
  #destinations = [];

  constructor({events, offers, destinations}) {
    super();

    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#events, this.#offers, this.#destinations);
  }
}
