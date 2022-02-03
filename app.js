const parse = require('csv-parser')
const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk');
const { argv } = require('process');




// const rl = readline.createInterface({ input, output });node

console.log(chalk.cyan.bold('This app finds all the employees birthdays between two dates at most separated for 365 days.' + '\r\n' + 'Please provide the required two dates following the next format:') + '\r\n' +
                chalk.magenta.bold('node app.js addDates --first="mm,dd" --second="mm,dd"')+ '\r\n' + chalk.blue.bold('Please consider that if you provide the greater date as first, as well as if both dates are the same, the second date will take one year later.'))


const funcionCumpleaños = (a,b) =>{
    //solo pido al usuario dos fechas sin año, solo mes y dia. A continuacion, establezco que la busqueda parte del año en curso.
    //Tomo los casos bordes de que la segunda fecha sea igual o menor a la primera fecha, en cuyo caso, le asigno un año más que a la primera fecha.
    
    today = new Date()
    let yearA = today.getFullYear()
    let yearB = 0
    //en esta parte comparo los valores, primero del mes: subtring 0-3 y luego del dia, substring 4-5 de ambas fechas, para saber que año asignar a la segunda fecha
    if(parseInt(a.substring(0,3)) > parseInt(b.substring(0,3))){
        yearB = today.getFullYear() +1
    } else if(parseInt(a.substring(0,3)) === parseInt(b.substring(0,3))){
        if(a.substring(4,5) >= b.substring(4,5)){
            yearB = today.getFullYear() +1
        } else{
            yearB = today.getFullYear()
        }
    } else{
        yearB = today.getFullYear()
    }
    //construyo ambas fechas.
    const annio = new Date().getFullYear()
    let fecha1 = new Date(yearA + ',' + a)
    
    let fecha2 = new Date(yearB +',' + b)
    


    const cumpleanios = []

    
    const mostrar = (datos) =>{
            for (i in datos){
                var a=parseInt(i)+1
                console.log(a,".- ",datos[i].apellido_y_nombre.split(',').reverse().join(" "), datos[i].cumpleanios)
            }
        }

    //en esta parte, agrego excpciones para comparar los meses y dias, considerando el año al que deberia pertener cada fecha de cumpleaños. Me lo imagino así:
    //si la first y second pertenecen a años distintos, entonces, si el mes de cumpleaños es mayor o igual a la primera fecha, necesariamente es mayor a la segunda
    // => es del año en curso y se compara de esa manera. depende de su dia, si sera impreso o no.
    //=> si first y second pertenecen a años distintos, siendo el mes de second menor que el de first, y el mes de cumpleaños es menor o igual que el mes de la segunda fecha//
    //=> es del año proximo y se compara de esa manera. depende de su dia, si sera impreso o no.
    //si first y second pertenecen al mismo año, entonces el mes de cumpleaños tambien y se compara normalmente.
    const compararFecha = (fecha1, fecha2, cumple) => {
        mesCumple = parseInt(cumple[1])
        diaCumple= parseInt(cumple[2])
        if(mesCumple == fecha1.getMonth()+1 && mesCumple == fecha2.getMonth()+1){
            if (diaCumple >= fecha1.getDate()+1 && diaCumple <= fecha2.getDate()){
                return true
            }
        }//carehueo
        else if(mesCumple === fecha1.getMonth()+1){
            if(diaCumple >= fecha1.getDate()+1){
                return true
            }
        }else if (mesCumple === fecha2.getMonth()+1){
            if(diaCumple <= fecha2.getDate()){
                return true
            }
        }
        return false
    }

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
            mostrar(cumpleanios)
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
        funcionCumpleaños(argv.first, argv.second)
        
    }
})


yargs.parse() // To set above changes