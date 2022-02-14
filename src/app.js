const parse = require("csv-parser");
const fs = require("fs");
const chalk = require("chalk");

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

const isValidFormatDate = (date) => {
    let regex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;

    if (!regex.test(date)) {
        return false;
    }

    let parts = date.split("/");
    let day = parseInt(parts[2], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10);

    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        return false;
    }

    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }

    return day > 0 && day <= monthLength[month - 1];
};

let isValidInputInicioFormatDate = isValidFormatDate(inputInicio);
console.log(isValidInputInicioFormatDate);

let isValidInputFinFormatDate = isValidFormatDate(inputFin);
console.log(isValidInputFinFormatDate);

if (!isValidInputInicioFormatDate && !isValidInputFinFormatDate) {
    console.log('Debes ingresar el formato de fecha: "YYYY/MM/DD"');
}

const areValid = (isValidInputInicio, isValidInputFin) => {
    if (isValidInputInicio && isValidInputFin) {
        const fecha1 = new Date(inputInicio);
        const fecha2 = new Date(inputFin);

        const cumpleanios = [];

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

        //pend
        const yearDate = (fecha1, fecha2) => {
            if (fecha1.getFullYear() !== fecha2.getFullYear()) {
                console.log("La fecha debe ser menor a un año");
            }
        };
        let isYearNotSame = yearDate(fecha1, fecha2);
        console.log(isYearNotSame);

        //pend
        const typeofData = (fecha1, fecha2) => {
            if (fecha1 === inputInicio && fecha2 === inputFin) {
                return true;
            }
        };
        //console.log(typeofData(fecha1, fecha2));

        //Pend
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
                day; //quiero que recorra el archivo y si al no encontrar ninguna coincidencia, me diga que no hay
            });
            if (areTodayBirths != cumpleanios) {
                console.log("no es igual");
            }
            console.log(emptyTodayBirth);
        };

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
