'use strict'
const inquirer = require('inquirer')
const { searchInRange } = require('./questions-searchinrange.js')
const { returnDatesinMonth } = require('./returndatesinmonth.js')


const assignOutputs = async(selection) => { 
    let startDate = null
    let endDate = null
    if (selection === 'Search in a range'){
        const {startDateSIR, endDateSIR} = await searchInRange()
        startDate = startDateSIR
        endDate = endDateSIR 
    }
    else if(selection === 'Search in this month'){
        const { startDateM, endDateM } = returnDatesinMonth(0)
        startDate = startDateM
        endDate = endDateM
    } 
    else if (selection === 'Search in the next month'){
        const { startDateM, endDateM } = returnDatesinMonth(1)
        startDate = startDateM
        endDate = endDateM

    } else {
        console.log('Thanks for using!!')
        startDate
        endDate
    } 
    console.log(startDate,
        endDate)
    return{
        startDate,
        endDate
    }
}

module.exports = {
    assignOutputs
}