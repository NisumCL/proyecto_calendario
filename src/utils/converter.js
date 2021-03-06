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
        name: workerData[1].replace('"', '').trim(),
        lastname: workerData[0].replace('"', ''),
        email: workerData[2],
        birthday: convertToDate(workerData[3]),
        company: workerData[4],
      };
      return worker;
    });
  return dataFormated;
}

module.exports = { dataToObject, convertToDate };
