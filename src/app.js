const { dataFile } = require('./reader');
const { dataToObject, show, convertToDate } = require('./converter');
const { isValidDateFormat } = require('./validator');
const { biggerDate } = require('./comparator');

// function filteredBirthdays(firstDate, secondDate, workersData) {}

try {
  const startDate = process.argv[2];
  const endDate = process.argv[3];
  // const birthdayList = [];
  if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
    const firstDate = convertToDate(startDate);
    const secondDate = convertToDate(endDate);
    const fileInfo = dataFile('./mails_y_cumples_03.csv');
    const workersData = dataToObject(fileInfo);
    if (biggerDate(firstDate, secondDate)) {
      // Filtrar cumpleaños entre primera y segunda fecha
      // eslint-disable-next-line no-console
      console.log('Fecha 1 es menor o igual que fecha 2');
    } else {
      // Filtrar cumpleaños entre segunda y primera fecha
      // eslint-disable-next-line no-console
      console.log('Fecha 1 es mayor que fecha 2');
    }
    show(workersData);
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
}
