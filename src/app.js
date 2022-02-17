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
    const { startDateArray, endDateArray } = await mainMenu()
    //const fechaInicio = process.argv[2];
    const DateOne = `2020/${startDateArray[1]}/${startDateArray[0]}`
    const DateTwo = `2020/${endDateArray[1]}/${endDateArray[0]}`
    // if(startDateArray.length === 0 || endDateArray.length === 0){
    //     return;
    // } else {
    //     console.log(chalk.green(`Searching from ${startDateArray[1]}/${startDateArray[0]} to ${endDateArray[1]}/${endDateArray[0]}`))
    // }
    // const DateTwo = process.argv[3];
    
    const startDate = new Date(DateOne);
    const endDate = new Date(DateTwo);
    const cumpleanios = [];

    if (!isValidDate(DateOne) || !isValidDate(DateTwo)) {
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
