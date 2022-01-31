//Importar modulo para trabajar con archivos.
const fs = require('fs');

//Funcion para conocer el día del año
function dayOfYear(date) {
  daysPast = Math.floor(date - new Date(date.getFullYear(),0,0)) / (1000 * 60 * 60 * 24);
  return daysPast;
}

//Leer el archivo y guardar información en variable.
const data = fs.readFileSync("./mails_y_cumples_03.csv", "utf-8",(err, data) => {
  if (err){
    console.error(err);
  }
  else {
    return data;
  }
});

//Modificar la data para obtenerlos como un objeto ordenado
const dataFormated = data.split('\n').splice(1).map(row => {
    const workerData = row.split(',');
    const worker = {
      name: workerData[1].replace('"','').trim(),
      lastname: workerData[0].replace('"',''),
      email: workerData[2],
      birthday: workerData[3],
      company: workerData[4]
    };
    return worker;
});


const filterData = dataFormated.filter(worker => {
  //Obtener fecha actual.
  const dateNow = new Date();
  const actualDay = dayOfYear(dateNow);

  //Obtener fechas de cumpleaños del trabajor
  const dateBirthday = new Date(worker.birthday);
  const birthdayDay = dayOfYear(dateBirthday);

  //Diferencia entre ambas fechas
  const dayDifference = birthdayDay - actualDay;
  
  //Obtener los cumpleaños de los proximos 15 días
  if (((dayDifference >= 0) && (dayDifference <= 14)) || ((dayDifference >= -365) && (dayDifference <= -351))){
    return worker;
  }
});

console.table(filterData);