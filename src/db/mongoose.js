/* eslint-disable */
const mongoose = require('mongoose')


var exec = require('child_process').exec;
var mongoToImport = 'mongoimport --d worker-birthday2  --c workers --type CSV --file mails_y_cumples_03.csv --headerline';

exec(mongoToImport, function(error, stdout, stderr) {
  // do whatever you need during the callback
});


mongoose.connect('mongodb://127.0.0.1:27017/worker-birthday', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})

//mongoimport -d nisum-workers -c workers --type CSV --file mails_y_cumples_03.csv --headerline

// db.collection('users').insertMany([
//     {
//         name: 'Estela',
//         age: 11
//     },
//     ], (error, result) =>{
//         if(error){
//             return console.log('Unable to insert many users')
//         }
//         console.log(result.ops)
//     })






