import {filterType} from '../const';
import {isCurrentEvent, isFutureEvent, isPastEvent} from './events';

const filter = {
  [filterType.EVERYTHING]: (events) => events,
  [filterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event.dateFrom)),
  [filterType.PRESENT]: (events) => events.filter((event) => isCurrentEvent(event.dateFrom, event.dateTo)),
  [filterType.PAST]: (events) => events.filter((event) => isPastEvent(event.dateTo))
};

export {filter};
