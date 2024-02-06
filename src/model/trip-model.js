import Observable from '../framework/observable';
import {UpdateType} from '../const';

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
  #tripApiService = null;
  /**
   * events list
   * @type {Array<EventObjectData>}
   */
  #events = [];
  /**
   * offers list
   * @type {Array<OfferObjectData>}
   */
  #offers = [];
  /**
   * destinations list
   * @type {Array<DestinationObjectData>}
   */
  #destinations = [];

  constructor({tripApiService}) {
    super();

    this.#tripApiService = tripApiService;
  }

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const events = await this.#tripApiService.points;
      this.#events = events.map(this.#adaptEventToClient);
      this.#destinations = await this.#tripApiService.destinations;
      this.#offers = await this.#tripApiService.offers;
    } catch(err) {
      this.#events = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT, {});
  }

  /**
   * @method
   * @param {UpdateType} updateType
   * @param {EventObjectData} update
   */
  async updateEvent(updateType, update) {
    try {
      const response = await this.#tripApiService.updateEvent(update);
      const updatedEvent = this.#adaptEventToClient(response);

      this.#events = this.#events.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  /**
   * @method
   * @param {UpdateType} updateType
   * @param {EventObjectData} update
   */
  async addEvent(updateType, update) {
    try {
      const response = await this.#tripApiService.addEvent(update);
      const newEvent = this.#adaptEventToClient(response);
      this.#events = [
        newEvent,
        ...this.#events
      ];
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  /**
   * @method
   * @param {UpdateType} updateType
   * @param {EventObjectData} update
   */
  async deleteEvent(updateType, update) {
    try {
      await this.#tripApiService.deleteEvent(update);

      this.#events = this.#events.filter((event) => event.id !== update.id);
      this._notify(updateType, {});
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }

  #adaptEventToClient(event) {
    const adaptedEvent = {
      ...event,
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'], // На клиенте дата хранится как экземпляр Date
      basePrice: event['base_price'],
      isFavorite: event['is_favorite'],
    };

    // remove unnecessary keys
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['base_price'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
