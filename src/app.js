const parse = require("csv-parser");
const fs = require("fs");
const test = require("./test");
const show = require("./show");

const inputInicio = process.argv[2];
const inputFin = process.argv[3];

const cumpleanios = [];

let isValidInput = test.isInformedInput(inputInicio, inputFin);

let isValidInputInicioFormatDate = test.isValidFormatDate(inputInicio);

let isValidInputFinFormatDate = test.isValidFormatDate(inputFin);

if (!isValidInputInicioFormatDate || !isValidInputFinFormatDate) {
    console.log('Debes ingresar el formato de fecha: "YYYY/MM/DD"');
    return false;
}

if (isValidInput) {
    const fecha1 = new Date(inputInicio);
    const fecha2 = new Date(inputFin);

    let areValidDates = test.isValidDate(fecha1, fecha2);

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
                        fecha1,
                        fecha2,
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
}
