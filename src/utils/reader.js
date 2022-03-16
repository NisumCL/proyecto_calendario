/* eslint-disable */
const { GoogleSpreadsheet} = require('google-spreadsheet');
const credentials = require('../json/credentials.json');

async function getGoogleSpreadSheet (id) {
  const document = new GoogleSpreadsheet(id);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();

  const sheet = document.sheetsByIndex[0];
  const sheetRows =  await sheet.getRows();
  return sheetRows;
}

module.exports = { getGoogleSpreadSheet };