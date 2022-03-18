/* eslint-disable */
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

function dataToObject(data) {
  const dataFormated = []
  data.forEach((e) => {
    let wholename = e._rawData[0].split(', ');
    let  worker = {
      name: wholename[1],
      lastname: wholename[0],
      email:  e._rawData[1],
      birthday: matchThisYear(e._rawData[2]),
      company: e._rawData[3]
    };
    dataFormated.push(worker);
  })
  return dataFormated;
}

module.exports = { dataToObject, convertToDate, matchThisYear };