const validateDate = require('validate-date')
const chalk = require('chalk');


const validarFechas = (a,b) =>{
    if(a.includes('-') || b.includes('-')){
        return false
    }

    if(validateDate((1843 + '/' + a), responseType="boolean", dateFormat="yy/mm/dd")){
        if(validateDate((1843 + '/' + b), responseType="boolean", dateFormat="yy/mm/dd")){
            return true
        } else{
            return false
        }
    } return false
}

const asignarYear = (a, b) =>{
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
    } else {
        yearB = today.getFullYear()
    }
    const fecha1 = new Date(yearA + ',' + a.replace('/', ','))
    const fecha2 = new Date(yearB +',' + b.replace('/', ','))

    return {
        fecha1,
        fecha2
    };
}


const compararFecha = (fecha1, fecha2, cumple) => {
        
    mesCumple = parseInt(cumple[1])
    diaCumple= parseInt(cumple[2])

    if(fecha1.getFullYear()=== fecha2.getFullYear()){
        if(mesCumple == fecha1.getMonth()+1 && mesCumple == fecha2.getMonth()+1){
            if (diaCumple >= fecha1.getDate() && diaCumple <= fecha2.getDate()){
                return true
            }
        } else if(mesCumple > fecha1.getMonth()+1 && mesCumple <= fecha2.getMonth()+1){
            if (diaCumple <= fecha2.getDate()){
                return true
            }
        } else if(mesCumple >= fecha1.getMonth()+1 && mesCumple < fecha2.getMonth()+1){
            if (diaCumple >= fecha1.getDate()){
                return true
            }
        }
        return false

    } else if (fecha1.getFullYear()< fecha2.getFullYear()){
        if(mesCumple == fecha1.getMonth()+1 && mesCumple == fecha2.getMonth()+1){
            if(diaCumple >= fecha1.getDate() || diaCumple <= fecha2.getDate()){
                return true
            }
        } else if(mesCumple == fecha2.getMonth()+1 && diaCumple <= fecha2.getDate()){
            return true
        } else if(mesCumple == fecha1.getMonth()+1 && diaCumple >= fecha1.getDate()){
            return true
        } else if(mesCumple > fecha1.getMonth()+1 || mesCumple < fecha2.getMonth()+1){
            return true
        }
        return false
    } 
}



const mostrarFecha = (datos) =>{
    for (i in datos){
        var a=parseInt(i)+1
        console.log(chalk.cyan(a,".- ",datos[i].apellido_y_nombre.split(',').reverse().join(" "), datos[i].cumpleanios))
    }
}

module.exports = {
    validarFechas,
    compararFecha,
    mostrarFecha,
    asignarYear
}