const {Select, NumberPrompt} = require('enquirer');
const chalk = require('chalk')
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

rl.prompt();

const prompt = new Select({
    name: 'Range of search',
    message: chalk.cyan.bold('Welcome to the employees-birthdays-app.\n Please, select an option.\n') ,
    choices: ['Search in a range', 'Search in this month', 'Search in the next month', 'Exit']
});



prompt.run() 
.then(answer => {
    const fecha1 = []
    const fecha2 = []
    today = new Date()
    const hoy= parseInt(today.getDate())
    const esteMes = parseInt(today.getMonth()+1)
    const proximoMes = parseInt(today.getMonth()+2)
    
    
    
    
    if (answer === 'Search in a range'){
            
            console.log('Provide the first date')
            rl.question('Enter a day', (answer)=>{
                console.log(answer)
            });
            

            // const diaFecha1 = new NumberPrompt({
            //     name: 'mes1',
            //     message: 'Please enter the month'
            // });
            // const mesFecha1 = new NumberPrompt({
            //     name: 'mes1',
            //     message: 'Please enter the month'
            // });
            // const diaFecha2 = new NumberPrompt({
            //     name: 'dia1',
            //     message: 'Please enter the day'
            // });
            // const mesFecha2 = new NumberPrompt({
            //     name: 'mes1',
            //     message: 'Please enter the month'
            // });
            // fecha1[0] = diaFecha1
            // fecha1[1] = mesFecha1
            // fecha2[0] = diaFecha2
            // fecha2[1] = mesFecha2
            // console.log( fecha1, fecha2)
            
        } 
        else if (answer === 'Search in this month'){
            fecha1[0] = 1
            fecha1[1] = esteMes
            fecha2[0] = 1
            fecha2[1] = proximoMes
            
        } else if (answer === 'Search in the next month'){
            fecha1[0] = 1
            fecha1[1] = proximoMes
            fecha2[0] = 1
            fecha2[1] = proximoMes + 1
            
        } else if (answer === 'Exit') {
            return;
        }

        // const fecha1 = new Date(yearA + ',' + a.replace('/', ','))
        // const fecha2 = new Date(yearB +',' + b.replace('/', ','))
        
        console.log( fecha1, fecha2)
        return {
            fecha1,
            fecha2
        };



    })


.catch(console.error);


