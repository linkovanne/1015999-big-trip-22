import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

/**
 * function to humanise date to FULL_DATE_FORMAT
 * @param {string} date
 * @returns {string}
 */
function humaniseFullDate(date) {
  return date ? dayjs(date).utc().format(FULL_DATE_FORMAT) : '';
}

/**
 * function to humanise date to DATE_FORMAT
 * @param {string} date
 * @returns {string}
 */
function humaniseDate(date) {
  return date ? dayjs(date).utc().format(DATE_FORMAT) : '';
}

/**
 * function to humanise time to TIME_FORMAT
 * @param {string} date
 * @returns {string}
 */
function humaniseTime(date) {
  return date ? dayjs(date).utc().format(TIME_FORMAT) : '';
}

/**
 * function to calculate time in hours & minutes
 * @param {string} dateFrom
 * @param {string} dateTo
 * @returns {string}
 */
function getTimeOnWay(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dateFrom, 'hour', true);
  const hours = Math.floor(diff);
  const minutes = Math.floor((diff - hours) * 60);

  return dateFrom && dateTo && `${hours}H ${minutes}M`;
}

/**
 * function to compare two dates
 * @param {string|null} dateA
 * @param {string|null} dateB
 * @returns {boolean}
 */
function isSameDate(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}


export {humaniseFullDate, humaniseDate, humaniseTime, getTimeOnWay, isSameDate};

