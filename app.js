const parse = require('csv-parser')
const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk');
const validateDate = require('validate-date')


if(!process.argv[2]){
    console.log(chalk.cyan.bold('--------------------------------------------------------------------------------------------')+ '\r\n' +
                chalk.cyan.bold('This app finds all the employees birthdays between two dates at most separated for 365 days.' + '\r\n' + 
                                'Please provide the required two dates following the next format:') + '\r\n' +
                chalk.magenta.bold('node app.js addDates --first="mm/dd" --second="mm/dd"')+ '\r\n' + 
                chalk.cyan.bold('Please consider that the first date takes the cuurent year and if you provide the greater' + '\r\n' + 'date as first, as well as if both dates are the same, the second takes one year later.') +'\r\n'+
                chalk.cyan.bold('--------------------------------------------------------------------------------------------'))
}

//
const funcionCumpleannos = (a,b) =>{
    
    if(a.includes('-') || b.includes('-')){
        console.log(chalk.red('Please use the required format'))
        return
    } 
    const validarFechas = (a,b) =>{
        if(validateDate((1843 + '/' + a), responseType="boolean", dateFormat="yy/mm/dd")){
            if(validateDate((1843 + '/' + b), responseType="boolean", dateFormat="yy/mm/dd")){
                return true
            } else{
                return false
            }
        } return false
    }

    //En esta parte simplemente valido que a y b sean fechas de mes y dia
    if(!validarFechas(a,b)){
        console.log(chalk.red('You must provide valid dates in the required format'))
    }

    const today = new Date()
    const yearA = today.getFullYear()
    let yearB = 0
    
    if(parseInt(a.substring(0,2)) > parseInt(b.substring(0,2))){
        yearB = today.getFullYear() + 1
        
    } else if(parseInt(a.substring(0,2)) === parseInt(b.substring(0,2))){
        if(a.slice(3) >= b.slice(3)){
            yearB = today.getFullYear() + 1
            
        } else if(a.slice(3) < b.slice(3)){
            yearB = today.getFullYear()
        }
    } 
    const fecha1 = new Date(yearA + ',' + a.replace('/', ','))
    const fecha2 = new Date(yearB +',' + b.replace('/', ','))

    console.log(yearA, yearB)
    const cumpleanios = []
    


    const mostrar = (datos) =>{
            for (i in datos){
                var a=parseInt(i)+1
                console.log(a,".- ",datos[i].apellido_y_nombre.split(',').reverse().join(" "), datos[i].cumpleanios)
            }
        }

    
    const compararFecha = (fecha1, fecha2, cumple) => {
        
        mesCumple = parseInt(cumple[1])
        diaCumple= parseInt(cumple[2])


        // if(mesCumple == fecha1.getMonth()+1 && mesCumple == fecha2.getMonth()+1){
        //     if(fecha1.getDate() < fecha2.getDate()){
        //         if(fecha1.getDate() > diaCumple || diaCumple > fecha2.getDate()){
        //             return false
        //         } 
        //     } else if(fecha2.getDate() <= fecha1.getDate()){
        //         if(diaCumple > fecha2.getDate() || fecha1.getDate() > diaCumple){
        //             return false
        //         } 
        //     } 
        // } else if(fecha1.getMonth()+1 === fecha2.getMonth()+1){
        //     if(fecha1.getDate() < fecha2.getDate() && mesCumple!= fecha2.getMonth()+1){
        //         return false
        //     } else if(fecha2.getDate() < fecha1.getDate()){
        //         if(fecha1.getMonth()+1 > mesCumple || mesCumple > fecha2.getMonth()+1){
        //             return false
        //         } 
        //     }
        // } else if(fecha1.getMonth()+1 < fecha2.getMonth()+1){
        //     if(diaCumple > fecha2.getDate() || fecha1.getDate() > diaCumple){
        //         return false
        //     } 
        // } else if(fecha1.getMonth()+1 > fecha2.getMonth()+1){
        //     if(mesCumple < fecha1.getMonth()+1 || mesCumple > fecha2.getMonth()+1){
        //         return false
        //     }
        // }
        
        
        if(mesCumple == fecha1.getMonth()+1 && mesCumple == fecha2.getMonth()+1){
            if (diaCumple >= fecha1.getDate() || diaCumple <= fecha2.getDate()){
            return true
            }
        }
        else if(mesCumple === fecha1.getMonth()+1){
            if(diaCumple >= fecha1.getDate()){
                    return true
                }
        }else if (mesCumple === fecha2.getMonth()+1){
            if(diaCumple <= fecha2.getDate()){
                    return true
                }
        }else if(fecha2.getMonth()+1 < fecha1.getMonth()+1){
            if(diaCumple >= fecha1.getDate() && diaCumple <= fecha2.getDate()){
                return true
            } else if(diaCumple > fecha2.getDate){
                return false
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
            if(validarFechas(a,b) && compararFecha(fecha1, fecha2, dataRow.cumpleanios.split('-'))){
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
            funcionCumpleannos(argv.first, argv.second)
            
        }
    })
    yargs.parse()

