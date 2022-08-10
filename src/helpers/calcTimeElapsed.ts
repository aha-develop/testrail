import moment from 'moment';

/**
 * Calculate Elapsed Time
 *
 * @param date
 * @returns
 */
export const calcTimeElapsed = (date: Date | string | number): string => {
  if (typeof date === 'number' && date < 999999999999) {
    date = date * 1000;
  }

  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return moment(date).fromNow();
};
