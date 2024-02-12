import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const SECONDS_PER_MINUTE = 60;
const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

dayjs.extend(utc);

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
  const minutes = Math.floor((diff - hours) * SECONDS_PER_MINUTE);

  return dateFrom && dateTo && `${hours}H ${minutes}M`;
}

export {humaniseFullDate, humaniseDate, humaniseTime, getTimeOnWay};

