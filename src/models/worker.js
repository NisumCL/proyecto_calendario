/* eslint-disable */
const mongoose = require('mongoose')

const Worker = mongoose.model('Worker', { 
    name: {
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



module.exports = Worker