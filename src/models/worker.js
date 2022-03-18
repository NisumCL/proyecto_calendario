/* eslint-disable */
const mongoose = require('mongoose')


const workerSchema = new mongoose.Schema({
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


const Worker = mongoose.model('Worker', workerSchema)


module.exports = Worker