require("dotenv").config();

const parse = require("csv-parser");
const fs = require("fs");

const fechaInicio = process.argv[2];
const fechaFin = process.argv[3];

const fecha1 = new Date(fechaInicio);
const fecha2 = new Date(fechaFin);

const cumpleanios = [];


function isValidDate(date) {
    let regex = new RegExp(
        /^([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))$/
    );
    let dateOk = regex.test(date);
    return dateOk;
}
if(fechaFin > fechaInicio){
    console.log(' Por favor,ingrese las fechas en el orden requerido')
    console.log('test 1: la aplicacion no colapsa ni prosigue en caso de que el usuario provea fechas en el formato incorrecto')
    return false;
}
if(!process.argv){
    console.log(' Por favor,ingrese las fechas')
    console.log('test 2: la aplicacion finaliza en caso de que el usuario no provea fechas')
    return false;
}


if (isValidDate(fechaInicio) && isValidDate(fechaFin)) {
    console.log("Formato correcto");
} else if (!isValidDate(fechaInicio)) {
    console.log("Formato incorrecto de la primera fecha ingresada");
    return false;
} else if (!isValidDate(fechaFin)) {
    console.log("Formato incorrecto de la segunda fecha ingresada");
    return false;
} else {
    console.log("Formato de ambas fechas es invalido");
    return false;
}
const mostrar = (datos) => {
    for (i in datos) {
        const a = parseInt(i) + 1;
        console.log(a, ".- ", datos[i].cumpleanios, datos[i].apellido_y_nombre);
    }
};
const compararFecha = (fecha1, fecha2, cumple) => {
    // if fecha2 > fecha 1 console.log (' por favor, ingrese una segunda fecha mayor a la primera) console.log('considere que las fechas en caso de que la segunda sea mayor, se consideran para el intervalo")
    

    
    
    mesCumple = parseInt(cumple[1]);
    diaCumple = parseInt(cumple[2]);
    if (
        mesCumple == fecha1.getMonth() + 1 &&
        mesCumple == fecha2.getMonth() + 1
    ) {
        if (diaCumple >= fecha1.getDate() && diaCumple <= fecha2.getDate()) {
            return true;
        }
    } else if (mesCumple === fecha1.getMonth() + 1) {
        if (diaCumple >= fecha1.getDate()) {
            return true;
        }
    } else if (mesCumple === fecha2.getMonth() + 1) {
        if (diaCumple <= fecha2.getDate()) {
            return true;
        }
    } else if (
        mesCumple > fecha1.getMonth() + 1 &&
        mesCumple < fecha2.getMonth() + 1
    ) {
        return true;
    } else if(fecha1.getMonth === fecha2.getMonth && fecha1.getDate === fecha2.getDate && fecha1.getFullYear() === fecha1.getFullYear() && mesCumple=== fecha2.getMonth && diaCumple === fecha1.getDate ){
        console.log('Por favor consodere que en caso de que provea dos fechas ideticas, esta app solo busca cumpleaños que caigan en este dia')
        console.log('test 3= en caso de que el usuario provea dos fechas iguales, la app le ofrece solamente las coincidencias con esta fecha unica')
        return true
    }
    return false;
};
fs.createReadStream("mails_y_cumples_03.csv")
    .pipe(
        parse({
            delimiter: ",",
        })
    )
    .on("data", (dataRow) => {
        if (compararFecha(fecha1, fecha2, dataRow.cumpleanios.split("-"))) {
            cumpleanios.push(dataRow);
        }
    })
    .on("end", () => {
        mostrar(cumpleanios);
    });
