require("dotenv").config()
const parse = require("csv-parser")
const fs = require("fs")
const { compareDates } = require("./comparedates")
const { isValidDate } = require("./isvaliddate.js")
const { showDates } = require("./showDates.js")
const { mainMenu } = require("./menudates/menu.js")
const { pausa } = require("./menudates/pauses.js")
const { stringToDate, formatDate } = require('./stringtodate.js')
const chalk = require('chalk');

const main = async() =>{
  const { startDate, endDate } = await mainMenu()

  if(startDate === null || endDate === null){
    return
  } else {
    console.log(chalk.magenta(`Searching from ${formatDate(startDate)} to ${formatDate(endDate)}`))
  }
  
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    console.log(chalk.red('Please provide two valid dates'));
    return;
  } 
  const birthdaysArray = [];
  fs.createReadStream("mails_y_cumples_03.csv")
  .pipe(
    parse({
        delimiter: ","
    })
  )
  .on("data", (dataRow) => {
    
    if (compareDates(startDate, endDate, stringToDate(dataRow.cumpleanios))){
      birthdaysArray.push(dataRow);
    }
  })
  .on("end", () => {
    pausa()
    showDates(birthdaysArray)
    main()
  })

}

main()


