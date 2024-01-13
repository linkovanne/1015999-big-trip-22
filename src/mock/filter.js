import {filter} from '../utils/filters';

/**
 * Filter object
 * @typedef {Object} FilterOfferObjectData
 * @property {string} type
 * @property {number} count
 */

/**
 * function to create filters list
 * @param {Array<EventObjectData>} events
 * @return {Array<FilterOfferObjectData>}
 */
function generateFilter(events) {
  return Object.entries(filter).map(([filterType, filterEvents]) => ({
    type: filterType,
    count: filterEvents(events).length
  }));
}

export {generateFilter};
