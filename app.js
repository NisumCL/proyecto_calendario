<<<<<<< HEAD
// Se utiliza paquete para leer documento de cvs
const fs = require("fs");
const parser = require("csv-parser");

//nuevas variables que albergarán info leída y que cumpla condiciones
const results = [];
const newResults = [];

//Se guarda en una variable "results"
fs.createReadStream("mails_y_cumples_03.csv")
  .pipe(parser({}))
  .on("data", (data) => results.push(data))
  .on("end", () => calculateBirthdate());

//Variable para iterar datos de archivo
const calculateBirthdate = () => {
  results.forEach((emp) => {
    //Fecha actual para hacer código mantenible
    let currentDate = new Date();

    //Fecha límite para cumplir condición de 15 días.
    let limitDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 15
    );

    // Fecha modificada llevando año de nacimiento al año actual.
    let newDate = new Date(emp.cumpleanios.split("-"));
    newDate.setFullYear(limitDate.getFullYear());

    // Condición para guardar fechas que cumplen con lo solicitado, "Listar todos los cumpleaños desde fecha actual a 15 días"
    if (newDate >= currentDate && newDate <= limitDate) {
      newResults.push(emp);
    }
  });
  console.table(newResults);
};
=======
const parse = require('csv-parser')
const fs = require('fs')

const fecha1 = new Date(2021,1,28)
const fecha2 = new Date(fecha1.getFullYear(), fecha1.getMonth(), fecha1.getDate()+15)

const cumpleanios = []

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
    })



>>>>>>> main
