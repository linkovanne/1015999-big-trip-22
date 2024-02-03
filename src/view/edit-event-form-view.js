import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humaniseFullDate} from '../utils/date';

/**
 * Filtered Offer item object
 * @typedef {Object} FilteredOfferObjectData extends OfferItemObjectData
 * @property {boolean} isChecked
 */

/**
 * function that returns event type item
 * @param {string} type
 * @param {string} offerType
 * @returns {string}
 */
function createEventTypeItemTemplate(type, offerType) {
  const checked = type === offerType ? 'checked' : '';

  return (`
    <div class="event__type-item">
      <input id="event-type-${offerType}" class="event__type-input visually-hidden" type="radio"
        name="event-type" value="${offerType}" ${checked}>
      <label class="event__type-label event__type-label--${offerType}" for="event-type-${offerType}">${offerType}</label>
    </div>
  `);
}

/**
 * function that returns event selector item template
 * @param {FilteredOfferObjectData} offer
 * @returns {string}
 */
function createEventOfferSelectorTemplate(offer) {
  const {id, title, price, isChecked} = offer;

  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}"
        type="checkbox" name="event-offer-${id}" value="${id}" ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `);
}

/**
 * function that returns event form template
 * @param {EventObjectData} event
 * @param {Array<OfferObjectData>} offersList
 * @param {Array<DestinationObjectData>} destinations
 * @return {string}
 */
function createEditEventFormTemplate(event, offersList, destinations) {
  const { type, basePrice, dateFrom, dateTo, destination, offers } = event;
  /**
   * @type {DestinationObjectData} filteredOffers
   */
  const currentDestination = destinations.find((item) => item.id === destination);
  /**
   * @type {Array<FilteredOfferObjectData>} filteredOffers
   */
  const filteredOffers = offersList
    .find((item) => item.type === type).offers
    .map((offer) => ({...offer, isChecked: offers.indexOf(offer.id) >= 0}));

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${offersList.map((offer) => (createEventTypeItemTemplate(type, offer.type))).join(' ')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinations.map((item) => `<option value="${item.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humaniseFullDate(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humaniseFullDate(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${filteredOffers.map((item) => createEventOfferSelectorTemplate(item)).join(' ')}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${currentDestination.description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EditEventFormView extends AbstractStatefulView {
  /**
   * @type {Array<OfferObjectData>}
   */
  #offers = [];
  /**
   * @type {Array<DestinationObjectData>}
   */
  #destinations = [];
  /**
   * @type {function}
   */
  #handleFormSubmit = null;
  /**
   * @type {function}
   */
  #handleFormReset = null;
  /**
   * @type {function}
   */
  #handleFormDelete = null;

  constructor({event, offers, destinations, onFormSubmit, onFormReset, onFormDelete}) {
    super();

    this._setState(event);
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;
    this.#handleFormDelete = onFormDelete;

    this._restoreHandlers();
  }

  get template() {
    return createEditEventFormTemplate(this._state, this.#offers, this.#destinations);
  }

  reset(event) {
    this.updateElement(event);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formResetHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('form').addEventListener('reset', this.#formDeleteHandler);

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
  }

  #destinationChangeHandler = (event) => {
    if (event.target?.tagName !== 'INPUT') {
      return;
    }
    event.preventDefault();
    const destinationName = event.target?.value;
    const destination = this.#destinations.find((d) => d.name === destinationName)?.id;

    this.updateElement({
      destination,
    });
  };

  #eventTypeChangeHandler = (event) => {
    if (event.target?.tagName !== 'INPUT') {
      return;
    }
    event.preventDefault();
    const type = event.target?.value;

    this.updateElement({
      type: type,
      offers: []
    });
  };

  #priceChangeHandler = (event) => {
    if (event.target?.tagName !== 'INPUT') {
      return;
    }
    event.preventDefault();
    const price = event.target?.value;

    this._setState({
      basePrice: price
    });
  };

  #offersChangeHandler = (event) => {
    if (event.target?.tagName !== 'INPUT') {
      return;
    }
    event.preventDefault();
    const offer = event.target?.value;
    const isSelected = this._state.offers.indexOf(offer) >= 0;
    const offers = isSelected
      ? this._state.offers.filter((of) => of !== offer)
      : [...this._state.offers, offer];

    this.updateElement({
      offers,
    });
  };

  #formSubmitHandler = (event) => {
    event.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #formResetHandler = (event) => {
    event.preventDefault();
    this.#handleFormReset();
  };

  #formDeleteHandler = (event) => {
    event.preventDefault();
    this.#handleFormDelete(this._state.id);
  };
}
