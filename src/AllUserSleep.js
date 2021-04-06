if (typeof module !== 'undefined') {
  const dayjs = require("dayjs");
  const duration = require('dayjs/plugin/duration')
  dayjs.extend(duration);
  const isBetween = require('dayjs/plugin/isBetween')
  dayjs.extend(isBetween);
}


class AllUserSleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  mostRecentDayData() {
    return this.sleepData[this.sleepData.length - 1];
  }

  calcAvgSleep(data, property) {
    const totalSleep = data.reduce((total, dataPoint) => {
      return total + dataPoint[property]
    }, 0)
    const avgSleep = totalSleep / data.length
    return avgSleep
  }

  retrieveAllUserDataByWeek(date) {
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

  retrieveUniqueUserIDs(weekData) {
    const dataForWeek = weekData;
    const uniqueUsers = dataForWeek.reduce((uniqueIDs, currentUser) => {
      if (!uniqueIDs.includes(currentUser.userID)) {
        return [...uniqueIDs, currentUser.userID]
      }
      return uniqueIDs
    }, [])
    return uniqueUsers
  }

  calcAboveAvgSleepQuality(date) {
    const dataForWeek = this.retrieveAllUserDataByWeek(date);
    const userIDs = this.retrieveUniqueUserIDs(dataForWeek);

    const aboveAvgSleepers = userIDs.reduce((highSleepQualityUsers, currentUser) => {
      const specificSleeperData = dataForWeek.filter(dataPoint => dataPoint.userID === currentUser)
      const avgSleepQuality = this.calcAvgSleep(specificSleeperData, "sleepQuality")
      if (avgSleepQuality > 3) {
        return [...highSleepQualityUsers, currentUser]
      }
      return highSleepQualityUsers
    }, [])
    return aboveAvgSleepers
  }

  calcMostSleep(date) {
    const dataForDate = this.sleepData.filter(element => {
      return element.date === date
    })
    const orderData = dataForDate.sort((a,b) => (b.hoursSlept - a.hoursSlept));
    const mostSleep = orderData.filter(element => {
      return element.hoursSlept === orderData[0].hoursSlept
    })
    const winners = mostSleep.map(element => {
      return element.userID
    })
    return winners
  }
}

if (typeof module !== 'undefined') {
  module.exports = AllUserSleep;
}
