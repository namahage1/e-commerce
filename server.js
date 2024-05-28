const inquirer = require("inquirer");
require("console.table");
const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "test",
    database: "employee_info",
    port: 5432
})

const initialize = async () => {
    const db = await pool.connect();

    inquirer.prompt([{
        type: 'list',
        name: 'user_choice',
        message: 'chose one of the option',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }]).then(answers => {
        console.log(`user choice ${answers.user_choice}`);
        if (answers.user_choice === "view all departments") {
            db.query("SELECT * FROM department", function (err, data) {
                console.log(err)
                console.table(data.rows)
                initialize();
            })
        } else if (answers.user_choice === "view all roles") {
            db.query("SELECT * FROM role", function (err, data) {
                console.log(err)
                console.table(data.rows)
                initialize();
            })
        } else if (answers.user_choice === "view all employees") {
            db.query("SELECT * FROM employee", function (err, data) {
                console.log(err)
                console.table(data.rows)
                initialize();
            })
        } else if (answers.user_choice === "add a department") {
            //insert
            inquirer.prompt({
                type: "input",
                name: "department_name",
                message: "Enter the name of the department"
            })
                .then(answers => {
                    db.query("INSERT INTO department(name) VALUES ($1)", [answers.department_name], function (err, data) {
                        console.log("New department is added!");

                        initialize();
                    })
                })

        } else if (answers.user_choice === "add a role") {
            db.query("SELECT id AS value, name FROM department", function (err, data) {

                let departmentList = data.rows;
                //TODO take user input and add to the query
                inquirer.prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "Enter the title of the role"
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "Enter the salary of the role"
                    },
                    {
                        type: "list",
                        name: "department_id",
                        message: "Select department",
                        choices: departmentList
                    }
                ])
                    .then(answers => {
                        db.query("INSERT INTO role(title, salary, department_id) VALUES ($1, $2, $3)", [answers.title, answers.salary, answers.department_id], function (err, data) {
                            console.log("New role is added!");

                            initialize();
                        })
                    })
            })
        }else if(answers.user_choice === "add an employee") {
                    //insert
            db.query("SELECT id AS value,CONCAT(first_name, ' ', last_name) AS name FROM employee" , function (err, data) {
                let empList = data.rows;
                empList.push({value:'0', name: 'N/A'});
                db.query("SELECT id AS value, title AS name FROM role" , function(err,data){
                    let roleList = data.rows;
                    
                    inquirer.prompt([
                    {
                        type:'input',
                         name: 'first_name',
                         message: 'Input first name'
                    },
                    {
                        type:'input',
                        name: 'last_name',
                        message: 'Input last name'
                    },
                    {   
                        type:'list',
                        name: 'role_id',
                        message: 'Select role',
                        choices: roleList
                    },
                    {   
                        type:'list',
                        name: 'manager_id',
                        message: 'Select manager',
                        choices: empList
                    }
                ])//closing prompt
                .then(answers =>{
                    if(answers.manager_id == 0){
                        answers.manager_id = null;
                    }
                    db.query("INSERT INTO employee(first_name, last_name,role_id,manager_id) VALUES ($1,$2,$3,$4)",[answers.first_name,answers.last_name,answers.role_id, answers.manager_id], function(err,data){
                    console.log("Added employee successfully!");
                    initialize();
                    })//closing insert query
                });//closing then answer
            })//closin employee query
        })//closing role query

        } else if (answers.user_choice === "update an employee role") {
            //update 
            //prompted to select an employee to update and their new role and this information is updated in the database
            db.query("SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee", function (err, data) {

                let employeeList = data.rows;

                db.query("SELECT id AS value, title AS name FROM role", function (err, data) {

                    let roleList = data.rows;

                    inquirer.prompt([{
                        type: 'list',
                        name: 'user_choice',
                        message: 'select an employee',
                        choices: employeeList
                    },
                    {
                        type: 'list',
                        name: 'role_choice',
                        message: 'What is the new role?',
                        choices: roleList
                    }]).then(answers => {
                        db.query("UPDATE employee SET role_id = $1 WHERE id = $2", [answers.role_choice, answers.user_choice], function (err, data) {
                            console.log("Update successful!");

                            initialize();
                        });//closing update query
                    });//then answer
                })//closing role query
            })//closing employee query
        }//closing if else
    });
}

initialize();