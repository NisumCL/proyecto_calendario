const { dataFile } = require('./reader');
const { dataToObject, show } = require('./converter');
const { isValidDateFormat } = require('./validator');

const startDate = process.argv[2];
const endDate = process.argv[3];

const date1 = new Date(startDate);
const date2 = new Date(endDate);

const filteredBirthdays = [];

try {
  if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
    // Se va a trabajar la data ya leida y transformada en un objecto.
    const fileInfo = dataFile('./mails_y_cumples_03.csv');
    const workersData = dataToObject(fileInfo);
    // eslint-disable-next-line no-console
    show(workersData);
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
}
