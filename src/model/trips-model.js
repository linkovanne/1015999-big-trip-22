import {points} from '../mock/points';

// const POINT_COUNT = 3;

export default class TripsModel {
  // trips = Array.from({length: TRIP_COUNT}, getOffers);
  points = points;
  // offers = offers.some(points);

  getTrips() {
    return this.points;
  }
}
