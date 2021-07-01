import moment from 'moment';

export function getAQIColor(aqi) {
  if (aqi >= 0 && aqi <= 50) {
    return '#1B5E20';
  }
  if (aqi > 50 && aqi <= 100) {
    return '#4CAF50';
  }
  if (aqi > 100 && aqi <= 200) {
    return '#FFD600';
  }
  if (aqi > 200 && aqi <= 300) {
    return '#FF6D00';
  }
  if (aqi > 300 && aqi <= 400) {
    return '#FF3D00';
  }
  return '#B71C1C';
}

export function getFormattedDateWithFromNow(timestamp) {
  const diffToCurrent = moment(timestamp).diff(moment(), 'hours');
  if (diffToCurrent >= -2 && diffToCurrent <= 0) {
    return moment(timestamp).fromNow();
  }
  if (moment(timestamp).isSame(moment(), 'day')) {
    return moment(timestamp).format('hh:mm:ss a');
  }
  return getFormattedDateWithFromNow(timestamp);
}

export function getFormattedDate(timestamp) {
  return moment(timestamp).format('MMM DD, YYYY hh:mm:ss a');
}
