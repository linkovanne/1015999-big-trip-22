import AbstractView from '../framework/view/abstract-view';

function createAddEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>';
}

export default class AddEventButtonView extends AbstractView {
  /**
   * @type {function}
   */
  #handleClick = null;

  constructor({onClick}) {
    super();

    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createAddEventButtonTemplate();
  }

  #clickHandler = (event) => {
    event.preventDefault();
    this.#handleClick();
  };
}
