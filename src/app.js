require("dotenv").config();
const parse = require("csv-parser");
const fs = require("fs");
const {compareDates} = require("./comparedates.js");
const {isValidDate} = require("./isvaliddate.js");
const {showDates} = require("./showDates.js");
const {mainMenu, pausa} = require("./menu.js");
const chalk = require('chalk')

const main = async() =>{
    await pausa
    const { fecha1, fecha2 } = await mainMenu()
    //const fechaInicio = process.argv[2];
    const fechaInicio = `2020/${fecha1[1]}/${fecha1[0]}`
    const fechaFin = `2020/${fecha2[1]}/${fecha2[0]}`
    if(fecha1.length === 0 || fecha2.length === 0){
        return;
    } else {
        console.log(chalk.green(`Searching from ${fecha1[1]}/${fecha1[0]} to ${fecha2[1]}/${fecha2[0]}`))
    }
    // const fechaFin = process.argv[3];
    
    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFin);
    const cumpleanios = [];

    if (!isValidDate(fechaInicio) || !isValidDate(fechaFin)) {
            console.log(chalk.red('Please provide two valid dates'));
            return false;
        }

    fs.createReadStream("mails_y_cumples_03.csv")
        .pipe(
            parse({
                delimiter: ",",
            })
        )
        .on("data", (dataRow) => {
            if (compareDates(startDate, endDate, dataRow.cumpleanios.split("-"))) {
                cumpleanios.push(dataRow);
            }
        })
        .on("end", () => {
            showDates(cumpleanios);
        });
}

main()
