const { dataFile } = require('./reader');
const { dataToObject, show, convertToDate } = require('./converter');
const { isValidDateFormat } = require('./validator');
const { biggerDate, filteredBirthdays } = require('./comparator');

try {
  const startDate = process.argv[2];
  const endDate = process.argv[3];
  let birthdayList = [];
  if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
    const firstDate = convertToDate(startDate);
    const secondDate = convertToDate(endDate);
    const fileInfo = dataFile('./mails_y_cumples_03.csv');
    const workersData = dataToObject(fileInfo);
    if (biggerDate(firstDate, secondDate)) {
      birthdayList = filteredBirthdays(firstDate, secondDate, workersData);
    } else {
      const startYear = new Date();
      startYear.setMonth(0, 1);
      const endYear = new Date();
      endYear.setMonth(11, 31);
      birthdayList = [
        ...filteredBirthdays(firstDate, endYear, workersData),
        ...filteredBirthdays(startYear, secondDate, workersData),
      ];
    }
    show(birthdayList);
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
}
