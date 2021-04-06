if (typeof module !== 'undefined') {
  const dayjs = require("dayjs");
  const duration = require('dayjs/plugin/duration')
  dayjs.extend(duration);
  const isBetween = require('dayjs/plugin/isBetween')
  dayjs.extend(isBetween);
}

const retrieveAllUserDataByWeek = (data, date) => {
  const day7 = dayjs(new Date(date));
  const day1 = dayjs(day7).subtract(dayjs.duration({"weeks" : 1}))
  const dataForDates = data.reduce((total, dataPoint) => {
    if (dayjs(dataPoint.date).isBetween(day1, day7, null, "[]")) {
      return [...total, dataPoint]
    }
    return total
  }, [])
  return dataForDates
}


if (typeof module !== 'undefined') {
  module.exports = retrieveAllUserDataByWeek;
}
