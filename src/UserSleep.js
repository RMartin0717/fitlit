if (typeof module !== 'undefined') {
  const dayjs = require("dayjs");
  const duration = require('dayjs/plugin/duration')
  dayjs.extend(duration);
  const isBetween = require('dayjs/plugin/isBetween')
  dayjs.extend(isBetween);
}


class UserSleep {
  constructor(id, allSleepData) {
    this.id = id;
    this.sleepData = allSleepData.filter(dataPoint => dataPoint.userID === this.id);
  }

  mostRecentDayData() {
    return this.sleepData[this.sleepData.length - 1];
  }

  calcAvgSleep(property) {
    const total = this.sleepData.reduce((total, dataPoint) => {
      return total + dataPoint[property]
    }, 0)
    const avg = total / this.sleepData.length
    return avg
  }

  calcSleepByDate(date, property) {
    const sleepDate = this.sleepData.find(dataPoint => dataPoint.date === date);
    return sleepDate[property]
  }

  retrieveUserDataByWeek(date) {
    const day7 = dayjs(new Date(date));
    const day1 = dayjs(day7).subtract(dayjs.duration({"weeks" : 1}))
    const dataForDates = this.sleepData.reduce((total, dataPoint) => {
      if (dayjs(dataPoint.date).isBetween(day1, day7, null, "[]")) {
        return [...total, dataPoint]
      }
      return total
    }, [])
    return dataForDates
  }

  formatDataByDate(data, property) {
    const specificWeekData = data.map(dataPoint => {
        const day = dataPoint.date;
        const data = dataPoint[property];
        const newData = {[day]: data};
        return newData
    });
    return specificWeekData
  }

  calcSleepOverWeek(date, property) {
    const sleepData = this.retrieveUserDataByWeek(date);
    const formattedData = this.formatDataByDate(sleepData, property);
    return formattedData
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserSleep;
}
