import Observable from '../framework/observable';
import {getEvents} from '../mock/points';
import {getDestinations} from '../mock/destinations';
import {getOffers} from '../mock/offers';

/**
 * Event object
 * @typedef {Object} EventObjectData
 * @property {string} id
 * @property {number} basePrice
 * @property {string} dateFrom
 * @property {string} dateTo
 * @property {string} destination
 * @property {boolean} isFavorite
 * @property {Array<string>} offers
 * @property {string} type
 */
/**
 * Offer item object
 * @typedef {Object} OfferItemObjectData
 * @property {string} id
 * @property {string} title
 * @property {number} price
 */
/**
 * Offer object
 * @typedef {Object} OfferObjectData
 * @property {string} type
 * @property {Array<OfferItemObjectData>} offers
 */

/**
 * Destination object
 * @typedef {Object} DestinationObjectData
 * @property {string} id
 * @property {string} description
 * @property {string} name
 * @property {Array<{src: string, description: string}>} pictures
 */

export default class TripModel extends Observable {
  /**
   * events list
   * @type {Array<EventObjectData>}
   */
  #events = getEvents();
  /**
   * offers list
   * @type {Array<OfferObjectData>}
   */
  #offers = getOffers();
  /**
   * destinations list
   * @type {Array<DestinationObjectData>}
   */
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

  /**
   * @method
   * @param {UpdateType} updateType
   * @param {EventObjectData} update
   */
  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('can\'t update unexciting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  /**
   * @method
   * @param {UpdateType} updateType
   * @param {EventObjectData} update
   */
  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events
    ];

    this._notify(updateType, update);
  }

  /**
   * @method
   * @param {UpdateType} updateType
   * @param {EventObjectData} update
   */
  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('can\'t delete unexciting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, {});
  }
}
