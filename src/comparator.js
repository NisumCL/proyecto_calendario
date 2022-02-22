/* eslint-disable */
function biggerDate(firstDate, secondDate) {
  const differenceDate = secondDate - firstDate;
  return differenceDate >= 0;
}

function filteredBirthdays(firstDate, secondDate, workersData) {
  return workersData.filter(
    worker => worker.birthday >= firstDate && worker.birthday <= secondDate
  );
}

module.exports = { biggerDate, filteredBirthdays };
