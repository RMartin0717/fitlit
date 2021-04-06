const retrieveMostRecentDay = (data) => {
  return data[data.length - 1];
}


if (typeof module !== 'undefined') {
  module.exports = retrieveMostRecentDay;
}
