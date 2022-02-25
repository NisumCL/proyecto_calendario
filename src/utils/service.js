const { filteredBirthdays } = require('./comparator');
const { dataFile } = require('./reader');
const { dataToObject } = require('./converter');

const fileInfo = dataFile('./mails_y_cumples_03.csv');
const workersData = dataToObject(fileInfo);

function actualMonthService() {
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

module.exports = { actualMonthService, nextMonthService };
