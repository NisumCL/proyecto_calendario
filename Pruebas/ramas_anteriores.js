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
