if (typeof module !== 'undefined') {
  const dayjs = require("dayjs");
  const duration = require('dayjs/plugin/duration')
  dayjs.extend(duration);
  const isBetween = require('dayjs/plugin/isBetween')
  dayjs.extend(isBetween);
}

class Hydration {
  constructor(id, data) {
    this.id = id;
    this.hydrationData = data.filter(dataPoint => dataPoint.userID === this.id);
  }

  mostRecentDayData() {
    return this.hydrationData[this.hydrationData.length - 1];
  }

  calcAvgDailyWater(property) {
    const total = this.hydrationData.reduce((total, dataPoint) => {
      return total + dataPoint.numOunces
    }, 0)
    const avg = total / this.hydrationData.length
    return avg
  }

  ozDrankOnDate(date, property) {
    const drinkDate = this.hydrationData.find(dataPoint => dataPoint.date === date);
    console.log(drinkDate)
    const ozDrankOnDate = drinkDate[property];
    return ozDrankOnDate;
  }

  retrieveUserDataByWeek(date) {
    const day7 = dayjs(new Date(date));
    const day1 = dayjs(day7).subtract(dayjs.duration({"weeks" : 1}))
    const dataForDates = this.hydrationData.reduce((total, dataPoint) => {
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


  dailyDrinkDuringWeek(date, property) {
    const hydrationData = this.retrieveUserDataByWeek(this.hydrationData, date);
    const formattedData = this.formatDataByDate(hydrationData, property);
    return formattedData
  }
}

if (typeof module !== "undefined") {
  module.exports = Hydration;
}
