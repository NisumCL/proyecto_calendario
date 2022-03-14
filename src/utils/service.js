/* eslint-disable */
const { filteredBirthdays, biggerDate } = require('./comparator');
const { dataFile } = require('./reader');
const { dataToObject, convertToDate } = require('./converter');
const mongoose = require('mongoose')
const Worker = require('../models/worker')

//funciona con una sola conexion a todo.
mongoose.connect('mongodb://127.0.0.1:27017/nisum-workers', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
})


//Esta readdata se importa en mongo.js y crea una base de datos poblada con la info del csv, al ejecutar app.js
function readData() {
  const fileInfo = dataFile('./mails_y_cumples_03.csv');
  const workersData = dataToObject(fileInfo);
  return workersData;
}

//esta funcion cumple la misma funcion que en anteriores versiones cumplia readData, solo que ahora se trae la base de datos
async function readDataBase() {
  try{
    const workersData = await Worker.find({})
    return workersData
  }catch(e){
    console.log('Unable to connect')
  }
}

//aqui y en la proxima funcion podriamos haber usado la funcion filteredBirthdays, pero mejor pasamos todo a consulta
async function actualMonthService() {
  const workersData = await readDataBase();
  const currentMonth = new Date();
  const nextMonth = currentMonth.getMonth() + 1;
  const initMonth = new Date();
  initMonth.setDate(1);
  const endMonth = new Date();
  endMonth.setMonth(nextMonth, 0);
  const birthdays = filteredBirthdays(initMonth, endMonth, workersData);
  return birthdays;
}

async function nextMonthService() {
  const currentMonth = new Date();
  const nextMonth = currentMonth.getMonth() + 1;
  const monthAgead = nextMonth + 1;
  const initMonth = new Date();
  initMonth.setMonth(nextMonth, 1);
  const endMonth = new Date();
  endMonth.setMonth(monthAgead, 0);
  const birthdays = await Worker.where({ birthday: { $gte: initMonth, $lte: endMonth }})
  return birthdays;
}


async function betweenTwoDatesService(startDate, endDate) {
  const workersData = await readDataBase();
  let birthdayList = [];
  const firstDate = convertToDate(startDate);
  const secondDate = convertToDate(endDate);
  //bigger se queda, porque simplemente compara cosas que no vienen de la base de datos
  if (biggerDate(firstDate, secondDate)) {
    //birthdayList = await Worker.where({ birthday: { $gte: firstDate, $lte: secondDate }})
    birthdayList = filteredBirthdays(firstDate, secondDate, workersData);
  } else {
    const startYear = new Date();
    startYear.setMonth(0, 1);
    const endYear = new Date();
    endYear.setMonth(11, 31);
    //aqui tambien podemos cambiar filteredBirthdays por consultas la filteredBirthdays
    birthdayList = [
      ...filteredBirthdays(firstDate, endYear, workersData),
      ...filteredBirthdays(startYear, secondDate, workersData),
    ];
  }
  return birthdayList;
}


module.exports = { readDataBase, readData, actualMonthService, nextMonthService, betweenTwoDatesService };
