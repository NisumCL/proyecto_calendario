'use strict'
const inquirer = require('inquirer')
const { searchInRange } = require('./questions-searchinrange.js')
const { returnDatesArray } = require('./returndatesarray.js')


const assignOutputs = async(selection) => { 
    const startDateArray = []
    const endDateArray = []
    const strDates = returnDatesArray()
    if (selection === 'Search in a range'){
        const {startrangeDateArray, endrangeDateArray} = await searchInRange()
        startDateArray.push(startrangeDateArray[0], startrangeDateArray[1])
        endDateArray.push(endrangeDateArray[0], endrangeDateArray[1]) 
    }
    else if(selection === 'Search in this month'){
        startDateArray.push(strDates[0], strDates[3])
        endDateArray.push(strDates[1], strDates[3])
    } 
    else if (selection === 'Search in the next month'){
        startDateArray.push(strDates[0], strDates[4])
        endDateArray.push(strDates[2],strDates[4]) 
    } else {
        console.log('Thanks for using.')
        startDateArray
        endDateArray
    } 
    return{
        startDateArray,
        endDateArray
    }
}

module.exports = {
    assignOutputs
}