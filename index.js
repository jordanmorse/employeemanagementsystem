const mysql = require("mysql")
const consoleTable = require("console.table")
const inquirer = require("inquirer")
const { type } = require("os")

function options() {
    inquirer.prompt ([{
        name: "Employee",
        type: "list",
        choices: [
            "optionOne", "optionTwo", "optionThree", "optionFour", "optionFive"
        ]
        
    }])
}