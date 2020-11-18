const {
  getHours, parseISO, getMinutes, getSeconds,
} = require('date-fns');

class LibDate {
  isDate(date) {
    const newDate = new Date(date);
    return newDate instanceof Date && !Number.isNaN(newDate.getTime());
  }

  BetweenHour(date, before, after) {
    const beforeHour = before.split(':')[0];
    const [afterHour, afterMinutes, afterSeconds] = after.split(':');

    const dateIso = parseISO(date);

    const hour = getHours(dateIso);
    if (hour < beforeHour || hour > afterHour) {
      return false;
    }

    const minutes = getMinutes(dateIso);
    if (minutes > afterMinutes) {
      return false;
    }

    const seconds = getSeconds(dateIso);
    if (seconds > afterSeconds) {
      return false;
    }

    return true;
  }
}

module.exports = new LibDate();
