const mysql = require("mysql")
const consoleTable = require("console.table")
const inquirer = require("inquirer")
const { type } = require("os")
const connection = require("./server.js")

function startProgram() {
    inquirer.prompt([{
        name: "Run Program",
        type: "list",
        message: "Pick an option:",
        choices: [
            "Add Employee", "View Employee", "Update Employee", "Delete Employee", "Delete Department"
        ]
    }])
}

function deleteDept() {
    let departments = [];
    connection.query("Select * from department", function (err, res) {
        if (err) throw (err)
        for (let i = 0; i < res.length; i++) {
            let department = { name: res[i].name, value: res[i].id }
            departments.push(department)
        }

        inquirer.prompt([{
            name: "Delete",
            type: "list",
            message: "Pick a department to delete:",
            choices: departments
        }])
            .then(answer => {
                connection.query("Delete from department where id = ?", [answer.Delete], function (err, res) {
                    if (err) throw (err)
                    console.log("Department has been deleted.")
                })
            })
    })
}

//deleteDept();

function updateEmployee() {
    let employees = [];
    connection.query("Select * from employee", function (err, res) {
        if (err) throw (err)
        for (let i = 0; i < res.length; i++) {
            let employee = { name: res[i].first_name + res[i].last_name, value: res[i].id }
            employees.push(employee)
        }

        inquirer.prompt([{
            name: "Update",
            type: "list",
            message: "Pick an employee to update:",
            choices: employees
        }])
            .then(answer => {
                let roles = [];
                connection.query("Select * from roles", function (err, res) {
                    if (err) throw (err)
                    for (let i = 0; i < res.length; i++) {
                        let role = { name: res[i].title, value: res[i].id }
                        roles.push(role)
                    }

                    inquirer.prompt([{
                        name: "Update",
                        type: "list",
                        message: "Pick a role to update:",
                        choices: roles
                    }])
                        .then(answerTwo => {
                            connection.query("Update employee set role_id = ? where id = ?", [answerTwo.Update, answer.Update], function (err, res) {
                                if (err) throw (err)
                                console.log("Employee has been updated.", res)
                            })
                        })
                })
            })
    })
}

updateEmployee();
