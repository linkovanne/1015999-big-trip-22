import {points} from '../mock/points';
import {destinations} from '../mock/destinations';
import {offers} from '../mock/offers';

export default class TripModel {
  events = points;
  offers = offers;
  destinations = destinations;

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
