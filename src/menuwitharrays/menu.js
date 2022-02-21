'use strict'
const inquirer = require('inquirer')
const chalk = require('chalk')
const { questionsMenu } = require('./question-choices.js')
const { assignOutputs } = require('./outputassignment.js')

const mainMenu = async() =>{
    let selection = ''
    selection = await questionsMenu()
    const {startDateArray, endDateArray} = await assignOutputs(selection)
    console.log(startDateArray,endDateArray)
    return{
        startDateArray,
        endDateArray
    }
}

module.exports = {
    mainMenu,
}

mainMenu()