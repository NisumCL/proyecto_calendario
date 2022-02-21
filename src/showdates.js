const chalk = require('chalk');
const { stringToDate, formatDate } = require('./stringtodate')

const showDates = (datos) => {
    for (i in datos){
        var a = parseInt(i)+1
        var mostrarDatos = stringToDate(datos[i].cumpleanios)
        var formatearDatos = formatDate(mostrarDatos)
        console.log(chalk.cyan(a,".- ",datos[i].apellido_y_nombre.split(',').reverse().join(" "), formatearDatos))
    }
}

module.exports = {
    showDates
}