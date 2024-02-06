import {FilterType} from '../const';
import {isCurrentEvent, isFutureEvent, isPastEvent} from './events';

/**
 * filters list object
 * @type {{[key: string]: function}}
 */
const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events?.filter((event) => isFutureEvent(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events?.filter((event) => isCurrentEvent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events?.filter((event) => isPastEvent(event.dateTo))
};

export {filter};
