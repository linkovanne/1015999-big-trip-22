import TripApiService from './trip-api-service';
import TripPresenter from './presenter/trip-presenter';
import TripModel from './model/trip-model';
import FilterModel from './model/filter-model';

const AUTHORIZATION = 'Basic 1015999bigtrip22';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const headerElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripModel = new TripModel({ tripApiService: new TripApiService(END_POINT, AUTHORIZATION) });
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  headerContainer: headerElement,
  tripFiltersContainer: tripFiltersElement,
  tripContainer: tripEventsElement,
  tripModel,
  filterModel
});

tripModel.init();
tripPresenter.init();
