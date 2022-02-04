const parse = require("csv-parser");
const fs = require("fs");

// Ingresar fechas por consola
const startDate = process.argv[2];
const finishDate = process.argv[3];

const fecha1 = new Date(startDate);
const fecha2 = new Date(finishDate);

// Valida que no esten vacías las fechas ingresadas
if (!startDate || !finishDate) {
  console.log("Ingresa una fecha");
}

// Formato de Fecha (reutilizado de StackOverFlow)
let dateFormat = (dateString) => {
  // First check for the pattern
  let regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
  //console.log("dateString", dateString);

  if (!regex_date.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  let parts = dateString.split("-");
  let day = parseInt(parts[2], 10);
  let month = parseInt(parts[1], 10);
  let year = parseInt(parts[0], 10);
  // console.log("year", year);
  // console.log("dia", day);
  // console.log("mes", month);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }

  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};
// console.log(dateFormat(startDate));
// console.log(dateFormat(finishDate));

// Valida que cumpla el formato de la variable "dateFormat"......
if (!dateFormat(startDate) && !dateFormat(finishDate)) {
  console.log('Debes ingresar el formato de fecha: "YYYY-MM-DD"');
}

// Valida que la primera fecha no sea mayor que la segunda
let isValidDate = false;
if (fecha1 <= fecha2) {
  isValidDate = true;
} else {
  console.log(
    "La primera fecha debe ser menor a la segunda, ingresa una nueva fecha"
  );
}

// Lista los cumpleaños que cumplen las condiciones anteriores
if (isValidDate) {
  const cumpleanios = [];

  // Enumero a los cumpleañeros y muestro solo su fecha de nacimiento y su nombre
  const mostrar = (datos) => {
    for (i in datos) {
      var a = parseInt(i) + 1;
      console.log(a, ".- ", datos[i].cumpleanios, datos[i].apellido_y_nombre);
    }
  };

  // Recibo ambas fechas en formato Date() mas el cumpleaños en formato de lista [aaaa,mm,dd],
  // retorno true si el cumpleaños esta entre la fecha1 y la fecha2
  // retorno false en otro caso
  const compararFecha = (fecha1, fecha2, cumple) => {
    mesCumple = parseInt(cumple[1]);
    diaCumple = parseInt(cumple[2]);
    if (
      mesCumple == fecha1.getMonth() + 1 &&
      mesCumple == fecha2.getMonth() + 1
    ) {
      if (diaCumple >= fecha1.getDate() && diaCumple <= fecha2.getDate()) {
        return true;
      }
    } else if (mesCumple === fecha1.getMonth() + 1) {
      if (diaCumple >= fecha1.getDate()) {
        return true;
      }
    } else if (mesCumple === fecha2.getMonth() + 1) {
      if (diaCumple <= fecha2.getDate()) {
        return true;
      }
    }
    return false;
  };

  // Leo el archivo .csv y guardo solo los empleados que estan de cumpleaños
  // desde hoy hasta 15 dias mas
  fs.createReadStream("mails_y_cumples_03.csv")
    .pipe(
      parse({
        delimiter: ",",
      })
    )
    .on("data", (dataRow) => {
      if (compararFecha(fecha1, fecha2, dataRow.cumpleanios.split("-"))) {
        cumpleanios.push(dataRow);
      }
    })
    .on("end", () => {
      mostrar(cumpleanios);
    });
}
