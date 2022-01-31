const csv = require('csv-parser');
const fs = require('fs'); 
const results = [];

const cumpleaniosNisum = () =>{

    fs.createReadStream('mails_y_cumples_03.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', ()=> {
        const hoy = new Date();
        const year = hoy.getFullYear()
        const este_year = year.toString()
        const limite = new Date();
        limite.setDate(limite.getDate() + 16);
        
        for (const row in results) {
    
            const fecha_nac_func = results[row].cumpleanios
    
            const dia_cumple_func = fecha_nac_func.slice(4)
            
            const fecha_cumple_este_year =  new Date(este_year + dia_cumple_func)
    
            if(hoy <= fecha_cumple_este_year && fecha_cumple_este_year < limite){
                console.log(results[row].apellido_y_nombre, results[row].cumpleanios)
            }
        }
    
    });
}

cumpleaniosNisum()





