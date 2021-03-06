const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let employees = []
const render = require("./lib/htmlRenderer");
function newTeamMember() {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'type',
                message: 'What role are you in this team?',
                choices: [
                    'Engineer',
                    'Intern',
                    'Manager',
                    'Generate Page'
                ]
            }])
        .then((data) => {
            if (data.type === 'Engineer') {
                engineer()
            }
            else if (data.type === 'Intern') {
                intern();
            }
            else if (data.type === 'Manager') {
                manager();
            }
            else if (data.type === 'Generate Page') {
                fs.writeFileSync(outputPath, render(employees), "utf-8");
                console.log(employees);
            }
            
            
        })
    }
    
    newTeamMember()

const engineer = () =>
    inquirer.prompt(
        [

            {
                type: 'input',
                name: 'engineer',
                message: 'What is your name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your employee ID?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?'
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is your github profile URL?'
            }
        ])
        .then((data) => {
            const engineer = new Engineer(data.engineer, data.id, data.email, data.github)
            employees.push(engineer);
            newTeamMember();
        }
        )


const intern = () =>
    inquirer.prompt(
        [

            {
                type: 'input',
                name: 'intern',
                message: 'What is your name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your employee ID?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?'
            },
            {
                type: 'input',
                name: 'school',
                message: 'What is the name of the school you are attending?'
            }
        ])
        .then((data) => {
            const intern = new Intern(data.intern, data.id, data.email, data.school)
            employees.push(intern);
            newTeamMember();

        })


const manager = () =>
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'manager',
                message: 'What is your name?'
            },
            {
                type: 'input',
                name: 'id',
                message: "What is your employee ID?"
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?'
            },
            {
                type: 'input',
                name: 'number',
                message: 'What is your office number?'
            }
        ])
        .then((data) => {
            const manager = new Manager(data.manager, data.id, data.email, data.number)
            employees.push(manager);
            newTeamMember();
        })




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
