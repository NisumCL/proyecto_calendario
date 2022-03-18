/* eslint-disable */
const { GoogleSpreadsheet} = require('google-spreadsheet');
const credentials = require('../json/credentials.json');
const { dataToObject } = require('./converter')

async function getGoogleSpreadSheet (id) {
  const document = new GoogleSpreadsheet(id);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();

  const sheet = document.sheetsByIndex[0];
  const sheetRows =  await sheet.getRows();
  return sheetRows;
}

async function readDataForDB() {
  let googleDocId = '1X5mSu78hNXki5sKj_vD7hZIDpWwRJAzGf33otJG2MY0'; //esto es el id de mi spreadsheet en google drive"
  try{
    const fileInfo = await getGoogleSpreadSheet(googleDocId);
    const workersData = dataToObject(fileInfo);
    return workersData;
  }catch(e){
    console.log('Something went wrong!!! check your credentials')
  }
}


module.exports = { getGoogleSpreadSheet, readDataForDB };
