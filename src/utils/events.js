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
  const startsToday = dayjs(dateFrom).diff(CURRENT_DATE_START) >= 0 && dayjs(dateFrom).diff(CURRENT_DATE_END) <= 0;
  const endsToday = dayjs(dateTo).diff(CURRENT_DATE_START) >= 0 && dayjs(dateTo).diff(CURRENT_DATE_END) <= 0;

  return startsToday || endsToday;
}

/**
 * function to check if event date is in past
 * @param {string} date
 * @returns {boolean}
 */
function isPastEvent(date) {
  return dayjs(date).diff(CURRENT_DATE_START) < 0;
}

export {isFutureEvent, isCurrentEvent, isPastEvent};
