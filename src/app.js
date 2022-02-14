const parse = require("csv-parser");
const fs = require("fs");
const chalk = require("chalk");

//inputInicio, inputFin porque son strings y no fecha, //OK!test 1: Que no haya ninguna fecha.

const inputInicio = process.argv[2];
const inputFin = process.argv[3];

const isInformedInput = (input) => {
    if (input === undefined) {
        console.log(chalk.bgRed("Ingresa una fecha undefined"));
        return false;
    } else if (input.trim() === "") {
        console.log(chalk.bgRed("Ingresa una fecha"));
        return false;
    } else {
        console.log("Ingresaste bien");
        return true;
    }
};

let isValidInputInicio = isInformedInput(inputInicio);
let isValidInputFin = isInformedInput(inputFin);

//OK! test 13: La fecha ingresada sea válida
const isValidFormatDate = (date) => {
    let regex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;

    if (!regex.test(date)) {
        return false;
    }

    // Parse the date parts to integers
    let parts = date.split("/");
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

    // console.log(dateFormat(startDate));
    // console.log(dateFormat(finishDate));
};

let isValidInputInicioFormatDate = isValidFormatDate(inputInicio);
console.log(isValidInputInicioFormatDate);

let isValidInputFinFormatDate = isValidFormatDate(inputFin);
console.log(isValidInputFinFormatDate);

//OK! test4: Que no se cumpla el formato entregado, ej "YYYY-MM-DD o YYYY/MM/DD" crear una función solo para formato, no mezclarlo con la fecha.
if (!isValidInputInicioFormatDate && !isValidInputFinFormatDate) {
    console.log('Debes ingresar el formato de fecha: "YYYY/MM/DD"');
}

const areValid = (isValidInputInicio, isValidInputFin) => {
    if (isValidInputInicio && isValidInputFin) {
        const fecha1 = new Date(inputInicio);
        const fecha2 = new Date(inputFin);

        const cumpleanios = [];

        //OK!test 2: Que la segunda fecha sea menor a la primera fecha
        const isValidDate = (fecha1, fecha2) => {
            if (fecha1 <= fecha2) {
                return true;
            } else {
                console.log(
                    chalk.bgRed(
                        "La primera fecha debe ser menor a la segunda, ingresa una nueva fecha"
                    )
                );
                return false;
            }
        };

        let areValidDates = isValidDate(fecha1, fecha2);
        console.log(areValidDates);
        //si son las fechas validas, mira todo el resto

        //PEND! test 8: Qué pasa cuando las fechas ingresadas están con distancia de mas de un año
        // no toma el año, solo los meses y dias... en este caso, se podría validar que si el año fecha1 != al fecha2, diga que la fecha debe ser menor a un año.
        //PEND! test 10: Probar fechas que estén en el mismo mes pero distinto año, ej 2022-02-28 2023-02-01
        //solo toma el mes, entonces hay que tb condicionar solo el año.

        const yearDate = (fecha1, fecha2) => {
            if (fecha1.getFullYear() !== fecha2.getFullYear()) {
                console.log("La fecha debe ser menor a un año");
            }
        };
        let isYearNotSame = yearDate(fecha1, fecha2);
        console.log(isYearNotSame);

        //PEND! test5: Validar que el tipo de dato sea el especifícado, creo que esto se cumple al cumplir con el formato regex...

        const typeofData = (fecha1, fecha2) => {
            if (fecha1 === inputInicio && fecha2 === inputFin) {
                return true;
            }
        };
        //console.log(typeofData(fecha1, fecha2));

        //PEND! test 7: Qué pasa cuando no hay datos entre fechas ingresadas (no hay cumpleaños)
        //Si no hay cumpleaños, ingresar un mensaje que diga: "No hay cumpleaños dentro del rango de fechas ingresadas" como comparar que la fila esta sin datos para esos argv

        const isTodayBirthday = (fecha1, fecha2, data) => {
            if (fecha1.getMonth === fecha2.getMonth) {
                if (fecha1.getDate === fecha2.getDate) {
                    console.log("No hay cumpleaños hoy");
                    return true;
                }
            } else {
                return false;
            }
        };

        let areTodayBirths = isTodayBirthday(fecha1, fecha2);
        console.log(areTodayBirths);

        const emptyTodayBirth = (areTodayBirths) => {
            areTodayBirths.forEach((day) => {
                day; //quiero qeu recorra el archivo y si al no encontrar ninguna coincidencia, me diga que no hay
            });
            if (areTodayBirths != cumpleanios) {
                console.log("no es igual");
            }
            console.log(emptyTodayBirth);
        };

        //PEND! test 6: Cuál es el resultado al ingresar mas de dos fechas, al probar entran todas
        //Buscar una solución para limitar la entrada de argv.

        //ok! test 9: Probar fechas que tengan distancia mayor a un mes, ej: 2022-02-08 2022-04-08

        //PEND! test 11: Qué pasa cuando hay un cumpleaños el 29 de febrero, ej te traerá 28-02 o 01-03
        // lo trae el 01 de 03 y no el 29

        //ok! test 12: Manejar fechas en formato UTC, el problema se origina cuando se toma la hora local y se compara con la hora universal, por ejemplo: Chile tiene -3... si son las 00 local. La universal sería 00 horas - 3 horas = 21 horas, dejando entonces el día anterior como el actual.
        // aquí se puede solucionar solo utilizando el /, condicioné el formato a /

        //PEND! test 14: Qué pasa si solo una de las fechas cumple el formato y la otra no?.
        // No sería mejor tener un mensaje diferenciado, para seguir el error más fácil?.

        const mostrar = (datos) => {
            for (i in datos) {
                const a = parseInt(i) + 1;
                console.log(
                    a,
                    ".- ",
                    datos[i].cumpleanios,
                    datos[i].apellido_y_nombre
                );
            }
        };
        const compararFecha = (fecha1, fecha2, cumple) => {
            mesCumple = parseInt(cumple[1]);
            diaCumple = parseInt(cumple[2]);
            if (
                mesCumple == fecha1.getMonth() + 1 &&
                mesCumple == fecha2.getMonth() + 1
            ) {
                if (
                    diaCumple >= fecha1.getDate() &&
                    diaCumple <= fecha2.getDate()
                ) {
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
            } else if (
                mesCumple > fecha1.getMonth() + 1 &&
                mesCumple < fecha2.getMonth() + 1
            ) {
                return true;
            }
            return false;
        };
        fs.createReadStream("mails_y_cumples_03.csv")
            .pipe(
                parse({
                    delimiter: ",",
                })
            )
            .on("data", (dataRow) => {
                if (
                    compararFecha(
                        fecha1,
                        fecha2,
                        dataRow.cumpleanios.split("-")
                    )
                ) {
                    cumpleanios.push(dataRow);
                }
            })
            .on("end", () => {
                mostrar(cumpleanios);
            });
    }
};
console.log(areValid);
