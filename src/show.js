const results = [1, 2, 3];
// const mostrar = (datos) => {
//     //foreach y colocarlo arriba
//     for (i in datos) {
//         const a = parseInt(i) + 1;
//         console.log(a, ".- ", datos[i].cumpleanios, datos[i].apellido_y_nombre);
//     }
//     if (datos.length === 0) {
//         console.log("No hay cumpleaños en fechas ingresadas");
//     }
// };

const showData = () => {
    results.forEach((data) => {
        console.log(data);
    });
};
return showData();
//const results = [];
// const newResults = [];

// const calculateBirthdate = () => {
//     results.forEach((emp) => {
//         let newDate = new Date(emp.cumpleanios.split("-"));
//         newDate.setFullYear(finishDate.getFullYear());
//         newDate.setFullYear(starDate.getFullYear());
//         newResults.push(emp);
//     });
//     console.table(cumpleanios);
// };

// module.exports = {
//     //mostrar: mostrar,
//     //calculateBirthdate,
// };
