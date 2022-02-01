const csv = require('csv-parser');
const fs = require('fs'); 
const results = [];

const cumpleaniosNisum = () =>{

    fs.createReadStream('mails_y_cumples_03.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', ()=> {
        const today = new Date();
        const yearInt = today.getFullYear()
        const nextYearInt = yearInt + 1
        const thisYear = yearInt.toString()
        const nextYear = nextYearInt.toString()
        const limit = new Date();
        const yearLimit = new Date(yearInt,11,17)
        limit.setDate(limit.getDate() + 15 );

        for (const row in results) {
            let nextBirthDay = 0
            
            const birthDate = results[row].cumpleanios
            
            const birthDay = birthDate.slice(4)

            
            if( today >= yearLimit && birthDay.substring(1, 3)==='01' ){
            
                nextBirthDay =  new Date(nextYear + birthDay)
            } else{
                nextBirthDay =  new Date(thisYear + birthDay)
            }

    
            if(today <= nextBirthDay && nextBirthDay < limit){
                console.log(results[row].apellido_y_nombre, results[row].cumpleanios)
            }
        }
    
    });
}

cumpleaniosNisum()





