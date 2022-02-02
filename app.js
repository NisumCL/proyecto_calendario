const parse = require("csv-parser");
const fs = require("fs");

// Ingresar fechas por consola
const startDate = process.argv[2];
const limitDate = process.argv[3];

const fecha1 = new Date(startDate);
const fecha2 = new Date(limitDate);

// Es para validar que la primera fecha no sea mayor que la segunda.
let isValidDate = false;

if (fecha1 <= fecha2) {
  isValidDate = true;
}

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
