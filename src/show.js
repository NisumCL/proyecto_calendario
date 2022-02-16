const mostrar = (datos) => {
  datos.forEach((element, index) => {
    console.log(index, '.- ', element.cumpleanios, element.apellido_y_nombre)
  })
  if (datos.length === 0) {
    console.log('No hay cumpleaños en fechas ingresadas');
  }
}

module.exports = {
  mostrar: mostrar
}
