import {getEvents} from '../mock/points';
import {getDestinations} from '../mock/destinations';
import {getOffers} from '../mock/offers';

export default class TripModel {
  #events = getEvents();
  #offers = getOffers();
  #destinations = getDestinations();

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
