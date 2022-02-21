'use strict'
const inquirer = require('inquirer')

const returnDatesArray = () => {
    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const nextMonth = today.getMonth() + 2
    let numDays = 0
    const lastmonthDay = (mes) => {
        numDays = new Date(today.getFullYear(), mes, 0).getDate()
        return numDays
    }
    const firstmonthDayStr = '01'
    const lastcurrentMonthDayStr = lastmonthDay(currentMonth).toString()
    const lastnextMonthDayStr = lastmonthDay(nextMonth).toString()
    const currentMonthStr = currentMonth.toString()
    const nextMonthStr = nextMonth.toString()
    const numDates = [ firstmonthDayStr, lastcurrentMonthDayStr, lastnextMonthDayStr, currentMonthStr, nextMonthStr ]
    const strDates = []
    numDates.forEach(element => {
        if(element.length < 2){
            strDates.push('0' + element)
        } else{
            strDates.push(element)
        }
    })
    return strDates
}

module.exports = {
    returnDatesArray
}