// Se utiliza paquete para leer documento de cvs
const fs = require("fs");
const parser = require("csv-parser");

//nuevas variables que albergarán info leída y que cumpla condiciones
const results = [];
const newResults = [];

fs.createReadStream("mails_y_cumples_03.csv")
  .pipe(parser({}))
  .on("data", (data) => results.push(data))
  .on("end", () => calculateBirthdate());

const calculateBirthdate = () => {
  results.forEach((emp) => {
    let currentDate = new Date();
    //console.log(currentDate);

    let limitDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 15
    );
    //console.log(limitDate);

    let newDate = new Date(emp.cumpleanios.split("-"));
    newDate.setFullYear(limitDate.getFullYear());

    if (newDate >= currentDate && newDate <= limitDate) {
      newResults.push(emp);
    }
  });
  console.table(newResults);
};
