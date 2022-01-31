const parse = require('csv-parse');
const fs = require('fs'); 


const csvCumples =[];
// console.log(hoy)
    // const hoy_str = hoy.toLocaleDateString();
    // const hoy_list = hoy_str.split('/')
    // const día_hoy = hoy_list[0]
    // const mes_hoy = hoy_list[1]
fs.createReadStream(__dirname +'/mails_y_cumples_03.csv')
    .pipe(
        parse({
            delimiter: ','
        })
    )
    .on('data', function(dataRow){
        csvCumples.push(dataRow);
    })

    .on('end', function(){
        console.log(csvCumples);
    });