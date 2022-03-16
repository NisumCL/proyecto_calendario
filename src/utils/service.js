/* eslint-disable */
const { biggerDate }  = require('./comparator');
const { getGoogleSpreadSheet } = require('./reader');
const { dataToObject, convertToDate } = require('./converter');
const mongoose = require('mongoose')
const Worker = require('../models/worker')

mongoose.connect('mongodb://127.0.0.1:27017/nisum-workers', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
})

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

async function actualMonthService() {
  const currentMonth = new Date();
  const nextMonth = currentMonth.getMonth() + 1;
  const initMonth = new Date();
  initMonth.setDate(1);
  const endMonth = new Date();
  endMonth.setMonth(nextMonth, 0);
  try{
    const birthdays = await Worker.where({ birthday: { $gte: initMonth, $lte: endMonth }})
    return birthdays;
  }catch(e){
    console.log('Unable to connect')
  }
}

async function nextMonthService() {
  const currentMonth = new Date();
  const nextMonth = currentMonth.getMonth() + 1;
  const monthAgead = nextMonth + 1;
  const initMonth = new Date();
  initMonth.setMonth(nextMonth, 1);
  const endMonth = new Date();
  endMonth.setMonth(monthAgead, 0);
  try{
    const birthdays = await Worker.where({ birthday: { $gte: initMonth, $lte: endMonth }})
    return birthdays;
  }catch(e){
    console.log('Unable to connect')
  }
}

async function betweenTwoDatesService(startDate, endDate) {
  let birthdayList = [];
  const firstDate = convertToDate(startDate);
  const secondDate = convertToDate(endDate);
  const startYear = new Date();
  startYear.setMonth(0, 1);
  const endYear = new Date();
  endYear.setMonth(11, 31);
  try{
    if (biggerDate(firstDate, secondDate)) {
      birthdayList = await Worker.where({ birthday: { $gte: firstDate, $lte: secondDate }})
    } else {
      birthdayList = [
        await Worker.where({ birthday: { $gte: firstDate, $lte: endYear }}), 
        await Worker.where({ birthday: { $gte: startYear, $lte: secondDate }}) 
      ];
    }
    return birthdayList;
  }catch(e){
    console.log('Unable to connect')
  }
}

module.exports = { readDataForDB, actualMonthService, nextMonthService, betweenTwoDatesService };
