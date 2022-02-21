const chalk = require('chalk');

const showDates = (datos) => {
    for (i in datos){
        var a = parseInt(i)+1
        // var mostrarDatos = datos[i].cumpleanios.slice(5) + "th" 
        console.log(chalk.cyan(a,".- ",datos[i].apellido_y_nombre.split(',').reverse().join(" "), datos[i].cumpleanios))
    }
}

module.exports = {
    showDates
}