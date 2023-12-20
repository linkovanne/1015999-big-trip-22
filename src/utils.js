import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

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

export {humaniseDate, humaniseTime, getTimeOnWay};

