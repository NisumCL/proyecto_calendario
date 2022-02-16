<<<<<<< HEAD
const parse = require("csv-parser");
const fs = require("fs");
const test = require("./test");
const show = require("./show");

const inputInicio = process.argv[2];
const inputFin = process.argv[3];

const cumpleanios = [];

const isValidInput = test.isInformedInput(inputInicio, inputFin);

const isValidInputInicioFormatDate = test.isValidFormatDate(inputInicio);

const isValidInputFinFormatDate = test.isValidFormatDate(inputFin);

if (!isValidInputInicioFormatDate || !isValidInputFinFormatDate) {
    console.log('Debes ingresar el formato de fecha: "YYYY/MM/DD"');
    return false;
}

if (isValidInput) {
    const startDate = new Date(inputInicio);
    const finishDate = new Date(inputFin);

    let areValidDates = test.isValidDate(startDate, finishDate);

    if (areValidDates) {
        fs.createReadStream("mails_y_cumples_03.csv")
            .pipe(
                parse({
                    delimiter: ",",
                })
            )
            .on("data", (dataRow) => {
                if (
                    test.compararFecha(
                        startDate,
                        finishDate,
                        dataRow.cumpleanios.split("-")
                    )
                ) {
                    cumpleanios.push(dataRow);
                }
            })
            .on("end", () => {
                show.mostrar(cumpleanios);
            });
    }

    let mostrarData = show.mostrar;

    let compararDate = test.compararFecha;
=======
const { dataFile } = require('./reader');
const { dataToObject, show, convertToDate } = require('./converter');
const { isValidDateFormat } = require('./validator');
const { biggerDate, filteredBirthdays } = require('./comparator');

try {
  const startDate = process.argv[2];
  const endDate = process.argv[3];
  let birthdayList = [];
  if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
    const firstDate = convertToDate(startDate);
    const secondDate = convertToDate(endDate);
    const fileInfo = dataFile('./mails_y_cumples_03.csv');
    const workersData = dataToObject(fileInfo);
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
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
>>>>>>> b8212c845e85b17194e7b3f539d7ca7c4d070f0e
}
