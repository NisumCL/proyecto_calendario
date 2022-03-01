const { filteredBirthdays, biggerDate } = require('./comparator');
const { dataFile } = require('./reader');
const { dataToObject, convertToDate } = require('./converter');

function readData() {
  const fileInfo = dataFile('./mails_y_cumples_03.csv');
  const workersData = dataToObject(fileInfo);
  return workersData;
}

function actualMonthService() {
  const workersData = readData();
  const currentMonth = new Date();
  const nextMonth = currentMonth.getMonth() + 1;
  const initMonth = new Date();
  initMonth.setDate(1);
  const endMonth = new Date();
  endMonth.setMonth(nextMonth, 0);
  const birthdays = filteredBirthdays(initMonth, endMonth, workersData);
  return birthdays;
}

function nextMonthService() {
  const workersData = readData();
  const currentMonth = new Date();
  const nextMonth = currentMonth.getMonth() + 1;
  const monthAgead = nextMonth + 1;
  const initMonth = new Date();
  initMonth.setMonth(nextMonth, 1);
  const endMonth = new Date();
  endMonth.setMonth(monthAgead, 0);
  const birthdays = filteredBirthdays(initMonth, endMonth, workersData);
  return birthdays;
}

function betweenTwoDatesService(startDate, endDate) {
  const workersData = readData();
  let birthdayList = [];
  const firstDate = convertToDate(startDate);
  const secondDate = convertToDate(endDate);
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
  return birthdayList;
}

module.exports = { actualMonthService, nextMonthService, betweenTwoDatesService };
