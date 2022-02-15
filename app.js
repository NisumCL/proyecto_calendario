const parse = require('csv-parser')
const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk')
const hr = require('./helper.js')

if (!process.argv[2]){
    hr.instruCCions()
} 

console.log(
    
    chalk.magenta(` **************************************\n`),
    chalk.blue(`--------------------------------------\n`),
    chalk.green(`     __   __   ____       ____     \n`),
    chalk.cyan(`    / /  / /  / ___ \\    / __  \\   \n`),
    chalk.green(`   / /__/ /  / /__/ /   / /   \\ \\  \n`),
    chalk.green(`  /  __  /  / ____  \\  / /    / /  \n`),
    chalk.cyan(` / /  / /  / /____/ / / /____/ /   \n`),
    chalk.green(`/_/  /_/  /________/ /________/    \n`),
    chalk.blue(`_____________________________________ \n`),
    chalk.magenta(`*************************************\n`),
    chalk.greenBright.bold(`*** Welcome to the birthdays app ***\n`),
    chalk.magenta(`*************************************\n`),
    chalk.blue(`------------------------------------- \n`)
)



const funcionCumpleannos = (a, b) => {
    if (!hr.validarFechas(a, b)) {
        console.log(chalk.red('Please use the required format'));
        return false;
    }

    const { fecha1, fecha2 } = hr.asignarYear(a, b);
    const cumpleanios = [];

    fs.createReadStream('mails_y_cumples_03.csv')
        .pipe(parse({
            delimiter: ','
        })
        )
        .on("data", (dataRow) => {
            if (hr.compararFecha(fecha1, fecha2, dataRow.cumpleanios.split('-'))) {
                cumpleanios.push(dataRow);
            }
        })
        .on("end", () => {
            hr.mostrarFecha(cumpleanios);
        });
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
    handler (argv) {
        funcionCumpleannos(argv.first, argv.second)
        
    }
})

yargs.parse()

