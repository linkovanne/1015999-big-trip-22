import {points} from '../mock/points';
import {destinations} from '../mock/destinations';
import {offers} from '../mock/offers';

export default class TripModel {
  points = points;
  offers = offers;
  destinations = destinations;

  getEvents() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
