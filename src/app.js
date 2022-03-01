const { dataFile } = require('./reader');
const { dataToObject } = require('./converter');
const { main } = require('./options')

try {
  const fileInfo = dataFile('./mails_y_cumples_03.csv');
  const workersData = dataToObject(fileInfo);
  main(workersData)
}catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
}
