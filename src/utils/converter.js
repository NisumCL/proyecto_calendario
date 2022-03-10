/* eslint-disable */
const Worker = require('../models/worker')

function show(data) {
  data.forEach(person => {
    // eslint-disable-next-line no-console
    console.log(`${person.birthday} => ${person.name} ${person.lastname}`);
  });
}

function convertToDate(inputDateString) {
  const arrayInputDateString = inputDateString.split('-');
  const date = new Date();
  date.setFullYear(
    date.getFullYear(),
    parseInt(arrayInputDateString[1], 10) - 1,
    parseInt(arrayInputDateString[2], 10)
  );
  date.setHours(0, 0, 0, 0);
  return date;
}

function matchThisYear(dateString) {
  const arrayDateString = dateString.split('-');
  const date = new Date();
  date.setFullYear(
    date.getFullYear(),
    parseInt(arrayDateString[1], 10) - 1,
    parseInt(arrayDateString[2], 10)
  );
  date.setHours(0, 0, 0, 0);
  return date;
}

//aca ya no necesitamos separar el csv, sino que consultar la base de datos.
// db.collection('new-tasks').find({ aqui adentro le tengo que decir que los cumpleanios cumplan con los criterios que pedia el backend }).count((error, users)=>{
        
//   console.log(users)
// })

function dataToObject(data) {
  const dataFormated = data
    .split('\n')
    .splice(1)
    .map(row => {
      if (row === '') {
        throw new Error('Existe una fila sin información. Favor eliminarla del archivo.');
      }
      const workerData = row.split(',');
      const worker = {
        name: Worker.name
        lastname: Worker.lastname.replace('"', ''),
        email: Worker.email,
        birthday: matchThisYear(Worker.cumpleanios),
        company: workerData[4],
      };
      return worker;
    });
  return dataFormated;
}

//

module.exports = { dataToObject, convertToDate, show };
