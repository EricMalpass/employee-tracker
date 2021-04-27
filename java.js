const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Clark;1234',
  database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    runProgram();
  });

const runProgram = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'View employees',
          'Add employees',
          'Update employee roles',
          'done'
        ],
      })

      .then((answer) => {
          console.log(answer.action);
        switch (answer.action) {
          case 'View employees':
            viewProgram();
            break;

          case 'Add employees':
            addProgram();
            break;
      
          case 'Update employee roles':
            updateProgram();
            break;

          case "done":
                connection.end();
                break;

          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
          });
      };

const viewProgram = () => {
        inquirer
          .prompt({
            name: 'view',
            type: 'rawlist',
            message: 'Would you like to view employees by?',
            choices: [
                'departments', 'roles', 'all employees'
            ]
          })
          .then((answer) => {
            switch (answer.view) {
              case 'departments':
                  console.log("works")
                viewDepartments();
                break;
              case 'roles':
                viewRoles();
                break;
              case 'all employees':
                viewAll();
                break;
              default:
                console.log(`Invalid action: ${answer.action}`);
                break;
             }
        });
 };
 const viewDepartments  = () => {
    const query =
    `Select * FROM employee_db.department;`
    connection.query(query, (err, res) => {
        console.table(res);
        runProgram();
      });
    };
const viewRoles  = () => {
        let query =
        'Select roles.title, roles.salary, department.d_name '
        query +=
        'FROM roles INNER JOIN department ON (roles.department_id = department.id);'
        console.log(query)
        connection.query(query, (err, res) => {
            console.table(res);
            runProgram();
          });
        };

 const addProgram = () => {
    inquirer
      .prompt([
        {
        name: 'firstName',
        type: 'input',
        message: 'What is the employees first name?',
        },
        {
        name: 'lastName',
        type: 'input',
        message: 'What is the employees last name?', 
        },
        {
        name: 'role',
        type: 'input',
        message: 'What is the role id?', 
        },

    ])
    .then((answer) => {
        connection.query(
          'INSERT INTO employee SET ?',
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role
            
          },
          (err) => {
            if (err) throw err;
            console.log('The employee has been created successfully!');
            runProgram();
          }
        );
      });   
};
const viewAll  = () => {
    let query =
    'Select employee.first_name, employee.last_name, roles.title, roles.salary, department.d_name '
    query +=
    'FROM employee INNER JOIN roles ON (employee.role_id = roles.id) '
    query +=
    'INNER JOIN department ON (roles.department_id = department.id);'
    console.log(query);
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        runProgram();
      });
    }; 

const updateProgram = () => {
        inquirer
      .prompt([
        {
        role: 'role',
        type: 'input',
        message: 'What is the employees new role'
        }]

        .then((answer) => {
        const query = connection.query(
          'UPDATE employee SET ? WHERE ?',
          [
            {
              role: answer,
            },
            
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee updated!\n`);
          }
        );
        }))};