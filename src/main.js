import TripPresenter from './presenter/trip-presenter';
import TripModel from './model/trip-model';
import FilterModel from './model/filter-model';

const headerElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripModel = new TripModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  headerContainer: headerElement,
  tripFiltersContainer: tripFiltersElement,
  tripContainer: tripEventsElement,
  tripModel,
  filterModel
});

tripPresenter.init();
