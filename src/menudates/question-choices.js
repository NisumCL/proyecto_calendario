'use strict'
const inquirer = require('inquirer')
const chalk = require('chalk')

const firstQuestion = {
    type: 'list',
    name: 'selection',
    message: 'How do you want to search?\n',
    choices: ['Search in a range', 'Search in this month', 'Search in the next month', 'Exit']
}

const questionsMenu = async() =>{
    // console.clear()
    console.log(chalk.magenta(' ************************************************'))
    console.log(chalk.cyan('   Welcome to the app, please, select an option   '))
    console.log(chalk.magenta(' ************************************************'))
    const {selection} = await inquirer.prompt(firstQuestion)
    return selection
    
}

module.exports = {
    questionsMenu,
}