

// var questions = [ 'Enter a day: ', 'Enter a month: '];
// var fecha =[]
// process.stdout.write('Please, enter the first date: \n')

// function question(i){
//     process.stdout.write(questions[i])
// }

// process.stdin.on('data', function(data){
//     fecha.push(data.toString().trim());
//     if(fecha.length < questions.length){
//         question(fecha.length);
//     } else{
//         process.exit();
//     }
    
// });

// question(0)



//mas de una pregunta con enquirer tengo que hacer una promesa por 
const { prompt } = require('enquirer');
console.log('Provide a first date')
const fecha1_raw = [
    {
        type: 'input',
        name: 'fecha1',
        message: 'Enter a day'
    },
    {
        type: 'input',
        name: 'fecha2',
        message: 'Enter a month'
    }
];

// console.log('Provide a second date')
// //const fecha2_raw = [
//     {
//         type: 'input',
//         name: 'diaFecha2',
//         message: 'Enter a day'
//     },
//     {
//         type: 'input',
//         name: 'mesFecha2',
//         message: 'Enter a month'
//     }
// ];

let answers1 = prompt(fecha1_raw);
//let answers2 = prompt(fecha2_raw);
console.log(answers1);


