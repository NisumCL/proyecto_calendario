const { printMain } = require('./main')
const { dataToObject, show, convertToDate } = require('./converter');
const { isValidDateFormat } = require('./validator');
const { biggerDate, filteredBirthdays } = require('./comparator');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  function buscarEntreFechas (workersData) {
    readline.question('Ingrese fecha de inicio (yyyy/mm/dd): ', (startDate) => {
      obtenerFechaFin(startDate, workersData)
    })
  }
  
  function obtenerFechaFin (startDate, workersData) {
    readline.question('Ingrese fecha de fin (yyyy/mm/dd): ', (endDate) => {
      obtenerCumples(startDate, endDate, workersData)
      readline.question('\nPresione ENTER para continuar', (aux) => {
        principalMain(workersData)
      })
    })
  }
  
  function obtenerCumples (startDate, endDate, workersData) {
    let birthdayList = [];
    if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
      const firstDate = convertToDate(startDate)
      const secondDate = convertToDate(endDate)
      if (biggerDate(firstDate, secondDate)) {
        birthdayList = filteredBirthdays(firstDate, secondDate, workersData);
      } else {
        const startYear = new Date();
        startYear.setMonth(0, 1);
        const endYear = new Date();
        endYear.setMonth(11, 31);
        birthdayList = [
          ...filteredBirthdays(firstDate, endYear, workersData),
          ...filteredBirthdays(startYear, secondDate, workersData),
        ];
      }
      show(birthdayList);
    }
  }
  
  function buscarMesActual (workersData) {
    let birthdayList = [];
    const today = new Date()
    const firstDate = new Date(2022, today.getMonth(), 1)
    const secondDate = new Date(2022, today.getMonth() + 1, 0)
    birthdayList = filteredBirthdays(firstDate, secondDate, workersData)
    show(birthdayList);
    readline.question('\nPresione ENTER para continuar', (aux) => {
        principalMain(workersData)
    })
  }
  
  function buscarMesSiguiente (workersData) {
    let birthdayList = [];
    const today = new Date()
    const firstDate = new Date(2022, today.getMonth() + 1, 1)
    const secondDate = new Date(2022, today.getMonth() + 2, 0)
    birthdayList = filteredBirthdays(firstDate, secondDate, workersData);
    show(birthdayList);
    readline.question('\nPresione ENTER para continuar', (aux) => {
        principalMain(workersData)
    })
  }
  
  function principalMain (workersData) {
    printMain()
    readline.question('Seleccione una opcion: ', (option) => {
      const opt = parseInt(option)
      switch (opt) {
        case 1:
          buscarEntreFechas(workersData)
          return
        case 2:
          buscarMesActual(workersData)
          return
        case 3:
          buscarMesSiguiente(workersData)
          return
        case 0:
          console.log('\nGracias por usar el programa.\n')
          readline.close()
          return
        default:
          console.log('seleccione opcion valida')
          readline.question('\nPresione ENTER para continuar', (aux) => {
            principalMain(workersData)
          })
          return
      }
    })
  }

  module.exports = {
      principalMain
  }