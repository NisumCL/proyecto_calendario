const parse = require('csv-parser')
const fs = require('fs')

const fechaInicio = process.argv[2]
const fechaFin = process.argv[3]

const fecha1 = new Date(fechaInicio)
const fecha2 = new Date(fechaFin)

const cumpleanios = []

// function validarFechaMayor(fecha1, fecha2){
//     const fecha1_ = new Date(fecha1)
//     const fecha2_ = new Date(fecha2)
//     let fechaMes = fecha1_.getMonth() + 1
//     let fechaMes2 = fecha2_.getMonth() + 1
//     let fechaDia = fecha1_.getDate() + 1
//     let fechaDia2 = fecha2_.getDate() + 1

//     // console.log(typeof(fechaMes))
//     // console.log(fechaMes2)

//     if ((fechaMes === fechaMes2 && fechaDia < fechaDia2) && fechaMes2 <= fechaMes) {
//         console.log(typeof(fechaMes))
//     console.log(fechaMes2)
//         return true
//     } else{
//         console.log('el primer mes debe ser menor')
//         return false
//     }
    
// }
function formatoFechas(date){
    let regex = new RegExp(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
    var dateOk = regex.test(date)
    if(dateOk){
        return true
    }else{
        return false
    }
}
if (formatoFechas(fechaInicio) && formatoFechas(fechaFin)) {
    console.log('Formato correcto')
}else{
    console.log('formato invalido')
    return false
}

// Enumero a los cumpleañeros y muestro solo su fecha de nacimiento y su nombre
const mostrar = (datos) =>{
    for (i in datos){
        var a=parseInt(i)+1
        console.log(a,".- ",datos[i].cumpleanios, datos[i].apellido_y_nombre)
    }
}

// Recibo ambas fechas en formato Date() mas el cumpleaños en formato de lista [aaaa,mm,dd], 
// retorno true si el cumpleaños esta entre la fecha1 y la fecha2
// retorno false en otro caso
const compararFecha = (fecha1, fecha2, cumple) => {
    mesCumple = parseInt(cumple[1])
    diaCumple= parseInt(cumple[2])
    if(mesCumple == fecha1.getMonth()+1 && mesCumple == fecha2.getMonth()+1){
        if (diaCumple >= fecha1.getDate() && diaCumple <= fecha2.getDate()){
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
    } else if (mesCumple > fecha1.getMonth() + 1 && mesCumple < fecha2.getMonth() + 1) {
        return true
    }
    return false
}

// Leo el archivo .csv y guardo solo los empleados que estan de cumpleaños
// desde hoy hasta 15 dias mas
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