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
        }else if(answers.user_choice === "view all roles") {
            db.query("SELECT * FROM role", function (err, data) {
                console.log(err)
                console.table(data.rows)
                initialize();
            })
        }else if(answers.user_choice === "view all employees") {
            db.query("SELECT * FROM employee", function (err, data) {
                console.log(err)
                console.table(data.rows)
                initialize();
            })
        }else if(answers.user_choice === "add a department") {
            //insert
            inquirer.prompt({
                type:"input",
                name:"department_name",
                message: "Enter the name of the department"
            })
            .then(answers =>{
                db.query("INSERT INTO department(name) VALUES ($1)",[answers.department_name], function (err, data) {
                    console.log("New department is added!");
                   
                    initialize();
                })
            })
 
        }else if(answers.user_choice === "add a role") {
            db.query("SELECT id AS value, name FROM department", function (err, data) {
                
                let departmentList = data.rows;
            //TODO take user input and add to the query
            inquirer.prompt([
                {
                    type:"input",
                    name:"title",
                    message: "Enter the title of the role"
                },
                {
                    type:"input",
                    name:"salary",
                    message: "Enter the salary of the role"
                },
                {
                    type:"list",
                    name:"department_id",
                    message: "Select department",
                    choices: departmentList
                }
            ])
            .then(answers =>{
                db.query("INSERT INTO role(title, salary, department_id) VALUES ($1, $2, $3)",[answers.title, answers.salary, answers.department_id], function (err, data) {
                    console.log("New role is added!");
                   
                    initialize();
                })
            })
        })
        }else if(answers.user_choice === "add an employee") {
            //insert
            inquirer.prompt([{
                type:'input',
                name: 'employee',
                message: 'Input first name, last name, role id and manager id (empty for no manager)'
            }]);//TODO take user input and add to query
                db.query(`INSERT INTO employee VALUES`, function (err, data) {
                    console.log(err)
                    console.table(data.rows)
                    initialize();
                })
            
        }else if(answers.user_choice === "update an employee role") {
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
                    db.query("UPDATE employee SET role_id = $1 WHERE id = $2",[answers.role_choice, answers.user_choice],function(err,data){
                        console.log("Update successful!");
                        initialize();
                    });
                });
            }) 
            })
        }
    });
}

// function deleteData(db,tableName,column){
//     const sql = `DELETE FROM movies WHERE id = $1`;
//     const params = [req.params.id];
  
//     pool.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: err.message });
//       } else if (!result.rowCount) {
//         res.json({
//           message: 'data not found'
//         });
//       } else {
//         res.json({
//           message: 'deleted',
//           changes: result.rowCount,
//           id: req.params.id
//         });
//       }
//     });

  
// }
initialize();