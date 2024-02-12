import dayjs from 'dayjs';

const CURRENT_DATE_START = dayjs().startOf('date');
const CURRENT_DATE_END = dayjs().endOf('date');

/**
 * function to check if event date is in future
 * @param {string} date
 * @returns {boolean}
 */
function isFutureEvent(date) {
  return dayjs(date).diff(CURRENT_DATE_END) > 0;
}

/**
 * function to check if event date is today
 * @param {string} dateFrom
 * @param {string} dateTo
 * @returns {boolean}
 */
function isCurrentEvent(dateFrom, dateTo) {
  const isStartingToday = dayjs(dateFrom).diff(CURRENT_DATE_START) >= 0 && dayjs(dateFrom).diff(CURRENT_DATE_END) <= 0;
  const isEndingToday = dayjs(dateTo).diff(CURRENT_DATE_START) >= 0 && dayjs(dateTo).diff(CURRENT_DATE_END) <= 0;

  return isStartingToday || isEndingToday;
}

/**
 * function to check if event date is in past
 * @param {string} date
 * @returns {boolean}
 */
function isPastEvent(date) {
  return dayjs(date).diff(CURRENT_DATE_START) < 0;
}

/**
 * function to sort events by date
 * @param {EventObjectData} eventA
 * @param {EventObjectData} eventB
 * @returns {number}
 */
function sortByDay(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(eventB.dateFrom);
}

/**
 * function to sort events by time
 * @param {EventObjectData} eventA
 * @param {EventObjectData} eventB
 * @returns {number}
 */
function sortByTime(eventA, eventB) {
  const eventAHours = dayjs(eventA.dateTo).diff(eventA.dateFrom, 'hour', true);
  const eventBHours = dayjs(eventB.dateTo).diff(eventB.dateFrom, 'hour', true);

  return eventBHours - eventAHours;
}

/**
 * function to sort events by price
 * @param {EventObjectData} eventA
 * @param {EventObjectData} eventB
 * @returns {number}
 */
function sortByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

export {isFutureEvent, isCurrentEvent, isPastEvent, sortByDay, sortByTime, sortByPrice};
