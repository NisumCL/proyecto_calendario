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
        type: String
    },
    birthday: {
        type: Date
    },
    company: {
        type: String
    },
})


module.exports = Worker