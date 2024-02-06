import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function createAddEventButtonTemplate(isDisabled) {
  const disabled = isDisabled ? 'disabled' : '';

  return `<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button" ${disabled}>New event</button>`;
}

export default class AddEventButtonView extends AbstractStatefulView {
  /**
   * @type {function}
   */
  #handleClick = null;

  constructor({onClick}) {
    super();

    this._setState({disabled: false});
    this.#handleClick = onClick;
    this._restoreHandlers();
  }

  get template() {
    return createAddEventButtonTemplate(this._state.disabled);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (event) => {
    event.preventDefault();
    this.#handleClick();
  };
}
