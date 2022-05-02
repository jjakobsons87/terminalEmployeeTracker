const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { listenerCount } = require('process');
require('console.table');
// const PORT = process.env.PORT || 3005;

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employee'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected" + connection.threadId);
    mainMenu();
})

const mainMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            'View All Employees', 
            'View All Roles', 
            'View All Departments', 
            'Add an Employee', 
            'Add a Department', 
            'Add a Role', 
            'Update an Employee Role']
    })

    .then(function(menuChoice) {
        // console.log(menuChoice);
        if (menuChoice.menu === 'View All Employees') {
            viewAllEmployees();
        }
        else if (menuChoice.menu === 'View All Roles') {
            viewAllRoles();
        }
        else if (menuChoice.menu === 'View All Departments') {
            viewAllDepartments();
        }
        else if (menuChoice.menu === 'Add an Employee') {
            addAnEmployee();
        }
        else if (menuChoice.menu === 'Add a Department') {
            addDepartment();
        }
        else if (menuChoice.menu === 'Add a Role') {
            addRole();
        }
        else if (menuChoice.menu === 'Update an Employee Role') {
            updateEmployeeRole();
        }
    })
}

function viewAllEmployees() {
    console.log("Viewing All Employees:");
    const sql = `SELECT D.NAME,R.TITLE,R.SALARY,E.FIRST_NAME,E.LAST_NAME,MANAGER_ID FROM DEPARTMENT D,ROLE R, empInfo E WHERE D.ID = R.DEPARTMENT_ID AND R.ID = E.ROLE_ID ORDER BY D.NAME;`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);

        mainMenu();
    })
}

function viewAllRoles() {
    console.log("Viewing All Roles:");
    const sql = 'SELECT * FROM role;';
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);

        mainMenu();
    })
}

function viewAllDepartments() {
    console.log("Viewing All Departments:");
    const sql = 'SELECT * FROM department;';
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);

        mainMenu();
    })
}

function addAnEmployee() {
    console.log("Add an employee:");
    const sql = 'SELECT * FROM role;'
    const sqlMgr = 'SELECT * FROM empInfo;'
    connection.query(sql, function (err, res) {
        // console.log(res);
        if (err) throw err;
        const chooseRoles = [];
        for (let i = 0; i < res.length; i++) {
            const chooseRole = {
            name: res[i].title,
            value: res[i].id,
            };
            chooseRoles.push(chooseRole);
        }

        connection.query(sqlMgr, function(err, res) {
            if (err) throw err;
            const chooseMgrs = [];
            for (let i = 0; i < res.length; i++) {
                const chooseMgr = {
                    name: `${res[i].first_name} ${res[i].last_name}`,
                    value: res[i].id
                }
                chooseMgrs.push(chooseMgr);
            }
        
            const questions = [
                {
                type: "input",
                name: "first_name",
                message: "What is the employees first name?",
                },
                {
                type: "input",
                name: "last_name",
                message: "What is the employees last name?",
                },
                {
                type: "list",
                name: "role",
                message: "What is the employees role?",
                choices: chooseRoles
                },
                {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: chooseMgrs
                },
            ];

            inquirer.prompt(questions).then(function(answers) {
                const sql = "INSERT INTO empInfo (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);";
                connection.query(sql, [answers.first_name, answers.last_name, answers.role, answers.manager], function(err, res) {
                    if(err) console.log(err);
                    console.log("Employee added to database");
                    mainMenu();
                })
            })
        })
    })
}

function addDepartment() {
    console.log("Add a department:");
    inquirer.prompt(
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of the department you want to add?',
        }
    )
    .then(function(answers) {
        const sql = 'INSERT INTO department (name) VALUES (?);';
        connection.query(sql, [answers.newDepartment], function(err, res) {
            if(err) throw err;
            console.log("Department added to database");
            mainMenu();
        });
    })
}

function addRole() {
    console.log("Add a Role:");
    const sql = 'SELECT * FROM department;';
    connection.query(sql, function(err, res) {
        if(err) throw err;
        const chooseDepts = [];
        for (let i = 0; i < res.length; i++) {
            const chooseDept = {
                name: res[i].name,
                value: res[i].id
            }
            chooseDepts.push(chooseDept);
        }
        const questions = [
            {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role you want to add?'
            },
            {
            type: 'input',
            name: 'salary',
            message: 'What is the Salary of the role?'
            },
            {
            type: 'list',
            name: 'department',
            message: 'What department does this role belong to?',
            choices: chooseDepts
            }
        ];

        inquirer.prompt(questions).then(function(answers) {
            const sqlRole = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?);';
            connection.query(sqlRole, [answers.roleName, answers.salary, answers.department], function(err, res) {
                if(err) console.log(err);
                console.log("The new role has been added to the database");
                mainMenu();
            })
        })
    })
}

function updateEmployeeRole() {
    const sql = 'SELECT * FROM empInfo;';
    const sqlRole = 'SELECT * FROM role;';
    connection.query(sql, function(err, res) {
        if(err) throw err;
        const chooseEmployees = [];
        for (let i = 0; i < res.length; i++) {
            const chooseEmployee = {
                name: `${res[i].first_name} ${res[i].last_name}`,
                value: res[i].id
            }
            chooseEmployees.push(chooseEmployee);
        }
    
        connection.query(sqlRole, function(err, res) {
            if(err) throw err;
            const chooseRoles = [];
            for (let i = 0; i < res.length; i++) {
                const chooseRole = {
                    name: res[i].title,
                    value: res[i].id
                }
                chooseRoles.push(chooseRole);
            }

            const questions = [
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which Employee do you want to update?',
                    choices: chooseEmployees
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Which role do you want to assign to this employee?',
                    choices: chooseRoles
                }
            ];

            inquirer.prompt(questions).then(function(answers) {
                const sql = 'UPDATE empInfo SET role_id = ? WHERE id = ?;';
                connection.query(sql, [answers.role, answers.employee], function(err, res) {
                    if(err) throw err;
                    console.log("Employee role updated.");
                    mainMenu();
                })
            })
        })
    })
}