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


class Hydration {
  constructor(id, data) {
    this.id = id;
    this.hydrationData = data.filter(dataPoint => dataPoint.userID === this.id);
  }

  mostRecentDayData() {
    const todayDate = retrieveMostRecentDay(this.hydrationData);
    return todayDate
  }

  calcAvgDailyWater(property) {
    const avg = calcAverage(this.hydrationData, property)
    return avg
  }

  ozDrankOnDate(date) {
    const drinkDate = this.hydrationData.find(dataPoint => dataPoint.date === date);
    const ozDrankOnDate = drinkDate.numOunces;
    return ozDrankOnDate;
  }

  dailyDrinkDuringWeek(date, property) {
    const hydrationData = retrieveAllUserDataByWeek(this.hydrationData, date);
    const formattedData = formatDataByDate(hydrationData, property);
    return formattedData
  }
}

if (typeof module !== "undefined") {
  module.exports = Hydration;
}
