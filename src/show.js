const mostrar = (datos) => {
    //foreach y colocarlo arriba
    for (i in datos) {
        const a = parseInt(i) + 1;
        console.log(a, ".- ", datos[i].cumpleanios, datos[i].apellido_y_nombre);
    }
    if (datos.length === 0) {
        console.log("No hay cumpleaños en fechas ingresadas");
    }
};

module.exports = {
    mostrar: mostrar,
};
