/* eslint-disable */
const { dataFile } = require('./reader');
const { dataToObject } = require('./converter');
const { principalMain } = require('./options');

  const fileInfo = dataFile('./mails_y_cumples_03.csv');
  const workersData = dataToObject(fileInfo);

  (async () => {
    while(true){
      console.log('inicio automatico ');
      const r = await principalMain(workersData);
      if (r == true){
        break;
      }

    }
    console.log('FIN');
  })();

 


// git config --global core.autocrlf true
