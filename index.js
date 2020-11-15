const mysql = require("mysql")
const consoleTable = require("console.table")
const inquirer = require("inquirer")
const { type } = require("os")
const connection = require("./server.js")

function startProgram() {
    inquirer.prompt([{
        name: "start",
        type: "list",
        message: "Pick an option:",
        choices: [
            "Update Employee",
            "Add Employee",
            "View Employees",
            "Delete Employee",
            "Add Department",
            "View Departments",
            "Add role",
            "View Roles"
        ]
    }]).then(answers => {
        switch (answers.start) {
            case "Update Employee":
                updateEmployee()
                break
            case "Add Employee":
                addEmployee()
                break
            case "View Employees":
                viewEmployee("employee")
                break
            case "Delete Employee":
                deleteEmp()
                break
            case "Add Department":
                addDepartment()
                break
            case "View Departments":
                viewDepartment("department")
                break
            case "Add role":
                addRole()
                break
            case "View Roles":
                viewRoles("roles")
                break
            default:
                break
        }
    })
};

startProgram();

function addEmployee() {
    const employeeRoles = [];
    connection.query("Select * from roles", function (err, res) {
        if (err) throw (err)
        for (let i = 0; i < res.length; i++) {
            let employeeRole = { name: res[i].title, value: res[i].id }
            employeeRoles.push(employeeRole)
        }
        const employeeManagers = [];
        connection.query("Select * from employee", function (err, res) {
            if (err) throw (err)
            for (let i = 0; i < res.length; i++) {
                let employeeManager = { name: res[i].first_name + res[i].last_name, value: res[i].id }
                employeeManagers.push(employeeManager)
            }
            console.log(employeeRoles)
            console.log(employeeManagers)
            inquirer.prompt([{
                name: "firstName",
                type: "input",
                message: "What is your employee's first name?"
            }, {
                name: "lastName",
                type: "input",
                message: "What is your employee's last name?"
            }, {
                name: "whatRole",
                type: "list",
                message: "What is your employee's role?",
                choices: employeeRoles
            }, {
                name: "whatManager",
                type: "list",
                message: "Who is your employee's manager?",
                choices: employeeManagers
            }]).then(answer => {
                console.log(answer)
                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${answer.firstName}", "${answer.lastName}", "${answer.whatRole}", "${answer.whatManager}");`
                )
                startProgram();
            })
        })
    })
}

function addDepartment() {
    const departments = [];
    connection.query("Select * from department", function (err, res) {
        if (err) throw (err)
        for (let i = 0; i < res.length; i++) {
            let department = { name: res[i].name, value: res[i].id }
            departments.push(department)
        }
        inquirer.prompt([{
            name: "addDept",
            type: "input",
            message: "What is the department you would like to add?"
        }])

            .then(answer => {
                connection.query(`INSERT INTO department (name)
            VALUES("${answer.addDept}");`
                )
                startProgram();
            })
    })
}

function addRole() {
    const roles = [];
    connection.query("Select * from roles", function (err, res) {
        if (err) throw (err)
        for (let i = 0; i < res.length; i++) {
            let role = { name: res[i].name, value: res[i].id }
            roles.push(role)
        }
        inquirer.prompt([{
            name: "addRole",
            type: "input",
            message: "What is the role you would like to add?"
        }, {
            name: "addSalary",
            type: "input",
            message: "What is the salary for this role? Please type in decimal format."
        }, {
            name: "deptID",
            type: "input",
            message: "What is the department ID for this role? Input 1 for Baking, 2 for Fudging, 3 for Elf Resources or 4 for Factory Management."
        }])

            .then(answer => {
                connection.query(`INSERT INTO roles (title, salary, department_id)
            VALUES(${answer.title}, ${answer.salary}, ${answer.department_id}`)
            startProgram();
            })
            
    })
}

function viewEmployee(tableName) {
    connection.query(`SELECT * FROM ${tableName}`, (err, res) => {
        if (err) throw (err);
        console.table(res);
        startProgram()
    })
};

function viewDepartment(tableName) {
    connection.query(`SELECT * FROM ${tableName}`, (err, res) => {
        if (err) throw (err);
        console.table(res);
        startProgram()
    })
};

function viewRoles(tableName) {
    connection.query(`SELECT * FROM ${tableName}`, (err, res) => {
        if (err) throw (err);
        console.table(res);
        startProgram()
    })
};

function deleteEmp() {
    let employees = [];
    connection.query("Select * from employee", function (err, res) {
        if (err) throw (err)
        for (let i = 0; i < res.length; i++) {
            let employee = { name: res[i].first_name + res[i].last_name, value: res[i].id }
            employees.push(employee)
        }

        inquirer.prompt([{
            name: "Delete",
            type: "list",
            message: "Pick an employee to delete:",
            choices: employees
        }])
            .then(answer => {
                connection.query("Delete from employee where id = ?", [answer.Delete], function (err, res) {
                    if (err) throw (err)
                    console.log("Employee has been deleted.")
                })
                startProgram();
            })
    })
}



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
                            startProgram();
                        })
                })
            })
    })
}