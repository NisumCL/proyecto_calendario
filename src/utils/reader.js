/* eslint-disable */
const fs = require('fs');
const readline = require('readline');



//aqui es donde se debe leer la base de datos, vamos a desactivarla
function dataFile(filename) {
  
  const data = fs.readFileSync(filename, 'utf-8', (err, file) => {
    if (err) {
      throw new Error(err);
    } else {
      return file;
    }
  });
  
  return data;
  // eslint-disable-next-line consistent-return
}


module.exports = { dataFile };
