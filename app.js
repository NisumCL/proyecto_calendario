const parse = require('csv-parser')
const fs = require('fs')

const fechaInicio = process.argv[2]
const fechaFin = process.argv[3]

const fecha1 = new Date(fechaInicio)
const fecha2 = new Date(fechaFin)

const cumpleanios = []

function isValidDate(date) {
    let regex = new RegExp(/^([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))$/)
    let dateOk = regex.test(date)
    if (dateOk) {
        return true
    } else {
        return false
    }
}
if (isValidDate(fechaInicio) && isValidDate(fechaFin)) {
    console.log('Formato correcto')

} else if (!isValidDate(fechaInicio) && isValidDate(fechaFin)) {
    console.log('Formato incorrecto de la primera fecha ingresada')
    return false
} else if (isValidDate(fechaInicio) && !isValidDate(fechaFin)) {
    console.log('Formato incorrecto de la segunda fecha ingresada')
    return false
} else {
    console.log('Formato de ambas fechas es invalido')
    return false
}
const mostrar = (datos) => {
    for (i in datos){
        const a = parseInt(i) + 1
        console.log(a,".- ",datos[i].cumpleanios, datos[i].apellido_y_nombre)
    }
}
const compararFecha = (fecha1, fecha2, cumple) => {
    mesCumple = parseInt(cumple[1])
    diaCumple= parseInt(cumple[2])
    if(mesCumple == fecha1.getMonth() + 1 && mesCumple == fecha2.getMonth() + 1){
        if (diaCumple >= fecha1.getDate() && diaCumple <= fecha2.getDate()){
            return true
        }
    }
    else if(mesCumple === fecha1.getMonth() + 1){
        if(diaCumple >= fecha1.getDate()){
            return true
        }
    }else if (mesCumple === fecha2.getMonth() + 1){
        if(diaCumple <= fecha2.getDate()){
            return true
        }
    } else if (mesCumple > fecha1.getMonth() + 1 && mesCumple < fecha2.getMonth() + 1) {
        return true
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
    });