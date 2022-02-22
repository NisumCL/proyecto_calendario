const { dataFile } = require('./reader');
const { dataToObject } = require('./converter');
const { principalMain } = require('./options')

try {
  const fileInfo = dataFile('./mails_y_cumples_03.csv');
  const workersData = dataToObject(fileInfo);
  principalMain(workersData)
}catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
}
