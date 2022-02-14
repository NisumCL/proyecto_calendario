const validateDate = require('validate-date')
const chalk = require('chalk');

const showDates = (datos) => {
    for (i in datos){
        var a = parseInt(i)+1
        var mostrarDatos = datos[i].cumpleanios.slice(5) + "th" 
        console.log(chalk.cyan(a,".- ",datos[i].apellido_y_nombre.split(',').reverse().join(" "), mostrarDatos))
    }
    if(datos.length === 0){
        console.log('There is no birthdays to show')
    }
}

module.exports = {
    showDates
}