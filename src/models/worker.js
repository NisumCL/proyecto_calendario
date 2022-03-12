/* eslint-disable */
const mongoose = require('mongoose')

const Worker = mongoose.model('Worker', { 
    apellido_y_nombre: {
        type: String
    },
    email_nisum: {
        type: String,
        validate(value){
            if(!validator.isEmail(value) === true){
                throw new Error('It is not an email')
            }
        }
    },
    cumpleanios: {
        type: String
    },
    empresa: {
        type: String
    },
})


module.exports = Worker