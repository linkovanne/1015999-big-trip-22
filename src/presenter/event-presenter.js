import EventView from '../view/event-view';
import EditEventFormView from '../view/edit-event-form-view';
import {remove, render, replace} from '../framework/render';
import {FormScene, UpdateType, UserAction} from '../const';
import {isKeyType} from '../utils/common';

const Mode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT'
};

export default class EventPresenter {
  #eventListContainer = null;
  /**
   * @type {function}
   */
  #handleEventChange = null;
  /**
   * @type {function}
   */
  #handleModeChange = null;
  /**
   * @type {?EventView}
   */
  #eventItem = null;
  /**
   * @type {?EditEventFormView}
   */
  #editEventForm = null;
  /**
   * @type {?EventObjectData}
   */
  #event = null;

  /**
   * @type {Mode}
   */
  #mode = Mode.VIEW;

  constructor({eventListContainer, onEventChange, onModeChange}) {
    this.#eventListContainer = eventListContainer;
    this.#handleEventChange = onEventChange;
    this.#handleModeChange = onModeChange;
  }

  #replaceItemToForm = () => {
    replace(this.#editEventForm, this.#eventItem);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDIT;
  };

  #replaceFormToItem = () => {
    this.#editEventForm.reset(this.#event);
    replace(this.#eventItem, this.#editEventForm);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.VIEW;
  };

  #handleFormSubmit = (event) => {
    this.#handleEventChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event
    );
  };

  #handleEventDelete = (event) => {
    this.#handleEventChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event
    );
  };

  #escKeyDownHandler = (event) => {
    if (isKeyType(event, 'Escape')) {
      event.preventDefault();
      this.#replaceFormToItem();
    }
  };

  #favouriteClickHandler = () => {
    this.#handleEventChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      { ...this.#event, isFavorite: !this.#event?.isFavorite }
    );
  };

  /**
   * @method
   * @param {EventObjectData} event
   * @param {Array<OfferObjectData>} offers
   * @param {Array<DestinationObjectData>} destinations
   */
  init(event, offers, destinations) {
    this.#event = event;
    const currentOffers = offers.find((offer) => offer.type === event.type)?.offers;
    const currentDestination = destinations.find((destination) => destination.id === event.destination);

    const prevEventItem = this.#eventItem;
    const prevEditEventForm = this.#editEventForm;

    this.#eventItem = new EventView({
      event,
      offers: currentOffers,
      destination: currentDestination,
      onEditClick: () => this.#replaceItemToForm(),
      onFavouriteClick: () => this.#favouriteClickHandler()
    });
    this.#editEventForm = new EditEventFormView({
      scene: FormScene.EDIT,
      event,
      offers,
      destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#replaceFormToItem,
      onFormDelete: this.#handleEventDelete,
    });

    if(prevEventItem === null || prevEditEventForm === null) {
      render(this.#eventItem, this.#eventListContainer);
      return;
    }

    if(this.#mode === Mode.VIEW) {
      replace(this.#eventItem, prevEventItem);
    }

    if(this.#mode === Mode.EDIT) {
      replace(this.#editEventForm, prevEditEventForm);
    }

    remove(prevEventItem);
    remove(prevEditEventForm);
  }

  resetView() {
    if (this.#mode !== Mode.VIEW) {
      this.#replaceFormToItem();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDIT) {
      this.#editEventForm.updateElement({
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDIT) {
      this.#editEventForm.updateElement({
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.VIEW) {
      this.#eventItem.shake();
      return;
    }

    const resetFormState = () => {
      this.#editEventForm.updateElement({
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editEventForm.shake(resetFormState);
  }

  destroy() {
    remove(this.#eventItem);
    remove(this.#editEventForm);
  }
}
