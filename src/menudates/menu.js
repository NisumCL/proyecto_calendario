'use strict'
const { questionsMenu } = require('./question-choices.js')
const { assignOutputs } = require('./outputassignment.js')

const mainMenu = async() =>{
    let selection = ''
    selection = await questionsMenu()
    const {startDate, endDate} = await assignOutputs(selection)
    return{
        startDate,
        endDate
    }
}

module.exports = {
    mainMenu,
}

