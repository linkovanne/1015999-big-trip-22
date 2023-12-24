import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

function humaniseFullDate(date) {
  return date ? dayjs(date).utc().format(FULL_DATE_FORMAT) : '';
}

function humaniseDate(date) {
  return date ? dayjs(date).utc().format(DATE_FORMAT) : '';
}

function humaniseTime(date) {
  return date ? dayjs(date).utc().format(TIME_FORMAT) : '';
}

function getTimeOnWay(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dateFrom, 'hour', true);
  const hours = Math.floor(diff);
  const minutes = Math.floor((diff - hours) * 60);

  return dateFrom && dateTo && `${hours}H ${minutes}M`;
}

export {humaniseFullDate, humaniseDate, humaniseTime, getTimeOnWay};

