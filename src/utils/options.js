const { convertToDate } = require('./converter');
const { biggerDate, filteredBirthdays } = require('./comparator');

function getBirthdaysFromStrings(startDate, endDate, workersData) {
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

function birthdayMonthCourse(workersData) {
  let birthdayList = [];
  const today = new Date();
  const firstDate = new Date(2022, today.getMonth(), 1);
  const secondDate = new Date(2022, today.getMonth() + 1, 0);
  birthdayList = filteredBirthdays(firstDate, secondDate, workersData);
  return birthdayList;
}

function birthdayNextMonth(workersData) {
  let birthdayList = [];
  const today = new Date();
  const firstDate = new Date(2022, today.getMonth() + 1, 1);
  const secondDate = new Date(2022, today.getMonth() + 2, 0);
  birthdayList = filteredBirthdays(firstDate, secondDate, workersData);
  return birthdayList;
}

module.exports = {
  getBirthdaysFromStrings,
  birthdayNextMonth,
  birthdayMonthCourse,
};
