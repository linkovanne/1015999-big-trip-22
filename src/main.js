import {render} from './render';
import NewEventButtonView from './view/new-event-button-view';
import FiltersView from './view/filters-view';
import TripPresenter from './presenter/trip-presenter';
import TripModel from './model/trip-model';

const headerElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripModel = new TripModel();

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  tripModel
});

render(new NewEventButtonView(), headerElement);
render(new FiltersView(), tripFiltersElement);
tripPresenter.init();
