/* eslint-disable */
const mongoose = require('mongoose')

const Worker = mongoose.model('Worker', { 
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        validate(value){
            if(!validator.isEmail(value) === true){
                throw new Error('It is not an email')
            }
        }
    },
    birthday: {
        type: Date
    },
    company: {
        type: String
    },
})




// db.collection('new-tasks').insertMany([
//     {
//         description: 'lavar la loza',
//         completed: true
//     },
//     {
//         description: 'Hacer la cama',
//         completed: false
//     },
//     {
//         description: 'Barrer el living',
//         completed: false
//     }
// ],(error, result)=>{
//     if(error){
//         return console.log('Unable to insert many users')
//     }
//     console.log(result.ops)
// })




// const worker = {
//     Worker.data.replace('"', '').trim(),
//     Worker.lastname.replace('"', ''),
//     Worker.email,
//     matchThisYear(Worker.birthday),
//     Worker.company
//   };

module.exports = Worker