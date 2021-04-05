var dayjs = require("dayjs");
var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

const retrieveMostRecentDay = (data) => {
  //find in data isSameOrBefore (isToday) and return that date

}



module.exports = retrieveAllUserDataByWeek;
