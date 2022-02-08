const reader = require('readline');
const isValid = require('date-fns/isValid');
const compareDesc = require('date-fns/compareDesc');
const appFunction = require('./app.js');

const rl = reader.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Se solicita el inicio del intervalo
rl.question("¿Ingrese la fecha de inicio del periodo de busqueda (AAAA/MM/DD)? ", (initDate) => {
  //Se transforma a formato Date
  const startDate = new Date(initDate);
  //Se valida que sea una fecha valida
  if (isValid(startDate)) {
    //Se solicita el final del intervalo
    rl.question("¿Ingrese la fecha de termino del periodo de busqueda (AAAA/MM/DD)? ", (endDate) => {
      //Se transforma a formato Date
      const finalDate = new Date(endDate);
      //Se valida que sea una fecha valida
      if (isValid(finalDate)) {
        //Se valida que el inicio del intervalo sea menor que el final del intervalo
        if (compareDesc(startDate, finalDate) === 1){
          console.log('----- Listado de cumpleaños -----');
          //Se llama la funcion del archivo app para mostrar los cumpleaños en el intervalo solicitado
          appFunction.birthday(startDate,finalDate);
          rl.close();
        }
        else if (compareDesc(startDate, finalDate) === -1){
          console.log('El intervalo no es el adecuado');
          rl.close();
        } 
        else {
          console.log('El inicio y termino del intervalo es el mismo día')
          rl.close();
        }
      }
      else {
        console.error('La fecha ingresada no es valida.');
        rl.close();
      }
    })
  } else {
    console.error('La fecha ingresada no es valida');
    rl.close();
  }
});
  
