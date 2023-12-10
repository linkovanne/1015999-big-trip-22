import {render} from './render';
import NewEventButtonView from './view/new-event-button-view';
import FilterFormView from './view/filter-form-view';
import TripPresenter from './presenter/trip-presenter';

const siteHeaderElement = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({
  tripContainer: siteTripEventsElement
});

render(new NewEventButtonView(), siteHeaderElement);
render(new FilterFormView(), tripControlsFilters);
tripPresenter.init();
