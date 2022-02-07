const parse = require('csv-parser')
const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk');
const { validarFechas, asignarYear, compararFecha, mostrarFecha } = require('./helper.js')


if(!process.argv[2]){
    console.log(chalk.cyan.bold('--------------------------------------------------------------------------------------------')+ '\r\n' +
                chalk.cyan.bold('This app finds all the employees birthdays between two dates at most separated for 365 days.' + '\r\n' + 
                                'Please provide the required two dates following the next format:') + '\r\n' +
                chalk.magenta.bold('node app.js addDates --first="mm/dd" --second="mm/dd"')+ '\r\n' + 
                chalk.cyan.bold('Please consider that the first date takes the cuurent year and if you provide the greater' + '\r\n' + 'date as first, as well as if both dates are the same, the second takes one year later.') +'\r\n'+
                chalk.cyan.bold('--------------------------------------------------------------------------------------------'))
}


const funcionCumpleannos = (a,b) =>{
    
    if(!validarFechas(a,b)){
        console.log(chalk.red('Please use the required format'))
        return false
    }

    const { fecha1, fecha2 } = asignarYear(a,b)

    const cumpleanios = []

    fs.createReadStream('mails_y_cumples_03.csv')
        .pipe(parse({
                delimiter: ','
            })
        )
        .on("data", (dataRow) => {
            if(compararFecha(fecha1, fecha2, dataRow.cumpleanios.split('-'))){
                cumpleanios.push(dataRow)
            }
        })
        .on("end",() => {
            mostrarFecha(cumpleanios)
        })
}

yargs.command({
    command: 'addDates',
    describe: 'You can see all the birthdays between two dates in the year',
    builder: {
        first: {
            describe: 'First Date',
            demandOption: true,  // Required
            type: 'string'     
        },
        second: {  
            describe: 'Second Date',
            demandOption: true, //Required
            type: 'string'
        }
    },
    
    // Function for your command
    handler(argv) {
        funcionCumpleannos(argv.first, argv.second)
        
    }
})

yargs.parse()

