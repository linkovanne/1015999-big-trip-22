import AbstractView from '../framework/view/abstract-view';

function createAddEventButtonTemplate(isDisabled) {
  const disabled = isDisabled ? 'disabled' : '';

  return `<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button" ${disabled}>New event</button>`;
}

export default class AddEventButtonView extends AbstractView {
  /**
   * @type {boolean}
   */
  #disabled = false;
  /**
   * @type {function}
   */
  #handleClick = null;

  constructor({disabled = false, onClick}) {
    super();

    this.#disabled = disabled;
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createAddEventButtonTemplate(this.#disabled);
  }

  #clickHandler = (event) => {
    event.preventDefault();
    this.#handleClick();
  };
}
