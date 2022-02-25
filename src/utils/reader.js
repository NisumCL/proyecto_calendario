/* eslint-disable */
const fs = require('fs');

function dataFile(fileName) {
  // eslint-disable-next-line consistent-return
  const data = fs.readFileSync(fileName, 'utf-8', (err, file) => {
    if (err) {
      throw new Error(err);
    } else {
      return file;
    }
  });
  return data;
}

module.exports = { dataFile };
