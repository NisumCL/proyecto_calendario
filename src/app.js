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
    console.log('Debes ingresar exactamente dos fechas en el formato de fecha: "YYYY/MM/DD"');
    return false
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
}
