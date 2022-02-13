require('dotenv').config();

const parse = require('csv-parser');
const fs = require('fs');

function isValidDate(date) {
  const regex = /^([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))$/;
  const dateOk = regex.test(date);
  return dateOk;
}

const mostrar = datos => {
  datos.forEach(persona => {
    // eslint-disable-next-line no-console
    console.log(persona.cumpleanos, persona.apellido_y_nombre);
  });
};

const compararFecha = (fecha1, fecha2, cumple) => {
  const mesCumple = parseInt(cumple[1], 10);
  const diaCumple = parseInt(cumple[2], 10);
  if (mesCumple === fecha1.getMonth() + 1 && mesCumple === fecha2.getMonth() + 1) {
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
  } else if (mesCumple > fecha1.getMonth() + 1 && mesCumple < fecha2.getMonth() + 1) {
    return true;
  }
  return false;
};

const fechaInicio = process.argv[2];
const fechaFin = process.argv[3];

const fecha1 = new Date(fechaInicio);
const fecha2 = new Date(fechaFin);

const cumpleanios = [];

if (isValidDate(fechaInicio) && isValidDate(fechaFin)) {
  // eslint-disable-next-line no-console
  console.log('Formatos correcto');
  fs.createReadStream('mails_y_cumples_03.csv')
    .pipe(
      parse({
        delimiter: ',',
      })
    )
    .on('data', dataRow => {
      if (compararFecha(fecha1, fecha2, dataRow.cumpleanios.split('-'))) {
        cumpleanios.push(dataRow);
      }
    })
    .on('end', () => {
      mostrar(cumpleanios);
    });
} else if (!isValidDate(fechaInicio)) {
  console.log('Formato incorrecto de la primera fecha ingresada');
} else if (!isValidDate(fechaFin)) {
  console.log('Formato incorrecto de la segunda fecha ingresada');
} else {
  console.log('Formato de ambas fechas es invalido');
}
