/* eslint-disable */
const { biggerDate }  = require('./comparator');
// const { readDataForDB, getGoogleSpreadSheet } = require('./reader');
const { convertToDate } = require('./converter');
const mongoose = require('mongoose')
const Worker = require('../models/worker');

try {
  mongoose.connect('mongodb://127.0.0.1:27017/nisum-workers', {
    useNewUrlParser: true,
  })
}catch (e) {
  console.log('Something went wrong. Check your DB or try again')
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

module.exports = { actualMonthService, nextMonthService, betweenTwoDatesService };
