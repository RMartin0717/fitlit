if (typeof module !== 'undefined') {
  // const dayjs = require("dayjs");
  // const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
  // const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
  // dayjs.extend(isSameOrBefore);
  // dayjs.extend(isSameOrAfter);

  const calcAverage = require("./helpers/calcAverage");
  const formatDataByDate = require("./helpers/formatDataByDate");
  const retrieveAllUserDataByWeek = require("./helpers/retrieveDataByWeek");
  const retrieveMostRecentDay = require("./helpers/retrieveMostRecentDay");
}



class UserSleep {
  constructor(id, allSleepData) {
    this.id = id;
    this.sleepData = allSleepData.filter(dataPoint => dataPoint.userID === this.id);
  }

  mostRecentDayData() {
    const todayDate = retrieveMostRecentDay(this.sleepData);
    return todayDate
  }

  calcAvgSleep(property) {
    const avg = calcAverage(this.sleepData, property);
    return avg
  }

  calcSleepByDate(date, property) {
    const sleepDate = this.sleepData.find(dataPoint => dataPoint.date === date);
    return sleepDate[property]
  }

  calcSleepOverWeek(date, property) {
    const sleepData = retrieveAllUserDataByWeek(this.sleepData, date);
    const formattedData = formatDataByDate(sleepData, property);
    return formattedData
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserSleep;
}
