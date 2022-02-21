require("dotenv").config()
const parse = require("csv-parser")
const fs = require("fs")
const { compareDates } = require("./comparedates")
// const { isValidDate } = require("./isvaliddate.js")
const { showDates } = require("./showDates.js")
const { mainMenu } = require("./menudates/menu.js")
const { pausa } = require("./menudates/pauses.js")
const { birthDateFormat } = require('./birthdateformat.js')
const chalk = require('chalk')

const main = async() =>{
    const { startDate, endDate } = await mainMenu()
    await pausa()
    if(startDate === null || endDate === null){
        return;
    } else {
        console.log(chalk.green(`Searching from ${startDate} to ${endDate}`))
    }
    
    // if (!isValidDate(startDate) || !isValidDate(endDate)) {
      //         console.log(chalk.red('Please provide two valid dates'));
      //         return false;
      //     }
      
    const birthdaysArray = [];
    fs.createReadStream("mails_y_cumples_03.csv")
        .pipe(
            parse({
                delimiter: ",",
            })
        )
        .on("data", (dataRow) => {
          if (compareDates(startDate, endDate, birthDateFormat(dataRow.cumpleanios))){
            birthdaysArray.push(dataRow);
          }
        })
        .on("end", () => {
          pausa()
          showDates(birthdaysArray)
          mainMenu()
        });
}

main()


