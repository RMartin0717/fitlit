if (typeof module !== 'undefined') {
  // const calcAverage = require("calcAverage");
  // const formatDataByDate = require("formatDataByDate");
  // const retrieveAllUserDataByWeek = require("retrieveDataByWeek");
  // const retrieveMostRecentDay = require("retrieveMostRecentDay");
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
