const { dataFile } = require('./reader');
const { dataToObject, show, convertToDate } = require('./converter');
const { isValidDateFormat } = require('./validator');
const { biggerDate, filteredBirthdays } = require('./comparator');
const { principalMain } = require('./options')

try {
  const fileInfo = dataFile('./mails_y_cumples_03.csv');
  const workersData = dataToObject(fileInfo);
  principalMain(workersData)
}catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
}
