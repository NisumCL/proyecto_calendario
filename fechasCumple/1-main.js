const csv = require('csv-parser')
const fs = require('fs')
const results = []

const fechaLimite = new Date()
const fechaHoy = new Date()

const diaActual = fechaHoy.getDate()
const mesActual = fechaHoy.getMonth() + 1
fechaLimite.setDate(fechaLimite.getDate() + 15)
const enQuincesDias = fechaLimite.getDate()
const mesLimite = fechaLimite.getMonth() + 1 

fs.createReadStream('mails_y_cumples_03.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        for (cumples in results) {
            
            const fechasTodas = results[cumples].cumpleanios.slice(5).split('-')
            const mesCumple = parseInt(fechasTodas[0])
            const diaCumple = parseInt(fechasTodas[1])

            if (mesActual == mesCumple && mesCumple == mesLimite) {
                if (diaCumple < enQuincesDias && diaCumple > diaActual){
                    console.log(results[cumples].apellido_y_nombre,'/', results[cumples].cumpleanios)
                }
                
            }else if (mesActual == mesCumple && diaCumple >= diaActual) {
                console.log(results[cumples].apellido_y_nombre,'/', results[cumples].cumpleanios)

            }else if (mesCumple == mesLimite && diaCumple < enQuincesDias) {
                console.log(results[cumples].apellido_y_nombre,'/', results[cumples].cumpleanios)
                
            }
        }
    })