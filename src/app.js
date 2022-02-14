require("dotenv").config();
//const { NumberPrompt } = require('enquirer');
const parse = require("csv-parser");
const fs = require("fs");
const {compareDates} = require("./comparedates.js");
const {isValidDate} = require("./isvaliddate.js");
const {showDates} = require("./showDates.js");
const chalk = require('chalk')

//            ____       _____
//           / ___ \    / ____ \
//          / /__/ /   / /   / /
//         / ____  \  / /   / /
//        / /____/ / / /___/ /
//       /________/ /_______/

// const prompt = new NumberPrompt({
//         name: 'First date',
//         message: 'Please enter a day'
//     }, {
//         name: 'number',
//         message: 'Please enter a month'
//     });

const fechaInicio = process.argv[2];
//aquí es un enquirer
const fechaFin = process.argv[3];
//aqui es un input de enquirer

const fecha1 = new Date(fechaInicio);
const fecha2 = new Date(fechaFin);



//https://moment.github.io/luxon/#/tour
//https://github.com/cronvel/terminal-kit/blob/HEAD/doc/high-level.md#ref.singleColumnMenu
//https://www.npmjs.com/package/enquirer#select-prompt



const cumpleanios = [];


//arreglar un poquito
// if (isValidDate(fechaInicio) && isValidDate(fechaFin)) {
//     console.log("Formato correcto");
// } else if (!isValidDate(fechaInicio)) {
//     console.log("Formato incorrecto de la primera fecha ingresada");
//     return false;
// } else if (!isValidDate(fechaFin)) {
//     console.log("Formato incorrecto de la segunda fecha ingresada");
//     return false;
// } else {
//     console.log("Formato de ambas fechas es invalido");
//     return false;
// // }

if (!isValidDate(fechaInicio) || !isValidDate(fechaFin)) {
    console.log(chalk.red('Please provide two dates, both using the required format'));
    return false;
}

fs.createReadStream("mails_y_cumples_03.csv")
    .pipe(
        parse({
            delimiter: ",",
        })
    )
    .on("data", (dataRow) => {
        if (compareDates(fecha1, fecha2, dataRow.cumpleanios.split("-"))) {
            cumpleanios.push(dataRow);
        }
    })
    .on("end", () => {
        showDates(cumpleanios);
    });
