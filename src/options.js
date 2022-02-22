/* eslint-disable */

const { printMain } = require('./main');
const { show, convertToDate } = require('./converter');
const { isValidDateFormat } = require('./validator');
const { biggerDate, filteredBirthdays } = require('./comparator');
const { resolve } = require('path');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const buscarEntreFechasPromesa = () => {
  return new Promise((resolve, reject) => {
    readline.question('Ingrese fecha de inicio (yyyy/mm/dd): ', (startDate) => {
      // ! HACER REGEX 
        if (isValidDateFormat(startDate)) {
          return reject('Fecha no cumple formato');
        }
      resolve(startDate);
    });
  });
};

const ingresarFechaFinPromesa = () => {
  return new Promise((resolve, reject) => {
    readline.question('Ingrese fecha de fin (yyyy/mm/dd): ', (endDate) => {
      if (isValidDateFormat(startDate)) {
        return reject('Fecha no cumple formato');
      }
      resolve(endDate);
    });
  });
};

function buscarEntreFechas(workersData) {
  readline.question('Ingrese fecha de inicio (yyyy/mm/dd): ', (startDate) => {
    obtenerFechaFin(startDate, workersData);
  });
}

function obtenerFechaFin(startDate, workersData) {
  readline.question('Ingrese fecha de fin (yyyy/mm/dd): ', (endDate) => {
    obtenerCumples(startDate, endDate, workersData);
    readline.question('\nPresione ENTER para continuar', (aux) => {
      principalMain(workersData);
    });
  });
}

function obtenerCumples(startDate, endDate, workersData) {
  let birthdayList = [];
  // if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
  //   const firstDate = convertToDate(startDate);
  //   const secondDate = convertToDate(endDate);
  //   if (biggerDate(firstDate, secondDate)) {
  //     birthdayList = filteredBirthdays(firstDate, secondDate, workersData);
  //   } else {
  //     const startYear = new Date();
  //     startYear.setMonth(0, 1);
  //     const endYear = new Date();
  //     endYear.setMonth(11, 31);
  //     birthdayList = [
  //       ...filteredBirthdays(firstDate, endYear, workersData),
  //       ...filteredBirthdays(startYear, secondDate, workersData),
  //     ];
  //   }
  //   show(birthdayList);
  // }
}

function buscarMesActual (workersData) {
  let birthdayList = [];
  const today = new Date();
  const firstDate = new Date(2022, today.getMonth(), 1);
  const secondDate = new Date(2022, today.getMonth() + 1, 0);
  
  obtenerCumples(firstDate,secondDate,workersData);
}

function buscarMesSiguiente(workersData) {
  let birthdayList = [];
  const today = new Date();
  const firstDate = new Date(2022, today.getMonth() + 1, 1);
  const secondDate = new Date(2022, today.getMonth() + 2, 0);
  
  obtenerCumples(firstDate, secondDate, workersData);

}

const menuPromesa = () => {
  return new Promise((resolve, reject) => {
    readline.question('Seleccione una opcion: ', (menu) => {
      resolve(menu);
    });
  });
};

const enterPromesa = () => {
  return new Promise((resolve, reject) => {
    readline.question('Presione cualquiercosa para continuar: ', (enter) => {
      resolve(enter);
    });
  });
};

const fechasManual = async () =>{
  try {
    const fechaStart = await buscarEntreFechasPromesa();
  
    const date1 = new Date(fechaStart);
  
    const fechaFin = await ingresarFechaFinPromesa();

    console.log(`-> ${fechaStart}   ${fechaFin}`);

    obtenerCumples(fechaStart, fechaFin, workersData);

    await enterPromesa();

  } catch (error) {
    await enterPromesa();
    console.error('error->', error);
  }
  return;
}


const principalMain = async (workersData) => {
  printMain();

  const selectorMenu = await menuPromesa();
  const opt = parseInt(selectorMenu);


  switch (opt) {
    case 1:
      //buscarEntreFechasPromesa(workersData).then((valor)=>{}).catch((error) => console.error('error->',error));
      await fechasManual();
      break;
    case 2:
      try {
        console.log('CASE 2');

        const fechaStart = new Date().setDate(1);
        const fechaFin =  new Date().setDate(31);

        console.log(`-> ${fechaStart}   ${fechaFin}`);

        obtenerCumples(fechaStart, fechaFin, workersData);
        await enterPromesa();

      } catch (error) {
        console.error('error->', error);
      }
    case 3:
      buscarMesSiguiente(workersData);
      return;
    case 0:
      console.log('\nGracias por usar el programa.\n');
      readline.close();
      return true;
    default:
      console.log('seleccione opcion valida');
      // 
  }

  throw  new Error('FIN SWITCH CASE');
  return;
};

module.exports = {
  principalMain,
};
